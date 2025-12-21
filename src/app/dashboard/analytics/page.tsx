'use client';

import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
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
  ChevronDown
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
  Legend
} from 'recharts';

// Metric Card Component
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white shadow-md">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {value}
          {suffix && <span className="text-lg text-gray-500 ml-1">{suffix}</span>}
        </p>
      </div>
    </div>
  );
};

// Date Range Picker Component
const DateRangePicker: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            Last 7 Days
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            This Month
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            This Year
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            <Calendar className="w-4 h-4" />
            Custom Range
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

// Property Performance Table
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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Property Performance Comparison</h3>
        <p className="text-sm text-gray-500 mt-1">Compare metrics across all your properties</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Bookings
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Conversion
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {properties.map((property, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      {property.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{property.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{property.views.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{property.bookings}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${property.conversionRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{property.conversionRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">${property.revenue.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-900">{property.rating}</span>
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

// Booking Source Chart Component
const BookingSourceChart: React.FC = () => {
  const data = [
    { name: 'Direct Booking', value: 35, color: '#3b82f6' },
    { name: 'Airbnb', value: 30, color: '#ff5a5f' },
    { name: 'Booking.com', value: 20, color: '#003580' },
    { name: 'VRBO', value: 10, color: '#0057b8' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Sources</h3>
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
            <span className="text-sm text-gray-700">{source.name}</span>
            <span className="text-sm font-semibold text-gray-900 ml-auto">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Analytics Component
const AnalyticsPage: React.FC = () => {
  const { data: analytics, isLoading } = useAnalyticsOverview();

  // Mock data
  const viewsChartData = [
    { date: 'Dec 1', views: 120 },
    { date: 'Dec 5', views: 145 },
    { date: 'Dec 10', views: 180 },
    { date: 'Dec 15', views: 165 },
    { date: 'Dec 20', views: 220 },
    { date: 'Dec 25', views: 250 },
    { date: 'Dec 30', views: 280 },
  ];

  const bookingsChartData = [
    { month: 'Jul', bookings: 12 },
    { month: 'Aug', bookings: 18 },
    { month: 'Sep', bookings: 15 },
    { month: 'Oct', bookings: 22 },
    { month: 'Nov', bookings: 28 },
    { month: 'Dec', bookings: 35 },
  ];

  const propertyPerformanceData = [
    {
      name: 'Beachfront Villa',
      views: 4250,
      bookings: 28,
      revenue: 12450,
      rating: 4.9,
      conversionRate: 6.5,
    },
    {
      name: 'Mountain Cabin',
      views: 3180,
      bookings: 22,
      revenue: 9870,
      rating: 4.8,
      conversionRate: 6.9,
    },
    {
      name: 'City Apartment',
      views: 5420,
      bookings: 35,
      revenue: 8920,
      rating: 4.7,
      conversionRate: 6.5,
    },
    {
      name: 'Lake House',
      views: 2890,
      bookings: 18,
      revenue: 7560,
      rating: 4.9,
      conversionRate: 6.2,
    },
  ];

  if (isLoading) {
    return (
      <DashboardShell title="Analytics" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Analytics' }]}>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Analytics" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Analytics' }]}>
      <DateRangePicker />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Views"
          value="15,740"
          change={18.5}
          icon={<Eye className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Bookings"
          value="103"
          change={12.3}
          icon={<Calendar className="w-6 h-6" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="6.5"
          change={3.2}
          icon={<TrendingUp className="w-6 h-6" />}
          suffix="%"
        />
        <MetricCard
          title="Avg. Rating"
          value="4.8"
          change={2.1}
          icon={<Star className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Views Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Property Views</h3>
              <p className="text-sm text-gray-500 mt-1">Views over the last 30 days</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="font-bold text-gray-900">15,740</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Bookings Trend</h3>
              <p className="text-sm text-gray-500 mt-1">Monthly bookings over 6 months</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="font-bold text-gray-900">130</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="bookings" fill="url(#colorBookings)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
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
    </DashboardShell>
  );
};

export default AnalyticsPage;
