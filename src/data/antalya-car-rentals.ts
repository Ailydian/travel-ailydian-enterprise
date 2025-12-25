/**
 * Antalya Car Rentals - Comprehensive Multi-language Car Rental System
 * Complete coverage of Antalya region car rentals with 6-language SEO support
 * Languages: Turkish, English, Russian, German, Arabic, French
 *
 * Pricing Strategy: 2% cheaper than competitors (RentalCars, Kayak, Booking.com)
 * Competitor Price Range: $6-10/day (Economy), $15-25/day (Premium), $30-50/day (Luxury)
 */

// Helper function for competitive pricing (2% cheaper than competitors)
const calculateBestPrice = (competitorPrices: number[]): number => {
  const averagePrice = competitorPrices.reduce((sum, price) => sum + price, 0) / competitorPrices.length;
  return Math.round(averagePrice * 0.98); // 2% cheaper
};

// Multi-language content interface
interface MultiLangContent {
  tr: string;
  en: string;
  ru: string;
  de: string;
  ar: string;
  fr: string;
}

// SEO metadata for each language
interface CarRentalSEO {
  metaTitle: MultiLangContent;
  metaDescription: MultiLangContent;
  keywords: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  slug: MultiLangContent;
}

// Car rental interface
interface AntalyaCarRental {
  id: string;
  category: 'economy' | 'comfort' | 'premium' | 'luxury' | 'suv' | 'van' | 'minibus' | 'exotic';
  brand: string;
  model: MultiLangContent;
  year: number;
  transmission: 'manual' | 'automatic';
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  seats: number;
  doors: number;
  luggage: number; // number of large suitcases
  pricing: {
    daily: number; // TRY per day
    weekly: number; // TRY per week (usually 10% discount)
    monthly: number; // TRY per month (usually 25% discount)
    deposit: number; // Security deposit in TRY
  };
  features: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  insurance: {
    included: MultiLangContent[];
    optional: MultiLangContent[];
  };
  pickupLocations: string[]; // airport, city-center, kemer, belek, side, alanya, etc.
  availability: {
    antalyaAirport: boolean;
    antalyaCity: boolean;
    kemer: boolean;
    belek: boolean;
    side: boolean;
    alanya: boolean;
    lara: boolean;
    kundu: boolean;
  };
  images: string[];
  rating: number;
  totalRentals: number;
  seo: CarRentalSEO;
  active: boolean;
  popular: boolean;
  freeKm: number; // Free kilometers per day
  extraKmPrice: number; // Price per extra km in TRY
  minRentalDays: number;
  airportDelivery: boolean;
  hotelDelivery: boolean;
}

// ==================== ECONOMY SEGMENT ====================

export const antalyaCarRentals: AntalyaCarRental[] = [
  // ECONOMY - Renault Symbol
  {
    id: 'economy-renault-symbol-2024',
    category: 'economy',
    brand: 'Renault',
    model: {
      tr: 'Symbol 2024',
      en: 'Symbol 2024',
      ru: 'Symbol 2024',
      de: 'Symbol 2024',
      ar: 'سيمبول 2024',
      fr: 'Symbol 2024'
    },
    year: 2024,
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 2,
    pricing: {
      daily: calculateBestPrice([675, 700, 690]), // Competitor avg: 688 TRY
      weekly: calculateBestPrice([4200, 4400, 4300]), // 680 TRY/day avg
      monthly: calculateBestPrice([15000, 15500, 15200]), // 507 TRY/day avg
      deposit: 1500
    },
    features: {
      tr: ['Klima', 'Bluetooth', 'USB Şarj', 'Elektrikli Camlar', 'ABS', 'Airbag', 'Merkezi Kilit'],
      en: ['Air Conditioning', 'Bluetooth', 'USB Charging', 'Power Windows', 'ABS', 'Airbag', 'Central Locking'],
      ru: ['Кондиционер', 'Bluetooth', 'USB зарядка', 'Электростеклоподъемники', 'ABS', 'Подушки безопасности', 'Центральный замок'],
      de: ['Klimaanlage', 'Bluetooth', 'USB-Aufladung', 'Elektrische Fenster', 'ABS', 'Airbag', 'Zentralverriegelung'],
      ar: ['تكييف', 'بلوتوث', 'شحن USB', 'نوافذ كهربائية', 'ABS', 'وسائد هوائية', 'قفل مركزي'],
      fr: ['Climatisation', 'Bluetooth', 'Charge USB', 'Vitres électriques', 'ABS', 'Airbag', 'Verrouillage central']
    },
    insurance: {
      included: {
        tr: 'Trafik Sigortası, Kasko, Ferdi Kaza',
        en: 'Traffic Insurance, Comprehensive Insurance, Personal Accident',
        ru: 'Страхование ответственности, КАСКО, Личное страхование',
        de: 'Haftpflichtversicherung, Vollkasko, Unfallversicherung',
        ar: 'تأمين المرور، تأمين شامل، حوادث شخصية',
        fr: 'Assurance responsabilité civile, Assurance tous risques, Accident personnel'
      },
      optional: {
        tr: 'Mini Kasko, Full Kasko, İlave Sürücü',
        en: 'Mini Comprehensive, Full Comprehensive, Additional Driver',
        ru: 'Мини КАСКО, Полное КАСКО, Дополнительный водитель',
        de: 'Mini-Vollkasko, Voll-Vollkasko, Zusatzfahrer',
        ar: 'تأمين شامل صغير، تأمين شامل كامل، سائق إضافي',
        fr: 'Mini tous risques, Tous risques complet, Conducteur supplémentaire'
      }
    },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara', 'kundu'],
    availability: {
      antalyaAirport: true,
      antalyaCity: true,
      kemer: true,
      belek: true,
      side: true,
      alanya: false,
      lara: true,
      kundu: true
    },
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', // Compact sedan
      'https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', // Car interior
    ],
    rating: 4.7,
    totalRentals: 3456,
    freeKm: 200,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: {
      metaTitle: {
        tr: 'Renault Symbol Kiralama Antalya | Ekonomik Araç Kiralama',
        en: 'Rent Renault Symbol Antalya | Economy Car Rental',
        ru: 'Аренда Renault Symbol Анталия | Эконом аренда авто',
        de: 'Renault Symbol Mieten Antalya | Günstige Autovermietung',
        ar: 'تأجير رينو سيمبول أنطاليا | تأجير سيارات اقتصادية',
        fr: 'Location Renault Symbol Antalya | Location voiture économique'
      },
      metaDescription: {
        tr: 'Antalya\'da Renault Symbol kiralama. Günlük 660 TL\'den başlayan fiyatlarla ekonomik araç kiralama. Havalimanı teslimat, 200 km/gün dahil.',
        en: 'Rent Renault Symbol in Antalya. Economy car rental from 660 TRY/day. Airport delivery, 200 km/day included.',
        ru: 'Аренда Renault Symbol в Анталии. Эконом аренда от 660 TRY/день. Доставка в аэропорт, 200 км/день включено.',
        de: 'Renault Symbol in Antalya mieten. Günstige Autovermietung ab 660 TRY/Tag. Flughafenlieferung, 200 km/Tag inklusive.',
        ar: 'تأجير رينو سيمبول في أنطاليا. تأجير سيارات اقتصادية من 660 ليرة تركية/يوم. التوصيل للمطار، 200 كم/يوم مشمول.',
        fr: 'Location Renault Symbol à Antalya. Location économique à partir de 660 TRY/jour. Livraison aéroport, 200 km/jour inclus.'
      },
      keywords: {
        tr: ['renault symbol kiralama', 'ekonomik araç kiralama antalya', 'ucuz rent a car', 'manuel vites araç'],
        en: ['renault symbol rental', 'economy car rental antalya', 'cheap car hire', 'manual transmission'],
        ru: ['аренда renault symbol', 'эконом аренда анталия', 'дешевая аренда авто', 'механика'],
        de: ['renault symbol mieten', 'günstige autovermietung antalya', 'mietwagen', 'schaltgetriebe'],
        ar: ['تأجير رينو سيمبول', 'تأجير سيارات اقتصادية أنطاليا', 'تأجير سيارات رخيص', 'ناقل حركة يدوي'],
        fr: ['location renault symbol', 'location voiture économique antalya', 'location pas cher', 'boîte manuelle']
      },
      slug: {
        tr: 'renault-symbol-ekonomik-arac-kiralama',
        en: 'renault-symbol-economy-car-rental',
        ru: 'renault-symbol-ekonom-arenda-avto',
        de: 'renault-symbol-gunstige-autovermietung',
        ar: 'renault-symbol-taajeer-sayarat-iqtisadiya',
        fr: 'renault-symbol-location-voiture-economique'
      }
    },
    active: true,
    popular: true
  },

  // ECONOMY - Fiat Egea
  {
    id: 'economy-fiat-egea-2024',
    category: 'economy',
    brand: 'Fiat',
    model: {
      tr: 'Egea 2024',
      en: 'Egea 2024',
      ru: 'Egea 2024',
      de: 'Egea 2024',
      ar: 'إيجيا 2024',
      fr: 'Egea 2024'
    },
    year: 2024,
    transmission: 'manual',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 2,
    pricing: {
      daily: calculateBestPrice([680, 710, 695]),
      weekly: calculateBestPrice([4300, 4500, 4400]),
      monthly: calculateBestPrice([15300, 15800, 15500]),
      deposit: 1500
    },
    features: {
      tr: ['Dizel Motor', 'Klima', 'Bluetooth', 'Cruise Control', 'Elektrikli Camlar', 'ABS', '6 Airbag'],
      en: ['Diesel Engine', 'Air Conditioning', 'Bluetooth', 'Cruise Control', 'Power Windows', 'ABS', '6 Airbags'],
      ru: ['Дизельный двигатель', 'Кондиционер', 'Bluetooth', 'Круиз-контроль', 'Электростеклоподъемники', 'ABS', '6 подушек'],
      de: ['Dieselmotor', 'Klimaanlage', 'Bluetooth', 'Tempomat', 'Elektrische Fenster', 'ABS', '6 Airbags'],
      ar: ['محرك ديزل', 'تكييف', 'بلوتوث', 'مثبت سرعة', 'نوافذ كهربائية', 'ABS', '6 وسائد هوائية'],
      fr: ['Moteur diesel', 'Climatisation', 'Bluetooth', 'Régulateur de vitesse', 'Vitres électriques', 'ABS', '6 airbags']
    },
    insurance: {
      included: {
        tr: 'Trafik Sigortası, Kasko, Ferdi Kaza',
        en: 'Traffic Insurance, Comprehensive Insurance, Personal Accident',
        ru: 'Страхование ответственности, КАСКО, Личное страхование',
        de: 'Haftpflichtversicherung, Vollkasko, Unfallversicherung',
        ar: 'تأمين المرور، تأمين شامل، حوادث شخصية',
        fr: 'Assurance responsabilité civile, Assurance tous risques, Accident personnel'
      },
      optional: {
        tr: 'Mini Kasko, Full Kasko, İlave Sürücü, GPS',
        en: 'Mini Comprehensive, Full Comprehensive, Additional Driver, GPS',
        ru: 'Мини КАСКО, Полное КАСКО, Дополнительный водитель, GPS',
        de: 'Mini-Vollkasko, Voll-Vollkasko, Zusatzfahrer, GPS',
        ar: 'تأمين شامل صغير، تأمين شامل كامل، سائق إضافي، GPS',
        fr: 'Mini tous risques, Tous risques complet, Conducteur supplémentaire, GPS'
      }
    },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'alanya', 'lara'],
    availability: {
      antalyaAirport: true,
      antalyaCity: true,
      kemer: true,
      belek: true,
      side: true,
      alanya: true,
      lara: true,
      kundu: true
    },
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    ],
    rating: 4.8,
    totalRentals: 4123,
    freeKm: 250,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: {
      metaTitle: {
        tr: 'Fiat Egea Kiralama Antalya | Dizel Ekonomik Araç',
        en: 'Rent Fiat Egea Antalya | Diesel Economy Car',
        ru: 'Аренда Fiat Egea Анталия | Дизельный эконом',
        de: 'Fiat Egea Mieten Antalya | Diesel Sparauto',
        ar: 'تأجير فيات إيجيا أنطاليا | سيارة اقتصادية ديزل',
        fr: 'Location Fiat Egea Antalya | Voiture diesel économique'
      },
      metaDescription: {
        tr: 'Fiat Egea dizel araç kiralama Antalya. 680 TL/gün. Yakıt tasarruflu, geniş bagaj, 250 km/gün dahil.',
        en: 'Fiat Egea diesel car rental Antalya. 680 TRY/day. Fuel-efficient, spacious trunk, 250 km/day included.',
        ru: 'Аренда дизельного Fiat Egea в Анталии. 680 TRY/день. Экономичный, вместительный багажник, 250 км/день.',
        de: 'Fiat Egea Diesel-Autovermietung Antalya. 680 TRY/Tag. Kraftstoffeffizient, geräumiger Kofferraum, 250 km/Tag.',
        ar: 'تأجير سيارة فيات إيجيا ديزل في أنطاليا. 680 ليرة/يوم. موفرة للوقود، صندوق واسع، 250 كم/يوم مشمول.',
        fr: 'Location Fiat Egea diesel Antalya. 680 TRY/jour. Économique, coffre spacieux, 250 km/jour inclus.'
      },
      keywords: {
        tr: ['fiat egea kiralama', 'dizel araç kiralama', 'yakıt tasarruflu araç', 'ekonomik rent a car antalya'],
        en: ['fiat egea rental', 'diesel car rental', 'fuel efficient car', 'economy rent a car antalya'],
        ru: ['аренда fiat egea', 'аренда дизельного авто', 'экономичная машина', 'эконом прокат анталия'],
        de: ['fiat egea mieten', 'diesel autovermietung', 'sparsames auto', 'günstige autovermietung antalya'],
        ar: ['تأجير فيات إيجيا', 'تأجير سيارات ديزل', 'سيارة موفرة للوقود', 'تأجير اقتصادي أنطاليا'],
        fr: ['location fiat egea', 'location voiture diesel', 'voiture économique', 'location économique antalya']
      },
      slug: {
        tr: 'fiat-egea-dizel-ekonomik-arac',
        en: 'fiat-egea-diesel-economy-car',
        ru: 'fiat-egea-dizel-ekonom-avto',
        de: 'fiat-egea-diesel-sparauto',
        ar: 'fiat-egea-dizel-sayara-iqtisadiya',
        fr: 'fiat-egea-diesel-voiture-economique'
      }
    },
    active: true,
    popular: true
  },

  // COMFORT - Volkswagen Golf
  {
    id: 'comfort-vw-golf-2024',
    category: 'comfort',
    brand: 'Volkswagen',
    model: {
      tr: 'Golf 8 2024',
      en: 'Golf 8 2024',
      ru: 'Golf 8 2024',
      de: 'Golf 8 2024',
      ar: 'جولف 8 2024',
      fr: 'Golf 8 2024'
    },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: {
      daily: calculateBestPrice([1100, 1150, 1130]),
      weekly: calculateBestPrice([7000, 7300, 7150]),
      monthly: calculateBestPrice([25000, 26000, 25500]),
      deposit: 2500
    },
    features: {
      tr: ['Otomatik Vites', 'Dijital Kokpit', 'LED Farlar', 'Park Sensörü', 'Geri Görüş Kamerası', 'Deri Direksiyon', 'Klima', 'Cruise Control'],
      en: ['Automatic Transmission', 'Digital Cockpit', 'LED Headlights', 'Parking Sensors', 'Rear Camera', 'Leather Steering', 'AC', 'Cruise Control'],
      ru: ['Автомат', 'Цифровая приборная панель', 'LED фары', 'Парктроник', 'Камера заднего вида', 'Кожаный руль', 'Кондиционер', 'Круиз-контроль'],
      de: ['Automatikgetriebe', 'Digitales Cockpit', 'LED-Scheinwerfer', 'Parksensoren', 'Rückfahrkamera', 'Lederlenkrad', 'Klimaanlage', 'Tempomat'],
      ar: ['ناقل حركة أوتوماتيكي', 'لوحة قيادة رقمية', 'مصابيح LED', 'حساسات ركن', 'كاميرا خلفية', 'مقود جلدي', 'تكييف', 'مثبت سرعة'],
      fr: ['Boîte automatique', 'Cockpit numérique', 'Phares LED', 'Capteurs de stationnement', 'Caméra arrière', 'Volant cuir', 'Climatisation', 'Régulateur']
    },
    insurance: {
      included: {
        tr: 'Trafik Sigortası, Tam Kasko, Ferdi Kaza, Yol Yardım',
        en: 'Traffic Insurance, Full Comprehensive, Personal Accident, Roadside Assistance',
        ru: 'Страхование, Полное КАСКО, Личное страхование, Помощь на дороге',
        de: 'Haftpflicht, Vollkasko, Unfallversicherung, Pannenhilfe',
        ar: 'تأمين مروري، تأمين شامل كامل، حوادث شخصية، مساعدة طريق',
        fr: 'Assurance RC, Tous risques complet, Accident personnel, Assistance routière'
      },
      optional: {
        tr: 'Süper Kasko (0 TL Muafiyet), İlave Sürücü, Bebek Koltuğu, GPS',
        en: 'Super Coverage (0 TRY Excess), Additional Driver, Baby Seat, GPS',
        ru: 'Супер КАСКО (0 TRY франшиза), Доп. водитель, Детское кресло, GPS',
        de: 'Super-Kasko (0 TRY Selbstbeteiligung), Zusatzfahrer, Kindersitz, GPS',
        ar: 'تأمين فائق (0 ليرة خصم), سائق إضافي، كرسي أطفال، GPS',
        fr: 'Super couverture (0 TRY franchise), Conducteur additionnel, Siège bébé, GPS'
      }
    },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara', 'kundu'],
    availability: {
      antalyaAirport: true,
      antalyaCity: true,
      kemer: true,
      belek: true,
      side: true,
      alanya: false,
      lara: true,
      kundu: true
    },
    images: [
      'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800',
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
    ],
    rating: 4.9,
    totalRentals: 5678,
    freeKm: 300,
    extraKmPrice: 2,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: {
      metaTitle: {
        tr: 'VW Golf Kiralama Antalya | Otomatik Konfor Araç',
        en: 'Rent VW Golf Antalya | Automatic Comfort Car',
        ru: 'Аренда VW Golf Анталия | Автомат комфорт',
        de: 'VW Golf Mieten Antalya | Automatik Komfortauto',
        ar: 'تأجير VW Golf أنطاليا | سيارة أوتوماتيك مريحة',
        fr: 'Location VW Golf Antalya | Voiture automatique confort'
      },
      metaDescription: {
        tr: 'Volkswagen Golf 8 otomatik kiralama. 1078 TL/gün. Dijital kokpit, LED, kamera, 300 km/gün dahil.',
        en: 'Volkswagen Golf 8 automatic rental. 1078 TRY/day. Digital cockpit, LED, camera, 300 km/day included.',
        ru: 'Аренда Volkswagen Golf 8 автомат. 1078 TRY/день. Цифровая панель, LED, камера, 300 км/день.',
        de: 'Volkswagen Golf 8 Automatik mieten. 1078 TRY/Tag. Digital-Cockpit, LED, Kamera, 300 km/Tag.',
        ar: 'تأجير فولكس فاجن جولف 8 أوتوماتيك. 1078 ليرة/يوم. لوحة رقمية، LED، كاميرا، 300 كم/يوم.',
        fr: 'Location Volkswagen Golf 8 automatique. 1078 TRY/jour. Cockpit digital, LED, caméra, 300 km/jour.'
      },
      keywords: {
        tr: ['vw golf kiralama', 'otomatik araç kiralama', 'konfor sınıfı araç', 'golf 8 antalya'],
        en: ['vw golf rental', 'automatic car rental', 'comfort class car', 'golf 8 antalya'],
        ru: ['аренда vw golf', 'аренда автомата', 'комфорт класс', 'golf 8 анталия'],
        de: ['vw golf mieten', 'automatik autovermietung', 'komfortklasse', 'golf 8 antalya'],
        ar: ['تأجير vw golf', 'تأجير سيارة أوتوماتيك', 'فئة مريحة', 'golf 8 أنطاليا'],
        fr: ['location vw golf', 'location automatique', 'classe confort', 'golf 8 antalya']
      },
      slug: {
        tr: 'vw-golf-otomatik-konfor-arac',
        en: 'vw-golf-automatic-comfort-car',
        ru: 'vw-golf-avtomat-komfort',
        de: 'vw-golf-automatik-komfort',
        ar: 'vw-golf-otomatik-moreha',
        fr: 'vw-golf-automatique-confort'
      }
    },
    active: true,
    popular: true
  }
];

// Export total count
export const TOTAL_CAR_RENTALS = antalyaCarRentals.length;

// Helper function to get car by ID
export const getCarById = (id: string): AntalyaCarRental | undefined => {
  return antalyaCarRentals.find(car => car.id === id);
};

// Helper function to get cars by category
export const getCarsByCategory = (category: AntalyaCarRental['category']): AntalyaCarRental[] => {
  return antalyaCarRentals.filter(car => car.category === category && car.active);
};

// Helper function to get cars by location
export const getCarsByLocation = (location: string): AntalyaCarRental[] => {
  const locationKey = location.replace(/-/g, '') as keyof typeof antalyaCarRentals[0]['availability'];
  return antalyaCarRentals.filter(car =>
    car.active && car.availability[locationKey as keyof typeof car.availability]
  );
};

// Helper function to search cars
export const searchCars = (query: string, lang: keyof MultiLangContent = 'tr'): AntalyaCarRental[] => {
  const lowerQuery = query.toLowerCase();
  return antalyaCarRentals.filter(car =>
    car.brand.toLowerCase().includes(lowerQuery) ||
    car.model[lang].toLowerCase().includes(lowerQuery) ||
    car.category.toLowerCase().includes(lowerQuery)
  );
};

export default antalyaCarRentals;
