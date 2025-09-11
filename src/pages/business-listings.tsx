import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Star, MapPin, Phone, Globe, Clock, Camera, Share, Heart, 
  Filter, Search, ChevronDown, ExternalLink, Award, Verified,
  Users, Calendar, TrendingUp, MessageSquare
} from 'lucide-react';
import ReviewSystem from '@/components/ReviewSystem';

// Comprehensive business data
const businesses = [
  {
    id: 'B001',
    name: 'Sultan Ahmet Camii (Mavi Cami)',
    category: 'Tarihi Yer',
    subcategory: 'Cami',
    location: 'Sultanahmet, Fatih, İstanbul',
    coordinates: { lat: 41.0054, lng: 28.9768 },
    rating: 4.8,
    reviewCount: 89247,
    priceLevel: 'Ücretsiz',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&q=90',
    images: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&q=90',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&q=90',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&q=90'
    ],
    description: 'Osmanlı mimarisinin en güzel örneklerinden biri olan Sultan Ahmet Camii, mavi çinileriyle ünlü İstanbul\\'un simge yapılarından.',
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '09:00-17:00',
      sunday: '09:00-17:00'
    },
    contact: {
      phone: '+90 212 518 1330',
      website: 'https://sultanahmetcamii.org',
      address: 'Sultan Ahmet, Atmeydanı Cd. No:7, 34122 Fatih/İstanbul'
    },
    features: ['Ücretsiz Giriş', 'Rehberli Tur', 'Fotoğraf Çekimi', 'Engelli Erişimi'],
    awards: ['TripAdvisor Mükemmellik Sertifikası', 'UNESCO Dünya Mirası'],
    businessHours: 'Günlük 09:00-17:00 (Namaz saatleri hariç)',
    languages: ['Türkçe', 'İngilizce', 'Arapça'],
    verified: true,
    claimStatus: 'claimed',
    monthlyViews: 245000,
    bookingUrl: '/booking/sultan-ahmet-mosque'
  },
  {
    id: 'B002',
    name: 'Pandeli Restaurant',
    category: 'Restoran',
    subcategory: 'Osmanlı Mutfağı',
    location: 'Eminönü, Fatih, İstanbul',
    coordinates: { lat: 41.0176, lng: 28.9706 },
    rating: 4.6,
    reviewCount: 3247,
    priceLevel: '₺₺₺',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&q=90',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&q=90',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&q=90'
    ],
    description: '1901 yılından beri Osmanlı ve Türk mutfağının en seçkin lezzetlerini sunan tarihi restoran.',
    openingHours: {
      monday: '12:00-22:00',
      tuesday: '12:00-22:00',
      wednesday: '12:00-22:00',
      thursday: '12:00-22:00',
      friday: '12:00-22:00',
      saturday: '12:00-22:00',
      sunday: 'Kapalı'
    },
    contact: {
      phone: '+90 212 527 3909',
      website: 'https://pandeli.com.tr',
      address: 'Mısır Çarşısı No:1, Eminönü, 34116 Fatih/İstanbul'
    },
    features: ['Rezervasyon Gerekli', 'Alkollü İçecek', 'Kredi Kartı', 'Vale Hizmeti'],
    cuisine: 'Osmanlı Mutfağı',
    averagePrice: '150-250₺',
    specialties: ['Kuzu Tandır', 'İmam Bayıldı', 'Baklava'],
    verified: true,
    claimStatus: 'claimed',
    monthlyViews: 45000,
    bookingUrl: '/booking/pandeli-restaurant'
  },
  {
    id: 'B003',
    name: 'Four Seasons Hotel Sultanahmet',
    category: 'Konaklama',
    subcategory: 'Lüks Otel',
    location: 'Sultanahmet, Fatih, İstanbul',
    coordinates: { lat: 41.0065, lng: 28.9774 },
    rating: 4.9,
    reviewCount: 2847,
    priceLevel: '₺₺₺₺',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&q=90',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&q=90',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&q=90'
    ],
    description: 'İstanbul\\'un tarihi yarımadasında bulunan lüks konaklama deneyimi.',
    openingHours: {
      monday: '24 Saat',
      tuesday: '24 Saat',
      wednesday: '24 Saat',
      thursday: '24 Saat',
      friday: '24 Saat',
      saturday: '24 Saat',
      sunday: '24 Saat'
    },
    contact: {
      phone: '+90 212 638 8200',
      website: 'https://fourseasons.com/istanbul',
      address: 'Tevkifhane Sk. No:1, 34122 Sultanahmet/Fatih/İstanbul'
    },
    features: ['Spa', 'Fitness Center', 'Concierge', 'Room Service', 'Valet Parking'],
    roomTypes: ['Standard Room', 'Deluxe Room', 'Suite', 'Presidential Suite'],
    amenities: ['WiFi', 'Kahvaltı', 'Havuz', 'Spa', 'Restoran'],
    checkInOut: 'Giriş: 15:00 / Çıkış: 12:00',
    verified: true,
    claimStatus: 'claimed',
    monthlyViews: 78000,
    bookingUrl: '/booking/four-seasons-sultanahmet'
  }
];

// Mock review data
const mockReviews = [
  {
    id: 'R001',
    userId: 'U001',
    userName: 'Ahmet Yılmaz',
    rating: 5,
    title: 'Muhteşem bir deneyim!',
    content: 'İstanbul\\'a geldiğimde mutlaka ziyaret ettiğim yer. Tarihi dokusu ve mimarisi gerçekten büyüleyici.',
    date: '2025-01-10',
    location: 'İstanbul, Türkiye',
    verified: true,
    helpful: 45,
    notHelpful: 2,
    visitType: 'Family' as const,
    visitDate: '2025-01-05'
  },
  {
    id: 'R002',
    userId: 'U002',
    userName: 'Sarah Johnson',
    rating: 4,
    title: 'Beautiful architecture',
    content: 'One of the most beautiful mosques I have visited. The blue tiles are absolutely stunning.',
    date: '2025-01-08',
    location: 'New York, USA',
    verified: true,
    helpful: 32,
    notHelpful: 1,
    visitType: 'Solo' as const,
    visitDate: '2025-01-03'
  }
];

export default function BusinessListings() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const categories = [
    { id: 'all', name: 'Tümü', count: businesses.length },
    { id: 'restaurant', name: 'Restoranlar', count: businesses.filter(b => b.category === 'Restoran').length },
    { id: 'hotel', name: 'Oteller', count: businesses.filter(b => b.category === 'Konaklama').length },
    { id: 'attraction', name: 'Turistik Yerler', count: businesses.filter(b => b.category === 'Tarihi Yer').length }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'restaurant' && business.category === 'Restoran') ||
                           (selectedCategory === 'hotel' && business.category === 'Konaklama') ||
                           (selectedCategory === 'attraction' && business.category === 'Tarihi Yer');
    return matchesSearch && matchesCategory;
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popularity':
        return b.monthlyViews - a.monthlyViews;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => (
    <div className=\"flex items-center\">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className=\"ml-1 text-sm text-gray-600 dark:text-gray-400\">
        {rating.toFixed(1)}
      </span>
    </div>
  );

  return (
    <>
      <Head>
        <title>İşletme Rehberi - Ailydian Travel</title>
        <meta name=\"description\" content=\"Türkiye'nin en kapsamlı işletme ve turistik yer rehberi\" />
      </Head>

      <div className=\"min-h-screen bg-gray-50 dark:bg-gray-900\">
        {/* Header */}
        <div className=\"bg-white dark:bg-gray-800 shadow-sm border-b\">
          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4\">
            <div className=\"flex items-center justify-between\">
              <Link href=\"/\" className=\"text-2xl font-bold text-blue-600\">
                Ailydian Travel
              </Link>
              <nav className=\"hidden md:flex space-x-8\">
                <Link href=\"/\" className=\"text-gray-600 hover:text-blue-600\">Ana Sayfa</Link>
                <Link href=\"/destinations\" className=\"text-gray-600 hover:text-blue-600\">Destinasyonlar</Link>
                <Link href=\"/hotels\" className=\"text-gray-600 hover:text-blue-600\">Oteller</Link>
                <Link href=\"/restaurants\" className=\"text-gray-600 hover:text-blue-600\">Restoranlar</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className=\"bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16\">
          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center\">
            <h1 className=\"text-4xl md:text-5xl font-bold mb-6\">
              İşletme Rehberi
            </h1>
            <p className=\"text-xl mb-8 text-blue-100 max-w-3xl mx-auto\">
              Türkiye'nin en güvenilir işletme rehberi. Gerçek yorumlarla en iyi restoranları, 
              otelleri ve turistik yerleri keşfedin.
            </p>
            <div className=\"bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto\">
              <div className=\"flex items-center justify-center space-x-8 text-center\">
                <div>
                  <div className=\"text-3xl font-bold\">{businesses.length}</div>
                  <div className=\"text-blue-200\">Kayıtlı İşletme</div>
                </div>
                <div>
                  <div className=\"text-3xl font-bold\">
                    {businesses.reduce((sum, b) => sum + b.reviewCount, 0).toLocaleString()}
                  </div>
                  <div className=\"text-blue-200\">Gerçek Yorum</div>
                </div>
                <div>
                  <div className=\"text-3xl font-bold\">4.7</div>
                  <div className=\"text-blue-200\">Ortalama Puan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className=\"bg-white dark:bg-gray-800 shadow-sm py-6\">
          <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
            <div className=\"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4\">
              {/* Search */}
              <div className=\"flex-1 max-w-md\">
                <div className=\"relative\">
                  <Search className=\"absolute left-3 top-3 h-4 w-4 text-gray-400\" />
                  <input
                    type=\"text\"
                    placeholder=\"İşletme adı veya konum ara...\"
                    className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white\"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className=\"flex flex-wrap gap-2\">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${\n                      selectedCategory === category.id\n                        ? 'bg-blue-600 text-white'\n                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'\n                    }`}
                  >\n                    {category.name} ({category.count})\n                  </button>\n                ))}\n              </div>\n\n              {/* Sort */}\n              <div className=\"flex items-center space-x-2\">\n                <span className=\"text-sm text-gray-600 dark:text-gray-400\">Sırala:</span>\n                <select\n                  value={sortBy}\n                  onChange={(e) => setSortBy(e.target.value)}\n                  className=\"px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500\"\n                >\n                  <option value=\"rating\">En Yüksek Puan</option>\n                  <option value=\"reviews\">En Çok Yorumlanan</option>\n                  <option value=\"name\">İsim A-Z</option>\n                  <option value=\"popularity\">En Popüler</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        {/* Business Listings */}\n        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">\n          <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">\n            {/* Main Content */}\n            <div className=\"lg:col-span-2 space-y-6\">\n              {sortedBusinesses.map((business) => (\n                <div key={business.id} className=\"bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow\">\n                  <div className=\"flex flex-col md:flex-row\">\n                    {/* Image */}\n                    <div className=\"md:w-80 h-48 md:h-auto relative\">\n                      <img\n                        src={business.image}\n                        alt={business.name}\n                        className=\"w-full h-full object-cover\"\n                      />\n                      <div className=\"absolute top-3 left-3 flex space-x-2\">\n                        {business.verified && (\n                          <span className=\"bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center\">\n                            <Verified className=\"h-3 w-3 mr-1\" />\n                            Doğrulanmış\n                          </span>\n                        )}\n                        {business.awards && business.awards.length > 0 && (\n                          <span className=\"bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center\">\n                            <Award className=\"h-3 w-3 mr-1\" />\n                            Ödüllü\n                          </span>\n                        )}\n                      </div>\n                      <div className=\"absolute top-3 right-3 flex space-x-1\">\n                        <button className=\"p-2 bg-white/90 rounded-full hover:bg-white transition-colors\">\n                          <Heart className=\"h-4 w-4 text-gray-600\" />\n                        </button>\n                        <button className=\"p-2 bg-white/90 rounded-full hover:bg-white transition-colors\">\n                          <Share className=\"h-4 w-4 text-gray-600\" />\n                        </button>\n                      </div>\n                    </div>\n\n                    {/* Content */}\n                    <div className=\"flex-1 p-6\">\n                      <div className=\"flex items-start justify-between mb-3\">\n                        <div>\n                          <h3 className=\"text-xl font-bold text-gray-900 dark:text-white mb-1\">\n                            {business.name}\n                          </h3>\n                          <div className=\"flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2\">\n                            <span className=\"px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs mr-2\">\n                              {business.category}\n                            </span>\n                            <MapPin className=\"h-4 w-4 mr-1\" />\n                            {business.location}\n                          </div>\n                        </div>\n                        <div className=\"text-right\">\n                          {renderStars(business.rating)}\n                          <div className=\"text-sm text-gray-600 dark:text-gray-400\">\n                            {business.reviewCount.toLocaleString()} yorum\n                          </div>\n                        </div>\n                      </div>\n\n                      <p className=\"text-gray-700 dark:text-gray-300 mb-4 line-clamp-2\">\n                        {business.description}\n                      </p>\n\n                      <div className=\"flex flex-wrap gap-2 mb-4\">\n                        {business.features.slice(0, 3).map((feature) => (\n                          <span\n                            key={feature}\n                            className=\"px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full\"\n                          >\n                            {feature}\n                          </span>\n                        ))}\n                        {business.features.length > 3 && (\n                          <span className=\"px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full\">\n                            +{business.features.length - 3} daha\n                          </span>\n                        )}\n                      </div>\n\n                      <div className=\"flex items-center justify-between\">\n                        <div className=\"flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400\">\n                          <div className=\"flex items-center\">\n                            <Clock className=\"h-4 w-4 mr-1\" />\n                            {business.openingHours.monday !== '24 Saat' ? 'Açık' : '24 Saat'}\n                          </div>\n                          <div className=\"flex items-center\">\n                            <TrendingUp className=\"h-4 w-4 mr-1\" />\n                            {(business.monthlyViews / 1000).toFixed(0)}K görüntülenme\n                          </div>\n                          <div className=\"font-semibold text-green-600\">\n                            {business.priceLevel}\n                          </div>\n                        </div>\n                        \n                        <div className=\"flex space-x-2\">\n                          <button\n                            onClick={() => {\n                              setSelectedBusiness(business);\n                              setShowReviews(true);\n                            }}\n                            className=\"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center\"\n                          >\n                            <MessageSquare className=\"h-4 w-4 mr-1\" />\n                            Yorumlar\n                          </button>\n                          {business.bookingUrl && (\n                            <Link\n                              href={business.bookingUrl}\n                              className=\"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold\"\n                            >\n                              Rezervasyon\n                            </Link>\n                          )}\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              ))}\n            </div>\n\n            {/* Sidebar */}\n            <div className=\"lg:col-span-1\">\n              <div className=\"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6\">\n                <h3 className=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">\n                  İstatistikler\n                </h3>\n                <div className=\"space-y-4\">\n                  <div className=\"flex items-center justify-between\">\n                    <span className=\"text-gray-600 dark:text-gray-400\">Toplam İşletme</span>\n                    <span className=\"font-bold text-blue-600\">{businesses.length}</span>\n                  </div>\n                  <div className=\"flex items-center justify-between\">\n                    <span className=\"text-gray-600 dark:text-gray-400\">Toplam Yorum</span>\n                    <span className=\"font-bold text-blue-600\">\n                      {businesses.reduce((sum, b) => sum + b.reviewCount, 0).toLocaleString()}\n                    </span>\n                  </div>\n                  <div className=\"flex items-center justify-between\">\n                    <span className=\"text-gray-600 dark:text-gray-400\">Ortalama Puan</span>\n                    <span className=\"font-bold text-yellow-600\">\n                      {(businesses.reduce((sum, b) => sum + b.rating, 0) / businesses.length).toFixed(1)}\n                    </span>\n                  </div>\n                </div>\n\n                <div className=\"mt-8\">\n                  <h4 className=\"font-semibold text-gray-900 dark:text-white mb-3\">\n                    Popüler Kategoriler\n                  </h4>\n                  <div className=\"space-y-2\">\n                    {categories.slice(1).map((category) => (\n                      <button\n                        key={category.id}\n                        onClick={() => setSelectedCategory(category.id)}\n                        className=\"w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors\"\n                      >\n                        <div className=\"flex items-center justify-between\">\n                          <span className=\"text-gray-700 dark:text-gray-300\">{category.name}</span>\n                          <span className=\"text-sm text-gray-500\">{category.count}</span>\n                        </div>\n                      </button>\n                    ))}\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        {/* Review Modal */}\n        {showReviews && selectedBusiness && (\n          <div className=\"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4\">\n            <div className=\"bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto\">\n              <div className=\"p-6\">\n                <div className=\"flex items-center justify-between mb-6\">\n                  <div>\n                    <h2 className=\"text-2xl font-bold text-gray-900 dark:text-white\">\n                      {selectedBusiness.name}\n                    </h2>\n                    <p className=\"text-gray-600 dark:text-gray-400\">\n                      {selectedBusiness.location}\n                    </p>\n                  </div>\n                  <button\n                    onClick={() => {\n                      setShowReviews(false);\n                      setSelectedBusiness(null);\n                    }}\n                    className=\"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl\"\n                  >\n                    ×\n                  </button>\n                </div>\n                \n                <ReviewSystem\n                  itemId={selectedBusiness.id}\n                  itemType={selectedBusiness.category === 'Restoran' ? 'restaurant' : \n                           selectedBusiness.category === 'Konaklama' ? 'hotel' : 'destination'}\n                  reviews={mockReviews}\n                  averageRating={selectedBusiness.rating}\n                  totalReviews={selectedBusiness.reviewCount}\n                  onAddReview={(review) => console.log('New review:', review)}\n                />\n              </div>\n            </div>\n          </div>\n        )}\n      </div>\n    </>\n  );\n}