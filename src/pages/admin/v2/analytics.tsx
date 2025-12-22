/**
 * ADMIN V2 - ADVANCED ANALYTICS
 * Real-time analytics with charts and insights
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users,
  Calendar, Download, RefreshCw, Filter, BarChart3,
  PieChart, Activity, Target, Globe, MapPin, Star,
  Clock, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>({});

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${timeRange}`);
      const result = await res.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Mock data for now
    setStats({
      revenue: {
        total: 1250000,
        growth: 23.5,
        byCategory: {
          hotels: 650000,
          tours: 320000,
          flights: 180000,
          transfers: 100000,
        },
      },
      bookings: {
        total: 1847,
        growth: 18.2,
        byStatus: {
          confirmed: 1523,
          pending: 234,
          cancelled: 90,
        },
      },
      customers: {
        total: 3421,
        new: 456,
        returning: 2965,
      },
      topProducts: [
        { name: 'Antalya Luxury Resort', bookings: 234, revenue: 156000 },
        { name: 'İstanbul City Tour', bookings: 189, revenue: 98000 },
        { name: 'Kapadokya Balloon', bookings: 167, revenue: 87000 },
      ],
    });
  }, [timeRange]);

  const timeRanges = [
    { value: '7d', label: 'Son 7 Gün' },
    { value: '30d', label: 'Son 30 Gün' },
    { value: '90d', label: 'Son 90 Gün' },
    { value: '1y', label: 'Son 1 Yıl' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
              </Link>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Detaylı Analytics
                </h1>
                <p className="text-sm text-slate-600">
                  Gerçek zamanlı iş analitiği
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 rounded-lg p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value as any)}
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${
                        timeRange === range.value
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }
                    `}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchAnalytics}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                <Download className="w-4 h-4" />
                Rapor İndir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Toplam Gelir"
            value={`₺${stats.revenue?.total.toLocaleString('tr-TR')}`}
            change={stats.revenue?.growth}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Rezervasyonlar"
            value={stats.bookings?.total.toLocaleString('tr-TR')}
            change={stats.bookings?.growth}
            icon={Calendar}
            color="blue"
          />
          <MetricCard
            title="Müşteriler"
            value={stats.customers?.total.toLocaleString('tr-TR')}
            change={12.5}
            icon={Users}
            color="purple"
          />
          <MetricCard
            title="Ortalama Değer"
            value={`₺${Math.round(stats.revenue?.total / stats.bookings?.total || 0).toLocaleString('tr-TR')}`}
            change={8.3}
            icon={Target}
            color="orange"
          />
        </div>

        {/* Revenue by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Kategoriye Göre Gelir
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.revenue?.byCategory || {}).map(([key, value]: any) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {key === 'hotels' && 'Oteller'}
                      {key === 'tours' && 'Turlar'}
                      {key === 'flights' && 'Uçuşlar'}
                      {key === 'transfers' && 'Transferler'}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      ₺{value.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${(value / stats.revenue?.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Rezervasyon Durumu
            </h3>
            <div className="space-y-4">
              <StatusCard
                label="Onaylandı"
                value={stats.bookings?.byStatus?.confirmed}
                icon={CheckCircle}
                color="green"
              />
              <StatusCard
                label="Beklemede"
                value={stats.bookings?.byStatus?.pending}
                icon={Clock}
                color="orange"
              />
              <StatusCard
                label="İptal Edildi"
                value={stats.bookings?.byStatus?.cancelled}
                icon={XCircle}
                color="red"
              />
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            En Çok Satan Ürünler
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Ürün
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                    Rezervasyon
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                    Gelir
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                    Ort. Değer
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.topProducts?.map((product: any, index: number) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-900 font-semibold">
                      {product.bookings}
                    </td>
                    <td className="py-4 px-4 text-right text-slate-900 font-semibold">
                      ₺{product.revenue.toLocaleString('tr-TR')}
                    </td>
                    <td className="py-4 px-4 text-right text-slate-600">
                      ₺{Math.round(product.revenue / product.bookings).toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, change, icon: Icon, color }: any) => {
  const isPositive = change >= 0;
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-600">{title}</span>
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{isPositive ? '+' : ''}{change}%</span>
        <span className="text-slate-500 ml-1">vs önceki dönem</span>
      </div>
    </div>
  );
};

// Status Card Component
const StatusCard = ({ label, value, icon: Icon, color }: any) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
};

export default AdvancedAnalytics;
