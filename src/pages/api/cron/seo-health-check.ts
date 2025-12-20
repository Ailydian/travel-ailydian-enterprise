/**
 * SEO Health Check Cron Job
 * 7/24 otomatik SEO sağlık kontrolü ve optimizasyon
 * Her 6 saatte bir çalışır
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAutoSeoMonitor } from '@/lib/seo/autoSeoMonitor';

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
    console.log('🏥 SEO Health Check Cron Job başlatıldı...');
    const startTime = Date.now();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.ailydian.com';

    // Auto SEO Monitor başlat
    const monitor = getAutoSeoMonitor({
      checkInterval: 360, // 6 hours
      autoFix: true,
      alertThreshold: 70,
      enableML: true
    });

    // Health check yap
    const report = await monitor.performHealthCheck(baseUrl);

    const duration = Date.now() - startTime;

    console.log(`✅ SEO Health Check tamamlandı (${duration}ms)`);
    console.log(`📊 Overall Score: ${report.overallScore}/100 (${report.status})`);
    console.log(`⚠️  Issues: ${report.issues.length}`);
    console.log(`💡 Recommendations: ${report.recommendations.length}`);

    return res.status(200).json({
      success: true,
      message: 'SEO Health Check completed',
      duration: `${duration}ms`,
      report: {
        overallScore: report.overallScore,
        status: report.status,
        metrics: report.metrics,
        searchEngines: report.searchEngines,
        issuesCount: report.issues.length,
        criticalIssues: report.issues.filter(i => i.severity === 'critical').length,
        highIssues: report.issues.filter(i => i.severity === 'high').length,
        recommendationsCount: report.recommendations.length,
        highPriorityRecs: report.recommendations.filter(r => r.priority === 'high').length,
        indexingStats: report.indexingStats
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ SEO Health Check hatası:', error);

    return res.status(500).json({
      error: 'SEO Health Check failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
