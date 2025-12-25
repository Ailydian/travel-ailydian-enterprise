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
  },

  // ==================== ADDITIONAL ECONOMY SEGMENT ====================

  // ECONOMY - Toyota Corolla
  {
    id: 'economy-toyota-corolla-2024',
    category: 'economy',
    brand: 'Toyota',
    model: {
      tr: 'Corolla 2024',
      en: 'Corolla 2024',
      ru: 'Corolla 2024',
      de: 'Corolla 2024',
      ar: 'كورولا 2024',
      fr: 'Corolla 2024'
    },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 2,
    pricing: {
      daily: calculateBestPrice([750, 780, 765]),
      weekly: calculateBestPrice([4800, 5000, 4900]),
      monthly: calculateBestPrice([17000, 17500, 17200]),
      deposit: 2000
    },
    features: {
      tr: ['Hibrit Motor', 'Otomatik Vites', 'Toyota Safety Sense', 'Adaptif Cruise', 'LED Farlar', 'Lane Assist', 'Klima', 'Yakıt Tasarruflu'],
      en: ['Hybrid Engine', 'Automatic Trans', 'Toyota Safety Sense', 'Adaptive Cruise', 'LED Lights', 'Lane Assist', 'AC', 'Fuel Efficient'],
      ru: ['Гибрид', 'Автомат', 'Toyota Safety Sense', 'Адаптивный круиз', 'LED фары', 'Ассистент полосы', 'Кондиционер', 'Экономичный'],
      de: ['Hybridmotor', 'Automatik', 'Toyota Safety Sense', 'Adaptiver Tempomat', 'LED-Lichter', 'Spurassistent', 'Klimaanlage', 'Sparsam'],
      ar: ['محرك هجين', 'أوتوماتيك', 'Toyota Safety Sense', 'مثبت سرعة تكيفي', 'LED', 'مساعد مسار', 'تكييف', 'موفر للوقود'],
      fr: ['Moteur hybride', 'Automatique', 'Toyota Safety Sense', 'Régulateur adaptatif', 'LED', 'Assistance voie', 'Climatisation', 'Économique']
    },
    insurance: {
      included: {
        tr: 'Trafik Sigortası, Tam Kasko, Ferdi Kaza, Yol Yardım',
        en: 'Traffic Insurance, Full Comprehensive, Personal Accident, Roadside Assistance',
        ru: 'Страхование, Полное КАСКО, Личное страхование, Помощь на дороге',
        de: 'Haftpflicht, Vollkasko, Unfallversicherung, Pannenhilfe',
        ar: 'تأمين مروري، تأمين شامل، حوادث شخصية، مساعدة طريق',
        fr: 'Assurance RC, Tous risques complet, Accident personnel, Assistance'
      },
      optional: {
        tr: 'Süper Kasko, İlave Sürücü, GPS, Bebek Koltuğu',
        en: 'Super Coverage, Additional Driver, GPS, Child Seat',
        ru: 'Супер КАСКО, Доп. водитель, GPS, Детское кресло',
        de: 'Super-Kasko, Zusatzfahrer, GPS, Kindersitz',
        ar: 'تأمين فائق، سائق إضافي، GPS، كرسي أطفال',
        fr: 'Super couverture, Conducteur additionnel, GPS, Siège enfant'
      }
    },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'alanya', 'lara', 'kundu'],
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
      'https://images.unsplash.com/photo-1623869675781-80aa31baa6db?w=800',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    ],
    rating: 4.9,
    totalRentals: 6234,
    freeKm: 250,
    extraKmPrice: 1.8,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: {
      metaTitle: {
        tr: 'Toyota Corolla Hybrid Kiralama Antalya | Otomatik Hibrit',
        en: 'Rent Toyota Corolla Hybrid Antalya | Automatic Hybrid',
        ru: 'Аренда Toyota Corolla Hybrid Анталия | Автомат гибрид',
        de: 'Toyota Corolla Hybrid Mieten Antalya | Automatik Hybrid',
        ar: 'تأجير تويوتا كورولا هايبرد أنطاليا | هجين أوتوماتيك',
        fr: 'Location Toyota Corolla Hybrid Antalya | Automatique hybride'
      },
      metaDescription: {
        tr: 'Toyota Corolla Hybrid otomatik kiralama. 735 TL/gün. Yakıt tasarruflu, Toyota Safety Sense, 250 km/gün.',
        en: 'Toyota Corolla Hybrid automatic rental. 735 TRY/day. Fuel efficient, Toyota Safety Sense, 250 km/day.',
        ru: 'Аренда Toyota Corolla Hybrid автомат. 735 TRY/день. Экономичный, Toyota Safety Sense, 250 км/день.',
        de: 'Toyota Corolla Hybrid Automatik mieten. 735 TRY/Tag. Sparsam, Toyota Safety Sense, 250 km/Tag.',
        ar: 'تأجير تويوتا كورولا هايبرد أوتوماتيك. 735 ليرة/يوم. موفر للوقود، Toyota Safety Sense، 250 كم/يوم.',
        fr: 'Location Toyota Corolla Hybrid automatique. 735 TRY/jour. Économique, Toyota Safety Sense, 250 km/jour.'
      },
      keywords: {
        tr: ['toyota corolla kiralama', 'hibrit araç kiralama', 'otomatik ekonomik', 'yakıt tasarruflu araç antalya'],
        en: ['toyota corolla rental', 'hybrid car rental', 'automatic economy', 'fuel efficient car antalya'],
        ru: ['аренда toyota corolla', 'аренда гибрида', 'автомат эконом', 'экономичная машина анталия'],
        de: ['toyota corolla mieten', 'hybrid autovermietung', 'automatik sparsam', 'kraftstoffsparen antalya'],
        ar: ['تأجير تويوتا كورولا', 'تأجير هجين', 'أوتوماتيك اقتصادي', 'موفر وقود أنطاليا'],
        fr: ['location toyota corolla', 'location hybride', 'automatique économique', 'économe carburant antalya']
      },
      slug: {
        tr: 'toyota-corolla-hybrid-otomatik',
        en: 'toyota-corolla-hybrid-automatic',
        ru: 'toyota-corolla-hybrid-avtomat',
        de: 'toyota-corolla-hybrid-automatik',
        ar: 'toyota-corolla-hybrid-otomatik',
        fr: 'toyota-corolla-hybrid-automatique'
      }
    },
    active: true,
    popular: true
  },

  // ECONOMY - Hyundai Accent
  {
    id: 'economy-hyundai-accent-2024',
    category: 'economy',
    brand: 'Hyundai',
    model: {
      tr: 'Accent Blue 2024',
      en: 'Accent Blue 2024',
      ru: 'Accent Blue 2024',
      de: 'Accent Blue 2024',
      ar: 'أكسنت بلو 2024',
      fr: 'Accent Blue 2024'
    },
    year: 2024,
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 2,
    pricing: {
      daily: calculateBestPrice([665, 690, 675]),
      weekly: calculateBestPrice([4150, 4350, 4250]),
      monthly: calculateBestPrice([14800, 15300, 15000]),
      deposit: 1500
    },
    features: {
      tr: ['Manuel Vites', 'Klima', 'Bluetooth', 'USB', 'ABS', 'ESP', '4 Airbag', 'Elektrikli Camlar'],
      en: ['Manual Transmission', 'AC', 'Bluetooth', 'USB', 'ABS', 'ESP', '4 Airbags', 'Power Windows'],
      ru: ['Механика', 'Кондиционер', 'Bluetooth', 'USB', 'ABS', 'ESP', '4 подушки', 'Электростеклоподъемники'],
      de: ['Schaltgetriebe', 'Klimaanlage', 'Bluetooth', 'USB', 'ABS', 'ESP', '4 Airbags', 'Elektrische Fenster'],
      ar: ['يدوي', 'تكييف', 'بلوتوث', 'USB', 'ABS', 'ESP', '4 وسائد', 'نوافذ كهربائية'],
      fr: ['Boîte manuelle', 'Climatisation', 'Bluetooth', 'USB', 'ABS', 'ESP', '4 airbags', 'Vitres électriques']
    },
    insurance: {
      included: {
        tr: 'Trafik Sigortası, Kasko, Ferdi Kaza',
        en: 'Traffic Insurance, Comprehensive, Personal Accident',
        ru: 'Страхование, КАСКО, Личное страхование',
        de: 'Haftpflicht, Vollkasko, Unfallversicherung',
        ar: 'تأمين مروري، شامل، حوادث شخصية',
        fr: 'Assurance RC, Tous risques, Accident personnel'
      },
      optional: {
        tr: 'Full Kasko, İlave Sürücü, GPS',
        en: 'Full Coverage, Additional Driver, GPS',
        ru: 'Полное КАСКО, Доп. водитель, GPS',
        de: 'Vollkasko, Zusatzfahrer, GPS',
        ar: 'تأمين كامل، سائق إضافي، GPS',
        fr: 'Couverture complète, Conducteur additionnel, GPS'
      }
    },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: {
      antalyaAirport: true,
      antalyaCity: true,
      kemer: true,
      belek: true,
      side: true,
      alanya: false,
      lara: true,
      kundu: false
    },
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      'https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800',
    ],
    rating: 4.6,
    totalRentals: 2876,
    freeKm: 200,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: {
      metaTitle: {
        tr: 'Hyundai Accent Kiralama Antalya | En Ucuz Araç Kiralama',
        en: 'Rent Hyundai Accent Antalya | Cheapest Car Rental',
        ru: 'Аренда Hyundai Accent Анталия | Самая дешевая аренда',
        de: 'Hyundai Accent Mieten Antalya | Günstigste Autovermietung',
        ar: 'تأجير هيونداي أكسنت أنطاليا | أرخص تأجير سيارات',
        fr: 'Location Hyundai Accent Antalya | Location la moins chère'
      },
      metaDescription: {
        tr: 'Hyundai Accent en ucuz araç kiralama. 650 TL/gün. Ekonomik, güvenilir, havalimanı teslimat.',
        en: 'Hyundai Accent cheapest car rental. 650 TRY/day. Economic, reliable, airport delivery.',
        ru: 'Hyundai Accent самая дешевая аренда. 650 TRY/день. Экономичный, надежный, доставка в аэропорт.',
        de: 'Hyundai Accent günstigste Autovermietung. 650 TRY/Tag. Wirtschaftlich, zuverlässig, Flughafenlieferung.',
        ar: 'هيونداي أكسنت أرخص تأجير سيارات. 650 ليرة/يوم. اقتصادي، موثوق، توصيل مطار.',
        fr: 'Hyundai Accent location la moins chère. 650 TRY/jour. Économique, fiable, livraison aéroport.'
      },
      keywords: {
        tr: ['hyundai accent kiralama', 'en ucuz araç kiralama', 'ekonomik rent a car', 'uygun fiyatlı araç antalya'],
        en: ['hyundai accent rental', 'cheapest car rental', 'budget car hire', 'affordable car antalya'],
        ru: ['аренда hyundai accent', 'самая дешевая аренда', 'бюджетный прокат', 'доступная машина анталия'],
        de: ['hyundai accent mieten', 'günstigste autovermietung', 'budget mietwagen', 'preiswertes auto antalya'],
        ar: ['تأجير هيونداي أكسنت', 'أرخص تأجير', 'تأجير ميزانية', 'سيارة معقولة أنطاليا'],
        fr: ['location hyundai accent', 'location moins chère', 'location budget', 'voiture abordable antalya']
      },
      slug: {
        tr: 'hyundai-accent-ucuz-ekonomik',
        en: 'hyundai-accent-cheap-economy',
        ru: 'hyundai-accent-deshevaya-ekonom',
        de: 'hyundai-accent-gunstig-wirtschaftlich',
        ar: 'hyundai-accent-rakhis-iqtisadi',
        fr: 'hyundai-accent-pas-cher-economique'
      }
    },
    active: true,
    popular: true
  },

  // ==================== ADDITIONAL 45 VEHICLES FOR PRODUCTION ====================

  {
    id: 'economy-opel-corsa-2024',
    category: 'economy',
    brand: 'Opel',
    model: { tr: 'Corsa 2024', en: 'Corsa 2024', ru: 'Corsa 2024', de: 'Corsa 2024', ar: 'Corsa 2024', fr: 'Corsa 2024' },
    year: 2024,
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    luggage: 2,
    pricing: { daily: calculateBestPrice([670, 695, 682]), weekly: calculateBestPrice([4250, 4450, 4350]), monthly: calculateBestPrice([15100, 15600, 15350]), deposit: 1500 },
    features: { tr: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], en: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], ru: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], de: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], ar: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], fr: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 3200,
    freeKm: 200,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Opel Corsa Kiralama Antalya', en: 'Rent Opel Corsa Antalya', ru: 'Аренда Opel Corsa Анталия', de: 'Opel Corsa Mieten Antalya', ar: 'تأجير Opel Corsa أنطاليا', fr: 'Location Opel Corsa Antalya' }, metaDescription: { tr: 'Opel Corsa araç kiralama Antalya', en: 'Opel Corsa car rental Antalya', ru: 'Аренда Opel Corsa Анталия', de: 'Opel Corsa Autovermietung Antalya', ar: 'تأجير Opel Corsa أنطاليا', fr: 'Location Opel Corsa Antalya' }, keywords: { tr: ['opel kiralama'], en: ['opel rental'], ru: ['аренда opel'], de: ['opel mieten'], ar: ['تأجير opel'], fr: ['location opel'] }, slug: { tr: 'opel-corsa-economy', en: 'opel-corsa-economy', ru: 'opel-corsa-economy', de: 'opel-corsa-economy', ar: 'opel-corsa-economy', fr: 'opel-corsa-economy' } },
    active: true,
    popular: false
  }
,

  {
    id: 'economy-peugeot-301-2024',
    category: 'economy',
    brand: 'Peugeot',
    model: { tr: '301 2024', en: '301 2024', ru: '301 2024', de: '301 2024', ar: '301 2024', fr: '301 2024' },
    year: 2024,
    transmission: 'manual',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 2,
    pricing: { daily: calculateBestPrice([685, 710, 695]), weekly: calculateBestPrice([4350, 4550, 4450]), monthly: calculateBestPrice([15400, 15900, 15650]), deposit: 1600 },
    features: { tr: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], en: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], ru: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], de: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], ar: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'], fr: ['Klima', 'Bluetooth', 'ABS', 'ESP', 'Airbag'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.6,
    totalRentals: 2980,
    freeKm: 220,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Peugeot 301 Kiralama Antalya', en: 'Rent Peugeot 301 Antalya', ru: 'Аренда Peugeot 301 Анталия', de: 'Peugeot 301 Mieten Antalya', ar: 'تأجير Peugeot 301 أنطاليا', fr: 'Location Peugeot 301 Antalya' }, metaDescription: { tr: 'Peugeot 301 araç kiralama Antalya', en: 'Peugeot 301 car rental Antalya', ru: 'Аренда Peugeot 301 Анталия', de: 'Peugeot 301 Autovermietung Antalya', ar: 'تأجير Peugeot 301 أنطاليا', fr: 'Location Peugeot 301 Antalya' }, keywords: { tr: ['peugeot kiralama'], en: ['peugeot rental'], ru: ['аренда peugeot'], de: ['peugeot mieten'], ar: ['تأجير peugeot'], fr: ['location peugeot'] }, slug: { tr: 'peugeot-301-economy', en: 'peugeot-301-economy', ru: 'peugeot-301-economy', de: 'peugeot-301-economy', ar: 'peugeot-301-economy', fr: 'peugeot-301-economy' } },
    active: true,
    popular: false
  }
,

  {
    id: 'comfort-mazda-6-2024',
    category: 'comfort',
    brand: 'Mazda',
    model: { tr: '6 2024', en: '6 2024', ru: '6 2024', de: '6 2024', ar: '6 2024', fr: '6 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1150, 1190, 1170]), weekly: calculateBestPrice([7300, 7600, 7450]), monthly: calculateBestPrice([26200, 27200, 26700]), deposit: 2600 },
    features: { tr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], en: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ru: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], de: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ar: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], fr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 4100,
    freeKm: 320,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mazda 6 Kiralama Antalya', en: 'Rent Mazda 6 Antalya', ru: 'Аренда Mazda 6 Анталия', de: 'Mazda 6 Mieten Antalya', ar: 'تأجير Mazda 6 أنطاليا', fr: 'Location Mazda 6 Antalya' }, metaDescription: { tr: 'Mazda 6 araç kiralama Antalya', en: 'Mazda 6 car rental Antalya', ru: 'Аренда Mazda 6 Анталия', de: 'Mazda 6 Autovermietung Antalya', ar: 'تأجير Mazda 6 أنطاليا', fr: 'Location Mazda 6 Antalya' }, keywords: { tr: ['mazda kiralama'], en: ['mazda rental'], ru: ['аренда mazda'], de: ['mazda mieten'], ar: ['تأجير mazda'], fr: ['location mazda'] }, slug: { tr: 'mazda-6-comfort', en: 'mazda-6-comfort', ru: 'mazda-6-comfort', de: 'mazda-6-comfort', ar: 'mazda-6-comfort', fr: 'mazda-6-comfort' } },
    active: true,
    popular: true
  }
,

  {
    id: 'comfort-toyota-camry-2024',
    category: 'comfort',
    brand: 'Toyota',
    model: { tr: 'Camry 2024', en: 'Camry 2024', ru: 'Camry 2024', de: 'Camry 2024', ar: 'Camry 2024', fr: 'Camry 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1180, 1220, 1200]), weekly: calculateBestPrice([7500, 7800, 7650]), monthly: calculateBestPrice([27000, 28000, 27500]), deposit: 3000 },
    features: { tr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], en: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ru: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], de: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ar: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], fr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 4567,
    freeKm: 350,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Toyota Camry Kiralama Antalya', en: 'Rent Toyota Camry Antalya', ru: 'Аренда Toyota Camry Анталия', de: 'Toyota Camry Mieten Antalya', ar: 'تأجير Toyota Camry أنطاليا', fr: 'Location Toyota Camry Antalya' }, metaDescription: { tr: 'Toyota Camry araç kiralama Antalya', en: 'Toyota Camry car rental Antalya', ru: 'Аренда Toyota Camry Анталия', de: 'Toyota Camry Autovermietung Antalya', ar: 'تأجير Toyota Camry أنطاليا', fr: 'Location Toyota Camry Antalya' }, keywords: { tr: ['toyota kiralama'], en: ['toyota rental'], ru: ['аренда toyota'], de: ['toyota mieten'], ar: ['تأجير toyota'], fr: ['location toyota'] }, slug: { tr: 'toyota-camry-comfort', en: 'toyota-camry-comfort', ru: 'toyota-camry-comfort', de: 'toyota-camry-comfort', ar: 'toyota-camry-comfort', fr: 'toyota-camry-comfort' } },
    active: true,
    popular: true
  }
,

  {
    id: 'comfort-honda-accord-2024',
    category: 'comfort',
    brand: 'Honda',
    model: { tr: 'Accord 2024', en: 'Accord 2024', ru: 'Accord 2024', de: 'Accord 2024', ar: 'Accord 2024', fr: 'Accord 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1140, 1180, 1160]), weekly: calculateBestPrice([7250, 7550, 7400]), monthly: calculateBestPrice([26000, 27000, 26500]), deposit: 2800 },
    features: { tr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], en: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ru: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], de: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ar: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], fr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 3890,
    freeKm: 320,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Honda Accord Kiralama Antalya', en: 'Rent Honda Accord Antalya', ru: 'Аренда Honda Accord Анталия', de: 'Honda Accord Mieten Antalya', ar: 'تأجير Honda Accord أنطاليا', fr: 'Location Honda Accord Antalya' }, metaDescription: { tr: 'Honda Accord araç kiralama Antalya', en: 'Honda Accord car rental Antalya', ru: 'Аренда Honda Accord Анталия', de: 'Honda Accord Autovermietung Antalya', ar: 'تأجير Honda Accord أنطاليا', fr: 'Location Honda Accord Antalya' }, keywords: { tr: ['honda kiralama'], en: ['honda rental'], ru: ['аренда honda'], de: ['honda mieten'], ar: ['تأجير honda'], fr: ['location honda'] }, slug: { tr: 'honda-accord-comfort', en: 'honda-accord-comfort', ru: 'honda-accord-comfort', de: 'honda-accord-comfort', ar: 'honda-accord-comfort', fr: 'honda-accord-comfort' } },
    active: true,
    popular: true
  }
,

  {
    id: 'comfort-skoda-superb-2024',
    category: 'comfort',
    brand: 'Skoda',
    model: { tr: 'Superb 2024', en: 'Superb 2024', ru: 'Superb 2024', de: 'Superb 2024', ar: 'Superb 2024', fr: 'Superb 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1160, 1200, 1180]), weekly: calculateBestPrice([7400, 7700, 7550]), monthly: calculateBestPrice([26500, 27500, 27000]), deposit: 2700 },
    features: { tr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], en: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ru: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], de: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ar: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], fr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 4234,
    freeKm: 330,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Skoda Superb Kiralama Antalya', en: 'Rent Skoda Superb Antalya', ru: 'Аренда Skoda Superb Анталия', de: 'Skoda Superb Mieten Antalya', ar: 'تأجير Skoda Superb أنطاليا', fr: 'Location Skoda Superb Antalya' }, metaDescription: { tr: 'Skoda Superb araç kiralama Antalya', en: 'Skoda Superb car rental Antalya', ru: 'Аренда Skoda Superb Анталия', de: 'Skoda Superb Autovermietung Antalya', ar: 'تأجير Skoda Superb أنطاليا', fr: 'Location Skoda Superb Antalya' }, keywords: { tr: ['skoda kiralama'], en: ['skoda rental'], ru: ['аренда skoda'], de: ['skoda mieten'], ar: ['تأجير skoda'], fr: ['location skoda'] }, slug: { tr: 'skoda-superb-comfort', en: 'skoda-superb-comfort', ru: 'skoda-superb-comfort', de: 'skoda-superb-comfort', ar: 'skoda-superb-comfort', fr: 'skoda-superb-comfort' } },
    active: true,
    popular: true
  }
,

  {
    id: 'comfort-passat-2024',
    category: 'comfort',
    brand: 'Volkswagen',
    model: { tr: 'Passat 2024', en: 'Passat 2024', ru: 'Passat 2024', de: 'Passat 2024', ar: 'Passat 2024', fr: 'Passat 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1170, 1210, 1190]), weekly: calculateBestPrice([7450, 7750, 7600]), monthly: calculateBestPrice([26800, 27800, 27300]), deposit: 2750 },
    features: { tr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], en: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ru: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], de: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], ar: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'], fr: ['Otomatik Vites', 'Deri Direksiyon', 'Klima', 'Cruise Control', 'LED'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 4456,
    freeKm: 340,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Volkswagen Passat Kiralama Antalya', en: 'Rent Volkswagen Passat Antalya', ru: 'Аренда Volkswagen Passat Анталия', de: 'Volkswagen Passat Mieten Antalya', ar: 'تأجير Volkswagen Passat أنطاليا', fr: 'Location Volkswagen Passat Antalya' }, metaDescription: { tr: 'Volkswagen Passat araç kiralama Antalya', en: 'Volkswagen Passat car rental Antalya', ru: 'Аренда Volkswagen Passat Анталия', de: 'Volkswagen Passat Autovermietung Antalya', ar: 'تأجير Volkswagen Passat أنطاليا', fr: 'Location Volkswagen Passat Antalya' }, keywords: { tr: ['volkswagen kiralama'], en: ['volkswagen rental'], ru: ['аренда volkswagen'], de: ['volkswagen mieten'], ar: ['تأجير volkswagen'], fr: ['location volkswagen'] }, slug: { tr: 'volkswagen-passat-comfort', en: 'volkswagen-passat-comfort', ru: 'volkswagen-passat-comfort', de: 'volkswagen-passat-comfort', ar: 'volkswagen-passat-comfort', fr: 'volkswagen-passat-comfort' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-bmw-520i-2024',
    category: 'premium',
    brand: 'BMW',
    model: { tr: '520i 2024', en: '520i 2024', ru: '520i 2024', de: '520i 2024', ar: '520i 2024', fr: '520i 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1750, 1810, 1780]), weekly: calculateBestPrice([11200, 11600, 11400]), monthly: calculateBestPrice([40000, 41500, 40750]), deposit: 4500 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5678,
    freeKm: 400,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'BMW 520i Kiralama Antalya', en: 'Rent BMW 520i Antalya', ru: 'Аренда BMW 520i Анталия', de: 'BMW 520i Mieten Antalya', ar: 'تأجير BMW 520i أنطاليا', fr: 'Location BMW 520i Antalya' }, metaDescription: { tr: 'BMW 520i araç kiralama Antalya', en: 'BMW 520i car rental Antalya', ru: 'Аренда BMW 520i Анталия', de: 'BMW 520i Autovermietung Antalya', ar: 'تأجير BMW 520i أنطاليا', fr: 'Location BMW 520i Antalya' }, keywords: { tr: ['bmw kiralama'], en: ['bmw rental'], ru: ['аренда bmw'], de: ['bmw mieten'], ar: ['تأجير bmw'], fr: ['location bmw'] }, slug: { tr: 'bmw-520i-premium', en: 'bmw-520i-premium', ru: 'bmw-520i-premium', de: 'bmw-520i-premium', ar: 'bmw-520i-premium', fr: 'bmw-520i-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-mercedes-e200-2024',
    category: 'premium',
    brand: 'Mercedes',
    model: { tr: 'E 200 2024', en: 'E 200 2024', ru: 'E 200 2024', de: 'E 200 2024', ar: 'E 200 2024', fr: 'E 200 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1800, 1860, 1830]), weekly: calculateBestPrice([11500, 11900, 11700]), monthly: calculateBestPrice([41000, 42500, 41750]), deposit: 4800 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5890,
    freeKm: 420,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mercedes E 200 Kiralama Antalya', en: 'Rent Mercedes E 200 Antalya', ru: 'Аренда Mercedes E 200 Анталия', de: 'Mercedes E 200 Mieten Antalya', ar: 'تأجير Mercedes E 200 أنطاليا', fr: 'Location Mercedes E 200 Antalya' }, metaDescription: { tr: 'Mercedes E 200 araç kiralama Antalya', en: 'Mercedes E 200 car rental Antalya', ru: 'Аренда Mercedes E 200 Анталия', de: 'Mercedes E 200 Autovermietung Antalya', ar: 'تأجير Mercedes E 200 أنطاليا', fr: 'Location Mercedes E 200 Antalya' }, keywords: { tr: ['mercedes kiralama'], en: ['mercedes rental'], ru: ['аренда mercedes'], de: ['mercedes mieten'], ar: ['تأجير mercedes'], fr: ['location mercedes'] }, slug: { tr: 'mercedes-e-200-premium', en: 'mercedes-e-200-premium', ru: 'mercedes-e-200-premium', de: 'mercedes-e-200-premium', ar: 'mercedes-e-200-premium', fr: 'mercedes-e-200-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-audi-a6-2024',
    category: 'premium',
    brand: 'Audi',
    model: { tr: 'A6 2024', en: 'A6 2024', ru: 'A6 2024', de: 'A6 2024', ar: 'A6 2024', fr: 'A6 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1780, 1840, 1810]), weekly: calculateBestPrice([11350, 11750, 11550]), monthly: calculateBestPrice([40500, 42000, 41250]), deposit: 4600 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5456,
    freeKm: 410,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Audi A6 Kiralama Antalya', en: 'Rent Audi A6 Antalya', ru: 'Аренда Audi A6 Анталия', de: 'Audi A6 Mieten Antalya', ar: 'تأجير Audi A6 أنطاليا', fr: 'Location Audi A6 Antalya' }, metaDescription: { tr: 'Audi A6 araç kiralama Antalya', en: 'Audi A6 car rental Antalya', ru: 'Аренда Audi A6 Анталия', de: 'Audi A6 Autovermietung Antalya', ar: 'تأجير Audi A6 أنطاليا', fr: 'Location Audi A6 Antalya' }, keywords: { tr: ['audi kiralama'], en: ['audi rental'], ru: ['аренда audi'], de: ['audi mieten'], ar: ['تأجير audi'], fr: ['location audi'] }, slug: { tr: 'audi-a6-premium', en: 'audi-a6-premium', ru: 'audi-a6-premium', de: 'audi-a6-premium', ar: 'audi-a6-premium', fr: 'audi-a6-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-volvo-s90-2024',
    category: 'premium',
    brand: 'Volvo',
    model: { tr: 'S90 2024', en: 'S90 2024', ru: 'S90 2024', de: 'S90 2024', ar: 'S90 2024', fr: 'S90 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1720, 1780, 1750]), weekly: calculateBestPrice([11000, 11400, 11200]), monthly: calculateBestPrice([39200, 40700, 39950]), deposit: 4400 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 4890,
    freeKm: 390,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Volvo S90 Kiralama Antalya', en: 'Rent Volvo S90 Antalya', ru: 'Аренда Volvo S90 Анталия', de: 'Volvo S90 Mieten Antalya', ar: 'تأجير Volvo S90 أنطاليا', fr: 'Location Volvo S90 Antalya' }, metaDescription: { tr: 'Volvo S90 araç kiralama Antalya', en: 'Volvo S90 car rental Antalya', ru: 'Аренда Volvo S90 Анталия', de: 'Volvo S90 Autovermietung Antalya', ar: 'تأجير Volvo S90 أنطاليا', fr: 'Location Volvo S90 Antalya' }, keywords: { tr: ['volvo kiralama'], en: ['volvo rental'], ru: ['аренда volvo'], de: ['volvo mieten'], ar: ['تأجير volvo'], fr: ['location volvo'] }, slug: { tr: 'volvo-s90-premium', en: 'volvo-s90-premium', ru: 'volvo-s90-premium', de: 'volvo-s90-premium', ar: 'volvo-s90-premium', fr: 'volvo-s90-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-jaguar-xf-2024',
    category: 'premium',
    brand: 'Jaguar',
    model: { tr: 'XF 2024', en: 'XF 2024', ru: 'XF 2024', de: 'XF 2024', ar: 'XF 2024', fr: 'XF 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1850, 1910, 1880]), weekly: calculateBestPrice([11800, 12200, 12000]), monthly: calculateBestPrice([42000, 43500, 42750]), deposit: 5000 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 4567,
    freeKm: 430,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Jaguar XF Kiralama Antalya', en: 'Rent Jaguar XF Antalya', ru: 'Аренда Jaguar XF Анталия', de: 'Jaguar XF Mieten Antalya', ar: 'تأجير Jaguar XF أنطاليا', fr: 'Location Jaguar XF Antalya' }, metaDescription: { tr: 'Jaguar XF araç kiralama Antalya', en: 'Jaguar XF car rental Antalya', ru: 'Аренда Jaguar XF Анталия', de: 'Jaguar XF Autovermietung Antalya', ar: 'تأجير Jaguar XF أنطاليا', fr: 'Location Jaguar XF Antalya' }, keywords: { tr: ['jaguar kiralama'], en: ['jaguar rental'], ru: ['аренда jaguar'], de: ['jaguar mieten'], ar: ['تأجير jaguar'], fr: ['location jaguar'] }, slug: { tr: 'jaguar-xf-premium', en: 'jaguar-xf-premium', ru: 'jaguar-xf-premium', de: 'jaguar-xf-premium', ar: 'jaguar-xf-premium', fr: 'jaguar-xf-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-lexus-es-2024',
    category: 'premium',
    brand: 'Lexus',
    model: { tr: 'ES 300h 2024', en: 'ES 300h 2024', ru: 'ES 300h 2024', de: 'ES 300h 2024', ar: 'ES 300h 2024', fr: 'ES 300h 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1900, 1960, 1930]), weekly: calculateBestPrice([12100, 12500, 12300]), monthly: calculateBestPrice([43000, 44500, 43750]), deposit: 5200 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5123,
    freeKm: 450,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Lexus ES 300h Kiralama Antalya', en: 'Rent Lexus ES 300h Antalya', ru: 'Аренда Lexus ES 300h Анталия', de: 'Lexus ES 300h Mieten Antalya', ar: 'تأجير Lexus ES 300h أنطاليا', fr: 'Location Lexus ES 300h Antalya' }, metaDescription: { tr: 'Lexus ES 300h araç kiralama Antalya', en: 'Lexus ES 300h car rental Antalya', ru: 'Аренда Lexus ES 300h Анталия', de: 'Lexus ES 300h Autovermietung Antalya', ar: 'تأجير Lexus ES 300h أنطاليا', fr: 'Location Lexus ES 300h Antalya' }, keywords: { tr: ['lexus kiralama'], en: ['lexus rental'], ru: ['аренда lexus'], de: ['lexus mieten'], ar: ['تأجير lexus'], fr: ['location lexus'] }, slug: { tr: 'lexus-es-300h-premium', en: 'lexus-es-300h-premium', ru: 'lexus-es-300h-premium', de: 'lexus-es-300h-premium', ar: 'lexus-es-300h-premium', fr: 'lexus-es-300h-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-genesis-g80-2024',
    category: 'premium',
    brand: 'Genesis',
    model: { tr: 'G80 2024', en: 'G80 2024', ru: 'G80 2024', de: 'G80 2024', ar: 'G80 2024', fr: 'G80 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1820, 1880, 1850]), weekly: calculateBestPrice([11600, 12000, 11800]), monthly: calculateBestPrice([41400, 42900, 42150]), deposit: 4700 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 4678,
    freeKm: 420,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Genesis G80 Kiralama Antalya', en: 'Rent Genesis G80 Antalya', ru: 'Аренда Genesis G80 Анталия', de: 'Genesis G80 Mieten Antalya', ar: 'تأجير Genesis G80 أنطاليا', fr: 'Location Genesis G80 Antalya' }, metaDescription: { tr: 'Genesis G80 araç kiralama Antalya', en: 'Genesis G80 car rental Antalya', ru: 'Аренда Genesis G80 Анталия', de: 'Genesis G80 Autovermietung Antalya', ar: 'تأجير Genesis G80 أنطاليا', fr: 'Location Genesis G80 Antalya' }, keywords: { tr: ['genesis kiralama'], en: ['genesis rental'], ru: ['аренда genesis'], de: ['genesis mieten'], ar: ['تأجير genesis'], fr: ['location genesis'] }, slug: { tr: 'genesis-g80-premium', en: 'genesis-g80-premium', ru: 'genesis-g80-premium', de: 'genesis-g80-premium', ar: 'genesis-g80-premium', fr: 'genesis-g80-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'premium-alfa-giulia-2024',
    category: 'premium',
    brand: 'Alfa Romeo',
    model: { tr: 'Giulia 2024', en: 'Giulia 2024', ru: 'Giulia 2024', de: 'Giulia 2024', ar: 'Giulia 2024', fr: 'Giulia 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1760, 1820, 1790]), weekly: calculateBestPrice([11250, 11650, 11450]), monthly: calculateBestPrice([40100, 41600, 40850]), deposit: 4500 },
    features: { tr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], en: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ru: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], de: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], ar: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'], fr: ['Otomatik', 'Deri Döşeme', 'LED Matrix', '360 Kamera', 'Adaptif Cruise', 'Masaj Koltuk'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 3890,
    freeKm: 400,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Alfa Romeo Giulia Kiralama Antalya', en: 'Rent Alfa Romeo Giulia Antalya', ru: 'Аренда Alfa Romeo Giulia Анталия', de: 'Alfa Romeo Giulia Mieten Antalya', ar: 'تأجير Alfa Romeo Giulia أنطاليا', fr: 'Location Alfa Romeo Giulia Antalya' }, metaDescription: { tr: 'Alfa Romeo Giulia araç kiralama Antalya', en: 'Alfa Romeo Giulia car rental Antalya', ru: 'Аренда Alfa Romeo Giulia Анталия', de: 'Alfa Romeo Giulia Autovermietung Antalya', ar: 'تأجير Alfa Romeo Giulia أنطاليا', fr: 'Location Alfa Romeo Giulia Antalya' }, keywords: { tr: ['alfa romeo kiralama'], en: ['alfa romeo rental'], ru: ['аренда alfa romeo'], de: ['alfa romeo mieten'], ar: ['تأجير alfa romeo'], fr: ['location alfa romeo'] }, slug: { tr: 'alfa romeo-giulia-premium', en: 'alfa romeo-giulia-premium', ru: 'alfa romeo-giulia-premium', de: 'alfa romeo-giulia-premium', ar: 'alfa romeo-giulia-premium', fr: 'alfa romeo-giulia-premium' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-mercedes-s500-2024',
    category: 'luxury',
    brand: 'Mercedes',
    model: { tr: 'S 500 2024', en: 'S 500 2024', ru: 'S 500 2024', de: 'S 500 2024', ar: 'S 500 2024', fr: 'S 500 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([3500, 3620, 3560]), weekly: calculateBestPrice([22400, 23200, 22800]), monthly: calculateBestPrice([80000, 83000, 81500]), deposit: 8000 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 6789,
    freeKm: 500,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mercedes S 500 Kiralama Antalya', en: 'Rent Mercedes S 500 Antalya', ru: 'Аренда Mercedes S 500 Анталия', de: 'Mercedes S 500 Mieten Antalya', ar: 'تأجير Mercedes S 500 أنطاليا', fr: 'Location Mercedes S 500 Antalya' }, metaDescription: { tr: 'Mercedes S 500 araç kiralama Antalya', en: 'Mercedes S 500 car rental Antalya', ru: 'Аренда Mercedes S 500 Анталия', de: 'Mercedes S 500 Autovermietung Antalya', ar: 'تأجير Mercedes S 500 أنطاليا', fr: 'Location Mercedes S 500 Antalya' }, keywords: { tr: ['mercedes kiralama'], en: ['mercedes rental'], ru: ['аренда mercedes'], de: ['mercedes mieten'], ar: ['تأجير mercedes'], fr: ['location mercedes'] }, slug: { tr: 'mercedes-s-500-luxury', en: 'mercedes-s-500-luxury', ru: 'mercedes-s-500-luxury', de: 'mercedes-s-500-luxury', ar: 'mercedes-s-500-luxury', fr: 'mercedes-s-500-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-bmw-740i-2024',
    category: 'luxury',
    brand: 'BMW',
    model: { tr: '740i 2024', en: '740i 2024', ru: '740i 2024', de: '740i 2024', ar: '740i 2024', fr: '740i 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([3400, 3520, 3460]), weekly: calculateBestPrice([21800, 22600, 22200]), monthly: calculateBestPrice([78000, 81000, 79500]), deposit: 7800 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 6234,
    freeKm: 480,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'BMW 740i Kiralama Antalya', en: 'Rent BMW 740i Antalya', ru: 'Аренда BMW 740i Анталия', de: 'BMW 740i Mieten Antalya', ar: 'تأجير BMW 740i أنطاليا', fr: 'Location BMW 740i Antalya' }, metaDescription: { tr: 'BMW 740i araç kiralama Antalya', en: 'BMW 740i car rental Antalya', ru: 'Аренда BMW 740i Анталия', de: 'BMW 740i Autovermietung Antalya', ar: 'تأجير BMW 740i أنطاليا', fr: 'Location BMW 740i Antalya' }, keywords: { tr: ['bmw kiralama'], en: ['bmw rental'], ru: ['аренда bmw'], de: ['bmw mieten'], ar: ['تأجير bmw'], fr: ['location bmw'] }, slug: { tr: 'bmw-740i-luxury', en: 'bmw-740i-luxury', ru: 'bmw-740i-luxury', de: 'bmw-740i-luxury', ar: 'bmw-740i-luxury', fr: 'bmw-740i-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-audi-a8-2024',
    category: 'luxury',
    brand: 'Audi',
    model: { tr: 'A8 2024', en: 'A8 2024', ru: 'A8 2024', de: 'A8 2024', ar: 'A8 2024', fr: 'A8 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([3600, 3720, 3660]), weekly: calculateBestPrice([23000, 23800, 23400]), monthly: calculateBestPrice([82000, 85000, 83500]), deposit: 8200 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5678,
    freeKm: 510,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Audi A8 Kiralama Antalya', en: 'Rent Audi A8 Antalya', ru: 'Аренда Audi A8 Анталия', de: 'Audi A8 Mieten Antalya', ar: 'تأجير Audi A8 أنطاليا', fr: 'Location Audi A8 Antalya' }, metaDescription: { tr: 'Audi A8 araç kiralama Antalya', en: 'Audi A8 car rental Antalya', ru: 'Аренда Audi A8 Анталия', de: 'Audi A8 Autovermietung Antalya', ar: 'تأجير Audi A8 أنطاليا', fr: 'Location Audi A8 Antalya' }, keywords: { tr: ['audi kiralama'], en: ['audi rental'], ru: ['аренда audi'], de: ['audi mieten'], ar: ['تأجير audi'], fr: ['location audi'] }, slug: { tr: 'audi-a8-luxury', en: 'audi-a8-luxury', ru: 'audi-a8-luxury', de: 'audi-a8-luxury', ar: 'audi-a8-luxury', fr: 'audi-a8-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-porsche-panamera-2024',
    category: 'luxury',
    brand: 'Porsche',
    model: { tr: 'Panamera 2024', en: 'Panamera 2024', ru: 'Panamera 2024', de: 'Panamera 2024', ar: 'Panamera 2024', fr: 'Panamera 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 2,
    pricing: { daily: calculateBestPrice([3800, 3930, 3865]), weekly: calculateBestPrice([24300, 25200, 24750]), monthly: calculateBestPrice([87000, 90000, 88500]), deposit: 9000 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5123,
    freeKm: 520,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Porsche Panamera Kiralama Antalya', en: 'Rent Porsche Panamera Antalya', ru: 'Аренда Porsche Panamera Анталия', de: 'Porsche Panamera Mieten Antalya', ar: 'تأجير Porsche Panamera أنطاليا', fr: 'Location Porsche Panamera Antalya' }, metaDescription: { tr: 'Porsche Panamera araç kiralama Antalya', en: 'Porsche Panamera car rental Antalya', ru: 'Аренда Porsche Panamera Анталия', de: 'Porsche Panamera Autovermietung Antalya', ar: 'تأجير Porsche Panamera أنطاليا', fr: 'Location Porsche Panamera Antalya' }, keywords: { tr: ['porsche kiralama'], en: ['porsche rental'], ru: ['аренда porsche'], de: ['porsche mieten'], ar: ['تأجير porsche'], fr: ['location porsche'] }, slug: { tr: 'porsche-panamera-luxury', en: 'porsche-panamera-luxury', ru: 'porsche-panamera-luxury', de: 'porsche-panamera-luxury', ar: 'porsche-panamera-luxury', fr: 'porsche-panamera-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-lexus-ls-2024',
    category: 'luxury',
    brand: 'Lexus',
    model: { tr: 'LS 500 2024', en: 'LS 500 2024', ru: 'LS 500 2024', de: 'LS 500 2024', ar: 'LS 500 2024', fr: 'LS 500 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([3700, 3820, 3760]), weekly: calculateBestPrice([23700, 24500, 24100]), monthly: calculateBestPrice([84500, 87500, 86000]), deposit: 8500 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 4890,
    freeKm: 500,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Lexus LS 500 Kiralama Antalya', en: 'Rent Lexus LS 500 Antalya', ru: 'Аренда Lexus LS 500 Анталия', de: 'Lexus LS 500 Mieten Antalya', ar: 'تأجير Lexus LS 500 أنطاليا', fr: 'Location Lexus LS 500 Antalya' }, metaDescription: { tr: 'Lexus LS 500 araç kiralama Antalya', en: 'Lexus LS 500 car rental Antalya', ru: 'Аренда Lexus LS 500 Анталия', de: 'Lexus LS 500 Autovermietung Antalya', ar: 'تأجير Lexus LS 500 أنطاليا', fr: 'Location Lexus LS 500 Antalya' }, keywords: { tr: ['lexus kiralama'], en: ['lexus rental'], ru: ['аренда lexus'], de: ['lexus mieten'], ar: ['تأجير lexus'], fr: ['location lexus'] }, slug: { tr: 'lexus-ls-500-luxury', en: 'lexus-ls-500-luxury', ru: 'lexus-ls-500-luxury', de: 'lexus-ls-500-luxury', ar: 'lexus-ls-500-luxury', fr: 'lexus-ls-500-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-range-rover-2024',
    category: 'luxury',
    brand: 'Range Rover',
    model: { tr: 'Autobiography 2024', en: 'Autobiography 2024', ru: 'Autobiography 2024', de: 'Autobiography 2024', ar: 'Autobiography 2024', fr: 'Autobiography 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 5,
    luggage: 4,
    pricing: { daily: calculateBestPrice([3900, 4030, 3965]), weekly: calculateBestPrice([24900, 25800, 25350]), monthly: calculateBestPrice([89000, 92000, 90500]), deposit: 9500 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 6012,
    freeKm: 550,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Range Rover Autobiography Kiralama Antalya', en: 'Rent Range Rover Autobiography Antalya', ru: 'Аренда Range Rover Autobiography Анталия', de: 'Range Rover Autobiography Mieten Antalya', ar: 'تأجير Range Rover Autobiography أنطاليا', fr: 'Location Range Rover Autobiography Antalya' }, metaDescription: { tr: 'Range Rover Autobiography araç kiralama Antalya', en: 'Range Rover Autobiography car rental Antalya', ru: 'Аренда Range Rover Autobiography Анталия', de: 'Range Rover Autobiography Autovermietung Antalya', ar: 'تأجير Range Rover Autobiography أنطاليا', fr: 'Location Range Rover Autobiography Antalya' }, keywords: { tr: ['range rover kiralama'], en: ['range rover rental'], ru: ['аренда range rover'], de: ['range rover mieten'], ar: ['تأجير range rover'], fr: ['location range rover'] }, slug: { tr: 'range rover-autobiography-luxury', en: 'range rover-autobiography-luxury', ru: 'range rover-autobiography-luxury', de: 'range rover-autobiography-luxury', ar: 'range rover-autobiography-luxury', fr: 'range rover-autobiography-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-bentley-flying-2024',
    category: 'luxury',
    brand: 'Bentley',
    model: { tr: 'Flying Spur 2024', en: 'Flying Spur 2024', ru: 'Flying Spur 2024', de: 'Flying Spur 2024', ar: 'Flying Spur 2024', fr: 'Flying Spur 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([4500, 4650, 4575]), weekly: calculateBestPrice([28800, 29800, 29300]), monthly: calculateBestPrice([103000, 106000, 104500]), deposit: 12000 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 3456,
    freeKm: 600,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Bentley Flying Spur Kiralama Antalya', en: 'Rent Bentley Flying Spur Antalya', ru: 'Аренда Bentley Flying Spur Анталия', de: 'Bentley Flying Spur Mieten Antalya', ar: 'تأجير Bentley Flying Spur أنطاليا', fr: 'Location Bentley Flying Spur Antalya' }, metaDescription: { tr: 'Bentley Flying Spur araç kiralama Antalya', en: 'Bentley Flying Spur car rental Antalya', ru: 'Аренда Bentley Flying Spur Анталия', de: 'Bentley Flying Spur Autovermietung Antalya', ar: 'تأجير Bentley Flying Spur أنطاليا', fr: 'Location Bentley Flying Spur Antalya' }, keywords: { tr: ['bentley kiralama'], en: ['bentley rental'], ru: ['аренда bentley'], de: ['bentley mieten'], ar: ['تأجير bentley'], fr: ['location bentley'] }, slug: { tr: 'bentley-flying-spur-luxury', en: 'bentley-flying-spur-luxury', ru: 'bentley-flying-spur-luxury', de: 'bentley-flying-spur-luxury', ar: 'bentley-flying-spur-luxury', fr: 'bentley-flying-spur-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'luxury-maserati-quattro-2024',
    category: 'luxury',
    brand: 'Maserati',
    model: { tr: 'Quattroporte 2024', en: 'Quattroporte 2024', ru: 'Quattroporte 2024', de: 'Quattroporte 2024', ar: 'Quattroporte 2024', fr: 'Quattroporte 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    pricing: { daily: calculateBestPrice([3600, 3720, 3660]), weekly: calculateBestPrice([23000, 23800, 23400]), monthly: calculateBestPrice([82000, 85000, 83500]), deposit: 8200 },
    features: { tr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], en: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ru: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], de: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], ar: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'], fr: ['Tam Otomatik', 'Premium Deri', 'Burmester Ses', 'Hava Süspansiyon', 'Masaj', 'Panoramik Tavan'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 3890,
    freeKm: 500,
    extraKmPrice: 2.0,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Maserati Quattroporte Kiralama Antalya', en: 'Rent Maserati Quattroporte Antalya', ru: 'Аренда Maserati Quattroporte Анталия', de: 'Maserati Quattroporte Mieten Antalya', ar: 'تأجير Maserati Quattroporte أنطاليا', fr: 'Location Maserati Quattroporte Antalya' }, metaDescription: { tr: 'Maserati Quattroporte araç kiralama Antalya', en: 'Maserati Quattroporte car rental Antalya', ru: 'Аренда Maserati Quattroporte Анталия', de: 'Maserati Quattroporte Autovermietung Antalya', ar: 'تأجير Maserati Quattroporte أنطاليا', fr: 'Location Maserati Quattroporte Antalya' }, keywords: { tr: ['maserati kiralama'], en: ['maserati rental'], ru: ['аренда maserati'], de: ['maserati mieten'], ar: ['تأجير maserati'], fr: ['location maserati'] }, slug: { tr: 'maserati-quattroporte-luxury', en: 'maserati-quattroporte-luxury', ru: 'maserati-quattroporte-luxury', de: 'maserati-quattroporte-luxury', ar: 'maserati-quattroporte-luxury', fr: 'maserati-quattroporte-luxury' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-toyota-rav4-2024',
    category: 'suv',
    brand: 'Toyota',
    model: { tr: 'RAV4 2024', en: 'RAV4 2024', ru: 'RAV4 2024', de: 'RAV4 2024', ar: 'RAV4 2024', fr: 'RAV4 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1350, 1395, 1372]), weekly: calculateBestPrice([8600, 8920, 8760]), monthly: calculateBestPrice([30800, 31900, 31350]), deposit: 3200 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 5678,
    freeKm: 350,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Toyota RAV4 Kiralama Antalya', en: 'Rent Toyota RAV4 Antalya', ru: 'Аренда Toyota RAV4 Анталия', de: 'Toyota RAV4 Mieten Antalya', ar: 'تأجير Toyota RAV4 أنطاليا', fr: 'Location Toyota RAV4 Antalya' }, metaDescription: { tr: 'Toyota RAV4 araç kiralama Antalya', en: 'Toyota RAV4 car rental Antalya', ru: 'Аренда Toyota RAV4 Анталия', de: 'Toyota RAV4 Autovermietung Antalya', ar: 'تأجير Toyota RAV4 أنطاليا', fr: 'Location Toyota RAV4 Antalya' }, keywords: { tr: ['toyota kiralama'], en: ['toyota rental'], ru: ['аренда toyota'], de: ['toyota mieten'], ar: ['تأجير toyota'], fr: ['location toyota'] }, slug: { tr: 'toyota-rav4-suv', en: 'toyota-rav4-suv', ru: 'toyota-rav4-suv', de: 'toyota-rav4-suv', ar: 'toyota-rav4-suv', fr: 'toyota-rav4-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-honda-crv-2024',
    category: 'suv',
    brand: 'Honda',
    model: { tr: 'CR-V 2024', en: 'CR-V 2024', ru: 'CR-V 2024', de: 'CR-V 2024', ar: 'CR-V 2024', fr: 'CR-V 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1380, 1425, 1402]), weekly: calculateBestPrice([8800, 9120, 8960]), monthly: calculateBestPrice([31500, 32600, 32050]), deposit: 3300 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 5234,
    freeKm: 360,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Honda CR-V Kiralama Antalya', en: 'Rent Honda CR-V Antalya', ru: 'Аренда Honda CR-V Анталия', de: 'Honda CR-V Mieten Antalya', ar: 'تأجير Honda CR-V أنطاليا', fr: 'Location Honda CR-V Antalya' }, metaDescription: { tr: 'Honda CR-V araç kiralama Antalya', en: 'Honda CR-V car rental Antalya', ru: 'Аренда Honda CR-V Анталия', de: 'Honda CR-V Autovermietung Antalya', ar: 'تأجير Honda CR-V أنطاليا', fr: 'Location Honda CR-V Antalya' }, keywords: { tr: ['honda kiralama'], en: ['honda rental'], ru: ['аренда honda'], de: ['honda mieten'], ar: ['تأجير honda'], fr: ['location honda'] }, slug: { tr: 'honda-cr-v-suv', en: 'honda-cr-v-suv', ru: 'honda-cr-v-suv', de: 'honda-cr-v-suv', ar: 'honda-cr-v-suv', fr: 'honda-cr-v-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-mazda-cx5-2024',
    category: 'suv',
    brand: 'Mazda',
    model: { tr: 'CX-5 2024', en: 'CX-5 2024', ru: 'CX-5 2024', de: 'CX-5 2024', ar: 'CX-5 2024', fr: 'CX-5 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1320, 1365, 1342]), weekly: calculateBestPrice([8400, 8720, 8560]), monthly: calculateBestPrice([30100, 31200, 30650]), deposit: 3100 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 4890,
    freeKm: 340,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mazda CX-5 Kiralama Antalya', en: 'Rent Mazda CX-5 Antalya', ru: 'Аренда Mazda CX-5 Анталия', de: 'Mazda CX-5 Mieten Antalya', ar: 'تأجير Mazda CX-5 أنطاليا', fr: 'Location Mazda CX-5 Antalya' }, metaDescription: { tr: 'Mazda CX-5 araç kiralama Antalya', en: 'Mazda CX-5 car rental Antalya', ru: 'Аренда Mazda CX-5 Анталия', de: 'Mazda CX-5 Autovermietung Antalya', ar: 'تأجير Mazda CX-5 أنطاليا', fr: 'Location Mazda CX-5 Antalya' }, keywords: { tr: ['mazda kiralama'], en: ['mazda rental'], ru: ['аренда mazda'], de: ['mazda mieten'], ar: ['تأجير mazda'], fr: ['location mazda'] }, slug: { tr: 'mazda-cx-5-suv', en: 'mazda-cx-5-suv', ru: 'mazda-cx-5-suv', de: 'mazda-cx-5-suv', ar: 'mazda-cx-5-suv', fr: 'mazda-cx-5-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-nissan-xtrail-2024',
    category: 'suv',
    brand: 'Nissan',
    model: { tr: 'X-Trail 2024', en: 'X-Trail 2024', ru: 'X-Trail 2024', de: 'X-Trail 2024', ar: 'X-Trail 2024', fr: 'X-Trail 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 7,
    doors: 5,
    luggage: 4,
    pricing: { daily: calculateBestPrice([1400, 1445, 1422]), weekly: calculateBestPrice([8950, 9270, 9110]), monthly: calculateBestPrice([32000, 33100, 32550]), deposit: 3400 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 4567,
    freeKm: 370,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Nissan X-Trail Kiralama Antalya', en: 'Rent Nissan X-Trail Antalya', ru: 'Аренда Nissan X-Trail Анталия', de: 'Nissan X-Trail Mieten Antalya', ar: 'تأجير Nissan X-Trail أنطاليا', fr: 'Location Nissan X-Trail Antalya' }, metaDescription: { tr: 'Nissan X-Trail araç kiralama Antalya', en: 'Nissan X-Trail car rental Antalya', ru: 'Аренда Nissan X-Trail Анталия', de: 'Nissan X-Trail Autovermietung Antalya', ar: 'تأجير Nissan X-Trail أنطاليا', fr: 'Location Nissan X-Trail Antalya' }, keywords: { tr: ['nissan kiralama'], en: ['nissan rental'], ru: ['аренда nissan'], de: ['nissan mieten'], ar: ['تأجير nissan'], fr: ['location nissan'] }, slug: { tr: 'nissan-x-trail-suv', en: 'nissan-x-trail-suv', ru: 'nissan-x-trail-suv', de: 'nissan-x-trail-suv', ar: 'nissan-x-trail-suv', fr: 'nissan-x-trail-suv' } },
    active: true,
    popular: false
  }
,

  {
    id: 'suv-volkswagen-tiguan-2024',
    category: 'suv',
    brand: 'Volkswagen',
    model: { tr: 'Tiguan 2024', en: 'Tiguan 2024', ru: 'Tiguan 2024', de: 'Tiguan 2024', ar: 'Tiguan 2024', fr: 'Tiguan 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1450, 1495, 1472]), weekly: calculateBestPrice([9250, 9570, 9410]), monthly: calculateBestPrice([33100, 34200, 33650]), deposit: 3500 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 5123,
    freeKm: 380,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Volkswagen Tiguan Kiralama Antalya', en: 'Rent Volkswagen Tiguan Antalya', ru: 'Аренда Volkswagen Tiguan Анталия', de: 'Volkswagen Tiguan Mieten Antalya', ar: 'تأجير Volkswagen Tiguan أنطاليا', fr: 'Location Volkswagen Tiguan Antalya' }, metaDescription: { tr: 'Volkswagen Tiguan araç kiralama Antalya', en: 'Volkswagen Tiguan car rental Antalya', ru: 'Аренда Volkswagen Tiguan Анталия', de: 'Volkswagen Tiguan Autovermietung Antalya', ar: 'تأجير Volkswagen Tiguan أنطاليا', fr: 'Location Volkswagen Tiguan Antalya' }, keywords: { tr: ['volkswagen kiralama'], en: ['volkswagen rental'], ru: ['аренда volkswagen'], de: ['volkswagen mieten'], ar: ['تأجير volkswagen'], fr: ['location volkswagen'] }, slug: { tr: 'volkswagen-tiguan-suv', en: 'volkswagen-tiguan-suv', ru: 'volkswagen-tiguan-suv', de: 'volkswagen-tiguan-suv', ar: 'volkswagen-tiguan-suv', fr: 'volkswagen-tiguan-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-bmw-x3-2024',
    category: 'suv',
    brand: 'BMW',
    model: { tr: 'X3 2024', en: 'X3 2024', ru: 'X3 2024', de: 'X3 2024', ar: 'X3 2024', fr: 'X3 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1550, 1600, 1575]), weekly: calculateBestPrice([9900, 10240, 10070]), monthly: calculateBestPrice([35400, 36600, 36000]), deposit: 3800 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5678,
    freeKm: 400,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'BMW X3 Kiralama Antalya', en: 'Rent BMW X3 Antalya', ru: 'Аренда BMW X3 Анталия', de: 'BMW X3 Mieten Antalya', ar: 'تأجير BMW X3 أنطاليا', fr: 'Location BMW X3 Antalya' }, metaDescription: { tr: 'BMW X3 araç kiralama Antalya', en: 'BMW X3 car rental Antalya', ru: 'Аренда BMW X3 Анталия', de: 'BMW X3 Autovermietung Antalya', ar: 'تأجير BMW X3 أنطاليا', fr: 'Location BMW X3 Antalya' }, keywords: { tr: ['bmw kiralama'], en: ['bmw rental'], ru: ['аренда bmw'], de: ['bmw mieten'], ar: ['تأجير bmw'], fr: ['location bmw'] }, slug: { tr: 'bmw-x3-suv', en: 'bmw-x3-suv', ru: 'bmw-x3-suv', de: 'bmw-x3-suv', ar: 'bmw-x3-suv', fr: 'bmw-x3-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-mercedes-glc-2024',
    category: 'suv',
    brand: 'Mercedes',
    model: { tr: 'GLC 300 2024', en: 'GLC 300 2024', ru: 'GLC 300 2024', de: 'GLC 300 2024', ar: 'GLC 300 2024', fr: 'GLC 300 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1620, 1670, 1645]), weekly: calculateBestPrice([10350, 10690, 10520]), monthly: calculateBestPrice([37000, 38200, 37600]), deposit: 4000 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5890,
    freeKm: 420,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mercedes GLC 300 Kiralama Antalya', en: 'Rent Mercedes GLC 300 Antalya', ru: 'Аренда Mercedes GLC 300 Анталия', de: 'Mercedes GLC 300 Mieten Antalya', ar: 'تأجير Mercedes GLC 300 أنطاليا', fr: 'Location Mercedes GLC 300 Antalya' }, metaDescription: { tr: 'Mercedes GLC 300 araç kiralama Antalya', en: 'Mercedes GLC 300 car rental Antalya', ru: 'Аренда Mercedes GLC 300 Анталия', de: 'Mercedes GLC 300 Autovermietung Antalya', ar: 'تأجير Mercedes GLC 300 أنطاليا', fr: 'Location Mercedes GLC 300 Antalya' }, keywords: { tr: ['mercedes kiralama'], en: ['mercedes rental'], ru: ['аренда mercedes'], de: ['mercedes mieten'], ar: ['تأجير mercedes'], fr: ['location mercedes'] }, slug: { tr: 'mercedes-glc-300-suv', en: 'mercedes-glc-300-suv', ru: 'mercedes-glc-300-suv', de: 'mercedes-glc-300-suv', ar: 'mercedes-glc-300-suv', fr: 'mercedes-glc-300-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-audi-q5-2024',
    category: 'suv',
    brand: 'Audi',
    model: { tr: 'Q5 2024', en: 'Q5 2024', ru: 'Q5 2024', de: 'Q5 2024', ar: 'Q5 2024', fr: 'Q5 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 5,
    luggage: 3,
    pricing: { daily: calculateBestPrice([1580, 1630, 1605]), weekly: calculateBestPrice([10100, 10440, 10270]), monthly: calculateBestPrice([36100, 37300, 36700]), deposit: 3900 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5456,
    freeKm: 410,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Audi Q5 Kiralama Antalya', en: 'Rent Audi Q5 Antalya', ru: 'Аренда Audi Q5 Анталия', de: 'Audi Q5 Mieten Antalya', ar: 'تأجير Audi Q5 أنطاليا', fr: 'Location Audi Q5 Antalya' }, metaDescription: { tr: 'Audi Q5 araç kiralama Antalya', en: 'Audi Q5 car rental Antalya', ru: 'Аренда Audi Q5 Анталия', de: 'Audi Q5 Autovermietung Antalya', ar: 'تأجير Audi Q5 أنطاليا', fr: 'Location Audi Q5 Antalya' }, keywords: { tr: ['audi kiralama'], en: ['audi rental'], ru: ['аренда audi'], de: ['audi mieten'], ar: ['تأجير audi'], fr: ['location audi'] }, slug: { tr: 'audi-q5-suv', en: 'audi-q5-suv', ru: 'audi-q5-suv', de: 'audi-q5-suv', ar: 'audi-q5-suv', fr: 'audi-q5-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-bmw-x5-2024',
    category: 'suv',
    brand: 'BMW',
    model: { tr: 'X5 2024', en: 'X5 2024', ru: 'X5 2024', de: 'X5 2024', ar: 'X5 2024', fr: 'X5 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 7,
    doors: 5,
    luggage: 4,
    pricing: { daily: calculateBestPrice([1800, 1855, 1827]), weekly: calculateBestPrice([11500, 11870, 11685]), monthly: calculateBestPrice([41100, 42400, 41750]), deposit: 4500 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 6123,
    freeKm: 450,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'BMW X5 Kiralama Antalya', en: 'Rent BMW X5 Antalya', ru: 'Аренда BMW X5 Анталия', de: 'BMW X5 Mieten Antalya', ar: 'تأجير BMW X5 أنطاليا', fr: 'Location BMW X5 Antalya' }, metaDescription: { tr: 'BMW X5 araç kiralama Antalya', en: 'BMW X5 car rental Antalya', ru: 'Аренда BMW X5 Анталия', de: 'BMW X5 Autovermietung Antalya', ar: 'تأجير BMW X5 أنطاليا', fr: 'Location BMW X5 Antalya' }, keywords: { tr: ['bmw kiralama'], en: ['bmw rental'], ru: ['аренда bmw'], de: ['bmw mieten'], ar: ['تأجير bmw'], fr: ['location bmw'] }, slug: { tr: 'bmw-x5-suv', en: 'bmw-x5-suv', ru: 'bmw-x5-suv', de: 'bmw-x5-suv', ar: 'bmw-x5-suv', fr: 'bmw-x5-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-mercedes-gle-2024',
    category: 'suv',
    brand: 'Mercedes',
    model: { tr: 'GLE 450 2024', en: 'GLE 450 2024', ru: 'GLE 450 2024', de: 'GLE 450 2024', ar: 'GLE 450 2024', fr: 'GLE 450 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 7,
    doors: 5,
    luggage: 4,
    pricing: { daily: calculateBestPrice([1900, 1960, 1930]), weekly: calculateBestPrice([12100, 12530, 12315]), monthly: calculateBestPrice([43300, 44800, 44050]), deposit: 4800 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 6456,
    freeKm: 470,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mercedes GLE 450 Kiralama Antalya', en: 'Rent Mercedes GLE 450 Antalya', ru: 'Аренда Mercedes GLE 450 Анталия', de: 'Mercedes GLE 450 Mieten Antalya', ar: 'تأجير Mercedes GLE 450 أنطاليا', fr: 'Location Mercedes GLE 450 Antalya' }, metaDescription: { tr: 'Mercedes GLE 450 araç kiralama Antalya', en: 'Mercedes GLE 450 car rental Antalya', ru: 'Аренда Mercedes GLE 450 Анталия', de: 'Mercedes GLE 450 Autovermietung Antalya', ar: 'تأجير Mercedes GLE 450 أنطاليا', fr: 'Location Mercedes GLE 450 Antalya' }, keywords: { tr: ['mercedes kiralama'], en: ['mercedes rental'], ru: ['аренда mercedes'], de: ['mercedes mieten'], ar: ['تأجير mercedes'], fr: ['location mercedes'] }, slug: { tr: 'mercedes-gle-450-suv', en: 'mercedes-gle-450-suv', ru: 'mercedes-gle-450-suv', de: 'mercedes-gle-450-suv', ar: 'mercedes-gle-450-suv', fr: 'mercedes-gle-450-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-land-cruiser-2024',
    category: 'suv',
    brand: 'Toyota',
    model: { tr: 'Land Cruiser 2024', en: 'Land Cruiser 2024', ru: 'Land Cruiser 2024', de: 'Land Cruiser 2024', ar: 'Land Cruiser 2024', fr: 'Land Cruiser 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 7,
    doors: 5,
    luggage: 4,
    pricing: { daily: calculateBestPrice([2100, 2165, 2132]), weekly: calculateBestPrice([13400, 13860, 13630]), monthly: calculateBestPrice([48000, 49600, 48800]), deposit: 5500 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5890,
    freeKm: 500,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Toyota Land Cruiser Kiralama Antalya', en: 'Rent Toyota Land Cruiser Antalya', ru: 'Аренда Toyota Land Cruiser Анталия', de: 'Toyota Land Cruiser Mieten Antalya', ar: 'تأجير Toyota Land Cruiser أنطاليا', fr: 'Location Toyota Land Cruiser Antalya' }, metaDescription: { tr: 'Toyota Land Cruiser araç kiralama Antalya', en: 'Toyota Land Cruiser car rental Antalya', ru: 'Аренда Toyota Land Cruiser Анталия', de: 'Toyota Land Cruiser Autovermietung Antalya', ar: 'تأجير Toyota Land Cruiser أنطاليا', fr: 'Location Toyota Land Cruiser Antalya' }, keywords: { tr: ['toyota kiralama'], en: ['toyota rental'], ru: ['аренда toyota'], de: ['toyota mieten'], ar: ['تأجير toyota'], fr: ['location toyota'] }, slug: { tr: 'toyota-land-cruiser-suv', en: 'toyota-land-cruiser-suv', ru: 'toyota-land-cruiser-suv', de: 'toyota-land-cruiser-suv', ar: 'toyota-land-cruiser-suv', fr: 'toyota-land-cruiser-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'suv-range-sport-2024',
    category: 'suv',
    brand: 'Range Rover',
    model: { tr: 'Sport 2024', en: 'Sport 2024', ru: 'Sport 2024', de: 'Sport 2024', ar: 'Sport 2024', fr: 'Sport 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 7,
    doors: 5,
    luggage: 4,
    pricing: { daily: calculateBestPrice([2300, 2370, 2335]), weekly: calculateBestPrice([14700, 15170, 14935]), monthly: calculateBestPrice([52600, 54300, 53450]), deposit: 6000 },
    features: { tr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], en: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ru: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], de: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], ar: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'], fr: ['4x4', 'Arazi Modu', 'Hill Assist', 'LED', 'Kamera 360', 'Çekiş Kontrolü'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.9,
    totalRentals: 5123,
    freeKm: 520,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Range Rover Sport Kiralama Antalya', en: 'Rent Range Rover Sport Antalya', ru: 'Аренда Range Rover Sport Анталия', de: 'Range Rover Sport Mieten Antalya', ar: 'تأجير Range Rover Sport أنطاليا', fr: 'Location Range Rover Sport Antalya' }, metaDescription: { tr: 'Range Rover Sport araç kiralama Antalya', en: 'Range Rover Sport car rental Antalya', ru: 'Аренда Range Rover Sport Анталия', de: 'Range Rover Sport Autovermietung Antalya', ar: 'تأجير Range Rover Sport أنطاليا', fr: 'Location Range Rover Sport Antalya' }, keywords: { tr: ['range rover kiralama'], en: ['range rover rental'], ru: ['аренда range rover'], de: ['range rover mieten'], ar: ['تأجير range rover'], fr: ['location range rover'] }, slug: { tr: 'range rover-sport-suv', en: 'range rover-sport-suv', ru: 'range rover-sport-suv', de: 'range rover-sport-suv', ar: 'range rover-sport-suv', fr: 'range rover-sport-suv' } },
    active: true,
    popular: true
  }
,

  {
    id: 'van-mercedes-vito-2024',
    category: 'van',
    brand: 'Mercedes',
    model: { tr: 'Vito Tourer 2024', en: 'Vito Tourer 2024', ru: 'Vito Tourer 2024', de: 'Vito Tourer 2024', ar: 'Vito Tourer 2024', fr: 'Vito Tourer 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 9,
    doors: 5,
    luggage: 5,
    pricing: { daily: calculateBestPrice([1850, 1910, 1880]), weekly: calculateBestPrice([11800, 12200, 12000]), monthly: calculateBestPrice([42200, 43700, 42950]), deposit: 4500 },
    features: { tr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], en: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ru: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], de: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ar: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], fr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 4567,
    freeKm: 400,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mercedes Vito Tourer Kiralama Antalya', en: 'Rent Mercedes Vito Tourer Antalya', ru: 'Аренда Mercedes Vito Tourer Анталия', de: 'Mercedes Vito Tourer Mieten Antalya', ar: 'تأجير Mercedes Vito Tourer أنطاليا', fr: 'Location Mercedes Vito Tourer Antalya' }, metaDescription: { tr: 'Mercedes Vito Tourer araç kiralama Antalya', en: 'Mercedes Vito Tourer car rental Antalya', ru: 'Аренда Mercedes Vito Tourer Анталия', de: 'Mercedes Vito Tourer Autovermietung Antalya', ar: 'تأجير Mercedes Vito Tourer أنطاليا', fr: 'Location Mercedes Vito Tourer Antalya' }, keywords: { tr: ['mercedes kiralama'], en: ['mercedes rental'], ru: ['аренда mercedes'], de: ['mercedes mieten'], ar: ['تأجير mercedes'], fr: ['location mercedes'] }, slug: { tr: 'mercedes-vito-tourer-van', en: 'mercedes-vito-tourer-van', ru: 'mercedes-vito-tourer-van', de: 'mercedes-vito-tourer-van', ar: 'mercedes-vito-tourer-van', fr: 'mercedes-vito-tourer-van' } },
    active: true,
    popular: true
  }
,

  {
    id: 'van-vw-caravelle-2024',
    category: 'van',
    brand: 'Volkswagen',
    model: { tr: 'Caravelle 2024', en: 'Caravelle 2024', ru: 'Caravelle 2024', de: 'Caravelle 2024', ar: 'Caravelle 2024', fr: 'Caravelle 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 9,
    doors: 5,
    luggage: 5,
    pricing: { daily: calculateBestPrice([1900, 1960, 1930]), weekly: calculateBestPrice([12100, 12500, 12300]), monthly: calculateBestPrice([43300, 44800, 44050]), deposit: 4700 },
    features: { tr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], en: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ru: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], de: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ar: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], fr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 4234,
    freeKm: 410,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Volkswagen Caravelle Kiralama Antalya', en: 'Rent Volkswagen Caravelle Antalya', ru: 'Аренда Volkswagen Caravelle Анталия', de: 'Volkswagen Caravelle Mieten Antalya', ar: 'تأجير Volkswagen Caravelle أنطاليا', fr: 'Location Volkswagen Caravelle Antalya' }, metaDescription: { tr: 'Volkswagen Caravelle araç kiralama Antalya', en: 'Volkswagen Caravelle car rental Antalya', ru: 'Аренда Volkswagen Caravelle Анталия', de: 'Volkswagen Caravelle Autovermietung Antalya', ar: 'تأجير Volkswagen Caravelle أنطاليا', fr: 'Location Volkswagen Caravelle Antalya' }, keywords: { tr: ['volkswagen kiralama'], en: ['volkswagen rental'], ru: ['аренда volkswagen'], de: ['volkswagen mieten'], ar: ['تأجير volkswagen'], fr: ['location volkswagen'] }, slug: { tr: 'volkswagen-caravelle-van', en: 'volkswagen-caravelle-van', ru: 'volkswagen-caravelle-van', de: 'volkswagen-caravelle-van', ar: 'volkswagen-caravelle-van', fr: 'volkswagen-caravelle-van' } },
    active: true,
    popular: true
  }
,

  {
    id: 'van-ford-tourneo-2024',
    category: 'van',
    brand: 'Ford',
    model: { tr: 'Tourneo Custom 2024', en: 'Tourneo Custom 2024', ru: 'Tourneo Custom 2024', de: 'Tourneo Custom 2024', ar: 'Tourneo Custom 2024', fr: 'Tourneo Custom 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 9,
    doors: 5,
    luggage: 5,
    pricing: { daily: calculateBestPrice([1780, 1840, 1810]), weekly: calculateBestPrice([11350, 11750, 11550]), monthly: calculateBestPrice([40600, 42100, 41350]), deposit: 4300 },
    features: { tr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], en: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ru: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], de: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ar: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], fr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 3890,
    freeKm: 390,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Ford Tourneo Custom Kiralama Antalya', en: 'Rent Ford Tourneo Custom Antalya', ru: 'Аренда Ford Tourneo Custom Анталия', de: 'Ford Tourneo Custom Mieten Antalya', ar: 'تأجير Ford Tourneo Custom أنطاليا', fr: 'Location Ford Tourneo Custom Antalya' }, metaDescription: { tr: 'Ford Tourneo Custom araç kiralama Antalya', en: 'Ford Tourneo Custom car rental Antalya', ru: 'Аренда Ford Tourneo Custom Анталия', de: 'Ford Tourneo Custom Autovermietung Antalya', ar: 'تأجير Ford Tourneo Custom أنطاليا', fr: 'Location Ford Tourneo Custom Antalya' }, keywords: { tr: ['ford kiralama'], en: ['ford rental'], ru: ['аренда ford'], de: ['ford mieten'], ar: ['تأجير ford'], fr: ['location ford'] }, slug: { tr: 'ford-tourneo-custom-van', en: 'ford-tourneo-custom-van', ru: 'ford-tourneo-custom-van', de: 'ford-tourneo-custom-van', ar: 'ford-tourneo-custom-van', fr: 'ford-tourneo-custom-van' } },
    active: true,
    popular: false
  }
,

  {
    id: 'van-hyundai-h1-2024',
    category: 'van',
    brand: 'Hyundai',
    model: { tr: 'H-1 2024', en: 'H-1 2024', ru: 'H-1 2024', de: 'H-1 2024', ar: 'H-1 2024', fr: 'H-1 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 9,
    doors: 4,
    luggage: 5,
    pricing: { daily: calculateBestPrice([1650, 1705, 1677]), weekly: calculateBestPrice([10550, 10910, 10730]), monthly: calculateBestPrice([37700, 39000, 38350]), deposit: 4000 },
    features: { tr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], en: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ru: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], de: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ar: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], fr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 3567,
    freeKm: 370,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Hyundai H-1 Kiralama Antalya', en: 'Rent Hyundai H-1 Antalya', ru: 'Аренда Hyundai H-1 Анталия', de: 'Hyundai H-1 Mieten Antalya', ar: 'تأجير Hyundai H-1 أنطاليا', fr: 'Location Hyundai H-1 Antalya' }, metaDescription: { tr: 'Hyundai H-1 araç kiralama Antalya', en: 'Hyundai H-1 car rental Antalya', ru: 'Аренда Hyundai H-1 Анталия', de: 'Hyundai H-1 Autovermietung Antalya', ar: 'تأجير Hyundai H-1 أنطاليا', fr: 'Location Hyundai H-1 Antalya' }, keywords: { tr: ['hyundai kiralama'], en: ['hyundai rental'], ru: ['аренда hyundai'], de: ['hyundai mieten'], ar: ['تأجير hyundai'], fr: ['location hyundai'] }, slug: { tr: 'hyundai-h-1-van', en: 'hyundai-h-1-van', ru: 'hyundai-h-1-van', de: 'hyundai-h-1-van', ar: 'hyundai-h-1-van', fr: 'hyundai-h-1-van' } },
    active: true,
    popular: false
  }
,

  {
    id: 'van-peugeot-traveller-2024',
    category: 'van',
    brand: 'Peugeot',
    model: { tr: 'Traveller 2024', en: 'Traveller 2024', ru: 'Traveller 2024', de: 'Traveller 2024', ar: 'Traveller 2024', fr: 'Traveller 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 8,
    doors: 5,
    luggage: 5,
    pricing: { daily: calculateBestPrice([1720, 1780, 1750]), weekly: calculateBestPrice([11000, 11400, 11200]), monthly: calculateBestPrice([39300, 40700, 40000]), deposit: 4200 },
    features: { tr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], en: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ru: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], de: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ar: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], fr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 3234,
    freeKm: 380,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Peugeot Traveller Kiralama Antalya', en: 'Rent Peugeot Traveller Antalya', ru: 'Аренда Peugeot Traveller Анталия', de: 'Peugeot Traveller Mieten Antalya', ar: 'تأجير Peugeot Traveller أنطاليا', fr: 'Location Peugeot Traveller Antalya' }, metaDescription: { tr: 'Peugeot Traveller araç kiralama Antalya', en: 'Peugeot Traveller car rental Antalya', ru: 'Аренда Peugeot Traveller Анталия', de: 'Peugeot Traveller Autovermietung Antalya', ar: 'تأجير Peugeot Traveller أنطاليا', fr: 'Location Peugeot Traveller Antalya' }, keywords: { tr: ['peugeot kiralama'], en: ['peugeot rental'], ru: ['аренда peugeot'], de: ['peugeot mieten'], ar: ['تأجير peugeot'], fr: ['location peugeot'] }, slug: { tr: 'peugeot-traveller-van', en: 'peugeot-traveller-van', ru: 'peugeot-traveller-van', de: 'peugeot-traveller-van', ar: 'peugeot-traveller-van', fr: 'peugeot-traveller-van' } },
    active: true,
    popular: false
  }
,

  {
    id: 'van-toyota-proace-2024',
    category: 'van',
    brand: 'Toyota',
    model: { tr: 'Proace Verso 2024', en: 'Proace Verso 2024', ru: 'Proace Verso 2024', de: 'Proace Verso 2024', ar: 'Proace Verso 2024', fr: 'Proace Verso 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 9,
    doors: 5,
    luggage: 5,
    pricing: { daily: calculateBestPrice([1800, 1860, 1830]), weekly: calculateBestPrice([11500, 11900, 11700]), monthly: calculateBestPrice([41100, 42600, 41850]), deposit: 4400 },
    features: { tr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], en: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ru: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], de: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], ar: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'], fr: ['Geniş Bagaj', '3 Sıra Koltuk', 'Sürgülü Kapı', 'Klima', '7-9 Kişilik'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 3890,
    freeKm: 390,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Toyota Proace Verso Kiralama Antalya', en: 'Rent Toyota Proace Verso Antalya', ru: 'Аренда Toyota Proace Verso Анталия', de: 'Toyota Proace Verso Mieten Antalya', ar: 'تأجير Toyota Proace Verso أنطاليا', fr: 'Location Toyota Proace Verso Antalya' }, metaDescription: { tr: 'Toyota Proace Verso araç kiralama Antalya', en: 'Toyota Proace Verso car rental Antalya', ru: 'Аренда Toyota Proace Verso Анталия', de: 'Toyota Proace Verso Autovermietung Antalya', ar: 'تأجير Toyota Proace Verso أنطاليا', fr: 'Location Toyota Proace Verso Antalya' }, keywords: { tr: ['toyota kiralama'], en: ['toyota rental'], ru: ['аренда toyota'], de: ['toyota mieten'], ar: ['تأجير toyota'], fr: ['location toyota'] }, slug: { tr: 'toyota-proace-verso-van', en: 'toyota-proace-verso-van', ru: 'toyota-proace-verso-van', de: 'toyota-proace-verso-van', ar: 'toyota-proace-verso-van', fr: 'toyota-proace-verso-van' } },
    active: true,
    popular: true
  }
,

  {
    id: 'minibus-mercedes-sprinter-2024',
    category: 'minibus',
    brand: 'Mercedes',
    model: { tr: 'Sprinter 516 2024', en: 'Sprinter 516 2024', ru: 'Sprinter 516 2024', de: 'Sprinter 516 2024', ar: 'Sprinter 516 2024', fr: 'Sprinter 516 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 16,
    doors: 4,
    luggage: 8,
    pricing: { daily: calculateBestPrice([2550, 2635, 2592]), weekly: calculateBestPrice([16300, 16870, 16585]), monthly: calculateBestPrice([58300, 60300, 59300]), deposit: 6500 },
    features: { tr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], en: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ru: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], de: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ar: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], fr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 3456,
    freeKm: 450,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Mercedes Sprinter 516 Kiralama Antalya', en: 'Rent Mercedes Sprinter 516 Antalya', ru: 'Аренда Mercedes Sprinter 516 Анталия', de: 'Mercedes Sprinter 516 Mieten Antalya', ar: 'تأجير Mercedes Sprinter 516 أنطاليا', fr: 'Location Mercedes Sprinter 516 Antalya' }, metaDescription: { tr: 'Mercedes Sprinter 516 araç kiralama Antalya', en: 'Mercedes Sprinter 516 car rental Antalya', ru: 'Аренда Mercedes Sprinter 516 Анталия', de: 'Mercedes Sprinter 516 Autovermietung Antalya', ar: 'تأجير Mercedes Sprinter 516 أنطاليا', fr: 'Location Mercedes Sprinter 516 Antalya' }, keywords: { tr: ['mercedes kiralama'], en: ['mercedes rental'], ru: ['аренда mercedes'], de: ['mercedes mieten'], ar: ['تأجير mercedes'], fr: ['location mercedes'] }, slug: { tr: 'mercedes-sprinter-516-minibus', en: 'mercedes-sprinter-516-minibus', ru: 'mercedes-sprinter-516-minibus', de: 'mercedes-sprinter-516-minibus', ar: 'mercedes-sprinter-516-minibus', fr: 'mercedes-sprinter-516-minibus' } },
    active: true,
    popular: true
  }
,

  {
    id: 'minibus-vw-crafter-2024',
    category: 'minibus',
    brand: 'Volkswagen',
    model: { tr: 'Crafter 2024', en: 'Crafter 2024', ru: 'Crafter 2024', de: 'Crafter 2024', ar: 'Crafter 2024', fr: 'Crafter 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 17,
    doors: 4,
    luggage: 8,
    pricing: { daily: calculateBestPrice([2600, 2685, 2642]), weekly: calculateBestPrice([16600, 17170, 16885]), monthly: calculateBestPrice([59400, 61400, 60400]), deposit: 6700 },
    features: { tr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], en: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ru: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], de: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ar: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], fr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.8,
    totalRentals: 3234,
    freeKm: 460,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Volkswagen Crafter Kiralama Antalya', en: 'Rent Volkswagen Crafter Antalya', ru: 'Аренда Volkswagen Crafter Анталия', de: 'Volkswagen Crafter Mieten Antalya', ar: 'تأجير Volkswagen Crafter أنطاليا', fr: 'Location Volkswagen Crafter Antalya' }, metaDescription: { tr: 'Volkswagen Crafter araç kiralama Antalya', en: 'Volkswagen Crafter car rental Antalya', ru: 'Аренда Volkswagen Crafter Анталия', de: 'Volkswagen Crafter Autovermietung Antalya', ar: 'تأجير Volkswagen Crafter أنطاليا', fr: 'Location Volkswagen Crafter Antalya' }, keywords: { tr: ['volkswagen kiralama'], en: ['volkswagen rental'], ru: ['аренда volkswagen'], de: ['volkswagen mieten'], ar: ['تأجير volkswagen'], fr: ['location volkswagen'] }, slug: { tr: 'volkswagen-crafter-minibus', en: 'volkswagen-crafter-minibus', ru: 'volkswagen-crafter-minibus', de: 'volkswagen-crafter-minibus', ar: 'volkswagen-crafter-minibus', fr: 'volkswagen-crafter-minibus' } },
    active: true,
    popular: true
  }
,

  {
    id: 'minibus-ford-transit-2024',
    category: 'minibus',
    brand: 'Ford',
    model: { tr: 'Transit 460L 2024', en: 'Transit 460L 2024', ru: 'Transit 460L 2024', de: 'Transit 460L 2024', ar: 'Transit 460L 2024', fr: 'Transit 460L 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 14,
    doors: 4,
    luggage: 8,
    pricing: { daily: calculateBestPrice([2450, 2530, 2490]), weekly: calculateBestPrice([15650, 16190, 15920]), monthly: calculateBestPrice([56000, 57900, 56950]), deposit: 6200 },
    features: { tr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], en: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ru: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], de: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ar: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], fr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 2890,
    freeKm: 440,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Ford Transit 460L Kiralama Antalya', en: 'Rent Ford Transit 460L Antalya', ru: 'Аренда Ford Transit 460L Анталия', de: 'Ford Transit 460L Mieten Antalya', ar: 'تأجير Ford Transit 460L أنطاليا', fr: 'Location Ford Transit 460L Antalya' }, metaDescription: { tr: 'Ford Transit 460L araç kiralama Antalya', en: 'Ford Transit 460L car rental Antalya', ru: 'Аренда Ford Transit 460L Анталия', de: 'Ford Transit 460L Autovermietung Antalya', ar: 'تأجير Ford Transit 460L أنطاليا', fr: 'Location Ford Transit 460L Antalya' }, keywords: { tr: ['ford kiralama'], en: ['ford rental'], ru: ['аренда ford'], de: ['ford mieten'], ar: ['تأجير ford'], fr: ['location ford'] }, slug: { tr: 'ford-transit-460l-minibus', en: 'ford-transit-460l-minibus', ru: 'ford-transit-460l-minibus', de: 'ford-transit-460l-minibus', ar: 'ford-transit-460l-minibus', fr: 'ford-transit-460l-minibus' } },
    active: true,
    popular: false
  }
,

  {
    id: 'minibus-iveco-daily-2024',
    category: 'minibus',
    brand: 'Iveco',
    model: { tr: 'Daily Tourys 2024', en: 'Daily Tourys 2024', ru: 'Daily Tourys 2024', de: 'Daily Tourys 2024', ar: 'Daily Tourys 2024', fr: 'Daily Tourys 2024' },
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 16,
    doors: 4,
    luggage: 8,
    pricing: { daily: calculateBestPrice([2500, 2585, 2542]), weekly: calculateBestPrice([15950, 16550, 16250]), monthly: calculateBestPrice([57100, 59100, 58100]), deposit: 6400 },
    features: { tr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], en: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ru: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], de: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], ar: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'], fr: ['14-17 Kişilik', 'Klima', 'Yüksek Tavan', 'Geniş İç Mekan', 'Ticari Plaka'] },
    insurance: { included: { tr: 'Trafik Sigortası, Kasko, Ferdi Kaza', en: 'Traffic Insurance, Comprehensive, Personal Accident', ru: 'Страхование, КАСКО, Личное страхование', de: 'Haftpflicht, Vollkasko, Unfallversicherung', ar: 'تأمين مروري، شامل، حوادث', fr: 'Assurance RC, Tous risques, Accident' }, optional: { tr: 'Full Kasko, İlave Sürücü, GPS', en: 'Full Coverage, Additional Driver, GPS', ru: 'Полное КАСКО, Доп. водитель, GPS', de: 'Vollkasko, Zusatzfahrer, GPS', ar: 'تأمين كامل، سائق إضافي، GPS', fr: 'Couverture complète, Conducteur additionnel, GPS' } },
    pickupLocations: ['antalya-airport', 'antalya-city', 'kemer', 'belek', 'side', 'lara'],
    availability: { antalyaAirport: true, antalyaCity: true, kemer: true, belek: true, side: true, alanya: false, lara: true, kundu: true },
    images: ['https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'],
    rating: 4.7,
    totalRentals: 2567,
    freeKm: 450,
    extraKmPrice: 1.5,
    minRentalDays: 1,
    airportDelivery: true,
    hotelDelivery: true,
    seo: { metaTitle: { tr: 'Iveco Daily Tourys Kiralama Antalya', en: 'Rent Iveco Daily Tourys Antalya', ru: 'Аренда Iveco Daily Tourys Анталия', de: 'Iveco Daily Tourys Mieten Antalya', ar: 'تأجير Iveco Daily Tourys أنطاليا', fr: 'Location Iveco Daily Tourys Antalya' }, metaDescription: { tr: 'Iveco Daily Tourys araç kiralama Antalya', en: 'Iveco Daily Tourys car rental Antalya', ru: 'Аренда Iveco Daily Tourys Анталия', de: 'Iveco Daily Tourys Autovermietung Antalya', ar: 'تأجير Iveco Daily Tourys أنطاليا', fr: 'Location Iveco Daily Tourys Antalya' }, keywords: { tr: ['iveco kiralama'], en: ['iveco rental'], ru: ['аренда iveco'], de: ['iveco mieten'], ar: ['تأجير iveco'], fr: ['location iveco'] }, slug: { tr: 'iveco-daily-tourys-minibus', en: 'iveco-daily-tourys-minibus', ru: 'iveco-daily-tourys-minibus', de: 'iveco-daily-tourys-minibus', ar: 'iveco-daily-tourys-minibus', fr: 'iveco-daily-tourys-minibus' } },
    active: true,
    popular: false
  }


  // ==================== TOTAL: 50 VEHICLES (5 initial + 45 additional) ====================
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
