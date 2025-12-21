/**
 * Rentals Listing Page - Airbnb Style
 * Premium UI with advanced filters, map view, price comparison
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  MapIcon,
  ListBulletIcon,
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  StarIcon,
  HeartIcon,
  BoltIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  HomeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  SparklesIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { rentalProperties, RentalProperty, getPriceSavings } from '../../data/rental-properties';
import { useToast } from '../../context/ToastContext';

// Dynamic imports for performance
const MapView = dynamic(() => import('../../components/rentals/MapView'), { ssr: false });

// Property type options
const PROPERTY_TYPES = [
  { value: 'all', label: 'Tüm Tipler', icon: HomeIcon },
  { value: 'villa', label: 'Villa', icon: HomeIcon },
  { value: 'apartment', label: 'Daire', icon: HomeIcon },
  { value: 'house', label: 'Ev', icon: HomeIcon },
  { value: 'studio', label: 'Stüdyo', icon: HomeIcon },
  { value: 'penthouse', label: 'Penthouse', icon: HomeIcon },
];

// City options
const CITIES = ['Tümü', 'Alanya', 'Antalya', 'Marmaris', 'Bodrum', 'Çeşme'];

// Amenities filter options
const AMENITIES = [
  { id: 'wifi', label: 'WiFi', key: 'wifi' },
  { id: 'pool', label: 'Havuz', key: 'pool' },
  { id: 'parking', label: 'Otopark', key: 'parking' },
  { id: 'kitchen', label: 'Mutfak', key: 'kitchen' },
  { id: 'airConditioning', label: 'Klima', key: 'airConditioning' },
  { id: 'beachfront', label: 'Denize Sıfır', key: 'beachfront' },
  { id: 'seaview', label: 'Deniz Manzarası', key: 'seaview' },
];

interface Filters {
  city: string;
  propertyType: string;
  priceMin: number;
  priceMax: number;
  guests: number;
  bedrooms: number;
  instantBook: boolean;
  superhost: boolean;
  amenities: string[];
  rating: number;
}

const RentalsPage: React.FC = () => {
  const router = useRouter();
  const { showToast, showSuccess, showInfo } = useToast();

  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    city: 'Tümü',
    propertyType: 'all',
    priceMin: 0,
    priceMax: 10000,
    guests: 0,
    bedrooms: 0,
    instantBook: false,
    superhost: false,
    amenities: [],
    rating: 0,
  });

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return rentalProperties.filter((property) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query) ||
          property.location.district.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // City filter
      if (filters.city !== 'Tümü' && property.location.city !== filters.city) {
        return false;
      }

      // Property type
      if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
        return false;
      }

      // Price range
      if (
        property.pricing.basePrice < filters.priceMin ||
        property.pricing.basePrice > filters.priceMax
      ) {
        return false;
      }

      // Guests
      if (filters.guests > 0 && property.capacity.guests < filters.guests) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms > 0 && property.capacity.bedrooms < filters.bedrooms) {
        return false;
      }

      // Instant book
      if (filters.instantBook && !property.availability.instantBook) {
        return false;
      }

      // Superhost
      if (filters.superhost && !property.host.superhost) {
        return false;
      }

      // Amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) => {
          const amenityKey = amenity as keyof typeof property.features;
          return property.features[amenityKey] === true;
        });
        if (!hasAllAmenities) return false;
      }

      // Rating
      if (filters.rating > 0 && property.rating.overall < filters.rating) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Toggle favorite
  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
        showInfo('Favorilerden Çıkarıldı', 'Özellik favorilerinizden kaldırıldı');
      } else {
        newFavorites.add(propertyId);
        showSuccess('Favorilere Eklendi', 'Özellik favorilerinize eklendi');
      }
      return newFavorites;
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      city: 'Tümü',
      propertyType: 'all',
      priceMin: 0,
      priceMax: 10000,
      guests: 0,
      bedrooms: 0,
      instantBook: false,
      superhost: false,
      amenities: [],
      rating: 0,
    });
    setSearchQuery('');
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.city !== 'Tümü') count++;
    if (filters.propertyType !== 'all') count++;
    if (filters.priceMin > 0 || filters.priceMax < 10000) count++;
    if (filters.guests > 0) count++;
    if (filters.bedrooms > 0) count++;
    if (filters.instantBook) count++;
    if (filters.superhost) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.rating > 0) count++;
    return count;
  }, [filters]);

  return (
    <>
      <NextSeo
        title="Kiralık Tatil Evleri ve Villalar | Travel.Ailydian"
        description="Alanya, Antalya, Marmaris, Bodrum ve Çeşme'de lüks kiralık villa ve tatil evleri. En uygun fiyatlar, anında rezervasyon garantisi."
        canonical="https://travel.ailydian.com/rentals"
        openGraph={{
          url: 'https://travel.ailydian.com/rentals',
          title: 'Kiralık Tatil Evleri ve Villalar | Travel.Ailydian',
          description: 'Alanya, Antalya, Marmaris, Bodrum ve Çeşme\'de lüks kiralık villa ve tatil evleri.',
          images: [
            {
              url: 'https://travel.ailydian.com/og-rentals.jpg',
              width: 1200,
              height: 630,
              alt: 'Travel.Ailydian Rentals',
            },
          ],
          site_name: 'Travel.Ailydian',
        }}
      />

      <Head>
        <title>Kiralık Tatil Evleri | Travel.Ailydian</title>
        <meta name="description" content="Türkiye'nin en popüler tatil bölgelerinde kiralık villa ve tatil evleri." />
        <meta name="keywords" content="kiralık villa, tatil evi, alanya villa, bodrum villa, marmaris villa, antalya kiralık daire" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Title & Stats */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent">
                    Tatil Evleri & Villalar
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {filteredProperties.length} özellik bulundu
                  </p>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden relative px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <FunnelIcon className="w-5 h-5 inline mr-2" />
                  Filtreler
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Lokasyon, özellik veya şehir ara..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-red-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ListBulletIcon className="w-5 h-5 inline mr-2" />
                  Liste
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'map'
                      ? 'bg-white text-red-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MapIcon className="w-5 h-5 inline mr-2" />
                  Harita
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="lg:w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
                >
                  {/* Filter Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <AdjustmentsHorizontalIcon className="w-6 h-6 text-red-600" />
                      <h2 className="text-xl font-bold text-gray-900">Filtreler</h2>
                      {activeFilterCount > 0 && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                          {activeFilterCount}
                        </span>
                      )}
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={resetFilters}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Temizle
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* City Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <MapPinIcon className="w-4 h-4 inline mr-2" />
                        Şehir
                      </label>
                      <select
                        value={filters.city}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      >
                        {CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <HomeIcon className="w-4 h-4 inline mr-2" />
                        Özellik Tipi
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PROPERTY_TYPES.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setFilters({ ...filters, propertyType: type.value })}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.propertyType === type.value
                                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <CurrencyDollarIcon className="w-4 h-4 inline mr-2" />
                        Fiyat Aralığı (TRY/gece)
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={filters.priceMin}
                            onChange={(e) =>
                              setFilters({ ...filters, priceMin: parseInt(e.target.value) || 0 })
                            }
                            placeholder="Min"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <span className="text-gray-400">-</span>
                          <input
                            type="number"
                            value={filters.priceMax}
                            onChange={(e) =>
                              setFilters({ ...filters, priceMax: parseInt(e.target.value) || 10000 })
                            }
                            placeholder="Max"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="100"
                          value={filters.priceMax}
                          onChange={(e) =>
                            setFilters({ ...filters, priceMax: parseInt(e.target.value) })
                          }
                          className="w-full accent-red-600"
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <UserGroupIcon className="w-4 h-4 inline mr-2" />
                        Misafir Sayısı
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setFilters({ ...filters, guests: Math.max(0, filters.guests - 1) })
                          }
                          className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-all"
                        >
                          -
                        </button>
                        <div className="flex-1 text-center py-2 bg-gray-50 rounded-lg font-semibold">
                          {filters.guests === 0 ? 'Tümü' : filters.guests}
                        </div>
                        <button
                          onClick={() => setFilters({ ...filters, guests: filters.guests + 1 })}
                          className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Yatak Odası
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setFilters({ ...filters, bedrooms: Math.max(0, filters.bedrooms - 1) })
                          }
                          className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-all"
                        >
                          -
                        </button>
                        <div className="flex-1 text-center py-2 bg-gray-50 rounded-lg font-semibold">
                          {filters.bedrooms === 0 ? 'Tümü' : filters.bedrooms}
                        </div>
                        <button
                          onClick={() => setFilters({ ...filters, bedrooms: filters.bedrooms + 1 })}
                          className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <SparklesIcon className="w-4 h-4 inline mr-2" />
                        Olanaklar
                      </label>
                      <div className="space-y-2">
                        {AMENITIES.map((amenity) => (
                          <label
                            key={amenity.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity.key)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters({
                                    ...filters,
                                    amenities: [...filters.amenities, amenity.key],
                                  });
                                } else {
                                  setFilters({
                                    ...filters,
                                    amenities: filters.amenities.filter((a) => a !== amenity.key),
                                  });
                                }
                              }}
                              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">{amenity.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Quick Filters */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <FireIcon className="w-4 h-4 inline mr-2" />
                        Hızlı Filtreler
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={filters.instantBook}
                            onChange={(e) =>
                              setFilters({ ...filters, instantBook: e.target.checked })
                            }
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <BoltIcon className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm font-medium text-gray-700">Anında Rezervasyon</span>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={filters.superhost}
                            onChange={(e) => setFilters({ ...filters, superhost: e.target.checked })}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <CheckBadgeIcon className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">Superhost</span>
                        </label>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <StarIcon className="w-4 h-4 inline mr-2" />
                        Minimum Puan
                      </label>
                      <div className="flex gap-2">
                        {[0, 4.0, 4.5, 4.8, 5.0].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setFilters({ ...filters, rating })}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.rating === rating
                                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {rating === 0 ? 'Tümü' : `${rating}+`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1">
              {viewMode === 'grid' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredProperties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={favorites.has(property.id)}
                      onToggleFavorite={() => toggleFavorite(property.id)}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="h-[calc(100vh-12rem)] rounded-2xl overflow-hidden shadow-2xl">
                  <MapView properties={filteredProperties} />
                </div>
              )}

              {filteredProperties.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                    <HomeIcon className="w-12 h-12 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Özellik Bulunamadı</h3>
                  <p className="text-gray-600 mb-6">
                    Aradığınız kriterlere uygun özellik bulunamadı. Lütfen filtreleri değiştirin.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Filtreleri Sıfırla
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Property Card Component
interface PropertyCardProps {
  property: RentalProperty;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  index,
}) => {
  const savings = getPriceSavings(property);
  const savingsPercentage = savings > 0 ? Math.round((savings / property.pricing.basePrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/rentals/${property.slug}`}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Primary Badge - Priority System: Featured > Superhost > Instant Book */}
          <div className="absolute top-3 left-3 z-10">
            {property.featured ? (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm">
                <FireIcon className="w-3 h-3" />
                Öne Çıkan
              </span>
            ) : property.host.superhost ? (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm">
                <CheckBadgeIcon className="w-3 h-3" />
                Superhost
              </span>
            ) : property.availability.instantBook ? (
              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm">
                <BoltIcon className="w-3 h-3" />
                Anında Rezervasyon
              </span>
            ) : null}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Price Savings Badge */}
          {savings > 0 && (
            <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-lg">
              <p className="text-xs font-semibold">%{savingsPercentage} İndirim</p>
              <p className="text-xs opacity-90">{savings.toLocaleString('tr-TR')} ₺ Tasarruf</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPinIcon className="w-4 h-4" />
            <span>
              {property.location.district}, {property.location.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
            {property.title}
          </h3>

          {/* Property Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>{property.capacity.guests} misafir</span>
            <span>•</span>
            <span>{property.capacity.bedrooms} yatak odası</span>
            <span>•</span>
            <span>{property.capacity.bathrooms} banyo</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.pool && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">Havuz</span>
            )}
            {property.features.wifi && (
              <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg">WiFi</span>
            )}
            {property.features.parking && (
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg">Otopark</span>
            )}
            {property.features.seaview && (
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-lg">Deniz Manzarası</span>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-orange-500 text-white px-2 py-1 rounded-lg">
                <StarSolidIcon className="w-4 h-4" />
                <span className="font-bold text-sm">{property.rating.overall.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({property.rating.reviewCount} değerlendirme)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              {property.pricing.competitorPrices && (
                <p className="text-xs text-gray-400 line-through">
                  {Math.round(
                    ((property.pricing.competitorPrices.airbnb || 0) +
                      (property.pricing.competitorPrices.booking || 0) +
                      (property.pricing.competitorPrices.agoda || 0)) /
                      3
                  ).toLocaleString('tr-TR')} ₺
                </p>
              )}
              <p className="text-2xl font-bold text-gray-900">
                {property.pricing.basePrice.toLocaleString('tr-TR')} ₺
                <span className="text-sm font-normal text-gray-600"> / gece</span>
              </p>
            </div>
            <span className="text-xs text-gray-500 uppercase font-semibold">{property.type}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RentalsPage;
