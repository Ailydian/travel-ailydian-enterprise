/**
 * Analytics Provider
 * Unified analytics with Vercel Analytics + Custom tracking
 *
 * @component AnalyticsProvider
 * @realtime Web Vitals tracking
 */

'use client';

import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { initializePerformanceMonitoring } from '../../lib/monitoring/performance-monitor';

// ============================================
// TYPES
// ============================================

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// ============================================
// ANALYTICS PROVIDER
// ============================================

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize custom performance monitoring
    initializePerformanceMonitoring();

    // Log analytics initialization
    console.log('[Analytics] Initialized:', {
      vercel: Boolean(process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID),
      custom: true,
      environment: process.env.NODE_ENV,
    });
  }, []);

  return (
    <>
      {children}

      {/* Vercel Analytics */}
      <Analytics
        beforeSend={(event) => {
          // Filter events if needed
          if (event.url.includes('localhost') && process.env.NODE_ENV === 'production') {
            return null;
          }
          return event;
        }}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights
        sampleRate={process.env.NODE_ENV === 'production' ? 0.1 : 1.0}
      />
    </>
  );
};

export default AnalyticsProvider;
