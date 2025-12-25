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
  Car,
  Eye,
  Compass,
  Hotel,
  Plane,
  Home,
  Bus
} from 'lucide-react';
import { BookingHeader } from '../components/layout/BookingHeader';
import { BookingFooter } from '../components/layout/BookingFooter';
import antalyaTransfers from '@/data/antalya-transfers';
import antalyaCarRentals from '@/data/antalya-car-rentals';
import { BookingSearchForm } from '../components/booking/BookingSearchForm';
import { BookingProductCard } from '../components/booking/BookingProductCard';
import { FilterSidebar } from '../components/booking/FilterSidebar';
import AIRecommendations from '../components/ai/AIRecommendations';

const GetYourGuideStyleHome: React.FC = () => {
  // Router
  const router = useRouter();

  // Cart context
  const { addItem, getItemCount } = useCart();

  // Search results state (still needed for search results section)
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mobile filter state
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Add to cart function
  const handleAddToCart = useCallback((item: any) => {
    // Get default dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 3);

    const defaultCheckIn = tomorrow.toISOString().split('T')[0];
    const defaultCheckOut = dayAfter.toISOString().split('T')[0];

    const cartItem = {
      id: item.id || `item_${Date.now()}_${Math.random()}`,
      type: item.type || 'tour',
      title: item.title || item.name || 'Ürün',
      description: item.description || '',
      image: item.image || item.photos?.[0]?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      price: typeof item.price === 'string' ?
        parseFloat(item.price.replace(/[^0-9.]/g, '')) :
        (item.price || item.priceBreakdown?.grossPrice?.value || 100),
      originalPrice: item.originalPrice,
      currency: 'TRY',
      quantity: 1,
      date: defaultCheckIn,
      location: item.location || item.address?.cityName || 'Türkiye',
      duration: item.duration,
      rating: item.rating || item.reviewScoreWord,
      provider: item.provider || 'Ailydian',
      bookingDetails: {
        checkIn: defaultCheckIn,
        checkOut: defaultCheckOut,
        guests: 2,
        rooms: 1
      },
      cancellationPolicy: item.cancellationPolicy || 'Ücretsiz iptal 24 saat öncesine kadar',
      isRefundable: true
    };

    addItem(cartItem);

    // Success notification
    alert(`"${cartItem.title}" sepete eklendi! Toplam ürün: ${getItemCount() + 1}`);
  }, [addItem, getItemCount]);

  // Türkiye ve dünya destinasyonları - Türkçe içerikli
  const featuredDestinations = [
    {
      id: 1,
      slug: 'istanbul-tarihi-yarimada',
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
      slug: 'kapadokya-balon-turu',
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
      slug: 'antalya-turkuaz-sahiller',
      name: 'Antalya',
      country: 'Türkiye',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&q=90',
      experiences: '892',
      rating: 4.7,
      badge: 'Akdeniz İncisi',
      description: 'Antik şehirler, masmavi deniz ve güneş',
      specialOffers: ['Antik şehir turu', 'Tekne turu', 'Adrenalin sporları']
    }
  ];

  // Popüler deneyimler - Gerçek Turlar (antalya-tours.ts'den)
  const topExperiences = [
    {
      id: 1,
      title: 'Alanya: Quad Safari & Jeep Safari Turu',
      location: 'Alanya, Türkiye',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90',
      price: '₺299',
      originalPrice: '₺380',
      rating: 4.8,
      reviews: 2847,
      duration: '4.5 saat',
      category: 'Macera',
      badges: ['Popüler', 'Adrenalin', 'Profesyonel'],
      highlights: ['Dağ manzaraları', 'Eğlenceli adrenalin', 'Rehberli tur'],
      includes: ['Equipment', 'Professional guide', 'Safety gear']
    },
    {
      id: 2,
      title: 'Antalya Şehir Turu - Düden Şelaleleri',
      location: 'Antalya, Türkiye',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=90',
      price: '₺189',
      originalPrice: '₺250',
      rating: 4.7,
      reviews: 1956,
      duration: '5 saat',
      category: 'Kültür',
      badges: ['Tarihi', 'Doğa', 'Fotoğraf'],
      highlights: ['Tarih keşfi', 'Doğal güzellik', 'Şelale manzarası'],
      includes: ['Hotel pickup', 'Professional guide', 'Lunch']
    },
    {
      id: 3,
      title: 'Kemer Tekne Turu - Suluada Adası',
      location: 'Kemer, Türkiye',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&q=90',
      price: '₺249',
      originalPrice: '₺320',
      rating: 4.9,
      reviews: 2156,
      duration: '6 saat',
      category: 'Tekne Turları',
      badges: ['Deniz', 'Yüzme', 'Snorkeling'],
      highlights: ['Turkuaz su', 'Ada ziyareti', 'Snorkeling'],
      includes: ['Boat tour', 'Lunch', 'Snorkeling equipment']
    },
    {
      id: 4,
      title: 'Belek: Süper Kombo - Rafting, ATV, Zipline',
      location: 'Belek, Türkiye',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90',
      price: '₺449',
      originalPrice: '₺600',
      rating: 4.8,
      reviews: 1847,
      duration: '7 saat',
      category: 'Macera',
      badges: ['Kombine', 'Heyecanlı', 'Eğlenceli'],
      highlights: ['Üç aktivite', 'Aksiyon dolu', 'Profesyonel ekipman'],
      includes: ['All activities', 'Equipment', 'Meals & drinks']
    },
    {
      id: 5,
      title: 'Perge, Aspendos, Side - Antik Şehirler',
      location: 'Side, Türkiye',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=90',
      price: '₺219',
      originalPrice: '₺280',
      rating: 4.7,
      reviews: 1634,
      duration: '6 saat',
      category: 'Tarihi',
      badges: ['UNESCO', 'Tarih', 'Rehberli'],
      highlights: ['Antik kalıntılar', 'Tarihi mekanlar', 'Eğitici tur'],
      includes: ['Hotel pickup', 'Professional guide', 'Entrance fees']
    },
    {
      id: 6,
      title: 'Alanya Tüplü Dalış Deneyimi',
      location: 'Alanya, Türkiye',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=90',
      price: '₺399',
      originalPrice: '₺500',
      rating: 4.9,
      reviews: 1289,
      duration: '4 saat',
      category: 'Su Sporları',
      badges: ['PADI', 'Profesyonel', 'Güvenli'],
      highlights: ['Sualtı keşfi', 'Sertifikalı eğitmen', 'Deniz yaşamı'],
      includes: ['All diving equipment', 'Certified instructor', 'Insurance']
    }
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

      <BookingHeader />

      <main>
        {/* Hero Section - Booking.com SEARCH-FIRST Design */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ailydian-primary via-ailydian-secondary to-ailydian-dark">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                Bir Sonraki Maceranızı Bulun
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Türkiye'nin dört bir yanında oteller, turlar, arabalar ve daha fazlası
              </p>
            </motion.div>

            {/* Booking Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingSearchForm />
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-8 text-white/80"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Güvenli Ödeme</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">En İyi Fiyat Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Ücretsiz İptal</span>
              </div>
            </motion.div>
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
                        src={result.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'}
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
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-full text-xs font-medium">
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
                        <div className="flex flex-col gap-2">
                          <Link
                            href={
                              result.type === 'tour' ? `/tours/${result.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}` :
                              result.type === 'transfer' ? `/transfers/${result.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}` :
                              result.type === 'car-rental' ? `/car-rentals/${result.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}` :
                              result.type === 'destination' ? `/destinations/${result.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}` :
                              '#'
                            }
                            className="block"
                          >
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Detayları Gör
                            </motion.button>
                          </Link>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCart(result)}
                              className="p-2 bg-ailydian-primary hover:bg-ailydian-dark text-white rounded-lg transition-all duration-200 flex-shrink-0"
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
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
                            >
                              {result.type === 'hotel' ? 'Rezervasyon' :
                               result.type === 'flight' ? 'Bilet Al' :
                               result.type === 'transfer' ? 'Transfer Rezerve Et' :
                               result.type === 'restaurant' ? 'Rezerve Et' : 'Rezervasyon'}
                            </motion.button>
                          </div>
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


        {/* Top Experiences - Booking.com Style Horizontal Listing with Sidebar */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Türkiye: {topExperiences.length} özellik bulundu</h2>
                  <p className="text-gray-600">En popüler turlar ve aktiviteler</p>
                </div>
                <Link href="/tours" className="hidden md:flex items-center gap-2 text-ailydian-primary hover:text-ailydian-dark font-medium">
                  Tüm Turları Gör
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Sorting & View Options */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="md:hidden px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:border-ailydian-primary transition-colors"
                  >
                    <Filter className="w-4 h-4 inline mr-2" />
                    Filtreler
                  </button>
                  <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:border-ailydian-primary transition-colors">
                    <option>Önerilenler</option>
                    <option>En Düşük Fiyat</option>
                    <option>En Yüksek Puan</option>
                    <option>En Çok Değerlendirilen</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{topExperiences.length}</span> sonuçtan <span className="font-medium">1-{Math.min(6, topExperiences.length)}</span> arası gösteriliyor
                </div>
              </div>
            </div>

            {/* Sidebar + Main Content Layout */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Sidebar - Desktop Only */}
              <aside className="hidden md:block w-80 flex-shrink-0">
                <FilterSidebar
                  isMobile={false}
                  onFilterChange={(filters) => {
                    console.log('Filters applied:', filters);
                    // TODO: Apply filters to products
                  }}
                />
              </aside>

              {/* Mobile Filter Sidebar */}
              <FilterSidebar
                isMobile={true}
                isOpen={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
                onFilterChange={(filters) => {
                  console.log('Filters applied:', filters);
                  // TODO: Apply filters to products
                }}
              />

              {/* Main Content - Product Listing */}
              <div className="flex-1">
                <div className="space-y-4">
                  {topExperiences.slice(0, 6).map((experience, index) => (
                    <BookingProductCard
                      key={experience.id}
                      id={experience.id}
                      title={experience.title}
                      location={experience.location}
                      rating={experience.rating}
                      reviewCount={experience.reviews}
                      images={[experience.image]}
                      price={typeof experience.price === 'string' ? parseFloat(experience.price.replace(/[^0-9]/g, '')) : experience.price}
                      originalPrice={experience.originalPrice ? (typeof experience.originalPrice === 'string' ? parseFloat(experience.originalPrice.replace(/[^0-9]/g, '')) : experience.originalPrice) : undefined}
                      currency="₺"
                      features={experience.highlights}
                      badges={experience.badges}
                      description={`${experience.duration} · ${experience.category}`}
                      href={`/tours/${experience.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}`}
                      type="tour"
                      onAddToCart={() => handleAddToCart({
                        ...experience,
                        type: 'tour',
                        price: typeof experience.price === 'string' ?
                          parseFloat(experience.price.replace(/[^0-9]/g, '')) : experience.price
                      })}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      Önceki
                    </button>
                    <button className="px-4 py-2 bg-ailydian-primary text-white rounded-lg text-sm font-medium">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      3
                    </button>
                    <span className="px-2 text-gray-500">...</span>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Sonraki
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Transfers - Antalya Routes */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Popüler Transfer Rotaları</h2>
                <p className="text-gray-600">Antalya bölgesi 19 transfer rotası - D2 belgeli araçlar</p>
              </div>
              <Link href="/transfers" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                Tümünü Gör
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {antalyaTransfers.slice(0, 8).map((transfer) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={transfer.images[0]}
                      alt={`${transfer.from.tr} - ${transfer.to.tr}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* D2 License Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-ailydian-primary text-white rounded-full text-xs font-bold">
                        D2 Belgeli
                      </span>
                    </div>

                    {/* Instant Booking Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                        Anlık Rezervasyon
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Route Information */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="font-bold text-gray-900 text-sm">{transfer.from.tr}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-6">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{transfer.to.tr}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 ml-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {transfer.duration} dk
                        </span>
                        <span>•</span>
                        <span>{transfer.distance} km</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-sm">{transfer.rating}</span>
                      </div>
                      <span className="text-gray-500 text-xs">({transfer.totalTransfers} transfer)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₺{transfer.pricing.economySedan}</span>
                        <span className="text-xs text-gray-500">başlangıç</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/transfers/${transfer.seo.slug.tr}`}
                        className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center text-xs"
                      >
                        Detaylar
                      </Link>
                      <Link
                        href={`/transfers/${transfer.seo.slug.tr}?book=true`}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-xs"
                      >
                        Rezervasyon
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Car Rentals Showcase */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Araç Kiralama Fırsatları</h2>
                <p className="text-gray-600">51 araç, 7 kategori - %2 Ucuz Fiyat Garantisi</p>
              </div>
              <Link href="/car-rentals" className="flex items-center gap-2 text-ailydian-primary hover:text-ailydian-dark font-medium">
                Tüm Araçlar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {antalyaCarRentals.filter(car => car.popular).slice(0, 8).map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model.tr}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-full text-xs font-bold capitalize">
                        {car.category}
                      </span>
                    </div>

                    {/* Popular Badge */}
                    {car.popular && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Popüler
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Car Name */}
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      {car.brand} {car.model.tr}
                    </h3>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{car.seats}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{car.transmission === 'automatic' ? 'Otomatik' : 'Manuel'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{car.year}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-sm">{car.rating}</span>
                      </div>
                      <span className="text-gray-500 text-xs">({car.totalRentals} kiralama)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₺{car.pricing.daily}</span>
                        <span className="text-xs text-gray-500">/gün</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Haftalık: ₺{car.pricing.weekly}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/car-rentals/${car.seo.slug.tr}`}
                      className="w-full block"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Car className="w-4 h-4" />
                        Kirala
                      </motion.button>
                    </Link>
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
                  className="group"
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

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">{destination.experiences} deneyim</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="block"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center gap-2"
                      >
                        <Compass className="w-4 h-4" />
                        Keşfet
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Services - Property, Vehicle & Transfer */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                  Partner Hizmetlerimiz
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ev, araç kiralama ve transfer hizmetlerinizi kolayca yönetin. Gelir elde edin, misafirlerinizi mutlu edin.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Property Rental */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <Link href="/owner">
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-ailydian-primary">
                    {/* Icon Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-bl-full"></div>

                    <div className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Home className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Ev & Villa Kiralama
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Mülkünüzü kiraya verin, gelir elde edin. Kolay yönetim, güvenli ödemeler.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-ailydian-primary font-semibold">
                          <span>Hemen Başla</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="px-3 py-1 bg-red-50 text-ailydian-primary rounded-full text-sm font-medium">
                          Partner
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-500">Ortalama Gelir</div>
                          <div className="font-bold text-gray-900">₺15,000/ay</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Vehicle Rental */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <Link href="/vehicle-owner">
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-ailydian-primary">
                    {/* Icon Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-bl-full"></div>

                    <div className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Car className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Araç Kiralama
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Araçlarınızı kiraya verin, filo yönetimi yapın. 14+ araç kategorisi desteği.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-ailydian-primary font-semibold">
                          <span>Hemen Başla</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="px-3 py-1 bg-red-50 text-ailydian-primary rounded-full text-sm font-medium">
                          Partner
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-500">Ortalama Gelir</div>
                          <div className="font-bold text-gray-900">₺8,500/ay</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Transfer Service */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <Link href="/transfer-owner">
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-ailydian-primary">
                    {/* Icon Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-bl-full"></div>

                    <div className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Bus className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Transfer Hizmeti
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Transfer araçlarınızı yönetin, havaalanı-otel transferleri sağlayın. D2 belgeli.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-ailydian-primary font-semibold">
                          <span>Hemen Başla</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="px-3 py-1 bg-red-50 text-ailydian-primary rounded-full text-sm font-medium">
                          Partner
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-500">Ortalama Gelir</div>
                          <div className="font-bold text-gray-900">₺12,000/ay</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-50 to-red-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-ailydian-primary" />
                <span className="text-ailydian-dark font-medium">
                  Ücretsiz kayıt ol, hemen gelir elde etmeye başla
                </span>
              </div>
            </motion.div>
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
                  color: 'bg-purple-100 text-ailydian-primary'
                },
                {
                  icon: Shield,
                  title: 'Blockchain Doğrulama',
                  description: 'Tüm yorumlar ve rezervasyonlar maksimum güven ve şeffaflık için blockchain üzerinde doğrulanır.',
                  color: 'bg-red-50 text-ailydian-primary'
                },
                {
                  icon: Zap,
                  title: 'Anlık Onay',
                  description: 'Çoğu deneyim için rezervasyon yapın ve anlık onay alın. Bekleme yok, belirsizlik yok.',
                  color: 'bg-red-50 text-ailydian-primary'
                },
                {
                  icon: Award,
                  title: 'Premium Deneyimler',
                  description: 'Başka yerde bulunmayan özel deneyimlere ve VIP hizmetlere erişim.',
                  color: 'bg-red-50 text-ailydian-primary'
                },
                {
                  icon: TrendingUp,
                  title: '7/24 AI Destek',
                  description: 'AI destekli müşteri destek sistemimizle istediğiniz zaman yardım alın.',
                  color: 'bg-red-50 text-ailydian-primary'
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

        {/* AI Recommendations Widget - Claude Innovation */}
        <div className="pb-16">
          <AIRecommendations />
        </div>
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

      {/* Booking.com Style Footer */}
      <BookingFooter />
    </>
  );
};

export default GetYourGuideStyleHome;