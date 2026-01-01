/**
 * Hero Search Component - Production-Grade
 *
 * Premium search experience with:
 * - Real-time autocomplete
 * - Category tabs
 * - Date range picker
 * - Guest selector
 * - Keyboard navigation
 * - Glass morphism design
 * - Mobile responsive
 *
 * @version 2.0.0
 * @author Travel LyDian Elite Frontend Team
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Hotel,
  Compass,
  Car,
  Bus,
  Home,
  Clock,
  TrendingUp,
  Star,
  X,
  ChevronDown,
  Loader2,
  Plus,
  Minus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useRealtimeSearch } from '@/hooks/useRealtimeSearch';
import { getPopularSearches, getPopularDestinations } from '@/lib/search-api';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type SearchCategory = 'all' | 'hotels' | 'tours' | 'rentals' | 'cars' | 'transfers';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface GuestCounts {
  adults: number;
  children: number;
  rooms: number;
}

interface HeroSearchProps {
  className?: string;
  onSearch?: (query: string, category: SearchCategory) => void;
}

const CATEGORIES = [
  { id: 'all' as SearchCategory, label: 'Tümü', icon: Search },
  { id: 'hotels' as SearchCategory, label: 'Oteller', icon: Hotel },
  { id: 'tours' as SearchCategory, label: 'Turlar', icon: Compass },
  { id: 'rentals' as SearchCategory, label: 'Konaklama', icon: Home },
  { id: 'cars' as SearchCategory, label: 'Araç', icon: Car },
  { id: 'transfers' as SearchCategory, label: 'Transfer', icon: Bus },
];

// ============================================================================
// DATE PICKER COMPONENT
// ============================================================================

const DateRangePicker: React.FC<{
  value: DateRange;
  onChange: (range: DateRange) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFrom, setTempFrom] = useState<Date | undefined>(value.from);
  const [tempTo, setTempTo] = useState<Date | undefined>(value.to);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleApply = () => {
    onChange({ from: tempFrom, to: tempTo });
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (value.from && value.to) {
      return `${format(value.from, 'MMM dd')} - ${format(value.to, 'MMM dd')}`;
    }
    return 'Tarih Seç';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-lydian-bg/80 dark:bg-gray-800/80 hover:bg-lydian-bg dark:hover:bg-gray-800 rounded-xl w-full text-left transition-all duration-200 border-2 border-white/50 dark:border-gray-700 hover:border-lydian-primary/50"
      >
        <Calendar className="w-5 h-5 text-lydian-primary" />
        <div className="flex-1">
          <div className="text-xs text-lydian-text-secondary dark:text-lydian-text-muted">Tarihler</div>
          <div className="text-sm font-medium text-lydian-text dark:text-lydian-text-inverse">{formatDateRange()}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-lydian-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 bg-lydian-bg dark:bg-gray-900 border border-lydian-border dark:border-gray-800 rounded-xl p-4 shadow-2xl z-50 min-w-[280px]"
          >
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-lydian-text-secondary dark:text-lydian-text-muted mb-1 block">
                  Başlangıç Tarihi
                </label>
                <input
                  type="date"
                  value={tempFrom ? format(tempFrom, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setTempFrom(e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 bg-lydian-bg-surface dark:bg-gray-800 border border-lydian-border dark:border-gray-700 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-lydian-text-secondary dark:text-lydian-text-muted mb-1 block">
                  Bitiş Tarihi
                </label>
                <input
                  type="date"
                  value={tempTo ? format(tempTo, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setTempTo(e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 bg-lydian-bg-surface dark:bg-gray-800 border border-lydian-border dark:border-gray-700 rounded-lg text-sm"
                />
              </div>
              <button
                onClick={handleApply}
                className="w-full px-4 py-2 bg-lydian-primary hover:bg-lydian-primary-dark text-lydian-text-inverse rounded-lg font-medium transition-colors"
              >
                Uygula
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// GUEST SELECTOR COMPONENT
// ============================================================================

const GuestSelector: React.FC<{
  value: GuestCounts;
  onChange: (counts: GuestCounts) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const updateGuests = (field: keyof GuestCounts, delta: number) => {
    onChange({
      ...value,
      [field]: Math.max(field === 'adults' ? 1 : 0, value[field] + delta),
    });
  };

  const guestSummary = () => {
    const parts = [];
    if (value.adults > 0) parts.push(`${value.adults} Yetişkin`);
    if (value.children > 0) parts.push(`${value.children} Çocuk`);
    if (value.rooms > 0) parts.push(`${value.rooms} Oda`);
    return parts.join(', ') || 'Misafir Seç';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-lydian-bg/80 dark:bg-gray-800/80 hover:bg-lydian-bg dark:hover:bg-gray-800 rounded-xl w-full text-left transition-all duration-200 border-2 border-white/50 dark:border-gray-700 hover:border-lydian-primary/50"
      >
        <Users className="w-5 h-5 text-lydian-primary" />
        <div className="flex-1">
          <div className="text-xs text-lydian-text-secondary dark:text-lydian-text-muted">Misafirler</div>
          <div className="text-sm font-medium text-lydian-text dark:text-lydian-text-inverse">{guestSummary()}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-lydian-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 bg-lydian-bg dark:bg-gray-900 border border-lydian-border dark:border-gray-800 rounded-xl p-4 shadow-2xl z-50 min-w-[280px]"
          >
            <div className="space-y-4">
              {(['adults', 'children', 'rooms'] as const).map((field) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-lydian-text-secondary dark:text-lydian-text-dim capitalize">
                    {field === 'adults' ? 'Yetişkin' : field === 'children' ? 'Çocuk' : 'Oda'}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests(field, -1)}
                      disabled={field === 'adults' ? value[field] <= 1 : value[field] <= 0}
                      className="p-1 rounded-lg bg-lydian-bg-surface-raised dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4 text-lydian-text-secondary dark:text-lydian-text-dim" />
                    </button>
                    <span className="w-8 text-center font-medium text-lydian-text dark:text-lydian-text-inverse">
                      {value[field]}
                    </span>
                    <button
                      onClick={() => updateGuests(field, 1)}
                      className="p-1 rounded-lg bg-lydian-bg-surface-raised dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-lydian-text-secondary dark:text-lydian-text-dim" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const HeroSearch: React.FC<HeroSearchProps> = ({ className = '', onSearch }) => {
  const router = useRouter();

  // State
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState<GuestCounts>({ adults: 2, children: 0, rooms: 1 });

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom hook for real-time search
  const {
    query,
    setQuery,
    results,
    isLoading,
    recentSearches,
    addToHistory,
    removeFromHistory,
  } = useRealtimeSearch({
    debounceMs: 300,
    maxResults: 8,
  });

  // Popular data
  const popularSearches = getPopularSearches();
  const popularDestinations = getPopularDestinations();

  // ========================================
  // EFFECTS
  // ========================================

  // Show results when focused and has content
  useEffect(() => {
    setShowResults(isFocused && (query.trim() !== '' || recentSearches.length > 0));
  }, [isFocused, query, recentSearches]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else if (query.trim()) {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setIsFocused(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  // ========================================
  // HANDLERS
  // ========================================

  const handleResultClick = (result: any) => {
    addToHistory(result.title);
    setQuery('');
    setIsFocused(false);
    router.push(result.url);
  };

  const handlePopularSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    searchInputRef.current?.focus();
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;

    addToHistory(query);
    onSearch?.(query, activeCategory);
    router.push(`/search?q=${encodeURIComponent(query)}&category=${activeCategory}`);
    setIsFocused(false);
  };

  const handleClearQuery = () => {
    setQuery('');
    setSelectedIndex(-1);
    searchInputRef.current?.focus();
  };

  // ========================================
  // CATEGORY ICON
  // ========================================

  const getCategoryIcon = (category: string) => {
    const categoryMap: Record<string, string> = {
      hotel: '🏨',
      tour: '🎫',
      rental: '🏡',
      car: '🚗',
      transfer: '🚌',
      destination: '📍',
    };
    return categoryMap[category] || '🔍';
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={`w-full ${className}`}>
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium text-sm
                transition-all duration-300 border-2
                ${
                  isActive
                    ? 'bg-lydian-primary text-lydian-text-inverse border-lydian-primary shadow-lg scale-105'
                    : 'bg-lydian-bg/80 dark:bg-gray-800/80 text-lydian-text-secondary dark:text-lydian-text-dim border-white/50 dark:border-gray-700 hover:border-lydian-primary/50 hover:bg-lydian-bg dark:hover:bg-gray-800'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Glass Morphism Search Box */}
        <div
          className={`
            relative bg-lydian-bg/90 dark:bg-gray-900/90 backdrop-blur-xl
            rounded-2xl shadow-2xl border-2 transition-all duration-300
            ${isFocused ? 'border-lydian-primary shadow-lydian-primary/20' : 'border-white/50 dark:border-gray-800'}
          `}
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 p-4 sm:p-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <Search className="w-6 h-6 text-lydian-primary" />
            </div>

            {/* Input */}
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Nereye gitmek istersiniz? (Otel, tur, destinasyon...)"
              className="flex-1 text-lg font-medium bg-transparent outline-none text-lydian-text dark:text-lydian-text-inverse placeholder-gray-400 dark:placeholder-gray-500"
              autoComplete="off"
            />

            {/* Loading Spinner */}
            {isLoading && (
              <Loader2 className="w-5 h-5 text-lydian-primary animate-spin flex-shrink-0" />
            )}

            {/* Clear Button */}
            {query && !isLoading && (
              <button
                onClick={handleClearQuery}
                className="flex-shrink-0 p-2 hover:bg-lydian-bg-surface-raised dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5 text-lydian-text-muted" />
              </button>
            )}

            {/* Search Button */}
            <button
              onClick={handleSearchSubmit}
              disabled={!query.trim()}
              className="flex-shrink-0 px-6 py-3 bg-lydian-primary hover:bg-lydian-primary-dark text-lydian-text-inverse rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              Ara
            </button>
          </div>

          {/* Quick Filters (Desktop) - Date & Guest Selectors */}
          <div className="hidden lg:grid grid-cols-2 gap-4 px-6 pb-6 pt-2 border-t border-lydian-border/50 dark:border-gray-800">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <GuestSelector value={guests} onChange={setGuests} />
          </div>
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-lydian-bg/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-lydian-border/50 dark:border-gray-800 overflow-hidden z-50 max-h-[500px] overflow-y-auto"
            >
              {/* Search Results */}
              {results.length > 0 && (
                <div className="p-2">
                  <div className="px-4 py-2 text-xs font-semibold text-lydian-text-tertiary dark:text-lydian-text-muted uppercase tracking-wider">
                    Arama Sonuçları
                  </div>
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full p-4 flex items-center gap-4 hover:bg-lydian-bg-surface-raised dark:hover:bg-gray-800 rounded-xl transition-colors text-left ${
                        selectedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-lydian-primary to-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
                          {getCategoryIcon(result.category)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lydian-text dark:text-lydian-text-inverse truncate">
                            {result.title}
                          </h4>
                          {result.rating && (
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="w-3 h-3 text-lydian-warning fill-current" />
                              <span className="text-lydian-text-secondary dark:text-lydian-text-muted">{result.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-lydian-text-secondary dark:text-lydian-text-muted truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      {result.price && (
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-lydian-primary">{result.price}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Recent Searches */}
              {query.trim() === '' && recentSearches.length > 0 && (
                <div className="p-2 border-t border-lydian-border/50 dark:border-gray-800">
                  <div className="px-4 py-2 text-xs font-semibold text-lydian-text-tertiary dark:text-lydian-text-muted uppercase tracking-wider flex items-center justify-between">
                    <span>Son Aramalar</span>
                    <button
                      onClick={() => recentSearches.forEach(removeFromHistory)}
                      className="text-lydian-primary hover:underline text-xs normal-case"
                    >
                      Temizle
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearchClick(search)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-lydian-bg-surface-raised dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-lydian-text-muted flex-shrink-0" />
                      <span className="text-lydian-text-secondary dark:text-lydian-text-dim flex-1">{search}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(search);
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <X className="w-4 h-4 text-lydian-text-muted" />
                      </button>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {query.trim() === '' && (
                <div className="p-2 border-t border-lydian-border/50 dark:border-gray-800">
                  <div className="px-4 py-2 text-xs font-semibold text-lydian-text-tertiary dark:text-lydian-text-muted uppercase tracking-wider">
                    Popüler Aramalar
                  </div>
                  {popularSearches.slice(0, 6).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearchClick(search)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-lydian-bg-surface-raised dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                    >
                      <TrendingUp className="w-4 h-4 text-lydian-primary flex-shrink-0" />
                      <span className="text-lydian-text-secondary dark:text-lydian-text-dim">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Destinations */}
              {query.trim() === '' && (
                <div className="p-2 border-t border-lydian-border/50 dark:border-gray-800">
                  <div className="px-4 py-2 text-xs font-semibold text-lydian-text-tertiary dark:text-lydian-text-muted uppercase tracking-wider">
                    Popüler Destinasyonlar
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {popularDestinations.map((destination) => (
                      <button
                        key={destination.name}
                        onClick={() => handlePopularSearchClick(destination.name)}
                        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-lydian-primary/10 to-blue-500/10 hover:from-lydian-primary/20 hover:to-blue-500/20 rounded-lg transition-all"
                      >
                        <span className="text-2xl">{destination.icon}</span>
                        <div className="text-left">
                          <p className="font-semibold text-lydian-text dark:text-lydian-text-inverse">
                            {destination.name}
                          </p>
                          <p className="text-xs text-lydian-text-secondary dark:text-lydian-text-muted">
                            {destination.count}+ seçenek
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {query.trim() !== '' && results.length === 0 && !isLoading && (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-lydian-text-dim dark:text-lydian-text-secondary mx-auto mb-3" />
                  <p className="text-lydian-text-secondary dark:text-lydian-text-muted mb-2">Sonuç bulunamadı</p>
                  <p className="text-sm text-lydian-text-tertiary dark:text-lydian-text-tertiary">
                    &quot;{query}&quot; için farklı anahtar kelimeler deneyin
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSearch;
