/**
 * Places to Stay - Accommodation Listings Page
 * Hotels, Villas, Apartments, Boutique Hotels
 */
import React, { useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import BookingHeader from '../../components/layout/BookingHeader';
import BookingFooter from '../../components/layout/BookingFooter';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Grid,
  List,
  Star,
  MapPin,
  Users,
  Wifi,
  Coffee,
  Building,
  Home,
  Building2,
  Crown
} from 'lucide-react';

const PlacesToStayPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const currentLang = i18n.language || 'tr';

  // Sample accommodation data - replace with real data from database
  const accommodations = [
    {
      id: 'lara-luxury-resort',
      type: 'hotel',
      name: currentLang === 'tr' ? 'Lara Lüks Resort' : 'Lara Luxury Resort',
      description: currentLang === 'tr'
        ? 'Her Şey Dahil 5 yıldızlı resort'
        : 'All-Inclusive 5-star resort',
      location: currentLang === 'tr' ? 'Lara, Antalya' : 'Lara, Antalya',
      rating: 4.8,
      reviews: 1247,
      price: 3500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      features: [
        currentLang === 'tr' ? 'WiFi' : 'WiFi',
        currentLang === 'tr' ? 'Havuz' : 'Pool',
        currentLang === 'tr' ? 'Spa' : 'Spa',
        currentLang === 'tr' ? 'Restoran' : 'Restaurant'
      ]
    },
    {
      id: 'belek-villa',
      type: 'villa',
      name: currentLang === 'tr' ? 'Belek Özel Villa' : 'Belek Private Villa',
      description: currentLang === 'tr'
        ? 'Özel havuzlu lüks villa'
        : 'Luxury villa with private pool',
      location: currentLang === 'tr' ? 'Belek, Antalya' : 'Belek, Antalya',
      rating: 4.9,
      reviews: 523,
      price: 5000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      features: [
        currentLang === 'tr' ? 'Özel Havuz' : 'Private Pool',
        currentLang === 'tr' ? 'Bahçe' : 'Garden',
        currentLang === 'tr' ? 'BBQ' : 'BBQ',
        currentLang === 'tr' ? 'Mutfak' : 'Kitchen'
      ]
    },
    {
      id: 'kaleici-boutique',
      type: 'boutique',
      name: currentLang === 'tr' ? 'Kaleiçi Butik Otel' : 'Kaleici Boutique Hotel',
      description: currentLang === 'tr'
        ? 'Tarihi Kaleiçi\'nde butik otel'
        : 'Boutique hotel in historic Kaleici',
      location: currentLang === 'tr' ? 'Kaleiçi, Antalya' : 'Kaleici, Antalya',
      rating: 4.7,
      reviews: 842,
      price: 2200,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      features: [
        currentLang === 'tr' ? 'Kahvaltı' : 'Breakfast',
        currentLang === 'tr' ? 'Teras' : 'Terrace',
        currentLang === 'tr' ? 'WiFi' : 'WiFi',
        currentLang === 'tr' ? 'Klima' : 'AC'
      ]
    },
    {
      id: 'lara-sea-view',
      type: 'apartment',
      name: currentLang === 'tr' ? 'Lara Deniz Manzaralı Daire' : 'Lara Sea View Apartment',
      description: currentLang === 'tr'
        ? 'Panoramik deniz manzaralı daire'
        : 'Panoramic sea view apartment',
      location: currentLang === 'tr' ? 'Lara, Antalya' : 'Lara, Antalya',
      rating: 4.6,
      reviews: 315,
      price: 1800,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      features: [
        currentLang === 'tr' ? 'Deniz Manzarası' : 'Sea View',
        currentLang === 'tr' ? 'Balkon' : 'Balcony',
        currentLang === 'tr' ? 'Mutfak' : 'Kitchen',
        currentLang === 'tr' ? 'Otopark' : 'Parking'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: currentLang === 'tr' ? 'Tümü' : 'All', icon: Building },
    { id: 'hotel', name: currentLang === 'tr' ? 'Oteller' : 'Hotels', icon: Building },
    { id: 'villa', name: currentLang === 'tr' ? 'Villalar' : 'Villas', icon: Home },
    { id: 'apartment', name: currentLang === 'tr' ? 'Apartmanlar' : 'Apartments', icon: Building2 },
    { id: 'boutique', name: currentLang === 'tr' ? 'Butik Oteller' : 'Boutique Hotels', icon: Crown }
  ];

  const filteredAccommodations = selectedCategory === 'all'
    ? accommodations
    : accommodations.filter(a => a.type === selectedCategory);

  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <>
      <Head>
        <title>
          {currentLang === 'tr'
            ? 'Konaklama - Oteller, Villalar ve Daireler | Travel LyDian'
            : 'Places to Stay - Hotels, Villas and Apartments | Travel LyDian'}
        </title>
        <meta
          name="description"
          content={currentLang === 'tr'
            ? 'Antalya\'da oteller, villalar, butik oteller ve kiralık daireler. En iyi fiyat garantisi.'
            : 'Hotels, villas, boutique hotels and rental apartments in Antalya. Best price guarantee.'}
        />
        <meta
          name="keywords"
          content={currentLang === 'tr'
            ? 'antalya otel, antalya villa, lara otel, belek resort, butik otel'
            : 'antalya hotel, antalya villa, lara hotel, belek resort, boutique hotel'}
        />
      </Head>

      <BookingHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-black text-white mb-3">
              {currentLang === 'tr' ? 'Konaklama' : 'Places to Stay'}
            </h1>
            <p className="text-white/90 text-lg">
              {currentLang === 'tr'
                ? 'Oteller, villalar ve kiralık evler ile mükemmel tatilin keyfini çıkarın'
                : 'Enjoy the perfect vacation with hotels, villas and rental homes'}
            </p>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-lydian-primary">
                {currentLang === 'tr' ? 'Ana Sayfa' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-lydian-primary">
                {currentLang === 'tr' ? 'Keşfet' : 'Explore'}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">
                {currentLang === 'tr' ? 'Konaklama' : 'Places to Stay'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-lydian-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900">{sortedAccommodations.length}</span>{' '}
              {currentLang === 'tr' ? 'konaklama bulundu' : 'accommodations found'}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary appearance-none bg-white"
                >
                  <option value="popular">{currentLang === 'tr' ? 'Popüler' : 'Popular'}</option>
                  <option value="rating">{currentLang === 'tr' ? 'En Yüksek Puan' : 'Highest Rated'}</option>
                  <option value="price-low">{currentLang === 'tr' ? 'Fiyat (Düşük-Yüksek)' : 'Price (Low-High)'}</option>
                  <option value="price-high">{currentLang === 'tr' ? 'Fiyat (Yüksek-Düşük)' : 'Price (High-Low)'}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-lydian-primary text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-lydian-primary text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Accommodations Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedAccommodations.map((accommodation) => (
              <motion.div
                key={accommodation.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <Link href={`/hotels/${accommodation.id}`}>
                  <div className="relative h-56">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{accommodation.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{accommodation.name}</h3>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{accommodation.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {accommodation.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {accommodation.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-end justify-between border-t border-gray-100 pt-3">
                      <div className="text-sm text-gray-600">
                        {accommodation.reviews} {currentLang === 'tr' ? 'değerlendirme' : 'reviews'}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {currentLang === 'tr' ? 'Gecelik' : 'Per night'}
                        </div>
                        <div className="text-2xl font-black text-lydian-primary">
                          ₺{accommodation.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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

export default PlacesToStayPage;
