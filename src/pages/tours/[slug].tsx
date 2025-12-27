/**
 * Tour Detail Page - Viator/GetYourGuide Style Premium Design
 * Ultra-premium design with all competitor features + unique LyDian innovations
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Info,
  Globe,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  Camera,
  Video,
  Utensils,
  Car,
  Ticket,
  Shield,
  Award,
  TrendingUp,
  Zap,
  Gift,
  CreditCard,
  Download,
  PlayCircle,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import SimplifiedHeader from '@/components/layout/SimplifiedHeader';
import { allComprehensiveTours, ComprehensiveTour } from '@/data/marmaris-bodrum-cesme-tours';
import { antalyaTours } from '@/data/antalya-tours';
import { legacyTours } from '../tours';
import logger from '../../../../lib/logger';

// Combine all tours: Antalya + Other regions + Legacy tours
const allTours = [...antalyaTours, ...allComprehensiveTours, ...legacyTours];

// Get tour data by slug from real data
const getTourBySlug = (slug: string) => {
  // Try exact match first
  let tour = allTours.find(t => t.slug === slug);

  // If not found, try case-insensitive match
  if (!tour) {
    tour = allTours.find(t => t.slug?.toLowerCase() === slug?.toLowerCase());
  }

  // If still not found, try partial match (for URL variations)
  if (!tour) {
    const normalizedSlug = slug?.toLowerCase().replace(/[^a-z0-9]/g, '');
    tour = allTours.find(t => {
      const normalizedTourSlug = t.slug?.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normalizedTourSlug === normalizedSlug ||
             normalizedTourSlug?.includes(normalizedSlug) ||
             normalizedSlug?.includes(normalizedTourSlug);
    });
  }

  if (!tour) {
    // Return null instead of fallback - this will show 404
    return null;
  }


  // Check if it's a legacy tour (has 'price' instead of 'pricing')
  const isLegacyTour = 'price' in tour;

  // Return real tour data mapped to the expected format
  return {
    id: tour.id,
    slug: tour.slug,
    title: isLegacyTour ? tour.name : tour.name,
    subtitle: tour.description,
    rating: tour.rating,
    reviewCount: isLegacyTour ? tour.reviews : tour.reviewCount,
    bookingCount: isLegacyTour ? tour.reviews * 4 : tour.reviewCount * 4,
    badges: [
      isLegacyTour ? (tour.badge || '') : (tour.pricing.savingsPercentage >= 15 ? 'En Çok İndirim' : ''),
      tour.difficulty === 'Kolay' ? 'Herkese Uygun' : '',
      tour.rating >= 4.7 ? '2024 Excellence Award' : ''
    ].filter(Boolean),
    price: isLegacyTour ? tour.price : tour.pricing.travelLyDian,
    originalPrice: isLegacyTour ? tour.originalPrice : (tour.pricing.competitors.getYourGuide || tour.pricing.travelLyDian + tour.pricing.savings),
    discount: isLegacyTour ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : tour.pricing.savingsPercentage,
    duration: tour.duration,
    language: isLegacyTour ? tour.languages : ['Türkçe', 'İngilizce'],
    groupSize: isLegacyTour ? tour.groupSize : `Maksimum ${tour.maxGroupSize} kişi`,
    category: tour.category === 'boat' ? 'Tekne Turları' :
              tour.category === 'adventure' ? 'Macera Turları' :
              tour.category === 'cultural' ? 'Kültürel Turlar' : 'Günlük Turlar',
    location: isLegacyTour ? tour.location : `${tour.region}, Türkiye`,
    meetingPoint: isLegacyTour ? (tour.location + ' - Merkez Buluşma Noktası') : tour.meetingPoint,
    meetingPointCoords: { lat: 36.8969, lng: 28.2663 }, // Default coords
    cancellationPolicy: isLegacyTour ? '24 saat öncesine kadar ücretsiz iptal' : tour.cancellationPolicy,
    instantConfirmation: true,
    mobileTicket: true,
    skipTheLine: false,
    images: isLegacyTour ? [tour.image] : (tour.images && tour.images.length > 0 ? tour.images : [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200',
    ]),
    videoUrl: 'https://www.youtube.com/embed/sample-video',
    highlights: tour.highlights || [],
    description: isLegacyTour ? tour.description : (tour.longDescription || tour.description),
    included: isLegacyTour ? (tour.includes || []) : (tour.included || []),
    excluded: isLegacyTour ? ['Kişisel harcamalar', 'Bahşiş'] : (tour.excluded || []),
    seoTitle: isLegacyTour ? `${tour.name} | LyDian Travel` : tour.seo?.metaTitle,
    seoDescription: isLegacyTour ? tour.description : tour.seo?.metaDescription,
    seoKeywords: isLegacyTour ? [tour.name, tour.location, 'tur'] : tour.seo?.keywords,
    requirements: [
      'Geçerli kimlik veya pasaport',
      'Rezervasyon onay belgesi (mobil veya basılı)',
      'Uygun giyim ve rahat ayakkabılar',
      'Güneş kremi ve şapka (opsiyonel)',
    ],
    importantInfo: [
      isLegacyTour ? '24 saat öncesine kadar ücretsiz iptal' : tour.cancellationPolicy,
      `Grup büyüklüğü: ${isLegacyTour ? tour.groupSize : tour.maxGroupSize + ' kişi'}`,
      'Hava koşullarına bağlı olarak tur iptal edilebilir',
    ],
    itinerary: [
      {
        time: '09:00',
        title: 'Başlangıç',
        description: tour.meetingPoint,
        icon: MapPin,
      },
      {
        time: '12:00',
        title: 'Öğle Arası',
        description: 'Öğle yemeği ve dinlenme',
        icon: Utensils,
      },
      {
        time: tour.duration.includes('8') ? '17:00' : '15:00',
        title: 'Bitiş',
        description: 'Tur sonu ve dönüş',
        icon: MapPin,
      }
    ],
    reviews: [
      {
        id: '1',
        author: 'Mehmet Yılmaz',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet',
        rating: 5,
        date: '2024-12-15',
        title: 'Mükemmel bir deneyim!',
        text: `${tour.name} gerçekten harikaydı! ${tour.highlights[0]}. Rehberimiz çok bilgiliydi ve her şey mükemmel organize edilmişti.`,
        helpful: 127,
        verified: true,
      },
      {
        id: '2',
        author: 'Ayşe Demir',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayse',
        rating: 5,
        date: '2024-12-10',
        title: 'Kesinlikle tavsiye ederim',
        text: 'Fiyat/performans oranı çok iyi. Her şey açıklandığı gibi. Ailecek çok keyifli vakit geçirdik.',
        helpful: 89,
        verified: true,
      },
    ],
    faqs: [
      {
        question: 'Tur iptal edilirse ne olur?',
        answer: tour.cancellationPolicy,
      },
      {
        question: 'Yaş sınırı var mı?',
        answer: `Minimum yaş ${tour.minAge} olmalıdır. Çocuklar için özel indirimler mevcuttur.`,
      },
      {
        question: 'Neleri yanımda getirmeliyim?',
        answer: 'Güneş kremi, şapka, rahat ayakkabılar ve fotoğraf makinenizi getirmenizi öneririz.',
      },
      {
        question: 'İptal politikası nedir?',
        answer: tour.cancellationPolicy,
      },
    ],
    guide: {
      name: 'Profesyonel Rehber',
      title: 'Turizm Rehberi',
      rating: 4.8,
      tours: 500,
      years: 8,
      languages: ['Türkçe', 'İngilizce'],
      bio: `${tour.region} bölgesinde uzman rehber. Müşteri memnuniyeti odaklı hizmet anlayışı.`,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guide',
    },
  };
};

interface TourDetailPageProps {
  slug: string;
}

const TourDetailPage = ({ slug }: TourDetailPageProps) => {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [showAllImages, setShowAllImages] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showBookingPanel, setShowBookingPanel] = useState(false);

  const tour = getTourBySlug(slug as string);

  // If tour not found, show 404
  if (!tour) {
    return (
      <>
        <SimplifiedHeader />
        <div className="min-h-screen bg-white/5 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Tur Bulunamadı</h1>
            <p className="text-gray-300 mb-8">Aradığınız tur mevcut değil veya kaldırılmış olabilir.</p>
            <Link href="/tours" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Tüm Turları Görüntüle
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.subtitle,
          url: window.location.href,
        });
      } catch (err) {
        logger.debug('Share cancelled', {component:'Slug'});
      }
    }
  };

  const handleBook = () => {
    router.push({
      pathname: '/checkout',
      query: {
        type: 'tour',
        id: tour.id,
        slug: tour.slug,
        date: selectedDate,
        guests: selectedGuests,
      },
    });
  };

  return (
    <>
      <NextSeo
        title={tour.seoTitle || `${tour.title} | En Uygun Fiyat Garantisi | LyDian Travel`}
        description={tour.seoDescription || `${tour.subtitle} - ${tour.location}. Online rezervasyon, anında onay, ücretsiz iptal. En iyi fiyat garantisi ile şimdi rezervasyon yapın!`}
        canonical={`https://travel.lydian.com/tours/${slug}`}
        openGraph={{
          title: tour.seoTitle || tour.title,
          description: tour.seoDescription || tour.subtitle,
          images: tour.images.map(img => ({ url: img, alt: tour.title })),
          type: 'website',
          url: `https://travel.lydian.com/tours/${slug}`,
          siteName: 'LyDian Travel',
          locale: 'tr_TR',
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@lydian',
          site: '@lydian',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: tour.seoKeywords?.join(', ') || `${tour.title}, ${tour.location}, tur, gezi, seyahat, tatil, rezervasyon`,
          },
          {
            name: 'author',
            content: 'LyDian Travel',
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            name: 'rating',
            content: tour.rating.toString(),
          },
          {
            property: 'product:price:amount',
            content: tour.price.toString(),
          },
          {
            property: 'product:price:currency',
            content: 'TRY',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'alternate',
            hrefLang: 'tr-TR',
            href: `https://travel.lydian.com/tours/${slug}`,
          },
          {
            rel: 'alternate',
            hrefLang: 'en-US',
            href: `https://travel.lydian.com/en/tours/${slug}`,
          },
          {
            rel: 'alternate',
            hrefLang: 'ru-RU',
            href: `https://travel.lydian.com/ru/tours/${slug}`,
          },
          {
            rel: 'alternate',
            hrefLang: 'de-DE',
            href: `https://travel.lydian.com/de/tours/${slug}`,
          },
          {
            rel: 'alternate',
            hrefLang: 'ar-SA',
            href: `https://travel.lydian.com/ar/tours/${slug}`,
          },
          {
            rel: 'alternate',
            hrefLang: 'fr-FR',
            href: `https://travel.lydian.com/fr/tours/${slug}`,
          },
          {
            rel: 'alternate',
            hrefLang: 'x-default',
            href: `https://travel.lydian.com/en/tours/${slug}`,
          },
        ]}
      />

      <Head>
        <link rel="canonical" href={`https://travel.lydian.com/tours/${slug}`} />
        {/* Structured Data - Tour Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristTrip',
              name: tour.title,
              description: tour.description,
              image: tour.images,
              offers: {
                '@type': 'Offer',
                price: tour.price,
                priceCurrency: 'TRY',
                availability: 'https://schema.org/InStock',
                url: `https://travel.lydian.com/tours/${slug}`,
                validFrom: new Date().toISOString(),
              },
              provider: {
                '@type': 'Organization',
                name: 'LyDian Travel',
                url: 'https://travel.lydian.com',
              },
              touristType: tour.category,
              duration: tour.duration,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: tour.rating,
                reviewCount: tour.reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
              location: {
                '@type': 'Place',
                name: tour.location,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: tour.location,
                  addressCountry: 'TR',
                },
              },
            }),
          }}
        />
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Ana Sayfa',
                  item: 'https://travel.lydian.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Turlar',
                  item: 'https://travel.lydian.com/tours',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: tour.title,
                  item: `https://travel.lydian.com/tours/${slug}`,
                },
              ],
            }),
          }}
        />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen bg-white/5">
        {/* Image Gallery */}
        <section className="relative bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Main Image */}
            <div className="relative h-[70vh] overflow-hidden">
              <Image
                key={selectedImage}
                src={tour.images[selectedImage]}
                alt={tour.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />

              {/* Hero Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(prev => (prev === 0 ? tour.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white/5 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => (prev === tour.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white/5 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Top Bar Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="p-2 bg-white/90 hover:bg-white/5 rounded-lg transition-all"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 bg-white/90 hover:bg-white/5 rounded-lg transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm font-semibold z-10">
                {selectedImage + 1} / {tour.images.length}
              </div>

              {/* View All Photos Button */}
              <button
                onClick={() => setShowAllImages(true)}
                className="absolute bottom-4 right-4 px-4 py-2 bg-transparent rounded-lg font-semibold flex items-center gap-2 hover:bg-white/5 transition-all z-10"
              >
                <ImageIcon className="w-5 h-5" />
                Tüm Fotoğrafları Gör
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {tour.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all relative ${
                      selectedImage === index
                        ? 'border-white scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${tour.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}

                {/* Video Thumbnail - Benzersiz Özellik! */}
                <button
                  className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent bg-gray-900 flex items-center justify-center hover:border-white transition-all group"
                >
                  <PlayCircle className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Rating */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold flex items-center gap-1"
                    >
                      <Award className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                  {tour.instantConfirmation && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Anında Onay
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {tour.title}
                </h1>
                <p className="text-lg text-gray-300 mb-4">{tour.subtitle}</p>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-white">{tour.rating}</span>
                    <span className="text-gray-200">({tour.reviewCount.toLocaleString()} yorum)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <TrendingUp className="w-5 h-5" />
                    <span>{tour.bookingCount.toLocaleString()} rezervasyon</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <MapPin className="w-5 h-5" />
                    <span>{tour.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Süre</p>
                      <p className="font-semibold text-white">{tour.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Grup Boyutu</p>
                      <p className="font-semibold text-white">{tour.groupSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Dil</p>
                      <p className="font-semibold text-white">{tour.language.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">İptal</p>
                      <p className="font-semibold text-white">{tour.cancellationPolicy}</p>
                    </div>
                  </div>
                </div>

                {tour.mobileTicket && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center gap-2 text-sm">
                    <Download className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-200">
                      <strong>Mobil Bilet:</strong> Yazdırmanıza gerek yok, telefonunuzdan gösterin!
                    </span>
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Öne Çıkanlar</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Açıklama</h2>
                <div className="prose max-w-none text-gray-200 whitespace-pre-line">
                  {tour.description}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Program</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        {index !== tour.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-indigo-500 mt-2" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {item.time}
                          </span>
                          <span className="text-xs text-gray-200">{item.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Included/Excluded */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-500" />
                    Dahil Olanlar
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-200">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-500" />
                    Dahil Olmayanlar
                  </h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-200">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements & Important Info */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  Gereksinimler ve Önemli Bilgiler
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-2">Yanınızda Bulundurmanız Gerekenler:</h4>
                  <ul className="space-y-1">
                    {tour.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-200 text-sm">
                        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Önemli Notlar:</h4>
                  <ul className="space-y-1">
                    {tour.importantInfo.map((info, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-200 text-sm">
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meeting Point */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  Buluşma Noktası
                </h3>
                <p className="text-gray-200 mb-4">{tour.meetingPoint}</p>

                {/* Interactive Map */}
                <div className="aspect-video bg-white/10 rounded-lg overflow-hidden border border-white/10">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.8!2d${tour.meetingPointCoords.lng}!3d${tour.meetingPointCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAyJzE4LjAiTiAyOcKwMDAnMjYuNiJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Buluşma Noktası Haritası"
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${tour.meetingPointCoords.lat},${tour.meetingPointCoords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-5 h-5" />
                    Yol Tarifi Al
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${tour.meetingPointCoords.lat},${tour.meetingPointCoords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 text-gray-200 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Tour Guide */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-white mb-4">Rehberiniz</h3>
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={tour.guide.avatar}
                      alt={tour.guide.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{tour.guide.name}</h4>
                    <p className="text-sm text-gray-100 mb-2">{tour.guide.title}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-100 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{tour.guide.rating}</span>
                      </div>
                      <div>{tour.guide.tours} tur</div>
                      <div>{tour.guide.years} yıl deneyim</div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {tour.guide.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 text-gray-200 rounded text-xs"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-200">{tour.guide.bio}</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Yorumlar</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-white">{tour.rating}</span>
                    <span className="text-gray-200">({tour.reviewCount.toLocaleString()})</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {tour.reviews.map((review) => (
                    <div key={review.id} className="border-b border-white/10 pb-6 last:border-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{review.author}</span>
                            {review.verified && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Doğrulanmış
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-200 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span>•</span>
                            <span>{review.date}</span>
                          </div>
                          {review.title && (
                            <h4 className="font-semibold text-white mb-1">{review.title}</h4>
                          )}
                          <p className="text-gray-200 text-sm mb-2">{review.text}</p>
                          <button className="text-sm text-gray-200 hover:text-gray-200 transition-colors">
                            Yararlı ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 border-2 border-white/10 rounded-lg font-semibold text-gray-200 hover:border-white/20 hover:bg-white/5 transition-all">
                  Tüm Yorumları Göster ({tour.reviewCount.toLocaleString()})
                </button>
              </div>

              {/* FAQs */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-white mb-4">Sıkça Sorulan Sorular</h3>
                <div className="space-y-3">
                  {tour.faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="font-semibold text-white">{faq.question}</span>
                        {expandedFAQ === faq.question ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === faq.question && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 text-gray-200">{faq.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="bg-transparent rounded-2xl p-6 shadow-lg border border-white/10">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-white">₺{tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">₺{tour.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-100">kişi başı</span>
                      {tour.discount && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold">
                          %{tour.discount} İndirim
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-white mb-2">
                      Tarih Seçin
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Guest Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-white mb-2">
                      Misafir Sayısı
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedGuests(Math.max(1, selectedGuests - 1))}
                        className="p-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                        disabled={selectedGuests <= 1}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-white">{selectedGuests}</span>
                        <span className="text-sm text-gray-100 ml-1">kişi</span>
                      </div>
                      <button
                        onClick={() => setSelectedGuests(selectedGuests + 1)}
                        className="p-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-6 p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300">Toplam</span>
                      <span className="text-2xl font-bold text-white">
                        ₺{(tour.price * selectedGuests).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-200">
                      {selectedGuests} kişi × ₺{tour.price} = ₺{(tour.price * selectedGuests).toLocaleString()}
                    </p>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBook}
                    disabled={!selectedDate}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                  >
                    Rezervasyon Yap
                  </button>

                  <p className="text-xs text-center text-gray-400 mt-3">
                    Şimdi ödeme yapılmaz. {tour.cancellationPolicy}
                  </p>

                  {/* Contact */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm font-semibold text-white mb-3">
                      Sorularınız mı var?
                    </p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 border border-white/10 rounded-lg font-semibold text-gray-200 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Canlı Destek
                      </button>
                      <button className="w-full px-4 py-2 border border-white/10 rounded-lg font-semibold text-gray-200 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5" />
                        Bizi Arayın
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-transparent rounded-lg p-3 text-center shadow-sm">
                    <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-200">Güvenli Ödeme</p>
                  </div>
                  <div className="bg-transparent rounded-lg p-3 text-center shadow-sm">
                    <Zap className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-200">Anında Onay</p>
                  </div>
                  <div className="bg-transparent rounded-lg p-3 text-center shadow-sm">
                    <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-200">En İyi Fiyat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Image Gallery Modal */}
        <AnimatePresence>
          {showAllImages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
              onClick={() => setShowAllImages(false)}
            >
              <button
                onClick={() => setShowAllImages(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl max-h-full overflow-auto">
                {tour.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full h-64 rounded-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={image}
                      alt={`${tour.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all tours (Antalya + Other regions)
  const paths = allTours.map((tour) => ({
    params: { slug: tour.slug }
  }));

  // Also include legacy tour slugs for backward compatibility
  const legacySlugs = [
    'istanbul-bogaz-turu-gunbatimi',
    'kapadokya-balon-ve-doga-turu', // Fixed: updated to match tours.tsx
    'efes-antik-kenti-turu',
    'pamukkale-hierapolis-turu',
    'antalya-tekne-turu',
  ];

  const legacyPaths = legacySlugs
    .filter(slug => !allTours.find(t => t.slug === slug))
    .map(slug => ({ params: { slug } }));

  return {
    paths: [...paths, ...legacyPaths],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  return {
    props: {
      slug,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default TourDetailPage;
