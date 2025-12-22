/**
 * B2B Partners Management - Travel Ailydian Admin V2
 * Manage all B2B partnerships, commissions, and partner performance
 *
 * Features:
 * - Partner directory with search and filters
 * - Commission management
 * - Performance analytics
 * - Contract management
 * - Partner onboarding
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Briefcase, Building2, TrendingUp, DollarSign, Users,
  Search, Filter, Download, Plus, Edit, Trash2, Eye,
  ArrowLeft, Star, Clock, CheckCircle, XCircle, AlertCircle,
  Calendar, Mail, Phone, Globe, FileText, BarChart3,
  Target, Percent, Award, Shield, Activity, RefreshCw
} from 'lucide-react';

// Types
interface B2BPartner {
  id: string;
  name: string;
  companyName: string;
  type: 'hotel' | 'agency' | 'corporate' | 'airline' | 'other';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  revenue: number;
  bookings: number;
  commission: number;
  email: string;
  phone: string;
  website?: string;
  contractStart: string;
  contractEnd: string;
  rating: number;
  lastActivity: string;
  country: string;
  city: string;
  performanceScore: number;
}

const B2BPartnersPage = () => {
  const router = useRouter();
  const [partners, setPartners] = useState<B2BPartner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Fetch partners from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);

        // Mock data - replace with real API call
        const mockPartners: B2BPartner[] = [
          {
            id: '1',
            name: 'John Wilson',
            companyName: 'TravelTech Global Agency',
            type: 'agency',
            status: 'active',
            revenue: 450000,
            bookings: 156,
            commission: 12.5,
            email: 'john@traveltech.com',
            phone: '+1 555 0101',
            website: 'https://traveltech.com',
            contractStart: '2024-01-15',
            contractEnd: '2025-01-15',
            rating: 4.8,
            lastActivity: '2 saat önce',
            country: 'USA',
            city: 'New York',
            performanceScore: 92,
          },
          {
            id: '2',
            name: 'Sarah Martinez',
            companyName: 'Premium Hotels Group',
            type: 'hotel',
            status: 'active',
            revenue: 380000,
            bookings: 89,
            commission: 15.0,
            email: 'sarah@premiumhotels.com',
            phone: '+44 20 7123 4567',
            website: 'https://premiumhotels.com',
            contractStart: '2023-06-01',
            contractEnd: '2025-06-01',
            rating: 4.9,
            lastActivity: '4 saat önce',
            country: 'UK',
            city: 'London',
            performanceScore: 95,
          },
          {
            id: '3',
            name: 'Michael Chen',
            companyName: 'Corporate Solutions Ltd',
            type: 'corporate',
            status: 'active',
            revenue: 520000,
            bookings: 234,
            commission: 10.0,
            email: 'michael@corpsolutions.com',
            phone: '+65 6123 4567',
            website: 'https://corpsolutions.com',
            contractStart: '2023-03-01',
            contractEnd: '2025-03-01',
            rating: 4.7,
            lastActivity: '1 gün önce',
            country: 'Singapore',
            city: 'Singapore',
            performanceScore: 88,
          },
          {
            id: '4',
            name: 'Elena Petrova',
            companyName: 'Russian Travel Alliance',
            type: 'agency',
            status: 'pending',
            revenue: 0,
            bookings: 0,
            commission: 13.0,
            email: 'elena@russtravel.ru',
            phone: '+7 495 123 4567',
            contractStart: '2025-01-01',
            contractEnd: '2026-01-01',
            rating: 0,
            lastActivity: 'Hiç',
            country: 'Russia',
            city: 'Moscow',
            performanceScore: 0,
          },
          {
            id: '5',
            name: 'Ahmed Al-Rashid',
            companyName: 'Gulf Airlines Partners',
            type: 'airline',
            status: 'active',
            revenue: 680000,
            bookings: 412,
            commission: 8.5,
            email: 'ahmed@gulfairlines.ae',
            phone: '+971 4 123 4567',
            website: 'https://gulfairlines.ae',
            contractStart: '2022-01-01',
            contractEnd: '2025-12-31',
            rating: 4.6,
            lastActivity: '3 saat önce',
            country: 'UAE',
            city: 'Dubai',
            performanceScore: 90,
          },
        ];

        setPartners(mockPartners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Filter partners
  const filteredPartners = partners.filter(partner => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || partner.type === filterType;
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate summary metrics
  const totalRevenue = partners.filter(p => p.status === 'active').reduce((sum, p) => sum + p.revenue, 0);
  const totalBookings = partners.filter(p => p.status === 'active').reduce((sum, p) => sum + p.bookings, 0);
  const activePartners = partners.filter(p => p.status === 'active').length;
  const avgCommission = partners.length > 0
    ? partners.reduce((sum, p) => sum + p.commission, 0) / partners.length
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <Building2 className="w-4 h-4" />;
      case 'agency': return <Users className="w-4 h-4" />;
      case 'corporate': return <Briefcase className="w-4 h-4" />;
      case 'airline': return <Globe className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">B2B Partner Yönetimi</h1>
                <p className="text-sm text-slate-600">Tüm iş ortaklarını yönetin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Yeni Partner</span>
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
            className="bg-white rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Toplam Gelir</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ₺{totalRevenue.toLocaleString('tr-TR')}
            </p>
            <p className="text-xs text-green-600 mt-1">+18.5% bu ay</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Toplam Rezervasyon</p>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalBookings}</p>
            <p className="text-xs text-blue-600 mt-1">+12.3% bu ay</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Aktif Partnerler</p>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{activePartners}</p>
            <p className="text-xs text-purple-600 mt-1">{partners.length} toplam</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Ort. Komisyon</p>
              <Percent className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{avgCommission.toFixed(1)}%</p>
            <p className="text-xs text-amber-600 mt-1">Ortalama oran</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Partner ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">Tüm Tipler</option>
              <option value="hotel">Otel</option>
              <option value="agency">Acenta</option>
              <option value="corporate">Kurumsal</option>
              <option value="airline">Havayolu</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="pending">Beklemede</option>
              <option value="inactive">Pasif</option>
              <option value="suspended">Askıya Alınmış</option>
            </select>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Yenile
            </button>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Gelir
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Rezervasyon
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Komisyon
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Performans
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-slate-500">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Yükleniyor...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredPartners.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      Partner bulunamadı
                    </td>
                  </tr>
                ) : (
                  filteredPartners.map((partner, index) => (
                    <motion.tr
                      key={partner.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{partner.companyName}</p>
                          <p className="text-sm text-slate-500">{partner.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{partner.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(partner.type)}
                          <span className="text-sm text-slate-700 capitalize">{partner.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(partner.status)}`}>
                          {partner.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          ₺{partner.revenue.toLocaleString('tr-TR')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{partner.bookings}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-blue-600">{partner.commission}%</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${partner.performanceScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {partner.performanceScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                            <Eye className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-50 rounded-lg transition-colors group">
                            <Edit className="w-4 h-4 text-slate-600 group-hover:text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                            <Trash2 className="w-4 h-4 text-slate-600 group-hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {filteredPartners.length} partner gösteriliyor
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              Önceki
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              2
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              Sonraki
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default B2BPartnersPage;
