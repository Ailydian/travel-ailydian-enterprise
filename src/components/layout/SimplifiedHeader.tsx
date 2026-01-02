/**
 * Simplified Header - For non-homepage pages
 * Shows only: Konaklama, Araç Kiralama, Transfer, Turlar, Partner
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Home,
  Car,
  Bus,
  MapPin,
  Briefcase,
  Menu,
  X,
  User,
  ShoppingCart,
  Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import LanguageSwitcher from '../LanguageSwitcher';
import { ThemeToggle } from '../theme/ThemeToggle';
import { LAYOUT_CONSTANTS } from '@/config/layout-constants';

const SimplifiedHeader = () => {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
  {
    label: 'Konaklama',
    href: '/rentals',
    icon: Home
  },
  {
    label: 'Araç Kiralama',
    href: '/car-rentals',
    icon: Car
  },
  {
    label: 'Transfer',
    href: '/transfers',
    icon: Bus
  },
  {
    label: 'Turlar',
    href: '/tours',
    icon: MapPin
  },
  {
    label: 'Partner',
    href: '/partner',
    icon: Briefcase
  }];


  return (
    <header className={`sticky top-0 ${LAYOUT_CONSTANTS.header.zIndex} bg-gradient-to-br from-slate-900 via-black to-slate-800 border-b border-white/20/10 shadow-sm`}>
      <div className={`${LAYOUT_CONSTANTS.header.maxWidth} mx-auto ${LAYOUT_CONSTANTS.header.padding.x}`}>
        <div className={`flex items-center justify-between ${LAYOUT_CONSTANTS.header.height.mobile} ${LAYOUT_CONSTANTS.header.height.desktop}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              Travel LyDian
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-lg transition-all duration-200
                    flex items-center space-x-2
                    ${isActive ?
                  'bg-blue-50 text-blue-500 font-medium' :
                  'text-gray-200 hover:bg-lydian-bg/10'}
                  `
                  }>

                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive &&
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />

                  }
                </Link>);

            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle variant="icon" />
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Favorites */}
            <Link
              href="/favorites"
              className="p-2 rounded-lg hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-colors relative">

              <Heart className="w-5 h-5 text-gray-400" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-lg hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-colors relative">

              <ShoppingCart className="w-5 h-5 text-gray-400" />
              {getItemCount() > 0 &&
              <span className="absolute -top-1 -right-1 bg-lydian-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getItemCount()}
                </span>
              }
            </Link>

            {/* User Account */}
            <Link
              href="/auth/signin"
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">

              <User className="w-4 h-4" />
              <span className="font-medium">Giriş</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 backdrop-blur-xl border border-white/20">

              {mobileMenuOpen ?
              <X className="w-6 h-6 text-gray-400" /> :

              <Menu className="w-6 h-6 text-gray-400" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen &&
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden border-t border-white/20/10 bg-gradient-to-br from-slate-900 via-black to-slate-800">

          <div className="px-4 py-4 space-y-2">
            {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    ${isActive ?
                'bg-blue-50 text-blue-500 font-medium' :
                'text-gray-200 hover:bg-lydian-bg/10'}
                  `
                }>

                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>);

          })}

            <div className="pt-4 border-t border-white/20/10 mt-4">
              <Link
              href="/auth/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg font-medium">

                <User className="w-5 h-5" />
                <span>Giriş Yap</span>
              </Link>
            </div>
          </div>
        </motion.div>
      }
    </header>);

};

export default SimplifiedHeader;