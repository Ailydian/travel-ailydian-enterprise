import { GetServerSidePropsContext } from 'next';
import logger from './logger';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternateUrls?: { [locale: string]: string };
}

export const SUPPORTED_LOCALES = [
  'tr', 'en', 'ar', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh',
  'ja', 'ko', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu'
];

export class SitemapGenerator {
  private baseUrl: string;
  private locales: string[];

  constructor(baseUrl: string = 'https://travel.lydian.com', locales: string[] = SUPPORTED_LOCALES) {
    this.baseUrl = baseUrl;
    this.locales = locales;
  }

  // Generate static pages sitemap
  generateStaticPages(): SitemapUrl[] {
    const staticPages = [
      { path: '', priority: 1.0, changefreq: 'daily' as const },
      { path: '/destinations', priority: 0.9, changefreq: 'daily' as const },
      { path: '/experiences', priority: 0.9, changefreq: 'daily' as const },
      { path: '/hotels', priority: 0.9, changefreq: 'daily' as const },
      { path: '/flights', priority: 0.9, changefreq: 'daily' as const },
      { path: '/about', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/contact', priority: 0.6, changefreq: 'monthly' as const },
      { path: '/privacy', priority: 0.4, changefreq: 'yearly' as const },
      { path: '/terms', priority: 0.4, changefreq: 'yearly' as const },
      { path: '/cart', priority: 0.5, changefreq: 'weekly' as const },
      { path: '/profile', priority: 0.5, changefreq: 'weekly' as const },
      { path: '/bookings', priority: 0.6, changefreq: 'weekly' as const },
    ];

    return staticPages.map(page => {
      const alternateUrls: { [locale: string]: string } = {};
      
      this.locales.forEach(locale => {
        const url = locale === 'tr' 
          ? `${this.baseUrl}${page.path}`
          : `${this.baseUrl}/${locale}${page.path}`;
        alternateUrls[locale] = url;
      });

      return {
        loc: `${this.baseUrl}${page.path}`,
        lastmod: new Date().toISOString(),
        changefreq: page.changefreq,
        priority: page.priority,
        alternateUrls
      };
    });
  }

  // Generate dynamic destination pages
  async generateDestinationPages(): Promise<SitemapUrl[]> {
    try {
      // This would typically fetch from your API or database
      const destinations = await this.fetchDestinations();
      
      return destinations.map(dest => {
        const alternateUrls: { [locale: string]: string } = {};
        
        this.locales.forEach(locale => {
          const slug = dest.slug || dest.id;
          const url = locale === 'tr' 
            ? `${this.baseUrl}/destinations/${slug}`
            : `${this.baseUrl}/${locale}/destinations/${slug}`;
          alternateUrls[locale] = url;
        });

        return {
          loc: `${this.baseUrl}/destinations/${dest.slug || dest.id}`,
          lastmod: dest.updatedAt || new Date().toISOString(),
          changefreq: 'weekly' as const,
          priority: 0.8,
          alternateUrls
        };
      });
    } catch (error) {
      logger.error('Error generating destination pages for sitemap:', error as Error, { component: 'Sitemap' });
      return [];
    }
  }

  // Generate experience pages
  async generateExperiencePages(): Promise<SitemapUrl[]> {
    try {
      const experiences = await this.fetchExperiences();
      
      return experiences.map(exp => {
        const alternateUrls: { [locale: string]: string } = {};
        
        this.locales.forEach(locale => {
          const slug = exp.slug || exp.id;
          const url = locale === 'tr' 
            ? `${this.baseUrl}/experiences/${slug}`
            : `${this.baseUrl}/${locale}/experiences/${slug}`;
          alternateUrls[locale] = url;
        });

        return {
          loc: `${this.baseUrl}/experiences/${exp.slug || exp.id}`,
          lastmod: exp.updatedAt || new Date().toISOString(),
          changefreq: 'weekly' as const,
          priority: 0.7,
          alternateUrls
        };
      });
    } catch (error) {
      logger.error('Error generating experience pages for sitemap:', error as Error, { component: 'Sitemap' });
      return [];
    }
  }

  // Generate hotel pages
  async generateHotelPages(): Promise<SitemapUrl[]> {
    try {
      const hotels = await this.fetchHotels();
      
      return hotels.map(hotel => {
        const alternateUrls: { [locale: string]: string } = {};
        
        this.locales.forEach(locale => {
          const slug = hotel.slug || hotel.id;
          const url = locale === 'tr' 
            ? `${this.baseUrl}/hotels/${slug}`
            : `${this.baseUrl}/${locale}/hotels/${slug}`;
          alternateUrls[locale] = url;
        });

        return {
          loc: `${this.baseUrl}/hotels/${hotel.slug || hotel.id}`,
          lastmod: hotel.updatedAt || new Date().toISOString(),
          changefreq: 'daily' as const,
          priority: 0.8,
          alternateUrls
        };
      });
    } catch (error) {
      logger.error('Error generating hotel pages for sitemap:', error as Error, { component: 'Sitemap' });
      return [];
    }
  }

  // Generate blog/article pages
  async generateBlogPages(): Promise<SitemapUrl[]> {
    try {
      const articles = await this.fetchBlogArticles();
      
      return articles.map(article => {
        const alternateUrls: { [locale: string]: string } = {};
        
        this.locales.forEach(locale => {
          const slug = article.slug || article.id;
          const url = locale === 'tr' 
            ? `${this.baseUrl}/blog/${slug}`
            : `${this.baseUrl}/${locale}/blog/${slug}`;
          alternateUrls[locale] = url;
        });

        return {
          loc: `${this.baseUrl}/blog/${article.slug || article.id}`,
          lastmod: article.updatedAt || new Date().toISOString(),
          changefreq: 'monthly' as const,
          priority: 0.6,
          alternateUrls
        };
      });
    } catch (error) {
      logger.error('Error generating blog pages for sitemap:', error as Error, { component: 'Sitemap' });
      return [];
    }
  }

  // Generate complete sitemap
  async generateSitemap(): Promise<SitemapUrl[]> {
    const [
      staticPages,
      destinationPages,
      experiencePages,
      hotelPages,
      blogPages
    ] = await Promise.all([
      this.generateStaticPages(),
      this.generateDestinationPages(),
      this.generateExperiencePages(),
      this.generateHotelPages(),
      this.generateBlogPages()
    ]);

    return [
      ...staticPages,
      ...destinationPages,
      ...experiencePages,
      ...hotelPages,
      ...blogPages
    ];
  }

  // Convert to XML format
  generateXML(urls: SitemapUrl[]): string {
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
    const footer = '</urlset>';
    
    const urlElements = urls.map(url => {
      let urlXml = `  <url>\n    <loc>${url.loc}</loc>\n`;
      
      if (url.lastmod) {
        urlXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        urlXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority) {
        urlXml += `    <priority>${url.priority}</priority>\n`;
      }
      
      // Add hreflang alternates
      if (url.alternateUrls) {
        Object.entries(url.alternateUrls).forEach(([locale, href]) => {
          urlXml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />\n`;
        });
      }
      
      urlXml += '  </url>';
      return urlXml;
    }).join('\n');
    
    return `${header}\n${urlElements}\n${footer}`;
  }

  // Generate sitemap index for large sites
  generateSitemapIndex(sitemaps: { loc: string; lastmod?: string }[]): string {
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const footer = '</sitemapindex>';
    
    const sitemapElements = sitemaps.map(sitemap => {
      let sitemapXml = `  <sitemap>\n    <loc>${sitemap.loc}</loc>\n`;
      
      if (sitemap.lastmod) {
        sitemapXml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
      }
      
      sitemapXml += '  </sitemap>';
      return sitemapXml;
    }).join('\n');
    
    return `${header}\n${sitemapElements}\n${footer}`;
  }

  // Placeholder methods for data fetching (replace with actual API calls)
  private async fetchDestinations() {
    // Replace with actual API call
    return [
      { id: 'istanbul', slug: 'istanbul', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'ankara', slug: 'ankara', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'antalya', slug: 'antalya', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'cappadocia', slug: 'cappadocia', updatedAt: '2024-01-15T10:00:00Z' },
    ];
  }

  private async fetchExperiences() {
    // Replace with actual API call
    return [
      { id: 'hot-air-balloon', slug: 'hot-air-balloon-cappadocia', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'bosphorus-cruise', slug: 'bosphorus-cruise-istanbul', updatedAt: '2024-01-15T10:00:00Z' },
    ];
  }

  private async fetchHotels() {
    // Replace with actual API call
    return [
      { id: 'luxury-istanbul', slug: 'luxury-hotel-istanbul', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'boutique-cappadocia', slug: 'boutique-hotel-cappadocia', updatedAt: '2024-01-15T10:00:00Z' },
    ];
  }

  private async fetchBlogArticles() {
    // Replace with actual API call
    return [
      { id: 'travel-guide-turkey', slug: 'ultimate-travel-guide-turkey', updatedAt: '2024-01-15T10:00:00Z' },
      { id: 'hidden-gems-istanbul', slug: 'hidden-gems-istanbul', updatedAt: '2024-01-15T10:00:00Z' },
    ];
  }
}

// Helper function for Next.js API routes
export const generateSitemapResponse = async (context: GetServerSidePropsContext) => {
  const generator = new SitemapGenerator();
  const urls = await generator.generateSitemap();
  const xml = generator.generateXML(urls);
  
  context.res.setHeader('Content-Type', 'text/xml');
  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  context.res.write(xml);
  context.res.end();
  
  return {
    props: {}
  };
};

export default SitemapGenerator;