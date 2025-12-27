/**
 * Partners Program Page - Travel.LyDian.com
 * Professional partner recruitment and collaboration page
 *
 * Features:
 * - Partner benefits showcase
 * - Multiple partner types (Hotels, Tour Operators, Car Rentals, etc.)
 * - Application form
 * - Success stories
 * - Commission structure
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
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
  Send
} from 'lucide-react';

const partnerTypes = [
  {
    icon: Hotel,
    title: 'Otel & Konaklama',
    description: 'Otelinizi milyonlarca gezgine tanıtın',
    color: 'from-blue-500 to-cyan-500',
    benefits: ['%15 komisyon', 'Anlık rezervasyon', '7/24 destek']
  },
  {
    icon: Compass,
    title: 'Tur Operatörleri',
    description: 'Turlarınızı global pazara açın',
    color: 'from-purple-500 to-pink-500',
    benefits: ['%12 komisyon', 'Pazarlama desteği', 'Premium görünürlük']
  },
  {
    icon: Car,
    title: 'Araç Kiralama',
    description: 'Filonuzu maksimum dolulukla çalıştırın',
    color: 'from-orange-500 to-red-500',
    benefits: ['%10 komisyon', 'Anlık onay', 'Filo yönetimi']
  },
  {
    icon: Bus,
    title: 'Transfer Hizmetleri',
    description: 'Transfer ağınızı genişletin',
    color: 'from-green-500 to-emerald-500',
    benefits: ['%10 komisyon', 'Rota optimizasyonu', 'Mobil uygulama']
  },
  {
    icon: Home,
    title: 'Kiralık Ev & Villa',
    description: 'Mülklerinizi daha fazla gezgine kiralayın',
    color: 'from-indigo-500 to-purple-600',
    benefits: ['%15 komisyon', 'Profesyonel fotoğraf', 'Temizlik desteği']
  },
  {
    icon: Building2,
    title: 'Seyahat Acenteleri',
    description: 'Ajansınızı dijitalleştirin',
    color: 'from-pink-500 to-red-500',
    benefits: ['%8 komisyon', 'B2B panel', 'API entegrasyonu']
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Gelir Artışı',
    description: 'Ortalama %40 gelir artışı sağlayan partnerlerimiz',
    stat: '+40%'
  },
  {
    icon: Users,
    title: 'Geniş Müşteri Tabanı',
    description: 'Ayda 2M+ aktif kullanıcıya erişin',
    stat: '2M+'
  },
  {
    icon: Globe,
    title: 'Global Erişim',
    description: '180+ ülkeden rezervasyon alın',
    stat: '180+'
  },
  {
    icon: Zap,
    title: 'Anlık Rezervasyon',
    description: 'Otomatik onay ve bildirim sistemi',
    stat: '24/7'
  },
  {
    icon: BarChart3,
    title: 'Detaylı Raporlama',
    description: 'Gerçek zamanlı satış ve performans analizi',
    stat: 'Canlı'
  },
  {
    icon: Headphones,
    title: 'Özel Destek',
    description: 'Partnerlerimize özel 7/24 destek ekibi',
    stat: '7/24'
  }
];

const successStories = [
  {
    name: 'Antalya Premium Hotels',
    type: 'Otel Zinciri',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400',
    quote: '6 ay içinde doluluk oranımız %35 arttı. LyDian ile çalışmak işimizi dönüştürdü.',
    increase: '+%35 Doluluk',
    stat: '12K+ Rezervasyon'
  },
  {
    name: 'Aegean Tours & Travel',
    type: 'Tur Operatörü',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
    quote: 'Platform sayesinde turlarımız artık dünya çapında satılıyor. Muhteşem bir deneyim!',
    increase: '+%120 Satış',
    stat: '8K+ Misafir'
  },
  {
    name: 'Mediterranean Car Rentals',
    type: 'Araç Kiralama',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
    quote: 'Filo kullanım oranımız maksimuma ulaştı. Her gün yeni rezervasyonlar geliyor.',
    increase: '+%85 Verimlilik',
    stat: '15K+ Kiralama'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderimi - backend entegrasyonu yapılacak
    logger.debug('Partner başvurusu:', {component:'Partner', metadata:{formData}});
    alert('Başvurunuz alındı! En kısa sürede size dönüş yapacağız.');
  };

  return (
    <>
      <Head>
        <title>İş Ortağımız Olun - Travel.LyDian Partner Programı</title>
        <meta name="description" content="Travel.LyDian ile iş ortağı olun. Otel, tur operatörü, araç kiralama ve transfer hizmetlerinizi milyonlarca gezgine ulaştırın." />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-lydian-primary via-red-600 to-lydian-secondary py-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-96 h-96 bg-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-6"
              >
                <UserPlus className="w-20 h-20 mx-auto drop-shadow-2xl" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                İş Ortağımız Olun
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Türkiye'nin en hızlı büyüyen turizm platformunda yerinizi alın.
                <br />
                <span className="font-bold">2M+ aktif kullanıcıya</span> ulaşın, gelirinizi artırın!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="#basvuru"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-lydian-primary rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all"
                >
                  Hemen Başvur
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#avantajlar"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Avantajları Keşfet
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Hangi Alanda İş Ortağı Olabilirsiniz?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Turizm sektöründeki tüm hizmet sağlayıcılar için özel çözümler
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-transparent rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${type.color} text-white mb-6`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{type.title}</h3>
                    <p className="text-gray-300 mb-6">{type.description}</p>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-200">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="avantajlar" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Neden LyDian Partner Programı?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Sektörün en avantajlı partner programı ile işinizi büyütün
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-transparent rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="absolute top-4 right-4 text-5xl font-black text-lydian-primary/10">
                      {benefit.stat}
                    </div>
                    <Icon className="w-12 h-12 text-lydian-primary mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Başarı Hikayeleri
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Partnerlerimizin gerçek deneyimleri
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-white/80">{story.type}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-200 italic mb-4">"{story.quote}"</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-lydian-primary font-bold">{story.increase}</div>
                      <div className="text-gray-300 text-sm">{story.stat}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="basvuru" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Partner Başvurusu
              </h2>
              <p className="text-xl text-gray-300">
                Formu doldurun, en kısa sürede sizinle iletişime geçelim
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-transparent rounded-2xl shadow-xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">
                      Şirket Adı *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                      placeholder="Firma Adınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">
                      Yetkili Kişi *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                      placeholder="Ad Soyad"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                      placeholder="ornek@sirket.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                      placeholder="+90 (5XX) XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">
                      İş Ortaklığı Türü *
                    </label>
                    <select
                      required
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                    >
                      <option value="">Seçiniz</option>
                      <option value="hotel">Otel & Konaklama</option>
                      <option value="tour">Tur Operatörü</option>
                      <option value="car">Araç Kiralama</option>
                      <option value="transfer">Transfer Hizmeti</option>
                      <option value="rental">Kiralık Ev & Villa</option>
                      <option value="agency">Seyahat Acentesi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-200 mb-2">
                      Şehir *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                      placeholder="Antalya"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
                    placeholder="İş ortaklığı hakkında detaylar, sorularınız..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-5 h-5" />
                  Başvuruyu Gönder
                </motion.button>

                <p className="text-center text-sm text-gray-200">
                  Başvurunuz alındıktan sonra 24 saat içinde tarafınıza dönüş yapılacaktır.
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-gradient-to-r from-lydian-primary to-lydian-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
              <div className="flex flex-col items-center gap-3">
                <Mail className="w-8 h-8" />
                <div>
                  <div className="font-bold mb-1">E-posta</div>
                  <a href="mailto:partners@lydian.com" className="text-white/90 hover:text-white">
                    partners@lydian.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Phone className="w-8 h-8" />
                <div>
                  <div className="font-bold mb-1">Telefon</div>
                  <a href="tel:+908501234567" className="text-white/90 hover:text-white">
                    0850 123 45 67
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <MapPin className="w-8 h-8" />
                <div>
                  <div className="font-bold mb-1">Adres</div>
                  <p className="text-white/90">
                    Antalya, Türkiye
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFooter />
    </>
  );
}
