/**
 * AI Vision Queries API
 * Get vision search query history
 *
 * @endpoint GET /api/admin/ai-vision/queries
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

interface VisionSearchQuery {
  readonly id: string;
  readonly timestamp: string;
  readonly imageUrl: string;
  readonly provider: string;
  readonly model: string;
  readonly results: number;
  readonly confidence: number;
  readonly responseTime: number;
  readonly cost: number;
  readonly userId?: string;
}

interface QueriesResponse {
  readonly queries: readonly VisionSearchQuery[];
  readonly total: number;
  readonly timestamp: string;
}

// ============================================
// HANDLER
// ============================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QueriesResponse | { error: string }>
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
    const limit = parseInt(req.query.limit as string) || 50;
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Fetch vision search queries from database
    const [queries, total] = await Promise.all([
      prisma.visionSearchQuery.findMany({
        where: {
          createdAt: {
            gte: since,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        select: {
          id: true,
          createdAt: true,
          imageUrl: true,
          provider: true,
          model: true,
          resultsCount: true,
          confidence: true,
          responseTime: true,
          cost: true,
          userId: true,
        },
      }),
      prisma.visionSearchQuery.count({
        where: {
          createdAt: {
            gte: since,
          },
        },
      }),
    ]);

    const formattedQueries: VisionSearchQuery[] = queries.map((query) => ({
      id: query.id,
      timestamp: query.createdAt.toISOString(),
      imageUrl: query.imageUrl,
      provider: query.provider,
      model: query.model,
      results: query.resultsCount,
      confidence: query.confidence,
      responseTime: query.responseTime,
      cost: query.cost,
      userId: query.userId || undefined,
    }));

    logger.info('Vision search queries fetched', {
      hours,
      limit,
      count: formattedQueries.length,
      total,
    });

    return res.status(200).json({
      queries: formattedQueries,
      total,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch vision search queries', { error });
    return res.status(500).json({ error: 'Internal server error' });
  }
}
