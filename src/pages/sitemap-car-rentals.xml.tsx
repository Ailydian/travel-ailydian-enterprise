/**
 * Car Rentals Sitemap Generator
 * Specialized sitemap for car rental services across 8 languages
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

    // Car Rentals Index Page
    urls.push(
      ...generateURLWithAlternates(
        '/car-rentals',
        currentDate,
        'daily',
        '1.0'
      )
    );

    // Vehicle categories
    const vehicleCategories = [
      { slug: 'economy', priority: '0.8' },
      { slug: 'compact', priority: '0.7' },
      { slug: 'midsize', priority: '0.7' },
      { slug: 'suv', priority: '0.9' },
      { slug: 'luxury', priority: '0.8' },
      { slug: 'minivan', priority: '0.6' },
      { slug: 'convertible', priority: '0.5' }
    ];

    vehicleCategories.forEach(({ slug, priority }) => {
      urls.push(
        ...generateURLWithAlternates(
          `/car-rentals/${slug}`,
          currentDate,
          'weekly',
          priority
        )
      );
    });

    // City-specific car rental pages (airport pickups)
    const carRentalCities = [
      { city: 'istanbul-havalimani', priority: '0.9' },
      { city: 'antalya-havalimani', priority: '0.9' },
      { city: 'izmir-havalimani', priority: '0.8' },
      { city: 'bodrum-havalimani', priority: '0.7' },
      { city: 'dalaman-havalimani', priority: '0.7' },
      { city: 'ankara-esenboga', priority: '0.6' },
      { city: 'sabiha-gokcen', priority: '0.8' }
    ];

    carRentalCities.forEach(({ city, priority }) => {
      urls.push(
        ...generateURLWithAlternates(
          `/car-rentals/${city}`,
          currentDate,
          'weekly',
          priority
        )
      );
    });

    // Popular car models
    const popularModels = [
      'volkswagen-polo',
      'renault-clio',
      'ford-focus',
      'toyota-corolla',
      'bmw-3-series',
      'mercedes-c-class',
      'range-rover',
      'volkswagen-transporter'
    ];

    popularModels.forEach((model) => {
      urls.push(
        ...generateURLWithAlternates(
          `/car-rentals/vehicles/${model}`,
          currentDate,
          'monthly',
          '0.5'
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
    console.error('Car rentals sitemap generation error:', error);
    res.statusCode = 500;
    res.end();
    return { props: {} };
  }
};

const CarRentalsSitemap = () => null;

export default CarRentalsSitemap;
