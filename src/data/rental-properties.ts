/**
 * Rental Properties Data - Airbnb Style
 * Alanya, Antalya, Marmaris, Bodrum, Çeşme
 */

export interface RentalProperty {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: 'villa' | 'apartment' | 'house' | 'studio' | 'penthouse';
  location: {
    city: string;
    district: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  host: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    superhost: boolean;
    responseRate: number;
    responseTime: string;
    joinedDate: string;
  };
  pricing: {
    basePrice: number;
    weekendPrice: number;
    weeklyDiscount: number;
    monthlyDiscount: number;
    cleaningFee: number;
    currency: string;
    competitorPrices?: {
      airbnb?: number;
      booking?: number;
      agoda?: number;
    };
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  rules: {
    checkIn: string;
    checkOut: string;
    minStay: number;
    maxStay: number;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    childrenAllowed: boolean;
  };
  features: {
    wifi: boolean;
    kitchen: boolean;
    parking: boolean;
    pool: boolean;
    airConditioning: boolean;
    heating: boolean;
    tv: boolean;
    washer: boolean;
    beachfront: boolean;
    seaview: boolean;
  };
  rating: {
    overall: number;
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
    reviewCount: number;
  };
  availability: {
    instantBook: boolean;
    minAdvanceNotice: number;
    maxAdvanceNotice: number;
    cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const rentalProperties: RentalProperty[] = [
  // ALANYA
  {
    id: 'alanya-luxury-villa-001',
    title: 'Lüks Deniz Manzaralı Villa - Alanya Mahmutlar',
    slug: 'alanya-mahmutlar-luxury-seaview-villa',
    description: 'Muhteşem deniz manzarası, özel havuz ve modern tasarımı ile unutulmaz bir tatil deneyimi. Plaja yürüme mesafesinde, 5 yıldızlı otel konforunda villa.',
    type: 'villa',
    location: {
      city: 'Alanya',
      district: 'Mahmutlar',
      address: 'Barbaros Mahallesi, Deniz Sokak No:15',
      coordinates: { lat: 36.4979, lng: 32.1261 }
    },
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80', // Luxury villa infinity pool Mediterranean sea view Turkey
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80', // Villa terrace sunset Alanya Mediterranean coast
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80', // Modern villa interior luxury living room Turkey
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80', // Villa garden pool deck lounge chairs sea view
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80', // Luxury villa bedroom master suite ocean view
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1920&q=80'  // Villa outdoor dining terrace Mediterranean sunset
    ],
    host: {
      id: 'host-001',
      name: 'Mehmet Yılmaz',
      avatar: '/hosts/mehmet.jpg',
      verified: true,
      superhost: true,
      responseRate: 100,
      responseTime: '1 saat içinde',
      joinedDate: '2020-03-15'
    },
    pricing: {
      basePrice: 2500,
      weekendPrice: 3000,
      weeklyDiscount: 15,
      monthlyDiscount: 25,
      cleaningFee: 500,
      currency: 'TRY',
      competitorPrices: {
        airbnb: 3200,
        booking: 3500,
        agoda: 3300
      }
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 3
    },
    amenities: [
      'Özel Havuz',
      'Deniz Manzarası',
      'Jakuzi',
      'Bahçe',
      'BBQ',
      'Çamaşır Makinesi',
      'Bulaşık Makinesi',
      'Akıllı TV',
      'Netflix',
      'Fiber İnternet',
      'Güvenlik Kamerası',
      'Jeneratör'
    ],
    rules: {
      checkIn: '15:00',
      checkOut: '11:00',
      minStay: 3,
      maxStay: 90,
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: true,
      seaview: true
    },
    rating: {
      overall: 4.9,
      cleanliness: 5.0,
      accuracy: 4.9,
      checkIn: 5.0,
      communication: 5.0,
      location: 4.8,
      value: 4.9,
      reviewCount: 127
    },
    availability: {
      instantBook: true,
      minAdvanceNotice: 2,
      maxAdvanceNotice: 365,
      cancellationPolicy: 'moderate'
    },
    seo: {
      metaTitle: 'Alanya Mahmutlar Lüks Villa Kiralama | Deniz Manzaralı Tatil Evi',
      metaDescription: 'Alanya Mahmutlar\'da deniz manzaralı lüks villa. Özel havuz, modern tasarım ve plaja yürüme mesafesinde. En uygun fiyatlarla şimdi rezervasyon yapın.',
      keywords: ['alanya villa', 'mahmutlar kiralık villa', 'deniz manzaralı ev', 'tatil evi alanya']
    },
    featured: true,
    verified: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-20T15:30:00Z'
  },

  // ANTALYA
  {
    id: 'antalya-lara-apartment-001',
    title: 'Modern Residence Daire - Antalya Lara',
    slug: 'antalya-lara-modern-residence-apartment',
    description: 'Lara Plajı\'na 200m mesafede, site içi havuzlu, deniz manzaralı modern daire. Tüm ihtiyaçlarınız düşünülmüş lüks residence.',
    type: 'apartment',
    location: {
      city: 'Antalya',
      district: 'Lara',
      address: 'Güzeloba Mahallesi, Lara Residence',
      coordinates: { lat: 36.8583, lng: 30.7728 }
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80', // Modern apartment building exterior Antalya Mediterranean
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80', // Luxury apartment living room modern interior design
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80', // Apartment bedroom contemporary minimalist Antalya
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1920&q=80', // Modern apartment bathroom marble luxury
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80', // Apartment balcony sea view Antalya coast
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1920&q=80'  // Residence pool complex Antalya luxury
    ],
    host: {
      id: 'host-002',
      name: 'Ayşe Demir',
      avatar: '/hosts/ayse.jpg',
      verified: true,
      superhost: false,
      responseRate: 95,
      responseTime: '2 saat içinde',
      joinedDate: '2021-06-20'
    },
    pricing: {
      basePrice: 1200,
      weekendPrice: 1500,
      weeklyDiscount: 10,
      monthlyDiscount: 20,
      cleaningFee: 300,
      currency: 'TRY',
      competitorPrices: {
        airbnb: 1600,
        booking: 1800,
        agoda: 1700
      }
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    amenities: [
      'Site Havuzu',
      'Fitness Center',
      'Sauna',
      'Otopark',
      'Güvenlik',
      'Akıllı Ev Sistemi',
      'Tam Donanımlı Mutfak'
    ],
    rules: {
      checkIn: '14:00',
      checkOut: '12:00',
      minStay: 2,
      maxStay: 60,
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: true
    },
    rating: {
      overall: 4.7,
      cleanliness: 4.8,
      accuracy: 4.7,
      checkIn: 4.6,
      communication: 4.8,
      location: 4.9,
      value: 4.8,
      reviewCount: 89
    },
    availability: {
      instantBook: true,
      minAdvanceNotice: 1,
      maxAdvanceNotice: 365,
      cancellationPolicy: 'flexible'
    },
    seo: {
      metaTitle: 'Antalya Lara Kiralık Daire | Deniz Manzaralı Residence',
      metaDescription: 'Lara Plajı yakınında modern residence daire. Site içi havuz, fitness ve güvenlikli. En uygun fiyatlarla rezervasyon yapın.',
      keywords: ['antalya kiralık daire', 'lara residence', 'deniz manzaralı daire']
    },
    featured: true,
    verified: true,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-12-19T14:20:00Z'
  },

  // MARMARİS
  {
    id: 'marmaris-villa-001',
    title: 'Özel Havuzlu Lüks Villa - Marmaris İçmeler',
    slug: 'marmaris-icmeler-private-pool-villa',
    description: 'Muhteşem orman ve deniz manzarası, özel infinity havuz, barbekü alanı. Marmaris merkeze 10 dk, plaja yürüme mesafesinde.',
    type: 'villa',
    location: {
      city: 'Marmaris',
      district: 'İçmeler',
      address: 'İçmeler Mahallesi, Gül Sokak No:8',
      coordinates: { lat: 36.7951, lng: 28.0624 }
    },
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1920&q=80', // Luxury villa pool sunset Marmaris Aegean Sea
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80', // Modern villa architecture exterior white Turkey
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80', // Villa living room contemporary luxury interior
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80', // Villa infinity pool overlooking sea Marmaris
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1920&q=80', // Villa terrace lounge furniture mountain view
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80'  // Villa bedroom luxury suite sea view Marmaris
    ],
    host: {
      id: 'host-003',
      name: 'Can Öztürk',
      avatar: '/hosts/can.jpg',
      verified: true,
      superhost: true,
      responseRate: 100,
      responseTime: '30 dakika içinde',
      joinedDate: '2019-05-10'
    },
    pricing: {
      basePrice: 3500,
      weekendPrice: 4200,
      weeklyDiscount: 20,
      monthlyDiscount: 30,
      cleaningFee: 600,
      currency: 'TRY',
      competitorPrices: {
        airbnb: 4500,
        booking: 4800,
        agoda: 4600
      }
    },
    capacity: {
      guests: 10,
      bedrooms: 5,
      beds: 6,
      bathrooms: 4
    },
    amenities: [
      'Infinity Havuz',
      'Deniz ve Orman Manzarası',
      'BBQ Alanı',
      'Bahçe',
      'Oyun Odası',
      'Sinema Odası',
      'Spor Salonu',
      'Sauna',
      'Özel Şef (Ekstra Ücret)'
    ],
    rules: {
      checkIn: '16:00',
      checkOut: '10:00',
      minStay: 5,
      maxStay: 90,
      petsAllowed: true,
      smokingAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: true
    },
    rating: {
      overall: 5.0,
      cleanliness: 5.0,
      accuracy: 5.0,
      checkIn: 5.0,
      communication: 5.0,
      location: 4.9,
      value: 4.9,
      reviewCount: 156
    },
    availability: {
      instantBook: true,
      minAdvanceNotice: 3,
      maxAdvanceNotice: 365,
      cancellationPolicy: 'strict'
    },
    seo: {
      metaTitle: 'Marmaris İçmeler Lüks Villa | Özel Havuzlu Tatil Evi',
      metaDescription: 'Marmaris İçmeler\'de infinity havuzlu lüks villa. Deniz ve orman manzarası, 10 kişilik, tüm konfor. En uygun fiyat garantisi.',
      keywords: ['marmaris villa', 'içmeler kiralık villa', 'özel havuzlu ev']
    },
    featured: true,
    verified: true,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-12-21T10:15:00Z'
  },

  // BODRUM
  {
    id: 'bodrum-yalikavak-villa-001',
    title: 'Denize Sıfır Villa - Bodrum Yalıkavak',
    slug: 'bodrum-yalikavak-beachfront-villa',
    description: 'Yalıkavak Marina\'ya 5 dakika, denize sıfır konumu ile eşsiz manzara. Özel iskele, jakuzi, akıllı ev sistemi.',
    type: 'villa',
    location: {
      city: 'Bodrum',
      district: 'Yalıkavak',
      address: 'Tilkicik Koyu, Sahil Yolu No:23',
      coordinates: { lat: 37.1486, lng: 27.2658 }
    },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1920&q=80', // Beachfront villa pool Bodrum Aegean Sea Turkey
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80', // Luxury villa white architecture Bodrum Yalikavak
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80', // Villa modern bedroom suite Bodrum luxury
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80', // Villa terrace Aegean Sea view Bodrum sunset
      'https://images.unsplash.com/photo-1600573472556-e91efa960777?auto=format&fit=crop&w=1920&q=80', // Villa infinity pool overlooking bay Bodrum
      'https://images.unsplash.com/photo-1568052261875-f0c2e4b9ab63?auto=format&fit=crop&w=1920&q=80'  // Luxury villa living room modern Bodrum interior
    ],
    host: {
      id: 'host-004',
      name: 'Zeynep Kaya',
      avatar: '/hosts/zeynep.jpg',
      verified: true,
      superhost: true,
      responseRate: 100,
      responseTime: '1 saat içinde',
      joinedDate: '2018-04-12'
    },
    pricing: {
      basePrice: 5000,
      weekendPrice: 6000,
      weeklyDiscount: 15,
      monthlyDiscount: 25,
      cleaningFee: 800,
      currency: 'TRY',
      competitorPrices: {
        airbnb: 6500,
        booking: 7000,
        agoda: 6800
      }
    },
    capacity: {
      guests: 12,
      bedrooms: 6,
      beds: 7,
      bathrooms: 5
    },
    amenities: [
      'Özel İskele',
      'Denize Sıfır',
      'Infinity Havuz',
      'Jakuzi',
      'Akıllı Ev Sistemi',
      'Güvenlik',
      'Tekne Turu (Ekstra)',
      'Özel Şoför (Ekstra)'
    ],
    rules: {
      checkIn: '15:00',
      checkOut: '11:00',
      minStay: 7,
      maxStay: 90,
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: true,
      childrenAllowed: true
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: true,
      seaview: true
    },
    rating: {
      overall: 4.95,
      cleanliness: 5.0,
      accuracy: 4.9,
      checkIn: 5.0,
      communication: 5.0,
      location: 5.0,
      value: 4.9,
      reviewCount: 203
    },
    availability: {
      instantBook: false,
      minAdvanceNotice: 7,
      maxAdvanceNotice: 365,
      cancellationPolicy: 'strict'
    },
    seo: {
      metaTitle: 'Bodrum Yalıkavak Denize Sıfır Villa | Özel İskele + Havuz',
      metaDescription: 'Yalıkavak Marina yakınında denize sıfır lüks villa. Özel iskele, infinity havuz, 12 kişilik. Premium tatil deneyimi.',
      keywords: ['bodrum villa', 'yalıkavak kiralık villa', 'denize sıfır ev']
    },
    featured: true,
    verified: true,
    createdAt: '2023-12-01T07:00:00Z',
    updatedAt: '2024-12-21T09:45:00Z'
  },

  // ÇEŞME
  {
    id: 'cesme-alacati-house-001',
    title: 'Taş Ev - Çeşme Alaçatı Merkez',
    slug: 'cesme-alacati-traditional-stone-house',
    description: 'Alaçatı\'nın merkezinde restore edilmiş otantik taş ev. Rüzgar sörfü merkezine yürüme mesafesi, şirin bahçe, vintage dekorasyon.',
    type: 'house',
    location: {
      city: 'Çeşme',
      district: 'Alaçatı',
      address: 'Kemalpaşa Mahallesi, Cumhuriyet Caddesi No:42',
      coordinates: { lat: 38.2646, lng: 26.3707 }
    },
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=80', // Traditional stone house Alacati Cesme vintage exterior
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1920&q=80', // Stone house modern bathroom luxury Alacati
      'https://images.unsplash.com/photo-1615876063052-2eaa6c41e99b?auto=format&fit=crop&w=1920&q=80', // Traditional Turkish house garden courtyard Alacati
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1920&q=80', // Stone house bedroom vintage decor Cesme
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1920&q=80', // Alacati house terrace outdoor seating area
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1920&q=80'  // Traditional house living room boho style Cesme
    ],
    host: {
      id: 'host-005',
      name: 'Elif Arslan',
      avatar: '/hosts/elif.jpg',
      verified: true,
      superhost: true,
      responseRate: 98,
      responseTime: '1 saat içinde',
      joinedDate: '2020-07-15'
    },
    pricing: {
      basePrice: 2000,
      weekendPrice: 2500,
      weeklyDiscount: 12,
      monthlyDiscount: 22,
      cleaningFee: 400,
      currency: 'TRY',
      competitorPrices: {
        airbnb: 2800,
        booking: 3000,
        agoda: 2900
      }
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2
    },
    amenities: [
      'Otantik Taş Ev',
      'Şirin Bahçe',
      'BBQ',
      'Bisiklet',
      'Plaj Malzemeleri',
      'Vintage Dekorasyon',
      'Alaçatı Merkez Konum'
    ],
    rules: {
      checkIn: '15:00',
      checkOut: '11:00',
      minStay: 3,
      maxStay: 60,
      petsAllowed: true,
      smokingAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: false,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: false
    },
    rating: {
      overall: 4.85,
      cleanliness: 4.9,
      accuracy: 4.8,
      checkIn: 4.9,
      communication: 4.9,
      location: 5.0,
      value: 4.9,
      reviewCount: 145
    },
    availability: {
      instantBook: true,
      minAdvanceNotice: 2,
      maxAdvanceNotice: 365,
      cancellationPolicy: 'moderate'
    },
    seo: {
      metaTitle: 'Çeşme Alaçatı Taş Ev Kiralama | Otantik Tatil Evi',
      metaDescription: 'Alaçatı merkezinde restore edilmiş taş ev. Rüzgar sörfü, plaj ve kafe-barlara yürüme mesafesi. Otantik tatil deneyimi.',
      keywords: ['alaçatı taş ev', 'çeşme kiralık ev', 'alaçatı tatil evi']
    },
    featured: true,
    verified: true,
    createdAt: '2024-03-20T11:00:00Z',
    updatedAt: '2024-12-20T16:30:00Z'
  }
];

export const getRentalsByCity = (city: string) => {
  return rentalProperties.filter(p => p.location.city.toLowerCase() === city.toLowerCase());
};

export const getRentalsByType = (type: string) => {
  return rentalProperties.filter(p => p.type === type);
};

export const getFeaturedRentals = () => {
  return rentalProperties.filter(p => p.featured);
};

export const calculateBestPrice = (property: RentalProperty, nights: number = 7): number => {
  let price = property.pricing.basePrice;

  // Weekly discount
  if (nights >= 7) {
    price = price * (1 - property.pricing.weeklyDiscount / 100);
  }

  // Monthly discount
  if (nights >= 30) {
    price = price * (1 - property.pricing.monthlyDiscount / 100);
  }

  return price * nights + property.pricing.cleaningFee;
};

export const getPriceSavings = (property: RentalProperty): number => {
  const competitorPrices = property.pricing.competitorPrices;
  if (!competitorPrices) return 0;

  const avgCompetitorPrice = (
    (competitorPrices.airbnb || 0) +
    (competitorPrices.booking || 0) +
    (competitorPrices.agoda || 0)
  ) / 3;

  return avgCompetitorPrice - property.pricing.basePrice;
};
