import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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
  Globe
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

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

const Checkout: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCVV, setShowCVV] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  // Mock order data
  const orderSummary = {
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
    discount: 570, // AILYDIAN10 applied
    total: 6156
  };

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push('/booking-success');
      }, 2000);
    }, 3000);
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
          <title>Ödeme Başarılı - Ailydian Travel</title>
        </Head>
        <NavigationHeader />
        <main className="pt-8 min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-4"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ödeme Başarılı!</h1>
            <p className="text-gray-600 mb-8">Rezervasyonunuz onaylandı. E-posta ile detayları gönderdik.</p>
            <div className="animate-pulse text-ailydian-primary font-medium">
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
          <title>Ödeme İşleniyor - Ailydian Travel</title>
        </Head>
        <NavigationHeader />
        <main className="pt-8 min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-4"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Zap className="w-12 h-12 text-ailydian-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ödeme İşleniyor</h1>
            <p className="text-gray-600 mb-8">Lütfen bekleyin, ödemeniz güvenli şekilde işleniyor...</p>
            <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
              <Lock className="w-4 h-4" />
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
        <title>Güvenli Ödeme - Ailydian Travel | Blockchain Doğrulamalı</title>
        <meta name="description" content="Güvenli SSL ödeme sayfası. Blockchain teknologisi ile doğrulanmış rezervasyon sistemi." />
      </Head>

      <NavigationHeader />

      {/* Return to Cart Button */}
      <Link 
        href="/cart" 
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:text-ailydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Sepete Dön</span>
      </Link>

      <main className="pt-8 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Güvenli Ödeme</h1>
            <p className="text-gray-600">Blockchain teknologisi ile doğrulanmış güvenli ödeme</p>
          </motion.div>

          {/* Security Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-4 mb-8"
          >
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-medium">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">PCI DSS Uyumlu</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Blockchain Doğrulamalı</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-ailydian-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Kişisel Bilgiler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Ad *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Adınız"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Soyad *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Soyadınız"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+90 5XX XXX XX XX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
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
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-ailydian-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Kart Bilgileri</h2>
                  <div className="flex items-center gap-2 ml-auto">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CreditCard className="w-4 h-4 inline mr-1" />
                      Kart Numarası *
                    </label>
                    <input
                      type="text"
                      value={formatCardNumber(formData.cardNumber)}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
                      maxLength={19}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors font-mono text-lg ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Ay *
                      </label>
                      <select
                        value={formData.expiryMonth}
                        onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Yıl *
                      </label>
                      <select
                        value={formData.expiryYear}
                        onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 inline mr-1" />
                        CVV *
                      </label>
                      <div className="relative">
                        <input
                          type={showCVV ? 'text' : 'password'}
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          maxLength={3}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors font-mono text-center ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCVV(!showCVV)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Kart Üzerindeki İsim *
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="AHMET YILMAZ"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
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
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-ailydian-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Fatura Adresi</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Adres *
                    </label>
                    <input
                      type="text"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tam adresinizi girin"
                    />
                    {errors.billingAddress && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.billingAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      Şehir *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="İstanbul"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Posta Kodu *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value.replace(/\D/g, ''))}
                      maxLength={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="34000"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Ülke *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none transition-colors"
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
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-6">Sipariş Özeti</h3>
                
                <div className="space-y-4 mb-6">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.guests} kişi</p>
                      </div>
                      <span className="font-semibold">₺{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-semibold">₺{orderSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KDV (%18)</span>
                    <span className="font-semibold">₺{orderSummary.tax}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>İndirim (AILYDIAN10)</span>
                    <span className="font-semibold">-₺{orderSummary.discount}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Toplam</span>
                      <span className="text-2xl font-bold text-ailydian-primary">₺{orderSummary.total}</span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">256-bit SSL Güvenli</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">PCI DSS Uyumlu</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Blockchain Doğrulama</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white py-4 px-6 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Güvenli Ödeme Yap
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
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