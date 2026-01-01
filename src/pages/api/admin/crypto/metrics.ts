/**
 * Crypto Metrics API
 * Get cryptocurrency payment metrics
 *
 * @endpoint GET /api/admin/crypto/metrics
 * @auth Required (Admin only)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '../../../../lib/logger';
import { CryptoPaymentService } from '../../../../lib/payment/crypto-payment-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const hours = parseInt(req.query.hours as string) || 24;
    const cryptoService = new CryptoPaymentService();

    const allCharges = await cryptoService.listCharges(100);
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const charges = allCharges.filter((charge) => new Date(charge.created_at) >= since);

    // Calculate metrics
    const totalCharges = charges.length;
    const completedCharges = charges.filter(
      (c) => c.timeline[c.timeline.length - 1]?.status === 'COMPLETED'
    ).length;

    const totalValue = charges.reduce(
      (sum, c) => sum + parseFloat(c.pricing.local.amount),
      0
    );

    const byCurrency: Record<string, number> = {};
    for (const charge of charges) {
      for (const payment of charge.payments) {
        const currency = payment.value.crypto.currency;
        byCurrency[currency] = (byCurrency[currency] || 0) + 1;
      }
    }

    const metrics = {
      totalCharges,
      completedCharges,
      totalValue,
      completionRate: totalCharges > 0 ? completedCharges / totalCharges : 0,
      byCurrency,
      avgValue: totalCharges > 0 ? totalValue / totalCharges : 0,
    };

    logger.info('Crypto metrics calculated', { hours, metrics });

    return res.status(200).json({
      metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to calculate crypto metrics', { error });
    return res.status(200).json({
      metrics: {
        totalCharges: 0,
        completedCharges: 0,
        totalValue: 0,
        completionRate: 0,
        byCurrency: {},
        avgValue: 0,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
