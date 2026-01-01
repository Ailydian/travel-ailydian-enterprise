/**
 * Geo-Targeted SEO Configuration
 * Location-based SEO optimization for regional targeting
 * Supports coordinates, regions, and locale-specific targeting
 */

import { NextSeoProps } from 'next-seo';

export interface GeoLocation {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface GeoSEOOptions {
  location: GeoLocation;
  locale: string;
  businessHours?: string;
  phoneNumber?: string;
  address?: string;
}

/**
 * Generate geo-targeted SEO meta tags
 */
export function generateGeoSEO(options: GeoSEOOptions): Partial<NextSeoProps> {
  const { location, locale, businessHours, phoneNumber, address } = options;

  const geoMetaTags = [
    {
      name: 'geo.region',
      content: `${location.countryCode}${location.region ? `-${location.region}` : ''}`,
    },
    {
      name: 'geo.placename',
      content: location.city || location.country,
    }
  ];

  // Add coordinates if available
  if (location.coordinates) {
    geoMetaTags.push(
      {
        name: 'geo.position',
        content: `${location.coordinates.lat};${location.coordinates.lng}`,
      },
      {
        name: 'ICBM',
        content: `${location.coordinates.lat}, ${location.coordinates.lng}`,
      }
    );
  }

  // Add business information
  if (businessHours) {
    geoMetaTags.push({
      name: 'business.hours',
      content: businessHours,
    });
  }

  if (phoneNumber) {
    geoMetaTags.push({
      name: 'business.phone',
      content: phoneNumber,
    });
  }

  return {
    additionalMetaTags: geoMetaTags,
  };
}

/**
 * Predefined locations for major markets
 */
export const MAJOR_MARKETS: Record<string, GeoLocation> = {
  turkey: {
    country: 'Turkey',
    countryCode: 'TR',
    city: 'Istanbul',
    region: '34',
    coordinates: { lat: 41.0082, lng: 28.9784 },
  },
  germany: {
    country: 'Germany',
    countryCode: 'DE',
    city: 'Berlin',
    coordinates: { lat: 52.5200, lng: 13.4050 },
  },
  russia: {
    country: 'Russia',
    countryCode: 'RU',
    city: 'Moscow',
    coordinates: { lat: 55.7558, lng: 37.6173 },
  },
  uae: {
    country: 'United Arab Emirates',
    countryCode: 'AE',
    city: 'Dubai',
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  iran: {
    country: 'Iran',
    countryCode: 'IR',
    city: 'Tehran',
    coordinates: { lat: 35.6892, lng: 51.3890 },
  },
  france: {
    country: 'France',
    countryCode: 'FR',
    city: 'Paris',
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  greece: {
    country: 'Greece',
    countryCode: 'GR',
    city: 'Athens',
    coordinates: { lat: 37.9838, lng: 23.7275 },
  },
  uk: {
    country: 'United Kingdom',
    countryCode: 'GB',
    city: 'London',
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  usa: {
    country: 'United States',
    countryCode: 'US',
    city: 'New York',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
};

/**
 * Get geo SEO for a specific market
 */
export function getMarketGeoSEO(
  marketKey: keyof typeof MAJOR_MARKETS,
  locale: string
): Partial<NextSeoProps> {
  const location = MAJOR_MARKETS[marketKey];

  if (!location) {
    console.warn(`Unknown market: ${marketKey}`);
    return {};
  }

  return generateGeoSEO({
    location,
    locale,
    businessHours: 'Mo-Su 00:00-24:00',
    phoneNumber: '+90 850 000 00 00',
  });
}

/**
 * Detect user's geo location from locale
 */
export function getGeoFromLocale(locale: string): GeoLocation | null {
  const localeToMarket: Record<string, keyof typeof MAJOR_MARKETS> = {
    tr: 'turkey',
    de: 'germany',
    ru: 'russia',
    ar: 'uae',
    fa: 'iran',
    fr: 'france',
    el: 'greece',
    en: 'uk',
  };

  const marketKey = localeToMarket[locale];
  return marketKey ? MAJOR_MARKETS[marketKey] : null;
}

/**
 * Generate local business schema for geo targeting
 */
export function generateLocalBusinessSchema(location: GeoLocation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Holiday.AILYDIAN',
    url: 'https://holiday.ailydian.com',
    logo: 'https://holiday.ailydian.com/logo.png',
    image: 'https://holiday.ailydian.com/og-image.jpg',

    address: location.coordinates ? {
      '@type': 'PostalAddress',
      addressCountry: location.countryCode,
      addressLocality: location.city,
      addressRegion: location.region,
    } : undefined,

    geo: location.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    } : undefined,

    telephone: '+90 850 000 00 00',
    priceRange: '$$',

    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    },

    sameAs: [
      'https://www.ailydian.com',
      'https://twitter.com/ailydian',
      'https://www.facebook.com/ailydian',
      'https://www.instagram.com/ailydian',
    ],

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2547',
      bestRating: '5',
      worstRating: '1',
    },
  };
}
