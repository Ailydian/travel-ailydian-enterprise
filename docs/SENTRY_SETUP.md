# Sentry Error Tracking & Performance Monitoring Setup

**Travel.AILYDIAN Platform - Production-Grade Monitoring**

## Overview

This project uses Sentry for comprehensive error tracking, performance monitoring, and user session replay. Sentry is configured across three runtime environments:
- **Client** (Browser)
- **Server** (Node.js)
- **Edge** (Middleware)

---

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://[YOUR_KEY]@[YOUR_ORG].ingest.sentry.io/[PROJECT_ID]
SENTRY_ORG=ailydian
SENTRY_PROJECT=travel-lydian
SENTRY_AUTH_TOKEN=[YOUR_AUTH_TOKEN]

# Optional: Enable Sentry in development
NEXT_PUBLIC_SENTRY_ENABLED=false

# App Version (for release tracking)
NEXT_PUBLIC_APP_VERSION=2.0.0
```

### Getting Your Sentry Credentials

1. **Create a Sentry Account**
   - Go to https://sentry.io
   - Sign up or log in
   - Create a new organization (or use existing)

2. **Create a Project**
   - Click "Create Project"
   - Choose "Next.js" as platform
   - Name your project: `travel-lydian`
   - Copy the **DSN** provided

3. **Generate Auth Token**
   - Go to Settings > Auth Tokens
   - Click "Create New Token"
   - Scopes needed: `project:read`, `project:write`, `project:releases`
   - Copy the token

4. **Update Environment Variables**
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://abc123@o123456.ingest.sentry.io/4567890
   SENTRY_ORG=your-org-name
   SENTRY_PROJECT=travel-lydian
   SENTRY_AUTH_TOKEN=your-auth-token-here
   ```

---

## Configuration Files

### 1. Client Configuration (`sentry.client.config.ts`)
- Tracks browser-side errors
- Monitors page load performance
- Captures user interactions
- Records session replays (10% of sessions, 100% on errors)

### 2. Server Configuration (`sentry.server.config.ts`)
- Tracks API route errors
- Monitors database queries (Prisma integration)
- Tracks external API calls
- CPU & memory profiling

### 3. Edge Configuration (`sentry.edge.config.ts`)
- Tracks middleware errors
- Monitors edge function performance
- Lower sample rate (5%) due to high volume

### 4. Next.js Integration (`next.config.js`)
- Webpack plugin for source maps upload
- Automatic error boundary injection
- Release tracking with Git SHA

---

## Features Enabled

### Error Tracking
- ✅ Unhandled exceptions
- ✅ Promise rejections
- ✅ API errors (4xx, 5xx)
- ✅ Database query failures
- ✅ External API failures
- ✅ React component errors

### Performance Monitoring
- ✅ Page load times
- ✅ API response times
- ✅ Database query performance
- ✅ Custom transaction tracking
- ✅ Third-party service latency

### Privacy & Security
- ✅ PII scrubbing (email, phone, credit card)
- ✅ Sensitive header removal
- ✅ API key obfuscation
- ✅ GDPR compliant
- ✅ Data retention policies

### User Context
- ✅ User ID tracking
- ✅ Session information
- ✅ Device & browser info
- ✅ Geographic data
- ✅ Custom tags & metadata

---

## Usage Examples

### 1. Basic Error Tracking

```typescript
import { captureException } from '@/lib/monitoring/sentry-advanced';

try {
  await riskyOperation();
} catch (error) {
  captureException(error as Error, {
    tags: { feature: 'booking', step: 'payment' },
    extra: { bookingId: '123', amount: 500 },
    level: 'error',
  });
  throw error;
}
```

### 2. Performance Monitoring

```typescript
import { measurePerformance } from '@/lib/monitoring/sentry-advanced';

const results = await measurePerformance(
  'search-hotels',
  async () => {
    return await searchHotels(query);
  },
  {
    tags: { search_type: 'hotel' },
    extra: { query, filters },
  }
);
```

### 3. Booking Flow Tracking

```typescript
import { measureBookingStep, trackBookingSuccess } from '@/lib/monitoring/sentry-advanced';

// Track each step of booking
const availability = await measureBookingStep(
  'search',
  'hotel',
  async () => checkAvailability(hotelId),
  { userId, hotelId }
);

const booking = await measureBookingStep(
  'selection',
  'hotel',
  async () => createBooking(data),
  { userId, hotelId }
);

// Track success
trackBookingSuccess({
  bookingId: booking.id,
  bookingType: 'hotel',
  step: 'confirmation',
  userId,
  amount: booking.total,
  currency: 'TRY',
});
```

### 4. Payment Tracking

```typescript
import { measurePayment, trackPaymentSuccess } from '@/lib/monitoring/sentry-advanced';

const payment = await measurePayment(
  'stripe',
  async () => processPayment(data),
  {
    paymentId: bookingId,
    amount: 1000,
    currency: 'TRY',
    method: 'card',
    userId,
  }
);

trackPaymentSuccess({
  paymentId: payment.id,
  provider: 'stripe',
  amount: 1000,
  currency: 'TRY',
  method: 'card',
  userId,
});
```

### 5. API Route with Sentry Middleware

```typescript
// pages/api/bookings/create.ts
import { withSentryApiHandler, validateMethod, ApiErrors } from '@/lib/middleware/sentry-api-handler';

export default withSentryApiHandler(async (req, res) => {
  validateMethod(req, ['POST']);

  const { userId, hotelId } = req.body;

  if (!userId || !hotelId) {
    throw ApiErrors.badRequest('Missing required fields');
  }

  const booking = await createBooking({ userId, hotelId });

  res.status(201).json({ booking });
}, {
  trackPerformance: true,
  tags: { feature: 'booking' },
});
```

### 6. User Context

```typescript
import { setUserContext, clearUserContext } from '@/lib/monitoring/sentry-advanced';

// On login
setUserContext(user.id, user.role, {
  subscription: user.subscription,
});

// On logout
clearUserContext();
```

### 7. Custom Metrics

```typescript
import { trackMetric, incrementCounter } from '@/lib/monitoring/sentry-advanced';

// Track duration
trackMetric('search.duration', 500, 'millisecond', {
  search_type: 'hotel',
});

// Increment counter
incrementCounter('booking.created', 1, {
  booking_type: 'hotel',
});
```

### 8. Breadcrumbs for Debugging

```typescript
import { addBreadcrumb } from '@/lib/monitoring/sentry-advanced';

addBreadcrumb(
  'User searched for hotels',
  'user_action',
  { destination: 'Istanbul', dates: '2024-01-01' },
  'info'
);
```

---

## Testing Sentry Integration

### 1. Test Error Capturing

```bash
# Visit the test endpoint
curl http://localhost:3100/api/test-sentry

# Trigger test exception
curl -X POST http://localhost:3100/api/test-sentry?type=exception

# Trigger test message
curl -X POST http://localhost:3100/api/test-sentry?type=message

# Trigger performance test
curl -X POST http://localhost:3100/api/test-sentry?type=performance
```

### 2. Check Sentry Dashboard

1. Go to https://sentry.io
2. Select your project
3. Navigate to "Issues" to see errors
4. Navigate to "Performance" to see transactions
5. Navigate to "Replays" to see session recordings

---

## Alert Rules (Configure in Sentry Dashboard)

### High Error Rate Alert
- **Condition**: Error rate > 10% over 5 minutes
- **Action**: Email + Slack notification
- **Environment**: Production only

### Performance Degradation Alert
- **Condition**: P95 response time > 2 seconds
- **Action**: Email notification
- **Environment**: Production only

### New Error Type Alert
- **Condition**: New error fingerprint detected
- **Action**: Slack notification
- **Environment**: All environments

### Payment Error Alert
- **Condition**: Payment errors with tag `feature:payment`
- **Action**: PagerDuty + Email (urgent)
- **Environment**: Production only

---

## Best Practices

### 1. Error Handling
- ✅ Always wrap risky operations in try-catch
- ✅ Use specific error types (ApiErrors)
- ✅ Add context with tags and extra data
- ✅ Set appropriate severity levels

### 2. Performance Tracking
- ✅ Track critical user flows (search, booking, payment)
- ✅ Use descriptive operation names
- ✅ Add relevant tags for filtering
- ✅ Keep sample rates reasonable (10% production)

### 3. Privacy
- ✅ Never log PII (email, phone, credit card)
- ✅ Use sanitization functions
- ✅ Obfuscate sensitive data
- ✅ Remove authorization headers

### 4. User Context
- ✅ Only set user ID (no email/name by default)
- ✅ Clear context on logout
- ✅ Add role for filtering
- ✅ Use metadata for non-PII data

---

## Troubleshooting

### Sentry not capturing errors

1. Check DSN is set: `echo $NEXT_PUBLIC_SENTRY_DSN`
2. Check Sentry is enabled in production
3. Verify network connectivity to Sentry
4. Check browser console for Sentry errors
5. Ensure errors are not in ignore list

### Source maps not uploading

1. Verify `SENTRY_AUTH_TOKEN` is set
2. Check build logs for upload errors
3. Ensure `org` and `project` match Sentry
4. Run `npm run build` and check output

### Too many events (quota exceeded)

1. Reduce sample rates in config files
2. Add more errors to ignore lists
3. Use beforeSend to filter events
4. Upgrade Sentry plan if needed

---

## Maintenance

### Monthly Tasks
- Review error trends and fix recurring issues
- Check performance metrics and optimize slow endpoints
- Update ignore lists based on noise
- Review and adjust alert rules

### Quarterly Tasks
- Audit PII filtering effectiveness
- Review sample rates and adjust
- Clean up old breadcrumbs and tags
- Update documentation

---

## Support

- **Sentry Documentation**: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Project Issues**: Contact DevOps team
- **Sentry Support**: https://sentry.io/support/

---

**Last Updated**: 2024-01-01
**Version**: 2.0.0
**Maintained by**: Travel.AILYDIAN DevOps Team
