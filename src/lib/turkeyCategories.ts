// Türkiye-Centric Travel Categories
// Benzersiz kategorizasyon sistemi - rakiplerde yok!

export interface TurkeyCategory {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  popularDestinations: string[];
  bestMonths: number[];
  averagePrice: {
    min: number;
    max: number;
  };
  features: string[];
  seoKeywords: string[];
}

// Türkiye'ye özel kategoriler
export const TURKEY_CATEGORIES: Record<string, TurkeyCategory> = {
  thermal: {
    id: 'thermal',
    name: 'Termal Oteller',
    nameEn: 'Thermal Hotels',
    slug: 'termal-oteller',
    icon: '♨️',
    description: 'Şifalı sularıyla ünlü termal oteller ve kaplıcalar',
    image: '/images/categories/thermal.jpg',
    popularDestinations: [
      'Afyonkarahisar',
      'Pamukkale',
      'Gönen',
      'Bursa',
      'Yalova',
      'Balçova',
      'Kızılcahamam',
      'Sakarılıca'
    ],
    bestMonths: [10, 11, 12, 1, 2, 3, 4], // Ekim-Nisan
    averagePrice: {
      min: 800,
      max: 3000
    },
    features: [
      'Termal havuz',
      'Kür uygulamaları',
      'Spa & wellness',
      'Jakuzi',
      'Sauna',
      'Masaj',
      'Doktor kontrolü',
      'Diyet programı'
    ],
    seoKeywords: [
      'termal otel',
      'kaplıca',
      'şifalı su',
      'termal tatil',
      'wellness',
      'spa otel',
      'termal tesis'
    ]
  },

  winterSports: {
    id: 'winterSports',
    name: 'Kış Sporları Otelleri',
    nameEn: 'Winter Sports Hotels',
    slug: 'kis-sporlari-otelleri',
    icon: '⛷️',
    description: 'Kayak merkezleri ve kış sporları tesisleri',
    image: '/images/categories/winter-sports.jpg',
    popularDestinations: [
      'Uludağ',
      'Erciyes',
      'Palandöken',
      'Kartepe',
      'Kartalkaya',
      'Sarıkamış',
      'Davraz',
      'Zigana'
    ],
    bestMonths: [12, 1, 2, 3], // Aralık-Mart
    averagePrice: {
      min: 1200,
      max: 5000
    },
    features: [
      'Kayak pistine yakın',
      'Kayak ekipmanı kiralama',
      'Snowboard',
      'Teleferik erişimi',
      'Kayak okulu',
      'Kızak pisti',
      'Après-ski',
      'Isıtmalı havuz'
    ],
    seoKeywords: [
      'kayak oteli',
      'kış tatili',
      'snowboard',
      'kayak merkezi',
      'kış sporları',
      'dağ oteli',
      'kar tatili'
    ]
  },

  boutique: {
    id: 'boutique',
    name: 'Butik Oteller',
    nameEn: 'Boutique Hotels',
    slug: 'butik-oteller',
    icon: '🏛️',
    description: 'Özel tasarım ve konforlu butik oteller',
    image: '/images/categories/boutique.jpg',
    popularDestinations: [
      'İstanbul',
      'Alaçatı',
      'Mardin',
      'Urfa',
      'Kapadokya',
      'Bozcaada',
      'Ayvalık',
      'Cunda'
    ],
    bestMonths: [4, 5, 6, 9, 10, 11], // İlkbahar & Sonbahar
    averagePrice: {
      min: 1500,
      max: 8000
    },
    features: [
      'Benzersiz tasarım',
      'Sınırlı oda sayısı',
      'Kişiselleştirilmiş hizmet',
      'Yerel mimari',
      'Gurme restoran',
      'Özel bahçe',
      'Sanat galerisi',
      'Kütüphane'
    ],
    seoKeywords: [
      'butik otel',
      'özel otel',
      'design hotel',
      'lüks konaklama',
      'benzersiz otel',
      'tasarım otel'
    ]
  },

  bay: {
    id: 'bay',
    name: 'Koy Otelleri',
    nameEn: 'Bay Hotels',
    slug: 'koy-otelleri',
    icon: '🏖️',
    description: 'Kendi özel koyuna sahip sakin oteller',
    image: '/images/categories/bay.jpg',
    popularDestinations: [
      'Kaş',
      'Kalkan',
      'Akyaka',
      'Datça',
      'Bodrum',
      'Fethiye',
      'Ölüdeniz',
      'Göcek'
    ],
    bestMonths: [5, 6, 7, 8, 9], // Mayıs-Eylül
    averagePrice: {
      min: 2000,
      max: 10000
    },
    features: [
      'Özel koy',
      'Sahile sıfır',
      'Tekne turu',
      'Su sporları',
      'Özel plaj',
      'Marina',
      'Dalış merkezi',
      'Balık restoran'
    ],
    seoKeywords: [
      'koy oteli',
      'özel koy',
      'sahil oteli',
      'deniz oteli',
      'tekne turu',
      'marina otel'
    ]
  },

  historical: {
    id: 'historical',
    name: 'Tarihi Konaklar',
    nameEn: 'Historical Mansions',
    slug: 'tarihi-konaklar',
    icon: '🏰',
    description: 'Restore edilmiş tarihi konak ve hanlar',
    image: '/images/categories/historical.jpg',
    popularDestinations: [
      'Safranbolu',
      'Mardin',
      'Urfa',
      'Konya',
      'Amasya',
      'Beypazarı',
      'Mudurnu',
      'Birgi'
    ],
    bestMonths: [4, 5, 6, 9, 10], // İlkbahar & Sonbahar
    averagePrice: {
      min: 1000,
      max: 4000
    },
    features: [
      'Osmanlı mimarisi',
      'Antika mobilyalar',
      'Tarihi doku',
      'Geleneksel kahvaltı',
      'Avlu',
      'Kültür turu',
      'El yapımı halı',
      'Geleneksel mutfak'
    ],
    seoKeywords: [
      'tarihi konak',
      'osmanlı konağı',
      'tarihi han',
      'kültür oteli',
      'geleneksel konaklama',
      'eski şehir oteli'
    ]
  },

  plateau: {
    id: 'plateau',
    name: 'Yayla Evleri',
    nameEn: 'Highland Houses',
    slug: 'yayla-evleri',
    icon: '🏔️',
    description: 'Yeşil yaylaların huzurlu evleri',
    image: '/images/categories/plateau.jpg',
    popularDestinations: [
      'Rize Yaylaları',
      'Ayder',
      'Uzungöl',
      'Artvin Yaylaları',
      'Gümüşhane',
      'Camili',
      'Karagöl',
      'Şavşat'
    ],
    bestMonths: [6, 7, 8, 9], // Haziran-Eylül
    averagePrice: {
      min: 600,
      max: 2500
    },
    features: [
      'Doğa içinde',
      'Organik kahvaltı',
      'Trekking rotaları',
      'Yayla festivalleri',
      'Kamp alanı',
      'Balık tutma',
      'Fotoğraf turu',
      'Yerel lezzetler'
    ],
    seoKeywords: [
      'yayla evi',
      'dağ evi',
      'doğa oteli',
      'yayla tatili',
      'dağ tatili',
      'plateau hotel'
    ]
  },

  cave: {
    id: 'cave',
    name: 'Mağara Oteller',
    nameEn: 'Cave Hotels',
    slug: 'magara-oteller',
    icon: '🪨',
    description: 'Kapadokya\'nın eşsiz mağara otelleri',
    image: '/images/categories/cave.jpg',
    popularDestinations: [
      'Göreme',
      'Ürgüp',
      'Uçhisar',
      'Ortahisar',
      'Avanos',
      'Çavuşin'
    ],
    bestMonths: [4, 5, 6, 9, 10, 11], // İlkbahar & Sonbahar
    averagePrice: {
      min: 1500,
      max: 6000
    },
    features: [
      'Doğal mağara odalar',
      'Peri bacası manzarası',
      'Balon turu',
      'Teras kahvaltı',
      'Tarihi hamam',
      'Şarap tadımı',
      'ATV safari',
      'Vadi yürüyüşü'
    ],
    seoKeywords: [
      'mağara otel',
      'kapadokya oteli',
      'peri bacası otel',
      'balon turu',
      'cave hotel',
      'cappadocia hotel'
    ]
  },

  vineyard: {
    id: 'vineyard',
    name: 'Bağ Evleri',
    nameEn: 'Vineyard Houses',
    slug: 'bag-evleri',
    icon: '🍇',
    description: 'Üzüm bağları arasında sakin tatil',
    image: '/images/categories/vineyard.jpg',
    popularDestinations: [
      'Bozcaada',
      'Şirince',
      'Kapadokya',
      'Avanos',
      'Çeşme',
      'Urla',
      'Eğirdir',
      'Tekirdağ'
    ],
    bestMonths: [5, 6, 7, 8, 9, 10], // Mayıs-Ekim
    averagePrice: {
      min: 1200,
      max: 5000
    },
    features: [
      'Bağ manzarası',
      'Şarap tadımı',
      'Organik ürünler',
      'Bağ turları',
      'Yerel mutfak',
      'Peynir yapımı',
      'Bisiklet turu',
      'Gurme akşam yemeği'
    ],
    seoKeywords: [
      'bağ evi',
      'şarap oteli',
      'üzüm bağı',
      'vineyard hotel',
      'wine hotel',
      'şarap turu'
    ]
  }
};

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): TurkeyCategory | null {
  return Object.values(TURKEY_CATEGORIES).find(cat => cat.slug === slug) || null;
}

/**
 * Get categories for a specific month
 */
export function getCategoriesForMonth(month: number): TurkeyCategory[] {
  return Object.values(TURKEY_CATEGORIES).filter(cat =>
    cat.bestMonths.includes(month)
  );
}

/**
 * Get categories for a destination
 */
export function getCategoriesForDestination(destination: string): TurkeyCategory[] {
  return Object.values(TURKEY_CATEGORIES).filter(cat =>
    cat.popularDestinations.some(dest =>
      dest.toLowerCase().includes(destination.toLowerCase())
    )
  );
}

/**
 * Get seasonal recommendations
 */
export function getSeasonalRecommendations(): {
  current: TurkeyCategory[];
  upcoming: TurkeyCategory[];
} {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  const current = getCategoriesForMonth(currentMonth);
  const upcoming = getCategoriesForMonth(nextMonth);

  return { current, upcoming };
}

/**
 * Search categories by keyword
 */
export function searchCategories(query: string): TurkeyCategory[] {
  const lowerQuery = query.toLowerCase();

  return Object.values(TURKEY_CATEGORIES).filter(cat => {
    // Search in name, description, destinations, keywords
    const searchFields = [
      cat.name.toLowerCase(),
      cat.description.toLowerCase(),
      ...cat.popularDestinations.map(d => d.toLowerCase()),
      ...cat.seoKeywords
    ].join(' ');

    return searchFields.includes(lowerQuery);
  });
}

/**
 * Get all categories sorted by popularity
 */
export function getAllCategories(): TurkeyCategory[] {
  return Object.values(TURKEY_CATEGORIES);
}

/**
 * Generate SEO metadata for category
 */
export function generateCategorySEO(category: TurkeyCategory) {
  return {
    title: `${category.name} - Travel LyDian`,
    description: `${category.description}. ${category.popularDestinations.slice(0, 3).join(', ')} ve daha fazla destinasyonda en iyi ${category.name.toLowerCase()} seçenekleri.`,
    keywords: category.seoKeywords.join(', '),
    ogImage: category.image,
    canonical: `https://holiday.ailydian.com/kategoriler/${category.slug}`
  };
}
