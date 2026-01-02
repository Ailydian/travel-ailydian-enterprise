/**
 * Schema.org Structured Data Generators
 * Generates rich snippets for search engines (Google, Bing, Yandex)
 *
 * @module seo/schema-generators
 * @seo Google Rich Results, Knowledge Graph
 */

import { SupportedLocale } from './page-seo';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface Tour {
  id: string;
  title: string;
  description: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  category: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  reviewCount: number;
  images: string[];
  lat?: number;
  lng?: number;
  available: boolean;
  reviews?: Array<{
    author: string;
    date: string;
    rating: number;
    text: string;
  }>;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  slug: string;
  city: string;
  country: string;
  address: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  stars: number;
  rating: number;
  reviewCount: number;
  minPrice: number;
  maxPrice: number;
  currency: string;
  images: string[];
  amenities: string[];
  lat?: number;
  lng?: number;
}

export interface CarRental {
  id: string;
  brand: string;
  model: string;
  description: string;
  slug: string;
  dailyPrice: number;
  currency: string;
  transmission: string;
  fuelType: string;
  seats: number;
  rating: number;
  reviewCount: number;
  images: string[];
  available: boolean;
}

// ===================================================
// ORGANIZATION SCHEMA (Site-wide)
// ===================================================

export const generateOrganizationSchema = (locale: SupportedLocale = 'tr') => {
  const contactPoints = {
    tr: { telephone: '+90-850-XXX-XXXX', contactType: 'Müşteri Hizmetleri' },
    en: { telephone: '+90-850-XXX-XXXX', contactType: 'Customer Service' },
    de: { telephone: '+90-850-XXX-XXXX', contactType: 'Kundenservice' },
    ru: { telephone: '+90-850-XXX-XXXX', contactType: 'Служба поддержки' },
    ar: { telephone: '+90-850-XXX-XXXX', contactType: 'خدمة العملاء' },
    fa: { telephone: '+90-850-XXX-XXXX', contactType: 'خدمات مشتری' },
    fr: { telephone: '+90-850-XXX-XXXX', contactType: 'Service Client' },
    el: { telephone: '+90-850-XXX-XXXX', contactType: 'Εξυπηρέτηση Πελατών' },
  };

  const contact = contactPoints[locale] || contactPoints.tr;

  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://holiday.ailydian.com/#organization',
    name: 'Holiday.AILYDIAN',
    url: 'https://holiday.ailydian.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://holiday.ailydian.com/logo.png',
      width: 250,
      height: 60,
    },
    description: locale === 'tr'
      ? "Türkiye'nin AI destekli tatil ve seyahat platformu"
      : "Turkey's AI-powered holiday and travel platform",
    telephone: contact.telephone,
    email: 'info@ailydian.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul',
    },
    sameAs: [
      'https://twitter.com/ailydian',
      'https://facebook.com/ailydian',
      'https://instagram.com/ailydian',
      'https://linkedin.com/company/ailydian',
      'https://youtube.com/@ailydian',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.telephone,
      contactType: contact.contactType,
      availableLanguage: ['Turkish', 'English', 'German', 'Russian', 'Arabic', 'Persian', 'French', 'Greek'],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://holiday.ailydian.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

// ===================================================
// WEBSITE SCHEMA
// ===================================================

export const generateWebSiteSchema = (locale: SupportedLocale = 'tr') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://holiday.ailydian.com/#website',
    url: 'https://holiday.ailydian.com',
    name: 'Holiday.AILYDIAN',
    description: locale === 'tr'
      ? 'Tatil, tur, otel rezervasyonu ve araç kiralama platformu'
      : 'Holiday, tour, hotel booking and car rental platform',
    publisher: {
      '@id': 'https://holiday.ailydian.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://holiday.ailydian.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'],
  };
};

// ===================================================
// TOUR SCHEMA (TouristAttraction + Offer)
// ===================================================

export const generateTourSchema = (tour: Tour, locale: SupportedLocale = 'tr') => {
  const baseUrl = `https://holiday.ailydian.com/${locale === 'tr' ? '' : locale + '/'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}tours/${tour.slug}#attraction`,
    name: tour.title,
    description: tour.description,
    image: tour.images.map((img) => ({
      '@type': 'ImageObject',
      url: img,
      width: 1200,
      height: 800,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: tour.city,
      addressRegion: tour.location,
      addressCountry: tour.country || 'TR',
    },
    ...(tour.lat && tour.lng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: tour.lat,
        longitude: tour.lng,
      },
    }),
    touristType: tour.category,
    offers: {
      '@type': 'Offer',
      '@id': `${baseUrl}tours/${tour.slug}#offer`,
      price: tour.price,
      priceCurrency: tour.currency || 'TRY',
      availability: tour.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${baseUrl}tours/${tour.slug}`,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      seller: {
        '@id': 'https://holiday.ailydian.com/#organization',
      },
      validFrom: new Date().toISOString().split('T')[0],
    },
    aggregateRating: tour.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    review: tour.reviews?.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
    })),
  };
};

// ===================================================
// HOTEL SCHEMA (LodgingBusiness + Hotel)
// ===================================================

export const generateHotelSchema = (hotel: Hotel, locale: SupportedLocale = 'tr') => {
  const baseUrl = `https://holiday.ailydian.com/${locale === 'tr' ? '' : locale + '/'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${baseUrl}hotels/${hotel.slug}#hotel`,
    name: hotel.name,
    description: hotel.description,
    image: hotel.images.map((img) => ({
      '@type': 'ImageObject',
      url: img,
      width: 1200,
      height: 800,
    })),
    starRating: {
      '@type': 'Rating',
      ratingValue: hotel.stars,
      bestRating: '5',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.address,
      addressLocality: hotel.city,
      postalCode: hotel.postalCode,
      addressCountry: hotel.country || 'TR',
    },
    ...(hotel.lat && hotel.lng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: hotel.lat,
        longitude: hotel.lng,
      },
    }),
    telephone: hotel.phone,
    email: hotel.email,
    url: `${baseUrl}hotels/${hotel.slug}`,
    priceRange: `${hotel.minPrice}-${hotel.maxPrice} ${hotel.currency}`,
    aggregateRating: hotel.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: hotel.rating,
      reviewCount: hotel.reviewCount,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    amenityFeature: hotel.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    checkinTime: '14:00:00',
    checkoutTime: '12:00:00',
    petsAllowed: hotel.amenities.includes('Pet Friendly'),
    smokingAllowed: false,
  };
};

// ===================================================
// CAR RENTAL SCHEMA (Product + Offer)
// ===================================================

export const generateCarRentalSchema = (car: CarRental, locale: SupportedLocale = 'tr') => {
  const baseUrl = `https://holiday.ailydian.com/${locale === 'tr' ? '' : locale + '/'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}car-rental/${car.slug}#product`,
    name: `${car.brand} ${car.model} ${locale === 'tr' ? 'Kiralama' : 'Rental'}`,
    description: car.description,
    image: car.images.map((img) => ({
      '@type': 'ImageObject',
      url: img,
      width: 1200,
      height: 800,
    })),
    brand: {
      '@type': 'Brand',
      name: car.brand,
    },
    model: car.model,
    offers: {
      '@type': 'Offer',
      '@id': `${baseUrl}car-rental/${car.slug}#offer`,
      price: car.dailyPrice,
      priceCurrency: car.currency || 'TRY',
      availability: car.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${baseUrl}car-rental/${car.slug}`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: car.dailyPrice,
        priceCurrency: car.currency || 'TRY',
        unitText: 'DAY',
        unitCode: 'DAY',
      },
      seller: {
        '@id': 'https://holiday.ailydian.com/#organization',
      },
      validFrom: new Date().toISOString().split('T')[0],
    },
    aggregateRating: car.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: car.rating,
      reviewCount: car.reviewCount,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: locale === 'tr' ? 'Vites Tipi' : 'Transmission',
        value: car.transmission,
      },
      {
        '@type': 'PropertyValue',
        name: locale === 'tr' ? 'Yakıt Tipi' : 'Fuel Type',
        value: car.fuelType,
      },
      {
        '@type': 'PropertyValue',
        name: locale === 'tr' ? 'Koltuk Sayısı' : 'Seats',
        value: car.seats.toString(),
      },
    ],
  };
};

// ===================================================
// BREADCRUMB SCHEMA
// ===================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// ===================================================
// FAQ SCHEMA
// ===================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// ===================================================
// REVIEW SCHEMA
// ===================================================

export interface Review {
  author: string;
  date: string;
  rating: number;
  title?: string;
  text: string;
}

export const generateReviewSchema = (
  itemName: string,
  itemType: 'Tour' | 'Hotel' | 'Product',
  reviews: Review[]
) => {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemType,
      name: itemName,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.date,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
      worstRating: '1',
    },
    name: review.title,
    reviewBody: review.text,
  }));
};

// ===================================================
// EVENT SCHEMA (for tour events)
// ===================================================

export interface TourEvent {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  price: number;
  currency: string;
  image?: string;
  organizer: string;
}

export const generateEventSchema = (event: TourEvent) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      '@type': 'Place',
      name: event.location,
    },
    image: event.image,
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: event.currency,
      availability: 'https://schema.org/InStock',
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  };
};

// ===================================================
// ITEM LIST SCHEMA (for listing pages)
// ===================================================

export const generateItemListSchema = (
  items: Array<{ name: string; url: string; position: number }>,
  listType: 'Tour' | 'Hotel' | 'Product' = 'Tour'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      url: item.url,
      name: item.name,
    })),
    numberOfItems: items.length,
  };
};

// ===================================================
// LOCAL BUSINESS SCHEMA (for office locations)
// ===================================================

export const generateLocalBusinessSchema = (
  name: string,
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  },
  coordinates?: { lat: number; lng: number }
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    }),
  };
};

// ===================================================
// HELPER: Inject Schema into Head
// ===================================================

export const generateSchemaScript = (schema: any): string => {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
};

/**
 * Generate multiple schemas combined
 */
export const generateCombinedSchema = (schemas: any[]): any => {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
};

// ===================================================
// EXPORT ALL
// ===================================================

export default {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateTourSchema,
  generateHotelSchema,
  generateCarRentalSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateEventSchema,
  generateItemListSchema,
  generateLocalBusinessSchema,
  generateSchemaScript,
  generateCombinedSchema,
};
