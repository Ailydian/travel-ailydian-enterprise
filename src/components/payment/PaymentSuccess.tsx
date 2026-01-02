/**
 * Payment Success Component
 * Displays success message after successful payment
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon, DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline';

export interface PaymentSuccessProps {
  bookingId: string;
  paymentIntentId?: string;
  amount?: number;
  customerEmail?: string;
}

export default function PaymentSuccess({
  bookingId,
  paymentIntentId,
  amount,
  customerEmail,
}: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-lydian-bg rounded-2xl shadow-xl p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-600-light rounded-full p-3">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lydian-text mb-2">
            Payment Successful!
          </h1>
          <p className="text-lydian-text-secondary">
            Your booking has been confirmed and payment processed successfully.
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-lydian-bg-surface rounded-lg p-6 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lydian-text-secondary">Booking ID:</span>
            <span className="font-mono text-sm text-lydian-text">{bookingId}</span>
          </div>

          {paymentIntentId && (
            <div className="flex justify-between items-center">
              <span className="text-lydian-text-secondary">Transaction ID:</span>
              <span className="font-mono text-xs text-lydian-text">
                {paymentIntentId.substring(0, 20)}...
              </span>
            </div>
          )}

          {amount && (
            <div className="flex justify-between items-center pt-3 border-t border-white/20">
              <span className="text-lydian-text-secondary font-medium">Amount Paid:</span>
              <span className="text-2xl font-bold text-green-500">
                ${amount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Confirmation Email Notice */}
        {customerEmail && (
          <div className="bg-blue-500-lighter border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Confirmation sent!</span>
              <br />
              A receipt has been sent to {customerEmail}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/bookings/${bookingId}`}
            className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-lydian-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            View Booking Details
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center w-full bg-lydian-bg-surface-raised hover:bg-lydian-bg-surface-raised text-lydian-text-secondary font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-xs text-gray-300 text-center">
            Need help? Contact our support team at{' '}
            <a
              href="mailto:support@holiday.ailydian.com"
              className="text-blue-500 hover:underline"
            >
              support@holiday.ailydian.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
