/**
 * Sentry Server Configuration
 * Node.js server-side error tracking and performance monitoring
 * Production-grade configuration for Travel.AILYDIAN platform
 */

import * as Sentry from '@sentry/nextjs';
import { obfuscateApiKey } from './src/lib/ai/model-obfuscation';

Sentry.init({
  // DSN from environment variables
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking - Git commit SHA for deployment tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

  // Server-side performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Profile sample rate - CPU and memory profiling
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.0,

  // Integrations - Auto-enabled in @sentry/nextjs v10+
  // - Http: Automatic HTTP request tracking
  // - Prisma: Database query tracking
  // - Node: Node.js runtime tracking
  integrations: [
    // Custom integrations can be added here
  ],

  // Transport options
  transportOptions: {
    bufferSize: 30,
  },

  // Before send hook - Filter and sanitize events
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
        'api-key',
      ];

      sensitiveHeaders.forEach(header => {
        delete event.request!.headers![header];
        delete event.request!.headers![header.toLowerCase()];
        delete event.request!.headers![header.toUpperCase()];
      });
    }

    // Remove cookies
    if (event.request?.cookies) {
      delete event.request.cookies;
    }

    // Filter PII from URLs
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url);
        ['token', 'apiKey', 'password', 'email', 'phone', 'cardNumber', 'cvv'].forEach(param => {
          url.searchParams.delete(param);
        });
        event.request.url = url.toString();
      } catch (e) {
        // Invalid URL
      }
    }

    // Obfuscate environment variables in context
    if (event.contexts?.runtime?.env) {
      const env = event.contexts.runtime.env as Record<string, any>;
      const sensitiveKeys = ['KEY', 'SECRET', 'TOKEN', 'PASSWORD', 'DSN', 'URI', 'URL'];

      Object.keys(env).forEach(key => {
        if (sensitiveKeys.some(sensitive => key.includes(sensitive))) {
          env[key] = obfuscateApiKey(env[key] || '');
        }
      });
    }

    // Filter PII from message
    if (event.message) {
      event.message = filterServerPII(event.message);
    }

    // Filter PII from exception values
    if (event.exception?.values) {
      event.exception.values = event.exception.values.map(exception => {
        if (exception.value) {
          exception.value = filterServerPII(exception.value);
        }
        return exception;
      });
    }

    // Add custom server context
    event.contexts = {
      ...event.contexts,
      app: {
        name: 'Travel.AILYDIAN',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
        platform: 'server',
      },
      runtime: {
        name: 'node',
        version: process.version,
      },
    };

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Sentry Server]', event);
    }

    return event;
  },

  // Before breadcrumb hook
  beforeBreadcrumb(breadcrumb, hint) {
    // Filter database queries with sensitive data
    if (breadcrumb.category === 'query' || breadcrumb.category === 'prisma') {
      if (breadcrumb.message) {
        breadcrumb.message = filterServerPII(breadcrumb.message);
      }
      if (breadcrumb.data) {
        // Remove sensitive query parameters
        ['password', 'token', 'secret', 'apiKey'].forEach(key => {
          if (breadcrumb.data![key]) {
            breadcrumb.data![key] = '[REDACTED]';
          }
        });
      }
    }

    // Filter HTTP requests
    if (breadcrumb.category === 'http') {
      if (breadcrumb.data?.url) {
        try {
          const url = new URL(breadcrumb.data.url);
          ['token', 'apiKey', 'password', 'email'].forEach(param => {
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

  // Ignore transient and expected errors
  ignoreErrors: [
    // Prisma errors
    'P2002', // Unique constraint violation
    'P2003', // Foreign key constraint
    'P2025', // Record not found
    'PrismaClientKnownRequestError',

    // Network errors (transient)
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
    'ECONNRESET',
    'EPIPE',
    'NetworkError',

    // Rate limiting (expected)
    'Too Many Requests',
    'Rate limit exceeded',

    // Authentication errors (user errors, not bugs)
    'Invalid credentials',
    'Unauthorized',
    'Authentication failed',

    // Validation errors (user input errors)
    'ValidationError',
    'Invalid input',
  ],

  // Ignore transactions (for performance monitoring)
  ignoreTransactions: [
    // Health check endpoints
    '/api/health',
    '/api/status',
    '/api/ping',

    // Static files
    '/_next/static',
    '/static',
    '/favicon.ico',
    '/robots.txt',
  ],

  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Enabled
  enabled: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
});

/**
 * Filter PII from server-side strings
 */
function filterServerPII(str: string): string {
  if (!str) return str;

  return str
    // Email addresses
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REDACTED]')
    // Phone numbers
    .replace(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g, '[PHONE_REDACTED]')
    // Credit card numbers
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD_REDACTED]')
    // Turkish ID numbers
    .replace(/\b\d{11}\b/g, '[TC_ID_REDACTED]')
    // IP addresses
    .replace(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g, '[IP_REDACTED]')
    // JWT tokens
    .replace(/eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g, '[JWT_REDACTED]')
    // API keys
    .replace(/sk_live_[a-zA-Z0-9]{24,}/g, '[STRIPE_KEY_REDACTED]')
    .replace(/pk_live_[a-zA-Z0-9]{24,}/g, '[STRIPE_KEY_REDACTED]')
    .replace(/AIza[0-9A-Za-z-_]{35}/g, '[GOOGLE_API_KEY_REDACTED]')
    // Database connection strings
    .replace(/postgresql:\/\/[^@]+@[^/]+\/[^?]+/g, '[DB_CONNECTION_REDACTED]')
    .replace(/mongodb:\/\/[^@]+@[^/]+\/[^?]+/g, '[DB_CONNECTION_REDACTED]')
    // Generic passwords in strings
    .replace(/password[=:]\s*[^\s&]+/gi, 'password=[REDACTED]');
}
