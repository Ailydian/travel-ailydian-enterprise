import React from 'react';

/**
 * Loading skeleton variant types
 */
export type LoadingVariant = 'card' | 'table' | 'list' | 'text' | 'stat';

/**
 * Props for the LoadingState component
 */
export interface LoadingStateProps {
  /** Variant type determines the skeleton structure */
  variant?: LoadingVariant;
  /** Number of skeleton items to render */
  count?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card skeleton component
 */
const CardSkeleton: React.FC = () =>
<div className="bg-lydian-glass-dark rounded-lg border border-lydian-border overflow-hidden animate-pulse">
    <div className="h-48 bg-lydian-bg-active" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-lydian-bg-active rounded w-3/4" />
      <div className="h-4 bg-lydian-bg-active rounded w-1/2" />
      <div className="flex items-center justify-between">
        <div className="h-6 bg-lydian-bg-active rounded w-24" />
        <div className="h-5 bg-lydian-bg-active rounded w-16" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-9 bg-lydian-bg-active rounded flex-1" />
        <div className="h-9 bg-lydian-bg-active rounded flex-1" />
      </div>
    </div>
  </div>;


/**
 * Table row skeleton component
 */
const TableRowSkeleton: React.FC = () =>
<div className="animate-pulse">
    <div className="flex items-center space-x-4 p-4 border-b border-lydian-border">
      <div className="h-10 w-10 bg-lydian-bg-active rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-lydian-bg-active rounded w-1/4" />
        <div className="h-3 bg-lydian-bg-active rounded w-1/3" />
      </div>
      <div className="h-4 bg-lydian-bg-active rounded w-24" />
      <div className="h-4 bg-lydian-bg-active rounded w-20" />
      <div className="h-8 w-8 bg-lydian-bg-active rounded" />
    </div>
  </div>;


/**
 * List item skeleton component
 */
const ListSkeleton: React.FC = () =>
<div className="bg-lydian-glass-dark rounded-lg border border-lydian-border p-4 animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 bg-lydian-bg-active rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-lydian-bg-active rounded w-1/3" />
        <div className="h-4 bg-lydian-bg-active rounded w-1/2" />
        <div className="h-3 bg-lydian-bg-active rounded w-1/4" />
      </div>
      <div className="h-8 bg-lydian-bg-active rounded w-20" />
    </div>
  </div>;


/**
 * Text skeleton component
 */
const TextSkeleton: React.FC = () =>
<div className="animate-pulse space-y-2">
    <div className="h-4 bg-lydian-bg-active rounded w-full" />
    <div className="h-4 bg-lydian-bg-active rounded w-5/6" />
    <div className="h-4 bg-lydian-bg-active rounded w-4/6" />
  </div>;


/**
 * Stat card skeleton component
 */
const StatSkeleton: React.FC = () =>
<div className="bg-lydian-glass-dark rounded-lg border border-lydian-border p-6 animate-pulse">
    <div className="flex items-center justify-between space-x-4">
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-lydian-bg-active rounded w-24" />
        <div className="h-8 bg-lydian-bg-active rounded w-32" />
        <div className="h-3 bg-lydian-bg-active rounded w-20" />
      </div>
      <div className="h-12 w-12 bg-lydian-bg-active rounded-full" />
    </div>
  </div>;


/**
 * LoadingState - A skeleton loading component with multiple variants
 *
 * @example
 * ```tsx
 * // Card skeletons
 * <LoadingState variant="card" count={3} />
 *
 * // Table row skeletons
 * <LoadingState variant="table" count={5} />
 *
 * // List skeletons
 * <LoadingState variant="list" count={4} />
 *
 * // Text skeletons
 * <LoadingState variant="text" count={1} />
 *
 * // Stat card skeletons
 * <LoadingState variant="stat" count={4} />
 * ```
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'card',
  count = 3,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return <CardSkeleton />;
      case 'table':
        return <TableRowSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'text':
        return <TextSkeleton />;
      case 'stat':
        return <StatSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'card':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'table':
        return 'bg-white/5 rounded-lg border border-gray-200 overflow-hidden';
      case 'list':
        return 'space-y-4';
      case 'text':
        return 'space-y-4';
      case 'stat':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
      default:
        return 'space-y-4';
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`} role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, index) =>
      <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      )}
    </div>);

};

export default LoadingState;