/**
 * TRAVEL AILYDIAN - ULTRA PREMIUM ADMIN DASHBOARD V2
 * Unified B2B/B2C Management System
 *
 * Features:
 * - Real-time analytics across ALL products
 * - Unified product management (Rentals, Transfers, Cars, Tours)
 * - B2B partner portal integration
 * - Advanced financial reporting
 * - Multi-currency & multi-language support
 * - Live booking notifications
 * - Competitive intelligence dashboard
 * - API health monitoring
 * - Content management system
 *
 * Inspired by: Booking.com Extranet, Airbnb Host Dashboard, Expedia Partner Central
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  LayoutDashboard, TrendingUp, TrendingDown, Users, DollarSign,
  Car, Bus, Home, MapPin, Calendar, Star, AlertTriangle,
  Activity, BarChart3, PieChart, ArrowUpRight, Settings,
  Bell, Search, Filter, Download, Eye, RefreshCw,
  Shield, Zap, Target, Globe, Package, CreditCard,
  FileText, Briefcase, Clock, CheckCircle, XCircle,
  PlayCircle, PauseCircle, Wifi, WifiOff, TrendingUpIcon,
  ShoppingCart, MessageSquare, Plane, Ship, ChevronDown,
  ChevronUp, Plus, Edit, Trash2, Lock, Unlock, Database,
  Server, Cpu, HardDrive, Network, Code
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
interface RealtimeMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  realtime?: boolean;
  currency?: boolean;
}

interface ProductCategory {
  id: string;
  name: string;
  icon: any;
  revenue: number;
  bookings: number;
  active: number;
  pending: number;
  growth: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdate: string;
}

interface LiveBooking {
  id: string;
  type: 'rental' | 'transfer' | 'car' | 'tour';
  customer: string;
  product: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  timestamp: string;
  country: string;
}

interface B2BPartner {
  id: string;
  name: string;
  type: 'hotel' | 'agency' | 'corporate';
  revenue: number;
  bookings: number;
  commission: number;
  status: 'active' | 'inactive' | 'pending';
  lastActivity: string;
}

interface SystemHealth {
  api: 'operational' | 'degraded' | 'down';
  database: 'operational' | 'degraded' | 'down';
  payment: 'operational' | 'degraded' | 'down';
  cache: 'operational' | 'degraded' | 'down';
  lastCheck: string;
}

const AdminDashboardV2 = () => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<'realtime' | '24h' | '7d' | '30d' | '90d'>('30d');
  const [selectedCurrency, setSelectedCurrency] = useState<'TRY' | 'USD' | 'EUR'>('TRY');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'b2b' | 'analytics' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRealtimeEnabled, setIsRealtimeEnabled] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Currency converter (mock - would use real rates)
  const currencyRates = { TRY: 1, USD: 34.5, EUR: 37.2 };
  const convertCurrency = (amount: number) => {
    return amount * currencyRates[selectedCurrency];
  };
  const formatCurrency = (amount: number) => {
    const converted = convertCurrency(amount);
    const symbols = { TRY: '₺', USD: '$', EUR: '€' };
    return `${symbols[selectedCurrency]}${converted.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;
  };

  // Real-time metrics (simulated - would connect to WebSocket)
  const [metrics, setMetrics] = useState<RealtimeMetric[]>([
    {
      id: 'revenue',
      label: 'Toplam Gelir (Bu Ay)',
      value: 4850000,
      change: 15.8,
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      realtime: true,
      currency: true,
    },
    {
      id: 'bookings',
      label: 'Aktif Rezervasyonlar',
      value: '2,847',
      change: 12.3,
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      realtime: true,
    },
    {
      id: 'users',
      label: 'Toplam Kullanıcılar',
      value: '38,492',
      change: 23.5,
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'conversion',
      label: 'Dönüşüm Oranı',
      value: '6.8%',
      change: 2.1,
      trend: 'up',
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]);

  // Product categories with real-time data
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([
    {
      id: 'car-rental',
      name: 'Araç Kiralama',
      icon: Car,
      revenue: 1850000,
      bookings: 847,
      active: 1200,
      pending: 45,
      growth: 18.5,
      status: 'healthy',
      lastUpdate: 'Şimdi',
    },
    {
      id: 'transfer',
      name: 'Transfer Hizmetleri',
      icon: Bus,
      revenue: 1450000,
      bookings: 1234,
      active: 580,
      pending: 28,
      growth: 25.3,
      status: 'healthy',
      lastUpdate: '2 dk önce',
    },
    {
      id: 'rental',
      name: 'Konaklama',
      icon: Home,
      revenue: 1280000,
      bookings: 456,
      active: 320,
      pending: 12,
      growth: 12.7,
      status: 'warning',
      lastUpdate: '5 dk önce',
    },
    {
      id: 'tours',
      name: 'Turlar & Aktiviteler',
      icon: MapPin,
      revenue: 270000,
      bookings: 310,
      active: 185,
      pending: 8,
      growth: -3.2,
      status: 'critical',
      lastUpdate: '1 dk önce',
    },
  ]);

  // Live bookings (real-time simulation)
  const [liveBookings, setLiveBookings] = useState<LiveBooking[]>([
    {
      id: '1',
      type: 'car',
      customer: 'Ahmet Y.',
      product: 'BMW 5 Serisi - 7 Gün',
      amount: 15000,
      currency: 'TRY',
      status: 'confirmed',
      timestamp: '30 saniye önce',
      country: 'TR',
    },
    {
      id: '2',
      type: 'transfer',
      customer: 'Sarah M.',
      product: 'İstanbul Havalimanı → Taksim VIP',
      amount: 850,
      currency: 'TRY',
      status: 'pending',
      timestamp: '2 dakika önce',
      country: 'US',
    },
    {
      id: '3',
      type: 'rental',
      customer: 'Mehmet K.',
      product: 'Bodrum Villa - 14 Gün',
      amount: 42000,
      currency: 'TRY',
      status: 'confirmed',
      timestamp: '5 dakika önce',
      country: 'TR',
    },
    {
      id: '4',
      type: 'tour',
      customer: 'Elena R.',
      product: 'Kapadokya Balon Turu - 2 Kişi',
      amount: 3500,
      currency: 'TRY',
      status: 'confirmed',
      timestamp: '8 dakika önce',
      country: 'RU',
    },
  ]);

  // B2B Partners
  const b2bPartners: B2BPartner[] = [
    {
      id: '1',
      name: 'TravelTech Global',
      type: 'agency',
      revenue: 450000,
      bookings: 156,
      commission: 12.5,
      status: 'active',
      lastActivity: '2 saat önce',
    },
    {
      id: '2',
      name: 'Premium Hotels Group',
      type: 'hotel',
      revenue: 380000,
      bookings: 89,
      commission: 15.0,
      status: 'active',
      lastActivity: '4 saat önce',
    },
    {
      id: '3',
      name: 'Corporate Solutions Ltd',
      type: 'corporate',
      revenue: 520000,
      bookings: 234,
      commission: 10.0,
      status: 'active',
      lastActivity: '1 gün önce',
    },
  ];

  // System Health
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    api: 'operational',
    database: 'operational',
    payment: 'operational',
    cache: 'operational',
    lastCheck: 'Az önce',
  });

  // Simulated real-time updates
  useEffect(() => {
    if (!isRealtimeEnabled) return;

    const interval = setInterval(() => {
      // Update revenue metric
      setMetrics(prev => prev.map(m =>
        m.id === 'revenue'
          ? { ...m, value: (m.value as number) + Math.floor(Math.random() * 5000) }
          : m
      ));

      // Update bookings count occasionally
      if (Math.random() > 0.7) {
        setMetrics(prev => prev.map(m =>
          m.id === 'bookings'
            ? { ...m, value: String(parseInt(m.value as string) + 1) }
            : m
        ));
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isRealtimeEnabled]);

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(30, 64, 175);
    doc.text('Travel Ailydian - System Report', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report Date: ${new Date().toLocaleDateString('tr-TR')}`, 14, 30);
    doc.text(`Time Range: ${timeRange}`, 14, 36);
    doc.text(`Currency: ${selectedCurrency}`, 14, 42);

    // Metrics
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Key Metrics', 14, 52);

    const metricsData = metrics.map(m => [
      m.label,
      m.currency ? formatCurrency(m.value as number) : String(m.value),
      `${m.change >= 0 ? '+' : ''}${m.change}%`
    ]);

    autoTable(doc, {
      startY: 56,
      head: [['Metric', 'Value', 'Change']],
      body: metricsData,
      theme: 'grid',
      headStyles: { fillColor: [30, 64, 175] },
    });

    // Product Performance
    doc.setFontSize(14);
    doc.text('Product Performance', 14, (doc as any).lastAutoTable.finalY + 10);

    const productData = productCategories.map(p => [
      p.name,
      formatCurrency(p.revenue),
      p.bookings.toString(),
      p.active.toString(),
      `${p.growth >= 0 ? '+' : ''}${p.growth}%`,
      p.status.toUpperCase()
    ]);

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 14,
      head: [['Product', 'Revenue', 'Bookings', 'Active', 'Growth', 'Status']],
      body: productData,
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94] },
    });

    // B2B Partners
    doc.setFontSize(14);
    doc.text('B2B Partners', 14, (doc as any).lastAutoTable.finalY + 10);

    const partnerData = b2bPartners.map(p => [
      p.name,
      p.type.toUpperCase(),
      formatCurrency(p.revenue),
      p.bookings.toString(),
      `${p.commission}%`
    ]);

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 14,
      head: [['Partner', 'Type', 'Revenue', 'Bookings', 'Commission']],
      body: partnerData,
      theme: 'striped',
      headStyles: { fillColor: [147, 51, 234] },
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} / ${pageCount} - Generated by Travel Ailydian Admin System`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    doc.save(`travel-ailydian-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'active':
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'warning':
      case 'degraded':
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'critical':
      case 'down':
      case 'inactive':
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'car': return <Car className="w-4 h-4" />;
      case 'transfer': return <Bus className="w-4 h-4" />;
      case 'rental': return <Home className="w-4 h-4" />;
      case 'tour': return <MapPin className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-lg bg-white/95">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-6">
              <Link href="/admin/v2" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Travel Ailydian
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Admin Control Center v2</p>
                </div>
              </Link>

              {/* Real-time Indicator */}
              <div className="hidden lg:flex items-center gap-2">
                {isRealtimeEnabled ? (
                  <>
                    <div className="relative">
                      <Wifi className="w-4 h-4 text-green-600" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>
                    <span className="text-xs font-semibold text-green-600">LIVE</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-400">PAUSED</span>
                  </>
                )}
                <button
                  onClick={() => setIsRealtimeEnabled(!isRealtimeEnabled)}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isRealtimeEnabled ? 'Duraklat' : 'Başlat'}
                </button>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-3">
              {/* Global Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Arama: rezervasyon, müşteri, ürün..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80 text-sm"
                />
              </div>

              {/* Currency Selector */}
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as any)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="TRY">₺ TRY</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>

              {/* Time Range */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="realtime">Gerçek Zamanlı</option>
                <option value="24h">Son 24 Saat</option>
                <option value="7d">Son 7 Gün</option>
                <option value="30d">Son 30 Gün</option>
                <option value="90d">Son 90 Gün</option>
              </select>

              {/* Export */}
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">Export</span>
              </button>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Settings */}
              <Link href="/admin/v2/settings">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-slate-600" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
            { id: 'products', label: 'Ürün Yönetimi', icon: Package },
            { id: 'b2b', label: 'B2B Partnerler', icon: Briefcase },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Ayarlar', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    {metric.realtime && (
                      <div className="absolute top-2 right-2">
                        <span className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
                          <Activity className="w-3 h-3 animate-pulse" />
                          LIVE
                        </span>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                        metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {metric.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}%
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-slate-600 mb-1">{metric.label}</h3>
                    <p className="text-3xl font-bold text-slate-900">
                      {metric.currency ? formatCurrency(metric.value as number) : metric.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Product Categories & Live Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Product Categories */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Ürün Kategorileri</h2>
                    <p className="text-sm text-slate-500">Tüm ürünlerin performans özeti</p>
                  </div>
                  <Link href="/admin/v2/products">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                      Detaylar
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {productCategories.map((product, index) => {
                    const Icon = product.icon;
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer"
                      >
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{product.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(product.status)}`}>
                              {product.status.toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-400">{product.lastUpdate}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500 block text-xs mb-1">Gelir</span>
                              <p className="font-semibold text-slate-900">
                                {formatCurrency(product.revenue)}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-xs mb-1">Rezervasyon</span>
                              <p className="font-semibold text-slate-900">{product.bookings}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-xs mb-1">Aktif</span>
                              <p className="font-semibold text-slate-900">{product.active}</p>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-xs mb-1">Büyüme</span>
                              <p className={`font-semibold ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.growth >= 0 ? '+' : ''}{product.growth}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Live Bookings */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Canlı Rezervasyonlar</h2>
                    <p className="text-sm text-slate-500">Gerçek zamanlı işlemler</p>
                  </div>
                  {isRealtimeEnabled && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-red-600">LIVE</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {liveBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all cursor-pointer group border border-slate-100"
                      >
                        <div className="mt-1 p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                          {getProductIcon(booking.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900 text-sm truncate">
                              {booking.customer}
                            </h4>
                            <span className="text-xs text-slate-400">{booking.country}</span>
                          </div>
                          <p className="text-sm text-slate-600 truncate mb-2">{booking.product}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">
                              {formatCurrency(booking.amount)}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{booking.timestamp}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* B2B Partners & System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* B2B Partners Summary */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">B2B Partnerler</h2>
                    <p className="text-sm text-slate-500">Aktif iş ortaklıkları</p>
                  </div>
                  <Link href="/admin/v2/b2b">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                      Tümünü Gör
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {b2bPartners.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all"
                    >
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-slate-900">{partner.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(partner.status)}`}>
                            {partner.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-2">{partner.type.toUpperCase()} • {partner.lastActivity}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500 block text-xs">Gelir</span>
                            <p className="font-semibold text-slate-900">{formatCurrency(partner.revenue)}</p>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-xs">Rezervasyon</span>
                            <p className="font-semibold text-slate-900">{partner.bookings}</p>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-xs">Komisyon</span>
                            <p className="font-semibold text-slate-900">{partner.commission}%</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Sistem Sağlığı</h2>
                  <p className="text-sm text-slate-500">Son kontrol: {systemHealth.lastCheck}</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'API Gateway', icon: Server, status: systemHealth.api },
                    { label: 'Database', icon: Database, status: systemHealth.database },
                    { label: 'Payment Gateway', icon: CreditCard, status: systemHealth.payment },
                    { label: 'Cache Server', icon: HardDrive, status: systemHealth.cache },
                  ].map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-slate-600" />
                          <span className="font-medium text-slate-900 text-sm">{service.label}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(service.status)}`}>
                          {service.status.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm">
                  <RefreshCw className="w-4 h-4" />
                  Sistem Kontrolü Yap
                </button>
              </div>
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Ürün Yönetimi</h2>
                <p className="text-slate-600">Tüm ürünleri görüntüle, düzenle ve yönet</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/admin/v2/all-products">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-xl transition-all font-medium">
                    <Database className="w-5 h-5" />
                    Tüm Ürünler (Gerçek Veri)
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/admin/v2/content">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-xl transition-all font-medium">
                    <Edit className="w-5 h-5" />
                    İçerik Yönetimi
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productCategories.map((product, index) => {
                const Icon = product.icon;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg">{product.name}</h3>
                        <p className="text-sm text-slate-500">{product.active} aktif ürün</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Gelir</p>
                        <p className="text-lg font-bold text-slate-900">{formatCurrency(product.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Rezervasyon</p>
                        <p className="text-lg font-bold text-slate-900">{product.bookings}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(product.status)}`}>
                        {product.status.toUpperCase()}
                      </span>
                      <span className={`text-sm font-semibold ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link href="/admin/v2/products">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all cursor-pointer group">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Detaylı Ürün Yönetimi</h3>
                <p className="text-slate-600">Tüm ürünleri görüntülemek ve düzenlemek için tıklayın</p>
              </div>
            </Link>
          </div>
        )}

        {/* B2B Tab */}
        {activeTab === 'b2b' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">B2B Partner Yönetimi</h2>
                <p className="text-slate-600">İş ortaklıklarını görüntüle ve yönet</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium shadow-lg">
                <Plus className="w-5 h-5" />
                Yeni Partner
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {b2bPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{partner.name}</h3>
                        <p className="text-sm text-slate-500">{partner.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(partner.status)}`}>
                      {partner.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Gelir</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(partner.revenue)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Rezervasyon</span>
                      <span className="font-semibold text-slate-900">{partner.bookings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Komisyon</span>
                      <span className="font-semibold text-purple-600">{partner.commission}%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-3">Son aktivite: {partner.lastActivity}</p>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Düzenle
                      </button>
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Toplam Partner</span>
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{b2bPartners.length}</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Toplam Gelir</span>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {formatCurrency(b2bPartners.reduce((acc, p) => acc + p.revenue, 0))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Ort. Komisyon</span>
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {(b2bPartners.reduce((acc, p) => acc + p.commission, 0) / b2bPartners.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics & Settings Placeholder */}
        {(activeTab === 'analytics' || activeTab === 'settings') && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'analytics' ? <BarChart3 className="w-8 h-8 text-blue-600" /> : <Settings className="w-8 h-8 text-blue-600" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {activeTab === 'analytics' && 'Detaylı Analytics'}
                {activeTab === 'settings' && 'Sistem Ayarları'}
              </h3>
              <p className="text-slate-600 mb-6">
                Bu modül geliştirilme aşamasında. Yakında tamamlanacak.
              </p>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Genel Bakışa Dön
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardV2;
