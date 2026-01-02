/**
 * Universal SEO/GEO System
 * Automatic schema.org, hreflang, and meta tags for all pages
 *
 * @module seo/universal-seo
 * @version 2.0.0
 * @seo 1378 pages × 8 languages = 11,024 optimized URLs
 */

// Base URL configuration
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://holiday.ailydian.com';

// Supported locales from Next.js config
export const SUPPORTED_LOCALES = ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

// ===================================================
// LANGUAGE-REGION MAPPING WITH CURRENCY
// ===================================================

export interface LocaleConfig {
  lang: string;
  region: string;
  currency: string;
  currencySymbol: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALE_REGIONS: Record<SupportedLocale, LocaleConfig> = {
  tr: {
    lang: 'tr',
    region: 'TR',
    currency: 'TRY',
    currencySymbol: '₺',
    name: 'Turkish',
    nativeName: 'Türkçe',
    dir: 'ltr',
  },
  en: {
    lang: 'en',
    region: 'US',
    currency: 'USD',
    currencySymbol: '$',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
  },
  de: {
    lang: 'de',
    region: 'DE',
    currency: 'EUR',
    currencySymbol: '€',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
  },
  ru: {
    lang: 'ru',
    region: 'RU',
    currency: 'RUB',
    currencySymbol: '₽',
    name: 'Russian',
    nativeName: 'Русский',
    dir: 'ltr',
  },
  ar: {
    lang: 'ar',
    region: 'SA',
    currency: 'SAR',
    currencySymbol: 'ر.س',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
  },
  fa: {
    lang: 'fa',
    region: 'IR',
    currency: 'IRR',
    currencySymbol: '﷼',
    name: 'Persian',
    nativeName: 'فارسی',
    dir: 'rtl',
  },
  fr: {
    lang: 'fr',
    region: 'FR',
    currency: 'EUR',
    currencySymbol: '€',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
  },
  el: {
    lang: 'el',
    region: 'GR',
    currency: 'EUR',
    currencySymbol: '€',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    dir: 'ltr',
  },
};

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'product' | 'service' | 'business.business';
  locale?: SupportedLocale;
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface SchemaOrgConfig {
  type: 'Product' | 'TouristAttraction' | 'Hotel' | 'Event' | 'Service' | 'LocalBusiness' | 'LodgingBusiness' | 'TravelAgency';
  name: string;
  description: string;
  image?: string | string[];
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  location?: {
    name: string;
    address: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
    coordinates?: { lat: number; lng: number };
  };
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'SoldOut';
  brand?: string;
  aggregateOffer?: {
    lowPrice: number;
    highPrice: number;
    priceCurrency: string;
  };
}

// ===================================================
// HREFLANG GENERATION
// ===================================================

export interface HreflangTag {
  rel: 'alternate';
  hreflang: string;
  href: string;
}

/**
 * Generate hreflang tags for all languages
 * Critical for international SEO and avoiding duplicate content penalties
 */
export function generateHreflangTags(path: string): HreflangTag[] {
  const hreflangs: HreflangTag[] = [];

  // Remove leading slash and locale prefix from path
  const cleanPath = path.replace(/^\/?(tr|en|de|ru|ar|fa|fr|el)?/, '').replace(/^\//, '');

  // Generate hreflang for each locale
  SUPPORTED_LOCALES.forEach((locale) => {
    const config = LOCALE_REGIONS[locale];
    const url = locale === 'tr'
      ? `${BASE_URL}/${cleanPath}`
      : `${BASE_URL}/${locale}/${cleanPath}`;

    hreflangs.push({
      rel: 'alternate',
      hreflang: `${config.lang}-${config.region}`,
      href: url.replace(/\/+$/, ''), // Remove trailing slash
    });
  });

  // Add x-default for default language (Turkish)
  const defaultUrl = `${BASE_URL}/${cleanPath}`;
  hreflangs.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: defaultUrl.replace(/\/+$/, ''),
  });

  return hreflangs;
}

// ===================================================
// META TAGS GENERATION
// ===================================================

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  robots?: string;
  openGraph: {
    type: string;
    locale: string;
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: 'summary_large_image' | 'summary';
    title: string;
    description: string;
    images: string[];
    creator?: string;
    site?: string;
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

/**
 * Generate comprehensive meta tags
 * Optimized for Google, Bing, Yandex, and social media platforms
 */
export function generateMetaTags(config: SEOConfig): MetaTags {
  const locale = config.locale || 'tr';
  const localeConfig = LOCALE_REGIONS[locale];

  // Ensure description is under 155 characters for optimal display
  const description = config.description.length > 155
    ? config.description.substring(0, 152) + '...'
    : config.description;

  // Ensure title is under 60 characters
  const title = config.title.length > 60
    ? config.title.substring(0, 57) + '...'
    : config.title;

  // Canonical URL
  const canonical = config.canonical || `${BASE_URL}/${locale === 'tr' ? '' : locale}`;

  // Robots meta
  const robots = config.noindex || config.nofollow
    ? `${config.noindex ? 'noindex' : 'index'},${config.nofollow ? 'nofollow' : 'follow'}`
    : undefined;

  // Default OG image
  const defaultOgImage = `${BASE_URL}/og-image-${locale}.jpg`;

  return {
    title,
    description,
    keywords: config.keywords?.join(', '),
    canonical,
    robots,
    openGraph: {
      type: config.type || 'website',
      locale: `${localeConfig.lang}_${localeConfig.region}`,
      title,
      description,
      url: canonical,
      siteName: 'AILYDIAN Holiday',
      images: config.ogImage
        ? [{ url: config.ogImage, width: 1200, height: 630, alt: title }]
        : [{ url: defaultOgImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: config.ogImage ? [config.ogImage] : [defaultOgImage],
      site: '@ailydian',
      creator: '@ailydian',
    },
    article: config.type === 'article' ? {
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
      author: config.author,
    } : undefined,
  };
}

// ===================================================
// SCHEMA.ORG STRUCTURED DATA
// ===================================================

/**
 * Generate schema.org structured data
 * Enables Google Rich Results, Knowledge Graph, and enhanced search listings
 */
export function generateSchemaOrg(config: SchemaOrgConfig) {
  const baseSchema: any = {
    '@context': 'https://schema.org',
    '@type': config.type,
    name: config.name,
    description: config.description,
  };

  // Images
  if (config.image) {
    baseSchema.image = Array.isArray(config.image) ? config.image : [config.image];
  }

  // Pricing information
  if (config.price && config.currency) {
    baseSchema.offers = {
      '@type': 'Offer',
      price: config.price.toFixed(2),
      priceCurrency: config.currency,
      availability: `https://schema.org/${config.availability || 'InStock'}`,
      url: baseSchema.url,
    };
  }

  // Aggregate offer (price range)
  if (config.aggregateOffer) {
    baseSchema.offers = {
      '@type': 'AggregateOffer',
      lowPrice: config.aggregateOffer.lowPrice.toFixed(2),
      highPrice: config.aggregateOffer.highPrice.toFixed(2),
      priceCurrency: config.aggregateOffer.priceCurrency,
    };
  }

  // Rating and reviews
  if (config.rating && config.reviewCount) {
    baseSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: config.rating.toFixed(1),
      reviewCount: config.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Location information
  if (config.location) {
    const addressSchema: any = {
      '@type': 'PostalAddress',
      addressLocality: config.location.city || config.location.name,
      addressCountry: config.location.country || 'TR',
    };

    if (config.location.address) {
      addressSchema.streetAddress = config.location.address;
    }

    if (config.location.region) {
      addressSchema.addressRegion = config.location.region;
    }

    if (config.location.postalCode) {
      addressSchema.postalCode = config.location.postalCode;
    }

    baseSchema.address = addressSchema;

    // Geo coordinates
    if (config.location.coordinates) {
      baseSchema.geo = {
        '@type': 'GeoCoordinates',
        latitude: config.location.coordinates.lat,
        longitude: config.location.coordinates.lng,
      };
    }
  }

  // Brand
  if (config.brand) {
    baseSchema.brand = {
      '@type': 'Brand',
      name: config.brand,
    };
  }

  return baseSchema;
}

// ===================================================
// BREADCRUMB SCHEMA
// ===================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate breadcrumb schema
 * Displays breadcrumb navigation in search results
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ===================================================
// FAQ SCHEMA
// ===================================================

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQ schema
 * Displays FAQ rich results in Google search
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ===================================================
// REVIEW SCHEMA
// ===================================================

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

/**
 * Generate review schema
 */
export function generateReviewSchema(reviews: Review[]) {
  return reviews.map((review) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: review.date,
    reviewBody: review.text,
  }));
}

// ===================================================
// ORGANIZATION SCHEMA (SITE-WIDE)
// ===================================================

export function generateOrganizationSchema(locale: SupportedLocale = 'tr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'AILYDIAN Holiday',
    alternateName: 'Holiday.AILYDIAN',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Premium travel and holiday booking platform for Turkey',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-850-XXX-XXXX',
      contactType: 'Customer Service',
      availableLanguage: ['Turkish', 'English', 'German', 'Russian', 'Arabic', 'Persian', 'French', 'Greek'],
    },
    sameAs: [
      'https://www.facebook.com/ailydian',
      'https://www.instagram.com/ailydian',
      'https://twitter.com/ailydian',
      'https://www.linkedin.com/company/ailydian',
    ],
  };
}

// ===================================================
// WEBSITE SCHEMA
// ===================================================

export function generateWebsiteSchema(locale: SupportedLocale = 'tr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AILYDIAN Holiday',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${locale === 'tr' ? '' : locale + '/'}search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ===================================================
// HELPER FUNCTIONS
// ===================================================

/**
 * Get locale configuration
 */
export function getLocaleConfig(locale: SupportedLocale = 'tr'): LocaleConfig {
  return LOCALE_REGIONS[locale] || LOCALE_REGIONS.tr;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, locale: SupportedLocale = 'tr'): string {
  const config = getLocaleConfig(locale);
  return `${config.currencySymbol}${price.toFixed(2)}`;
}

/**
 * Get canonical URL for page
 */
export function getCanonicalUrl(path: string, locale: SupportedLocale = 'tr'): string {
  const cleanPath = path.replace(/^\/?(tr|en|de|ru|ar|fa|fr|el)?/, '').replace(/^\//, '');
  return locale === 'tr'
    ? `${BASE_URL}/${cleanPath}`.replace(/\/+$/, '')
    : `${BASE_URL}/${locale}/${cleanPath}`.replace(/\/+$/, '');
}

// ===================================================
// EXPORTS
// ===================================================

export {
  BASE_URL,
};

export default {
  LOCALE_REGIONS,
  SUPPORTED_LOCALES,
  BASE_URL,
  generateHreflangTags,
  generateMetaTags,
  generateSchemaOrg,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  getLocaleConfig,
  formatPrice,
  getCanonicalUrl,
};
