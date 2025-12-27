/**
 * Partner Program Page - Travel.LyDian.com
 * Neo-Glass Design System - Enterprise Partner Recruitment
 *
 * Features:
 * - Cosmic gradient hero with NeoHero
 * - FuturisticCard for all benefit sections
 * - Glassmorphism form with FuturisticInput
 * - Animated stats badges
 * - Real-time booking metrics
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { NeoHero, FuturisticCard, FuturisticButton, NeoSection, FuturisticInput } from '../components/neo-glass';
import logger from '../lib/logger';
import {
  UserPlus,
  TrendingUp,
  Users,
  Globe,
  Award,
  DollarSign,
  BarChart3,
  Headphones,
  Zap,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Hotel,
  Car,
  Bus,
  Compass,
  Home,
  Building2,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Target,
  Clock,
  CreditCard,
  Smartphone,
  Database,
  Lock,
  TrendingDown,
  Rocket
} from 'lucide-react';

// Partner Type Definitions with Neo-Glass styling
const partnerTypes = [
  {
    icon: Hotel,
    title: 'Otel & Konaklama',
    description: 'Otelinizi milyonlarca gezgine tanıtın',
    gradient: 'from-[#667EEA] to-[#00BAFF]',
    benefits: ['%15 komisyon', 'Anlık rezervasyon', '7/24 destek'],
    color: '#667EEA'
  },
  {
    icon: Compass,
    title: 'Tur Operatörleri',
    description: 'Turlarınızı global pazara açın',
    gradient: 'from-[#EC4899] to-[#FF9500]',
    benefits: ['%12 komisyon', 'Pazarlama desteği', 'Premium görünürlük'],
    color: '#EC4899'
  },
  {
    icon: Car,
    title: 'Araç Kiralama',
    description: 'Filonuzu maksimum dolulukla çalıştırın',
    gradient: 'from-[#FF9500] to-[#EC4899]',
    benefits: ['%10 komisyon', 'Anlık onay', 'Filo yönetimi'],
    color: '#FF9500'
  },
  {
    icon: Bus,
    title: 'Transfer Hizmetleri',
    description: 'Transfer ağınızı genişletin',
    gradient: 'from-[#00BAFF] to-[#667EEA]',
    benefits: ['%10 komisyon', 'Rota optimizasyonu', 'Mobil uygulama'],
    color: '#00BAFF'
  },
  {
    icon: Home,
    title: 'Kiralık Ev & Villa',
    description: 'Mülklerinizi daha fazla gezgine kiralayın',
    gradient: 'from-[#667EEA] to-[#EC4899]',
    benefits: ['%15 komisyon', 'Profesyonel fotoğraf', 'Temizlik desteği'],
    color: '#667EEA'
  },
  {
    icon: Building2,
    title: 'Seyahat Acenteleri',
    description: 'Ajansınızı dijitalleştirin',
    gradient: 'from-[#EC4899] to-[#00BAFF]',
    benefits: ['%8 komisyon', 'B2B panel', 'API entegrasyonu'],
    color: '#EC4899'
  }
];

// Benefits with Neo-Glass color palette
const benefits = [
  {
    icon: TrendingUp,
    title: 'Gelir Artışı',
    description: 'Ortalama %40 gelir artışı sağlayan partnerlerimiz',
    stat: '+40%',
    color: '#00BAFF',
    gradient: 'from-[#00BAFF] to-[#667EEA]'
  },
  {
    icon: Users,
    title: 'Geniş Müşteri Tabanı',
    description: 'Ayda 2M+ aktif kullanıcıya erişin',
    stat: '2M+',
    color: '#667EEA',
    gradient: 'from-[#667EEA] to-[#EC4899]'
  },
  {
    icon: Globe,
    title: 'Global Erişim',
    description: '180+ ülkeden rezervasyon alın',
    stat: '180+',
    color: '#FF9500',
    gradient: 'from-[#FF9500] to-[#00BAFF]'
  },
  {
    icon: Zap,
    title: 'Anlık Rezervasyon',
    description: 'Otomatik onay ve bildirim sistemi',
    stat: '24/7',
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#FF9500]'
  },
  {
    icon: BarChart3,
    title: 'Detaylı Raporlama',
    description: 'Gerçek zamanlı satış ve performans analizi',
    stat: 'Canlı',
    color: '#00BAFF',
    gradient: 'from-[#00BAFF] to-[#667EEA]'
  },
  {
    icon: Headphones,
    title: 'Özel Destek',
    description: 'Partnerlerimize özel 7/24 destek ekibi',
    stat: '7/24',
    color: '#667EEA',
    gradient: 'from-[#667EEA] to-[#00BAFF]'
  }
];

// Platform Features with icons
const platformFeatures = [
  {
    icon: Clock,
    title: 'Gerçek Zamanlı Rezervasyon',
    description: 'Anlık bildirimler, otomatik onay sistemi',
    color: '#00BAFF'
  },
  {
    icon: CreditCard,
    title: 'Otomatik Ödemeler',
    description: 'Haftalık otomatik ödeme transferleri',
    color: '#667EEA'
  },
  {
    icon: Smartphone,
    title: 'Mobil Partner Paneli',
    description: 'iOS ve Android uygulamaları',
    color: '#FF9500'
  },
  {
    icon: BarChart3,
    title: 'Gelişmiş Analitik',
    description: 'Detaylı raporlama ve istatistikler',
    color: '#EC4899'
  },
  {
    icon: Database,
    title: 'API Entegrasyonu',
    description: 'Kendi sisteminizle entegre edin',
    color: '#00BAFF'
  },
  {
    icon: Lock,
    title: 'Güvenli Altyapı',
    description: 'SSL şifreleme ve güvenli ödeme',
    color: '#667EEA'
  }
];

// Success Stories
const successStories = [
  {
    name: 'Antalya Premium Hotels',
    type: 'Otel Zinciri',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=600&h=400&fit=crop',
    quote: '6 ay içinde doluluk oranımız %35 arttı. LyDian ile çalışmak işimizi dönüştürdü.',
    increase: '+%35 Doluluk',
    stat: '12K+ Rezervasyon',
    gradient: 'from-[#667EEA]/20 to-[#00BAFF]/20'
  },
  {
    name: 'Aegean Tours & Travel',
    type: 'Tur Operatörü',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    quote: 'Platform sayesinde turlarımız artık dünya çapında satılıyor. Muhteşem bir deneyim!',
    increase: '+%120 Satış',
    stat: '8K+ Misafir',
    gradient: 'from-[#EC4899]/20 to-[#FF9500]/20'
  },
  {
    name: 'Mediterranean Car Rentals',
    type: 'Araç Kiralama',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
    quote: 'Filo kullanım oranımız maksimuma ulaştı. Her gün yeni rezervasyonlar geliyor.',
    increase: '+%85 Verimlilik',
    stat: '15K+ Kiralama',
    gradient: 'from-[#FF9500]/20 to-[#00BAFF]/20'
  }
];

export default function Partners() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnerType: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      logger.debug('Partner başvurusu:', { component: 'Partner', metadata: { formData } });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert('Başvurunuz alındı! En kısa sürede size dönüş yapacağız.');

      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        partnerType: '',
        city: '',
        message: ''
      });
    } catch (error) {
      logger.error('Partner form submission failed', { component: 'Partner', error });
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>İş Ortağımız Olun - Travel.LyDian Partner Programı | %40 Gelir Artışı</title>
        <meta name="description" content="Travel.LyDian ile iş ortağı olun. 2M+ kullanıcıya ulaşın, %40 gelir artışı sağlayın. Otel, tur, transfer ve araç kiralama hizmetleriniz için özel partner programı." />
        <meta name="keywords" content="turizm iş ortaklığı, otel partner programı, tur operatörü ortaklığı, araç kiralama partneri, transfer hizmeti ortaklığı" />
        <meta property="og:title" content="Travel.LyDian Partner Programı - İş Ortağımız Olun" />
        <meta property="og:description" content="2M+ aktif kullanıcıya ulaşın. %40 ortalama gelir artışı. 7/24 destek ve profesyonel altyapı." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=630&fit=crop" />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0f] to-gray-900">

        {/* HERO SECTION - Neo-Glass with Cosmic Gradient */}
        <NeoHero
          title="Travel.LyDian Partner Programı"
          subtitle="Türkiye'nin en hızlı büyüyen turizm platformunda yerinizi alın. 2M+ aktif kullanıcıya ulaşın, gelirinizi ortalama %40 artırın!"
          gradient="cosmic"
          height="70vh"
          overlayOpacity={0.2}
          showFloatingElements={true}
        >
          {/* Stats Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Users, text: '2M+ Kullanıcı', color: '#00BAFF' },
              { icon: TrendingUp, text: '%40 Gelir Artışı', color: '#667EEA' },
              { icon: Globe, text: '180+ Ülke', color: '#FF9500' },
              { icon: Award, text: '%95 Memnuniyet', color: '#EC4899' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 shadow-lg hover:bg-white/10 transition-all"
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className="text-white font-medium text-sm">{stat.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <FuturisticButton
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('basvuru')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Send className="w-5 h-5" />
              Hemen Başvur
              <ArrowRight className="w-5 h-5" />
            </FuturisticButton>
            <FuturisticButton
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('avantajlar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5" />
              Avantajları Keşfet
            </FuturisticButton>
          </div>
        </NeoHero>

        {/* PARTNER TYPES SECTION */}
        <NeoSection className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 mb-6">
                <Rocket className="w-5 h-5 text-[#FF9500]" />
                <span className="text-sm font-semibold text-gray-300">6 Farklı Partner Türü</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Hangi Alanda İş Ortağı Olabilirsiniz?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Turizm sektöründeki tüm hizmet sağlayıcılar için özel çözümler
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FuturisticCard
                      variant="glass"
                      hoverEffect="lift"
                      glowColor={type.color}
                      className="h-full"
                    >
                      <div className="p-8">
                        {/* Icon with gradient */}
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${type.gradient} mb-6 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">{type.title}</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">{type.description}</p>

                        {/* Benefits */}
                        <div className="space-y-3">
                          {type.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm text-gray-300 font-medium">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FuturisticCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </NeoSection>

        {/* BENEFITS SECTION */}
        <NeoSection id="avantajlar" className="py-20 bg-gradient-to-b from-transparent via-[#667EEA]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 mb-6">
                <Target className="w-5 h-5 text-[#00BAFF]" />
                <span className="text-sm font-semibold text-gray-300">Kanıtlanmış Sonuçlar</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Neden LyDian Partner Programı?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Sektörün en avantajlı partner programı ile işinizi büyütün
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FuturisticCard
                      variant="glass"
                      hoverEffect="glow"
                      glowColor={benefit.color}
                      className="h-full relative overflow-hidden"
                    >
                      {/* Background stat */}
                      <div className="absolute top-4 right-4 text-6xl font-black text-white/5">
                        {benefit.stat}
                      </div>

                      <div className="p-8 relative z-10">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{benefit.description}</p>

                        {/* Stat badge */}
                        <div className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                          <TrendingUp className="w-4 h-4 text-[#00BAFF]" />
                          <span className="text-sm font-bold text-white">{benefit.stat}</span>
                        </div>
                      </div>
                    </FuturisticCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </NeoSection>

        {/* PLATFORM FEATURES GRID */}
        <NeoSection className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 mb-6">
                <Zap className="w-5 h-5 text-[#FF9500]" />
                <span className="text-sm font-semibold text-gray-300">Premium Platform Özellikleri</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Partner Platformu Özellikleri
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                İhtiyacınız olan tüm araçlar tek platformda
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FuturisticCard
                      variant="glass"
                      hoverEffect="lift"
                      className="h-full text-center"
                    >
                      <div className="p-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                          <Icon className="w-8 h-8" style={{ color: feature.color }} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </FuturisticCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </NeoSection>

        {/* SUCCESS STORIES */}
        <NeoSection className="py-20 bg-gradient-to-b from-transparent via-[#EC4899]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 mb-6">
                <Award className="w-5 h-5 text-[#EC4899]" />
                <span className="text-sm font-semibold text-gray-300">Gerçek Sonuçlar</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Başarı Hikayeleri
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Partnerlerimizin gerçek deneyimleri ve sonuçları
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FuturisticCard
                    variant="glass"
                    hoverEffect="lift"
                    className="h-full overflow-hidden"
                  >
                    {/* Image with gradient overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${story.gradient} to-transparent`} />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{story.name}</h3>
                        <p className="text-sm text-white/80">{story.type}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-300 italic mb-6 leading-relaxed">"{story.quote}"</p>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-[#00BAFF]" />
                          <span className="font-bold text-white">{story.increase}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{story.stat}</div>
                      </div>
                    </div>
                  </FuturisticCard>
                </motion.div>
              ))}
            </div>
          </div>
        </NeoSection>

        {/* APPLICATION FORM */}
        <NeoSection id="basvuru" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 mb-6">
                <UserPlus className="w-5 h-5 text-[#667EEA]" />
                <span className="text-sm font-semibold text-gray-300">Hemen Başlayın</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Partner Başvurusu
              </h2>
              <p className="text-xl text-gray-400">
                Formu doldurun, 24 saat içinde sizinle iletişime geçelim
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FuturisticCard variant="glass" className="overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        Şirket Adı *
                      </label>
                      <FuturisticInput
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Firma Adınız"
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        <Users className="w-4 h-4 inline mr-2" />
                        Yetkili Kişi *
                      </label>
                      <FuturisticInput
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Ad Soyad"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-posta *
                      </label>
                      <FuturisticInput
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@sirket.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon *
                      </label>
                      <FuturisticInput
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+90 (5XX) XXX XX XX"
                      />
                    </div>

                    {/* Partner Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        <Award className="w-4 h-4 inline mr-2" />
                        İş Ortaklığı Türü *
                      </label>
                      <select
                        required
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#667EEA] focus:ring-2 focus:ring-[#667EEA]/20 outline-none transition-all backdrop-blur-xl"
                      >
                        <option value="" className="bg-gray-900">Seçiniz</option>
                        <option value="hotel" className="bg-gray-900">Otel & Konaklama</option>
                        <option value="tour" className="bg-gray-900">Tur Operatörü</option>
                        <option value="car" className="bg-gray-900">Araç Kiralama</option>
                        <option value="transfer" className="bg-gray-900">Transfer Hizmeti</option>
                        <option value="rental" className="bg-gray-900">Kiralık Ev & Villa</option>
                        <option value="agency" className="bg-gray-900">Seyahat Acentesi</option>
                      </select>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Şehir *
                      </label>
                      <FuturisticInput
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Antalya"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Mesajınız
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#667EEA] focus:ring-2 focus:ring-[#667EEA]/20 outline-none transition-all backdrop-blur-xl resize-none"
                      placeholder="İş ortaklığı hakkında detaylar, sorularınız..."
                    />
                  </div>

                  {/* Submit Button */}
                  <FuturisticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Başvuruyu Gönder</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </FuturisticButton>

                  <p className="text-center text-sm text-gray-400">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Başvurunuz alındıktan sonra 24 saat içinde tarafınıza dönüş yapılacaktır.
                  </p>
                </form>
              </FuturisticCard>
            </motion.div>
          </div>
        </NeoSection>

        {/* CONTACT INFO - Neo-Glass CTA */}
        <section className="py-16 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold mb-1">E-posta</div>
                  <a
                    href="mailto:partners@lydian.com"
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    partners@lydian.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold mb-1">Telefon</div>
                  <a
                    href="tel:+908501234567"
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    0850 123 45 67
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold mb-1">Adres</div>
                  <p className="text-white/90">
                    Antalya, Türkiye
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <BookingFooter />
    </>
  );
}
