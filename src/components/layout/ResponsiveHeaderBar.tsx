/**
 * Responsive Header Bar Component with Submenu
 * Adaptive header with dropdown mega menus for all devices
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Hotel,
  Plane,
  Car,
  Compass,
  MapPin,
  Building2,
  Palmtree,
  Ship,
  Utensils,
  Camera,
  Mountain,
  Sparkles,
  Calendar,
  Users,
  Globe,
  TrendingUp,
  Award,
  Star,
  Navigation,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCart } from '../../context/CartContext';
import ResponsiveMobileMenu from './ResponsiveMobileMenu';
import AIAssistantPopup from '../ui/AIAssistantPopup';
import PremiumVoiceButton from '../ui/PremiumVoiceButton';
import QuickSearchModal from '../search/QuickSearchModal';

// Submenu structure
interface SubMenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
  popular?: boolean;
}

interface MenuCategory {
  title: string;
  items: SubMenuItem[];
}

const HOTELS_MENU: MenuCategory[] = [
  {
    title: 'Otel Ara',
    items: [
      {
        title: 'Tüm Oteller',
        href: '/hotels',
        icon: Building2,
        description: 'Binlerce otel seçeneği',
        popular: true,
      },
      {
        title: 'Butik Oteller',
        href: '/hotels?type=boutique',
        icon: Star,
        description: 'Özel tasarım oteller',
      },
      {
        title: 'Plaj Otelleri',
        href: '/hotels?type=beach',
        icon: Palmtree,
        description: 'Sahil kenarı oteller',
        popular: true,
      },
      {
        title: 'Şehir Otelleri',
        href: '/hotels?type=city',
        icon: Building2,
        description: 'Şehir merkezi oteller',
      },
    ],
  },
  {
    title: 'Popüler Destinasyonlar',
    items: [
      {
        title: 'İstanbul Otelleri',
        href: '/hotels?city=Istanbul',
        icon: MapPin,
        description: '5000+ otel',
        popular: true,
      },
      {
        title: 'Antalya Otelleri',
        href: '/hotels?city=Antalya',
        icon: MapPin,
        description: '3000+ otel',
        popular: true,
      },
      {
        title: 'Bodrum Otelleri',
        href: '/hotels?city=Bodrum',
        icon: MapPin,
        description: '800+ otel',
      },
      {
        title: 'Kapadokya Otelleri',
        href: '/hotels?city=Cappadocia',
        icon: MapPin,
        description: '500+ otel',
      },
    ],
  },
];

const FLIGHTS_MENU: MenuCategory[] = [
  {
    title: 'Uçuş Ara',
    items: [
      {
        title: 'Uçak Bileti Al',
        href: '/flights',
        icon: Plane,
        description: 'En ucuz uçak biletleri',
        popular: true,
      },
      {
        title: 'İç Hat Uçuşlar',
        href: '/flights?type=domestic',
        icon: Plane,
        description: 'Türkiye içi uçuşlar',
      },
      {
        title: 'Dış Hat Uçuşlar',
        href: '/flights?type=international',
        icon: Globe,
        description: 'Yurt dışı uçuşlar',
      },
      {
        title: 'Business Class',
        href: '/flights?class=business',
        icon: Award,
        description: 'Konforlu seyahat',
        badge: 'Premium',
      },
    ],
  },
  {
    title: 'Popüler Rotalar',
    items: [
      {
        title: 'İstanbul - Antalya',
        href: '/flights?from=IST&to=AYT',
        icon: Navigation,
        description: '₺500\'den başlayan fiyatlar',
        popular: true,
      },
      {
        title: 'İstanbul - İzmir',
        href: '/flights?from=IST&to=ADB',
        icon: Navigation,
        description: '₺450\'den başlayan fiyatlar',
      },
      {
        title: 'Ankara - Antalya',
        href: '/flights?from=ESB&to=AYT',
        icon: Navigation,
        description: '₺400\'den başlayan fiyatlar',
      },
    ],
  },
];

const TRANSFERS_MENU: MenuCategory[] = [
  {
    title: 'Transfer Hizmetleri',
    items: [
      {
        title: 'Havalimanı Transfer',
        href: '/transfers',
        icon: Car,
        description: 'AYT & GZP havalimanları',
        popular: true,
        badge: 'Yeni',
      },
      {
        title: 'VIP Transfer',
        href: '/transfers?type=vip',
        icon: Award,
        description: 'Lüks araç seçenekleri',
        badge: 'Premium',
      },
      {
        title: 'Şehir İçi Transfer',
        href: '/transfers?type=city',
        icon: Car,
        description: 'Şehir içi ulaşım',
      },
      {
        title: 'Grup Transfer',
        href: '/transfers?type=group',
        icon: Users,
        description: '14+ kişilik araçlar',
      },
    ],
  },
  {
    title: 'Popüler Rotalar',
    items: [
      {
        title: 'Antalya Havalimanı → Lara',
        href: '/transfers?from=AYT&to=lara',
        icon: Navigation,
        description: '15 dakika, 250₺\'den',
        popular: true,
      },
      {
        title: 'Antalya Havalimanı → Belek',
        href: '/transfers?from=AYT&to=belek',
        icon: Navigation,
        description: '35 dakika, 350₺\'den',
        popular: true,
      },
      {
        title: 'Gazipaşa → Alanya',
        href: '/transfers?from=GZP&to=alanya',
        icon: Navigation,
        description: '40 dakika, 300₺\'den',
      },
    ],
  },
];

const TOURS_MENU: MenuCategory[] = [
  {
    title: 'Tur Tipleri',
    items: [
      {
        title: 'Günübirlik Turlar',
        href: '/tours?type=daily',
        icon: Calendar,
        description: 'Tek günlük geziler',
        popular: true,
      },
      {
        title: 'Paket Turlar',
        href: '/tours',
        icon: Compass,
        description: 'Çoklu gün turları',
      },
      {
        title: 'Tekne Turları',
        href: '/tours?type=boat',
        icon: Ship,
        description: 'Deniz gezileri',
        popular: true,
      },
      {
        title: 'Kültür Turları',
        href: '/tours?type=culture',
        icon: Camera,
        description: 'Tarihi yerler',
      },
    ],
  },
  {
    title: 'Popüler Turlar',
    items: [
      {
        title: 'Kapadokya Balon Turu',
        href: '/tours?destination=cappadocia',
        icon: Mountain,
        description: 'Eşsiz manzaralar',
        popular: true,
      },
      {
        title: 'Pamukkale Turu',
        href: '/tours?destination=pamukkale',
        icon: Mountain,
        description: 'Beyaz cennet',
      },
      {
        title: 'Bodrum Tekne Turu',
        href: '/tours?destination=bodrum',
        icon: Ship,
        description: 'Mavi yolculuk',
      },
    ],
  },
];

const DESTINATIONS_MENU: MenuCategory[] = [
  {
    title: 'Keşfet',
    items: [
      {
        title: 'Tüm Destinasyonlar',
        href: '/destinations',
        icon: Globe,
        description: 'Seyahat fikirleri',
        popular: true,
      },
      {
        title: 'Plaj Tatilleri',
        href: '/destinations?type=beach',
        icon: Palmtree,
        description: 'Sahil beldelerimiz',
      },
      {
        title: 'Kış Tatilleri',
        href: '/destinations?type=winter',
        icon: Mountain,
        description: 'Kayak merkezleri',
      },
      {
        title: 'Gastronomi Turları',
        href: '/destinations?type=food',
        icon: Utensils,
        description: 'Lezzet rotaları',
      },
    ],
  },
  {
    title: 'En Popüler',
    items: [
      {
        title: 'İstanbul',
        href: '/destinations/istanbul',
        icon: MapPin,
        description: 'Kültür başkenti',
        popular: true,
      },
      {
        title: 'Antalya',
        href: '/destinations/antalya',
        icon: MapPin,
        description: 'Turizm cenneti',
        popular: true,
      },
      {
        title: 'Kapadokya',
        href: '/destinations/cappadocia',
        icon: MapPin,
        description: 'Peri bacaları',
        popular: true,
      },
    ],
  },
];

const ResponsiveHeaderBar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { getItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global AI Assistant listener
  useEffect(() => {
    const handleOpenAI = () => setIsAIAssistantOpen(true);
    window.addEventListener('openAIAssistant', handleOpenAI);
    return () => window.removeEventListener('openAIAssistant', handleOpenAI);
  }, []);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveSubmenu(null);
    if (activeSubmenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeSubmenu]);

  const cartItemCount = mounted ? getItemCount() : 0;

  const getSubmenuContent = (key: string): MenuCategory[] => {
    switch (key) {
      case 'hotels':
        return HOTELS_MENU;
      case 'flights':
        return FLIGHTS_MENU;
      case 'transfers':
        return TRANSFERS_MENU;
      case 'tours':
        return TOURS_MENU;
      case 'destinations':
        return DESTINATIONS_MENU;
      default:
        return [];
    }
  };

  return (
    <>
      {/* Header Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="mobile-nav-safe">
          <div className="container-responsive">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Left: Menu Button (Mobile) + Logo */}
              <div className="flex items-center gap-3 md:gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-ailydian-primary/10 to-ailydian-secondary/10 hover:from-ailydian-primary/20 hover:to-ailydian-secondary/20 flex items-center justify-center transition-all active:scale-95 touch-target"
                  aria-label="Menüyü Aç"
                >
                  <Menu className="w-5 h-5 text-ailydian-primary" />
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-ailydian-primary to-ailydian-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, 0],
                        y: [0, -2, 0, 2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Plane className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                  </motion.div>
                  <div className="hidden sm:block">
                    <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-ailydian-primary to-ailydian-secondary bg-clip-text text-transparent">
                      Ailydian
                    </h1>
                    <p className="text-xs text-gray-500 -mt-1">Travel AI</p>
                  </div>
                </Link>
              </div>

              {/* Center: Desktop Navigation with Dropdowns (Hidden on Mobile) */}
              <nav className="hidden lg:flex items-center gap-1">
                <NavLinkWithSubmenu
                  href="/hotels"
                  icon={Hotel}
                  label="Oteller"
                  submenuKey="hotels"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('hotels')}
                />
                <NavLinkWithSubmenu
                  href="/flights"
                  icon={Plane}
                  label="Uçuşlar"
                  submenuKey="flights"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('flights')}
                />
                <NavLinkWithSubmenu
                  href="/transfers"
                  icon={Car}
                  label="Transfer"
                  badge="Yeni"
                  submenuKey="transfers"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('transfers')}
                />
                <NavLinkWithSubmenu
                  href="/tours"
                  icon={Compass}
                  label="Turlar"
                  submenuKey="tours"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('tours')}
                />
                <NavLinkWithSubmenu
                  href="/destinations"
                  icon={Globe}
                  label="Keşfet"
                  submenuKey="destinations"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('destinations')}
                />
              </nav>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Premium Search Button - Opens Quick Search Modal */}
                <motion.button
                  onClick={() => setIsQuickSearchOpen(true)}
                  className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all touch-target group overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Hızlı Arama"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 opacity-50 group-hover:opacity-75 blur-md transition-opacity" />

                  {/* Animated Sparkle Effect */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0"
                  >
                    <Sparkles className="absolute top-1 right-1 w-3 h-3 text-white/50" />
                    <Sparkles className="absolute bottom-1 left-1 w-2 h-2 text-white/30" />
                  </motion.div>

                  {/* Search Icon */}
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <Search className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
                  </motion.div>

                  {/* Pulse Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-2xl border-2 border-white pointer-events-none"
                  />
                </motion.button>

                {/* Favorites (Desktop) */}
                <Link
                  href="/favorites"
                  className="hidden md:flex w-10 h-10 rounded-xl bg-gray-100 hover:bg-red-50 items-center justify-center transition-all active:scale-95 touch-target group"
                  aria-label="Favoriler"
                >
                  <Heart className="w-5 h-5 text-gray-700 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-green-50 flex items-center justify-center transition-all active:scale-95 touch-target group"
                  aria-label="Sepet"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-green-600 group-hover:scale-110 transition-all" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                    >
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </motion.span>
                  )}
                </Link>

                {/* Premium Voice Assistant Button - After Cart */}
                <PremiumVoiceButton />

                {/* User Menu */}
                {session ? (
                  <Link
                    href="/profile/dashboard"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-ailydian-primary/10 to-ailydian-secondary/10 hover:from-ailydian-primary/20 hover:to-ailydian-secondary/20 flex items-center justify-center transition-all active:scale-95 touch-target"
                    aria-label="Profil"
                  >
                    <User className="w-5 h-5 text-ailydian-primary" />
                  </Link>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="hidden sm:flex px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-xl font-medium hover:shadow-lg active:scale-95 transition-all touch-target text-sm md:text-base"
                  >
                    Giriş
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <ResponsiveMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
      />

      {/* AI Assistant */}
      <AIAssistantPopup
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

// Desktop Navigation Link Component with Submenu
const NavLinkWithSubmenu: React.FC<{
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
  submenuKey: string;
  activeSubmenu: string | null;
  setActiveSubmenu: (key: string | null) => void;
  submenuContent: MenuCategory[];
}> = ({ href, icon: Icon, label, badge, submenuKey, activeSubmenu, setActiveSubmenu, submenuContent }) => {
  const router = useRouter();
  const isActive = router.pathname === href || router.pathname.startsWith(href + '/');
  const isSubmenuOpen = activeSubmenu === submenuKey;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSubmenu(isSubmenuOpen ? null : submenuKey);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:bg-gray-50 group ${
          isActive
            ? 'bg-gradient-to-r from-ailydian-primary/10 to-ailydian-secondary/10 text-ailydian-primary'
            : 'text-gray-700'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-ailydian-primary' : 'text-gray-600'}`} />
        <span className="text-sm">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
        />
        {badge && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
      </button>

      {/* Submenu Dropdown - Premium Compact Design */}
      <AnimatePresence>
        {isSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[280px] bg-white shadow-2xl border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-4">
                <div className="space-y-3">
                  {submenuContent.map((category, idx) => (
                    <div key={idx} className={idx > 0 ? 'pt-3 mt-3 border-t border-gray-100' : ''}>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
                        {category.title}
                      </h3>
                      <div className="space-y-0.5">
                        {category.items.slice(0, 4).map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            onClick={() => setActiveSubmenu(null)}
                            className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                              <item.icon className="w-4 h-4 text-ailydian-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-gray-700 text-sm group-hover:text-ailydian-primary transition-colors truncate">
                                  {item.title}
                                </span>
                                {item.popular && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                )}
                                {item.badge && (
                                  <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Footer */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <Link
                  href={href}
                  onClick={() => setActiveSubmenu(null)}
                  className="text-xs font-semibold text-ailydian-primary hover:text-ailydian-secondary transition-colors flex items-center justify-center gap-1"
                >
                  Tümünü Gör
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResponsiveHeaderBar;
