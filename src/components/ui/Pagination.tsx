/**
 * Pagination Component - Production-Grade Page Navigation
 * Features: Multiple variants, responsive, keyboard navigation, accessibility
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface PaginationProps {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Total items count */
  totalItems?: number;
  /** Items per page */
  itemsPerPage?: number;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Show previous/next labels */
  showPrevNext?: boolean;
  /** Maximum page buttons to show */
  siblingCount?: number;
  /** Pagination variant */
  variant?: 'default' | 'compact' | 'simple';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** className */
  className?: string;
}

// ============================================================================
// PAGINATION RANGE CALCULATOR
// ============================================================================

const generatePageRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] => {
  const totalPageNumbers = siblingCount + 5; // siblingCount on each side + first + last + current + 2 dots

  // Case 1: Total pages <= total page numbers to show
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 2: No left dots, but show right dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  // Case 3: Show left dots, no right dots
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  // Case 4: Show both dots
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  return [];
};

// ============================================================================
// PAGINATION COMPONENT
// ============================================================================

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showFirstLast = false,
  showPrevNext = true,
  siblingCount = 1,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const pages = generatePageRange(currentPage, totalPages, siblingCount);

  // ========================================
  // SIZE STYLES
  // ========================================

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // ========================================
  // VARIANT: SIMPLE
  // ========================================

  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="text-sm text-lydian-text-secondary">
          {totalItems && itemsPerPage && (
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              ${sizeClasses[size]}
              border border-lydian-border-medium rounded-md
              hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            `}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              ${sizeClasses[size]}
              border border-lydian-border-medium rounded-md
              hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            `}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // VARIANT: COMPACT
  // ========================================

  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            ${sizeClasses[size]}
            border border-lydian-border-medium rounded-md
            hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label="Previous page"
        >
          <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-sm text-lydian-text-secondary">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            ${sizeClasses[size]}
            border border-lydian-border-medium rounded-md
            hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label="Next page"
        >
          <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  }

  // ========================================
  // VARIANT: DEFAULT
  // ========================================

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination">
      <ul className="flex items-center gap-1">
        {/* First Page Button */}
        {showFirstLast && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`
                ${sizeClasses[size]}
                border border-lydian-border-medium rounded-md
                hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              `}
              aria-label="First page"
            >
              <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}

        {/* Previous Button */}
        {showPrevNext && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                ${sizeClasses[size]}
                border border-lydian-border-medium rounded-md
                hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              `}
              aria-label="Previous page"
            >
              <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <li key={`dots-${index}`}>
                <span className={`${sizeClasses[size]} text-lydian-text-muted`}>...</span>
              </li>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <li key={pageNumber}>
              <button
                onClick={() => onPageChange(pageNumber)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  ${sizeClasses[size]}
                  min-w-[2.5rem] border rounded-md
                  transition-colors
                  ${isActive
                    ? 'bg-lydian-primary text-white border-blue-600'
                    : 'border-lydian-border-medium hover:bg-lydian-bg-surface'
                  }
                `}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        {showPrevNext && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                ${sizeClasses[size]}
                border border-lydian-border-medium rounded-md
                hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              `}
              aria-label="Next page"
            >
              <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}

        {/* Last Page Button */}
        {showFirstLast && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`
                ${sizeClasses[size]}
                border border-lydian-border-medium rounded-md
                hover:bg-lydian-bg-surface disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              `}
              aria-label="Last page"
            >
              <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// ============================================================================
// PAGINATION INFO COMPONENT
// ============================================================================

export const PaginationInfo: React.FC<{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  className?: string;
}> = ({ currentPage, itemsPerPage, totalItems, className = '' }) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`text-sm text-lydian-text-secondary ${className}`}>
      Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </div>
  );
};

export default Pagination;
