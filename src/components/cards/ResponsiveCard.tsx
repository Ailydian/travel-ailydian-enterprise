/**
 * Responsive Card Component
 * Universal card component for hotels, flights, tours, etc.
 * Adapts to all screen sizes with touch-optimized interactions
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  MapPin,
  Users,
  Calendar,
  ShoppingCart,
  Eye,
  Shield,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';

export interface ResponsiveCardProps {
  id: string;
  type: 'hotel' | 'flight' | 'tour' | 'transfer';
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  badge?: string;
  features?: string[];
  href?: string;
  onFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onView?: (id: string) => void;
  isFavorited?: boolean;
  isInCart?: boolean;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  id,
  type,
  title,
  subtitle,
  description,
  image,
  price,
  originalPrice,
  currency = 'TRY',
  rating,
  reviewCount,
  location,
  badge,
  features = [],
  href,
  onFavorite,
  onAddToCart,
  onView,
  isFavorited = false,
  isInCart = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const typeConfig = {
    hotel: { icon: '🏨', color: 'from-purple-500 to-purple-600' },
    flight: { icon: '✈️', color: 'from-blue-500 to-blue-600' },
    tour: { icon: '🎭', color: 'from-orange-500 to-orange-600' },
    transfer: { icon: '🚗', color: 'from-green-500 to-green-600' }
  };

  const config = typeConfig[type];

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavorite) onFavorite(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart(id);
  };

  const handleView = () => {
    if (onView) onView(id);
  };

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="card-responsive group cursor-pointer h-full flex flex-col overflow-hidden"
      onClick={handleView}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-xl md:rounded-2xl bg-gray-200">
        {/* Image */}
        {!imageFailed ? (
          <img
            src={image}
            alt={title}
            className={`image-responsive transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageFailed(true);
              setImageLoaded(true);
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-6xl">{config.icon}</span>
          </div>
        )}

        {/* Loading Skeleton */}
        {!imageLoaded && !imageFailed && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {/* Type Badge */}
          <div className={`px-3 py-1.5 bg-gradient-to-r ${config.color} rounded-lg shadow-lg flex items-center gap-1.5 text-white text-xs font-semibold`}>
            <span className="text-base">{config.icon}</span>
            <span className="hidden sm:inline capitalize">{type}</span>
          </div>

          {/* Custom Badge */}
          {badge && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg text-white text-xs font-bold">
              {badge}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="ml-auto w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all active:scale-90 touch-target shadow-lg"
            aria-label={isFavorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorited
                  ? 'fill-red-500 text-red-500 scale-110'
                  : 'text-gray-700'
              }`}
            />
          </button>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
            <span className="text-white text-sm font-bold">%{discount} İNDİRİM</span>
          </div>
        )}

        {/* Quick View Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleView();
          }}
          className="hidden md:flex absolute bottom-3 right-3 items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-all active:scale-95 shadow-lg"
        >
          <Eye className="w-4 h-4" />
          Detay
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4 md:p-5">
        {/* Rating & Reviews */}
        {rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span className="text-white text-sm font-bold">{rating.toFixed(1)}</span>
            </div>
            {reviewCount && (
              <span className="text-xs text-gray-500">
                ({reviewCount.toLocaleString('tr-TR')} değerlendirme)
              </span>
            )}
          </div>
        )}

        {/* Title & Subtitle */}
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 heading-responsive-sm">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">{subtitle}</p>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-gray-600 mb-3">
            <MapPin className="w-4 h-4 text-lydian-primary" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-500">
                +{features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Action */}
        <div className="flex items-end justify-between gap-3 mt-auto pt-3 border-t border-gray-100">
          <div>
            {originalPrice && originalPrice > price && (
              <p className="text-xs text-gray-400 line-through">
                {originalPrice.toLocaleString('tr-TR')} {currency}
              </p>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-lydian-primary to-lydian-secondary bg-clip-text text-transparent">
                {price.toLocaleString('tr-TR')}
              </span>
              <span className="text-sm text-gray-600 font-medium">{currency}</span>
            </div>
            <p className="text-xs text-gray-500">kişi başı</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`button-responsive flex items-center gap-2 transition-all ${
              isInCart
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white hover:shadow-xl active:scale-95'
            }`}
          >
            {isInCart ? (
              <>
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Sepette</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Sepete Ekle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default ResponsiveCard;
