import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Mail, Wifi, Coffee, Car, Heart, Share2, Calendar, Users, CreditCard } from 'lucide-react';

interface Hotel {
  name: string;
  slug: string;
  city: string;
  district: string;
  address: string;
  stars: number;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  website: string;
  checkIn: string;
  checkOut: string;
  description: string;
  amenities: string[];
  roomTypes: Array<{ name: string; size: number; capacity: number; price: number }>;
  images: string[];
  tags: string[];
  nearbyAttractions: Array<{ name: string; distance: number; unit: string }>;
}

export default function HotelDetailPage({ hotel }: { hotel: Hotel }) {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(hotel.roomTypes[0]);

  const handleReservation = () => {
    router.push({
      pathname: '/checkout',
      query: {
        hotel: hotel.slug,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        rooms,
        roomType: selectedRoom.name
      }
    });
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateNights() * selectedRoom.price * rooms;

  return (
    <>
      <Head>
        <title>{hotel.name} - {hotel.city} Otel Rezervasyonu | Travel LyDian</title>
        <meta name="description" content={hotel.description} />
        <meta name="keywords" content={`${hotel.name}, ${hotel.city} otel, ${hotel.district} otel, ${hotel.tags.join(', ')}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Gallery */}
        <div className="relative h-96 bg-gray-900">
          {hotel.images.length > 0 && (
            <Image
              src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=800&h=600&fit=crop'}
              alt={hotel.name}
              fill
              className="object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Hotel Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.district}, {hotel.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{hotel.rating}</span>
                  <span>({hotel.reviewCount} değerlendirme)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-transparent rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Otel Hakkında</h2>
                <p className="text-gray-300 leading-relaxed">{hotel.description}</p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-transparent rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Otel Özellikleri</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-200">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Wifi className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Room Types */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-transparent rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Oda Tipleri</h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedRoom(room)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        selectedRoom.name === room.name
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{room.name}</h3>
                          <div className="flex gap-4 text-sm text-gray-300 mt-2">
                            <span>{room.size} m²</span>
                            <span>• {room.capacity} Kişi</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {room.price.toLocaleString('tr-TR')} ₺
                          </div>
                          <div className="text-sm text-gray-500">/ gece</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Nearby Attractions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-transparent rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Yakındaki Yerler</h2>
                <div className="space-y-3">
                  {hotel.nearbyAttractions.map((attraction, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{attraction.name}</span>
                      <span className="text-sm text-gray-300">
                        {attraction.distance} {attraction.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Reservation Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-transparent rounded-xl p-6 shadow-lg sticky top-4"
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedRoom.price.toLocaleString('tr-TR')} ₺
                  </div>
                  <div className="text-sm text-gray-500">gece başına</div>
                </div>

                <div className="space-y-4">
                  {/* Check-in */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Giriş Tarihi
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Çıkış Tarihi
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Misafir Sayısı
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        min="1"
                        max="10"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Oda Sayısı
                    </label>
                    <input
                      type="number"
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      min="1"
                      max="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Total Price */}
                  {calculateNights() > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>{selectedRoom.price.toLocaleString('tr-TR')} ₺ x {calculateNights()} gece x {rooms} oda</span>
                        <span>{totalPrice.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Toplam</span>
                        <span className="text-blue-600">{totalPrice.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    </div>
                  )}

                  {/* Reserve Button */}
                  <button
                    onClick={handleReservation}
                    disabled={!checkInDate || !checkOutDate}
                    className="w-full bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Rezervasyon Yap</span>
                    </div>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Ücretsiz iptal · Anında onay
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${hotel.phone}`} className="hover:text-blue-600">
                      {hotel.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${hotel.email}`} className="hover:text-blue-600">
                      {hotel.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  // In production, fetch from database
  // For now, return mock data
  const hotel = {
    name: 'Regnum Carya Golf & Spa Resort',
    slug: 'regnum-carya-golf-spa-resort-belek',
    city: 'Antalya',
    district: 'Belek',
    address: 'Acısu Mevkii, İskele Cad. No:4, 07506 Belek',
    stars: 5,
    rating: 9.4,
    reviewCount: 4850,
    priceMin: 35000,
    priceMax: 85000,
    lat: 36.861782,
    lng: 31.055847,
    phone: '+90 242 710 17 00',
    email: 'reservation@regnumhotels.com',
    website: 'https://www.regnumcarya.com',
    checkIn: '14:00',
    checkOut: '12:00',
    description: 'G7 Liderler Zirvesi\'ne ev sahipliği yapmış 5 yıldızlı ultra lüks resort. PGA standartlarında 18 delikli golf sahası.',
    amenities: ['Ultra All Inclusive', '18 Delikli Golf Sahası', 'Spa & Wellness Center', 'Aquapark', 'Kids Club', 'Özel Plaj', 'WiFi', '8 A La Carte Restoran'],
    roomTypes: [
      { name: 'Deluxe Room', size: 45, capacity: 3, price: 35000 },
      { name: 'Executive Suite', size: 70, capacity: 4, price: 55000 },
      { name: 'Villa', size: 120, capacity: 6, price: 85000 }
    ],
    images: ['/hotels/regnum-carya-1.jpg'],
    tags: ['lüks', 'golf', 'spa', 'all-inclusive'],
    nearbyAttractions: [
      { name: 'Aspendos Antik Tiyatrosu', distance: 15, unit: 'km' },
      { name: 'Antalya Havalimanı', distance: 30, unit: 'km' }
    ]
  };

  return {
    props: {
      hotel
    }
  };
};
