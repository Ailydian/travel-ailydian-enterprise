import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Search, Filter, Plus, Edit2, Copy, Star, Power, Trash2, MapPin, Users, Bed, Wifi, Waves } from 'lucide-react';
import logger from '../../../lib/logger';

interface RentalProperty {
  id: string;
  title: string;
  slug: string;
  type: string;
  city: string;
  district: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  basePrice: number;
  currency: string;
  mainImage: string;
  isActive: boolean;
  isFeatured: boolean;
  overall: number;
  reviewCount: number;
  instantBook: boolean;
  hostSuperhost: boolean;
  // Amenities
  wifi: boolean;
  pool: boolean;
  beachfront: boolean;
  seaview: boolean;
  _count?: {
    bookings: number;
  };
}

interface Stats {
  total: number;
  active: number;
  featured: number;
  superhosts: number;
  totalBookings: number;
  avgOccupancy: number;
}

export default function RentalPropertiesManagement() {
  const [properties, setProperties] = useState<RentalProperty[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    featured: 0,
    superhosts: 0,
    totalBookings: 0,
    avgOccupancy: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch properties
  useEffect(() => {
    fetchProperties();
  }, [page, filterType, filterCity, filterStatus, searchTerm]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      if (filterType) params.append('type', filterType);
      if (filterCity) params.append('city', filterCity);
      if (filterStatus === 'active') params.append('isActive', 'true');
      if (filterStatus === 'inactive') params.append('isActive', 'false');
      if (filterStatus === 'featured') params.append('isFeatured', 'true');
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/rental-properties?${params}`);
      const data = await response.json();

      if (data.success) {
        setProperties(data.data || []);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }

        // Calculate stats
        const statsData = {
          total: data.pagination?.total || 0,
          active: data.data?.filter((p: RentalProperty) => p.isActive).length || 0,
          featured: data.data?.filter((p: RentalProperty) => p.isFeatured).length || 0,
          superhosts: data.data?.filter((p: RentalProperty) => p.hostSuperhost).length || 0,
          totalBookings: data.data?.reduce((sum: number, p: RentalProperty) => sum + (p._count?.bookings || 0), 0) || 0,
          avgOccupancy: 0, // Would need booking data calculation
        };
        setStats(statsData);
      }
    } catch (error) {
      logger.error('Error fetching properties:', error as Error, { component: 'RentalProperties' });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/rental-properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchProperties();
      }
    } catch (error) {
      logger.error('Error toggling active status:', error as Error, { component: 'RentalProperties' });
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/rental-properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentStatus }),
      });

      if (response.ok) {
        fetchProperties();
      }
    } catch (error) {
      logger.error('Error toggling featured status:', error as Error, { component: 'RentalProperties' });
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('Bu mülkü silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/admin/rental-properties/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Mülk başarıyla silindi');
        fetchProperties();
      } else {
        alert(data.error || 'Mülk silinemedi');
      }
    } catch (error) {
      logger.error('Error deleting property:', error as Error, { component: 'RentalProperties' });
      alert('Bir hata oluştu');
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      VILLA: 'bg-purple-100 text-purple-800',
      APARTMENT: 'bg-blue-100 text-blue-800',
      HOUSE: 'bg-green-100 text-green-800',
      STUDIO: 'bg-cyan-100 text-cyan-800',
      PENTHOUSE: 'bg-amber-100 text-amber-800',
      COTTAGE: 'bg-emerald-100 text-emerald-800',
    };
    return colors[type] || 'bg-white/10 text-white';
  };

  const formatType = (type: string) => {
    const types: Record<string, string> = {
      VILLA: 'Villa',
      APARTMENT: 'Apart',
      HOUSE: 'Ev',
      STUDIO: 'Studio',
      PENTHOUSE: 'Penthouse',
      COTTAGE: 'Pansiyon',
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-white/5">
      {/* Header */}
      <div className="bg-white/5 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Konaklama Yönetimi</h1>
                <p className="text-sm text-gray-100">Tüm mülkleri yönetin ve düzenleyin</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Yeni Mülk Ekle</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Toplam Mülk</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Aktif</p>
              <p className="text-2xl font-bold text-green-900 mt-1">{stats.active}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
              <p className="text-sm text-amber-600 font-medium">Öne Çıkan</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{stats.featured}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Superhost</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.superhosts}</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-lg">
              <p className="text-sm text-rose-600 font-medium">Rezervasyon</p>
              <p className="text-2xl font-bold text-rose-900 mt-1">{stats.totalBookings}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
              <p className="text-sm text-emerald-600 font-medium">Instant Book</p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">
                {properties.filter(p => p.instantBook).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/5 rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Mülk, şehir veya host ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Tüm Tipler</option>
              <option value="VILLA">Villa</option>
              <option value="APARTMENT">Apart</option>
              <option value="HOUSE">Ev</option>
              <option value="STUDIO">Studio</option>
              <option value="PENTHOUSE">Penthouse</option>
              <option value="COTTAGE">Pansiyon</option>
            </select>

            {/* City Filter */}
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Tüm Şehirler</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
              <option value="Antalya">Antalya</option>
              <option value="Bodrum">Bodrum</option>
              <option value="Çeşme">Çeşme</option>
              <option value="Bursa">Bursa</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
              <option value="featured">Öne Çıkan</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setFilterCity('');
                setFilterStatus('');
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-200 rounded-lg hover:bg-white/5 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white/5 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-300">Yükleniyor...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="p-12 text-center">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">Mülk bulunamadı</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Mülk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Tip & Konum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Kapasite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Özellikler
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Rezervasyon
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={property.mainImage}
                            alt={property.title}
                            className="w-20 h-14 rounded object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/property-placeholder.png';
                            }}
                          />
                          <div className="max-w-xs">
                            <p className="font-medium text-white truncate">{property.title}</p>
                            {property.hostSuperhost && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800 mt-1">
                                ⭐ Superhost
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(property.type)}`}>
                          {formatType(property.type)}
                        </span>
                        <div className="flex items-center text-sm text-gray-200 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.city}, {property.district}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 text-sm text-white">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-1" />
                            {property.guests}
                          </div>
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 text-gray-400 mr-1" />
                            {property.bedrooms}/{property.bathrooms}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {property.wifi && (
                            <div className="p-1 bg-blue-100 rounded" title="WiFi">
                              <Wifi className="w-3 h-3 text-blue-600" />
                            </div>
                          )}
                          {property.pool && (
                            <div className="p-1 bg-cyan-100 rounded" title="Havuz">
                              <Waves className="w-3 h-3 text-cyan-600" />
                            </div>
                          )}
                          {property.beachfront && (
                            <div className="p-1 bg-amber-100 rounded" title="Sahil">
                              <span className="text-xs">🏖️</span>
                            </div>
                          )}
                          {property.seaview && (
                            <div className="p-1 bg-blue-100 rounded" title="Deniz Manzarası">
                              <span className="text-xs">🌊</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {property.basePrice} {property.currency}/gece
                        </div>
                        <div className="flex items-center text-sm text-gray-200">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          {property.overall.toFixed(1)} ({property.reviewCount})
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            property.isActive ? 'bg-green-100 text-green-800' : 'bg-white/10 text-white'
                          }`}>
                            {property.isActive ? 'Aktif' : 'Pasif'}
                          </span>
                          {property.isFeatured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                              Öne Çıkan
                            </span>
                          )}
                          {property.instantBook && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                              Instant Book
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium">
                          {property._count?.bookings || 0} rezervasyon
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleActive(property.id, property.isActive)}
                            className={`p-2 rounded-lg transition-colors ${
                              property.isActive
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-300 hover:bg-white/5'
                            }`}
                            title={property.isActive ? 'Pasif yap' : 'Aktif yap'}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleFeatured(property.id, property.isFeatured)}
                            className={`p-2 rounded-lg transition-colors ${
                              property.isFeatured
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-gray-300 hover:bg-white/5'
                            }`}
                            title={property.isFeatured ? 'Öne çıkarma' : 'Öne çıkar'}
                          >
                            <Star className={property.isFeatured ? 'fill-current' : ''} style={{ width: '1rem', height: '1rem' }} />
                          </button>
                          <Link href={`/admin/v2/rental-properties/${property.id}/edit`}>
                            <button
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Düzenle"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteProperty(property.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-white/5 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-200">
                  Sayfa <span className="font-medium">{page}</span> / <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-200 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Önceki
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-200 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sonraki
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
