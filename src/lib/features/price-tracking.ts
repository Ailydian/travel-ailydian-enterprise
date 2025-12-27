/**
 * Price Tracking & Alert System (Production-Grade)
 * Real-time price monitoring with intelligent notifications
 * Backend Architect Agent Implementation
 */

import { prisma, trackedQuery } from '../database/prisma-client';
import { captureException, trackMetric } from '../monitoring/sentry';
import { Decimal } from '@prisma/client/runtime/library';

// ==========================================
// TYPES
// ==========================================

export type EntityType = 'HOTEL' | 'FLIGHT' | 'TOUR' | 'CAR_RENTAL' | 'TRANSFER';

export type PricePoint = {
  price: Decimal;
  currency: string;
  metadata?: any;
  source?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  travelDate?: Date;
};

export type PriceAlertConfig = {
  userId: string;
  entityType: EntityType;
  entityId: string;
  entityName: string;
  targetPrice: Decimal;
  currentPrice: Decimal;
  currency: string;
  priceDropPercentage?: Decimal;
  expiresAt?: Date;
  notificationMethods: string[];
  metadata?: any;
};

// ==========================================
// PRICE HISTORY TRACKING
// ==========================================

export class PriceTracker {
  /**
   * Record new price point
   */
  public static async recordPrice(
    entityType: EntityType,
    entityId: string,
    priceData: PricePoint
  ): Promise<void> {
    try {
      await trackedQuery('recordPrice', async () => {
        return prisma.priceHistory.create({
          data: {
            entityType,
            entityId,
            price: priceData.price,
            currency: priceData.currency,
            metadata: priceData.metadata,
            source: priceData.source,
            checkInDate: priceData.checkInDate,
            checkOutDate: priceData.checkOutDate,
            travelDate: priceData.travelDate,
          },
        });
      });

      trackMetric('price.recorded', 1, 'count', {
        entityType,
        source: priceData.source,
      });

      // Check for price alerts
      await this.checkPriceAlerts(entityType, entityId, priceData.price);
    } catch (error) {
      captureException(error, { entityType, entityId });
    }
  }

  /**
   * Get price history for entity
   */
  public static async getPriceHistory(
    entityType: EntityType,
    entityId: string,
    days: number = 30
  ): Promise<any[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return trackedQuery('getPriceHistory', async () => {
      return prisma.priceHistory.findMany({
        where: {
          entityType,
          entityId,
          createdAt: { gte: since },
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  }

  /**
   * Get current price (latest)
   */
  public static async getCurrentPrice(
    entityType: EntityType,
    entityId: string
  ): Promise<Decimal | null> {
    const latest = await trackedQuery('getCurrentPrice', async () => {
      return prisma.priceHistory.findFirst({
        where: { entityType, entityId },
        orderBy: { createdAt: 'desc' },
        select: { price: true },
      });
    });

    return latest?.price || null;
  }

  /**
   * Calculate price statistics
   */
  public static async getPriceStats(
    entityType: EntityType,
    entityId: string,
    days: number = 30
  ): Promise<{
    current: Decimal;
    lowest: Decimal;
    highest: Decimal;
    average: Decimal;
    trend: 'up' | 'down' | 'stable';
  }> {
    const history = await this.getPriceHistory(entityType, entityId, days);

    if (history.length === 0) {
      throw new Error('No price history available');
    }

    const prices = history.map((h) => parseFloat(h.price.toString()));
    const current = new Decimal(prices[0]);
    const lowest = new Decimal(Math.min(...prices));
    const highest = new Decimal(Math.max(...prices));
    const average = new Decimal(
      prices.reduce((a, b) => a + b, 0) / prices.length
    );

    // Determine trend (compare first 1/3 vs last 1/3 of data)
    const third = Math.floor(prices.length / 3);
    const recentAvg = prices.slice(0, third).reduce((a, b) => a + b, 0) / third;
    const oldAvg = prices.slice(-third).reduce((a, b) => a + b, 0) / third;
    const trend =
      recentAvg > oldAvg * 1.05 ? 'up' : recentAvg < oldAvg * 0.95 ? 'down' : 'stable';

    return { current, lowest, highest, average, trend };
  }

  /**
   * Check if price alerts should be triggered
   */
  private static async checkPriceAlerts(
    entityType: EntityType,
    entityId: string,
    newPrice: Decimal
  ): Promise<void> {
    const alerts = await prisma.priceAlert.findMany({
      where: {
        entityType,
        entityId,
        status: 'ACTIVE',
      },
      include: { user: true },
    });

    for (const alert of alerts) {
      let shouldTrigger = false;

      // Check target price
      if (newPrice.lte(alert.targetPrice)) {
        shouldTrigger = true;
      }

      // Check percentage drop
      if (alert.priceDropPercentage && alert.currentPrice) {
        const dropPercentage = alert.currentPrice
          .sub(newPrice)
          .div(alert.currentPrice)
          .mul(100);

        if (dropPercentage.gte(alert.priceDropPercentage)) {
          shouldTrigger = true;
        }
      }

      if (shouldTrigger) {
        await this.triggerAlert(alert.id, newPrice);
      }
    }
  }

  /**
   * Trigger price alert
   */
  private static async triggerAlert(
    alertId: string,
    newPrice: Decimal
  ): Promise<void> {
    try {
      // Update alert
      const alert = await prisma.priceAlert.update({
        where: { id: alertId },
        data: {
          status: 'TRIGGERED',
          lastNotifiedAt: new Date(),
          notificationCount: { increment: 1 },
          currentPrice: newPrice,
        },
        include: { user: true },
      });

      // Send notifications
      await this.sendNotifications(alert);

      trackMetric('price_alert.triggered', 1, 'count', {
        entityType: alert.entityType,
      });
    } catch (error) {
      captureException(error, { alertId });
    }
  }

  /**
   * Send alert notifications
   */
  private static async sendNotifications(alert: any): Promise<void> {
    const methods = alert.notificationMethod || ['EMAIL'];

    for (const method of methods) {
      switch (method) {
        case 'EMAIL':
          // TODO: Implement email notification
          console.log(`Email alert: ${alert.entityName} dropped to ${alert.currentPrice}`);
          break;

        case 'PUSH':
          // TODO: Implement push notification
          console.log(`Push alert: ${alert.entityName}`);
          break;

        case 'SMS':
          // TODO: Implement SMS notification
          console.log(`SMS alert: ${alert.entityName}`);
          break;
      }
    }
  }
}

// ==========================================
// PRICE ALERT MANAGEMENT
// ==========================================

export class PriceAlertManager {
  /**
   * Create price alert
   */
  public static async createAlert(config: PriceAlertConfig): Promise<any> {
    return trackedQuery('createPriceAlert', async () => {
      return prisma.priceAlert.create({
        data: {
          userId: config.userId,
          entityType: config.entityType,
          entityId: config.entityId,
          entityName: config.entityName,
          targetPrice: config.targetPrice,
          currentPrice: config.currentPrice,
          currency: config.currency,
          priceDropPercentage: config.priceDropPercentage,
          expiresAt: config.expiresAt,
          notificationMethod: config.notificationMethods,
          metadata: config.metadata,
          status: 'ACTIVE',
        },
      });
    });
  }

  /**
   * Get user alerts
   */
  public static async getUserAlerts(
    userId: string,
    status?: 'ACTIVE' | 'TRIGGERED' | 'EXPIRED' | 'DISABLED'
  ): Promise<any[]> {
    return trackedQuery('getUserAlerts', async () => {
      return prisma.priceAlert.findMany({
        where: {
          userId,
          ...(status && { status }),
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  }

  /**
   * Update alert
   */
  public static async updateAlert(
    alertId: string,
    updates: Partial<PriceAlertConfig>
  ): Promise<any> {
    return trackedQuery('updatePriceAlert', async () => {
      return prisma.priceAlert.update({
        where: { id: alertId },
        data: updates,
      });
    });
  }

  /**
   * Delete alert
   */
  public static async deleteAlert(alertId: string): Promise<void> {
    await trackedQuery('deletePriceAlert', async () => {
      return prisma.priceAlert.delete({
        where: { id: alertId },
      });
    });
  }

  /**
   * Disable expired alerts (cron job)
   */
  public static async disableExpiredAlerts(): Promise<number> {
    const result = await prisma.priceAlert.updateMany({
      where: {
        status: 'ACTIVE',
        expiresAt: { lte: new Date() },
      },
      data: { status: 'EXPIRED' },
    });

    trackMetric('price_alert.expired', result.count, 'count');
    return result.count;
  }
}

// ==========================================
// WISHLIST / FAVORITES MANAGEMENT
// ==========================================

export class WishlistManager {
  /**
   * Add to wishlist with optional price alert
   */
  public static async addToWishlist(
    userId: string,
    entityType: string,
    entityId: string,
    priceAlertConfig?: {
      targetPrice: Decimal;
      priceDropPercentage?: Decimal;
    }
  ): Promise<any> {
    // Check if already in wishlist
    const existing = await prisma.favorite.findFirst({
      where: { userId, entityType, entityId },
    });

    if (existing) {
      return existing;
    }

    // Add to wishlist
    const favorite = await trackedQuery('addToWishlist', async () => {
      return prisma.favorite.create({
        data: {
          userId,
          entityType,
          entityId,
        },
      });
    });

    // Create price alert if configured
    if (priceAlertConfig) {
      const currentPrice = await PriceTracker.getCurrentPrice(
        entityType as EntityType,
        entityId
      );

      if (currentPrice) {
        await PriceAlertManager.createAlert({
          userId,
          entityType: entityType as EntityType,
          entityId,
          entityName: `${entityType} ${entityId}`,
          targetPrice: priceAlertConfig.targetPrice,
          currentPrice,
          currency: 'TRY',
          priceDropPercentage: priceAlertConfig.priceDropPercentage,
          notificationMethods: ['EMAIL'],
        });
      }
    }

    trackMetric('wishlist.add', 1, 'count', { entityType });
    return favorite;
  }

  /**
   * Remove from wishlist
   */
  public static async removeFromWishlist(
    userId: string,
    entityType: string,
    entityId: string
  ): Promise<void> {
    await trackedQuery('removeFromWishlist', async () => {
      return prisma.favorite.deleteMany({
        where: { userId, entityType, entityId },
      });
    });

    // Also remove associated price alerts
    await prisma.priceAlert.updateMany({
      where: {
        userId,
        entityType,
        entityId,
        status: 'ACTIVE',
      },
      data: { status: 'DISABLED' },
    });

    trackMetric('wishlist.remove', 1, 'count', { entityType });
  }

  /**
   * Get user wishlist
   */
  public static async getWishlist(userId: string): Promise<any[]> {
    return trackedQuery('getWishlist', async () => {
      return prisma.favorite.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });
  }

  /**
   * Check if in wishlist
   */
  public static async isInWishlist(
    userId: string,
    entityType: string,
    entityId: string
  ): Promise<boolean> {
    const count = await prisma.favorite.count({
      where: { userId, entityType, entityId },
    });
    return count > 0;
  }
}
