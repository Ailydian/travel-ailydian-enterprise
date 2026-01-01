/**
 * Modern Header - Clean, Minimal & User-Friendly
 * Apple-inspired simplicity with premium glassmorphism
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { LyDianLogo } from '../branding/LyDianLogo';
// Theme toggle will be handled with simple state for now

export const ModernHeader: React.FC = () => {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Turlar', href: '/tours' },
    { name: 'Transferler', href: '/transfers' },
    { name: 'Araç Kiralama', href: '/car-rentals' },
    { name: 'Oteller', href: '/hotels' },
    { name: 'Konaklama', href: '/rentals' },
  ];

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-lydian-glass-dark/80 backdrop-blur-xl border-b border-lydian-border-light/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
              >
                <LyDianLogo variant="full" size="sm" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      isActive(item.href)
                        ? 'text-lydian-primary'
                        : 'text-lydian-text-muted hover:text-lydian-text-inverse'
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-lydian-glass-light/40 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/search')}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 transition-all"
              >
                <Search className="w-5 h-5 text-lydian-text-inverse" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 transition-all"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-lydian-text-inverse" />
                ) : (
                  <Moon className="w-5 h-5 text-lydian-text-inverse" />
                )}
              </motion.button>

              {/* Language Switcher */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-3 h-10 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 transition-all"
              >
                <Globe className="w-4 h-4 text-lydian-text-inverse" />
                <span className="text-sm font-medium text-lydian-text-inverse">TR</span>
                <ChevronDown className="w-3 h-3 text-lydian-text-muted" />
              </motion.button>

              {/* Partner Button */}
              <Link href="/partner">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="hidden lg:flex items-center gap-2 px-5 h-10 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-lydian-primary/30 transition-all"
                >
                  Partner Ol
                </motion.button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 transition-all"
                >
                  <ShoppingCart className="w-5 h-5 text-lydian-text-inverse" />
                  {getItemCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-lydian-primary to-lydian-accent text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {getItemCount()}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Profile */}
              <Link href="/profile/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-lydian-primary to-lydian-accent hover:shadow-lg hover:shadow-lydian-primary/30 transition-all"
                >
                  <User className="w-5 h-5 text-lydian-text-inverse" />
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 transition-all"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-lydian-text-inverse" />
                ) : (
                  <Menu className="w-5 h-5 text-lydian-text-inverse" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-20 right-0 bottom-0 w-full sm:w-80 bg-lydian-glass-dark/95 backdrop-blur-2xl border-l border-lydian-border-light/20 z-40 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <a
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                          isActive(item.href)
                            ? 'bg-lydian-glass-light/40 text-lydian-primary'
                            : 'text-lydian-text-muted hover:bg-lydian-glass-light/20 hover:text-lydian-text-inverse'
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <div className="border-t border-lydian-border-light/20" />

              {/* Quick Actions */}
              <div className="space-y-3">
                <Link href="/partner">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all"
                  >
                    Partner Ol
                  </motion.button>
                </Link>

                <Link href="/profile/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-3 bg-lydian-glass-light/40 text-lydian-text-inverse rounded-xl font-medium hover:bg-lydian-glass-light/60 transition-all flex items-center justify-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    Profilim
                  </motion.button>
                </Link>
              </div>

              {/* Theme Toggle (Mobile) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDarkMode(!darkMode)}
                className="w-full px-4 py-3 bg-lydian-glass-light/20 text-lydian-text-inverse rounded-xl font-medium hover:bg-lydian-glass-light/40 transition-all flex items-center justify-center gap-2"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-5 h-5" />
                    Açık Tema
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    Koyu Tema
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default ModernHeader;
