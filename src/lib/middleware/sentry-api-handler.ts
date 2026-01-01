/**
 * Sentry API Error Handler Middleware
 * Automatic error tracking and performance monitoring for Next.js API routes
 * Travel.AILYDIAN Platform
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';
import { trackApiError, trackApiSuccess, addBreadcrumb } from '../monitoring/sentry-advanced';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => Promise<void> | void;

export interface ApiErrorHandlerOptions {
  /** Custom error message prefix */
  errorPrefix?: string;
  /** Track performance metrics */
  trackPerformance?: boolean;
  /** Add breadcrumbs for debugging */
  enableBreadcrumbs?: boolean;
  /** Custom tags for Sentry */
  tags?: Record<string, string>;
  /** Custom context data */
  context?: Record<string, any>;
  /** Ignore specific error types */
  ignoreErrors?: string[];
}

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

// ============================================================================
// ERROR HANDLER WRAPPER
// ============================================================================

/**
 * Wrap API route handler with Sentry error tracking and performance monitoring
 *
 * @example
 * ```typescript
 * export default withSentryApiHandler(async (req, res) => {
 *   const data = await fetchData();
 *   res.status(200).json(data);
 * }, {
 *   trackPerformance: true,
 *   tags: { feature: 'search' }
 * });
 * ```
 */
export function withSentryApiHandler<T = any>(
  handler: ApiHandler<T>,
  options: ApiErrorHandlerOptions = {}
): ApiHandler<T> {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const {
      errorPrefix = 'API Error',
      trackPerformance = true,
      enableBreadcrumbs = true,
      tags = {},
      context = {},
      ignoreErrors = [],
    } = options;

    const startTime = Date.now();
    const endpoint = req.url || 'unknown';
    const method = req.method || 'GET';

    // Set Sentry context
    Sentry.setContext('api', {
      endpoint,
      method,
      query: sanitizeQuery(req.query),
      headers: sanitizeHeaders(req.headers),
      ...context,
    });

    // Add tags
    Sentry.setTags({
      api_endpoint: endpoint,
      api_method: method,
      ...tags,
    });

    // Add breadcrumb for request start
    if (enableBreadcrumbs) {
      addBreadcrumb(
        `API Request: ${method} ${endpoint}`,
        'api',
        {
          method,
          endpoint,
          query: sanitizeQuery(req.query),
        },
        'info'
      );
    }

    try {
      // Execute the handler
      await handler(req, res);

      // Track success metrics
      if (trackPerformance) {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode || 200;

        trackApiSuccess(endpoint, duration, method);

        if (enableBreadcrumbs) {
          addBreadcrumb(
            `API Response: ${method} ${endpoint} (${statusCode}) - ${duration}ms`,
            'api',
            { statusCode, duration },
            'info'
          );
        }
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      const apiError = error as ApiError;

      // Check if error should be ignored
      if (shouldIgnoreError(apiError, ignoreErrors)) {
        if (enableBreadcrumbs) {
          addBreadcrumb(
            `API Error (ignored): ${apiError.message}`,
            'api',
            { error: apiError.message },
            'warning'
          );
        }

        // Send error response but don't track in Sentry
        sendErrorResponse(res, apiError, errorPrefix);
        return;
      }

      // Determine status code
      const statusCode = apiError.statusCode || 500;

      // Track error in Sentry
      trackApiError(apiError, endpoint, statusCode, method);

      // Add error breadcrumb
      if (enableBreadcrumbs) {
        addBreadcrumb(
          `API Error: ${method} ${endpoint} (${statusCode}) - ${duration}ms`,
          'api',
          {
            error: apiError.message,
            statusCode,
            duration,
            code: apiError.code,
          },
          'error'
        );
      }

      // Send error response
      sendErrorResponse(res, apiError, errorPrefix);
    } finally {
      // Clear context
      Sentry.setContext('api', null);
    }
  };
}

/**
 * Create custom API error with status code
 */
export class ApiErrorWithStatus extends Error implements ApiError {
  statusCode: number;
  code?: string;
  details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Common API error creators
 */
export const ApiErrors = {
  badRequest: (message: string, details?: any) =>
    new ApiErrorWithStatus(message, 400, 'BAD_REQUEST', details),

  unauthorized: (message: string = 'Unauthorized') =>
    new ApiErrorWithStatus(message, 401, 'UNAUTHORIZED'),

  forbidden: (message: string = 'Forbidden') =>
    new ApiErrorWithStatus(message, 403, 'FORBIDDEN'),

  notFound: (message: string = 'Not found') =>
    new ApiErrorWithStatus(message, 404, 'NOT_FOUND'),

  methodNotAllowed: (message: string = 'Method not allowed') =>
    new ApiErrorWithStatus(message, 405, 'METHOD_NOT_ALLOWED'),

  conflict: (message: string, details?: any) =>
    new ApiErrorWithStatus(message, 409, 'CONFLICT', details),

  unprocessableEntity: (message: string, details?: any) =>
    new ApiErrorWithStatus(message, 422, 'UNPROCESSABLE_ENTITY', details),

  tooManyRequests: (message: string = 'Too many requests') =>
    new ApiErrorWithStatus(message, 429, 'RATE_LIMIT_EXCEEDED'),

  internalServerError: (message: string = 'Internal server error', details?: any) =>
    new ApiErrorWithStatus(message, 500, 'INTERNAL_SERVER_ERROR', details),

  serviceUnavailable: (message: string = 'Service unavailable') =>
    new ApiErrorWithStatus(message, 503, 'SERVICE_UNAVAILABLE'),

  gatewayTimeout: (message: string = 'Gateway timeout') =>
    new ApiErrorWithStatus(message, 504, 'GATEWAY_TIMEOUT'),
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Send error response
 */
function sendErrorResponse(
  res: NextApiResponse,
  error: ApiError,
  errorPrefix: string
): void {
  const statusCode = error.statusCode || 500;

  // Don't send response if already sent
  if (res.headersSent) {
    return;
  }

  res.status(statusCode).json({
    error: {
      message: `${errorPrefix}: ${error.message}`,
      code: error.code,
      details: error.details,
      statusCode,
    },
  } as any);
}

/**
 * Check if error should be ignored
 */
function shouldIgnoreError(error: ApiError, ignoreErrors: string[]): boolean {
  if (ignoreErrors.length === 0) return false;

  return ignoreErrors.some(
    ignore =>
      error.message.includes(ignore) ||
      error.code?.includes(ignore) ||
      error.name.includes(ignore)
  );
}

/**
 * Sanitize query parameters (remove sensitive data)
 */
function sanitizeQuery(query: any): any {
  const sanitized = { ...query };
  const sensitiveKeys = ['token', 'apiKey', 'password', 'secret', 'cardNumber', 'cvv'];

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
}

/**
 * Sanitize headers (remove sensitive data)
 */
function sanitizeHeaders(headers: any): any {
  const sanitized = { ...headers };
  const sensitiveHeaders = [
    'authorization',
    'cookie',
    'x-api-key',
    'x-auth-token',
    'x-csrf-token',
  ];

  for (const header of sensitiveHeaders) {
    if (sanitized[header]) {
      sanitized[header] = '[REDACTED]';
    }
  }

  return sanitized;
}

// ============================================================================
// METHOD VALIDATION HELPER
// ============================================================================

/**
 * Validate HTTP method
 */
export function validateMethod(
  req: NextApiRequest,
  allowedMethods: string[]
): void {
  if (!req.method || !allowedMethods.includes(req.method)) {
    throw ApiErrors.methodNotAllowed(
      `Method ${req.method} not allowed. Allowed methods: ${allowedMethods.join(', ')}`
    );
  }
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields<T = any>(
  data: any,
  requiredFields: string[]
): T {
  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    throw ApiErrors.badRequest(
      `Missing required fields: ${missingFields.join(', ')}`,
      { missingFields }
    );
  }

  return data as T;
}

/**
 * Parse JSON body safely
 */
export async function parseJsonBody<T = any>(req: NextApiRequest): Promise<T> {
  try {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }
    return req.body as T;
  } catch (error) {
    throw ApiErrors.badRequest('Invalid JSON in request body');
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example: API route with Sentry tracking
 *
 * ```typescript
 * // pages/api/bookings/create.ts
 * import { withSentryApiHandler, validateMethod, ApiErrors } from '@/lib/middleware/sentry-api-handler';
 *
 * export default withSentryApiHandler(async (req, res) => {
 *   validateMethod(req, ['POST']);
 *
 *   const { userId, hotelId, dates } = req.body;
 *
 *   if (!userId || !hotelId || !dates) {
 *     throw ApiErrors.badRequest('Missing required fields');
 *   }
 *
 *   const booking = await createBooking({ userId, hotelId, dates });
 *
 *   res.status(201).json({ booking });
 * }, {
 *   trackPerformance: true,
 *   tags: { feature: 'booking' },
 * });
 * ```
 */

// ============================================================================
// EXPORTS
// ============================================================================

export default withSentryApiHandler;
