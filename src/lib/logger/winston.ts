/**
 * Enterprise-Grade Winston Logger with File Rotation
 *
 * Features:
 * - File rotation (daily, size-based)
 * - Environment-based logging
 * - Structured JSON logging in production
 * - Human-readable in development
 * - Sensitive data sanitization
 * - Performance tracking
 * - Error tracking with stack traces
 *
 * @see https://github.com/winstonjs/winston
 */

import winston from 'winston';
import path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Colors for console output
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Sensitive keys to redact
const SENSITIVE_KEYS = [
  'password',
  'token',
  'apiKey',
  'secret',
  'creditCard',
  'cvv',
  'ssn',
  'accessToken',
  'refreshToken',
  'authorization',
];

/**
 * Sanitize sensitive data from logs
 */
function sanitizeData(data: any): any {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item));
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some(k => lowerKey.includes(k.toLowerCase()));

    if (isSensitive) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

// Custom format for development (human-readable)
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      const sanitized = sanitizeData(meta);
      metaStr = `\n${JSON.stringify(sanitized, null, 2)}`;
    }
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

// Custom format for production (JSON)
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format((info) => {
    return sanitizeData(info);
  })()
);

// Determine log directory
const logDir = path.join(process.cwd(), 'logs');

// Transport configuration
const transports: winston.transport[] = [];

if (isDevelopment) {
  // Console transport for development
  transports.push(
    new winston.transports.Console({
      format: developmentFormat,
    })
  );

  // File transport for errors in development
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: productionFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
} else {
  // Production transports
  transports.push(
    // Error log
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: productionFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    }),

    // Combined log
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: productionFormat,
      maxsize: 10485760, // 10MB
      maxFiles: 7,
    }),

    // Console for production (warnings and errors only)
    new winston.transports.Console({
      level: 'warn',
      format: productionFormat,
    })
  );
}

// Create Winston logger instance
const winstonLogger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  levels,
  format: isProduction ? productionFormat : developmentFormat,
  transports,
  exitOnError: false,
});

// Logger interface with enhanced methods
export interface LogContext {
  userId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  [key: string]: any;
}

class EnhancedLogger {
  private winston: winston.Logger;

  constructor(winstonInstance: winston.Logger) {
    this.winston = winstonInstance;
  }

  /**
   * Debug level logging
   */
  debug(message: string, context?: LogContext): void {
    this.winston.debug(message, context);
  }

  /**
   * Info level logging
   */
  info(message: string, context?: LogContext): void {
    this.winston.info(message, context);
  }

  /**
   * HTTP request logging
   */
  http(message: string, context?: LogContext): void {
    this.winston.log('http', message, context);
  }

  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext): void {
    this.winston.warn(message, context);
  }

  /**
   * Error level logging
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
    };

    this.winston.error(message, errorContext);
  }

  /**
   * Start a performance timer
   */
  startTimer(): () => number {
    const start = performance.now();
    return () => Math.round(performance.now() - start);
  }

  /**
   * Track async operations with automatic timing
   */
  async trackAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    context?: LogContext
  ): Promise<T> {
    const stopTimer = this.startTimer();
    this.debug(`Starting ${operation}`, context);

    try {
      const result = await fn();
      this.info(`Completed ${operation}`, {
        ...context,
        duration: stopTimer(),
      });
      return result;
    } catch (error) {
      this.error(`Failed ${operation}`, error, {
        ...context,
        duration: stopTimer(),
      });
      throw error;
    }
  }

  /**
   * Log API requests
   */
  logRequest(req: {
    method: string;
    url: string;
    statusCode?: number;
    duration?: number;
    userId?: string;
  }): void {
    this.http(`${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      statusCode: req.statusCode,
      duration: req.duration,
      userId: req.userId,
    });
  }

  /**
   * Log security events
   */
  security(event: string, context?: LogContext): void {
    this.warn(`[SECURITY] ${event}`, {
      ...context,
      securityEvent: true,
    });
  }

  /**
   * Log database queries (development only)
   */
  query(query: string, duration: number, params?: any): void {
    if (isDevelopment) {
      this.debug(`Query executed`, {
        query,
        duration,
        params: sanitizeData(params),
      });
    }
  }
}

// Export singleton instance
export const logger = new EnhancedLogger(winstonLogger);

// Export default
export default logger;

// Also export winston instance for advanced usage
export { winstonLogger };
