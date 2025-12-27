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
import FuturisticHeader from '../../components/layout/FuturisticHeader';
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
import antalyaHotels from '../../data/antalya-hotels';

const PlacesToStayPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const currentLang = (i18n.language || 'tr') as 'tr' | 'en';

  // Real hotel data from database
  const lang = (currentLang === 'tr' || currentLang === 'en') ? currentLang : 'en';
  const accommodations = antalyaHotels.map(hotel => ({
    id: hotel.id,
    type: hotel.category,
    name: hotel.name[lang],
    description: hotel.description[lang],
    location: hotel.location.region + ', Antalya',
    rating: hotel.rating,
    reviews: hotel.reviewCount,
    price: hotel.pricing.perNight,
    image: hotel.images[0],
    features: hotel.amenities[lang].slice(0, 4)
  }));


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

      <FuturisticHeader />

      <main className="min-h-screen bg-white/5">
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
        <div className="bg-transparent border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-100">
              <Link href="/" className="hover:text-lydian-primary">
                {currentLang === 'tr' ? 'Ana Sayfa' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-lydian-primary">
                {currentLang === 'tr' ? 'Keşfet' : 'Explore'}
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">
                {currentLang === 'tr' ? 'Konaklama' : 'Places to Stay'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="bg-transparent border-b border-white/10">
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
                        : 'bg-white/10 text-gray-200 hover:bg-gray-200'
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
            <div className="text-gray-300">
              <span className="font-semibold text-white">{sortedAccommodations.length}</span>{' '}
              {currentLang === 'tr' ? 'konaklama bulundu' : 'accommodations found'}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 pr-10 border border-white/20 rounded-lg focus:ring-2 focus:ring-lydian-primary appearance-none bg-white/5"
                >
                  <option value="popular">{currentLang === 'tr' ? 'Popüler' : 'Popular'}</option>
                  <option value="rating">{currentLang === 'tr' ? 'En Yüksek Puan' : 'Highest Rated'}</option>
                  <option value="price-low">{currentLang === 'tr' ? 'Fiyat (Düşük-Yüksek)' : 'Price (Low-High)'}</option>
                  <option value="price-high">{currentLang === 'tr' ? 'Fiyat (Yüksek-Düşük)' : 'Price (High-Low)'}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-transparent border border-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-lydian-primary text-white' : 'text-gray-300'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-lydian-primary text-white' : 'text-gray-300'}`}
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
                className="bg-transparent rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <Link href={`/hotels/${accommodation.id}`}>
                  <div className="relative h-56">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-transparent px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-white">{accommodation.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{accommodation.name}</h3>
                    <div className="flex items-center gap-1 text-gray-300 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{accommodation.location}</span>
                    </div>
                    <p className="text-sm text-gray-100 mb-3 line-clamp-2">
                      {accommodation.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {accommodation.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 text-gray-200 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-end justify-between border-t border-gray-100 pt-3">
                      <div className="text-sm text-gray-100">
                        {accommodation.reviews} {currentLang === 'tr' ? 'değerlendirme' : 'reviews'}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-200">
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
