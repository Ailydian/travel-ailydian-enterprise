/**
 * Property Booking Form Component
 * Multi-step form for property rentals (Airbnb-style)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  CreditCard,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Home,
  MessageSquare,
  AlertTriangle,
  Shield,
  Baby,
  Info } from 'lucide-react';

interface PropertyData {
  id: string;
  title: string;
  type: string;
  city: string;
  basePrice: string;
  weeklyDiscount: string;
  monthlyDiscount: string;
  cleaningFee: string;
  securityDeposit: string;
  minimumStay: number;
  maximumStay: number;
  guests: number;
  instantBook: boolean;
}

interface BookingFormProps {
  property: PropertyData;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onSubmit: (data: PropertyBookingFormData) => void;
  onCancel?: () => void;
}

export interface PropertyBookingFormData {
  // Stay Details
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  infants: number;

  // Special Requests
  specialRequests: string;

  // Guest Information
  fullName: string;
  email: string;
  phone: string;
  address: string;

  // Payment Information (placeholders)
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;

  // Agreement
  termsAccepted: boolean;
  cancellationPolicyAccepted: boolean;
}

const PropertyBookingForm: React.FC<BookingFormProps> = ({
  property,
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
  onSubmit,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PropertyBookingFormData>({
    checkInDate: initialCheckIn,
    checkOutDate: initialCheckOut,
    adults: initialGuests,
    children: 0,
    infants: 0,
    specialRequests: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    termsAccepted: false,
    cancellationPolicyAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate nights
  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotal = () => {
    const nights = calculateNights();
    if (nights <= 0) return { subtotal: 0, cleaning: 0, service: 0, discount: 0, total: 0 };

    const basePrice = parseInt(property.basePrice);
    const subtotal = basePrice * nights;
    const cleaning = parseInt(property.cleaningFee);
    const service = Math.round(subtotal * 0.10); // 10% service fee

    let discount = 0;
    if (nights >= 30 && property.monthlyDiscount) {
      discount = Math.round(subtotal * (parseInt(property.monthlyDiscount) / 100));
    } else if (nights >= 7 && property.weeklyDiscount) {
      discount = Math.round(subtotal * (parseInt(property.weeklyDiscount) / 100));
    }

    const total = subtotal + cleaning + service - discount;

    return { subtotal, cleaning, service, discount, total };
  };

  // Update form field
  const updateField = (field: keyof PropertyBookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate step
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.checkInDate) newErrors.checkInDate = 'Giriş tarihi gereklidir';
      if (!formData.checkOutDate) newErrors.checkOutDate = 'Çıkış tarihi gereklidir';

      if (formData.checkInDate && formData.checkOutDate) {
        const nights = calculateNights();
        if (nights < property.minimumStay) {
          newErrors.checkOutDate = `Minimum konaklama ${property.minimumStay} gecedir`;
        }
        if (nights > property.maximumStay) {
          newErrors.checkOutDate = `Maksimum konaklama ${property.maximumStay} gecedir`;
        }
        if (nights < 1) {
          newErrors.checkOutDate = 'Çıkış tarihi giriş tarihinden sonra olmalıdır';
        }
      }

      const totalGuests = formData.adults + formData.children + formData.infants;
      if (totalGuests > property.guests) {
        newErrors.adults = `Maksimum ${property.guests} misafir kabul edilmektedir`;
      }
      if (formData.adults < 1) {
        newErrors.adults = 'En az 1 yetişkin gereklidir';
      }
    }

    if (currentStep === 2) {
      if (!formData.fullName) newErrors.fullName = 'Ad soyad gereklidir';
      if (!formData.email) newErrors.email = 'E-posta gereklidir';
      if (!formData.phone) newErrors.phone = 'Telefon gereklidir';
      if (!formData.address) newErrors.address = 'Adres gereklidir';

      // Email validation
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Geçerli bir e-posta adresi giriniz';
      }

      // Phone validation (basic)
      if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz';
      }
    }

    if (currentStep === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Kart numarası gereklidir';
      if (!formData.expiryDate) newErrors.expiryDate = 'Son kullanma tarihi gereklidir';
      if (!formData.cvv) newErrors.cvv = 'CVV gereklidir';
      if (!formData.billingAddress) newErrors.billingAddress = 'Fatura adresi gereklidir';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'Şartları kabul etmelisiniz';
      if (!formData.cancellationPolicyAccepted) {
        newErrors.cancellationPolicyAccepted = 'İptal politikasını kabul etmelisiniz';
      }

      // Card number validation (16 digits)
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = '16 haneli kart numarası giriniz';
      }

      // CVV validation (3-4 digits)
      if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Geçerli CVV giriniz';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next step
  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  // Previous step
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // Submit form
  const handleSubmit = () => {
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const nights = calculateNights();
  const pricing = calculateTotal();
  const totalGuests = formData.adults + formData.children + formData.infants;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) =>
          <div key={s} className="flex items-center flex-1">
              <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ?
              'bg-lydian-primary text-white' :
              'bg-lydian-bg-surface-raised text-lydian-text-muted'}`
              }>

                {step > s ? <Check className="w-6 h-6" /> : s}
              </div>
              {s < 3 &&
            <div
              className={`flex-1 h-1 mx-2 transition-all ${
              step > s ? 'bg-lydian-primary' : 'bg-lydian-bg-surface-raised'}`
              } />

            }
            </div>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <span className={step >= 1 ? 'text-lydian-primary font-semibold' : 'text-lydian-text-muted'}>
            Konaklama Detayları
          </span>
          <span className={step >= 2 ? 'text-lydian-primary font-semibold' : 'text-lydian-text-muted'}>
            Misafir Bilgileri
          </span>
          <span className={step >= 3 ? 'text-lydian-primary font-semibold' : 'text-lydian-text-muted'}>
            Ödeme & Onay
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 1: Stay Details */}
            {step === 1 &&
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-lydian-glass-dark rounded-2xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
                  <Home className="w-6 h-6 text-lydian-primary" />
                  Konaklama Detayları
                </h2>

                <div className="space-y-6">
                  {/* Check-in & Check-out Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Giriş Tarihi *
                      </label>
                      <input
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => updateField('checkInDate', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.checkInDate ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.checkInDate &&
                    <p className="text-lydian-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.checkInDate}
                        </p>
                    }
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Çıkış Tarihi *
                      </label>
                      <input
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => updateField('checkOutDate', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.checkOutDate ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.checkOutDate &&
                    <p className="text-lydian-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.checkOutDate}
                        </p>
                    }
                    </div>
                  </div>

                  {/* Guest Counters */}
                  <div className="border-t border-lydian-border-light/10 pt-6">
                    <h3 className="font-semibold text-lydian-text-inverse mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-lydian-primary" />
                      Misafir Sayısı
                    </h3>

                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                        <div>
                          <p className="font-medium text-lydian-text-inverse">Yetişkinler</p>
                          <p className="text-xs text-lydian-text-muted">13 yaş ve üzeri</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                          type="button"
                          onClick={() => updateField('adults', Math.max(1, formData.adults - 1))}
                          className="w-8 h-8 flex items-center justify-center border border-lydian-border-light rounded-full hover:border-lydian-border-heavy transition-colors">

                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{formData.adults}</span>
                          <button
                          type="button"
                          onClick={() => updateField('adults', Math.min(property.guests, formData.adults + 1))}
                          className="w-8 h-8 flex items-center justify-center border border-lydian-border-light rounded-full hover:border-lydian-border-heavy transition-colors">

                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                        <div>
                          <p className="font-medium text-lydian-text-inverse">Çocuklar</p>
                          <p className="text-xs text-lydian-text-muted">2-12 yaş</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                          type="button"
                          onClick={() => updateField('children', Math.max(0, formData.children - 1))}
                          className="w-8 h-8 flex items-center justify-center border border-lydian-border-light rounded-full hover:border-lydian-border-heavy transition-colors">

                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{formData.children}</span>
                          <button
                          type="button"
                          onClick={() =>
                          updateField('children', Math.min(property.guests - formData.adults, formData.children + 1))
                          }
                          className="w-8 h-8 flex items-center justify-center border border-lydian-border-light rounded-full hover:border-lydian-border-heavy transition-colors">

                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium text-lydian-text-inverse">Bebekler</p>
                            <p className="text-xs text-lydian-text-muted">2 yaş altı</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                          type="button"
                          onClick={() => updateField('infants', Math.max(0, formData.infants - 1))}
                          className="w-8 h-8 flex items-center justify-center border border-lydian-border-light rounded-full hover:border-lydian-border-heavy transition-colors">

                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{formData.infants}</span>
                          <button
                          type="button"
                          onClick={() => updateField('infants', formData.infants + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-lydian-border-light rounded-full hover:border-lydian-border-heavy transition-colors">

                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {errors.adults &&
                  <p className="text-lydian-error text-xs mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.adults}
                      </p>
                  }

                    <div className="mt-3 text-sm text-lydian-text-dim">
                      Toplam: <span className="font-semibold">{totalGuests} misafir</span>
                      {' • '}Maksimum: <span className="font-semibold">{property.guests} misafir</span>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="border-t border-lydian-border-light/10 pt-6">
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Özel İstekler (Opsiyonel)
                    </label>
                    <textarea
                    value={formData.specialRequests}
                    onChange={(e) => updateField('specialRequests', e.target.value)}
                    placeholder="Ev sahibine iletmek istediğiniz özel isteklerinizi yazabilirsiniz..."
                    rows={4}
                    className="w-full px-4 py-2 border border-lydian-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus" />

                  </div>

                  {/* Info Box */}
                  <div className="bg-lydian-primary-lighter border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Minimum Konaklama</p>
                        <p className="text-blue-800">
                          Bu özellik için minimum konaklama süresi <strong>{property.minimumStay} gece</strong>dir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            }

            {/* Step 2: Guest Information */}
            {step === 2 &&
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-lydian-glass-dark rounded-2xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-lydian-primary" />
                  Misafir Bilgileri
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Ad Soyad *
                    </label>
                    <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.fullName ? 'border-red-500' : 'border-white/20'}`
                    } />

                    {errors.fullName &&
                  <p className="text-lydian-error text-xs mt-1">{errors.fullName}</p>
                  }
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        E-posta *
                      </label>
                      <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="ornek@email.com"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.email ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.email &&
                    <p className="text-lydian-error text-xs mt-1">{errors.email}</p>
                    }
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Telefon *
                      </label>
                      <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+90 555 123 45 67"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.phone ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.phone &&
                    <p className="text-lydian-error text-xs mt-1">{errors.phone}</p>
                    }
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      <Home className="w-4 h-4 inline mr-1" />
                      Adres *
                    </label>
                    <textarea
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="Tam adresinizi giriniz"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.address ? 'border-red-500' : 'border-white/20'}`
                    } />

                    {errors.address &&
                  <p className="text-lydian-error text-xs mt-1">{errors.address}</p>
                  }
                  </div>

                  <div className="bg-lydian-success-lighter border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-lydian-success flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900">
                        <p className="font-semibold mb-1">Gizlilik Güvencesi</p>
                        <p className="text-green-800">
                          Bilgileriniz SSL ile şifrelenerek güvenli bir şekilde işlenir ve üçüncü şahıslarla paylaşılmaz.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            }

            {/* Step 3: Payment & Confirmation */}
            {step === 3 &&
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-lydian-glass-dark rounded-2xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-lydian-primary" />
                  Ödeme & Onay
                </h2>

                <div className="space-y-6">
                  <div className="bg-lydian-warning-lighter border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-lydian-warning flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-900">
                        <p className="font-semibold mb-1">Demo Ödeme Sistemi</p>
                        <p>Bu bir demo formdur. Gerçek ödeme işlemi yapılmayacaktır.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      <CreditCard className="w-4 h-4 inline mr-1" />
                      Kart Numarası *
                    </label>
                    <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => updateField('cardNumber', e.target.value.replace(/\s/g, ''))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.cardNumber ? 'border-red-500' : 'border-white/20'}`
                    } />

                    {errors.cardNumber &&
                  <p className="text-lydian-error text-xs mt-1">{errors.cardNumber}</p>
                  }
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        Son Kullanma Tarihi *
                      </label>
                      <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => updateField('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.expiryDate ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.expiryDate &&
                    <p className="text-lydian-error text-xs mt-1">{errors.expiryDate}</p>
                    }
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">CVV *</label>
                      <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => updateField('cvv', e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.cvv ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.cvv && <p className="text-lydian-error text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      Fatura Adresi *
                    </label>
                    <textarea
                    value={formData.billingAddress}
                    onChange={(e) => updateField('billingAddress', e.target.value)}
                    placeholder="Fatura adresinizi giriniz"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.billingAddress ? 'border-red-500' : 'border-white/20'}`
                    } />

                    {errors.billingAddress &&
                  <p className="text-lydian-error text-xs mt-1">{errors.billingAddress}</p>
                  }
                  </div>

                  {/* Security Deposit */}
                  {property.securityDeposit && parseInt(property.securityDeposit) > 0 &&
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-purple-900">
                          <p className="font-semibold mb-1">Güvenlik Depozitosu</p>
                          <p className="text-purple-800">
                            ₺{parseInt(property.securityDeposit).toLocaleString('tr-TR')} tutarında depozito rezervasyon sırasında bloke edilecek ve çıkış sonrası iade edilecektir.
                          </p>
                        </div>
                      </div>
                    </div>
                }

                  {/* Terms & Conditions */}
                  <div className="border-t border-lydian-border-light/10 pt-6 space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => updateField('termsAccepted', e.target.checked)}
                      className={`w-5 h-5 text-lydian-primary rounded focus:ring-lydian-border-focus mt-0.5 ${
                      errors.termsAccepted ? 'border-red-500' : ''}`
                      } />

                      <span className="text-sm text-lydian-text-muted">
                        <a href="#" className="text-lydian-primary hover:underline">
                          Kullanım şartlarını
                        </a>
                        {' '}ve{' '}
                        <a href="#" className="text-lydian-primary hover:underline">
                          gizlilik politikasını
                        </a>{' '}
                        okudum ve kabul ediyorum. *
                      </span>
                    </label>
                    {errors.termsAccepted &&
                  <p className="text-lydian-error text-xs ml-8">{errors.termsAccepted}</p>
                  }

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                      type="checkbox"
                      checked={formData.cancellationPolicyAccepted}
                      onChange={(e) => updateField('cancellationPolicyAccepted', e.target.checked)}
                      className={`w-5 h-5 text-lydian-primary rounded focus:ring-lydian-border-focus mt-0.5 ${
                      errors.cancellationPolicyAccepted ? 'border-red-500' : ''}`
                      } />

                      <span className="text-sm text-lydian-text-muted">
                        <a href="#" className="text-lydian-primary hover:underline">
                          İptal politikasını
                        </a>{' '}
                        okudum ve kabul ediyorum. *
                      </span>
                    </label>
                    {errors.cancellationPolicyAccepted &&
                  <p className="text-lydian-error text-xs ml-8">{errors.cancellationPolicyAccepted}</p>
                  }
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={step === 1 ? onCancel : handlePrevious}
              className="flex items-center gap-2 px-6 py-3 border border-lydian-border-light text-lydian-text-muted rounded-lg hover:bg-lydian-glass-dark transition-colors">

              <ChevronLeft className="w-5 h-5" />
              {step === 1 ? 'İptal' : 'Geri'}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg hover:shadow-lg transition-all">

              {step === 3 ? property.instantBook ? 'Rezervasyonu Onayla' : 'Talep Gönder' : 'İleri'}
              {step < 3 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-lydian-glass-dark rounded-2xl shadow-md p-6 sticky top-6">
            <h3 className="font-bold text-lydian-text-inverse mb-4">Rezervasyon Özeti</h3>

            {/* Property Info */}
            <div className="mb-4 pb-4 border-b border-lydian-border-light/10">
              <p className="font-semibold text-lydian-text-inverse">{property.title}</p>
              <p className="text-sm text-lydian-text-dim">
                {property.type === 'VILLA' ? 'Villa' : property.type === 'APARTMENT' ? 'Apartman' : 'Ev'} - {property.city}
              </p>
              {property.instantBook &&
              <div className="mt-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-lydian-success-light text-green-800 text-xs rounded-full">
                    <Check className="w-3 h-3" />
                    Anında Rezervasyon
                  </span>
                </div>
              }
            </div>

            {/* Dates */}
            {formData.checkInDate && formData.checkOutDate &&
            <div className="mb-4 pb-4 border-b border-lydian-border-light/10 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-lydian-text-muted" />
                  <span className="text-lydian-text-dim">Giriş:</span>
                  <span className="font-semibold">
                    {new Date(formData.checkInDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-lydian-text-muted" />
                  <span className="text-lydian-text-dim">Çıkış:</span>
                  <span className="font-semibold">
                    {new Date(formData.checkOutDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <p className="text-lydian-primary font-bold">{nights} Gece</p>
              </div>
            }

            {/* Guests */}
            {totalGuests > 0 &&
            <div className="mb-4 pb-4 border-b border-lydian-border-light/10 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-lydian-text-muted" />
                  <span className="text-lydian-text-dim">Misafirler:</span>
                  <span className="font-semibold">{totalGuests} kişi</span>
                </div>
              </div>
            }

            {/* Price Breakdown */}
            {nights > 0 &&
            <>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-lydian-text-dim">
                      ₺{parseInt(property.basePrice).toLocaleString('tr-TR')} × {nights} gece
                    </span>
                    <span className="font-semibold">₺{pricing.subtotal.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lydian-text-dim">Temizlik ücreti</span>
                    <span className="font-semibold">₺{pricing.cleaning.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lydian-text-dim">Hizmet bedeli</span>
                    <span className="font-semibold">₺{pricing.service.toLocaleString('tr-TR')}</span>
                  </div>
                  {pricing.discount > 0 &&
                <div className="flex justify-between text-lydian-success">
                      <span>{nights >= 30 ? 'Aylık' : 'Haftalık'} indirim</span>
                      <span className="font-semibold">-₺{pricing.discount.toLocaleString('tr-TR')}</span>
                    </div>
                }
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-lydian-border-light/10">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lydian-text-inverse">Toplam</span>
                    <span className="text-2xl font-bold text-lydian-primary">
                      ₺{pricing.total.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default PropertyBookingForm;