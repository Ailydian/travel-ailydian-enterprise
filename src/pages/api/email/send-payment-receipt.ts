import type { NextApiRequest, NextApiResponse } from 'next';
import { sendPaymentReceipt } from '@/lib/email/sender';
import logger from '@/lib/logger';

interface PaymentReceiptRequest {
  userName: string;
  userEmail: string;
  receiptId: string;
  bookingId: string;
  propertyName: string;
  paymentDate: string;
  paymentMethod: string;
  subtotal: string;
  taxes: string;
  fees: string;
  total: string;
  currency: string;
  receiptUrl: string;
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
      receiptId,
      bookingId,
      propertyName,
      paymentDate,
      paymentMethod,
      subtotal,
      taxes,
      fees,
      total,
      currency = 'USD',
      receiptUrl,
      language = 'en',
    }: PaymentReceiptRequest = req.body;

    // Validate required fields
    if (
      !userName ||
      !userEmail ||
      !receiptId ||
      !bookingId ||
      !propertyName ||
      !paymentDate ||
      !paymentMethod ||
      !subtotal ||
      !taxes ||
      !fees ||
      !total ||
      !receiptUrl
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Send payment receipt email
    const result = await sendPaymentReceipt({
      to: userEmail,
      userName,
      receiptId,
      bookingId,
      propertyName,
      paymentDate,
      paymentMethod,
      subtotal,
      taxes,
      fees,
      total,
      currency,
      receiptUrl,
      language,
    });

    if (!result.success) {
      logger.error('Failed to send payment receipt', new Error(result.error), {
        component: 'API:SendPaymentReceipt',
        metadata: { userEmail, receiptId },
      });

      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send payment receipt',
      });
    }

    logger.info('Payment receipt email sent', {
      component: 'API:SendPaymentReceipt',
      metadata: { userEmail, receiptId, messageId: result.messageId },
    });

    return res.status(200).json({
      success: true,
      message: 'Payment receipt sent successfully',
      messageId: result.messageId,
    });
  } catch (error) {
    logger.error('Error in send-payment-receipt API', error as Error, {
      component: 'API:SendPaymentReceipt',
    });

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
