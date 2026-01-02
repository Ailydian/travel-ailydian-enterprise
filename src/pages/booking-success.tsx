import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Download,
  Share2,
  Mail,
  Phone,
  Home,
  Star,
  Shield,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { FuturisticButton } from '../components/neo-glass/FuturisticButton';
import { useToast } from '../context/ToastContext';

const BookingSuccess: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  // Mock booking data
  const bookingDetails = {
    confirmationNumber: 'AILYDIAN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    bookingDate: new Date().toLocaleDateString('tr-TR'),
    customerName: 'Ahmet Yılmaz',
    customerEmail: 'ahmet.yilmaz@email.com',
    customerPhone: '+90 532 123 45 67',
    items: [
      {
        id: '1',
        type: 'experience',
        title: 'Kapadokya: Blockchain Doğrulamalı Balon Turu',
        location: 'Kapadokya, Türkiye',
        date: '15 Aralık 2024',
        time: '06:00',
        duration: '4 saat',
        guests: 2,
        price: 900,
        image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=300&h=200&q=90',
        badge: 'VR Deneyimi Dahil',
      },
      {
        id: '2',
        type: 'hotel',
        title: 'Boğaziçi Palace Hotel',
        location: 'Sultanahmet, İstanbul',
        date: '20-23 Aralık 2024',
        time: '14:00 giriş',
        duration: '3 gece',
        guests: 2,
        price: 4800,
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&q=90',
        badge: 'Lüks Süit',
      },
    ],
    total: 6156,
    paymentMethod: '**** **** **** 1234',
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience':
        return '🎯';
      case 'hotel':
        return '🏨';
      case 'flight':
        return '✈️';
      default:
        return '📍';
    }
  };

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF
    showInfo('Biletiniz indirilecek..', '(Demo için gösterim');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AILYDIAN Holiday - Rezervasyonum Onaylandı!',
        text: `AILYDIAN Holiday ile harika bir seyahat rezervasyonu yaptım! Onay numarası: ${bookingDetails.confirmationNumber}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({ type: 'info', title: 'Bağlantı panoya kopyalandı!' });
    }
  };

  return (
    <>
      <Head>
        <title>Rezervasyon Onaylandı - AILYDIAN Holiday | Başarılı Ödeme</title>
        <meta
          name="description"
          content="Rezervasyonunuz başarıyla onaylandı. Blockchain teknologisi ile güvenceye alınmış seyahat deneyiminiz sizi bekliyor!"
        />
      </Head>

      <ModernHeader />

      <main className="pt-8 min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-green-500/50">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Rezervasyonunuz Onaylandı!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-2">
              Harika bir seçim yaptınız! Seyahatiniz blockchain teknologisi ile güvenceye alındı.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-[#00BAFF] font-semibold">
              Onay Numaranız: <span className="font-bold">{bookingDetails.confirmationNumber}</span>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12"
          >
            <FuturisticButton variant="gradient"
              size="md"
              onClick={handleDownloadTicket}
              leftIcon={<Download className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
              Biletimi İndir
            </FuturisticButton>
            <FuturisticButton variant="secondary"
              size="md"
              onClick={handleShare}
              leftIcon={<Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
              Paylaş
            </FuturisticButton>
            <Link href="/">
              <FuturisticButton variant="accent"
                size="md"
                leftIcon={<Home className="w-4 h-4 sm:w-5 sm:h-5" />}
                >
                Ana Sayfa
              </FuturisticButton>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Reservation Items */}
              {bookingDetails.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      {/* Image */}
                      <div className="relative w-full sm:w-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-xl"
                        />
                        <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#667EEA] to-[#00BAFF] rounded-full flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-600 text-white rounded-full p-1">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
                              {item.title}
                            </h3>
                            <span className="inline-block px-2 sm:px-3 py-1 bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/30 rounded-full text-xs sm:text-sm font-medium">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-1">
                              ₺{item.price}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-300">
                              {item.guests} kişi
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                            <span className="line-clamp-1">{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                            <span className="line-clamp-1">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                            <span className="line-clamp-1">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                            <span className="line-clamp-1">{item.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="bg-green-600/10 border-t border-green-400/30 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                        <span className="text-green-300 font-medium">
                          Onaylandı &amp; Blockchain'de Kayıtlı
                        </span>
                      </div>
                      <span className="text-sm text-green-300">Biletiniz e-posta ile gönderildi</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-[#667EEA]/20 to-[#00BAFF]/20 backdrop-blur-xl rounded-2xl border border-[#667EEA]/30 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Sonraki Adımlar</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#667EEA] to-[#00BAFF] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-white">Biletlerinizi İndirin</p>
                      <p className="text-sm text-gray-400">
                        QR kodlu biletlerinizi mobil cihazınıza kaydedin
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#EC4899] to-[#FF9500] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-white">VR Önizleme Yapın</p>
                      <p className="text-sm text-gray-400">
                        Seyahatinizden önce sanal gerçeklik deneyimi yaşayın
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-white">Seyahat Günü</p>
                      <p className="text-sm text-gray-400">
                        QR kodunuzu göstererek check-in yapın
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-4 sm:space-y-6">
              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-4 sm:p-6"
              >
                <h3 className="font-bold text-base sm:text-lg text-white mb-4 sm:mb-6">
                  Rezervasyon Bilgileri
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-400">Onay Numarası</span>
                    <span className="font-semibold text-xs sm:text-sm text-[#00BAFF] text-right">
                      {bookingDetails.confirmationNumber}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-400">
                      Rezervasyon Tarihi
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-white">
                      {bookingDetails.bookingDate}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-400">Müşteri</span>
                    <span className="font-semibold text-xs sm:text-sm text-white text-right">
                      {bookingDetails.customerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-400">E-posta</span>
                    <span className="font-semibold text-[10px] sm:text-xs text-white text-right break-all">
                      {bookingDetails.customerEmail}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-400">Telefon</span>
                    <span className="font-semibold text-xs sm:text-sm text-white">
                      {bookingDetails.customerPhone}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 sm:pt-4 mt-4 sm:mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-white">
                      Toplam Ödenen
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      ₺{bookingDetails.total}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2">
                    <span>Ödeme Yöntemi</span>
                    <span>{bookingDetails.paymentMethod}</span>
                  </div>
                </div>
              </motion.div>

              {/* Security & Support */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-6"
              >
                <h3 className="font-bold text-lg text-white mb-6">
                  Güvenlik & Destek
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-400">Blockchain ile doğrulanmış rezervasyon</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-[#00BAFF]" />
                    <span className="text-gray-400">256-bit SSL ile güvenli ödeme</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-5 h-5 text-[#FF9500]" />
                    <span className="text-gray-400">24/7 müşteri desteği</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-6 space-y-3">
                  <h4 className="font-semibold text-white">İletişim</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-300" />
                    <span className="text-gray-400">+90 212 555 0123</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-300" />
                    <span className="text-gray-400">destek@lydian.com</span>
                  </div>
                </div>
              </motion.div>

              {/* Rate Experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-[#667EEA] to-[#00BAFF] text-white rounded-2xl p-6 shadow-lg shadow-[#667EEA]/50"
              >
                <h3 className="font-bold text-lg mb-4">Deneyiminizi Değerlendirin</h3>
                <p className="text-white/90 text-sm mb-6">
                  Seyahatiniz tamamlandıktan sonra deneyiminizi paylaşmayı unutmayın!
                </p>
                <FuturisticButton variant="secondary"
                  size="md"
                  fullWidth
                  leftIcon={<Star className="w-5 h-5" />}
                  >
                  Değerlendirme Yap
                </FuturisticButton>
              </motion.div>
            </div>
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6">Başka bir seyahat planlamak ister misiniz?</p>
            <Link href="/">
              <FuturisticButton variant="ai"
                size="lg"
                leftIcon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Yeni Seyahat Keşfet
              </FuturisticButton>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default BookingSuccess;
