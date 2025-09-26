import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { 
  Home, 
  RefreshCw, 
  AlertTriangle, 
  Mail, 
  Phone,
  ArrowLeft,
  Globe,
  Settings,
  Wrench,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const Custom500Page: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
        <title>{t('errors.500.title')} | Travel.Ailydian</title>
        <meta name="description" content={t('errors.500.description')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800" style={{background: 'var(--bg-0)'}}>
        {/* Animated Neon Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(255, 33, 77, 0.4), rgba(255, 106, 69, 0.4))'}}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s', background: 'radial-gradient(circle, rgba(255, 106, 69, 0.4), rgba(255, 8, 68, 0.4))'}}></div>
          {/* Emergency neon grid overlay */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'linear-gradient(rgba(255, 33, 77, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 33, 77, 0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Neon Emergency Header */}
          <header className="backdrop-blur-md border-b" style={{
            backgroundColor: 'rgba(10, 10, 11, 0.9)',
            borderColor: 'rgba(255, 33, 77, 0.4)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                    boxShadow: '0 0 15px var(--ac-1)'
                  }}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold neon-text-strong" style={{
                    color: 'var(--tx-1)',
                    textShadow: '0 0 15px var(--ac-1), 0 0 30px var(--ac-1)'
                  }}>
                    Travel.Ailydian
                  </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/destinations" className="text-gray-700 hover:text-red-600 transition-colors">
                    Destinasyonlar
                  </Link>
                  <Link href="/hotels" className="text-gray-700 hover:text-red-600 transition-colors">
                    Oteller
                  </Link>
                  <Link href="/flights" className="text-gray-700 hover:text-red-600 transition-colors">
                    Uçak Biletleri
                  </Link>
                  <Link href="/activities" className="text-gray-700 hover:text-red-600 transition-colors">
                    Aktiviteler
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* 500 Illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <div className="text-9xl font-bold neon-text-strong" style={{
                    color: 'var(--tx-1)',
                    textShadow: '0 0 25px var(--ac-1), 0 0 50px var(--ac-1), 0 0 75px var(--ac-1), 0 0 100px var(--ac-1)'
                  }}>
                    500
                  </div>
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-8 -right-8"
                  >
                    <AlertTriangle className="w-12 h-12" style={{color: 'var(--ac-1)', filter: 'drop-shadow(0 0 15px var(--ac-1))'}} />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-8"
                  >
                    <Settings className="w-10 h-10" style={{color: 'var(--ac-2)', filter: 'drop-shadow(0 0 10px var(--ac-2))'}} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {t('errors.500.title')}
                </h1>
                <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                  {t('errors.500.description')}
                </p>
                
                {/* Status Info */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Wrench className="w-8 h-8 text-red-600 mr-3" />
                    <span className="text-lg font-semibold text-red-800">Teknik Bakım</span>
                  </div>
                  <p className="text-red-700 text-sm">
                    Sunucularımız şu anda bakım altında. Lütfen birkaç dakika sonra tekrar deneyin.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold ${
                    isRetrying ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isRetrying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <RefreshCw className="w-5 h-5 mr-2" />
                  )}
                  {isRetrying ? 'Yenileniyor...' : t('errors.500.retry')}
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Ana Sayfaya Dön
                </Link>

                <button
                  onClick={handleGoBack}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Geri Dön
                </button>
              </motion.div>

              {/* Support Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                  <Clock className="w-6 h-6 mr-2 text-red-600" />
                  Acil Durum İletişim
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">E-posta Destek</h3>
                        <p className="text-gray-600 text-sm">Teknik sorunlar için</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:support@travel.ailydian.com"
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      support@travel.ailydian.com
                    </a>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">Telefon Destek</h3>
                        <p className="text-gray-600 text-sm">7/24 acil destek</p>
                      </div>
                    </div>
                    <a 
                      href="tel:+902125550123"
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      +90 212 555 01 23
                    </a>
                  </div>
                </div>

                {/* Status Updates */}
                <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Sistem Durumu</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rezervasyon Sistemi</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1 animate-pulse"></div>
                        Bakım
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Ödeme Sistemi</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Aktif
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AI Asistan</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Aktif
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  Tahmini çözüm süresi: 15-30 dakika<br />
                  Son güncelleme: {new Date().toLocaleString('tr-TR')}
                </p>
              </motion.div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2025 Travel.Ailydian. Tüm hakları saklıdır.</p>
                <p className="mt-1 text-sm">AI Destekli Seyahat Platformu</p>
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

export default Custom500Page;