/**
 * Car Rental Booking Form Component
 * Multi-step form for car rental reservations
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  Shield,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Car,
  Navigation,
  Baby,
  AlertTriangle } from
'lucide-react';

interface CarRentalData {
  id: string;
  name: string;
  brand: string;
  model: string;
  pricePerDay: string;
  category: string;
  pickupLocations: string[];
  transmission: string;
  fuelType: string;
  seats: number;
}

interface BookingFormProps {
  car: CarRentalData;
  initialPickupDate?: string;
  initialReturnDate?: string;
  initialLocation?: string;
  onSubmit: (data: BookingFormData) => void;
  onCancel?: () => void;
}

export interface BookingFormData {
  // Rental Details
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;

  // Add-ons
  additionalDriver: boolean;
  insuranceUpgrade: boolean;
  gpsNavigation: boolean;
  childSeat: boolean;

  // Customer Information
  fullName: string;
  email: string;
  phone: string;
  driverLicenseNumber: string;
  licenseIssueDate: string;

  // Payment Information (placeholders)
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;

  // Agreement
  termsAccepted: boolean;
}

const CarRentalBookingForm: React.FC<BookingFormProps> = ({
  car,
  initialPickupDate = '',
  initialReturnDate = '',
  initialLocation = '',
  onSubmit,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    pickupDate: initialPickupDate,
    pickupTime: '09:00',
    returnDate: initialReturnDate,
    returnTime: '18:00',
    pickupLocation: initialLocation || car.pickupLocations[0] || '',
    returnLocation: initialLocation || car.pickupLocations[0] || '',
    additionalDriver: false,
    insuranceUpgrade: false,
    gpsNavigation: false,
    childSeat: false,
    fullName: '',
    email: '',
    phone: '',
    driverLicenseNumber: '',
    licenseIssueDate: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate rental days
  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const pickup = new Date(formData.pickupDate);
    const returnD = new Date(formData.returnDate);
    const diff = returnD.getTime() - pickup.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotal = () => {
    const days = calculateDays();
    if (days <= 0) return { base: 0, addons: 0, total: 0 };

    let base = parseInt(car.pricePerDay) * days;
    let addons = 0;

    if (formData.additionalDriver) addons += 100 * days;
    if (formData.insuranceUpgrade) addons += 100 * days;
    if (formData.gpsNavigation) addons += 50 * days;
    if (formData.childSeat) addons += 30 * days;

    return { base, addons, total: base + addons };
  };

  // Update form field
  const updateField = (field: keyof BookingFormData, value: any) => {
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
      if (!formData.pickupDate) newErrors.pickupDate = 'Alış tarihi gereklidir';
      if (!formData.returnDate) newErrors.returnDate = 'İade tarihi gereklidir';
      if (!formData.pickupTime) newErrors.pickupTime = 'Alış saati gereklidir';
      if (!formData.returnTime) newErrors.returnTime = 'İade saati gereklidir';
      if (!formData.pickupLocation) newErrors.pickupLocation = 'Alış lokasyonu gereklidir';
      if (!formData.returnLocation) newErrors.returnLocation = 'İade lokasyonu gereklidir';

      if (formData.pickupDate && formData.returnDate) {
        const days = calculateDays();
        if (days < 1) newErrors.returnDate = 'İade tarihi alış tarihinden sonra olmalıdır';
      }
    }

    if (currentStep === 2) {
      if (!formData.fullName) newErrors.fullName = 'Ad soyad gereklidir';
      if (!formData.email) newErrors.email = 'E-posta gereklidir';
      if (!formData.phone) newErrors.phone = 'Telefon gereklidir';
      if (!formData.driverLicenseNumber) newErrors.driverLicenseNumber = 'Ehliyet numarası gereklidir';
      if (!formData.licenseIssueDate) newErrors.licenseIssueDate = 'Ehliyet veriliş tarihi gereklidir';

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

  const days = calculateDays();
  const pricing = calculateTotal();

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
            Kiralama Detayları
          </span>
          <span className={step >= 2 ? 'text-lydian-primary font-semibold' : 'text-lydian-text-muted'}>
            Müşteri Bilgileri
          </span>
          <span className={step >= 3 ? 'text-lydian-primary font-semibold' : 'text-lydian-text-muted'}>
            Ödeme Bilgileri
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 1: Rental Details */}
            {step === 1 &&
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-lydian-glass-dark rounded-2xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
                  <Car className="w-6 h-6 text-lydian-primary" />
                  Kiralama Detayları
                </h2>

                <div className="space-y-6">
                  {/* Pickup Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Alış Tarihi *
                      </label>
                      <input
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => updateField('pickupDate', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.pickupDate ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.pickupDate &&
                    <p className="text-lydian-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.pickupDate}
                        </p>
                    }
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        Alış Saati *
                      </label>
                      <input
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => updateField('pickupTime', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.pickupTime ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.pickupTime &&
                    <p className="text-lydian-error text-xs mt-1">{errors.pickupTime}</p>
                    }
                    </div>
                  </div>

                  {/* Return Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        İade Tarihi *
                      </label>
                      <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => updateField('returnDate', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.returnDate ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.returnDate &&
                    <p className="text-lydian-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.returnDate}
                        </p>
                    }
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        İade Saati *
                      </label>
                      <input
                      type="time"
                      value={formData.returnTime}
                      onChange={(e) => updateField('returnTime', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.returnTime ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.returnTime &&
                    <p className="text-lydian-error text-xs mt-1">{errors.returnTime}</p>
                    }
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Alış Lokasyonu *
                    </label>
                    <select
                    value={formData.pickupLocation}
                    onChange={(e) => updateField('pickupLocation', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.pickupLocation ? 'border-red-500' : 'border-white/20'}`
                    }>

                      <option value="">Lokasyon seçiniz</option>
                      {car.pickupLocations.map((loc) =>
                    <option key={loc} value={loc}>
                          {loc}
                        </option>
                    )}
                    </select>
                    {errors.pickupLocation &&
                  <p className="text-lydian-error text-xs mt-1">{errors.pickupLocation}</p>
                  }
                  </div>

                  {/* Return Location */}
                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      İade Lokasyonu *
                    </label>
                    <select
                    value={formData.returnLocation}
                    onChange={(e) => updateField('returnLocation', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.returnLocation ? 'border-red-500' : 'border-white/20'}`
                    }>

                      <option value="">Lokasyon seçiniz</option>
                      {car.pickupLocations.map((loc) =>
                    <option key={loc} value={loc}>
                          {loc}
                        </option>
                    )}
                    </select>
                    {errors.returnLocation &&
                  <p className="text-lydian-error text-xs mt-1">{errors.returnLocation}</p>
                  }
                  </div>

                  {/* Add-ons */}
                  <div className="border-t border-lydian-border-light/10 pt-6">
                    <h3 className="font-semibold text-lydian-text-inverse mb-4">Ekstra Hizmetler</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg cursor-pointer hover:bg-lydian-glass-dark-medium">
                        <div className="flex items-center gap-3">
                          <input
                          type="checkbox"
                          checked={formData.additionalDriver}
                          onChange={(e) => updateField('additionalDriver', e.target.checked)}
                          className="w-5 h-5 text-lydian-primary rounded focus:ring-lydian-border-focus" />

                          <div>
                            <p className="font-medium text-lydian-text-inverse">Ek Sürücü</p>
                            <p className="text-xs text-lydian-text-muted">İkinci bir sürücü ekleyin</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-lydian-text-inverse">+₺100/gün</span>
                      </label>

                      <label className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg cursor-pointer hover:bg-lydian-glass-dark-medium">
                        <div className="flex items-center gap-3">
                          <input
                          type="checkbox"
                          checked={formData.insuranceUpgrade}
                          onChange={(e) => updateField('insuranceUpgrade', e.target.checked)}
                          className="w-5 h-5 text-lydian-primary rounded focus:ring-lydian-border-focus" />

                          <div>
                            <p className="font-medium text-lydian-text-inverse flex items-center gap-2">
                              <Shield className="w-4 h-4 text-lydian-primary" />
                              Tam Kasko Sigortası
                            </p>
                            <p className="text-xs text-lydian-text-muted">Muafiyetsiz tam koruma</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-lydian-text-inverse">+₺100/gün</span>
                      </label>

                      <label className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg cursor-pointer hover:bg-lydian-glass-dark-medium">
                        <div className="flex items-center gap-3">
                          <input
                          type="checkbox"
                          checked={formData.gpsNavigation}
                          onChange={(e) => updateField('gpsNavigation', e.target.checked)}
                          className="w-5 h-5 text-lydian-primary rounded focus:ring-lydian-border-focus" />

                          <div>
                            <p className="font-medium text-lydian-text-inverse flex items-center gap-2">
                              <Navigation className="w-4 h-4 text-lydian-primary" />
                              GPS Navigasyon
                            </p>
                            <p className="text-xs text-lydian-text-muted">Kolay yol bulma</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-lydian-text-inverse">+₺50/gün</span>
                      </label>

                      <label className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg cursor-pointer hover:bg-lydian-glass-dark-medium">
                        <div className="flex items-center gap-3">
                          <input
                          type="checkbox"
                          checked={formData.childSeat}
                          onChange={(e) => updateField('childSeat', e.target.checked)}
                          className="w-5 h-5 text-lydian-primary rounded focus:ring-lydian-border-focus" />

                          <div>
                            <p className="font-medium text-lydian-text-inverse flex items-center gap-2">
                              <Baby className="w-4 h-4 text-lydian-primary" />
                              Çocuk Koltuğu
                            </p>
                            <p className="text-xs text-lydian-text-muted">0-4 yaş arası çocuklar için</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-lydian-text-inverse">+₺30/gün</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            }

            {/* Step 2: Customer Information */}
            {step === 2 &&
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-lydian-glass-dark rounded-2xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-lydian-primary" />
                  Müşteri Bilgileri
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

                  <div className="border-t border-lydian-border-light/10 pt-6">
                    <h3 className="font-semibold text-lydian-text-inverse mb-4">Ehliyet Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                          Ehliyet Numarası *
                        </label>
                        <input
                        type="text"
                        value={formData.driverLicenseNumber}
                        onChange={(e) => updateField('driverLicenseNumber', e.target.value)}
                        placeholder="12345678901"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                        errors.driverLicenseNumber ? 'border-red-500' : 'border-white/20'}`
                        } />

                        {errors.driverLicenseNumber &&
                      <p className="text-lydian-error text-xs mt-1">{errors.driverLicenseNumber}</p>
                      }
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                          Ehliyet Veriliş Tarihi *
                        </label>
                        <input
                        type="date"
                        value={formData.licenseIssueDate}
                        onChange={(e) => updateField('licenseIssueDate', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                        errors.licenseIssueDate ? 'border-red-500' : 'border-white/20'}`
                        } />

                        {errors.licenseIssueDate &&
                      <p className="text-lydian-error text-xs mt-1">{errors.licenseIssueDate}</p>
                      }
                      </div>
                    </div>
                  </div>

                  <div className="bg-lydian-primary-lighter border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-lydian-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Gerekli Belgeler</p>
                        <ul className="list-disc list-inside space-y-1 text-blue-800">
                          <li>Geçerli kimlik veya pasaport</li>
                          <li>Geçerli sürücü belgesi (en az 1 yıl)</li>
                          <li>Kredi kartı (depozito için)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            }

            {/* Step 3: Payment Information */}
            {step === 3 &&
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-lydian-glass-dark rounded-2xl shadow-md p-6">

                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-lydian-primary" />
                  Ödeme Bilgileri
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
                      <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                        CVV *
                      </label>
                      <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => updateField('cvv', e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                      errors.cvv ? 'border-red-500' : 'border-white/20'}`
                      } />

                      {errors.cvv &&
                    <p className="text-lydian-error text-xs mt-1">{errors.cvv}</p>
                    }
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-muted mb-2">
                      Fatura Adresi *
                    </label>
                    <textarea
                    value={formData.billingAddress}
                    onChange={(e) => updateField('billingAddress', e.target.value)}
                    placeholder="Tam adresinizi giriniz"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus ${
                    errors.billingAddress ? 'border-red-500' : 'border-white/20'}`
                    } />

                    {errors.billingAddress &&
                  <p className="text-lydian-error text-xs mt-1">{errors.billingAddress}</p>
                  }
                  </div>

                  <div className="border-t border-lydian-border-light/10 pt-6">
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
                          Kiralama şartlarını
                        </a>
                        ,{' '}
                        <a href="#" className="text-lydian-primary hover:underline">
                          iptal politikasını
                        </a>{' '}
                        ve{' '}
                        <a href="#" className="text-lydian-primary hover:underline">
                          gizlilik politikasını
                        </a>{' '}
                        okudum ve kabul ediyorum. *
                      </span>
                    </label>
                    {errors.termsAccepted &&
                  <p className="text-lydian-error text-xs mt-1 ml-8">{errors.termsAccepted}</p>
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

              {step === 3 ? 'Rezervasyonu Tamamla' : 'İleri'}
              {step < 3 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-lydian-glass-dark rounded-2xl shadow-md p-6 sticky top-6">
            <h3 className="font-bold text-lydian-text-inverse mb-4">Rezervasyon Özeti</h3>

            {/* Car Info */}
            <div className="mb-4 pb-4 border-b border-lydian-border-light/10">
              <p className="font-semibold text-lydian-text-inverse">{car.name}</p>
              <p className="text-sm text-lydian-text-dim">
                {car.brand} {car.model}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-lydian-text-muted">
                <span className="px-2 py-1 bg-lydian-glass-dark-medium rounded">{car.transmission}</span>
                <span className="px-2 py-1 bg-lydian-glass-dark-medium rounded">{car.fuelType}</span>
                <span className="px-2 py-1 bg-lydian-glass-dark-medium rounded">{car.seats} koltuk</span>
              </div>
            </div>

            {/* Dates */}
            {formData.pickupDate && formData.returnDate &&
            <div className="mb-4 pb-4 border-b border-lydian-border-light/10 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-lydian-text-muted" />
                  <span className="text-lydian-text-dim">Alış:</span>
                  <span className="font-semibold">
                    {new Date(formData.pickupDate).toLocaleDateString('tr-TR')} {formData.pickupTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-lydian-text-muted" />
                  <span className="text-lydian-text-dim">İade:</span>
                  <span className="font-semibold">
                    {new Date(formData.returnDate).toLocaleDateString('tr-TR')} {formData.returnTime}
                  </span>
                </div>
                <p className="text-lydian-primary font-bold mt-2">{days} Gün</p>
              </div>
            }

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-lydian-text-dim">Günlük ücret × {days} gün</span>
                <span className="font-semibold">₺{pricing.base.toLocaleString('tr-TR')}</span>
              </div>
              {pricing.addons > 0 &&
              <div className="flex justify-between">
                  <span className="text-lydian-text-dim">Ekstra hizmetler</span>
                  <span className="font-semibold">₺{pricing.addons.toLocaleString('tr-TR')}</span>
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
          </div>
        </div>
      </div>
    </div>);

};

export default CarRentalBookingForm;