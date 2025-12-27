import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Search,
  Sparkles,
  Hotel,
  Car,
  Plane,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  ChevronRight } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logger from '../../lib/logger';

// AI-Powered Unified Search - Tüm kategorilerde tek aramada sonuç
// Örnek: "İstanbul'da 3 gece otel + Kapadokya turu + araç kiralama"

interface SearchResult {
  category: 'hotel' | 'car' | 'flight' | 'tour' | 'transfer' | 'package';
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
  rating?: number;
  location?: string;
}

interface AISearchSuggestion {
  type: 'bundle' | 'alternative' | 'upgrade';
  title: string;
  description: string;
  savings?: number;
  items: string[];
}

const UnifiedSearch: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISearchSuggestion[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Popular search examples
  const popularSearches = [
  {
    icon: Hotel,
    text: "İstanbul'da 3 gece otel + transfer",
    color: 'text-blue-600'
  },
  {
    icon: Car,
    text: "Antalya araç kiralama + havaalanı karşılama",
    color: 'text-green-600'
  },
  {
    icon: Plane,
    text: "İstanbul-Kapadokya uçuş + tur + otel",
    color: 'text-purple-600'
  },
  {
    icon: MapPin,
    text: "Bodrum'da tatil paketi (her şey dahil)",
    color: 'text-orange-600'
  }];


  // Categories
  const categories = [
  { id: 'hotels', name: 'Oteller', icon: Hotel, color: 'bg-blue-100 text-blue-600' },
  { id: 'cars', name: 'Araç Kiralama', icon: Car, color: 'bg-green-100 text-green-600' },
  { id: 'flights', name: 'Uçuşlar', icon: Plane, color: 'bg-purple-100 text-purple-600' },
  { id: 'tours', name: 'Turlar', icon: MapPin, color: 'bg-orange-100 text-orange-600' }];


  // AI-Powered Search Function
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setShowResults(true);

    try {
      // Call AI-powered unified search API
      const response = await fetch('/api/search/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          categories: selectedCategories.length > 0 ? selectedCategories : undefined
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setAiSuggestions(data.aiSuggestions || []);
      }
    } catch (error) {
      logger.error('Search error:', error as Error, { component: 'Unifiedsearch' });
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        handleSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Toggle category filter
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
    prev.includes(categoryId) ?
    prev.filter((id) => id !== categoryId) :
    [...prev, categoryId]
    );
  };

  return (
    <div className="w-full">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="AI ile akıllı arama: 'İstanbul'da 3 gece otel + Kapadokya turu + araç kiralama'..."
            className="w-full pl-12 pr-12 py-4 text-lg border-2 border-lydian-border-light/10 rounded-2xl focus:outline-none focus:border-purple-500 transition-all shadow-lg" />


          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {isSearching ?
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div> :

            <Search className="h-6 w-6 text-lydian-text-muted" />
            }
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);

            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isSelected ?
                category.color :
                'bg-white/10 text-gray-300 hover:bg-gray-200'}`
                }>

                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>);

          })}
        </div>
      </div>

      {/* Popular Searches */}
      {!showResults &&
      <div className="mt-8">
          <h3 className="text-sm font-semibold text-lydian-text-muted mb-3">Popüler Aramalar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularSearches.map((search, index) => {
            const Icon = search.icon;
            return (
              <button
                key={index}
                onClick={() => setSearchQuery(search.text)}
                className="flex items-center gap-3 p-4 bg-lydian-glass-dark border border-lydian-border-light/10 rounded-xl hover:border-purple-300 hover:shadow-md transition-all text-left">

                  <Icon className={`h-5 w-5 ${search.color}`} />
                  <span className="text-sm text-lydian-text-muted">{search.text}</span>
                  <ChevronRight className="h-4 w-4 text-lydian-text-muted ml-auto" />
                </button>);

          })}
          </div>
        </div>
      }

      {/* AI Suggestions */}
      <AnimatePresence>
        {showResults && aiSuggestions.length > 0 &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6">

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold text-lydian-text-inverse">AI Önerileri</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiSuggestions.map((suggestion, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-200">

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {suggestion.type === 'bundle' && '📦 Paket Önerisi'}
                        {suggestion.type === 'alternative' && '🔄 Alternatif'}
                        {suggestion.type === 'upgrade' && '⭐ Premium Seçenek'}
                      </span>
                      <h4 className="text-base font-bold text-lydian-text-inverse mt-1">
                        {suggestion.title}
                      </h4>
                    </div>
                    {suggestion.savings &&
                <div className="bg-green-500 text-lydian-text-inverse text-xs font-bold px-2 py-1 rounded-full">
                        -{suggestion.savings}%
                      </div>
                }
                  </div>

                  <p className="text-sm text-lydian-text-dim mb-3">{suggestion.description}</p>

                  <div className="space-y-1 mb-4">
                    {suggestion.items.map((item, idx) =>
                <div key={idx} className="flex items-center gap-2 text-xs text-lydian-text-muted">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                )}
                  </div>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-lydian-text-inverse font-medium py-2 px-4 rounded-lg transition-colors">
                    Detayları Gör
                  </button>
                </motion.div>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && results.length > 0 &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-8">

            <h3 className="text-lg font-bold text-lydian-text-inverse mb-4">
              {results.length} Sonuç Bulundu
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(result.url)}
              className="bg-lydian-glass-dark rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />


                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-lydian-bg/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      {result.category === 'hotel' && '🏨 Otel'}
                      {result.category === 'car' && '🚗 Araç'}
                      {result.category === 'flight' && '✈️ Uçuş'}
                      {result.category === 'tour' && '🎭 Tur'}
                      {result.category === 'transfer' && '🚕 Transfer'}
                      {result.category === 'package' && '📦 Paket'}
                    </div>

                    {/* Rating */}
                    {result.rating &&
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        ⭐ {result.rating.toFixed(1)}
                      </div>
                }
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-bold text-lydian-text-inverse mb-1 line-clamp-1">
                      {result.title}
                    </h4>

                    {result.location &&
                <p className="text-xs text-lydian-text-muted mb-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {result.location}
                      </p>
                }

                    <p className="text-sm text-lydian-text-dim mb-3 line-clamp-2">
                      {result.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-purple-600">
                          ₺{result.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-lydian-text-muted ml-1">/ gecelik</span>
                      </div>

                      <button className="bg-purple-600 hover:bg-purple-700 text-lydian-text-inverse font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                        İncele
                      </button>
                    </div>
                  </div>
                </motion.div>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* No Results */}
      {showResults && !isSearching && results.length === 0 &&
      <div className="mt-12 text-center">
          <div className="inline-block p-6 bg-lydian-glass-dark-medium rounded-full mb-4">
            <Search className="h-12 w-12 text-lydian-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-lydian-text-inverse mb-2">
            Sonuç Bulunamadı
          </h3>
          <p className="text-lydian-text-dim mb-6">
            Aramanız için sonuç bulunamadı. Farklı kelimeler deneyin.
          </p>
          <button
          onClick={() => {
            setSearchQuery('');
            setShowResults(false);
            setResults([]);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-lydian-text-inverse font-medium py-3 px-6 rounded-lg transition-colors">

            Yeni Arama Yap
          </button>
        </div>
      }
    </div>);

};

export default UnifiedSearch;