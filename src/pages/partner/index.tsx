/**
 * AILYDIAN PARTNER PLATFORM
 * Premium Partner Registration & Information Page
 *
 * Inspired by: Booking.com Extranet, Airbnb Host Platform, Expedia Partner Central
 * Features: Premium design, comprehensive information, visual feast, conversion-optimized
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
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
  Zap,
  Star,
  Globe,
  Clock,
  Award,
  Target,
  Sparkles,
  ChevronRight,
  Play,
  Home,
  Phone,
  Mail,
  MessageCircle,
  Lock,
  Wallet,
  TrendingDown,
  ArrowUpRight,
  Check,
  X,
  ChevronDown,
  MapPin,
  Heart,
  Briefcase,
  Layers,
  Headphones
} from 'lucide-react';

interface PartnerType {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  commission: string;
  avgIncome: string;
  potentialIncome: string;
  dashboardUrl: string;
  loginUrl: string;
  registerUrl: string;
  image: string;
  stats: {
    partners: string;
    avgRating: string;
    avgBookings: string;
  };
}

const partnerTypes: PartnerType[] = [
  {
    id: 'property',
    title: 'Konaklama Ortağı',
    icon: Building2,
    gradient: 'from-blue-600 via-cyan-500 to-teal-500',
    description: 'Otelleri, apartları, villaları dünya pazarına açın',
    longDescription: 'Konaklama tesislerinizi global seyahat severlere ulaştırın. Profesyonel yönetim araçları ve AI destekli fiyatlandırma ile gelirinizi %300\'e kadar artırın. Booking.com, Airbnb ve Expedia standartlarında hizmet kalitesi.',
    features: [
      'AI Destekli Dinamik Fiyatlandırma',
      'Anlık Rezervasyon Yönetimi',
      'Çoklu Platform Entegrasyonu',
      'Profesyonel Fotoğraf Desteği',
      'Otomatik Ödeme Sistemi',
      'Yorum Yönetimi ve Yanıtlama',
      '30+ Dil Desteği',
      'Gelişmiş Analitik Dashboard',
      'Mobil Yönetim Uygulaması',
      'Kişiselleştirilmiş Pazarlama Kampanyaları',
      'Channel Manager Entegrasyonu',
      'Akıllı Takvim Senkronizasyonu'
    ],
    benefits: [
      '%0 Komisyon İlk 6 Ay',
      'Ücretsiz Profesyonel Fotoğraf Çekimi',
      '₺5,000 Hoşgeldin Bonusu',
      '24/7 Premium Destek Ekibi',
      'SEO Optimizasyonu',
      'Sosyal Medya Pazarlama Desteği'
    ],
    commission: '%8-12 (Sektörün En Düşüğü)',
    avgIncome: '₺35,000/ay',
    potentialIncome: '₺120,000/ay',
    dashboardUrl: '/owner',
    loginUrl: '/owner/auth/login',
    registerUrl: '/owner/auth/register',
    image: '🏨',
    stats: {
      partners: '2,847+',
      avgRating: '4.8/5',
      avgBookings: '156/ay'
    }
  },
  {
    id: 'car-rental',
    title: 'Araç Kiralama Ortağı',
    icon: Car,
    gradient: 'from-purple-600 via-pink-500 to-rose-500',
    description: 'Araç filonuzu akıllı sistemlerle yönetin',
    longDescription: 'Sixt, Enterprise ve Hertz standartlarında araç kiralama hizmeti sunun. Akıllı filo yönetimi, otomatik fiyatlama ve gelişmiş müşteri deneyimi ile kazancınızı maksimize edin.',
    features: [
      'Akıllı Filo Yönetim Sistemi',
      'Otomatik Fiyat Optimizasyonu',
      'GPS Takip ve Güzergah Analizi',
      'Dijital Sözleşme Yönetimi',
      'Hasar ve Bakım Takibi',
      'Müşteri Puanlama Sistemi',
      'Araç Müsaitlik Takvimi',
      'Sigortaİşlemleri Otomasyonu',
      'Finansal Raporlama Araçları',
      'Sadakat Programı Yönetimi',
      'Online Check-in/Check-out',
      'Mobil Uygulama Desteği'
    ],
    benefits: [
      '%10 Komisyon Oranı',
      'Ücretsiz Araç Sigortası Danışmanlığı',
      'Öncelikli Müşteri Yönlendirmesi',
      'Sezonluk Kampanya Desteği',
      'Dijital Marketing Araçları',
      'Partner Eğitim Programları'
    ],
    commission: '%10-15 (Rekabetçi)',
    avgIncome: '₺28,000/ay',
    potentialIncome: '₺95,000/ay',
    dashboardUrl: '/vehicle-owner',
    loginUrl: '/vehicle-owner/auth/login',
    registerUrl: '/vehicle-owner/auth/register',
    image: '🚗',
    stats: {
      partners: '1,456+',
      avgRating: '4.7/5',
      avgBookings: '89/ay'
    }
  },
  {
    id: 'transfer',
    title: 'Transfer Ortağı',
    icon: Bus,
    gradient: 'from-emerald-600 via-green-500 to-teal-500',
    description: 'Havalimanı ve VIP transfer hizmetleri',
    longDescription: 'Blacklane ve Uber standardında premium transfer hizmeti sunun. Akıllı rota optimizasyonu, anlık rezervasyon ve yüksek kazanç potansiyeli ile başarılı bir iş kurun.',
    features: [
      'Akıllı Rota Optimizasyonu',
      'Anlık Rezervasyon Bildirimleri',
      'Sürücü Performans Takibi',
      'GPS ve Trafik Entegrasyonu',
      'Çoklu Araç Yönetimi',
      'Müşteri İletişim Platformu',
      'Otomatik Fatura Sistemi',
      'Bahşiş Yönetimi',
      'Gelir-Gider Analizi',
      'Koltuk Doluluk Optimizasyonu',
      'VIP Müşteri Havuzu',
      'Kurumsal Anlaşma Desteği'
    ],
    benefits: [
      '%8 Komisyon Oranı',
      'Garantili Günlük Transfer',
      'Havalimanı Öncelik Sırası',
      'Ücretsiz CRM Sistemi',
      'Müşteri Sadakat Bonusu',
      'Premium İlan Desteği'
    ],
    commission: '%8-12 (En Avantajlı)',
    avgIncome: '₺22,000/ay',
    potentialIncome: '₺78,000/ay',
    dashboardUrl: '/transfer-owner',
    loginUrl: '/transfer-owner/auth/login',
    registerUrl: '/transfer-owner/auth/register',
    image: '🚐',
    stats: {
      partners: '1,023+',
      avgRating: '4.9/5',
      avgBookings: '234/ay'
    }
  },
  {
    id: 'commercial-vehicle',
    title: 'Ticari Araç Ortağı',
    icon: Truck,
    gradient: 'from-orange-600 via-amber-500 to-yellow-500',
    description: 'Minibüs, kamyonet ve özel araçlar',
    longDescription: 'Grup turları, kurumsal transferler ve özel etkinlikler için araç kiralama hizmeti verin. Yüksek kapasite, yüksek gelir potansiyeli. Minibüs, VIP araçlar, organizasyon araçları ile özel segment.',
    features: [
      'Grup Rezervasyon Yönetimi (8-50 kişi)',
      'Kurumsal Müşteri Paneli',
      'Etkinlik Takvimi Entegrasyonu',
      'Kapasite Planlaması ve Optimizasyon',
      'Çoklu Sürücü Yönetimi',
      'Özel Rota Oluşturma',
      'Konfor Paketleri Yönetimi (VIP, Standart)',
      'Catering ve İkram Entegrasyonu',
      'Müşteri Memnuniyet Anketleri',
      'B2B Anlaşma Modülleri',
      'Sezonluk Kampanya Araçları',
      'Fatura ve Ödeme Otomasyonu'
    ],
    benefits: [
      '%12 Komisyon Oranı (Ticari Özel)',
      'Kurumsal Müşteri Garantisi',
      'Yüksek Kapasite Bonusu',
      'Etkinlik Organizasyon Desteği',
      'Marketing ve Tanıtım',
      'Özel Fiyatlandırma Esnekliği'
    ],
    commission: '%12-18 (Premium Ticari)',
    avgIncome: '₺32,000/ay',
    potentialIncome: '₺110,000/ay',
    dashboardUrl: '/commercial-vehicle-owner',
    loginUrl: '/commercial-vehicle-owner/auth/login',
    registerUrl: '/commercial-vehicle-owner/auth/register',
    image: '🚌',
    stats: {
      partners: '567+',
      avgRating: '4.8/5',
      avgBookings: '67/ay'
    }
  }
];

const PartnerIndexPage = () => {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <Head>
        <title>Partner Olun - LyDian | Turizm Sektöründe Kazancınızı Artırın</title>
        <meta
          name="description"
          content="LyDian ile turizm sektöründe iş ortağımız olun. %0 komisyon, premium destek, AI destekli araçlar ile aylık 120.000 TL'ye kadar kazanç potansiyeli."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-6 z-50"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-lg border border-slate-200 rounded-full shadow-xl hover:shadow-2xl transition-all group"
            >
              <Home className="w-5 h-5 text-blue-600 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-slate-700">Anasayfa'ya Dön</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"
            />
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Türkiye'nin En Yenilikçi Partner Platformu</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
            >
              Turizm Gelirlerinizi
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                3X Artırın
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              AI destekli araçlar, %0 komisyon fırsatı ve 24/7 premium destek ile
              <span className="font-semibold text-blue-600"> 5,000+ partner</span> kazançlarını artırdı.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link href="#partner-types">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
                >
                  <span>Hemen Başla</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-slate-200 text-slate-700 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <Play className="w-5 h-5 text-blue-600" />
                <span>Nasıl Çalışır?</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { label: 'Aktif Partner', value: '5,893', icon: Users, color: 'blue' },
                { label: 'Aylık Rezervasyon', value: '45K+', icon: Calendar, color: 'purple' },
                { label: 'Ortalama Gelir', value: '₺32K', icon: DollarSign, color: 'emerald' },
                { label: 'Memnuniyet', value: '4.8/5', icon: Star, color: 'amber' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-100"
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600 mb-2 mx-auto`} />
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partner Types Section */}
        <section id="partner-types" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              >
                Hangi Kategoride <span className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] bg-clip-text text-transparent">Partner</span> Olmak İstersiniz?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600"
              >
                Size en uygun kategoriyi seçin ve hemen kazanmaya başlayın
              </motion.p>
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerTypes.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative bg-transparent rounded-3xl p-8 shadow-2xl border border-slate-100 hover:shadow-blue-500/20 transition-all overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${partner.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

                    {/* Icon & Title */}
                    <div className="relative flex items-start gap-4 mb-6">
                      <div className={`p-4 bg-gradient-to-br ${partner.gradient} rounded-2xl shadow-xl text-white`}>
                        <partner.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{partner.title}</h3>
                        <p className="text-slate-600">{partner.description}</p>
                      </div>
                      <div className="text-4xl">{partner.image}</div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{partner.stats.partners}</div>
                        <div className="text-xs text-slate-500">Partner</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600 flex items-center justify-center gap-1">
                          <Star className="w-5 h-5 fill-amber-600" />
                          {partner.stats.avgRating}
                        </div>
                        <div className="text-xs text-slate-500">Puan</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{partner.stats.avgBookings}</div>
                        <div className="text-xs text-slate-500">Rezervasyon</div>
                      </div>
                    </div>

                    {/* Income */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Ortalama Gelir</span>
                        <span className="text-2xl font-bold text-emerald-600">{partner.avgIncome}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Potansiyel Gelir</span>
                        <span className="text-xl font-bold text-purple-600">{partner.potentialIncome}</span>
                      </div>
                    </div>

                    {/* Commission */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                        <span className="text-sm font-semibold text-blue-900">Komisyon Oranı</span>
                        <span className="text-lg font-bold text-blue-600">{partner.commission}</span>
                      </div>
                    </div>

                    {/* Benefits Preview */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-slate-900 mb-3">Öne Çıkan Avantajlar</div>
                      <div className="space-y-2">
                        {partner.benefits.slice(0, 3).map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link href={partner.registerUrl} className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${partner.gradient} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                        >
                          <span>Başvuru Yap</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                      <button
                        onClick={() => setSelectedPartner(selectedPartner === partner.id ? null : partner.id)}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${selectedPartner === partner.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedPartner === partner.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-6 pt-6 border-t border-slate-200"
                        >
                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-slate-900 mb-3">Detaylı Açıklama</h4>
                            <p className="text-slate-600 leading-relaxed">{partner.longDescription}</p>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-slate-900 mb-3">Tüm Özellikler</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {partner.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-slate-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-3">Tüm Avantajlar</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {partner.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-slate-600">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 flex gap-3">
                            <Link href={partner.loginUrl} className="flex-1">
                              <button className="w-full px-6 py-3 bg-transparent border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 transition-all">
                                Giriş Yap
                              </button>
                            </Link>
                            <Link href={partner.dashboardUrl} className="flex-1">
                              <button className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all">
                                Dashboard
                              </button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why LyDian Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              >
                Neden <span className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] bg-clip-text text-transparent">LyDian</span>?
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'AI Destekli Araçlar',
                  description: 'Otomatik fiyatlama, talep tahmini ve akıllı pazarlama ile gelirinizi optimize edin.',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: Shield,
                  title: 'Güvenli Ödeme',
                  description: '256-bit SSL şifreleme ve anında ödeme transferi ile güvenle kazanın.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Globe,
                  title: 'Global Erişim',
                  description: '30+ ülke, 150+ şehir ve milyonlarca potansiyel müşteriye ulaşın.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: BarChart3,
                  title: 'Gelişmiş Analitik',
                  description: 'Gerçek zamanlı raporlar ve AI önerileri ile kararlarınızı veriye dayalı alın.',
                  color: 'from-emerald-500 to-teal-500'
                },
                {
                  icon: Award,
                  title: 'Partner Eğitimleri',
                  description: 'Ücretsiz sertifika programları ve sürekli gelişim desteği.',
                  color: 'from-red-500 to-rose-500'
                },
                {
                  icon: Headphones,
                  title: '24/7 Premium Destek',
                  description: 'Türkçe, İngilizce, Almanca ve Rusça destek ekibi her zaman yanınızda.',
                  color: 'from-indigo-500 to-violet-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-transparent rounded-2xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all"
                >
                  <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-2xl mb-4`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Hemen Başlayın, İlk 6 Ay %0 Komisyon!
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Başvurunuzu yapın, onay alın ve 24 saat içinde kazanmaya başlayın
                </p>
                <Link href="#partner-types">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-transparent text-blue-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all"
                  >
                    Partner Başvurusu Yap
                  </motion.button>
                </Link>
              </div>

              {/* Animated background elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Telefon</h3>
                <p className="text-slate-600">0850 XXX XX XX</p>
              </div>
              <div>
                <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">E-posta</h3>
                <p className="text-slate-600">partner@lydian.com</p>
              </div>
              <div>
                <MessageCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Canlı Destek</h3>
                <p className="text-slate-600">7/24 Online</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PartnerIndexPage;
