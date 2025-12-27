import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Car,
  Users,
  Clock,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Star,
  Settings,
  Activity,
  MapPin,
  Phone,
  MessageCircle,
  FileText,
  Wrench,
  Gauge,
  Fuel,
  Shield,
  Award,
  BarChart3,
  PieChart,
  RefreshCw,
  User,
  Navigation
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import logger from '../../../../../lib/logger';

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

interface VehicleStats {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
    forecast: number;
  };
  bookings: {
    total: number;
    completed: number;
    active: number;
    upcoming: number;
    cancelled: number;
  };
  vehicles: {
    total: number;
    active: number;
    available: number;
    maintenance: number;
  };
  drivers: {
    total: number;
    active: number;
    available: number;
    certified: number;
  };
  performance: {
    customerRating: number;
    driverRating: number;
    completionRate: number;
    repeatCustomerRate: number;
  };
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  type: 'sedan' | 'suv' | 'luxury' | 'vip';
  capacity: number;
  status: 'available' | 'booked' | 'maintenance' | 'cleaning';
  driver: string;
  currentBooking?: string;
  totalKm: number;
  lastMaintenance: string;
  nextMaintenance: string;
  fuelLevel: number;
  insuranceExpiry: string;
  inspectionExpiry: string;
  dailyRate: number;
  utilization: number;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseType: string;
  experienceYears: number;
  rating: number;
  completedTrips: number;
  status: 'active' | 'available' | 'off_duty';
  currentVehicle?: string;
  languages: string[];
  certificates: string[];
  earnings: number;
}

interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: 'scheduled' | 'urgent' | 'overdue';
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface Booking {
  id: string;
  customer: string;
  vehicle: string;
  driver: string;
  startDate: string;
  endDate: string;
  days: number;
  pickupLocation: string;
  destination: string;
  price: number;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  services: string[];
}

const VehicleOwnerDashboard: React.FC = () => {
  const [stats, setStats] = useState<VehicleStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'vehicles' | 'drivers' | 'bookings'>('overview');

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/partner/vehicle/dashboard');
      const data = await response.json();

      setStats(data.stats);
      setVehicles(data.vehicles);
      setDrivers(data.drivers);
      setMaintenanceAlerts(data.maintenanceAlerts);
      setBookings(data.bookings);
      setLoading(false);
    } catch (error) {
      logger.error('Failed to fetch dashboard data:', error as Error, {component:'Dashboard'});
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
      <div className="min-h-screen bg-white/5 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Revenue chart data
  const revenueChartData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Aylık Gelir (₺)',
        data: [450000, 520000, 580000, 640000, 690000, 720000],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Vehicle type distribution
  const vehicleTypeData = {
    labels: ['Sedan', 'SUV', 'Luxury', 'VIP'],
    datasets: [
      {
        data: [
          vehicles.filter(v => v.type === 'sedan').length,
          vehicles.filter(v => v.type === 'suv').length,
          vehicles.filter(v => v.type === 'luxury').length,
          vehicles.filter(v => v.type === 'vip').length
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
      }
    ]
  };

  // Booking status chart
  const bookingStatusData = {
    labels: ['Tamamlandı', 'Aktif', 'Yaklaşan', 'İptal'],
    datasets: [
      {
        label: 'Rezervasyon Sayısı',
        data: [stats.bookings.completed, stats.bookings.active, stats.bookings.upcoming, stats.bookings.cancelled],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Şoförlü Araç Partner Dashboard | Travel LyDian</title>
        <meta name="description" content="Vehicle owner dashboard with driver management" />
      </Head>

      <div className="min-h-screen bg-white/5">
        {/* Header */}
        <div className="bg-white/5 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Car className="h-8 w-8 text-purple-600" />
                  Şoförlü Araç Partner Dashboard
                </h1>
                <p className="text-sm text-gray-100 mt-1">
                  Araç filosu, sürücü yönetimi ve rezervasyon takibi
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

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 mt-6 border-b border-gray-200">
              {['overview', 'vehicles', 'drivers', 'bookings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab as any)}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    selectedTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  {tab === 'overview' && 'Genel Bakış'}
                  {tab === 'vehicles' && 'Araçlar'}
                  {tab === 'drivers' && 'Sürücüler'}
                  {tab === 'bookings' && 'Rezervasyonlar'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Urgent Maintenance Alerts */}
          {maintenanceAlerts.filter(a => a.priority === 'high').length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2">Acil Bakım Uyarıları</h3>
                  {maintenanceAlerts.filter(a => a.priority === 'high').map(alert => (
                    <div key={alert.id} className="text-sm text-red-800 mb-1">
                      • {alert.vehicleName} - {alert.description} (Son tarih: {alert.dueDate})
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Monthly Revenue */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl shadow-md p-6"
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
                  <p className="text-sm text-gray-100 mb-1">Aylık Gelir</p>
                  <p className="text-2xl font-bold text-white">
                    ₺{stats.revenue.thisMonth.toLocaleString()}
                  </p>
                  <p className={`text-xs mt-2 ${stats.revenue.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.revenue.growth > 0 ? '+' : ''}{stats.revenue.growth}% geçen aya göre
                  </p>
                </motion.div>

                {/* Active Bookings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                      Aktif
                    </span>
                  </div>
                  <p className="text-sm text-gray-100 mb-1">Aktif Rezervasyonlar</p>
                  <p className="text-2xl font-bold text-white">{stats.bookings.active}</p>
                  <p className="text-xs text-gray-200 mt-2">
                    {stats.bookings.upcoming} yaklaşan rezervasyon
                  </p>
                </motion.div>

                {/* Fleet Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-green-600" />
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-100 mb-1">Müsait Araçlar</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.vehicles.available}/{stats.vehicles.total}
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(stats.vehicles.available / stats.vehicles.total) * 100}%` }}
                    ></div>
                  </div>
                </motion.div>

                {/* Customer Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 rounded-xl shadow-md p-6"
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
                  <p className="text-sm text-gray-100 mb-1">Müşteri Memnuniyeti</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.performance.customerRating.toFixed(1)}/5.0
                  </p>
                  <p className="text-xs text-gray-200 mt-2">
                    {stats.bookings.completed} tamamlanmış rezervasyon
                  </p>
                </motion.div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Trend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl shadow-md p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Gelir Trendi (6 Ay)
                  </h2>
                  <Line data={revenueChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                </motion.div>

                {/* Vehicle Type Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 rounded-xl shadow-md p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    Araç Tipi Dağılımı
                  </h2>
                  <Doughnut data={vehicleTypeData} options={{ responsive: true, maintainAspectRatio: true }} />
                </motion.div>
              </div>

              {/* Booking Status Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Rezervasyon Durumu
                </h2>
                <Bar data={bookingStatusData} options={{ responsive: true, maintainAspectRatio: true }} />
              </motion.div>
            </>
          )}

          {/* Vehicles Tab */}
          {selectedTab === 'vehicles' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Car className="h-5 w-5 text-purple-600" />
                Araç Filosu ({vehicles.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-white">{vehicle.brand} {vehicle.model}</p>
                        <p className="text-sm text-gray-100">{vehicle.year} • {vehicle.plateNumber}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          vehicle.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : vehicle.status === 'booked'
                            ? 'bg-blue-100 text-blue-800'
                            : vehicle.status === 'maintenance'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {vehicle.status === 'available' ? 'Müsait' : vehicle.status === 'booked' ? 'Rezerve' : vehicle.status === 'maintenance' ? 'Bakımda' : 'Temizlik'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-200">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.capacity} kişi</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <Gauge className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.totalKm.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <Fuel className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.fuelLevel}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>₺{vehicle.dailyRate}/gün</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-300">Sürücü:</span>
                        <span className="font-medium text-white">{vehicle.driver}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-300">Doluluk:</span>
                        <span className="font-medium text-purple-600">{vehicle.utilization}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${vehicle.utilization}%` }}
                        ></div>
                      </div>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                        Detayları Görüntüle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Drivers Tab */}
          {selectedTab === 'drivers' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Sürücü Kadrosu ({drivers.length})
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Sürücü</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Durum</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Deneyim</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Puan</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Sefer</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Gelir</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">Araç</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase">İletişim</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {drivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-white/5">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                              {driver.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{driver.name}</p>
                              <p className="text-xs text-gray-200">{driver.licenseType} Ehliyet</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full ${
                              driver.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : driver.status === 'available'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {driver.status === 'active' ? 'Aktif' : driver.status === 'available' ? 'Müsait' : 'İzinli'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-medium text-white">{driver.experienceYears} yıl</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-white">{driver.rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-medium text-white">{driver.completedTrips}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-bold text-purple-600">₺{driver.earnings.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-200">{driver.currentVehicle || '-'}</span>
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
          )}

          {/* Bookings Tab */}
          {selectedTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Rezervasyonlar ({bookings.length})
              </h2>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-white">{booking.customer}</p>
                        <p className="text-sm text-gray-100">{booking.vehicle} • {booking.driver}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          booking.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'completed'
                            ? 'bg-white/10 text-white'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status === 'active' ? 'Aktif' : booking.status === 'confirmed' ? 'Onaylandı' : booking.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-100">Başlangıç</p>
                        <p className="text-sm font-medium text-white">{booking.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-100">Bitiş</p>
                        <p className="text-sm font-medium text-white">{booking.endDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-100">Süre</p>
                        <p className="text-sm font-medium text-white">{booking.days} gün</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-100">Ücret</p>
                        <p className="text-sm font-bold text-purple-600">₺{booking.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-200">{booking.pickupLocation} → {booking.destination}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {booking.services.map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/10 text-gray-200 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleOwnerDashboard;
