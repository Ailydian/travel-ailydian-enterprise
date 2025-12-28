import { render } from '@react-email/render';
import { sendEmail, EmailResponse } from './resend-client';
import logger from '../logger';

// Import email templates
import WelcomeEmail from './templates/welcome';
import BookingConfirmationEmail from './templates/booking-confirmation';
import BookingReminderEmail from './templates/booking-reminder';
import PaymentReceiptEmail from './templates/payment-receipt';
import PasswordResetEmail from './templates/password-reset';
import EmailVerificationEmail from './templates/email-verification';

// Type definitions
type Language = 'en' | 'tr' | 'ru';

interface BaseEmailParams {
  to: string;
  language?: Language;
}

interface WelcomeEmailParams extends BaseEmailParams {
  userName: string;
  userEmail: string;
}

interface BookingConfirmationParams extends BaseEmailParams {
  userName: string;
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
}

interface BookingReminderParams extends BaseEmailParams {
  userName: string;
  bookingId: string;
  propertyName: string;
  checkInDate: string;
  checkInTime?: string;
  address: string;
  confirmationUrl: string;
}

interface PaymentReceiptParams extends BaseEmailParams {
  userName: string;
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
}

interface PasswordResetParams extends BaseEmailParams {
  userName: string;
  resetUrl: string;
  expiresIn?: string;
}

interface EmailVerificationParams extends BaseEmailParams {
  userName: string;
  verificationUrl: string;
  verificationCode?: string;
  expiresIn?: string;
}

// Email subject translations
const subjects = {
  welcome: {
    en: 'Welcome to Travel.Ailydian!',
    tr: "Travel.Ailydian'a Hoş Geldiniz!",
    ru: 'Добро пожаловать в Travel.Ailydian!',
  },
  bookingConfirmation: {
    en: 'Booking Confirmed - Travel.Ailydian',
    tr: 'Rezervasyon Onaylandı - Travel.Ailydian',
    ru: 'Бронирование подтверждено - Travel.Ailydian',
  },
  bookingReminder: {
    en: 'Your Trip is Tomorrow! - Travel.Ailydian',
    tr: 'Seyahatiniz Yarın! - Travel.Ailydian',
    ru: 'Ваша поездка завтра! - Travel.Ailydian',
  },
  paymentReceipt: {
    en: 'Payment Receipt - Travel.Ailydian',
    tr: 'Ödeme Makbuzu - Travel.Ailydian',
    ru: 'Квитанция об оплате - Travel.Ailydian',
  },
  passwordReset: {
    en: 'Reset Your Password - Travel.Ailydian',
    tr: 'Şifrenizi Sıfırlayın - Travel.Ailydian',
    ru: 'Сброс пароля - Travel.Ailydian',
  },
  emailVerification: {
    en: 'Verify Your Email - Travel.Ailydian',
    tr: 'E-postanızı Doğrulayın - Travel.Ailydian',
    ru: 'Подтвердите Email - Travel.Ailydian',
  },
};

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(
  params: WelcomeEmailParams
): Promise<EmailResponse> {
  try {
    const { to, userName, userEmail, language = 'en' } = params;

    const emailHtml = render(
      WelcomeEmail({ userName, userEmail, language })
    );

    const result = await sendEmail({
      to,
      subject: subjects.welcome[language],
      html: emailHtml,
      tags: [
        { name: 'category', value: 'welcome' },
        { name: 'language', value: language },
      ],
    });

    logger.info('Welcome email sent', {
      component: 'EmailSender',
      metadata: { to, success: result.success },
    });

    return result;
  } catch (error) {
    logger.error('Failed to send welcome email', error as Error, {
      component: 'EmailSender',
    });
    return { success: false, error: 'Failed to send welcome email' };
  }
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(
  params: BookingConfirmationParams
): Promise<EmailResponse> {
  try {
    const { to, language = 'en', ...emailParams } = params;

    const emailHtml = render(
      BookingConfirmationEmail({ ...emailParams, language })
    );

    const result = await sendEmail({
      to,
      subject: subjects.bookingConfirmation[language],
      html: emailHtml,
      tags: [
        { name: 'category', value: 'booking-confirmation' },
        { name: 'bookingId', value: params.bookingId },
        { name: 'language', value: language },
      ],
    });

    logger.info('Booking confirmation email sent', {
      component: 'EmailSender',
      metadata: { to, bookingId: params.bookingId, success: result.success },
    });

    return result;
  } catch (error) {
    logger.error('Failed to send booking confirmation email', error as Error, {
      component: 'EmailSender',
    });
    return { success: false, error: 'Failed to send booking confirmation' };
  }
}

/**
 * Send booking reminder email (24h before check-in)
 */
export async function sendBookingReminder(
  params: BookingReminderParams
): Promise<EmailResponse> {
  try {
    const { to, language = 'en', ...emailParams } = params;

    const emailHtml = render(
      BookingReminderEmail({ ...emailParams, language })
    );

    const result = await sendEmail({
      to,
      subject: subjects.bookingReminder[language],
      html: emailHtml,
      tags: [
        { name: 'category', value: 'booking-reminder' },
        { name: 'bookingId', value: params.bookingId },
        { name: 'language', value: language },
      ],
    });

    logger.info('Booking reminder email sent', {
      component: 'EmailSender',
      metadata: { to, bookingId: params.bookingId, success: result.success },
    });

    return result;
  } catch (error) {
    logger.error('Failed to send booking reminder email', error as Error, {
      component: 'EmailSender',
    });
    return { success: false, error: 'Failed to send booking reminder' };
  }
}

/**
 * Send payment receipt email
 */
export async function sendPaymentReceipt(
  params: PaymentReceiptParams
): Promise<EmailResponse> {
  try {
    const { to, language = 'en', ...emailParams } = params;

    const emailHtml = render(PaymentReceiptEmail({ ...emailParams, language }));

    const result = await sendEmail({
      to,
      subject: subjects.paymentReceipt[language],
      html: emailHtml,
      tags: [
        { name: 'category', value: 'payment-receipt' },
        { name: 'receiptId', value: params.receiptId },
        { name: 'bookingId', value: params.bookingId },
        { name: 'language', value: language },
      ],
    });

    logger.info('Payment receipt email sent', {
      component: 'EmailSender',
      metadata: {
        to,
        receiptId: params.receiptId,
        success: result.success,
      },
    });

    return result;
  } catch (error) {
    logger.error('Failed to send payment receipt email', error as Error, {
      component: 'EmailSender',
    });
    return { success: false, error: 'Failed to send payment receipt' };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(
  params: PasswordResetParams
): Promise<EmailResponse> {
  try {
    const { to, language = 'en', ...emailParams } = params;

    const emailHtml = render(PasswordResetEmail({ ...emailParams, language }));

    const result = await sendEmail({
      to,
      subject: subjects.passwordReset[language],
      html: emailHtml,
      tags: [
        { name: 'category', value: 'password-reset' },
        { name: 'language', value: language },
      ],
    });

    logger.info('Password reset email sent', {
      component: 'EmailSender',
      metadata: { to, success: result.success },
    });

    return result;
  } catch (error) {
    logger.error('Failed to send password reset email', error as Error, {
      component: 'EmailSender',
    });
    return { success: false, error: 'Failed to send password reset email' };
  }
}

/**
 * Send email verification email
 */
export async function sendEmailVerification(
  params: EmailVerificationParams
): Promise<EmailResponse> {
  try {
    const { to, language = 'en', ...emailParams } = params;

    const emailHtml = render(
      EmailVerificationEmail({ ...emailParams, language })
    );

    const result = await sendEmail({
      to,
      subject: subjects.emailVerification[language],
      html: emailHtml,
      tags: [
        { name: 'category', value: 'email-verification' },
        { name: 'language', value: language },
      ],
    });

    logger.info('Email verification sent', {
      component: 'EmailSender',
      metadata: { to, success: result.success },
    });

    return result;
  } catch (error) {
    logger.error('Failed to send email verification', error as Error, {
      component: 'EmailSender',
    });
    return { success: false, error: 'Failed to send email verification' };
  }
}

/**
 * Schedule booking reminder (to be called 24h before check-in)
 * This is a placeholder - you would typically use a job queue like Bull or Agenda
 */
export async function scheduleBookingReminder(
  params: BookingReminderParams,
  sendAt: Date
): Promise<{ scheduled: boolean; scheduledFor: Date }> {
  try {
    // In a production environment, you would add this to a job queue
    // For now, we'll just log the intention
    logger.info('Booking reminder scheduled', {
      component: 'EmailSender',
      metadata: {
        to: params.to,
        bookingId: params.bookingId,
        scheduledFor: sendAt.toISOString(),
      },
    });

    // TODO: Implement actual job queue (e.g., Bull, Agenda, or BullMQ)
    // Example: await emailQueue.add('booking-reminder', params, { delay: delayMs });

    return {
      scheduled: true,
      scheduledFor: sendAt,
    };
  } catch (error) {
    logger.error('Failed to schedule booking reminder', error as Error, {
      component: 'EmailSender',
    });
    return {
      scheduled: false,
      scheduledFor: sendAt,
    };
  }
}

// Export all functions
export default {
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendBookingReminder,
  sendPaymentReceipt,
  sendPasswordReset,
  sendEmailVerification,
  scheduleBookingReminder,
};
