/**
 * Advanced Location Service - Ultra Premium
 * Comprehensive location autocomplete with fuzzy search, international support
 * Real-time suggestions, geo-location, and distance calculations
 */

import { ALL_ANTALYA_LOCATIONS, TransferLocation } from '@/data/antalya-transfer-locations';

export interface AdvancedLocationSuggestion {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  region?: string;
  country: string;
  countryCode: string;
  type: 'city' | 'airport' | 'hotel' | 'region' | 'district' | 'hotel_zone' | 'town';
  code?: string; // Airport code like IST, AYT
  coordinates?: {
    lat: number;
    lng: number;
  };
  distance?: number; // Distance from user location in km
  popular: boolean;
  hotelCount?: number;
  keywords: string[];
  matchScore?: number; // Relevance score for search results
}

// Comprehensive location database - Turkey + International
const COMPREHENSIVE_LOCATIONS: AdvancedLocationSuggestion[] = [
  // Turkish Airports
  {
    id: 'ist-city', name: 'İstanbul', nameEn: 'Istanbul', city: 'İstanbul',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 41.0082, lng: 28.9784 },
    keywords: ['istanbul', 'İstanbul', 'стамбул', 'اسطنبول']
  },
  {
    id: 'ist-airport', name: 'İstanbul Havalimanı', nameEn: 'Istanbul Airport',
    city: 'İstanbul', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'IST',
    popular: true, coordinates: { lat: 41.2619, lng: 28.7419 },
    keywords: ['istanbul airport', 'ist', 'istanbul havalimani', 'new istanbul airport']
  },
  {
    id: 'saw-airport', name: 'Sabiha Gökçen Havalimanı', nameEn: 'Sabiha Gokcen Airport',
    city: 'İstanbul', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'SAW',
    popular: true, coordinates: { lat: 40.8986, lng: 29.3092 },
    keywords: ['sabiha gokcen', 'saw', 'sabiha airport', 'asian side istanbul']
  },
  {
    id: 'ayt-city', name: 'Antalya', nameEn: 'Antalya', city: 'Antalya',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 36.8969, lng: 30.7133 },
    keywords: ['antalya', 'Анталья', 'أنطاليا', 'turkish riviera']
  },
  {
    id: 'ayt-airport', name: 'Antalya Havalimanı', nameEn: 'Antalya Airport',
    city: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'AYT',
    popular: true, coordinates: { lat: 36.8987, lng: 30.8005 },
    keywords: ['antalya airport', 'ayt', 'antalya havalimani']
  },
  {
    id: 'izm-city', name: 'İzmir', nameEn: 'Izmir', city: 'İzmir',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 38.4237, lng: 27.1428 },
    keywords: ['izmir', 'İzmir', 'smyrna', 'измир']
  },
  {
    id: 'adb-airport', name: 'Adnan Menderes Havalimanı', nameEn: 'Adnan Menderes Airport',
    city: 'İzmir', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'ADB',
    popular: true, coordinates: { lat: 38.2924, lng: 27.1570 },
    keywords: ['izmir airport', 'adb', 'adnan menderes']
  },
  {
    id: 'ank-city', name: 'Ankara', nameEn: 'Ankara', city: 'Ankara',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 39.9334, lng: 32.8597 },
    keywords: ['ankara', 'Анкара', 'أنقرة', 'capital turkey']
  },
  {
    id: 'esb-airport', name: 'Esenboğa Havalimanı', nameEn: 'Esenboga Airport',
    city: 'Ankara', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'ESB',
    popular: true, coordinates: { lat: 40.1281, lng: 32.9951 },
    keywords: ['ankara airport', 'esb', 'esenboga']
  },
  {
    id: 'bod-city', name: 'Bodrum', nameEn: 'Bodrum', city: 'Bodrum',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 37.0344, lng: 27.4305 },
    keywords: ['bodrum', 'Бодрум', 'بودروم', 'turkish riviera']
  },
  {
    id: 'bjv-airport', name: 'Bodrum Havalimanı', nameEn: 'Bodrum Airport',
    city: 'Bodrum', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'BJV',
    popular: true, coordinates: { lat: 37.2506, lng: 27.6697 },
    keywords: ['bodrum airport', 'bjv', 'milas bodrum']
  },
  {
    id: 'dlm-airport', name: 'Dalaman Havalimanı', nameEn: 'Dalaman Airport',
    city: 'Dalaman', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'DLM',
    popular: true, coordinates: { lat: 36.7131, lng: 28.7925 },
    keywords: ['dalaman airport', 'dlm', 'dalaman']
  },
  {
    id: 'gzp-airport', name: 'Gazipaşa-Alanya Havalimanı', nameEn: 'Gazipasa-Alanya Airport',
    city: 'Alanya', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'GZP',
    popular: true, coordinates: { lat: 36.2992, lng: 32.3006 },
    keywords: ['gazipasa airport', 'gzp', 'alanya airport', 'gazipasa']
  },
  {
    id: 'ala-city', name: 'Alanya', nameEn: 'Alanya', city: 'Alanya',
    region: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 36.5444, lng: 31.9956 }, hotelCount: 250,
    keywords: ['alanya', 'Алания', 'ألانيا', 'alanya turkey']
  },
  {
    id: 'belek', name: 'Belek', nameEn: 'Belek', city: 'Belek',
    region: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'hotel_zone', popular: true,
    coordinates: { lat: 36.8628, lng: 31.0556 }, hotelCount: 95,
    keywords: ['belek', 'belek golf', 'belek hotels', 'luxury belek']
  },
  {
    id: 'lara', name: 'Lara', nameEn: 'Lara', city: 'Lara',
    region: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'hotel_zone', popular: true,
    coordinates: { lat: 36.8330, lng: 30.7627 }, hotelCount: 85,
    keywords: ['lara', 'lara beach', 'lara hotels', 'antalya lara']
  },
  {
    id: 'side', name: 'Side', nameEn: 'Side', city: 'Side',
    region: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'district', popular: true,
    coordinates: { lat: 36.7674, lng: 31.3889 }, hotelCount: 145,
    keywords: ['side', 'Сиде', 'سايد', 'ancient side', 'side turkey']
  },
  {
    id: 'kemer', name: 'Kemer', nameEn: 'Kemer', city: 'Kemer',
    region: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'district', popular: true,
    coordinates: { lat: 36.6025, lng: 30.5594 }, hotelCount: 180,
    keywords: ['kemer', 'Кемер', 'كيمير', 'kemer turkey']
  },
  {
    id: 'kas', name: 'Kaş', nameEn: 'Kas', city: 'Kaş',
    region: 'Antalya', country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 36.2020, lng: 29.6413 },
    keywords: ['kas', 'kaş', 'Каш', 'kas turkey']
  },
  {
    id: 'fethiye', name: 'Fethiye', nameEn: 'Fethiye', city: 'Fethiye',
    region: 'Muğla', country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 36.6211, lng: 29.1161 },
    keywords: ['fethiye', 'Фетхие', 'فتحية', 'oludeniz']
  },
  {
    id: 'marmaris', name: 'Marmaris', nameEn: 'Marmaris', city: 'Marmaris',
    region: 'Muğla', country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 36.8547, lng: 28.2736 },
    keywords: ['marmaris', 'Мармарис', 'مرمريس']
  },
  {
    id: 'cesme', name: 'Çeşme', nameEn: 'Cesme', city: 'Çeşme',
    region: 'İzmir', country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 38.3227, lng: 26.3061 },
    keywords: ['cesme', 'çeşme', 'Чешме', 'alaçatı', 'alacati']
  },
  {
    id: 'canakkale', name: 'Çanakkale', nameEn: 'Canakkale', city: 'Çanakkale',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: false,
    coordinates: { lat: 40.1553, lng: 26.4142 },
    keywords: ['canakkale', 'çanakkale', 'troy', 'gallipoli']
  },
  {
    id: 'trabzon', name: 'Trabzon', nameEn: 'Trabzon', city: 'Trabzon',
    country: 'Türkiye', countryCode: 'TR', type: 'city', popular: true,
    coordinates: { lat: 41.0027, lng: 39.7168 },
    keywords: ['trabzon', 'Трабзон', 'طرابزون']
  },
  {
    id: 'tzx-airport', name: 'Trabzon Havalimanı', nameEn: 'Trabzon Airport',
    city: 'Trabzon', country: 'Türkiye', countryCode: 'TR', type: 'airport', code: 'TZX',
    popular: false, coordinates: { lat: 40.9951, lng: 39.7897 },
    keywords: ['trabzon airport', 'tzx']
  },

  // International Cities & Airports
  {
    id: 'london-city', name: 'Londra', nameEn: 'London', city: 'London',
    country: 'İngiltere', countryCode: 'GB', type: 'city', popular: true,
    coordinates: { lat: 51.5074, lng: -0.1278 },
    keywords: ['london', 'londra', 'Лондон', 'لندن']
  },
  {
    id: 'lhr-airport', name: 'Heathrow Havalimanı', nameEn: 'Heathrow Airport',
    city: 'London', country: 'İngiltere', countryCode: 'GB', type: 'airport', code: 'LHR',
    popular: true, coordinates: { lat: 51.4700, lng: -0.4543 },
    keywords: ['heathrow', 'lhr', 'london airport']
  },
  {
    id: 'paris-city', name: 'Paris', nameEn: 'Paris', city: 'Paris',
    country: 'Fransa', countryCode: 'FR', type: 'city', popular: true,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    keywords: ['paris', 'Париж', 'باريس']
  },
  {
    id: 'cdg-airport', name: 'Charles de Gaulle Havalimanı', nameEn: 'Charles de Gaulle Airport',
    city: 'Paris', country: 'Fransa', countryCode: 'FR', type: 'airport', code: 'CDG',
    popular: true, coordinates: { lat: 49.0097, lng: 2.5479 },
    keywords: ['cdg', 'charles de gaulle', 'paris airport']
  },
  {
    id: 'dubai-city', name: 'Dubai', nameEn: 'Dubai', city: 'Dubai',
    country: 'BAE', countryCode: 'AE', type: 'city', popular: true,
    coordinates: { lat: 25.2048, lng: 55.2708 },
    keywords: ['dubai', 'Дубай', 'دبي']
  },
  {
    id: 'dxb-airport', name: 'Dubai Havalimanı', nameEn: 'Dubai International Airport',
    city: 'Dubai', country: 'BAE', countryCode: 'AE', type: 'airport', code: 'DXB',
    popular: true, coordinates: { lat: 25.2532, lng: 55.3657 },
    keywords: ['dxb', 'dubai airport', 'dubai international']
  },
  {
    id: 'moscow-city', name: 'Moskova', nameEn: 'Moscow', city: 'Moscow',
    country: 'Rusya', countryCode: 'RU', type: 'city', popular: true,
    coordinates: { lat: 55.7558, lng: 37.6173 },
    keywords: ['moscow', 'moskova', 'Москва', 'موسكو']
  },
  {
    id: 'svo-airport', name: 'Sheremetyevo Havalimanı', nameEn: 'Sheremetyevo Airport',
    city: 'Moscow', country: 'Rusya', countryCode: 'RU', type: 'airport', code: 'SVO',
    popular: true, coordinates: { lat: 55.9726, lng: 37.4146 },
    keywords: ['svo', 'sheremetyevo', 'moscow airport']
  },
  {
    id: 'berlin-city', name: 'Berlin', nameEn: 'Berlin', city: 'Berlin',
    country: 'Almanya', countryCode: 'DE', type: 'city', popular: true,
    coordinates: { lat: 52.5200, lng: 13.4050 },
    keywords: ['berlin', 'Берлин', 'برلين']
  },
  {
    id: 'ber-airport', name: 'Berlin Brandenburg Havalimanı', nameEn: 'Berlin Brandenburg Airport',
    city: 'Berlin', country: 'Almanya', countryCode: 'DE', type: 'airport', code: 'BER',
    popular: true, coordinates: { lat: 52.3667, lng: 13.5033 },
    keywords: ['ber', 'berlin airport', 'brandenburg']
  },
];

// Merge with Antalya transfer locations
const MERGED_ANTALYA_LOCATIONS: AdvancedLocationSuggestion[] = ALL_ANTALYA_LOCATIONS.map(loc => ({
  id: loc.id,
  name: loc.name,
  nameEn: loc.nameEn,
  city: loc.name,
  region: loc.region,
  country: 'Türkiye',
  countryCode: 'TR',
  type: loc.type as any,
  code: undefined,
  coordinates: loc.coordinates,
  popular: loc.popular,
  hotelCount: loc.hotelCount,
  keywords: loc.keywords,
}));

// Combined all locations
export const ALL_ADVANCED_LOCATIONS = [
  ...COMPREHENSIVE_LOCATIONS,
  ...MERGED_ANTALYA_LOCATIONS.filter(
    loc => !COMPREHENSIVE_LOCATIONS.some(cl => cl.id === loc.id)
  ),
];

/**
 * Fuzzy search algorithm - calculates similarity score
 * Levenshtein distance based matching
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  // Exact match
  if (s1 === s2) return 100;

  // Starts with
  if (s1.startsWith(s2) || s2.startsWith(s1)) return 90;

  // Contains
  if (s1.includes(s2) || s2.includes(s1)) return 75;

  // Levenshtein distance
  const matrix: number[][] = [];
  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[s1.length][s2.length];
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = ((maxLen - distance) / maxLen) * 100;

  return Math.max(0, similarity);
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Advanced location search with fuzzy matching
 */
export function searchAdvancedLocations(
  query: string,
  options: {
    type?: 'city' | 'airport' | 'hotel' | 'region' | 'all';
    country?: string;
    limit?: number;
    userLocation?: { lat: number; lng: number };
    popularFirst?: boolean;
  } = {}
): AdvancedLocationSuggestion[] {
  const {
    type = 'all',
    country,
    limit = 10,
    userLocation,
    popularFirst = true,
  } = options;

  if (!query || query.length < 2) {
    // Return popular locations if no query
    return ALL_ADVANCED_LOCATIONS
      .filter(loc => loc.popular)
      .slice(0, limit);
  }

  const searchTerm = query.toLowerCase().trim();

  // Search and score each location
  const scoredResults = ALL_ADVANCED_LOCATIONS.map(location => {
    // Type filter
    if (type !== 'all' && location.type !== type) {
      return null;
    }

    // Country filter
    if (country && location.countryCode !== country) {
      return null;
    }

    // Calculate match scores
    const nameScore = calculateSimilarity(location.name, searchTerm);
    const nameEnScore = calculateSimilarity(location.nameEn, searchTerm);
    const cityScore = calculateSimilarity(location.city, searchTerm);
    const codeScore = location.code
      ? calculateSimilarity(location.code, searchTerm)
      : 0;

    // Check keywords
    const keywordScore = location.keywords.reduce((max, keyword) => {
      const score = calculateSimilarity(keyword, searchTerm);
      return Math.max(max, score);
    }, 0);

    // Combine scores
    const matchScore = Math.max(
      nameScore,
      nameEnScore,
      cityScore,
      codeScore,
      keywordScore
    );

    // Minimum threshold
    if (matchScore < 50) return null;

    // Calculate distance if user location provided
    let distance: number | undefined;
    if (userLocation && location.coordinates) {
      distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        location.coordinates.lat,
        location.coordinates.lng
      );
    }

    return {
      ...location,
      matchScore,
      distance,
    };
  }).filter((loc): loc is AdvancedLocationSuggestion & { matchScore: number } =>
    loc !== null
  );

  // Sort results
  scoredResults.sort((a, b) => {
    // Popular first if enabled
    if (popularFirst && a.popular !== b.popular) {
      return a.popular ? -1 : 1;
    }

    // Then by match score
    if (Math.abs(a.matchScore - b.matchScore) > 5) {
      return b.matchScore - a.matchScore;
    }

    // Then by distance if available
    if (a.distance !== undefined && b.distance !== undefined) {
      return a.distance - b.distance;
    }

    // Finally by hotel count
    return (b.hotelCount || 0) - (a.hotelCount || 0);
  });

  return scoredResults.slice(0, limit);
}

/**
 * Get popular locations by country
 */
export function getPopularLocations(
  countryCode?: string,
  limit: number = 10
): AdvancedLocationSuggestion[] {
  let locations = ALL_ADVANCED_LOCATIONS.filter(loc => loc.popular);

  if (countryCode) {
    locations = locations.filter(loc => loc.countryCode === countryCode);
  }

  return locations
    .sort((a, b) => (b.hotelCount || 0) - (a.hotelCount || 0))
    .slice(0, limit);
}

/**
 * Get location by ID
 */
export function getLocationById(id: string): AdvancedLocationSuggestion | undefined {
  return ALL_ADVANCED_LOCATIONS.find(loc => loc.id === id);
}

/**
 * Get nearby locations
 */
export function getNearbyLocations(
  lat: number,
  lng: number,
  radiusKm: number = 50,
  limit: number = 10
): AdvancedLocationSuggestion[] {
  return ALL_ADVANCED_LOCATIONS
    .filter(loc => loc.coordinates !== undefined)
    .map(loc => {
      const distance = calculateDistance(
        lat,
        lng,
        loc.coordinates!.lat,
        loc.coordinates!.lng
      );
      return { ...loc, distance };
    })
    .filter(loc => loc.distance! <= radiusKm)
    .sort((a, b) => a.distance! - b.distance!)
    .slice(0, limit);
}

/**
 * Get current user location from browser
 */
export function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export default {
  searchAdvancedLocations,
  getPopularLocations,
  getLocationById,
  getNearbyLocations,
  getUserLocation,
  calculateDistance,
};
