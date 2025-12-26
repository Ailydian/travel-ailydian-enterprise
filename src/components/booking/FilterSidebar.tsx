/**
 * Premium Filter Sidebar - Booking.com Style + Claude Enhancements
 * Advanced filtering with price histogram, amenities, ratings
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  Star,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Utensils,
  Waves,
  Wind,
  MapPin,
  Shield,
  X,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Check
} from 'lucide-react';

interface FilterSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  isMobile = false,
  isOpen = true,
  onClose
}) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [freeCancel, setFreeCancel] = useState(false);
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'price',
    'rating',
    'amenities'
  ]);

  const amenitiesList = [
    { id: 'wifi', label: 'Ücretsiz WiFi', icon: <Wifi className="w-4 h-4" />, count: 1247 },
    { id: 'parking', label: 'Ücretsiz Otopark', icon: <Car className="w-4 h-4" />, count: 856 },
    { id: 'pool', label: 'Havuz', icon: <Waves className="w-4 h-4" />, count: 432 },
    { id: 'gym', label: 'Fitness Center', icon: <Dumbbell className="w-4 h-4" />, count: 298 },
    { id: 'restaurant', label: 'Restoran', icon: <Utensils className="w-4 h-4" />, count: 567 },
    { id: 'ac', label: 'Klima', icon: <Wind className="w-4 h-4" />, count: 1123 },
    { id: 'breakfast', label: 'Kahvaltı', icon: <Coffee className="w-4 h-4" />, count: 789 },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedRatings([]);
    setSelectedAmenities([]);
    setFreeCancel(false);
    setBreakfastIncluded(false);
    onFilterChange?.({});
  };

  const activeFilterCount =
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0) +
    selectedRatings.length +
    selectedAmenities.length +
    (freeCancel ? 1 : 0) +
    (breakfastIncluded ? 1 : 0);

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Filtreler</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-lydian-primary text-white text-xs font-semibold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Clear All Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full px-4 py-2 text-sm font-medium text-lydian-primary hover:bg-red-50 rounded-lg transition-colors"
        >
          Tüm Filtreleri Temizle
        </button>
      )}

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h4 className="font-semibold text-gray-900">Fiyat Aralığı</h4>
          {expandedSections.includes('price') ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.includes('price') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4"
            >
              {/* Price Range Slider */}
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lydian-primary"
                />
              </div>

              {/* Price Display */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Min:</span>
                  <span className="font-semibold text-gray-900">₺{priceRange[0].toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Max:</span>
                  <span className="font-semibold text-gray-900">₺{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Price Histogram (Visual Enhancement) */}
              <div className="flex items-end gap-1 h-16">
                {[20, 45, 80, 95, 100, 85, 60, 40, 25, 15].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-lydian-primary to-lydian-secondary rounded-t opacity-30"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popular Filters */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Popüler Filtreler</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={freeCancel}
              onChange={(e) => setFreeCancel(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 text-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 cursor-pointer"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 group-hover:text-lydian-primary transition-colors">
                Ücretsiz İptal
              </div>
              <div className="text-xs text-gray-500">İptal esnekliği</div>
            </div>
            <Shield className="w-4 h-4 text-green-600" />
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={breakfastIncluded}
              onChange={(e) => setBreakfastIncluded(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 text-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 cursor-pointer"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 group-hover:text-lydian-primary transition-colors">
                Kahvaltı Dahil
              </div>
              <div className="text-xs text-gray-500">Ücretsiz kahvaltı</div>
            </div>
            <Coffee className="w-4 h-4 text-amber-600" />
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h4 className="font-semibold text-gray-900">Değerlendirme Puanı</h4>
          {expandedSections.includes('rating') ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.includes('rating') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2"
            >
              {[9, 8, 7, 6].map((rating) => (
                <button
                  key={rating}
                  onClick={() => toggleRating(rating)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    selectedRatings.includes(rating)
                      ? 'border-lydian-primary bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedRatings.includes(rating)
                      ? 'border-lydian-primary bg-lydian-primary'
                      : 'border-gray-300'
                  }`}>
                    {selectedRatings.includes(rating) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-900">{rating}+ Puan</span>
                  </div>
                  <span className="text-sm text-gray-500">(245)</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Amenities */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection('amenities')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h4 className="font-semibold text-gray-900">Olanaklar</h4>
          {expandedSections.includes('amenities') ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.includes('amenities') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2"
            >
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAmenities.includes(amenity.id)
                      ? 'border-lydian-primary bg-red-50'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-lydian-primary focus:ring-2 focus:ring-lydian-primary/20 cursor-pointer"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    {amenity.icon}
                    <span className="font-medium text-gray-900">{amenity.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">({amenity.count})</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Apply Filters Button (Mobile) */}
      {isMobile && (
        <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              onFilterChange?.({
                priceRange,
                ratings: selectedRatings,
                amenities: selectedAmenities,
                freeCancel,
                breakfastIncluded
              });
              onClose?.();
            }}
            className="w-full px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Filtreleri Uygula
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto p-6"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {content}
    </div>
  );
};
