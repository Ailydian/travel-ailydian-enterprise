'use client';

import React, { useState } from 'react';
import { useEarningRecords, usePayoutHistory, useRequestPayout } from '@/hooks/useDashboardHooks';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  ChevronDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Stat Card Component
interface EarningStatCardProps {
  title: string;
  amount: string;
  change?: number;
  icon: React.ReactNode;
  period: string;
}

const EarningStatCard: React.FC<EarningStatCardProps> = ({ title, amount, change, icon, period }) => {
  const hasChange = change !== undefined;
  const isPositive = change && change >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white shadow-md">
          {icon}
        </div>
        {hasChange && (
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-1">${amount}</p>
        <p className="text-xs text-gray-500">{period}</p>
      </div>
    </div>
  );
};

// Transaction Row Component
interface TransactionRowProps {
  transaction: {
    id: string;
    date: Date;
    bookingId: string;
    propertyName: string;
    guestName: string;
    amount: number;
    status: 'completed' | 'pending' | 'refunded';
  };
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', label: 'Completed', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Pending', icon: Clock },
    refunded: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'Refunded', icon: XCircle },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm">
          <p className="font-medium text-gray-900">{transaction.date.toLocaleDateString()}</p>
          <p className="text-gray-500">{transaction.date.toLocaleTimeString()}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-gray-900 mb-1">{transaction.propertyName}</p>
        <p className="text-sm text-gray-500">{transaction.guestName}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-500">#{transaction.bookingId}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-lg font-bold text-gray-900">${transaction.amount.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
          View
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
};

// Transaction Card Component (Mobile)
const TransactionCard: React.FC<{ transaction: TransactionRowProps['transaction'] }> = ({ transaction }) => {
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', label: 'Completed', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Pending', icon: Clock },
    refunded: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'Refunded', icon: XCircle },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900 mb-1">{transaction.propertyName}</p>
          <p className="text-sm text-gray-500">{transaction.guestName}</p>
          <p className="text-xs text-gray-400 mt-1">
            {transaction.date.toLocaleDateString()} • #{transaction.bookingId}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">Amount</p>
          <p className="text-xl font-bold text-gray-900">${transaction.amount.toLocaleString()}</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
          View Details
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Payout Status Component
interface PayoutStatusProps {
  nextPayout: {
    amount: number;
    date: Date;
    status: 'scheduled' | 'processing' | 'completed';
  };
  onRequestPayout: () => void;
}

const PayoutStatus: React.FC<PayoutStatusProps> = ({ nextPayout, onRequestPayout }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Payout</h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">${nextPayout.amount.toLocaleString()}</span>
            <span className="text-sm text-gray-600">scheduled for {nextPayout.date.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {nextPayout.status.charAt(0).toUpperCase() + nextPayout.status.slice(1)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onRequestPayout}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <DollarSign className="w-5 h-5" />
            Request Payout
          </button>
          <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium">
            Payout Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter Bar Component
const EarningsFilterBar: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
            All Time
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            This Year
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            This Month
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            Custom
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Properties</option>
              <option value="1">Beachfront Villa</option>
              <option value="2">Mountain Cabin</option>
              <option value="3">City Apartment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Amounts</option>
              <option value="0-500">$0 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000+">$1,000+</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Earnings Component
const EarningsPage: React.FC = () => {
  const { data: earnings, isLoading } = useEarningRecords();
  const { data: payoutHistory } = usePayoutHistory();
  const { mutate: requestPayout } = useRequestPayout();

  // Mock data
  const earningsChartData = [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 3800 },
    { month: 'Mar', amount: 5100 },
    { month: 'Apr', amount: 4900 },
    { month: 'May', amount: 6200 },
    { month: 'Jun', amount: 5800 },
    { month: 'Jul', amount: 7400 },
    { month: 'Aug', amount: 7800 },
    { month: 'Sep', amount: 6900 },
    { month: 'Oct', amount: 7200 },
    { month: 'Nov', amount: 8100 },
    { month: 'Dec', amount: 8900 },
  ];

  const mockTransactions = [
    {
      id: '1',
      date: new Date('2025-12-20'),
      bookingId: 'BK-2025-001',
      propertyName: 'Beachfront Villa',
      guestName: 'Sarah Johnson',
      amount: 1250,
      status: 'completed' as const,
    },
    {
      id: '2',
      date: new Date('2025-12-19'),
      bookingId: 'BK-2025-002',
      propertyName: 'Mountain Cabin',
      guestName: 'Michael Chen',
      amount: 890,
      status: 'pending' as const,
    },
    {
      id: '3',
      date: new Date('2025-12-18'),
      bookingId: 'BK-2025-003',
      propertyName: 'City Apartment',
      guestName: 'Emma Wilson',
      amount: 650,
      status: 'completed' as const,
    },
    {
      id: '4',
      date: new Date('2025-12-17'),
      bookingId: 'BK-2025-004',
      propertyName: 'Lake House',
      guestName: 'David Martinez',
      amount: 1450,
      status: 'completed' as const,
    },
  ];

  const nextPayout = {
    amount: 3240,
    date: new Date('2025-12-30'),
    status: 'scheduled' as const,
  };

  const handleRequestPayout = () => {
    const amount = prompt('Enter amount to request:');
    if (amount) {
      requestPayout({ amount: parseFloat(amount), method: 'bank' });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-black mb-6 text-black">
          Earnings
        </h1>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black mb-6 text-black">
        Earnings
      </h1>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <EarningStatCard
          title="Today"
          amount="245"
          change={12.5}
          icon={<DollarSign className="w-6 h-6" />}
          period="Last 24 hours"
        />
        <EarningStatCard
          title="This Month"
          amount="8,900"
          change={8.2}
          icon={<Calendar className="w-6 h-6" />}
          period="December 2025"
        />
        <EarningStatCard
          title="This Year"
          amount="76,450"
          change={15.7}
          icon={<TrendingUp className="w-6 h-6" />}
          period="2025 Total"
        />
        <EarningStatCard
          title="All Time"
          amount="187,650"
          icon={<CheckCircle className="w-6 h-6" />}
          period="Total earnings"
        />
      </div>

      {/* Payout Status */}
      <PayoutStatus nextPayout={nextPayout} onRequestPayout={handleRequestPayout} />

      {/* Earnings Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
            <p className="text-sm text-gray-500 mt-1">Monthly earnings for the past year</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Total:</span>
            <span className="font-bold text-gray-900">$76,450</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsChartData}>
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
            <Bar dataKey="amount" fill="url(#colorAmount)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter Bar */}
      <EarningsFilterBar />

      {/* Transactions Table - Desktop */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          <p className="text-sm text-gray-500 mt-1">All your earnings and payouts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Property / Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {mockTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        {mockTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default EarningsPage;
