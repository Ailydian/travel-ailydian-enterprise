import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Star,
  Image as ImageIcon,
  Upload,
  X,
  Check,
  AlertCircle,
  Home,
  Hotel,
  Building,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Utensils,
  Droplets,
  ShieldCheck,
  Search,
  Filter,
  MoreVertical,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp,
  Save,
  Power,
  PowerOff,
  CheckCircle,
  Clock,
  XCircle,
  BedDouble,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SimplifiedHeader from '../../../components/layout/SimplifiedHeader';
import { useToast } from '../../../context/ToastContext';
import { useCart } from '../../../context/CartContext';

// Types
interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'villa' | 'hotel' | 'hostel' | 'cottage';
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  pricing: {
    basePrice: number;
    weekendPrice: number;
    cleaningFee: number;
    currency: string;
    discounts: {
      weekly?: number;
      monthly?: number;
    };
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  houseRules: string[];
  images: string[];
  availability: {
    startDate: string;
    endDate: string;
    blockedDates: string[];
  };
  isActive: boolean;
  isVerified: boolean;
  stats: {
    views: number;
    bookings: number;
    rating: number;
    reviews: number;
    earnings: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface BookingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  guestName: string;
  guestEmail: string;
  guestAvatar?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  message?: string;
  createdAt: string;
}

const PropertyOwnerDashboard: React.FC = () => {
  const toast = useToast();
  const { state: cartState } = useCart();

  // State
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'bookings' | 'earnings' | 'calendar'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment' as Property['type'],
    address: '',
    city: '',
    country: '',
    basePrice: 0,
    weekendPrice: 0,
    cleaningFee: 0,
    currency: 'TRY',
    weeklyDiscount: 0,
    monthlyDiscount: 0,
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [] as string[],
    houseRules: [] as string[],
    images: [] as string[],
  });

  // Sample data
  useEffect(() => {
    loadSampleData();
  }, []);

  const loadSampleData = () => {
    const sampleProperties: Property[] = [
      {
        id: '1',
        title: 'Lüks Deniz Manzaralı Villa',
        description: 'Muhteşem deniz manzaralı, 4 yatak odalı modern villa. Özel havuz ve bahçe ile.',
        type: 'villa',
        location: {
          address: 'Kalkan Mah. Deniz Sok. No: 15',
          city: 'Kaş',
          country: 'Türkiye',
          coordinates: { lat: 36.2019, lng: 29.6405 }
        },
        pricing: {
          basePrice: 3500,
          weekendPrice: 4200,
          cleaningFee: 500,
          currency: 'TRY',
          discounts: {
            weekly: 10,
            monthly: 20
          }
        },
        capacity: {
          guests: 8,
          bedrooms: 4,
          beds: 5,
          bathrooms: 3
        },
        amenities: ['wifi', 'pool', 'parking', 'air_conditioning', 'kitchen', 'tv', 'washing_machine', 'sea_view'],
        houseRules: ['No smoking', 'No pets', 'No parties'],
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90',
          'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=800&q=90',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=90'
        ],
        availability: {
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          blockedDates: []
        },
        isActive: true,
        isVerified: true,
        stats: {
          views: 1245,
          bookings: 23,
          rating: 4.8,
          reviews: 18,
          earnings: 85000
        },
        createdAt: '2023-06-15',
        updatedAt: '2024-01-10'
      },
      {
        id: '2',
        title: 'Modern Şehir Merkezi Apart',
        description: 'İstanbul Taksim\'de merkezi konumda, 2+1 modern apart daire.',
        type: 'apartment',
        location: {
          address: 'Taksim Mah. İstiklal Cad. No: 45/12',
          city: 'İstanbul',
          country: 'Türkiye',
          coordinates: { lat: 41.0369, lng: 28.9850 }
        },
        pricing: {
          basePrice: 1200,
          weekendPrice: 1500,
          cleaningFee: 200,
          currency: 'TRY',
          discounts: {
            weekly: 15,
            monthly: 25
          }
        },
        capacity: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathrooms: 1
        },
        amenities: ['wifi', 'air_conditioning', 'kitchen', 'tv', 'elevator', 'city_view'],
        houseRules: ['No smoking', 'Quiet hours after 10 PM'],
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=90',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=90'
        ],
        availability: {
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          blockedDates: []
        },
        isActive: true,
        isVerified: true,
        stats: {
          views: 856,
          bookings: 35,
          rating: 4.6,
          reviews: 28,
          earnings: 42000
        },
        createdAt: '2023-08-20',
        updatedAt: '2024-01-08'
      },
      {
        id: '3',
        title: 'Butik Otel Odası - Balat',
        description: 'Tarihi Balat\'ta restore edilmiş butik otelde şık oda.',
        type: 'hotel',
        location: {
          address: 'Balat Mah. Vodina Cad. No: 28',
          city: 'İstanbul',
          country: 'Türkiye',
          coordinates: { lat: 41.0277, lng: 28.9490 }
        },
        pricing: {
          basePrice: 800,
          weekendPrice: 950,
          cleaningFee: 0,
          currency: 'TRY',
          discounts: {}
        },
        capacity: {
          guests: 2,
          bedrooms: 1,
          beds: 1,
          bathrooms: 1
        },
        amenities: ['wifi', 'air_conditioning', 'breakfast', 'concierge', 'room_service'],
        houseRules: ['Check-in: 14:00', 'Check-out: 11:00'],
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90'
        ],
        availability: {
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          blockedDates: []
        },
        isActive: false,
        isVerified: true,
        stats: {
          views: 432,
          bookings: 12,
          rating: 4.9,
          reviews: 9,
          earnings: 18000
        },
        createdAt: '2023-11-05',
        updatedAt: '2024-01-12'
      }
    ];

    const sampleBookings: BookingRequest[] = [
      {
        id: 'b1',
        propertyId: '1',
        propertyTitle: 'Lüks Deniz Manzaralı Villa',
        guestName: 'Ayşe Demir',
        guestEmail: 'ayse@example.com',
        checkIn: '2024-02-15',
        checkOut: '2024-02-22',
        guests: 6,
        totalPrice: 28000,
        status: 'pending',
        message: 'Merhaba, ailecek tatil için gelmek istiyoruz. Özel isteklerimiz var, görüşebilir miyiz?',
        createdAt: '2024-01-15T10:30:00'
      },
      {
        id: 'b2',
        propertyId: '2',
        propertyTitle: 'Modern Şehir Merkezi Apart',
        guestName: 'Mehmet Yılmaz',
        guestEmail: 'mehmet@example.com',
        checkIn: '2024-02-10',
        checkOut: '2024-02-13',
        guests: 2,
        totalPrice: 4500,
        status: 'approved',
        message: 'İş gezisi için kalacağım.',
        createdAt: '2024-01-14T15:20:00'
      },
      {
        id: 'b3',
        propertyId: '1',
        propertyTitle: 'Lüks Deniz Manzaralı Villa',
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah@example.com',
        checkIn: '2024-03-01',
        checkOut: '2024-03-08',
        guests: 4,
        totalPrice: 25000,
        status: 'pending',
        createdAt: '2024-01-16T09:15:00'
      }
    ];

    setProperties(sampleProperties);
    setBookingRequests(sampleBookings);
  };

  // Available amenities
  const availableAmenities = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'parking', label: 'Otopark', icon: Car },
    { id: 'pool', label: 'Havuz', icon: Droplets },
    { id: 'air_conditioning', label: 'Klima', icon: Wind },
    { id: 'kitchen', label: 'Mutfak', icon: Utensils },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'washing_machine', label: 'Çamaşır Makinesi', icon: Settings },
    { id: 'breakfast', label: 'Kahvaltı', icon: Coffee },
    { id: 'sea_view', label: 'Deniz Manzarası', icon: Eye },
    { id: 'city_view', label: 'Şehir Manzarası', icon: Building },
    { id: 'elevator', label: 'Asansör', icon: Building2 },
    { id: 'room_service', label: 'Oda Servisi', icon: Users },
    { id: 'concierge', label: 'Concierge', icon: ShieldCheck }
  ];

  // Property types
  const propertyTypes = [
    { id: 'apartment', label: 'Apart Daire', icon: Building },
    { id: 'house', label: 'Ev', icon: Home },
    { id: 'villa', label: 'Villa', icon: Building2 },
    { id: 'hotel', label: 'Otel Odası', icon: Hotel },
    { id: 'hostel', label: 'Hostel', icon: Building },
    { id: 'cottage', label: 'Bungalov', icon: Home }
  ];

  // Handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 10) {
      toast.showWarning('Maksimum 10 fotoğraf yükleyebilirsiniz');
      return;
    }

    setSelectedImages(prev => [...prev, ...files]);

    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveProperty = async () => {
    // Validation
    if (!formData.title || !formData.description) {
      toast.showError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (previewImages.length === 0) {
      toast.showError('En az 1 fotoğraf yüklemelisiniz');
      return;
    }

    try {
      const newProperty: Property = {
        id: editingProperty?.id || `prop-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          coordinates: { lat: 0, lng: 0 }
        },
        pricing: {
          basePrice: formData.basePrice,
          weekendPrice: formData.weekendPrice,
          cleaningFee: formData.cleaningFee,
          currency: formData.currency,
          discounts: {
            weekly: formData.weeklyDiscount,
            monthly: formData.monthlyDiscount
          }
        },
        capacity: {
          guests: formData.guests,
          bedrooms: formData.bedrooms,
          beds: formData.beds,
          bathrooms: formData.bathrooms
        },
        amenities: formData.amenities,
        houseRules: formData.houseRules,
        images: previewImages,
        availability: {
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          blockedDates: []
        },
        isActive: true,
        isVerified: false,
        stats: editingProperty?.stats || {
          views: 0,
          bookings: 0,
          rating: 0,
          reviews: 0,
          earnings: 0
        },
        createdAt: editingProperty?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingProperty) {
        setProperties(prev => prev.map(p => p.id === editingProperty.id ? newProperty : p));
        toast.showSuccess('İlan Güncellendi', 'İlanınız başarıyla güncellendi');
      } else {
        setProperties(prev => [...prev, newProperty]);
        toast.showSuccess('İlan Oluşturuldu', 'Yeni ilanınız başarıyla oluşturuldu ve onay bekliyor');
      }

      resetForm();
      setShowAddProperty(false);
      setEditingProperty(null);
    } catch (error) {
      toast.showError('Bir hata oluştu', 'Lütfen tekrar deneyin');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'apartment',
      address: '',
      city: '',
      country: '',
      basePrice: 0,
      weekendPrice: 0,
      cleaningFee: 0,
      currency: 'TRY',
      weeklyDiscount: 0,
      monthlyDiscount: 0,
      guests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      amenities: [],
      houseRules: [],
      images: []
    });
    setSelectedImages([]);
    setPreviewImages([]);
    setCurrentStep(1);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      type: property.type,
      address: property.location.address,
      city: property.location.city,
      country: property.location.country,
      basePrice: property.pricing.basePrice,
      weekendPrice: property.pricing.weekendPrice,
      cleaningFee: property.pricing.cleaningFee,
      currency: property.pricing.currency,
      weeklyDiscount: property.pricing.discounts.weekly || 0,
      monthlyDiscount: property.pricing.discounts.monthly || 0,
      guests: property.capacity.guests,
      bedrooms: property.capacity.bedrooms,
      beds: property.capacity.beds,
      bathrooms: property.capacity.bathrooms,
      amenities: property.amenities,
      houseRules: property.houseRules,
      images: property.images
    });
    setPreviewImages(property.images);
    setShowAddProperty(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      toast.showSuccess('İlan Silindi', 'İlanınız başarıyla silindi');
    }
  };

  const handleToggleActive = (propertyId: string) => {
    setProperties(prev => prev.map(p =>
      p.id === propertyId ? { ...p, isActive: !p.isActive } : p
    ));
    const property = properties.find(p => p.id === propertyId);
    toast.showSuccess(
      property?.isActive ? 'İlan Pasif Edildi' : 'İlan Aktif Edildi',
      property?.isActive ? 'İlanınız artık görünmeyecek' : 'İlanınız artık görünür durumda'
    );
  };

  const handleBookingResponse = (bookingId: string, status: 'approved' | 'rejected') => {
    setBookingRequests(prev => prev.map(b =>
      b.id === bookingId ? { ...b, status } : b
    ));
    toast.showSuccess(
      status === 'approved' ? 'Rezervasyon Onaylandı' : 'Rezervasyon Reddedildi',
      status === 'approved' ? 'Misafirinize bildirim gönderildi' : 'Misafiriniz bilgilendirildi'
    );
  };

  // Filtered properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && property.isActive) ||
      (filterStatus === 'inactive' && !property.isActive);
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate total stats
  const totalStats = {
    totalEarnings: properties.reduce((sum, p) => sum + p.stats.earnings, 0),
    totalBookings: properties.reduce((sum, p) => sum + p.stats.bookings, 0),
    totalViews: properties.reduce((sum, p) => sum + p.stats.views, 0),
    averageRating: properties.length > 0
      ? properties.reduce((sum, p) => sum + p.stats.rating, 0) / properties.length
      : 0,
    activeProperties: properties.filter(p => p.isActive).length,
    pendingRequests: bookingRequests.filter(b => b.status === 'pending').length
  };

  return (
    <>
      <Head>
        <title>Property Owner Dashboard | LyDian Travel</title>
        <meta name="description" content="Manage your property listings, bookings, and earnings" />
      </Head>

      <SimplifiedHeader />

      <main className="min-h-screen py-8" style={{ backgroundColor: 'var(--bg-0)', color: 'var(--tx-1)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold neon-text-strong mb-2"
                  style={{ color: 'var(--tx-1)', textShadow: '0 0 15px var(--ac-1)' }}
                >
                  Mülk Yönetim Paneli
                </h1>
                <p style={{ color: 'var(--tx-2)' }}>
                  İlanlarınızı yönetin, rezervasyonları takip edin ve kazançlarınızı görüntüleyin
                </p>
              </div>
              <button
                onClick={() => setShowAddProperty(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(255, 33, 77, 0.3)'
                }}
              >
                <Plus className="w-5 h-5" />
                Yeni İlan Ekle
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: 'Toplam Kazanç',
                  value: `₺${totalStats.totalEarnings.toLocaleString('tr-TR')}`,
                  icon: DollarSign,
                  color: 'var(--ac-1)',
                  trend: '+12%'
                },
                {
                  label: 'Toplam Rezervasyon',
                  value: totalStats.totalBookings,
                  icon: Calendar,
                  color: 'var(--ac-2)',
                  trend: '+8%'
                },
                {
                  label: 'Toplam Görüntülenme',
                  value: totalStats.totalViews.toLocaleString('tr-TR'),
                  icon: Eye,
                  color: '#10B981',
                  trend: '+23%'
                },
                {
                  label: 'Ortalama Puan',
                  value: totalStats.averageRating.toFixed(1),
                  icon: Star,
                  color: '#F59E0B',
                  trend: '+0.2'
                }
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl p-6 border-2 card-hover"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      borderColor: stat.color,
                      boxShadow: `0 0 15px ${stat.color}30`
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${stat.color}20`,
                          borderColor: stat.color
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <span className="text-sm font-medium px-2 py-1 rounded-lg"
                        style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                      >
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-2xl font-bold neon-text-strong" style={{ color: 'var(--tx-1)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--tx-2)' }}>{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-b mb-8"
            style={{ borderColor: 'rgba(255, 33, 77, 0.3)' }}
          >
            <div className="flex flex-wrap gap-2 -mb-px">
              {[
                { id: 'overview', label: 'Genel Bakış', icon: TrendingUp },
                { id: 'properties', label: 'İlanlarım', icon: Building2, badge: properties.length },
                { id: 'bookings', label: 'Rezervasyonlar', icon: Calendar, badge: totalStats.pendingRequests },
                { id: 'earnings', label: 'Kazançlar', icon: DollarSign },
                { id: 'calendar', label: 'Takvim', icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-all ${activeTab === tab.id ? 'neon-glow' : ''
                      }`}
                    style={{
                      borderColor: activeTab === tab.id ? 'var(--ac-1)' : 'transparent',
                      color: activeTab === tab.id ? 'var(--ac-1)' : 'var(--tx-2)',
                      boxShadow: activeTab === tab.id ? '0 0 10px var(--ac-1)' : 'none'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: 'var(--ac-1)', color: 'white' }}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl p-6 border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: 'var(--ac-1)',
                        boxShadow: '0 0 15px rgba(255, 33, 77, 0.2)'
                      }}
                    >
                      <h3 className="text-xl font-bold neon-text-strong mb-4" style={{ color: 'var(--tx-1)' }}>
                        Son 7 Gün Performansı
                      </h3>
                      <div className="h-64 flex items-center justify-center"
                        style={{ color: 'var(--tx-3)' }}
                      >
                        <BarChart3 className="w-16 h-16 mb-4" />
                        <p>Grafik entegrasyonu için hazır</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl p-6 border-2"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      borderColor: 'var(--ac-2)',
                      boxShadow: '0 0 15px rgba(255, 106, 69, 0.2)'
                    }}
                  >
                    <h3 className="text-xl font-bold neon-text-strong mb-4" style={{ color: 'var(--tx-1)' }}>
                      Hızlı İstatistikler
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--tx-2)' }}>Aktif İlanlar</span>
                        <span className="font-bold" style={{ color: 'var(--ac-1)' }}>
                          {totalStats.activeProperties}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--tx-2)' }}>Bekleyen Talepler</span>
                        <span className="font-bold" style={{ color: 'var(--ac-2)' }}>
                          {totalStats.pendingRequests}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--tx-2)' }}>Bu Ay Kazanç</span>
                        <span className="font-bold" style={{ color: '#10B981' }}>
                          ₺{(totalStats.totalEarnings * 0.3).toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--tx-2)' }}>Doluluk Oranı</span>
                        <span className="font-bold" style={{ color: '#F59E0B' }}>
                          78%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="rounded-2xl p-6 border-2"
                  style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: 'var(--ac-1)',
                    boxShadow: '0 0 15px rgba(255, 33, 77, 0.1)'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold neon-text-strong" style={{ color: 'var(--tx-1)' }}>
                      Son Rezervasyon Talepleri
                    </h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-sm font-medium"
                      style={{ color: 'var(--ac-1)' }}
                    >
                      Tümünü Gör →
                    </button>
                  </div>
                  <div className="space-y-4">
                    {bookingRequests.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl border"
                        style={{
                          backgroundColor: 'var(--bg-0)',
                          borderColor: 'rgba(255, 33, 77, 0.2)'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--ac-1)', color: 'white' }}
                          >
                            {booking.guestName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold" style={{ color: 'var(--tx-1)' }}>
                              {booking.guestName}
                            </h4>
                            <p className="text-sm" style={{ color: 'var(--tx-2)' }}>
                              {booking.propertyTitle}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--tx-3)' }}>
                              {new Date(booking.checkIn).toLocaleDateString('tr-TR')} - {new Date(booking.checkOut).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg mb-2" style={{ color: 'var(--ac-1)' }}>
                            ₺{booking.totalPrice.toLocaleString('tr-TR')}
                          </div>
                          {booking.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleBookingResponse(booking.id, 'approved')}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105"
                                style={{ backgroundColor: '#10B981', color: 'white' }}
                              >
                                Onayla
                              </button>
                              <button
                                onClick={() => handleBookingResponse(booking.id, 'rejected')}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105"
                                style={{ backgroundColor: '#EF4444', color: 'white' }}
                              >
                                Reddet
                              </button>
                            </div>
                          )}
                          {booking.status === 'approved' && (
                            <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
                              style={{ backgroundColor: '#10B98120', color: '#10B981' }}
                            >
                              Onaylandı
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'properties' && (
              <motion.div
                key="properties"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        style={{ color: 'var(--tx-3)' }}
                      />
                      <input
                        type="text"
                        placeholder="İlan ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all"
                        style={{
                          backgroundColor: 'var(--bg-1)',
                          color: 'var(--tx-1)',
                          borderColor: 'var(--ac-2)'
                        }}
                      />
                    </div>
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 transition-all"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      color: 'var(--tx-1)',
                      borderColor: 'var(--ac-2)'
                    }}
                  >
                    <option value="all">Tüm Tipler</option>
                    {propertyTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 transition-all"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      color: 'var(--tx-1)',
                      borderColor: 'var(--ac-2)'
                    }}
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => {
                    const TypeIcon = propertyTypes.find(t => t.id === property.type)?.icon || Building;
                    return (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl overflow-hidden border-2 card-hover"
                        style={{
                          backgroundColor: 'var(--bg-1)',
                          borderColor: property.isActive ? 'var(--ac-1)' : 'var(--tx-3)',
                          boxShadow: property.isActive ? '0 0 15px rgba(255, 33, 77, 0.2)' : 'none',
                          opacity: property.isActive ? 1 : 0.7
                        }}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm"
                              style={{
                                backgroundColor: property.isActive ? '#10B98190' : '#6B728090',
                                color: 'white'
                              }}
                            >
                              {property.isActive ? 'Aktif' : 'Pasif'}
                            </span>
                            {property.isVerified && (
                              <span className="px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm"
                                style={{ backgroundColor: '#3B82F690', color: 'white' }}
                              >
                                Onaylı
                              </span>
                            )}
                          </div>
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              onClick={() => handleToggleActive(property.id)}
                              className="p-2 rounded-lg backdrop-blur-sm transition-all hover:scale-110"
                              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                            >
                              {property.isActive ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="w-5 h-5" style={{ color: 'var(--ac-1)' }} />
                              <h3 className="font-bold neon-text-strong line-clamp-1"
                                style={{ color: 'var(--tx-1)' }}
                              >
                                {property.title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--tx-2)' }}>
                            <MapPin className="w-4 h-4" />
                            {property.location.city}, {property.location.country}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" style={{ color: 'var(--tx-3)' }} />
                              <span style={{ color: 'var(--tx-2)' }}>{property.stats.views} görüntülenme</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" style={{ color: 'var(--tx-3)' }} />
                              <span style={{ color: 'var(--tx-2)' }}>{property.stats.bookings} rezervasyon</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-current" style={{ color: '#F59E0B' }} />
                              <span style={{ color: 'var(--tx-2)' }}>
                                {property.stats.rating.toFixed(1)} ({property.stats.reviews})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" style={{ color: 'var(--tx-3)' }} />
                              <span style={{ color: 'var(--tx-2)' }}>
                                ₺{property.stats.earnings.toLocaleString('tr-TR')}
                              </span>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-2xl font-bold" style={{ color: 'var(--ac-1)' }}>
                              ₺{property.pricing.basePrice.toLocaleString('tr-TR')}
                            </span>
                            <span className="text-sm" style={{ color: 'var(--tx-2)' }}>/gece</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProperty(property)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                              style={{
                                backgroundColor: 'var(--ac-1)',
                                color: 'white'
                              }}
                            >
                              <Edit3 className="w-4 h-4" />
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="px-4 py-2 rounded-lg font-medium border-2 transition-all hover:scale-105"
                              style={{
                                borderColor: '#EF4444',
                                color: '#EF4444',
                                backgroundColor: 'transparent'
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

                {filteredProperties.length === 0 && (
                  <div className="text-center py-16">
                    <Building2 className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--tx-3)' }} />
                    <h3 className="text-xl font-bold neon-text-strong mb-2" style={{ color: 'var(--tx-1)' }}>
                      İlan Bulunamadı
                    </h3>
                    <p className="mb-6" style={{ color: 'var(--tx-2)' }}>
                      {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                        ? 'Arama kriterlerinize uygun ilan bulunamadı'
                        : 'Henüz ilan eklememişsiniz'
                      }
                    </p>
                    <button
                      onClick={() => setShowAddProperty(true)}
                      className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                        color: 'white'
                      }}
                    >
                      İlk İlanınızı Ekleyin
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {bookingRequests.map((booking) => (
                  <div key={booking.id} className="rounded-2xl p-6 border-2"
                    style={{
                      backgroundColor: 'var(--bg-1)',
                      borderColor: booking.status === 'pending' ? 'var(--ac-1)' : 'var(--tx-3)',
                      boxShadow: booking.status === 'pending' ? '0 0 15px rgba(255, 33, 77, 0.2)' : 'none'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: 'var(--ac-1)', color: 'white' }}
                        >
                          <span className="text-2xl font-bold">{booking.guestName.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold neon-text-strong" style={{ color: 'var(--tx-1)' }}>
                              {booking.guestName}
                            </h3>
                            {booking.status === 'pending' && (
                              <span className="px-3 py-1 rounded-lg text-xs font-medium"
                                style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}
                              >
                                <Clock className="w-3 h-3 inline mr-1" />
                                Beklemede
                              </span>
                            )}
                            {booking.status === 'approved' && (
                              <span className="px-3 py-1 rounded-lg text-xs font-medium"
                                style={{ backgroundColor: '#10B98120', color: '#10B981' }}
                              >
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                Onaylandı
                              </span>
                            )}
                            {booking.status === 'rejected' && (
                              <span className="px-3 py-1 rounded-lg text-xs font-medium"
                                style={{ backgroundColor: '#EF444420', color: '#EF4444' }}
                              >
                                <XCircle className="w-3 h-3 inline mr-1" />
                                Reddedildi
                              </span>
                            )}
                          </div>
                          <p className="text-sm mb-2" style={{ color: 'var(--tx-2)' }}>
                            {booking.guestEmail}
                          </p>
                          <p className="font-medium mb-3" style={{ color: 'var(--ac-1)' }}>
                            {booking.propertyTitle}
                          </p>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-xs mb-1" style={{ color: 'var(--tx-3)' }}>Giriş</p>
                              <p className="font-medium" style={{ color: 'var(--tx-1)' }}>
                                {new Date(booking.checkIn).toLocaleDateString('tr-TR', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs mb-1" style={{ color: 'var(--tx-3)' }}>Çıkış</p>
                              <p className="font-medium" style={{ color: 'var(--tx-1)' }}>
                                {new Date(booking.checkOut).toLocaleDateString('tr-TR', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs mb-1" style={{ color: 'var(--tx-3)' }}>Misafir</p>
                              <p className="font-medium" style={{ color: 'var(--tx-1)' }}>
                                {booking.guests} kişi
                              </p>
                            </div>
                          </div>
                          {booking.message && (
                            <div className="p-3 rounded-lg mb-3"
                              style={{ backgroundColor: 'var(--bg-0)', borderLeft: '3px solid var(--ac-2)' }}
                            >
                              <p className="text-sm flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ac-2)' }} />
                                <span style={{ color: 'var(--tx-2)' }}>{booking.message}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-4" style={{ color: 'var(--ac-1)' }}>
                          ₺{booking.totalPrice.toLocaleString('tr-TR')}
                        </div>
                        {booking.status === 'pending' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleBookingResponse(booking.id, 'approved')}
                              className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
                              style={{ backgroundColor: '#10B981', color: 'white' }}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Onayla
                            </button>
                            <button
                              onClick={() => handleBookingResponse(booking.id, 'rejected')}
                              className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
                              style={{ backgroundColor: '#EF4444', color: 'white' }}
                            >
                              <XCircle className="w-4 h-4" />
                              Reddet
                            </button>
                            <button
                              className="px-6 py-2 rounded-lg font-medium border-2 transition-all hover:scale-105 flex items-center justify-center gap-2"
                              style={{
                                borderColor: 'var(--ac-2)',
                                color: 'var(--ac-2)',
                                backgroundColor: 'transparent'
                              }}
                            >
                              <MessageSquare className="w-4 h-4" />
                              Mesaj Gönder
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {bookingRequests.length === 0 && (
                  <div className="text-center py-16">
                    <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--tx-3)' }} />
                    <h3 className="text-xl font-bold neon-text-strong mb-2" style={{ color: 'var(--tx-1)' }}>
                      Rezervasyon Talebi Yok
                    </h3>
                    <p style={{ color: 'var(--tx-2)' }}>
                      Henüz rezervasyon talebiniz bulunmuyor
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'earnings' && (
              <motion.div
                key="earnings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Earnings Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Bu Ay', amount: totalStats.totalEarnings * 0.3, change: '+12%', color: 'var(--ac-1)' },
                    { label: 'Bu Yıl', amount: totalStats.totalEarnings, change: '+28%', color: 'var(--ac-2)' },
                    { label: 'Toplam', amount: totalStats.totalEarnings * 1.5, change: '+45%', color: '#10B981' }
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl p-6 border-2"
                      style={{
                        backgroundColor: 'var(--bg-1)',
                        borderColor: stat.color,
                        boxShadow: `0 0 15px ${stat.color}30`
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: 'var(--tx-2)' }}>
                          {stat.label}
                        </span>
                        <span className="text-sm font-bold px-2 py-1 rounded-lg"
                          style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                        >
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-3xl font-bold" style={{ color: 'var(--tx-1)' }}>
                        ₺{stat.amount.toLocaleString('tr-TR')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Earnings by Property */}
                <div className="rounded-2xl p-6 border-2"
                  style={{
                    backgroundColor: 'var(--bg-1)',
                    borderColor: 'var(--ac-1)',
                    boxShadow: '0 0 15px rgba(255, 33, 77, 0.1)'
                  }}
                >
                  <h3 className="text-xl font-bold neon-text-strong mb-6" style={{ color: 'var(--tx-1)' }}>
                    İlan Bazında Kazançlar
                  </h3>
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-0)' }}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-bold" style={{ color: 'var(--tx-1)' }}>
                              {property.title}
                            </h4>
                            <p className="text-sm" style={{ color: 'var(--tx-2)' }}>
                              {property.stats.bookings} rezervasyon
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold" style={{ color: 'var(--ac-1)' }}>
                            ₺{property.stats.earnings.toLocaleString('tr-TR')}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--tx-2)' }}>
                            Ort. ₺{(property.stats.earnings / Math.max(property.stats.bookings, 1)).toLocaleString('tr-TR')}/rezervasyon
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-2xl p-6 border-2"
                style={{
                  backgroundColor: 'var(--bg-1)',
                  borderColor: 'var(--ac-1)',
                  boxShadow: '0 0 15px rgba(255, 33, 77, 0.2)'
                }}
              >
                <h3 className="text-xl font-bold neon-text-strong mb-6" style={{ color: 'var(--tx-1)' }}>
                  Takvim Yönetimi
                </h3>
                <div className="h-96 flex items-center justify-center" style={{ color: 'var(--tx-3)' }}>
                  <div className="text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4" />
                    <p>Takvim bileşeni entegrasyonu için hazır</p>
                    <p className="text-sm mt-2">Müsaitlik yönetimi, rezervasyon görünümü</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add/Edit Property Modal */}
      <AnimatePresence>
        {showAddProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddProperty(false);
              setEditingProperty(null);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2"
              style={{
                backgroundColor: 'var(--bg-1)',
                borderColor: 'var(--ac-1)',
                boxShadow: '0 0 30px rgba(255, 33, 77, 0.3)'
              }}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--bg-1)',
                  borderColor: 'rgba(255, 33, 77, 0.2)'
                }}
              >
                <h2 className="text-2xl font-bold neon-text-strong" style={{ color: 'var(--tx-1)' }}>
                  {editingProperty ? 'İlanı Düzenle' : 'Yeni İlan Ekle'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddProperty(false);
                    setEditingProperty(null);
                    resetForm();
                  }}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--bg-0)', color: 'var(--tx-2)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255, 33, 77, 0.2)' }}>
                <div className="flex items-center justify-between">
                  {[
                    { step: 1, label: 'Temel Bilgiler' },
                    { step: 2, label: 'Fiyatlandırma' },
                    { step: 3, label: 'Özellikler' },
                    { step: 4, label: 'Fotoğraflar' }
                  ].map((item, index) => (
                    <React.Fragment key={item.step}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= item.step ? 'neon-glow' : ''
                            }`}
                          style={{
                            backgroundColor: currentStep >= item.step ? 'var(--ac-1)' : 'var(--bg-0)',
                            color: currentStep >= item.step ? 'white' : 'var(--tx-3)',
                            border: `2px solid ${currentStep >= item.step ? 'var(--ac-1)' : 'var(--tx-3)'}`
                          }}
                        >
                          {item.step}
                        </div>
                        <span className="text-xs mt-2" style={{ color: currentStep >= item.step ? 'var(--ac-1)' : 'var(--tx-3)' }}>
                          {item.label}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className="flex-1 h-0.5 mx-2"
                          style={{ backgroundColor: currentStep > item.step ? 'var(--ac-1)' : 'var(--tx-3)' }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                          İlan Başlığı *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Örn: Lüks Deniz Manzaralı Villa"
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                          style={{
                            backgroundColor: 'var(--bg-0)',
                            color: 'var(--tx-1)',
                            borderColor: 'var(--ac-2)'
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                          Açıklama *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Mülkünüzü detaylı bir şekilde tanıtın..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all resize-none"
                          style={{
                            backgroundColor: 'var(--bg-0)',
                            color: 'var(--tx-1)',
                            borderColor: 'var(--ac-2)'
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                          Mülk Tipi *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {propertyTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => handleInputChange('type', type.id)}
                                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${formData.type === type.id ? 'neon-glow' : ''
                                  }`}
                                style={{
                                  backgroundColor: formData.type === type.id ? `var(--ac-1)20` : 'var(--bg-0)',
                                  borderColor: formData.type === type.id ? 'var(--ac-1)' : 'var(--tx-3)',
                                  color: formData.type === type.id ? 'var(--ac-1)' : 'var(--tx-2)'
                                }}
                              >
                                <Icon className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">{type.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Adres *
                          </label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Sokak, Mahalle, No"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Şehir *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="İstanbul"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Ülke *
                          </label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            placeholder="Türkiye"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Hafta İçi Fiyat (TRY) *
                          </label>
                          <input
                            type="number"
                            value={formData.basePrice}
                            onChange={(e) => handleInputChange('basePrice', Number(e.target.value))}
                            placeholder="0"
                            min="0"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Hafta Sonu Fiyat (TRY)
                          </label>
                          <input
                            type="number"
                            value={formData.weekendPrice}
                            onChange={(e) => handleInputChange('weekendPrice', Number(e.target.value))}
                            placeholder="0"
                            min="0"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                          Temizlik Ücreti (TRY)
                        </label>
                        <input
                          type="number"
                          value={formData.cleaningFee}
                          onChange={(e) => handleInputChange('cleaningFee', Number(e.target.value))}
                          placeholder="0"
                          min="0"
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                          style={{
                            backgroundColor: 'var(--bg-0)',
                            color: 'var(--tx-1)',
                            borderColor: 'var(--ac-2)'
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Haftalık İndirim (%)
                          </label>
                          <input
                            type="number"
                            value={formData.weeklyDiscount}
                            onChange={(e) => handleInputChange('weeklyDiscount', Number(e.target.value))}
                            placeholder="0"
                            min="0"
                            max="100"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                            Aylık İndirim (%)
                          </label>
                          <input
                            type="number"
                            value={formData.monthlyDiscount}
                            onChange={(e) => handleInputChange('monthlyDiscount', Number(e.target.value))}
                            placeholder="0"
                            min="0"
                            max="100"
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all"
                            style={{
                              backgroundColor: 'var(--bg-0)',
                              color: 'var(--tx-1)',
                              borderColor: 'var(--ac-2)'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-4" style={{ color: 'var(--tx-2)' }}>
                          Kapasite Bilgileri
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs mb-2" style={{ color: 'var(--tx-3)' }}>
                              <Users className="w-4 h-4 inline mr-1" />
                              Misafir
                            </label>
                            <input
                              type="number"
                              value={formData.guests}
                              onChange={(e) => handleInputChange('guests', Number(e.target.value))}
                              min="1"
                              className="w-full px-3 py-2 rounded-lg border-2 text-center"
                              style={{
                                backgroundColor: 'var(--bg-0)',
                                color: 'var(--tx-1)',
                                borderColor: 'var(--ac-2)'
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-2" style={{ color: 'var(--tx-3)' }}>
                              <BedDouble className="w-4 h-4 inline mr-1" />
                              Yatak Odası
                            </label>
                            <input
                              type="number"
                              value={formData.bedrooms}
                              onChange={(e) => handleInputChange('bedrooms', Number(e.target.value))}
                              min="1"
                              className="w-full px-3 py-2 rounded-lg border-2 text-center"
                              style={{
                                backgroundColor: 'var(--bg-0)',
                                color: 'var(--tx-1)',
                                borderColor: 'var(--ac-2)'
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-2" style={{ color: 'var(--tx-3)' }}>
                              <BedDouble className="w-4 h-4 inline mr-1" />
                              Yatak
                            </label>
                            <input
                              type="number"
                              value={formData.beds}
                              onChange={(e) => handleInputChange('beds', Number(e.target.value))}
                              min="1"
                              className="w-full px-3 py-2 rounded-lg border-2 text-center"
                              style={{
                                backgroundColor: 'var(--bg-0)',
                                color: 'var(--tx-1)',
                                borderColor: 'var(--ac-2)'
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-2" style={{ color: 'var(--tx-3)' }}>
                              <Bath className="w-4 h-4 inline mr-1" />
                              Banyo
                            </label>
                            <input
                              type="number"
                              value={formData.bathrooms}
                              onChange={(e) => handleInputChange('bathrooms', Number(e.target.value))}
                              min="1"
                              className="w-full px-3 py-2 rounded-lg border-2 text-center"
                              style={{
                                backgroundColor: 'var(--bg-0)',
                                color: 'var(--tx-1)',
                                borderColor: 'var(--ac-2)'
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-4" style={{ color: 'var(--tx-2)' }}>
                          Olanaklar
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableAmenities.map((amenity) => {
                            const Icon = amenity.icon;
                            const isSelected = formData.amenities.includes(amenity.id);
                            return (
                              <button
                                key={amenity.id}
                                type="button"
                                onClick={() => handleAmenityToggle(amenity.id)}
                                className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${isSelected ? 'neon-glow' : ''
                                  }`}
                                style={{
                                  backgroundColor: isSelected ? `var(--ac-1)20` : 'var(--bg-0)',
                                  borderColor: isSelected ? 'var(--ac-1)' : 'var(--tx-3)',
                                  color: isSelected ? 'var(--ac-1)' : 'var(--tx-2)'
                                }}
                              >
                                <Icon className="w-5 h-5 mx-auto mb-1" />
                                <span className="text-xs font-medium block">{amenity.label}</span>
                                {isSelected && (
                                  <Check className="w-4 h-4 mx-auto mt-1" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--tx-2)' }}>
                          Ev Kuralları (Her satıra bir kural)
                        </label>
                        <textarea
                          value={formData.houseRules.join('\n')}
                          onChange={(e) => handleInputChange('houseRules', e.target.value.split('\n').filter(r => r.trim()))}
                          placeholder="Sigara içilmez&#10;Evcil hayvan kabul edilmez&#10;Parti yapılamaz"
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all resize-none"
                          style={{
                            backgroundColor: 'var(--bg-0)',
                            color: 'var(--tx-1)',
                            borderColor: 'var(--ac-2)'
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-4" style={{ color: 'var(--tx-2)' }}>
                          Fotoğraflar (Maksimum 10)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {previewImages.map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2"
                              style={{ borderColor: 'var(--ac-1)' }}
                            >
                              <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 p-1 rounded-lg backdrop-blur-sm transition-all hover:scale-110"
                                style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
                              >
                                <X className="w-4 h-4" />
                              </button>
                              {index === 0 && (
                                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm"
                                  style={{ backgroundColor: 'rgba(255, 33, 77, 0.9)', color: 'white' }}
                                >
                                  Kapak Fotoğrafı
                                </div>
                              )}
                            </div>
                          ))}

                          {previewImages.length < 10 && (
                            <label className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                              style={{ borderColor: 'var(--ac-2)', backgroundColor: 'var(--bg-0)' }}
                            >
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <Upload className="w-8 h-8 mb-2" style={{ color: 'var(--ac-2)' }} />
                              <span className="text-sm font-medium" style={{ color: 'var(--ac-2)' }}>
                                Fotoğraf Ekle
                              </span>
                            </label>
                          )}
                        </div>
                        <p className="text-xs mt-2" style={{ color: 'var(--tx-3)' }}>
                          İlk fotoğraf kapak fotoğrafı olarak kullanılacaktır. En iyi sonuç için yüksek çözünürlüklü fotoğraflar kullanın.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 px-6 py-4 border-t flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--bg-1)',
                  borderColor: 'rgba(255, 33, 77, 0.2)'
                }}
              >
                <button
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    } else {
                      setShowAddProperty(false);
                      setEditingProperty(null);
                      resetForm();
                    }
                  }}
                  className="px-6 py-3 rounded-xl font-medium border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: 'var(--ac-2)',
                    color: 'var(--ac-2)',
                    backgroundColor: 'transparent'
                  }}
                >
                  {currentStep > 1 ? (
                    <>
                      <ChevronLeft className="w-4 h-4 inline mr-2" />
                      Geri
                    </>
                  ) : (
                    'İptal'
                  )}
                </button>

                <div className="flex gap-3">
                  {currentStep < 4 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                        color: 'white'
                      }}
                    >
                      Devam Et
                      <ChevronRight className="w-4 h-4 inline ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveProperty}
                      className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 flex items-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                        color: 'white'
                      }}
                    >
                      <Save className="w-4 h-4" />
                      {editingProperty ? 'Güncelle' : 'Yayınla'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyOwnerDashboard;
