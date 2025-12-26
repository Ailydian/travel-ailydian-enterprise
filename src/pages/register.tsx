import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Mail, Lock, User, Phone, Calendar, Eye, EyeOff, Shield, Check } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    newsletter: true,
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad alanı zorunludur';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad alanı zorunludur';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon alanı zorunludur';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre alanı zorunludur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler uyuşmuyor';
    }

    if (!formData.terms) {
      newErrors.terms = 'Kullanım şartlarını kabul etmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate successful registration
      alert('Kayıt başarılı! E-posta adresinize doğrulama linki gönderildi.');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        gender: '',
        newsletter: true,
        terms: false
      });
    }
  };

  const benefits = [
    'Özel indirimlerden yararlanın',
    'Puan kazanın ve hediye çekleri kazanın',
    'Kişiselleştirilmiş seyahat önerileri alın',
    'Erken erişim fırsatlarından faydalanın',
    'VIP müşteri hizmetleri desteği',
    'Ücretsiz iptal ve değişiklik hakları'
  ];

  return (
    <>
      <Head>
        <title>Kayıt Ol - LyDian Travel</title>
        <meta name="description" content="LyDian Travel&apos;a üye olun ve özel avantajlardan yararlanın." />
      </Head>

      <div className="min-h-screen bg-white/5 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-transparent dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  LyDian Travel
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-blue-600 flex items-center"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                  Ana Sayfa&apos;ya Dön
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Registration Form */}
            <div className="bg-transparent dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white dark:text-white mb-2">
                  LyDian Travel&apos;a Katılın
                </h1>
                <p className="text-gray-300 dark:text-gray-400">
                  Ücretsiz hesap oluşturun ve avantajlardan yararlanın
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                      Ad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Adınız"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                      Soyad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Soyadınız"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                    E-posta *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                    Telefon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="+90 5XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                      Şifre *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                          errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                      Şifre Tekrar *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                      Doğum Tarihi
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
                      Cinsiyet
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="">Seçiniz</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      checked={formData.terms}
                      onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-200 dark:text-gray-300">
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        Kullanım Şartları
                      </Link>
                      {' '}ve{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        Gizlilik Politikası
                      </Link>
                      &apos;nı okudum ve kabul ediyorum *
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-sm">{errors.terms}</p>
                  )}

                  <div className="flex items-start">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="newsletter" className="ml-3 text-sm text-gray-200 dark:text-gray-300">
                      Özel kampanya ve fırsatlardan haberdar olmak istiyorum
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold transform hover:scale-105 active:scale-95"
                >
                  Hesap Oluştur
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-300 dark:text-gray-400">
                  Zaten hesabınız var mı?{' '}
                  <button
                    onClick={() => window.history.back()}
                    className="text-blue-600 hover:text-blue-500 font-semibold"
                  >
                    Giriş yapın
                  </button>
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-2">Üye Avantajları</h2>
                  <p className="text-blue-100">
                    LyDian Travel üyeliğiyle özel ayrıcalıklardan yararlanın
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-white/20 rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-blue-100">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-transparent dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-white dark:text-white mb-4">
                  🔒 Güvenliğiniz Önceliğimiz
                </h3>
                <p className="text-gray-300 dark:text-gray-400 mb-4">
                  Kişisel bilgileriniz SSL şifreleme ile korunur ve blockchain teknolojisi 
                  ile güvence altına alınır. KVKK uyumlu veri politikamız gereği 
                  verileriniz asla üçüncü taraflarla paylaşılmaz.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>✓ SSL Şifreleme</span>
                  <span>✓ KVKK Uyumlu</span>
                  <span>✓ Blockchain Güvenlik</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}