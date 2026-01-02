/**
 * ReviewSection - Universal Review Display Component
 * Features: Star ratings, verified badges, helpful votes, pagination
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Check, ThumbsUp } from 'lucide-react';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title?: string;
  text: string;
  helpful: number;
  verified?: boolean;
}

export interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  showAll?: boolean;
  maxReviews?: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  averageRating,
  totalReviews,
  showAll = false,
  maxReviews = 3
}) => {
  const [displayCount, setDisplayCount] = useState(showAll ? reviews.length : maxReviews);
  const [helpfulClicks, setHelpfulClicks] = useState<Record<string, boolean>>({});

  const handleHelpful = (reviewId: string) => {
    setHelpfulClicks(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const displayedReviews = reviews.slice(0, displayCount);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
    const percentage = (count / reviews.length) * 100;
    return { star, count, percentage };
  });

  return (
    <div className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-lydian-border-light/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-lydian-text-inverse mb-2">Yorumlar</h3>
          <p className="text-lydian-text-muted">
            {totalReviews.toLocaleString()} müşteri değerlendirmesi
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-4xl font-bold text-lydian-text-inverse">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-lydian-text-dim'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="mb-8 p-6 bg-white/5 rounded-xl border border-lydian-border-light/10">
        <h4 className="text-sm font-semibold text-lydian-text-inverse mb-4">Puan Dağılımı</h4>
        <div className="space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-lydian-text-muted w-12">{star} yıldız</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (5 - star) * 0.1 }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                />
              </div>
              <span className="text-sm text-lydian-text-muted w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-lydian-border-light/10 pb-6 last:border-0 last:pb-0"
          >
            {/* Author Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review.avatar}
                  alt={review.author}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-lydian-text-inverse">{review.author}</span>
                  {review.verified && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Doğrulanmış
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-lydian-text-muted">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-lydian-text-dim'
                        }`}
                      />
                    ))}
                  </div>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="pl-16">
              {review.title && (
                <h4 className="font-semibold text-lydian-text-inverse mb-2">{review.title}</h4>
              )}
              <p className="text-lydian-text-muted text-sm mb-3 leading-relaxed">{review.text}</p>

              {/* Helpful Button */}
              <button
                onClick={() => handleHelpful(review.id)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  helpfulClicks[review.id]
                    ? 'text-blue-400'
                    : 'text-lydian-text-muted hover:text-lydian-text-inverse'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${helpfulClicks[review.id] ? 'fill-blue-400' : ''}`} />
                <span>
                  Yararlı ({review.helpful + (helpfulClicks[review.id] ? 1 : 0)})
                </span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {!showAll && reviews.length > displayCount && (
        <div className="mt-8">
          <button
            onClick={() => setDisplayCount(prev => Math.min(prev + maxReviews, reviews.length))}
            className="w-full py-3 border-2 border-lydian-border-light/20 rounded-lg font-semibold text-lydian-text-muted hover:border-lydian-border-light hover:bg-white/5 transition-all"
          >
            Daha Fazla Yorum Göster ({reviews.length - displayCount} kaldı)
          </button>
        </div>
      )}

      {/* Show All Reviews Link */}
      {showAll && reviews.length > displayCount && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setDisplayCount(reviews.length)}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Tüm {totalReviews.toLocaleString()} Yorumu Göster
          </button>
        </div>
      )}
    </div>
  );
};
