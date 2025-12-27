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
  Clock } from
'lucide-react';
import { VEHICLE_CATEGORIES } from '@/data/vehicleCategories';
import { FuturisticHeader } from '@/components/layout/FuturisticHeader';
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
import { NeoHero } from '@/components/neo-glass/NeoHero';
import { FuturisticCard } from '@/components/neo-glass/FuturisticCard';
import { FuturisticButton } from '@/components/neo-glass/FuturisticButton';

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

      <FuturisticHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* NeoHero Section */}
        <NeoHero
          title="Hayalinizdeki Arabayı Şimdi Kiralayın"
          subtitle="14+ araç kategorisi, binlerce doğrulanmış araç sahibi. Ekonomik sedan'dan lüks spor arabalara kadar."
          gradient="sunset"
          height="70vh"
          overlayOpacity={0.3}
          showFloatingElements={true}>

          {/* Advanced Search Engine */}
          <div className="max-w-6xl mx-auto w-full mt-8">
            <CarRentalSearchEngine
              onSearch={(searchData: CarRentalSearchData) => {
                logger.debug('Search data:', { component: 'Index', metadata: { searchData } });
                setShowFilters(true);
              }} />

          </div>
        </NeoHero>

        {/* Owner CTA Banner */}
        <section className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 border-y border-[#FF9500]/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF9500]/30">

                  <Car className="w-8 h-8 text-lydian-text-inverse" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-1">
                    Aracınızı Kiraya Verin
                  </h3>
                  <p className="text-lydian-text-dim">
                    Profesyonel Property Owner Dashboard ile kiralık araçlarınızı yönetin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-lydian-text-muted">Ortalama Aylık Gelir</div>
                  <div className="text-2xl font-bold text-[#FF9500]">₺8,500</div>
                </div>
                <Link href="/vehicle-owner">
                  <FuturisticButton variant="secondary" size="md" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                    Kayıt Ol
                  </FuturisticButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Content Section with Animated Images */}
        <section className="bg-lydian-bg-hover py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-black text-lydian-text-inverse mb-4">

                Neden LyDian Car Rental?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-lydian-text-dim">

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
                className="relative overflow-hidden rounded-2xl bg-lydian-glass-dark backdrop-blur-xl border border-lydian-border-light/20 p-8">

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 w-24 h-24 bg-[#FF9500]/20 rounded-full opacity-50 blur-2xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#FF9500]/30">
                    <CheckCircle className="w-8 h-8 text-lydian-text-inverse" />
                  </div>
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-3">
                    Doğrulanmış Araç Sahipleri
                  </h3>
                  <p className="text-lydian-text-dim leading-relaxed">
                    Tüm araç sahiplerimiz kimlik doğrulamasından geçer. Sigortasız, ruhsatsız araç yok. %100 güvenilir platform.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-[#FF9500] font-semibold">
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
                className="relative overflow-hidden rounded-2xl bg-lydian-glass-dark backdrop-blur-xl border border-lydian-border-light/20 p-8">

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 w-32 h-32 bg-[#00BAFF]/20 rounded-full opacity-40 blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00BAFF] to-[#0088BD] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#00BAFF]/30">
                    <Zap className="w-8 h-8 text-lydian-text-inverse" />
                  </div>
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-3">
                    Anında Rezervasyon
                  </h3>
                  <p className="text-lydian-text-dim leading-relaxed">
                    Beklemeden, onay süreçleri olmadan anında kiralayın. Araç sahibiyle görüşmeye gerek yok. Dijital anahtarla hemen yola çıkın.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-[#00BAFF] font-semibold">
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
                className="relative overflow-hidden rounded-2xl bg-lydian-glass-dark backdrop-blur-xl border border-lydian-border-light/20 p-8">

                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 right-1/2 w-40 h-40 bg-[#667EEA]/20 rounded-full opacity-30 blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#667EEA]/30">
                    <DollarSign className="w-8 h-8 text-lydian-text-inverse" />
                  </div>
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-3">
                    En Uygun Fiyatlar
                  </h3>
                  <p className="text-lydian-text-dim leading-relaxed">
                    Aracılık komisyonu yok. Doğrudan araç sahibinden kiralayın. Ekonomik sedan ₺350/gün, lüks araçlar ₺1,200/gün.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-[#667EEA] font-semibold">
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
              className="mt-16 bg-lydian-glass-dark backdrop-blur-xl border border-lydian-border-light/20 rounded-3xl p-12">

              <h3 className="text-3xl font-black text-lydian-text-inverse mb-8 text-center">
                Nasıl Çalışır?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4 text-lydian-text-inverse text-2xl font-bold shadow-lg shadow-[#FF9500]/30">

                    1
                  </motion.div>
                  <h4 className="font-bold text-lydian-text-inverse mb-2">Araç Seçin</h4>
                  <p className="text-sm text-lydian-text-dim">14+ kategoriden istediğiniz aracı bulun</p>
                </div>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4 text-lydian-text-inverse text-2xl font-bold shadow-lg shadow-[#FF9500]/30">

                    2
                  </motion.div>
                  <h4 className="font-bold text-lydian-text-inverse mb-2">Rezervasyon</h4>
                  <p className="text-sm text-lydian-text-dim">Anında onay, ödeme güvenli</p>
                </div>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4 text-lydian-text-inverse text-2xl font-bold shadow-lg shadow-[#FF9500]/30">

                    3
                  </motion.div>
                  <h4 className="font-bold text-lydian-text-inverse mb-2">Dijital Anahtar</h4>
                  <p className="text-sm text-lydian-text-dim">Mobil uygulama ile kilidi açın</p>
                </div>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4 text-lydian-text-inverse text-2xl font-bold shadow-lg shadow-[#FF9500]/30">

                    4
                  </motion.div>
                  <h4 className="font-bold text-lydian-text-inverse mb-2">Yola Çıkın</h4>
                  <p className="text-sm text-lydian-text-dim">Maceranızı başlatın!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Bar - Glassmorphism */}
        <section className="bg-lydian-glass-dark backdrop-blur-xl border-b border-lydian-border-light/20 sticky top-20 z-40">
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
                  'bg-gradient-to-r from-[#FF9500] to-[#FF6B00] text-white shadow-lg shadow-[#FF9500]/30' :
                  'bg-lydian-glass-dark-medium border border-lydian-border-light/30 text-lydian-text-inverse hover:border-[#FF9500]/50'}`
                  }>

                    {cat.label}
                  </motion.button>
                )}
              </div>

              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light/30 rounded-xl hover:border-[#FF9500]/50 transition-all">

                <Filter className="w-5 h-5 text-lydian-text-inverse" />
                <span className="text-sm font-medium text-lydian-text-inverse">Filtreler</span>
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
              className="text-2xl font-bold text-lydian-text-inverse">

              {filteredVehicles.length} Araç Bulundu
            </motion.h2>
            <p className="text-lydian-text-dim">En iyi seçenekler sizin için</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) =>
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}>

                <FuturisticCard
                image={vehicle.mainImage}
                title={vehicle.name}
                description={`${vehicle.brand} • ${vehicle.year}`}
                price={`₺${parseInt(vehicle.pricePerDay).toLocaleString('tr-TR')}/gün`}
                badge={vehicle.isFeatured ? 'Öne Çıkan' : vehicle.isPopular ? 'Popüler' : undefined}
                badges={[
                  vehicle.availableCount > 0 ? `${vehicle.availableCount} Müsait` : ''
                ].filter(Boolean)}
                category={vehicle.category}
                categoryColor="#FF9500"
                rating={parseFloat(vehicle.rating)}
                reviews={vehicle.reviewCount}
                metadata={[
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    label: vehicle.pickupLocations[0] || 'Antalya'
                  },
                  {
                    icon: <Users className="w-4 h-4" />,
                    label: `${vehicle.seats} Koltuk`
                  },
                  {
                    icon: <Settings className="w-4 h-4" />,
                    label: vehicle.transmission === 'AUTOMATIC' ? 'Otomatik' : 'Manuel'
                  },
                  {
                    icon: <Fuel className="w-4 h-4" />,
                    label: vehicle.fuelType
                  }
                ]}
                onClick={() => router.push(`/car-rentals/${vehicle.slug}`)}
                onFavorite={(e) => {
                  e.stopPropagation();
                  toggleFavorite(vehicle.id);
                }}
                isFavorite={favorites.has(vehicle.id)}>

                  {/* Custom CTA Button */}
                  <div className="mt-4">
                    <Link href={`/car-rentals/${vehicle.slug}`}>
                      <FuturisticButton
                      variant="secondary"
                      size="md"
                      fullWidth
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right">

                        Kirala
                      </FuturisticButton>
                    </Link>
                  </div>

                  {/* Vehicle Features Badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {vehicle.insuranceIncluded &&
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-xl text-xs font-medium flex items-center gap-1 backdrop-blur-xl">

                        <Shield className="w-3 h-3" />
                        Sigorta Dahil
                      </motion.span>
                    }
                    {vehicle.gps &&
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-medium flex items-center gap-1 backdrop-blur-xl">

                        🗺️ GPS
                      </motion.span>
                    }
                    {vehicle.airConditioning &&
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-medium flex items-center gap-1 backdrop-blur-xl">

                        ❄️ Klima
                      </motion.span>
                    }
                  </div>
                </FuturisticCard>
              </motion.div>
            )}
          </div>
        </section>

        {/* Owner CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="relative bg-gradient-to-r from-[#FF9500] to-[#FF6B00] rounded-3xl overflow-hidden">
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
                  <Link href="/vehicle-owner/auth/register">
                    <FuturisticButton
                      variant="glass"
                      size="lg"
                      icon={<ArrowRight className="w-5 h-5" />}
                      iconPosition="right">

                      Ücretsiz Kayıt Ol
                    </FuturisticButton>
                  </Link>

                  <Link href="/vehicle-owner/auth/login">
                    <FuturisticButton
                      variant="outline"
                      size="lg">

                      Giriş Yap
                    </FuturisticButton>
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

export default CarRentalsPage;