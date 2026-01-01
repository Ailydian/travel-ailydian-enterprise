/**
 * Payment Success Page
 * Displays success message after successful payment
 */

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PaymentSuccess } from '@/components/payment';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { bookingId, paymentIntentId, amount, email } = router.query;

  return (
    <>
      <Head>
        <title>Payment Successful - Travel Ailydian</title>
        <meta name="robots" content="noindex" />
      </Head>

      <PaymentSuccess
        bookingId={bookingId as string}
        paymentIntentId={paymentIntentId as string}
        amount={amount ? parseFloat(amount as string) : undefined}
        customerEmail={email as string}
      />
    </>
  );
}
