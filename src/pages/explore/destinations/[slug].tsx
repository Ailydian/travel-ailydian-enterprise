/**
 * Dynamic Destination Page - Enterprise-Grade
 * Multi-language, photo gallery, tabs, integrated tours & transfers
 */
import React, { useState, useMemo } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ModernHeader from '../../../components/layout/ModernHeader';
import BookingFooter from '../../../components/layout/BookingFooter';
import { destinations } from '../../../data/destinations';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Star,
  ThermometerSun,
  Calendar,
  TrendingUp,
  Hotel,
  Car,
  Map,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  ArrowRight,
  Plane,
  Train,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { ExploreCard } from '../../../components/explore/ExploreCard';
import antalyaTours from '../../../data/antalya-tours';
import { antalyaAirportTransfers } from '../../../data/antalya-transfers';

const DestinationPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { slug } = router.query;
  const currentLang = (i18n.language || 'tr') as 'tr' | 'en';

  const destination = destinations.find((d) => d.slug === slug);

  // State Management
  const [activeTab, setActiveTab] = useState<'overview' | 'things-to-do' | 'where-to-stay' | 'getting-around'>('overview');
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Destination not found</h1>
          <Link href="/explore" className="text-blue-400 hover:text-blue-300">
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const destData = destination.translations[currentLang];

  // Get destination-specific tours (filter by region)
  const destinationTours = useMemo(() => {
    // For Antalya, show all Antalya tours
    if (destination.id === 'antalya') {
      return antalyaTours.slice(0, 9);
    }
    // For other destinations, show sample tours
    return antalyaTours.slice(0, 6);
  }, [destination.id]);

  // Get destination-specific transfers
  const destinationTransfers = useMemo(() => {
    if (destination.id === 'antalya') {
      return antalyaAirportTransfers.slice(0, 6);
    }
    return [];
  }, [destination.id]);

  const tabs = [
    { id: 'overview' as const, label: currentLang === 'tr' ? 'Genel Bakış' : 'Overview', icon: Info },
    { id: 'things-to-do' as const, label: currentLang === 'tr' ? 'Yapılacaklar' : 'Things to Do', icon: TrendingUp },
    { id: 'where-to-stay' as const, label: currentLang === 'tr' ? 'Konaklama' : 'Where to Stay', icon: Hotel },
    { id: 'getting-around' as const, label: currentLang === 'tr' ? 'Ulaşım' : 'Getting Around', icon: Car },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.gallery.length) % destination.images.gallery.length);
  };

  return (
    <>
      <Head>
        <title>{destData.seo.metaTitle} | Travel LyDian</title>
        <meta name="description" content={destData.seo.metaDescription} />
        <meta name="keywords" content={destData.seo.keywords.join(', ')} />
        <meta property="og:title" content={destData.seo.metaTitle} />
        <meta property="og:description" content={destData.seo.metaDescription} />
        <meta property="og:image" content={destination.images.hero} />
        <meta property="og:type" content="website" />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section */}
        <div className="relative h-[600px] overflow-hidden">
          <img
            src={destination.images.hero}
            alt={destData.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Photo Gallery Trigger */}
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all"
          >
            <Camera className="w-5 h-5" />
            <span>{destination.images.gallery.length} {currentLang === 'tr' ? 'Fotoğraf' : 'Photos'}</span>
          </button>

          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-end pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white w-full"
            >
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm mb-4 text-white/80">
                <Link href="/" className="hover:text-white transition-colors">
                  {currentLang === 'tr' ? 'Ana Sayfa' : 'Home'}
                </Link>
                <span>/</span>
                <Link href="/explore" className="hover:text-white transition-colors">
                  {currentLang === 'tr' ? 'Keşfet' : 'Explore'}
                </Link>
                <span>/</span>
                <Link href="/explore#destinations" className="hover:text-white transition-colors">
                  {currentLang === 'tr' ? 'Destinasyonlar' : 'Destinations'}
                </Link>
                <span>/</span>
                <span className="text-white font-semibold">{destData.name}</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-7 h-7 text-blue-400" />
                <span className="text-xl">{destination.region}</span>
              </div>
              <h1 className="text-6xl sm:text-7xl font-black mb-4">{destData.name}</h1>
              <p className="text-2xl sm:text-3xl text-white/90 mb-8 max-w-3xl">{destData.tagline}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-1">{currentLang === 'tr' ? 'Turlar' : 'Tours'}</div>
                  <div className="text-3xl font-black">{destination.stats.tours}+</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-1">{currentLang === 'tr' ? 'Oteller' : 'Hotels'}</div>
                  <div className="text-3xl font-black">{destination.stats.hotels}+</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-1">{currentLang === 'tr' ? 'Restoranlar' : 'Restaurants'}</div>
                  <div className="text-3xl font-black">{destination.stats.restaurants}+</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-1">{currentLang === 'tr' ? 'Cazibeler' : 'Attractions'}</div>
                  <div className="text-3xl font-black">{destination.stats.attractions}+</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
                      <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-7 h-7 text-yellow-400" />
                        {currentLang === 'tr' ? 'Genel Bakış' : 'Overview'}
                      </h2>
                      <p className="text-lg text-gray-300 leading-relaxed">{destData.overview}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-white mb-4">
                        {currentLang === 'tr' ? 'En İyi Seçenek' : 'Best For'}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {destData.bestFor.map((item, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full font-semibold border border-blue-500/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'things-to-do' && (
                  <motion.div
                    key="things-to-do"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-black text-white mb-6">{destData.thingsToDo.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destData.thingsToDo.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                              {item.name}
                            </h4>
                            <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'where-to-stay' && (
                  <motion.div
                    key="where-to-stay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-black text-white mb-6">{destData.whereToStay.title}</h2>
                    <div className="space-y-4">
                      {destData.whereToStay.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                              <Hotel className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-lg mb-2">{rec.split(':')[0]}</h4>
                              <p className="text-gray-400">{rec.split(':')[1]}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'getting-around' && (
                  <motion.div
                    key="getting-around"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-black text-white mb-6">{destData.howToGetAround.title}</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {destData.howToGetAround.options.map((option, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30">
                              <Navigation className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white text-lg mb-2">{option.mode}</h4>
                              <p className="text-gray-400">{option.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Local Tips */}
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 mt-8">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        {destData.localTips.title}
                      </h3>
                      <ul className="space-y-3">
                        {destData.localTips.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-yellow-400 mt-1 text-xl">•</span>
                            <span className="text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather Card */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <ThermometerSun className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">
                    {currentLang === 'tr' ? 'Hava Durumu' : 'Weather'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{currentLang === 'tr' ? 'Yaz' : 'Summer'}</span>
                    <span className="font-bold text-3xl text-orange-400">{destination.weather.avgTemp.summer}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{currentLang === 'tr' ? 'Kış' : 'Winter'}</span>
                    <span className="font-bold text-3xl text-blue-400">{destination.weather.avgTemp.winter}°C</span>
                  </div>
                </div>
              </div>

              {/* Best Months */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-bold text-white">
                    {currentLang === 'tr' ? 'En İyi Aylar' : 'Best Months'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.weather.bestMonths.map((month, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold border border-green-500/30"
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Attractions */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">
                    {currentLang === 'tr' ? 'Popüler Mekanlar' : 'Top Attractions'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {destination.topAttractions.map((attr, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="text-gray-300">{attr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map Preview */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">
                    {currentLang === 'tr' ? 'Konum' : 'Location'}
                  </h3>
                </div>
                <div className="bg-slate-800 rounded-lg h-48 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-blue-400" />
                </div>
                <div className="mt-3 text-sm text-gray-400">
                  {destination.coordinates.lat.toFixed(4)}°N, {destination.coordinates.lng.toFixed(4)}°E
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tours & Transfers Section */}
        {(destinationTours.length > 0 || destinationTransfers.length > 0) && (
          <section className="bg-slate-900/50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              {/* Tours */}
              {destinationTours.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-blue-400" />
                      <h2 className="text-4xl font-black text-white">
                        {currentLang === 'tr' ? 'Popüler Turlar' : 'Popular Tours'}
                      </h2>
                    </div>
                    <Link
                      href="/tours"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {currentLang === 'tr' ? 'Tümünü Gör' : 'View All'}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinationTours.map((tour) => (
                      <ExploreCard
                        key={tour.id}
                        id={tour.id}
                        title={tour.name}
                        image={tour.images[0]}
                        price={tour.pricing.travelLyDian}
                        rating={tour.rating}
                        reviewCount={tour.reviewCount}
                        location={tour.region}
                        duration={tour.duration}
                        category={tour.category}
                        href={`/tours/${tour.slug}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Transfers */}
              {destinationTransfers.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Car className="w-8 h-8 text-purple-400" />
                      <h2 className="text-4xl font-black text-white">
                        {currentLang === 'tr' ? 'Transfer Hizmetleri' : 'Transfer Services'}
                      </h2>
                    </div>
                    <Link
                      href="/explore/transportation"
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {currentLang === 'tr' ? 'Tümünü Gör' : 'View All'}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinationTransfers.map((transfer) => (
                      <div
                        key={transfer.id}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-purple-500/20 p-2 rounded-lg">
                            <Plane className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{transfer.from[currentLang]}</h3>
                            <div className="text-sm text-gray-400">→ {transfer.to[currentLang]}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <div className="text-sm text-gray-400">
                            {transfer.duration} {currentLang === 'tr' ? 'dk' : 'min'}
                          </div>
                          <div className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₺{transfer.pricing.economySedan}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Photo Gallery Modal */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setShowGallery(false)}
            >
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <img
                    src={destination.images.gallery[currentImageIndex]}
                    alt={`${destData.name} - ${currentImageIndex + 1}`}
                    className="w-full h-[600px] object-cover rounded-2xl"
                  />

                  {/* Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-xl rounded-full hover:bg-white/30 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-xl rounded-full hover:bg-white/30 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  {/* Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white font-semibold">
                    {currentImageIndex + 1} / {destination.images.gallery.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                  {destination.images.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-500'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BookingFooter />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = destinations.flatMap((dest) =>
    ['tr', 'en', 'de', 'ru', 'ar', 'fa', 'fr', 'el'].map((locale) => ({
      params: { slug: dest.slug },
      locale,
    }))
  );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default DestinationPage;
