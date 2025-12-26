import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plane,
  User,
  Calendar,
  MapPin,
  CreditCard,
  Luggage,
  Shield,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Globe,
  Phone,
  Mail,
  Users,
  CheckCircle,
  X,
  Info,
  ShoppingBag,
  Coffee,
  Armchair,
  Clock,
} from 'lucide-react';
import SimplifiedHeader from '../../components/layout/SimplifiedHeader';
import { SEOHead } from '../../components/seo/SEOHead';

interface PassengerInfo {
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  frequentFlyerNumber?: string;
  seatNumber?: string;
  baggage: {
    cabin: boolean;
    checked: number;
  };
}

interface LeadPassenger {
  email: string;
  phone: string;
}

interface ExtrasSelection {
  insurance: boolean;
  priorityBoarding: boolean;
  loungeAccess: boolean;
  meals: string[];
}

const SEAT_MAP = {
  economy: [
    ['1A', '1B', '1C', 'AISLE', '1D', '1E', '1F'],
    ['2A', '2B', '2C', 'AISLE', '2D', '2E', '2F'],
    ['3A', '3B', '3C', 'AISLE', '3D', '3E', '3F'],
    ['EXIT', 'EXIT', 'EXIT', 'EXIT', 'EXIT', 'EXIT', 'EXIT'],
    ['4A', '4B', '4C', 'AISLE', '4D', '4E', '4F'],
    ['5A', '5B', '5C', 'AISLE', '5D', '5E', '5F'],
  ],
};

const BAGGAGE_OPTIONS = [
  { weight: 0, label: 'Sadece Kabin Bagajı', price: 0 },
  { weight: 20, label: '20 kg Kontrol Bagajı', price: 0 },
  { weight: 30, label: '30 kg Kontrol Bagajı', price: 150 },
  { weight: 40, label: '40 kg Kontrol Bagajı', price: 300 },
];

const MEAL_OPTIONS = [
  { id: 'vegetarian', label: 'Vejetaryen Menü', price: 50 },
  { id: 'vegan', label: 'Vegan Menü', price: 50 },
  { id: 'gluten-free', label: 'Glütensiz Menü', price: 50 },
  { id: 'child', label: 'Çocuk Menüsü', price: 40 },
];

export default function FlightBooking() {
  const router = useRouter();
  const { flightId, fareClass, adults, children, infants } = router.query;

  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);
  const [leadPassenger, setLeadPassenger] = useState<LeadPassenger>({ email: '', phone: '' });
  const [extras, setExtras] = useState<ExtrasSelection>({
    insurance: false,
    priorityBoarding: false,
    loungeAccess: false,
    meals: [],
  });
  const [selectedSeats, setSelectedSeats] = useState<Record<number, string>>({});
  const [takenSeats] = useState<string[]>(['1A', '2C', '3F', '5B']); // Mock taken seats
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Mock flight data
  const flightData = {
    airline: 'Turkish Airlines',
    flightNumber: 'TK123',
    from: { code: 'IST', city: 'İstanbul' },
    to: { code: 'AYT', city: 'Antalya' },
    departure: { date: '2024-02-15', time: '08:30' },
    arrival: { date: '2024-02-15', time: '10:15' },
    duration: '1s 45d',
    fareClass: fareClass as string || 'economy',
    baseFare: fareClass === 'business' ? 1850 : fareClass === 'first' ? 3500 : 450,
  };

  // Initialize passengers
  useEffect(() => {
    if (adults || children || infants) {
      const adultCount = parseInt(adults as string) || 1;
      const childCount = parseInt(children as string) || 0;
      const infantCount = parseInt(infants as string) || 0;

      const initialPassengers: PassengerInfo[] = [];

      for (let i = 0; i < adultCount; i++) {
        initialPassengers.push({
          type: 'adult',
          title: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          nationality: 'TR',
          baggage: { cabin: true, checked: 20 },
        });
      }

      for (let i = 0; i < childCount; i++) {
        initialPassengers.push({
          type: 'child',
          title: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          nationality: 'TR',
          baggage: { cabin: true, checked: 20 },
        });
      }

      for (let i = 0; i < infantCount; i++) {
        initialPassengers.push({
          type: 'infant',
          title: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          nationality: 'TR',
          baggage: { cabin: false, checked: 0 },
        });
      }

      setPassengers(initialPassengers);
    }
  }, [adults, children, infants]);

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: any) => {
    const updated = [...passengers];
    if (field === 'baggage') {
      updated[index] = { ...updated[index], baggage: { ...updated[index].baggage, ...value } };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setPassengers(updated);
    // Clear error for this field
    setErrors(prev => ({ ...prev, [`passenger-${index}-${field}`]: '' }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 2) {
      // Validate passenger information
      passengers.forEach((passenger, idx) => {
        if (!passenger.title) newErrors[`passenger-${idx}-title`] = 'Unvan gerekli';
        if (!passenger.firstName) newErrors[`passenger-${idx}-firstName`] = 'Ad gerekli';
        if (!passenger.lastName) newErrors[`passenger-${idx}-lastName`] = 'Soyad gerekli';
        if (!passenger.dateOfBirth) newErrors[`passenger-${idx}-dateOfBirth`] = 'Doğum tarihi gerekli';
        if (!passenger.nationality) newErrors[`passenger-${idx}-nationality`] = 'Uyruk gerekli';
      });

      // Validate lead passenger
      if (!leadPassenger.email) newErrors['leadPassenger-email'] = 'E-posta gerekli';
      else if (!/\S+@\S+\.\S+/.test(leadPassenger.email)) newErrors['leadPassenger-email'] = 'Geçersiz e-posta';
      if (!leadPassenger.phone) newErrors['leadPassenger-phone'] = 'Telefon gerekli';
    }

    if (step === 6) {
      // Validate terms
      if (!termsAccepted) newErrors['terms'] = 'Şartları kabul etmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(6, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSeat = (passengerIdx: number, seat: string) => {
    if (takenSeats.includes(seat)) return;

    setSelectedSeats(prev => {
      const newSeats = { ...prev };
      if (newSeats[passengerIdx] === seat) {
        delete newSeats[passengerIdx];
      } else {
        newSeats[passengerIdx] = seat;
      }
      return newSeats;
    });

    updatePassenger(passengerIdx, 'seatNumber', selectedSeats[passengerIdx] === seat ? undefined : seat);
  };

  const calculatePrices = () => {
    const baseFare = passengers.reduce((sum, p) => {
      if (p.type === 'infant') return sum + 50;
      return sum + flightData.baseFare;
    }, 0);

    const taxes = baseFare * 0.18;

    const seats = Object.keys(selectedSeats).reduce((sum, key) => {
      const seat = selectedSeats[parseInt(key)];
      if (seat.includes('4') || seat.includes('EXIT')) return sum + 100; // Extra legroom
      if (seat.endsWith('A') || seat.endsWith('F')) return sum + 50; // Window seats
      return sum;
    }, 0);

    const baggage = passengers.reduce((sum, p) => {
      const baggageOption = BAGGAGE_OPTIONS.find(b => b.weight === p.baggage.checked);
      return sum + (baggageOption?.price || 0);
    }, 0);

    let extrasTotal = 0;
    if (extras.insurance) extrasTotal += 75 * passengers.length;
    if (extras.priorityBoarding) extrasTotal += 100;
    if (extras.loungeAccess) extrasTotal += 250;
    extrasTotal += extras.meals.length * 50;

    const total = baseFare + taxes + seats + baggage + extrasTotal;

    return { baseFare, taxes, seats, baggage, extras: extrasTotal, total };
  };

  const handleCheckout = () => {
    if (!validateStep(6)) return;

    const prices = calculatePrices();

    // Prepare data for checkout
    const checkoutData = {
      type: 'flight',
      flightId: flightId,
      departureAirport: flightData.from.code,
      arrivalAirport: flightData.to.code,
      departureDate: flightData.departure.date,
      departureTime: flightData.departure.time,
      arrivalDate: flightData.arrival.date,
      arrivalTime: flightData.arrival.time,
      airline: flightData.airline,
      flightNumber: flightData.flightNumber,
      fareClass: flightData.fareClass,
      passengers: passengers,
      leadPassenger: leadPassenger,
      extras: extras,
      totalPrice: prices.total,
      priceBreakdown: prices,
    };

    // Store in sessionStorage
    sessionStorage.setItem('flightBookingData', JSON.stringify(checkoutData));

    // Navigate to checkout
    router.push('/checkout');
  };

  const prices = calculatePrices();

  const steps = [
    { number: 1, title: 'Uçuş Özeti', icon: Plane },
    { number: 2, title: 'Yolcu Bilgileri', icon: Users },
    { number: 3, title: 'Koltuk Seçimi', icon: Armchair },
    { number: 4, title: 'Bagaj', icon: Luggage },
    { number: 5, title: 'Ekstra Hizmetler', icon: ShoppingBag },
    { number: 6, title: 'İnceleme', icon: CheckCircle },
  ];

  return (
    <>
      <SEOHead
        title="Uçuş Rezervasyonu - LyDian Travel"
        description="Güvenli ve hızlı uçuş rezervasyonu yapın."
        type="website"
      />

      <SimplifiedHeader />

      {/* Back Button */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-lydian-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Geri Dön</span>
          </button>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-lydian-primary text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>
                      <div className="text-xs mt-2 text-center max-w-[80px]">
                        <div className={`font-medium ${isActive ? 'text-lydian-primary' : 'text-gray-600'}`}>
                          {step.title}
                        </div>
                      </div>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Flight Review */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Uçuş Detayları</h2>

                    <div className="border-2 border-blue-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{flightData.airline}</h3>
                          <p className="text-gray-600">{flightData.flightNumber}</p>
                        </div>
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                          Direkt
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center">
                        <div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">{flightData.departure.time}</div>
                          <div className="text-lg font-semibold">{flightData.from.code}</div>
                          <div className="text-sm text-gray-600">{flightData.from.city}</div>
                          <div className="text-xs text-gray-500 mt-1">{flightData.departure.date}</div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <div className="flex-1 h-0.5 bg-gray-300"></div>
                            <Plane className="w-6 h-6 text-lydian-primary mx-2 transform rotate-90" />
                            <div className="flex-1 h-0.5 bg-gray-300"></div>
                          </div>
                          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {flightData.duration}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900 mb-1">{flightData.arrival.time}</div>
                          <div className="text-lg font-semibold">{flightData.to.code}</div>
                          <div className="text-sm text-gray-600">{flightData.to.city}</div>
                          <div className="text-xs text-gray-500 mt-1">{flightData.arrival.date}</div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-blue-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Ücret Sınıfı</p>
                            <p className="font-semibold text-gray-900 capitalize">{flightData.fareClass}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Yolcu Sayısı</p>
                            <p className="font-semibold text-gray-900">{passengers.length} Kişi</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                      <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">Önemli Bilgi</p>
                        <p>Lütfen tüm yolcu bilgilerinin kimlik belgenizdeki ile aynı olduğundan emin olun.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Passenger Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Yolcu Bilgileri</h2>

                    <div className="space-y-6">
                      {passengers.map((passenger, idx) => (
                        <div key={idx} className="border-2 border-gray-200 rounded-xl p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-4">
                            Yolcu {idx + 1} - {passenger.type === 'adult' ? 'Yetişkin' : passenger.type === 'child' ? 'Çocuk' : 'Bebek'}
                          </h3>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unvan *
                              </label>
                              <select
                                value={passenger.title}
                                onChange={(e) => updatePassenger(idx, 'title', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                  errors[`passenger-${idx}-title`] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Seçiniz</option>
                                <option value="Mr">Bay</option>
                                <option value="Mrs">Bayan</option>
                                <option value="Ms">Bayan</option>
                              </select>
                              {errors[`passenger-${idx}-title`] && (
                                <p className="mt-1 text-sm text-red-500">{errors[`passenger-${idx}-title`]}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ad *
                              </label>
                              <input
                                type="text"
                                value={passenger.firstName}
                                onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                  errors[`passenger-${idx}-firstName`] ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Adınız"
                              />
                              {errors[`passenger-${idx}-firstName`] && (
                                <p className="mt-1 text-sm text-red-500">{errors[`passenger-${idx}-firstName`]}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Soyad *
                              </label>
                              <input
                                type="text"
                                value={passenger.lastName}
                                onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                  errors[`passenger-${idx}-lastName`] ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Soyadınız"
                              />
                              {errors[`passenger-${idx}-lastName`] && (
                                <p className="mt-1 text-sm text-red-500">{errors[`passenger-${idx}-lastName`]}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Doğum Tarihi *
                              </label>
                              <input
                                type="date"
                                value={passenger.dateOfBirth}
                                onChange={(e) => updatePassenger(idx, 'dateOfBirth', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                  errors[`passenger-${idx}-dateOfBirth`] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors[`passenger-${idx}-dateOfBirth`] && (
                                <p className="mt-1 text-sm text-red-500">{errors[`passenger-${idx}-dateOfBirth`]}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Uyruk *
                              </label>
                              <select
                                value={passenger.nationality}
                                onChange={(e) => updatePassenger(idx, 'nationality', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                  errors[`passenger-${idx}-nationality`] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="TR">Türkiye</option>
                                <option value="US">Amerika Birleşik Devletleri</option>
                                <option value="GB">Birleşik Krallık</option>
                                <option value="DE">Almanya</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Frequent Flyer No (Opsiyonel)
                              </label>
                              <input
                                type="text"
                                value={passenger.frequentFlyerNumber || ''}
                                onChange={(e) => updatePassenger(idx, 'frequentFlyerNumber', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary"
                                placeholder="FF1234567"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Lead Passenger Contact */}
                      <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">İletişim Bilgileri</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Mail className="w-4 h-4 inline mr-1" />
                              E-posta *
                            </label>
                            <input
                              type="email"
                              value={leadPassenger.email}
                              onChange={(e) => setLeadPassenger(prev => ({ ...prev, email: e.target.value }))}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                errors['leadPassenger-email'] ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="ornek@email.com"
                            />
                            {errors['leadPassenger-email'] && (
                              <p className="mt-1 text-sm text-red-500">{errors['leadPassenger-email']}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Phone className="w-4 h-4 inline mr-1" />
                              Telefon *
                            </label>
                            <input
                              type="tel"
                              value={leadPassenger.phone}
                              onChange={(e) => setLeadPassenger(prev => ({ ...prev, phone: e.target.value }))}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-lydian-primary ${
                                errors['leadPassenger-phone'] ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="+90 5XX XXX XX XX"
                            />
                            {errors['leadPassenger-phone'] && (
                              <p className="mt-1 text-sm text-red-500">{errors['leadPassenger-phone']}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Seat Selection */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Koltuk Seçimi</h2>
                      <button
                        onClick={handleNext}
                        className="text-sm text-lydian-primary hover:underline"
                      >
                        Atla (Otomatik Atama)
                      </button>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          <span>Müsait</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-lydian-primary rounded"></div>
                          <span>Seçildi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-400 rounded"></div>
                          <span>Dolu</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-200 border-2 border-green-500 rounded"></div>
                          <span>Ekstra Yer (+₺100)</span>
                        </div>
                      </div>
                    </div>

                    {/* Aircraft Seat Map */}
                    <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-xl p-6">
                      <div className="max-w-md mx-auto">
                        <div className="text-center mb-4 text-sm font-medium text-gray-700">
                          Uçak Önü ✈️
                        </div>

                        {SEAT_MAP.economy.map((row, rowIdx) => (
                          <div key={rowIdx} className="flex justify-center gap-2 mb-2">
                            {row.map((seat, seatIdx) => {
                              if (seat === 'AISLE') {
                                return <div key={seatIdx} className="w-8"></div>;
                              }
                              if (seat === 'EXIT') {
                                return (
                                  <div key={seatIdx} className="w-8 text-xs text-center text-green-600 font-semibold">
                                    EXIT
                                  </div>
                                );
                              }

                              const isTaken = takenSeats.includes(seat);
                              const isSelected = Object.values(selectedSeats).includes(seat);
                              const isExtraLegroom = seat.includes('4');

                              return (
                                <button
                                  key={seatIdx}
                                  onClick={() => {
                                    const nextPassenger = passengers.findIndex((_, idx) => !selectedSeats[idx]);
                                    if (nextPassenger !== -1) toggleSeat(nextPassenger, seat);
                                  }}
                                  disabled={isTaken}
                                  className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                                    isTaken
                                      ? 'bg-gray-400 text-white cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-lydian-primary text-white'
                                      : isExtraLegroom
                                      ? 'bg-green-200 border-2 border-green-500 hover:bg-green-300'
                                      : 'bg-gray-200 hover:bg-gray-300'
                                  }`}
                                >
                                  {seat}
                                </button>
                              );
                            })}
                          </div>
                        ))}

                        <div className="text-center mt-4 text-sm font-medium text-gray-700">
                          Uçak Arkası
                        </div>
                      </div>
                    </div>

                    {/* Selected Seats Summary */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Seçili Koltuklar</h3>
                      <div className="space-y-1">
                        {passengers.map((passenger, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              Yolcu {idx + 1} ({passenger.firstName || 'İsimsiz'})
                            </span>
                            <span className="font-semibold">
                              {selectedSeats[idx] || 'Seçilmedi'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Baggage */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Bagaj Seçenekleri</h2>

                    <div className="space-y-6">
                      {passengers.map((passenger, idx) => (
                        <div key={idx} className="border-2 border-gray-200 rounded-xl p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-4">
                            Yolcu {idx + 1} - {passenger.firstName || 'İsimsiz'} {passenger.lastName || ''}
                          </h3>

                          <div className="mb-4 p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 text-green-700">
                              <Check className="w-5 h-5" />
                              <span className="font-medium">8 kg Kabin Bagajı Dahil</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {BAGGAGE_OPTIONS.map((option) => (
                              <button
                                key={option.weight}
                                onClick={() => updatePassenger(idx, 'baggage', { checked: option.weight })}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                  passenger.baggage.checked === option.weight
                                    ? 'border-lydian-primary bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold text-gray-900">{option.label}</p>
                                    {option.weight > 0 && (
                                      <p className="text-sm text-gray-600 mt-1">{option.weight} kg bagaj hakkı</p>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    {option.price > 0 ? (
                                      <p className="text-lg font-bold text-lydian-primary">+₺{option.price}</p>
                                    ) : (
                                      <p className="text-sm font-semibold text-green-600">Dahil</p>
                                    )}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                      <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">Bagaj Limitleri</p>
                        <p>Her bir bagaj maksimum 23 kg ağırlığında olabilir. Spor ekipmanları için ayrı ücretlendirme uygulanır.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Extras */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ekstra Hizmetler</h2>

                    <div className="space-y-4">
                      {/* Travel Insurance */}
                      <button
                        onClick={() => setExtras(prev => ({ ...prev, insurance: !prev.insurance }))}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                          extras.insurance ? 'border-lydian-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Shield className="w-6 h-6 text-lydian-primary" />
                              <h3 className="font-bold text-lg">Seyahat Sigortası</h3>
                            </div>
                            <p className="text-sm text-gray-600">Uçuş iptali, bagaj kaybı ve tıbbi acil durumlar için kapsamlı koruma.</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-lydian-primary">₺75</p>
                            <p className="text-xs text-gray-500">kişi başı</p>
                          </div>
                        </div>
                      </button>

                      {/* Priority Boarding */}
                      <button
                        onClick={() => setExtras(prev => ({ ...prev, priorityBoarding: !prev.priorityBoarding }))}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                          extras.priorityBoarding ? 'border-lydian-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Users className="w-6 h-6 text-lydian-primary" />
                              <h3 className="font-bold text-lg">Öncelikli Boarding</h3>
                            </div>
                            <p className="text-sm text-gray-600">Uçağa ilk binen yolcular arasında olun.</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-lydian-primary">₺100</p>
                            <p className="text-xs text-gray-500">tüm yolcular</p>
                          </div>
                        </div>
                      </button>

                      {/* Lounge Access */}
                      <button
                        onClick={() => setExtras(prev => ({ ...prev, loungeAccess: !prev.loungeAccess }))}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                          extras.loungeAccess ? 'border-lydian-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Coffee className="w-6 h-6 text-lydian-primary" />
                              <h3 className="font-bold text-lg">Lounge Erişimi</h3>
                            </div>
                            <p className="text-sm text-gray-600">Premium lounge'da uçuşunuzu bekleyin. Ücretsiz yiyecek ve içecek dahil.</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-lydian-primary">₺250</p>
                            <p className="text-xs text-gray-500">tüm yolcular</p>
                          </div>
                        </div>
                      </button>

                      {/* Meals */}
                      <div className="border-2 border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-lg mb-4">Özel Yemek Seçenekleri</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {MEAL_OPTIONS.map((meal) => (
                            <button
                              key={meal.id}
                              onClick={() => {
                                setExtras(prev => ({
                                  ...prev,
                                  meals: prev.meals.includes(meal.id)
                                    ? prev.meals.filter(m => m !== meal.id)
                                    : [...prev.meals, meal.id]
                                }));
                              }}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                extras.meals.includes(meal.id)
                                  ? 'border-lydian-primary bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{meal.label}</span>
                                <span className="font-bold text-lydian-primary">₺{meal.price}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Review */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Rezervasyon Özeti</h2>

                    {/* Flight Summary */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                      <h3 className="font-bold text-lg mb-3">Uçuş Bilgileri</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Havayolu</p>
                          <p className="font-semibold">{flightData.airline} - {flightData.flightNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Güzergah</p>
                          <p className="font-semibold">{flightData.from.code} → {flightData.to.code}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tarih & Saat</p>
                          <p className="font-semibold">{flightData.departure.date} - {flightData.departure.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sınıf</p>
                          <p className="font-semibold capitalize">{flightData.fareClass}</p>
                        </div>
                      </div>
                    </div>

                    {/* Passengers Summary */}
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-3">Yolcular</h3>
                      <div className="space-y-3">
                        {passengers.map((passenger, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold">
                                  {passenger.title} {passenger.firstName} {passenger.lastName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {passenger.type === 'adult' ? 'Yetişkin' : passenger.type === 'child' ? 'Çocuk' : 'Bebek'}
                                  {selectedSeats[idx] && ` • Koltuk: ${selectedSeats[idx]}`}
                                  {passenger.baggage.checked > 0 && ` • Bagaj: ${passenger.baggage.checked}kg`}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-lg mb-3">İletişim Bilgileri</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">E-posta:</span> <span className="font-semibold">{leadPassenger.email}</span></p>
                        <p><span className="text-gray-600">Telefon:</span> <span className="font-semibold">{leadPassenger.phone}</span></p>
                      </div>
                    </div>

                    {/* Extras Summary */}
                    {(extras.insurance || extras.priorityBoarding || extras.loungeAccess || extras.meals.length > 0) && (
                      <div className="mb-6 p-4 bg-green-50 rounded-lg">
                        <h3 className="font-bold text-lg mb-3">Ek Hizmetler</h3>
                        <div className="space-y-2 text-sm">
                          {extras.insurance && <p>✓ Seyahat Sigortası</p>}
                          {extras.priorityBoarding && <p>✓ Öncelikli Boarding</p>}
                          {extras.loungeAccess && <p>✓ Lounge Erişimi</p>}
                          {extras.meals.length > 0 && <p>✓ Özel Yemek ({extras.meals.length} adet)</p>}
                        </div>
                      </div>
                    )}

                    {/* Terms */}
                    <div className="mb-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            setErrors(prev => ({ ...prev, terms: '' }));
                          }}
                          className="mt-1 w-5 h-5 text-lydian-primary rounded focus:ring-lydian-primary"
                        />
                        <span className="text-sm text-gray-700">
                          <Link href="/terms" className="text-lydian-primary hover:underline">Kullanım Şartlarını</Link> ve{' '}
                          <Link href="/privacy" className="text-lydian-primary hover:underline">Gizlilik Politikasını</Link>{' '}
                          okudum ve kabul ediyorum.
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <Shield className="w-5 h-5 text-green-600" />
                        <p>Rezervasyonunuz blockchain teknolojisi ile güvence altına alınacaktır.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-6 flex items-center justify-between">
                {currentStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-gray-400"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Geri
                  </motion.button>
                )}

                {currentStep < 6 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-xl font-semibold"
                  >
                    Devam Et
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="ml-auto flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold text-lg"
                  >
                    Ödemeye Geç
                    <CreditCard className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Price Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Fiyat Özeti</h3>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temel Ücret</span>
                    <span className="font-semibold">₺{prices.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vergiler</span>
                    <span className="font-semibold">₺{prices.taxes}</span>
                  </div>
                  {prices.seats > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Koltuk Seçimi</span>
                      <span className="font-semibold">₺{prices.seats}</span>
                    </div>
                  )}
                  {prices.baggage > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ek Bagaj</span>
                      <span className="font-semibold">₺{prices.baggage}</span>
                    </div>
                  )}
                  {prices.extras > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ekstra Hizmetler</span>
                      <span className="font-semibold">₺{prices.extras}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Toplam</span>
                    <span className="text-3xl font-bold text-lydian-primary">₺{prices.total}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Blockchain güvenli</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Anında onay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>7/24 müşteri desteği</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
