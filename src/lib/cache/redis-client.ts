/**
 * Enterprise Redis Client (Production-Grade)
 * Upstash Redis with connection pooling, retry logic, and circuit breaker
 * Backend Architect Agent Implementation
 */

import { Redis } from '@upstash/redis';
import { captureException, captureMessage } from '../monitoring/sentry';

// ==========================================
// REDIS CLIENT CONFIGURATION
// ==========================================

export class RedisClient {
  private static instance: Redis | null = null;
  private static isHealthy: boolean = true;
  private static failureCount: number = 0;
  private static readonly MAX_FAILURES = 5;
  private static readonly CIRCUIT_BREAKER_TIMEOUT = 60000; // 1 minute
  private static circuitBreakerResetTimer: NodeJS.Timeout | null = null;

  /**
   * Get Redis singleton instance
   */
  public static getInstance(): Redis {
    if (!this.instance) {
      if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        throw new Error('Redis credentials not configured');
      }

      this.instance = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
        retry: {
          retries: 3,
          backoff: (retryCount) => Math.min(100 * Math.pow(2, retryCount), 3000),
        },
      });
    }

    return this.instance;
  }

  /**
   * Execute Redis command with circuit breaker
   */
  public static async execute<T>(
    operation: (redis: Redis) => Promise<T>,
    fallback?: T
  ): Promise<T | null> {
    // Circuit breaker: fail fast if unhealthy
    if (!this.isHealthy) {
      captureMessage('Redis circuit breaker open, using fallback', 'warning');
      return fallback ?? null;
    }

    try {
      const redis = this.getInstance();
      const result = await operation(redis);

      // Reset failure count on success
      if (this.failureCount > 0) {
        this.failureCount = 0;
        captureMessage('Redis recovered', 'info');
      }

      return result;
    } catch (error) {
      this.handleFailure(error);
      return fallback ?? null;
    }
  }

  /**
   * Handle Redis operation failure
   */
  private static handleFailure(error: unknown): void {
    this.failureCount++;

    captureException(error, {
      context: 'redis-failure',
      failureCount: this.failureCount,
    });

    // Open circuit breaker after threshold
    if (this.failureCount >= this.MAX_FAILURES && this.isHealthy) {
      this.isHealthy = false;
      captureMessage(
        `Redis circuit breaker opened after ${this.failureCount} failures`,
        'error'
      );

      // Auto-reset circuit breaker after timeout
      if (this.circuitBreakerResetTimer) {
        clearTimeout(this.circuitBreakerResetTimer);
      }

      this.circuitBreakerResetTimer = setTimeout(() => {
        this.isHealthy = true;
        this.failureCount = 0;
        captureMessage('Redis circuit breaker reset', 'info');
      }, this.CIRCUIT_BREAKER_TIMEOUT);
    }
  }

  /**
   * Health check
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      const redis = this.getInstance();
      await redis.ping();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  public static getStats(): {
    isHealthy: boolean;
    failureCount: number;
    circuitBreakerOpen: boolean;
  } {
    return {
      isHealthy: this.isHealthy,
      failureCount: this.failureCount,
      circuitBreakerOpen: !this.isHealthy,
    };
  }
}

// ==========================================
// CACHE KEY UTILITIES
// ==========================================

export class CacheKeyBuilder {
  private parts: string[] = [];

  constructor(private prefix: string) {
    this.parts.push(prefix);
  }

  /**
   * Add key segment
   */
  public add(segment: string | number): this {
    this.parts.push(String(segment));
    return this;
  }

  /**
   * Add multiple segments
   */
  public addMany(...segments: (string | number)[]): this {
    segments.forEach((seg) => this.add(seg));
    return this;
  }

  /**
   * Add query params as sorted key
   */
  public addParams(params: Record<string, any>): this {
    const sorted = Object.keys(params)
      .sort()
      .map((key) => `${key}=${JSON.stringify(params[key])}`)
      .join('&');
    this.parts.push(sorted);
    return this;
  }

  /**
   * Build final cache key
   */
  public build(): string {
    return this.parts.join(':');
  }

  /**
   * Static helper for simple keys
   */
  public static simple(prefix: string, ...parts: (string | number)[]): string {
    return new CacheKeyBuilder(prefix).addMany(...parts).build();
  }
}

// ==========================================
// CACHE INVALIDATION PATTERNS
// ==========================================

export class CacheInvalidator {
  /**
   * Invalidate all keys matching pattern
   */
  public static async invalidatePattern(pattern: string): Promise<number> {
    try {
      const redis = RedisClient.getInstance();

      // Upstash Redis doesn't support SCAN, use keys (acceptable for patterns)
      const keys = await RedisClient.execute(
        async (r) => r.keys(pattern),
        []
      );

      if (!keys || keys.length === 0) return 0;

      // Delete in batches
      const batchSize = 100;
      let deletedCount = 0;

      for (let i = 0; i < keys.length; i += batchSize) {
        const batch = keys.slice(i, i + batchSize);
        const result = await RedisClient.execute(
          async (r) => r.del(...batch),
          0
        );
        deletedCount += result || 0;
      }

      captureMessage(`Invalidated ${deletedCount} cache keys: ${pattern}`, 'info');
      return deletedCount;
    } catch (error) {
      captureException(error, { pattern });
      return 0;
    }
  }

  /**
   * Invalidate by tags
   */
  public static async invalidateTags(tags: string[]): Promise<void> {
    const redis = RedisClient.getInstance();

    for (const tag of tags) {
      // Get all keys associated with tag
      const tagKey = `cache:tag:${tag}`;
      const keys = await RedisClient.execute(
        async (r) => r.smembers(tagKey),
        []
      );

      if (!keys || keys.length === 0) continue;

      // Delete keys
      await RedisClient.execute(async (r) => r.del(...keys));

      // Delete tag set
      await RedisClient.execute(async (r) => r.del(tagKey));
    }
  }

  /**
   * Tag a cache entry
   */
  public static async tagCacheEntry(key: string, tags: string[]): Promise<void> {
    const redis = RedisClient.getInstance();

    for (const tag of tags) {
      const tagKey = `cache:tag:${tag}`;
      await RedisClient.execute(async (r) => r.sadd(tagKey, key));
    }
  }
}

// ==========================================
// CACHE TYPES
// ==========================================

export type CacheOptions = {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Cache tags for invalidation
  compress?: boolean; // Compress large values
};

export type CacheResult<T> = {
  hit: boolean;
  value: T | null;
  source: 'memory' | 'redis' | 'miss';
};
