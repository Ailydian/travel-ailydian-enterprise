/**
 * Premium Rental Property Booking Page
 * Multi-step wizard: Dates → Guests → House Rules → Payment
 * Inspired by Airbnb & Booking.com
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  Shield,
  MessageSquare,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  Home,
  MapPin,
  Star,
  AlertCircle,
  Info,
  Heart,
  Phone,
  Mail,
  User,
  Waves,
  Wifi,
  Car,
  Wind,
  Tv,
  ChefHat,
  Eye,
  Building2,
} from 'lucide-react';
import ResponsiveHeaderBar from '../../components/layout/ResponsiveHeaderBar';
import logger from '../../../../lib/logger';

// TypeScript interfaces
interface RentalProperty {
  id: string;
  title: string;
  slug: string;
  city: string;
  district: string;
  mainImage: string;
  images: string[];
  basePrice: string;
  cleaningFee: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  minimumStay: number;
  checkInTime: string;
  checkOutTime: string;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  partiesAllowed: boolean;
  childrenAllowed: boolean;
  hostName: string;
  overall: string;
  reviewCount: number;
  wifi: boolean;
  pool: boolean;
  parking: boolean;
  seaview: boolean;
}

interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
  };
  purposeOfStay: string;
  arrivalTime: string;
  specialRequests: string;
  rulesAccepted: boolean;
  totalPrice: number;
  priceBreakdown: {
    nightlyRate: number;
    cleaningFee: number;
    serviceFee: number;
    tax: number;
  };
}

const RentalBookingPage = () => {
  const router = useRouter();
  const { slug, checkIn, checkOut, guests } = router.query;

  // State
  const [property, setProperty] = useState<RentalProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Booking form data
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [purposeOfStay, setPurposeOfStay] = useState('leisure');
  const [arrivalTime, setArrivalTime] = useState('');
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [primaryGuestName, setPrimaryGuestName] = useState('');
  const [primaryGuestEmail, setPrimaryGuestEmail] = useState('');
  const [primaryGuestPhone, setPrimaryGuestPhone] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  // Load property details
  useEffect(() => {
    if (!slug) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/rental-properties/${slug}`);
        const data = await response.json();

        if (data.success) {
          setProperty(data.data);

          // Pre-fill from URL params
          if (checkIn) setCheckInDate(checkIn as string);
          if (checkOut) setCheckOutDate(checkOut as string);
          if (guests) {
            const guestCount = parseInt(guests as string);
            setAdultsCount(Math.min(guestCount, data.data.guests));
          }
        } else {
          router.push('/rentals');
        }
      } catch (err) {
        logger.error('Error fetching property:', err as Error, {component:'Book'});
        router.push('/rentals');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug, checkIn, checkOut, guests, router]);

  // Load from localStorage (resume booking)
  useEffect(() => {
    if (!slug) return;

    const savedBooking = localStorage.getItem(`rental-booking-${slug}`);
    if (savedBooking) {
      try {
        const data = JSON.parse(savedBooking);
        setCheckInDate(data.checkInDate || '');
        setCheckOutDate(data.checkOutDate || '');
        setAdultsCount(data.guests?.adults || 2);
        setChildrenCount(data.guests?.children || 0);
        setInfantsCount(data.guests?.infants || 0);
        setPurposeOfStay(data.purposeOfStay || 'leisure');
        setArrivalTime(data.arrivalTime || '');
        setSpecialRequests(data.specialRequests || '');
        setPrimaryGuestName(data.primaryGuest?.name || '');
        setPrimaryGuestEmail(data.primaryGuest?.email || '');
        setPrimaryGuestPhone(data.primaryGuest?.phone || '');
        setEmergencyContactName(data.emergencyContact?.name || '');
        setEmergencyContactPhone(data.emergencyContact?.phone || '');
      } catch (err) {
        logger.error('Error loading saved booking:', err as Error, {component:'Book'});
      }
    }
  }, [slug]);

  // Save to localStorage on change
  useEffect(() => {
    if (!slug || !property) return;

    const bookingData = {
      checkInDate,
      checkOutDate,
      guests: { adults: adultsCount, children: childrenCount, infants: infantsCount },
      purposeOfStay,
      arrivalTime,
      specialRequests,
      primaryGuest: { name: primaryGuestName, email: primaryGuestEmail, phone: primaryGuestPhone },
      emergencyContact: { name: emergencyContactName, phone: emergencyContactPhone },
    };

    localStorage.setItem(`rental-booking-${slug}`, JSON.stringify(bookingData));
  }, [slug, property, checkInDate, checkOutDate, adultsCount, childrenCount, infantsCount, purposeOfStay, arrivalTime, specialRequests, primaryGuestName, primaryGuestEmail, primaryGuestPhone, emergencyContactName, emergencyContactPhone]);

  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate pricing
  const calculatePricing = () => {
    if (!property) return { nightlyRate: 0, subtotal: 0, cleaningFee: 0, serviceFee: 0, tax: 0, total: 0 };

    const nights = calculateNights();
    if (nights <= 0) return { nightlyRate: 0, subtotal: 0, cleaningFee: 0, serviceFee: 0, tax: 0, total: 0 };

    const nightlyRate = parseInt(property.basePrice);
    const subtotal = nightlyRate * nights;
    const cleaningFee = parseInt(property.cleaningFee);
    const serviceFee = Math.round(subtotal * 0.10); // 10% service fee
    const tax = Math.round((subtotal + cleaningFee + serviceFee) * 0.18); // 18% VAT
    const total = subtotal + cleaningFee + serviceFee + tax;

    return { nightlyRate, subtotal, cleaningFee, serviceFee, tax, total };
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};
    const nights = calculateNights();

    if (step === 1) {
      // Date validation
      if (!checkInDate) newErrors.checkInDate = 'Giriş tarihi seçiniz';
      if (!checkOutDate) newErrors.checkOutDate = 'Çıkış tarihi seçiniz';
      if (nights < (property?.minimumStay || 1)) {
        newErrors.nights = `Minimum ${property?.minimumStay} gece konaklama gereklidir`;
      }
      if (nights <= 0) newErrors.nights = 'Geçersiz tarih aralığı';
    }

    if (step === 2) {
      // Guest validation
      const totalGuests = adultsCount + childrenCount + infantsCount;
      if (totalGuests === 0) newErrors.guests = 'En az 1 misafir belirtiniz';
      if (totalGuests > (property?.guests || 1)) {
        newErrors.guests = `Maximum ${property?.guests} misafir kabul edilmektedir`;
      }
      if (!purposeOfStay) newErrors.purposeOfStay = 'Konaklama amacını belirtiniz';
      if (!arrivalTime) newErrors.arrivalTime = 'Tahmini varış saatini belirtiniz';
    }

    if (step === 3) {
      // House rules validation
      if (!rulesAccepted) newErrors.rulesAccepted = 'Ev kurallarını kabul etmelisiniz';
    }

    if (step === 4) {
      // Contact information validation
      if (!primaryGuestName) newErrors.primaryGuestName = 'Ad soyad gereklidir';
      if (!primaryGuestEmail) newErrors.primaryGuestEmail = 'E-posta gereklidir';
      else if (!/\S+@\S+\.\S+/.test(primaryGuestEmail)) newErrors.primaryGuestEmail = 'Geçersiz e-posta';
      if (!primaryGuestPhone) newErrors.primaryGuestPhone = 'Telefon numarası gereklidir';
      if (!emergencyContactName) newErrors.emergencyContactName = 'Acil durumda ulaşılacak kişi gereklidir';
      if (!emergencyContactPhone) newErrors.emergencyContactPhone = 'Acil telefon numarası gereklidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(5, currentStep + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle final submission (go to checkout)
  const handleProceedToCheckout = () => {
    if (!validateStep(4)) return;

    const pricing = calculatePricing();
    const bookingData: BookingData = {
      checkInDate,
      checkOutDate,
      nights: calculateNights(),
      guests: {
        adults: adultsCount,
        children: childrenCount,
        infants: infantsCount,
      },
      primaryGuest: {
        name: primaryGuestName,
        email: primaryGuestEmail,
        phone: primaryGuestPhone,
      },
      emergencyContact: {
        name: emergencyContactName,
        phone: emergencyContactPhone,
      },
      purposeOfStay,
      arrivalTime,
      specialRequests,
      rulesAccepted,
      totalPrice: pricing.total,
      priceBreakdown: {
        nightlyRate: pricing.nightlyRate,
        cleaningFee: pricing.cleaningFee,
        serviceFee: pricing.serviceFee,
        tax: pricing.tax,
      },
    };

    // Save to localStorage for checkout page
    localStorage.setItem('rental-checkout-data', JSON.stringify({
      type: 'rental-property',
      propertyId: property?.id,
      slug: property?.slug,
      propertyTitle: property?.title,
      propertyImage: property?.mainImage,
      ...bookingData,
    }));

    // Navigate to checkout
    router.push('/checkout');
  };

  // Loading state
  if (loading) {
    return (
      <>
        <ResponsiveHeaderBar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Rezervasyon sayfası yükleniyor...</p>
          </div>
        </div>
      </>
    );
  }

  if (!property) {
    return (
      <>
        <ResponsiveHeaderBar />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Özellik Bulunamadı</h1>
            <Link
              href="/rentals"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all inline-block"
            >
              Tüm Özelliklere Dön
            </Link>
          </div>
        </div>
      </>
    );
  }

  const nights = calculateNights();
  const pricing = calculatePricing();
  const totalGuests = adultsCount + childrenCount + infantsCount;

  const steps = [
    { num: 1, title: 'Tarihler', icon: Calendar },
    { num: 2, title: 'Misafirler', icon: Users },
    { num: 3, title: 'Kurallar', icon: Shield },
    { num: 4, title: 'İletişim', icon: MessageSquare },
    { num: 5, title: 'Onay', icon: Check },
  ];

  return (
    <>
      <Head>
        <title>Rezervasyon: {property.title} | Travel LyDian</title>
      </Head>

      <ResponsiveHeaderBar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;

                return (
                  <React.Fragment key={step.num}>
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          backgroundColor: isCompleted ? '#10b981' : isActive ? '#8b5cf6' : '#e5e7eb',
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500' : isActive ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </motion.div>
                      <p className={`text-xs mt-2 font-medium ${isActive ? 'text-purple-600' : 'text-gray-300'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-transparent rounded-2xl shadow-xl p-6 md:p-8"
                >
                  {/* Step 1: Date Selection */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Tarihlerinizi Seçin</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Giriş Tarihi
                          </label>
                          <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full px-4 py-3 border ${
                              errors.checkInDate ? 'border-red-500' : 'border-white/20'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                          {errors.checkInDate && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.checkInDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Çıkış Tarihi
                          </label>
                          <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate || new Date().toISOString().split('T')[0]}
                            className={`w-full px-4 py-3 border ${
                              errors.checkOutDate ? 'border-red-500' : 'border-white/20'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                          {errors.checkOutDate && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.checkOutDate}
                            </p>
                          )}
                        </div>
                      </div>

                      {errors.nights && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-red-700 text-sm flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {errors.nights}
                          </p>
                        </div>
                      )}

                      {nights > 0 && !errors.nights && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                          <p className="text-green-700 font-semibold flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            {nights} gece konaklama
                          </p>
                        </div>
                      )}

                      <div className="bg-purple-50 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div className="text-sm text-purple-900">
                            <p className="font-semibold mb-1">Giriş & Çıkış Saatleri</p>
                            <p>Giriş: {property.checkInTime}</p>
                            <p>Çıkış: {property.checkOutTime}</p>
                            <p className="mt-2">Minimum konaklama: {property.minimumStay} gece</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Guest Information */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Misafir Bilgileri</h2>

                      <div className="space-y-4 mb-6">
                        {/* Adults */}
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                          <div>
                            <p className="font-semibold text-white">Yetişkinler</p>
                            <p className="text-sm text-gray-200">13 yaş ve üzeri</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                              className="w-10 h-10 flex items-center justify-center border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{adultsCount}</span>
                            <button
                              onClick={() => setAdultsCount(Math.min(property.guests, adultsCount + 1))}
                              className="w-10 h-10 flex items-center justify-center border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                          <div>
                            <p className="font-semibold text-white">Çocuklar</p>
                            <p className="text-sm text-gray-200">2-12 yaş</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                              className="w-10 h-10 flex items-center justify-center border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{childrenCount}</span>
                            <button
                              onClick={() => setChildrenCount(Math.min(property.guests - adultsCount, childrenCount + 1))}
                              className="w-10 h-10 flex items-center justify-center border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                          <div>
                            <p className="font-semibold text-white">Bebekler</p>
                            <p className="text-sm text-gray-200">2 yaş altı</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setInfantsCount(Math.max(0, infantsCount - 1))}
                              className="w-10 h-10 flex items-center justify-center border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{infantsCount}</span>
                            <button
                              onClick={() => setInfantsCount(infantsCount + 1)}
                              className="w-10 h-10 flex items-center justify-center border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {errors.guests && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-red-700 text-sm flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {errors.guests}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            Konaklama Amacı
                          </label>
                          <select
                            value={purposeOfStay}
                            onChange={(e) => setPurposeOfStay(e.target.value)}
                            className={`w-full px-4 py-3 border ${
                              errors.purposeOfStay ? 'border-red-500' : 'border-white/20'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          >
                            <option value="">Seçiniz</option>
                            <option value="leisure">Tatil</option>
                            <option value="business">İş</option>
                            <option value="other">Diğer</option>
                          </select>
                          {errors.purposeOfStay && (
                            <p className="text-red-500 text-sm mt-1">{errors.purposeOfStay}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            Tahmini Varış Saati
                          </label>
                          <input
                            type="time"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                            className={`w-full px-4 py-3 border ${
                              errors.arrivalTime ? 'border-red-500' : 'border-white/20'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          />
                          {errors.arrivalTime && (
                            <p className="text-red-500 text-sm mt-1">{errors.arrivalTime}</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div className="text-sm text-purple-900">
                            <p className="font-semibold mb-1">Maximum Kapasite</p>
                            <p>Bu özellik maksimum {property.guests} misafir kabul etmektedir.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: House Rules */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Ev Kuralları</h2>

                      <div className="space-y-4 mb-6">
                        <div className="bg-white/5 rounded-xl p-4">
                          <h3 className="font-semibold text-white mb-3">Genel Kurallar</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {property.smokingAllowed ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <X className="w-5 h-5 text-red-600" />
                              )}
                              <span className="text-sm text-gray-200">
                                {property.smokingAllowed ? 'Sigara içilir' : 'Sigara içilmez'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {property.petsAllowed ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <X className="w-5 h-5 text-red-600" />
                              )}
                              <span className="text-sm text-gray-200">
                                {property.petsAllowed ? 'Evcil hayvan kabul edilir' : 'Evcil hayvan kabul edilmez'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {property.partiesAllowed ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <X className="w-5 h-5 text-red-600" />
                              )}
                              <span className="text-sm text-gray-200">
                                {property.partiesAllowed ? 'Parti yapılabilir' : 'Parti yapılamaz'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {property.childrenAllowed ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <X className="w-5 h-5 text-red-600" />
                              )}
                              <span className="text-sm text-gray-200">
                                {property.childrenAllowed ? 'Çocuklar kabul edilir' : 'Çocuklar kabul edilmez'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <h3 className="font-semibold text-white mb-3">Giriş & Çıkış Kuralları</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Clock className="w-5 h-5 text-gray-300 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-white">Giriş Saati</p>
                                <p className="text-sm text-gray-100">{property.checkInTime}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Clock className="w-5 h-5 text-gray-300 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-white">Çıkış Saati</p>
                                <p className="text-sm text-gray-100">{property.checkOutTime}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Calendar className="w-5 h-5 text-gray-300 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-white">Minimum Konaklama</p>
                                <p className="text-sm text-gray-100">{property.minimumStay} gece</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                          <h3 className="font-semibold text-red-900 mb-2">Önemli Uyarılar</h3>
                          <ul className="space-y-1 text-sm text-red-800">
                            <li>• Sessiz saatler: 23:00 - 07:00</li>
                            <li>• Ortak alanları temiz tutunuz</li>
                            <li>• Komşularımıza saygılı olunuz</li>
                            <li>• Hasarlardan siz sorumlusunuz</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-2 border-purple-300 rounded-xl p-4 mb-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rulesAccepted}
                            onChange={(e) => setRulesAccepted(e.target.checked)}
                            className="w-5 h-5 mt-1 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <div>
                            <p className="font-semibold text-white">Ev kurallarını okudum ve kabul ediyorum</p>
                            <p className="text-sm text-gray-100 mt-1">
                              Yukarıda belirtilen tüm kurallara uyacağımı taahhüt ediyorum.
                            </p>
                          </div>
                        </label>
                      </div>

                      {errors.rulesAccepted && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-red-700 text-sm flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {errors.rulesAccepted}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Contact & Special Requests */}
                  {currentStep === 4 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">İletişim Bilgileri</h2>

                      <div className="space-y-6 mb-6">
                        <div>
                          <h3 className="font-semibold text-white mb-4">Birincil Misafir</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-200 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Ad Soyad
                              </label>
                              <input
                                type="text"
                                value={primaryGuestName}
                                onChange={(e) => setPrimaryGuestName(e.target.value)}
                                placeholder="Adınız ve soyadınız"
                                className={`w-full px-4 py-3 border ${
                                  errors.primaryGuestName ? 'border-red-500' : 'border-white/20'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              />
                              {errors.primaryGuestName && (
                                <p className="text-red-500 text-sm mt-1">{errors.primaryGuestName}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-200 mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                E-posta
                              </label>
                              <input
                                type="email"
                                value={primaryGuestEmail}
                                onChange={(e) => setPrimaryGuestEmail(e.target.value)}
                                placeholder="ornek@email.com"
                                className={`w-full px-4 py-3 border ${
                                  errors.primaryGuestEmail ? 'border-red-500' : 'border-white/20'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              />
                              {errors.primaryGuestEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.primaryGuestEmail}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-200 mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Telefon
                              </label>
                              <input
                                type="tel"
                                value={primaryGuestPhone}
                                onChange={(e) => setPrimaryGuestPhone(e.target.value)}
                                placeholder="+90 5XX XXX XX XX"
                                className={`w-full px-4 py-3 border ${
                                  errors.primaryGuestPhone ? 'border-red-500' : 'border-white/20'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              />
                              {errors.primaryGuestPhone && (
                                <p className="text-red-500 text-sm mt-1">{errors.primaryGuestPhone}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                          <h3 className="font-semibold text-white mb-4">Acil Durum İletişim</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-200 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Ad Soyad
                              </label>
                              <input
                                type="text"
                                value={emergencyContactName}
                                onChange={(e) => setEmergencyContactName(e.target.value)}
                                placeholder="Acil durumda ulaşılacak kişi"
                                className={`w-full px-4 py-3 border ${
                                  errors.emergencyContactName ? 'border-red-500' : 'border-white/20'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              />
                              {errors.emergencyContactName && (
                                <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-200 mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Telefon
                              </label>
                              <input
                                type="tel"
                                value={emergencyContactPhone}
                                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                                placeholder="+90 5XX XXX XX XX"
                                className={`w-full px-4 py-3 border ${
                                  errors.emergencyContactPhone ? 'border-red-500' : 'border-white/20'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              />
                              {errors.emergencyContactPhone && (
                                <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                          <h3 className="font-semibold text-white mb-4">Özel İstekler (İsteğe Bağlı)</h3>
                          <textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="Alerjiler, özel ihtiyaçlar, erken giriş talebi vb..."
                            rows={4}
                            className="w-full px-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <p className="text-xs text-gray-200 mt-1">
                            Özel istekleriniz ev sahibine iletilecektir, ancak garanti edilmez.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review & Confirm */}
                  {currentStep === 5 && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Rezervasyonu Onaylayın</h2>

                      <div className="space-y-6">
                        {/* Property Summary */}
                        <div className="bg-white/5 rounded-xl p-4">
                          <h3 className="font-semibold text-white mb-3">Özellik Bilgileri</h3>
                          <div className="flex gap-4">
                            <img
                              src={property.mainImage}
                              alt={property.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-bold text-white">{property.title}</p>
                              <p className="text-sm text-gray-100">
                                {property.district}, {property.city}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-semibold">{parseFloat(property.overall).toFixed(1)}</span>
                                <span className="text-sm text-gray-100">({property.reviewCount} değerlendirme)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Dates & Guests */}
                        <div className="bg-white/5 rounded-xl p-4">
                          <h3 className="font-semibold text-white mb-3">Rezervasyon Detayları</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Giriş:</span>
                              <span className="font-semibold">{new Date(checkInDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Çıkış:</span>
                              <span className="font-semibold">{new Date(checkOutDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Gece:</span>
                              <span className="font-semibold">{nights} gece</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Misafirler:</span>
                              <span className="font-semibold">{totalGuests} kişi</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Amaç:</span>
                              <span className="font-semibold">
                                {purposeOfStay === 'leisure' ? 'Tatil' : purposeOfStay === 'business' ? 'İş' : 'Diğer'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white/5 rounded-xl p-4">
                          <h3 className="font-semibold text-white mb-3">İletişim Bilgileri</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Misafir:</span>
                              <span className="font-semibold">{primaryGuestName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">E-posta:</span>
                              <span className="font-semibold">{primaryGuestEmail}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Telefon:</span>
                              <span className="font-semibold">{primaryGuestPhone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Special Requests */}
                        {specialRequests && (
                          <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-semibold text-white mb-3">Özel İstekler</h3>
                            <p className="text-sm text-gray-200">{specialRequests}</p>
                          </div>
                        )}

                        {/* Cancellation Policy */}
                        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                          <h3 className="font-semibold text-yellow-900 mb-2">İptal Politikası</h3>
                          <p className="text-sm text-yellow-800">
                            Ücretsiz iptal: Giriş tarihinden 7 gün öncesine kadar ücretsiz iptal edilebilir.
                            Daha sonraki iptallerde ilk gece ücreti tahsil edilir.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                    {currentStep > 1 && (
                      <button
                        onClick={handlePrevious}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-gray-200 rounded-xl font-semibold transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Geri
                      </button>
                    )}

                    {currentStep < 5 ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        İleri
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleProceedToCheckout}
                        className="flex items-center gap-2 ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <CreditCard className="w-5 h-5" />
                        Ödemeye Geç
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Property Card */}
                <div className="bg-transparent rounded-2xl shadow-xl p-6 mb-6">
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="font-bold text-lg text-white mb-2">{property.title}</h3>
                  <p className="text-sm text-gray-100 mb-4">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {property.district}, {property.city}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{parseFloat(property.overall).toFixed(1)}</span>
                    <span className="text-sm text-gray-100">({property.reviewCount} değerlendirme)</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-100">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {property.guests}
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {property.bathrooms}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-100 mb-2">Özellikler:</p>
                    <div className="flex flex-wrap gap-2">
                      {property.wifi && (
                        <div className="px-2 py-1 bg-blue-50 rounded-lg text-xs flex items-center gap-1">
                          <Wifi className="w-3 h-3 text-blue-600" />
                          WiFi
                        </div>
                      )}
                      {property.pool && (
                        <div className="px-2 py-1 bg-blue-50 rounded-lg text-xs flex items-center gap-1">
                          <Waves className="w-3 h-3 text-blue-600" />
                          Havuz
                        </div>
                      )}
                      {property.parking && (
                        <div className="px-2 py-1 bg-blue-50 rounded-lg text-xs flex items-center gap-1">
                          <Car className="w-3 h-3 text-blue-600" />
                          Otopark
                        </div>
                      )}
                      {property.seaview && (
                        <div className="px-2 py-1 bg-blue-50 rounded-lg text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3 text-blue-600" />
                          Deniz Manzarası
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                {nights > 0 && (
                  <div className="bg-transparent rounded-2xl shadow-xl p-6">
                    <h3 className="font-bold text-lg text-white mb-4">Fiyat Detayları</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          ₺{pricing.nightlyRate.toLocaleString('tr-TR')} × {nights} gece
                        </span>
                        <span className="font-semibold">₺{pricing.subtotal.toLocaleString('tr-TR')}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Temizlik ücreti</span>
                        <span className="font-semibold">₺{pricing.cleaningFee.toLocaleString('tr-TR')}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Hizmet bedeli</span>
                        <span className="font-semibold">₺{pricing.serviceFee.toLocaleString('tr-TR')}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Vergiler</span>
                        <span className="font-semibold">₺{pricing.tax.toLocaleString('tr-TR')}</span>
                      </div>

                      <div className="pt-3 border-t-2 border-white/20">
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">Toplam</span>
                          <span className="font-bold text-lg text-purple-600">
                            ₺{pricing.total.toLocaleString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-start gap-2 text-xs text-gray-100">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                        <p>Rezervasyonunuz güvenli ödeme sistemi ile korunmaktadır.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Host Info */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {property.hostName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white">{property.hostName}</p>
                      <p className="text-sm text-gray-100">Ev Sahibi</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-100">
                    Sorularınız için rezervasyon sonrası ev sahibi ile iletişime geçebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalBookingPage;
