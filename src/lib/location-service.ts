/**
 * Smart Location Detection Service
 * Otomatik adres tanıma, geolocation ve IP-based location detection
 */

export interface LocationData {
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  source: 'geolocation' | 'ip' | 'manual';
}

export interface NearbyDestination {
  name: string;
  city: string;
  distance: number; // km
  type: 'hotel' | 'airport' | 'attraction';
  iataCode?: string;
}

// Türkiye'nin major şehirleri ve IATA kodları
const TURKEY_CITIES = [
  { name: 'İstanbul', code: 'IST', lat: 41.0082, lng: 28.9784, airport: 'İstanbul Havalimanı' },
  { name: 'Ankara', code: 'ESB', lat: 39.9334, lng: 32.8597, airport: 'Esenboğa Havalimanı' },
  { name: 'İzmir', code: 'ADB', lat: 38.4237, lng: 27.1428, airport: 'Adnan Menderes Havalimanı' },
  { name: 'Antalya', code: 'AYT', lat: 36.8969, lng: 30.7133, airport: 'Antalya Havalimanı' },
  { name: 'Bursa', code: 'BTZ', lat: 40.1828, lng: 29.0665, airport: 'Yenişehir Havalimanı' },
  { name: 'Adana', code: 'ADA', lat: 37.0000, lng: 35.3213, airport: 'Şakirpaşa Havalimanı' },
  { name: 'Gaziantep', code: 'GZT', lat: 37.0662, lng: 37.3833, airport: 'Oğuzeli Havalimanı' },
  { name: 'Konya', code: 'KYA', lat: 37.8746, lng: 32.4932, airport: 'Konya Havalimanı' },
  { name: 'Trabzon', code: 'TZX', lat: 41.0039, lng: 39.7168, airport: 'Trabzon Havalimanı' },
  { name: 'Bodrum', code: 'BJV', lat: 37.0344, lng: 27.4305, airport: 'Milas-Bodrum Havalimanı' },
  { name: 'Dalaman', code: 'DLM', lat: 36.7131, lng: 28.7925, airport: 'Dalaman Havalimanı' },
  { name: 'Nevşehir', code: 'NAV', lat: 38.6247, lng: 34.7234, airport: 'Kapadokya Havalimanı' },
];

/**
 * Get user location using Geolocation API
 */
export async function getUserLocation(): Promise<LocationData | null> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      console.warn('⏱️ Geolocation timeout');
      resolve(null);
    }, 5000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding to get city name
          const city = await reverseGeocode(latitude, longitude);

          resolve({
            city: city.city,
            country: city.country,
            countryCode: city.countryCode,
            latitude,
            longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            source: 'geolocation'
          });
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          resolve(null);
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        console.warn('Geolocation error:', error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000 // Cache for 5 minutes
      }
    );
  });
}

/**
 * Reverse geocoding using coordinates
 */
async function reverseGeocode(lat: number, lng: number): Promise<{
  city: string;
  country: string;
  countryCode: string;
}> {
  // Find closest Turkish city
  const closestCity = findClosestCity(lat, lng);

  if (closestCity) {
    return {
      city: closestCity.name,
      country: 'Türkiye',
      countryCode: 'TR'
    };
  }

  // Fallback: Use Nominatim (OpenStreetMap) for reverse geocoding
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'LyDian-Travel/1.0'
        }
      }
    );

    const data = await response.json();

    return {
      city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
      country: data.address?.country || 'Unknown',
      countryCode: data.address?.country_code?.toUpperCase() || 'XX'
    };
  } catch (error) {
    console.error('Nominatim geocoding error:', error);
    return {
      city: 'İstanbul',
      country: 'Türkiye',
      countryCode: 'TR'
    };
  }
}

/**
 * Get location from IP address
 */
export async function getLocationFromIP(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    return {
      city: data.city || 'İstanbul',
      country: data.country_name || 'Türkiye',
      countryCode: data.country_code || 'TR',
      latitude: data.latitude || 41.0082,
      longitude: data.longitude || 28.9784,
      timezone: data.timezone,
      source: 'ip'
    };
  } catch (error) {
    console.error('IP geolocation error:', error);
    return null;
  }
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
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Find closest Turkish city
 */
export function findClosestCity(
  lat: number,
  lng: number
): typeof TURKEY_CITIES[0] | null {
  if (!TURKEY_CITIES.length) return null;

  let closest = TURKEY_CITIES[0];
  let minDistance = calculateDistance(lat, lng, closest.lat, closest.lng);

  for (const city of TURKEY_CITIES) {
    const distance = calculateDistance(lat, lng, city.lat, city.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closest = city;
    }
  }

  // Only return if within 200km
  return minDistance < 200 ? closest : null;
}

/**
 * Get nearby destinations based on user location
 */
export function getNearbyDestinations(
  userLat: number,
  userLng: number,
  limit: number = 5
): NearbyDestination[] {
  const destinations = TURKEY_CITIES.map(city => ({
    name: city.airport,
    city: city.name,
    distance: Math.round(calculateDistance(userLat, userLng, city.lat, city.lng)),
    type: 'airport' as const,
    iataCode: city.code
  }));

  // Sort by distance and return top N
  return destinations
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

/**
 * Smart location detection with fallback
 */
export async function detectUserLocation(): Promise<LocationData> {
  // Try Geolocation API first
  const geoLocation = await getUserLocation();
  if (geoLocation) {
    console.log('📍 Location detected via Geolocation:', geoLocation.city);
    return geoLocation;
  }

  // Fallback to IP-based location
  const ipLocation = await getLocationFromIP();
  if (ipLocation) {
    console.log('📍 Location detected via IP:', ipLocation.city);
    return ipLocation;
  }

  // Ultimate fallback: Istanbul
  console.log('📍 Using default location: Istanbul');
  return {
    city: 'İstanbul',
    country: 'Türkiye',
    countryCode: 'TR',
    latitude: 41.0082,
    longitude: 28.9784,
    source: 'manual'
  };
}

/**
 * Get smart destination suggestions based on location
 */
export function getSmartDestinationSuggestions(
  userCity: string
): string[] {
  const city = userCity.toLowerCase();

  // Location-based smart suggestions
  const suggestions: Record<string, string[]> = {
    'istanbul': ['Kapadokya', 'Bursa', 'Antalya', 'Bodrum'],
    'ankara': ['Kapadokya', 'Antalya', 'İstanbul', 'İzmir'],
    'izmir': ['Bodrum', 'Antalya', 'İstanbul', 'Çeşme'],
    'antalya': ['Kapadokya', 'Bodrum', 'İstanbul', 'Side'],
    'bursa': ['İstanbul', 'Kapadokya', 'Antalya', 'Sapanca'],
  };

  return suggestions[city] || ['İstanbul', 'Antalya', 'Bodrum', 'Kapadokya'];
}

export default {
  getUserLocation,
  getLocationFromIP,
  detectUserLocation,
  findClosestCity,
  getNearbyDestinations,
  getSmartDestinationSuggestions,
  TURKEY_CITIES
};
