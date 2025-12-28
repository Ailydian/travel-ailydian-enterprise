# Stripe Payment Testing Guide

## Test Scenarios Checklist

Use this guide to thoroughly test the Stripe payment integration before going live.

---

## Setup Verification

### Environment Variables

- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set (starts with `pk_test_`)
- [ ] `STRIPE_SECRET_KEY` is set (starts with `sk_test_`)
- [ ] `STRIPE_WEBHOOK_SECRET` is set (starts with `whsec_`)
- [ ] All keys are in `.env.local` (NOT committed to git)

### Stripe CLI

- [ ] Stripe CLI installed
- [ ] Logged in: `stripe login`
- [ ] Webhook forwarding running: `stripe listen --forward-to localhost:3100/api/payments/webhook`

### Server

- [ ] Development server running: `npm run dev`
- [ ] No errors in console
- [ ] Port 3100 accessible

---

## Test Scenario 1: Successful Payment

### Steps

1. Navigate to:
   ```
   http://localhost:3100/payment/checkout?bookingId=test_001&amount=50.00&email=success@test.com&name=Test%20User
   ```

2. Enter test card:
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: 12/34
   CVC: 123
   ZIP: 12345
   ```

3. Click "Pay $50.00"

### Expected Results

- [ ] Payment processing spinner appears
- [ ] Payment completes successfully
- [ ] Redirects to `/payment/success`
- [ ] Success page shows:
  - [ ] Booking ID: `test_001`
  - [ ] Amount: `$50.00`
  - [ ] Transaction ID displayed
  - [ ] "Confirmation sent" message
- [ ] Webhook received in Stripe CLI:
  - [ ] Event: `payment_intent.succeeded`
- [ ] Database updated:
  - [ ] Booking status: `CONFIRMED`
  - [ ] Payment status: `PAID`

---

## Test Scenario 2: Declined Card

### Steps

1. Navigate to checkout with:
   ```
   http://localhost:3100/payment/checkout?bookingId=test_002&amount=25.00&email=declined@test.com
   ```

2. Enter declined test card:
   ```
   Card Number: 4000 0000 0000 0002
   Expiry: 12/34
   CVC: 123
   ```

3. Click "Pay $25.00"

### Expected Results

- [ ] Error message appears
- [ ] Payment does not complete
- [ ] Redirects to `/payment/failed`
- [ ] Error page shows decline message
- [ ] "Try Again" button available
- [ ] Booking remains in pending status

---

## Test Scenario 3: Insufficient Funds

### Steps

1. Use test card:
   ```
   Card Number: 4000 0000 0000 9995
   ```

### Expected Results

- [ ] Payment fails with "Insufficient funds" error
- [ ] Error handled gracefully
- [ ] User shown appropriate message

---

## Test Scenario 4: Expired Card

### Steps

1. Use test card:
   ```
   Card Number: 4000 0000 0000 0069
   ```

### Expected Results

- [ ] Payment fails with "Expired card" error
- [ ] Clear error message displayed
- [ ] Retry option available

---

## Test Scenario 5: 3D Secure Authentication

### Steps

1. Use 3D Secure test card:
   ```
   Card Number: 4000 0027 6000 3184
   ```

2. Complete authentication

### Expected Results

- [ ] 3D Secure modal appears
- [ ] After completing auth, payment succeeds
- [ ] Redirects to success page

---

## Test Scenario 6: Processing Error

### Steps

1. Use test card:
   ```
   Card Number: 4000 0000 0000 0119
   ```

### Expected Results

- [ ] Payment fails with processing error
- [ ] Error handled gracefully
- [ ] User can retry

---

## Test Scenario 7: Invalid Email

### Steps

1. Navigate to checkout with invalid email:
   ```
   http://localhost:3100/payment/checkout?bookingId=test_003&amount=10.00&email=invalid-email
   ```

### Expected Results

- [ ] API returns validation error
- [ ] Error message displayed
- [ ] Payment not processed

---

## Test Scenario 8: Missing Parameters

### Steps

1. Navigate to checkout without required params:
   ```
   http://localhost:3100/payment/checkout
   ```

### Expected Results

- [ ] "Invalid Payment Link" error shown
- [ ] "Go Back" button available
- [ ] No payment form displayed

---

## Test Scenario 9: Webhook Events

### Payment Intent Succeeded

1. Complete successful payment
2. Check Stripe CLI output

**Expected:**
```
payment_intent.succeeded [evt_...]
```

3. Check server logs

**Expected:**
```
Processing webhook event: payment_intent.succeeded
Booking test_001 confirmed after successful payment
```

### Payment Intent Failed

1. Complete failed payment
2. Check webhook event

**Expected:**
```
payment_intent.payment_failed [evt_...]
```

---

## Test Scenario 10: Database Updates

### Setup

Ensure you have a test booking in the database:

```sql
INSERT INTO "Booking" (id, status, "paymentStatus", "createdAt", "updatedAt")
VALUES ('test_001', 'PENDING', 'PENDING', NOW(), NOW());
```

### Test

1. Complete payment for `bookingId=test_001`

2. Query database:
   ```sql
   SELECT status, "paymentStatus", "paymentIntentId", "paidAt"
   FROM "Booking"
   WHERE id = 'test_001';
   ```

**Expected Results:**

- [ ] `status`: `CONFIRMED`
- [ ] `paymentStatus`: `PAID`
- [ ] `paymentIntentId`: `pi_...` (not null)
- [ ] `paidAt`: timestamp (not null)

---

## API Endpoint Tests

### Test 1: Create Payment Intent

```bash
curl -X POST http://localhost:3100/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99.99,
    "bookingId": "test_api_001",
    "customerEmail": "api@test.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_..."
}
```

### Test 2: Invalid Amount

```bash
curl -X POST http://localhost:3100/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": -10,
    "bookingId": "test_api_002",
    "customerEmail": "api@test.com"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Invalid amount"
}
```

### Test 3: Confirm Payment

```bash
curl -X POST http://localhost:3100/api/payments/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "paymentIntentId": "pi_..." // Use actual payment intent ID
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "bookingId": "test_api_001",
  "status": "succeeded"
}
```

---

## Component Tests

### StripeCheckout Component

**Props Validation:**

- [ ] `amount` (required) - Accepts numbers
- [ ] `bookingId` (required) - Accepts strings
- [ ] `customerEmail` (required) - Validates email format
- [ ] `customerName` (optional) - Works without it
- [ ] `onSuccess` (optional) - Callback fires on success
- [ ] `onError` (optional) - Callback fires on error

**UI Tests:**

- [ ] Stripe Elements form renders
- [ ] Card input field appears
- [ ] Payment button shows correct amount
- [ ] Loading spinner appears during processing
- [ ] Error messages display properly

### PaymentSuccess Component

- [ ] Displays booking ID
- [ ] Shows transaction ID
- [ ] Formats amount correctly
- [ ] "View Booking Details" link works
- [ ] "Back to Home" link works

### PaymentFailed Component

- [ ] Shows error message
- [ ] Displays common failure reasons
- [ ] "Try Again" button works
- [ ] "Contact Support" link present

---

## Security Tests

### Test 1: Webhook Signature Verification

1. Send fake webhook (without signature):
   ```bash
   curl -X POST http://localhost:3100/api/payments/webhook \
     -H "Content-Type: application/json" \
     -d '{"type":"payment_intent.succeeded"}'
   ```

**Expected:** 400 error "Missing signature"

### Test 2: Invalid Webhook Signature

1. Send webhook with wrong signature:
   ```bash
   curl -X POST http://localhost:3100/api/payments/webhook \
     -H "Content-Type: application/json" \
     -H "stripe-signature: invalid" \
     -d '{"type":"payment_intent.succeeded"}'
   ```

**Expected:** 400 error "Webhook signature verification failed"

### Test 3: Secret Key Exposure

- [ ] Check browser DevTools Network tab
- [ ] Verify `STRIPE_SECRET_KEY` never sent to client
- [ ] Only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in client code

---

## Performance Tests

### Test 1: Payment Intent Creation Speed

- [ ] Create payment intent
- [ ] Measure time (should be < 2 seconds)
- [ ] Check for retry logic on failure

### Test 2: Concurrent Payments

1. Open 5 browser tabs
2. Initiate payment in each
3. Complete all payments

**Expected:**

- [ ] All payments process successfully
- [ ] No race conditions
- [ ] Each gets unique payment intent

---

## Error Handling Tests

### Test 1: Network Error

1. Turn off internet connection
2. Try to create payment

**Expected:**

- [ ] Error message appears
- [ ] Retry logic kicks in
- [ ] User-friendly error shown

### Test 2: Stripe API Down

(Simulate by using invalid API key)

**Expected:**

- [ ] Graceful error handling
- [ ] Clear error message to user
- [ ] Logged on server side

---

## Integration Tests

### Booking Flow Integration

1. Create a new booking
2. Proceed to payment
3. Complete payment
4. Check booking status

**Expected:**

- [ ] Seamless flow from booking to payment
- [ ] Booking status updates automatically
- [ ] User receives confirmation

---

## Browser Compatibility

Test on multiple browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome (Android)

---

## Mobile Testing

### Responsive Design

- [ ] Checkout form responsive on mobile
- [ ] Card input works on touch devices
- [ ] Payment button easily tappable
- [ ] Success/failure pages mobile-friendly

### Mobile Wallets

- [ ] Apple Pay appears on iOS Safari (if enabled)
- [ ] Google Pay appears on Chrome Android (if enabled)

---

## Stress Testing

### High Volume

1. Process 100 test payments rapidly
2. Monitor server resources
3. Check all webhooks received

**Expected:**

- [ ] No timeouts
- [ ] All payments processed
- [ ] All webhooks handled

---

## Pre-Production Checklist

- [ ] All test scenarios pass
- [ ] No errors in browser console
- [ ] No errors in server logs
- [ ] Database updates correctly
- [ ] Webhooks processed successfully
- [ ] Email receipts sent (if implemented)
- [ ] Refund flow tested
- [ ] Error handling comprehensive
- [ ] Security tests pass
- [ ] Performance acceptable
- [ ] Mobile experience good

---

## Production Testing (Use Small Amounts!)

After switching to live keys:

1. **Test with Real Card** (use $1.00)
   - [ ] Payment succeeds
   - [ ] Charge appears in Stripe Dashboard
   - [ ] Booking updated
   - [ ] Webhook received

2. **Refund Test**
   - [ ] Issue refund from Stripe Dashboard
   - [ ] Webhook updates booking
   - [ ] Refund processed

3. **Monitor First 24 Hours**
   - [ ] Check Stripe Dashboard regularly
   - [ ] Monitor application logs
   - [ ] Watch for errors or disputes

---

## Test Results Template

```
Test Date: _______________
Tester: __________________
Environment: Test / Production

| Scenario | Status | Notes |
|----------|--------|-------|
| Successful Payment | ✅ / ❌ | |
| Declined Card | ✅ / ❌ | |
| Insufficient Funds | ✅ / ❌ | |
| Expired Card | ✅ / ❌ | |
| 3D Secure | ✅ / ❌ | |
| Processing Error | ✅ / ❌ | |
| Invalid Email | ✅ / ❌ | |
| Missing Parameters | ✅ / ❌ | |
| Webhook Events | ✅ / ❌ | |
| Database Updates | ✅ / ❌ | |

Overall Result: PASS / FAIL

Issues Found:
1. ________________
2. ________________

Next Steps:
1. ________________
2. ________________
```

---

## Automated Testing (Future)

Consider implementing:

- [ ] Jest unit tests for Stripe service
- [ ] Integration tests for API endpoints
- [ ] E2E tests with Cypress/Playwright
- [ ] Webhook event simulation tests

---

**Happy Testing!**

For questions, see `PAYMENT_INTEGRATION.md` or contact support.
