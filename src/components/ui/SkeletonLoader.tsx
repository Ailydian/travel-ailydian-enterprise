/**
 * Premium Skeleton Loaders - Premium Style
 * Smooth shimmer effects for loading states
 */
import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  animation = 'wave'
}) => {
  const baseClasses = 'bg-lydian-bg-surface-raised overflow-hidden relative';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: ''
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}>
      {animation === 'wave' &&
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }} />

      }
    </div>);

};

// Horizontal Product Card Skeleton (Premium Style)
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-lg border border-white/20/10 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image Skeleton */}
        <div className="w-full md:w-80 h-64 md:h-auto flex-shrink-0">
          <Skeleton className="w-full h-full" variant="rectangular" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-4 md:p-5">
          {/* Title */}
          <Skeleton className="w-3/4 h-6 mb-3" />

          {/* Location */}
          <Skeleton className="w-1/2 h-4 mb-4" />

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-16 h-8" variant="rectangular" />
            <Skeleton className="w-24 h-4" />
          </div>

          {/* Features */}
          <div className="flex gap-3 mb-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price & CTA */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/20">
            <div>
              <Skeleton className="w-32 h-8 mb-2" />
              <Skeleton className="w-20 h-4" />
            </div>
            <Skeleton className="w-36 h-10" variant="rectangular" />
          </div>
        </div>
      </div>
    </div>);

};

// Filter Sidebar Skeleton
export const FilterSidebarSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-lg border border-white/20/10 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="w-5 h-5" variant="circular" />
        <Skeleton className="w-24 h-6" />
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <Skeleton className="w-32 h-5 mb-4" />
        <Skeleton className="w-full h-2 mb-4" variant="rectangular" />
        <div className="flex justify-between mb-4">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        {/* Price Histogram */}
        <div className="flex items-end gap-1 h-16">
          {[20, 45, 80, 95, 100, 85, 60, 40, 25, 15].map((height, index) =>
          <Skeleton
            key={index}
            className="flex-1"
            style={{ height: `${height}%` }} />

          )}
        </div>
      </div>

      {/* Popular Filters */}
      <div className="mb-6">
        <Skeleton className="w-32 h-5 mb-4" />
        <div className="space-y-3">
          <Skeleton className="w-full h-12" variant="rectangular" />
          <Skeleton className="w-full h-12" variant="rectangular" />
        </div>
      </div>

      {/* Rating Section */}
      <div className="mb-6">
        <Skeleton className="w-40 h-5 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) =>
          <Skeleton key={i} className="w-full h-12" variant="rectangular" />
          )}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Skeleton className="w-28 h-5 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) =>
          <Skeleton key={i} className="w-full h-12" variant="rectangular" />
          )}
        </div>
      </div>
    </div>);

};

// Search Form Skeleton
export const SearchFormSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800/30 backdrop-blur-sm p-1 rounded-t-lg overflow-x-auto mb-0">
        {[1, 2, 3, 4, 5].map((i) =>
        <Skeleton key={i} className="w-32 h-12" variant="rectangular" />
        )}
      </div>

      {/* Form */}
      <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-b-lg rounded-tr-lg shadow-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <Skeleton className="md:col-span-4 h-16" variant="rectangular" />
          <Skeleton className="md:col-span-3 h-16" variant="rectangular" />
          <Skeleton className="md:col-span-3 h-16" variant="rectangular" />
          <Skeleton className="md:col-span-2 h-16" variant="rectangular" />
        </div>
        <Skeleton className="w-full md:w-48 h-14" variant="rectangular" />
      </div>
    </div>);

};

// Grid Card Skeleton (for vertical cards)
export const GridCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full h-48" variant="rectangular" />

      {/* Content */}
      <div className="p-6">
        <Skeleton className="w-full h-5 mb-3" />
        <Skeleton className="w-3/4 h-4 mb-4" />

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-28 h-10" variant="rectangular" />
        </div>
      </div>
    </div>);

};

// Page Loader (Full screen)
export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-48 h-12 mx-auto" variant="rectangular" />
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-white/20/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <Skeleton className="w-32 h-4 mx-auto" />
      </div>
    </div>);

};

// Inline Spinner
export const Spinner: React.FC<{size?: 'sm' | 'md' | 'lg';className?: string;}> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 border-white/20/10 rounded-full"></div>
      <div className="absolute inset-0 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>);

};