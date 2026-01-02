import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Calendar,
  Star,
  Heart,
  CreditCard,
  Settings,
  Bell,
  Award,
  TrendingUp,
  Plane,
  Hotel,
  Camera,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { FuturisticButton } from '../components/neo-glass/FuturisticButton';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Kullanıcı verileri (örnek)
  const userData = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    memberSince: '2023',
    level: 'Gold Üye',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    totalTrips: 12,
    countriesVisited: 8,
    reviewsWritten: 24,
    points: 2850,
  };

  // Yaklaşan rezervasyonlar
  const upcomingBookings = [
    {
      id: 1,
      type: 'hotel',
      title: 'Hilton Garden Inn Istanbul',
      location: 'İstanbul, Türkiye',
      date: '2024-02-15',
      status: 'confirmed',
      price: '₺1,250',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400&h=300&q=90',
    },
    {
      id: 2,
      type: 'flight',
      title: 'Turkish Airlines TK2134',
      location: 'İstanbul → Ankara',
      date: '2024-02-20',
      status: 'pending',
      price: '₺890',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&q=90',
    },
    {
      id: 3,
      type: 'activity',
      title: 'Kapadokya Balon Turu',
      location: 'Nevşehir, Türkiye',
      date: '2024-03-05',
      status: 'confirmed',
      price: '₺850',
      image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&q=90',
    },
  ];

  // Geçmiş seyahatler
  const recentTrips = [
    {
      id: 1,
      destination: 'Antalya',
      date: '2024-01-10',
      duration: '5 gün',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90',
    },
    {
      id: 2,
      destination: 'Bodrum',
      date: '2023-12-15',
      duration: '3 gün',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400&h=300&q=90',
    },
    {
      id: 3,
      destination: 'Fethiye',
      date: '2023-11-20',
      duration: '4 gün',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&q=90',
    },
  ];

  // AI önerileri
  const aiRecommendations = [
    {
      id: 1,
      title: 'Trabzon Doğa Turu',
      reason: 'Geçmiş tercihlerinize göre',
      price: '₺1,680',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1566848893052-c2565bb2ef74?w=400&h=300&q=90',
    },
    {
      id: 2,
      title: 'Pamukkale Termal Tur',
      reason: 'Wellness ilginize göre',
      price: '₺380',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&q=90',
    },
  ];

  const tabs = [
    { id: 'overview', name: 'Genel Bakış', icon: TrendingUp },
    { id: 'bookings', name: 'Rezervasyonlarım', icon: Calendar },
    { id: 'trips', name: 'Seyahatlerim', icon: MapPin },
    { id: 'favorites', name: 'Favorilerim', icon: Heart },
    { id: 'profile', name: 'Profil', icon: User },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'var(--lydian-success)';
      case 'pending':
        return 'var(--lydian-warning)';
      case 'cancelled':
        return 'var(--lydian-secondary)';
      default:
        return 'var(--tx-3)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Onaylandı';
      case 'pending':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return 'Bilinmeyen';
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Holiday.AILYDIAN - Seyahat Hesabım</title>
        <meta
          name="description"
          content="Holiday.AILYDIAN hesap dashboard'unuz. Rezervasyonlarınızı görün, seyahat geçmişinizi inceleyin ve AI önerilerini keşfedin."
        />
      </Head>

      <ModernHeader />

      <main className="min-h-screen py-8 bg-gradient-to-br from-slate-900 via-black to-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white">
                  Hoş Geldiniz, {userData.name}
                </h1>
                <p className="text-gray-400">
                  Seyahat dashboard'unuzda yeni keşifler sizi bekliyor
                </p>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all hover:bg-lydian-bg/10"
                >
                  <Bell className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all hover:bg-lydian-bg/10"
                >
                  <Settings className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: 'Toplam Seyahat', value: userData.totalTrips, icon: MapPin, color: '#667EEA' },
              { label: 'Ziyaret Edilen Ülke', value: userData.countriesVisited, icon: Globe, color: '#00BAFF' },
              { label: 'Yazılan İnceleme', value: userData.reviewsWritten, icon: Star, color: '#FF9500' },
              { label: 'Puan', value: userData.points, icon: Award, color: '#EC4899' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-lydian-bg/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                        border: `1px solid ${stat.color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <TrendingUp className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-b border-white/10 mb-8"
          >
            <div className="flex flex-wrap gap-2 -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-all ${
                      activeTab === tab.id
                        ? 'border-[#667EEA] text-[#667EEA] bg-[#667EEA]/10'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {activeTab === 'overview' && (
              <>
                {/* Upcoming Bookings */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">
                    Yaklaşan Rezervasyonlar
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingBookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-lydian-bg/10 transition-all cursor-pointer"
                      >
                        <div className="h-32 relative">
                          <img
                            src={booking.image}
                            alt={booking.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-xl"
                            style={{
                              backgroundColor: `${getStatusColor(booking.status)}30`,
                              color: getStatusColor(booking.status),
                              border: `1px solid ${getStatusColor(booking.status)}50`,
                            }}
                          >
                            {getStatusText(booking.status)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 text-white">{booking.title}</h3>
                          <div className="flex items-center gap-2 text-sm mb-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm mb-3 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('tr-TR')}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{booking.price}</span>
                            <FuturisticButton variant="gradient" size="sm">
                              Detaylar
                            </FuturisticButton>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">
                    Size Özel AI Önerileri
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aiRecommendations.map((rec) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-lydian-bg/10 transition-all cursor-pointer"
                      >
                        <div className="flex">
                          <div className="w-1/3 h-24">
                            <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="w-2/3 p-4">
                            <h3 className="font-bold mb-1 text-white">{rec.title}</h3>
                            <p className="text-xs mb-2 text-[#00BAFF] flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {rec.reason}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-current text-[#FF9500]" />
                                <span className="text-sm text-gray-400">{rec.rating}</span>
                              </div>
                              <span className="font-bold text-white">{rec.price}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Tüm Rezervasyonlar</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden">
                            <img
                              src={booking.image}
                              alt={booking.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{booking.title}</h3>
                            <p className="text-sm text-gray-400">{booking.location}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-300">
                                {new Date(booking.date).toLocaleDateString('tr-TR')}
                              </span>
                              <span
                                className="px-2 py-1 rounded-lg text-xs font-medium"
                                style={{
                                  backgroundColor: `${getStatusColor(booking.status)}20`,
                                  color: getStatusColor(booking.status),
                                }}
                              >
                                {getStatusText(booking.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-white">{booking.price}</div>
                          <FuturisticButton variant="gradient" size="sm">
                            Yönet
                          </FuturisticButton>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Geçmiş Seyahatler</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentTrips.map((trip) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-lydian-bg/10 transition-all cursor-pointer"
                    >
                      <div className="h-40 relative">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-white">
                          {trip.destination}
                        </h3>
                        <div className="flex items-center justify-between text-sm mb-3 text-gray-400">
                          <span>{new Date(trip.date).toLocaleDateString('tr-TR')}</span>
                          <span>{trip.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < trip.rating ? 'fill-current' : ''}`}
                                style={{ color: i < trip.rating ? '#FF9500' : '#4B5563' }}
                              />
                            ))}
                          </div>
                          <FuturisticButton variant="accent" size="sm">
                            İnceleme Yaz
                          </FuturisticButton>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Favori Destinasyonlar
                </h2>
                <div className="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Henüz favori eklememişsiniz
                  </h3>
                  <p className="mb-6 text-gray-400">
                    Beğendiğiniz destinasyonları kalp ikonuna tıklayarak favorilerinize ekleyin
                  </p>
                  <FuturisticButton variant="ai" size="lg">
                    Destinasyonları Keşfet
                  </FuturisticButton>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Profil Ayarları</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Info */}
                  <div className="lg:col-span-1">
                    <div className="rounded-2xl p-6 text-center bg-white/5 backdrop-blur-xl border border-white/10">
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#667EEA]/30">
                        <img
                          src={userData.avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{userData.name}</h3>
                      <p className="text-gray-400">{userData.level}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Award className="w-4 h-4 text-[#FF9500]" />
                        <span className="text-sm text-gray-400">
                          {userData.memberSince} yılından beri üye
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-400">Ad</label>
                            <input
                              type="text"
                              defaultValue="Ahmet"
                              className="w-full px-4 py-3 rounded-xl bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 text-white outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-400">
                              Soyad
                            </label>
                            <input
                              type="text"
                              defaultValue="Yılmaz"
                              className="w-full px-4 py-3 rounded-xl bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 text-white outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-400">E-posta</label>
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-3 rounded-xl bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 text-white outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-400">Telefon</label>
                          <input
                            type="tel"
                            placeholder="+90 555 123 45 67"
                            className="w-full px-4 py-3 rounded-xl bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30 text-white placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-[#00BAFF] focus:border-[#00BAFF]/50"
                          />
                        </div>

                        <div className="flex gap-4">
                          <FuturisticButton type="submit" variant="ai" size="md">
                            Güncelle
                          </FuturisticButton>
                          <FuturisticButton type="button" variant="secondary" size="md">
                            İptal
                          </FuturisticButton>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
