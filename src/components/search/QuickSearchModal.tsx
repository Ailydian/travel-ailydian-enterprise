/**
 * Quick Search Modal Component
 * Universal search modal accessible from header
 * Contains all search categories: hotels, flights, tours, transfers
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  MapPin,
  Calendar,
  Users,
  Hotel,
  Plane,
  Car,
  Compass,
  Globe } from 'lucide-react';
import { LocationAutocomplete } from './LocationAutocomplete';
import logger from '../../lib/logger';
import { useToast } from '../../context/ToastContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'all' | 'hotels' | 'flights' | 'tours' | 'transfers';
}

const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'all'
}) => {
  const router = useRouter();

  // Search state
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [isSearching, setIsSearching] = useState(false);

  // Initialize default dates
  useEffect(() => {
    const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

    const today = new Date();
    const tomorrow = new Date(today);
    const dayAfter = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dayAfter.setDate(dayAfter.getDate() + 3);

    setCheckInDate(tomorrow.toISOString().split('T')[0]);
    setCheckOutDate(dayAfter.toISOString().split('T')[0]);
  }, []);

  // Reset category when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(defaultCategory);
    }
  }, [isOpen, defaultCategory]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Advanced search function
  const handleAdvancedSearch = useCallback(async () => {
    // Validation
    if (!searchQuery.trim()) {
      showToast({ type: 'error', title: "⚠️ Lütfen bir destinasyon girin!" });
      return;
    }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < today) {
      showToast({ type: 'info', title: "⚠️ Giriş tarihi geçmiş bir tarih olamaz!" });
      return;
    }

    if (checkOut <= checkIn) {
      showToast({ type: 'info', title: "⚠️ Çıkış tarihi, giriş tarihinden sonra olmalıdır!" });
      return;
    }

    // Traveler validation
    const travelerCount = parseInt(travelers);
    if (isNaN(travelerCount) || travelerCount < 1 || travelerCount > 20) {
      showToast({ type: 'info', title: "⚠️ Yolcu sayısı 1-20 arasında olmalıdır!" });
      return;
    }

    setIsSearching(true);

    try {
      const encodedQuery = encodeURIComponent(searchQuery);

      // Navigate based on category
      if (selectedCategory === 'hotels' || selectedCategory === 'all') {
        router.push(`/hotels?city=${encodedQuery}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${travelers}`);
      } else if (selectedCategory === 'flights') {
        router.push(`/flights?to=${encodedQuery}&date=${checkInDate}&passengers=${travelers}`);
      } else if (selectedCategory === 'transfers') {
        router.push(`/transfers?to=${encodedQuery}&passengers=${travelers}`);
      } else if (selectedCategory === 'tours') {
        router.push(`/tours?query=${encodedQuery}&date=${checkInDate}&guests=${travelers}`);
      }

      // Close modal after navigation
      onClose();
    } catch (error) {
      logger.error('❌ Arama hatası:', error as Error, { component: 'Quicksearchmodal' });
      showToast({ type: 'error', title: "⚠️ Arama sırasında bir hata oluştu. Lütfen tekrar deneyin." });
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, selectedCategory, checkInDate, checkOutDate, travelers, router, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" />


        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Hızlı Arama</h2>
                <p className="text-white/80 text-sm mt-1">Nereye gitmek istersiniz?</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-lydian-bg/30 flex items-center justify-center transition-all">

                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
              { id: 'all', label: 'Tümü', icon: Globe },
              { id: 'hotels', label: 'Oteller', icon: Hotel },
              { id: 'flights', label: 'Uçuşlar', icon: Plane },
              { id: 'tours', label: 'Turlar', icon: Compass },
              { id: 'transfers', label: 'Transfer', icon: Car }].
              map((cat) =>
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                selectedCategory === cat.id ?
                'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg' :
                'bg-lydian-bg/10 text-gray-200 hover:bg-lydian-bg-surface-raised'}`
                }>

                  <cat.icon className="w-4 h-4" />
                  <span className="text-sm">{cat.label}</span>
                </button>
              )}
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              {/* Location Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Destinasyon
                </label>
                <LocationAutocomplete
                  value={searchQuery}
                  onChange={(value, suggestion) => {
                    setSearchQuery(value);
                    if (suggestion) {
                      const searchValue = suggestion.code || suggestion.name;
                      setSearchQuery(searchValue);
                    }
                  }}
                  placeholder="Nereye gitmek istersiniz?"
                  type="all"
                  icon={<MapPin className="text-blue-500 w-5 h-5" />}
                  className="location-search" />

              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Giriş Tarihi
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-white/20/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-lydian-primary/50" />

                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Çıkış Tarihi
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-white/20/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-lydian-primary/50" />

                  </div>
                </div>
              </div>

              {/* Travelers Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Misafir Sayısı
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-white/20/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-lydian-primary/50" />

                </div>
              </div>

              {/* Search Button */}
              <motion.button
                onClick={handleAdvancedSearch}
                disabled={isSearching}
                whileHover={!isSearching ? { scale: 1.02 } : {}}
                whileTap={!isSearching ? { scale: 0.98 } : {}}
                className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                isSearching ? 'opacity-80 cursor-not-allowed' : ''}`
                }>

                {isSearching ?
                <>
                    <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>

                      <Search className="w-5 h-5" />
                    </motion.div>
                    <span>Aranıyor...</span>
                  </> :

                <>
                    <Search className="w-5 h-5" />
                    <span>Ara</span>
                  </>
                }
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);

};

export default QuickSearchModal;