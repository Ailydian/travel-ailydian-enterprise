/**
 * Sentry Utility Functions
 * Enhanced error tracking, performance monitoring, and user feedback
 *
 * @module SentryUtils
 * @performance Real-time error tracking
 * @privacy User data anonymized
 */

import * as Sentry from '@sentry/nextjs';

// ============================================
// TYPES & INTERFACES
// ============================================

export type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

export interface ErrorContext {
  readonly tags?: Record<string, string | number | boolean>;
  readonly extra?: Record<string, any>;
  readonly user?: {
    readonly id?: string;
    readonly email?: string;
    readonly username?: string;
    readonly ipAddress?: string;
  };
  readonly level?: ErrorSeverity;
}

export interface PerformanceMetrics {
  readonly name: string;
  readonly duration: number;
  readonly tags?: Record<string, string>;
  readonly data?: Record<string, any>;
}

export interface CustomEvent {
  readonly message: string;
  readonly level: ErrorSeverity;
  readonly tags?: Record<string, string>;
  readonly extra?: Record<string, any>;
}

// ============================================
// ERROR TRACKING
// ============================================

/**
 * Capture exception with context
 */
export function captureException(
  error: Error,
  context?: ErrorContext
): string {
  return Sentry.captureException(error, {
    tags: context?.tags,
    extra: context?.extra,
    user: context?.user,
    level: context?.level as Sentry.SeverityLevel,
  });
}

/**
 * Capture message (non-error events)
 */
export function captureMessage(
  message: string,
  level: ErrorSeverity = 'info',
  context?: Omit<ErrorContext, 'level'>
): string {
  return Sentry.captureMessage(message, {
    level: level as Sentry.SeverityLevel,
    tags: context?.tags,
    extra: context?.extra,
    user: context?.user,
  });
}

/**
 * Capture custom event
 */
export function captureEvent(event: CustomEvent): string {
  return Sentry.captureEvent({
    message: event.message,
    level: event.level as Sentry.SeverityLevel,
    tags: event.tags,
    extra: event.extra,
  });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Start performance transaction
 */
export function startTransaction(
  name: string,
  operation: string,
  tags?: Record<string, string>
): Sentry.Transaction | undefined {
  const transaction = Sentry.startTransaction({
    name,
    op: operation,
    tags,
  });

  return transaction;
}

/**
 * Measure async operation performance
 */
export async function measureAsync<T>(
  name: string,
  operation: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const transaction = startTransaction(name, operation, tags);

  try {
    const result = await fn();
    transaction?.setStatus('ok');
    return result;
  } catch (error) {
    transaction?.setStatus('internal_error');
    throw error;
  } finally {
    transaction?.finish();
  }
}

/**
 * Measure sync operation performance
 */
export function measureSync<T>(
  name: string,
  operation: string,
  fn: () => T,
  tags?: Record<string, string>
): T {
  const transaction = startTransaction(name, operation, tags);

  try {
    const result = fn();
    transaction?.setStatus('ok');
    return result;
  } catch (error) {
    transaction?.setStatus('internal_error');
    throw error;
  } finally {
    transaction?.finish();
  }
}

/**
 * Track custom performance metric
 */
export function trackPerformance(metrics: PerformanceMetrics): void {
  const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();

  if (transaction) {
    const span = transaction.startChild({
      op: 'custom',
      description: metrics.name,
      tags: metrics.tags,
      data: metrics.data,
    });

    setTimeout(() => {
      span.finish();
    }, metrics.duration);
  }
}

// ============================================
// USER CONTEXT
// ============================================

/**
 * Set user context
 */
export function setUser(user: {
  id?: string;
  email?: string;
  username?: string;
  ipAddress?: string;
  [key: string]: any;
}): void {
  Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUser(): void {
  Sentry.setUser(null);
}

// ============================================
// BREADCRUMBS
// ============================================

/**
 * Add breadcrumb (audit trail)
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>,
  level: ErrorSeverity = 'info'
): void {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: level as Sentry.SeverityLevel,
    timestamp: Date.now() / 1000,
  });
}

// ============================================
// TAGS & CONTEXT
// ============================================

/**
 * Set global tag
 */
export function setTag(key: string, value: string | number | boolean): void {
  Sentry.setTag(key, value);
}

/**
 * Set multiple global tags
 */
export function setTags(tags: Record<string, string | number | boolean>): void {
  Sentry.setTags(tags);
}

/**
 * Set context data
 */
export function setContext(name: string, context: Record<string, any>): void {
  Sentry.setContext(name, context);
}

// ============================================
// API ERROR HANDLING
// ============================================

/**
 * Track API error
 */
export function trackAPIError(
  endpoint: string,
  method: string,
  statusCode: number,
  error: Error,
  requestData?: any
): string {
  return captureException(error, {
    tags: {
      api_endpoint: endpoint,
      http_method: method,
      http_status: statusCode,
    },
    extra: {
      request_data: requestData,
      response_status: statusCode,
    },
    level: statusCode >= 500 ? 'error' : 'warning',
  });
}

/**
 * Track successful API call performance
 */
export function trackAPISuccess(
  endpoint: string,
  method: string,
  duration: number
): void {
  trackPerformance({
    name: `API ${method} ${endpoint}`,
    duration,
    tags: {
      api_endpoint: endpoint,
      http_method: method,
    },
  });
}

// ============================================
// PAYMENT ERROR TRACKING
// ============================================

/**
 * Track payment error
 */
export function trackPaymentError(
  provider: 'stripe' | 'crypto' | 'escrow',
  errorType: string,
  amount: number,
  currency: string,
  error: Error,
  transactionId?: string
): string {
  return captureException(error, {
    tags: {
      payment_provider: provider,
      payment_error_type: errorType,
      payment_currency: currency,
    },
    extra: {
      payment_amount: amount,
      transaction_id: transactionId,
    },
    level: 'error',
  });
}

/**
 * Track successful payment
 */
export function trackPaymentSuccess(
  provider: 'stripe' | 'crypto' | 'escrow',
  amount: number,
  currency: string,
  transactionId: string
): void {
  captureMessage('Payment successful', 'info', {
    tags: {
      payment_provider: provider,
      payment_currency: currency,
      payment_status: 'success',
    },
    extra: {
      payment_amount: amount,
      transaction_id: transactionId,
    },
  });
}

// ============================================
// WEB3 ERROR TRACKING
// ============================================

/**
 * Track blockchain transaction error
 */
export function trackWeb3Error(
  chain: string,
  operation: string,
  error: Error,
  txHash?: string,
  walletAddress?: string
): string {
  return captureException(error, {
    tags: {
      blockchain_chain: chain,
      blockchain_operation: operation,
    },
    extra: {
      transaction_hash: txHash,
      wallet_address: walletAddress,
    },
    level: 'error',
  });
}

/**
 * Track successful blockchain transaction
 */
export function trackWeb3Success(
  chain: string,
  operation: string,
  txHash: string,
  gasUsed?: string
): void {
  captureMessage('Blockchain transaction successful', 'info', {
    tags: {
      blockchain_chain: chain,
      blockchain_operation: operation,
      blockchain_status: 'success',
    },
    extra: {
      transaction_hash: txHash,
      gas_used: gasUsed,
    },
  });
}

// ============================================
// AI ERROR TRACKING
// ============================================

/**
 * Track AI model error
 */
export function trackAIError(
  provider: 'openai' | 'anthropic' | 'google' | 'groq',
  model: string,
  error: Error,
  prompt?: string
): string {
  return captureException(error, {
    tags: {
      ai_provider: provider,
      ai_model: model,
    },
    extra: {
      prompt_preview: prompt?.substring(0, 200),
    },
    level: 'warning',
  });
}

/**
 * Track AI response time
 */
export function trackAIPerformance(
  provider: 'openai' | 'anthropic' | 'google' | 'groq',
  model: string,
  duration: number,
  tokensUsed?: number
): void {
  trackPerformance({
    name: `AI ${provider} ${model}`,
    duration,
    tags: {
      ai_provider: provider,
      ai_model: model,
    },
    data: {
      tokens_used: tokensUsed,
    },
  });
}

// ============================================
// CUSTOM MONITORING
// ============================================

/**
 * Track user action
 */
export function trackUserAction(
  action: string,
  category: string,
  data?: Record<string, any>
): void {
  addBreadcrumb(action, category, data, 'info');

  captureMessage(`User action: ${action}`, 'info', {
    tags: {
      user_action: action,
      action_category: category,
    },
    extra: data,
  });
}

/**
 * Track feature usage
 */
export function trackFeatureUsage(
  feature: string,
  success: boolean,
  metadata?: Record<string, any>
): void {
  captureMessage(`Feature ${feature} ${success ? 'used' : 'failed'}`, 'info', {
    tags: {
      feature_name: feature,
      feature_status: success ? 'success' : 'failure',
    },
    extra: metadata,
  });
}

/**
 * Track business metric
 */
export function trackBusinessMetric(
  metric: string,
  value: number,
  unit: string,
  tags?: Record<string, string>
): void {
  captureMessage(`Business metric: ${metric}`, 'info', {
    tags: {
      metric_name: metric,
      metric_unit: unit,
      ...tags,
    },
    extra: {
      metric_value: value,
    },
  });
}

// ============================================
// ERROR BOUNDARY INTEGRATION
// ============================================

/**
 * Error boundary fallback handler
 */
export function handleErrorBoundary(
  error: Error,
  errorInfo: { componentStack: string }
): string {
  return captureException(error, {
    tags: {
      error_boundary: 'true',
    },
    extra: {
      component_stack: errorInfo.componentStack,
    },
    level: 'error',
  });
}

// ============================================
// UTILITIES
// ============================================

/**
 * Check if Sentry is initialized
 */
export function isSentryEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);
}

/**
 * Get current Sentry client
 */
export function getSentryClient(): typeof Sentry {
  return Sentry;
}

/**
 * Flush pending events (before process exit)
 */
export async function flushEvents(timeout: number = 2000): Promise<boolean> {
  return await Sentry.flush(timeout);
}

export default {
  captureException,
  captureMessage,
  captureEvent,
  startTransaction,
  measureAsync,
  measureSync,
  trackPerformance,
  setUser,
  clearUser,
  addBreadcrumb,
  setTag,
  setTags,
  setContext,
  trackAPIError,
  trackAPISuccess,
  trackPaymentError,
  trackPaymentSuccess,
  trackWeb3Error,
  trackWeb3Success,
  trackAIError,
  trackAIPerformance,
  trackUserAction,
  trackFeatureUsage,
  trackBusinessMetric,
  handleErrorBoundary,
  isSentryEnabled,
  getSentryClient,
  flushEvents,
};
