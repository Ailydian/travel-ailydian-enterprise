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
  Globe
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

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
    points: 2850
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
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400&h=300&q=90'
    },
    {
      id: 2,
      type: 'flight',
      title: 'Turkish Airlines TK2134',
      location: 'İstanbul → Ankara',
      date: '2024-02-20',
      status: 'pending',
      price: '₺890',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&q=90'
    },
    {
      id: 3,
      type: 'activity',
      title: 'Kapadokya Balon Turu',
      location: 'Nevşehir, Türkiye',
      date: '2024-03-05',
      status: 'confirmed',
      price: '₺850',
      image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&q=90'
    }
  ];

  // Geçmiş seyahatler
  const recentTrips = [
    {
      id: 1,
      destination: 'Antalya',
      date: '2024-01-10',
      duration: '5 gün',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90'
    },
    {
      id: 2,
      destination: 'Bodrum',
      date: '2023-12-15',
      duration: '3 gün',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400&h=300&q=90'
    },
    {
      id: 3,
      destination: 'Fethiye',
      date: '2023-11-20',
      duration: '4 gün',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&q=90'
    }
  ];

  // AI önerileri
  const aiRecommendations = [
    {
      id: 1,
      title: 'Trabzon Doğa Turu',
      reason: 'Geçmiş tercihlerinize göre',
      price: '₺1,680',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1566848893052-c2565bb2ef74?w=400&h=300&q=90'
    },
    {
      id: 2,
      title: 'Pamukkale Termal Tur',
      reason: 'Wellness ilginize göre',
      price: '₺380',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&q=90'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Genel Bakış', icon: TrendingUp },
    { id: 'bookings', name: 'Rezervasyonlarım', icon: Calendar },
    { id: 'trips', name: 'Seyahatlerim', icon: MapPin },
    { id: 'favorites', name: 'Favorilerim', icon: Heart },
    { id: 'profile', name: 'Profil', icon: User }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return 'var(--tx-3)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Onaylandı';
      case 'pending': return 'Beklemede';
      case 'cancelled': return 'İptal Edildi';
      default: return 'Bilinmeyen';
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Travel.Ailydian - Seyahat Hesabım</title>
        <meta name="description" content="Travel.Ailydian hesap dashboard'unuz. Rezervasyonlarınızı görün, seyahat geçmişinizi inceleyin ve AI önerilerini keşfedin." />
      </Head>

      <NavigationHeader />

      <main className="min-h-screen py-8" style={{backgroundColor: 'var(--bg-0)', color: 'var(--tx-1)'}}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold neon-text-strong mb-2" 
                  style={{color: 'var(--tx-1)', textShadow: '0 0 15px var(--ac-1)'}}
                >
                  Hoş Geldiniz, {userData.name}
                </h1>
                <p style={{color: 'var(--tx-2)'}}>Seyahat dashboard&apos;unuzda yeni keşifler sizi bekliyor</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-3 rounded-xl border-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: 'var(--ac-1)',
                    color: 'var(--ac-1)'
                  }}
                >
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl border-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: 'var(--ac-1)',
                    color: 'var(--ac-1)'
                  }}
                >
                  <Settings className="w-5 h-5" />
                </button>
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
              { label: 'Toplam Seyahat', value: userData.totalTrips, icon: MapPin, color: 'var(--ac-1)' },
              { label: 'Ziyaret Edilen Ülke', value: userData.countriesVisited, icon: Globe, color: 'var(--ac-2)' },
              { label: 'Yazılan İnceleme', value: userData.reviewsWritten, icon: Star, color: 'var(--ac-1)' },
              { label: 'Puan', value: userData.points, icon: Award, color: 'var(--ac-2)' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-2xl p-6 border-2 card-hover"
                  style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: stat.color,
                    boxShadow: `0 0 15px ${stat.color}30`
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        borderColor: stat.color
                      }}
                    >
                      <Icon className="w-6 h-6" style={{color: stat.color}} />
                    </div>
                    <TrendingUp className="w-4 h-4" style={{color: stat.color}} />
                  </div>
                  <div className="text-2xl font-bold neon-text-strong" style={{color: 'var(--tx-1)'}}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{color: 'var(--tx-2)'}}>{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-b mb-8" 
            style={{borderColor: 'rgba(255, 33, 77, 0.3)'}}
          >
            <div className="flex flex-wrap gap-2 -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-all ${
                      activeTab === tab.id ? 'neon-glow' : ''
                    }`}
                    style={{
                      borderColor: activeTab === tab.id ? 'var(--ac-1)' : 'transparent',
                      color: activeTab === tab.id ? 'var(--ac-1)' : 'var(--tx-2)',
                      boxShadow: activeTab === tab.id ? '0 0 10px var(--ac-1)' : 'none'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
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
                  <h2 className="text-2xl font-bold neon-text-strong mb-6" style={{color: 'var(--tx-1)'}}>
                    Yaklaşan Rezervasyonlar
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="rounded-2xl overflow-hidden border-2 card-hover"
                        style={{
                          backgroundColor: 'var(--bg-1)',
                          borderColor: 'var(--ac-1)',
                          boxShadow: '0 0 15px rgba(255, 33, 77, 0.2)'
                        }}
                      >
                        <div className="h-32 relative">
                          <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium"
                            style={{
                              backgroundColor: getStatusColor(booking.status),
                              color: 'white'
                            }}
                          >
                            {getStatusText(booking.status)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold neon-text-strong mb-2" style={{color: 'var(--tx-1)'}}>
                            {booking.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm mb-2" style={{color: 'var(--tx-2)'}}>
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm mb-3" style={{color: 'var(--tx-2)'}}>
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('tr-TR')}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold" style={{color: 'var(--ac-1)'}}>
                              {booking.price}
                            </span>
                            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                              style={{
                                backgroundColor: 'var(--ac-1)',
                                color: 'white'
                              }}
                            >
                              Detaylar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div>
                  <h2 className="text-2xl font-bold neon-text-strong mb-6" style={{color: 'var(--tx-1)'}}>
                    Size Özel AI Önerileri
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aiRecommendations.map((rec) => (
                      <div key={rec.id} className="rounded-2xl overflow-hidden border-2 card-hover"
                        style={{
                          backgroundColor: 'var(--bg-1)',
                          borderColor: 'var(--ac-2)',
                          boxShadow: '0 0 15px rgba(255, 106, 69, 0.2)'
                        }}
                      >
                        <div className="flex">
                          <div className="w-1/3 h-24">
                            <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="w-2/3 p-4">
                            <h3 className="font-bold neon-text-strong mb-1" style={{color: 'var(--tx-1)'}}>
                              {rec.title}
                            </h3>
                            <p className="text-xs mb-2" style={{color: 'var(--ac-2)'}}>
                              <Zap className="w-3 h-3 inline mr-1" />
                              {rec.reason}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-current" style={{color: 'var(--ac-2)'}} />
                                <span className="text-sm" style={{color: 'var(--tx-2)'}}>{rec.rating}</span>
                              </div>
                              <span className="font-bold" style={{color: 'var(--ac-1)'}}>
                                {rec.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-bold neon-text-strong mb-6" style={{color: 'var(--tx-1)'}}>
                  Tüm Rezervasyonlar
                </h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="rounded-2xl p-6 border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 15px rgba(255, 33, 77, 0.1)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden">
                            <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold neon-text-strong" style={{color: 'var(--tx-1)'}}>
                              {booking.title}
                            </h3>
                            <p className="text-sm" style={{color: 'var(--tx-2)'}}>{booking.location}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm" style={{color: 'var(--tx-3)'}}>
                                {new Date(booking.date).toLocaleDateString('tr-TR')}
                              </span>
                              <span className="px-2 py-1 rounded-lg text-xs font-medium"
                                style={{
                                  backgroundColor: `${getStatusColor(booking.status)}20`,
                                  color: getStatusColor(booking.status)
                                }}
                              >
                                {getStatusText(booking.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg" style={{color: 'var(--ac-1)'}}>
                            {booking.price}
                          </div>
                          <button className="mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                            style={{
                              backgroundColor: 'var(--ac-1)',
                              color: 'white'
                            }}
                          >
                            Yönet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div>
                <h2 className="text-2xl font-bold neon-text-strong mb-6" style={{color: 'var(--tx-1)'}}>
                  Geçmiş Seyahatler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="rounded-2xl overflow-hidden border-2 card-hover"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 15px rgba(255, 33, 77, 0.2)'
                      }}
                    >
                      <div className="h-40 relative">
                        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg neon-text-strong mb-2" style={{color: 'var(--tx-1)'}}>
                          {trip.destination}
                        </h3>
                        <div className="flex items-center justify-between text-sm mb-3" style={{color: 'var(--tx-2)'}}>
                          <span>{new Date(trip.date).toLocaleDateString('tr-TR')}</span>
                          <span>{trip.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < trip.rating ? 'fill-current' : ''}`} 
                                style={{color: i < trip.rating ? 'var(--ac-2)' : 'var(--tx-3)'}} 
                              />
                            ))}
                          </div>
                          <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                            style={{
                              backgroundColor: 'var(--ac-2)',
                              color: 'white'
                            }}
                          >
                            İnceleme Yaz
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold neon-text-strong mb-6" style={{color: 'var(--tx-1)'}}>
                  Favori Destinasyonlar
                </h2>
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 mx-auto mb-4" style={{color: 'var(--tx-3)'}} />
                  <h3 className="text-xl font-bold neon-text-strong mb-2" style={{color: 'var(--tx-1)'}}>
                    Henüz favori eklememişsiniz
                  </h3>
                  <p className="mb-6" style={{color: 'var(--tx-2)'}}>
                    Beğendiğiniz destinasyonları kalp ikonuna tıklayarak favorilerinize ekleyin
                  </p>
                  <button className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                      color: 'white'
                    }}
                  >
                    Destinasyonları Keşfet
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold neon-text-strong mb-6" style={{color: 'var(--tx-1)'}}>
                  Profil Ayarları
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Info */}
                  <div className="lg:col-span-1">
                    <div className="rounded-2xl p-6 text-center border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 15px rgba(255, 33, 77, 0.2)'
                      }}
                    >
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4"
                        style={{borderColor: 'var(--ac-1)'}}
                      >
                        <img src={userData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <h3 className="text-xl font-bold neon-text-strong mb-2" style={{color: 'var(--tx-1)'}}>
                        {userData.name}
                      </h3>
                      <p style={{color: 'var(--tx-2)'}}>
                        {userData.level}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Award className="w-4 h-4" style={{color: 'var(--ac-2)'}} />
                        <span className="text-sm" style={{color: 'var(--tx-3)'}}>
                          {userData.memberSince} yılından beri üye
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl p-6 border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 15px rgba(255, 33, 77, 0.1)'
                      }}
                    >
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{color: 'var(--tx-2)'}}>
                              Ad
                            </label>
                            <input
                              type="text"
                              defaultValue="Ahmet"
                              className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                              style={{
                                backgroundColor: 'var(--bg-0)',
                                color: 'var(--tx-1)',
                                borderColor: 'var(--ac-2)'
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{color: 'var(--tx-2)'}}>
                              Soyad
                            </label>
                            <input
                              type="text"
                              defaultValue="Yılmaz"
                              className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                              style={{
                                backgroundColor: 'var(--bg-0)',
                                color: 'var(--tx-1)',
                                borderColor: 'var(--ac-2)'
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: 'var(--tx-2)'}}>
                            E-posta
                          </label>
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: 'var(--tx-2)'}}>
                            Telefon
                          </label>
                          <input
                            type="tel"
                            placeholder="+90 555 123 45 67"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="submit"
                            className="px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                              color: 'white'
                            }}
                          >
                            Güncelle
                          </button>
                          <button
                            type="button"
                            className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:scale-105"
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: 'var(--ac-1)',
                              color: 'var(--ac-1)'
                            }}
                          >
                            İptal
                          </button>
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