/**
 * Continuous SEO Update Cron Job
 * Vercel Cron ile otomatik çalışan SEO güncelleme endpoint'i
 * Her 6 saatte bir çalışır
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getContinuousSeoService } from '@/lib/seo/continuousSeoService';
import logger from '../../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Sadece Vercel Cron'dan gelen istekleri kabul et
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    logger.debug('🚀 SEO güncelleme cron job başlatıldı...', { component: 'UpdateSeo' });

    const seoService = getContinuousSeoService();

    // Tam SEO denetimi
    await seoService.startContinuousOptimization();

    // Rapor oluştur
    const report = await seoService.generateSeoReport();

    logger.debug('✅ SEO güncelleme tamamlandı', { component: 'UpdateSeo' });

    return res.status(200).json({
      success: true,
      message: 'SEO successfully updated',
      report,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('❌ SEO güncelleme hatası:', error as Error, { component: 'UpdateSeo' });

    return res.status(500).json({
      error: 'SEO update failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
