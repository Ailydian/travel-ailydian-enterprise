/**
 * L1 In-Memory LRU Cache (Production-Grade)
 * High-performance local cache with TTL support
 * Backend Architect Agent Implementation
 */

import { captureMessage } from '../monitoring/sentry';

// ==========================================
// LRU CACHE NODE
// ==========================================

class LRUNode<T> {
  constructor(
    public key: string,
    public value: T,
    public expiresAt: number,
    public prev: LRUNode<T> | null = null,
    public next: LRUNode<T> | null = null
  ) {}
}

// ==========================================
// LRU CACHE IMPLEMENTATION
// ==========================================

export class LRUCache<T = any> {
  private cache: Map<string, LRUNode<T>> = new Map();
  private head: LRUNode<T> | null = null;
  private tail: LRUNode<T> | null = null;
  private size: number = 0;
  private hits: number = 0;
  private misses: number = 0;

  constructor(
    private readonly maxSize: number = 1000,
    private readonly defaultTTL: number = 300000 // 5 minutes
  ) {
    // Start cleanup interval
    this.startCleanupInterval();
  }

  /**
   * Get value from cache
   */
  public get(key: string): T | null {
    const node = this.cache.get(key);

    if (!node) {
      this.misses++;
      return null;
    }

    // Check expiration
    if (Date.now() > node.expiresAt) {
      this.delete(key);
      this.misses++;
      return null;
    }

    // Move to head (most recently used)
    this.moveToHead(node);
    this.hits++;
    return node.value;
  }

  /**
   * Set value in cache
   */
  public set(key: string, value: T, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);

    // Update existing node
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      node.expiresAt = expiresAt;
      this.moveToHead(node);
      return;
    }

    // Create new node
    const newNode = new LRUNode(key, value, expiresAt);
    this.cache.set(key, newNode);

    // Add to head
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;

    // Evict if over capacity
    if (this.size > this.maxSize) {
      this.evictTail();
    }
  }

  /**
   * Delete key from cache
   */
  public delete(key: string): boolean {
    const node = this.cache.get(key);
    if (!node) return false;

    this.removeNode(node);
    this.cache.delete(key);
    this.size--;
    return true;
  }

  /**
   * Clear entire cache
   */
  public clear(): void {
    this.cache.clear();
    this.head = this.tail = null;
    this.size = 0;
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Check if key exists (without updating LRU)
   */
  public has(key: string): boolean {
    const node = this.cache.get(key);
    if (!node) return false;

    // Check expiration
    if (Date.now() > node.expiresAt) {
      this.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Get cache statistics
   */
  public getStats(): {
    size: number;
    maxSize: number;
    hits: number;
    misses: number;
    hitRate: number;
  } {
    const total = this.hits + this.misses;
    return {
      size: this.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }

  /**
   * Move node to head (most recently used)
   */
  private moveToHead(node: LRUNode<T>): void {
    if (node === this.head) return;

    // Remove from current position
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    // Update tail if needed
    if (node === this.tail) {
      this.tail = node.prev;
    }

    // Move to head
    node.prev = null;
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;

    // Update tail if needed
    if (!this.tail) this.tail = node;
  }

  /**
   * Remove node from list
   */
  private removeNode(node: LRUNode<T>): void {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;
  }

  /**
   * Evict least recently used item
   */
  private evictTail(): void {
    if (!this.tail) return;

    this.cache.delete(this.tail.key);
    this.removeNode(this.tail);
    this.size--;
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, node] of this.cache.entries()) {
      if (now > node.expiresAt) {
        keysToDelete.push(key);
      }
    }

    if (keysToDelete.length > 0) {
      keysToDelete.forEach((key) => this.delete(key));
      captureMessage(`LRU cache cleanup: removed ${keysToDelete.length} expired entries`, 'info');
    }
  }

  /**
   * Start periodic cleanup
   */
  private startCleanupInterval(): void {
    // Run cleanup every 5 minutes
    setInterval(() => this.cleanup(), 300000);
  }
}

// ==========================================
// GLOBAL LRU CACHE INSTANCES
// ==========================================

export const globalLRUCache = new LRUCache<any>(1000, 300000); // 1000 items, 5 min TTL
export const tourCache = new LRUCache<any>(500, 600000); // 500 items, 10 min TTL
export const hotelCache = new LRUCache<any>(500, 600000); // 500 items, 10 min TTL
export const userCache = new LRUCache<any>(200, 1800000); // 200 items, 30 min TTL
