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
