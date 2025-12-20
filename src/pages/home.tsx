import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_SEO } from '../config/seo';
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
import ResponsiveHeaderBar from '../components/layout/ResponsiveHeaderBar';
import { LocationAutocomplete } from '../components/search/LocationAutocomplete';
import { detectUserLocation, getNearbyDestinations, getSmartDestinationSuggestions, type LocationData } from '../lib/location-service';

const GetYourGuideStyleHome: React.FC = () => {
  // Router
  const router = useRouter();

  // Cart context
  const { addItem, getItemCount } = useCart();

  // Location state
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [nearbyDestinations, setNearbyDestinations] = useState<string[]>([]);
  const [locationDetected, setLocationDetected] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [isSearching, setIsSearching] = useState(false);
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

  // Auto-detect user location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const location = await detectUserLocation();
        setUserLocation(location);
        setLocationDetected(true);

        // Get smart suggestions based on location
        const suggestions = getSmartDestinationSuggestions(location.city);
        setNearbyDestinations(suggestions);

        console.log(`📍 Konum tespit edildi: ${location.city}, ${location.country} (${location.source})`);

        // Get nearby destinations
        const nearby = getNearbyDestinations(location.latitude, location.longitude, 5);
        console.log(`✈️ Yakın destinasyonlar:`, nearby.map(d => `${d.city} (${d.distance}km)`).join(', '));

      } catch (error) {
        console.error('Location detection error:', error);
        // Fallback to default
        setNearbyDestinations(['İstanbul', 'Antalya', 'Bodrum', 'Kapadokya']);
      }
    };

    detectLocation();
  }, []);
  
  
  // Advanced search function with real API integration
  const handleAdvancedSearch = useCallback(async () => {
    // Validation
    if (!searchQuery.trim()) {
      alert('⚠️ Lütfen bir destinasyon girin!');
      return;
    }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < today) {
      alert('⚠️ Giriş tarihi geçmiş bir tarih olamaz!');
      return;
    }

    if (checkOut <= checkIn) {
      alert('⚠️ Çıkış tarihi, giriş tarihinden sonra olmalıdır!');
      return;
    }

    // Traveler validation
    const travelerCount = parseInt(travelers);
    if (isNaN(travelerCount) || travelerCount < 1 || travelerCount > 20) {
      alert('⚠️ Yolcu sayısı 1-20 arasında olmalıdır!');
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
              // Use real hotels API
              const params = new URLSearchParams({
                cityCode: searchQuery,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                adults: travelers,
                rooms: '1'
              });
              const response = await fetch(`/api/search/hotels?${params}`);
              const data = await response.json();

              if (data.success && data.data?.hotels) {
                results.push(...data.data.hotels.map((hotel: any) => ({
                  ...hotel,
                  type: 'hotel',
                  title: hotel.name,
                  image: hotel.mainImage,
                  price: hotel.rooms?.[0]?.pricePerNight || hotel.priceMin,
                  rating: hotel.rating,
                  location: `${hotel.city}, ${hotel.region}`,
                })));
              }
            } catch (error) {
              console.error('Hotel search error:', error);
            }
          }
          break;

        case 'flights':
          try {
            // Use real flights API
            const params = new URLSearchParams({
              originLocationCode: 'IST', // Default origin
              destinationLocationCode: searchQuery.toUpperCase(),
              departureDate: checkInDate,
              adults: travelers,
              max: '10'
            });
            const response = await fetch(`/api/search/flights?${params}`);
            const data = await response.json();

            if (data.success && data.data?.flights) {
              results.push(...data.data.flights.map((flight: any) => ({
                ...flight,
                type: 'flight',
                title: `${flight.airline} - ${flight.flightNumber}`,
                image: flight.airlineLogo || '/images/default-flight.jpg',
                price: flight.priceAdult,
                location: `${flight.from} → ${flight.to}`,
              })));
            }
          } catch (error) {
            console.error('Flight search error:', error);
          }
          break;

        case 'transfers':
          try {
            // Use real transfers API with database
            const params = new URLSearchParams({
              to: searchQuery,
              passengers: travelers
            });
            const response = await fetch(`/api/transfers/search?${params}`);
            const data = await response.json();

            if (data.success && data.transfers) {
              results.push(...data.transfers.map((transfer: any) => ({
                ...transfer,
                type: 'transfer',
                title: transfer.name,
                description: transfer.description,
                location: `${transfer.fromLocation} → ${transfer.toLocation}`,
                duration: `${transfer.duration} dakika`,
                image: transfer.image,
                price: transfer.vehicles?.[0]?.priceStandard || 0
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

      // Navigate to appropriate results page based on category
      // ALWAYS navigate - results page will show "no results" if needed
      console.log(`🔍 Arama: "${searchQuery}" | Kategori: ${selectedCategory} | Sonuç: ${results.length} adet`);

      if (selectedCategory === 'hotels' || selectedCategory === 'all') {
        router.push(`/hotels?city=${encodeURIComponent(searchQuery)}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${travelers}`);
      } else if (selectedCategory === 'flights') {
        router.push(`/flights?to=${encodeURIComponent(searchQuery)}&date=${checkInDate}&passengers=${travelers}`);
      } else if (selectedCategory === 'transfers') {
        router.push(`/transfers?to=${encodeURIComponent(searchQuery)}&passengers=${travelers}`);
      } else if (selectedCategory === 'tours') {
        // Navigate to tours page with query
        router.push(`/tours?query=${encodeURIComponent(searchQuery)}&date=${checkInDate}&guests=${travelers}`);
      } else if (selectedCategory === 'restaurants') {
        // Navigate to search page with restaurant filter
        router.push(`/search?type=restaurants&query=${encodeURIComponent(searchQuery)}`);
      }

    } catch (error) {
      console.error('❌ Arama hatası:', error);
      alert('⚠️ Arama sırasında bir hata oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, selectedCategory, checkInDate, checkOutDate, travelers, router]);
  
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
      <SEOHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords?.split(', ')}
        canonical={PAGE_SEO.home.canonical}
        type="website"
      />

      <ResponsiveHeaderBar />

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
          
          <div className="relative z-[200] max-w-7xl mx-auto px-4 py-12">
            {/* Content */}
            <div className="text-center">
              {/* Ultra Minimal Premium Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-2xl mx-auto relative z-[200]"
              >
                <div className="bg-white/98 backdrop-blur-2xl rounded-full shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] border border-white/40 p-2">
                  {/* Single Line: Category Icons + Search + Button */}
                  <div className="flex items-center gap-2">
                    {/* Category Icons - Ultra Compact */}
                    <div className="flex items-center gap-1 px-2">
                      {[
                        { id: 'all', icon: Globe },
                        { id: 'hotels', icon: MapPin },
                        { id: 'flights', icon: Send },
                        { id: 'tours', icon: Camera },
                        { id: 'transfers', icon: Car, badge: true }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedCategory(tab.id)}
                          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            selectedCategory === tab.id
                              ? 'bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white shadow-lg scale-110'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                          title={tab.id}
                        >
                          <tab.icon className="w-4 h-4" />
                          {tab.badge && selectedCategory !== tab.id && (
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white"></span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-px bg-gray-200"></div>

                    {/* Search Input - Dominant */}
                    <div className="flex-1">
                      <LocationAutocomplete
                        value={searchQuery}
                        onChange={(value, suggestion) => {
                          setSearchQuery(value);
                          if (suggestion) {
                            const searchValue = suggestion.code || suggestion.name;
                            setSearchQuery(searchValue);
                          }
                        }}
                        placeholder="Nereye gitmek istersiniz?"
                        type="all"
                        icon={<MapPin className="text-ailydian-primary w-4 h-4" />}
                        className="location-search-minimal"
                      />
                    </div>

                    {/* Search Button - Circular */}
                    <motion.button
                      onClick={handleAdvancedSearch}
                      disabled={isSearching}
                      whileHover={!isSearching ? { scale: 1.1, rotate: 90 } : {}}
                      whileTap={!isSearching ? { scale: 0.9 } : {}}
                      className={`w-12 h-12 rounded-full bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center flex-shrink-0 ${
                        isSearching ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSearching ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Search className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Quick Suggestions Below */}
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  {(nearbyDestinations.length > 0 ?
                    nearbyDestinations.slice(0, 3).map(dest => ({
                      text: dest,
                      query: dest,
                      category: 'hotels' as const
                    })) :
                    [
                      { text: 'İstanbul', query: 'Istanbul', category: 'hotels' as const },
                      { text: 'Kapadokya', query: 'Kapadokya', category: 'tours' as const },
                      { text: 'Bodrum', query: 'Bodrum', category: 'hotels' as const }
                    ]
                  ).map((suggestion) => (
                    <motion.button
                      key={suggestion.text}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchQuery(suggestion.query);
                        setSelectedCategory(suggestion.category);
                        setTimeout(() => handleAdvancedSearch(), 300);
                      }}
                      className="px-3 py-1.5 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-ailydian-primary rounded-full text-xs font-medium transition-all duration-200 border border-white/50 hover:border-ailydian-primary/50 shadow-sm hover:shadow-md"
                    >
                      {suggestion.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
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