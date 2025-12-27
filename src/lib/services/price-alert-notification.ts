import nodemailer from 'nodemailer';
import logger from '../../lib/logger';
import { prisma } from '@/lib/prisma';

interface PriceDropNotification {
  userId: string;
  entityType: string;
  entityName: string;
  oldPrice: number;
  newPrice: number;
  currency: string;
  savings: number;
  savingsPercentage: number;
  entityUrl?: string;
}

/**
 * Email notification service for price alerts
 */
export class PriceAlertNotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize email transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Check all active price alerts and send notifications
   */
  async checkAndNotify(): Promise<void> {
    try {
      // Get all active alerts
      const activeAlerts = await prisma.priceAlert.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { expiresAt: null },
            { expiresAt: { gte: new Date() } },
          ],
        },
        include: {
          user: true,
        },
      });

      logger.debug(`Checking ${activeAlerts.length} active price alerts...`, { component: 'price-alert-notification' });

      for (const alert of activeAlerts) {
        // Fetch latest price from history
        const latestPrice = await prisma.priceHistory.findFirst({
          where: {
            entityType: alert.entityType,
            entityId: alert.entityId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (!latestPrice) continue;

        const currentPrice = parseFloat(latestPrice.price.toString());
        const targetPrice = parseFloat(alert.targetPrice.toString());
        const previousPrice = parseFloat(alert.currentPrice.toString());

        // Check if price dropped below target
        const shouldNotifyTarget = currentPrice <= targetPrice;

        // Check if price dropped by percentage threshold
        const dropPercentage = ((previousPrice - currentPrice) / previousPrice) * 100;
        const shouldNotifyPercentage =
          alert.priceDropPercentage &&
          dropPercentage >= parseFloat(alert.priceDropPercentage.toString());

        if (shouldNotifyTarget || shouldNotifyPercentage) {
          // Prevent spam: check last notification time (minimum 6 hours apart)
          const hoursSinceLastNotification = alert.lastNotifiedAt
            ? (Date.now() - alert.lastNotifiedAt.getTime()) / (1000 * 60 * 60)
            : 24;

          if (hoursSinceLastNotification < 6) {
            logger.debug(`Skipping notification for alert ${alert.id} - too soon`, { component: 'price-alert-notification' });
            continue;
          }

          // Send notification
          await this.sendPriceDropNotification({
            userId: alert.userId,
            entityType: alert.entityType,
            entityName: alert.entityName,
            oldPrice: previousPrice,
            newPrice: currentPrice,
            currency: alert.currency,
            savings: previousPrice - currentPrice,
            savingsPercentage: dropPercentage,
            entityUrl: this.buildEntityUrl(alert.entityType, alert.entityId),
          });

          // Update alert
          await prisma.priceAlert.update({
            where: { id: alert.id },
            data: {
              currentPrice: latestPrice.price,
              lastNotifiedAt: new Date(),
              notificationCount: { increment: 1 },
              status: shouldNotifyTarget ? 'TRIGGERED' : 'ACTIVE',
            },
          });

          // Create notification record
          await prisma.notification.create({
            data: {
              userId: alert.userId,
              type: 'PRICE_DROP',
              title: `Price Drop Alert: ${alert.entityName}`,
              message: `Price dropped ${dropPercentage.toFixed(1)}% from ${alert.currency} ${previousPrice} to ${alert.currency} ${currentPrice}`,
              data: {
                alertId: alert.id,
                entityType: alert.entityType,
                entityId: alert.entityId,
                oldPrice: previousPrice,
                newPrice: currentPrice,
                savings: previousPrice - currentPrice,
              },
            },
          });

          logger.debug(`Notification sent for alert ${alert.id}`, { component: 'price-alert-notification' });
        }
      }

      // Clean up expired alerts
      await prisma.priceAlert.updateMany({
        where: {
          status: 'ACTIVE',
          expiresAt: {
            lt: new Date(),
          },
        },
        data: {
          status: 'EXPIRED',
        },
      });

      logger.debug('Log', { component: 'price-alert-notification', metadata: { data: 'Price alert check completed' } });
    } catch (error) {
      logger.error('Error checking price alerts:', error as Error, { component: 'price-alert-notification' });
      throw error;
    }
  }

  /**
   * Send price drop email notification
   */
  private async sendPriceDropNotification(notification: PriceDropNotification): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: notification.userId },
      });

      if (!user || !user.email) {
        logger.error(`User ${notification.userId} not found or has no email`);
        return;
      }

      const emailHtml = this.generatePriceDropEmailHtml(notification);

      await this.transporter.sendMail({
        from: `"LyDian Travel" <${process.env.SMTP_FROM || 'noreply@lydian.com'}>`, to: user.email,
        subject: `Price Drop Alert: ${notification.entityName}`,
        html: emailHtml,
      } as Error, { component: 'price-alert-notification' });

      logger.debug(`Email sent to ${user.email}`, { component: 'price-alert-notification' });
    } catch (error) {
      logger.error('Error sending email:', error as Error, { component: 'price-alert-notification' });
      throw error;
    }
  }

  /**
   * Generate HTML email template
   */
  private generatePriceDropEmailHtml(notification: PriceDropNotification): string {
    const savingsPercentage = notification.savingsPercentage.toFixed(1);
    const entityTypeLabel = this.getEntityTypeLabel(notification.entityType);

    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; }
    .price-box { background: white; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .old-price { text-decoration: line-through; color: #999; font-size: 18px; }
    .new-price { color: #10b981; font-size: 32px; font-weight: bold; margin: 10px 0; }
    .savings { background: #10b981; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 10px 0; }
    .cta-button { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Price Drop Alert!</h1>
      <p>Your watched ${entityTypeLabel} just got cheaper</p>
    </div>

    <div class="content">
      <h2>${notification.entityName}</h2>

      <div class="price-box">
        <div class="old-price">Was: ${notification.currency} ${notification.oldPrice.toFixed(2)}</div>
        <div class="new-price">Now: ${notification.currency} ${notification.newPrice.toFixed(2)}</div>
        <div class="savings">
          Save ${notification.currency} ${notification.savings.toFixed(2)} (${savingsPercentage}% off)
        </div>
      </div>

      <p>Great news! The price for ${notification.entityName} has dropped by ${savingsPercentage}%.</p>

      <p>This is a perfect opportunity to book and save money on your travel plans.</p>

      ${notification.entityUrl ? `<a href="${notification.entityUrl}" class="cta-button">View Details & Book Now</a>` : ''}

      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        <strong>Tip:</strong> Prices can change quickly. We recommend booking soon to secure this rate.
      </p>
    </div>

    <div class="footer">
      <p>You're receiving this email because you set up a price alert for this ${entityTypeLabel}.</p>
      <p>To manage your alerts, visit your dashboard.</p>
      <p>&copy; ${new Date().getFullYear()} LyDian Travel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Build entity URL based on type
   */
  private buildEntityUrl(entityType: string, entityId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://travel.lydian.com';

    switch (entityType) {
      case 'HOTEL':
        return `${baseUrl}/hotels/${entityId}`;
      case 'FLIGHT':
        return `${baseUrl}/flights/search?id=${entityId}`;
      case 'TOUR':
        return `${baseUrl}/tours/${entityId}`;
      default:
        return baseUrl;
    }
  }

  /**
   * Get user-friendly label for entity type
   */
  private getEntityTypeLabel(entityType: string): string {
    const labels: Record<string, string> = {
      HOTEL: 'hotel',
      FLIGHT: 'flight',
      TOUR: 'tour',
    };
    return labels[entityType] || 'item';
  }

  /**
   * Send test email
   */
  async sendTestEmail(email: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"LyDian Travel" <${process.env.SMTP_FROM || 'noreply@lydian.com'}>`,
        to: email,
        subject: 'Test Email - Price Alert System',
        html: '<h1>Test Email</h1><p>Your price alert notification system is working correctly!</p>',
      });
      return true;
    } catch (error) {
      logger.error('Error sending test email:', error as Error, { component: 'price-alert-notification' });
      return false;
    }
  }
}

// Singleton instance
export const priceAlertNotificationService = new PriceAlertNotificationService();

/**
 * Cron job function to check prices periodically
 * Run this every 6 hours or as needed
 */
export async function checkPriceAlertsCron(): Promise<void> {
  logger.debug('Log', { component: 'price-alert-notification', metadata: { data: 'Starting price alert check cron job...' } });
  await priceAlertNotificationService.checkAndNotify();
  logger.debug('Log', { component: 'price-alert-notification', metadata: { data: 'Price alert check cron job completed' } });
}
