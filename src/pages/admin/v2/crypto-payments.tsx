/**
 * Crypto Payments Module
 * AdminV2 - Cryptocurrency Payment Management Dashboard
 *
 * @module CryptoPayments
 * @integration Coinbase Commerce
 * @crypto BTC, ETH, USDC, USDT, DAI, LTC, BCH, DOGE
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bitcoin,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Copy,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import logger from '../../../lib/logger';

// ============================================
// TYPES & INTERFACES
// ============================================

interface CryptoCharge {
  readonly id: string;
  readonly code: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly status: 'NEW' | 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'CANCELED';
  readonly amount: string;
  readonly currency: string;
  readonly cryptoAmount?: string;
  readonly cryptoCurrency?: string;
  readonly hostedUrl: string;
  readonly bookingId?: string;
  readonly userId?: string;
  readonly confirmations?: number;
  readonly txHash?: string;
}

interface CryptoMetrics {
  readonly totalCharges: number;
  readonly completedCharges: number;
  readonly totalValue: number;
  readonly completionRate: number;
  readonly byCurrency: Record<string, number>;
  readonly avgValue: number;
}

interface TimeRange {
  readonly label: string;
  readonly hours: number;
}

// ============================================
// CONSTANTS
// ============================================

const TIME_RANGES: readonly TimeRange[] = [
  { label: '24 Hours', hours: 24 },
  { label: '7 Days', hours: 168 },
  { label: '30 Days', hours: 720 },
  { label: '90 Days', hours: 2160 },
];

const CRYPTO_ICONS: Record<string, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  USDC: '$',
  USDT: '₮',
  DAI: '◈',
  LTC: 'Ł',
  BCH: '฿',
  DOGE: 'Ð',
};

const STATUS_CONFIG = {
  NEW: { color: 'info', label: 'New', icon: Clock },
  PENDING: { color: 'warning', label: 'Pending', icon: Clock },
  COMPLETED: { color: 'success', label: 'Completed', icon: CheckCircle },
  EXPIRED: { color: 'error', label: 'Expired', icon: XCircle },
  CANCELED: { color: 'error', label: 'Canceled', icon: XCircle },
} as const;

// ============================================
// MAIN COMPONENT
// ============================================

export default function CryptoPaymentsPage() {
  // ============================================
  // STATE
  // ============================================

  const [charges, setCharges] = useState<CryptoCharge[]>([]);
  const [metrics, setMetrics] = useState<CryptoMetrics>({
    totalCharges: 0,
    completedCharges: 0,
    totalValue: 0,
    completionRate: 0,
    byCurrency: {},
    avgValue: 0,
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // ============================================
  // DATA FETCHING
  // ============================================

  const fetchCryptoData = async () => {
    try {
      setIsRefreshing(true);

      const [chargesRes, metricsRes] = await Promise.all([
        fetch(`/api/admin/crypto/charges?hours=${selectedTimeRange.hours}`),
        fetch(`/api/admin/crypto/metrics?hours=${selectedTimeRange.hours}`),
      ]);

      if (chargesRes.ok) {
        const data = await chargesRes.json();
        setCharges(data.charges);
      }

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data.metrics);
      }
    } catch (error) {
      logger.error('Failed to fetch crypto payment data', { error });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  // ============================================
  // FILTERED CHARGES
  // ============================================

  const filteredCharges = useMemo(() => {
    return charges.filter((charge) => {
      const matchesStatus = selectedStatus === 'all' || charge.status === selectedStatus;
      const matchesSearch =
        searchFilter === '' ||
        charge.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
        charge.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
        charge.bookingId?.toLowerCase().includes(searchFilter.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [charges, selectedStatus, searchFilter]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Show toast notification
    logger.info('Charge code copied', { code });
  };

  const handleViewCharge = (charge: CryptoCharge) => {
    window.open(charge.hostedUrl, '_blank');
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `/api/admin/crypto/export?hours=${selectedTimeRange.hours}`
      );

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `crypto-payments-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      logger.error('Failed to export crypto payments', { error });
    }
  };

  // ============================================
  // RENDER
  // ============================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading Crypto Payments Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <div className="bg-gradient-to-r from-warning-600 to-warning-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Bitcoin className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Crypto Payments</h1>
              </div>
              <p className="text-warning-100">
                Manage cryptocurrency payments and transactions
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchCryptoData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mt-6 flex gap-2">
            {TIME_RANGES.map((range) => (
              <button
                key={range.hours}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTimeRange.hours === range.hours
                    ? 'bg-white text-warning-600 font-semibold'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Activity}
            label="Total Charges"
            value={metrics.totalCharges.toLocaleString()}
            trend="+8%"
            trendUp
          />
          <MetricCard
            icon={CheckCircle}
            label="Completed"
            value={metrics.completedCharges.toLocaleString()}
            trend="+12%"
            trendUp
          />
          <MetricCard
            icon={DollarSign}
            label="Total Value"
            value={`$${metrics.totalValue.toLocaleString()}`}
            trend="+15%"
            trendUp
          />
          <MetricCard
            icon={TrendingUp}
            label="Completion Rate"
            value={`${(metrics.completionRate * 100).toFixed(1)}%`}
            trend="+2.5%"
            trendUp
          />
        </div>

        {/* Currency Distribution */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <Bitcoin className="w-6 h-6 text-warning-500" />
            Payment Distribution by Currency
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {Object.entries(metrics.byCurrency).map(([currency, count]) => (
              <CurrencyCard
                key={currency}
                currency={currency}
                count={count}
                icon={CRYPTO_ICONS[currency] || '●'}
              />
            ))}
          </div>
        </div>

        {/* Charges Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary-500" />
              Payment Charges
            </h2>

            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="NEW">New</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="EXPIRED">Expired</option>
                <option value="CANCELED">Canceled</option>
              </select>

              {/* Search Filter */}
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search charges..."
                className="px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="bg-surface-elevated rounded-xl border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-card border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Charge Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Crypto Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredCharges.map((charge) => (
                    <ChargeRow
                      key={charge.id}
                      charge={charge}
                      onCopy={handleCopyCode}
                      onView={handleViewCharge}
                    />
                  ))}
                </tbody>
              </table>

              {filteredCharges.length === 0 && (
                <div className="text-center py-12">
                  <Bitcoin className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">No crypto charges found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface MetricCardProps {
  readonly icon: React.ElementType;
  readonly label: string;
  readonly value: string;
  readonly trend: string;
  readonly trendUp: boolean;
}

function MetricCard({ icon: Icon, label, value, trend, trendUp }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-elevated rounded-xl p-6 border border-border-subtle"
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-8 h-8 text-warning-500" />
        <span
          className={`text-sm font-medium ${
            trendUp ? 'text-success-500' : 'text-error-500'
          }`}
        >
          {trend}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-text-primary mb-1">{value}</h3>
      <p className="text-sm text-text-secondary">{label}</p>
    </motion.div>
  );
}

interface CurrencyCardProps {
  readonly currency: string;
  readonly count: number;
  readonly icon: string;
}

function CurrencyCard({ currency, count, icon }: CurrencyCardProps) {
  return (
    <div className="bg-surface-elevated rounded-lg p-4 border border-border-subtle text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-semibold text-text-primary">{currency}</p>
      <p className="text-xs text-text-secondary">{count} payments</p>
    </div>
  );
}

interface ChargeRowProps {
  readonly charge: CryptoCharge;
  readonly onCopy: (code: string) => void;
  readonly onView: (charge: CryptoCharge) => void;
}

function ChargeRow({ charge, onCopy, onView }: ChargeRowProps) {
  const StatusIcon = STATUS_CONFIG[charge.status].icon;
  const statusColor = STATUS_CONFIG[charge.status].color;

  return (
    <tr className="hover:bg-surface-card transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-text-primary">{charge.code}</span>
          <button
            onClick={() => onCopy(charge.code)}
            className="text-text-muted hover:text-primary-500 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 text-${statusColor}-500`} />
          <span className={`text-sm font-medium text-${statusColor}-500`}>
            {STATUS_CONFIG[charge.status].label}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary font-semibold">
        {charge.amount} {charge.currency}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {charge.cryptoAmount ? (
          <span>
            {charge.cryptoAmount} {charge.cryptoCurrency}
          </span>
        ) : (
          <span className="text-text-muted">—</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {charge.bookingId || '—'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {new Date(charge.createdAt).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {new Date(charge.expiresAt).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onView(charge)}
          className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1"
        >
          <ExternalLink className="w-4 h-4" />
          View
        </button>
      </td>
    </tr>
  );
}
