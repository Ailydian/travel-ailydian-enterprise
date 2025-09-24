import { Location, Review, SearchLocationsRequest, SearchLocationsResponse, City, Country, LocationCategory } from '../types/review-system';
import reviewService from '../services/review-service';

// Advanced search types
export interface AdvancedSearchFilters {
  query?: string;
  location?: {
    coordinates?: { lat: number; lng: number };
    radius?: number; // in km
    city_id?: number;
    country_id?: number;
    timezone?: string;
  };
  categories?: number[];
  rating?: {
    min?: number;
    max?: number;
  };
  price_range?: {
    min?: number;
    max?: number;
  };
  features?: string[];
  opening_hours?: {
    day?: string;
    time?: string;
    open_now?: boolean;
  };
  reviews?: {
    min_count?: number;
    languages?: string[];
    recency?: 'week' | 'month' | 'year' | 'all';
  };
  verification?: {
    verified_only?: boolean;
    claimed_only?: boolean;
  };
  accessibility?: {
    wheelchair_accessible?: boolean;
    pet_friendly?: boolean;
  };
  language?: string;
  sort_by?: 'relevance' | 'rating' | 'distance' | 'popularity' | 'recent' | 'price' | 'reviews';
  sort_order?: 'asc' | 'desc';
}

export interface PersonalizationData {
  user_id?: number;
  preferences?: {
    categories?: number[];
    price_range?: number;
    features?: string[];
    languages?: string[];
  };
  history?: {
    searches?: string[];
    visits?: number[];
    favorites?: number[];
    reviews?: number[];
  };
  demographics?: {
    age_group?: 'young' | 'adult' | 'senior';
    travel_style?: 'budget' | 'mid-range' | 'luxury' | 'backpacker' | 'business';
    group_type?: 'solo' | 'couple' | 'family' | 'friends' | 'business';
  };
  location?: {
    current?: { lat: number; lng: number };
    home?: { city_id: number; country_id: number };
  };
}

export interface SearchSuggestion {
  type: 'location' | 'category' | 'feature' | 'query';
  text: string;
  data?: any;
  score: number;
  icon?: string;
}

export interface TrendingData {
  locations: Location[];
  categories: LocationCategory[];
  features: string[];
  destinations: City[];
  search_terms: string[];
  period: 'day' | 'week' | 'month';
  generated_at: string;
}

export interface RecommendationReason {
  type: 'rating' | 'popularity' | 'proximity' | 'preference' | 'trending' | 'similar_users' | 'reviews';
  description: string;
  weight: number;
}

export interface LocationRecommendation extends Location {
  recommendation_score: number;
  reasons: RecommendationReason[];
  personalized?: boolean;
  distance?: number;
  predicted_rating?: number;
}

class AdvancedSearchEngine {
  private searchHistory: Map<string, any[]> = new Map();
  private userPreferences: Map<number, PersonalizationData> = new Map();
  private trendingCache: TrendingData | null = null;
  private cacheExpiry: number = 30 * 60 * 1000; // 30 minutes

  constructor() {
    // Initialize trending data refresh
    this.refreshTrendingData();
    setInterval(() => this.refreshTrendingData(), this.cacheExpiry);
  }

  // ==================== MAIN SEARCH METHOD ====================

  async advancedSearch(
    filters: AdvancedSearchFilters,
    personalization?: PersonalizationData,
    page = 1,
    limit = 20
  ): Promise<SearchLocationsResponse & { 
    suggestions?: SearchSuggestion[];
    trending?: TrendingData;
    recommendations?: LocationRecommendation[];
  }> {
    try {
      // Build base search request
      const searchRequest: SearchLocationsRequest = {
        query: filters.query,
        city_id: filters.location?.city_id,
        country_id: filters.location?.country_id,
        category_id: filters.categories?.[0], // Primary category
        coordinates: filters.location?.coordinates,
        radius: filters.location?.radius,
        min_rating: filters.rating?.min,
        max_price_range: filters.price_range?.max,
        features: filters.features,
        sort_by: filters.sort_by || 'relevance',
        sort_order: filters.sort_order || 'desc',
        page,
        limit,
        language: filters.language || 'en'
      };

      // Execute base search
      const baseResults = await reviewService.searchLocations(searchRequest);

      // Apply advanced filters
      const filteredLocations = this.applyAdvancedFilters(baseResults.locations, filters);

      // Generate personalized recommendations if user data provided
      let recommendations: LocationRecommendation[] = [];
      if (personalization?.user_id) {
        recommendations = await this.generatePersonalizedRecommendations(
          filteredLocations,
          personalization,
          filters
        );
      }

      // Generate search suggestions
      const suggestions = await this.generateSearchSuggestions(filters.query || '', filters);

      // Get trending data
      const trending = await this.getTrendingData();

      // Apply personalized scoring and ranking
      const rankedLocations = this.rankAndScore(
        filteredLocations,
        filters,
        personalization
      );

      // Store search in history for learning
      if (filters.query) {
        this.updateSearchHistory(filters.query, rankedLocations);
      }

      return {
        ...baseResults,
        locations: rankedLocations.slice((page - 1) * limit, page * limit),
        total_count: rankedLocations.length,
        suggestions,
        trending,
        recommendations: recommendations.slice(0, 5) // Top 5 recommendations
      };

    } catch (error) {
      console.error('Advanced search error:', error);
      throw error;
    }
  }

  // ==================== PERSONALIZED RECOMMENDATIONS ====================

  async generatePersonalizedRecommendations(
    locations: Location[],
    personalization: PersonalizationData,
    filters: AdvancedSearchFilters
  ): Promise<LocationRecommendation[]> {
    const recommendations: LocationRecommendation[] = [];

    for (const location of locations) {
      const score = await this.calculatePersonalizationScore(location, personalization);
      const reasons = this.getRecommendationReasons(location, personalization, score);

      if (score > 0.3) { // Threshold for recommendations
        recommendations.push({
          ...location,
          recommendation_score: score,
          reasons,
          personalized: true,
          distance: this.calculateDistance(
            location.coordinates,
            personalization.location?.current || { lat: 0, lng: 0 }
          )
        });
      }
    }

    return recommendations.sort((a, b) => b.recommendation_score - a.recommendation_score);
  }

  private async calculatePersonalizationScore(
    location: Location,
    personalization: PersonalizationData
  ): Promise<number> {
    let score = 0;
    let weightSum = 0;

    // Category preference
    if (personalization.preferences?.categories?.includes(location.category_id)) {
      score += 0.3;
      weightSum += 0.3;
    }

    // Price range preference
    if (personalization.preferences?.price_range === location.price_range) {
      score += 0.2;
      weightSum += 0.2;
    }

    // Feature preferences
    const featureMatch = this.calculateFeatureMatch(
      location.features || [],
      personalization.preferences?.features || []
    );
    score += featureMatch * 0.2;
    weightSum += 0.2;

    // Historical preferences (visited similar places)
    if (personalization.history?.visits) {
      const historyScore = await this.calculateHistoryScore(location, personalization.history.visits);
      score += historyScore * 0.15;
      weightSum += 0.15;
    }

    // Rating boost
    score += (location.average_rating / 5) * 0.1;
    weightSum += 0.1;

    // Review count boost (logarithmic)
    const reviewBoost = Math.min(Math.log(location.total_reviews + 1) / Math.log(100), 1) * 0.05;
    score += reviewBoost;
    weightSum += 0.05;

    return weightSum > 0 ? score / weightSum : 0;
  }

  private getRecommendationReasons(
    location: Location,
    personalization: PersonalizationData,
    score: number
  ): RecommendationReason[] {
    const reasons: RecommendationReason[] = [];

    if (location.average_rating >= 4.5) {
      reasons.push({
        type: 'rating',
        description: 'Highly rated by travelers',
        weight: 0.3
      });
    }

    if (location.total_reviews >= 100) {
      reasons.push({
        type: 'popularity',
        description: 'Popular among travelers',
        weight: 0.2
      });
    }

    if (personalization.preferences?.categories?.includes(location.category_id)) {
      reasons.push({
        type: 'preference',
        description: 'Matches your interests',
        weight: 0.25
      });
    }

    if (personalization.location?.current && this.calculateDistance(
      location.coordinates,
      personalization.location.current
    ) < 5) {
      reasons.push({
        type: 'proximity',
        description: 'Close to your location',
        weight: 0.15
      });
    }

    return reasons.sort((a, b) => b.weight - a.weight);
  }

  // ==================== SEARCH SUGGESTIONS ====================

  async generateSearchSuggestions(
    query: string,
    filters: AdvancedSearchFilters
  ): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];

    if (!query) return suggestions;

    try {
      // Location suggestions
      const cities = await reviewService.getCities();
      const locationSuggestions = cities
        .filter(city => 
          Object.values(city.name).some(name => 
            name.toLowerCase().includes(query.toLowerCase())
          )
        )
        .slice(0, 3)
        .map(city => ({
          type: 'location' as const,
          text: Object.values(city.name)[0],
          data: { city_id: city.id },
          score: 0.8,
          icon: 'map-pin'
        }));

      suggestions.push(...locationSuggestions);

      // Category suggestions
      const categories = await reviewService.getLocationCategories();
      const categorySuggestions = categories
        .filter(category =>
          Object.values(category.name).some(name =>
            name.toLowerCase().includes(query.toLowerCase())
          )
        )
        .slice(0, 2)
        .map(category => ({
          type: 'category' as const,
          text: Object.values(category.name)[0],
          data: { category_id: category.id },
          score: 0.7,
          icon: 'tag'
        }));

      suggestions.push(...categorySuggestions);

      // Feature suggestions
      const commonFeatures = [
        'wifi', 'parking', 'wheelchair_accessible', 'pet_friendly',
        'outdoor_seating', 'credit_cards', 'reservations', 'takeout'
      ];
      const featureSuggestions = commonFeatures
        .filter(feature => feature.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 2)
        .map(feature => ({
          type: 'feature' as const,
          text: feature.replace('_', ' '),
          data: { feature },
          score: 0.6,
          icon: 'star'
        }));

      suggestions.push(...featureSuggestions);

      // Query suggestions from history
      const historySuggestions = this.getHistorySuggestions(query);
      suggestions.push(...historySuggestions);

    } catch (error) {
      console.error('Error generating suggestions:', error);
    }

    return suggestions.sort((a, b) => b.score - a.score).slice(0, 8);
  }

  private getHistorySuggestions(query: string): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    const lowerQuery = query.toLowerCase();

    for (const [searchTerm] of this.searchHistory.entries()) {
      if (searchTerm.toLowerCase().includes(lowerQuery) && searchTerm !== query) {
        suggestions.push({
          type: 'query',
          text: searchTerm,
          score: 0.5,
          icon: 'clock'
        });
      }
    }

    return suggestions.slice(0, 3);
  }

  // ==================== TRENDING DATA ====================

  private async refreshTrendingData(): Promise<void> {
    try {
      // In a real implementation, this would query analytics data
      // For now, we'll simulate trending data
      const trendingLocations = await reviewService.searchLocations({
        sort_by: 'popularity',
        sort_order: 'desc',
        limit: 10
      });

      const categories = await reviewService.getLocationCategories();
      const cities = await reviewService.getCities(undefined, 'en', true);

      this.trendingCache = {
        locations: trendingLocations.locations,
        categories: categories.slice(0, 5),
        features: ['wifi', 'outdoor_seating', 'parking', 'pet_friendly', 'credit_cards'],
        destinations: cities.slice(0, 10),
        search_terms: ['restaurants', 'coffee', 'museums', 'parks', 'hotels'],
        period: 'week',
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error refreshing trending data:', error);
    }
  }

  async getTrendingData(): Promise<TrendingData | null> {
    return this.trendingCache;
  }

  // ==================== FILTERING AND RANKING ====================

  private applyAdvancedFilters(
    locations: Location[],
    filters: AdvancedSearchFilters
  ): Location[] {
    return locations.filter(location => {
      // Rating filter
      if (filters.rating?.min && location.average_rating < filters.rating.min) {
        return false;
      }
      if (filters.rating?.max && location.average_rating > filters.rating.max) {
        return false;
      }

      // Price range filter
      if (filters.price_range?.min && location.price_range < filters.price_range.min) {
        return false;
      }
      if (filters.price_range?.max && location.price_range > filters.price_range.max) {
        return false;
      }

      // Features filter
      if (filters.features?.length) {
        const locationFeatures = location.features || [];
        const hasAllFeatures = filters.features.every(feature => 
          locationFeatures.includes(feature)
        );
        if (!hasAllFeatures) {
          return false;
        }
      }

      // Verification filters
      if (filters.verification?.verified_only && !location.verified) {
        return false;
      }
      if (filters.verification?.claimed_only && !location.claimed) {
        return false;
      }

      // Review count filter
      if (filters.reviews?.min_count && location.total_reviews < filters.reviews.min_count) {
        return false;
      }

      // Opening hours filter (simplified)
      if (filters.opening_hours?.open_now) {
        // This would require checking current time against opening hours
        // Simplified implementation
        if (!location.opening_hours) {
          return false;
        }
      }

      return true;
    });
  }

  private rankAndScore(
    locations: Location[],
    filters: AdvancedSearchFilters,
    personalization?: PersonalizationData
  ): Location[] {
    return locations.map(location => {
      let relevanceScore = 0;

      // Base rating score
      relevanceScore += (location.average_rating / 5) * 0.3;

      // Review count score (logarithmic)
      relevanceScore += Math.min(Math.log(location.total_reviews + 1) / Math.log(1000), 1) * 0.2;

      // Verification bonus
      if (location.verified) relevanceScore += 0.1;
      if (location.claimed) relevanceScore += 0.05;

      // Distance penalty (if location provided)
      if (filters.location?.coordinates && location.coordinates) {
        const distance = this.calculateDistance(filters.location.coordinates, location.coordinates);
        const maxDistance = filters.location.radius || 50;
        const distancePenalty = Math.min(distance / maxDistance, 1) * 0.15;
        relevanceScore -= distancePenalty;
      }

      // Feature bonus
      if (filters.features?.length && location.features) {
        const featureMatch = this.calculateFeatureMatch(location.features, filters.features);
        relevanceScore += featureMatch * 0.1;
      }

      // Personalization bonus
      if (personalization) {
        const personalBonus = this.calculatePersonalBonus(location, personalization);
        relevanceScore += personalBonus * 0.2;
      }

      return {
        ...location,
        relevance_score: Math.max(0, Math.min(1, relevanceScore))
      };
    }).sort((a, b) => {
      switch (filters.sort_by) {
        case 'rating':
          return filters.sort_order === 'desc' 
            ? b.average_rating - a.average_rating
            : a.average_rating - b.average_rating;
        case 'reviews':
          return filters.sort_order === 'desc'
            ? b.total_reviews - a.total_reviews
            : a.total_reviews - b.total_reviews;
        case 'price':
          return filters.sort_order === 'desc'
            ? b.price_range - a.price_range
            : a.price_range - b.price_range;
        case 'distance':
          // Would need to implement distance calculation
          return 0;
        case 'recent':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'relevance':
        default:
          const aScore = (a as any).relevance_score || 0;
          const bScore = (b as any).relevance_score || 0;
          return filters.sort_order === 'desc' ? bScore - aScore : aScore - bScore;
      }
    });
  }

  // ==================== UTILITY METHODS ====================

  private calculateFeatureMatch(locationFeatures: string[], requestedFeatures: string[]): number {
    if (requestedFeatures.length === 0) return 0;
    const matches = requestedFeatures.filter(feature => locationFeatures.includes(feature)).length;
    return matches / requestedFeatures.length;
  }

  private calculateDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(coord2.lat - coord1.lat);
    const dLng = this.deg2rad(coord2.lng - coord1.lng);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(coord1.lat)) * Math.cos(this.deg2rad(coord2.lat)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  private calculatePersonalBonus(location: Location, personalization: PersonalizationData): number {
    let bonus = 0;

    // Category preference
    if (personalization.preferences?.categories?.includes(location.category_id)) {
      bonus += 0.4;
    }

    // Price range preference
    if (personalization.preferences?.price_range === location.price_range) {
      bonus += 0.3;
    }

    // Feature preferences
    if (location.features && personalization.preferences?.features) {
      const featureMatch = this.calculateFeatureMatch(location.features, personalization.preferences.features);
      bonus += featureMatch * 0.3;
    }

    return Math.min(bonus, 1);
  }

  private async calculateHistoryScore(locationId: number, visitHistory: number[]): Promise<number> {
    // This would analyze user's visit history to find similar locations
    // For now, simplified implementation
    return visitHistory.includes(locationId) ? 0.2 : 0;
  }

  private updateSearchHistory(query: string, results: Location[]): void {
    this.searchHistory.set(query, results);
    
    // Keep only last 100 searches
    if (this.searchHistory.size > 100) {
      const oldestKey = this.searchHistory.keys().next().value;
      this.searchHistory.delete(oldestKey);
    }
  }

  // ==================== AI-POWERED FEATURES ====================

  async getSmartRecommendations(
    userContext: PersonalizationData,
    currentLocation?: { lat: number; lng: number },
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
  ): Promise<LocationRecommendation[]> {
    const filters: AdvancedSearchFilters = {
      location: currentLocation ? { coordinates: currentLocation, radius: 10 } : undefined,
      rating: { min: 4.0 },
      sort_by: 'relevance'
    };

    // Time-based recommendations
    if (timeOfDay === 'morning') {
      filters.categories = [1]; // Restaurants/Cafes
      filters.features = ['breakfast', 'coffee'];
    } else if (timeOfDay === 'evening') {
      filters.categories = [1, 5]; // Restaurants, Entertainment
      filters.features = ['dinner', 'bar', 'live_music'];
    }

    const results = await this.advancedSearch(filters, userContext, 1, 10);
    return results.recommendations || [];
  }

  async getSimilarLocations(locationId: number, limit = 5): Promise<Location[]> {
    try {
      const location = await reviewService.getLocation(locationId);
      
      const filters: AdvancedSearchFilters = {
        categories: [location.category_id],
        price_range: { min: Math.max(1, location.price_range - 1), max: Math.min(4, location.price_range + 1) },
        rating: { min: Math.max(1, location.average_rating - 1) },
        features: location.features,
        sort_by: 'rating'
      };

      const results = await this.advancedSearch(filters, undefined, 1, limit + 1);
      
      // Remove the original location from results
      return results.locations.filter(loc => loc.id !== locationId).slice(0, limit);
    } catch (error) {
      console.error('Error getting similar locations:', error);
      return [];
    }
  }

  // ==================== ANALYTICS ====================

  getSearchAnalytics(): {
    totalSearches: number;
    popularQueries: Array<{ query: string; count: number }>;
    averageResultsPerSearch: number;
  } {
    const totalSearches = this.searchHistory.size;
    const popularQueries = Array.from(this.searchHistory.entries())
      .map(([query, results]) => ({ query, count: results.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const averageResultsPerSearch = totalSearches > 0 
      ? Array.from(this.searchHistory.values()).reduce((sum, results) => sum + results.length, 0) / totalSearches
      : 0;

    return {
      totalSearches,
      popularQueries,
      averageResultsPerSearch
    };
  }
}

// Singleton instance
export const advancedSearchEngine = new AdvancedSearchEngine();
export default advancedSearchEngine;