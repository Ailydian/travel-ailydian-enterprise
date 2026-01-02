'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Building2,
  ChevronLeft,
  ChevronRight } from 'lucide-react';
import { getSidebarWidthClasses, LAYOUT_CONSTANTS } from '@/config/layout-constants';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{className?: string;}>;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const navigationItems: NavigationItem[] = [
{ name: 'Overview', href: '/dashboard', icon: Home },
{ name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
{ name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
{ name: 'Earnings', href: '/dashboard/earnings', icon: DollarSign },
{ name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
{ name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
{ name: 'Settings', href: '/dashboard/settings', icon: Settings }];


/**
 * DashboardSidebar - Navigation sidebar component
 *
 * Features:
 * - Responsive design (mobile drawer, desktop sidebar)
 * - Active state highlighting
 * - Property switcher dropdown
 * - Collapsible on desktop
 * - Add property button
 *
 * @example
 * <DashboardSidebar
 *   isOpen={sidebarOpen}
 *   isCollapsed={false}
 *   onClose={() => setSidebarOpen(false)}
 *   onToggleCollapse={() => setCollapsed(!collapsed)}
 * />
 */
const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse
}) => {
  const pathname = usePathname();
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('Sunset Villa');

  // Mock properties - replace with actual data
  const properties = [
  'Sunset Villa',
  'Ocean View Apartment',
  'Mountain Retreat'];


  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Sidebar - mobile (drawer) and desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 ${LAYOUT_CONSTANTS.sidebar.zIndex} flex flex-col bg-gradient-to-br from-slate-900 via-black to-slate-800 dark:bg-gray-900 border-r border-white/20/10 dark:border-gray-800
          transition-all ${LAYOUT_CONSTANTS.sidebar.transitions.duration} ${LAYOUT_CONSTANTS.sidebar.transitions.timing}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          ${isCollapsed ? getSidebarWidthClasses(true) : getSidebarWidthClasses(false)}
          ${LAYOUT_CONSTANTS.sidebar.width.mobile}
        `}
        aria-label="Sidebar navigation">

        {/* Logo and brand */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/20/10">
          {!isCollapsed &&
          <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">LyDian</span>
            </Link>
          }
          {isCollapsed &&
          <Link href="/" className="flex items-center justify-center w-full">
              <Building2 className="h-8 w-8 text-blue-500" />
            </Link>
          }

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-1.5 rounded-md hover:bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>

            {isCollapsed ?
            <ChevronRight className="h-5 w-5" /> :

            <ChevronLeft className="h-5 w-5" />
            }
          </button>
        </div>

        {/* Property switcher */}
        {!isCollapsed &&
        <div className="px-3 py-4 border-b border-white/20/10">
            <div className="relative">
              <button
              onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-white bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-lg hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-colors"
              aria-expanded={propertyDropdownOpen}
              aria-haspopup="true">

                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Building2 className="h-5 w-5 text-gray-300 flex-shrink-0" />
                  <span className="truncate">{selectedProperty}</span>
                </div>
                <ChevronDown
                className={`h-4 w-4 text-gray-300 transition-transform flex-shrink-0 ${
                propertyDropdownOpen ? 'rotate-180' : ''}`
                } />

              </button>

              {/* Dropdown menu */}
              {propertyDropdownOpen &&
            <div className="absolute z-10 mt-2 w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-lg shadow-lg border border-white/20/10 py-1">
                  {properties.map((property) =>
              <button
                key={property}
                onClick={() => {
                  setSelectedProperty(property);
                  setPropertyDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 transition-colors ${
                selectedProperty === property ?
                'text-blue-500 font-medium bg-blue-50' :
                'text-gray-200'}`
                }>

                      {property}
                    </button>
              )}
                </div>
            }
            </div>
          </div>
        }

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      // Close mobile sidebar when navigating
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isCollapsed ? 'justify-center' : 'space-x-3'}
                      ${
                    active ?
                    'bg-blue-50 text-lydian-primary-hover' :
                    'text-gray-200 hover:bg-lydian-bg/10 hover:text-white'}
                    `
                    }
                    aria-current={active ? 'page' : undefined}
                    title={isCollapsed ? item.name : undefined}>

                    <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-lydian-primary-hover' : 'text-gray-300'}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>);

            })}
          </ul>
        </nav>

        {/* Add Property button */}
        <div className="px-3 py-4 border-t border-white/20/10">
          <button
            className={`
              w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg
              hover:bg-gradient-to-r from-blue-700 to-purple-700 transition-colors font-medium text-sm
              ${isCollapsed ? 'px-2' : 'space-x-2'}
            `}
            aria-label="Add new property">

            <Plus className="h-5 w-5" />
            {!isCollapsed && <span>Add Property</span>}
          </button>
        </div>
      </aside>
    </>);

};

export default DashboardSidebar;