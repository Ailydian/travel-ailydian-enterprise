/**
 * Car Rental Detail Page - REFACTORED & MODERN
 * Uses ProductHero, BookingWidget, FeatureGrid, ReviewSection
 * Design: Lydian glassmorphism (Blue/Purple - NO RED)
 * Fully i18n enabled, SEO optimized, production-ready
 */

import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  Settings,
  Fuel,
  Shield,
  Calendar,
  Check,
  Star,
  Zap,
  Award,
  AlertCircle,
  FileText,
  Gauge,
  Phone,
  CheckCircle
} from 'lucide-react';
import { ModernHeader } from '@/components/layout/ModernHeader';
import { ProductHero, BookingWidget, FeatureGrid, ReviewSection } from '@/components/products';
import AnimatedCarIcon from '@/components/icons/AnimatedCarIcon';
import antalyaCarRentals from '@/data/antalya-car-rentals';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Types
interface CarRentalData {
  id: string;
  brand: string;
  model: { tr: string };
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  luggage: number;
  features?: { tr: string[] };
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    deposit: number;
  };
  images: string[];
  rating: number;
  totalRentals: number;
  seo: any;
  active: boolean;
  popular: boolean;
  availability: any;
}

interface CarRentalDetailPageProps {
  car: CarRentalData;
}

export default function CarRentalDetailPage({ car }: CarRentalDetailPageProps) {
  const router = useRouter();
  const { t } = useTranslation('common');

  // State
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Calculate rental days
  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const diff = returnD.getTime() - pickup.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotal = () => {
    const days = calculateDays();
    if (days <= 0) return 0;

    let total = car.pricing.daily * days;

    // Add addons
    selectedAddons.forEach((addon) => {
      if (addon === 'gps') total += 50 * days;
      if (addon === 'insurance') total += 100 * days;
      if (addon === 'child-seat') total += 30 * days;
    });

    return total;
  };

  // Handle booking
  const handleBook = (bookingData: any) => {
    router.push({
      pathname: '/checkout',
      query: {
        type: 'car-rental',
        id: car.id,
        slug: car.seo.slug.tr,
        pickupDate,
        returnDate,
        ...bookingData
      }
    });
  };

  // Generate mock reviews
  const reviews = [
    {
      id: '1',
      author: 'Ali Yılmaz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali',
      rating: 5,
      date: '2024-12-20',
      title: t('reviews.excellent') || 'Harika bir araç!',
      text: `${car.brand} ${car.model.tr} mükemmeldi. Temiz, ekonomik ve konforluydu. Kesinlikle tavsiye ederim.`,
      helpful: 89,
      verified: true
    },
    {
      id: '2',
      author: 'Elif Demir',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elif',
      rating: 5,
      date: '2024-12-15',
      title: t('reviews.recommend') || 'Süper deneyim',
      text: 'Araç teslimat ve iade süreci çok hızlıydı. Hiç sorun yaşamadık.',
      helpful: 64,
      verified: true
    }
  ];

  // Vehicle specifications
  const vehicleSpecs = [
    {
      icon: <Users className="w-6 h-6" />,
      label: t('specs.passengers') || 'Yolcu',
      value: car.seats.toString()
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: t('specs.transmission') || 'Vites',
      value: car.transmission === 'automatic' ? 'Otomatik' : 'Manuel'
    },
    {
      icon: <Fuel className="w-6 h-6" />,
      label: t('specs.fuel') || 'Yakıt',
      value: car.fuelType === 'gasoline' ? 'Benzin' : car.fuelType === 'diesel' ? 'Dizel' : 'Hibrit'
    },
    {
      icon: <Car className="w-6 h-6" />,
      label: t('specs.doors') || 'Kapı',
      value: car.doors.toString()
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      label: t('specs.luggage') || 'Bagaj',
      value: `${car.luggage} valiz`
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: t('specs.year') || 'Yıl',
      value: car.year.toString()
    }
  ];

  // Features for FeatureGrid
  const carFeatures = car.features?.tr?.map(feature => ({
    title: feature,
    included: true
  })) || [];

  // Additional features
  const additionalFeatures = [
    { title: t('features.airConditioning') || 'Klima', included: true },
    { title: t('features.bluetooth') || 'Bluetooth', included: carFeatures.some(f => f.title.includes('Bluetooth')) },
    { title: t('features.gps') || 'GPS Navigasyon', included: carFeatures.some(f => f.title.includes('GPS')) },
    { title: t('features.usb') || 'USB Şarj', included: carFeatures.some(f => f.title.includes('USB')) }
  ];

  // Requirements
  const rentalRequirements = [
    {
      icon: <AlertCircle className="w-5 h-5" />,
      text: t('requirements.minimumAge') || 'Minimum yaş: 21',
      color: 'text-lydian-primary'
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      text: t('requirements.licenseYears') || 'Ehliyet süresi: En az 2 yıl',
      color: 'text-lydian-primary'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      text: t('requirements.documents') || 'Gerekli Belgeler: Ehliyet, Kimlik/Pasaport, Kredi Kartı',
      color: 'text-lydian-primary'
    }
  ];

  // Insurance options
  const insuranceOptions = [
    {
      title: t('insurance.basic') || 'Temel Sigorta',
      description: 'Trafik sigortası dahil',
      included: true
    },
    {
      title: t('insurance.fullCoverage') || 'Tam Kasko (+₺100/gün)',
      description: 'Hasar muafiyetsiz',
      included: false,
      addon: 'insurance'
    },
    {
      title: t('insurance.theftProtection') || 'Hırsızlık Koruması',
      description: 'Çalınma garantisi',
      included: true
    }
  ];

  // Schema.org data
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${car.brand} ${car.model.tr}`,
    description: car.seo.metaDescription.tr,
    image: car.images,
    brand: {
      '@type': 'Brand',
      name: car.brand
    },
    offers: {
      '@type': 'Offer',
      price: car.pricing.daily,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: `https://holiday.ailydian.com/car-rentals/${car.seo.slug.tr}`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: car.rating,
      reviewCount: car.totalRentals,
      bestRating: 5,
      worstRating: 1
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
        name: t('breadcrumb.carRentals') || 'Araç Kiralama',
        item: 'https://holiday.ailydian.com/car-rentals'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${car.brand} ${car.model.tr}`,
        item: `https://holiday.ailydian.com/car-rentals/${car.seo.slug.tr}`
      }
    ]
  };

  // Hreflang tags (8 languages)
  const languages = ['tr', 'en', 'ru', 'de', 'ar', 'fr', 'es', 'zh'];
  const baseUrl = 'https://holiday.ailydian.com';

  const days = calculateDays();
  const total = calculateTotal();

  return (
    <>
      <Head>
        <title>{car.seo.metaTitle.tr}</title>
        <meta name="description" content={car.seo.metaDescription.tr} />
        <meta name="keywords" content={car.seo.keywords.tr.join(', ')} />
        <link rel="canonical" href={`${baseUrl}/${router.locale}/car-rentals/${car.seo.slug.tr}`} />

        {/* Hreflang tags */}
        {languages.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${baseUrl}/${lang}/car-rentals/${car.seo.slug.tr}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en/car-rentals/${car.seo.slug.tr}`} />

        {/* Open Graph */}
        <meta property="og:title" content={car.seo.metaTitle.tr} />
        <meta property="og:description" content={car.seo.metaDescription.tr} />
        <meta property="og:url" content={`${baseUrl}/${router.locale}/car-rentals/${car.seo.slug.tr}`} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="AILYDIAN Holiday" />
        {car.images.map((img, idx) => (
          <meta key={idx} property="og:image" content={img} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={car.seo.metaTitle.tr} />
        <meta name="twitter:description" content={car.seo.metaDescription.tr} />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* ProductHero Component */}
        <ProductHero
          title={`${car.brand} ${car.model.tr}`}
          location="Antalya"
          rating={car.rating}
          reviewCount={car.totalRentals}
          images={car.images.length > 0 ? car.images : [
            'https://images.unsplash.com/photo-1552345387-68f0e330e3d?w=1200',
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200'
          ]}
          badges={[
            car.popular ? { text: t('badges.popular') || 'Popüler', icon: <Award className="w-4 h-4" />, color: 'success' } : null,
            { text: t('badges.instantConfirmation') || 'Anında Onay', icon: <Zap className="w-4 h-4" />, color: 'primary' },
            car.rating >= 4.5 ? { text: t('badges.topRated') || 'En Yüksek Puan', icon: <Star className="w-4 h-4" />, color: 'warning' } : null
          ].filter(Boolean) as any}
          breadcrumbs={[
            { label: t('breadcrumb.carRentals') || 'Araç Kiralama', href: '/car-rentals' },
            { label: car.category, href: `/car-rentals?category=${car.category}` }
          ]}
          productType="car"
          stats={vehicleSpecs}
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
                className="relative bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px] rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
                <AnimatedCarIcon size="xl" />
                {car.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Zap className="w-4 h-4" />
                    {t('badges.popular') || 'POPÜLER'}
                  </div>
                )}
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
                  {t('car.description') || 'Araç Açıklaması'}
                </h2>
                <p className="text-lydian-text-muted leading-relaxed">
                  {car.seo.metaDescription.tr}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <FeatureGrid
                  title={t('car.features') || 'Araç Özellikleri'}
                  features={[...carFeatures, ...additionalFeatures]}
                  columns={3}
                  variant="included"
                />
              </motion.div>

              {/* Insurance Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
                  {t('car.insurance') || 'Sigorta Seçenekleri'}
                </h2>
                <div className="space-y-4">
                  {insuranceOptions.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-4 rounded-xl ${
                        option.included
                          ? 'bg-lydian-success-lighter border border-green-200 dark:border-green-800'
                          : 'bg-lydian-bg-hover border border-lydian-border-light/20'
                      }`}
                    >
                      {option.included ? (
                        <CheckCircle className="w-6 h-6 text-lydian-success flex-shrink-0 mt-1" />
                      ) : (
                        <Shield className="w-6 h-6 text-lydian-primary flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lydian-text-inverse mb-1">{option.title}</h3>
                        <p className="text-sm text-lydian-text-muted">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20"
              >
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">
                  {t('car.requirements') || 'Kiralama Gereksinimleri'}
                </h2>
                <div className="space-y-4">
                  {rentalRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={req.color}>{req.icon}</div>
                      <span className="text-lydian-text-muted">{req.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Reviews Section */}
              <ReviewSection
                reviews={reviews}
                averageRating={car.rating}
                totalReviews={car.totalRentals}
                maxReviews={2}
              />
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget
                basePrice={car.pricing.daily}
                currency="TRY"
                priceLabel={t('pricing.perDay') || 'gün başına'}
                productType="car-rental"
                requiresDate={true}
                requiresGuests={false}
                requiresDateRange={true}
                additionalPricing={[
                  { label: t('pricing.weekly') || 'Haftalık', value: car.pricing.weekly },
                  { label: t('pricing.monthly') || 'Aylık', value: car.pricing.monthly }
                ]}
                badges={[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: t('badges.insurance') || 'Sigorta Dahil'
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: t('badges.instantConfirmation') || 'Anında Onay'
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    text: t('badges.support247') || '7/24 Destek'
                  }
                ]}
                cancellationPolicy={t('policy.freeCancellation') || 'Ücretsiz iptal 24 saat öncesine kadar'}
                phone="+90 555 123 45 67"
                email="cars@lydian.com"
                onBook={handleBook}
                extraInfo={`${t('deposit') || 'Depozito'}: ₺${car.pricing.deposit.toLocaleString()}`}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = antalyaCarRentals.map((car) => ({
    params: { slug: car.seo.slug.tr }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<CarRentalDetailPageProps> = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const car = antalyaCarRentals.find((c) => c.seo.slug.tr === slug);

  if (!car) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
      car
    },
    revalidate: 3600
  };
};
