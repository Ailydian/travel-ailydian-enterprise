import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
  CheckCircle,
  Utensils
} from 'lucide-react';
import ResponsiveHeaderBar from '../components/layout/ResponsiveHeaderBar';
import { useCart } from '../context/CartContext';
import { EXPERIENCES_TURKEY } from '../data/experiences-turkey';

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
    { id: 'all', name: 'Tümü', icon: Sparkles, count: `${EXPERIENCES_TURKEY.length}` },
    { id: 'cultural', name: 'Kültürel', icon: Building, count: `${EXPERIENCES_TURKEY.filter(e => e.category === 'cultural').length}` },
    { id: 'adventure', name: 'Macera', icon: Mountain, count: `${EXPERIENCES_TURKEY.filter(e => e.category === 'adventure').length}` },
    { id: 'nature', name: 'Doğa', icon: TreePine, count: `${EXPERIENCES_TURKEY.filter(e => e.category === 'nature').length}` },
    { id: 'water-sports', name: 'Su Sporları', icon: Waves, count: `${EXPERIENCES_TURKEY.filter(e => e.category === 'water-sports').length}` },
    { id: 'photography', name: 'Fotoğraf', icon: Camera, count: `${EXPERIENCES_TURKEY.filter(e => e.category === 'photography').length}` },
    { id: 'culinary', name: 'Gastronomi', icon: Utensils, count: `${EXPERIENCES_TURKEY.filter(e => e.category === 'culinary').length}` }
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

  const experiences = EXPERIENCES_TURKEY.map(exp => ({
    id: exp.id,
    title: exp.title,
    location: exp.location,
    category: exp.category,
    durationFilter: exp.durationMinutes <= 180 ? 'short' : exp.durationMinutes <= 360 ? 'half' : exp.durationMinutes <= 720 ? 'full' : 'multi',
    priceRange: exp.pricing.adult <= 500 ? 'budget' : exp.pricing.adult <= 1500 ? 'mid' : 'premium',
    image: exp.images.hero,
    price: `₺${exp.pricing.adult}`,
    originalPrice: exp.originalPrice ? `₺${exp.originalPrice}` : undefined,
    rating: exp.rating,
    reviewCount: exp.reviewCount,
    duration: exp.duration,
    groupSize: `${exp.groupSize.max} kişi max`,
    badges: exp.tags.slice(0, 3),
    description: exp.shortDescription,
    highlights: exp.highlights,
    languages: exp.languages,
    slug: exp.slug
  }));

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
    // Save product info to localStorage and redirect to reservation page
    const productInfo = {
      id: experience.id,
      type: 'experience',
      name: experience.title,
      location: experience.location,
      image: experience.image,
      price: experience.price,
      originalPrice: experience.originalPrice,
      rating: experience.rating,
      reviews: experience.reviews,
      description: experience.description,
      duration: experience.duration,
      category: experience.category,
    };

    localStorage.setItem('selectedProduct', JSON.stringify(productInfo));
    router.push('/reservation');
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
        <title>Deneyimler - LyDian Travel | AI Destekli Seyahat Deneyimleri</title>
        <meta name="description" content="Türkiye'nin en unutulmaz deneyimlerini yaşayın. AI rehberli turlar, VR önizleme ve blockchain doğrulaması ile güvenli rezervasyon." />
        <meta name="keywords" content="deneyim, tur, aktivite, AI rehber, VR önizleme, blockchain, Türkiye" />
      </Head>

      <ResponsiveHeaderBar />

      {/* Return to Home Button */}
      <Link 
        href="/" 
        className="fixed top-24 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 text-gray-200 hover:bg-white/5 hover:text-lydian-primary transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Ana Sayfaya Dön</span>
      </Link>

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lydian-primary to-lydian-secondary py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                Unutulmaz Deneyimler
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
                AI rehberli turlar, VR önizlemeler ve blockchain doğrulaması ile güvenli rezervasyon
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Deneyim ara..."
                    className="w-full pl-10 sm:pl-12 pr-14 sm:pr-16 py-3 sm:py-4 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-lydian-primary text-white rounded-lg hover:bg-lydian-dark transition-colors">
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-transparent border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            {/* Categories */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Kategoriler</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-lydian-primary text-white'
                          : 'bg-gray-100 text-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="whitespace-nowrap">{category.name} ({category.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration and Price Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Süre</h3>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() => setSelectedDuration(duration.id)}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        selectedDuration === duration.id
                          ? 'bg-lydian-primary text-white'
                          : 'bg-gray-100 text-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {duration.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Fiyat Aralığı</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        priceRange === range.id
                          ? 'bg-lydian-primary text-white'
                          : 'bg-gray-100 text-gray-200 hover:bg-gray-200'
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
              <h2 className="text-2xl font-bold text-white">
                {filteredExperiences.length} Deneyim Bulundu
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent">
                <option>Popülerlik</option>
                <option>Fiyat (Düşük-Yüksek)</option>
                <option>Fiyat (Yüksek-Düşük)</option>
                <option>Puan</option>
                <option>Süre</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((experience) => (
                <Link
                  key={experience.id}
                  href={`/experiences/${experience.slug}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-transparent rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full"
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
                          className="px-2 py-1 bg-white/90 text-gray-100 rounded-full text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Heart */}
                    <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white/5 rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-gray-300" />
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

                    <h3 className="font-bold text-lg text-white mb-3 line-clamp-2">
                      {experience.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4">{experience.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
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
                      <h4 className="font-semibold text-sm text-white mb-2">Öne Çıkanlar:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
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
                      <span className="text-sm text-gray-300">Diller: </span>
                      <span className="text-sm font-medium text-white">
                        {experience.languages.join(', ')}
                      </span>
                    </div>

                    {/* Price and Book */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">{experience.price}</span>
                            {experience.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{experience.originalPrice}</span>
                            )}
                          </div>
                          <span className="text-sm text-gray-300">kişi başı</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Detayları Gör</span>
                        <span className="text-lydian-primary font-semibold group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-lydian-primary text-lydian-primary rounded-xl font-semibold hover:bg-lydian-primary hover:text-white transition-colors"
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