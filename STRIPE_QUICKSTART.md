# Stripe Payment Integration - Quick Start Guide

## 5-Minute Setup

### Step 1: Get Stripe Test Keys (1 min)

1. Go to https://dashboard.stripe.com/register
2. Create a free account
3. Navigate to https://dashboard.stripe.com/test/apikeys
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### Step 2: Add Environment Variables (1 min)

Create or update `.env.local`:

```bash
# Stripe Test Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

**Note:** You'll get the webhook secret in Step 4.

### Step 3: Install Dependencies (1 min)

```bash
npm install
```

Dependencies are already in package.json, so this will install everything.

### Step 4: Set Up Local Webhooks (2 min)

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3100/api/payments/webhook
```

Copy the webhook secret (`whsec_...`) and add it to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

### Step 5: Start the Server

```bash
npm run dev
```

## Test the Integration

### Test Payment Flow

1. **Navigate to checkout:**
   ```
   http://localhost:3100/payment/checkout?bookingId=test_123&amount=99.99&email=test@example.com&name=John%20Doe
   ```

2. **Use Stripe test card:**
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: 12/34
   CVC: 123
   ZIP: 12345
   ```

3. **Click "Pay $99.99"**

4. **You should see:**
   - Payment processing spinner
   - Redirect to success page
   - Booking status updated in database

### Test Failed Payment

Use this card number to test failures:

```
Card Number: 4000 0000 0000 0002  (Card declined)
Expiry: 12/34
CVC: 123
```

## Using the Components in Your Code

### Basic Integration

```tsx
import { StripeCheckout } from '@/components/payment';

export default function BookingPage() {
  return (
    <StripeCheckout
      amount={99.99}
      bookingId="booking_123"
      customerEmail="user@example.com"
      onSuccess={(paymentIntentId) => {
        console.log('Payment successful!');
        router.push('/payment/success');
      }}
      onError={(error) => {
        console.error('Payment failed:', error);
      }}
    />
  );
}
```

## API Endpoints Available

### Create Payment Intent
```bash
POST /api/payments/create-intent
```

### Confirm Payment
```bash
POST /api/payments/confirm
```

### Webhook Handler
```bash
POST /api/payments/webhook
```

## Common Test Cards

| Scenario | Card Number |
|----------|-------------|
| Success | 4242 4242 4242 4242 |
| Declined | 4000 0000 0000 0002 |
| Insufficient Funds | 4000 0000 0000 9995 |
| Expired Card | 4000 0000 0000 0069 |
| Processing Error | 4000 0000 0000 0119 |
| 3D Secure (Success) | 4000 0027 6000 3184 |

More test cards: https://stripe.com/docs/testing

## Troubleshooting

### Issue: "Invalid API Key"

**Solution:** Check that your `.env.local` has the correct Stripe keys.

### Issue: Webhook not working

**Solution:** Make sure Stripe CLI is running:
```bash
stripe listen --forward-to localhost:3100/api/payments/webhook
```

### Issue: Payment not completing

**Solutions:**
1. Check browser console for errors
2. Verify Stripe keys are correct
3. Ensure booking ID exists in database

## Production Setup

When you're ready to go live:

1. Switch to live mode in Stripe Dashboard
2. Get live API keys
3. Update environment variables with live keys
4. Configure production webhook endpoint
5. Test with real card (use small amount)

See `PAYMENT_INTEGRATION.md` for full production setup guide.

## Next Steps

- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test webhook events
- [ ] Integrate with your booking flow
- [ ] Customize success/failure pages
- [ ] Add email notifications
- [ ] Set up production webhooks

## Support

- **Full Documentation:** See `PAYMENT_INTEGRATION.md`
- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing

---

**Ready to integrate payments?** Start with the checkout page:
```
http://localhost:3100/payment/checkout?bookingId=test_123&amount=99.99&email=test@example.com
```

**Happy coding!**
