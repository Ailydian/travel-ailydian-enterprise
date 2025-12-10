import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { predictPrices } from '@/lib/services/ml-price-predictor';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { entityType, entityId, daysAhead = 7 } = req.body;

    if (!entityType || !entityId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch historical data
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Get last 30 days

    const priceHistory = await prisma.priceHistory.findMany({
      where: {
        entityType,
        entityId,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (priceHistory.length < 7) {
      return res.status(200).json({
        success: true,
        prediction: null,
        message: 'Insufficient data for prediction (minimum 7 days required)',
        confidence: 0,
      });
    }

    // Prepare data for ML prediction
    const historicalPrices = priceHistory.map(h => ({
      date: h.createdAt,
      price: parseFloat(h.price.toString()),
      dayOfWeek: h.createdAt.getDay(),
      dayOfMonth: h.createdAt.getDate(),
      metadata: h.metadata,
    }));

    // Generate predictions using ML service
    const predictions = await predictPrices(historicalPrices, daysAhead);

    // Calculate confidence based on data consistency
    const prices = historicalPrices.map(h => h.price);
    const variance = calculateVariance(prices);
    const meanPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const coefficientOfVariation = Math.sqrt(variance) / meanPrice;

    // Lower CV = higher confidence (max 95%)
    const confidence = Math.min(95, Math.max(50, 100 - (coefficientOfVariation * 100)));

    // Find best booking window
    const bestDayToBuy = predictions.reduce((best, pred, idx) =>
      pred.price < predictions[best].price ? idx : best, 0
    );

    return res.status(200).json({
      success: true,
      predictions,
      confidence: Math.round(confidence),
      bestDayToBuy: {
        day: bestDayToBuy + 1,
        date: predictions[bestDayToBuy].date,
        price: predictions[bestDayToBuy].price,
        savings: predictions[predictions.length - 1].price - predictions[bestDayToBuy].price,
      },
      currentPrice: prices[prices.length - 1],
      stats: {
        historicalDataPoints: priceHistory.length,
        meanPrice: meanPrice.toFixed(2),
        priceVolatility: coefficientOfVariation < 0.1 ? 'low' : coefficientOfVariation < 0.2 ? 'medium' : 'high',
      },
    });
  } catch (error) {
    console.error('Error predicting prices:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateVariance(prices: number[]): number {
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / prices.length;
}
