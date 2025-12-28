/**
 * Stripe Server-Side Client
 * Handles all server-side Stripe operations with error handling and retry logic
 */

import Stripe from 'stripe';
import { stripeConfig, validateStripeConfig } from './config';

// Initialize Stripe client (singleton)
let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    validateStripeConfig();

    stripeClient = new Stripe(stripeConfig.secretKey, {
      apiVersion: stripeConfig.apiVersion,
      typescript: true,
      maxNetworkRetries: 3,
      timeout: 30000, // 30 seconds
    });
  }

  return stripeClient;
}

/**
 * Retry wrapper for Stripe operations
 */
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (error instanceof Stripe.errors.StripeCardError) {
        throw error; // Card errors shouldn't be retried
      }

      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        throw error; // Invalid requests shouldn't be retried
      }

      // Only retry on network errors or rate limits
      const shouldRetry =
        error instanceof Stripe.errors.StripeConnectionError ||
        error instanceof Stripe.errors.StripeAPIError ||
        error instanceof Stripe.errors.StripeRateLimitError;

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }

  throw lastError;
}

/**
 * Create a PaymentIntent
 */
export async function createPaymentIntent(params: {
  amount: number; // Amount in cents
  currency?: string;
  metadata?: Record<string, string>;
  description?: string;
  receipt_email?: string;
}): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency || stripeConfig.currency,
      payment_method_types: stripeConfig.paymentMethodTypes,
      metadata: params.metadata || {},
      description: params.description,
      receipt_email: params.receipt_email,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  });
}

/**
 * Retrieve a PaymentIntent
 */
export async function retrievePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  });
}

/**
 * Update a PaymentIntent
 */
export async function updatePaymentIntent(
  paymentIntentId: string,
  params: Stripe.PaymentIntentUpdateParams
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.paymentIntents.update(paymentIntentId, params);
  });
}

/**
 * Cancel a PaymentIntent
 */
export async function cancelPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.paymentIntents.cancel(paymentIntentId);
  });
}

/**
 * Create a refund
 */
export async function createRefund(params: {
  paymentIntentId: string;
  amount?: number; // Amount in cents (optional - full refund if not provided)
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
  metadata?: Record<string, string>;
}): Promise<Stripe.Refund> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.refunds.create({
      payment_intent: params.paymentIntentId,
      amount: params.amount,
      reason: params.reason,
      metadata: params.metadata,
    });
  });
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string = stripeConfig.webhookSecret
): Stripe.Event {
  const stripe = getStripeClient();

  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${(error as Error).message}`);
  }
}

/**
 * Create a customer
 */
export async function createCustomer(params: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Customer> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.customers.create({
      email: params.email,
      name: params.name,
      metadata: params.metadata,
    });
  });
}

/**
 * Retrieve a customer
 */
export async function retrieveCustomer(customerId: string): Promise<Stripe.Customer> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    return await stripe.customers.retrieve(customerId) as Stripe.Customer;
  });
}

/**
 * List payment methods for a customer
 */
export async function listPaymentMethods(
  customerId: string
): Promise<Stripe.PaymentMethod[]> {
  const stripe = getStripeClient();

  return retryOperation(async () => {
    const response = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    return response.data;
  });
}

export default {
  getStripeClient,
  createPaymentIntent,
  retrievePaymentIntent,
  updatePaymentIntent,
  cancelPaymentIntent,
  createRefund,
  verifyWebhookSignature,
  createCustomer,
  retrieveCustomer,
  listPaymentMethods,
};
