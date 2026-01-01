# Sentry Quick Start Guide

**5-Minute Setup for Travel.AILYDIAN Platform**

## Step 1: Get Sentry Credentials (2 minutes)

### Create Sentry Account
1. Go to https://sentry.io
2. Sign up with email or GitHub
3. Create organization: `ailydian`

### Create Project
1. Click "Create Project"
2. Platform: **Next.js**
3. Project name: `travel-lydian`
4. Alert frequency: **On every new issue**
5. Click "Create Project"

### Get DSN
```
Copy the DSN shown on screen:
https://abc123def456@o123456.ingest.sentry.io/4567890
```

### Generate Auth Token
1. Settings → Auth Tokens → Create New Token
2. Name: `Travel AILYDIAN CI/CD`
3. Scopes: ✅ `project:read` ✅ `project:write` ✅ `project:releases`
4. Click "Create Token"
5. Copy token: `sntrys_xxxxxxxxxxxxx`

---

## Step 2: Configure Environment Variables (1 minute)

Create `.env.local`:

```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/4567890
SENTRY_ORG=ailydian
SENTRY_PROJECT=travel-lydian
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_VERSION=2.0.0
```

---

## Step 3: Test Integration (2 minutes)

### Build the project
```bash
npm run build
```

### Start dev server
```bash
npm run dev
```

### Test error capture
```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Test endpoints
curl -X POST http://localhost:3100/api/test-sentry?type=exception
```

### Check Sentry Dashboard
1. Go to https://sentry.io/organizations/ailydian/issues/
2. You should see a new error: "Test Exception from Sentry Integration"
3. Click on the error to see details

---

## Step 4: Start Using Sentry

### In API Routes

```typescript
import { withSentryApiHandler, ApiErrors } from '@/lib/middleware/sentry-api-handler';

export default withSentryApiHandler(async (req, res) => {
  if (!req.body.userId) {
    throw ApiErrors.badRequest('Missing userId');
  }

  const data = await fetchData(req.body.userId);
  res.json(data);
}, {
  trackPerformance: true,
  tags: { feature: 'booking' }
});
```

### In React Components

Already integrated! ErrorBoundary automatically catches and reports errors.

### In Business Logic

```typescript
import { captureException, measurePerformance } from '@/lib/monitoring/sentry-advanced';

try {
  const result = await measurePerformance('search-hotels', async () => {
    return await searchHotels(query);
  });
} catch (error) {
  captureException(error, {
    tags: { feature: 'search' },
    extra: { query }
  });
  throw error;
}
```

---

## Common Use Cases

### Track Booking Errors
```typescript
import { trackBookingError } from '@/lib/monitoring/sentry-advanced';

trackBookingError(error, {
  bookingType: 'hotel',
  step: 'payment',
  userId: user.id,
  amount: 1000,
  currency: 'TRY'
});
```

### Track Payment Success
```typescript
import { trackPaymentSuccess } from '@/lib/monitoring/sentry-advanced';

trackPaymentSuccess({
  paymentId: payment.id,
  provider: 'stripe',
  amount: 1000,
  currency: 'TRY',
  method: 'card',
  userId: user.id
});
```

### Set User Context
```typescript
import { setUserContext, clearUserContext } from '@/lib/monitoring/sentry-advanced';

// On login
setUserContext(user.id, user.role);

// On logout
clearUserContext();
```

---

## Alert Configuration (Optional)

### High Error Rate Alert
1. Go to Sentry → Alerts → Create Alert
2. **When**: Issue is seen
3. **Then**: Send notification to Email
4. **Filter**: `level:error`
5. Save

### Payment Error Alert (Critical)
1. Go to Sentry → Alerts → Create Alert
2. **When**: Issue is seen
3. **Then**: Send notification to Slack/PagerDuty
4. **Filter**: `feature:payment level:error`
5. Save

---

## Monitoring Dashboard URLs

- **Errors**: https://sentry.io/organizations/ailydian/issues/
- **Performance**: https://sentry.io/organizations/ailydian/performance/
- **Replays**: https://sentry.io/organizations/ailydian/replays/
- **Releases**: https://sentry.io/organizations/ailydian/releases/

---

## Troubleshooting

### No errors showing up?
```bash
# Check DSN is set
echo $NEXT_PUBLIC_SENTRY_DSN

# Test with curl
curl -X POST http://localhost:3100/api/test-sentry?type=exception

# Check browser console
# Look for Sentry initialization logs
```

### Source maps not uploading?
```bash
# Check auth token
echo $SENTRY_AUTH_TOKEN

# Rebuild with verbose logging
npm run build -- --debug

# Check next.config.js has withSentryConfig wrapper
```

### Too many events?
```typescript
// Reduce sample rate in sentry.client.config.ts
tracesSampleRate: 0.05  // 5% instead of 10%

// Or disable in development
enabled: process.env.NODE_ENV === 'production'
```

---

## Next Steps

1. ✅ Configure alert rules in Sentry
2. ✅ Integrate with Slack for notifications
3. ✅ Set up release tracking with deployments
4. ✅ Review error trends weekly
5. ✅ Optimize performance based on metrics

---

## Full Documentation

For complete documentation, see: `docs/SENTRY_SETUP.md`

---

**Done!** Your error tracking is now live. Every error, slow query, and performance issue will be tracked in Sentry.
