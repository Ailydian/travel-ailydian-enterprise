'use client';

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FuturisticHeader } from '@/components/layout/FuturisticHeader';
import { FuturisticInput } from '@/components/neo-glass/FuturisticInput';
import { FuturisticButton } from '@/components/neo-glass/FuturisticButton';
import logger from '../lib/logger';
import {
  MapPin,
  Clock,
  Users,
  CreditCard,
  Phone,
  Mail,
  User,
  Calendar,
  FileText,
  Car,
  Shield,
  Package,
  Star
} from 'lucide-react';

// Dynamic import for Leaflet to avoid SSR issues
const MapWithNoSSR = dynamic(() => import('@/components/booking/MapSelector'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-lydian-bg/5 backdrop-blur-xl rounded-lg border border-white/10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BAFF]"></div>
    </div>
  ),
});

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface PassengerInfo {
  fullName: string;
  email: string;
  phone: string;
  passengerCount: number;
  dateOfBirth: string;
}

interface AgencyRequirements {
  passportNumber: string;
  passportExpiry: string;
  driversLicense?: string;
  licenseExpiry?: string;
  emergencyContact: string;
  emergencyPhone: string;
  specialRequests?: string;
}

interface BookingFormData {
  pickupLocation: Location | null;
  pickupTime: string;
  pickupDate: string;
  passengerInfo: PassengerInfo;
  agencyRequirements: AgencyRequirements;
}

export default function ReservationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: null,
    pickupTime: '',
    pickupDate: '',
    passengerInfo: {
      fullName: '',
      email: '',
      phone: '',
      passengerCount: 1,
      dateOfBirth: '',
    },
    agencyRequirements: {
      passportNumber: '',
      passportExpiry: '',
      driversLicense: '',
      licenseExpiry: '',
      emergencyContact: '',
      emergencyPhone: '',
      specialRequests: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load selected product from localStorage
  useEffect(() => {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      try {
        const product = JSON.parse(productData);
        setSelectedProduct(product);
      } catch (error) {
        logger.error('Error parsing product data:', error as Error, { component: 'Reservation' });
      }
    }
  }, []);

  const handleLocationSelect = useCallback((location: Location) => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: location,
    }));
    setErrors((prev) => ({ ...prev, pickupLocation: '' }));
  }, []);

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.pickupLocation) {
      newErrors.pickupLocation = 'Lütfen haritadan bir konum seçin';
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Lütfen tarih seçin';
    }
    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Lütfen saat seçin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.passengerInfo.fullName.trim()) {
      newErrors.fullName = 'Ad Soyad gerekli';
    }
    if (!formData.passengerInfo.email.trim()) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.passengerInfo.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    if (!formData.passengerInfo.phone.trim()) {
      newErrors.phone = 'Telefon numarası gerekli';
    }
    if (formData.passengerInfo.passengerCount < 1) {
      newErrors.passengerCount = 'En az 1 yolcu olmalı';
    }
    if (!formData.passengerInfo.dateOfBirth) {
      newErrors.dateOfBirth = 'Doğum tarihi gerekli';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.agencyRequirements.passportNumber.trim()) {
      newErrors.passportNumber = 'Pasaport numarası gerekli';
    }
    if (!formData.agencyRequirements.passportExpiry) {
      newErrors.passportExpiry = 'Pasaport son kullanma tarihi gerekli';
    }
    if (!formData.agencyRequirements.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Acil durum iletişim gerekli';
    }
    if (!formData.agencyRequirements.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Acil durum telefonu gerekli';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save booking data with selected product to localStorage
    const completeBookingData = {
      ...formData,
      selectedProduct: selectedProduct,
    };

    localStorage.setItem('bookingData', JSON.stringify(completeBookingData));

    // Redirect to checkout page
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-lydian-glass-dark">
      <FuturisticHeader />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-lydian-text-inverse mb-2">Rezervasyon Formu</h1>
            <p className="text-lydian-text-dim">Lütfen bilgilerinizi eksiksiz doldurun</p>
          </div>

          {/* Selected Product Card */}
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 bg-lydian-bg/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <Package className="w-6 h-6 text-[#667EEA]" />
                <h2 className="text-xl font-bold text-lydian-text-inverse">Seçtiğiniz Ürün</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {selectedProduct.image && (
                  <div className="md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-2">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-3">
                    {selectedProduct.location && (
                      <div className="flex items-center gap-1 text-lydian-text-dim">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{selectedProduct.location}</span>
                      </div>
                    )}

                    {selectedProduct.rating && (
                      <div className="flex items-center gap-1 text-[#FF9500]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{selectedProduct.rating}</span>
                        {selectedProduct.reviews && (
                          <span className="text-sm text-lydian-text-muted">
                            ({selectedProduct.reviews})
                          </span>
                        )}
                      </div>
                    )}

                    {selectedProduct.type && (
                      <div className="px-2 py-1 bg-[#667EEA]/20 text-[#667EEA] border border-[#667EEA]/30 rounded text-xs font-medium uppercase">
                        {selectedProduct.type === 'hotel' && 'Otel'}
                        {selectedProduct.type === 'experience' && 'Deneyim'}
                        {selectedProduct.type === 'car' && 'Araç Kiralama'}
                      </div>
                    )}
                  </div>

                  {selectedProduct.description && (
                    <p className="text-lydian-text-dim text-sm mb-3 line-clamp-2">
                      {selectedProduct.description}
                    </p>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                      {selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice &&
                      selectedProduct.originalPrice !== selectedProduct.price && (
                        <span className="text-lg text-lydian-text-muted line-through">
                          {selectedProduct.originalPrice}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep >= step
                          ? 'bg-gradient-to-r from-[#667EEA] to-[#00BAFF] text-white shadow-lg shadow-[#667EEA]/50'
                          : 'bg-lydian-bg/10 backdrop-blur-xl border border-white/20 text-lydian-text-muted'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-xs mt-2 text-lydian-text-dim">
                      {step === 1 && 'Konum & Tarih'}
                      {step === 2 && 'Yolcu Bilgileri'}
                      {step === 3 && 'Acenta Gereksinimleri'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-all ${
                        currentStep > step
                          ? 'bg-gradient-to-r from-[#667EEA] to-[#00BAFF]'
                          : 'bg-lydian-bg/10'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-lydian-bg/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8"
          >
            {/* Step 1: Location & Time */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse flex items-center gap-2">
                  <MapPin className="text-[#00BAFF]" />
                  Alınacak Konum ve Zaman
                </h2>

                {/* Map */}
                <div>
                  <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                    Haritadan Alınacak Konumu Seçin *
                  </label>
                  <MapWithNoSSR
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={formData.pickupLocation}
                  />
                  {errors.pickupLocation && (
                    <p className="text-red-400 text-sm mt-1">{errors.pickupLocation}</p>
                  )}
                  {formData.pickupLocation && (
                    <div className="mt-2 p-3 bg-[#00BAFF]/10 border border-[#00BAFF]/30 rounded-lg">
                      <p className="text-sm text-lydian-text-dim">
                        <strong>Seçilen Konum:</strong>{' '}
                        {formData.pickupLocation.address ||
                          `Lat: ${formData.pickupLocation.lat.toFixed(4)}, Lng: ${formData.pickupLocation.lng.toFixed(4)}`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Alınacak Tarih *
                    </label>
                    <input
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pickupDate: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50 [color-scheme:dark] ${
                        errors.pickupDate ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.pickupDate && (
                      <p className="text-red-400 text-sm mt-1">{errors.pickupDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Alınacak Saat *
                    </label>
                    <input
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pickupTime: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50 ${
                        errors.pickupTime ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.pickupTime && (
                      <p className="text-red-400 text-sm mt-1">{errors.pickupTime}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Passenger Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse flex items-center gap-2">
                  <User className="text-[#00BAFF]" />
                  Yolcu Bilgileri
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FuturisticInput
                      type="text"
                      label="Ad Soyad"
                      value={formData.passengerInfo.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          passengerInfo: {
                            ...prev.passengerInfo,
                            fullName: e.target.value,
                          },
                        }))
                      }
                      leftIcon={<User className="w-4 h-4" />}
                      error={errors.fullName}
                      requiredColor="#00BAFF"
                    />
                  </div>

                  <FuturisticInput
                    type="email"
                    label="E-posta"
                    value={formData.passengerInfo.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        passengerInfo: {
                          ...prev.passengerInfo,
                          email: e.target.value,
                        },
                      }))
                    }
                    leftIcon={<Mail className="w-4 h-4" />}
                    error={errors.email}
                    requiredColor="#00BAFF"
                  />

                  <FuturisticInput
                    type="tel"
                    label="Telefon"
                    value={formData.passengerInfo.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        passengerInfo: {
                          ...prev.passengerInfo,
                          phone: e.target.value,
                        },
                      }))
                    }
                    leftIcon={<Phone className="w-4 h-4" />}
                    error={errors.phone}
                    requiredColor="#00BAFF"
                  />

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      <Users className="inline w-4 h-4 mr-1" />
                      Yolcu Sayısı *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.passengerInfo.passengerCount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          passengerInfo: {
                            ...prev.passengerInfo,
                            passengerCount: parseInt(e.target.value) || 1,
                          },
                        }))
                      }
                      className={`w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50 ${
                        errors.passengerCount ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.passengerCount && (
                      <p className="text-red-400 text-sm mt-1">{errors.passengerCount}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Doğum Tarihi *
                    </label>
                    <input
                      type="date"
                      value={formData.passengerInfo.dateOfBirth}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          passengerInfo: {
                            ...prev.passengerInfo,
                            dateOfBirth: e.target.value,
                          },
                        }))
                      }
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50 [color-scheme:dark] ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Agency Requirements */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse flex items-center gap-2">
                  <Shield className="text-[#00BAFF]" />
                  Acenta Gereksinimleri
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FuturisticInput
                    type="text"
                    label="Pasaport Numarası"
                    value={formData.agencyRequirements.passportNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agencyRequirements: {
                          ...prev.agencyRequirements,
                          passportNumber: e.target.value,
                        },
                      }))
                    }
                    leftIcon={<FileText className="w-4 h-4" />}
                    error={errors.passportNumber}
                    requiredColor="#667EEA"
                  />

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      Pasaport Son Kullanma *
                    </label>
                    <input
                      type="date"
                      value={formData.agencyRequirements.passportExpiry}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          agencyRequirements: {
                            ...prev.agencyRequirements,
                            passportExpiry: e.target.value,
                          },
                        }))
                      }
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 rounded-2xl text-lydian-text-inverse outline-none transition-all focus:ring-2 focus:ring-[#667EEA] focus:border-[#667EEA]/50 [color-scheme:dark] ${
                        errors.passportExpiry ? 'border-red-500' : 'border-white/30'
                      }`}
                    />
                    {errors.passportExpiry && (
                      <p className="text-red-400 text-sm mt-1">{errors.passportExpiry}</p>
                    )}
                  </div>

                  <FuturisticInput
                    type="text"
                    label="Sürücü Belgesi (Opsiyonel)"
                    value={formData.agencyRequirements.driversLicense || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agencyRequirements: {
                          ...prev.agencyRequirements,
                          driversLicense: e.target.value,
                        },
                      }))
                    }
                    leftIcon={<Car className="w-4 h-4" />}Color="#00BAFF"
                  />

                  <div>
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      Belge Son Kullanma (Opsiyonel)
                    </label>
                    <input
                      type="date"
                      value={formData.agencyRequirements.licenseExpiry || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          agencyRequirements: {
                            ...prev.agencyRequirements,
                            licenseExpiry: e.target.value,
                          },
                        }))
                      }
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-lydian-text-inverse outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50 [color-scheme:dark]"
                    />
                  </div>

                  <FuturisticInput
                    type="text"
                    label="Acil Durum İletişim"
                    value={formData.agencyRequirements.emergencyContact}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agencyRequirements: {
                          ...prev.agencyRequirements,
                          emergencyContact: e.target.value,
                        },
                      }))
                    }
                    leftIcon={<User className="w-4 h-4" />}
                    error={errors.emergencyContact}
                    requiredColor="#667EEA"
                  />

                  <FuturisticInput
                    type="tel"
                    label="Acil Durum Telefonu"
                    value={formData.agencyRequirements.emergencyPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agencyRequirements: {
                          ...prev.agencyRequirements,
                          emergencyPhone: e.target.value,
                        },
                      }))
                    }
                    leftIcon={<Phone className="w-4 h-4" />}
                    error={errors.emergencyPhone}
                    requiredColor="#667EEA"
                  />

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-lydian-text-dim mb-2">
                      Özel İstekler (Opsiyonel)
                    </label>
                    <textarea
                      value={formData.agencyRequirements.specialRequests || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          agencyRequirements: {
                            ...prev.agencyRequirements,
                            specialRequests: e.target.value,
                          },
                        }))
                      }
                      rows={4}
                      placeholder="Özel isteklerinizi buraya yazın..."
                      className="w-full px-4 py-3 bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-lydian-text-inverse placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <FuturisticButton variant="secondary"
                size="md"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Geri
              </FuturisticButton>

              <FuturisticButton variant="ai"
                size="md"
                onClick={handleNext}
                leftIcon={currentStep === 3 ? <CreditCard className="w-5 h-5" /> : undefined}
                iconPosition="right"
              >
                {currentStep === 3 ? 'Ödemeye Geç' : 'Devam Et'}
              </FuturisticButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
