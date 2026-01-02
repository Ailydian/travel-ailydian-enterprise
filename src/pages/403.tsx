import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import {
  Home,
  Shield,
  Lock,
  ArrowLeft,
  Globe,
  AlertOctagon,
  Eye,
  UserX } from 'lucide-react';
import { motion } from 'framer-motion';

const Custom403Page: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <title>403 - Erişim Yasak | Holiday.AILYDIAN</title>
        <meta name="description" content="Bu sayfaya erişim yetkiniz bulunmamaktadır." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800" style={{ background: 'var(--bg-0)' }}>
        {/* Animated Neon Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(255, 33, 77, 0.3), rgba(255, 106, 69, 0.3))' }}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', background: 'radial-gradient(circle, rgba(255, 106, 69, 0.3), rgba(255, 8, 68, 0.3))' }}></div>
          {/* Neon grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255, 33, 77, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 33, 77, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Neon Header */}
          <header className="backdrop-blur-md border-b" style={{
            backgroundColor: 'rgba(10, 10, 11, 0.9)',
            borderColor: 'rgba(255, 33, 77, 0.3)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))'
                  }}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold neon-text-strong" style={{
                    color: 'var(--tx-1)',
                    textShadow: '0 0 10px var(--ac-1), 0 0 20px var(--ac-1)'
                  }}>
                    Holiday.AILYDIAN
                  </span>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* 403 Illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>

                <div className="relative inline-block">
                  <div className="text-9xl font-bold neon-text-strong" style={{
                    color: 'var(--tx-1)',
                    textShadow: '0 0 20px var(--ac-1), 0 0 40px var(--ac-1), 0 0 60px var(--ac-1), 0 0 80px var(--ac-1)'
                  }}>
                    403
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>

                    <div className="absolute -top-8 -right-8">
                      <Shield className="w-12 h-12" style={{ color: 'var(--ac-1)', filter: 'drop-shadow(0 0 15px var(--ac-1))' }} />
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>

                    <div className="absolute -bottom-4 -left-8">
                      <Lock className="w-10 h-10" style={{ color: 'var(--ac-2)', filter: 'drop-shadow(0 0 8px var(--ac-2))' }} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}>

                <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold neon-text-strong mb-4" style={{
                    color: 'var(--tx-1)',
                    textShadow: '0 0 15px var(--ac-1)'
                  }}>
                  Erişim Yasak
                </h1>
                <p className="text-xl mb-6 max-w-2xl mx-auto" style={{ color: 'var(--tx-2)' }}>
                  Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen giriş yapın veya yetki talep edin.
                </p>
                
                {/* Status Info */}
                <div className="rounded-2xl p-6 max-w-md mx-auto mb-8 border-2" style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: 'var(--ac-1)',
                    boxShadow: '0 0 20px rgba(255, 33, 77, 0.3)'
                  }}>
                  <div className="flex items-center justify-center mb-4">
                    <UserX className="w-8 h-8 mr-3" style={{ color: 'var(--ac-1)' }} />
                    <span className="text-lg font-semibold" style={{ color: 'var(--ac-1)' }}>Yetki Gerekli</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--tx-2)' }}>
                    Bu içeriği görüntülemek için özel yetkilere sahip olmanız gerekmektedir.
                  </p>
                </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                    href="/login"
                    className="inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 neon-glow"
                    style={{
                      background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                      color: 'white',
                      boxShadow: '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.boxShadow = '0 0 35px var(--ac-1), 0 0 70px var(--ac-1)';
                      target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.boxShadow = '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)';
                      target.style.transform = 'scale(1) translateY(0px)';
                    }}>

                  <Eye className="w-5 h-5 mr-2" />
                  Giriş Yap
                </Link>

                <Link
                    href="/"
                    className="inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border-2"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      color: 'var(--tx-1)',
                      borderColor: 'var(--ac-1)',
                      boxShadow: '0 0 15px rgba(255, 33, 77, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = 'var(--ac-1)';
                      target.style.color = 'white';
                      target.style.boxShadow = '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)';
                      target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = 'var(--bg-1)';
                      target.style.color = 'var(--tx-1)';
                      target.style.boxShadow = '0 0 15px rgba(255, 33, 77, 0.3)';
                      target.style.transform = 'scale(1) translateY(0px)';
                    }}>

                  <Home className="w-5 h-5 mr-2" />
                  Ana Sayfaya Dön
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
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = 'var(--ac-1)';
                      target.style.color = 'white';
                      target.style.boxShadow = '0 0 25px var(--ac-1), 0 0 50px var(--ac-1)';
                      target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = 'var(--bg-1)';
                      target.style.color = 'var(--tx-1)';
                      target.style.boxShadow = '0 0 15px rgba(255, 33, 77, 0.3)';
                      target.style.transform = 'scale(1) translateY(0px)';
                    }}>

                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Geri Dön
                </button>
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
                <p style={{ color: 'var(--tx-2)' }}>&copy; 2025 Holiday.AILYDIAN. Tüm hakları saklıdır.</p>
                <p className="mt-1 text-sm" style={{
                  color: 'var(--ac-2)',
                  textShadow: '0 0 10px var(--ac-2)'
                }}>AI Destekli Seyahat Platformu</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>);

};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common']))
    }
  };
};

export default Custom403Page;