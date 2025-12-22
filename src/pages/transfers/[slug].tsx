/**
 * Transfer Detail Page - Premium Airport Transfer Detail View
 * Ultra-premium design with real-time tracking, flight integration & driver profiles
 * Inspired by tours/[slug].tsx but specialized for transfer services
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  Car,
  Ticket,
  Shield,
  Award,
  TrendingUp,
  Zap,
  CreditCard,
  Download,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Luggage,
  Baby,
  Plane,
  MapPinned,
  Radio,
  User,
  FileText,
  ArrowRight,
  Package,
  Coffee,
  Wifi,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import NavigationHeader from '@/components/layout/NavigationHeader';

// Sample transfer data - in production this would come from API/database
const getTransferBySlug = (slug: string) => {
  return {
    id: '1',
    slug: 'istanbul-airport-vip-transfer',
    title: 'İstanbul Havalimanı VIP Transfer',
    subtitle: 'Profesyonel sürücü ve lüks araç ile konforlu havalimanı transferi',
    rating: 4.9,
    reviewCount: 3847,
    bookingCount: 15230,
    badges: ['En Çok Tercih Edilen', 'VIP Hizmet', 'Anında Onay'],

    // Pricing - Per vehicle, not per person!
    pricePerVehicle: 850,
    originalPrice: 1200,
    discount: 29,
    currency: 'TRY',
    priceType: 'per-vehicle', // Key difference from tours

    // Vehicle Information
    vehicleType: 'VIP Sedan',
    vehicleBrand: 'Mercedes-Benz',
    vehicleModel: 'E-Class',
    vehicleYear: 2023,
    vehicleColor: 'Siyah',
    licensePlate: '34 ABC 123',

    // Capacity
    maxPassengers: 3,
    maxLuggage: 3,
    childSeatsAvailable: true,
    maxChildSeats: 2,

    // Route Information
    route: {
      from: {
        name: 'İstanbul Havalimanı',
        type: 'airport',
        code: 'IST',
        terminal: 'Tüm Terminaller',
        address: 'İstanbul Havalimanı, Tayakadın, Arnavutköy/İstanbul',
        coordinates: { lat: 41.2619, lng: 28.7419 },
      },
      to: {
        name: 'Taksim - Beyoğlu Bölgesi',
        type: 'city-center',
        address: 'Taksim Meydanı, Beyoğlu, İstanbul',
        coordinates: { lat: 41.0369, lng: 28.9859 },
      },
      distance: 42,
      estimatedDuration: 45,
      popularRoute: true,
    },

    // Service Type
    serviceType: 'one-way', // one-way, round-trip, hourly
    instantConfirmation: true,

    // Unique Transfer Features
    features: {
      meetGreet: true,
      flightTracking: true, // BENZERSIZ ÖZELLIK!
      realTimeTracking: true, // BENZERSIZ ÖZELLIK!
      freeWaitingTime: 60, // minutes
      extraStopAllowed: true,
      extraStopPrice: 150, // TRY
      airportAssistance: true,
      luggageAssistance: true,
      vipLounge: false,
    },

    // Vehicle Images
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200', // Mercedes exterior
      'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200', // Interior luxury
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', // Dashboard
      'https://images.unsplash.com/photo-1612810806695-30f7a8258391?w=1200', // Trunk space
      'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=1200', // Night exterior
    ],

    // Driver Profile - BENZERSIZ ÖZELLIK!
    driver: {
      id: 'driver-1',
      name: 'Mehmet Yılmaz',
      title: 'VIP Transfer Uzmanı',
      rating: 4.95,
      totalTransfers: 2847,
      yearsExperience: 8,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      bio: '8 yıldır profesyonel VIP transfer hizmeti sunuyorum. Müşteri memnuniyeti ve güvenliği benim önceliğimdir.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet',
      verifications: {
        license: true,
        backgroundCheck: true,
        firstAid: true,
        defenseiveDriving: true,
      },
      specializations: ['Airport Transfers', 'Corporate Events', 'VIP Services'],
    },

    // Vehicle Specifications
    vehicleSpecs: {
      features: [
        'Deri Koltuklar',
        'Klima (Çift Bölge)',
        'Panoramik Tavan',
        'Masaj Koltuğu',
        'Ücretsiz WiFi',
        'USB Şarj Portları',
        'Su İkramı',
        'Premium Ses Sistemi',
        'Gizlilik Camları',
        'LED Aydınlatma',
      ],
      safety: [
        '6 Hava Yastığı',
        'ABS + ESP',
        '360° Kamera',
        'Şerit Takip Asistanı',
        'Kör Nokta Uyarısı',
        'Acil Fren Asistanı',
        'İlk Yardım Çantası',
        'Yangın Söndürücü',
      ],
      entertainment: [
        'Premium Müzik Sistemi',
        'Bluetooth Bağlantı',
        'Telefon Şarj İstasyonu',
        'Ücretsiz WiFi',
        'Su ve İçecek',
        'Dergi ve Gazete',
      ],
    },

    highlights: [
      'Profesyonel sürücü ile VIP transfer hizmeti',
      'Meet & Greet - Havalimanında karşılama',
      'Ücretsiz uçuş takibi ve bekleme süresi',
      'Real-time araç takibi özelliği',
      '2023 model Mercedes E-Class',
      'Tüm bagajlarınız için yeterli alan',
      'Ücretsiz çocuk koltuğu (talep üzerine)',
      '7/24 müşteri desteği',
      'Anında rezervasyon onayı',
      'Ücretsiz iptal (24 saat öncesine kadar)',
    ],

    description: `İstanbul Havalimanı'ndan şehir merkezine veya herhangi bir noktaya lüks ve konforlu transfer hizmeti. 2023 model Mercedes-Benz E-Class aracımız ile profesyonel şoförümüz sizi güvenle hedefinize ulaştırır.

VIP transfer hizmetimiz, havalimanında karşılama (Meet & Greet), bagaj yardımı, ücretsiz bekleme süresi ve gerçek zamanlı araç takibi gibi premium özellikler içerir. Uçuşunuzun gecikme durumunda otomatik takip sistemi sayesinde şoförümüz sizi bekler.

Temiz, konforlu ve tam donanımlı araçlarımızda ücretsiz WiFi, su ikramı ve telefon şarj imkanı bulunur. Tüm sürücülerimiz profesyonel eğitim almış, lisanslı ve sigortalıdır.`,

    included: [
      'Meet & Greet havalimanı karşılama hizmeti',
      'Profesyonel ve deneyimli sürücü',
      'Bagaj taşıma yardımı',
      '60 dakika ücretsiz bekleme süresi',
      'Uçuş takibi (otomatik gecikme bildirimi)',
      'Real-time araç konumu paylaşımı',
      'Ücretsiz WiFi ve şarj imkanı',
      'Su ve mendil ikramı',
      'Tüm vergi ve ücretler',
      'Havalimanı giriş ve park ücretleri',
      '7/24 müşteri desteği',
      'Ücretsiz iptal (24 saat öncesine kadar)',
    ],

    excluded: [
      'Ekstra durak ücreti (talep edilirse)',
      'Fazla bekleme ücreti (60 dakika sonrası)',
      'Çocuk koltuğu ücreti (talep edilirse)',
      'Kişisel harcamalar',
      'Bahşiş (opsiyonel)',
    ],

    requirements: [
      'Rezervasyon onay belgesi (e-posta veya SMS)',
      'Uçuş bilgileri (uçuş numarası ve varış saati)',
      'İletişim telefon numarası',
      'Varış adresi detayları',
    ],

    importantInfo: [
      'Rezervasyon en az 3 saat önceden yapılmalıdır',
      'Uçuş bilgilerinizi eksiksiz paylaşınız',
      'Maksimum yolcu sayısı: 3 kişi',
      'Maksimum bavul sayısı: 3 büyük bavul',
      'Çocuk koltuğu ihtiyacınızı önceden belirtiniz',
      'Ekstra durak taleplerinizi rezervasyon sırasında bildirin',
      'Fazla bekleme 60 dakika sonrası ücretlendirilir',
    ],

    // Pricing Options
    pricingOptions: {
      oneWay: {
        base: 850,
        discount: 29,
        final: 850,
      },
      roundTrip: {
        base: 1600,
        discount: 35,
        final: 1500,
        savings: 200,
      },
      hourly: {
        base: 400,
        minimumHours: 3,
      },
    },

    // Extra Services
    extraServices: [
      {
        id: 'baby-seat',
        name: 'Bebek Koltuğu (0-1 yaş)',
        price: 100,
        icon: 'baby',
        description: 'Güvenlik standartlarına uygun bebek koltuğu',
      },
      {
        id: 'child-seat',
        name: 'Çocuk Koltuğu (1-4 yaş)',
        price: 80,
        icon: 'baby',
        description: 'Yaş grubuna uygun çocuk koltuğu',
      },
      {
        id: 'booster-seat',
        name: 'Yükseltici Koltuk (4-12 yaş)',
        price: 60,
        icon: 'baby',
        description: 'Güvenlik kemeri için yükseltici koltuk',
      },
      {
        id: 'extra-stop',
        name: 'Ekstra Durak',
        price: 150,
        icon: 'map-pin',
        description: 'Güzergah üzerinde ek durak (15 dk bekleme)',
      },
      {
        id: 'extra-luggage',
        name: 'Ekstra Bagaj',
        price: 100,
        icon: 'luggage',
        description: 'Standart kapasite üzeri ekstra bagaj',
      },
      {
        id: 'portable-wifi',
        name: 'Taşınabilir WiFi',
        price: 150,
        icon: 'wifi',
        description: '4G taşınabilir WiFi cihazı (günlük)',
      },
    ],

    // Terminal Selection
    terminals: [
      { code: 'IST-D', name: 'İç Hatlar Terminali', meetingPoint: 'Varış Katı, 3 numaralı kapı' },
      { code: 'IST-I', name: 'Dış Hatlar Terminali', meetingPoint: 'Varış Katı, 5 numaralı kapı' },
    ],

    reviews: [
      {
        id: '1',
        author: 'Ayşe Demir',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayse',
        rating: 5,
        date: '2024-12-20',
        title: 'Mükemmel hizmet!',
        text: 'Havalimanında karşılama çok profesyoneldi. Şoför bizi isimli tabelayla karşıladı, bagajlarımıza yardımcı oldu. Araç tertemiz ve çok konforu. Kesinlikle tavsiye ederim!',
        helpful: 94,
        verified: true,
        transferDetails: {
          route: 'IST → Taksim',
          vehicle: 'Mercedes E-Class',
          driver: 'Mehmet Yılmaz',
        },
      },
      {
        id: '2',
        author: 'John Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        rating: 5,
        date: '2024-12-18',
        title: 'Outstanding service!',
        text: 'The driver tracked my flight and was waiting for me despite the 2-hour delay. The car was immaculate and the ride was smooth. Real-time tracking feature is amazing!',
        helpful: 78,
        verified: true,
        transferDetails: {
          route: 'IST → Sultanahmet',
          vehicle: 'Mercedes E-Class',
          driver: 'Mehmet Yılmaz',
        },
      },
      {
        id: '3',
        author: 'Maria García',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
        rating: 5,
        date: '2024-12-15',
        title: 'Servicio excepcional',
        text: 'El conductor nos ayudó con las maletas y el coche estaba muy limpio. La aplicación de seguimiento en tiempo real nos permitió ver exactamente dónde estaba el conductor. ¡Perfecto!',
        helpful: 65,
        verified: true,
        transferDetails: {
          route: 'IST → Kadıköy',
          vehicle: 'Mercedes E-Class',
          driver: 'Ali Kara',
        },
      },
    ],

    faqs: [
      {
        question: 'Uçuşum gecikirse ne olur?',
        answer: 'Uçuş takibi sistemimiz otomatik olarak uçuşunuzu takip eder. Gecikme durumunda şoförümüz yeni varış saatinizi bildirilir ve sizi bekler. İlk 60 dakika bekleme ücretsizdir.',
      },
      {
        question: 'Şoförü nasıl bulacağım?',
        answer: 'Şoförümüz varış katında, belirtilen buluşma noktasında isminizin yazılı olduğu bir tabelayla sizi bekleyecektir. Ayrıca rezervasyon sonrası şoför telefon numarasını paylaşırız.',
      },
      {
        question: 'Bagaj kapasitesi ne kadar?',
        answer: '3 büyük bavul ve 3 el çantası için yeterli alan bulunmaktadır. Ekstra bagaj ihtiyacınız varsa lütfen rezervasyon sırasında belirtiniz.',
      },
      {
        question: 'Çocuk koltuğu var mı?',
        answer: 'Evet, ücretsiz çocuk koltuğu hizmeti sunuyoruz. Lütfen rezervasyon sırasında çocuğunuzun yaşını ve çocuk koltuğu ihtiyacınızı belirtiniz.',
      },
      {
        question: 'Ödemeyi nasıl yapacağım?',
        answer: 'Online ödeme ile güvenli rezervasyon yapabilirsiniz. Kredi kartı, banka kartı veya havale ile ödeme seçenekleri mevcuttur. Nakit ödeme araç içinde de mümkündür.',
      },
      {
        question: 'İptal politikanız nedir?',
        answer: '24 saat öncesine kadar ücretsiz iptal hakkınız bulunmaktadır. 24 saatten sonraki iptallerde %50 ücret kesintisi yapılır.',
      },
      {
        question: 'Gerçek zamanlı takip nasıl çalışır?',
        answer: 'Rezervasyon onayı sonrası size özel bir takip linki gönderilir. Bu link ile aracınızın konumunu harita üzerinde anlık olarak görebilirsiniz.',
      },
      {
        question: 'Yolculuk sırasında ekstra durak yapabilir miyiz?',
        answer: 'Evet, güzergah üzerinde ekstra durak yapabilirsiniz. Her durak için 150 TRY ek ücret alınır ve maksimum 15 dakika bekleme süresi verilir.',
      },
    ],

    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    mobileTicket: true,

    // Safety & Trust
    safetyFeatures: [
      {
        icon: 'shield',
        title: 'Güvenli Ödeme',
        description: '256-bit SSL şifreleme',
      },
      {
        icon: 'check-circle',
        title: 'Lisanslı Sürücüler',
        description: 'Tüm sürücülerimiz profesyonel lisansa sahiptir',
      },
      {
        icon: 'award',
        title: 'Sigortalı Araçlar',
        description: 'Tam kapsamlı kasko sigortası',
      },
      {
        icon: 'star',
        title: 'Kalite Garantisi',
        description: '%100 müşteri memnuniyeti',
      },
    ],
  };
};

const TransferDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [showAllImages, setShowAllImages] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<'one-way' | 'round-trip'>('one-way');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedTerminal, setSelectedTerminal] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [showRealTimeTracking, setShowRealTimeTracking] = useState(false);

  if (!slug) return null;

  const transfer = getTransferBySlug(slug as string);

  // Calculate total price
  const calculateTotal = () => {
    let base = serviceType === 'one-way'
      ? transfer.pricingOptions.oneWay.final
      : transfer.pricingOptions.roundTrip.final;

    let extrasTotal = 0;
    selectedExtras.forEach(extraId => {
      const extra = transfer.extraServices.find(e => e.id === extraId);
      if (extra) extrasTotal += extra.price;
    });

    return base + extrasTotal;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: transfer.title,
          text: transfer.subtitle,
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
        type: 'transfer',
        id: transfer.id,
        slug: transfer.slug,
        date: selectedDate,
        time: selectedTime,
        serviceType,
        passengers,
        luggage,
        flightNumber,
        terminal: selectedTerminal,
        extras: selectedExtras.join(','),
        returnDate: serviceType === 'round-trip' ? returnDate : undefined,
        returnTime: serviceType === 'round-trip' ? returnTime : undefined,
      },
    });
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  return (
    <>
      <NextSeo
        title={`${transfer.title} | Ailydian Transfer`}
        description={transfer.subtitle}
        openGraph={{
          title: transfer.title,
          description: transfer.subtitle,
          images: [{ url: transfer.images[0] }],
          type: 'website',
        }}
      />

      <Head>
        <link rel="canonical" href={`https://travel.ailydian.com/transfers/${slug}`} />
      </Head>

      <NavigationHeader theme="blue" />

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
                src={transfer.images[selectedImage]}
                alt={transfer.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(prev => (prev === 0 ? transfer.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={() => setSelectedImage(prev => (prev === transfer.images.length - 1 ? 0 : prev + 1))}
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
                {selectedImage + 1} / {transfer.images.length}
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
                {transfer.images.map((image, index) => (
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
                      alt={`${transfer.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
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
                  {transfer.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-full text-xs font-bold flex items-center gap-1"
                    >
                      <Award className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                  {transfer.instantConfirmation && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Anında Onay
                    </span>
                  )}
                  {transfer.features.realTimeTracking && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold flex items-center gap-1">
                      <Radio className="w-3 h-3" />
                      Canlı Takip
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {transfer.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{transfer.subtitle}</p>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{transfer.rating}</span>
                    <span className="text-gray-500">({transfer.reviewCount.toLocaleString()} yorum)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <TrendingUp className="w-5 h-5" />
                    <span>{transfer.bookingCount.toLocaleString()} transfer</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Car className="w-5 h-5" />
                    <span>{transfer.vehicleType}</span>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPinned className="w-6 h-6 text-blue-600" />
                  Transfer Rotası
                </h2>

                <div className="space-y-4">
                  {/* From */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Nereden</p>
                      <p className="font-bold text-gray-900 text-lg">{transfer.route.from.name}</p>
                      <p className="text-sm text-gray-600">{transfer.route.from.address}</p>
                      {transfer.route.from.terminal && (
                        <p className="text-xs text-gray-500 mt-1">{transfer.route.from.terminal}</p>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white px-4">
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* To */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Nereye</p>
                      <p className="font-bold text-gray-900 text-lg">{transfer.route.to.name}</p>
                      <p className="text-sm text-gray-600">{transfer.route.to.address}</p>
                    </div>
                  </div>
                </div>

                {/* Route Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{transfer.route.distance} km</p>
                    <p className="text-sm text-gray-600">Mesafe</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">~{transfer.route.estimatedDuration} dk</p>
                    <p className="text-sm text-gray-600">Tahmini Süre</p>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-6 aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Rota Haritası</p>
                  </div>
                </div>
              </div>

              {/* Real-Time Tracking Feature - BENZERSIZ! */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-sm border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <Radio className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Gerçek Zamanlı Araç Takibi
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Transfer başladıktan sonra aracınızı harita üzerinde canlı olarak takip edebilirsiniz.
                      Tahmini varış süresini ve güncel konumu anlık görebilirsiniz.
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">GPS Takip</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Anlık Konum Paylaşımı</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Tahmini Varış Saati</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Showcase */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Car className="w-6 h-6 text-blue-600" />
                  Araç Bilgileri
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Marka & Model</p>
                    <p className="font-bold text-gray-900">{transfer.vehicleBrand} {transfer.vehicleModel}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Yıl & Renk</p>
                    <p className="font-bold text-gray-900">{transfer.vehicleYear} - {transfer.vehicleColor}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Maksimum Yolcu</p>
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      {transfer.maxPassengers} Kişi
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Bagaj Kapasitesi</p>
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      <Luggage className="w-5 h-5 text-blue-600" />
                      {transfer.maxLuggage} Büyük Bavul
                    </p>
                  </div>
                </div>

                {/* Vehicle Features */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Konfor Özellikleri
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {transfer.vehicleSpecs.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      Güvenlik Özellikleri
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {transfer.vehicleSpecs.safety.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Profile - BENZERSIZ! */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Sürücünüz
                </h2>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={transfer.driver.avatar}
                      alt={transfer.driver.name}
                      className="w-24 h-24 rounded-full border-4 border-blue-100"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{transfer.driver.name}</h3>
                        <p className="text-sm text-gray-600">{transfer.driver.title}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-900">{transfer.driver.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{transfer.driver.totalTransfers} transfer</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{transfer.driver.yearsExperience} yıl deneyim</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-3">
                      {transfer.driver.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{transfer.driver.bio}</p>

                    {/* Verifications */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Sürücü Belgesi</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Sabıka Kaydı</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>İlk Yardım</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Savunma Sürüşü</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Öne Çıkanlar</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {transfer.highlights.map((highlight, index) => (
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
                  {transfer.description}
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
                    {transfer.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
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
                    {transfer.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  Önemli Bilgiler
                </h3>
                <ul className="space-y-2">
                  {transfer.importantInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                      <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Yorumlar</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">{transfer.rating}</span>
                    <span className="text-gray-500">({transfer.reviewCount.toLocaleString()})</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {transfer.reviews.map((review) => (
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

                          {/* Transfer Details in Review */}
                          {review.transferDetails && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Navigation className="w-3 h-3" />
                                  <span>{review.transferDetails.route}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Car className="w-3 h-3" />
                                  <span>{review.transferDetails.vehicle}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{review.transferDetails.driver}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors mt-2">
                            Yararlı ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all">
                  Tüm Yorumları Göster ({transfer.reviewCount.toLocaleString()})
                </button>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h3>
                <div className="space-y-3">
                  {transfer.faqs.map((faq, index) => (
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

              {/* Safety Features */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Güvenlik & Güven</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {transfer.safetyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {feature.icon === 'shield' && <Shield className="w-5 h-5 text-blue-600" />}
                        {feature.icon === 'check-circle' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                        {feature.icon === 'award' && <Award className="w-5 h-5 text-blue-600" />}
                        {feature.icon === 'star' && <Star className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
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
                      <span className="text-3xl font-bold text-gray-900">₺{transfer.pricePerVehicle}</span>
                      {transfer.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">₺{transfer.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">araç başı (kişi başı değil!)</span>
                      {transfer.discount && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold">
                          %{transfer.discount} İndirim
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Type Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Transfer Tipi
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setServiceType('one-way')}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          serviceType === 'one-way'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Tek Yön
                      </button>
                      <button
                        onClick={() => setServiceType('round-trip')}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all relative ${
                          serviceType === 'round-trip'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Gidiş-Dönüş
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white rounded-full text-xs">
                          Tasarruf
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {serviceType === 'one-way' ? 'Transfer Tarihi ve Saati' : 'Gidiş Tarihi ve Saati'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
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
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="time"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Return Date & Time (if round-trip) */}
                  {serviceType === 'round-trip' && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Dönüş Tarihi ve Saati
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={selectedDate || new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="time"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Flight Number */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <span className="flex items-center gap-2">
                        <Plane className="w-4 h-4" />
                        Uçuş Numarası (Opsiyonel)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="örn: TK123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Uçuş takibi için gerekli
                    </p>
                  </div>

                  {/* Terminal Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Terminal Seçimi
                    </label>
                    <select
                      value={selectedTerminal}
                      onChange={(e) => setSelectedTerminal(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Terminal seçiniz</option>
                      {transfer.terminals.map((terminal) => (
                        <option key={terminal.code} value={terminal.code}>
                          {terminal.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Passengers & Luggage */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Yolcu Sayısı
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          disabled={passengers <= 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-bold">{passengers}</span>
                        </div>
                        <button
                          onClick={() => setPassengers(Math.min(transfer.maxPassengers, passengers + 1))}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          disabled={passengers >= transfer.maxPassengers}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Bavul Sayısı
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLuggage(Math.max(0, luggage - 1))}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          disabled={luggage <= 0}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-bold">{luggage}</span>
                        </div>
                        <button
                          onClick={() => setLuggage(Math.min(transfer.maxLuggage, luggage + 1))}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          disabled={luggage >= transfer.maxLuggage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Extra Services */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Ekstra Hizmetler
                    </label>
                    <div className="space-y-2">
                      {transfer.extraServices.map((extra) => (
                        <label
                          key={extra.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedExtras.includes(extra.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedExtras.includes(extra.id)}
                              onChange={() => toggleExtra(extra.id)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{extra.name}</p>
                              <p className="text-xs text-gray-500">{extra.description}</p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900">₺{extra.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Toplam Tutar</span>
                      <span className="text-3xl font-bold text-gray-900">
                        ₺{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    {serviceType === 'round-trip' && transfer.pricingOptions.roundTrip.savings && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium">
                          ₺{transfer.pricingOptions.roundTrip.savings} tasarruf ediyorsunuz!
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-2">
                      Tüm vergiler ve ücretler dahildir
                    </p>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBook}
                    disabled={!selectedDate || !selectedTime || !selectedTerminal}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                  >
                    Rezervasyon Yap
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Şimdi ödeme yapılmaz. {transfer.cancellationPolicy}
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
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Güvenli Ödeme</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Zap className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Anında Onay</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Radio className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">Canlı Takip</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                    <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-700">VIP Hizmet</p>
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
                {transfer.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${transfer.title} ${index + 1}`}
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

export default TransferDetailPage;
