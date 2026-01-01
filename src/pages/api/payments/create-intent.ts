import { logger } from '../../../lib/logger/winston';
/**
 * Create Payment Intent API
 * Creates a Stripe PaymentIntent for a booking
 *
 * SECURITY: V5 Critical Fix (CVSS 9.6) - Payment Amount Verification
 * Amount must be verified from database, NEVER trust client-provided amounts
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPaymentIntent } from '@/lib/stripe/client';
import { amountToCents } from '@/lib/stripe/config';
import { prisma } from '@/lib/prisma';

export interface CreatePaymentIntentRequest {
  amount: number; // Amount in dollars
  bookingId: string;
  customerEmail: string;
  customerName?: string;
  description?: string;
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatePaymentIntentResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { amount: clientAmount, bookingId, customerEmail, customerName, description } =
      req.body as CreatePaymentIntentRequest;

    // SECURITY V5: Basic validation
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        error: 'Booking ID is required',
      });
    }

    if (!customerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Customer email is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // SECURITY V5 CRITICAL FIX (CVSS 9.6): Verify amount from database
    // NEVER trust client-provided amounts - this prevents payment manipulation attacks
    // Client can send ANY amount, we must verify against authoritative database record

    let verifiedAmount: number;
    let bookingReference: string;

    // Try to find booking in different tables based on booking ID format/prefix
    try {
      // Check RentalPropertyBooking
      const rentalBooking = await prisma.rentalPropertyBooking.findUnique({
        where: { id: bookingId },
        select: {
          totalPrice: true,
          bookingRef: true,
          paymentStatus: true,
          status: true,
        },
      });

      if (rentalBooking) {
        // Prevent duplicate payments
        if (rentalBooking.paymentStatus === 'COMPLETED') {
          return res.status(400).json({
            success: false,
            error: 'This booking has already been paid',
          });
        }

        verifiedAmount = parseFloat(rentalBooking.totalPrice.toString());
        bookingReference = rentalBooking.bookingRef;
      } else {
        // Check other booking types (Booking table)
        const booking = await prisma.booking.findUnique({
          where: { id: bookingId },
          select: {
            totalPrice: true,
            bookingReference: true,
            paymentStatus: true,
          },
        });

        if (booking) {
          // Prevent duplicate payments
          if (booking.paymentStatus === 'PAID' || booking.paymentStatus === 'COMPLETED') {
            return res.status(400).json({
              success: false,
              error: 'This booking has already been paid',
            });
          }

          verifiedAmount = parseFloat(booking.totalPrice.toString());
          bookingReference = booking.bookingReference;
        } else {
          // Booking not found in any table
          logger.warn('Payment intent creation failed - booking not found', {
            bookingId,
            component: 'PaymentIntent',
          });
          return res.status(404).json({
            success: false,
            error: 'Booking not found',
          });
        }
      }
    } catch (dbError) {
      logger.error('Database error during payment amount verification:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to verify booking amount',
      });
    }

    // SECURITY V5: Validate verified amount
    if (!verifiedAmount || verifiedAmount <= 0) {
      logger.error('Invalid verified amount from database', {
        bookingId,
        verifiedAmount,
        component: 'PaymentIntent',
      });
      return res.status(400).json({
        success: false,
        error: 'Invalid booking amount',
      });
    }

    // SECURITY V5: Log if client amount differs from database amount (potential manipulation attempt)
    if (clientAmount && Math.abs(clientAmount - verifiedAmount) > 0.01) {
      logger.warn('Payment amount mismatch - potential manipulation attempt', {
        bookingId,
        clientAmount,
        verifiedAmount,
        difference: clientAmount - verifiedAmount,
        component: 'PaymentIntent',
      });
      // Don't reveal the mismatch to the client - just use verified amount
    }

    // SECURITY V5: Always use the database-verified amount, NEVER the client amount
    const paymentIntent = await createPaymentIntent({
      amount: amountToCents(verifiedAmount),
      metadata: {
        bookingId,
        bookingReference,
        customerEmail,
        customerName: customerName || '',
        verifiedAmount: verifiedAmount.toString(),
      },
      description: description || `Payment for booking ${bookingReference}`,
      receipt_email: customerEmail,
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret || undefined,
      paymentIntentId: paymentIntent.id,
      // Return verified amount so client can display correct amount
      amount: verifiedAmount,
    });
  } catch (error) {
    logger.error('Create payment intent error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create payment intent';

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}
