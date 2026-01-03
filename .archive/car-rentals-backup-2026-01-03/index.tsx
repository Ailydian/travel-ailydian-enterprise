/**
 * Car Rentals Listing Page - Turo Style
 * Premium UI with vehicle filters, categories, and instant booking
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Car,
  Filter,
  X,
  Search,
  Star,
  Heart,
  Zap,
  CheckCircle,
  Users,
  DollarSign,
  MapPin,
  Settings,
  ChevronDown,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Fuel,
  Gauge,
  Calendar,
  Shield,
  Clock } from 'lucide-react';
import { VEHICLE_CATEGORIES } from '@/data/vehicleCategories';
import { ModernHeader } from '@/components/layout/ModernHeader';
import CarRentalSearchEngine, { type CarRentalSearchData } from '@/components/car-rentals/CarRentalSearchEngine';
import { AnimatedCarSVG } from '@/components/icons/AnimatedCarSVG';
import {
  CAR_RENTALS_SEO,
  CAR_RENTAL_SERVICE_SCHEMA,
  CAR_RENTAL_FAQ_SCHEMA,
  generateBreadcrumbSchema } from
'@/lib/seo-config';
import antalyaCarRentals from '@/data/antalya-car-rentals';
import logger from '../../lib/logger';

// Real vehicle data interface
interface Vehicle {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  luggage: number;
  features: string[];
  airConditioning: boolean;
  gps: boolean;
  bluetooth: boolean;
  usbCharger: boolean;
  pricePerDay: string;
  pricePerWeek: string;
  pricePerMonth: string;
  currency: string;
  deposit: string;
  insuranceIncluded: boolean;
  mainImage: string;
  images: string[];
  rating: string;
  reviewCount: number;
  isActive: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  pickupLocations: string[];
  availableCount: number;
}

interface Filters {
  city: string;
  vehicleType: string;
  priceMin: number;
  priceMax: number;
  transmission: string;
  fuelType: string;
  instantBook: boolean;
  verified: boolean;
}

const CarRentalsPage: React.FC = () => {
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    city: 'Tümü',
    vehicleType: 'all',
    priceMin: 0,
    priceMax: 5000,
    transmission: 'all',
    fuelType: 'all',
    instantBook: false,
    verified: false
  });

  // Convert Antalya car rentals to display format
  const allVehicles = useMemo(() => {
    return antalyaCarRentals.map((car) => ({
      id: car.id,
      name: `${car.brand} ${car.model.tr}`,
      slug: car.seo.slug.tr,
      brand: car.brand,
      model: car.model.tr,
      year: car.year,
      category: car.category,
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: car.seats,
      doors: car.doors,
      luggage: car.luggage,
      features: car.features.tr,
      airConditioning: car.features.tr.includes('Klima'),
      gps: car.features.tr.some((f) => f.includes('GPS')),
      bluetooth: car.features.tr.some((f) => f.includes('Bluetooth')),
      usbCharger: car.features.tr.some((f) => f.includes('USB')),
      pricePerDay: car.pricing.daily.toString(),
      pricePerWeek: car.pricing.weekly.toString(),
      pricePerMonth: car.pricing.monthly.toString(),
      currency: 'TRY',
      deposit: car.pricing.deposit.toString(),
      insuranceIncluded: true,
      mainImage: car.images[0] || 'https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800',
      images: car.images,
      rating: car.rating.toString(),
      reviewCount: car.totalRentals,
      isActive: car.active,
      isPopular: car.popular,
      isFeatured: car.popular,
      pickupLocations: Object.entries(car.availability).
      filter(([key, value]) => value === true).
      map(([key]) => key),
      availableCount: 5,
      carData: car // Orijinal data
    }));
  }, []);

  const loading = false;
  const vehicles = allVehicles;
  const featuredVehicles = allVehicles.filter((v) => v.isFeatured);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Only show active vehicles
      if (!vehicle.isActive) return false;

      // City filter - check pickup locations
      if (filters.city !== 'Tümü' && !vehicle.pickupLocations.includes(filters.city)) return false;

      // Vehicle type (category) filter
      if (filters.vehicleType !== 'all' && vehicle.category.toLowerCase().replace(/_/g, '-') !== filters.vehicleType) return false;

      // Price filter
      const vehiclePrice = parseInt(vehicle.pricePerDay);
      if (vehiclePrice < filters.priceMin || vehiclePrice > filters.priceMax) return false;

      // Transmission filter
      if (filters.transmission !== 'all' && vehicle.transmission !== filters.transmission.toUpperCase()) return false;

      // Fuel type filter
      if (filters.fuelType !== 'all' && vehicle.fuelType !== filters.fuelType.toUpperCase()) return false;

      // Instant book filter (show only available cars)
      if (filters.instantBook && vehicle.availableCount === 0) return false;

      // Search query
      if (searchQuery && !`${vehicle.brand} ${vehicle.model} ${vehicle.name}`.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      return true;
    });
  }, [vehicles, filters, searchQuery]);

  const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Ana Sayfa', url: '/' },
  { name: 'Araç Kiralama', url: '/car-rentals' }]
  );

  return (
    <>
      <NextSeo
        {...CAR_RENTALS_SEO} />


      <Head>
        <title>{CAR_RENTALS_SEO.title}</title>

        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CAR_RENTAL_SERVICE_SCHEMA) }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CAR_RENTAL_FAQ_SCHEMA) }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 min-h-[70vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full mb-6">
                <Car className="w-5 h-5" />
                <span className="text-sm font-medium">Araç Kiralama</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Hayalinizdeki Arabayı
                <br />
                <span className="text-blue-200">Şimdi Kiralayın</span>
              </h1>

              <p className="text-xl text-blue-50 mb-2 leading-relaxed max-w-3xl mx-auto">
                14+ araç kategorisi, binlerce doğrulanmış araç sahibi. Ekonomik sedan'dan lüks spor arabalara kadar.
              </p>
            </motion.div>

            {/* Advanced Search Engine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto w-full">

              <CarRentalSearchEngine
                onSearch={(searchData: CarRentalSearchData) => {
                  logger.debug('Search data:', { component: 'Index', metadata: { searchData } });
                  setShowFilters(true);
                }} />

            </motion.div>
          </div>
        </section>

        {/* Owner CTA Banner */}
        <section className="bg-gradient-to-r from-white/50 to-white/50 border-y border-white/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">

                  <Car className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Aracınızı Kiraya Verin
                  </h3>
                  <p className="text-gray-400">
                    Profesyonel Property Owner Dashboard ile kiralık araçlarınızı yönetin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-300">Ortalama Aylık Gelir</div>
                  <div className="text-2xl font-bold text-blue-500">₺8,500</div>
                </div>
                <Link href="/vehicle-owner" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                  Kayıt Ol
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Content Section with Animated Images */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-black text-white mb-4">

                Neden LyDian Car Rental?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400">

                Premium araç kiralama deneyiminin tüm avantajları
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border border-white/20 p-8">

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 w-24 h-24 bg-blue-500/20 rounded-full opacity-50 blur-2xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Doğrulanmış Araç Sahipleri
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Tüm araç sahiplerimiz kimlik doğrulamasından geçer. Sigortasız, ruhsatsız araç yok. %100 güvenilir platform.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-blue-500 font-semibold">
                    <Shield className="w-5 h-5" />
                    <span>1,200+ Doğrulanmış Araç</span>
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border border-white/20 p-8">

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 w-32 h-32 bg-blue-500/20 rounded-full opacity-40 blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-400/30">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Anında Rezervasyon
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Beklemeden, onay süreçleri olmadan anında kiralayın. Araç sahibiyle görüşmeye gerek yok. Dijital anahtarla hemen yola çıkın.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-blue-400 font-semibold">
                    <Clock className="w-5 h-5" />
                    <span>2 Dakikada Kiralama</span>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border border-white/20 p-8">

                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 right-1/2 w-40 h-40 bg-green-600/20 rounded-full opacity-30 blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    En Uygun Fiyatlar
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Aracılık komisyonu yok. Doğrudan araç sahibinden kiralayın. Ekonomik sedan ₺350/gün, lüks araçlar ₺1,200/gün.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-green-500 font-semibold">
                    <TrendingUp className="w-5 h-5" />
                    <span>%40 Daha Ekonomik</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border border-white/20 rounded-3xl p-12">

              <h3 className="text-3xl font-black text-white mb-8 text-center">
                Nasıl Çalışır?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg shadow-blue-500/30">

                    1
                  </motion.div>
                  <h4 className="font-bold text-white mb-2">Araç Seçin</h4>
                  <p className="text-sm text-gray-400">14+ kategoriden istediğiniz aracı bulun</p>
                </div>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg shadow-blue-500/30">

                    2
                  </motion.div>
                  <h4 className="font-bold text-white mb-2">Rezervasyon</h4>
                  <p className="text-sm text-gray-400">Anında onay, ödeme güvenli</p>
                </div>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg shadow-blue-500/30">

                    3
                  </motion.div>
                  <h4 className="font-bold text-white mb-2">Dijital Anahtar</h4>
                  <p className="text-sm text-gray-400">Mobil uygulama ile kilidi açın</p>
                </div>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg shadow-blue-500/30">

                    4
                  </motion.div>
                  <h4 className="font-bold text-white mb-2">Yola Çıkın</h4>
                  <p className="text-sm text-gray-400">Maceranızı başlatın!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Bar - Glassmorphism */}
        <section className="bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border-b border-white/20 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {VEHICLE_CATEGORIES.slice(0, 6).map((cat) =>
                <motion.button
                  key={cat.value}
                  onClick={() => setFilters((prev) => ({ ...prev, vehicleType: cat.value }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all backdrop-blur-xl ${
                  filters.vehicleType === cat.value ?
                  'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' :
                  'bg-white/10 backdrop-blur-xl border border-white/20 border border-white/20/30 text-white hover:border-blue-500/50'}`
                  }>

                    {cat.label}
                  </motion.button>
                )}
              </div>

              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all">

                <Filter className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white">Filtreler</span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white">

              {filteredVehicles.length} Araç Bulundu
            </motion.h2>
            <p className="text-gray-400">En iyi seçenekler sizin için</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) =>
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push(`/car-rentals/${vehicle.slug}`)}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img src={vehicle.mainImage} alt={vehicle.name} className="w-full h-full object-cover" />
                    {(vehicle.isFeatured || vehicle.isPopular) && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-full">
                        {vehicle.isFeatured ? 'Öne Çıkan' : 'Popüler'}
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(vehicle.id);
                      }}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Heart className={`w-5 h-5 ${favorites.has(vehicle.id) ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-white">{vehicle.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-white">{vehicle.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{vehicle.brand} • {vehicle.year}</p>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{vehicle.pickupLocations[0] || 'Antalya'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.seats} Koltuk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span>{vehicle.transmission === 'AUTOMATIC' ? 'Otomatik' : 'Manuel'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                    </div>

                    {/* Vehicle Features Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.insuranceIncluded && (
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-500 rounded-xl text-xs font-medium flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Sigorta Dahil
                        </span>
                      )}
                      {vehicle.gps && (
                        <span className="px-3 py-1 bg-blue-400/20 border border-blue-400/30 text-blue-400 rounded-xl text-xs font-medium flex items-center gap-1">
                          🗺️ GPS
                        </span>
                      )}
                      {vehicle.airConditioning && (
                        <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 rounded-xl text-xs font-medium flex items-center gap-1">
                          ❄️ Klima
                        </span>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl font-bold text-white">₺{parseInt(vehicle.pricePerDay).toLocaleString('tr-TR')}<span className="text-sm text-gray-400">/gün</span></div>
                      </div>
                      <Link href={`/car-rentals/${vehicle.slug}`} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl" onClick={(e) => e.stopPropagation()}>
                        Kirala
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Owner CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden">
            {/* Animated background orbs */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

            <div className="relative px-6 py-12 sm:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}>

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl mb-6 shadow-lg">

                  <Car className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Aracınızı Kiraya Vererek Para Kazanın
                </h2>

                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Binlerce araç sahibi LyDian ile pasif gelir elde ediyor.
                  Siz de aracınızı listeleyerek aylık ortalama ₺8,500 kazanabilirsiniz.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl">

                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">%12-15 Komisyon</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl">

                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Güvenli Ödeme</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl">

                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">7/24 Destek</span>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/vehicle-owner/auth/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/20">
                    Ücretsiz Kayıt Ol
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link href="/vehicle-owner/auth/login" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                    Giriş Yap
                  </Link>
                </div>

                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm text-white/90 mt-6 font-medium">

                  2000+ araç sahibi bize güveniyor
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>);

};

// CRITICAL: Add i18n support for this page
// Without this, language changes won't work
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
};

export default CarRentalsPage;