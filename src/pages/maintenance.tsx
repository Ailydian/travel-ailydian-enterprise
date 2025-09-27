import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { 
  Globe,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap,
  Cpu,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';

const MaintenancePage: React.FC = () => {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Simulate maintenance progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Bakım Modu | Travel.Ailydian</title>
        <meta name="description" content="Sistemlerimiz şu anda bakım altındadır. Kısa süre sonra tekrar hizmetinizdeyiz." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800" style={{background: 'var(--bg-0)'}}>
        {/* Animated Neon Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(255, 33, 77, 0.3), rgba(255, 106, 69, 0.3))'}}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', background: 'radial-gradient(circle, rgba(255, 106, 69, 0.3), rgba(255, 8, 68, 0.3))'}}></div>
          {/* Maintenance grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255, 33, 77, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 33, 77, 0.05) 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Neon Header */}
          <header className="backdrop-blur-md border-b" style={{
            backgroundColor: 'rgba(10, 10, 11, 0.9)',
            borderColor: 'rgba(255, 33, 77, 0.3)'
          }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse" style={{
                    background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                    boxShadow: '0 0 20px var(--ac-1)'
                  }}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold neon-text-strong" style={{
                    color: 'var(--tx-1)',
                    textShadow: '0 0 15px var(--ac-1), 0 0 30px var(--ac-1)'
                  }}>
                    Travel.Ailydian
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* Maintenance Illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-12 -right-12"
                  >
                    <Settings className="w-16 h-16" style={{color: 'var(--ac-2)', filter: 'drop-shadow(0 0 15px var(--ac-2))'}} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center border-4"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      borderColor: 'var(--ac-1)',
                      boxShadow: '0 0 30px var(--ac-1), inset 0 0 30px rgba(255, 33, 77, 0.1)'
                    }}
                  >
                    <Wrench className="w-16 h-16" style={{color: 'var(--ac-1)'}} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-8 -left-12"
                  >
                    <Zap className="w-12 h-12" style={{color: 'var(--ac-2)', filter: 'drop-shadow(0 0 10px var(--ac-2))'}} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Maintenance Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h1 className="text-5xl md:text-6xl font-bold neon-text-strong mb-6" style={{
                  color: 'var(--tx-1)',
                  textShadow: '0 0 20px var(--ac-1), 0 0 40px var(--ac-1)'
                }}>
                  Bakım Modu
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{
                  color: 'var(--ac-2)',
                  textShadow: '0 0 10px var(--ac-2)'
                }}>
                  Sistemlerimizi Geliştiriyoruz
                </h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto" style={{color: 'var(--tx-2)'}}>
                  Travel.Ailydian&apos;ı daha da iyi hale getirmek için kısa bir bakım çalışması yapıyoruz.
                  Size daha iyi hizmet verebilmek için sistemlerimizi güncelliyor ve optimize ediyoruz.
                </p>
                
                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{color: 'var(--tx-3)'}}>İlerleme</span>
                    <span className="text-sm font-medium" style={{color: 'var(--ac-1)'}}>{progress}%</span>
                  </div>
                  <div className="w-full rounded-full h-3 border-2" style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: 'var(--ac-1)'
                  }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, var(--ac-1), var(--ac-2))',
                        boxShadow: '0 0 10px var(--ac-1)',
                        width: `${progress}%`
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
                
                {/* Estimated Time */}
                <div className="flex items-center justify-center mb-8">
                  <Clock className="w-5 h-5 mr-2" style={{color: 'var(--ac-2)'}} />
                  <span className="text-lg font-medium" style={{color: 'var(--tx-2)'}}>
                    Tahmini Süre: 15-30 dakika
                  </span>
                </div>
              </motion.div>

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {[
                  { icon: Database, label: 'Veritabanı', status: 'maintenance', description: 'Optimizasyon yapılıyor' },
                  { icon: Cpu, label: 'Sunucular', status: 'active', description: 'Çalışıyor' },
                  { icon: Zap, label: 'API Servisleri', status: 'maintenance', description: 'Güncelleme yapılıyor' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="rounded-2xl p-6 border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: item.status === 'active' ? 'var(--ac-2)' : 'var(--ac-1)',
                        boxShadow: `0 0 20px ${item.status === 'active' ? 'rgba(255, 106, 69, 0.3)' : 'rgba(255, 33, 77, 0.3)'}`
                      }}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center border" style={{
                          backgroundColor: item.status === 'active' ? 'rgba(255, 106, 69, 0.2)' : 'rgba(255, 33, 77, 0.2)',
                          borderColor: item.status === 'active' ? 'var(--ac-2)' : 'var(--ac-1)'
                        }}>
                          <Icon className="w-6 h-6" style={{
                            color: item.status === 'active' ? 'var(--ac-2)' : 'var(--ac-1)',
                            filter: `drop-shadow(0 0 5px ${item.status === 'active' ? 'var(--ac-2)' : 'var(--ac-1)'})`
                          }} />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{color: 'var(--tx-1)'}}>{item.label}</h3>
                      <div className="flex items-center justify-center mb-2">
                        {item.status === 'active' ? (
                          <CheckCircle className="w-4 h-4 mr-2" style={{color: 'var(--ac-2)'}} />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-2" style={{color: 'var(--ac-1)'}} />
                        )}
                        <span className="text-sm font-medium" style={{
                          color: item.status === 'active' ? 'var(--ac-2)' : 'var(--ac-1)'
                        }}>
                          {item.status === 'active' ? 'Aktif' : 'Bakımda'}
                        </span>
                      </div>
                      <p className="text-sm" style={{color: 'var(--tx-3)'}}>{item.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="rounded-2xl p-6 max-w-2xl mx-auto border-2"
                style={{
                  backgroundColor: 'var(--bg-1)',
                  borderColor: 'var(--ac-1)',
                  boxShadow: '0 0 20px rgba(255, 33, 77, 0.3)'
                }}
              >
                <h3 className="text-xl font-bold mb-4" style={{color: 'var(--tx-1)'}}>
                  Acil Durumlar İçin İletişim
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="mailto:support@travel.ailydian.com"
                    className="flex items-center p-3 rounded-xl transition-all duration-300 border"
                    style={{
                      backgroundColor: 'rgba(255, 33, 77, 0.1)',
                      borderColor: 'var(--ac-1)',
                      color: 'var(--ac-1)'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'var(--ac-1)';
                      (e.target as HTMLElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 33, 77, 0.1)';
                      (e.target as HTMLElement).style.color = 'var(--ac-1)';
                    }}
                  >
                    <span className="text-sm font-medium">E-posta Destek</span>
                  </a>
                  <a
                    href="tel:+902125550123"
                    className="flex items-center p-3 rounded-xl transition-all duration-300 border"
                    style={{
                      backgroundColor: 'rgba(255, 106, 69, 0.1)',
                      borderColor: 'var(--ac-2)',
                      color: 'var(--ac-2)'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'var(--ac-2)';
                      (e.target as HTMLElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 106, 69, 0.1)';
                      (e.target as HTMLElement).style.color = 'var(--ac-2)';
                    }}
                  >
                    <span className="text-sm font-medium">Telefon Destek</span>
                  </a>
                </div>
                <p className="text-sm mt-4 text-center" style={{color: 'var(--tx-3)'}}>
                  Son güncelleme: {new Date().toLocaleString('tr-TR')}
                </p>
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
                <p style={{color: 'var(--tx-2)'}}>&copy; 2025 Travel.Ailydian. Tüm hakları saklıdır.</p>
                <p className="mt-1 text-sm" style={{
                  color: 'var(--ac-2)',
                  textShadow: '0 0 10px var(--ac-2)'
                }}>AI Destekli Seyahat Platformu - Bakım Modu</p>
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

export default MaintenancePage;