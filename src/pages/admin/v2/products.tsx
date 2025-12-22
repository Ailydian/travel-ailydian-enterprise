/**
 * ADMIN V2 - PRODUCT MANAGEMENT
 * Unified product management for all categories
 * - Rentals (Konaklama)
 * - Transfers (Transfer Hizmetleri)
 * - Cars (Araç Kiralama)
 * - Tours (Turlar & Aktiviteler)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Search, Filter, Download, Upload,
  Eye, Edit, Trash2, Check, X, AlertCircle, Package,
  Car, Bus, Home, MapPin, Calendar, DollarSign,
  Star, Users, Clock, Globe, Image, FileText,
  Settings, RefreshCw, ChevronDown, ChevronUp,
  ToggleLeft, ToggleRight, Copy, ExternalLink
} from 'lucide-react';

// Types
interface Product {
  id: string;
  category: 'rental' | 'transfer' | 'car' | 'tour';
  name: string;
  description: string;
  price: number;
  currency: string;
  status: 'active' | 'inactive' | 'draft';
  availability: 'available' | 'booked' | 'maintenance';
  images: string[];
  location: string;
  rating: number;
  reviews: number;
  capacity: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

const ProductManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rental' | 'transfer' | 'car' | 'tour'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      category: 'car',
      name: 'BMW 5 Serisi 2024',
      description: 'Lüks sedan araç, otomatik vites, full donanım',
      price: 2500,
      currency: 'TRY',
      status: 'active',
      availability: 'available',
      images: ['/cars/bmw5.jpg'],
      location: 'İstanbul',
      rating: 4.8,
      reviews: 127,
      capacity: 5,
      features: ['Otomatik', 'Klimatik', 'GPS', 'Bluetooth'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      category: 'transfer',
      name: 'VIP Havalimanı Transferi',
      description: 'Mercedes Vito ile lüks havalimanı transferi',
      price: 850,
      currency: 'TRY',
      status: 'active',
      availability: 'available',
      images: ['/transfer/vito.jpg'],
      location: 'İstanbul Havalimanı',
      rating: 4.9,
      reviews: 284,
      capacity: 7,
      features: ['WiFi', 'Su', 'Gazete', 'Müzik'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-22',
    },
    {
      id: '3',
      category: 'rental',
      name: 'Bodrum Deniz Manzaralı Villa',
      description: '4+1 özel havuzlu villa, denize sıfır',
      price: 15000,
      currency: 'TRY',
      status: 'active',
      availability: 'booked',
      images: ['/rentals/bodrum-villa.jpg'],
      location: 'Bodrum, Yalıkavak',
      rating: 4.7,
      reviews: 89,
      capacity: 8,
      features: ['Özel Havuz', 'Deniz Manzarası', 'Jakuzi', 'BBQ'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-23',
    },
    {
      id: '4',
      category: 'tour',
      name: 'Kapadokya Balon Turu',
      description: 'Gün doğumunda eşsiz balon deneyimi',
      price: 1750,
      currency: 'TRY',
      status: 'active',
      availability: 'available',
      images: ['/tours/cappadocia.jpg'],
      location: 'Kapadokya',
      rating: 5.0,
      reviews: 456,
      capacity: 20,
      features: ['Kahvaltı', 'Sertifika', 'Fotoğraf', 'Transfer'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-21',
    },
  ];

  const categories = [
    { id: 'all', label: 'Tümü', icon: Package, count: products.length },
    { id: 'rental', label: 'Konaklama', icon: Home, count: products.filter(p => p.category === 'rental').length },
    { id: 'transfer', label: 'Transfer', icon: Bus, count: products.filter(p => p.category === 'transfer').length },
    { id: 'car', label: 'Araç Kiralama', icon: Car, count: products.filter(p => p.category === 'car').length },
    { id: 'tour', label: 'Turlar', icon: MapPin, count: products.filter(p => p.category === 'tour').length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'booked': return 'bg-amber-100 text-amber-700';
      case 'maintenance': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'car': return <Car className="w-5 h-5" />;
      case 'transfer': return <Bus className="w-5 h-5" />;
      case 'rental': return <Home className="w-5 h-5" />;
      case 'tour': return <MapPin className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Ürün Yönetimi</h1>
                <p className="text-sm text-slate-500">Tüm ürünleri görüntüle, düzenle ve yönet</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" />
                İçe Aktar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Dışa Aktar
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Yeni Ürün
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-8 py-8">
        {/* Categories & Filters */}
        <div className="mb-6 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    selectedCategory === cat.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ürün ara (isim, konum, özellik...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filtreler
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Package className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl p-6 border border-slate-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Durum</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                      <option value="">Tümü</option>
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Müsaitlik</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                      <option value="">Tümü</option>
                      <option value="available">Müsait</option>
                      <option value="booked">Rezerve</option>
                      <option value="maintenance">Bakımda</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Fiyat Aralığı</label>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      <span className="text-slate-400">-</span>
                      <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Puan</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                      <option value="">Tümü</option>
                      <option value="5">5 Yıldız</option>
                      <option value="4">4+ Yıldız</option>
                      <option value="3">3+ Yıldız</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Filtrele
                  </button>
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                    Sıfırla
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-48'} bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center`}>
                <div className="absolute top-2 left-2 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                    {product.status.toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getCategoryIcon(product.category)}
                  </div>
                </div>
                <Image className="w-16 h-16 text-slate-300" />
              </div>

              {/* Content */}
              <div className="p-4 flex-1">
                <div className="mb-3">
                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-slate-400">({product.reviews})</span>
                  <span className="text-xs text-slate-400">•</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{product.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{product.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-slate-500">Başlangıç fiyat</div>
                    <div className="text-lg font-bold text-slate-900">
                      ₺{product.price.toLocaleString('tr-TR')}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(product.availability)}`}>
                    {product.availability === 'available' && 'Müsait'}
                    {product.availability === 'booked' && 'Rezerve'}
                    {product.availability === 'maintenance' && 'Bakımda'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <Edit className="w-4 h-4" />
                    Düzenle
                  </button>
                  <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ürün Bulunamadı</h3>
            <p className="text-slate-600 mb-6">Arama kriterlerinize uygun ürün bulunmuyor.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Toplam Ürün</span>
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{products.length}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Aktif Ürün</span>
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {products.filter(p => p.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Müsait</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {products.filter(p => p.availability === 'available').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Ortalama Puan</span>
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {(products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
