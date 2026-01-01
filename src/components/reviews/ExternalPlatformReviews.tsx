import { useState } from 'react';
import { Star, ExternalLink, Globe, User } from 'lucide-react';

interface ExternalReview {
  id: string;
  title?: string;
  content: string;
  rating: number;
  author_name: string;
  author_avatar?: string;
  publish_date: string;
  source: 'google' | 'tripadvisor';
  source_url?: string;
  helpful_votes?: number;
  trip_type?: string;
  travel_date?: string;
}

interface ExternalPlatformReviewsProps {
  reviews: ExternalReview[];
  platform: 'google' | 'tripadvisor';
  totalReviews?: number;
  averageRating?: number;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

export default function ExternalPlatformReviews({
  reviews,
  platform,
  totalReviews,
  averageRating,
  onLoadMore,
  isLoading = false
}: ExternalPlatformReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const platformConfig = {
    google: {
      name: 'Google Reviews',
      color: 'text-lydian-error',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      logo: <Globe className="h-4 w-4" />
    },
    tripadvisor: {
      name: 'TripAdvisor Reviews',
      color: 'text-lydian-success',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      logo: <Globe className="h-4 w-4" />
    }
  };

  const config = platformConfig[platform];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`flex items-center ${config.color} font-medium`}>
            {config.logo}
            <span className="ml-2">{config.name}</span>
          </div>
          {totalReviews &&
          <span className="ml-2 text-sm text-lydian-text-muted">
              ({totalReviews} reviews)
            </span>
          }
        </div>
        
        {averageRating &&
        <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) =>
            <Star
              key={i}
              className={`h-4 w-4 ${
              i < Math.floor(averageRating) ?
              'text-yellow-400 fill-current' :
              'text-lydian-text-dim'}`
              } />

            )}
            </div>
            <span className="ml-2 text-sm font-medium text-lydian-text-inverse">
              {averageRating.toFixed(1)}
            </span>
          </div>
        }
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) =>
        <div key={review.id} className="bg-lydian-glass-dark p-4 rounded-lg border border-lydian-border-light">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                {review.author_avatar ?
              <img
                src={review.author_avatar}
                alt={review.author_name}
                className="h-8 w-8 rounded-full object-cover" /> :


              <div className="h-8 w-8 bg-lydian-bg-active rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-lydian-text-muted" />
                  </div>
              }
                <div className="ml-3">
                  <p className="font-medium text-lydian-text-inverse text-sm">
                    {review.author_name}
                  </p>
                  <div className="flex items-center text-xs text-lydian-text-muted">
                    <span>{formatDate(review.publish_date)}</span>
                    {review.trip_type &&
                  <>
                        <span className="mx-1">•</span>
                        <span className="capitalize">{review.trip_type.replace('_', ' ')}</span>
                      </>
                  }
                  </div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) =>
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                  i < review.rating ?
                  'text-yellow-400 fill-current' :
                  'text-lydian-text-dim'}`
                  } />

                )}
                </div>
                <span className="ml-1 text-xs text-lydian-text-dim">
                  {review.rating}/5
                </span>
              </div>
            </div>

            {/* Review Title */}
            {review.title &&
          <h4 className="font-medium text-lydian-text-inverse mb-2 text-sm">
                {review.title}
              </h4>
          }

            {/* Review Content */}
            <p className="text-lydian-text-muted text-sm leading-relaxed mb-3">
              {review.content}
            </p>

            {/* Review Footer */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-lydian-text-muted">
                {review.helpful_votes && review.helpful_votes > 0 &&
              <span>{review.helpful_votes} found this helpful</span>
              }
                {review.travel_date &&
              <>
                    {review.helpful_votes && <span className="mx-1">•</span>}
                    <span>Visited {formatDate(review.travel_date)}</span>
                  </>
              }
              </div>

              {/* External Link */}
              {review.source_url &&
            <a
              href={review.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${config.color} hover:underline`}>

                  View on {platform === 'google' ? 'Google' : 'TripAdvisor'}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
            }
            </div>
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 &&
      <div className="mt-4 text-center">
          <button
          onClick={() => setShowAll(!showAll)}
          className={`text-sm ${config.color} hover:underline font-medium`}>

            {showAll ? 'Show Less' : `Show ${reviews.length - 3} More Reviews`}
          </button>
        </div>
      }

      {/* Load More Button */}
      {onLoadMore && !showAll &&
      <div className="mt-4 text-center">
          <button
          onClick={onLoadMore}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium ${config.color} border ${config.borderColor} rounded-md hover:bg-lydian-glass-dark disabled:opacity-50`}>

            {isLoading ? 'Loading...' : 'Load More Reviews'}
          </button>
        </div>
      }

      {/* Source Attribution */}
      <div className="mt-4 pt-3 border-t border-lydian-border-light/10">
        <p className="text-xs text-lydian-text-muted flex items-center justify-center">
          Reviews synced from {config.name}
          {config.logo}
        </p>
      </div>
    </div>);

}