import { Resend } from 'resend';
import logger from '../logger';

// Initialize Resend client
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Travel.Ailydian <noreply@travel.ailydian.com>';
const SUPPORT_EMAIL = process.env.RESEND_SUPPORT_EMAIL || 'support@travel.ailydian.com';

if (!RESEND_API_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('RESEND_API_KEY must be set in production environment');
}

export const resendClient = new Resend(RESEND_API_KEY || 'dummy-key-for-dev');

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
  attachments?: {
    filename: string;
    content: Buffer | string;
  }[];
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email using Resend
 * @param payload - Email payload
 * @returns Email response with success status and message ID
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
  try {
    const {
      to,
      subject,
      html,
      from = FROM_EMAIL,
      replyTo = SUPPORT_EMAIL,
      tags = [],
      attachments = [],
    } = payload;

    // Development mode - log instead of sending
    if (!RESEND_API_KEY || process.env.NODE_ENV === 'development') {
      logger.info('📧 [DEV MODE] Email would be sent:', {
        component: 'ResendClient',
        metadata: {
          to: Array.isArray(to) ? to : [to],
          subject,
          from,
          tags: tags.map(t => `${t.name}:${t.value}`).join(', '),
        },
      });
      return {
        success: true,
        messageId: `dev-mode-${Date.now()}`,
      };
    }

    // Send email via Resend
    const { data, error } = await resendClient.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      tags,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      logger.error('❌ Resend API error:', error as Error, {
        component: 'ResendClient',
        metadata: { subject, to },
      });
      return {
        success: false,
        error: error.message,
      };
    }

    logger.info('✅ Email sent successfully', {
      component: 'ResendClient',
      metadata: {
        messageId: data?.id,
        subject,
        to: Array.isArray(to) ? to : [to],
      },
    });

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    logger.error('❌ Failed to send email:', error as Error, {
      component: 'ResendClient',
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send batch emails (max 100 at a time per Resend limits)
 * @param payloads - Array of email payloads
 * @returns Array of email responses
 */
export async function sendBatchEmails(
  payloads: EmailPayload[]
): Promise<EmailResponse[]> {
  const BATCH_SIZE = 100;
  const results: EmailResponse[] = [];

  // Process in batches
  for (let i = 0; i < payloads.length; i += BATCH_SIZE) {
    const batch = payloads.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(payload => sendEmail(payload));
    const batchResults = await Promise.allSettled(batchPromises);

    batchResults.forEach(result => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        results.push({
          success: false,
          error: result.reason?.message || 'Unknown error',
        });
      }
    });
  }

  logger.info(`📧 Batch email sent: ${results.filter(r => r.success).length}/${results.length} successful`, {
    component: 'ResendClient',
  });

  return results;
}

export { FROM_EMAIL, SUPPORT_EMAIL };
