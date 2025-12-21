/**
 * Rental Property Detail Page
 * Individual property page with booking, reviews, gallery, and map
 */

import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  UserGroupIcon,
  HomeIcon,
  CheckBadgeIcon,
  BoltIcon,
  WifiIcon,
  TvIcon,
  FireIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { rentalProperties, RentalProperty, getPriceSavings } from '../../data/rental-properties';
import { useToast } from '../../context/ToastContext';

// Dynamic imports
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

interface PropertyPageProps {
  property: RentalProperty;
}

const PropertyPage: React.FC<PropertyPageProps> = ({ property }) => {
  const router = useRouter();
  const { showSuccess, showInfo } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const savings = getPriceSavings(property);
  const savingsPercentage = savings > 0 ? Math.round((savings / property.pricing.basePrice) * 100) : 0;

  // Calculate nights and total price
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 7;
  const nightlyRate = property.pricing.basePrice;
  const cleaningFee = property.pricing.cleaningFee;
  const subtotal = nightlyRate * nights;
  const total = subtotal + cleaningFee;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showInfo('Link Kopyalandı', 'Özellik linki panoya kopyalandı');
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showSuccess('Favorilere Eklendi', 'Özellik favorilerinize eklendi');
    } else {
      showInfo('Favorilerden Çıkarıldı', 'Özellik favorilerinizden kaldırıldı');
    }
  };

  const handleBooking = () => {
    showSuccess('Rezervasyon Başlatıldı', 'Ödeme sayfasına yönlendiriliyorsunuz...');
    setTimeout(() => {
      router.push(`/checkout?property=${property.id}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`);
    }, 1500);
  };

  if (router.isFallback) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <NextSeo
        title={property.seo.metaTitle}
        description={property.seo.metaDescription}
        canonical={`https://travel.ailydian.com/rentals/${property.slug}`}
        openGraph={{
          url: `https://travel.ailydian.com/rentals/${property.slug}`,
          title: property.seo.metaTitle,
          description: property.seo.metaDescription,
          images: [
            {
              url: property.images[0] || 'https://travel.ailydian.com/og-rental.jpg',
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ],
        }}
      />

      <Head>
        <title>{property.seo.metaTitle}</title>
        <meta name="description" content={property.seo.metaDescription} />
        <meta name="keywords" content={property.seo.keywords.join(', ')} />
      </Head>

      <div className="min-h-screen bg-gray-50">
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
                <XMarkIcon className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
                }}
                className="absolute left-6 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeftIcon className="w-12 h-12" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-6 text-white hover:text-gray-300 z-10"
              >
                <ChevronRightIcon className="w-12 h-12" />
              </button>

              <img
                src={property.images[selectedImage] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'}
                alt={`${property.title} - ${selectedImage + 1}`}
                className="max-w-7xl max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === selectedImage ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">{property.rating.overall.toFixed(1)}</span>
                    <span className="text-gray-600">({property.rating.reviewCount} değerlendirme)</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    <span>
                      {property.location.district}, {property.location.city}
                    </span>
                  </div>
                  {property.host.superhost && (
                    <>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1 text-purple-600 font-semibold">
                        <CheckBadgeIcon className="w-5 h-5" />
                        <span>Superhost</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <ShareIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Paylaş</span>
                </button>
                <button
                  onClick={handleFavorite}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-all"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div
            className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setShowGallery(true)}
          >
            <div className="col-span-4 md:col-span-2 md:row-span-2 relative h-64 md:h-96">
              <img
                src={property.images[0] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'}
                alt={property.title}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="col-span-2 md:col-span-1 relative h-32 md:h-48">
                <img
                  src={image || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'}
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
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <img
                    src={property.host.avatar || '/default-avatar.png'}
                    alt={property.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Ev sahibi: {property.host.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(property.host.joinedDate).getFullYear()} yılından beri üye
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <UserGroupIcon className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">{property.capacity.guests} misafir</p>
                      <p className="text-sm text-gray-600">Maksimum kapasite</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HomeIcon className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">{property.capacity.bedrooms} yatak odası</p>
                      <p className="text-sm text-gray-600">{property.capacity.beds} yatak</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HomeIcon className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900">{property.capacity.bathrooms} banyo</p>
                      <p className="text-sm text-gray-600">Tam donanımlı</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HomeIcon className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">{property.type}</p>
                      <p className="text-sm text-gray-600">Özellik tipi</p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 py-6">
                  {property.availability.instantBook && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
                      <BoltIcon className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Anında Rezervasyon</span>
                    </div>
                  )}
                  {property.verified && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
                      <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Doğrulanmış</span>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Açıklama</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Olanaklar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
                        <CheckBadgeIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <span className="font-medium text-gray-900">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Konum</h2>
                <p className="text-gray-700 mb-4">{property.location.address}</p>
                <div className="h-96 rounded-xl overflow-hidden">
                  {typeof window !== 'undefined' && (
                    <MapContainer
                      center={[property.location.coordinates.lat, property.location.coordinates.lng]}
                      zoom={15}
                      scrollWheelZoom={false}
                      className="w-full h-full"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[property.location.coordinates.lat, property.location.coordinates.lng]}
                      />
                    </MapContainer>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
              >
                {/* Price */}
                <div className="mb-6">
                  {property.pricing.competitorPrices && savings > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-400 line-through">
                        {Math.round(
                          ((property.pricing.competitorPrices.airbnb || 0) +
                            (property.pricing.competitorPrices.booking || 0) +
                            (property.pricing.competitorPrices.agoda || 0)) /
                            3
                        ).toLocaleString('tr-TR')} ₺
                      </p>
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                        %{savingsPercentage} İndirim
                      </span>
                    </div>
                  )}
                  <p className="text-3xl font-bold text-gray-900">
                    {property.pricing.basePrice.toLocaleString('tr-TR')} ₺
                    <span className="text-base font-normal text-gray-600"> / gece</span>
                  </p>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      {savings.toLocaleString('tr-TR')} ₺ tasarruf ediyorsunuz!
                    </p>
                  )}
                </div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <CalendarIcon className="w-4 h-4 inline mr-1" />
                        Giriş
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <CalendarIcon className="w-4 h-4 inline mr-1" />
                        Çıkış
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <UserGroupIcon className="w-4 h-4 inline mr-1" />
                      Misafir Sayısı
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {Array.from({ length: property.capacity.guests }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} misafir
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-t border-b border-gray-200 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {nightlyRate.toLocaleString('tr-TR')} ₺ x {nights} gece
                    </span>
                    <span className="font-semibold">{subtotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Temizlik ücreti</span>
                    <span className="font-semibold">{cleaningFee.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Toplam</span>
                  <span>{total.toLocaleString('tr-TR')} ₺</span>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {property.availability.instantBook ? 'Rezervasyon Yap' : 'Rezervasyon Talebi Gönder'}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Şimdi ödeme yapılmayacak
                </p>

                {/* Host Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>Yanıt süresi: {property.host.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckBadgeIcon className="w-4 h-4" />
                    <span>Yanıt oranı: %{property.host.responseRate}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = rentalProperties.map((property) => ({
    params: { slug: property.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const property = rentalProperties.find((p) => p.slug === params?.slug);

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default PropertyPage;
