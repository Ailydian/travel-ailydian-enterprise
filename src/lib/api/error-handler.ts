import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '../logger/winston';

/**
 * STANDARDIZED ERROR HANDLING FOR API ROUTES
 *
 * Features:
 * - Consistent error response format
 * - Proper HTTP status codes
 * - Development vs production error details
 * - Error tracking and logging
 * - Type-safe error responses
 */

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  path?: string;
  requestId?: string;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId?: string;
    cached?: boolean;
    executionTime?: number;
  };
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

/**
 * Error types with their HTTP status codes
 */
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT = 'RATE_LIMIT',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  TIMEOUT = 'TIMEOUT',
}

const ERROR_STATUS_CODES: Record<ErrorType, number> = {
  [ErrorType.VALIDATION_ERROR]: 400,
  [ErrorType.BAD_REQUEST]: 400,
  [ErrorType.AUTHENTICATION_ERROR]: 401,
  [ErrorType.AUTHORIZATION_ERROR]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.CONFLICT]: 409,
  [ErrorType.RATE_LIMIT]: 429,
  [ErrorType.DATABASE_ERROR]: 500,
  [ErrorType.EXTERNAL_SERVICE_ERROR]: 503,
  [ErrorType.INTERNAL_SERVER_ERROR]: 500,
  [ErrorType.TIMEOUT]: 504,
};

/**
 * Custom API Error class
 */
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string,
    public details?: Record<string, unknown>,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }

  get statusCode(): number {
    return ERROR_STATUS_CODES[this.type];
  }
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  error: Error | AppError | ZodError | Prisma.PrismaClientKnownRequestError,
  req: NextApiRequest
): ApiError {
  const requestId = (req.headers['x-request-id'] as string) || generateRequestId();
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Handle custom AppError
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.type,
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      details: isDevelopment ? error.details : undefined,
      timestamp: new Date().toISOString(),
      path: req.url,
      requestId,
    };
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return {
      success: false,
      error: ErrorType.VALIDATION_ERROR,
      message: 'Validation failed',
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      details: isDevelopment
        ? {
            issues: error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          }
        : undefined,
      timestamp: new Date().toISOString(),
      path: req.url,
      requestId,
    };
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { type, message, details } = parsePrismaError(error);

    return {
      success: false,
      error: type,
      message,
      statusCode: ERROR_STATUS_CODES[type],
      code: error.code,
      details: isDevelopment ? details : undefined,
      timestamp: new Date().toISOString(),
      path: req.url,
      requestId,
    };
  }

  // Handle Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      success: false,
      error: ErrorType.VALIDATION_ERROR,
      message: 'Database validation error',
      statusCode: 400,
      code: 'PRISMA_VALIDATION_ERROR',
      details: isDevelopment ? { originalError: error.message } : undefined,
      timestamp: new Date().toISOString(),
      path: req.url,
      requestId,
    };
  }

  // Handle generic errors
  return {
    success: false,
    error: ErrorType.INTERNAL_SERVER_ERROR,
    message: isDevelopment ? error.message : 'An unexpected error occurred',
    statusCode: 500,
    details: isDevelopment
      ? {
          stack: error.stack,
          name: error.name,
        }
      : undefined,
    timestamp: new Date().toISOString(),
    path: req.url,
    requestId,
  };
}

/**
 * Parse Prisma errors into user-friendly messages
 */
function parsePrismaError(error: Prisma.PrismaClientKnownRequestError): {
  type: ErrorType;
  message: string;
  details: Record<string, unknown>;
} {
  switch (error.code) {
    case 'P2002': // Unique constraint violation
      return {
        type: ErrorType.CONFLICT,
        message: 'A record with this value already exists',
        details: {
          code: error.code,
          meta: error.meta,
        },
      };

    case 'P2003': // Foreign key constraint violation
      return {
        type: ErrorType.BAD_REQUEST,
        message: 'Invalid reference to related record',
        details: {
          code: error.code,
          meta: error.meta,
        },
      };

    case 'P2025': // Record not found
      return {
        type: ErrorType.NOT_FOUND,
        message: 'Record not found',
        details: {
          code: error.code,
          meta: error.meta,
        },
      };

    case 'P2024': // Connection timeout
      return {
        type: ErrorType.TIMEOUT,
        message: 'Database connection timeout',
        details: {
          code: error.code,
        },
      };

    default:
      return {
        type: ErrorType.DATABASE_ERROR,
        message: 'Database operation failed',
        details: {
          code: error.code,
          meta: error.meta,
        },
      };
  }
}

/**
 * Error handler wrapper for API routes
 */
export function withErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const startTime = Date.now();
    const requestId = (req.headers['x-request-id'] as string) || generateRequestId();

    // Set request ID in response headers
    res.setHeader('X-Request-ID', requestId);

    try {
      await handler(req, res);

      // Log successful request
      const executionTime = Date.now() - startTime;
      logger.info('API request completed', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        executionTime: `${executionTime}ms`,
        requestId,
      });
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorResponse = createErrorResponse(error as Error, req);

      // Log error
      logger.error('API request failed', error as Error, {
        method: req.method,
        url: req.url,
        statusCode: errorResponse.statusCode,
        errorType: errorResponse.error,
        executionTime: `${executionTime}ms`,
        requestId,
      });

      // Send error response
      if (!res.headersSent) {
        res.status(errorResponse.statusCode).json(errorResponse);
      }
    }
  };
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  meta?: Record<string, unknown>
): ApiSuccess<T> {
  return {
    success: true,
    data,
    message,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
}

/**
 * Send success response
 */
export function sendSuccess<T>(
  res: NextApiResponse,
  data: T,
  statusCode: number = 200,
  message?: string,
  meta?: Record<string, unknown>
): void {
  const response = createSuccessResponse(data, message, meta);
  res.status(statusCode).json(response);
}

/**
 * Send error response
 */
export function sendError(
  res: NextApiResponse,
  type: ErrorType,
  message: string,
  details?: Record<string, unknown>,
  code?: string
): void {
  const error = new AppError(type, message, details, code);
  const statusCode = ERROR_STATUS_CODES[type];

  res.status(statusCode).json({
    success: false,
    error: type,
    message,
    statusCode,
    code,
    details: process.env.NODE_ENV === 'development' ? details : undefined,
    timestamp: new Date().toISOString(),
  } as ApiError);
}

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Async error boundary for API routes
 */
export function asyncHandler(
  fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    Promise.resolve(fn(req, res)).catch((error) => {
      const errorResponse = createErrorResponse(error, req);

      logger.error('Async handler error', error, {
        method: req.method,
        url: req.url,
      });

      if (!res.headersSent) {
        res.status(errorResponse.statusCode).json(errorResponse);
      }
    });
  };
}

/**
 * Common error factories
 */
export const Errors = {
  notFound: (message = 'Resource not found', details?: Record<string, unknown>) =>
    new AppError(ErrorType.NOT_FOUND, message, details),

  unauthorized: (message = 'Authentication required', details?: Record<string, unknown>) =>
    new AppError(ErrorType.AUTHENTICATION_ERROR, message, details),

  forbidden: (message = 'Access denied', details?: Record<string, unknown>) =>
    new AppError(ErrorType.AUTHORIZATION_ERROR, message, details),

  validation: (message = 'Validation failed', details?: Record<string, unknown>) =>
    new AppError(ErrorType.VALIDATION_ERROR, message, details),

  conflict: (message = 'Resource conflict', details?: Record<string, unknown>) =>
    new AppError(ErrorType.CONFLICT, message, details),

  rateLimit: (message = 'Rate limit exceeded', details?: Record<string, unknown>) =>
    new AppError(ErrorType.RATE_LIMIT, message, details),

  database: (message = 'Database error', details?: Record<string, unknown>) =>
    new AppError(ErrorType.DATABASE_ERROR, message, details),

  externalService: (message = 'External service error', details?: Record<string, unknown>) =>
    new AppError(ErrorType.EXTERNAL_SERVICE_ERROR, message, details),

  timeout: (message = 'Request timeout', details?: Record<string, unknown>) =>
    new AppError(ErrorType.TIMEOUT, message, details),

  badRequest: (message = 'Bad request', details?: Record<string, unknown>) =>
    new AppError(ErrorType.BAD_REQUEST, message, details),
};
