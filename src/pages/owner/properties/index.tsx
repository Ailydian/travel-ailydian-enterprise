
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Power,
  PowerOff
} from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['owner', 'common'])),
    },
  };
}

export default function PropertiesPage() {
  const { t } = useTranslation('owner');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock Properties Data
  const properties = [
    {
      id: 1,
      name: 'Villa Deniz Manzara',
      type: 'Villa',
      location: 'Bodrum, Muğla',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      price: 1200,
      currency: 'TRY',
      rating: 4.9,
      reviews: 127,
      bookings: 45,
      revenue: 54000,
      occupancy: 92,
      status: 'active',
      lastBooked: '2 saat önce'
    },
    {
      id: 2,
      name: 'Apart Şehir Merkezi',
      type: 'Apartment',
      location: 'İstanbul, Kadıköy',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      price: 450,
      currency: 'TRY',
      rating: 4.7,
      reviews: 89,
      bookings: 67,
      revenue: 30150,
      occupancy: 87,
      status: 'active',
      lastBooked: '1 gün önce'
    },
    {
      id: 3,
      name: 'Dağ Evi Lux',
      type: 'Cabin',
      location: 'Uludağ, Bursa',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      price: 800,
      currency: 'TRY',
      rating: 4.8,
      reviews: 54,
      bookings: 28,
      revenue: 22400,
      occupancy: 78,
      status: 'maintenance',
      lastBooked: '3 gün önce'
    },
    {
      id: 4,
      name: 'Sahil Evi Premium',
      type: 'House',
      location: 'Çeşme, İzmir',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      price: 950,
      currency: 'TRY',
      rating: 4.6,
      reviews: 72,
      bookings: 38,
      revenue: 36100,
      occupancy: 85,
      status: 'active',
      lastBooked: '4 saat önce'
    },
    {
      id: 5,
      name: 'Studio Kadıköy',
      type: 'Studio',
      location: 'İstanbul, Kadıköy',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      price: 300,
      currency: 'TRY',
      rating: 4.5,
      reviews: 31,
      bookings: 52,
      revenue: 15600,
      occupancy: 82,
      status: 'inactive',
      lastBooked: '1 hafta önce'
    }
  ];

  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    inactive: properties.filter(p => p.status === 'inactive').length,
    maintenance: properties.filter(p => p.status === 'maintenance').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', label: t('properties.status.active') };
      case 'inactive':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', label: t('properties.status.inactive') };
      case 'maintenance':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', label: t('properties.status.pending') };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6B7280', label: t('properties.status.draft') };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black neon-text-strong mb-2" style={{ color: '#000000' }}>
            {t('properties.title')}
          </h1>
          <p className="text-sm" style={{ color: '#666666' }}>
            {stats.total} {t('properties.totalProperties')} • {stats.active} {t('properties.filters.active')}
          </p>
        </div>
        <Link
          href="/owner/properties/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 neon-glow"
          style={{
            background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
            color: 'white',
            boxShadow: '0 0 30px rgba(255, 33, 77, 0.5)'
          }}
        >
          <Plus className="w-5 h-5" />
          <span>{t('properties.addNew')}</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Mülk', value: stats.total, icon: Building2, color: 'var(--ac-1)' },
          { label: 'Aktif', value: stats.active, icon: Power, color: '#10B981' },
          { label: 'Pasif', value: stats.inactive, icon: PowerOff, color: '#EF4444' },
          { label: 'Bakımda', value: stats.maintenance, icon: AlertCircle, color: '#F59E0B' }
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-xl p-4 border-2 transition-all hover:scale-105"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#666666' }}>{stat.label}</p>
                <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
          <input
            type="text"
            placeholder="Mülk adı, konum veya türe göre ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              color: '#000000'
            }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-xl border-2 transition-all"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E7EB',
            color: '#000000'
          }}
        >
          <option value="all">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="inactive">Pasif</option>
          <option value="maintenance">Bakımda</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties
          .filter(p => filterStatus === 'all' || p.status === filterStatus)
          .filter(p =>
            searchQuery === '' ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.type.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((property) => {
            const statusInfo = getStatusColor(property.status);

            return (
              <div
                key={property.id}
                className="rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-lg"
                    style={{
                      backgroundColor: statusInfo.bg,
                      color: statusInfo.text,
                      border: `1px solid ${statusInfo.text}30`
                    }}
                  >
                    {statusInfo.label}
                  </div>
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-lg"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white'
                    }}
                  >
                    {property.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 neon-text-strong" style={{ color: '#000000' }}>
                    {property.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: '#666666' }}>
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4" style={{ color: 'var(--ac-1)' }} />
                        <span className="text-sm font-bold" style={{ color: '#000000' }}>
                          {property.rating}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: '#666666' }}>{property.reviews} değerlendirme</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-4 h-4" style={{ color: 'var(--ac-2)' }} />
                        <span className="text-sm font-bold" style={{ color: '#000000' }}>
                          {property.bookings}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: '#666666' }}>rezervasyon</p>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: '#666666' }}>Doluluk Oranı</span>
                      <span className="font-bold" style={{ color: 'var(--ac-1)' }}>{property.occupancy}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E7EB' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${property.occupancy}%`,
                          background: 'linear-gradient(90deg, var(--ac-1), var(--ac-2))'
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <span style={{ color: '#666666' }}>Toplam Gelir</span>
                    <span className="font-bold text-lg" style={{ color: 'var(--ac-1)' }}>
                      ₺{property.revenue.toLocaleString('tr-TR')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/owner/properties/${property.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(255, 33, 77, 0.1)',
                        color: 'var(--ac-1)',
                        border: '1px solid rgba(255, 33, 77, 0.3)'
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Görüntüle</span>
                    </Link>
                    <button
                      className="flex items-center justify-center px-4 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(255, 33, 77, 0.1)',
                        color: 'var(--ac-1)',
                        border: '1px solid rgba(255, 33, 77, 0.3)'
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="flex items-center justify-center px-4 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 text-xs" style={{ color: '#666666' }}>
                    Son rezervasyon: {property.lastBooked}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Empty State */}
      {properties.filter(p => filterStatus === 'all' || p.status === filterStatus).length === 0 && (
        <div className="text-center py-16 rounded-2xl border-2"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB'
             }}>
          <Building2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#666666' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>
            Mülk Bulunamadı
          </h3>
          <p className="mb-6" style={{ color: '#666666' }}>
            Seçtiğiniz filtreye uygun mülk bulunmamaktadır.
          </p>
          <Link
            href="/owner/properties/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
              color: 'white'
            }}
          >
            <Plus className="w-5 h-5" />
            <span>İlk Mülkünüzü Ekleyin</span>
          </Link>
        </div>
      )}
    </div>
  );
}
