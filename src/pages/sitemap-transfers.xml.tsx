/**
 * Transfers Sitemap Generator
 * Specialized sitemap for all transfer services across 8 languages
 * Optimized for GEO SEO and AI search engines
 */

import { GetServerSideProps } from 'next';
import antalyaTransfers from '@/data/antalya-transfers';

const DOMAIN = 'https://holiday.ailydian.com';
const LANGUAGES = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: Array<{ lang: string; href: string }>;
  geo?: {
    lat: number;
    lng: number;
  };
}

function generateSiteMap(urls: SitemapURL[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
  ${urls
    .map((url) => {
      return `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${
      url.alternates
        ?.map(
          (alt) =>
            `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`
        )
        .join('\n    ') || ''
    }
    ${
      url.geo
        ? `<geo:geo>
      <geo:lat>${url.geo.lat}</geo:lat>
      <geo:long>${url.geo.lng}</geo:long>
    </geo:geo>`
        : ''
    }
  </url>`;
    })
    .join('')}
</urlset>`;
}

function generateURLWithAlternates(
  path: string,
  lastmod: string,
  changefreq: string,
  priority: string,
  geo?: { lat: number; lng: number }
): SitemapURL[] {
  const urls: SitemapURL[] = [];

  LANGUAGES.forEach((lang) => {
    const langPath = lang === 'tr' ? '' : `/${lang}`;
    const fullPath = `${DOMAIN}${langPath}${path}`;

    const alternates = LANGUAGES.map((altLang) => ({
      lang: altLang,
      href: `${DOMAIN}${altLang === 'tr' ? '' : `/${altLang}`}${path}`,
    }));

    alternates.push({
      lang: 'x-default',
      href: `${DOMAIN}/en${path}`,
    });

    urls.push({
      loc: fullPath,
      lastmod,
      changefreq,
      priority,
      alternates,
      geo,
    });
  });

  return urls;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const urls: SitemapURL[] = [];
    const currentDate = new Date().toISOString();

    // Transfers Index Page
    urls.push(
      ...generateURLWithAlternates(
        '/transfers',
        currentDate,
        'daily',
        '1.0'
      )
    );

    // Antalya Transfers (from real data)
    antalyaTransfers.forEach((transfer) => {
      const slug = transfer.seo?.slug?.tr || transfer.id;

      // Extract coordinates if available
      const geo = transfer.from?.coordinates ? {
        lat: transfer.from.coordinates.lat,
        lng: transfer.from.coordinates.lng
      } : undefined;

      urls.push(
        ...generateURLWithAlternates(
          `/transfers/${slug}`,
          new Date(transfer.lastUpdated || Date.now()).toISOString(),
          'weekly',
          '0.9',
          geo
        )
      );
    });

    // Popular Transfer Routes (City Pages)
    const transferCities = [
      { city: 'antalya', priority: '0.9' },
      { city: 'istanbul', priority: '0.8' },
      { city: 'bodrum', priority: '0.7' },
      { city: 'marmaris', priority: '0.7' },
      { city: 'fethiye', priority: '0.7' },
      { city: 'dalaman', priority: '0.6' },
      { city: 'izmir', priority: '0.6' }
    ];

    transferCities.forEach(({ city, priority }) => {
      urls.push(
        ...generateURLWithAlternates(
          `/transfers/${city}`,
          currentDate,
          'weekly',
          priority
        )
      );
    });

    // Generate sitemap XML
    const sitemap = generateSiteMap(urls);

    // Set headers
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');

    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Transfers sitemap generation error:', error);
    res.statusCode = 500;
    res.end();
    return { props: {} };
  }
};

const TransfersSitemap = () => null;

export default TransfersSitemap;
