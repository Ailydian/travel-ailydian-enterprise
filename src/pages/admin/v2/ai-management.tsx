/**
 * AI & Vision Management Module
 * AdminV2 - Comprehensive AI & Vision Analytics Dashboard
 *
 * @module AIManagement
 * @realtime WebSocket integration for live AI metrics
 * @performance Optimized for high-frequency updates
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Eye,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  Activity,
  Search,
  Image as ImageIcon,
  Settings,
  BarChart3,
  PieChart,
  Cpu,
  Database,
  RefreshCw,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';
import logger from '../../../lib/logger';

// ============================================
// TYPES & INTERFACES
// ============================================

interface AIProvider {
  readonly id: string;
  readonly name: string;
  readonly status: 'active' | 'inactive' | 'error';
  readonly model: string;
  readonly requestsToday: number;
  readonly avgResponseTime: number;
  readonly successRate: number;
  readonly costToday: number;
  readonly tokensUsed: number;
  readonly errors: number;
}

interface VisionSearchQuery {
  readonly id: string;
  readonly timestamp: string;
  readonly imageUrl: string;
  readonly provider: string;
  readonly model: string;
  readonly results: number;
  readonly confidence: number;
  readonly responseTime: number;
  readonly cost: number;
  readonly userId?: string;
}

interface AIMetrics {
  readonly totalRequests: number;
  readonly totalCost: number;
  readonly avgResponseTime: number;
  readonly successRate: number;
  readonly totalTokens: number;
  readonly activeProviders: number;
  readonly errorRate: number;
}

interface ProviderConfig {
  readonly provider: string;
  readonly enabled: boolean;
  readonly priority: number;
  readonly maxTokens: number;
  readonly temperature: number;
  readonly rateLimit: number;
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

const AI_PROVIDERS = [
  { id: 'openai', name: 'OpenAI GPT-4 Vision', color: 'emerald' },
  { id: 'anthropic', name: 'Claude Vision', color: 'purple' },
  { id: 'google', name: 'Google Gemini Vision', color: 'blue' },
  { id: 'groq', name: 'Groq Vision', color: 'orange' },
] as const;

// ============================================
// MAIN COMPONENT
// ============================================

export default function AIManagementPage() {
  // ============================================
  // STATE
  // ============================================

  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [searchQueries, setSearchQueries] = useState<VisionSearchQuery[]>([]);
  const [metrics, setMetrics] = useState<AIMetrics>({
    totalRequests: 0,
    totalCost: 0,
    avgResponseTime: 0,
    successRate: 0,
    totalTokens: 0,
    activeProviders: 0,
    errorRate: 0,
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // ============================================
  // DATA FETCHING
  // ============================================

  const fetchAIData = async () => {
    try {
      setIsRefreshing(true);

      const [providersRes, queriesRes, metricsRes] = await Promise.all([
        fetch(`/api/admin/ai-vision/providers?hours=${selectedTimeRange.hours}`),
        fetch(`/api/admin/ai-vision/queries?hours=${selectedTimeRange.hours}&limit=50`),
        fetch(`/api/admin/ai-vision/metrics?hours=${selectedTimeRange.hours}`),
      ]);

      if (providersRes.ok) {
        const data = await providersRes.json();
        setProviders(data.providers);
      }

      if (queriesRes.ok) {
        const data = await queriesRes.json();
        setSearchQueries(data.queries);
      }

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data.metrics);
      }
    } catch (error) {
      logger.error('Failed to fetch AI data', { error });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAIData();
    const interval = setInterval(fetchAIData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  // ============================================
  // FILTERED DATA
  // ============================================

  const filteredQueries = useMemo(() => {
    return searchQueries.filter((query) => {
      const matchesProvider =
        selectedProvider === 'all' || query.provider === selectedProvider;
      const matchesSearch =
        searchFilter === '' ||
        query.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
        query.model.toLowerCase().includes(searchFilter.toLowerCase());

      return matchesProvider && matchesSearch;
    });
  }, [searchQueries, selectedProvider, searchFilter]);

  // ============================================
  // EXPORT HANDLERS
  // ============================================

  const handleExportData = async () => {
    try {
      const response = await fetch(
        `/api/admin/ai-vision/export?hours=${selectedTimeRange.hours}&format=csv`
      );

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-vision-data-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      logger.error('Failed to export data', { error });
    }
  };

  // ============================================
  // RENDER HELPERS
  // ============================================

  const getStatusColor = (status: AIProvider['status']) => {
    switch (status) {
      case 'active':
        return 'text-success-500 bg-success-500/10';
      case 'inactive':
        return 'text-text-muted bg-surface-elevated';
      case 'error':
        return 'text-error-500 bg-error-500/10';
      default:
        return 'text-text-muted bg-surface-elevated';
    }
  };

  const getProviderColor = (providerId: string) => {
    const provider = AI_PROVIDERS.find((p) => p.id === providerId);
    return provider?.color || 'gray';
  };

  // ============================================
  // RENDER
  // ============================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading AI Management Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-8 h-8" />
                <h1 className="text-3xl font-bold">AI & Vision Management</h1>
              </div>
              <p className="text-primary-100">
                Real-time monitoring and analytics for AI providers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAIData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleExportData}
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
                    ? 'bg-white text-primary-600 font-semibold'
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
            label="Total Requests"
            value={metrics.totalRequests.toLocaleString()}
            trend="+12.5%"
            trendUp
          />
          <MetricCard
            icon={DollarSign}
            label="Total Cost"
            value={`$${metrics.totalCost.toFixed(2)}`}
            trend="+8.3%"
            trendUp={false}
          />
          <MetricCard
            icon={Clock}
            label="Avg Response Time"
            value={`${metrics.avgResponseTime.toFixed(0)}ms`}
            trend="-5.2%"
            trendUp
          />
          <MetricCard
            icon={CheckCircle}
            label="Success Rate"
            value={`${(metrics.successRate * 100).toFixed(1)}%`}
            trend="+2.1%"
            trendUp
          />
        </div>

        {/* AI Providers Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary-500" />
            AI Providers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>

        {/* Vision Search Queries */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary-500" />
              Vision Search Queries
            </h2>

            <div className="flex items-center gap-3">
              {/* Provider Filter */}
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Providers</option>
                {AI_PROVIDERS.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>

              {/* Search Filter */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search queries..."
                  className="pl-10 pr-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-elevated rounded-xl border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-card border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Query ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Results
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Response Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredQueries.map((query) => (
                    <QueryRow key={query.id} query={query} />
                  ))}
                </tbody>
              </table>

              {filteredQueries.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">No vision search queries found</p>
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
        <Icon className="w-8 h-8 text-primary-500" />
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

interface ProviderCardProps {
  readonly provider: AIProvider;
}

function ProviderCard({ provider }: ProviderCardProps) {
  const getStatusColor = (status: AIProvider['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-500';
      case 'inactive':
        return 'bg-text-muted';
      case 'error':
        return 'bg-error-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-elevated rounded-xl p-6 border border-border-subtle"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">{provider.name}</h3>
          <p className="text-sm text-text-secondary">{provider.model}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(provider.status)}`} />
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Requests</span>
          <span className="text-sm font-semibold text-text-primary">
            {provider.requestsToday.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Avg Response</span>
          <span className="text-sm font-semibold text-text-primary">
            {provider.avgResponseTime.toFixed(0)}ms
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Success Rate</span>
          <span className="text-sm font-semibold text-success-500">
            {(provider.successRate * 100).toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Cost Today</span>
          <span className="text-sm font-semibold text-text-primary">
            ${provider.costToday.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Tokens Used</span>
          <span className="text-sm font-semibold text-text-primary">
            {provider.tokensUsed.toLocaleString()}
          </span>
        </div>

        {provider.errors > 0 && (
          <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
            <span className="text-sm text-error-500">Errors</span>
            <span className="text-sm font-semibold text-error-500">{provider.errors}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface QueryRowProps {
  readonly query: VisionSearchQuery;
}

function QueryRow({ query }: QueryRowProps) {
  return (
    <tr className="hover:bg-surface-card transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          src={query.imageUrl}
          alt="Query"
          className="w-12 h-12 object-cover rounded-lg"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-mono text-text-primary">{query.id.slice(0, 8)}...</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-500">
          {query.provider}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {query.results}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-full bg-surface-card rounded-full h-2 max-w-[60px]">
            <div
              className="bg-success-500 h-2 rounded-full"
              style={{ width: `${query.confidence * 100}%` }}
            />
          </div>
          <span className="text-sm text-text-primary">
            {(query.confidence * 100).toFixed(0)}%
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {query.responseTime.toFixed(0)}ms
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        ${query.cost.toFixed(4)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {new Date(query.timestamp).toLocaleString()}
      </td>
    </tr>
  );
}
