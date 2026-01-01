/**
 * Payment Failed Component
 * Displays error message when payment fails
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { XCircleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';

export interface PaymentFailedProps {
  bookingId?: string;
  error?: string;
  onRetry?: () => void;
}

export default function PaymentFailed({
  bookingId,
  error,
  onRetry,
}: PaymentFailedProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-lydian-bg rounded-2xl shadow-xl p-8">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-3">
            <XCircleIcon className="h-16 w-16 text-lydian-error" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lydian-text mb-2">
            Payment Failed
          </h1>
          <p className="text-lydian-text-secondary">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>
        </div>

        {/* Error Details */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Error:</span>
              <br />
              {error}
            </p>
          </div>
        )}

        {/* Common Reasons */}
        <div className="bg-lydian-bg-surface rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-lydian-text mb-3">Common reasons for payment failure:</h3>
          <ul className="space-y-2 text-sm text-lydian-text-secondary">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Insufficient funds in your account</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Incorrect card details or expired card</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Card declined by your bank</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Network or connection issues</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center w-full bg-lydian-primary hover:bg-lydian-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Try Again
            </button>
          )}

          {bookingId && (
            <Link
              href={`/bookings/${bookingId}`}
              className="flex items-center justify-center w-full bg-lydian-bg-surface-raised hover:bg-lydian-bg-surface-raised text-lydian-text-secondary font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Back to Booking
            </Link>
          )}

          <Link
            href="/"
            className="flex items-center justify-center w-full bg-lydian-bg-surface-raised hover:bg-lydian-bg-surface-raised text-lydian-text-secondary font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-lydian-border">
          <p className="text-xs text-lydian-text-muted text-center mb-2">
            Need help with your payment?
          </p>
          <div className="text-center">
            <a
              href="mailto:support@holiday.ailydian.com"
              className="text-sm text-lydian-primary hover:underline font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4 bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-800 text-center">
            Your payment details are secure. We use Stripe for payment processing and never store your card information.
          </p>
        </div>
      </div>
    </div>
  );
}
