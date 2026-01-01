import { logger } from '../../lib/logger/winston';
/**
 * RICH RESULTS ENGINE - Premium SEO
 * Google Rich Snippets / Rich Results sistemi
 *
 * Amaç: Arama sonuçlarında URL'lerin yanında kaliteli görseller,
 * yıldız puanları, fiyatlar, lokasyon bilgileri ve tüm detaylarla
 * görünmesini sağlamak
 *
 * Google Rich Results için desteklenen yapılar:
 * ✅ Article - Makaleler için zengin sonuçlar
 * ✅ Product - Ürün/hizmet görselleri, fiyat, yorum
 * ✅ Recipe - Tarif kartları (turizm için uyarlanmış)
 * ✅ Event - Etkinlik kartları (turlar, aktiviteler)
 * ✅ Organization - Kurum bilgileri, logo
 * ✅ LocalBusiness - İşletme bilgileri, konum, saatler
 * ✅ Hotel - Otel görselleri, puanlar, fiyatlar
 * ✅ TouristAttraction - Turistik yerler
 * ✅ TravelAction - Rezervasyon işlemleri
 * ✅ AggregateRating - Toplu puanlama
 * ✅ Review - Müşteri yorumları
 * ✅ ImageObject - Yüksek kaliteli görseller
 * ✅ VideoObject - Video içerikler
 * ✅ Breadcrumb - Navigasyon yolu
 * ✅ FAQPage - Sık sorulan sorular
 * ✅ HowTo - Nasıl yapılır rehberleri
 * ✅ Offer - Özel teklifler, fiyatlar
 */

interface RichResultsConfig {
  // Image optimization
  imageOptimization: {
    minWidth: number;  // Google: min 1200px önerir
    minHeight: number; // Google: min 675px önerir
    aspectRatio: string; // "16:9", "4:3", "1:1"
    format: string[]; // ["webp", "jpg", "png"]
    quality: number; // 80-100
  };

  // Content requirements
  contentRequirements: {
    titleMinLength: number; // Min 30 karakter
    titleMaxLength: number; // Max 60 karakter
    descriptionMinLength: number; // Min 110 karakter
    descriptionMaxLength: number; // Max 160 karakter
    imageCount: number; // Minimum görsel sayısı
  };

  // Rich snippet types to enable
  enabledTypes: string[];
}

interface OpenGraphTags {
  'og:type': string;
  'og:title': string;
  'og:description': string;
  'og:image': string;
  'og:image:width': string;
  'og:image:height': string;
  'og:image:alt': string;
  'og:url': string;
  'og:site_name': string;
  'og:locale': string;
  'og:locale:alternate'?: string[];
  'article:published_time'?: string;
  'article:modified_time'?: string;
  'article:author'?: string;
  'article:tag'?: string[];
  'product:price:amount'?: string;
  'product:price:currency'?: string;
}

interface TwitterCardTags {
  'twitter:card': string;
  'twitter:site': string;
  'twitter:creator': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
  'twitter:image:alt': string;
}

interface RichSnippetSchema {
  '@context': string;
  '@type': string | string[];
  name: string;
  description: string;
  image: string | string[] | ImageObjectSchema;
  url: string;
  [key: string]: any;
}

interface ImageObjectSchema {
  '@type': 'ImageObject';
  url: string;
  width: number;
  height: number;
  caption?: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  encodingFormat?: string;
}

interface VideoObjectSchema {
  '@type': 'VideoObject';
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl?: string;
  width?: number;
  height?: number;
}

export class RichResultsEngine {
  private config: RichResultsConfig = {
    imageOptimization: {
      minWidth: 1200,
      minHeight: 675,
      aspectRatio: '16:9',
      format: ['webp', 'jpg'],
      quality: 90
    },
    contentRequirements: {
      titleMinLength: 30,
      titleMaxLength: 60,
      descriptionMinLength: 110,
      descriptionMaxLength: 160,
      imageCount: 3
    },
    enabledTypes: [
      'Article',
      'Product',
      'Event',
      'Organization',
      'LocalBusiness',
      'Hotel',
      'TouristAttraction',
      'AggregateRating',
      'Review',
      'ImageObject',
      'VideoObject',
      'Breadcrumb',
      'FAQPage',
      'HowTo',
      'Offer'
    ]
  };

  /**
   * Generate comprehensive Open Graph tags
   */
  generateOpenGraphTags(pageData: {
    type: 'website' | 'article' | 'product' | 'hotel' | 'place';
    title: string;
    description: string;
    image: string;
    imageWidth?: number;
    imageHeight?: number;
    url: string;
    locale?: string;
    alternateLocales?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    price?: { amount: string; currency: string };
  }): OpenGraphTags {
    const tags: OpenGraphTags = {
      'og:type': pageData.type,
      'og:title': this.optimizeTitle(pageData.title),
      'og:description': this.optimizeDescription(pageData.description),
      'og:image': this.optimizeImageUrl(pageData.image),
      'og:image:width': (pageData.imageWidth || 1200).toString(),
      'og:image:height': (pageData.imageHeight || 675).toString(),
      'og:image:alt': pageData.title,
      'og:url': pageData.url,
      'og:site_name': 'AILYDIAN Holiday - Premium Tourism Platform',
      'og:locale': pageData.locale || 'tr_TR'
    };

    // Add alternate locales
    if (pageData.alternateLocales && pageData.alternateLocales.length > 0) {
      tags['og:locale:alternate'] = pageData.alternateLocales;
    }

    // Article-specific tags
    if (pageData.type === 'article') {
      if (pageData.publishedTime) tags['article:published_time'] = pageData.publishedTime;
      if (pageData.modifiedTime) tags['article:modified_time'] = pageData.modifiedTime;
      if (pageData.author) tags['article:author'] = pageData.author;
      if (pageData.tags) tags['article:tag'] = pageData.tags;
    }

    // Product-specific tags
    if (pageData.type === 'product' && pageData.price) {
      tags['product:price:amount'] = pageData.price.amount;
      tags['product:price:currency'] = pageData.price.currency;
    }

    return tags;
  }

  /**
   * Generate Twitter Card tags
   */
  generateTwitterCardTags(pageData: {
    type: 'summary' | 'summary_large_image' | 'player';
    title: string;
    description: string;
    image: string;
    site?: string;
    creator?: string;
  }): TwitterCardTags {
    return {
      'twitter:card': pageData.type,
      'twitter:site': pageData.site || '@LyDianTravel',
      'twitter:creator': pageData.creator || '@LyDianTravel',
      'twitter:title': this.optimizeTitle(pageData.title),
      'twitter:description': this.optimizeDescription(pageData.description),
      'twitter:image': this.optimizeImageUrl(pageData.image),
      'twitter:image:alt': pageData.title
    };
  }

  /**
   * Generate Hotel Rich Snippet
   */
  generateHotelRichSnippet(hotelData: {
    name: string;
    description: string;
    images: string[];
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
    rating: number;
    reviewCount: number;
    priceRange: string;
    amenities: string[];
    checkInTime?: string;
    checkOutTime?: string;
    telephone?: string;
    url: string;
    geo?: { lat: number; lng: number };
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      name: hotelData.name,
      description: hotelData.description,
      image: hotelData.images.map((img, idx) => this.createImageObject(img, `${hotelData.name} - Görsel ${idx + 1}`)),
      address: {
        '@type': 'PostalAddress',
        streetAddress: hotelData.address.street,
        addressLocality: hotelData.address.city,
        addressRegion: hotelData.address.region,
        postalCode: hotelData.address.postalCode,
        addressCountry: hotelData.address.country
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: hotelData.rating.toString(),
        bestRating: '5',
        worstRating: '1',
        ratingCount: hotelData.reviewCount.toString()
      },
      priceRange: hotelData.priceRange,
      amenityFeature: hotelData.amenities.map(amenity => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity
      })),
      checkinTime: hotelData.checkInTime || '14:00',
      checkoutTime: hotelData.checkOutTime || '12:00',
      telephone: hotelData.telephone,
      url: hotelData.url,
      geo: hotelData.geo ? {
        '@type': 'GeoCoordinates',
        latitude: hotelData.geo.lat,
        longitude: hotelData.geo.lng
      } : undefined
    };
  }

  /**
   * Generate TouristAttraction Rich Snippet
   */
  generateTouristAttractionSnippet(attractionData: {
    name: string;
    description: string;
    images: string[];
    address: {
      city: string;
      region: string;
      country: string;
    };
    rating?: number;
    reviewCount?: number;
    tourOperator?: string;
    availableLanguage?: string[];
    url: string;
    geo?: { lat: number; lng: number };
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: attractionData.name,
      description: attractionData.description,
      image: attractionData.images.map((img, idx) => this.createImageObject(img, `${attractionData.name} - ${idx + 1}`)),
      address: {
        '@type': 'PostalAddress',
        addressLocality: attractionData.address.city,
        addressRegion: attractionData.address.region,
        addressCountry: attractionData.address.country
      },
      aggregateRating: attractionData.rating ? {
        '@type': 'AggregateRating',
        ratingValue: attractionData.rating.toString(),
        bestRating: '5',
        ratingCount: (attractionData.reviewCount || 0).toString()
      } : undefined,
      touristType: ['Families', 'Couples', 'Solo Travelers', 'Groups'],
      availableLanguage: attractionData.availableLanguage || ['Turkish', 'English', 'Russian', 'German'],
      url: attractionData.url,
      geo: attractionData.geo ? {
        '@type': 'GeoCoordinates',
        latitude: attractionData.geo.lat,
        longitude: attractionData.geo.lng
      } : undefined
    };
  }

  /**
   * Generate Product (Tour/Transfer) Rich Snippet
   */
  generateProductSnippet(productData: {
    name: string;
    description: string;
    images: string[];
    price: { amount: number; currency: string };
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    rating?: number;
    reviewCount?: number;
    brand?: string;
    category?: string;
    url: string;
    offers?: Array<{
      name: string;
      price: number;
      currency: string;
      validFrom?: string;
      validThrough?: string;
    }>;
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productData.name,
      description: productData.description,
      image: productData.images.map((img, idx) => this.createImageObject(img, `${productData.name} - ${idx + 1}`)),
      brand: {
        '@type': 'Brand',
        name: productData.brand || 'AILYDIAN Holiday'
      },
      category: productData.category || 'Tourism & Travel Services',
      offers: {
        '@type': 'Offer',
        url: productData.url,
        priceCurrency: productData.price.currency,
        price: productData.price.amount.toString(),
        availability: `https://schema.org/${productData.availability}`,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      aggregateRating: productData.rating ? {
        '@type': 'AggregateRating',
        ratingValue: productData.rating.toString(),
        bestRating: '5',
        ratingCount: (productData.reviewCount || 0).toString()
      } : undefined,
      url: productData.url
    };
  }

  /**
   * Generate Article Rich Snippet
   */
  generateArticleSnippet(articleData: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: {
      name: string;
      url?: string;
    };
    publisher: {
      name: string;
      logo: string;
    };
    url: string;
    articleBody?: string;
    keywords?: string[];
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.headline,
      description: articleData.description,
      image: this.createImageObject(articleData.image, articleData.headline),
      datePublished: articleData.datePublished,
      dateModified: articleData.dateModified,
      author: {
        '@type': 'Person',
        name: articleData.author.name,
        url: articleData.author.url
      },
      publisher: {
        '@type': 'Organization',
        name: articleData.publisher.name,
        logo: {
          '@type': 'ImageObject',
          url: articleData.publisher.logo
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleData.url
      },
      articleBody: articleData.articleBody,
      keywords: articleData.keywords?.join(', '),
      url: articleData.url
    };
  }

  /**
   * Generate Event (Tour/Activity) Rich Snippet
   */
  generateEventSnippet(eventData: {
    name: string;
    description: string;
    image: string;
    startDate: string;
    endDate?: string;
    location: {
      name: string;
      address: string;
      city: string;
      country: string;
    };
    organizer: string;
    price?: { amount: number; currency: string };
    availability?: string;
    url: string;
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: eventData.name,
      description: eventData.description,
      image: this.createImageObject(eventData.image, eventData.name),
      startDate: eventData.startDate,
      endDate: eventData.endDate || eventData.startDate,
      location: {
        '@type': 'Place',
        name: eventData.location.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: eventData.location.address,
          addressLocality: eventData.location.city,
          addressCountry: eventData.location.country
        }
      },
      organizer: {
        '@type': 'Organization',
        name: eventData.organizer,
        url: 'https://holiday.ailydian.com'
      },
      offers: eventData.price ? {
        '@type': 'Offer',
        url: eventData.url,
        price: eventData.price.amount.toString(),
        priceCurrency: eventData.price.currency,
        availability: eventData.availability || 'https://schema.org/InStock'
      } : undefined,
      url: eventData.url
    };
  }

  /**
   * Generate FAQPage Rich Snippet
   */
  generateFAQPageSnippet(faqData: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.questions.map(qa => ({
        '@type': 'Question',
        name: qa.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: qa.answer
        }
      }))
    };
  }

  /**
   * Generate BreadcrumbList Rich Snippet
   */
  generateBreadcrumbSnippet(breadcrumbs: Array<{
    name: string;
    url: string;
  }>): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  /**
   * Generate Review Rich Snippet
   */
  generateReviewSnippet(reviewData: {
    itemReviewed: {
      type: string;
      name: string;
      url: string;
    };
    author: string;
    reviewRating: number;
    reviewBody: string;
    datePublished: string;
  }): RichSnippetSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': reviewData.itemReviewed.type,
        name: reviewData.itemReviewed.name,
        url: reviewData.itemReviewed.url
      },
      author: {
        '@type': 'Person',
        name: reviewData.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: reviewData.reviewRating.toString(),
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: reviewData.reviewBody,
      datePublished: reviewData.datePublished
    };
  }

  /**
   * Generate VideoObject Rich Snippet
   */
  generateVideoSnippet(videoData: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string; // ISO 8601 format: PT1H30M
    contentUrl: string;
    embedUrl?: string;
  }): VideoObjectSchema {
    return {
      '@type': 'VideoObject',
      name: videoData.name,
      description: videoData.description,
      thumbnailUrl: videoData.thumbnailUrl,
      uploadDate: videoData.uploadDate,
      duration: videoData.duration,
      contentUrl: videoData.contentUrl,
      embedUrl: videoData.embedUrl
    };
  }

  /**
   * Create ImageObject schema
   */
  private createImageObject(url: string, caption: string): ImageObjectSchema {
    return {
      '@type': 'ImageObject',
      url: this.optimizeImageUrl(url),
      width: this.config.imageOptimization.minWidth,
      height: this.config.imageOptimization.minHeight,
      caption,
      contentUrl: this.optimizeImageUrl(url),
      encodingFormat: 'image/webp'
    };
  }

  /**
   * Optimize image URL for rich results
   */
  private optimizeImageUrl(url: string): string {
    // Ensure absolute URL
    if (!url.startsWith('http')) {
      url = `https://holiday.ailydian.com${url}`;
    }

    // Add WebP optimization parameters if using Vercel or Cloudinary
    if (url.includes('vercel') || url.includes('cloudinary')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${this.config.imageOptimization.minWidth}&q=${this.config.imageOptimization.quality}&fm=webp`;
    }

    return url;
  }

  /**
   * Optimize title for SEO
   */
  private optimizeTitle(title: string): string {
    // Ensure title length is optimal
    if (title.length < this.config.contentRequirements.titleMinLength) {
      logger.warn(`Title too short: "${title}" (${title.length} chars, min ${this.config.contentRequirements.titleMinLength})`);
    }

    if (title.length > this.config.contentRequirements.titleMaxLength) {
      return title.substring(0, this.config.contentRequirements.titleMaxLength - 3) + '...';
    }

    return title;
  }

  /**
   * Optimize description for SEO
   */
  private optimizeDescription(description: string): string {
    // Ensure description length is optimal
    if (description.length < this.config.contentRequirements.descriptionMinLength) {
      logger.warn(`Description too short: ${description.length} chars (min ${this.config.contentRequirements.descriptionMinLength})`);
    }

    if (description.length > this.config.contentRequirements.descriptionMaxLength) {
      return description.substring(0, this.config.contentRequirements.descriptionMaxLength - 3) + '...';
    }

    return description;
  }

  /**
   * Validate rich snippet for Google requirements
   */
  validateRichSnippet(schema: RichSnippetSchema): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!schema['@context']) errors.push('Missing @context');
    if (!schema['@type']) errors.push('Missing @type');
    if (!schema.name) errors.push('Missing name');
    if (!schema.description) errors.push('Missing description');
    if (!schema.image) errors.push('Missing image');
    if (!schema.url) errors.push('Missing url');

    // Image validation
    if (schema.image) {
      const images = Array.isArray(schema.image) ? schema.image : [schema.image];
      if (images.length === 0) {
        warnings.push('No images provided - consider adding at least 3 high-quality images');
      }
    }

    // AggregateRating validation
    if (schema.aggregateRating) {
      const rating = schema.aggregateRating as any;
      if (!rating.ratingValue) errors.push('AggregateRating missing ratingValue');
      if (!rating.ratingCount && !rating.reviewCount) {
        warnings.push('AggregateRating should have ratingCount or reviewCount');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generate complete rich results for a page
   */
  generateCompleteRichResults(pageData: {
    type: 'hotel' | 'tour' | 'transfer' | 'attraction' | 'article' | 'homepage';
    title: string;
    description: string;
    images: string[];
    url: string;
    locale?: string;
    alternateLocales?: string[];
    data: any;
  }): {
    openGraph: OpenGraphTags;
    twitter: TwitterCardTags;
    schemas: RichSnippetSchema[];
  } {
    const openGraph = this.generateOpenGraphTags({
      type: pageData.type === 'homepage' ? 'website' : pageData.type === 'article' ? 'article' : 'product',
      title: pageData.title,
      description: pageData.description,
      image: pageData.images[0],
      url: pageData.url,
      locale: pageData.locale,
      alternateLocales: pageData.alternateLocales
    });

    const twitter = this.generateTwitterCardTags({
      type: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      image: pageData.images[0]
    });

    const schemas: RichSnippetSchema[] = [];

    // Type-specific schemas
    switch (pageData.type) {
      case 'hotel':
        schemas.push(this.generateHotelRichSnippet(pageData.data));
        break;
      case 'attraction':
        schemas.push(this.generateTouristAttractionSnippet(pageData.data));
        break;
      case 'tour':
      case 'transfer':
        schemas.push(this.generateProductSnippet(pageData.data));
        break;
      case 'article':
        schemas.push(this.generateArticleSnippet(pageData.data));
        break;
    }

    return { openGraph, twitter, schemas };
  }
}

// Singleton
let richResultsEngineInstance: RichResultsEngine | null = null;

export function getRichResultsEngine(): RichResultsEngine {
  if (!richResultsEngineInstance) {
    richResultsEngineInstance = new RichResultsEngine();
  }
  return richResultsEngineInstance;
}
