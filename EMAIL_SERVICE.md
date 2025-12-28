# Email Service Documentation - Travel.Ailydian.com

## Overview

Complete email service integration using **Resend** and **React Email** components for Travel.Ailydian.com. This service provides beautiful, responsive, multilingual email templates with comprehensive API endpoints.

## 📋 Table of Contents

- [Setup & Configuration](#setup--configuration)
- [Email Templates](#email-templates)
- [API Endpoints](#api-endpoints)
- [Email Utilities](#email-utilities)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

---

## Setup & Configuration

### 1. Environment Variables

Add the following to your `.env` file:

```bash
# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=Travel.Ailydian <noreply@travel.ailydian.com>
RESEND_SUPPORT_EMAIL=support@travel.ailydian.com
```

**Get Your Resend API Key:**
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Add it to your `.env` file

### 2. Dependencies

Already installed in package.json:
- `resend@6.6.0` - Email sending service
- `@react-email/components@1.0.2` - React email components
- `@react-email/render@2.0.0` - Email rendering

---

## Email Templates

All templates are located in `/src/lib/email/templates/` and support **3 languages**: English, Turkish, Russian.

### ✅ 1. Welcome Email (`welcome.tsx`)

**Purpose:** Send to new users after registration
**Features:**
- Personalized greeting
- Platform features overview
- Call-to-action button
- Multilingual support

**Props:**
```typescript
{
  userName: string;
  userEmail: string;
  language?: 'en' | 'tr' | 'ru';
}
```

---

### ✅ 2. Booking Confirmation (`booking-confirmation.tsx`)

**Purpose:** Confirm booking after successful reservation
**Features:**
- Booking details (ID, dates, guests)
- Property information with image
- Total price breakdown
- Next steps guidance

**Props:**
```typescript
{
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
  language?: 'en' | 'tr' | 'ru';
}
```

---

### ✅ 3. Booking Reminder (`booking-reminder.tsx`)

**Purpose:** Remind users 24 hours before check-in
**Features:**
- Check-in information
- Property details
- Pre-trip checklist
- Yellow alert styling

**Props:**
```typescript
{
  userName: string;
  bookingId: string;
  propertyName: string;
  checkInDate: string;
  checkInTime?: string;
  address: string;
  confirmationUrl: string;
  language?: 'en' | 'tr' | 'ru';
}
```

---

### ✅ 4. Payment Receipt (`payment-receipt.tsx`)

**Purpose:** Send receipt after payment
**Features:**
- Receipt and booking IDs
- Payment breakdown (subtotal, taxes, fees)
- Payment method
- Download receipt button

**Props:**
```typescript
{
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
  language?: 'en' | 'tr' | 'ru';
}
```

---

### ✅ 5. Password Reset (`password-reset.tsx`)

**Purpose:** Allow users to reset forgotten password
**Features:**
- Secure reset link
- Expiration timer
- Security tips
- Red alert button

**Props:**
```typescript
{
  userName: string;
  resetUrl: string;
  expiresIn?: string; // Default: '1 hour'
  language?: 'en' | 'tr' | 'ru';
}
```

---

### ✅ 6. Email Verification (`email-verification.tsx`)

**Purpose:** Verify user email after registration
**Features:**
- Verification link
- 6-digit verification code
- Expiration notice
- Green success button

**Props:**
```typescript
{
  userName: string;
  verificationUrl: string;
  verificationCode?: string;
  expiresIn?: string; // Default: '24 hours'
  language?: 'en' | 'tr' | 'ru';
}
```

---

## API Endpoints

All endpoints are located in `/src/pages/api/email/`

### POST `/api/email/send-welcome`

Send welcome email to new users.

**Request Body:**
```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome email sent successfully",
  "messageId": "msg_abc123"
}
```

---

### POST `/api/email/send-booking-confirmation`

Send booking confirmation email.

**Request Body:**
```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "bookingId": "BK123456",
  "bookingType": "hotel",
  "propertyName": "Luxury Beach Resort",
  "checkInDate": "2024-01-15",
  "checkOutDate": "2024-01-20",
  "guests": 2,
  "totalPrice": "1500.00",
  "currency": "USD",
  "confirmationUrl": "https://travel.ailydian.com/bookings/BK123456",
  "propertyImage": "https://example.com/hotel.jpg",
  "address": "123 Beach Road, Antalya, Turkey",
  "language": "en"
}
```

---

### POST `/api/email/send-payment-receipt`

Send payment receipt email.

**Request Body:**
```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "receiptId": "RCP789456",
  "bookingId": "BK123456",
  "propertyName": "Luxury Beach Resort",
  "paymentDate": "2024-01-10 14:30:00",
  "paymentMethod": "Credit Card (**** 1234)",
  "subtotal": "1200.00",
  "taxes": "200.00",
  "fees": "100.00",
  "total": "1500.00",
  "currency": "USD",
  "receiptUrl": "https://travel.ailydian.com/receipts/RCP789456",
  "language": "en"
}
```

---

### POST `/api/email/send-verification`

Send email verification link.

**Request Body:**
```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "verificationToken": "abc123xyz789",
  "generateCode": true,
  "expiresIn": "24 hours",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent successfully",
  "messageId": "msg_abc123",
  "verificationCode": "123456"
}
```

---

## Email Utilities

Located in `/src/lib/email/sender.ts`

### Import

```typescript
import {
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendBookingReminder,
  sendPaymentReceipt,
  sendPasswordReset,
  sendEmailVerification,
} from '@/lib/email/sender';
```

### Functions

#### `sendWelcomeEmail(params)`

```typescript
const result = await sendWelcomeEmail({
  to: 'user@example.com',
  userName: 'John Doe',
  userEmail: 'user@example.com',
  language: 'en',
});
```

#### `sendBookingConfirmation(params)`

```typescript
const result = await sendBookingConfirmation({
  to: 'user@example.com',
  userName: 'John Doe',
  bookingId: 'BK123456',
  bookingType: 'hotel',
  propertyName: 'Luxury Beach Resort',
  checkInDate: '2024-01-15',
  checkOutDate: '2024-01-20',
  guests: 2,
  totalPrice: '1500.00',
  currency: 'USD',
  confirmationUrl: 'https://travel.ailydian.com/bookings/BK123456',
  language: 'en',
});
```

#### `sendPasswordReset(params)`

```typescript
const result = await sendPasswordReset({
  to: 'user@example.com',
  userName: 'John Doe',
  resetUrl: 'https://travel.ailydian.com/reset-password?token=abc123',
  expiresIn: '1 hour',
  language: 'en',
});
```

---

## Usage Examples

### 1. User Registration Flow

```typescript
// In your registration API endpoint
import { sendWelcomeEmail, sendEmailVerification } from '@/lib/email/sender';

// After creating user in database
const user = await createUser(userData);

// Send welcome email
await sendWelcomeEmail({
  to: user.email,
  userName: user.name,
  userEmail: user.email,
  language: user.preferredLanguage || 'en',
});

// Send verification email
await sendEmailVerification({
  to: user.email,
  userName: user.name,
  verificationUrl: `${siteUrl}/verify-email?token=${verificationToken}`,
  verificationCode: generatedCode,
  language: user.preferredLanguage || 'en',
});
```

### 2. Booking Workflow

```typescript
import {
  sendBookingConfirmation,
  sendPaymentReceipt,
  scheduleBookingReminder,
} from '@/lib/email/sender';

// After successful booking
const booking = await createBooking(bookingData);

// 1. Send booking confirmation
await sendBookingConfirmation({
  to: user.email,
  userName: user.name,
  bookingId: booking.id,
  bookingType: booking.type,
  propertyName: booking.property.name,
  checkInDate: booking.checkIn,
  checkOutDate: booking.checkOut,
  guests: booking.guests,
  totalPrice: booking.total,
  currency: booking.currency,
  confirmationUrl: `${siteUrl}/bookings/${booking.id}`,
  propertyImage: booking.property.image,
  address: booking.property.address,
  language: user.preferredLanguage || 'en',
});

// 2. Send payment receipt (after payment)
await sendPaymentReceipt({
  to: user.email,
  userName: user.name,
  receiptId: receipt.id,
  bookingId: booking.id,
  propertyName: booking.property.name,
  paymentDate: new Date().toISOString(),
  paymentMethod: payment.method,
  subtotal: booking.subtotal,
  taxes: booking.taxes,
  fees: booking.fees,
  total: booking.total,
  currency: booking.currency,
  receiptUrl: `${siteUrl}/receipts/${receipt.id}`,
  language: user.preferredLanguage || 'en',
});

// 3. Schedule reminder for 24h before check-in
const reminderDate = new Date(booking.checkIn);
reminderDate.setHours(reminderDate.getHours() - 24);

await scheduleBookingReminder(
  {
    to: user.email,
    userName: user.name,
    bookingId: booking.id,
    propertyName: booking.property.name,
    checkInDate: booking.checkIn,
    checkInTime: '15:00',
    address: booking.property.address,
    confirmationUrl: `${siteUrl}/bookings/${booking.id}`,
    language: user.preferredLanguage || 'en',
  },
  reminderDate
);
```

### 3. Password Reset Flow

```typescript
import { sendPasswordReset } from '@/lib/email/sender';

// In forgot-password API
const resetToken = generateResetToken();
const resetUrl = `${siteUrl}/reset-password?token=${resetToken}`;

await sendPasswordReset({
  to: user.email,
  userName: user.name,
  resetUrl,
  expiresIn: '1 hour',
  language: user.preferredLanguage || 'en',
});
```

---

## Testing

### Development Mode

In development, emails are logged to console instead of being sent:

```bash
NODE_ENV=development
RESEND_API_KEY=  # Leave empty or omit
```

**Output:**
```
📧 [DEV MODE] Email would be sent:
  To: user@example.com
  Subject: Welcome to Travel.Ailydian!
  From: Travel.Ailydian <noreply@travel.ailydian.com>
```

### Testing with Resend

1. Get a free Resend API key from [resend.com](https://resend.com)
2. Add it to your `.env` file
3. Send test email:

```bash
curl -X POST http://localhost:3100/api/email/send-welcome \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "Test User",
    "userEmail": "your-email@example.com",
    "language": "en"
  }'
```

### Email Preview (React Email)

To preview emails locally:

```bash
# Install React Email CLI (optional)
npm install -g @react-email/cli

# Start preview server
cd src/lib/email/templates
email dev
```

Visit `http://localhost:3000` to see all email templates.

---

## Customization

### Branding

Update branding in templates:

1. **Logo:** Replace logo URL in each template
   ```typescript
   <Img
     src="https://travel.ailydian.com/logo.png"  // Update this
     width="150"
     height="50"
     alt="Travel.Ailydian"
   />
   ```

2. **Colors:** Edit inline styles in each template
   ```typescript
   const button = {
     backgroundColor: '#2563eb',  // Primary color
     // ...
   };
   ```

3. **Footer:** Update copyright and links
   ```typescript
   const copyright = {
     // Customize footer text and styles
   };
   ```

### Adding New Languages

1. Add translations to template:
   ```typescript
   const translations = {
     en: { /* ... */ },
     tr: { /* ... */ },
     ru: { /* ... */ },
     de: {  // New language
       preview: 'Willkommen bei Travel.Ailydian',
       greeting: 'Willkommen!',
       // ... more translations
     },
   };
   ```

2. Update type definitions:
   ```typescript
   type Language = 'en' | 'tr' | 'ru' | 'de';
   ```

### Creating New Templates

1. Create template file: `src/lib/email/templates/my-template.tsx`
2. Use React Email components
3. Add translations for all languages
4. Create sender function in `sender.ts`
5. Create API endpoint in `src/pages/api/email/`

---

## Troubleshooting

### Common Issues

**1. Emails not sending**
- Check `RESEND_API_KEY` is set correctly
- Verify email address is valid
- Check Resend dashboard for errors

**2. Template rendering errors**
- Ensure all required props are provided
- Check for TypeScript type errors
- Verify React Email components are imported

**3. API endpoint errors**
- Validate request body matches interface
- Check server logs for detailed errors
- Ensure all required fields are provided

**4. Development mode logging**
- Set `RESEND_API_KEY` to enable actual sending
- Check console for "[DEV MODE]" messages

### Debug Logging

Enable detailed logging:

```typescript
import logger from '@/lib/logger';

logger.info('Email debug info', {
  component: 'EmailService',
  metadata: { /* debug data */ },
});
```

---

## Email Service Architecture

```
src/lib/email/
├── resend-client.ts          # Resend API wrapper
├── sender.ts                  # High-level email functions
└── templates/
    ├── welcome.tsx
    ├── booking-confirmation.tsx
    ├── booking-reminder.tsx
    ├── payment-receipt.tsx
    ├── password-reset.tsx
    └── email-verification.tsx

src/pages/api/email/
├── send-welcome.ts
├── send-booking-confirmation.ts
├── send-payment-receipt.ts
└── send-verification.ts
```

---

## Summary

### ✅ Email Templates Created: 6/6

1. ✅ Welcome Email
2. ✅ Booking Confirmation
3. ✅ Booking Reminder
4. ✅ Payment Receipt
5. ✅ Password Reset
6. ✅ Email Verification

### ✅ API Endpoints Created: 4/4

1. ✅ POST `/api/email/send-welcome`
2. ✅ POST `/api/email/send-booking-confirmation`
3. ✅ POST `/api/email/send-payment-receipt`
4. ✅ POST `/api/email/send-verification`

### ✅ Features

- 🌍 Multilingual support (EN, TR, RU)
- 📱 Responsive design
- 🎨 Travel.Ailydian branding
- 🔒 Secure token handling
- 📊 Email tracking with tags
- 🚀 Production-ready
- 📝 Comprehensive documentation

---

## Next Steps

1. **Add Resend API Key** to production environment
2. **Configure domain** in Resend dashboard for custom sender
3. **Set up email queue** (Bull/Agenda) for booking reminders
4. **Monitor email delivery** in Resend dashboard
5. **A/B test** email templates for better engagement

---

**Need Help?**
- Documentation: [Resend Docs](https://resend.com/docs)
- React Email: [React Email Docs](https://react.email)
- Support: support@travel.ailydian.com

---

**Last Updated:** December 28, 2024
**Version:** 1.0.0
**Author:** Travel.Ailydian Team
