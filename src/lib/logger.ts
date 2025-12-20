/**
 * Universal Logger Configuration
 * Works in both Node.js and Browser environments
 */

// Type definitions
interface LogMeta {
  [key: string]: any;
}

// Check if we're in browser or Node.js
const isBrowser = typeof window !== 'undefined';

// Simple console logger for browser
const browserLogger = {
  info: (message: string, meta?: LogMeta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, meta || '');
    }
  },
  error: (message: string, meta?: LogMeta) => {
    console.error(`[ERROR] ${message}`, meta || '');
  },
  warn: (message: string, meta?: LogMeta) => {
    console.warn(`[WARN] ${message}`, meta || '');
  },
  debug: (message: string, meta?: LogMeta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, meta || '');
    }
  },
};

// Winston logger for Node.js (lazy loaded)
let winstonLogger: any = null;

const getNodeLogger = () => {
  if (winstonLogger) return winstonLogger;

  try {
    const winston = require('winston');
    const { combine, timestamp, printf, colorize, errors } = winston.format;

    const logFormat = printf(({ level, message, timestamp, stack, ...metadata }: any) => {
      let msg = `${timestamp} [${level}]: ${message}`;
      if (stack) msg += `\n${stack}`;
      if (Object.keys(metadata).length > 0) {
        msg += `\n${JSON.stringify(metadata, null, 2)}`;
      }
      return msg;
    });

    winstonLogger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
      transports: [
        new winston.transports.Console({
          format: combine(colorize(), logFormat),
        }),
      ],
      exitOnError: false,
    });

    return winstonLogger;
  } catch (error) {
    // Fallback to console if winston fails
    return browserLogger;
  }
};

// Universal logger that works in both environments
const logger = isBrowser ? browserLogger : getNodeLogger();

// Helper functions
export const logInfo = (message: string, meta?: any) => {
  try {
    if (isBrowser) {
      browserLogger.info(message, meta);
    } else {
      logger.info(message, meta);
    }
  } catch (error) {
    console.log(message, meta);
  }
};

export const logError = (message: string, error?: Error | any, meta?: any) => {
  try {
    const errorMeta = {
      error: error?.message || error,
      stack: error?.stack,
      ...meta
    };

    if (isBrowser) {
      browserLogger.error(message, errorMeta);
    } else {
      logger.error(message, errorMeta);
    }
  } catch (err) {
    console.error(message, error, meta);
  }
};

export const logWarn = (message: string, meta?: any) => {
  try {
    if (isBrowser) {
      browserLogger.warn(message, meta);
    } else {
      logger.warn(message, meta);
    }
  } catch (error) {
    console.warn(message, meta);
  }
};

export const logDebug = (message: string, meta?: any) => {
  try {
    if (isBrowser) {
      browserLogger.debug(message, meta);
    } else {
      logger.debug(message, meta);
    }
  } catch (error) {
    console.debug(message, meta);
  }
};

// API request logger
export const logRequest = (method: string, url: string, userId?: string) => {
  logInfo('API Request', { method, url, userId });
};

// API response logger
export const logResponse = (method: string, url: string, statusCode: number, duration: number) => {
  logInfo('API Response', { method, url, statusCode, duration: `${duration}ms` });
};

// Database query logger
export const logQuery = (query: string, duration: number) => {
  logDebug('Database Query', { query, duration: `${duration}ms` });
};

// Payment logger
export const logPayment = (action: string, amount: number, currency: string, meta?: any) => {
  logInfo('Payment Action', { action, amount, currency, ...meta });
};

export default logger;
