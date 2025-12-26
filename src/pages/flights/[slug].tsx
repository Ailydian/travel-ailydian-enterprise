import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plane,
  Clock,
  Calendar,
  Users,
  Briefcase,
  Shield,
  Check,
  X,
  Info,
  ChevronRight,
  MapPin,
  Wifi,
  Coffee,
  MonitorPlay,
  UtensilsCrossed,
  Luggage,
  PlaneTakeoff,
  PlaneLanding,
  CircleDot,
} from 'lucide-react';
import SimplifiedHeader from '../../components/layout/SimplifiedHeader';
import { SEOHead } from '../../components/seo/SEOHead';

// Mock flight data - In production, this would come from API/database
const getFlightBySlug = (slug: string) => {
  const flights: Record<string, any> = {
    'ist-ayt-tk123': {
      id: 1,
      slug: 'ist-ayt-tk123',
      airline: 'Turkish Airlines',
      logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop',
      flightNumber: 'TK123',
      aircraft: 'Boeing 737-800',
      from: {
        code: 'IST',
        city: 'İstanbul',
        airport: 'İstanbul Havalimanı',
        terminal: 'Terminal 1'
      },
      to: {
        code: 'AYT',
        city: 'Antalya',
        airport: 'Antalya Havalimanı',
        terminal: 'Terminal 1'
      },
      departure: {
        date: '2024-02-15',
        time: '08:30',
        timezone: 'GMT+3'
      },
      arrival: {
        date: '2024-02-15',
        time: '10:15',
        timezone: 'GMT+3'
      },
      duration: '1s 45d',
      type: 'Direkt',
      amenities: ['WiFi', 'Yemek', 'Eğlence Sistemi', 'USB Şarj'],
      seatsAvailable: {
        economy: 45,
        business: 8,
        first: 2
      },
      baggage: {
        cabin: '8 kg',
        checked: '20 kg',
        additionalFee: 150
      },
      fareClasses: [
        {
          type: 'economy',
          name: 'Ekonomi',
          price: 450,
          originalPrice: 580,
          features: [
            '20 kg bagaj hakkı',
            '8 kg kabin bagajı',
            'Standart koltuk seçimi',
            'Öğün servisi',
            'Ücretsiz değişiklik (ücret farkı ile)'
          ],
          restrictions: [
            'İptal edilemez',
            'İade edilemez'
          ],
          available: true
        },
        {
          type: 'business',
          name: 'Business Class',
          price: 1850,
          originalPrice: 2200,
          features: [
            '30 kg bagaj hakkı',
            '12 kg kabin bagajı',
            'Premium koltuk - ekstra yer',
            'Premium yemek menüsü',
            'Lounge erişimi',
            'Öncelikli boarding',
            'Ücretsiz değişiklik',
            'Tam iade'
          ],
          restrictions: [],
          available: true
        },
        {
          type: 'first',
          name: 'First Class',
          price: 3500,
          originalPrice: 4000,
          features: [
            '40 kg bagaj hakkı',
            '15 kg kabin bagajı',
            'Lie-flat koltuklar',
            'À la carte menü',
            'Şampanya servisi',
            'Lounge erişimi',
            'Öncelikli her şey',
            'Ücretsiz değişiklik',
            'Tam iade',
            'Özel check-in'
          ],
          restrictions: [],
          available: true
        }
      ],
      cancellationPolicy: {
        refundable: false,
        cancellationFee: 100,
        deadline: '24 saat önce'
      }
    }
  };

  return flights[slug] || null;
};

export default function FlightDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedFareClass, setSelectedFareClass] = useState('economy');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });

  if (!slug || typeof slug !== 'string') {
    return null;
  }

  const flight = getFlightBySlug(slug);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Plane className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Uçuş Bulunamadı</h1>
          <Link href="/flights" className="text-lydian-primary hover:underline">
            Uçuş listesine dön
          </Link>
        </div>
      </div>
    );
  }

  const selectedFare = flight.fareClasses.find((f: any) => f.type === selectedFareClass);
  const totalPrice = selectedFare ? selectedFare.price * (passengers.adults + passengers.children) + (passengers.infants * 50) : 0;

  const handleBooking = () => {
    // Pass flight data to booking page via query params
    router.push({
      pathname: '/flights/book',
      query: {
        flightId: flight.id,
        fareClass: selectedFareClass,
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants
      }
    });
  };

  return (
    <>
      <SEOHead
        title={`${flight.from.city} - ${flight.to.city} Uçak Bileti | ${flight.airline}`}
        description={`${flight.airline} ile ${flight.from.city} - ${flight.to.city} arası direkt uçuş. ${selectedFare?.price}₺'den başlayan fiyatlarla.`}
        type="website"
      />

      <SimplifiedHeader />

      {/* Return Button */}
      <div className="sticky top-16 z-40 bg-transparent border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link
            href="/flights"
            className="inline-flex items-center gap-2 text-gray-200 hover:text-lydian-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Uçuşlara Dön</span>
          </Link>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Flight Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent rounded-2xl shadow-lg p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src={flight.logo} alt={flight.airline} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{flight.airline}</h1>
                  <p className="text-gray-300">{flight.flightNumber} • {flight.aircraft}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {flight.type}
                </span>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-semibold">Blockchain Güvenli</span>
                </div>
              </div>
            </div>

            {/* Flight Route Visualization */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* Departure */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <PlaneTakeoff className="w-5 h-5 text-lydian-primary" />
                    <span className="text-sm font-medium text-gray-300">Kalkış</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{flight.departure.time}</div>
                  <div className="text-lg font-semibold text-gray-200">{flight.from.code}</div>
                  <div className="text-sm text-gray-300">{flight.from.city}</div>
                  <div className="text-xs text-gray-500 mt-1">{flight.from.airport}</div>
                  <div className="text-xs text-gray-500">{flight.from.terminal}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {flight.departure.date}
                  </div>
                </div>

                {/* Duration & Flight Path */}
                <div className="text-center relative">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-lydian-primary to-blue-400"></div>
                    <motion.div
                      animate={{ x: [0, 20, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mx-2"
                    >
                      <Plane className="w-6 h-6 text-lydian-primary transform rotate-90" />
                    </motion.div>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-lydian-primary"></div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{flight.duration}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{flight.type} Uçuş</div>
                </div>

                {/* Arrival */}
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2 justify-end">
                    <span className="text-sm font-medium text-gray-300">Varış</span>
                    <PlaneLanding className="w-5 h-5 text-lydian-primary" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{flight.arrival.time}</div>
                  <div className="text-lg font-semibold text-gray-200">{flight.to.code}</div>
                  <div className="text-sm text-gray-300">{flight.to.city}</div>
                  <div className="text-xs text-gray-500 mt-1">{flight.to.airport}</div>
                  <div className="text-xs text-gray-500">{flight.to.terminal}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {flight.arrival.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-200 mb-3">Uçuş İmkanları</h3>
              <div className="flex flex-wrap gap-3">
                {flight.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                    {amenity.includes('WiFi') && <Wifi className="w-4 h-4 text-blue-600" />}
                    {amenity.includes('Yemek') && <UtensilsCrossed className="w-4 h-4 text-blue-600" />}
                    {amenity.includes('Eğlence') && <MonitorPlay className="w-4 h-4 text-blue-600" />}
                    {amenity.includes('USB') && <Coffee className="w-4 h-4 text-blue-600" />}
                    <span className="text-sm font-medium text-blue-900">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Fare Classes & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Fare Class Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-transparent rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">Ücret Sınıfı Seçin</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {flight.fareClasses.map((fare: any) => (
                    <motion.button
                      key={fare.type}
                      onClick={() => setSelectedFareClass(fare.type)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        selectedFareClass === fare.type
                          ? 'border-lydian-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {selectedFareClass === fare.type && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 bg-lydian-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      <h3 className="font-bold text-lg text-white mb-2">{fare.name}</h3>
                      {fare.originalPrice && (
                        <div className="text-sm text-gray-500 line-through mb-1">₺{fare.originalPrice}</div>
                      )}
                      <div className="text-3xl font-bold text-lydian-primary mb-1">₺{fare.price}</div>
                      <div className="text-xs text-gray-500">kişi başına</div>
                      <div className="mt-4 text-xs text-gray-300">
                        <div className="flex items-center gap-1 mb-1">
                          <Luggage className="w-3 h-3" />
                          <span>{fare.features[0]}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Fare Details */}
              {selectedFare && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-transparent rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    {selectedFare.name} - Dahil Olan Hizmetler
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Dahil Olanlar
                      </h3>
                      <ul className="space-y-2">
                        {selectedFare.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                            <CircleDot className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedFare.restrictions.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <X className="w-5 h-5 text-red-600" />
                          Kısıtlamalar
                        </h3>
                        <ul className="space-y-2">
                          {selectedFare.restrictions.map((restriction: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                              <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>{restriction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Baggage Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-transparent rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Luggage className="w-6 h-6 text-lydian-primary" />
                  Bagaj Bilgileri
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">Kabin Bagajı</h3>
                    <p className="text-2xl font-bold text-lydian-primary mb-1">{flight.baggage.cabin}</p>
                    <p className="text-sm text-gray-300">Dahil</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">Kontrol Edilen Bagaj</h3>
                    <p className="text-2xl font-bold text-green-600 mb-1">{flight.baggage.checked}</p>
                    <p className="text-sm text-gray-300">Ücret sınıfına göre değişir</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex gap-2">
                    <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div className="text-sm text-gray-200">
                      <p className="font-medium mb-1">Ek Bagaj</p>
                      <p>Ek bagaj ücreti: <span className="font-semibold">₺{flight.baggage.additionalFee}</span> / adet</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Cancellation Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-transparent rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-white mb-4">İptal Politikası</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    {flight.cancellationPolicy.refundable ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-white">
                        {flight.cancellationPolicy.refundable ? 'İade Edilebilir' : 'İade Edilemez'}
                      </p>
                      <p className="text-sm text-gray-300 mt-1">
                        {flight.cancellationPolicy.refundable
                          ? 'Bu bilet iptal edilebilir ve iade alınabilir.'
                          : 'Bu bilet iptal edilemez ve iade alınamaz.'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-300">
                      İptal süresi: <span className="font-semibold">{flight.cancellationPolicy.deadline}</span>
                    </p>
                    {flight.cancellationPolicy.cancellationFee > 0 && (
                      <p className="text-sm text-gray-300 mt-1">
                        İptal ücreti: <span className="font-semibold">₺{flight.cancellationPolicy.cancellationFee}</span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-transparent rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-white mb-6">Rezervasyon Özeti</h2>

                {/* Passenger Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Yolcu Sayısı
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">Yetişkin (12+)</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{passengers.adults}</span>
                        <button
                          onClick={() => setPassengers(p => ({ ...p, adults: Math.min(9, p.adults + 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">Çocuk (2-11)</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{passengers.children}</span>
                        <button
                          onClick={() => setPassengers(p => ({ ...p, children: Math.min(9, p.children + 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">Bebek (0-2)</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPassengers(p => ({ ...p, infants: Math.max(0, p.infants - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{passengers.infants}</span>
                        <button
                          onClick={() => setPassengers(p => ({ ...p, infants: Math.min(passengers.adults, p.infants + 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-semibold text-white mb-3">Fiyat Detayı</h3>
                  <div className="space-y-2 text-sm">
                    {passengers.adults > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">{passengers.adults} Yetişkin x ₺{selectedFare?.price}</span>
                        <span className="font-semibold">₺{passengers.adults * (selectedFare?.price || 0)}</span>
                      </div>
                    )}
                    {passengers.children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">{passengers.children} Çocuk x ₺{selectedFare?.price}</span>
                        <span className="font-semibold">₺{passengers.children * (selectedFare?.price || 0)}</span>
                      </div>
                    )}
                    {passengers.infants > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">{passengers.infants} Bebek x ₺50</span>
                        <span className="font-semibold">₺{passengers.infants * 50}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Toplam</span>
                      <span className="text-2xl font-bold text-lydian-primary">₺{totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  onClick={handleBooking}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Rezervasyon Yap
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    Blockchain ile güvenli rezervasyon
                  </div>
                </div>

                {/* Seats Available */}
                <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <div className="flex items-center gap-2 text-orange-700 mb-2">
                    <Info className="w-5 h-5" />
                    <span className="font-semibold text-sm">Kalan Koltuk</span>
                  </div>
                  <p className="text-sm text-gray-200">
                    {selectedFareClass === 'economy' && `${flight.seatsAvailable.economy} ekonomi koltuk`}
                    {selectedFareClass === 'business' && `${flight.seatsAvailable.business} business koltuk`}
                    {selectedFareClass === 'first' && `${flight.seatsAvailable.first} first class koltuk`}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
