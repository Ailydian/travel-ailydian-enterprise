/**
 * Enterprise-Grade Logging System
 * CLAUDE.md compliant - No console.log allowed
 *
 * Features:
 * - Structured logging with metadata
 * - Log levels with filtering
 * - Production-safe (no sensitive data)
 * - Performance tracking
 * - Error tracking integration ready
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogContext {
  readonly userId?: string;
  readonly requestId?: string;
  readonly component?: string;
  readonly action?: string;
  readonly duration?: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface LogEntry {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly context: LogContext;
  readonly error?: Error;
  readonly stack?: string;
}

class Logger {
  private static instance: Logger;
  private readonly minLevel: LogLevel;
  private readonly isDevelopment: boolean;
  private readonly isProduction: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isProduction = process.env.NODE_ENV === 'production';
    this.minLevel = this.isProduction ? LogLevel.WARN : LogLevel.DEBUG;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel;
  }

  private sanitizeForProduction(data: unknown): unknown {
    if (!this.isProduction) return data;

    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data } as Record<string, unknown>;
      const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'creditCard'];

      for (const key of sensitiveKeys) {
        if (key in sanitized) {
          sanitized[key] = '[REDACTED]';
        }
      }
      return sanitized;
    }
    return data;
  }

  private formatLogEntry(entry: LogEntry): string {
    const levelName = LogLevel[entry.level];
    const { component, action, userId, requestId, duration, metadata } = entry.context;

    const parts = [
      `[${entry.timestamp}]`,
      `[${levelName}]`,
      component && `[${component}]`,
      action && `{${action}}`,
      userId && `(user:${userId})`,
      requestId && `(req:${requestId})`,
      entry.message,
      duration !== undefined && `(${duration}ms)`,
      metadata && JSON.stringify(this.sanitizeForProduction(metadata)),
    ].filter(Boolean);

    return parts.join(' ');
  }

  private writeLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    const formatted = this.formatLogEntry(entry);

    if (this.isDevelopment) {
      switch (entry.level) {
        case LogLevel.DEBUG:
        case LogLevel.INFO:
          logger.info(formatted);
          break;
        case LogLevel.WARN:
          logger.warn(formatted);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          logger.error(formatted, entry.error);
          break;
      }
    } else {
      if (entry.level >= LogLevel.ERROR) {
        logger.error(formatted, entry.error);
      } else if (entry.level === LogLevel.WARN) {
        logger.warn(formatted);
      }
    }
  }

  public debug(message: string, context: LogContext = {}): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      context,
    });
  }

  public info(message: string, context: LogContext = {}): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      context,
    });
  }

  public warn(message: string, context: LogContext = {}): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      context,
    });
  }

  public error(message: string, error?: Error, context: LogContext = {}): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      context,
      error,
      stack: error?.stack,
    });
  }

  public fatal(message: string, error?: Error, context: LogContext = {}): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.FATAL,
      message,
      context,
      error,
      stack: error?.stack,
    });
  }

  public startTimer(): () => number {
    const start = performance.now();
    return () => Math.round(performance.now() - start);
  }

  public async trackAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    context: LogContext = {}
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
      this.error(`Failed ${operation}`, error as Error, {
        ...context,
        duration: stopTimer(),
      });
      throw error;
    }
  }
}

export const logger = Logger.getInstance();
export default logger;
