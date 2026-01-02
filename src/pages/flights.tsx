import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_SEO } from '../config/seo';
import { Search, Plane, Calendar, Users, ArrowLeft, ArrowRight, Clock, Zap, Star, Filter, Shield, Wifi, SlidersHorizontal, TrendingDown, Award, Sparkles, MapPin } from 'lucide-react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { NeoHero, FuturisticCard, FuturisticButton, NeoSection } from '../components/neo-glass';
import AdvancedFilters from '../components/search/AdvancedFilters';
import FilterChips from '../components/search/FilterChips';
import { useFilters } from '../hooks/useFilters';
import { FlightFilters, DEFAULT_FLIGHT_FILTERS } from '../types/filters';

const flights = [
{
  id: 1,
  slug: 'ist-ayt-tk123',
  airline: 'Turkish Airlines',
  logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop',
  from: 'İstanbul (IST)',
  to: 'Antalya (AYT)',
  departure: '08:30',
  arrival: '10:15',
  duration: '1s 45d',
  price: 450,
  originalPrice: 580,
  type: 'Direkt',
  aircraft: 'Boeing 737-800',
  amenities: ['WiFi', 'Yemek', 'Eğlence']
},
{
  id: 2,
  slug: 'saw-adb-pg456',
  airline: 'Pegasus Airlines',
  logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop',
  from: 'İstanbul (SAW)',
  to: 'İzmir (ADB)',
  departure: '14:20',
  arrival: '15:35',
  duration: '1s 15d',
  price: 320,
  originalPrice: 420,
  type: 'Direkt',
  aircraft: 'Airbus A320',
  amenities: ['WiFi', 'İkram']
},
{
  id: 3,
  slug: 'esb-tzx-tk789',
  airline: 'Turkish Airlines',
  logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop',
  from: 'Ankara (ESB)',
  to: 'Trabzon (TZX)',
  departure: '11:45',
  arrival: '13:20',
  duration: '1s 35d',
  price: 380,
  originalPrice: 480,
  type: 'Direkt',
  aircraft: 'Boeing 737-900',
  amenities: ['WiFi', 'Yemek', 'Eğlence']
},
{
  id: 4,
  slug: 'ist-bjv-aj234',
  airline: 'Anadolu Jet',
  logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=100&h=100&fit=crop',
  from: 'İstanbul (IST)',
  to: 'Bodrum (BJV)',
  departure: '16:10',
  arrival: '17:35',
  duration: '1s 25d',
  price: 390,
  originalPrice: null,
  type: 'Direkt',
  aircraft: 'Boeing 737-800',
  amenities: ['İkram']
},
{
  id: 5,
  slug: 'adb-ayt-sx567',
  airline: 'SunExpress',
  logo: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=100&h=100&fit=crop',
  from: 'İzmir (ADB)',
  to: 'Antalya (AYT)',
  departure: '09:15',
  arrival: '10:25',
  duration: '1s 10d',
  price: 280,
  originalPrice: 350,
  type: 'Direkt',
  aircraft: 'Boeing 737-800',
  amenities: ['WiFi', 'İkram']
},
{
  id: 6,
  slug: 'ist-asr-tk890',
  airline: 'Turkish Airlines',
  logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop',
  from: 'İstanbul (IST)',
  to: 'Kayseri (ASR)',
  departure: '12:30',
  arrival: '14:05',
  duration: '1s 35d',
  price: 420,
  originalPrice: 520,
  type: 'Direkt',
  aircraft: 'Airbus A321',
  amenities: ['WiFi', 'Yemek', 'Eğlence']
}];


const airlines = ['Tümü', 'Turkish Airlines', 'Pegasus Airlines', 'SunExpress', 'Anadolu Jet'];
const timeFilters = ['Tümü', 'Sabah (06-12)', 'Öğleden Sonra (12-18)', 'Akşam (18-00)'];

export default function Flights() {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1'
  });
  const [selectedAirline, setSelectedAirline] = useState('Tümü');
  const [selectedTime, setSelectedTime] = useState('Tümü');
  const [sortBy, setSortBy] = useState('price');
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filters hook
  const {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    activeFilterCount,
    isDefaultFilters
  } = useFilters<FlightFilters>({ type: 'flight', syncWithUrl: true });

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    let filtered = flights.filter((flight) => {
      // Price filter
      if (flight.price < filters.priceRange.min || flight.price > filters.priceRange.max) {
        return false;
      }

      // Stops filter
      if (filters.stops.length > 0) {
        if (!filters.stops.includes('direct')) {
          return false;
        }
      }

      // Airlines filter (legacy compatibility)
      if (selectedAirline !== 'Tümü' && flight.airline !== selectedAirline) {
        return false;
      }

      // Max duration filter
      const durationHours = parseInt(flight.duration.split('s')[0]);
      if (durationHours > filters.maxDuration) {
        return false;
      }

      return true;
    });

    // Sort flights
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'departure':
          return a.departure.localeCompare(b.departure);
        case 'price':
        default:
          return a.price - b.price;
      }
    });

    return filtered;
  }, [flights, filters, selectedAirline, sortBy]);

  // Handle filter chip removal
  const handleRemoveFilter = (filterKey: string, value?: any) => {
    if (filterKey === 'priceRange' || filterKey === 'maxDuration') {
      const defaultFilters = DEFAULT_FLIGHT_FILTERS;
      updateFilter(filterKey as keyof FlightFilters, defaultFilters[filterKey] as any);
    } else if (value !== undefined) {
      const currentValues = filters[filterKey as keyof FlightFilters] as any[];
      updateFilter(
        filterKey as keyof FlightFilters,
        currentValues.filter((v: any) => v !== value) as any
      );
    }
  };

  return (
    <>
      <SEOHead
        title={PAGE_SEO.flights.title}
        description={PAGE_SEO.flights.description}
        keywords={PAGE_SEO.flights.keywords?.split(', ')}
        canonical={PAGE_SEO.flights.canonical}
        type="website" />


      <ModernHeader />

      <main className="min-h-screen">
        {/* 🎬 NEO-GLASS HERO - COSMIC GRADIENT */}
        <NeoHero
          title="En Uygun Uçak Biletleri"
          subtitle="AI destekli fiyat karşılaştırması ve blockchain güvenli rezervasyon ile hızlı ve güvenli bilet alın"
          gradient="twilight"
          height="80vh"
          overlayOpacity={0.2}
          showFloatingElements={true}>

          {/* Badge with Plane Icon */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-8 shadow-lg">
            <Plane className="w-5 h-5 text-lydian-info" />
            <span className="text-sm font-semibold text-white">
              7/24 Dünya Çapında Uçuş Arama
            </span>
          </div>

          {/* Stats Cards with Glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mt-8">
            {[
              { icon: Award, value: '500+', label: 'Havayolu', color: 'var(--lydian-info)' },
              { icon: TrendingDown, value: '%30', label: 'Daha Ucuz', color: 'var(--lydian-success)' },
              { icon: Star, value: '4.9', label: 'Müşteri Puanı', color: 'var(--lydian-warning)' },
              { icon: Shield, value: '100%', label: 'Güvenli', color: 'var(--lydian-info)' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}>

                <stat.icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3" style={{ color: stat.color }} />
                <div className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Glassmorphism Search Form */}
          <div className="max-w-6xl mx-auto mt-12 bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-3xl border-2 border-white/20/20 rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(102,126,234,0.4)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Nereden', type: 'text', placeholder: 'İstanbul, Ankara...', icon: MapPin, value: searchData.from, key: 'from' },
                { label: 'Nereye', type: 'text', placeholder: 'Antalya, İzmir...', icon: Plane, value: searchData.to, key: 'to' },
                { label: 'Gidiş Tarihi', type: 'date', icon: Calendar, value: searchData.departure, key: 'departure' },
                { label: 'Yolcu Sayısı', type: 'select', icon: Users, value: searchData.passengers, key: 'passengers' }
              ].map((field, idx) => (
                <div key={idx} className="relative group">
                  <label className="block text-sm font-semibold mb-2 text-white/90 flex items-center gap-2">
                    <field.icon className="w-4 h-4 text-lydian-info" />
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      className="w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/20/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lydian-info focus:border-lydian-info transition-all hover:border-white/20/50"
                      value={searchData.passengers}
                      onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}>
                      <option value="1" className="bg-lydian-bg text-white">1 Yolcu</option>
                      <option value="2" className="bg-lydian-bg text-white">2 Yolcu</option>
                      <option value="3" className="bg-lydian-bg text-white">3 Yolcu</option>
                      <option value="4" className="bg-lydian-bg text-white">4+ Yolcu</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/20/30 rounded-xl text-white placeholder-lydian-text-inverse/50 focus:outline-none focus:ring-2 focus:ring-lydian-info focus:border-lydian-info transition-all hover:border-white/20/50"
                      value={field.value}
                      onChange={(e) => setSearchData({ ...searchData, [field.key]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <FuturisticButton variant="gradient"
                size="lg"
                leftIcon={<Search className="w-5 h-5" />}>
                Uçak Bileti Ara
              </FuturisticButton>
            </div>
          </div>
        </NeoHero>

        {/* 🎨 GLASSMORPHISM FILTER SECTION */}
        <section className="bg-lydian-bg/70 backdrop-blur-xl border-b border-white/20/30 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-lydian-info" />
                {filteredAndSortedFlights.length} Uçuş Bulundu
              </motion.h2>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border-2 border-white/20/40 rounded-xl hover:border-lydian-info transition-all relative shadow-lg">
                  <SlidersHorizontal className="w-5 h-5 text-lydian-info" />
                  <span className="font-semibold text-white">Gelişmiş Filtreler</span>
                  {activeFilterCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 px-2.5 py-0.5 bg-gradient-to-r from-lydian-info to-lydian-info-hover text-white rounded-full text-xs font-bold shadow-lg">
                      {activeFilterCount}
                    </motion.span>
                  )}
                </motion.button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-5 py-2.5 bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-xl border-2 border-white/20/40 rounded-xl text-white font-semibold focus:ring-2 focus:ring-lydian-info focus:border-lydian-info transition-all shadow-lg cursor-pointer">
                  <option value="price" className="bg-lydian-bg text-white">Fiyata Göre</option>
                  <option value="duration" className="bg-lydian-bg text-white">Süreye Göre</option>
                  <option value="departure" className="bg-lydian-bg text-white">Kalkış Saatine Göre</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6">
                <FilterChips
                  type="flight"
                  filters={filters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={resetFilters} />
              </motion.div>
            )}

            {/* 🎯 AIRLINE QUICK FILTERS - Glassmorphism Pills */}
            <div className="flex flex-wrap gap-3">
              {airlines.map((airline, idx) => (
                <motion.button
                  key={airline}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAirline(airline)}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                    selectedAirline === airline
                      ? 'bg-gradient-to-r from-lydian-info to-lydian-info-hover text-white shadow-lydian-info/50'
                      : 'bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/20/30 text-white hover:border-lydian-info hover:bg-lydian-bg/20'
                  }`}>
                  {airline}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* 🎨 NEO-GLASS RESULTS SECTION */}
        <NeoSection background="gradient" padding="xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-6">
              {/* Advanced Filters Sidebar */}
              <AdvancedFilters
                type="flight"
                filters={filters}
                onFilterChange={updateFilters}
                onReset={resetFilters}
                onClose={() => setShowFilters(false)}
                isOpen={showFilters}
                activeFilterCount={activeFilterCount} />

              {/* 🎴 FUTURISTIC FLIGHT CARDS GRID */}
              <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAndSortedFlights.map((flight, index) => {
                    // Airline color coding
                    const airlineColors: Record<string, string> = {
                      'Turkish Airlines': 'var(--lydian-primary)',
                      'Pegasus Airlines': 'var(--lydian-warning)',
                      'SunExpress': 'var(--lydian-warning)',
                      'Anadolu Jet': 'var(--lydian-info)'
                    };
                    const airlineColor = airlineColors[flight.airline] || 'var(--lydian-info)';

                    // Calculate savings percentage
                    const savingsPercent = flight.originalPrice
                      ? Math.round(((flight.originalPrice - flight.price) / flight.originalPrice) * 100)
                      : 0;

                    return (
                      <motion.div
                        key={flight.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}>

                        <FuturisticCard
                          image={flight.logo}
                          title={`${flight.from} → ${flight.to}`}
                          description={
                            <div className="space-y-4">
                              {/* Airline Header with Logo */}
                              <div className="flex items-center gap-3 pb-3 border-b border-white/20/20">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-lydian-bg/10 backdrop-blur-xl flex items-center justify-center ring-2 ring-white/20">
                                  <Image
                                    src={flight.logo}
                                    alt={flight.airline}
                                    width={48}
                                    height={48}
                                    className="object-cover" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg text-white">{flight.airline}</h3>
                                  <p className="text-sm text-gray-300">{flight.aircraft}</p>
                                </div>
                                <span className="px-3 py-1.5 bg-gradient-to-r from-lydian-success to-lydian-success-hover text-white rounded-xl text-xs font-bold shadow-lg">
                                  {flight.type}
                                </span>
                              </div>

                              {/* Animated Flight Route Timeline */}
                              <div className="relative py-6">
                                {/* Timeline Line */}
                                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-lydian-info via-lydian-info-hover to-lydian-info"></div>

                                <div className="relative grid grid-cols-3 gap-4 items-center">
                                  {/* Departure */}
                                  <div className="text-left">
                                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lydian-info to-lydian-info-hover mb-1">
                                      {flight.departure}
                                    </div>
                                    <div className="text-sm text-gray-300 font-semibold">{flight.from}</div>
                                  </div>

                                  {/* Duration with Animated Plane */}
                                  <div className="text-center">
                                    <motion.div
                                      animate={{ x: [0, 10, 0] }}
                                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-lydian-info to-lydian-info-hover shadow-lg mb-2">
                                      <Plane className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div className="text-xs text-gray-300 flex items-center justify-center gap-1 font-semibold">
                                      <Clock className="w-3 h-3" />
                                      {flight.duration}
                                    </div>
                                  </div>

                                  {/* Arrival */}
                                  <div className="text-right">
                                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lydian-info-hover to-lydian-info mb-1">
                                      {flight.arrival}
                                    </div>
                                    <div className="text-sm text-gray-300 font-semibold">{flight.to}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Amenities with Icons */}
                              <div className="flex flex-wrap gap-2">
                                {flight.amenities.map((amenity) => (
                                  <motion.span
                                    key={amenity}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-lydian-info/20 to-lydian-info-hover/20 border border-white/20/30 text-white text-xs rounded-xl font-semibold backdrop-blur-xl">
                                    {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
                                    {amenity === 'Yemek' && <span>🍽️</span>}
                                    {amenity === 'Eğlence' && <span>🎬</span>}
                                    {amenity === 'İkram' && <span>☕</span>}
                                    {amenity}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          }
                          price={`₺${flight.price.toLocaleString('tr-TR')}`}
                          oldPrice={flight.originalPrice ? `₺${flight.originalPrice.toLocaleString('tr-TR')}` : undefined}
                          badge={savingsPercent > 15 ? `${savingsPercent}% İNDİRİM` : undefined}
                          badges={['Blockchain Güvenli', 'Anında Onay']}
                          metadata={[
                            { icon: <Shield className="w-4 h-4" />, label: 'Güvenli Ödeme' },
                            { icon: <Zap className="w-4 h-4" />, label: 'Hızlı Rezervasyon' }
                          ]}
                          rating={4.8}
                          reviews={Math.floor(Math.random() * 500) + 100}
                          onClick={() => window.location.href = `/flights/${flight.slug}`}
                          category={flight.airline}
                          categoryColor={airlineColor}>

                          {/* Custom CTA Button */}
                          <div className="mt-4 pt-4 border-t border-white/20/20">
                            <FuturisticButton variant="gradient"
                              size="md"
                              fullWidth
                              leftIcon={<Plane className="w-4 h-4" />}>
                              Bileti Seç ve Rezerve Et
                            </FuturisticButton>
                            <p className="text-center text-xs text-gray-300 mt-2">
                              💎 Blockchain ile güvenli ödeme
                            </p>
                          </div>
                        </FuturisticCard>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 🎨 NO RESULTS - GLASSMORPHISM */}
                {filteredAndSortedFlights.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20">

                    <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-3xl border-2 border-white/20/30 rounded-3xl p-12 shadow-[0_20px_60px_-15px_rgba(102,126,234,0.4)]">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="mb-8">
                        <Plane className="w-24 h-24 text-lydian-info mx-auto" />
                      </motion.div>

                      <h2 className="text-3xl font-black text-white mb-4">
                        Uçuş Bulunamadı
                      </h2>
                      <p className="text-gray-300 mb-8 text-lg">
                        Aradığınız kriterlerde uçuş bulunamadı. Filtrelerinizi değiştirerek tekrar deneyin.
                      </p>

                      <FuturisticButton variant="gradient"
                        size="lg"
                        onClick={resetFilters}
                        leftIcon={<ArrowRight className="w-5 h-5" />}
                        iconPosition="right">
                        Filtreleri Temizle
                      </FuturisticButton>
                    </div>
                  </motion.div>
                )}

                {/* 🚀 LOAD MORE - FUTURISTIC BUTTON */}
                {filteredAndSortedFlights.length > 0 && (
                  <div className="text-center mt-12">
                    <FuturisticButton variant="outline"
                      size="lg"
                      leftIcon={<ArrowRight className="w-5 h-5" />}
                      iconPosition="right">
                      Daha Fazla Uçuş Yükle
                    </FuturisticButton>

                    <p className="text-gray-300 mt-4 text-sm">
                      🌍 500+ havayolu ile dünya çapında uçuş seçenekleri
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </NeoSection>

        {/* 🎯 FEATURES SECTION - GLASSMORPHISM */}
        <section className="py-16 bg-gradient-to-b from-lydian-bg to-lydian-bg-hover">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Neden AILYDIAN Holiday?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                AI destekli akıllı fiyat karşılaştırması ve blockchain güvenli rezervasyon
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'AI Fiyat Karşılaştırması',
                  description: '500+ havayolu arasında en uygun fiyatları anında buluyoruz',
                  color: 'var(--lydian-warning)',
                  gradient: 'from-lydian-warning to-lydian-warning-hover'
                },
                {
                  icon: Shield,
                  title: 'Blockchain Güvenli',
                  description: 'Tüm rezervasyonlarınız blockchain teknolojisi ile güvence altında',
                  color: 'var(--lydian-info)',
                  gradient: 'from-lydian-info to-lydian-info-hover'
                },
                {
                  icon: Award,
                  title: '%30 Daha Ucuz',
                  description: 'Rakiplerimize göre ortalama %30 daha uygun fiyat garantisi',
                  color: 'var(--lydian-success)',
                  gradient: 'from-lydian-success to-lydian-success-hover'
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group cursor-pointer">

                  <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-3xl border-2 border-white/20/30 rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(102,126,234,0.3)] h-full">
                    {/* Icon with Glow */}
                    <div className="relative mb-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="absolute inset-0 blur-2xl"
                        style={{ background: `radial-gradient(circle, ${feature.color}40, transparent)` }} />

                      <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-lydian-info group-hover:to-lydian-info-hover transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${feature.color}30, transparent)` }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🎬 CTA SECTION - COSMIC GRADIENT */}
        <section className="py-20 bg-gradient-to-r from-lydian-info via-lydian-info-hover to-lydian-info text-white relative overflow-hidden">
          {/* Animated Background Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-lydian-info-hover/30 to-transparent backdrop-blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ filter: 'blur(60px)' }} />

          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-lydian-warning/30 to-transparent backdrop-blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{ filter: 'blur(50px)' }} />

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>

              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Hayalinizdeki Seyahat Bir Tık Uzağınızda
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
                AI destekli akıllı rezervasyon ile dünya çapında en uygun uçak biletlerini keşfedin
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FuturisticButton variant="glass"
                  size="xl"
                  leftIcon={<Search className="w-6 h-6" />}>
                  Uçuş Ara
                </FuturisticButton>

                <FuturisticButton variant="outline"
                  size="xl"
                  leftIcon={<ArrowRight className="w-6 h-6" />}
                  iconPosition="right">
                  Tüm Destinasyonlar
                </FuturisticButton>
              </div>

              <p className="mt-8 text-sm text-blue-100/80">
                ✓ Anında Onay  •  ✓ Ücretsiz İptal  •  ✓ En İyi Fiyat Garantisi  •  ✓ 7/24 Destek
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}