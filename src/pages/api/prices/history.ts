import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { entityType, entityId, days = 30 } = req.query;

    if (!entityType || !entityId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days as string));

    // Fetch price history
    const priceHistory = await prisma.priceHistory.findMany({
      where: {
        entityType: entityType as string,
        entityId: entityId as string,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (priceHistory.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        stats: {
          count: 0,
          min: null,
          max: null,
          avg: null,
          current: null,
          trend: 'stable',
        },
      });
    }

    // Calculate statistics
    const prices = priceHistory.map(h => parseFloat(h.price.toString()));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const currentPrice = prices[prices.length - 1];

    // Calculate trend (simple: compare first and last price)
    const firstPrice = prices[0];
    const priceDiff = ((currentPrice - firstPrice) / firstPrice) * 100;
    let trend = 'stable';
    if (priceDiff > 5) trend = 'increasing';
    if (priceDiff < -5) trend = 'decreasing';

    // Find best time to book (lowest price point)
    const bestPriceEntry = priceHistory.reduce((min, entry) =>
      parseFloat(entry.price.toString()) < parseFloat(min.price.toString()) ? entry : min
    );

    return res.status(200).json({
      success: true,
      data: priceHistory,
      stats: {
        count: priceHistory.length,
        min: minPrice,
        max: maxPrice,
        avg: avgPrice.toFixed(2),
        current: currentPrice,
        trend,
        priceDiffPercentage: priceDiff.toFixed(2),
        bestTimeToBook: {
          date: bestPriceEntry.createdAt,
          price: parseFloat(bestPriceEntry.price.toString()),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching price history:', error as Error, {component:'History'});
    return res.status(500).json({ error: 'Internal server error' });
  }
}
