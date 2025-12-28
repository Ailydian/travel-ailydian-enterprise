import { logger } from '../../lib/logger/winston';
/**
 * Stripe Configuration
 * Centralizes Stripe configuration and environment variables
 */

export const stripeConfig = {
  // Publishable key (safe for client-side)
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',

  // Secret key (server-side only)
  secretKey: process.env.STRIPE_SECRET_KEY || '',

  // Webhook secret for signature verification
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',

  // Currency configuration
  currency: 'usd',

  // Payment method types
  paymentMethodTypes: ['card'] as const,

  // API version
  apiVersion: '2024-12-18.acacia' as const,
};

// Validate configuration on server-side
export function validateStripeConfig() {
  const errors: string[] = [];

  if (!stripeConfig.secretKey && typeof window === 'undefined') {
    errors.push('STRIPE_SECRET_KEY is not configured');
  }

  if (!stripeConfig.publishableKey) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured');
  }

  if (!stripeConfig.webhookSecret && typeof window === 'undefined') {
    logger.warn('STRIPE_WEBHOOK_SECRET is not configured - webhooks will not work');
  }

  if (errors.length > 0) {
    throw new Error(`Stripe configuration errors:\n${errors.join('\n')}`);
  }

  return true;
}

// Check if we're in test mode
export function isTestMode(): boolean {
  return stripeConfig.publishableKey?.startsWith('pk_test_') ?? false;
}

// Get currency symbol
export function getCurrencySymbol(currency: string = stripeConfig.currency): string {
  const symbols: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
    try: '₺',
    jpy: '¥',
  };
  return symbols[currency.toLowerCase()] || currency.toUpperCase();
}

// Format amount for display
export function formatAmount(amount: number, currency: string = stripeConfig.currency): string {
  const symbol = getCurrencySymbol(currency);
  const formatted = (amount / 100).toFixed(2);
  return `${symbol}${formatted}`;
}

// Convert amount to cents
export function amountToCents(amount: number): number {
  return Math.round(amount * 100);
}

export default stripeConfig;
