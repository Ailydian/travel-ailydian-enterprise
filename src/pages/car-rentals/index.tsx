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
  Clock,
} from 'lucide-react';
import { VEHICLE_CATEGORIES } from '@/data/vehicleCategories';
import SimplifiedHeader from '@/components/layout/SimplifiedHeader';
import CarRentalSearchEngine, { type CarRentalSearchData } from '@/components/car-rentals/CarRentalSearchEngine';
import {
  CAR_RENTALS_SEO,
  CAR_RENTAL_SERVICE_SCHEMA,
  CAR_RENTAL_FAQ_SCHEMA,
  generateBreadcrumbSchema
} from '@/lib/seo-config';
import antalyaCarRentals from '@/data/antalya-car-rentals';

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
    verified: false,
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
      gps: car.features.tr.some(f => f.includes('GPS')),
      bluetooth: car.features.tr.some(f => f.includes('Bluetooth')),
      usbCharger: car.features.tr.some(f => f.includes('USB')),
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
      pickupLocations: Object.entries(car.availability)
        .filter(([key, value]) => value === true)
        .map(([key]) => key),
      availableCount: 5,
      carData: car // Orijinal data
    }));
  }, []);

  const loading = false;
  const vehicles = allVehicles;
  const featuredVehicles = allVehicles.filter(v => v.isFeatured);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
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
    return vehicles.filter(vehicle => {
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
    { name: 'Araç Kiralama', url: '/car-rentals' }
  ]);

  return (
    <>
      <NextSeo
        {...CAR_RENTALS_SEO}
      />

      <Head>
        <title>{CAR_RENTALS_SEO.title}</title>

        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CAR_RENTAL_SERVICE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CAR_RENTAL_FAQ_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section - Full Width Search Engine */}
        <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Car className="w-5 h-5" />
                <span className="text-sm font-medium">Araç Kiralama</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Hayalinizdeki Arabayı
                <br />
                <span className="text-green-200">Şimdi Kiralayın</span>
              </h1>

              <p className="text-xl text-green-50 mb-2 leading-relaxed max-w-3xl mx-auto">
                14+ araç kategorisi, binlerce doğrulanmış araç sahibi. Ekonomik sedan'dan lüks spor arabalara kadar.
              </p>
            </motion.div>

            {/* Advanced Search Engine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <CarRentalSearchEngine
                onSearch={(searchData: CarRentalSearchData) => {
                  console.log('Search data:', searchData);
                  // Filter logic will be implemented
                  setShowFilters(true);
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Owner CTA Banner - Similar to rentals */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 border-y border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    Aracınızı Kiraya Verin
                  </h3>
                  <p className="text-gray-600">
                    Profesyonel Property Owner Dashboard ile kiralık araçlarınızı yönetin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Ortalama Aylık Gelir</div>
                  <div className="text-2xl font-bold text-green-600">₺8,500</div>
                </div>
                <Link href="/vehicle-owner">
                  <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    Kayıt Ol
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Content Section with Animated Images */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-black text-gray-900 mb-4"
              >
                Neden Ailydian Car Rental?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
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
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Doğrulanmış Araç Sahipleri
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tüm araç sahiplerimiz kimlik doğrulamasından geçer. Sigortasız, ruhsatsız araç yok. %100 güvenilir platform.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-green-600 font-semibold">
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
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 p-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-3xl"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Anında Rezervasyon
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Beklemeden, onay süreçleri olmadan anında kiralayın. Araç sahibiyle görüşmeye gerek yok. Dijital anahtarla hemen yola çıkın.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-blue-600 font-semibold">
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
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 p-8"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 right-1/2 w-40 h-40 bg-purple-200 rounded-full opacity-30 blur-3xl"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    En Uygun Fiyatlar
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aracılık komisyonu yok. Doğrudan araç sahibinden kiralayın. Ekonomik sedan ₺350/gün, lüks araçlar ₺1,200/gün.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-purple-600 font-semibold">
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
              className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12"
            >
              <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
                Nasıl Çalışır?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Araç Seçin</h4>
                  <p className="text-sm text-gray-600">14+ kategoriden istediğiniz aracı bulun</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Rezervasyon</h4>
                  <p className="text-sm text-gray-600">Anında onay, ödeme güvenli</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Dijital Anahtar</h4>
                  <p className="text-sm text-gray-600">Mobil uygulama ile kilidi açın</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    4
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Yola Çıkın</h4>
                  <p className="text-sm text-gray-600">Maceranızı başlatın!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {VEHICLE_CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilters(prev => ({ ...prev, vehicleType: cat.value }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.vehicleType === cat.value
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">Filtreler</span>
              </button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredVehicles.length} Araç Bulundu
            </h2>
            <p className="text-gray-600">En iyi seçenekler sizin için</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Car className="w-20 h-20 text-gray-300" />

                  {vehicle.isFeatured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Öne Çıkan
                    </div>
                  )}

                  {vehicle.isPopular && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popüler
                    </div>
                  )}

                  {vehicle.availableCount > 0 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                      {vehicle.availableCount} Müsait
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(vehicle.id);
                    }}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(vehicle.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm text-gray-500">{vehicle.brand} • {vehicle.year}</p>
                    </div>
                    {vehicle.insuranceIncluded && (
                      <Shield className="w-5 h-5 text-green-600" title="Sigorta Dahil" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{vehicle.pickupLocations[0]}</span>
                    <span>•</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-900">{vehicle.rating}</span>
                    <span>({vehicle.reviewCount})</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {vehicle.seats} Koltuk
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center gap-1">
                      <Settings className="w-3 h-3" />
                      {vehicle.transmission === 'AUTOMATIC' ? 'Otomatik' : 'Manuel'}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center gap-1">
                      <Fuel className="w-3 h-3" />
                      {vehicle.fuelType}
                    </span>
                    {vehicle.airConditioning && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs" title="Klima">
                        ❄️
                      </span>
                    )}
                    {vehicle.gps && (
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs" title="GPS">
                        🗺️
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">₺{parseInt(vehicle.pricePerDay).toLocaleString('tr-TR')}</div>
                      <div className="text-sm text-gray-500">/ gün</div>
                    </div>
                    <Link
                      href={`/car-rentals/${vehicle.slug}`}
                      className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                    >
                      Kirala
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Owner CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
                  <Car className="w-8 h-8 text-green-600" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Aracınızı Kiraya Vererek Para Kazanın
                </h2>

                <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
                  Binlerce araç sahibi Ailydian ile pasif gelir elde ediyor.
                  Siz de aracınızı listeleyerek aylık ortalama ₺8,500 kazanabilirsiniz.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>%12-15 Komisyon</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>Güvenli Ödeme</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>7/24 Destek</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/vehicle-owner/auth/register">
                    <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                      <span>Ücretsiz Kayıt Ol</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>

                  <Link href="/vehicle-owner/auth/login">
                    <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <span>Giriş Yap</span>
                    </button>
                  </Link>
                </div>

                <p className="text-sm text-green-100 mt-6">
                  2000+ araç sahibi bize güveniyor
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CarRentalsPage;
