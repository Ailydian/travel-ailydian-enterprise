/**
 * Stripe Checkout Component
 * Handles payment collection using Stripe Elements
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { stripeConfig, formatAmount } from '@/lib/stripe/config';

// Load Stripe
const stripePromise = loadStripe(stripeConfig.publishableKey);

export interface StripeCheckoutProps {
  amount: number; // Amount in dollars
  bookingId: string;
  customerEmail: string;
  customerName?: string;
  description?: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

/**
 * Payment Form Component (wrapped in Elements)
 */
function PaymentForm({
  amount,
  bookingId,
  customerEmail,
  customerName,
  description,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Create payment intent on mount
  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            bookingId,
            customerEmail,
            customerName,
            description,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize payment';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    }

    createPaymentIntent();
  }, [amount, bookingId, customerEmail, customerName, description, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Confirm payment
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?bookingId=${bookingId}`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        throw new Error(submitError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm with backend
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to confirm payment');
        }

        onSuccess?.(paymentIntent.id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lydian-info-hover"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-lydian-bg-surface p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lydian-text-secondary font-medium">Total Amount:</span>
          <span className="text-2xl font-bold text-lydian-text">
            {formatAmount(amount * 100)}
          </span>
        </div>
      </div>

      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-lydian-primary-hover px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-lydian-primary hover:bg-lydian-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-lydian-text-inverse font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-lydian-text-inverse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay ${formatAmount(amount * 100)}`
        )}
      </button>

      <p className="text-xs text-lydian-text-muted text-center">
        Your payment is secured by Stripe. We never store your card details.
      </p>
    </form>
  );
}

/**
 * Stripe Checkout Component (with Elements Provider)
 */
export default function StripeCheckout(props: StripeCheckoutProps) {
  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: Math.round(props.amount * 100), // Convert to cents
    currency: stripeConfig.currency,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: 'var(--lydian-info-hover)',
        colorBackground: 'var(--lydian-text-inverse)',
        colorText: '#1f2937',
        colorDanger: 'var(--lydian-primary)',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm {...props} />
    </Elements>
  );
}
