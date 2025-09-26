import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  TrendingUp
} from 'lucide-react';

const NavigationHeader: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t } = useTranslation(['common', 'navigation']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top promotional bar */}
      <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">🎉 Yeni: AI destekli seyahat planlama ve Blockchain ödemeler artık kullanımda!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Ailydian</h1>
              <p className="text-xs text-gray-500 -mt-1">Travel Enterprise</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isClient ? t('common:searchPlaceholder', 'Destinasyon, deneyim, otel arayın...') : 'Destinasyon, deneyim, otel arayın...'}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
              />
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
            {/* Language */}
            <button className="hidden sm:flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">TR</span>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={isClient ? t('common:searchDestinations', 'Destinasyon ara...') : 'Destinasyon ara...'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationHeader;