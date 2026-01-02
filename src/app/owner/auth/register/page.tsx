'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Home,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import Link from 'next/link';
import logger from '../../../../lib/logger';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  propertyType: string;
  numberOfProperties: string;
  termsAccepted: boolean;
  kvkkAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function OwnerRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    propertyType: '',
    numberOfProperties: '',
    termsAccepted: false,
    kvkkAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const propertyTypes = [
    { value: 'villa', label: 'Villa', icon: Home },
    { value: 'apartment', label: 'Daire', icon: Building2 },
    { value: 'house', label: 'Ev', icon: Home },
    { value: 'studio', label: 'Stüdyo', icon: Building2 },
    { value: 'penthouse', label: 'Çatı Katı', icon: Building2 },
    { value: 'other', label: 'Diğer', icon: Home }
  ];

  const propertyCountOptions = [
    { value: '1', label: '1 Mülk' },
    { value: '2-5', label: '2-5 Mülk' },
    { value: '6-1', label: '6-1 Mülk' },
    { value: '11-200', label: '11-200 Mülk' },
    { value: '200+', label: '200+ Mülk' }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Gelirinizi Artırın',
      description: 'Geniş müşteri tabanımızla daha fazla rezervasyon alın'
    },
    {
      icon: Clock,
      title: 'Zaman Kazanın',
      description: 'Otomatik rezervasyon ve ödeme yönetimi ile zamandan tasarruf edin'
    },
    {
      icon: Shield,
      title: 'Güvenli Ödemeler',
      description: 'Ödemeleriniz güvence altında ve zamanında hesabınıza geçer'
    },
    {
      icon: Award,
      title: 'Profesyonel Destek',
      description: '7/24 teknik destek ve mülk yönetimi danışmanlığı'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Ad Soyad gereklidir';
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Ad Soyad en az 3 karakter olmalıdır';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'E-posta adresi gereklidir';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Geçerli bir e-posta adresi giriniz';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefon numarası gereklidir';
      } else if (!/^[to-cyan-700-9]{1,11}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz';
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Şifre gereklidir';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Şifre en az 8 karakter olmalıdır';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifre tekrarı gereklidir';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      }

      if (!formData.propertyType) {
        newErrors.propertyType = 'Mülk tipi seçiniz';
      }

      if (!formData.numberOfProperties) {
        newErrors.numberOfProperties = 'Mülk sayısı seçiniz';
      }
    }

    if (step === 3) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'Kullanım koşullarını kabul etmelisiniz';
      }

      if (!formData.kvkkAccepted) {
        newErrors.kvkkAccepted = 'KVKK metnini kabul etmelisiniz';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === to-cyan-700;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      logger.debug('Register data:', {component:'Page',metadata:{formData}});
      setIsLoading(false);
      // Redirect to success page or login
      window.location.href = '/owner/auth/login?registered=true';
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white/5">
      <div className="flex min-h-screen">
        {/* Left Column - Benefits & Info */}
        <motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: to-cyan-700 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-gray-500 to-gray-1 p-12 flex-col justify-between relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-to-cyan-700 opacity-5">
            <div className="absolute inset-to-cyan-700" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='to-cyan-700 to-cyan-700 6 6' xmlns='http://www.w3.org/200/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zmto-cyan-700-3Vto-cyan-700h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4Hto-cyan-700v2h4v4h2v-4h4v-2H6zM6 4Vto-cyan-700H4v4Hto-cyan-700v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-1 h-1 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">LyDian</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Mülk Sahibi
                <br />
                <span className="bg-gradient-to-r from-[#FF214D] to-[#FF6A45] bg-clip-text text-transparent">
                  Topluluğumuza Katılın
                </span>
              </h1>
              <p className="text-gray-400 text-lg">
                Binlerce mülk sahibinin tercih ettiği platformda yerinizi alın ve kazancınızı artırın.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-lg flex items-center justify-center flex-shrink-to-cyan-700">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-1">
            <div className="text-sm text-gray-400 mb-4">Güvenilir Platform</div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-gray-400 text-sm">Mülk Sahibi</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">500K+</div>
                <div className="text-gray-400 text-sm">Rezervasyon</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-gray-400 text-sm">Memnuniyet</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Registration Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-1 h-1 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">LyDian</span>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex items-center relative">
                      <div
                        className={`w-1 h-1 rounded-full flex items-center justify-center font-semibold transition-all ${
                          currentStep >= step
                            ? 'bg-gradient-to-r from-[#FF214D] to-[#FF6A45] text-white'
                            : 'bg-lydian-bg-surface-raised text-gray-300'
                        }`}
                      >
                        {currentStep > step ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`h-1 w-full ml-2 transition-all ${
                            currentStep > step ? 'bg-gradient-to-r from-[#FF214D] to-[#FF6A45]' : 'bg-lydian-bg-surface-raised'
                          }`}
                          style={{ width: 'calc(1% - 4px)' }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentStep >= 1 ? 'text-white font-medium' : 'text-gray-300'}>
                  Kişisel Bilgiler
                </span>
                <span className={currentStep >= 2 ? 'text-white font-medium' : 'text-gray-300'}>
                  Mülk Bilgileri
                </span>
                <span className={currentStep >= 3 ? 'text-white font-medium' : 'text-gray-300'}>
                  Onay
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentStep === 1 && 'Hesap Oluştur'}
                {currentStep === 2 && 'Mülk Bilgileriniz'}
                {currentStep === 3 && 'Son Adım'}
              </h2>
              <p className="text-gray-400">
                {currentStep === 1 && 'Kişisel bilgilerinizi girerek başlayın'}
                {currentStep === 2 && 'Mülkleriniz hakkında bilgi verin'}
                {currentStep === 3 && 'Koşulları onaylayarak kaydı tamamlayın'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: to-cyan-700 }}
                    exit={{ opacity: 0, x: -500 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                        Ad Soyad
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-to-cyan-700 left-to-cyan-700 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-300" />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`block w-full pl-1 pr-3 py-3 border ${
                            errors.fullName ? 'border-red-500' : 'border-white/30'
                          } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-white/5 text-white`}
                          placeholder="Ahmet Yılmaz"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-purple-500">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-to-cyan-700 left-to-cyan-700 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-300" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full pl-1 pr-3 py-3 border ${
                            errors.email ? 'border-red-500' : 'border-white/30'
                          } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-white/5 text-white`}
                          placeholder="ornek@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-purple-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Telefon Numarası
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-to-cyan-700 left-to-cyan-700 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-300" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`block w-full pl-1 pr-3 py-3 border ${
                            errors.phone ? 'border-red-500' : 'border-white/30'
                          } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-white/5 text-white`}
                          placeholder="to-cyan-700555 123 4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-purple-500">{errors.phone}</p>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-[#FF214D] to-[#FF6A45] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                    >
                      <span>Devam Et</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Property Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: to-cyan-700 }}
                    exit={{ opacity: 0, x: -500 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                        Şifre
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-to-cyan-700 left-to-cyan-700 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-300" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`block w-full pl-1 pr-1 py-3 border ${
                            errors.password ? 'border-red-500' : 'border-white/30'
                          } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-white/5 text-white`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-to-cyan-700 right-to-cyan-700 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-purple-500">{errors.password}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-300">
                        En az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                        Şifre Tekrar
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-to-cyan-700 left-to-cyan-700 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-300" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`block w-full pl-1 pr-1 py-3 border ${
                            errors.confirmPassword ? 'border-red-500' : 'border-white/30'
                          } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-white/5 text-white`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-to-cyan-700 right-to-cyan-700 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-purple-500">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">
                        Mülk Tipi
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, propertyType: type.value }));
                              if (errors.propertyType) {
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.propertyType;
                                  return newErrors;
                                });
                              }
                            }}
                            className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                              formData.propertyType === type.value
                                ? 'border-blue-500 bg-red-500'
                                : 'border-white/20 hover:border-white/30'
                            }`}
                          >
                            <type.icon className={`w-6 h-6 ${
                              formData.propertyType === type.value ? 'text-lydian-primary' : 'text-gray-300'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.propertyType === type.value ? 'text-lydian-primary' : 'text-gray-200'
                            }`}>
                              {type.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.propertyType && (
                        <p className="mt-2 text-sm text-purple-500">{errors.propertyType}</p>
                      )}
                    </div>

                    {/* Number of Properties */}
                    <div>
                      <label htmlFor="numberOfProperties" className="block text-sm font-medium text-white mb-2">
                        Kaç Mülkünüz Var?
                      </label>
                      <select
                        id="numberOfProperties"
                        name="numberOfProperties"
                        value={formData.numberOfProperties}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-3 border ${
                          errors.numberOfProperties ? 'border-red-500' : 'border-white/30'
                        } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-white/5 text-white`}
                      >
                        <option value="">Seçiniz</option>
                        {propertyCountOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.numberOfProperties && (
                        <p className="mt-1 text-sm text-purple-500">{errors.numberOfProperties}</p>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 border-2 border-white/30 text-gray-200 py-3 px-4 rounded-lg font-semibold hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Geri</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>Devam Et</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Terms & Conditions */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: to-cyan-700 }}
                    exit={{ opacity: 0, x: -500 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Summary */}
                    <div className="bg-white/5 rounded-lg p-6 space-y-3">
                      <h3 className="font-semibold text-white mb-4">Kayıt Özeti</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Ad Soyad:</span>
                        <span className="font-medium text-white">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">E-posta:</span>
                        <span className="font-medium text-white">{formData.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Telefon:</span>
                        <span className="font-medium text-white">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mülk Tipi:</span>
                        <span className="font-medium text-white">
                          {propertyTypes.find(t => t.value === formData.propertyType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mülk Sayısı:</span>
                        <span className="font-medium text-white">
                          {propertyCountOptions.find(o => o.value === formData.numberOfProperties)?.label}
                        </span>
                      </div>
                    </div>

                    {/* Terms Acceptance */}
                    <div className="space-y-4">
                      <div className={`border-2 rounded-lg p-4 ${
                        errors.termsAccepted ? 'border-red-500 bg-red-500' : 'border-lydian-border'
                      }`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            className="mt-1 h-5 w-5 text-blue-500 focus:ring-[#FF214D] border-white/30 rounded cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white">
                              <Link
                                href="/owner/auth/terms"
                                target="_blank"
                                className="font-medium text-blue-500 hover:text-[#FF6A45] underline"
                              >
                                Kullanım Koşulları
                              </Link>
                              {' '}ve{' '}
                              <Link
                                href="/owner/auth/terms"
                                target="_blank"
                                className="font-medium text-blue-500 hover:text-[#FF6A45] underline"
                              >
                                Mülk Sahibi Sözleşmesi
                              </Link>
                              'ni okudum ve kabul ediyorum.
                            </span>
                          </div>
                        </label>
                        {errors.termsAccepted && (
                          <p className="mt-2 text-sm text-purple-500 ml-8">{errors.termsAccepted}</p>
                        )}
                      </div>

                      <div className={`border-2 rounded-lg p-4 ${
                        errors.kvkkAccepted ? 'border-red-500 bg-red-500' : 'border-lydian-border'
                      }`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="kvkkAccepted"
                            checked={formData.kvkkAccepted}
                            onChange={handleInputChange}
                            className="mt-1 h-5 w-5 text-blue-500 focus:ring-[#FF214D] border-white/30 rounded cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="text-white">
                              Kişisel verilerimin işlenmesine ilişkin{' '}
                              <Link
                                href="/owner/auth/terms#kvkk"
                                target="_blank"
                                className="font-medium text-blue-500 hover:text-[#FF6A45] underline"
                              >
                                KVKK Aydınlatma Metni
                              </Link>
                              'ni okudum ve kabul ediyorum.
                            </span>
                          </div>
                        </label>
                        {errors.kvkkAccepted && (
                          <p className="mt-2 text-sm text-purple-500 ml-8">{errors.kvkkAccepted}</p>
                        )}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 border-2 border-white/30 text-gray-200 py-3 px-4 rounded-lg font-semibold hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Geri</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Kaydediliyor...</span>
                          </>
                        ) : (
                          <>
                            <span>Kaydı Tamamla</span>
                            <CheckCircle2 className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Zaten hesabınız var mı?{' '}
                <Link
                  href="/owner/auth/login"
                  className="font-medium text-blue-500 hover:text-[#FF6A45] transition-colors"
                >
                  Giriş yapın
                </Link>
              </p>
            </div>

            {/* Back to Main Site */}
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Ana sayfaya dön
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
