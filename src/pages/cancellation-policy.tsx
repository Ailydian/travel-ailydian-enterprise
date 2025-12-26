import React from 'react';
import Head from 'next/head';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { Shield, Clock, CreditCard, AlertTriangle, CheckCircle2, XCircle, Calendar, RefreshCw, Info } from 'lucide-react';

export default function CancellationPolicy() {
  return (
    <>
      <Head>
        <title>İptal ve İade Politikası - Travel.com</title>
        <meta name="description" content="Travel.com iptal ve iade koşulları. Rezervasyon iptali, ücret iadesi ve iptal süreçleri hakkında detaylı bilgi." />
        <meta name="keywords" content="iptal politikası, iade politikası, rezervasyon iptali, ücretsiz iptal, iptal koşulları" />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-white/5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-lydian-primary to-lydian-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                İptal ve İade Politikası
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Esnek iptal seçenekleri ve şeffaf iade koşulları ile yanınızdayız
              </p>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="max-w-7xl mx-auto px-4 -mt-8">
          <div className="bg-transparent rounded-xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ücretsiz İptal</h3>
                <p className="text-gray-300">24 saat içinde ücretsiz iptal hakkı</p>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-lydian-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Hızlı İade</h3>
                <p className="text-gray-300">5-10 iş günü içinde iade işlemi</p>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">7/24 Destek</h3>
                <p className="text-gray-300">İptal sürecinizde yardım</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hotel Cancellations */}
          <section className="bg-transparent rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">Otel Rezervasyonları</h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Ücretsiz İptal
                </h3>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Rezervasyon tarihinden 24 saat içinde yapılan iptal işlemleri tamamen ücretsizdir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Check-in tarihinden 7 gün veya daha fazla önce yapılan iptallerde tam iade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Esnek tarife seçeneklerinde belirtilen süre içinde ücretsiz iptal</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Kısmi İade
                </h3>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Check-in tarihinden 3-7 gün önce: %50 iade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Check-in tarihinden 1-3 gün önce: %25 iade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>İptal masrafları otelden otele değişiklik gösterebilir</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  İade Edilmeyen Durumlar
                </h3>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Check-in tarihinden 24 saat önce veya daha geç yapılan iptaller</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>İadesi olmayan (non-refundable) tarife seçenekleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lydian-primary mt-1">•</span>
                    <span>Rezervasyon süresince gelmeyen (no-show) misafirler</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Flight Cancellations */}
          <section className="bg-transparent rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">Uçak Biletleri</h2>
            </div>

            <div className="space-y-4 text-gray-200">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Rezervasyon tarihinden 24 saat içinde yapılan iptaller ücretsizdir</span>
              </p>
              <p className="flex items-start gap-2">
                <Info className="w-5 h-5 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>Uçuş tarihinden 15 gün veya daha fazla önce: Bilet ücretinin %80'i iade edilir</span>
              </p>
              <p className="flex items-start gap-2">
                <Info className="w-5 h-5 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>Uçuş tarihinden 7-15 gün önce: Bilet ücretinin %50'si iade edilir</span>
              </p>
              <p className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Uçuş tarihinden 7 gün içinde: Sadece havayolu vergisi iade edilir</span>
              </p>
              <p className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>İndirimli ve promosyon biletlerinde farklı koşullar geçerli olabilir</span>
              </p>
            </div>
          </section>

          {/* Tours & Activities */}
          <section className="bg-transparent rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">Turlar ve Aktiviteler</h2>
            </div>

            <div className="space-y-4 text-gray-200">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Tur tarihinden 48 saat veya daha fazla önce yapılan iptaller tam iade edilir</span>
              </p>
              <p className="flex items-start gap-2">
                <Info className="w-5 h-5 text-lydian-primary mt-0.5 flex-shrink-0" />
                <span>24-48 saat arası iptallerde %50 iade yapılır</span>
              </p>
              <p className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>24 saat içindeki iptaller ve katılmayanlar için iade yapılmaz</span>
              </p>
              <p className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Özel turlar ve grup rezervasyonları için farklı koşullar uygulanabilir</span>
              </p>
            </div>
          </section>

          {/* Refund Process */}
          <section className="bg-transparent rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">İade Süreci</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">İade Nasıl Yapılır?</h3>
                <ol className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span>Rezervasyon Yönetimi sayfasından iptal talebinizi oluşturun</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span>İptal onayını e-posta olarak alacaksınız</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span>İade tutarı 5-10 iş günü içinde hesabınıza yansıyacaktır</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-lydian-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <span>İade durumunu Rezervasyon Yönetimi sayfasından takip edebilirsiniz</span>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-200">
                    <p className="font-semibold mb-1">Önemli Bilgi:</p>
                    <p>İade süreleri bankanıza göre değişiklik gösterebilir. Kredi kartına yapılan iadelerde süre ekstreden düşme tarihine göre 1-2 ay uzayabilir.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Circumstances */}
          <section className="bg-transparent rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-lydian-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-lydian-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">Özel Durumlar</h2>
            </div>

            <div className="space-y-4 text-gray-200">
              <div>
                <h3 className="font-semibold mb-2">Doğal Afet ve Salgın Hastalık</h3>
                <p className="text-gray-300">
                  Doğal afet, salgın hastalık veya seyahat kısıtlamaları durumunda esnek iptal politikası uygulanır.
                  Tam iade veya tarihi erteleme seçenekleri sunulur.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Sağlık Sorunları</h3>
                <p className="text-gray-300">
                  Doktor raporu ile belgelendirilen sağlık sorunları durumunda özel değerlendirme yapılır.
                  Gerekli belgeler ibraz edildiğinde iade işlemi başlatılır.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Hizmet Sağlayıcı Kaynaklı İptal</h3>
                <p className="text-gray-300">
                  Otel, havayolu veya tur operatörü kaynaklı iptallerde tam iade garanti edilir.
                  Alternatif seçenekler veya telafi paketleri sunulabilir.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-lydian-primary to-lydian-dark text-white rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">İptal İşleminizde Yardıma mı İhtiyacınız Var?</h2>
              <p className="mb-6 text-blue-100">
                Müşteri hizmetleri ekibimiz size yardımcı olmak için 7/24 hizmetinizde
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+908505551234"
                  className="bg-transparent text-lydian-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  0850 555 12 34
                </a>
                <a
                  href="/manage-booking"
                  className="bg-white/10 backdrop-blur text-white border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Rezervasyon Yönetimi
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <p className="text-center text-gray-400 text-sm">
            Son güncelleme: 26 Aralık 2025 | Bu politika önceden haber verilmeksizin değiştirilebilir.
          </p>
        </div>
      </main>

      <BookingFooter />
    </>
  );
}
