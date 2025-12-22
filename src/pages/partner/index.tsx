import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  Car,
  Bus,
  Truck,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  Shield,
  Zap
} from 'lucide-react';

interface PartnerType {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  benefits: string[];
  avgIncome: string;
  dashboardUrl: string;
  loginUrl: string;
  registerUrl: string;
  color: string;
}

const partnerTypes: PartnerType[] = [
  {
    id: 'property',
    title: 'Konaklama Ortağı',
    icon: <Building2 className="h-12 w-12" />,
    description: 'Otel, apart, villa gibi konaklama tesislerinizi Ailydian platformunda listeleyin ve global pazara ulaşın.',
    features: [
      'Otomatik rezervasyon yönetimi',
      'Dinamik fiyatlandırma sistemi',
      'Çoklu dil desteği',
      'Online ödeme entegrasyonu',
      'Müşteri yorumları yönetimi',
      'Analitik raporlama'
    ],
    benefits: [
      '%0 komisyon ilk 3 ay',
      'Ücretsiz profesyonel fotoğraf çekimi',
      '24/7 teknik destek',
      'Pazarlama desteği'
    ],
    avgIncome: '₺25,000 - ₺85,000',
    dashboardUrl: '/owner',
    loginUrl: '/owner/auth/login',
    registerUrl: '/owner/auth/register',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'car-rental',
    title: 'Araç Kiralama Ortağı',
    icon: <Car className="h-12 w-12" />,
    description: 'Araç kiralama filosunuzu yönetin, rezervasyonları takip edin ve gelirinizi maksimize edin.',
    features: [
      'Filo yönetim sistemi',
      'Araç takip ve bakım takvimleri',
      'Esnek fiyatlandırma',
      'Sözleşme yönetimi',
      'Hasarsızlık takibi',
      'Müşteri değerlendirmeleri'
    ],
    benefits: [
      '%15 komisyon oranı',
      'Ücretsiz araç sigortası danışmanlığı',
      'Öncelikli müşteri listesi',
      'Seasonal kampanya desteği'
    ],
    avgIncome: '₺18,000 - ₺65,000',
    dashboardUrl: '/vehicle-owner',
    loginUrl: '/vehicle-owner/auth/login',
    registerUrl: '/vehicle-owner/auth/register',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'transfer',
    title: 'Transfer Hizmeti Ortağı',
    icon: <Bus className="h-12 w-12" />,
    description: 'Havalimanı transferi ve şehir içi transfer hizmetlerinizi sunun, kazancınızı artırın.',
    features: [
      'Rota optimizasyonu',
      'Sürücü yönetimi',
      'Anlık rezervasyon bildirimleri',
      'GPS takip entegrasyonu',
      'Müşteri iletişim paneli',
      'Gelir-gider takibi'
    ],
    benefits: [
      '%12 komisyon oranı',
      'Garantili günlük transfer',
      'Yakıt tasarrufu önerileri',
      'VIP müşteri transferleri'
    ],
    avgIncome: '₺15,000 - ₺45,000',
    dashboardUrl: '/transfer-owner',
    loginUrl: '/transfer-owner/auth/login',
    registerUrl: '/transfer-owner/auth/register',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'vehicle',
    title: 'Araç Sahibi Ortağı',
    icon: <Truck className="h-12 w-12" />,
    description: 'Ticari aracınızı veya özel aracınızı kiraya verin, pasif gelir elde edin.',
    features: [
      'Araç doğrulama sistemi',
      'Sigorta paket seçenekleri',
      'Kullanılabilirlik takvimi',
      'Otomatik fiyat önerileri',
      'Bakım hatırlatıcıları',
      'Güvenli ödeme sistemi'
    ],
    benefits: [
      '%10 komisyon oranı',
      'İlk kiralamada %20 bonus',
      'Ücretsiz araç değerleme',
      'Comprehensive insurance options'
    ],
    avgIncome: '₺12,000 - ₺38,000',
    dashboardUrl: '/vehicle-owner',
    loginUrl: '/vehicle-owner/auth/login',
    registerUrl: '/vehicle-owner/auth/register',
    color: 'from-orange-500 to-red-500'
  }
];

const stats = [
  { label: 'Aktif Partner', value: '2,500+', icon: Users },
  { label: 'Aylık İşlem Hacmi', value: '₺45M+', icon: DollarSign },
  { label: 'Müşteri Memnuniyeti', value: '%98', icon: CheckCircle },
  { label: 'Ortalama Gelir Artışı', value: '%340', icon: TrendingUp }
];

const PartnerLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ailydian Partner Ekosistemi
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Türkiye'nin en büyük turizm platformunda işinizi büyütün.
              Konaklama, araç kiralama ve transfer hizmetlerinizi yönetin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#partner-types">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Partner Olmak İstiyorum
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
                </motion.button>
              </Link>
              <Link href="#benefits">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Avantajları Keşfet
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section id="partner-types" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Partnerlik Seçenekleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşletmenize en uygun partner tipini seçin ve kazanmaya başlayın
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${partner.color} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    {partner.icon}
                    <div>
                      <h3 className="text-2xl font-bold">{partner.title}</h3>
                      <p className="text-sm opacity-90">Aylık Ortalama Gelir: {partner.avgIncome}</p>
                    </div>
                  </div>
                  <p className="text-white/90">{partner.description}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Özellikler
                    </h4>
                    <ul className="space-y-2">
                      {partner.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      Avantajlar
                    </h4>
                    <ul className="space-y-2">
                      {partner.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link href={partner.registerUrl} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${partner.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all`}
                      >
                        Hemen Kayıt Ol
                      </motion.button>
                    </Link>
                    <Link href={partner.loginUrl}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all"
                      >
                        Giriş Yap
                      </motion.button>
                    </Link>
                  </div>

                  <Link href={partner.dashboardUrl}>
                    <div className="mt-3 text-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Dashboard Önizleme →
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Neden Ailydian Partner?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Türkiye'nin en gelişmiş turizm teknoloji platformunda işinizi büyütün
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl"
            >
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Gelişmiş Analitik
              </h3>
              <p className="text-gray-600">
                Gerçek zamanlı raporlar, müşteri analizleri ve gelir tahminleri ile işinizi optimize edin.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl"
            >
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Otomatik Yönetim
              </h3>
              <p className="text-gray-600">
                Rezervasyonlar, ödemeler ve müşteri iletişimini tek platformdan yönetin.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl"
            >
              <DollarSign className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Hızlı Ödemeler
              </h3>
              <p className="text-gray-600">
                Kazançlarınız 15 gün içinde otomatik olarak hesabınıza aktarılır.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Ailydian Partner programına katılın ve işinizi bir sonraki seviyeye taşıyın.
              Ücretsiz kayıt olun, 3 ay komisyonsuz kazanın!
            </p>
            <Link href="#partner-types">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                Ücretsiz Partner Ol
                <ArrowRight className="inline-block ml-2 h-6 w-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerLandingPage;
