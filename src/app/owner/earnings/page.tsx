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
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white shadow-md">
          {icon}
        </div>
        {hasChange && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-3 md:w-4 h-3 md:h-4" /> : <TrendingDown className="w-3 md:w-4 h-3 md:h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1">₺{amount}</p>
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
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', label: 'Tamamlanan', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Bekleyen', icon: Clock },
    refunded: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'İade Edildi', icon: XCircle },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 md:px-6 py-3 md:py-4">
        <div className="text-sm">
          <p className="font-medium text-gray-900">{transaction.date.toLocaleDateString('tr-TR')}</p>
          <p className="text-gray-500 text-xs md:text-sm">{transaction.date.toLocaleTimeString('tr-TR')}</p>
        </div>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <p className="text-sm font-medium text-gray-900 mb-1">{transaction.propertyName}</p>
        <p className="text-xs md:text-sm text-gray-500">{transaction.guestName}</p>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <p className="text-xs md:text-sm text-gray-500">#{transaction.bookingId}</p>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <p className="text-base md:text-lg font-bold text-gray-900">₺{transaction.amount.toLocaleString('tr-TR')}</p>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <span className={`inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Görüntüle
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
};

// Transaction Card Component (Mobile)
const TransactionCard: React.FC<{ transaction: TransactionRowProps['transaction'] }> = ({ transaction }) => {
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', label: 'Tamamlanan', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Bekleyen', icon: Clock },
    refunded: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'İade Edildi', icon: XCircle },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 mb-1 truncate">{transaction.propertyName}</p>
          <p className="text-sm text-gray-500 truncate">{transaction.guestName}</p>
          <p className="text-xs text-gray-400 mt-1">
            {transaction.date.toLocaleDateString('tr-TR')} • #{transaction.bookingId}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} flex-shrink-0`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{config.label}</span>
        </span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">Tutar</p>
          <p className="text-xl font-bold text-gray-900">₺{transaction.amount.toLocaleString('tr-TR')}</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 whitespace-nowrap">
          Detaylar
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Sonraki Ödeme</h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-gray-900">₺{nextPayout.amount.toLocaleString('tr-TR')}</span>
            <span className="text-xs md:text-sm text-gray-600">{nextPayout.date.toLocaleDateString('tr-TR')} tarihinde planlandı</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {nextPayout.status === 'scheduled' ? 'Planlandı' : nextPayout.status === 'processing' ? 'İşleniyor' : 'Tamamlandı'}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto md:w-auto">
          <button
            onClick={onRequestPayout}
            className="px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
          >
            <DollarSign className="w-4 md:w-5 h-4 md:h-5" />
            Para Çek
          </button>
          <button className="px-4 md:px-6 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium text-sm md:text-base touch-manipulation">
            Ödeme Ayarları
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
    <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-blue-700 transition-colors touch-manipulation">
            Tüm Zamanlar
          </button>
          <button className="px-3 md:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-xs md:text-sm hover:bg-gray-50 transition-colors touch-manipulation">
            Bu Yıl
          </button>
          <button className="px-3 md:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-xs md:text-sm hover:bg-gray-50 transition-colors touch-manipulation">
            Bu Ay
          </button>
          <button className="px-3 md:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-xs md:text-sm hover:bg-gray-50 transition-colors touch-manipulation">
            Özel
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs md:text-sm whitespace-nowrap touch-manipulation"
          >
            <Filter className="w-4 h-4" />
            Filtreler
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-xs md:text-sm whitespace-nowrap touch-manipulation">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">CSV İndir</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-xs md:text-sm whitespace-nowrap touch-manipulation">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF İndir</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mülk</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm touch-manipulation">
              <option value="">Tüm Mülkler</option>
              <option value="1">Sahil Villası</option>
              <option value="2">Dağ Evi</option>
              <option value="3">Şehir Dairesi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm touch-manipulation">
              <option value="">Tüm Durumlar</option>
              <option value="completed">Tamamlanan</option>
              <option value="pending">Bekleyen</option>
              <option value="refunded">İade Edildi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tutar Aralığı</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm touch-manipulation">
              <option value="">Tüm Tutarlar</option>
              <option value="0-500">₺0 - ₺500</option>
              <option value="500-1000">₺500 - ₺1.000</option>
              <option value="1000+">₺1.000+</option>
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
    const amount = prompt('Çekmek istediğiniz tutarı girin:');
    if (amount) {
      requestPayout({ amount: parseFloat(amount), method: 'bank' });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-black">
          Kazançlar
        </h1>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 md:h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 md:h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-black">
        Kazançlar
      </h1>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <EarningStatCard
          title="Bugün"
          amount="245"
          change={12.5}
          icon={<DollarSign className="w-5 md:w-6 h-5 md:h-6" />}
          period="Son 24 saat"
        />
        <EarningStatCard
          title="Bu Ay"
          amount="8.900"
          change={8.2}
          icon={<Calendar className="w-5 md:w-6 h-5 md:h-6" />}
          period="Aralık 2025"
        />
        <EarningStatCard
          title="Bu Yıl"
          amount="76.450"
          change={15.7}
          icon={<TrendingUp className="w-5 md:w-6 h-5 md:h-6" />}
          period="2025 Toplam"
        />
        <EarningStatCard
          title="Tüm Zamanlar"
          amount="187.650"
          icon={<CheckCircle className="w-5 md:w-6 h-5 md:h-6" />}
          period="Toplam kazanç"
        />
      </div>

      {/* Payout Status */}
      <PayoutStatus nextPayout={nextPayout} onRequestPayout={handleRequestPayout} />

      {/* Earnings Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 my-6 md:my-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Kazanç Özeti</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Geçtiğimiz yılın aylık kazançları</p>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="text-gray-500">Toplam:</span>
            <span className="font-bold text-gray-900">₺76.450</span>
          </div>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[600px] px-4 md:px-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={earningsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '10px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₺${value.toLocaleString('tr-TR')}`, 'Tutar']}
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
        </div>
      </div>

      {/* Filter Bar */}
      <EarningsFilterBar />

      {/* Transactions Table - Desktop */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">İşlem Geçmişi</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Tüm kazançlarınız ve ödemeleriniz</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mülk / Misafir
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rezervasyon ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  İşlemler
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
      <div className="md:hidden space-y-3">
        <h3 className="text-base font-semibold text-gray-900 px-1">İşlem Geçmişi</h3>
        <p className="text-xs text-gray-500 px-1 -mt-2">Tüm kazançlarınız ve ödemeleriniz</p>
        {mockTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default EarningsPage;
