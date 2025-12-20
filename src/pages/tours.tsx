import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Star, Calendar, Users, Clock, Camera, Heart, Filter, Plane, Car, Utensils, Shield, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const tours = [
  {
    id: 1,
    name: 'İstanbul Büyülü Şehir Turu',
    location: 'İstanbul, Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop',
    price: '₺450',
    originalPrice: '₺650',
    rating: 4.8,
    reviews: 2847,
    duration: '8 saat',
    groupSize: '15 kişi',
    category: 'cultural',
    highlights: ['Ayasofya', 'Topkapı Sarayı', 'Kapalıçarşı', 'Sultanahmet'],
    includes: ['Rehber', 'Ulaşım', 'Müze Biletleri', 'Öğle Yemeği'],
    description: 'İstanbul&apos;un tarihi yarımadasında unutulmaz bir gün geçirin.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca']
  },
  {
    id: 2,
    name: 'Kapadokya Balon ve Doğa Turu',
    location: 'Nevşehir, Türkiye',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=600&h=400&fit=crop',
    price: '₺1,200',
    originalPrice: '₺1,500',
    rating: 4.9,
    reviews: 1856,
    duration: '2 gün',
    groupSize: '12 kişi',
    category: 'adventure',
    highlights: ['Sıcak Hava Balonu', 'Göreme Açık Hava Müzesi', 'Derinkuyu', 'Avanos'],
    includes: ['Balon Turu', 'Konaklama', 'Kahvaltı', 'Rehber', 'Ulaşım'],
    description: 'Peri bacalarının üzerinde unutulmaz balon deneyimi yaşayın.',
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce']
  },
  {
    id: 3,
    name: 'Antalya Antik Kentler Turu',
    location: 'Antalya, Türkiye',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop',
    price: '₺320',
    originalPrice: '₺420',
    rating: 4.7,
    reviews: 1234,
    duration: '6 saat',
    groupSize: '20 kişi',
    category: 'cultural',
    highlights: ['Aspendos', 'Perge', 'Side', 'Kaleiçi'],
    includes: ['Rehber', 'Ulaşım', 'Müze Biletleri'],
    description: 'Akdeniz&apos;in antik hazinelerini keşfedin.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Rusça']
  },
  {
    id: 4,
    name: 'Fethiye Yamaç Paraşütü ve Tekne Turu',
    location: 'Fethiye, Türkiye',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0deeb?w=600&h=400&fit=crop',
    price: '₺850',
    originalPrice: '₺1,000',
    rating: 4.8,
    reviews: 967,
    duration: '1 gün',
    groupSize: '10 kişi',
    category: 'adventure',
    highlights: ['Babadağ Paraşütü', 'Ölüdeniz', '12 Adalar', 'Butterfly Valley'],
    includes: ['Paraşüt Uçuşu', 'Tekne Turu', 'Öğle Yemeği', 'Güvenlik Ekipmanları'],
    description: 'Gökyüzünden ve denizden Fethiye&apos;nin güzelliklerini görün.',
    difficulty: 'Zor',
    languages: ['Türkçe', 'İngilizce']
  },
  {
    id: 5,
    name: 'Pamukkale ve Hierapolis Günübirlik',
    location: 'Denizli, Türkiye',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop',
    price: '₺280',
    originalPrice: '₺350',
    rating: 4.6,
    reviews: 1567,
    duration: '8 saat',
    groupSize: '25 kişi',
    category: 'nature',
    highlights: ['Beyaz Travertenler', 'Hierapolis Antik Kenti', 'Antik Havuz', 'Kleopatra Havuzu'],
    includes: ['Rehber', 'Ulaşım', 'Giriş Biletleri', 'Öğle Yemeği'],
    description: 'Doğanın beyaz mucizesi Pamukkale&apos;yi keşfedin.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca']
  },
  {
    id: 6,
    name: 'Çeşme Alaçatı Gastronomi Turu',
    location: 'İzmir, Türkiye',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    price: '₺580',
    originalPrice: '₺750',
    rating: 4.7,
    reviews: 876,
    duration: '1 gün',
    groupSize: '8 kişi',
    category: 'culinary',
    highlights: ['Alaçatı Çarşısı', 'Şarap Tadımı', 'Geleneksel Lezzetler', 'Rüzgar Çiftlikleri'],
    includes: ['Gastronomi Rehberi', 'Yemek Tadımları', 'Şarap Tadımı', 'Ulaşım'],
    description: 'Ege&apos;nin lezzet durağında eşsiz bir gastronomi deneyimi.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce']
  },
  {
    id: 7,
    name: 'Trabzon Doğa ve Kültür Turu',
    location: 'Trabzon, Türkiye',
    image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=600&h=400&fit=crop',
    price: '₺650',
    originalPrice: '₺800',
    rating: 4.5,
    reviews: 654,
    duration: '2 gün',
    groupSize: '15 kişi',
    category: 'nature',
    highlights: ['Uzungöl', 'Sumela Manastırı', 'Ayder Yaylası', 'Çay Bahçeleri'],
    includes: ['Konaklama', 'Rehber', 'Ulaşım', 'Kahvaltı'],
    description: 'Karadeniz&apos;in yeşil cennetinde doğayla buluşun.',
    difficulty: 'Orta',
    languages: ['Türkçe']
  },
  {
    id: 8,
    name: 'Bodrum Antik Yolculuk',
    location: 'Muğla, Türkiye',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=600&h=400&fit=crop',
    price: '₺420',
    originalPrice: '₺550',
    rating: 4.6,
    reviews: 1098,
    duration: '6 saat',
    groupSize: '18 kişi',
    category: 'cultural',
    highlights: ['Bodrum Kalesi', 'Halikarnas Mozolesi', 'Marina', 'Amphitiyatro'],
    includes: ['Rehber', 'Müze Biletleri', 'Ulaşım'],
    description: 'Antik Halikarnas&apos;ın izlerinde tarihi keşif.',
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce', 'Almanca']
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: MapPin },
  { id: 'cultural', name: 'Kültürel', icon: Camera },
  { id: 'adventure', name: 'Macera', icon: Shield },
  { id: 'nature', name: 'Doğa', icon: MapPin },
  { id: 'culinary', name: 'Gastronomi', icon: Utensils },
];

const difficulties = ['Tümü', 'Kolay', 'Orta', 'Zor'];
const durations = ['Tümü', '1 gün altı', '1 gün', '2+ gün'];

export default function Tours() {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');
  const [selectedDuration, setSelectedDuration] = useState('Tümü');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState('popularity');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Tümü' || tour.difficulty === selectedDifficulty;
    const matchesDuration = selectedDuration === 'Tümü' || 
      (selectedDuration === '1 gün altı' && tour.duration.includes('saat')) ||
      (selectedDuration === '1 gün' && tour.duration === '1 gün') ||
      (selectedDuration === '2+ gün' && (tour.duration.includes('2') || tour.duration.includes('3')));
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default: // popularity
        return b.reviews - a.reviews;
    }
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

  const handleAddToCart = (tour: any) => {
    const priceValue = parseInt(tour.price.replace(/[^\d]/g, ''));

    addItem({
      id: `tour-${tour.id}`,
      type: 'tour',
      title: tour.name,
      description: tour.description,
      image: tour.image,
      price: priceValue,
      originalPrice: tour.originalPrice ? parseInt(tour.originalPrice.replace(/[^\d]/g, '')) : undefined,
      currency: 'TRY',
      quantity: 1,
      location: tour.location,
      rating: tour.rating,
      bookingDetails: {
        duration: tour.duration,
        groupSize: tour.groupSize,
        difficulty: tour.difficulty
      }
    });

    setToastMessage(`${tour.name} sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Orta': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Zor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <Head>
        <title>Turlar - Ailydian Travel</title>
        <meta name="description" content="Profesyonel rehberlik eşliğinde unutulmaz tur deneyimleri." />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'white' }}>
        {/* Header */}
        <div className="shadow-sm border-b" style={{ backgroundColor: 'white', borderBottomColor: '#0ea5e9' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold" style={{ color: '#0ea5e9' }}>
                  Ailydian Travel
                </Link>
              </div>
              <Link
                href="/"
                className="ocean-button-secondary flex items-center"
              >
                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Ana Sayfa&apos;ya Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-white py-16" style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #4682B4 50%, #0ea5e9 100%)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Camera className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rehberli Turlar
            </h1>
            <p className="text-xl mb-8" style={{ color: '#f0f9ff' }}>
              Profesyonel rehberlik eşliğinde unutulmaz deneyimler
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tur ara..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" style={{ border: '1px solid #0ea5e9' }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
                  Kategori
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category.id
                            ? 'text-white'
                            : 'text-gray-700 hover:text-white'
                        }`}
                        style={{
                          backgroundColor: selectedCategory === category.id ? '#0ea5e9' : '#e5f3ff'
                        }}
                      >
                        <IconComponent className="h-3 w-3 mr-1" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
                  Zorluk
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2"
                  style={{ border: '1px solid #0ea5e9', color: '#1e40af' }}
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
                  Süre
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2"
                  style={{ border: '1px solid #0ea5e9', color: '#1e40af' }}
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
                  Sırala
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2"
                  style={{ border: '1px solid #0ea5e9', color: '#1e40af' }}
                >
                  <option value="popularity">Popülerlik</option>
                  <option value="price-low">Fiyat (Düşük)</option>
                  <option value="price-high">Fiyat (Yüksek)</option>
                  <option value="rating">Puan</option>
                  <option value="duration">Süre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300" style={{ border: '1px solid #e5f3ff' }}>
                <div className="relative">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <button
                    onClick={() => toggleFavorite(tour.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(tour.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Discount Badge */}
                  {tour.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      %{Math.round((parseInt(tour.originalPrice.replace(/[^\d]/g, '')) - parseInt(tour.price.replace(/[^\d]/g, ''))) / parseInt(tour.originalPrice.replace(/[^\d]/g, '')) * 100)} İndirim
                    </div>
                  )}

                  {/* Difficulty Badge */}
                  <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tour.difficulty)}`}>
                    {tour.difficulty}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                      {tour.name}
                    </h3>
                    <div className="flex items-center ml-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {tour.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tour.location}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {tour.description}
                  </p>

                  {/* Tour Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      {tour.groupSize}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Öne Çıkanlar:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                      {tour.highlights.length > 2 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{tour.highlights.length - 2} daha
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Dahil Olanlar:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.includes.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          ✓ {item}
                        </span>
                      ))}
                      {tour.includes.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{tour.includes.length - 3} daha
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        {tour.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {tour.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold text-emerald-600">
                          {tour.price}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {tour.reviews.toLocaleString()} değerlendirme
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(tour)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Sepete Ekle
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedTours.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Aradığınız kriterlerde tur bulunamadı
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Arama kriterlerinizi değiştirerek tekrar deneyin
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('Tümü');
                  setSelectedDuration('Tümü');
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}