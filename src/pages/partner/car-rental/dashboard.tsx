import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Car,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Wrench,
  DollarSign,
  BarChart3,
  MapPin,
  Fuel,
  Users,
  Clock,
  Settings,
  Bell,
  PieChart } from
'lucide-react';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import logger from '../../../lib/logger';

// Car Rental Owner Dashboard
// Fleet management, revenue tracking, maintenance alerts
// Real-time sync with main admin dashboard

interface FleetStats {
  total: number;
  available: number;
  booked: number;
  maintenance: number;
  utilizationRate: number;
}

interface RevenueStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  projectedMonth: number;
  growth: number;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'available' | 'booked' | 'maintenance';
  currentBooking?: {
    guestName: string;
    startDate: string;
    endDate: string;
    dailyRate: number;
  };
  nextMaintenance: string;
  totalKm: number;
  revenueThisMonth: number;
  utilizationRate: number;
}

interface MaintenanceAlert {
  vehicleId: string;
  vehicleName: string;
  type: 'scheduled' | 'urgent' | 'overdue';
  description: string;
  dueDate: string;
}

const CarRentalDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fleetStats, setFleetStats] = useState<FleetStats | null>(null);
  const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>([]);
  const [revenueHistory, setRevenueHistory] = useState<{date: string;revenue: number;}[]>([]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/partner/car-rental/dashboard');
        const data = await response.json();

        if (data.success) {
          setFleetStats(data.fleetStats);
          setRevenueStats(data.revenueStats);
          setVehicles(data.vehicles);
          setMaintenanceAlerts(data.maintenanceAlerts);
          setRevenueHistory(data.revenueHistory);
        }
      } catch (error) {
        logger.error('Failed to fetch dashboard data:', error as Error, { component: 'Dashboard' });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Real-time sync every 30 seconds
    const interval = setInterval(() => {
      setSyncStatus('syncing');
      fetchDashboardData();
      setTimeout(() => setSyncStatus('synced'), 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Fleet status chart data
  const fleetChartData = {
    labels: ['Müsait', 'Kiralanmış', 'Bakımda'],
    datasets: [
    {
      data: fleetStats ?
      [fleetStats.available, fleetStats.booked, fleetStats.maintenance] :
      [0, 0, 0],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
      borderWidth: 0
    }]

  };

  const fleetChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  // Revenue chart data
  const revenueChartData = {
    labels: revenueHistory.map((d) => d.date),
    datasets: [
    {
      label: 'Gelir (₺)',
      data: revenueHistory.map((d) => d.revenue),
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4
    }]

  };

  if (loading || !fleetStats || !revenueStats) {
    return (
      <div className="min-h-screen bg-lydian-glass-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lydian-primary mx-auto mb-4"></div>
          <p className="text-lydian-text-dim">Yükleniyor...</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-lydian-glass-dark">
      {/* Header */}
      <div className="bg-lydian-glass-dark border-b border-lydian-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Car className="h-6 w-6 text-lydian-primary" />
              <h1 className="text-xl font-bold text-lydian-text-inverse">Araç Kiralama Dashboard</h1>

              {/* Sync Status */}
              <div className="flex items-center gap-2 text-sm">
                {syncStatus === 'synced' ?
                <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-lydian-success font-medium">Senkronize</span>
                  </> :

                <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-lydian-warning font-medium">Güncelleniyor...</span>
                  </>
                }
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-lydian-text-dim hover:bg-lydian-glass-dark-medium rounded-lg">
                <Bell className="h-5 w-5" />
                {maintenanceAlerts.length > 0 &&
                <span className="absolute top-1 right-1 w-2 h-2 bg-lydian-error rounded-full"></span>
                }
              </button>

              <button
                onClick={() => router.push('/partner/car-rental/settings')}
                className="p-2 text-lydian-text-dim hover:bg-lydian-glass-dark-medium rounded-lg">

                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Fleet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">

            <div className="flex items-center justify-between mb-4">
              <Car className="h-8 w-8 text-lydian-primary" />
              <span className="text-xs font-semibold text-lydian-primary bg-lydian-primary-light px-2 py-1 rounded-full">
                FILO
              </span>
            </div>
            <p className="text-lydian-text-dim text-sm mb-1">Toplam Araç</p>
            <p className="text-3xl font-bold text-lydian-text-inverse">{fleetStats.total}</p>
            <p className="text-xs text-lydian-text-muted mt-2">
              {fleetStats.available} müsait · {fleetStats.booked} kiralanmış
            </p>
          </motion.div>

          {/* Utilization Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">

            <div className="flex items-center justify-between mb-4">
              <PieChart className="h-8 w-8 text-lydian-success" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-lydian-text-dim text-sm mb-1">Kullanım Oranı</p>
            <p className="text-3xl font-bold text-lydian-text-inverse">%{fleetStats.utilizationRate}</p>
            <div className="w-full bg-lydian-bg-active rounded-full h-2 mt-2">
              <div
                className="bg-lydian-success h-2 rounded-full"
                style={{ width: `${fleetStats.utilizationRate}%` }}>
              </div>
            </div>
          </motion.div>

          {/* Monthly Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-lydian-primary to-lydian-primary-dark rounded-xl p-6 shadow-lg text-lydian-text-inverse">

            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 opacity-80" />
              {revenueStats.growth > 0 ?
              <TrendingUp className="h-5 w-5 text-green-300" /> :

              <TrendingUp className="h-5 w-5 text-red-300 rotate-180" />
              }
            </div>
            <p className="text-blue-200 text-sm mb-1">Bu Ay Gelir</p>
            <p className="text-3xl font-bold">₺{revenueStats.thisMonth.toLocaleString()}</p>
            <p className="text-xs text-blue-200 mt-2">
              {revenueStats.growth > 0 ? '+' : ''}{revenueStats.growth}% geçen aya göre
            </p>
          </motion.div>

          {/* Maintenance Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-xl p-6 shadow-md ${
            maintenanceAlerts.length > 0 ?
            'bg-red-50 border-2 border-red-200' :
            'bg-white'}`
            }>

            <div className="flex items-center justify-between mb-4">
              <Wrench
                className={`h-8 w-8 ${
                maintenanceAlerts.length > 0 ? 'text-red-600' : 'text-gray-400'}`
                } />

              {maintenanceAlerts.length > 0 &&
              <AlertTriangle className="h-5 w-5 text-lydian-primary" />
              }
            </div>
            <p className="text-lydian-text-dim text-sm mb-1">Bakım Uyarıları</p>
            <p className={`text-3xl font-bold ${
            maintenanceAlerts.length > 0 ? 'text-red-600' : 'text-white'}`
            }>
              {maintenanceAlerts.length}
            </p>
            <p className="text-xs text-lydian-text-muted mt-2">
              {maintenanceAlerts.length === 0 ? 'Tüm araçlar sağlıklı' : 'Dikkat gerekiyor'}
            </p>
          </motion.div>
        </div>

        {/* Fleet & Revenue Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Fleet Status Chart */}
          <div className="bg-lydian-glass-dark rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-lydian-text-inverse mb-4">Filo Durumu</h3>
            <Doughnut data={fleetChartData} options={fleetChartOptions} />
          </div>

          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-lydian-glass-dark rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-lydian-text-inverse">Gelir Trendi</h3>
                <p className="text-sm text-lydian-text-muted">Son 30 gün</p>
              </div>
              <BarChart3 className="h-5 w-5 text-lydian-primary" />
            </div>
            <Line data={revenueChartData} />
          </div>
        </div>

        {/* Maintenance Alerts */}
        {maintenanceAlerts.length > 0 &&
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-lydian-error-lighter border-l-4 border-red-500 rounded-lg p-6 mb-8">

            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-lydian-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-3">
                  Acil Bakım Gerektiren Araçlar ({maintenanceAlerts.length})
                </h3>
                <div className="space-y-2">
                  {maintenanceAlerts.map((alert, index) =>
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">

                      <div>
                        <p className="font-semibold text-lydian-text-inverse">{alert.vehicleName}</p>
                        <p className="text-sm text-lydian-text-dim">{alert.description}</p>
                      </div>
                      <div className="text-right">
                        <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                      alert.type === 'overdue' ?
                      'bg-red-100 text-red-800' :
                      alert.type === 'urgent' ?
                      'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'}`
                      }>

                          {alert.type === 'overdue' ?
                      'GECİKMİŞ' :
                      alert.type === 'urgent' ?
                      'ACİL' :
                      'PLANLI'}
                        </span>
                        <p className="text-xs text-lydian-text-muted mt-1">{alert.dueDate}</p>
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          </motion.div>
        }

        {/* Vehicle List */}
        <div className="bg-lydian-glass-dark rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-lydian-border">
            <h3 className="text-lg font-bold text-lydian-text-inverse">Araç Filosu</h3>
            <p className="text-sm text-lydian-text-muted">Tüm araçlarınızın detaylı durumu</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lydian-glass-dark">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-dim uppercase">
                    Araç
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-dim uppercase">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-dim uppercase">
                    Mevcut Kiralama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-dim uppercase">
                    Km
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-dim uppercase">
                    Bu Ay Gelir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-dim uppercase">
                    Kullanım %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lydian-border">
                {vehicles.map((vehicle) =>
                <tr key={vehicle.id} className="hover:bg-lydian-glass-dark">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Car className="h-5 w-5 text-lydian-text-muted" />
                        <div>
                          <p className="font-semibold text-lydian-text-inverse">
                            {vehicle.make} {vehicle.model}
                          </p>
                          <p className="text-xs text-lydian-text-muted">
                            {vehicle.year} · {vehicle.plateNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {vehicle.status === 'available' &&
                    <span className="flex items-center gap-1 text-lydian-success-text bg-lydian-success-light text-xs font-semibold px-2 py-1 rounded-full w-fit">
                          <CheckCircle className="h-3 w-3" />
                          Müsait
                        </span>
                    }
                      {vehicle.status === 'booked' &&
                    <span className="flex items-center gap-1 text-lydian-primary-dark bg-lydian-primary-light text-xs font-semibold px-2 py-1 rounded-full w-fit">
                          <Calendar className="h-3 w-3" />
                          Kiralanmış
                        </span>
                    }
                      {vehicle.status === 'maintenance' &&
                    <span className="flex items-center gap-1 text-orange-700 bg-orange-100 text-xs font-semibold px-2 py-1 rounded-full w-fit">
                          <Wrench className="h-3 w-3" />
                          Bakımda
                        </span>
                    }
                    </td>

                    <td className="px-6 py-4">
                      {vehicle.currentBooking ?
                    <div className="text-sm">
                          <p className="font-medium text-lydian-text-inverse">
                            {vehicle.currentBooking.guestName}
                          </p>
                          <p className="text-xs text-lydian-text-muted">
                            {new Date(vehicle.currentBooking.startDate).toLocaleDateString('tr-TR')} -{' '}
                            {new Date(vehicle.currentBooking.endDate).toLocaleDateString('tr-TR')}
                          </p>
                        </div> :

                    <span className="text-sm text-lydian-text-muted">-</span>
                    }
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-lydian-text-inverse">
                        {vehicle.totalKm.toLocaleString()} km
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-lydian-text-inverse">
                        ₺{vehicle.revenueThisMonth.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-lydian-bg-active rounded-full h-2">
                          <div
                          className="bg-lydian-primary h-2 rounded-full"
                          style={{ width: `${vehicle.utilizationRate}%` }}>
                        </div>
                        </div>
                        <span className="text-xs font-medium text-lydian-text-dim">
                          %{vehicle.utilizationRate}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);

};

export default CarRentalDashboard;