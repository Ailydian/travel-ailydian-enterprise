/**
 * SEO Optimizer
 * Generates comprehensive SEO metadata, structured data, and multilingual support
 */

import { GeneratedContent, Language, ProductCategory } from './types';
import fs from 'fs/promises';
import path from 'path';

export class SEOOptimizer {
  private baseUrl = 'https://holiday.ailydian.com';
  private languages: Language[] = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'];

  /**
   * Generate sitemap.xml for all pages
   */
  async generateSitemap(allContent: GeneratedContent[]): Promise<string> {
    const urls: string[] = [];

    // Group by product
    const byProduct = new Map<string, GeneratedContent[]>();
    for (const content of allContent) {
      if (!byProduct.has(content.productId)) {
        byProduct.set(content.productId, []);
      }
      byProduct.get(content.productId)!.push(content);
    }

    // Generate URLs with alternates
    for (const [productId, contents] of byProduct) {
      const mainContent = contents[0];
      const category = this.getCategoryPath(mainContent);

      for (const content of contents) {
        const url = `${this.baseUrl}/${content.locale}/${category}/${productId}`;
        const lastmod = new Date().toISOString().split('T')[0];

        urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${this.getPriority(content)}</priority>
    ${this.generateAlternates(productId, category, content.locale)}
  </url>`);
      }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
  }

  /**
   * Generate hreflang alternates
   */
  private generateAlternates(productId: string, category: string, currentLocale: Language): string {
    const alternates: string[] = [];

    for (const lang of this.languages) {
      const url = `${this.baseUrl}/${lang}/${category}/${productId}`;
      alternates.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`);
    }

    // x-default
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${this.baseUrl}/en/${category}/${productId}" />`);

    return alternates.join('\n');
  }

  /**
   * Generate robots.txt
   */
  generateRobotsTxt(): string {
    return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-tours.xml
Sitemap: ${this.baseUrl}/sitemap-hotels.xml
Sitemap: ${this.baseUrl}/sitemap-car-rentals.xml
Sitemap: ${this.baseUrl}/sitemap-transfers.xml
Sitemap: ${this.baseUrl}/sitemap-rentals.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Crawl-delay
Crawl-delay: 1
`;
  }

  /**
   * Generate category-specific sitemaps
   */
  async generateCategorySitemaps(allContent: GeneratedContent[]): Promise<Map<string, string>> {
    const sitemaps = new Map<string, string>();

    // Group by category
    const byCategory = new Map<string, GeneratedContent[]>();
    for (const content of allContent) {
      const category = this.getCategoryPath(content);
      if (!byCategory.has(category)) {
        byCategory.set(category, []);
      }
      byCategory.get(category)!.push(content);
    }

    // Generate sitemap for each category
    for (const [category, contents] of byCategory) {
      const sitemap = await this.generateSitemap(contents);
      sitemaps.set(`sitemap-${category}.xml`, sitemap);
    }

    return sitemaps;
  }

  /**
   * Generate Open Graph images metadata
   */
  generateOGImagesMeta(content: GeneratedContent): Record<string, string> {
    const images = content.seo.ogImage ? [content.seo.ogImage] : [];

    return {
      'og:image': images[0] || '',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': content.title,
      'twitter:image': images[0] || '',
      'twitter:image:alt': content.title
    };
  }

  /**
   * Generate JSON-LD structured data
   */
  generateJSONLD(content: GeneratedContent): string {
    const schemas = [
      content.seo.structuredData,
      this.generateBreadcrumbSchema(content),
      this.generateFAQSchema(content),
      this.generateReviewSchema(content)
    ].filter(Boolean);

    return JSON.stringify(schemas, null, 2);
  }

  /**
   * Generate breadcrumb schema
   */
  private generateBreadcrumbSchema(content: GeneratedContent): Record<string, any> {
    const category = this.getCategoryPath(content);
    const categoryName = this.getCategoryName(category);

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: this.baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: `${this.baseUrl}/${content.locale}/${category}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: content.title,
          item: `${this.baseUrl}/${content.locale}/${category}/${content.productId}`
        }
      ]
    };
  }

  /**
   * Generate FAQ schema from highlights
   */
  private generateFAQSchema(content: GeneratedContent): Record<string, any> | null {
    if (!content.highlights || content.highlights.length < 3) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.highlights.slice(0, 5).map((highlight, idx) => ({
        '@type': 'Question',
        name: `What about ${highlight}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: highlight
        }
      }))
    };
  }

  /**
   * Generate Review schema
   */
  private generateReviewSchema(content: GeneratedContent): Record<string, any> | null {
    if (!content.reviews || content.reviews.length === 0) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: content.title,
      description: content.description,
      review: content.reviews.map(review => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: review.author
        },
        reviewBody: review.text,
        datePublished: review.date
      }))
    };
  }

  /**
   * Get category path from content
   */
  private getCategoryPath(content: GeneratedContent | { productId: string }): string {
    const category = content.productId.split('-')[0];
    const categoryMap: Record<string, string> = {
      'tour': 'tours',
      'hotel': 'hotels',
      'car': 'car-rentals',
      'transfer': 'transfers',
      'rental': 'rentals',
      'flight': 'flights'
    };

    return categoryMap[category] || category;
  }

  /**
   * Get category display name
   */
  private getCategoryName(category: string): string {
    const nameMap: Record<string, string> = {
      'tours': 'Tours & Activities',
      'hotels': 'Hotels & Accommodation',
      'car-rentals': 'Car Rentals',
      'transfers': 'Airport Transfers',
      'rentals': 'Holiday Rentals',
      'flights': 'Flights'
    };

    return nameMap[category] || category;
  }

  /**
   * Calculate URL priority
   */
  private getPriority(content: GeneratedContent): string {
    // Higher priority for Turkish content and tours
    if (content.locale === 'tr') return '1.0';
    if (content.locale === 'en') return '0.9';
    if (content.productId.startsWith('tour')) return '0.8';
    return '0.7';
  }

  /**
   * Save all SEO files
   */
  async saveAllSEOFiles(allContent: GeneratedContent[], outputDir: string): Promise<void> {
    const seoDir = path.join(outputDir, 'seo');
    await fs.mkdir(seoDir, { recursive: true });

    // Main sitemap
    const sitemap = await this.generateSitemap(allContent);
    await fs.writeFile(path.join(seoDir, 'sitemap.xml'), sitemap);

    // Category sitemaps
    const categorySitemaps = await this.generateCategorySitemaps(allContent);
    for (const [filename, content] of categorySitemaps) {
      await fs.writeFile(path.join(seoDir, filename), content);
    }

    // Robots.txt
    const robotsTxt = this.generateRobotsTxt();
    await fs.writeFile(path.join(seoDir, 'robots.txt'), robotsTxt);

    console.log(`\n✅ SEO files generated in: ${seoDir}`);
    console.log(`   - sitemap.xml`);
    console.log(`   - ${categorySitemaps.size} category sitemaps`);
    console.log(`   - robots.txt`);
  }
}
