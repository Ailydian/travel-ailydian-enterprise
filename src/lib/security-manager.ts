import { NextRequest, NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';
import crypto from 'crypto';
import logger from './logger';

// Rate limiting configuration
import { logger } from '../lib/logger/winston';
const rateLimitConfig = {
  api: { windowMs: 15 * 60 * 1000, max: 100 }, // 15 dakikada 100 request
  search: { windowMs: 60 * 1000, max: 30 }, // 1 dakikada 30 arama
  auth: { windowMs: 15 * 60 * 1000, max: 5 }, // 15 dakikada 5 auth denemesi
  upload: { windowMs: 60 * 60 * 1000, max: 10 }, // 1 saatte 10 upload
};

// Rate limiting cache
const rateLimitCache = new LRUCache<string, number>({
  max: 10000,
  ttl: 15 * 60 * 1000, // 15 dakika
});

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'on',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), gyroscope=(), magnetometer=(), payment=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.lydian.com *.vercel.app *.google.com *.googleapis.com",
    "style-src 'self' 'unsafe-inline' *.google.com *.googleapis.com",
    "img-src 'self' data: blob: https: *.lydian.com *.unsplash.com *.googleapis.com",
    "font-src 'self' *.google.com *.googleapis.com *.gstatic.com",
    "connect-src 'self' *.lydian.com *.vercel.app *.google.com *.googleapis.com wss:",
    "media-src 'self' *.lydian.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
};

export class SecurityManager {
  // IP tabanlı rate limiting
  static checkRateLimit(
    identifier: string, 
    type: keyof typeof rateLimitConfig = 'api'
  ): { allowed: boolean; resetTime?: number } {
    const config = rateLimitConfig[type];
    const key = `${type}:${identifier}`;
    const current = rateLimitCache.get(key) || 0;
    
    if (current >= config.max) {
      return { 
        allowed: false, 
        resetTime: Date.now() + config.windowMs 
      };
    }
    
    rateLimitCache.set(key, current + 1, { ttl: config.windowMs });
    return { allowed: true };
  }

  // IP adresi alma (proxy-aware)
  static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const real = request.headers.get('x-real-ip');
    const cfConnecting = request.headers.get('cf-connecting-ip');
    
    if (cfConnecting) return cfConnecting;
    if (forwarded) return forwarded.split(',')[0].trim();
    if (real) return real;
    
    return 'unknown';
  }

  // Request fingerprinting
  static generateRequestFingerprint(request: NextRequest): string {
    const data = [
      request.headers.get('user-agent') || '',
      request.headers.get('accept-language') || '',
      request.headers.get('accept-encoding') || '',
      this.getClientIP(request),
    ].join('|');
    
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
  }

  // Suspicious activity detection
  static detectSuspiciousActivity(request: NextRequest): {
    suspicious: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    
    // Bot detection patterns
    const botPatterns = [
      /bot/i, /crawler/i, /spider/i, /scraper/i,
      /curl/i, /wget/i, /python/i, /php/i,
      /scanner/i, /exploit/i, /hack/i
    ];
    
    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      reasons.push('Suspicious user agent');
    }
    
    // Suspicious referer patterns
    if (referer && !referer.includes('lydian.com') && !referer.includes('google.com')) {
      const suspiciousReferers = [
        'baidu.com', 'yandex.com', '.tk', '.ml', '.ga'
      ];
      
      if (suspiciousReferers.some(domain => referer.includes(domain))) {
        reasons.push('Suspicious referer');
      }
    }
    
    // Missing common headers
    if (!request.headers.get('accept-language')) {
      reasons.push('Missing accept-language header');
    }
    
    return {
      suspicious: reasons.length > 0,
      reasons
    };
  }

  // SQL Injection detection
  static detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\bunion\b.*\bselect\b)|(\bselect\b.*\bunion\b)/i,
      /\b(select|insert|update|delete|drop|create|alter|exec|execute)\b.*\b(from|into|set|where)\b/i,
      /(;\s*drop\b)|(\bdrop\s+table\b)|(\btruncate\b)/i,
      /(\b1=1\b)|(\b1\s*=\s*1\b)|('.*'.*=.*'.*')/i,
      /(\bor\b\s+\b1\b)|(\band\b\s+\b1\b)/i,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  }

  // XSS detection
  static detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /eval\s*\(/i,
      /document\.cookie/i,
      /window\.location/i,
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }

  // Input sanitization
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>\"']/g, '') // Remove dangerous characters
      .trim()
      .substring(0, 1000); // Limit length
  }

  // Generate CSRF token
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Validate CSRF token
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(sessionToken, 'hex')
    );
  }
}

// Error monitoring class
export class ErrorMonitor {
  private static errors: Array<{
    id: string;
    timestamp: number;
    error: any;
    context: any;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }> = [];

  static logError(
    error: Error | any,
    context: any = {},
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): string {
    const errorId = crypto.randomUUID();
    const errorEntry = {
      id: errorId,
      timestamp: Date.now(),
      error: {
        message: error.message || error,
        stack: error.stack,
        name: error.name,
      },
      context: {
        ...context,
        userAgent: context.request?.headers?.['user-agent'],
        ip: context.ip,
        url: context.url,
      },
      severity,
    };

    this.errors.push(errorEntry);

    // Keep only last 1000 errors
    if (this.errors.length > 1000) {
      this.errors = this.errors.slice(-1000);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.error(`[${severity.toUpperCase()}] ${errorId}:`, error, context);
    }

    // In production, you would send to external monitoring service
    if (process.env.NODE_ENV === 'production' && severity === 'critical') {
      // Send to Sentry, DataDog, etc.
      this.sendToCriticalAlert(errorEntry);
    }

    return errorId;
  }

  private static async sendToCriticalAlert(errorEntry: any): Promise<void> {
    try {
      // Example: Send to Slack webhook
      if (process.env.SLACK_WEBHOOK_URL) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚨 CRITICAL ERROR in Travel.LyDian`,
            attachments: [{
              color: 'danger',
              fields: [
                { title: 'Error ID', value: errorEntry.id, short: true },
                { title: 'Message', value: errorEntry.error.message, short: false },
                { title: 'URL', value: errorEntry.context.url, short: true },
                { title: 'IP', value: errorEntry.context.ip, short: true },
              ]
            }]
          })
        });
      }
    } catch (alertError) {
      logger.error('Failed to send critical alert:', alertError as Error, { component: 'SecurityManager' });
    }
  }

  static getErrors(severity?: string, limit: number = 50): any[] {
    let filtered = severity 
      ? this.errors.filter(e => e.severity === severity)
      : this.errors;
    
    return filtered
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  static getErrorStats(): {
    total: number;
    bySeverity: Record<string, number>;
    last24Hours: number;
  } {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const last24Hours = this.errors.filter(e => e.timestamp > oneDayAgo).length;
    
    const bySeverity = this.errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.errors.length,
      bySeverity,
      last24Hours,
    };
  }
}

export default SecurityManager;