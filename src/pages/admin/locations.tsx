import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, MapPin, Star, 
  Globe, CheckCircle, XCircle, Clock, RefreshCw, Download,
  MoreHorizontal, ChevronDown, ArrowUpDown, Settings
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

interface Location {
  id: number;
  name: string;
  slug: string;
  category: string;
  city: string;
  country: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  verified: boolean;
  claimed: boolean;
  totalReviews: number;
  averageRating: number;
  totalPhotos: number;
  totalViews: number;
  googlePlaceId?: string;
  tripAdvisorId?: string;
  lastSyncGoogle?: string;
  lastSyncTripAdvisor?: string;
  createdAt: string;
  updatedAt: string;
}

interface Filters {
  search: string;
  status: string;
  category: string;
  city: string;
  country: string;
  verified: string;
  claimed: string;
  hasGoogleId: string;
  hasTripAdvisorId: string;
  minRating: string;
  maxRating: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    category: '',
    city: '',
    country: '',
    verified: '',
    claimed: '',
    hasGoogleId: '',
    hasTripAdvisorId: '',
    minRating: '',
    maxRating: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });

  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchLocations();
  }, [router, filters, pagination.page]);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key as keyof typeof params] === '') {
          delete params[key as keyof typeof params];
        }
      });

      const response = await adminService.getLocations(params);
      setLocations(response.locations);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        pages: response.pagination.pages
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch locations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (column: string) => {
    const newSortOrder = filters.sortBy === column && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: newSortOrder
    }));
  };

  const handleSelectLocation = (locationId: number) => {
    setSelectedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLocations.length === locations.length) {
      setSelectedLocations([]);
    } else {
      setSelectedLocations(locations.map(location => location.id));
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedLocations.length === 0) return;

    try {
      switch (action) {
        case 'activate':
          await adminService.bulkUpdateLocations(selectedLocations, { status: 'active' });
          break;
        case 'deactivate':
          await adminService.bulkUpdateLocations(selectedLocations, { status: 'inactive' });
          break;
        case 'verify':
          await adminService.bulkUpdateLocations(selectedLocations, { verified: true });
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete ${selectedLocations.length} locations?`)) {
            await adminService.bulkDeleteLocations(selectedLocations);
          }
          break;
        case 'sync-google':
          for (const locationId of selectedLocations) {
            await adminService.syncLocationWithGoogle(locationId);
          }
          break;
        case 'sync-tripadvisor':
          for (const locationId of selectedLocations) {
            await adminService.syncLocationWithTripAdvisor(locationId);
          }
          break;
      }
      setSelectedLocations([]);
      setShowBulkActions(false);
      fetchLocations();
    } catch (err: any) {
      alert(err.message || 'Bulk action failed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <>
      <Head>
        <title>Locations Management - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 mr-4">
                  ← Dashboard
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">
                  Locations Management
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/locations/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Location
                </Link>
                <button
                  onClick={fetchLocations}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {selectedLocations.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <span>{selectedLocations.length} selected</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showBulkActions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleBulkAction('activate')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => handleBulkAction('deactivate')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Deactivate
                          </button>
                          <button
                            onClick={() => handleBulkAction('verify')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleBulkAction('sync-google')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sync Google
                          </button>
                          <button
                            onClick={() => handleBulkAction('sync-tripadvisor')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sync TripAdvisor
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button
                            onClick={() => handleBulkAction('delete')}
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verified</label>
                    <select
                      value={filters.verified}
                      onChange={(e) => handleFilterChange('verified', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All</option>
                      <option value="true">Verified</option>
                      <option value="false">Not Verified</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Claimed</label>
                    <select
                      value={filters.claimed}
                      onChange={(e) => handleFilterChange('claimed', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All</option>
                      <option value="true">Claimed</option>
                      <option value="false">Not Claimed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => handleFilterChange('minRating', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                      <option value="3.0">3.0+ Stars</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Locations Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading locations...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button 
                    onClick={fetchLocations}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="w-12 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedLocations.length === locations.length && locations.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">
                          <button
                            onClick={() => handleSort('name')}
                            className="flex items-center space-x-1 hover:text-gray-900"
                          >
                            <span>Name</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Location</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">
                          <button
                            onClick={() => handleSort('status')}
                            className="flex items-center space-x-1 hover:text-gray-900"
                          >
                            <span>Status</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">
                          <button
                            onClick={() => handleSort('averageRating')}
                            className="flex items-center space-x-1 hover:text-gray-900"
                          >
                            <span>Rating</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Stats</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">External</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">
                          <button
                            onClick={() => handleSort('updatedAt')}
                            className="flex items-center space-x-1 hover:text-gray-900"
                          >
                            <span>Updated</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {locations.map((location) => (
                        <tr key={location.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location.id)}
                              onChange={() => handleSelectLocation(location.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">{location.name}</span>
                                  {location.verified && (
                                    <CheckCircle className="w-4 h-4 text-green-500" title="Verified" />
                                  )}
                                  {location.claimed && (
                                    <Settings className="w-4 h-4 text-blue-500" title="Claimed" />
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">{location.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm">
                              <div className="text-gray-900">{location.city}</div>
                              <div className="text-gray-500">{location.country}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(location.status)}`}>
                              {location.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm font-medium">{location.averageRating.toFixed(1)}</span>
                              <span className="text-xs text-gray-500 ml-1">({location.totalReviews})</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs text-gray-600">
                              <div>{formatNumber(location.totalViews)} views</div>
                              <div>{location.totalPhotos} photos</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-1">
                              {location.googlePlaceId && (
                                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center" title="Google">
                                  <Globe className="w-3 h-3" />
                                </div>
                              )}
                              {location.tripAdvisorId && (
                                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center" title="TripAdvisor">
                                  <Globe className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs text-gray-500">
                              {new Date(location.updatedAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center space-x-1">
                              <Link
                                href={`/location/${location.slug}`}
                                className="p-1 text-gray-400 hover:text-blue-600"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/admin/locations/${location.id}/edit`}
                                className="p-1 text-gray-400 hover:text-green-600"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this location?')) {
                                    adminService.deleteLocation(location.id).then(() => fetchLocations());
                                  }
                                }}
                                className="p-1 text-gray-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex justify-between items-center sm:hidden">
                        <button
                          onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                          disabled={pagination.page === 1}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-gray-700">
                          Page {pagination.page} of {pagination.pages}
                        </span>
                        <button
                          onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                          disabled={pagination.page === pagination.pages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                            {' '} to{' '}
                            <span className="font-medium">
                              {Math.min(pagination.page * pagination.limit, pagination.total)}
                            </span>
                            {' '} of{' '}
                            <span className="font-medium">{pagination.total}</span>
                            {' '} results
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                              disabled={pagination.page === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                            >
                              Previous
                            </button>
                            
                            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                              let pageNum;
                              if (pagination.pages <= 5) {
                                pageNum = i + 1;
                              } else if (pagination.page <= 3) {
                                pageNum = i + 1;
                              } else if (pagination.page >= pagination.pages - 2) {
                                pageNum = pagination.pages - 4 + i;
                              } else {
                                pageNum = pagination.page - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    pagination.page === pageNum
                                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            
                            <button
                              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                              disabled={pagination.page === pagination.pages}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                            >
                              Next
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}