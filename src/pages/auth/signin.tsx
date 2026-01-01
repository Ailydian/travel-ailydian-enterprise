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
  ArrowLeft,
  Chrome,
  Facebook
} from 'lucide-react';
import { NeoHero, FuturisticCard, FuturisticButton, FuturisticInput } from '../../components/neo-glass';
import logger from '../../lib/logger';

// Custom icons for social providers
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
}

const SignIn: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
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
        password: formData.password
      });

      if (result?.error) {
        logger.error('Sign in failed', new Error(result.error));
        setError(result.error);
        return;
      }

      if (result?.ok) {
        logger.info('User signed in successfully', { email: formData.email });
        router.push('/dashboard');
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
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (err) {
      logger.error(`${provider} sign in error`, err);
      setError('Sosyal medya girişi başarısız oldu');
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

      {/* NeoHero as full-height background */}
      <NeoHero
        title=""
        gradient="ocean"
        height="100vh"
        showFloatingElements={true}
        overlayOpacity={0.5}
      >
        {/* Return to Home Button */}
        <Link
          href="/"
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-lydian-glass-light backdrop-blur-xl rounded-xl border border-lydian-border-light/20 text-lydian-text-inverse hover:bg-lydian-glass-medium transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Ana Sayfaya Dön</span>
        </Link>

        {/* Centered Form Container */}
        <div className="absolute inset-0 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-lydian-primary to-lydian-primary-dark rounded-xl flex items-center justify-center">
                    <span className="text-lydian-text-inverse font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-lydian-text-inverse">AILYDIAN Holiday</h1>
                    <p className="text-xs text-lydian-text-inverse/70">AI-Powered Enterprise</p>
                  </div>
                </div>
              </Link>

              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-2">Tekrar Hoş Geldiniz!</h2>
              <p className="text-lydian-text-inverse/80">Seyahat maceranıza kaldığınız yerden devam edin</p>
            </motion.div>

            {/* Main Form Card */}
            <FuturisticCard
              title=""
              price=""
              categoryColor="var(--lydian-primary)"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8"
              >
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-lydian-error/20 backdrop-blur-xl border border-lydian-error/30 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-lydian-error" />
                    <p className="text-lydian-error-lighter text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Social Sign In */}
                <div className="space-y-3 mb-6">
                  <FuturisticButton variant="glass"
                    fullWidth
                    onClick={() => handleSocialSignIn('google')}
                    disabled={isLoading}
                    leftIcon={<GoogleIcon />}
                    >
                    Google ile Giriş Yap
                  </FuturisticButton>

                  <FuturisticButton variant="glass"
                    fullWidth
                    onClick={() => handleSocialSignIn('facebook')}
                    disabled={isLoading}
                    leftIcon={<FacebookIcon />}
                    >
                    Facebook ile Giriş Yap
                  </FuturisticButton>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-lydian-border-light/20"></div>
                  <span className="text-lydian-text-inverse/60 text-sm">veya</span>
                  <div className="flex-1 h-px bg-lydian-border-light/20"></div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Email Field */}
                  <FuturisticInput
                    type="email"
                    label="Email Adresi"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    leftIcon={<Mail className="w-5 h-5" />}
                    error={errors.email}
                    requiredColor="var(--lydian-primary)"
                  />

                  {/* Password Field */}
                  <div className="relative">
                    <FuturisticInput
                      type={showPassword ? 'text' : 'password'}
                      label="Şifre"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      leftIcon={<Lock className="w-5 h-5" />}
                      error={errors.password}
                      requiredColor="var(--lydian-primary)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-lydian-text-inverse/60 hover:text-lydian-text-inverse transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Remember & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-lydian-border-light/30 bg-lydian-glass-light text-lydian-primary focus:ring-lydian-primary focus:ring-offset-0"
                      />
                      <span className="ml-2 text-sm text-lydian-text-inverse/80">Beni hatırla</span>
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary to-lydian-primary-dark hover:from-lydian-primary-hover hover:to-lydian-primary-darker transition-all"
                    >
                      Şifremi unuttum
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <FuturisticButton type="submit"
                    variant="ai"
                    fullWidth
                    loading={isLoading}
                    leftIcon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </FuturisticButton>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-lydian-text-inverse/70">
                    Henüz hesabınız yok mu?{' '}
                    <Link
                      href="/auth/signup"
                      className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary to-lydian-primary-dark hover:from-lydian-primary-hover hover:to-lydian-primary-darker transition-all"
                    >
                      Ücretsiz kayıt ol
                    </Link>
                  </p>
                </div>
              </motion.div>
            </FuturisticCard>
          </div>
        </div>
      </NeoHero>
    </>
  );
};

export default SignIn;
