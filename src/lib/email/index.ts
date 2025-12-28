/**
 * Email Service - Travel.Ailydian.com
 *
 * Complete email service with Resend integration and React Email templates.
 * Supports multilingual emails (EN, TR, RU) with beautiful responsive designs.
 */

// Core email client
export { resendClient, sendEmail, sendBatchEmails, FROM_EMAIL, SUPPORT_EMAIL } from './resend-client';
export type { EmailPayload, EmailResponse } from './resend-client';

// Email sender utilities
export {
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendBookingReminder,
  sendPaymentReceipt,
  sendPasswordReset,
  sendEmailVerification,
  scheduleBookingReminder,
  default as emailSender,
} from './sender';

// Email templates (for custom rendering)
export { default as WelcomeEmail } from './templates/welcome';
export { default as BookingConfirmationEmail } from './templates/booking-confirmation';
export { default as BookingReminderEmail } from './templates/booking-reminder';
export { default as PaymentReceiptEmail } from './templates/payment-receipt';
export { default as PasswordResetEmail } from './templates/password-reset';
export { default as EmailVerificationEmail } from './templates/email-verification';

/**
 * Quick Usage Examples:
 *
 * 1. Send welcome email:
 * ```typescript
 * import { sendWelcomeEmail } from '@/lib/email';
 *
 * await sendWelcomeEmail({
 *   to: 'user@example.com',
 *   userName: 'John Doe',
 *   userEmail: 'user@example.com',
 *   language: 'en',
 * });
 * ```
 *
 * 2. Send booking confirmation:
 * ```typescript
 * import { sendBookingConfirmation } from '@/lib/email';
 *
 * await sendBookingConfirmation({
 *   to: 'user@example.com',
 *   userName: 'John Doe',
 *   bookingId: 'BK123456',
 *   bookingType: 'hotel',
 *   propertyName: 'Luxury Beach Resort',
 *   checkInDate: '2024-01-15',
 *   checkOutDate: '2024-01-20',
 *   guests: 2,
 *   totalPrice: '1500.00',
 *   currency: 'USD',
 *   confirmationUrl: 'https://travel.ailydian.com/bookings/BK123456',
 *   language: 'en',
 * });
 * ```
 *
 * 3. Custom email rendering:
 * ```typescript
 * import { render } from '@react-email/render';
 * import { WelcomeEmail, sendEmail } from '@/lib/email';
 *
 * const html = render(WelcomeEmail({ userName: 'John', userEmail: 'john@example.com', language: 'en' }));
 * await sendEmail({ to: 'john@example.com', subject: 'Welcome!', html });
 * ```
 *
 * See EMAIL_SERVICE.md for complete documentation.
 */
