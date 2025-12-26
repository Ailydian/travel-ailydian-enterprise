import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  Clock,
  Car,
  Users,
  Star,
  TrendingDown,
  Plane,
  MapPin,
  DollarSign
} from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import antalyaAirportTransfers from '../data/antalya-transfers';
import { AnimatedCarIcon } from '../components/icons/AnimatedCarIcon';
import { TransferCarCard } from '../components/cards/TransferCarCard';
import { NeoHero, FuturisticCard, FuturisticButton } from '../components/neo-glass';
import { HorizontalScrollSection } from '../components/scroll/HorizontalScrollSection';
import { FuturisticFilter } from '../components/filters/FuturisticFilter';

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
        <title>Antalya Transfer Hizmetleri | En Uygun Fiyat Garantisi | LyDian Travel</title>
        <meta name="description" content="Antalya havalimanı ve şehir içi transfer hizmetleri. 6 dilde hizmet, 8 araç seçeneği, %12 daha ucuz garantili fiyat. 7/24 profesyonel transfer!" />
        <meta name="keywords" content="antalya transfer, havalimanı transfer, antalya airport transfer, özel transfer, vip transfer" />
        <link rel="canonical" href="https://travel.lydian.com/transfers" />

        {/* Open Graph */}
        <meta property="og:title" content="Antalya Transfer Hizmetleri | Best Price Guarantee" />
        <meta property="og:description" content="Professional transfer services in 6 languages. 8 vehicle options, 12% cheaper guaranteed!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travel.lydian.com/transfers" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Antalya Transfer Services" />
        <meta name="twitter:description" content="Professional transfers in 6 languages. Best price guaranteed!" />

        {/* Hreflang */}
        <link rel="alternate" hrefLang="tr-TR" href="https://travel.lydian.com/tr/transfers" />
        <link rel="alternate" hrefLang="en-US" href="https://travel.lydian.com/en/transfers" />
        <link rel="alternate" hrefLang="ru-RU" href="https://travel.lydian.com/ru/transfers" />
        <link rel="alternate" hrefLang="de-DE" href="https://travel.lydian.com/de/transfers" />
        <link rel="alternate" hrefLang="ar-SA" href="https://travel.lydian.com/ar/transfers" />
        <link rel="alternate" hrefLang="fr-FR" href="https://travel.lydian.com/fr/transfers" />
        <link rel="alternate" hrefLang="x-default" href="https://travel.lydian.com/en/transfers" />
      </Head>

      <FuturisticHeader />

      {/* 🎨 NEO-GLASS HERO */}
      <NeoHero
        title={
          selectedLanguage === 'tr' ? 'Antalya Transfer' :
          selectedLanguage === 'en' ? 'Antalya Transfers' :
          selectedLanguage === 'ru' ? 'Трансфер в Анталии' :
          selectedLanguage === 'de' ? 'Antalya Transfers' :
          selectedLanguage === 'ar' ? 'نقل أنطاليا' :
          'Transferts à Antalya'
        }
        subtitle={
          selectedLanguage === 'tr' ? 'Havalimanı ve şehir içi transferleriniz için %12 daha ucuz garantili fiyat!' :
          selectedLanguage === 'en' ? '12% cheaper guaranteed price for airport and city transfers!' :
          selectedLanguage === 'ru' ? 'На 12% дешевле гарантированная цена для трансферов!' :
          selectedLanguage === 'de' ? '12% günstigerer Garantiepreis für Transfers!' :
          selectedLanguage === 'ar' ? 'سعر مضمون أرخص بنسبة 12٪ للنقل!' :
          'Prix garanti 12% moins cher pour les transferts!'
        }
        gradient="ocean"
        height="75vh"
        overlayOpacity={0.15}
        showFloatingElements={true}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full mb-8">
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

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['tr', 'en', 'ru', 'de', 'ar', 'fr'].map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setSelectedLanguage(lang as any)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                selectedLanguage === lang
                  ? 'bg-white/5 text-[#00BAFF] shadow-lg'
                  : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {lang === 'tr' && '🇹🇷 TR'}
              {lang === 'en' && '🇬🇧 EN'}
              {lang === 'ru' && '🇷🇺 RU'}
              {lang === 'de' && '🇩🇪 DE'}
              {lang === 'ar' && '🇸🇦 AR'}
              {lang === 'fr' && '🇫🇷 FR'}
            </motion.button>
          ))}
        </div>

        {/* Stats Cards */}
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
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 cursor-default"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-white" />
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm uppercase tracking-widest text-white/80">{stat.label[selectedLanguage]}</div>
            </motion.div>
          ))}
        </div>
      </NeoHero>

      {/* 🎨 NEO-GLASS CATEGORY FILTER */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/30 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-br from-[#00BAFF] to-[#0088BD] text-white shadow-[0_10px_30px_-5px_rgba(0,186,255,0.4)]'
                    : 'bg-white/60 backdrop-blur-sm border border-gray-200 hover:bg-white/80 text-gray-200 shadow-sm'
                }`}
              >
                {cat.label[selectedLanguage]}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 🎨 NEO-GLASS TRANSFERS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransfers.map((transfer, idx) => {
            const minPrice = Math.min(
              transfer.pricing.economySedan,
              transfer.pricing.comfortSedan,
              transfer.pricing.minivan
            );

            // Get category label for the selected language
            let categoryLabel = '';
            if (transfer.category === 'airport') {
              categoryLabel = selectedLanguage === 'tr' ? 'Havalimanı' : 'Airport';
            } else if (transfer.category === 'city') {
              categoryLabel = selectedLanguage === 'tr' ? 'Şehir İçi' : 'City';
            } else if (transfer.category === 'district') {
              categoryLabel = selectedLanguage === 'tr' ? 'İlçeler Arası' : 'Districts';
            }

            // Get duration text
            const durationText = `${transfer.duration} ${selectedLanguage === 'tr' ? 'dk' : 'min'}`;
            const routeText = `${transfer.from[selectedLanguage]} → ${transfer.to[selectedLanguage]}`;

            return (
              <motion.div
                key={transfer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <FuturisticCard
                  title={transfer.seo.title[selectedLanguage]}
                  description={routeText}
                  price={`₺${minPrice}`}
                  badge={idx < 3 ? '⭐ POPÜLER' : undefined}
                  badges={categoryLabel ? [categoryLabel] : undefined}
                  metadata={[
                    { icon: <Clock className="w-4 h-4" />, label: durationText },
                    { icon: <Users className="w-4 h-4" />, label: `${transfer.maxPassengers} Kişi` },
                  ]}
                  rating={4.8}
                  reviews={Math.floor(Math.random() * 200) + 50}
                  onClick={() => window.location.href = `/transfers/${transfer.slug}`}
                  category="transfer"
                  categoryColor="#00BAFF"
                >
                  {/* Animated Car Icon */}
                  <div className="relative bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 rounded-2xl p-8 mb-4">
                    <AnimatedCarIcon size="lg" className="w-full max-w-xs mx-auto" />
                  </div>
                </FuturisticCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-16">
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
