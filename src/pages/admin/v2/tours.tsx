import logger from '../../../lib/logger';

/**
 * Tours & Activities Management - Admin V2 FULL VERSION
 * Comprehensive tour management with categories, guides, and scheduling
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass, Camera, Users, MapPin, Calendar, Clock, DollarSign,
  Search, Download, Plus, Edit, Trash2, Eye, ArrowLeft,
  Star, RefreshCw, Mountain, Utensils, User, Tag, Filter } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  location: string;
  region: string;
  duration: string;
  category: 'adventure' | 'cultural' | 'nature' | 'water' | 'food' | 'historical';
  groupSize: {min: number;max: number;};
  price: number;
  status: 'active' | 'inactive' | 'seasonal';
  rating: number;
  totalBookings: number;
  revenue: number;
  guide?: {id: string;name: string;rating: number;};
  language: string[];
  includes: string[];
  schedule: {day: string;time: string;}[];
}

interface Guide {
  id: string;
  name: string;
  rating: number;
  languages: string[];
  specialties: string[];
  toursCount: number;
}

const ToursManagementPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'tours' | 'guides' | 'categories'>('tours');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch real data from API
      const toursResponse = await fetch('/api/admin/tours?limit=100');
      const toursData = await toursResponse.json();

      logger.debug('[Tours Debug] API Response:', { component: 'Tours', metadata: toursData });
      logger.debug('[Tours Debug] Has success:', { component: 'Tours', metadata: { success: toursData.success } });
      logger.debug('[Tours Debug] Has data:', { component: 'Tours', metadata: { hasData: !!toursData.data } });
      logger.debug('[Tours Debug] Data length:', { component: 'Tours', metadata: { length: toursData.data?.length } });

      // Check if API returned valid data with tours
      if (toursData.success === true && Array.isArray(toursData.data) && toursData.data.length > 0) {
        // Transform Prisma data to Tour interface
        const transformedTours: Tour[] = toursData.data.map((tour: any) => ({
          id: tour.id,
          title: tour.name || tour.title,
          location: tour.destination || tour.location,
          region: tour.region || 'Türkiye',
          duration: tour.duration || '1 gün',
          category: tour.category || 'cultural',
          groupSize: {
            min: tour.minGroupSize || 1,
            max: tour.maxGroupSize || 20
          },
          price: tour.price || 0,
          status: tour.isActive ? 'active' : 'inactive',
          rating: tour.rating || 4.5,
          totalBookings: tour.bookingsCount || 0,
          revenue: (tour.bookingsCount || 0) * (tour.price || 0),
          language: tour.languages || ['Türkçe', 'English'],
          includes: tour.includes || [],
          schedule: tour.schedule || [{ day: 'Her Gün', time: '09:00' }]
        }));

        setTours(transformedTours);
        logger.debug('[Tours Debug] Successfully loaded real data:', { component: 'Tours', metadata: { count: transformedTours.length } });
      } else {
        // Fallback to mock data if API fails or database is empty
        logger.debug('[Tours Debug] Using fallback mock data - API error or empty database', { component: 'Tours' });
        logger.debug('[Tours Debug] Reason:', { component: 'Tours', metadata: { success: toursData.success, isArray: Array.isArray(toursData.data), length: toursData.data?.length } });
        const mockTours: Tour[] = [
        {
          id: '1',
          title: 'Kapadokya Sıcak Hava Balonu Turu',
          location: 'Göreme, Kapadokya',
          region: 'Nevşehir',
          duration: '3 saat',
          category: 'adventure',
          groupSize: { min: 2, max: 20 },
          price: 3500,
          status: 'active',
          rating: 4.9,
          totalBookings: 456,
          revenue: 1596000,
          guide: { id: 'g1', name: 'Ali Demir', rating: 4.9 },
          language: ['Türkçe', 'English'],
          includes: ['Otel Transfer', 'Kahvaltı', 'Uçuş Sertifikası', 'Fotoğraf'],
          schedule: [{ day: 'Her Gün', time: '05:00 - 08:00' }]
        },
        {
          id: '2',
          title: 'Pamukkale & Hierapolis Antik Kenti',
          location: 'Pamukkale, Denizli',
          region: 'Denizli',
          duration: 'Tam Gün',
          category: 'historical',
          groupSize: { min: 4, max: 30 },
          price: 850,
          status: 'active',
          rating: 4.7,
          totalBookings: 312,
          revenue: 265200,
          guide: { id: 'g2', name: 'Mehmet Yılmaz', rating: 4.8 },
          language: ['Türkçe', 'English', 'Deutsch'],
          includes: ['Transfer', 'Öğle Yemeği', 'Giriş Ücretleri', 'Rehber'],
          schedule: [{ day: 'Pazartesi-Cumartesi', time: '08:00 - 18:00' }]
        },
        {
          id: '3',
          title: 'Antalya Tekne Turu & Snorkeling',
          location: 'Antalya',
          region: 'Antalya',
          duration: '6 saat',
          category: 'water',
          groupSize: { min: 2, max: 25 },
          price: 1200,
          status: 'seasonal',
          rating: 4.8,
          totalBookings: 234,
          revenue: 280800,
          guide: { id: 'g3', name: 'Ahmet Kaya', rating: 4.7 },
          language: ['Türkçe', 'English', 'Русский'],
          includes: ['Tekne', 'Öğle Yemeği', 'Ekipman', 'İçecekler'],
          schedule: [{ day: 'Mayıs-Ekim', time: '10:00 - 16:00' }]
        }];


        const mockGuides: Guide[] = [
        {
          id: 'g1',
          name: 'Ali Demir',
          rating: 4.9,
          languages: ['Türkçe', 'English'],
          specialties: ['Macera', 'Doğa'],
          toursCount: 45
        },
        {
          id: 'g2',
          name: 'Mehmet Yılmaz',
          rating: 4.8,
          languages: ['Türkçe', 'English', 'Deutsch'],
          specialties: ['Tarihi', 'Kültürel'],
          toursCount: 38
        },
        {
          id: 'g3',
          name: 'Ahmet Kaya',
          rating: 4.7,
          languages: ['Türkçe', 'English', 'Русский'],
          specialties: ['Su Sporları', 'Tekne Turları'],
          toursCount: 32
        }];


        setTours(mockTours);
        setGuides(mockGuides);
        logger.debug('[Tours Debug] Mock data set successfully:', { component: 'Tours', metadata: { tourCount: mockTours.length } });
      }
    } catch (error) {
      logger.error('[Tours Debug] Error fetching data:', error as Error, { component: 'Tours' });
      // Set empty arrays on error
      setTours([]);
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tour.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || tour.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalRevenue = tours.reduce((sum, t) => sum + t.revenue, 0);
  const totalBookings = tours.reduce((sum, t) => sum + t.totalBookings, 0);
  const activeTours = tours.filter((t) => t.status === 'active').length;
  const avgRating = tours.length > 0 ? tours.reduce((sum, t) => sum + t.rating, 0) / tours.length : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':return 'text-purple-400 bg-purple-500/20 border-purple-400';
      case 'inactive':return 'text-gray-400 bg-white/5 border-white/20';
      case 'seasonal':return 'text-amber-600 bg-amber-50 border-amber-200';
      default:return 'text-gray-400 bg-white/5 border-white/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'adventure':return <Mountain className="w-4 h-4" />;
      case 'food':return <Utensils className="w-4 h-4" />;
      case 'water':return <Camera className="w-4 h-4" />;
      default:return <Compass className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      adventure: 'bg-orange-50 text-orange-700 border-orange-200',
      cultural: 'bg-purple-50 text-purple-300 border-purple-200',
      nature: 'bg-purple-500/20 text-green-700 border-purple-400',
      water: 'bg-blue-50 text-blue-400-hover border-blue-200',
      food: 'bg-amber-50 text-amber-700 border-amber-200',
      historical: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[category] || 'bg-white/5 text-gray-200 border-white/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="p-2 hover:bg-white/5 backdrop-blur-xl rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-300" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Tur & Aktivite Yönetimi</h1>
                <p className="text-sm text-gray-300">Turlar, rehberler ve kategorileri yönetin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Yeni Tur</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* View Tabs */}
        <div className="mb-8 flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 border border-white/20">
          {[
          { id: 'tours', label: 'Turlar', icon: Compass },
          { id: 'guides', label: 'Rehberler', icon: User },
          { id: 'categories', label: 'Kategoriler', icon: Tag }].
          map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeView === tab.id ?
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' :
                'text-gray-300 hover:bg-white/5'}`
                }>

                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>);

          })}
        </div>

        {/* Tours View */}
        {activeView === 'tours' &&
        <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-300">Toplam Gelir</p>
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">₺{totalRevenue.toLocaleString('tr-TR')}</p>
                <p className="text-xs text-purple-400 mt-1">+18.5% bu ay</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-300">Rezervasyon</p>
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalBookings}</p>
                <p className="text-xs text-blue-400 mt-1">Son 30 gün</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-300">Aktif Turlar</p>
                  <Compass className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-white">{activeTours}</p>
                <p className="text-xs text-purple-600 mt-1">{tours.length} toplam</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-300">Ortalama Puan</p>
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</p>
                <p className="text-xs text-amber-600 mt-1">5 üzerinden</p>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 border border-white/20 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input type="text" placeholder="Tur ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500 outline-none" />
                </div>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                  <option value="all">Tüm Kategoriler</option>
                  <option value="adventure">Macera</option>
                  <option value="cultural">Kültürel</option>
                  <option value="historical">Tarihi</option>
                  <option value="water">Su Sporları</option>
                  <option value="food">Yemek Turları</option>
                  <option value="nature">Doğa</option>
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                  <option value="seasonal">Sezonluk</option>
                </select>
                <button onClick={fetchData} className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl hover:bg-white/20 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Yenile
                </button>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loading ?
            <div className="col-span-2 flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
                </div> :
            filteredTours.length === 0 ?
            <div className="col-span-2 text-center py-12 text-white-tertiary">Tur bulunamadı</div> :

            filteredTours.map((tour, index) =>
            <motion.div key={tour.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl border border-white/20 overflow-hidden hover:shadow-xl transition-all">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{tour.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-gray-300" />
                            <span className="text-sm text-gray-300">{tour.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getCategoryColor(tour.category)}`}>
                              {getCategoryIcon(tour.category)}
                              <span className="capitalize">{tour.category}</span>
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tour.status)}`}>
                              {tour.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-600 to-purple-600-lighter rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Users className="w-4 h-4" />
                            <span>{tour.groupSize.min}-{tour.groupSize.max} kişi</span>
                          </div>
                          {tour.guide &&
                    <div className="col-span-2 flex items-center gap-2 text-sm text-gray-300">
                              <User className="w-4 h-4" />
                              <span>{tour.guide.name}</span>
                              <Star className="w-3 h-3 text-blue-400 fill-amber-500" />
                              <span className="font-semibold">{tour.guide.rating}</span>
                            </div>
                    }
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-white-tertiary mb-1">Fiyat</p>
                          <p className="font-bold text-purple-400">₺{tour.price}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white-tertiary mb-1">Rezervasyon</p>
                          <p className="font-bold text-white">{tour.totalBookings}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white-tertiary mb-1">Gelir</p>
                          <p className="font-bold text-white">₺{(tour.revenue / 1000).toFixed(0)}K</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-blue-400 fill-amber-500" />
                          <span className="font-semibold text-white">{tour.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600-lighter rounded-lg transition-colors group">
                            <Eye className="w-4 h-4 text-gray-300 group-hover:text-blue-400" />
                          </button>
                          <button className="p-2 hover:bg-purple-500-lighter rounded-lg transition-colors group">
                            <Edit className="w-4 h-4 text-gray-300 group-hover:text-purple-400" />
                          </button>
                          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
                            <Trash2 className="w-4 h-4 text-gray-300 group-hover:text-blue-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
            )
            }
            </div>
          </>
        }

        {/* Guides View */}
        {activeView === 'guides' &&
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Rehberler ({guides.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) =>
            <div key={guide.id} className="border border-white/20 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{guide.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-blue-400 fill-amber-500" />
                        <span className="font-semibold text-amber-600">{guide.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-white-tertiary text-xs mb-1">Diller:</p>
                      <p className="font-medium text-white">{guide.languages.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-white-tertiary text-xs mb-1">Uzmanlık:</p>
                      <p className="font-medium text-white">{guide.specialties.join(', ')}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs text-gray-300">{guide.toursCount} tur yönetiyor</p>
                    </div>
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {/* Categories View */}
        {activeView === 'categories' &&
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Tur Kategorileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['adventure', 'cultural', 'nature', 'water', 'food', 'historical'].map((cat) => {
              const count = tours.filter((t) => t.category === cat).length;
              return (
                <div key={cat} className={`border rounded-lg p-6 ${getCategoryColor(cat)}`}>
                    <div className="flex items-center justify-between mb-3">
                      {getCategoryIcon(cat)}
                      <span className="text-2xl font-bold">{count}</span>
                    </div>
                    <p className="font-semibold capitalize">{cat}</p>
                    <p className="text-xs mt-1 opacity-75">{count} aktif tur</p>
                  </div>);

            })}
            </div>
          </div>
        }
      </main>
    </div>);

};

export default ToursManagementPage;