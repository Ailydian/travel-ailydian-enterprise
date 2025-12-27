import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowRight, MapPin, Star, Clock, Users, Calendar, Filter, Heart, Zap, Mountain, Waves, Camera, Plane, Car, Utensils, TreePine, ShoppingCart, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AdvancedFilters from '../components/search/AdvancedFilters';
import FilterChips from '../components/search/FilterChips';
import { useFilters } from '../hooks/useFilters';
import { ActivityFilters, DEFAULT_ACTIVITY_FILTERS } from '../types/filters';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { BookingFooter } from '../components/layout/BookingFooter';

const activities = [
{
  id: 1,
  name: 'İstanbul Boğaz Turu',
  location: 'İstanbul, Türkiye',
  image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop',
  price: '₺180',
  originalPrice: '₺220',
  rating: 4.7,
  reviews: 2156,
  duration: '3 saat',
  category: 'cruise',
  difficulty: 'Kolay',
  groupSize: '50 kişi',
  ageLimit: 'Tüm yaşlar',
  includes: ['Rehber', 'İçecek İkramı', 'Fotoğraf Servisi'],
  description: 'Boğaz&apos;ın eşsiz manzarasında unutulmaz bir deneyim yaşayın.',
  highlights: ['Dolmabahçe Sarayı', 'Ortaköy', 'Bebek', 'Anadolu Hisarı'],
  bestTime: 'Nisan-Ekim',
  languages: ['Türkçe', 'İngilizce']
},
{
  id: 2,
  name: 'Kapadokya Sıcak Hava Balonu',
  location: 'Nevşehir, Türkiye',
  image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=600&h=400&fit=crop',
  price: '₺750',
  originalPrice: '₺950',
  rating: 4.9,
  reviews: 3421,
  duration: '1 saat',
  category: 'adventure',
  difficulty: 'Orta',
  groupSize: '20 kişi',
  ageLimit: '6+ yaş',
  includes: ['Uçuş Sertifikası', 'Şampanya', 'Transfer', 'Sigorta'],
  description: 'Peri bacaları üzerinde büyülü bir uçuş deneyimi.',
  highlights: ['Güneş Doğumu', 'Göreme Vadisi', 'Peri Bacaları', 'Love Valley'],
  bestTime: 'Mart-Kasım',
  languages: ['Türkçe', 'İngilizce']
},
{
  id: 3,
  name: 'Fethiye Yamaç Paraşütü',
  location: 'Fethiye, Türkiye',
  image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0deeb?w=600&h=400&fit=crop',
  price: '₺450',
  originalPrice: '₺550',
  rating: 4.8,
  reviews: 1876,
  duration: '4 saat',
  category: 'adventure',
  difficulty: 'Zor',
  groupSize: '8 kişi',
  ageLimit: '14+ yaş',
  includes: ['Eğitim', 'Ekipman', 'Video Çekimi', 'Sertifika'],
  description: 'Babadağ&apos;dan Ölüdeniz&apos;e nefes kesen uçuş.',
  highlights: ['Babadağ Zirvesi', 'Ölüdeniz Plajı', 'Pilot Eşliği', 'HD Video'],
  bestTime: 'Nisan-Ekim',
  languages: ['Türkçe', 'İngilizce', 'Rusça']
},
{
  id: 4,
  name: 'Antalya Rafting Macerası',
  location: 'Antalya, Türkiye',
  image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
  price: '₺320',
  originalPrice: '₺400',
  rating: 4.6,
  reviews: 1234,
  duration: '6 saat',
  category: 'adventure',
  difficulty: 'Orta',
  groupSize: '12 kişi',
  ageLimit: '12+ yaş',
  includes: ['Güvenlik Ekipmanları', 'Öğle Yemeği', 'Transfer', 'Rehber'],
  description: 'Köprüçay&apos;da adrenalin dolu rafting deneyimi.',
  highlights: ['Köprüçay Nehri', 'Doğal Havuzlar', 'Zipline', 'Barbekü'],
  bestTime: 'Mart-Kasım',
  languages: ['Türkçe', 'İngilizce']
},
{
  id: 5,
  name: 'Bodrum Tekne Turu',
  location: 'Bodrum, Türkiye',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=600&h=400&fit=crop',
  price: '₺250',
  originalPrice: '₺300',
  rating: 4.5,
  reviews: 987,
  duration: '8 saat',
  category: 'cruise',
  difficulty: 'Kolay',
  groupSize: '30 kişi',
  ageLimit: 'Tüm yaşlar',
  includes: ['Öğle Yemeği', 'İçecekler', 'Müzik', 'Snorkelling'],
  description: 'Bodrum koylarında mavi yolculuk.',
  highlights: ['Kara Ada', 'Tavşan Burnu', 'Aquarium Koyu', 'Yalıçiftlik'],
  bestTime: 'Mayıs-Ekim',
  languages: ['Türkçe', 'İngilizce']
},
{
  id: 6,
  name: 'Çeşme Rüzgar Sörfü Kursu',
  location: 'Çeşme, Türkiye',
  image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop',
  price: '₺380',
  originalPrice: '₺450',
  rating: 4.7,
  reviews: 654,
  duration: '4 saat',
  category: 'water-sports',
  difficulty: 'Orta',
  groupSize: '6 kişi',
  ageLimit: '10+ yaş',
  includes: ['Eğitmen', 'Ekipman', 'Wetsuit', 'Sertifika'],
  description: 'Ege&apos;nin rüzgarında sörfün keyfini çıkarın.',
  highlights: ['Alaçatı Rüzgarı', 'Profesyonel Eğitim', 'Modern Ekipman', 'Güvenli Bölge'],
  bestTime: 'Mayıs-Ekim',
  languages: ['Türkçe', 'İngilizce']
},
{
  id: 7,
  name: 'Pamukkale Termal Wellness',
  location: 'Denizli, Türkiye',
  image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop',
  price: '₺220',
  originalPrice: '₺280',
  rating: 4.4,
  reviews: 1567,
  duration: '5 saat',
  category: 'wellness',
  difficulty: 'Kolay',
  groupSize: '20 kişi',
  ageLimit: 'Tüm yaşlar',
  includes: ['Termal Havuz', 'Masaj', 'Sağlıklı Yemek', 'Rehber'],
  description: 'Doğal termal sularla şifa bulun.',
  highlights: ['Beyaz Travertenler', 'Kleopatra Havuzu', 'Hierapolis', 'Termal Masaj'],
  bestTime: 'Mart-Kasım',
  languages: ['Türkçe', 'İngilizce', 'Almanca']
},
{
  id: 8,
  name: 'Trabzon Dağ Bisikleti Turu',
  location: 'Trabzon, Türkiye',
  image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=600&h=400&fit=crop',
  price: '₺180',
  originalPrice: '₺230',
  rating: 4.6,
  reviews: 432,
  duration: '5 saat',
  category: 'cycling',
  difficulty: 'Zor',
  groupSize: '10 kişi',
  ageLimit: '16+ yaş',
  includes: ['Bisiklet', 'Kask', 'Rehber', 'Su'],
  description: 'Karadeniz&apos;in yeşil yaylalarında bisiklet macerası.',
  highlights: ['Uzungöl', 'Çay Bahçeleri', 'Dağ Manzarası', 'Yerel Kültür'],
  bestTime: 'Mayıs-Ekim',
  languages: ['Türkçe']
},
{
  id: 9,
  name: 'İzmir Gastronomi Turu',
  location: 'İzmir, Türkiye',
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
  price: '₺280',
  originalPrice: '₺350',
  rating: 4.8,
  reviews: 876,
  duration: '4 saat',
  category: 'food',
  difficulty: 'Kolay',
  groupSize: '12 kişi',
  ageLimit: 'Tüm yaşlar',
  includes: ['Tatma Menüsü', 'İçecekler', 'Gastronomi Rehberi', 'Tarif Kitabı'],
  description: 'Ege mutfağının lezzetlerini keşfedin.',
  highlights: ['Kemeraltı Çarşısı', 'Boyoz', 'Kumru', 'Lokma'],
  bestTime: 'Tüm yıl',
  languages: ['Türkçe', 'İngilizce']
},
{
  id: 10,
  name: 'Ankara Müze Turu',
  location: 'Ankara, Türkiye',
  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
  price: '₺120',
  originalPrice: '₺150',
  rating: 4.3,
  reviews: 543,
  duration: '6 saat',
  category: 'cultural',
  difficulty: 'Kolay',
  groupSize: '25 kişi',
  ageLimit: 'Tüm yaşlar',
  includes: ['Müze Biletleri', 'Rehber', 'Kahve Molası', 'Broşür'],
  description: 'Başkentin kültürel hazinelerini keşfedin.',
  highlights: ['Anadolu Medeniyetleri', 'Anıtkabir', 'Etnografya Müzesi', 'Atatürk Orman Çiftliği'],
  bestTime: 'Tüm yıl',
  languages: ['Türkçe', 'İngilizce']
}];


const categories = [
{ id: 'all', name: 'Tümü', icon: Zap },
{ id: 'adventure', name: 'Macera', icon: Mountain },
{ id: 'cruise', name: 'Tekne Turu', icon: Waves },
{ id: 'water-sports', name: 'Su Sporları', icon: Waves },
{ id: 'wellness', name: 'Wellness', icon: Heart },
{ id: 'cycling', name: 'Bisiklet', icon: TreePine },
{ id: 'food', name: 'Gastronomi', icon: Utensils },
{ id: 'cultural', name: 'Kültür', icon: Camera }];


const difficulties = ['Tümü', 'Kolay', 'Orta', 'Zor'];
const durations = ['Tümü', '1-3 saat', '4-6 saat', '6+ saat'];

export default function Activities() {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');
  const [selectedDuration, setSelectedDuration] = useState('Tümü');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState('popularity');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filters hook
  const {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    activeFilterCount,
    isDefaultFilters
  } = useFilters<ActivityFilters>({ type: 'activity', syncWithUrl: true });

  // Cart handler functions
  const handleAddToCart = (activity: typeof activities[0]) => {
    const priceValue = parseFloat(activity.price.replace('₺', '').replace(',', ''));
    addItem({
      id: `activity-${activity.id}`,
      type: 'activity',
      title: activity.name,
      description: activity.description,
      image: activity.image,
      price: priceValue,
      originalPrice: activity.originalPrice ? parseFloat(activity.originalPrice.replace('₺', '').replace(',', '')) : undefined,
      currency: 'TRY',
      quantity: 1,
      location: activity.location,
      rating: activity.rating,
      duration: activity.duration,
      isRefundable: true,
      cancellationPolicy: 'Ücretsiz iptal: 24 saat öncesine kadar'
    });
    setToastMessage(`${activity.name} sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReserve = (activity: typeof activities[0]) => {
    handleAddToCart(activity);
    setTimeout(() => router.push('/cart'), 500);
  };

  // Filter and sort activities with advanced filters
  const filteredAndSortedActivities = useMemo(() => {
    let filtered = activities.filter((activity) => {
      // Search query
      const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.highlights.some((highlight) => highlight.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Price filter
      const price = parseFloat(activity.price.replace('₺', '').replace(',', ''));
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }

      // Category filter (legacy + advanced)
      const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
      const matchesAdvancedCategory = filters.categories.length === 0 ||
      filters.categories.includes(activity.category as any);

      if (!matchesCategory || !matchesAdvancedCategory) return false;

      // Difficulty filter (legacy + advanced)
      const difficultyMap: any = { 'Kolay': 'easy', 'Orta': 'moderate', 'Zor': 'challenging' };
      const activityDifficultyEn = difficultyMap[activity.difficulty] || activity.difficulty;

      const matchesDifficulty = selectedDifficulty === 'Tümü' || activity.difficulty === selectedDifficulty;
      const matchesAdvancedDifficulty = filters.difficultyLevel.length === 0 ||
      filters.difficultyLevel.includes(activityDifficultyEn);

      if (!matchesDifficulty || !matchesAdvancedDifficulty) return false;

      // Duration filter (legacy)
      const matchesDuration = selectedDuration === 'Tümü' ||
      selectedDuration === '1-3 saat' && (activity.duration.includes('1') || activity.duration.includes('3')) ||
      selectedDuration === '4-6 saat' && (activity.duration.includes('4') || activity.duration.includes('5') || activity.duration.includes('6')) ||
      selectedDuration === '6+ saat' && parseInt(activity.duration) >= 6;

      if (!matchesDuration) return false;

      return true;
    });

    // Sort activities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default: // popularity
          return b.reviews - a.reviews;
      }
    });

    return filtered;
  }, [activities, filters, searchQuery, selectedCategory, selectedDifficulty, selectedDuration, sortBy]);

  // Handle filter chip removal
  const handleRemoveFilter = (filterKey: string, value?: any) => {
    if (filterKey === 'priceRange' || filterKey === 'duration') {
      const defaultFilters = DEFAULT_ACTIVITY_FILTERS;
      updateFilter(filterKey as keyof ActivityFilters, defaultFilters[filterKey] as any);
    } else if (value !== undefined) {
      const currentValues = filters[filterKey as keyof ActivityFilters] as any[];
      updateFilter(
        filterKey as keyof ActivityFilters,
        currentValues.filter((v: any) => v !== value) as any
      );
    }
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay':return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Orta':return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Zor':return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:return 'bg-white/10 text-gray-100 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find((cat) => cat.id === category);
    return categoryObj ? categoryObj.icon : Zap;
  };

  return (
    <>
      <Head>
        <title>Aktiviteler - LyDian Travel</title>
        <meta name="description" content="Heyecan verici aktiviteler ve deneyimler. Maceradan wellness&apos;a kadar." />
      </Head>

      <FuturisticHeader />

      <div className="min-h-screen" style={{ backgroundColor: 'white' }}>

        {/* Hero Section */}
        <div className="text-lydian-text-inverse py-16" style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #4682B4 50%, #0ea5e9 100%)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Zap className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Heyecan Verici Aktiviteler
            </h1>
            <p className="text-xl mb-8" style={{ color: '#f0f9ff' }}>
              Maceradan wellness&apos;a, kültürden adrenaline kadar
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Zap className="absolute left-3 top-3 h-5 w-5 text-lydian-text-muted" />
              <input
                type="text"
                placeholder="Aktivite ara..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-lydian-text-inverse focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Header */}
          <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse">
                {filteredAndSortedActivities.length} Aktivite Bulundu
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-lydian-border-medium rounded-lg hover:bg-lydian-glass-dark transition-colors relative">

                <SlidersHorizontal className="w-4 h-4" />
                Gelişmiş Filtreler
                {activeFilterCount > 0 &&
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-orange-500 text-lydian-text-inverse rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                }
              </button>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 &&
            <div className="mb-4">
                <FilterChips
                type="activity"
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={resetFilters} />

              </div>
            }
          </div>

          {/* Quick Filters */}
          <div className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                  Kategori
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id ?
                        'bg-orange-500 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-200 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600'}`
                        }>

                        <IconComponent className="h-3 w-3 mr-1" />
                        {category.name}
                      </button>);

                  })}
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full mt-2 px-3 py-2 bg-lydian-bg-hover dark:bg-gray-700 border border-lydian-border-medium dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-lydian-border md:hidden">

                  {categories.map((category) =>
                  <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                  Zorluk
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-lydian-bg-hover dark:bg-gray-700 border border-lydian-border-medium dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-lydian-border">

                  {difficulties.map((difficulty) =>
                  <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  )}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                  Süre
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-lydian-bg-hover dark:bg-gray-700 border border-lydian-border-medium dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-lydian-border">

                  {durations.map((duration) =>
                  <option key={duration} value={duration}>
                      {duration}
                    </option>
                  )}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-lydian-text-muted dark:text-lydian-text-dim mb-2">
                  Sırala
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-lydian-bg-hover dark:bg-gray-700 border border-lydian-border-medium dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-lydian-border">

                  <option value="popularity">Popülerlik</option>
                  <option value="price-low">Fiyat (Düşük)</option>
                  <option value="price-high">Fiyat (Yüksek)</option>
                  <option value="rating">Puan</option>
                  <option value="duration">Süre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Activities Grid with Filters */}
          <div className="flex gap-6">
            {/* Advanced Filters Sidebar */}
            <AdvancedFilters
              type="activity"
              filters={filters}
              onFilterChange={updateFilters}
              onReset={resetFilters}
              onClose={() => setShowFilters(false)}
              isOpen={showFilters}
              activeFilterCount={activeFilterCount} />


            {/* Activities Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedActivities.map((activity) => {
                  const CategoryIcon = getCategoryIcon(activity.category);
                  return (
                    <div key={activity.id} className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <Image
                          src={activity.image}
                          alt={activity.name}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />

                    
                    <button
                          onClick={() => toggleFavorite(activity.id)}
                          className="absolute top-3 right-3 p-2 bg-lydian-bg/90 rounded-full hover:bg-lydian-glass-dark transition-colors shadow-lg">

                      <Heart
                            className={`h-5 w-5 ${
                            favorites.has(activity.id) ?
                            'text-red-500 fill-current' :
                            'text-gray-300'}`
                            } />

                    </button>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-orange-500 text-lydian-text-inverse px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categories.find((cat) => cat.id === activity.category)?.name}
                    </div>

                    {/* Discount Badge */}
                    {activity.originalPrice &&
                        <div className="absolute bottom-3 right-3 bg-lydian-error text-lydian-text-inverse px-2 py-1 rounded-full text-sm font-bold">
                        %{Math.round((parseInt(activity.originalPrice.replace(/[^\d]/g, '')) - parseInt(activity.price.replace(/[^\d]/g, ''))) / parseInt(activity.originalPrice.replace(/[^\d]/g, '')) * 100)} İndirim
                      </div>
                        }

                    {/* Difficulty Badge */}
                    <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse line-clamp-2 flex-1">
                        {activity.name}
                      </h3>
                      <div className="flex items-center ml-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">
                          {activity.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-lydian-text-dim dark:text-lydian-text-muted mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {activity.location}
                    </p>

                    <p className="text-sm text-lydian-text-dim dark:text-lydian-text-muted mb-4">
                      {activity.description}
                    </p>

                    {/* Activity Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted">
                        <Clock className="h-4 w-4 mr-1" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted">
                        <Users className="h-4 w-4 mr-1" />
                        {activity.groupSize}
                      </div>
                      <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted">
                        <Calendar className="h-4 w-4 mr-1" />
                        {activity.ageLimit}
                      </div>
                      <div className="flex items-center text-lydian-text-dim dark:text-lydian-text-muted">
                        <span className="text-lydian-success mr-1">🌟</span>
                        {activity.bestTime}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-lydian-text-muted dark:text-lydian-text-dim mb-2">Öne Çıkanlar:</h4>
                      <div className="flex flex-wrap gap-1">
                        {activity.highlights.slice(0, 2).map((highlight) =>
                            <span
                              key={highlight}
                              className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full">

                            {highlight}
                          </span>
                            )}
                        {activity.highlights.length > 2 &&
                            <span className="text-xs text-lydian-text-muted px-2 py-1">
                            +{activity.highlights.length - 2} daha
                          </span>
                            }
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-lydian-text-muted dark:text-lydian-text-dim mb-2">Dahil Olanlar:</h4>
                      <div className="flex flex-wrap gap-1">
                        {activity.includes.slice(0, 3).map((item) =>
                            <span
                              key={item}
                              className="px-2 py-1 bg-lydian-success-light dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">

                            ✓ {item}
                          </span>
                            )}
                        {activity.includes.length > 3 &&
                            <span className="text-xs text-lydian-text-muted px-2 py-1">
                            +{activity.includes.length - 3} daha
                          </span>
                            }
                      </div>
                    </div>

                    <div className="border-t border-lydian-border-light pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            {activity.originalPrice &&
                                <span className="text-sm text-lydian-text-muted line-through">
                                {activity.originalPrice}
                              </span>
                                }
                            <span className="text-xl font-bold text-orange-600">
                              {activity.price}
                            </span>
                          </div>
                          <span className="text-xs text-lydian-text-muted">
                            {activity.reviews.toLocaleString()} değerlendirme
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                              onClick={() => handleAddToCart(activity)}
                              className="flex-1 px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">

                          <ShoppingCart className="w-4 h-4" />
                          Sepete Ekle
                        </button>
                        <button
                              onClick={() => handleReserve(activity)}
                              className="flex-1 px-4 py-2 bg-orange-500 text-lydian-text-inverse rounded-lg font-semibold hover:bg-orange-600 transition-all hover:scale-105 active:scale-95">

                          Rezervasyon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>);

                })}
              </div>

              {/* No Results */}
              {filteredAndSortedActivities.length === 0 &&
              <div className="text-center py-16">
              <Zap className="h-24 w-24 text-lydian-text-dim mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-4">
                Aradığınız kriterlerde aktivite bulunamadı
              </h2>
              <p className="text-lydian-text-dim dark:text-lydian-text-muted mb-8">
                Arama kriterlerinizi değiştirerek tekrar deneyin
              </p>
              <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('Tümü');
                    setSelectedDuration('Tümü');
                  }}
                  className="bg-orange-500 text-lydian-text-inverse px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">

                Filtreleri Temizle
              </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast &&
      <div
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-lydian-text-inverse px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">

          <CheckCircle className="w-6 h-6" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      }

      <BookingFooter />
    </>);

}