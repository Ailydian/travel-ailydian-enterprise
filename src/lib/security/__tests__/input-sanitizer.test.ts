/**
 * Comprehensive Security Test Suite for Input Sanitizer
 * Coverage: XSS prevention, SQL injection, URL validation, data sanitization
 */

import {
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
} from '../input-sanitizer';

describe('Security - Input Sanitizer', () => {
  describe('sanitizeHtml', () => {
    it('should encode HTML special characters', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeHtml(input);

      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('&lt;/script&gt;');
    });

    it('should encode all dangerous HTML entities', () => {
      const dangerous = '& < > " \' /';
      const result = sanitizeHtml(dangerous);

      expect(result).toBe('&amp; &lt; &gt; &quot; &#x27; &#x2F;');
    });

    it('should handle empty string', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('should preserve safe text', () => {
      const safe = 'Hello World 123';
      expect(sanitizeHtml(safe)).toBe(safe);
    });

    it('should encode nested HTML', () => {
      const nested = '<div><span onclick="hack()">Click</span></div>';
      const result = sanitizeHtml(nested);

      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });
  });

  describe('sanitizeSql', () => {
    it('should remove SQL injection characters', () => {
      const input = "'; DROP TABLE users; --";
      const result = sanitizeSql(input);

      expect(result).not.toContain("'");
      expect(result).not.toContain(';');
      expect(result).not.toContain('--');
    });

    it('should remove multi-line SQL comments', () => {
      const input = '/* comment */ SELECT * FROM users';
      const result = sanitizeSql(input);

      expect(result).not.toContain('/*');
      expect(result).not.toContain('*/');
    });

    it('should remove backslashes', () => {
      const input = 'test\\\\nvalue';
      const result = sanitizeSql(input);

      expect(result).not.toContain('\\');
    });

    it('should trim whitespace', () => {
      const input = '  test value  ';
      const result = sanitizeSql(input);

      expect(result).toBe('test value');
    });

    it('should handle empty string', () => {
      expect(sanitizeSql('')).toBe('');
    });
  });

  describe('sanitizeEmail', () => {
    it('should accept valid email addresses', () => {
      const valid = 'user@example.com';
      const result = sanitizeEmail(valid);

      expect(result).toBe(valid);
    });

    it('should convert email to lowercase', () => {
      const input = 'User@Example.COM';
      const result = sanitizeEmail(input);

      expect(result).toBe('user@example.com');
    });

    it('should trim whitespace from email', () => {
      const input = '  user@example.com  ';
      const result = sanitizeEmail(input);

      expect(result).toBe('user@example.com');
    });

    it('should reject invalid email format', () => {
      const invalid = 'not-an-email';
      const result = sanitizeEmail(invalid);

      expect(result).toBe('');
    });

    it('should reject email without @', () => {
      expect(sanitizeEmail('userexample.com')).toBe('');
    });

    it('should reject email without domain', () => {
      expect(sanitizeEmail('user@')).toBe('');
    });

    it('should handle empty string', () => {
      expect(sanitizeEmail('')).toBe('');
    });

    it('should accept email with subdomain', () => {
      const email = 'user@mail.example.com';
      expect(sanitizeEmail(email)).toBe(email);
    });

    it('should accept email with plus addressing', () => {
      const email = 'user+tag@example.com';
      expect(sanitizeEmail(email)).toBe(email);
    });
  });

  describe('sanitizeUrl', () => {
    it('should accept valid HTTPS URLs', () => {
      const url = 'https://example.com';
      const result = sanitizeUrl(url);

      expect(result).toBe(url);
    });

    it('should accept valid HTTP URLs', () => {
      const url = 'http://example.com';
      const result = sanitizeUrl(url);

      expect(result).toBe(url);
    });

    it('should accept mailto URLs', () => {
      const url = 'mailto:user@example.com';
      const result = sanitizeUrl(url);

      expect(result).toBe(url);
    });

    it('should block javascript: scheme', () => {
      const malicious = 'javascript:alert("xss")';
      const result = sanitizeUrl(malicious);

      expect(result).toBe('');
    });

    it('should block data: scheme', () => {
      const malicious = 'data:text/html,<script>alert("xss")</script>';
      const result = sanitizeUrl(malicious);

      expect(result).toBe('');
    });

    it('should block vbscript: scheme', () => {
      const malicious = 'vbscript:msgbox("xss")';
      const result = sanitizeUrl(malicious);

      expect(result).toBe('');
    });

    it('should block file: scheme', () => {
      const malicious = 'file:///etc/passwd';
      const result = sanitizeUrl(malicious);

      expect(result).toBe('');
    });

    it('should block about: scheme', () => {
      const malicious = 'about:blank';
      const result = sanitizeUrl(malicious);

      expect(result).toBe('');
    });

    it('should reject URLs without scheme', () => {
      const invalid = 'example.com';
      const result = sanitizeUrl(invalid);

      expect(result).toBe('');
    });

    it('should handle case-insensitive scheme check', () => {
      const malicious = 'JAVASCRIPT:alert("xss")';
      const result = sanitizeUrl(malicious);

      expect(result).toBe('');
    });

    it('should handle empty string', () => {
      expect(sanitizeUrl('')).toBe('');
    });
  });

  describe('sanitizePhoneNumber', () => {
    it('should keep only digits and plus sign', () => {
      const input = '+1 (555) 123-4567';
      const result = sanitizePhoneNumber(input);

      expect(result).toBe('+15551234567');
    });

    it('should remove letters', () => {
      const input = '+1-555-CALL-NOW';
      const result = sanitizePhoneNumber(input);

      expect(result).toBe('+1555');
    });

    it('should handle Turkish phone numbers', () => {
      const input = '+90 (555) 123 45 67';
      const result = sanitizePhoneNumber(input);

      expect(result).toBe('+905551234567');
    });

    it('should handle empty string', () => {
      expect(sanitizePhoneNumber('')).toBe('');
    });
  });

  describe('sanitizeFilename', () => {
    it('should allow safe filenames', () => {
      const safe = 'document.pdf';
      const result = sanitizeFilename(safe);

      expect(result).toBe(safe);
    });

    it('should remove directory traversal attempts', () => {
      const malicious = '../../../etc/passwd';
      const result = sanitizeFilename(malicious);

      expect(result).not.toContain('..');
      expect(result).not.toContain('/');
    });

    it('should remove path separators', () => {
      const malicious = 'folder/file.txt';
      const result = sanitizeFilename(malicious);

      expect(result).not.toContain('/');
      expect(result).not.toContain('\\');
    });

    it('should remove null bytes', () => {
      const malicious = 'file\0.txt';
      const result = sanitizeFilename(malicious);

      expect(result).not.toContain('\0');
    });

    it('should replace special characters with underscore', () => {
      const input = 'my file (1).txt';
      const result = sanitizeFilename(input);

      expect(result).toBe('my_file__1_.txt');
    });

    it('should not start with dot', () => {
      const input = '.htaccess';
      const result = sanitizeFilename(input);

      expect(result).not.toStartWith('.');
    });

    it('should handle empty string', () => {
      expect(sanitizeFilename('')).toBe('');
    });
  });

  describe('sanitizeJson', () => {
    it('should validate and re-stringify valid JSON', () => {
      const valid = '{"name":"John","age":30}';
      const result = sanitizeJson(valid);

      expect(JSON.parse(result)).toEqual({ name: 'John', age: 30 });
    });

    it('should reject invalid JSON', () => {
      const invalid = '{name: "John"}'; // Missing quotes
      const result = sanitizeJson(invalid);

      expect(result).toBe('');
    });

    it('should handle nested objects', () => {
      const nested = '{"user":{"name":"John","address":{"city":"NYC"}}}';
      const result = sanitizeJson(nested);

      expect(result).toBeTruthy();
      const parsed = JSON.parse(result);
      expect(parsed.user.address.city).toBe('NYC');
    });

    it('should handle arrays', () => {
      const array = '[1,2,3,4,5]';
      const result = sanitizeJson(array);

      expect(JSON.parse(result)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle empty string', () => {
      expect(sanitizeJson('')).toBe('');
    });
  });

  describe('stripHtmlTags', () => {
    it('should remove all HTML tags', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      const result = stripHtmlTags(html);

      expect(result).toBe('Hello World');
    });

    it('should remove self-closing tags', () => {
      const html = 'Line 1<br/>Line 2';
      const result = stripHtmlTags(html);

      expect(result).toBe('Line 1Line 2');
    });

    it('should remove script tags', () => {
      const html = '<script>alert("xss")</script>Text';
      const result = stripHtmlTags(html);

      expect(result).toBe('alert("xss")Text');
    });

    it('should handle empty string', () => {
      expect(stripHtmlTags('')).toBe('');
    });
  });

  describe('sanitizeUserInput', () => {
    it('should strip tags and encode entities', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeUserInput(input);

      expect(result).not.toContain('<script>');
      expect(result).not.toContain('<');
    });

    it('should trim whitespace', () => {
      const input = '  hello world  ';
      const result = sanitizeUserInput(input);

      expect(result).toBe('hello world');
    });

    it('should handle mixed content', () => {
      const input = '  <p>Test & "quotes"</p>  ';
      const result = sanitizeUserInput(input);

      expect(result).not.toContain('<p>');
      expect(result).toContain('&amp;');
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize all string values in object', () => {
      const input = {
        name: '<script>alert("xss")</script>',
        email: 'user@example.com',
      };

      const result = sanitizeObject(input);

      expect(result.name).not.toContain('<script>');
      expect(result.email).toBe('user@example.com');
    });

    it('should handle nested objects', () => {
      const input = {
        user: {
          profile: {
            bio: '<b>Hello</b>',
          },
        },
      };

      const result = sanitizeObject(input);

      expect(result.user.profile.bio).not.toContain('<b>');
    });

    it('should handle arrays', () => {
      const input = {
        tags: ['<script>xss</script>', 'safe tag'],
      };

      const result = sanitizeObject(input);

      expect(result.tags[0]).not.toContain('<script>');
      expect(result.tags[1]).toBe('safe tag');
    });

    it('should preserve numbers and booleans', () => {
      const input = {
        age: 30,
        active: true,
        score: 99.5,
      };

      const result = sanitizeObject(input);

      expect(result.age).toBe(30);
      expect(result.active).toBe(true);
      expect(result.score).toBe(99.5);
    });

    it('should handle null and undefined', () => {
      const input = {
        nullValue: null,
        undefinedValue: undefined,
      };

      const result = sanitizeObject(input);

      expect(result.nullValue).toBeNull();
      expect(result.undefinedValue).toBeUndefined();
    });

    it('should respect allowHtml option', () => {
      const input = {
        content: '<p>Hello</p>',
      };

      const result = sanitizeObject(input, { allowHtml: true });

      expect(result.content).toBe('<p>Hello</p>');
    });

    it('should prevent deep recursion', () => {
      const input = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  level6: {
                    level7: {
                      level8: {
                        level9: {
                          level10: {
                            level11: 'deep value',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      const result = sanitizeObject(input, { maxDepth: 10 });

      expect(result).toBeDefined();
    });
  });

  describe('containsXss', () => {
    it('should detect <script> tags', () => {
      expect(containsXss('<script>alert("xss")</script>')).toBe(true);
    });

    it('should detect javascript: protocol', () => {
      expect(containsXss('javascript:alert("xss")')).toBe(true);
    });

    it('should detect onerror attribute', () => {
      expect(containsXss('<img onerror="alert()">')).toBe(true);
    });

    it('should detect onload attribute', () => {
      expect(containsXss('<body onload="malicious()">')).toBe(true);
    });

    it('should detect onclick attribute', () => {
      expect(containsXss('<div onclick="hack()">')).toBe(true);
    });

    it('should detect <iframe> tags', () => {
      expect(containsXss('<iframe src="malicious.com"></iframe>')).toBe(true);
    });

    it('should detect eval() calls', () => {
      expect(containsXss('eval(maliciousCode)')).toBe(true);
    });

    it('should return false for safe content', () => {
      expect(containsXss('This is safe text')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(containsXss('<SCRIPT>alert("xss")</SCRIPT>')).toBe(true);
    });

    it('should handle empty string', () => {
      expect(containsXss('')).toBe(false);
    });
  });

  describe('containsSqlInjection', () => {
    it('should detect UNION SELECT attack', () => {
      expect(containsSqlInjection("' UNION SELECT * FROM users --")).toBe(true);
    });

    it('should detect DROP TABLE attack', () => {
      expect(containsSqlInjection("'; DROP TABLE users; --")).toBe(true);
    });

    it('should detect INSERT attack', () => {
      expect(containsSqlInjection("'; INSERT INTO users VALUES('admin','pass'); --")).toBe(true);
    });

    it('should detect DELETE attack', () => {
      expect(containsSqlInjection("'; DELETE FROM users WHERE 1=1; --")).toBe(true);
    });

    it('should detect OR attack', () => {
      expect(containsSqlInjection("' OR '1'='1")).toBe(true);
    });

    it('should detect SQL comments', () => {
      expect(containsSqlInjection('test -- comment')).toBe(true);
      expect(containsSqlInjection('test /* comment */')).toBe(true);
    });

    it('should return false for safe content', () => {
      expect(containsSqlInjection('This is safe text')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(containsSqlInjection("' union select * from users")).toBe(true);
    });

    it('should handle empty string', () => {
      expect(containsSqlInjection('')).toBe(false);
    });
  });

  describe('validateAndSanitize', () => {
    it('should validate and sanitize text input', () => {
      const result = validateAndSanitize('Hello World');

      expect(result.valid).toBe(true);
      expect(result.sanitized).toBe('Hello World');
      expect(result.errors).toHaveLength(0);
    });

    it('should reject input exceeding max length', () => {
      const result = validateAndSanitize('Hello World', { maxLength: 5 });

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Input exceeds maximum length of 5');
    });

    it('should detect XSS attacks', () => {
      const result = validateAndSanitize('<script>alert("xss")</script>');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Potential XSS attack detected');
    });

    it('should detect SQL injection', () => {
      const result = validateAndSanitize("' OR '1'='1");

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Potential SQL injection detected');
    });

    it('should validate email type', () => {
      const result = validateAndSanitize('user@example.com', { type: 'email' });

      expect(result.valid).toBe(true);
      expect(result.sanitized).toBe('user@example.com');
    });

    it('should validate URL type', () => {
      const result = validateAndSanitize('https://example.com', { type: 'url' });

      expect(result.valid).toBe(true);
      expect(result.sanitized).toBe('https://example.com');
    });

    it('should skip XSS check when disabled', () => {
      const result = validateAndSanitize('<p>test</p>', {
        checkXss: false,
        allowHtml: true,
      });

      expect(result.valid).toBe(true);
    });

    it('should skip SQL check when disabled', () => {
      const result = validateAndSanitize("' OR '1'='1", { checkSql: false });

      expect(result.valid).toBe(true);
    });
  });

  describe('sanitizeRequestBody', () => {
    it('should sanitize all fields in request body', () => {
      const body = {
        name: '<script>xss</script>',
        email: 'user@example.com',
        comment: '<b>Hello</b>',
      };

      const result = sanitizeRequestBody(body);

      expect(result.name).not.toContain('<script>');
      expect(result.email).toBe('user@example.com');
      expect(result.comment).not.toContain('<b>');
    });

    it('should filter to allowed fields only', () => {
      const body = {
        name: 'John',
        email: 'john@example.com',
        password: 'secret',
        adminFlag: true,
      };

      const result = sanitizeRequestBody(body, ['name', 'email']);

      expect(result.name).toBe('John');
      expect(result.email).toBe('john@example.com');
      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('adminFlag');
    });

    it('should handle nested objects in body', () => {
      const body = {
        user: {
          profile: {
            bio: '<script>xss</script>',
          },
        },
      };

      const result = sanitizeRequestBody(body);

      expect(result.user.profile.bio).not.toContain('<script>');
    });

    it('should preserve valid data', () => {
      const body = {
        name: 'John Doe',
        age: 30,
        active: true,
      };

      const result = sanitizeRequestBody(body);

      expect(result).toEqual(body);
    });
  });
});
