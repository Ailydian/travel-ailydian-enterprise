import type { NextApiRequest, NextApiResponse } from 'next';
import { sendWelcomeEmail } from '@/lib/email/sender';
import logger from '@/lib/logger';

interface WelcomeEmailRequest {
  userName: string;
  userEmail: string;
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
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    const { userName, userEmail, language = 'en' }: WelcomeEmailRequest = req.body;

    // Validate required fields
    if (!userName || !userEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userName, userEmail',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Send welcome email
    const result = await sendWelcomeEmail({
      to: userEmail,
      userName,
      userEmail,
      language,
    });

    if (!result.success) {
      logger.error('Failed to send welcome email', new Error(result.error), {
        component: 'API:SendWelcome',
        metadata: { userEmail },
      });

      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send welcome email',
      });
    }

    logger.info('Welcome email sent successfully', {
      component: 'API:SendWelcome',
      metadata: { userEmail, messageId: result.messageId },
    });

    return res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully',
      messageId: result.messageId,
    });
  } catch (error) {
    logger.error('Error in send-welcome API', error as Error, {
      component: 'API:SendWelcome',
    });

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
