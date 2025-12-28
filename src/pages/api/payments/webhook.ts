import { logger } from '../../../lib/logger/winston';
/**
 * Stripe Webhook Handler
 * Processes Stripe webhook events for payment status updates
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyWebhookSignature } from '@/lib/stripe/client';
import { PrismaClient } from '@prisma/client';
import type Stripe from 'stripe';

const prisma = new PrismaClient();

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
  } finally {
    await prisma.$disconnect();
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
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentIntentId: paymentIntent.id,
        paidAt: new Date(),
      },
    });

    logger.info(`Booking ${bookingId} confirmed after successful payment`);

    // TODO: Send confirmation email to customer
    // TODO: Send notification to property owner
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
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'FAILED',
        paymentIntentId: paymentIntent.id,
      },
    });

    logger.info(`Booking ${bookingId} marked as payment failed`);

    // TODO: Send payment failed notification to customer
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
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'CANCELLED',
        paymentIntentId: paymentIntent.id,
      },
    });

    logger.info(`Booking ${bookingId} canceled`);

    // TODO: Send cancellation notification
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

    // TODO: Send refund confirmation email
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

  // TODO: Send alert to admin
  // TODO: Log dispute for manual review
}
