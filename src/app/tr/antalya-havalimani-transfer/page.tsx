import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, Clock, Shield, Star, CheckCircle, Phone,
  Users, Car, Zap, Award, TrendingUp, MessageCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Antalya Havalimanı Transfer - 7/24 Güvenli Transfer Hizmeti | %30 İndirim',
  description: '✅ Antalya Havalimanı Transfer ✓ Alanya, Belek, Side, Kemer ✓ 7/24 Hizmet ✓ VIP Araçlar ✓ Online Rezervasyon ✓ %30 Erken Rezervasyon İndirimi. Hemen Rezervasyon Yap!',
  keywords: [
    'antalya havalimanı transfer',
    'alanya transfer',
    'belek transfer',
    'side transfer',
    'kemer transfer',
    'vip transfer antalya',
    'havalimanı transfer fiyatları',
    'antalya transfer rezervasyon'
  ],
  alternates: {
    canonical: 'https://travel.lydian.com/tr/antalya-havalimani-transfer',
    languages: {
      'en': 'https://travel.lydian.com/en/antalya-airport-transfer',
      'ru': 'https://travel.lydian.com/ru/transfer-antalya',
      'de': 'https://travel.lydian.com/de/antalya-flughafentransfer',
      'fr': 'https://travel.lydian.com/fr/transfert-aeroport-antalya'
    }
  },
  openGraph: {
    title: 'Antalya Havalimanı Transfer - En Güvenilir Transfer Hizmeti',
    description: 'Antalya Havalimanından tüm bölgelere 7/24 güvenli ve konforlu transfer hizmeti. VIP araçlar, profesyonel sürücüler, %30 indirim!',
    url: 'https://travel.lydian.com/tr/antalya-havalimani-transfer',
    siteName: 'LyDian Travel',
    locale: 'tr_TR',
    type: 'website',
  }
};

const destinations = [
  { name: 'Alanya', distance: '135 km', duration: '2 saat', price: '€45', image: '/alanya.jpg' },
  { name: 'Belek', distance: '35 km', duration: '40 dakika', price: '€25', image: '/belek.jpg' },
  { name: 'Side', distance: '65 km', duration: '1 saat', price: '€30', image: '/side.jpg' },
  { name: 'Kemer', distance: '45 km', duration: '50 dakika', price: '€28', image: '/kemer.jpg' },
  { name: 'Lara', distance: '15 km', duration: '20 dakika', price: '€18', image: '/lara.jpg' },
  { name: 'Kundu', distance: '18 km', duration: '25 dakika', price: '€20', image: '/kundu.jpg' }
];

const features = [
  { icon: Clock, title: '7/24 Hizmet', description: 'Gece gündüz kesintisiz transfer hizmeti' },
  { icon: Shield, title: 'Güvenli Seyahat', description: 'Lisanslı araçlar ve profesyonel sürücüler' },
  { icon: Star, title: '5 Yıldız Puan', description: '10,000+ memnun müşteri yorumu' },
  { icon: Users, title: 'Grup Transferleri', description: '8-16 kişilik VIP araçlar' },
  { icon: Car, title: 'Lüks Araçlar', description: 'Mercedes, BMW, Volkswagen filosu' },
  { icon: Zap, title: 'Hızlı Rezervasyon', description: '3 dakikada online rezervasyon' }
];

const reviews = [
  {
    name: 'Mehmet Kaya',
    rating: 5,
    date: '15 Aralık 2024',
    comment: 'Antalya havalimanından Alanya\'ya transfer için kullandık. Araç çok temiz ve konforluydu, sürücümüz çok kibar ve güler yüzlüydü. Kesinlikle tavsiye ederim!'
  },
  {
    name: 'Sarah Wilson',
    rating: 5,
    date: '10 Aralık 2024',
    comment: 'Perfect service! Driver was waiting for us at the airport with a sign. Clean Mercedes vehicle and very professional service to Belek. Highly recommended!'
  },
  {
    name: 'Dmitry Petrov',
    rating: 5,
    date: '5 Aralık 2024',
    comment: 'Отличный трансфер! Водитель помог с багажом, автомобиль комфортный. Доехали до Сиде очень быстро. Спасибо!'
  }
];

const faqs = [
  {
    question: 'Antalya havalimanından Alanya\'ya transfer ücreti ne kadar?',
    answer: 'Antalya havalimanından Alanya\'ya standard transfer ücreti €45\'tan başlamaktadır. VIP araçlar için €65, 8 kişilik grup transferleri için €85 ücretlendirme yapılmaktadır. Erken rezervasyonda %30 indirim kazanabilirsiniz.'
  },
  {
    question: 'Transfer rezervasyonu nasıl yapılır?',
    answer: 'Online rezervasyon formunu doldurarak 3 dakikada rezervasyon yapabilirsiniz. Uçuş bilgilerinizi, varış noktanızı ve kişi sayısını belirtmeniz yeterlidir. Rezervasyon onayı anında e-posta ile gönderilir.'
  },
  {
    question: 'Uçağım gecikirse ne olur?',
    answer: 'Uçuş takip sistemimiz sayesinde gecikmeler otomatik olarak takip edilir. Sürücünüz sizi bekleyecektir, ek ücret ödemeniz gerekmez. 7/24 destek ekibimiz her zaman yardımınıza hazırdır.'
  },
  {
    question: 'Araçlar klimali ve konforlu mu?',
    answer: 'Tüm araçlarımız klimali, temiz ve bakımlıdır. Mercedes, BMW ve Volkswagen marka araçlarımız maksimum konfor için donatılmıştır. WiFi ve su ikramımız mevcuttur.'
  },
  {
    question: 'Kaç kişilik araç seçenekleri var?',
    answer: '1-3 kişi için sedan, 4-6 kişi için minivan, 8-16 kişi için VIP minibüs seçeneklerimiz bulunmaktadır. Tüm araçlar bagaj kapasitesi açısından geniştir.'
  },
  {
    question: 'Bebek koltuğu hizmeti var mı?',
    answer: 'Evet, ücretsiz bebek koltuğu hizmeti sunuyoruz. Rezervasyon sırasında bebek koltuğu ihtiyacınızı belirtmeniz yeterlidir.'
  },
  {
    question: 'Ödeme nasıl yapılır?',
    answer: 'Online kredi kartı, PayPal veya araçta nakit/kart ile ödeme yapabilirsiniz. Tüm ödemeler güvenli SSL sertifikası ile korunmaktadır. €, $ ve ₺ kabul edilir.'
  },
  {
    question: 'İptal politikası nedir?',
    answer: 'Transfer saatinden 24 saat öncesine kadar ücretsiz iptal yapabilirsiniz. 24 saatten sonra yapılan iptallerde %50 ücret kesilir. Havayolu kaynaklı iptallerde tam iade yapılır.'
  },
  {
    question: 'Havalimanında karşılama nasıl olur?',
    answer: 'Sürücümüz varış terminalinde isminizin yazılı olduğu bir tabelayla sizi bekleyecektir. Bavul teslim alanı çıkışında kolayca bulabilirsiniz. WhatsApp iletişim hattımız da aktiftir.'
  },
  {
    question: 'VIP transfer normal transferden farkı nedir?',
    answer: 'VIP transferde lüks araç (Mercedes E/S Class, BMW 5/7 Series), özel karşılama, soğuk içecek ikramı ve maksimum konfor sunulmaktadır. Ekstra bagaj alanı ve WiFi garantilidir.'
  }
];

export default function AntalyaHavalimanıTransferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'LyDian Transfer - Antalya Havalimanı Transfer',
            description: 'Antalya Havalimanı Transfer Hizmeti - Alanya, Belek, Side, Kemer',
            url: 'https://travel.lydian.com/tr/antalya-havalimani-transfer',
            telephone: '+90-242-123-4567',
            priceRange: '€€',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Antalya',
              addressCountry: 'TR'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '10247',
              bestRating: '5',
              worstRating: '1'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 36.8987,
              longitude: 30.7854
            },
            areaServed: ['Alanya', 'Belek', 'Side', 'Kemer', 'Lara', 'Antalya']
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔥 Erken Rezervasyonda %30 İNDİRİM!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Antalya Havalimanı Transfer - En Güvenilir Transfer Hizmeti 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Alanya • Belek • Side • Kemer • 7/24 Hizmet • VIP Araçlar • Online Rezervasyon
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#rezervasyon"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Car className="w-6 h-6" />
                HEMEN REZERVASYON YAP
              </Link>
              <Link
                href="#fiyatlar"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-all flex items-center gap-2 border-2 border-white"
              >
                <TrendingUp className="w-6 h-6" />
                FİYATLARI GÖR
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <span>4.9/5 • 10,247 Yorum</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>%100 Güvenli</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>7/24 Destek</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Neden LyDian Transfer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all">
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations & Pricing */}
      <section id="fiyatlar" className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Antalya Havalimanı Transfer Fiyatları 2025
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Tüm destinasyonlar için net fiyatlar • Gizli ücret yok
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="bg-white/5 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    <div className="text-3xl font-bold text-blue-600">{dest.price}</div>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>Mesafe: {dest.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>Süre: {dest.duration}</span>
                    </div>
                  </div>
                  <Link
                    href={`#rezervasyon?destination=${dest.name}`}
                    className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    REZERVASYON YAP
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Müşteri Yorumları ve Deneyimler
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-200 mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">{review.name}</span>
                  <span className="text-gray-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white/5 rounded-xl p-6 shadow-sm">
                <summary className="font-bold text-lg cursor-pointer text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-300 pl-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="rezervasyon" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hemen Rezervasyon Yapın - %30 İndirim Kazanın!
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            3 dakikada online rezervasyon • Anında onay • 7/24 destek
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Car className="w-6 h-6" />
              HEMEN REZERVASYON YAP
            </Link>
            <a
              href="https://wa.me/902421234567"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all flex items-center gap-2"
            >
              <Phone className="w-6 h-6" />
              WHATSAPP İLE İLETİŞİM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
