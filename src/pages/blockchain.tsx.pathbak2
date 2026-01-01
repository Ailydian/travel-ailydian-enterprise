import React from 'react';
import Head from 'next/head';
import { TravelBlockchain } from '../components/blockchain';
import DemoBadge from '../components/ui/DemoBadge';

const BlockchainPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Blockchain Travel - Travel LyDian Enterprise</title>
        <meta name="description" content="NFT seyahat anıları, kripto ödemeler ve merkezi olmayan değerlendirmeler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="absolute top-6 right-6 z-50">
          <DemoBadge
            variant="blockchain"
            size="lg"
            tooltip="This is a simulated blockchain feature. No real transactions occur on the blockchain."
          />
        </div>
        <TravelBlockchain />
      </main>
    </>
  );
};

export default BlockchainPage;