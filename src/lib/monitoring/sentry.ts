import { logger } from '../../lib/logger/winston';
/**
 * Sentry Monitoring Configuration
 * Enterprise-grade error tracking and performance monitoring
 * DevOps Guru Agent Implementation
 */

import * as Sentry from '@sentry/nextjs';
import { obfuscateApiKey } from '../ai/model-obfuscation';

/**
 * Initialize Sentry with production-grade config
 */
export function initSentry() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    logger.warn('Sentry DSN not configured. Monitoring disabled.');
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',

    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session replay (production only, 10% of sessions)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Integrations - Sentry v10+ auto-instruments BrowserTracing and Replay
    integrations: [],

    // Filter sensitive data before sending to Sentry
    beforeSend(event, hint) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers.Authorization;
        delete event.request.headers['X-API-Key'];
        delete event.request.headers.Cookie;
      }

      // Remove cookies
      if (event.request?.cookies) {
        delete event.request.cookies;
      }

      // Obfuscate API keys in breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
          if (breadcrumb.data?.apiKey) {
            breadcrumb.data.apiKey = obfuscateApiKey(breadcrumb.data.apiKey);
          }
          return breadcrumb;
        });
      }

      // Filter PII from messages
      if (event.message) {
        event.message = filterPII(event.message);
      }

      // Add custom context
      event.contexts = {
        ...event.contexts,
        app: {
          name: 'Travel.Ailydian.com',
          version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
        },
      };

      return event;
    },

    // Ignore known errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',

      // Network errors (user's internet issues)
      'NetworkError',
      'Failed to fetch',

      // Ad blockers
      'adsbygoogle',
    ],

    // Breadcrumb filtering
    beforeBreadcrumb(breadcrumb, hint) {
      // Filter sensitive console logs
      if (breadcrumb.category === 'console') {
        breadcrumb.message = filterPII(breadcrumb.message || '');
      }

      // Filter XHR with sensitive data
      if (breadcrumb.category === 'xhr' && breadcrumb.data?.url) {
        const url = new URL(breadcrumb.data.url, window.location.origin);

        // Remove query params with sensitive data
        ['token', 'apiKey', 'password', 'email'].forEach(param => {
          url.searchParams.delete(param);
        });

        breadcrumb.data.url = url.toString();
      }

      return breadcrumb;
    },
  });
}

/**
 * Filter PII from strings
 */
function filterPII(str: string): string {
  return str
    // Email addresses
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
    // Phone numbers
    .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]')
    // Credit card numbers
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]')
    // Turkish ID numbers
    .replace(/\b\d{11}\b/g, '[TC_ID]');
}

/**
 * Capture custom exception with context
 */
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: {
      custom: context || {},
    },
  });
}

/**
 * Capture custom message
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message: filterPII(message),
    category,
    data: data ? sanitizeData(data) : undefined,
    level: 'info',
  });
}

/**
 * Sanitize data object (remove sensitive fields)
 */
function sanitizeData(data: Record<string, any>): Record<string, any> {
  const sanitized = { ...data };

  // Remove sensitive keys
  ['password', 'token', 'apiKey', 'secret', 'cardNumber', 'cvv'].forEach(key => {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  });

  return sanitized;
}

/**
 * Set user context (safe version, no PII)
 */
export function setUserContext(userId: string, role?: string) {
  Sentry.setUser({
    id: userId,
    role: role,
    // DO NOT include email, name, phone, etc. (PII)
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Measure performance of async operations
 */
export async function measurePerformance<T>(
  name: string,
  operation: () => Promise<T>,
  tags?: { tags?: Record<string, string> }
): Promise<T> {
  // Sentry v10+ uses startSpan instead of startTransaction
  return await Sentry.startSpan(
    {
      name,
      op: 'function',
      attributes: tags?.tags || {},
    },
    async () => {
      try {
        const result = await operation();
        return result;
      } catch (error) {
        Sentry.captureException(error);
        throw error;
      }
    }
  );
}

/**
 * Track custom metric
 */
export function trackMetric(
  name: string,
  value: number,
  unit: string = 'millisecond',
  tags?: Record<string, string>
) {
  Sentry.metrics.distribution(name, value, {
    unit,
    tags,
  });
}

// Export types
export type { SeverityLevel } from '@sentry/nextjs';
