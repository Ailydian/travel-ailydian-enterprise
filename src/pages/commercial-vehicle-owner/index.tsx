import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Truck,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Plus,
  Package,
  Clock
} from 'lucide-react';

export default function CommercialVehicleOwnerDashboard() {
  const stats = [
    {
      label: 'Toplam Araç',
      value: '12',
      change: '+2',
      icon: Truck,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      label: 'Aktif Rezervasyon',
      value: '8',
      change: '+3',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Bu Ay Gelir',
      value: '₺45,800',
      change: '+₺12K',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      label: 'Toplam Müşteri',
      value: '156',
      change: '+24',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentBookings = [
    { id: 1, customer: 'ABC Şirketi', vehicle: 'Mercedes Sprinter VIP', date: '24 Ara 2025', amount: '₺5,500', status: 'confirmed' },
    { id: 2, customer: 'Düğün Organizasyon', vehicle: 'Minibüs (16 Kişilik)', date: '25 Ara 2025', amount: '₺3,200', status: 'pending' },
    { id: 3, customer: 'XYZ Turizm', vehicle: 'Midibüs (25 Kişilik)', date: '26 Ara 2025', amount: '₺4,800', status: 'confirmed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ticari Araç Yönetimi</h1>
                <p className="text-sm text-gray-600">Minibüs & Kamyonet Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">Anasayfa</span>
                </button>
              </Link>
              <Link href="/commercial-vehicle-owner/auth/login">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-3xl p-8 mb-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-2">Hoş Geldiniz! 👋</h2>
          <p className="text-white/90 mb-4">
            Ticari araç filosunuzu yönetin, rezervasyonları takip edin ve kazancınızı artırın.
          </p>
          <Link href="/commercial-vehicle-owner/vehicles/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Yeni Araç Ekle</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Son Rezervasyonlar</h3>
            <Link href="/commercial-vehicle-owner/bookings" className="text-orange-600 font-semibold hover:text-orange-700">
              Tümünü Gör →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Müşteri</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Araç</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tarih</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tutar</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Durum</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">{booking.customer}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{booking.vehicle}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{booking.date}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'Onaylandı' : 'Bekliyor'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/commercial-vehicle-owner/vehicles">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Package className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Araçlarım</h4>
              <p className="text-sm text-gray-600">Tüm araçlarınızı görüntüleyin ve yönetin</p>
            </motion.div>
          </Link>

          <Link href="/commercial-vehicle-owner/analytics">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <BarChart3 className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Analizler</h4>
              <p className="text-sm text-gray-600">Gelir ve performans raporları</p>
            </motion.div>
          </Link>

          <Link href="/commercial-vehicle-owner/settings">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Settings className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Ayarlar</h4>
              <p className="text-sm text-gray-600">Hesap ve bildirim ayarları</p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}
