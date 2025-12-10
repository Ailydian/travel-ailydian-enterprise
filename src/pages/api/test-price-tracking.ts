import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { savePriceData } from '@/lib/services/price-data-collector';
import { predictPrices } from '@/lib/services/ml-price-predictor';

/**
 * Test endpoint for price tracking system
 *
 * Usage:
 * GET /api/test-price-tracking?action=seed
 * GET /api/test-price-tracking?action=predict
 * GET /api/test-price-tracking?action=stats
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action = 'seed' } = req.query;

  try {
    switch (action) {
      case 'seed':
        // Generate test price data
        await seedTestPriceData();
        return res.status(200).json({
          success: true,
          message: 'Test price data seeded successfully',
        });

      case 'predict':
        // Test ML predictions
        const predictions = await testPredictions();
        return res.status(200).json({
          success: true,
          predictions,
        });

      case 'stats':
        // Get statistics
        const stats = await getTestStats();
        return res.status(200).json({
          success: true,
          stats,
        });

      case 'clean':
        // Clean test data
        await cleanTestData();
        return res.status(200).json({
          success: true,
          message: 'Test data cleaned',
        });

      default:
        return res.status(400).json({
          error: 'Invalid action. Use: seed, predict, stats, or clean',
        });
    }
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return res.status(500).json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function seedTestPriceData() {
  const testEntityId = 'test-hotel-istanbul-001';

  // Generate 30 days of realistic price data
  const basePrice = 1500; // TRY
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate realistic price fluctuations
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Weekend prices are higher
    let price = basePrice;
    if (isWeekend) {
      price *= 1.2;
    }

    // Add some randomness (-10% to +10%)
    price *= 1 + (Math.random() * 0.2 - 0.1);

    // Add seasonal trend (decreasing over time for this test)
    price *= 1 - (i * 0.01);

    // Round to 2 decimals
    price = Math.round(price * 100) / 100;

    await savePriceData({
      entityType: 'HOTEL',
      entityId: testEntityId,
      price,
      currency: 'TRY',
      source: 'TEST_DATA',
      metadata: {
        roomType: 'Deluxe Suite',
        location: 'Istanbul, Sultanahmet',
        guests: 2,
      },
      checkInDate: new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days ahead
      checkOutDate: new Date(date.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days ahead
    });
  }

  console.log('Seeded 30 days of test price data');
}

async function testPredictions() {
  const testEntityId = 'test-hotel-istanbul-001';

  // Fetch historical data
  const priceHistory = await prisma.priceHistory.findMany({
    where: {
      entityType: 'HOTEL',
      entityId: testEntityId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (priceHistory.length < 7) {
    throw new Error('Not enough historical data. Run seed action first.');
  }

  // Prepare data for ML
  const historicalPrices = priceHistory.map((h) => ({
    date: h.createdAt,
    price: parseFloat(h.price.toString()),
    dayOfWeek: h.createdAt.getDay(),
    dayOfMonth: h.createdAt.getDate(),
    metadata: h.metadata,
  }));

  // Generate predictions
  const predictions = await predictPrices(historicalPrices, 7);

  return {
    historicalDataPoints: priceHistory.length,
    predictions,
    lastHistoricalPrice: historicalPrices[historicalPrices.length - 1].price,
  };
}

async function getTestStats() {
  const testEntityId = 'test-hotel-istanbul-001';

  const priceHistory = await prisma.priceHistory.findMany({
    where: {
      entityType: 'HOTEL',
      entityId: testEntityId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (priceHistory.length === 0) {
    return {
      message: 'No test data found. Run seed action first.',
    };
  }

  const prices = priceHistory.map((h) => parseFloat(h.price.toString()));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  return {
    entityId: testEntityId,
    dataPoints: priceHistory.length,
    dateRange: {
      start: priceHistory[0].createdAt,
      end: priceHistory[priceHistory.length - 1].createdAt,
    },
    priceStats: {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      current: prices[prices.length - 1].toFixed(2),
    },
    sampleData: priceHistory.slice(-5).map((h) => ({
      date: h.createdAt,
      price: parseFloat(h.price.toString()).toFixed(2),
    })),
  };
}

async function cleanTestData() {
  const result = await prisma.priceHistory.deleteMany({
    where: {
      entityId: {
        startsWith: 'test-',
      },
    },
  });

  console.log(`Cleaned ${result.count} test price records`);
}
