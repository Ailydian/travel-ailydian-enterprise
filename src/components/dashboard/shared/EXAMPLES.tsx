import logger from '../../../lib/logger';

/**
 * Usage Examples for Shared Dashboard Components
 *
 * This file demonstrates how to use the shared components in real-world scenarios.
 */

import React, { useState } from 'react';
import {
  StatCard,
  PropertyCard,
  BookingCard,
  StatusBadge,
  EmptyState,
  LoadingState,
  DataTable,
  PhotoUploader,
  FilterBar,
  Column,
  RowAction,
  FilterValues,
  UploadedImage,
} from './index';
import {
  DollarSign,
  Home,
  Users,
  Calendar,
  Edit,
  Trash,
  Eye,
} from 'lucide-react';

// ============================================================================
// Example 1: Dashboard Stats Overview
// ============================================================================

export const DashboardStatsExample = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        icon={DollarSign}
        trend={12.5}
        variant="success"
        description="vs last month"
      />
      <StatCard
        title="Properties"
        value={24}
        icon={Home}
        trend={8.2}
        variant="primary"
      />
      <StatCard
        title="Active Bookings"
        value={156}
        icon={Calendar}
        trend={-3.1}
        variant="warning"
      />
      <StatCard
        title="Total Guests"
        value={892}
        icon={Users}
        trend={15.8}
        variant="default"
      />
    </div>
  );
};

// ============================================================================
// Example 2: Property Grid with Loading State
// ============================================================================

export const PropertyGridExample = () => {
  const [loading, setLoading] = useState(false);

  const properties = [
    {
      id: '1',
      title: 'Luxury Beach Villa',
      location: 'Malibu, California',
      image: 'https://picsum.photos/400/300?random=1',
      price: 450,
      rating: 4.8,
      reviewCount: 124,
      status: 'active' as const,
      bedrooms: 4,
      maxGuests: 8,
    },
    {
      id: '2',
      title: 'Mountain Retreat',
      location: 'Aspen, Colorado',
      image: 'https://picsum.photos/400/300?random=2',
      price: 380,
      rating: 4.9,
      reviewCount: 89,
      status: 'active' as const,
      bedrooms: 3,
      maxGuests: 6,
    },
    {
      id: '3',
      title: 'Downtown Loft',
      location: 'New York, NY',
      image: 'https://picsum.photos/400/300?random=3',
      price: 220,
      rating: 4.6,
      reviewCount: 156,
      status: 'pending' as const,
      bedrooms: 2,
      maxGuests: 4,
    },
  ];

  const handleEdit = (id: string) => {
    logger.debug('Edit property:', { component: 'Examples', metadata: id });
  };

  const handleView = (id: string) => {
    logger.debug('View property:', { component: 'Examples', metadata: id });
  };

  const handleToggleStatus = (id: string) => {
    logger.debug('Toggle status:', { component: 'Examples', metadata: id });
  };

  if (loading) {
    return <LoadingState variant="card" count={3} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          {...property}
          onEdit={handleEdit}
          onView={handleView}
          onToggleStatus={handleToggleStatus}
        />
      ))}
    </div>
  );
};

// ============================================================================
// Example 3: Bookings List with Filters
// ============================================================================

export const BookingsWithFiltersExample = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [loading, setLoading] = useState(false);

  const bookings = [
    {
      id: '1',
      guestName: 'John Doe',
      guestAvatar: 'https://i.pravatar.cc/150?img=1',
      propertyName: 'Luxury Beach Villa',
      propertyImage: 'https://picsum.photos/400/200?random=1',
      checkIn: '2025-01-15',
      checkOut: '2025-01-20',
      price: 2250,
      status: 'confirmed' as const,
      guests: 4,
      nights: 5,
    },
    {
      id: '2',
      guestName: 'Jane Smith',
      guestAvatar: 'https://i.pravatar.cc/150?img=2',
      propertyName: 'Mountain Retreat',
      checkIn: '2025-01-18',
      checkOut: '2025-01-22',
      price: 1520,
      status: 'pending' as const,
      guests: 2,
      nights: 4,
    },
  ];

  const statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        showSearch
        searchPlaceholder="Search bookings..."
        showDateRange
        showStatus
        statusOptions={statusOptions}
      />

      {loading ? (
        <LoadingState variant="list" count={3} />
      ) : bookings.length === 0 ? (
        <EmptyState
          variant="search"
          title="No bookings found"
          description="Try adjusting your search criteria"
          actionLabel="Clear Filters"
          onAction={() => setFilters({})}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              {...booking}
              onConfirm={(id) => logger.debug('Confirm:', { component: 'Examples', metadata: id })}
              onCancel={(id) => logger.debug('Cancel:', { component: 'Examples', metadata: id })}
              onViewDetails={(id) => logger.debug('View:', { component: 'Examples', metadata: id })}
              onMessage={(id) => logger.debug('Message:', { component: 'Examples', metadata: id })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Example 4: Data Table with Users
// ============================================================================

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export const UsersDataTableExample = () => {
  const [loading, setLoading] = useState(false);

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Property Owner',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Guest',
      status: 'active',
      joinDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Admin',
      status: 'inactive',
      joinDate: '2023-12-10',
    },
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {user.role}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => <StatusBadge status={user.status} size="sm" />,
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      render: (user) => new Date(user.joinDate).toLocaleDateString(),
    },
  ];

  const actions: RowAction<User>[] = [
    {
      label: 'View Profile',
      icon: Eye,
      onClick: (user) => logger.debug('View:', { component: 'Examples', metadata: user }),
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: (user) => logger.debug('Edit:', { component: 'Examples', metadata: user }),
    },
    {
      label: 'Delete',
      icon: Trash,
      onClick: (user) => logger.debug('Delete:', { component: 'Examples', metadata: user }),
      danger: true,
      show: (user) => user.role !== 'Admin',
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      rowActions={actions}
      keyExtractor={(user) => user.id}
      loading={loading}
      pagination
      itemsPerPage={10}
      emptyState={{
        title: 'No users found',
        description: 'Start by inviting team members',
        actionLabel: 'Invite User',
        onAction: () => logger.debug('Invite user', { component: 'Examples' }),
      }}
    />
  );
};

// ============================================================================
// Example 5: Photo Uploader for Property
// ============================================================================

export const PropertyPhotosExample = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleUpload = async (
    file: File,
    onProgress: (progress: number) => void
  ): Promise<string> => {
    // Simulate upload progress
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          // Simulate successful upload
          resolve(`https://example.com/uploads/${file.name}`);
        }
      }, 200);
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Property Photos</h2>

      <PhotoUploader
        images={images}
        onChange={setImages}
        requirements={{
          minPhotos: 5,
          maxPhotos: 20,
          maxFileSize: 10 * 1024 * 1024,
          minWidth: 1920,
          minHeight: 1080,
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
          enableCompression: true,
          compressionQuality: 0.85,
          maxDimension: 2400,
        }}
        onUpload={handleUpload}
      />
    </div>
  );
};

// ============================================================================
// Example 6: Complete Dashboard Page
// ============================================================================

export const CompleteDashboardExample = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/5 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-300 mt-1">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>

        {/* Stats */}
        <DashboardStatsExample />

        {/* Tabs */}
        <div className="bg-white/5 rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'properties', 'bookings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="text-center py-12">
                <EmptyState
                  variant="no-data"
                  title="Overview coming soon"
                  description="We're working on analytics and insights for your dashboard"
                  size="sm"
                />
              </div>
            )}
            {activeTab === 'properties' && <PropertyGridExample />}
            {activeTab === 'bookings' && <BookingsWithFiltersExample />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Example 7: Status Badges Showcase
// ============================================================================

export const StatusBadgesExample = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Booking Statuses</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="confirmed" />
          <StatusBadge status="pending" />
          <StatusBadge status="cancelled" />
          <StatusBadge status="completed" />
          <StatusBadge status="checked-in" />
          <StatusBadge status="checked-out" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Property Statuses</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="active" />
          <StatusBadge status="inactive" />
          <StatusBadge status="pending" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sizes</h3>
        <div className="flex items-center gap-2">
          <StatusBadge status="confirmed" size="sm" />
          <StatusBadge status="confirmed" size="md" />
          <StatusBadge status="confirmed" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Without Icons</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="confirmed" showIcon={false} />
          <StatusBadge status="pending" showIcon={false} />
          <StatusBadge status="cancelled" showIcon={false} />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Export all examples
// ============================================================================

export default {
  DashboardStatsExample,
  PropertyGridExample,
  BookingsWithFiltersExample,
  UsersDataTableExample,
  PropertyPhotosExample,
  CompleteDashboardExample,
  StatusBadgesExample,
};
