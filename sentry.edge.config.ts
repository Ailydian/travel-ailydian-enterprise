/**
 * Sentry Edge Configuration
 * Edge runtime error tracking (middleware, edge functions)
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',

  // Edge runtime has lower sample rate due to volume
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,

  beforeSend(event) {
    // Edge functions are stateless, minimal context needed
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
    }

    return event;
  },
});
