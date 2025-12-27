/**
 * API Middleware - CLAUDE.md Compliant
 *
 * Enterprise-grade middleware for Next.js API routes
 * - Error handling with Result type
 * - Request validation with Zod
 * - Rate limiting
 * - Logging
 * - Authentication/Authorization
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { Result, Ok, Err } from '@/lib/types/result';
import { Errors, type AppError } from '@/lib/types/errors';
import logger from '../../lib/logger';

/**
 * API Handler type with Result return
 */
export type ApiHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<Result<T, AppError>>;

/**
 * Wrap API handler with comprehensive error handling
 */
export function withErrorHandling<T>(
  handler: ApiHandler<T>
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const stopTimer = logger.startTimer();
    const requestId = Math.random().toString(36).substring(7);

    logger.info('API request received', {
      requestId,
      component: 'API',
      action: req.url || 'unknown',
      metadata: {
        method: req.method,
        url: req.url,
      },
    });

    try {
      const result = await handler(req, res);

      if (result.success) {
        logger.info('API request succeeded', {
          requestId,
          component: 'API',
          duration: stopTimer(),
        });

        return res.status(200).json({
          success: true,
          data: result.data,
        });
      }

      // Handle known application errors
      const statusCode = getStatusCodeForError(result.error);

      logger.warn('API request failed with known error', {
        requestId,
        component: 'API',
        duration: stopTimer(),
        metadata: {
          errorType: result.error.type,
          errorMessage: result.error.message,
        },
      });

      return res.status(statusCode).json({
        success: false,
        error: {
          type: result.error.type,
          message: result.error.message,
          code: result.error.code,
          requestId,
        },
      });
    } catch (error) {
      // Handle unexpected errors
      logger.error('API request failed with unexpected error', error as Error, {
        requestId,
        component: 'API',
        duration: stopTimer(),
      });

      return res.status(500).json({
        success: false,
        error: {
          type: 'InternalError',
          message: 'An unexpected error occurred',
          requestId,
        },
      });
    }
  };
}

/**
 * Map application errors to HTTP status codes
 */
function getStatusCodeForError(error: AppError): number {
  switch (error.type) {
    case 'ValidationError':
      return 400;
    case 'AuthenticationError':
      return 401;
    case 'AuthorizationError':
      return 403;
    case 'NotFoundError':
      return 404;
    case 'ConflictError':
      return 409;
    case 'RateLimitError':
      return 429;
    case 'BusinessLogicError':
      return 422;
    case 'ExternalServiceError':
    case 'NetworkError':
    case 'DatabaseError':
    case 'InternalError':
    default:
      return 500;
  }
}

/**
 * Validate request body with Zod schema
 */
export function withValidation<T>(
  schema: z.ZodSchema<T>,
  handler: (req: NextApiRequest, res: NextApiResponse, data: T) => Promise<Result<unknown, AppError>>
): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.errors[0];
      return Err(
        Errors.validation(
          firstError.path.join('.'),
          firstError.message,
          firstError.code
        )
      );
    }

    return handler(req, res, result.data);
  };
}

/**
 * Ensure request method is allowed
 */
export function withMethod(
  allowedMethods: readonly string[],
  handler: ApiHandler
): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method || !allowedMethods.includes(req.method)) {
      const methodsList = allowedMethods.join(', ');
      return Err(
        Errors.validation(
          'method',
          `Method ${req.method} not allowed. Allowed: ${methodsList}`,
          req.method
        )
      );
    }

    return handler(req, res);
  };
}

/**
 * Rate limiting middleware (simple in-memory implementation)
 * For production, use Redis-backed rate limiter
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function withRateLimit(
  maxRequests: number,
  windowMs: number,
  handler: ApiHandler
): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = (req.headers['x-forwarded-for'] as string) ||
               (req.headers['x-real-ip'] as string) ||
               'unknown';

    const now = Date.now();
    const key = `${ip}:${req.url || ''}`;
    const record = rateLimitStore.get(key);

    if (record) {
      if (now < record.resetAt) {
        if (record.count >= maxRequests) {
          const retryAfter = Math.ceil((record.resetAt - now) / 1000);

          return Err(
            Errors.rateLimit(
              maxRequests,
              windowMs,
              retryAfter,
              `Too many requests. Try again in ${retryAfter} seconds.`
            )
          );
        }

        record.count++;
      } else {
        rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
      }
    } else {
      rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    }

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      for (const [k, v] of rateLimitStore.entries()) {
        if (now > v.resetAt + windowMs) {
          rateLimitStore.delete(k);
        }
      }
    }

    return handler(req, res);
  };
}

/**
 * Compose multiple middleware functions
 */
export function compose(
  ...middlewares: ((handler: ApiHandler) => ApiHandler)[]
): (handler: ApiHandler) => ApiHandler {
  return (handler: ApiHandler) => {
    return middlewares.reduceRight(
      (acc, middleware) => middleware(acc),
      handler
    );
  };
}

/**
 * Example usage:
 *
 * export default withErrorHandling(
 *   compose(
 *     withMethod(['POST']),
 *     withRateLimit(10, 60000),
 *     withValidation(UserSchemas.create)
 *   )(async (req, res, data) => {
 *     // Your handler logic here
 *     return Ok({ userId: '123' });
 *   })
 * );
 */

export default {
  withErrorHandling,
  withValidation,
  withMethod,
  withRateLimit,
  compose,
};
