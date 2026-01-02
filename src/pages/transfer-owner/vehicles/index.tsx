import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bus,
  MapPin,
  Users,
  Luggage,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  UserCheck,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Car } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import type { TransferVehicle, VehicleStatus } from '@/types/transfer.types';
import { TRANSFER_VEHICLES } from '@/data/transfer-vehicles';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['transfer-owner', 'common']))
    }
  };
}

export default function FleetManagementPage() {
  const { t } = useTranslation('transfer-owner');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | VehicleStatus>('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock Fleet Data - 6 realistic transfer vehicles
  const vehicles = [
  {
    id: 1,
    name: 'Renault Symbol',
    category: 'economy',
    categoryLabel: 'Ekonomik',
    vehicleType: 'Ekonomik Sedan',
    brand: 'Renault',
    model: 'Symbol',
    year: 2023,
    licensePlate: '34 ABC 1234',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    capacity: {
      passengers: 3,
      luggage: 2
    },
    status: 'available' as VehicleStatus,
    pricing: {
      basePricePerKm: 8.5,
      minimumFare: 250
    },
    driver: {
      name: 'Mehmet Yılmaz',
      assigned: true,
      phoneNumber: '+90 532 111 2233'
    },
    legalInfo: {
      tourismLicense: 'D2-2024-001234',
      verified: true
    },
    stats: {
      totalTransfers: 342,
      rating: 4.8,
      totalRevenue: 125600,
      onTimePerformance: 96
    }
  },
  {
    id: 2,
    name: 'Mercedes E-Class',
    category: 'premium',
    categoryLabel: 'Premium',
    vehicleType: 'VIP Sedan',
    brand: 'Mercedes',
    model: 'E-Class',
    year: 2024,
    licensePlate: '06 VIP 7890',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
    capacity: {
      passengers: 3,
      luggage: 3
    },
    status: 'in-service' as VehicleStatus,
    pricing: {
      basePricePerKm: 15.3,
      minimumFare: 450
    },
    driver: {
      name: 'Ali Demir',
      assigned: true,
      phoneNumber: '+90 533 444 5566'
    },
    legalInfo: {
      tourismLicense: 'D2-2024-001567',
      verified: true
    },
    stats: {
      totalTransfers: 287,
      rating: 4.9,
      totalRevenue: 198450,
      onTimePerformance: 98
    }
  },
  {
    id: 3,
    name: 'VW Caravelle',
    category: 'comfort',
    categoryLabel: 'Konfor',
    vehicleType: 'Minivan (7 Kişilik)',
    brand: 'Volkswagen',
    model: 'Caravelle',
    year: 2023,
    licensePlate: '35 TRF 4567',
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800',
    capacity: {
      passengers: 7,
      luggage: 6
    },
    status: 'available' as VehicleStatus,
    pricing: {
      basePricePerKm: 12.75,
      minimumFare: 375
    },
    driver: {
      name: 'Hasan Kaya',
      assigned: true,
      phoneNumber: '+90 535 777 8899'
    },
    legalInfo: {
      tourismLicense: 'D2-2024-002134',
      verified: true
    },
    stats: {
      totalTransfers: 198,
      rating: 4.7,
      totalRevenue: 156780,
      onTimePerformance: 94
    }
  },
  {
    id: 4,
    name: 'Mercedes Vito',
    category: 'premium',
    categoryLabel: 'Premium',
    vehicleType: 'VIP Minivan',
    brand: 'Mercedes',
    model: 'Vito',
    year: 2024,
    licensePlate: '34 MVP 2468',
    image: 'https://images.unsplash.com/photo-1552345387-67b8a746f0f9?w=800',
    capacity: {
      passengers: 7,
      luggage: 6
    },
    status: 'available' as VehicleStatus,
    pricing: {
      basePricePerKm: 18.7,
      minimumFare: 525
    },
    driver: {
      name: 'Mustafa Özkan',
      assigned: true,
      phoneNumber: '+90 536 222 3344'
    },
    legalInfo: {
      tourismLicense: 'D2-2024-002789',
      verified: true
    },
    stats: {
      totalTransfers: 156,
      rating: 4.9,
      totalRevenue: 189340,
      onTimePerformance: 97
    }
  },
  {
    id: 5,
    name: 'Ford Transit',
    category: 'group',
    categoryLabel: 'Grup',
    vehicleType: 'Minibüs (14 Kişilik)',
    brand: 'Ford',
    model: 'Transit',
    year: 2022,
    licensePlate: '06 GRP 1357',
    image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800',
    capacity: {
      passengers: 14,
      luggage: 12
    },
    status: 'maintenance' as VehicleStatus,
    pricing: {
      basePricePerKm: 21.25,
      minimumFare: 625
    },
    driver: {
      name: 'Ahmet Şahin',
      assigned: true,
      phoneNumber: '+90 537 555 6677'
    },
    legalInfo: {
      tourismLicense: 'D2-2024-003456',
      verified: true
    },
    stats: {
      totalTransfers: 234,
      rating: 4.6,
      totalRevenue: 212890,
      onTimePerformance: 92
    }
  },
  {
    id: 6,
    name: 'Mercedes Sprinter',
    category: 'luxury',
    categoryLabel: 'Lüks',
    vehicleType: 'VIP Sprinter',
    brand: 'Mercedes',
    model: 'Sprinter VIP',
    year: 2024,
    licensePlate: '34 LUX 9999',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    capacity: {
      passengers: 12,
      luggage: 12
    },
    status: 'available' as VehicleStatus,
    pricing: {
      basePricePerKm: 29.75,
      minimumFare: 875
    },
    driver: {
      name: 'Emre Aydın',
      assigned: true,
      phoneNumber: '+90 538 999 0011'
    },
    legalInfo: {
      tourismLicense: 'D2-2024-004567',
      verified: true
    },
    stats: {
      totalTransfers: 89,
      rating: 5.0,
      totalRevenue: 156780,
      onTimePerformance: 99
    }
  }];


  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === 'available').length,
    inService: vehicles.filter((v) => v.status === 'in-service').length,
    maintenance: vehicles.filter((v) => v.status === 'maintenance').length
  };

  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case 'available':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--lydian-success)', label: 'Müsait' };
      case 'in-service':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: 'var(--lydian-warning)', label: 'Seferde' };
      case 'maintenance':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: 'var(--lydian-secondary)', label: 'Bakımda' };
      case 'retired':
        return { bg: 'rgba(107, 114, 128, 0.1)', text: 'var(--lydian-text-tertiary)', label: 'Pasif' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', text: 'var(--lydian-text-tertiary)', label: 'Bilinmiyor' };
    }
  };

  const filteredVehicles = vehicles.
  filter((v) => filterStatus === 'all' || v.status === filterStatus).
  filter((v) => filterCategory === 'all' || v.category === filterCategory).
  filter((v) =>
  searchQuery === '' ||
  v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
  v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
  v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black neon-text-strong mb-2" style={{ color: '#000000' }}>
            Filo Yönetimi
          </h1>
          <p className="text-sm" style={{ color: '#666666' }}>
            {stats.total} Toplam Araç • {stats.available} Müsait • {stats.inService} Seferde
          </p>
        </div>
        <Link
          href="/transfer-owner/vehicles/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 neon-glow"
          style={{
            background: 'linear-gradient(135deg, var(--lydian-info-hover), #0891B2)',
            color: 'white',
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.5)'
          }}>

          <Plus className="w-5 h-5" />
          <span>Yeni Araç Ekle</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
        { label: 'Toplam Filo', value: stats.total, icon: Bus, color: 'var(--lydian-info-hover)' },
        { label: 'Müsait', value: stats.available, icon: CheckCircle, color: 'var(--lydian-success)' },
        { label: 'Seferde', value: stats.inService, icon: Clock, color: 'var(--lydian-warning)' },
        { label: 'Bakımda', value: stats.maintenance, icon: AlertCircle, color: 'var(--lydian-secondary)' }].
        map((stat, index) =>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl p-4 border-2 transition-all hover:scale-105"
          style={{
            backgroundColor: 'var(--lydian-text-inverse)',
            borderColor: 'var(--lydian-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#666666' }}>{stat.label}</p>
                <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              </div>
              <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>

                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
          <input
            type="text"
            placeholder="Plaka, marka veya model ile ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all focus:border-blue-500"
            style={{
              backgroundColor: 'var(--lydian-text-inverse)',
              borderColor: 'var(--lydian-border)',
              color: '#000000'
            }} />

        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-3 rounded-xl border-2 transition-all focus:border-blue-500"
          style={{
            backgroundColor: 'var(--lydian-text-inverse)',
            borderColor: 'var(--lydian-border)',
            color: '#000000'
          }}>

          <option value="all">Tüm Durumlar</option>
          <option value="available">Müsait</option>
          <option value="in-service">Seferde</option>
          <option value="maintenance">Bakımda</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border-2 transition-all focus:border-blue-500"
          style={{
            backgroundColor: 'var(--lydian-text-inverse)',
            borderColor: 'var(--lydian-border)',
            color: '#000000'
          }}>

          <option value="all">Tüm Kategoriler</option>
          <option value="economy">Ekonomik</option>
          <option value="comfort">Konfor</option>
          <option value="premium">Premium</option>
          <option value="luxury">Lüks</option>
          <option value="group">Grup</option>
        </select>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, index) => {
          const statusInfo = getStatusColor(vehicle.status);

          return (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--lydian-text-inverse)',
                borderColor: 'var(--lydian-border)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover" />

                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-lg"
                  style={{
                    backgroundColor: statusInfo.bg,
                    color: statusInfo.text,
                    border: `1px solid ${statusInfo.text}30`
                  }}>

                  {statusInfo.label}
                </div>
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-lg"
                  style={{
                    backgroundColor: 'var(--lydian-bg-overlay)',
                    color: 'white'
                  }}>

                  {vehicle.categoryLabel}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 neon-text-strong" style={{ color: '#000000' }}>
                  {vehicle.name}
                </h3>

                <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: '#666666' }}>
                  <Car className="w-4 h-4" />
                  <span>{vehicle.licensePlate}</span>
                </div>

                {/* Capacity Badges */}
                <div className="flex gap-2 mb-4">
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      color: 'var(--lydian-info-hover)'
                    }}>

                    <Users className="w-3 h-3" />
                    <span>{vehicle.capacity.passengers} kişi</span>
                  </div>
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(8, 145, 178, 0.1)',
                      color: '#0891B2'
                    }}>

                    <Luggage className="w-3 h-3" />
                    <span>{vehicle.capacity.luggage} bagaj</span>
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--lydian-border)' }}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span style={{ color: '#666666' }}>Km Başı Ücret</span>
                    <span className="font-bold" style={{ color: 'var(--lydian-info-hover)' }}>
                      ₺{vehicle.pricing.basePricePerKm.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#666666' }}>Minimum Ücret</span>
                    <span className="font-bold" style={{ color: '#0891B2' }}>
                      ₺{vehicle.pricing.minimumFare}
                    </span>
                  </div>
                </div>

                {/* Driver Assignment */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4" style={{ color: vehicle.driver.assigned ? 'var(--lydian-success)' : '#666666' }} />
                    <span className="text-sm font-medium" style={{ color: '#000000' }}>
                      {vehicle.driver.assigned ? vehicle.driver.name : 'Sürücü Atanmadı'}
                    </span>
                  </div>
                  {vehicle.driver.assigned &&
                  <p className="text-xs pl-6" style={{ color: '#666666' }}>
                      {vehicle.driver.phoneNumber}
                    </p>
                  }
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--lydian-info-hover)' }} />
                      <span className="text-sm font-bold" style={{ color: '#000000' }}>
                        {vehicle.stats.totalTransfers}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: '#666666' }}>toplam transfer</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                      <span className="text-sm font-bold" style={{ color: '#000000' }}>
                        %{vehicle.stats.onTimePerformance}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: '#666666' }}>zamanında</p>
                  </div>
                </div>

                {/* Legal Info */}
                <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: '#666666' }}>
                  <div className={`px-2 py-1 rounded ${vehicle.legalInfo.verified ? 'bg-green-100 text-green-700' : 'bg-purple-500/10 text-purple-400'}`}>
                    D2: {vehicle.legalInfo.tourismLicense}
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span style={{ color: '#666666' }}>Toplam Gelir</span>
                  <span className="font-bold text-lg" style={{ color: '#2563EB' }}>
                    ₺{vehicle.stats.totalRevenue.toLocaleString('tr-TR')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/transfer-owner/vehicles/${vehicle.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563EB',
                      border: '1px solid rgba(37, 99, 235, 0.3)'
                    }}>

                    <Eye className="w-4 h-4" />
                    <span>Görüntüle</span>
                  </Link>
                  <button
                    className="flex items-center justify-center px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(8, 145, 178, 0.1)',
                      color: '#0891B2',
                      border: '1px solid rgba(8, 145, 178, 0.3)'
                    }}>

                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="flex items-center justify-center px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--lydian-secondary)',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>

                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {!vehicle.driver.assigned &&
                <Link
                  href={`/transfer-owner/drivers?assign=${vehicle.id}`}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>

                    <UserCheck className="w-4 h-4" />
                    <span>Sürücü Ata</span>
                  </Link>
                }
              </div>
            </motion.div>);

        })}
      </div>

      {/* Empty State */}
      {filteredVehicles.length === 0 &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 rounded-2xl border-2"
        style={{
          backgroundColor: 'var(--lydian-text-inverse)',
          borderColor: '#E5E7EB'
        }}>

          <Bus className="w-16 h-16 mx-auto mb-4" style={{ color: '#666666' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>
            Araç Bulunamadı
          </h3>
          <p className="mb-6" style={{ color: '#666666' }}>
            Seçtiğiniz filtreye uygun araç bulunmamaktadır.
          </p>
          <Link
          href="/transfer-owner/vehicles/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #0891B2)',
            color: 'white'
          }}>

            <Plus className="w-5 h-5" />
            <span>İlk Aracınızı Ekleyin</span>
          </Link>
        </motion.div>
      }
    </div>);

}