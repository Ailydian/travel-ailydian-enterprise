import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Star, Heart, Filter, Calendar, Users, ArrowLeft, Camera, Mountain, Waves, Building, TreePine, Sparkles, Thermometer, DollarSign } from 'lucide-react';
import { DESTINATIONS_TURKEY } from '../data/destinations-turkey';
import { ModernHeader } from '../components/layout/ModernHeader';
import { BookingFooter } from '../components/layout/BookingFooter';

const categories = [
{ id: 'all', name: 'Tümü', icon: MapPin },
{ id: 'historical', name: 'Tarihi', icon: Building },
{ id: 'nature', name: 'Doğa', icon: TreePine },
{ id: 'beach', name: 'Sahil', icon: Waves },
{ id: 'adventure', name: 'Macera', icon: Mountain },
{ id: 'urban', name: 'Şehir', icon: Building },
{ id: 'cultural', name: 'Kültür', icon: Sparkles }];


export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredDestinations = DESTINATIONS_TURKEY.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.activities.some((activity) => activity.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <>
      <Head>
        <title>Türkiye Destinasyonları | AILYDIAN Holiday - AI Destekli Seyahat Rehberi</title>
        <meta name="description" content="Türkiye'nin en güzel destinasyonlarını keşfedin. İstanbul, Kapadokya, Antalya ve daha fazlası. Detaylı rehberler, en iyi oteller ve turlar." />
        <meta name="keywords" content="türkiye destinasyonları, gezi rehberi, istanbul, kapadokya, antalya, seyahat, tatil" />
      </Head>

      <ModernHeader />

      {/* Return to Home Button */}
      <Link
        href="/"
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-lydian-bg/90 backdrop-blur-sm rounded-xl shadow-lg border border-lydian-border text-lydian-text-muted hover:bg-lydian-glass-dark hover:text-lydian-primary transition-all duration-200">

        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <div className="min-h-screen bg-lydian-glass-dark pt-8">
        {/* Hero Section */}
        <div className="text-lydian-text-inverse py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, var(--ac-1) 0%, var(--ac-2) 50%, var(--ac-3) 100%)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Hayalinizdeki Destinasyonu Keşfedin
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100">
              Türkiye'nin en güzel yerlerinde unutulmaz anılar biriktirin
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-lydian-text-muted" />
              <input
                type="text"
                placeholder="Destinasyon ara..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-lydian-text-inverse focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                  selectedCategory === category.id ?
                  'ocean-button' :
                  'ocean-button-secondary'}`
                  }>

                  <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {category.name}
                </button>);

            })}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-lydian-text-dim">
              <span className="font-semibold text-lydian-text-inverse">{filteredDestinations.length}</span> destinasyon bulundu
            </p>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) =>
            <Link
              href={`/destinations/${destination.slug}`}
              key={destination.id}
              className="bg-lydian-bg-hover dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">

                <div className="relative">
                  <Image
                  src={destination.images.hero}
                  alt={destination.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />

                  <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(destination.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-lydian-bg/80 rounded-full hover:bg-lydian-glass-dark transition-colors">

                    <Heart
                    className={`h-5 w-5 ${
                    favorites.has(destination.id) ?
                    'text-lydian-error fill-current' :
                    'text-lydian-text-dim'}`
                    } />

                  </button>
                  <div className="absolute bottom-3 left-3 bg-lydian-bg/90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-lydian-text-dim">{destination.pricing.budgetRange}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-lydian-primary/90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-lydian-text-inverse">{destination.region}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">
                      {destination.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-lydian-text-dim dark:text-lydian-text-muted">
                        {destination.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-lydian-text-dim dark:text-lydian-text-muted mb-3">
                    {destination.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {destination.activities.slice(0, 3).map((activity) =>
                  <span
                    key={activity}
                    className="px-2 py-1 bg-lydian-primary-light dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">

                        {activity}
                      </span>
                  )}
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-lydian-text-dim dark:text-lydian-text-muted">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2" />
                      <span>{destination.avgTemperature.min}°C - {destination.avgTemperature.max}°C</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-lydian-text-muted dark:text-lydian-text-dim mb-2">Öne Çıkanlar:</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 2).map((highlight) =>
                    <span
                      key={highlight}
                      className="px-2 py-1 bg-lydian-success-light dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">

                          {highlight}
                        </span>
                    )}
                      {destination.highlights.length > 2 &&
                    <span className="text-xs text-lydian-text-muted px-2 py-1">
                          +{destination.highlights.length - 2} daha
                        </span>
                    }
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lydian-text-muted dark:text-lydian-text-muted">
                      {destination.reviews.toLocaleString()} değerlendirme
                    </span>
                    <span className="bg-lydian-primary text-lydian-text-inverse px-4 py-2 rounded-lg hover:bg-lydian-primary-dark transition-colors font-semibold">
                      Detaylar
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* No Results */}
          {filteredDestinations.length === 0 &&
          <div className="text-center py-16">
              <MapPin className="h-24 w-24 text-lydian-text-dim mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-4">
                Aradığınız destinasyon bulunamadı
              </h2>
              <p className="text-lydian-text-dim dark:text-lydian-text-muted mb-8">
                Farklı arama kriterleri deneyin
              </p>
              <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-lydian-primary text-lydian-text-inverse px-6 py-3 rounded-lg hover:bg-lydian-primary-dark transition-colors font-semibold">

                Filtreleri Temizle
              </button>
            </div>
          }
        </div>
      </div>

      <BookingFooter />
    </>);

}