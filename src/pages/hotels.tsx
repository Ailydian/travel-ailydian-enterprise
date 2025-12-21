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
  UserCheck
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';
import { useCart } from '../context/CartContext';

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
        adults: guests.toString(),
      });

      const response = await fetch(`/api/search/hotels?${params}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.success && data.data) {
        setHotels(data.data.hotels || []);
        setFilteredHotels(data.data.hotels || []);
      }
    } catch (error) {
      console.error('Search error:', error);
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
      hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Star rating filter
    if (starRating.length > 0) {
      filtered = filtered.filter(hotel => starRating.includes(hotel.stars));
    }

    // Guest rating filter
    filtered = filtered.filter(
      hotel => hotel.rating >= guestRating[0] && hotel.rating <= guestRating[1]
    );

    // Property type filter
    if (propertyTypes.length > 0) {
      filtered = filtered.filter(hotel =>
        propertyTypes.includes(hotel.hotelType)
      );
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedAmenities.every(amenity => hotel.amenities?.includes(amenity))
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
    (starRating.length > 0 ? 1 : 0) +
    (guestRating[0] > 0 || guestRating[1] < 10 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0) +
    propertyTypes.length +
    selectedAmenities.length;

  return (
    <>
      <SEOHead
        title={PAGE_SEO.hotels.title}
        description={PAGE_SEO.hotels.description}
        keywords={PAGE_SEO.hotels.keywords?.split(', ')}
        canonical={PAGE_SEO.hotels.canonical}
        type="website"
      />

      <NavigationHeader />

      <Link
        href="/"
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:text-ailydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hayalinizdeki Oteli Bulun
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {hotels.length} gerçek otel, anlık fiyatlar, güvenli rezervasyon
              </p>

              {/* Search Form */}
              <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Nereye gidiyorsunuz?"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
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
                    onClick={searchHotels}
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-white text-ailydian-primary rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    {loading ? 'Aranıyor...' : 'Otel Ara'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredHotels.length} Otel Bulundu
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtreler
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-ailydian-primary text-white rounded-full text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="popularity">Popülerlik</option>
                  <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                  <option value="rating">Puan</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-ailydian-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={hotel.mainImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-ailydian-primary text-white rounded-full text-sm font-medium">
                          {hotel.stars} Yıldız
                        </span>
                      </div>
                      <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.location}</span>
                      </div>

                      <h3 className="font-bold text-xl text-gray-900 mb-2">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{hotel.rating}</span>
                        <span className="text-gray-500 text-sm">({hotel.reviewCount} değerlendirme)</span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {hotel.price.toLocaleString('tr-TR')} {hotel.currency}
                            </div>
                            <span className="text-sm text-gray-600">gecelik</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(hotel)}
                            className="flex-1 px-4 py-2 border-2 border-ailydian-primary text-ailydian-primary rounded-lg font-medium hover:bg-ailydian-primary/10 transition-colors flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Sepete Ekle
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <Building className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Aradığınız kriterlerde otel bulunamadı
                </h2>
                <p className="text-gray-600 mb-8">
                  Filtrelerinizi değiştirerek tekrar deneyin
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 border-t" style={{ borderColor: '#E5E7EB' }}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Booking Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
                       border: '1px solid rgba(59, 130, 246, 0.2)'
                     }}>
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Rezervasyon Koşulları</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Ücretsiz iptal: Check-in'den 48 saat öncesine kadar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Rezervasyon onayı: Anlık e-posta ve SMS bildirimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Fiyat garantisi: Rezervasyon anındaki fiyat geçerlidir</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Değişiklik: Rezervasyon tarihlerini değiştirme hakkı</span>
                </li>
              </ul>
            </motion.div>

            {/* Payment & Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))',
                       border: '1px solid rgba(34, 197, 94, 0.2)'
                     }}>
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ödeme & Güvenlik</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>SSL sertifikalı güvenli ödeme altyapısı</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Tüm kredi kartları ve kripto para kabul edilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>3D Secure doğrulama ile ekstra güvenlik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Kişisel verileriniz KVKK kapsamında korunur</span>
                </li>
              </ul>
            </motion.div>

            {/* Support & Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(135deg, rgba(255, 33, 77, 0.1), rgba(255, 106, 69, 0.1))',
                       border: '1px solid rgba(255, 33, 77, 0.2)'
                     }}>
                  <UserCheck className="w-6 h-6" style={{ color: '#FF214D' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Destek & Yardım</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>7/24 Türkçe canlı destek hizmeti</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>AI destekli seyahat danışmanlığı</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Sorun çözümünde %100 memnuniyet garantisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>WhatsApp ve e-posta ile hızlı iletişim</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 rounded-xl border-2"
               style={{
                 backgroundColor: 'rgba(249, 250, 251, 0.5)',
                 borderColor: '#E5E7EB'
               }}>
            <p className="text-sm text-gray-600 text-center">
              <strong className="font-bold text-gray-900">Önemli Bilgi:</strong> Travel Ailydian,
              AI destekli blockchain tabanlı güvenli rezervasyon sistemi ile seyahatinizi güvence altına alır.
              Tüm rezervasyonlarınız anında onaylanır ve blockchain ağında kayıt altına alınır.
              Detaylı bilgi için{' '}
              <Link href="/support" className="font-semibold hover:underline" style={{ color: '#FF214D' }}>
                destek merkezimize
              </Link>
              {' '}başvurabilirsiniz.
            </p>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HotelsNewPage;
