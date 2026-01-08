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
  ToggleLeft, ToggleRight, Copy, ExternalLink } from 'lucide-react';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
    updatedAt: '2024-01-20'
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
    updatedAt: '2024-01-22'
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
    updatedAt: '2024-01-23'
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
    updatedAt: '2024-01-21'
  }];


  const categories = [
  { id: 'all', label: 'Tümü', icon: Package, count: products.length },
  { id: 'rental', label: 'Konaklama', icon: Home, count: products.filter((p) => p.category === 'rental').length },
  { id: 'transfer', label: 'Transfer', icon: Bus, count: products.filter((p) => p.category === 'transfer').length },
  { id: 'car', label: 'Araç Kiralama', icon: Car, count: products.filter((p) => p.category === 'car').length },
  { id: 'tour', label: 'Turlar', icon: MapPin, count: products.filter((p) => p.category === 'tour').length }];


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':return 'bg-purple-500/30 text-green-700';
      case 'inactive':return 'bg-purple-500/30 text-purple-400';
      case 'draft':return 'bg-white/5 text-gray-200';
      default:return 'bg-white/5 text-gray-200';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':return 'bg-purple-500/30 text-green-700';
      case 'booked':return 'bg-amber-100 text-amber-700';
      case 'maintenance':return 'bg-purple-500/30 text-purple-400';
      default:return 'bg-white/5 text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'car':return <Car className="w-5 h-5" />;
      case 'transfer':return <Bus className="w-5 h-5" />;
      case 'rental':return <Home className="w-5 h-5" />;
      case 'tour':return <MapPin className="w-5 h-5" />;
      default:return <Package className="w-5 h-5" />;
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/admin/products/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete product');
      }

      const result = await response.json();

      if (result.success) {
        setToastMessage('Ürün başarıyla silindi');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        window.location.reload();
      } else {
        throw new Error(result.error || 'Delete operation failed');
      }
    } catch (error) {
      console.error('Product deletion error:', error);
      setToastMessage(error instanceof Error ? error.message : 'Ürün silinirken hata oluştu');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    // Navigate to product detail page or show modal
    console.log('Viewing product:', product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="p-2 hover:bg-white/5 backdrop-blur-xl rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-300" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Ürün Yönetimi</h1>
                <p className="text-sm text-white-tertiary">Tüm ürünleri görüntüle, düzenle ve yönet</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" />
                İçe Aktar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Dışa Aktar
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors text-sm font-medium shadow-sm">

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
                  selectedCategory === cat.id ?
                  'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' :
                  'bg-white/5 text-gray-300 hover:bg-white/10'}`
                  }>

                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  selectedCategory === cat.id ?
                  'bg-white/10 text-white' :
                  'bg-white/10 text-slate-600'}`
                  }>
                    {cat.count}
                  </span>
                </button>);

            })}
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Ürün ara (isim, konum, özellik...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500 outline-none text-sm" />

            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">

              <Filter className="w-4 h-4" />
              Filtreler
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}>

                <Package className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}>

                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Durum</label>
                    <select className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                      <option value="">Tümü</option>
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Müsaitlik</label>
                    <select className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                      <option value="">Tümü</option>
                      <option value="available">Müsait</option>
                      <option value="booked">Rezerve</option>
                      <option value="maintenance">Bakımda</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Fiyat Aralığı</label>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" />
                      <span className="text-gray-300">-</span>
                      <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Puan</label>
                    <select className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                      <option value="">Tümü</option>
                      <option value="5">5 Yıldız</option>
                      <option value="4">4+ Yıldız</option>
                      <option value="3">3+ Yıldız</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors text-sm font-medium">
                    Filtrele
                  </button>
                  <button className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
                    Sıfırla
                  </button>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' ?
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :
        'space-y-4'
        }>
          {filteredProducts.map((product, index) =>
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all group ${
            viewMode === 'list' ? 'flex' : ''}`
            }>

              {/* Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-48'} bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center`}>
                <div className="absolute top-2 left-2 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                    {product.status.toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <div className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-sm">
                    {getCategoryIcon(product.category)}
                  </div>
                </div>
                <Image className="w-16 h-16 text-gray-400" />
              </div>

              {/* Content */}
              <div className="p-4 flex-1">
                <div className="mb-3">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-blue-400 fill-amber-500" />
                    <span className="text-sm font-semibold text-white">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-300">({product.reviews})</span>
                  <span className="text-xs text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300">{product.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-gray-300" />
                  <span className="text-sm text-gray-300">{product.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-white-tertiary">Başlangıç fiyat</div>
                    <div className="text-lg font-bold text-white">
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
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm font-medium">
                    <Edit className="w-4 h-4" />
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleView(product)}
                    className="p-2 bg-white/5 backdrop-blur-xl text-gray-300 rounded-lg hover:bg-white/10 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 &&
        <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-300 mb-6">Arama kriterlerinize uygun ürün bulunmuyor.</p>
            <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors font-medium">

              Filtreleri Sıfırla
            </button>
          </div>
        }

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Toplam Ürün</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">{products.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Aktif Ürün</span>
              <Check className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {products.filter((p) => p.status === 'active').length}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Müsait</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-white">
              {products.filter((p) => p.availability === 'available').length}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Ortalama Puan</span>
              <Star className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {(products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Ürün Düzenle</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ürün Adı</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.name}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama</label>
                  <textarea
                    rows={3}
                    defaultValue={selectedProduct.description}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Fiyat</label>
                    <input
                      type="number"
                      defaultValue={selectedProduct.price}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Para Birimi</label>
                    <select
                      defaultValue={selectedProduct.currency}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none">
                      <option value="TRY">TRY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Durum</label>
                    <select
                      defaultValue={selectedProduct.status}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none">
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Müsaitlik</label>
                    <select
                      defaultValue={selectedProduct.availability}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none">
                      <option value="available">Müsait</option>
                      <option value="booked">Rezerve</option>
                      <option value="maintenance">Bakımda</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={async () => {
                      if (!selectedProduct) return;

                      try {
                        const formData = {
                          name: (document.querySelector('input[defaultValue="' + selectedProduct.name + '"]') as HTMLInputElement)?.value || selectedProduct.name,
                          description: (document.querySelector('textarea[defaultValue="' + selectedProduct.description + '"]') as HTMLTextAreaElement)?.value || selectedProduct.description,
                          price: parseFloat((document.querySelector('input[type="number"][defaultValue="' + selectedProduct.price + '"]') as HTMLInputElement)?.value || String(selectedProduct.price)),
                          currency: (document.querySelector('select[defaultValue="' + selectedProduct.currency + '"]') as HTMLSelectElement)?.value || selectedProduct.currency,
                          status: (document.querySelectorAll('select')[0] as HTMLSelectElement)?.value || selectedProduct.status,
                          availability: (document.querySelectorAll('select')[1] as HTMLSelectElement)?.value || selectedProduct.availability,
                        };

                        const response = await fetch(`/api/admin/products/${selectedProduct.id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(formData),
                        });

                        if (!response.ok) {
                          const error = await response.json();
                          throw new Error(error.message || 'Failed to update product');
                        }

                        const result = await response.json();

                        if (result.success) {
                          setToastMessage('Ürün başarıyla güncellendi');
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                          setShowEditModal(false);

                          window.location.reload();
                        } else {
                          throw new Error(result.error || 'Update operation failed');
                        }
                      } catch (error) {
                        console.error('Product update error:', error);
                        setToastMessage(error instanceof Error ? error.message : 'Ürün güncellenirken hata oluştu');
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 5000);
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
                    Kaydet
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors font-medium">
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ürünü Sil</h3>
                <p className="text-gray-300 mb-6">Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Evet, Sil
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors font-medium">
                    İptal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

};

export default ProductManagement;