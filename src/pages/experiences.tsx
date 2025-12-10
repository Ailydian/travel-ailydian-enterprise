import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Star,
  Heart,
  Clock,
  Users,
  ArrowLeft,
  Filter,
  Camera,
  Mountain,
  Waves,
  Building,
  TreePine,
  Sparkles,
  Play,
  ShoppingCart,
  CheckCircle
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';
import { useCart } from '../context/CartContext';

const ExperiencesPage: React.FC = () => {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = [
    { id: 'all', name: 'Tümü', icon: Sparkles, count: '2,500+' },
    { id: 'cultural', name: 'Kültürel', icon: Building, count: '850+' },
    { id: 'adventure', name: 'Macera', icon: Mountain, count: '650+' },
    { id: 'nature', name: 'Doğa', icon: TreePine, count: '480+' },
    { id: 'water', name: 'Su Sporları', icon: Waves, count: '320+' },
    { id: 'photography', name: 'Fotoğraf', icon: Camera, count: '200+' }
  ];

  const durations = [
    { id: 'all', name: 'Tüm Süreler' },
    { id: 'short', name: '1-3 saat' },
    { id: 'half', name: 'Yarım gün' },
    { id: 'full', name: 'Tam gün' },
    { id: 'multi', name: 'Çok günlük' }
  ];

  const priceRanges = [
    { id: 'all', name: 'Tüm Fiyatlar' },
    { id: 'budget', name: '₺0 - ₺100' },
    { id: 'mid', name: '₺100 - ₺300' },
    { id: 'premium', name: '₺300+' }
  ];

  const experiences = [
    {
      id: 1,
      title: 'İstanbul: AI Rehberli Boğaz Turu ve VR Deneyimi',
      location: 'İstanbul, Türkiye',
      category: 'cultural',
      durationFilter: 'half',
      priceRange: 'mid',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&q=90',
      price: '₺150',
      originalPrice: '₺200',
      rating: 4.9,
      reviewCount: 3247,
      duration: '3 saat',
      groupSize: '12 kişi max',
      badges: ['AI Rehberli', 'VR Önizleme', 'Çok Satan'],
      description: 'Boğaz\'ın eşsiz güzelliklerini AI rehber eşliğinde keşfedin.',
      highlights: [
        'Canlı AI rehber anlatımı',
        'VR teknolojisi ile tarihi yeniden yaşayın',
        'Professional fotoğraf çekimi',
        'İkramlar dahil'
      ],
      languages: ['Türkçe', 'İngilizce', 'Almanca']
    },
    {
      id: 2,
      title: 'Kapadokya: Blockchain Doğrulamalı Balon Turu',
      location: 'Kapadokya, Türkiye',
      category: 'adventure',
      durationFilter: 'half',
      priceRange: 'premium',
      image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&q=90',
      price: '₺450',
      originalPrice: '₺550',
      rating: 4.8,
      reviewCount: 1856,
      duration: '4 saat',
      groupSize: '8 kişi max',
      badges: ['Blockchain Doğrulamalı', 'Lüks Deneyim', 'Küçük Grup'],
      description: 'Peri bacaları üzerinde unutulmaz bir gündoğumu deneyimi.',
      highlights: [
        'Gündoğumu uçuşu garantili',
        'Blockchain sertifikası ile doğrulanmış pilot',
        'Şampanyalı kutlama',
        'Otel transfer servisi'
      ],
      languages: ['Türkçe', 'İngilizce', 'Rusça']
    },
    {
      id: 3,
      title: 'Antalya: Sualtı Fotoğrafçılığı Workshop\'u',
      location: 'Antalya, Türkiye',
      category: 'photography',
      durationFilter: 'full',
      priceRange: 'mid',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&q=90',
      price: '₺280',
      originalPrice: '₺350',
      rating: 4.7,
      reviewCount: 892,
      duration: '7 saat',
      groupSize: '6 kişi max',
      badges: ['Profesyonel Eğitmen', 'Ekipman Dahil', 'Workshop'],
      description: 'Akdeniz\'in berrak sularında profesyonel sualtı fotoğrafçılığını öğrenin.',
      highlights: [
        'Profesyonel sualtı kamerası eğitimi',
        'PADI sertifikalı eğitmen',
        'Antik kalıntı fotoğrafları',
        'Özel düzenleme teknikleri'
      ],
      languages: ['Türkçe', 'İngilizce']
    },
    {
      id: 4,
      title: 'Pamukkale: Termal Wellness ve Meditasyon',
      location: 'Pamukkale, Türkiye',
      category: 'nature',
      durationFilter: 'full',
      priceRange: 'mid',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&q=90',
      price: '₺195',
      originalPrice: '₺250',
      rating: 4.6,
      reviewCount: 1547,
      duration: '6 saat',
      groupSize: '15 kişi max',
      badges: ['Wellness', 'Termal Su', 'Rehberli'],
      description: 'Doğal termal sularda rahatlayın ve iç huzurunuzu bulun.',
      highlights: [
        'Doğal termal havuzlarda yüzme',
        'Profesyonel spa masajı',
        'Yoga ve meditasyon seansı',
        'Organik öğle yemeği'
      ],
      languages: ['Türkçe', 'İngilizce']
    },
    {
      id: 5,
      title: 'Bodrum: Gece Marina Turu ve Deniz Ürünleri',
      location: 'Bodrum, Türkiye',
      category: 'cultural',
      durationFilter: 'half',
      priceRange: 'mid',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400&h=300&q=90',
      price: '₺125',
      originalPrice: '₺180',
      rating: 4.5,
      reviewCount: 723,
      duration: '4 saat',
      groupSize: '20 kişi max',
      badges: ['Gece Turu', 'Gastronomi', 'Deniz Ürünleri'],
      description: 'Marina\'nın büyülü gece atmosferinde deniz ürünleri tadımı.',
      highlights: [
        'Marina\'nın ışıklı manzarası',
        'Taze deniz ürünleri menüsü',
        'Yerel müzik performansı',
        'Bodrum Kalesi gezisi'
      ],
      languages: ['Türkçe', 'İngilizce']
    },
    {
      id: 6,
      title: 'Trabzon: Uzungöl Doğa Fotoğrafçılığı',
      location: 'Trabzon, Türkiye',
      category: 'photography',
      durationFilter: 'multi',
      priceRange: 'mid',
      image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=400&h=300&q=90',
      price: '₺320',
      originalPrice: '₺420',
      rating: 4.8,
      reviewCount: 456,
      duration: '2 gün',
      groupSize: '8 kişi max',
      badges: ['2 Gün', 'Doğa Fotoğrafı', 'Uzman Rehber'],
      description: 'Karadeniz\'in yeşil cennetinde doğa fotoğrafçılığının inceliklerini öğrenin.',
      highlights: [
        'Gündoğumu ve günbatımı çekimleri',
        'Yerel yaşam fotoğrafları',
        'Profesyonel ekipman kullanımı',
        'Yöresel lezzetler'
      ],
      languages: ['Türkçe']
    }
  ];

  // Cart handler functions
  const handleAddToCart = (experience: typeof experiences[0]) => {
    const priceValue = parseFloat(experience.price.replace('₺', '').replace(',', ''));
    addItem({
      id: `experience-${experience.id}`,
      type: 'tour',
      title: experience.title,
      description: experience.description,
      image: experience.image,
      price: priceValue,
      originalPrice: experience.originalPrice ? parseFloat(experience.originalPrice.replace('₺', '').replace(',', '')) : undefined,
      currency: 'TRY',
      quantity: 1,
      location: experience.location,
      rating: experience.rating,
      duration: experience.duration,
      isRefundable: true,
      cancellationPolicy: 'Ücretsiz iptal: 24 saat öncesine kadar'
    });
    setToastMessage(`${experience.title} sepete eklendi!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReserve = (experience: typeof experiences[0]) => {
    handleAddToCart(experience);
    setTimeout(() => router.push('/cart'), 500);
  };

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || experience.durationFilter === selectedDuration;
    const matchesPrice = priceRange === 'all' || experience.priceRange === priceRange;
    
    return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
  });

  return (
    <>
      <Head>
        <title>Deneyimler - Ailydian Travel | AI Destekli Seyahat Deneyimleri</title>
        <meta name="description" content="Türkiye'nin en unutulmaz deneyimlerini yaşayın. AI rehberli turlar, VR önizleme ve blockchain doğrulaması ile güvenli rezervasyon." />
        <meta name="keywords" content="deneyim, tur, aktivite, AI rehber, VR önizleme, blockchain, Türkiye" />
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
                Unutulmaz Deneyimler
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                AI rehberli turlar, VR önizlemeler ve blockchain doğrulaması ile güvenli rezervasyon
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Deneyim ara..."
                    className="w-full pl-12 pr-16 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-ailydian-primary text-white rounded-lg hover:bg-ailydian-dark transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Kategoriler</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-ailydian-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name} ({category.count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration and Price Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Süre</h3>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() => setSelectedDuration(duration.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDuration === duration.id
                          ? 'bg-ailydian-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Fiyat Aralığı</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        priceRange === range.id
                          ? 'bg-ailydian-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredExperiences.length} Deneyim Bulundu
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent">
                <option>Popülerlik</option>
                <option>Fiyat (Düşük-Yüksek)</option>
                <option>Fiyat (Yüksek-Düşük)</option>
                <option>Puan</option>
                <option>Süre</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: experience.id * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {experience.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 bg-white/90 text-gray-800 rounded-full text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Heart */}
                    <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* VR Preview Button */}
                    <button className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">VR Önizleme</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                      {experience.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">{experience.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{experience.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{experience.rating} ({experience.reviewCount})</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Öne Çıkanlar:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {experience.highlights.slice(0, 2).map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <span className="text-sm text-gray-600">Diller: </span>
                      <span className="text-sm font-medium text-gray-900">
                        {experience.languages.join(', ')}
                      </span>
                    </div>

                    {/* Price and Book */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">{experience.price}</span>
                            {experience.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{experience.originalPrice}</span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">kişi başı</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(experience)}
                          className="flex-1 px-4 py-2 border-2 border-ailydian-primary text-ailydian-primary rounded-lg font-medium hover:bg-ailydian-primary/10 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Sepete Ekle
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReserve(experience)}
                          className="flex-1 px-4 py-2 bg-ailydian-primary text-white rounded-lg font-medium hover:bg-ailydian-dark transition-colors"
                        >
                          Rezerve Et
                        </motion.button>
                      </div>
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
                Daha Fazla Deneyim Yükle
              </motion.button>
            </div>
          </div>
        </section>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default ExperiencesPage;