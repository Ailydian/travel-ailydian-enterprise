/**
 * Sitemap Ping Cron Job
 * Her 12 saatte bir tüm arama motorlarına sitemap'i bildirir
 * Hızlı indexleme için kritik
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../lib/logger';

interface PingResult {
  google: boolean;
  bing: boolean;
  yandex: boolean;
  indexnow: boolean;
}

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
    logger.debug('Log', { component: 'ping-search-engines', metadata: { data: '🔔 Sitemap ping cron job başlatıldı...' } });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://holiday.ailydian.com';
    const sitemapUrl = `${baseUrl}/sitemap.xml`;

    const results: PingResult = {
      google: false,
      bing: false,
      yandex: false,
      indexnow: false
    };

    // Google'a sitemap ping
    try {
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      const googleResponse = await fetch(googlePingUrl);
      results.google = googleResponse.ok;
      logger.debug(`✅ Google sitemap ping: ${results.google ? 'Başarılı' : 'Başarısız'}`, { component: 'ping-search-engines' });
    } catch (error) {
      logger.error('❌ Google ping hatası:', error as Error, { component: 'ping-search-engines' });
    }

    // Bing'e sitemap ping
    try {
      const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      const bingResponse = await fetch(bingPingUrl);
      results.bing = bingResponse.ok;
      logger.debug(`✅ Bing sitemap ping: ${results.bing ? 'Başarılı' : 'Başarısız'}`, { component: 'ping-search-engines' });
    } catch (error) {
      logger.error('❌ Bing ping hatası:', error as Error, { component: 'ping-search-engines' });
    }

    // Yandex'e sitemap ping
    try {
      const yandexPingUrl = `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      const yandexResponse = await fetch(yandexPingUrl);
      results.yandex = yandexResponse.ok;
      logger.debug(`✅ Yandex sitemap ping: ${results.yandex ? 'Başarılı' : 'Başarısız'}`, { component: 'ping-search-engines' });
    } catch (error) {
      logger.error('❌ Yandex ping hatası:', error as Error, { component: 'ping-search-engines' });
    }

    // Advanced IndexNow ile tüm önemli sayfaları submit et
    try {
      const { getAdvancedIndexNow } = await import('@/lib/seo/advancedIndexNow');

      const importantUrls = [
        baseUrl,
        `${baseUrl}/hotels`,
        `${baseUrl}/flights`,
        `${baseUrl}/transfers`,
        `${baseUrl}/tours`,
        `${baseUrl}/location/alanya`,
        `${baseUrl}/location/antalya`,
        `${baseUrl}/location/belek`,
        `${baseUrl}/location/side`,
        `${baseUrl}/location/kemer`,
        `${baseUrl}/location/kas`,
        `${baseUrl}/location/kalkan`
      ];

      const indexNowKey = process.env.INDEXNOW_KEY || 'travel-lydian-indexnow-key-2025-production';

      const indexNow = getAdvancedIndexNow({
        maxRetries: 3,
        retryDelay: 2000,
        timeout: 10000,
        batchSize: 50,
        rateLimit: 10
      });

      const indexNowResults = await indexNow.submitToAllEngines(
        importantUrls,
        baseUrl,
        indexNowKey
      );

      const report = indexNow.generateReport(indexNowResults);

      results.indexnow = report.successfulSubmissions > 0;
      logger.debug(`✅ IndexNow submission: ${results.indexnow ? 'Başarılı' : 'Başarısız'}`, { component: 'ping-search-engines' });
      logger.debug(`📤 ${report.totalUrls} URLs submitted to ${Object.keys(report.engineResults).length} engines`, { component: 'ping-search-engines' });
      logger.debug(`📊 Success rate: ${report.successRate.toFixed(1)}%`, { component: 'ping-search-engines' });

    } catch (error) {
      logger.error('❌ IndexNow hatası:', error as Error, { component: 'ping-search-engines' });
    }

    const successCount = Object.values(results).filter(Boolean).length;
    logger.debug(`✅ Ping tamamlandı: ${successCount}/4 başarılı`, { component: 'ping-search-engines' });

    return res.status(200).json({
      success: true,
      message: 'Search engines pinged successfully',
      results,
      successCount,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('❌ Sitemap ping hatası:', error as Error, { component: 'ping-search-engines' });

    return res.status(500).json({
      error: 'Sitemap ping failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
