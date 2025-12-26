/**
 * ADMIN V2 - ALL PRODUCTS MANAGEMENT (Real Data)
 * Complete product management with database integration
 * Hotels, Tours, Flights, Transfers
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Search, Filter, Download, Upload,
  Eye, Edit, Trash2, Check, X, AlertCircle, Package,
  Car, Bus, Home, MapPin, Calendar, DollarSign,
  Star, Users, Clock, Globe, Image as ImageIcon, FileText,
  Settings, RefreshCw, ChevronDown, Plane, Building2
} from 'lucide-react';

type ProductType = 'hotels' | 'tours' | 'flights' | 'transfers';

interface Hotel {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  region: string;
  stars: number;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  currency: string;
  mainImage: string;
  isActive: boolean;
  isFeatured: boolean;
  roomCount: number;
  createdAt: string;
}

interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  destination: string;
  duration: number;
  priceAdult: number;
  currency: string;
  category: string;
  mainImage: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  maxGroupSize: number;
  createdAt: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  priceAdult: number;
  currency: string;
  isActive: boolean;
  cabinClass: string;
  availableSeats: number;
  createdAt: string;
}

interface Transfer {
  id: string;
  name: string;
  fromLocation: string;
  toLocation: string;
  region: string;
  distance: number;
  duration: number;
  isActive: boolean;
  vehicles: Array<{
    id: string;
    name: string;
    vehicleType: string;
    priceStandard: number;
    priceVIP: number;
  }>;
  createdAt: string;
}

const AllProductsManagement = () => {
  const [productType, setProductType] = useState<ProductType>('hotels');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch data based on product type
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/${productType}?page=${page}&limit=20&search=${searchQuery}`
      );
      const result = await res.json();

      if (result.success) {
        setData(result.data);
        setTotal(result.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productType, page, searchQuery]);

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch(`/api/admin/${productType}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchData();
        alert('Ürün başarıyla silindi');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Silme işlemi başarısız');
    }
  };

  // Toggle status
  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/${productType}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const categories = [
    { id: 'hotels', name: 'Oteller', icon: Building2, color: 'blue' },
    { id: 'tours', name: 'Turlar', icon: MapPin, color: 'green' },
    { id: 'flights', name: 'Uçuşlar', icon: Plane, color: 'purple' },
    { id: 'transfers', name: 'Transferler', icon: Car, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/5 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
              </Link>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Tüm Ürünler Yönetimi
                </h1>
                <p className="text-sm text-slate-600">
                  {total} ürün • {productType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Yeni Ürün Ekle
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = productType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setProductType(cat.id as ProductType);
                  setPage(1);
                }}
                className={`
                  relative p-4 rounded-xl transition-all
                  ${
                    isActive
                      ? `bg-gradient-to-r from-${cat.color}-500 to-${cat.color}-600 text-white shadow-lg scale-105`
                      : 'bg-white/5 text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">{cat.name}</div>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="bg-white/5 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-slate-900 placeholder-slate-400"
            />
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        )}

        {/* Data Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">
                        {item.name || item.flightNumber}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {productType === 'hotels' && `${item.city}, ${item.region}`}
                        {productType === 'tours' && item.destination}
                        {productType === 'flights' && `${item.departureCity} → ${item.arrivalCity}`}
                        {productType === 'transfers' && `${item.fromLocation} → ${item.toLocation}`}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleStatus(item.id, item.isActive)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${
                          item.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }
                      `}
                    >
                      {item.isActive ? 'Aktif' : 'Pasif'}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-slate-900">
                        {productType === 'hotels' && `₺${item.priceMin}-${item.priceMax}`}
                        {productType === 'tours' && `₺${item.priceAdult}`}
                        {productType === 'flights' && `₺${item.priceAdult}`}
                        {productType === 'transfers' && item.vehicles?.[0] && `₺${item.vehicles[0].priceStandard}`}
                      </span>
                    </div>

                    {(productType === 'hotels' || productType === 'tours') && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-slate-900">
                          {item.rating?.toFixed(1)} ({item.reviewCount})
                        </span>
                      </div>
                    )}

                    {productType === 'hotels' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Home className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-600">{item.roomCount} oda</span>
                      </div>
                    )}

                    {productType === 'tours' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="text-slate-600">{item.duration} gün</span>
                      </div>
                    )}

                    {productType === 'flights' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-600">{item.availableSeats} koltuk</span>
                      </div>
                    )}

                    {productType === 'transfers' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="w-4 h-4 text-orange-600" />
                        <span className="text-slate-600">{item.vehicles?.length} araç</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Görüntüle
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-all text-sm font-medium">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="bg-white/5 rounded-xl p-12 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Henüz ürün bulunmuyor
            </h3>
            <p className="text-slate-600 mb-6">
              İlk ürününüzü eklemek için yukarıdaki butonu kullanın
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5 inline-block mr-2" />
              Yeni Ürün Ekle
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && data.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white/5 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Önceki
            </button>
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {page}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data.length < 20}
              className="px-4 py-2 bg-white/5 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AddProductModal
        show={showAddModal}
        productType={productType}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          fetchData();
        }}
      />

      {/* View Modal */}
      {selectedItem && (
        <ViewProductModal
          item={selectedItem}
          productType={productType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

// Add Product Modal Component
const AddProductModal = ({
  show,
  productType,
  onClose,
  onSuccess,
}: {
  show: boolean;
  productType: ProductType;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/admin/${productType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Ürün başarıyla eklendi');
        onSuccess();
      } else {
        alert('Ekleme başarısız');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/5 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/5">
          <h2 className="text-2xl font-bold text-slate-900">Yeni Ürün Ekle</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Açıklama *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type-specific fields would go here */}

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
              >
                {submitting ? 'Ekleniyor...' : 'Ürün Ekle'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Product Modal
const ViewProductModal = ({
  item,
  productType,
  onClose,
}: {
  item: any;
  productType: ProductType;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/5 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/5">
          <h2 className="text-2xl font-bold text-slate-900">Ürün Detayları</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AllProductsManagement;
