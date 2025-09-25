import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, MapPin, Calendar, Users, Filter, Trash2, Share, Eye } from 'lucide-react';

const savedItems = [
  {
    id: 1,
    type: 'destination',
    name: 'İstanbul',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop',
    price: '₺2,500',
    rating: 4.8,
    reviews: 12847,
    savedDate: '2025-01-05',
    description: 'İki kıtayı birleştiren büyüleyici şehir'
  },
  {
    id: 2,
    type: 'hotel',
    name: 'Four Seasons Hotel Istanbul',
    location: 'Sultanahmet, İstanbul',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    price: '₺4,500',
    rating: 4.9,
    reviews: 2847,
    savedDate: '2025-01-04',
    amenities: ['Spa', 'Havuz', 'WiFi', 'Kahvaltı']
  },
  {
    id: 3,
    type: 'destination',
    name: 'Kapadokya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=600&h=400&fit=crop',
    price: '₺1,800',
    rating: 4.9,
    reviews: 8456,
    savedDate: '2025-01-03',
    description: 'Peri bacaları ve sıcak hava balonları ile ünlü'
  },
  {
    id: 4,
    type: 'flight',
    airline: 'Turkish Airlines',
    from: 'İstanbul (IST)',
    to: 'Antalya (AYT)',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
    price: '₺450',
    rating: 4.7,
    savedDate: '2025-01-02',
    duration: '1s 45d'
  },
  {
    id: 5,
    type: 'destination',
    name: 'Antalya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop',
    price: '₺950',
    rating: 4.7,
    reviews: 9234,
    savedDate: '2025-01-01',
    description: 'Turkuaz deniz ve antik tarihle dolu sahil kenti'
  },
  {
    id: 6,
    type: 'hotel',
    name: 'Museum Hotel Cappadocia',
    location: 'Uçhisar, Kapadokya',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=600&h=400&fit=crop',
    price: '₺3,200',
    rating: 4.8,
    reviews: 1642,
    savedDate: '2024-12-30',
    amenities: ['Balon Turu', 'Spa', 'WiFi', 'Restoran']
  }
];

const filterOptions = [
  { id: 'all', name: 'Tümü', icon: Heart },
  { id: 'destination', name: 'Destinasyonlar', icon: MapPin },
  { id: 'hotel', name: 'Oteller', icon: Heart },
  { id: 'flight', name: 'Uçak Biletleri', icon: Heart },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState(savedItems);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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
        const priceA = parseInt((a.price || '0').replace(/[^\d]/g, ''));
        const priceB = parseInt((b.price || '0').replace(/[^\d]/g, ''));
        return priceA - priceB;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const shareFavorite = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `${item.name} - ${item.price}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${item.name} - ${window.location.href}`);
      alert('Link panoya kopyalandı!');
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

  return (
    <>
      <Head>
        <title>Favorilerim - Ailydian Travel</title>
        <meta name="description" content="Kaydettiğiniz seyahat fırsatları ve favorileriniz" />
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
            <Heart className="h-16 w-16 mx-auto mb-4 fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Favorilerim
            </h1>
            <p className="text-xl mb-8" style={{ color: '#f0f9ff' }}>
              Beğendiginiz yerleri ve deneyimleri saklayın
            </p>
            <div className="bg-gray-900 border-2 border-white rounded-lg p-4 inline-block">
              <p className="text-lg">
                <span className="font-bold">{favorites.length}</span> favori öğe
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-pink-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {filter.name}
                  </button>
                );
              })}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="date">Eklenme Tarihi</option>
                <option value="name">Ad</option>
                <option value="price">Fiyat</option>
                <option value="rating">Puan</option>
              </select>
            </div>
          </div>

          {/* Favorites Grid */}
          {sortedFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedFavorites.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name || ''}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {getItemTypeLabel(item.type)}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => shareFavorite(item)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                        title="Paylaş"
                      >
                        <Share className="h-4 w-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                        title="Favorilerden Çıkar"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-gray-800">{item.price}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h3>
                      {item.rating && (
                        <div className="flex items-center ml-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            {item.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Item specific content */}
                    {item.type === 'destination' && (
                      <>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.country}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {item.description}
                        </p>
                      </>
                    )}

                    {item.type === 'hotel' && (
                      <>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.location}
                        </p>
                        {item.amenities && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.amenities.slice(0, 3).map((amenity) => (
                              <span
                                key={amenity}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {item.type === 'flight' && (
                      <>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {item.airline}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {item.from} → {item.to}
                        </p>
                      </>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(item.savedDate).toLocaleDateString('tr-TR')}
                      </div>
                      <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        Görüntüle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedFilter === 'all' ? 'Henüz favori eklemediniz' : 'Bu kategoride favori bulunamadı'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Beğendiğiniz destinasyonları, otelleri ve uçak biletlerini favorilerinize ekleyerek 
                daha sonra kolayca erişebilirsiniz.
              </p>
              <Link
                href="/"
                className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
              >
                Keşfetmeye Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}

          {/* Statistics */}
          {favorites.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Toplam Favori', value: favorites.length, icon: Heart },
                { label: 'Destinasyonlar', value: favorites.filter(f => f.type === 'destination').length, icon: MapPin },
                { label: 'Oteller', value: favorites.filter(f => f.type === 'hotel').length, icon: Heart },
                { label: 'Uçak Biletleri', value: favorites.filter(f => f.type === 'flight').length, icon: Heart }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                    <IconComponent className="h-8 w-8 text-pink-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}