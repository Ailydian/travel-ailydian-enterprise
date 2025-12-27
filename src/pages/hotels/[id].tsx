/**
 * Hotel Detail Page - Dynamic Route
 * Shows complete hotel information with booking capability
 */
import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FuturisticHeader from '../../components/layout/FuturisticHeader';
import BookingFooter from '../../components/layout/BookingFooter';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Check,
  X,
  Wifi,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Car,
  Clock,
  Users,
  Bed,
  Bath,
  Home,
  Shield,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import antalyaHotels, { Hotel } from '../../data/antalya-hotels';

interface HotelDetailPageProps {
  hotel: Hotel;
}

const HotelDetailPage: NextPage<HotelDetailPageProps> = ({ hotel }) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const currentLang = (i18n.language || 'tr') as 'tr' | 'en';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState(hotel.roomTypes[0]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const handleBooking = () => {
    router.push(`/checkout?type=hotel&id=${hotel.id}&room=${selectedRoomType.name[currentLang]}`);
  };

  return (
    <>
      <Head>
        <title>{hotel.name[currentLang]} | Travel LyDian</title>
        <meta name="description" content={hotel.description[currentLang]} />
        <meta name="keywords" content={`${hotel.location.region}, otel, ${hotel.category}, ${hotel.stars} yıldız`} />
        <meta property="og:title" content={hotel.name[currentLang]} />
        <meta property="og:description" content={hotel.longDescription[currentLang]} />
        <meta property="og:image" content={hotel.images[0]} />
        <meta property="og:type" content="website" />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-white/5">
        {/* Breadcrumbs */}
        <div className="bg-transparent border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-100">
              <Link href="/" className="hover:text-lydian-primary">{currentLang === 'tr' ? 'Ana Sayfa' : 'Home'}</Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-lydian-primary">{currentLang === 'tr' ? 'Keşfet' : 'Explore'}</Link>
              <span>/</span>
              <Link href="/explore/places-to-stay" className="hover:text-lydian-primary">{currentLang === 'tr' ? 'Konaklama' : 'Places to Stay'}</Link>
              <span>/</span>
              <span className="text-white font-semibold">{hotel.name[currentLang]}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3 relative rounded-2xl overflow-hidden h-96 lg:h-[500px]">
              <img
                src={hotel.images[currentImageIndex]}
                alt={hotel.name[currentLang]}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white/5 p-3 rounded-full shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white/5 p-3 rounded-full shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {hotel.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="hidden lg:grid grid-cols-1 gap-4">
              {hotel.images.slice(1, 5).map((image, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden h-28">
                  <img
                    src={image}
                    alt={`${hotel.name[currentLang]} ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => setCurrentImageIndex(idx + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title & Rating */}
              <div className="bg-transparent rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-black text-white mb-2">{hotel.name[currentLang]}</h1>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-5 h-5" />
                      <span>{hotel.location.address[currentLang]}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 rounded-full hover:bg-white/10 transition">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full hover:bg-white/10 transition">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-lydian-primary text-white font-bold rounded-lg">
                      {hotel.rating}
                    </div>
                    <span className="text-gray-300">({hotel.reviewCount} {currentLang === 'tr' ? 'değerlendirme' : 'reviews'})</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-transparent rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{currentLang === 'tr' ? 'Açıklama' : 'Description'}</h2>
                <p className="text-gray-200 leading-relaxed">{hotel.longDescription[currentLang]}</p>
              </div>

              {/* Features */}
              <div className="bg-transparent rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{currentLang === 'tr' ? 'Özellikler' : 'Features'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {hotel.features[currentLang].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-transparent rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{currentLang === 'tr' ? 'Olanaklar' : 'Amenities'}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hotel.amenities[currentLang].map((amenity, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-lydian-primary/10 rounded-full flex items-center justify-center">
                        {idx % 5 === 0 && <Wifi className="w-6 h-6 text-lydian-primary" />}
                        {idx % 5 === 1 && <Waves className="w-6 h-6 text-lydian-primary" />}
                        {idx % 5 === 2 && <UtensilsCrossed className="w-6 h-6 text-lydian-primary" />}
                        {idx % 5 === 3 && <Dumbbell className="w-6 h-6 text-lydian-primary" />}
                        {idx % 5 === 4 && <Car className="w-6 h-6 text-lydian-primary" />}
                      </div>
                      <span className="text-sm text-center font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="bg-transparent rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{currentLang === 'tr' ? 'Otel Politikaları' : 'Hotel Policies'}</h2>
                <div className="space-y-3">
                  {hotel.policies[currentLang].map((policy, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{currentLang === 'tr' ? 'Yakındaki Yerler' : 'Nearby Attractions'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.nearbyAttractions.map((attraction, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-lydian-primary" />
                        <span className="font-medium">{attraction.name}</span>
                      </div>
                      <span className="text-sm text-gray-100">{attraction.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-transparent rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                  <div className="mb-6">
                    <div className="text-sm text-gray-100 mb-1">{currentLang === 'tr' ? 'Fiyat' : 'Price'}</div>
                    <div className="text-4xl font-black text-lydian-primary">
                      ₺{selectedRoomType.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-100">{currentLang === 'tr' ? 'Gecelik' : 'Per night'}</div>
                  </div>

                  {/* Room Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">{currentLang === 'tr' ? 'Oda Tipi' : 'Room Type'}</label>
                    <select
                      value={selectedRoomType.name[currentLang]}
                      onChange={(e) => {
                        const room = hotel.roomTypes.find(r => r.name[currentLang] === e.target.value);
                        if (room) setSelectedRoomType(room);
                      }}
                      className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-lydian-primary focus:border-transparent"
                    >
                      {hotel.roomTypes.map((room, idx) => (
                        <option key={idx} value={room.name[currentLang]}>
                          {room.name[currentLang]} - ₺{room.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">{currentLang === 'tr' ? 'Misafir Sayısı' : 'Guests'}</label>
                    <div className="flex items-center gap-2 p-4 border border-white/20 rounded-xl">
                      <Users className="w-5 h-5 text-gray-300" />
                      <span>{selectedRoomType.capacity} {currentLang === 'tr' ? 'kişi' : 'people'}</span>
                    </div>
                  </div>

                  {/* Check-in / Check-out */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">{currentLang === 'tr' ? 'Giriş' : 'Check-in'}</label>
                      <div className="flex items-center gap-2 p-3 border border-white/20 rounded-xl">
                        <Clock className="w-5 h-5 text-gray-300" />
                        <span className="text-sm">{hotel.checkInTime}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{currentLang === 'tr' ? 'Çıkış' : 'Check-out'}</label>
                      <div className="flex items-center gap-2 p-3 border border-white/20 rounded-xl">
                        <Clock className="w-5 h-5 text-gray-300" />
                        <span className="text-sm">{hotel.checkOutTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    className="w-full bg-lydian-primary hover:bg-lydian-dark text-white font-bold py-4 px-6 rounded-xl transition-colors mb-4"
                  >
                    {currentLang === 'tr' ? 'Rezervasyon Yap' : 'Book Now'}
                  </motion.button>

                  <p className="text-xs text-center text-gray-300">
                    {currentLang === 'tr' ? 'Şimdi ödeme yapmayacaksınız' : 'You won\'t be charged yet'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BookingFooter />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = antalyaHotels.flatMap(hotel =>
    ['tr', 'en'].map(locale => ({
      params: { id: hotel.id },
      locale
    }))
  );

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const hotel = antalyaHotels.find(h => h.id === params?.id);

  if (!hotel) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      hotel,
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
  };
};

export default HotelDetailPage;
