/**
 * Travel Ailydian - System Owner Admin Dashboard
 * Comprehensive dashboard for managing all products across the platform
 * Features: Real-time analytics, multi-product management, advanced monitoring
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  DollarSign,
  Car,
  Bus,
  Home,
  Plane,
  MapPin,
  Calendar,
  Star,
  AlertTriangle,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Zap,
  Target,
  FileText,
  Table,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: typeof TrendingUp;
  color: string;
  bgColor: string;
}

interface ProductStats {
  name: string;
  revenue: number;
  bookings: number;
  active: number;
  growth: number;
  icon: typeof Car;
}

interface RecentActivity {
  id: string;
  type: 'booking' | 'listing' | 'payment' | 'issue';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
  product: string;
}

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('30d');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(30, 64, 175);
    doc.text('Travel Ailydian - Sistem Raporu', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 14, 30);
    doc.text(`Zaman Aralığı: ${timeRange}`, 14, 36);

    // Metrics Table
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Temel Metrikler', 14, 46);

    const metricsData = metrics.map(m => [
      m.label,
      m.value.toString(),
      `${m.change >= 0 ? '+' : ''}${m.change}%`
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Metrik', 'Değer', 'Değişim']],
      body: metricsData,
      theme: 'grid',
      headStyles: { fillColor: [30, 64, 175] },
    });

    // Product Performance
    doc.setFontSize(14);
    doc.text('Ürün Performansı', 14, (doc as any).lastAutoTable.finalY + 10);

    const productData = productStats.map(p => [
      p.name,
      `₺${(p.revenue / 1000).toFixed(0)}K`,
      p.bookings.toString(),
      p.active.toString(),
      `${p.growth >= 0 ? '+' : ''}${p.growth}%`
    ]);

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 14,
      head: [['Ürün', 'Gelir', 'Rezervasyon', 'Aktif', 'Büyüme']],
      body: productData,
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94] },
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Sayfa ${i} / ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    doc.save(`travel-ailydian-rapor-${new Date().toISOString().split('T')[0]}.pdf`);
    setExportMenuOpen(false);
  };

  // Export to Excel (CSV format)
  const exportToExcel = () => {
    // Create CSV content
    let csv = 'Travel Ailydian - Sistem Raporu\n\n';
    csv += `Rapor Tarihi:,${new Date().toLocaleDateString('tr-TR')}\n`;
    csv += `Zaman Aralığı:,${timeRange}\n\n`;

    // Metrics
    csv += 'Temel Metrikler\n';
    csv += 'Metrik,Değer,Değişim\n';
    metrics.forEach(m => {
      csv += `${m.label},${m.value},${m.change >= 0 ? '+' : ''}${m.change}%\n`;
    });

    csv += '\n Ürün Performansı\n';
    csv += 'Ürün,Gelir,Rezervasyon,Aktif,Büyüme\n';
    productStats.forEach(p => {
      csv += `${p.name},₺${(p.revenue / 1000).toFixed(0)}K,${p.bookings},${p.active},${p.growth >= 0 ? '+' : ''}${p.growth}%\n`;
    });

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `travel-ailydian-rapor-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    setExportMenuOpen(false);
  };

  // Real-time metrics (simulated - would connect to actual API)
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    {
      id: 'revenue',
      label: 'Toplam Gelir',
      value: '₺2,847,500',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'bookings',
      label: 'Aktif Rezervasyonlar',
      value: '1,284',
      change: 8.3,
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'users',
      label: 'Toplam Kullanıcılar',
      value: '24,680',
      change: 15.7,
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'satisfaction',
      label: 'Müşteri Memnuniyeti',
      value: '4.8/5',
      change: 3.2,
      trend: 'up',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]);

  const productStats: ProductStats[] = [
    {
      name: 'Araç Kiralama',
      revenue: 1250000,
      bookings: 450,
      active: 380,
      growth: 15.2,
      icon: Car,
    },
    {
      name: 'Transfer Hizmetleri',
      revenue: 850000,
      bookings: 620,
      active: 520,
      growth: 22.8,
      icon: Bus,
    },
    {
      name: 'Konaklama',
      revenue: 580000,
      bookings: 180,
      active: 145,
      growth: 8.5,
      icon: Home,
    },
    {
      name: 'Turlar',
      revenue: 167500,
      bookings: 34,
      active: 28,
      growth: -2.3,
      icon: MapPin,
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Yeni Araç Kiralama Rezervasyonu',
      description: 'BMW 5 Serisi - İstanbul Havalimanı',
      timestamp: '5 dakika önce',
      status: 'success',
      product: 'car-rental',
    },
    {
      id: '2',
      type: 'payment',
      title: 'Ödeme Alındı',
      description: '₺15,000 - Transfer rezervasyonu',
      timestamp: '12 dakika önce',
      status: 'success',
      product: 'transfer',
    },
    {
      id: '3',
      type: 'issue',
      title: 'Müşteri Şikayeti',
      description: 'Araç tesliminde gecikme raporu',
      timestamp: '1 saat önce',
      status: 'warning',
      product: 'car-rental',
    },
    {
      id: '4',
      type: 'listing',
      title: 'Yeni Villa Eklendi',
      description: 'Bodrum Yalıkavak - Deniz Manzaralı Villa',
      timestamp: '2 saat önce',
      status: 'info',
      product: 'rental',
    },
    {
      id: '5',
      type: 'booking',
      title: 'Toplu Transfer Rezervasyonu',
      description: '14 kişilik minibüs - Antalya',
      timestamp: '3 saat önce',
      status: 'success',
      product: 'transfer',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Travel Ailydian</h1>
                  <p className="text-xs text-slate-500">Sistem Yönetimi</p>
                </div>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                />
              </div>

              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <LanguageSwitcher />

              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border-none outline-none bg-transparent font-medium text-sm"
            >
              <option value="24h">Son 24 Saat</option>
              <option value="7d">Son 7 Gün</option>
              <option value="30d">Son 30 Gün</option>
              <option value="90d">Son 90 Gün</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
            <LayoutDashboard className="w-4 h-4 text-slate-500" />
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border-none outline-none bg-transparent font-medium text-sm"
            >
              <option value="all">Tüm Ürünler</option>
              <option value="car-rental">Araç Kiralama</option>
              <option value="transfer">Transfer</option>
              <option value="rental">Konaklama</option>
              <option value="tours">Turlar</option>
            </select>
          </div>

          <div className="ml-auto relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Rapor İndir</span>
            </button>

            {exportMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setExportMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="p-2">
                    <button
                      onClick={exportToPDF}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 transition-all"
                    >
                      <FileText className="w-5 h-5 text-red-600" />
                      <span className="font-medium">PDF Rapor</span>
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 transition-all"
                    >
                      <Table className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Excel (CSV)</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

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
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}%
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">{metric.label}</h3>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Product Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Stats Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Ürün Performansı</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                Detaylar
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {productStats.map((product, index) => {
                const Icon = product.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900">{product.name}</h3>
                        <span className={`text-sm font-semibold ${
                          product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.growth >= 0 ? '+' : ''}{product.growth}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Gelir</span>
                          <p className="font-semibold text-slate-900">
                            ₺{(product.revenue / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Rezervasyon</span>
                          <p className="font-semibold text-slate-900">{product.bookings}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Aktif</span>
                          <p className="font-semibold text-slate-900">{product.active}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Son Aktiviteler</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                Tümünü Gör
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="mt-1">{getStatusIcon(activity.status)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-slate-600 truncate">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Gelir Trendi</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <BarChart3 className="w-4 h-4 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <PieChart className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="text-center">
                <Activity className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Grafik entegrasyonu için hazır</p>
                <p className="text-xs text-slate-400">Chart.js veya Recharts eklenebilir</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Hızlı İstatistikler</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-slate-900">Aktif Kampanyalar</span>
                </div>
                <span className="font-bold text-green-600">12</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-slate-900">Bekleyen Onaylar</span>
                </div>
                <span className="font-bold text-amber-600">8</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">Sistem Sağlığı</span>
                </div>
                <span className="font-bold text-blue-600">98%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-slate-900">Yeni Üyeler (Bugün)</span>
                </div>
                <span className="font-bold text-purple-600">47</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
