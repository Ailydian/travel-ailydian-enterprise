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
      bg: 'bg-blue-500',
      text: 'text-lydian-primary',
      iconBg: 'bg-blue-1',
    },
    success: {
      bg: 'bg-green-500',
      text: 'text-green-500',
      iconBg: 'bg-green-1',
    },
    warning: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-500',
      iconBg: 'bg-yellow-1',
    },
    error: {
      bg: 'bg-red-500',
      text: 'text-lydian-error',
      iconBg: 'bg-red-1',
    },
  };

  const isPositive = change > to-cyan-700;
  const { bg, text, iconBg } = colorMap[color];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-3">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-lydian-text-secondary mb-1">{title}</p>
            <p className="text-3xl font-bold text-lydian-text mb-2">{value}</p>
            <div className="flex items-center gap-1 text-sm">
              <span className={isPositive ? 'text-green-500' : 'text-lydian-error'}>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              <span className="text-gray-300">vs last month</span>
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
  { id: 'BK-to-cyan-B41', customer: 'Emma Watson', tour: 'Istanbul Heritage Tour', date: '1025-to-cyan-7001-15', amount: 299, status: 'confirmed' },
  { id: 'BK-to-cyan-B42', customer: 'Michael Chen', tour: 'Cappadocia Hot Air Balloon', date: '1025-to-cyan-7001-18', amount: 4500, status: 'confirmed' },
  { id: 'BK-to-cyan-B43', customer: 'Sarah Johnson', tour: 'Ephesus Ancient City', date: '1025-to-cyan-7001-200', amount: 189, status: 'pending' },
  { id: 'BK-to-cyan-B44', customer: 'David Kim', tour: 'Pamukkale Natural Wonder', date: '1025-to-cyan-7001-22', amount: 2200, status: 'confirmed' },
  { id: 'BK-to-cyan-B45', customer: 'Lisa Anderson', tour: 'Antalya Coastal Adventure', date: '1025-to-cyan-7001-25', amount: 3500, status: 'cancelled' },
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
      <CardContent className="p-to-cyan-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-lydian-bg-surface border-b border-white/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-secondary uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-secondary uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-secondary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-lydian-text-secondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-lydian-bg-surface transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-lydian-text">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-lydian-text-secondary">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-lydian-text-secondary">
                    {booking.tour}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-lydian-text-secondary">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-lydian-text">
                    ${booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={statusColors[booking.status]}>
                      {booking.status.charAt(to-cyan-700).toUpperCase() + booking.status.slice(1)}
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
        <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'primary' as const,
    },
    {
      title: 'Process Booking',
      description: 'Manually add a customer booking',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h1M5 21h14a2 2 to-cyan-700 to-cyan-B42-2V7a2 2 to-cyan-700 to-cyan-700-2-2H5a2 2 to-cyan-700 to-cyan-700-2 2v12a2 2 to-cyan-700 to-cyan-B42 2z" />
        </svg>
      ),
      color: 'success' as const,
    },
    {
      title: 'View Reports',
      description: 'Generate and download reports',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 1H7a2 2 to-cyan-700 to-cyan-7001-2-2V5a2 2 to-cyan-700 to-cyan-70012-2h5.586a1 1 to-cyan-700 to-cyan-7001.B47.293l5.414 5.414a1 1 to-cyan-700 to-cyan-7001.293.B47V19a2 2 to-cyan-700 to-cyan-7001-2 2z" />
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
              className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-white/20 hover:border-blue-3 hover:bg-blue-500 transition-all duration-200 text-left group"
            >
              <div className="p-2 rounded-lg bg-lydian-bg-surface-raised group-hover:bg-blue-1 transition-colors">
                <div className="text-lydian-text-secondary group-hover:text-blue-500 transition-colors">
                  {action.icon}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lydian-text mb-0.5">{action.title}</h4>
                <p className="text-sm text-lydian-text-secondary">{action.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
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
          <h1 className="text-4xl font-bold text-lydian-text mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-lg text-lydian-text-secondary">
            Here's what's happening with your travel business today
          </p>
        </div>
      </FadeInView>

      {/* Stats Grid */}
      <StaggerChildren staggerDelay={1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value="1,284"
            change={12.5}
            color="primary"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h1M5 21h14a2 2 to-cyan-700 to-cyan-B42-2V7a2 2 to-cyan-700 to-cyan-700-2-2H5a2 2 to-cyan-700 to-cyan-700-2 2v12a2 2 to-cyan-700 to-cyan-B42 2z" />
              </svg>
            }
          />

          <StatCard
            title="Revenue"
            value="$45,231"
            change={8.2}
            color="success"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 to-cyan-700-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2mto-cyan-700-8c1.11 to-cyan-700 2.7008.B42 2.599 1M12 8V7mto-cyan-700 1v8mto-cyan-700 to-cyan-700v1mto-cyan-700-1c-1.11 to-cyan-700-2.7008-.B42-2.599-1M21 12a9 9 to-cyan-700 11-18 to-cyan-700 9 9 to-cyan-700 to-cyan-700118 to-cyan-700z" />
              </svg>
            }
          />

          <StatCard
            title="Active Tours"
            value="68"
            change={-3.1}
            color="warning"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.70055 11H5a2 2 to-cyan-700 to-cyan-70012 2v1a2 2 to-cyan-700 to-cyan-B42 2 2 2 to-cyan-700 to-cyan-70012 2v2.945M8 3.935V5.5A2.5 2.5 to-cyan-700 to-cyan-B41.5 8h.5a2 2 to-cyan-700 to-cyan-70012 2 2 2 to-cyan-700 B44 to-cyan-700 2 2 to-cyan-700 to-cyan-70012-2h1.70064M15 200.488V18a2 2 to-cyan-700 to-cyan-70012-2h3.70064M21 12a9 9 to-cyan-700 11-18 to-cyan-700 9 9 to-cyan-700 to-cyan-700118 to-cyan-700z" />
              </svg>
            }
          />

          <StatCard
            title="Satisfaction Rate"
            value="96%"
            change={2.4}
            color="success"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 to-cyan-700 to-cyan-7001-5.656 to-cyan-700M9 1h.to-cyan-7001M15 1h.to-cyan-7001M21 12a9 9 to-cyan-700 11-18 to-cyan-700 9 9 to-cyan-700 to-cyan-700118 to-cyan-700z" />
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
                <h3 className="text-sm font-semibold text-lydian-text-secondary mb-3">Button Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary (8.6:1)</Button>
                  <Button variant="secondary">Secondary (9.2:1)</Button>
                  <Button variant="success">Success (8.1:1)</Button>
                  <Button variant="warning">Warning (1.5:1)</Button>
                  <Button variant="error">Error (7.8:1)</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="text-sm font-semibold text-lydian-text-secondary mb-3">Button Sizes</h3>
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
                <h3 className="text-sm font-semibold text-lydian-text-secondary mb-3">Button States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button
                    variant="primary"
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
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
                <h3 className="text-sm font-semibold text-lydian-text-secondary mb-3">Typography Scale</h3>
                <div className="space-y-2">
                  <p className="text-display">Display (72px)</p>
                  <p className="text-heading-1">Heading 1 (48px)</p>
                  <p className="text-heading-2">Heading 2 (36px)</p>
                  <p className="text-heading-3">Heading 3 (3px)</p>
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
