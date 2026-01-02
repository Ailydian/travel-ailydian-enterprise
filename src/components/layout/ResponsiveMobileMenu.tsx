/**
 * Responsive Mobile Menu Component
 * Modern slide-in menu for mobile devices with smooth animations
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  Building,
  Plane,
  Car,
  Compass,
  Heart,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  MapPin,
  Calendar,
  CreditCard,
  Headphones,
  Globe,
  ChevronRight } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../../context/CartContext';

interface ResponsiveMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResponsiveMobileMenu: React.FC<ResponsiveMobileMenuProps> = ({
  isOpen,
  onClose
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const mainMenuItems = [
  {
    icon: Home,
    label: 'Ana Sayfa',
    href: '/',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Building,
    label: 'Oteller',
    href: '/hotels',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Plane,
    label: 'Uçuşlar',
    href: '/flights',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Car,
    label: 'Transfer',
    href: '/transfers',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Car,
    label: 'Araç Kiralama',
    href: '/car-rentals',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Home,
    label: 'Konaklama',
    href: '/rentals',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Compass,
    label: 'Turlar',
    href: '/tours',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: MapPin,
    label: 'Keşfet',
    href: '/destinations',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Building,
    label: 'Partner',
    href: '/partner',
    color: 'from-green-600 to-emerald-600'
  }];


  const userMenuItems = session ?
  [
  {
    icon: User,
    label: 'Profilim',
    href: '/profile/dashboard',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Calendar,
    label: 'Rezervasyonlarım',
    href: '/bookings',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Heart,
    label: 'Favorilerim',
    href: '/favorites',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: ShoppingCart,
    label: 'Sepetim',
    href: '/cart',
    color: 'from-green-500 to-green-600',
    badge: mounted ? getItemCount().toString() : '0'
  },
  {
    icon: CreditCard,
    label: 'Ödeme Yöntemlerim',
    href: '/profile/payments',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: Settings,
    label: 'Ayarlar',
    href: '/profile/settings',
    color: 'from-green-600 to-emerald-600'
  }] :

  [
  {
    icon: User,
    label: 'Giriş Yap',
    href: '/auth/signin',
    color: 'from-green-600 to-emerald-600'
  },
  {
    icon: User,
    label: 'Kayıt Ol',
    href: '/auth/signup',
    color: 'from-green-500 to-green-600'
  }];


  const handleMenuItemClick = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    onClose();
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99998]"
          onClick={onClose} />


          {/* Menu Panel */}
          <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
            mass: 0.8
          }}
          className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-slate-900 via-black to-slate-800 z-[99999] overflow-y-auto shadow-2xl overscroll-contain">

            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-700 p-6 mobile-nav-safe">
              <div className="flex items-center justify-between mb-4">
                <Link href="/" onClick={onClose}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">✈️</span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">LyDian</h2>
                      <p className="text-blue-100 text-xs">Travel Platform</p>
                    </div>
                  </div>
                </Link>
                <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-lydian-bg/30 flex items-center justify-center transition-colors touch-target"
                aria-label="Menüyü Kapat">

                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* User Info */}
              {session &&
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">
                        {session.user?.name || 'Kullanıcı'}
                      </p>
                      <p className="text-blue-100 text-sm truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
            }
            </div>

            {/* Main Menu Items */}
            <div className="p-4 space-y-1">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 mb-2">
                Ana Menü
              </p>
              {mainMenuItems.map((item, index) =>
            <motion.button
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleMenuItemClick(item.href)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 active:bg-white/10 backdrop-blur-xl border border-white/20 transition-all group touch-target">

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">{item.label}</p>
                  </div>
                  {item.badge &&
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
              }
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </motion.button>
            )}
            </div>

            {/* Divider */}
            <div className="px-8 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* User Menu Items */}
            <div className="p-4 space-y-1">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider px-4 mb-2">
                {session ? 'Hesabım' : 'Hesap'}
              </p>
              {userMenuItems.map((item, index) =>
            <motion.button
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (mainMenuItems.length + index) * 0.05 }}
              onClick={() => handleMenuItemClick(item.href)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 active:bg-white/10 backdrop-blur-xl border border-white/20 transition-all group touch-target">

                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-white">{item.label}</p>
                  </div>
                  {item.badge && item.badge !== '0' &&
              <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full min-w-[24px] text-center">
                      {item.badge}
                    </span>
              }
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </motion.button>
            )}

              {/* Sign Out Button */}
              {session &&
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (mainMenuItems.length + userMenuItems.length) * 0.05 }}
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-lydian-error-lighter active:bg-lydian-error-light transition-all group touch-target mt-2">

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lydian-success to-lydian-success flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <LogOut className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-blue-500">Çıkış Yap</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-lydian-error group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </motion.button>
            }
            </div>

            {/* Footer */}
            <div className="p-6 pb-8 mobile-nav-safe">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Headphones className="w-5 h-5 text-blue-500" />
                  <p className="font-semibold text-white">Müşteri Desteği</p>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  7/24 size yardımcı olmaya hazırız
                </p>
                <Link
                href="/support"
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all touch-target">

                  <Headphones className="w-4 h-4" />
                  Destek Al
                </Link>
              </div>

              <p className="text-center text-xs text-gray-300 mt-6">
                © 2025 AILYDIAN Holiday. Tüm hakları saklıdır.
              </p>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

};

export default ResponsiveMobileMenu;