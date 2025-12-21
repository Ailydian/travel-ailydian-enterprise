/**
 * Antalya Bölgesi - Havalimanı Transfer Lokasyonları
 * Comprehensive location database for Antalya region airport transfers
 */

export interface TransferLocation {
  id: string;
  name: string;
  nameEn: string;
  type: 'airport' | 'district' | 'hotel_zone' | 'town';
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromAYT: number; // km from Antalya Airport
  distanceFromGZP: number; // km from Gazipaşa Airport
  transferDuration: {
    fromAYT: number; // minutes
    fromGZP: number; // minutes
  };
  popular: boolean;
  hotelCount?: number;
  keywords: string[]; // SEO keywords
}

// Havalimanları
export const ANTALYA_AIRPORTS: TransferLocation[] = [
  {
    id: 'AYT',
    name: 'Antalya Havalimanı',
    nameEn: 'Antalya Airport',
    type: 'airport',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.8987, lng: 30.8005 },
    distanceFromAYT: 0,
    distanceFromGZP: 180,
    transferDuration: { fromAYT: 0, fromGZP: 150 },
    popular: true,
    keywords: ['antalya havalimanı', 'antalya airport', 'ayt', 'havalimani transfer']
  },
  {
    id: 'GZP',
    name: 'Gazipaşa Alanya Havalimanı',
    nameEn: 'Gazipasa Alanya Airport',
    type: 'airport',
    region: 'Gazipaşa',
    coordinates: { lat: 36.2992, lng: 32.3006 },
    distanceFromAYT: 180,
    distanceFromGZP: 0,
    transferDuration: { fromAYT: 150, fromGZP: 0 },
    popular: true,
    keywords: ['gazipaşa havalimanı', 'alanya havalimanı', 'gazipasa airport', 'gzp']
  }
];

// Antalya İlçeleri ve Bölgeleri
export const ANTALYA_LOCATIONS: TransferLocation[] = [
  // Merkez İlçeler
  {
    id: 'konyaalti',
    name: 'Konyaaltı',
    nameEn: 'Konyaalti',
    type: 'district',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.8841, lng: 30.6278 },
    distanceFromAYT: 15,
    distanceFromGZP: 195,
    transferDuration: { fromAYT: 20, fromGZP: 165 },
    popular: true,
    hotelCount: 120,
    keywords: ['konyaaltı transfer', 'konyaalti hotels', 'antalya konyaaltı']
  },
  {
    id: 'lara',
    name: 'Lara',
    nameEn: 'Lara',
    type: 'hotel_zone',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.8330, lng: 30.7627 },
    distanceFromAYT: 12,
    distanceFromGZP: 192,
    transferDuration: { fromAYT: 15, fromGZP: 160 },
    popular: true,
    hotelCount: 85,
    keywords: ['lara beach', 'lara hotels', 'lara transfer', 'antalya lara']
  },
  {
    id: 'kundu',
    name: 'Kundu',
    nameEn: 'Kundu',
    type: 'hotel_zone',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.8520, lng: 30.8130 },
    distanceFromAYT: 8,
    distanceFromGZP: 188,
    transferDuration: { fromAYT: 12, fromGZP: 158 },
    popular: true,
    hotelCount: 45,
    keywords: ['kundu hotels', 'kundu transfer', 'kundu lara']
  },
  {
    id: 'kepez',
    name: 'Kepez',
    nameEn: 'Kepez',
    type: 'district',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.9225, lng: 30.7245 },
    distanceFromAYT: 18,
    distanceFromGZP: 198,
    transferDuration: { fromAYT: 25, fromGZP: 170 },
    popular: false,
    hotelCount: 15,
    keywords: ['kepez transfer', 'antalya kepez']
  },
  {
    id: 'muratpasa',
    name: 'Muratpaşa',
    nameEn: 'Muratpasa',
    type: 'district',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.8833, lng: 30.7000 },
    distanceFromAYT: 13,
    distanceFromGZP: 193,
    transferDuration: { fromAYT: 18, fromGZP: 163 },
    popular: true,
    hotelCount: 95,
    keywords: ['muratpaşa transfer', 'antalya merkez', 'old town antalya']
  },
  {
    id: 'kaleici',
    name: 'Kaleiçi (Old Town)',
    nameEn: 'Kaleici Old Town',
    type: 'hotel_zone',
    region: 'Antalya Merkez',
    coordinates: { lat: 36.8845, lng: 30.7056 },
    distanceFromAYT: 14,
    distanceFromGZP: 194,
    transferDuration: { fromAYT: 20, fromGZP: 164 },
    popular: true,
    hotelCount: 65,
    keywords: ['kaleiçi', 'kaleici', 'old town', 'antalya old town', 'historic center']
  },

  // Batı Sahil (Western Coast)
  {
    id: 'kemer',
    name: 'Kemer',
    nameEn: 'Kemer',
    type: 'district',
    region: 'Batı Sahil',
    coordinates: { lat: 36.6025, lng: 30.5594 },
    distanceFromAYT: 45,
    distanceFromGZP: 225,
    transferDuration: { fromAYT: 50, fromGZP: 200 },
    popular: true,
    hotelCount: 180,
    keywords: ['kemer transfer', 'kemer hotels', 'kemer antalya', 'kemer beach']
  },
  {
    id: 'beldibi',
    name: 'Beldibi',
    nameEn: 'Beldibi',
    type: 'hotel_zone',
    region: 'Batı Sahil',
    coordinates: { lat: 36.7244, lng: 30.6342 },
    distanceFromAYT: 28,
    distanceFromGZP: 208,
    transferDuration: { fromAYT: 35, fromGZP: 180 },
    popular: true,
    hotelCount: 25,
    keywords: ['beldibi transfer', 'beldibi hotels', 'beldibi kemer']
  },
  {
    id: 'goynuk',
    name: 'Göynük',
    nameEn: 'Goynuk',
    type: 'town',
    region: 'Batı Sahil',
    coordinates: { lat: 36.6761, lng: 30.5489 },
    distanceFromAYT: 35,
    distanceFromGZP: 215,
    transferDuration: { fromAYT: 42, fromGZP: 190 },
    popular: true,
    hotelCount: 35,
    keywords: ['göynük transfer', 'goynuk kemer', 'goynuk hotels']
  },
  {
    id: 'kiris',
    name: 'Kiriş',
    nameEn: 'Kiris',
    type: 'town',
    region: 'Batı Sahil',
    coordinates: { lat: 36.5819, lng: 30.5372 },
    distanceFromAYT: 50,
    distanceFromGZP: 230,
    transferDuration: { fromAYT: 55, fromGZP: 205 },
    popular: true,
    hotelCount: 18,
    keywords: ['kiriş transfer', 'kiris kemer', 'kiris hotels']
  },
  {
    id: 'camyuva',
    name: 'Çamyuva',
    nameEn: 'Camyuva',
    type: 'town',
    region: 'Batı Sahil',
    coordinates: { lat: 36.6156, lng: 30.5225 },
    distanceFromAYT: 48,
    distanceFromGZP: 228,
    transferDuration: { fromAYT: 52, fromGZP: 203 },
    popular: true,
    hotelCount: 22,
    keywords: ['çamyuva transfer', 'camyuva kemer', 'camyuva hotels']
  },
  {
    id: 'tekirova',
    name: 'Tekirova',
    nameEn: 'Tekirova',
    type: 'town',
    region: 'Batı Sahil',
    coordinates: { lat: 36.5186, lng: 30.5233 },
    distanceFromAYT: 62,
    distanceFromGZP: 242,
    transferDuration: { fromAYT: 70, fromGZP: 220 },
    popular: true,
    hotelCount: 28,
    keywords: ['tekirova transfer', 'tekirova hotels', 'tekirova kemer']
  },
  {
    id: 'cirali',
    name: 'Çıralı',
    nameEn: 'Cirali',
    type: 'town',
    region: 'Batı Sahil',
    coordinates: { lat: 36.4158, lng: 30.4761 },
    distanceFromAYT: 80,
    distanceFromGZP: 260,
    transferDuration: { fromAYT: 90, fromGZP: 240 },
    popular: false,
    hotelCount: 12,
    keywords: ['çıralı transfer', 'cirali beach', 'olympos cirali']
  },

  // Doğu Sahil (Eastern Coast)
  {
    id: 'belek',
    name: 'Belek',
    nameEn: 'Belek',
    type: 'hotel_zone',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.8628, lng: 31.0556 },
    distanceFromAYT: 35,
    distanceFromGZP: 145,
    transferDuration: { fromAYT: 35, fromGZP: 120 },
    popular: true,
    hotelCount: 95,
    keywords: ['belek transfer', 'belek hotels', 'belek golf', 'belek antalya']
  },
  {
    id: 'kadriye',
    name: 'Kadriye',
    nameEn: 'Kadriye',
    type: 'hotel_zone',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.8750, lng: 31.0200 },
    distanceFromAYT: 28,
    distanceFromGZP: 152,
    transferDuration: { fromAYT: 30, fromGZP: 125 },
    popular: true,
    hotelCount: 42,
    keywords: ['kadriye transfer', 'kadriye belek', 'kadriye hotels']
  },
  {
    id: 'side',
    name: 'Side',
    nameEn: 'Side',
    type: 'district',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7674, lng: 31.3889 },
    distanceFromAYT: 65,
    distanceFromGZP: 115,
    transferDuration: { fromAYT: 60, fromGZP: 90 },
    popular: true,
    hotelCount: 145,
    keywords: ['side transfer', 'side hotels', 'side antalya', 'side beach']
  },
  {
    id: 'colakli',
    name: 'Çolaklı',
    nameEn: 'Colakli',
    type: 'town',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7894, lng: 31.4500 },
    distanceFromAYT: 70,
    distanceFromGZP: 110,
    transferDuration: { fromAYT: 65, fromGZP: 85 },
    popular: true,
    hotelCount: 38,
    keywords: ['çolaklı transfer', 'colakli side', 'colakli hotels']
  },
  {
    id: 'evrenseki',
    name: 'Evrenseki',
    nameEn: 'Evrenseki',
    type: 'town',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7556, lng: 31.4200 },
    distanceFromAYT: 68,
    distanceFromGZP: 112,
    transferDuration: { fromAYT: 63, fromGZP: 88 },
    popular: true,
    hotelCount: 25,
    keywords: ['evrenseki transfer', 'evrenseki side', 'evrenseki hotels']
  },
  {
    id: 'kumkoy',
    name: 'Kumköy',
    nameEn: 'Kumkoy',
    type: 'town',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7450, lng: 31.3650 },
    distanceFromAYT: 63,
    distanceFromGZP: 117,
    transferDuration: { fromAYT: 58, fromGZP: 93 },
    popular: true,
    hotelCount: 32,
    keywords: ['kumköy transfer', 'kumkoy side', 'kumkoy hotels']
  },
  {
    id: 'sorgun',
    name: 'Sorgun',
    nameEn: 'Sorgun',
    type: 'town',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7650, lng: 31.3500 },
    distanceFromAYT: 62,
    distanceFromGZP: 118,
    transferDuration: { fromAYT: 57, fromGZP: 94 },
    popular: true,
    hotelCount: 28,
    keywords: ['sorgun transfer', 'sorgun side', 'sorgun hotels']
  },
  {
    id: 'titreyengol',
    name: 'Titreyengöl',
    nameEn: 'Titreyengol',
    type: 'town',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7850, lng: 31.4100 },
    distanceFromAYT: 66,
    distanceFromGZP: 114,
    transferDuration: { fromAYT: 61, fromGZP: 90 },
    popular: true,
    hotelCount: 20,
    keywords: ['titreyengöl transfer', 'titreyengol side', 'titreyengol hotels']
  },

  // Alanya Bölgesi
  {
    id: 'alanya',
    name: 'Alanya',
    nameEn: 'Alanya',
    type: 'district',
    region: 'Alanya',
    coordinates: { lat: 36.5444, lng: 31.9956 },
    distanceFromAYT: 135,
    distanceFromGZP: 45,
    transferDuration: { fromAYT: 120, fromGZP: 40 },
    popular: true,
    hotelCount: 250,
    keywords: ['alanya transfer', 'alanya hotels', 'alanya beach', 'alanya antalya']
  },
  {
    id: 'avsallar',
    name: 'Avsallar',
    nameEn: 'Avsallar',
    type: 'town',
    region: 'Alanya',
    coordinates: { lat: 36.6333, lng: 31.7167 },
    distanceFromAYT: 95,
    distanceFromGZP: 85,
    transferDuration: { fromAYT: 90, fromGZP: 70 },
    popular: true,
    hotelCount: 35,
    keywords: ['avsallar transfer', 'avsallar alanya', 'avsallar hotels']
  },
  {
    id: 'incekum',
    name: 'İncekum',
    nameEn: 'Incekum',
    type: 'town',
    region: 'Alanya',
    coordinates: { lat: 36.5700, lng: 31.8700 },
    distanceFromAYT: 115,
    distanceFromGZP: 65,
    transferDuration: { fromAYT: 105, fromGZP: 55 },
    popular: true,
    hotelCount: 28,
    keywords: ['incekum transfer', 'incekum alanya', 'incekum hotels']
  },
  {
    id: 'konakli',
    name: 'Konaklı',
    nameEn: 'Konakli',
    type: 'town',
    region: 'Alanya',
    coordinates: { lat: 36.6167, lng: 31.7833 },
    distanceFromAYT: 105,
    distanceFromGZP: 75,
    transferDuration: { fromAYT: 95, fromGZP: 65 },
    popular: true,
    hotelCount: 42,
    keywords: ['konaklı transfer', 'konakli alanya', 'konakli hotels']
  },
  {
    id: 'mahmutlar',
    name: 'Mahmutlar',
    nameEn: 'Mahmutlar',
    type: 'town',
    region: 'Alanya',
    coordinates: { lat: 36.4992, lng: 32.0547 },
    distanceFromAYT: 145,
    distanceFromGZP: 35,
    transferDuration: { fromAYT: 130, fromGZP: 30 },
    popular: true,
    hotelCount: 38,
    keywords: ['mahmutlar transfer', 'mahmutlar alanya', 'mahmutlar hotels']
  },
  {
    id: 'turkler',
    name: 'Türkler',
    nameEn: 'Turkler',
    type: 'town',
    region: 'Alanya',
    coordinates: { lat: 36.5933, lng: 31.8400 },
    distanceFromAYT: 110,
    distanceFromGZP: 70,
    transferDuration: { fromAYT: 100, fromGZP: 60 },
    popular: true,
    hotelCount: 32,
    keywords: ['türkler transfer', 'turkler alanya', 'turkler hotels']
  },
  {
    id: 'okurcalar',
    name: 'Okurcalar',
    nameEn: 'Okurcalar',
    type: 'town',
    region: 'Alanya',
    coordinates: { lat: 36.6500, lng: 31.6833 },
    distanceFromAYT: 88,
    distanceFromGZP: 92,
    transferDuration: { fromAYT: 80, fromGZP: 75 },
    popular: true,
    hotelCount: 24,
    keywords: ['okurcalar transfer', 'okurcalar alanya', 'okurcalar hotels']
  },

  // Gazipaşa Bölgesi
  {
    id: 'gazipasa',
    name: 'Gazipaşa',
    nameEn: 'Gazipasa',
    type: 'district',
    region: 'Gazipaşa',
    coordinates: { lat: 36.2687, lng: 32.3115 },
    distanceFromAYT: 180,
    distanceFromGZP: 5,
    transferDuration: { fromAYT: 150, fromGZP: 10 },
    popular: true,
    hotelCount: 18,
    keywords: ['gazipaşa transfer', 'gazipasa hotels', 'gazipasa antalya']
  },

  // İç Bölgeler
  {
    id: 'manavgat',
    name: 'Manavgat',
    nameEn: 'Manavgat',
    type: 'district',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.7867, lng: 31.4419 },
    distanceFromAYT: 72,
    distanceFromGZP: 108,
    transferDuration: { fromAYT: 65, fromGZP: 85 },
    popular: true,
    hotelCount: 55,
    keywords: ['manavgat transfer', 'manavgat hotels', 'manavgat side']
  },
  {
    id: 'serik',
    name: 'Serik',
    nameEn: 'Serik',
    type: 'district',
    region: 'Doğu Sahil',
    coordinates: { lat: 36.9167, lng: 31.1000 },
    distanceFromAYT: 32,
    distanceFromGZP: 148,
    transferDuration: { fromAYT: 30, fromGZP: 120 },
    popular: false,
    hotelCount: 8,
    keywords: ['serik transfer', 'serik antalya']
  }
];

// All locations combined
export const ALL_ANTALYA_LOCATIONS = [...ANTALYA_AIRPORTS, ...ANTALYA_LOCATIONS];

// Helper functions
export function getLocationById(id: string): TransferLocation | undefined {
  return ALL_ANTALYA_LOCATIONS.find(loc => loc.id === id);
}

export function getPopularLocations(): TransferLocation[] {
  return ALL_ANTALYA_LOCATIONS.filter(loc => loc.popular);
}

export function getLocationsByRegion(region: string): TransferLocation[] {
  return ALL_ANTALYA_LOCATIONS.filter(loc => loc.region === region);
}

export function searchLocations(query: string): TransferLocation[] {
  const q = query.toLowerCase();
  return ALL_ANTALYA_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(q) ||
    loc.nameEn.toLowerCase().includes(q) ||
    loc.keywords.some(k => k.toLowerCase().includes(q))
  );
}

// SEO Keywords for Antalya Transfer
export const ANTALYA_TRANSFER_KEYWORDS = [
  'antalya havalimanı transfer',
  'antalya airport transfer',
  'gazipaşa havalimanı transfer',
  'alanya transfer',
  'belek transfer',
  'side transfer',
  'kemer transfer',
  'lara transfer',
  'antalya vip transfer',
  'antalya özel transfer',
  'antalya private transfer',
  'antalya shuttle',
  'antalya taxi',
  'airport to hotel antalya',
  'antalya hotel transfer',
  'ucuz transfer antalya',
  'cheap transfer antalya',
  'akdeniz transfer',
  'mediterranean transfer'
];

// Popular Transfer Routes with SEO Content
export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  fromLocation: TransferLocation;
  toLocation: TransferLocation;
  distance: number;
  duration: number;
  basePrice: number;
  popular: boolean;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  seoKeywords: string[];
  highlights: string[];
}

export const POPULAR_TRANSFER_ROUTES: PopularRoute[] = [
  {
    id: 'ayt-alanya',
    from: 'AYT',
    to: 'alanya',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'alanya')!,
    distance: 135,
    duration: 120,
    basePrice: 1150,
    popular: true,
    title: 'Antalya Havalimanı - Alanya Transfer',
    titleEn: 'Antalya Airport - Alanya Transfer',
    description: 'Antalya Havalimanı\'ndan Alanya\'ya konforlu ve güvenli transfer hizmeti. 7/24 profesyonel şoför eşliğinde, klimalı araçlarla 2 saatte Alanya\'ya ulaşın. VIP ve ekonomik seçeneklerimizle her bütçeye uygun çözümler.',
    descriptionEn: 'Comfortable and safe transfer service from Antalya Airport to Alanya. Reach Alanya in 2 hours with professional drivers 24/7 in air-conditioned vehicles.',
    seoKeywords: ['antalya alanya transfer', 'antalya airport alanya', 'ayt alanya transfer', 'alanya airport shuttle'],
    highlights: ['135 km mesafe', '2 saat süre', 'Otel kapısına teslim', '24/7 hizmet', 'Ücretsiz beklem']
  },
  {
    id: 'gzp-alanya',
    from: 'GZP',
    to: 'alanya',
    fromLocation: ANTALYA_AIRPORTS[1],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'alanya')!,
    distance: 45,
    duration: 40,
    basePrice: 450,
    popular: true,
    title: 'Gazipaşa Havalimanı - Alanya Transfer',
    titleEn: 'Gazipasa Airport - Alanya Transfer',
    description: 'Gazipaşa Alanya Havalimanı\'ndan Alanya merkeze en hızlı ve uygun transfer! Sadece 40 dakikada, profesyonel şoförlerimizle otelinizdeyiz. Havalimanından çıkışta karşılama hizmeti dahil.',
    descriptionEn: 'Fastest and most affordable transfer from Gazipasa Alanya Airport to Alanya center! We arrive at your hotel in just 40 minutes with our professional drivers.',
    seoKeywords: ['gazipaşa alanya transfer', 'gzp alanya transfer', 'gazipasa airport transfer', 'alanya gazipasa taxi'],
    highlights: ['45 km mesafe', '40 dakika', 'Havalimanı karşılama', 'Uygun fiyat', 'Hızlı ulaşım']
  },
  {
    id: 'ayt-belek',
    from: 'AYT',
    to: 'belek',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'belek')!,
    distance: 35,
    duration: 35,
    basePrice: 350,
    popular: true,
    title: 'Antalya Havalimanı - Belek Transfer',
    titleEn: 'Antalya Airport - Belek Transfer',
    description: 'Antalya Havalimanı\'ndan Belek\'e lüks ve konforlu transfer. Golf otelleri ve 5 yıldızlı tesislere özel VIP transfer hizmeti. Sadece 35 dakikada otelinizdeyiz. Mercedes araçlarla premium hizmet.',
    descriptionEn: 'Luxury and comfortable transfer from Antalya Airport to Belek. VIP transfer service to golf hotels and 5-star facilities.',
    seoKeywords: ['antalya belek transfer', 'belek airport transfer', 'belek vip transfer', 'antalya airport belek'],
    highlights: ['35 km mesafe', '35 dakika', 'VIP araçlar', 'Golf otelleri', 'Premium hizmet']
  },
  {
    id: 'ayt-side',
    from: 'AYT',
    to: 'side',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'side')!,
    distance: 65,
    duration: 60,
    basePrice: 600,
    popular: true,
    title: 'Antalya Havalimanı - Side Transfer',
    titleEn: 'Antalya Airport - Side Transfer',
    description: 'Antalya Havalimanı\'ndan Side\'ye güvenli transfer hizmeti. Antik Side\'nin eşsiz tatil bölgesine 1 saatte ulaşın. Manavgat, Kumköy, Sorgun ve Çolaklı bölgelerine de hizmet veriyoruz.',
    descriptionEn: 'Safe transfer service from Antalya Airport to Side. Reach the unique holiday region of ancient Side in 1 hour.',
    seoKeywords: ['antalya side transfer', 'side airport transfer', 'antalya airport side', 'side taxi'],
    highlights: ['65 km mesafe', '1 saat süre', 'Tüm Side bölgeleri', 'Güvenli sürüş', 'Ailelere ideal']
  },
  {
    id: 'ayt-kemer',
    from: 'AYT',
    to: 'kemer',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'kemer')!,
    distance: 45,
    duration: 50,
    basePrice: 450,
    popular: true,
    title: 'Antalya Havalimanı - Kemer Transfer',
    titleEn: 'Antalya Airport - Kemer Transfer',
    description: 'Antalya Havalimanı\'ndan Kemer\'e panoramik deniz manzaralı transfer rotası. Beldibi, Göynük, Çamyuva, Tekirova gibi tüm Kemer bölgelerine hizmet. 50 dakikada Akdeniz\'in incisindeyiz.',
    descriptionEn: 'Panoramic sea view transfer route from Antalya Airport to Kemer. Service to all Kemer regions including Beldibi, Goynuk, Camyuva, Tekirova.',
    seoKeywords: ['antalya kemer transfer', 'kemer airport transfer', 'kemer shuttle', 'antalya airport kemer'],
    highlights: ['45 km mesafe', '50 dakika', 'Deniz manzarası', 'Tüm Kemer bölgesi', 'Konforlu araçlar']
  },
  {
    id: 'ayt-lara',
    from: 'AYT',
    to: 'lara',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'lara')!,
    distance: 12,
    duration: 15,
    basePrice: 250,
    popular: true,
    title: 'Antalya Havalimanı - Lara Transfer',
    titleEn: 'Antalya Airport - Lara Transfer',
    description: 'Antalya Havalimanı\'ndan Lara Beach\'e en hızlı transfer! Sadece 15 dakikada lüks otellerin bulunduğu Lara sahiline ulaşın. Kundu bölgesine de hizmet veriyoruz.',
    descriptionEn: 'Fastest transfer from Antalya Airport to Lara Beach! Reach Lara coast with luxury hotels in just 15 minutes.',
    seoKeywords: ['antalya lara transfer', 'lara beach transfer', 'lara airport transfer', 'kundu transfer'],
    highlights: ['12 km mesafe', '15 dakika', 'Hızlı ulaşım', 'Lara Beach', 'Lüks oteller']
  },
  {
    id: 'ayt-mahmutlar',
    from: 'AYT',
    to: 'mahmutlar',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'mahmutlar')!,
    distance: 145,
    duration: 130,
    basePrice: 1250,
    popular: true,
    title: 'Antalya Havalimanı - Mahmutlar Transfer',
    titleEn: 'Antalya Airport - Mahmutlar Transfer',
    description: 'Antalya Havalimanı\'ndan Mahmutlar\'a direkt transfer hizmeti. Alanya\'nın en popüler tatil bölgelerinden Mahmutlar\'a 2 saat 10 dakikada ulaşın. Rusça konuşan şoför seçeneği mevcut.',
    descriptionEn: 'Direct transfer service from Antalya Airport to Mahmutlar. Reach Mahmutlar, one of Alanya\'s most popular holiday regions, in 2 hours 10 minutes.',
    seoKeywords: ['antalya mahmutlar transfer', 'mahmutlar airport transfer', 'mahmutlar alanya transfer'],
    highlights: ['145 km mesafe', '2 saat 10 dakika', 'Rusça hizmet', 'Direkt güzergah', 'Konforlu yolculuk']
  },
  {
    id: 'gzp-mahmutlar',
    from: 'GZP',
    to: 'mahmutlar',
    fromLocation: ANTALYA_AIRPORTS[1],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'mahmutlar')!,
    distance: 35,
    duration: 30,
    basePrice: 350,
    popular: true,
    title: 'Gazipaşa Havalimanı - Mahmutlar Transfer',
    titleEn: 'Gazipasa Airport - Mahmutlar Transfer',
    description: 'Gazipaşa Havalimanı\'ndan Mahmutlar\'a en yakın ve ekonomik transfer çözümü. 30 dakikada Mahmutlar\'daki otelinizdeyiz. Erken rezervasyonda %10 indirim!',
    descriptionEn: 'Closest and most economical transfer solution from Gazipasa Airport to Mahmutlar. We are at your hotel in Mahmutlar in 30 minutes.',
    seoKeywords: ['gazipaşa mahmutlar transfer', 'gzp mahmutlar', 'gazipasa airport mahmutlar'],
    highlights: ['35 km mesafe', '30 dakika', 'En yakın havalimanı', 'Ekonomik fiyat', 'Hızlı transfer']
  },
  {
    id: 'ayt-konakli',
    from: 'AYT',
    to: 'konakli',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'konakli')!,
    distance: 105,
    duration: 95,
    basePrice: 950,
    popular: true,
    title: 'Antalya Havalimanı - Konaklı Transfer',
    titleEn: 'Antalya Airport - Konakli Transfer',
    description: 'Antalya Havalimanı\'ndan Konaklı\'ya özel transfer hizmeti. Alanya\'nın sakin ve huzurlu tatil bölgesi Konaklı\'ya 1 saat 35 dakikada konforlu yolculuk. Aile dostu araç seçenekleri.',
    descriptionEn: 'Private transfer service from Antalya Airport to Konakli. Comfortable journey to Konakli, Alanya\'s calm and peaceful holiday region, in 1 hour 35 minutes.',
    seoKeywords: ['antalya konaklı transfer', 'konakli airport transfer', 'konakli alanya transfer'],
    highlights: ['105 km mesafe', '1 saat 35 dakika', 'Aile dostu', 'Sakin bölge', 'Konforlu araçlar']
  },
  {
    id: 'ayt-kaleici',
    from: 'AYT',
    to: 'kaleici',
    fromLocation: ANTALYA_AIRPORTS[0],
    toLocation: ANTALYA_LOCATIONS.find(l => l.id === 'kaleici')!,
    distance: 14,
    duration: 20,
    basePrice: 280,
    popular: true,
    title: 'Antalya Havalimanı - Kaleiçi Transfer',
    titleEn: 'Antalya Airport - Kaleici Transfer',
    description: 'Antalya Havalimanı\'ndan tarihi Kaleiçi\'ne (Old Town) butik otel transferi. Dar sokaklar için özel araçlarla, 20 dakikada Antalya\'nın tarihi merkezindeyiz. Butik otellere özel servis.',
    descriptionEn: 'Boutique hotel transfer from Antalya Airport to historic Kaleici (Old Town). Special vehicles for narrow streets, arrive in Antalya\'s historic center in 20 minutes.',
    seoKeywords: ['antalya kaleiçi transfer', 'kaleici old town transfer', 'antalya old town airport'],
    highlights: ['14 km mesafe', '20 dakika', 'Butik oteller', 'Tarihi merkez', 'Özel araçlar']
  }
];
