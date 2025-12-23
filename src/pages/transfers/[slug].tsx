import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, Navigation, Star, Users, Shield,
  CheckCircle2, ArrowRight, Calendar, Phone, Mail,
  Car, ChevronRight, Home, TrendingDown, Globe
} from 'lucide-react';
import SimplifiedHeader from '@/components/layout/SimplifiedHeader';
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

export default function TransferDetailPage({ transfer, relatedTransfers }: TransferDetailPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('tr');
  const [selectedVehicle, setSelectedVehicle] = useState<keyof AntalyaTransferRoute['pricing']>('economySedan');

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
  const baseUrl = 'https://travel.ailydian.com';
  const currentUrl = `${baseUrl}/transfers/${currentSlug}`;

  // Generate hreflang tags
  const hreflangTags = generateHreflangTags(`${baseUrl}/transfers`, transfer.seo.slug);

  // Generate Schema.org structured data
  const schemaOrg = generateTransferSchemaOrg({
    from: transfer.from,
    to: transfer.to,
    price: transfer.pricing[selectedVehicle],
    currency: 'TRY',
    distance: transfer.distance,
    duration: transfer.duration,
    rating: transfer.rating,
    totalTransfers: transfer.totalTransfers,
    slug: transfer.seo.slug
  }, selectedLanguage);

  // Generate OpenGraph tags
  const ogTags = generateOpenGraphTags({
    title: transfer.seo.metaTitle,
    description: transfer.seo.metaDescription,
    images: transfer.images,
    url: currentUrl,
    type: 'website'
  }, selectedLanguage);

  // Generate Twitter Card tags
  const twitterTags = generateTwitterCardTags({
    title: transfer.seo.metaTitle,
    description: transfer.seo.metaDescription,
    images: transfer.images
  }, selectedLanguage);

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

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Language Selector Bar */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  {selectedLanguage === 'tr' && 'Ana Sayfa'}
                  {selectedLanguage === 'en' && 'Home'}
                  {selectedLanguage === 'ru' && 'Главная'}
                  {selectedLanguage === 'de' && 'Startseite'}
                  {selectedLanguage === 'ar' && 'الصفحة الرئيسية'}
                  {selectedLanguage === 'fr' && 'Accueil'}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/transfers" className="hover:text-blue-600 transition-colors">
                  {selectedLanguage === 'tr' && 'Transferler'}
                  {selectedLanguage === 'en' && 'Transfers'}
                  {selectedLanguage === 'ru' && 'Трансферы'}
                  {selectedLanguage === 'de' && 'Transfers'}
                  {selectedLanguage === 'ar' && 'النقل'}
                  {selectedLanguage === 'fr' && 'Transferts'}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">
                  {getLocalizedText(transfer.from, selectedLanguage)} → {getLocalizedText(transfer.to, selectedLanguage)}
                </span>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <div className="flex flex-wrap gap-2">
                  {Object.entries(languageLabels).map(([lang, { flag, name }]) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang as SupportedLanguage)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedLanguage === lang
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="mr-1">{flag}</span>
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {getLocalizedText(transfer.from, selectedLanguage)} → {getLocalizedText(transfer.to, selectedLanguage)}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-3xl">
                {getLocalizedText(transfer.description, selectedLanguage)}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Navigation className="w-8 h-8 mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">{transfer.distance} km</div>
                  <div className="text-sm text-blue-200">
                    {selectedLanguage === 'tr' && 'Mesafe'}
                    {selectedLanguage === 'en' && 'Distance'}
                    {selectedLanguage === 'ru' && 'Расстояние'}
                    {selectedLanguage === 'de' && 'Entfernung'}
                    {selectedLanguage === 'ar' && 'المسافة'}
                    {selectedLanguage === 'fr' && 'Distance'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Clock className="w-8 h-8 mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">{transfer.duration} dk</div>
                  <div className="text-sm text-blue-200">
                    {selectedLanguage === 'tr' && 'Süre'}
                    {selectedLanguage === 'en' && 'Duration'}
                    {selectedLanguage === 'ru' && 'Время'}
                    {selectedLanguage === 'de' && 'Dauer'}
                    {selectedLanguage === 'ar' && 'المدة'}
                    {selectedLanguage === 'fr' && 'Durée'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Star className="w-8 h-8 mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{transfer.rating}/5</div>
                  <div className="text-sm text-blue-200">
                    {selectedLanguage === 'tr' && 'Puan'}
                    {selectedLanguage === 'en' && 'Rating'}
                    {selectedLanguage === 'ru' && 'Рейтинг'}
                    {selectedLanguage === 'de' && 'Bewertung'}
                    {selectedLanguage === 'ar' && 'التقييم'}
                    {selectedLanguage === 'fr' && 'Note'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Users className="w-8 h-8 mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">{transfer.totalTransfers.toLocaleString()}+</div>
                  <div className="text-sm text-blue-200">
                    {selectedLanguage === 'tr' && 'Transfer'}
                    {selectedLanguage === 'en' && 'Transfers'}
                    {selectedLanguage === 'ru' && 'Трансферов'}
                    {selectedLanguage === 'de' && 'Transfers'}
                    {selectedLanguage === 'ar' && 'النقل'}
                    {selectedLanguage === 'fr' && 'Transferts'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {transfer.images.map((image, idx) => (
                  <div key={idx} className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={image}
                      alt={`${getLocalizedText(transfer.from, selectedLanguage)} - ${getLocalizedText(transfer.to, selectedLanguage)}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {selectedLanguage === 'tr' && 'Transfer Hakkında'}
                  {selectedLanguage === 'en' && 'About This Transfer'}
                  {selectedLanguage === 'ru' && 'О трансфере'}
                  {selectedLanguage === 'de' && 'Über diesen Transfer'}
                  {selectedLanguage === 'ar' && 'حول هذا النقل'}
                  {selectedLanguage === 'fr' && 'À propos de ce transfert'}
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {getLocalizedText(transfer.longDescription, selectedLanguage)}
                  </p>
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {selectedLanguage === 'tr' && 'Öne Çıkan Özellikler'}
                  {selectedLanguage === 'en' && 'Key Features'}
                  {selectedLanguage === 'ru' && 'Основные преимущества'}
                  {selectedLanguage === 'de' && 'Highlights'}
                  {selectedLanguage === 'ar' && 'الميزات الرئيسية'}
                  {selectedLanguage === 'fr' && 'Caractéristiques principales'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {transfer.highlights[selectedLanguage].map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Route Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {selectedLanguage === 'tr' && 'Rota Haritası'}
                  {selectedLanguage === 'en' && 'Route Map'}
                  {selectedLanguage === 'ru' && 'Карта маршрута'}
                  {selectedLanguage === 'de' && 'Routenkarte'}
                  {selectedLanguage === 'ar' && 'خريطة الطريق'}
                  {selectedLanguage === 'fr' && 'Carte de l\'itinéraire'}
                </h2>
                <div className="relative w-full h-96 bg-slate-100 rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(getLocalizedText(transfer.from, 'en'))}&destination=${encodeURIComponent(getLocalizedText(transfer.to, 'en'))}&mode=driving`}
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/${encodeURIComponent(getLocalizedText(transfer.from, 'en'))}/${encodeURIComponent(getLocalizedText(transfer.to, 'en'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-5 h-5" />
                    {selectedLanguage === 'tr' && 'Yol Tarifi Al'}
                    {selectedLanguage === 'en' && 'Get Directions'}
                    {selectedLanguage === 'ru' && 'Получить маршрут'}
                    {selectedLanguage === 'de' && 'Route abrufen'}
                    {selectedLanguage === 'ar' && 'احصل على الاتجاهات'}
                    {selectedLanguage === 'fr' && 'Obtenir l\'itinéraire'}
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
                className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24"
              >
                {/* Price Badge */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl mb-6 flex items-center justify-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-bold">
                    {selectedLanguage === 'tr' && '%12 Daha Ucuz'}
                    {selectedLanguage === 'en' && '12% Cheaper'}
                    {selectedLanguage === 'ru' && 'На 12% дешевле'}
                    {selectedLanguage === 'de' && '12% günstiger'}
                    {selectedLanguage === 'ar' && 'أرخص بنسبة 12%'}
                    {selectedLanguage === 'fr' && '12% moins cher'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
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
                    <button
                      key={vehicleType}
                      onClick={() => setSelectedVehicle(vehicleType as keyof AntalyaTransferRoute['pricing'])}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedVehicle === vehicleType
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Car className={`w-5 h-5 ${selectedVehicle === vehicleType ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className={`font-semibold text-sm ${selectedVehicle === vehicleType ? 'text-blue-900' : 'text-slate-700'}`}>
                            {vehicleLabels[vehicleType as keyof typeof vehicleLabels][selectedLanguage]}
                          </span>
                        </div>
                        {selectedVehicle === vehicleType && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-slate-900">
                        ₺{price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Price Display */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">
                      {selectedLanguage === 'tr' && 'Toplam Fiyat'}
                      {selectedLanguage === 'en' && 'Total Price'}
                      {selectedLanguage === 'ru' && 'Общая стоимость'}
                      {selectedLanguage === 'de' && 'Gesamtpreis'}
                      {selectedLanguage === 'ar' && 'السعر الإجمالي'}
                      {selectedLanguage === 'fr' && 'Prix total'}
                    </span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-900">
                        ₺{transfer.pricing[selectedVehicle].toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                  <Calendar className="w-6 h-6" />
                  {selectedLanguage === 'tr' && 'Hemen Rezervasyon Yap'}
                  {selectedLanguage === 'en' && 'Book Now'}
                  {selectedLanguage === 'ru' && 'Забронировать сейчас'}
                  {selectedLanguage === 'de' && 'Jetzt buchen'}
                  {selectedLanguage === 'ar' && 'احجز الآن'}
                  {selectedLanguage === 'fr' && 'Réserver maintenant'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    {selectedLanguage === 'tr' && 'Ücretsiz İptal - 24 Saat Öncesine Kadar'}
                    {selectedLanguage === 'en' && 'Free Cancellation - Up to 24 Hours'}
                    {selectedLanguage === 'ru' && 'Бесплатная отмена - До 24 часов'}
                    {selectedLanguage === 'de' && 'Kostenlose Stornierung - Bis 24 Stunden'}
                    {selectedLanguage === 'ar' && 'إلغاء مجاني - حتى 24 ساعة'}
                    {selectedLanguage === 'fr' && 'Annulation gratuite - Jusqu\'à 24 heures'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    {selectedLanguage === 'tr' && 'Anında Onay - E-posta ile Voucher'}
                    {selectedLanguage === 'en' && 'Instant Confirmation - Email Voucher'}
                    {selectedLanguage === 'ru' && 'Мгновенное подтверждение - Ваучер по email'}
                    {selectedLanguage === 'de' && 'Sofortige Bestätigung - E-Mail-Gutschein'}
                    {selectedLanguage === 'ar' && 'تأكيد فوري - قسيمة بالبريد الإلكتروني'}
                    {selectedLanguage === 'fr' && 'Confirmation instantanée - Bon par email'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="w-5 h-5 text-green-600" />
                    {selectedLanguage === 'tr' && '7/24 Müşteri Desteği'}
                    {selectedLanguage === 'en' && '24/7 Customer Support'}
                    {selectedLanguage === 'ru' && 'Поддержка 24/7'}
                    {selectedLanguage === 'de' && '24/7 Kundendienst'}
                    {selectedLanguage === 'ar' && 'دعم العملاء على مدار الساعة'}
                    {selectedLanguage === 'fr' && 'Support client 24/7'}
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-3">
                    {selectedLanguage === 'tr' && 'Sorularınız mı var?'}
                    {selectedLanguage === 'en' && 'Have questions?'}
                    {selectedLanguage === 'ru' && 'Есть вопросы?'}
                    {selectedLanguage === 'de' && 'Haben Sie Fragen?'}
                    {selectedLanguage === 'ar' && 'هل لديك أسئلة؟'}
                    {selectedLanguage === 'fr' && 'Vous avez des questions?'}
                  </p>
                  <div className="space-y-2">
                    <a href="tel:+905551234567" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      <Phone className="w-4 h-4" />
                      +90 555 123 45 67
                    </a>
                    <a href="mailto:transfer@ailydian.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      <Mail className="w-4 h-4" />
                      transfer@ailydian.com
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                {selectedLanguage === 'tr' && 'Benzer Transferler'}
                {selectedLanguage === 'en' && 'Related Transfers'}
                {selectedLanguage === 'ru' && 'Похожие трансферы'}
                {selectedLanguage === 'de' && 'Ähnliche Transfers'}
                {selectedLanguage === 'ar' && 'عمليات النقل ذات الصلة'}
                {selectedLanguage === 'fr' && 'Transferts similaires'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTransfers.map((relatedTransfer) => (
                  <Link
                    key={relatedTransfer.id}
                    href={`/transfers/${relatedTransfer.seo.slug[selectedLanguage]}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                      <div className="relative h-48">
                        <Image
                          src={relatedTransfer.images[0]}
                          alt={`${getLocalizedText(relatedTransfer.from, selectedLanguage)} - ${getLocalizedText(relatedTransfer.to, selectedLanguage)}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {getLocalizedText(relatedTransfer.from, selectedLanguage)} → {getLocalizedText(relatedTransfer.to, selectedLanguage)}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {getLocalizedText(relatedTransfer.description, selectedLanguage)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Navigation className="w-4 h-4" />
                              {relatedTransfer.distance} km
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {relatedTransfer.duration} dk
                            </span>
                          </div>
                          <div className="text-xl font-bold text-blue-600">
                            ₺{relatedTransfer.pricing.economySedan.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
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
  const transfer = antalyaAirportTransfers.find((t) =>
    Object.values(t.seo.slug).includes(slug)
  );

  if (!transfer) {
    return {
      notFound: true
    };
  }

  // Get related transfers (same category, different routes)
  const relatedTransfers = antalyaAirportTransfers
    .filter((t) => t.id !== transfer.id && t.category === transfer.category)
    .slice(0, 3);

  return {
    props: {
      transfer,
      relatedTransfers
    }
  };
};
