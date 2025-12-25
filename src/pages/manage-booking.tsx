import React, { useState } from 'react';
import Head from 'next/head';
import { BookingHeader } from '../components/layout/BookingHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { Search, Calendar, User, Mail, Phone, MapPin, CreditCard, Download, Printer, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function ManageBooking() {
  const [searchType, setSearchType] = useState<'booking' | 'email'>('booking');
  const [bookingNumber, setBookingNumber] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated search
    setTimeout(() => {
      setLoading(false);
      alert('Rezervasyon arama işlemi başlatıldı');
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Rezervasyon Yönetimi - Travel.com</title>
        <meta name="description" content="Rezervasyonlarınızı görüntüleyin, değiştirin veya iptal edin. Tüm seyahat bilgilerinize hızlıca erişin." />
        <meta name="keywords" content="rezervasyon yönetimi, rezervasyon sorgulama, rezervasyon iptali, rezervasyon değiştirme" />
      </Head>

      <BookingHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Rezervasyon Yönetimi
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Rezervasyonlarınızı görüntüleyin, değiştirin veya iptal edin
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-xl shadow-xl p-8">
            {/* Tab Selection */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setSearchType('booking')}
                className={`pb-4 px-4 font-semibold transition-colors relative ${
                  searchType === 'booking'
                    ? 'text-ailydian-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Rezervasyon Numarası ile
                {searchType === 'booking' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ailydian-primary" />
                )}
              </button>
              <button
                onClick={() => setSearchType('email')}
                className={`pb-4 px-4 font-semibold transition-colors relative ${
                  searchType === 'email'
                    ? 'text-ailydian-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                E-posta ile
                {searchType === 'email' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ailydian-primary" />
                )}
              </button>
            </div>

            <form onSubmit={handleSearch}>
              {searchType === 'booking' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rezervasyon Numarası
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={bookingNumber}
                        onChange={(e) => setBookingNumber(e.target.value)}
                        placeholder="Örn: TRV-2025-123456"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Rezervasyon numaranız onay e-postanızda bulunmaktadır
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Soyadı
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Rezervasyonda belirtilen soyadı"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rezervasyon@ornek.com"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Rezervasyon yaparken kullandığınız e-posta adresi
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Soyadı
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Rezervasyonda belirtilen soyadı"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-ailydian-primary text-white py-4 rounded-lg font-semibold hover:bg-ailydian-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Aranıyor...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Rezervasyonu Bul
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Rezervasyon Yönetimi İle Neler Yapabilirsiniz?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-ailydian-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tarih Değiştirme
              </h3>
              <p className="text-gray-600 text-sm">
                Seyahat planlarınız değişti mi? Rezervasyon tarihinizi kolayca güncelleyin
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Voucher İndirme
              </h3>
              <p className="text-gray-600 text-sm">
                Rezervasyon voucher ve onay belgelerinizi PDF olarak indirin
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Misafir Bilgileri
              </h3>
              <p className="text-gray-600 text-sm">
                Misafir bilgilerini görüntüleyin ve gerekirse güncelleyin
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                İptal İşlemi
              </h3>
              <p className="text-gray-600 text-sm">
                İptal koşullarını görüntüleyin ve rezervasyonunuzu iptal edin
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-ailydian-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-ailydian-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  7/24 Müşteri Desteği
                </h3>
                <p className="text-gray-600 mb-3">
                  Her türlü sorunuz için ekibimiz yanınızda
                </p>
                <a href="tel:+908505551234" className="text-ailydian-primary font-semibold hover:underline">
                  0850 555 12 34
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-ailydian-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-ailydian-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  E-posta Desteği
                </h3>
                <p className="text-gray-600 mb-3">
                  Detaylı sorularınız için e-posta gönderin
                </p>
                <a href="mailto:destek@travel.ailydian.com" className="text-ailydian-primary font-semibold hover:underline">
                  destek@travel.ailydian.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-ailydian-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-ailydian-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hızlı Çözüm
                </h3>
                <p className="text-gray-600 mb-3">
                  Sık sorulan sorular için yardım merkezini ziyaret edin
                </p>
                <a href="/faq" className="text-ailydian-primary font-semibold hover:underline">
                  Yardım Merkezi
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-ailydian-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Önemli Bilgiler</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Rezervasyon numaranız onay e-postanızda bulunmaktadır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>İptal koşulları rezervasyon tipine göre değişiklik gösterir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Tarih değişiklikleri için müsaitlik durumu kontrol edilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Tüm değişiklikler için güncel fiyat farkları geçerlidir</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
}
