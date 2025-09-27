'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface SearchFilters {
  location: string;
  guests: number;
  rating: number;
  type: string[];
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  location: string;
  price?: string;
  image?: string;
}

interface AdvancedSearchProps {
  placeholder?: string;
  onSearch: (query: string, filters: SearchFilters) => void;
  results?: SearchResult[];
  isLoading?: boolean;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  placeholder = "Destinasyon, otel veya deneyim arayın...",
  onSearch,
  results = [],
  isLoading = false,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    guests: 2,
    rating: 0,
    type: []
  });

  const suggestions = useMemo(() => [
    'İstanbul',
    'Kapadokya',
    'Antalya',
    'Bodrum',
    'Pamukkale',
    'Göreme'
  ], []);

  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, suggestions]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    onSearch(suggestion, filters);
  }, [filters, onSearch]);

  const handleFilterChange = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    if (query) {
      onSearch(query, updatedFilters);
    }
  }, [filters, query, onSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Ana Arama Kutusu */}
      <div className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-lg"
            onFocus={() => setIsOpen(query.length > 0)}
            autoComplete="off"
          />
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {query && (
              <button
                onClick={clearSearch}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            )}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
            >
              <span className="text-sm font-semibold text-blue-600">Filtrele</span>
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Filtreler */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Konum Filtresi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPinIcon className="w-4 h-4 inline-block mr-1" />
                  Konum
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange({ location: e.target.value })}
                  placeholder="Şehir veya ülke"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Misafir Sayısı */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <UserGroupIcon className="w-4 h-4 inline-block mr-1" />
                  Misafir Sayısı
                </label>
                <select
                  value={filters.guests}
                  onChange={(e) => handleFilterChange({ guests: parseInt(e.target.value) })}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Misafir</option>
                  ))}
                </select>
              </div>

              {/* Derecelendirme */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Puan
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange({ rating: parseFloat(e.target.value) })}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                >
                  <option value={0}>Tümü</option>
                  <option value={3}>3+ Yıldız</option>
                  <option value={4}>4+ Yıldız</option>
                  <option value={4.5}>4.5+ Yıldız</option>
                </select>
              </div>
            </div>

            {/* Tür Filtreleri */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Arama Türü
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'destination', label: 'Destinasyon' },
                  { key: 'hotel', label: 'Otel' },
                  { key: 'flight', label: 'Uçak' },
                  { key: 'activity', label: 'Aktivite' },
                  { key: 'restaurant', label: 'Restoran' }
                ].map(type => (
                  <button
                    key={type.key}
                    onClick={() => {
                      const newTypes = filters.type.includes(type.key)
                        ? filters.type.filter(t => t !== type.key)
                        : [...filters.type, type.key];
                      handleFilterChange({ type: newTypes });
                    }}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      filters.type.includes(type.key)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Öneri Listesi */}
      <AnimatePresence>
        {isOpen && (filteredSuggestions.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
            {/* Öneriler */}
            {filteredSuggestions.length > 0 && (
              <div className="p-2">
                <div className="px-4 py-2">
                  <span className="text-sm font-semibold text-gray-500">Öneriler</span>
                </div>
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                  >
                    <MapPinIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Arama Sonuçları */}
            {results.length > 0 && (
              <div className="border-t border-gray-200 p-2">
                <div className="px-4 py-2">
                  <span className="text-sm font-semibold text-blue-600">Sonuçlar</span>
                </div>
                {results.slice(0, 5).map((result) => (
                  <div
                    key={result.id}
                    className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      {result.image && (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-semibold truncate">
                          {result.title}
                        </h3>
                        <p className="text-gray-500 text-sm truncate">
                          {result.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPinIcon className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-gray-500">
                            {result.location}
                          </span>
                          {result.price && (
                            <span className="text-xs text-blue-600 font-semibold ml-auto">
                              {result.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;