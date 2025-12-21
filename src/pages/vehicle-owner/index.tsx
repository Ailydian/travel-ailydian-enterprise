import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Car,
  Calendar,
  MessageSquare,
  Eye,
  Star,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Gauge,
  MapPin,
  Plus
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['vehicle-owner', 'common'])),
    },
  };
}

export default function VehicleOwnerDashboard() {
  const { t } = useTranslation('vehicle-owner');
  const [timeRange, setTimeRange] = useState('7d');

  // Mock Data - Gelişmiş İstatistikler
  const stats = {
    totalVehicles: { value: 8, change: 0, trend: 'neutral' },
    activeRentals: { value: 5, change: 25.0, trend: 'up' },
    monthlyIncome: { value: 32450, change: 18.7, trend: 'up' },
    occupancyRate: { value: 78, change: 5.2, trend: 'up' },
    totalRevenue: { value: 125680, change: 15.3, trend: 'up' },
    avgRating: { value: 4.8, change: 0.2, trend: 'up' },
    responseTime: { value: '< 2h', change: -15, trend: 'up' },
    upcomingPickups: { value: 3, change: 0, trend: 'neutral' }
  };

  // Gelir Grafiği Verisi
  const revenueData = [
    { name: 'Pzt', gelir: 3200, kiralama: 3 },
    { name: 'Sal', gelir: 2800, kiralama: 2 },
    { name: 'Çar', gelir: 4500, kiralama: 4 },
    { name: 'Per', gelir: 5200, kiralama: 5 },
    { name: 'Cum', gelir: 6100, kiralama: 6 },
    { name: 'Cmt', gelir: 5800, kiralama: 5 },
    { name: 'Paz', gelir: 4650, kiralama: 4 }
  ];

  // Doluluk Oranı Verisi
  const occupancyData = [
    { name: 'Oca', oran: 65 },
    { name: 'Şub', oran: 71 },
    { name: 'Mar', oran: 75 },
    { name: 'Nis', oran: 72 },
    { name: 'May', oran: 80 },
    { name: 'Haz', oran: 78 }
  ];

  // Araç Performans Verisi
  const vehiclePerformanceData = [
    { name: 'BMW 3 Serisi', value: 30 },
    { name: 'Mercedes Vito', value: 25 },
    { name: 'Volkswagen Passat', value: 20 },
    { name: 'Toyota Corolla', value: 15 },
    { name: 'Renault Megane', value: 10 }
  ];

  const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

  // Yaklaşan Teslimler
  const upcomingPickups = [
    {
      id: 1,
      renter: 'Mehmet Yılmaz',
      vehicle: 'BMW 3 Serisi',
      pickupDate: '2024-01-15',
      returnDate: '2024-01-20',
      amount: 4500,
      status: 'confirmed',
      days: 5
    },
    {
      id: 2,
      renter: 'Ayşe Demir',
      vehicle: 'Mercedes Vito',
      pickupDate: '2024-01-16',
      returnDate: '2024-01-18',
      amount: 2400,
      status: 'confirmed',
      days: 2
    },
    {
      id: 3,
      renter: 'Can Öztürk',
      vehicle: 'Volkswagen Passat',
      pickupDate: '2024-01-18',
      returnDate: '2024-01-25',
      amount: 5600,
      status: 'pending',
      days: 7
    }
  ];

  // Son Kiralamalar
  const recentRentals = [
    {
      id: 1,
      renter: 'Zeynep Kaya',
      vehicle: 'Toyota Corolla',
      completedDate: '2024-01-10',
      amount: 3200,
      rating: 5
    },
    {
      id: 2,
      renter: 'Ali Şahin',
      vehicle: 'Renault Megane',
      completedDate: '2024-01-08',
      amount: 2800,
      rating: 4.5
    },
    {
      id: 3,
      renter: 'Fatma Arslan',
      vehicle: 'BMW 3 Serisi',
      completedDate: '2024-01-05',
      amount: 5400,
      rating: 5
    },
    {
      id: 4,
      renter: 'Burak Koç',
      vehicle: 'Mercedes Vito',
      completedDate: '2024-01-03',
      amount: 3600,
      rating: 4.8
    },
    {
      id: 5,
      renter: 'Elif Yurt',
      vehicle: 'Volkswagen Passat',
      completedDate: '2023-12-28',
      amount: 4200,
      rating: 5
    }
  ];

  // Son Aktiviteler
  const recentActivities = [
    { type: 'booking', message: 'Yeni kiralama: BMW 3 Serisi', time: '10 dk önce', icon: Calendar, color: '#059669' },
    { type: 'review', message: 'Yeni değerlendirme aldınız (5 yıldız)', time: '1 saat önce', icon: Star, color: '#10B981' },
    { type: 'message', message: 'Can Öztürk sizinle iletişime geçti', time: '2 saat önce', icon: MessageSquare, color: '#059669' },
    { type: 'payment', message: '4,500 TL ödeme alındı', time: '3 saat önce', icon: DollarSign, color: '#10B981' }
  ];

  // Stat Card Component
  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: any) => {
    const isPositive = change >= 0;
    const isNeutral = change === 0;

    return (
      <div className="rounded-2xl p-6 border-2 transition-all hover:scale-105 card-hover"
           style={{
             backgroundColor: '#FFFFFF',
             borderColor: '#E5E7EB',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
           }}>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl"
               style={{
                 background: 'linear-gradient(135deg, #059669, #10B981)',
                 boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
               }}>
            <Icon className="w-6 h-6" style={{ color: 'white' }} />
          </div>
          {!isNeutral && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg`}
                 style={{
                   backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                   color: isPositive ? '#10B981' : '#EF4444'
                 }}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-bold">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: '#666666' }}>{title}</p>
          <p className="text-3xl font-black neon-text-strong" style={{ color: '#000000' }}>
            {prefix}{value}{suffix}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl p-8 border-2 relative overflow-hidden"
           style={{
             backgroundColor: '#FFFFFF',
             borderColor: '#E5E7EB',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
           }}>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2 neon-text-strong" style={{ color: '#000000' }}>
            {t('dashboard.welcome', { name: 'Ahmet' })}
          </h1>
          <p className="text-lg mb-4" style={{ color: '#666666' }}>
            {t('dashboard.subtitle')}
          </p>
          <div className="flex gap-4">
            <Link
              href="/vehicle-owner/vehicles/new"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 neon-glow"
              style={{
                background: 'linear-gradient(135deg, #059669, #10B981)',
                color: 'white',
                boxShadow: '0 0 30px rgba(5, 150, 105, 0.5)'
              }}
            >
              <Plus className="w-5 h-5" />
              <span>{t('dashboard.addVehicle')}</span>
            </Link>
            <Link
              href="/vehicle-owner/analytics"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                border: '2px solid rgba(5, 150, 105, 0.3)'
              }}
            >
              <TrendingUp className="w-5 h-5" />
              <span>{t('dashboard.detailedAnalytics')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.stats.totalVehicles')}
          value={stats.totalVehicles.value}
          change={stats.totalVehicles.change}
          icon={Car}
        />
        <StatCard
          title={t('dashboard.stats.activeRentals')}
          value={stats.activeRentals.value}
          change={stats.activeRentals.change}
          icon={Calendar}
        />
        <StatCard
          title={t('dashboard.stats.monthlyIncome')}
          value={stats.monthlyIncome.value.toLocaleString('tr-TR')}
          change={stats.monthlyIncome.change}
          icon={DollarSign}
          prefix="₺"
        />
        <StatCard
          title={t('dashboard.stats.occupancyRate')}
          value={stats.occupancyRate.value}
          change={stats.occupancyRate.change}
          icon={Gauge}
          suffix="%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="rounded-2xl p-6 border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold neon-text-strong" style={{ color: '#000000' }}>
              {t('dashboard.charts.weeklyRevenue')}
            </h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 rounded-lg border-2"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
                color: '#000000'
              }}
            >
              <option value="7d">{t('dashboard.charts.timeRange.7d')}</option>
              <option value="30d">{t('dashboard.charts.timeRange.30d')}</option>
              <option value="90d">{t('dashboard.charts.timeRange.90d')}</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  color: '#000000'
                }}
              />
              <Area
                type="monotone"
                dataKey="gelir"
                stroke="#059669"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGelir)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Performance Pie Chart */}
        <div className="rounded-2xl p-6 border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <h3 className="text-xl font-bold mb-6 neon-text-strong" style={{ color: '#000000' }}>
            {t('dashboard.charts.vehiclePerformance')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehiclePerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {vehiclePerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  color: '#000000'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Pickups & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Pickups */}
        <div className="lg:col-span-2 rounded-2xl p-6 border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold neon-text-strong" style={{ color: '#000000' }}>
              {t('dashboard.upcomingPickups.title')}
            </h3>
            <Link
              href="/vehicle-owner/bookings"
              className="flex items-center gap-2 text-sm font-medium hover:scale-105 transition-all"
              style={{ color: '#059669' }}
            >
              <span>{t('dashboard.upcomingPickups.viewAll')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingPickups.map((pickup) => (
              <div
                key={pickup.id}
                className="rounded-xl p-4 border-2 transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#000000' }}>
                      {pickup.renter}
                    </h4>
                    <p className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                      <Car className="w-4 h-4" />
                      {pickup.vehicle}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: pickup.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: pickup.status === 'confirmed' ? '#10B981' : '#F59E0B'
                    }}
                  >
                    {pickup.status === 'confirmed' ? t('dashboard.upcomingPickups.status.confirmed') : t('dashboard.upcomingPickups.status.pending')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#666666' }}>{t('dashboard.upcomingPickups.pickupDate')}</p>
                    <p className="font-bold" style={{ color: '#000000' }}>{pickup.pickupDate}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#666666' }}>{t('dashboard.upcomingPickups.returnDate')}</p>
                    <p className="font-bold" style={{ color: '#000000' }}>{pickup.returnDate}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#666666' }}>{t('dashboard.upcomingPickups.amount')}</p>
                    <p className="font-bold" style={{ color: '#059669' }}>₺{pickup.amount.toLocaleString('tr-TR')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl p-6 border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <h3 className="text-xl font-bold mb-6 neon-text-strong" style={{ color: '#000000' }}>
            {t('dashboard.recentActivity.title')}
          </h3>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(5, 150, 105, 0.1)',
                      color: activity.color
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1" style={{ color: '#000000' }}>
                      {activity.message}
                    </p>
                    <p className="text-xs" style={{ color: '#666666' }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Rentals Table */}
      <div className="rounded-2xl p-6 border-2"
           style={{
             backgroundColor: '#FFFFFF',
             borderColor: '#E5E7EB',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
           }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold neon-text-strong" style={{ color: '#000000' }}>
            {t('dashboard.recentRentals.title')}
          </h3>
          <Link
            href="/vehicle-owner/bookings"
            className="flex items-center gap-2 text-sm font-medium hover:scale-105 transition-all"
            style={{ color: '#059669' }}
          >
            <span>{t('dashboard.upcomingPickups.viewAll')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#666666' }}>Kiralayan</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#666666' }}>Araç</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#666666' }}>Tarih</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#666666' }}>Tutar</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#666666' }}>Puan</th>
              </tr>
            </thead>
            <tbody>
              {recentRentals.map((rental) => (
                <tr key={rental.id} style={{ borderBottom: '1px solid #E5E7EB' }} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium" style={{ color: '#000000' }}>{rental.renter}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm" style={{ color: '#666666' }}>{rental.vehicle}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm" style={{ color: '#666666' }}>{rental.completedDate}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold" style={{ color: '#059669' }}>₺{rental.amount.toLocaleString('tr-TR')}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold" style={{ color: '#000000' }}>{rental.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/vehicle-owner/vehicles/new"
          className="rounded-2xl p-6 border-2 transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold mb-1" style={{ color: '#000000' }}>Yeni Araç Ekle</h4>
              <p className="text-sm" style={{ color: '#666666' }}>Filonuza araç ekleyin</p>
            </div>
          </div>
        </Link>

        <Link
          href="/vehicle-owner/vehicles"
          className="rounded-2xl p-6 border-2 transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold mb-1" style={{ color: '#000000' }}>Tüm Araçları Gör</h4>
              <p className="text-sm" style={{ color: '#666666' }}>Araç yönetimi</p>
            </div>
          </div>
        </Link>

        <Link
          href="/vehicle-owner/settings"
          className="rounded-2xl p-6 border-2 transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold mb-1" style={{ color: '#000000' }}>Ayarlar</h4>
              <p className="text-sm" style={{ color: '#666666' }}>Hesap ayarları</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Alerts/Notifications */}
      <div className="rounded-2xl p-6 border-2"
           style={{
             backgroundColor: 'rgba(5, 150, 105, 0.05)',
             borderColor: 'rgba(5, 150, 105, 0.2)',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
           }}>
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#059669' }} />
          <div className="flex-1">
            <h4 className="font-bold mb-2" style={{ color: '#000000' }}>Önemli Bildirimler</h4>
            <div className="space-y-2">
              <p className="text-sm" style={{ color: '#666666' }}>
                • Mercedes Vito için bakım zamanı yaklaşıyor (3 gün sonra)
              </p>
              <p className="text-sm" style={{ color: '#666666' }}>
                • 1 bekleyen rezervasyon onayınız var
              </p>
              <p className="text-sm" style={{ color: '#666666' }}>
                • Bu hafta 5 yeni görüntülenme aldınız
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
