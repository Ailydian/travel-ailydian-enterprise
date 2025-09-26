import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Expand,
  Compass,
  MapPin,
  Clock,
  Eye,
  Star,
  Share2,
  Download,
  Gamepad2,
  Headphones,
  Smartphone,
  Monitor
} from 'lucide-react';

interface VirtualTour {
  id: number;
  title: string;
  location: string;
  duration: string;
  views: string;
  rating: number;
  reviews: number;
  thumbnail: string;
  category: string;
  highlights: string[];
  description: string;
  vrSupport: boolean;
  audioGuide: boolean;
  languages: string[];
  featured: boolean;
  quality: '4K' | '8K' | 'HD';
}

const VirtualToursPage: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const categories = [
    { id: 'all', name: 'Tümü', icon: Gamepad2 },
    { id: 'historical', name: 'Tarihi Mekanlar', icon: Monitor },
    { id: 'natural', name: 'Doğal Güzellikler', icon: Eye },
    { id: 'cultural', name: 'Kültürel Mekanlar', icon: Star },
    { id: 'museums', name: 'Müzeler', icon: Headphones },
    { id: 'modern', name: 'Modern Şehirler', icon: Smartphone }
  ];

  const virtualTours: VirtualTour[] = [
    {
      id: 1,
      title: "Ayasofya Sanal Turu",
      location: "İstanbul, Türkiye",
      duration: "25 dakika",
      views: "1.2M",
      rating: 4.9,
      reviews: 15847,
      thumbnail: "/images/tours/hagia-sophia.jpg",
      category: "historical",
      highlights: ["360° görüntü", "Tarihi anlatım", "Zoom detayları", "İnteraktif harita"],
      description: "Bizans ve Osmanlı mimarisinin eşsiz eseri Ayasofya'yı sanal gerçeklikle keşfedin. İç mekan detaylarını 8K kalitede inceleyin.",
      vrSupport: true,
      audioGuide: true,
      languages: ["Türkçe", "İngilizce", "Arapça"],
      featured: true,
      quality: "8K"
    },
    {
      id: 2,
      title: "Kapadokya Vadileri VR Turu",
      location: "Nevşehir, Kapadokya",
      duration: "35 dakika",
      views: "890K",
      rating: 4.8,
      reviews: 12653,
      thumbnail: "/images/tours/cappadocia-vr.jpg",
      category: "natural",
      highlights: ["Peri bacaları", "Yeraltı şehirleri", "Balon perspektifi", "Gündoğumu simulasyonu"],
      description: "Kapadokya'nın büyülü vadilerini kuş bakışı perspektifle deneyimleyin. Sıcak hava balonundan görünüm simülasyonu dahil.",
      vrSupport: true,
      audioGuide: true,
      languages: ["Türkçe", "İngilizce", "Rusça"],
      featured: true,
      quality: "8K"
    },
    {
      id: 3,
      title: "Topkapı Sarayı Sanal Gezisi",
      location: "İstanbul, Türkiye",
      duration: "40 dakika",
      views: "756K",
      rating: 4.7,
      reviews: 9234,
      thumbnail: "/images/tours/topkapi-palace.jpg",
      category: "historical",
      highlights: ["Sultanlık odaları", "Hazine dairesi", "Harem bölümü", "İnci köşkü"],
      description: "600 yıl Osmanlı padişahlarına ev sahipliği yapmış Topkapı Sarayı'nın gizli odalarını keşfedin.",
      vrSupport: true,
      audioGuide: true,
      languages: ["Türkçe", "İngilizce", "Almanca"],
      featured: false,
      quality: "4K"
    },
    {
      id: 4,
      title: "Pamukkale Beyaz Cennet VR",
      location: "Denizli, Pamukkale",
      duration: "20 dakika",
      views: "634K",
      rating: 4.6,
      reviews: 7891,
      thumbnail: "/images/tours/pamukkale-vr.jpg",
      category: "natural",
      highlights: ["Termal havuzlar", "Beyaz travertenler", "Hierapolis antik kenti", "Cleopatra havuzu"],
      description: "Doğanın mucizesi beyaz travertenleri ve antik termal havuzları sanal gerçeklikle yaşayın.",
      vrSupport: true,
      audioGuide: true,
      languages: ["Türkçe", "İngilizce"],
      featured: true,
      quality: "4K"
    },
    {
      id: 5,
      title: "Efes Antik Kenti Sanal Keşfi",
      location: "İzmir, Efes",
      duration: "45 dakika",
      views: "523K",
      rating: 4.8,
      reviews: 6547,
      thumbnail: "/images/tours/ephesus-vr.jpg",
      category: "historical",
      highlights: ["Celsus kütüphanesi", "Büyük tiyatro", "Artemis tapınağı", "Roma yolları"],
      description: "Antik dünyanın en büyük şehirlerinden Efes'i zaman tünelinde geriye doğru yolculuk yaparak keşfedin.",
      vrSupport: true,
      audioGuide: true,
      languages: ["Türkçe", "İngilizce", "İtalyanca"],
      featured: false,
      quality: "8K"
    },
    {
      id: 6,
      title: "İstanbul Modern VR Müze",
      location: "İstanbul, Türkiye",
      duration: "30 dakika",
      views: "445K",
      rating: 4.5,
      reviews: 4532,
      thumbnail: "/images/tours/istanbul-modern.jpg",
      category: "museums",
      highlights: ["Çağdaş sanat eserleri", "İnteraktif sergiler", "Sanat tarihi anlatımı", "3D galeri turu"],
      description: "Türkiye'nin ilk modern ve çağdaş sanat müzesini sanal gerçeklikle deneyimleyin.",
      vrSupport: true,
      audioGuide: true,
      languages: ["Türkçe", "İngilizce"],
      featured: false,
      quality: "4K"
    }
  ];

  const filteredTours = virtualTours.filter(tour =>
    selectedCategory === 'all' || tour.category === selectedCategory
  );

  const handleTourSelect = (tour: VirtualTour) => {
    setSelectedTour(tour);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || Gamepad2;
  };

  return (
    <>
      <Head>
        <title>Sanal Turlar - Travel Ailydian</title>
        <meta name="description" content="Türkiye'nin en güzel destinasyonlarını VR ve 360° sanal turlarla keşfedin. 4K-8K kalitede immersive deneyimler." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-800 text-white py-20">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h1 className="text-5xl font-bold">Sanal Turlar</h1>
              </div>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Türkiye'nin tarih ve doğa harikalarını evinizin konforunda keşfedin. 
                VR destekli 360° turlarla immersive seyahat deneyimi yaşayın.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>4K-8K Kalite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  <span>Sesli Rehber</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  <span>VR Destekli</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  <span>Çoklu Platform</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Category Filters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategoriler</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour, index) => {
              const CategoryIcon = getCategoryIcon(tour.category);
              return (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleTourSelect(tour)}
                >
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600">
                      {/* Placeholder for video thumbnail */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {tour.featured && (
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                          Öne Çıkan
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        tour.quality === '8K' ? 'bg-red-500' : 
                        tour.quality === '4K' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {tour.quality}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      {tour.vrSupport && (
                        <div className="bg-purple-500 text-white p-2 rounded-full">
                          <Gamepad2 className="w-4 h-4" />
                        </div>
                      )}
                      {tour.audioGuide && (
                        <div className="bg-green-500 text-white p-2 rounded-full">
                          <Headphones className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {tour.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">
                        {categories.find(cat => cat.id === tour.category)?.name}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {tour.views} görüntüleme
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tour.rating}</span>
                        <span className="text-gray-500">({tour.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {tour.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {tour.languages.map((lang, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                        >
                          Turu Başlat
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* VR Modal */}
        {selectedTour && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-4xl h-full max-h-[80vh] overflow-hidden"
            >
              <div className="relative h-full flex flex-col">
                {/* Video Player */}
                <div className="relative flex-1 bg-black">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Gamepad2 className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{selectedTour.title}</h3>
                      <p className="text-lg opacity-90">VR Deneyimi Başlatılıyor...</p>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-full px-6 py-3 flex items-center gap-4">
                    <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <RotateCw className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <Expand className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedTour(null)}
                    className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Tour Info */}
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedTour.title}</h3>
                      <p className="text-gray-600">{selectedTour.location} • {selectedTour.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedTour.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default VirtualToursPage;