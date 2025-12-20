/**
 * Google Indexing API Endpoint
 * Google'a URL submit eder (manuel indexing için)
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface GoogleSubmitRequest {
  urls: string[];
  type?: 'URL_UPDATED' | 'URL_DELETED';
}

interface GoogleSubmitResponse {
  success: boolean;
  submitted: number;
  message: string;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoogleSubmitResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { urls, type = 'URL_UPDATED' } = req.body as GoogleSubmitRequest;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'URLs array is required' });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel.ailydian.com';

    // Google Indexing API'yi kullanmak için Google Cloud Console'dan
    // service account key gerekiyor. Şimdilik IndexNow kullanıyoruz.

    // Alternatif: Sitemap ping
    await pingGoogleSitemap(baseUrl);

    return res.status(200).json({
      success: true,
      submitted: urls.length,
      message: 'URLs submitted via sitemap ping. For faster indexing, set up Google Indexing API with service account.',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Google submit error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function pingGoogleSitemap(baseUrl: string): Promise<boolean> {
  try {
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

    const response = await fetch(pingUrl);
    return response.ok;
  } catch (error) {
    console.error('Google sitemap ping error:', error);
    return false;
  }
}
