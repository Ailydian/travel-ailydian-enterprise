/**
 * Sentry Server Configuration
 * Node.js server-side error tracking
 */

import * as Sentry from '@sentry/nextjs';
import { obfuscateApiKey } from './src/lib/ai/model-obfuscation';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',

  // Server-side tracing
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Integrations - Sentry v10+ auto-instruments Http and Prisma
  integrations: [],

  beforeSend(event) {
    // Remove sensitive server-side data
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers['x-api-key'];
      delete event.request.headers.cookie;
    }

    // Obfuscate environment variables in context
    if (event.contexts?.runtime?.env) {
      const env = event.contexts.runtime.env as Record<string, any>;
      Object.keys(env).forEach(key => {
        if (key.includes('KEY') || key.includes('SECRET') || key.includes('TOKEN')) {
          env[key] = obfuscateApiKey(env[key] || '');
        }
      });
    }

    return event;
  },

  // Ignore database connection errors (they're transient)
  ignoreErrors: [
    'P2002', // Prisma unique constraint
    'ECONNREFUSED',
    'ETIMEDOUT',
  ],
});
