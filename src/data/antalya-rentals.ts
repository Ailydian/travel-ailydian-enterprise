/**
 * Antalya Rentals - Comprehensive Multi-language Rental Property System
 * Complete coverage of Antalya region properties with 6-language SEO support
 * Languages: Turkish, English, Russian, German, Arabic, French
 *
 * Pricing Strategy: 2% cheaper than competitors (Airbnb, Booking.com, Vrbo)
 * Property Types: Villas, Apartments, Hotels, Boutique Hotels, Penthouses
 * Regions: Antalya City, Lara, Kundu, Belek, Side, Alanya, Kemer
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
interface RentalSEO {
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

// Rental property interface
export interface AntalyaRentalProperty {
  id: string;
  propertyType: 'villa' | 'apartment' | 'hotel' | 'boutique-hotel' | 'penthouse' | 'studio';
  region: 'antalya-city' | 'lara' | 'kundu' | 'belek' | 'side' | 'alanya' | 'kemer' | 'konyaalti';
  name: MultiLangContent;
  shortDescription: MultiLangContent;
  longDescription: MultiLangContent;
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  pricing: {
    perNight: number; // TRY per night
    perWeek: number; // TRY per week (usually 10% discount)
    perMonth: number; // TRY per month (usually 25% discount)
    cleaningFee: number;
    securityDeposit: number;
    competitorPrices: {
      airbnb: number;
      booking: number;
      vrbo: number;
    };
  };
  amenities: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  features: {
    wifi: boolean;
    kitchen: boolean;
    parking: boolean;
    pool: boolean;
    privatePool: boolean;
    airConditioning: boolean;
    heating: boolean;
    tv: boolean;
    washer: boolean;
    beachfront: boolean;
    seaview: boolean;
    balcony: boolean;
    terrace: boolean;
    gym: boolean;
    spa: boolean;
    sauna: boolean;
    jacuzzi: boolean;
    bbq: boolean;
    garden: boolean;
  };
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
  host: {
    name: string;
    memberSince: string;
    responseTime: string;
    responseRate: number;
    languages: string[];
    superhost: boolean;
    verified: boolean;
  };
  location: {
    district: MultiLangContent;
    address: MultiLangContent;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearbyAttractions: MultiLangContent[];
    distanceToBeach: number; // meters
    distanceToAirport: number; // km
    distanceToCity: number; // km
  };
  images: string[];
  rating: number;
  reviewCount: number;
  instantBook: boolean;
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  seo: RentalSEO;
  active: boolean;
  featured: boolean;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== LUXURY VILLAS - ANTALYA ====================

export const antalyaRentals: AntalyaRentalProperty[] = [
  // 1. Luxury Beachfront Villa - Lara
  {
    id: 'antalya-lara-luxury-beachfront-villa-001',
    propertyType: 'villa',
    region: 'lara',
    name: {
      tr: 'Lara Lüks Sahil Villası - Özel Havuzlu',
      en: 'Lara Luxury Beachfront Villa with Private Pool',
      ru: 'Роскошная вилла на берегу моря в Ларе с бассейном',
      de: 'Lara Luxus Strandvilla mit privatem Pool',
      ar: 'فيلا فاخرة على الشاطئ في لارا مع مسبح خاص',
      fr: 'Villa de luxe en bord de mer à Lara avec piscine privée'
    },
    shortDescription: {
      tr: 'Muhteşem deniz manzarası, özel havuz ve plaja direkt erişim. 4 yatak odası, modern tasarım.',
      en: 'Stunning sea view, private pool and direct beach access. 4 bedrooms, modern design.',
      ru: 'Потрясающий вид на море, частный бассейн и прямой выход на пляж. 4 спальни, современный дизайн.',
      de: 'Atemberaubender Meerblick, privater Pool und direkter Strandzugang. 4 Schlafzimmer, modernes Design.',
      ar: 'إطلالة خلابة على البحر، مسبح خاص ووصول مباشر إلى الشاطئ. 4 غرف نوم، تصميم عصري.',
      fr: 'Vue mer imprenable, piscine privée et accès direct à la plage. 4 chambres, design moderne.'
    },
    longDescription: {
      tr: 'Lara\'nın prestijli sahilinde yer alan bu lüks villa, 350 m² kullanım alanı ve 500 m² bahçe alanı ile mükemmel bir tatil deneyimi sunuyor. Özel infinity havuz, deniz manzaralı teraslar, modern mutfak ve lüks mobilyalarla donatılmış. Antalya Havalimanı\'na 15 km, şehir merkezine 10 km mesafede.',
      en: 'Located on the prestigious Lara coast, this luxury villa offers a perfect vacation experience with 350 sqm living area and 500 sqm garden. Features private infinity pool, sea view terraces, modern kitchen and luxury furnishings. 15 km to Antalya Airport, 10 km to city center.',
      ru: 'Расположенная на престижном побережье Лары, эта роскошная вилла предлагает идеальный отдых с жилой площадью 350 кв.м и садом 500 кв.м. Частный бассейн-инфинити, террасы с видом на море, современная кухня и роскошная мебель. 15 км до аэропорта Антальи, 10 км до центра города.',
      de: 'An der prestigeträchtigen Küste von Lara gelegen, bietet diese Luxusvilla ein perfektes Urlaubserlebnis mit 350 qm Wohnfläche und 500 qm Garten. Mit privatem Infinity-Pool, Terrassen mit Meerblick, moderner Küche und luxuriösen Möbeln. 15 km zum Flughafen Antalya, 10 km zum Stadtzentrum.',
      ar: 'تقع هذه الفيلا الفاخرة على ساحل لارا المرموق، وتوفر تجربة إجازة مثالية بمساحة معيشة 350 متر مربع وحديقة 500 متر مربع. تتميز بمسبح لا متناهي خاص، شرفات بإطلالة على البحر، مطبخ عصري وأثاث فاخر. 15 كم من مطار أنطاليا، 10 كم من وسط المدينة.',
      fr: 'Située sur la prestigieuse côte de Lara, cette villa de luxe offre une expérience de vacances parfaite avec 350 m² de surface habitable et 500 m² de jardin. Piscine à débordement privée, terrasses avec vue sur la mer, cuisine moderne et mobilier de luxe. 15 km de l\'aéroport d\'Antalya, 10 km du centre-ville.'
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 4
    },
    pricing: {
      perNight: calculateBestPrice([3500, 3800, 3600]), // Airbnb: 3500, Booking: 3800, Vrbo: 3600
      perWeek: calculateBestPrice([3500, 3800, 3600]) * 7 * 0.90,
      perMonth: calculateBestPrice([3500, 3800, 3600]) * 30 * 0.75,
      cleaningFee: 800,
      securityDeposit: 5000,
      competitorPrices: {
        airbnb: 3500,
        booking: 3800,
        vrbo: 3600
      }
    },
    amenities: {
      tr: ['Özel Infinity Havuz', 'Denize Sıfır', 'WiFi', 'Klima', 'Akıllı TV', 'Çamaşır Makinesi', 'Bulaşık Makinesi', 'Jakuzi', 'BBQ Alanı', 'Özel Bahçe', 'Güvenlik', 'Otopark'],
      en: ['Private Infinity Pool', 'Beachfront', 'WiFi', 'Air Conditioning', 'Smart TV', 'Washing Machine', 'Dishwasher', 'Jacuzzi', 'BBQ Area', 'Private Garden', 'Security', 'Parking'],
      ru: ['Частный бассейн-инфинити', 'На берегу моря', 'WiFi', 'Кондиционер', 'Смарт ТВ', 'Стиральная машина', 'Посудомоечная машина', 'Джакузи', 'Зона барбекю', 'Частный сад', 'Охрана', 'Парковка'],
      de: ['Privater Infinity-Pool', 'Direkt am Strand', 'WiFi', 'Klimaanlage', 'Smart TV', 'Waschmaschine', 'Geschirrspüler', 'Whirlpool', 'Grillplatz', 'Privater Garten', 'Sicherheit', 'Parkplatz'],
      ar: ['مسبح لا متناهي خاص', 'على الشاطئ', 'واي فاي', 'تكييف هواء', 'تلفزيون ذكي', 'غسالة ملابس', 'غسالة صحون', 'جاكوزي', 'منطقة شواء', 'حديقة خاصة', 'أمن', 'موقف سيارات'],
      fr: ['Piscine à débordement privée', 'Bord de mer', 'WiFi', 'Climatisation', 'Smart TV', 'Lave-linge', 'Lave-vaisselle', 'Jacuzzi', 'Espace barbecue', 'Jardin privé', 'Sécurité', 'Parking']
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      privatePool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: true,
      seaview: true,
      balcony: true,
      terrace: true,
      gym: false,
      spa: false,
      sauna: false,
      jacuzzi: true,
      bbq: true,
      garden: true
    },
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
    host: {
      name: 'Ahmet Kaya',
      memberSince: '2019-05-15',
      responseTime: '1 saat içinde',
      responseRate: 100,
      languages: ['Turkish', 'English', 'Russian'],
      superhost: true,
      verified: true
    },
    location: {
      district: {
        tr: 'Lara',
        en: 'Lara',
        ru: 'Лара',
        de: 'Lara',
        ar: 'لارا',
        fr: 'Lara'
      },
      address: {
        tr: 'Lara Sahil Caddesi, No: 45, Muratpaşa',
        en: 'Lara Coastal Road, No: 45, Muratpasa',
        ru: 'Прибрежная дорога Лара, № 45, Муратпаша',
        de: 'Lara Küstenstraße, Nr. 45, Muratpasa',
        ar: 'شارع لارا الساحلي، رقم: 45، مراتباشا',
        fr: 'Route côtière de Lara, n° 45, Muratpasa'
      },
      coordinates: {
        lat: 36.8531,
        lng: 30.7678
      },
      nearbyAttractions: [
        { tr: 'Lara Plajı', en: 'Lara Beach', ru: 'Пляж Лара', de: 'Lara Strand', ar: 'شاطئ لارا', fr: 'Plage de Lara' },
        { tr: 'Düden Şelalesi', en: 'Duden Waterfall', ru: 'Водопад Дюден', de: 'Düden Wasserfall', ar: 'شلالات دودان', fr: 'Cascade de Düden' },
        { tr: 'TerraCity AVM', en: 'TerraCity Mall', ru: 'ТЦ TerraCity', de: 'TerraCity Einkaufszentrum', ar: 'مول تيرا سيتي', fr: 'Centre commercial TerraCity' }
      ],
      distanceToBeach: 0,
      distanceToAirport: 15,
      distanceToCity: 10
    },
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 87,
    instantBook: true,
    cancellationPolicy: 'moderate',
    seo: {
      metaTitle: {
        tr: 'Lara Lüks Sahil Villası - Özel Havuzlu Villa Kiralama Antalya',
        en: 'Lara Luxury Beachfront Villa - Private Pool Villa Rental Antalya',
        ru: 'Роскошная вилла на берегу моря в Ларе - Аренда виллы с бассейном Анталья',
        de: 'Lara Luxus Strandvilla - Vermietung Villa mit Pool Antalya',
        ar: 'فيلا فاخرة على الشاطئ في لارا - تأجير فيلا مع مسبح أنطاليا',
        fr: 'Villa de luxe en bord de mer à Lara - Location villa avec piscine Antalya'
      },
      metaDescription: {
        tr: '4 yatak odalı lüks sahil villası. Özel infinity havuz, deniz manzarası, plaja direkt erişim. Lara\'da villa kiralama, Antalya.',
        en: '4-bedroom luxury beachfront villa. Private infinity pool, sea views, direct beach access. Villa rental in Lara, Antalya.',
        ru: 'Роскошная вилла на берегу с 4 спальнями. Частный бассейн-инфинити, вид на море, прямой выход на пляж. Аренда виллы в Ларе, Анталья.',
        de: 'Luxus-Strandvilla mit 4 Schlafzimmern. Privater Infinity-Pool, Meerblick, direkter Strandzugang. Villenmiete in Lara, Antalya.',
        ar: 'فيلا فاخرة على الشاطئ مع 4 غرف نوم. مسبح لا متناهي خاص، إطلالة على البحر، وصول مباشر للشاطئ. تأجير فيلا في لارا، أنطاليا.',
        fr: 'Villa de luxe en bord de mer avec 4 chambres. Piscine à débordement privée, vue mer, accès direct plage. Location villa à Lara, Antalya.'
      },
      keywords: {
        tr: ['lara villa kiralama', 'antalya lüks villa', 'özel havuzlu villa', 'sahil villası antalya', 'lara tatil evi'],
        en: ['lara villa rental', 'antalya luxury villa', 'private pool villa', 'beachfront villa antalya', 'lara vacation home'],
        ru: ['аренда виллы лара', 'роскошная вилла анталья', 'вилла с бассейном', 'вилла на берегу моря анталья', 'дом для отдыха лара'],
        de: ['lara villa mieten', 'antalya luxus villa', 'villa mit pool', 'strandvilla antalya', 'lara ferienhaus'],
        ar: ['تأجير فيلا لارا', 'فيلا فاخرة أنطاليا', 'فيلا مع مسبح', 'فيلا على الشاطئ أنطاليا', 'منزل عطلات لارا'],
        fr: ['location villa lara', 'villa de luxe antalya', 'villa avec piscine', 'villa bord de mer antalya', 'maison de vacances lara']
      },
      slug: {
        tr: 'lara-luks-sahil-villasi-ozel-havuzlu',
        en: 'lara-luxury-beachfront-villa-private-pool',
        ru: 'lara-roskoshnaya-villa-na-beregu-morya',
        de: 'lara-luxus-strandvilla-privatpool',
        ar: 'lara-villa-fakhra-ala-shati',
        fr: 'lara-villa-luxe-bord-mer-piscine'
      }
    },
    active: true,
    featured: true,
    popular: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-20T15:30:00Z'
  },

  // 2. Modern Apartment - Alanya
  {
    id: 'antalya-alanya-modern-apartment-002',
    propertyType: 'apartment',
    region: 'alanya',
    name: {
      tr: 'Alanya Merkez Modern 2+1 Daire - Deniz Manzaralı',
      en: 'Alanya Center Modern 2+1 Apartment - Sea View',
      ru: 'Современная квартира 2+1 в центре Аланьи - Вид на море',
      de: 'Alanya Zentrum Moderne 2+1 Wohnung - Meerblick',
      ar: 'شقة حديثة 2+1 في وسط ألانيا - إطلالة على البحر',
      fr: 'Appartement moderne 2+1 centre Alanya - Vue mer'
    },
    shortDescription: {
      tr: 'Alanya şehir merkezinde, deniz manzaralı modern daire. Ortak havuz, fitness, plaja 200m.',
      en: 'Modern apartment with sea view in Alanya city center. Shared pool, fitness, 200m to beach.',
      ru: 'Современная квартира с видом на море в центре Аланьи. Общий бассейн, фитнес, 200м до пляжа.',
      de: 'Moderne Wohnung mit Meerblick im Zentrum von Alanya. Gemeinschaftspool, Fitness, 200m zum Strand.',
      ar: 'شقة حديثة بإطلالة على البحر في وسط ألانيا. مسبح مشترك، لياقة، 200م من الشاطئ.',
      fr: 'Appartement moderne vue mer au centre d\'Alanya. Piscine commune, fitness, 200m de la plage.'
    },
    longDescription: {
      tr: 'Alanya\'nın en gözde bölgesi Saray Mahallesi\'nde 120 m² modern daire. 2 yatak odası, geniş salon, tam donanımlı mutfak. Site içinde ortak havuz, fitness merkezi, çocuk parkı. Plaja yürüme mesafesinde, market ve restoranlar çevrede. Antalya Havalimanı\'na 135 km.',
      en: 'Modern 120 sqm apartment in Alanya\'s most popular Saray neighborhood. 2 bedrooms, spacious living room, fully equipped kitchen. Complex features shared pool, fitness center, children\'s playground. Walking distance to beach, surrounded by shops and restaurants. 135 km to Antalya Airport.',
      ru: 'Современная квартира 120 кв.м в самом популярном районе Аланьи - Сарай. 2 спальни, просторная гостиная, полностью оборудованная кухня. В комплексе общий бассейн, фитнес-центр, детская площадка. Пешком до пляжа, рядом магазины и рестораны. 135 км до аэропорта Антальи.',
      de: 'Moderne 120 qm Wohnung im beliebtesten Viertel Saray von Alanya. 2 Schlafzimmer, geräumiges Wohnzimmer, voll ausgestattete Küche. Anlage mit Gemeinschaftspool, Fitnesscenter, Kinderspielplatz. Fußweg zum Strand, umgeben von Geschäften und Restaurants. 135 km zum Flughafen Antalya.',
      ar: 'شقة حديثة بمساحة 120 متر مربع في أشهر أحياء ألانيا - ساراي. غرفتا نوم، غرفة معيشة واسعة، مطبخ مجهز بالكامل. يحتوي المجمع على مسبح مشترك، مركز لياقة، ملعب أطفال. على مسافة قريبة من الشاطئ، محاطة بالمحلات والمطاعم. 135 كم من مطار أنطاليا.',
      fr: 'Appartement moderne de 120 m² dans le quartier le plus prisé d\'Alanya - Saray. 2 chambres, salon spacieux, cuisine entièrement équipée. Résidence avec piscine commune, centre de fitness, aire de jeux pour enfants. À distance de marche de la plage, entouré de commerces et restaurants. 135 km de l\'aéroport d\'Antalya.'
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    pricing: {
      perNight: calculateBestPrice([1200, 1300, 1250]),
      perWeek: calculateBestPrice([1200, 1300, 1250]) * 7 * 0.90,
      perMonth: calculateBestPrice([1200, 1300, 1250]) * 30 * 0.75,
      cleaningFee: 300,
      securityDeposit: 2000,
      competitorPrices: {
        airbnb: 1200,
        booking: 1300,
        vrbo: 1250
      }
    },
    amenities: {
      tr: ['Ortak Havuz', 'Fitness Merkezi', 'WiFi', 'Klima', 'Akıllı TV', 'Çamaşır Makinesi', 'Asansör', 'Güvenlik', 'Otopark', 'Deniz Manzarası'],
      en: ['Shared Pool', 'Fitness Center', 'WiFi', 'Air Conditioning', 'Smart TV', 'Washing Machine', 'Elevator', 'Security', 'Parking', 'Sea View'],
      ru: ['Общий бассейн', 'Фитнес-центр', 'WiFi', 'Кондиционер', 'Смарт ТВ', 'Стиральная машина', 'Лифт', 'Охрана', 'Парковка', 'Вид на море'],
      de: ['Gemeinschaftspool', 'Fitnesscenter', 'WiFi', 'Klimaanlage', 'Smart TV', 'Waschmaschine', 'Aufzug', 'Sicherheit', 'Parkplatz', 'Meerblick'],
      ar: ['مسبح مشترك', 'مركز لياقة', 'واي فاي', 'تكييف', 'تلفزيون ذكي', 'غسالة', 'مصعد', 'أمن', 'موقف سيارات', 'إطلالة بحر'],
      fr: ['Piscine commune', 'Centre de fitness', 'WiFi', 'Climatisation', 'Smart TV', 'Lave-linge', 'Ascenseur', 'Sécurité', 'Parking', 'Vue mer']
    },
    features: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      privatePool: false,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: true,
      balcony: true,
      terrace: false,
      gym: true,
      spa: false,
      sauna: false,
      jacuzzi: false,
      bbq: false,
      garden: false
    },
    rules: {
      checkIn: '14:00',
      checkOut: '11:00',
      minStay: 2,
      maxStay: 60,
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true
    },
    host: {
      name: 'Zeynep Demir',
      memberSince: '2020-08-22',
      responseTime: '2 saat içinde',
      responseRate: 98,
      languages: ['Turkish', 'English', 'German'],
      superhost: true,
      verified: true
    },
    location: {
      district: {
        tr: 'Saray Mahallesi',
        en: 'Saray District',
        ru: 'Район Сарай',
        de: 'Saray Bezirk',
        ar: 'حي ساراي',
        fr: 'Quartier Saray'
      },
      address: {
        tr: 'Saray Mahallesi, Atatürk Caddesi, No: 120, Alanya',
        en: 'Saray District, Atatürk Street, No: 120, Alanya',
        ru: 'Район Сарай, улица Ататюрк, № 120, Аланья',
        de: 'Saray Bezirk, Atatürk Straße, Nr. 120, Alanya',
        ar: 'حي ساراي، شارع أتاتورك، رقم: 120، ألانيا',
        fr: 'Quartier Saray, rue Atatürk, n° 120, Alanya'
      },
      coordinates: {
        lat: 36.5438,
        lng: 31.9982
      },
      nearbyAttractions: [
        { tr: 'Kleopatra Plajı', en: 'Cleopatra Beach', ru: 'Пляж Клеопатры', de: 'Kleopatra Strand', ar: 'شاطئ كليوباترا', fr: 'Plage de Cléopâtre' },
        { tr: 'Alanya Kalesi', en: 'Alanya Castle', ru: 'Замок Аланьи', de: 'Burg Alanya', ar: 'قلعة ألانيا', fr: 'Château d\'Alanya' },
        { tr: 'Damlataş Mağarası', en: 'Damlatas Cave', ru: 'Пещера Дамлаташ', de: 'Damlataş Höhle', ar: 'كهف داملاتاش', fr: 'Grotte Damlataş' }
      ],
      distanceToBeach: 200,
      distanceToAirport: 135,
      distanceToCity: 0
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1920&h=1080&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 52,
    instantBook: true,
    cancellationPolicy: 'flexible',
    seo: {
      metaTitle: {
        tr: 'Alanya Merkez Modern 2+1 Daire - Deniz Manzaralı Kiralık Daire',
        en: 'Alanya Center Modern 2+1 Apartment - Sea View Rental',
        ru: 'Современная квартира 2+1 в центре Аланьи - Аренда с видом на море',
        de: 'Alanya Zentrum Moderne 2+1 Wohnung - Meerblick Vermietung',
        ar: 'شقة حديثة 2+1 في وسط ألانيا - إيجار بإطلالة بحرية',
        fr: 'Appartement moderne 2+1 centre Alanya - Location vue mer'
      },
      metaDescription: {
        tr: 'Alanya merkezde 2+1 deniz manzaralı modern daire. Ortak havuz, fitness, plaja 200m. Günlük kiralık daire Alanya.',
        en: 'Modern 2+1 apartment with sea view in Alanya center. Shared pool, fitness, 200m to beach. Daily apartment rental Alanya.',
        ru: 'Современная квартира 2+1 с видом на море в центре Аланьи. Общий бассейн, фитнес, 200м до пляжа. Посуточная аренда Аланья.',
        de: 'Moderne 2+1 Wohnung mit Meerblick im Zentrum von Alanya. Gemeinschaftspool, Fitness, 200m zum Strand. Tagesvermietung Alanya.',
        ar: 'شقة حديثة 2+1 بإطلالة بحرية في وسط ألانيا. مسبح مشترك، لياقة، 200م من الشاطئ. إيجار يومي ألانيا.',
        fr: 'Appartement moderne 2+1 vue mer au centre d\'Alanya. Piscine commune, fitness, 200m de la plage. Location journalière Alanya.'
      },
      keywords: {
        tr: ['alanya kiralık daire', 'alanya merkez daire', 'deniz manzaralı daire alanya', 'günlük kiralık alanya', 'alanya tatil evi'],
        en: ['alanya apartment rental', 'alanya center apartment', 'sea view apartment alanya', 'daily rental alanya', 'alanya vacation home'],
        ru: ['аренда квартиры аланья', 'квартира в центре аланья', 'квартира с видом на море аланья', 'посуточная аренда аланья', 'дом для отпуска аланья'],
        de: ['alanya wohnung mieten', 'alanya zentrum wohnung', 'wohnung meerblick alanya', 'tagesvermietung alanya', 'alanya ferienhaus'],
        ar: ['تأجير شقة ألانيا', 'شقة في وسط ألانيا', 'شقة بإطلالة بحرية ألانيا', 'إيجار يومي ألانيا', 'منزل عطلات ألانيا'],
        fr: ['location appartement alanya', 'appartement centre alanya', 'appartement vue mer alanya', 'location journalière alanya', 'maison vacances alanya']
      },
      slug: {
        tr: 'alanya-merkez-modern-daire-deniz-manzarali',
        en: 'alanya-center-modern-apartment-sea-view',
        ru: 'alanya-centr-sovremennaya-kvartira-vid-more',
        de: 'alanya-zentrum-moderne-wohnung-meerblick',
        ar: 'alanya-markaz-shaqqa-haditha-itlala-bahr',
        fr: 'alanya-centre-appartement-moderne-vue-mer'
      }
    },
    active: true,
    featured: false,
    popular: true,
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-12-18T09:15:00Z'
  },

  // 3. Boutique Hotel - Kaleici (Old Town Antalya)
  {
    id: 'antalya-kaleici-boutique-hotel-003',
    propertyType: 'boutique-hotel',
    region: 'antalya-city',
    name: {
      tr: 'Kaleiçi Butik Otel - Tarihi Taş Ev',
      en: 'Kaleici Boutique Hotel - Historic Stone House',
      ru: 'Бутик-отель в Калеичи - Исторический каменный дом',
      de: 'Kaleici Boutique Hotel - Historisches Steinhaus',
      ar: 'فندق بوتيك في كاليتشي - بيت حجري تاريخي',
      fr: 'Hôtel boutique Kaleici - Maison en pierre historique'
    },
    shortDescription: {
      tr: 'Osmanlı döneminden kalma restore edilmiş taş ev. 6 lüks süit, çatı terası, tarihi dokuya sadık tasarım.',
      en: 'Restored Ottoman stone house. 6 luxury suites, rooftop terrace, authentic historic design.',
      ru: 'Восстановленный османский каменный дом. 6 роскошных люксов, терраса на крыше, аутентичный дизайн.',
      de: 'Restauriertes osmanisches Steinhaus. 6 Luxus-Suiten, Dachterrasse, authentisches historisches Design.',
      ar: 'بيت حجري عثماني مُرمم. 6 أجنحة فاخرة، تراس على السطح، تصميم تاريخي أصيل.',
      fr: 'Maison ottomane en pierre restaurée. 6 suites de luxe, terrasse sur le toit, design historique authentique.'
    },
    longDescription: {
      tr: '18. yüzyıldan kalma ve özenle restore edilmiş taş ev, Kaleiçi\'nin kalbinde yer alıyor. 6 lüks süit, her biri benzersiz dekorasyon. Çatı terası deniz ve Toros Dağları manzaralı. Tarihi limana 100m, müzeler ve galeriler yürüme mesafesinde. Geleneksel Türk misafirperverliği ile modern konfor birleşimi.',
      en: 'Dating back to the 18th century and carefully restored, this stone house is located in the heart of Kaleici. 6 luxury suites, each uniquely decorated. Rooftop terrace with sea and Taurus Mountains views. 100m to historic harbor, museums and galleries within walking distance. Traditional Turkish hospitality meets modern comfort.',
      ru: 'Каменный дом 18-го века, тщательно отреставрированный, находится в самом сердце Калеичи. 6 роскошных люксов, каждый с уникальным декором. Терраса на крыше с видом на море и горы Таурус. 100м до исторической гавани, музеи и галереи в пешей доступности. Традиционное турецкое гостеприимство и современный комфорт.',
      de: 'Aus dem 18. Jahrhundert stammend und sorgfältig restauriert, befindet sich dieses Steinhaus im Herzen von Kaleici. 6 Luxus-Suiten, jede einzigartig dekoriert. Dachterrasse mit Blick auf das Meer und das Taurusgebirge. 100m zum historischen Hafen, Museen und Galerien fußläufig erreichbar. Traditionelle türkische Gastfreundschaft trifft auf modernen Komfort.',
      ar: 'يعود تاريخه إلى القرن الثامن عشر وتم ترميمه بعناية، يقع هذا البيت الحجري في قلب كاليتشي. 6 أجنحة فاخرة، كل منها مزين بشكل فريد. تراس على السطح بإطلالة على البحر وجبال طوروس. 100م من الميناء التاريخي، المتاحف والمعارض على مسافة قريبة. الضيافة التركية التقليدية تلتقي بالراحة الحديثة.',
      fr: 'Datant du 18ème siècle et soigneusement restaurée, cette maison en pierre est située au cœur de Kaleici. 6 suites de luxe, chacune décorée de manière unique. Terrasse sur le toit avec vue sur la mer et les montagnes du Taurus. 100m du port historique, musées et galeries à distance de marche. L\'hospitalité turque traditionnelle rencontre le confort moderne.'
    },
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    pricing: {
      perNight: calculateBestPrice([2200, 2400, 2300]),
      perWeek: calculateBestPrice([2200, 2400, 2300]) * 7 * 0.88,
      perMonth: calculateBestPrice([2200, 2400, 2300]) * 30 * 0.70,
      cleaningFee: 400,
      securityDeposit: 3000,
      competitorPrices: {
        airbnb: 2200,
        booking: 2400,
        vrbo: 2300
      }
    },
    amenities: {
      tr: ['Çatı Terası', 'WiFi', 'Klima', 'Akıllı TV', 'Minibar', 'Kahvaltı Dahil', 'Concierge', 'Oda Servisi', 'Tarihi Bina', 'Deniz Manzarası'],
      en: ['Rooftop Terrace', 'WiFi', 'Air Conditioning', 'Smart TV', 'Minibar', 'Breakfast Included', 'Concierge', 'Room Service', 'Historic Building', 'Sea View'],
      ru: ['Терраса на крыше', 'WiFi', 'Кондиционер', 'Смарт ТВ', 'Мини-бар', 'Завтрак включен', 'Консьерж', 'Обслуживание номеров', 'Историческое здание', 'Вид на море'],
      de: ['Dachterrasse', 'WiFi', 'Klimaanlage', 'Smart TV', 'Minibar', 'Frühstück inbegriffen', 'Concierge', 'Zimmerservice', 'Historisches Gebäude', 'Meerblick'],
      ar: ['تراس على السطح', 'واي فاي', 'تكييف', 'تلفزيون ذكي', 'ميني بار', 'الإفطار مشمول', 'خدمة الكونسيرج', 'خدمة الغرف', 'مبنى تاريخي', 'إطلالة بحرية'],
      fr: ['Terrasse sur le toit', 'WiFi', 'Climatisation', 'Smart TV', 'Minibar', 'Petit-déjeuner inclus', 'Conciergerie', 'Service en chambre', 'Bâtiment historique', 'Vue mer']
    },
    features: {
      wifi: true,
      kitchen: false,
      parking: false,
      pool: false,
      privatePool: false,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: false,
      beachfront: false,
      seaview: true,
      balcony: true,
      terrace: true,
      gym: false,
      spa: false,
      sauna: false,
      jacuzzi: false,
      bbq: false,
      garden: true
    },
    rules: {
      checkIn: '14:00',
      checkOut: '12:00',
      minStay: 1,
      maxStay: 30,
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true
    },
    host: {
      name: 'Ali Toprak',
      memberSince: '2018-03-10',
      responseTime: '30 dakika içinde',
      responseRate: 100,
      languages: ['Turkish', 'English', 'French', 'German'],
      superhost: true,
      verified: true
    },
    location: {
      district: {
        tr: 'Kaleiçi (Eski Şehir)',
        en: 'Kaleici (Old Town)',
        ru: 'Калеичи (Старый город)',
        de: 'Kaleici (Altstadt)',
        ar: 'كاليتشي (المدينة القديمة)',
        fr: 'Kaleici (Vieille ville)'
      },
      address: {
        tr: 'Barbaros Mahallesi, Hesapçı Sokak, No: 8, Muratpaşa',
        en: 'Barbaros District, Hesapçı Street, No: 8, Muratpasa',
        ru: 'Район Барбарос, улица Хесапчи, № 8, Муратпаша',
        de: 'Barbaros Bezirk, Hesapçı Straße, Nr. 8, Muratpasa',
        ar: 'حي باربروس، شارع حسابتشي، رقم: 8، مراتباشا',
        fr: 'Quartier Barbaros, rue Hesapçı, n° 8, Muratpasa'
      },
      coordinates: {
        lat: 36.8841,
        lng: 30.7056
      },
      nearbyAttractions: [
        { tr: 'Hadrian Kapısı', en: 'Hadrian\'s Gate', ru: 'Ворота Адриана', de: 'Hadrianstor', ar: 'بوابة هادريان', fr: 'Porte d\'Hadrien' },
        { tr: 'Kaleiçi Marina', en: 'Kaleici Marina', ru: 'Марина Калеичи', de: 'Kaleici Marina', ar: 'مارينا كاليتشي', fr: 'Marina de Kaleici' },
        { tr: 'Yivli Minare', en: 'Yivli Minaret', ru: 'Минарет Ивли', de: 'Yivli Minarett', ar: 'مئذنة يفلي', fr: 'Minaret Yivli' }
      ],
      distanceToBeach: 500,
      distanceToAirport: 12,
      distanceToCity: 0
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1920&h=1080&fit=crop'
    ],
    rating: 4.95,
    reviewCount: 128,
    instantBook: true,
    cancellationPolicy: 'strict',
    seo: {
      metaTitle: {
        tr: 'Kaleiçi Butik Otel - Tarihi Taş Ev Konaklama Antalya',
        en: 'Kaleici Boutique Hotel - Historic Stone House Stay Antalya',
        ru: 'Бутик-отель Калеичи - Проживание в историческом каменном доме Анталья',
        de: 'Kaleici Boutique Hotel - Aufenthalt im historischen Steinhaus Antalya',
        ar: 'فندق بوتيك كاليتشي - الإقامة في بيت حجري تاريخي أنطاليا',
        fr: 'Hôtel boutique Kaleici - Séjour dans une maison en pierre historique Antalya'
      },
      metaDescription: {
        tr: 'Kaleiçi\'nde 18. yüzyıldan kalma butik otel. 6 lüks süit, çatı terası, tarihi doku. Antalya eski şehir konaklama.',
        en: 'Boutique hotel in Kaleici from 18th century. 6 luxury suites, rooftop terrace, historic character. Antalya old town accommodation.',
        ru: 'Бутик-отель в Калеичи 18-го века. 6 роскошных люксов, терраса на крыше, исторический характер. Размещение в старом городе Антальи.',
        de: 'Boutique-Hotel in Kaleici aus dem 18. Jahrhundert. 6 Luxus-Suiten, Dachterrasse, historischer Charakter. Unterkunft in der Altstadt von Antalya.',
        ar: 'فندق بوتيك في كاليتشي من القرن الثامن عشر. 6 أجنحة فاخرة، تراس على السطح، طابع تاريخي. الإقامة في المدينة القديمة أنطاليا.',
        fr: 'Hôtel boutique à Kaleici du 18ème siècle. 6 suites de luxe, terrasse sur le toit, caractère historique. Hébergement dans la vieille ville d\'Antalya.'
      },
      keywords: {
        tr: ['kaleiçi butik otel', 'antalya tarihi otel', 'eski şehir konaklama', 'butik hotel antalya', 'kaleiçi pansiyon'],
        en: ['kaleici boutique hotel', 'antalya historic hotel', 'old town accommodation', 'boutique hotel antalya', 'kaleici guesthouse'],
        ru: ['бутик-отель калеичи', 'исторический отель анталья', 'размещение в старом городе', 'бутик-отель анталья', 'гостевой дом калеичи'],
        de: ['kaleici boutique hotel', 'antalya historisches hotel', 'altstadt unterkunft', 'boutique hotel antalya', 'kaleici pension'],
        ar: ['فندق بوتيك كاليتشي', 'فندق تاريخي أنطاليا', 'إقامة في المدينة القديمة', 'فندق بوتيك أنطاليا', 'بيت ضيافة كاليتشي'],
        fr: ['hôtel boutique kaleici', 'hôtel historique antalya', 'hébergement vieille ville', 'hôtel boutique antalya', 'pension kaleici']
      },
      slug: {
        tr: 'kaleici-butik-otel-tarihi-tas-ev',
        en: 'kaleici-boutique-hotel-historic-stone-house',
        ru: 'kaleici-butik-otel-istoricheskij-kamennyj-dom',
        de: 'kaleici-boutique-hotel-historisches-steinhaus',
        ar: 'kaleici-boutique-hotel-bayt-hajari-tarikhi',
        fr: 'kaleici-hotel-boutique-maison-pierre-historique'
      }
    },
    active: true,
    featured: true,
    popular: true,
    createdAt: '2023-11-05T08:30:00Z',
    updatedAt: '2024-12-19T14:45:00Z'
  }

  ,

  // 4. Belek Golf Villa
  {
    id: 'antalya-belek-golf-villa-004',
    propertyType: 'villa',
    region: 'belek',
    name: {
      tr: 'Belek Golf Villası - Lüks 5+1',
      en: 'Belek Golf Villa - Luxury 5+1',
      ru: 'Гольф-вилла Белек - Люкс 5+1',
      de: 'Belek Golf Villa - Luxus 5+1',
      ar: 'فيلا جولف بيليك - فاخرة 5+1',
      fr: 'Villa de golf Belek - Luxe 5+1'
    },
    shortDescription: {
      tr: 'Golf sahasına sıfır lüks villa. 5 yatak odası, özel havuz, sauna, spor salonu.',
      en: 'Luxury villa next to golf course. 5 bedrooms, private pool, sauna, gym.',
      ru: 'Роскошная вилла рядом с полем для гольфа. 5 спален, бассейн, сауна, тренажерный зал.',
      de: 'Luxusvilla neben Golfplatz. 5 Schlafzimmer, Pool, Sauna, Fitnessstudio.',
      ar: 'فيلا فاخرة بجوار ملعب الجولف. 5 غرف نوم، مسبح، ساونا، صالة رياضية.',
      fr: 'Villa de luxe près du golf. 5 chambres, piscine, sauna, salle de sport.'
    },
    longDescription: {
      tr: 'Belek\'in prestijli golf bölgesinde 450 m² lüks villa. Profesyonel golf sahalarına yürüme mesafesi. Özel havuz, sauna, jakuzi, spor salonu, oyun odası. 5 yatak odası, her biri ensuite banyo.',
      en: '450 sqm luxury villa in Belek\'s prestigious golf area. Walking distance to professional golf courses. Private pool, sauna, jacuzzi, gym, game room. 5 bedrooms, all ensuite.',
      ru: 'Роскошная вилла 450 кв.м в престижной гольф-зоне Белека. Пешком до профессиональных полей. Частный бассейн, сауна, джакузи, тренажерный зал, игровая комната. 5 спален с ванными.',
      de: '450 qm Luxusvilla im prestigeträchtigen Golfgebiet von Belek. Fußweg zu professionellen Golfplätzen. Privater Pool, Sauna, Jacuzzi, Fitnessstudio, Spielzimmer. 5 Schlafzimmer, alle mit eigenem Bad.',
      ar: 'فيلا فاخرة بمساحة 450 متر مربع في منطقة الجولف المرموقة في بيليك. على مسافة قريبة من ملاعب الجولف. مسبح خاص، ساونا، جاكوزي، صالة رياضية، غرفة ألعاب. 5 غرف نوم بحمامات خاصة.',
      fr: 'Villa de luxe de 450 m² dans le quartier golf prestigieux de Belek. À distance de marche des parcours de golf professionnels. Piscine privée, sauna, jacuzzi, salle de sport, salle de jeux. 5 chambres avec salle de bain.'
    },
    capacity: { guests: 10, bedrooms: 5, beds: 6, bathrooms: 5 },
    pricing: {
      perNight: calculateBestPrice([4500, 4800, 4600]),
      perWeek: calculateBestPrice([4500, 4800, 4600]) * 7 * 0.88,
      perMonth: calculateBestPrice([4500, 4800, 4600]) * 30 * 0.72,
      cleaningFee: 1000,
      securityDeposit: 8000,
      competitorPrices: { airbnb: 4500, booking: 4800, vrbo: 4600 }
    },
    amenities: {
      tr: ['Özel Havuz', 'Sauna', 'Spor Salonu', 'Golf Sahas', 'Jakuzi', 'WiFi', 'Klima', 'Oyun Odası', 'BBQ'],
      en: ['Private Pool', 'Sauna', 'Gym', 'Golf Course', 'Jacuzzi', 'WiFi', 'AC', 'Game Room', 'BBQ'],
      ru: ['Частный бассейн', 'Сауна', 'Тренажерный зал', 'Гольф', 'Джакузи', 'WiFi', 'Кондиционер', 'Игровая', 'Барбекю'],
      de: ['Privatpool', 'Sauna', 'Fitnessstudio', 'Golfplatz', 'Whirlpool', 'WiFi', 'Klimaanlage', 'Spielzimmer', 'Grill'],
      ar: ['مسبح خاص', 'ساونا', 'صالة رياضية', 'ملعب جولف', 'جاكوزي', 'واي فاي', 'تكييف', 'غرفة ألعاب', 'شواء'],
      fr: ['Piscine privée', 'Sauna', 'Salle de sport', 'Golf', 'Jacuzzi', 'WiFi', 'Climatisation', 'Salle de jeux', 'Barbecue']
    },
    features: {
      wifi: true, kitchen: true, parking: true, pool: true, privatePool: true,
      airConditioning: true, heating: true, tv: true, washer: true, beachfront: false,
      seaview: false, balcony: true, terrace: true, gym: true, spa: false,
      sauna: true, jacuzzi: true, bbq: true, garden: true
    },
    rules: {
      checkIn: '15:00', checkOut: '11:00', minStay: 5, maxStay: 90,
      petsAllowed: false, smokingAllowed: false, partiesAllowed: false, childrenAllowed: true
    },
    host: {
      name: 'Can Yıldız', memberSince: '2019-07-20', responseTime: '1 saat içinde',
      responseRate: 100, languages: ['Turkish', 'English', 'Russian'], superhost: true, verified: true
    },
    location: {
      district: { tr: 'Belek', en: 'Belek', ru: 'Белек', de: 'Belek', ar: 'بيليك', fr: 'Belek' },
      address: { tr: 'Belek Golf Sahası, İskele Mevkii', en: 'Belek Golf Course, İskele Location', ru: 'Гольф-поле Белек, район Искеле', de: 'Belek Golfplatz, İskele Gebiet', ar: 'ملعب جولف بيليك، منطقة إسكيلي', fr: 'Terrain de golf Belek, zone İskele' },
      coordinates: { lat: 36.8625, lng: 31.0525 },
      nearbyAttractions: [
        { tr: 'National Golf Club', en: 'National Golf Club', ru: 'Национальный гольф-клуб', de: 'National Golfclub', ar: 'نادي الجولف الوطني', fr: 'Club de golf national' },
        { tr: 'The Land of Legends', en: 'The Land of Legends', ru: 'Земля легенд', de: 'Land der Legenden', ar: 'أرض الأساطير', fr: 'Terre des légendes' }
      ],
      distanceToBeach: 3000, distanceToAirport: 35, distanceToCity: 40
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop'
    ],
    rating: 4.8, reviewCount: 45, instantBook: true, cancellationPolicy: 'moderate',
    seo: {
      metaTitle: { tr: 'Belek Golf Villası - Lüks Villa Kiralama', en: 'Belek Golf Villa - Luxury Villa Rental', ru: 'Гольф-вилла Белек - Аренда роскошной виллы', de: 'Belek Golf Villa - Luxus Villa Vermietung', ar: 'فيلا جولف بيليك - تأجير فيلا فاخرة', fr: 'Villa de golf Belek - Location villa de luxe' },
      metaDescription: { tr: '5 yatak odalı golf villası. Özel havuz, sauna, spor salonu. Belek lüks villa kiralama.', en: '5-bedroom golf villa. Private pool, sauna, gym. Belek luxury villa rental.', ru: 'Гольф-вилла с 5 спальнями. Частный бассейн, сауна, тренажерный зал. Аренда роскошной виллы Белек.', de: 'Golf-Villa mit 5 Schlafzimmern. Privatpool, Sauna, Fitnessstudio. Belek Luxusvilla Vermietung.', ar: 'فيلا جولف 5 غرف نوم. مسبح خاص، ساونا، صالة رياضية. تأجير فيلا فاخرة بيليك.', fr: 'Villa de golf 5 chambres. Piscine privée, sauna, salle de sport. Location villa de luxe Belek.' },
      keywords: { tr: ['belek villa', 'golf villası', 'lüks villa belek'], en: ['belek villa', 'golf villa', 'luxury villa belek'], ru: ['вилла белек', 'гольф-вилла', 'роскошная вилла белек'], de: ['belek villa', 'golf villa', 'luxusvilla belek'], ar: ['فيلا بيليك', 'فيلا جولف', 'فيلا فاخرة بيليك'], fr: ['villa belek', 'villa golf', 'villa luxe belek'] },
      slug: { tr: 'belek-golf-villasi-luks', en: 'belek-golf-villa-luxury', ru: 'belek-golf-villa-lux', de: 'belek-golf-villa-luxus', ar: 'belek-golf-villa-luxury', fr: 'belek-golf-villa-luxe' }
    },
    active: true, featured: false, popular: true,
    createdAt: '2024-03-12T11:00:00Z', updatedAt: '2024-12-21T10:30:00Z'
  }

  // Properties 5-23 would follow the same pattern with different regions:
  // - Side beachfront apartments
  // - Kemer mountain view villas
  // - Konyaalti luxury penthouses
  // - Kundu resort apartments
  // - Alanya Mahmutlar apartments
  // - Antalya city center studios
  // - Lara beach apartments
  // - Belek family villas
  // - Side antique city boutique hotels
  // etc.
];

// Export utility function to calculate price savings
export const getRentalPriceSavings = (property: AntalyaRentalProperty): number => {
  const competitorPrices = property.pricing.competitorPrices;
  if (!competitorPrices) return 0;

  const avgCompetitorPrice = (
    competitorPrices.airbnb +
    competitorPrices.booking +
    competitorPrices.vrbo
  ) / 3;

  return Math.round(avgCompetitorPrice - property.pricing.perNight);
};

// Export function to get properties by region
export const getPropertiesByRegion = (region: string): AntalyaRentalProperty[] => {
  return antalyaRentals.filter(property => property.region === region && property.active);
};

// Export function to get featured properties
export const getFeaturedProperties = (): AntalyaRentalProperty[] => {
  return antalyaRentals.filter(property => property.featured && property.active);
};

// Export function to get popular properties
export const getPopularProperties = (): AntalyaRentalProperty[] => {
  return antalyaRentals.filter(property => property.popular && property.active);
};

export default antalyaRentals;
