import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Calendar,
  Users,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Globe,
  Gift,
  Home,
  ArrowLeft
} from 'lucide-react';

const schema = yup.object({
  name: yup
    .string()
    .required('Ad ve soyad gereklidir')
    .min(2, 'Ad en az 2 karakter olmalıdır'),
  email: yup
    .string()
    .required('Email adresi gereklidir')
    .email('Geçerli bir email adresi giriniz'),
  password: yup
    .string()
    .required('Şifre gereklidir')
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir'),
  confirmPassword: yup
    .string()
    .required('Şifre tekrarı gereklidir')
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor'),
  phone: yup
    .string()
    .matches(/^[0-9+\-\s()]+$/, 'Geçerli bir telefon numarası giriniz'),
  dateOfBirth: yup
    .string(),
  gender: yup
    .string(),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'Kullanım şartlarını kabul etmelisiniz'),
});

type FormData = yup.InferType<typeof schema>;

const SignUp: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          preferredLanguage: 'tr',
          preferredCurrency: 'TRY',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Kayıt olurken bir hata oluştu');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Zayıf';
    if (strength <= 50) return 'Orta';
    if (strength <= 75) return 'İyi';
    return 'Güçlü';
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-yellow-500';
    if (strength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kayıt Başarılı! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Hoş geldiniz! Hesabınız başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Gift className="w-5 h-5" />
              <span className="text-sm font-medium">100 Hoş Geldin Puanı Kazandınız!</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Kayıt Ol - Ailydian Travel</title>
        <meta name="description" content="Ailydian Travel'a ücretsiz kayıt olun ve AI destekli seyahat deneyiminin keyfini çıkarın." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        {/* Return to Home Button */}
        <Link 
          href="/" 
          className="fixed top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:text-ailydian-primary transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Ana Sayfaya Dön</span>
        </Link>
        
        <div className="max-w-lg w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Ailydian Travel</h1>
                  <p className="text-xs text-gray-500">AI-Powered Enterprise</p>
                </div>
              </div>
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Seyahate Başlayın!</h2>
            <p className="text-gray-600">Ücretsiz hesap oluşturun ve AI destekli seyahat deneyiminin keyfini çıkarın</p>
            
            {/* Welcome Bonus */}
            <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
              <Gift className="w-4 h-4" />
              <span className="font-medium">100 Hoş Geldin Puanı Hediye!</span>
            </div>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Adresi *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="ornek@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="+90 (555) 123 45 67"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Doğum Tarihi
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('dateOfBirth')}
                      type="date"
                      id="dateOfBirth"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Cinsiyet
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register('gender')}
                      id="gender"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors appearance-none bg-white"
                    >
                      <option value="">Seçiniz</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(getPasswordStrength(password))}`}
                          style={{ width: `${getPasswordStrength(password)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {getPasswordStrengthText(getPasswordStrength(password))}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre Tekrarı *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  {...register('termsAccepted')}
                  type="checkbox"
                  id="termsAccepted"
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">Kullanım Şartları</Link> ve{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Gizlilik Politikası</Link>&apos;nı okudum ve kabul ediyorum. *
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.termsAccepted.message}
                </p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Hesap oluşturuluyor...
                  </>
                ) : (
                  <>
                    Ücretsiz Hesap Oluştur
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Giriş yap
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid grid-cols-3 gap-4 text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-8 h-8 text-green-500" />
              <p className="text-xs text-gray-600">Blockchain Güvenlik</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <p className="text-xs text-gray-600">AI Destekli</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe className="w-8 h-8 text-blue-500" />
              <p className="text-xs text-gray-600">190+ Ülke</p>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500">
            © 2025 Ailydian Travel. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;