import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Star,
  MapPin,
  Calendar,
  Users,
  Trash2,
  Share,
  Eye,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Award,
  ShoppingCart,
  CheckCircle
} from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { useCart } from '../context/CartContext';

// Premium LyDian themed favorites with REAL data and complete images
const savedItems = [
  {
    id: 1,
    type: 'destination',
    name: 'İstanbul Tarihi Yarımada',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
    price: 2500,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 12847,
    savedDate: '2025-01-15',
    description: 'Ayasofya, Sultanahmet Camii ve Topkapı Sarayı ile büyüleyici tarih yolculuğu',
    duration: '2 gün',
    badge: 'Popüler'
  },
  {
    id: 2,
    type: 'hotel',
    name: 'Four Seasons Hotel Istanbul Sultanahmet',
    location: 'Sultanahmet, İstanbul',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
    price: 4500,
    originalPrice: 5800,
    rating: 4.9,
    reviews: 2847,
    savedDate: '2025-01-14',
    amenities: ['Spa & Wellness', 'Havuz', 'WiFi', 'Kahvaltı Dahil'],
    stars: 5,
    badge: 'Lüks'
  },
  {
    id: 3,
    type: 'destination',
    name: 'Kapadokya Balon Turu',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=800&h=600&fit=crop',
    price: 1800,
    originalPrice: 2400,
    rating: 4.9,
    reviews: 8456,
    savedDate: '2025-01-13',
    description: 'Peri bacaları üzerinde unutulmaz sıcak hava balonu deneyimi',
    duration: '1 gün',
    badge: 'Trend'
  },
  {
    id: 4,
    type: 'hotel',
    name: 'Museum Hotel Cappadocia',
    location: 'Uçhisar, Kapadokya',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=800&h=600&fit=crop',
    price: 3200,
    originalPrice: 4100,
    rating: 4.8,
    reviews: 1642,
    savedDate: '2025-01-12',
    amenities: ['Balon Turu', 'Spa', 'WiFi', 'Restoran'],
    stars: 5,
    badge: 'Özel'
  },
  {
    id: 5,
    type: 'destination',
    name: 'Antalya Antik Kentler',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop',
    price: 950,
    originalPrice: 1350,
    rating: 4.7,
    reviews: 9234,
    savedDate: '2025-01-11',
    description: 'Aspendos, Perge ve Side antik kentlerini kapsayan tarihi tur',
    duration: '6 saat',
    badge: 'Kültür'
  },
  {
    id: 6,
    type: 'hotel',
    name: 'Rixos Premium Belek',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    price: 5200,
    originalPrice: 6500,
    rating: 4.8,
    reviews: 3421,
    savedDate: '2025-01-10',
    amenities: ['All Inclusive', 'Aquapark', 'Spa', 'Plaj'],
    stars: 5,
    badge: 'Premium'
  },
  {
    id: 7,
    type: 'destination',
    name: 'Pamukkale Travertenleri',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop',
    price: 850,
    originalPrice: 1150,
    rating: 4.8,
    reviews: 6543,
    savedDate: '2025-01-09',
    description: 'Beyaz travertenler ve Hierapolis antik kenti gezisi',
    duration: '1 gün',
    badge: 'Doğa'
  },
  {
    id: 8,
    type: 'destination',
    name: 'Bodrum Koyları Tekne Turu',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&h=600&fit=crop',
    price: 1200,
    originalPrice: 1600,
    rating: 4.7,
    reviews: 4567,
    savedDate: '2025-01-08',
    description: 'Göltürkbükü, Kadırga ve gizli koyları keşif',
    duration: '8 saat',
    badge: 'Deniz'
  }
];

const filterOptions = [
  { id: 'all', name: 'Tümü', icon: Heart, count: 8 },
  { id: 'destination', name: 'Destinasyonlar', icon: MapPin, count: 5 },
  { id: 'hotel', name: 'Oteller', icon: Award, count: 3 }
];

export default function Favorites() {
  const { addItem } = useCart();
  const [favorites, setFavorites] = useState(savedItems);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredFavorites = favorites.filter(item =>
    selectedFilter === 'all' || item.type === selectedFilter
  );

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'price':
        return a.price - b.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
    setToastMessage('Favorilerden kaldırıldı');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddToCart = (item: any) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 3);

    const cartItem = {
      id: `fav-${item.id}`,
      type: item.type,
      title: item.name,
      description: item.description || `${item.name} - ${item.location || item.country}`,
      image: item.image,
      price: item.price,
      originalPrice: item.originalPrice,
      currency: 'TRY',
      quantity: 1,
      location: item.location || item.country,
      rating: item.rating,
      bookingDetails: {
        checkIn: tomorrow.toISOString().split('T')[0],
        checkOut: dayAfter.toISOString().split('T')[0],
        guests: 2
      }
    };

    addItem(cartItem);
    setToastMessage(`${item.name} sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const shareFavorite = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `${item.name} - ${item.price} TL`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
      setToastMessage('Link panoya kopyalandı!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'destination': return 'Destinasyon';
      case 'hotel': return 'Otel';
      case 'flight': return 'Uçak Bileti';
      default: return type;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors: any = {
      'Popüler': 'from-lydian-primary to-lydian-secondary',
      'Trend': 'from-lydian-neon-purple to-lydian-neon-blue',
      'Lüks': 'from-yellow-500 to-yellow-600',
      'Premium': 'from-purple-500 to-pink-500',
      'Özel': 'from-green-500 to-emerald-600',
      'Kültür': 'from-blue-500 to-cyan-500',
      'Doğa': 'from-green-500 to-teal-500',
      'Deniz': 'from-cyan-500 to-blue-600'
    };
    return colors[badge] || 'from-gray-500 to-gray-600';
  };

  return (
    <>
      <Head>
        <title>Favorilerim - LyDian Travel Premium</title>
        <meta name="description" content="Beğendiğiniz seyahat deneyimlerini kaydedin ve kolayca erişin" />
      </Head>

      <FuturisticHeader />

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-24 left-6 z-[60] flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 text-gray-200 hover:bg-gradient-to-r hover:from-lydian-primary hover:to-lydian-secondary hover:text-white hover:border-transparent transition-all duration-300 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:animate-pulse" />
        <span className="font-semibold">Ana Sayfa</span>
      </Link>

      <main className="pt-8 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section - Premium LyDian Design */}
        <section className="relative bg-gradient-to-br from-lydian-primary via-lydian-secondary to-pink-600 py-20 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <Heart className="w-20 h-20 mx-auto fill-current drop-shadow-2xl animate-pulse" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                Favorilerim
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Beğendiğiniz deneyimleri kaydedin, hayallerini gerçeğe dönüştürün
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl px-8 py-4"
                >
                  <div className="text-4xl font-bold">{favorites.length}</div>
                  <div className="text-sm uppercase tracking-wider">Favori Öğe</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl px-8 py-4"
                >
                  <div className="text-4xl font-bold">
                    {favorites.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toLocaleString('tr-TR')} ₺
                  </div>
                  <div className="text-sm uppercase tracking-wider">Toplam Tasarruf</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl px-8 py-4"
                >
                  <div className="text-4xl font-bold">
                    {(favorites.reduce((sum, item) => sum + item.rating, 0) / favorites.length).toFixed(1)}
                  </div>
                  <div className="text-sm uppercase tracking-wider">Ortalama Puan</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Sort Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedFilter === filter.id;
                return (
                  <motion.button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white shadow-neon'
                        : 'bg-white/5 text-gray-200 hover:shadow-xl border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{filter.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/30' : 'bg-gray-100'
                    }`}>
                      {filter.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-lydian-primary focus:border-transparent shadow-sm hover:shadow-md transition-all"
              >
                <option value="date">Eklenme Tarihi</option>
                <option value="name">İsim</option>
                <option value="price">Fiyat (Düşük-Yüksek)</option>
                <option value="rating">Puan (Yüksek-Düşük)</option>
              </select>
            </div>
          </div>

          {/* Favorites Grid */}
          {sortedFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedFavorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-transparent rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge */}
                    {item.badge && (
                      <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getBadgeColor(item.badge)} shadow-lg flex items-center gap-1`}>
                        <Sparkles className="w-3 h-3" />
                        {item.badge}
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-sm">
                      {getItemTypeLabel(item.type)}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-16 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => shareFavorite(item)}
                        className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white/5 transition-colors shadow-lg"
                        title="Paylaş"
                      >
                        <Share className="w-4 h-4 text-blue-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFavorite(item.id)}
                        className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white/5 transition-colors shadow-lg"
                        title="Favorilerden Çıkar"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <div className="flex items-center gap-2">
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              {item.originalPrice.toLocaleString('tr-TR')} ₺
                            </span>
                          )}
                          <span className="text-sm font-bold text-lydian-primary">
                            {item.price.toLocaleString('tr-TR')} ₺
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white line-clamp-1 flex-1">
                        {item.name}
                      </h3>
                      {item.rating && (
                        <div className="flex items-center gap-1 ml-2 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-bold text-white">{item.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Location/Country */}
                    <div className="flex items-center gap-1.5 text-gray-300 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{item.location || item.country}</span>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Amenities (for hotels) */}
                    {item.amenities && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.amenities.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-medium rounded-lg"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.savedDate).toLocaleDateString('tr-TR')}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Sepete Ekle
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart className="w-32 h-32 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedFilter === 'all' ? 'Henüz favori eklemediniz' : 'Bu kategoride favori bulunamadı'}
              </h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto text-lg">
                Beğendiğiniz destinasyonları ve otelleri favorilerinize ekleyerek
                daha sonra kolayca erişebilirsiniz.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg"
              >
                Keşfetmeye Başla
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </section>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
