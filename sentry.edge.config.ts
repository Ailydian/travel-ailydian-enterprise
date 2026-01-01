/**
 * Sentry Edge Configuration
 * Edge runtime error tracking (middleware, edge functions)
 * Production-grade configuration for Travel.AILYDIAN platform
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // DSN from environment variables
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

  // Edge runtime has lower sample rate due to high volume
  // Edge functions run on every request, so we sample less
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,

  // Integrations - Edge runtime has limited integrations
  integrations: [],

  // Transport options
  transportOptions: {
    bufferSize: 30,
  },

  // Before send hook - Minimal processing for edge functions (performance critical)
  beforeSend(event, hint) {
    // Remove sensitive headers
    if (event.request?.headers) {
      const sensitiveHeaders = [
        'authorization',
        'x-api-key',
        'cookie',
        'set-cookie',
        'x-csrf-token',
        'x-auth-token',
      ];

      sensitiveHeaders.forEach(header => {
        delete event.request!.headers![header];
        delete event.request!.headers![header.toLowerCase()];
      });
    }

    // Remove cookies
    if (event.request?.cookies) {
      delete event.request.cookies;
    }

    // Filter URLs (lightweight version for edge)
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url);
        ['token', 'apiKey', 'password'].forEach(param => {
          url.searchParams.delete(param);
        });
        event.request.url = url.toString();
      } catch (e) {
        // Invalid URL
      }
    }

    // Add edge runtime context
    event.contexts = {
      ...event.contexts,
      app: {
        name: 'Travel.AILYDIAN',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
        platform: 'edge',
      },
      runtime: {
        name: 'edge',
      },
    };

    return event;
  },

  // Before breadcrumb - Minimal processing for performance
  beforeBreadcrumb(breadcrumb, hint) {
    // Filter HTTP request breadcrumbs
    if (breadcrumb.category === 'http' || breadcrumb.category === 'fetch') {
      if (breadcrumb.data?.url) {
        try {
          const url = new URL(breadcrumb.data.url);
          ['token', 'apiKey', 'password'].forEach(param => {
            url.searchParams.delete(param);
          });
          breadcrumb.data.url = url.toString();
        } catch (e) {
          // Invalid URL
        }
      }
    }

    return breadcrumb;
  },

  // Ignore common edge runtime errors
  ignoreErrors: [
    // Network errors (transient)
    'NetworkError',
    'Failed to fetch',
    'ECONNREFUSED',
    'ETIMEDOUT',

    // Rate limiting (expected)
    'Too Many Requests',
    'Rate limit exceeded',

    // Client disconnections (normal behavior)
    'AbortError',
    'Client closed request',
  ],

  // Ignore high-volume transactions
  ignoreTransactions: [
    // Health checks
    '/api/health',
    '/api/status',

    // Static files
    '/_next/static',
    '/static',
    '/favicon.ico',

    // High-frequency endpoints (if any)
  ],

  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Enabled
  enabled: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
});
