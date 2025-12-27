import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Bus,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  TrendingUp,
  Clock,
  Award,
  FileText } from
'lucide-react';
import Link from 'next/link';
import logger from '../../../lib/logger';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  tourismLicense: string;
  termsAccepted: boolean;
  kvkkAccepted: boolean;
  transferAgreementAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function TransferOwnerRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    tourismLicense: '',
    termsAccepted: false,
    kvkkAccepted: false,
    transferAgreementAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const benefits = [
  {
    icon: TrendingUp,
    title: 'Gelirinizi Artırın',
    description: 'Geniş müşteri tabanımızla daha fazla transfer rezervasyonu alın'
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
    description: '7/24 teknik destek ve transfer yönetimi danışmanlığı'
  }];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
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
      } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
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

      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Firma adı gereklidir';
      } else if (formData.companyName.trim().length < 3) {
        newErrors.companyName = 'Firma adı en az 3 karakter olmalıdır';
      }

      if (!formData.tourismLicense.trim()) {
        newErrors.tourismLicense = 'D2 Turizm Belgesi numarası gereklidir';
      } else if (formData.tourismLicense.trim().length < 5) {
        newErrors.tourismLicense = 'Geçerli bir belge numarası giriniz';
      }
    }

    if (step === 3) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'Kullanım koşullarını kabul etmelisiniz';
      }

      if (!formData.kvkkAccepted) {
        newErrors.kvkkAccepted = 'KVKK metnini kabul etmelisiniz';
      }

      if (!formData.transferAgreementAccepted) {
        newErrors.transferAgreementAccepted = 'Transfer Hizmeti Sağlayıcı Sözleşmesini kabul etmelisiniz';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      logger.debug('Register data:', { component: 'Register', metadata: { formData } });
      setIsLoading(false);
      // Redirect to success page or login
      window.location.href = '/transfer-owner/auth/login?registered=true';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-lydian-glass-dark">
      <div className="flex min-h-screen">
        {/* Left Column - Benefits & Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-lydian-primary to-cyan-600 p-12 flex-col justify-between relative overflow-hidden">

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-lydian-glass-dark rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-lydian-primary" />
              </div>
              <span className="text-2xl font-bold text-lydian-text-inverse">LyDian Transfer</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-lydian-text-inverse mb-4">
                Transfer Hizmeti
                <br />
                <span className="text-cyan-200">
                  Topluluğumuza Katılın
                </span>
              </h1>
              <p className="text-blue-100 text-lg">
                Binlerce transfer hizmeti sağlayıcısının tercih ettiği platformda yerinizi alın ve kazancınızı artırın.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-4">

                  <div className="w-12 h-12 bg-lydian-glass-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-lydian-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lydian-text-inverse mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10">
            <div className="text-sm text-blue-100 mb-4">Güvenilir Platform</div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-lydian-text-inverse">1500+</div>
                <div className="text-blue-100 text-sm">Transfer Firması</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-lydian-text-inverse">25K+</div>
                <div className="text-blue-100 text-sm">Transfer</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-lydian-text-inverse">97%</div>
                <div className="text-blue-100 text-sm">Memnuniyet</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Registration Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-lydian-primary to-cyan-600 rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-lydian-text-inverse" />
              </div>
              <span className="text-2xl font-bold text-lydian-text-inverse">LyDian Transfer</span>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) =>
                <div key={step} className="flex items-center flex-1">
                    <div className="flex items-center relative">
                      <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step ?
                      'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' :
                      'bg-gray-200 text-gray-400'}`
                      }>

                        {currentStep > step ?
                      <CheckCircle2 className="w-5 h-5" /> :

                      step
                      }
                      </div>
                      {step < 3 &&
                    <div
                      className={`h-1 w-full ml-2 transition-all ${
                      currentStep > step ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-200'}`
                      }
                      style={{ width: 'calc(100% - 40px)' }} />

                    }
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentStep >= 1 ? 'text-white font-medium' : 'text-gray-400'}>
                  Kişisel Bilgiler
                </span>
                <span className={currentStep >= 2 ? 'text-white font-medium' : 'text-gray-400'}>
                  Firma Bilgileri
                </span>
                <span className={currentStep >= 3 ? 'text-white font-medium' : 'text-gray-400'}>
                  Onay
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-2">
                {currentStep === 1 && 'Hesap Oluştur'}
                {currentStep === 2 && 'Firma Bilgileriniz'}
                {currentStep === 3 && 'Son Adım'}
              </h2>
              <p className="text-lydian-text-dim">
                {currentStep === 1 && 'Kişisel bilgilerinizi girerek başlayın'}
                {currentStep === 2 && 'Transfer firmanız hakkında bilgi verin'}
                {currentStep === 3 && 'Koşulları onaylayarak kaydı tamamlayın'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 &&
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5">

                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        Ad Soyad
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="Ahmet Yılmaz" />

                      </div>
                      {errors.fullName &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.fullName}</p>
                    }
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="ornek@email.com" />

                      </div>
                      {errors.email &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.email}</p>
                    }
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        Telefon Numarası
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="0555 123 4567" />

                      </div>
                      {errors.phone &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.phone}</p>
                    }
                    </div>

                    {/* Next Button */}
                    <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-lydian-primary to-cyan-600 text-lydian-text-inverse py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 mt-6">

                      <span>Devam Et</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                }

                {/* Step 2: Company Information */}
                {currentStep === 2 &&
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5">

                    {/* Company Name */}
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        Firma Adı
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="Örnek Transfer Hizmetleri" />

                      </div>
                      {errors.companyName &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.companyName}</p>
                    }
                      <p className="mt-1 text-xs text-lydian-text-muted">
                        Transfer hizmeti veren firmanızın ticari unvanı
                      </p>
                    </div>

                    {/* Tourism License */}
                    <div>
                      <label htmlFor="tourismLicense" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        D2 Turizm Belgesi Numarası
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type="text"
                        id="tourismLicense"
                        name="tourismLicense"
                        value={formData.tourismLicense}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.tourismLicense ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="D2-IST-2024-1234" />

                      </div>
                      {errors.tourismLicense &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.tourismLicense}</p>
                    }
                      <p className="mt-1 text-xs text-lydian-text-muted">
                        Kültür ve Turizm Bakanlığı tarafından verilen D2 belgesi numaranız
                      </p>
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        Şifre
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-10 py-3 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="••••••••" />

                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center">

                          {showPassword ?
                        <EyeOff className="h-5 w-5 text-lydian-text-muted hover:text-lydian-text-dim" /> :

                        <Eye className="h-5 w-5 text-lydian-text-muted hover:text-lydian-text-dim" />
                        }
                        </button>
                      </div>
                      {errors.password &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.password}</p>
                    }
                      <p className="mt-1 text-xs text-lydian-text-muted">
                        En az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-lydian-text-inverse mb-2">
                        Şifre Tekrar
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-lydian-text-muted" />
                        </div>
                        <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-10 py-3 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all bg-lydian-glass-dark text-lydian-text-inverse`
                        }
                        placeholder="••••••••" />

                        <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center">

                          {showConfirmPassword ?
                        <EyeOff className="h-5 w-5 text-lydian-text-muted hover:text-lydian-text-dim" /> :

                        <Eye className="h-5 w-5 text-lydian-text-muted hover:text-lydian-text-dim" />
                        }
                        </button>
                      </div>
                      {errors.confirmPassword &&
                    <p className="mt-1 text-sm text-lydian-error">{errors.confirmPassword}</p>
                    }
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 border-2 border-lydian-border-medium text-lydian-text-muted py-3 px-4 rounded-lg font-semibold hover:bg-lydian-glass-dark transition-all duration-200 flex items-center justify-center gap-2">

                        <ArrowLeft className="w-5 h-5" />
                        <span>Geri</span>
                      </button>
                      <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-lydian-primary to-cyan-600 text-lydian-text-inverse py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">

                        <span>Devam Et</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                }

                {/* Step 3: Terms & Conditions */}
                {currentStep === 3 &&
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5">

                    {/* Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 space-y-3">
                      <h3 className="font-semibold text-lydian-text-inverse mb-4">Kayıt Özeti</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-lydian-text-dim">Ad Soyad:</span>
                        <span className="font-medium text-lydian-text-inverse">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-lydian-text-dim">E-posta:</span>
                        <span className="font-medium text-lydian-text-inverse">{formData.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-lydian-text-dim">Telefon:</span>
                        <span className="font-medium text-lydian-text-inverse">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-lydian-text-dim">Firma Adı:</span>
                        <span className="font-medium text-lydian-text-inverse">{formData.companyName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-lydian-text-dim">D2 Belgesi:</span>
                        <span className="font-medium text-lydian-text-inverse">{formData.tourismLicense}</span>
                      </div>
                    </div>

                    {/* D2 License Info Box */}
                    <div className="bg-lydian-primary-lighter border-2 border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-blue-900 mb-2">D2 Turizm Belgesi Gerekli</h3>
                      <p className="text-sm text-lydian-primary-dark mb-3">
                        Transfer hizmeti sağlayıcısı olmak için Kültür ve Turizm Bakanlığı tarafından verilen geçerli bir D2 Tourism License gereklidir.
                      </p>
                      <Link
                      href="https://www.ktb.gov.tr"
                      target="_blank"
                      className="text-sm font-medium text-lydian-primary hover:text-blue-800 underline inline-block">

                        Kültür ve Turizm Bakanlığı resmi kaynağını ziyaret edin →
                      </Link>
                    </div>

                    {/* Terms Acceptance */}
                    <div className="space-y-4">
                      <div className={`border-2 rounded-lg p-4 ${
                    errors.termsAccepted ? 'border-red-500 bg-red-50' : 'border-gray-200'}`
                    }>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 text-lydian-primary focus:ring-lydian-primary border-lydian-border-medium rounded cursor-pointer" />

                          <div className="flex-1">
                            <span className="text-lydian-text-inverse">
                              <Link
                              href="/transfer-owner/auth/terms"
                              target="_blank"
                              className="font-medium text-lydian-primary hover:text-cyan-600 underline">

                                Kullanım Koşulları
                              </Link>
                              {' '}ve{' '}
                              <Link
                              href="/transfer-owner/auth/terms"
                              target="_blank"
                              className="font-medium text-lydian-primary hover:text-cyan-600 underline">

                                Transfer Hizmeti Sağlayıcı Sözleşmesi
                              </Link>
                              'ni okudum ve kabul ediyorum.
                            </span>
                          </div>
                        </label>
                        {errors.termsAccepted &&
                      <p className="mt-2 text-sm text-lydian-error ml-8">{errors.termsAccepted}</p>
                      }
                      </div>

                      <div className={`border-2 rounded-lg p-4 ${
                    errors.kvkkAccepted ? 'border-red-500 bg-red-50' : 'border-gray-200'}`
                    }>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                          type="checkbox"
                          name="kvkkAccepted"
                          checked={formData.kvkkAccepted}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 text-lydian-primary focus:ring-lydian-primary border-lydian-border-medium rounded cursor-pointer" />

                          <div className="flex-1">
                            <span className="text-lydian-text-inverse">
                              Kişisel verilerimin işlenmesine ilişkin{' '}
                              <Link
                              href="/transfer-owner/auth/terms#kvkk"
                              target="_blank"
                              className="font-medium text-lydian-primary hover:text-cyan-600 underline">

                                KVKK Aydınlatma Metni
                              </Link>
                              'ni okudum ve kabul ediyorum.
                            </span>
                          </div>
                        </label>
                        {errors.kvkkAccepted &&
                      <p className="mt-2 text-sm text-lydian-error ml-8">{errors.kvkkAccepted}</p>
                      }
                      </div>

                      <div className={`border-2 rounded-lg p-4 ${
                    errors.transferAgreementAccepted ? 'border-red-500 bg-red-50' : 'border-gray-200'}`
                    }>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                          type="checkbox"
                          name="transferAgreementAccepted"
                          checked={formData.transferAgreementAccepted}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 text-lydian-primary focus:ring-lydian-primary border-lydian-border-medium rounded cursor-pointer" />

                          <div className="flex-1">
                            <span className="text-lydian-text-inverse">
                              <Link
                              href="/transfer-owner/auth/terms#transfer-agreement"
                              target="_blank"
                              className="font-medium text-lydian-primary hover:text-cyan-600 underline">

                                Transfer Hizmeti Sağlayıcı Sözleşmesi
                              </Link>
                              'ni okudum ve kabul ediyorum.
                            </span>
                          </div>
                        </label>
                        {errors.transferAgreementAccepted &&
                      <p className="mt-2 text-sm text-lydian-error ml-8">{errors.transferAgreementAccepted}</p>
                      }
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 border-2 border-lydian-border-medium text-lydian-text-muted py-3 px-4 rounded-lg font-semibold hover:bg-lydian-glass-dark transition-all duration-200 flex items-center justify-center gap-2">

                        <ArrowLeft className="w-5 h-5" />
                        <span>Geri</span>
                      </button>
                      <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-lydian-primary to-cyan-600 text-lydian-text-inverse py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">

                        {isLoading ?
                      <>
                            <div className="w-5 h-5 border-2 border-lydian-border-light border-t-transparent rounded-full animate-spin" />
                            <span>Kaydediliyor...</span>
                          </> :

                      <>
                            <span>Kaydı Tamamla</span>
                            <CheckCircle2 className="w-5 h-5" />
                          </>
                      }
                      </button>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-lydian-text-dim">
                Zaten hesabınız var mı?{' '}
                <Link
                  href="/transfer-owner/auth/login"
                  className="font-medium text-lydian-primary hover:text-cyan-600 transition-colors">

                  Giriş yapın
                </Link>
              </p>
            </div>

            {/* Back to Main Site */}
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-lydian-text-dim hover:text-lydian-text-inverse transition-colors">

                ← Ana sayfaya dön
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

}