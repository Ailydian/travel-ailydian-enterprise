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
        {/* Hero Section with Stats - Same as rentals page */}
        <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
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

                <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                  D2 belgeli transfer firmaları ile havaalanı, otel ve şehir içi transferleriniz güvende. 7/24 hizmet.
                </p>

                {/* Advanced Transfer Search Form */}
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* From Location */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Nereden
                      </label>
                      <input
                        type="text"
                        value={searchForm.from}
                        onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                        placeholder="İstanbul Havalimanı..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* To Location */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Nereye
                      </label>
                      <input
                        type="text"
                        value={searchForm.to}
                        onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                        placeholder="Taksim Meydanı..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Date & Time */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Tarih & Saat
                      </label>
                      <input
                        type="datetime-local"
                        value={searchForm.dateTime}
                        onChange={(e) => setSearchForm({ ...searchForm, dateTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Passengers */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Yolcu Sayısı
                      </label>
                      <select
                        value={searchForm.passengers}
                        onChange={(e) => setSearchForm({ ...searchForm, passengers: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1">1 Kişi</option>
                        <option value="2">2 Kişi</option>
                        <option value="3">3 Kişi</option>
                        <option value="4-7">4-7 Kişi</option>
                        <option value="8-14">8-14 Kişi</option>
                        <option value="15+">15+ Kişi (Grup)</option>
                      </select>
                    </div>

                    {/* Vehicle Type */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Car className="w-4 h-4 inline mr-1" />
                        Araç Tipi
                      </label>
                      <select
                        value={searchForm.vehicleType}
                        onChange={(e) => setSearchForm({ ...searchForm, vehicleType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="economy-sedan">Ekonomik Sedan</option>
                        <option value="vip-sedan">VIP Sedan</option>
                        <option value="minivan">Minivan (7 kişi)</option>
                        <option value="vip-minivan">VIP Minivan</option>
                        <option value="minibus">Minibüs (14 kişi)</option>
                        <option value="bus">Otobüs (30 kişi)</option>
                      </select>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                      <button
                        onClick={handleSearch}
                        className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                      >
                        <Search className="w-5 h-5" />
                        Transfer Ara
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <Bus className="w-8 h-8 text-blue-200 mb-3" />
                  <div className="text-3xl font-bold mb-1">128</div>
                  <div className="text-blue-100 text-sm">Toplam Filo</div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <TrendingUp className="w-8 h-8 text-blue-200 mb-3" />
                  <div className="text-3xl font-bold mb-1">₺210K+</div>
                  <div className="text-blue-100 text-sm">Aylık Gelir</div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <Clock className="w-8 h-8 text-blue-200 mb-3" />
                  <div className="text-3xl font-bold mb-1">96.8%</div>
                  <div className="text-blue-100 text-sm">Zamanında Teslimat</div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <Star className="w-8 h-8 text-blue-200 mb-3" />
                  <div className="text-3xl font-bold mb-1">4.9/5</div>
                  <div className="text-blue-100 text-sm">Memnuniyet</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Owner CTA Banner - Same as rentals */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 border-y border-blue-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Bus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    Transfer Filonuzu Kiraya Verin
                  </h3>
                  <p className="text-gray-600">
                    Profesyonel dashboard ile transfer araçlarınızı ve rotalarınızı yönetin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Ortalama Aylık Gelir</div>
                  <div className="text-2xl font-bold text-blue-600">₺12,000</div>
                </div>
                <Link href="/transfer-owner">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
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
                Neden Ailydian Transfer?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                Güvenli, konforlu ve zamanında transfer hizmetinin avantajları
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 p-8"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-2xl"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    D2 Belgeli Transfer Firmaları
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sadece yasal D2 belgeli transfer firmaları. Tüm sürücülerimiz SRC belgeli. Tam kapsamlı sigorta garantisi.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-blue-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>128 Doğrulanmış Filo</span>
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 w-32 h-32 bg-green-200 rounded-full opacity-40 blur-3xl"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    7/24 Hizmet & Zamanında Teslimat
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Havalimanı transferlerinde %96.8 zamanında teslimat oranı. Geciken uçuşlar için otomatik takip. 7/24 müşteri desteği.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <Users className="w-5 h-5" />
                    <span>7/24 Canlı Destek</span>
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
                    Sabit Fiyat Garantisi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Gizli ücret yok, trafik ücreti yok. Rezervasyonda gördüğünüz fiyat nihai fiyat. İstanbul Havalimanı transfer sadece ₺250'dan başlıyor.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-purple-600 font-semibold">
                    <TrendingUp className="w-5 h-5" />
                    <span>Sabit Fiyat</span>
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
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Rota Seçin</h4>
                  <p className="text-sm text-gray-600">Nereden nereye gitmek istediğinizi belirtin</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Araç Türü</h4>
                  <p className="text-sm text-gray-600">Ekonomik, VIP veya grup transfer seçin</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Anında Rezervasyon</h4>
                  <p className="text-sm text-gray-600">Onay SMS ve e-posta anında gelir</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    4
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Rahat Yolculuk</h4>
                  <p className="text-sm text-gray-600">Sürücünüz sizi zamanında karşılar</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* More sections continue... */}
        <section className="bg-white py-12">
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

        {/* Owner CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
                  <Bus className="w-8 h-8 text-blue-600" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Transfer Firmanızı Büyütün
                </h2>

                <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
                  1500+ transfer firması Ailydian platformu ile daha fazla müşteriye ulaşıyor.
                  Siz de transfer hizmetinizi listeleyerek gelirinizi artırın.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>%10-12 Komisyon</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>D2 Belge Desteği</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>Havalimanı İzinleri</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/transfer-owner/auth/register">
                    <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                      <span>Transfer Firmanızı Ekleyin</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>

                  <Link href="/transfer-owner/auth/login">
                    <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <span>Giriş Yap</span>
                    </button>
                  </Link>
                </div>

                <p className="text-sm text-blue-100 mt-6">
                  1500+ transfer firması bize güveniyor • 98% zamanında hizmet
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TransfersPage;
