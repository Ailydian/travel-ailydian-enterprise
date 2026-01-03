/**
 * SEO Schema Markup Component
 * Generates JSON-LD structured data for search engines and AI models
 *
 * @module components/seo/SchemaMarkup
 * @supports Google, Bing, Yandex, ChatGPT, Perplexity, Claude
 */

import React from 'react';
import Head from 'next/head';
import { FAQItem } from '@/data/seo/faq-data';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface FAQPageSchemaProps {
  faqs: FAQItem[];
  url: string;
  title: string;
  description: string;
}

export interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  url: string;
  image: string;
  priceRange: string;
  openingHours?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export interface TouristDestinationSchemaProps {
  name: string;
  description: string;
  image: string[];
  url: string;
  address: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  touristType?: string[];
}

export interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
    position: number;
  }>;
}

// ===================================================
// FAQPage SCHEMA (Priority #1 for AI Models)
// ===================================================

export const FAQPageSchema: React.FC<FAQPageSchemaProps> = ({
  faqs,
  url,
  title,
  description,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: title,
    description: description,
    url: url,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    publisher: {
      '@type': 'Organization',
      name: 'AILYDIAN Holiday',
      url: 'https://holiday.ailydian.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://holiday.ailydian.com/images/logo.png',
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="faqpage-schema"
      />
    </Head>
  );
};

// ===================================================
// LocalBusiness SCHEMA (For GEO SEO)
// ===================================================

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name,
  description,
  address,
  geo,
  telephone,
  email,
  url,
  image,
  priceRange,
  openingHours,
  aggregateRating,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name: name,
    description: description,
    image: image,
    url: url,
    telephone: telephone,
    email: email,
    priceRange: priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    ...(openingHours && { openingHours }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="localbusiness-schema"
      />
    </Head>
  );
};

// ===================================================
// TouristDestination SCHEMA (For Destination Pages)
// ===================================================

export const TouristDestinationSchema: React.FC<TouristDestinationSchemaProps> = ({
  name,
  description,
  image,
  url,
  address,
  geo,
  touristType,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': url,
    name: name,
    description: description,
    image: image,
    url: url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    ...(touristType && { touristType }),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="touristdestination-schema"
      />
    </Head>
  );
};

// ===================================================
// Organization SCHEMA (Company Info)
// ===================================================

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name,
  url,
  logo,
  description,
  email,
  telephone,
  address,
  sameAs,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: name,
    url: url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description: description,
    email: email,
    telephone: telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    sameAs: sameAs,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="organization-schema"
      />
    </Head>
  );
};

// ===================================================
// Breadcrumb SCHEMA (Navigation)
// ===================================================

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="breadcrumb-schema"
      />
    </Head>
  );
};

// ===================================================
// WebSite SCHEMA (Site Search)
// ===================================================

export const WebSiteSchema: React.FC<{ url: string; name: string }> = ({ url, name }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url: url,
    name: name,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="website-schema"
      />
    </Head>
  );
};

// ===================================================
// EXPORTS
// ===================================================

export default {
  FAQPageSchema,
  LocalBusinessSchema,
  TouristDestinationSchema,
  OrganizationSchema,
  BreadcrumbSchema,
  WebSiteSchema,
};
