/**
 * Winston Logger Configuration
 * Production-ready logging system
 */

import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;

  // Add stack trace for errors
  if (stack) {
    msg += `\n${stack}`;
  }

  // Add metadata if present
  if (Object.keys(metadata).length > 0) {
    msg += `\n${JSON.stringify(metadata, null, 2)}`;
  }

  return msg;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(
        colorize(),
        logFormat
      ),
    }),

    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  // Don't exit on uncaught errors
  exitOnError: false,
});

// Production environment: only log to files
if (process.env.NODE_ENV === 'production') {
  logger.transports[0].silent = true; // Silence console in production
}

// Helper functions
export const logInfo = (message: string, meta?: any) => {
  logger.info(message, meta);
};

export const logError = (message: string, error?: Error | any, meta?: any) => {
  logger.error(message, { error: error?.message || error, stack: error?.stack, ...meta });
};

export const logWarn = (message: string, meta?: any) => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any) => {
  logger.debug(message, meta);
};

// API request logger
export const logRequest = (method: string, url: string, userId?: string) => {
  logger.info('API Request', { method, url, userId });
};

// API response logger
export const logResponse = (method: string, url: string, statusCode: number, duration: number) => {
  logger.info('API Response', { method, url, statusCode, duration: `${duration}ms` });
};

// Database query logger
export const logQuery = (query: string, duration: number) => {
  logger.debug('Database Query', { query, duration: `${duration}ms` });
};

// Payment logger
export const logPayment = (action: string, amount: number, currency: string, meta?: any) => {
  logger.info('Payment Action', { action, amount, currency, ...meta });
};

export default logger;
