/**
 * Dynamic Component Imports for Code Splitting
 * Reduces initial bundle size, faster first paint
 */

import dynamic from 'next/dynamic';

// Heavy components - load on demand
export const DynamicVideoHero = dynamic(
  () => import('./ui/VideoHero').then((mod) => mod.VideoHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 to-black animate-pulse" />
    ),
  }
);

export const DynamicFilterSidebar = dynamic(
  () => import('./booking/FilterSidebar').then((mod) => mod.FilterSidebar),
  {
    ssr: true,
    loading: () => (
      <div className="w-64 h-screen bg-gray-900/50 animate-pulse rounded-lg" />
    ),
  }
);

export const DynamicBookingProductCard = dynamic(
  () => import('./booking/BookingProductCard').then((mod) => mod.BookingProductCard),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-96 bg-gray-900/50 animate-pulse rounded-xl" />
    ),
  }
);

export const DynamicNeoHero = dynamic(
  () => import('./neo-glass').then((mod) => mod.NeoHero),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-screen bg-gradient-to-br from-blue-900 to-purple-900 animate-pulse" />
    ),
  }
);

export const DynamicFuturisticCard = dynamic(
  () => import('./neo-glass').then((mod) => mod.FuturisticCard),
  {
    ssr: true,
  }
);

export const DynamicNeoSection = dynamic(
  () => import('./neo-glass').then((mod) => mod.NeoSection),
  {
    ssr: true,
  }
);

export const DynamicAnimatedCarSVG = dynamic(
  () => import('./icons/AnimatedCarSVG').then((mod) => mod.AnimatedCarSVG),
  {
    ssr: false,
    loading: () => (
      <div className="w-24 h-24 bg-gray-700 animate-pulse rounded-full" />
    ),
  }
);

export const DynamicMinimalistHero = dynamic(
  () => import('./minimalist').then((mod) => mod.MinimalistHero),
  {
    ssr: true,
  }
);

export const DynamicScrollReveal = dynamic(
  () => import('./minimalist').then((mod) => mod.ScrollReveal),
  {
    ssr: false,
  }
);

// Mobile-optimized: Load BookingFooter last
export const DynamicBookingFooter = dynamic(
  () => import('./layout/BookingFooter').then((mod) => mod.BookingFooter),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-96 bg-gray-900 animate-pulse" />
    ),
  }
);

// Ecosystem footer - load on scroll
export const DynamicLyDianEcosystemFooter = dynamic(
  () => import('./LyDianEcosystemFooter').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);
