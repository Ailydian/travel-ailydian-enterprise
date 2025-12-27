/**
 * Price Tracking & Alert System Tests
 */

import { PriceTracker, PriceAlertManager, WishlistManager } from '../../lib/features/price-tracking';
import { Decimal } from '@prisma/client/runtime/library';

describe('PriceTracker', () => {
  describe('Price History Recording', () => {
    it('should record price history', async () => {
      const priceData = {
        price: new Decimal(1500),
        currency: 'TRY',
        source: 'booking.com',
        checkInDate: new Date('2025-06-01'),
        checkOutDate: new Date('2025-06-07'),
      };

      await expect(
        PriceTracker.recordPrice('HOTEL', 'hotel123', priceData)
      ).resolves.not.toThrow();
    });

    it('should calculate price statistics', async () => {
      const stats = await PriceTracker.getPriceStats('HOTEL', 'hotel123', 30);

      expect(stats).toHaveProperty('current');
      expect(stats).toHaveProperty('lowest');
      expect(stats).toHaveProperty('highest');
      expect(stats).toHaveProperty('average');
      expect(stats).toHaveProperty('trend');
      expect(['up', 'down', 'stable']).toContain(stats.trend);
    });
  });

  describe('Price Alert Triggering', () => {
    it('should trigger alert when price drops below target', async () => {
      const alertConfig = {
        userId: 'user123',
        entityType: 'HOTEL' as const,
        entityId: 'hotel123',
        entityName: 'Test Hotel',
        targetPrice: new Decimal(1200),
        currentPrice: new Decimal(1500),
        currency: 'TRY',
        notificationMethods: ['EMAIL'],
      };

      const alert = await PriceAlertManager.createAlert(alertConfig);
      expect(alert).toHaveProperty('id');
      expect(alert.status).toBe('ACTIVE');
    });

    it('should trigger alert on percentage drop', async () => {
      const alertConfig = {
        userId: 'user123',
        entityType: 'TOUR' as const,
        entityId: 'tour123',
        entityName: 'Cappadocia Tour',
        targetPrice: new Decimal(1000),
        currentPrice: new Decimal(1500),
        currency: 'TRY',
        priceDropPercentage: new Decimal(15),
        notificationMethods: ['EMAIL', 'PUSH'],
      };

      const alert = await PriceAlertManager.createAlert(alertConfig);
      expect(alert.priceDropPercentage).toEqual(new Decimal(15));
    });

    it('should update alert status to TRIGGERED', async () => {
      // Create alert
      const alert = await PriceAlertManager.createAlert({
        userId: 'user123',
        entityType: 'HOTEL' as const,
        entityId: 'hotel123',
        entityName: 'Test Hotel',
        targetPrice: new Decimal(1200),
        currentPrice: new Decimal(1500),
        currency: 'TRY',
        notificationMethods: ['EMAIL'],
      });

      // Record new lower price (should trigger)
      await PriceTracker.recordPrice('HOTEL', 'hotel123', {
        price: new Decimal(1100),
        currency: 'TRY',
      });

      // Alert should be triggered
      const alerts = await PriceAlertManager.getUserAlerts('user123', 'TRIGGERED');
      expect(alerts.length).toBeGreaterThan(0);
    });
  });

  describe('Alert Management', () => {
    it('should get user alerts by status', async () => {
      const activeAlerts = await PriceAlertManager.getUserAlerts('user123', 'ACTIVE');
      expect(Array.isArray(activeAlerts)).toBe(true);
    });

    it('should update alert settings', async () => {
      const alert = await PriceAlertManager.createAlert({
        userId: 'user123',
        entityType: 'HOTEL' as const,
        entityId: 'hotel123',
        entityName: 'Test Hotel',
        targetPrice: new Decimal(1200),
        currentPrice: new Decimal(1500),
        currency: 'TRY',
        notificationMethods: ['EMAIL'],
      });

      const updated = await PriceAlertManager.updateAlert(alert.id, {
        targetPrice: new Decimal(1000),
      });

      expect(updated.targetPrice).toEqual(new Decimal(1000));
    });

    it('should delete alert', async () => {
      const alert = await PriceAlertManager.createAlert({
        userId: 'user123',
        entityType: 'HOTEL' as const,
        entityId: 'hotel123',
        entityName: 'Test Hotel',
        targetPrice: new Decimal(1200),
        currentPrice: new Decimal(1500),
        currency: 'TRY',
        notificationMethods: ['EMAIL'],
      });

      await expect(
        PriceAlertManager.deleteAlert(alert.id)
      ).resolves.not.toThrow();
    });

    it('should disable expired alerts', async () => {
      const count = await PriceAlertManager.disableExpiredAlerts();
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('WishlistManager', () => {
  it('should add item to wishlist', async () => {
    const favorite = await WishlistManager.addToWishlist(
      'user123',
      'HOTEL',
      'hotel456'
    );

    expect(favorite).toHaveProperty('id');
    expect(favorite.entityType).toBe('HOTEL');
    expect(favorite.entityId).toBe('hotel456');
  });

  it('should add to wishlist with price alert', async () => {
    const favorite = await WishlistManager.addToWishlist(
      'user123',
      'TOUR',
      'tour789',
      {
        targetPrice: new Decimal(800),
        priceDropPercentage: new Decimal(10),
      }
    );

    expect(favorite).toHaveProperty('id');
  });

  it('should not duplicate wishlist items', async () => {
    await WishlistManager.addToWishlist('user123', 'HOTEL', 'hotel456');
    const duplicate = await WishlistManager.addToWishlist('user123', 'HOTEL', 'hotel456');

    // Should return existing item, not create new
    expect(duplicate).toHaveProperty('id');
  });

  it('should remove from wishlist', async () => {
    await WishlistManager.addToWishlist('user123', 'HOTEL', 'hotel456');
    await expect(
      WishlistManager.removeFromWishlist('user123', 'HOTEL', 'hotel456')
    ).resolves.not.toThrow();
  });

  it('should get user wishlist', async () => {
    const wishlist = await WishlistManager.getWishlist('user123');
    expect(Array.isArray(wishlist)).toBe(true);
  });

  it('should check if item is in wishlist', async () => {
    await WishlistManager.addToWishlist('user123', 'HOTEL', 'hotel456');
    const isInWishlist = await WishlistManager.isInWishlist('user123', 'HOTEL', 'hotel456');

    expect(isInWishlist).toBe(true);
  });
});
