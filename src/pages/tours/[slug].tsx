/**
 * Tour Detail Page - REFACTORED & MODERN
 * Uses ProductHero, BookingWidget, FeatureGrid, ReviewSection
 * Design: Lydian glassmorphism (Blue/Purple - NO RED)
 * Fully i18n enabled, SEO optimized, production-ready
 */

import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  Users,
  Shield,
  CheckCircle,
  Phone,
  Star,
  Zap,
  Award,
  Globe,
  Navigation,
  Calendar,
  Utensils,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ModernHeader } from '@/components/layout/ModernHeader';
import { ProductHero, BookingWidget, FeatureGrid, ReviewSection } from '@/components/products';
import { allComprehensiveTours, ComprehensiveTour } from '@/data/marmaris-bodrum-cesme-tours';
import { antalyaTours } from '@/data/antalya-tours';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Combine all tours
const allTours = [...antalyaTours, ...allComprehensiveTours];

interface TourDetailPageProps {
  tour: ComprehensiveTour;
}

export default function TourDetailPage({ tour }: TourDetailPageProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [expandedDay, setExpandedDay] = React.useState<number | null>(null);

  // Generate itinerary based on tour data
  const generateItinerary = () => {
    const baseItinerary = [
      {
        time: '09:00',
        title: t('tour.itinerary.start') || 'Başlangıç',
        description: tour.meetingPoint,
        icon: MapPin
      },
      {
        time: '12:00',
        title: t('tour.itinerary.lunch') || 'Öğle Arası',
        description: t('tour.itinerary.lunchDesc') || 'Öğle yemeği ve dinlenme',
        icon: Utensils
      },
      {
        time: tour.duration.includes('8') ? '17:00' : '15:00',
        title: t('tour.itinerary.end') || 'Bitiş',
        description: t('tour.itinerary.endDesc') || 'Tur sonu ve dönüş',
        icon: MapPin
      }
    ];
    return baseItinerary;
  };

  const itinerary = generateItinerary();

  // Handle booking
  const handleBook = (bookingData: any) => {
    router.push({
      pathname: '/checkout',
      query: {
        type: 'tour',
        id: tour.id,
        slug: tour.slug,
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
      title: t('reviews.excellent') || 'Mükemmel bir deneyim!',
      text: `${tour.name} gerçekten harikaydı! ${tour.highlights[0]}. Rehberimiz çok bilgiliydi ve her şey mükemmel organize edilmişti.`,
      helpful: 127,
      verified: true
    },
    {
      id: '2',
      author: 'Ayşe Demir',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayse',
      rating: 5,
      date: '2024-12-10',
      title: t('reviews.recommend') || 'Kesinlikle tavsiye ederim',
      text: 'Fiyat/performans oranı çok iyi. Her şey açıklandığı gibi. Ailecek çok keyifli vakit geçirdik.',
      helpful: 89,
      verified: true
    }
  ];

  // Generate schema.org data
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.description,
    image: tour.images,
    offers: {
      '@type': 'Offer',
      price: tour.pricing.travelLyDian,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: `https://holiday.ailydian.com/tours/${tour.slug}`,
      validFrom: new Date().toISOString()
    },
    provider: {
      '@type': 'Organization',
      name: 'AILYDIAN Holiday',
      url: 'https://holiday.ailydian.com'
    },
    duration: tour.duration,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    location: {
      '@type': 'Place',
      name: tour.region,
      address: {
        '@type': 'PostalAddress',
        addressLocality: tour.region,
        addressCountry: 'TR'
      }
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('breadcrumb.home') || 'Ana Sayfa',
        item: 'https://holiday.ailydian.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('breadcrumb.tours') || 'Turlar',
        item: 'https://holiday.ailydian.com/tours'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tour.name,
        item: `https://holiday.ailydian.com/tours/${tour.slug}`
      }
    ]
  };

  // Hreflang tags (8 languages)
  const languages = ['tr', 'en', 'ru', 'de', 'ar', 'fr', 'es', 'zh'];
  const baseUrl = 'https://holiday.ailydian.com';

  return (
    <>
      <Head>
        <title>{tour.seo.metaTitle}</title>
        <meta name="description" content={tour.seo.metaDescription} />
        <meta name="keywords" content={tour.seo.keywords.join(', ')} />
        <link rel="canonical" href={`${baseUrl}/${router.locale}/tours/${tour.slug}`} />

        {/* Hreflang tags */}
        {languages.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${baseUrl}/${lang}/tours/${tour.slug}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en/tours/${tour.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={tour.seo.metaTitle} />
        <meta property="og:description" content={tour.seo.metaDescription} />
        <meta property="og:url" content={`${baseUrl}/${router.locale}/tours/${tour.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AILYDIAN Holiday" />
        <meta property="og:locale" content={router.locale || 'tr_TR'} />
        {tour.images.map((img, idx) => (
          <meta key={idx} property="og:image" content={img} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tour.seo.metaTitle} />
        <meta name="twitter:description" content={tour.seo.metaDescription} />
        <meta name="twitter:site" content="@lydian" />
        <meta name="twitter:creator" content="@lydian" />
        {tour.images.slice(0, 1).map((img, idx) => (
          <meta key={idx} name="twitter:image" content={img} />
        ))}

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* ProductHero Component */}
        <ProductHero
          title={tour.name}
          location={tour.region}
          rating={tour.rating}
          reviewCount={tour.reviewCount}
          images={tour.images}
          badges={[
            tour.rating >= 4.7 ? { text: '2024 Excellence Award', icon: <Award className="w-4 h-4" />, color: 'warning' } : null,
            { text: t('badges.instantConfirmation') || 'Anında Onay', icon: <Zap className="w-4 h-4" />, color: 'primary' },
            tour.pricing.savingsPercentage >= 15 ? { text: t('badges.highDiscount') || 'En Çok İndirim', icon: <Award className="w-4 h-4" />, color: 'warning' } : null
          ].filter(Boolean) as any}
          breadcrumbs={[
            { label: t('breadcrumb.tours') || 'Turlar', href: '/tours' },
            { label: tour.region, href: `/tours?region=${tour.region}` }
          ]}
          productType="tour"
          stats={[
            { icon: <Clock className="w-6 h-6" />, label: t('stats.duration') || 'Süre', value: tour.duration },
            { icon: <Users className="w-6 h-6" />, label: t('stats.groupSize') || 'Grup', value: `Max ${tour.maxGroupSize}` },
            { icon: <Globe className="w-6 h-6" />, label: t('stats.language') || 'Dil', value: 'TR, EN' },
            { icon: <Star className="w-6 h-6" />, label: t('stats.rating') || 'Puan', value: `${tour.rating}/5` }
          ]}
        />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                  {t('tour.description') || 'Açıklama'}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lydian-text-muted leading-relaxed whitespace-pre-line">
                    {tour.longDescription || tour.description}
                  </p>
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <FeatureGrid
                  title={t('tour.highlights') || 'Öne Çıkanlar'}
                  features={tour.highlights.map(h => ({
                    title: h,
                    included: true
                  }))}
                  columns={2}
                  variant="included"
                />
              </motion.div>

              {/* Itinerary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
                  {t('tour.itinerary.title') || 'Program'}
                </h2>
                <div className="space-y-4">
                  {itinerary.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lydian-primary to-lydian-accent-purple flex items-center justify-center text-lydian-text-inverse font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          {index !== itinerary.length - 1 && (
                            <div className="w-0.5 h-full bg-gradient-to-b from-lydian-primary to-lydian-accent-purple mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-lydian-primary-lighter text-lydian-primary rounded text-xs font-semibold">
                              {item.time}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-lydian-text-inverse mb-1 flex items-center gap-2">
                            <Icon className="w-5 h-5 text-lydian-primary" />
                            {item.title}
                          </h3>
                          <p className="text-lydian-text-muted">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Included / Excluded */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-lydian-border-light/20"
                >
                  <FeatureGrid
                    title={t('tour.included') || 'Dahil Olanlar'}
                    features={tour.included.map(item => ({
                      title: item,
                      included: true
                    }))}
                    columns={1}
                    variant="included"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-lydian-border-light/20"
                >
                  <FeatureGrid
                    title={t('tour.excluded') || 'Dahil Olmayanlar'}
                    features={tour.excluded.map(item => ({
                      title: item,
                      included: false
                    }))}
                    columns={1}
                    variant="excluded"
                  />
                </motion.div>
              </div>

              {/* Meeting Point */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h3 className="text-xl font-bold text-lydian-text-inverse mb-4 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-lydian-primary" />
                  {t('tour.meetingPoint') || 'Buluşma Noktası'}
                </h3>
                <p className="text-lydian-text-muted mb-4">{tour.meetingPoint}</p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(tour.meetingPoint + ', ' + tour.region)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <Navigation className="w-5 h-5" />
                  {t('tour.getDirections') || 'Yol Tarifi Al'}
                </a>
              </motion.div>

              {/* Reviews Section */}
              <ReviewSection
                reviews={reviews}
                averageRating={tour.rating}
                totalReviews={tour.reviewCount}
                maxReviews={2}
              />
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget
                basePrice={tour.pricing.travelLyDian}
                currency="TRY"
                priceLabel={t('pricing.perPerson') || 'kişi başı'}
                savingsPercentage={tour.pricing.savingsPercentage}
                originalPrice={tour.pricing.travelLyDian + tour.pricing.savings}
                productType="tour"
                requiresDate={true}
                requiresGuests={true}
                maxGuests={tour.maxGroupSize}
                badges={[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: tour.cancellationPolicy
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: t('badges.instantConfirmation') || 'Anında Onay - E-posta ile Voucher'
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    text: t('badges.support247') || '7/24 Müşteri Desteği'
                  }
                ]}
                cancellationPolicy={tour.cancellationPolicy}
                phone="+90 555 123 45 67"
                email="tours@lydian.com"
                onBook={handleBook}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allTours.map((tour) => ({
    params: { slug: tour.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<TourDetailPageProps> = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const tour = allTours.find((t) => t.slug === slug);

  if (!tour) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
      tour
    },
    revalidate: 3600
  };
};
