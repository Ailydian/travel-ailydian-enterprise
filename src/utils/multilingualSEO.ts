/**
 * Multilingual SEO Utilities for Travel LyDian
 * Supports 6 languages: TR, EN, RU, DE, AR, FR
 */

export type SupportedLanguage = 'tr' | 'en' | 'ru' | 'de' | 'ar' | 'fr';

export interface MultiLangText {
  tr: string;
  en: string;
  ru: string;
  de: string;
  ar: string;
  fr: string;
}

export interface MultiLangSEO {
  title: MultiLangText;
  description: MultiLangText;
  keywords: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  slug: MultiLangText;
}

// Language names in their native language
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  tr: 'Türkçe',
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
  ar: 'العربية',
  fr: 'Français'
};

// Language codes for hreflang
export const HREFLANG_CODES: Record<SupportedLanguage, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  ru: 'ru-RU',
  de: 'de-DE',
  ar: 'ar-SA',
  fr: 'fr-FR'
};

// Currency symbols by language
export const CURRENCY_SYMBOLS: Record<SupportedLanguage, string> = {
  tr: '₺',
  en: '$',
  ru: '₽',
  de: '€',
  ar: 'ر.س',
  fr: '€'
};

// Get text by language with fallback to Turkish
export const getLocalizedText = (text: MultiLangText, lang: SupportedLanguage = 'tr'): string => {
  return text[lang] || text.tr;
};

// Generate hreflang tags for a page
export const generateHreflangTags = (baseUrl: string, slugs: MultiLangText): Array<{
  rel: string;
  hrefLang: string;
  href: string;
}> => {
  const tags: Array<{ rel: string; hrefLang: string; href: string }> = [];

  // Add tag for each language
  Object.entries(HREFLANG_CODES).forEach(([lang, hreflang]) => {
    const slug = slugs[lang as SupportedLanguage];
    tags.push({
      rel: 'alternate',
      hrefLang: hreflang,
      href: `${baseUrl}/${lang}/${slug}`
    });
  });

  // Add x-default (typically English)
  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${baseUrl}/en/${slugs.en}`
  });

  return tags;
};

// Generate Schema.org structured data with multi-language support
export const generateTourSchemaOrg = (tour: {
  name: MultiLangText;
  description: MultiLangText;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  duration: string;
  location: string;
  images: string[];
  slug: MultiLangText;
}, lang: SupportedLanguage = 'tr') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: getLocalizedText(tour.name, lang),
    description: getLocalizedText(tour.description, lang),
    image: tour.images,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
      availability: 'https://schema.org/InStock',
      url: `https://holiday.ailydian.com/${lang}/tours/${getLocalizedText(tour.slug, lang)}`,
      validFrom: new Date().toISOString(),
    },
    provider: {
      '@type': 'Organization',
      name: 'AILYDIAN Holiday',
      url: 'https://holiday.ailydian.com',
      logo: 'https://holiday.ailydian.com/logo.png'
    },
    touristType: 'tourist',
    duration: tour.duration,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    location: {
      '@type': 'Place',
      name: tour.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: tour.location,
        addressCountry: 'TR',
      },
    },
    inLanguage: HREFLANG_CODES[lang]
  };
};

// Generate Transfer Schema.org structured data
export const generateTransferSchemaOrg = (transfer: {
  from: MultiLangText;
  to: MultiLangText;
  price: number;
  currency: string;
  distance: number;
  duration: number;
  rating: number;
  totalTransfers: number;
  slug: MultiLangText;
}, lang: SupportedLanguage = 'tr') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `${getLocalizedText(transfer.from, lang)} - ${getLocalizedText(transfer.to, lang)} Transfer`,
    description: `Professional transfer service from ${getLocalizedText(transfer.from, lang)} to ${getLocalizedText(transfer.to, lang)}`,
    provider: {
      '@type': 'Organization',
      name: 'AILYDIAN Holiday',
      url: 'https://holiday.ailydian.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Antalya',
      '@id': 'https://www.wikidata.org/wiki/Q6487'
    },
    offers: {
      '@type': 'Offer',
      price: transfer.price,
      priceCurrency: transfer.currency,
      availability: 'https://schema.org/InStock',
      url: `https://holiday.ailydian.com/${lang}/transfers/${getLocalizedText(transfer.slug, lang)}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: transfer.rating,
      reviewCount: transfer.totalTransfers,
      bestRating: 5,
      worstRating: 1,
    },
    inLanguage: HREFLANG_CODES[lang]
  };
};

// SEO-friendly URL slug generator (supports all languages including RTL)
export const generateSEOSlug = (text: string, lang: SupportedLanguage): string => {
  // Remove special characters and convert to lowercase
  let slug = text.toLowerCase();

  // Language-specific character replacements
  const replacements: Record<string, Record<string, string>> = {
    tr: {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u'
    },
    de: {
      'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'
    },
    ru: {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
      'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
      'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
      'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    },
    ar: {
      'أ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
      'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's',
      'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
      'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y'
    }
  };

  // Apply language-specific replacements
  if (replacements[lang]) {
    Object.entries(replacements[lang]).forEach(([char, replacement]) => {
      slug = slug.replace(new RegExp(char, 'g'), replacement);
    });
  }

  // Remove all non-alphanumeric characters except hyphens
  slug = slug.replace(/[^a-z0-9\s-]/g, '');

  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, '-');

  // Remove consecutive hyphens
  slug = slug.replace(/-+/g, '-');

  // Trim hyphens from start and end
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
};

// Generate Open Graph tags for social media
export const generateOpenGraphTags = (content: {
  title: MultiLangText;
  description: MultiLangText;
  images: string[];
  url: string;
  type?: string;
}, lang: SupportedLanguage = 'tr') => {
  return {
    title: getLocalizedText(content.title, lang),
    description: getLocalizedText(content.description, lang),
    images: content.images.map(url => ({ url, alt: getLocalizedText(content.title, lang) })),
    url: content.url,
    type: content.type || 'website',
    siteName: 'AILYDIAN Holiday',
    locale: HREFLANG_CODES[lang],
  };
};

// Generate Twitter Card tags
export const generateTwitterCardTags = (content: {
  title: MultiLangText;
  description: MultiLangText;
  images: string[];
}, lang: SupportedLanguage = 'tr') => {
  return {
    cardType: 'summary_large_image',
    title: getLocalizedText(content.title, lang),
    description: getLocalizedText(content.description, lang),
    images: content.images,
    site: '@lydian',
    creator: '@lydian'
  };
};

export default {
  getLocalizedText,
  generateHreflangTags,
  generateTourSchemaOrg,
  generateTransferSchemaOrg,
  generateSEOSlug,
  generateOpenGraphTags,
  generateTwitterCardTags,
  LANGUAGE_NAMES,
  HREFLANG_CODES,
  CURRENCY_SYMBOLS
};
