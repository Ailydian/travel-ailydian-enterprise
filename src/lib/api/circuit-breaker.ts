import { logger } from '../logger/winston';

/**
 * PRODUCTION-GRADE CIRCUIT BREAKER PATTERN
 *
 * Features:
 * - Automatic failure detection
 * - Exponential backoff retry logic
 * - Half-open state for testing recovery
 * - Configurable thresholds
 * - Metrics and monitoring
 * - Multiple circuit breaker instances
 */

export enum CircuitState {
  CLOSED = 'CLOSED', // Normal operation
  OPEN = 'OPEN', // Circuit is open, requests fail fast
  HALF_OPEN = 'HALF_OPEN', // Testing if service recovered
}

export interface CircuitBreakerConfig {
  failureThreshold: number; // Number of failures before opening circuit
  successThreshold: number; // Number of successes to close circuit from half-open
  timeout: number; // Time before attempting to close circuit (ms)
  resetTimeout: number; // Time to wait before transitioning from open to half-open (ms)
  name: string; // Circuit breaker name for logging
}

export interface CircuitBreakerMetrics {
  state: CircuitState;
  failures: number;
  successes: number;
  totalRequests: number;
  totalFailures: number;
  totalSuccesses: number;
  lastFailureTime: number | null;
  lastSuccessTime: number | null;
  openedAt: number | null;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures: number = 0;
  private successes: number = 0;
  private totalRequests: number = 0;
  private totalFailures: number = 0;
  private totalSuccesses: number = 0;
  private lastFailureTime: number | null = null;
  private lastSuccessTime: number | null = null;
  private openedAt: number | null = null;
  private nextAttempt: number = Date.now();

  constructor(private config: CircuitBreakerConfig) {}

  /**
   * Execute a function with circuit breaker protection
   */
  async execute<T>(
    operation: () => Promise<T>,
    fallback?: () => Promise<T> | T
  ): Promise<T> {
    this.totalRequests++;

    // Check if circuit is open
    if (this.state === CircuitState.OPEN) {
      if (Date.now() < this.nextAttempt) {
        logger.warn('Circuit breaker is OPEN, request rejected', {
          name: this.config.name,
          nextAttempt: new Date(this.nextAttempt).toISOString(),
        });

        if (fallback) {
          return typeof fallback === 'function' ? await fallback() : fallback;
        }

        throw new Error(
          `Circuit breaker '${this.config.name}' is OPEN. Service temporarily unavailable.`
        );
      }

      // Transition to half-open to test the service
      this.state = CircuitState.HALF_OPEN;
      this.successes = 0;
      this.failures = 0;

      logger.info('Circuit breaker transitioning to HALF_OPEN', {
        name: this.config.name,
      });
    }

    try {
      // Execute the operation
      const result = await operation();

      // Record success
      this.onSuccess();

      return result;
    } catch (error) {
      // Record failure
      this.onFailure();

      logger.error('Circuit breaker operation failed', error as Error, {
        name: this.config.name,
        state: this.state,
        failures: this.failures,
        threshold: this.config.failureThreshold,
      });

      // Use fallback if available
      if (fallback) {
        logger.info('Using circuit breaker fallback', {
          name: this.config.name,
        });

        return typeof fallback === 'function' ? await fallback() : fallback;
      }

      throw error;
    }
  }

  /**
   * Handle successful operation
   */
  private onSuccess(): void {
    this.successes++;
    this.totalSuccesses++;
    this.lastSuccessTime = Date.now();
    this.failures = 0; // Reset consecutive failures

    if (this.state === CircuitState.HALF_OPEN) {
      if (this.successes >= this.config.successThreshold) {
        this.closeCircuit();
      }
    }
  }

  /**
   * Handle failed operation
   */
  private onFailure(): void {
    this.failures++;
    this.totalFailures++;
    this.lastFailureTime = Date.now();

    if (this.state === CircuitState.HALF_OPEN) {
      // Immediately open circuit if failure in half-open state
      this.openCircuit();
    } else if (this.failures >= this.config.failureThreshold) {
      this.openCircuit();
    }
  }

  /**
   * Open the circuit
   */
  private openCircuit(): void {
    this.state = CircuitState.OPEN;
    this.openedAt = Date.now();
    this.nextAttempt = Date.now() + this.config.resetTimeout;

    logger.warn('Circuit breaker OPENED', {
      name: this.config.name,
      failures: this.failures,
      threshold: this.config.failureThreshold,
      nextAttempt: new Date(this.nextAttempt).toISOString(),
    });
  }

  /**
   * Close the circuit
   */
  private closeCircuit(): void {
    this.state = CircuitState.CLOSED;
    this.failures = 0;
    this.successes = 0;
    this.openedAt = null;

    logger.info('Circuit breaker CLOSED', {
      name: this.config.name,
      successThreshold: this.config.successThreshold,
    });
  }

  /**
   * Get circuit breaker metrics
   */
  getMetrics(): CircuitBreakerMetrics {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      totalRequests: this.totalRequests,
      totalFailures: this.totalFailures,
      totalSuccesses: this.totalSuccesses,
      lastFailureTime: this.lastFailureTime,
      lastSuccessTime: this.lastSuccessTime,
      openedAt: this.openedAt,
    };
  }

  /**
   * Get health status
   */
  getHealth(): {
    healthy: boolean;
    state: CircuitState;
    failureRate: number;
    uptime: number;
  } {
    const failureRate =
      this.totalRequests > 0
        ? (this.totalFailures / this.totalRequests) * 100
        : 0;

    const uptime =
      this.lastSuccessTime && this.openedAt
        ? this.lastSuccessTime - this.openedAt
        : 0;

    return {
      healthy: this.state === CircuitState.CLOSED,
      state: this.state,
      failureRate: Number(failureRate.toFixed(2)),
      uptime,
    };
  }

  /**
   * Manually reset circuit breaker
   */
  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failures = 0;
    this.successes = 0;
    this.openedAt = null;

    logger.info('Circuit breaker manually reset', {
      name: this.config.name,
    });
  }
}

/**
 * Retry logic with exponential backoff
 */
export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableErrors?: Array<new (...args: any[]) => Error>;
}

export class RetryWithBackoff {
  constructor(
    private config: RetryConfig = {
      maxRetries: 3,
      initialDelayMs: 1000,
      maxDelayMs: 30000,
      backoffMultiplier: 2,
    }
  ) {}

  /**
   * Execute operation with retry and exponential backoff
   */
  async execute<T>(
    operation: () => Promise<T>,
    operationName: string = 'Operation'
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await operation();

        if (attempt > 0) {
          logger.info('Retry succeeded', {
            operation: operationName,
            attempt,
            maxRetries: this.config.maxRetries,
          });
        }

        return result;
      } catch (error) {
        lastError = error as Error;

        // Check if error is retryable
        if (
          this.config.retryableErrors &&
          !this.config.retryableErrors.some((ErrorClass) => error instanceof ErrorClass)
        ) {
          logger.warn('Non-retryable error encountered', {
            operation: operationName,
            error: lastError.message,
          });
          throw error;
        }

        if (attempt < this.config.maxRetries) {
          const delay = this.calculateDelay(attempt);

          logger.warn('Retry attempt failed, retrying...', {
            operation: operationName,
            attempt: attempt + 1,
            maxRetries: this.config.maxRetries,
            delayMs: delay,
            error: lastError.message,
          });

          await this.sleep(delay);
        }
      }
    }

    logger.error('All retry attempts failed', lastError!, {
      operation: operationName,
      maxRetries: this.config.maxRetries,
    });

    throw lastError;
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateDelay(attempt: number): number {
    const delay = Math.min(
      this.config.initialDelayMs * Math.pow(this.config.backoffMultiplier, attempt),
      this.config.maxDelayMs
    );

    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.3 * delay;

    return Math.floor(delay + jitter);
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Global circuit breaker registry
 */
class CircuitBreakerRegistry {
  private breakers: Map<string, CircuitBreaker> = new Map();

  /**
   * Get or create circuit breaker
   */
  getOrCreate(name: string, config?: Partial<CircuitBreakerConfig>): CircuitBreaker {
    if (!this.breakers.has(name)) {
      const defaultConfig: CircuitBreakerConfig = {
        name,
        failureThreshold: 5,
        successThreshold: 2,
        timeout: 60000, // 1 minute
        resetTimeout: 30000, // 30 seconds
        ...config,
      };

      this.breakers.set(name, new CircuitBreaker(defaultConfig));
    }

    return this.breakers.get(name)!;
  }

  /**
   * Get all circuit breakers
   */
  getAll(): Map<string, CircuitBreaker> {
    return this.breakers;
  }

  /**
   * Get health status of all circuit breakers
   */
  getHealthStatus(): Record<
    string,
    {
      healthy: boolean;
      state: CircuitState;
      failureRate: number;
    }
  > {
    const status: Record<string, any> = {};

    this.breakers.forEach((breaker, name) => {
      status[name] = breaker.getHealth();
    });

    return status;
  }

  /**
   * Reset all circuit breakers
   */
  resetAll(): void {
    this.breakers.forEach((breaker) => breaker.reset());
    logger.info('All circuit breakers reset');
  }
}

// Global registry instance
export const circuitBreakerRegistry = new CircuitBreakerRegistry();

/**
 * Pre-configured circuit breakers for external services
 */
export const ExternalServiceBreakers = {
  amadeus: circuitBreakerRegistry.getOrCreate('amadeus', {
    failureThreshold: 5,
    successThreshold: 2,
    resetTimeout: 30000,
  }),

  booking: circuitBreakerRegistry.getOrCreate('booking-com', {
    failureThreshold: 5,
    successThreshold: 2,
    resetTimeout: 30000,
  }),

  googlePlaces: circuitBreakerRegistry.getOrCreate('google-places', {
    failureThreshold: 3,
    successThreshold: 2,
    resetTimeout: 20000,
  }),

  openai: circuitBreakerRegistry.getOrCreate('openai', {
    failureThreshold: 3,
    successThreshold: 2,
    resetTimeout: 20000,
  }),

  stripe: circuitBreakerRegistry.getOrCreate('stripe', {
    failureThreshold: 3,
    successThreshold: 2,
    resetTimeout: 20000,
  }),

  email: circuitBreakerRegistry.getOrCreate('email', {
    failureThreshold: 5,
    successThreshold: 2,
    resetTimeout: 30000,
  }),
};
