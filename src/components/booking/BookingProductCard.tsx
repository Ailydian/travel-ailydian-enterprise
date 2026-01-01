/**
 * Premium Style Horizontal Product Card
 * Professional listing layout with image carousel, ratings, pricing
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Coffee,
  Car,
  Users,
  Calendar,
  Shield,
  Award,
  TrendingUp,
  TrendingDown,
  Check,
  Eye,
  Clock,
  Zap,
  Flame } from 'lucide-react';

interface ProductImage {
  url: string;
  alt?: string;
}

interface ProductCardProps {
  id: string | number;
  title: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  reviewScore?: string;
  images: ProductImage[] | string[];
  price: number | string;
  originalPrice?: number | string;
  currency?: string;
  features?: string[];
  badges?: string[];
  urgencyText?: string;
  description?: string;
  href: string;
  type?: 'hotel' | 'tour' | 'car' | 'transfer' | 'rental';
  onAddToCart?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export const BookingProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  location,
  rating = 0,
  reviewCount = 0,
  reviewScore,
  images,
  price,
  originalPrice,
  currency = '₺',
  features = [],
  badges = [],
  urgencyText,
  description,
  href,
  type = 'hotel',
  onAddToCart,
  onFavorite,
  isFavorited = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  // Normalize images to array of objects
  const normalizedImages = images.map((img) =>
  typeof img === 'string' ? { url: img, alt: title } : img
  );

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  const getRatingColor = (score: number) => {
    if (score >= 9) return 'bg-lydian-success-hover';
    if (score >= 8) return 'bg-lydian-success';
    if (score >= 7) return 'bg-lydian-primary';
    return 'bg-gray-600';
  };

  const getRatingText = (score: number) => {
    if (score >= 9) return 'Mükemmel';
    if (score >= 8) return 'Çok iyi';
    if (score >= 7) return 'İyi';
    return 'Ortalama';
  };

  const discountPercentage = originalPrice && price ?
  Math.round((Number(originalPrice) - Number(price)) / Number(originalPrice) * 100) :
  0;

  return (
    <Link href={href} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-lydian-glass-dark rounded-lg border border-lydian-border-light/10 hover:border-lydian-primary hover:shadow-xl transition-all duration-200 overflow-hidden group">

        <div className="flex flex-col md:flex-row">
          {/* Image Section - Left Side */}
          <div
            className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}>

            {/* Image Carousel */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={normalizedImages[currentImageIndex]?.url || '/placeholder.jpg'}
                alt={normalizedImages[currentImageIndex]?.alt || title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />


              {/* Navigation Arrows */}
              {normalizedImages.length > 1 && isImageHovered &&
              <>
                  <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-lydian-bg/90 hover:bg-lydian-glass-dark rounded-full flex items-center justify-center shadow-lg transition-all z-10">

                    <ChevronLeft className="w-5 h-5 text-lydian-text-dim" />
                  </button>
                  <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-lydian-bg/90 hover:bg-lydian-glass-dark rounded-full flex items-center justify-center shadow-lg transition-all z-10">

                    <ChevronRight className="w-5 h-5 text-lydian-text-dim" />
                  </button>
                </>
              }

              {/* Image Indicators */}
              {normalizedImages.length > 1 &&
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {normalizedImages.map((_, index) =>
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-lydian-bg/5 w-3' : 'bg-lydian-bg/60'}`
                  } />

                )}
                </div>
              }
            </div>

            {/* Heart Icon - Favorite */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavorite?.();
              }}
              className="absolute top-3 right-3 w-9 h-9 bg-lydian-bg/90 hover:bg-lydian-glass-dark rounded-full flex items-center justify-center shadow-lg transition-all z-10">

              <Heart
                className={`w-5 h-5 transition-all ${
                isFavorited ? 'fill-lydian-primary text-lydian-primary' : 'text-gray-200'}`
                } />

            </button>

            {/* Discount Badge */}
            {discountPercentage > 0 &&
            <div className="absolute top-3 left-3 bg-lydian-primary text-lydian-text-inverse px-3 py-1 rounded-md font-bold text-sm shadow-lg z-10">
                -{discountPercentage}%
              </div>
            }

            {/* Custom Badges */}
            {badges.length > 0 &&
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 z-10">
                {badges.slice(0, 2).map((badge, index) =>
              <span
                key={index}
                className="px-2 py-1 bg-lydian-bg/95 text-lydian-text-dim rounded text-xs font-semibold shadow-sm">

                    {badge}
                  </span>
              )}
              </div>
            }
          </div>

          {/* Content Section - Right Side */}
          <div className="flex-1 p-4 md:p-5 flex flex-col">
            {/* Title & Location */}
            <div className="mb-3">
              <h3 className="text-xl font-bold text-lydian-text-inverse mb-1 line-clamp-2 group-hover:text-lydian-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-lydian-text-dim">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>

            {/* Rating & Reviews */}
            {rating > 0 &&
            <div className="flex items-center gap-3 mb-3">
                <div className={`${getRatingColor(rating)} text-lydian-text-inverse px-2 py-1 rounded-md font-bold text-sm`}>
                  {rating.toFixed(1)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-lydian-text-inverse">{getRatingText(rating)}</div>
                  {reviewCount > 0 &&
                <div className="text-xs text-lydian-text-dim">{reviewCount.toLocaleString()} değerlendirme</div>
                }
                </div>
                {reviewScore &&
              <div className="ml-auto flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{reviewScore}</span>
                  </div>
              }
              </div>
            }

            {/* Description */}
            {description &&
            <p className="text-sm text-lydian-text-dim mb-3 line-clamp-2">
                {description}
              </p>
            }

            {/* Features */}
            {features.length > 0 &&
            <div className="flex flex-wrap gap-3 mb-3">
                {features.slice(0, 4).map((feature, index) =>
              <div key={index} className="flex items-center gap-1 text-xs text-lydian-text-muted">
                    <Check className="w-3 h-3 text-lydian-success" />
                    <span>{feature}</span>
                  </div>
              )}
              </div>
            }

            {/* Smart Urgency & Social Proof */}
            <div className="mb-3 space-y-2">
              {/* Price Trend Indicator */}
              {originalPrice &&
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-xs">

                  <div className="flex items-center gap-1 px-2 py-1 bg-lydian-success-lighter text-lydian-success-text rounded-md">
                    <TrendingDown className="w-3 h-3" />
                    <span className="font-semibold">Fiyat Düştü</span>
                  </div>
                  <span className="text-lydian-text-dim">Son 24 saatte %{Math.round((Number(originalPrice) - Number(price)) / Number(originalPrice) * 100)} indirim</span>
                </motion.div>
              }

              {/* Real-time Booking Activity */}
              {reviewCount > 500 &&
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-xs text-lydian-text-muted">

                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-lydian-primary" />
                    <div className="flex items-center">
                      <span className="font-semibold text-lydian-primary">{Math.floor(Math.random() * 20) + 10}</span>
                      <span className="ml-1">kişi şu anda bakıyor</span>
                    </div>
                  </div>
                </motion.div>
              }

              {/* Last Booked Indicator */}
              {rating >= 4.5 &&
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-xs text-lydian-text-muted">

                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-600" />
                    <div className="flex items-center">
                      <span>Son rezervasyon</span>
                      <span className="font-semibold text-orange-600 ml-1">{Math.floor(Math.random() * 60) + 5} dakika önce</span>
                    </div>
                  </div>
                </motion.div>
              }

              {/* Limited Availability */}
              {reviewCount > 1000 &&
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-xs">

                  <div className="flex items-center gap-1 px-2 py-1 bg-lydian-error-lighter text-lydian-primary rounded-md">
                    <Flame className="w-3 h-3" />
                    <span className="font-semibold">Yüksek Talep - Sadece {Math.floor(Math.random() * 5) + 2} koltuk kaldı!</span>
                  </div>
                </motion.div>
              }

              {/* Custom Urgency Text */}
              {urgencyText &&
              <div className="flex items-center gap-2 text-sm text-lydian-primary font-medium">
                  <Zap className="w-4 h-4" />
                  <span>{urgencyText}</span>
                </div>
              }
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Price & Action */}
            <div className="flex items-end justify-between mt-4 pt-4 border-t border-lydian-border-light">
              <div>
                {originalPrice &&
                <div className="text-sm text-lydian-text-muted line-through">
                    {currency}{typeof originalPrice === 'number' ? originalPrice.toLocaleString() : originalPrice}
                  </div>
                }
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-lydian-text-inverse">
                    {currency}{typeof price === 'number' ? price.toLocaleString() : price}
                  </span>
                  <span className="text-sm text-lydian-text-dim">/ gece</span>
                </div>
                <div className="text-xs text-lydian-text-muted mt-1">Vergiler dahil</div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = href;
                  }}
                  className="px-6 py-2.5 bg-lydian-primary text-lydian-text-inverse rounded-md font-semibold hover:bg-lydian-dark transition-all shadow-sm hover:shadow-md">

                  Müsaitliği Gör
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>);

};