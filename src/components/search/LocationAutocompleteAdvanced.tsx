/**
 * Advanced Location Autocomplete - Ultra Premium
 * Features: Fuzzy search, international locations, geo-location, recent searches
 * Multi-language support, distance calculation, keyboard navigation
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin, Search, Loader2, Navigation, Clock, Star, TrendingUp,
  Map as MapIcon, Plane, Building2, Globe, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logger from '../../lib/logger';
import { useToast } from '../../context/ToastContext';
import {
  searchAdvancedLocations,
  getPopularLocations,
  getUserLocation,
  getNearbyLocations,
  type AdvancedLocationSuggestion
} from '@/lib/location-service-advanced';

interface LocationAutocompleteAdvancedProps {
  value: string;
  onChange: (value: string, suggestion?: AdvancedLocationSuggestion) => void;
  placeholder?: string;
  type?: 'city' | 'airport' | 'hotel' | 'region' | 'all';
  icon?: React.ReactNode;
  className?: string;
  countryFilter?: string;
  showRecentSearches?: boolean;
  showPopular?: boolean;
  showNearby?: boolean;
  label?: string;
}

const RECENT_SEARCHES_KEY = 'lydian_recent_locations';
const MAX_RECENT_SEARCHES = 5;

export const LocationAutocompleteAdvanced: React.FC<LocationAutocompleteAdvancedProps> = ({
  value,
  onChange,
  placeholder = 'Nereye gitmek istersiniz?',
  type = 'all',
  icon,
  className = '',
  countryFilter,
  showRecentSearches = true,
  showPopular = true,
  showNearby = true,
  label
}) => {
  const [suggestions, setSuggestions] = useState<AdvancedLocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<AdvancedLocationSuggestion[]>([]);
  const [popularLocations, setPopularLocations] = useState<AdvancedLocationSuggestion[]>([]);
  const [nearbyLocations, setNearbyLocations] = useState<AdvancedLocationSuggestion[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number;lng: number;} | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        logger.error('Failed to parse recent searches:', e as Error, { component: 'Locationautocompleteadvanced' });
      }
    }
  }, []);

  // Get user location
  useEffect(() => {
    if (showNearby) {
      getUserLocation().
      then((location) => {
        setUserLocation(location);
        const nearby = getNearbyLocations(location.lat, location.lng, 100, 5);
        setNearbyLocations(nearby);
      }).
      catch(() => {

        // Silently fail - geolocation is optional
      });}
  }, [showNearby]);

  // Load popular locations
  useEffect(() => {
    if (showPopular) {
      const popular = getPopularLocations(countryFilter, 8);
      setPopularLocations(popular);
    }
  }, [showPopular, countryFilter]);

  // Search suggestions with debounce
  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      const results = searchAdvancedLocations(value, {
        type,
        country: countryFilter,
        limit: 12,
        userLocation: userLocation || undefined,
        popularFirst: true
      });

      setSuggestions(results);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };
  }, [value, type, countryFilter, userLocation]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const totalSuggestions = suggestions.length;
    if (totalSuggestions === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
        prev < totalSuggestions - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectSuggestion = useCallback((suggestion: AdvancedLocationSuggestion) => {
    onChange(suggestion.name, suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    // Save to recent searches
    if (showRecentSearches) {
      const updated = [
      suggestion,
      ...recentSearches.filter((s) => s.id !== suggestion.id)].
      slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  }, [onChange, showRecentSearches, recentSearches]);

  const getLocationIcon = (locationType: string) => {
    switch (locationType) {
      case 'airport':
        return <Plane className="w-4 h-4 text-blue-500" />;
      case 'hotel':
      case 'hotel_zone':
        return <Building2 className="w-4 h-4 text-lydian-accent-purple" />;
      case 'region':
        return <MapIcon className="w-4 h-4 text-green-500" />;
      case 'district':
      case 'town':
        return <MapIcon className="w-4 h-4 text-orange-500" />;
      case 'city':
      default:
        return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return null;
    if (distance < 1) return `${Math.round(distance * 1000)}m`;
    return `${Math.round(distance)}km`;
  };

  const getTypeLabel = (locationType: string) => {
    const labels: Record<string, string> = {
      airport: 'Havalimanı',
      city: 'Şehir',
      hotel: 'Otel',
      hotel_zone: 'Otel Bölgesi',
      region: 'Bölge',
      district: 'İlçe',
      town: 'Kasaba'
    };
    return labels[locationType] || locationType;
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {label &&
      <label className="block text-sm font-semibold text-gray-300 mb-2">
          {label}
        </label>
      }

      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
          {icon ||
          <MapPin className="text-gray-300 w-5 h-5 group-hover:scale-110 group-focus-within:scale-110 group-focus-within:text-blue-500 transition-all duration-200" />
          }
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.length >= 2 || recentSearches.length > 0 || popularLocations.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-base bg-gradient-to-br from-slate-900 via-black to-slate-800 border-2 border-white/20/10 rounded-xl focus:ring-2 focus:ring-lydian-border-focus focus:border-blue-500 outline-none text-white placeholder-lydian-text-tertiary font-medium shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
          autoComplete="off" />


        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isLoading &&
          <Loader2 className="text-blue-500 w-5 h-5 animate-spin" />
          }
          {!isLoading && value.length === 0 && showNearby &&
          <button
            type="button"
            onClick={() => {
              if (userLocation) {
                setShowSuggestions(true);
              } else {
                getUserLocation().
                then((location) => {
                  setUserLocation(location);
                  const nearby = getNearbyLocations(location.lat, location.lng, 100, 5);
                  setNearbyLocations(nearby);
                  setShowSuggestions(true);
                }).
                catch(() => showToast({ type: 'info', title: 'Konum bilgisi alınamadı' }));
              }
            }}
            className="p-1 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg transition-colors"
            title="Yakınımdakiler">

              <Target className="w-5 h-5 text-blue-500" />
            </button>
          }
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full mt-2 bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-xl shadow-2xl border border-white/20/10 overflow-hidden max-h-[500px] overflow-y-auto">

            {/* Recent Searches */}
            {value.length < 2 && showRecentSearches && recentSearches.length > 0 &&
          <div className="border-b border-white/20">
                <div className="px-4 py-3 bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-300">Son Aramalar</span>
                </div>
                {recentSearches.map((location, index) =>
            <button
              key={`recent-${location.id}`}
              onClick={() => handleSelectSuggestion(location)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-500/10er transition-colors text-left border-b border-gray-50 last:border-b-0">

                    {getLocationIcon(location.type)}
                    <div className="flex-1">
                      <div className="font-medium text-white">{location.name}</div>
                      <div className="text-xs text-gray-400">
                        {location.city} • {location.country}
                      </div>
                    </div>
                  </button>
            )}
              </div>
          }

            {/* Nearby Locations */}
            {value.length < 2 && nearbyLocations.length > 0 &&
          <div className="border-b border-white/20">
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-300">Yakınınızda</span>
                </div>
                {nearbyLocations.map((location) =>
            <button
              key={`nearby-${location.id}`}
              onClick={() => handleSelectSuggestion(location)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-500/10er transition-colors text-left border-b border-gray-50 last:border-b-0">

                    {getLocationIcon(location.type)}
                    <div className="flex-1">
                      <div className="font-medium text-white">{location.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{location.city} • {location.country}</span>
                        {location.distance &&
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-full text-xs font-semibold">
                            {formatDistance(location.distance)}
                          </span>
                  }
                      </div>
                    </div>
                  </button>
            )}
              </div>
          }

            {/* Popular Locations */}
            {value.length < 2 && popularLocations.length > 0 &&
          <div>
                <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-semibold text-gray-300">Popüler Destinasyonlar</span>
                </div>
                {popularLocations.map((location) =>
            <button
              key={`popular-${location.id}`}
              onClick={() => handleSelectSuggestion(location)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors text-left border-b border-gray-50 last:border-b-0">

                    {getLocationIcon(location.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{location.name}</span>
                        {location.popular &&
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  }
                      </div>
                      <div className="text-xs text-gray-400">
                        {location.city} • {location.country}
                        {location.hotelCount &&
                  <span className="ml-2 text-orange-600 font-semibold">
                            {location.hotelCount}+ otel
                          </span>
                  }
                      </div>
                    </div>
                  </button>
            )}
              </div>
          }

            {/* Search Results */}
            {value.length >= 2 && suggestions.length > 0 &&
          <div>
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-300">
                    Arama Sonuçları ({suggestions.length})
                  </span>
                </div>
                {suggestions.map((suggestion, index) =>
            <motion.button
              key={suggestion.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-all text-left border-b border-gray-50 last:border-b-0 ${
              index === selectedIndex ?
              'bg-gradient-to-r from-blue-100 to-indigo-100' :
              'hover:bg-blue-50'}`
              }>

                    <div className="flex-shrink-0">
                      {getLocationIcon(suggestion.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white truncate">
                          {suggestion.name}
                        </span>
                        {suggestion.code &&
                  <span className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded text-xs font-mono font-bold flex-shrink-0">
                            {suggestion.code}
                          </span>
                  }
                      </div>

                      <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3 flex-shrink-0" />
                          {suggestion.city}
                          {suggestion.region && `, ${suggestion.region}`}
                          {' • '}
                          {suggestion.country}
                        </span>

                        <span className="px-2 py-0.5 bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 rounded-full text-xs">
                          {getTypeLabel(suggestion.type)}
                        </span>

                        {suggestion.distance &&
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-full text-xs font-semibold">
                            {formatDistance(suggestion.distance)}
                          </span>
                  }

                        {suggestion.hotelCount &&
                  <span className="text-purple-600 font-semibold">
                            {suggestion.hotelCount}+ otel
                          </span>
                  }
                      </div>
                    </div>

                    {suggestion.type === 'airport' &&
              <Navigation className="w-5 h-5 text-blue-500 flex-shrink-0" />
              }
                  </motion.button>
            )}
              </div>
          }

            {/* No results */}
            {value.length >= 2 && !isLoading && suggestions.length === 0 &&
          <div className="px-6 py-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <div className="font-semibold text-white mb-2">Sonuç bulunamadı</div>
                <div className="text-sm text-gray-300">
                  "{value}" için sonuç bulunamadı
                  <br />
                  Farklı bir arama terimi deneyin
                </div>
              </div>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default LocationAutocompleteAdvanced;