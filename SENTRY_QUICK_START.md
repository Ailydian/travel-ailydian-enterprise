# Sentry Quick Start Guide

## Setup in 5 Minutes

### Step 1: Get Your DSN
1. Go to [sentry.io](https://sentry.io)
2. Create project: `travel-lydian` in organization `ailydian`
3. Copy your DSN (looks like: `https://key@domain/project-id`)

### Step 2: Add Environment Variable
```bash
# In .env.local
NEXT_PUBLIC_SENTRY_DSN=https://your_dsn_here

# Optional for CI/CD
SENTRY_AUTH_TOKEN=your_token_here
```

### Step 3: Test It Works
```bash
npm run dev

# In another terminal
curl -X POST http://localhost:3100/api/test-sentry?type=exception
```

Check your Sentry dashboard - you should see the error!

## What's Already Configured

✅ **Error Boundaries** - React component errors captured automatically
✅ **Error Pages** - 404 and 500 pages send to Sentry
✅ **Performance Monitoring** - Tracks slow API routes and page loads
✅ **Session Replay** - Records sessions with errors
✅ **PII Filtering** - Automatically redacts emails, phone numbers, credit cards
✅ **Source Maps** - Uploaded during build (with auth token)
✅ **User Context** - Tracks which user encountered error

## Usage Examples

### Capture Exception
```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // your code
} catch (error) {
  Sentry.captureException(error, {
    tags: { component: 'booking-form' }
  });
}
```

### Capture Message
```typescript
Sentry.captureMessage('User completed payment', {
  level: 'info',
  tags: { event: 'payment' }
});
```

### Track Performance
```typescript
import { measurePerformance } from '@/lib/monitoring/sentry';

const result = await measurePerformance(
  'fetch_destinations',
  async () => fetch('/api/destinations'),
  { category: 'api' }
);
```

### Add Breadcrumbs
```typescript
import { addBreadcrumb } from '@/lib/monitoring/sentry';

addBreadcrumb('User clicked booking button', 'user-action', {
  destination: 'Istanbul'
});
```

## Test Endpoints

```bash
# Health check
curl http://localhost:3100/api/test-sentry

# Test exception
curl -X POST http://localhost:3100/api/test-sentry?type=exception

# Test message
curl -X POST http://localhost:3100/api/test-sentry?type=message

# Test performance tracking
curl -X POST http://localhost:3100/api/test-sentry?type=performance
```

## Sentry Dashboard

After errors occur, view them at:
- **Errors Tab**: [sentry.io/organizations/ailydian/issues/](https://sentry.io/organizations/ailydian/issues/)
- **Performance Tab**: [sentry.io/organizations/ailydian/performance/](https://sentry.io/organizations/ailydian/performance/)
- **Replays Tab**: Session replays with errors

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SENTRY_DSN` - Required for error tracking
- [ ] `SENTRY_AUTH_TOKEN` - Optional for source maps upload
- [ ] `SENTRY_ORG` - Default: `ailydian`
- [ ] `SENTRY_PROJECT` - Default: `travel-lydian`

## Configuration Files

| File | Purpose |
|------|---------|
| `sentry.client.config.ts` | Browser error tracking |
| `sentry.server.config.ts` | Server-side error tracking |
| `sentry.edge.config.ts` | Edge runtime errors |
| `next.config.js` | Build integration |
| `src/lib/monitoring/sentry.ts` | Helper functions |
| `SENTRY_SETUP.md` | Full documentation |

## Troubleshooting

### Errors not appearing in Sentry?
1. Verify `NEXT_PUBLIC_SENTRY_DSN` is set
2. Test with curl command above
3. Check browser console for errors
4. Verify network tab (errors should reach Sentry)

### Source maps not uploading?
1. Set `SENTRY_AUTH_TOKEN`
2. Ensure `SENTRY_ORG` and `SENTRY_PROJECT` are correct
3. Run: `npm run build` and check output

### Want more details?
Read the full guide: [SENTRY_SETUP.md](./SENTRY_SETUP.md)

---

**Status**: Production Ready ✅
**Installed**: @sentry/nextjs v10.32.1
**Last Updated**: 2025-12-28
