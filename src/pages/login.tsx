import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Globe,
  Zap,
  Shield,
  ArrowRight,
  User,
  Phone,
  Chrome,
  Smartphone
} from 'lucide-react';

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

  const socialLogins = [
    { name: 'Google', icon: Chrome, color: '#4285f4' },
    { name: 'Apple', icon: Smartphone, color: '#000000' },
    { name: 'Facebook', icon: User, color: '#1877f2' }
  ];

  return (
    <>
      <Head>
        <title>Giriş Yap | Travel.Ailydian - AI Destekli Seyahat Platformu</title>
        <meta name="description" content="Travel.Ailydian hesabınıza giriş yapın. Kişiselleştirilmiş seyahat deneyimleri ve AI destekli planlamaya erişin." />
        <meta name="keywords" content="giriş yap, oturum aç, travel ailydian, seyahat hesap" />
      </Head>

      <div className="min-h-screen flex" style={{backgroundColor: 'var(--bg-0)'}}>
        {/* Left Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Link href="/" className="inline-flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center neon-glow" 
                  style={{
                    background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                    boxShadow: '0 0 20px var(--ac-1)'
                  }}
                >
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold neon-text-strong" 
                    style={{
                      color: 'var(--tx-1)',
                      textShadow: '0 0 15px var(--ac-1)'
                    }}
                  >
                    Travel.Ailydian
                  </h1>
                  <p className="text-sm" style={{color: 'var(--tx-3)'}}>AI Destekli Seyahat Platformu</p>
                </div>
              </Link>
            </motion.div>

            {/* Welcome Message */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold neon-text-strong mb-2" style={{color: 'var(--tx-1)'}}>
                Tekrar Hoş Geldiniz!
              </h2>
              <p style={{color: 'var(--tx-2)'}}>
                Kişiselleştirilmiş seyahat deneyiminize devam edin
              </p>
            </motion.div>

            {/* Login Method Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex rounded-2xl p-1 mb-6 border-2"
              style={{
                backgroundColor: 'var(--bg-1)',
                borderColor: 'var(--ac-1)'
              }}
            >
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-medium ${
                  loginMethod === 'email' ? 'neon-glow' : ''
                }`}
                style={{
                  backgroundColor: loginMethod === 'email' ? 'var(--ac-1)' : 'transparent',
                  color: loginMethod === 'email' ? 'white' : 'var(--tx-1)',
                  boxShadow: loginMethod === 'email' ? '0 0 15px var(--ac-1)' : 'none'
                }}
              >
                <Mail className="w-4 h-4" />
                E-posta
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-medium ${
                  loginMethod === 'phone' ? 'neon-glow' : ''
                }`}
                style={{
                  backgroundColor: loginMethod === 'phone' ? 'var(--ac-1)' : 'transparent',
                  color: loginMethod === 'phone' ? 'white' : 'var(--tx-1)',
                  boxShadow: loginMethod === 'phone' ? '0 0 15px var(--ac-1)' : 'none'
                }}
              >
                <Phone className="w-4 h-4" />
                Telefon
              </button>
            </motion.div>

            {/* Login Form */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleLogin} 
              className="space-y-6"
            >
              {/* Email/Phone Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'var(--tx-2)'}}>
                  {loginMethod === 'email' ? 'E-posta Adresi' : 'Telefon Numarası'}
                </label>
                <div className="relative">
                  {loginMethod === 'email' ? (
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'var(--ac-2)'}} />
                  ) : (
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'var(--ac-2)'}} />
                  )}
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={loginMethod === 'email' ? 'ornek@email.com' : '+90 555 123 45 67'}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all text-lg"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      color: 'var(--tx-1)',
                      borderColor: 'var(--ac-2)',
                      boxShadow: '0 0 10px rgba(255, 106, 69, 0.2)'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'var(--tx-2)'}}>
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'var(--ac-2)'}} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all text-lg"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      color: 'var(--tx-1)',
                      borderColor: 'var(--ac-2)',
                      boxShadow: '0 0 10px rgba(255, 106, 69, 0.2)'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-opacity-80 rounded"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" style={{color: 'var(--tx-3)'}} />
                    ) : (
                      <Eye className="w-5 h-5" style={{color: 'var(--tx-3)'}} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2"
                    style={{accentColor: 'var(--ac-1)'}}
                  />
                  <span className="text-sm" style={{color: 'var(--tx-2)'}}>Beni Hatırla</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-medium transition-colors hover:underline"
                  style={{color: 'var(--ac-1)'}}
                >
                  Şifremi Unuttum
                </Link>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-lg transition-all neon-glow flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                  color: 'white',
                  boxShadow: '0 0 25px var(--ac-1)'
                }}
              >
                <span>Giriş Yap</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative my-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{borderColor: 'rgba(255, 33, 77, 0.3)'}}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4" style={{backgroundColor: 'var(--bg-0)', color: 'var(--tx-3)'}}>
                  veya devam et
                </span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {socialLogins.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 font-medium transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      borderColor: social.color,
                      color: 'var(--tx-1)',
                      boxShadow: `0 0 10px ${social.color}20`
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = `${social.color}15`;
                      (e.target as HTMLElement).style.borderColor = social.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'var(--bg-1)';
                      (e.target as HTMLElement).style.borderColor = social.color;
                    }}
                  >
                    <Icon className="w-5 h-5" style={{color: social.color}} />
                    {social.name} ile devam et
                  </button>
                );
              })}
            </motion.div>

            {/* Sign Up Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-8"
            >
              <p style={{color: 'var(--tx-2)'}}>
                Hesabınız yok mu?{' '}
                <Link 
                  href="/register" 
                  className="font-semibold transition-colors hover:underline"
                  style={{color: 'var(--ac-1)'}}
                >
                  Ücretsiz Kayıt Ol
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Features */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{background: 'linear-gradient(135deg, var(--bg-1), var(--bg-0))'}}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(var(--ac-1) 1px, transparent 1px), linear-gradient(90deg, var(--ac-1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>

          {/* Floating Orbs */}
          <motion.div 
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-32 h-32 rounded-full blur-xl opacity-60"
            style={{background: 'radial-gradient(circle, var(--ac-1), var(--ac-2))'}}
          />
          <motion.div 
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 left-20 w-24 h-24 rounded-full blur-xl opacity-40"
            style={{background: 'radial-gradient(circle, var(--ac-2), var(--ac-1))'}}
          />

          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-4xl font-bold neon-text-strong mb-8" 
                style={{
                  color: 'var(--tx-1)',
                  textShadow: '0 0 20px var(--ac-1)'
                }}
              >
                Seyahat Deneyiminizi
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Dönüştürün
                </span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: 'AI Destekli Planlama',
                    description: 'Yapay zeka ile kişiselleştirilmiş seyahat rotaları oluşturun'
                  },
                  {
                    icon: Shield,
                    title: 'Blockchain Güvenliği',
                    description: 'Tüm rezervasyonlarınız blockchain teknolojisi ile korunur'
                  },
                  {
                    icon: Globe,
                    title: 'VR Önizleme',
                    description: 'Destinasyonları rezervasyon öncesi sanal gerçeklikle keşfedin'
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 flex-shrink-0"
                        style={{
                          backgroundColor: 'rgba(255, 33, 77, 0.1)',
                          borderColor: 'var(--ac-1)'
                        }}
                      >
                        <Icon className="w-6 h-6" style={{color: 'var(--ac-1)'}} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg neon-text-strong mb-2" style={{color: 'var(--tx-1)'}}>
                          {feature.title}
                        </h3>
                        <p style={{color: 'var(--tx-2)'}}>{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;