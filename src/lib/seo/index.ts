/**
 * SEO Library - Central Export
 * Enterprise-grade SEO optimization for Holiday.AILYDIAN
 *
 * Features:
 * - Multilingual SEO (8 languages)
 * - Geo-targeted optimization
 * - Structured data / JSON-LD schemas
 * - OpenGraph & Twitter Cards
 * - Breadcrumbs & Language alternates
 */

export * from './multilingualSEO';
export * from './geoSEO';
export * from './structuredData';

// Re-export for convenience
export {
  generateMultilingualSEO,
  getLocalizedKeywords,
  getLocalizedTitle,
  getLocalizedDescription,
} from './multilingualSEO';

export {
  generateGeoSEO,
  getMarketGeoSEO,
  getGeoFromLocale,
  generateLocalBusinessSchema,
  MAJOR_MARKETS,
} from './geoSEO';

export {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  generateReviewSchema,
  generateFAQSchema,
  generateEventSchema,
  generateHowToSchema,
  generateServiceSchema,
  combineSchemas,
} from './structuredData';

export type {
  GeoLocation,
  GeoSEOOptions,
} from './geoSEO';

export type {
  ProductSchemaInput,
  ReviewSchemaInput,
  FAQItem,
  EventSchemaInput,
  HowToStep,
} from './structuredData';
