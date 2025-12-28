/**
 * Comprehensive API Rate Limiting Middleware
 *
 * Features:
 * - Multiple rate limiting strategies (global, per-endpoint, per-user)
 * - Upstash Redis integration (production)
 * - In-memory fallback (development)
 * - IP-based tracking
 * - User-based tracking
 * - Customizable limits per endpoint
 * - Rate limit headers (X-RateLimit-*)
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/lib/logger/winston';

// In-memory store for development
class MemoryStore {
  private store = new Map<string, { count: number; resetTime: number }>();

  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || now > record.resetTime) {
      const newRecord = { count: 1, resetTime: now + windowMs };
      this.store.set(key, newRecord);
      return newRecord;
    }

    record.count++;
    this.store.set(key, record);
    return record;
  }

  async reset(key: string): Promise<void> {
    this.store.delete(key);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

// Singleton memory store
const memoryStore = new MemoryStore();

// Cleanup every 5 minutes
setInterval(() => memoryStore.cleanup(), 5 * 60 * 1000);

/**
 * Rate limiter configuration
 */
export interface RateLimitConfig {
  /**
   * Identifier for the rate limiter (used for logging)
   */
  name?: string;

  /**
   * Maximum requests allowed in the time window
   */
  maxRequests: number;

  /**
   * Time window in milliseconds
   */
  windowMs: number;

  /**
   * Custom error message
   */
  message?: string;

  /**
   * Skip rate limiting for authenticated users with certain roles
   */
  skipRoles?: string[];

  /**
   * Use user ID instead of IP for rate limiting
   */
  useUserId?: boolean;

  /**
   * Enable Upstash Redis (production)
   */
  useRedis?: boolean;
}

/**
 * Default configurations for different endpoint types
 */
export const RateLimitPresets = {
  // Strict limits for authentication endpoints
  auth: {
    name: 'auth',
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many authentication attempts. Please try again later.',
  },

  // AI/ML endpoints (expensive operations)
  ai: {
    name: 'ai',
    maxRequests: 20,
    windowMs: 60 * 1000, // 1 minute
    message: 'AI service rate limit exceeded. Please slow down.',
  },

  // Payment endpoints
  payment: {
    name: 'payment',
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
    message: 'Payment rate limit exceeded. Please try again later.',
  },

  // Search/query endpoints
  search: {
    name: 'search',
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
    message: 'Search rate limit exceeded. Please slow down.',
  },

  // Public API endpoints
  public: {
    name: 'public',
    maxRequests: 200,
    windowMs: 60 * 1000, // 1 minute
    message: 'Rate limit exceeded. Please slow down.',
  },

  // Admin endpoints
  admin: {
    name: 'admin',
    maxRequests: 1000,
    windowMs: 60 * 1000, // 1 minute
    message: 'Admin rate limit exceeded.',
  },
} as const;

/**
 * Get client identifier (IP or User ID)
 */
function getClientId(req: NextApiRequest, useUserId: boolean = false): string {
  // Try to get user ID from session/token if useUserId is true
  if (useUserId) {
    // @ts-ignore - session may not exist
    const userId = req.session?.user?.id || req.headers['x-user-id'];
    if (userId) {
      return `user:${userId}`;
    }
  }

  // Fall back to IP address
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const cfConnectingIp = req.headers['cf-connecting-ip'];

  if (typeof forwarded === 'string') {
    return `ip:${forwarded.split(',')[0].trim()}`;
  }
  if (typeof realIp === 'string') {
    return `ip:${realIp}`;
  }
  if (typeof cfConnectingIp === 'string') {
    return `ip:${cfConnectingIp}`;
  }

  return `ip:${req.socket.remoteAddress || 'unknown'}`;
}

/**
 * Create Upstash Redis rate limiter (production)
 */
function createRedisRateLimiter(config: RateLimitConfig) {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    logger.warn('Upstash Redis credentials not found. Using in-memory rate limiter.');
    return null;
  }

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.maxRequests, `${config.windowMs} ms`),
      analytics: true,
      prefix: `ratelimit:${config.name || 'api'}`,
    });
  } catch (error) {
    logger.error('Failed to create Redis rate limiter', error);
    return null;
  }
}

/**
 * Apply rate limiting to an API route
 */
export function withRateLimit(config: RateLimitConfig) {
  const {
    name = 'api',
    maxRequests,
    windowMs,
    message = 'Rate limit exceeded. Please try again later.',
    skipRoles = [],
    useUserId = false,
    useRedis = process.env.NODE_ENV === 'production',
  } = config;

  // Create Redis limiter if configured
  const redisLimiter = useRedis ? createRedisRateLimiter(config) : null;

  return function rateLimitMiddleware(
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
  ) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const startTime = performance.now();

      try {
        // Check if user should skip rate limiting
        // @ts-ignore - session may not exist
        const userRole = req.session?.user?.role;
        if (userRole && skipRoles.includes(userRole)) {
          logger.debug(`Rate limit skipped for role: ${userRole}`, {
            component: 'rate-limit',
            endpoint: req.url,
          });
          return handler(req, res);
        }

        const clientId = getClientId(req, useUserId);
        const key = `${name}:${clientId}`;

        let isRateLimited = false;
        let remaining = maxRequests;
        let resetTime = Date.now() + windowMs;

        // Use Redis limiter if available
        if (redisLimiter) {
          const result = await redisLimiter.limit(clientId);
          isRateLimited = !result.success;
          remaining = result.remaining;
          resetTime = result.reset;

          logger.debug('Redis rate limit check', {
            component: 'rate-limit',
            clientId,
            success: result.success,
            remaining: result.remaining,
          });
        } else {
          // Fall back to in-memory store
          const record = await memoryStore.increment(key, windowMs);
          isRateLimited = record.count > maxRequests;
          remaining = Math.max(0, maxRequests - record.count);
          resetTime = record.resetTime;

          logger.debug('Memory rate limit check', {
            component: 'rate-limit',
            clientId,
            count: record.count,
            limit: maxRequests,
          });
        }

        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', maxRequests.toString());
        res.setHeader('X-RateLimit-Remaining', remaining.toString());
        res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());

        if (isRateLimited) {
          const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
          res.setHeader('Retry-After', retryAfter.toString());

          logger.security('Rate limit exceeded', {
            component: 'rate-limit',
            clientId,
            endpoint: req.url,
            method: req.method,
          });

          return res.status(429).json({
            error: message,
            retryAfter,
            limit: maxRequests,
            remaining: 0,
          });
        }

        // Proceed to handler
        await handler(req, res);

        // Log request duration
        const duration = Math.round(performance.now() - startTime);
        logger.http(`${req.method} ${req.url}`, {
          component: 'rate-limit',
          duration,
          statusCode: res.statusCode,
          remaining,
        });
      } catch (error) {
        logger.error('Rate limit middleware error', error, {
          component: 'rate-limit',
          endpoint: req.url,
        });

        // Continue even if rate limiting fails
        return handler(req, res);
      }
    };
  };
}

/**
 * Preset rate limiters for common use cases
 */
export const rateLimiters = {
  auth: withRateLimit(RateLimitPresets.auth),
  ai: withRateLimit(RateLimitPresets.ai),
  payment: withRateLimit(RateLimitPresets.payment),
  search: withRateLimit(RateLimitPresets.search),
  public: withRateLimit(RateLimitPresets.public),
  admin: withRateLimit(RateLimitPresets.admin),
};

/**
 * Helper to apply multiple middlewares
 */
export function composeMiddleware(
  ...middlewares: Array<(handler: any) => any>
) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

export default withRateLimit;
