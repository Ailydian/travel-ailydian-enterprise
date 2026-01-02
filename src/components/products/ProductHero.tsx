/**
 * ProductHero - Universal Hero Section for All Product Detail Pages
 * Supports: Tours, Transfers, Hotels, Car Rentals, Rentals
 * Features: Image gallery, lightbox, share, favorite, breadcrumbs
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Share2,
  MapPin,
  Star,
  Home,
  Maximize2,
  Award,
  Zap
} from 'lucide-react';

export interface ProductHeroProps {
  // Basic Info
  title: string;
  location: string;
  rating: number;
  reviewCount: number;

  // Images
  images: string[];

  // Badges
  badges?: {
    text: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'success' | 'warning' | 'error';
  }[];

  // Breadcrumb
  breadcrumbs: {
    label: string;
    href: string;
  }[];

  // Product type for styling
  productType: 'tour' | 'transfer' | 'hotel' | 'car-rental' | 'rental';

  // Stats (optional)
  stats?: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];

  // Callbacks
  onShare?: () => void;
  onFavorite?: (isFavorite: boolean) => void;
}

const badgeColors = {
  primary: 'from-blue-600 to-purple-600',
  success: 'from-green-500 to-green-600',
  warning: 'from-yellow-400 to-orange-400',
  error: 'from-red-500 to-red-600'
};

export const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  location,
  rating,
  reviewCount,
  images,
  badges = [],
  breadcrumbs,
  productType,
  stats = [],
  onShare,
  onFavorite
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    onFavorite?.(newFavorite);
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href
        });
      } catch (err) {
        // User cancelled
      }
    }
  };

  return (
    <>
      {/* Breadcrumb Bar - Sticky */}
      <div className="sticky top-0 z-40 bg-lydian-glass-dark/95 backdrop-blur-xl border-b border-lydian-border-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-lydian-text-muted">
            <Link href="/" className="hover:text-lydian-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-4 h-4" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-lydian-text-inverse font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-lydian-primary transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section - Glassmorphism Design */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-12 sm:py-16"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-3 py-1 bg-gradient-to-r ${badgeColors[badge.color || 'primary']} rounded-full text-xs font-bold flex items-center gap-1 shadow-lg`}
                >
                  {badge.icon}
                  {badge.text}
                </motion.div>
              ))}
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h1>

          {/* Location & Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{rating}</span>
              <span className="text-blue-100">({reviewCount.toLocaleString()} yorumlar)</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 right-4 flex items-center gap-2"
          >
            <button
              onClick={handleShare}
              className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all border border-white/20"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleFavorite}
              className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all border border-white/20"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Photo Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* Main Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-4 md:col-span-2 md:row-span-2 relative h-64 md:h-96 overflow-hidden rounded-xl"
            onClick={() => {
              setSelectedImage(0);
              setShowGallery(true);
            }}
          >
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <Maximize2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          {images.slice(1, 5).map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="col-span-2 md:col-span-1 relative h-32 md:h-48 overflow-hidden rounded-xl"
              onClick={() => {
                setSelectedImage(index + 1);
                setShowGallery(true);
              }}
            >
              <Image
                src={image}
                alt={`${title} ${index + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg hover:bg-black/50 transition-colors">
                  <div className="text-center">
                    <Maximize2 className="w-8 h-8 mx-auto mb-2" />
                    +{images.length - 5} Fotoğraf
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <Maximize2 className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full p-4" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[selectedImage]}
                alt={`${title} ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-lg backdrop-blur-sm font-semibold">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
