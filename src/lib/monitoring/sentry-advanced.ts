/**
 * Advanced Sentry Error Tracking & Performance Monitoring
 * Enterprise-grade instrumentation for critical business flows
 * Travel.AILYDIAN Platform
 */

import * as Sentry from '@sentry/nextjs';
import type { Primitive, Transaction, Span } from '@sentry/types';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SentryContext {
  tags?: Record<string, Primitive>;
  extra?: Record<string, any>;
  user?: {
    id: string;
    email?: string;
    username?: string;
    role?: string;
  };
  level?: Sentry.SeverityLevel;
  fingerprint?: string[];
}

export interface PerformanceMetrics {
  duration: number;
  success: boolean;
  error?: Error;
  metadata?: Record<string, any>;
}

export interface BookingContext {
  bookingId?: string;
  bookingType: 'hotel' | 'flight' | 'car' | 'transfer' | 'tour';
  step: 'search' | 'selection' | 'payment' | 'confirmation';
  userId?: string;
  amount?: number;
  currency?: string;
}

export interface PaymentContext {
  paymentId?: string;
  provider: 'stripe' | 'paypal' | 'other';
  amount: number;
  currency: string;
  method: string;
  userId?: string;
}

export interface SearchContext {
  searchType: 'hotel' | 'flight' | 'car' | 'unified';
  query: string;
  filters?: Record<string, any>;
  resultsCount?: number;
  duration?: number;
}

// ============================================================================
// CORE ERROR TRACKING
// ============================================================================

/**
 * Capture exception with rich context
 */
export function captureException(
  error: Error,
  context?: SentryContext
): string {
  return Sentry.captureException(error, {
    tags: context?.tags,
    extra: sanitizeExtra(context?.extra),
    user: context?.user,
    level: context?.level || 'error',
    fingerprint: context?.fingerprint,
  });
}

/**
 * Capture message with context
 */
export function captureMessage(
  message: string,
  context?: SentryContext
): string {
  return Sentry.captureMessage(message, {
    tags: context?.tags,
    extra: sanitizeExtra(context?.extra),
    user: context?.user,
    level: context?.level || 'info',
    fingerprint: context?.fingerprint,
  });
}

/**
 * Add breadcrumb for debugging trail
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>,
  level?: Sentry.SeverityLevel
): void {
  Sentry.addBreadcrumb({
    message,
    category,
    data: sanitizeExtra(data),
    level: level || 'info',
    timestamp: Date.now() / 1000,
  });
}

// ============================================================================
// USER CONTEXT MANAGEMENT
// ============================================================================

/**
 * Set user context (GDPR compliant - no PII by default)
 */
export function setUserContext(
  userId: string,
  role?: string,
  metadata?: Record<string, any>
): void {
  Sentry.setUser({
    id: userId,
    role,
    ...sanitizeExtra(metadata),
  });

  addBreadcrumb(
    `User context set: ${userId}`,
    'user',
    { role, ...metadata },
    'info'
  );
}

/**
 * Clear user context (call on logout)
 */
export function clearUserContext(): void {
  Sentry.setUser(null);
  addBreadcrumb('User context cleared', 'user', undefined, 'info');
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Measure async operation performance
 */
export async function measurePerformance<T>(
  operationName: string,
  operation: () => Promise<T>,
  context?: SentryContext
): Promise<T> {
  const startTime = Date.now();

  return await Sentry.startSpan(
    {
      name: operationName,
      op: 'function',
      attributes: context?.tags || {},
    },
    async () => {
      try {
        addBreadcrumb(
          `Starting operation: ${operationName}`,
          'performance',
          context?.extra,
          'info'
        );

        const result = await operation();
        const duration = Date.now() - startTime;

        // Track metric
        Sentry.metrics.distribution('operation.duration', duration, {
          unit: 'millisecond',
          tags: {
            operation: operationName,
            status: 'success',
            ...context?.tags,
          },
        });

        addBreadcrumb(
          `Completed operation: ${operationName} (${duration}ms)`,
          'performance',
          { duration, ...context?.extra },
          'info'
        );

        return result;
      } catch (error) {
        const duration = Date.now() - startTime;

        // Track error metric
        Sentry.metrics.distribution('operation.duration', duration, {
          unit: 'millisecond',
          tags: {
            operation: operationName,
            status: 'error',
            ...context?.tags,
          },
        });

        captureException(error as Error, {
          tags: {
            operation: operationName,
            ...context?.tags,
          },
          extra: {
            duration,
            ...context?.extra,
          },
          level: 'error',
        });

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
): void {
  Sentry.metrics.distribution(name, value, {
    unit,
    tags,
  });
}

/**
 * Increment counter metric
 */
export function incrementCounter(
  name: string,
  value: number = 1,
  tags?: Record<string, string>
): void {
  Sentry.metrics.increment(name, value, {
    tags,
  });
}

/**
 * Set gauge metric
 */
export function setGauge(
  name: string,
  value: number,
  tags?: Record<string, string>
): void {
  Sentry.metrics.gauge(name, value, {
    tags,
  });
}

// ============================================================================
// BOOKING FLOW INSTRUMENTATION
// ============================================================================

/**
 * Track booking error
 */
export function trackBookingError(
  error: Error,
  context: BookingContext
): string {
  incrementCounter('booking.error', 1, {
    booking_type: context.bookingType,
    step: context.step,
  });

  return captureException(error, {
    tags: {
      feature: 'booking',
      booking_type: context.bookingType,
      step: context.step,
    },
    extra: {
      bookingId: context.bookingId,
      amount: context.amount,
      currency: context.currency,
    },
    user: context.userId ? { id: context.userId } : undefined,
    level: 'error',
    fingerprint: ['booking', context.bookingType, context.step],
  });
}

/**
 * Track booking success
 */
export function trackBookingSuccess(context: BookingContext): void {
  incrementCounter('booking.success', 1, {
    booking_type: context.bookingType,
  });

  addBreadcrumb(
    `Booking successful: ${context.bookingId}`,
    'booking',
    {
      bookingType: context.bookingType,
      amount: context.amount,
      currency: context.currency,
    },
    'info'
  );
}

/**
 * Measure booking step performance
 */
export async function measureBookingStep<T>(
  step: BookingContext['step'],
  bookingType: BookingContext['bookingType'],
  operation: () => Promise<T>,
  context?: Partial<BookingContext>
): Promise<T> {
  return measurePerformance(
    `booking.${bookingType}.${step}`,
    operation,
    {
      tags: {
        feature: 'booking',
        booking_type: bookingType,
        step,
      },
      extra: context,
    }
  );
}

// ============================================================================
// PAYMENT FLOW INSTRUMENTATION
// ============================================================================

/**
 * Track payment error
 */
export function trackPaymentError(
  error: Error,
  context: PaymentContext
): string {
  incrementCounter('payment.error', 1, {
    provider: context.provider,
    method: context.method,
  });

  return captureException(error, {
    tags: {
      feature: 'payment',
      provider: context.provider,
      method: context.method,
    },
    extra: {
      paymentId: context.paymentId,
      amount: context.amount,
      currency: context.currency,
    },
    user: context.userId ? { id: context.userId } : undefined,
    level: 'error',
    fingerprint: ['payment', context.provider, context.method],
  });
}

/**
 * Track payment success
 */
export function trackPaymentSuccess(context: PaymentContext): void {
  incrementCounter('payment.success', 1, {
    provider: context.provider,
    method: context.method,
  });

  trackMetric('payment.amount', context.amount, 'none', {
    provider: context.provider,
    currency: context.currency,
  });

  addBreadcrumb(
    `Payment successful: ${context.paymentId}`,
    'payment',
    {
      provider: context.provider,
      amount: context.amount,
      currency: context.currency,
    },
    'info'
  );
}

/**
 * Measure payment processing
 */
export async function measurePayment<T>(
  provider: PaymentContext['provider'],
  operation: () => Promise<T>,
  context?: Partial<PaymentContext>
): Promise<T> {
  return measurePerformance(
    `payment.${provider}.process`,
    operation,
    {
      tags: {
        feature: 'payment',
        provider,
      },
      extra: context,
    }
  );
}

// ============================================================================
// SEARCH FLOW INSTRUMENTATION
// ============================================================================

/**
 * Track search error
 */
export function trackSearchError(
  error: Error,
  context: SearchContext
): string {
  incrementCounter('search.error', 1, {
    search_type: context.searchType,
  });

  return captureException(error, {
    tags: {
      feature: 'search',
      search_type: context.searchType,
    },
    extra: {
      query: context.query,
      filters: context.filters,
    },
    level: 'error',
    fingerprint: ['search', context.searchType],
  });
}

/**
 * Track search performance
 */
export function trackSearchPerformance(context: SearchContext): void {
  if (context.duration) {
    trackMetric('search.duration', context.duration, 'millisecond', {
      search_type: context.searchType,
    });
  }

  if (context.resultsCount !== undefined) {
    trackMetric('search.results', context.resultsCount, 'none', {
      search_type: context.searchType,
    });
  }

  addBreadcrumb(
    `Search completed: ${context.searchType}`,
    'search',
    {
      query: context.query,
      resultsCount: context.resultsCount,
      duration: context.duration,
    },
    'info'
  );
}

/**
 * Measure search operation
 */
export async function measureSearch<T>(
  searchType: SearchContext['searchType'],
  operation: () => Promise<T>,
  context?: Partial<SearchContext>
): Promise<T> {
  return measurePerformance(
    `search.${searchType}`,
    operation,
    {
      tags: {
        feature: 'search',
        search_type: searchType,
      },
      extra: context,
    }
  );
}

// ============================================================================
// API ERROR INSTRUMENTATION
// ============================================================================

/**
 * Track API error by status code
 */
export function trackApiError(
  error: Error,
  endpoint: string,
  statusCode: number,
  method: string = 'GET'
): string {
  incrementCounter('api.error', 1, {
    endpoint,
    status_code: statusCode.toString(),
    method,
  });

  return captureException(error, {
    tags: {
      feature: 'api',
      endpoint,
      status_code: statusCode.toString(),
      method,
    },
    level: statusCode >= 500 ? 'error' : 'warning',
    fingerprint: ['api', endpoint, statusCode.toString()],
  });
}

/**
 * Track API success
 */
export function trackApiSuccess(
  endpoint: string,
  duration: number,
  method: string = 'GET'
): void {
  trackMetric('api.response_time', duration, 'millisecond', {
    endpoint,
    method,
  });

  incrementCounter('api.success', 1, {
    endpoint,
    method,
  });
}

// ============================================================================
// DATABASE INSTRUMENTATION
// ============================================================================

/**
 * Track database query error
 */
export function trackDatabaseError(
  error: Error,
  operation: string,
  table?: string
): string {
  incrementCounter('database.error', 1, {
    operation,
    table: table || 'unknown',
  });

  return captureException(error, {
    tags: {
      feature: 'database',
      operation,
      table,
    },
    level: 'error',
    fingerprint: ['database', operation, table || 'unknown'],
  });
}

/**
 * Measure database query
 */
export async function measureDatabaseQuery<T>(
  operation: string,
  query: () => Promise<T>,
  table?: string
): Promise<T> {
  return measurePerformance(
    `database.${operation}`,
    query,
    {
      tags: {
        feature: 'database',
        operation,
        table,
      },
    }
  );
}

// ============================================================================
// EXTERNAL API INSTRUMENTATION
// ============================================================================

/**
 * Track external API call
 */
export async function measureExternalApi<T>(
  provider: string,
  operation: () => Promise<T>,
  endpoint?: string
): Promise<T> {
  return measurePerformance(
    `external.${provider}`,
    operation,
    {
      tags: {
        feature: 'external_api',
        provider,
        endpoint,
      },
    }
  );
}

/**
 * Track external API error
 */
export function trackExternalApiError(
  error: Error,
  provider: string,
  endpoint?: string
): string {
  incrementCounter('external_api.error', 1, {
    provider,
  });

  return captureException(error, {
    tags: {
      feature: 'external_api',
      provider,
      endpoint,
    },
    level: 'warning', // External API errors are usually not our fault
    fingerprint: ['external_api', provider, endpoint || 'unknown'],
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Sanitize extra data (remove sensitive information)
 */
function sanitizeExtra(data?: Record<string, any>): Record<string, any> | undefined {
  if (!data) return undefined;

  const sanitized = { ...data };
  const sensitiveKeys = [
    'password',
    'token',
    'apiKey',
    'secret',
    'cardNumber',
    'cvv',
    'cvc',
    'pin',
    'ssn',
    'creditCard',
  ];

  for (const key of Object.keys(sanitized)) {
    // Check if key contains sensitive information
    if (sensitiveKeys.some(sensitive =>
      key.toLowerCase().includes(sensitive.toLowerCase())
    )) {
      sanitized[key] = '[REDACTED]';
    }

    // Recursively sanitize nested objects
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeExtra(sanitized[key] as Record<string, any>);
    }
  }

  return sanitized;
}

/**
 * Create error fingerprint for grouping similar errors
 */
export function createFingerprint(...parts: string[]): string[] {
  return parts.filter(Boolean);
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Core
  captureException,
  captureMessage,
  addBreadcrumb,

  // User
  setUserContext,
  clearUserContext,

  // Performance
  measurePerformance,
  trackMetric,
  incrementCounter,
  setGauge,

  // Booking
  trackBookingError,
  trackBookingSuccess,
  measureBookingStep,

  // Payment
  trackPaymentError,
  trackPaymentSuccess,
  measurePayment,

  // Search
  trackSearchError,
  trackSearchPerformance,
  measureSearch,

  // API
  trackApiError,
  trackApiSuccess,

  // Database
  trackDatabaseError,
  measureDatabaseQuery,

  // External API
  measureExternalApi,
  trackExternalApiError,

  // Utilities
  createFingerprint,
};
