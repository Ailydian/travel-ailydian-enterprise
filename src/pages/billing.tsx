import React from 'react';
import Head from 'next/head';
import { TravelBlockchain } from '../components/blockchain';
import NavigationHeader from '../components/layout/NavigationHeader';

const BillingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Billing & Crypto Payments - Ailydian Travel</title>
        <meta name="description" content="Manage your payments, NFT travel memories, and cryptocurrency transactions securely" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationHeader />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <TravelBlockchain />
      </main>
    </>
  );
};

export default BillingPage;