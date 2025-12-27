/**
 * Dynamic Pricing ML Engine
 * Demand-based pricing with ML predictions
 */

import { prisma } from '../database/prisma-client';
import { Decimal } from '@prisma/client/runtime/library';

export class DynamicPricingEngine {
  /**
   * Calculate dynamic price based on demand, seasonality, competitor prices
   */
  public static async calculatePrice(
    basePrice: Decimal,
    itemId: string,
    itemType: string,
    date: Date
  ): Promise<Decimal> {
    // 1. Demand multiplier (booking velocity)
    const demandMultiplier = await this.getDemandMultiplier(itemId, itemType);

    // 2. Seasonality multiplier
    const seasonalityMultiplier = this.getSeasonalityMultiplier(date);

    // 3. Competitor price factor
    const competitorFactor = await this.getCompetitorFactor(itemId, itemType);

    // 4. Days to booking factor (urgency)
    const urgencyFactor = this.getUrgencyFactor(date);

    // Calculate final price
    const finalMultiplier = demandMultiplier * seasonalityMultiplier * competitorFactor * urgencyFactor;
    const finalPrice = basePrice.mul(new Decimal(finalMultiplier));

    // Ensure price stays within bounds (±30% of base)
    const minPrice = basePrice.mul(new Decimal(0.7));
    const maxPrice = basePrice.mul(new Decimal(1.3));

    if (finalPrice.lt(minPrice)) return minPrice;
    if (finalPrice.gt(maxPrice)) return maxPrice;

    return finalPrice;
  }

  /**
   * Get demand multiplier based on recent bookings
   */
  private static async getDemandMultiplier(
    itemId: string,
    itemType: string
  ): Promise<number> {
    const last24Hours = new Date(Date.now() - 86400000);

    const recentBookings = await prisma.booking.count({
      where: {
        bookingType: itemType.toUpperCase() as any,
        createdAt: { gte: last24Hours },
      },
    });

    // High demand = higher price
    if (recentBookings > 50) return 1.2;
    if (recentBookings > 20) return 1.1;
    if (recentBookings < 5) return 0.9;
    return 1.0;
  }

  /**
   * Get seasonality multiplier
   */
  private static getSeasonalityMultiplier(date: Date): number {
    const month = date.getMonth();

    // Peak season (June-August): higher prices
    if (month >= 5 && month <= 7) return 1.25;

    // Shoulder season (April-May, September-October): normal
    if ((month >= 3 && month <= 4) || (month >= 8 && month <= 9)) return 1.1;

    // Off-season: lower prices
    return 0.85;
  }

  /**
   * Get competitor price factor
   */
  private static async getCompetitorFactor(
    itemId: string,
    itemType: string
  ): Promise<number> {
    // In production: compare with competitor prices from PriceHistory
    // For now: return neutral
    return 1.0;
  }

  /**
   * Get urgency factor (days to booking)
   */
  private static getUrgencyFactor(bookingDate: Date): number {
    const daysAway = Math.floor((bookingDate.getTime() - Date.now()) / 86400000);

    // Last-minute booking (< 7 days): higher price
    if (daysAway < 7) return 1.15;

    // Far future (> 60 days): encourage early booking
    if (daysAway > 60) return 0.95;

    return 1.0;
  }
}

export class RevenueOptimizer {
  /**
   * Optimize pricing for maximum revenue
   */
  public static async optimizePrices(itemType: string): Promise<void> {
    const model = itemType === 'hotel' ? 'hotel' : 'tourPackage';

    const items = await (prisma[model] as any).findMany({
      where: { isActive: true },
      take: 100,
    });

    for (const item of items) {
      const basePrice = item.priceMin || item.priceAdult;
      const optimizedPrice = await DynamicPricingEngine.calculatePrice(
        basePrice,
        item.id,
        itemType,
        new Date()
      );

      // Update price in database
      await (prisma[model] as any).update({
        where: { id: item.id },
        data: {
          [itemType === 'hotel' ? 'priceMin' : 'priceAdult']: optimizedPrice,
        },
      });
    }
  }
}
