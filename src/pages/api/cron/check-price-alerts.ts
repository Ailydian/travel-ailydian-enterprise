import type { NextApiRequest, NextApiResponse } from 'next';
import { checkPriceAlertsCron } from '@/lib/services/price-alert-notification';

/**
 * Cron job endpoint to check price alerts
 *
 * Setup with Vercel Cron Jobs:
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/check-price-alerts",
 *     "schedule": "0 star-slash-6 star star star"
 *   }]
 * }
 *
 * Or use external cron service (e.g., cron-job.org) to hit this endpoint every 6 hours
 * Note: Replace "star" with asterisk and "slash" with forward slash in schedule
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret to prevent unauthorized access
  const cronSecret = req.headers['x-cron-secret'];

  if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting price alert check cron job...');

    await checkPriceAlertsCron();

    return res.status(200).json({
      success: true,
      message: 'Price alert check completed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in price alert cron job:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to check price alerts',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
