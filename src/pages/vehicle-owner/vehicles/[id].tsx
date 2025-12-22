import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Car,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Edit,
  Trash2,
  Share2,
  Copy,
  Power,
  PowerOff,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  TrendingUp,
  Download,
  FileText,
  MessageSquare,
  Heart,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  Users,
  Fuel,
  Gauge,
  Shield,
  ArrowLeft,
  X,
  Check,
  Info
} from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Type for vehicle detail
interface VehicleDetail {
  id: string;
  brand: string;
  model: string;
  year: number;
  photos: string[];
  status: 'available' | 'rented' | 'maintenance' | 'inactive';
  rating: number;
  totalBookings: number;
  monthlyRevenue: number;
  dailyRate: number;
  currency: string;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  category: string;
  location: string;
  seats: number;
  doors: number;
  luggage: number;
  mileage: number;
  description: string;
  features: string[];
  reviews: number;
  occupancy: number;
  totalRevenue: number;
  viewCount: number;
  favoriteCount: number;
}

interface Booking {
  id: string;
  renterName: string;
  renterAvatar?: string;
  pickupDate: string;
  returnDate: string;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  totalPrice: number;
  days: number;
}

interface Review {
  id: string;
  renterName: string;
  renterAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  expiryDate?: string;
  url: string;
}

export async function getServerSideProps({ locale, params }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['vehicle-owner', 'common'])),
      vehicleId: params.id
    },
  };
}

export default function VehicleDetailPage({ vehicleId }: { vehicleId: string }) {
  const { t } = useTranslation('vehicle-owner');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock vehicle data - in real app, fetch from API based on vehicleId
  const vehicle: VehicleDetail = {
    id: vehicleId,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    photos: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=800',
      'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800'
    ],
    status: 'available',
    rating: 4.9,
    totalBookings: 87,
    monthlyRevenue: 67800,
    dailyRate: 900,
    currency: 'TRY',
    licensePlate: '34 TES 001',
    fuelType: 'Elektrik',
    transmission: 'Otomatik',
    category: 'Elektrikli',
    location: 'İstanbul, Şişli',
    seats: 5,
    doors: 4,
    luggage: 2,
    mileage: 12500,
    description: 'Tesla Model 3 Long Range - Premium elektrikli sedan. Otopilot özelliği, süperşarj erişimi ve tüm premium özellikleriyle konforlu bir sürüş deneyimi sunuyor.',
    features: [
      'Otopilot',
      'Süperşarj Erişimi',
      'Premium İç Mekan',
      'Cam Tavan',
      'Isıtmalı Koltuklar',
      'Ön ve Arka Kamera',
      'Akıllı Sürüş Asistanı',
      'Keyless Entry',
      'Premium Ses Sistemi'
    ],
    reviews: 42,
    occupancy: 92,
    totalRevenue: 246500,
    viewCount: 1247,
    favoriteCount: 89
  };

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      renterName: 'Ahmet Yılmaz',
      pickupDate: '2024-01-15',
      returnDate: '2024-01-20',
      status: 'confirmed',
      totalPrice: 4500,
      days: 5
    },
    {
      id: '2',
      renterName: 'Ayşe Demir',
      pickupDate: '2024-01-10',
      returnDate: '2024-01-12',
      status: 'completed',
      totalPrice: 1800,
      days: 2
    },
    {
      id: '3',
      renterName: 'Mehmet Kaya',
      pickupDate: '2024-01-05',
      returnDate: '2024-01-08',
      status: 'completed',
      totalPrice: 2700,
      days: 3
    }
  ];

  // Mock reviews data
  const reviewsData: Review[] = [
    {
      id: '1',
      renterName: 'Ayşe Demir',
      rating: 5,
      comment: 'Harika bir araç! Temiz, konforlu ve performansı mükemmel. Kesinlikle tekrar kiralayacağım.',
      date: '2024-01-12',
      verified: true
    },
    {
      id: '2',
      renterName: 'Mehmet Kaya',
      rating: 5,
      comment: 'Tesla deneyimi muhteşemdi. Elektrikli araç kullanmak bu kadar keyifli olabilir mi bilmiyordum.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: '3',
      renterName: 'Zeynep Arslan',
      rating: 4,
      comment: 'Çok iyi bir araç. Sadece şarj istasyonları hakkında daha fazla bilgi verilmesi güzel olurdu.',
      date: '2024-01-03',
      verified: true
    }
  ];

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      name: 'Araç Ruhsatı',
      type: 'PDF',
      uploadDate: '2023-06-15',
      expiryDate: '2024-06-15',
      url: '#'
    },
    {
      id: '2',
      name: 'Kasko Poliçesi',
      type: 'PDF',
      uploadDate: '2023-08-01',
      expiryDate: '2024-08-01',
      url: '#'
    },
    {
      id: '3',
      name: 'Trafik Sigortası',
      type: 'PDF',
      uploadDate: '2023-07-20',
      expiryDate: '2024-07-20',
      url: '#'
    },
    {
      id: '4',
      name: 'Muayene Belgesi',
      type: 'PDF',
      uploadDate: '2023-09-10',
      expiryDate: '2025-09-10',
      url: '#'
    }
  ];

  // Analytics data
  const revenueData = [
    { month: 'Tem', revenue: 18500, bookings: 12 },
    { month: 'Ağu', revenue: 24300, bookings: 16 },
    { month: 'Eyl', revenue: 21700, bookings: 14 },
    { month: 'Eki', revenue: 28900, bookings: 18 },
    { month: 'Kas', revenue: 31200, bookings: 21 },
    { month: 'Ara', revenue: 35400, bookings: 24 },
    { month: 'Oca', revenue: 42100, bookings: 28 }
  ];

  const performanceData = [
    { name: 'Görüntülenme', value: vehicle.viewCount },
    { name: 'Favoriler', value: vehicle.favoriteCount },
    { name: 'Rezervasyonlar', value: vehicle.totalBookings }
  ];

  const occupancyData = [
    { name: 'Dolu', value: vehicle.occupancy },
    { name: 'Boş', value: 100 - vehicle.occupancy }
  ];

  const COLORS = {
    primary: '#16A34A',
    secondary: '#14B8A6',
    accent: '#3B82F6',
    warning: '#F59E0B',
    danger: '#EF4444',
    success: '#10B981',
    gray: '#6B7280'
  };

  const PIE_COLORS = [COLORS.primary, '#E5E7EB'];

  const getStatusInfo = (status: VehicleDetail['status']) => {
    switch (status) {
      case 'available':
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          text: '#10B981',
          label: 'Müsait',
          icon: CheckCircle
        };
      case 'rented':
        return {
          bg: 'rgba(59, 130, 246, 0.1)',
          text: '#3B82F6',
          label: 'Kiralandı',
          icon: Clock
        };
      case 'maintenance':
        return {
          bg: 'rgba(245, 158, 11, 0.1)',
          text: '#F59E0B',
          label: 'Bakımda',
          icon: Wrench
        };
      case 'inactive':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          text: '#EF4444',
          label: 'Pasif',
          icon: PowerOff
        };
    }
  };

  const statusInfo = getStatusInfo(vehicle.status);
  const StatusIcon = statusInfo.icon;

  const tabs = [
    { id: 'details', label: 'Detaylar', icon: Info },
    { id: 'bookings', label: 'Rezervasyonlar', icon: Calendar },
    { id: 'calendar', label: 'Takvim', icon: Calendar },
    { id: 'pricing', label: 'Fiyatlandırma', icon: DollarSign },
    { id: 'reviews', label: 'Değerlendirmeler', icon: Star },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'documents', label: 'Belgeler', icon: FileText }
  ];

  const handlePhotoChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPhotoIndex(prev =>
        prev === 0 ? vehicle.photos.length - 1 : prev - 1
      );
    } else {
      setCurrentPhotoIndex(prev =>
        prev === vehicle.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
    alert('Link kopyalandı!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <button
        onClick={() => router.push('/vehicle-owner/vehicles')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
        style={{
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          color: '#16A34A'
        }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Araçlara Dön</span>
      </button>

      {/* Header */}
      <div className="rounded-2xl border-2 p-6"
           style={{
             backgroundColor: '#FFFFFF',
             borderColor: '#E5E7EB',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
           }}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Photo Gallery */}
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden" style={{ height: '400px' }}>
              <img
                src={vehicle.photos[currentPhotoIndex]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() => handlePhotoChange('prev')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full backdrop-blur-lg transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handlePhotoChange('next')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full backdrop-blur-lg transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg backdrop-blur-lg"
                   style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
                <span className="text-sm font-medium">
                  {currentPhotoIndex + 1} / {vehicle.photos.length}
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg backdrop-blur-lg flex items-center gap-2"
                   style={{
                     backgroundColor: statusInfo.bg,
                     color: statusInfo.text,
                     border: `1px solid ${statusInfo.text}30`
                   }}>
                <StatusIcon className="w-4 h-4" />
                <span className="text-sm font-bold">{statusInfo.label}</span>
              </div>
            </div>

            {/* Photo Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {vehicle.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className="flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all"
                  style={{
                    width: '80px',
                    height: '60px',
                    borderColor: index === currentPhotoIndex ? COLORS.primary : '#E5E7EB'
                  }}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-black neon-text-strong" style={{ color: '#000000' }}>
                  {vehicle.brand} {vehicle.model}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    color: COLORS.primary
                  }}
                >
                  {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3" style={{ color: '#666666' }}>
                <MapPin className="w-4 h-4" />
                <span>{vehicle.location}</span>
              </div>
              <p className="text-sm mb-4" style={{ color: '#666666' }}>
                {vehicle.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Değerlendirme', value: vehicle.rating, icon: Star, color: COLORS.warning },
                { label: 'Kiralama', value: vehicle.totalBookings, icon: Calendar, color: COLORS.primary },
                { label: 'Doluluk', value: `${vehicle.occupancy}%`, icon: TrendingUp, color: COLORS.secondary },
                { label: 'Görüntülenme', value: vehicle.viewCount, icon: Eye, color: COLORS.accent }
              ].map((stat, index) => (
                <div key={index} className="rounded-xl p-4 text-center border-2"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg"
                         style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs mb-1" style={{ color: '#666666' }}>{stat.label}</p>
                  <p className="text-lg font-black" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Monthly Revenue */}
            <div className="rounded-xl p-4 border-2"
                 style={{
                   backgroundColor: 'rgba(22, 163, 74, 0.05)',
                   borderColor: COLORS.primary
                 }}>
              <p className="text-sm mb-1" style={{ color: '#666666' }}>Bu Ay Gelir</p>
              <p className="text-3xl font-black" style={{ color: COLORS.primary }}>
                ₺{vehicle.monthlyRevenue.toLocaleString('tr-TR')}
              </p>
              <p className="text-xs mt-2" style={{ color: '#666666' }}>
                Toplam Gelir: ₺{vehicle.totalRevenue.toLocaleString('tr-TR')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 neon-glow"
                style={{
                  background: 'linear-gradient(135deg, #16A34A, #14B8A6)',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(22, 163, 74, 0.3)'
                }}
              >
                <Edit className="w-5 h-5" />
                <span>Düzenle</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: COLORS.accent,
                  border: `2px solid ${COLORS.accent}30`
                }}
              >
                <Share2 className="w-5 h-5" />
                <span>Paylaş</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  color: COLORS.primary,
                  border: `2px solid ${COLORS.primary}30`
                }}
              >
                <Copy className="w-5 h-5" />
                <span>Kopyala</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: COLORS.danger,
                  border: `2px solid ${COLORS.danger}30`
                }}
              >
                <Trash2 className="w-5 h-5" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border-2 overflow-hidden"
           style={{
             backgroundColor: '#FFFFFF',
             borderColor: '#E5E7EB',
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
           }}>
        {/* Tab Headers */}
        <div className="flex overflow-x-auto border-b-2" style={{ borderColor: '#E5E7EB' }}>
          {tabs.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-4 font-bold whitespace-nowrap transition-all"
                style={{
                  color: activeTab === tab.id ? COLORS.primary : '#666666',
                  borderBottom: activeTab === tab.id ? `3px solid ${COLORS.primary}` : 'none',
                  backgroundColor: activeTab === tab.id ? 'rgba(22, 163, 74, 0.05)' : 'transparent'
                }}
              >
                <TabIcon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specifications */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                    Teknik Özellikler
                  </h3>
                  {[
                    { label: 'Marka', value: vehicle.brand, icon: Car },
                    { label: 'Model', value: vehicle.model, icon: Car },
                    { label: 'Yıl', value: vehicle.year, icon: Calendar },
                    { label: 'Plaka', value: vehicle.licensePlate, icon: FileText },
                    { label: 'Yakıt Türü', value: vehicle.fuelType, icon: Fuel },
                    { label: 'Vites', value: vehicle.transmission, icon: Settings },
                    { label: 'Koltuk', value: vehicle.seats, icon: Users },
                    { label: 'Kilometre', value: `${vehicle.mileage.toLocaleString('tr-TR')} km`, icon: Gauge }
                  ].map((spec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg"
                         style={{ backgroundColor: '#F9FAFB' }}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg"
                             style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)', color: COLORS.primary }}>
                          <spec.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium" style={{ color: '#666666' }}>{spec.label}</span>
                      </div>
                      <span className="font-bold" style={{ color: '#000000' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                    Özellikler
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg"
                           style={{ backgroundColor: '#F9FAFB' }}>
                        <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.primary }} />
                        <span className="font-medium" style={{ color: '#000000' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: '#000000' }}>
                  Rezervasyonlar ({bookings.length})
                </h3>
                <select
                  className="px-4 py-2 rounded-lg border-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E7EB',
                    color: '#000000'
                  }}
                >
                  <option>Tümü</option>
                  <option>Onaylı</option>
                  <option>Devam Ediyor</option>
                  <option>Tamamlandı</option>
                  <option>İptal</option>
                </select>
              </div>

              {bookings.map(booking => (
                <div key={booking.id} className="rounded-xl p-4 border-2 transition-all hover:scale-[1.01]"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                           style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                        {booking.renterName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#000000' }}>
                          {booking.renterName}
                        </h4>
                        <div className="flex items-center gap-4 text-sm mb-2" style={{ color: '#666666' }}>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.pickupDate}</span>
                          </div>
                          <span>→</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.returnDate}</span>
                          </div>
                          <span>({booking.days} gün)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold"
                                style={{
                                  backgroundColor: booking.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                  color: booking.status === 'completed' ? COLORS.success : COLORS.accent
                                }}>
                            {booking.status === 'completed' ? 'Tamamlandı' : 'Onaylı'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black mb-1" style={{ color: COLORS.primary }}>
                        ₺{booking.totalPrice.toLocaleString('tr-TR')}
                      </p>
                      <button className="px-4 py-1 rounded-lg text-sm font-medium transition-all hover:scale-105"
                              style={{
                                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                color: COLORS.primary
                              }}>
                        Detay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                Müsaitlik Takvimi
              </h3>
              <div className="rounded-xl p-8 text-center border-2"
                   style={{
                     backgroundColor: '#F9FAFB',
                     borderColor: '#E5E7EB'
                   }}>
                <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: '#666666' }} />
                <p className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                  Takvim Görünümü
                </p>
                <p style={{ color: '#666666' }}>
                  Burada araç müsaitlik takvimi görüntülenecek
                </p>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                Fiyatlandırma
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Rate */}
                <div className="rounded-xl p-6 border-2"
                     style={{
                       backgroundColor: 'rgba(22, 163, 74, 0.05)',
                       borderColor: COLORS.primary
                     }}>
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6" style={{ color: COLORS.primary }} />
                    <h4 className="font-bold" style={{ color: '#000000' }}>Günlük Fiyat</h4>
                  </div>
                  <p className="text-4xl font-black mb-2" style={{ color: COLORS.primary }}>
                    ₺{vehicle.dailyRate}
                  </p>
                  <p className="text-sm" style={{ color: '#666666' }}>
                    Ana kiralama fiyatı
                  </p>
                </div>

                {/* Discounts */}
                <div className="rounded-xl p-6 border-2"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6" style={{ color: COLORS.secondary }} />
                    <h4 className="font-bold" style={{ color: '#000000' }}>İndirimler</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#666666' }}>Haftalık (7+ gün)</span>
                      <span className="font-bold" style={{ color: COLORS.primary }}>%10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#666666' }}>Aylık (30+ gün)</span>
                      <span className="font-bold" style={{ color: COLORS.primary }}>%20</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#666666' }}>Erken Rezervasyon</span>
                      <span className="font-bold" style={{ color: COLORS.primary }}>%5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seasonal Pricing */}
              <div className="rounded-xl p-6 border-2"
                   style={{
                     backgroundColor: '#FFFFFF',
                     borderColor: '#E5E7EB'
                   }}>
                <h4 className="font-bold mb-4" style={{ color: '#000000' }}>
                  Sezonluk Fiyatlandırma
                </h4>
                <div className="space-y-3">
                  {[
                    { season: 'Yaz Sezonu', dates: 'Haziran - Ağustos', price: 950 },
                    { season: 'Bayram Dönemi', dates: 'Ramazan ve Kurban Bayramı', price: 1100 },
                    { season: 'Normal Sezon', dates: 'Diğer zamanlar', price: 900 }
                  ].map((pricing, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg"
                         style={{ backgroundColor: '#F9FAFB' }}>
                      <div>
                        <p className="font-bold mb-1" style={{ color: '#000000' }}>{pricing.season}</p>
                        <p className="text-sm" style={{ color: '#666666' }}>{pricing.dates}</p>
                      </div>
                      <p className="text-xl font-black" style={{ color: COLORS.primary }}>
                        ₺{pricing.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: '#000000' }}>
                  Değerlendirmeler ({reviewsData.length})
                </h3>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6" style={{ color: COLORS.warning }} fill={COLORS.warning} />
                  <span className="text-2xl font-black" style={{ color: '#000000' }}>
                    {vehicle.rating}
                  </span>
                </div>
              </div>

              {reviewsData.map(review => (
                <div key={review.id} className="rounded-xl p-4 border-2"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                         style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                      {review.renterName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold" style={{ color: '#000000' }}>
                              {review.renterName}
                            </h4>
                            {review.verified && (
                              <CheckCircle className="w-4 h-4" style={{ color: COLORS.primary }} />
                            )}
                          </div>
                          <p className="text-xs" style={{ color: '#666666' }}>{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              style={{ color: i < review.rating ? COLORS.warning : '#E5E7EB' }}
                              fill={i < review.rating ? COLORS.warning : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <p style={{ color: '#666666' }}>{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                Performans Analizi
              </h3>

              {/* Revenue Chart */}
              <div className="rounded-xl p-6 border-2"
                   style={{
                     backgroundColor: '#FFFFFF',
                     borderColor: '#E5E7EB'
                   }}>
                <h4 className="font-bold mb-4" style={{ color: '#000000' }}>
                  Gelir Trendi
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: `2px solid ${COLORS.primary}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={COLORS.primary}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance Bar Chart */}
                <div className="rounded-xl p-6 border-2"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <h4 className="font-bold mb-4" style={{ color: '#000000' }}>
                    Performans Metrikleri
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#666666" />
                      <YAxis stroke="#666666" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: `2px solid ${COLORS.primary}`,
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="value" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Occupancy Pie Chart */}
                <div className="rounded-xl p-6 border-2"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <h4 className="font-bold mb-4" style={{ color: '#000000' }}>
                    Doluluk Oranı
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={occupancyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {occupancyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: '#000000' }}>
                  Belgeler ({documents.length})
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #16A34A, #14B8A6)',
                          color: 'white'
                        }}>
                  <FileText className="w-5 h-5" />
                  <span>Yeni Belge Ekle</span>
                </button>
              </div>

              {documents.map(doc => (
                <div key={doc.id} className="rounded-xl p-4 border-2 transition-all hover:scale-[1.01]"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg"
                           style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)', color: COLORS.primary }}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#000000' }}>
                          {doc.name}
                        </h4>
                        <div className="flex items-center gap-4 text-sm" style={{ color: '#666666' }}>
                          <span>Yükleme: {doc.uploadDate}</span>
                          {doc.expiryDate && (
                            <>
                              <span>•</span>
                              <span>Son Geçerlilik: {doc.expiryDate}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{doc.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg transition-all hover:scale-110"
                              style={{
                                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                color: COLORS.primary
                              }}>
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg transition-all hover:scale-110"
                              style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: COLORS.danger
                              }}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="rounded-2xl p-6 max-w-md w-full"
               style={{
                 backgroundColor: '#FFFFFF',
                 boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
               }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#000000' }}>
                Aracı Paylaş
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: COLORS.danger
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#666666' }}>
                  Araç Linki
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`https://ailydian.com/vehicles/${vehicleId}`}
                    readOnly
                    className="flex-1 px-4 py-2 rounded-lg border-2"
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderColor: '#E5E7EB',
                      color: '#000000'
                    }}
                  />
                  <button
                    onClick={() => copyToClipboard(`https://ailydian.com/vehicles/${vehicleId}`)}
                    className="px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #16A34A, #14B8A6)',
                      color: 'white'
                    }}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['WhatsApp', 'Facebook', 'Twitter', 'E-posta'].map(platform => (
                  <button
                    key={platform}
                    className="px-4 py-3 rounded-lg font-medium transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(22, 163, 74, 0.1)',
                      color: COLORS.primary,
                      border: `2px solid ${COLORS.primary}30`
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
