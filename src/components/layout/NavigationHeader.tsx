import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Globe,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  MapPin,
  Plane,
  Building,
  Activity,
  CreditCard,
  Headphones,
  Settings,
  LogOut,
  Star,
  Bot,
  Gamepad2,
  Users,
  Mic,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import { searchInData, popularSearches, categoryConfig, type SearchResult } from '../../data/searchData';
import { useCart } from '../../context/CartContext';
import AIAssistantPopup from '../ui/AIAssistantPopup';
import VoiceMenu from '../voice/VoiceMenu';

const NavigationHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { t } = useTranslation(['common', 'navigation']);
  const { getItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSliderSearchOpen, setIsSliderSearchOpen] = useState(false);

  // Global AI Assistant state management
  useEffect(() => {
    const handleOpenAI = () => setIsAIAssistantOpen(true);
    window.addEventListener('openAIAssistant', handleOpenAI);
    return () => window.removeEventListener('openAIAssistant', handleOpenAI);
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
    wait: number
  ): (...args: Parameters<T>) => void {
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
        setSelectedResultIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedResultIndex(prev => prev > 0 ? prev - 1 : -1);
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
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
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
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainNavItems = [
    { 
      title: 'Destinasyonlar', 
      href: '/destinations',
      icon: MapPin,
      description: 'Türkiye\'nin en güzel yerlerini keşfedin'
    },
    { 
      title: 'Deneyimler', 
      href: '/experiences',
      icon: Star,
      description: 'Benzersiz deneyimler yaşayın'
    },
    { 
      title: 'Oteller', 
      href: '/hotels',
      icon: Building,
      description: 'En iyi konaklama seçenekleri'
    },
    { 
      title: 'Uçak Biletleri', 
      href: '/flights',
      icon: Plane,
      description: 'Uygun fiyatlı uçak biletleri'
    },
  ];

  const advancedFeatures = [
    {
      title: isClient ? t('navigation:aiAssistant', 'AI Asistan') : 'AI Asistan',
      href: '/ai-assistant',
      icon: Bot,
      description: isClient ? t('navigation:aiAssistantDesc', 'Akıllı seyahat planlama') : 'Akıllı seyahat planlama',
      badge: 'AI'
    },
    {
      title: isClient ? t('navigation:virtualTours', 'Sanal Turlar') : 'Sanal Turlar',
      href: '/virtual-tours',
      icon: Gamepad2,
      description: isClient ? t('navigation:virtualToursDesc', '360° VR deneyimleri') : '360° VR deneyimleri',
      badge: 'VR'
    },
    {
      title: isClient ? t('navigation:socialHub', 'Sosyal Ağ') : 'Sosyal Ağ',
      href: '/social',
      icon: Users,
      description: isClient ? t('navigation:socialHubDesc', 'Seyahat topluluğu') : 'Seyahat topluluğu',
      badge: 'Social'
    },
    {
      title: isClient ? t('navigation:voiceControl', 'Sesli Komutlar') : 'Sesli Komutlar',
      href: '/voice',
      icon: Mic,
      description: isClient ? t('navigation:voiceControlDesc', 'Elleri serbest navigasyon') : 'Elleri serbest navigasyon',
      badge: 'Voice'
    }
  ];

  const userMenuItems = [
    { title: isClient ? t('navigation:profile', 'Profilim') : 'Profilim', href: '/profile', icon: User },
    { title: isClient ? t('navigation:bookings', 'Rezervasyonlarım') : 'Rezervasyonlarım', href: '/bookings', icon: Activity },
    { title: isClient ? t('navigation:favorites', 'Favorilerim') : 'Favorilerim', href: '/favorites', icon: Heart },
    { title: isClient ? t('navigation:billing', 'Faturalandırma & Kripto') : 'Faturalandırma & Kripto', href: '/billing', icon: CreditCard },
    { title: isClient ? t('navigation:support', 'Destek') : 'Destek', href: '/support', icon: Headphones },
    { title: isClient ? t('navigation:settings', 'Ayarlar') : 'Ayarlar', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top promotional bar */}
      <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">🎉 Yeni: AI destekli seyahat planlama ve Blockchain ödemeler artık kullanımda!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-ailydian-primary to-ailydian-secondary bg-clip-text text-transparent">
                  Travel
                </span>
                <span className="text-xl md:text-2xl font-black text-gray-900">
                  Ailydian
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 -mt-1 tracking-wide hidden sm:block">
                AI-Powered Enterprise
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleKeyDown}
                placeholder={isClient ? t('common:searchPlaceholder', 'Destinasyon, deneyim, otel arayın...') : 'Destinasyon, deneyim, otel arayın...'}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 font-medium"
                autoComplete="off"
              />
              
              {/* Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (searchResults.length > 0 || searchQuery.trim() === '' || searchHistory.length > 0) && (
                  <div
                    ref={searchDropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                          Arama Sonuçları
                        </div>
                        {searchResults.map((result, index) => {
                          const categoryInfo = categoryConfig[result.category];
                          return (
                            <button
                              key={result.id}
                              onClick={() => handleSearchSelect(result)}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                selectedResultIndex === index ? 'bg-blue-50' : ''
                              }`}
                            >
                              {result.image && (
                                <img 
                                  src={result.image} 
                                  alt={result.title}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              )}
                              {!result.image && (
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${categoryInfo.color}`}>
                                  {categoryInfo.icon}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900 truncate">{result.title}</span>
                                  {result.rating && (
                                    <div className="flex items-center gap-1 text-xs">
                                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                      <span className="text-gray-600">{result.rating}</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                              </div>
                              {result.price && (
                                <span className="text-sm font-semibold text-blue-600">{result.price}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Popular Searches & History */}
                    {searchQuery.trim() === '' && (
                      <div className="py-2">
                        {/* Recent Searches */}
                        {searchHistory.length > 0 && (
                          <div className="mb-4">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                              Son Aramalar
                            </div>
                            {searchHistory.map((query, index) => (
                              <button
                                key={index}
                                onClick={() => handlePopularSearchClick(query)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                              >
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{query}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Popular Searches */}
                        <div>
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            Popüler Aramalar
                          </div>
                          {popularSearches.slice(0, 6).map((query, index) => (
                            <button
                              key={index}
                              onClick={() => handlePopularSearchClick(query)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                            >
                              <TrendingUp className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{query}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* No Results */}
                    {searchQuery.trim() !== '' && searchResults.length === 0 && (
                      <div className="px-4 py-8 text-center">
                        <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">Arama sonucu bulunamadı</p>
                        <button
                          onClick={handleSearchSubmit}
                          className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mx-auto"
                        >
                          <span>&quot;{searchQuery}&quot; için tüm sonuçları görüntüle</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search Icon - Mobile & Tablet */}
            <button
              onClick={() => setIsSliderSearchOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <Search className="w-5 h-5 group-hover:text-ailydian-primary transition-colors" />
            </button>
            {/* Voice Control */}
            <VoiceMenu className="hidden sm:block" />

            {/* AI Assistant */}
            <button 
              onClick={() => {
                // AI Asistan'ı hero section üstünde aç
                window.dispatchEvent(new CustomEvent('openAIAssistant'));
              }}
              className="relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <span className="text-sm font-medium hidden lg:inline">AI Asistan</span>
                </div>
              </motion.div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </button>

            {/* Language */}
            <button className="hidden sm:flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">TR</span>
            </button>

            {/* Cart */}
            <Link href="/cart-new" className="relative p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group">
              <ShoppingCart className="w-5 h-5 group-hover:text-ailydian-primary transition-colors" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-ailydian-primary text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 font-medium animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                    {session ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{session.user?.name || 'Kullanıcı'}</p>
                          <p className="text-xs text-gray-500">{session.user?.email}</p>
                          <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs bg-blue-100 text-blue-700">
                            {(session.user as any)?.membershipType || 'BASIC'} Üye
                          </span>
                        </div>
                        
                        <Link
                          href="/profile/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{item.title}</span>
                            </Link>
                          );
                        })}
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">{isClient ? t('navigation:logout', 'Çıkış Yap') : 'Çıkış Yap'}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">Merhaba! 👋</p>
                          <p className="text-xs text-gray-500">Seyahat maceranıza başlayın</p>
                        </div>
                        
                        <Link
                          href="/auth/signin"
                          className="flex items-center space-x-3 px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Giriş Yap</span>
                        </Link>
                        
                        <Link
                          href="/auth/signup"
                          className="flex items-center space-x-3 px-4 py-2 text-green-600 hover:bg-green-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Ücretsiz Kayıt Ol</span>
                        </Link>
                      </>
                    )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Advanced Features Bar */}
        <div className="hidden xl:flex items-center justify-center py-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-500">{isClient ? t('navigation:advancedFeatures', 'Gelişmiş Özellikler:') : 'Gelişmiş Özellikler:'}</span>
            {advancedFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  <span className="text-sm text-gray-700 group-hover:text-blue-600">{feature.title}</span>
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full">
                    {feature.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  placeholder={isClient ? t('common:searchDestinations', 'Destinasyon ara...') : 'Destinasyon ara...'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-800 placeholder-gray-500"
                  autoComplete="off"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Voice Control */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-500 mb-3">Sesli Kontrol</p>
                <VoiceMenu />
              </div>

              {/* Mobile Advanced Features */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-500 mb-3">{isClient ? t('navigation:advancedFeatures', 'Gelişmiş Özellikler') : 'Gelişmiş Özellikler'}</p>
                <div className="grid grid-cols-2 gap-2">
                  {advancedFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{feature.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Slider Search Panel */}
      <AnimatePresence>
        {isSliderSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9999] flex items-start justify-center pt-20"
            onClick={() => setIsSliderSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  Arama Yap
                </h3>
                <button
                  onClick={() => setIsSliderSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Search Content */}
              <div className="p-6">
                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 font-medium text-lg"
                    autoComplete="off"
                    autoFocus
                  />
                </div>

                {/* Quick Search Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Hızlı Arama</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: 'İstanbul Turları', icon: '🏛️', query: 'istanbul' },
                      { title: 'Kapadokya Balon', icon: '🎈', query: 'kapadokya balon' },
                      { title: 'Lüks Oteller', icon: '🏨', query: 'luxury hotel' },
                      { title: 'Deniz Turları', icon: '🏖️', query: 'beach tours' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(item.query);
                          const results = searchInData(item.query, 8);
                          setSearchResults(results);
                          setIsSearchFocused(true);
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-gray-700">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Results in Slider */}
                {searchResults.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Arama Sonuçları</h4>
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
                            className={`w-full p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 text-left ${
                              selectedResultIndex === index ? 'bg-blue-50 border border-blue-200' : 'border border-gray-100'
                            }`}
                          >
                            {result.image ? (
                              <img 
                                src={result.image} 
                                alt={result.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${categoryInfo.color}`}>
                                {categoryInfo.icon}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 truncate">{result.title}</span>
                                {result.rating && (
                                  <div className="flex items-center gap-1 text-xs">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-gray-600">{result.rating}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                            </div>
                            {result.price && (
                              <span className="text-sm font-semibold text-blue-600">{result.price}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Recent Searches in Slider */}
                {searchHistory.length > 0 && searchQuery.trim() === '' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Son Aramalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((query, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(query);
                            const results = searchInData(query, 8);
                            setSearchResults(results);
                            setIsSearchFocused(true);
                          }}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches in Slider */}
                {searchQuery.trim() === '' && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Popüler Aramalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.slice(0, 8).map((query, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(query);
                            const results = searchInData(query, 8);
                            setSearchResults(results);
                            setIsSearchFocused(true);
                          }}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Popup */}
      <AIAssistantPopup 
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </header>
  );
};

export default NavigationHeader;
