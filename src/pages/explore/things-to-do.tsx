/**
 * Things to Do Page - Explore Subcategory
 * Premium UI for activities, tours, and experiences
 * Features: Subcategory filtering, multi-country support, advanced filters
 *
 * Enterprise-grade implementation with real data from:
 * - Antalya Tours (Turkey)
 * - Greece Tours
 * - Cyprus Tours
 */

import React, { useState, useMemo } from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Map,
  Utensils,
  Mountain,
  Landmark,
  Waves,
  Users,
  Star,
  Clock,
  MapPin,
  Filter,
  X,
  Heart,
  ArrowRight,
  ChevronDown,
  Grid,
  List,
} from 'lucide-react';
import ModernHeader from '../../components/layout/ModernHeader';
import BookingFooter from '../../components/layout/BookingFooter';
import { exploreCategories } from '../../data/explore-categories';
import antalyaTours from '../../data/antalya-tours';
import { greeceTours } from '../../data/greece-tours';
import { cyprusTours } from '../../data/cyprus-tours';

// Subcategory icons mapping
const subcategoryIcons: Record<string, React.ComponentType<any>> = {
  'tours-activities': Map,
  'food-drink': Utensils,
  'outdoor-adventures': Mountain,
  'cultural-experiences': Landmark,
  'water-sports': Waves,
  'family-activities': Users,
};

interface Filters {
  subcategory: string;
  priceRange: [number, number];
  minRating: number;
  difficulty: string;
  country: string;
}

const ThingsToDoPage: NextPage = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language || 'tr';

  // State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filters>({
    subcategory: 'all',
    priceRange: [0, 10000],
    minRating: 0,
    difficulty: 'all',
    country: 'all',
  });

  // Get things-to-do category data
  const category = exploreCategories.find((cat) => cat.id === 'things-to-do');
  const categoryData = category?.translations[currentLang as keyof typeof category.translations];
  const subcategories = category?.subcategories || [];

  // Combine all tours from multiple countries
  const allTours = useMemo(() => {
    const antalya = antalyaTours.map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      name: tour.name,
      image: tour.images[0],
      price: Math.round(tour.pricing.travelLyDian * 35),
      originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100) * 35),
      rating: tour.rating,
      reviews: tour.reviewCount,
      duration: tour.duration,
      location: `${tour.region}, Türkiye`,
      country: 'turkey',
      description: tour.description,
      category: tour.category,
      difficulty: tour.difficulty,
      type: 'tour' as const,
      badge: tour.pricing.savingsPercentage >= 15 ? 'Popüler' : undefined,
    }));

    const greece = greeceTours.map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      name: tour.name.tr,
      image: tour.images?.hero || tour.images?.gallery?.[0] || '',
      price: Math.round(tour.pricing.travelLyDian * 35),
      originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100) * 35),
      rating: tour.rating,
      reviews: tour.reviewCount,
      duration: tour.duration,
      location: `${tour.city}, Yunanistan`,
      country: 'greece',
      description: tour.shortDescription?.tr || tour.name.tr,
      category: tour.category,
      difficulty: tour.difficulty?.tr || 'Orta',
      type: 'tour' as const,
      badge: tour.pricing.savingsPercentage >= 10 ? 'Öne Çıkan' : undefined,
    }));

    const cyprus = cyprusTours.map((tour) => ({
      id: tour.id,
      slug: tour.slug,
      name: tour.name.tr,
      image: tour.images?.hero || tour.images?.gallery?.[0] || '',
      price: Math.round(tour.pricing.travelLyDian * 35),
      originalPrice: Math.round(tour.pricing.travelLyDian / (1 - tour.pricing.savingsPercentage / 100) * 35),
      rating: tour.rating,
      reviews: tour.reviewCount,
      duration: tour.duration,
      location: `${tour.city}, Kıbrıs`,
      country: 'cyprus',
      description: tour.shortDescription?.tr || tour.name.tr,
      category: tour.category,
      difficulty: tour.difficulty?.tr || 'Orta',
      type: 'tour' as const,
      badge: undefined,
    }));

    return [...antalya, ...greece, ...cyprus];
  }, []);

  // Map categories to subcategories
  const categoryToSubcategoryMap: Record<string, string> = {
    'adventure': 'outdoor-adventures',
    'culture': 'cultural-experiences',
    'water': 'water-sports',
    'food': 'food-drink',
    'family': 'family-activities',
    'sightseeing': 'tours-activities',
    'historical': 'cultural-experiences',
  };

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let tours = allTours;

    // Subcategory filter
    if (filters.subcategory !== 'all') {
      tours = tours.filter((tour) => {
        const mappedSubcategory = categoryToSubcategoryMap[tour.category] || 'tours-activities';
        return mappedSubcategory === filters.subcategory;
      });
    }

    // Price range
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
      tours = tours.filter((tour) => tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1]);
    }

    // Rating
    if (filters.minRating > 0) {
      tours = tours.filter((tour) => tour.rating >= filters.minRating);
    }

    // Difficulty
    if (filters.difficulty !== 'all') {
      tours = tours.filter((tour) =>
        tour.difficulty.toLowerCase().includes(filters.difficulty.toLowerCase())
      );
    }

    // Country
    if (filters.country !== 'all') {
      tours = tours.filter((tour) => tour.country === filters.country);
    }

    // Sort
    if (sortBy === 'price-low') {
      tours = tours.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      tours = tours.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      tours = tours.sort((a, b) => b.rating - a.rating);
    } else {
      // Popular: by reviews
      tours = tours.sort((a, b) => b.reviews - a.reviews);
    }

    return tours;
  }, [allTours, filters, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <Head>
        <title>{categoryData?.name} | Travel LyDian</title>
        <meta name="description" content={categoryData?.description} />
        <meta name="keywords" content="turlar, aktiviteler, deneyimler, gezilecek yerler" />
      </Head>

      <ModernHeader />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
                {categoryData?.name}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {categoryData?.description}
              </p>
              <div className="flex items-center justify-center gap-6 mt-8 text-white">
                <div className="text-center">
                  <div className="text-3xl font-black">{allTours.length}+</div>
                  <div className="text-sm opacity-90">Deneyim</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">3</div>
                  <div className="text-sm opacity-90">Ülke</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">4.8★</div>
                  <div className="text-sm opacity-90">Ortalama Puan</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="bg-slate-900/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-blue-400">{t('navigation.home')}</Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-blue-400">{t('explore.title')}</Link>
              <span>/</span>
              <span className="text-white font-semibold">{categoryData?.name}</span>
            </div>
          </div>
        </div>

        {/* Subcategories Section */}
        <section className="bg-slate-900/50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Kategoriler</h2>
              <div className="text-sm text-gray-400">{filteredTours.length} sonuç</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
              <motion.button
                key="all"
                onClick={() => setFilters({ ...filters, subcategory: 'all' })}
                whileHover={{ scale: 1.05 }}
                className={`p-3 rounded-xl border transition-all ${
                  filters.subcategory === 'all'
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Compass className="w-6 h-6" />
                  <span className="text-xs font-semibold">Tümü</span>
                  <span className="text-[10px] opacity-70">{allTours.length}</span>
                </div>
              </motion.button>

              {subcategories.map((sub) => {
                const Icon = subcategoryIcons[sub.id] || Map;
                const subData = sub.translations[currentLang as keyof typeof sub.translations];
                const count = allTours.filter((tour) => {
                  const mapped = categoryToSubcategoryMap[tour.category] || 'tours-activities';
                  return mapped === sub.id;
                }).length;

                return (
                  <motion.button
                    key={sub.id}
                    onClick={() => setFilters({ ...filters, subcategory: sub.id })}
                    whileHover={{ scale: 1.05 }}
                    className={`p-3 rounded-xl border transition-all ${
                      filters.subcategory === sub.id
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-semibold text-center line-clamp-2">{subData.name}</span>
                      <span className="text-[10px] opacity-70">{count}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-20 z-40 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-white">
              <span className="font-semibold">{filteredTours.length}</span> deneyim bulundu
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white/10 backdrop-blur-xl text-white"
                >
                  <option value="popular">Popüler</option>
                  <option value="rating">En Yüksek Puan</option>
                  <option value="price-low">En Düşük Fiyat</option>
                  <option value="price-high">En Yüksek Fiyat</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-white"
              >
                <Filter className="w-4 h-4" />
                <span>Filtre</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="max-w-7xl mx-auto px-4 pt-6 pb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Ülke</label>
                    <select
                      value={filters.country}
                      onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Tümü</option>
                      <option value="turkey">Türkiye</option>
                      <option value="greece">Yunanistan</option>
                      <option value="cyprus">Kıbrıs</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Zorluk</label>
                    <select
                      value={filters.difficulty}
                      onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Tümü</option>
                      <option value="kolay">Kolay</option>
                      <option value="orta">Orta</option>
                      <option value="zor">Zor</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Min. Puan</label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0">Tümü</option>
                      <option value="4.5">4.5+ ★</option>
                      <option value="4.0">4.0+ ★</option>
                      <option value="3.5">3.5+ ★</option>
                    </select>
                  </div>

                  {/* Reset */}
                  <div className="flex items-end">
                    <button
                      onClick={() =>
                        setFilters({
                          subcategory: 'all',
                          priceRange: [0, 10000],
                          minRating: 0,
                          difficulty: 'all',
                          country: 'all',
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      Sıfırla
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Tours Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {filteredTours.map((tour) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all group"
                >
                  <Link href={`/tours/${tour.slug}`}>
                    <div className="relative h-48">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {tour.badge && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                          {tour.badge}
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(tour.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Heart className={`w-5 h-5 ${favorites.has(tour.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-sm font-bold">{tour.rating}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/tours/${tour.slug}`}>
                      <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
                        {tour.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tour.reviews} yorum</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between pt-4 border-t border-white/10">
                      <div>
                        {tour.originalPrice && tour.originalPrice > tour.price && (
                          <div className="text-sm text-gray-400 line-through">₺{tour.originalPrice}</div>
                        )}
                        <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          ₺{tour.price}
                        </div>
                      </div>
                      <Link href={`/tours/${tour.slug}`}>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                          <span>Detay</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="text-center py-20">
                <Compass className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Sonuç bulunamadı</h3>
                <p className="text-gray-400 mb-6">Filtreleri değiştirerek tekrar deneyin</p>
                <button
                  onClick={() =>
                    setFilters({
                      subcategory: 'all',
                      priceRange: [0, 10000],
                      minRating: 0,
                      difficulty: 'all',
                      country: 'all',
                    })
                  }
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <BookingFooter />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
  };
};

export default ThingsToDoPage;
