/**
 * TRAVEL ULTRA-COMPETITIVE KEYWORD STRATEGY
 *
 * Target: Top 3 rankings for airport transfer & car rental keywords
 * Domains: travel.lydian.com
 * Strategy: Multi-language, high-volume, competitive keywords
 * Goal: First page, position 1-3 in all search engines
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
 * TÜRKÇE - AIRPORT TRANSFER KEYWORDS (Antalya/Alanya Focus)
 */
export const TURKISH_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'antalya havalimanı transfer',
    language: 'tr',
    searchVolume: 27100,
    competition: 'ultra-high',
    cpc: 3.2,
    currentRank: null,
    targetRank: 1,
    difficulty: 78,
    userIntent: 'transactional',
    relatedKeywords: [
      'antalya havalimanı transfer fiyatları',
      'antalya havaalanı vip transfer',
      'antalya airport transfer',
      'antalya havalimanı özel transfer'
    ],
    longTailVariants: [
      'antalya havalimanından alanya transfer',
      'antalya havalimanı belek transfer',
      'antalya havalimanı side transfer',
      'antalya havalimanından kemer transfer',
      'ucuz antalya havalimanı transfer'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer', 'lara',
      'kundu', 'çamyuva', 'tekirova', 'göynük'
    ]
  },
  {
    keyword: 'alanya transfer',
    language: 'tr',
    searchVolume: 18900,
    competition: 'high',
    cpc: 2.8,
    currentRank: null,
    targetRank: 1,
    difficulty: 72,
    userIntent: 'transactional',
    relatedKeywords: [
      'alanya vip transfer',
      'alanya havalimanı transfer',
      'alanya özel transfer',
      'alanya transfer fiyatları'
    ],
    longTailVariants: [
      'gazipaşa havalimanı alanya transfer',
      'antalya havalimanı alanya transfer',
      'alanya otel transfer',
      'alanya şehir içi transfer'
    ],
    localModifiers: [
      'oba', 'mahmutlar', 'avsallar', 'incekum',
      'konaklı', 'kargıcak', 'kestel'
    ]
  },
  {
    keyword: 'havalimanı transfer',
    language: 'tr',
    searchVolume: 33500,
    competition: 'ultra-high',
    cpc: 2.9,
    currentRank: null,
    targetRank: 3,
    difficulty: 82,
    userIntent: 'transactional',
    relatedKeywords: [
      'havalimanı transfer hizmeti',
      'havaalanı transfer araç kiralama',
      'vip havalimanı transfer',
      'özel havalimanı transfer'
    ],
    longTailVariants: [
      'havalimanı transfer ücreti',
      'havalimanı transfer rezervasyon',
      'havalimanı transfer online',
      'havalimanı transfer 7/24'
    ],
    localModifiers: [
      'antalya', 'istanbul', 'izmir', 'bodrum',
      'dalaman', 'gazipaşa', 'adana'
    ]
  },
  {
    keyword: 'antalya araç kiralama',
    language: 'tr',
    searchVolume: 22400,
    competition: 'ultra-high',
    cpc: 4.1,
    currentRank: null,
    targetRank: 2,
    difficulty: 81,
    userIntent: 'transactional',
    relatedKeywords: [
      'antalya rent a car',
      'antalya araba kiralama',
      'antalya oto kiralama',
      'antalya ucuz araç kiralama'
    ],
    longTailVariants: [
      'antalya havalimanı araç kiralama',
      'antalya şehir merkezi araç kiralama',
      'antalya günlük araç kiralama',
      'antalya aylık araç kiralama'
    ],
    localModifiers: [
      'lara', 'kundu', 'konyaaltı', 'kepez', 'muratpaşa'
    ]
  }
];

/**
 * ENGLISH - AIRPORT TRANSFER KEYWORDS
 */
export const ENGLISH_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'antalya airport transfer',
    language: 'en',
    searchVolume: 49500,
    competition: 'ultra-high',
    cpc: 3.8,
    currentRank: null,
    targetRank: 1,
    difficulty: 84,
    userIntent: 'transactional',
    relatedKeywords: [
      'antalya airport shuttle',
      'antalya airport taxi',
      'antalya airport transport',
      'antalya airport private transfer'
    ],
    longTailVariants: [
      'antalya airport to alanya transfer',
      'antalya airport to belek transfer',
      'antalya airport to side transfer',
      'cheap antalya airport transfer',
      'antalya airport vip transfer'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer', 'lara',
      'kundu', 'manavgat', 'serik'
    ]
  },
  {
    keyword: 'alanya airport transfer',
    language: 'en',
    searchVolume: 33200,
    competition: 'high',
    cpc: 3.5,
    currentRank: null,
    targetRank: 1,
    difficulty: 76,
    userIntent: 'transactional',
    relatedKeywords: [
      'alanya transfer service',
      'alanya private transfer',
      'alanya shuttle service',
      'alanya airport taxi'
    ],
    longTailVariants: [
      'gazipasa airport alanya transfer',
      'antalya to alanya transfer',
      'alanya hotel transfer',
      'alanya city center transfer'
    ],
    localModifiers: [
      'oba', 'mahmutlar', 'avsallar', 'incekum'
    ]
  },
  {
    keyword: 'car rental antalya',
    language: 'en',
    searchVolume: 40500,
    competition: 'ultra-high',
    cpc: 5.2,
    currentRank: null,
    targetRank: 2,
    difficulty: 86,
    userIntent: 'transactional',
    relatedKeywords: [
      'rent a car antalya',
      'antalya car hire',
      'cheap car rental antalya',
      'antalya airport car rental'
    ],
    longTailVariants: [
      'antalya airport car rental cheap',
      'luxury car rental antalya',
      'antalya car rental no deposit',
      'antalya car rental comparison'
    ],
    localModifiers: [
      'airport', 'lara', 'konyaalti', 'city center'
    ]
  }
];

/**
 * РУССКИЙ - AIRPORT TRANSFER KEYWORDS
 */
export const RUSSIAN_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'трансфер анталия',
    language: 'ru',
    searchVolume: 60500,
    competition: 'ultra-high',
    cpc: 2.1,
    currentRank: null,
    targetRank: 1,
    difficulty: 79,
    userIntent: 'transactional',
    relatedKeywords: [
      'трансфер из аэропорта анталии',
      'трансфер анталия аланья',
      'индивидуальный трансфер анталия',
      'заказать трансфер анталия'
    ],
    longTailVariants: [
      'трансфер анталия белек',
      'трансфер анталия сиде',
      'трансфер анталия кемер',
      'дешевый трансфер анталия',
      'vip трансфер анталия'
    ],
    localModifiers: [
      'аланья', 'белек', 'сиде', 'кемер', 'лара'
    ]
  },
  {
    keyword: 'аренда авто анталия',
    language: 'ru',
    searchVolume: 44200,
    competition: 'ultra-high',
    cpc: 3.4,
    currentRank: null,
    targetRank: 2,
    difficulty: 82,
    userIntent: 'transactional',
    relatedKeywords: [
      'прокат машин анталия',
      'аренда автомобиля анталия',
      'rent a car анталия',
      'дешевая аренда авто анталия'
    ],
    longTailVariants: [
      'аренда авто анталия аэропорт',
      'аренда авто анталия без депозита',
      'аренда авто анталия цены',
      'аренда премиум авто анталия'
    ],
    localModifiers: [
      'аэропорт', 'центр', 'лара', 'коньяалты'
    ]
  }
];

/**
 * DEUTSCH - AIRPORT TRANSFER KEYWORDS
 */
export const GERMAN_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'antalya flughafentransfer',
    language: 'de',
    searchVolume: 18900,
    competition: 'high',
    cpc: 4.2,
    currentRank: null,
    targetRank: 1,
    difficulty: 74,
    userIntent: 'transactional',
    relatedKeywords: [
      'transfer antalya',
      'flughafentransfer türkei',
      'privat transfer antalya',
      'shuttle service antalya'
    ],
    longTailVariants: [
      'antalya flughafen nach alanya transfer',
      'antalya flughafen belek transfer',
      'günstiger flughafentransfer antalya',
      'vip transfer antalya'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer'
    ]
  },
  {
    keyword: 'mietwagen antalya',
    language: 'de',
    searchVolume: 27300,
    competition: 'ultra-high',
    cpc: 6.1,
    currentRank: null,
    targetRank: 2,
    difficulty: 83,
    userIntent: 'transactional',
    relatedKeywords: [
      'autovermietung antalya',
      'auto mieten antalya',
      'günstige mietwagen antalya',
      'mietwagen antalya flughafen'
    ],
    longTailVariants: [
      'mietwagen antalya ohne kreditkarte',
      'mietwagen antalya vergleich',
      'luxus mietwagen antalya',
      'langzeit mietwagen antalya'
    ],
    localModifiers: [
      'flughafen', 'lara', 'stadtzentrum'
    ]
  }
];

/**
 * FRANÇAIS - AIRPORT TRANSFER KEYWORDS
 */
export const FRENCH_AIRPORT_TRANSFER_KEYWORDS: CompetitiveKeyword[] = [
  {
    keyword: 'transfert aéroport antalya',
    language: 'fr',
    searchVolume: 14200,
    competition: 'high',
    cpc: 3.7,
    currentRank: null,
    targetRank: 1,
    difficulty: 71,
    userIntent: 'transactional',
    relatedKeywords: [
      'navette aéroport antalya',
      'transfert privé antalya',
      'transport antalya',
      'taxi aéroport antalya'
    ],
    longTailVariants: [
      'transfert antalya alanya',
      'transfert antalya belek',
      'transfert aéroport antalya pas cher',
      'transfert vip antalya'
    ],
    localModifiers: [
      'alanya', 'belek', 'side', 'kemer'
    ]
  },
  {
    keyword: 'location voiture antalya',
    language: 'fr',
    searchVolume: 19800,
    competition: 'ultra-high',
    cpc: 5.5,
    currentRank: null,
    targetRank: 2,
    difficulty: 80,
    userIntent: 'transactional',
    relatedKeywords: [
      'louer voiture antalya',
      'location auto antalya',
      'rent a car antalya',
      'location voiture pas cher antalya'
    ],
    longTailVariants: [
      'location voiture aéroport antalya',
      'location voiture antalya sans caution',
      'location voiture luxe antalya',
      'comparaison location voiture antalya'
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
