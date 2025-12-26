import React from 'react';
import Head from 'next/head';
import { TravelBlockchain } from '../components/blockchain';

const BlockchainPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Blockchain Travel - Travel LyDian Enterprise</title>
        <meta name="description" content="NFT seyahat anıları, kripto ödemeler ve merkezi olmayan değerlendirmeler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <TravelBlockchain />
      </main>
    </>
  );
};

export default BlockchainPage;