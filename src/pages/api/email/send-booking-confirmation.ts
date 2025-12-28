import type { NextApiRequest, NextApiResponse } from 'next';
import { sendBookingConfirmation } from '@/lib/email/sender';
import logger from '@/lib/logger';

interface BookingConfirmationRequest {
  userName: string;
  userEmail: string;
  bookingId: string;
  bookingType: 'hotel' | 'rental' | 'tour' | 'transfer' | 'vehicle';
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: string;
  currency: string;
  confirmationUrl: string;
  propertyImage?: string;
  address?: string;
  language?: 'en' | 'tr' | 'ru';
}

interface ApiResponse {
  success: boolean;
  message?: string;
  messageId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    const {
      userName,
      userEmail,
      bookingId,
      bookingType,
      propertyName,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      currency = 'USD',
      confirmationUrl,
      propertyImage,
      address,
      language = 'en',
    }: BookingConfirmationRequest = req.body;

    // Validate required fields
    if (
      !userName ||
      !userEmail ||
      !bookingId ||
      !bookingType ||
      !propertyName ||
      !checkInDate ||
      !checkOutDate ||
      !guests ||
      !totalPrice ||
      !confirmationUrl
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Send booking confirmation email
    const result = await sendBookingConfirmation({
      to: userEmail,
      userName,
      bookingId,
      bookingType,
      propertyName,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      currency,
      confirmationUrl,
      propertyImage,
      address,
      language,
    });

    if (!result.success) {
      logger.error('Failed to send booking confirmation', new Error(result.error), {
        component: 'API:SendBookingConfirmation',
        metadata: { userEmail, bookingId },
      });

      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send booking confirmation',
      });
    }

    logger.info('Booking confirmation email sent', {
      component: 'API:SendBookingConfirmation',
      metadata: { userEmail, bookingId, messageId: result.messageId },
    });

    return res.status(200).json({
      success: true,
      message: 'Booking confirmation sent successfully',
      messageId: result.messageId,
    });
  } catch (error) {
    logger.error('Error in send-booking-confirmation API', error as Error, {
      component: 'API:SendBookingConfirmation',
    });

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
