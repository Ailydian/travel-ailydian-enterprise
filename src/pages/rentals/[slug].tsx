/**
 * Rental Property Detail Page - Airbnb Style
 * Real API Integration with comprehensive property details
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Wifi,
  Car,
  Waves,
  Wind,
  Tv,
  ChefHat,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Home,
  Shield,
  MessageCircle,
  Award,
  Eye,
  Loader2,
} from 'lucide-react';

// TypeScript interfaces
interface RentalProperty {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  city: string;
  district: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  squareMeters: number;
  basePrice: string;
  weeklyDiscount: string;
  monthlyDiscount: string;
  cleaningFee: string;
  securityDeposit: string;
  wifi: boolean;
  kitchen: boolean;
  parking: boolean;
  pool: boolean;
  airConditioning: boolean;
  heating: boolean;
  tv: boolean;
  washer: boolean;
  beachfront: boolean;
  seaview: boolean;
  balcony: boolean;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  partiesAllowed: boolean;
  childrenAllowed: boolean;
  instantBook: boolean;
  minimumStay: number;
  maximumStay: number;
  checkInTime: string;
  checkOutTime: string;
  mainImage: string;
  images: string[];
  virtualTourUrl: string | null;
  hostName: string;
  hostSuperhost: boolean;
  hostResponseTime: string;
  hostLanguages: string[];
  isActive: boolean;
  isFeatured: boolean;
  overall: string;
  cleanliness: string;
  accuracy: string;
  checkIn: string;
  communication: string;
  location: string;
  value: string;
  reviewCount: number;
  airbnbPrice: string | null;
  bookingPrice: string | null;
  agodaPrice: string | null;
}

interface SimilarProperty {
  id: string;
  title: string;
  slug: string;
  city: string;
  mainImage: string;
  basePrice: string;
  overall: string;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
}

interface PropertyDetailsPageProps {
  slug: string;
}

// Mock data function - matches database schema
const getPropertyBySlug = (slug: string): RentalProperty => {
  const propertyData: Record<string, RentalProperty> = {
    'istanbul-bogaz-manzarali-villa': {
      id: '1',
      title: 'İstanbul Boğaz Manzaralı Lüks Villa',
      slug: 'istanbul-bogaz-manzarali-villa',
      description: 'Boğaz manzaralı, modern ve lüks villa. Muhteşem manzara, geniş teraslar ve özel havuz ile unutulmaz bir tatil deneyimi.',
      type: 'VILLA',
      city: 'İstanbul',
      district: 'Beşiktaş',
      address: 'Bebek Mahallesi, Boğaz Caddesi',
      coordinates: { lat: 41.0766, lng: 29.0433 },
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      beds: 6,
      squareMeters: 350,
      basePrice: '5000',
      weeklyDiscount: '15',
      monthlyDiscount: '25',
      cleaningFee: '800',
      securityDeposit: '5000',
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: true,
      balcony: true,
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true,
      instantBook: true,
      minimumStay: 2,
      maximumStay: 90,
      checkInTime: '15:00',
      checkOutTime: '11:00',
      mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      ],
      virtualTourUrl: null,
      hostName: 'Mehmet Bey',
      hostSuperhost: true,
      hostResponseTime: '1 saat içinde',
      hostLanguages: ['Türkçe', 'İngilizce'],
      isActive: true,
      isFeatured: true,
      overall: '4.9',
      cleanliness: '5.0',
      accuracy: '4.9',
      checkIn: '4.8',
      communication: '5.0',
      location: '5.0',
      value: '4.7',
      reviewCount: 87,
      airbnbPrice: null,
      bookingPrice: null,
      agodaPrice: null,
    },
  };

  return propertyData[slug] || propertyData['istanbul-bogaz-manzarali-villa'];
};

const getSimilarProperties = (currentSlug: string): SimilarProperty[] => {
  return [
    {
      id: '2',
      title: 'Kadıköy Modern Loft',
      slug: 'kadikoy-modern-loft',
      city: 'İstanbul',
      mainImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
      basePrice: '2500',
      overall: '4.7',
      reviewCount: 45,
      bedrooms: 2,
      bathrooms: 1,
    },
  ].filter(prop => prop.slug !== currentSlug);
};

const PropertyDetailsPage = ({ slug: initialSlug }: PropertyDetailsPageProps) => {
  const router = useRouter();
  const { slug: routerSlug } = router.query;
  const slug = initialSlug || routerSlug;

  // UI States
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Booking States
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  // Get property data directly from mock function
  const property = slug ? getPropertyBySlug(slug as string) : null;
  const similarProperties = slug ? getSimilarProperties(slug as string) : [];

  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!property) return { subtotal: 0, cleaning: 0, service: 0, discount: 0, total: 0 };

    const nights = calculateNights();
    if (nights <= 0) return { subtotal: 0, cleaning: 0, service: 0, discount: 0, total: 0 };

    const basePrice = parseInt(property.basePrice);
    const subtotal = basePrice * nights;
    const cleaning = parseInt(property.cleaningFee);
    const service = Math.round(subtotal * 0.10); // 10% service fee

    let discount = 0;
    if (nights >= 30 && property.monthlyDiscount) {
      discount = Math.round(subtotal * (parseInt(property.monthlyDiscount) / 100));
    } else if (nights >= 7 && property.weeklyDiscount) {
      discount = Math.round(subtotal * (parseInt(property.weeklyDiscount) / 100));
    }

    const total = subtotal + cleaning + service - discount;

    return { subtotal, cleaning, service, discount, total };
  };

  // Calculate average competitor price
  const getCompetitorAverage = () => {
    if (!property) return null;
    const prices = [
      property.airbnbPrice ? parseInt(property.airbnbPrice) : null,
      property.bookingPrice ? parseInt(property.bookingPrice) : null,
      property.agodaPrice ? parseInt(property.agodaPrice) : null,
    ].filter((p) => p !== null) as number[];

    if (prices.length === 0) return null;
    return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  };

  // Get all amenities
  const getAmenities = () => {
    if (!property) return { essentials: [], features: [], safety: [] };

    const essentials = [
      { name: 'WiFi', available: property.wifi, icon: Wifi },
      { name: 'Mutfak', available: property.kitchen, icon: ChefHat },
      { name: 'Klima', available: property.airConditioning, icon: Wind },
      { name: 'TV', available: property.tv, icon: Tv },
      { name: 'Çamaşır Makinesi', available: property.washer, icon: Home },
      { name: 'Isıtma', available: property.heating, icon: Wind },
    ];

    const features = [
      { name: 'Havuz', available: property.pool, icon: Waves },
      { name: 'Otopark', available: property.parking, icon: Car },
      { name: 'Deniz Kenarı', available: property.beachfront, icon: Waves },
      { name: 'Deniz Manzarası', available: property.seaview, icon: Eye },
      { name: 'Balkon', available: property.balcony, icon: Home },
    ];

    const safety = [
      { name: 'Çocuk Dostu', available: property.childrenAllowed, icon: Shield },
      { name: 'Evcil Hayvan', available: property.petsAllowed, icon: Heart },
      { name: 'Sigara İçilmez', available: !property.smokingAllowed, icon: Shield },
      { name: 'Parti Yapılmaz', available: !property.partiesAllowed, icon: Shield },
    ];

    return { essentials, features, safety };
  };

  // Handle favorite toggle
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  // Handle booking
  const handleReservation = () => {
    const nights = calculateNights();
    if (nights < (property?.minimumStay || 1)) {
      alert(`Minimum konaklama ${property?.minimumStay} gecedir.`);
      return;
    }
    if (nights > (property?.maximumStay || 365)) {
      alert(`Maximum konaklama ${property?.maximumStay} gecedir.`);
      return;
    }

    const totalGuests = adultsCount + childrenCount + infantsCount;
    if (totalGuests > (property?.guests || 1)) {
      alert(`Maximum ${property?.guests} misafir kabul edilmektedir.`);
      return;
    }

    // Validate dates are selected
    if (!checkInDate || !checkOutDate) {
      alert('Lütfen giriş ve çıkış tarihlerini seçiniz.');
      return;
    }

    // Navigate to booking page with query parameters
    const bookingUrl = `/rentals/book?slug=${property?.slug}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${totalGuests}`;
    router.push(bookingUrl);
  };

  // Error state
  if (!property) {
    return (
      <div className="min-h-screen bg-white/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Özellik Bulunamadı</h1>
          <p className="text-gray-300 mb-6">Bu özellik mevcut değil.</p>
          <button
            onClick={() => router.push('/rentals')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Özelliklere Dön
          </button>
        </div>
      </div>
    );
  }

  const nights = calculateNights();
  const pricing = calculateTotal();
  const competitorAvg = getCompetitorAverage();
  const savings = competitorAvg ? competitorAvg - parseInt(property.basePrice) : 0;
  const savingsPercent = competitorAvg ? Math.round((savings / competitorAvg) * 100) : 0;
  const amenities = getAmenities();

  return (
    <>
      <Head>
        <title>{property.title} | Travel LyDian</title>
        <meta name="description" content={property.description} />
      </Head>

      <div className="min-h-screen bg-white/5">
        {/* Gallery Modal */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={() => setShowGallery(false)}
            >
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
                }}
                className="absolute left-6 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-6 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="w-12 h-12" />
              </button>

              <img
                src={property.images[selectedImage] || '/placeholder-property.jpg'}
                alt={`${property.title} - ${selectedImage + 1}`}
                className="max-w-7xl max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-semibold">
                {selectedImage + 1} / {property.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="bg-transparent border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{parseFloat(property.overall).toFixed(1)}</span>
                    <span className="text-gray-300">({property.reviewCount} değerlendirme)</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{property.district}, {property.city}</span>
                  </div>
                  {property.hostSuperhost && (
                    <>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1 text-purple-600 font-semibold">
                        <Award className="w-5 h-5" />
                        <span>Superhost</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Paylaş</span>
                </button>
                <button
                  onClick={handleFavorite}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="hidden sm:inline">Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div
            className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setShowGallery(true)}
          >
            <div className="col-span-4 md:col-span-2 md:row-span-2 relative h-64 md:h-96">
              <img
                src={property.images[0] || '/placeholder-property.jpg'}
                alt={property.title}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="col-span-2 md:col-span-1 relative h-32 md:h-48">
                <img
                  src={image || '/placeholder-property.jpg'}
                  alt={`${property.title} - ${index + 2}`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
                {index === 3 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                    +{property.images.length - 5} Fotoğraf
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - 60% */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-transparent rounded-2xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {property.type === 'VILLA' ? 'Villa' : property.type === 'APARTMENT' ? 'Apartman' : 'Ev'} - {property.city}
                </h2>

                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span>{property.guests} misafir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-gray-400" />
                    <span>{property.bedrooms} yatak odası</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-gray-400" />
                    <span>{property.beds} yatak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-400" />
                    <span>{property.bathrooms} banyo</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {property.hostName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Ev sahibi: {property.hostName}</h3>
                      <p className="text-sm text-gray-100">{property.hostResponseTime} yanıt verir</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.hostLanguages.map((lang, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 text-gray-200 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
                  {property.instantBook && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Anında Rezervasyon</span>
                    </div>
                  )}
                  {property.hostSuperhost && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Superhost</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-transparent rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">Açıklama</h2>
                <p className="text-gray-200 leading-relaxed whitespace-pre-line">{property.description}</p>
              </motion.div>

              {/* Rating Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-transparent rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <h2 className="text-xl font-bold text-white">
                    {parseFloat(property.overall).toFixed(1)} · {property.reviewCount} değerlendirme
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Temizlik', value: parseFloat(property.cleanliness) },
                    { label: 'Doğruluk', value: parseFloat(property.accuracy) },
                    { label: 'Giriş', value: parseFloat(property.checkIn) },
                    { label: 'İletişim', value: parseFloat(property.communication) },
                    { label: 'Konum', value: parseFloat(property.location) },
                    { label: 'Fiyat-Performans', value: parseFloat(property.value) },
                  ].map((rating, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-200">{rating.label}</span>
                        <span className="text-sm font-bold text-white">{rating.value.toFixed(1)}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                          style={{ width: `${(rating.value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-transparent rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">Olanaklar</h2>

                {/* Essentials */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-200 mb-3">Temel Olanaklar</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amenities.essentials.map((amenity, index) => {
                      const Icon = amenity.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            amenity.available ? 'bg-green-50' : 'bg-white/5 opacity-50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${amenity.available ? 'text-green-600' : 'text-gray-400'}`} />
                          <span className={amenity.available ? 'text-white' : 'text-gray-400'}>
                            {amenity.name}
                          </span>
                          {amenity.available && <Check className="w-4 h-4 text-green-600 ml-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-200 mb-3">Özellikler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amenities.features.map((amenity, index) => {
                      const Icon = amenity.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            amenity.available ? 'bg-blue-50' : 'bg-white/5 opacity-50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${amenity.available ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span className={amenity.available ? 'text-white' : 'text-gray-400'}>
                            {amenity.name}
                          </span>
                          {amenity.available && <Check className="w-4 h-4 text-blue-600 ml-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Safety */}
                <div>
                  <h3 className="font-semibold text-gray-200 mb-3">Güvenlik & Kurallar</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amenities.safety.map((amenity, index) => {
                      const Icon = amenity.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            amenity.available ? 'bg-purple-50' : 'bg-white/5 opacity-50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${amenity.available ? 'text-purple-600' : 'text-gray-400'}`} />
                          <span className={amenity.available ? 'text-white' : 'text-gray-400'}>
                            {amenity.name}
                          </span>
                          {amenity.available && <Check className="w-4 h-4 text-purple-600 ml-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* House Rules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-transparent rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">Ev Kuralları</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Giriş Saati</p>
                      <p className="text-gray-300">{property.checkInTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Çıkış Saati</p>
                      <p className="text-gray-300">{property.checkOutTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Minimum Konaklama</p>
                      <p className="text-gray-300">{property.minimumStay} gece</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Maksimum Konaklama</p>
                      <p className="text-gray-300">{property.maximumStay} gece</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      {property.smokingAllowed ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm text-gray-200">Sigara içilir</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.petsAllowed ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm text-gray-200">Evcil hayvan kabul edilir</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.partiesAllowed ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm text-gray-200">Parti yapılır</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.childrenAllowed ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm text-gray-200">Çocuklar kabul edilir</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-transparent rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">Konum</h2>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{property.district}, {property.city}</p>
                    <p className="text-sm text-gray-100">{property.address}</p>
                  </div>
                </div>
                <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-200">Harita buraya gelecek (Google Maps/Mapbox)</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 40% - Sticky Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-transparent rounded-2xl shadow-2xl p-6 border border-white/10"
              >
                {/* Price */}
                <div className="mb-6">
                  {competitorAvg && savings > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-200 line-through">
                        ₺{competitorAvg.toLocaleString('tr-TR')}
                      </p>
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                        %{savingsPercent} İndirim
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      ₺{parseInt(property.basePrice).toLocaleString('tr-TR')}
                    </span>
                    <span className="text-gray-300">/ gece</span>
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      ₺{savings.toLocaleString('tr-TR')} tasarruf ediyorsunuz!
                    </p>
                  )}
                  {property.weeklyDiscount && (
                    <p className="text-xs text-blue-600 mt-1">
                      7+ gece %{property.weeklyDiscount} indirim
                    </p>
                  )}
                  {property.monthlyDiscount && (
                    <p className="text-xs text-purple-600">
                      30+ gece %{property.monthlyDiscount} indirim
                    </p>
                  )}
                </div>

                {/* Date Pickers */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Giriş
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Çıkış
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Guest Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Misafirler
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-white">Yetişkinler</p>
                          <p className="text-xs text-gray-200">13 yaş ve üzeri</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-gray-400"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{adultsCount}</span>
                          <button
                            onClick={() => setAdultsCount(Math.min(property.guests, adultsCount + 1))}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-white">Çocuklar</p>
                          <p className="text-xs text-gray-200">2-12 yaş</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-gray-400"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{childrenCount}</span>
                          <button
                            onClick={() =>
                              setChildrenCount(Math.min(property.guests - adultsCount, childrenCount + 1))
                            }
                            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-white">Bebekler</p>
                          <p className="text-xs text-gray-200">2 yaş altı</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setInfantsCount(Math.max(0, infantsCount - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-gray-400"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{infantsCount}</span>
                          <button
                            onClick={() => setInfantsCount(infantsCount + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:border-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                {nights > 0 && (
                  <div className="space-y-3 py-4 border-t border-b border-white/10 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        ₺{parseInt(property.basePrice).toLocaleString('tr-TR')} × {nights} gece
                      </span>
                      <span className="font-semibold">₺{pricing.subtotal.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Temizlik ücreti</span>
                      <span className="font-semibold">₺{pricing.cleaning.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Hizmet bedeli</span>
                      <span className="font-semibold">₺{pricing.service.toLocaleString('tr-TR')}</span>
                    </div>
                    {pricing.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">
                          {nights >= 30 ? 'Aylık' : 'Haftalık'} indirim
                        </span>
                        <span className="font-semibold text-green-600">
                          -₺{pricing.discount.toLocaleString('tr-TR')}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {nights > 0 && (
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Toplam</span>
                    <span>₺{pricing.total.toLocaleString('tr-TR')}</span>
                  </div>
                )}

                {/* Reserve Button */}
                <button
                  onClick={handleReservation}
                  disabled={!checkInDate || !checkOutDate || nights <= 0}
                  className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all transform ${
                    !checkInDate || !checkOutDate || nights <= 0
                      ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {property.instantBook ? 'Rezervasyon Yap' : 'Rezervasyon Talebi Gönder'}
                </button>

                <p className="text-center text-xs text-gray-200 mt-4">
                  Şimdi ödeme yapılmayacak
                </p>

                {/* Security Deposit */}
                {property.securityDeposit && parseInt(property.securityDeposit) > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-start gap-2 text-sm text-gray-100">
                      <Shield className="w-4 h-4 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">Güvenlik Depozitosu</p>
                        <p>₺{parseInt(property.securityDeposit).toLocaleString('tr-TR')} (İade edilir)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Host Response Info */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-100">
                    <Clock className="w-4 h-4" />
                    <span>Yanıt süresi: {property.hostResponseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-100">
                    <MessageCircle className="w-4 h-4" />
                    <span>Dil: {property.hostLanguages.join(', ')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Similar Properties */}
              {similarProperties.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 bg-transparent rounded-2xl shadow-md p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4">Benzer Özellikler</h3>
                  <div className="space-y-4">
                    {similarProperties.slice(0, 3).map((similar) => (
                      <a
                        key={similar.id}
                        href={`/rentals/${similar.slug}`}
                        className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="flex gap-3">
                          <img
                            src={similar.mainImage || '/placeholder-property.jpg'}
                            alt={similar.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-white line-clamp-1">
                              {similar.title}
                            </h4>
                            <p className="text-xs text-gray-100">{similar.city}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs font-semibold">{parseFloat(similar.overall).toFixed(1)}</span>
                              </div>
                              <span className="text-xs text-gray-200">·</span>
                              <span className="text-xs font-bold text-white">
                                ₺{parseInt(similar.basePrice).toLocaleString('tr-TR')}/gece
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = [
    'istanbul-bogaz-manzarali-villa',
    'bodrum-deniz-kenari-ev',
    'antalya-lux-apart',
    'cappadocia-cave-hotel',
  ];

  const paths = slugs.map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
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

export default PropertyDetailsPage;
