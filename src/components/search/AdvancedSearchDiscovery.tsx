'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  FunnelIcon,
  ClockIcon,
  TrendingUpIcon,
  HeartIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronDownIcon,
  SparklesIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
  MapPinIcon as MapPinIconSolid
} from '@heroicons/react/24/solid';

import advancedSearchEngine, { 
  AdvancedSearchFilters, 
  PersonalizationData, 
  SearchSuggestion,
  LocationRecommendation,
  TrendingData
} from '../../lib/search/advanced-search';
import { Location, LocationCategory, City } from '../../lib/types/review-system';
import reviewService from '../../lib/services/review-service';

interface AdvancedSearchDiscoveryProps {
  initialQuery?: string;
  personalization?: PersonalizationData;
  onLocationSelect?: (location: Location) => void;
  showRecommendations?: boolean;
  showTrending?: boolean;
}

const AdvancedSearchDiscovery: React.FC<AdvancedSearchDiscoveryProps> = ({
  initialQuery = '',
  personalization,
  onLocationSelect,
  showRecommendations = true,
  showTrending = true
}) => {
  const { t, i18n } = useTranslation('common');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State management
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    language: i18n.language
  });
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [recommendations, setRecommendations] = useState<LocationRecommendation[]>([]);
  const [trending, setTrending] = useState<TrendingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // Data for filters
  const [categories, setCategories] = useState<LocationCategory[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Constants
  const PRICE_RANGES = [
    { value: 1, label: '$', description: t('price.budget') },
    { value: 2, label: '$$', description: t('price.moderate') },
    { value: 3, label: '$$$', description: t('price.expensive') },
    { value: 4, label: '$$$$', description: t('price.luxury') }
  ];

  const COMMON_FEATURES = [
    'wifi', 'parking', 'wheelchair_accessible', 'pet_friendly',
    'outdoor_seating', 'credit_cards', 'reservations', 'takeout',
    'delivery', 'breakfast', 'lunch', 'dinner', 'bar', 'live_music'
  ];

  const SORT_OPTIONS = [
    { value: 'relevance', label: t('sort.relevance') },
    { value: 'rating', label: t('sort.rating') },
    { value: 'distance', label: t('sort.distance') },
    { value: 'popularity', label: t('sort.popularity') },
    { value: 'recent', label: t('sort.recent') },
    { value: 'price', label: t('sort.price') },
    { value: 'reviews', label: t('sort.reviews') }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const [categoriesData, citiesData, trendingData] = await Promise.all([
          reviewService.getLocationCategories(),
          reviewService.getCities(undefined, i18n.language, true),
          advancedSearchEngine.getTrendingData()
        ]);

        setCategories(categoriesData);
        setCities(citiesData);
        setTrending(trendingData);

        // Get user's current location if available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          });
        }
      } catch (error) {
        console.error('Error initializing search data:', error);
      }
    };

    initializeData();
  }, [i18n.language]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setLocations([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, filters, currentPage, handleSearch]);

  // Handle search
  const handleSearch = useCallback(async () => {
    if (!query.trim() && !Object.keys(filters).some(key => filters[key as keyof AdvancedSearchFilters])) {
      return;
    }

    setIsLoading(true);
    try {
      const searchFilters: AdvancedSearchFilters = {
        ...filters,
        query: query.trim(),
        location: userLocation ? {
          ...filters.location,
          coordinates: userLocation
        } : filters.location
      };

      const results = await advancedSearchEngine.advancedSearch(
        searchFilters,
        personalization,
        currentPage,
        20
      );

      setLocations(results.locations);
      setTotalResults(results.total_count);
      setSuggestions(results.suggestions || []);
      
      if (showRecommendations) {
        setRecommendations(results.recommendations || []);
      }

    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, filters, currentPage, userLocation, personalization, showRecommendations]);

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'location' && suggestion.data?.city_id) {
      setFilters(prev => ({ ...prev, location: { city_id: suggestion.data.city_id } }));
    } else if (suggestion.type === 'category' && suggestion.data?.category_id) {
      setFilters(prev => ({ 
        ...prev, 
        categories: [suggestion.data.category_id] 
      }));
    } else if (suggestion.type === 'feature' && suggestion.data?.feature) {
      setFilters(prev => ({ 
        ...prev, 
        features: [...(prev.features || []), suggestion.data.feature]
      }));
    } else if (suggestion.type === 'query') {
      setQuery(suggestion.text);
    }
    setShowSuggestions(false);
  };

  // Filter update handlers
  const updateFilter = <K extends keyof AdvancedSearchFilters>(
    key: K, 
    value: AdvancedSearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilter = (key: keyof AdvancedSearchFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({ language: i18n.language });
    setQuery('');
    setCurrentPage(1);
  };

  // Render rating stars
  const renderRating = (rating: number, size = 'w-4 h-4') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`${size} ${i <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  // Location card component
  const LocationCard: React.FC<{ location: Location }> = ({ location }) => (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer border border-gray-100"
      onClick={() => onLocationSelect?.(location)}
    >
      {location.photos && location.photos.length > 0 && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <Image 
            src={location.photos[0].url} 
            alt={location.photos[0].caption || Object.values(location.name)[0]}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {Object.values(location.name)[0]}
          </h3>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          {renderRating(location.average_rating)}
          <span className="text-sm text-gray-600">
            ({location.total_reviews} {t('reviews')})
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {Object.values(location.description || {})[0]}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPinIcon className="w-4 h-4 mr-1" />
            <span>{location.address}</span>
          </div>
          {location.price_range && (
            <div className="text-green-600 font-semibold">
              {PRICE_RANGES.find(p => p.value === location.price_range)?.label}
            </div>
          )}
        </div>
        
        {location.features && location.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {location.features.slice(0, 3).map(feature => (
              <span 
                key={feature}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {feature.replace('_', ' ')}
              </span>
            ))}
            {location.features.length > 3 && (
              <span className="text-xs text-gray-500">
                +{location.features.length - 3} {t('more')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Recommendation card component
  const RecommendationCard: React.FC<{ recommendation: LocationRecommendation }> = ({ 
    recommendation 
  }) => (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-5 h-5 text-purple-600" />
          <span className="text-purple-600 font-medium text-sm">
            {Math.round(recommendation.recommendation_score * 100)}% {t('match')}
          </span>
        </div>
        {recommendation.personalized && (
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {t('personalized')}
          </span>
        )}
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-1">
        {Object.values(recommendation.name)[0]}
      </h4>
      
      <div className="flex items-center space-x-2 mb-2">
        {renderRating(recommendation.average_rating, 'w-3 h-3')}
        <span className="text-xs text-gray-600">
          {recommendation.total_reviews} {t('reviews')}
        </span>
      </div>
      
      <div className="space-y-1">
        {recommendation.reasons.slice(0, 2).map((reason, idx) => (
          <div key={idx} className="flex items-center text-xs text-gray-600">
            <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
            {reason.description}
          </div>
        ))}
      </div>
    </div>
  );

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F3F4F6] mb-4 neon-text">
            Seyahat Keşfi
          </h1>
        
        {/* Main Search Bar */}
        <div className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={t('search.placeholder')}
              className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <FunnelIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-left"
                >
                  {suggestion.icon === 'map-pin' && <MapPinIcon className="w-4 h-4 text-gray-400" />}
                  {suggestion.icon === 'tag' && <TagIcon className="w-4 h-4 text-gray-400" />}
                  {suggestion.icon === 'star' && <StarIcon className="w-4 h-4 text-gray-400" />}
                  {suggestion.icon === 'clock' && <ClockIcon className="w-4 h-4 text-gray-400" />}
                  <span className="text-gray-900">{suggestion.text}</span>
                  <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Filters */}
        {(Object.keys(filters).length > 1 || query) && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {query && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                &quot;{query}&quot;
                <button
                  onClick={() => setQuery('')}
                  className="ml-2 hover:text-blue-600"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.categories?.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <span 
                  key={categoryId}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {Object.values(category.name)[0]}
                  <button 
                    onClick={() => updateFilter('categories', filters.categories?.filter(id => id !== categoryId))}
                    className="ml-2 hover:text-green-600"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
            
            {filters.rating?.min && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
                {filters.rating.min}+ ⭐
                <button 
                  onClick={() => clearFilter('rating')}
                  className="ml-2 hover:text-yellow-600"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            
            <button
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              {t('search.clear_all')}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{t('search.filters')}</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="lg:hidden"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.category')}
              </label>
              <select
                value={filters.categories?.[0] || ''}
                onChange={(e) => updateFilter('categories', e.target.value ? [parseInt(e.target.value)] : undefined)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">{t('search.all_categories')}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {Object.values(category.name)[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.minimum_rating')}
              </label>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating?.min === rating}
                      onChange={(e) => updateFilter('rating', { min: parseFloat(e.target.value) })}
                      className="mr-2"
                    />
                    <div className="flex items-center space-x-1">
                      {renderRating(rating, 'w-3 h-3')}
                      <span className="text-sm text-gray-700">{rating}+</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.price_range')}
              </label>
              <div className="space-y-2">
                {PRICE_RANGES.map(price => (
                  <label key={price.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.price_range?.min === price.value || filters.price_range?.max === price.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilter('price_range', { 
                            min: price.value, 
                            max: price.value 
                          });
                        } else {
                          clearFilter('price_range');
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="font-semibold mr-2">{price.label}</span>
                    <span className="text-sm text-gray-600">{price.description}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.features')}
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {COMMON_FEATURES.map(feature => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.features?.includes(feature) || false}
                      onChange={(e) => {
                        const currentFeatures = filters.features || [];
                        if (e.target.checked) {
                          updateFilter('features', [...currentFeatures, feature]);
                        } else {
                          updateFilter('features', currentFeatures.filter(f => f !== feature));
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">
                      {feature.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.sort_by')}
              </label>
              <select
                value={filters.sort_by || 'relevance'}
                onChange={(e) => updateFilter('sort_by', e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Recommendations Section */}
          {showRecommendations && recommendations.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  {t('search.recommended_for_you')}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map(recommendation => (
                  <RecommendationCard 
                    key={recommendation.id} 
                    recommendation={recommendation}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Trending Section */}
          {showTrending && trending && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FireIcon className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  {t('search.trending_now')}
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trending.search_terms.map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {isLoading ? t('search.searching') : (
                  totalResults > 0 ? 
                    t('search.results_count', { count: totalResults }) :
                    t('search.no_results')
                )}
              </h2>
              
              {!showFilters && (
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <span>{t('search.filters')}</span>
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {locations.map(location => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalResults > 20 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                  >
                    {t('pagination.previous')}
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    {t('pagination.page_of', { current: currentPage, total: Math.ceil(totalResults / 20) })}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalResults / 20)}
                    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
                  >
                    {t('pagination.next')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchDiscovery;