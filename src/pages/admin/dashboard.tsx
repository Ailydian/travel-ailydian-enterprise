import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar,
  ComposedChart, Legend, ReferenceLine
} from 'recharts';
import {
  Users, MapPin, MessageSquare, Camera, Star, TrendingUp, TrendingDown,
  Activity, Clock, Globe, AlertTriangle, CheckCircle, RefreshCw,
  Settings, LogOut, Eye, Edit, Trash2, Calendar, Download, Zap,
  BarChart3, PieChart as PieChartIcon, Target, Award, Sparkles,
  Car, Bus, Navigation, DollarSign
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

interface DashboardData {
  overview: {
    totalLocations: number;
    totalReviews: number;
    totalUsers: number;
    totalPhotos: number;
    averageRating: number;
    monthlyGrowth: {
      locations: number;
      reviews: number;
      users: number;
    };
  };
  vehicleRental: {
    totalVehicles: number;
    activeRentals: number;
    monthlyRevenue: number;
    growth: number;
  };
  transferService: {
    totalFleet: number;
    activeTransfers: number;
    monthlyRevenue: number;
    onTimeRate: number;
  };
  recentActivity: Array<{
    type: 'review' | 'user' | 'location' | 'photo' | 'vehicle' | 'transfer';
    description: string;
    timestamp: string;
    user?: string;
    location?: string;
  }>;
  topLocations: Array<{
    id: number;
    name: string;
    rating: number;
    reviews: number;
    views: number;
  }>;
  platformStats: {
    googleSynced: number;
    tripAdvisorSynced: number;
    lastSync: string;
    syncErrors: number;
  };
  moderationQueue: {
    pendingReviews: number;
    flaggedContent: number;
    reportedUsers: number;
  };
  analytics: {
    dailyStats: Array<{
      date: string;
      locations: number;
      reviews: number;
      users: number;
      views: number;
      vehicleRevenue: number;
      transferRevenue: number;
      propertyRevenue: number;
    }>;
  };
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setAdminData(adminService.getStoredAdminData());
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch from API, but use fallback if fails
      let data;
      try {
        data = await adminService.getDashboardStats();
      } catch (apiError) {
        console.warn('API fetch failed, using mock data:', apiError);
        // Fallback to mock data for demo
        data = {
          overview: {
            totalLocations: 1247,
            totalReviews: 8934,
            totalUsers: 3456,
            totalPhotos: 12789,
            averageRating: 4.3,
            monthlyGrowth: {
              locations: 12.5,
              reviews: 23.8,
              users: 18.2
            }
          },
          vehicleRental: {
            totalVehicles: 247,
            activeRentals: 89,
            monthlyRevenue: 145000,
            growth: 18.5
          },
          transferService: {
            totalFleet: 128,
            activeTransfers: 45,
            monthlyRevenue: 210000,
            onTimeRate: 96.8
          },
          recentActivity: [
            {
              type: 'vehicle',
              description: 'Yeni araç eklendi: BMW 3 Serisi',
              timestamp: new Date().toISOString(),
              user: 'admin@example.com'
            },
            {
              type: 'transfer',
              description: 'Transfer rezervasyonu: IST Havalimanı → Sultanahmet',
              timestamp: new Date(Date.now() - 180000).toISOString(),
              user: 'mehmet.k@example.com'
            },
            {
              type: 'review',
              description: 'Sultanahmet Camii için yeni değerlendirme eklendi',
              timestamp: new Date(Date.now() - 300000).toISOString(),
              user: 'ahmet.y@example.com',
              location: 'Sultanahmet Camii'
            },
            {
              type: 'vehicle',
              description: 'Araç kiralama tamamlandı: Mercedes-Benz E-Class',
              timestamp: new Date(Date.now() - 450000).toISOString(),
              user: 'ayse.t@example.com'
            },
            {
              type: 'user',
              description: 'Yeni kullanıcı kayıt oldu',
              timestamp: new Date(Date.now() - 600000).toISOString(),
              user: 'zeynep.k@example.com'
            },
            {
              type: 'transfer',
              description: 'Transfer tamamlandı: Taksim → SAW Havalimanı',
              timestamp: new Date(Date.now() - 750000).toISOString(),
              user: 'can.d@example.com'
            },
            {
              type: 'location',
              description: 'Galata Kulesi lokasyonu güncellendi',
              timestamp: new Date(Date.now() - 900000).toISOString(),
              location: 'Galata Kulesi'
            },
            {
              type: 'photo',
              description: 'Kapadokya için 5 yeni fotoğraf yüklendi',
              timestamp: new Date(Date.now() - 1050000).toISOString(),
              location: 'Kapadokya'
            }
          ],
          topLocations: [
            { id: 1, name: 'Ayasofya', rating: 4.8, reviews: 2847, views: 45632 },
            { id: 2, name: 'Sultanahmet Camii', rating: 4.7, reviews: 2234, views: 38294 },
            { id: 3, name: 'Galata Kulesi', rating: 4.6, reviews: 1876, views: 32481 },
            { id: 4, name: 'Kapaliçarşı', rating: 4.5, reviews: 1654, views: 29387 },
            { id: 5, name: 'Topkapı Sarayı', rating: 4.7, reviews: 1432, views: 26754 }
          ],
          platformStats: {
            googleSynced: 892,
            tripAdvisorSynced: 634,
            lastSync: new Date(Date.now() - 3600000).toISOString(),
            syncErrors: 3
          },
          moderationQueue: {
            pendingReviews: 23,
            flaggedContent: 7,
            reportedUsers: 2
          },
          analytics: {
            dailyStats: [
              { date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 6, reviews: 66, users: 20, views: 914, vehicleRevenue: 3800, transferRevenue: 5200, propertyRevenue: 2100 },
              { date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 35, users: 29, views: 606, vehicleRevenue: 4200, transferRevenue: 6100, propertyRevenue: 1900 },
              { date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 24, users: 24, views: 960, vehicleRevenue: 5100, transferRevenue: 7300, propertyRevenue: 2800 },
              { date: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 14, reviews: 25, users: 13, views: 1402, vehicleRevenue: 4800, transferRevenue: 6900, propertyRevenue: 3200 },
              { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 28, users: 15, views: 788, vehicleRevenue: 3900, transferRevenue: 5800, propertyRevenue: 2300 },
              { date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 22, users: 11, views: 575, vehicleRevenue: 4500, transferRevenue: 6400, propertyRevenue: 1700 },
              { date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 52, users: 20, views: 1475, vehicleRevenue: 5300, transferRevenue: 7800, propertyRevenue: 3500 },
              { date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 9, reviews: 50, users: 28, views: 1136, vehicleRevenue: 4900, transferRevenue: 7100, propertyRevenue: 2900 },
              { date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 43, users: 19, views: 768, vehicleRevenue: 4100, transferRevenue: 5900, propertyRevenue: 2200 },
              { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 57, users: 14, views: 1463, vehicleRevenue: 5400, transferRevenue: 7600, propertyRevenue: 3400 },
              { date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 23, users: 16, views: 1227, vehicleRevenue: 4600, transferRevenue: 6700, propertyRevenue: 2800 },
              { date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 55, users: 13, views: 693, vehicleRevenue: 3700, transferRevenue: 5400, propertyRevenue: 2000 },
              { date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 6, reviews: 23, users: 11, views: 867, vehicleRevenue: 4300, transferRevenue: 6200, propertyRevenue: 2500 },
              { date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 12, reviews: 38, users: 26, views: 588, vehicleRevenue: 3600, transferRevenue: 5300, propertyRevenue: 1600 },
              { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 6, reviews: 58, users: 20, views: 1033, vehicleRevenue: 5000, transferRevenue: 7200, propertyRevenue: 2900 },
              { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 8, reviews: 60, users: 24, views: 946, vehicleRevenue: 4800, transferRevenue: 6900, propertyRevenue: 2700 },
              { date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 13, reviews: 33, users: 22, views: 745, vehicleRevenue: 4200, transferRevenue: 6100, propertyRevenue: 2100 },
              { date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 24, users: 27, views: 1296, vehicleRevenue: 5200, transferRevenue: 7500, propertyRevenue: 3100 },
              { date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 12, reviews: 20, users: 15, views: 1433, vehicleRevenue: 5500, transferRevenue: 7900, propertyRevenue: 3300 },
              { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 5, reviews: 41, users: 12, views: 1291, vehicleRevenue: 5100, transferRevenue: 7400, propertyRevenue: 3000 },
              { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 5, reviews: 25, users: 11, views: 1057, vehicleRevenue: 4700, transferRevenue: 6800, propertyRevenue: 2600 },
              { date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 13, reviews: 62, users: 14, views: 825, vehicleRevenue: 4000, transferRevenue: 5700, propertyRevenue: 2400 },
              { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 57, users: 12, views: 1049, vehicleRevenue: 4900, transferRevenue: 7000, propertyRevenue: 2800 },
              { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 12, reviews: 28, users: 16, views: 1023, vehicleRevenue: 4800, transferRevenue: 6900, propertyRevenue: 2700 },
              { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 14, reviews: 48, users: 24, views: 778, vehicleRevenue: 4100, transferRevenue: 5900, propertyRevenue: 2200 },
              { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 8, reviews: 22, users: 10, views: 1466, vehicleRevenue: 5600, transferRevenue: 8100, propertyRevenue: 3500 },
              { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 13, reviews: 28, users: 15, views: 652, vehicleRevenue: 3500, transferRevenue: 5100, propertyRevenue: 1800 },
              { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 14, reviews: 68, users: 28, views: 1134, vehicleRevenue: 5300, transferRevenue: 7600, propertyRevenue: 3200 },
              { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 22, users: 16, views: 835, vehicleRevenue: 4400, transferRevenue: 6300, propertyRevenue: 2400 },
              { date: new Date().toISOString().split('T')[0], locations: 9, reviews: 40, users: 25, views: 1185, vehicleRevenue: 5000, transferRevenue: 7200, propertyRevenue: 2900 }
            ]
          }
        };
      }
      
      setDashboardData(data);
    } catch (err: any) {
      setError(err.message || 'Kontrol paneli verileri yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}B`;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const formatDateTurkish = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Premium gradient generator
  const getGradientStyle = (color1: string, color2: string, opacity = 0.1) => ({
    background: `linear-gradient(135deg, ${color1}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${color2}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`
  });

  // Loading animation component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-gray-200 animate-spin"></div>
        <div className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-transparent border-t-red-500 animate-spin"></div>
      </div>
    </div>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review': return <MessageSquare className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'vehicle': return <Car className="w-4 h-4" />;
      case 'transfer': return <Bus className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'review': return 'Değerlendirme';
      case 'user': return 'Kullanıcı';
      case 'location': return 'Lokasyon';
      case 'photo': return 'Fotoğraf';
      case 'vehicle': return 'Araç Kiralama';
      case 'transfer': return 'Transfer';
      default: return 'Aktivite';
    }
  };

  // LyDian tema renkleri
  const AILYDIAN_COLORS = {
    primary: '#FF214D',
    secondary: '#FF6A45', 
    dark: '#0A0A0B',
    light: '#F3F4F6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    purple: '#8b5cf6',
    blue: '#3b82f6'
  };

  const CHART_COLORS = [AILYDIAN_COLORS.primary, AILYDIAN_COLORS.secondary, AILYDIAN_COLORS.blue, AILYDIAN_COLORS.success, AILYDIAN_COLORS.purple];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin mx-auto" style={{animationDuration: '1.5s'}}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Kontrol Paneli Yükleniyor</h3>
          <p className="text-gray-300">Veriler hazırlanıyor, lütfen bekleyin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Bir Hata Oluştu</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Yönetici Paneli - Travel LyDian</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Travel LyDian yönetici kontrol paneli" />
      </Head>

      <div className="min-h-screen" style={{background: `linear-gradient(135deg, ${AILYDIAN_COLORS.dark} 0%, #1f1f23 50%, #2d2d35 100%)`}}>
        {/* Top Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}>
                  <Sparkles className="w-5 h-5 text-white m-1.5" />
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Travel LyDian Yönetici Paneli
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    Hoşgeldin, {adminData?.email}
                  </span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}20)`, color: AILYDIAN_COLORS.primary}}>
                  {adminData?.role === 'super_admin' ? 'Üst Yönetici' : adminData?.role === 'admin' ? 'Yönetici' : 'Modüratör'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Çıkış</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Navigation */}
        <div className="flex">
          <nav className="bg-gray-900/95 backdrop-blur-sm w-64 min-h-screen border-r border-gray-700">
            <div className="p-4">
              <div className="space-y-2">
                <Link href="/admin/dashboard" className="flex items-center space-x-3 text-white rounded-lg px-3 py-2" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60`}}>
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Kontrol Paneli</span>
                </Link>
                <Link href="/admin/locations" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>Lokasyonlar</span>
                </Link>
                <Link href="/admin/users" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Users className="w-5 h-5" />
                  <span>Kullanıcılar</span>
                </Link>
                <Link href="/admin/reviews" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <MessageSquare className="w-5 h-5" />
                  <span>Değerlendirmeler</span>
                </Link>
                <Link href="/admin/platforms" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Globe className="w-5 h-5" />
                  <span>Harici Platformlar</span>
                </Link>
                <div className="my-2 border-t border-gray-700"></div>
                <Link href="/admin/vehicles" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Car className="w-5 h-5" />
                  <span>Araç Kiralama</span>
                </Link>
                <Link href="/admin/transfers" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Bus className="w-5 h-5" />
                  <span>Transfer Hizmetleri</span>
                </Link>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400 text-center">
                  <p>Travel LyDian</p>
                  <p className="mt-1">Versiyon 2.0</p>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {dashboardData && (
              <>
                {/* Page Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-1">
                    Kontrol Paneli
                  </h1>
                  <p className="text-gray-400 text-sm">
                    LyDian Admin Panelinize Hoş Geldiniz
                  </p>
                </div>

                {/* Property Owner Stats Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white mb-4">Property Owner Stats</h2>
                </div>
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <MapPin className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Lokasyonlar</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.overview.totalLocations)}
                        </p>
                        <p className="text-xs flex items-center" style={{color: AILYDIAN_COLORS.success}}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {formatPercentage(dashboardData.overview.monthlyGrowth.locations)} bu ay
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <MessageSquare className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Değerlendirmeler</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.overview.totalReviews)}
                        </p>
                        <p className="text-xs flex items-center" style={{color: AILYDIAN_COLORS.success}}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {formatPercentage(dashboardData.overview.monthlyGrowth.reviews)} bu ay
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}20, ${AILYDIAN_COLORS.purple}40)`}}>
                        <Users className="w-6 h-6" style={{color: AILYDIAN_COLORS.purple}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Kullanıcılar</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.overview.totalUsers)}
                        </p>
                        <p className="text-xs flex items-center" style={{color: AILYDIAN_COLORS.success}}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {formatPercentage(dashboardData.overview.monthlyGrowth.users)} bu ay
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-yellow-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.warning}40)`}}>
                        <Camera className="w-6 h-6" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Fotoğraflar</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.overview.totalPhotos)}
                        </p>
                        <p className="text-xs text-gray-500">Toplam medya içeriği</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 hover:shadow-xl transition-all transform hover:scale-105" style={{border: `1px solid ${AILYDIAN_COLORS.secondary}40`}}>
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}40)`}}>
                        <Star className="w-6 h-6" style={{color: AILYDIAN_COLORS.secondary}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Ortalama Puan</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {dashboardData.overview.averageRating.toFixed(1)}
                        </p>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= Math.floor(dashboardData.overview.averageRating)
                                  ? 'fill-current'
                                  : 'text-gray-300'
                              }`}
                              style={{
                                color: star <= Math.floor(dashboardData.overview.averageRating) 
                                  ? AILYDIAN_COLORS.warning 
                                  : undefined
                              }}
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">5 üzerinden</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Rental Stats Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white mb-4">Vehicle Rental Stats</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <Car className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Total Vehicles</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.vehicleRental.totalVehicles)}
                        </p>
                        <p className="text-xs text-gray-500">Filo büyüklüğü</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <Calendar className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Active Rentals</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.vehicleRental.activeRentals)}
                        </p>
                        <p className="text-xs text-gray-500">Devam eden kiralama</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <DollarSign className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          ₺{formatNumber(dashboardData.vehicleRental.monthlyRevenue)}
                        </p>
                        <p className="text-xs text-gray-500">Aylık gelir</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <TrendingUp className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Growth</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatPercentage(dashboardData.vehicleRental.growth)}
                        </p>
                        <p className="text-xs flex items-center" style={{color: AILYDIAN_COLORS.success}}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Bu ay
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfer Service Stats Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white mb-4">Transfer Service Stats</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <Bus className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Total Fleet</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.transferService.totalFleet)}
                        </p>
                        <p className="text-xs text-gray-500">Transfer araçları</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <Navigation className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Active Transfers</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {formatNumber(dashboardData.transferService.activeTransfers)}
                        </p>
                        <p className="text-xs text-gray-500">Devam eden transfer</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <DollarSign className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          ₺{formatNumber(dashboardData.transferService.monthlyRevenue)}
                        </p>
                        <p className="text-xs text-gray-500">Aylık gelir</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <CheckCircle className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">On-Time Rate</p>
                        <p className="text-2xl font-bold text-white mb-0.5">
                          {dashboardData.transferService.onTimeRate.toFixed(1)}%
                        </p>
                        <p className="text-xs flex items-center" style={{color: AILYDIAN_COLORS.success}}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Zamanında teslimat
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Unified Revenue Chart */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}20)`}}>
                          <BarChart3 className="w-5 h-5" style={{color: AILYDIAN_COLORS.primary}} />
                        </div>
                        <h3 className="text-base font-bold text-white">Birleşik Gelir Grafiği</h3>
                      </div>
                      <div className="flex space-x-1">
                        <button className="px-3 py-1 text-xs text-white rounded-lg transition-colors" style={{background: AILYDIAN_COLORS.primary}}>30G</button>
                        <button className="px-3 py-1 text-xs text-gray-300 hover:bg-gray-100 rounded-lg transition-colors">7G</button>
                        <button className="px-3 py-1 text-xs text-gray-300 hover:bg-gray-100 rounded-lg transition-colors">24S</button>
                      </div>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData.analytics.dailyStats}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                            stroke="#666"
                          />
                          <YAxis stroke="#666" />
                          <Tooltip
                            labelFormatter={(date) => formatDateTurkish(date)}
                            formatter={(value) => `₺${formatNumber(Number(value))}`}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: 'none',
                              borderRadius: '12px',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="propertyRevenue"
                            stackId="1"
                            stroke="#FF214D"
                            fill="#FF214D"
                            fillOpacity={0.6}
                            name="Property (Mülk)"
                          />
                          <Area
                            type="monotone"
                            dataKey="vehicleRevenue"
                            stackId="1"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.6}
                            name="Vehicle (Araç)"
                          />
                          <Area
                            type="monotone"
                            dataKey="transferRevenue"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                            name="Transfer"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.secondary}20)`}}>
                        <Award className="w-5 h-5" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <h3 className="text-base font-bold text-white">En Popüler Lokasyonlar</h3>
                    </div>
                    <div className="space-y-3">
                      {dashboardData.topLocations.map((location, index) => (
                        <div key={location.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all hover:scale-102">
                          <div className="flex items-center">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{
                                background: index === 0 
                                  ? `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`
                                  : index === 1
                                  ? `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}, ${AILYDIAN_COLORS.purple})`
                                  : `linear-gradient(45deg, ${AILYDIAN_COLORS.success}, ${AILYDIAN_COLORS.warning})`
                              }}
                            >
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <p className="font-semibold text-white">{location.name}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-300">
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 mr-1 fill-current" style={{color: AILYDIAN_COLORS.warning}} />
                                  {location.rating}
                                </span>
                                <span>{location.reviews} değerlendirme</span>
                                <span>{formatNumber(location.views)} görüntüleme</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.blue}20)`}}>
                          <Activity className="w-5 h-5" style={{color: AILYDIAN_COLORS.success}} />
                        </div>
                        <h3 className="text-base font-bold text-white">Son Aktiviteler</h3>
                      </div>
                      <button 
                        onClick={fetchDashboardData}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg transition-all" 
                        style={{background: `${AILYDIAN_COLORS.primary}10`}}
                        onMouseEnter={(e) => e.currentTarget.style.background = AILYDIAN_COLORS.primary}
                        onMouseLeave={(e) => e.currentTarget.style.background = `${AILYDIAN_COLORS.primary}10`}
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Yenile</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {dashboardData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all hover:bg-gray-50/50">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{
                              background: activity.type === 'review'
                                ? `linear-gradient(45deg, ${AILYDIAN_COLORS.success}, ${AILYDIAN_COLORS.blue})`
                                : activity.type === 'user'
                                ? `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}, ${AILYDIAN_COLORS.primary})`
                                : activity.type === 'location'
                                ? `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}, ${AILYDIAN_COLORS.secondary})`
                                : activity.type === 'vehicle'
                                ? `linear-gradient(45deg, ${AILYDIAN_COLORS.success}, #16a34a)`
                                : activity.type === 'transfer'
                                ? `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}, #2563eb)`
                                : `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`
                            }}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-white">{activity.description}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{formatDateTurkish(activity.timestamp)}</span>
                                  </div>
                                  {activity.user && (
                                    <span className="flex items-center">
                                      <Users className="w-3 h-3 mr-1" />
                                      {activity.user}
                                    </span>
                                  )}
                                  {activity.location && (
                                    <span className="flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {activity.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span 
                                className="text-xs px-2 py-1 rounded-full font-medium"
                                style={{
                                  background: `${AILYDIAN_COLORS.primary}10`,
                                  color: AILYDIAN_COLORS.primary
                                }}
                              >
                                {getActivityTypeText(activity.type)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Status & Actions */}
                  <div className="space-y-6">
                    {/* External Platform Stats */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.purple}20)`}}>
                          <Globe className="w-5 h-5" style={{color: AILYDIAN_COLORS.blue}} />
                        </div>
                        <h4 className="text-base font-bold text-white">Harici Platformlar</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-200">Google Senkronize</span>
                          <span className="font-bold text-green-600">{formatNumber(dashboardData.platformStats.googleSynced)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-200">TripAdvisor Senkronize</span>
                          <span className="font-bold text-blue-600">{formatNumber(dashboardData.platformStats.tripAdvisorSynced)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-200">Senkronizasyon Hatası</span>
                          <span className="font-bold text-red-600">{dashboardData.platformStats.syncErrors}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            Son senkronizasyon: {formatDateTurkish(dashboardData.platformStats.lastSync)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Moderation Queue */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.error}20)`}}>
                          <AlertTriangle className="w-5 h-5" style={{color: AILYDIAN_COLORS.warning}} />
                        </div>
                        <h4 className="text-base font-bold text-white">Modürasyon Kuyruğu</h4>
                      </div>
                      <div className="space-y-3">
                        <Link href="/admin/reviews?status=pending" className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all hover:scale-105">
                          <span className="font-medium text-orange-800">Bekleyen Değerlendirmeler</span>
                          <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                            {dashboardData.moderationQueue.pendingReviews}
                          </span>
                        </Link>
                        <Link href="/admin/content?flagged=true" className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-all hover:scale-105">
                          <span className="font-medium text-red-800">Bayraklı İçerik</span>
                          <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-bold">
                            {dashboardData.moderationQueue.flaggedContent}
                          </span>
                        </Link>
                        <Link href="/admin/users?reported=true" className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all hover:scale-105">
                          <span className="font-medium text-yellow-800">Raporlanan Kullanıcılar</span>
                          <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                            {dashboardData.moderationQueue.reportedUsers}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}20)`}}>
                          <Zap className="w-5 h-5" style={{color: AILYDIAN_COLORS.primary}} />
                        </div>
                        <h4 className="text-base font-bold text-white">Hızlı İşlemler</h4>
                      </div>
                      <div className="space-y-3">
                        <Link href="/admin/locations/new" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}>
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Yeni Lokasyon Ekle
                        </Link>
                        <Link href="/admin/vehicles/new" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}, #16a34a)`}}>
                          <Car className="w-4 h-4 inline mr-2" />
                          Yeni Araç Ekle
                        </Link>
                        <Link href="/admin/transfers/new" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}, #2563eb)`}}>
                          <Bus className="w-4 h-4 inline mr-2" />
                          Yeni Transfer Oluştur
                        </Link>
                        <Link href="/admin/sync" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}, ${AILYDIAN_COLORS.warning})`}}>
                          <RefreshCw className="w-4 h-4 inline mr-2" />
                          Platformları Senkronize Et
                        </Link>
                        <Link href="/admin/export" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, #6366f1, #8b5cf6)`}}>
                          <Download className="w-4 h-4 inline mr-2" />
                          Veri Dışa Aktar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}