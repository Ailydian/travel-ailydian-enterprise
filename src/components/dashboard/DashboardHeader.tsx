'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import logger from '../../lib/logger';
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  User,
  Settings,
  LogOut,
  HelpCircle } from
'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface DashboardHeaderProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  onMenuClick: () => void;
}

/**
 * DashboardHeader - Top navigation header
 *
 * Features:
 * - Breadcrumb navigation
 * - Search functionality
 * - Notifications with badge
 * - User avatar with dropdown menu
 * - Mobile menu toggle
 *
 * @example
 * <DashboardHeader
 *   title="Overview"
 *   breadcrumbs={[{ label: 'Dashboard' }, { label: 'Overview' }]}
 *   onMenuClick={() => setMenuOpen(true)}
 * />
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Dashboard',
  breadcrumbs = [{ label: 'Dashboard' }],
  onMenuClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock data - replace with actual data
  const notificationCount = 3;
  const userName = 'John Doe';
  const userEmail = 'john@example.com';
  const userAvatar = null; // Set to image URL when available

  const notifications = [
  { id: 1, title: 'New booking received', time: '5 min ago', unread: true },
  { id: 2, title: 'Payment processed', time: '1 hour ago', unread: true },
  { id: 3, title: 'Review submitted', time: '2 hours ago', unread: false }];


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    logger.debug('Search query:', { component: 'Dashboardheader', metadata: { searchQuery } });
  };

  return (
    <header className="sticky top-0 z-30 bg-lydian-glass-dark border-b border-lydian-border-light/10 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section: Mobile menu + Breadcrumbs */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Mobile menu toggle */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-lydian-text-muted hover:bg-lydian-glass-dark-medium hover:text-lydian-text-inverse transition-colors"
              aria-label="Open menu">

              <Menu className="h-6 w-6" />
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center space-x-2 text-sm min-w-0" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) =>
              <React.Fragment key={index}>
                  {index > 0 &&
                <ChevronRight className="h-4 w-4 text-lydian-text-muted flex-shrink-0" />
                }
                  {crumb.href ?
                <Link
                  href={crumb.href}
                  className="text-lydian-text-muted hover:text-lydian-text-muted transition-colors truncate">

                      {crumb.label}
                    </Link> :

                <span className="text-lydian-text-inverse font-medium truncate">{crumb.label}</span>
                }
                </React.Fragment>
              )}
            </nav>

            {/* Mobile title */}
            <h1 className="sm:hidden text-lg font-semibold text-lydian-text-inverse truncate">
              {title}
            </h1>
          </div>

          {/* Right section: Search + Notifications + User menu */}
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lydian-text-muted" />
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-lydian-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border"
                  aria-label="Search" />

              </div>
            </form>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-lydian-text-muted hover:bg-lydian-glass-dark-medium rounded-lg transition-colors"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}>

                <Bell className="h-6 w-6" />
                {notificationCount > 0 &&
                <span className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center bg-lydian-error text-lydian-text-inverse text-xs font-bold rounded-full">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                }
              </button>

              {/* Notifications dropdown */}
              {notificationsOpen &&
              <div className="absolute right-0 mt-2 w-80 bg-lydian-glass-dark rounded-lg shadow-lg border border-lydian-border-light/10 py-2">
                  <div className="px-4 py-2 border-b border-lydian-border-light/10">
                    <h3 className="text-sm font-semibold text-lydian-text-inverse">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) =>
                  <button
                    key={notification.id}
                    className="w-full px-4 py-3 text-left hover:bg-lydian-glass-dark transition-colors border-b border-lydian-border-light last:border-b-0">

                        <div className="flex items-start space-x-3">
                          {notification.unread &&
                      <span className="mt-1.5 h-2 w-2 bg-lydian-primary rounded-full flex-shrink-0" />
                      }
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${notification.unread ? 'font-medium text-white' : 'text-gray-200'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-lydian-text-muted mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </button>
                  )}
                  </div>
                  <div className="px-4 py-2 border-t border-lydian-border-light/10">
                    <Link
                    href="/dashboard/notifications"
                    className="text-sm text-lydian-primary hover:text-lydian-primary-dark font-medium">

                      View all notifications
                    </Link>
                  </div>
                </div>
              }
            </div>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-lydian-glass-dark-medium transition-colors"
                aria-label="User menu"
                aria-expanded={userMenuOpen}>

                {userAvatar ?
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-8 w-8 rounded-full object-cover" /> :


                <div className="h-8 w-8 rounded-full bg-lydian-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-lydian-text-inverse">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                }
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-lydian-text-inverse">{userName}</p>
                  <p className="text-xs text-lydian-text-muted">Host</p>
                </div>
              </button>

              {/* User dropdown menu */}
              {userMenuOpen &&
              <div className="absolute right-0 mt-2 w-56 bg-lydian-glass-dark rounded-lg shadow-lg border border-lydian-border-light/10 py-1">
                  <div className="px-4 py-3 border-b border-lydian-border-light/10">
                    <p className="text-sm font-medium text-lydian-text-inverse">{userName}</p>
                    <p className="text-xs text-lydian-text-muted truncate">{userEmail}</p>
                  </div>

                  <div className="py-1">
                    <Link
                    href="/dashboard/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-lydian-text-muted hover:bg-lydian-glass-dark transition-colors"
                    onClick={() => setUserMenuOpen(false)}>

                      <User className="h-4 w-4 text-lydian-text-muted" />
                      <span>Profile</span>
                    </Link>
                    <Link
                    href="/dashboard/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-lydian-text-muted hover:bg-lydian-glass-dark transition-colors"
                    onClick={() => setUserMenuOpen(false)}>

                      <Settings className="h-4 w-4 text-lydian-text-muted" />
                      <span>Settings</span>
                    </Link>
                    <Link
                    href="/help"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-lydian-text-muted hover:bg-lydian-glass-dark transition-colors"
                    onClick={() => setUserMenuOpen(false)}>

                      <HelpCircle className="h-4 w-4 text-lydian-text-muted" />
                      <span>Help & Support</span>
                    </Link>
                  </div>

                  <div className="border-t border-lydian-border-light/10 py-1">
                    <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      // Implement logout functionality
                      logger.debug('Logout', { component: 'Dashboardheader' });
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-lydian-primary hover:bg-lydian-error-lighter transition-colors">

                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </header>);

};

export default DashboardHeader;