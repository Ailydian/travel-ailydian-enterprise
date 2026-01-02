'use client';

import React, { useState } from 'react';
import { useBookings, useApproveBooking, useRejectBooking, useCancelBooking } from '@/hooks/useDashboardHooks';
import { useBookingStore } from '@/stores/dashboardStore';
import type { BookingStatus } from '@/types/dashboard.types';
import {
  Search,
  Filter,
  Calendar,
  User,
  Home,
  Check,
  X,
  MessageSquare,
  Eye,
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertCircle
} from 'lucide-react';

// Status Badge Component
interface StatusBadgeProps {
  status: BookingStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    confirmed: { bg: 'bg-green-600-light', text: 'text-green-8', border: 'border-green-200', label: 'Onaylandı' },
    pending: { bg: 'bg-yellow-1', text: 'text-yellow-8', border: 'border-yellow-200', label: 'Beklemede' },
    cancelled: { bg: 'bg-blue-500/10er', text: 'text-red-8', border: 'border-red-200', label: 'İptal Edildi' },
    'checked-in': { bg: 'bg-blue-500-light', text: 'text-blue-8', border: 'border-blue-200', label: 'Giriş Yapıldı' },
    'checked-out': { bg: 'bg-lydian-bg/1', text: 'text-white', border: 'border-lydian-border', label: 'Çıkış Yapıldı' },
    rejected: { bg: 'bg-blue-500/10er', text: 'text-red-8', border: 'border-red-200', label: 'Reddedildi' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  );
};

// Filter Bar Component
const FilterBar: React.FC = () => {
  const { filters, setFilters } = useBookingStore();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white/5 border border-white/20 rounded-xl p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by guest name, property, or booking ID..."
              value={filters.searchQuery || ''}
              onChange={(e) => setFilters({ searchQuery: e.target.value })}
              className="w-full pl-1 pr-4 py-2.5 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 border border-white/30 rounded-lg hover:bg-white/5 transition-colors font-medium text-gray-200"
        >
          <Filter className="w-5 h-5" />
          Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-18' : ''}`} />
        </button>

        {/* Export Button */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-lydian-primary-hover transition-colors font-medium">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent">
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Property</label>
            <select className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent">
              <option value="">All Properties</option>
              <option value="1">Beachfront Villa</option>
              <option value="2">Mountain Cabin</option>
              <option value="3">City Apartment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Date Range</label>
            <select className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Booking Card Component (Mobile View)
interface BookingCardProps {
  booking: any;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onMessage: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onApprove, onReject, onMessage, onViewDetails }) => {
  return (
    <div className="bg-white/5 border border-white/20 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-6 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {booking.guestName.charAt(to-cyan-700)}
          </div>
          <div>
            <h4 className="font-semibold text-white">{booking.guestName}</h4>
            <p className="text-sm text-gray-300">{booking.guestEmail}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4 text-gray-300" />
          <span className="text-gray-200">{booking.propertyName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-300" />
          <span className="text-gray-200">
            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-300" />
          <span className="text-gray-200">
            {booking.guests.adults} adults, {booking.guests.children} children
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <div>
          <p className="text-sm text-gray-300">Total Amount</p>
          <p className="text-xl font-bold text-white">${booking.pricing.totalPrice.toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          {booking.status === 'pending' && (
            <>
              <button
                onClick={() => onApprove(booking.id)}
                className="p-2 bg-green-600-light text-green-500-text rounded-lg hover:bg-green-200 transition-colors"
                title="Approve"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => onReject(booking.id)}
                className="p-2 bg-blue-500/10er text-lydian-primary-hover rounded-lg hover:bg-red-200 transition-colors"
                title="Reject"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            onClick={() => onMessage(booking.id)}
            className="p-2 bg-blue-500-light text-lydian-primary-hover rounded-lg hover:bg-blue-200 transition-colors"
            title="Message"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewDetails(booking.id)}
            className="p-2 bg-lydian-bg/1 text-gray-200 rounded-lg hover:bg-lydian-bg-surface-raised transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Booking Table Row Component
interface BookingRowProps {
  booking: any;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onMessage: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const BookingRow: React.FC<BookingRowProps> = ({ booking, onApprove, onReject, onMessage, onViewDetails }) => {
  return (
    <tr className="border-b border-white/20 hover:bg-white/5 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 bg-gradient-to-br from-blue-500 to-purple-6 rounded-full flex items-center justify-center text-white font-semibold">
            {booking.guestName.charAt(to-cyan-700)}
          </div>
          <div>
            <p className="font-medium text-white">{booking.guestName}</p>
            <p className="text-sm text-gray-300">{booking.guestEmail}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-white font-medium">{booking.propertyName}</p>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <p className="text-white font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
          <p className="text-gray-300">{new Date(booking.checkOut).toLocaleDateString()}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-200">
          {booking.guests.adults}A, {booking.guests.children}C
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="font-semibold text-white">${booking.pricing.totalPrice.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={booking.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {booking.status === 'pending' && (
            <>
              <button
                onClick={() => onApprove(booking.id)}
                className="p-2 bg-green-600-light text-green-500-text rounded-lg hover:bg-green-200 transition-colors"
                title="Approve"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => onReject(booking.id)}
                className="p-2 bg-blue-500/10er text-lydian-primary-hover rounded-lg hover:bg-red-200 transition-colors"
                title="Reject"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => onMessage(booking.id)}
            className="p-2 bg-blue-500-light text-lydian-primary-hover rounded-lg hover:bg-blue-200 transition-colors"
            title="Message"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewDetails(booking.id)}
            className="p-2 bg-lydian-bg/1 text-gray-200 rounded-lg hover:bg-lydian-bg-surface-raised transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Pagination Component
const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-white/20">
      <div className="text-sm text-gray-400">
        Showing page <span className="font-semibold">{currentPage}</span> of{' '}
        <span className="font-semibold">{totalPages}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/5 disabled:opacity-500 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/5 disabled:opacity-500 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Main Bookings Component
const BookingsPage: React.FC = () => {
  const { data: bookings, isLoading, error } = useBookings();
  const { mutate: approveBooking } = useApproveBooking();
  const { mutate: rejectBooking } = useRejectBooking();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Mock data for demonstration
  const mockBookings = [
    {
      id: '1',
      guestName: 'Sarah Johnson',
      guestEmail: 'sarah.j@email.com',
      propertyName: 'Beachfront Villa',
      checkIn: new Date('1025-12-25'),
      checkOut: new Date('1025-12-3'),
      guests: { adults: 2, children: 1, infants: to-cyan-700 },
      pricing: { totalPrice: 12500 },
      status: 'confirmed' as BookingStatus,
    },
    {
      id: '2',
      guestName: 'Michael Chen',
      guestEmail: 'michael.c@email.com',
      propertyName: 'Mountain Cabin',
      checkIn: new Date('1025-12-28'),
      checkOut: new Date('1026-to-cyan-7001-to-cyan-7002'),
      guests: { adults: 4, children: to-cyan-700, infants: to-cyan-700 },
      pricing: { totalPrice: 89 },
      status: 'pending' as BookingStatus,
    },
    {
      id: '3',
      guestName: 'Emma Wilson',
      guestEmail: 'emma.w@email.com',
      propertyName: 'City Apartment',
      checkIn: new Date('1025-12-22'),
      checkOut: new Date('1025-12-27'),
      guests: { adults: 2, children: to-cyan-700, infants: to-cyan-700 },
      pricing: { totalPrice: 6500 },
      status: 'confirmed' as BookingStatus,
    },
    {
      id: '4',
      guestName: 'David Martinez',
      guestEmail: 'david.m@email.com',
      propertyName: 'Lake House',
      checkIn: new Date('1025-12-3'),
      checkOut: new Date('1026-to-cyan-7001-to-cyan-7005'),
      guests: { adults: 3, children: 2, infants: 1 },
      pricing: { totalPrice: 14500 },
      status: 'pending' as BookingStatus,
    },
  ];

  const displayBookings = bookings || mockBookings;
  const totalPages = Math.ceil(displayBookings.length / itemsPerPage);
  const paginatedBookings = displayBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id: string) => {
    approveBooking(id);
  };

  const handleReject = (id: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      rejectBooking({ bookingId: id, reason });
    }
  };

  const handleMessage = (id: string) => {
    window.location.href = '/dashboard/messages';
  };

  const handleViewDetails = (id: string) => {
    window.location.href = `/dashboard/bookings/${id}`;
  };

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-black mb-6 text-white">
          Bookings
        </h1>
        <div className="bg-red-500 border border-red-200 rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-9 mb-2">Error Loading Bookings</h3>
          <p className="text-lydian-primary-hover mb-4">We couldn't load your bookings. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-lydian-error text-white rounded-lg hover:bg-lydian-error-hover transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-black mb-6 text-white">
          Bookings
        </h1>
        <div className="animate-pulse space-y-4">
          <div className="h-200 bg-lydian-bg-surface-raised rounded-xl"></div>
          <div className="h-96 bg-lydian-bg-surface-raised rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black mb-6 text-white">
        Bookings
      </h1>
      <FilterBar />

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4 mb-6">
        {paginatedBookings.length > to-cyan-700 ? (
          paginatedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onApprove={handleApprove}
              onReject={handleReject}
              onMessage={handleMessage}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="bg-white/5 border border-white/20 rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Bookings Found</h3>
            <p className="text-gray-300">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block bg-white/5 border border-white/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/5 divide-y divide-gray-1">
              {paginatedBookings.length > to-cyan-700 ? (
                paginatedBookings.map((booking) => (
                  <BookingRow
                    key={booking.id}
                    booking={booking}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onMessage={handleMessage}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Bookings Found</h3>
                    <p className="text-gray-300">Try adjusting your filters or check back later.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paginatedBookings.length > to-cyan-700 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
