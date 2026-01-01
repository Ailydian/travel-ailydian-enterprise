import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Navigation,
  Star,
  Users,
  Shield,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  Car,
  ChevronRight,
  Home,
  TrendingDown,
  Globe,
  Zap,
  Heart,
  Share2,
  X
} from 'lucide-react';
import SimplifiedHeader from '@/components/layout/SimplifiedHeader';
import AnimatedCarIcon from '@/components/icons/AnimatedCarIcon';
import { antalyaAirportTransfers, AntalyaTransferRoute } from '@/data/antalya-transfers';
import {
  generateTransferSchemaOrg,
  generateHreflangTags,
  generateOpenGraphTags,
  generateTwitterCardTags,
  getLocalizedText,
  type SupportedLanguage
} from '@/utils/multilingualSEO';

interface TransferDetailPageProps {
  transfer: AntalyaTransferRoute;
  relatedTransfers: AntalyaTransferRoute[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const cardHoverVariants = {
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export default function TransferDetailPage({ transfer, relatedTransfers }: TransferDetailPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('tr');
  const [selectedVehicle, setSelectedVehicle] = useState<keyof AntalyaTransferRoute['pricing']>('economySedan');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Language labels
  const languageLabels = {
    tr: { flag: '🇹🇷', name: 'Türkçe' },
    en: { flag: '🇬🇧', name: 'English' },
    ru: { flag: '🇷🇺', name: 'Русский' },
    de: { flag: '🇩🇪', name: 'Deutsch' },
    ar: { flag: '🇸🇦', name: 'العربية' },
    fr: { flag: '🇫🇷', name: 'Français' }
  };

  // Vehicle labels in 6 languages
  const vehicleLabels: Record<keyof AntalyaTransferRoute['pricing'], Record<SupportedLanguage, string>> = {
    economySedan: {
      tr: 'Ekonomi Sedan (1-3 kişi)',
      en: 'Economy Sedan (1-3 pax)',
      ru: 'Эконом Седан (1-3 чел.)',
      de: 'Economy Limousine (1-3 Pers.)',
      ar: 'سيدان اقتصادي (1-3 أشخاص)',
      fr: 'Berline Économique (1-3 pers.)'
    },
    comfortSedan: {
      tr: 'Konfor Sedan (1-3 kişi)',
      en: 'Comfort Sedan (1-3 pax)',
      ru: 'Комфорт Седан (1-3 чел.)',
      de: 'Komfort Limousine (1-3 Pers.)',
      ar: 'سيدان مريح (1-3 أشخاص)',
      fr: 'Berline Confort (1-3 pers.)'
    },
    vipSedan: {
      tr: 'VIP Sedan (1-3 kişi)',
      en: 'VIP Sedan (1-3 pax)',
      ru: 'VIP Седан (1-3 чел.)',
      de: 'VIP Limousine (1-3 Pers.)',
      ar: 'سيدان في آي بي (1-3 أشخاص)',
      fr: 'Berline VIP (1-3 pers.)'
    },
    minivan: {
      tr: 'Minivan (1-7 kişi)',
      en: 'Minivan (1-7 pax)',
      ru: 'Минивэн (1-7 чел.)',
      de: 'Kleinbus (1-7 Pers.)',
      ar: 'ميني فان (1-7 أشخاص)',
      fr: 'Minibus (1-7 pers.)'
    },
    vipMinivan: {
      tr: 'VIP Minivan (1-7 kişi)',
      en: 'VIP Minivan (1-7 pax)',
      ru: 'VIP Минивэн (1-7 чел.)',
      de: 'VIP Kleinbus (1-7 Pers.)',
      ar: 'ميني فان في آي بي (1-7 أشخاص)',
      fr: 'Minibus VIP (1-7 pers.)'
    },
    minibus14: {
      tr: 'Minibüs 14 Kişilik',
      en: 'Minibus 14 Seats',
      ru: 'Микроавтобус 14 мест',
      de: 'Kleinbus 14 Sitze',
      ar: 'حافلة صغيرة 14 مقعد',
      fr: 'Minibus 14 Places'
    },
    minibus17: {
      tr: 'Minibüs 17 Kişilik',
      en: 'Minibus 17 Seats',
      ru: 'Микроавтобус 17 мест',
      de: 'Kleinbus 17 Sitze',
      ar: 'حافلة صغيرة 17 مقعد',
      fr: 'Minibus 17 Places'
    },
    vipSprinter: {
      tr: 'VIP Sprinter (17 kişi)',
      en: 'VIP Sprinter (17 pax)',
      ru: 'VIP Спринтер (17 чел.)',
      de: 'VIP Sprinter (17 Pers.)',
      ar: 'سبرينتر في آي بي (17 شخص)',
      fr: 'Sprinter VIP (17 pers.)'
    }
  };

  // Get current slug for this language
  const currentSlug = transfer.seo.slug[selectedLanguage];
  const baseUrl = 'https://holiday.ailydian.com';
  const currentUrl = `${baseUrl}/transfers/${currentSlug}`;

  // Generate hreflang tags
  const hreflangTags = generateHreflangTags(`${baseUrl}/transfers`, transfer.seo.slug);

  // Generate Schema.org structured data
  const schemaOrg = generateTransferSchemaOrg(
    {
      from: transfer.from,
      to: transfer.to,
      price: transfer.pricing[selectedVehicle],
      currency: 'TRY',
      distance: transfer.distance,
      duration: transfer.duration,
      rating: transfer.rating,
      totalTransfers: transfer.totalTransfers,
      slug: transfer.seo.slug
    },
    selectedLanguage
  );

  // Generate OpenGraph tags
  const ogTags = generateOpenGraphTags(
    {
      title: transfer.seo.metaTitle,
      description: transfer.seo.metaDescription,
      images: transfer.images,
      url: currentUrl,
      type: 'website'
    },
    selectedLanguage
  );

  // Generate Twitter Card tags
  const twitterTags = generateTwitterCardTags(
    {
      title: transfer.seo.metaTitle,
      description: transfer.seo.metaDescription,
      images: transfer.images
    },
    selectedLanguage
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getLocalizedText(transfer.from, selectedLanguage) + ' → ' + getLocalizedText(transfer.to, selectedLanguage),
          url: currentUrl
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{getLocalizedText(transfer.seo.metaTitle, selectedLanguage)}</title>
        <meta name="description" content={getLocalizedText(transfer.seo.metaDescription, selectedLanguage)} />
        <meta name="keywords" content={transfer.seo.keywords[selectedLanguage].join(', ')} />
        <link rel="canonical" href={currentUrl} />

        {/* Hreflang Tags */}
        {hreflangTags.map((tag, idx) => (
          <link key={idx} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content={ogTags.title} />
        <meta property="og:description" content={ogTags.description} />
        <meta property="og:url" content={ogTags.url} />
        <meta property="og:type" content={ogTags.type} />
        <meta property="og:site_name" content={ogTags.siteName} />
        <meta property="og:locale" content={ogTags.locale} />
        {ogTags.images.map((img, idx) => (
          <meta key={idx} property="og:image" content={img.url} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterTags.cardType} />
        <meta name="twitter:title" content={twitterTags.title} />
        <meta name="twitter:description" content={twitterTags.description} />
        <meta name="twitter:site" content={twitterTags.site} />
        <meta name="twitter:creator" content={twitterTags.creator} />
        {twitterTags.images.map((img, idx) => (
          <meta key={idx} name="twitter:image" content={img} />
        ))}

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </Head>

      <SimplifiedHeader />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Language & Breadcrumb Bar */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  {selectedLanguage === 'tr' && 'Ana Sayfa'}
                  {selectedLanguage === 'en' && 'Home'}
                  {selectedLanguage === 'ru' && 'Главная'}
                  {selectedLanguage === 'de' && 'Startseite'}
                  {selectedLanguage === 'ar' && 'الصفحة الرئيسية'}
                  {selectedLanguage === 'fr' && 'Accueil'}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/transfers" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  {selectedLanguage === 'tr' && 'Transferler'}
                  {selectedLanguage === 'en' && 'Transfers'}
                  {selectedLanguage === 'ru' && 'Трансферы'}
                  {selectedLanguage === 'de' && 'Transfers'}
                  {selectedLanguage === 'ar' && 'النقل'}
                  {selectedLanguage === 'fr' && 'Transferts'}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {getLocalizedText(transfer.from, selectedLanguage)} → {getLocalizedText(transfer.to, selectedLanguage)}
                </span>
              </nav>

              {/* Language Toggle + Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <Globe className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {Object.entries(languageLabels).map(([lang, { flag, name }]) => (
                    <motion.button
                      key={lang}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedLanguage(lang as SupportedLanguage)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedLanguage === lang
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-1">{flag}</span>
                      {name}
                    </motion.button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-12 sm:py-16 lg:py-20"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {getLocalizedText(transfer.from, selectedLanguage)} → {getLocalizedText(transfer.to, selectedLanguage)}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-red-100 mb-6 max-w-3xl">
                {getLocalizedText(transfer.description, selectedLanguage)}
              </motion.p>

              {/* Quick Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Navigation className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-red-200" />
                  <div className="text-xl sm:text-2xl font-bold">{transfer.distance} km</div>
                  <div className="text-xs sm:text-sm text-red-200">
                    {selectedLanguage === 'tr' && 'Mesafe'}
                    {selectedLanguage === 'en' && 'Distance'}
                    {selectedLanguage === 'ru' && 'Расстояние'}
                    {selectedLanguage === 'de' && 'Entfernung'}
                    {selectedLanguage === 'ar' && 'المسافة'}
                    {selectedLanguage === 'fr' && 'Distance'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-red-200" />
                  <div className="text-xl sm:text-2xl font-bold">{transfer.duration} dk</div>
                  <div className="text-xs sm:text-sm text-red-200">
                    {selectedLanguage === 'tr' && 'Süre'}
                    {selectedLanguage === 'en' && 'Duration'}
                    {selectedLanguage === 'ru' && 'Время'}
                    {selectedLanguage === 'de' && 'Dauer'}
                    {selectedLanguage === 'ar' && 'المدة'}
                    {selectedLanguage === 'fr' && 'Durée'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-yellow-300" />
                  <div className="text-xl sm:text-2xl font-bold">{transfer.rating}/5</div>
                  <div className="text-xs sm:text-sm text-red-200">
                    {selectedLanguage === 'tr' && 'Puan'}
                    {selectedLanguage === 'en' && 'Rating'}
                    {selectedLanguage === 'ru' && 'Рейтинг'}
                    {selectedLanguage === 'de' && 'Bewertung'}
                    {selectedLanguage === 'ar' && 'التقييم'}
                    {selectedLanguage === 'fr' && 'Note'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-red-200" />
                  <div className="text-xl sm:text-2xl font-bold">{transfer.totalTransfers.toLocaleString()}+</div>
                  <div className="text-xs sm:text-sm text-red-200">
                    {selectedLanguage === 'tr' && 'Transfer'}
                    {selectedLanguage === 'en' && 'Transfers'}
                    {selectedLanguage === 'ru' && 'Трансферов'}
                    {selectedLanguage === 'de' && 'Transfers'}
                    {selectedLanguage === 'ar' && 'النقل'}
                    {selectedLanguage === 'fr' && 'Transferts'}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Animated Car Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-pink-900/20 p-8 sm:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px] rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
                <AnimatedCarIcon size="xl" />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedLanguage === 'tr' && 'Transfer Hakkında'}
                  {selectedLanguage === 'en' && 'About This Transfer'}
                  {selectedLanguage === 'ru' && 'О трансфере'}
                  {selectedLanguage === 'de' && 'Über diesen Transfer'}
                  {selectedLanguage === 'ar' && 'حول هذا النقل'}
                  {selectedLanguage === 'fr' && 'À propos de ce transfert'}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {getLocalizedText(transfer.longDescription, selectedLanguage)}
                  </p>
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {selectedLanguage === 'tr' && 'Öne Çıkan Özellikler'}
                  {selectedLanguage === 'en' && 'Key Features'}
                  {selectedLanguage === 'ru' && 'Основные преимущества'}
                  {selectedLanguage === 'de' && 'Highlights'}
                  {selectedLanguage === 'ar' && 'الميزات الرئيسية'}
                  {selectedLanguage === 'fr' && 'Caractéristiques principales'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {transfer.highlights[selectedLanguage].map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Route Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {selectedLanguage === 'tr' && 'Rota Haritası'}
                  {selectedLanguage === 'en' && 'Route Map'}
                  {selectedLanguage === 'ru' && 'Карта маршрута'}
                  {selectedLanguage === 'de' && 'Routenkarte'}
                  {selectedLanguage === 'ar' && 'خريطة الطريق'}
                  {selectedLanguage === 'fr' && "Carte de l'itinéraire"}
                </h2>
                <div className="relative w-full h-64 sm:h-96 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(
                      getLocalizedText(transfer.from, 'en')
                    )}&destination=${encodeURIComponent(getLocalizedText(transfer.to, 'en'))}&mode=driving`}
                  />
                </div>
                <div className="mt-4">
                  <a
                    href={`https://www.google.com/maps/dir/${encodeURIComponent(
                      getLocalizedText(transfer.from, 'en')
                    )}/${encodeURIComponent(getLocalizedText(transfer.to, 'en'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <Navigation className="w-5 h-5" />
                    {selectedLanguage === 'tr' && 'Yol Tarifi Al'}
                    {selectedLanguage === 'en' && 'Get Directions'}
                    {selectedLanguage === 'ru' && 'Получить маршрут'}
                    {selectedLanguage === 'de' && 'Route abrufen'}
                    {selectedLanguage === 'ar' && 'احصل على الاتجاهات'}
                    {selectedLanguage === 'fr' && "Obtenir l'itinéraire"}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sticky top-24 border border-gray-200 dark:border-gray-700"
              >
                {/* Price Badge */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl mb-6 flex items-center justify-center gap-2 shadow-lg">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-bold text-sm">
                    {selectedLanguage === 'tr' && '%12 Daha Ucuz'}
                    {selectedLanguage === 'en' && '12% Cheaper'}
                    {selectedLanguage === 'ru' && 'На 12% дешевле'}
                    {selectedLanguage === 'de' && '12% günstiger'}
                    {selectedLanguage === 'ar' && 'أرخص بنسبة 12%'}
                    {selectedLanguage === 'fr' && '12% moins cher'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedLanguage === 'tr' && 'Araç Seçimi'}
                  {selectedLanguage === 'en' && 'Select Vehicle'}
                  {selectedLanguage === 'ru' && 'Выберите автомобиль'}
                  {selectedLanguage === 'de' && 'Fahrzeug wählen'}
                  {selectedLanguage === 'ar' && 'اختر السيارة'}
                  {selectedLanguage === 'fr' && 'Sélectionner un véhicule'}
                </h3>

                {/* Vehicle Options */}
                <div className="space-y-3 mb-6">
                  {Object.entries(transfer.pricing).map(([vehicleType, price]) => (
                    <motion.button
                      key={vehicleType}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVehicle(vehicleType as keyof AntalyaTransferRoute['pricing'])}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedVehicle === vehicleType
                          ? 'border-red-600 bg-red-50 dark:bg-red-900/20 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Car className={`w-5 h-5 ${selectedVehicle === vehicleType ? 'text-red-600' : 'text-gray-400'}`} />
                          <span
                            className={`font-semibold text-sm ${
                              selectedVehicle === vehicleType ? 'text-red-900 dark:text-red-100' : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {vehicleLabels[vehicleType as keyof typeof vehicleLabels][selectedLanguage]}
                          </span>
                        </div>
                        {selectedVehicle === vehicleType && <CheckCircle2 className="w-5 h-5 text-red-600" />}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">₺{price.toLocaleString()}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Selected Price Display */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      {selectedLanguage === 'tr' && 'Toplam Fiyat'}
                      {selectedLanguage === 'en' && 'Total Price'}
                      {selectedLanguage === 'ru' && 'Общая стоимость'}
                      {selectedLanguage === 'de' && 'Gesamtpreis'}
                      {selectedLanguage === 'ar' && 'السعر الإجمالي'}
                      {selectedLanguage === 'fr' && 'Prix total'}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">₺{transfer.pricing[selectedVehicle].toLocaleString()}</div>
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-6 h-6" />
                  {selectedLanguage === 'tr' && 'Hemen Rezervasyon Yap'}
                  {selectedLanguage === 'en' && 'Book Now'}
                  {selectedLanguage === 'ru' && 'Забронировать сейчас'}
                  {selectedLanguage === 'de' && 'Jetzt buchen'}
                  {selectedLanguage === 'ar' && 'احجز الآن'}
                  {selectedLanguage === 'fr' && 'Réserver maintenant'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    {selectedLanguage === 'tr' && 'Ücretsiz İptal - 24 Saat Öncesine Kadar'}
                    {selectedLanguage === 'en' && 'Free Cancellation - Up to 24 Hours'}
                    {selectedLanguage === 'ru' && 'Бесплатная отмена - До 24 часов'}
                    {selectedLanguage === 'de' && 'Kostenlose Stornierung - Bis 24 Stunden'}
                    {selectedLanguage === 'ar' && 'إلغاء مجاني - حتى 24 ساعة'}
                    {selectedLanguage === 'fr' && "Annulation gratuite - Jusqu'à 24 heures"}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    {selectedLanguage === 'tr' && 'Anında Onay - E-posta ile Voucher'}
                    {selectedLanguage === 'en' && 'Instant Confirmation - Email Voucher'}
                    {selectedLanguage === 'ru' && 'Мгновенное подтверждение - Ваучер по email'}
                    {selectedLanguage === 'de' && 'Sofortige Bestätigung - E-Mail-Gutschein'}
                    {selectedLanguage === 'ar' && 'تأكيد فوري - قسيمة بالبريد الإلكتروني'}
                    {selectedLanguage === 'fr' && 'Confirmation instantanée - Bon par email'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    {selectedLanguage === 'tr' && '7/24 Müşteri Desteği'}
                    {selectedLanguage === 'en' && '24/7 Customer Support'}
                    {selectedLanguage === 'ru' && 'Поддержка 24/7'}
                    {selectedLanguage === 'de' && '24/7 Kundendienst'}
                    {selectedLanguage === 'ar' && 'دعم العملاء على مدار الساعة'}
                    {selectedLanguage === 'fr' && 'Support client 24/7'}
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-medium">
                    {selectedLanguage === 'tr' && 'Sorularınız mı var?'}
                    {selectedLanguage === 'en' && 'Have questions?'}
                    {selectedLanguage === 'ru' && 'Есть вопросы?'}
                    {selectedLanguage === 'de' && 'Haben Sie Fragen?'}
                    {selectedLanguage === 'ar' && 'هل لديك أسئلة؟'}
                    {selectedLanguage === 'fr' && 'Vous avez des questions?'}
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+905551234567"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      +90 555 123 45 67
                    </a>
                    <a
                      href="mailto:transfer@lydian.com"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      transfer@lydian.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Transfers */}
          {relatedTransfers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 sm:mt-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                {selectedLanguage === 'tr' && 'Benzer Transferler'}
                {selectedLanguage === 'en' && 'Related Transfers'}
                {selectedLanguage === 'ru' && 'Похожие трансферы'}
                {selectedLanguage === 'de' && 'Ähnliche Transfers'}
                {selectedLanguage === 'ar' && 'عمليات النقل ذات الصلة'}
                {selectedLanguage === 'fr' && 'Transferts similaires'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedTransfers.map((relatedTransfer, idx) => (
                  <motion.div
                    key={relatedTransfer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    variants={cardHoverVariants}
                    whileHover="hover"
                  >
                    <Link href={`/transfers/${relatedTransfer.seo.slug[selectedLanguage]}`} className="group block">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700">
                        <div className="relative h-40 sm:h-48">
                          <Image
                            src={relatedTransfer.images[0]}
                            alt={`${getLocalizedText(relatedTransfer.from, selectedLanguage)} - ${getLocalizedText(
                              relatedTransfer.to,
                              selectedLanguage
                            )}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {getLocalizedText(relatedTransfer.from, selectedLanguage)} →{' '}
                            {getLocalizedText(relatedTransfer.to, selectedLanguage)}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {getLocalizedText(relatedTransfer.description, selectedLanguage)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Navigation className="w-4 h-4" />
                                {relatedTransfer.distance} km
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {relatedTransfer.duration} dk
                              </span>
                            </div>
                            <div className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                              ₺{relatedTransfer.pricing.economySedan.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedLanguage === 'tr' && 'Paylaş'}
                  {selectedLanguage === 'en' && 'Share'}
                  {selectedLanguage === 'ru' && 'Поделиться'}
                  {selectedLanguage === 'de' && 'Teilen'}
                  {selectedLanguage === 'ar' && 'شارك'}
                  {selectedLanguage === 'fr' && 'Partager'}
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
                <input type="text" value={currentUrl} readOnly className="w-full bg-transparent text-sm text-gray-600 dark:text-gray-300 select-all" />
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);
                  setShowShareModal(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {selectedLanguage === 'tr' && 'Linki Kopyala'}
                {selectedLanguage === 'en' && 'Copy Link'}
                {selectedLanguage === 'ru' && 'Скопировать ссылку'}
                {selectedLanguage === 'de' && 'Link kopieren'}
                {selectedLanguage === 'ar' && 'نسخ الرابط'}
                {selectedLanguage === 'fr' && 'Copier le lien'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: { slug: string } }> = [];

  // Generate paths for all transfers in all 6 languages
  antalyaAirportTransfers.forEach((transfer) => {
    Object.entries(transfer.seo.slug).forEach(([lang, slug]) => {
      paths.push({
        params: { slug }
      });
    });
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<TransferDetailPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  // Find transfer by slug in any language
  const transfer = antalyaAirportTransfers.find((t) => Object.values(t.seo.slug).includes(slug));

  if (!transfer) {
    return {
      notFound: true
    };
  }

  // Get related transfers (same category, different routes)
  const relatedTransfers = antalyaAirportTransfers.filter((t) => t.id !== transfer.id && t.category === transfer.category).slice(0, 3);

  return {
    props: {
      transfer,
      relatedTransfers
    }
  };
};
