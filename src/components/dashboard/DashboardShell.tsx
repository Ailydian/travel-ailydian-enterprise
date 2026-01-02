'use client';

import React, { useState, ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardShellProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: Array<{label: string;href?: string;}>;
}

/**
 * DashboardShell - Main layout wrapper for the dashboard
 *
 * Provides a responsive layout with:
 * - Collapsible sidebar navigation
 * - Top header with user menu and search
 * - Main content area
 * - Mobile-optimized navigation
 *
 * @example
 * <DashboardShell title="Overview" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}>
 *   <YourContent />
 * </DashboardShell>
 */
const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  title = 'Dashboard',
  breadcrumbs = [{ label: 'Dashboard' }]
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Sidebar for desktop and mobile */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={closeSidebar}
        onToggleCollapse={toggleCollapse} />


      {/* Mobile sidebar overlay */}
      {sidebarOpen &&
      <div
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
        onClick={closeSidebar}
        aria-hidden="true" />

      }

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title={title}
          breadcrumbs={breadcrumbs}
          onMenuClick={toggleSidebar} />


        {/* Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>);

};

export default DashboardShell;