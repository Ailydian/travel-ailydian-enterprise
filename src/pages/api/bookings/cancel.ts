import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';
import { sendEmail } from '../../../lib/email-service';

const prisma = new PrismaClient();

/**
 * POST /api/bookings/cancel
 * Cancel a booking
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });

    if (!session || !session.user?.email) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { bookingId, reason } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    logger.info('Processing booking cancellation', {
      email: session.user.email,
      bookingId
    });

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify ownership
    if (booking.userId !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to cancel this booking'
      });
    }

    // Check if already cancelled
    if (booking.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'REFUNDED',
        metaData: {
          ...(booking.metaData as object || {}),
          cancellationReason: reason,
          cancelledAt: new Date().toISOString()
        }
      }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'BOOKING_CONFIRMATION',
        title: 'Booking Cancelled',
        message: `Your booking ${booking.bookingReference} has been cancelled successfully.`,
        data: {
          bookingId: booking.id,
          bookingReference: booking.bookingReference,
          refundAmount: booking.totalAmount
        }
      }
    });

    // Send cancellation email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; }
          .booking-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Cancelled</h1>
          </div>
          <div class="content">
            <p>Dear ${user.name || 'Valued Customer'},</p>
            <p>Your booking has been cancelled successfully.</p>

            <div class="booking-details">
              <h3>Cancellation Details</h3>
              <div class="detail-row">
                <strong>Booking Reference:</strong>
                <span>${booking.bookingReference}</span>
              </div>
              <div class="detail-row">
                <strong>Booking Type:</strong>
                <span>${booking.bookingType}</span>
              </div>
              <div class="detail-row">
                <strong>Refund Amount:</strong>
                <span><strong>${booking.totalAmount} ${booking.currency}</strong></span>
              </div>
              <div class="detail-row">
                <strong>Cancellation Date:</strong>
                <span>${new Date().toLocaleDateString('tr-TR')}</span>
              </div>
            </div>

            <p><strong>Refund Information:</strong></p>
            <p>Your refund of ${booking.totalAmount} ${booking.currency} will be processed within 5-7 business days to your original payment method.</p>

            ${reason ? `<p><strong>Cancellation Reason:</strong> ${reason}</p>` : ''}
          </div>
          <div class="footer">
            <p>&copy; 2025 Travel.LyDian</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: user.email,
      subject: `Booking Cancellation Confirmed - ${booking.bookingReference}`,
      html: emailHtml
    });

    logger.info('Booking cancelled successfully', {
      bookingId: booking.id,
      bookingReference: booking.bookingReference
    });

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking,
      refundAmount: booking.totalAmount
    });

  } catch (error) {
    logger.error('Booking cancellation failed', error);
    logger.error('Booking cancellation error:', error as Error, {component:'Cancel'});

    return res.status(500).json({
      success: false,
      message: 'An error occurred while cancelling your booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    await prisma.$disconnect();
  }
}
