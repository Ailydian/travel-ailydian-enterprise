/**
 * Enterprise Error Types - CLAUDE.md Compliant
 * 
 * Discriminated union types for type-safe error handling
 * No generic Error class - specific error types only
 */

/**
 * Base error interface for all application errors
 */
export interface BaseError {
  readonly type: string;
  readonly message: string;
  readonly code?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly timestamp: string;
}

/**
 * Validation Error - Input validation failures
 */
export interface ValidationError extends BaseError {
  readonly type: 'ValidationError';
  readonly field: string;
  readonly constraint: string;
  readonly receivedValue: unknown;
}

/**
 * Authentication Error - Auth failures
 */
export interface AuthenticationError extends BaseError {
  readonly type: 'AuthenticationError';
  readonly reason: 'InvalidCredentials' | 'TokenExpired' | 'TokenInvalid' | 'Unauthorized';
}

/**
 * Authorization Error - Permission failures
 */
export interface AuthorizationError extends BaseError {
  readonly type: 'AuthorizationError';
  readonly requiredPermission: string;
  readonly userPermissions: readonly string[];
}

/**
 * Not Found Error - Resource not found
 */
export interface NotFoundError extends BaseError {
  readonly type: 'NotFoundError';
  readonly resource: string;
  readonly identifier: string | number;
}

/**
 * Conflict Error - Resource conflicts
 */
export interface ConflictError extends BaseError {
  readonly type: 'ConflictError';
  readonly conflictingField: string;
  readonly existingValue: unknown;
}

/**
 * Rate Limit Error - Too many requests
 */
export interface RateLimitError extends BaseError {
  readonly type: 'RateLimitError';
  readonly limit: number;
  readonly windowMs: number;
  readonly retryAfter: number;
}

/**
 * Network Error - Network failures
 */
export interface NetworkError extends BaseError {
  readonly type: 'NetworkError';
  readonly reason: 'Timeout' | 'ConnectionFailed' | 'DNSFailure' | 'Unknown';
  readonly statusCode?: number;
}

/**
 * Database Error - Database operation failures
 */
export interface DatabaseError extends BaseError {
  readonly type: 'DatabaseError';
  readonly operation: 'Read' | 'Write' | 'Delete' | 'Update';
  readonly table?: string;
}

/**
 * External Service Error - Third-party API failures
 */
export interface ExternalServiceError extends BaseError {
  readonly type: 'ExternalServiceError';
  readonly service: string;
  readonly statusCode?: number;
  readonly responseBody?: unknown;
}

/**
 * Business Logic Error - Domain rule violations
 */
export interface BusinessLogicError extends BaseError {
  readonly type: 'BusinessLogicError';
  readonly rule: string;
  readonly context: Readonly<Record<string, unknown>>;
}

/**
 * Internal Error - Unexpected system errors
 */
export interface InternalError extends BaseError {
  readonly type: 'InternalError';
  readonly originalError?: Error;
  readonly stack?: string;
}

/**
 * Union of all application errors
 */
export type AppError =
  | ValidationError
  | AuthenticationError
  | AuthorizationError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | NetworkError
  | DatabaseError
  | ExternalServiceError
  | BusinessLogicError
  | InternalError;

/**
 * Error factory functions
 */
export const Errors = {
  validation: (
    field: string,
    constraint: string,
    receivedValue: unknown,
    message?: string
  ): ValidationError => ({
    type: 'ValidationError',
    field,
    constraint,
    receivedValue,
    message: message || `Validation failed for ${field}: ${constraint}`,
    timestamp: new Date().toISOString(),
  }),

  authentication: (
    reason: AuthenticationError['reason'],
    message?: string
  ): AuthenticationError => ({
    type: 'AuthenticationError',
    reason,
    message: message || `Authentication failed: ${reason}`,
    timestamp: new Date().toISOString(),
  }),

  authorization: (
    requiredPermission: string,
    userPermissions: readonly string[],
    message?: string
  ): AuthorizationError => ({
    type: 'AuthorizationError',
    requiredPermission,
    userPermissions,
    message: message || `Missing permission: ${requiredPermission}`,
    timestamp: new Date().toISOString(),
  }),

  notFound: (
    resource: string,
    identifier: string | number,
    message?: string
  ): NotFoundError => ({
    type: 'NotFoundError',
    resource,
    identifier,
    message: message || `${resource} not found: ${identifier}`,
    timestamp: new Date().toISOString(),
  }),

  conflict: (
    conflictingField: string,
    existingValue: unknown,
    message?: string
  ): ConflictError => ({
    type: 'ConflictError',
    conflictingField,
    existingValue,
    message: message || `Conflict on ${conflictingField}`,
    timestamp: new Date().toISOString(),
  }),

  rateLimit: (
    limit: number,
    windowMs: number,
    retryAfter: number,
    message?: string
  ): RateLimitError => ({
    type: 'RateLimitError',
    limit,
    windowMs,
    retryAfter,
    message: message || `Rate limit exceeded: ${limit} requests per ${windowMs}ms`,
    timestamp: new Date().toISOString(),
  }),

  network: (
    reason: NetworkError['reason'],
    statusCode?: number,
    message?: string
  ): NetworkError => ({
    type: 'NetworkError',
    reason,
    statusCode,
    message: message || `Network error: ${reason}`,
    timestamp: new Date().toISOString(),
  }),

  database: (
    operation: DatabaseError['operation'],
    table?: string,
    message?: string
  ): DatabaseError => ({
    type: 'DatabaseError',
    operation,
    table,
    message: message || `Database ${operation} operation failed`,
    timestamp: new Date().toISOString(),
  }),

  externalService: (
    service: string,
    statusCode?: number,
    responseBody?: unknown,
    message?: string
  ): ExternalServiceError => ({
    type: 'ExternalServiceError',
    service,
    statusCode,
    responseBody,
    message: message || `External service ${service} failed`,
    timestamp: new Date().toISOString(),
  }),

  businessLogic: (
    rule: string,
    context: Readonly<Record<string, unknown>>,
    message?: string
  ): BusinessLogicError => ({
    type: 'BusinessLogicError',
    rule,
    context,
    message: message || `Business rule violated: ${rule}`,
    timestamp: new Date().toISOString(),
  }),

  internal: (
    message: string,
    originalError?: Error
  ): InternalError => ({
    type: 'InternalError',
    message,
    originalError,
    stack: originalError?.stack,
    timestamp: new Date().toISOString(),
  }),
};

/**
 * Type guards for error discrimination
 */
export const ErrorGuards = {
  isValidation: (error: AppError): error is ValidationError =>
    error.type === 'ValidationError',

  isAuthentication: (error: AppError): error is AuthenticationError =>
    error.type === 'AuthenticationError',

  isAuthorization: (error: AppError): error is AuthorizationError =>
    error.type === 'AuthorizationError',

  isNotFound: (error: AppError): error is NotFoundError =>
    error.type === 'NotFoundError',

  isConflict: (error: AppError): error is ConflictError =>
    error.type === 'ConflictError',

  isRateLimit: (error: AppError): error is RateLimitError =>
    error.type === 'RateLimitError',

  isNetwork: (error: AppError): error is NetworkError =>
    error.type === 'NetworkError',

  isDatabase: (error: AppError): error is DatabaseError =>
    error.type === 'DatabaseError',

  isExternalService: (error: AppError): error is ExternalServiceError =>
    error.type === 'ExternalServiceError',

  isBusinessLogic: (error: AppError): error is BusinessLogicError =>
    error.type === 'BusinessLogicError',

  isInternal: (error: AppError): error is InternalError =>
    error.type === 'InternalError',
};

export default { Errors, ErrorGuards };
