import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  Chrome,
  ArrowLeft
} from 'lucide-react';
import { NeoHero, FuturisticCard, FuturisticButton, FuturisticInput } from '../components/neo-glass';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const AppleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );

  const FacebookIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  return (
    <>
      <Head>
        <title>Giriş Yap | Holiday.AILYDIAN - AI Destekli Seyahat Platformu</title>
        <meta name="description" content="Holiday.AILYDIAN hesabınıza giriş yapın. Kişiselleştirilmiş seyahat deneyimleri ve AI destekli planlamaya erişin." />
        <meta name="keywords" content="giriş yap, oturum aç, travel lydian, seyahat hesap" />
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
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-lydian-bg/10 backdrop-blur-xl rounded-xl border border-white/20 text-white hover:bg-lydian-bg/20 transition-all duration-200"
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
                  <div className="w-12 h-12 bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Holiday.AILYDIAN</h1>
                    <p className="text-xs text-white/70">AI Destekli Seyahat Platformu</p>
                  </div>
                </div>
              </Link>

              <h2 className="text-3xl font-bold text-white mb-2">Tekrar Hoş Geldiniz!</h2>
              <p className="text-white/80">Kişiselleştirilmiş seyahat deneyiminize devam edin</p>
            </motion.div>

            {/* Main Form Card */}
            <FuturisticCard
              title=""
              price=""
              categoryColor="#667EEA"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8"
              >
                {/* Login Method Toggle */}
                <div className="flex rounded-2xl p-1 mb-6 border-2 bg-lydian-bg/5 backdrop-blur-xl border-white/20">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-medium ${
                      loginMethod === 'email'
                        ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-lg'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    E-posta
                  </button>
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-medium ${
                      loginMethod === 'phone'
                        ? 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white shadow-lg'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Telefon
                  </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email/Phone Field */}
                  <FuturisticInput
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    label={loginMethod === 'email' ? 'E-posta Adresi' : 'Telefon Numarası'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={loginMethod === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                    required
                    glowColor="#667EEA"
                  />

                  {/* Password Field */}
                  <div className="relative">
                    <FuturisticInput
                      type={showPassword ? 'text' : 'password'}
                      label="Şifre"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="w-5 h-5" />}
                      required
                      glowColor="#667EEA"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-white/30 bg-lydian-bg/10 text-[#667EEA] focus:ring-[#667EEA] focus:ring-offset-0"
                      />
                      <span className="ml-2 text-sm text-white/80">Beni Hatırla</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00BAFF] to-[#667EEA] hover:from-[#667EEA] hover:to-[#764BA2] transition-all"
                    >
                      Şifremi Unuttum
                    </Link>
                  </div>

                  {/* Login Button */}
                  <FuturisticButton
                    type="submit"
                    variant="ai"
                    fullWidth
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    Giriş Yap
                  </FuturisticButton>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-lydian-bg/20"></div>
                  <span className="text-white/60 text-sm">veya devam et</span>
                  <div className="flex-1 h-px bg-lydian-bg/20"></div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <FuturisticButton
                    variant="glass"
                    fullWidth
                    icon={<GoogleIcon />}
                    iconPosition="left"
                  >
                    Google ile devam et
                  </FuturisticButton>

                  <FuturisticButton
                    variant="glass"
                    fullWidth
                    icon={<AppleIcon />}
                    iconPosition="left"
                  >
                    Apple ile devam et
                  </FuturisticButton>

                  <FuturisticButton
                    variant="glass"
                    fullWidth
                    icon={<FacebookIcon />}
                    iconPosition="left"
                  >
                    Facebook ile devam et
                  </FuturisticButton>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-white/70">
                    Hesabınız yok mu?{' '}
                    <Link
                      href="/register"
                      className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00BAFF] to-[#667EEA] hover:from-[#667EEA] hover:to-[#764BA2] transition-all"
                    >
                      Ücretsiz Kayıt Ol
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

export default LoginPage;
