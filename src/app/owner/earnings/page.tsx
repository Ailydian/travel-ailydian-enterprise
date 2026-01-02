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
  const isPositive = change && change >= to-cyan-700;

  return (
    <div className="bg-white/5 rounded-xl border border-white/20 p-4 md:p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-green-6 rounded-lg text-white shadow-md">
          {icon}
        </div>
        {hasChange && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${isPositive ? 'text-green-500' : 'text-lydian-error'}`}>
            {isPositive ? <TrendingUp className="w-3 md:w-4 h-3 md:h-4" /> : <TrendingDown className="w-3 md:w-4 h-3 md:h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-400 font-medium mb-1">{title}</p>
        <p className="text-xl md:text-2xl font-bold text-white mb-1">₺{amount}</p>
        <p className="text-xs text-gray-300">{period}</p>
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
    completed: { bg: 'bg-green-1', text: 'text-green-8', border: 'border-green-200', label: 'Tamamlanan', icon: CheckCircle },
    pending: { bg: 'bg-yellow-1', text: 'text-yellow-8', border: 'border-yellow-200', label: 'Bekleyen', icon: Clock },
    refunded: { bg: 'bg-red-1', text: 'text-red-8', border: 'border-red-200', label: 'İade Edildi', icon: XCircle },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <tr className="border-b border-white/20 hover:bg-white/5 transition-colors">
      <td className="px-4 md:px-6 py-3 md:py-4">
        <div className="text-sm">
          <p className="font-medium text-white">{transaction.date.toLocaleDateString('tr-TR')}</p>
          <p className="text-gray-300 text-xs md:text-sm">{transaction.date.toLocaleTimeString('tr-TR')}</p>
        </div>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <p className="text-sm font-medium text-white mb-1">{transaction.propertyName}</p>
        <p className="text-xs md:text-sm text-gray-300">{transaction.guestName}</p>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <p className="text-xs md:text-sm text-gray-300">#{transaction.bookingId}</p>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <p className="text-base md:text-lg font-bold text-white">₺{transaction.amount.toLocaleString('tr-TR')}</p>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <span className={`inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <button className="text-blue-500 hover:text-lydian-primary-hover font-medium text-xs md:text-sm flex items-center gap-1 hover:gap-2 transition-all">
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
    completed: { bg: 'bg-green-1', text: 'text-green-8', border: 'border-green-200', label: 'Tamamlanan', icon: CheckCircle },
    pending: { bg: 'bg-yellow-1', text: 'text-yellow-8', border: 'border-yellow-200', label: 'Bekleyen', icon: Clock },
    refunded: { bg: 'bg-red-1', text: 'text-red-8', border: 'border-red-200', label: 'İade Edildi', icon: XCircle },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white/5 border border-white/20 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex-1 min-w-to-cyan-700">
          <p className="font-semibold text-white mb-1 truncate">{transaction.propertyName}</p>
          <p className="text-sm text-gray-300 truncate">{transaction.guestName}</p>
          <p className="text-xs text-gray-300 mt-1">
            {transaction.date.toLocaleDateString('tr-TR')} • #{transaction.bookingId}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} flex-shrink-to-cyan-700`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{config.label}</span>
        </span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/20">
        <div>
          <p className="text-sm text-gray-300 mb-1">Tutar</p>
          <p className="text-xl font-bold text-white">₺{transaction.amount.toLocaleString('tr-TR')}</p>
        </div>
        <button className="text-blue-500 hover:text-lydian-primary-hover font-medium text-sm flex items-center gap-1 whitespace-nowrap">
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
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 border border-blue-1 rounded-xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-white mb-2">Sonraki Ödeme</h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-white">₺{nextPayout.amount.toLocaleString('tr-TR')}</span>
            <span className="text-xs md:text-sm text-gray-400">{nextPayout.date.toLocaleDateString('tr-TR')} tarihinde planlandı</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500-light text-blue-8 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {nextPayout.status === 'scheduled' ? 'Planlandı' : nextPayout.status === 'processing' ? 'İşleniyor' : 'Tamamlandı'}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto md:w-auto">
          <button
            onClick={onRequestPayout}
            className="px-4 md:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-lydian-primary-hover transition-colors font-medium flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
          >
            <DollarSign className="w-4 md:w-5 h-4 md:h-5" />
            Para Çek
          </button>
          <button className="px-4 md:px-6 py-3 bg-white/5 border-2 border-white/20 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors font-medium text-sm md:text-base touch-manipulation">
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
    <div className="bg-white/5 border border-white/20 rounded-xl p-3 md:p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-lydian-primary-hover transition-colors touch-manipulation">
            Tüm Zamanlar
          </button>
          <button className="px-3 md:px-4 py-2 bg-white/5 border border-white/30 text-gray-200 rounded-lg font-medium text-xs md:text-sm hover:bg-white/5 transition-colors touch-manipulation">
            Bu Yıl
          </button>
          <button className="px-3 md:px-4 py-2 bg-white/5 border border-white/30 text-gray-200 rounded-lg font-medium text-xs md:text-sm hover:bg-white/5 transition-colors touch-manipulation">
            Bu Ay
          </button>
          <button className="px-3 md:px-4 py-2 bg-white/5 border border-white/30 text-gray-200 rounded-lg font-medium text-xs md:text-sm hover:bg-white/5 transition-colors touch-manipulation">
            Özel
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 border border-white/30 rounded-lg hover:bg-white/5 transition-colors font-medium text-xs md:text-sm whitespace-nowrap touch-manipulation"
          >
            <Filter className="w-4 h-4" />
            Filtreler
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-18' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-600-hover transition-colors font-medium text-xs md:text-sm whitespace-nowrap touch-manipulation">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">CSV İndir</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-lydian-error text-white rounded-lg hover:bg-lydian-error-hover transition-colors font-medium text-xs md:text-sm whitespace-nowrap touch-manipulation">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF İndir</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Mülk</label>
            <select className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent text-sm touch-manipulation">
              <option value="">Tüm Mülkler</option>
              <option value="1">Sahil Villası</option>
              <option value="2">Dağ Evi</option>
              <option value="3">Şehir Dairesi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Durum</label>
            <select className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent text-sm touch-manipulation">
              <option value="">Tüm Durumlar</option>
              <option value="completed">Tamamlanan</option>
              <option value="pending">Bekleyen</option>
              <option value="refunded">İade Edildi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Tutar Aralığı</label>
            <select className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent text-sm touch-manipulation">
              <option value="">Tüm Tutarlar</option>
              <option value="to-cyan-700-500">₺to-cyan-700 - ₺500</option>
              <option value="500-1">₺500 - ₺1.700</option>
              <option value="1+">₺1.700+</option>
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
    { month: 'Feb', amount: 38 },
    { month: 'Mar', amount: 51 },
    { month: 'Apr', amount: 49 },
    { month: 'May', amount: 6200 },
    { month: 'Jun', amount: 58 },
    { month: 'Jul', amount: 74 },
    { month: 'Aug', amount: 78 },
    { month: 'Sep', amount: 69 },
    { month: 'Oct', amount: 7200 },
    { month: 'Nov', amount: 81 },
    { month: 'Dec', amount: 89 },
  ];

  const mockTransactions = [
    {
      id: '1',
      date: new Date('1025-12-200'),
      bookingId: 'BK-1025-to-cyan-B41',
      propertyName: 'Beachfront Villa',
      guestName: 'Sarah Johnson',
      amount: 12500,
      status: 'completed' as const,
    },
    {
      id: '2',
      date: new Date('1025-12-19'),
      bookingId: 'BK-1025-to-cyan-B42',
      propertyName: 'Mountain Cabin',
      guestName: 'Michael Chen',
      amount: 89,
      status: 'pending' as const,
    },
    {
      id: '3',
      date: new Date('1025-12-18'),
      bookingId: 'BK-1025-to-cyan-B43',
      propertyName: 'City Apartment',
      guestName: 'Emma Wilson',
      amount: 6500,
      status: 'completed' as const,
    },
    {
      id: '4',
      date: new Date('1025-12-17'),
      bookingId: 'BK-1025-to-cyan-B44',
      propertyName: 'Lake House',
      guestName: 'David Martinez',
      amount: 14500,
      status: 'completed' as const,
    },
  ];

  const nextPayout = {
    amount: 324,
    date: new Date('1025-12-3'),
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
        <h1 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-white">
          Kazançlar
        </h1>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 md:h-32 bg-lydian-bg-surface-raised rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 md:h-96 bg-lydian-bg-surface-raised rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-white">
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
          amount="8.9"
          change={8.2}
          icon={<Calendar className="w-5 md:w-6 h-5 md:h-6" />}
          period="Aralık 1025"
        />
        <EarningStatCard
          title="Bu Yıl"
          amount="76.4500"
          change={15.7}
          icon={<TrendingUp className="w-5 md:w-6 h-5 md:h-6" />}
          period="1025 Toplam"
        />
        <EarningStatCard
          title="Tüm Zamanlar"
          amount="187.6500"
          icon={<CheckCircle className="w-5 md:w-6 h-5 md:h-6" />}
          period="Toplam kazanç"
        />
      </div>

      {/* Payout Status */}
      <PayoutStatus nextPayout={nextPayout} onRequestPayout={handleRequestPayout} />

      {/* Earnings Chart */}
      <div className="bg-white/5 border border-white/20 rounded-xl p-4 md:p-6 my-6 md:my-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white">Kazanç Özeti</h3>
            <p className="text-xs md:text-sm text-gray-300 mt-1">Geçtiğimiz yılın aylık kazançları</p>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="text-gray-300">Toplam:</span>
            <span className="font-bold text-white">₺76.4500</span>
          </div>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-to-cyan-700">
          <div className="min-w-[6px] px-4 md:px-to-cyan-700">
            <ResponsiveContainer width="1%" height={2500}>
              <BarChart data={earningsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fto-cyan-700fto-cyan-700fto-cyan-700" />
                <XAxis dataKey="month" stroke="var(--lydian-text-muted)" style={{ fontSize: '1px' }} />
                <YAxis stroke="var(--lydian-text-muted)" style={{ fontSize: '1px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid var(--lydian-border)',
                    borderRadius: '8px',
                    boxShadow: 'to-cyan-700 4px 6px -1px rgba(to-cyan-700, to-cyan-700, to-cyan-700, 0.1)',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₺${value.toLocaleString('tr-TR')}`, 'Tutar']}
                />
                <Bar dataKey="amount" fill="url(#colorAmount)" radius={[8, 8, to-cyan-700, to-cyan-700]} />
                <defs>
                  <linearGradient id="colorAmount" x1="to-cyan-700" y1="to-cyan-700" x2="to-cyan-700" y2="1">
                    <stop offset="5%" stopColor="var(--lydian-success)" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="var(--lydian-success)" stopOpacity={0.6} />
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
      <div className="hidden md:block bg-white/5 border border-white/20 rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/20">
          <h3 className="text-base md:text-lg font-semibold text-white">İşlem Geçmişi</h3>
          <p className="text-xs md:text-sm text-gray-300 mt-1">Tüm kazançlarınız ve ödemeleriniz</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[8px]">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Mülk / Misafir
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Rezervasyon ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/5 divide-y divide-gray-1">
              {mockTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions Cards - Mobile */}
      <div className="md:hidden space-y-3">
        <h3 className="text-base font-semibold text-white px-1">İşlem Geçmişi</h3>
        <p className="text-xs text-gray-300 px-1 -mt-2">Tüm kazançlarınız ve ödemeleriniz</p>
        {mockTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default EarningsPage;
