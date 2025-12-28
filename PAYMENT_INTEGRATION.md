# Stripe Payment Integration Documentation

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [API Endpoints](#api-endpoints)
5. [Components](#components)
6. [Testing](#testing)
7. [Production Setup](#production-setup)
8. [Webhook Configuration](#webhook-configuration)
9. [Error Handling](#error-handling)
10. [Security Best Practices](#security-best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Overview

This project uses **Stripe** for payment processing. The integration includes:

- **Server-side payment intent creation**
- **Client-side payment collection with Stripe Elements**
- **Webhook handling for asynchronous payment events**
- **Automatic booking status updates**
- **Refund and dispute handling**

### Architecture

```
User -> StripeCheckout Component -> API (/api/payments/create-intent)
                                 -> Stripe PaymentIntent Created
                                 -> User Enters Card Details
                                 -> Payment Confirmed
                                 -> API (/api/payments/confirm)
                                 -> Booking Status Updated
                                 -> Success/Failure Page

Stripe Webhooks -> API (/api/payments/webhook) -> Database Updated
```

---

## Installation

Stripe dependencies are already installed. If you need to reinstall:

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

**Installed Packages:**

- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe.js loader
- `@stripe/react-stripe-js` - React components for Stripe Elements

---

## Configuration

### Environment Variables

Add these variables to your `.env.local` file:

```bash
# Stripe Configuration
# For TESTING - Use test keys (pk_test_... and sk_test_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# For PRODUCTION - Use live keys (pk_live_... and sk_live_...)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51...
# STRIPE_SECRET_KEY=sk_live_51...
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### Get Your Stripe Keys

1. **Sign up for Stripe**: https://dashboard.stripe.com/register
2. **Get Test Keys**: https://dashboard.stripe.com/test/apikeys
3. **Get Live Keys** (for production): https://dashboard.stripe.com/apikeys

---

## API Endpoints

### 1. Create Payment Intent

**Endpoint:** `POST /api/payments/create-intent`

**Purpose:** Creates a Stripe PaymentIntent for a booking

**Request Body:**

```typescript
{
  amount: number;        // Amount in dollars (e.g., 99.99)
  bookingId: string;     // Booking ID
  customerEmail: string; // Customer email
  customerName?: string; // Customer name (optional)
  description?: string;  // Payment description (optional)
}
```

**Response:**

```typescript
{
  success: boolean;
  clientSecret?: string;      // Stripe client secret
  paymentIntentId?: string;   // Payment intent ID
  error?: string;             // Error message if failed
}
```

**Example:**

```javascript
const response = await fetch('/api/payments/create-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 99.99,
    bookingId: 'booking_123',
    customerEmail: 'user@example.com',
  }),
});

const data = await response.json();
```

---

### 2. Confirm Payment

**Endpoint:** `POST /api/payments/confirm`

**Purpose:** Confirms a payment and updates booking status

**Request Body:**

```typescript
{
  paymentIntentId: string; // Stripe payment intent ID
}
```

**Response:**

```typescript
{
  success: boolean;
  bookingId?: string;
  status?: string;
  error?: string;
}
```

---

### 3. Webhook Handler

**Endpoint:** `POST /api/payments/webhook`

**Purpose:** Receives Stripe webhook events

**Handled Events:**

- `payment_intent.succeeded` - Payment successful
- `payment_intent.payment_failed` - Payment failed
- `payment_intent.canceled` - Payment canceled
- `charge.refunded` - Payment refunded
- `charge.dispute.created` - Dispute created

**Security:** Verifies webhook signature using `STRIPE_WEBHOOK_SECRET`

---

## Components

### 1. StripeCheckout

**Location:** `src/components/payment/StripeCheckout.tsx`

**Usage:**

```tsx
import { StripeCheckout } from '@/components/payment';

<StripeCheckout
  amount={99.99}
  bookingId="booking_123"
  customerEmail="user@example.com"
  customerName="John Doe"
  description="Hotel Booking - 3 nights"
  onSuccess={(paymentIntentId) => {
    console.log('Payment successful:', paymentIntentId);
    router.push('/payment/success');
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
  }}
/>
```

**Props:**

- `amount` - Amount in dollars
- `bookingId` - Booking ID
- `customerEmail` - Customer email (required)
- `customerName` - Customer name (optional)
- `description` - Payment description (optional)
- `onSuccess` - Callback on successful payment
- `onError` - Callback on payment error

---

### 2. PaymentSuccess

**Location:** `src/components/payment/PaymentSuccess.tsx`

**Usage:**

```tsx
import { PaymentSuccess } from '@/components/payment';

<PaymentSuccess
  bookingId="booking_123"
  paymentIntentId="pi_..."
  amount={99.99}
  customerEmail="user@example.com"
/>
```

---

### 3. PaymentFailed

**Location:** `src/components/payment/PaymentFailed.tsx`

**Usage:**

```tsx
import { PaymentFailed } from '@/components/payment';

<PaymentFailed
  bookingId="booking_123"
  error="Your card was declined."
  onRetry={() => {
    // Retry payment logic
  }}
/>
```

---

## Testing

### Test Mode Setup

1. **Use Test Keys** - Ensure you're using `pk_test_...` and `sk_test_...` keys
2. **No Real Money** - Test mode uses fake cards and doesn't charge real money
3. **Stripe Test Cards** - Use Stripe's test card numbers

### Test Card Numbers

#### Successful Payments

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### Failed Payments

**Card Declined:**
```
Card Number: 4000 0000 0000 0002
```

**Insufficient Funds:**
```
Card Number: 4000 0000 0000 9995
```

**Expired Card:**
```
Card Number: 4000 0000 0000 0069
```

**Processing Error:**
```
Card Number: 4000 0000 0000 0119
```

#### 3D Secure Authentication

**Requires Authentication (Success):**
```
Card Number: 4000 0027 6000 3184
```

**Requires Authentication (Failure):**
```
Card Number: 4000 0082 6000 3178
```

### Full Test Card List

See official Stripe documentation: https://stripe.com/docs/testing

---

## Production Setup

### 1. Get Live API Keys

1. Complete Stripe account activation
2. Switch to "Live mode" in Stripe Dashboard
3. Get live keys from: https://dashboard.stripe.com/apikeys
4. Update environment variables:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### 2. Configure Webhooks (see below)

### 3. Enable Required Payment Methods

In Stripe Dashboard:
- Go to Settings → Payment Methods
- Enable desired payment methods (cards, wallets, etc.)

### 4. Set Up Payout Schedule

In Stripe Dashboard:
- Go to Settings → Payouts
- Configure payout schedule and bank account

### 5. Configure Email Receipts

In Stripe Dashboard:
- Go to Settings → Emails
- Enable customer email receipts

---

## Webhook Configuration

Webhooks allow Stripe to notify your application about payment events.

### Local Development (using Stripe CLI)

1. **Install Stripe CLI:**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe
   ```

2. **Login to Stripe:**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server:**
   ```bash
   stripe listen --forward-to localhost:3100/api/payments/webhook
   ```

4. **Copy webhook signing secret:**
   ```
   Your webhook signing secret is: whsec_...
   ```

5. **Add to .env.local:**
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Production Setup

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com/webhooks

2. **Add Endpoint:**
   - Click "Add endpoint"
   - URL: `https://travel.ailydian.com/api/payments/webhook`

3. **Select Events:**
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
   - `charge.refunded`
   - `charge.dispute.created`

4. **Get Webhook Secret:**
   - Click on the webhook endpoint
   - Reveal and copy the signing secret
   - Add to production environment variables

5. **Verify Webhook:**
   - Send test webhook from Stripe Dashboard
   - Check your application logs

---

## Error Handling

### Common Errors

#### 1. Invalid API Key

**Error:** `Invalid API Key provided`

**Solution:** Check that your `STRIPE_SECRET_KEY` is correct and starts with `sk_test_` or `sk_live_`

---

#### 2. Webhook Signature Verification Failed

**Error:** `Webhook signature verification failed`

**Solution:**
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Verify you're using the correct webhook secret for your environment (test/live)

---

#### 3. Card Declined

**Error:** `Your card was declined`

**Solutions:**
- Customer should contact their bank
- Try a different payment method
- In test mode, use a different test card

---

#### 4. Payment Intent Already Succeeded

**Error:** `This PaymentIntent's payment has already succeeded`

**Solution:** This is expected behavior. Don't retry already-succeeded payments.

---

## Security Best Practices

### 1. Never Expose Secret Keys

- **NEVER** commit `.env` files to git
- **NEVER** use secret keys in client-side code
- Use `NEXT_PUBLIC_` prefix only for publishable keys

### 2. Verify Webhook Signatures

- Always verify webhook signatures to prevent fake webhooks
- The webhook endpoint already handles this automatically

### 3. Use HTTPS in Production

- Stripe requires HTTPS for live mode
- Never use HTTP in production

### 4. Implement Rate Limiting

- Add rate limiting to payment endpoints
- Prevent payment abuse

### 5. Log Payment Events

- Log all payment attempts (success and failures)
- Monitor for suspicious activity

### 6. PCI Compliance

- **Never** handle raw card data directly
- Use Stripe Elements (already implemented)
- Let Stripe handle all card data

---

## Troubleshooting

### Issue: Payment Not Completing

**Symptoms:**
- Payment spinner keeps loading
- No success/error message

**Solutions:**
1. Check browser console for errors
2. Verify Stripe keys are correct
3. Check that booking ID exists in database
4. Ensure network connection is stable

---

### Issue: Webhook Not Firing

**Symptoms:**
- Payment succeeds but booking status not updated
- No webhook logs

**Solutions:**
1. Verify webhook endpoint is accessible publicly
2. Check webhook secret is correct
3. Review Stripe Dashboard webhook logs
4. Ensure API route returns 200 status

---

### Issue: Payment Succeeded But Booking Not Updated

**Symptoms:**
- Payment shows as succeeded in Stripe
- Booking status still pending

**Solutions:**
1. Check webhook is configured correctly
2. Verify database connection
3. Check application logs for errors
4. Manually update booking using payment intent ID

---

### Testing Checklist

- [ ] Install Stripe packages
- [ ] Add environment variables
- [ ] Create payment intent successfully
- [ ] Display Stripe Elements form
- [ ] Process successful payment
- [ ] Handle payment failure
- [ ] Receive webhook events
- [ ] Update booking status
- [ ] Display success page
- [ ] Display error page
- [ ] Test refund flow
- [ ] Verify email receipts

---

## Production Checklist

- [ ] Switch to live API keys
- [ ] Configure production webhook endpoint
- [ ] Enable required payment methods
- [ ] Set up payout schedule
- [ ] Configure email receipts
- [ ] Test live payment flow
- [ ] Monitor Stripe Dashboard
- [ ] Set up fraud detection rules
- [ ] Configure 3D Secure
- [ ] Review and accept Stripe terms

---

## Support

### Stripe Resources

- **Documentation:** https://stripe.com/docs
- **API Reference:** https://stripe.com/docs/api
- **Support:** https://support.stripe.com

### Project Support

- **Email:** support@travel.ailydian.com
- **Developer Docs:** Check `/docs` folder

---

## Additional Features (Future)

- [ ] Subscription payments
- [ ] Multiple currencies
- [ ] Apple Pay / Google Pay
- [ ] SEPA Direct Debit (Europe)
- [ ] Klarna / Afterpay (Buy Now Pay Later)
- [ ] Payment plans / installments
- [ ] Customer payment method management
- [ ] Automatic receipt generation
- [ ] Invoice creation

---

**Last Updated:** 2025-12-28

**Version:** 1.0.0

**Integration Status:** ✅ Complete
