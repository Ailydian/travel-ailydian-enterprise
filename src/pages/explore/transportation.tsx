/**
 * Transportation - Transfers, Car Rentals, VIP Transport
 */
import React, { useState } from 'react';
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
  Clock } from 'lucide-react';
import { antalyaAirportTransfers } from '../../data/antalya-transfers';

const TransportationPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const currentLang = (i18n.language || 'tr') as 'tr' | 'en';
  const lang = currentLang === 'tr' || currentLang === 'en' ? currentLang : 'en';

  // Real transportation data from database (first 4 items as samples)
  const realTransfers = antalyaAirportTransfers.slice(0, 4).map((transfer) => ({
    id: transfer.id,
    type: transfer.category,
    name: transfer.from[lang] + ' - ' + transfer.to[lang],
    description: `${transfer.duration} dk, ${transfer.distance} km`,
    route: transfer.from[lang] + ' → ' + transfer.to[lang],
    capacity: '1-8',
    price: transfer.pricing.economySedan,
    image: transfer.category === 'airport' ?
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' :
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    features: [
    lang === 'tr' ? 'Profesyonel Şoför' : 'Professional Driver',
    lang === 'tr' ? 'Klimalı Araç' : 'Air Conditioned',
    lang === 'tr' ? '24/7 Destek' : '24/7 Support',
    lang === 'tr' ? 'WiFi' : 'WiFi'],

    rating: 4.8,
    reviews: 450 + Math.floor(Math.random() * 500)
  }));

  // Keep sample data for additional variety
  const sampleTransportations = [
  {
    id: 'airport-transfer-vip',
    type: 'airport',
    name: currentLang === 'tr' ? 'VIP Havalimanı Transferi' : 'VIP Airport Transfer',
    description: currentLang === 'tr' ?
    'Özel lüks araç ile havalimanı transferi' :
    'Private luxury vehicle airport transfer',
    route: currentLang === 'tr' ? 'Antalya Havalimanı - Lara' : 'Antalya Airport - Lara',
    capacity: '1-3',
    price: 350,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    features: [
    currentLang === 'tr' ? 'Lüks Araç' : 'Luxury Vehicle',
    currentLang === 'tr' ? 'Profesyonel Şoför' : 'Professional Driver',
    currentLang === 'tr' ? 'Su İkramı' : 'Water',
    currentLang === 'tr' ? 'WiFi' : 'WiFi'],

    rating: 4.9,
    reviews: 847
  },
  {
    id: 'car-rental-economy',
    type: 'car-rental',
    name: currentLang === 'tr' ? 'Ekonomik Araç Kiralama' : 'Economy Car Rental',
    description: currentLang === 'tr' ?
    'Günlük araç kiralama hizmeti' :
    'Daily car rental service',
    route: currentLang === 'tr' ? 'Antalya Şehir Merkezi' : 'Antalya City Center',
    capacity: '1-5',
    price: 450,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    features: [
    currentLang === 'tr' ? 'Klima' : 'AC',
    currentLang === 'tr' ? 'Tam Kasko' : 'Full Insurance',
    currentLang === 'tr' ? 'Sınırsız KM' : 'Unlimited KM',
    currentLang === 'tr' ? '24/7 Destek' : '24/7 Support'],

    rating: 4.7,
    reviews: 523
  },
  {
    id: 'city-transfer-belek',
    type: 'city',
    name: currentLang === 'tr' ? 'Belek Şehir Transferi' : 'Belek City Transfer',
    description: currentLang === 'tr' ?
    'Konforlu şehir içi transfer' :
    'Comfortable city transfer',
    route: currentLang === 'tr' ? 'Antalya - Belek' : 'Antalya - Belek',
    capacity: '1-6',
    price: 280,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: [
    currentLang === 'tr' ? 'Minivan' : 'Minivan',
    currentLang === 'tr' ? 'Bagaj Alanı' : 'Luggage Space',
    currentLang === 'tr' ? 'Klima' : 'AC',
    currentLang === 'tr' ? 'Sigorta' : 'Insurance'],

    rating: 4.6,
    reviews: 412
  },
  {
    id: 'vip-transport-luxury',
    type: 'vip',
    name: currentLang === 'tr' ? 'Lüks VIP Transfer' : 'Luxury VIP Transfer',
    description: currentLang === 'tr' ?
    'Mercedes S-Class ile özel transfer' :
    'Private transfer with Mercedes S-Class',
    route: currentLang === 'tr' ? 'Tüm Antalya' : 'All Antalya',
    capacity: '1-3',
    price: 650,
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80',
    features: [
    currentLang === 'tr' ? 'Mercedes S-Class' : 'Mercedes S-Class',
    currentLang === 'tr' ? 'Şampanya' : 'Champagne',
    currentLang === 'tr' ? 'Deri Koltuk' : 'Leather Seats',
    currentLang === 'tr' ? 'Premium Ses' : 'Premium Sound'],

    rating: 5.0,
    reviews: 234
  }];


  const categories = [
  { id: 'all', name: currentLang === 'tr' ? 'Tümü' : 'All', icon: Car },
  { id: 'airport', name: currentLang === 'tr' ? 'Havalimanı' : 'Airport', icon: Plane },
  { id: 'car-rental', name: currentLang === 'tr' ? 'Araç Kiralama' : 'Car Rentals', icon: Car },
  { id: 'city', name: currentLang === 'tr' ? 'Şehir İçi' : 'City', icon: Bus },
  { id: 'vip', name: currentLang === 'tr' ? 'VIP' : 'VIP', icon: Crown }];


  // Combine real and sample data
  const transportations = [...realTransfers, ...sampleTransportations];

  const filteredTransportations = selectedCategory === 'all' ?
  transportations :
  transportations.filter((t) => t.type === selectedCategory);

  const sortedTransportations = [...filteredTransportations].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <>
      <Head>
        <title>
          {currentLang === 'tr' ?
          'Ulaşım - Transfer ve Araç Kiralama | Travel LyDian' :
          'Transportation - Transfers and Car Rentals | Travel LyDian'}
        </title>
        <meta
          name="description"
          content={currentLang === 'tr' ?
          'Antalya havalimanı transferi, araç kiralama ve VIP ulaşım hizmetleri. Güvenli ve konforlu yolculuk.' :
          'Antalya airport transfers, car rentals and VIP transportation services. Safe and comfortable travel.'} />

        <meta
          name="keywords"
          content={currentLang === 'tr' ?
          'antalya transfer, havalimanı transferi, araç kiralama, vip transfer' :
          'antalya transfer, airport transfer, car rental, vip transfer'} />

      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-lydian-success to-lydian-success py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-black text-lydian-text-inverse mb-3">
              {currentLang === 'tr' ? 'Ulaşım Hizmetleri' : 'Transportation Services'}
            </h1>
            <p className="text-lydian-text-inverse/90 text-lg">
              {currentLang === 'tr' ?
              'Güvenli ve konforlu transfer, araç kiralama ve VIP ulaşım çözümleri' :
              'Safe and comfortable transfers, car rentals and VIP transportation solutions'}
            </p>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-lydian-bg-hover border-b border-lydian-border-light/10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-lydian-text-dim">
              <Link href="/" className="hover:text-lydian-primary">
                {currentLang === 'tr' ? 'Ana Sayfa' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-lydian-primary">
                {currentLang === 'tr' ? 'Keşfet' : 'Explore'}
              </Link>
              <span>/</span>
              <span className="text-lydian-text-inverse font-semibold">
                {currentLang === 'tr' ? 'Ulaşım' : 'Transportation'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="bg-lydian-bg-hover border-b border-lydian-border-light/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id ?
                    'bg-lydian-primary text-white' :
                    'bg-lydian-bg/10 text-gray-200 hover:bg-lydian-bg-surface-raised'}`
                    }>

                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>);

              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="text-lydian-text-dim">
              <span className="font-semibold text-lydian-text-inverse">{sortedTransportations.length}</span>{' '}
              {currentLang === 'tr' ? 'hizmet bulundu' : 'services found'}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 pr-10 border border-lydian-border-light rounded-lg focus:ring-2 focus:ring-lydian-primary appearance-none bg-lydian-glass-dark">

                  <option value="popular">{currentLang === 'tr' ? 'Popüler' : 'Popular'}</option>
                  <option value="rating">{currentLang === 'tr' ? 'En Yüksek Puan' : 'Highest Rated'}</option>
                  <option value="price-low">{currentLang === 'tr' ? 'Fiyat (Düşük-Yüksek)' : 'Price (Low-High)'}</option>
                  <option value="price-high">{currentLang === 'tr' ? 'Fiyat (Yüksek-Düşük)' : 'Price (High-Low)'}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lydian-text-muted pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-lydian-bg-hover border border-lydian-border-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-lydian-primary text-white' : 'text-lydian-text-dim'}`}>

                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-lydian-primary text-white' : 'text-lydian-text-dim'}`}>

                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Transportation Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedTransportations.map((transport) =>
            <motion.div
              key={transport.id}
              whileHover={{ y: -4 }}
              className="bg-lydian-bg-hover rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">

                <Link href={`/transfers/${transport.id}`}>
                  <div className="relative h-56">
                    <img
                    src={transport.image}
                    alt={transport.name}
                    className="w-full h-full object-cover" />

                    <div className="absolute top-3 right-3 bg-lydian-bg-hover px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lydian-text-inverse">{transport.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-lydian-bg/95 px-3 py-1 rounded-full text-sm font-semibold text-lydian-text-inverse flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{transport.capacity} {currentLang === 'tr' ? 'kişi' : 'people'}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{transport.name}</h3>
                    <div className="flex items-center gap-1 text-lydian-text-dim text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{transport.route}</span>
                    </div>
                    <p className="text-sm text-lydian-text-dim mb-3 line-clamp-2">
                      {transport.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {transport.features.map((feature, idx) =>
                    <span
                      key={idx}
                      className="text-xs bg-lydian-glass-dark-medium text-lydian-text-muted px-2 py-1 rounded">

                          {feature}
                        </span>
                    )}
                    </div>
                    <div className="flex items-end justify-between border-t border-lydian-border-light pt-3">
                      <div className="text-sm text-lydian-text-dim">
                        {transport.reviews} {currentLang === 'tr' ? 'değerlendirme' : 'reviews'}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-lydian-text-muted">
                          {currentLang === 'tr' ? 'Tek Yön' : 'One Way'}
                        </div>
                        <div className="text-2xl font-black text-lydian-primary">
                          ₺{transport.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <BookingFooter />
    </>);

};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common']))
    }
  };
};

export default TransportationPage;