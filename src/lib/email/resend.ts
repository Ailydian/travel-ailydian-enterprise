import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY is not set. Email functionality will be disabled.')
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
  from = 'Travel Ailydian <noreply@ailydian.com>',
  replyTo,
}: EmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 [DEV MODE] Email would be sent:', { to, subject })
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
      console.error('❌ Email send error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('✅ Email sent successfully:', data?.id)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('❌ Email send failed:', error)
    throw error
  }
}
