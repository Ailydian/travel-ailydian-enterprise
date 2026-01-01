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
  Home,
  Waves,
  TreePine } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCart } from '../../context/CartContext';
import ResponsiveMobileMenu from './ResponsiveMobileMenu';
import AIAssistantPopup from '../ui/AIAssistantPopup';
import PremiumVoiceButton from '../ui/PremiumVoiceButton';
import QuickSearchModal from '../search/QuickSearchModal';
import { ThemeToggle } from '../theme/ThemeToggle';
import { LAYOUT_CONSTANTS } from '@/config/layout-constants';

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
    popular: true
  },
  {
    title: 'Butik Oteller',
    href: '/hotels?type=boutique',
    icon: Star,
    description: 'Özel tasarım oteller'
  },
  {
    title: 'Plaj Otelleri',
    href: '/hotels?type=beach',
    icon: Palmtree,
    description: 'Sahil kenarı oteller',
    popular: true
  },
  {
    title: 'Şehir Otelleri',
    href: '/hotels?type=city',
    icon: Building2,
    description: 'Şehir merkezi oteller'
  }]

},
{
  title: 'Popüler Destinasyonlar',
  items: [
  {
    title: 'İstanbul Otelleri',
    href: '/hotels?city=Istanbul',
    icon: MapPin,
    description: '5000+ otel',
    popular: true
  },
  {
    title: 'Antalya Otelleri',
    href: '/hotels?city=Antalya',
    icon: MapPin,
    description: '3000+ otel',
    popular: true
  },
  {
    title: 'Bodrum Otelleri',
    href: '/hotels?city=Bodrum',
    icon: MapPin,
    description: '800+ otel'
  },
  {
    title: 'Kapadokya Otelleri',
    href: '/hotels?city=Cappadocia',
    icon: MapPin,
    description: '500+ otel'
  }]

}];


const FLIGHTS_MENU: MenuCategory[] = [
{
  title: 'Uçuş Ara',
  items: [
  {
    title: 'Uçak Bileti Al',
    href: '/flights',
    icon: Plane,
    description: 'En ucuz uçak biletleri',
    popular: true
  },
  {
    title: 'İç Hat Uçuşlar',
    href: '/flights?type=domestic',
    icon: Plane,
    description: 'Türkiye içi uçuşlar'
  },
  {
    title: 'Dış Hat Uçuşlar',
    href: '/flights?type=international',
    icon: Globe,
    description: 'Yurt dışı uçuşlar'
  },
  {
    title: 'Business Class',
    href: '/flights?class=business',
    icon: Award,
    description: 'Konforlu seyahat',
    badge: 'Premium'
  }]

},
{
  title: 'Popüler Rotalar',
  items: [
  {
    title: 'İstanbul - Antalya',
    href: '/flights?from=IST&to=AYT',
    icon: Navigation,
    description: '₺500\'den başlayan fiyatlar',
    popular: true
  },
  {
    title: 'İstanbul - İzmir',
    href: '/flights?from=IST&to=ADB',
    icon: Navigation,
    description: '₺450\'den başlayan fiyatlar'
  },
  {
    title: 'Ankara - Antalya',
    href: '/flights?from=ESB&to=AYT',
    icon: Navigation,
    description: '₺400\'den başlayan fiyatlar'
  }]

}];


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
    badge: 'Yeni'
  },
  {
    title: 'VIP Transfer',
    href: '/transfers?type=vip',
    icon: Award,
    description: 'Lüks araç seçenekleri',
    badge: 'Premium'
  },
  {
    title: 'Şehir İçi Transfer',
    href: '/transfers?type=city',
    icon: Car,
    description: 'Şehir içi ulaşım'
  },
  {
    title: 'Grup Transfer',
    href: '/transfers?type=group',
    icon: Users,
    description: '14+ kişilik araçlar'
  }]

},
{
  title: 'Popüler Rotalar',
  items: [
  {
    title: 'Antalya Havalimanı → Lara',
    href: '/transfers?from=AYT&to=lara',
    icon: Navigation,
    description: '15 dakika, 250₺\'den',
    popular: true
  },
  {
    title: 'Antalya Havalimanı → Belek',
    href: '/transfers?from=AYT&to=belek',
    icon: Navigation,
    description: '35 dakika, 350₺\'den',
    popular: true
  },
  {
    title: 'Gazipaşa → Alanya',
    href: '/transfers?from=GZP&to=alanya',
    icon: Navigation,
    description: '40 dakika, 300₺\'den'
  }]

}];


const TOURS_MENU: MenuCategory[] = [
{
  title: 'Tur Tipleri',
  items: [
  {
    title: 'Günübirlik Turlar',
    href: '/tours?type=daily',
    icon: Calendar,
    description: 'Tek günlük geziler',
    popular: true
  },
  {
    title: 'Paket Turlar',
    href: '/tours',
    icon: Compass,
    description: 'Çoklu gün turları'
  },
  {
    title: 'Tekne Turları',
    href: '/tours?type=boat',
    icon: Ship,
    description: 'Deniz gezileri',
    popular: true
  },
  {
    title: 'Kültür Turları',
    href: '/tours?type=culture',
    icon: Camera,
    description: 'Tarihi yerler'
  }]

},
{
  title: 'Popüler Turlar',
  items: [
  {
    title: 'Kapadokya Balon Turu',
    href: '/tours?destination=cappadocia',
    icon: Mountain,
    description: 'Eşsiz manzaralar',
    popular: true
  },
  {
    title: 'Pamukkale Turu',
    href: '/tours?destination=pamukkale',
    icon: Mountain,
    description: 'Beyaz cennet'
  },
  {
    title: 'Bodrum Tekne Turu',
    href: '/tours?destination=bodrum',
    icon: Ship,
    description: 'Mavi yolculuk'
  }]

}];


const RENTALS_MENU: MenuCategory[] = [
{
  title: 'Konaklama Tipleri',
  items: [
  {
    title: 'Tüm Kiralık Evler',
    href: '/rentals',
    icon: Home,
    description: 'Villa, apart, ev seçenekleri',
    popular: true
  },
  {
    title: 'Villalar',
    href: '/rentals?type=villa',
    icon: Home,
    description: 'Lüks villa kiralama',
    badge: 'Popüler'
  },
  {
    title: 'Apartlar',
    href: '/rentals?type=apartment',
    icon: Building2,
    description: 'Denize sıfır apartlar'
  },
  {
    title: 'Stüdyo Daireler',
    href: '/rentals?type=studio',
    icon: Building2,
    description: 'Ekonomik konaklama'
  }]

},
{
  title: 'Popüler Lokasyonlar',
  items: [
  {
    title: 'Alanya',
    href: '/rentals?city=alanya',
    icon: Palmtree,
    description: 'Akdeniz incisi',
    popular: true
  },
  {
    title: 'Antalya',
    href: '/rentals?city=antalya',
    icon: Palmtree,
    description: 'Turizm başkenti',
    popular: true
  },
  {
    title: 'Marmaris',
    href: '/rentals?city=marmaris',
    icon: Waves,
    description: 'Doğa ve deniz'
  },
  {
    title: 'Bodrum',
    href: '/rentals?city=bodrum',
    icon: Waves,
    description: 'Lüks tatil'
  },
  {
    title: 'Çeşme',
    href: '/rentals?city=cesme',
    icon: Waves,
    description: 'Rüzgar sörfü cenneti'
  }]

},
{
  title: 'Özellikler',
  items: [
  {
    title: 'Havuzlu',
    href: '/rentals?feature=pool',
    icon: Waves,
    description: 'Özel havuzlu evler',
    popular: true
  },
  {
    title: 'Deniz Manzaralı',
    href: '/rentals?feature=seaview',
    icon: Mountain,
    description: 'Panoramik manzara'
  },
  {
    title: 'Sahile Yakın',
    href: '/rentals?feature=beachfront',
    icon: Palmtree,
    description: 'Plaja yürüme mesafesi'
  }]

}];


const CAR_RENTALS_MENU: MenuCategory[] = [
{
  title: 'Araç Kiralama',
  items: [
  {
    title: 'Tüm Araçlar',
    href: '/car-rentals',
    icon: Car,
    description: '1200+ araç seçeneği',
    popular: true
  },
  {
    title: 'Ekonomik Sedan',
    href: '/car-rentals?type=economy-sedan',
    icon: Car,
    description: '₺350/gün',
    popular: true
  },
  {
    title: 'SUV & Minivan',
    href: '/car-rentals?type=suv',
    icon: Car,
    description: 'Geniş araçlar'
  },
  {
    title: 'Lüks Araçlar',
    href: '/car-rentals?type=luxury',
    icon: Award,
    description: 'Premium deneyim',
    badge: 'VIP'
  }]

},
{
  title: 'Popüler Lokasyonlar',
  items: [
  {
    title: 'İstanbul Araç Kiralama',
    href: '/car-rentals?city=istanbul',
    icon: MapPin,
    description: 'Havalimanı teslimat',
    popular: true
  },
  {
    title: 'Antalya Araç Kiralama',
    href: '/car-rentals?city=antalya',
    icon: MapPin,
    description: 'Sahil tatili için',
    popular: true
  },
  {
    title: 'İzmir Araç Kiralama',
    href: '/car-rentals?city=izmir',
    icon: MapPin,
    description: 'Ege gezisi'
  }]

}];


const PARTNER_MENU: MenuCategory[] = [
{
  title: 'Partner Kategorileri',
  items: [
  {
    title: 'Konaklama Ortağı',
    href: '/partner#property',
    icon: Building2,
    description: 'Otel, apart, villa',
    popular: true
  },
  {
    title: 'Araç Kiralama Ortağı',
    href: '/partner#car-rental',
    icon: Car,
    description: 'Araç filosu yönetimi'
  },
  {
    title: 'Transfer Ortağı',
    href: '/partner#transfer',
    icon: Navigation,
    description: 'Havalimanı transferleri'
  },
  {
    title: 'Ticari Araç Ortağı',
    href: '/partner#commercial-vehicle',
    icon: Users,
    description: 'Minibüs, grup araçları'
  }]

},
{
  title: 'Partner Avantajları',
  items: [
  {
    title: '%0 Komisyon',
    href: '/partner',
    icon: TrendingUp,
    description: 'İlk 6 ay ücretsiz',
    popular: true
  },
  {
    title: 'Gelir Artırın',
    href: '/partner',
    icon: Award,
    description: '₺120K/ay potansiyel',
    popular: true
  },
  {
    title: 'AI Araçlar',
    href: '/partner',
    icon: Sparkles,
    description: 'Akıllı fiyatlandırma'
  },
  {
    title: '24/7 Destek',
    href: '/partner',
    icon: Users,
    description: 'Premium müşteri desteği'
  }]

}];


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
      case 'car-rentals':
        return CAR_RENTALS_MENU;
      case 'rentals':
        return RENTALS_MENU;
      case 'tours':
        return TOURS_MENU;
      case 'partner':
        return PARTNER_MENU;
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
        isScrolled ?
        'bg-lydian-bg/95 backdrop-blur-xl shadow-lg' :
        'bg-lydian-bg/80 backdrop-blur-md'}`
        }>

        <div className="mobile-nav-safe">
          <div className={`container-responsive ${LAYOUT_CONSTANTS.header.padding.x}`}>
            <div className={`flex items-center justify-between ${LAYOUT_CONSTANTS.header.height.mobile} ${LAYOUT_CONSTANTS.header.height.desktop}`}>
              {/* Left: Toggle (Mobile Only) + Logo */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* Mobile Menu Button - ONLY MOBILE - Uses @media query for absolute hiding on desktop */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-lydian-success/10 to-lydian-success/10 hover:from-lydian-success/20 hover:to-lydian-success/20 flex items-center justify-center transition-all active:scale-95 touch-target"
                  aria-label="Menüyü Aç"
                  title="Menü">

                  <Menu className="w-5 h-5 text-lydian-success" />
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                  <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-lydian-primary to-lydian-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}>

                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, 0],
                        y: [0, -2, 0, 2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}>

                      <Plane className="w-5 h-5 md:w-6 md:h-6 text-lydian-text-inverse" />
                    </motion.div>
                  </motion.div>
                  <div className="hidden sm:block">
                    <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-lydian-primary to-lydian-secondary bg-clip-text text-transparent">
                      LyDian
                    </h1>
                    <p className="text-xs text-lydian-text-muted -mt-1">Travel AI</p>
                  </div>
                </Link>
              </div>

              {/* Center: Desktop Navigation - ONLY DESKTOP (lg and up) - Compact */}
              <nav className="hidden lg:flex items-center gap-0.5">
                <NavLinkWithSubmenu
                  href="/hotels"
                  icon={Hotel}
                  label="Oteller"
                  submenuKey="hotels"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('hotels')} />

                <NavLinkWithSubmenu
                  href="/flights"
                  icon={Plane}
                  label="Uçuşlar"
                  submenuKey="flights"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('flights')} />

                <NavLinkWithSubmenu
                  href="/transfers"
                  icon={Car}
                  label="Transfer"
                  submenuKey="transfers"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('transfers')} />

                <NavLinkWithSubmenu
                  href="/car-rentals"
                  icon={Car}
                  label="Araç Kiralama"
                  submenuKey="car-rentals"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('car-rentals')} />

                <NavLinkWithSubmenu
                  href="/rentals"
                  icon={Home}
                  label="Konaklama"
                  submenuKey="rentals"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('rentals')} />

                <NavLinkWithSubmenu
                  href="/tours"
                  icon={Compass}
                  label="Turlar"
                  submenuKey="tours"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('tours')} />

                <NavLinkWithSubmenu
                  href="/partner"
                  icon={Building2}
                  label="Partner"
                  submenuKey="partner"
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  submenuContent={getSubmenuContent('partner')} />

              </nav>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                {/* Theme Toggle */}
                <ThemeToggle variant="icon" />
                {/* Premium Search Button - Opens Quick Search Modal */}
                <motion.button
                  onClick={() => setIsQuickSearchOpen(true)}
                  className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-lydian-success to-lydian-success flex items-center justify-center shadow-lg hover:shadow-xl transition-all touch-target group overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Hızlı Arama">

                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-50 group-hover:opacity-75 blur-md transition-opacity" />

                  {/* Animated Sparkle Effect */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0">

                    <Sparkles className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 sm:w-3 sm:h-3 text-lydian-text-inverse/50" />
                    <Sparkles className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 text-lydian-text-inverse/30" />
                  </motion.div>

                  {/* Search Icon */}
                  <motion.div
                    animate={{
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10">

                    <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-lydian-text-inverse drop-shadow-lg" />
                  </motion.div>

                  {/* Pulse Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-lydian-border-light pointer-events-none" />

                </motion.button>

                {/* Favorites (Desktop) */}
                <Link
                  href="/favorites"
                  className="hidden md:flex w-9 h-9 rounded-lg bg-lydian-glass-dark-medium hover:bg-lydian-error-lighter items-center justify-center transition-all active:scale-95 touch-target group"
                  aria-label="Favoriler">

                  <Heart className="w-4 h-4 text-lydian-text-muted group-hover:text-lydian-error group-hover:scale-110 transition-all" />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 rounded-lg bg-lydian-glass-dark-medium hover:bg-lydian-success-lighter flex items-center justify-center transition-all active:scale-95 touch-target group"
                  aria-label="Sepet">

                  <ShoppingCart className="w-4 h-4 sm:w-4 sm:h-4 text-lydian-text-muted group-hover:text-lydian-success group-hover:scale-110 transition-all" />
                  {cartItemCount > 0 &&
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5 bg-gradient-to-br from-lydian-success to-lydian-success text-lydian-text-inverse text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center shadow-lg px-1">

                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </motion.span>
                  }
                </Link>

                {/* Premium Voice Assistant Button - Hidden on Mobile */}
                <div className="hidden md:block">
                  <PremiumVoiceButton />
                </div>

                {/* User Menu - ALWAYS VISIBLE */}
                {session ?
                <Link
                  href="/profile/dashboard"
                  className="w-9 h-9 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-lydian-primary/10 to-lydian-secondary/10 hover:from-lydian-primary/20 hover:to-lydian-secondary/20 flex items-center justify-center transition-all active:scale-95 touch-target"
                  aria-label="Profil">

                    <User className="w-4 h-4 sm:w-4 sm:h-4 text-lydian-primary" />
                  </Link> :

                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse rounded-lg font-medium hover:shadow-lg active:scale-95 transition-all touch-target text-[11px] sm:text-xs md:text-sm whitespace-nowrap">

                    Giriş
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Active for mobile devices */}
      <ResponsiveMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)} />


      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)} />


      {/* AI Assistant */}
      <AIAssistantPopup
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)} />


      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className={`${LAYOUT_CONSTANTS.header.height.mobile} ${LAYOUT_CONSTANTS.header.height.desktop}`} />
    </>);

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
        className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all hover:bg-lydian-glass-dark group ${
        isActive ?
        'bg-gradient-to-r from-lydian-primary/10 to-lydian-secondary/10 text-lydian-primary' :
        'text-gray-200'}`
        }>

        <Icon className={`w-4 h-4 ${isActive ? 'text-lydian-primary' : 'text-lydian-text-dim'}`} />
        <span className="text-sm font-semibold">{label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} />

        {badge &&
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-lydian-text-inverse text-xs font-bold rounded-full">
            {badge}
          </span>
        }
      </button>

      {/* Submenu Dropdown - Premium Compact Design */}
      <AnimatePresence>
        {isSubmenuOpen &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}>

            <div className="w-[280px] bg-lydian-glass-dark shadow-2xl border border-lydian-border-light/10 rounded-2xl overflow-hidden">
              <div className="p-4">
                <div className="space-y-3">
                  {submenuContent.map((category, idx) =>
                <div key={idx} className={idx > 0 ? 'pt-3 mt-3 border-t border-gray-100' : ''}>
                      <h3 className="text-xs font-semibold text-lydian-text-muted uppercase tracking-wide mb-2 px-1">
                        {category.title}
                      </h3>
                      <div className="space-y-0.5">
                        {category.items.slice(0, 4).map((item, itemIdx) =>
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={() => setActiveSubmenu(null)}
                      className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-lydian-primary-lighter transition-all duration-200 group">

                            <div className="w-8 h-8 rounded-lg bg-lydian-primary-lighter flex items-center justify-center flex-shrink-0 group-hover:bg-lydian-primary-light transition-colors">
                              <item.icon className="w-4 h-4 text-lydian-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-lydian-text-muted text-sm group-hover:text-lydian-primary transition-colors truncate">
                                  {item.title}
                                </span>
                                {item.popular &&
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                          }
                                {item.badge &&
                          <span className="px-1.5 py-0.5 bg-lydian-success text-lydian-text-inverse text-[10px] font-bold rounded">
                                    {item.badge}
                                  </span>
                          }
                              </div>
                            </div>
                          </Link>
                    )}
                      </div>
                    </div>
                )}
                </div>
              </div>

              {/* Compact Footer */}
              <div className="px-4 py-3 border-t border-lydian-border-light bg-lydian-glass-dark">
                <Link
                href={href}
                onClick={() => setActiveSubmenu(null)}
                className="text-xs font-semibold text-lydian-primary hover:text-lydian-secondary transition-colors flex items-center justify-center gap-1">

                  Tümünü Gör
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </Link>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default ResponsiveHeaderBar;