/**
 * Payment Failed Page
 * Displays error message when payment fails
 */

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PaymentFailed } from '@/components/payment';

export default function PaymentFailedPage() {
  const router = useRouter();
  const { bookingId, error } = router.query;

  const handleRetry = () => {
    // Redirect back to checkout page
    router.push({
      pathname: '/payment/checkout',
      query: router.query,
    });
  };

  return (
    <>
      <Head>
        <title>Payment Failed - Travel Ailydian</title>
        <meta name="robots" content="noindex" />
      </Head>

      <PaymentFailed
        bookingId={bookingId as string}
        error={error as string}
        onRetry={handleRetry}
      />
    </>
  );
}
