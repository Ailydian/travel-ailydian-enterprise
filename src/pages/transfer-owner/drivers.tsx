import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  Phone,
  Mail,
  Calendar,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  X,
  Upload,
  UserCheck,
  UserX,
  Activity,
  MapPin,
  FileText,
  ChevronDown,
  Filter,
  Download,
  IdCard
} from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['transfer-owner', 'common'])),
    },
  };
}

// Driver Data Interface
interface Driver {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiry: Date;
  photo?: string;
  status: 'active' | 'inactive' | 'on-duty' | 'off-duty';
  rating: number;
  completedTrips: number;
  onTimeRate: number;
  joinedDate: Date;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

// Mock Driver Data
const mockDrivers: Driver[] = [
  {
    id: '1',
    fullName: 'Mehmet Yılmaz',
    phone: '+90 532 111 2233',
    email: 'mehmet.yilmaz@example.com',
    licenseNumber: 'D234567890',
    licenseClass: 'D2',
    licenseExpiry: new Date('2026-08-15'),
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    status: 'on-duty',
    rating: 4.9,
    completedTrips: 342,
    onTimeRate: 98,
    joinedDate: new Date('2022-03-15'),
    emergencyContact: {
      name: 'Ayşe Yılmaz',
      phone: '+90 532 111 2234'
    }
  },
  {
    id: '2',
    fullName: 'Ali Demir',
    phone: '+90 533 444 5566',
    email: 'ali.demir@example.com',
    licenseNumber: 'D345678901',
    licenseClass: 'D2',
    licenseExpiry: new Date('2027-02-20'),
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    status: 'on-duty',
    rating: 4.8,
    completedTrips: 287,
    onTimeRate: 96,
    joinedDate: new Date('2022-06-20'),
    emergencyContact: {
      name: 'Fatma Demir',
      phone: '+90 533 444 5567'
    }
  },
  {
    id: '3',
    fullName: 'Hasan Kaya',
    phone: '+90 535 777 8899',
    email: 'hasan.kaya@example.com',
    licenseNumber: 'D456789012',
    licenseClass: 'D2',
    licenseExpiry: new Date('2025-11-10'),
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    status: 'active',
    rating: 4.7,
    completedTrips: 198,
    onTimeRate: 94,
    joinedDate: new Date('2023-01-10'),
    emergencyContact: {
      name: 'Zeynep Kaya',
      phone: '+90 535 777 8800'
    }
  },
  {
    id: '4',
    fullName: 'Mustafa Özkan',
    phone: '+90 536 222 3344',
    email: 'mustafa.ozkan@example.com',
    licenseNumber: 'D567890123',
    licenseClass: 'D2',
    licenseExpiry: new Date('2026-05-18'),
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300',
    status: 'off-duty',
    rating: 4.9,
    completedTrips: 156,
    onTimeRate: 97,
    joinedDate: new Date('2023-04-05'),
    emergencyContact: {
      name: 'Elif Özkan',
      phone: '+90 536 222 3345'
    }
  },
  {
    id: '5',
    fullName: 'Ahmet Şahin',
    phone: '+90 537 555 6677',
    email: 'ahmet.sahin@example.com',
    licenseNumber: 'D678901234',
    licenseClass: 'D2',
    licenseExpiry: new Date('2025-09-25'),
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    status: 'active',
    rating: 4.6,
    completedTrips: 234,
    onTimeRate: 92,
    joinedDate: new Date('2022-09-12'),
    emergencyContact: {
      name: 'Merve Şahin',
      phone: '+90 537 555 6678'
    }
  },
  {
    id: '6',
    fullName: 'Emre Aydın',
    phone: '+90 538 999 0011',
    email: 'emre.aydin@example.com',
    licenseNumber: 'D789012345',
    licenseClass: 'D2',
    licenseExpiry: new Date('2027-12-30'),
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300',
    status: 'active',
    rating: 5.0,
    completedTrips: 89,
    onTimeRate: 99,
    joinedDate: new Date('2024-01-08'),
    emergencyContact: {
      name: 'Selin Aydın',
      phone: '+90 538 999 0012'
    }
  }
];

export default function DriversPage() {
  const { t } = useTranslation('transfer-owner');
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Driver['status']>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'table'>('grid');
  const [toasts, setToasts] = useState<any[]>([]);

  // Form state for adding/editing driver
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    licenseNumber: '',
    licenseClass: 'D2',
    licenseExpiry: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: drivers.length,
      active: drivers.filter(d => d.status === 'active').length,
      onDuty: drivers.filter(d => d.status === 'on-duty').length,
      offDuty: drivers.filter(d => d.status === 'off-duty').length,
      inactive: drivers.filter(d => d.status === 'inactive').length,
      avgRating: (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1),
      totalTrips: drivers.reduce((sum, d) => sum + d.completedTrips, 0)
    };
  }, [drivers]);

  // Filter drivers
  const filteredDrivers = useMemo(() => {
    return drivers
      .filter(d => filterStatus === 'all' || d.status === filterStatus)
      .filter(d =>
        searchQuery === '' ||
        d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.phone.includes(searchQuery) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [drivers, filterStatus, searchQuery]);

  // Status configuration
  const getStatusConfig = (status: Driver['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Müsait',
          bg: 'rgba(16, 185, 129, 0.1)',
          text: '#10B981',
          border: 'rgba(16, 185, 129, 0.3)',
          icon: CheckCircle
        };
      case 'on-duty':
        return {
          label: 'Görevde',
          bg: 'rgba(37, 99, 235, 0.1)',
          text: '#2563EB',
          border: 'rgba(37, 99, 235, 0.3)',
          icon: Activity
        };
      case 'off-duty':
        return {
          label: 'Mesai Dışı',
          bg: 'rgba(245, 158, 11, 0.1)',
          text: '#F59E0B',
          border: 'rgba(245, 158, 11, 0.3)',
          icon: Clock
        };
      case 'inactive':
        return {
          label: 'Pasif',
          bg: 'rgba(239, 68, 68, 0.1)',
          text: '#EF4444',
          border: 'rgba(239, 68, 68, 0.3)',
          icon: UserX
        };
    }
  };

  // Toast notification helper
  const showToast = (type: 'success' | 'error', title: string, message?: string) => {
    const newToast = {
      id: Date.now().toString(),
      type,
      title,
      message,
      duration: 3000
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Handle add driver
  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const newDriver: Driver = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      licenseNumber: formData.licenseNumber,
      licenseClass: formData.licenseClass,
      licenseExpiry: new Date(formData.licenseExpiry),
      status: 'active',
      rating: 0,
      completedTrips: 0,
      onTimeRate: 0,
      joinedDate: new Date(),
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone
      }
    };

    setDrivers(prev => [...prev, newDriver]);
    setShowAddModal(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      licenseNumber: '',
      licenseClass: 'D2',
      licenseExpiry: '',
      emergencyContactName: '',
      emergencyContactPhone: ''
    });
    showToast('success', 'Sürücü Eklendi', `${newDriver.fullName} başarıyla eklendi.`);
  };

  // Handle edit driver
  const handleEditDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDriver) return;

    setDrivers(prev =>
      prev.map(d =>
        d.id === selectedDriver.id
          ? {
              ...d,
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              licenseNumber: formData.licenseNumber,
              licenseClass: formData.licenseClass,
              licenseExpiry: new Date(formData.licenseExpiry),
              emergencyContact: {
                name: formData.emergencyContactName,
                phone: formData.emergencyContactPhone
              }
            }
          : d
      )
    );

    setShowEditModal(false);
    setSelectedDriver(null);
    showToast('success', 'Sürücü Güncellendi', 'Sürücü bilgileri başarıyla güncellendi.');
  };

  // Handle delete driver
  const handleDeleteDriver = (driver: Driver) => {
    if (confirm(`${driver.fullName} adlı sürücüyü silmek istediğinize emin misiniz?`)) {
      setDrivers(prev => prev.filter(d => d.id !== driver.id));
      showToast('success', 'Sürücü Silindi', `${driver.fullName} başarıyla silindi.`);
    }
  };

  // Handle status change
  const handleStatusChange = (driver: Driver, newStatus: Driver['status']) => {
    setDrivers(prev =>
      prev.map(d => (d.id === driver.id ? { ...d, status: newStatus } : d))
    );
    const statusConfig = getStatusConfig(newStatus);
    showToast('success', 'Durum Güncellendi', `${driver.fullName} - ${statusConfig.label}`);
  };

  // Open edit modal
  const openEditModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setFormData({
      fullName: driver.fullName,
      phone: driver.phone,
      email: driver.email,
      licenseNumber: driver.licenseNumber,
      licenseClass: driver.licenseClass,
      licenseExpiry: driver.licenseExpiry.toISOString().split('T')[0],
      emergencyContactName: driver.emergencyContact.name,
      emergencyContactPhone: driver.emergencyContact.phone
    });
    setShowEditModal(true);
  };

  // Check if license is expiring soon (within 60 days)
  const isLicenseExpiringSoon = (expiryDate: Date) => {
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry > 0;
  };

  const isLicenseExpired = (expiryDate: Date) => {
    return expiryDate < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-transparent rounded-xl shadow-2xl border-2 p-4 min-w-[320px]"
              style={{
                borderColor: toast.type === 'success' ? '#10B981' : '#EF4444'
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: toast.type === 'success'
                      ? 'linear-gradient(135deg, #10B981, #059669)'
                      : 'linear-gradient(135deg, #EF4444, #DC2626)'
                  }}
                >
                  {toast.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-sm text-gray-300 mt-1">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="rounded-2xl p-6 border-2"
           style={{
             backgroundColor: '#FFFFFF',
             borderColor: '#E5E7EB',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
           }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black mb-2 neon-text-strong" style={{ color: '#000000' }}>
              Sürücü Yönetimi
            </h1>
            <p className="text-sm" style={{ color: '#666666' }}>
              {stats.total} Toplam Sürücü • {stats.onDuty} Görevde • {stats.active} Müsait
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 neon-glow"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              color: 'white',
              boxShadow: '0 0 30px rgba(37, 99, 235, 0.5)'
            }}
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Sürücü Ekle</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Sürücü', value: stats.total, icon: Users, color: '#2563EB' },
          { label: 'Görevde', value: stats.onDuty, icon: Activity, color: '#2563EB' },
          { label: 'Ortalama Puan', value: stats.avgRating, icon: Star, color: '#F59E0B', suffix: '★' },
          { label: 'Toplam Transfer', value: stats.totalTrips, icon: TrendingUp, color: '#10B981' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl p-5 border-2 transition-all hover:scale-105"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#666666' }}>{stat.label}</p>
                <p className="text-2xl font-black" style={{ color: stat.color }}>
                  {stat.value}{stat.suffix || ''}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
          <input
            type="text"
            placeholder="Sürücü ara (isim, telefon, email, ehliyet)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all focus:border-blue-500"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              color: '#000000'
            }}
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 rounded-xl border-2 transition-all focus:border-blue-500"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              color: '#000000'
            }}
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Müsait</option>
            <option value="on-duty">Görevde</option>
            <option value="off-duty">Mesai Dışı</option>
            <option value="inactive">Pasif</option>
          </select>

          <button
            onClick={() => setViewType(viewType === 'grid' ? 'table' : 'grid')}
            className="px-4 py-3 rounded-xl border-2 transition-all hover:scale-105"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              color: '#2563EB'
            }}
          >
            {viewType === 'grid' ? 'Tablo' : 'Kart'}
          </button>
        </div>
      </div>

      {/* Drivers Grid/Table View */}
      {filteredDrivers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 rounded-2xl border-2"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E7EB'
          }}
        >
          <Users className="w-16 h-16 mx-auto mb-4" style={{ color: '#666666' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>
            Sürücü Bulunamadı
          </h3>
          <p className="mb-6" style={{ color: '#666666' }}>
            Seçtiğiniz filtreye uygun sürücü bulunmamaktadır.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              color: 'white'
            }}
          >
            <Plus className="w-5 h-5" />
            <span>İlk Sürücünüzü Ekleyin</span>
          </button>
        </motion.div>
      ) : viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver, index) => {
            const statusConfig = getStatusConfig(driver.status);
            const StatusIcon = statusConfig.icon;
            const licenseExpiringSoon = isLicenseExpiringSoon(driver.licenseExpiry);
            const licenseExpired = isLicenseExpired(driver.licenseExpiry);

            return (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border-2 overflow-hidden transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Header with Photo */}
                <div className="relative h-32 bg-gradient-to-r from-blue-600 to-cyan-600">
                  <div className="absolute -bottom-12 left-6">
                    <div className="relative">
                      {driver.photo ? (
                        <img
                          src={driver.photo}
                          alt={driver.fullName}
                          className="w-24 h-24 rounded-xl border-4 border-white object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-xl border-4 border-white bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                          <Users className="w-12 h-12 text-white" />
                        </div>
                      )}
                      <div
                        className="absolute -bottom-1 -right-1 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                        style={{
                          backgroundColor: statusConfig.bg,
                          color: statusConfig.text,
                          border: `2px solid ${statusConfig.border}`
                        }}
                      >
                        <StatusIcon className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-14 px-6 pb-6">
                  {/* Name and Rating */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      {driver.fullName}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                        <span className="font-bold text-sm" style={{ color: '#000000' }}>
                          {driver.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: '#666666' }}>
                        {driver.completedTrips} transfer
                      </span>
                      <span className="text-xs font-medium" style={{ color: '#10B981' }}>
                        %{driver.onTimeRate} zamanında
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#666666' }}>
                      <Phone className="w-4 h-4" />
                      <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#666666' }}>
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{driver.email}</span>
                    </div>
                  </div>

                  {/* License Info */}
                  <div className="mb-4 pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" style={{ color: '#2563EB' }} />
                        <span className="text-sm font-medium" style={{ color: '#666666' }}>
                          Ehliyet
                        </span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded" style={{
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        color: '#2563EB'
                      }}>
                        {driver.licenseClass}
                      </span>
                    </div>
                    <p className="text-xs mb-1" style={{ color: '#666666' }}>
                      {driver.licenseNumber}
                    </p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" style={{
                        color: licenseExpired ? '#EF4444' : licenseExpiringSoon ? '#F59E0B' : '#666666'
                      }} />
                      <span className="text-xs" style={{
                        color: licenseExpired ? '#EF4444' : licenseExpiringSoon ? '#F59E0B' : '#666666'
                      }}>
                        {licenseExpired ? 'Süresi dolmuş' : `Geçerli: ${driver.licenseExpiry.toLocaleDateString('tr-TR')}`}
                      </span>
                    </div>
                    {licenseExpiringSoon && !licenseExpired && (
                      <p className="text-xs mt-1" style={{ color: '#F59E0B' }}>
                        ⚠ Yakında sona erecek
                      </p>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="mb-4">
                    <p className="text-xs font-medium mb-1" style={{ color: '#666666' }}>
                      Acil Durum İletişimi
                    </p>
                    <p className="text-xs font-bold" style={{ color: '#000000' }}>
                      {driver.emergencyContact.name}
                    </p>
                    <p className="text-xs" style={{ color: '#666666' }}>
                      {driver.emergencyContact.phone}
                    </p>
                  </div>

                  {/* Status Selector */}
                  <div className="mb-4">
                    <label className="text-xs font-medium mb-2 block" style={{ color: '#666666' }}>
                      Durum Değiştir
                    </label>
                    <select
                      value={driver.status}
                      onChange={(e) => handleStatusChange(driver, e.target.value as Driver['status'])}
                      className="w-full px-3 py-2 rounded-lg border-2 text-sm transition-all"
                      style={{
                        backgroundColor: statusConfig.bg,
                        borderColor: statusConfig.border,
                        color: statusConfig.text
                      }}
                    >
                      <option value="active">Müsait</option>
                      <option value="on-duty">Görevde</option>
                      <option value="off-duty">Mesai Dışı</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(driver)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        color: '#2563EB',
                        border: '1px solid rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDriver(driver)}
                      className="px-4 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border-2 overflow-hidden"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#E5E7EB',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
             }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#F9FAFB' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#666666' }}>
                    Sürücü
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#666666' }}>
                    İletişim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase" style={{ color: '#666666' }}>
                    Ehliyet
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase" style={{ color: '#666666' }}>
                    Performans
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase" style={{ color: '#666666' }}>
                    Durum
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase" style={{ color: '#666666' }}>
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
                {filteredDrivers.map((driver) => {
                  const statusConfig = getStatusConfig(driver.status);
                  const StatusIcon = statusConfig.icon;
                  const licenseExpired = isLicenseExpired(driver.licenseExpiry);
                  const licenseExpiringSoon = isLicenseExpiringSoon(driver.licenseExpiry);

                  return (
                    <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {driver.photo ? (
                            <img
                              src={driver.photo}
                              alt={driver.fullName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold" style={{ color: '#000000' }}>
                              {driver.fullName}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3" style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                              <span className="text-xs font-medium" style={{ color: '#000000' }}>
                                {driver.rating.toFixed(1)}
                              </span>
                              <span className="text-xs" style={{ color: '#666666' }}>
                                ({driver.completedTrips})
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-2 mb-1" style={{ color: '#666666' }}>
                            <Phone className="w-3 h-3" />
                            <span>{driver.phone}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: '#666666' }}>
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-[200px]">{driver.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-1 rounded" style={{
                              backgroundColor: 'rgba(37, 99, 235, 0.1)',
                              color: '#2563EB'
                            }}>
                              {driver.licenseClass}
                            </span>
                            <span className="text-xs" style={{ color: '#666666' }}>
                              {driver.licenseNumber}
                            </span>
                          </div>
                          <p className="text-xs" style={{
                            color: licenseExpired ? '#EF4444' : licenseExpiringSoon ? '#F59E0B' : '#666666'
                          }}>
                            {licenseExpired ? '⚠ Süresi dolmuş' : driver.licenseExpiry.toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg"
                             style={{
                               backgroundColor: 'rgba(16, 185, 129, 0.1)',
                               color: '#10B981'
                             }}>
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-bold">%{driver.onTimeRate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold"
                            style={{
                              backgroundColor: statusConfig.bg,
                              color: statusConfig.text,
                              border: `1px solid ${statusConfig.border}`
                            }}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusConfig.label}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(driver)}
                            className="p-2 rounded-lg transition-all hover:scale-110"
                            style={{
                              backgroundColor: 'rgba(37, 99, 235, 0.1)',
                              color: '#2563EB'
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDriver(driver)}
                            className="p-2 rounded-lg transition-all hover:scale-110"
                            style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              color: '#EF4444'
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-transparent rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black" style={{ color: '#000000' }}>
                  Yeni Sürücü Ekle
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddDriver} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ehliyet Numarası *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ehliyet Sınıfı *
                    </label>
                    <select
                      required
                      value={formData.licenseClass}
                      onChange={(e) => setFormData({ ...formData, licenseClass: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    >
                      <option value="D2">D2 - Turizm Taşımacılığı</option>
                      <option value="D1">D1 - Minibüs</option>
                      <option value="D">D - Otobüs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ehliyet Bitiş Tarihi *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.licenseExpiry}
                      onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Acil Durum İletişim - Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Acil Durum İletişim - Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all"
                    style={{
                      backgroundColor: 'rgba(107, 114, 128, 0.1)',
                      color: '#6B7280'
                    }}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                      color: 'white'
                    }}
                  >
                    Sürücü Ekle
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Driver Modal */}
      <AnimatePresence>
        {showEditModal && selectedDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-transparent rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black" style={{ color: '#000000' }}>
                  Sürücü Düzenle
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditDriver} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ehliyet Numarası *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ehliyet Sınıfı *
                    </label>
                    <select
                      required
                      value={formData.licenseClass}
                      onChange={(e) => setFormData({ ...formData, licenseClass: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    >
                      <option value="D2">D2 - Turizm Taşımacılığı</option>
                      <option value="D1">D1 - Minibüs</option>
                      <option value="D">D - Otobüs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Ehliyet Bitiş Tarihi *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.licenseExpiry}
                      onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Acil Durum İletişim - Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Acil Durum İletişim - Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                        color: '#000000'
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all"
                    style={{
                      backgroundColor: 'rgba(107, 114, 128, 0.1)',
                      color: '#6B7280'
                    }}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                      color: 'white'
                    }}
                  >
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
