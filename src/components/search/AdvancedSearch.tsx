import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, MapPinIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';
import { NeonText } from '../animations/NeonText';

interface SearchResult {
  id: string;
  type: 'destination' | 'hotel' | 'flight' | 'activity' | 'restaurant';
  title: string;
  description: string;
  location: string;
  price?: string;
  rating?: number;
  image?: string;
  tags: string[];
}

interface SearchFilters {
  type: string[];
  priceRange: [number, number];
  rating: number;
  location: string;
  dateRange: [Date | null, Date | null];
  guests: number;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  results: SearchResult[];
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  results,
  isLoading = false,
  placeholder = "Nereye gitmek istersiniz?",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: [],
    priceRange: [0, 10000],
    rating: 0,
    location: '',
    dateRange: [null, null],
    guests: 1
  });

  const debouncedQuery = useDebounce(query, 300);

  // Arama önerileri için sabit veriler (gerçek uygulamada API'den gelecek)
  const suggestions = useMemo(() => [
    'İstanbul, Türkiye',
    'Paris, Fransa', 
    'Tokyo, Japonya',
    'New York, Amerika',
    'Bali, Endonezya',
    'Roma, İtalya',
    'Barcelona, İspanya',
    'Dubai, BAE'
  ], []);

  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, suggestions]);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery, filters);
    }
  }, [debouncedQuery, filters, onSearch]);

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
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  const searchVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Ana Arama Kutusu */}
      <div className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={searchVariants}
        >
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-ailydian-text-muted z-10" />
          
          <motion.input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 bg-glass-dark border border-ailydian-primary/30 rounded-2xl text-ailydian-text placeholder-ailydian-text-muted focus:outline-none focus:border-ailydian-primary focus:shadow-neon transition-all duration-300 text-lg"
            onFocus={() => setIsOpen(query.length > 0)}
            whileFocus={{ scale: 1.02 }}
            autoComplete="off"
          />
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {query && (
              <motion.button
                onClick={clearSearch}
                className="p-1 hover:bg-ailydian-bg-hover rounded-full transition-colors duration-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <XMarkIcon className="w-5 h-5 text-ailydian-text-muted" />
              </motion.button>
            )}
            
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-ailydian-primary/20 hover:bg-ailydian-primary/30 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-ailydian-primary">Filtrele</span>
            </motion.button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            className="absolute right-16 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-5 h-5 border-2 border-ailydian-primary border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.div>

      {/* Filtreler */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="mt-4 p-6 bg-glass-dark rounded-2xl border border-ailydian-primary/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Konum Filtresi */}
              <div>
                <label className="block text-sm font-semibold text-ailydian-text mb-2">
                  <MapPinIcon className="w-4 h-4 inline-block mr-1" />
                  Konum
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange({ location: e.target.value })}
                  placeholder="Şehir veya ülke"
                  className="w-full p-3 bg-ailydian-bg-card border border-ailydian-primary/30 rounded-lg text-ailydian-text placeholder-ailydian-text-muted focus:outline-none focus:border-ailydian-primary transition-colors duration-200"
                />
              </div>

              {/* Misafir Sayısı */}
              <div>
                <label className="block text-sm font-semibold text-ailydian-text mb-2">
                  <UserGroupIcon className="w-4 h-4 inline-block mr-1" />
                  Misafir Sayısı
                </label>
                <select
                  value={filters.guests}
                  onChange={(e) => handleFilterChange({ guests: parseInt(e.target.value) })}
                  className="w-full p-3 bg-ailydian-bg-card border border-ailydian-primary/30 rounded-lg text-ailydian-text focus:outline-none focus:border-ailydian-primary transition-colors duration-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Misafir</option>
                  ))}
                </select>
              </div>

              {/* Derecelendirme */}
              <div>
                <label className="block text-sm font-semibold text-ailydian-text mb-2">
                  Minimum Puan
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange({ rating: parseFloat(e.target.value) })}
                  className="w-full p-3 bg-ailydian-bg-card border border-ailydian-primary/30 rounded-lg text-ailydian-text focus:outline-none focus:border-ailydian-primary transition-colors duration-200"
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
              <label className="block text-sm font-semibold text-ailydian-text mb-3">
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
                  <motion.button
                    key={type.key}
                    onClick={() => {
                      const newTypes = filters.type.includes(type.key)
                        ? filters.type.filter(t => t !== type.key)
                        : [...filters.type, type.key];
                      handleFilterChange({ type: newTypes });
                    }}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      filters.type.includes(type.key)
                        ? 'bg-ailydian-primary text-white border-ailydian-primary shadow-neon'
                        : 'bg-ailydian-bg-card text-ailydian-text border-ailydian-primary/30 hover:border-ailydian-primary/60'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Öneri Listesi */}
      <AnimatePresence>
        {isOpen && (filteredSuggestions.length > 0 || results.length > 0) && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-glass-dark border border-ailydian-primary/30 rounded-2xl shadow-glow-lg z-50 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchVariants}
          >
            {/* Öneriler */}
            {filteredSuggestions.length > 0 && (
              <div className="p-2">
                <div className="px-4 py-2">
                  <NeonText size="sm" color="secondary">Öneriler</NeonText>
                </div>
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-ailydian-bg-hover rounded-lg transition-colors duration-200 flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <MapPinIcon className="w-5 h-5 text-ailydian-primary flex-shrink-0" />
                    <span className="text-ailydian-text">{suggestion}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Arama Sonuçları */}
            {results.length > 0 && (
              <div className="border-t border-ailydian-primary/20 p-2">
                <div className="px-4 py-2">
                  <NeonText size="sm" color="primary">Sonuçlar</NeonText>
                </div>
                {results.slice(0, 5).map((result, index) => (
                  <motion.div
                    key={result.id}
                    className="px-4 py-3 hover:bg-ailydian-bg-hover rounded-lg transition-colors duration-200 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
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
                        <h3 className="text-ailydian-text font-semibold truncate">
                          {result.title}
                        </h3>
                        <p className="text-ailydian-text-muted text-sm truncate">
                          {result.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPinIcon className="w-3 h-3 text-ailydian-primary" />
                          <span className="text-xs text-ailydian-text-muted">
                            {result.location}
                          </span>
                          {result.price && (
                            <span className="text-xs text-ailydian-secondary font-semibold ml-auto">
                              {result.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;