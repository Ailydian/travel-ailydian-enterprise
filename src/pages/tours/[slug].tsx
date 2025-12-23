/**
 * Tour Detail Page - Viator/GetYourGuide Style Premium Design
 * Ultra-premium design with all competitor features + unique Ailydian innovations
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
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

// Get tour data by slug from real data
const getTourBySlug = (slug: string) => {
  const tour = allComprehensiveTours.find(t => t.slug === slug);

  if (!tour) {
    // Fallback to default Istanbul tour if not found
    return {
      id: '1',
      slug: 'istanbul-bogaz-turu-gunbatimi',
      title: 'İstanbul Boğaz Turu - Gün Batımı Özel',
    subtitle: 'Muhteşem manzaralar eşliğinde unutulmaz bir gün batımı deneyimi',
    rating: 4.9,
    reviewCount: 2847,
    bookingCount: 12450,
    badges: ['En Çok Satan', 'VIP Deneyim', '2024 Excellence Award'],
    price: 450,
    originalPrice: 650,
    discount: 31,
    duration: '3 saat',
    language: ['Türkçe', 'İngilizce', 'Arapça'],
    groupSize: 'Maksimum 50 kişi',
    category: 'Tekne Turları',
    location: 'İstanbul Boğazı',
    meetingPoint: 'Kabataş Sahil, Beşiktaş - İstanbul',
    meetingPointCoords: { lat: 41.0382, lng: 29.0074 },
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    instantConfirmation: true,
    mobileTicket: true,
    skipTheLine: false,

    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200',
      'https://images.unsplash.com/photo-1605084344326-53c89d7d5371?w=1200',
      'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1200',
    ],

    videoUrl: 'https://www.youtube.com/embed/sample-video', // Benzersiz özellik

    highlights: [
      'Profesyonel rehber eşliğinde İstanbul Boğazı turu',
      'Gün batımı manzarası eşliğinde seyahat',
      'Rumeli Hisarı ve Anadolu Hisarı görüntüleme',
      'Dolmabahçe Sarayı ve Çırağan Sarayı',
      'Boğaz Köprüleri altından geçiş',
      'Ücretsiz içecek servisi',
      'Fotoğraf çekimi için özel molalar',
      'Canlı müzik performansı',
    ],

    description: `İstanbul'un en ikonik deneyimlerinden biri olan Boğaz Turu'nda, şehrin iki yakasını birbirine bağlayan bu muhteşem suyolunda unutulmaz bir yolculuk yapacaksınız.

Gün batımı sırası başlayan turumuzda, İstanbul'un en özel manzaralarını profesyonel rehberimizin anlatımıyla keşfedeceksiniz. Tarihi yarımadadan Karadeniz'e kadar uzanan rotamızda, Dolmabahçe Sarayı, Çırağan Sarayı, Rumeli Hisarı, Anadolu Hisarı, Ortaköy Camii ve Boğaz Köprüleri gibi simgesel yapıları göreceksiniz.

Lüks teknemizdeki konforlu koltuklar, açık ve kapalı alanlar sayesinde her mevsim keyifle gezebilirsiniz. Ücretsiz içecek servisi ve canlı müzik eşliğinde, İstanbul'u bambaşka bir açıdan deneyimleyin.`,

    itinerary: [
      {
        time: '17:00',
        title: 'Buluşma ve Karşılama',
        description: 'Kabataş iskelesinde misafirlerimizi karşılıyor ve tekneye bindiriyoruz.',
        duration: '15 dk',
      },
      {
        time: '17:15',
        title: 'Dolmabahçe Sarayı ve Beşiktaş',
        description: 'Boğaz kıyısındaki en görkemli saraylara doğru yol alıyoruz.',
        duration: '30 dk',
      },
      {
        time: '17:45',
        title: 'Ortaköy ve Boğaziçi Köprüsü',
        description: 'Ortaköy Camii\'nin muhteşem manzarası ve 1. Köprü altından geçiş.',
        duration: '30 dk',
      },
      {
        time: '18:15',
        title: 'Rumeli Hisarı ve Anadolu Hisarı',
        description: 'Fatih Sultan Mehmet\'in Boğaz\'ı kontrol etmek için yaptırdığı kaleler.',
        duration: '30 dk',
      },
      {
        time: '18:45',
        title: 'Gün Batımı ve Dönüş',
        description: 'Muhteşem gün batımını izlerken Kabataş iskelesine dönüyoruz.',
        duration: '45 dk',
      },
    ],

    included: [
      '3 saatlik Boğaz turu',
      'Profesyonel Türkçe/İngilizce rehber',
      'Canlı müzik performansı',
      'Ücretsiz içecek (çay, kahve, su)',
      'Tekne üzerinde WiFi',
      'Fotoğraf çekimi için özel molalar',
      'Ses sistemi ve mikrofonla anlatım',
      'Güvenlik ekipmanları',
    ],

    excluded: [
      'Yemekler',
      'Alkollü içecekler',
      'Otel transfer hizmeti',
      'Kişisel harcamalar',
      'Bahşiş (opsiyonel)',
    ],

    requirements: [
      'Geçerli kimlik veya pasaport',
      'Rezervasyon onay belgesi (mobil veya basılı)',
      'Uygun giyim (akşam serinleyebilir)',
      'Fotoğraf makinesi / kamera (opsiyonel)',
    ],

    importantInfo: [
      'Tur hava koşullarına bağlıdır, kötü hava durumunda iptal edilebilir',
      'Tekne tam kapasitede çalışır, erken rezervasyon önerilir',
      'Çocuklar için özel indirim mevcuttur',
      'Engelli erişimi sınırlıdır, lütfen önceden bilgi alın',
      'Deniz tutması olan misafirler ilaç almayı unutmamalı',
    ],

    reviews: [
      {
        id: '1',
        author: 'Mehmet Yılmaz',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet',
        rating: 5,
        date: '2024-12-15',
        title: 'Muhteşem bir deneyim!',
        text: 'Gün batımı sırasında Boğaz\'ı görmek paha biçilemez. Rehberimiz çok bilgiliydi, müzik harikaydi. Kesinlikle tavsiye ederim!',
        helpful: 127,
        verified: true,
      },
      {
        id: '2',
        author: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        rating: 5,
        date: '2024-12-10',
        title: 'Best tour in Istanbul!',
        text: 'The sunset cruise was absolutely magical. Our guide spoke perfect English and shared fascinating stories about the historical sites. Highly recommended!',
        helpful: 89,
        verified: true,
      },
      {
        id: '3',
        author: 'Ali Kara',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali',
        rating: 4,
        date: '2024-12-05',
        title: 'Çok güzeldi',
        text: 'Tekne çok lükstü, manzaralar harikaydı. Sadece biraz daha uzun olabilirdi. Genel olarak çok memnun kaldım.',
        helpful: 45,
        verified: true,
      },
    ],

    faqs: [
      {
        question: 'Tur iptal edilirse ne olur?',
        answer: 'Kötü hava koşulları nedeniyle tur iptal edilirse, tam iade yapılır veya başka bir tarihe ertelenebilir.',
      },
      {
        question: 'Çocuklar için uygun mu?',
        answer: 'Evet, tur tüm yaş grupları için uygundur. 6 yaş altı çocuklar ücretsiz, 6-12 yaş arası %50 indirimlidir.',
      },
      {
        question: 'Yemek servisi var mı?',
        answer: 'Ücretsiz içecek servisi vardır. Yemek için teknede büfe mevcuttur (ekstra ücret karşılığı).',
      },
      {
        question: 'Fotoğraf çekebilir miyiz?',
        answer: 'Elbette! Özel fotoğraf molalarımız vardır. Ayrıca profesyonel fotoğrafçı hizmeti de mevcuttur (opsiyonel).',
      },
    ],

    guide: {
      name: 'Ahmet Demir',
      title: 'Turizm Rehberi',
      rating: 4.9,
      tours: 1247,
      years: 12,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      bio: '12 yıldır İstanbul\'da profesyonel turizm rehberliği yapıyorum. Boğaz turları ve tarihi yarımada turları konusunda uzmanım.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmet',
    },
  };
  }

  // Return real tour data mapped to the expected format
  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.name,
    subtitle: tour.description,
    rating: tour.rating,
    reviewCount: tour.reviewCount,
    bookingCount: tour.reviewCount * 4, // Approximate booking count
    badges: [
      tour.pricing.savingsPercentage >= 15 ? 'En Çok İndirim' : '',
      tour.difficulty === 'Kolay' ? 'Herkese Uygun' : '',
      tour.rating >= 4.7 ? '2024 Excellence Award' : ''
    ].filter(Boolean),
    price: tour.pricing.travelAilydian,
    originalPrice: tour.pricing.competitors.getYourGuide || tour.pricing.travelAilydian + tour.pricing.savings,
    discount: tour.pricing.savingsPercentage,
    duration: tour.duration,
    language: ['Türkçe', 'İngilizce'],
    groupSize: `Maksimum ${tour.maxGroupSize} kişi`,
    category: tour.category === 'boat' ? 'Tekne Turları' :
              tour.category === 'adventure' ? 'Macera Turları' :
              tour.category === 'cultural' ? 'Kültürel Turlar' : 'Günlük Turlar',
    location: `${tour.region}, Türkiye`,
    meetingPoint: tour.meetingPoint,
    meetingPointCoords: { lat: 36.8969, lng: 28.2663 }, // Default coords, can be enhanced later
    cancellationPolicy: tour.cancellationPolicy,
    instantConfirmation: true,
    mobileTicket: true,
    skipTheLine: false,
    images: tour.images && tour.images.length > 0 ? tour.images : [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200',
    ],
    videoUrl: 'https://www.youtube.com/embed/sample-video',
    highlights: tour.highlights || [],
    description: tour.longDescription || tour.description,
    included: tour.included || [],
    excluded: tour.excluded || [],
    requirements: [
      'Geçerli kimlik veya pasaport',
      'Rezervasyon onay belgesi (mobil veya basılı)',
      'Uygun giyim ve rahat ayakkabılar',
      'Güneş kremi ve şapka (opsiyonel)',
    ],
    importantInfo: [
      tour.cancellationPolicy,
      `Minimum yaş: ${tour.minAge} yaş`,
      `Maksimum grup büyüklüğü: ${tour.maxGroupSize} kişi`,
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.subtitle,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
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
        title={`${tour.title} | Ailydian Travel`}
        description={tour.subtitle}
        openGraph={{
          title: tour.title,
          description: tour.subtitle,
          images: [{ url: tour.images[0] }],
          type: 'website',
        }}
      />

      <Head>
        <link rel="canonical" href={`https://travel.ailydian.com/tours/${slug}`} />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Image Gallery */}
        <section className="relative bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Main Image */}
            <div className="relative h-[70vh] overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={tour.images[selectedImage]}
                alt={tour.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(prev => (prev === 0 ? tour.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => (prev === tour.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              {/* Top Bar Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg transition-all"
                >
                  <Share2 className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`}
                  />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm font-semibold">
                {selectedImage + 1} / {tour.images.length}
              </div>

              {/* View All Photos Button */}
              <button
                onClick={() => setShowAllImages(true)}
                className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-all"
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
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-white scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${tour.title} ${index + 1}`}
                      className="w-full h-full object-cover"
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
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-xs font-bold flex items-center gap-1"
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

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {tour.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{tour.subtitle}</p>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{tour.rating}</span>
                    <span className="text-gray-500">({tour.reviewCount.toLocaleString()} yorum)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <TrendingUp className="w-5 h-5" />
                    <span>{tour.bookingCount.toLocaleString()} rezervasyon</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{tour.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Süre</p>
                      <p className="font-semibold text-gray-900">{tour.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Grup Boyutu</p>
                      <p className="font-semibold text-gray-900">{tour.groupSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dil</p>
                      <p className="font-semibold text-gray-900">{tour.language.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">İptal</p>
                      <p className="font-semibold text-gray-900">{tour.cancellationPolicy}</p>
                    </div>
                  </div>
                </div>

                {tour.mobileTicket && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center gap-2 text-sm">
                    <Download className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">
                      <strong>Mobil Bilet:</strong> Yazdırmanıza gerek yok, telefonunuzdan gösterin!
                    </span>
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Öne Çıkanlar</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Açıklama</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {tour.description}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Program</h2>
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
                          <span className="text-xs text-gray-500">{item.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Included/Excluded */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-500" />
                    Dahil Olanlar
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-500" />
                    Dahil Olmayanlar
                  </h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements & Important Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  Gereksinimler ve Önemli Bilgiler
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Yanınızda Bulundurmanız Gerekenler:</h4>
                  <ul className="space-y-1">
                    {tour.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Önemli Notlar:</h4>
                  <ul className="space-y-1">
                    {tour.importantInfo.map((info, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meeting Point */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  Buluşma Noktası
                </h3>
                <p className="text-gray-700 mb-4">{tour.meetingPoint}</p>

                {/* Interactive Map */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
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
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Tour Guide */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rehberiniz</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={tour.guide.avatar}
                    alt={tour.guide.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{tour.guide.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{tour.guide.title}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
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
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{tour.guide.bio}</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Yorumlar</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">{tour.rating}</span>
                    <span className="text-gray-500">({tour.reviewCount.toLocaleString()})</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {tour.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{review.author}</span>
                            {review.verified && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Doğrulanmış
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
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
                            <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                          )}
                          <p className="text-gray-700 text-sm mb-2">{review.text}</p>
                          <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                            Yararlı ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all">
                  Tüm Yorumları Göster ({tour.reviewCount.toLocaleString()})
                </button>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h3>
                <div className="space-y-3">
                  {tour.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                        {expandedFAQ === faq.question ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
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
                            <div className="px-4 pb-3 text-gray-700">{faq.answer}</div>
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">₺{tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">₺{tour.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">kişi başı</span>
                      {tour.discount && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold">
                          %{tour.discount} İndirim
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Tarih Seçin
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Guest Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Misafir Sayısı
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedGuests(Math.max(1, selectedGuests - 1))}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={selectedGuests <= 1}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">{selectedGuests}</span>
                        <span className="text-sm text-gray-600 ml-1">kişi</span>
                      </div>
                      <button
                        onClick={() => setSelectedGuests(selectedGuests + 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600">Toplam</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ₺{(tour.price * selectedGuests).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
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

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Şimdi ödeme yapılmaz. {tour.cancellationPolicy}
                  </p>

                  {/* Contact */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Sorularınız mı var?
                    </p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Canlı Destek
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5" />
                        Bizi Arayın
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Güvenli Ödeme</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Zap className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Anında Onay</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">En İyi Fiyat</p>
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
                  <img
                    key={index}
                    src={image}
                    alt={`${tour.title} ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
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
  // Generate paths for all tours from the comprehensive tours data
  const paths = allComprehensiveTours.map((tour) => ({
    params: { slug: tour.slug }
  }));

  // Also include legacy tour slugs for backward compatibility
  const legacySlugs = [
    'istanbul-bogaz-turu-gunbatimi',
    'kapadokya-balon-turu',
    'efes-antik-kenti-turu',
    'pamukkale-hierapolis-turu',
    'antalya-tekne-turu',
  ];

  const legacyPaths = legacySlugs
    .filter(slug => !allComprehensiveTours.find(t => t.slug === slug))
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
