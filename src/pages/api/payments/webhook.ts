import { logger } from '../../../lib/logger/winston';
/**
 * Stripe Webhook Handler
 * Processes Stripe webhook events for payment status updates
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyWebhookSignature } from '@/lib/stripe/client';
import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation, sendEmail } from '@/lib/email-service';
import type Stripe from 'stripe';

// Disable body parsing, need raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to get raw body from request
async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString('utf8');
    });
    req.on('end', () => resolve(body));
    req.on('error', (err) => reject(err));
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get raw body
    const rawBody = await getRawBody(req);

    // Get Stripe signature
    const signature = req.headers['stripe-signature'];

    if (!signature || typeof signature !== 'string') {
      logger.error('Missing Stripe signature');
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify webhook signature and construct event
    let event: Stripe.Event;

    try {
      event = verifyWebhookSignature(rawBody, signature);
    } catch (error) {
      logger.error('Webhook signature verification failed:', error);
      return res.status(400).json({
        error: 'Webhook signature verification failed',
      });
    }

    // Handle the event
    logger.info(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object as Stripe.Dispute);
        break;

      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    return res.status(200).json({ received: true });
  } catch (error) {
    logger.error('Webhook handler error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Webhook handler failed',
    });
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;

  if (!bookingId) {
    logger.error('No booking ID in payment intent metadata');
    return;
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentIntentId: paymentIntent.id,
        paidAt: new Date(),
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    logger.info(`Booking ${bookingId} confirmed after successful payment`);

    if (booking.user?.email) {
      try {
        await sendBookingConfirmation(booking.user.email, {
          bookingRef: booking.bookingReference || bookingId,
          type: booking.type || 'Rezervasyon',
          name: booking.propertyName || 'N/A',
          date: booking.checkIn?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
        });

        logger.info(`Confirmation email sent to ${booking.user.email} for booking ${bookingId}`);
      } catch (emailError) {
        logger.error(`Failed to send confirmation email for booking ${bookingId}:`, emailError);
      }
    }

    if (booking.propertyOwnerId) {
      try {
        const owner = await prisma.user.findUnique({
          where: { id: booking.propertyOwnerId },
          select: { email: true, name: true },
        });

        if (owner?.email) {
          await sendBookingConfirmation(owner.email, {
            bookingRef: booking.bookingReference || bookingId,
            type: `Yeni Rezervasyon - ${booking.type || 'Genel'}`,
            name: booking.propertyName || 'N/A',
            date: booking.checkIn?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency.toUpperCase(),
          });

          logger.info(`Property owner notification sent to ${owner.email} for booking ${bookingId}`);
        }
      } catch (ownerEmailError) {
        logger.error(`Failed to send owner notification for booking ${bookingId}:`, ownerEmailError);
      }
    }
  } catch (error) {
    logger.error(`Failed to update booking ${bookingId}:`, error);
    throw error;
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;

  if (!bookingId) {
    logger.error('No booking ID in payment intent metadata');
    return;
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'FAILED',
        paymentIntentId: paymentIntent.id,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    logger.info(`Booking ${bookingId} marked as payment failed`);

    if (booking.user?.email) {
      try {
        const failureReason = paymentIntent.last_payment_error?.message || 'Ödeme işlemi başarısız oldu';

        await sendEmail({
          to: booking.user.email,
          subject: `Ödeme Başarısız - ${booking.bookingReference || bookingId}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; }
                .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>❌ Ödeme Başarısız</h1>
                </div>
                <div class="content">
                  <p>Merhaba ${booking.user?.name || 'Değerli Müşterimiz'},</p>
                  <p>Rezervasyonunuz için yapılan ödeme işlemi başarısız oldu.</p>

                  <p><strong>Rezervasyon No:</strong> ${booking.bookingReference || bookingId}</p>
                  <p><strong>Hata Nedeni:</strong> ${failureReason}</p>

                  <p>Lütfen ödeme bilgilerinizi kontrol ederek tekrar deneyin.</p>

                  <a href="https://holiday.ailydian.com/checkout?booking=${bookingId}" class="button">Tekrar Dene</a>

                  <p>Yardıma ihtiyacınız varsa bizimle iletişime geçebilirsiniz.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2025 Holiday.AILYDIAN</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        logger.info(`Payment failure notification sent to ${booking.user.email} for booking ${bookingId}`);
      } catch (emailError) {
        logger.error(`Failed to send payment failure email for booking ${bookingId}:`, emailError);
      }
    }
  } catch (error) {
    logger.error(`Failed to update booking ${bookingId}:`, error);
    throw error;
  }
}

/**
 * Handle canceled payment
 */
async function handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;

  if (!bookingId) {
    logger.error('No booking ID in payment intent metadata');
    return;
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'CANCELLED',
        paymentIntentId: paymentIntent.id,
        cancelledAt: new Date(),
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    logger.info(`Booking ${bookingId} canceled`);

    if (booking.user?.email) {
      try {
        await sendEmail({
          to: booking.user.email,
          subject: `Rezervasyon İptal Edildi - ${booking.bookingReference || bookingId}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; }
                .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>ℹ️ Rezervasyon İptal Edildi</h1>
                </div>
                <div class="content">
                  <p>Merhaba ${booking.user?.name || 'Değerli Müşterimiz'},</p>
                  <p>Aşağıdaki rezervasyonunuz iptal edilmiştir.</p>

                  <p><strong>Rezervasyon No:</strong> ${booking.bookingReference || bookingId}</p>
                  <p><strong>Ürün:</strong> ${booking.propertyName || 'N/A'}</p>
                  <p><strong>İptal Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>

                  <p>Ödeme yapılmışsa, iade işlemi 5-10 iş günü içinde hesabınıza yansıyacaktır.</p>

                  <a href="https://holiday.ailydian.com" class="button">Yeni Rezervasyon Yap</a>

                  <p>Sorularınız için bizimle iletişime geçebilirsiniz.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2025 Holiday.AILYDIAN</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        logger.info(`Cancellation notification sent to ${booking.user.email} for booking ${bookingId}`);
      } catch (emailError) {
        logger.error(`Failed to send cancellation email for booking ${bookingId}:`, emailError);
      }
    }
  } catch (error) {
    logger.error(`Failed to update booking ${bookingId}:`, error);
    throw error;
  }
}

/**
 * Handle charge refunded
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = charge.payment_intent;

  if (!paymentIntentId || typeof paymentIntentId !== 'string') {
    logger.error('No payment intent ID in charge');
    return;
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: { paymentIntentId },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!booking) {
      logger.error(`No booking found for payment intent ${paymentIntentId}`);
      return;
    }

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: 'REFUNDED',
        refundedAt: new Date(),
      },
    });

    logger.info(`Booking ${booking.id} refunded`);

    if (booking.user?.email) {
      try {
        const refundAmount = charge.amount_refunded / 100;
        const currency = charge.currency.toUpperCase();

        await sendEmail({
          to: booking.user.email,
          subject: `İade Onayı - ${booking.bookingReference || booking.id}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; }
                .refund-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
                .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✅ İade İşlemi Tamamlandı</h1>
                </div>
                <div class="content">
                  <p>Merhaba ${booking.user?.name || 'Değerli Müşterimiz'},</p>
                  <p>İade işleminiz başarıyla gerçekleştirildi.</p>

                  <div class="refund-details">
                    <h3>İade Detayları</h3>
                    <div class="detail-row">
                      <strong>Rezervasyon No:</strong>
                      <span>${booking.bookingReference || booking.id}</span>
                    </div>
                    <div class="detail-row">
                      <strong>İade Tutarı:</strong>
                      <span><strong>${refundAmount.toLocaleString('tr-TR')} ${currency}</strong></span>
                    </div>
                    <div class="detail-row">
                      <strong>İade Tarihi:</strong>
                      <span>${new Date().toLocaleString('tr-TR')}</span>
                    </div>
                  </div>

                  <p><strong>Önemli Bilgi:</strong> İade tutarı, ödeme yönteminize bağlı olarak 5-10 iş günü içinde hesabınıza yansıyacaktır.</p>

                  <p>Herhangi bir sorunuz varsa müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2025 Holiday.AILYDIAN</p>
                  <p>Bizi tercih ettiğiniz için teşekkür ederiz.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        logger.info(`Refund confirmation sent to ${booking.user.email} for booking ${booking.id}`);
      } catch (emailError) {
        logger.error(`Failed to send refund confirmation email for booking ${booking.id}:`, emailError);
      }
    }
  } catch (error) {
    logger.error(`Failed to process refund for charge ${charge.id}:`, error);
    throw error;
  }
}

/**
 * Handle dispute created
 */
async function handleDisputeCreated(dispute: Stripe.Dispute) {
  const chargeId = dispute.charge;

  if (!chargeId || typeof chargeId !== 'string') {
    logger.error('No charge ID in dispute');
    return;
  }

  logger.error(`DISPUTE CREATED for charge ${chargeId}:`, {
    disputeId: dispute.id,
    amount: dispute.amount,
    reason: dispute.reason,
    status: dispute.status,
  });

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ailydian.com';

    await sendEmail({
      to: adminEmail,
      subject: `🚨 URGENT: Payment Dispute Created - ${dispute.id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; }
            .dispute-details { background: #fee2e2; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #dc2626; }
            .detail-row { padding: 8px 0; }
            .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 PAYMENT DISPUTE ALERT</h1>
            </div>
            <div class="content">
              <p><strong>A customer has disputed a payment. Immediate action required!</strong></p>

              <div class="dispute-details">
                <h3>Dispute Details</h3>
                <div class="detail-row">
                  <strong>Dispute ID:</strong> ${dispute.id}
                </div>
                <div class="detail-row">
                  <strong>Charge ID:</strong> ${chargeId}
                </div>
                <div class="detail-row">
                  <strong>Amount:</strong> ${(dispute.amount / 100).toLocaleString()} ${dispute.currency.toUpperCase()}
                </div>
                <div class="detail-row">
                  <strong>Reason:</strong> ${dispute.reason}
                </div>
                <div class="detail-row">
                  <strong>Status:</strong> ${dispute.status}
                </div>
                <div class="detail-row">
                  <strong>Created:</strong> ${new Date(dispute.created * 1000).toLocaleString('tr-TR')}
                </div>
                ${dispute.evidence_details?.due_by ? `
                <div class="detail-row">
                  <strong>Evidence Due By:</strong> ${new Date(dispute.evidence_details.due_by * 1000).toLocaleString('tr-TR')}
                </div>
                ` : ''}
              </div>

              <p><strong>Action Required:</strong></p>
              <ul>
                <li>Review the charge details in Stripe Dashboard</li>
                <li>Contact the customer to understand the dispute</li>
                <li>Prepare and submit evidence before the deadline</li>
                <li>Update internal records</li>
              </ul>

              <a href="https://dashboard.stripe.com/disputes/${dispute.id}" class="button">View in Stripe Dashboard</a>
            </div>
            <div class="footer">
              <p>This is an automated alert from Holiday.AILYDIAN Payment System</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    await prisma.disputeLog.create({
      data: {
        disputeId: dispute.id,
        chargeId: chargeId,
        amount: dispute.amount,
        currency: dispute.currency,
        reason: dispute.reason,
        status: dispute.status,
        createdAt: new Date(dispute.created * 1000),
        evidenceDueBy: dispute.evidence_details?.due_by
          ? new Date(dispute.evidence_details.due_by * 1000)
          : null,
        metadata: dispute as any,
      },
    }).catch((prismaError) => {
      logger.error('Failed to log dispute to database:', prismaError);
    });

    logger.info(`Dispute alert sent to admin for dispute ${dispute.id}`);
  } catch (error) {
    logger.error(`Failed to send dispute alert for ${dispute.id}:`, error);
  }
}
