# Email Service - Quick Start Guide
## Travel.Ailydian.com

> **Status:** ✅ FULLY IMPLEMENTED & READY TO USE

---

## 🚀 Quick Setup (2 Minutes)

### 1. Add Resend API Key

```bash
# In .env file
RESEND_API_KEY=re_your_api_key_here
```

**Get your key:** https://resend.com/api-keys

### 2. Import and Use

```typescript
import { sendWelcomeEmail } from '@/lib/email';

await sendWelcomeEmail({
  to: 'user@example.com',
  userName: 'John Doe',
  userEmail: 'user@example.com',
  language: 'en', // or 'tr', 'ru'
});
```

**That's it!** ✅

---

## 📧 Available Email Templates

| Template | Function | Use Case |
|----------|----------|----------|
| Welcome Email | `sendWelcomeEmail()` | New user registration |
| Booking Confirmation | `sendBookingConfirmation()` | After booking creation |
| Booking Reminder | `sendBookingReminder()` | 24h before check-in |
| Payment Receipt | `sendPaymentReceipt()` | After payment |
| Password Reset | `sendPasswordReset()` | Forgot password |
| Email Verification | `sendEmailVerification()` | Email verification |

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/email/send-welcome` | POST | Send welcome email |
| `/api/email/send-booking-confirmation` | POST | Send booking confirmation |
| `/api/email/send-payment-receipt` | POST | Send payment receipt |
| `/api/email/send-verification` | POST | Send email verification |

---

## 💻 Usage Examples

### Example 1: Send Welcome Email

```typescript
import { sendWelcomeEmail } from '@/lib/email';

// After user registration
const result = await sendWelcomeEmail({
  to: newUser.email,
  userName: newUser.name,
  userEmail: newUser.email,
  language: newUser.language || 'en',
});

if (result.success) {
  console.log('Email sent!', result.messageId);
}
```

### Example 2: Send Booking Confirmation

```typescript
import { sendBookingConfirmation } from '@/lib/email';

// After successful booking
await sendBookingConfirmation({
  to: user.email,
  userName: user.name,
  bookingId: booking.id,
  bookingType: 'hotel',
  propertyName: 'Luxury Beach Resort',
  checkInDate: 'Jan 15, 2025',
  checkOutDate: 'Jan 20, 2025',
  guests: 2,
  totalPrice: '1,500.00',
  currency: 'USD',
  confirmationUrl: `${siteUrl}/bookings/${booking.id}`,
  propertyImage: booking.property.image,
  address: booking.property.address,
  language: user.language || 'en',
});
```

### Example 3: Via API

```bash
curl -X POST http://localhost:3100/api/email/send-welcome \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "language": "en"
  }'
```

---

## 🌍 Languages Supported

- **English** (`en`)
- **Turkish** (`tr`)
- **Russian** (`ru`)

All templates have complete translations for all languages.

---

## 🧪 Testing

### Development Mode (No API Key)

Emails are logged to console:

```bash
# .env
RESEND_API_KEY=  # Leave empty
NODE_ENV=development
```

### Test Script

```bash
npx ts-node scripts/test-email-service.ts
```

Update `TEST_EMAIL` in the script with your email address.

---

## 📚 Full Documentation

- **Complete Guide:** [EMAIL_SERVICE.md](./EMAIL_SERVICE.md)
- **Implementation Report:** [EMAIL_SERVICE_IMPLEMENTATION_REPORT.md](./EMAIL_SERVICE_IMPLEMENTATION_REPORT.md)

---

## ✅ What's Included

- ✅ 6 Professional email templates
- ✅ 4 REST API endpoints
- ✅ Multilingual support (EN, TR, RU)
- ✅ Responsive design
- ✅ Travel.Ailydian branding
- ✅ Complete type safety
- ✅ Error handling & logging
- ✅ Development mode
- ✅ Batch email support
- ✅ Comprehensive documentation

---

## 🎯 Next Steps

1. ✅ **Add Resend API key** to `.env`
2. ✅ **Test emails** with test script
3. ✅ **Integrate** into your registration/booking flows
4. ✅ **Configure domain** in Resend dashboard (production)
5. ✅ **Monitor** email delivery in Resend dashboard

---

## 💡 Pro Tips

**Tip 1:** Use tags for analytics
```typescript
// Tags are automatically added by sender functions
// Track by category, booking ID, language, etc.
```

**Tip 2:** Schedule booking reminders
```typescript
import { scheduleBookingReminder } from '@/lib/email';

const reminderDate = new Date(booking.checkIn);
reminderDate.setHours(reminderDate.getHours() - 24);

await scheduleBookingReminder(params, reminderDate);
```

**Tip 3:** Batch emails for announcements
```typescript
import { sendBatchEmails } from '@/lib/email/resend-client';

const emails = users.map(user => ({
  to: user.email,
  subject: 'Special Offer!',
  html: renderTemplate(user),
}));

await sendBatchEmails(emails); // Sends in batches of 100
```

---

## ❓ Common Questions

**Q: Do I need a paid Resend account?**
A: Free tier allows 100 emails/day, 3,000/month. Upgrade as needed.

**Q: Can I customize the templates?**
A: Yes! Edit files in `/src/lib/email/templates/`

**Q: How do I add a new language?**
A: Add translations to the `translations` object in each template.

**Q: What about email analytics?**
A: Check Resend dashboard for opens, clicks, bounces.

---

## 🆘 Troubleshooting

**Emails not sending?**
- Check `RESEND_API_KEY` is set
- Verify email address format
- Check Resend dashboard for errors

**Template errors?**
- Ensure all required props are provided
- Check TypeScript type errors
- Verify imports are correct

**API endpoint errors?**
- Validate request body
- Check server logs
- Ensure all required fields are present

---

## 📞 Support

- **Documentation:** EMAIL_SERVICE.md
- **Resend Docs:** https://resend.com/docs
- **React Email:** https://react.email

---

**Created:** December 28, 2024
**Status:** Production Ready ✅
**Version:** 1.0.0

---

**Happy Emailing!** 📧✨
