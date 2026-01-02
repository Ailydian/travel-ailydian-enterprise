/**
 * SEO Library - Central Export
 * Enterprise-grade SEO optimization for Holiday.AILYDIAN
 *
 * Features:
 * - Universal SEO System (NEW - v2.0)
 * - Multilingual SEO (8 languages)
 * - Geo-targeted optimization
 * - Structured data / JSON-LD schemas
 * - OpenGraph & Twitter Cards
 * - Breadcrumbs & Language alternates
 * - Automatic hreflang generation
 *
 * @version 2.0.0
 * @coverage 1378 pages × 8 languages = 11,024 optimized URLs
 */

// ===================================================
// UNIVERSAL SEO SYSTEM (v2.0) - PRIMARY EXPORTS
// ===================================================
export * from './universal-seo';
export * from './page-seo';
export * from './geo-seo';
export * from './schema-generators';

// ===================================================
// LEGACY EXPORTS (Backward Compatibility)
// ===================================================
export * from './multilingualSEO';
export * from './geoSEO';
export * from './structuredData';

// ===================================================
// UNIVERSAL SEO - CONVENIENCE EXPORTS
// ===================================================
export {
  generateHreflangTags,
  generateMetaTags,
  generateSchemaOrg,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  getLocaleConfig,
  formatPrice,
  getCanonicalUrl,
  LOCALE_REGIONS,
  SUPPORTED_LOCALES,
  BASE_URL,
} from './universal-seo';

export {
  getPageSEO,
  generateTourSEO,
  generateHotelSEO,
  homeSEO,
  toursListSEO,
  hotelsListSEO,
  carRentalSEO,
} from './page-seo';

export {
  getCityGeoSEO,
  getRegionGeoSEO,
  getCitiesByRegion,
  getPopularCities,
  cityGeoSEO,
  regionGeoSEO,
} from './geo-seo';

// ===================================================
// LEGACY EXPORTS - CONVENIENCE
// ===================================================
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
  generateOrganizationSchema as generateOrganizationSchemaLegacy,
  generateWebsiteSchema as generateWebsiteSchemaLegacy,
  generateBreadcrumbSchema as generateBreadcrumbSchemaLegacy,
  generateProductSchema,
  generateReviewSchema as generateReviewSchemaLegacy,
  generateFAQSchema as generateFAQSchemaLegacy,
  generateEventSchema,
  generateHowToSchema,
  generateServiceSchema,
  combineSchemas,
} from './structuredData';

// ===================================================
// TYPE EXPORTS
// ===================================================

// Universal SEO Types
export type {
  SupportedLocale,
  LocaleConfig,
  SEOConfig,
  SchemaOrgConfig,
  HreflangTag,
  MetaTags,
  BreadcrumbItem,
  FAQItem,
  Review,
} from './universal-seo';

export type {
  PageSEOConfig,
  LocalizedSEO,
} from './page-seo';

export type {
  CityGeoSEO,
  RegionGeoSEO,
} from './geo-seo';

// Legacy Types
export type {
  GeoLocation,
  GeoSEOOptions,
} from './geoSEO';

export type {
  ProductSchemaInput,
  ReviewSchemaInput,
  FAQItem as FAQItemLegacy,
  EventSchemaInput,
  HowToStep,
} from './structuredData';
