/**
 * Transportation - Enterprise-Grade Transfers & Car Rentals Hub
 * Multi-location, multi-language with real data integration
 */
import React, { useState, useMemo } from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import ModernHeader from '../../components/layout/ModernHeader';
import BookingFooter from '../../components/layout/BookingFooter';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Grid,
  List,
  Star,
  MapPin,
  Users,
  Plane,
  Car,
  Bus,
  Crown,
  Shield,
  Clock,
  Fuel,
  Settings,
  Luggage,
  Award,
  Filter,
  X,
  ArrowRightLeft,
} from 'lucide-react';
import { antalyaAirportTransfers } from '../../data/antalya-transfers';
import { antalyaCarRentals } from '../../data/antalya-car-rentals';
import { TRANSFER_VEHICLES, getPopularVehicles } from '../../data/transfer-vehicles';

interface TransportationItem {
  id: string;
  type: 'transfer' | 'rental';
  category: string;
  name: string;
  description: string;
  route?: string;
  location?: string;
  capacity: string;
  price: number;
  priceUnit: 'one-way' | 'daily' | 'weekly' | 'monthly';
  image: string;
  features: string[];
  rating: number;
  reviews: number;
  brand?: string;
  transmission?: 'manual' | 'automatic';
  fuelType?: string;
  luggage?: number;
  distance?: number;
  duration?: number;
}

const TransportationPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = (i18n.language || 'tr') as 'tr' | 'en';
  const lang = currentLang === 'tr' || currentLang === 'en' ? currentLang : 'en';

  // State Management
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'transfer' | 'rental',
    category: 'all',
    priceRange: [0, 5000] as [number, number],
    minRating: 0,
    capacity: 'all',
    location: 'all',
    transmission: 'all',
    rentalDuration: 'daily' as 'daily' | 'weekly' | 'monthly',
  });

  // ==================== DATA AGGREGATION ====================

  // Transform Transfers to unified format
  const transformedTransfers = useMemo(() => {
    return antalyaAirportTransfers.slice(0, 20).map((transfer) => {
      const basePrice = transfer.pricing.economySedan;
      const vehicleImage = transfer.category === 'airport'
        ? 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
        : transfer.category === 'tourist'
        ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80';

      return {
        id: transfer.id,
        type: 'transfer' as const,
        category: transfer.category,
        name: `${transfer.from[lang]} - ${transfer.to[lang]}`,
        description: `${transfer.duration} ${lang === 'tr' ? 'dk' : 'min'}, ${transfer.distance} km`,
        route: `${transfer.from[lang]} → ${transfer.to[lang]}`,
        capacity: '1-8',
        price: basePrice,
        priceUnit: 'one-way' as const,
        image: vehicleImage,
        features: [
          lang === 'tr' ? 'Profesyonel Şoför' : 'Professional Driver',
          lang === 'tr' ? 'Klimalı Araç' : 'Air Conditioned',
          lang === 'tr' ? '24/7 Destek' : '24/7 Support',
          lang === 'tr' ? 'WiFi' : 'WiFi',
          lang === 'tr' ? 'Bagaj Alanı' : 'Luggage Space',
        ],
        rating: transfer.rating,
        reviews: transfer.totalTransfers,
        distance: transfer.distance,
        duration: transfer.duration,
      };
    });
  }, [lang]);

  // Transform Car Rentals to unified format
  const transformedRentals = useMemo(() => {
    return antalyaCarRentals.slice(0, 30).map((rental) => {
      const priceMap = {
        daily: rental.pricing.daily,
        weekly: rental.pricing.weekly,
        monthly: rental.pricing.monthly,
      };

      const rentalImage = rental.category === 'economy'
        ? 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'
        : rental.category === 'luxury'
        ? 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80'
        : rental.category === 'suv'
        ? 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80';

      return {
        id: rental.id,
        type: 'rental' as const,
        category: rental.category,
        name: `${rental.brand} ${rental.model[lang]}`,
        description: `${rental.year} • ${rental.transmission === 'automatic' ? (lang === 'tr' ? 'Otomatik' : 'Automatic') : (lang === 'tr' ? 'Manuel' : 'Manual')} • ${rental.fuelType === 'diesel' ? 'Dizel' : rental.fuelType === 'gasoline' ? 'Benzin' : rental.fuelType}`,
        location: lang === 'tr' ? 'Antalya Bölgesi' : 'Antalya Region',
        capacity: `${rental.seats}`,
        price: priceMap[filters.rentalDuration],
        priceUnit: filters.rentalDuration,
        image: rentalImage,
        features: rental.features[lang].slice(0, 5),
        rating: rental.rating,
        reviews: rental.totalRentals,
        brand: rental.brand,
        transmission: rental.transmission,
        fuelType: rental.fuelType,
        luggage: rental.luggage,
      };
    });
  }, [lang, filters.rentalDuration]);

  // Combine all transportation items
  const allTransportation: TransportationItem[] = useMemo(() => {
    return [...transformedTransfers, ...transformedRentals];
  }, [transformedTransfers, transformedRentals]);

  // ==================== FILTERING & SORTING ====================

  const filteredTransportation = useMemo(() => {
    return allTransportation.filter((item) => {
      // Type filter
      if (filters.type !== 'all' && item.type !== filters.type) return false;

      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) return false;

      // Price range filter
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) return false;

      // Rating filter
      if (item.rating < filters.minRating) return false;

      // Transmission filter (for rentals)
      if (filters.transmission !== 'all' && item.transmission && item.transmission !== filters.transmission) return false;

      return true;
    });
  }, [allTransportation, filters]);

  const sortedTransportation = useMemo(() => {
    return [...filteredTransportation].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews; // popular
    });
  }, [filteredTransportation, sortBy]);

  // ==================== CATEGORY DEFINITIONS ====================

  const typeCategories = [
    { id: 'all', name: lang === 'tr' ? 'Tümü' : 'All', icon: Car, count: allTransportation.length },
    { id: 'transfer', name: lang === 'tr' ? 'Transferler' : 'Transfers', icon: ArrowRightLeft, count: transformedTransfers.length },
    { id: 'rental', name: lang === 'tr' ? 'Araç Kiralama' : 'Car Rentals', icon: Car, count: transformedRentals.length },
  ];

  const transferCategories = [
    { id: 'airport', name: lang === 'tr' ? 'Havalimanı' : 'Airport', icon: Plane },
    { id: 'city', name: lang === 'tr' ? 'Şehir İçi' : 'City', icon: Bus },
    { id: 'tourist', name: lang === 'tr' ? 'Turistik' : 'Tourist', icon: MapPin },
    { id: 'intercity', name: lang === 'tr' ? 'Şehirlerarası' : 'Intercity', icon: ArrowRightLeft },
  ];

  const rentalCategories = [
    { id: 'economy', name: lang === 'tr' ? 'Ekonomik' : 'Economy', icon: Car },
    { id: 'comfort', name: lang === 'tr' ? 'Konfor' : 'Comfort', icon: Shield },
    { id: 'premium', name: lang === 'tr' ? 'Premium' : 'Premium', icon: Award },
    { id: 'luxury', name: lang === 'tr' ? 'Lüks' : 'Luxury', icon: Crown },
    { id: 'suv', name: 'SUV', icon: Car },
  ];

  const activeCategories = filters.type === 'transfer'
    ? transferCategories
    : filters.type === 'rental'
    ? rentalCategories
    : [];

  // Reset category when type changes
  const handleTypeChange = (newType: typeof filters.type) => {
    setFilters({ ...filters, type: newType, category: 'all' });
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      priceRange: [0, 5000],
      minRating: 0,
      capacity: 'all',
      location: 'all',
      transmission: 'all',
      rentalDuration: 'daily',
    });
  };

  const activeFilterCount = [
    filters.type !== 'all',
    filters.category !== 'all',
    filters.minRating > 0,
    filters.transmission !== 'all',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 5000,
  ].filter(Boolean).length;

  return (
    <>
      <Head>
        <title>
          {lang === 'tr'
            ? 'Ulaşım - Transfer ve Araç Kiralama | Travel LyDian'
            : 'Transportation - Transfers and Car Rentals | Travel LyDian'}
        </title>
        <meta
          name="description"
          content={lang === 'tr'
            ? 'Antalya havalimanı transferi, araç kiralama ve VIP ulaşım hizmetleri. 50+ transfer rotası, 30+ araç seçeneği.'
            : 'Antalya airport transfers, car rentals and VIP transportation. 50+ transfer routes, 30+ vehicle options.'}
        />
        <meta
          name="keywords"
          content={lang === 'tr'
            ? 'antalya transfer, havalimanı transferi, araç kiralama, vip transfer, ekonomik araç kiralama'
            : 'antalya transfer, airport transfer, car rental, vip transfer, economy car rental'}
        />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-white mb-4"
            >
              {lang === 'tr' ? 'Ulaşım Hizmetleri' : 'Transportation Services'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-xl max-w-3xl"
            >
              {lang === 'tr'
                ? '50+ transfer rotası ve 30+ araç kiralama seçeneğiyle güvenli ve konforlu yolculuk'
                : '50+ transfer routes and 30+ car rental options for safe and comfortable travel'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <div className="bg-white/20 backdrop-blur-xl rounded-lg px-4 py-2 border border-white/30">
                <div className="text-white/80 text-sm">{lang === 'tr' ? 'Transfer Rotaları' : 'Transfer Routes'}</div>
                <div className="text-white font-bold text-2xl">{transformedTransfers.length}+</div>
              </div>
              <div className="bg-white/20 backdrop-blur-xl rounded-lg px-4 py-2 border border-white/30">
                <div className="text-white/80 text-sm">{lang === 'tr' ? 'Araç Seçeneği' : 'Vehicle Options'}</div>
                <div className="text-white font-bold text-2xl">{transformedRentals.length}+</div>
              </div>
              <div className="bg-white/20 backdrop-blur-xl rounded-lg px-4 py-2 border border-white/30">
                <div className="text-white/80 text-sm">{lang === 'tr' ? 'Ortalama Puan' : 'Average Rating'}</div>
                <div className="text-white font-bold text-2xl flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  4.8
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-slate-900/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                {lang === 'tr' ? 'Ana Sayfa' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-blue-400 transition-colors">
                {lang === 'tr' ? 'Keşfet' : 'Explore'}
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">
                {lang === 'tr' ? 'Ulaşım' : 'Transportation'}
              </span>
            </div>
          </div>
        </div>

        {/* Type Filter Tabs */}
        <div className="bg-slate-900/50 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              {typeCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleTypeChange(category.id as typeof filters.type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      filters.type === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sub-category Filter (conditionally shown) */}
        {activeCategories.length > 0 && (
          <div className="bg-slate-900/30 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filters.category === 'all'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang === 'tr' ? 'Tümü' : 'All'}
                </button>
                {activeCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFilters({ ...filters, category: cat.id })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                        filters.category === cat.id
                          ? 'bg-white/20 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-gray-300">
                <span className="font-bold text-white text-xl">{sortedTransportation.length}</span>{' '}
                {lang === 'tr' ? 'sonuç bulundu' : 'results found'}
              </div>

              {/* Rental Duration Toggle (only for rentals) */}
              {filters.type === 'rental' && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-1">
                  {(['daily', 'weekly', 'monthly'] as const).map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setFilters({ ...filters, rentalDuration: duration })}
                      className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                        filters.rentalDuration === duration
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {duration === 'daily' ? (lang === 'tr' ? 'Günlük' : 'Daily') :
                       duration === 'weekly' ? (lang === 'tr' ? 'Haftalık' : 'Weekly') :
                       (lang === 'tr' ? 'Aylık' : 'Monthly')}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span>{lang === 'tr' ? 'Filtrele' : 'Filters'}</span>
                {activeFilterCount > 0 && (
                  <span className="bg-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 pr-10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white/10 backdrop-blur-xl text-white"
                >
                  <option value="popular">{lang === 'tr' ? 'Popüler' : 'Popular'}</option>
                  <option value="rating">{lang === 'tr' ? 'En Yüksek Puan' : 'Highest Rated'}</option>
                  <option value="price-low">{lang === 'tr' ? 'Fiyat (Düşük)' : 'Price (Low)'}</option>
                  <option value="price-high">{lang === 'tr' ? 'Fiyat (Yüksek)' : 'Price (High)'}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {lang === 'tr' ? 'Gelişmiş Filtreler' : 'Advanced Filters'}
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  {lang === 'tr' ? 'Sıfırla' : 'Reset'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {lang === 'tr' ? 'Minimum Puan' : 'Minimum Rating'}
                  </label>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, minRating: rating })}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          filters.minRating === rating
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {rating > 0 ? `${rating}+` : lang === 'tr' ? 'Tümü' : 'All'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission Filter (for rentals) */}
                {filters.type === 'rental' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {lang === 'tr' ? 'Vites Tipi' : 'Transmission'}
                    </label>
                    <div className="flex gap-2">
                      {['all', 'automatic', 'manual'].map((trans) => (
                        <button
                          key={trans}
                          onClick={() => setFilters({ ...filters, transmission: trans as typeof filters.transmission })}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            filters.transmission === trans
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          <Settings className="w-4 h-4" />
                          {trans === 'all' ? (lang === 'tr' ? 'Tümü' : 'All') :
                           trans === 'automatic' ? (lang === 'tr' ? 'Otomatik' : 'Automatic') :
                           (lang === 'tr' ? 'Manuel' : 'Manual')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {lang === 'tr' ? 'Fiyat Aralığı' : 'Price Range'}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                      className="flex-1"
                    />
                    <span className="text-white font-semibold min-w-[80px]">
                      ₺{filters.priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Grid/List */}
          {sortedTransportation.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                <Car className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {lang === 'tr' ? 'Sonuç Bulunamadı' : 'No Results Found'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {lang === 'tr'
                    ? 'Arama kriterlerinize uygun sonuç bulunamadı. Filtreleri değiştirmeyi deneyin.'
                    : 'No results match your search criteria. Try adjusting the filters.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  {lang === 'tr' ? 'Filtreleri Sıfırla' : 'Reset Filters'}
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {sortedTransportation.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                >
                  <Link
                    href={item.type === 'transfer' ? `/transfers/${item.id}` : `/rentals/${item.id}`}
                    className={viewMode === 'list' ? 'flex w-full' : ''}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-56'}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-white/30">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-white">{item.rating}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full text-sm font-semibold text-white flex items-center gap-1 border border-white/30">
                        <Users className="w-4 h-4" />
                        <span>{item.capacity} {lang === 'tr' ? 'kişi' : 'seats'}</span>
                      </div>
                      <div className="absolute top-3 left-3 bg-blue-600 px-2 py-1 rounded-lg text-xs font-bold text-white">
                        {item.type === 'transfer' ? (lang === 'tr' ? 'Transfer' : 'Transfer') : (lang === 'tr' ? 'Kiralık' : 'Rental')}
                      </div>
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="font-bold text-lg mb-1 line-clamp-1 text-white">{item.name}</h3>
                      <div className="flex items-center gap-1 text-gray-300 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{item.route || item.location}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.features.slice(0, viewMode === 'list' ? 6 : 4).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-end justify-between border-t border-white/10 pt-3">
                        <div className="text-sm text-gray-400">
                          {item.reviews.toLocaleString()} {lang === 'tr' ? 'değerlendirme' : 'reviews'}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">
                            {item.priceUnit === 'one-way' ? (lang === 'tr' ? 'Tek Yön' : 'One Way') :
                             item.priceUnit === 'daily' ? (lang === 'tr' ? 'Günlük' : 'Per Day') :
                             item.priceUnit === 'weekly' ? (lang === 'tr' ? 'Haftalık' : 'Per Week') :
                             (lang === 'tr' ? 'Aylık' : 'Per Month')}
                          </div>
                          <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ₺{item.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
  };
};

export default TransportationPage;
