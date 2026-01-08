/**
 * Modern Header - Professional & Minimal Design
 * Clean, stable, no glitches - production-grade
 * FULLY i18n ENABLED - All text translates automatically based on locale
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation('common'); // Initialize i18n translation hook
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Scroll detection - optimized for mobile, no jitter
  useEffect(() => {
    // Check if running in browser (not SSR)
    if (typeof window === 'undefined') return;

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

  // Navigation items - using translation keys instead of hard-coded text
  const navigation = [
    { name: t('navigation.tours'), href: '/tours' },
    { name: t('navigation.transfers'), href: '/transfers' },
    { name: t('navigation.carRentals'), href: '/car-rentals' },
    { name: t('navigation.hotels'), href: '/hotels' },
    { name: t('navigation.rentals'), href: '/rentals' },
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


  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  const handleLangChange = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setLangMenuOpen(false);

    // Hard navigate to switch language - ensures full page reload with new locale
    if (typeof window !== 'undefined') {
      const currentPath = router.asPath;
      window.location.href = `/${lang.code}${currentPath}`;
    }
  };

  return (
    <>
      {/* Main Header - Fixed, no jitter */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-white/5 backdrop-blur-md'
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
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
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
                  className="flex items-center gap-2 px-4 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                  aria-label="Language"
                >
                  <Globe className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">
                    {currentLang.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-300 transition-transform ${
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
                        className="absolute top-full right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLangChange(lang)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                              currentLang.code === lang.code
                                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400'
                                : 'text-white hover:bg-white/10'
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

              {/* Partner Button - i18n enabled */}
              <Link href="/partner">
                <a className="hidden lg:flex items-center gap-2 px-6 h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-600/30 transition-all">
                  {t('header.becomePartner') || 'Partner Ol'}
                </a>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <a className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </a>
              </Link>

              {/* Auth Buttons - i18n enabled */}
              <Link href="/auth/signin">
                <a className="hidden sm:flex items-center gap-2 px-5 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all">
                  <LogIn className="w-4 h-4 text-white" />
                  <span className="font-semibold text-sm text-white">{t('header.signIn')}</span>
                </a>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
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
              className="fixed top-24 right-0 bottom-0 w-full sm:w-80 bg-white/10 backdrop-blur-2xl border-l border-white/20 z-50 overflow-y-auto"
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
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="border-t border-white/20" />

                {/* Auth Buttons - i18n enabled */}
                <div className="space-y-3">
                  <Link href="/auth/signin">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                    >
                      <LogIn className="w-5 h-5" />
                      {t('header.signIn')}
                    </a>
                  </Link>

                  <Link href="/auth/signup">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                      <UserPlus className="w-5 h-5" />
                      {t('header.signUp')}
                    </a>
                  </Link>

                  <Link href="/partner">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                    >
                      {t('header.becomePartner') || 'Partner Ol'}
                    </a>
                  </Link>
                </div>

                {/* Language Selector (Mobile) - i18n enabled */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider px-2">
                    {t('header.selectLanguage') || 'Dil Seçimi'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                          currentLang.code === lang.code
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-white/5 text-white hover:bg-white/10'
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
