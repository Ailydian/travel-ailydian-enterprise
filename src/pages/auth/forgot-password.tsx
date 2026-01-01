import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeoHero, FuturisticCard, FuturisticButton, FuturisticInput } from '../../components/neo-glass';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Lütfen e-posta adresinizi girin');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi girin');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Şifremi Unuttum | AILYDIAN Holiday - Güvenli Şifre Sıfırlama</title>
        <meta name="description" content="AILYDIAN Holiday hesabınızın şifresini güvenli bir şekilde sıfırlayın. E-posta adresinize gönderilen link ile yeni şifre oluşturun." />
        <meta name="keywords" content="şifremi unuttum, şifre sıfırlama, lydian travel, hesap kurtarma, güvenli giriş" />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content="Şifremi Unuttum | AILYDIAN Holiday" />
        <meta property="og:description" content="Hesabınızın şifresini güvenli bir şekilde sıfırlayın." />
        <meta property="og:type" content="website" />
      </Head>

      {/* NeoHero as full-height background */}
      <NeoHero
        title=""
        gradient="ocean"
        height="100vh"
        showFloatingElements={true}
        overlayOpacity={0.5}
      >
        {/* Return to Login */}
        <Link
          href="/auth/signin"
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-lydian-bg/10 backdrop-blur-xl rounded-xl border border-white/20 text-white hover:bg-lydian-bg/20 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Giriş Sayfasına Dön</span>
        </Link>

        {/* Centered Form Container */}
        <div className="absolute inset-0 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {!isSubmitted ? (
              <FuturisticCard
                title=""
                price=""
                categoryColor="#667EEA"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      Şifremi Unuttum
                    </h1>
                    <p className="text-white/70">
                      E-posta adresinize şifre sıfırlama linki göndereceğiz
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-4 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-xl text-red-200"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </motion.div>
                    )}

                    {/* Email Input */}
                    <FuturisticInput
                      type="email"
                      label="E-posta Adresi"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-5 h-5" />}
                      required
                      glowColor="#667EEA"
                    />

                    {/* Submit Button */}
                    <FuturisticButton
                      type="submit"
                      variant="ai"
                      fullWidth
                      loading={isLoading}
                    >
                      {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Linki Gönder'}
                    </FuturisticButton>
                  </form>

                  {/* Footer */}
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-white/70">
                      Şifrenizi hatırladınız mı?{' '}
                      <Link href="/auth/signin" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00BAFF] to-[#667EEA] hover:from-[#667EEA] hover:to-[#764BA2]">
                        Giriş Yap
                      </Link>
                    </p>
                    <p className="text-sm text-white/70">
                      Hesabınız yok mu?{' '}
                      <Link href="/auth/signup" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00BAFF] to-[#667EEA] hover:from-[#667EEA] hover:to-[#764BA2]">
                        Kayıt Ol
                      </Link>
                    </p>
                  </div>
                </div>
              </FuturisticCard>
            ) : (
              <FuturisticCard
                title=""
                price=""
                categoryColor="#10B981"
              >
                <div className="p-8 text-center">
                  {/* Success State */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30"
                  >
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    E-posta Gönderildi!
                  </h2>
                  <p className="text-white/70 mb-6">
                    <strong className="text-white">{email}</strong> adresine şifre sıfırlama linki gönderdik.
                    Lütfen e-postanızı kontrol edin ve linke tıklayarak yeni şifrenizi oluşturun.
                  </p>
                  <div className="bg-[#00BAFF]/10 backdrop-blur-xl border border-[#00BAFF]/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-[#00BAFF]">
                      <strong>Not:</strong> E-postayı görmüyorsanız spam/gereksiz klasörünü kontrol edin.
                      Link 24 saat geçerlidir.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <FuturisticButton
                      variant="ai"
                      fullWidth
                      onClick={() => setIsSubmitted(false)}
                    >
                      Yeni E-posta Gönder
                    </FuturisticButton>
                    <Link href="/auth/signin">
                      <FuturisticButton
                        variant="glass"
                        fullWidth
                      >
                        Giriş Sayfasına Dön
                      </FuturisticButton>
                    </Link>
                  </div>
                </div>
              </FuturisticCard>
            )}

            {/* Help Section */}
            <div className="mt-6 text-center text-white">
              <p className="text-sm mb-2">Sorun mu yaşıyorsunuz?</p>
              <Link
                href="/support"
                className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00BAFF] to-[#667EEA] hover:from-[#667EEA] hover:to-[#764BA2]"
              >
                7/24 Canlı Destek
              </Link>
            </div>
          </motion.div>
        </div>
      </NeoHero>
    </>
  );
}
