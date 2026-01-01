/**
 * Modern Header - Professional & Minimal Design
 * Clean, stable, no glitches - production-grade
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
  ChevronDown,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { LyDianLogo } from '../branding/LyDianLogo';

export const ModernHeader: React.FC = () => {
  const router = useRouter();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Scroll detection - optimized for mobile, no jitter
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    const threshold = 30;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only update if crossed threshold to prevent unnecessary re-renders
      if ((lastScrollY <= threshold && currentScrollY > threshold) ||
          (lastScrollY > threshold && currentScrollY <= threshold)) {

        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrolled(currentScrollY > threshold);
            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Turlar', href: '/tours' },
    { name: 'Transferler', href: '/transfers' },
    { name: 'Araç Kiralama', href: '/car-rentals' },
    { name: 'Oteller', href: '/hotels' },
    { name: 'Konaklama', href: '/rentals' },
  ];

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  ];

  // Get current language from router locale or default to 'tr'
  const getCurrentLang = () => {
    const currentLocale = router.locale || 'tr';
    return languages.find(lang => lang.code === currentLocale) || languages[0];
  };

  const [currentLang, setCurrentLang] = useState(getCurrentLang());

  // Update current language when router locale changes
  useEffect(() => {
    setCurrentLang(getCurrentLang());
  }, [router.locale]);

  // Load preferred locale on mount and redirect if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferredLocale');
      if (savedLocale && savedLocale !== router.locale && languages.find(l => l.code === savedLocale)) {
        // User has a saved preference different from current locale
        router.push(router.pathname, router.asPath, { locale: savedLocale, scroll: false });
      }
    }
  }, []);

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  const handleLangChange = async (lang: typeof languages[0]) => {
    try {
      setCurrentLang(lang);
      setLangMenuOpen(false);

      // REAL FIX: Change language with proper Next.js i18n routing
      // Use pathname instead of asPath to avoid query string issues
      const currentPath = router.pathname;
      const currentQuery = router.query;

      await router.push(
        { pathname: currentPath, query: currentQuery },
        undefined,
        { locale: lang.code, scroll: false }
      );

      // Also save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredLocale', lang.code);
      }
    } catch (error) {
      console.error('Language change error:', error);
    }
  };

  return (
    <>
      {/* Main Header - Fixed, no jitter */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-lydian-glass-dark/95 backdrop-blur-xl border-b border-lydian-border-light/10 shadow-lg'
            : 'bg-lydian-glass-dark/60 backdrop-blur-md'
        }`}
        style={{ transform: 'translateZ(0)' }} // Hardware acceleration, prevents jitter
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo - Larger size */}
            <Link href="/">
              <a className="flex items-center gap-3 cursor-pointer group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <LyDianLogo variant="full" size="lg" />
                </motion.div>
              </a>
            </Link>

            {/* Desktop Navigation - Framed items */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-lydian-primary text-white shadow-lg shadow-lydian-primary/20'
                        : 'text-lydian-text-muted hover:text-lydian-text-inverse hover:bg-lydian-glass-light/40'
                    }`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher - Fully functional */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-4 h-11 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 border border-lydian-border-light/20 transition-all"
                  aria-label="Language"
                >
                  <Globe className="w-4 h-4 text-lydian-text-inverse" />
                  <span className="text-sm font-semibold text-lydian-text-inverse">
                    {currentLang.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-lydian-text-muted transition-transform ${
                      langMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {langMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setLangMenuOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-lydian-glass-dark/95 backdrop-blur-xl border border-lydian-border-light/20 rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLangChange(lang)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                              currentLang.code === lang.code
                                ? 'bg-lydian-primary/20 text-lydian-primary'
                                : 'text-lydian-text-inverse hover:bg-lydian-glass-light/40'
                            }`}
                          >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="font-medium text-sm">{lang.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Partner Button */}
              <Link href="/partner">
                <a className="hidden lg:flex items-center gap-2 px-6 h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-600/30 transition-all">
                  Partner Ol
                </a>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <a className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 border border-lydian-border-light/20 transition-all">
                  <ShoppingCart className="w-5 h-5 text-lydian-text-inverse" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </a>
              </Link>

              {/* Auth Buttons */}
              <Link href="/auth/signin">
                <a className="hidden sm:flex items-center gap-2 px-5 h-11 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 border border-lydian-border-light/20 transition-all">
                  <LogIn className="w-4 h-4 text-lydian-text-inverse" />
                  <span className="font-semibold text-sm text-lydian-text-inverse">Giriş</span>
                </a>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-lydian-glass-light/40 hover:bg-lydian-glass-light/60 border border-lydian-border-light/20 transition-all"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-lydian-text-inverse" />
                ) : (
                  <Menu className="w-5 h-5 text-lydian-text-inverse" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              style={{ top: '96px', willChange: 'opacity' }}
            />

            {/* Menu Panel - iOS-style slide */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 0.8,
              }}
              className="fixed top-24 right-0 bottom-0 w-full sm:w-80 bg-lydian-glass-dark/98 backdrop-blur-2xl border-l border-lydian-border-light/20 z-50 overflow-y-auto"
              style={{
                willChange: 'transform',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="p-6 space-y-6">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-5 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                          isActive(item.href)
                            ? 'bg-lydian-primary text-white shadow-lg'
                            : 'text-lydian-text-muted hover:bg-lydian-glass-light/40 hover:text-lydian-text-inverse'
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="border-t border-lydian-border-light/20" />

                {/* Auth Buttons */}
                <div className="space-y-3">
                  <Link href="/auth/signin">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-lydian-glass-light/40 text-lydian-text-inverse rounded-xl font-semibold hover:bg-lydian-glass-light/60 transition-all"
                    >
                      <LogIn className="w-5 h-5" />
                      Giriş Yap
                    </a>
                  </Link>

                  <Link href="/auth/signup">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r from-lydian-primary to-lydian-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all"
                    >
                      <UserPlus className="w-5 h-5" />
                      Kayıt Ol
                    </a>
                  </Link>

                  <Link href="/partner">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-lydian-glass-light/20 text-lydian-text-inverse rounded-xl font-semibold hover:bg-lydian-glass-light/40 transition-all"
                    >
                      Partner Ol
                    </a>
                  </Link>
                </div>

                {/* Language Selector (Mobile) */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-lydian-text-muted uppercase tracking-wider px-2">
                    Dil Seçimi
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                          currentLang.code === lang.code
                            ? 'bg-lydian-primary text-white shadow-lg'
                            : 'bg-lydian-glass-light/20 text-lydian-text-inverse hover:bg-lydian-glass-light/40'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium text-sm">{lang.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content jump */}
      <div className="h-24" />
    </>
  );
};

export default ModernHeader;
