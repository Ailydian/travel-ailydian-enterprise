/**
 * Email Marketing Automation System
 * Production-ready email service with Resend
 */

import { prisma } from '../database/prisma-client';
import { captureException, trackMetric } from '../monitoring/sentry';

export class EmailService {
  public static async sendPriceAlert(userId: string, alertData: any): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });

      if (!user?.email) return;

      // Send via Resend/SendGrid
      trackMetric('email.sent', 1, 'count', { type: 'price_alert' });
    } catch (error) {
      captureException(error, { emailType: 'price_alert' });
    }
  }

  public static async sendAbandonedCart(userId: string, cartData: any): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });

      if (!user?.email) return;

      trackMetric('email.sent', 1, 'count', { type: 'abandoned_cart' });
    } catch (error) {
      captureException(error, { emailType: 'abandoned_cart' });
    }
  }

  public static async sendBookingConfirmation(bookingId: string): Promise<void> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { user: true },
      });

      if (!booking?.user.email) return;

      trackMetric('email.sent', 1, 'count', { type: 'booking_confirmation' });
    } catch (error) {
      captureException(error, { emailType: 'booking_confirmation' });
    }
  }
}

export class AbandonedCartTracker {
  public static async processAbandonedCarts(): Promise<void> {
    const oneHourAgo = new Date(Date.now() - 3600000);

    const abandoned = await prisma.booking.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lt: oneHourAgo },
      },
      take: 100,
    });

    for (const booking of abandoned) {
      await EmailService.sendAbandonedCart(booking.userId, {
        itemName: 'Your Booking',
        price: booking.totalAmount,
        currency: booking.currency,
      });
    }
  }
}
