import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calendar,
  Filter,
  X,
  ChevronDown,
  MapPin } from 'lucide-react';

/**
 * Filter value type
 */
export interface FilterValues {
  /** Search query */
  search?: string;
  /** Start date */
  startDate?: string;
  /** End date */
  endDate?: string;
  /** Selected status */
  status?: string;
  /** Selected property ID */
  propertyId?: string;
  /** Custom filters */
  [key: string]: string | undefined;
}

/**
 * Filter option for dropdowns
 */
export interface FilterOption {
  label: string;
  value: string;
}

/**
 * Props for the FilterBar component
 */
export interface FilterBarProps {
  /** Current filter values */
  filters: FilterValues;
  /** Handler when filters change */
  onChange: (filters: FilterValues) => void;
  /** Show search input */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Show date range picker */
  showDateRange?: boolean;
  /** Show status filter */
  showStatus?: boolean;
  /** Status options */
  statusOptions?: FilterOption[];
  /** Show property filter */
  showProperty?: boolean;
  /** Property options */
  propertyOptions?: FilterOption[];
  /** Additional custom filters */
  customFilters?: React.ReactNode;
  /** Disable clear all button when no filters */
  hideClearWhenEmpty?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FilterBar - Advanced filter component with search, date range, and dropdown filters
 *
 * @example
 * ```tsx
 * const [filters, setFilters] = useState<FilterValues>({});
 *
 * <FilterBar
 *   filters={filters}
 *   onChange={setFilters}
 *   showSearch
 *   showDateRange
 *   showStatus
 *   statusOptions={[
 *     { label: 'All', value: '' },
 *     { label: 'Active', value: 'active' },
 *     { label: 'Pending', value: 'pending' },
 *   ]}
 *   showProperty
 *   propertyOptions={properties}
 * />
 * ```
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  showSearch = true,
  searchPlaceholder = 'Search...',
  showDateRange = false,
  showStatus = false,
  statusOptions = [],
  showProperty = false,
  propertyOptions = [],
  customFilters,
  hideClearWhenEmpty = true,
  className = ''
}) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const propertyDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      statusDropdownRef.current &&
      !statusDropdownRef.current.contains(event.target as Node))
      {
        setIsStatusOpen(false);
      }
      if (
      propertyDropdownRef.current &&
      !propertyDropdownRef.current.contains(event.target as Node))
      {
        setIsPropertyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (key: string, value: string | undefined) => {
    onChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const handleClearFilters = () => {
    onChange({});
  };

  const getActiveFilterCount = (): number => {
    return Object.values(filters).filter(
      (value) => value !== undefined && value !== ''
    ).length;
  };

  const activeFilterCount = getActiveFilterCount();

  const getStatusLabel = (): string => {
    if (!filters.status) return 'Status';
    const option = statusOptions.find((opt) => opt.value === filters.status);
    return option?.label || 'Status';
  };

  const getPropertyLabel = (): string => {
    if (!filters.propertyId) return 'Property';
    const option = propertyOptions.find(
      (opt) => opt.value === filters.propertyId
    );
    return option?.label || 'Property';
  };

  return (
    <div className={`bg-lydian-glass-dark rounded-lg border border-lydian-border p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        {showSearch &&
        <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-lydian-text-muted" />
              <input
              type="text"
              placeholder={searchPlaceholder}
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border" />

              {filters.search &&
            <button
              onClick={() => handleFilterChange('search', '')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lydian-text-muted hover:text-lydian-text-dim"
              aria-label="Clear search">

                  <X className="h-4 w-4" />
                </button>
            }
            </div>
          </div>
        }

        {/* Date Range Picker */}
        {showDateRange &&
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 min-w-[140px]">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lydian-text-muted pointer-events-none" />
              <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border text-sm"
              placeholder="Start date" />

            </div>
            <div className="relative flex-1 min-w-[140px]">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lydian-text-muted pointer-events-none" />
              <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              min={filters.startDate}
              className="w-full pl-9 pr-3 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-border text-sm"
              placeholder="End date" />

            </div>
          </div>
        }

        {/* Status Dropdown */}
        {showStatus && statusOptions.length > 0 &&
        <div className="relative" ref={statusDropdownRef}>
            <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className={`w-full sm:w-auto px-4 py-2 border rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-lydian-border-focus flex items-center justify-between gap-2 min-w-[140px] ${
            filters.status ?
            'border-lydian-primary bg-blue-50 text-lydian-primary-hover' :
            'border-lydian-border-medium bg-lydian-bg/5 text-gray-200 hover:bg-lydian-bg/5'}`
            }>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{getStatusLabel()}</span>
              </div>
              <ChevronDown
              className={`h-4 w-4 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />

            </button>

            {isStatusOpen &&
          <div className="absolute top-full left-0 mt-2 w-full sm:w-56 bg-lydian-glass-dark rounded-lg shadow-lg border border-lydian-border py-1 z-20 max-h-64 overflow-y-auto">
                {statusOptions.map((option) =>
            <button
              key={option.value}
              onClick={() => {
                handleFilterChange('status', option.value);
                setIsStatusOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-lydian-glass-dark-medium transition-colors ${
              filters.status === option.value ?
              'bg-blue-50 text-lydian-primary-hover font-medium' :
              'text-gray-200'}`
              }>

                    {option.label}
                  </button>
            )}
              </div>
          }
          </div>
        }

        {/* Property Dropdown */}
        {showProperty && propertyOptions.length > 0 &&
        <div className="relative" ref={propertyDropdownRef}>
            <button
            onClick={() => setIsPropertyOpen(!isPropertyOpen)}
            className={`w-full sm:w-auto px-4 py-2 border rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-lydian-border-focus flex items-center justify-between gap-2 min-w-[140px] ${
            filters.propertyId ?
            'border-lydian-primary bg-blue-50 text-lydian-primary-hover' :
            'border-lydian-border-medium bg-lydian-bg/5 text-gray-200 hover:bg-lydian-bg/5'}`
            }>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{getPropertyLabel()}</span>
              </div>
              <ChevronDown
              className={`h-4 w-4 flex-shrink-0 transition-transform ${isPropertyOpen ? 'rotate-180' : ''}`} />

            </button>

            {isPropertyOpen &&
          <div className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-lydian-glass-dark rounded-lg shadow-lg border border-lydian-border py-1 z-20 max-h-64 overflow-y-auto">
                {propertyOptions.map((option) =>
            <button
              key={option.value}
              onClick={() => {
                handleFilterChange('propertyId', option.value);
                setIsPropertyOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-lydian-glass-dark-medium transition-colors ${
              filters.propertyId === option.value ?
              'bg-blue-50 text-lydian-primary-hover font-medium' :
              'text-gray-200'}`
              }>

                    <span className="truncate block">{option.label}</span>
                  </button>
            )}
              </div>
          }
          </div>
        }

        {/* Custom Filters */}
        {customFilters}

        {/* Clear Filters Button */}
        {(!hideClearWhenEmpty || activeFilterCount > 0) &&
        <button
          onClick={handleClearFilters}
          disabled={activeFilterCount === 0}
          className="px-4 py-2 border border-lydian-border-medium rounded-lg text-sm font-medium text-lydian-text-muted hover:bg-lydian-glass-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-lydian-border-focus flex items-center gap-2 whitespace-nowrap">

            <X className="h-4 w-4" />
            <span>Clear {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>
        }
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 &&
      <div className="mt-4 pt-4 border-t border-lydian-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-lydian-text-muted">
              Active filters:
            </span>

            {filters.search &&
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-lydian-primary-light text-blue-800 rounded-full text-xs font-medium">
                <span>Search: {filters.search}</span>
                <button
              onClick={() => handleFilterChange('search', '')}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove search filter">

                  <X className="h-3 w-3" />
                </button>
              </div>
          }

            {filters.startDate &&
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-lydian-primary-light text-blue-800 rounded-full text-xs font-medium">
                <span>From: {new Date(filters.startDate).toLocaleDateString()}</span>
                <button
              onClick={() => handleFilterChange('startDate', '')}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove start date filter">

                  <X className="h-3 w-3" />
                </button>
              </div>
          }

            {filters.endDate &&
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-lydian-primary-light text-blue-800 rounded-full text-xs font-medium">
                <span>To: {new Date(filters.endDate).toLocaleDateString()}</span>
                <button
              onClick={() => handleFilterChange('endDate', '')}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove end date filter">

                  <X className="h-3 w-3" />
                </button>
              </div>
          }

            {filters.status &&
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-lydian-primary-light text-blue-800 rounded-full text-xs font-medium">
                <span>Status: {getStatusLabel()}</span>
                <button
              onClick={() => handleFilterChange('status', '')}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove status filter">

                  <X className="h-3 w-3" />
                </button>
              </div>
          }

            {filters.propertyId &&
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-lydian-primary-light text-blue-800 rounded-full text-xs font-medium">
                <span>Property: {getPropertyLabel()}</span>
                <button
              onClick={() => handleFilterChange('propertyId', '')}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove property filter">

                  <X className="h-3 w-3" />
                </button>
              </div>
          }
          </div>
        </div>
      }
    </div>);

};

export default FilterBar;