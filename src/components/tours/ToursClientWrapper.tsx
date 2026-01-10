/**
 * Tours Client Wrapper - Client-side animations ONLY
 * Framer Motion components that cannot run on server
 * @client-side-only
 */

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with ssr: false - animations load after hydration
const NeoHero = dynamic(() => import('../neo-glass/NeoHero'), { ssr: false });

interface ToursClientWrapperProps {
  tourCount: number;
  averageRating: number;
  totalReviews: number;
}

export const ToursClientWrapper: React.FC<ToursClientWrapperProps> = ({
  tourCount,
  averageRating,
  totalReviews,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side: render placeholder
  if (!mounted) {
    return (
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Unutulmaz Turlar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12">
            Türkiye'nin en güzel köşelerinde eşsiz deneyimler sizi bekliyor
          </p>
        </div>
      </section>
    );
  }

  // Client-side: render full animation
  return (
    <NeoHero
      title="Unutulmaz Turlar"
      subtitle="Türkiye'nin en güzel köşelerinde eşsiz deneyimler sizi bekliyor"
      gradient="twilight"
      height="70vh"
      overlayOpacity={0.2}
      showFloatingElements={true}>

      {/* Stats Cards with Glassmorphism */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6">
          <div className="text-5xl font-black text-white mb-2">{tourCount}</div>
          <div className="text-sm uppercase tracking-widest text-white/80">Benzersiz Tur</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6">
          <div className="text-5xl font-black text-white mb-2">{averageRating.toFixed(1)}</div>
          <div className="text-sm uppercase tracking-widest text-white/80">Ortalama Puan</div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6">
          <div className="text-5xl font-black text-white mb-2">{totalReviews.toLocaleString('tr-TR')}</div>
          <div className="text-sm uppercase tracking-widest text-white/80">Mutlu Misafir</div>
        </div>
      </div>
    </NeoHero>
  );
};

export default ToursClientWrapper;
