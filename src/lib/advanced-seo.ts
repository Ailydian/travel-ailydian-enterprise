import { NextSeoProps } from 'next-seo';

// LyDian SEO konfigürasyonu
export const AILYDIAN_SEO_CONFIG = {
  defaultTitle: 'Travel.LyDian - AI Destekli Global Turizm Platformu',
  titleTemplate: '%s | Travel.LyDian',
  description: 'Yapay zeka destekli seyahat önerileri, blockchain ödemeler ve VR deneyimleri ile dünyayı keşfedin.',
  canonical: 'https://travel.lydian.com',
  
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travel.lydian.com',
    siteName: 'Travel.LyDian',
    title: 'Travel.LyDian - AI Destekli Global Turizm Platformu',
    description: 'Enterprise-grade AI turizm platformu. Blockchain ödemeler, VR turlar ve akıllı seyahat planlama.',
    images: [
      {
        url: 'https://travel.lydian.com/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel.LyDian - AI Tourism Platform',
        type: 'image/jpeg',
      },
      {
        url: 'https://travel.lydian.com/images/og-logo.jpg',
        width: 800,
        height: 800,
        alt: 'Travel.LyDian Logo',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    handle: '@lydian',
    site: '@lydian',
    cardType: 'summary_large_image',
  },

  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'theme-color',
      content: '#FF214D', // LyDian primary color
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Travel.LyDian',
    },
    {
      name: 'application-name',
      content: 'Travel.LyDian',
    },
    {
      name: 'msapplication-TileColor',
      content: '#FF214D',
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },
    {
      name: 'robots',
      content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
    },
  ],

  additionalLinkTags: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#FF214D',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

// SEO Helper Functions
export class SEOManager {
  static generatePageSEO(
    title: string,
    description: string,
    path: string,
    additionalData?: {
      type?: string;
      images?: Array<{ url: string; alt: string; width?: number; height?: number }>;
      keywords?: string[];
      schema?: any;
    }
  ): NextSeoProps {
    const canonical = `https://travel.lydian.com${path}`;
    
    return {
      title,
      description,
      canonical,
      openGraph: {
        ...AILYDIAN_SEO_CONFIG.openGraph,
        title,
        description,
        url: canonical,
        type: additionalData?.type || 'website',
        images: additionalData?.images?.map(img => ({
          url: img.url,
          alt: img.alt,
          width: img.width || 1200,
          height: img.height || 630,
        })) || AILYDIAN_SEO_CONFIG.openGraph.images,
      },
      additionalMetaTags: [
        ...AILYDIAN_SEO_CONFIG.additionalMetaTags,
        ...(additionalData?.keywords ? [{
          name: 'keywords',
          content: additionalData.keywords.join(', '),
        }] : []),
      ],
    };
  }

  // Destinasyon SEO'su
  static generateDestinationSEO(destination: {
    name: string;
    country: string;
    description: string;
    image?: string;
    keywords?: string[];
  }, lang: string = 'tr'): NextSeoProps {
    const title = `${destination.name}, ${destination.country} - Seyahat Rehberi | Travel.LyDian`;
    const description = `${destination.name} için AI destekli seyahat rehberi. ${destination.description}`;
    
    return this.generatePageSEO(
      title,
      description,
      `/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`,
      {
        type: 'article',
        images: destination.image ? [{
          url: destination.image,
          alt: `${destination.name} - Travel.LyDian`,
        }] : undefined,
        keywords: [
          destination.name,
          destination.country,
          'seyahat',
          'turizm',
          'gezi',
          'AI rehber',
          ...(destination.keywords || [])
        ],
      }
    );
  }

  // Otel SEO'su
  static generateHotelSEO(hotel: {
    name: string;
    city: string;
    rating?: number;
    price?: string;
    image?: string;
  }): NextSeoProps {
    const title = `${hotel.name} - ${hotel.city} ${hotel.rating ? `⭐${hotel.rating}` : ''} | Travel.LyDian`;
    const description = `${hotel.name} oteli için rezervasyon, fiyatlar ve detaylar. AI destekli otel önerileri ile en uygun seçeneği bulun.`;
    
    return this.generatePageSEO(
      title,
      description,
      `/hotels/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`,
      {
        type: 'product',
        keywords: [
          hotel.name,
          hotel.city,
          'otel',
          'rezervasyon',
          'konaklama',
          'blockchain ödeme',
        ],
      }
    );
  }

  // Schema.org markup generator
  static generateWebsiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Travel.LyDian',
      url: 'https://travel.lydian.com',
      description: 'Enterprise-grade AI turizm platformu',
      publisher: {
        '@type': 'Organization',
        name: 'LyDian AI Ecosystem',
        logo: {
          '@type': 'ImageObject',
          url: 'https://travel.lydian.com/images/logo.png',
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://travel.lydian.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    };
  }

  static generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Travel.LyDian',
      url: 'https://travel.lydian.com',
      logo: 'https://travel.lydian.com/images/logo.png',
      description: 'AI destekli global turizm platformu',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+90-XXX-XXX-XXXX',
        contactType: 'customer service',
        availableLanguage: ['Turkish', 'English', 'Arabic'],
      },
      sameAs: [
        'https://facebook.com/lydian',
        'https://twitter.com/lydian',
        'https://instagram.com/lydian',
        'https://linkedin.com/company/lydian',
      ],
    };
  }
}

// Auto sitemap generation
export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private static entries: SitemapEntry[] = [];

  static addEntry(entry: SitemapEntry): void {
    this.entries.push(entry);
  }

  static addBulkEntries(entries: SitemapEntry[]): void {
    this.entries.push(...entries);
  }

  static generateXML(): string {
    const xmlEntries = this.entries
      .map(entry => `
  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`
      )
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
  }

  static clear(): void {
    this.entries = [];
  }
}

export default SEOManager;