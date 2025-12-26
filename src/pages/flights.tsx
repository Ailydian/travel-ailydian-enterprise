import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_SEO } from '../config/seo';
import { Search, Plane, Calendar, Users, ArrowLeft, ArrowRight, Clock, Zap, Star, Filter, Shield, Wifi, SlidersHorizontal } from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
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
  }
];

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
    isDefaultFilters,
  } = useFilters<FlightFilters>({ type: 'flight', syncWithUrl: true });

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    let filtered = flights.filter(flight => {
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
        type="website"
      />

      <FuturisticHeader />

      {/* Return to Home Button - FIXED: Increased z-index to be above all overlays */}
      <Link
        href="/"
        className="fixed top-24 left-6 z-[60] flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-200 hover:bg-white/5 hover:text-lydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lydian-primary to-lydian-secondary py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                En Uygun Uçak Biletleri
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                AI destekli fiyat karşılaştırması ve blockchain güvenli rezervasyon ile hızlı ve güvenli bilet alın
              </p>
              
              {/* Search Form */}
              <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Nereden</label>
                    <input
                      type="text"
                      placeholder="İstanbul, Ankara..."
                      className="w-full px-3 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                      value={searchData.from}
                      onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Nereye</label>
                    <input
                      type="text"
                      placeholder="Antalya, İzmir..."
                      className="w-full px-3 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                      value={searchData.to}
                      onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Gidiş Tarihi</label>
                    <input
                      type="date"
                      className="w-full px-3 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 [color-scheme:light]"
                      style={{ colorScheme: 'light' }}
                      value={searchData.departure}
                      onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Yolcu Sayısı</label>
                    <select 
                      className="w-full px-3 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      value={searchData.passengers}
                      onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                    >
                      <option value="1">1 Yolcu</option>
                      <option value="2">2 Yolcu</option>
                      <option value="3">3 Yolcu</option>
                      <option value="4">4+ Yolcu</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-3 bg-transparent text-lydian-primary rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    Uçak Bileti Ara
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-transparent border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                {filteredAndSortedFlights.length} Uçuş Bulundu
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Gelişmiş Filtreler
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-lydian-primary text-white rounded-full text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent"
                >
                  <option value="price">Fiyata Göre</option>
                  <option value="duration">Süreye Göre</option>
                  <option value="departure">Kalkış Saatine Göre</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="mb-4">
                <FilterChips
                  type="flight"
                  filters={filters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={resetFilters}
                />
              </div>
            )}

            {/* Airline Filters (Quick Filters) */}
            <div className="flex flex-wrap gap-3">
              {airlines.map((airline) => (
                <button
                  key={airline}
                  onClick={() => setSelectedAirline(airline)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors text-sm ${
                    selectedAirline === airline
                      ? 'bg-lydian-primary text-white'
                      : 'bg-gray-100 text-gray-200 hover:bg-lydian-primary hover:text-white'
                  }`}
                >
                  {airline}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section with Filters */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-6">
              {/* Advanced Filters Sidebar */}
              <AdvancedFilters
                type="flight"
                filters={filters}
                onFilterChange={updateFilters}
                onReset={resetFilters}
                onClose={() => setShowFilters(false)}
                isOpen={showFilters}
                activeFilterCount={activeFilterCount}
              />

              {/* Flights List */}
              <div className="flex-1">
                <div className="space-y-6">
                  {filteredAndSortedFlights.map((flight) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: flight.id * 0.1 }}
                  className="bg-transparent rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Flight Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <Image
                              src={flight.logo}
                              alt={flight.airline}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white">{flight.airline}</h3>
                            <p className="text-sm text-gray-500">{flight.aircraft}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {flight.type}
                          </span>
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                            <Shield className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Flight Route */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-4">
                        <div className="text-center md:text-left">
                          <div className="font-bold text-2xl text-white">{flight.departure}</div>
                          <div className="text-sm text-gray-500 font-medium">{flight.from}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-4 h-0.5 bg-gray-300"></div>
                            <Plane className="h-5 w-5 text-lydian-primary mx-2" />
                            <div className="w-4 h-0.5 bg-gray-300"></div>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center justify-center font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            {flight.duration}
                          </div>
                        </div>
                        
                        <div className="text-center md:text-right">
                          <div className="font-bold text-2xl text-white">{flight.arrival}</div>
                          <div className="text-sm text-gray-500 font-medium">{flight.to}</div>
                        </div>
                      </div>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {flight.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                          >
                            {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="mt-6 lg:mt-0 lg:ml-8 text-center lg:text-right">
                      <div className="mb-4">
                        {flight.originalPrice && (
                          <div className="text-sm text-gray-500 line-through mb-1">
                            ₺{flight.originalPrice}
                          </div>
                        )}
                        <div className="text-3xl font-bold text-white">
                          ₺{flight.price}
                        </div>
                        <div className="text-sm text-gray-300">kişi başına</div>
                      </div>
                      
                      <Link href={`/flights/${flight.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full lg:w-auto px-8 py-3 bg-lydian-primary text-white rounded-xl font-semibold hover:bg-lydian-dark transition-colors"
                        >
                          Bileti Seç
                        </motion.button>
                      </Link>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        ✓ Blockchain Güvenli Rezervasyon
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
                </div>

                {/* No Results Message */}
                {filteredAndSortedFlights.length === 0 && (
                  <div className="text-center py-16">
                    <Plane className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Aradığınız kriterlerde uçuş bulunamadı
                    </h2>
                    <p className="text-gray-300 mb-8">
                      Filtrelerinizi değiştirerek tekrar deneyin
                    </p>
                    <button
                      onClick={resetFilters}
                      className="bg-lydian-primary text-white px-6 py-3 rounded-lg hover:bg-lydian-dark transition-colors font-semibold"
                    >
                      Filtreleri Temizle
                    </button>
                  </div>
                )}

                {/* Load More */}
                {filteredAndSortedFlights.length > 0 && (
                  <div className="text-center mt-12">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border-2 border-lydian-primary text-lydian-primary rounded-xl font-semibold hover:bg-lydian-primary hover:text-white transition-colors"
                    >
                      Daha Fazla Uçuş Yükle
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}