/**
 * AI Content Generator
 * Generates high-quality, SEO-optimized content for tours, hotels, car rentals, etc.
 * Uses OpenAI GPT-4 for natural, engaging content in 8 languages
 */

import OpenAI from 'openai';
import {
  BaseProduct,
  GeneratedContent,
  Language,
  ProductCategory,
  Review,
  SEOMetadata,
  ItineraryItem
} from './types';

export class ContentGenerator {
  private openai: OpenAI;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config: {
    apiKey: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    this.openai = new OpenAI({ apiKey: config.apiKey });
    this.model = config.model || 'gpt-4-turbo-preview';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 2000;
  }

  /**
   * Generate comprehensive content for a product in specified language
   */
  async generateProductContent(
    product: BaseProduct,
    locale: Language
  ): Promise<GeneratedContent> {
    const categoryPrompts = this.getCategorySpecificPrompt(product.category);

    const prompt = `
You are a professional travel content writer specializing in ${product.category} descriptions.

Generate comprehensive, engaging content for the following ${product.category}:

Product Details:
- Name: ${product.name}
- Region: ${product.region}, Turkey
- Category: ${product.category}
- Base Description: ${product.description}
- Price: ${product.price} TRY

Language: ${this.getLanguageName(locale)}

Create content in ${this.getLanguageName(locale)} with:

1. TITLE (40-60 characters, SEO-friendly)
2. SHORT DESCRIPTION (150-160 characters for meta)
3. LONG DESCRIPTION (300-500 words, engaging and informative)
4. HIGHLIGHTS (6-8 bullet points, unique selling points)
${categoryPrompts.additionalFields}

Guidelines:
- Write naturally in ${this.getLanguageName(locale)}
- Focus on benefits and unique experiences
- Use emotional, descriptive language
- Include local cultural references
- Highlight safety, quality, and value
- SEO-friendly but not keyword-stuffed
- Avoid clichés and generic phrases

Return ONLY valid JSON in this exact format:
{
  "title": "string",
  "description": "string",
  "longDescription": "string",
  "highlights": ["string", "string", ...],
  ${categoryPrompts.jsonFields}
}
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert travel content writer with deep knowledge of Turkish tourism. You write compelling, accurate, and SEO-optimized content in multiple languages.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: this.temperature,
        max_tokens: this.maxTokens,
        response_format: { type: 'json_object' }
      });

      const content = JSON.parse(response.choices[0].message.content || '{}');

      // Generate SEO metadata
      const seo = await this.generateSEO(product, content, locale);

      // Generate reviews
      const reviews = await this.generateReviews(product, locale);

      return {
        productId: product.id,
        locale,
        title: content.title,
        description: content.description,
        longDescription: content.longDescription,
        highlights: content.highlights,
        included: content.included,
        excluded: content.excluded,
        itinerary: content.itinerary,
        reviews,
        seo
      };
    } catch (error) {
      console.error(`Error generating content for ${product.id} (${locale}):`, error);
      throw error;
    }
  }

  /**
   * Generate SEO metadata
   */
  private async generateSEO(
    product: BaseProduct,
    content: any,
    locale: Language
  ): Promise<SEOMetadata> {
    const baseUrl = 'https://holiday.ailydian.com';
    const categoryPath = this.getCategoryPath(product.category);
    const canonicalUrl = `${baseUrl}/${locale}/${categoryPath}/${product.slug}`;

    // Generate keywords using AI
    const keywordsPrompt = `Generate 10-15 SEO keywords in ${this.getLanguageName(locale)} for:

Product: ${content.title}
Category: ${product.category}
Location: ${product.region}

Return ONLY a JSON array of keywords: ["keyword1", "keyword2", ...]`;

    const keywordsResponse = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: keywordsPrompt }],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: 'json_object' }
    });

    const keywordsData = JSON.parse(keywordsResponse.choices[0].message.content || '{"keywords":[]}');
    const keywords = keywordsData.keywords || [];

    // Generate structured data
    const structuredData = this.generateStructuredData(product, content, locale, canonicalUrl);

    return {
      metaTitle: `${content.title} | Holiday AILYDIAN`,
      metaDescription: content.description,
      keywords,
      canonicalUrl,
      ogTitle: content.title,
      ogDescription: content.description,
      ogImage: product.images[0] || '',
      twitterCard: 'summary_large_image',
      structuredData
    };
  }

  /**
   * Generate realistic reviews
   */
  private async generateReviews(
    product: BaseProduct,
    locale: Language
  ): Promise<Review[]> {
    const reviewsPrompt = `Generate 3 realistic customer reviews in ${this.getLanguageName(locale)} for:

Product: ${product.name}
Category: ${product.category}
Location: ${product.region}

Each review should:
- Be authentic and specific
- Mention real details
- Vary in tone (enthusiastic, balanced, critical-but-positive)
- Be 50-150 words

Return JSON:
[
  {
    "author": "Name Surname",
    "rating": 4-5,
    "title": "Short review title",
    "text": "Detailed review text",
    "date": "YYYY-MM-DD (recent dates)"
  }
]`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: reviewsPrompt }],
        temperature: 0.8,
        max_tokens: 800,
        response_format: { type: 'json_object' }
      });

      const reviewsData = JSON.parse(response.choices[0].message.content || '{"reviews":[]}');
      const reviews = reviewsData.reviews || [];

      return reviews.map((r: any, idx: number) => ({
        id: `${product.id}-review-${idx + 1}`,
        author: r.author,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.author.replace(/\s/g, '')}`,
        rating: r.rating,
        date: r.date,
        title: r.title,
        text: r.text,
        helpful: Math.floor(Math.random() * 200) + 20,
        verified: Math.random() > 0.3,
        locale
      }));
    } catch (error) {
      console.error('Error generating reviews:', error);
      return [];
    }
  }

  /**
   * Generate Schema.org structured data
   */
  private generateStructuredData(
    product: BaseProduct,
    content: any,
    locale: Language,
    url: string
  ): Record<string, any> {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': this.getSchemaType(product.category),
      name: content.title,
      description: content.longDescription,
      image: product.images,
      url,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString()
      },
      provider: {
        '@type': 'Organization',
        name: 'AILYDIAN Holiday',
        url: 'https://holiday.ailydian.com'
      }
    };

    if (product.rating) {
      baseSchema['aggregateRating'] = {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
        bestRating: 5,
        worstRating: 1
      };
    }

    return baseSchema;
  }

  /**
   * Get category-specific prompts
   */
  private getCategorySpecificPrompt(category: ProductCategory): {
    additionalFields: string;
    jsonFields: string;
  } {
    switch (category) {
      case 'tour':
        return {
          additionalFields: `5. INCLUDED ITEMS (6-10 items, what's included in price)
6. EXCLUDED ITEMS (4-6 items, what's NOT included)
7. ITINERARY (3-5 time-based activities with descriptions)`,
          jsonFields: `"included": ["string", ...],
  "excluded": ["string", ...],
  "itinerary": [{"time": "HH:MM", "title": "string", "description": "string"}, ...]`
        };

      case 'hotel':
        return {
          additionalFields: `5. AMENITIES (8-12 hotel amenities)
6. ROOM FEATURES (6-8 room features)`,
          jsonFields: `"amenities": ["string", ...],
  "roomFeatures": ["string", ...]`
        };

      case 'car-rental':
        return {
          additionalFields: `5. INCLUDED SERVICES (6-8 items)
6. ADDITIONAL OPTIONS (4-6 optional add-ons)`,
          jsonFields: `"included": ["string", ...],
  "additionalOptions": ["string", ...]`
        };

      case 'rental':
        return {
          additionalFields: `5. PROPERTY FEATURES (8-10 features)
6. HOUSE RULES (4-6 rules)`,
          jsonFields: `"features": ["string", ...],
  "houseRules": ["string", ...]`
        };

      case 'transfer':
        return {
          additionalFields: `5. INCLUDED SERVICES (6-8 items)
6. VEHICLE FEATURES (4-6 features)`,
          jsonFields: `"included": ["string", ...],
  "vehicleFeatures": ["string", ...]`
        };

      default:
        return {
          additionalFields: '',
          jsonFields: ''
        };
    }
  }

  /**
   * Helper methods
   */
  private getLanguageName(locale: Language): string {
    const names: Record<Language, string> = {
      tr: 'Turkish',
      en: 'English',
      de: 'German',
      ru: 'Russian',
      ar: 'Arabic',
      fa: 'Persian',
      fr: 'French',
      el: 'Greek'
    };
    return names[locale];
  }

  private getCategoryPath(category: ProductCategory): string {
    const paths: Record<ProductCategory, string> = {
      tour: 'tours',
      hotel: 'hotels',
      'car-rental': 'car-rentals',
      rental: 'rentals',
      transfer: 'transfers',
      flight: 'flights'
    };
    return paths[category];
  }

  private getSchemaType(category: ProductCategory): string {
    const types: Record<ProductCategory, string> = {
      tour: 'TouristTrip',
      hotel: 'Hotel',
      'car-rental': 'RentalCarReservation',
      rental: 'LodgingBusiness',
      transfer: 'Service',
      flight: 'Flight'
    };
    return types[category];
  }
}
