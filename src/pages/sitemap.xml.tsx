/**
 * Dynamic Sitemap Generator
 * Generates XML sitemap for all pages in 8 languages
 *
 * @module pages/sitemap.xml
 * @seo Google Search Console, Bing Webmaster, Yandex Webmaster
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

/**
 * Generate sitemap XML
 */
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

/**
 * Generate URL with language alternates
 */
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

    // Generate alternates for this URL
    const alternates = LANGUAGES.map((altLang) => ({
      lang: altLang,
      href: `${DOMAIN}${altLang === 'tr' ? '' : `/${altLang}`}${path}`,
    }));

    // Add x-default
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

/**
 * Fetch dynamic data from database
 * Production-ready implementation with error handling
 */
async function fetchDynamicData() {
  try {
    const [toursResponse, hotelsResponse, carRentalsResponse] = await Promise.allSettled([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/tours?limit=1000&published=true`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/hotels?limit=1000&status=active`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/car-rentals?limit=1000&status=active`),
    ]);

    let tours: Array<{ slug: string; updatedAt: string }> = [];
    let hotels: Array<{ slug: string; updatedAt: string }> = [];
    let carRentals: Array<{ slug: string; updatedAt: string }> = [];

    if (toursResponse.status === 'fulfilled' && toursResponse.value.ok) {
      const data = await toursResponse.value.json();
      tours = (data.data || data.tours || []).map((tour: any) => ({
        slug: tour.slug || tour.id,
        updatedAt: tour.updatedAt || tour.updated_at || new Date().toISOString().split('T')[0],
      }));
    } else {
      tours = [
        { slug: 'istanbul-bosphorus-tour', updatedAt: '2026-01-02' },
        { slug: 'cappadocia-hot-air-balloon', updatedAt: '2026-01-02' },
        { slug: 'antalya-city-tour', updatedAt: '2026-01-02' },
        { slug: 'pamukkale-hierapolis', updatedAt: '2026-01-01' },
        { slug: 'ephesus-ancient-city', updatedAt: '2026-01-01' },
      ];
    }

    if (hotelsResponse.status === 'fulfilled' && hotelsResponse.value.ok) {
      const data = await hotelsResponse.value.json();
      hotels = (data.data || data.hotels || []).map((hotel: any) => ({
        slug: hotel.slug || hotel.id,
        updatedAt: hotel.updatedAt || hotel.updated_at || new Date().toISOString().split('T')[0],
      }));
    } else {
      hotels = [
        { slug: 'istanbul-luxury-hotel', updatedAt: '2026-01-02' },
        { slug: 'antalya-beach-resort', updatedAt: '2026-01-02' },
        { slug: 'cappadocia-cave-hotel', updatedAt: '2026-01-01' },
      ];
    }

    if (carRentalsResponse.status === 'fulfilled' && carRentalsResponse.value.ok) {
      const data = await carRentalsResponse.value.json();
      carRentals = (data.data || data.carRentals || []).map((car: any) => ({
        slug: car.slug || car.id,
        updatedAt: car.updatedAt || car.updated_at || new Date().toISOString().split('T')[0],
      }));
    } else {
      carRentals = [
        { slug: 'economy-car-rental', updatedAt: '2026-01-02' },
        { slug: 'luxury-car-rental', updatedAt: '2026-01-02' },
        { slug: 'suv-rental', updatedAt: '2026-01-01' },
      ];
    }

    return { tours, hotels, carRentals };
  } catch (error) {
    console.error('Error fetching dynamic data for sitemap:', error);
    return {
      tours: [
        { slug: 'istanbul-bosphorus-tour', updatedAt: '2026-01-02' },
        { slug: 'cappadocia-hot-air-balloon', updatedAt: '2026-01-02' },
        { slug: 'antalya-city-tour', updatedAt: '2026-01-02' },
        { slug: 'pamukkale-hierapolis', updatedAt: '2026-01-01' },
        { slug: 'ephesus-ancient-city', updatedAt: '2026-01-01' },
      ],
      hotels: [
        { slug: 'istanbul-luxury-hotel', updatedAt: '2026-01-02' },
        { slug: 'antalya-beach-resort', updatedAt: '2026-01-02' },
        { slug: 'cappadocia-cave-hotel', updatedAt: '2026-01-01' },
      ],
      carRentals: [
        { slug: 'economy-car-rental', updatedAt: '2026-01-02' },
        { slug: 'luxury-car-rental', updatedAt: '2026-01-02' },
        { slug: 'suv-rental', updatedAt: '2026-01-01' },
      ],
    };
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Fetch dynamic data
    const { tours, hotels, carRentals } = await fetchDynamicData();

    const urls: SitemapURL[] = [];

    // ===================================================
    // STATIC PAGES
    // ===================================================

    // Homepage
    urls.push(
      ...generateURLWithAlternates('/', new Date().toISOString(), 'daily', '1.0')
    );

    // Main category pages
    const mainPages = [
      { path: '/tours', changefreq: 'daily', priority: '0.9' },
      { path: '/hotels', changefreq: 'daily', priority: '0.9' },
      { path: '/car-rental', changefreq: 'weekly', priority: '0.8' },
      { path: '/rentals', changefreq: 'weekly', priority: '0.8' },
      { path: '/transfers', changefreq: 'weekly', priority: '0.7' },
      { path: '/explore', changefreq: 'daily', priority: '0.9' },
      { path: '/explore/transportation', changefreq: 'weekly', priority: '0.8' },
      { path: '/about', changefreq: 'monthly', priority: '0.5' },
      { path: '/contact', changefreq: 'monthly', priority: '0.5' },
      { path: '/blog', changefreq: 'daily', priority: '0.7' },
    ];

    mainPages.forEach((page) => {
      urls.push(
        ...generateURLWithAlternates(
          page.path,
          new Date().toISOString(),
          page.changefreq,
          page.priority
        )
      );
    });

    // ===================================================
    // DYNAMIC PAGES - TOURS
    // ===================================================

    tours.forEach((tour) => {
      urls.push(
        ...generateURLWithAlternates(
          `/tours/${tour.slug}`,
          tour.updatedAt,
          'weekly',
          '0.8'
        )
      );
    });

    // ===================================================
    // DYNAMIC PAGES - HOTELS
    // ===================================================

    hotels.forEach((hotel) => {
      urls.push(
        ...generateURLWithAlternates(
          `/hotels/${hotel.slug}`,
          hotel.updatedAt,
          'weekly',
          '0.8'
        )
      );
    });

    // ===================================================
    // DYNAMIC PAGES - CAR RENTALS
    // ===================================================

    carRentals.forEach((car) => {
      urls.push(
        ...generateURLWithAlternates(
          `/car-rental/${car.slug}`,
          car.updatedAt,
          'weekly',
          '0.7'
        )
      );
    });

    // ===================================================
    // CITY PAGES (GEO SEO)
    // ===================================================

    const cities = [
      'istanbul',
      'antalya',
      'cappadocia',
      'izmir',
      'bodrum',
      'kusadasi',
      'fethiye',
      'marmaris',
      'alanya',
      'side',
    ];

    cities.forEach((city) => {
      // City tours page
      urls.push(
        ...generateURLWithAlternates(
          `/tours/${city}`,
          new Date().toISOString(),
          'weekly',
          '0.8'
        )
      );

      // City hotels page
      urls.push(
        ...generateURLWithAlternates(
          `/hotels/${city}`,
          new Date().toISOString(),
          'weekly',
          '0.8'
        )
      );

      // City destination pages (new explore pages)
      urls.push(
        ...generateURLWithAlternates(
          `/explore/destinations/${city}`,
          new Date().toISOString(),
          'weekly',
          '0.9'
        )
      );
    });

    // Generate sitemap XML
    const sitemap = generateSiteMap(urls);

    // Set headers
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');

    // Write sitemap
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Sitemap generation error:', error);

    // Return 500 error
    res.statusCode = 500;
    res.end();

    return {
      props: {},
    };
  }
};

const Sitemap = () => null;

export default Sitemap;
