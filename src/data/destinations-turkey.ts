/**
 * Comprehensive Turkey Destinations Database
 * Real data for Turkish travel destinations
 * SEO optimized with complete information
 */

export interface Destination {
  id: string;
  slug: string; // URL-friendly slug for SEO
  name: string;
  nameEn: string;
  region: string;
  country: string;
  category: 'historical' | 'nature' | 'beach' | 'adventure' | 'urban' | 'cultural';
  images: {
    hero: string;
    gallery: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  pricing: {
    budgetRange: string;
    averageDailyBudget: number;
    currency: string;
  };
  rating: number;
  reviews: number;
  description: string;
  descriptionEn: string;
  shortDescription: string;
  duration: string;
  bestTime: string[];
  highlights: string[];
  activities: string[];
  accommodation: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  transportation: {
    fromIstanbul: string;
    fromAnkara: string;
    local: string[];
  };
  climate: {
    summer: string;
    winter: string;
    spring: string;
    autumn: string;
  };
  foodAndDrink: string[];
  mustSee: {
    name: string;
    description: string;
    estimatedTime: string;
    entrance: string;
  }[];
  tips: string[];
  accessibility: {
    wheelchairFriendly: boolean;
    publicTransport: boolean;
    englishSpoken: boolean;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  relatedDestinations: string[];
  popularMonths: number[]; // 1-12
  avgTemperature: {
    min: number;
    max: number;
  };
}

export const DESTINATIONS_TURKEY: Destination[] = [
  {
    id: 'istanbul',
    slug: 'istanbul-tarihi-yarimada',
    name: 'İstanbul',
    nameEn: 'Istanbul',
    region: 'Marmara',
    country: 'Türkiye',
    category: 'historical',
    images: {
      hero: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1561727946-6a970bb942be?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=800&h=600&fit=crop'
      ]
    },
    coordinates: {
      lat: 41.0082,
      lng: 28.9784
    },
    pricing: {
      budgetRange: '₺800 - ₺3,000',
      averageDailyBudget: 1500,
      currency: 'TRY'
    },
    rating: 4.9,
    reviews: 45678,
    description: 'İstanbul, Avrupa ve Asya kıtalarını birleştiren, tarihi ve modern yaşamın iç içe geçtiği eşsiz bir şehir. Binlerce yıllık tarih, muhteşem mimari eserler, zengin kültür ve canlı sokak yaşamı ile dünyanın en cazip destinasyonlarından biri.',
    descriptionEn: 'Istanbul, a unique city connecting Europe and Asia, where history and modern life intertwine. With thousands of years of history, magnificent architecture, rich culture and vibrant street life, it is one of the most attractive destinations in the world.',
    shortDescription: 'Tarihi ve modern yaşamın buluştuğu büyülü şehir',
    duration: '4-7 gün',
    bestTime: ['Nisan', 'Mayıs', 'Haziran', 'Eylül', 'Ekim'],
    highlights: [
      'Ayasofya Camii - UNESCO Dünya Mirası',
      'Sultanahmet Camii (Mavi Cami)',
      'Topkapı Sarayı ve Harem Dairesi',
      'Kapalıçarşı - Dünyanın en eski kapalı çarşılarından',
      'Galata Kulesi ve 360° İstanbul panoraması',
      'Boğaz Turu',
      'Yerebatan Sarnıcı',
      'Dolmabahçe Sarayı'
    ],
    activities: [
      'Tarihi Yarımada Gezisi',
      'Boğaz Turu',
      'Müze Gezileri',
      'Osmanlı Mutfağı Tatma',
      'Hamam Deneyimi',
      'Prens Adaları Gezisi',
      'Alışveriş (Grand Bazaar, İstiklal)',
      'Gece Hayatı',
      'Balık Ekmek Keyfi'
    ],
    accommodation: {
      budget: 500,
      midRange: 1200,
      luxury: 3500
    },
    transportation: {
      fromIstanbul: 'Şehir içi',
      fromAnkara: '4.5 saat (otobüs/tren), 1 saat (uçak)',
      local: ['Metro', 'Tramvay', 'Metrobüs', 'Vapur', 'Taksi', 'İETT Otobüs']
    },
    climate: {
      summer: 'Sıcak ve nemli (25-32°C)',
      winter: 'Soğuk ve yağışlı (5-10°C)',
      spring: 'Ilıman ve çiçekli (15-22°C)',
      autumn: 'Ilıman ve renkli (15-24°C)'
    },
    foodAndDrink: [
      'Balık Ekmek',
      'Kokoreç',
      'Kumpir',
      'İstanbul Kebabı',
      'Midye Dolma',
      'Türk Kahvesi',
      'Simit',
      'Baklava'
    ],
    mustSee: [
      {
        name: 'Ayasofya Camii',
        description: '537 yılında yapılan, Bizans mimarisinin en önemli eseri. UNESCO Dünya Mirası.',
        estimatedTime: '1.5-2 saat',
        entrance: 'Ücretsiz (cami olarak hizmet veriyor)'
      },
      {
        name: 'Topkapı Sarayı',
        description: '380 yıl boyunca Osmanlı İmparatorluğu\'nun yönetim merkezi.',
        estimatedTime: '2-3 saat',
        entrance: '₺200 (Harem +₺100)'
      },
      {
        name: 'Kapalıçarşı',
        description: '1461 yılında yapılmış, 4,000\'den fazla dükkanı olan dünyanın en eski kapalı çarşısı.',
        estimatedTime: '2-3 saat',
        entrance: 'Ücretsiz'
      },
      {
        name: 'Galata Kulesi',
        description: '1348 yılında inşa edilen kule, İstanbul\'un 360° panoramik manzarası.',
        estimatedTime: '1 saat',
        entrance: '₺650'
      }
    ],
    tips: [
      'İstanbulkart edinin - toplu taşımada %50 indirim sağlar',
      'Cuma günleri camilerde ziyaret saatleri kısıtlıdır',
      'Kapalıçarşı Pazar günleri kapalıdır',
      'Taksim-Sultanahmet arasında tramvay kullanın',
      'Boğaz turları için sabah erken saatler daha az kalabalıktır',
      'Hamam deneyimi için tarihi hamamları tercih edin'
    ],
    accessibility: {
      wheelchairFriendly: true,
      publicTransport: true,
      englishSpoken: true
    },
    seo: {
      title: 'İstanbul Gezi Rehberi 2024 | Tarihi Yerler, Oteller, Turlar',
      description: 'İstanbul seyahatinizi planlayın! Ayasofya, Topkapı Sarayı, Kapalıçarşı ve daha fazlası. En iyi oteller, restoranlar ve gezi ipuçları. %100 gerçek bilgiler.',
      keywords: ['istanbul', 'istanbul gezi', 'ayasofya', 'sultanahmet', 'boğaz turu', 'istanbul otelleri', 'istanbul turları', 'kapalıçarşı', 'galata kulesi'],
      ogImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&h=630&fit=crop'
    },
    relatedDestinations: ['bursa', 'canakkale', 'edirne'],
    popularMonths: [4, 5, 6, 9, 10],
    avgTemperature: {
      min: 8,
      max: 28
    }
  },
  {
    id: 'kapadokya',
    slug: 'kapadokya-balon-turu',
    name: 'Kapadokya',
    nameEn: 'Cappadocia',
    region: 'İç Anadolu',
    country: 'Türkiye',
    category: 'nature',
    images: {
      hero: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1566912436285-cb15e4d0dcd6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1605967840894-e47f7d87a96d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1577876987942-2c0c4f7c634b?w=800&h=600&fit=crop'
      ]
    },
    coordinates: {
      lat: 38.6431,
      lng: 34.8287
    },
    pricing: {
      budgetRange: '₺1,200 - ₺4,500',
      averageDailyBudget: 2200,
      currency: 'TRY'
    },
    rating: 4.9,
    reviews: 23456,
    description: 'Kapadokya, peri bacaları, yeraltı şehirleri ve sıcak hava balonları ile dünyaca ünlü bir doğa harikası. Milyonlarca yıl önce volkanik patlamalar sonucu oluşan eşsiz jeolojik formasyonlar, tarihi kaya kiliseleri ve UNESCO Dünya Mirası statüsü ile unutulmaz bir deneyim sunar.',
    descriptionEn: 'Cappadocia is a world-famous natural wonder with fairy chimneys, underground cities and hot air balloons. Unique geological formations formed millions of years ago by volcanic eruptions, historic rock churches and UNESCO World Heritage status offer an unforgettable experience.',
    shortDescription: 'Peri bacaları ve sıcak hava balonları ile ünlü doğa harikası',
    duration: '2-4 gün',
    bestTime: ['Nisan', 'Mayıs', 'Haziran', 'Eylül', 'Ekim'],
    highlights: [
      'Sıcak Hava Balonu Turu - Gündoğumunda',
      'Göreme Açık Hava Müzesi - UNESCO Mirası',
      'Derinkuyu Yeraltı Şehri',
      'Paşabağ Vadisi (Peri Bacaları)',
      'Uçhisar Kalesi - Panoramik Manzara',
      'Avanos Çömlekçilik Köyü',
      'Kaymaklı Yeraltı Şehri',
      'Kızılçukur Vadisi - Günbatımı'
    ],
    activities: [
      'Balon Turu (Gündoğumu)',
      'ATV Safari',
      'Kaya Kiliselerini Keşfetme',
      'Yeraltı Şehrini Gezme',
      'Vadilerde Yürüyüş',
      'At Safari',
      'Çömlekçilik Workshop',
      'Mağara Otelde Konaklama',
      'Türk Gecesi Gösterisi'
    ],
    accommodation: {
      budget: 800,
      midRange: 1800,
      luxury: 4500
    },
    transportation: {
      fromIstanbul: '1.5 saat (uçak Kayseri/Nevşehir)',
      fromAnkara: '3 saat (araba)',
      local: ['Tur Otobüsleri', 'Kiralık Araba', 'Taksi', 'ATV']
    },
    climate: {
      summer: 'Sıcak ve kuru (28-35°C)',
      winter: 'Soğuk ve karlı (-5 ile 5°C)',
      spring: 'Ilıman (10-20°C)',
      autumn: 'Serin ve ferah (12-22°C)'
    },
    foodAndDrink: [
      'Testi Kebabı',
      'Mantı',
      'Tandır',
      'Gözleme',
      'Kapadokya Şarapları',
      'Üzüm Pekmezi',
      'Cevizli Sucuk'
    ],
    mustSee: [
      {
        name: 'Sıcak Hava Balonu Turu',
        description: 'Gündoğumunda peri bacalarının üzerinde unutulmaz bir deneyim. Rezervasyon şart!',
        estimatedTime: '3-4 saat (transfer dahil)',
        entrance: '₺2,500-5,000 (şirkete göre değişir)'
      },
      {
        name: 'Göreme Açık Hava Müzesi',
        description: 'UNESCO Dünya Mirası. 10-13. yüzyıl freskli kaya kiliseleri.',
        estimatedTime: '2 saat',
        entrance: '₺400'
      },
      {
        name: 'Derinkuyu Yeraltı Şehri',
        description: '8 kat derinliğinde, 20,000 kişi kapasiteli yeraltı şehri.',
        estimatedTime: '1.5 saat',
        entrance: '₺200'
      },
      {
        name: 'Paşabağ Vadisi',
        description: 'En etkileyici peri bacalarının bulunduğu vadi.',
        estimatedTime: '1 saat',
        entrance: 'Ücretsiz'
      }
    ],
    tips: [
      'Balon turları için en az 2 gün önceden rezervasyon yapın',
      'Balon turları hava şartlarına bağlıdır, alternatif günler planlayın',
      'Yazları çok sıcak, bol su taşıyın',
      'Kışları kar manzarası çok güzeldir ancak soğuk olabilir',
      'Yeraltı şehirleri dar ve alçak, rahat giysiler tercih edin',
      'Mağara otel deneyimi için önceden rezervasyon şart'
    ],
    accessibility: {
      wheelchairFriendly: false, // Yeraltı şehirleri ve vadiler zor
      publicTransport: false,
      englishSpoken: true
    },
    seo: {
      title: 'Kapadokya Gezi Rehberi 2024 | Balon Turu, Otel, Turlar',
      description: 'Kapadokya seyahati için rehber! Sıcak hava balonu turları, peri bacaları, yeraltı şehirleri, mağara oteller. En iyi fiyatlar ve ipuçları.',
      keywords: ['kapadokya', 'balon turu', 'peri bacaları', 'göreme', 'yeraltı şehri', 'kapadokya otelleri', 'mağara otel', 'kapadokya turları'],
      ogImage: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=1200&h=630&fit=crop'
    },
    relatedDestinations: ['konya', 'kayseri', 'aksaray'],
    popularMonths: [4, 5, 6, 9, 10],
    avgTemperature: {
      min: 2,
      max: 30
    }
  },
  {
    id: 'antalya',
    slug: 'antalya-turkuaz-sahiller',
    name: 'Antalya',
    nameEn: 'Antalya',
    region: 'Akdeniz',
    country: 'Türkiye',
    category: 'beach',
    images: {
      hero: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1561461986-a4ea95d1e632?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1597303898398-ffb7c27c1bc0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1591289009675-1e6d6e1f9c67?w=800&h=600&fit=crop'
      ]
    },
    coordinates: {
      lat: 36.8969,
      lng: 30.7133
    },
    pricing: {
      budgetRange: '₺700 - ₺3,500',
      averageDailyBudget: 1400,
      currency: 'TRY'
    },
    rating: 4.8,
    reviews: 34567,
    description: 'Antalya, Türkiye\'nin incisi, turkuaz denizleri, antik kentleri ve lüks tatil köyleri ile ünlü Akdeniz şehri. Her yıl milyonlarca turisti ağırlayan bu cennet, hem deniz-kum-güneş hem de tarihi keşif için mükemmel bir destinasyon.',
    descriptionEn: 'Antalya, the pearl of Turkey, is a Mediterranean city famous for its turquoise seas, ancient cities and luxury resorts. Welcoming millions of tourists every year, this paradise is a perfect destination for both sea-sand-sun and historical discovery.',
    shortDescription: 'Turkuaz deniz ve antik tarihle dolu sahil kenti',
    duration: '5-10 gün',
    bestTime: ['Mayıs', 'Haziran', 'Eylül', 'Ekim'],
    highlights: [
      'Kaleiçi (Eski Şehir)',
      'Düden Şelalesi',
      'Aspendos Antik Tiyatrosu',
      'Konyaaltı Plajı',
      'Perge Antik Kenti',
      'Termessos Antik Kenti',
      'Side Antik Kenti',
      'Manavgat Şelalesi'
    ],
    activities: [
      'Plajda Güneşlenme',
      'Dalış',
      'Tekne Turları',
      'Antik Kent Gezileri',
      'Rafting (Köprülü Kanyon)',
        'Jeep Safari',
      'Aqua Park',
      'Deniz Paraşütü',
      'Balık Restoranları'
    ],
    accommodation: {
      budget: 600,
      midRange: 1500,
      luxury: 4000
    },
    transportation: {
      fromIstanbul: '1.5 saat (uçak)',
      fromAnkara: '8 saat (otobüs)',
      local: ['Tramvay', 'Otobüs', 'Taksi', 'Kiralık Araba', 'Dolmuş']
    },
    climate: {
      summer: 'Çok sıcak (30-40°C)',
      winter: 'Ilıman ve yağışlı (10-18°C)',
      spring: 'Güneşli ve sıcak (18-28°C)',
      autumn: 'Sıcak ve güneşli (22-30°C)'
    },
    foodAndDrink: [
      'Piyaz',
      'Hibeş',
      'Şiş Köfte',
      'Taze Balık',
      'Portakal Tatlısı',
      'Antalya Simidi'
    ],
    mustSee: [
      {
        name: 'Aspendos Antik Tiyatrosu',
        description: 'Roma döneminin en iyi korunmuş tiyatrosu, hala konser ve etkinlikler için kullanılıyor.',
        estimatedTime: '1.5 saat',
        entrance: '₺250'
      },
      {
        name: 'Kaleiçi',
        description: 'Antalya\'nın tarihi merkezi. Dar sokaklar, Osmanlı evleri, butik oteller ve restoranlar.',
        estimatedTime: '2-3 saat',
        entrance: 'Ücretsiz'
      },
      {
        name: 'Düden Şelalesi',
        description: 'Şehir merkezine yakın muhteşem şelale. Alt Düden denize dökülüyor.',
        estimatedTime: '1 saat',
        entrance: '₺30'
      },
      {
        name: 'Konyaaltı Plajı',
        description: '7 km uzunluğunda çakıl plaj. Mavi Bayraklı, temiz ve geniş.',
        estimatedTime: 'Tam gün',
        entrance: 'Ücretsiz (şezlong ücretli)'
      }
    ],
    tips: [
      'Yaz ayları çok kalabalık ve pahalı, Mayıs/Ekim daha uygun',
      'Antik kentler için rehber tutmak deneyimi artırır',
      'Konyaaltı ve Lara en popüler plajlar',
      'All-inclusive oteller ekonomik olabilir',
      'Kaleiçi\'nde yürüyerek gezin, araçla zor',
      'Deniz sezonu Mayıs-Ekim arası'
    ],
    accessibility: {
      wheelchairFriendly: true,
      publicTransport: true,
      englishSpoken: true
    },
    seo: {
      title: 'Antalya Tatil Rehberi 2024 | Oteller, Plajlar, Gezilecek Yerler',
      description: 'Antalya tatili için komple rehber! En iyi plajlar, oteller, antik kentler, aktiviteler. Kaleiçi, Aspendos, Düden Şelalesi ve daha fazlası.',
      keywords: ['antalya', 'antalya otelleri', 'kaleiçi', 'konyaaltı', 'aspendos', 'antalya plajları', 'antalya turları', 'side'],
      ogImage: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&h=630&fit=crop'
    },
    relatedDestinations: ['alanya', 'kas', 'kemer', 'side'],
    popularMonths: [5, 6, 7, 8, 9, 10],
    avgTemperature: {
      min: 12,
      max: 35
    }
  }
  // More destinations will be added...
];

// Helper functions
export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS_TURKEY.find(d => d.slug === slug);
}

export function getDestinationById(id: string): Destination | undefined {
  return DESTINATIONS_TURKEY.find(d => d.id === id);
}

export function getDestinationsByCategory(category: Destination['category']): Destination[] {
  return DESTINATIONS_TURKEY.filter(d => d.category === category);
}

export function getDestinationsByRegion(region: string): Destination[] {
  return DESTINATIONS_TURKEY.filter(d => d.region === region);
}

export function getAllDestinationSlugs(): string[] {
  return DESTINATIONS_TURKEY.map(d => d.slug);
}

export function searchDestinations(query: string): Destination[] {
  const lowerQuery = query.toLowerCase();
  return DESTINATIONS_TURKEY.filter(d =>
    d.name.toLowerCase().includes(lowerQuery) ||
    d.nameEn.toLowerCase().includes(lowerQuery) ||
    d.description.toLowerCase().includes(lowerQuery) ||
    d.region.toLowerCase().includes(lowerQuery) ||
    d.highlights.some(h => h.toLowerCase().includes(lowerQuery)) ||
    d.activities.some(a => a.toLowerCase().includes(lowerQuery))
  );
}
