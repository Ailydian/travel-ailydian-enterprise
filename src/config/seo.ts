/**
 * Enterprise SEO Configuration
 * Holiday travel platform optimization for holiday.ailydian.com
 * Brand Focus: Holiday, Vacation & Leisure Travel
 */

export const SEO_CONFIG = {
  // Primary domain
  domain: 'holiday.ailydian.com',
  url: 'https://holiday.ailydian.com',

  // Default metadata
  defaultTitle: 'AILYDIAN Holiday - AI-Powered Holiday Travel Platform | Vacation Hotels, Flights & Holiday Transfers',
  titleTemplate: '%s | AILYDIAN Holiday',
  defaultDescription: 'Discover your perfect holiday with AILYDIAN AI. Book vacation hotels, holiday flights, and airport transfers worldwide. Blockchain-secured holiday bookings, VR previews, and personalized AI holiday planning.',

  // Brand information
  siteName: 'AILYDIAN Holiday',
  brandName: 'AILYDIAN',
  slogan: 'AI-Powered Holiday & Vacation Solutions',

  // Social media
  social: {
    twitter: '@ailydianholiday',
    facebook: 'ailydianholiday',
    instagram: 'ailydianholiday',
    linkedin: 'company/ailydian',
  },

  // Contact
  contact: {
    email: 'holiday@ailydian.com',
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

  // Keywords - High-value holiday travel keywords
  primaryKeywords: [
    // Turkish market - Holiday focused
    'tatil oteli rezervasyonu',
    'bayram tatili oteli',
    'ucuz tatil oteli',
    'tatil uçak bileti',
    'tatil havalimanı transferi',
    'tatil paketleri',
    'antalya tatil otelleri',
    'istanbul tatil otelleri',
    'bodrum tatil otelleri',
    'all inclusive tatil',

    // International market - Holiday focused
    'holiday hotel booking',
    'vacation hotel deals',
    'cheap holiday hotels',
    'holiday flight booking',
    'holiday airport transfer',
    'vacation packages',
    'turkey holiday hotels',
    'antalya holiday resorts',
    'istanbul vacation hotels',
    'all inclusive holiday resorts',

    // AI/Tech differentiators - Holiday focused
    'ai holiday planner',
    'blockchain holiday booking',
    'vr holiday preview',
    'smart holiday assistant',
    'ailydian holiday ai',
  ],

  secondaryKeywords: [
    'luxury holiday hotels turkey',
    'budget vacation hotels',
    'family holiday travel',
    'group vacation travel',
    'holiday airport shuttle',
    'vip holiday transfer',
    'holiday tour packages',
    'belek holiday hotels',
    'side vacation hotels',
    'alanya holiday resorts',
    'kemer vacation hotels',
    'çeşme holiday hotels',
    'bodrum beach holiday hotels',
    'marmaris vacation resorts',
    'dalaman holiday airport transfer',
    'sabiha gökçen holiday transfer',
    'istanbul vacation airport transfer',
    'antalya holiday airport transfer',
  ],

  // Structured data
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'AILYDIAN Holiday',
    description: 'AI-powered holiday travel platform offering vacation hotels, holiday flights, and holiday transfers worldwide',
    url: 'https://holiday.ailydian.com',
    logo: 'https://holiday.ailydian.com/images/logo.png',
    image: 'https://holiday.ailydian.com/images/og-image.jpg',
    telephone: '+90-850-XXX-XXXX',
    email: 'holiday@ailydian.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Istanbul',
      addressLocality: 'Istanbul',
    },
    sameAs: [
      'https://twitter.com/ailydianholiday',
      'https://facebook.com/ailydianholiday',
      'https://instagram.com/ailydianholiday',
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
      'Holiday Hotel Booking',
      'Vacation Flight Booking',
      'Holiday Airport Transfer',
      'Holiday Tour Packages',
      'Holiday Travel Planning',
    ],
    knowsAbout: [
      'Holiday Hotels',
      'Vacation Flights',
      'Holiday Transfers',
      'Holiday Tours',
      'Vacation Travel',
      'Holidays',
      'Vacation',
      'Leisure Travel',
    ],
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocales: ['en_US', 'de_DE', 'ru_RU', 'ar_SA', 'zh_CN'],
    siteName: 'AILYDIAN Holiday',
    images: [
      {
        url: 'https://holiday.ailydian.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AILYDIAN Holiday - AI-Powered Holiday Travel Platform',
      },
    ],
  },

  // Twitter Card defaults
  twitter: {
    cardType: 'summary_large_image',
    site: '@ailydianholiday',
    creator: '@ailydianholiday',
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
    title: 'Ana Sayfa - Tatil ve Bayram Planlaması',
    description: 'Türkiye\'nin en gelişmiş AI destekli tatil platformu. Tatil otelleri, bayram tatili uçak biletleri, havalimanı transferleri ve tatil tur paketlerinde en uygun fiyatlar.',
    keywords: ['tatil oteli rezervasyon', 'bayram tatili uçak bileti', 'tatil havalimanı transfer', 'tatil paketi'],
  }),

  hotels: generateSEO({
    title: 'Tatil Otelleri - En Uygun Tatil Oteli Fiyatları',
    description: 'Türkiye ve dünya genelinde 10,000+ tatil oteli seçeneği. Antalya, İstanbul, Bodrum, Alanya tatil otelleri. All inclusive tatil ve butik tatil otelleri.',
    keywords: ['tatil oteli rezervasyon', 'ucuz tatil oteli', 'antalya tatil otelleri', 'istanbul tatil otelleri', 'all inclusive tatil'],
    url: '/hotels',
  }),

  flights: generateSEO({
    title: 'Tatil Uçak Biletleri - Ucuz Tatil Uçuşu Fırsatları',
    description: 'Türk Hava Yolları, Pegasus, SunExpress ile en ucuz tatil uçak biletleri. Bayram tatili yurtiçi ve yurtdışı uçuşlar.',
    keywords: ['ucuz tatil uçak bileti', 'bayram tatili uçak', 'tatil uçuşu', 'yaz tatili uçak bileti'],
    url: '/flights',
  }),

  transfers: generateSEO({
    title: 'Tatil Havalimanı Transfer - VIP & Standart Tatil Transfer Hizmetleri',
    description: 'Antalya, İstanbul, Bodrum tatil havalimanı transfer hizmetleri. 7/24 profesyonel şoför, VIP tatil araçları.',
    keywords: ['tatil havalimanı transfer', 'vip tatil transfer', 'antalya tatil transfer', 'bayram tatili transfer'],
    url: '/transfers',
  }),
};

export default SEO_CONFIG;
