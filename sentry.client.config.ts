/**
 * Sentry Client Configuration
 * Browser-side error tracking and performance monitoring
 * Production-grade configuration for Travel.AILYDIAN platform
 */

import * as Sentry from '@sentry/nextjs';

// Initialize Sentry for client-side
Sentry.init({
  // DSN from environment variables
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking - Git commit SHA for deployment tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay - Capture 10% of sessions, 100% of error sessions
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.0,
  replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0.0,

  // Integrations - Auto-enabled in @sentry/nextjs v10+
  // - BrowserTracing: Automatic performance monitoring
  // - Replay: Session replay for debugging
  // - Breadcrumbs: Auto-capture console, DOM, fetch, XHR
  integrations: [
    // Custom integrations can be added here if needed
  ],

  // Transport options - for better performance
  transportOptions: {
    // Batch errors to reduce network requests
    bufferSize: 30,
  },

  // Before send hook - Filter and sanitize events before sending
  beforeSend(event, hint) {
    // Remove sensitive data from headers
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
      delete event.request.headers['x-api-key'];
    }

    // Remove cookies entirely
    if (event.request?.cookies) {
      delete event.request.cookies;
    }

    // Filter PII from URLs
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url);
        // Remove sensitive query parameters
        ['token', 'apiKey', 'password', 'email', 'phone', 'cardNumber'].forEach(param => {
          url.searchParams.delete(param);
        });
        event.request.url = url.toString();
      } catch (e) {
        // Invalid URL, skip
      }
    }

    // Filter PII from event message
    if (event.message) {
      event.message = filterPII(event.message);
    }

    // Filter PII from exception values
    if (event.exception?.values) {
      event.exception.values = event.exception.values.map(exception => {
        if (exception.value) {
          exception.value = filterPII(exception.value);
        }
        return exception;
      });
    }

    // Add custom context
    event.contexts = {
      ...event.contexts,
      app: {
        name: 'Travel.AILYDIAN',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
        platform: 'web',
      },
      browser: {
        viewport: {
          width: typeof window !== 'undefined' ? window.innerWidth : undefined,
          height: typeof window !== 'undefined' ? window.innerHeight : undefined,
        },
        language: typeof navigator !== 'undefined' ? navigator.language : undefined,
      },
    };

    // In development, log to console as well
    if (process.env.NODE_ENV === 'development') {
      console.error('[Sentry]', event);
    }

    return event;
  },

  // Before breadcrumb hook - Filter breadcrumbs before adding
  beforeBreadcrumb(breadcrumb, hint) {
    // Filter sensitive console logs
    if (breadcrumb.category === 'console') {
      if (breadcrumb.message) {
        breadcrumb.message = filterPII(breadcrumb.message);
      }
    }

    // Filter XHR/fetch requests
    if (breadcrumb.category === 'xhr' || breadcrumb.category === 'fetch') {
      if (breadcrumb.data?.url) {
        try {
          const url = new URL(breadcrumb.data.url, window.location.origin);
          // Remove sensitive query parameters
          ['token', 'apiKey', 'password', 'email', 'phone'].forEach(param => {
            url.searchParams.delete(param);
          });
          breadcrumb.data.url = url.toString();
        } catch (e) {
          // Invalid URL, skip
        }
      }

      // Remove authorization headers from breadcrumbs
      if (breadcrumb.data?.['request.headers']) {
        delete breadcrumb.data['request.headers'];
      }
    }

    // Filter navigation breadcrumbs
    if (breadcrumb.category === 'navigation') {
      if (breadcrumb.data?.to) {
        breadcrumb.data.to = filterPII(breadcrumb.data.to);
      }
    }

    return breadcrumb;
  },

  // Ignore specific errors that are not actionable
  ignoreErrors: [
    // Browser extension errors
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',

    // ResizeObserver errors (not actionable)
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',

    // Non-errors
    'Non-Error promise rejection captured',
    'Non-Error exception captured',

    // Network errors (user connectivity issues)
    'NetworkError',
    'Failed to fetch',
    'Network request failed',
    'Load failed',

    // Ad blocker errors
    'adsbygoogle',
    'googletag',

    // Timeout errors (expected in some cases)
    'timeout of 0ms exceeded',

    // Hydration errors (Next.js specific, usually not critical)
    'Hydration failed because the initial UI does not match',

    // User cancelled requests
    'AbortError',
    'The user aborted a request',
  ],

  // Deny URLs - Ignore errors from third-party scripts
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^moz-extension:\/\//i,
    /^safari-extension:\/\//i,

    // Social media widgets
    /graph\.facebook\.com/i,
    /connect\.facebook\.net/i,
    /platform\.twitter\.com/i,

    // Analytics
    /google-analytics\.com/i,
    /googletagmanager\.com/i,
  ],

  // Allow URLs - Only track errors from our domain
  allowUrls: [
    /holiday\.ailydian\.com/i,
    /travel\.ailydian\.com/i,
    /ailydian\.com/i,
    /localhost/i, // For development
    /vercel\.app/i, // For preview deployments
  ],

  // Debug mode - Enable in development
  debug: process.env.NODE_ENV === 'development',

  // Enabled - Disable in development unless explicitly enabled
  enabled: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
});

/**
 * Filter PII (Personally Identifiable Information) from strings
 */
function filterPII(str: string): string {
  if (!str) return str;

  return str
    // Email addresses
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REDACTED]')
    // Phone numbers (international format)
    .replace(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g, '[PHONE_REDACTED]')
    // Credit card numbers
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD_REDACTED]')
    // Turkish ID numbers (11 digits)
    .replace(/\b\d{11}\b/g, '[TC_ID_REDACTED]')
    // IP addresses
    .replace(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g, '[IP_REDACTED]')
    // JWT tokens
    .replace(/eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g, '[JWT_REDACTED]')
    // API keys (common patterns)
    .replace(/sk_live_[a-zA-Z0-9]{24,}/g, '[STRIPE_KEY_REDACTED]')
    .replace(/pk_live_[a-zA-Z0-9]{24,}/g, '[STRIPE_KEY_REDACTED]')
    .replace(/AIza[0-9A-Za-z-_]{35}/g, '[GOOGLE_API_KEY_REDACTED]');
}
