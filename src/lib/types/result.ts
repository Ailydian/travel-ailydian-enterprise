import { logger } from '../../lib/logger/winston';
/**
 * Result Type System - CLAUDE.md Compliant
 * 
 * Functional error handling without exceptions
 * Based on Rust's Result<T, E> and Haskell's Either
 * 
 * @example
 * ```typescript
 * function divide(a: number, b: number): Result<number, DivisionError> {
 *   if (b === 0) {
 *     return Err({ type: 'DivisionByZero', message: 'Cannot divide by zero' });
 *   }
 *   return Ok(a / b);
 * }
 * 
 * const result = divide(10, 2);
 * if (result.success) {
 *   logger.info(result.data); // 5
 * } else {
 *   logger.error(result.error);
 * }
 * ```
 */

/**
 * Result type representing success or failure
 */
export type Result<T, E = Error> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

/**
 * Create a successful result
 */
export function Ok<T>(data: T): Result<T, never> {
  return Object.freeze({ success: true, data });
}

/**
 * Create a failed result
 */
export function Err<E>(error: E): Result<never, E> {
  return Object.freeze({ success: false, error });
}

/**
 * Check if result is successful
 */
export function isOk<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Check if result is failed
 */
export function isErr<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return result.success === false;
}

/**
 * Map the data of a successful result
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> {
  return result.success ? Ok(fn(result.data)) : result;
}

/**
 * Map the error of a failed result
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  return result.success ? result : Err(fn(result.error));
}

/**
 * Chain/flatMap operation for Result
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => Result<U, E>
): Result<U, E> {
  return result.success ? fn(result.data) : result;
}

/**
 * Unwrap the data or throw the error
 * Use sparingly - prefer pattern matching
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwrap the data or return default value
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.success ? result.data : defaultValue;
}

/**
 * Unwrap the data or compute default value
 */
export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (error: E) => T
): T {
  return result.success ? result.data : fn(result.error);
}

/**
 * Convert a throwing function to Result-returning function
 */
export function tryCatch<T, E = Error>(
  fn: () => T,
  errorMapper?: (error: unknown) => E
): Result<T, E> {
  try {
    return Ok(fn());
  } catch (error) {
    const mappedError = errorMapper
      ? errorMapper(error)
      : (error as E);
    return Err(mappedError);
  }
}

/**
 * Convert an async throwing function to Result-returning function
 */
export async function tryCatchAsync<T, E = Error>(
  fn: () => Promise<T>,
  errorMapper?: (error: unknown) => E
): Promise<Result<T, E>> {
  try {
    const data = await fn();
    return Ok(data);
  } catch (error) {
    const mappedError = errorMapper
      ? errorMapper(error)
      : (error as E);
    return Err(mappedError);
  }
}

/**
 * Combine multiple Results into one
 * Success only if ALL are successful
 */
export function all<T, E>(
  results: ReadonlyArray<Result<T, E>>
): Result<ReadonlyArray<T>, E> {
  const data: T[] = [];

  for (const result of results) {
    if (!result.success) {
      return result;
    }
    data.push(result.data);
  }

  return Ok(Object.freeze(data));
}

/**
 * Get the first successful Result
 * Error only if ALL are errors
 */
export function any<T, E>(
  results: ReadonlyArray<Result<T, E>>
): Result<T, ReadonlyArray<E>> {
  const errors: E[] = [];

  for (const result of results) {
    if (result.success) {
      return result;
    }
    errors.push(result.error);
  }

  return Err(Object.freeze(errors));
}

/**
 * Partition results into successes and failures
 */
export function partition<T, E>(
  results: ReadonlyArray<Result<T, E>>
): {
  readonly successes: ReadonlyArray<T>;
  readonly failures: ReadonlyArray<E>;
} {
  const successes: T[] = [];
  const failures: E[] = [];

  for (const result of results) {
    if (result.success) {
      successes.push(result.data);
    } else {
      failures.push(result.error);
    }
  }

  return Object.freeze({
    successes: Object.freeze(successes),
    failures: Object.freeze(failures),
  });
}

/**
 * Type guard for Result type
 */
export function isResult<T, E>(value: unknown): value is Result<T, E> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in value &&
    typeof (value as Record<string, unknown>).success === 'boolean'
  );
}

export default {
  Ok,
  Err,
  isOk,
  isErr,
  map,
  mapErr,
  andThen,
  unwrap,
  unwrapOr,
  unwrapOrElse,
  tryCatch,
  tryCatchAsync,
  all,
  any,
  partition,
  isResult,
};
