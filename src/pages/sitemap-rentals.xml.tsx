/**
 * Rentals Sitemap Generator
 * Specialized sitemap for vacation rentals (villas, apartments) across 8 languages
 * Optimized for GEO SEO and AI search engines
 */

import { GetServerSideProps } from 'next';

const DOMAIN = 'https://holiday.ailydian.com';
const LANGUAGES = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: Array<{ lang: string; href: string }>;
}

function generateSiteMap(urls: SitemapURL[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
  </url>`;
    })
    .join('')}
</urlset>`;
}

function generateURLWithAlternates(
  path: string,
  lastmod: string,
  changefreq: string,
  priority: string
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
    });
  });

  return urls;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const urls: SitemapURL[] = [];
    const currentDate = new Date().toISOString();

    // Rentals Index Page
    urls.push(
      ...generateURLWithAlternates(
        '/rentals',
        currentDate,
        'daily',
        '1.0'
      )
    );

    // Sample rental properties (replace with real DB data in production)
    const sampleRentals = [
      { slug: 'istanbul-bogaz-manzarali-villa', updatedAt: '2026-01-05' },
      { slug: 'antalya-lux-apart', updatedAt: '2026-01-04' },
      { slug: 'bodrum-deniz-kenari-ev', updatedAt: '2026-01-03' },
      { slug: 'cesme-havuzlu-villa', updatedAt: '2026-01-02' },
      { slug: 'marmaris-luxury-villa', updatedAt: '2026-01-02' },
      { slug: 'fethiye-oludeniz-villa', updatedAt: '2026-01-01' }
    ];

    sampleRentals.forEach((rental) => {
      urls.push(
        ...generateURLWithAlternates(
          `/rentals/${rental.slug}`,
          rental.updatedAt,
          'weekly',
          '0.8'
        )
      );
    });

    // City-specific rental pages
    const rentalCities = [
      { city: 'istanbul', priority: '0.9' },
      { city: 'antalya', priority: '0.9' },
      { city: 'bodrum', priority: '0.8' },
      { city: 'cesme', priority: '0.7' },
      { city: 'marmaris', priority: '0.7' },
      { city: 'fethiye', priority: '0.7' },
      { city: 'kas', priority: '0.6' },
      { city: 'alanya', priority: '0.6' }
    ];

    rentalCities.forEach(({ city, priority }) => {
      urls.push(
        ...generateURLWithAlternates(
          `/rentals/${city}`,
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
    console.error('Rentals sitemap generation error:', error);
    res.statusCode = 500;
    res.end();
    return { props: {} };
  }
};

const RentalsSitemap = () => null;

export default RentalsSitemap;
