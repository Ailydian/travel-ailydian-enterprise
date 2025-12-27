import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Users, Search, Filter, Plus, Edit, Trash2, Ban, CheckCircle, 
  Mail, Calendar, MapPin, Star, Eye, Download, Upload, RefreshCw,
  ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, UserCheck,
  UserX, Award, Clock, Activity, Zap, BarChart3, Globe
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'banned';
  role: 'user' | 'guide' | 'business';
  joinDate: string;
  lastLogin: string;
  locationCount: number;
  reviewCount: number;
  averageRating: number;
  isVerified: boolean;
  country: string;
  city: string;
  totalViews: number;
  reportCount: number;
}

interface UsersData {
  users: User[];
  total: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  stats: {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    bannedUsers: number;
    verifiedUsers: number;
    newUsersThisMonth: number;
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

export default function AdminUsers() {
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('joinDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setAdminData(adminService.getStoredAdminData());
    fetchUsersData();
  }, [router, currentPage, searchTerm, statusFilter, roleFilter, sortBy, sortOrder]);

  const fetchUsersData = async () => {
    try {
      setIsLoading(true);
      // Mock data for demonstration
      const mockData: UsersData = {
        users: [
          {
            id: 1,
            email: 'john.doe@example.com',
            username: 'johndoe',
            fullName: 'John Doe',
            avatar: '/avatars/1.jpg',
            status: 'active',
            role: 'user',
            joinDate: '2024-01-15T10:00:00Z',
            lastLogin: '2024-01-20T14:30:00Z',
            locationCount: 5,
            reviewCount: 12,
            averageRating: 4.5,
            isVerified: true,
            country: 'Türkiye',
            city: 'İstanbul',
            totalViews: 1250,
            reportCount: 0
          },
          {
            id: 2,
            email: 'jane.smith@example.com',
            username: 'janesmith',
            fullName: 'Jane Smith',
            status: 'active',
            role: 'guide',
            joinDate: '2024-01-10T09:00:00Z',
            lastLogin: '2024-01-19T16:45:00Z',
            locationCount: 15,
            reviewCount: 45,
            averageRating: 4.8,
            isVerified: true,
            country: 'Türkiye',
            city: 'Ankara',
            totalViews: 3500,
            reportCount: 0
          },
          {
            id: 3,
            email: 'business@hotel.com',
            username: 'grandhotel',
            fullName: 'Grand Hotel Istanbul',
            status: 'suspended',
            role: 'business',
            joinDate: '2023-12-20T11:00:00Z',
            lastLogin: '2024-01-18T12:00:00Z',
            locationCount: 3,
            reviewCount: 8,
            averageRating: 3.2,
            isVerified: false,
            country: 'Türkiye',
            city: 'İstanbul',
            totalViews: 890,
            reportCount: 2
          }
        ],
        total: 156,
        pagination: {
          currentPage: 1,
          totalPages: 16,
          hasNext: true,
          hasPrevious: false
        },
        stats: {
          totalUsers: 156,
          activeUsers: 142,
          suspendedUsers: 12,
          bannedUsers: 2,
          verifiedUsers: 89,
          newUsersThisMonth: 23
        }
      };
      setUsersData(mockData);
    } catch (err: any) {
      setError(err.message || 'Kullanıcı verileri yüklenirken hata oluştu');
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
      active: { bg: `${AILYDIAN_COLORS.success}20`, text: AILYDIAN_COLORS.success, label: 'Aktif' },
      suspended: { bg: `${AILYDIAN_COLORS.warning}20`, text: AILYDIAN_COLORS.warning, label: 'Askıya Alındı' },
      banned: { bg: `${AILYDIAN_COLORS.error}20`, text: AILYDIAN_COLORS.error, label: 'Yasaklandı' }
    };
    
    const style = styles[status as keyof typeof styles];
    return (
      <span 
        className="px-3 py-1 rounded-full text-xs font-bold"
        style={{ background: style.bg, color: style.text }}
      >
        {style.label}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      user: { bg: `${AILYDIAN_COLORS.blue}20`, text: AILYDIAN_COLORS.blue, label: 'Kullanıcı' },
      guide: { bg: `${AILYDIAN_COLORS.purple}20`, text: AILYDIAN_COLORS.purple, label: 'Rehber' },
      business: { bg: `${AILYDIAN_COLORS.secondary}20`, text: AILYDIAN_COLORS.secondary, label: 'İşletme' }
    };
    
    const style = styles[role as keyof typeof styles];
    return (
      <span 
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ background: style.bg, color: style.text }}
      >
        {style.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/10 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin mx-auto" style={{animationDuration: '1.5s'}}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Kullanıcılar Yükleniyor</h3>
          <p className="text-gray-300">Kullanıcı verileri hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Bir Hata Oluştu</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchUsersData}
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
        <title>Kullanıcı Yönetimi - Travel LyDian</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen" style={{background: `linear-gradient(135deg, ${AILYDIAN_COLORS.dark} 0%, #1f1f23 50%, #2d2d35 100%)`}}>
        {/* Top Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}>
                  <Users className="w-5 h-5 text-white m-1.5" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Kullanıcı Yönetimi
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-100">
                    {adminData?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
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
                <Link href="/admin/users" className="flex items-center space-x-3 text-white rounded-lg px-3 py-2" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60`}}>
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Kullanıcılar</span>
                </Link>
                <Link href="/admin/reviews" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Star className="w-5 h-5" />
                  <span>Değerlendirmeler</span>
                </Link>
                <Link href="/admin/platforms" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2 transition-all hover:translate-x-1">
                  <Globe className="w-5 h-5" />
                  <span>Harici Platformlar</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {usersData && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <Users className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-300 uppercase">Toplam</p>
                        <p className="text-2xl font-bold text-white">{formatNumber(usersData.stats.totalUsers)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <UserCheck className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-300 uppercase">Aktif</p>
                        <p className="text-2xl font-bold text-white">{formatNumber(usersData.stats.activeUsers)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.warning}40)`}}>
                        <Clock className="w-6 h-6" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-300 uppercase">Askıda</p>
                        <p className="text-2xl font-bold text-white">{usersData.stats.suspendedUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.error}20, ${AILYDIAN_COLORS.error}40)`}}>
                        <UserX className="w-6 h-6" style={{color: AILYDIAN_COLORS.error}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-300 uppercase">Yasaklı</p>
                        <p className="text-2xl font-bold text-white">{usersData.stats.bannedUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}40)`}}>
                        <Award className="w-6 h-6" style={{color: AILYDIAN_COLORS.primary}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-300 uppercase">Doğrulanmış</p>
                        <p className="text-2xl font-bold text-white">{usersData.stats.verifiedUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}20, ${AILYDIAN_COLORS.purple}40)`}}>
                        <Plus className="w-6 h-6" style={{color: AILYDIAN_COLORS.purple}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-300 uppercase">Bu Ay Yeni</p>
                        <p className="text-2xl font-bold text-white">{usersData.stats.newUsersThisMonth}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Kullanıcı ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Tüm Durumlar</option>
                      <option value="active">Aktif</option>
                      <option value="suspended">Askıya Alınmış</option>
                      <option value="banned">Yasaklanmış</option>
                    </select>

                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Tüm Roller</option>
                      <option value="user">Kullanıcı</option>
                      <option value="guide">Rehber</option>
                      <option value="business">İşletme</option>
                    </select>

                    <div className="flex space-x-2">
                      <button 
                        className="flex-1 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}
                      >
                        <Filter className="w-4 h-4 mr-2 inline" />
                        Filtrele
                      </button>
                      <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="text-lg font-bold text-white">Kullanıcılar ({usersData.total})</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            <input type="checkbox" className="rounded" />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Kullanıcı
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Durum
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Rol
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Katılım
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            İstatistikler
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-transparent divide-y divide-gray-200">
                        {usersData.users.map((user) => (
                          <tr key={user.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input 
                                type="checkbox" 
                                className="rounded"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsers([...selectedUsers, user.id]);
                                  } else {
                                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                  }
                                }}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                                  <Users className="w-5 h-5 text-white" />
                                </div>
                                <div className="ml-4">
                                  <div className="flex items-center">
                                    <div className="text-sm font-medium text-white">{user.fullName}</div>
                                    {user.isVerified && <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />}
                                  </div>
                                  <div className="text-sm text-gray-200">@{user.username}</div>
                                  <div className="text-sm text-gray-200">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(user.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getRoleBadge(user.role)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              <div>{formatDate(user.joinDate)}</div>
                              <div className="text-gray-400 text-xs">Son giriş: {formatDate(user.lastLogin)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {user.locationCount} lokasyon
                                </div>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 mr-1" />
                                  {user.reviewCount} değerlendirme
                                </div>
                                <div className="flex items-center">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {formatNumber(user.totalViews)} görüntüleme
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="text-gray-400 hover:text-gray-300 p-1 rounded hover:bg-white/5">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-200">
                        Sayfa {usersData.pagination.currentPage} / {usersData.pagination.totalPages}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        disabled={!usersData.pagination.hasPrevious}
                        className="px-3 py-1 border border-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        disabled={!usersData.pagination.hasNext}
                        className="px-3 py-1 border border-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
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