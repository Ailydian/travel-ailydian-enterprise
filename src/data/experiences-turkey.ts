/**
 * Comprehensive Turkey Experiences & Activities Database
 * Real tour and activity data
 * SEO optimized with complete information
 */

export interface Experience {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  location: string;
  destinationId: string;
  category: 'cultural' | 'adventure' | 'nature' | 'culinary' | 'photography' | 'water-sports' | 'wellness';
  type: 'tour' | 'activity' | 'workshop' | 'experience';
  images: {
    hero: string;
    gallery: string[];
  };
  pricing: {
    adult: number;
    child: number;
    infant: number;
    currency: string;
  };
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  durationMinutes: number;
  groupSize: {
    min: number;
    max: number;
  };
  availability: string[];
  languages: string[];
  description: string;
  descriptionEn: string;
  shortDescription: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    time: string;
    activity: string;
    description: string;
  }[];
  meetingPoint: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  physicalLevel: number; // 1-5
  accessibility: {
    wheelchairAccessible: boolean;
    infantsAllowed: boolean;
    serviceAnimals: boolean;
  };
  cancellationPolicy: {
    freeCancellation: boolean;
    hoursBeforeStart: number;
    refundPercentage: number;
  };
  whatsIncluded: {
    meals: string[];
    transportation: boolean;
    guide: boolean;
    equipment: boolean;
    insurance: boolean;
  };
  tags: string[];
  seasonality: {
    bestMonths: number[];
    availableMonths: number[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  relatedExperiences: string[];
}

export const EXPERIENCES_TURKEY: Experience[] = [
  {
    id: 'istanbul-bosphorus-sunset-cruise',
    slug: 'istanbul-bogaz-gunbatimi-turu',
    title: 'İstanbul Boğaz Gün Batımı Turu ve Yemek',
    titleEn: 'Istanbul Bosphorus Sunset Cruise with Dinner',
    location: 'İstanbul, Beşiktaş',
    destinationId: 'istanbul',
    category: 'cultural',
    type: 'tour',
    images: {
      hero: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1561727946-6a970bb942be?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=800&h=600&fit=crop'
      ]
    },
    pricing: {
      adult: 450,
      child: 250,
      infant: 0,
      currency: 'TRY'
    },
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 2847,
    duration: '3 saat',
    durationMinutes: 180,
    groupSize: {
      min: 2,
      max: 150
    },
    availability: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    languages: ['Türkçe', 'İngilizce', 'Almanca', 'Arapça'],
    description: 'İstanbul Boğazı\'nda unutulmaz bir gün batımı deneyimi. Tarihi sarayları, köşkleri ve köprüleri seyrederken, geleneksel Türk yemeklerinin tadını çıkarın. Canlı müzik eşliğinde romantik bir akşam.',
    descriptionEn: 'An unforgettable sunset experience on the Bosphorus. Enjoy traditional Turkish cuisine while viewing historic palaces, mansions and bridges. A romantic evening with live music.',
    shortDescription: 'Boğaz\'ın eşsiz güzelliklerinde yemekli gün batımı turu',
    highlights: [
      'Boğaz\'da panoramik gün batımı manzarası',
      'Geleneksel Türk mutfağı akşam yemeği',
      'Canlı Türk müziği ve dans gösterisi',
      'Dolmabahçe, Rumelihisarı, Kız Kulesi manzarası',
      'Unlimited çay ve Türk kahvesi',
      'Otel transfer hizmeti (seçmeli)'
    ],
    included: [
      '3 saatlik Boğaz cruise',
      'Açık büfe akşam yemeği',
      'Canlı müzik gösterisi',
      'Sınırsız içeceksiz içki',
      'Profesyonel rehber',
      'Vergi ve servis ücreti'
    ],
    excluded: [
      'Otel transferi (ekstra ücretli)',
      'Alkollü içecekler',
      'Fotoğraf servisi',
      'Kişisel harcamalar'
    ],
    itinerary: [
      {
        time: '18:00',
        activity: 'Toplama Noktasında Buluşma',
        description: 'Kabataş İskelesinde katılımcıların toplanması ve gemiye biniş'
      },
      {
        time: '18:30',
        activity: 'Cruise Başlangıcı',
        description: 'Boğaz turu başlar. Dolmabahçe Sarayı, Ortaköy Camii ve Boğaz Köprüsü\'nü görüntüleyin'
      },
      {
        time: '19:00',
        activity: 'Akşam Yemeği',
        description: 'Geleneksel Türk mutfağı açık büfe yemek servisi başlar'
      },
      {
        time: '20:00',
        activity: 'Canlı Müzik Gösterisi',
        description: 'Türk halk müziği ve dans gösterisi'
      },
      {
        time: '21:00',
        activity: 'Tur Sonu',
        description: 'Kabataş İskelesine dönüş ve tura veda'
      }
    ],
    meetingPoint: 'Kabataş İskelesi, Beşiktaş/İstanbul (Harita linki sağlanacak)',
    difficulty: 'easy',
    physicalLevel: 1,
    accessibility: {
      wheelchairAccessible: true,
      infantsAllowed: true,
      serviceAnimals: true
    },
    cancellationPolicy: {
      freeCancellation: true,
      hoursBeforeStart: 24,
      refundPercentage: 100
    },
    whatsIncluded: {
      meals: ['Akşam Yemeği'],
      transportation: false,
      guide: true,
      equipment: false,
      insurance: true
    },
    tags: ['Boğaz Turu', 'Gün Batımı', 'Yemek', 'Müzik', 'Romantik', 'Aile Dostu'],
    seasonality: {
      bestMonths: [4, 5, 6, 7, 8, 9, 10],
      availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    seo: {
      title: 'İstanbul Boğaz Gün Batımı Turu | Yemekli Cruise 2024',
      description: 'İstanbul Boğazı\'nda romantik gün batımı turu! Yemek, canlı müzik, muhteşem manzara. Online rezervasyon, en iyi fiyat garantisi. %100 gerçek yorumlar.',
      keywords: ['boğaz turu', 'istanbul cruise', 'gün batımı turu', 'yemekli tur', 'boğazda yemek', 'istanbul tekne turu'],
      ogImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=630&fit=crop'
    },
    relatedExperiences: ['istanbul-walking-tour', 'istanbul-food-tour', 'princes-islands-tour']
  },
  {
    id: 'cappadocia-hot-air-balloon',
    slug: 'kapadokya-sicak-hava-balonu-turu',
    title: 'Kapadokya Sıcak Hava Balonu Turu - Gün Doğumu',
    titleEn: 'Cappadocia Hot Air Balloon Ride - Sunrise',
    location: 'Kapadokya, Nevşehir',
    destinationId: 'kapadokya',
    category: 'adventure',
    type: 'activity',
    images: {
      hero: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1566912436285-cb15e4d0dcd6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1605967840894-e47f7d87a96d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop'
      ]
    },
    pricing: {
      adult: 3500,
      child: 2500,
      infant: 0,
      currency: 'TRY'
    },
    originalPrice: 4500,
    rating: 4.9,
    reviewCount: 5432,
    duration: '3 saat',
    durationMinutes: 180,
    groupSize: {
      min: 8,
      max: 20
    },
    availability: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    languages: ['Türkçe', 'İngilizce', 'Rusça', 'Çince'],
    description: 'Kapadokya\'nın peri bacaları üzerinde gün doğumunda unutulmaz bir balon deneyimi. Profesyonel pilotlar eşliğinde güvenli ve konforlu uçuş. Şampanya ile kutlama ve uçuş sertifikası.',
    descriptionEn: 'An unforgettable balloon experience at sunrise over the fairy chimneys of Cappadocia. Safe and comfortable flight with professional pilots. Celebration with champagne and flight certificate.',
    shortDescription: 'Peri bacalarının üzerinde büyülü gün doğumu balonu',
    highlights: [
      'Gün doğumunda 60-90 dakika uçuş',
      'Peri bacaları üzerinde panoramik manzara',
      'Sivil Havacılık Sertifikalı pilotlar',
      'Şampanya ile iniş kutlaması',
      'Uçuş sertifikası',
      'Otel transfer (gidiş-dönüş)',
      'Hafif kahvaltı',
      'Küçük grup (max 20 kişi)'
    ],
    included: [
      'Otel transferi (gidiş-dönüş)',
      'Hafif kahvaltı ve sıcak içecekler',
      '60-90 dakika balon uçuşu',
      'Şampanya kutlaması',
      'Uçuş sertifikası',
      'Sigorta',
      'Tecrübeli pilot'
    ],
    excluded: [
      'Kişisel harcamalar',
      'Fotoğraf ve video hizmeti',
      'Bahşiş'
    ],
    itinerary: [
      {
        time: '04:30-05:00',
        activity: 'Otel Transferi',
        description: 'Otelinizden alınma (sezona göre değişir)'
      },
      {
        time: '05:30',
        activity: 'Hafif Kahvaltı',
        description: 'Uçuş merkezinde çay/kahve ve kek servisi'
      },
      {
        time: '06:00',
        activity: 'Güvenlik Brifing',
        description: 'Pilot tarafından güvenlik ve uçuş bilgilendirmesi'
      },
      {
        time: '06:30',
        activity: 'Balonun Şişirilmesi',
        description: 'Balonun hazırlanma sürecini izleyin, fotoğraf çekin'
      },
      {
        time: '07:00',
        activity: 'Uçuş Başlangıcı',
        description: 'Gün doğumu ile birlikte gökyüzüne yükseliş'
      },
      {
        time: '08:00-08:30',
        activity: 'İniş ve Kutlama',
        description: 'Yumuşak iniş, şampanya kutlaması ve sertifika töreni'
      },
      {
        time: '09:00',
        activity: 'Otel Dönüşü',
        description: 'Otelinize transfer'
      }
    ],
    meetingPoint: 'Otel lobinizden alınacaksınız (transfer dahil)',
    difficulty: 'easy',
    physicalLevel: 1,
    accessibility: {
      wheelchairAccessible: false,
      infantsAllowed: false, // Güvenlik nedeniyle 6 yaş altı alınmaz
      serviceAnimals: false
    },
    cancellationPolicy: {
      freeCancellation: true,
      hoursBeforeStart: 24,
      refundPercentage: 100
    },
    whatsIncluded: {
      meals: ['Hafif Kahvaltı'],
      transportation: true,
      guide: true,
      equipment: true,
      insurance: true
    },
    tags: ['Balon', 'Gün Doğumu', 'Macera', 'Kapadokya', 'Bucket List', 'Lüks'],
    seasonality: {
      bestMonths: [4, 5, 6, 9, 10],
      availableMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    seo: {
      title: 'Kapadokya Balon Turu | Gün Doğumu Uçuşu 2024 - En İyi Fiyat',
      description: 'Kapadokya\'da unutulmaz balon deneyimi! Profesyonel pilotlar, güvenli uçuş, şampanya kutlaması. Online rezervasyon, %100 güvenli ödeme.',
      keywords: ['kapadokya balon', 'balon turu', 'sıcak hava balonu', 'kapadokya gün doğumu', 'balon fiyatları', 'kapadokya turları'],
      ogImage: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=1200&h=630&fit=crop'
    },
    relatedExperiences: ['cappadocia-atv-tour', 'cappadocia-walking-tour', 'underground-city-tour']
  },
  {
    id: 'antalya-scuba-diving',
    slug: 'antalya-dalıs-turu',
    title: 'Antalya Scuba Dalış Turu - Tüm Seviyeler',
    titleEn: 'Antalya Scuba Diving Tour - All Levels',
    location: 'Antalya, Konyaaltı',
    destinationId: 'antalya',
    category: 'water-sports',
    type: 'activity',
    images: {
      hero: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544551763-92d6c2e6949f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop'
      ]
    },
    pricing: {
      adult: 850,
      child: 650,
      infant: 0,
      currency: 'TRY'
    },
    originalPrice: 1100,
    rating: 4.8,
    reviewCount: 1234,
    duration: '4 saat',
    durationMinutes: 240,
    groupSize: {
      min: 2,
      max: 8
    },
    availability: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça'],
    description: 'Akdeniz\'in kristal berraklığındaki sularında profesyonel dalış deneyimi. PADI sertifikalı eğitmenler eşliğinde güvenli dalış. Başlangıç seviyesinden ileri seviyeye kadar herkes için uygun.',
    descriptionEn: 'Professional diving experience in the crystal clear waters of the Mediterranean. Safe diving with PADI certified instructors. Suitable for everyone from beginner to advanced level.',
    shortDescription: 'Akdeniz\'de profesyonel dalış macerası',
    highlights: [
      'PADI sertifikalı profesyonel eğitmenler',
      '2 farklı dalış noktası',
      'Tüm ekipman dahil',
      'Küçük grup (max 8 kişi)',
      'Sualtı fotoğrafları dahil',
      'Deneyim sertifikası',
      'Otel transferi',
      'Öğle yemeği'
    ],
    included: [
      'Otel transferi (gidiş-dönüş)',
      'Tüm dalış ekipmanı',
      'PADI sertifikalı eğitmen',
      '2 dalış (her biri 30-40 dk)',
      'Öğle yemeği',
      'Sualtı fotoğrafları',
      'Dalış sertifikası',
      'Sigorta'
    ],
    excluded: [
      'Kişisel harcamalar',
      'Ekstra dalış',
      'Video çekimi',
      'Bahşiş'
    ],
    itinerary: [
      {
        time: '08:00',
        activity: 'Otel Transferi',
        description: 'Otelinizden alınma'
      },
      {
        time: '09:00',
        activity: 'Dalış Merkezinde Karşılama',
        description: 'Ekipman teslimi ve sağlık formu doldurma'
      },
      {
        time: '09:30',
        activity: 'Teorik Eğitim',
        description: 'Dalış güvenliği, ekipman kullanımı ve işaretler'
      },
      {
        time: '10:30',
        activity: 'Tekne ile Dalış Noktasına',
        description: 'İlk dalış noktasına hareket'
      },
      {
        time: '11:00',
        activity: 'İlk Dalış',
        description: '30-40 dakika dalış (10-12 metre derinlik)'
      },
      {
        time: '12:00',
        activity: 'Öğle Yemeği',
        description: 'Teknede taze balık ve mezeler'
      },
      {
        time: '13:00',
        activity: 'İkinci Dalış',
        description: 'Farklı noktada 30-40 dakika dalış'
      },
      {
        time: '14:00',
        activity: 'Dönüş ve Otel Transferi',
        description: 'Sertifika töreni ve otelinize transfer'
      }
    ],
    meetingPoint: 'Otel lobinizden alınacaksınız',
    difficulty: 'easy',
    physicalLevel: 2,
    accessibility: {
      wheelchairAccessible: false,
      infantsAllowed: false, // 10 yaş ve üzeri
      serviceAnimals: false
    },
    cancellationPolicy: {
      freeCancellation: true,
      hoursBeforeStart: 48,
      refundPercentage: 100
    },
    whatsIncluded: {
      meals: ['Öğle Yemeği'],
      transportation: true,
      guide: true,
      equipment: true,
      insurance: true
    },
    tags: ['Dalış', 'Su Sporları', 'Macera', 'Deniz', 'PADI', 'Sualtı'],
    seasonality: {
      bestMonths: [5, 6, 7, 8, 9, 10],
      availableMonths: [4, 5, 6, 7, 8, 9, 10, 11]
    },
    seo: {
      title: 'Antalya Dalış Turu | PADI Sertifikalı Scuba Diving 2024',
      description: 'Antalya\'da profesyonel dalış deneyimi! PADI eğitmenler, tüm ekipman dahil, küçük gruplar. Yeni başlayanlar için ideal. Online rezervasyon.',
      keywords: ['antalya dalış', 'scuba diving', 'dalış turu', 'padi dalış', 'sualtı', 'antalya su sporları'],
      ogImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=630&fit=crop'
    },
    relatedExperiences: ['antalya-boat-tour', 'antalya-rafting', 'antalya-paragliding']
  },
  {
    id: 'istanbul-food-tour',
    slug: 'istanbul-gastronomi-turu',
    title: 'İstanbul Gastronomi Turu - Yerel Lezzetler',
    titleEn: 'Istanbul Food Tour - Local Flavors',
    location: 'İstanbul, Kadıköy & Sultanahmet',
    destinationId: 'istanbul',
    category: 'culinary',
    type: 'tour',
    images: {
      hero: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop'
      ]
    },
    pricing: {
      adult: 650,
      child: 450,
      infant: 0,
      currency: 'TRY'
    },
    originalPrice: 850,
    rating: 4.9,
    reviewCount: 3456,
    duration: '5 saat',
    durationMinutes: 300,
    groupSize: {
      min: 4,
      max: 12
    },
    availability: ['Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    languages: ['Türkçe', 'İngilizce'],
    description: 'İstanbul\'un en otantik lezzetlerini keşfedin. Yerel pazarları, tarihi lokantaları ve sokak lezzetlerini deneyimleyin. Profesyonel gastronomi rehberi eşliğinde kültürel bir yolculuk.',
    descriptionEn: 'Discover the most authentic flavors of Istanbul. Experience local markets, historic restaurants and street food. A cultural journey with a professional food guide.',
    shortDescription: 'Yerel pazarlar ve otantik İstanbul lezzetleri turu',
    highlights: [
      '15+ farklı Türk lezzeti tadımı',
      'Tarihi Kapalıçarşı gezisi',
      'Kadıköy pazarı keşfi',
      'Geleneksel Türk kahvesi falı',
      'Baklava atölyesi ziyareti',
      'Sokak lezzetleri (balık ekmek, midye dolma)',
      'Profesyonel gastronomi rehberi',
      'Küçük grup deneyimi'
    ],
    included: [
      'Profesyonel gastronomi rehberi',
      '15+ yemek ve içecek tadımı',
      'Toplu taşıma biletleri',
      'Su ve meşrubat',
      'Tarihi lokanta deneyimi',
      'Dijital yemek rehberi'
    ],
    excluded: [
      'Otel transferi',
      'Alkollü içecekler',
      'Kişisel harcamalar',
      'Bahşiş'
    ],
    itinerary: [
      {
        time: '10:00',
        activity: 'Sultanahmet\'te Buluşma',
        description: 'Rehber ile tanışma ve tura başlangıç'
      },
      {
        time: '10:30',
        activity: 'Geleneksel Kahvaltı',
        description: 'Tarihi lokantada tam Türk kahvaltısı'
      },
      {
        time: '11:30',
        activity: 'Kapalıçarşı Gezisi',
        description: 'Baharat çarşısı, Türk lokumu, baklava tadımı'
      },
      {
        time: '13:00',
        activity: 'Eminönü Sokak Lezzetleri',
        description: 'Balık ekmek, midye dolma, kokoreç'
      },
      {
        time: '14:00',
        activity: 'Kadıköy\'e Vapur',
        description: 'Boğaz manzaralı vapur yolculuğu'
      },
      {
        time: '14:30',
        activity: 'Kadıköy Pazarı',
        description: 'Yerel pazar, peynir, zeytin, meze tadımları'
      },
      {
        time: '15:00',
        activity: 'Tur Sonu',
        description: 'Kadıköy\'de tura son ve serbest zaman'
      }
    ],
    meetingPoint: 'Sultanahmet Meydanı, Mavi Cami önü',
    difficulty: 'easy',
    physicalLevel: 2, // Orta seviye yürüme gerekir
    accessibility: {
      wheelchairAccessible: false, // Eski çarşı alanları dar
      infantsAllowed: true,
      serviceAnimals: false
    },
    cancellationPolicy: {
      freeCancellation: true,
      hoursBeforeStart: 24,
      refundPercentage: 100
    },
    whatsIncluded: {
      meals: ['Kahvaltı', 'Öğle Yemeği Tadımları'],
      transportation: false,
      guide: true,
      equipment: false,
      insurance: false
    },
    tags: ['Gastronomi', 'Yemek Turu', 'Sokak Lezzetleri', 'Kültür', 'Pazar', 'Yerel Deneyim'],
    seasonality: {
      bestMonths: [3, 4, 5, 6, 9, 10, 11],
      availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    seo: {
      title: 'İstanbul Yemek Turu | Gastronomi ve Sokak Lezzetleri 2024',
      description: 'İstanbul\'un en iyi lezzetlerini keşfedin! Kapalıçarşı, sokak yemekleri, yerel pazarlar. Profesyonel rehber, 15+ tadım. Online rezervasyon.',
      keywords: ['istanbul yemek turu', 'gastronomi turu', 'istanbul lezzetleri', 'sokak yemekleri', 'kapalıçarşı', 'türk mutfağı'],
      ogImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop'
    },
    relatedExperiences: ['istanbul-bosphorus-sunset-cruise', 'istanbul-walking-tour', 'turkish-cooking-class']
  }
];

// Helper functions
export function getExperienceBySlug(slug: string): Experience | undefined {
  return EXPERIENCES_TURKEY.find(e => e.slug === slug);
}

export function getExperienceById(id: string): Experience | undefined {
  return EXPERIENCES_TURKEY.find(e => e.id === id);
}

export function getExperiencesByCategory(category: Experience['category']): Experience[] {
  return EXPERIENCES_TURKEY.filter(e => e.category === category);
}

export function getExperiencesByDestination(destinationId: string): Experience[] {
  return EXPERIENCES_TURKEY.filter(e => e.destinationId === destinationId);
}

export function getAllExperienceSlugs(): string[] {
  return EXPERIENCES_TURKEY.map(e => e.slug);
}

export function searchExperiences(query: string): Experience[] {
  const lowerQuery = query.toLowerCase();
  return EXPERIENCES_TURKEY.filter(e =>
    e.title.toLowerCase().includes(lowerQuery) ||
    e.titleEn.toLowerCase().includes(lowerQuery) ||
    e.description.toLowerCase().includes(lowerQuery) ||
    e.location.toLowerCase().includes(lowerQuery) ||
    e.highlights.some(h => h.toLowerCase().includes(lowerQuery)) ||
    e.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}
