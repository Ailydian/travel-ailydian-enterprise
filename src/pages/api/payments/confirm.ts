import { logger } from '../../../lib/logger/winston';
/**
 * Confirm Payment API
 * Confirms a payment and updates booking status
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { retrievePaymentIntent } from '@/lib/stripe/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  bookingId?: string;
  status?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfirmPaymentResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { paymentIntentId } = req.body as ConfirmPaymentRequest;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        error: 'Payment Intent ID is required',
      });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await retrievePaymentIntent(paymentIntentId);

    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        error: 'Payment intent not found',
      });
    }

    // Check payment status
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        status: paymentIntent.status,
        error: `Payment has not succeeded. Current status: ${paymentIntent.status}`,
      });
    }

    // Get booking ID from metadata
    const bookingId = paymentIntent.metadata.bookingId;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        error: 'Booking ID not found in payment metadata',
      });
    }

    // Update booking status in database
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
    } catch (dbError) {
      logger.error('Database update error:', dbError);

      // Payment succeeded but DB update failed - log for manual intervention
      logger.error(`CRITICAL: Payment ${paymentIntentId} succeeded but booking ${bookingId} update failed`);

      return res.status(500).json({
        success: false,
        error: 'Payment succeeded but booking update failed. Please contact support.',
      });
    }

    return res.status(200).json({
      success: true,
      bookingId,
      status: paymentIntent.status,
    });
  } catch (error) {
    logger.error('Confirm payment error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to confirm payment';

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  } finally {
    await prisma.$disconnect();
  }
}
