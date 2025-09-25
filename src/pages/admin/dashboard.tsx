import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Users, MapPin, MessageSquare, Camera, Star, TrendingUp, TrendingDown,
  Activity, Clock, Globe, AlertTriangle, CheckCircle, RefreshCw,
  Settings, LogOut, Eye, Edit, Trash2, Calendar, Download
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

interface DashboardData {
  overview: {
    totalLocations: number;
    totalReviews: number;
    totalUsers: number;
    totalPhotos: number;
    averageRating: number;
    monthlyGrowth: {
      locations: number;
      reviews: number;
      users: number;
    };
  };
  recentActivity: Array<{
    type: 'review' | 'user' | 'location' | 'photo';
    description: string;
    timestamp: string;
    user?: string;
    location?: string;
  }>;
  topLocations: Array<{
    id: number;
    name: string;
    rating: number;
    reviews: number;
    views: number;
  }>;
  platformStats: {
    googleSynced: number;
    tripAdvisorSynced: number;
    lastSync: string;
    syncErrors: number;
  };
  moderationQueue: {
    pendingReviews: number;
    flaggedContent: number;
    reportedUsers: number;
  };
  analytics: {
    dailyStats: Array<{
      date: string;
      locations: number;
      reviews: number;
      users: number;
      views: number;
    }>;
  };
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setAdminData(adminService.getStoredAdminData());
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getDashboardStats();
      setDashboardData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review': return <MessageSquare className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'photo': return <Camera className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Travel Ailydian</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Travel Ailydian Admin
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {adminData?.email}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {adminData?.role?.replace('_', ' ').toUpperCase()}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Navigation */}
        <div className="flex">
          <nav className="bg-gray-800 w-64 min-h-screen">
            <div className="p-4">
              <div className="space-y-2">
                <Link href="/admin/dashboard" className="flex items-center space-x-3 text-white bg-gray-700 rounded-lg px-3 py-2">
                  <BarChart className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/admin/locations" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <MapPin className="w-5 h-5" />
                  <span>Locations</span>
                </Link>
                <Link href="/admin/users" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <Users className="w-5 h-5" />
                  <span>Users</span>
                </Link>
                <Link href="/admin/reviews" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>Reviews</span>
                </Link>
                <Link href="/admin/platforms" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span>External Platforms</span>
                </Link>
                <Link href="/admin/analytics" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <TrendingUp className="w-5 h-5" />
                  <span>Analytics</span>
                </Link>
                <Link href="/admin/settings" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {dashboardData && (
              <>
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <MapPin className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Locations</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(dashboardData.overview.totalLocations)}
                        </p>
                        <p className="text-sm text-green-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {formatPercentage(dashboardData.overview.monthlyGrowth.locations)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <MessageSquare className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Reviews</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(dashboardData.overview.totalReviews)}
                        </p>
                        <p className="text-sm text-green-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {formatPercentage(dashboardData.overview.monthlyGrowth.reviews)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(dashboardData.overview.totalUsers)}
                        </p>
                        <p className="text-sm text-green-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {formatPercentage(dashboardData.overview.monthlyGrowth.users)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <Camera className="w-8 h-8 text-yellow-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Photos</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(dashboardData.overview.totalPhotos)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                      <Star className="w-8 h-8 text-orange-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {dashboardData.overview.averageRating.toFixed(1)}
                        </p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= Math.floor(dashboardData.overview.averageRating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Daily Activity Chart */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Daily Activity</h3>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded">30D</button>
                        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">7D</button>
                        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">24H</button>
                      </div>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData.analytics.dailyStats}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis />
                          <Tooltip 
                            labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          />
                          <Area type="monotone" dataKey="reviews" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="locations" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="users" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Locations</h3>
                    <div className="space-y-4">
                      {dashboardData.topLocations.map((location, index) => (
                        <div key={location.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-gray-900">{location.name}</p>
                              <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                  {location.rating}
                                </span>
                                <span>{location.reviews} reviews</span>
                                <span>{formatNumber(location.views)} views</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                      <button 
                        onClick={fetchDashboardData}
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {dashboardData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.description}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(activity.timestamp).toLocaleString()}</span>
                              {activity.user && <span>• {activity.user}</span>}
                              {activity.location && <span>• {activity.location}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Status & Actions */}
                  <div className="space-y-6">
                    {/* External Platform Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">External Platforms</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Google Synced</span>
                          <span className="font-medium text-gray-900">{dashboardData.platformStats.googleSynced}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">TripAdvisor Synced</span>
                          <span className="font-medium text-gray-900">{dashboardData.platformStats.tripAdvisorSynced}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Sync Errors</span>
                          <span className="font-medium text-red-600">{dashboardData.platformStats.syncErrors}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            Last sync: {new Date(dashboardData.platformStats.lastSync).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Moderation Queue */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Moderation Queue</h4>
                      <div className="space-y-3">
                        <Link href="/admin/reviews?status=pending" className="flex items-center justify-between p-2 text-sm border border-orange-200 bg-orange-50 rounded hover:bg-orange-100">
                          <span>Pending Reviews</span>
                          <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            {dashboardData.moderationQueue.pendingReviews}
                          </span>
                        </Link>
                        <Link href="/admin/content?flagged=true" className="flex items-center justify-between p-2 text-sm border border-red-200 bg-red-50 rounded hover:bg-red-100">
                          <span>Flagged Content</span>
                          <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            {dashboardData.moderationQueue.flaggedContent}
                          </span>
                        </Link>
                        <Link href="/admin/users?reported=true" className="flex items-center justify-between p-2 text-sm border border-yellow-200 bg-yellow-50 rounded hover:bg-yellow-100">
                          <span>Reported Users</span>
                          <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            {dashboardData.moderationQueue.reportedUsers}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                      <div className="space-y-2">
                        <Link href="/admin/locations/new" className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Add Location
                        </Link>
                        <Link href="/admin/sync" className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Sync Platforms
                        </Link>
                        <Link href="/admin/export" className="block w-full text-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                          Export Data
                        </Link>
                      </div>
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