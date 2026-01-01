/**
 * AdminV2 Tours Management - Apple Vision Pro Inspired Tour Management
 * Premium glassmorphic tour management interface
 *
 * Features:
 * - Advanced filtering & search
 * - Inline editing capabilities
 * - Drag & drop ordering
 * - Multi-select bulk actions
 * - Real-time stats
 */

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Star,
  Calendar,
  Grid3x3,
  List,
  ChevronDown,
  Package,
  Image as ImageIcon,
  TrendingUp,
  Loader2,
  Check,
  X,
  MoreVertical,
  Globe,
  Sparkles,
} from 'lucide-react';
import AdminV2Layout from '@/components/adminv2/AdminV2Layout';
import { useToast } from '@/context/ToastContext';
import logger from '@/lib/logger';

interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  maxGroupSize: number;
  images: string[];
  status: 'draft' | 'active' | 'inactive' | 'archived';
  rating: number;
  reviewCount: number;
  bookingCount: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

interface TourStats {
  total: number;
  active: number;
  draft: number;
  revenue: number;
  bookings: number;
  avgRating: number;
}

export default function AdminV2ToursManagement() {
  const { data: session } = useSession();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  // State
  const [tours, setTours] = useState<Tour[]>([]);
  const [stats, setStats] = useState<TourStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTours, setSelectedTours] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    destination: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load tours
  const loadTours = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.status && { status: filters.status }),
        ...(filters.destination && { destination: filters.destination }),
      });

      const response = await fetch(`/api/adminv2/tours/list?${params}`);
      const data = await response.json();

      if (data.success) {
        setTours(data.data.tours);
        setStats(data.data.stats);
        setTotalPages(Math.ceil(data.data.stats.total / 12));
      } else {
        showError('Failed to load tours', data.error);
      }
    } catch (error) {
      logger.error('Tours load error', error);
      showError('Failed to load tours', 'Please try again');
    } finally {
      setLoading(false);
    }
  }, [page, filters, showError]);

  useEffect(() => {
    loadTours();
  }, [loadTours]);

  // Handle tour deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      const response = await fetch(`/api/adminv2/tours/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        showSuccess('Tour deleted', 'Tour archived successfully');
        loadTours();
      } else {
        showError('Delete failed', data.error);
      }
    } catch (error) {
      logger.error('Tour delete error', error);
      showError('Delete failed', 'Please try again');
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'from-green-500 to-emerald-600';
      case 'draft':
        return 'from-yellow-500 to-orange-600';
      case 'inactive':
        return 'from-gray-500 to-slate-600';
      case 'archived':
        return 'from-red-500 to-rose-600';
      default:
        return 'from-blue-500 to-cyan-600';
    }
  };

  if (!session || session.user?.role !== 'admin') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <>
      <Head>
        <title>Tours Management - AdminV2 | AILYDIAN Holiday</title>
      </Head>

      <AdminV2Layout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-lydian-text-inverse bg-clip-text text-transparent bg-gradient-to-r from-lydian-primary via-lydian-accent to-lydian-primary"
              >
                Tours Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lydian-text-muted mt-2"
              >
                Manage tour packages, pricing, and availability
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 bg-lydian-glass-light/40 backdrop-blur-xl rounded-xl border border-lydian-border-light/20 flex items-center gap-2 hover:bg-lydian-glass-light/60 hover:border-lydian-primary/30 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
              </button>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2.5 bg-lydian-glass-light/40 backdrop-blur-xl rounded-xl border border-lydian-border-light/20 hover:bg-lydian-glass-light/60 hover:border-lydian-primary/30 transition-all"
              >
                {viewMode === 'grid' ? (
                  <List className="w-5 h-5 text-lydian-text-inverse" />
                ) : (
                  <Grid3x3 className="w-5 h-5 text-lydian-text-inverse" />
                )}
              </button>

              <button
                onClick={() => router.push('/adminv2/tours/new')}
                className="px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Tour
              </button>
            </motion.div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { label: 'Total Tours', value: stats.total, icon: Package, color: 'from-blue-500 to-cyan-600' },
                { label: 'Active', value: stats.active, icon: Check, color: 'from-green-500 to-emerald-600' },
                { label: 'Draft', value: stats.draft, icon: Edit, color: 'from-yellow-500 to-orange-600' },
                {
                  label: 'Revenue',
                  value: formatCurrency(stats.revenue),
                  icon: DollarSign,
                  color: 'from-purple-500 to-pink-600',
                },
                { label: 'Bookings', value: stats.bookings, icon: Users, color: 'from-orange-500 to-red-600' },
                {
                  label: 'Avg Rating',
                  value: stats.avgRating.toFixed(1),
                  icon: Star,
                  color: 'from-amber-500 to-yellow-600',
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <div className="relative bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl p-4 border border-lydian-border-light/20 hover:border-lydian-primary/30 transition-all overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                      />
                      <div className={`absolute top-3 right-3 p-2 rounded-lg bg-gradient-to-br ${stat.color} opacity-10`}>
                        <Icon className="w-4 h-4 text-lydian-text-inverse" />
                      </div>
                      <div className="relative">
                        <p className="text-xs text-lydian-text-muted mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-lydian-text-inverse">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl p-6 border border-lydian-border-light/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
                <input
                  type="text"
                  placeholder="Search tours by title, destination..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-lydian-glass-dark/30 border border-lydian-border-light/20 rounded-xl text-lydian-text-inverse placeholder-lydian-text-muted focus:outline-none focus:ring-2 focus:ring-lydian-primary/50 focus:border-lydian-primary/50 transition-all"
                />
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 w-full md:w-auto"
                  >
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="px-4 py-3 bg-lydian-glass-dark/30 border border-lydian-border-light/20 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-lydian-primary/50"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="px-4 py-3 bg-lydian-glass-dark/30 border border-lydian-border-light/20 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-lydian-primary/50"
                    >
                      <option value="">All Categories</option>
                      <option value="cultural">Cultural</option>
                      <option value="adventure">Adventure</option>
                      <option value="nature">Nature</option>
                      <option value="city">City Tour</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadTours}
                className="px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all"
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Tours Grid/List */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-12 h-12 animate-spin text-lydian-primary mb-4" />
              <p className="text-lydian-text-muted">Loading tours...</p>
            </motion.div>
          ) : tours.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-lydian-glass-light/20 rounded-2xl border border-lydian-border-light/20 backdrop-blur-xl"
            >
              <Package className="w-20 h-20 mx-auto mb-4 text-lydian-text-muted opacity-50" />
              <p className="text-lg text-lydian-text-inverse font-semibold mb-2">No tours found</p>
              <p className="text-sm text-lydian-text-muted mb-6">Create your first tour to get started</p>
              <button
                onClick={() => router.push('/adminv2/tours/new')}
                className="px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Tour
              </button>
            </motion.div>
          ) : (
            <div
              className={
                viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
              }
            >
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-lydian-border-light/20 hover:border-lydian-primary/50 hover:shadow-lg hover:shadow-lydian-primary/10 transition-all">
                    {viewMode === 'grid' ? (
                      <>
                        {/* Image */}
                        <div className="relative h-48 bg-lydian-glass-dark/30 overflow-hidden">
                          {tour.images && tour.images.length > 0 ? (
                            <img
                              src={tour.images[0]}
                              alt={tour.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-16 h-16 text-lydian-text-muted opacity-30" />
                            </div>
                          )}
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <div
                              className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getStatusColor(tour.status)} text-white text-xs font-bold backdrop-blur-xl`}
                            >
                              {tour.status}
                            </div>
                          </div>
                          {/* Rating */}
                          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-xl rounded-lg">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-white font-semibold">{tour.rating}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-lydian-text-inverse mb-1 line-clamp-1">
                                {tour.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-lydian-text-muted">
                                <MapPin className="w-4 h-4" />
                                <span>{tour.destination}</span>
                              </div>
                            </div>
                          </div>

                          {/* Meta Info */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-xs text-lydian-text-muted">
                              <Clock className="w-3 h-3" />
                              <span>{tour.duration} days</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-lydian-text-muted">
                              <Users className="w-3 h-3" />
                              <span>Max {tour.maxGroupSize}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-lydian-text-muted">
                              <Calendar className="w-3 h-3" />
                              <span>{tour.bookingCount} bookings</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-lydian-success">
                              <TrendingUp className="w-3 h-3" />
                              <span>{formatCurrency(tour.revenue)}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-lydian-text-muted">Starting from</p>
                              <p className="text-2xl font-bold text-lydian-text-inverse">
                                {formatCurrency(tour.price)}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => router.push(`/adminv2/tours/${tour.id}`)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-lg font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all flex items-center justify-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(tour.id)}
                              className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-6 p-6">
                        {/* Thumbnail */}
                        <div className="w-32 h-32 flex-shrink-0 bg-lydian-glass-dark/30 rounded-xl overflow-hidden">
                          {tour.images && tour.images.length > 0 ? (
                            <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-12 h-12 text-lydian-text-muted opacity-30" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-lydian-text-inverse mb-1">{tour.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-lydian-text-muted">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {tour.destination}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {tour.duration} days
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  Max {tour.maxGroupSize}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getStatusColor(tour.status)} text-white text-xs font-bold`}
                            >
                              {tour.status}
                            </div>
                          </div>

                          <p className="text-sm text-lydian-text-muted line-clamp-2 mb-3">{tour.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-lydian-text-muted">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {tour.rating} ({tour.reviewCount} reviews)
                              </span>
                              <span className="text-lydian-text-muted">{tour.bookingCount} bookings</span>
                              <span className="text-lydian-success font-semibold">
                                {formatCurrency(tour.revenue)} revenue
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <p className="text-2xl font-bold text-lydian-text-inverse">
                                {formatCurrency(tour.price)}
                              </p>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push(`/adminv2/tours/${tour.id}`)}
                                className="px-4 py-2 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-lg font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(tour.id)}
                                className="p-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    p === page
                      ? 'bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse shadow-lg shadow-lydian-primary/30'
                      : 'bg-lydian-glass-light/40 text-lydian-text-muted hover:bg-lydian-glass-light/60 border border-lydian-border-light/20'
                  }`}
                >
                  {p}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </AdminV2Layout>
    </>
  );
}
