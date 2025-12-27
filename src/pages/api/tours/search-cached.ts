/**
 * Tour Search API with Hybrid Caching (Example)
 * Demonstrates L1+L2 cache usage in production API
 * Backend Architect Agent Implementation
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { TourSearchSchema, validateAndSanitize } from '@/lib/validation/api-schemas';
import { checkRateLimit, searchRateLimiter } from '@/lib/middleware/redis-rate-limiter';
import { captureException, measurePerformance } from '@/lib/monitoring/sentry';
import { tourCacheManager, CacheKeyBuilder } from '@/lib/cache/hybrid-cache';

// ==========================================
// TOUR SEARCH WITH CACHING
// ==========================================

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Rate limiting (30 req/min)
    await checkRateLimit(req as any, searchRateLimiter);

    // 2. Input validation
    const validated = validateAndSanitize(TourSearchSchema, req.body);

    // 3. Generate cache key from search params
    const cacheKey = new CacheKeyBuilder('search')
      .addParams({
        destination: validated.destination,
        dateRange: validated.dateRange,
        priceRange: validated.priceRange,
        guests: validated.guests,
        categories: validated.categories,
        rating: validated.rating,
        sortBy: validated.sortBy,
        sortOrder: validated.sortOrder,
      })
      .build();

    // 4. Try cache first (L1 → L2 → Database)
    const results = await tourCacheManager.getOrCompute(
      cacheKey,
      async () => {
        // Database query (only if cache miss)
        return measurePerformance('searchTours', async () => {
          // This would be replaced with actual Prisma query
          const tours = await performDatabaseSearch(validated);
          return tours;
        });
      },
      {
        ttl: 300, // 5 minutes
        tags: ['tours', `destination:${validated.destination}`],
        compress: true, // Compress large result sets
      }
    );

    // 5. Return cached or fresh results
    return res.status(200).json({
      success: true,
      results,
      cached: true, // You can track cache hit/miss in response
    });

  } catch (error) {
    captureException(error, { endpoint: '/api/tours/search-cached' });

    if (error.name === 'RateLimitError') {
      return res.status(429).json({ error: 'Too many requests' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.errors });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ==========================================
// DATABASE SEARCH (EXAMPLE)
// ==========================================

async function performDatabaseSearch(params: any): Promise<any[]> {
  // This would use Prisma in production
  // Example structure:

  /*
  const tours = await prisma.tour.findMany({
    where: {
      destination: params.destination,
      price: {
        gte: params.priceRange?.min,
        lte: params.priceRange?.max,
      },
      maxGuests: {
        gte: params.guests,
      },
      rating: {
        gte: params.rating,
      },
      ...(params.categories && {
        category: { in: params.categories },
      }),
    },
    orderBy: {
      [params.sortBy]: params.sortOrder,
    },
    include: {
      images: true,
      reviews: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return tours;
  */

  // Placeholder return
  return [
    {
      id: '1',
      title: 'Cappadocia Hot Air Balloon',
      destination: params.destination,
      price: 1500,
      rating: 4.8,
    },
  ];
}
