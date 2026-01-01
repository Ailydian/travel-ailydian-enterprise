/**
 * Skeleton Component - Production-Grade Loading States
 * Features: Multiple variants, animations, responsive, composable
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Animation */
  animation?: 'pulse' | 'wave' | 'none';
  /** className */
  className?: string;
}

export interface SkeletonCardProps {
  /** Show avatar */
  showAvatar?: boolean;
  /** Number of text lines */
  lines?: number;
  /** Show action buttons */
  showActions?: boolean;
  /** className */
  className?: string;
}

export interface SkeletonTableProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Show header */
  showHeader?: boolean;
  /** className */
  className?: string;
}

// ============================================================================
// BASE SKELETON COMPONENT
// ============================================================================

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
}) => {
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
    none: '',
  };

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const baseClasses = 'bg-lydian-bg-surface-raised';

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height || (variant === 'text' ? '1rem' : undefined),
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={style}
      role="status"
      aria-label="Loading"
    />
  );
};

// ============================================================================
// SKELETON TEXT
// ============================================================================

export const SkeletonText: React.FC<{
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}> = ({ lines = 3, lastLineWidth = '70%', className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
};

// ============================================================================
// SKELETON CARD
// ============================================================================

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showAvatar = false,
  lines = 3,
  showActions = false,
  className = '',
}) => {
  return (
    <div className={`p-6 bg-lydian-bg rounded-lg border border-lydian-border ${className}`}>
      {/* Header with Avatar */}
      {showAvatar && (
        <div className="flex items-center gap-4 mb-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      )}

      {/* Content */}
      <SkeletonText lines={lines} lastLineWidth="80%" />

      {/* Actions */}
      {showActions && (
        <div className="flex gap-3 mt-6">
          <Skeleton variant="rounded" width={100} height={36} />
          <Skeleton variant="rounded" width={100} height={36} />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SKELETON LIST
// ============================================================================

export const SkeletonList: React.FC<{
  items?: number;
  showAvatar?: boolean;
  className?: string;
}> = ({ items = 5, showAvatar = true, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-4 bg-lydian-bg rounded-lg border border-lydian-border">
          {showAvatar && <Skeleton variant="circular" width={40} height={40} />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// SKELETON TABLE
// ============================================================================

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
}) => {
  return (
    <div className={`overflow-hidden rounded-lg border border-lydian-border ${className}`}>
      <table className="w-full">
        {showHeader && (
          <thead className="bg-lydian-bg-surface">
            <tr>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <th key={colIndex} className="px-6 py-3">
                  <Skeleton variant="text" width="80%" />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-lydian-bg divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton variant="text" width={colIndex === 0 ? '90%' : '70%'} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// SKELETON PRODUCT CARD
// ============================================================================

export const SkeletonProductCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-lydian-bg rounded-lg border border-lydian-border overflow-hidden ${className}`}>
      {/* Image */}
      <Skeleton variant="rectangular" height={200} />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        
        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton variant="text" width={80} />
          <Skeleton variant="rounded" width={100} height={36} />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SKELETON PROFILE
// ============================================================================

export const SkeletonProfile: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-lydian-bg rounded-lg border border-lydian-border overflow-hidden ${className}`}>
      {/* Cover */}
      <Skeleton variant="rectangular" height={120} />
      
      {/* Profile Info */}
      <div className="p-6">
        {/* Avatar overlapping cover */}
        <div className="-mt-16 mb-4">
          <Skeleton variant="circular" width={96} height={96} className="border-4 border-white" />
        </div>
        
        {/* Name & Bio */}
        <div className="space-y-3">
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="30%" />
          <SkeletonText lines={2} lastLineWidth="90%" />
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-lydian-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton variant="text" width="60%" className="mx-auto" />
              <Skeleton variant="text" width="40%" className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SKELETON DASHBOARD
// ============================================================================

export const SkeletonDashboard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 bg-lydian-bg rounded-lg border border-lydian-border">
            <Skeleton variant="text" width="60%" className="mb-3" />
            <Skeleton variant="text" width="40%" height={32} />
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="p-6 bg-lydian-bg rounded-lg border border-lydian-border">
        <Skeleton variant="text" width="30%" className="mb-4" />
        <Skeleton variant="rectangular" height={300} />
      </div>
      
      {/* Table */}
      <SkeletonTable rows={5} columns={5} />
    </div>
  );
};

// ============================================================================
// SKELETON IMAGE
// ============================================================================

export const SkeletonImage: React.FC<{
  width?: string | number;
  height?: string | number;
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2';
  className?: string;
}> = ({ width = '100%', height, aspectRatio, className = '' }) => {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    aspectRatio: aspectRatio,
  };

  return (
    <Skeleton
      variant="rectangular"
      className={className}
      style={style}
    />
  );
};

export default Skeleton;
