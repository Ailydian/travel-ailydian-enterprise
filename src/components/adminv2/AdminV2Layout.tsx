/**
 * AdminV2 Layout - Apple Vision Pro Inspired Premium Design
 * Production-grade glassmorphism admin interface
 *
 * Features:
 * - Ultra-premium glassmorphic sidebar
 * - Smooth 60fps animations
 * - Adaptive blur & depth
 * - Lydian theme integration
 * - Responsive & accessible
 */

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Image,
  FileText,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  Bus,
  Hotel,
  Plane,
  Newspaper,
  Brain,
  Shield,
  ChevronRight,
  Search,
  Bell,
  User,
  Sparkles,
} from 'lucide-react';

interface AdminV2LayoutProps {
  children: ReactNode;
}

export default function AdminV2Layout({ children }: AdminV2LayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/adminv2',
      icon: LayoutDashboard,
      badge: null,
      description: 'Overview & analytics'
    },
    {
      name: 'Tours',
      href: '/adminv2/tours',
      icon: Package,
      badge: '12',
      description: 'Manage tour packages'
    },
    {
      name: 'Hotels',
      href: '/adminv2/hotels',
      icon: Hotel,
      badge: null,
      description: 'Hotel listings'
    },
    {
      name: 'Flights',
      href: '/adminv2/flights',
      icon: Plane,
      badge: null,
      description: 'Flight schedules'
    },
    {
      name: 'Transfers',
      href: '/adminv2/transfers',
      icon: Bus,
      badge: '3',
      description: 'Transfer services'
    },
    {
      name: 'Media Library',
      href: '/adminv2/media',
      icon: Image,
      badge: null,
      description: 'Files & images'
    },
    {
      name: 'Blog',
      href: '/adminv2/blog',
      icon: Newspaper,
      badge: null,
      description: 'Content management'
    },
    {
      name: 'Pages',
      href: '/adminv2/pages',
      icon: FileText,
      badge: null,
      description: 'CMS pages'
    },
    {
      name: 'AI & Vision',
      href: '/adminv2/ai',
      icon: Brain,
      badge: 'AI',
      description: 'AI integrations'
    },
    {
      name: 'Analytics',
      href: '/adminv2/monitoring',
      icon: BarChart3,
      badge: null,
      description: 'Performance metrics'
    },
    {
      name: 'Users',
      href: '/adminv2/users',
      icon: Users,
      badge: null,
      description: 'User management'
    },
    {
      name: 'Settings',
      href: '/adminv2/settings',
      icon: Settings,
      badge: null,
      description: 'System configuration'
    },
  ];

  const isActive = (href: string) => {
    if (href === '/adminv2') {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lydian-bg via-lydian-bg-dark to-lydian-bg">
      {/* Glassmorphic Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0, width: sidebarOpen ? 280 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen z-50"
      >
        {/* Glass Background with Blur */}
        <div className="absolute inset-0 bg-lydian-glass-dark/40 backdrop-blur-2xl border-r border-lydian-border-light/20" />

        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-lydian-primary/5 via-transparent to-lydian-accent/5 pointer-events-none" />

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-lydian-border-light/10">
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lydian-primary to-lydian-accent flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-lydian-text-inverse" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-lydian-text-inverse tracking-tight">AdminV2</h1>
                    <p className="text-xs text-lydian-text-muted">Content Hub</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-lydian-glass-light/50 rounded-lg transition-all"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-lydian-text-inverse" />
              ) : (
                <Menu className="w-5 h-5 text-lydian-text-inverse" />
              )}
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-lydian-border-light/30 scrollbar-track-transparent">
            <div className="space-y-1">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                        ${active
                          ? 'bg-gradient-to-r from-lydian-primary/20 to-lydian-accent/20 text-lydian-text-inverse shadow-lg'
                          : 'text-lydian-text-muted hover:bg-lydian-glass-light/30 hover:text-lydian-text-inverse'
                        }
                      `}
                    >
                      {/* Active Indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-lydian-primary to-lydian-accent rounded-r-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}

                      {/* Icon */}
                      <div className={`relative ${active ? 'text-lydian-primary' : ''}`}>
                        <Icon className="w-5 h-5" />
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-lydian-accent text-lydian-text-inverse text-[10px] font-bold rounded-full flex items-center justify-center">
                            {item.badge === 'AI' ? <Sparkles className="w-2.5 h-2.5" /> : item.badge}
                          </span>
                        )}
                      </div>

                      {/* Text */}
                      <AnimatePresence mode="wait">
                        {sidebarOpen && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex-1 overflow-hidden"
                          >
                            <div className="font-medium text-sm">{item.name}</div>
                            {item.description && (
                              <div className="text-xs text-lydian-text-dim mt-0.5">{item.description}</div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hover Arrow */}
                      {sidebarOpen && (
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'opacity-100' : ''}`} />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-lydian-border-light/10">
            {session?.user && (
              <div className="mb-3">
                <AnimatePresence mode="wait">
                  {sidebarOpen ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-lydian-glass-light/30 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lydian-primary to-lydian-accent flex items-center justify-center text-lydian-text-inverse font-bold">
                        {session.user.name?.[0] || session.user.email?.[0] || 'A'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-lydian-text-inverse truncate">
                          {session.user.name || 'Admin'}
                        </p>
                        <p className="text-xs text-lydian-text-muted truncate">{session.user.email}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-lydian-primary to-lydian-accent flex items-center justify-center text-lydian-text-inverse font-bold"
                    >
                      {session.user.name?.[0] || 'A'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span>Logout</span>}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main
        className="transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '280px' : '80px' }}
      >
        {/* Top Header Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`sticky top-0 z-40 transition-all duration-300 ${
            scrolled
              ? 'bg-lydian-glass-dark/60 backdrop-blur-xl border-b border-lydian-border-light/20 shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="px-8 py-4 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2.5 bg-lydian-glass-light/30 border border-lydian-border-light/20 rounded-xl text-lydian-text-inverse placeholder-lydian-text-muted focus:outline-none focus:ring-2 focus:ring-lydian-primary/50 focus:border-lydian-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 bg-lydian-glass-light/30 hover:bg-lydian-glass-light/50 rounded-xl transition-all"
              >
                <Bell className="w-5 h-5 text-lydian-text-inverse" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lydian-accent rounded-full" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-lydian-glass-light/30 hover:bg-lydian-glass-light/50 rounded-xl transition-all"
              >
                <User className="w-5 h-5 text-lydian-text-inverse" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
