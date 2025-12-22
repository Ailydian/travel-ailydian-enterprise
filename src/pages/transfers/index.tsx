/**
 * Transfers Listing Page - Viator Style
 * Premium UI for airport & city transfers with route selection
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Bus,
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
  Plane,
  Hotel,
  Calendar,
  Clock,
  Shield,
} from 'lucide-react';
import SimpleNavigationHeader from '@/components/layout/SimpleNavigationHeader';
import TransferRouteSelector from '@/components/transfers/TransferRouteSelector';
import type { AdvancedLocationSuggestion } from '@/lib/location-service-advanced';
import {
  TRANSFERS_SEO,
  TRANSFER_SERVICE_SCHEMA,
  TRANSFER_FAQ_SCHEMA,
  generateBreadcrumbSchema
} from '@/lib/seo-config';

// Transfer vehicle types
const TRANSFER_TYPES = [
  { value: 'all', label: 'Tüm Araçlar', capacity: null },
  { value: 'economy-sedan', label: 'Ekonomik Sedan', capacity: 3 },
  { value: 'vip-sedan', label: 'VIP Sedan', capacity: 3 },
  { value: 'minivan', label: 'Minivan', capacity: 7 },
  { value: 'vip-minivan', label: 'VIP Minivan', capacity: 7 },
  { value: 'minibus-14', label: 'Minibüs (14)', capacity: 14 },
  { value: 'bus-30', label: 'Otobüs (30)', capacity: 30 },
];

// Popular routes
const POPULAR_ROUTES = [
  {
    id: 'r1',
    from: 'İstanbul Havalimanı',
    to: 'Taksim',
    distance: '45 km',
    duration: '40 dk',
    price: 250,
    vehicles: 24,
  },
  {
    id: 'r2',
    from: 'Antalya Havalimanı',
    to: 'Lara Oteller',
    distance: '18 km',
    duration: '25 dk',
    price: 180,
    vehicles: 18,
  },
  {
    id: 'r3',
    from: 'Sabiha Gökçen',
    to: 'Kadıköy',
    distance: '35 km',
    duration: '35 dk',
    price: 220,
    vehicles: 31,
  },
];

// Mock transfer data
const MOCK_TRANSFERS = [
  {
    id: 't1',
    company: 'VIP Transfer İstanbul',
    vehicleType: 'vip-sedan',
    vehicle: 'Mercedes E-Class',
    capacity: 3,
    luggage: 3,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    price: 280,
    rating: 4.9,
    reviews: 234,
    city: 'İstanbul',
    features: ['WiFi', 'Su', 'Klima', 'Profesyonel Şoför'],
    instantBook: true,
    d2License: true,
    onTimeRate: 98,
  },
  {
    id: 't2',
    company: 'Antalya Premium Transfer',
    vehicleType: 'minivan',
    vehicle: 'Mercedes Vito',
    capacity: 7,
    luggage: 7,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    price: 350,
    rating: 4.8,
    reviews: 189,
    city: 'Antalya',
    features: ['WiFi', 'Soğuk İçecek', 'Çocuk Koltuğu', 'Klima'],
    instantBook: true,
    d2License: true,
    onTimeRate: 96,
  },
  {
    id: 't3',
    company: 'Bodrum Airport Transfer',
    vehicleType: 'vip-minivan',
    vehicle: 'Mercedes Vito VIP',
    capacity: 6,
    luggage: 6,
    image: 'https://images.unsplash.com/photo-1600054800747-be294a6a0d26?w=800',
    price: 450,
    rating: 5.0,
    reviews: 156,
    city: 'Bodrum',
    features: ['Deri Koltuk', 'WiFi', 'Tablet', 'Premium Su'],
    instantBook: true,
    d2License: true,
    onTimeRate: 99,
  },
];

interface Filters {
  city: string;
  vehicleType: string;
  capacity: number;
  priceMin: number;
  priceMax: number;
  instantBook: boolean;
  d2License: boolean;
}

const TransfersPage: React.FC = () => {
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    dateTime: '',
    passengers: '1',
    vehicleType: 'economy-sedan'
  });
  const [filters, setFilters] = useState<Filters>({
    city: 'Tümü',
    vehicleType: 'all',
    capacity: 0,
    priceMin: 0,
    priceMax: 2000,
    instantBook: false,
    d2License: false,
  });

  const handleSearch = () => {
    // Update filters based on search form
    const newFilters = { ...filters };

    if (searchForm.vehicleType && searchForm.vehicleType !== 'all') {
      newFilters.vehicleType = searchForm.vehicleType;
    }

    // Map passengers to capacity
    const passengersMap: { [key: string]: number } = {
      '1': 1,
      '2': 2,
      '3': 3,
      '4-7': 4,
      '8-14': 8,
      '15+': 15
    };

    if (searchForm.passengers && passengersMap[searchForm.passengers]) {
      newFilters.capacity = passengersMap[searchForm.passengers];
    }

    setFilters(newFilters);
    setShowFilters(true);
  };

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

  const filteredTransfers = useMemo(() => {
    return MOCK_TRANSFERS.filter(transfer => {
      if (filters.city !== 'Tümü' && transfer.city !== filters.city) return false;
      if (filters.vehicleType !== 'all' && transfer.vehicleType !== filters.vehicleType) return false;
      if (filters.capacity > 0 && transfer.capacity < filters.capacity) return false;
      if (transfer.price < filters.priceMin || transfer.price > filters.priceMax) return false;
      if (filters.instantBook && !transfer.instantBook) return false;
      if (filters.d2License && !transfer.d2License) return false;
      if (searchQuery && !transfer.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [filters, searchQuery]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Transfer Hizmetleri', url: '/transfers' }
  ]);

  return (
    <>
      <NextSeo
        {...TRANSFERS_SEO}
      />

      <Head>
        <title>{TRANSFERS_SEO.title}</title>

        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(TRANSFER_SERVICE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(TRANSFER_FAQ_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <SimpleNavigationHeader currentPage="transfers" />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section - Full Width Search */}
        <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Bus className="w-5 h-5" />
                <span className="text-sm font-medium">Transfer Hizmetleri</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Güvenli ve Konforlu
                <br />
                <span className="text-blue-200">Transfer Deneyimi</span>
              </h1>

              <p className="text-xl text-blue-50 mb-2 leading-relaxed max-w-3xl mx-auto">
                D2 belgeli transfer firmaları ile havaalanı, otel ve şehir içi transferleriniz güvende. 7/24 hizmet.
              </p>
            </motion.div>

            {/* Full Width Transfer Route Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <TransferRouteSelector
                from={searchForm.from}
                to={searchForm.to}
                dateTime={searchForm.dateTime}
                passengers={searchForm.passengers}
                vehicleType={searchForm.vehicleType}
                onFromChange={(value, location) => {
                  setSearchForm({ ...searchForm, from: value });
                }}
                onToChange={(value, location) => {
                  setSearchForm({ ...searchForm, to: value });
                }}
                onDateTimeChange={(value) => setSearchForm({ ...searchForm, dateTime: value })}
                onPassengersChange={(value) => setSearchForm({ ...searchForm, passengers: value })}
                onVehicleTypeChange={(value) => setSearchForm({ ...searchForm, vehicleType: value })}
                onSearch={handleSearch}
              />
            </motion.div>
          </div>
        </section>

        {/* Popüler Rotalar */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popüler Rotalar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {POPULAR_ROUTES.map((route) => (
                <div
                  key={route.id}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Plane className="w-4 h-4" />
                        <span>{route.from}</span>
                      </div>
                      <div className="flex items-center gap-2 my-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Hotel className="w-4 h-4" />
                        <span>{route.to}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{route.distance}</span>
                    <span>•</span>
                    <span>{route.duration}</span>
                    <span>•</span>
                    <span>{route.vehicles} araç</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-sm text-gray-500">Başlangıç</div>
                      <div className="text-2xl font-bold text-gray-900">₺{route.price}</div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Ara Bul
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transfer Listings - Results from search */}
        {filteredTransfers.length > 0 && (
          <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Mevcut Transferler ({filteredTransfers.length})
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  Filtrele
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredTransfers.map((transfer) => (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="relative h-48">
                      <img
                        src={transfer.image}
                        alt={transfer.vehicle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleFavorite(transfer.id)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.has(transfer.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                      {transfer.instantBook && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          Anında Rezervasyon
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{transfer.company}</h3>
                          <p className="text-sm text-gray-600">{transfer.vehicle}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{transfer.rating}</span>
                          <span className="text-sm text-gray-500">({transfer.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{transfer.capacity} kişi</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bus className="w-4 h-4" />
                          <span>{transfer.luggage} bavul</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {transfer.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-sm text-gray-500">Başlangıç</div>
                          <div className="text-2xl font-bold text-gray-900">₺{transfer.price}</div>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                          Rezervasyon
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default TransfersPage;
