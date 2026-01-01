import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { NeoHero, FuturisticCard, FuturisticButton, FuturisticInput } from '../../components/neo-glass';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Ad ve soyad en az 2 karakter olmalıdır';
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (!formData.termsAccepted) {
      setError('Kullanım şartlarını kabul etmelisiniz');
      return false;
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kayıt başarısız oldu');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Hesap oluşturulurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Kayıt Başarılı - AILYDIAN Holiday</title>
        </Head>
        <NeoHero
          title=""
          gradient="cosmic"
          height="100vh"
          showFloatingElements={true}
          overlayOpacity={0.5}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-lydian-glass-light backdrop-blur-xl rounded-3xl border border-lydian-border-light/20 p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-lydian-success/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-lydian-success/30">
                <CheckCircle className="w-8 h-8 text-lydian-success" />
              </div>
              <h2 className="text-2xl font-bold text-lydian-text-inverse mb-2">Hesabınız Oluşturuldu!</h2>
              <p className="text-lydian-text-inverse/70 mb-6">
                Giriş sayfasına yönlendiriliyorsunuz...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lydian-text-inverse mx-auto"></div>
            </motion.div>
          </div>
        </NeoHero>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Kayıt Ol - AILYDIAN Holiday</title>
        <meta name="description" content="AILYDIAN Holiday'a üye olun ve seyahat deneyiminizi kişiselleştirin." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* NeoHero as full-height background */}
      <NeoHero
        title=""
        gradient="cosmic"
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
        <div className="absolute inset-0 flex items-center justify-center px-4 py-12 overflow-y-auto">
          <div className="max-w-md w-full my-12">
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

              <h2 className="text-3xl font-bold text-lydian-text-inverse mb-2">Hesap Oluştur</h2>
              <p className="text-lydian-text-inverse/80">Seyahat maceranıza bugün başlayın</p>
            </motion.div>

            {/* Main Form Card */}
            <FuturisticCard
              title=""
              price=""
              categoryColor="#DC2626"
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

                {/* Registration Form */}
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* Name Field */}
                  <FuturisticInput
                    type="text"
                    label="Ad ve Soyad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    icon={<User className="w-5 h-5" />}
                    error={errors.name}
                    required
                    glowColor="#DC2626"
                  />

                  {/* Email Field */}
                  <FuturisticInput
                    type="email"
                    label="Email Adresi"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.email}
                    required
                    glowColor="#DC2626"
                  />

                  {/* Password Field */}
                  <div className="relative">
                    <FuturisticInput
                      type={showPassword ? 'text' : 'password'}
                      label="Şifre"
                      placeholder="En az 8 karakter"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      icon={<Lock className="w-5 h-5" />}
                      error={errors.password}
                      required
                      glowColor="#DC2626"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-lydian-text-inverse/60 hover:text-lydian-text-inverse transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <FuturisticInput
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Şifre Tekrar"
                      placeholder="Şifrenizi tekrar girin"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      icon={<Lock className="w-5 h-5" />}
                      error={errors.confirmPassword}
                      required
                      glowColor="#DC2626"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-10 text-lydian-text-inverse/60 hover:text-lydian-text-inverse transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="mt-1 rounded border-lydian-border-light/30 bg-lydian-glass-light text-lydian-primary focus:ring-lydian-primary focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-lydian-text-inverse/70">
                      <Link href="/terms" className="text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary to-lydian-primary-dark hover:from-lydian-primary-hover hover:to-lydian-primary-darker">
                        Kullanım şartlarını
                      </Link>{' '}
                      ve{' '}
                      <Link href="/privacy" className="text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary to-lydian-primary-dark hover:from-lydian-primary-hover hover:to-lydian-primary-darker">
                        gizlilik politikasını
                      </Link>{' '}
                      kabul ediyorum
                    </label>
                  </div>

                  {/* Submit Button */}
                  <FuturisticButton
                    type="submit"
                    variant="ai"
                    fullWidth
                    loading={isLoading}
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {isLoading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
                  </FuturisticButton>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-lydian-text-inverse/70">
                    Zaten hesabınız var mı?{' '}
                    <Link
                      href="/auth/signin"
                      className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lydian-primary to-lydian-primary-dark hover:from-lydian-primary-hover hover:to-lydian-primary-darker transition-all"
                    >
                      Giriş yapın
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

export default SignUp;
