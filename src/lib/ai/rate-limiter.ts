/**
 * AI Rate Limiter
 * Prevents abuse and manages API quota
 */

import { LRUCache } from 'lru-cache';
import logger from '../logger';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class AIRateLimiter {
  private cache: LRUCache<string, RateLimitEntry>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      message: 'Too many requests. Please try again later.',
      ...config,
    };

    this.cache = new LRUCache<string, RateLimitEntry>({
      max: 10000,
      ttl: config.windowMs,
    });
  }

  /**
   * Check if request is allowed
   */
  async checkLimit(identifier: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetAt: number;
  }> {
    const now = Date.now();
    const entry = this.cache.get(identifier);

    if (!entry || entry.resetAt < now) {
      // New window
      const newEntry: RateLimitEntry = {
        count: 1,
        resetAt: now + this.config.windowMs,
      };

      this.cache.set(identifier, newEntry);

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetAt: newEntry.resetAt,
      };
    }

    // Existing window
    if (entry.count >= this.config.maxRequests) {
      logger.warn('Rate limit exceeded', {
        identifier,
        count: entry.count,
        limit: this.config.maxRequests,
      });

      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
      };
    }

    // Increment count
    entry.count++;
    this.cache.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetAt: entry.resetAt,
    };
  }

  /**
   * Reset limit for identifier
   */
  reset(identifier: string): void {
    this.cache.delete(identifier);
  }

  /**
   * Get current usage
   */
  getUsage(identifier: string): {
    count: number;
    limit: number;
    remaining: number;
  } {
    const entry = this.cache.get(identifier);

    if (!entry || entry.resetAt < Date.now()) {
      return {
        count: 0,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
      };
    }

    return {
      count: entry.count,
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - entry.count),
    };
  }
}

// Pre-configured limiters
export const aiChatLimiter = new AIRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute per user
  message: 'Too many chat requests. Please wait a moment.',
});

export const aiStreamLimiter = new AIRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10, // 10 streaming requests per minute
  message: 'Too many streaming requests. Please wait.',
});

export const aiRecommendationsLimiter = new AIRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 30, // 30 recommendations per minute
  message: 'Too many recommendation requests.',
});

/**
 * Get rate limiter for specific operation
 */
export function getRateLimiter(operation: 'chat' | 'stream' | 'recommendations'): AIRateLimiter {
  switch (operation) {
    case 'chat':
      return aiChatLimiter;
    case 'stream':
      return aiStreamLimiter;
    case 'recommendations':
      return aiRecommendationsLimiter;
    default:
      return aiChatLimiter;
  }
}
