/**
 * Client-side Instrumentation (Next.js 15+)
 * Replaces deprecated sentry.client.config.ts
 * Initializes browser-side monitoring and error tracking
 */

import { initSentry } from './src/lib/monitoring/sentry';

// Initialize Sentry for browser
initSentry();
