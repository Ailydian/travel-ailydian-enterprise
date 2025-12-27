import { Resend } from 'resend'
import logger from '../logger';

if (!process.env.RESEND_API_KEY) {
  logger.warn('⚠️  RESEND_API_KEY is not set. Email functionality will be disabled.', { component: 'Resend' })
}

export const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-dev')

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  from = 'Travel LyDian <noreply@lydian.com>',
  replyTo,
}: EmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY) {
      logger.debug('📧 [DEV MODE] Email would be sent:', { component: 'Resend', metadata: { data: { to, subject } } })
      return { success: true, messageId: 'dev-mode-' + Date.now() }
    }

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    })

    if (error) {
      logger.error('❌ Email send error:', error as Error, { component: 'Resend' })
      throw new Error(`Failed to send email: ${error.message}`)
    }

    logger.debug('✅ Email sent successfully:', { component: 'Resend', metadata: { data: data?.id } })
    return { success: true, messageId: data?.id }
  } catch (error) {
    logger.error('❌ Email send failed:', error as Error, { component: 'Resend' })
    throw error
  }
}
