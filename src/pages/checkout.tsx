import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Lock,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Zap,
  Eye,
  EyeOff,
  Building,
  Globe,
  Package,
  Plane,
  Car,
  Home,
  Ticket
} from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import type { LocationData } from '../components/ui/LocationPicker';

// Dynamically import LocationPicker to avoid SSR issues
const LocationPicker = dynamic(
  () => import('../components/ui/LocationPicker'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-transparent rounded-xl border border-gray-200 p-6">
        <div className="h-96 bg-white/10 rounded-lg animate-pulse flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
      </div>
    )
  }
);

interface PaymentForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardName: string;
  billingAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

interface UnifiedBookingData {
  type: 'transfer' | 'car-rental' | 'rental-property' | 'tour' | 'hotel' | 'flight';
  productId: string;
  productName: string;
  productImage?: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  dates: {
    start: string;
    end?: string;
  };
  participants?: number;
  guests?: number;
  passengers?: number;
  productSpecific: Record<string, any>;
}

interface OrderItem {
  title: string;
  guests?: number;
  passengers?: number;
  quantity?: number;
  price: number;
}

interface OrderSummary {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

// Normalization function to convert any product data to unified format
const normalizeBookingData = (rawData: any): UnifiedBookingData | null => {
  if (!rawData || !rawData.type) return null;

  const type = rawData.type as UnifiedBookingData['type'];

  switch (type) {
    case 'hotel':
      return {
        type: 'hotel',
        productId: rawData.hotel || '',
        productName: rawData.hotelName || 'Hotel',
        basePrice: rawData.roomPrice || 0,
        quantity: rawData.rooms || 1,
        totalPrice: rawData.totalPrice || 0,
        dates: {
          start: rawData.checkIn || '',
          end: rawData.checkOut || ''
        },
        guests: rawData.guests,
        productSpecific: {
          roomType: rawData.roomType,
          nights: rawData.nights,
          checkIn: rawData.checkIn,
          checkOut: rawData.checkOut,
          rooms: rawData.rooms,
          guests: rawData.guests
        }
      };

    case 'tour':
      return {
        type: 'tour',
        productId: rawData.id || '',
        productName: rawData.title || 'Tour',
        basePrice: rawData.price || 0,
        quantity: rawData.guests || 1,
        totalPrice: (rawData.price || 0) * (rawData.guests || 1),
        dates: {
          start: rawData.date || ''
        },
        passengers: rawData.guests,
        productSpecific: {
          date: rawData.date,
          guests: rawData.guests,
          slug: rawData.slug
        }
      };

    case 'transfer':
      return {
        type: 'transfer',
        productId: rawData.id || '',
        productName: rawData.title || 'Transfer',
        basePrice: rawData.pricePerVehicle || rawData.price || 0,
        quantity: 1,
        totalPrice: rawData.totalPrice || rawData.pricePerVehicle || 0,
        dates: {
          start: rawData.date || '',
          end: rawData.returnDate
        },
        passengers: rawData.passengers,
        productSpecific: {
          date: rawData.date,
          time: rawData.time,
          serviceType: rawData.serviceType,
          passengers: rawData.passengers,
          luggage: rawData.luggage,
          flightNumber: rawData.flightNumber,
          terminal: rawData.terminal,
          extras: rawData.extras,
          returnDate: rawData.returnDate,
          returnTime: rawData.returnTime,
          slug: rawData.slug
        }
      };

    case 'car-rental':
      return {
        type: 'car-rental',
        productId: rawData.carId || '',
        productName: rawData.carName || 'Car Rental',
        basePrice: rawData.dailyPrice || 0,
        quantity: rawData.days || 1,
        totalPrice: (rawData.dailyPrice || 0) * (rawData.days || 1),
        dates: {
          start: rawData.pickupDate || '',
          end: rawData.returnDate || ''
        },
        passengers: rawData.passengers,
        productSpecific: {
          pickupDate: rawData.pickupDate,
          returnDate: rawData.returnDate,
          days: rawData.days,
          passengers: rawData.passengers,
          carType: rawData.carType,
          slug: rawData.slug
        }
      };

    case 'rental-property':
      return {
        type: 'rental-property',
        productId: rawData.propertyId || '',
        productName: rawData.propertyTitle || rawData.propertyName || 'Rental Property',
        basePrice: rawData.priceBreakdown?.nightlyRate || rawData.nightPrice || 0,
        quantity: rawData.nights || 1,
        totalPrice: rawData.totalPrice || ((rawData.nightPrice || 0) * (rawData.nights || 1)),
        dates: {
          start: rawData.checkInDate || '',
          end: rawData.checkOutDate || ''
        },
        guests: rawData.guests,
        productSpecific: {
          checkInDate: rawData.checkInDate,
          checkOutDate: rawData.checkOutDate,
          nights: rawData.nights,
          guests: rawData.guests,
          slug: rawData.slug,
          propertyImage: rawData.propertyImage,
          priceBreakdown: rawData.priceBreakdown,
          primaryGuest: rawData.primaryGuest,
          emergencyContact: rawData.emergencyContact,
          purposeOfStay: rawData.purposeOfStay,
          arrivalTime: rawData.arrivalTime,
          specialRequests: rawData.specialRequests,
          rulesAccepted: rawData.rulesAccepted
        }
      };

    case 'flight':
      return {
        type: 'flight',
        productId: rawData.flightId || '',
        productName: rawData.flightName || 'Flight',
        basePrice: rawData.price || 0,
        quantity: rawData.passengers || 1,
        totalPrice: (rawData.price || 0) * (rawData.passengers || 1),
        dates: {
          start: rawData.departureDate || ''
        },
        passengers: rawData.passengers,
        productSpecific: {
          departureDate: rawData.departureDate,
          passengers: rawData.passengers,
          flightNumber: rawData.flightNumber,
          from: rawData.from,
          to: rawData.to
        }
      };

    default:
      return null;
  }
};

const Checkout: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCVV, setShowCVV] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState<LocationData | null>(null);
  const [bookingData, setBookingData] = useState<UnifiedBookingData | null>(null);

  const [formData, setFormData] = useState<PaymentForm>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'TR'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Load booking data from URL params or localStorage on mount
  useEffect(() => {
    if (!router.isReady) return;

    // Try to get from URL query params first
    let data = router.query;

    // If not in query, try localStorage for rental-checkout-data or generic bookingData
    if (!data.type) {
      const rentalCheckout = localStorage.getItem('rental-checkout-data');
      const genericBooking = localStorage.getItem('bookingData');

      if (rentalCheckout) {
        try {
          data = JSON.parse(rentalCheckout);
          // Clear after loading
          localStorage.removeItem('rental-checkout-data');
        } catch (e) {
          console.error('Failed to parse rental checkout data:', e);
        }
      } else if (genericBooking) {
        try {
          data = JSON.parse(genericBooking);
        } catch (e) {
          console.error('Failed to parse stored booking data:', e);
        }
      }
    }

    // Normalize the data
    const normalized = normalizeBookingData(data);
    if (normalized) {
      setBookingData(normalized);
      // Clear localStorage after loading
      localStorage.removeItem('bookingData');
    }
  }, [router.isReady, router.query]);

  // Generate order summary from booking data
  const getOrderSummary = (): OrderSummary => {
    if (!bookingData) {
      // Fallback mock data
      return {
        items: [
          {
            title: 'Kapadokya: Blockchain Doğrulamalı Balon Turu',
            guests: 2,
            price: 900
          },
          {
            title: 'Boğaziçi Palace Hotel',
            guests: 2,
            price: 4800
          }
        ],
        subtotal: 5700,
        tax: 1026,
        discount: 570,
        total: 6156
      };
    }

    // Format booking data as order item
    const item: OrderItem = {
      title: bookingData.productName,
      price: bookingData.totalPrice
    };

    // Add relevant count based on type
    if (bookingData.type === 'hotel' || bookingData.type === 'rental-property') {
      item.guests = bookingData.guests || 0;
    } else if (bookingData.type === 'tour') {
      item.passengers = bookingData.passengers || 0;
    } else if (bookingData.type === 'transfer' || bookingData.type === 'car-rental') {
      item.passengers = bookingData.passengers || 0;
    }

    const subtotal = bookingData.totalPrice;
    const taxRate = 0.18; // 18% VAT
    const tax = Math.round(subtotal * taxRate);
    const discountRate = 0.10; // 10% AILYDIAN10 discount
    const discount = Math.round(subtotal * discountRate);
    const total = subtotal + tax - discount;

    return {
      items: [item],
      subtotal,
      tax,
      discount,
      total
    };
  };

  const orderSummary = getOrderSummary();

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Personal Info Validation
    if (!formData.email) newErrors.email = 'E-posta adresi gereklidir';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçersiz e-posta adresi';

    if (!formData.firstName) newErrors.firstName = 'Ad gereklidir';
    if (!formData.lastName) newErrors.lastName = 'Soyad gereklidir';
    if (!formData.phone) newErrors.phone = 'Telefon numarası gereklidir';

    // Card Validation
    const cardDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardDigits) newErrors.cardNumber = 'Kart numarası gereklidir';
    else if (cardDigits.length !== 16) newErrors.cardNumber = 'Kart numarası 16 haneli olmalıdır';

    if (!formData.expiryMonth) newErrors.expiryMonth = 'Ay gereklidir';
    if (!formData.expiryYear) newErrors.expiryYear = 'Yıl gereklidir';
    if (!formData.cvv) newErrors.cvv = 'CVV gereklidir';
    else if (formData.cvv.length !== 3) newErrors.cvv = 'CVV 3 haneli olmalıdır';

    if (!formData.cardName) newErrors.cardName = 'Kart üzerindeki isim gereklidir';

    // Billing Address
    if (!formData.billingAddress) newErrors.billingAddress = 'Adres gereklidir';
    if (!formData.city) newErrors.city = 'Şehir gereklidir';
    if (!formData.postalCode) newErrors.postalCode = 'Posta kodu gereklidir';

    // Delivery Location Validation
    if (!deliveryLocation) newErrors.deliveryLocation = 'Teslim alma noktası seçmelisiniz';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Determine guest/passenger count based on booking type
      let guestCount = 0;
      if (bookingData) {
        if (bookingData.type === 'hotel' || bookingData.type === 'rental-property') {
          guestCount = bookingData.guests || 0;
        } else {
          guestCount = bookingData.passengers || 0;
        }
      } else {
        guestCount = orderSummary.items.reduce((sum, item) => sum + (item.guests || item.passengers || 0), 0);
      }

      // Create booking and send confirmation with complete product data
      const response = await fetch('/api/bookings/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingType: bookingData?.type?.toUpperCase() || 'PACKAGE',
          totalAmount: orderSummary.total,
          currency: 'TRY',
          paymentMethod: 'CREDIT_CARD',
          checkInDate: bookingData?.dates.start || new Date().toISOString(),
          guestCount,
          specialRequests: '',
          metaData: {
            bookingData: bookingData || null,
            items: orderSummary.items,
            customerInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone
            },
            billingAddress: {
              address: formData.billingAddress,
              city: formData.city,
              postalCode: formData.postalCode,
              country: formData.country
            },
            deliveryLocation: deliveryLocation ? {
              latitude: deliveryLocation.lat,
              longitude: deliveryLocation.lng,
              address: deliveryLocation.address,
              city: deliveryLocation.city,
              country: deliveryLocation.country,
              postalCode: deliveryLocation.postalCode
            } : null,
            priceBreakdown: {
              subtotal: orderSummary.subtotal,
              tax: orderSummary.tax,
              discount: orderSummary.discount,
              total: orderSummary.total
            }
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking confirmation failed');
      }

      setIsProcessing(false);
      setPaymentSuccess(true);

      // Redirect to confirmation page with booking reference
      setTimeout(() => {
        router.push(`/booking-confirmed?ref=${data.booking.bookingReference}`);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    return 'generic';
  };

  if (paymentSuccess) {
    return (
      <>
        <Head>
          <title>Ödeme Başarılı - LyDian Travel</title>
        </Head>
        <FuturisticHeader />
        <main className="pt-8 min-h-screen bg-white/5 flex items-center justify-center px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-transparent rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 max-w-md w-full"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Ödeme Başarılı!</h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">Rezervasyonunuz onaylandı. E-posta ile detayları gönderdik.</p>
            <div className="animate-pulse text-lydian-primary font-medium text-sm sm:text-base">
              Başarı sayfasına yönlendiriliyorsunuz...
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  if (isProcessing) {
    return (
      <>
        <Head>
          <title>Ödeme İşleniyor - LyDian Travel</title>
        </Head>
        <FuturisticHeader />
        <main className="pt-8 min-h-screen bg-white/5 flex items-center justify-center px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-transparent rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 max-w-md w-full"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-lydian-primary" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Ödeme İşleniyor</h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">Lütfen bekleyin, ödemeniz güvenli şekilde işleniyor...</p>
            <div className="flex items-center gap-2 justify-center text-xs sm:text-sm text-gray-400">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              256-bit SSL ile korumalı
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Güvenli Ödeme - LyDian Travel | Blockchain Doğrulamalı</title>
        <meta name="description" content="Güvenli SSL ödeme sayfası. Blockchain teknologisi ile doğrulanmış rezervasyon sistemi." />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Güvenli Ödeme</h1>
            <p className="text-sm sm:text-base text-gray-300">Blockchain teknologisi ile doğrulanmış güvenli ödeme</p>
          </motion.div>

          {/* Security Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="font-medium">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="font-medium">PCI DSS Uyumlu</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                <span className="font-medium">Blockchain Doğrulamalı</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Step 1: Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lydian-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    1
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Kişisel Bilgiler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Ad *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Adınız"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Soyad *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Soyadınız"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+90 5XX XXX XX XX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Payment Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lydian-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      2
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">Kart Bilgileri</h2>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 sm:h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 sm:h-6" />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Kart Numarası *
                    </label>
                    <input
                      type="text"
                      value={formatCardNumber(formData.cardNumber)}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
                      maxLength={19}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors font-mono ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        Ay *
                      </label>
                      <select
                        value={formData.expiryMonth}
                        onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                          errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Ay</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        Yıl *
                      </label>
                      <select
                        value={formData.expiryYear}
                        onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                          errors.expiryYear ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={String(new Date().getFullYear() + i)}>
                            {new Date().getFullYear() + i}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                        <Lock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        CVV *
                      </label>
                      <div className="relative">
                        <input
                          type={showCVV ? 'text' : 'password'}
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          maxLength={3}
                          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors font-mono text-center ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCVV(!showCVV)}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showCVV ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Kart Üzerindeki İsim *
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="AHMET YILMAZ"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.cardName}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Billing Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lydian-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    3
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Fatura Adresi</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Adres *
                    </label>
                    <input
                      type="text"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tam adresinizi girin"
                    />
                    {errors.billingAddress && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.billingAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <Building className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Şehir *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="İstanbul"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Posta Kodu *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value.replace(/\D/g, ''))}
                      maxLength={5}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="34000"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Ülke *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none transition-colors"
                    >
                      <option value="TR">Türkiye</option>
                      <option value="US">Amerika Birleşik Devletleri</option>
                      <option value="GB">Birleşik Krallık</option>
                      <option value="DE">Almanya</option>
                      <option value="FR">Fransa</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Step 4: Delivery Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-lydian-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    4
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Teslim Alma Noktası</h2>
                </div>

                <LocationPicker
                  onLocationSelect={(location) => {
                    setDeliveryLocation(location);
                    // Clear delivery location error if exists
                    if (errors.deliveryLocation) {
                      setErrors(prev => ({ ...prev, deliveryLocation: '' }));
                    }
                  }}
                  required={true}
                />

                {errors.deliveryLocation && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700">{errors.deliveryLocation}</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-transparent rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-8"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="font-bold text-base sm:text-lg text-white">Sipariş Özeti</h3>
                  {bookingData && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                      {bookingData.type === 'hotel' && <Home className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />}
                      {bookingData.type === 'tour' && <Ticket className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />}
                      {bookingData.type === 'transfer' && <Car className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />}
                      {bookingData.type === 'car-rental' && <Car className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />}
                      {bookingData.type === 'rental-property' && <Home className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />}
                      {bookingData.type === 'flight' && <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />}
                      <span className="text-[10px] sm:text-xs text-blue-700 font-semibold">
                        {bookingData.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="min-w-0 pr-2">
                        <p className="font-medium text-white text-xs sm:text-sm line-clamp-2">{item.title}</p>
                        {item.guests && <p className="text-[10px] sm:text-xs text-gray-400">{item.guests} misafir</p>}
                        {item.passengers && <p className="text-[10px] sm:text-xs text-gray-400">{item.passengers} yolcu</p>}
                        {bookingData && bookingData.type === 'hotel' && bookingData.productSpecific.nights && (
                          <p className="text-[10px] sm:text-xs text-gray-400">{bookingData.productSpecific.nights} gece</p>
                        )}
                        {bookingData && bookingData.type === 'transfer' && bookingData.productSpecific.date && (
                          <p className="text-[10px] sm:text-xs text-gray-400">{bookingData.productSpecific.date}</p>
                        )}
                        {bookingData && bookingData.type === 'tour' && bookingData.productSpecific.date && (
                          <p className="text-[10px] sm:text-xs text-gray-400">{bookingData.productSpecific.date}</p>
                        )}
                      </div>
                      <span className="font-semibold text-sm sm:text-base whitespace-nowrap">₺{item.price.toLocaleString('tr-TR')}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">Ara Toplam</span>
                    <span className="font-semibold">₺{orderSummary.subtotal.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">KDV (%18)</span>
                    <span className="font-semibold">₺{orderSummary.tax.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-green-600">
                    <span>İndirim (AILYDIAN10)</span>
                    <span className="font-semibold">-₺{orderSummary.discount.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 sm:pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-white">Toplam</span>
                      <span className="text-xl sm:text-2xl font-bold text-lydian-primary">₺{orderSummary.total.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span className="text-gray-200">256-bit SSL Güvenli</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                    <span className="text-gray-200">PCI DSS Uyumlu</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                    <span className="text-gray-200">Blockchain Doğrulama</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  Güvenli Ödeme Yap
                </button>

                <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-3 sm:mt-4">
                  Tüm kart bilgileriniz 256-bit SSL ile şifrelenir ve güvenli şekilde işlenir.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;