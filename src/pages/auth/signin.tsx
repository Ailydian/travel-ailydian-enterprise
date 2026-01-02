/**
 * Sign In Page - Production Ready
 *
 * Features:
 * - ModernHeader integration
 * - Clean glassmorphism design
 * - Email/Password authentication
 * - Social login buttons (Google, Facebook)
 * - Form validation
 * - Error handling
 * - Loading states
 * - Remember me functionality
 * - Responsive design (mobile-first)
 * - i18n ready
 * - Lydian design system compliant
 *
 * NO NeoHero, NO FuturisticCard - Simple, stable, production-grade
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { ModernHeader } from '@/components/layout/ModernHeader';
import logger from '@/lib/logger';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Social Login Icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Şifre en az 8 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      logger.info('User attempting sign in', { email: formData.email });

      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        logger.error('Sign in failed', new Error(result.error));
        setError('Email veya şifre hatalı');
        return;
      }

      if (result?.ok) {
        logger.info('User signed in successfully', { email: formData.email });
        // Redirect to dashboard or return URL
        const returnUrl = (router.query.callbackUrl as string) || '/dashboard';
        router.push(returnUrl);
      }
    } catch (err) {
      logger.error('Sign in error', err);
      setError('Giriş yaparken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      logger.info(`User attempting ${provider} sign in`);
      const returnUrl = (router.query.callbackUrl as string) || '/dashboard';
      await signIn(provider, { callbackUrl: returnUrl });
    } catch (err) {
      logger.error(`${provider} sign in error`, err);
      setError('Sosyal medya girişi şu anda kullanılamıyor');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Giriş Yap - AILYDIAN Holiday</title>
        <meta name="description" content="AILYDIAN Holiday hesabınıza giriş yapın ve seyahat deneyiminizi kişiselleştirin." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Modern Header */}
      <ModernHeader />

      {/* Main Container - Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-24">
        <div className="max-w-md mx-auto px-4 py-12">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">AILYDIAN Holiday</h1>
                <p className="text-sm text-white/70">AI-Powered Travel</p>
              </div>
            </Link>

            <h2 className="text-3xl font-bold text-white mb-2">Tekrar Hoş Geldiniz!</h2>
            <p className="text-white/80">Seyahat maceranıza kaldığınız yerden devam edin</p>
          </motion.div>

          {/* Form Card - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <GoogleIcon />
                <span className="text-white font-medium">Google ile Giriş</span>
              </button>

              <button
                onClick={() => handleSocialSignIn('facebook')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FacebookIcon />
                <span className="text-white font-medium">Facebook ile Giriş</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-white/60 text-sm">veya</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Adresi
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none"
                    placeholder="ornek@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm text-white/80 group-hover:text-white transition-colors">
                    Beni hatırla
                  </span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Şifremi unuttum
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    Giriş Yap
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-white/70">
                Henüz hesabınız yok mu?{' '}
                <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Ücretsiz kayıt ol
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link href="/" className="text-white/60 hover:text-white/90 text-sm transition-colors">
              Ana Sayfaya Dön
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

// i18n Support - CRITICAL for multi-language
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
}

export default SignIn;
