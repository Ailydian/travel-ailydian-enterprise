/**
 * Structured Data / JSON-LD Schema Generator
 * Enterprise-level schema.org markup for enhanced SERP visibility
 * Supports: Organization, BreadcrumbList, Product, Review, FAQ, HowTo, Event
 */

/**
 * Organization Schema - Main company information
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://holiday.ailydian.com/#organization',
    name: 'Holiday.AILYDIAN',
    alternateName: 'AILYDIAN Travel',
    url: 'https://holiday.ailydian.com',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://holiday.ailydian.com/#logo',
      url: 'https://holiday.ailydian.com/logo.png',
      width: 512,
      height: 512,
      caption: 'Holiday.AILYDIAN Logo',
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://holiday.ailydian.com/og-image.jpg',
      width: 1200,
      height: 630,
    },
    description: 'AI-powered travel and tourism platform offering personalized vacation recommendations, hotel bookings, flight tickets, car rentals, and tour reservations.',

    sameAs: [
      'https://www.ailydian.com',
      'https://twitter.com/ailydian',
      'https://www.facebook.com/ailydian',
      'https://www.instagram.com/ailydian',
      'https://www.linkedin.com/company/ailydian',
    ],

    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+90-850-000-0000',
        email: 'support@ailydian.com',
        availableLanguage: [
          'Turkish',
          'English',
          'German',
          'Russian',
          'Arabic',
          'Persian',
          'French',
          'Greek'
        ],
        areaServed: 'Worldwide',
        hoursAvailable: {
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
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Sales',
        telephone: '+90-850-000-0001',
        email: 'sales@ailydian.com',
        availableLanguage: ['Turkish', 'English'],
      }
    ],

    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul',
    },

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2547',
      bestRating: '5',
      worstRating: '1',
    },

    founder: {
      '@type': 'Organization',
      name: 'AILYDIAN',
    },

    foundingDate: '2024',

    slogan: 'AI-Powered Travel, Personalized for You',
  };
}

/**
 * Website Schema - Main website metadata
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://holiday.ailydian.com/#website',
    url: 'https://holiday.ailydian.com',
    name: 'Holiday.AILYDIAN',
    description: 'AI-powered travel platform for bookings, tours, and personalized recommendations',
    publisher: {
      '@id': 'https://holiday.ailydian.com/#organization',
    },
    inLanguage: ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'],

    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://holiday.ailydian.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Breadcrumb Schema - Navigation breadcrumbs
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
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
}

/**
 * Product Schema - For tours, hotels, rentals
 */
export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string[];
  brand?: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
  };
  category: string;
  url: string;
}

export function generateProductSchema(product: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : {
      '@type': 'Brand',
      name: 'Holiday.AILYDIAN',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      url: product.url,
      seller: {
        '@type': 'Organization',
        name: 'Holiday.AILYDIAN',
      },
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    category: product.category,
  };
}

/**
 * Review Schema - Customer reviews
 */
export interface ReviewSchemaInput {
  itemName: string;
  itemUrl: string;
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

export function generateReviewSchema(review: ReviewSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: review.itemName,
      url: review.itemUrl,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Holiday.AILYDIAN',
    },
  };
}

/**
 * FAQ Schema - Frequently asked questions
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
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
}

/**
 * Event Schema - For tours and activities
 */
export interface EventSchemaInput {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  image: string[];
  price: number;
  currency: string;
  url: string;
}

export function generateEventSchema(event: EventSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
      },
    },
    image: event.image,
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: event.currency,
      availability: 'https://schema.org/InStock',
      url: event.url,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Holiday.AILYDIAN',
      url: 'https://holiday.ailydian.com',
    },
  };
}

/**
 * HowTo Schema - Step-by-step guides
 */
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Service Schema - For services offered
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Travel Agency',
    provider: {
      '@id': 'https://holiday.ailydian.com/#organization',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hotel Booking',
            description: 'Book hotels worldwide with AI recommendations',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flight Booking',
            description: 'Find and book flights with best prices',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car Rental',
            description: 'Rent cars at competitive prices',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tour Packages',
            description: 'Curated tour packages with local experiences',
          },
        },
      ],
    },
  };
}

/**
 * Combine multiple schemas into one JSON-LD script
 */
export function combineSchemas(...schemas: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
