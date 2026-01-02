/**
 * Payment Checkout Page
 * Example implementation of Stripe payment checkout
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { StripeCheckout } from '@/components/payment';

export default function PaymentCheckoutPage() {
  const router = useRouter();
  const { bookingId, amount, email, name } = router.query;

  const [processing, setProcessing] = useState(false);

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Payment successful:', paymentIntentId);

    // Redirect to success page
    router.push({
      pathname: '/payment/success',
      query: {
        bookingId,
        paymentIntentId,
        amount,
      },
    });
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);

    // Redirect to failure page
    router.push({
      pathname: '/payment/failed',
      query: {
        bookingId,
        error,
      },
    });
  };

  // Validate required parameters
  if (!bookingId || !amount || !email) {
    return (
      <div className="min-h-screen bg-lydian-bg-surface flex items-center justify-center p-4">
        <div className="bg-lydian-bg rounded-lg shadow-md p-8 max-w-md">
          <h1 className="text-2xl font-bold text-lydian-error mb-4">Invalid Payment Link</h1>
          <p className="text-lydian-text-secondary mb-4">
            This payment link is missing required information. Please go back and try again.
          </p>
          <button
            onClick={() => router.back()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-lydian-primary-hover text-white font-semibold py-3 px-6 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Payment Checkout - Travel Ailydian</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-lydian-bg-surface py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-lydian-text mb-2">
              Complete Your Payment
            </h1>
            <p className="text-lydian-text-secondary">
              Secure payment powered by Stripe
            </p>
          </div>

          {/* Booking Summary */}
          <div className="bg-lydian-bg rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-lydian-text mb-4">
              Booking Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-lydian-text-secondary">Booking ID:</span>
                <span className="font-mono text-sm">{bookingId}</span>
              </div>

              {name && (
                <div className="flex justify-between">
                  <span className="text-lydian-text-secondary">Customer:</span>
                  <span className="font-medium">{name}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-lydian-text-secondary">Email:</span>
                <span className="font-medium">{email}</span>
              </div>

              <div className="pt-3 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-lydian-text">Total:</span>
                  <span className="text-2xl font-bold text-blue-500">
                    ${parseFloat(amount as string).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-lydian-bg rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-lydian-text mb-4">
              Payment Details
            </h2>

            <StripeCheckout
              amount={parseFloat(amount as string)}
              bookingId={bookingId as string}
              customerEmail={email as string}
              customerName={name as string}
              description={`Booking ${bookingId}`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-300">
            <p>
              Your payment information is encrypted and secured by Stripe.
              <br />
              We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
