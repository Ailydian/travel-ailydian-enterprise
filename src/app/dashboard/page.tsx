'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useProperties, useBookings, useAnalyticsOverview } from '@/hooks/useDashboardHooks';
import { useDashboardStore } from '@/stores/dashboardStore';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Home,
  MessageSquare,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  CalendarCheck,
  MessageCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  prefix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, prefix = '' }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white shadow-md">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{prefix}{value}</p>
      </div>
    </div>
  );
};

// Quick Action Button Component
interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const QuickActionButton: React.FC<QuickActionProps> = ({ label, icon, onClick, variant = 'secondary' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// Recent Booking Row Component
interface BookingRowProps {
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const BookingRow: React.FC<BookingRowProps> = ({ guestName, propertyName, checkIn, checkOut, amount, status }) => {
  const statusStyles = {
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {guestName.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{guestName}</p>
            <p className="text-sm text-gray-500">{propertyName}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">{checkIn}</p>
          <p className="text-gray-500">to {checkOut}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="font-semibold text-gray-900">${amount}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
    </tr>
  );
};

// Top Property Card Component
interface TopPropertyProps {
  name: string;
  revenue: string;
  bookings: number;
  rating: number;
  change: number;
}

const TopPropertyCard: React.FC<TopPropertyProps> = ({ name, revenue, bookings, rating, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium text-gray-900">{rating}</span>
            <span className="text-sm text-gray-500">({bookings} bookings)</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-gray-900">${revenue}</span>
        <span className="text-sm text-gray-500">revenue</span>
      </div>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-32 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Overview Component
const DashboardOverview: React.FC = () => {
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const { data: analytics, isLoading: analyticsLoading } = useAnalyticsOverview();
  const { stats } = useDashboardStore();

  const isLoading = propertiesLoading || bookingsLoading || analyticsLoading;

  // Mock data for demonstration
  const revenueChartData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4900 },
    { month: 'May', revenue: 6200 },
    { month: 'Jun', revenue: 5800 },
    { month: 'Jul', revenue: 7400 },
    { month: 'Aug', revenue: 7800 },
    { month: 'Sep', revenue: 6900 },
    { month: 'Oct', revenue: 7200 },
    { month: 'Nov', revenue: 8100 },
    { month: 'Dec', revenue: 8900 },
  ];

  const recentBookings = [
    {
      guestName: 'Sarah Johnson',
      propertyName: 'Beachfront Villa',
      checkIn: 'Dec 25, 2025',
      checkOut: 'Dec 30, 2025',
      amount: '1,250',
      status: 'confirmed' as const,
    },
    {
      guestName: 'Michael Chen',
      propertyName: 'Mountain Cabin',
      checkIn: 'Dec 28, 2025',
      checkOut: 'Jan 2, 2026',
      amount: '890',
      status: 'pending' as const,
    },
    {
      guestName: 'Emma Wilson',
      propertyName: 'City Apartment',
      checkIn: 'Dec 22, 2025',
      checkOut: 'Dec 27, 2025',
      amount: '650',
      status: 'confirmed' as const,
    },
  ];

  const topProperties = [
    { name: 'Beachfront Villa', revenue: '12,450', bookings: 28, rating: 4.9, change: 15 },
    { name: 'Mountain Cabin', revenue: '9,870', bookings: 22, rating: 4.8, change: 8 },
    { name: 'City Apartment', revenue: '8,920', bookings: 35, rating: 4.7, change: 12 },
    { name: 'Lake House', revenue: '7,560', bookings: 18, rating: 4.9, change: -3 },
  ];

  if (isLoading) {
    return (
      <DashboardShell title="Overview" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}>
        <SkeletonLoader />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Overview" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value="87,650"
          change={12.5}
          icon={<DollarSign className="w-6 h-6" />}
          prefix="$"
        />
        <StatCard
          title="Total Bookings"
          value="156"
          change={8.2}
          icon={<Calendar className="w-6 h-6" />}
        />
        <StatCard
          title="Occupancy Rate"
          value="78%"
          change={5.7}
          icon={<Home className="w-6 h-6" />}
        />
        <StatCard
          title="Unread Messages"
          value="12"
          change={-15.3}
          icon={<MessageSquare className="w-6 h-6" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <QuickActionButton
            label="Add Property"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => window.location.href = '/dashboard/properties/new'}
            variant="primary"
          />
          <QuickActionButton
            label="View Calendar"
            icon={<CalendarCheck className="w-5 h-5" />}
            onClick={() => window.location.href = '/dashboard/calendar'}
          />
          <QuickActionButton
            label="Check Messages"
            icon={<MessageCircle className="w-5 h-5" />}
            onClick={() => window.location.href = '/dashboard/messages'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500 mt-1">Last 12 months performance</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Total:</span>
              <span className="font-bold text-gray-900">$87,650</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueChartData}>
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
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Properties</h3>
          <div className="space-y-4">
            {topProperties.map((property, index) => (
              <TopPropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <p className="text-sm text-gray-500 mt-1">Latest reservation activity</p>
            </div>
            <button
              onClick={() => window.location.href = '/dashboard/bookings'}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking, index) => (
                  <BookingRow key={index} {...booking} />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Calendar className="w-12 h-12 mb-3" />
                      <p className="text-lg font-medium">No bookings yet</p>
                      <p className="text-sm mt-1">Your recent bookings will appear here</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default DashboardOverview;
