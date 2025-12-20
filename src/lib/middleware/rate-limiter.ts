/**
 * Rate Limiter Middleware
 * Implements sliding window rate limiting for API endpoints
 * Primarily protects Groq API endpoints from abuse
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory store for rate limiting (production'da Redis kullanın)
interface RateLimitRecord {
  count: number;
  resetTime: number;
  requests: number[]; // Timestamps of requests for sliding window
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Rate limit yapılandırması
export interface RateLimitConfig {
  windowMs: number; // Zaman penceresi (milisaniye)
  maxRequests: number; // Maksimum istek sayısı
  message?: string; // Hata mesajı
  skipSuccessfulRequests?: boolean; // Başarılı istekleri sayma
  skipFailedRequests?: boolean; // Başarısız istekleri sayma
}

// Varsayılan yapılandırma - Groq API limitlerine uygun
const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 60 saniye (1 dakika)
  maxRequests: 100, // Dakikada 100 istek
  message: 'Çok fazla istek gönderildi. Lütfen bir süre bekleyin.',
};

/**
 * Get client IP address
 */
function getClientIp(req: NextApiRequest): string {
  // Try to get real IP from various headers (proxy, cloudflare, etc.)
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const cfConnectingIp = req.headers['cf-connecting-ip'];

  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (typeof realIp === 'string') {
    return realIp;
  }
  if (typeof cfConnectingIp === 'string') {
    return cfConnectingIp;
  }

  return req.socket.remoteAddress || 'unknown';
}

/**
 * Clean up old entries from rate limit store
 */
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Sliding window rate limiter
 */
export function rateLimiter(config: Partial<RateLimitConfig> = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  return async function rateLimitMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next?: () => void | Promise<void>
  ): Promise<boolean> {
    const clientIp = getClientIp(req);
    const key = `rate_limit:${clientIp}`;
    const now = Date.now();

    // Temizlik işlemi (her 100 istekte bir)
    if (Math.random() < 0.01) {
      cleanupOldEntries();
    }

    // Mevcut kaydı al veya yeni oluştur
    let record = rateLimitStore.get(key);

    if (!record) {
      record = {
        count: 0,
        resetTime: now + finalConfig.windowMs,
        requests: [],
      };
      rateLimitStore.set(key, record);
    }

    // Sliding window: Zaman penceresi içindeki istekleri filtrele
    const windowStart = now - finalConfig.windowMs;
    record.requests = record.requests.filter(timestamp => timestamp > windowStart);

    // Yeni isteği ekle
    record.requests.push(now);
    record.count = record.requests.length;

    // Rate limit aşıldı mı kontrol et
    const isRateLimited = record.count > finalConfig.maxRequests;

    // Rate limit header'larını ayarla
    const remaining = Math.max(0, finalConfig.maxRequests - record.count);
    const resetTime = Math.ceil((windowStart + finalConfig.windowMs) / 1000);

    res.setHeader('X-RateLimit-Limit', finalConfig.maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', resetTime.toString());

    if (isRateLimited) {
      // Rate limit aşıldığında Retry-After header'ı ekle
      const retryAfter = Math.ceil((record.requests[0] + finalConfig.windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter.toString());

      res.status(429).json({
        error: finalConfig.message,
        retryAfter,
        limit: finalConfig.maxRequests,
        windowMs: finalConfig.windowMs,
      });

      return false;
    }

    // Rate limit aşılmadı, devam et
    if (next) {
      await next();
    }

    return true;
  };
}

/**
 * NeuralX API için özel rate limiter
 * Enterprise AI service limitleri: 100 requests/minute
 */
export const groqRateLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 dakika
  maxRequests: 100, // Dakikada 100 istek
  message: 'AI servisi rate limit aşıldı. Lütfen 1 dakika sonra tekrar deneyin.',
});

// Alias for backwards compatibility
export const neuralxRateLimiter = groqRateLimiter;

/**
 * Daha katı rate limiter (auth endpoints için)
 */
export const strictRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 dakika
  maxRequests: 5, // 15 dakikada 5 istek
  message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
});

/**
 * Daha gevşek rate limiter (public endpoints için)
 */
export const publicRateLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 dakika
  maxRequests: 200, // Dakikada 200 istek
  message: 'Çok fazla istek. Lütfen yavaşlayın.',
});

/**
 * Rate limiter wrapper for API routes
 */
export function withRateLimit(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  limiter = groqRateLimiter
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const canProceed = await limiter(req, res);

    if (!canProceed) {
      return; // Rate limit aşıldı, response zaten gönderildi
    }

    // Rate limit OK, handler'ı çalıştır
    return handler(req, res);
  };
}

export default rateLimiter;
