import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import * as Sentry from '@sentry/nextjs';
import {
  Home,
  Search,
  MapPin,
  Plane,
  Hotel,
  Camera,
  ArrowLeft,
  Star,
  TrendingUp,
  Sparkles,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Popüler destinasyon önerileri
const popularDestinations = [
  {
    id: 1,
    name: 'İstanbul',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&q=90',
    price: '₺2,850',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Kapadokya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&q=90',
    price: '₺2,200',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Antalya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90',
    price: '₺1,950',
    rating: 4.7,
  },
];

const Custom404Page: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Report 404 error to Sentry for monitoring missing pages
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureMessage('404 Page Not Found', {
        level: 'warning',
        tags: {
          page: '404',
          type: 'not-found',
        },
        contexts: {
          page: {
            requestedUrl: router.asPath,
            pathname: router.pathname,
          },
        },
      });
    }
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{t('errors.404.title')} | Holiday.AILYDIAN</title>
        <meta name="description" content={t('errors.404.description')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Animated Lydian Background Elements - BLUE/PURPLE ONLY */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          {/* Lydian grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Lydian Header */}
          <header className="bg-black/90 backdrop-blur-md border-b border-blue-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ textShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6' }}
                  >
                    Holiday.AILYDIAN
                  </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                  <Link
                    href="/destinations"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Destinasyonlar
                  </Link>
                  <Link
                    href="/hotels"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Oteller
                  </Link>
                  <Link
                    href="/tours"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Turlar
                  </Link>
                  <Link
                    href="/car-rentals"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Araç Kiralama
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* 404 Illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <div className="relative inline-block">
                    <div
                      className="text-9xl font-bold text-white"
                      style={{
                        textShadow:
                          '0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 60px #3b82f6, 0 0 80px #3b82f6',
                      }}
                    >
                      404
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="absolute -top-8 -right-8">
                        <Sparkles
                          className="w-12 h-12 text-purple-500"
                          style={{ filter: 'drop-shadow(0 0 10px #8b5cf6)' }}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="absolute -bottom-4 -left-8">
                        <Plane
                          className="w-10 h-10 text-blue-500"
                          style={{ filter: 'drop-shadow(0 0 8px #3b82f6)' }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8">
                  <h1
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                    style={{ textShadow: '0 0 15px #3b82f6' }}
                  >
                    {t('errors.404.title')}
                  </h1>
                  <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                    {t('errors.404.description')}
                  </p>
                </div>
              </motion.div>

              {/* Search Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="mb-12">
                  <form onSubmit={handleSearch} className="max-w-md mx-auto">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Aradığınız destinasyonu yazın..."
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border-2 border-blue-500/50 text-white rounded-2xl shadow-lg transition-all duration-300 text-lg placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-2xl focus:shadow-blue-500/50"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                      >
                        Ara
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                  <Link
                    href="/"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    {t('errors.404.backHome')}
                  </Link>

                  <button
                    onClick={handleGoBack}
                    className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-blue-500/50 text-white rounded-2xl font-semibold transition-all duration-300 hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Geri Dön
                  </button>
                </div>
              </motion.div>

              {/* Popular Destinations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="mb-8">
                  <h2
                    className="text-2xl font-bold text-white mb-8 flex items-center justify-center"
                    style={{ textShadow: '0 0 15px #8b5cf6' }}
                  >
                    <TrendingUp
                      className="w-6 h-6 mr-2 text-purple-500"
                      style={{ filter: 'drop-shadow(0 0 8px #8b5cf6)' }}
                    />
                    Popüler Destinasyonlar
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {popularDestinations.map((destination, index) => (
                      <motion.div
                        key={destination.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                      >
                        <Link
                          href={`/destinations/${destination.name.toLowerCase()}`}
                          className="block bg-white/10 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl transition-all duration-300 overflow-hidden group hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 hover:border-purple-500"
                        >
                          <div className="relative h-48">
                            <img
                              src={destination.image}
                              alt={destination.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-purple-500/50 rounded-full px-3 py-1 flex items-center">
                              <Star className="w-4 h-4 text-purple-400 fill-current mr-1" />
                              <span className="text-sm font-medium text-white">
                                {destination.rating}
                              </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {destination.name}
                            </h3>
                            <p className="text-gray-300 mb-3">{destination.country}</p>
                            <div className="flex items-center justify-between">
                              <span
                                className="text-2xl font-bold text-blue-400"
                                style={{ textShadow: '0 0 8px #3b82f6' }}
                              >
                                {destination.price}
                              </span>
                              <span className="text-sm text-gray-400">başlayan fiyatlarla</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {[
                    { icon: MapPin, label: 'Destinasyonlar', href: '/destinations' },
                    { icon: Hotel, label: 'Oteller', href: '/hotels' },
                    { icon: Plane, label: 'Turlar', href: '/tours' },
                    { icon: Camera, label: 'Transferler', href: '/transfers' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-purple-500/50 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                          <Icon
                            className="w-6 h-6 text-blue-400"
                            style={{ filter: 'drop-shadow(0 0 5px #3b82f6)' }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </main>

          {/* Lydian Footer */}
          <footer className="bg-black/90 backdrop-blur-md border-t border-blue-500/30 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-gray-300">&copy; 2025 Holiday.AILYDIAN. Tüm hakları saklıdır.</p>
                <p
                  className="mt-1 text-sm text-purple-400"
                  style={{ textShadow: '0 0 10px #8b5cf6' }}
                >
                  AI Destekli Seyahat Platformu
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
};

export default Custom404Page;
