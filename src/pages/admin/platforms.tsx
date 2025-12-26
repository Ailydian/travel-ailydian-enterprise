import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Globe, Settings, RefreshCw, CheckCircle, XCircle, AlertTriangle,
  Key, Calendar, BarChart3, TrendingUp, Star, MapPin, Users, Clock,
  Zap, Download, Upload, Eye, Edit, Trash2, Plus, Play, Pause,
  Database, Link2, Activity, Award, Target
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

interface PlatformConnection {
  id: string;
  platform: 'google' | 'tripadvisor';
  name: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  totalLocations: number;
  syncedLocations: number;
  totalReviews: number;
  syncedReviews: number;
  apiKey?: string;
  accountId?: string;
  errors?: string[];
  averageRating: number;
  autoSync: boolean;
  syncInterval: number; // in hours
}

interface SyncJob {
  id: string;
  platform: string;
  type: 'locations' | 'reviews' | 'photos' | 'full';
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  itemsProcessed: number;
  totalItems: number;
  errors?: string[];
}

interface PlatformsData {
  platforms: PlatformConnection[];
  syncJobs: SyncJob[];
  stats: {
    totalConnectedPlatforms: number;
    totalSyncedLocations: number;
    totalSyncedReviews: number;
    lastSyncTime: string;
    syncSuccess: number;
    syncErrors: number;
  };
}

const AILYDIAN_COLORS = {
  primary: '#FF214D',
  secondary: '#FF6A45', 
  dark: '#0A0A0B',
  light: '#F3F4F6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  purple: '#8b5cf6',
  blue: '#3b82f6'
};

export default function AdminPlatforms() {
  const [platformsData, setPlatformsData] = useState<PlatformsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [accountId, setAccountId] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setAdminData(adminService.getStoredAdminData());
    fetchPlatformsData();
  }, [router]);

  const fetchPlatformsData = async () => {
    try {
      setIsLoading(true);
      // Mock data for demonstration
      const mockData: PlatformsData = {
        platforms: [
          {
            id: 'google-1',
            platform: 'google',
            name: 'Google My Business',
            status: 'connected',
            lastSync: '2024-01-25T10:30:00Z',
            totalLocations: 156,
            syncedLocations: 142,
            totalReviews: 2847,
            syncedReviews: 2698,
            apiKey: 'AIzaSyC...hidden',
            accountId: 'travel-lydian',
            averageRating: 4.3,
            autoSync: true,
            syncInterval: 6
          },
          {
            id: 'tripadvisor-1',
            platform: 'tripadvisor',
            name: 'TripAdvisor Partner API',
            status: 'connected',
            lastSync: '2024-01-25T08:15:00Z',
            totalLocations: 89,
            syncedLocations: 78,
            totalReviews: 1956,
            syncedReviews: 1834,
            apiKey: 'TA_API...hidden',
            accountId: 'lydian-travel',
            averageRating: 4.1,
            autoSync: true,
            syncInterval: 12
          }
        ],
        syncJobs: [
          {
            id: 'sync-1',
            platform: 'Google My Business',
            type: 'reviews',
            status: 'running',
            startedAt: '2024-01-25T14:30:00Z',
            itemsProcessed: 45,
            totalItems: 126
          },
          {
            id: 'sync-2',
            platform: 'TripAdvisor',
            type: 'locations',
            status: 'completed',
            startedAt: '2024-01-25T10:00:00Z',
            completedAt: '2024-01-25T10:15:00Z',
            itemsProcessed: 78,
            totalItems: 78
          },
          {
            id: 'sync-3',
            platform: 'Google My Business',
            type: 'photos',
            status: 'failed',
            startedAt: '2024-01-25T09:00:00Z',
            completedAt: '2024-01-25T09:05:00Z',
            itemsProcessed: 12,
            totalItems: 89,
            errors: ['API quota exceeded', 'Invalid photo format']
          }
        ],
        stats: {
          totalConnectedPlatforms: 2,
          totalSyncedLocations: 220,
          totalSyncedReviews: 4532,
          lastSyncTime: '2024-01-25T10:30:00Z',
          syncSuccess: 95,
          syncErrors: 5
        }
      };
      setPlatformsData(mockData);
    } catch (err: any) {
      setError(err.message || 'Platform verileri yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}B`;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      connected: { bg: `${AILYDIAN_COLORS.success}20`, text: AILYDIAN_COLORS.success, label: 'Bağlı', icon: CheckCircle },
      disconnected: { bg: `${AILYDIAN_COLORS.error}20`, text: AILYDIAN_COLORS.error, label: 'Bağlantısız', icon: XCircle },
      error: { bg: `${AILYDIAN_COLORS.warning}20`, text: AILYDIAN_COLORS.warning, label: 'Hata', icon: AlertTriangle },
      syncing: { bg: `${AILYDIAN_COLORS.blue}20`, text: AILYDIAN_COLORS.blue, label: 'Senkronize Ediliyor', icon: RefreshCw }
    };
    
    const style = styles[status as keyof typeof styles];
    const IconComponent = style.icon;
    
    return (
      <span 
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
        style={{ background: style.bg, color: style.text }}
      >
        <IconComponent className="w-3 h-3 mr-1" />
        {style.label}
      </span>
    );
  };

  const getSyncJobStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: `${AILYDIAN_COLORS.warning}20`, text: AILYDIAN_COLORS.warning, label: 'Bekliyor' },
      running: { bg: `${AILYDIAN_COLORS.blue}20`, text: AILYDIAN_COLORS.blue, label: 'Çalışıyor' },
      completed: { bg: `${AILYDIAN_COLORS.success}20`, text: AILYDIAN_COLORS.success, label: 'Tamamlandı' },
      failed: { bg: `${AILYDIAN_COLORS.error}20`, text: AILYDIAN_COLORS.error, label: 'Başarısız' }
    };
    
    const style = styles[status as keyof typeof styles];
    return (
      <span 
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ background: style.bg, color: style.text }}
      >
        {style.label}
      </span>
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">G</div>;
      case 'tripadvisor':
        return <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">T</div>;
      default:
        return <Globe className="w-8 h-8 text-gray-500" />;
    }
  };

  const triggerSync = async (platformId: string, syncType: string) => {
    // Mock sync trigger
    console.log(`Starting ${syncType} sync for platform ${platformId}`);
    // Refresh data to show new sync job
    fetchPlatformsData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin mx-auto" style={{animationDuration: '1.5s'}}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Harici Platformlar Yükleniyor</h3>
          <p className="text-gray-600">Platform verileri hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Bir Hata Oluştu</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchPlatformsData}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Harici Platform Yönetimi - Travel LyDian</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen" style={{background: `linear-gradient(135deg, ${AILYDIAN_COLORS.dark} 0%, #1f1f23 50%, #2d2d35 100%)`}}>
        {/* Top Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}>
                  <Globe className="w-5 h-5 text-white m-1.5" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Harici Platform Yönetimi
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    {adminData?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                >
                  <span>Çıkış</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Navigation */}
        <div className="flex">
          <nav className="bg-gray-900/95 backdrop-blur-sm w-64 min-h-screen border-r border-gray-700">
            <div className="p-4">
              <div className="space-y-2">
                <Link href="/admin/dashboard" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <BarChart3 className="w-5 h-5" />
                  <span>Kontrol Paneli</span>
                </Link>
                <Link href="/admin/locations" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>Lokasyonlar</span>
                </Link>
                <Link href="/admin/users" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Users className="w-5 h-5" />
                  <span>Kullanıcılar</span>
                </Link>
                <Link href="/admin/reviews" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Star className="w-5 h-5" />
                  <span>Değerlendirmeler</span>
                </Link>
                <Link href="/admin/platforms" className="flex items-center space-x-3 text-white rounded-lg px-3 py-2" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60`}}>
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Harici Platformlar</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {platformsData && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <Globe className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Bağlı Platform</p>
                        <p className="text-2xl font-bold text-gray-900">{platformsData.stats.totalConnectedPlatforms}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <MapPin className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Senkron Lokasyon</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(platformsData.stats.totalSyncedLocations)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.warning}40)`}}>
                        <Star className="w-6 h-6" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Senkron Yorum</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(platformsData.stats.totalSyncedReviews)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}40)`}}>
                        <CheckCircle className="w-6 h-6" style={{color: AILYDIAN_COLORS.primary}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Başarı Oranı</p>
                        <p className="text-2xl font-bold text-gray-900">{platformsData.stats.syncSuccess}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.error}20, ${AILYDIAN_COLORS.error}40)`}}>
                        <AlertTriangle className="w-6 h-6" style={{color: AILYDIAN_COLORS.error}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Hatalar</p>
                        <p className="text-2xl font-bold text-gray-900">{platformsData.stats.syncErrors}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}20, ${AILYDIAN_COLORS.purple}40)`}}>
                        <Clock className="w-6 h-6" style={{color: AILYDIAN_COLORS.purple}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase text-xs">Son Senkron</p>
                        <p className="text-lg font-bold text-gray-900">{formatDate(platformsData.stats.lastSyncTime).split(' ')[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {platformsData.platforms.map((platform) => (
                    <div key={platform.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                      {/* Platform Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          {getPlatformIcon(platform.platform)}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{platform.name}</h3>
                            <p className="text-sm text-gray-600">Hesap: {platform.accountId}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(platform.status)}
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${platform.autoSync ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span className="text-xs text-gray-600">{platform.autoSync ? 'Otomatik' : 'Manuel'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Platform Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-600 font-medium">Lokasyonlar</p>
                              <p className="text-2xl font-bold text-blue-800">{platform.syncedLocations}/{platform.totalLocations}</p>
                            </div>
                            <MapPin className="w-8 h-8 text-blue-500" />
                          </div>
                          <div className="mt-2 bg-blue-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{width: `${(platform.syncedLocations / platform.totalLocations) * 100}%`}}
                            ></div>
                          </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-600 font-medium">Yorumlar</p>
                              <p className="text-2xl font-bold text-green-800">{formatNumber(platform.syncedReviews)}/{formatNumber(platform.totalReviews)}</p>
                            </div>
                            <Star className="w-8 h-8 text-green-500" />
                          </div>
                          <div className="mt-2 bg-green-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{width: `${(platform.syncedReviews / platform.totalReviews) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Platform Info */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>Ortalama: {platform.averageRating.toFixed(1)} ⭐</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Her {platform.syncInterval}s</span>
                          </div>
                        </div>
                        <span className="text-xs">Son: {formatDate(platform.lastSync)}</span>
                      </div>

                      {/* Platform Actions */}
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => triggerSync(platform.id, 'locations')}
                          className="flex-1 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                          style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}, ${AILYDIAN_COLORS.purple})`}}
                        >
                          <RefreshCw className="w-4 h-4 mr-2 inline" />
                          Lokasyonları Senkronize Et
                        </button>
                        <button 
                          onClick={() => triggerSync(platform.id, 'reviews')}
                          className="flex-1 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                          style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}
                        >
                          <Star className="w-4 h-4 mr-2 inline" />
                          Yorumları Senkronize Et
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>

                      {/* API Key Info */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Key className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">API Anahtarı: {platform.apiKey}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            Düzenle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sync Jobs */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Senkronizasyon İşleri</h3>
                    <button 
                      onClick={fetchPlatformsData}
                      className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}, ${AILYDIAN_COLORS.blue})`}}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Yenile</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {platformsData.syncJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{job.platform} - {job.type}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span>Başlangıç: {formatDate(job.startedAt)}</span>
                              {job.completedAt && <span>Tamamlanma: {formatDate(job.completedAt)}</span>}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{width: `${(job.itemsProcessed / job.totalItems) * 100}%`}}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{job.itemsProcessed}/{job.totalItems}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getSyncJobStatusBadge(job.status)}
                          {job.errors && job.errors.length > 0 && (
                            <button className="text-red-600 hover:text-red-800">
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}