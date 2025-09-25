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
  BarChart3, PieChart as PieChartIcon, Target, Award, Sparkles
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
  recentActivity: Array<{
    type: 'review' | 'user' | 'location' | 'photo';
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
          recentActivity: [
            {
              type: 'review',
              description: 'Sultanahmet Camii için yeni değerlendirme eklendi',
              timestamp: new Date().toISOString(),
              user: 'ahmet.y@example.com',
              location: 'Sultanahmet Camii'
            },
            {
              type: 'user',
              description: 'Yeni kullanıcı kayıt oldu',
              timestamp: new Date(Date.now() - 300000).toISOString(),
              user: 'zeynep.k@example.com'
            },
            {
              type: 'location',
              description: 'Galata Kulesi lokasyonu güncellendi',
              timestamp: new Date(Date.now() - 600000).toISOString(),
              location: 'Galata Kulesi'
            },
            {
              type: 'photo',
              description: 'Kapadokya için 5 yeni fotoğraf yüklendi',
              timestamp: new Date(Date.now() - 900000).toISOString(),
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
              { date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 6, reviews: 66, users: 20, views: 914 },
              { date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 35, users: 29, views: 606 },
              { date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 24, users: 24, views: 960 },
              { date: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 14, reviews: 25, users: 13, views: 1402 },
              { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 28, users: 15, views: 788 },
              { date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 22, users: 11, views: 575 },
              { date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 52, users: 20, views: 1475 },
              { date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 9, reviews: 50, users: 28, views: 1136 },
              { date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 43, users: 19, views: 768 },
              { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 57, users: 14, views: 1463 },
              { date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 23, users: 16, views: 1227 },
              { date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 11, reviews: 55, users: 13, views: 693 },
              { date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 6, reviews: 23, users: 11, views: 867 },
              { date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 12, reviews: 38, users: 26, views: 588 },
              { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 6, reviews: 58, users: 20, views: 1033 },
              { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 8, reviews: 60, users: 24, views: 946 },
              { date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 13, reviews: 33, users: 22, views: 745 },
              { date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 24, users: 27, views: 1296 },
              { date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 12, reviews: 20, users: 15, views: 1433 },
              { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 5, reviews: 41, users: 12, views: 1291 },
              { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 5, reviews: 25, users: 11, views: 1057 },
              { date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 13, reviews: 62, users: 14, views: 825 },
              { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 10, reviews: 57, users: 12, views: 1049 },
              { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 12, reviews: 28, users: 16, views: 1023 },
              { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 14, reviews: 48, users: 24, views: 778 },
              { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 8, reviews: 22, users: 10, views: 1466 },
              { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 13, reviews: 28, users: 15, views: 652 },
              { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 14, reviews: 68, users: 28, views: 1134 },
              { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], locations: 7, reviews: 22, users: 16, views: 835 },
              { date: new Date().toISOString().split('T')[0], locations: 9, reviews: 40, users: 25, views: 1185 }
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
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'review': return 'Değerlendirme';
      case 'user': return 'Kullanıcı';
      case 'location': return 'Lokasyon';
      case 'photo': return 'Fotoğraf';
      default: return 'Aktivite';
    }
  };

  // Ailydian tema renkleri
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Kontrol Paneli Yükleniyor</h3>
          <p className="text-gray-600">Veriler hazırlanıyor, lütfen bekleyin...</p>
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Bir Hata Oluştu</h3>
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
        <title>Yönetici Paneli - Travel Ailydian</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Travel Ailydian yönetici kontrol paneli" />
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
                  Travel Ailydian Yönetici Paneli
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    Hoşgeldin, {adminData?.email}
                  </span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}20)`, color: AILYDIAN_COLORS.primary}}>
                  {adminData?.role === 'super_admin' ? 'Üst Yönetici' : adminData?.role === 'admin' ? 'Yönetici' : 'Modüratör'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
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
              </div>
              
              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400 text-center">
                  <p>Travel Ailydian</p>
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
                    Ailydian Admin Panelinize Hoş Geldiniz
                  </p>
                </div>
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4 hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <MapPin className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Lokasyonlar</p>
                        <p className="text-2xl font-bold text-gray-900 mb-0.5">
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
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Değerlendirmeler</p>
                        <p className="text-2xl font-bold text-gray-900 mb-0.5">
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
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Kullanıcılar</p>
                        <p className="text-2xl font-bold text-gray-900 mb-0.5">
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
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Fotoğraflar</p>
                        <p className="text-2xl font-bold text-gray-900 mb-0.5">
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
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Ortalama Puan</p>
                        <p className="text-2xl font-bold text-gray-900 mb-0.5">
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

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Daily Activity Chart */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}20)`}}>
                          <BarChart3 className="w-5 h-5" style={{color: AILYDIAN_COLORS.primary}} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Günlük Aktivite</h3>
                      </div>
                      <div className="flex space-x-1">
                        <button className="px-3 py-1 text-xs text-white rounded-lg transition-colors" style={{background: AILYDIAN_COLORS.primary}}>30G</button>
                        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">7G</button>
                        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">24S</button>
                      </div>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={dashboardData.analytics.dailyStats}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                            stroke="#666"
                          />
                          <YAxis stroke="#666" />
                          <Tooltip 
                            labelFormatter={(date) => formatDateTurkish(date)}
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
                            dataKey="reviews" 
                            stackId="1" 
                            stroke={AILYDIAN_COLORS.success} 
                            fill={AILYDIAN_COLORS.success} 
                            fillOpacity={0.6} 
                            name="Değerlendirmeler"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="locations" 
                            stackId="1" 
                            stroke={AILYDIAN_COLORS.blue} 
                            fill={AILYDIAN_COLORS.blue} 
                            fillOpacity={0.6}
                            name="Lokasyonlar"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="users" 
                            stackId="1" 
                            stroke={AILYDIAN_COLORS.purple} 
                            fill={AILYDIAN_COLORS.purple} 
                            fillOpacity={0.6}
                            name="Kullanıcılar"
                          />
                          <Bar dataKey="views" fill={AILYDIAN_COLORS.primary} opacity={0.8} name="Görüntülemeler" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.secondary}20)`}}>
                        <Award className="w-5 h-5" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <h3 className="text-base font-bold text-gray-900">En Popüler Lokasyonlar</h3>
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
                              <p className="font-semibold text-gray-900">{location.name}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                        <h3 className="text-base font-bold text-gray-900">Son Aktiviteler</h3>
                      </div>
                      <button 
                        onClick={fetchDashboardData}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-white rounded-lg transition-all" 
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
                                : `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`
                            }}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
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
                        <h4 className="text-base font-bold text-gray-900">Harici Platformlar</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Google Senkronize</span>
                          <span className="font-bold text-green-600">{formatNumber(dashboardData.platformStats.googleSynced)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">TripAdvisor Senkronize</span>
                          <span className="font-bold text-blue-600">{formatNumber(dashboardData.platformStats.tripAdvisorSynced)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Senkronizasyon Hatası</span>
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
                        <h4 className="text-base font-bold text-gray-900">Modürasyon Kuyruğu</h4>
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
                        <h4 className="text-base font-bold text-gray-900">Hızlı İşlemler</h4>
                      </div>
                      <div className="space-y-3">
                        <Link href="/admin/locations/new" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}>
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Yeni Lokasyon Ekle
                        </Link>
                        <Link href="/admin/sync" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}, ${AILYDIAN_COLORS.blue})`}}>
                          <RefreshCw className="w-4 h-4 inline mr-2" />
                          Platformları Senkronize Et
                        </Link>
                        <Link href="/admin/export" className="block w-full text-center text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg font-semibold" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}, ${AILYDIAN_COLORS.warning})`}}>
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