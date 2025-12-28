/**
 * Client-side Instrumentation (Next.js 15+)
 * Replaces deprecated sentry.client.config.ts
 * Initializes browser-side monitoring and error tracking
 */

import * as Sentry from '@sentry/nextjs';
import { initSentry } from './src/lib/monitoring/sentry';

// Initialize Sentry for browser
initSentry();

/**
 * Router transition start hook
 * Required by Sentry to instrument navigations
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
