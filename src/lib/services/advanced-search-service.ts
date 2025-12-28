import { 
import { logger } from '../../lib/logger/winston';
  AdvancedSearchFilters, 
  PersonalizationData, 
  LocationRecommendation,
  TrendingData,
  SearchSuggestion
} from '../search/advanced-search';
import { Location, SearchLocationsResponse } from '../types/review-system';
import logger from '../logger';

export interface AdvancedSearchResponse extends SearchLocationsResponse {
  suggestions?: SearchSuggestion[];
  trending?: TrendingData;
  recommendations?: LocationRecommendation[];
}

export interface SmartRecommendationsResponse {
  recommendations: LocationRecommendation[];
}

export interface SimilarLocationsResponse {
  similar_locations: Location[];
}

export interface TrendingDataResponse {
  trending: TrendingData | null;
}

export interface SearchAnalyticsResponse {
  analytics: {
    totalSearches: number;
    popularQueries: Array<{ query: string; count: number }>;
    averageResultsPerSearch: number;
  };
}

class AdvancedSearchService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/search/advanced';
  }

  private async makeRequest<T>(action: string, data: any): Promise<T> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          ...data
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Search request failed');
      }

      return result.data;
    } catch (error) {
      logger.error(`Advanced search service error (${action}):`, error);
      throw error;
    }
  }

  /**
   * Perform advanced search with filters and personalization
   */
  async search(
    filters: AdvancedSearchFilters,
    personalization?: PersonalizationData,
    page = 1,
    limit = 20
  ): Promise<AdvancedSearchResponse> {
    return this.makeRequest<AdvancedSearchResponse>('search', {
      filters,
      personalization,
      page,
      limit
    });
  }

  /**
   * Get smart recommendations based on user context
   */
  async getSmartRecommendations(
    personalization: PersonalizationData,
    currentLocation?: { lat: number; lng: number },
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
  ): Promise<SmartRecommendationsResponse> {
    return this.makeRequest<SmartRecommendationsResponse>('smart_recommendations', {
      personalization,
      currentLocation,
      timeOfDay
    });
  }

  /**
   * Get locations similar to a given location
   */
  async getSimilarLocations(
    locationId: number,
    limit = 5
  ): Promise<SimilarLocationsResponse> {
    return this.makeRequest<SimilarLocationsResponse>('similar_locations', {
      locationId,
      limit
    });
  }

  /**
   * Get trending search data
   */
  async getTrendingData(): Promise<TrendingDataResponse> {
    return this.makeRequest<TrendingDataResponse>('trending_data', {});
  }

  /**
   * Get search analytics data
   */
  async getSearchAnalytics(): Promise<SearchAnalyticsResponse> {
    return this.makeRequest<SearchAnalyticsResponse>('search_analytics', {});
  }

  /**
   * Search with auto-complete suggestions
   */
  async searchWithSuggestions(
    query: string,
    filters: Partial<AdvancedSearchFilters> = {},
    personalization?: PersonalizationData
  ): Promise<AdvancedSearchResponse> {
    const searchFilters: AdvancedSearchFilters = {
      query,
      ...filters
    };

    return this.search(searchFilters, personalization);
  }

  /**
   * Get personalized location recommendations for homepage
   */
  async getHomepageRecommendations(
    personalization: PersonalizationData,
    currentLocation?: { lat: number; lng: number }
  ): Promise<LocationRecommendation[]> {
    try {
      // Get time-based recommendations
      const currentHour = new Date().getHours();
      let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
      
      if (currentHour >= 5 && currentHour < 12) {
        timeOfDay = 'morning';
      } else if (currentHour >= 12 && currentHour < 17) {
        timeOfDay = 'afternoon';
      } else if (currentHour >= 17 && currentHour < 21) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }

      const result = await this.getSmartRecommendations(
        personalization,
        currentLocation,
        timeOfDay
      );

      return result.recommendations;
    } catch (error) {
      logger.error('Error getting homepage recommendations:', error as Error, { component: 'AdvancedSearchService' });
      return [];
    }
  }

  /**
   * Search for locations near user's current position
   */
  async searchNearby(
    currentLocation: { lat: number; lng: number },
    categoryId?: number,
    radius = 5,
    personalization?: PersonalizationData
  ): Promise<AdvancedSearchResponse> {
    const filters: AdvancedSearchFilters = {
      location: {
        coordinates: currentLocation,
        radius
      },
      categories: categoryId ? [categoryId] : undefined,
      sort_by: 'distance'
    };

    return this.search(filters, personalization);
  }

  /**
   * Get popular searches in a specific area
   */
  async getPopularInArea(
    cityId?: number,
    countryId?: number,
    personalization?: PersonalizationData
  ): Promise<AdvancedSearchResponse> {
    const filters: AdvancedSearchFilters = {
      location: {
        city_id: cityId,
        country_id: countryId
      },
      sort_by: 'popularity',
      rating: { min: 4.0 }
    };

    return this.search(filters, personalization, 1, 12);
  }

  /**
   * Search with voice input (for future voice search functionality)
   */
  async voiceSearch(
    voiceQuery: string,
    currentLocation?: { lat: number; lng: number },
    personalization?: PersonalizationData
  ): Promise<AdvancedSearchResponse> {
    // Process voice query to extract filters
    const filters = this.parseVoiceQuery(voiceQuery, currentLocation);
    
    return this.search(filters, personalization);
  }

  /**
   * Parse voice query into search filters (basic implementation)
   */
  private parseVoiceQuery(
    voiceQuery: string,
    currentLocation?: { lat: number; lng: number }
  ): AdvancedSearchFilters {
    const query = voiceQuery.toLowerCase();
    const filters: AdvancedSearchFilters = {};

    // Extract location if "near me" or "nearby" is mentioned
    if (query.includes('near me') || query.includes('nearby')) {
      if (currentLocation) {
        filters.location = {
          coordinates: currentLocation,
          radius: 5
        };
      }
    }

    // Extract rating requirements
    if (query.includes('highly rated') || query.includes('best')) {
      filters.rating = { min: 4.5 };
    } else if (query.includes('good') || query.includes('rated')) {
      filters.rating = { min: 4.0 };
    }

    // Extract price preferences
    if (query.includes('cheap') || query.includes('budget')) {
      filters.price_range = { min: 1, max: 2 };
    } else if (query.includes('expensive') || query.includes('luxury')) {
      filters.price_range = { min: 3, max: 4 };
    }

    // Extract features
    const features: string[] = [];
    if (query.includes('wifi')) features.push('wifi');
    if (query.includes('parking')) features.push('parking');
    if (query.includes('outdoor')) features.push('outdoor_seating');
    if (query.includes('takeout') || query.includes('take out')) features.push('takeout');
    if (query.includes('delivery')) features.push('delivery');
    
    if (features.length > 0) {
      filters.features = features;
    }

    // Set the main query (remove processed parts)
    let mainQuery = voiceQuery;
    ['near me', 'nearby', 'highly rated', 'best', 'good', 'rated', 
     'cheap', 'budget', 'expensive', 'luxury'].forEach(phrase => {
      mainQuery = mainQuery.replace(new RegExp(phrase, 'gi'), '').trim();
    });

    if (mainQuery) {
      filters.query = mainQuery;
    }

    return filters;
  }

  /**
   * Get filter suggestions based on current search context
   */
  getFilterSuggestions(
    currentFilters: AdvancedSearchFilters,
    searchResults: Location[]
  ): {
    categories: Array<{ id: number; name: string; count: number }>;
    priceRanges: Array<{ range: number; count: number }>;
    features: Array<{ feature: string; count: number }>;
    ratings: Array<{ rating: number; count: number }>;
  } {
    const suggestions = {
      categories: [] as Array<{ id: number; name: string; count: number }>,
      priceRanges: [] as Array<{ range: number; count: number }>,
      features: [] as Array<{ feature: string; count: number }>,
      ratings: [] as Array<{ rating: number; count: number }>
    };

    // Analyze search results to suggest filters
    const categoryCount = new Map<number, number>();
    const priceRangeCount = new Map<number, number>();
    const featureCount = new Map<string, number>();
    const ratingCount = new Map<number, number>();

    searchResults.forEach(location => {
      // Count categories
      categoryCount.set(location.category_id, (categoryCount.get(location.category_id) || 0) + 1);

      // Count price ranges
      if (location.price_range) {
        priceRangeCount.set(location.price_range, (priceRangeCount.get(location.price_range) || 0) + 1);
      }

      // Count features
      location.features?.forEach(feature => {
        featureCount.set(feature, (featureCount.get(feature) || 0) + 1);
      });

      // Count ratings (rounded)
      const ratingBucket = Math.floor(location.average_rating);
      ratingCount.set(ratingBucket, (ratingCount.get(ratingBucket) || 0) + 1);
    });

    // Convert to sorted arrays
    suggestions.priceRanges = Array.from(priceRangeCount.entries())
      .map(([range, count]) => ({ range, count }))
      .sort((a, b) => b.count - a.count);

    suggestions.features = Array.from(featureCount.entries())
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 features

    suggestions.ratings = Array.from(ratingCount.entries())
      .map(([rating, count]) => ({ rating, count }))
      .sort((a, b) => b.rating - a.rating);

    return suggestions;
  }
}

// Singleton instance
export const advancedSearchService = new AdvancedSearchService();
export default advancedSearchService;