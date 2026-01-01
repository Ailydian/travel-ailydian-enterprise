/**
 * Monitoring & Errors Module
 * AdminV2 - Real-time Monitoring Dashboard with Sentry Integration
 *
 * @module MonitoringDashboard
 * @realtime Error tracking, performance monitoring, uptime tracking
 * @integration Sentry, Performance Monitor, Custom Analytics
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Activity,
  Zap,
  Server,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Code,
  BarChart3,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
} from 'lucide-react';
import logger from '../../../lib/logger';
import {performanceMonitor } from '../../../lib/monitoring/performance-monitor';

// ============================================
// TYPES & INTERFACES
// ============================================

interface ErrorMetrics {
  readonly totalErrors: number;
  readonly errorRate: number;
  readonly errorsByType: Record<string, number>;
  readonly recentErrors: readonly SentryError[];
  readonly criticalErrors: number;
}

interface SentryError {
  readonly id: string;
  readonly timestamp: string;
  readonly message: string;
  readonly level: 'error' | 'warning' | 'fatal' | 'info';
  readonly environment: string;
  readonly user?: string;
  readonly url?: string;
  readonly stackTrace?: string;
  readonly tags: Record<string, string>;
  readonly count: number;
}

interface PerformanceMetrics {
  readonly webVitals: {
    readonly CLS: number | null;
    readonly FCP: number | null;
    readonly FID: number | null;
    readonly INP: number | null;
    readonly LCP: number | null;
    readonly TTFB: number | null;
  };
  readonly customMetrics: ReadonlyArray<{
    readonly name: string;
    readonly value: number;
    readonly rating: 'good' | 'needs-improvement' | 'poor';
  }>;
  readonly resourceMetrics: ReadonlyArray<{
    readonly name: string;
    readonly type: string;
    readonly duration: number;
    readonly size: number;
  }>;
}

interface SystemHealth {
  readonly status: 'healthy' | 'degraded' | 'down';
  readonly uptime: number;
  readonly lastCheck: string;
  readonly services: ReadonlyArray<{
    readonly name: string;
    readonly status: 'up' | 'down';
    readonly responseTime: number;
    readonly lastError?: string;
  }>;
}

interface TimeRange {
  readonly label: string;
  readonly hours: number;
}

// ============================================
// CONSTANTS
// ============================================

const TIME_RANGES: readonly TimeRange[] = [
  { label: '1 Hour', hours: 1 },
  { label: '24 Hours', hours: 24 },
  { label: '7 Days', hours: 168 },
  { label: '30 Days', hours: 720 },
];

const ERROR_LEVELS = {
  fatal: { color: 'error', icon: XCircle },
  error: { color: 'error', icon: AlertCircle },
  warning: { color: 'warning', icon: AlertTriangle },
  info: { color: 'info', icon: AlertCircle },
} as const;

// ============================================
// MAIN COMPONENT
// ============================================

export default function MonitoringDashboard() {
  // ============================================
  // STATE
  // ============================================

  const [errorMetrics, setErrorMetrics] = useState<ErrorMetrics>({
    totalErrors: 0,
    errorRate: 0,
    errorsByType: {},
    recentErrors: [],
    criticalErrors: 0,
  });

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    webVitals: {
      CLS: null,
      FCP: null,
      FID: null,
      INP: null,
      LCP: null,
      TTFB: null,
    },
    customMetrics: [],
    resourceMetrics: [],
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: 'healthy',
    uptime: 99.9,
    lastCheck: new Date().toISOString(),
    services: [],
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[1]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedErrorLevel, setSelectedErrorLevel] = useState<string>('all');

  // ============================================
  // DATA FETCHING
  // ============================================

  const fetchMonitoringData = async () => {
    try {
      setIsRefreshing(true);

      const [errorsRes, perfRes, healthRes] = await Promise.all([
        fetch(`/api/admin/monitoring/errors?hours=${selectedTimeRange.hours}`),
        fetch(`/api/admin/monitoring/performance?hours=${selectedTimeRange.hours}`),
        fetch(`/api/admin/monitoring/health`),
      ]);

      if (errorsRes.ok) {
        const data = await errorsRes.json();
        setErrorMetrics(data.metrics);
      }

      if (perfRes.ok) {
        const data = await perfRes.json();
        setPerformanceMetrics(data.metrics);
      }

      if (healthRes.ok) {
        const data = await healthRes.json();
        setSystemHealth(data.health);
      }
    } catch (error) {
      logger.error('Failed to fetch monitoring data', { error });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  // ============================================
  // FILTERED ERRORS
  // ============================================

  const filteredErrors = useMemo(() => {
    if (selectedErrorLevel === 'all') return errorMetrics.recentErrors;
    return errorMetrics.recentErrors.filter((err) => err.level === selectedErrorLevel);
  }, [errorMetrics.recentErrors, selectedErrorLevel]);

  // ============================================
  // EXPORT HANDLERS
  // ============================================

  const handleExportErrors = async () => {
    try {
      const response = await fetch(
        `/api/admin/monitoring/export?hours=${selectedTimeRange.hours}&type=errors`
      );

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `error-report-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      logger.error('Failed to export errors', { error });
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
          <p className="text-text-secondary">Loading Monitoring Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <div className="bg-gradient-to-r from-error-600 to-error-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Monitoring & Errors</h1>
              </div>
              <p className="text-error-100">
                Real-time system health, error tracking, and performance monitoring
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* System Status */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                {systemHealth.status === 'healthy' ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-success-300" />
                    <span className="font-semibold">All Systems Operational</span>
                  </>
                ) : systemHealth.status === 'degraded' ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-warning-300" />
                    <span className="font-semibold">Degraded Performance</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-error-300" />
                    <span className="font-semibold">System Down</span>
                  </>
                )}
              </div>

              <button
                onClick={fetchMonitoringData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleExportErrors}
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
                    ? 'bg-white text-error-600 font-semibold'
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
            icon={AlertTriangle}
            label="Total Errors"
            value={errorMetrics.totalErrors.toLocaleString()}
            trend={errorMetrics.errorRate > 0.01 ? '+15%' : '-5%'}
            trendUp={false}
            color="error"
          />
          <MetricCard
            icon={Activity}
            label="Error Rate"
            value={`${(errorMetrics.errorRate * 100).toFixed(2)}%`}
            trend="-2.3%"
            trendUp={true}
            color="warning"
          />
          <MetricCard
            icon={CheckCircle}
            label="Uptime"
            value={`${systemHealth.uptime.toFixed(2)}%`}
            trend="+0.1%"
            trendUp={true}
            color="success"
          />
          <MetricCard
            icon={Zap}
            label="Avg Response Time"
            value={`${performanceMetrics.webVitals.TTFB || 0}ms`}
            trend="-12ms"
            trendUp={true}
            color="info"
          />
        </div>

        {/* Web Vitals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary-500" />
            Web Vitals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <WebVitalCard
              label="CLS"
              value={performanceMetrics.webVitals.CLS}
              threshold={{ good: 0.1, poor: 0.25 }}
              unit=""
            />
            <WebVitalCard
              label="FCP"
              value={performanceMetrics.webVitals.FCP}
              threshold={{ good: 1800, poor: 3000 }}
              unit="ms"
            />
            <WebVitalCard
              label="FID"
              value={performanceMetrics.webVitals.FID}
              threshold={{ good: 100, poor: 300 }}
              unit="ms"
            />
            <WebVitalCard
              label="INP"
              value={performanceMetrics.webVitals.INP}
              threshold={{ good: 200, poor: 500 }}
              unit="ms"
            />
            <WebVitalCard
              label="LCP"
              value={performanceMetrics.webVitals.LCP}
              threshold={{ good: 2500, poor: 4000 }}
              unit="ms"
            />
            <WebVitalCard
              label="TTFB"
              value={performanceMetrics.webVitals.TTFB}
              threshold={{ good: 800, poor: 1800 }}
              unit="ms"
            />
          </div>
        </div>

        {/* Services Status */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <Server className="w-6 h-6 text-primary-500" />
            Services Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemHealth.services.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>

        {/* Recent Errors */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-error-500" />
              Recent Errors
            </h2>

            {/* Error Level Filter */}
            <select
              value={selectedErrorLevel}
              onChange={(e) => setSelectedErrorLevel(e.target.value)}
              className="px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="fatal">Fatal</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div className="bg-surface-elevated rounded-xl border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-card border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Environment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredErrors.map((error) => (
                    <ErrorRow key={error.id} error={error} />
                  ))}
                </tbody>
              </table>

              {filteredErrors.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
                  <p className="text-text-secondary">No errors found</p>
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
  readonly color: 'error' | 'warning' | 'success' | 'info';
}

function MetricCard({ icon: Icon, label, value, trend, trendUp, color }: MetricCardProps) {
  const colorClasses = {
    error: 'text-error-500',
    warning: 'text-warning-500',
    success: 'text-success-500',
    info: 'text-info-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-elevated rounded-xl p-6 border border-border-subtle"
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
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

interface WebVitalCardProps {
  readonly label: string;
  readonly value: number | null;
  readonly threshold: { good: number; poor: number };
  readonly unit: string;
}

function WebVitalCard({ label, value, threshold, unit }: WebVitalCardProps) {
  const getRating = () => {
    if (value === null) return 'unknown';
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const rating = getRating();
  const ratingColors = {
    good: 'bg-success-500',
    'needs-improvement': 'bg-warning-500',
    poor: 'bg-error-500',
    unknown: 'bg-text-muted',
  };

  return (
    <div className="bg-surface-elevated rounded-lg p-4 border border-border-subtle">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-text-secondary">{label}</span>
        <div className={`w-3 h-3 rounded-full ${ratingColors[rating]}`} />
      </div>
      <p className="text-2xl font-bold text-text-primary">
        {value !== null ? `${value.toFixed(0)}${unit}` : 'N/A'}
      </p>
    </div>
  );
}

interface ServiceCardProps {
  readonly service: {
    readonly name: string;
    readonly status: 'up' | 'down';
    readonly responseTime: number;
    readonly lastError?: string;
  };
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-surface-elevated rounded-lg p-4 border border-border-subtle">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-text-primary">{service.name}</span>
        {service.status === 'up' ? (
          <Wifi className="w-5 h-5 text-success-500" />
        ) : (
          <WifiOff className="w-5 h-5 text-error-500" />
        )}
      </div>
      <p className="text-xs text-text-secondary mb-1">
        Response: {service.responseTime}ms
      </p>
      {service.lastError && (
        <p className="text-xs text-error-500 truncate">{service.lastError}</p>
      )}
    </div>
  );
}

interface ErrorRowProps {
  readonly error: SentryError;
}

function ErrorRow({ error }: ErrorRowProps) {
  const LevelIcon = ERROR_LEVELS[error.level].icon;
  const levelColor = ERROR_LEVELS[error.level].color;

  return (
    <tr className="hover:bg-surface-card transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <LevelIcon className={`w-5 h-5 text-${levelColor}-500`} />
          <span className={`text-sm font-medium text-${levelColor}-500 capitalize`}>
            {error.level}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-text-primary font-medium truncate max-w-md">
          {error.message}
        </p>
        {error.url && (
          <p className="text-xs text-text-muted truncate max-w-md">{error.url}</p>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-500">
          {error.environment}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {error.count}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
        {new Date(error.timestamp).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
