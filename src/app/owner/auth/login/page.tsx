'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Home,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logger from '../../../../lib/logger';

export default function OwnerLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      logger.debug('Login data:', {component:'Page',metadata:{formData}});
      setIsLoading(false);
      // Redirect to owner dashboard
      window.location.href = '/owner/dashboard';
    }, 2000);
  };

  const benefits = [
    'Kolay mülk yönetimi',
    'Gerçek zamanlı rezervasyonlar',
    'Otomatik ödeme takibi',
    'Detaylı raporlama'
  ];

  return (
    <div className="min-h-screen bg-lydian-bg/5">
      <div className="flex min-h-screen">
        {/* Left Column - Branding & Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex-col justify-between relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">LyDian</span>
            </Link>

            {/* Main Content */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Mülk Yönetiminizi
                <br />
                <span className="bg-gradient-to-r from-[#FF214D] to-[#FF6A45] bg-clip-text text-transparent">
                  Dijitalleştirin
                </span>
              </h1>
              <p className="text-lydian-text-dim text-lg mb-8">
                Binlerce mülk sahibinin tercih ettiği platform ile rezervasyonlarınızı yönetin, gelirinizi artırın.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-200 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-white">5000+</div>
              <div className="text-lydian-text-dim text-sm">Mülk Sahibi</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-lydian-text-dim text-sm">Rezervasyon</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-lydian-text-dim text-sm">Memnuniyet</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF214D] to-[#FF6A45] rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">LyDian</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Mülk Sahibi Girişi
              </h2>
              <p className="text-lydian-text-dim">
                Hesabınıza giriş yaparak mülklerinizi yönetin
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-lydian-text-muted" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-lydian-border-medium'
                    } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-lydian-bg/5 text-white`}
                    placeholder="ornek@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-lydian-text-muted" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-500' : 'border-lydian-border-medium'
                    } rounded-lg focus:ring-2 focus:ring-[#FF214D] focus:border-transparent outline-none transition-all bg-lydian-bg/5 text-white`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-lydian-text-muted hover:text-lydian-text-dim" />
                    ) : (
                      <Eye className="h-5 w-5 text-lydian-text-muted hover:text-lydian-text-dim" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-lydian-primary focus:ring-[#FF214D] border-lydian-border-medium rounded cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-200 cursor-pointer">
                    Beni hatırla
                  </label>
                </div>
                <Link
                  href="/owner/auth/forgot-password"
                  className="text-sm font-medium text-lydian-primary hover:text-[#FF6A45] transition-colors"
                >
                  Şifremi unuttum?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#FF214D] to-[#FF6A45] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Giriş yapılıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Giriş Yap</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-lydian-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-lydian-bg/5 text-lydian-text-muted">Hesabınız yok mu?</span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              href="/owner/auth/register"
              className="block w-full text-center py-3 px-4 border-2 border-lydian-border-medium rounded-lg font-semibold text-white hover:bg-lydian-bg/5 hover:border-gray-400 transition-all duration-200"
            >
              Mülk Sahibi Olarak Kayıt Ol
            </Link>

            {/* Back to Main Site */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-lydian-text-dim hover:text-white transition-colors"
              >
                ← Ana sayfaya dön
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
