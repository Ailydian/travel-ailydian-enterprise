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
import ResponsiveHeaderBar from '../components/layout/ResponsiveHeaderBar';
import antalyaTransfers from '@/data/antalya-transfers';
import antalyaCarRentals from '@/data/antalya-car-rentals';

const GetYourGuideStyleHome: React.FC = () => {
  // Router
  const router = useRouter();

  // Cart context
  const { addItem, getItemCount } = useCart();

  // Search results state (still needed for search results section)
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
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
        {/* Hero Section - Simple & Clean */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <VideoBackground
              autoPlay={true}
              muted={true}
              loop={true}
              overlay={true}
              overlayOpacity={0.65}
              changeInterval={60000}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Hayalinizdeki Tatil
                <br />
                <span className="bg-gradient-to-r from-ailydian-primary via-purple-400 to-ailydian-secondary bg-clip-text text-transparent">
                  Bir Arama Kadar Yakın
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Türkiye ve dünya turizminde binlerce otel, tur ve deneyimi keşfedin.
              </p>

              {/* Keşfet Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center"
              >
                <Link href="/experiences">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                  >
                    <Compass className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Keşfet</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                  </motion.button>
                </Link>
              </motion.div>
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
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-medium">
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
                              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 flex-shrink-0"
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


        {/* Top Experiences */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">En İyi Deneyimler</h2>
                <p className="text-gray-600">En popüler aktiviteler ve turlar</p>
              </div>
              <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
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
                      <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
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
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
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
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/tours/${experience.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}`}
                        className="w-full"
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
                          onClick={() => handleAddToCart({
                            ...experience,
                            type: 'tour',
                            price: typeof experience.price === 'string' ?
                              parseFloat(experience.price.replace(/[^0-9]/g, '')) : experience.price
                          })}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 font-medium text-sm"
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
                          className="flex-1 px-4 py-2 bg-ailydian-primary text-white rounded-lg font-medium hover:bg-ailydian-dark transition-colors text-sm"
                        >
                          Rezervasyon
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                      <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
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
              <Link href="/car-rentals" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
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
                      <span className="px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-bold capitalize">
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
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
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
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center gap-2"
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
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-500">
                    {/* Icon Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-bl-full"></div>

                    <div className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Home className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Ev & Villa Kiralama
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Mülkünüzü kiraya verin, gelir elde edin. Kolay yönetim, güvenli ödemeler.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <span>Hemen Başla</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-500">
                    {/* Icon Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-bl-full"></div>

                    <div className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Car className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Araç Kiralama
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Araçlarınızı kiraya verin, filo yönetimi yapın. 14+ araç kategorisi desteği.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <span>Hemen Başla</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-green-600">
                    {/* Icon Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-bl-full"></div>

                    <div className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Bus className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Transfer Hizmeti
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Transfer araçlarınızı yönetin, havaalanı-otel transferleri sağlayın. D2 belgeli.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <span>Hemen Başla</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-900 font-medium">
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
                  color: 'bg-purple-100 text-green-600'
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
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: Award,
                  title: 'Premium Deneyimler',
                  description: 'Başka yerde bulunmayan özel deneyimlere ve VIP hizmetlere erişim.',
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: TrendingUp,
                  title: '7/24 AI Destek',
                  description: 'AI destekli müşteri destek sistemimizle istediğiniz zaman yardım alın.',
                  color: 'bg-green-100 text-green-600'
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
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
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
                  className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2 justify-center"
                >
                  <Send className="w-5 h-5" />
                  Abone Ol
                </motion.button>
              </div>
              <p className="text-green-100/80 text-sm mt-4">✨ 50,000+ mutlu kullanıcı zaten abone!</p>
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
                  <span className="px-3 py-1 bg-green-500/20 text-blue-400 rounded-full text-xs font-medium flex items-center gap-1">
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
                    { icon: Facebook, href: '#', color: 'hover:text-green-400' },
                    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                    { icon: Youtube, href: '#', color: 'hover:text-red-400' },
                    { icon: Linkedin, href: '#', color: 'hover:text-green-500' }
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