import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_SEO } from '../config/seo';
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
  Building2,
  ShoppingCart,
  CheckCircle,
  SlidersHorizontal,
  Loader2,
  ArrowRight,
  FileText,
  UserCheck,
  Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import { NeoHero } from '../components/neo-glass/NeoHero';
import { FuturisticCard } from '../components/neo-glass/FuturisticCard';
import { FuturisticButton } from '../components/neo-glass/FuturisticButton';
import logger from '../lib/logger';

const HotelsNewPage: React.FC = () => {
  const router = useRouter();
  const { addItem, isInCart } = useCart();

  // Search state - Initialize from URL params
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // UI state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Hotels data
  const [hotels, setHotels] = useState<any[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);

  // Filters
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [starRating, setStarRating] = useState<number[]>([]);
  const [guestRating, setGuestRating] = useState([0, 10]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize from URL parameters
  useEffect(() => {
    if (router.isReady) {
      const { city, type, checkIn: urlCheckIn, checkOut: urlCheckOut, guests: urlGuests } = router.query;

      // Set destination from URL
      if (city && typeof city === 'string') {
        setDestination(city);
      } else if (!destination) {
        setDestination('Istanbul'); // Default city
      }

      // Set property type filter from URL
      if (type && typeof type === 'string') {
        setPropertyTypes([type]);
      }

      // Set dates from URL
      if (urlCheckIn && typeof urlCheckIn === 'string') {
        setCheckIn(urlCheckIn);
      }
      if (urlCheckOut && typeof urlCheckOut === 'string') {
        setCheckOut(urlCheckOut);
      }
      if (urlGuests && typeof urlGuests === 'string') {
        setGuests(parseInt(urlGuests) || 2);
      }
    }
  }, [router.isReady, router.query]);

  // Search when destination is set and router is ready
  useEffect(() => {
    if (router.isReady && destination) {
      searchHotels();
    }
  }, [router.isReady, destination]);

  const searchHotels = async () => {
    setLoading(true);
    try {
      // Set default dates if not set
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);

      const checkInDate = checkIn || tomorrow.toISOString().split('T')[0];
      const checkOutDate = checkOut || dayAfter.toISOString().split('T')[0];

      const params = new URLSearchParams({
        cityCode: destination,
        checkInDate,
        checkOutDate,
        adults: guests.toString()
      });

      const response = await fetch(`/api/search/hotels?${params}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.success && data.data) {
        setHotels(data.data.hotels || []);
        setFilteredHotels(data.data.hotels || []);
      }
    } catch (error) {
      logger.error('Search error:', error as Error, { component: 'Hotels' });
      setToastMessage('Arama sırasında hata oluştu');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [hotels, priceRange, starRating, guestRating, propertyTypes, selectedAmenities, sortBy]);

  const applyFilters = () => {
    let filtered = [...hotels];

    // Price filter
    filtered = filtered.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Star rating filter
    if (starRating.length > 0) {
      filtered = filtered.filter((hotel) => starRating.includes(hotel.stars));
    }

    // Guest rating filter
    filtered = filtered.filter(
      (hotel) => hotel.rating >= guestRating[0] && hotel.rating <= guestRating[1]
    );

    // Property type filter
    if (propertyTypes.length > 0) {
      filtered = filtered.filter((hotel) =>
      propertyTypes.includes(hotel.hotelType)
      );
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((hotel) =>
      selectedAmenities.every((amenity) => hotel.amenities?.includes(amenity))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    setFilteredHotels(filtered);
  };

  const handleAddToCart = (hotel: any) => {
    const priceValue = hotel.price;

    addItem({
      id: `hotel-${hotel.id}`,
      type: 'hotel',
      title: hotel.name,
      description: hotel.description,
      image: hotel.mainImage,
      price: priceValue,
      originalPrice: hotel.priceMax > hotel.price ? hotel.priceMax : undefined,
      currency: hotel.currency || 'TRY',
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

  const activeFilterCount =
  (starRating.length > 0 ? 1 : 0) + (
  guestRating[0] > 0 || guestRating[1] < 10 ? 1 : 0) + (
  priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0) +
  propertyTypes.length +
  selectedAmenities.length;

  return (
    <>
      <SEOHead
        title={PAGE_SEO.hotels.title}
        description={PAGE_SEO.hotels.description}
        keywords={PAGE_SEO.hotels.keywords?.split(', ')}
        canonical={PAGE_SEO.hotels.canonical}
        type="website" />


      <FuturisticHeader />

      <Link
        href="/"
        className="fixed top-24 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-lydian-bg/90 backdrop-blur-sm rounded-xl shadow-lg border border-lydian-border text-lydian-text-muted hover:bg-lydian-glass-dark hover:text-lydian-primary transition-all duration-200">

        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="min-h-screen bg-lydian-glass-dark">
        {/* Hero Section with NeoHero */}
        <NeoHero
          title="Hayalinizdeki Oteli Bulun"
          subtitle="Binlerce gerçek otel, anlık fiyatlar ve güvenli rezervasyon ile kusursuz konaklama deneyimi"
          gradient="twilight"
          height="60vh"
          overlayOpacity={0.3}
          showFloatingElements={true}>

          {/* Search Form in Hero */}
          <div className="w-full max-w-6xl mx-auto mt-12">
            <div className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5 transition-all group-hover:scale-110" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Nereye gidiyorsunuz?"
                    className="w-full pl-10 pr-4 py-3 bg-lydian-bg/5 backdrop-blur-xl border border-white/10 rounded-xl text-lydian-text-inverse placeholder-lydian-text-muted focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all hover:bg-lydian-bg/10" />

                </div>

                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5 transition-all group-hover:scale-110" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-lydian-bg/5 backdrop-blur-xl border border-white/10 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all hover:bg-lydian-bg/10" />

                </div>

                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5 transition-all group-hover:scale-110" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-lydian-bg/5 backdrop-blur-xl border border-white/10 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all hover:bg-lydian-bg/10" />

                </div>

                <div className="relative group">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5 transition-all group-hover:scale-110" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-lydian-bg/5 backdrop-blur-xl border border-white/10 rounded-xl text-lydian-text-inverse focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all hover:bg-lydian-bg/10 appearance-none cursor-pointer">

                    <option value={1} className="bg-lydian-bg text-lydian-text-inverse">1 Misafir</option>
                    <option value={2} className="bg-lydian-bg text-lydian-text-inverse">2 Misafir</option>
                    <option value={3} className="bg-lydian-bg text-lydian-text-inverse">3 Misafir</option>
                    <option value={4} className="bg-lydian-bg text-lydian-text-inverse">4 Misafir</option>
                    <option value={5} className="bg-lydian-bg text-lydian-text-inverse">5+ Misafir</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <FuturisticButton onClick={searchHotels}
                  disabled={loading}
                  loading={loading}
                  variant="gradient"
                  size="lg"
                  leftIcon={<Search className="w-5 h-5" />}>

                  {loading ? 'Aranıyor...' : 'Otel Ara'}
                </FuturisticButton>
              </div>
            </div>
          </div>
        </NeoHero>

        {/* Filter Section - Neo-Glass Design */}
        <section className="bg-lydian-glass-dark backdrop-blur-xl border-b border-lydian-border-light/10">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-pink-500/30 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-lydian-text-inverse">
                    {filteredHotels.length} Otel
                  </h2>
                  <p className="text-sm text-lydian-text-muted">Seçiminize uygun sonuçlar</p>
                </div>
              </motion.div>

              <div className="flex flex-wrap items-center gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-5 py-3 bg-lydian-bg/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-lydian-bg/10 hover:border-pink-500/50 transition-all relative group">

                    <SlidersHorizontal className="w-4 h-4 text-pink-400 group-hover:rotate-90 transition-transform" />
                    <span className="text-lydian-text-inverse font-medium">Filtreler</span>
                    {activeFilterCount > 0 &&
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 text-lydian-text-inverse rounded-full text-xs font-bold shadow-lg shadow-pink-500/50">

                        {activeFilterCount}
                      </motion.span>
                    }
                  </button>
                </motion.div>

                <div className="relative group">
                  <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4 transition-all group-hover:scale-110" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-lydian-bg/5 backdrop-blur-xl border border-white/10 rounded-xl text-lydian-text-inverse hover:bg-lydian-bg/10 hover:border-pink-500/50 transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50">

                    <option value="popularity" className="bg-lydian-bg text-lydian-text-inverse">Popülerlik</option>
                    <option value="price-low" className="bg-lydian-bg text-lydian-text-inverse">Fiyat (Düşük-Yüksek)</option>
                    <option value="price-high" className="bg-lydian-bg text-lydian-text-inverse">Fiyat (Yüksek-Düşük)</option>
                    <option value="rating" className="bg-lydian-bg text-lydian-text-inverse">Puan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels Grid - FuturisticCard Implementation */}
        <section className="py-16 bg-lydian-glass-dark backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4">
            {loading ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col justify-center items-center py-20">

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 rounded-full border-4 border-pink-500/20 border-t-pink-500 mb-6" />

                <p className="text-lydian-text-inverse text-xl font-medium">Oteller yükleniyor...</p>
                <p className="text-lydian-text-muted text-sm mt-2">Sizin için en iyi seçenekleri buluyoruz</p>
              </motion.div> :

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map((hotel, index) =>
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}>

                  <FuturisticCard
                    image={hotel.mainImage}
                    title={hotel.name}
                    description={hotel.description}
                    price={`${hotel.price.toLocaleString('tr-TR')} ${hotel.currency}`}
                    oldPrice={hotel.priceMax > hotel.price ? `${hotel.priceMax.toLocaleString('tr-TR')} ${hotel.currency}` : undefined}
                    badge={hotel.stars === 5 ? 'Lüks' : undefined}
                    category={`${hotel.stars} Yıldız`}
                    categoryColor="#EC4899"
                    rating={hotel.rating}
                    reviews={hotel.reviewCount}
                    metadata={[
                    {
                      icon: <MapPin className="w-4 h-4" />,
                      label: hotel.location
                    },
                    {
                      icon: <Building2 className="w-4 h-4" />,
                      label: hotel.hotelType || 'Otel'
                    },
                    {
                      icon: <Users className="w-4 h-4" />,
                      label: `${guests} Misafir`
                    },
                    {
                      icon: <Calendar className="w-4 h-4" />,
                      label: checkIn && checkOut ? `${checkIn} - ${checkOut}` : 'Tarih Seçin'
                    }]}

                    badges={hotel.amenities?.slice(0, 3) || []}
                    onAddToCart={() => handleAddToCart(hotel)}
                    onFavorite={() => {
                      // TODO: Implement favorite functionality
                      setToastMessage(`${hotel.name} favorilere eklendi!`);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                    onClick={() => {
                      // TODO: Navigate to hotel details
                      router.push(`/hotels/${hotel.id}`);
                    }} />

                </motion.div>
              )}
              </div>
            }

            {!loading && filteredHotels.length === 0 &&
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20">

                <div className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-12 max-w-2xl mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center">
                    <Building className="w-12 h-12 text-pink-400" />
                  </div>
                  <h2 className="text-3xl font-black text-lydian-text-inverse mb-4">
                    Aradığınız kriterlerde otel bulunamadı
                  </h2>
                  <p className="text-lydian-text-muted mb-8 text-lg">
                    Filtrelerinizi değiştirerek tekrar deneyin veya farklı bir destinasyon seçin
                  </p>
                  <FuturisticButton onClick={() => {
                      setPriceRange([0, 50000]);
                      setStarRating([]);
                      setGuestRating([0, 10]);
                      setPropertyTypes([]);
                      setSelectedAmenities([]);
                    }}
                    variant="gradient"
                    size="lg"
                    leftIcon={<ArrowLeft className="w-5 h-5" />}>

                    Filtreleri Temizle
                  </FuturisticButton>
                </div>
              </motion.div>
            }
          </div>
        </section>

        {/* Terms & Conditions Section - Neo-Glass Design */}
        <section className="max-w-7xl mx-auto px-4 py-20 border-t border-lydian-border-light/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">

            <h2 className="text-4xl font-black text-lydian-text-inverse mb-4">
              Güvenli Rezervasyon Garantisi
            </h2>
            <p className="text-lydian-text-muted text-lg max-w-2xl mx-auto">
              AI destekli blockchain teknolojisi ile korunan, şeffaf ve güvenli rezervasyon deneyimi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Booking Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8 hover:border-lydian-primary/50 transition-all group">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-lydian-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-lydian-text-inverse">Rezervasyon Koşulları</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Ücretsiz iptal: Check-in'den 48 saat öncesine kadar</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Rezervasyon onayı: Anlık e-posta ve SMS bildirimi</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Fiyat garantisi: Rezervasyon anındaki fiyat geçerlidir</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Değişiklik: Rezervasyon tarihlerini değiştirme hakkı</span>
                </li>
              </ul>
            </motion.div>

            {/* Payment & Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8 hover:border-green-500/50 transition-all group">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-lydian-text-inverse">Ödeme & Güvenlik</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">SSL sertifikalı güvenli ödeme altyapısı</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Tüm kredi kartları ve kripto para kabul edilir</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">3D Secure doğrulama ile ekstra güvenlik</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Kişisel verileriniz KVKK kapsamında korunur</span>
                </li>
              </ul>
            </motion.div>

            {/* Support & Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8 hover:border-pink-500/50 transition-all group">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-lydian-text-inverse">Destek & Yardım</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">7/24 Türkçe canlı destek hizmeti</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">AI destekli seyahat danışmanlığı</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">Sorun çözümünde %100 memnuniyet garantisi</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-lydian-text-dim">WhatsApp ve e-posta ile hızlı iletişim</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-lydian-glass-dark-medium to-lydian-glass-dark backdrop-blur-xl border border-lydian-border-light rounded-3xl p-8 relative overflow-hidden group">

            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)']

              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />


            <div className="relative flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-pink-400 flex-shrink-0" />
              <p className="text-lydian-text-dim text-base">
                <strong className="font-bold text-lydian-text-inverse">Önemli Bilgi:</strong> Travel LyDian,
                AI destekli blockchain tabanlı güvenli rezervasyon sistemi ile seyahatinizi güvence altına alır.
                Tüm rezervasyonlarınız anında onaylanır ve blockchain ağında kayıt altına alınır.
                Detaylı bilgi için{' '}
                <Link
                  href="/support"
                  className="font-semibold text-pink-400 hover:text-pink-300 underline decoration-pink-400/50 hover:decoration-pink-300 transition-all">

                  destek merkezimize
                </Link>
                {' '}başvurabilirsiniz.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {showToast &&
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-green-500/90 to-emerald-500/90 backdrop-blur-xl border border-green-400/30 text-lydian-text-inverse px-6 py-4 rounded-2xl shadow-[0_20px_60px_-15px_rgba(34,197,94,0.5)] flex items-center gap-3">

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}>

              <CheckCircle className="w-6 h-6" />
            </motion.div>
            <span className="font-semibold">{toastMessage}</span>
          </motion.div>
        }
      </AnimatePresence>

      <BookingFooter />
    </>);

};

export default HotelsNewPage;