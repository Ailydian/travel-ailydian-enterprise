/**
 * Car Rental Booking Page
 * Premium multi-step booking wizard inspired by Kayak and Rentalcars.com
 * Production-ready with form validation, price calculations, and checkout integration
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  Phone,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Info,
  Plus,
  Minus,
  ArrowRight,
  Navigation,
  Star,
  Sparkles,
  Zap,
  Award,
  FileText,
  Lock,
} from 'lucide-react';
import ResponsiveHeaderBar from '../../components/layout/ResponsiveHeaderBar';

// Types
interface BookingData {
  carId: string;
  slug: string;
  carName: string;
  carCategory: string;
  carImage?: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnLocation: string;
  returnDate: string;
  returnTime: string;
  insurance: 'basic' | 'standard' | 'premium';
  extras: string[];
  driver: {
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
    licenseExpiry: string;
    age: number;
  };
  basePrice: number;
  pricePerDay: number;
}

interface FormErrors {
  [key: string]: string;
}

interface InsuranceOption {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  description: string;
  price: number;
  features: string[];
  badge?: string;
}

interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
}

const INSURANCE_OPTIONS: InsuranceOption[] = [
  {
    id: 'basic',
    name: 'Temel Sigorta',
    description: 'Yasal zorunlu sigorta',
    price: 0,
    features: [
      'Trafik Sigortası',
      'Kasko (Belirli limitler dahilinde)',
      'Hasar durumunda ₺5,000 muafiyet',
    ],
  },
  {
    id: 'standard',
    name: 'Standart Sigorta',
    description: 'Geniş kapsamlı koruma',
    price: 150,
    features: [
      'Tüm Temel Sigorta Avantajları',
      'Hasar durumunda ₺2,000 muafiyet',
      'Cam ve Lastik Hasarları Dahil',
      '7/24 Yol Yardım',
    ],
    badge: 'Popüler',
  },
  {
    id: 'premium',
    name: 'Premium Sigorta',
    description: 'Tam kapsamlı koruma',
    price: 300,
    features: [
      'Tüm Standart Sigorta Avantajları',
      'Sıfır Muafiyet',
      'Kişisel Eşya Sigortası',
      'İkinci Sürücü Ücretsiz',
      'Öncelikli Müşteri Desteği',
    ],
    badge: 'En İyi Değer',
  },
];

const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: 'gps',
    name: 'GPS Navigasyon',
    description: 'Güncel haritalar ve trafik bilgisi',
    price: 50,
    icon: Navigation,
  },
  {
    id: 'child-seat',
    name: 'Çocuk Koltuğu',
    description: '0-4 yaş arası güvenli koltuk',
    price: 40,
    icon: Shield,
  },
  {
    id: 'additional-driver',
    name: 'Ek Sürücü',
    description: 'İkinci sürücü yetkisi',
    price: 80,
    icon: User,
  },
  {
    id: 'full-tank',
    name: 'Dolu Depo',
    description: 'Araç tesliminde dolu depo',
    price: 200,
    icon: Zap,
  },
  {
    id: 'winter-tires',
    name: 'Kış Lastiği',
    description: 'Kış sezonu için özel lastikler',
    price: 60,
    icon: Award,
  },
];

const LOCATIONS = [
  'Antalya Havalimanı (AYT)',
  'İstanbul Havalimanı (IST)',
  'İstanbul Sabiha Gökçen (SAW)',
  'İzmir Adnan Menderes (ADB)',
  'Bodrum Havalimanı (BJV)',
  'Dalaman Havalimanı (DLM)',
  'Antalya Şehir Merkezi',
  'İstanbul Taksim',
  'İzmir Alsancak',
];

const TIME_SLOTS = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
  '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
];

const CarRentalBookingPage: React.FC = () => {
  const router = useRouter();
  const { slug, pickupDate: qPickupDate, returnDate: qReturnDate } = router.query;

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [bookingData, setBookingData] = useState<BookingData>({
    carId: '',
    slug: (slug as string) || '',
    carName: '',
    carCategory: '',
    carImage: '',
    pickupLocation: LOCATIONS[0],
    pickupDate: (qPickupDate as string) || '',
    pickupTime: '10:00',
    returnLocation: LOCATIONS[0],
    returnDate: (qReturnDate as string) || '',
    returnTime: '10:00',
    insurance: 'standard',
    extras: [],
    driver: {
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      licenseExpiry: '',
      age: 0,
    },
    basePrice: 0,
    pricePerDay: 0,
  });

  // Fetch car details on mount
  useEffect(() => {
    if (!slug) {
      router.push('/car-rentals');
      return;
    }

    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/car-rentals/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          const car = data.data;
          setBookingData(prev => ({
            ...prev,
            carId: car.id,
            carName: car.name,
            carCategory: car.category,
            carImage: car.mainImage,
            basePrice: parseInt(car.pricePerDay),
            pricePerDay: parseInt(car.pricePerDay),
          }));
        }
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [slug, router]);

  // Save booking data to localStorage
  useEffect(() => {
    if (bookingData.carId) {
      localStorage.setItem('carRentalBooking', JSON.stringify(bookingData));
    }
  }, [bookingData]);

  // Calculate rental days
  const calculateDays = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 0;
    const pickup = new Date(bookingData.pickupDate);
    const returnD = new Date(bookingData.returnDate);
    const diff = returnD.getTime() - pickup.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculatePricing = () => {
    const days = calculateDays();
    if (days <= 0) return { days: 0, basePrice: 0, insurance: 0, extras: 0, tax: 0, total: 0 };

    const basePrice = bookingData.pricePerDay * days;

    const insuranceOption = INSURANCE_OPTIONS.find(opt => opt.id === bookingData.insurance);
    const insurancePrice = (insuranceOption?.price || 0) * days;

    const extrasPrice = bookingData.extras.reduce((sum, extraId) => {
      const extra = EXTRA_OPTIONS.find(opt => opt.id === extraId);
      return sum + (extra?.price || 0) * days;
    }, 0);

    const subtotal = basePrice + insurancePrice + extrasPrice;
    const tax = subtotal * 0.18; // 18% KDV

    return {
      days,
      basePrice,
      insurance: insurancePrice,
      extras: extrasPrice,
      tax,
      total: subtotal + tax,
    };
  };

  const pricing = calculatePricing();

  // Validation functions
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!bookingData.pickupLocation) newErrors.pickupLocation = 'Teslim alma noktası seçiniz';
    if (!bookingData.pickupDate) newErrors.pickupDate = 'Teslim alma tarihi seçiniz';
    if (!bookingData.pickupTime) newErrors.pickupTime = 'Teslim alma saati seçiniz';
    if (!bookingData.returnLocation) newErrors.returnLocation = 'İade noktası seçiniz';
    if (!bookingData.returnDate) newErrors.returnDate = 'İade tarihi seçiniz';
    if (!bookingData.returnTime) newErrors.returnTime = 'İade saati seçiniz';

    if (bookingData.pickupDate && bookingData.returnDate) {
      const pickup = new Date(bookingData.pickupDate);
      const returnD = new Date(bookingData.returnDate);
      if (returnD <= pickup) {
        newErrors.returnDate = 'İade tarihi, teslim alma tarihinden sonra olmalıdır';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!bookingData.driver.name) newErrors.driverName = 'Ad Soyad gereklidir';
    if (!bookingData.driver.email) newErrors.driverEmail = 'E-posta gereklidir';
    else if (!/\S+@\S+\.\S+/.test(bookingData.driver.email)) newErrors.driverEmail = 'Geçersiz e-posta';
    if (!bookingData.driver.phone) newErrors.driverPhone = 'Telefon gereklidir';
    if (!bookingData.driver.licenseNumber) newErrors.licenseNumber = 'Ehliyet numarası gereklidir';
    if (!bookingData.driver.licenseExpiry) newErrors.licenseExpiry = 'Ehliyet bitiş tarihi gereklidir';
    if (!bookingData.driver.age || bookingData.driver.age < 21) {
      newErrors.driverAge = 'Minimum yaş 21 olmalıdır';
    }
    if (!termsAccepted) newErrors.terms = 'Şartları kabul etmelisiniz';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 3 && !validateStep3()) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleExtra = (extraId: string) => {
    setBookingData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId],
    }));
  };

  const handleCheckout = () => {
    if (!validateStep3()) return;

    const checkoutData = {
      type: 'car-rental',
      carId: bookingData.carId,
      slug: bookingData.slug,
      carName: bookingData.carName,
      carCategory: bookingData.carCategory,
      pickupLocation: bookingData.pickupLocation,
      pickupDate: bookingData.pickupDate,
      pickupTime: bookingData.pickupTime,
      returnLocation: bookingData.returnLocation,
      returnDate: bookingData.returnDate,
      returnTime: bookingData.returnTime,
      insurance: bookingData.insurance,
      extras: bookingData.extras,
      driver: bookingData.driver,
      totalPrice: pricing.total,
      priceBreakdown: {
        basePrice: pricing.basePrice,
        insurance: pricing.insurance,
        extras: pricing.extras,
        tax: pricing.tax,
      },
    };

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Yükleniyor - Araç Kiralama Rezervasyonu</title>
        </Head>
        <ResponsiveHeaderBar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Rezervasyon sayfası hazırlanıyor...</p>
          </div>
        </div>
      </>
    );
  }

  const steps = [
    { number: 1, title: 'Detaylar', icon: Calendar },
    { number: 2, title: 'Sigorta & Ekstralar', icon: Shield },
    { number: 3, title: 'Sürücü Bilgileri', icon: User },
    { number: 4, title: 'Özet', icon: CheckCircle },
  ];

  return (
    <>
      <Head>
        <title>Araç Kiralama Rezervasyonu - {bookingData.carName || 'LyDian Travel'}</title>
        <meta name="description" content="Güvenli ve hızlı araç kiralama rezervasyonu" />
      </Head>

      <ResponsiveHeaderBar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent rounded-2xl shadow-sm p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep >= step.number
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium mt-2 hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-4 bg-gray-200 relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: currentStep > step.number ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Rental Details */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-transparent rounded-2xl shadow-sm p-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Kiralama Detayları</h2>

                    <div className="space-y-6">
                      {/* Pickup Details */}
                      <div className="border border-white/10 rounded-xl p-6">
                        <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-green-600" />
                          Teslim Alma
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-200 mb-2">Lokasyon *</label>
                            <select
                              value={bookingData.pickupLocation}
                              onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.pickupLocation ? 'border-red-500' : 'border-white/20'
                              }`}
                            >
                              {LOCATIONS.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Tarih *</label>
                            <input
                              type="date"
                              value={bookingData.pickupDate}
                              onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.pickupDate ? 'border-red-500' : 'border-white/20'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Saat *</label>
                            <select
                              value={bookingData.pickupTime}
                              onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.pickupTime ? 'border-red-500' : 'border-white/20'
                              }`}
                            >
                              {TIME_SLOTS.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Return Details */}
                      <div className="border border-white/10 rounded-xl p-6">
                        <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-red-600" />
                          İade
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-200 mb-2">Lokasyon *</label>
                            <select
                              value={bookingData.returnLocation}
                              onChange={(e) => setBookingData({ ...bookingData, returnLocation: e.target.value })}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.returnLocation ? 'border-red-500' : 'border-white/20'
                              }`}
                            >
                              {LOCATIONS.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Tarih *</label>
                            <input
                              type="date"
                              value={bookingData.returnDate}
                              onChange={(e) => setBookingData({ ...bookingData, returnDate: e.target.value })}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.returnDate ? 'border-red-500' : 'border-white/20'
                              }`}
                            />
                            {errors.returnDate && (
                              <p className="text-sm text-red-500 mt-1">{errors.returnDate}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Saat *</label>
                            <select
                              value={bookingData.returnTime}
                              onChange={(e) => setBookingData({ ...bookingData, returnTime: e.target.value })}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                                errors.returnTime ? 'border-red-500' : 'border-white/20'
                              }`}
                            >
                              {TIME_SLOTS.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {pricing.days > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                          <Info className="w-5 h-5 text-blue-600" />
                          <p className="text-sm text-blue-900">
                            Kiralama süresi: <strong>{pricing.days} gün</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Insurance & Extras */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Insurance Options */}
                    <div className="bg-transparent rounded-2xl shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-blue-600" />
                        Sigorta Seçenekleri
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {INSURANCE_OPTIONS.map((option) => (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setBookingData({ ...bookingData, insurance: option.id })}
                            className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
                              bookingData.insurance === option.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-white/10 hover:border-blue-300'
                            }`}
                          >
                            {option.badge && (
                              <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {option.badge}
                              </div>
                            )}
                            <div className="mb-4">
                              <h3 className="font-bold text-lg text-white">{option.name}</h3>
                              <p className="text-sm text-gray-300 mb-2">{option.description}</p>
                              <p className="text-2xl font-bold text-blue-600">
                                {option.price === 0 ? 'Ücretsiz' : `₺${option.price}/gün`}
                              </p>
                            </div>
                            <ul className="space-y-2">
                              {option.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-200">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            {bookingData.insurance === option.id && (
                              <div className="absolute top-4 left-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Extra Options */}
                    <div className="bg-transparent rounded-2xl shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        Ekstra Hizmetler
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {EXTRA_OPTIONS.map((extra) => {
                          const isSelected = bookingData.extras.includes(extra.id);
                          return (
                            <motion.div
                              key={extra.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleExtra(extra.id)}
                              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-purple-600 bg-purple-50'
                                  : 'border-white/10 hover:border-purple-300'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-300'
                                }`}>
                                  <extra.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-white mb-1">{extra.name}</h3>
                                  <p className="text-sm text-gray-300 mb-2">{extra.description}</p>
                                  <p className="font-bold text-purple-600">₺{extra.price}/gün</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  isSelected ? 'border-purple-600 bg-purple-600' : 'border-white/20'
                                }`}>
                                  {isSelected && <Check className="w-4 h-4 text-white" />}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Driver Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-transparent rounded-2xl shadow-sm p-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Sürücü Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Ad Soyad *</label>
                        <input
                          type="text"
                          value={bookingData.driver.name}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            driver: { ...bookingData.driver, name: e.target.value }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            errors.driverName ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="Ahmet Yılmaz"
                        />
                        {errors.driverName && <p className="text-sm text-red-500 mt-1">{errors.driverName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">E-posta *</label>
                        <input
                          type="email"
                          value={bookingData.driver.email}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            driver: { ...bookingData.driver, email: e.target.value }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            errors.driverEmail ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="ornek@email.com"
                        />
                        {errors.driverEmail && <p className="text-sm text-red-500 mt-1">{errors.driverEmail}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Telefon *</label>
                        <input
                          type="tel"
                          value={bookingData.driver.phone}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            driver: { ...bookingData.driver, phone: e.target.value }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            errors.driverPhone ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="+90 5XX XXX XX XX"
                        />
                        {errors.driverPhone && <p className="text-sm text-red-500 mt-1">{errors.driverPhone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Yaş *</label>
                        <input
                          type="number"
                          value={bookingData.driver.age || ''}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            driver: { ...bookingData.driver, age: parseInt(e.target.value) || 0 }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            errors.driverAge ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="25"
                          min="21"
                        />
                        {errors.driverAge && <p className="text-sm text-red-500 mt-1">{errors.driverAge}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Ehliyet Numarası *</label>
                        <input
                          type="text"
                          value={bookingData.driver.licenseNumber}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            driver: { ...bookingData.driver, licenseNumber: e.target.value }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            errors.licenseNumber ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="XXXXX"
                        />
                        {errors.licenseNumber && <p className="text-sm text-red-500 mt-1">{errors.licenseNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Ehliyet Bitiş Tarihi *</label>
                        <input
                          type="date"
                          value={bookingData.driver.licenseExpiry}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            driver: { ...bookingData.driver, licenseExpiry: e.target.value }
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                            errors.licenseExpiry ? 'border-red-500' : 'border-white/20'
                          }`}
                        />
                        {errors.licenseExpiry && <p className="text-sm text-red-500 mt-1">{errors.licenseExpiry}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-200">
                            Kiralama şartlarını ve koşullarını okudum ve kabul ediyorum *
                          </span>
                        </label>
                        {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms}</p>}
                      </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                          <p className="font-semibold mb-2">Gerekli Belgeler (Araç Tesliminde):</p>
                          <ul className="space-y-1 ml-4 list-disc">
                            <li>Geçerli sürücü belgesi (ehliyet)</li>
                            <li>Kimlik belgesi (Nüfus cüzdanı veya pasaport)</li>
                            <li>Kredi kartı (depozito için)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Summary */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Vehicle Summary */}
                    <div className="bg-transparent rounded-2xl shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Rezervasyon Özeti</h2>
                      <div className="flex items-center gap-6 p-4 bg-white/5 rounded-xl">
                        <div className="w-32 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <Car className="w-16 h-16 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-white">{bookingData.carName}</h3>
                          <p className="text-gray-300">{bookingData.carCategory.replace(/_/g, ' ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rental Details Summary */}
                    <div className="bg-transparent rounded-2xl shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Kiralama Detayları</h3>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Düzenle
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-300 mb-1">Teslim Alma</p>
                          <p className="font-medium text-white">{bookingData.pickupLocation}</p>
                          <p className="text-sm text-gray-300">
                            {bookingData.pickupDate} • {bookingData.pickupTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 mb-1">İade</p>
                          <p className="font-medium text-white">{bookingData.returnLocation}</p>
                          <p className="text-sm text-gray-300">
                            {bookingData.returnDate} • {bookingData.returnTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Insurance & Extras Summary */}
                    <div className="bg-transparent rounded-2xl shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Sigorta & Ekstralar</h3>
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Düzenle
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-200">
                            {INSURANCE_OPTIONS.find(opt => opt.id === bookingData.insurance)?.name}
                          </span>
                          <span className="font-semibold">
                            {pricing.insurance === 0 ? 'Dahil' : `₺${pricing.insurance.toLocaleString('tr-TR')}`}
                          </span>
                        </div>
                        {bookingData.extras.length > 0 ? (
                          bookingData.extras.map(extraId => {
                            const extra = EXTRA_OPTIONS.find(opt => opt.id === extraId);
                            return extra ? (
                              <div key={extraId} className="flex items-center justify-between">
                                <span className="text-gray-200">{extra.name}</span>
                                <span className="font-semibold">₺{(extra.price * pricing.days).toLocaleString('tr-TR')}</span>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <p className="text-sm text-gray-500">Ekstra hizmet seçilmedi</p>
                        )}
                      </div>
                    </div>

                    {/* Driver Info Summary */}
                    <div className="bg-transparent rounded-2xl shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Sürücü Bilgileri</h3>
                        <button
                          onClick={() => setCurrentStep(3)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Düzenle
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-300">Ad Soyad</p>
                          <p className="font-medium text-white">{bookingData.driver.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">E-posta</p>
                          <p className="font-medium text-white">{bookingData.driver.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">Telefon</p>
                          <p className="font-medium text-white">{bookingData.driver.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">Yaş</p>
                          <p className="font-medium text-white">{bookingData.driver.age}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 text-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Geri
                  </button>
                ) : (
                  <Link href={`/car-rentals/${slug}`}>
                    <button className="flex items-center gap-2 px-6 py-3 border border-white/20 text-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                      Araç Detayı
                    </button>
                  </Link>
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Devam Et
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity font-bold text-lg shadow-lg"
                  >
                    <Lock className="w-5 h-5" />
                    Ödemeye Geç
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar - Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-transparent rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg text-white mb-6">Fiyat Özeti</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Günlük kiralama ({pricing.days} gün)</span>
                    <span className="font-semibold">₺{pricing.basePrice.toLocaleString('tr-TR')}</span>
                  </div>

                  {pricing.insurance > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Sigorta</span>
                      <span className="font-semibold">₺{pricing.insurance.toLocaleString('tr-TR')}</span>
                    </div>
                  )}

                  {pricing.extras > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Ekstra hizmetler</span>
                      <span className="font-semibold">₺{pricing.extras.toLocaleString('tr-TR')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">KDV (%18)</span>
                    <span className="font-semibold">₺{pricing.tax.toLocaleString('tr-TR')}</span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-white">Toplam</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₺{pricing.total.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">Ücretsiz iptal (24 saat öncesine kadar)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">Fiyat garantisi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">Anında onay</span>
                  </div>
                </div>

                {currentStep === 4 && (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Lock className="w-5 h-5" />
                    Ödemeye Geç
                  </button>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  256-bit SSL ile güvenli rezervasyon
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CarRentalBookingPage;
