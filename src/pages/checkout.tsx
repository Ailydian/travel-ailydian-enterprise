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
  Ticket,
} from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { FuturisticInput } from '../components/neo-glass/FuturisticInput';
import { FuturisticButton } from '../components/neo-glass/FuturisticButton';
import { NeoSection } from '../components/neo-glass/NeoSection';
import logger from '../lib/logger';
import type { LocationData } from '../components/ui/LocationPicker';
import { useToast } from '../context/ToastContext';

// Dynamically import LocationPicker to avoid SSR issues
const LocationPicker = dynamic(() => import('../components/ui/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="bg-lydian-glass-dark backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="h-96 bg-lydian-bg/5 rounded-lg animate-pulse flex items-center justify-center">
        <MapPin className="w-12 h-12 text-lydian-text-muted" />
      </div>
    </div>
  ),
});

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
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

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
          end: rawData.checkOut || '',
        },
        guests: rawData.guests,
        productSpecific: {
          roomType: rawData.roomType,
          nights: rawData.nights,
          checkIn: rawData.checkIn,
          checkOut: rawData.checkOut,
          rooms: rawData.rooms,
          guests: rawData.guests,
        },
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
          start: rawData.date || '',
        },
        passengers: rawData.guests,
        productSpecific: {
          date: rawData.date,
          guests: rawData.guests,
          slug: rawData.slug,
        },
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
          end: rawData.returnDate,
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
          slug: rawData.slug,
        },
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
          end: rawData.returnDate || '',
        },
        passengers: rawData.passengers,
        productSpecific: {
          pickupDate: rawData.pickupDate,
          returnDate: rawData.returnDate,
          days: rawData.days,
          passengers: rawData.passengers,
          carType: rawData.carType,
          slug: rawData.slug,
        },
      };

    case 'rental-property':
      return {
        type: 'rental-property',
        productId: rawData.propertyId || '',
        productName: rawData.propertyTitle || rawData.propertyName || 'Rental Property',
        basePrice: rawData.priceBreakdown?.nightlyRate || rawData.nightPrice || 0,
        quantity: rawData.nights || 1,
        totalPrice: rawData.totalPrice || (rawData.nightPrice || 0) * (rawData.nights || 1),
        dates: {
          start: rawData.checkInDate || '',
          end: rawData.checkOutDate || '',
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
          rulesAccepted: rawData.rulesAccepted,
        },
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
          start: rawData.departureDate || '',
        },
        passengers: rawData.passengers,
        productSpecific: {
          departureDate: rawData.departureDate,
          passengers: rawData.passengers,
          flightNumber: rawData.flightNumber,
          from: rawData.from,
          to: rawData.to,
        },
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
    country: 'TR',
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
          logger.error('Failed to parse rental checkout data:', e as Error, {
            component: 'Checkout',
          });
        }
      } else if (genericBooking) {
        try {
          data = JSON.parse(genericBooking);
        } catch (e) {
          logger.error('Failed to parse stored booking data:', e as Error, {
            component: 'Checkout',
          });
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
            price: 900,
          },
          {
            title: 'Boğaziçi Palace Hotel',
            guests: 2,
            price: 4800,
          },
        ],
        subtotal: 5700,
        tax: 1026,
        discount: 570,
        total: 6156,
      };
    }

    // Format booking data as order item
    const item: OrderItem = {
      title: bookingData.productName,
      price: bookingData.totalPrice,
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
    const discountRate = 0.1; // 10% AILYDIAN10 discount
    const discount = Math.round(subtotal * discountRate);
    const total = subtotal + tax - discount;

    return {
      items: [item],
      subtotal,
      tax,
      discount,
      total,
    };
  };

  const orderSummary = getOrderSummary();

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Determine guest/passenger count based on booking type
      let guestCount = 0;
      if (bookingData) {
        if (bookingData.type === 'hotel' || bookingData.type === 'rental-property') {
          guestCount = bookingData.guests || 0;
        } else {
          guestCount = bookingData.passengers || 0;
        }
      } else {
        guestCount = orderSummary.items.reduce(
          (sum, item) => sum + (item.guests || item.passengers || 0),
          0
        );
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
              phone: formData.phone,
            },
            billingAddress: {
              address: formData.billingAddress,
              city: formData.city,
              postalCode: formData.postalCode,
              country: formData.country,
            },
            deliveryLocation: deliveryLocation
              ? {
                  latitude: deliveryLocation.lat,
                  longitude: deliveryLocation.lng,
                  address: deliveryLocation.address,
                  city: deliveryLocation.city,
                  country: deliveryLocation.country,
                  postalCode: deliveryLocation.postalCode,
                }
              : null,
            priceBreakdown: {
              subtotal: orderSummary.subtotal,
              tax: orderSummary.tax,
              discount: orderSummary.discount,
              total: orderSummary.total,
            },
          },
        }),
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
      logger.error('Payment error:', error as Error, { component: 'Checkout' });
      setIsProcessing(false);
      showToast({ type: 'error', title: 'Payment failed. Please try again.' });
    }
  };

  if (paymentSuccess) {
    return (
      <>
        <Head>
          <title>Ödeme Başarılı - AILYDIAN Holiday</title>
        </Head>
        <FuturisticHeader />
        <main className="pt-8 min-h-screen bg-lydian-glass-dark flex items-center justify-center px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-lydian-glass-dark backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 sm:p-8 lg:p-12 max-w-md w-full"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-green-500/50">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-lydian-text-inverse" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-lydian-text-inverse mb-3 sm:mb-4">
              Ödeme Başarılı!
            </h1>
            <p className="text-sm sm:text-base text-lydian-text-dim mb-6 sm:mb-8">
              Rezervasyonunuz onaylandı. E-posta ile detayları gönderdik.
            </p>
            <div className="animate-pulse text-cyan-400 font-medium text-sm sm:text-base">
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
          <title>Ödeme İşleniyor - AILYDIAN Holiday</title>
        </Head>
        <FuturisticHeader />
        <main className="pt-8 min-h-screen bg-lydian-glass-dark flex items-center justify-center px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-lydian-glass-dark backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 sm:p-8 lg:p-12 max-w-md w-full"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#667EEA] to-[#00BAFF] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse shadow-lg shadow-[#667EEA]/50">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-lydian-text-inverse" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-lydian-text-inverse mb-3 sm:mb-4">
              Ödeme İşleniyor
            </h1>
            <p className="text-sm sm:text-base text-lydian-text-dim mb-6 sm:mb-8">
              Lütfen bekleyin, ödemeniz güvenli şekilde işleniyor...
            </p>
            <div className="flex items-center gap-2 justify-center text-xs sm:text-sm text-lydian-text-muted">
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
        <title>Güvenli Ödeme - AILYDIAN Holiday | Blockchain Doğrulamalı</title>
        <meta
          name="description"
          content="Güvenli SSL ödeme sayfası. Blockchain teknologisi ile doğrulanmış rezervasyon sistemi."
        />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-lydian-glass-dark pt-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-lydian-text-inverse mb-2">
              Güvenli Ödeme
            </h1>
            <p className="text-sm sm:text-base text-lydian-text-dim">
              Blockchain teknologisi ile doğrulanmış güvenli ödeme
            </p>
          </motion.div>

          {/* Security Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-400/30 rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="font-medium text-lydian-text-inverse">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span className="font-medium text-lydian-text-inverse">PCI DSS Uyumlu</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="font-medium text-lydian-text-inverse">
                  Blockchain Doğrulamalı
                </span>
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
                className="bg-lydian-glass-dark backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-[#00BAFF] to-[#667EEA] text-lydian-text-inverse rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    1
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-lydian-text-inverse">
                    Kişisel Bilgiler
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FuturisticInput
                    type="text"
                    label="Ad"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    leftIcon={<User className="w-4 h-4" />}
                    error={errors.firstName}
                    requiredColor="#00BAFF"
                  />

                  <FuturisticInput
                    type="text"
                    label="Soyad"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    leftIcon={<User className="w-4 h-4" />}
                    error={errors.lastName}
                    requiredColor="#00BAFF"
                  />

                  <FuturisticInput
                    type="email"
                    label="E-posta"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    error={errors.email}
                    requiredColor="#00BAFF"
                  />

                  <FuturisticInput
                    type="tel"
                    label="Telefon"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    leftIcon={<Phone className="w-4 h-4" />}
                    error={errors.phone}
                    requiredColor="#00BAFF"
                  />
                </div>
              </motion.div>

              {/* Step 2: Payment Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-lydian-glass-dark backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-[#00BAFF] to-[#667EEA] text-lydian-text-inverse rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      2
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-lydian-text-inverse">
                      Kart Bilgileri
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                      alt="Visa"
                      className="h-4 sm:h-6"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="Mastercard"
                      className="h-4 sm:h-6"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <FuturisticInput
                    type="text"
                    label="Kart Numarası"
                    value={formatCardNumber(formData.cardNumber)}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
                    leftIcon={<CreditCard className="w-4 h-4" />}
                    error={errors.cardNumber}
                    requiredColor="#667EEA"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Ay *
                      </label>
                      <select
                        value={formData.expiryMonth}
                        onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all ${
                          errors.expiryMonth ? 'border-red-500' : 'border-white/30'
                        }`}
                      >
                        <option value="">Ay</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option
                            key={i + 1}
                            value={String(i + 1).padStart(2, '0')}
                            className="bg-gray-800"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Yıl *
                      </label>
                      <select
                        value={formData.expiryYear}
                        onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all ${
                          errors.expiryYear ? 'border-red-500' : 'border-white/30'
                        }`}
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option
                            key={i}
                            value={String(new Date().getFullYear() + i)}
                            className="bg-gray-800"
                          >
                            {new Date().getFullYear() + i}
                          </option>
                        ))}
                      </select>
                    </div>

                    <FuturisticInput
                      type={showCVV ? 'text' : 'password'}
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                      leftIcon={<Lock className="w-4 h-4" />}
                      error={errors.cvv}
                      requiredColor="#FF9500"
                    />
                  </div>

                  <FuturisticInput
                    type="text"
                    label="Kart Üzerindeki İsim"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                    leftIcon={<User className="w-4 h-4" />}
                    error={errors.cardName}
                    requiredColor="#667EEA"
                  />
                </div>
              </motion.div>

              {/* Step 3: Billing Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-lydian-glass-dark backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-[#00BAFF] to-[#667EEA] text-lydian-text-inverse rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    3
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-lydian-text-inverse">
                    Fatura Adresi
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="md:col-span-2">
                    <FuturisticInput
                      type="text"
                      label="Adres"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      leftIcon={<MapPin className="w-4 h-4" />}
                      error={errors.billingAddress}
                      requiredColor="#00BAFF"
                    />
                  </div>

                  <FuturisticInput
                    type="text"
                    label="Şehir"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    leftIcon={<Building className="w-4 h-4" />}
                    error={errors.city}
                    requiredColor="#00BAFF"
                  />

                  <FuturisticInput
                    type="text"
                    label="Posta Kodu"
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleInputChange('postalCode', e.target.value.replace(/\D/g, ''))
                    }
                    leftIcon={<MapPin className="w-4 h-4" />}
                    error={errors.postalCode}
                    requiredColor="#00BAFF"
                  />

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Ülke *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-lydian-text-inverse outline-none transition-all"
                    >
                      <option value="TR" className="bg-gray-800">
                        Türkiye
                      </option>
                      <option value="US" className="bg-gray-800">
                        Amerika Birleşik Devletleri
                      </option>
                      <option value="GB" className="bg-gray-800">
                        Birleşik Krallık
                      </option>
                      <option value="DE" className="bg-gray-800">
                        Almanya
                      </option>
                      <option value="FR" className="bg-gray-800">
                        Fransa
                      </option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Step 4: Delivery Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-lydian-glass-dark backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-[#00BAFF] to-[#667EEA] text-lydian-text-inverse rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    4
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-lydian-text-inverse">
                    Teslim Alma Noktası
                  </h2>
                </div>

                <LocationPicker
                  onLocationSelect={(location) => {
                    setDeliveryLocation(location);
                    // Clear delivery location error if exists
                    if (errors.deliveryLocation) {
                      setErrors((prev) => ({ ...prev, deliveryLocation: '' }));
                    }
                  }}
                  required={true}
                />

                {errors.deliveryLocation && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-300">{errors.deliveryLocation}</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-lydian-glass-dark backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-4 sm:p-6 lg:sticky lg:top-8"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="font-bold text-base sm:text-lg text-lydian-text-inverse">
                    Sipariş Özeti
                  </h3>
                  {bookingData && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#667EEA]/20 to-[#00BAFF]/20 border border-[#667EEA]/30 rounded-full">
                      {bookingData.type === 'hotel' && (
                        <Home className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      )}
                      {bookingData.type === 'tour' && (
                        <Ticket className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      )}
                      {bookingData.type === 'transfer' && (
                        <Car className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      )}
                      {bookingData.type === 'car-rental' && (
                        <Car className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      )}
                      {bookingData.type === 'rental-property' && (
                        <Home className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      )}
                      {bookingData.type === 'flight' && (
                        <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                      )}
                      <span className="text-[10px] sm:text-xs text-cyan-300 font-semibold">
                        {bookingData.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="min-w-0 pr-2">
                        <p className="font-medium text-lydian-text-inverse text-xs sm:text-sm line-clamp-2">
                          {item.title}
                        </p>
                        {item.guests && (
                          <p className="text-[10px] sm:text-xs text-lydian-text-muted">
                            {item.guests} misafir
                          </p>
                        )}
                        {item.passengers && (
                          <p className="text-[10px] sm:text-xs text-lydian-text-muted">
                            {item.passengers} yolcu
                          </p>
                        )}
                        {bookingData &&
                          bookingData.type === 'hotel' &&
                          bookingData.productSpecific.nights && (
                            <p className="text-[10px] sm:text-xs text-lydian-text-muted">
                              {bookingData.productSpecific.nights} gece
                            </p>
                          )}
                        {bookingData &&
                          bookingData.type === 'transfer' &&
                          bookingData.productSpecific.date && (
                            <p className="text-[10px] sm:text-xs text-lydian-text-muted">
                              {bookingData.productSpecific.date}
                            </p>
                          )}
                        {bookingData &&
                          bookingData.type === 'tour' &&
                          bookingData.productSpecific.date && (
                            <p className="text-[10px] sm:text-xs text-lydian-text-muted">
                              {bookingData.productSpecific.date}
                            </p>
                          )}
                      </div>
                      <span className="font-semibold text-sm sm:text-base whitespace-nowrap text-lydian-text-inverse">
                        ₺{item.price.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 border-t border-lydian-border pt-3 sm:pt-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-lydian-text-dim">Ara Toplam</span>
                    <span className="font-semibold text-lydian-text-inverse">
                      ₺{orderSummary.subtotal.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-lydian-text-dim">KDV (%18)</span>
                    <span className="font-semibold text-lydian-text-inverse">
                      ₺{orderSummary.tax.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-green-400">
                    <span>İndirim (AILYDIAN10)</span>
                    <span className="font-semibold">
                      -₺{orderSummary.discount.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="border-t border-lydian-border pt-2 sm:pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-lydian-text-inverse">
                        Toplam
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                        ₺{orderSummary.total.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-lydian-bg/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-lydian-text-dim">256-bit SSL Güvenli</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                    <span className="text-lydian-text-dim">PCI DSS Uyumlu</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-lydian-text-dim">Blockchain Doğrulama</span>
                  </div>
                </div>

                <FuturisticButton variant="ai"
                  size="lg"
                  fullWidth
                  onClick={handleSubmit}
                  leftIcon={<Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
                >
                  Güvenli Ödeme Yap
                </FuturisticButton>

                <p className="text-[10px] sm:text-xs text-lydian-text-muted text-center mt-3 sm:mt-4">
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
