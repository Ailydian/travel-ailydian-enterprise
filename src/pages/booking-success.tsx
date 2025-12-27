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
  Printer,
  Home,
  Star,
  Shield,
  Smartphone,
  Clock,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import SimplifiedHeader from '../components/layout/SimplifiedHeader';

const BookingSuccess: React.FC = () => {
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
        badge: 'VR Deneyimi Dahil'
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
        badge: 'Lüks Süit'
      }
    ],
    total: 6156,
    paymentMethod: '**** **** **** 1234'
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience': return '🎯';
      case 'hotel': return '🏨';
      case 'flight': return '✈️';
      default: return '📍';
    }
  };

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF
    alert('Biletiniz indirilecek... (Demo için gösterim)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'LyDian Travel - Rezervasyonum Onaylandı!',
        text: `LyDian Travel ile harika bir seyahat rezervasyonu yaptım! Onay numarası: ${bookingDetails.confirmationNumber}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Bağlantı panoya kopyalandı!');
    }
  };

  return (
    <>
      <Head>
        <title>Rezervasyon Onaylandı - LyDian Travel | Başarılı Ödeme</title>
        <meta name="description" content="Rezervasyonunuz başarıyla onaylandı. Blockchain teknologisi ile güvenceye alınmış seyahat deneyiminiz sizi bekliyor!" />
      </Head>

      <SimplifiedHeader />

      <main className="pt-8 min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              🎉 Rezervasyonunuz Onaylandı!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-2">
              Harika bir seçim yaptınız! Seyahatiniz blockchain teknologisi ile güvenceye alındı.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-lydian-primary font-semibold">
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
            <button
              onClick={handleDownloadTicket}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-lydian-primary text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-lydian-dark transition-colors"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Biletimi İndir
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-gray-200 text-gray-200 rounded-xl text-sm sm:text-base font-semibold hover:border-lydian-primary hover:text-lydian-primary transition-colors"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Paylaş
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-700 transition-colors"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Ana Sayfa
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
                  className="bg-transparent rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
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
                        <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-lydian-primary rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
                            <span className="inline-block px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">₺{item.price}</div>
                            <div className="text-xs sm:text-sm text-gray-200">{item.guests} kişi</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="line-clamp-1">{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="line-clamp-1">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="line-clamp-1">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="line-clamp-1">{item.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="bg-green-50 border-t border-green-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-800 font-medium">Onaylandı &amp; Blockchain&apos;de Kayıtlı</span>
                      </div>
                      <span className="text-sm text-green-600">Biletiniz e-posta ile gönderildi</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">🚀 Sonraki Adımlar</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium text-white">Biletlerinizi İndirin</p>
                      <p className="text-sm text-gray-100">QR kodlu biletlerinizi mobil cihazınıza kaydedin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium text-white">VR Önizleme Yapın</p>
                      <p className="text-sm text-gray-100">Seyahatinizden önce sanal gerçeklik deneyimi yaşayın</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium text-white">Seyahat Günü</p>
                      <p className="text-sm text-gray-100">QR kodunuzu göstererek check-in yapın</p>
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
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
              >
                <h3 className="font-bold text-base sm:text-lg text-white mb-4 sm:mb-6">Rezervasyon Bilgileri</h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-100">Onay Numarası</span>
                    <span className="font-semibold text-xs sm:text-sm text-lydian-primary text-right">{bookingDetails.confirmationNumber}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-100">Rezervasyon Tarihi</span>
                    <span className="font-semibold text-xs sm:text-sm">{bookingDetails.bookingDate}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-100">Müşteri</span>
                    <span className="font-semibold text-xs sm:text-sm text-right">{bookingDetails.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-100">E-posta</span>
                    <span className="font-semibold text-[10px] sm:text-xs text-right break-all">{bookingDetails.customerEmail}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-xs sm:text-sm text-gray-100">Telefon</span>
                    <span className="font-semibold text-xs sm:text-sm">{bookingDetails.customerPhone}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-4 sm:mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-white">Toplam Ödenen</span>
                    <span className="text-xl sm:text-2xl font-bold text-green-600">₺{bookingDetails.total}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-gray-100 mt-2">
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
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="font-bold text-lg text-white mb-6">Güvenlik & Destek</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-gray-200">Blockchain ile doğrulanmış rezervasyon</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-200">256-bit SSL ile güvenli ödeme</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Smartphone className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-200">Mobil bilet & QR kod</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-200">24/7 müşteri desteği</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-6 space-y-3">
                  <h4 className="font-semibold text-white">İletişim</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>+90 212 555 0123</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>destek@lydian.com</span>
                  </div>
                </div>
              </motion.div>

              {/* Rate Experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-2xl p-6"
              >
                <h3 className="font-bold text-lg mb-4">Deneyiminizi Değerlendirin</h3>
                <p className="text-white/90 text-sm mb-6">
                  Seyahatiniz tamamlandıktan sonra deneyiminizi paylaşmayı unutmayın!
                </p>
                <button className="w-full bg-transparent text-lydian-primary py-3 px-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" />
                  Değerlendirme Yap
                </button>
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
            <p className="text-gray-300 mb-6">
              Başka bir seyahat planlamak ister misiniz?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Yeni Seyahat Keşfet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default BookingSuccess;