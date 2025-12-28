/**
 * Hybrid L1+L2 Cache Manager (Production-Grade)
 * Intelligent multi-layer caching with automatic fallback
 * Backend Architect Agent Implementation
 */

import { RedisClient, CacheKeyBuilder, CacheInvalidator, type CacheOptions, type CacheResult } from './redis-client';
import { LRUCache, globalLRUCache } from './lru-cache';
import { measurePerformance, trackMetric } from '../monitoring/sentry';
import { compress, decompress } from '../utils/compression';

// Re-export for convenience
export { CacheKeyBuilder } from './redis-client';

// ==========================================
// HYBRID CACHE MANAGER
// ==========================================

export class HybridCacheManager<T = any> {
  private l1Cache: LRUCache<T>;

  constructor(
    private readonly namespace: string,
    l1MaxSize: number = 1000,
    private readonly defaultTTL: number = 300 // 5 minutes
  ) {
    this.l1Cache = new LRUCache<T>(l1MaxSize, defaultTTL * 1000); // Convert to ms
  }

  /**
   * Get value from cache (L1 → L2 → miss)
   */
  public async get(key: string): Promise<CacheResult<T>> {
    const cacheKey = this.buildKey(key);

    // L1 (Memory) check
    const l1Value = this.l1Cache.get(cacheKey);
    if (l1Value !== null) {
      trackMetric('cache.hit', 1, 'count', { layer: 'L1', namespace: this.namespace });
      return { hit: true, value: l1Value, source: 'memory' };
    }

    // L2 (Redis) check
    const l2Value = await RedisClient.execute<string>(
      async (redis) => redis.get(cacheKey),
      null
    );

    if (l2Value !== null) {
      try {
        // Deserialize and optionally decompress
        const parsed = JSON.parse(l2Value) as { value: T; compressed?: boolean };
        let value = parsed.value;

        if (parsed.compressed && typeof value === 'string') {
          value = JSON.parse(await decompress(value)) as T;
        }

        // Populate L1 cache
        this.l1Cache.set(cacheKey, value);

        trackMetric('cache.hit', 1, 'count', { layer: 'L2', namespace: this.namespace });
        return { hit: true, value, source: 'redis' };
      } catch (error) {
        // Corrupted cache entry, delete it
        await this.delete(key);
      }
    }

    // Cache miss
    trackMetric('cache.miss', 1, 'count', { namespace: this.namespace });
    return { hit: false, value: null, source: 'miss' };
  }

  /**
   * Set value in cache (both L1 and L2)
   */
  public async set(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const cacheKey = this.buildKey(key);
    const ttl = options.ttl || this.defaultTTL;

    // Set in L1 (memory)
    this.l1Cache.set(cacheKey, value, ttl * 1000);

    // Prepare value for Redis
    let redisValue = value;
    let compressed = false;

    // Compress if enabled and value is large
    if (options.compress) {
      const serialized = JSON.stringify(value);
      if (serialized.length > 1024) { // Compress if > 1KB
        redisValue = await compress(serialized) as any;
        compressed = true;
      }
    }

    // Set in L2 (Redis)
    await RedisClient.execute(async (redis) => {
      const payload = JSON.stringify({ value: redisValue, compressed });
      await redis.set(cacheKey, payload, { ex: ttl });
    });

    // Tag cache entry for invalidation
    if (options.tags && options.tags.length > 0) {
      await CacheInvalidator.tagCacheEntry(cacheKey, options.tags);
    }

    trackMetric('cache.set', 1, 'count', { namespace: this.namespace });
  }

  /**
   * Get or compute value (cache-aside pattern)
   */
  public async getOrCompute(
    key: string,
    computeFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Try cache first
    const cached = await this.get(key);
    if (cached.hit && cached.value !== null) {
      return cached.value;
    }

    // Compute value with performance tracking
    const value = await measurePerformance(
      `cache:compute:${this.namespace}`,
      computeFn,
      { tags: { operation: 'compute' } }
    );

    // Store in cache
    await this.set(key, value, options);

    return value;
  }

  /**
   * Delete from both L1 and L2
   */
  public async delete(key: string): Promise<void> {
    const cacheKey = this.buildKey(key);

    // Delete from L1
    this.l1Cache.delete(cacheKey);

    // Delete from L2
    await RedisClient.execute(async (redis) => {
      await redis.del(cacheKey);
    });

    trackMetric('cache.delete', 1, 'count', { namespace: this.namespace });
  }

  /**
   * Invalidate all keys matching pattern
   */
  public async invalidatePattern(pattern: string): Promise<number> {
    const fullPattern = this.buildKey(pattern);

    // Clear entire L1 cache (pattern matching not supported)
    this.l1Cache.clear();

    // Invalidate in Redis
    const count = await CacheInvalidator.invalidatePattern(fullPattern);

    trackMetric('cache.invalidate', count, 'count', { namespace: this.namespace });
    return count;
  }

  /**
   * Invalidate by tags
   */
  public async invalidateTags(tags: string[]): Promise<void> {
    // Clear L1
    this.l1Cache.clear();

    // Invalidate in Redis
    await CacheInvalidator.invalidateTags(tags);

    trackMetric('cache.invalidate.tags', tags.length, 'count', { namespace: this.namespace });
  }

  /**
   * Get cache statistics
   */
  public getStats(): {
    l1: ReturnType<LRUCache<T>['getStats']>;
    l2: ReturnType<typeof RedisClient.getStats>;
  } {
    return {
      l1: this.l1Cache.getStats(),
      l2: RedisClient.getStats(),
    };
  }

  /**
   * Build namespaced cache key
   */
  private buildKey(key: string): string {
    return CacheKeyBuilder.simple('cache', this.namespace, key);
  }
}

// ==========================================
// GLOBAL CACHE INSTANCES
// ==========================================

export const tourCacheManager = new HybridCacheManager('tours', 500, 600); // 10 min
export const hotelCacheManager = new HybridCacheManager('hotels', 500, 600); // 10 min
export const transferCacheManager = new HybridCacheManager('transfers', 300, 600); // 10 min
export const carRentalCacheManager = new HybridCacheManager('car-rentals', 300, 600); // 10 min
export const searchCacheManager = new HybridCacheManager('search', 200, 300); // 5 min
export const userCacheManager = new HybridCacheManager('users', 100, 1800); // 30 min
export const apiCacheManager = new HybridCacheManager('api', 1000, 300); // 5 min

// ==========================================
// CACHE DECORATOR (for functions)
// ==========================================

export type CacheDecoratorOptions = CacheOptions & {
  keyGenerator?: (...args: any[]) => string;
  namespace?: string;
};

/**
 * Decorator for caching function results
 */
export function Cached(options: CacheDecoratorOptions = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const namespace = options.namespace || 'default';
    const cacheManager = new HybridCacheManager(namespace);

    descriptor.value = async function (...args: any[]) {
      // Generate cache key
      const key = options.keyGenerator
        ? options.keyGenerator(...args)
        : `${propertyKey}:${JSON.stringify(args)}`;

      // Use cache-aside pattern
      return cacheManager.getOrCompute(
        key,
        async () => originalMethod.apply(this, args),
        options
      );
    };

    return descriptor;
  };
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Warm up cache with initial data
 */
export async function warmUpCache<T>(
  cacheManager: HybridCacheManager<T>,
  dataLoader: () => Promise<Array<{ key: string; value: T }>>,
  options: CacheOptions = {}
): Promise<number> {
  const data = await dataLoader();

  await Promise.all(
    data.map(({ key, value }) => cacheManager.set(key, value, options))
  );

  return data.length;
}

/**
 * Batch get from cache
 */
export async function batchGet<T>(
  cacheManager: HybridCacheManager<T>,
  keys: string[]
): Promise<Map<string, T>> {
  const results = await Promise.all(
    keys.map(async (key) => {
      const result = await cacheManager.get(key);
      return { key, value: result.value };
    })
  );

  const map = new Map<string, T>();
  results.forEach(({ key, value }) => {
    if (value !== null) map.set(key, value);
  });

  return map;
}

/**
 * Batch set in cache
 */
export async function batchSet<T>(
  cacheManager: HybridCacheManager<T>,
  entries: Array<{ key: string; value: T }>,
  options: CacheOptions = {}
): Promise<void> {
  await Promise.all(
    entries.map(({ key, value }) => cacheManager.set(key, value, options))
  );
}
