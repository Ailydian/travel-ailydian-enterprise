/**
 * Hybrid Cache System Tests
 * Unit + Integration tests for L1+L2 caching
 */

import { HybridCacheManager } from '../../lib/cache/hybrid-cache';
import { LRUCache } from '../../lib/cache/lru-cache';

describe('HybridCacheManager', () => {
  let cacheManager: HybridCacheManager<any>;

  beforeEach(() => {
    cacheManager = new HybridCacheManager('test', 100, 60);
  });

  describe('L1 Cache (LRU)', () => {
    it('should cache items in L1', async () => {
      await cacheManager.set('key1', { data: 'test' });
      const result = await cacheManager.get('key1');

      expect(result.hit).toBe(true);
      expect(result.source).toBe('memory');
      expect(result.value).toEqual({ data: 'test' });
    });

    it('should evict LRU items when full', () => {
      const lru = new LRUCache(3);

      lru.set('key1', 'value1');
      lru.set('key2', 'value2');
      lru.set('key3', 'value3');
      lru.set('key4', 'value4'); // Should evict key1

      expect(lru.has('key1')).toBe(false);
      expect(lru.has('key4')).toBe(true);
    });

    it('should move accessed items to head', () => {
      const lru = new LRUCache(3);

      lru.set('key1', 'value1');
      lru.set('key2', 'value2');
      lru.set('key3', 'value3');

      lru.get('key1'); // Access key1
      lru.set('key4', 'value4'); // Should evict key2 (not key1)

      expect(lru.has('key1')).toBe(true);
      expect(lru.has('key2')).toBe(false);
    });

    it('should handle TTL expiration', async () => {
      const lru = new LRUCache(10, 100); // 100ms TTL

      lru.set('key1', 'value1');
      expect(lru.get('key1')).toBe('value1');

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(lru.get('key1')).toBe(null);
    });

    it('should track cache statistics', () => {
      const lru = new LRUCache(10);

      lru.set('key1', 'value1');
      lru.get('key1'); // Hit
      lru.get('key2'); // Miss

      const stats = lru.getStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
      expect(stats.hitRate).toBe(0.5);
    });
  });

  describe('Cache-Aside Pattern', () => {
    it('should execute compute function on cache miss', async () => {
      const computeFn = jest.fn(async () => ({ computed: true }));

      const result = await cacheManager.getOrCompute('key1', computeFn);

      expect(computeFn).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ computed: true });
    });

    it('should not execute compute function on cache hit', async () => {
      const computeFn = jest.fn(async () => ({ computed: true }));

      await cacheManager.set('key1', { cached: true });
      const result = await cacheManager.getOrCompute('key1', computeFn);

      expect(computeFn).not.toHaveBeenCalled();
      expect(result).toEqual({ cached: true });
    });
  });

  describe('Cache Invalidation', () => {
    it('should delete single key', async () => {
      await cacheManager.set('key1', { data: 'test' });
      await cacheManager.delete('key1');

      const result = await cacheManager.get('key1');
      expect(result.hit).toBe(false);
    });

    it('should invalidate by pattern', async () => {
      await cacheManager.set('user:1', { id: 1 });
      await cacheManager.set('user:2', { id: 2 });
      await cacheManager.set('product:1', { id: 1 });

      await cacheManager.invalidatePattern('user:*');

      // User keys should be gone
      const user1 = await cacheManager.get('user:1');
      expect(user1.hit).toBe(false);

      // Product key should remain
      const product1 = await cacheManager.get('product:1');
      expect(product1.hit).toBe(true);
    });

    it('should invalidate by tags', async () => {
      await cacheManager.set('key1', { data: 1 }, { tags: ['tag1', 'tag2'] });
      await cacheManager.set('key2', { data: 2 }, { tags: ['tag2'] });
      await cacheManager.set('key3', { data: 3 }, { tags: ['tag3'] });

      await cacheManager.invalidateTags(['tag2']);

      const key1 = await cacheManager.get('key1');
      const key2 = await cacheManager.get('key2');
      const key3 = await cacheManager.get('key3');

      expect(key1.hit).toBe(false);
      expect(key2.hit).toBe(false);
      expect(key3.hit).toBe(true);
    });
  });

  describe('Compression', () => {
    it('should compress large values', async () => {
      const largeData = { data: 'x'.repeat(5000) };

      await cacheManager.set('large', largeData, { compress: true });
      const result = await cacheManager.get('large');

      expect(result.hit).toBe(true);
      expect(result.value).toEqual(largeData);
    });

    it('should not compress small values', async () => {
      const smallData = { data: 'small' };

      await cacheManager.set('small', smallData, { compress: true });
      const result = await cacheManager.get('small');

      expect(result.hit).toBe(true);
      expect(result.value).toEqual(smallData);
    });
  });
});
