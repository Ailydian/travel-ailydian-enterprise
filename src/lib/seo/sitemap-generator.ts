import { Location, City, Country } from '../types/review-system';
import reviewService from '../services/review-service';
import { logger } from '../logger/winston';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
  alternates?: Array<{
    href: string;
    hreflang: string;
  }>;
}

export class SitemapGenerator {
  private baseUrl = 'https://travel.lydian.com';
  private supportedLanguages = ['en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi'];

  /**
   * Generate main sitemap index
   */
  async generateSitemapIndex(): Promise<string> {
    const sitemaps = [
      { loc: `${this.baseUrl}/sitemap-static.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-locations.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-cities.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-countries.xml`, lastmod: new Date().toISOString() },
      { loc: `${this.baseUrl}/sitemap-categories.xml`, lastmod: new Date().toISOString() },
    ];

    return this.generateSitemapXml(sitemaps.map(sitemap => ({
      loc: sitemap.loc,
      lastmod: sitemap.lastmod
    })), true);
  }

  /**
   * Generate static pages sitemap
   */
  async generateStaticSitemap(): Promise<string> {
    const staticPages = [
      { path: '', priority: '1.0', changefreq: 'daily' as const },
      { path: '/about', priority: '0.8', changefreq: 'monthly' as const },
      { path: '/contact', priority: '0.7', changefreq: 'monthly' as const },
      { path: '/help', priority: '0.6', changefreq: 'monthly' as const },
      { path: '/privacy', priority: '0.5', changefreq: 'yearly' as const },
      { path: '/terms', priority: '0.5', changefreq: 'yearly' as const },
      { path: '/restaurants', priority: '0.9', changefreq: 'daily' as const },
      { path: '/hotels', priority: '0.9', changefreq: 'daily' as const },
      { path: '/attractions', priority: '0.9', changefreq: 'daily' as const },
      { path: '/shopping', priority: '0.8', changefreq: 'weekly' as const },
      { path: '/entertainment', priority: '0.8', changefreq: 'weekly' as const },
    ];

    const urls: SitemapUrl[] = [];

    for (const page of staticPages) {
      // Add default language version
      urls.push({
        loc: `${this.baseUrl}${page.path}`,
        lastmod: new Date().toISOString(),
        changefreq: page.changefreq,
        priority: page.priority,
        alternates: this.supportedLanguages.map(lang => ({
          href: `${this.baseUrl}/${lang}${page.path}`,
          hreflang: lang
        }))
      });

      // Add language-specific versions
      for (const lang of this.supportedLanguages) {
        if (lang !== 'en') {
          urls.push({
            loc: `${this.baseUrl}/${lang}${page.path}`,
            lastmod: new Date().toISOString(),
            changefreq: page.changefreq,
            priority: page.priority,
            alternates: this.supportedLanguages.map(l => ({
              href: l === 'en' ? `${this.baseUrl}${page.path}` : `${this.baseUrl}/${l}${page.path}`,
              hreflang: l
            }))
          });
        }
      }
    }

    return this.generateSitemapXml(urls);
  }

  /**
   * Generate locations sitemap
   */
  async generateLocationsSitemap(page = 1, limit = 10000): Promise<string> {
    try {
      const { locations } = await reviewService.searchLocations({
        page,
        limit,
        sort_by: 'rating',
        sort_order: 'desc'
      });

      const urls: SitemapUrl[] = [];

      for (const location of locations) {
        const priority = this.calculateLocationPriority(location);
        const lastmod = location.updated_at || location.created_at;

        // Add default language version
        urls.push({
          loc: `${this.baseUrl}/location/${location.slug}`,
          lastmod,
          changefreq: 'weekly',
          priority: priority.toString(),
          alternates: this.supportedLanguages.map(lang => ({
            href: lang === 'en' 
              ? `${this.baseUrl}/location/${location.slug}`
              : `${this.baseUrl}/${lang}/location/${location.slug}`,
            hreflang: lang
          }))
        });

        // Add language-specific versions
        for (const lang of this.supportedLanguages) {
          if (lang !== 'en') {
            urls.push({
              loc: `${this.baseUrl}/${lang}/location/${location.slug}`,
              lastmod,
              changefreq: 'weekly',
              priority: priority.toString(),
              alternates: this.supportedLanguages.map(l => ({
                href: l === 'en' 
                  ? `${this.baseUrl}/location/${location.slug}`
                  : `${this.baseUrl}/${l}/location/${location.slug}`,
                hreflang: l
              }))
            });
          }
        }
      }

      return this.generateSitemapXml(urls);
    } catch (error) {
      logger.error('Error generating locations sitemap:', error as Error, { component: 'SitemapGenerator' });
      return this.generateSitemapXml([]);
    }
  }

  /**
   * Generate cities sitemap
   */
  async generateCitiesSitemap(): Promise<string> {
    try {
      const cities = await reviewService.getCities();
      const urls: SitemapUrl[] = [];

      for (const city of cities) {
        const priority = this.calculateCityPriority(city);

        // Add default language version
        urls.push({
          loc: `${this.baseUrl}/city/${city.slug}`,
          lastmod: city.updated_at || city.created_at,
          changefreq: 'weekly',
          priority: priority.toString(),
          alternates: this.supportedLanguages.map(lang => ({
            href: lang === 'en' 
              ? `${this.baseUrl}/city/${city.slug}`
              : `${this.baseUrl}/${lang}/city/${city.slug}`,
            hreflang: lang
          }))
        });

        // Add language-specific versions
        for (const lang of this.supportedLanguages) {
          if (lang !== 'en') {
            urls.push({
              loc: `${this.baseUrl}/${lang}/city/${city.slug}`,
              lastmod: city.updated_at || city.created_at,
              changefreq: 'weekly',
              priority: priority.toString(),
              alternates: this.supportedLanguages.map(l => ({
                href: l === 'en' 
                  ? `${this.baseUrl}/city/${city.slug}`
                  : `${this.baseUrl}/${l}/city/${city.slug}`,
                hreflang: l
              }))
            });
          }
        }
      }

      return this.generateSitemapXml(urls);
    } catch (error) {
      logger.error('Error generating cities sitemap:', error as Error, { component: 'SitemapGenerator' });
      return this.generateSitemapXml([]);
    }
  }

  /**
   * Generate countries sitemap
   */
  async generateCountriesSitemap(): Promise<string> {
    try {
      const countries = await reviewService.getCountries();
      const urls: SitemapUrl[] = [];

      for (const country of countries) {
        const priority = '0.8'; // Countries are important

        // Add default language version
        urls.push({
          loc: `${this.baseUrl}/country/${country.code.toLowerCase()}`,
          lastmod: country.updated_at || country.created_at,
          changefreq: 'weekly',
          priority,
          alternates: this.supportedLanguages.map(lang => ({
            href: lang === 'en' 
              ? `${this.baseUrl}/country/${country.code.toLowerCase()}`
              : `${this.baseUrl}/${lang}/country/${country.code.toLowerCase()}`,
            hreflang: lang
          }))
        });

        // Add language-specific versions
        for (const lang of this.supportedLanguages) {
          if (lang !== 'en') {
            urls.push({
              loc: `${this.baseUrl}/${lang}/country/${country.code.toLowerCase()}`,
              lastmod: country.updated_at || country.created_at,
              changefreq: 'weekly',
              priority,
              alternates: this.supportedLanguages.map(l => ({
                href: l === 'en' 
                  ? `${this.baseUrl}/country/${country.code.toLowerCase()}`
                  : `${this.baseUrl}/${l}/country/${country.code.toLowerCase()}`,
                hreflang: l
              }))
            });
          }
        }
      }

      return this.generateSitemapXml(urls);
    } catch (error) {
      logger.error('Error generating countries sitemap:', error as Error, { component: 'SitemapGenerator' });
      return this.generateSitemapXml([]);
    }
  }

  /**
   * Generate categories sitemap
   */
  async generateCategoriesSitemap(): Promise<string> {
    try {
      const categories = await reviewService.getLocationCategories();
      const urls: SitemapUrl[] = [];

      for (const category of categories) {
        const priority = '0.9'; // Categories are very important

        // Add default language version
        urls.push({
          loc: `${this.baseUrl}/${category.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority,
          alternates: this.supportedLanguages.map(lang => ({
            href: lang === 'en' 
              ? `${this.baseUrl}/${category.slug}`
              : `${this.baseUrl}/${lang}/${category.slug}`,
            hreflang: lang
          }))
        });

        // Add language-specific versions
        for (const lang of this.supportedLanguages) {
          if (lang !== 'en') {
            urls.push({
              loc: `${this.baseUrl}/${lang}/${category.slug}`,
              lastmod: new Date().toISOString(),
              changefreq: 'daily',
              priority,
              alternates: this.supportedLanguages.map(l => ({
                href: l === 'en' 
                  ? `${this.baseUrl}/${category.slug}`
                  : `${this.baseUrl}/${l}/${category.slug}`,
                hreflang: l
              }))
            });
          }
        }
      }

      return this.generateSitemapXml(urls);
    } catch (error) {
      logger.error('Error generating categories sitemap:', error as Error, { component: 'SitemapGenerator' });
      return this.generateSitemapXml([]);
    }
  }

  /**
   * Calculate location priority based on rating, reviews, and verification
   */
  private calculateLocationPriority(location: Location): number {
    let priority = 0.5; // Base priority

    // Boost for verification
    if (location.verified) {
      priority += 0.1;
    }

    // Boost for ratings
    if (location.total_reviews > 0) {
      const ratingBoost = (location.average_rating / 5) * 0.2;
      priority += ratingBoost;
    }

    // Boost for review count
    if (location.total_reviews > 10) {
      priority += 0.1;
    }
    if (location.total_reviews > 50) {
      priority += 0.1;
    }
    if (location.total_reviews > 100) {
      priority += 0.1;
    }

    return Math.min(1.0, Math.max(0.1, priority));
  }

  /**
   * Calculate city priority based on popularity rank
   */
  private calculateCityPriority(city: City): number {
    const baseScore = 0.6;
    const popularityBoost = (city.popular_rank / 100) * 0.3;
    return Math.min(1.0, Math.max(0.3, baseScore + popularityBoost));
  }

  /**
   * Generate XML sitemap from URLs
   */
  private generateSitemapXml(urls: SitemapUrl[], isIndex = false): string {
    const tag = isIndex ? 'sitemap' : 'url';
    const rootTag = isIndex ? 'sitemapindex' : 'urlset';
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<${rootTag} xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`;
    
    if (!isIndex) {
      xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
    }
    
    xml += '>\n';

    for (const url of urls) {
      xml += `  <${tag}>\n`;
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      
      if (url.lastmod) {
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority) {
        xml += `    <priority>${url.priority}</priority>\n`;
      }

      // Add alternate language versions
      if (url.alternates && !isIndex) {
        for (const alternate of url.alternates) {
          xml += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${this.escapeXml(alternate.href)}" />\n`;
        }
      }
      
      xml += `  </${tag}>\n`;
    }
    
    xml += `</${rootTag}>\n`;
    return xml;
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl-delay for bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: Slurp
Crawl-delay: 1

# Block certain paths
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /404/
Disallow: /500/

# Block certain query parameters
Disallow: /*?utm_source=*
Disallow: /*?utm_medium=*
Disallow: /*?utm_campaign=*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*

# Clean URLs policy
Clean-param: utm_source&utm_medium&utm_campaign&fbclid&gclid`;
  }

  /**
   * Generate structured data for homepage
   */
  generateHomepageStructuredData(): object {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Travel.LyDian",
      "description": "Global AI-powered travel platform with reviews, recommendations, and bookings for restaurants, hotels, attractions worldwide.",
      "url": this.baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${this.baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://www.facebook.com/travellydian",
        "https://www.twitter.com/travellydian",
        "https://www.instagram.com/travellydian",
        "https://www.linkedin.com/company/travellydian"
      ],
      "publisher": {
        "@type": "Organization",
        "name": "LyDian AI Ecosystem",
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/logo.png`
        }
      }
    };
  }

  /**
   * Generate organization structured data
   */
  generateOrganizationStructuredData(): object {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Travel.LyDian",
      "description": "AI-powered global travel platform connecting travelers with authentic experiences worldwide.",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-TRAVEL",
        "contactType": "customer service",
        "availableLanguage": this.supportedLanguages
      },
      "sameAs": [
        "https://www.facebook.com/travellydian",
        "https://www.twitter.com/travellydian",
        "https://www.instagram.com/travellydian"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressLocality": "San Francisco",
        "addressRegion": "CA"
      }
    };
  }
}

// Singleton instance
export const sitemapGenerator = new SitemapGenerator();
export default sitemapGenerator;