import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car, Search, Filter, Plus, Edit2, Copy, Star, Power, Trash2, ChevronDown } from 'lucide-react';
import logger from '../../../lib/logger';
import { useToast } from '../../../context/ToastContext';

interface CarRental {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  pricePerDay: number;
  currency: string;
  mainImage: string;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  availableCount: number;
  _count?: {
    bookings: number;
  };
}

interface Stats {
  total: number;
  active: number;
  featured: number;
  totalBookings: number;
  totalRevenue: number;
}

export default function CarRentalsManagement() {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const [cars, setCars] = useState<CarRental[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    featured: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch cars
  useEffect(() => {
    fetchCars();
  }, [page, filterCategory, filterStatus, searchTerm]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      if (filterCategory) params.append('category', filterCategory);
      if (filterStatus === 'active') params.append('isActive', 'true');
      if (filterStatus === 'inactive') params.append('isActive', 'false');
      if (filterStatus === 'featured') params.append('isFeatured', 'true');
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/car-rentals?${params}`);
      const data = await response.json();

      if (data.success) {
        setCars(data.data || []);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }

        // Calculate stats
        const statsData = {
          total: data.pagination?.total || 0,
          active: data.data?.filter((c: CarRental) => c.isActive).length || 0,
          featured: data.data?.filter((c: CarRental) => c.isFeatured).length || 0,
          totalBookings: data.data?.reduce((sum: number, c: CarRental) => sum + (c._count?.bookings || 0), 0) || 0,
          totalRevenue: 0 // Would need actual booking data
        };
        setStats(statsData);
      }
    } catch (error) {
      logger.error('Error fetching cars:', error as Error, { component: 'CarRentals' });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/car-rentals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        fetchCars();
      }
    } catch (error) {
      logger.error('Error toggling active status:', error as Error, { component: 'CarRentals' });
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/car-rentals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentStatus })
      });

      if (response.ok) {
        fetchCars();
      }
    } catch (error) {
      logger.error('Error toggling featured status:', error as Error, { component: 'CarRentals' });
    }
  };

  const deleteCar = async (id: string) => {
    if (!confirm('Bu aracı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/admin/car-rentals/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        showToast({ type: 'success', title: 'Araç başarıyla silindi' });
        fetchCars();
      } else {
        showToast({ type: 'error', title: data.error || 'Araç silinemedi' });
      }
    } catch (error) {
      logger.error('Error deleting car:', error as Error, { component: 'CarRentals' });
      showToast({ type: 'error', title: 'Bir hata oluştu' });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ECONOMY_SEDAN: 'bg-blue-100 text-blue-800',
      PREMIUM_SEDAN: 'bg-purple-100 text-purple-800',
      ECONOMY_SUV: 'bg-purple-500/30 text-purple-300',
      PREMIUM_SUV: 'bg-emerald-100 text-emerald-800',
      LUXURY: 'bg-blue-500-light text-amber-800',
      SPORTS: 'bg-purple-500/30 text-purple-300',
      VAN: 'bg-white/5 text-white',
      MINIVAN: 'bg-slate-100 text-slate-800',
      COMPACT: 'bg-cyan-100 text-cyan-800',
      FULLSIZE: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-white/5 text-white';
  };

  const formatCategory = (category: string) => {
    return category.split('_').map((word) =>
    word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600-light rounded-lg">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Araç Kiralama Yönetimi</h1>
                <p className="text-sm text-gray-400">Tüm araçları yönetin ve düzenleyin</p>
              </div>
            </div>
            <Link href="/admin/v2/car-rentals/new">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                <Plus className="w-5 h-5" />
                <span>Yeni Araç Ekle</span>
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-400 font-medium">Toplam Araç</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <p className="text-sm text-purple-400 font-medium">Aktif</p>
              <p className="text-2xl font-bold text-green-900 mt-1">{stats.active}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
              <p className="text-sm text-amber-600 font-medium">Öne Çıkan</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{stats.featured}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Toplam Rezervasyon</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{stats.totalBookings}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
              <p className="text-sm text-emerald-600 font-medium">Müsait Araç</p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">
                {cars.filter((c) => c.availableCount > 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Araç, marka veya model ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500" />

            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500">

              <option value="">Tüm Kategoriler</option>
              <option value="ECONOMY_SEDAN">Economy Sedan</option>
              <option value="PREMIUM_SEDAN">Premium Sedan</option>
              <option value="ECONOMY_SUV">Economy SUV</option>
              <option value="PREMIUM_SUV">Premium SUV</option>
              <option value="LUXURY">Luxury</option>
              <option value="SPORTS">Sports</option>
              <option value="VAN">Van</option>
              <option value="MINIVAN">Minivan</option>
              <option value="COMPACT">Compact</option>
              <option value="FULLSIZE">Fullsize</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500">

              <option value="">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
              <option value="featured">Öne Çıkan</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
                setFilterStatus('');
                setPage(1);
              }}
              className="px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition-colors">

              Filtreleri Temizle
            </button>
          </div>
        </div>

        {/* Cars Table */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-sm overflow-hidden">
          {loading ?
          <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">Yükleniyor...</p>
            </div> :
          cars.length === 0 ?
          <div className="p-12 text-center">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">Araç bulunamadı</p>
            </div> :

          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-lydian-border">
                <thead className="bg-white/10 backdrop-blur-xl border border-white/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Araç
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Özellikler
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rezervasyon
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/10 backdrop-blur-xl border border-white/20 divide-y divide-lydian-border">
                  {cars.map((car) =>
                <tr key={car.id} className="hover:bg-white/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                        src={car.mainImage}
                        alt={car.name}
                        className="w-16 h-12 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/car-placeholder.png';
                        }} />

                          <div>
                            <p className="font-medium text-white">{car.name}</p>
                            <p className="text-sm text-gray-300">
                              {car.brand} {car.model} ({car.year})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(car.category)}`}>
                          {formatCategory(car.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {car.seats} koltuk • {car.transmission === 'AUTOMATIC' ? 'Otomatik' : 'Manuel'}
                        </div>
                        <div className="text-sm text-gray-300">
                          {car.fuelType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {car.pricePerDay} {car.currency}/gün
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          {car.rating.toFixed(1)} ({car.reviewCount})
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      car.isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-white/5 text-white'}`
                      }>
                            {car.isActive ? 'Aktif' : 'Pasif'}
                          </span>
                          {car.isFeatured &&
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500-light text-amber-800">
                              Öne Çıkan
                            </span>
                      }
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      car.availableCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-500/30 text-purple-300'}`
                      }>
                            {car.availableCount > 0 ? `${car.availableCount} Müsait` : 'Tükendi'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium">
                          {car._count?.bookings || 0} rezervasyon
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                        onClick={() => toggleActive(car.id, car.isActive)}
                        className={`p-2 rounded-lg transition-colors ${
                        car.isActive ?
                        'text-purple-400 hover:bg-purple-500/20' :
                        'text-gray-400 hover:bg-white/5'}`
                        }
                        title={car.isActive ? 'Pasif yap' : 'Aktif yap'}>

                            <Power className="w-4 h-4" />
                          </button>
                          <button
                        onClick={() => toggleFeatured(car.id, car.isFeatured)}
                        className={`p-2 rounded-lg transition-colors ${
                        car.isFeatured ?
                        'text-amber-600 hover:bg-amber-50' :
                        'text-gray-400 hover:bg-white/5'}`
                        }
                        title={car.isFeatured ? 'Öne çıkarma' : 'Öne çıkar'}>

                            <Star className={car.isFeatured ? 'fill-current' : ''} style={{ width: '1rem', height: '1rem' }} />
                          </button>
                          <Link href={`/admin/v2/car-rentals/${car.id}/edit`}>
                            <button
                          className="p-2 text-blue-400 hover:bg-gradient-to-r from-blue-600 to-purple-600-lighter rounded-lg transition-colors"
                          title="Düzenle">

                              <Edit2 className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                        onClick={() => deleteCar(car.id)}
                        className="p-2 text-blue-400 hover:bg-white/5 rounded-lg transition-colors"
                        title="Sil">

                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          }

          {/* Pagination */}
          {totalPages > 1 &&
          <div className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">
                  Sayfa <span className="font-medium">{page}</span> / <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">

                    Önceki
                  </button>
                  <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">

                    Sonraki
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}