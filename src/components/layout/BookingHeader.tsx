/**
 * Premium Style Navigation Header
 * Clean white background, red accents, simple navigation
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hotel,
  Plane,
  Car,
  Compass,
  Bus,
  Home,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  HelpCircle,
  Globe,
  Users
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import LanguageSwitcher from '../LanguageSwitcher';
import { ExploreMenu } from '../explore/ExploreMenu';
import { LyDianLogo } from '../branding/LyDianLogo';

export const BookingHeader: React.FC = () => {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Oteller', href: '/hotels', icon: Hotel },
    { name: 'Turlar', href: '/tours', icon: Compass },
    { name: 'Araç Kiralama', href: '/car-rentals', icon: Car },
    { name: 'Transferler', href: '/transfers', icon: Bus },
    { name: 'Konaklama', href: '/rentals', icon: Home },
  ];

  const isActive = (href: string) => router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Ultra Modern Animated Gradient Design */}
      <div className="relative overflow-hidden">
        {/* Animated Multi-Layer Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-lydian-primary via-red-600 to-lydian-secondary opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.3),transparent_50%)]" />

        {/* Animated Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-end gap-6 py-2.5">
            <LanguageSwitcher />
            <Link href="/partner">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg transition-all font-bold text-sm border border-white/30 shadow-lg hover:shadow-white/20 !text-white"
              >
                <Users className="w-4 h-4 !text-white" />
                <span className="!text-white font-bold">Partnerler</span>
              </motion.button>
            </Link>
            <Link href="/help">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg transition-all font-bold text-sm border border-white/30 shadow-lg hover:shadow-white/20 !text-white"
              >
                <HelpCircle className="w-4 h-4 !text-white" />
                <span className="!text-white font-bold">Yardım</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Premium Design with LyDianLogo Component */}
          <Link href="/">
            <LyDianLogo variant="full" size="md" animated={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Explore Menu */}
            <ExploreMenu />

            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors
                    ${active
                      ? 'text-lydian-primary bg-red-50'
                      : 'text-gray-700 hover:text-lydian-primary hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-lydian-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Favorites */}
            <Link
              href="/favorites"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-lydian-primary hover:bg-gray-50 rounded-md transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Favoriler</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-lydian-primary hover:bg-gray-50 rounded-md transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-lydian-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href="/profile/dashboard"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-lydian-primary text-white rounded-md hover:bg-lydian-dark transition-colors font-medium text-sm"
            >
              <User className="w-4 h-4" />
              <span>Hesabım</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-lydian-primary hover:bg-gray-50 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
                      ${active
                        ? 'text-lydian-primary bg-red-50'
                        : 'text-gray-700 hover:text-lydian-primary hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                {/* Language Switcher in Mobile Menu */}
                <div className="px-4 py-3">
                  <LanguageSwitcher />
                </div>

                <Link
                  href="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-lydian-primary hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Favoriler</span>
                </Link>

                <Link
                  href="/profile/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-lydian-primary text-white rounded-lg font-medium hover:bg-lydian-dark transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Hesabım</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default BookingHeader;
