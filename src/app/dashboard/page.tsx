'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  Calendar,
  MessageSquare,
  Eye,
  Star,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  MapPin,
  Plus
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function PropertyOwnerDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock Data - Gelişmiş İstatistikler
  const stats = {
    totalRevenue: { value: 45280, change: 12.5, trend: 'up' },
    activeBookings: { value: 23, change: 8.2, trend: 'up' },
    occupancyRate: { value: 87, change: -2.1, trend: 'down' },
    avgRating: { value: 4.9, change: 0.3, trend: 'up' },
    totalProperties: { value: 5, change: 0, trend: 'neutral' },
    pendingReviews: { value: 7, change: 15.4, trend: 'up' },
    responseTime: { value: '< 1h', change: -20, trend: 'up' },
    monthlyIncome: { value: 18500, change: 22.8, trend: 'up' }
  };

  // Gelir Grafiği Verisi
  const revenueData = [
    { name: 'Pzt', gelir: 2400, rezervasyon: 4 },
    { name: 'Sal', gelir: 1398, rezervasyon: 3 },
    { name: 'Çar', gelir: 9800, rezervasyon: 7 },
    { name: 'Per', gelir: 3908, rezervasyon: 5 },
    { name: 'Cum', gelir: 4800, rezervasyon: 6 },
    { name: 'Cmt', gelir: 3800, rezervasyon: 5 },
    { name: 'Paz', gelir: 4300, rezervasyon: 6 }
  ];

  // Doluluk Oranı Verisi
  const occupancyData = [
    { name: 'Oca', oran: 75 },
    { name: 'Şub', oran: 82 },
    { name: 'Mar', oran: 88 },
    { name: 'Nis', oran: 85 },
    { name: 'May', oran: 92 },
    { name: 'Haz', oran: 87 }
  ];

  // Mülk Performans Verisi
  const propertyPerformanceData = [
    { name: 'Villa Deniz Manzara', value: 35 },
    { name: 'Apart Şehir Merkezi', value: 25 },
    { name: 'Dağ Evi Lux', value: 20 },
    { name: 'Sahil Evi Premium', value: 15 },
    { name: 'Studio Kadıköy', value: 5 }
  ];

  const COLORS = ['#FF214D', '#FF6A45', '#FF8C5A', '#FFAD6F', '#FFCE84'];

  // Yaklaşan Rezervasyonlar
  const upcomingBookings = [
    {
      id: 1,
      guest: 'Ayşe Demir',
      property: 'Villa Deniz Manzara',
      checkIn: '2024-01-15',
      checkOut: '2024-01-20',
      amount: 3500,
      status: 'confirmed',
      nights: 5
    },
    {
      id: 2,
      guest: 'Mehmet Kaya',
      property: 'Apart Şehir Merkezi',
      checkIn: '2024-01-16',
      checkOut: '2024-01-18',
      amount: 1200,
      status: 'pending',
      nights: 2
    },
    {
      id: 3,
      guest: 'Zeynep Yılmaz',
      property: 'Dağ Evi Lux',
      checkIn: '2024-01-18',
      checkOut: '2024-01-25',
      amount: 5600,
      status: 'confirmed',
      nights: 7
    }
  ];

  // Son Aktiviteler
  const recentActivities = [
    { type: 'booking', message: 'Yeni rezervasyon: Villa Deniz Manzara', time: '5 dk önce', icon: Calendar, color: 'var(--ac-1)' },
    { type: 'review', message: 'Yeni değerlendirme aldınız (5 yıldız)', time: '1 saat önce', icon: Star, color: 'var(--ac-2)' },
    { type: 'message', message: 'Ahmet Yıldız sizinle iletişime geçti', time: '2 saat önce', icon: MessageSquare, color: 'var(--ac-1)' },
    { type: 'payment', message: '3,500 TL ödeme alındı', time: '3 saat önce', icon: DollarSign, color: 'var(--ac-2)' }
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
                 background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                 boxShadow: '0 0 20px rgba(255, 33, 77, 0.3)'
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
             background: 'linear-gradient(135deg, rgba(255, 33, 77, 0.1), rgba(255, 106, 69, 0.1))',
             borderColor: '#E5E7EB'
           }}>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2 neon-text-strong" style={{ color: '#000000' }}>
            Hoş Geldiniz, Ahmet! 👋
          </h1>
          <p className="text-lg mb-4" style={{ color: '#666666' }}>
            Property Owner Dashboard'unuzda bugün neler oluyor?
          </p>
          <div className="flex gap-4">
            <Link
              href="/dashboard/properties/new"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 neon-glow"
              style={{
                background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                color: 'white',
                boxShadow: '0 0 30px rgba(255, 33, 77, 0.5)'
              }}
            >
              <Plus className="w-5 h-5" />
              <span>Yeni Mülk Ekle</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 33, 77, 0.1)',
                color: 'var(--ac-1)',
                border: '2px solid rgba(255, 33, 77, 0.3)'
              }}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Detaylı Analitik</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Gelir"
          value={stats.totalRevenue.value.toLocaleString('tr-TR')}
          change={stats.totalRevenue.change}
          icon={DollarSign}
          prefix="₺"
        />
        <StatCard
          title="Aktif Rezervasyon"
          value={stats.activeBookings.value}
          change={stats.activeBookings.change}
          icon={Calendar}
        />
        <StatCard
          title="Doluluk Oranı"
          value={stats.occupancyRate.value}
          change={stats.occupancyRate.change}
          icon={TrendingUp}
          suffix="%"
        />
        <StatCard
          title="Ortalama Puan"
          value={stats.avgRating.value}
          change={stats.avgRating.change}
          icon={Star}
          suffix="/5"
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
              Haftalık Gelir Analizi
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
              <option value="7d">Son 7 Gün</option>
              <option value="30d">Son 30 Gün</option>
              <option value="90d">Son 90 Gün</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF214D" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF214D" stopOpacity={0}/>
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
                stroke="#FF214D"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGelir)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Property Performance Pie Chart */}
        <div className="rounded-2xl p-6 border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <h3 className="text-xl font-bold mb-6 neon-text-strong" style={{ color: '#000000' }}>
            Mülk Performans Dağılımı
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyPerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {propertyPerformanceData.map((entry, index) => (
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

      {/* Upcoming Bookings & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 rounded-2xl p-6 border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
             }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold neon-text-strong" style={{ color: '#000000' }}>
              Yaklaşan Rezervasyonlar
            </h3>
            <Link
              href="/dashboard/bookings"
              className="flex items-center gap-2 text-sm font-medium hover:scale-105 transition-all"
              style={{ color: 'var(--ac-1)' }}
            >
              <span>Tümünü Gör</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl p-4 border-2 transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#000000' }}>
                      {booking.guest}
                    </h4>
                    <p className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                      <Building2 className="w-4 h-4" />
                      {booking.property}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: booking.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: booking.status === 'confirmed' ? '#10B981' : '#F59E0B'
                    }}
                  >
                    {booking.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#666666' }}>Check-in</p>
                    <p className="font-bold" style={{ color: '#000000' }}>{booking.checkIn}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#666666' }}>Check-out</p>
                    <p className="font-bold" style={{ color: '#000000' }}>{booking.checkOut}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#666666' }}>Tutar</p>
                    <p className="font-bold" style={{ color: 'var(--ac-1)' }}>₺{booking.amount.toLocaleString('tr-TR')}</p>
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
            Son Aktiviteler
          </h3>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(255, 33, 77, 0.1)',
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
    </div>
  );
}
