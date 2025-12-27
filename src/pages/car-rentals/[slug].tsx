/**
 * Car Rental Details Page
 * Comprehensive car information with booking calculator
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Car, Star, Users, Settings, Fuel, Shield, MapPin, Calendar,
  Check, X, ChevronLeft, ChevronRight, Heart, Share2, Clock,
  CreditCard, FileText, AlertCircle, ArrowRight, Sparkles,
  Gauge, DollarSign, TrendingUp
} from 'lucide-react';
import antalyaCarRentals from '@/data/antalya-car-rentals';
import AnimatedCarIcon from '@/components/icons/AnimatedCarIcon';

// Types
interface CarRental {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  luggage: number;
  features: string[];
  airConditioning: boolean;
  gps: boolean;
  bluetooth: boolean;
  usbCharger: boolean;
  pricePerDay: string;
  pricePerWeek: string;
  pricePerMonth: string;
  currency: string;
  deposit: string;
  insuranceIncluded: boolean;
  insuranceType: string;
  pickupLocations: string[];
  allowDifferentDropoff: boolean;
  availableCount: number;
  isAvailable: boolean;
  mainImage: string;
  images: string[];
  minimumAge: number;
  drivingLicenseYears: number;
  requiredDocuments: string[];
  unlimitedMileage: boolean;
  mileageLimit: number;
  isActive: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  rating: string;
  reviewCount: number;
}

interface SimilarCar {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  pricePerDay: string;
  currency: string;
  mainImage: string;
  rating: string;
  reviewCount: number;
}

interface CarDetailsPageProps {
  slug: string;
  car?: CarRental;
}

// Mock data function - matches database schema
const getCarBySlug = (slug: string): CarRental => {
  const carData: Record<string, CarRental> = {
    'mercedes-vito-vip': {
      id: '1',
      name: 'Mercedes Vito VIP',
      slug: 'mercedes-vito-vip',
      description: 'Lüks ve konforlu Mercedes Vito VIP ile seyahatinizin keyfini çıkarın. Profesyonel şoför hizmeti ile havalimanı transferleri, şehir içi geziler ve özel etkinlikleriniz için ideal.',
      shortDescription: 'Premium VIP transfer aracı',
      brand: 'Mercedes-Benz',
      model: 'Vito',
      year: 2023,
      category: 'VAN',
      transmission: 'AUTOMATIC',
      fuelType: 'Dizel',
      seats: 8,
      doors: 4,
      luggage: 8,
      features: ['Deri Koltuklar', 'Geniş Bagaj', 'Premium Ses Sistemi', 'Panoramik Tavan', 'Çift Klima', 'USB Şarj Portları'],
      airConditioning: true,
      gps: true,
      bluetooth: true,
      usbCharger: true,
      pricePerDay: '1200',
      pricePerWeek: '7500',
      pricePerMonth: '25000',
      currency: 'TRY',
      deposit: '3000',
      insuranceIncluded: true,
      insuranceType: 'Kasko',
      pickupLocations: ['İstanbul Havalimanı', 'Sabiha Gökçen Havalimanı', 'Taksim', 'Beşiktaş'],
      allowDifferentDropoff: true,
      availableCount: 3,
      isAvailable: true,
      mainImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200',
      ],
      minimumAge: 25,
      drivingLicenseYears: 3,
      requiredDocuments: ['Geçerli Ehliyet', 'Kimlik/Pasaport', 'Kredi Kartı'],
      unlimitedMileage: false,
      mileageLimit: 200,
      isActive: true,
      isFeatured: true,
      isPopular: true,
      rating: '4.8',
      reviewCount: 156,
    },
    'volkswagen-transporter': {
      id: '2',
      name: 'Volkswagen Transporter',
      slug: 'volkswagen-transporter',
      description: 'Volkswagen Transporter ile güvenli ve konforlu yolculuk yapın.',
      shortDescription: 'Güvenilir ve konforlu',
      brand: 'Volkswagen',
      model: 'Transporter',
      year: 2022,
      category: 'VAN',
      transmission: 'MANUAL',
      fuelType: 'Dizel',
      seats: 9,
      doors: 4,
      luggage: 10,
      features: ['Geniş İç Mekan', 'Ekonomik Yakıt', 'Bagaj Alanı', 'Klima'],
      airConditioning: true,
      gps: true,
      bluetooth: false,
      usbCharger: true,
      pricePerDay: '950',
      pricePerWeek: '6000',
      pricePerMonth: '20000',
      currency: 'TRY',
      deposit: '2500',
      insuranceIncluded: true,
      insuranceType: 'Trafik + Kasko',
      pickupLocations: ['İstanbul Havalimanı', 'Kadıköy', 'Üsküdar'],
      allowDifferentDropoff: true,
      availableCount: 5,
      isAvailable: true,
      mainImage: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1200',
      images: ['https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1200'],
      minimumAge: 23,
      drivingLicenseYears: 2,
      requiredDocuments: ['Geçerli Ehliyet', 'Kimlik/Pasaport', 'Kredi Kartı'],
      unlimitedMileage: true,
      mileageLimit: 0,
      isActive: true,
      isFeatured: false,
      isPopular: true,
      rating: '4.6',
      reviewCount: 98,
    },
  };

  return carData[slug] || carData['mercedes-vito-vip'];
};

const getSimilarCars = (currentSlug: string): SimilarCar[] => {
  return [
    {
      id: '2',
      name: 'Volkswagen Transporter',
      slug: 'volkswagen-transporter',
      brand: 'Volkswagen',
      model: 'Transporter',
      category: 'VAN',
      pricePerDay: '950',
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=600',
      rating: '4.6',
      reviewCount: 98,
    },
  ].filter(car => car.slug !== currentSlug);
};

const CarDetailsPage = ({ slug: initialSlug, car: carProp }: CarDetailsPageProps) => {
  const router = useRouter();
  const { slug: routerSlug } = router.query;
  const slug = initialSlug || routerSlug;

  const [isFavorite, setIsFavorite] = useState(false);

  // Booking calculator state
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Get car data from props or fallback to mock function
  const car = carProp || (slug ? getCarBySlug(slug as string) : null);
  const similarCars = slug ? getSimilarCars(slug as string) : [];

  // Set initial pickup location
  useEffect(() => {
    if (car && car.pickupLocations.length > 0 && !pickupLocation) {
      setPickupLocation(car.pickupLocations[0]);
    }
  }, [car, pickupLocation]);

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
    if (!car) return 0;
    const days = calculateDays();
    if (days <= 0) return 0;

    let total = parseInt(car.pricePerDay) * days;

    // Add addons
    selectedAddons.forEach(addon => {
      if (addon === 'gps') total += 50 * days;
      if (addon === 'insurance') total += 100 * days;
      if (addon === 'child-seat') total += 30 * days;
    });

    return total;
  };

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ECONOMY_SEDAN: 'bg-blue-100 text-blue-800',
      PREMIUM_SEDAN: 'bg-purple-100 text-purple-800',
      ECONOMY_SUV: 'bg-green-100 text-green-800',
      PREMIUM_SUV: 'bg-indigo-100 text-indigo-800',
      LUXURY: 'bg-amber-100 text-amber-800',
      SPORTS: 'bg-red-100 text-red-800',
      VAN: 'bg-cyan-100 text-cyan-800',
      MINIVAN: 'bg-teal-100 text-teal-800',
      COMPACT: 'bg-slate-100 text-slate-800',
    };
    return colors[category] || 'bg-white/10 text-gray-100';
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-white/5 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Araç Bulunamadı</h2>
          <p className="text-gray-300 mb-4">Aradığınız araç mevcut değil.</p>
          <Link href="/car-rentals">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Tüm Araçlara Dön
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const days = calculateDays();
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-white/5">
      {/* Header */}
      <div className="bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/car-rentals">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Tüm Araçlar
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Display */}
            <div className="bg-transparent rounded-2xl overflow-hidden shadow-sm">
              <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-12 flex items-center justify-center min-h-[400px] rounded-2xl">
                <AnimatedCarIcon size="xl" />
                {car.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 z-10">
                    <Sparkles className="w-4 h-4" />
                    ÖNE ÇIKAN
                  </div>
                )}
                {car.isPopular && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 z-10">
                    <TrendingUp className="w-4 h-4" />
                    POPÜLER
                  </div>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-transparent rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-200'}`} />
                </button>
              </div>
            </div>

            {/* Car Info */}
            <div className="bg-transparent rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{car.name}</h1>
                  <p className="text-lg text-gray-300">{car.brand} {car.model} • {car.year}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold ${getCategoryColor(car.category)}`}>
                  {car.category.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-white">{car.rating}</span>
                  <span className="text-gray-200">({car.reviewCount} değerlendirme)</span>
                </div>
                {car.availableCount > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">{car.availableCount} araç müsait</span>
                  </div>
                )}
              </div>

              <p className="text-gray-200 leading-relaxed">{car.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-transparent rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-white mb-6">Teknik Özellikler</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-100 mb-1">Yolcu</p>
                  <p className="text-lg font-bold text-white">{car.seats}</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-100 mb-1">Vites</p>
                  <p className="text-lg font-bold text-white">{car.transmission === 'AUTOMATIC' ? 'Otomatik' : 'Manuel'}</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <Fuel className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-100 mb-1">Yakıt</p>
                  <p className="text-lg font-bold text-white">{car.fuelType}</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <Car className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-100 mb-1">Kapı</p>
                  <p className="text-lg font-bold text-white">{car.doors}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-transparent rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-white mb-6">Özellikler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {car.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-white">{feature}</span>
                  </div>
                ))}
                {car.airConditioning && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-white">Klima</span>
                  </div>
                )}
                {car.gps && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-white">GPS Navigasyon</span>
                  </div>
                )}
                {car.bluetooth && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-white">Bluetooth</span>
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-transparent rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-white mb-6">Kiralama Gereksinimleri</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-200">Minimum yaş: <strong>{car.minimumAge}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-200">Ehliyet süresi: En az <strong>{car.drivingLicenseYears} yıl</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-2">Gerekli Belgeler:</p>
                    <ul className="space-y-1">
                      {car.requiredDocuments?.map((doc, index) => (
                        <li key={index} className="text-gray-200">• {doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Cars */}
            {similarCars.length > 0 && (
              <div className="bg-transparent rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-white mb-6">Benzer Araçlar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {similarCars.map((similar) => (
                    <Link key={similar.id} href={`/car-rentals/${similar.slug}`}>
                      <div className="border border-white/10 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          <Car className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="font-semibold text-white mb-1">{similar.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm text-gray-100">{similar.rating}</span>
                          </div>
                          <p className="font-bold text-blue-600">₺{parseInt(similar.pricePerDay).toLocaleString('tr-TR')}/gün</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-transparent rounded-2xl p-6 shadow-lg sticky top-4">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">₺{parseInt(car.pricePerDay).toLocaleString('tr-TR')}</span>
                  <span className="text-gray-300">/gün</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-100">
                  <span>Haftalık: ₺{parseInt(car.pricePerWeek).toLocaleString('tr-TR')}</span>
                  <span>Aylık: ₺{parseInt(car.pricePerMonth).toLocaleString('tr-TR')}</span>
                </div>
              </div>

              {car.insuranceIncluded && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-6">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Sigorta Dahil</span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Teslim Alma Tarihi
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    İade Tarihi
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Teslim Alma Noktası
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {car.pickupLocations?.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <h3 className="font-semibold text-white mb-3">Ekstra Hizmetler</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('gps')}
                      onChange={() => toggleAddon('gps')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-200">GPS Navigasyon (+₺50/gün)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('insurance')}
                      onChange={() => toggleAddon('insurance')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-200">Tam Sigorta (+₺100/gün)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes('child-seat')}
                      onChange={() => toggleAddon('child-seat')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-200">Çocuk Koltuğu (+₺30/gün)</span>
                  </label>
                </div>
              </div>

              {days > 0 && (
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-100">{days} gün</span>
                    <span className="text-sm text-white">₺{(parseInt(car.pricePerDay) * days).toLocaleString('tr-TR')}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-100">Ekstralar</span>
                      <span className="text-sm text-white">₺{(total - parseInt(car.pricePerDay) * days).toLocaleString('tr-TR')}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Toplam</span>
                      <span className="text-xl font-bold text-blue-600">₺{total.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                disabled={!pickupDate || !returnDate || days <= 0}
                onClick={() => {
                  if (pickupDate && returnDate && days > 0) {
                    router.push({
                      pathname: '/car-rentals/book',
                      query: {
                        slug: car.slug,
                        pickupDate,
                        returnDate,
                      },
                    });
                  }
                }}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                Rezervasyon Yap
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-200 text-center mt-4">
                Depozito: ₺{parseInt(car.deposit).toLocaleString('tr-TR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all car rental slugs from real data
  const paths = antalyaCarRentals.map((car) => ({
    params: { slug: car.seo.slug.tr }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Find the car by slug
  const carData = antalyaCarRentals.find(car => car.seo.slug.tr === slug);

  if (!carData) {
    return {
      notFound: true
    };
  }

  // Transform to CarRental format
  const car: CarRental = {
    id: carData.id,
    name: `${carData.brand} ${carData.model.tr}`,
    slug: carData.seo.slug.tr,
    description: carData.seo.metaDescription.tr,
    shortDescription: carData.seo.metaDescription.tr.substring(0, 150),
    brand: carData.brand,
    model: carData.model.tr,
    year: carData.year,
    category: carData.category,
    transmission: carData.transmission === 'automatic' ? 'Otomatik' : 'Manuel',
    fuelType: carData.fuelType === 'gasoline' ? 'Benzin' : carData.fuelType === 'diesel' ? 'Dizel' : 'Hibrit',
    seats: carData.seats,
    doors: carData.doors,
    luggage: carData.luggage,
    features: carData.features?.tr || [],
    airConditioning: carData.features?.tr?.some(f => f.includes('Klima')) || false,
    gps: carData.features?.tr?.some(f => f.includes('GPS')) || false,
    bluetooth: carData.features?.tr?.some(f => f.includes('Bluetooth')) || false,
    usbCharger: carData.features?.tr?.some(f => f.includes('USB')) || false,
    pricePerDay: carData.pricing.daily.toString(),
    pricePerWeek: carData.pricing.weekly.toString(),
    pricePerMonth: carData.pricing.monthly.toString(),
    currency: 'TRY',
    deposit: carData.pricing.deposit.toString(),
    insuranceIncluded: true,
    mainImage: carData.images[0] || 'https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=1200',
    images: carData.images.length > 0 ? carData.images : [
      'https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=1200',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200'
    ],
    rating: carData.rating.toString(),
    reviewCount: carData.totalRentals,
    isActive: carData.active,
    isPopular: carData.popular,
    isFeatured: carData.popular,
    pickupLocations: carData.availability
      ? Object.entries(carData.availability)
          .filter(([key, value]) => value === true)
          .map(([key]) => key)
      : [],
    availableCount: 5,
  };

  return {
    props: {
      slug,
      car
    },
    revalidate: 3600,
  };
};

export default CarDetailsPage;
