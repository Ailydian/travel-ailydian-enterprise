import { GetServerSideProps } from 'next';

// Mock data - gerçek uygulamada API'dan gelecek
const STATIC_PAGES = [
  '',
  '/destinations',
  '/hotels',
  '/flights',
  '/activities',
  '/experiences',
  '/about',
  '/contact',
  '/ai-assistant',
  '/ai-planner',
  '/virtual-tours',
  '/blockchain',
  '/business',
  '/support'
];

const DESTINATIONS = [
  'istanbul',
  'ankara',
  'izmir',
  'antalya',
  'kapadokya',
  'bodrum',
  'cesme',
  'marmaris',
  'kusadasi',
  'alanya'
];

const LANGUAGES = [
  'tr', 'en', 'ar', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh', 
  'ja', 'ko', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu'
];

function generateSitemapXML(): string {
  const baseUrl = 'https://travel.ailydian.com';
  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Ana sayfalar - tüm diller için
  STATIC_PAGES.forEach(page => {
    LANGUAGES.forEach(lang => {
      const url = lang === 'tr' ? `${baseUrl}${page}` : `${baseUrl}/${lang}${page}`;
      const priority = page === '' ? '1.0' : page.includes('ai') ? '0.9' : '0.8';
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>`;

      // Hreflang ekle
      LANGUAGES.forEach(hrefLang => {
        const hrefUrl = hrefLang === 'tr' ? `${baseUrl}${page}` : `${baseUrl}/${hrefLang}${page}`;
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${hrefUrl}"/>`;
      });

      sitemap += `
  </url>
`;
    });
  });

  // Destinasyonlar - tüm diller için
  DESTINATIONS.forEach(destination => {
    LANGUAGES.forEach(lang => {
      const url = lang === 'tr' 
        ? `${baseUrl}/destinations/${destination}` 
        : `${baseUrl}/${lang}/destinations/${destination}`;
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`;

      // Hreflang ekle
      LANGUAGES.forEach(hrefLang => {
        const hrefUrl = hrefLang === 'tr' 
          ? `${baseUrl}/destinations/${destination}` 
          : `${baseUrl}/${hrefLang}/destinations/${destination}`;
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${hrefUrl}"/>`;
      });

      sitemap += `
  </url>
`;
    });
  });

  // API endpoints
  const apiEndpoints = [
    '/api/destinations',
    '/api/hotels',
    '/api/flights',
    '/api/ai/recommendations'
  ];

  apiEndpoints.forEach(endpoint => {
    sitemap += `  <url>
    <loc>${baseUrl}${endpoint}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  return sitemap;
}

// Bu sayfa sadece XML döndürür
export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const sitemap = generateSitemapXML();

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.statusCode = 500;
    res.end();

    return {
      props: {},
    };
  }
};