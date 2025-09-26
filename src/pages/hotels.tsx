import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Dumbbell, 
  Waves,
  Heart,
  Filter,
  Bot,
  Eye,
  ArrowLeft,
  Shield,
  Building
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

const HotelsPage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const hotels = [
    {
      id: 1,
      name: 'Boğaziçi Palace Hotel',
      location: 'Sultanahmet, İstanbul',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&q=90',
      price: '₺2,400',
      originalPrice: '₺3,000',
      rating: 4.8,
      reviews: 2341,
      amenities: ['WiFi', 'Havuz', 'Spa', 'Restoran', 'Otopark'],
      badge: 'AI Önerisi',
      description: 'Boğaziçi manzaralı lüks otel ve AI destekli konsiyerj servisi',
      features: ['VR Oda Turu', 'Akıllı Oda Kontrolü'],
      highlights: ['Blockchain güvenli rezervasyon', '24/7 AI destek', 'VR deneyimi']
    },
    {
      id: 2,
      name: 'Kapadokya Mağara Otel',
      location: 'Göreme, Kapadokya',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&q=90',
      price: '₺1,780',
      originalPrice: '₺2,200',
      rating: 4.9,
      reviews: 1567,
      amenities: ['WiFi', 'Restoran', 'Teras', 'Spa'],
      badge: 'VR Önizleme',
      description: 'Balon manzaralı eşsiz mağara otel ve sanal tur deneyimi',
      features: ['360° VR Önizleme', 'Drone Görüntüleri'],
      highlights: ['Otantik mağara odaları', 'Balon turu indirimi', 'Yerel rehber']
    },
    {
      id: 3,
      name: 'Modern City Suites',
      location: 'Taksim, İstanbul',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&q=90',
      price: '₺1,900',
      rating: 4.6,
      reviews: 892,
      amenities: ['WiFi', 'Spor Salonu', 'İş Merkezi', 'Bar'],
      badge: 'Teknoloji Dostu',
      description: 'Akıllı teknoloji ile donatılmış modern suites ve merkezi konum',
      features: ['Akıllı Check-in', 'AI Asistan'],
      highlights: ['Şehir merkezi konumu', 'Akıllı ev teknolojisi', 'İş seyahatleri için ideal']
    },
    {
      id: 4,
      name: 'Antalya Riviera Resort',
      location: 'Kemer, Antalya',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&q=90',
      price: '₺3,200',
      originalPrice: '₺4,000',
      rating: 4.7,
      reviews: 1834,
      amenities: ['WiFi', 'Havuz', 'Spa', 'Restoran', 'Plaj'],
      badge: 'Her Şey Dahil',
      description: 'Akdeniz kıyısında lüks resort, AI destekli aktivite önerileri',
      features: ['AI Aktivite Planı', 'VR Spa Turu'],
      highlights: ['Özel plaj', 'Suya dayalı sporlar', 'Çocuk kulübü']
    },
    {
      id: 5,
      name: 'Bodrum Marina Hotel',
      location: 'Bodrum Marina, Bodrum',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&q=90',
      price: '₺2,100',
      originalPrice: '₺2,600',
      rating: 4.6,
      reviews: 967,
      amenities: ['WiFi', 'Marina Manzarası', 'Restoran', 'Bar'],
      badge: 'Marina Manzarası',
      description: 'Marina kenarında boutique otel, tekne turları ve gece hayatı',
      features: ['Tekne Turu Rezervasyonu', 'Gece Hayatı Rehberi'],
      highlights: ['Marina manzarası', 'Tekne turları', 'Canlı gece hayatı']
    },
    {
      id: 6,
      name: 'Pamukkale Termal Spa',
      location: 'Pamukkale, Denizli',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&q=90',
      price: '₺1,550',
      originalPrice: '₺1,950',
      rating: 4.5,
      reviews: 743,
      amenities: ['WiFi', 'Termal Havuz', 'Spa', 'Restoran'],
      badge: 'Wellness Merkezi',
      description: 'Doğal termal sular ve wellness programları ile şifa bulun',
      features: ['Termal Tedavi', 'Wellness Programları'],
      highlights: ['Doğal termal sular', 'Spa tedavileri', 'Hierapolis antik kenti']
    }
  ];

  const amenityIcons: { [key: string]: React.ComponentType<any> } = {
    'WiFi': Wifi,
    'Havuz': Waves,
    'Spa': Heart,
    'Restoran': Utensils,
    'Otopark': Car,
    'Spor Salonu': Dumbbell,
    'Teras': Building,
    'İş Merkezi': Users,
    'Bar': Utensils,
    'Plaj': Waves,
    'Marina Manzarası': MapPin,
    'Termal Havuz': Waves
  };



  return (
    <>
      <Head>
        <title>Oteller - Ailydian Travel | AI Destekli Otel Rezervasyonu</title>
        <meta name="description" content="Türkiye'nin en güzel otellerinde konaklama. AI önerileri, VR önizleme ve blockchain güvenli rezervasyon." />
        <meta name="keywords" content="otel, konaklama, rezervasyon, AI önerisi, VR önizleme, blockchain, Türkiye" />
      </Head>

      <NavigationHeader />

      {/* Return to Home Button */}
      <Link 
        href="/" 
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:text-ailydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hayalinizdeki Oteli Bulun
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                AI önerileri, VR önizleme ve blockchain güvenli rezervasyon ile eşsiz konaklama deneyimi
              </p>
              
              {/* Search Form */}
              <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Nereye gidiyorsunuz?"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none"
                    >
                      <option value={1}>1 Misafir</option>
                      <option value={2}>2 Misafir</option>
                      <option value={3}>3 Misafir</option>
                      <option value={4}>4 Misafir</option>
                      <option value={5}>5+ Misafir</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-3 bg-white text-ailydian-primary rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    Otel Ara
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{hotels.length} Otel Bulundu</h2>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filtrele
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent">
                  <option>Popülerlik</option>
                  <option>Fiyat (Düşük-Yüksek)</option>
                  <option>Fiyat (Yüksek-Düşük)</option>
                  <option>Puan</option>
                  <option>Mesafe</option>
                </select>
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              {['AI Önerili', 'VR Önizleme', 'Lüks', 'Aile Dostu', 'Spa', 'Plaj'].map((filter) => (
                <button 
                  key={filter}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-ailydian-primary hover:text-white transition-colors text-sm"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: hotel.id * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-ailydian-primary text-white rounded-full text-sm font-medium">
                        {hotel.badge}
                      </span>
                    </div>

                    {/* Heart */}
                    <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Feature Buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {(hotel.features.includes('VR Oda Turu') || hotel.features.includes('360° VR Önizleme')) && (
                        <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {(hotel.features.includes('AI Asistan') || hotel.features.includes('Akıllı Oda Kontrolü')) && (
                        <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                          <Bot className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Shield className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>

                    <h3 className="font-bold text-xl text-gray-900 mb-2">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.features.map((feature) => (
                        <span key={feature} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Öne Çıkanlar:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {hotel.highlights.slice(0, 2).map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-3 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity) => {
                        const Icon = amenityIcons[amenity] || Wifi;
                        return (
                          <div key={amenity} className="flex items-center gap-1 text-gray-500" title={amenity}>
                            <Icon className="w-4 h-4" />
                          </div>
                        );
                      })}
                      {hotel.amenities.length > 4 && (
                        <span className="text-sm text-gray-500">+{hotel.amenities.length - 4} daha</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-gray-500 text-sm">({hotel.reviews} değerlendirme)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">{hotel.price}</span>
                          {hotel.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{hotel.originalPrice}</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">gecelik</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-ailydian-primary text-white rounded-lg font-medium hover:bg-ailydian-dark transition-colors"
                      >
                        Rezerve Et
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-ailydian-primary text-ailydian-primary rounded-xl font-semibold hover:bg-ailydian-primary hover:text-white transition-colors"
              >
                Daha Fazla Otel Yükle
              </motion.button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HotelsPage;
