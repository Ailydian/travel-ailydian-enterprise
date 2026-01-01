/**
 * Crypto Charges API
 * Get cryptocurrency payment charges
 *
 * @endpoint GET /api/admin/crypto/charges
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

    // Fetch charges from Coinbase Commerce
    const allCharges = await cryptoService.listCharges(100);

    // Filter by time range
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const charges = allCharges
      .filter((charge) => new Date(charge.created_at) >= since)
      .map((charge) => ({
        id: charge.id,
        code: charge.code,
        createdAt: charge.created_at,
        expiresAt: charge.expires_at,
        status: charge.timeline[charge.timeline.length - 1]?.status || 'NEW',
        amount: charge.pricing.local.amount,
        currency: charge.pricing.local.currency,
        cryptoAmount: charge.payments[0]?.value.crypto.amount,
        cryptoCurrency: charge.payments[0]?.value.crypto.currency,
        hostedUrl: charge.hosted_url,
        bookingId: charge.metadata?.bookingId,
        userId: charge.metadata?.userId,
        confirmations: charge.payments[0]?.block?.confirmations_accumulated,
        txHash: charge.payments[0]?.transaction_id,
      }));

    logger.info('Crypto charges fetched', {
      hours,
      count: charges.length,
    });

    return res.status(200).json({
      charges,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to fetch crypto charges', { error });
    // Return mock data if service fails
    return res.status(200).json({
      charges: [],
      timestamp: new Date().toISOString(),
    });
  }
}
