/**
 * Transfers Management - Travel LyDian Admin V2
 * Manage all transfer services, routes, vehicles, and bookings
 *
 * Features:
 * - Transfer CRUD operations
 * - Route management
 * - Vehicle assignment
 * - Driver management
 * - Pricing & availability
 * - Real-time booking status
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import logger from '../../../lib/logger';
import {
  Bus, Car, Users, MapPin, Calendar, Clock, DollarSign,
  Search, Filter, Download, Plus, Edit, Trash2, Eye,
  ArrowLeft, Star, CheckCircle, XCircle, AlertCircle,
  Navigation, Route, Gauge, Shield, Activity, RefreshCw,
  TrendingUp, BarChart3, Settings, Plane, Hotel } from 'lucide-react';

// Types
interface Transfer {
  id: string;
  title: string;
  route: {
    from: string;
    to: string;
    distance: number; // km
    duration: number; // minutes
  };
  vehicleType: 'sedan' | 'suv' | 'minivan' | 'minibus' | 'bus' | 'vip';
  capacity: number;
  price: number;
  currency: string;
  status: 'active' | 'inactive' | 'maintenance';
  rating: number;
  totalBookings: number;
  revenue: number;
  driver?: string;
  vehiclePlate?: string;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const TransfersManagementPage = () => {
  const router = useRouter();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVehicleType, setFilterVehicleType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Fetch transfers from API
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setLoading(true);

        // Mock data - replace with real API call
        const mockTransfers: Transfer[] = [
        {
          id: '1',
          title: 'İstanbul Havalimanı → Taksim VIP Transfer',
          route: {
            from: 'İstanbul Havalimanı (IST)',
            to: 'Taksim',
            distance: 42,
            duration: 45
          },
          vehicleType: 'vip',
          capacity: 3,
          price: 850,
          currency: 'TRY',
          status: 'active',
          rating: 4.9,
          totalBookings: 234,
          revenue: 198900,
          driver: 'Mehmet Yılmaz',
          vehiclePlate: '34 ABC 123',
          features: ['Wi-Fi', 'Su', 'Klima', 'Yolcu Sigortası', 'Meet & Greet'],
          images: ['/images/transfers/vip-sedan.jpg'],
          createdAt: '2024-01-15',
          updatedAt: '2025-01-20'
        },
        {
          id: '2',
          title: 'Antalya Havalimanı → Kemer Aile Transferi',
          route: {
            from: 'Antalya Havalimanı (AYT)',
            to: 'Kemer',
            distance: 58,
            duration: 60
          },
          vehicleType: 'minivan',
          capacity: 7,
          price: 650,
          currency: 'TRY',
          status: 'active',
          rating: 4.7,
          totalBookings: 187,
          revenue: 121550,
          driver: 'Ahmet Demir',
          vehiclePlate: '07 XYZ 456',
          features: ['Wi-Fi', 'Bagaj Alanı', 'Çocuk Koltuğu', 'Klima'],
          images: ['/images/transfers/minivan.jpg'],
          createdAt: '2024-02-01',
          updatedAt: '2025-01-18'
        },
        {
          id: '3',
          title: 'Bodrum Havalimanı → Gümbet Ekonomik Transfer',
          route: {
            from: 'Bodrum Havalimanı (BJV)',
            to: 'Gümbet',
            distance: 38,
            duration: 40
          },
          vehicleType: 'sedan',
          capacity: 4,
          price: 450,
          currency: 'TRY',
          status: 'active',
          rating: 4.5,
          totalBookings: 312,
          revenue: 140400,
          driver: 'Mustafa Kaya',
          vehiclePlate: '48 DEF 789',
          features: ['Klima', 'Bagaj Alanı', 'Sigorta'],
          images: ['/images/transfers/sedan.jpg'],
          createdAt: '2024-03-10',
          updatedAt: '2025-01-22'
        },
        {
          id: '4',
          title: 'Dalaman Havalimanı → Fethiye Grup Transferi',
          route: {
            from: 'Dalaman Havalimanı (DLM)',
            to: 'Fethiye',
            distance: 48,
            duration: 50
          },
          vehicleType: 'minibus',
          capacity: 14,
          price: 1200,
          currency: 'TRY',
          status: 'active',
          rating: 4.8,
          totalBookings: 89,
          revenue: 106800,
          driver: 'Hasan Çelik',
          vehiclePlate: '48 GHI 321',
          features: ['Wi-Fi', 'Klima', 'Geniş Bagaj', 'USB Şarj'],
          images: ['/images/transfers/minibus.jpg'],
          createdAt: '2024-04-05',
          updatedAt: '2025-01-21'
        },
        {
          id: '5',
          title: 'İstanbul Sabiha Gökçen → Kadıköy Express',
          route: {
            from: 'Sabiha Gökçen Havalimanı (SAW)',
            to: 'Kadıköy',
            distance: 32,
            duration: 35
          },
          vehicleType: 'suv',
          capacity: 5,
          price: 550,
          currency: 'TRY',
          status: 'maintenance',
          rating: 4.6,
          totalBookings: 156,
          revenue: 85800,
          driver: 'Can Özdemir',
          vehiclePlate: '34 JKL 654',
          features: ['Wi-Fi', 'Premium İç Mekan', 'Klima'],
          images: ['/images/transfers/suv.jpg'],
          createdAt: '2024-05-20',
          updatedAt: '2025-01-19'
        }];


        setTransfers(mockTransfers);
      } catch (error) {
        logger.error('Error fetching transfers:', error as Error, { component: 'Transfers' });
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  // Filter transfers
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
    transfer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transfer.route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transfer.route.to.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVehicleType = filterVehicleType === 'all' || transfer.vehicleType === filterVehicleType;
    const matchesStatus = filterStatus === 'all' || transfer.status === filterStatus;

    return matchesSearch && matchesVehicleType && matchesStatus;
  });

  // Calculate summary metrics
  const totalRevenue = transfers.reduce((sum, t) => sum + t.revenue, 0);
  const totalBookings = transfers.reduce((sum, t) => sum + t.totalBookings, 0);
  const activeTransfers = transfers.filter((t) => t.status === 'active').length;
  const avgRating = transfers.length > 0 ?
  transfers.reduce((sum, t) => sum + t.rating, 0) / transfers.length :
  0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':return 'text-purple-400 bg-purple-500/20 border-purple-400';
      case 'inactive':return 'text-gray-400 bg-white/5 border-white/20';
      case 'maintenance':return 'text-amber-600 bg-amber-50 border-amber-200';
      default:return 'text-gray-400 bg-white/5 border-white/20';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'sedan':
      case 'vip':
      case 'suv':
        return <Car className="w-4 h-4" />;
      case 'minivan':
      case 'minibus':
      case 'bus':
        return <Bus className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="p-2 hover:bg-white/5 backdrop-blur-xl rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-300" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Transfer Yönetimi</h1>
                <p className="text-sm text-gray-300">Tüm transfer hizmetlerini yönetin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Yeni Transfer</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-300">Toplam Gelir</p>
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              ₺{totalRevenue.toLocaleString('tr-TR')}
            </p>
            <p className="text-xs text-purple-400 mt-1">+25.3% bu ay</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-300">Toplam Rezervasyon</p>
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{totalBookings}</p>
            <p className="text-xs text-blue-400 mt-1">Son 30 gün</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-300">Aktif Transferler</p>
              <Bus className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-white">{activeTransfers}</p>
            <p className="text-xs text-purple-600 mt-1">{transfers.length} toplam</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-300">Ortalama Puan</p>
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</p>
            <p className="text-xs text-amber-600 mt-1">5 üzerinden</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Transfer ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500 outline-none" />

            </div>

            <select
              value={filterVehicleType}
              onChange={(e) => setFilterVehicleType(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">

              <option value="all">Tüm Araç Tipleri</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="minivan">Minivan</option>
              <option value="minibus">Minibüs</option>
              <option value="bus">Otobüs</option>
              <option value="vip">VIP</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">

              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
              <option value="maintenance">Bakımda</option>
            </select>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl hover:bg-slate-200 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Yenile
            </button>
          </div>
        </div>

        {/* Transfers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ?
          <div className="col-span-2 flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-white-tertiary">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Yükleniyor...</span>
              </div>
            </div> :
          filteredTransfers.length === 0 ?
          <div className="col-span-2 text-center py-12 text-white-tertiary">
              Transfer bulunamadı
            </div> :

          filteredTransfers.map((transfer, index) =>
          <motion.div
            key={transfer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl border border-white/20 overflow-hidden hover:shadow-xl transition-all">

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{transfer.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        {getVehicleIcon(transfer.vehicleType)}
                        <span className="text-sm text-gray-300 capitalize">{transfer.vehicleType}</span>
                        <span className="text-gray-400">•</span>
                        <Users className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-300">{transfer.capacity} kişi</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transfer.status)}`}>
                      {transfer.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600-lighter rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-xs text-blue-400 font-medium mb-1">KALKIŞ</p>
                        <p className="font-semibold text-white">{transfer.route.from}</p>
                      </div>
                      <Navigation className="w-5 h-5 text-blue-400" />
                      <div className="flex-1 text-right">
                        <p className="text-xs text-blue-400 font-medium mb-1">VARIŞ</p>
                        <p className="font-semibold text-white">{transfer.route.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-blue-100">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Route className="w-4 h-4" />
                        <span>{transfer.route.distance} km</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{transfer.route.duration} dk</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-white-tertiary mb-1">Fiyat</p>
                      <p className="font-bold text-purple-400">₺{transfer.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white-tertiary mb-1">Rezervasyon</p>
                      <p className="font-bold text-white">{transfer.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white-tertiary mb-1">Gelir</p>
                      <p className="font-bold text-white">₺{transfer.revenue.toLocaleString('tr-TR')}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {transfer.features.map((feature, idx) =>
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/5 backdrop-blur-xl text-gray-300 rounded text-xs">

                        {feature}
                      </span>
                )}
                  </div>

                  {/* Rating & Driver */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-400 fill-amber-500" />
                      <span className="font-semibold text-white">{transfer.rating}</span>
                      <span className="text-sm text-white-tertiary">({transfer.totalBookings} değerlendirme)</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600-lighter hover:bg-gradient-to-r from-blue-600 to-purple-600-light text-blue-400 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Detaylar</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500-lighter hover:bg-purple-500-light text-purple-400 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Düzenle</span>
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
                      <Trash2 className="w-4 h-4 text-gray-300 group-hover:text-blue-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
          )
          }
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-300">
            {filteredTransfers.length} transfer gösteriliyor
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
              Önceki
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
              Sonraki
            </button>
          </div>
        </div>
      </main>
    </div>);

};

export default TransfersManagementPage;