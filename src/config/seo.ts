/**
 * Enterprise SEO Configuration
 * Global travel platform optimization for travel.ailydian.com
 */

export const SEO_CONFIG = {
  // Primary domain
  domain: 'travel.ailydian.com',
  url: 'https://travel.ailydian.com',

  // Default metadata
  defaultTitle: 'Ailydian Travel - AI-Powered Enterprise Travel Platform | Hotels, Flights & Transfers',
  titleTemplate: '%s | Ailydian Travel',
  defaultDescription: 'Discover the future of travel with Ailydian AI. Book hotels, flights, and airport transfers worldwide. Blockchain-secured bookings, VR previews, and personalized AI travel planning.',

  // Brand information
  siteName: 'Ailydian Travel',
  brandName: 'Ailydian',
  slogan: 'AI-Powered Enterprise Travel Solutions',

  // Social media
  social: {
    twitter: '@ailydiantravel',
    facebook: 'ailydiantravel',
    instagram: 'ailydiantravel',
    linkedin: 'company/ailydian',
  },

  // Contact
  contact: {
    email: 'info@ailydian.com',
    phone: '+90-850-XXX-XXXX',
    supportEmail: 'support@ailydian.com',
  },

  // Geographic targeting
  geo: {
    country: 'Turkey',
    region: 'Global',
    placename: 'Istanbul, Turkey',
    position: '41.0082;28.9784', // Istanbul coordinates
  },

  // Languages supported
  languages: ['tr', 'en', 'de', 'ru', 'ar', 'zh'],
  defaultLanguage: 'tr',

  // Keywords - High-value travel industry keywords
  primaryKeywords: [
    // Turkish market
    'otel rezervasyon',
    'ucuz otel',
    'ucuz uçak bileti',
    'havalimanı transfer',
    'tatil paketleri',
    'antalya otelleri',
    'istanbul otelleri',
    'bodrum otelleri',
    'all inclusive otel',

    // International market
    'hotel booking',
    'cheap hotels',
    'flight booking',
    'airport transfer',
    'holiday packages',
    'turkey hotels',
    'antalya hotels',
    'istanbul hotels',
    'all inclusive resorts',

    // AI/Tech differentiators
    'ai travel planner',
    'blockchain travel booking',
    'vr hotel preview',
    'smart travel assistant',
    'ailydian ai',
  ],

  secondaryKeywords: [
    'luxury hotels turkey',
    'budget hotels',
    'business travel',
    'group travel',
    'airport shuttle',
    'vip transfer',
    'tour packages',
    'belek hotels',
    'side hotels',
    'alanya hotels',
    'kemer hotels',
    'çeşme hotels',
    'bodrum beach hotels',
    'marmaris hotels',
    'dalaman airport transfer',
    'sabiha gökçen transfer',
    'istanbul airport transfer',
    'antalya airport transfer',
  ],

  // Structured data
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Ailydian Travel',
    description: 'AI-powered enterprise travel platform offering hotels, flights, and transfers worldwide',
    url: 'https://travel.ailydian.com',
    logo: 'https://travel.ailydian.com/images/logo.png',
    image: 'https://travel.ailydian.com/images/og-image.jpg',
    telephone: '+90-850-XXX-XXXX',
    email: 'info@ailydian.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Istanbul',
      addressLocality: 'Istanbul',
    },
    sameAs: [
      'https://twitter.com/ailydiantravel',
      'https://facebook.com/ailydiantravel',
      'https://instagram.com/ailydiantravel',
      'https://linkedin.com/company/ailydian',
    ],
    priceRange: '$$',
    areaServed: [
      'Turkey',
      'Europe',
      'Middle East',
      'Asia',
      'Worldwide',
    ],
    serviceType: [
      'Hotel Booking',
      'Flight Booking',
      'Airport Transfer',
      'Tour Packages',
      'Travel Planning',
    ],
    knowsAbout: [
      'Hotels',
      'Flights',
      'Transfers',
      'Tours',
      'Travel',
      'Holidays',
      'Vacation',
    ],
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocales: ['en_US', 'de_DE', 'ru_RU', 'ar_SA', 'zh_CN'],
    siteName: 'Ailydian Travel',
    images: [
      {
        url: 'https://travel.ailydian.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ailydian Travel - AI-Powered Travel Platform',
      },
    ],
  },

  // Twitter Card defaults
  twitter: {
    cardType: 'summary_large_image',
    site: '@ailydiantravel',
    creator: '@ailydiantravel',
  },

  // Verification codes
  verification: {
    google: '', // Add Google Search Console verification
    bing: '', // Add Bing Webmaster Tools verification
    yandex: '', // Add Yandex Webmaster verification
    pinterest: '', // Add Pinterest verification if applicable
  },

  // Robots meta
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

/**
 * Generate page-specific SEO metadata
 */
export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noindex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}) {
  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;

  const fullDescription = description || SEO_CONFIG.defaultDescription;

  const fullUrl = url
    ? `${SEO_CONFIG.url}${url}`
    : SEO_CONFIG.url;

  const fullImage = image || SEO_CONFIG.openGraph.images[0].url;

  const allKeywords = [
    ...SEO_CONFIG.primaryKeywords,
    ...keywords,
  ].join(', ');

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    canonical: fullUrl,
    openGraph: {
      ...SEO_CONFIG.openGraph,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      type,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      ...SEO_CONFIG.twitter,
      title: fullTitle,
      description: fullDescription,
      image: fullImage,
    },
    robots: noindex
      ? { index: false, follow: false }
      : SEO_CONFIG.robots,
  };
}

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO = {
  home: generateSEO({
    title: 'Ana Sayfa',
    description: 'Türkiye\'nin en gelişmiş AI destekli seyahat platformu. Oteller, uçak biletleri, havalimanı transferleri ve tur paketlerinde en uygun fiyatlar.',
    keywords: ['otel rezervasyon', 'ucuz uçak bileti', 'havalimanı transfer', 'tatil paketi'],
  }),

  hotels: generateSEO({
    title: 'Oteller - En Uygun Otel Fiyatları',
    description: 'Türkiye ve dünya genelinde 10,000+ otel seçeneği. Antalya, İstanbul, Bodrum, Alanya otelleri. All inclusive ve butik oteller.',
    keywords: ['otel rezervasyon', 'ucuz otel', 'antalya otelleri', 'istanbul otelleri', 'all inclusive'],
    url: '/hotels',
  }),

  flights: generateSEO({
    title: 'Uçak Biletleri - Ucuz Uçak Bileti Fırsatları',
    description: 'Türk Hava Yolları, Pegasus, SunExpress ile en ucuz uçak biletleri. Yurtiçi ve yurtdışı uçuşlar.',
    keywords: ['ucuz uçak bileti', 'uçak bileti', 'türk hava yolları', 'pegasus'],
    url: '/flights',
  }),

  transfers: generateSEO({
    title: 'Havalimanı Transfer - VIP & Standart Transfer Hizmetleri',
    description: 'Antalya, İstanbul, Bodrum havalimanı transfer hizmetleri. 7/24 profesyonel şoför, VIP araçlar.',
    keywords: ['havalimanı transfer', 'vip transfer', 'antalya transfer', 'istanbul transfer'],
    url: '/transfers',
  }),
};

export default SEO_CONFIG;
