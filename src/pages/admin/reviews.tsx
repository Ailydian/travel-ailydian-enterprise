import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  MessageSquare, Star, User, MapPin, Calendar, Filter, Search,
  CheckCircle, XCircle, AlertTriangle, Flag, Eye, Edit, Trash2,
  ThumbsUp, ThumbsDown, Clock, RefreshCw, Download, BarChart3,
  Brain, Zap, Award, TrendingUp, Users
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

interface Review {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
  };
  location: {
    id: number;
    name: string;
    city: string;
    country: string;
  };
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: string;
  moderatedAt?: string;
  moderatedBy?: string;
  moderationReason?: string;
  aiScore: number;
  sentimentScore: number;
  flagCount: number;
  helpfulVotes: number;
  totalVotes: number;
  language: string;
  photos?: string[];
}

interface ReviewsData {
  reviews: Review[];
  total: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    flagged: number;
    averageRating: number;
    aiModerated: number;
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

export default function AdminReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setAdminData(adminService.getStoredAdminData());
    fetchReviewsData();
  }, [router, currentPage, searchTerm, statusFilter, ratingFilter, sortBy]);

  const fetchReviewsData = async () => {
    try {
      setIsLoading(true);
      // Mock data for demonstration
      const mockData: ReviewsData = {
        reviews: [
          {
            id: 1,
            user: {
              id: 1,
              name: 'Ahmet Yılmaz',
              email: 'ahmet@example.com',
              isVerified: true
            },
            location: {
              id: 1,
              name: 'Sultanahmet Camii',
              city: 'İstanbul',
              country: 'Türkiye'
            },
            rating: 5,
            title: 'Muhteşem bir deneyim',
            content: 'Sultanahmet Camii gerçekten büyüleyici. Mimarisi ve tarihi atmosferi etkileyici. Kesinlikle görülmesi gereken bir yer.',
            status: 'pending',
            createdAt: '2024-01-20T10:30:00Z',
            aiScore: 0.92,
            sentimentScore: 0.85,
            flagCount: 0,
            helpfulVotes: 12,
            totalVotes: 15,
            language: 'tr',
            photos: ['/reviews/1-1.jpg', '/reviews/1-2.jpg']
          },
          {
            id: 2,
            user: {
              id: 2,
              name: 'Sarah Johnson',
              email: 'sarah@example.com',
              isVerified: false
            },
            location: {
              id: 2,
              name: 'Galata Kulesi',
              city: 'İstanbul',
              country: 'Türkiye'
            },
            rating: 1,
            title: 'Çok kalabalık ve pahalı',
            content: 'Bu yer çok kalabalık ve bilet fiyatları fahiş. Manzara güzel ama bu kadar para vermeye değmez.',
            status: 'flagged',
            createdAt: '2024-01-19T16:45:00Z',
            moderatedAt: '2024-01-20T09:15:00Z',
            moderatedBy: 'admin@ailydian.com',
            moderationReason: 'Olumsuz ton, potansiyel spam',
            aiScore: 0.23,
            sentimentScore: -0.67,
            flagCount: 3,
            helpfulVotes: 2,
            totalVotes: 18,
            language: 'en'
          },
          {
            id: 3,
            user: {
              id: 3,
              name: 'Maria García',
              email: 'maria@example.com',
              isVerified: true
            },
            location: {
              id: 3,
              name: 'Kapadokya Balon Turu',
              city: 'Nevşehir',
              country: 'Türkiye'
            },
            rating: 5,
            title: 'Unforgettable experience!',
            content: 'The hot air balloon ride in Cappadocia was absolutely magical. The sunrise views were breathtaking and the pilot was very professional. Highly recommended!',
            status: 'approved',
            createdAt: '2024-01-18T07:20:00Z',
            moderatedAt: '2024-01-18T10:30:00Z',
            moderatedBy: 'moderator@ailydian.com',
            aiScore: 0.96,
            sentimentScore: 0.94,
            flagCount: 0,
            helpfulVotes: 28,
            totalVotes: 30,
            language: 'en',
            photos: ['/reviews/3-1.jpg', '/reviews/3-2.jpg', '/reviews/3-3.jpg']
          }
        ],
        total: 1247,
        pagination: {
          currentPage: 1,
          totalPages: 125,
          hasNext: true,
          hasPrevious: false
        },
        stats: {
          total: 1247,
          pending: 89,
          approved: 1056,
          rejected: 67,
          flagged: 35,
          averageRating: 4.2,
          aiModerated: 892
        }
      };
      setReviewsData(mockData);
    } catch (err: any) {
      setError(err.message || 'Değerlendirme verileri yüklenirken hata oluştu');
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
      pending: { bg: `${AILYDIAN_COLORS.warning}20`, text: AILYDIAN_COLORS.warning, label: 'Bekliyor', icon: Clock },
      approved: { bg: `${AILYDIAN_COLORS.success}20`, text: AILYDIAN_COLORS.success, label: 'Onaylandı', icon: CheckCircle },
      rejected: { bg: `${AILYDIAN_COLORS.error}20`, text: AILYDIAN_COLORS.error, label: 'Reddedildi', icon: XCircle },
      flagged: { bg: `${AILYDIAN_COLORS.primary}20`, text: AILYDIAN_COLORS.primary, label: 'Bayraklı', icon: Flag }
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

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-current text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">({rating})</span>
      </div>
    );
  };

  const getSentimentBadge = (score: number) => {
    let color, label;
    if (score > 0.5) {
      color = AILYDIAN_COLORS.success;
      label = 'Pozitif';
    } else if (score > 0) {
      color = AILYDIAN_COLORS.warning;
      label = 'Nötr';
    } else {
      color = AILYDIAN_COLORS.error;
      label = 'Negatif';
    }

    return (
      <span 
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ background: `${color}20`, color }}
      >
        {label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-red-500 rounded-full animate-spin mx-auto" style={{animationDuration: '1.5s'}}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Değerlendirmeler Yükleniyor</h3>
          <p className="text-gray-600">Değerlendirme verileri hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Bir Hata Oluştu</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchReviewsData}
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
        <title>Değerlendirme Yönetimi - Travel Ailydian</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen" style={{background: `linear-gradient(135deg, ${AILYDIAN_COLORS.dark} 0%, #1f1f23 50%, #2d2d35 100%)`}}>
        {/* Top Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}>
                  <MessageSquare className="w-5 h-5 text-white m-1.5" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Değerlendirme Yönetimi
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
                <Link href="/admin/reviews" className="flex items-center space-x-3 text-white rounded-lg px-3 py-2" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60`}}>
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">Değerlendirmeler</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {reviewsData && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.blue}20, ${AILYDIAN_COLORS.blue}40)`}}>
                        <MessageSquare className="w-6 h-6" style={{color: AILYDIAN_COLORS.blue}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Toplam</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(reviewsData.stats.total)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.warning}40)`}}>
                        <Clock className="w-6 h-6" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Bekliyor</p>
                        <p className="text-2xl font-bold text-gray-900">{reviewsData.stats.pending}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.success}20, ${AILYDIAN_COLORS.success}40)`}}>
                        <CheckCircle className="w-6 h-6" style={{color: AILYDIAN_COLORS.success}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Onaylı</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(reviewsData.stats.approved)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.error}20, ${AILYDIAN_COLORS.error}40)`}}>
                        <XCircle className="w-6 h-6" style={{color: AILYDIAN_COLORS.error}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Reddedildi</p>
                        <p className="text-2xl font-bold text-gray-900">{reviewsData.stats.rejected}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}20, ${AILYDIAN_COLORS.secondary}40)`}}>
                        <Flag className="w-6 h-6" style={{color: AILYDIAN_COLORS.primary}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Bayraklı</p>
                        <p className="text-2xl font-bold text-gray-900">{reviewsData.stats.flagged}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.warning}20, ${AILYDIAN_COLORS.warning}40)`}}>
                        <Star className="w-6 h-6" style={{color: AILYDIAN_COLORS.warning}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">Ort. Puan</p>
                        <p className="text-2xl font-bold text-gray-900">{reviewsData.stats.averageRating.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.purple}20, ${AILYDIAN_COLORS.purple}40)`}}>
                        <Brain className="w-6 h-6" style={{color: AILYDIAN_COLORS.purple}} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-600 uppercase">AI Modereli</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(reviewsData.stats.aiModerated)}</p>
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
                        placeholder="Değerlendirme ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Tüm Durumlar</option>
                      <option value="pending">Bekliyor</option>
                      <option value="approved">Onaylı</option>
                      <option value="rejected">Reddedildi</option>
                      <option value="flagged">Bayraklı</option>
                    </select>

                    <select
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Tüm Puanlar</option>
                      <option value="5">5 Yıldız</option>
                      <option value="4">4 Yıldız</option>
                      <option value="3">3 Yıldız</option>
                      <option value="2">2 Yıldız</option>
                      <option value="1">1 Yıldız</option>
                    </select>

                    <div className="flex space-x-2">
                      <button 
                        className="flex-1 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}, ${AILYDIAN_COLORS.secondary})`}}
                      >
                        <Filter className="w-4 h-4 mr-2 inline" />
                        Filtrele
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviewsData.reviews.map((review) => (
                    <div key={review.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                              {review.user.isVerified && (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                              )}
                              <span className="text-gray-500 text-sm">@{review.user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{review.location.name}, {review.location.city}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(review.status)}
                          <div className="flex items-center space-x-1">
                            <Brain className="w-4 h-4" style={{color: AILYDIAN_COLORS.purple}} />
                            <span className="text-sm font-medium" style={{color: AILYDIAN_COLORS.purple}}>
                              {Math.round(review.aiScore * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          {getRatingStars(review.rating)}
                          {getSentimentBadge(review.sentimentScore)}
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                        <p className="text-gray-700 leading-relaxed">{review.content}</p>
                        
                        {review.photos && review.photos.length > 0 && (
                          <div className="flex space-x-2 mt-3">
                            {review.photos.slice(0, 3).map((photo, index) => (
                              <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Eye className="w-6 h-6 text-gray-400" />
                              </div>
                            ))}
                            {review.photos.length > 3 && (
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                                +{review.photos.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Review Stats and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.helpfulVotes}/{review.totalVotes} faydalı</span>
                          </div>
                          {review.flagCount > 0 && (
                            <div className="flex items-center space-x-1">
                              <Flag className="w-4 h-4 text-red-500" />
                              <span>{review.flagCount} bayrak</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Duygu: {Math.round(review.sentimentScore * 100)}%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {review.status === 'pending' && (
                            <>
                              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                                <CheckCircle className="w-4 h-4 mr-2 inline" />
                                Onayla
                              </button>
                              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
                                <XCircle className="w-4 h-4 mr-2 inline" />
                                Reddet
                              </button>
                            </>
                          )}
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Moderation Info */}
                      {review.moderatedAt && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">
                                Modere edildi: {formatDate(review.moderatedAt)} - {review.moderatedBy}
                              </span>
                            </div>
                            {review.moderationReason && (
                              <span className="text-gray-500">Sebep: {review.moderationReason}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}