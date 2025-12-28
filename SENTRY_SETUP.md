# Sentry Error Tracking & Performance Monitoring Setup

Travel.Ailydian.com is equipped with enterprise-grade error tracking and performance monitoring using **Sentry**. This document provides complete setup instructions, configuration details, and best practices.

## Overview

Sentry provides:
- Real-time error tracking and alerting
- Performance monitoring (slow API routes, page loads)
- Source maps for debugging minified code
- Session replay (on-error capture)
- Custom metrics and performance thresholds
- PII filtering and data privacy

## Quick Start

### 1. Create Sentry Account & Project

1. Go to [https://sentry.io](https://sentry.io)
2. Sign up or log in
3. Create a new project:
   - Platform: Next.js
   - Organization: `ailydian`
   - Project: `travel-lydian`
4. Copy your DSN (Data Source Name)

### 2. Configure Environment Variables

Add the following to your `.env.local` and `.env`:

```bash
# Required - Get from Sentry project settings
NEXT_PUBLIC_SENTRY_DSN=https://[key]@[domain]/[project-id]

# Optional - For CI/CD source maps upload
SENTRY_AUTH_TOKEN=your_auth_token_here

# Project identifiers
SENTRY_ORG=ailydian
SENTRY_PROJECT=travel-lydian
```

### 3. Verify Installation

Run the test endpoint to verify Sentry is working:

```bash
# Start development server
npm run dev

# Test endpoints
curl http://localhost:3100/api/test-sentry                    # Health check
curl -X POST http://localhost:3100/api/test-sentry?type=exception  # Test exception
curl -X POST http://localhost:3100/api/test-sentry?type=message    # Test message
curl -X POST http://localhost:3100/api/test-sentry?type=performance # Test performance
```

Check your Sentry dashboard to verify errors are being captured.

## Configuration Files

### 1. `sentry.client.config.ts`
Client-side configuration with:
- Browser tracing
- Session replay
- PII filtering
- Breadcrumb filtering
- Performance monitoring (10% sample rate in production)

### 2. `sentry.server.config.ts`
Server-side configuration with:
- HTTP integration
- Prisma integration
- Server-side tracing
- Sensitive data removal

### 3. `sentry.edge.config.ts`
Edge runtime configuration with:
- Lower sample rate (5% in production)
- Minimal context
- Stateless operation

### 4. `next.config.js`
Webpack plugin configuration:
- Source maps upload
- Release tracking
- Build context

## Features Implemented

### Error Boundaries

React components are wrapped with `ErrorBoundary` that:
- Catches React component errors
- Sends to Sentry automatically
- Provides fallback UI
- Logs to Winston logger

Usage:
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Error Pages Integration

Custom error pages automatically report to Sentry:
- **404.tsx** - Page not found (warning level)
- **500.tsx** - Server error (error level)

### Performance Monitoring

Tracks:
- Page load times
- API route performance
- React component render times
- Custom transactions

Configuration in `sentry.client.config.ts`:
```typescript
tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0
```

### Session Replay

Captures user sessions on error (production only):
```typescript
replaysSessionSampleRate: 0.1        // 10% of all sessions
replaysOnErrorSampleRate: 1.0        // 100% of sessions with errors
```

## API Test Endpoint

Located at: `/api/test-sentry`

### GET Request
```bash
curl http://localhost:3100/api/test-sentry
```

Response:
```json
{
  "status": "ok",
  "message": "Sentry test endpoint is ready",
  "sentryEnabled": true,
  "dsn": "sentry.io/12345"
}
```

### POST Requests

#### Test Exception
```bash
curl -X POST http://localhost:3100/api/test-sentry?type=exception
```

Sends a test error to Sentry for verification.

#### Test Message
```bash
curl -X POST http://localhost:3100/api/test-sentry?type=message
```

Sends an info-level message to Sentry.

#### Test Performance
```bash
curl -X POST http://localhost:3100/api/test-sentry?type=performance
```

Creates a performance transaction with spans.

## PII (Personally Identifiable Information) Handling

Sentry is configured to automatically filter and redact:
- Email addresses
- Phone numbers
- Credit card numbers
- Turkish ID numbers
- API keys and tokens
- Cookies and authorization headers

### Custom Functions

Located in `src/lib/monitoring/sentry.ts`:

```typescript
// Filter PII from strings
filterPII(str: string): string

// Sanitize data objects
sanitizeData(data: Record<string, any>): Record<string, any>

// Set user context (no PII)
setUserContext(userId: string, role?: string)

// Clear user context on logout
clearUserContext()
```

## Performance Monitoring

### Sample Rates

- **Development**: 100% (all transactions)
- **Production**: 10% (1 in 10 transactions)
- **Edge Runtime**: 5% (lower due to volume)

### Custom Metrics

Track custom metrics using:

```typescript
import { trackMetric } from '@/lib/monitoring/sentry';

trackMetric('api_response_time', 150, 'millisecond', {
  endpoint: '/api/destinations',
  method: 'GET'
});
```

### Performance Transactions

Measure async operations:

```typescript
import { measurePerformance } from '@/lib/monitoring/sentry';

const results = await measurePerformance(
  'fetch_destinations',
  async () => {
    const response = await fetch('/api/destinations');
    return response.json();
  },
  { category: 'api' }
);
```

## User Context

Set user context after authentication:

```typescript
import { setUserContext, clearUserContext } from '@/lib/monitoring/sentry';

// After login
setUserContext(user.id, user.role);

// On logout
clearUserContext();
```

Note: User context includes only ID and role - no PII data.

## Breadcrumbs

Add breadcrumbs for debugging:

```typescript
import { addBreadcrumb } from '@/lib/monitoring/sentry';

addBreadcrumb(
  'User completed booking',
  'user-action',
  { bookingId: '12345', amount: 250 }
);
```

## Environment Configuration

### Development
- All errors and messages captured
- 100% transaction sample rate
- No source maps upload
- Session replay disabled

### Staging
- All errors and messages captured
- 50% transaction sample rate
- Source maps uploaded
- Session replay: 10% sample

### Production
- All errors and messages captured
- 10% transaction sample rate (Edge: 5%)
- Source maps uploaded
- Session replay: 10% of sessions with errors

## Source Maps Upload

Source maps are automatically uploaded during build when:
1. `SENTRY_AUTH_TOKEN` is set
2. Running in CI/CD environment
3. `NODE_ENV=production`

Configure in `next.config.js`:
```javascript
const sentryConfig = {
  org: 'ailydian',
  project: 'travel-lydian',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  telemetry: false,
};
```

## Ignoring Errors

Sentry is configured to ignore:
- Browser extension errors
- Ad blocker errors
- Network errors (user's internet)
- ResizeObserver loop errors
- Non-Error promise rejections

Edit `src/lib/monitoring/sentry.ts` to modify ignore list.

## Error Notifications

Configure alerts in Sentry dashboard:
1. Go to project settings
2. Alerts → Create Alert Rule
3. Set triggers (error count, first occurrence, etc.)
4. Configure notifications (email, Slack, PagerDuty, etc.)

### Recommended Alerts
- New issue (immediate notification)
- 10+ errors in 5 minutes (escalation)
- Regression (monitoring)

## Troubleshooting

### Sentry Not Capturing Errors

1. Check `NEXT_PUBLIC_SENTRY_DSN` is set
2. Verify DSN format: `https://[key]@[domain]/[project-id]`
3. Test with: `curl -X POST http://localhost:3100/api/test-sentry?type=exception`
4. Check browser console for errors
5. Verify CORS settings in Sentry project

### Source Maps Not Uploading

1. Ensure `SENTRY_AUTH_TOKEN` is set
2. Verify `SENTRY_ORG` and `SENTRY_PROJECT` match
3. Check build logs: `npm run build`
4. Verify token has appropriate permissions

### Missing PII Filtering

1. Edit `src/lib/monitoring/sentry.ts`
2. Add custom patterns to `filterPII()`
3. Add sensitive keys to `sanitizeData()`
4. Redeploy application

### Performance Not Showing

1. Check sample rate: `tracesSampleRate`
2. Increase sample rate in development
3. Wait for transactions to complete
4. Check Sentry project for Performance tab

## Best Practices

### 1. Error Reporting
- Use `captureException()` for errors
- Use `captureMessage()` for info/warnings
- Add relevant context for debugging

### 2. Performance Monitoring
- Use `measurePerformance()` for async operations
- Set meaningful transaction names
- Add tags for filtering

### 3. User Privacy
- Never send PII in error context
- Use `setUserContext()` only with ID/role
- Sanitize custom data before sending

### 4. Breadcrumbs
- Use meaningful messages
- Add relevant data context
- Avoid sensitive information

### 5. Alerts
- Set up notifications for critical errors
- Use environment-specific channels
- Include reproduction steps in messages

## CI/CD Integration

### GitHub Actions

```yaml
- name: Upload Sentry Source Maps
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: ailydian
    SENTRY_PROJECT: travel-lydian
  run: npm run build
```

### Vercel Deployment

1. Add environment variables to Vercel:
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_AUTH_TOKEN`
   - `SENTRY_ORG`
   - `SENTRY_PROJECT`

2. Source maps automatically uploaded during build

## Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Sentry Next.js Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Sentry Session Replay](https://docs.sentry.io/product/session-replay/)

## Support

For issues or questions:
1. Check Sentry dashboard logs
2. Review error details and stack traces
3. Check browser console for client-side errors
4. Review server logs for API errors
5. Contact Sentry support: [https://sentry.io/support/](https://sentry.io/support/)

## Changelog

### Version 2.0.0 (2025-12-28)
- Comprehensive Sentry integration
- Error boundaries with React component error catching
- Performance monitoring setup
- PII filtering implementation
- Session replay configuration
- Test endpoint for verification
- Complete documentation

---

Last Updated: 2025-12-28
Maintained by: DevOps Team
Status: Production Ready
