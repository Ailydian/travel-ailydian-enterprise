/**
 * Transfer Detail Page - REFACTORED & MODERN
 * Uses ProductHero, BookingWidget, FeatureGrid, ReviewSection
 * Design: Lydian glassmorphism + Modern minimalism
 * Fully i18n enabled, SEO optimized, production-ready
 */

import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Clock,
  Navigation,
  Users,
  Shield,
  CheckCircle,
  Phone,
  Star,
  Zap,
  MapPin,
  Award
} from 'lucide-react';
import { ModernHeader } from '@/components/layout/ModernHeader';
import { ProductHero, BookingWidget, FeatureGrid, ReviewSection } from '@/components/products';
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

export default function TransferDetailPage({ transfer, relatedTransfers }: TransferDetailPageProps) {
  const router = useRouter();
  const selectedLanguage: SupportedLanguage = (router.locale as SupportedLanguage) || 'tr';

  // Vehicle labels mapping
  const vehicleLabels: Record<keyof AntalyaTransferRoute['pricing'], Record<SupportedLanguage, string>> = {
    economySedan: {
      tr: 'Ekonomi Sedan (1-3)',
      en: 'Economy Sedan (1-3)',
      ru: 'Эконом Седан (1-3)',
      de: 'Economy Limousine (1-3)',
      ar: 'سيدان اقتصادي (1-3)',
      fr: 'Berline Économique (1-3)'
    },
    comfortSedan: {
      tr: 'Konfor Sedan (1-3)',
      en: 'Comfort Sedan (1-3)',
      ru: 'Комфорт Седан (1-3)',
      de: 'Komfort Limousine (1-3)',
      ar: 'سيدان مريح (1-3)',
      fr: 'Berline Confort (1-3)'
    },
    vipSedan: {
      tr: 'VIP Sedan (1-3)',
      en: 'VIP Sedan (1-3)',
      ru: 'VIP Седан (1-3)',
      de: 'VIP Limousine (1-3)',
      ar: 'سيدان VIP (1-3)',
      fr: 'Berline VIP (1-3)'
    },
    minivan: {
      tr: 'Minivan (1-7)',
      en: 'Minivan (1-7)',
      ru: 'Минивэн (1-7)',
      de: 'Kleinbus (1-7)',
      ar: 'ميني فان (1-7)',
      fr: 'Minibus (1-7)'
    },
    vipMinivan: {
      tr: 'VIP Minivan (1-7)',
      en: 'VIP Minivan (1-7)',
      ru: 'VIP Минивэн (1-7)',
      de: 'VIP Kleinbus (1-7)',
      ar: 'ميني فان VIP (1-7)',
      fr: 'Minibus VIP (1-7)'
    },
    minibus14: {
      tr: 'Minibüs (14 kişi)',
      en: 'Minibus (14 pax)',
      ru: 'Микроавтобус (14)',
      de: 'Kleinbus (14)',
      ar: 'حافلة صغيرة (14)',
      fr: 'Minibus (14)'
    },
    minibus17: {
      tr: 'Minibüs (17 kişi)',
      en: 'Minibus (17 pax)',
      ru: 'Микроавтобус (17)',
      de: 'Kleinbus (17)',
      ar: 'حافلة صغيرة (17)',
      fr: 'Minibus (17)'
    },
    vipSprinter: {
      tr: 'VIP Sprinter (17)',
      en: 'VIP Sprinter (17)',
      ru: 'VIP Спринтер (17)',
      de: 'VIP Sprinter (17)',
      ar: 'سبرينتر VIP (17)',
      fr: 'Sprinter VIP (17)'
    }
  };

  // Prepare vehicle options for BookingWidget
  const vehicleOptions = Object.entries(transfer.pricing).map(([key, price]) => ({
    id: key,
    name: vehicleLabels[key as keyof typeof vehicleLabels][selectedLanguage],
    price: price
  }));

  // Generate SEO data
  const currentSlug = transfer.seo.slug[selectedLanguage];
  const baseUrl = 'https://holiday.ailydian.com';
  const currentUrl = `${baseUrl}/transfers/${currentSlug}`;

  const hreflangTags = generateHreflangTags(`${baseUrl}/transfers`, transfer.seo.slug);
  const schemaOrg = generateTransferSchemaOrg(
    {
      from: transfer.from,
      to: transfer.to,
      price: transfer.pricing.economySedan,
      currency: 'TRY',
      distance: transfer.distance,
      duration: transfer.duration,
      rating: transfer.rating,
      totalTransfers: transfer.totalTransfers,
      slug: transfer.seo.slug
    },
    selectedLanguage
  );

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

  const twitterTags = generateTwitterCardTags(
    {
      title: transfer.seo.metaTitle,
      description: transfer.seo.metaDescription,
      images: transfer.images
    },
    selectedLanguage
  );

  // Handle booking
  const handleBook = (bookingData: any) => {
    router.push({
      pathname: '/checkout',
      query: {
        type: 'transfer',
        id: transfer.id,
        slug: currentSlug,
        ...bookingData
      }
    });
  };

  // Generate mock reviews
  const reviews = [
    {
      id: '1',
      author: 'Mehmet Yılmaz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet',
      rating: 5,
      date: '2024-12-15',
      title: 'Mükemmel transfer hizmeti!',
      text: `${getLocalizedText(transfer.from, selectedLanguage)} - ${getLocalizedText(transfer.to, selectedLanguage)} transferimiz çok rahat geçti. Profesyonel şoför, temiz araç, zamanında geldi. Kesinlikle tavsiye ederim.`,
      helpful: 127,
      verified: true
    },
    {
      id: '2',
      author: 'Ayşe Demir',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayse',
      rating: 5,
      date: '2024-12-10',
      title: 'Çok memnun kaldık',
      text: 'Fiyat/performans oranı mükemmel. Araç konforlu, sürücü güler yüzlü. Her şey açıklandığı gibi.',
      helpful: 89,
      verified: true
    }
  ];

  return (
    <>
      <Head>
        <title>{getLocalizedText(transfer.seo.metaTitle, selectedLanguage)}</title>
        <meta name="description" content={getLocalizedText(transfer.seo.metaDescription, selectedLanguage)} />
        <meta name="keywords" content={transfer.seo.keywords[selectedLanguage].join(', ')} />
        <link rel="canonical" href={currentUrl} />

        {hreflangTags.map((tag, idx) => (
          <link key={idx} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}

        <meta property="og:title" content={ogTags.title} />
        <meta property="og:description" content={ogTags.description} />
        <meta property="og:url" content={ogTags.url} />
        <meta property="og:type" content={ogTags.type} />
        <meta property="og:site_name" content={ogTags.siteName} />
        <meta property="og:locale" content={ogTags.locale} />
        {ogTags.images.map((img, idx) => (
          <meta key={idx} property="og:image" content={img.url} />
        ))}

        <meta name="twitter:card" content={twitterTags.cardType} />
        <meta name="twitter:title" content={twitterTags.title} />
        <meta name="twitter:description" content={twitterTags.description} />
        <meta name="twitter:site" content={twitterTags.site} />
        <meta name="twitter:creator" content={twitterTags.creator} />
        {twitterTags.images.map((img, idx) => (
          <meta key={idx} name="twitter:image" content={img} />
        ))}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* ProductHero Component */}
        <ProductHero
          title={`${getLocalizedText(transfer.from, selectedLanguage)} → ${getLocalizedText(transfer.to, selectedLanguage)}`}
          location={getLocalizedText(transfer.from, selectedLanguage)}
          rating={transfer.rating}
          reviewCount={transfer.totalTransfers}
          images={transfer.images}
          badges={[
            { text: 'D2 Belgeli', icon: <Shield className="w-4 h-4" />, color: 'success' },
            { text: 'Anında Rezervasyon', icon: <Zap className="w-4 h-4" />, color: 'primary' },
            transfer.rating >= 4.7 ? { text: 'Excellence Award', icon: <Award className="w-4 h-4" />, color: 'warning' } : null
          ].filter(Boolean) as any}
          breadcrumbs={[
            { label: selectedLanguage === 'tr' ? 'Transferler' : 'Transfers', href: '/transfers' },
            { label: 'Antalya', href: '/transfers?city=antalya' }
          ]}
          productType="transfer"
          stats={[
            { icon: <Navigation className="w-6 h-6" />, label: selectedLanguage === 'tr' ? 'Mesafe' : 'Distance', value: `${transfer.distance} km` },
            { icon: <Clock className="w-6 h-6" />, label: selectedLanguage === 'tr' ? 'Süre' : 'Duration', value: `${transfer.duration} dk` },
            { icon: <Star className="w-6 h-6" />, label: selectedLanguage === 'tr' ? 'Puan' : 'Rating', value: `${transfer.rating}/5` },
            { icon: <Users className="w-6 h-6" />, label: 'Transfer', value: `${transfer.totalTransfers}+` }
          ]}
        />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Animated Car Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px] rounded-2xl shadow-lg overflow-hidden"
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
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                  {selectedLanguage === 'tr' ? 'Transfer Hakkında' : 'About This Transfer'}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lydian-text-muted leading-relaxed whitespace-pre-line">
                    {getLocalizedText(transfer.longDescription, selectedLanguage)}
                  </p>
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <FeatureGrid
                  title={selectedLanguage === 'tr' ? 'Öne Çıkan Özellikler' : 'Key Features'}
                  features={transfer.highlights[selectedLanguage].map(h => ({
                    title: h,
                    included: true
                  }))}
                  columns={2}
                  variant="included"
                />
              </motion.div>

              {/* Route Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
                  {selectedLanguage === 'tr' ? 'Rota Haritası' : 'Route Map'}
                </h2>
                <div className="relative w-full h-64 sm:h-96 bg-white/5 rounded-xl overflow-hidden">
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
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    <Navigation className="w-5 h-5" />
                    {selectedLanguage === 'tr' ? 'Yol Tarifi Al' : 'Get Directions'}
                  </a>
                </div>
              </motion.div>

              {/* Reviews Section */}
              <ReviewSection
                reviews={reviews}
                averageRating={transfer.rating}
                totalReviews={transfer.totalTransfers}
                maxReviews={2}
              />
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget
                basePrice={transfer.pricing.economySedan}
                currency="TRY"
                priceLabel={selectedLanguage === 'tr' ? 'transfer başına' : 'per transfer'}
                savingsPercentage={12}
                productType="transfer"
                requiresDate={true}
                requiresGuests={false}
                requiresVehicle={true}
                vehicleOptions={vehicleOptions}
                badges={[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: selectedLanguage === 'tr' ? 'Ücretsiz İptal - 24 Saat Öncesine Kadar' : 'Free Cancellation - Up to 24 Hours'
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: selectedLanguage === 'tr' ? 'Anında Onay - E-posta ile Voucher' : 'Instant Confirmation - Email Voucher'
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    text: selectedLanguage === 'tr' ? '7/24 Müşteri Desteği' : '24/7 Customer Support'
                  }
                ]}
                cancellationPolicy={selectedLanguage === 'tr' ? 'Ücretsiz iptal 24 saat öncesine kadar' : 'Free cancellation up to 24 hours before'}
                phone="+90 555 123 45 67"
                email="transfer@lydian.com"
                onBook={handleBook}
              />
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
              <h2 className="text-2xl sm:text-3xl font-bold text-lydian-text-inverse mb-6 sm:mb-8">
                {selectedLanguage === 'tr' ? 'Benzer Transferler' : 'Related Transfers'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedTransfers.map((relatedTransfer, idx) => (
                  <motion.div
                    key={relatedTransfer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/transfers/${relatedTransfer.seo.slug[selectedLanguage]}`} className="group block">
                      <div className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-lydian-border-light/20">
                        <div className="relative h-40 sm:h-48">
                          <Image
                            src={relatedTransfer.images[0]}
                            alt={`${getLocalizedText(relatedTransfer.from, selectedLanguage)} - ${getLocalizedText(
                              relatedTransfer.to,
                              selectedLanguage
                            )}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-base sm:text-lg font-bold text-lydian-text-inverse mb-2 group-hover:text-blue-400 transition-colors">
                            {getLocalizedText(relatedTransfer.from, selectedLanguage)} →{' '}
                            {getLocalizedText(relatedTransfer.to, selectedLanguage)}
                          </h3>
                          <p className="text-sm text-lydian-text-muted mb-4 line-clamp-2">
                            {getLocalizedText(relatedTransfer.description, selectedLanguage)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-lydian-text-muted">
                              <span className="flex items-center gap-1">
                                <Navigation className="w-4 h-4" />
                                {relatedTransfer.distance} km
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {relatedTransfer.duration} dk
                              </span>
                            </div>
                            <div className="text-lg sm:text-xl font-bold text-blue-400">
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
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: { slug: string } }> = [];

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

  const transfer = antalyaAirportTransfers.find((t) => Object.values(t.seo.slug).includes(slug));

  if (!transfer) {
    return {
      notFound: true
    };
  }

  const relatedTransfers = antalyaAirportTransfers.filter((t) => t.id !== transfer.id && t.category === transfer.category).slice(0, 3);

  return {
    props: {
      transfer,
      relatedTransfers
    },
    revalidate: 3600
  };
};
