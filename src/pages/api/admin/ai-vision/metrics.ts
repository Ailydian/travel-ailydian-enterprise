/**
 * AI Vision Metrics API
 * Get aggregated AI and vision metrics
 *
 * @endpoint GET /api/admin/ai-vision/metrics
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';
import { prisma } from '../../../../lib/prisma';

// ============================================
// TYPES
// ============================================

interface AIMetrics {
  readonly totalRequests: number;
  readonly totalCost: number;
  readonly avgResponseTime: number;
  readonly successRate: number;
  readonly totalTokens: number;
  readonly activeProviders: number;
  readonly errorRate: number;
}

interface MetricsResponse {
  readonly metrics: AIMetrics;
  readonly timestamp: string;
}

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetricsResponse | { error: string }>
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
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Fetch aggregated metrics from AI usage logs
    const logs = await prisma.aIUsageLog.findMany({
      where: {
        createdAt: {
          gte: since,
        },
      },
      select: {
        success: true,
        responseTime: true,
        cost: true,
        tokensUsed: true,
        provider: true,
      },
    });

    if (logs.length === 0) {
      return res.status(200).json({
        metrics: {
          totalRequests: 0,
          totalCost: 0,
          avgResponseTime: 0,
          successRate: 0,
          totalTokens: 0,
          activeProviders: 0,
          errorRate: 0,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Calculate metrics
    const totalRequests = logs.length;
    const successfulRequests = logs.filter((log) => log.success).length;
    const totalCost = logs.reduce((sum, log) => sum + log.cost, 0);
    const totalResponseTime = logs.reduce((sum, log) => sum + log.responseTime, 0);
    const totalTokens = logs.reduce((sum, log) => sum + log.tokensUsed, 0);

    const avgResponseTime = totalResponseTime / totalRequests;
    const successRate = successfulRequests / totalRequests;
    const errorRate = 1 - successRate;

    // Count active providers (providers with at least one request)
    const activeProviders = new Set(logs.map((log) => log.provider)).size;

    const metrics: AIMetrics = {
      totalRequests,
      totalCost,
      avgResponseTime,
      successRate,
      totalTokens,
      activeProviders,
      errorRate,
    };

    logger.info('AI metrics calculated', {
      hours,
      metrics,
    });

    return res.status(200).json({
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to calculate AI metrics', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}
