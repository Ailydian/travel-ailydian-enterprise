import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, User, Calendar, MapPin, Camera, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  location: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  photos?: string[];
  visitType: 'Business' | 'Couple' | 'Family' | 'Solo' | 'Friends';
  visitDate: string;
}

interface ReviewSystemProps {
  itemId: string;
  itemType: 'hotel' | 'restaurant' | 'tour' | 'destination';
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (review: Partial<Review>) => void;
}

export default function ReviewSystem({
  itemId,
  itemType,
  reviews,
  averageRating,
  totalReviews,
  onAddReview
}: ReviewSystemProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    visitType: 'Solo' as Review['visitType'],
    visitDate: ''
  });

  // Rating distribution (mock data)
  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.6), percentage: 60 },
    { stars: 4, count: Math.floor(totalReviews * 0.25), percentage: 25 },
    { stars: 3, count: Math.floor(totalReviews * 0.1), percentage: 10 },
    { stars: 2, count: Math.floor(totalReviews * 0.03), percentage: 3 },
    { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 }
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const filteredReviews = sortedReviews.filter(review => {
    if (filterBy === 'all') return true;
    if (filterBy === 'excellent') return review.rating >= 4.5;
    if (filterBy === 'good') return review.rating >= 3.5 && review.rating < 4.5;
    if (filterBy === 'average') return review.rating >= 2.5 && review.rating < 3.5;
    if (filterBy === 'poor') return review.rating < 2.5;
    return true;
  });

  const renderStars = (rating: number, size = 'h-4 w-4') => {
    return (
      <div className=\"flex items-center\">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    if (onAddReview) {
      const review = {
        ...newReview,
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'Current User',
        date: new Date().toISOString().split('T')[0],
        location: 'Türkiye',
        verified: true,
        helpful: 0,
        notHelpful: 0
      };
      onAddReview(review);
      setNewReview({
        rating: 5,
        title: '',
        content: '',
        visitType: 'Solo',
        visitDate: ''
      });
      setShowWriteReview(false);
    }
  };

  return (
    <div className=\"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8\">
      {/* Header */}
      <div className=\"flex items-center justify-between mb-6\">
        <h2 className=\"text-2xl font-bold text-gray-900 dark:text-white\">
          Değerlendirmeler ve Yorumlar
        </h2>
        <button
          onClick={() => setShowWriteReview(true)}
          className=\"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold\"
        >
          Yorum Yaz
        </button>
      </div>

      {/* Rating Summary */}
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl\">
        <div className=\"text-center lg:text-left\">
          <div className=\"flex items-center justify-center lg:justify-start mb-2\">
            <span className=\"text-4xl font-bold text-blue-600 mr-3\">
              {averageRating.toFixed(1)}
            </span>
            {renderStars(averageRating, 'h-6 w-6')}
          </div>
          <p className=\"text-gray-600 dark:text-gray-300\">
            {totalReviews.toLocaleString()} değerlendirmeye dayalı
          </p>
          <div className=\"flex items-center justify-center lg:justify-start mt-2\">
            <CheckCircle className=\"h-4 w-4 text-green-500 mr-1\" />
            <span className=\"text-sm text-gray-600 dark:text-gray-300\">
              Doğrulanmış yorumlar
            </span>
          </div>
        </div>

        <div className=\"space-y-2\">
          {ratingDistribution.map((dist) => (
            <div key={dist.stars} className=\"flex items-center text-sm\">
              <div className=\"flex items-center w-16\">
                <span className=\"mr-1\">{dist.stars}</span>
                <Star className=\"h-3 w-3 text-yellow-400 fill-current\" />
              </div>
              <div className=\"flex-1 mx-3 bg-gray-200 dark:bg-gray-600 rounded-full h-2\">
                <div
                  className=\"bg-yellow-400 h-2 rounded-full\"
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className=\"w-8 text-gray-600 dark:text-gray-300\">
                {dist.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg\">
        <div className=\"flex flex-wrap gap-3\">
          <span className=\"text-sm font-medium text-gray-700 dark:text-gray-300\">
            Filtrele:
          </span>
          {[
            { id: 'all', name: 'Tümü' },
            { id: 'excellent', name: 'Mükemmel (4.5+)' },
            { id: 'good', name: 'İyi (3.5+)' },
            { id: 'average', name: 'Ortalama (2.5+)' },
            { id: 'poor', name: 'Zayıf (<2.5)' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterBy(filter.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${\n                filterBy === filter.id\n                  ? 'bg-blue-600 text-white'\n                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-500'\n              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
        <div className=\"flex items-center space-x-2\">
          <span className=\"text-sm font-medium text-gray-700 dark:text-gray-300\">
            Sırala:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className=\"px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent\"
          >
            <option value=\"newest\">En Yeni</option>
            <option value=\"oldest\">En Eski</option>
            <option value=\"highest\">En Yüksek Puan</option>
            <option value=\"lowest\">En Düşük Puan</option>
            <option value=\"helpful\">En Yararlı</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className=\"space-y-6\">
        {filteredReviews.map((review) => (
          <div key={review.id} className=\"border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0\">
            <div className=\"flex items-start justify-between mb-3\">
              <div className=\"flex items-center space-x-3\">
                <div className=\"flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full\">
                  {review.userAvatar ? (
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className=\"w-12 h-12 rounded-full object-cover\"
                    />
                  ) : (
                    <User className=\"h-6 w-6 text-blue-600\" />
                  )}
                </div>
                <div>
                  <div className=\"flex items-center space-x-2\">
                    <h4 className=\"font-semibold text-gray-900 dark:text-white\">
                      {review.userName}
                    </h4>
                    {review.verified && (
                      <CheckCircle className=\"h-4 w-4 text-green-500\" />
                    )}
                  </div>
                  <div className=\"flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-3\">
                    <span className=\"flex items-center\">
                      <MapPin className=\"h-3 w-3 mr-1\" />
                      {review.location}
                    </span>
                    <span className=\"flex items-center\">
                      <Calendar className=\"h-3 w-3 mr-1\" />
                      {review.date}
                    </span>
                    <span className=\"px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs\">
                      {review.visitType}
                    </span>
                  </div>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            <div className=\"mb-3\">
              <h5 className=\"font-semibold text-gray-900 dark:text-white mb-2\">
                {review.title}
              </h5>
              <p className=\"text-gray-700 dark:text-gray-300 leading-relaxed\">
                {review.content}
              </p>
            </div>

            {review.photos && review.photos.length > 0 && (
              <div className=\"flex space-x-2 mb-3\">
                {review.photos.slice(0, 4).map((photo, index) => (
                  <div key={index} className=\"relative\">
                    <img
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      className=\"w-20 h-20 object-cover rounded-lg\"
                    />
                    {index === 3 && review.photos!.length > 4 && (
                      <div className=\"absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center text-white text-sm font-semibold\">
                        +{review.photos!.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className=\"flex items-center space-x-4 text-sm\">
              <button className=\"flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors\">
                <ThumbsUp className=\"h-4 w-4\" />
                <span>Yararlı ({review.helpful})</span>
              </button>
              <button className=\"flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors\">
                <ThumbsDown className=\"h-4 w-4\" />
                <span>Yararlı değil ({review.notHelpful})</span>
              </button>
              <button className=\"flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors\">
                <MessageSquare className=\"h-4 w-4\" />
                <span>Cevapla</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className=\"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4\">
          <div className=\"bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto\">
            <div className=\"p-6\">
              <div className=\"flex items-center justify-between mb-6\">
                <h3 className=\"text-2xl font-bold text-gray-900 dark:text-white\">
                  Değerlendirmenizi Yazın
                </h3>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className=\"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300\"
                >
                  ✕
                </button>
              </div>

              <div className=\"space-y-6\">
                {/* Rating */}
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3\">
                    Genel Değerlendirme
                  </label>
                  <div className=\"flex items-center space-x-1\">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className=\"focus:outline-none\"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= newReview.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 hover:text-yellow-400'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                    <span className=\"ml-3 text-lg font-semibold text-gray-900 dark:text-white\">
                      {newReview.rating}/5
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Başlık
                  </label>
                  <input
                    type=\"text\"
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    placeholder=\"Deneyiminizi özetleyin\"
                    value={newReview.title}
                    onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Detaylı Yorum
                  </label>
                  <textarea
                    rows={6}
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    placeholder=\"Deneyiminizi detaylı olarak anlatın...\"
                    value={newReview.content}
                    onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  />
                </div>

                {/* Visit Type */}
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Seyahat Türü
                  </label>
                  <select
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    value={newReview.visitType}
                    onChange={(e) => setNewReview({...newReview, visitType: e.target.value as Review['visitType']})}
                  >
                    <option value=\"Solo\">Tek Başına</option>
                    <option value=\"Couple\">Çift</option>
                    <option value=\"Family\">Aile</option>
                    <option value=\"Friends\">Arkadaşlar</option>
                    <option value=\"Business\">İş</option>
                  </select>
                </div>

                {/* Visit Date */}
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Ziyaret Tarihi
                  </label>
                  <input
                    type=\"date\"
                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white\"
                    value={newReview.visitDate}
                    onChange={(e) => setNewReview({...newReview, visitDate: e.target.value})}
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">
                    Fotoğraflar (Opsiyonel)
                  </label>
                  <div className=\"border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center\">
                    <Camera className=\"h-8 w-8 text-gray-400 mx-auto mb-2\" />
                    <p className=\"text-sm text-gray-600 dark:text-gray-400\">
                      Fotoğraflarınızı buraya sürükleyin veya tıklayın
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div className=\"flex space-x-4 pt-4\">
                  <button
                    onClick={() => setShowWriteReview(false)}
                    className=\"flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors\"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className=\"flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold\"
                  >
                    Yorumu Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}