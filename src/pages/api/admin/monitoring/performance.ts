/**
 * Monitoring Performance API
 * Get performance metrics and Web Vitals data
 *
 * @endpoint GET /api/admin/monitoring/performance
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';

// ============================================
// TYPES
// ============================================

interface PerformanceMetrics {
  readonly webVitals: {
    readonly CLS: number | null;
    readonly FCP: number | null;
    readonly FID: number | null;
    readonly INP: number | null;
    readonly LCP: number | null;
    readonly TTFB: number | null;
  };
  readonly customMetrics: ReadonlyArray<{
    readonly name: string;
    readonly value: number;
    readonly rating: 'good' | 'needs-improvement' | 'poor';
  }>;
  readonly resourceMetrics: ReadonlyArray<{
    readonly name: string;
    readonly type: string;
    readonly duration: number;
    readonly size: number;
  }>;
}

interface PerformanceResponse {
  readonly metrics: PerformanceMetrics;
  readonly timestamp: string;
}

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceResponse | { error: string }>
) {
  // Authentication check
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const hours = parseInt(req.query.hours as string) || 24;

    // Get performance metrics
    // In production, this would fetch from Vercel Analytics API or custom analytics storage
    const metrics = await getPerformanceMetrics(hours);

    logger.info('Performance metrics fetched', {
      hours,
    });

    return res.status(200).json({
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch performance metrics', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

async function getPerformanceMetrics(hours: number): Promise<PerformanceMetrics> {
  // In production, fetch from Vercel Analytics or custom analytics storage
  // For now, returning realistic mock data

  return {
    webVitals: {
      CLS: 0.08, // Good: < 0.1
      FCP: 1600, // Good: < 1800ms
      FID: 85, // Good: < 100ms
      INP: 180, // Good: < 200ms
      LCP: 2300, // Good: < 2500ms
      TTFB: 650, // Good: < 800ms
    },
    customMetrics: [
      {
        name: 'API Response Time',
        value: 245,
        rating: 'good',
      },
      {
        name: 'Database Query Time',
        value: 65,
        rating: 'good',
      },
      {
        name: 'Bundle Size',
        value: 320,
        rating: 'needs-improvement',
      },
      {
        name: 'Time to Interactive',
        value: 3200,
        rating: 'needs-improvement',
      },
    ],
    resourceMetrics: [
      {
        name: '/main.js',
        type: 'script',
        duration: 450,
        size: 245000,
      },
      {
        name: '/styles.css',
        type: 'stylesheet',
        duration: 120,
        size: 45000,
      },
      {
        name: '/hero.jpg',
        type: 'image',
        duration: 680,
        size: 850000,
      },
      {
        name: '/api/destinations',
        type: 'fetch',
        duration: 180,
        size: 12000,
      },
    ],
  };
}
