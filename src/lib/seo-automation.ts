/**
 * SEO Automation System
 * Automatic meta tag generation with multilingual keyword integration
 * White-hat SEO practices with natural language optimization
 */

import { getKeywordsForPage, generateMetaKeywords, SEOKeyword } from '../data/seo-keywords';

export interface SEOMetaTags {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  hreflang: Array<{ lang: string; url: string }>;
  schema: object;
}

export interface PageSEOConfig {
  pageName: 'rentals' | 'tours' | 'hotels' | 'flights' | 'transfers' | 'destinations';
  language?: string;
  title?: string;
  description?: string;
  path: string;
  imageUrl?: string;
  additionalKeywords?: string[];
}

/**
 * Generate comprehensive SEO meta tags for any page
 * @param config Page configuration
 * @returns Complete SEO meta tags
 */
export const generateSEOMetaTags = (config: PageSEOConfig): SEOMetaTags => {
  const {
    pageName,
    language = 'tr',
    title,
    description,
    path,
    imageUrl = 'https://travel.ailydian.com/og-image.jpg',
    additionalKeywords = []
  } = config;

  // Get multilingual keywords for this page
  const keywords = getKeywordsForPage(pageName, language);

  // Generate base meta keywords
  const baseKeywords = generateMetaKeywords(pageName, language);
  const allKeywords = additionalKeywords.length > 0
    ? `${baseKeywords}, ${additionalKeywords.join(', ')}`
    : baseKeywords;

  // Generate title with primary keyword (natural placement)
  const defaultTitles = {
    tr: {
      rentals: `${keywords.primary} | Airbnb Tarzı Konaklama - Travel.Ailydian`,
      tours: `${keywords.primary} | En İyi Turlar ve Aktiviteler - Travel.Ailydian`,
      hotels: `${keywords.primary} | Lüks Otel Rezervasyonu - Travel.Ailydian`,
      flights: `${keywords.primary} | Ucuz Uçak Bileti - Travel.Ailydian`,
      transfers: `${keywords.primary} | VIP Transfer Hizmeti - Travel.Ailydian`,
      destinations: `${keywords.primary} | Keşfedilecek Destinasyonlar - Travel.Ailydian`
    },
    en: {
      rentals: `${keywords.primary} | Airbnb-Style Vacation Rentals - Travel.Ailydian`,
      tours: `${keywords.primary} | Best Tours & Activities - Travel.Ailydian`,
      hotels: `${keywords.primary} | Luxury Hotel Booking - Travel.Ailydian`,
      flights: `${keywords.primary} | Cheap Flight Tickets - Travel.Ailydian`,
      transfers: `${keywords.primary} | VIP Transfer Service - Travel.Ailydian`,
      destinations: `${keywords.primary} | Explore Destinations - Travel.Ailydian`
    }
  };

  const generatedTitle = title || (defaultTitles[language as keyof typeof defaultTitles]?.[pageName] || defaultTitles.tr[pageName]);

  // Generate description with secondary and longtail keywords (natural language)
  const defaultDescriptions = {
    tr: {
      rentals: `${keywords.secondary[0]} ve ${keywords.secondary[1]} seçenekleriyle ${keywords.longtail[0]}. ${keywords.localVariations[0]} için en uygun fiyatlar.`,
      tours: `${keywords.secondary[0]}, ${keywords.secondary[1]} ve daha fazlası. ${keywords.longtail[0]} ile unutulmaz deneyimler.`,
      hotels: `${keywords.secondary[0]} ve ${keywords.secondary[1]} seçenekleri. ${keywords.longtail[0]} için en iyi fırsatlar.`,
      flights: `${keywords.secondary[0]} bulun. ${keywords.longtail[0]} için hemen karşılaştır ve rezerve et.`,
      transfers: `${keywords.secondary[0]} ve ${keywords.secondary[1]} hizmeti. ${keywords.longtail[0]} güvenle.`,
      destinations: `${keywords.secondary[0]} keşfedin. ${keywords.longtail[0]} rehberi ve ipuçları.`
    },
    en: {
      rentals: `${keywords.secondary[0]} and ${keywords.secondary[1]} options for ${keywords.longtail[0]}. Best prices for ${keywords.localVariations[0]}.`,
      tours: `${keywords.secondary[0]}, ${keywords.secondary[1]} and more. Unforgettable experiences with ${keywords.longtail[0]}.`,
      hotels: `${keywords.secondary[0]} and ${keywords.secondary[1]} options. Best deals for ${keywords.longtail[0]}.`,
      flights: `Find ${keywords.secondary[0]}. Compare and book for ${keywords.longtail[0]} now.`,
      transfers: `${keywords.secondary[0]} and ${keywords.secondary[1]} service. Safe ${keywords.longtail[0]}.`,
      destinations: `Explore ${keywords.secondary[0]}. Guide and tips for ${keywords.longtail[0]}.`
    }
  };

  const generatedDescription = description || (defaultDescriptions[language as keyof typeof defaultDescriptions]?.[pageName] || defaultDescriptions.tr[pageName]);

  // Generate canonical URL
  const canonical = `https://travel.ailydian.com${path}`;

  // Generate hreflang tags for international SEO
  const hreflang = [
    { lang: 'tr', url: `https://travel.ailydian.com/tr${path}` },
    { lang: 'en', url: `https://travel.ailydian.com/en${path}` },
    { lang: 'de', url: `https://travel.ailydian.com/de${path}` },
    { lang: 'ru', url: `https://travel.ailydian.com/ru${path}` },
    { lang: 'ar', url: `https://travel.ailydian.com/ar${path}` },
    { lang: 'fr', url: `https://travel.ailydian.com/fr${path}` },
    { lang: 'es', url: `https://travel.ailydian.com/es${path}` },
    { lang: 'x-default', url: canonical }
  ];

  // Generate JSON-LD Schema for rich snippets
  const schema = generateSchemaMarkup(pageName, {
    title: generatedTitle,
    description: generatedDescription,
    url: canonical,
    image: imageUrl,
    keywords: keywords
  });

  return {
    title: generatedTitle,
    description: generatedDescription,
    keywords: allKeywords,
    ogTitle: generatedTitle,
    ogDescription: generatedDescription,
    ogImage: imageUrl,
    canonical,
    hreflang,
    schema
  };
};

/**
 * Generate JSON-LD Schema markup for rich snippets
 */
const generateSchemaMarkup = (
  pageName: string,
  data: { title: string; description: string; url: string; image: string; keywords: SEOKeyword }
) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title,
    description: data.description,
    url: data.url,
    image: data.image,
    publisher: {
      '@type': 'Organization',
      name: 'Travel.Ailydian',
      logo: {
        '@type': 'ImageObject',
        url: 'https://travel.ailydian.com/logo.png'
      }
    }
  };

  // Add specific schema based on page type
  switch (pageName) {
    case 'rentals':
      return {
        ...baseSchema,
        '@type': 'RealEstateAgent',
        areaServed: ['Alanya', 'Antalya', 'Marmaris', 'Bodrum', 'Çeşme'],
        priceRange: '$$-$$$$'
      };

    case 'tours':
      return {
        ...baseSchema,
        '@type': 'TouristAttraction',
        touristType: ['Adventure', 'Cultural', 'Nature'],
        availableLanguage: ['tr', 'en', 'de', 'ru', 'ar']
      };

    case 'hotels':
      return {
        ...baseSchema,
        '@type': 'LodgingBusiness',
        starRating: {
          '@type': 'Rating',
          ratingValue: '4.5'
        }
      };

    case 'flights':
      return {
        ...baseSchema,
        '@type': 'Service',
        serviceType: 'Flight Booking',
        provider: {
          '@type': 'Organization',
          name: 'Travel.Ailydian'
        }
      };

    case 'transfers':
      return {
        ...baseSchema,
        '@type': 'Service',
        serviceType: 'Airport Transfer',
        areaServed: ['Antalya', 'Bodrum', 'Marmaris', 'Çeşme', 'Alanya']
      };

    case 'destinations':
      return {
        ...baseSchema,
        '@type': 'TravelAgency',
        areaServed: 'Turkey'
      };

    default:
      return baseSchema;
  }
};

/**
 * Generate SEO-friendly URL slug
 */
export const generateSEOSlug = (title: string, language: string = 'tr'): string => {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
  };

  let slug = title.toLowerCase();

  // Replace Turkish characters
  if (language === 'tr') {
    Object.keys(turkishMap).forEach(key => {
      slug = slug.replace(new RegExp(key, 'g'), turkishMap[key]);
    });
  }

  // Replace spaces with hyphens and remove special characters
  slug = slug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return slug;
};

/**
 * Calculate keyword density (white-hat SEO checker)
 */
export const calculateKeywordDensity = (content: string, keyword: string): number => {
  const words = content.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  const totalWords = words.length;

  let count = 0;
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const phrase = words.slice(i, i + keywordWords.length).join(' ');
    if (phrase === keywordWords.join(' ')) {
      count++;
    }
  }

  return totalWords > 0 ? (count / totalWords) * 100 : 0;
};

/**
 * Validate SEO quality (white-hat checker)
 */
export const validateSEOQuality = (metaTags: SEOMetaTags, content: string): {
  score: number;
  issues: string[];
  recommendations: string[];
} => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Check title length (optimal 50-60 characters)
  if (metaTags.title.length < 30) {
    issues.push('Title too short (recommended 50-60 characters)');
    score -= 10;
  } else if (metaTags.title.length > 70) {
    issues.push('Title too long (recommended 50-60 characters)');
    score -= 5;
  }

  // Check description length (optimal 150-160 characters)
  if (metaTags.description.length < 120) {
    issues.push('Description too short (recommended 150-160 characters)');
    score -= 10;
  } else if (metaTags.description.length > 170) {
    issues.push('Description too long (recommended 150-160 characters)');
    score -= 5;
  }

  // Check keyword density (should be natural, 1.5-2.5%)
  const keywords = metaTags.keywords.split(',')[0].trim();
  const density = calculateKeywordDensity(content, keywords);

  if (density < 1) {
    recommendations.push(`Increase usage of primary keyword "${keywords}" (current: ${density.toFixed(2)}%)`);
    score -= 5;
  } else if (density > 3) {
    issues.push(`Keyword stuffing detected for "${keywords}" (${density.toFixed(2)}%). Reduce to 1.5-2.5%`);
    score -= 15;
  }

  // Check if canonical URL is set
  if (!metaTags.canonical) {
    issues.push('Missing canonical URL');
    score -= 10;
  }

  // Check if hreflang tags exist for international SEO
  if (metaTags.hreflang.length < 2) {
    recommendations.push('Add hreflang tags for international SEO');
    score -= 5;
  }

  // Check schema markup
  if (!metaTags.schema || Object.keys(metaTags.schema).length === 0) {
    issues.push('Missing Schema.org structured data');
    score -= 10;
  }

  // Recommendations for improvement
  if (score === 100) {
    recommendations.push('SEO optimization is excellent! Keep up the good work.');
  } else if (score >= 80) {
    recommendations.push('Good SEO optimization. Minor improvements recommended.');
  } else if (score >= 60) {
    recommendations.push('SEO needs improvement. Address the issues above.');
  } else {
    recommendations.push('Critical SEO issues detected. Immediate action required.');
  }

  return { score, issues, recommendations };
};

export default {
  generateSEOMetaTags,
  generateSEOSlug,
  calculateKeywordDensity,
  validateSEOQuality
};
