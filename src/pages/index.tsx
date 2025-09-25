import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Search, MapPin, Calendar, Users, Star, Heart, Menu, X, 
         Plane, Hotel, Car, Utensils, Camera, Globe, Shield, Zap, 
         ChevronDown, ChevronUp, TrendingUp, Award, Sun, Moon, Languages,
         Filter, Clock, Wifi, CreditCard, LogIn, UserPlus, 
         Phone, Mail, HelpCircle, Settings, Bell, Lock,
         Compass, Mountain, Waves, Building, TreePine, MessageCircle, Send } from 'lucide-react';
import PremiumLogo from '@/components/ui/PremiumLogo';
import ParachuteAnimation from '@/components/animations/ParachuteAnimation';

// Gerçek destinasyon verileri
const featuredDestinations = [
  {
    id: 1,
    name: 'İstanbul',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&q=90',
    price: '₺2,500',
    rating: 4.8,
    reviews: 12847,
    tags: ['Tarih', 'Kültür', 'Gastronomi'],
    description: 'İki kıtayı birleştiren büyüleyici şehir'
  },
  {
    id: 2,
    name: 'Bali Adası',
    country: 'Endonezya', 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&q=90',
    price: '₺3,500',
    rating: 4.9,
    reviews: 8642,
    tags: ['Tropikal', 'Tapınak', 'Plaj'],
    description: 'Tapınaklar ve tropikal cennet adası'
  },
  {
    id: 3,
    name: 'Antalya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&q=90',
    price: '₺3,200',
    rating: 4.7,
    reviews: 9521,
    tags: ['Deniz', 'Güneş', 'Tatil'],
    description: 'Türkiye&apos;nin turizm başkenti'
  },
  {
    id: 4,
    name: 'Santorini',
    country: 'Yunanistan',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&q=90',
    price: '€650',
    rating: 4.6,
    reviews: 15630,
    tags: ['Romantik', 'Deniz', 'Gün Batımı'],
    description: 'Beyaz evler ve mavi kubbeler adası'
  },
  {
    id: 5,
    name: 'Tokyo',
    country: 'Japonya',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&q=90',
    price: '¥85,000',
    rating: 4.8,
    reviews: 11247,
    tags: ['Teknoloji', 'Kültür', 'Anime'],
    description: 'Gelenekle modernliğin buluştuğu şehir'
  },
  {
    id: 6,
    name: 'New York',
    country: 'ABD',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300',
    price: '$1,200',
    rating: 4.5,
    reviews: 18932,
    tags: ['Şehir', 'İş', 'Alışveriş'],
    description: 'Hiç uyumayan şehir'
  }
];

const popularHotels = [
  {
    id: 1,
    name: 'Four Seasons Hotel Istanbul',
    location: 'Sultanahmet, İstanbul',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300',
    rating: 4.9,
    reviews: 2847,
    price: '₺4,500',
    amenities: ['Spa', 'Havuz', 'WiFi', 'Kahvaltı'],
    stars: 5
  },
  {
    id: 2,
    name: 'Museum Hotel Cappadocia',
    location: 'Uçhisar, Kapadokya',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300',
    rating: 4.8,
    reviews: 1642,
    price: '₺3,200',
    amenities: ['Balon Turu', 'Spa', 'WiFi', 'Restoran'],
    stars: 5
  },
  {
    id: 3,
    name: 'Rixos Premium Belek',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300',
    rating: 4.7,
    reviews: 3521,
    price: '₺2,800',
    amenities: ['Her Şey Dahil', 'Plaj', 'Golf', 'Spa'],
    stars: 5
  }
];

const TravelHomePage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [currentLanguage, setCurrentLanguage] = useState('tr');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [mascotVisible, setMascotVisible] = useState(true);
  const [mascotAnimation, setMascotAnimation] = useState('idle');
  const [showTabAnimations, setShowTabAnimations] = useState(true);
  const [advancedFilters, setAdvancedFilters] = useState({
    budget: '',
    duration: '',
    travelStyle: '',
    accommodation: '',
    transportation: '',
    groupSize: '',
    season: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    tripType: 'round-trip'
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!loginData.email || !loginData.password) {
      alert('Lütfen e-posta ve şifrenizi girin.');
      return;
    }
    
    // Simulate login success
    alert('Giriş başarılı! Hoş geldiniz.');
    setShowLoginModal(false);
    setLoginData({ email: '', password: '', rememberMe: false });
  };

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' }
  ];

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setShowLanguageMenu(false);
    const selectedLang = languages.find(l => l.code === lang);
    if (selectedLang) {
      // Simulate language change with a proper message
      console.log(`Language changed to: ${selectedLang.name}`);
    }
  };

  const handleSearch = () => {
    if (!searchData.destination) {
      alert('Lütfen bir destinasyon girin.');
      return;
    }
    
    if (!searchData.checkIn) {
      alert('Lütfen gidiş tarihi seçin.');
      return;
    }

    // Simulate search with realistic feedback
    const searchType = activeTab === 'flights' ? 'uçuş' : 
                      activeTab === 'hotels' ? 'otel' : 
                      activeTab === 'cars' ? 'araç kiralama' : 
                      activeTab === 'restaurants' ? 'restoran' : 'aktivite';
    
    alert(`${searchData.destination} için ${searchType} aranıyor... Sonuçlar yükleniyor!`);
    
    const searchParams = new URLSearchParams({
      type: activeTab,
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut || '',
      guests: searchData.guests
    });
    
    // Navigate to appropriate page or show results
    const targetPage = activeTab === 'flights' ? '/flights' :
                      activeTab === 'hotels' ? '/hotels' :
                      activeTab === 'cars' ? '/cars' :
                      activeTab === 'restaurants' ? '/restaurants' :
                      '/activities';
    
    router.push(`${targetPage}?${searchParams.toString()}`);
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
    setShowLanguageMenu(false);
  };

  const searchTabs = [
    { id: 'flights', label: 'Uçak Bileti', icon: Plane },
    { id: 'hotels', label: 'Oteller', icon: Hotel },
    { id: 'cars', label: 'Araç Kiralama', icon: Car },
    { id: 'restaurants', label: 'Restoranlar', icon: Utensils },
    { id: 'activities', label: 'Aktiviteler', icon: Waves }
  ];

  // Tab animations on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTabAnimations(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ color: 'var(--tx-1)' }}>
      {/* Premium Ocean Background */}
      <div className="premium-ocean-bg"></div>
      <div className="ocean-waves-overlay"></div>
      {/* Parachute Animation */}
      <ParachuteAnimation />
      {/* Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: 'var(--bg-0)', borderBottomColor: 'var(--ac-1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <PremiumLogo size="large" variant="full" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="relative group">
                <button className="flex items-center transition-colors duration-300 header-neon" onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--ac-2)'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#FFFFFF'}>
                  <Compass className="h-4 w-4 mr-1" />
                  Keşfet
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-blue-200">
                  <Link href="/destinations" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors rounded-t-xl">
                    <Mountain className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    Destinasyonlar
                  </Link>
                  <Link href="/tours" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors">
                    <Camera className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    Turlar
                  </Link>
                  <Link href="/activities" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors">
                    <Waves className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    Aktiviteler
                  </Link>
                  <Link href="/reviews" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors">
                    <Star className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    İncelemeler
                  </Link>
                  <Link href="/business" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors rounded-b-xl">
                    <Building className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    İşletmeler
                  </Link>
                </div>
              </div>
              <Link href="/my-trips" className="header-neon hover:text-blue-300 transition-colors flex items-center">
                <Plane className="h-4 w-4 mr-1" />
                Seyahatlerim
              </Link>
              <Link href="/favorites" className="header-neon hover:text-blue-300 transition-colors flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                Favoriler
              </Link>
              <div className="relative group">
                <button className="header-neon hover:text-blue-300 transition-colors flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Destek
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-blue-200">
                  <Link href="/help" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors rounded-t-xl">
                    <HelpCircle className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    Yardım Merkezi
                  </Link>
                  <Link href="/contact" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors">
                    <Phone className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    İletişim
                  </Link>
                  <Link href="/support" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center transition-colors rounded-b-xl">
                    <Mail className="h-4 w-4 mr-2" style={{ color: 'var(--ac-1)' }} />
                    Canlı Destek
                  </Link>
                </div>
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Tema Değiştir"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                >
                  <Languages className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">{languages.find(l => l.code === currentLanguage)?.flag} {currentLanguage.toUpperCase()}</span>
                </button>
                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-600">
                    {languages.map((language, index) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center transition-colors ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${
                          index === languages.length - 1 ? 'rounded-b-lg' : ''
                        } ${
                          currentLanguage === language.code ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {language.flag} {language.name}
                        {currentLanguage === language.code && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="ocean-button px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Giriş Yap
                </button>
                <Link
                  href="/register"
                  className="ocean-button-secondary px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Kayıt Ol
                </Link>
              </div>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg border-b">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/destinations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinasyonlar
            </Link>
            <Link
              href="/tours"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Turlar
            </Link>
            <Link
              href="/activities"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aktiviteler
            </Link>
            <Link
              href="/help"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Yardım
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              İletişim
            </Link>
            <Link
              href="/support"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destek
            </Link>
            <Link
              href="/my-trips"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Seyahatlerim
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
                className="ocean-button-secondary w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Giriş Yap
              </button>
              <Link
                href="/register"
                className="ocean-button-secondary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Ocean Background & Surfer Image */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
        {/* Ocean Wave Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="ocean-bg">
            <div className="wave-layer wave-layer-1"></div>
            <div className="wave-layer wave-layer-2"></div>
            <div className="wave-layer wave-layer-3"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="text-center">
            {/* Main Content */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text-strong" style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Dünyayı Keşfet
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                AI destekli akıllı seyahat platformu ile hayalindeki tatili planla. 
                <span className="neon-text font-semibold" style={{ color: '#E0F7FA', textShadow: '0 0 10px rgba(14, 165, 233, 0.5)' }}>Kişiselleştirilmiş öneriler</span>, en iyi fiyatlar, güvenli rezervasyonlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-6 lg:py-8 -mt-8 lg:-mt-10 relative z-10" style={{ background: 'transparent' }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl p-4 lg:p-6 neon-glow" style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(20px)', 
            border: '2px solid rgba(14, 165, 233, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Search Tabs */}
            <div className="relative flex flex-wrap gap-1 lg:gap-2 mb-4 lg:mb-6 border-b" style={{ borderBottomColor: 'var(--ac-1)' }}>
              {/* Active tab indicator */}
              <div 
                className="absolute bottom-0 h-0.5 transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))',
                  left: `${searchTabs.findIndex(tab => tab.id === activeTab) * (100 / searchTabs.length)}%`,
                  width: `${100 / searchTabs.length}%`,
                  transform: 'translateX(8px)'
                }}
              />
              
              {searchTabs.map((tab, index) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      // Reset search data when switching tabs for better UX
                      setSearchData({
                        destination: '',
                        checkIn: '',
                        checkOut: '',
                        guests: '2',
                        tripType: 'round-trip'
                      });
                    }}
                    className={`relative flex items-center px-2 py-2 lg:px-4 lg:py-3 rounded-t-lg text-xs lg:text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group ${
                      showTabAnimations ? 'animate-bounce' : ''
                    }`}
                    style={{
                      color: isActive ? 'var(--ac-1)' : 'var(--tx-1)',
                      backgroundColor: isActive ? 'var(--bg-0)' : 'transparent',
                      borderBottom: isActive ? '2px solid var(--ac-1)' : 'none',
                      border: isActive ? '1px solid var(--ac-1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const element = e.currentTarget;
                        element.style.setProperty('color', '#FFFFFF', 'important');
                        element.style.setProperty('background-color', 'var(--ac-1)', 'important');
                        element.style.setProperty('border', '1px solid var(--ac-1)', 'important');
                        element.style.setProperty('box-shadow', '0 4px 15px rgba(14, 165, 233, 0.3)', 'important');
                        
                        // Ensure text and icon remain visible
                        const textElement = element.querySelector('span:not(.absolute)') as HTMLElement;
                        const iconElement = element.querySelector('svg') as SVGElement;
                        if (textElement) textElement.style.setProperty('color', '#FFFFFF', 'important');
                        if (iconElement) iconElement.style.setProperty('color', '#FFFFFF', 'important');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const element = e.currentTarget;
                        element.style.removeProperty('color');
                        element.style.removeProperty('background-color');
                        element.style.removeProperty('border');
                        element.style.removeProperty('box-shadow');
                        
                        // Reset text and icon colors
                        const textElement = element.querySelector('span:not(.absolute)') as HTMLElement;
                        const iconElement = element.querySelector('svg') as SVGElement;
                        if (textElement) textElement.style.removeProperty('color');
                        if (iconElement) iconElement.style.removeProperty('color');
                      }
                    }}
                  >
                    <IconComponent className={`h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2 transition-all duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    } ${
                      tab.id === 'flights' && isActive ? 'rotate-12' :
                      tab.id === 'hotels' && isActive ? 'animate-bounce' :
                      tab.id === 'cars' && isActive ? '-rotate-12' :
                      tab.id === 'restaurants' && isActive ? 'rotate-45' :
                      tab.id === 'activities' && isActive ? 'scale-125 rotate-12' : ''
                    }`} />
                    
                    <span className={`transition-all duration-300 ${
                      isActive ? 'font-semibold' : 'group-hover:font-medium'
                    }`}>
                      {tab.label}
                    </span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" style={{ background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))' }}>
                        <div className="absolute inset-0.5 rounded-full" style={{ backgroundColor: 'var(--bg-0)' }}></div>
                        <div className="absolute inset-1 rounded-full" style={{ background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))' }}></div>
                      </div>
                    )}
                    
                    {/* Hover effect background */}
                    <div className="absolute inset-0 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))' }}></div>
                  </button>
                );
              })}
            </div>

            {/* Search Form */}
            <div className="space-y-4 lg:space-y-6">
              {/* Gidiş-Dönüş Seçenekleri (Sadece uçak biletleri için) */}
              {activeTab === 'flights' && (
                <div className="relative flex bg-gray-100 dark:bg-gray-600 p-1 rounded-lg w-fit mb-3 lg:mb-4 scale-90 lg:scale-100">
                  {/* Animated background slider */}
                  <div 
                    className={`absolute top-1 bottom-1 rounded-md shadow-sm transition-all duration-300 ease-out`}
                    style={{
                      background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))',
                      left: searchData.tripType === 'round-trip' ? '4px' : '50%',
                      width: searchData.tripType === 'round-trip' ? 'calc(50% - 6px)' : 'calc(50% - 6px)',
                      transform: searchData.tripType === 'one-way' ? 'translateX(2px)' : 'translateX(0)'
                    }}
                  />
                  
                  <button
                    onClick={() => setSearchData({...searchData, tripType: 'round-trip'})}
                    className={`relative z-10 flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      searchData.tripType === 'round-trip' 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                    style={{
                      color: searchData.tripType !== 'round-trip' ? 'var(--tx-1)' : undefined,
                      minWidth: '90px'
                    }}
                    onMouseEnter={(e) => {
                      if (searchData.tripType !== 'round-trip') {
                        e.currentTarget.style.color = 'var(--ac-1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (searchData.tripType !== 'round-trip') {
                        e.currentTarget.style.color = 'var(--tx-1)';
                      }
                    }}
                  >
                    <span className="flex items-center justify-center text-xs lg:text-sm">
                      <Plane className="h-3 w-3 lg:h-4 lg:w-4 mr-1 rotate-45" />
                      <span className="hidden sm:inline">Gidiş-Dönüş</span>
                      <span className="sm:hidden">G-D</span>
                      <Plane className="h-3 w-3 lg:h-4 lg:w-4 ml-1 -rotate-45" />
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setSearchData({...searchData, tripType: 'one-way'})}
                    className={`relative z-10 flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      searchData.tripType === 'one-way' 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                    style={{
                      color: searchData.tripType !== 'one-way' ? 'var(--tx-1)' : undefined,
                      minWidth: '70px'
                    }}
                    onMouseEnter={(e) => {
                      if (searchData.tripType !== 'one-way') {
                        e.currentTarget.style.color = 'var(--ac-1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (searchData.tripType !== 'one-way') {
                        e.currentTarget.style.color = 'var(--tx-1)';
                      }
                    }}
                  >
                    <span className="flex items-center justify-center text-xs lg:text-sm">
                      <Plane className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                      <span className="hidden sm:inline">Tek Yön</span>
                      <span className="sm:hidden">TY</span>
                    </span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {activeTab === 'flights' ? 'Nereye uçmak istiyorsunuz?' :
                     activeTab === 'hotels' ? 'Hangi şehirde konaklayacaksınız?' :
                     activeTab === 'cars' ? 'Nereden araç kiralayacaksınız?' :
                     activeTab === 'restaurants' ? 'Hangi şehirde yemek arayacaksınız?' :
                     'Hangi şehirde aktivite arayacaksınız?'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={
                        activeTab === 'flights' ? 'İstanbul, Ankara, İzmir...' :
                        activeTab === 'hotels' ? 'Şehir, otel adı...' :
                        activeTab === 'cars' ? 'Şehir, havalimanı...' :
                        activeTab === 'restaurants' ? 'Şehir, bölge...' :
                        'Şehir, aktivite türü...'
                      }
                      className="w-full pl-9 lg:pl-10 pr-4 py-3 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm lg:text-base transition-all duration-300 hover:shadow-md"
                      value={searchData.destination}
                      onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {activeTab === 'hotels' ? 'Giriş Tarihi' : 
                     activeTab === 'flights' ? 'Gidiş Tarihi' : 
                     'Başlangıç Tarihi'}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-9 lg:pl-10 pr-4 py-3 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm lg:text-base transition-all duration-300 hover:shadow-md"
                      value={searchData.checkIn}
                      onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {(activeTab === 'hotels' || activeTab === 'flights' || activeTab === 'cars') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {activeTab === 'hotels' ? 'Çıkış Tarihi' : 
                       activeTab === 'flights' ? 'Dönüş Tarihi' : 
                       'Bitiş Tarihi'}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-9 lg:pl-10 pr-4 py-3 lg:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm lg:text-base transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        value={searchData.checkOut}
                        onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                        min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                        disabled={activeTab === 'flights' && searchData.tripType === 'one-way'}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="relative flex-1 sm:flex-none">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <select 
                      className="w-full sm:w-auto pl-9 lg:pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm lg:text-base transition-all duration-300 hover:shadow-md"
                      value={searchData.guests}
                      onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                    >
                      <option value="1">{activeTab === 'flights' ? '1 Yolcu' : activeTab === 'hotels' ? '1 Misafir' : '1 Kişi'}</option>
                      <option value="2">{activeTab === 'flights' ? '2 Yolcu' : activeTab === 'hotels' ? '2 Misafir' : '2 Kişi'}</option>
                      <option value="3">{activeTab === 'flights' ? '3 Yolcu' : activeTab === 'hotels' ? '3 Misafir' : '3 Kişi'}</option>
                      <option value="4">{activeTab === 'flights' ? '4+ Yolcu' : activeTab === 'hotels' ? '4+ Misafir' : '4+ Kişi'}</option>
                    </select>
                  </div>

                  <button className="hidden lg:flex items-center px-4 py-3 ocean-button-secondary rounded-xl">
                    <Filter className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                    <span className="text-sm lg:text-base">Gelişmiş Filtreler</span>
                  </button>
                </div>

                <button 
                  onClick={handleSearch}
                  className="ocean-button px-6 py-3 lg:px-8 lg:py-3 rounded-xl font-semibold flex items-center justify-center text-sm lg:text-base w-full lg:w-auto"
                >
                  <Search className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  <span className="truncate">
                    {activeTab === 'flights' ? 'Uçak Bileti Ara' :
                     activeTab === 'hotels' ? 'Otel Ara' :
                     activeTab === 'cars' ? 'Araç Ara' :
                     activeTab === 'restaurants' ? 'Restoran Ara' :
                     'Aktivite Ara'}
                  </span>
                </button>
              </div>

              {/* Advanced Search Toggle - Mobile Only */}
              <div className="flex justify-center mt-4 lg:hidden">
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="ocean-button-secondary font-medium text-sm flex items-center px-4 py-2 rounded-xl"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Gelişmiş Filtreler
                  {showAdvancedSearch ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </button>
              </div>

              {/* Advanced Search Options */}
              {showAdvancedSearch && (
                <div className="mt-6 p-4 lg:p-6 border-t border-gray-200 dark:border-gray-600 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-b-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-blue-600" />
                    Gelişmiş Arama Filtreleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bütçe Aralığı
                      </label>
                      <select
                        value={advancedFilters.budget}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, budget: e.target.value})}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white transition-all duration-300 hover:shadow-md"
                      >
                        <option value="">Bütçe seçin</option>
                        <option value="budget">Ekonomik (₺0-2,000)</option>
                        <option value="mid-range">Orta (₺2,000-5,000)</option>
                        <option value="luxury">Lüks (₺5,000+)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Seyahat Süresi
                      </label>
                      <select
                        value={advancedFilters.duration}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, duration: e.target.value})}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white transition-all duration-300 hover:shadow-md"
                      >
                        <option value="">Süre seçin</option>
                        <option value="weekend">Hafta sonu (2-3 gün)</option>
                        <option value="week">1 hafta (4-7 gün)</option>
                        <option value="long">Uzun tatil (8+ gün)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Seyahat Tarzı
                      </label>
                      <select
                        value={advancedFilters.travelStyle}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, travelStyle: e.target.value})}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white transition-all duration-300 hover:shadow-md"
                      >
                        <option value="">Tarz seçin</option>
                        <option value="adventure">Macera</option>
                        <option value="cultural">Kültürel</option>
                        <option value="relaxation">Dinlendirici</option>
                        <option value="nightlife">Gece Hayatı</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Konaklama Türü
                      </label>
                      <select
                        value={advancedFilters.accommodation}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, accommodation: e.target.value})}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white transition-all duration-300 hover:shadow-md"
                      >
                        <option value="">Konaklama seçin</option>
                        <option value="hotel">Otel</option>
                        <option value="resort">Resort</option>
                        <option value="boutique">Butik Otel</option>
                        <option value="apartment">Apart</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ulaşım Tercihi
                      </label>
                      <select
                        value={advancedFilters.transportation}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, transportation: e.target.value})}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white transition-all duration-300 hover:shadow-md"
                      >
                        <option value="">Ulaşım seçin</option>
                        <option value="flight">Uçak</option>
                        <option value="bus">Otobüs</option>
                        <option value="car">Kişisel Araç</option>
                        <option value="train">Tren</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Grup Büyüklüğü
                      </label>
                      <select
                        value={advancedFilters.groupSize}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, groupSize: e.target.value})}
                        className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white transition-all duration-300 hover:shadow-md"
                      >
                        <option value="">Grup büyüklüğü</option>
                        <option value="solo">Tek kişi</option>
                        <option value="couple">Çift</option>
                        <option value="family">Aile (3-5 kişi)</option>
                        <option value="group">Büyük grup (6+ kişi)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={() => {
                        // Create filtered search with advanced filters
                        const activeFilters = Object.entries(advancedFilters)
                          .filter(([key, value]) => value !== '')
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(', ');
                        
                        if (activeFilters) {
                          console.log('Advanced search filters:', advancedFilters);
                          const searchParams = new URLSearchParams({
                            type: activeTab,
                            destination: searchData.destination,
                            checkIn: searchData.checkIn,
                            checkOut: searchData.checkOut || '',
                            guests: searchData.guests,
                            ...advancedFilters
                          });
                          
                          // Filter out empty values
                          Object.keys(advancedFilters).forEach(key => {
                            if (!advancedFilters[key as keyof typeof advancedFilters]) {
                              searchParams.delete(key);
                            }
                          });
                          
                          const targetPage = activeTab === 'flights' ? '/flights' :
                                            activeTab === 'hotels' ? '/hotels' :
                                            activeTab === 'cars' ? '/cars' :
                                            activeTab === 'restaurants' ? '/restaurants' :
                                            '/activities';
                          
                          alert(`Gelişmiş filtreler uygulandı!\n\nAktif Filtreler: ${activeFilters}\n\nSonuçlar yükleniyor...`);
                          router.push(`${targetPage}?${searchParams.toString()}`);
                        } else {
                          alert('Lütfen en az bir filtre seçin.');
                        }
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center shadow-lg"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filtreleri Uygula
                    </button>
                    
                    <button 
                      onClick={() => {
                        setAdvancedFilters({
                          budget: '',
                          duration: '',
                          travelStyle: '',
                          accommodation: '',
                          transportation: '',
                          groupSize: '',
                          season: ''
                        });
                        alert('Tüm filtreler temizlendi!');
                      }}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 font-semibold"
                    >
                      Sıfırla
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Featured Destinations */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-0)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold neon-text mb-4" style={{ color: 'var(--tx-1)' }}>
              Popüler Destinasyonlar
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--tx-1)' }}>
              En çok tercih edilen seyahat noktalarını keşfedin ve unutulmaz deneyimler yaşayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="rounded-2xl shadow-lg overflow-hidden transition-shadow group card-hover" style={{ backgroundColor: 'var(--bg-0)', border: '1px solid var(--ac-1)' }}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(destination.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.has(destination.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--tx-1)' }}>
                      {destination.name}
                    </h3>
                    <span className="text-lg font-semibold" style={{ color: 'var(--ac-1)' }}>
                      {destination.price}
                    </span>
                  </div>
                  
                  <p className="mb-3" style={{ color: 'var(--ac-2)' }}>
                    {destination.country}
                  </p>
                  
                  <p className="mb-4 text-sm" style={{ color: 'var(--tx-1)' }}>
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {destination.rating}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({destination.reviews.toLocaleString()} değerlendirme)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Hotels */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Önerilen Oteller
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Konforlu konaklama seçenekleri ile mükemmel tatil deneyimi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-white rounded-lg px-2 py-1">
                      {[...Array(hotel.stars)].map((_, index) => (
                        <Star key={index} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {hotel.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-300"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({hotel.reviews} değerlendirme)
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-blue-600">{hotel.price}</div>
                      <div className="text-sm text-gray-500">gecelik</div>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Rezervasyon Yap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Neden Travel.Ailydian?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'AI Destekli',
                description: 'Yapay zeka ile kişiselleştirilmiş seyahat önerileri'
              },
              {
                icon: Shield,
                title: 'Güvenli Ödeme',
                description: 'SSL sertifikası ile korumalı güvenli ödeme sistemi'
              },
              {
                icon: Clock,
                title: '7/24 Destek',
                description: 'Her zaman yanınızdayız, istediğiniz zaman ulaşın'
              },
              {
                icon: Award,
                title: 'En İyi Fiyat',
                description: 'Garantili en uygun fiyatlarla rezervasyon'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Globe className="h-10 w-10 mr-3" style={{ color: 'var(--ac-1)' }} />
                <span className="text-2xl font-bold" style={{ background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Travel.Ailydian
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                AI destekli akıllı seyahat platformu ile dünyayı keşfedin. 
                Kişiselleştirilmiş öneriler, en iyi fiyatlar ve güvenli rezervasyonlar.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+90 212 555 0123</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@travel.ailydian.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Compass className="h-5 w-5 mr-2" style={{ color: 'var(--ac-1)' }} />
                Keşfet
              </h4>
              <ul className="space-y-3">
                <li><Link href="/destinations" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mountain className="h-4 w-4 mr-2" />
                  Destinasyonlar
                </Link></li>
                <li><Link href="/hotels" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Oteller
                </Link></li>
                <li><Link href="/flights" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Plane className="h-4 w-4 mr-2" />
                  Uçak Biletleri
                </Link></li>
                <li><Link href="/activities" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Aktiviteler
                </Link></li>
                <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <TreePine className="h-4 w-4 mr-2" />
                  Turlar
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" style={{ color: 'var(--ac-1)' }} />
                Destek
              </h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Yardım Merkezi
                </Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  İletişim
                </Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Canlı Destek
                </Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  Sık Sorulan Sorular
                </Link></li>
                <li><Link href="/travel-guide" className="text-gray-400 hover:text-white transition-colors">
                  Seyahat Rehberi
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Shield className="h-5 w-5 mr-2" style={{ color: 'var(--ac-1)' }} />
                Şirket
              </h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Hakkımızda
                </Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Kariyer
                </Link></li>
                <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors">
                  Basın
                </Link></li>
                <li><Link href="/partnerships" className="text-gray-400 hover:text-white transition-colors">
                  Ortaklıklar
                </Link></li>
                <li><Link href="/sustainability" className="text-gray-400 hover:text-white transition-colors">
                  Sürdürülebilirlik
                </Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Kullanım Şartları
                </Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="text-center mb-8">
              <h4 className="text-lg font-semibold mb-4">
                📧 Özel Fırsatlardan Haberdar Olun
              </h4>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                En iyi seyahat fırsatları, özel indirimler ve destinasyon önerileri doğrudan inbox&apos;unuza
              </p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz..."
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                />
                <button className="ocean-button px-6 py-3 rounded-r-lg transition-all font-semibold">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Travel.Ailydian. Tüm hakları saklıdır. | 
              <span className="ml-2">🚀 AI Destekli Seyahat Platformu</span>
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <span className="text-sm text-gray-500 flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                SSL Güvenli
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Zap className="h-4 w-4 mr-1" />
                AI Destekli
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                190+ Ülke
              </span>
            </div>
          </div>
          
          {/* Support Credit */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium" style={{ color: 'var(--ac-1)' }}>Destekçimize Teşekkürler</span>
              <span className="text-lg" style={{ color: 'var(--ac-2)' }}>💜</span>
              <span className="font-semibold" style={{ color: 'var(--ac-1)' }}>Software Sardag</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000] p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative my-8 mx-auto max-h-[90vh] overflow-y-auto" style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--ac-1)',
            backdropFilter: 'blur(20px)',
            border: '2px solid var(--ac-1)'
          }}>
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-8">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Travel.Ailydian&apos;a Hoş Geldiniz
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Seyahat planlamanız için giriş yapın
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Beni hatırla
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Şifremi unuttum
                </Link>
              </div>

              <button
                type="submit"
                className="w-full ocean-button py-3 rounded-lg transition-all font-semibold transform hover:scale-105 active:scale-95"
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-500 font-semibold">
                  Hemen kayıt olun
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                  <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <div className="relative">
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="ocean-button p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
          
          {/* Notification Badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
            AI
          </div>
        </div>

        {/* Chatbot Window */}
        {showChatbot && (
          <div className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)] sm:max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ background: 'linear-gradient(to right, var(--ac-1), var(--ac-2))', color: 'var(--tx-1)' }}>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Ailydian AI Asistan</h3>
                  <p className="text-xs text-blue-100">Seyahat danışmanınız</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatbot(false)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--ac-1)', color: 'var(--tx-1)' }}>
                  <Zap className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-xs">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Merhaba! Ben Ailydian AI asistanınızım. Size nasıl yardımcı olabilirim? 
                    Destinasyon önerileri, fiyat karşılaştırmaları veya seyahat planlaması konularında sorularınızı yanıtlayabilirim.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="p-3 rounded-lg max-w-xs" style={{ backgroundColor: 'var(--ac-1)', color: 'var(--tx-1)' }}>
                  <p className="text-sm">Kapadokya için en iyi zamanı söyler misin?</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--ac-1)', color: 'var(--tx-1)' }}>
                  <Zap className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-xs">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Kapadokya için en ideal zaman Nisan-Haziran ve Eylül-Kasım aylarıdır. 
                    Bu dönemlerde hava sıcaklığı balon turları için mükemmel ve kalabalık da az oluyor. 
                    Özellikle balon turu düşünüyorsanız bu ayları tercih etmenizi öneriyorum! 🎈
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Sorunuzu yazın..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      // Here would be the chat logic
                      alert('AI Chatbot yakında aktif olacak! Şu an demo modunda çalışıyor.');
                    }
                  }}
                />
                <button 
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => alert('AI Chatbot yakında aktif olacak! Şu an demo modunda çalışıyor.')}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                ⚡ Yapay zeka destekli - 7/24 aktif
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
};

export default TravelHomePage;