/**
 * Example Dashboard Layout - Design System Showcase
 * Demonstrates: Sidebar, PageTransition, Button, Performance Hooks
 *
 * This layout showcases the complete Phase 2 design system implementation
 * with WCAG AAA colors, mobile-first responsive design, and smooth transitions.
 */

'use client';

import React, { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarFooter,
  SidebarToggle,
  PageTransition,
  RouteProgress,
  Button,
} from '@/components/ui';
import { useIsMobile, useScrollPosition, useNetworkStatus } from '@/hooks/usePerformance';
import { colors, textColors } from '@/styles/design-system';

// ============================================================================
// ICONS (SVG Components)
// ============================================================================

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ToursIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CustomersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// ============================================================================
// HEADER COMPONENT
// ============================================================================

function DashboardHeader() {
  const isMobile = useIsMobile();
  const { y: scrollY, direction } = useScrollPosition();
  const isOnline = useNetworkStatus();

  // Hide header on scroll down (mobile only)
  const isHeaderVisible = !isMobile || direction === 'up' || scrollY < 100;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-30
        bg-white border-b border-gray-200
        transition-transform duration-300
        ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
      style={{
        paddingLeft: isMobile ? '0' : '280px', // Sidebar width
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          {isMobile && <SidebarToggle />}
          <h1 className="text-xl font-bold" style={{ color: textColors.onLight.primary }}>
            Dashboard
          </h1>
        </div>

        {/* Network Status */}
        {!isOnline && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Offline
          </div>
        )}

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" iconOnly>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            JS
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// SIDEBAR CONTENT
// ============================================================================

function DashboardSidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      {/* Header */}
      <SidebarHeader className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-none">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg">Ailydian</h2>
            <p className="text-xs text-white/80">Travel Platform</p>
          </div>
        </div>
        <SidebarToggle className="text-white hover:bg-white/10" />
      </SidebarHeader>

      {/* Navigation */}
      <SidebarNav>
        <SidebarNavItem
          active={pathname === '/example-dashboard'}
          icon={<DashboardIcon />}
          href="/example-dashboard"
        >
          Dashboard
        </SidebarNavItem>

        <SidebarNavItem
          active={pathname === '/example-dashboard/tours'}
          icon={<ToursIcon />}
          badge="24"
          href="/example-dashboard/tours"
        >
          Tours
        </SidebarNavItem>

        <SidebarNavItem
          active={pathname === '/example-dashboard/bookings'}
          icon={<BookingsIcon />}
          badge="8"
          href="/example-dashboard/bookings"
        >
          Bookings
        </SidebarNavItem>

        <SidebarNavItem
          active={pathname === '/example-dashboard/customers'}
          icon={<CustomersIcon />}
          href="/example-dashboard/customers"
        >
          Customers
        </SidebarNavItem>

        <SidebarNavItem
          active={pathname === '/example-dashboard/analytics'}
          icon={<AnalyticsIcon />}
          href="/example-dashboard/analytics"
        >
          Analytics
        </SidebarNavItem>

        <div className="my-3 border-t border-gray-200" />

        <SidebarNavItem
          active={pathname === '/example-dashboard/settings'}
          icon={<SettingsIcon />}
          href="/example-dashboard/settings"
        >
          Settings
        </SidebarNavItem>
      </SidebarNav>

      {/* Footer */}
      <SidebarFooter>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            JS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Smith</p>
            <p className="text-xs text-gray-500 truncate">john@ailydian.com</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" fullWidth leftIcon={<LogoutIcon />}>
          Sign Out
        </Button>
      </SidebarFooter>
    </>
  );
}

// ============================================================================
// DASHBOARD LAYOUT
// ============================================================================

export default function ExampleDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pathname, setPathname] = useState('/example-dashboard');
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Route Progress Bar */}
      <RouteProgress color={colors.primary[600]} height={3} />

      {/* Sidebar */}
      <Sidebar defaultOpen={!isMobile} width="280px">
        <DashboardSidebarContent pathname={pathname} />
      </Sidebar>

      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main
        className="pt-16 transition-all duration-300"
        style={{
          paddingLeft: isMobile ? '0' : '280px',
        }}
      >
        <PageTransition type="fade" duration={300}>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
