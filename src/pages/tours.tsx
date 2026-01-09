import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Star,
  Calendar,
  Users,
  Clock,
  Camera,
  Heart,
  Filter,
  Plane,
  Car,
  Utensils,
  Shield,
  ShoppingCart,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
  Zap,
  Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import dynamic from 'next/dynamic';
import { ModernHeader } from '../components/layout/ModernHeader';
import { allComprehensiveTours as importedComprehensiveTours } from '../data/marmaris-bodrum-cesme-tours';
import { antalyaTours } from '../data/antalya-tours';
import { greeceTours } from '../data/greece-tours';
import { cyprusTours } from '../data/cyprus-tours';
import CountryFilterWidget from '../components/filters/CountryFilterWidget';
// Dynamic imports to prevent SSR issues - Import directly from component files with loading fallbacks
const NeoHero = dynamic(() => import('../components/neo-glass/NeoHero'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-pulse" />
});
const FuturisticCard = dynamic(() => import('../components/neo-glass/FuturisticCard'), {
  ssr: false,
  loading: () => <div className="bg-white/5 rounded-2xl h-96 animate-pulse" />
});
const FuturisticButton = dynamic(() => import('../components/neo-glass/FuturisticButton'), {
  ssr: false,
  loading: () => <div className="h-12 w-32 bg-white/10 rounded-xl animate-pulse" />
});
const NeoSection = dynamic(() => import('../components/neo-glass/NeoSection'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 animate-pulse" />
});
const HorizontalScrollSection = dynamic(() => import('../components/scroll/HorizontalScrollSection'), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
});
import { AntalyaToursAIAnswer } from '../components/seo/AIAnswerBlock';

// ==================== TYPE DEFINITIONS ====================
/**
 * Tour Item Interface - Type-safe tour data structure
 * Used throughout the tours page for proper TypeScript validation
 */
interface TourItem {
  id: number;
  name: string;
  slug: string;
  location: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  category: string;
  type: string;
  highlights: string[];
  includes: string[];
  description: string;
  difficulty: string;
  languages: string[];
  badge?: string;
  region: {
    city: string;
    country: string;
  };
}

// Antalya Tours (16 tours with competitive pricing)
const antalyaToursFormatted = antalyaTours.map((tour) => ({
  id: tour.id,
  name: tour.name,
  slug: tour.slug,
  location: `${tour.region}, Türkiye`,
  image: tour.images[0],
  price: tour.pricing.travelLyDian,
  originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100)),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.maxGroupSize} kişi`,
  category: tour.category,
  type: 'Günlük Tur',
  highlights: tour.highlights.slice(0, 4),
  includes: tour.included,
  description: tour.description,
  difficulty: tour.difficulty,
  languages: ['Türkçe', 'İngilizce', 'Rusça', 'Almanca', 'Arapça', 'Fransızca'],
  badge: tour.pricing.savingsPercentage >= 15 ? 'İndirim' : undefined,
  region: { city: tour.region, country: 'turkey' }
}));

// Greece Tours (2+ tours with competitive pricing, 8-language support)
const greeceToursFormatted = greeceTours.map((tour) => ({
  id: tour.id,
  name: tour.name.tr, // Default to Turkish, will be handled by i18n later
  slug: tour.slug,
  location: `${tour.city}, Yunanistan`,
  image: tour.images?.hero || tour.images?.gallery?.[0] || 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800',
  price: Math.round(tour.pricing.travelLyDian * 35), // Convert EUR to TRY (approx €1 = 35 TRY)
  originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100) * 35),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.groupSize.max} kişi`,
  category: tour.category,
  type: 'Günlük Tur',
  highlights: (tour.highlights?.tr || []).slice(0, 4),
  includes: tour.included?.tr || [],
  description: tour.shortDescription?.tr || tour.name.tr,
  difficulty: tour.difficulty?.tr || 'Orta',
  languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça', 'Arapça', 'Yunanca', 'Fransızca', 'Farsça'],
  badge: tour.pricing.savingsPercentage >= 10 ? 'İndirim' : undefined,
  region: { city: tour.city, country: 'greece' }
}));

// Cyprus Tours (2+ tours with competitive pricing, 8-language support)
const cyprusToursFormatted = cyprusTours.map((tour) => ({
  id: tour.id,
  name: tour.name.tr,
  slug: tour.slug,
  location: `${tour.city}, Kıbrıs`,
  image: tour.images?.hero || tour.images?.gallery?.[0] || 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800',
  price: Math.round(tour.pricing.travelLyDian * 35), // Convert EUR to TRY
  originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100) * 35),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.groupSize.max} kişi`,
  category: tour.category === 'historical' ? 'cultural' : tour.category === 'beach-water' ? 'nature' : tour.category,
  type: 'Günlük Tur',
  highlights: (tour.highlights?.tr || []).slice(0, 4),
  includes: tour.included?.tr || [],
  description: tour.shortDescription?.tr || tour.name.tr,
  difficulty: tour.difficulty?.tr || 'Kolay',
  languages: ['Türkçe', 'İngilizce', 'Almanca', 'Rusça', 'Arapça', 'Yunanca', 'Fransızca', 'Farsça'],
  badge: tour.pricing.savingsPercentage >= 10 ? 'İndirim' : undefined,
  region: { city: tour.city, country: 'cyprus' }
}));

// Premium LyDian Tours - Now with 45+ comprehensive tours from Marmaris, Bodrum, and Çeşme
const otherRegionTours = importedComprehensiveTours.map((tour) => ({
  id: tour.id,
  name: tour.name,
  slug: tour.slug,
  location: `${tour.region}, Türkiye`,
  image: tour.images[0],
  price: tour.pricing.travelLyDian,
  originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100)),
  rating: tour.rating,
  reviews: tour.reviewCount,
  duration: tour.duration,
  groupSize: `${tour.maxGroupSize} kişi`,
  category: tour.category,
  type: 'Günlük Tur',
  highlights: tour.highlights.slice(0, 4),
  includes: tour.included,
  description: tour.description,
  difficulty: tour.difficulty,
  languages: ['Türkçe', 'İngilizce'],
  badge: tour.pricing.savingsPercentage >= 15 ? 'İndirim' : undefined,
  region: { city: tour.region, country: 'turkey' }
}));

// Combine all tours: Turkey first, then Greece, then Cyprus
const allComprehensiveTours = [
...antalyaToursFormatted,
...otherRegionTours,
...greeceToursFormatted,
...cyprusToursFormatted];




// All tours from comprehensive data sources
const tours = allComprehensiveTours;

const categories = [
{ id: 'all', name: 'Tümü', icon: Globe, color: 'from-blue-600 to-purple-700' },
{ id: 'cultural', name: 'Kültürel', icon: Camera, color: 'from-lydian-info to-lydian-info-hover' },
{ id: 'adventure', name: 'Macera', icon: Zap, color: 'from-lydian-warning to-purple-600' },
{ id: 'nature', name: 'Doğa', icon: MapPin, color: 'from-lydian-success to-lydian-success-hover' },
{ id: 'culinary', name: 'Gastronomi', icon: Utensils, color: 'from-lydian-accent-purple to-purple-600' }];


const difficulties = ['Tümü', 'Kolay', 'Orta', 'Zor'];
const durations = ['Tümü', '1 gün altı', '1 gün', '2+ gün'];

export default function Tours() {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');
  const [selectedDuration, setSelectedDuration] = useState('Tümü');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState('popularity');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Country data for filter widget
  const countries = [
  {
    code: 'turkey',
    name: {
      tr: 'Türkiye',
      en: 'Turkey',
      de: 'Türkei',
      ru: 'Турция',
      ar: 'تركيا',
      fa: 'ترکیه',
      fr: 'Turquie',
      el: 'Τουρκία'
    },
    flag: '🇹🇷',
    tourCount: tours.filter((t) => t.region?.country === 'turkey').length
  },
  {
    code: 'greece',
    name: {
      tr: 'Yunanistan',
      en: 'Greece',
      de: 'Griechenland',
      ru: 'Греция',
      ar: 'اليونان',
      fa: 'یونان',
      fr: 'Grèce',
      el: 'Ελλάδα'
    },
    flag: '🇬🇷',
    tourCount: tours.filter((t) => t.region?.country === 'greece').length
  },
  {
    code: 'cyprus',
    name: {
      tr: 'Kıbrıs',
      en: 'Cyprus',
      de: 'Zypern',
      ru: 'Кипр',
      ar: 'قبرص',
      fa: 'قبرس',
      fr: 'Chypre',
      el: 'Κύπρος'
    },
    flag: '🇨🇾',
    tourCount: tours.filter((t) => t.region?.country === 'cyprus').length
  }];


  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.highlights.some((highlight) => highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Tümü' || tour.difficulty === selectedDifficulty;
    const matchesDuration = selectedDuration === 'Tümü' ||
    selectedDuration === '1 gün altı' && tour.duration.includes('saat') ||
    selectedDuration === '1 gün' && tour.duration === '1 gün' ||
    selectedDuration === '2+ gün' && (tour.duration.includes('2') || tour.duration.includes('3'));

    // Country filter
    const matchesCountry = !selectedCountry || tour.region && tour.region.country === selectedCountry;

    // URL query parametresine göre type filtrelemesi
    const typeParam = router.query.type as string;
    const matchesType = !typeParam || tour.type === typeParam;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration && matchesCountry && matchesType;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
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
      setToastMessage('Favorilerden kaldırıldı');
    } else {
      newFavorites.add(id);
      setToastMessage('Favorilere eklendi');
    }
    setFavorites(newFavorites);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleAddToCart = (tour: TourItem) => {
    addItem({
      id: `tour-${tour.id}`,
      type: 'tour',
      title: tour.name,
      description: tour.description,
      image: tour.image,
      price: tour.price,
      originalPrice: tour.originalPrice,
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
      case 'Kolay':return 'from-lydian-success to-lydian-success-hover';
      case 'Orta':return 'from-lydian-warning to-lydian-warning-hover';
      case 'Zor':return 'from-lydian-error to-lydian-error-hover';
      default:return 'from-lydian-text-muted to-lydian-text-dim';
    }
  };

  const getBadgeColor = (badge: string): string => {
    const colors: Record<string, string> = {
      'Popüler': 'from-blue-600 to-purple-700',
      'En Çok Satan': 'from-lydian-warning to-lydian-warning-hover',
      'Kültür': 'from-lydian-info to-lydian-info-hover',
      'Macera': 'from-lydian-warning to-purple-600',
      'Doğa': 'from-lydian-success to-lydian-success-hover',
      'Gastronomi': 'from-lydian-accent-purple to-purple-600',
      'Keşif': 'from-cyan-600 to-lydian-info',
      'Tarih': 'from-lydian-info to-lydian-accent-purple'
    };
    return colors[badge] || 'from-lydian-text-muted to-lydian-text-dim';
  };

  const activeFilterCount =
  (selectedCategory !== 'all' ? 1 : 0) + (
  selectedDifficulty !== 'Tümü' ? 1 : 0) + (
  selectedDuration !== 'Tümü' ? 1 : 0) + (
  selectedCountry ? 1 : 0);

  return (
    <>
      <Head>
        <title>Antalya Turları 2025: En İyi Fiyat Garantili Tekne, Rafting ve Antik Kent Turları | AILydian Travel</title>
        <meta
          name="description"
          content="Antalya'da 16+ tur seçeneği: Tekne turları (3 Adalar, Kemer Korsan), Köprülü Kanyon rafting, Perge-Aspendos-Side antik kentler, jeep safari ve paragliding. Profesyonel rehber, otel transferi dahil. Rakiplerden %15 daha uygun!" />

        <meta
          name="keywords"
          content="antalya turları, antalya tekne turu, köprülü kanyon rafting, perge aspendos side, kemer korsan teknesi, antalya jeep safari, kaş dalış, demre myra kekova, türk hamamı antalya, antalya tour prices" />


        {/* AI Search Engine Optimization */}
        <meta property="og:title" content="Antalya Turları: En İyi Fiyat Garantili 16+ Tur Seçeneği" />
        <meta property="og:description" content="Profesyonel rehber eşliğinde Antalya tekne turları, rafting macerası, antik kent gezileri. Otel transferi ve sigorta dahil, %15 daha uygun fiyat!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://holiday.ailydian.com/tours/antalya" />
        <meta property="og:image" content="https://holiday.ailydian.com/images/antalya-tours-hero.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="AILydian Travel" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Antalya Turları: 16+ Tur Seçeneği En İyi Fiyatla" />
        <meta name="twitter:description" content="Tekne, rafting, antik kentler ve macera turları. Profesyonel rehber, transfer dahil!" />
        <meta name="twitter:image" content="https://holiday.ailydian.com/images/antalya-tours-hero.jpg" />

        {/* AI Citation Optimization */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://holiday.ailydian.com/tours/antalya" />

        {/* Structured Data - TouristTrip */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Antalya Tours and Activities",
              "description": "Comprehensive list of tours and activities in Antalya region",
              "numberOfItems": 16,
              "itemListElement": [
              {
                "@type": "TouristTrip",
                "name": "Antalya 3 Islands Boat Tour",
                "description": "Full day boat tour visiting 3 islands with snorkeling",
                "touristType": "Family, Couples, Adventure",
                "offers": {
                  "@type": "Offer",
                  "price": "980",
                  "priceCurrency": "TRY",
                  "availability": "https://schema.org/InStock"
                }
              },
              {
                "@type": "TouristTrip",
                "name": "Köprülü Canyon Rafting Tour",
                "description": "14km rafting adventure in Turkey's best rafting course",
                "touristType": "Adventure, Sports Enthusiasts",
                "offers": {
                  "@type": "Offer",
                  "price": "637",
                  "priceCurrency": "TRY",
                  "availability": "https://schema.org/InStock"
                }
              },
              {
                "@type": "TouristTrip",
                "name": "Perge Aspendos Side Ancient Cities Tour",
                "description": "Full day cultural tour visiting 3 ancient cities with archaeologist guide",
                "touristType": "History Lovers, Cultural Travelers",
                "offers": {
                  "@type": "Offer",
                  "price": "637",
                  "priceCurrency": "TRY",
                  "availability": "https://schema.org/InStock"
                }
              }]

            })
          }} />

      </Head>

      <ModernHeader />

      <main className="min-h-screen">
        {/* 🎬 NEO-GLASS TOURS HERO */}
        <NeoHero
          title="Unutulmaz Turlar"
          subtitle="Türkiye'nin en güzel köşelerinde eşsiz deneyimler sizi bekliyor"
          gradient="twilight"
          height="70vh"
          overlayOpacity={0.2}
          showFloatingElements={true}>

          {/* Stats Cards with Glassmorphism */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
              whileHover={{ scale: 1.05, y: -5 }}>

              <div className="text-5xl font-black text-white mb-2">{tours.length}</div>
              <div className="text-sm uppercase tracking-widest text-white/80">Benzersiz Tur</div>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
              whileHover={{ scale: 1.05, y: -5 }}>

              <div className="text-5xl font-black text-white mb-2">
                {(tours.reduce((sum, tour) => sum + tour.rating, 0) / tours.length).toFixed(1)}
              </div>
              <div className="text-sm uppercase tracking-widest text-white/80">Ortalama Puan</div>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
              whileHover={{ scale: 1.05, y: -5 }}>

              <div className="text-5xl font-black text-white mb-2">
                {tours.reduce((sum, tour) => sum + tour.reviews, 0).toLocaleString('tr-TR')}
              </div>
              <div className="text-sm uppercase tracking-widest text-white/80">Mutlu Misafir</div>
            </motion.div>
          </div>
        </NeoHero>

        {/* AI Answer Block - Optimized for AI Search Engines */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AntalyaToursAIAnswer />
        </section>

        {/* Search & Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tur, destinasyon veya aktivite ara..."
                className="w-full pl-14 pr-4 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:shadow-xl transition-all" />

            </div>
          </div>

          {/* Country Filter Widget */}
          <div className="mb-8">
            <CountryFilterWidget
              countries={countries}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry} />

          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                  isActive ?
                  `bg-gradient-to-r ${category.color} text-white shadow-neon` :
                  'bg-white/10 backdrop-blur-xl text-gray-400 hover:shadow-xl border border-white/20'}`
                  }>

                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </motion.button>);

            })}
          </div>

          {/* Additional Filters & Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2.5 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all">

                {difficulties.map((diff) =>
                <option key={diff} value={diff}>Zorluk: {diff}</option>
                )}
              </select>

              {/* Duration Filter */}
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2.5 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all">

                {durations.map((dur) =>
                <option key={dur} value={dur}>Süre: {dur}</option>
                )}
              </select>

              {/* Active Filter Count */}
              {activeFilterCount > 0 &&
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 text-blue-400 rounded-xl font-semibold">
                  <Filter className="w-4 h-4" />
                  <span>{activeFilterCount} Filtre Aktif</span>
                </div>
              }
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-400">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all">

                <option value="popularity">Popülerlik</option>
                <option value="rating">Puan (Yüksek-Düşük)</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                <option value="duration">Süre</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-400">
              <span className="font-bold text-blue-400">{sortedTours.length}</span> tur bulundu
            </p>
          </div>

          {/* 🎪 NEO-GLASS TOURS GRID */}
          {sortedTours.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedTours.map((tour, index) =>
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}>

                  <FuturisticCard
                image={tour.image}
                title={tour.name}
                description={tour.description}
                price={`${tour.price.toLocaleString('tr-TR')} ₺`}
                badge={tour.badge}
                badges={tour.highlights.slice(0, 2)}
                metadata={[
                { icon: <MapPin className="w-4 h-4" />, label: tour.location },
                { icon: <Clock className="w-4 h-4" />, label: tour.duration },
                { icon: <Users className="w-4 h-4" />, label: tour.groupSize }]
                }
                rating={tour.rating}
                reviews={tour.reviews}
                onClick={() => router.push(`/tours/${tour.slug || tour.name.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')}`)}
                onFavorite={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tour.id);
                }}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  handleAddToCart(tour);
                }}
                isFavorite={favorites.has(tour.id)}
                category={tour.category}
                categoryColor={
                tour.category === 'cultural' ? 'var(--lydian-info)' :
                tour.category === 'adventure' ? 'var(--lydian-primary)' :
                tour.category === 'nature' ? 'var(--lydian-success)' :
                tour.category === 'culinary' ? 'var(--lydian-accent-purple)' :
                'var(--lydian-primary)'
                } />

                </motion.div>
            )}
            </div> :

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20">

              <Camera className="w-32 h-32 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Aradığınız kriterlerde tur bulunamadı
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                Arama kriterlerinizi değiştirerek tekrar deneyin
              </p>
              <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('Tümü');
                setSelectedDuration('Tümü');
                setSelectedCountry(null);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg">

                Filtreleri Temizle
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          }
        </section>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast &&
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">

            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">{toastMessage}</span>
            {toastMessage.includes('sepete eklendi') &&
          <button
            onClick={() => router.push('/cart')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl text-white rounded-lg font-semibold hover:bg-white/20 transition-colors ml-2">

                <Eye className="w-4 h-4" />
                Sepeti Gör
              </button>
          }
          </motion.div>
        }
      </AnimatePresence>
    </>);

}

// CRITICAL: Add i18n support for this page
// Without this, language changes won't work
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'tr', ['common'])),
    },
  };
};