import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Navigation,
  Users,
  Car,
  Clock,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Star,
  Route,
  Activity,
  Zap,
  BarChart3,
  PieChart,
  Map,
  Phone,
  MessageCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
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
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

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
  ArcElement
);

interface TransferStats {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
    forecast: number;
  };
  transfers: {
    total: number;
    completed: number;
    active: number;
    upcoming: number;
    cancelled: number;
  };
  fleet: {
    total: number;
    active: number;
    available: number;
    maintenance: number;
  };
  drivers: {
    total: number;
    active: number;
    available: number;
    onBreak: number;
  };
  performance: {
    onTimeRate: number;
    customerRating: number;
    completionRate: number;
    averageWaitTime: number;
  };
}

interface RouteOptimization {
  routeId: string;
  from: string;
  to: string;
  currentDuration: number;
  optimizedDuration: number;
  savings: number;
  savingsPercentage: number;
  traffic: 'low' | 'medium' | 'high';
  suggestedRoute: string;
}

interface ActiveTransfer {
  id: string;
  customer: string;
  driver: string;
  vehicle: string;
  from: string;
  to: string;
  pickupTime: string;
  status: 'waiting' | 'picked_up' | 'in_transit' | 'completed';
  currentLocation: string;
  eta: string;
  price: number;
}

interface DriverPerformance {
  id: string;
  name: string;
  photo: string;
  completedToday: number;
  rating: number;
  onTimeRate: number;
  revenue: number;
  status: 'active' | 'available' | 'break';
}

interface Alert {
  id: string;
  type: 'delay' | 'traffic' | 'maintenance' | 'customer_request' | 'route_change';
  severity: 'info' | 'warning' | 'urgent';
  title: string;
  description: string;
  time: string;
}

const TransferProviderDashboard: React.FC = () => {
  const [stats, setStats] = useState<TransferStats | null>(null);
  const [routeOptimizations, setRouteOptimizations] = useState<RouteOptimization[]>([]);
  const [activeTransfers, setActiveTransfers] = useState<ActiveTransfer[]>([]);
  const [driverPerformance, setDriverPerformance] = useState<DriverPerformance[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/partner/transfer/dashboard');
      const data = await response.json();

      setStats(data.stats);
      setRouteOptimizations(data.routeOptimizations);
      setActiveTransfers(data.activeTransfers);
      setDriverPerformance(data.driverPerformance);
      setAlerts(data.alerts);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setSyncStatus('error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Real-time sync every 30 seconds
    const syncInterval = setInterval(() => {
      setSyncStatus('syncing');
      fetchDashboardData();
      setTimeout(() => setSyncStatus('synced'), 1000);
    }, 30000);

    return () => clearInterval(syncInterval);
  }, []);

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Revenue chart data
  const revenueChartData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        label: 'Günlük Gelir (₺)',
        data: [12000, 15000, 13500, 18000, 22000, 25000, 20000],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Route performance chart
  const routeChartData = {
    labels: ['İstanbul Havalimanı', 'Taksim', 'Kadıköy', 'Beşiktaş', 'Ataşehir'],
    datasets: [
      {
        label: 'Transfer Sayısı',
        data: [45, 32, 28, 25, 20],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(6, 182, 212, 0.8)'
        ]
      }
    ]
  };

  // Fleet status pie chart
  const fleetStatusData = {
    labels: ['Aktif', 'Müsait', 'Bakımda'],
    datasets: [
      {
        data: [stats.fleet.active, stats.fleet.available, stats.fleet.maintenance],
        backgroundColor: ['#10b981', '#3b82f6', '#ef4444']
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Transfer Partner Dashboard | Travel Ailydian</title>
        <meta name="description" content="Transfer provider dashboard with route optimization" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Car className="h-8 w-8 text-purple-600" />
                  Transfer Partner Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Rota optimizasyonu, sürücü yönetimi ve gerçek zamanlı takip
                </p>
              </div>

              {/* Sync Status */}
              <div className="flex items-center gap-2">
                {syncStatus === 'synced' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Senkronize</span>
                  </div>
                )}
                {syncStatus === 'syncing' && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-medium">Güncelleniyor...</span>
                  </div>
                )}
                {syncStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Hata</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Critical Alerts */}
          {alerts.filter(a => a.severity === 'urgent').length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2">Acil Durumlar</h3>
                  {alerts.filter(a => a.severity === 'urgent').map(alert => (
                    <div key={alert.id} className="text-sm text-red-800 mb-1">
                      • {alert.title} - {alert.description}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Today's Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                {stats.revenue.growth > 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">Bugünkü Gelir</p>
              <p className="text-2xl font-bold text-gray-900">
                ₺{stats.revenue.today.toLocaleString()}
              </p>
              <p className={`text-xs mt-2 ${stats.revenue.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.revenue.growth > 0 ? '+' : ''}{stats.revenue.growth}% geçen haftaya göre
              </p>
            </motion.div>

            {/* Active Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                  Aktif
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Devam Eden Transferler</p>
              <p className="text-2xl font-bold text-gray-900">{stats.transfers.active}</p>
              <p className="text-xs text-gray-500 mt-2">
                {stats.transfers.upcoming} yaklaşan rezervasyon
              </p>
            </motion.div>

            {/* On-Time Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Zamanında Varış Oranı</p>
              <p className="text-2xl font-bold text-gray-900">{stats.performance.onTimeRate}%</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${stats.performance.onTimeRate}%` }}
                ></div>
              </div>
            </motion.div>

            {/* Customer Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(stats.performance.customerRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Müşteri Memnuniyeti</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.performance.customerRating.toFixed(1)}/5.0
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {stats.transfers.completed} tamamlanmış transfer
              </p>
            </motion.div>
          </div>

          {/* Active Transfers Real-Time */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Active Transfers List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-purple-600" />
                  Aktif Transferler
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full animate-pulse">
                  Canlı
                </span>
              </div>

              <div className="space-y-4">
                {activeTransfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{transfer.customer}</p>
                        <p className="text-sm text-gray-600">Sürücü: {transfer.driver}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          transfer.status === 'in_transit'
                            ? 'bg-blue-100 text-blue-800'
                            : transfer.status === 'picked_up'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transfer.status === 'in_transit'
                          ? 'Yolda'
                          : transfer.status === 'picked_up'
                          ? 'Alındı'
                          : 'Bekliyor'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{transfer.from}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>{transfer.to}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>ETA: {transfer.eta}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Car className="h-4 w-4" />
                          <span>{transfer.vehicle}</span>
                        </div>
                      </div>
                      <p className="font-bold text-purple-600">₺{transfer.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                <Map className="h-5 w-5" />
                Haritada Görüntüle
              </button>
            </motion.div>

            {/* Route Optimization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  AI Rota Optimizasyonu
                </h2>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                  AI Powered
                </span>
              </div>

              <div className="space-y-4">
                {routeOptimizations.map((route) => (
                  <div
                    key={route.routeId}
                    className="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Route className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {route.from} → {route.to}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Önerilen: {route.suggestedRoute}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded ${
                          route.traffic === 'low'
                            ? 'bg-green-100 text-green-800'
                            : route.traffic === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {route.traffic === 'low' ? 'Az' : route.traffic === 'medium' ? 'Orta' : 'Yoğun'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-600">Mevcut Süre</p>
                        <p className="text-lg font-bold text-gray-900">{route.currentDuration} dk</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Optimize Süre</p>
                        <p className="text-lg font-bold text-green-600">{route.optimizedDuration} dk</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                      <div>
                        <p className="text-xs text-gray-600">Kazanç</p>
                        <p className="text-sm font-bold text-green-600">
                          {route.savings} dk (%{route.savingsPercentage})
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Uygula
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">
                      AI Optimizasyon Özeti
                    </p>
                    <p className="text-xs text-blue-800">
                      Bu hafta toplam <span className="font-bold">142 dakika</span> tasarruf edildi.
                      Optimizasyon ile ortalama <span className="font-bold">%18</span> daha hızlı ulaşım sağlandı.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Driver Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Sürücü Performansı
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {stats.drivers.active}/{stats.drivers.total} aktif
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Sürücü
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Durum
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Bugün
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Puan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Zamanında
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      Gelir
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      İletişim
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {driverPerformance.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                            {driver.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{driver.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            driver.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : driver.status === 'available'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {driver.status === 'active'
                            ? 'Aktif'
                            : driver.status === 'available'
                            ? 'Müsait'
                            : 'Mola'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-gray-900">{driver.completedToday}</span>
                        <span className="text-xs text-gray-600 ml-1">transfer</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-gray-900">{driver.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${driver.onTimeRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {driver.onTimeRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-purple-600">
                          ₺{driver.revenue.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                            <Phone className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Haftalık Gelir Trendi
              </h2>
              <Line data={revenueChartData} options={{ responsive: true, maintainAspectRatio: true }} />
            </motion.div>

            {/* Popular Routes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-600" />
                Popüler Rotalar
              </h2>
              <Bar data={routeChartData} options={{ responsive: true, maintainAspectRatio: true }} />
            </motion.div>
          </div>

          {/* Fleet Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Car className="h-5 w-5 text-purple-600" />
              Filo Durumu
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Pie data={fleetStatusData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Aktif Araçlar</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats.fleet.active}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Müsait Araçlar</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{stats.fleet.available}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Bakımda</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{stats.fleet.maintenance}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TransferProviderDashboard;
