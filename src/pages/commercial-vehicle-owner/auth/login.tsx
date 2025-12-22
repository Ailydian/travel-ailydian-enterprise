import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Truck,
  ArrowRight,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CommercialVehicleOwnerLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard after login
    router.push('/commercial-vehicle-owner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-6">
      {/* Back to Home */}
      <Link href="/" className="fixed top-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg"
        >
          <Home className="w-5 h-5" />
          <span className="font-semibold">Anasayfa</span>
        </motion.button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-2xl mb-4">
              <Truck className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ticari Araç Ortağı Girişi
            </h1>
            <p className="text-gray-600">
              Minibüs, kamyonet ve özel araç yönetimi
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-600"
                />
                <span className="ml-2 text-sm text-gray-600">Beni hatırla</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                Şifremi unuttum
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <span>Giriş Yap</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Hesabınız yok mu?{' '}
              <Link href="/commercial-vehicle-owner/auth/register" className="text-orange-600 font-semibold hover:text-orange-700">
                Kayıt Olun
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
