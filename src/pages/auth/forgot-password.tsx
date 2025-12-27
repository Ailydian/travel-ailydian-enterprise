import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <title>Şifremi Unuttum | LyDian Travel - Güvenli Şifre Sıfırlama</title>
        <meta name="description" content="LyDian Travel hesabınızın şifresini güvenli bir şekilde sıfırlayın. E-posta adresinize gönderilen link ile yeni şifre oluşturun." />
        <meta name="keywords" content="şifremi unuttum, şifre sıfırlama, lydian travel, hesap kurtarma, güvenli giriş" />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content="Şifremi Unuttum | LyDian Travel" />
        <meta property="og:description" content="Hesabınızın şifresini güvenli bir şekilde sıfırlayın." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, var(--ac-1) 0%, var(--ac-2) 50%, var(--ac-3) 100%)' }}>
        {/* Return to Login */}
        <Link
          href="/auth/signin"
          className="fixed top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-lydian-glass-dark-heavy backdrop-blur-sm rounded-xl text-lydian-text-inverse hover:bg-lydian-bg/30 transition-all duration-200">

          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Giriş Sayfasına Dön</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md">

          <div className="bg-lydian-bg-hover rounded-2xl shadow-2xl p-8">
            {!isSubmitted ?
            <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-lydian-text-inverse" />
                  </div>
                  <h1 className="text-3xl font-bold text-lydian-text-inverse mb-2">
                    Şifremi Unuttum
                  </h1>
                  <p className="text-lydian-text-dim">
                    E-posta adresinize şifre sıfırlama linki göndereceğiz
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error &&
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-4 bg-lydian-error-lighter border border-red-200 rounded-lg text-lydian-primary-dark">

                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                }

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-lydian-text-muted mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-lydian-text-muted" />
                      <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full pl-11 pr-4 py-3 border border-lydian-border-light rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border outline-none transition-all"
                      required />

                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">

                    {isLoading ?
                  <span className="flex items-center justify-center gap-2">
                        <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-lydian-border-light border-t-transparent rounded-full" />

                        Gönderiliyor...
                      </span> :

                  'Şifre Sıfırlama Linki Gönder'
                  }
                  </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-lydian-text-dim">
                    Şifrenizi hatırladınız mı?{' '}
                    <Link href="/auth/signin" className="text-lydian-primary font-semibold hover:underline">
                      Giriş Yap
                    </Link>
                  </p>
                  <p className="text-sm text-lydian-text-dim mt-2">
                    Hesabınız yok mu?{' '}
                    <Link href="/auth/signup" className="text-lydian-primary font-semibold hover:underline">
                      Kayıt Ol
                    </Link>
                  </p>
                </div>
              </> :

            <>
                {/* Success State */}
                <div className="text-center">
                  <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 bg-lydian-success-light rounded-full flex items-center justify-center mx-auto mb-6">

                    <CheckCircle className="w-12 h-12 text-lydian-success" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                    E-posta Gönderildi!
                  </h2>
                  <p className="text-lydian-text-dim mb-6">
                    <strong>{email}</strong> adresine şifre sıfırlama linki gönderdik.
                    Lütfen e-postanızı kontrol edin ve linke tıklayarak yeni şifrenizi oluşturun.
                  </p>
                  <div className="bg-lydian-primary-lighter border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>Not:</strong> E-postayı görmüyorsanız spam/gereksiz klasörünü kontrol edin.
                      Link 24 saat geçerlidir.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg font-semibold hover:shadow-lg transition-all">

                      Yeni E-posta Gönder
                    </button>
                    <Link
                    href="/auth/signin"
                    className="w-full px-6 py-3 bg-lydian-glass-dark-medium text-lydian-text-muted rounded-lg font-semibold hover:bg-lydian-bg-active transition-all text-center">

                      Giriş Sayfasına Dön
                    </Link>
                  </div>
                </div>
              </>
            }
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center text-lydian-text-inverse">
            <p className="text-sm mb-2">Sorun mu yaşıyorsunuz?</p>
            <Link
              href="/support"
              className="text-sm font-semibold hover:underline">

              7/24 Canlı Destek
            </Link>
          </div>
        </motion.div>
      </div>
    </>);

}