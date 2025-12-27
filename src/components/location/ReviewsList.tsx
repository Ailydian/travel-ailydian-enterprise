import React from 'react';
import { Star, ThumbsUp, Calendar, User } from 'lucide-react';
import { Review } from '../../lib/types/review-system';

interface ReviewsListProps {
  reviews: Review[];
  language?: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, language = 'en' }) => {
  const getLocalizedContent = (content: any, fallback = '') => {
    if (!content) return fallback;
    if (typeof content === 'string') return content;
    return content[language] || content['en'] || Object.values(content)[0] || fallback;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) =>
    <Star
      key={i}
      className={`w-4 h-4 ${
      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`
      } />

    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-lydian-glass-dark rounded-lg p-8 text-center">
        <User className="w-12 h-12 text-lydian-text-muted mx-auto mb-4" />
        <p className="text-lydian-text-dim">No reviews yet. Be the first to review!</p>
      </div>);

  }

  return (
    <div className="space-y-6">
      {reviews.map((review) =>
      <div key={review.id} className="bg-lydian-glass-dark border border-lydian-border-light/10 rounded-lg p-6 shadow-sm">
          {/* Review Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-lydian-text-inverse font-semibold">
                {review.user?.first_name ?
              review.user.first_name.charAt(0).toUpperCase() :
              review.user?.username?.charAt(0).toUpperCase() || 'A'
              }
              </div>
              <div>
                <h4 className="font-semibold text-lydian-text-inverse">
                  {review.user?.first_name && review.user?.last_name ?
                `${review.user.first_name} ${review.user.last_name.charAt(0)}.` :
                review.user?.username || 'Anonymous'
                }
                </h4>
                <div className="flex items-center space-x-2 text-sm text-lydian-text-muted">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(review.created_at)}</span>
                  {review.visit_date &&
                <>
                      <span>•</span>
                      <span>Visited: {formatDate(review.visit_date)}</span>
                    </>
                }
                </div>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1 mb-1">
                {renderStars(review.overall_rating)}
              </div>
              <span className="text-sm text-lydian-text-dim">{review.overall_rating}/5</span>
            </div>
          </div>

          {/* Review Title */}
          {review.title &&
        <h3 className="text-lg font-medium text-lydian-text-inverse mb-3">
              {getLocalizedContent(review.title)}
            </h3>
        }

          {/* Review Content */}
          <div className="prose prose-sm max-w-none text-lydian-text-muted mb-4">
            <p>{getLocalizedContent(review.content)}</p>
          </div>

          {/* Sub-ratings */}
          {(review.service_rating || review.food_rating || review.atmosphere_rating || review.value_rating) &&
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-lydian-glass-dark rounded-lg">
              {review.service_rating &&
          <div className="text-center">
                  <p className="text-xs text-lydian-text-muted mb-1">Service</p>
                  <div className="flex justify-center">
                    {renderStars(review.service_rating)}
                  </div>
                </div>
          }
              {review.food_rating &&
          <div className="text-center">
                  <p className="text-xs text-lydian-text-muted mb-1">Food</p>
                  <div className="flex justify-center">
                    {renderStars(review.food_rating)}
                  </div>
                </div>
          }
              {review.atmosphere_rating &&
          <div className="text-center">
                  <p className="text-xs text-lydian-text-muted mb-1">Atmosphere</p>
                  <div className="flex justify-center">
                    {renderStars(review.atmosphere_rating)}
                  </div>
                </div>
          }
              {review.value_rating &&
          <div className="text-center">
                  <p className="text-xs text-lydian-text-muted mb-1">Value</p>
                  <div className="flex justify-center">
                    {renderStars(review.value_rating)}
                  </div>
                </div>
          }
            </div>
        }

          {/* Review Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-lydian-border-light">
            <div className="flex items-center space-x-4">
              {review.visit_type &&
            <span className="px-2 py-1 bg-lydian-primary-light text-blue-800 text-xs rounded-full">
                  {review.visit_type}
                </span>
            }
              <span className="text-xs text-lydian-text-muted">
                Review #{review.id}
              </span>
            </div>
            
            <button className="flex items-center space-x-1 text-sm text-lydian-text-muted hover:text-lydian-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful_count || 0})</span>
            </button>
          </div>
        </div>
      )}
    </div>);

};

export default ReviewsList;