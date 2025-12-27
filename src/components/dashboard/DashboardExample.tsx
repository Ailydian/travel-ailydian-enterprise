/**
 * Dashboard Example Page
 *
 * This is a complete example showing how to use the dashboard layout system.
 * Copy this file to your pages directory and customize as needed.
 *
 * Location: src/app/dashboard/page.tsx (Next.js App Router)
 * or: src/pages/dashboard/index.tsx (Next.js Pages Router)
 */

'use client';

import React from 'react';
import { DashboardShell } from '@/components/dashboard';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Home } from
'lucide-react';

/**
 * Stat Card Component
 * Displays a key metric with icon and trend
 */
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{className?: string;}>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon
}) =>
<div className="bg-lydian-glass-dark rounded-lg border border-lydian-border-light/10 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-lydian-primary-lighter rounded-lg">
        <Icon className="h-6 w-6 text-lydian-primary" />
      </div>
      <div
      className={`flex items-center space-x-1 text-sm font-medium ${
      isPositive ? 'text-green-600' : 'text-red-600'}`
      }>

        {isPositive ?
      <TrendingUp className="h-4 w-4" /> :

      <TrendingDown className="h-4 w-4" />
      }
        <span>{change}</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-lydian-text-inverse mb-1">{value}</h3>
    <p className="text-sm text-lydian-text-muted">{title}</p>
  </div>;


/**
 * Recent Booking Component
 */
interface Booking {
  id: string;
  guestName: string;
  property: string;
  checkIn: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const BookingRow: React.FC<{booking: Booking;}> = ({ booking }) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <tr className="hover:bg-lydian-glass-dark">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-lydian-text-inverse">{booking.guestName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-lydian-text-muted">{booking.property}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-lydian-text-muted">{booking.checkIn}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-lydian-text-inverse">{booking.amount}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
          statusColors[booking.status]}`
          }>

          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </td>
    </tr>);

};

/**
 * Main Dashboard Page
 */
export default function DashboardPage() {
  // Mock data - replace with actual API calls
  const stats = [
  {
    title: 'Total Properties',
    value: '12',
    change: '+2 this month',
    isPositive: true,
    icon: Home
  },
  {
    title: 'Active Bookings',
    value: '34',
    change: '+12%',
    isPositive: true,
    icon: Calendar
  },
  {
    title: 'Total Guests',
    value: '1,234',
    change: '+18%',
    isPositive: true,
    icon: Users
  },
  {
    title: 'Monthly Revenue',
    value: '$24,500',
    change: '+8%',
    isPositive: true,
    icon: DollarSign
  }];


  const recentBookings: Booking[] = [
  {
    id: '1',
    guestName: 'John Smith',
    property: 'Sunset Villa',
    checkIn: 'Dec 25, 2025',
    amount: '$1,200',
    status: 'confirmed'
  },
  {
    id: '2',
    guestName: 'Emma Johnson',
    property: 'Ocean View Apartment',
    checkIn: 'Dec 28, 2025',
    amount: '$850',
    status: 'confirmed'
  },
  {
    id: '3',
    guestName: 'Michael Brown',
    property: 'Mountain Retreat',
    checkIn: 'Jan 2, 2026',
    amount: '$2,100',
    status: 'pending'
  },
  {
    id: '4',
    guestName: 'Sarah Davis',
    property: 'Sunset Villa',
    checkIn: 'Dec 30, 2025',
    amount: '$1,200',
    status: 'confirmed'
  }];


  return (
    <DashboardShell
      title="Overview"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-lydian-text-inverse mb-2">
          Welcome back, John!
        </h1>
        <p className="text-lydian-text-muted">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) =>
        <StatCard key={index} {...stat} />
        )}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-lydian-glass-dark rounded-lg border border-lydian-border-light/10 shadow-sm">
        <div className="px-6 py-4 border-b border-lydian-border-light/10">
          <h2 className="text-lg font-semibold text-lydian-text-inverse">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-lydian-border">
            <thead className="bg-lydian-glass-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-lydian-text-muted uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lydian-text-muted uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lydian-text-muted uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lydian-text-muted uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lydian-text-muted uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-lydian-glass-dark divide-y divide-lydian-border">
              {recentBookings.map((booking) =>
              <BookingRow key={booking.id} booking={booking} />
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-lydian-border-light/10 bg-lydian-glass-dark">
          <a
            href="/dashboard/bookings"
            className="text-sm font-medium text-lydian-primary hover:text-lydian-primary-dark">

            View all bookings →
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-6 bg-lydian-glass-dark border border-lydian-border-light/10 rounded-lg hover:shadow-lg transition-shadow text-left">
          <Calendar className="h-8 w-8 text-lydian-primary mb-3" />
          <h3 className="font-semibold text-lydian-text-inverse mb-1">Manage Calendar</h3>
          <p className="text-sm text-lydian-text-muted">
            Update availability and pricing
          </p>
        </button>

        <button className="p-6 bg-lydian-glass-dark border border-lydian-border-light/10 rounded-lg hover:shadow-lg transition-shadow text-left">
          <Users className="h-8 w-8 text-lydian-primary mb-3" />
          <h3 className="font-semibold text-lydian-text-inverse mb-1">Guest Messages</h3>
          <p className="text-sm text-lydian-text-muted">
            Respond to guest inquiries
          </p>
        </button>

        <button className="p-6 bg-lydian-glass-dark border border-lydian-border-light/10 rounded-lg hover:shadow-lg transition-shadow text-left">
          <DollarSign className="h-8 w-8 text-lydian-primary mb-3" />
          <h3 className="font-semibold text-lydian-text-inverse mb-1">View Earnings</h3>
          <p className="text-sm text-lydian-text-muted">
            Check your financial reports
          </p>
        </button>
      </div>
    </DashboardShell>);

}