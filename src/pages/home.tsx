import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for VideoBackground to avoid SSR issues
const VideoBackground = dynamic(() => import('../components/ui/VideoBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-ailydian-primary/20 to-ailydian-secondary/20" />
});
import { bookingComService } from '../lib/api/booking-com-service';
import { amadeusService } from '../lib/api/amadeus-service';
import { googlePlacesService } from '../lib/api/google-places-service';
import { tourismApiService } from '../lib/tourism-api-service';
import { useCart } from '../context/CartContext';
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Heart,
  Camera,
  ChevronRight,
  Filter,
  Clock,
  ArrowRight,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  Send,
  Globe,
  CreditCard,
  Smartphone,
  MessageCircle,
  CheckCircle,
  UserPlus,
  Gift,
  ShoppingCart,
  Plus,
  Car
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

const GetYourGuideStyleHome: React.FC = () => {
  // Router
  const router = useRouter();

  // Cart context
  const { addItem, getItemCount } = useCart();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Initialize default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    const dayAfter = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dayAfter.setDate(dayAfter.getDate() + 3);
    
    setCheckInDate(tomorrow.toISOString().split('T')[0]);
    setCheckOutDate(dayAfter.toISOString().split('T')[0]);
  }, []);
  
  // Smart search suggestions
  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    try {
      const turkishCities = Object.keys(tourismApiService.getLocationSuggestions(query));
      setSuggestions(turkishCities.slice(0, 5));
    } catch (error) {
      console.error('Suggestion error:', error);
    }
  }, []);
  
  // Advanced search function
  const handleAdvancedSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      alert('Lütfen bir destinasyon girin!');
      return;
    }
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      const results = [];
      
      // Search based on selected category
      switch (selectedCategory) {
        case 'hotels':
        case 'all':
          if (selectedCategory === 'hotels' || selectedCategory === 'all') {
            try {
              const hotelResults = await bookingComService.searchHotels({
                destination: searchQuery,
                checkIn: new Date(checkInDate),
                checkOut: new Date(checkOutDate),
                adults: parseInt(travelers),
                rooms: 1,
                currency: 'TRY',
                language: 'tr'
              });
              results.push(...hotelResults.hotels.map(hotel => ({ ...hotel, type: 'hotel' })));
            } catch (error) {
              console.error('Hotel search error:', error);
            }
          }
          break;

        case 'flights':
          try {
            // This would need origin location - for demo, using Istanbul as default
            const flightResults = await amadeusService.searchFlights({
              originLocationCode: 'IST',
              destinationLocationCode: searchQuery.toUpperCase(),
              departureDate: checkInDate,
              adults: parseInt(travelers),
              max: 10
            });
            results.push(...flightResults.flights.map(flight => ({ ...flight, type: 'flight' })));
          } catch (error) {
            console.error('Flight search error:', error);
          }
          break;

        case 'transfers':
          try {
            // Search airport transfers
            const response = await fetch(`/api/transfers/search?to=${encodeURIComponent(searchQuery)}&passengers=${travelers}`);
            const data = await response.json();
            if (data.success && data.transfers) {
              results.push(...data.transfers.map((transfer: any) => ({
                ...transfer,
                type: 'transfer',
                title: transfer.name,
                description: transfer.description,
                location: `${transfer.fromLocation} → ${transfer.toLocation}`,
                duration: `${transfer.duration} dakika`,
                price: transfer.vehicles[0]?.priceStandard || 'N/A'
              })));
            }
          } catch (error) {
            console.error('Transfer search error:', error);
          }
          break;

        case 'restaurants':
          try {
            const restaurantResults = await googlePlacesService.searchRestaurants(searchQuery);
            results.push(...restaurantResults.map(restaurant => ({ ...restaurant, type: 'restaurant' })));
          } catch (error) {
            console.error('Restaurant search error:', error);
          }
          break;

        case 'tours':
          try {
            const tourResults = await tourismApiService.searchTours(searchQuery);
            results.push(...tourResults.map(tour => ({ ...tour, type: 'tour' })));
          } catch (error) {
            console.error('Tour search error:', error);
          }
          break;
      }
      
      setSearchResults(results);
      
      // Scroll to results or navigate to results page
      if (results.length > 0) {
        // For demo, we'll just log the results
        console.log('Arama Sonuçları:', results);
        alert(`${results.length} sonuç bulundu! Konsolu kontrol edin.`);
      } else {
        alert('Hiç sonuç bulunamadı. Farklı bir arama deneyin.');
      }
      
    } catch (error) {
      console.error('Search error:', error);
      alert('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, selectedCategory, checkInDate, checkOutDate, travelers]);
  
  // Handle search query change with suggestions
  const handleSearchQueryChange = useCallback((value: string) => {
    setSearchQuery(value);
    getSuggestions(value);
  }, [getSuggestions]);
  
  // Add to cart function
  const handleAddToCart = useCallback((item: any) => {
    const cartItem = {
      id: item.id || `item_${Date.now()}_${Math.random()}`,
      type: item.type || 'tour',
      title: item.title || item.name || 'Ürün',
      description: item.description || '',
      image: item.image || item.photos?.[0]?.url || '/api/placeholder/300/200',
      price: typeof item.price === 'string' ? 
        parseFloat(item.price.replace(/[^0-9.]/g, '')) : 
        (item.price || item.priceBreakdown?.grossPrice?.value || 100),
      originalPrice: item.originalPrice,
      currency: 'TRY',
      quantity: 1,
      date: checkInDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      location: item.location || item.address?.cityName || 'Türkiye',
      duration: item.duration,
      rating: item.rating || item.reviewScoreWord,
      provider: item.provider || 'Ailydian',
      bookingDetails: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(travelers),
        rooms: 1
      },
      cancellationPolicy: item.cancellationPolicy || 'Ücretsiz iptal 24 saat öncesine kadar',
      isRefundable: true
    };
    
    addItem(cartItem);
    
    // Success notification
    alert(`"${cartItem.title}" sepete eklendi! Toplam ürün: ${getItemCount() + 1}`);
  }, [addItem, getItemCount, checkInDate, checkOutDate, travelers]);

  // Türkiye ve dünya destinasyonları - Türkçe içerikli
  const featuredDestinations = [
    {
      id: 1,
      name: 'İstanbul',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&q=90',
      experiences: '1,247',
      rating: 4.8,
      badge: 'Trend',
      description: 'Ayasofya, Sultanahmet ve Boğazla büyüleyen şehir',
      specialOffers: ['Ücretsiz rehber', 'AI destekli tur', '360° VR önizleme']
    },
    {
      id: 2,
      name: 'Kapadokya',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&q=90',
      experiences: '567',
      rating: 4.9,
      badge: 'Sıcak Hava Balonu',
      description: 'Peri bacaları ve eşsiz gündoğumu deneyimi',
      specialOffers: ['Balon turu', 'Peribacaları trekking', 'Yeraltı şehri']
    },
    {
      id: 3,
      name: 'Santorini',
      country: 'Yunanistan',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&q=90',
      experiences: '432',
      rating: 4.7,
      badge: 'Günbatımı Manzarası',
      description: 'Egede beyaz evler ve masmavi deniz',
      specialOffers: ['Günbatımı turu', 'Tekne gezisi', 'Şarap tadımı']
    },
    {
      id: 4,
      name: 'Pamukkale',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&q=90',
      experiences: '234',
      rating: 4.6,
      badge: 'Doğa Harikası',
      description: 'Beyaz travertinler ve termal su havuzları',
      specialOffers: ['Termal havuzlar', 'Hierapolis antik kenti', 'Şifa suyu terapisi']
    },
    {
      id: 5,
      name: 'Antalya',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&q=90',
      experiences: '892',
      rating: 4.7,
      badge: 'Akdeniz İncisi',
      description: 'Antik şehirler, masmavi deniz ve güneş',
      specialOffers: ['Antik şehir turu', 'Tekne turu', 'Adrenalin sporları']
    },
    {
      id: 6,
      name: 'Bodrum',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&q=90',
      experiences: '654',
      rating: 4.8,
      badge: 'Eğlence Başkenti',
      description: 'Marina, gece hayatı ve tarihi doku bir arada',
      specialOffers: ['Tekne partisi', 'Sualtı dalma', 'Gece turu']
    }
  ];

  // Popüler deneyimler - Türkçe içerikli
  const topExperiences = [
    {
      id: 1,
      title: 'İstanbul: AI Rehberli Boğaz Turu',
      location: 'İstanbul, Türkiye',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&q=90',
      price: '₺120',
      originalPrice: '₺160',
      rating: 4.8,
      reviews: 3247,
      duration: '2 saat',
      category: 'Tekne Turları',
      badges: ['AI Rehberli', 'Çok Satan', 'Anlık Onay'],
      highlights: ['Boğaz Köprü manzaraları', 'Canlı AI rehber anlatımı', 'Fotoğraf fırsatları'],
      includes: ['Professional guide', 'Refreshments', 'Photo service']
    },
    {
      id: 2,
      title: 'Kapadokya: VR Teknolojili Balon Turu',
      location: 'Kapadokya, Türkiye',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&q=90',
      price: '₺320',
      originalPrice: '₺400',
      rating: 4.9,
      reviews: 1856,
      duration: '3 saat',
      category: 'Macera',
      badges: ['VR Destekli', 'Küçük Grup', 'Otel Transferi'],
      highlights: ['Gündoğumu uçuşu', 'VR deneyimi eklentisi', 'Şampanyali kahvaltı'],
      includes: ['Hotel pickup', 'Flight certificate', 'Champagne breakfast']
    },
    {
      id: 3,
      title: 'Blockchain Şehir Turu ve NFT Anılar',
      location: 'İstanbul, Türkiye',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&q=90',
      price: '₺240',
      originalPrice: '₺300',
      rating: 4.7,
      reviews: 967,
      duration: '4 saat',
      category: 'Teknoloji Turları',
      badges: ['NFT Dahil', 'Yenilikçi', 'Gelecek Teknolojisi'],
      highlights: ['Seyahat NFT\'leri oluştur', 'Kripto ödemeler', 'Dijital hediyelik eşyalar'],
      includes: ['NFT creation', 'Digital wallet setup', 'Crypto payment training']
    },
    {
      id: 4,
      title: 'Antalya: Sualtı Dalma ve Arıştırma',
      location: 'Antalya, Türkiye',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=90',
      price: '₺180',
      originalPrice: '₺220',
      rating: 4.6,
      reviews: 1432,
      duration: '5 saat',
      category: 'Su Sporları',
      badges: ['Sertifikalı Eğitmen', 'Ekipman Dahil', 'Küçük Grup'],
      highlights: ['Akdeniz sualtı yaşamı', 'Antik su altı kalıntılar', 'Profesyonel fotoğraf çekimi'],
      includes: ['Diving equipment', 'Certified instructor', 'Underwater photography']
    },
    {
      id: 5,
      title: 'Pamukkale: Termal Spa ve Wellness',
      location: 'Pamukkale, Türkiye',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&q=90',
      price: '₺95',
      originalPrice: '₺130',
      rating: 4.5,
      reviews: 2341,
      duration: '6 saat',
      category: 'Wellness',
      badges: ['Termal Su', 'Spa Dahil', 'Sağlık Turizmi'],
      highlights: ['Doğal termal havuzlar', 'Antik Hierapolis', 'Spa ve masaj'],
      includes: ['Thermal pools access', 'Spa treatment', 'Healthy lunch']
    },
    {
      id: 6,
      title: 'Bodrum: Gece Hayatı ve Marina Turu',
      location: 'Bodrum, Türkiye',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&q=90',
      price: '₺85',
      originalPrice: '₺110',
      rating: 4.4,
      reviews: 987,
      duration: '4 saat',
      category: 'Gece Hayatı',
      badges: ['VIP Giriş', 'Çok Eğlenceli', 'Grup İndirimleri'],
      highlights: ['Marina turu', 'Gece kulüpleri', 'Kokteyl ve müzik'],
      includes: ['Club entrances', 'Welcome drinks', 'VIP treatment']
    }
  ];

  const categories = [
    { id: 'all', name: 'Tümü', count: '10,000+' },
    { id: 'tours', name: 'Turlar', count: '2,500+' },
    { id: 'activities', name: 'Aktiviteler', count: '3,200+' },
    { id: 'attractions', name: 'Çekim Merkezleri', count: '1,800+' },
    { id: 'ai-experiences', name: 'AI Deneyimleri', count: '150+' },
    { id: 'vr-tours', name: 'VR Turları', count: '89+' },
    { id: 'blockchain', name: 'Blockchain', count: '45+' },
    { id: 'wellness', name: 'Wellness & Spa', count: '320+' },
    { id: 'adventure', name: 'Macera', count: '890+' },
    { id: 'cultural', name: 'Kültürel', count: '1,200+' },
    { id: 'nightlife', name: 'Gece Hayatı', count: '280+' }
  ];

  return (
    <>
      <Head>
        <title>Travel.Ailydian - AI Destekli Seyahat Platformu | Türkiye ve Dünya Turları</title>
        <meta name="description" content="Yapay zeka destekli akıllı seyahat platformu ile hayalinizdeki tatili planlayın. Türkiye ve dünya genelinde en iyi fiyatlarla otel, uçak bileti, tur ve aktivite rezervasyonları. VR önizleme ve blockchain güvenliği." />
        <meta name="keywords" content="seyahat, tatil, tur, aktivite, otel rezervasyonu, uçak bileti, AI seyahat, VR tur, blockchain, Türkiye turizm, İstanbul, Kapadokya, Antalya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Travel.Ailydian - AI Destekli Seyahat Platformu" />
        <meta property="og:description" content="Türkiye'nin ilk AI destekli seyahat platformu. VR önizleme ile destinasyonları keşfedin, blockchain ile güvenli rezervasyon yapın." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travel.ailydian.com" />
        <meta property="og:image" content="https://travel.ailydian.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Travel.Ailydian - AI Destekli Seyahat Platformu" />
        <meta name="twitter:description" content="Yapay zeka ile kişiselleştirilmiş seyahat deneyimi" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://travel.ailydian.com" />
      </Head>

      <NavigationHeader />

      <main>
        {/* Hero Section with 4K Tourism Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background - Changes every 60 seconds */}
          <div className="absolute inset-0 z-0">
            <VideoBackground
              autoPlay={true}
              muted={true}
              loop={true}
              overlay={true}
              overlayOpacity={0.6}
              changeInterval={60000}
            />
            
            {/* Animated Overlay Elements */}
            <div className="absolute inset-0">
              {/* Floating Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
              
              {/* Gradient Animations */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-ailydian-primary/20 via-transparent to-ailydian-secondary/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              />
              
              {/* Moving Geometric Shapes */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/10 rounded-lg"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* Premium Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
            {/* Content */}
            <div className="text-center mb-8">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-300 text-xs font-medium mb-4"
              >
                <Sparkles className="w-3 h-3" />
                <span>Türkiye&apos;nin İlk AI Destekli Premium Seyahat Platformu</span>
                <Award className="w-3 h-3" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
              >
                <span className="block">
                  Eşsiz Seyahat
                </span>
                <motion.span 
                  className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Deneyimleri Keşfedin
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto font-light leading-relaxed"
              >
                <span className="font-semibold text-yellow-300">AI asistanı</span>, <span className="font-semibold text-purple-300">VR önizleme</span> ve <span className="font-semibold text-green-300">blockchain doğrulama</span> ile dünya çapında turlar, aktiviteler ve çekim merkezlerini rezerve edin
              </motion.p>

              {/* Advanced Search Engine */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-7xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                  {/* Search Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { id: 'all', icon: Globe, label: 'Tüm Hizmetler', active: true },
                      { id: 'flights', icon: Send, label: 'Uçak' },
                      { id: 'hotels', icon: MapPin, label: 'Otel' },
                      { id: 'tours', icon: Camera, label: 'Turlar' },
                      { id: 'restaurants', icon: Gift, label: 'Restoranlar' },
                      { id: 'transfers', icon: Car, label: 'Havalimanı Transfer', badge: 'Yeni' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          selectedCategory === tab.id || tab.active
                            ? 'bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span className="text-sm">{tab.label}</span>
                        {tab.badge && (
                          <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full font-semibold ml-1">
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Main Search Form */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                    {/* Destination Search - Takes more space */}
                    <div className="lg:col-span-4 relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <MapPin className="text-ailydian-primary w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchQueryChange(e.target.value)}
                        placeholder="Nereye gitmek istiyorsunuz?"
                        className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-ailydian-primary focus:border-ailydian-primary outline-none text-gray-900 placeholder-gray-500 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                        onKeyPress={(e) => e.key === 'Enter' && handleAdvancedSearch()}
                      />
                      {/* Smart Suggestions Dropdown */}
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                setSuggestions([]);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                            >
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 font-medium">{suggestion}</span>
                              <span className="text-xs text-gray-500 ml-auto">Türkiye</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Check-in Date */}
                    <div className="lg:col-span-2 relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Calendar className="text-ailydian-primary w-5 h-5" />
                      </div>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-ailydian-primary focus:border-ailydian-primary outline-none text-gray-900 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                      />
                      <label className="absolute -top-2 left-3 px-2 bg-white text-xs text-gray-600 font-medium">
                        Gidiş
                      </label>
                    </div>

                    {/* Check-out Date */}
                    <div className="lg:col-span-2 relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Calendar className="text-ailydian-secondary w-5 h-5" />
                      </div>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-ailydian-secondary focus:border-ailydian-secondary outline-none text-gray-900 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                      />
                      <label className="absolute -top-2 left-3 px-2 bg-white text-xs text-gray-600 font-medium">
                        Dönüş
                      </label>
                    </div>

                    {/* Travelers */}
                    <div className="lg:col-span-2 relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Users className="text-ailydian-primary w-5 h-5" />
                      </div>
                      <select 
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-ailydian-primary focus:border-ailydian-primary outline-none appearance-none text-gray-900 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <option value="1">1 Yolcu</option>
                        <option value="2">2 Yolcu</option>
                        <option value="3">3 Yolcu</option>
                        <option value="4+">4+ Yolcu</option>
                      </select>
                      <label className="absolute -top-2 left-3 px-2 bg-white text-xs text-gray-600 font-medium">
                        Yolcular
                      </label>
                    </div>

                    {/* Premium Search Button */}
                    <div className="lg:col-span-2">
                      <motion.button 
                        onClick={handleAdvancedSearch}
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(255, 33, 77, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-full bg-gradient-to-r from-ailydian-primary via-ailydian-secondary to-ailydian-primary text-white rounded-2xl font-bold text-base hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 min-h-[60px] bg-size-200 hover:bg-pos-100"
                        style={{
                          backgroundSize: '200% 200%',
                          backgroundPosition: '0% 50%'
                        }}
                      >
                        <Search className="w-5 h-5" />
                        <span>AI ile Ara</span>
                        <Sparkles className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">Popüler Aramalar:</span>
                        <div className="flex flex-wrap gap-2">
                          {['İstanbul Otelleri', 'Kapadokya Balon Turu', 'Bodrum Tekne Turu', 'Antalya All Inclusive'].map((suggestion) => (
                            <motion.button
                              key={suggestion}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setSearchQuery(suggestion)}
                              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 rounded-full text-xs font-medium transition-all duration-200 border border-blue-200"
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span>Blockchain Güvenli</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>AI Destekli</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Camera className="w-4 h-4 text-purple-500" />
                          <span>VR Önizleme</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: Sparkles, text: 'AI Destekli Planlama', color: 'bg-yellow-500' },
                { icon: Camera, text: 'VR Önizlemeler', color: 'bg-purple-500' },
                { icon: Shield, text: 'Blockchain Doğrulama', color: 'bg-green-500' },
                { icon: Award, text: 'Premium Deneyimler', color: 'bg-blue-500' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
&quot;{searchQuery}&quot; için {searchResults.length} sonuç bulundu
                  </h2>
                  <p className="text-gray-600">En iyi seçenekler AI tarafından sıralandı</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Filtrele
                  </button>
                  <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium">
                    <option>Önerilenler</option>
                    <option>Fiyat (Düşük-Yüksek)</option>
                    <option>Fiyat (Yüksek-Düşük)</option>
                    <option>En İyi Puanlar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={result.image || '/api/placeholder/400/300'} 
                        alt={result.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-sm font-medium capitalize">
                          {result.type || selectedCategory}
                        </span>
                      </div>

                      {/* AI Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Önerisi</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{result.location || 'Türkiye'}</span>
                        {result.duration && (
                          <>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{result.duration}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                        {result.title || result.name}
                      </h3>

                      {/* Rating */}
                      {result.rating && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{result.rating}</span>
                          </div>
                          {result.reviews && (
                            <span className="text-gray-500 text-sm">({result.reviews} değerlendirme)</span>
                          )}
                        </div>
                      )}

                      {/* Description or Features */}
                      {result.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {result.description}
                        </p>
                      )}

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {result.price ? (
                            <span className="text-xl font-bold text-gray-900">
                              {typeof result.price === 'string' ? result.price : `₺${result.price}`}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">Fiyat bilgisi yok</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(result)}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                            title="Sepete Ekle"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              handleAddToCart(result);
                              router.push('/checkout');
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
                          >
                            {result.type === 'hotel' ? 'Rezervasyon' :
                             result.type === 'flight' ? 'Bilet Al' :
                             result.type === 'transfer' ? 'Transfer Rezerve Et' :
                             result.type === 'restaurant' ? 'Rezerve Et' : 'Detaylar'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {searchResults.length >= 9 && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white border-2 border-ailydian-primary text-ailydian-primary rounded-2xl font-medium hover:bg-ailydian-primary hover:text-white transition-all duration-200"
                  >
                    Daha Fazla Sonuç Yükle
                  </motion.button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategorilere Göre Gezin</h2>
              <p className="text-gray-600">İlgi alanlarınıza uygun deneyimleri keşfedin</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-ailydian-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Top Experiences */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">En İyi Deneyimler</h2>
                <p className="text-gray-600">En popüler aktiviteler ve turlar</p>
              </div>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                Tümünü Gör
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: experience.id * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {experience.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 bg-white/90 text-gray-800 rounded-full text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Category */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                        {experience.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{experience.duration}</span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                      {experience.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{experience.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({experience.reviews} değerlendirme)</span>
                    </div>

                    {/* Highlights */}
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      {experience.highlights.slice(0, 2).map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{experience.price}</span>
                        {experience.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{experience.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart({
                          ...experience,
                          type: 'tour',
                          price: typeof experience.price === 'string' ? 
                            parseFloat(experience.price.replace(/[^0-9]/g, '')) : experience.price
                        })}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 font-medium text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Sepete Ekle
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleAddToCart({
                            ...experience,
                            type: 'tour',
                            price: typeof experience.price === 'string' ?
                              parseFloat(experience.price.replace(/[^0-9]/g, '')) : experience.price
                          });
                          router.push('/checkout');
                        }}
                        className="px-4 py-2 bg-ailydian-primary text-white rounded-lg font-medium hover:bg-ailydian-dark transition-colors text-sm"
                      >
                        Rezervasyon Yap
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trend Destinasyonlar</h2>
              <p className="text-gray-600">Dünya genelindeki en popüler destinasyonları keşfedin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDestinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: destination.id * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-sm font-medium">
                        {destination.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                      <p className="text-white/80 text-sm">{destination.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{destination.experiences} deneyim</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Ailydian Travel?</h2>
              <p className="text-gray-600">Gelişmiş özelliklerimizle seyahatin geleceğini yaşayın</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'AI Destekli Öneriler',
                  description: 'Tercihleriniz ve davranış örüntülerinize dayanan kişiselleştirilmiş seyahat önerileri alın.',
                  color: 'bg-yellow-100 text-yellow-600'
                },
                {
                  icon: Camera,
                  title: 'Sanal Gerçeklik Önizlemeleri',
                  description: 'Rezervasyon yapmadan önce destinasyonları 360° VR ile deneyimleyin. Tam olarak ne aldığınızı görün.',
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  icon: Shield,
                  title: 'Blockchain Doğrulama',
                  description: 'Tüm yorumlar ve rezervasyonlar maksimum güven ve şeffaflık için blockchain üzerinde doğrulanır.',
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: Zap,
                  title: 'Anlık Onay',
                  description: 'Çoğu deneyim için rezervasyon yapın ve anlık onay alın. Bekleme yok, belirsizlik yok.',
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: Award,
                  title: 'Premium Deneyimler',
                  description: 'Başka yerde bulunmayan özel deneyimlere ve VIP hizmetlere erişim.',
                  color: 'bg-orange-100 text-orange-600'
                },
                {
                  icon: TrendingUp,
                  title: '7/24 AI Destek',
                  description: 'AI destekli müşteri destek sistemimizle istediğiniz zaman yardım alın.',
                  color: 'bg-indigo-100 text-indigo-600'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Signup Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link href="/auth/signup">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-16 h-16 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-full shadow-2xl flex items-center justify-center text-white group overflow-hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-ailydian-secondary to-ailydian-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <UserPlus className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-white text-gray-900 text-sm px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 shadow-lg border">
                <Gift className="w-4 h-4 text-yellow-500" />
                <span>Ücretsiz Kayıt Ol!</span>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent"></div>
              </div>
            </div>
            
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
          </motion.button>
        </Link>
      </motion.div>

      {/* Modern Premium Footer */}
      <footer className="bg-white border-t border-gray-200">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Özel Fırsatlardan İlk Sen Haberdar Ol!
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                En iyi seyahat fırsatları, özel indirimler ve yeni destinasyon önerilerini e-postanla al. Blockchain ödemeler ve AI öneriler için erken erişim!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="E-posta adresinizi girin..."
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 justify-center"
                >
                  <Send className="w-5 h-5" />
                  Abone Ol
                </motion.button>
              </div>
              <p className="text-blue-100/80 text-sm mt-4">✨ 50,000+ mutlu kullanıcı zaten abone!</p>
            </motion.div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-2xl font-black bg-gradient-to-r from-ailydian-primary to-ailydian-secondary bg-clip-text text-transparent">
                      Travel
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      Ailydian
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 tracking-wide">
                    AI-Powered Enterprise
                  </p>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Türkiye&apos;nin ilk AI destekli, blockchain güvenlikli seyahat platformu. VR önizleme, akıllı öneriler ve kripto ödemeler ile seyahatin geleceğini yaşayın.
                </p>
                
                {/* Premium Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    SSL Güvenli
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    AI Destekli
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    190+ Ülke
                  </span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    Kripto Ödemeler
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                    { icon: Youtube, href: '#', color: 'hover:text-red-400' },
                    { icon: Linkedin, href: '#', color: 'hover:text-blue-500' }
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`p-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 ${social.color} transition-colors`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-gray-900">Hızlı Erişim</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Destinasyonlar', href: '/destinations' },
                    { name: 'AI Seyahat Planlama', href: '/ai-planner' },
                    { name: 'VR Önizlemeler', href: '/virtual-tours' },
                    { name: 'Blockchain Güvenlik', href: '/blockchain' },
                    { name: 'Kripto Ödemeler', href: '/crypto-payments' },
                    { name: 'Premium Üyelik', href: '/premium' }
                  ].map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-gray-900">Hizmetlerimiz</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Otel Rezervasyonu', href: '/hotels' },
                    { name: 'Uçak Biletleri', href: '/flights' },
                    { name: 'Tur Paketleri', href: '/tours' },
                    { name: 'Araç Kiralama', href: '/car-rental' },
                    { name: 'Aktivite Rezervasyonu', href: '/activities' },
                    { name: 'Grup Seyahatleri', href: '/group-travel' }
                  ].map((service) => (
                    <li key={service.name}>
                      <a href={service.href} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                        <Star className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                        {service.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Support */}
              <div>
                <h4 className="font-bold text-lg mb-6 text-gray-900">İletişim & Destek</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-gray-900 font-medium">7/24 Destek Hattı</p>
                      <p className="text-gray-600 text-sm">+90 212 XXX XX XX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-gray-900 font-medium">E-posta Destek</p>
                      <p className="text-gray-600 text-sm">destek@ailydian.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-gray-900 font-medium">AI Chat Destek</p>
                      <p className="text-gray-600 text-sm">Anında yanıt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-orange-400" />
                    <div>
                      <p className="text-gray-900 font-medium">Mobil Uygulama</p>
                      <p className="text-gray-600 text-sm">Yakında</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
                <p>© 2025 Ailydian Travel Enterprise. Tüm hakları saklıdır.</p>
                <div className="flex items-center gap-4">
                  <Link href="/privacy" className="hover:text-gray-900 transition-colors">Gizlilik Politikası</Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:text-gray-900 transition-colors">Kullanım Şartları</Link>
                  <span>•</span>
                  <Link href="/cookies" className="hover:text-gray-900 transition-colors">Çerez Politikası</Link>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>TÜRSAB Üyesi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>ISO 27001 Sertifikalı</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>TripAdvisor Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GetYourGuideStyleHome;