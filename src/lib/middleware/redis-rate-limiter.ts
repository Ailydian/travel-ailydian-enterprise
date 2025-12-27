/**
 * Redis-Based Rate Limiting (Production-Grade)
 * Enterprise-grade request throttling with Upstash Redis
 * Security Engineer Agent Implementation
 */

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import type { NextRequest } from 'next/server';
import { captureMessage } from '../monitoring/sentry';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ==========================================
// RATE LIMIT CONFIGURATIONS
// ==========================================

/**
 * Strict rate limiter (auth endpoints)
 * 5 requests per minute
 */
export const strictRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'ratelimit:strict',
});

/**
 * Standard rate limiter (API endpoints)
 * 100 requests per minute
 */
export const standardRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:standard',
});

/**
 * Lenient rate limiter (public pages)
 * 300 requests per minute
 */
export const lenientRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(300, '1 m'),
  analytics: true,
  prefix: 'ratelimit:lenient',
});

/**
 * Search rate limiter (search endpoints)
 * 30 requests per minute
 */
export const searchRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:search',
});

/**
 * AI rate limiter (AI endpoints)
 * 20 requests per minute
 */
export const aiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: 'ratelimit:ai',
});

/**
 * Payment rate limiter (payment endpoints)
 * 3 requests per minute (very strict)
 */
export const paymentRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 m'),
  analytics: true,
  prefix: 'ratelimit:payment',
});

// ==========================================
// MIDDLEWARE FUNCTIONS
// ==========================================

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
};

/**
 * Apply rate limiting to request
 */
export async function applyRateLimit(
  req: NextRequest | Request,
  limiter: Ratelimit = standardRateLimiter
): Promise<RateLimitResult> {
  const identifier = getIdentifier(req);
  const { success, limit, reset, remaining } = await limiter.limit(identifier);

  if (!success) {
    captureMessage(`Rate limit exceeded: ${identifier}`, 'warning');
  }

  return {
    success,
    limit,
    remaining,
    reset,
    retryAfter: success ? undefined : Math.ceil((reset - Date.now()) / 1000),
  };
}

/**
 * Get unique identifier for rate limiting
 */
function getIdentifier(req: NextRequest | Request): string {
  const ip = getIP(req);
  return `ip:${ip}`;
}

/**
 * Extract IP address from request
 */
function getIP(req: NextRequest | Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP;

  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;

  return 'anonymous';
}

/**
 * Check rate limit (throws if exceeded)
 */
export async function checkRateLimit(
  req: NextRequest | Request,
  limiter: Ratelimit = standardRateLimiter
): Promise<void> {
  const result = await applyRateLimit(req, limiter);

  if (!result.success) {
    throw new RateLimitError('Too many requests. Please try again later.', result);
  }
}

export class RateLimitError extends Error {
  constructor(message: string, public result: RateLimitResult) {
    super(message);
    this.name = 'RateLimitError';
  }
}

/**
 * Create rate limit response headers
 */
export function createRateLimitHeaders(result: RateLimitResult): Headers {
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', result.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', result.reset.toString());
  if (result.retryAfter) {
    headers.set('Retry-After', result.retryAfter.toString());
  }
  return headers;
}
