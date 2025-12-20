/**
 * Responsive Search Bar Component
 * Adaptive search with autocomplete for all devices
 */

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Plane,
  Building,
  Car,
  X,
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';

interface ResponsiveSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  showCategories?: boolean;
  defaultCategory?: 'all' | 'hotels' | 'flights' | 'transfers' | 'tours';
}

const ResponsiveSearchBar: React.FC<ResponsiveSearchBarProps> = ({
  onSearch,
  placeholder = 'Nereye gitmek istiyorsunuz?',
  showCategories = true,
  defaultCategory = 'all'
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 2);

    setCheckInDate(tomorrow.toISOString().split('T')[0]);
    setCheckOutDate(dayAfter.toISOString().split('T')[0]);
  }, []);

  // Close expanded view when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  const categories = [
    { id: 'all', icon: Search, label: 'Tümü', color: 'from-blue-500 to-blue-600' },
    { id: 'hotels', icon: Building, label: 'Otel', color: 'from-purple-500 to-purple-600' },
    { id: 'flights', icon: Plane, label: 'Uçuş', color: 'from-indigo-500 to-indigo-600' },
    { id: 'transfers', icon: Car, label: 'Transfer', color: 'from-green-500 to-green-600' },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    const params = new URLSearchParams({
      q: searchQuery,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      travelers: travelers
    });

    // Navigate based on category
    if (selectedCategory === 'hotels') {
      router.push(`/hotels?city=${encodeURIComponent(searchQuery)}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${travelers}`);
    } else if (selectedCategory === 'flights') {
      router.push(`/flights?to=${encodeURIComponent(searchQuery)}&date=${checkInDate}&passengers=${travelers}`);
    } else if (selectedCategory === 'transfers') {
      router.push(`/transfers?to=${encodeURIComponent(searchQuery)}&passengers=${travelers}`);
    } else {
      router.push(`/search?${params.toString()}`);
    }

    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="w-full">
      {/* Mobile: Compact Search Button */}
      {isMobile && !isExpanded ? (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 active:scale-98 transition-transform touch-target"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ailydian-primary to-ailydian-secondary flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900">Nereye gidiyorsun?</p>
            <p className="text-sm text-gray-500">Otel, uçuş veya transfer ara</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>
      ) : (
        /* Expanded/Desktop View */
        <motion.div
          initial={isMobile ? { opacity: 0, scale: 0.95 } : false}
          animate={isMobile ? { opacity: 1, scale: 1 } : false}
          className={`bg-white rounded-3xl shadow-2xl ${
            isMobile
              ? 'fixed inset-4 z-[9999] overflow-y-auto'
              : 'relative'
          }`}
        >
          <div className="p-4 md:p-6">
            {/* Mobile Header */}
            {isMobile && (
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Ara</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors touch-target"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* Category Tabs */}
            {showCategories && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all touch-target ${
                      selectedCategory === cat.id
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Location Search */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Destinasyon
                </label>
                <LocationAutocomplete
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                  placeholder={placeholder}
                  type={selectedCategory === 'all' ? 'all' : selectedCategory}
                  icon={<MapPin className="w-5 h-5 text-ailydian-primary" />}
                  className="w-full"
                />
              </div>

              {/* Check-in Date */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Giriş Tarihi
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-responsive w-full"
                />
              </div>

              {/* Check-out Date */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Çıkış Tarihi
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  className="input-responsive w-full"
                />
              </div>

              {/* Travelers */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1">
                  <Users className="w-3 h-3 inline mr-1" />
                  Kişi
                </label>
                <input
                  type="number"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  min="1"
                  max="20"
                  className="input-responsive w-full"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              className="button-responsive w-full mt-4 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl active:scale-95 transition-all"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Ara
            </button>

            {/* Popular Searches (Mobile) */}
            {isMobile && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Popüler Aramalar
                </p>
                <div className="space-y-2">
                  {['İstanbul Otelleri', 'Antalya', 'Bodrum', 'Kapadokya'].map((query) => (
                    <button
                      key={query}
                      onClick={() => {
                        setSearchQuery(query);
                        setIsExpanded(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-target text-left"
                    >
                      <TrendingUp className="w-4 h-4 text-ailydian-primary" />
                      <span className="text-sm font-medium text-gray-900">{query}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResponsiveSearchBar;
