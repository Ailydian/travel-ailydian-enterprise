import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Star, Heart, Filter, Calendar, Users, ArrowRight, Wifi, Car, Waves, Utensils, Wind, Coffee } from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: 'Çırağan Palace Kempinski',
    location: 'Beşiktaş, İstanbul',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    price: 8500,
    originalPrice: 10200,
    rating: 4.9,
    reviews: 2847,
    type: 'Lüks Otel',
    amenities: ['WiFi', 'Spa', 'Havuz', 'Restoran', 'Valet'],
    description: 'Boğaz manzaralı tarihi saray oteli'
  },
  {
    id: 2,
    name: 'Museum Hotel',
    location: 'Nevşehir, Kapadokya',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    price: 3200,
    originalPrice: 4000,
    rating: 4.8,
    reviews: 1456,
    type: 'Butik Otel',
    amenities: ['WiFi', 'Kahvaltı', 'Terras', 'Concierge'],
    description: 'Peri bacalarına karşı eşsiz mağara oteli'
  },
  {
    id: 3,
    name: 'Maxx Royal Belek',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    price: 4800,
    originalPrice: 6000,
    rating: 4.7,
    reviews: 3234,
    type: 'Resort',
    amenities: ['Her Şey Dahil', 'Plaj', 'Havuz', 'Spa', 'Golf'],
    description: 'Özel plaj ve golf sahası bulunan lüks resort'
  },
  {
    id: 4,
    name: 'The Bodrum by Paramount',
    location: 'Torba, Bodrum',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=600&h=400&fit=crop',
    price: 3800,
    originalPrice: 4500,
    rating: 4.6,
    reviews: 1823,
    type: 'Lüks Resort',
    amenities: ['Plaj Kulübü', 'Marina', 'Spa', 'Restoran'],
    description: 'Marina ve deniz manzaralı lüks tatil köyü'
  },
  {
    id: 5,
    name: 'Pamukkale Thermal Resort',
    location: 'Pamukkale, Denizli',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop',
    price: 1800,
    originalPrice: 2200,
    rating: 4.4,
    reviews: 956,
    type: 'Termal Otel',
    amenities: ['Termal Havuz', 'Spa', 'Masaj', 'Restoran'],
    description: 'Doğal termal kaynaklara sahip şifa oteli'
  },
  {
    id: 6,
    name: 'Sumahan on the Water',
    location: 'Çengelköy, İstanbul',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    price: 5200,
    originalPrice: 6200,
    rating: 4.8,
    reviews: 1247,
    type: 'Butik Otel',
    amenities: ['Boğaz Manzara', 'Restoran', 'Spa', 'Tekne'],
    description: 'Boğaz kenarında tarihi rakı fabrikası oteli'
  }
];

const filters = [
  { id: 'all', name: 'Tümü' },
  { id: 'luxury', name: 'Lüks' },
  { id: 'boutique', name: 'Butik' },
  { id: 'resort', name: 'Resort' },
  { id: 'thermal', name: 'Termal' },
];

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState('recommended');

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id: number) => {
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
        <title>Oteller - Ailydian Travel</title>
        <meta name="description" content="En konforlu otellerde konaklayın. Lüks otellerden butik tesislere kadar..." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Ailydian Travel
                </Link>
              </div>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 flex items-center"
              >
                <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                Ana Sayfa&apos;ya Dön
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Konforlu Konaklama Seçenekleri
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Hayalinizdeki tatil için mükemmel oteli bulun
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Otel veya şehir ara..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recommended">Önerilen</option>
              <option value="price-low">Fiyat (Düşük)</option>
              <option value="price-high">Fiyat (Yüksek)</option>
              <option value="rating">Puan</option>
            </select>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <button
                    onClick={() => toggleFavorite(hotel.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(hotel.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {hotel.type}
                  </div>
                  
                  {hotel.originalPrice > hotel.price && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      %{Math.round((hotel.originalPrice - hotel.price) / hotel.originalPrice * 100)} İndirim
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {hotel.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hotel.location}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {hotel.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{hotel.amenities.length - 4} daha
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        {hotel.originalPrice > hotel.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₺{hotel.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-xl font-bold text-blue-600">
                          ₺{hotel.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {hotel.reviews} değerlendirme
                      </span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Rezervasyon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}