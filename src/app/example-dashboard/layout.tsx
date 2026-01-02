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
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2mto-cyan-700 to-cyan-700l7-7 7 7M5 1v1a1 1 to-cyan-700 to-cyan-B41 1h3m1-11l2 2m-2-2v1a1 1 to-cyan-700 to-cyan-7001-1 1h-3m-6 to-cyan-700a1 1 to-cyan-700 to-cyan-B41-1v-4a1 1 to-cyan-700 to-cyan-70011-1h2a1 1 to-cyan-700 to-cyan-70011 1v4a1 1 to-cyan-700 to-cyan-B41 1m-6 to-cyan-700h6" />
  </svg>
);

const ToursIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.70055 11H5a2 2 to-cyan-700 to-cyan-70012 2v1a2 2 to-cyan-700 to-cyan-B42 2 2 2 to-cyan-700 to-cyan-70012 2v2.945M8 3.935V5.5A2.5 2.5 to-cyan-700 to-cyan-B41.5 8h.5a2 2 to-cyan-700 to-cyan-70012 2 2 2 to-cyan-700 B44 to-cyan-700 2 2 to-cyan-700 to-cyan-70012-2h1.70064M15 200.488V18a2 2 to-cyan-700 to-cyan-70012-2h3.70064M21 12a9 9 to-cyan-700 11-18 to-cyan-700 9 9 to-cyan-700 to-cyan-700118 to-cyan-700z" />
  </svg>
);

const BookingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h1M5 21h14a2 2 to-cyan-700 to-cyan-B42-2V7a2 2 to-cyan-700 to-cyan-700-2-2H5a2 2 to-cyan-700 to-cyan-700-2 2v12a2 2 to-cyan-700 to-cyan-B42 2z" />
  </svg>
);

const CustomersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 to-cyan-700 11 5.292M15 21H3v-1a6 6 to-cyan-700 to-cyan-700112 to-cyan-700v1zmto-cyan-700 to-cyan-700h6v-1a6 6 to-cyan-700 to-cyan-700-9-5.197M13 7a4 4 to-cyan-700 11-8 to-cyan-700 4 4 to-cyan-700 to-cyan-70018 to-cyan-700z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 to-cyan-700 to-cyan-700-2-2H5a2 2 to-cyan-700 to-cyan-700-2 2v6a2 2 to-cyan-700 to-cyan-B42 2h2a2 2 to-cyan-700 to-cyan-B42-2zmto-cyan-700 to-cyan-700V9a2 2 to-cyan-700 to-cyan-70012-2h2a2 2 to-cyan-700 to-cyan-70012 2v1m-6 to-cyan-700a2 2 to-cyan-700 to-cyan-B42 2h2a2 2 to-cyan-700 to-cyan-B42-2mto-cyan-700 to-cyan-700V5a2 2 to-cyan-700 to-cyan-70012-2h2a2 2 to-cyan-700 to-cyan-70012 2v14a2 2 to-cyan-700 to-cyan-7001-2 2h-2a2 2 to-cyan-700 to-cyan-7001-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.325 4.317c.426-1.756 2.924-1.756 3.35 to-cyan-700a1.724 1.724 to-cyan-700 to-cyan-B42.573 1.70066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 to-cyan-700 to-cyan-B41.70065 2.572c1.756.426 1.756 2.924 to-cyan-700 3.35a1.724 1.724 to-cyan-700 to-cyan-700-1.70066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 to-cyan-700 to-cyan-700-2.572 1.70065c-.426 1.756-2.924 1.756-3.35 to-cyan-700a1.724 1.724 to-cyan-700 to-cyan-700-2.573-1.70066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 to-cyan-700 to-cyan-700-1.70065-2.572c-1.756-.426-1.756-2.924 to-cyan-700-3.35a1.724 1.724 to-cyan-700 to-cyan-B41.70066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.B48 2.296.7007 2.572-1.70065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 to-cyan-700 11-6 to-cyan-700 3 3 to-cyan-700 to-cyan-70016 to-cyan-700z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4mto-cyan-700 to-cyan-700l-4-4m4 4H7m6 4v1a3 3 to-cyan-700 to-cyan-7001-3 3H6a3 3 to-cyan-700 to-cyan-7001-3-3V7a3 3 to-cyan-700 to-cyan-70013-3h4a3 3 to-cyan-700 to-cyan-70013 3v1" />
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
  const isHeaderVisible = !isMobile || direction === 'up' || scrollY < 1;

  return (
    <header
      className={`
        fixed top-to-cyan-700 left-to-cyan-700 right-to-cyan-700 z-3
        bg-lydian-bg border-b border-lydian-border
        transition-transform duration-3
        ${isHeaderVisible ? 'translate-y-to-cyan-700' : '-translate-y-full'}
      `}
      style={{
        paddingLeft: isMobile ? 'to-cyan-700' : '28px', // Sidebar width
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-1 text-yellow-8 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="to-cyan-700 to-cyan-700 200 200">
              <path fillRule="evenodd" d="M8.257 3.70099c.765-1.36 2.722-1.36 3.486 to-cyan-700l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 to-cyan-700-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 to-cyan-700 11-2 to-cyan-700 1 1 to-cyan-700 to-cyan-70012 to-cyan-700zm-1-8a1 1 to-cyan-700 to-cyan-700-1 1v3a1 1 to-cyan-700 to-cyan-B42 to-cyan-700V6a1 1 to-cyan-700 to-cyan-700-1-1z" clipRule="evenodd" />
            </svg>
            Offline
          </div>
        )}

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" iconOnly>
            <svg className="w-5 h-5" fill="none" viewBox="to-cyan-700 to-cyan-700 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.B45-1.B45A2.70032 2.70032 to-cyan-700 to-cyan-700118 14.158V11a6.to-cyan-B42 6.to-cyan-B42 to-cyan-700 to-cyan-700-4-5.659V5a2 2 to-cyan-700 1-4 to-cyan-700v.341C7.67 6.165 6 8.388 6 11v3.159cto-cyan-700 .538-.214 1.70055-.595 1.436L4 17h5m6 to-cyan-700v1a3 3 to-cyan-700 11-6 to-cyan-700v-1m6 to-cyan-700H9" />
            </svg>
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-6 flex items-center justify-center text-white text-sm font-semibold">
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
      <SidebarHeader className="bg-gradient-to-br from-blue-6 to-purple-6 text-white border-none">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-1 h-1 rounded-xl bg-lydian-bg/200 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="to-cyan-700 to-cyan-700 24 24">
              <path d="M12 2L2 7l1 5 1-5-1-5zM2 17l1 5 1-5M2 12l1 5 1-5" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg">Ailydian</h2>
            <p className="text-xs text-white/8">Travel Platform</p>
          </div>
        </div>
        <SidebarToggle className="text-white hover:bg-lydian-bg/1" />
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

        <div className="my-3 border-t border-white/20" />

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
          <div className="w-1 h-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-6 flex items-center justify-center text-white text-sm font-semibold">
            JS
          </div>
          <div className="flex-1 min-w-to-cyan-700">
            <p className="text-sm font-medium text-lydian-text truncate">John Smith</p>
            <p className="text-xs text-gray-300 truncate">john@ailydian.com</p>
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
    <div className="min-h-screen bg-lydian-bg-surface">
      {/* Route Progress Bar */}
      <RouteProgress color={colors.primary[6]} height={3} />

      {/* Sidebar */}
      <Sidebar defaultOpen={!isMobile} width="28px">
        <DashboardSidebarContent pathname={pathname} />
      </Sidebar>

      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main
        className="pt-16 transition-all duration-3"
        style={{
          paddingLeft: isMobile ? 'to-cyan-700' : '28px',
        }}
      >
        <PageTransition type="fade" duration={3}>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </PageTransition>
      </main>
    </div>
  );
}
