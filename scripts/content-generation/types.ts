/**
 * Content Generation Types
 * For AI-powered content creation across 1378+ pages
 */

export type ProductCategory = 'tour' | 'hotel' | 'car-rental' | 'rental' | 'transfer' | 'flight';

export type Language = 'tr' | 'en' | 'de' | 'ru' | 'ar' | 'fa' | 'fr' | 'el';

export interface BaseProduct {
  id: string;
  slug: string;
  category: ProductCategory;
  region: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
}

export interface ContentGenerationTask {
  productId: string;
  productCategory: ProductCategory;
  locale: Language;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retries: number;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedContent {
  productId: string;
  locale: Language;
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: ItineraryItem[];
  reviews?: Review[];
  seo: SEOMetadata;
}

export interface ItineraryItem {
  time?: string;
  title: string;
  description: string;
  duration?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  helpful: number;
  verified: boolean;
  locale: Language;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  structuredData: Record<string, any>;
}

export interface ContentGenerationConfig {
  openaiApiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  batchSize: number;
  concurrency: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface ProductStats {
  totalProducts: number;
  totalPages: number; // products x languages
  byCategory: Record<ProductCategory, number>;
  byStatus: Record<ContentGenerationTask['status'], number>;
  byLanguage: Record<Language, number>;
}
