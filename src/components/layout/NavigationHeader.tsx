import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getHeaderHeightClasses, getHeaderContainerClasses, LAYOUT_CONSTANTS } from '@/config/layout-constants';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  MapPin,
  Activity,
  CreditCard,
  Headphones,
  Settings,
  LogOut,
  Star,
  Bot,
  TrendingUp,
  Clock,
  ArrowRight,
  Globe,
  Compass,
  ChevronDown,
  LucideIcon,
  Car,
  Bus,
  Home,
  Building2 } from
'lucide-react';
import { searchInData, popularSearches, categoryConfig, type SearchResult } from '../../data/searchData';
import { useCart } from '../../context/CartContext';
import AIAssistantPopup from '../ui/AIAssistantPopup';
import LanguageSwitcher from '../LanguageSwitcher';
import logger from '../../lib/logger';

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
}

export type NavigationTheme = 'default' | 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'pink';

interface NavigationHeaderProps {
  theme?: NavigationTheme;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ theme = 'default' }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t, i18n } = useTranslation(['common', 'navigation']);
  const { getItemCount } = useCart();

  // Theme color configurations
  const getThemeColors = (themeType: NavigationTheme) => {
    const themes = {
      default: {
        logo: 'from-lydian-primary to-lydian-secondary',
        aiButton: 'from-lydian-primary to-lydian-secondary hover:from-lydian-primary-hover hover:to-lydian-secondary-hover',
        activeLink: 'bg-lydian-primary-lighter text-lydian-primary'
      },
      blue: {
        logo: 'from-lydian-info to-lydian-accent-cyan',
        aiButton: 'from-lydian-info to-lydian-accent-cyan hover:from-lydian-info-hover hover:to-lydian-accent-cyan-hover',
        activeLink: 'bg-lydian-info-lighter text-lydian-info'
      },
      cyan: {
        logo: 'from-lydian-accent-cyan to-lydian-info',
        aiButton: 'from-lydian-accent-cyan to-lydian-info hover:from-lydian-accent-cyan-hover hover:to-lydian-info-hover',
        activeLink: 'bg-lydian-accent-cyan-lighter text-lydian-accent-cyan'
      },
      green: {
        logo: 'from-lydian-success to-lydian-success-hover',
        aiButton: 'from-lydian-success to-lydian-success-hover hover:from-lydian-success-hover hover:to-lydian-success-darker',
        activeLink: 'bg-lydian-success-lighter text-lydian-success'
      },
      purple: {
        logo: 'from-lydian-accent-purple to-lydian-primary',
        aiButton: 'from-lydian-accent-purple to-lydian-primary hover:from-lydian-accent-purple-hover hover:to-lydian-primary-hover',
        activeLink: 'bg-lydian-accent-purple-lighter text-lydian-accent-purple'
      },
      orange: {
        logo: 'from-lydian-warning to-lydian-primary',
        aiButton: 'from-lydian-warning to-lydian-primary hover:from-lydian-warning-hover hover:to-lydian-primary-hover',
        activeLink: 'bg-lydian-warning-lighter text-lydian-warning'
      },
      pink: {
        logo: 'from-lydian-primary to-lydian-error',
        aiButton: 'from-lydian-primary to-lydian-error hover:from-lydian-primary-hover hover:to-lydian-error-hover',
        activeLink: 'bg-lydian-primary-lighter text-lydian-primary'
      }
    };
    return themes[themeType];
  };

  const themeColors = getThemeColors(theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isToursMenuOpen, setIsToursMenuOpen] = useState(false);
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSliderSearchOpen, setIsSliderSearchOpen] = useState(false);
  const [dynamicMenuItems, setDynamicMenuItems] = useState<NavItem[]>([]);
  const [dynamicToursItems, setDynamicToursItems] = useState<any[]>([]);

  // Global AI Assistant state management
  useEffect(() => {
    const handleOpenAI = () => setIsAIAssistantOpen(true);
    window.addEventListener('openAIAssistant', handleOpenAI);
    return () => window.removeEventListener('openAIAssistant', handleOpenAI);
  }, []);

  // Fetch dynamic navigation menus from API
  useEffect(() => {
    const fetchNavigationMenus = async () => {
      try {
        // Fetch header menus
        const headerResponse = await fetch('/api/admin/navigation/menus?type=HEADER&isActive=true');
        const headerResult = await headerResponse.json();

        if (headerResult.success && headerResult.data) {
          // Map icon strings to actual icon components
          const iconMap: Record<string, LucideIcon> = {
            MapPin, Compass, Star, Home, Car, Bus, Building2
          };

          const menus: NavItem[] = headerResult.data.
          filter((menu: any) => !menu.parentId) // Only top-level menus
          .map((menu: any) => {
            let title = menu.translations?.tr?.title || menu.title;

            // "Araç Kiralama" yazısını "Kiralama" olarak düzelt
            if (title === 'Araç Kiralama') {
              title = 'Kiralama';
            }

            return {
              title,
              href: menu.href,
              icon: iconMap[menu.icon || 'MapPin'] || MapPin,
              description: menu.translations?.tr?.description || menu.description || '',
              badge: menu.badge
            };
          });

          setDynamicMenuItems(menus);

          // Find Tours parent and get its children for dropdown
          const toursParent = headerResult.data.find((m: any) => m.slug === 'tours');
          if (toursParent && toursParent.children) {
            const toursSubmenus = toursParent.children.map((child: any) => ({
              title: child.translations?.tr?.title || child.title,
              href: child.href,
              description: child.translations?.tr?.description || child.description || '',
              icon: '🎯', // Could be enhanced to support emoji mapping
              badge: child.badge || ''
            }));
            setDynamicToursItems(toursSubmenus);
          }
        }
      } catch (error) {
        logger.error('Error fetching navigation menus:', error as Error, { component: 'Navigationheader' });
        // Fallback to static menus on error - handled below
      }
    };

    fetchNavigationMenus();
  }, []);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('travel-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        const results = searchInData(query, 8);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
      setSelectedResultIndex(-1);
    }, 300),
    []
  );

  // Debounce utility function
  function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number)
  : (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (!searchQuery.trim() && searchHistory.length > 0) {
      // Show popular searches and history when focused without query
      setSearchResults([]);
    }
  };

  // Handle search blur
  const handleSearchBlur = (e: React.FocusEvent) => {
    // Delay hiding dropdown to allow clicking on results
    setTimeout(() => {
      if (!searchDropdownRef.current?.contains(e.relatedTarget as Node)) {
        setIsSearchFocused(false);
        setSelectedResultIndex(-1);
      }
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchFocused) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedResultIndex((prev) => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedResultIndex >= 0 && searchResults[selectedResultIndex]) {
          handleSearchSelect(searchResults[selectedResultIndex]);
        } else if (searchQuery.trim()) {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setIsSearchFocused(false);
        setSelectedResultIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  // Handle search result selection
  const handleSearchSelect = (result: SearchResult) => {
    addToSearchHistory(result.title);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    router.push(result.url);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchResults([]);
      setIsSearchFocused(false);
    }
  };

  // Add to search history
  const addToSearchHistory = (query: string) => {
    const newHistory = [query, ...searchHistory.filter((h) => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('travel-search-history', JSON.stringify(newHistory));
  };

  // Handle popular search click
  const handlePopularSearchClick = (query: string) => {
    setSearchQuery(query);
    const results = searchInData(query, 8);
    setSearchResults(results);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target as Node) &&
      !searchInputRef.current?.contains(event.target as Node))
      {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageMenuOpen && !target.closest('.language-menu-container')) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageMenuOpen]);

  const mainNavItems: NavItem[] = [
  {
    title: 'Destinasyonlar',
    href: '/destinations',
    icon: MapPin,
    description: 'Türkiye\'nin en güzel yerlerini keşfedin'
  },
  {
    title: 'Turlar',
    href: '/tours',
    icon: Compass,
    description: 'Marmaris, Bodrum, Çeşme\'de macera'
  },
  {
    title: 'Konaklama',
    href: '/rentals',
    icon: Home,
    description: 'Villa, Daire ve Ev kiralama'
  },
  {
    title: 'Kiralama',
    href: '/car-rentals',
    icon: Car,
    description: 'Ekonomik ve lüks araçlar'
  },
  {
    title: 'Transfer',
    href: '/transfers',
    icon: Bus,
    description: 'Havalimanı ve şehir içi transfer'
  },
  {
    title: 'Partner',
    href: '/partner',
    icon: Building2,
    description: 'İş ortağımız olun ve kazancınızı artırın'
  }];


  // Tours dropdown menu items
  const toursMenuItems = [
  {
    title: 'Marmaris Turları',
    href: '/tours?region=Marmaris',
    description: '12 Ada Tekne, Jeep Safari, Dalyan',
    icon: '🚤',
    badge: '16 Tur'
  },
  {
    title: 'Bodrum Turları',
    href: '/tours?region=Bodrum',
    description: 'Tekne Turları, Antik Kentler, Plajlar',
    icon: '⛵',
    badge: '14 Tur'
  },
  {
    title: 'Çeşme Turları',
    href: '/tours?region=Çeşme',
    description: 'Deniz Sporları, Şarap Turları, Alaçatı',
    icon: '🏄',
    badge: '16 Tur'
  },
  {
    title: 'Tüm Turlar',
    href: '/tours',
    description: '45+ kapsamlı tur seçeneği',
    icon: '🎯',
    badge: 'Popüler'
  }];


  // Car Rentals dropdown menu items
  const carRentalsMenuItems = [
  {
    title: 'Ekonomik Araçlar',
    href: '/car-rentals?type=economy-sedan',
    description: 'Uygun fiyatlı sedan ve kompakt',
    icon: '🚗',
    badge: '₺350/gün'
  },
  {
    title: 'SUV & Crossover',
    href: '/car-rentals?type=economy-suv',
    description: 'Geniş aileler için ideal',
    icon: '🚙',
    badge: '₺600/gün'
  },
  {
    title: 'Lüks Araçlar',
    href: '/car-rentals?type=luxury-sedan',
    description: 'Premium konfor ve prestij',
    icon: '🏎️',
    badge: '₺1,200/gün'
  },
  {
    title: 'Ticari Araçlar',
    href: '/car-rentals?type=commercial-van',
    description: 'Minivan, Minibüs, Kamyonet',
    icon: '🚐',
    badge: '₺800/gün'
  },
  {
    title: 'Tüm Araçlar',
    href: '/car-rentals',
    description: '1,200+ araç seçeneği',
    icon: '🎯',
    badge: 'Popüler'
  }];


  // Transfer dropdown menu items
  const transferMenuItems = [
  {
    title: 'Havalimanı Transfer',
    href: '/transfers?route=airport',
    description: 'İstanbul, Antalya, Bodrum Havalimanları',
    icon: '✈️',
    badge: 'Popüler'
  },
  {
    title: 'VIP Transfer',
    href: '/transfers?type=vip-sedan',
    description: 'Lüks araçlarla özel transfer',
    icon: '👔',
    badge: 'Premium'
  },
  {
    title: 'Şehir İçi Transfer',
    href: '/transfers?route=city',
    description: 'Şehir içi güvenli ulaşım',
    icon: '🏙️',
    badge: '₺200+'
  },
  {
    title: 'Grup Transfer',
    href: '/transfers?type=minibus-14',
    description: '8-30 kişilik grup taşıma',
    icon: '👥',
    badge: '14-30 kişi'
  },
  {
    title: 'Şehirlerarası Transfer',
    href: '/transfers?route=intercity',
    description: 'İstanbul-Ankara, İzmir-Bodrum vb.',
    icon: '🛣️',
    badge: 'Uzun mesafe'
  },
  {
    title: 'Tüm Transferler',
    href: '/transfers',
    description: '1,500+ transfer hizmeti',
    icon: '🎯',
    badge: 'D2 Belgeli'
  }];


  const userMenuItems = [
  { title: isClient ? t('navigation:profile', 'Profilim') : 'Profilim', href: '/profile', icon: User },
  { title: isClient ? t('navigation:bookings', 'Rezervasyonlarım') : 'Rezervasyonlarım', href: '/bookings', icon: Activity },
  { title: isClient ? t('navigation:favorites', 'Favorilerim') : 'Favorilerim', href: '/favorites', icon: Heart },
  { title: 'Partner Panelleri', href: '#', icon: Building2, isHeader: true },
  { title: 'Ev Kiralama Paneli', href: '/owner', icon: Home },
  { title: 'Araç Kiralama Paneli', href: '/vehicle-owner', icon: Car },
  { title: 'Transfer Paneli', href: '/transfer-owner', icon: Bus },
  { title: isClient ? t('navigation:billing', 'Faturalandırma & Kripto') : 'Faturalandırma & Kripto', href: '/billing', icon: CreditCard },
  { title: isClient ? t('navigation:support', 'Destek') : 'Destek', href: '/support', icon: Headphones },
  { title: isClient ? t('navigation:settings', 'Ayarlar') : 'Ayarlar', href: '/settings', icon: Settings }];


  const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }];


  const currentLanguage = languages.find((lang) => lang.code === (router.locale || 'tr')) || languages[0];

  const handleLanguageChange = (locale: string) => {
    const { pathname, asPath, query } = router;
    // Use router.push with locale option to change language
    router.push({ pathname, query }, asPath, { locale }).then(() => {
      setIsLanguageMenuOpen(false);
    });
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className={`booking-header sticky top-0 ${LAYOUT_CONSTANTS.header.zIndex} bg-white dark:bg-gray-900 border-b border-lydian-border-light/10 dark:border-gray-800 transition-colors duration-300`}>
      <div className={getHeaderContainerClasses()}>
        <div className={`flex items-center justify-between ${getHeaderHeightClasses()}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className={`text-xl md:text-2xl font-black bg-gradient-to-r ${themeColors.logo} bg-clip-text text-transparent`}>
                  Travel
                </span>
                <span className="text-xl md:text-2xl font-black text-lydian-text-inverse">
                  LyDian
                </span>
              </div>
              <p className="text-xs font-medium text-lydian-text-muted -mt-1 tracking-wide hidden sm:block">
                AI-Powered Enterprise
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleKeyDown}
                placeholder={isClient ? t('common:searchPlaceholder', 'Destinasyon, deneyim, otel arayın...') : 'Destinasyon, deneyim, otel arayın...'}
                className="header-search w-full pl-12 pr-4 py-3 outline-none text-lydian-text-inverse placeholder-lydian-text-tertiary font-medium"
                autoComplete="off" />

              
              {/* Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (searchResults.length > 0 || searchQuery.trim() === '' || searchHistory.length > 0) &&
                <div
                  ref={searchDropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-lydian-glass-dark rounded-xl shadow-2xl border border-lydian-border-light/10 z-50 max-h-96 overflow-y-auto">

                    <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}>

                    {/* Search Results */}
                    {searchResults.length > 0 &&
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-lydian-text-muted uppercase tracking-wider border-b border-lydian-border-light">
                          Arama Sonuçları
                        </div>
                        {searchResults.map((result, index) => {
                        const categoryInfo = categoryConfig[result.category];
                        return (
                          <button
                            key={result.id}
                            onClick={() => handleSearchSelect(result)}
                            className={`w-full px-4 py-3 text-left hover:bg-lydian-primary-lighter dark:hover:bg-lydian-glass-dark transition-colors flex items-center gap-3 ${
                            selectedResultIndex === index ? 'bg-lydian-primary-lighter dark:bg-lydian-glass-dark' : ''}`
                            }>

                              {result.image &&
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-10 h-10 rounded-lg object-cover" />

                            }
                              {!result.image &&
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${categoryInfo.color}`}>
                                  {categoryInfo.icon}
                                </div>
                            }
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-lydian-text-inverse truncate">{result.title}</span>
                                  {result.rating &&
                                <div className="flex items-center gap-1 text-xs">
                                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                      <span className="text-lydian-text-dim">{result.rating}</span>
                                    </div>
                                }
                                </div>
                                <p className="text-sm text-lydian-text-muted truncate">{result.subtitle}</p>
                              </div>
                              {result.price &&
                            <span className="text-sm font-semibold text-lydian-primary">{result.price}</span>
                            }
                            </button>);

                      })}
                      </div>
                    }
                    
                    {/* Popular Searches & History */}
                    {searchQuery.trim() === '' &&
                    <div className="py-2">
                        {/* Recent Searches */}
                        {searchHistory.length > 0 &&
                      <div className="mb-4">
                            <div className="px-4 py-2 text-xs font-semibold text-lydian-text-muted uppercase tracking-wider border-b border-lydian-border-light">
                              Son Aramalar
                            </div>
                            {searchHistory.map((query, index) =>
                        <button
                          key={index}
                          onClick={() => handlePopularSearchClick(query)}
                          className="w-full px-4 py-2 text-left hover:bg-lydian-glass-dark transition-colors flex items-center gap-3">

                                <Clock className="w-4 h-4 text-lydian-text-muted" />
                                <span className="text-lydian-text-muted">{query}</span>
                              </button>
                        )}
                          </div>
                      }
                        
                        {/* Popular Searches */}
                        <div>
                          <div className="px-4 py-2 text-xs font-semibold text-lydian-text-muted uppercase tracking-wider border-b border-lydian-border-light">
                            Popüler Aramalar
                          </div>
                          {popularSearches.slice(0, 6).map((query, index) =>
                        <button
                          key={index}
                          onClick={() => handlePopularSearchClick(query)}
                          className="w-full px-4 py-2 text-left hover:bg-lydian-glass-dark transition-colors flex items-center gap-3">

                              <TrendingUp className="w-4 h-4 text-lydian-text-muted" />
                              <span className="text-lydian-text-muted">{query}</span>
                            </button>
                        )}
                        </div>
                      </div>
                    }
                    
                    {/* No Results */}
                    {searchQuery.trim() !== '' && searchResults.length === 0 &&
                    <div className="px-4 py-8 text-center">
                        <Search className="w-8 h-8 text-lydian-text-dim mx-auto mb-2" />
                        <p className="text-lydian-text-muted">Arama sonucu bulunamadı</p>
                        <button
                        onClick={handleSearchSubmit}
                        className="mt-2 text-lydian-primary hover:text-lydian-primary-dark text-sm flex items-center gap-1 mx-auto">

                          <span>&quot;{searchQuery}&quot; için tüm sonuçları görüntüle</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    }
                    </motion.div>
                  </div>
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {(dynamicMenuItems.length > 0 ? dynamicMenuItems : mainNavItems).map((item) => {
              const Icon = item.icon;
              const isTours = item.title === 'Turlar';
              const toursItems = dynamicToursItems.length > 0 ? dynamicToursItems : toursMenuItems;

              if (isTours) {
                return (
                  <div key={item.href} className="relative">
                    <button
                      onMouseEnter={() => setIsToursMenuOpen(true)}
                      onMouseLeave={() => setIsToursMenuOpen(false)}
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive(item.href) ?
                      'nav-link-active' :
                      'nav-link'}`
                      }>

                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {/* Tours Dropdown */}
                    <AnimatePresence>
                      {isToursMenuOpen &&
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setIsToursMenuOpen(true)}
                        onMouseLeave={() => setIsToursMenuOpen(false)}
                        className="absolute top-full left-0 mt-2 w-80 bg-lydian-glass-dark rounded-xl shadow-2xl border border-lydian-border-light/10 z-50 overflow-hidden">

                          <div className="p-2">
                            {toursItems.map((tour) =>
                          <Link
                            key={tour.href}
                            href={tour.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-lydian-glass-dark transition-colors group">

                                <span className="text-2xl">{tour.icon}</span>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-lydian-text-inverse group-hover:text-lydian-primary transition-colors">
                                      {tour.title}
                                    </h4>
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-lydian-primary to-lydian-secondary text-lydian-text-inverse">
                                      {tour.badge}
                                    </span>
                                  </div>
                                  <p className="text-xs text-lydian-text-dim">{tour.description}</p>
                                </div>
                              </Link>
                          )}
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                  </div>);

              }

              const isCarRental = item.title === 'Kiralama';

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 group ${
                  isActive(item.href) ?
                  'nav-link-active' :
                  'nav-link'}`
                  }>

                  {isCarRental ? (
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                        rotate: [0, -2, 2, -2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative">
                      <Icon className="w-4 h-4 text-lydian-primary group-hover:scale-110 transition-transform" />
                      <motion.div
                        className="absolute -right-0.5 -top-0.5 w-1 h-1 bg-lydian-primary rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="font-medium">{item.title}</span>
                  {item.badge &&
                  <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-lydian-text-inverse px-2 py-0.5 rounded-full font-semibold shadow-sm">
                      {item.badge}
                    </span>
                  }
                </Link>);

            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle variant="icon" className="hidden sm:block" />

            {/* Search Icon - Mobile & Tablet */}
            <button
              onClick={() => setIsSliderSearchOpen(true)}
              className="lg:hidden p-2 text-lydian-text-muted hover:bg-lydian-glass-dark rounded-lg transition-colors group">

              <Search className="w-5 h-5 group-hover:text-lydian-primary transition-colors" />
            </button>

            {/* Partner Button */}
            <Link href="/partner">
              <button
                className="relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-lydian-primary to-lydian-secondary hover:from-lydian-primary-hover hover:to-lydian-secondary-hover text-lydian-text-inverse rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-r from-lydian-secondary to-lydian-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Building2 className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden lg:inline font-semibold relative z-10">Partner Ol</span>
                <div className="absolute top-0 right-0 w-2 h-2 bg-lydian-warning rounded-full animate-ping"></div>
              </button>
            </Link>

            {/* AI Assistant */}
            <button
              onClick={() => {
                // AI Asistan'ı hero section üstünde aç
                window.dispatchEvent(new CustomEvent('openAIAssistant'));
              }}
              className={`relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${themeColors.aiButton} text-lydian-text-inverse rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group`}>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>

                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm font-semibold hidden lg:inline">AI Asistan</span>
                </div>
              </motion.div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-lydian-success rounded-full border-2 border-white dark:border-gray-900 animate-pulse shadow-sm"></div>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block language-menu-container">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="language-selector">

                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen &&
                <div className="absolute right-0 mt-2 w-48 bg-lydian-glass-dark rounded-xl shadow-lg border border-lydian-border-light/10 py-2 z-50">
                    <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}>

                      {languages.map((language) =>
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      currentLanguage.code === language.code ?
                      'bg-lydian-primary-lighter dark:bg-lydian-glass-dark text-lydian-primary' :
                      'text-lydian-text-secondary dark:text-lydian-text-dim hover:bg-lydian-glass-dark'}`
                      }>

                          <span className="text-xl">{language.flag}</span>
                          <span className="text-sm font-medium">{language.name}</span>
                        </button>
                    )}
                    </motion.div>
                  </div>
                }
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link href="/cart-new" className="relative p-2 text-lydian-text-muted hover:bg-lydian-glass-dark rounded-lg transition-colors group">
              <ShoppingCart className="w-5 h-5 group-hover:text-lydian-primary transition-colors" />
              {getItemCount() > 0 &&
              <span className="absolute -top-1 -right-1 bg-lydian-primary text-lydian-text-inverse text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 font-medium animate-pulse">
                  {getItemCount()}
                </span>
              }
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" position="header" />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-lydian-text-muted hover:bg-lydian-glass-dark rounded-lg transition-colors">

                <div className="w-8 h-8 bg-gradient-to-r from-lydian-primary to-lydian-secondary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-lydian-text-inverse" />
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen &&
                <div className="absolute right-0 mt-2 w-64 bg-lydian-glass-dark rounded-xl shadow-lg border border-lydian-border-light/10 py-2">
                    <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}>

                    {session ?
                    <>
                        <div className="px-4 py-3 border-b border-lydian-border-light">
                          <p className="text-sm font-medium text-lydian-text-inverse">{session.user?.name || 'Kullanıcı'}</p>
                          <p className="text-xs text-lydian-text-muted">{session.user?.email}</p>
                          <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs bg-lydian-primary-light text-lydian-primary-dark">
                            {(session.user as any)?.membershipType || 'BASIC'} Üye
                          </span>
                        </div>
                        
                        <Link
                        href="/profile/dashboard"
                        className="flex items-center space-x-3 px-4 py-2 text-lydian-text-muted hover:bg-lydian-glass-dark transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}>

                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        
                        {userMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        if ((item as any).isHeader) {
                          return (
                            <div key={index} className="px-4 py-2 mt-2 border-t border-lydian-border-light">
                                <p className="text-xs font-semibold text-lydian-text-muted uppercase tracking-wider flex items-center gap-2">
                                  <Icon className="w-3 h-3" />
                                  {item.title}
                                </p>
                              </div>);

                        }
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-2 text-lydian-text-muted hover:bg-lydian-glass-dark transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}>

                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{item.title}</span>
                            </Link>);

                      })}
                        
                        <div className="border-t border-lydian-border-light mt-2 pt-2">
                          <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex items-center space-x-3 px-4 py-2 text-lydian-primary hover:bg-lydian-error-lighter transition-colors w-full">

                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">{isClient ? t('navigation:logout', 'Çıkış Yap') : 'Çıkış Yap'}</span>
                          </button>
                        </div>
                      </> :

                    <>
                        <div className="px-4 py-3 border-b border-lydian-border-light">
                          <p className="text-sm font-medium text-lydian-text-inverse">Merhaba! 👋</p>
                          <p className="text-xs text-lydian-text-muted">Seyahat maceranıza başlayın</p>
                        </div>
                        
                        <Link
                        href="/auth/signin"
                        className="flex items-center space-x-3 px-4 py-2 text-lydian-primary hover:bg-lydian-primary-lighter transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}>

                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Giriş Yap</span>
                        </Link>
                        
                        <Link
                        href="/auth/signup"
                        className="flex items-center space-x-3 px-4 py-2 text-lydian-success hover:bg-lydian-success-lighter transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}>

                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Ücretsiz Kayıt Ol</span>
                        </Link>
                      </>
                    }
                    </motion.div>
                  </div>
                }
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-lydian-text-muted hover:bg-lydian-glass-dark rounded-lg transition-colors">

              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen &&
        <div className="mobile-menu lg:hidden">
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}>

            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  placeholder={isClient ? t('common:searchDestinations', 'Destinasyon ara...') : 'Destinasyon ara...'}
                  className="w-full pl-10 pr-4 py-3 border border-lydian-border-light rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border font-medium text-lydian-text-dim placeholder-lydian-text-tertiary"
                  autoComplete="off" />

              </div>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {(dynamicMenuItems.length > 0 ? dynamicMenuItems : mainNavItems).map((item) => {
                  const Icon = item.icon;
                  const isTours = item.title === 'Turlar';
                  const toursItems = dynamicToursItems.length > 0 ? dynamicToursItems : toursMenuItems;

                  if (isTours) {
                    return (
                      <div key={item.href}>
                        <button
                          onClick={() => setIsMobileToursOpen(!isMobileToursOpen)}
                          className="mobile-menu-link w-full">

                          <Icon className="w-5 h-5" />
                          <div className="flex-1 text-left">
                            <div className="font-medium flex items-center gap-2">
                              {item.title}
                              <ChevronDown className={`w-4 h-4 transition-transform ${isMobileToursOpen ? 'rotate-180' : ''}`} />
                            </div>
                            <div className="text-xs text-lydian-text-muted">{item.description}</div>
                          </div>
                        </button>

                        {/* Mobile Tours Submenu */}
                        <AnimatePresence>
                          {isMobileToursOpen &&
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-8 mt-1 space-y-1">

                              {toursItems.map((tour) =>
                            <Link
                              key={tour.href}
                              href={tour.href}
                              className="flex items-start gap-2 p-2 rounded-lg hover:bg-lydian-glass-dark transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileToursOpen(false);
                              }}>

                                  <span className="text-lg">{tour.icon}</span>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-lydian-text-inverse">{tour.title}</span>
                                      <span className="text-xs px-1.5 py-0.5 rounded bg-lydian-primary-light text-lydian-primary-dark">
                                        {tour.badge}
                                      </span>
                                    </div>
                                    <p className="text-xs text-lydian-text-dim mt-0.5">{tour.description}</p>
                                  </div>
                                </Link>
                            )}
                            </motion.div>
                          }
                        </AnimatePresence>
                      </div>);

                  }

                  const isCarRental = item.title === 'Kiralama';

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mobile-menu-link relative flex items-center space-x-3 group"
                      onClick={() => setIsMenuOpen(false)}>

                      {isCarRental ? (
                        <motion.div
                          animate={{
                            x: [0, 3, 0],
                            rotate: [0, -2, 2, -2, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="relative">
                          <Icon className="w-5 h-5 text-lydian-primary group-hover:scale-110 transition-transform" />
                          <motion.div
                            className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-lydian-primary rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </motion.div>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {item.title}
                          {item.badge &&
                          <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-lydian-text-inverse px-2 py-0.5 rounded-full font-semibold">
                              {item.badge}
                            </span>
                          }
                        </div>
                        <div className="text-xs text-lydian-text-muted">{item.description}</div>
                      </div>
                    </Link>);

                })}
              </div>

            </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
      
      {/* Slider Search Panel */}
      <AnimatePresence>
        {isSliderSearchOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>

            <div
            className="fixed inset-0 bg-black/50 z-[9999] flex items-start justify-center pt-20"
            onClick={() => setIsSliderSearchOpen(false)}>

            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}>

              <div
                className="bg-lydian-glass-dark rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-lydian-border-light/10">
                <h3 className="text-lg font-semibold text-lydian-text-inverse flex items-center gap-2">
                  <Search className="w-5 h-5 text-lydian-primary" />
                  Arama Yap
                </h3>
                <button
                    onClick={() => setIsSliderSearchOpen(false)}
                    className="p-2 hover:bg-lydian-glass-dark-medium rounded-lg transition-colors">

                  <X className="w-5 h-5 text-lydian-text-muted" />
                </button>
              </div>

              {/* Search Content */}
              <div className="p-6">
                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-5 h-5" />
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={handleSearchFocus}
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          setIsSliderSearchOpen(false);
                        }
                      }}
                      placeholder="Destinasyon, deneyim, otel arayın..."
                      className="w-full pl-12 pr-4 py-4 border-2 border-lydian-border-light rounded-xl focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none text-lydian-text-inverse placeholder-lydian-text-tertiary font-medium text-lg"
                      autoComplete="off"
                      autoFocus />

                </div>

                {/* Quick Search Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-lydian-text-muted mb-3">Hızlı Arama</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: 'İstanbul Turları', icon: '🏛️', query: 'istanbul' },
                      { title: 'Kapadokya Balon', icon: '🎈', query: 'kapadokya balon' },
                      { title: 'Lüks Oteller', icon: '🏨', query: 'luxury hotel' },
                      { title: 'Deniz Turları', icon: '🏖️', query: 'beach tours' }].
                      map((item, index) =>
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(item.query);
                          const results = searchInData(item.query, 8);
                          setSearchResults(results);
                          setIsSearchFocused(true);
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-lydian-border-light/10 hover:border-lydian-border-focus hover:bg-lydian-primary-lighter transition-all">

                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-lydian-text-muted">{item.title}</span>
                      </button>
                      )}
                  </div>
                </div>

                {/* Search Results in Slider */}
                {searchResults.length > 0 &&
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-lydian-text-muted mb-3">Arama Sonuçları</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {searchResults.map((result, index) => {
                        const categoryInfo = categoryConfig[result.category];
                        return (
                          <button
                            key={result.id}
                            onClick={() => {
                              handleSearchSelect(result);
                              setIsSliderSearchOpen(false);
                            }}
                            className={`w-full p-3 rounded-lg hover:bg-lydian-primary-lighter dark:hover:bg-lydian-glass-dark transition-colors flex items-center gap-3 text-left ${
                            selectedResultIndex === index ? 'bg-lydian-primary-lighter dark:bg-lydian-glass-dark border border-lydian-primary' : 'border border-lydian-border-light'}`
                            }>

                            {result.image ?
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-12 h-12 rounded-lg object-cover" /> :


                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${categoryInfo.color}`}>
                                {categoryInfo.icon}
                              </div>
                            }
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-lydian-text-inverse truncate">{result.title}</span>
                                {result.rating &&
                                <div className="flex items-center gap-1 text-xs">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-lydian-text-dim">{result.rating}</span>
                                  </div>
                                }
                              </div>
                              <p className="text-sm text-lydian-text-muted truncate">{result.subtitle}</p>
                            </div>
                            {result.price &&
                            <span className="text-sm font-semibold text-lydian-primary">{result.price}</span>
                            }
                          </button>);

                      })}
                    </div>
                  </div>
                  }

                {/* Recent Searches in Slider */}
                {searchHistory.length > 0 && searchQuery.trim() === '' &&
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-lydian-text-muted mb-3">Son Aramalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((query, index) =>
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(query);
                          const results = searchInData(query, 8);
                          setSearchResults(results);
                          setIsSearchFocused(true);
                        }}
                        className="px-3 py-2 bg-lydian-glass-dark-medium hover:bg-lydian-bg-active rounded-lg text-sm font-medium text-lydian-text-muted transition-colors">

                          {query}
                        </button>
                      )}
                    </div>
                  </div>
                  }

                {/* Popular Searches in Slider */}
                {searchQuery.trim() === '' &&
                  <div>
                    <h4 className="text-sm font-semibold text-lydian-text-muted mb-3">Popüler Aramalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.slice(0, 8).map((query, index) =>
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(query);
                          const results = searchInData(query, 8);
                          setSearchResults(results);
                          setIsSearchFocused(true);
                        }}
                        className="px-3 py-2 bg-lydian-primary-lighter hover:bg-lydian-primary-light text-lydian-primary-dark rounded-lg text-sm font-medium transition-colors">

                          {query}
                        </button>
                      )}
                    </div>
                  </div>
                  }
              </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* AI Assistant Popup */}
      <AIAssistantPopup
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)} />

    </header>);

};

export default NavigationHeader;