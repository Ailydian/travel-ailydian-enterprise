import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmailVerification } from '@/lib/email/sender';
import logger from '@/lib/logger';
import crypto from 'crypto';

interface VerificationEmailRequest {
  userName: string;
  userEmail: string;
  verificationToken?: string;
  generateCode?: boolean;
  expiresIn?: string;
  language?: 'en' | 'tr' | 'ru';
}

interface ApiResponse {
  success: boolean;
  message?: string;
  messageId?: string;
  verificationCode?: string;
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
      verificationToken,
      generateCode = true,
      expiresIn = '24 hours',
      language = 'en',
    }: VerificationEmailRequest = req.body;

    // Validate required fields
    if (!userName || !userEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userName, userEmail',
      });
    }

    // Generate verification token if not provided
    const token = verificationToken || crypto.randomBytes(32).toString('hex');

    // Generate 6-digit verification code if requested
    const verificationCode = generateCode
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : undefined;

    // Build verification URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100';
    const verificationUrl = `${baseUrl}/${language}/auth/verify-email?token=${token}`;

    // Send email verification
    const result = await sendEmailVerification({
      to: userEmail,
      userName,
      verificationUrl,
      verificationCode,
      expiresIn,
      language,
    });

    if (!result.success) {
      logger.error('Failed to send verification email', new Error(result.error), {
        component: 'API:SendVerification',
        metadata: { userEmail },
      });

      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send verification email',
      });
    }

    logger.info('Verification email sent', {
      component: 'API:SendVerification',
      metadata: { userEmail, messageId: result.messageId },
    });

    return res.status(200).json({
      success: true,
      message: 'Verification email sent successfully',
      messageId: result.messageId,
      verificationCode: verificationCode, // Return code for storage in DB
    });
  } catch (error) {
    logger.error('Error in send-verification API', error as Error, {
      component: 'API:SendVerification',
    });

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
