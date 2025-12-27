/**
 * Advanced IndexNow API Endpoint
 * Tüm arama motorlarına kusursuz URL bildirimi
 * HTTP 411, 400, 403 hatalarını çözen gelişmiş implementasyon
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdvancedIndexNow } from '@/lib/seo/advancedIndexNow';

import logger from '../../../lib/logger';
interface IndexNowRequest {
  urls: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { urls } = req.body as IndexNowRequest;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'URLs array is required' });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.lydian.com';
    const indexNowKey = process.env.INDEXNOW_KEY || 'travel-lydian-indexnow-key-2025-production';

    logger.debug(`📤 IndexNow: Submitting ${urls.length} URLs to all search engines...`, { component: 'Indexnow' });

    // Advanced IndexNow kullan
    const indexNow = getAdvancedIndexNow({
      maxRetries: 3,
      retryDelay: 2000,
      timeout: 10000,
      batchSize: 100,
      rateLimit: 10
    });

    // Tüm arama motorlarına gönder
    const results = await indexNow.submitToAllEngines(urls, baseUrl, indexNowKey);

    // Rapor oluştur
    const report = indexNow.generateReport(results);

    logger.debug(`✅ IndexNow completed: ${report.successfulSubmissions}/${report.totalSubmissions} successful`, { component: 'Indexnow' });
    logger.debug(`📊 Total URLs submitted: ${report.totalUrls}`, { component: 'Indexnow' });
    logger.debug(`⏱️  Average response time: ${report.averageResponseTime}ms`, { component: 'Indexnow' });
    logger.debug(`📈 Success rate: ${report.successRate.toFixed(1)}%`, { component: 'Indexnow' });

    return res.status(200).json({
      success: report.successfulSubmissions > 0,
      submitted: urls.length,
      results: results,
      report: report,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('❌ IndexNow submission error:', error as Error, { component: 'Indexnow' });
    return res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
