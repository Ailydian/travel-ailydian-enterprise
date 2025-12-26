import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Shield,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Calendar,
  MapPin,
  User,
  Award,
  Image,
  ExternalLink,
  Eye,
  MessageCircle,
  TrendingUp,
  Filter,
  X,
  Search,
  Plus
} from 'lucide-react';

interface DecentralizedReview {
  id: string;
  reviewer: {
    address: string;
    nickname: string;
    reputation: number;
    totalReviews: number;
    verifiedTraveler: boolean;
  };
  businessId: string;
  businessName: string;
  businessType: 'hotel' | 'restaurant' | 'attraction' | 'transport';
  rating: number;
  title: string;
  content: string;
  images: string[];
  timestamp: Date;
  votes: {
    helpful: number;
    notHelpful: number;
  };
  isVerified: boolean;
  nftProof?: {
    tokenId: number;
    contractAddress: string;
    metadata: string;
  };
  location: {
    city: string;
    country: string;
  };
  tags: string[];
  response?: {
    from: string;
    content: string;
    timestamp: Date;
  };
}

const DecentralizedReviews: React.FC = () => {
  const [reviews, setReviews] = useState<DecentralizedReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<DecentralizedReview | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'nft-proof'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'helpful'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock reviews data
  const mockReviews: DecentralizedReview[] = [
    {
      id: '1',
      reviewer: {
        address: '0x742d35C4e7b77d3B2E4B19e1a6B0c4b5e6C7d8E9',
        nickname: 'CryptoTraveler',
        reputation: 4.8,
        totalReviews: 23,
        verifiedTraveler: true
      },
      businessId: 'hotel-001',
      businessName: 'Kapadokya Cave Hotel',
      businessType: 'hotel',
      rating: 5,
      title: 'Muhteşem bir deneyim!',
      content: 'Bu otel gerçekten benzersizdi. Mağara odaları çok otantik ve temizdi. Personel son derece yardımseverdi. Balon turunu izlemek için mükemmel bir konum. Kesinlikle tavsiye ederim!',
      images: [
        'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&q=90',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&q=90'
      ],
      timestamp: new Date('2024-03-10'),
      votes: {
        helpful: 15,
        notHelpful: 2
      },
      isVerified: true,
      nftProof: {
        tokenId: 1001,
        contractAddress: '0x742d35C4e7b77d3B2E4B19e1a6B0c4b5e6C7d8E9',
        metadata: 'ipfs://QmX4n8m2v...'
      },
      location: {
        city: 'Göreme',
        country: 'Türkiye'
      },
      tags: ['luxury', 'authentic', 'romantic', 'breakfast'],
      response: {
        from: 'Otel Yönetimi',
        content: 'Değerli görüşleriniz için teşekkür ederiz! Sizin gibi misafirleri ağırlamak bizim için büyük bir mutluluk.',
        timestamp: new Date('2024-03-11')
      }
    },
    {
      id: '2',
      reviewer: {
        address: '0xA1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0',
        nickname: 'BlockchainExplorer',
        reputation: 4.6,
        totalReviews: 31,
        verifiedTraveler: true
      },
      businessId: 'restaurant-001',
      businessName: 'Santorini Sunset Restaurant',
      businessType: 'restaurant',
      rating: 4,
      title: 'Harika manzara, makul fiyat',
      content: 'Restoran gün batımı manzarası için mükemmel. Yemekler lezzetliydi ama çok pahalı değil. Servis biraz yavaştı ama manzara bunu telafi ediyor.',
      images: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&q=90'
      ],
      timestamp: new Date('2024-02-25'),
      votes: {
        helpful: 8,
        notHelpful: 1
      },
      isVerified: true,
      location: {
        city: 'Oia',
        country: 'Yunanistan'
      },
      tags: ['sunset', 'seafood', 'expensive', 'view']
    },
    {
      id: '3',
      reviewer: {
        address: '0xC1d2E3f4A5b6C7d8E9f0A1b2C3d4E5f6A7b8C9d0',
        nickname: 'NFTCollector',
        reputation: 4.9,
        totalReviews: 45,
        verifiedTraveler: true
      },
      businessId: 'attraction-001',
      businessName: 'Ayasofya Müzesi',
      businessType: 'attraction',
      rating: 5,
      title: 'Tarihin derinliklerinde bir yolculuk',
      content: 'Ayasofya gerçekten nefes kesici. Hem Bizans hem de Osmanlı mimarisini bir arada görmek büyüleyici. Rehberli tur almanızı tavsiye ederim.',
      images: [],
      timestamp: new Date('2024-01-15'),
      votes: {
        helpful: 12,
        notHelpful: 0
      },
      isVerified: false,
      location: {
        city: 'İstanbul',
        country: 'Türkiye'
      },
      tags: ['historic', 'architecture', 'cultural', 'guide-recommended']
    }
  ];

  useEffect(() => {
    // Simulate loading reviews
    setIsLoading(true);
    setTimeout(() => {
      setReviews(mockReviews);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getFilteredAndSortedReviews = () => {
    let filtered = reviews;

    // Apply filter
    if (filter === 'verified') {
      filtered = filtered.filter(review => review.isVerified);
    } else if (filter === 'nft-proof') {
      filtered = filtered.filter(review => review.nftProof);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.votes.helpful - a.votes.helpful);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
    }

    return filtered;
  };

  const getBusinessTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'restaurant': return '🍽️';
      case 'attraction': return '🎯';
      case 'transport': return '🚗';
      default: return '📍';
    }
  };

  const getBusinessTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-blue-100 text-blue-700';
      case 'restaurant': return 'bg-orange-100 text-orange-700';
      case 'attraction': return 'bg-purple-100 text-purple-700';
      case 'transport': return 'bg-green-100 text-green-700';
      default: return 'bg-white/10 text-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const ReviewCard: React.FC<{ review: DecentralizedReview }> = ({ review }) => (
    <div className="bg-white/5 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all" onClick={() => setSelectedReview(review)}>
      <motion.div
        layoutId={review.id}
        whileHover={{ y: -4 }}
        style={{ width: '100%' }}
      >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
            {review.reviewer.nickname.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{review.reviewer.nickname}</span>
              {review.reviewer.verifiedTraveler && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {review.nftProof && (
                <Award className="w-4 h-4 text-purple-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{review.reviewer.totalReviews} yorum</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span>{review.reviewer.reputation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBusinessTypeColor(review.businessType)}`}>
            {getBusinessTypeIcon(review.businessType)} {review.businessType}
          </div>
          {review.isVerified && (
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-green-600" />
            </div>
          )}
        </div>
      </div>

      {/* Business Info */}
      <div className="mb-3">
        <h3 className="font-semibold text-white mb-1">{review.businessName}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <MapPin className="w-4 h-4" />
          <span>{review.location.city}, {review.location.country}</span>
        </div>
      </div>

      {/* Rating and Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {renderStars(review.rating)}
          </div>
          <span className="text-sm font-medium text-gray-200">{review.rating}/5</span>
        </div>
        <h4 className="font-medium text-white">{review.title}</h4>
      </div>

      {/* Content Preview */}
      <p className="text-gray-200 text-sm line-clamp-3 mb-4">
        {review.content}
      </p>

      {/* Images */}
      {review.images.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {review.images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          ))}
          {review.images.length > 3 && (
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
              +{review.images.length - 3}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{review.votes.helpful}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{review.timestamp.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {review.nftProof && (
            <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              NFT Kanıt
            </div>
          )}
          <Eye className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            Merkezi Olmayan Yorumlar
          </h1>
          <p className="text-gray-300 mt-2">
            Blockchain ile doğrulanmış, değiştirilemez seyahat deneyimleri
          </p>
        </div>

        <button
          onClick={() => setShowWriteReview(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Yorum Yaz
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-white mb-2">{reviews.length}</div>
          <div className="text-sm text-gray-300">Toplam Yorum</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {reviews.filter(r => r.isVerified).length}
          </div>
          <div className="text-sm text-gray-300">Doğrulanmış</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {reviews.filter(r => r.nftProof).length}
          </div>
          <div className="text-sm text-gray-300">NFT Kanıtlı</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">4.7</div>
          <div className="text-sm text-gray-300">Ortalama Puan</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yorum, işletme adı veya içerik ara..."
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Yorumlar</option>
            <option value="verified">Doğrulanmış</option>
            <option value="nft-proof">NFT Kanıtlı</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">En Yeni</option>
            <option value="rating">En Yüksek Puan</option>
            <option value="helpful">En Yararlı</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getFilteredAndSortedReviews().map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Review Detail Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedReview(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white/5 rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  layoutId={selectedReview.id}
                  style={{ width: '100%' }}
                >
                {/* Modal content would go here */}
                <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Yorum Detayı</h3>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                {/* Full review content would be implemented here */}
                <div className="text-center py-8 text-gray-400">
                  Detaylı yorum görünümü burada yer alacak...
                </div>
                </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showWriteReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowWriteReview(false)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white/5 rounded-2xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  style={{ width: '100%' }}
                >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Yeni Yorum Yaz</h3>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="text-center py-8 text-gray-400">
                Yorum yazma formu burada yer alacak...
              </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DecentralizedReviews;