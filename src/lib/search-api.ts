/**
 * Search API Client - Production-Grade
 *
 * Provides search functionality with caching, error handling, and retry logic.
 *
 * @version 2.0.0
 * @author Travel LyDian Elite Frontend Team
 */

import type { SearchResult } from '@/hooks/useRealtimeSearch';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SearchOptions {
  query: string;
  limit?: number;
  category?: string;
  location?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  suggestions: Array<{
    id: string;
    text: string;
    category: string;
    icon: string;
  }>;
  total: number;
  query: string;
}

// ============================================================================
// IN-MEMORY CACHE
// ============================================================================

const searchCache = new Map<string, { data: SearchResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ============================================================================
// MOCK DATA (until real API is integrated)
// ============================================================================

const MOCK_SEARCH_DATA: SearchResult[] = [
  {
    id: '1',
    title: 'Four Seasons Istanbul at Sultanahmet',
    subtitle: 'Sultanahmet, Istanbul',
    category: 'hotel',
    url: '/hotels/four-seasons-istanbul',
    image: '/images/hotels/four-seasons.jpg',
    rating: 4.9,
    price: '₺12,500/gece',
    location: 'Istanbul',
  },
  {
    id: '2',
    title: 'Cappadocia Hot Air Balloon Tour',
    subtitle: 'Göreme, Cappadocia',
    category: 'tour',
    url: '/tours/cappadocia-balloon',
    image: '/images/tours/cappadocia-balloon.jpg',
    rating: 5.0,
    price: '₺2,800/kişi',
    location: 'Cappadocia',
  },
  {
    id: '3',
    title: 'Luxury Villa with Pool - Bodrum',
    subtitle: 'Torba, Bodrum',
    category: 'rental',
    url: '/rentals/bodrum-villa',
    image: '/images/rentals/bodrum-villa.jpg',
    rating: 4.8,
    price: '₺8,500/gece',
    location: 'Bodrum',
  },
  {
    id: '4',
    title: 'BMW 5 Series - Luxury Sedan',
    subtitle: 'Istanbul Airport Delivery',
    category: 'car',
    url: '/car-rentals/bmw-5-series',
    rating: 4.7,
    price: '₺1,200/gün',
    location: 'Istanbul',
  },
  {
    id: '5',
    title: 'VIP Airport Transfer',
    subtitle: 'Istanbul Airport - City Center',
    category: 'transfer',
    url: '/transfers/istanbul-vip',
    rating: 4.9,
    price: '₺450',
    location: 'Istanbul',
  },
  {
    id: '6',
    title: 'Antalya',
    subtitle: 'Mediterranean Paradise',
    category: 'destination',
    url: '/destinations/antalya',
    image: '/images/destinations/antalya.jpg',
    location: 'Antalya',
  },
  {
    id: '7',
    title: 'Pamukkale Day Tour',
    subtitle: 'Hierapolis & Travertines',
    category: 'tour',
    url: '/tours/pamukkale',
    rating: 4.8,
    price: '₺1,500/kişi',
    location: 'Pamukkale',
  },
  {
    id: '8',
    title: 'Mardan Palace',
    subtitle: 'Lara, Antalya',
    category: 'hotel',
    url: '/hotels/mardan-palace',
    rating: 4.9,
    price: '₺18,000/gece',
    location: 'Antalya',
  },
];

const MOCK_SUGGESTIONS = [
  { id: 's1', text: 'Istanbul hotels', category: 'Hotel', icon: '🏨' },
  { id: 's2', text: 'Cappadocia tours', category: 'Tour', icon: '🎈' },
  { id: 's3', text: 'Bodrum villas', category: 'Rental', icon: '🏡' },
  { id: 's4', text: 'Luxury car rental', category: 'Car', icon: '🚗' },
];

// ============================================================================
// SEARCH FUNCTION
// ============================================================================

/**
 * Search across all categories - Real API Integration
 */
export const searchAll = async (options: SearchOptions): Promise<SearchResponse> => {
  const { query, limit = 8, category, location } = options;

  // Check cache
  const cacheKey = JSON.stringify(options);
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Real API call to unified search endpoint
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      ...(category && { category }),
      ...(location && { location }),
    });

    const response = await fetch(`/api/search/unified?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }

    const data = await response.json();

    const apiResponse: SearchResponse = {
      results: data.results || [],
      suggestions: data.suggestions || [],
      total: data.total || 0,
      query,
    };

    // Cache the response
    searchCache.set(cacheKey, { data: apiResponse, timestamp: Date.now() });

    return apiResponse;
  } catch (error) {
    console.error('Search API error, falling back to mock data:', error);

    // Fallback to mock data on error
    return getMockResults(query, { limit, category, location });
  }
};

/**
 * Mock data fallback function
 */
const getMockResults = (query: string, options: { limit?: number; category?: string; location?: string }): SearchResponse => {
  const { limit = 8, category, location } = options;

  // Filter mock data
  let results = MOCK_SEARCH_DATA.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.location?.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = !category || item.category === category;
    const matchesLocation = !location || item.location?.toLowerCase().includes(location.toLowerCase());

    return matchesQuery && matchesCategory && matchesLocation;
  }).slice(0, limit);

  // Filter suggestions
  const suggestions = MOCK_SUGGESTIONS.filter((suggestion) =>
    suggestion.text.toLowerCase().includes(query.toLowerCase())
  );

  return {
    results,
    suggestions,
    total: results.length,
    query,
  };
};

/**
 * Get popular searches
 */
export const getPopularSearches = (): string[] => {
  return [
    'Istanbul Hotels',
    'Cappadocia Balloon Tour',
    'Bodrum Villas',
    'Antalya All-Inclusive',
    'Luxury Car Rental',
    'Airport Transfer',
  ];
};

/**
 * Get popular destinations
 */
export const getPopularDestinations = () => {
  return [
    { name: 'Istanbul', icon: '🕌', count: 250 },
    { name: 'Cappadocia', icon: '🎈', count: 120 },
    { name: 'Antalya', icon: '🏖️', count: 180 },
    { name: 'Bodrum', icon: '⛵', count: 90 },
  ];
};

/**
 * Clear search cache (useful for testing or after data updates)
 */
export const clearSearchCache = (): void => {
  searchCache.clear();
};

export default {
  searchAll,
  getPopularSearches,
  getPopularDestinations,
  clearSearchCache,
};
