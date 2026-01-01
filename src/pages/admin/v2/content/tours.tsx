/**
 * Tours Management Module
 * AdminV2 CMS - Complete Tours Content Management
 *
 * @module ToursManagement
 * @features CRUD, Pricing, Images, Availability, Multi-language
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Copy,
  Globe,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  MapPin,
  Clock,
  Users,
  Star,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import logger from '../../../../lib/logger';

// ============================================
// TYPES & INTERFACES
// ============================================

interface Tour {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly shortDescription: string;
  readonly category: string;
  readonly location: string;
  readonly duration: string;
  readonly groupSize: number;
  readonly price: number;
  readonly currency: string;
  readonly images: readonly string[];
  readonly thumbnail: string;
  readonly status: 'draft' | 'published' | 'archived';
  readonly language: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly bookingCount: number;
  readonly availability: 'available' | 'limited' | 'soldout';
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface TourFilters {
  search: string;
  status: string;
  category: string;
  language: string;
  availability: string;
}

// ============================================
// CONSTANTS
// ============================================

const CATEGORIES = [
  'Adventure Tours',
  'Cultural Tours',
  'Nature Tours',
  'City Tours',
  'Water Sports',
  'Historical Tours',
  'Food & Wine Tours',
  'Photography Tours',
] as const;

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

const STATUS_CONFIG = {
  draft: { color: 'text-warning-500', bg: 'bg-warning-500/10', icon: AlertCircle },
  published: { color: 'text-success-500', bg: 'bg-success-500/10', icon: CheckCircle },
  archived: { color: 'text-text-muted', bg: 'bg-surface-card', icon: XCircle },
} as const;

// ============================================
// MAIN COMPONENT
// ============================================

export default function ToursManagementPage() {
  // ============================================
  // STATE
  // ============================================

  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [filters, setFilters] = useState<TourFilters>({
    search: '',
    status: 'all',
    category: 'all',
    language: 'all',
    availability: 'all',
  });

  // ============================================
  // DATA FETCHING
  // ============================================

  const fetchTours = async () => {
    try {
      setIsRefreshing(true);

      const response = await fetch('/api/admin/tours');
      if (response.ok) {
        const data = await response.json();
        setTours(data.tours);
      }
    } catch (error) {
      logger.error('Failed to fetch tours', { error });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // ============================================
  // FILTERED TOURS
  // ============================================

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch =
        filters.search === '' ||
        tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.location.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = filters.status === 'all' || tour.status === filters.status;
      const matchesCategory = filters.category === 'all' || tour.category === filters.category;
      const matchesLanguage = filters.language === 'all' || tour.language === filters.language;
      const matchesAvailability =
        filters.availability === 'all' || tour.availability === filters.availability;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesLanguage &&
        matchesAvailability
      );
    });
  }, [tours, filters]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleCreateTour = () => {
    setSelectedTour(null);
    setIsEditorOpen(true);
  };

  const handleEditTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsEditorOpen(true);
  };

  const handleDeleteTour = async (tour: Tour) => {
    if (!confirm(`Are you sure you want to delete "${tour.title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/tours/${tour.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTours();
        logger.info('Tour deleted', { tourId: tour.id });
      }
    } catch (error) {
      logger.error('Failed to delete tour', { error, tourId: tour.id });
    }
  };

  const handleDuplicateTour = async (tour: Tour) => {
    try {
      const response = await fetch('/api/admin/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tour,
          title: `${tour.title} (Copy)`,
          slug: `${tour.slug}-copy`,
          status: 'draft',
        }),
      });

      if (response.ok) {
        await fetchTours();
        logger.info('Tour duplicated', { originalTourId: tour.id });
      }
    } catch (error) {
      logger.error('Failed to duplicate tour', { error, tourId: tour.id });
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/tours/export');
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tours-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      logger.error('Failed to export tours', { error });
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
          <p className="text-text-secondary">Loading Tours Management...</p>
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
              <h1 className="text-3xl font-bold mb-2">Tours Management</h1>
              <p className="text-primary-100">
                Manage all tour content, pricing, and availability
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Export
              </button>

              <button
                onClick={fetchTours}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleCreateTour}
                className="flex items-center gap-2 px-4 py-3 bg-white text-primary-600 hover:bg-primary-50 rounded-lg font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Tours"
            value={tours.length}
            icon={MapPin}
            color="primary"
          />
          <StatCard
            label="Published"
            value={tours.filter((t) => t.status === 'published').length}
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            label="Draft"
            value={tours.filter((t) => t.status === 'draft').length}
            icon={AlertCircle}
            color="warning"
          />
          <StatCard
            label="Total Bookings"
            value={tours.reduce((sum, t) => sum + t.bookingCount, 0)}
            icon={Users}
            color="info"
          />
        </div>

        {/* Filters */}
        <div className="bg-surface-elevated rounded-xl p-6 border border-border-subtle mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search tours..."
                className="w-full pl-10 pr-4 py-2 bg-surface-base border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 bg-surface-base border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 bg-surface-base border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Language Filter */}
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="px-4 py-2 bg-surface-base border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Languages</option>
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
              className="px-4 py-2 bg-surface-base border border-border-subtle rounded-lg text-text-primary focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="limited">Limited</option>
              <option value="soldout">Sold Out</option>
            </select>
          </div>
        </div>

        {/* Tours Table */}
        <div className="bg-surface-elevated rounded-xl border border-border-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-card border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredTours.map((tour) => (
                  <TourRow
                    key={tour.id}
                    tour={tour}
                    onEdit={handleEditTour}
                    onDelete={handleDeleteTour}
                    onDuplicate={handleDuplicateTour}
                  />
                ))}
              </tbody>
            </table>

            {filteredTours.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">No tours found</p>
                <button
                  onClick={handleCreateTour}
                  className="mt-4 text-primary-500 hover:text-primary-600 font-medium"
                >
                  Create your first tour
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tour Editor Modal */}
      {isEditorOpen && (
        <TourEditorModal
          tour={selectedTour}
          onClose={() => setIsEditorOpen(false)}
          onSave={() => {
            setIsEditorOpen(false);
            fetchTours();
          }}
        />
      )}
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface StatCardProps {
  readonly label: string;
  readonly value: number;
  readonly icon: React.ElementType;
  readonly color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    primary: 'text-primary-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    info: 'text-info-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-elevated rounded-xl p-6 border border-border-subtle"
    >
      <div className="flex items-center gap-4">
        <Icon className={`w-10 h-10 ${colorClasses[color as keyof typeof colorClasses]}`} />
        <div>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
          <p className="text-sm text-text-secondary">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface TourRowProps {
  readonly tour: Tour;
  readonly onEdit: (tour: Tour) => void;
  readonly onDelete: (tour: Tour) => void;
  readonly onDuplicate: (tour: Tour) => void;
}

function TourRow({ tour, onEdit, onDelete, onDuplicate }: TourRowProps) {
  const StatusIcon = STATUS_CONFIG[tour.status].icon;

  return (
    <tr className="hover:bg-surface-card transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={tour.thumbnail}
            alt={tour.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <p className="font-semibold text-text-primary">{tour.title}</p>
            <p className="text-sm text-text-secondary flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {tour.location}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-text-primary">{tour.category}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-text-primary">
          {tour.price} {tour.currency}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[tour.status].bg} ${STATUS_CONFIG[tour.status].color}`}
        >
          <StatusIcon className="w-4 h-4" />
          {tour.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
          <span className="text-sm font-medium text-text-primary">{tour.rating.toFixed(1)}</span>
          <span className="text-sm text-text-muted">({tour.reviewCount})</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {tour.bookingCount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(tour)}
            className="text-primary-500 hover:text-primary-600 transition-colors"
            title="Edit"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDuplicate(tour)}
            className="text-info-500 hover:text-info-600 transition-colors"
            title="Duplicate"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(tour)}
            className="text-error-500 hover:text-error-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Tour Editor Modal (placeholder - will be implemented separately)
function TourEditorModal({
  tour,
  onClose,
  onSave,
}: {
  tour: Tour | null;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-surface-elevated rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border-subtle">
          <h2 className="text-2xl font-bold text-text-primary">
            {tour ? 'Edit Tour' : 'Create New Tour'}
          </h2>
        </div>
        <div className="p-6">
          <p className="text-text-secondary">
            Tour editor form will be implemented here with:
            <br />- Rich text editor for descriptions
            <br />- Image upload & management
            <br />- Pricing configuration
            <br />- Availability calendar
            <br />- Multi-language support
            <br />- SEO settings
          </p>
        </div>
        <div className="p-6 border-t border-border-subtle flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
          >
            Save Tour
          </button>
        </div>
      </div>
    </div>
  );
}
