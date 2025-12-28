/**
 * Input Sanitization & XSS Protection
 *
 * Provides comprehensive input validation and sanitization
 * to prevent XSS, SQL injection, and other injection attacks
 */

import { logger } from '@/lib/logger/winston';

/**
 * HTML Entity encoding map
 */
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';

  return input.replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Sanitize input for database queries (prevent SQL injection)
 */
export function sanitizeSql(input: string): string {
  if (!input) return '';

  // Remove dangerous SQL characters and keywords
  return input
    .replace(/['";\\]/g, '') // Remove quotes and semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multi-line comment start
    .replace(/\*\//g, '') // Remove multi-line comment end
    .trim();
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';

  // Basic email sanitization
  const sanitized = email.toLowerCase().trim();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    logger.warn('Invalid email format detected', { email: sanitizeHtml(email) });
    return '';
  }

  return sanitized;
}

/**
 * Sanitize URL to prevent javascript: and data: schemes
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const sanitized = url.trim();

  // Block dangerous URL schemes
  const dangerousSchemes = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'about:',
  ];

  const lowerUrl = sanitized.toLowerCase();
  for (const scheme of dangerousSchemes) {
    if (lowerUrl.startsWith(scheme)) {
      logger.security('Dangerous URL scheme blocked', {
        url: sanitizeHtml(url),
        scheme,
      });
      return '';
    }
  }

  // Only allow http, https, mailto
  if (!/^(https?:\/\/|mailto:)/i.test(sanitized)) {
    logger.warn('Invalid URL scheme', { url: sanitizeHtml(url) });
    return '';
  }

  return sanitized;
}

/**
 * Sanitize phone number
 */
export function sanitizePhoneNumber(phone: string): string {
  if (!phone) return '';

  // Remove all non-numeric characters except +
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Sanitize filename to prevent directory traversal
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return '';

  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '');

  // Remove path separators
  sanitized = sanitized.replace(/[\/\\]/g, '');

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Limit to alphanumeric, dash, underscore, and dot
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Ensure it doesn't start with a dot
  if (sanitized.startsWith('.')) {
    sanitized = sanitized.substring(1);
  }

  return sanitized;
}

/**
 * Sanitize JSON input
 */
export function sanitizeJson(input: string): string {
  if (!input) return '';

  try {
    // Parse and re-stringify to ensure valid JSON
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch (error) {
    logger.warn('Invalid JSON input', { error });
    return '';
  }
}

/**
 * Strip all HTML tags from input
 */
export function stripHtmlTags(input: string): string {
  if (!input) return '';

  return input.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize user input for display
 */
export function sanitizeUserInput(input: string): string {
  if (!input) return '';

  // First strip HTML tags
  let sanitized = stripHtmlTags(input);

  // Then encode HTML entities
  sanitized = sanitizeHtml(sanitized);

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Validate and sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  options: {
    allowHtml?: boolean;
    maxDepth?: number;
  } = {}
): T {
  const { allowHtml = false, maxDepth = 10 } = options;

  function sanitizeValue(value: any, depth: number): any {
    // Prevent infinite recursion
    if (depth > maxDepth) {
      logger.warn('Maximum sanitization depth exceeded');
      return null;
    }

    // Handle null/undefined
    if (value === null || value === undefined) {
      return value;
    }

    // Handle strings
    if (typeof value === 'string') {
      return allowHtml ? value : sanitizeUserInput(value);
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.map((item) => sanitizeValue(item, depth + 1));
    }

    // Handle objects
    if (typeof value === 'object') {
      const sanitized: any = {};
      for (const [key, val] of Object.entries(value)) {
        // Sanitize the key as well
        const sanitizedKey = sanitizeUserInput(key);
        sanitized[sanitizedKey] = sanitizeValue(val, depth + 1);
      }
      return sanitized;
    }

    // Return other types as-is (numbers, booleans, etc.)
    return value;
  }

  return sanitizeValue(obj, 0);
}

/**
 * Check if input contains potential XSS payload
 */
export function containsXss(input: string): boolean {
  if (!input) return false;

  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /onclick=/i,
    /onmouseover=/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
    /eval\(/i,
    /expression\(/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      logger.security('Potential XSS detected', {
        input: input.substring(0, 100),
        pattern: pattern.source,
      });
      return true;
    }
  }

  return false;
}

/**
 * Check if input contains SQL injection attempt
 */
export function containsSqlInjection(input: string): boolean {
  if (!input) return false;

  const sqlPatterns = [
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bSELECT\b.*\bFROM\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(--|\#|\/\*)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
    /(';|";|\bxp_|\bsp_)/i,
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(input)) {
      logger.security('Potential SQL injection detected', {
        input: input.substring(0, 100),
        pattern: pattern.source,
      });
      return true;
    }
  }

  return false;
}

/**
 * Comprehensive input validation and sanitization
 */
export function validateAndSanitize(
  input: string,
  options: {
    type?: 'text' | 'email' | 'url' | 'phone' | 'filename' | 'sql';
    maxLength?: number;
    allowHtml?: boolean;
    checkXss?: boolean;
    checkSql?: boolean;
  } = {}
): { valid: boolean; sanitized: string; errors: string[] } {
  const {
    type = 'text',
    maxLength,
    allowHtml = false,
    checkXss = true,
    checkSql = true,
  } = options;

  const errors: string[] = [];

  // Check length
  if (maxLength && input.length > maxLength) {
    errors.push(`Input exceeds maximum length of ${maxLength}`);
    return { valid: false, sanitized: '', errors };
  }

  // Check for XSS
  if (checkXss && containsXss(input)) {
    errors.push('Potential XSS attack detected');
    return { valid: false, sanitized: '', errors };
  }

  // Check for SQL injection
  if (checkSql && containsSqlInjection(input)) {
    errors.push('Potential SQL injection detected');
    return { valid: false, sanitized: '', errors };
  }

  // Sanitize based on type
  let sanitized: string;
  switch (type) {
    case 'email':
      sanitized = sanitizeEmail(input);
      break;
    case 'url':
      sanitized = sanitizeUrl(input);
      break;
    case 'phone':
      sanitized = sanitizePhoneNumber(input);
      break;
    case 'filename':
      sanitized = sanitizeFilename(input);
      break;
    case 'sql':
      sanitized = sanitizeSql(input);
      break;
    default:
      sanitized = allowHtml ? input : sanitizeUserInput(input);
  }

  if (!sanitized && input) {
    errors.push('Input failed sanitization');
    return { valid: false, sanitized: '', errors };
  }

  return { valid: true, sanitized, errors: [] };
}

/**
 * Middleware helper for sanitizing request body
 */
export function sanitizeRequestBody<T extends Record<string, any>>(
  body: T,
  allowedFields?: string[]
): T {
  let sanitized = sanitizeObject(body);

  // Filter to allowed fields if specified
  if (allowedFields) {
    const filtered: any = {};
    for (const field of allowedFields) {
      if (field in sanitized) {
        filtered[field] = sanitized[field];
      }
    }
    sanitized = filtered;
  }

  return sanitized;
}

export default {
  sanitizeHtml,
  sanitizeSql,
  sanitizeEmail,
  sanitizeUrl,
  sanitizePhoneNumber,
  sanitizeFilename,
  sanitizeJson,
  stripHtmlTags,
  sanitizeUserInput,
  sanitizeObject,
  containsXss,
  containsSqlInjection,
  validateAndSanitize,
  sanitizeRequestBody,
};
