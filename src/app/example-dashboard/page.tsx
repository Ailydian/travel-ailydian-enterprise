/**
 * Example Dashboard Page - Design System Showcase
 * Demonstrates: Cards, Buttons, Typography, Colors, Animations
 *
 * This page showcases:
 * - WCAG AAA color combinations
 * - Typography scale
 * - Responsive grid layout
 * - Stagger animations
 * - FadeInView scroll animations
 */

'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  StaggerChildren,
  FadeInView,
} from '@/components/ui';
import { colors, textColors, typography } from '@/styles/design-system';

// ============================================================================
// STAT CARD COMPONENT
// ============================================================================

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'error';
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const colorMap = {
    primary: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      iconBg: 'bg-red-100',
    },
  };

  const isPositive = change > 0;
  const { bg, text, iconBg } = colorMap[color];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            <div className="flex items-center gap-1 text-sm">
              <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${iconBg}`}>
            <div className={text}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// RECENT BOOKING COMPONENT
// ============================================================================

interface Booking {
  id: string;
  customer: string;
  tour: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const recentBookings: Booking[] = [
  { id: 'BK-001', customer: 'Emma Watson', tour: 'Istanbul Heritage Tour', date: '2025-01-15', amount: 299, status: 'confirmed' },
  { id: 'BK-002', customer: 'Michael Chen', tour: 'Cappadocia Hot Air Balloon', date: '2025-01-18', amount: 450, status: 'confirmed' },
  { id: 'BK-003', customer: 'Sarah Johnson', tour: 'Ephesus Ancient City', date: '2025-01-20', amount: 189, status: 'pending' },
  { id: 'BK-004', customer: 'David Kim', tour: 'Pamukkale Natural Wonder', date: '2025-01-22', amount: 220, status: 'confirmed' },
  { id: 'BK-005', customer: 'Lisa Anderson', tour: 'Antalya Coastal Adventure', date: '2025-01-25', amount: 350, status: 'cancelled' },
];

function RecentBookingsTable() {
  const statusColors = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'error',
  } as const;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest customer bookings and their status</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {booking.tour}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={statusColors[booking.status]}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// QUICK ACTIONS COMPONENT
// ============================================================================

function QuickActions() {
  const actions = [
    {
      title: 'Create New Tour',
      description: 'Add a new tour package to your catalog',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'primary' as const,
    },
    {
      title: 'Process Booking',
      description: 'Manually add a customer booking',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'success' as const,
    },
    {
      title: 'View Reports',
      description: 'Generate and download reports',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'warning' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                  {action.icon}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-0.5">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// MAIN DASHBOARD PAGE
// ============================================================================

export default function ExampleDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <FadeInView>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Here's what's happening with your travel business today
          </p>
        </div>
      </FadeInView>

      {/* Stats Grid */}
      <StaggerChildren staggerDelay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value="1,284"
            change={12.5}
            color="primary"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          <StatCard
            title="Revenue"
            value="$45,231"
            change={8.2}
            color="success"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <StatCard
            title="Active Tours"
            value="68"
            change={-3.1}
            color="warning"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <StatCard
            title="Satisfaction Rate"
            value="96%"
            change={2.4}
            color="success"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </StaggerChildren>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings (2/3 width) */}
        <FadeInView className="lg:col-span-2">
          <RecentBookingsTable />
        </FadeInView>

        {/* Quick Actions (1/3 width) */}
        <FadeInView>
          <QuickActions />
        </FadeInView>
      </div>

      {/* Design System Showcase */}
      <FadeInView>
        <Card>
          <CardHeader>
            <CardTitle>Design System Showcase</CardTitle>
            <CardDescription>
              WCAG AAA compliant buttons with perfect color contrast ratios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Button Variants */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Button Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary (8.6:1)</Button>
                  <Button variant="secondary">Secondary (9.2:1)</Button>
                  <Button variant="success">Success (8.1:1)</Button>
                  <Button variant="warning">Warning (10.5:1)</Button>
                  <Button variant="error">Error (7.8:1)</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="xs">Extra Small</Button>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" size="xl">Extra Large</Button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Button States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button
                    variant="primary"
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    }
                  >
                    With Icon
                  </Button>
                  <Button variant="primary" fullWidth>Full Width</Button>
                </div>
              </div>

              {/* Typography Scale */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Typography Scale</h3>
                <div className="space-y-2">
                  <p className="text-display">Display (72px)</p>
                  <p className="text-heading-1">Heading 1 (48px)</p>
                  <p className="text-heading-2">Heading 2 (36px)</p>
                  <p className="text-heading-3">Heading 3 (30px)</p>
                  <p className="text-body-large">Body Large (18px)</p>
                  <p className="text-body">Body (16px)</p>
                  <p className="text-body-small">Body Small (14px)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInView>
    </div>
  );
}
