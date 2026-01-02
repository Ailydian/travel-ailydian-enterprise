import React, { useState } from 'react';
import { useAnalyticsOverview, useRevenueAnalytics } from '@/hooks/useDashboardHooks';
import {
  Eye,
  Calendar,
  TrendingUp,
  Star,
  Users,
  Home,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ChevronDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['owner', 'common'])),
    },
  };
}

// Metric Card Component with LYDIAN GLASSMORPHISM
interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  suffix?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, suffix = '' }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white shadow-lg shadow-blue-500/30">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-purple-300'
          }`}
        >
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-300 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">
          {value}
          {suffix && <span className="text-lg text-gray-400 ml-1">{suffix}</span>}
        </p>
      </div>
    </div>
  );
};

// Date Range Picker Component with LYDIAN GLASSMORPHISM
const DateRangePicker: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all">
            Son 30 Gün
          </button>
          <button className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/20 text-gray-300 rounded-xl font-medium text-sm hover:bg-white/10 transition-colors">
            Son 7 Gün
          </button>
          <button className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/20 text-gray-300 rounded-xl font-medium text-sm hover:bg-white/10 transition-colors">
            Bu Ay
          </button>
          <button className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/20 text-gray-300 rounded-xl font-medium text-sm hover:bg-white/10 transition-colors">
            Bu Yıl
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/20 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-colors font-medium text-sm text-gray-200">
            <Calendar className="w-4 h-4" />
            Özel Tarih
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Dışa Aktar
          </button>
        </div>
      </div>
    </div>
  );
};

// Property Performance Table with LYDIAN GLASSMORPHISM
interface PropertyPerformanceProps {
  properties: Array<{
    name: string;
    views: number;
    bookings: number;
    revenue: number;
    rating: number;
    conversionRate: number;
  }>;
}

const PropertyPerformanceTable: React.FC<PropertyPerformanceProps> = ({ properties }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/20">
        <h3 className="text-lg font-semibold text-white">Araç Performans Karşılaştırması</h3>
        <p className="text-sm text-gray-300 mt-1">Tüm araçlarınızın metriklerini karşılaştırın</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 backdrop-blur-xl border-b border-white/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Araç
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Görüntüleme
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Rezervasyon
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Dönüşüm
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Gelir
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Puan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/5 backdrop-blur-xl divide-y divide-white/10">
            {properties.map((property, index) => (
              <tr key={index} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-500/30">
                      {property.name.charAt(0)}
                    </div>
                    <span className="font-medium text-white">{property.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-200">{property.views.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-200">{property.bookings}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${property.conversionRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-white">{property.conversionRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-white">₺{property.revenue.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-white">{property.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Booking Source Chart Component with LYDIAN GLASSMORPHISM
const BookingSourceChart: React.FC = () => {
  const data = [
    { name: 'Direct Booking', value: 45, color: '#3b82f6' },
    { name: 'Holiday.AILYDIAN', value: 30, color: '#8b5cf6' },
    { name: 'Partner Sites', value: 15, color: '#06b6d4' },
    { name: 'Social Media', value: 7, color: '#10b981' },
    { name: 'Other', value: 3, color: '#6b7280' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Rezervasyon Kaynakları</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((source, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
            <span className="text-sm text-gray-300">{source.name}</span>
            <span className="text-sm font-semibold text-white ml-auto">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Analytics Component with LYDIAN GLASSMORPHISM
const AnalyticsPage: React.FC = () => {
  const { data: analytics, isLoading } = useAnalyticsOverview();

  // Mock data
  const viewsChartData = [
    { date: 'Ara 1', views: 120 },
    { date: 'Ara 5', views: 145 },
    { date: 'Ara 10', views: 180 },
    { date: 'Ara 15', views: 165 },
    { date: 'Ara 20', views: 220 },
    { date: 'Ara 25', views: 250 },
    { date: 'Ara 30', views: 280 },
  ];

  const bookingsChartData = [
    { month: 'Tem', bookings: 12 },
    { month: 'Ağu', bookings: 18 },
    { month: 'Eyl', bookings: 15 },
    { month: 'Eki', bookings: 22 },
    { month: 'Kas', bookings: 28 },
    { month: 'Ara', bookings: 35 },
  ];

  const propertyPerformanceData = [
    {
      name: 'BMW 3 Serisi',
      views: 4250,
      bookings: 28,
      revenue: 12450,
      rating: 4.9,
      conversionRate: 6.5,
    },
    {
      name: 'Mercedes E-Class',
      views: 3180,
      bookings: 22,
      revenue: 9870,
      rating: 4.8,
      conversionRate: 6.9,
    },
    {
      name: 'Volkswagen Passat',
      views: 5420,
      bookings: 35,
      revenue: 8920,
      rating: 4.7,
      conversionRate: 6.5,
    },
    {
      name: 'Renault Megane',
      views: 2890,
      bookings: 18,
      revenue: 7560,
      rating: 4.9,
      conversionRate: 6.2,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-black mb-6 text-white">Analitik</h1>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/10 backdrop-blur-xl rounded-2xl"></div>
            ))}
          </div>
          <div className="h-96 bg-white/10 backdrop-blur-xl rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black mb-6 text-white">Analitik</h1>
      <DateRangePicker />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Toplam Görüntüleme"
          value="15,740"
          change={18.5}
          icon={<Eye className="w-6 h-6" />}
        />
        <MetricCard
          title="Toplam Rezervasyon"
          value="103"
          change={12.3}
          icon={<Calendar className="w-6 h-6" />}
        />
        <MetricCard
          title="Dönüşüm Oranı"
          value="6.5"
          change={3.2}
          icon={<TrendingUp className="w-6 h-6" />}
          suffix="%"
        />
        <MetricCard title="Ort. Puan" value="4.8" change={2.1} icon={<Star className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Views Chart */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Araç Görüntülemeleri</h3>
              <p className="text-sm text-gray-300 mt-1">Son 30 gün içindeki görüntüleme sayısı</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Toplam:</span>
              <span className="font-bold text-white">15,740</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Rezervasyon Eğilimi</h3>
              <p className="text-sm text-gray-300 mt-1">6 aylık aylık rezervasyon sayısı</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Toplam:</span>
              <span className="font-bold text-white">130</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="bookings" fill="url(#colorBookings)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Sources */}
      <div className="mb-8">
        <BookingSourceChart />
      </div>

      {/* Property Performance Table */}
      <PropertyPerformanceTable properties={propertyPerformanceData} />
    </div>
  );
};

export default AnalyticsPage;
