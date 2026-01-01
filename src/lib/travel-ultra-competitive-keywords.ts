/**
 * HOLIDAY ULTRA-COMPETITIVE KEYWORD STRATEGY
 *
 * Target: Top 3 rankings for holiday transfers & vacation rentals
 * Domains: holiday.ailydian.com
 * Strategy: Multi-language, high-volume, holiday-focused competitive keywords
 * Goal: First page, position 1-3 in all search engines
 * Brand Focus: Holiday, Vacation, Leisure Travel
 */

export interface CompetitiveKeyword {
  keyword: string;
  language: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high' | 'ultra-high';
  cpc: number;
  currentRank: number | null;
  targetRank: number;
  difficulty: number; // 0-100
  userIntent: 'transactional' | 'informational' | 'navigational' | 'commercial';
  relatedKeywords: string[];
  longTailVariants: string[];
  localModifiers: string[];
}

export interface SEOStrategy {
  keyword: string;
  language: string;
  tactics: string[];
  contentRequirements: {
    minWords: number;
    sections: string[];
    faqQuestions: string[];
    schemaTypes: string[];
  };
  technicalSEO: {
    urlStructure: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    h2s: string[];
  };
  linkBuilding: {
    targetBacklinks: number;
    anchorTexts: string[];
    targetDomains: string[];
  };
  estimatedTimeToTop3: string;
}

/**
 * TÜRKÇE - HOLIDAY AIRPORT TRANSFER KEYWORDS (Antalya/Alanya Focus)
 */
export const TURKISH_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'antalya tatil havalimanı transferi',
    language: 'tr',
    searchVolume: 27100,
    competition: 'ultra-high',
    cpc: 3.2,
    currentRank: null,
    targetRank: 1,
    difficulty: 78,
    userIntent: 'transactional',
    relatedKeywords: [
      'antalya tatil havalimanı transfer fiyatları',
      'antalya bayram tatili vip transfer',
      'antalya holiday airport transfer',
      'antalya tatil havalimanı özel transfer'
    ],
    longTailVariants: [
      'antalya havalimanından alanya tatil transferi',
      'antalya havalimanı belek tatil transfer',
      'antalya havalimanı side tatil transfer',
      'antalya havalimanından kemer tatil transfer',
      'ucuz antalya tatil havalimanı transfer'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer', 'lara',
      'kundu', 'çamyuva', 'tekirova', 'göynük'
    ]
  },
  {
    keyword: 'alanya tatil transferi',
    language: 'tr',
    searchVolume: 18900,
    competition: 'high',
    cpc: 2.8,
    currentRank: null,
    targetRank: 1,
    difficulty: 72,
    userIntent: 'transactional',
    relatedKeywords: [
      'alanya bayram tatili vip transfer',
      'alanya tatil havalimanı transfer',
      'alanya tatil özel transfer',
      'alanya tatil transfer fiyatları'
    ],
    longTailVariants: [
      'gazipaşa havalimanı alanya tatil transferi',
      'antalya havalimanı alanya tatil transfer',
      'alanya tatil oteli transfer',
      'alanya şehir içi tatil transferi'
    ],
    localModifiers: [
      'oba', 'mahmutlar', 'avsallar', 'incekum',
      'konaklı', 'kargıcak', 'kestel'
    ]
  },
  {
    keyword: 'tatil havalimanı transferi',
    language: 'tr',
    searchVolume: 33500,
    competition: 'ultra-high',
    cpc: 2.9,
    currentRank: null,
    targetRank: 3,
    difficulty: 82,
    userIntent: 'transactional',
    relatedKeywords: [
      'tatil havalimanı transfer hizmeti',
      'bayram tatili havaalanı transfer',
      'vip tatil havalimanı transfer',
      'özel tatil havalimanı transfer'
    ],
    longTailVariants: [
      'tatil havalimanı transfer ücreti',
      'tatil havalimanı transfer rezervasyon',
      'online tatil havalimanı transfer',
      'tatil havalimanı transfer 7/24'
    ],
    localModifiers: [
      'antalya', 'istanbul', 'izmir', 'bodrum',
      'dalaman', 'gazipaşa', 'adana'
    ]
  },
  {
    keyword: 'antalya tatil araç kiralama',
    language: 'tr',
    searchVolume: 22400,
    competition: 'ultra-high',
    cpc: 4.1,
    currentRank: null,
    targetRank: 2,
    difficulty: 81,
    userIntent: 'transactional',
    relatedKeywords: [
      'antalya tatil rent a car',
      'antalya bayram tatili araba kiralama',
      'antalya tatil oto kiralama',
      'antalya ucuz tatil araç kiralama'
    ],
    longTailVariants: [
      'antalya havalimanı tatil araç kiralama',
      'antalya şehir merkezi tatil araç kiralama',
      'antalya günlük tatil araç kiralama',
      'antalya aylık tatil araç kiralama'
    ],
    localModifiers: [
      'lara', 'kundu', 'konyaaltı', 'kepez', 'muratpaşa'
    ]
  }
];

/**
 * ENGLISH - HOLIDAY AIRPORT TRANSFER KEYWORDS
 */
export const ENGLISH_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'antalya holiday airport transfer',
    language: 'en',
    searchVolume: 49500,
    competition: 'ultra-high',
    cpc: 3.8,
    currentRank: null,
    targetRank: 1,
    difficulty: 84,
    userIntent: 'transactional',
    relatedKeywords: [
      'antalya holiday airport shuttle',
      'antalya vacation airport taxi',
      'antalya holiday airport transport',
      'antalya airport private holiday transfer'
    ],
    longTailVariants: [
      'antalya airport to alanya holiday transfer',
      'antalya airport to belek vacation transfer',
      'antalya airport to side holiday transfer',
      'cheap antalya holiday airport transfer',
      'antalya airport vip holiday transfer'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer', 'lara',
      'kundu', 'manavgat', 'serik'
    ]
  },
  {
    keyword: 'alanya holiday airport transfer',
    language: 'en',
    searchVolume: 33200,
    competition: 'high',
    cpc: 3.5,
    currentRank: null,
    targetRank: 1,
    difficulty: 76,
    userIntent: 'transactional',
    relatedKeywords: [
      'alanya holiday transfer service',
      'alanya private vacation transfer',
      'alanya holiday shuttle service',
      'alanya airport holiday taxi'
    ],
    longTailVariants: [
      'gazipasa airport alanya holiday transfer',
      'antalya to alanya vacation transfer',
      'alanya holiday hotel transfer',
      'alanya city center holiday transfer'
    ],
    localModifiers: [
      'oba', 'mahmutlar', 'avsallar', 'incekum'
    ]
  },
  {
    keyword: 'holiday car rental antalya',
    language: 'en',
    searchVolume: 40500,
    competition: 'ultra-high',
    cpc: 5.2,
    currentRank: null,
    targetRank: 2,
    difficulty: 86,
    userIntent: 'transactional',
    relatedKeywords: [
      'vacation rent a car antalya',
      'antalya holiday car hire',
      'cheap holiday car rental antalya',
      'antalya airport holiday car rental'
    ],
    longTailVariants: [
      'antalya airport holiday car rental cheap',
      'luxury vacation car rental antalya',
      'antalya holiday car rental no deposit',
      'antalya vacation car rental comparison'
    ],
    localModifiers: [
      'airport', 'lara', 'konyaalti', 'city center'
    ]
  }
];

/**
 * РУССКИЙ - HOLIDAY AIRPORT TRANSFER KEYWORDS
 */
export const RUSSIAN_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'трансфер отпуск анталия',
    language: 'ru',
    searchVolume: 60500,
    competition: 'ultra-high',
    cpc: 2.1,
    currentRank: null,
    targetRank: 1,
    difficulty: 79,
    userIntent: 'transactional',
    relatedKeywords: [
      'трансфер из аэропорта отпуск анталии',
      'трансфер каникулы анталия аланья',
      'индивидуальный трансфер отпуск анталия',
      'заказать трансфер отпуск анталия'
    ],
    longTailVariants: [
      'трансфер отпуск анталия белек',
      'трансфер каникулы анталия сиде',
      'трансфер отпуск анталия кемер',
      'дешевый трансфер отпуск анталия',
      'vip трансфер отпуск анталия'
    ],
    localModifiers: [
      'аланья', 'белек', 'сиде', 'кемер', 'лара'
    ]
  },
  {
    keyword: 'аренда авто отпуск анталия',
    language: 'ru',
    searchVolume: 44200,
    competition: 'ultra-high',
    cpc: 3.4,
    currentRank: null,
    targetRank: 2,
    difficulty: 82,
    userIntent: 'transactional',
    relatedKeywords: [
      'прокат машин отпуск анталия',
      'аренда автомобиля каникулы анталия',
      'rent a car отпуск анталия',
      'дешевая аренда авто отпуск анталия'
    ],
    longTailVariants: [
      'аренда авто отпуск анталия аэропорт',
      'аренда авто каникулы анталия без депозита',
      'аренда авто отпуск анталия цены',
      'аренда премиум авто отпуск анталия'
    ],
    localModifiers: [
      'аэропорт', 'центр', 'лара', 'коньяалты'
    ]
  }
];

/**
 * DEUTSCH - HOLIDAY AIRPORT TRANSFER KEYWORDS
 */
export const GERMAN_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'antalya urlaub flughafentransfer',
    language: 'de',
    searchVolume: 18900,
    competition: 'high',
    cpc: 4.2,
    currentRank: null,
    targetRank: 1,
    difficulty: 74,
    userIntent: 'transactional',
    relatedKeywords: [
      'transfer urlaub antalya',
      'flughafentransfer ferien türkei',
      'privat urlaub transfer antalya',
      'shuttle service urlaub antalya'
    ],
    longTailVariants: [
      'antalya flughafen nach alanya urlaub transfer',
      'antalya flughafen belek ferien transfer',
      'günstiger urlaub flughafentransfer antalya',
      'vip urlaub transfer antalya'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer'
    ]
  },
  {
    keyword: 'urlaub mietwagen antalya',
    language: 'de',
    searchVolume: 27300,
    competition: 'ultra-high',
    cpc: 6.1,
    currentRank: null,
    targetRank: 2,
    difficulty: 83,
    userIntent: 'transactional',
    relatedKeywords: [
      'autovermietung urlaub antalya',
      'auto mieten ferien antalya',
      'günstige urlaub mietwagen antalya',
      'mietwagen urlaub antalya flughafen'
    ],
    longTailVariants: [
      'urlaub mietwagen antalya ohne kreditkarte',
      'mietwagen urlaub antalya vergleich',
      'luxus urlaub mietwagen antalya',
      'langzeit urlaub mietwagen antalya'
    ],
    localModifiers: [
      'flughafen', 'lara', 'stadtzentrum'
    ]
  }
];

/**
 * FRANÇAIS - HOLIDAY AIRPORT TRANSFER KEYWORDS
 */
export const FRENCH_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'transfert aéroport vacances antalya',
    language: 'fr',
    searchVolume: 14200,
    competition: 'high',
    cpc: 3.7,
    currentRank: null,
    targetRank: 1,
    difficulty: 71,
    userIntent: 'transactional',
    relatedKeywords: [
      'navette aéroport vacances antalya',
      'transfert privé vacances antalya',
      'transport vacances antalya',
      'taxi aéroport vacances antalya'
    ],
    longTailVariants: [
      'transfert vacances antalya alanya',
      'transfert vacances antalya belek',
      'transfert aéroport vacances antalya pas cher',
      'transfert vip vacances antalya'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer'
    ]
  },
  {
    keyword: 'location voiture vacances antalya',
    language: 'fr',
    searchVolume: 19800,
    competition: 'ultra-high',
    cpc: 5.5,
    currentRank: null,
    targetRank: 2,
    difficulty: 80,
    userIntent: 'transactional',
    relatedKeywords: [
      'louer voiture vacances antalya',
      'location auto vacances antalya',
      'rent a car vacances antalya',
      'location voiture vacances pas cher antalya'
    ],
    longTailVariants: [
      'location voiture vacances aéroport antalya',
      'location voiture vacances antalya sans caution',
      'location voiture luxe vacances antalya',
      'comparaison location voiture vacances antalya'
    ],
    localModifiers: [
      'aéroport', 'lara', 'centre-ville'
    ]
  }
];

/**
 * ALL COMPETITIVE KEYWORDS - COMBINED
 */
export const ALL_TRAVEL_COMPETITIVE_KEYWORDS: CompetitiveKeyword[] = [
  ...TURKISH_AIRPORT_TRANSFER_KEYWORDS,
  ...ENGLISH_AIRPORT_TRANSFER_KEYWORDS,
  ...RUSSIAN_AIRPORT_TRANSFER_KEYWORDS,
  ...GERMAN_AIRPORT_TRANSFER_KEYWORDS,
  ...FRENCH_AIRPORT_TRANSFER_KEYWORDS
];

/**
 * ULTRA-COMPETITIVE SEO STRATEGIES
 */
export const TRAVEL_SEO_STRATEGIES: SEOStrategy[] = [
  {
    keyword: 'antalya havalimanı transfer',
    language: 'tr',
    tactics: [
      '🎯 Target featured snippet with "En İyi Antalya Havalimanı Transfer Rehberi 2025"',
      '📊 Create comprehensive 3000+ word ultimate guide',
      '🗺️ Add interactive map with all routes and prices',
      '⭐ Integrate real customer reviews (100+ reviews)',
      '🎥 Embed YouTube video guide (5+ min)',
      '📱 Mobile-first design with instant booking',
      '🔗 Get backlinks from TripAdvisor, Booking.com affiliates',
      '🏆 Win "People Also Ask" boxes with FAQ schema',
      '💎 Create VIP landing pages for premium keywords',
      '🚀 Implement AMP for ultra-fast mobile loading'
    ],
    contentRequirements: {
      minWords: 3000,
      sections: [
        'Antalya Havalimanı Transfer Hizmetleri - Tam Rehber',
        'Transfer Fiyatları 2025 (Tüm Destinasyonlar)',
        'Alanya Transfer - Mesafe, Süre ve Ücret',
        'Belek Transfer - Lüks Otel Bölgesi',
        'Side Transfer - Antik Kent ve Plajlar',
        'Kemer Transfer - Dağ ve Deniz',
        'VIP Transfer Hizmetleri',
        'Grup Transferleri (8+ Kişi)',
        'Özel Araç Kiralama Seçenekleri',
        '7/24 Destek ve Online Rezervasyon',
        'Müşteri Yorumları ve Deneyimler',
        'Sıkça Sorulan Sorular (20+ Soru)'
      ],
      faqQuestions: [
        'Antalya havalimanından Alanya\'ya transfer ücreti ne kadar?',
        'Transfer rezervasyonu nasıl yapılır?',
        'Gecikme durumunda ne olur?',
        'Araçlar klimali ve konforlu mu?',
        'Kaç kişilik araç seçenekleri var?',
        'Bebek koltuğu hizmeti var mı?',
        'Ödeme nasıl yapılır?',
        'İptal politikası nedir?',
        'Havalimanında karşılama nasıl olur?',
        'VIP transfer normal transferden farkı nedir?'
      ],
      schemaTypes: [
        'LocalBusiness',
        'FAQPage',
        'Product',
        'AggregateRating',
        'BreadcrumbList',
        'VideoObject',
        'HowTo'
      ]
    },
    technicalSEO: {
      urlStructure: '/tr/antalya-havalimani-transfer',
      metaTitle: 'Antalya Havalimanı Transfer - 7/24 Güvenli Transfer Hizmeti | %30 İndirim',
      metaDescription: '✅ Antalya Havalimanı Transfer ✓ Alanya, Belek, Side, Kemer ✓ 7/24 Hizmet ✓ VIP Araçlar ✓ Online Rezervasyon ✓ %30 Erken Rezervasyon İndirimi. Hemen Rezervasyon Yap!',
      h1: 'Antalya Havalimanı Transfer - En Güvenilir Transfer Hizmeti 2025',
      h2s: [
        'Antalya Havalimanı Transfer Fiyatları',
        'Alanya Transfer Hizmeti',
        'VIP Transfer Seçenekleri',
        'Müşteri Yorumları ve Puanlar',
        'Online Rezervasyon - 3 Adımda Transfer',
        'Sıkça Sorulan Sorular'
      ]
    },
    linkBuilding: {
      targetBacklinks: 50,
      anchorTexts: [
        'antalya havalimanı transfer',
        'alanya transfer',
        'vip transfer antalya',
        'güvenilir transfer hizmeti',
        'antalya transfer rezervasyon'
      ],
      targetDomains: [
        'tripadvisor.com.tr',
        'holidaycheck.com.tr',
        'tatilsepeti.com',
        'tatil.com',
        'turizmdebusabah.com',
        'hoteliermag.com'
      ]
    },
    estimatedTimeToTop3: '2-3 months with aggressive implementation'
  },
  {
    keyword: 'antalya airport transfer',
    language: 'en',
    tactics: [
      '🎯 Target featured snippet with "Ultimate Antalya Airport Transfer Guide 2025"',
      '🌍 Optimize for international tourists (UK, USA, EU)',
      '💳 Integrate instant booking with multiple currencies',
      '⭐ Get verified reviews on Google, TripAdvisor, Trustpilot',
      '🎥 Create professional video tour of vehicles',
      '📱 PWA for mobile booking experience',
      '🔗 Guest posts on travel blogs and forums',
      '🏆 Win Google Maps local pack',
      '💎 Retargeting campaigns for high-intent users',
      '🚀 Core Web Vitals score 100/100'
    ],
    contentRequirements: {
      minWords: 3500,
      sections: [
        'Complete Antalya Airport Transfer Guide 2025',
        'Transfer Prices - All Destinations',
        'Alanya Airport Transfer - Distance, Time & Cost',
        'Belek Transfer - Luxury Hotel Zone',
        'Side Transfer - Ancient City & Beaches',
        'Kemer Transfer - Mountains & Sea',
        'VIP Transfer Services',
        'Group Transfers (8+ Passengers)',
        'Private Car Rental Options',
        '24/7 Support & Online Booking',
        'Customer Reviews & Testimonials',
        'Frequently Asked Questions (25+ Questions)'
      ],
      faqQuestions: [
        'How much is transfer from Antalya airport to Alanya?',
        'How to book airport transfer?',
        'What happens if my flight is delayed?',
        'Are vehicles air-conditioned?',
        'What vehicle sizes are available?',
        'Do you provide baby seats?',
        'How do I pay?',
        'What is the cancellation policy?',
        'How will I be met at the airport?',
        'What is the difference between VIP and standard transfer?',
        'Is travel insurance included?',
        'Can I add extra stops?',
        'Do you accept credit cards?',
        'Is WiFi available in vehicles?',
        'Can I book for someone else?'
      ],
      schemaTypes: [
        'LocalBusiness',
        'FAQPage',
        'Product',
        'AggregateRating',
        'BreadcrumbList',
        'VideoObject',
        'HowTo',
        'Organization'
      ]
    },
    technicalSEO: {
      urlStructure: '/en/antalya-airport-transfer',
      metaTitle: 'Antalya Airport Transfer - Safe & Reliable 24/7 Service | 30% Off',
      metaDescription: '✅ Antalya Airport Transfer to Alanya, Belek, Side, Kemer ✓ 24/7 Service ✓ VIP Vehicles ✓ Online Booking ✓ 30% Early Booking Discount. Book Now & Save!',
      h1: 'Antalya Airport Transfer - Most Trusted Service 2025',
      h2s: [
        'Antalya Airport Transfer Prices',
        'Alanya Transfer Service',
        'VIP Transfer Options',
        'Customer Reviews & Ratings',
        'Book Online in 3 Easy Steps',
        'Frequently Asked Questions'
      ]
    },
    linkBuilding: {
      targetBacklinks: 75,
      anchorTexts: [
        'antalya airport transfer',
        'alanya transfer service',
        'vip airport transfer antalya',
        'reliable transfer service',
        'book antalya transfer'
      ],
      targetDomains: [
        'tripadvisor.com',
        'booking.com',
        'expedia.com',
        'lonely planet.com',
        'travelweekly.com',
        'skyscanner.com'
      ]
    },
    estimatedTimeToTop3: '2-3 months with aggressive link building'
  }
];

/**
 * Get keywords by language
 */
export function getKeywordsByLanguage(language: string): CompetitiveKeyword[] {
  return ALL_TRAVEL_COMPETITIVE_KEYWORDS.filter(k => k.language === language);
}

/**
 * Get ultra-high competition keywords (most valuable)
 */
export function getUltraHighCompetitionKeywords(): CompetitiveKeyword[] {
  return ALL_TRAVEL_COMPETITIVE_KEYWORDS.filter(k => k.competition === 'ultra-high');
}

/**
 * Get total search volume across all keywords
 */
export function getTotalSearchVolume(): number {
  return ALL_TRAVEL_COMPETITIVE_KEYWORDS.reduce((sum, k) => sum + k.searchVolume, 0);
}

/**
 * Get strategy for keyword
 */
export function getStrategyForKeyword(keyword: string): SEOStrategy | undefined {
  return TRAVEL_SEO_STRATEGIES.find(s => s.keyword === keyword);
}

/**
 * Calculate estimated monthly traffic if we rank top 3
 */
export function calculateEstimatedTraffic(): number {
  // Assuming 35% CTR for position 1-3 combined
  const totalVolume = getTotalSearchVolume();
  return Math.round(totalVolume * 0.35);
}
