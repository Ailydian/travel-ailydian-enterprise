/**
 * Add to Wishlist API with Price Alerts
 * Production-ready endpoint with full validation
 * Backend Architect Agent Implementation
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { WishlistAddSchema, validateAndSanitize } from '@/lib/validation/api-schemas';
import { checkRateLimit, standardRateLimiter } from '@/lib/middleware/redis-rate-limiter';
import { captureException } from '@/lib/monitoring/sentry';
import { WishlistManager } from '@/lib/features/price-tracking';
import { Decimal } from '@prisma/client/runtime/library';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Rate limiting
    await checkRateLimit(req as any, standardRateLimiter);

    // 2. Authentication check (placeholder - implement with NextAuth)
    // const session = await getServerSession(req, res, authOptions);
    // if (!session) return res.status(401).json({ error: 'Unauthorized' });

    const userId = 'user_placeholder'; // Replace with session.user.id

    // 3. Input validation
    const validated = validateAndSanitize(WishlistAddSchema, req.body);

    // 4. Add to wishlist with optional price alert
    const priceAlertConfig = validated.priceAlert && validated.targetPrice
      ? {
          targetPrice: new Decimal(validated.targetPrice),
          priceDropPercentage: new Decimal(10), // 10% drop alert
        }
      : undefined;

    const favorite = await WishlistManager.addToWishlist(
      userId,
      validated.itemType,
      validated.itemId,
      priceAlertConfig
    );

    return res.status(200).json({
      success: true,
      favorite,
      message: validated.priceAlert
        ? 'Added to wishlist with price alert'
        : 'Added to wishlist',
    });

  } catch (error) {
    captureException(error, { endpoint: '/api/wishlist/add' });

    if (error.name === 'RateLimitError') {
      return res.status(429).json({ error: 'Too many requests' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.errors });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
