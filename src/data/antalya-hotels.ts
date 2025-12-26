/**
 * Antalya Hotels Database
 * Real hotel data for explore/places-to-stay section
 */

export interface Hotel {
  id: string;
  slug: string;
  name: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  longDescription: {
    tr: string;
    en: string;
  };
  category: 'hotel' | 'villa' | 'apartment' | 'boutique';
  stars: number;
  location: {
    region: string;
    address: {
      tr: string;
      en: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  pricing: {
    perNight: number;
    currency: string;
    seasonalPrices: {
      lowSeason: number;
      midSeason: number;
      highSeason: number;
    };
  };
  images: string[];
  amenities: {
    tr: string[];
    en: string[];
  };
  features: {
    tr: string[];
    en: string[];
  };
  roomTypes: Array<{
    name: { tr: string; en: string };
    capacity: number;
    price: number;
  }>;
  rating: number;
  reviewCount: number;
  checkInTime: string;
  checkOutTime: string;
  policies: {
    tr: string[];
    en: string[];
  };
  nearbyAttractions: Array<{
    name: string;
    distance: string;
  }>;
}

const antalyaHotels: Hotel[] = [
  {
    id: 'lara-luxury-resort',
    slug: 'lara-luxury-resort',
    name: {
      tr: 'Lara Lüks Resort',
      en: 'Lara Luxury Resort'
    },
    description: {
      tr: 'Her Şey Dahil 5 yıldızlı resort',
      en: 'All-Inclusive 5-star resort'
    },
    longDescription: {
      tr: 'Lara\'nın altın kumsallarında yer alan 5 yıldızlı lüks resort otelimiz, Ultra Her Şey Dahil konsepti ile misafirlerine unutulmaz bir tatil deneyimi sunuyor. 500 m uzunluğundaki özel plajı, 7 a la carte restoranı, 12 barı ve dünya standartlarında spa merkezi ile tatilinizi kraliyet konforuyla yaşayın.',
      en: 'Located on the golden beaches of Lara, our 5-star luxury resort offers an unforgettable vacation experience with an Ultra All-Inclusive concept. Enjoy your holiday in royal comfort with its 500m private beach, 7 a la carte restaurants, 12 bars and world-class spa center.'
    },
    category: 'hotel',
    stars: 5,
    location: {
      region: 'Lara',
      address: {
        tr: 'Lara Plajı, Güzeloba Mah. 07230 Muratpaşa/Antalya',
        en: 'Lara Beach, Güzeloba District 07230 Muratpaşa/Antalya'
      },
      coordinates: {
        lat: 36.8569,
        lng: 30.7854
      }
    },
    pricing: {
      perNight: 3500,
      currency: 'TRY',
      seasonalPrices: {
        lowSeason: 2800,
        midSeason: 3500,
        highSeason: 4800
      }
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      tr: ['WiFi', 'Havuz', 'Spa & Wellness', 'Fitness Center', 'Kids Club', 'Plaj', '7 A la Carte Restoran', '12 Bar'],
      en: ['WiFi', 'Pool', 'Spa & Wellness', 'Fitness Center', 'Kids Club', 'Beach', '7 A la Carte Restaurants', '12 Bars']
    },
    features: {
      tr: [
        'Özel 500m kumsal plaj',
        'Ultra Her Şey Dahil konsept',
        '7 adet a la carte restoran',
        '12 adet bar ve kafe',
        '3 adet açık havuz',
        'Kapalı ısıtmalı havuz',
        '3000 m² spa ve wellness merkezi',
        'Aquapark (23 kaydırak)',
        'Mini club (4-12 yaş)',
        'Teen club (13-17 yaş)',
        'Fitness center',
        'Tenis kortları',
        'Basketbol sahası',
        'Mini futbol sahası',
        'Plaj voleybolu',
        '24 saat oda servisi',
        'Ücretsiz otopark',
        'Transfer servisi (havalimanı)'
      ],
      en: [
        'Private 500m sandy beach',
        'Ultra All-Inclusive concept',
        '7 a la carte restaurants',
        '12 bars and cafes',
        '3 outdoor pools',
        'Indoor heated pool',
        '3000 m² spa and wellness center',
        'Aquapark (23 slides)',
        'Mini club (4-12 years)',
        'Teen club (13-17 years)',
        'Fitness center',
        'Tennis courts',
        'Basketball court',
        'Mini football field',
        'Beach volleyball',
        '24-hour room service',
        'Free parking',
        'Transfer service (airport)'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Standart Oda (Bahçe Manzaralı)',
          en: 'Standard Room (Garden View)'
        },
        capacity: 2,
        price: 3500
      },
      {
        name: {
          tr: 'Deniz Manzaralı Oda',
          en: 'Sea View Room'
        },
        capacity: 2,
        price: 4200
      },
      {
        name: {
          tr: 'Aile Odası',
          en: 'Family Room'
        },
        capacity: 4,
        price: 5800
      },
      {
        name: {
          tr: 'Suite (Deniz Manzaralı)',
          en: 'Suite (Sea View)'
        },
        capacity: 3,
        price: 7500
      },
      {
        name: {
          tr: 'King Suite (Jakuzili)',
          en: 'King Suite (with Jacuzzi)'
        },
        capacity: 2,
        price: 9800
      }
    ],
    rating: 4.8,
    reviewCount: 1247,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: {
      tr: [
        'Check-in: 14:00 / Check-out: 12:00',
        'Erken check-in: Müsaitlik durumuna göre',
        'Geç check-out: +%50 ek ücret',
        'İptal: 7 gün öncesine kadar ücretsiz',
        'Evcil hayvan: İzin verilmiyor',
        'Sigara: Sadece belirlenmiş alanlarda',
        'Çocuk: 0-6 yaş ücretsiz, 7-12 yaş %50 indirim'
      ],
      en: [
        'Check-in: 14:00 / Check-out: 12:00',
        'Early check-in: Subject to availability',
        'Late check-out: +50% extra charge',
        'Cancellation: Free up to 7 days before',
        'Pets: Not allowed',
        'Smoking: Only in designated areas',
        'Children: 0-6 years free, 7-12 years 50% discount'
      ]
    },
    nearbyAttractions: [
      { name: 'Antalya Havalimanı', distance: '12 km' },
      { name: 'Antalya Aquarium', distance: '8 km' },
      { name: 'MarkAntalya AVM', distance: '5 km' },
      { name: 'TerraCity AVM', distance: '7 km' },
      { name: 'Lara Plajı', distance: '0 km' },
      { name: 'Kaleiçi (Eski Şehir)', distance: '15 km' }
    ]
  },
  {
    id: 'belek-villa',
    slug: 'belek-private-villa',
    name: {
      tr: 'Belek Özel Villa',
      en: 'Belek Private Villa'
    },
    description: {
      tr: 'Özel havuzlu lüks villa',
      en: 'Luxury villa with private pool'
    },
    longDescription: {
      tr: 'Belek\'in prestijli golf bölgesinde yer alan özel villamız, 5 yatak odalı lüks konaklama imkanı sunuyor. 250 m² özel havuzu, geniş bahçesi ve tam donanımlı mutfağı ile aileniz ve arkadaşlarınızla unutulmaz bir tatil geçirin. Villa içinde 24 saat güvenlik, özel şef hizmeti ve golf sahalarına yakın konum.',
      en: 'Located in the prestigious golf region of Belek, our private villa offers luxury accommodation with 5 bedrooms. Enjoy an unforgettable vacation with your family and friends with its 250 m² private pool, spacious garden and fully equipped kitchen. 24-hour security, private chef service and close proximity to golf courses.'
    },
    category: 'villa',
    stars: 5,
    location: {
      region: 'Belek',
      address: {
        tr: 'Belek Tourism Center, 07506 Serik/Antalya',
        en: 'Belek Tourism Center, 07506 Serik/Antalya'
      },
      coordinates: {
        lat: 36.8623,
        lng: 31.0556
      }
    },
    pricing: {
      perNight: 5000,
      currency: 'TRY',
      seasonalPrices: {
        lowSeason: 4000,
        midSeason: 5000,
        highSeason: 7500
      }
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      tr: ['Özel Havuz', 'Bahçe', 'BBQ', 'Tam Donanımlı Mutfak', 'WiFi', 'Klima', 'Akıllı TV', 'Çamaşır Makinesi'],
      en: ['Private Pool', 'Garden', 'BBQ', 'Fully Equipped Kitchen', 'WiFi', 'Air Conditioning', 'Smart TV', 'Washing Machine']
    },
    features: {
      tr: [
        '5 yatak odası (10 kişi kapasiteli)',
        '250 m² özel havuz',
        '1000 m² bahçe',
        'BBQ ve outdoor dining alanı',
        'Tam donanımlı mutfak',
        '4 banyo',
        'Merkezi klima sistemi',
        'Akıllı ev sistemi',
        '24 saat güvenlik',
        'Ücretsiz otopark (3 araç)',
        'Özel şef hizmeti (ek ücretli)',
        'Havalimanı transferi (ek ücretli)',
        'Golf sahaları yakınlığı',
        'Günlük temizlik servisi',
        'Çamaşır ve ütü servisi'
      ],
      en: [
        '5 bedrooms (10 person capacity)',
        '250 m² private pool',
        '1000 m² garden',
        'BBQ and outdoor dining area',
        'Fully equipped kitchen',
        '4 bathrooms',
        'Central air conditioning system',
        'Smart home system',
        '24-hour security',
        'Free parking (3 cars)',
        'Private chef service (extra charge)',
        'Airport transfer (extra charge)',
        'Close to golf courses',
        'Daily cleaning service',
        'Laundry and ironing service'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Tüm Villa (5 Yatak Odası)',
          en: 'Entire Villa (5 Bedrooms)'
        },
        capacity: 10,
        price: 5000
      }
    ],
    rating: 4.9,
    reviewCount: 523,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    policies: {
      tr: [
        'Check-in: 15:00 / Check-out: 11:00',
        'Minimum konaklama: 3 gece',
        'İptal: 14 gün öncesine kadar ücretsiz',
        'Evcil hayvan: İzin verilmiyor',
        'Sigara: Sadece açık alanda',
        'Parti/etkinlik: İzin verilmiyor',
        'Çocuk: Tüm yaşlar hoş geldiniz',
        'Depozito: 5000 TL (check-out sonrası iade)'
      ],
      en: [
        'Check-in: 15:00 / Check-out: 11:00',
        'Minimum stay: 3 nights',
        'Cancellation: Free up to 14 days before',
        'Pets: Not allowed',
        'Smoking: Only outdoors',
        'Party/event: Not allowed',
        'Children: All ages welcome',
        'Deposit: 5000 TL (refunded after check-out)'
      ]
    },
    nearbyAttractions: [
      { name: 'Antalya Havalimanı', distance: '35 km' },
      { name: 'Regnum Carya Golf', distance: '2 km' },
      { name: 'Carya Golf Club', distance: '3 km' },
      { name: 'The Land of Legends', distance: '5 km' },
      { name: 'Belek Plajı', distance: '3 km' },
      { name: 'Troy Aqua & Dolphinarium', distance: '4 km' }
    ]
  },
  {
    id: 'kaleici-boutique',
    slug: 'kaleici-boutique-hotel',
    name: {
      tr: 'Kaleiçi Butik Otel',
      en: 'Kaleici Boutique Hotel'
    },
    description: {
      tr: 'Tarihi Kaleiçi\'nde butik otel',
      en: 'Boutique hotel in historic Kaleici'
    },
    longDescription: {
      tr: 'Antalya\'nın tarihi kalbi Kaleiçi\'nde, restore edilmiş Osmanlı konağında hizmet veren butik otelimiz, geçmişle geleceği harmanlayan benzersiz bir deneyim sunuyor. Dar taş sokaklar arasında, limanın ve denizin manzarasına karşı kahvaltınızı alın. 8 adet özenle dekore edilmiş odamız, her biri farklı bir hikaye anlatıyor.',
      en: 'Located in Kaleici, the historic heart of Antalya, our boutique hotel serving in a restored Ottoman mansion offers a unique experience that blends the past with the future. Have your breakfast overlooking the harbor and sea among narrow stone streets. Our 8 carefully decorated rooms each tell a different story.'
    },
    category: 'boutique',
    stars: 4,
    location: {
      region: 'Kaleiçi',
      address: {
        tr: 'Kaleiçi, Mermerli Sokak No:15, 07100 Muratpaşa/Antalya',
        en: 'Kaleici, Mermerli Street No:15, 07100 Muratpaşa/Antalya'
      },
      coordinates: {
        lat: 36.8841,
        lng: 30.7056
      }
    },
    pricing: {
      perNight: 2200,
      currency: 'TRY',
      seasonalPrices: {
        lowSeason: 1800,
        midSeason: 2200,
        highSeason: 2800
      }
    },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      tr: ['Kahvaltı Dahil', 'Teras', 'WiFi', 'Klima', 'Minibar', 'Kat Hizmetleri'],
      en: ['Breakfast Included', 'Terrace', 'WiFi', 'AC', 'Minibar', 'Concierge']
    },
    features: {
      tr: [
        'Restore edilmiş Osmanlı konağı',
        '8 özel tasarım oda',
        'Liman ve deniz manzaralı teras',
        'Organik Türk kahvaltısı',
        'Tarihi Kaleiçi konumu',
        'Yaya mesafesinde tarihi yerler',
        'Mermerli Plajı (100m)',
        'Hadrian Kapısı (200m)',
        'Yivli Minare (300m)',
        'Eski liman (150m)',
        'Kişiye özel konsiyerj hizmeti',
        'Tur ve transfer organizasyonu',
        'Restoran önerileri',
        'Çatı terası (sunset bar)'
      ],
      en: [
        'Restored Ottoman mansion',
        '8 uniquely designed rooms',
        'Harbor and sea view terrace',
        'Organic Turkish breakfast',
        'Historic Kaleici location',
        'Walking distance to historic sites',
        'Mermerli Beach (100m)',
        'Hadrian\'s Gate (200m)',
        'Yivli Minaret (300m)',
        'Old harbor (150m)',
        'Personal concierge service',
        'Tour and transfer organization',
        'Restaurant recommendations',
        'Rooftop terrace (sunset bar)'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Standart Oda (Bahçe Manzaralı)',
          en: 'Standard Room (Garden View)'
        },
        capacity: 2,
        price: 2200
      },
      {
        name: {
          tr: 'Deluxe Oda (Liman Manzaralı)',
          en: 'Deluxe Room (Harbor View)'
        },
        capacity: 2,
        price: 2800
      },
      {
        name: {
          tr: 'Suite (Deniz Manzaralı Balkonlu)',
          en: 'Suite (Sea View with Balcony)'
        },
        capacity: 2,
        price: 3500
      }
    ],
    rating: 4.7,
    reviewCount: 842,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: {
      tr: [
        'Check-in: 14:00 / Check-out: 12:00',
        'Sadece yetişkin (18+)',
        'İptal: 3 gün öncesine kadar ücretsiz',
        'Evcil hayvan: Küçük köpekler (5kg) kabul edilir',
        'Sigara: Sadece terasta',
        'Kahvaltı: 08:00-11:00',
        'Otopark: Yakında ücretli otopark (100m)'
      ],
      en: [
        'Check-in: 14:00 / Check-out: 12:00',
        'Adults only (18+)',
        'Cancellation: Free up to 3 days before',
        'Pets: Small dogs (5kg) accepted',
        'Smoking: Only on terrace',
        'Breakfast: 08:00-11:00',
        'Parking: Paid parking nearby (100m)'
      ]
    },
    nearbyAttractions: [
      { name: 'Mermerli Plajı', distance: '100 m' },
      { name: 'Hadrian Kapısı', distance: '200 m' },
      { name: 'Yivli Minare', distance: '300 m' },
      { name: 'Eski Liman', distance: '150 m' },
      { name: 'Antalya Müzesi', distance: '3 km' },
      { name: 'Düden Şelalesi', distance: '8 km' }
    ]
  },
  {
    id: 'lara-sea-view',
    slug: 'lara-sea-view-apartment',
    name: {
      tr: 'Lara Deniz Manzaralı Daire',
      en: 'Lara Sea View Apartment'
    },
    description: {
      tr: 'Panoramik deniz manzaralı daire',
      en: 'Panoramic sea view apartment'
    },
    longDescription: {
      tr: 'Lara\'nın en prestijli rezidanslarından birinde, 15. katta yer alan 2+1 lüks dairemiz, 180 derece deniz manzarası sunuyor. 120 m² kullanım alanı, geniş balkon, modern mutfak ve tam donanımlı yaşam alanı ile ev konforunda tatil. Rezidans içinde havuz, fitness, sauna ve market bulunmaktadır.',
      en: 'Our 2+1 luxury apartment located on the 15th floor in one of Lara\'s most prestigious residences offers 180-degree sea views. Home comfort vacation with 120 m² living space, large balcony, modern kitchen and fully equipped living area. Pool, fitness, sauna and market available in the residence.'
    },
    category: 'apartment',
    stars: 4,
    location: {
      region: 'Lara',
      address: {
        tr: 'Lara Residence, Fener Mah. 07230 Muratpaşa/Antalya',
        en: 'Lara Residence, Fener District 07230 Muratpaşa/Antalya'
      },
      coordinates: {
        lat: 36.8612,
        lng: 30.7923
      }
    },
    pricing: {
      perNight: 1800,
      currency: 'TRY',
      seasonalPrices: {
        lowSeason: 1500,
        midSeason: 1800,
        highSeason: 2500
      }
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      tr: ['Deniz Manzarası', 'Balkon', 'Tam Donanımlı Mutfak', 'WiFi', 'Klima', 'Otopark', 'Havuz', 'Fitness'],
      en: ['Sea View', 'Balcony', 'Fully Equipped Kitchen', 'WiFi', 'AC', 'Parking', 'Pool', 'Fitness']
    },
    features: {
      tr: [
        '2+1 daire (120 m²)',
        '180 derece deniz manzarası',
        '15. kat',
        'Geniş balkon (20 m²)',
        '2 yatak odası',
        'Master banyo + misafir WC',
        'Tam donanımlı mutfak',
        'Bulaşık makinesi',
        'Çamaşır makinesi',
        'Kurutma makinesi',
        'Akıllı TV (Netflix)',
        'Merkezi klima',
        'Kapalı otopark',
        'Rezidans havuzu',
        'Fitness center',
        'Sauna',
        'Market (rezidans içinde)',
        'Plaja 500m mesafe'
      ],
      en: [
        '2+1 apartment (120 m²)',
        '180-degree sea view',
        '15th floor',
        'Large balcony (20 m²)',
        '2 bedrooms',
        'Master bathroom + guest WC',
        'Fully equipped kitchen',
        'Dishwasher',
        'Washing machine',
        'Dryer',
        'Smart TV (Netflix)',
        'Central air conditioning',
        'Indoor parking',
        'Residence pool',
        'Fitness center',
        'Sauna',
        'Market (inside residence)',
        '500m to beach'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Tüm Daire (2+1)',
          en: 'Entire Apartment (2+1)'
        },
        capacity: 4,
        price: 1800
      }
    ],
    rating: 4.6,
    reviewCount: 315,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    policies: {
      tr: [
        'Check-in: 15:00 / Check-out: 11:00',
        'Minimum konaklama: 2 gece',
        'İptal: 5 gün öncesine kadar ücretsiz',
        'Evcil hayvan: İzin verilmiyor',
        'Sigara: Sadece balkonda',
        'Çocuk: Tüm yaşlar hoş geldiniz',
        'Maksimum: 4 kişi',
        'Depozito: 2000 TL'
      ],
      en: [
        'Check-in: 15:00 / Check-out: 11:00',
        'Minimum stay: 2 nights',
        'Cancellation: Free up to 5 days before',
        'Pets: Not allowed',
        'Smoking: Only on balcony',
        'Children: All ages welcome',
        'Maximum: 4 people',
        'Deposit: 2000 TL'
      ]
    },
    nearbyAttractions: [
      { name: 'Lara Plajı', distance: '500 m' },
      { name: 'MarkAntalya AVM', distance: '3 km' },
      { name: 'Antalya Aquarium', distance: '6 km' },
      { name: 'TerraCity AVM', distance: '5 km' },
      { name: 'Antalya Havalimanı', distance: '10 km' },
      { name: 'Düden Şelalesi', distance: '7 km' }
    ]
  }
];

export default antalyaHotels;
