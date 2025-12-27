import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Heart,
  Filter,
  Bot,
  Eye,
  ArrowLeft,
  Shield,
  Building,
  ShoppingCart,
  CheckCircle,
  SlidersHorizontal } from
'lucide-react';
import SimplifiedHeader from '../components/layout/SimplifiedHeader';
import { useCart } from '../context/CartContext';
import AdvancedFilters from '../components/search/AdvancedFilters';
import FilterChips from '../components/search/FilterChips';
import { useFilters } from '../hooks/useFilters';
import { HotelFilters, DEFAULT_HOTEL_FILTERS } from '../types/filters';

const HotelsPage: React.FC = () => {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  // Advanced filters hook
  const {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    activeFilterCount,
    isDefaultFilters
  } = useFilters<HotelFilters>({ type: 'hotel', syncWithUrl: true });

  const hotels = [
  {
    id: 1,
    name: 'Boğaziçi Palace Hotel',
    location: 'Sultanahmet, İstanbul',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&q=90',
    price: '₺2,400',
    originalPrice: '₺3,000',
    rating: 4.8,
    reviews: 2341,
    amenities: ['WiFi', 'Havuz', 'Spa', 'Restoran', 'Otopark'],
    badge: 'AI Önerisi',
    description: 'Boğaziçi manzaralı lüks otel ve AI destekli konsiyerj servisi',
    features: ['VR Oda Turu', 'Akıllı Oda Kontrolü'],
    highlights: ['Blockchain güvenli rezervasyon', '24/7 AI destek', 'VR deneyimi']
  },
  {
    id: 2,
    name: 'Kapadokya Mağara Otel',
    location: 'Göreme, Kapadokya',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&q=90',
    price: '₺1,780',
    originalPrice: '₺2,200',
    rating: 4.9,
    reviews: 1567,
    amenities: ['WiFi', 'Restoran', 'Teras', 'Spa'],
    badge: 'VR Önizleme',
    description: 'Balon manzaralı eşsiz mağara otel ve sanal tur deneyimi',
    features: ['360° VR Önizleme', 'Drone Görüntüleri'],
    highlights: ['Otantik mağara odaları', 'Balon turu indirimi', 'Yerel rehber']
  },
  {
    id: 3,
    name: 'Modern City Suites',
    location: 'Taksim, İstanbul',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&q=90',
    price: '₺1,900',
    rating: 4.6,
    reviews: 892,
    amenities: ['WiFi', 'Spor Salonu', 'İş Merkezi', 'Bar'],
    badge: 'Teknoloji Dostu',
    description: 'Akıllı teknoloji ile donatılmış modern suites ve merkezi konum',
    features: ['Akıllı Check-in', 'AI Asistan'],
    highlights: ['Şehir merkezi konumu', 'Akıllı ev teknolojisi', 'İş seyahatleri için ideal']
  },
  {
    id: 4,
    name: 'Antalya Riviera Resort',
    location: 'Kemer, Antalya',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&q=90',
    price: '₺3,200',
    originalPrice: '₺4,000',
    rating: 4.7,
    reviews: 1834,
    amenities: ['WiFi', 'Havuz', 'Spa', 'Restoran', 'Plaj'],
    badge: 'Her Şey Dahil',
    description: 'Akdeniz kıyısında lüks resort, AI destekli aktivite önerileri',
    features: ['AI Aktivite Planı', 'VR Spa Turu'],
    highlights: ['Özel plaj', 'Suya dayalı sporlar', 'Çocuk kulübü']
  },
  {
    id: 5,
    name: 'Bodrum Marina Hotel',
    location: 'Bodrum Marina, Bodrum',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&q=90',
    price: '₺2,100',
    originalPrice: '₺2,600',
    rating: 4.6,
    reviews: 967,
    amenities: ['WiFi', 'Marina Manzarası', 'Restoran', 'Bar'],
    badge: 'Marina Manzarası',
    description: 'Marina kenarında boutique otel, tekne turları ve gece hayatı',
    features: ['Tekne Turu Rezervasyonu', 'Gece Hayatı Rehberi'],
    highlights: ['Marina manzarası', 'Tekne turları', 'Canlı gece hayatı']
  },
  {
    id: 6,
    name: 'Pamukkale Termal Spa',
    location: 'Pamukkale, Denizli',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&q=90',
    price: '₺1,550',
    originalPrice: '₺1,950',
    rating: 4.5,
    reviews: 743,
    amenities: ['WiFi', 'Termal Havuz', 'Spa', 'Restoran'],
    badge: 'Wellness Merkezi',
    description: 'Doğal termal sular ve wellness programları ile şifa bulun',
    features: ['Termal Tedavi', 'Wellness Programları'],
    highlights: ['Doğal termal sular', 'Spa tedavileri', 'Hierapolis antik kenti']
  }];


  const amenityIcons: {[key: string]: React.ComponentType<any>;} = {
    'WiFi': Wifi,
    'Havuz': Waves,
    'Spa': Heart,
    'Restoran': Utensils,
    'Otopark': Car,
    'Spor Salonu': Dumbbell,
    'Teras': Building,
    'İş Merkezi': Users,
    'Bar': Utensils,
    'Plaj': Waves,
    'Marina Manzarası': MapPin,
    'Termal Havuz': Waves
  };

  const handleAddToCart = (hotel: typeof hotels[0]) => {
    const priceValue = parseFloat(hotel.price.replace('₺', '').replace(',', ''));

    addItem({
      id: `hotel-${hotel.id}`,
      type: 'hotel',
      title: hotel.name,
      description: hotel.description,
      image: hotel.image,
      price: priceValue,
      originalPrice: hotel.originalPrice ? parseFloat(hotel.originalPrice.replace('₺', '').replace(',', '')) : undefined,
      currency: 'TRY',
      quantity: 1,
      location: hotel.location,
      rating: hotel.rating,
      bookingDetails: {
        checkIn,
        checkOut,
        guests,
        rooms: 1
      },
      isRefundable: true,
      cancellationPolicy: 'Ücretsiz iptal: 24 saat öncesine kadar'
    });

    setToastMessage(`${hotel.name} sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReserve = (hotel: typeof hotels[0]) => {
    // Save product info to localStorage and redirect to reservation page
    const productInfo = {
      id: hotel.id,
      type: 'hotel',
      name: hotel.name,
      location: hotel.location,
      image: hotel.image,
      price: hotel.price,
      originalPrice: hotel.originalPrice,
      rating: hotel.rating,
      reviews: hotel.reviews,
      amenities: hotel.amenities,
      description: hotel.description,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests
    };

    localStorage.setItem('selectedProduct', JSON.stringify(productInfo));
    router.push('/reservation');
  };

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter((hotel) => {
      // Price filter
      const price = parseFloat(hotel.price.replace('₺', '').replace(',', ''));
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }

      // Star rating filter
      if (filters.starRating.length > 0) {
        const hotelStars = Math.floor(hotel.rating);
        if (!filters.starRating.includes(hotelStars)) {
          return false;
        }
      }

      // Guest rating filter
      if (hotel.rating < filters.guestRating.min || hotel.rating > filters.guestRating.max) {
        return false;
      }

      // Property type filter (would need to add type to hotel data)
      // Amenities filter (would need to check if hotel has selected amenities)
      // Meal plans filter (would need to add meal plan to hotel data)

      return true;
    });

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.reviews - a.reviews;
      }
    });

    return filtered;
  }, [hotels, filters, sortBy]);

  // Handle filter chip removal
  const handleRemoveFilter = (filterKey: string, value?: any) => {
    if (filterKey === 'priceRange' || filterKey === 'guestRating' || filterKey === 'distanceFromCenter') {
      const defaultFilters = DEFAULT_HOTEL_FILTERS;
      updateFilter(filterKey as keyof HotelFilters, defaultFilters[filterKey] as any);
    } else if (value !== undefined) {
      const currentValues = filters[filterKey as keyof HotelFilters] as any[];
      updateFilter(
        filterKey as keyof HotelFilters,
        currentValues.filter((v: any) => v !== value) as any
      );
    }
  };

  return (
    <>
      <Head>
        <title>Oteller - LyDian Travel | AI Destekli Otel Rezervasyonu</title>
        <meta name="description" content="Türkiye'nin en güzel otellerinde konaklama. AI önerileri, VR önizleme ve blockchain güvenli rezervasyon." />
        <meta name="keywords" content="otel, konaklama, rezervasyon, AI önerisi, VR önizleme, blockchain, Türkiye" />
      </Head>

      <SimplifiedHeader />

      {/* Return to Home Button */}
      <Link
        href="/"
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-lydian-bg/90 backdrop-blur-sm rounded-xl shadow-lg border border-lydian-border text-lydian-text-muted hover:bg-lydian-glass-dark hover:text-lydian-primary transition-all duration-200">

        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lydian-primary to-lydian-secondary py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-lydian-text-inverse">

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hayalinizdeki Oteli Bulun
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                AI önerileri, VR önizleme ve blockchain güvenli rezervasyon ile eşsiz konaklama deneyimi
              </p>
              
              {/* Search Form */}
              <div className="max-w-6xl mx-auto bg-lydian-glass-dark-medium backdrop-blur-sm rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-5 h-5" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Nereye gidiyorsunuz?"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-lydian-text-inverse placeholder-lydian-text-tertiary focus:outline-none focus:ring-2 focus:ring-white/30" />

                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-5 h-5" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-white/30 [color-scheme:light]"
                      style={{ colorScheme: 'light' }} />

                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-5 h-5" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-white/30 [color-scheme:light]"
                      style={{ colorScheme: 'light' }} />

                  </div>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lydian-text-muted w-5 h-5" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none">

                      <option value={1}>1 Misafir</option>
                      <option value={2}>2 Misafir</option>
                      <option value={3}>3 Misafir</option>
                      <option value={4}>4 Misafir</option>
                      <option value={5}>5+ Misafir</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-3 bg-lydian-bg-hover text-lydian-primary rounded-xl font-medium hover:bg-lydian-glass-dark-medium transition-colors">

                    <Search className="w-5 h-5" />
                    Otel Ara
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-lydian-bg-hover border-b border-lydian-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-lydian-text-inverse">
                {filteredAndSortedHotels.length} Otel Bulundu
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-lydian-border-medium rounded-lg hover:bg-lydian-glass-dark transition-colors relative">

                  <SlidersHorizontal className="w-4 h-4" />
                  Gelişmiş Filtreler
                  {activeFilterCount > 0 &&
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-lydian-primary text-lydian-text-inverse rounded-full text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  }
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-lydian-border-medium rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-lydian-border">

                  <option value="popularity">Popülerlik</option>
                  <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                  <option value="rating">Puan</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 &&
            <div className="mb-4">
                <FilterChips
                type="hotel"
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={resetFilters} />

              </div>
            }
          </div>
        </section>

        {/* Hotels Grid with Filters */}
        <section className="py-12 bg-lydian-glass-dark">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-6">
              {/* Advanced Filters Sidebar */}
              <AdvancedFilters
                type="hotel"
                filters={filters}
                onFilterChange={updateFilters}
                onReset={resetFilters}
                onClose={() => setShowFilters(false)}
                isOpen={showFilters}
                activeFilterCount={activeFilterCount} />


              {/* Hotels Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedHotels.map((hotel) =>
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: hotel.id * 0.1 }}
                    className="bg-lydian-bg-hover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-lydian-primary text-lydian-text-inverse rounded-full text-sm font-medium">
                        {hotel.badge}
                      </span>
                    </div>

                    {/* Heart */}
                    <button className="absolute top-4 right-4 p-2 bg-lydian-bg/80 hover:bg-lydian-glass-dark rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-lydian-text-dim" />
                    </button>

                    {/* Feature Buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {(hotel.features.includes('VR Oda Turu') || hotel.features.includes('360° VR Önizleme')) &&
                        <button className="p-2 bg-lydian-success text-lydian-text-inverse rounded-full hover:bg-green-700 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        }
                      {(hotel.features.includes('AI Asistan') || hotel.features.includes('Akıllı Oda Kontrolü')) &&
                        <button className="p-2 bg-purple-600 text-lydian-text-inverse rounded-full hover:bg-purple-700 transition-colors">
                          <Bot className="w-4 h-4" />
                        </button>
                        }
                      <button className="p-2 bg-lydian-primary text-lydian-text-inverse rounded-full hover:bg-lydian-primary-dark transition-colors">
                        <Shield className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-lydian-text-muted mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>

                    <h3 className="font-bold text-xl text-lydian-text-inverse mb-2">{hotel.name}</h3>
                    <p className="text-lydian-text-dim text-sm mb-4">{hotel.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.features.map((feature) =>
                        <span key={feature} className="px-2 py-1 bg-lydian-primary-light text-blue-800 rounded-full text-xs">
                          {feature}
                        </span>
                        )}
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-lydian-text-inverse mb-2">Öne Çıkanlar:</h4>
                      <ul className="text-sm text-lydian-text-dim space-y-1">
                        {hotel.highlights.slice(0, 2).map((highlight, index) =>
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {highlight}
                          </li>
                          )}
                      </ul>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-3 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity] || Wifi;
                          return (
                            <div key={amenity} className="flex items-center gap-1 text-lydian-text-muted" title={amenity}>
                            <Icon className="w-4 h-4" />
                          </div>);

                        })}
                      {hotel.amenities.length > 4 &&
                        <span className="text-sm text-lydian-text-muted">+{hotel.amenities.length - 4} daha</span>
                        }
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-lydian-text-muted text-sm">({hotel.reviews} değerlendirme)</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-lydian-text-inverse">{hotel.price}</span>
                            {hotel.originalPrice &&
                              <span className="text-sm text-lydian-text-muted line-through">{hotel.originalPrice}</span>
                              }
                          </div>
                          <span className="text-sm text-lydian-text-dim">gecelik</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(hotel)}
                            className="flex-1 px-4 py-2 border-2 border-lydian-primary text-lydian-primary rounded-lg font-medium hover:bg-lydian-primary/10 transition-colors flex items-center justify-center gap-2">

                          <ShoppingCart className="w-4 h-4" />
                          Sepete Ekle
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReserve(hotel)}
                            className="flex-1 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg font-medium hover:bg-lydian-dark transition-colors">

                          Rezerve Et
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                  )}
                </div>

                {/* No Results Message */}
                {filteredAndSortedHotels.length === 0 &&
                <div className="text-center py-16">
                    <Building className="w-24 h-24 text-lydian-text-dim mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">
                      Aradığınız kriterlerde otel bulunamadı
                    </h2>
                    <p className="text-lydian-text-dim mb-8">
                      Filtrelerinizi değiştirerek tekrar deneyin
                    </p>
                    <button
                    onClick={resetFilters}
                    className="bg-lydian-primary text-lydian-text-inverse px-6 py-3 rounded-lg hover:bg-lydian-dark transition-colors font-semibold">

                      Filtreleri Temizle
                    </button>
                  </div>
                }

                {/* Load More */}
                {filteredAndSortedHotels.length > 0 &&
                <div className="text-center mt-12">
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-lydian-primary text-lydian-primary rounded-xl font-semibold hover:bg-lydian-primary hover:text-lydian-text-inverse transition-colors">

                      Daha Fazla Otel Yükle
                    </motion.button>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast &&
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-lydian-text-inverse px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">

            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        }
      </AnimatePresence>
    </>);

};

export default HotelsPage;