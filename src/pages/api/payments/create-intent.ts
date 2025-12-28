import { logger } from '../../../lib/logger/winston';
/**
 * Create Payment Intent API
 * Creates a Stripe PaymentIntent for a booking
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { createPaymentIntent } from '@/lib/stripe/client';
import { amountToCents } from '@/lib/stripe/config';

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
    const { amount, bookingId, customerEmail, customerName, description } =
      req.body as CreatePaymentIntentRequest;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount',
      });
    }

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

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      amount: amountToCents(amount),
      metadata: {
        bookingId,
        customerEmail,
        customerName: customerName || '',
      },
      description: description || `Payment for booking ${bookingId}`,
      receipt_email: customerEmail,
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret || undefined,
      paymentIntentId: paymentIntent.id,
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
