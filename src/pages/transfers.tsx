import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Car,
  Users,
  Star,
  ArrowRight,
  TrendingDown,
  CheckCircle,
  Plane,
  Building2
} from 'lucide-react';
import SimplifiedHeader from '../components/layout/SimplifiedHeader';
import antalyaAirportTransfers from '../data/antalya-transfers';

export default function TransfersPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'ru' | 'de' | 'ar' | 'fr'>('tr');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: { tr: 'Tümü', en: 'All', ru: 'Все', de: 'Alle', ar: 'الكل', fr: 'Tous' } },
    { id: 'airport', label: { tr: 'Havalimanı', en: 'Airport', ru: 'Аэропорт', de: 'Flughafen', ar: 'المطار', fr: 'Aéroport' } },
    { id: 'city', label: { tr: 'Şehir İçi', en: 'City', ru: 'Город', de: 'Stadt', ar: 'المدينة', fr: 'Ville' } },
    { id: 'district', label: { tr: 'İlçeler Arası', en: 'Districts', ru: 'Районы', de: 'Bezirke', ar: 'المناطق', fr: 'Districts' } }
  ];

  const filteredTransfers = selectedCategory === 'all'
    ? antalyaAirportTransfers
    : antalyaAirportTransfers.filter(t => t.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Antalya Transfer Hizmetleri | En Uygun Fiyat Garantisi | Ailydian Travel</title>
        <meta name="description" content="Antalya havalimanı ve şehir içi transfer hizmetleri. 6 dilde hizmet, 8 araç seçeneği, %12 daha ucuz garantili fiyat. 7/24 profesyonel transfer!" />
        <meta name="keywords" content="antalya transfer, havalimanı transfer, antalya airport transfer, özel transfer, vip transfer" />
        <link rel="canonical" href="https://travel.ailydian.com/transfers" />

        {/* Open Graph */}
        <meta property="og:title" content="Antalya Transfer Hizmetleri | Best Price Guarantee" />
        <meta property="og:description" content="Professional transfer services in 6 languages. 8 vehicle options, 12% cheaper guaranteed!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travel.ailydian.com/transfers" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Antalya Transfer Services" />
        <meta name="twitter:description" content="Professional transfers in 6 languages. Best price guaranteed!" />

        {/* Hreflang */}
        <link rel="alternate" hrefLang="tr-TR" href="https://travel.ailydian.com/tr/transfers" />
        <link rel="alternate" hrefLang="en-US" href="https://travel.ailydian.com/en/transfers" />
        <link rel="alternate" hrefLang="ru-RU" href="https://travel.ailydian.com/ru/transfers" />
        <link rel="alternate" hrefLang="de-DE" href="https://travel.ailydian.com/de/transfers" />
        <link rel="alternate" hrefLang="ar-SA" href="https://travel.ailydian.com/ar/transfers" />
        <link rel="alternate" hrefLang="fr-FR" href="https://travel.ailydian.com/fr/transfers" />
        <link rel="alternate" hrefLang="x-default" href="https://travel.ailydian.com/en/transfers" />
      </Head>

      <SimplifiedHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Plane className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {selectedLanguage === 'tr' && '6 Dilde Profesyonel Transfer Hizmeti'}
                {selectedLanguage === 'en' && 'Professional Transfer Service in 6 Languages'}
                {selectedLanguage === 'ru' && 'Профессиональный трансфер на 6 языках'}
                {selectedLanguage === 'de' && 'Professioneller Transfer in 6 Sprachen'}
                {selectedLanguage === 'ar' && 'خدمة نقل احترافية ب 6 لغات'}
                {selectedLanguage === 'fr' && 'Service de transfert professionnel en 6 langues'}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {selectedLanguage === 'tr' && 'Antalya Transfer'}
              {selectedLanguage === 'en' && 'Antalya Transfers'}
              {selectedLanguage === 'ru' && 'Трансфер в Анталии'}
              {selectedLanguage === 'de' && 'Antalya Transfers'}
              {selectedLanguage === 'ar' && 'نقل أنطاليا'}
              {selectedLanguage === 'fr' && 'Transferts à Antalya'}
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {selectedLanguage === 'tr' && 'Havalimanı ve şehir içi transferleriniz için %12 daha ucuz garantili fiyat!'}
              {selectedLanguage === 'en' && '12% cheaper guaranteed price for airport and city transfers!'}
              {selectedLanguage === 'ru' && 'На 12% дешевле гарантированная цена для трансферов!'}
              {selectedLanguage === 'de' && '12% günstigerer Garantiepreis für Transfers!'}
              {selectedLanguage === 'ar' && 'سعر مضمون أرخص بنسبة 12٪ للنقل!'}
              {selectedLanguage === 'fr' && 'Prix garanti 12% moins cher pour les transferts!'}
            </p>

            {/* Language Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['tr', 'en', 'ru', 'de', 'ar', 'fr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedLanguage === lang
                      ? 'bg-white text-blue-600 shadow-lg scale-105'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {lang === 'tr' && '🇹🇷 TR'}
                  {lang === 'en' && '🇬🇧 EN'}
                  {lang === 'ru' && '🇷🇺 RU'}
                  {lang === 'de' && '🇩🇪 DE'}
                  {lang === 'ar' && '🇸🇦 AR'}
                  {lang === 'fr' && '🇫🇷 FR'}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Car, value: '8', label: { tr: 'Araç Seçeneği', en: 'Vehicle Options', ru: 'Варианты транспорта', de: 'Fahrzeugoptionen', ar: 'خيارات المركبات', fr: 'Options de véhicules' } },
                { icon: Star, value: '4.9', label: { tr: 'Ortalama Puan', en: 'Average Rating', ru: 'Средний рейтинг', de: 'Durchschnittsbewertung', ar: 'متوسط ​​التقييم', fr: 'Note moyenne' } },
                { icon: Users, value: '50K+', label: { tr: 'Mutlu Müşteri', en: 'Happy Customers', ru: 'Довольные клиенты', de: 'Zufriedene Kunden', ar: 'عملاء سعداء', fr: 'Clients satisfaits' } },
                { icon: TrendingDown, value: '%12', label: { tr: 'Daha Ucuz', en: 'Cheaper', ru: 'Дешевле', de: 'Günstiger', ar: 'أرخص', fr: 'Moins cher' } }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label[selectedLanguage]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.label[selectedLanguage]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transfers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransfers.map((transfer, idx) => (
            <motion.div
              key={transfer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={transfer.images[0]}
                  alt={transfer.from[selectedLanguage]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  %12 {selectedLanguage === 'tr' ? 'İndirim' : 'OFF'}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{transfer.rating}</span>
                  <span className="text-gray-300">({transfer.totalTransfers.toLocaleString()})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      {transfer.from[selectedLanguage]}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 my-1" />
                    <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                      <MapPin className="w-4 h-4" />
                      {transfer.to[selectedLanguage]}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {transfer.description[selectedLanguage]}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{transfer.duration} {selectedLanguage === 'tr' ? 'dk' : 'min'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{transfer.distance} km</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4 mb-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {selectedLanguage === 'tr' && 'Başlangıç fiyatı'}
                    {selectedLanguage === 'en' && 'Starting from'}
                    {selectedLanguage === 'ru' && 'Начиная с'}
                    {selectedLanguage === 'de' && 'Ab'}
                    {selectedLanguage === 'ar' && 'ابتداء من'}
                    {selectedLanguage === 'fr' && 'À partir de'}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      ₺{transfer.pricing.economySedan}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₺{Math.round(transfer.pricing.economySedan / 0.88)}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-4">
                  {transfer.highlights[selectedLanguage].slice(0, 3).map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/transfers/${transfer.seo.slug[selectedLanguage]}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  {selectedLanguage === 'tr' && 'Detayları Gör'}
                  {selectedLanguage === 'en' && 'View Details'}
                  {selectedLanguage === 'ru' && 'Подробнее'}
                  {selectedLanguage === 'de' && 'Details ansehen'}
                  {selectedLanguage === 'ar' && 'عرض التفاصيل'}
                  {selectedLanguage === 'fr' && 'Voir les détails'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedLanguage === 'tr' && '7/24 Profesyonel Transfer Hizmeti'}
            {selectedLanguage === 'en' && '24/7 Professional Transfer Service'}
            {selectedLanguage === 'ru' && 'Профессиональный трансфер 24/7'}
            {selectedLanguage === 'de' && '24/7 Professioneller Transferservice'}
            {selectedLanguage === 'ar' && 'خدمة نقل احترافية على مدار 24/7'}
            {selectedLanguage === 'fr' && 'Service de transfert professionnel 24h/24'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {selectedLanguage === 'tr' && 'Anında onay • Ücretsiz iptal • En iyi fiyat garantisi'}
            {selectedLanguage === 'en' && 'Instant confirmation • Free cancellation • Best price guarantee'}
            {selectedLanguage === 'ru' && 'Мгновенное подтверждение • Бесплатная отмена • Гарантия лучшей цены'}
            {selectedLanguage === 'de' && 'Sofortige Bestätigung • Kostenlose Stornierung • Bestpreisgarantie'}
            {selectedLanguage === 'ar' && 'تأكيد فوري • إلغاء مجاني • ضمان أفضل سعر'}
            {selectedLanguage === 'fr' && 'Confirmation instantanée • Annulation gratuite • Garantie du meilleur prix'}
          </p>
        </div>
      </div>
    </>
  );
}
