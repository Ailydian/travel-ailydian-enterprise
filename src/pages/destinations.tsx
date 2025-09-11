import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Star, Heart, Filter, Calendar, Users, ArrowRight, Plane, Camera, Mountain, Waves, Building, TreePine } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'İstanbul',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop',
    price: 'from ₺1,200',
    rating: 4.8,
    reviews: 12847,
    description: 'Tarihi ve modern yaşamın buluştuğu büyülü şehir',
    activities: ['Tarihi Yerler', 'Müzeler', 'Yemek', 'Alışveriş'],
    category: 'historical',
    duration: '3-5 gün',
    bestTime: 'Nisan-Haziran, Eylül-Kasım',
    highlights: ['Ayasofya', 'Topkapı Sarayı', 'Kapalıçarşı', 'Galata Kulesi']
  },
  {
    id: 2,
    name: 'Kapadokya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=600&h=400&fit=crop',
    price: 'from ₺1,800',
    rating: 4.9,
    reviews: 8456,
    description: 'Peri bacaları ve sıcak hava balonları ile ünlü',
    activities: ['Balon Turu', 'Yeraltı Şehri', 'Trekking', 'Fotoğraf'],
    category: 'nature',
    duration: '2-3 gün',
    bestTime: 'Nisan-Haziran, Eylül-Kasım',
    highlights: ['Balon Turu', 'Göreme Açık Hava Müzesi', 'Derinkuyu', 'Avanos']
  },
  {
    id: 3,
    name: 'Antalya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop',
    price: 'from ₺950',
    rating: 4.7,
    reviews: 9234,
    description: 'Turkuaz deniz ve antik tarihle dolu sahil kenti',
    activities: ['Plaj', 'Dalış', 'Tarihi Yerler', 'Tekne Turu'],
    category: 'beach',
    duration: '4-7 gün',
    bestTime: 'Mayıs-Ekim',
    highlights: ['Kaleiçi', 'Düden Şelalesi', 'Aspendos', 'Konyaaltı Plajı']
  },
  {
    id: 4,
    name: 'Bodrum',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=600&h=400&fit=crop',
    price: 'from ₺1,100',
    rating: 4.6,
    reviews: 7823,
    description: 'Renkli gece hayatı ve marina ile ünlü tatil beldesi',
    activities: ['Gece Hayatı', 'Tekne', 'Kale', 'Plaj'],
    category: 'beach',
    duration: '3-5 gün',
    bestTime: 'Mayıs-Ekim',
    highlights: ['Bodrum Kalesi', 'Marina', 'Gümbet Plajı', 'Halikarnas']
  },
  {
    id: 5,
    name: 'Pamukkale',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop',
    price: 'from ₺800',
    rating: 4.8,
    reviews: 5647,
    description: 'Beyaz travertenler ve termal sular',
    activities: ['Termal', 'Doğa', 'Hierapolis', 'Fotoğraf'],
    category: 'nature',
    duration: '1-2 gün',
    bestTime: 'Mart-Kasım',
    highlights: ['Beyaz Travertenler', 'Hierapolis', 'Antik Havuz', 'Termal Su']
  },
  {
    id: 6,
    name: 'Trabzon',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=600&h=400&fit=crop',
    price: 'from ₺750',
    rating: 4.7,
    reviews: 4532,
    description: 'Yeşil doğa ve Karadeniz kültürü',
    activities: ['Uzungöl', 'Ayasofya', 'Doğa', 'Yemek'],
    category: 'nature',
    duration: '2-4 gün',
    bestTime: 'Mayıs-Ekim',
    highlights: ['Uzungöl', 'Ayasofya Müzesi', 'Sumela Manastırı', 'Hamsiköy']
  },
  {
    id: 7,
    name: 'Mardin',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop',
    price: 'from ₺650',
    rating: 4.6,
    reviews: 3421,
    description: 'Mezopotamya&apos;nın tarihi hazinesi',
    activities: ['Tarihi Evler', 'Müzeler', 'Gastronomi', 'Kültür'],
    category: 'historical',
    duration: '2-3 gün',
    bestTime: 'Mart-Mayıs, Eylül-Kasım',
    highlights: ['Eski Mardin', 'Deyrulzafaran', 'Kasımiye Medresesi', 'Midyat']
  },
  {
    id: 8,
    name: 'Safranbolu',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=600&h=400&fit=crop',
    price: 'from ₺580',
    rating: 4.5,
    reviews: 2876,
    description: 'UNESCO Dünya Mirası listesindeki Osmanlı şehri',
    activities: ['Tarihi Evler', 'Müzeler', 'El Sanatları', 'Gastronomi'],
    category: 'historical',
    duration: '1-2 gün',
    bestTime: 'Nisan-Ekim',
    highlights: ['Cinci Hanı', 'Eski Çarşı', 'Kent Tarihi Müzesi', 'Bulak Mağarası']
  },
  {
    id: 9,
    name: 'Çeşme',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    price: 'from ₺1,150',
    rating: 4.5,
    reviews: 6789,
    description: 'Ege&apos;nin incisi, rüzgar sörfü merkezi',
    activities: ['Plaj', 'Rüzgar Sörfü', 'Termal', 'Gece Hayatı'],
    category: 'beach',
    duration: '3-5 gün',
    bestTime: 'Mayıs-Ekim',
    highlights: ['Alaçatı', 'Ilıca Plajı', 'Çeşme Kalesi', 'Boyalık Plajı']
  },
  {
    id: 10,
    name: 'Fethiye',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0deeb?w=600&h=400&fit=crop',
    price: 'from ₺890',
    rating: 4.6,
    reviews: 8245,
    description: 'Turkuaz sular ve paragliding&apos;in merkezi',
    activities: ['Paragliding', 'Tekne Turu', 'Plaj', 'Dalış'],
    category: 'adventure',
    duration: '3-6 gün',
    bestTime: 'Nisan-Kasım',
    highlights: ['Ölüdeniz', 'Babadağ', 'Saklıkent Kanyonu', 'Kayaköy']
  },
  {
    id: 11,
    name: 'Amasya',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&h=400&fit=crop',
    price: 'from ₺520',
    rating: 4.4,
    reviews: 2156,
    description: 'Yeşilırmak kenarında tarihi Osmanlı şehri',
    activities: ['Tarihi Evler', 'Müzeler', 'Doğa', 'Kültür'],
    category: 'historical',
    duration: '1-2 gün',
    bestTime: 'Nisan-Ekim',
    highlights: ['Amasya Kalesi', 'Yalıboyu Evleri', 'Kral Mezarları', 'Hazeranlar Konağı']
  },
  {
    id: 12,
    name: 'Rize',
    country: 'Türkiye',
    image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=400&fit=crop',
    price: 'from ₺680',
    rating: 4.5,
    reviews: 3567,
    description: 'Yeşilin her tonunu sunan çay başkenti',
    activities: ['Çay Bahçeleri', 'Doğa', 'Trekking', 'Fotoğraf'],
    category: 'nature',
    duration: '2-3 gün',
    bestTime: 'Mayıs-Ekim',
    highlights: ['Ayder Yaylası', 'Çamlıhemşin', 'Zilkale', 'Fırtına Deresi']
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: MapPin },
  { id: 'historical', name: 'Tarihi', icon: Building },
  { id: 'nature', name: 'Doğa', icon: TreePine },
  { id: 'beach', name: 'Sahil', icon: Waves },
  { id: 'adventure', name: 'Macera', icon: Mountain },
];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.activities.some(activity => activity.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
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

  return (
    <>
      <Head>
        <title>Destinasyonlar - Ailydian Travel</title>
        <meta name="description" content="Dünya&apos;nın en güzel destinasyonlarını keşfedin. İstanbul&apos;dan Kapadokya&apos;ya, Antalya&apos;dan Bodrum&apos;a kadar..." />
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
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hayalinizdeki Destinasyonu Keşfedin
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Dünya&apos;nın en güzel yerlerinde unutulmaz anılar biriktirin
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Destinasyon ara..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(destination.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(destination.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">{destination.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {destination.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {destination.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {destination.activities.slice(0, 3).map((activity) => (
                      <span
                        key={activity}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">📅</span>
                      <span>{destination.bestTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Öne Çıkanlar:</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 2 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{destination.highlights.length - 2} daha
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {destination.reviews.toLocaleString()} değerlendirme
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Detaylar
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