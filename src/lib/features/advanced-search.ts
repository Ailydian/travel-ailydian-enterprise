/**
 * Advanced Search Engine with Faceted Filters
 * Elasticsearch-style search with aggregations
 * Backend Architect Agent Implementation
 */

import { prisma, trackedQuery, fullTextSearch } from '../database/prisma-client';
import { tourCacheManager } from '../cache/hybrid-cache';
import { captureException, measurePerformance } from '../monitoring/sentry';
import { Decimal } from '@prisma/client/runtime/library';

// ==========================================
// TYPES
// ==========================================

export type SearchFilters = {
  // Text search
  query?: string;

  // Location
  destination?: string;
  city?: string;
  region?: string;

  // Date range
  checkIn?: Date;
  checkOut?: Date;
  travelDate?: Date;

  // Price range
  priceMin?: number;
  priceMax?: number;

  // Ratings
  ratingMin?: number;

  // Categories (multi-select)
  categories?: string[];

  // Amenities (multi-select)
  amenities?: string[];

  // Features
  features?: string[];

  // Capacity
  guests?: number;
  beds?: number;
  bedrooms?: number;

  // Sorting
  sortBy?: 'price' | 'rating' | 'popularity' | 'date' | 'relevance';
  sortOrder?: 'asc' | 'desc';

  // Pagination
  page?: number;
  limit?: number;
};

export type SearchResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: SearchFacets;
  suggestions?: string[];
};

export type SearchFacets = {
  destinations: { value: string; count: number }[];
  priceRanges: { min: number; max: number; count: number }[];
  ratings: { value: number; count: number }[];
  categories: { value: string; count: number }[];
  amenities: { value: string; count: number }[];
};

// ==========================================
// ADVANCED SEARCH ENGINE
// ==========================================

export class AdvancedSearchEngine {
  /**
   * Perform advanced search with facets
   */
  public static async search<T>(
    entityType: 'hotel' | 'tour' | 'carRental' | 'property',
    filters: SearchFilters
  ): Promise<SearchResult<T>> {
    return measurePerformance(
      `search:${entityType}`,
      async () => {
        // Generate cache key
        const cacheKey = this.generateCacheKey(entityType, filters);

        // Try cache first
        const cached = await tourCacheManager.get(cacheKey);
        if (cached.hit && cached.value) {
          return cached.value as SearchResult<T>;
        }

        // Build query
        const { where, orderBy } = this.buildQuery(entityType, filters);

        // Execute search
        const [items, total, facets] = await Promise.all([
          this.executeSearch<T>(entityType, where, orderBy, filters),
          this.getTotal(entityType, where),
          this.generateFacets(entityType, filters),
        ]);

        const result: SearchResult<T> = {
          items,
          total,
          page: filters.page || 1,
          limit: filters.limit || 20,
          totalPages: Math.ceil(total / (filters.limit || 20)),
          facets,
        };

        // Cache result
        await tourCacheManager.set(cacheKey, result, { ttl: 300 }); // 5 min

        return result;
      },
      { tags: { entityType } }
    );
  }

  /**
   * Build Prisma query from filters
   */
  private static buildQuery(
    entityType: string,
    filters: SearchFilters
  ): { where: any; orderBy: any } {
    const where: any = { isActive: true };

    // Text search (full-text)
    if (filters.query) {
      where.OR = [
        { name: { contains: filters.query, mode: 'insensitive' } },
        { description: { contains: filters.query, mode: 'insensitive' } },
      ];
    }

    // Location filters
    if (filters.destination) {
      where.destination = filters.destination;
    }
    if (filters.city) {
      where.city = filters.city;
    }
    if (filters.region) {
      where.region = filters.region;
    }

    // Price range
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      const priceField = this.getPriceField(entityType);
      where[priceField] = {};
      if (filters.priceMin) where[priceField].gte = filters.priceMin;
      if (filters.priceMax) where[priceField].lte = filters.priceMax;
    }

    // Rating
    if (filters.ratingMin) {
      where.rating = { gte: filters.ratingMin };
    }

    // Categories (multi-select)
    if (filters.categories && filters.categories.length > 0) {
      where.category = { in: filters.categories };
    }

    // Amenities (array overlap)
    if (filters.amenities && filters.amenities.length > 0) {
      where.amenities = { hasSome: filters.amenities };
    }

    // Features
    if (filters.features && filters.features.length > 0) {
      where.features = { hasSome: filters.features };
    }

    // Capacity
    if (filters.guests) {
      const guestField = entityType === 'hotel' ? 'maxOccupancy' : 'guests';
      where[guestField] = { gte: filters.guests };
    }

    // Sorting
    const orderBy = this.buildOrderBy(entityType, filters);

    return { where, orderBy };
  }

  /**
   * Execute search with pagination
   */
  private static async executeSearch<T>(
    entityType: string,
    where: any,
    orderBy: any,
    filters: SearchFilters
  ): Promise<T[]> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    return trackedQuery(`search:${entityType}:items`, async () => {
      return (prisma[this.getModel(entityType)] as any).findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: this.getIncludes(entityType),
      });
    });
  }

  /**
   * Get total count
   */
  private static async getTotal(entityType: string, where: any): Promise<number> {
    return trackedQuery(`search:${entityType}:count`, async () => {
      return (prisma[this.getModel(entityType)] as any).count({ where });
    });
  }

  /**
   * Generate search facets (aggregations)
   */
  private static async generateFacets(
    entityType: string,
    filters: SearchFilters
  ): Promise<SearchFacets> {
    const model = this.getModel(entityType);

    // Destination facet
    const destinations = await trackedQuery('facet:destinations', async () => {
      return prisma.$queryRawUnsafe(`
        SELECT destination as value, COUNT(*) as count
        FROM ${model}
        WHERE is_active = true
        GROUP BY destination
        ORDER BY count DESC
        LIMIT 20
      `);
    }) as any[];

    // Price range facets
    const priceRanges = [
      { min: 0, max: 500, count: 0 },
      { min: 500, max: 1000, count: 0 },
      { min: 1000, max: 2000, count: 0 },
      { min: 2000, max: 5000, count: 0 },
      { min: 5000, max: 999999, count: 0 },
    ];

    const priceField = this.getPriceField(entityType);
    for (const range of priceRanges) {
      range.count = await (prisma[model] as any).count({
        where: {
          isActive: true,
          [priceField]: { gte: range.min, lte: range.max },
        },
      });
    }

    // Rating facets
    const ratings = await Promise.all(
      [5, 4, 3, 2, 1].map(async (rating) => ({
        value: rating,
        count: await (prisma[model] as any).count({
          where: {
            isActive: true,
            rating: { gte: rating },
          },
        }),
      }))
    );

    // Category facets (if applicable)
    const categories = entityType === 'tour'
      ? await trackedQuery('facet:categories', async () => {
          return prisma.$queryRawUnsafe(`
            SELECT category as value, COUNT(*) as count
            FROM ${model}
            WHERE is_active = true
            GROUP BY category
            ORDER BY count DESC
          `);
        }) as any[]
      : [];

    // Amenity facets
    const amenities = await trackedQuery('facet:amenities', async () => {
      return prisma.$queryRawUnsafe(`
        SELECT unnest(amenities) as value, COUNT(*) as count
        FROM ${model}
        WHERE is_active = true
        GROUP BY value
        ORDER BY count DESC
        LIMIT 30
      `);
    }) as any[];

    return {
      destinations,
      priceRanges,
      ratings,
      categories,
      amenities,
    };
  }

  /**
   * Build ORDER BY clause
   */
  private static buildOrderBy(entityType: string, filters: SearchFilters): any {
    const sortBy = filters.sortBy || 'relevance';
    const sortOrder = filters.sortOrder || 'desc';

    switch (sortBy) {
      case 'price':
        return { [this.getPriceField(entityType)]: sortOrder };
      case 'rating':
        return { rating: sortOrder };
      case 'popularity':
        return { reviewCount: sortOrder };
      case 'date':
        return { createdAt: sortOrder };
      case 'relevance':
      default:
        // For text search, use rating as proxy for relevance
        return { rating: 'desc' };
    }
  }

  /**
   * Get Prisma model name
   */
  private static getModel(entityType: string): string {
    const mapping: Record<string, string> = {
      hotel: 'hotel',
      tour: 'tourPackage',
      carRental: 'carRental',
      property: 'rentalProperty',
    };
    return mapping[entityType] || 'hotel';
  }

  /**
   * Get price field name
   */
  private static getPriceField(entityType: string): string {
    const mapping: Record<string, string> = {
      hotel: 'priceMin',
      tour: 'priceAdult',
      carRental: 'pricePerDay',
      property: 'basePrice',
    };
    return mapping[entityType] || 'priceMin';
  }

  /**
   * Get includes for entity
   */
  private static getIncludes(entityType: string): any {
    switch (entityType) {
      case 'hotel':
        return { rooms: { take: 3 } };
      case 'tour':
        return {};
      case 'carRental':
        return {};
      case 'property':
        return {};
      default:
        return {};
    }
  }

  /**
   * Generate cache key
   */
  private static generateCacheKey(entityType: string, filters: SearchFilters): string {
    return `search:${entityType}:${JSON.stringify(filters)}`;
  }

  /**
   * Autocomplete suggestions
   */
  public static async autocomplete(
    entityType: string,
    query: string,
    limit: number = 10
  ): Promise<string[]> {
    if (query.length < 2) return [];

    const model = this.getModel(entityType);

    const results = await trackedQuery('autocomplete', async () => {
      return (prisma[model] as any).findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { destination: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: { name: true, destination: true },
        take: limit,
      });
    });

    // Extract unique suggestions
    const suggestions = new Set<string>();
    results.forEach((r: any) => {
      if (r.name) suggestions.add(r.name);
      if (r.destination) suggestions.add(r.destination);
    });

    return Array.from(suggestions).slice(0, limit);
  }
}

// ==========================================
// SEARCH HISTORY & TRENDING
// ==========================================

export class SearchAnalytics {
  /**
   * Record search query
   */
  public static async recordSearch(
    userId: string | null,
    query: string,
    filters: SearchFilters
  ): Promise<void> {
    // TODO: Implement search history tracking
    // Store in separate table for analytics
  }

  /**
   * Get trending searches
   */
  public static async getTrendingSearches(limit: number = 10): Promise<string[]> {
    // TODO: Implement trending search queries
    // Based on last 7 days
    return [
      'Cappadocia',
      'Istanbul hotels',
      'Antalya beach',
      'Pamukkale tour',
      'Ephesus',
    ];
  }

  /**
   * Get user search history
   */
  public static async getUserSearchHistory(
    userId: string,
    limit: number = 20
  ): Promise<any[]> {
    // TODO: Implement user search history
    return [];
  }
}
