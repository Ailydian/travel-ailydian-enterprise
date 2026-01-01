import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FuturisticHeader } from '../../components/layout/FuturisticHeader';
import { FuturisticButton } from '../../components/neo-glass/FuturisticButton';
import logger from '../../lib/logger';
import {
  User,
  MapPin,
  Calendar,
  Heart,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Star,
  Plane,
  Building,
  Activity,
  TrendingUp,
  Gift,
  Shield,
  Sparkles,
  Globe,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Wallet,
  Bitcoin,
  Award,
  Users,
  MessageSquare } from
'lucide-react';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/auth/signin');
  }, [session, status, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (session && status === 'authenticated') {
      fetchDashboardData();
    }
  }, [session, status]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      logger.info('Fetching dashboard data');

      const response = await fetch('/api/user/dashboard');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Dashboard verileri alınamadı');
      }

      logger.info('Dashboard data loaded successfully');
      setDashboardData(data);
    } catch (error) {
      logger.error('Dashboard data fetch failed', error);
      logger.error('Dashboard error:', error as Error, { component: 'Dashboard' });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0118] via-[#1a0b2e] to-[#16213e]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/10 border-t-[#667EEA] mx-auto"></div>
            <div className="absolute inset-0 rounded-full blur-xl bg-[#667EEA]/30 animate-pulse"></div>
          </div>
          <p className="mt-6 text-white/60 font-medium">Yükleniyor...</p>
        </div>
      </div>);

  }

  if (!session || !dashboardData) {
    return null;
  }

  const user = session.user;

  if (!user) {
    return null;
  }

  const membershipType = dashboardData.user?.membershipType || 'BASIC';
  const loyaltyPoints = dashboardData.user?.loyaltyPoints || 0;
  const stats = dashboardData.stats || {
    totalBookings: 0,
    completedTrips: 0,
    savedMoney: 0,
    loyaltyPoints: 0,
    upcomingTrips: 0,
    favoriteDestinations: 0
  };
  const recentBookings = dashboardData.recentBookings || [];
  const upcomingTrips = dashboardData.upcomingTrips || [];

  const sidebarItems = [
  { title: 'Dashboard', href: '/profile/dashboard', icon: TrendingUp, active: true },
  { title: 'Profilim', href: '/profile/settings', icon: User },
  { title: 'Rezervasyonlarım', href: '/profile/bookings', icon: Calendar },
  { title: 'Favorilerim', href: '/profile/favorites', icon: Heart },
  { title: 'Cüzdanım', href: '/profile/wallet', icon: Wallet },
  { title: 'AI Tercihlerim', href: '/profile/ai-preferences', icon: Sparkles },
  { title: 'Bildirimler', href: '/profile/notifications', icon: Bell },
  { title: 'Ayarlar', href: '/profile/settings', icon: Settings }];


  const getMembershipBadge = (type: string) => {
    const badges = {
      BASIC: { color: 'bg-lydian-bg/10 text-gray-200', text: 'Temel Üye' },
      PREMIUM: { color: 'bg-blue-100 text-lydian-primary-hover', text: 'Premium Üye' },
      VIP: { color: 'bg-purple-100 text-purple-700', text: 'VIP Üye' },
      ENTERPRISE: { color: 'bg-yellow-100 text-yellow-700', text: 'Kurumsal Üye' }
    };
    return badges[type as keyof typeof badges] || badges.BASIC;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <Award className="w-4 h-4 text-lydian-primary" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-lydian-text-muted" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      confirmed: 'Onaylandı',
      pending: 'Beklemede',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi'
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const membershipBadge = getMembershipBadge(membershipType);

  return (
    <>
      <Head>
        <title>Dashboard - AILYDIAN Holiday</title>
        <meta name="description" content="Kişisel travel dashboard'unuz. Rezervasyonlarınız, favorileriniz ve seyahat istatistikleriniz." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <FuturisticHeader />

      <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1a0b2e] to-[#16213e]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-lydian-bg-hover rounded-2xl shadow-sm border border-lydian-border-light p-6">
                {/* User Profile Card */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-lydian-text-inverse" />
                  </div>
                  <h3 className="font-bold text-lg text-lydian-text-inverse">{user.name}</h3>
                  <p className="text-lydian-text-muted text-sm mb-3">{user.email}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${membershipBadge.color}`}>
                    <Award className="w-3 h-3 mr-1" />
                    {membershipBadge.text}
                  </span>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                        item.active ?
                        'bg-blue-50 text-lydian-primary border border-blue-200' :
                        'text-gray-200 hover:bg-lydian-bg/5'}`
                        }>

                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>);

                  })}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-lydian-primary hover:bg-lydian-error-lighter rounded-xl transition-colors duration-200 mt-4 border-t border-lydian-border-light pt-6">

                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-2xl p-8 text-lydian-text-inverse">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Hoş geldiniz, {user.name?.split(' ')[0]}! 👋</h2>
                    <p className="text-blue-100 mb-4">Seyahat maceranız için hazır mısınız? AI asistanınız size yardımcı olmaya hazır.</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-5 h-5" />
                        <span className="text-sm">{stats.loyaltyPoints} Puan</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-sm">{stats.totalBookings} Rezervasyon</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Sparkles className="w-24 h-24 text-lydian-text-inverse/20" />
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                { title: 'Toplam Rezervasyon', value: stats.totalBookings, icon: Calendar, color: 'text-lydian-primary', bg: 'bg-blue-50' },
                { title: 'Tamamlanan Seyahat', value: stats.completedTrips, icon: CheckCircle, color: 'text-lydian-success', bg: 'bg-green-50' },
                { title: 'Tasarruf Edilen', value: `₺${stats.savedMoney}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
                { title: 'Loyalty Puanı', value: stats.loyaltyPoints, icon: Star, color: 'text-lydian-warning', bg: 'bg-yellow-50' }].
                map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-lydian-bg-hover rounded-2xl p-6 shadow-sm border border-lydian-border-light">

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lydian-text-muted text-sm font-medium">{stat.title}</p>
                          <p className="text-2xl font-bold text-lydian-text-inverse mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </motion.div>);

                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-lydian-bg-hover rounded-2xl shadow-sm border border-lydian-border-light p-6">
                <h3 className="text-lg font-bold text-lydian-text-inverse mb-4">Hızlı İşlemler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                  { title: 'Yeni Rezervasyon', href: '/', icon: Plus, color: 'bg-blue-500 hover:bg-lydian-primary' },
                  { title: 'AI Asistan', href: '/ai-assistant', icon: Sparkles, color: 'bg-purple-500 hover:bg-purple-600' },
                  { title: 'VR Turlar', href: '/virtual-tours', icon: Globe, color: 'bg-green-500 hover:bg-lydian-success' },
                  { title: 'Cüzdanım', href: '/profile/wallet', icon: Bitcoin, color: 'bg-orange-500 hover:bg-orange-600' }].
                  map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.href} href={action.href}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`${action.color} text-lydian-text-inverse p-4 rounded-xl transition-colors duration-200 text-center`}>

                          <Icon className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm font-medium">{action.title}</span>
                        </motion.div>
                      </Link>);

                  })}
                </div>
              </div>

              {/* Recent Bookings & Upcoming Trips */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="bg-lydian-bg-hover rounded-2xl shadow-sm border border-lydian-border-light p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-lydian-text-inverse">Son Rezervasyonlar</h3>
                    <Link href="/profile/bookings" className="text-lydian-primary hover:text-lydian-primary-dark text-sm font-medium flex items-center gap-1">
                      Tümü
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentBookings.map((booking) =>
                    <div key={booking.id} className="flex items-center space-x-4 p-4 bg-lydian-glass-dark rounded-xl">
                        <div className="w-16 h-16 bg-lydian-bg-active rounded-lg overflow-hidden flex-shrink-0">
                          <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-lydian-text-inverse truncate">{booking.title}</h4>
                          <p className="text-sm text-lydian-text-muted">{booking.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(booking.status)}
                            <span className="text-xs text-lydian-text-dim">{getStatusText(booking.status)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lydian-text-inverse">₺{booking.amount}</p>
                          <p className="text-xs text-lydian-text-muted">{booking.date}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Trips */}
                <div className="bg-lydian-bg-hover rounded-2xl shadow-sm border border-lydian-border-light p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-lydian-text-inverse">Yaklaşan Seyahatler</h3>
                    <span className="bg-lydian-success-light text-lydian-success-text px-3 py-1 rounded-full text-xs font-medium">
                      {upcomingTrips.length} Seyahat
                    </span>
                  </div>
                  <div className="space-y-4">
                    {upcomingTrips.map((trip) =>
                    <div key={trip.id} className="border border-lydian-border-light/10 rounded-xl p-4 hover:border-lydian-border-focus transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 bg-lydian-bg-active rounded-lg overflow-hidden flex-shrink-0">
                            <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lydian-text-inverse mb-1">{trip.destination}</h4>
                            <p className="text-sm text-lydian-primary font-medium">{trip.type}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-lydian-text-muted">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{trip.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{trip.days} gün</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default Dashboard;