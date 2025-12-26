import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { 
  Home, 
  Search, 
  MapPin, 
  Plane, 
  Hotel, 
  Camera,
  ArrowLeft,
  Compass,
  Star,
  TrendingUp,
  Heart,
  Sparkles,
  Globe
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
    rating: 4.8
  },
  {
    id: 2,
    name: 'Kapadokya',
    country: 'Türkiye', 
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&q=90',
    price: '₺2,200',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Antalya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90',
    price: '₺1,950',
    rating: 4.7
  }
];

const Custom404Page: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <title>{t('errors.404.title')} | Travel.LyDian</title>
        <meta name="description" content={t('errors.404.description')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800" style={{background: 'var(--bg-0)'}}>
        {/* Animated Neon Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(255, 33, 77, 0.3), rgba(255, 106, 69, 0.3))'}}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', background: 'radial-gradient(circle, rgba(255, 106, 69, 0.3), rgba(255, 8, 68, 0.3))'}}></div>
          {/* Neon grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255, 33, 77, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 33, 77, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Neon Header */}
          <header className="bg-black/90 backdrop-blur-md border-b border-red-500/30" style={{backgroundColor: 'rgba(10, 10, 11, 0.9)', borderColor: 'rgba(255, 33, 77, 0.3)'}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))'}}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold neon-text-strong" style={{color: 'var(--tx-1)', textShadow: '0 0 10px var(--ac-1), 0 0 20px var(--ac-1)'}}>
                    Travel.LyDian
                  </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/destinations" className="transition-colors" style={{color: 'var(--tx-2)'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--ac-1)'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--tx-2)'}>
                    Destinasyonlar
                  </Link>
                  <Link href="/hotels" className="transition-colors" style={{color: 'var(--tx-2)'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--ac-1)'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--tx-2)'}>
                    Oteller
                  </Link>
                  <Link href="/flights" className="transition-colors" style={{color: 'var(--tx-2)'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--ac-1)'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--tx-2)'}>
                    Uçak Biletleri
                  </Link>
                  <Link href="/activities" className="transition-colors" style={{color: 'var(--tx-2)'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--ac-1)'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--tx-2)'}>
                    Aktiviteler
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
                    <div className="text-9xl font-bold neon-text-strong" style={{
                      color: 'var(--tx-1)',
                      textShadow: '0 0 20px var(--ac-1), 0 0 40px var(--ac-1), 0 0 60px var(--ac-1), 0 0 80px var(--ac-1)'
                    }}>
                      404
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute -top-8 -right-8">
                        <Sparkles className="w-12 h-12" style={{color: 'var(--ac-2)', filter: 'drop-shadow(0 0 10px var(--ac-2))'}} />
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute -bottom-4 -left-8">
                        <Plane className="w-10 h-10" style={{color: 'var(--ac-1)', filter: 'drop-shadow(0 0 8px var(--ac-1))'}} />
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
                <h1 className="text-4xl md:text-5xl font-bold neon-text-strong mb-4" style={{
                  color: 'var(--tx-1)',
                  textShadow: '0 0 15px var(--ac-1)'
                }}>
                  {t('errors.404.title')}
                </h1>
                <p className="text-xl mb-6 max-w-2xl mx-auto" style={{color: 'var(--tx-2)'}}>
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
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'var(--tx-3)'}} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Aradığınız destinasyonu yazın..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl shadow-lg transition-all duration-300 text-lg border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        color: 'var(--tx-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 20px rgba(255, 33, 77, 0.3)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 30px rgba(255, 33, 77, 0.5), 0 0 10px var(--ac-1)';
                        e.target.style.borderColor = 'var(--ac-2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 20px rgba(255, 33, 77, 0.3)';
                        e.target.style.borderColor = 'var(--ac-1)';
                      }}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-xl font-medium transition-all duration-300 neon-glow"
                      style={{
                        background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                        color: 'white',
                        boxShadow: '0 0 20px var(--ac-1), 0 0 40px var(--ac-1)'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.boxShadow = '0 0 30px var(--ac-1), 0 0 60px var(--ac-1)';
                        (e.target as HTMLElement).style.transform = 'translateY(-50%) scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.boxShadow = '0 0 20px var(--ac-1), 0 0 40px var(--ac-1)';
                        (e.target as HTMLElement).style.transform = 'translateY(-50%) scale(1)';
                      }}
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
                  className="inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 neon-glow"
                  style={{
                    background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                    color: 'white',
                    boxShadow: '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.boxShadow = '0 0 35px var(--ac-1), 0 0 70px var(--ac-1)';
                    (e.target as HTMLElement).style.transform = 'scale(1.05) translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.boxShadow = '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)';
                    (e.target as HTMLElement).style.transform = 'scale(1) translateY(0px)';
                  }}
                >
                  <Home className="w-5 h-5 mr-2" />
                  {t('errors.404.backHome')}
                </Link>

                <button
                  onClick={handleGoBack}
                  className="inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border-2"
                  style={{
                    backgroundColor: 'var(--bg-1)',
                    color: 'var(--tx-1)',
                    borderColor: 'var(--ac-1)',
                    boxShadow: '0 0 15px rgba(255, 33, 77, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--ac-1)';
                    (e.target as HTMLElement).style.color = 'white';
                    (e.target as HTMLElement).style.boxShadow = '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)';
                    (e.target as HTMLElement).style.transform = 'scale(1.05) translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--bg-1)';
                    (e.target as HTMLElement).style.color = 'var(--tx-1)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 33, 77, 0.3)';
                    (e.target as HTMLElement).style.transform = 'scale(1) translateY(0px)';
                  }}
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
                <h2 className="text-2xl font-bold neon-text-strong mb-8 flex items-center justify-center" style={{
                  color: 'var(--tx-1)',
                  textShadow: '0 0 15px var(--ac-2)'
                }}>
                  <TrendingUp className="w-6 h-6 mr-2" style={{color: 'var(--ac-2)', filter: 'drop-shadow(0 0 8px var(--ac-2))'}} />
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
                        className="block rounded-2xl transition-all duration-300 overflow-hidden group border-2"
                        style={{
                          backgroundColor: 'var(--bg-1)',
                          borderColor: 'var(--ac-1)',
                          boxShadow: '0 0 20px rgba(255, 33, 77, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.boxShadow = '0 0 30px var(--ac-1), 0 0 60px var(--ac-1)';
                          (e.target as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
                          (e.target as HTMLElement).style.borderColor = 'var(--ac-2)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(255, 33, 77, 0.3)';
                          (e.target as HTMLElement).style.transform = 'translateY(0px) scale(1)';
                          (e.target as HTMLElement).style.borderColor = 'var(--ac-1)';
                        }}
                      >
                        <div className="relative h-48">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4 rounded-full px-3 py-1 flex items-center border" style={{
                            backgroundColor: 'rgba(10, 10, 11, 0.8)',
                            borderColor: 'var(--ac-2)',
                            backdropFilter: 'blur(10px)'
                          }}>
                            <Star className="w-4 h-4 fill-current mr-1" style={{color: 'var(--ac-2)'}} />
                            <span className="text-sm font-medium" style={{color: 'var(--tx-1)'}}>{destination.rating}</span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 neon-text-strong" style={{color: 'var(--tx-1)'}}>{destination.name}</h3>
                          <p className="mb-3" style={{color: 'var(--tx-2)'}}>{destination.country}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold" style={{color: 'var(--ac-1)', textShadow: '0 0 8px var(--ac-1)'}}>{destination.price}</span>
                            <span className="text-sm" style={{color: 'var(--tx-3)'}}>başlayan fiyatlarla</span>
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
                  { icon: Plane, label: 'Uçak Biletleri', href: '/flights' },
                  { icon: Camera, label: 'Aktiviteler', href: '/activities' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex flex-col items-center p-6 rounded-2xl transition-all duration-300 group border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 15px rgba(255, 33, 77, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.boxShadow = '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)';
                        (e.target as HTMLElement).style.transform = 'scale(1.05) translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 33, 77, 0.3)';
                        (e.target as HTMLElement).style.transform = 'scale(1) translateY(0px)';
                      }}
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 border" style={{
                        background: 'linear-gradient(135deg, rgba(255, 33, 77, 0.2), rgba(255, 106, 69, 0.2))',
                        borderColor: 'var(--ac-2)'
                      }}>
                        <Icon className="w-6 h-6" style={{color: 'var(--ac-1)', filter: 'drop-shadow(0 0 5px var(--ac-1))'}} />
                      </div>
                      <span className="text-sm font-medium transition-colors" style={{color: 'var(--tx-2)'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--ac-1)'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--tx-2)'}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
                </div>
              </motion.div>
            </div>
          </main>

          {/* Neon Footer */}
          <footer className="backdrop-blur-md border-t py-6" style={{
            backgroundColor: 'rgba(10, 10, 11, 0.9)',
            borderColor: 'rgba(255, 33, 77, 0.3)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p style={{color: 'var(--tx-2)'}}>&copy; 2025 Travel.LyDian. Tüm hakları saklıdır.</p>
                <p className="mt-1 text-sm" style={{
                  color: 'var(--ac-2)',
                  textShadow: '0 0 10px var(--ac-2)'
                }}>AI Destekli Seyahat Platformu</p>
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