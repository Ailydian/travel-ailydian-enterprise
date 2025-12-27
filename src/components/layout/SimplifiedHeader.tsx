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
  Heart } from
'lucide-react';
import { useCart } from '../../context/CartContext';
import LanguageSwitcher from '../LanguageSwitcher';

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
    <header className="sticky top-0 z-50 bg-lydian-glass-dark border-b border-lydian-border-light/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-lydian-primary to-lydian-secondary rounded-lg flex items-center justify-center">
              <span className="text-lydian-text-inverse font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-lydian-primary to-lydian-secondary bg-clip-text text-transparent">
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
                  'bg-blue-50 text-blue-600 font-medium' :
                  'text-gray-200 hover:bg-white/10'}
                  `
                  }>

                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive &&
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lydian-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />

                  }
                </Link>);

            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Favorites */}
            <Link
              href="/favorites"
              className="p-2 rounded-lg hover:bg-lydian-glass-dark-medium transition-colors relative">

              <Heart className="w-5 h-5 text-lydian-text-dim" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-lg hover:bg-lydian-glass-dark-medium transition-colors relative">

              <ShoppingCart className="w-5 h-5 text-lydian-text-dim" />
              {getItemCount() > 0 &&
              <span className="absolute -top-1 -right-1 bg-lydian-error text-lydian-text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getItemCount()}
                </span>
              }
            </Link>

            {/* User Account */}
            <Link
              href="/auth/signin"
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg hover:from-lydian-primary-dark hover:to-purple-700 transition-all duration-200">

              <User className="w-4 h-4" />
              <span className="font-medium">Giriş</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-lydian-glass-dark-medium">

              {mobileMenuOpen ?
              <X className="w-6 h-6 text-lydian-text-dim" /> :

              <Menu className="w-6 h-6 text-lydian-text-dim" />
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
        className="md:hidden border-t border-lydian-border-light/10 bg-lydian-glass-dark">

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
                'bg-blue-50 text-blue-600 font-medium' :
                'text-gray-200 hover:bg-white/10'}
                  `
                }>

                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>);

          })}

            <div className="pt-4 border-t border-lydian-border-light/10 mt-4">
              <Link
              href="/auth/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg font-medium">

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