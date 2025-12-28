# Security Quick Start Guide

**⚡ Fast implementation guide for Travel.Ailydian.com security features**

---

## 🚀 Immediate Usage (5 minutes)

### 1. Use Logger Instead of Console.log

```typescript
// ❌ OLD WAY
console.log('User logged in:', user);
console.error('Payment failed:', error);

// ✅ NEW WAY
import { logger } from '@/lib/logger/winston';

logger.info('User logged in', { userId: user.id, email: user.email });
logger.error('Payment failed', error, { orderId, amount });
```

**All 154 console.log statements have been automatically replaced!**

---

### 2. Apply Rate Limiting to API Routes

```typescript
// File: src/pages/api/auth/login.ts

import { withRateLimit, RateLimitPresets } from '@/lib/middleware/api-rate-limit';

// Wrap your handler
export default withRateLimit(RateLimitPresets.auth)(async (req, res) => {
  // Your existing code
  // Rate limiting: 5 requests per 15 minutes
});
```

**Available Presets:**
```typescript
RateLimitPresets.auth      // 5 req/15min - Login, register
RateLimitPresets.ai        // 20 req/1min - AI endpoints
RateLimitPresets.payment   // 10 req/1min - Payment endpoints
RateLimitPresets.search    // 100 req/1min - Search endpoints
RateLimitPresets.public    // 200 req/1min - Public endpoints
RateLimitPresets.admin     // 1000 req/1min - Admin endpoints
```

---

### 3. Sanitize User Input

```typescript
import { sanitizeUserInput, validateAndSanitize } from '@/lib/security/input-sanitizer';

// Simple sanitization
const cleanComment = sanitizeUserInput(req.body.comment);

// Comprehensive validation
const result = validateAndSanitize(req.body.email, {
  type: 'email',
  maxLength: 255,
  checkXss: true,
});

if (!result.valid) {
  return res.status(400).json({ errors: result.errors });
}
```

---

### 4. Validate with Zod Schemas

```typescript
import { UserSchemas, validate } from '@/lib/validation/schemas';

// User registration
const result = validate(UserSchemas.create, req.body);

if (!result.success) {
  return res.status(400).json({
    error: 'Validation failed',
    details: result.errors.flatten()
  });
}

const { email, password, name } = result.data;
```

**Password requirements (automatically enforced):**
- Minimum 12 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

---

## 📋 Complete API Route Example

```typescript
// src/pages/api/bookings/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit, RateLimitPresets } from '@/lib/middleware/api-rate-limit';
import { sanitizeRequestBody } from '@/lib/security/input-sanitizer';
import { BookingSchemas, validate } from '@/lib/validation/schemas';
import { logger } from '@/lib/logger/winston';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = performance.now();

  try {
    // 1. Sanitize request body
    const sanitized = sanitizeRequestBody(req.body, [
      'serviceType',
      'serviceId',
      'startDate',
      'endDate',
      'travelers',
      'contactInfo',
    ]);

    // 2. Validate input
    const result = validate(BookingSchemas.create, sanitized);
    if (!result.success) {
      logger.warn('Booking validation failed', {
        component: 'booking',
        errors: result.errors.flatten(),
      });
      return res.status(400).json({ error: 'Invalid input', details: result.errors });
    }

    // 3. Process booking
    const booking = await createBooking(result.data);

    // 4. Log success
    logger.info('Booking created', {
      component: 'booking',
      bookingId: booking.id,
      duration: Math.round(performance.now() - startTime),
    });

    return res.status(201).json(booking);

  } catch (error) {
    logger.error('Booking creation failed', error, {
      component: 'booking',
      duration: Math.round(performance.now() - startTime),
    });

    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply rate limiting
export default withRateLimit(RateLimitPresets.public)(handler);
```

---

## 🔐 Security Checklist for New Features

Before deploying any new feature, ensure:

### Input Validation
- [ ] All inputs validated with Zod schemas
- [ ] User-provided strings sanitized
- [ ] File uploads validated (type, size, content)
- [ ] URLs validated (no javascript:, data: schemes)

### Authentication & Authorization
- [ ] Protected routes require authentication
- [ ] Role-based access control applied
- [ ] Session management secure (HTTP-only cookies)

### Logging
- [ ] No console.log statements
- [ ] Logger used for all events
- [ ] Sensitive data sanitized
- [ ] Error handling with proper logging

### Rate Limiting
- [ ] Rate limiting applied to API routes
- [ ] Appropriate preset selected
- [ ] Headers checked in response

### API Security
- [ ] CORS configured correctly
- [ ] Request body sanitized
- [ ] Error messages don't expose internals
- [ ] SQL queries use Prisma (no raw SQL)

---

## 🛠️ Environment Setup

### Required Environment Variables

```bash
# .env.local (Development)
NODE_ENV=development
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-dev-secret-min-32-chars
NEXTAUTH_URL=http://localhost:3100

# .env.production (Production)
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-prod-secret-min-32-chars
NEXTAUTH_URL=https://travel.ailydian.com

# Upstash Redis (Production Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### Generate Secure Secrets

```bash
# Generate 32-character secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📊 Monitoring & Logs

### Log Files Location

```
logs/
├── error.log      # Error level logs
├── combined.log   # All logs (production)
└── *.log.1        # Rotated logs
```

### View Logs

```bash
# View error logs
tail -f logs/error.log

# View all logs
tail -f logs/combined.log

# Search logs
grep "security" logs/combined.log
grep "rate limit" logs/combined.log
```

### Security Events

```typescript
// Log security events
logger.security('Suspicious activity', {
  userId,
  ip: req.socket.remoteAddress,
  action: 'multiple_failed_logins',
  attempts: 5,
});
```

---

## 🧪 Testing

### Test Rate Limiting

```bash
# Make multiple requests quickly
for i in {1..10}; do
  curl http://localhost:3100/api/auth/login \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test"}'
done

# Should see 429 (Too Many Requests) after 5 attempts
```

### Test Input Sanitization

```bash
# Test XSS protection
curl http://localhost:3100/api/user/profile \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(1)</script>"}'

# Should return sanitized: &lt;script&gt;alert(1)&lt;/script&gt;
```

### Test Password Validation

```bash
# Weak password (should fail)
curl http://localhost:3100/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"weak","name":"Test"}'

# Strong password (should pass)
curl http://localhost:3100/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"StrongP@ssw0rd123","name":"Test"}'
```

---

## 🚨 Common Patterns

### Pattern 1: Protected API Route with Rate Limiting

```typescript
import { withRateLimit, RateLimitPresets } from '@/lib/middleware/api-rate-limit';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Your logic here
}

export default withRateLimit(RateLimitPresets.public)(handler);
```

### Pattern 2: Secure Form Submission

```typescript
import { sanitizeRequestBody } from '@/lib/security/input-sanitizer';
import { ContactSchema, validate } from '@/lib/validation/schemas';
import { logger } from '@/lib/logger/winston';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Sanitize
  const clean = sanitizeRequestBody(req.body);

  // 2. Validate
  const result = validate(ContactSchema, clean);
  if (!result.success) {
    return res.status(400).json({ errors: result.errors });
  }

  // 3. Process
  try {
    await sendEmail(result.data);
    logger.info('Contact form submitted', { email: result.data.email });
    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Contact form error', error);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
```

### Pattern 3: Database Query with Logging

```typescript
import { logger } from '@/lib/logger/winston';
import { prisma } from '@/lib/database/prisma-client';

async function getUserBookings(userId: string) {
  const timer = logger.startTimer();

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { service: true },
    });

    logger.info('Fetched user bookings', {
      component: 'booking',
      userId,
      count: bookings.length,
      duration: timer(),
    });

    return bookings;
  } catch (error) {
    logger.error('Failed to fetch bookings', error, {
      component: 'booking',
      userId,
      duration: timer(),
    });
    throw error;
  }
}
```

---

## 📚 Reference

### Import Paths

```typescript
// Logger
import { logger } from '@/lib/logger/winston';

// Input Sanitization
import {
  sanitizeUserInput,
  sanitizeUrl,
  validateAndSanitize,
  sanitizeRequestBody
} from '@/lib/security/input-sanitizer';

// Rate Limiting
import {
  withRateLimit,
  RateLimitPresets
} from '@/lib/middleware/api-rate-limit';

// Validation
import {
  UserSchemas,
  BookingSchemas,
  validate
} from '@/lib/validation/schemas';
```

### Logger Methods

```typescript
logger.debug(message, context);   // Development only
logger.info(message, context);    // General info
logger.http(message, context);    // HTTP requests
logger.warn(message, context);    // Warnings
logger.error(message, error, context);  // Errors
logger.security(event, context);  // Security events
```

### Sanitizer Functions

```typescript
sanitizeHtml(input)           // Encode HTML entities
sanitizeUserInput(input)      // General user input
sanitizeEmail(email)          // Email validation
sanitizeUrl(url)              // URL validation
sanitizePhoneNumber(phone)    // Phone sanitization
sanitizeFilename(filename)    // File name sanitization
sanitizeSql(input)            // SQL input sanitization
sanitizeObject(obj)           // Recursive object sanitization
sanitizeRequestBody(body)     // Request body sanitization
```

---

## 🎯 Next Steps

1. **Review Documentation**
   - Read `/SECURITY.md` for comprehensive guide
   - Review `/SECURITY_IMPLEMENTATION_REPORT.md` for details

2. **Apply to Your Code**
   - Replace console.log (already done!)
   - Add rate limiting to all API routes
   - Sanitize all user inputs
   - Use Zod schemas for validation

3. **Configure Production**
   - Set up Upstash Redis
   - Add environment variables
   - Configure security headers
   - Set up monitoring

4. **Test Thoroughly**
   - Test rate limiting
   - Test input sanitization
   - Test authentication flows
   - Run security scans

---

## ❓ FAQ

**Q: Do I need to replace all console.log manually?**
A: No! Already done automatically (154 replacements). Use `logger` for new code.

**Q: Is rate limiting enabled in development?**
A: Yes, using in-memory store. Production uses Redis.

**Q: How do I customize rate limits?**
A: Create custom config:
```typescript
withRateLimit({
  name: 'custom',
  maxRequests: 50,
  windowMs: 60000,
  message: 'Custom limit exceeded',
})
```

**Q: What if Upstash Redis is down?**
A: Automatically falls back to in-memory rate limiting.

**Q: How do I disable rate limiting for testing?**
A: Set `NODE_ENV=test` or skip middleware in test environment.

---

**Document Version:** 1.0.0
**Last Updated:** December 28, 2025
**For Support:** See `/SECURITY.md`
