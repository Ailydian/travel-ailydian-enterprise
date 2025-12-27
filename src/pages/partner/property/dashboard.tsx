import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  Eye,
  MousePointer,
  Star,
  Bell,
  MessageSquare,
  Settings,
  BarChart3,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Home
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Property Owner Dashboard - Airbnb style advanced analytics
// Real-time sync with main admin dashboard
// AI-powered pricing optimization

interface DashboardStats {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
    forecast: number; // 3 month AI forecast
    growth: number; // percentage
  };
  bookings: {
    upcoming: number;
    completed: number;
    cancelled: number;
    pending: number;
  };
  occupancy: {
    current: number; // percentage
    average: number;
    target: number;
  };
  analytics: {
    views: number;
    clicks: number;
    conversionRate: number;
    averageStayLength: number;
    repeatGuestRate: number;
  };
  pricing: {
    currentPrice: number;
    suggestedPrice: number;
    competitorAverage: number;
    optimizationOpportunity: number; // percentage increase potential
  };
}

interface Notification {
  id: string;
  type: 'booking' | 'cancellation' | 'review' | 'message' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

const PropertyOwnerDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [revenueHistory, setRevenueHistory] = useState<RevenueDataPoint[]>([]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/partner/property/dashboard');
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
          setNotifications(data.notifications);
          setRevenueHistory(data.revenueHistory);
          setLastSyncTime(new Date(data.lastSync));
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Real-time sync every 30 seconds
    const syncInterval = setInterval(() => {
      setSyncStatus('syncing');
      fetchDashboardData();
      setTimeout(() => setSyncStatus('synced'), 1000);
    }, 30000);

    return () => clearInterval(syncInterval);
  }, []);

  // Revenue chart data
  const revenueChartData = {
    labels: revenueHistory.map(d => d.date),
    datasets: [
      {
        label: 'Gelir (₺)',
        data: revenueHistory.map(d => d.revenue),
        fill: true,
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderColor: 'rgba(147, 51, 234, 1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)'
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `₺${value.toLocaleString()}`
        }
      }
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-white/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/5">
      {/* Header */}
      <div className="bg-white/5 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Home className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-bold text-white">
                Property Dashboard
              </h1>

              {/* Sync Status */}
              <div className="flex items-center gap-2 text-sm">
                {syncStatus === 'synced' && (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Senkronize</span>
                  </>
                )}
                {syncStatus === 'syncing' && (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-600 font-medium">Güncelleniyor...</span>
                  </>
                )}
                <span className="text-gray-200">
                  {lastSyncTime.toLocaleTimeString('tr-TR')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-300 hover:bg-white/10 rounded-lg">
                <Bell className="h-5 w-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() => router.push('/partner/property/settings')}
                className="p-2 text-gray-300 hover:bg-white/10 rounded-lg"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 opacity-80" />
              {stats.revenue.growth > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-300" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-300" />
              )}
            </div>
            <p className="text-purple-200 text-sm mb-1">Bu Ay Gelir</p>
            <p className="text-3xl font-bold mb-2">
              ₺{stats.revenue.thisMonth.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                stats.revenue.growth > 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {stats.revenue.growth > 0 ? '+' : ''}{stats.revenue.growth}%
              </span>
              <span className="text-xs text-purple-200">geçen aya göre</span>
            </div>
          </motion.div>

          {/* Upcoming Bookings Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                Yeni
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-1">Yaklaşan Rezervasyonlar</p>
            <p className="text-3xl font-bold text-white mb-2">
              {stats.bookings.upcoming}
            </p>
            <p className="text-xs text-gray-200">
              {stats.bookings.pending} beklemede
            </p>
          </motion.div>

          {/* Occupancy Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-green-600" />
              <div className="text-right">
                <p className="text-xs text-gray-200">Hedef</p>
                <p className="text-sm font-bold text-white">
                  %{stats.occupancy.target}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-1">Doluluk Oranı</p>
            <p className="text-3xl font-bold text-white mb-2">
              %{stats.occupancy.current}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${stats.occupancy.current}%` }}
              ></div>
            </div>
          </motion.div>

          {/* Conversion Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <MousePointer className="h-8 w-8 text-orange-600" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-gray-300 text-sm mb-1">Dönüşüm Oranı</p>
            <p className="text-3xl font-bold text-white mb-2">
              %{stats.analytics.conversionRate.toFixed(1)}
            </p>
            <p className="text-xs text-gray-200">
              {stats.analytics.views.toLocaleString()} görüntüleme
            </p>
          </motion.div>
        </div>

        {/* Revenue Chart & AI Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white/5 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Gelir Trendi</h3>
                <p className="text-sm text-gray-200">Son 30 gün</p>
              </div>
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>

            <Line data={revenueChartData} options={revenueChartOptions} />

            {/* Forecast */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-100 mb-1">
                    AI Tahmini (Sonraki 3 Ay)
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₺{stats.revenue.forecast.toLocaleString()}
                  </p>
                </div>
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* AI Pricing Optimization */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold text-white">
                AI Fiyat Önerisi
              </h3>
            </div>

            {/* Current vs Suggested */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-gray-100 mb-1">Mevcut Fiyat</p>
                <p className="text-2xl font-bold text-white">
                  ₺{stats.pricing.currentPrice.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div>
                <p className="text-xs text-gray-100 mb-1">Önerilen Fiyat</p>
                <p className="text-3xl font-bold text-green-600">
                  ₺{stats.pricing.suggestedPrice.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 font-semibold mt-1">
                  +%{stats.pricing.optimizationOpportunity} potansiyel artış
                </p>
              </div>
            </div>

            {/* Competitor Comparison */}
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-100 mb-2">Rakip Ortalaması</p>
              <p className="text-xl font-bold text-white">
                ₺{stats.pricing.competitorAverage.toLocaleString()}
              </p>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Önerilen Fiyatı Uygula
            </button>

            <p className="text-xs text-gray-200 mt-3 text-center">
              AI, rakip fiyatları ve talep trendlerini analiz eder
            </p>
          </div>
        </div>

        {/* Analytics & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detailed Analytics */}
          <div className="bg-white/5 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">
              Detaylı Analitik
            </h3>

            <div className="space-y-4">
              {/* Views */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Görüntüleme
                    </p>
                    <p className="text-xs text-gray-200">Bu ay</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  {stats.analytics.views.toLocaleString()}
                </p>
              </div>

              {/* Clicks */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <MousePointer className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Tıklama
                    </p>
                    <p className="text-xs text-gray-200">Rezervasyon sayfası</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  {stats.analytics.clicks.toLocaleString()}
                </p>
              </div>

              {/* Average Stay */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Ortalama Konaklama
                    </p>
                    <p className="text-xs text-gray-200">Gece sayısı</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  {stats.analytics.averageStayLength.toFixed(1)}
                </p>
              </div>

              {/* Repeat Guests */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Tekrar Gelen Misafir
                    </p>
                    <p className="text-xs text-gray-200">Sadakat oranı</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  %{stats.analytics.repeatGuestRate}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white/5 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Bildirimler</h3>
              <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                Tümünü Gör
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.slice(0, 6).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.urgent
                      ? 'bg-red-50 border-red-500'
                      : notification.read
                      ? 'bg-white/5 border-gray-300'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.type === 'booking' && (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    {notification.type === 'cancellation' && (
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    {notification.type === 'review' && (
                      <Star className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    {notification.type === 'message' && (
                      <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-100 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-200 mt-2">
                        {notification.time}
                      </p>
                    </div>

                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOwnerDashboard;
