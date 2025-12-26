/**
 * Comprehensive SEO Configuration
 * White-hat SEO optimization for Turkish travel services
 * Target: Top 3 ranking in first page of search results
 */

export const DEFAULT_SEO = {
  titleTemplate: '%s | LyDian - Türkiye\'nin Güvenilir Seyahat Platformu',
  defaultTitle: 'LyDian - Türkiye\'nin En Güvenilir Seyahat Platformu',
  description: 'LyDian ile Türkiye\'nin her yerinde güvenli ve ekonomik seyahat çözümleri. Villa kiralama, araç kiralama, transfer hizmeti ve daha fazlası.',
  canonical: 'https://travel.lydian.com',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travel.lydian.com',
    site_name: 'LyDian',
    title: 'LyDian - Türkiye\'nin En Güvenilir Seyahat Platformu',
    description: 'Türkiye\'nin en kapsamlı seyahat platformu. Villa kiralama, araç kiralama, transfer hizmeti ve daha fazlası.',
    images: [
      {
        url: 'https://travel.lydian.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LyDian Travel Platform',
      },
    ],
  },
  twitter: {
    handle: '@lydian',
    site: '@lydian',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'application-name',
      content: 'LyDian',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'LyDian',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

// Car Rentals SEO - Optimized for Turkish market
export const CAR_RENTALS_SEO = {
  title: 'Araç Kiralama Türkiye - Ekonomik ve Güvenli Oto Kiralama',
  description: 'Türkiye\'nin en uygun fiyatlı araç kiralama platformu. Ekonomik, lüks ve SUV araç seçenekleri. Havalimanı teslim, tam kasko, 7/24 destek. Hemen rezervasyon yap!',
  canonical: 'https://travel.lydian.com/car-rentals',
  openGraph: {
    title: 'Araç Kiralama Türkiye - Ekonomik Oto Kiralama | LyDian',
    description: 'En uygun fiyatlı araç kiralama hizmeti. Ekonomik, konforlu ve lüks araç seçenekleri ile Türkiye\'nin her yerinde güvenli seyahat.',
    url: 'https://travel.lydian.com/car-rentals',
    images: [
      {
        url: 'https://travel.lydian.com/og-car-rentals.jpg',
        width: 1200,
        height: 630,
        alt: 'Araç Kiralama Türkiye',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'araç kiralama, oto kiralama, rent a car, araç kiralama türkiye, ekonomik araç kiralama, ucuz araç kiralama, havalimanı araç kiralama, aylık araç kiralama, günlük araç kiralama, lüks araç kiralama, SUV kiralama, minivan kiralama, pickup kiralama',
    },
    {
      property: 'product:price:currency',
      content: 'TRY',
    },
  ],
};

// Transfers SEO - Optimized for Turkish market
export const TRANSFERS_SEO = {
  title: 'Havalimanı Transfer - VIP Transfer ve Şehir İçi Transfer Hizmeti',
  description: 'Türkiye\'nin en güvenilir transfer hizmeti. Havalimanı transferi, VIP transfer, şehir içi ve şehirlerarası transfer. D2 belgeli profesyonel sürücüler. 7/24 hizmet.',
  canonical: 'https://travel.lydian.com/transfers',
  openGraph: {
    title: 'Havalimanı Transfer ve VIP Transfer Hizmeti | LyDian',
    description: 'Güvenli ve konforlu transfer hizmeti. Havalimanı transfer, VIP transfer, şehir içi transfer. D2 belgeli profesyonel sürücüler ile 7/24 hizmet.',
    url: 'https://travel.lydian.com/transfers',
    images: [
      {
        url: 'https://travel.lydian.com/og-transfers.jpg',
        width: 1200,
        height: 630,
        alt: 'Transfer Hizmeti Türkiye',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'havalimanı transfer, vip transfer, transfer hizmeti, şehir içi transfer, şehirlerarası transfer, airport transfer, sabiha gökçen transfer, istanbul havalimanı transfer, antalya havalimanı transfer, bodrum havalimanı transfer, d2 transfer, özel transfer, grup transfer',
    },
    {
      property: 'product:price:currency',
      content: 'TRY',
    },
  ],
};

// Rentals (Property) SEO
export const RENTALS_SEO = {
  title: 'Villa Kiralama ve Tatil Evi Kiralama - Günlük Kiralık Villa',
  description: 'Türkiye\'nin en güzel tatil villalarını kirala. Özel havuzlu villalar, denize sıfır yazlıklar, dağ evleri. Güvenli rezervasyon, 7/24 destek.',
  canonical: 'https://travel.lydian.com/rentals',
  openGraph: {
    title: 'Villa Kiralama - Tatil Evi Kiralama | LyDian',
    description: 'Türkiye\'nin en güzel tatil evleri. Havuzlu villa, denize sıfır yazlık, dağ evi kiralama. Güvenli rezervasyon sistemi.',
    url: 'https://travel.lydian.com/rentals',
    images: [
      {
        url: 'https://travel.lydian.com/og-rentals.jpg',
        width: 1200,
        height: 630,
        alt: 'Villa Kiralama Türkiye',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'villa kiralama, tatil evi kiralama, günlük kiralık villa, havuzlu villa, denize sıfır villa, yazlık kiralama, dağ evi kiralama, özel havuzlu villa, lüks villa, kiralık tatil evi',
    },
  ],
};

// Structured Data Schemas
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'LyDian',
  description: 'Türkiye\'nin en güvenilir seyahat ve tatil platformu',
  url: 'https://travel.lydian.com',
  logo: 'https://travel.lydian.com/logo.png',
  image: 'https://travel.lydian.com/og-image.jpg',
  telephone: '+90-XXX-XXX-XXXX',
  email: 'info@lydian.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TR',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
  },
  sameAs: [
    'https://www.facebook.com/lydian',
    'https://www.twitter.com/lydian',
    'https://www.instagram.com/lydian',
    'https://www.linkedin.com/company/lydian',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '12547',
    bestRating: '5',
    worstRating: '1',
  },
};

export const CAR_RENTAL_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Araç Kiralama',
  provider: {
    '@type': 'Organization',
    name: 'LyDian',
    url: 'https://travel.lydian.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Araç Kiralama Seçenekleri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Ekonomik Araç Kiralama',
          description: 'Uygun fiyatlı ekonomik araç kiralama hizmeti',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Lüks Araç Kiralama',
          description: 'Premium ve lüks araç kiralama seçenekleri',
        },
      },
    ],
  },
};

export const TRANSFER_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Transfer Hizmeti',
  provider: {
    '@type': 'Organization',
    name: 'LyDian',
    url: 'https://travel.lydian.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Transfer Hizmet Seçenekleri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Havalimanı Transfer',
          description: 'Havalimanı transfer ve karşılama hizmeti',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'VIP Transfer',
          description: 'Özel VIP transfer hizmeti lüks araçlarla',
        },
      },
    ],
  },
};

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://travel.lydian.com${item.url}`,
  })),
});

// FAQ Schema for common questions
export const CAR_RENTAL_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Araç kiralama için hangi belgeler gerekli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Araç kiralamak için geçerli sürücü belgesi (en az 2 yıl), kimlik kartı veya pasaport ve kredi kartı gereklidir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Araç kiralama fiyatlarına kasko dahil mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tüm araç kiralama fiyatlarımıza kasko ve trafik sigortası dahildir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Havalimanından araç teslim alabilir miyim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tüm büyük havalimanlarından araç teslim alabilir ve iade edebilirsiniz.',
      },
    },
  ],
};

export const TRANSFER_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Havalimanı transfer hizmeti nasıl çalışır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rezervasyon yaptıktan sonra sürücümüz sizi havalimanında karşılar ve belirlediğiniz adrese güvenle ulaştırır. D2 belgeli profesyonel sürücülerimiz 7/24 hizmet verir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Transfer ücreti ne zaman ödenir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Transfer ücretini online olarak rezervasyon sırasında veya nakit olarak sürücüye ödeyebilirsiniz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Grup transfer hizmeti var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, 15-30 kişilik grup transferleri için minibüs ve midibüs seçeneklerimiz mevcuttur.',
      },
    },
  ],
};
