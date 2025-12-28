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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Payment Link</h1>
          <p className="text-gray-600 mb-4">
            This payment link is missing required information. Please go back and try again.
          </p>
          <button
            onClick={() => router.back()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
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

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">
              Secure payment powered by Stripe
            </p>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Booking Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono text-sm">{bookingId}</span>
              </div>

              {name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{name}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{email}</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${parseFloat(amount as string).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
          <div className="mt-6 text-center text-sm text-gray-500">
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
