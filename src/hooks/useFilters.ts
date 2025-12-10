import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  FilterType,
  HotelFilters,
  FlightFilters,
  ActivityFilters,
  DEFAULT_HOTEL_FILTERS,
  DEFAULT_FLIGHT_FILTERS,
  DEFAULT_ACTIVITY_FILTERS,
  FilterPreset,
} from '../types/filters';

const STORAGE_KEY_PREFIX = 'ailydian_filters_';
const PRESETS_KEY = 'ailydian_filter_presets';

interface UseFiltersOptions {
  type: FilterType;
  syncWithUrl?: boolean;
  debounceMs?: number;
}

export function useFilters<T extends HotelFilters | FlightFilters | ActivityFilters>(
  options: UseFiltersOptions
) {
  const { type, syncWithUrl = true, debounceMs = 300 } = options;
  const router = useRouter();

  // Get default filters based on type
  const getDefaultFilters = useCallback((): T => {
    switch (type) {
      case 'hotel':
        return DEFAULT_HOTEL_FILTERS as T;
      case 'flight':
        return DEFAULT_FLIGHT_FILTERS as T;
      case 'activity':
        return DEFAULT_ACTIVITY_FILTERS as T;
      default:
        return DEFAULT_HOTEL_FILTERS as T;
    }
  }, [type]);

  // Initialize filters from localStorage or defaults
  const [filters, setFilters] = useState<T>(() => {
    if (typeof window === 'undefined') return getDefaultFilters();

    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${type}`);
      return stored ? JSON.parse(stored) : getDefaultFilters();
    } catch {
      return getDefaultFilters();
    }
  });

  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);

  // Calculate active filter count
  useEffect(() => {
    const defaultFilters = getDefaultFilters();
    let count = 0;

    Object.entries(filters).forEach(([key, value]) => {
      const defaultValue = defaultFilters[key as keyof T];

      if (Array.isArray(value)) {
        if (value.length > 0) count++;
      } else if (typeof value === 'object' && value !== null && 'min' in value) {
        const range = value as { min: number; max: number };
        const defaultRange = defaultValue as { min: number; max: number };
        if (range.min !== defaultRange.min || range.max !== defaultRange.max) {
          count++;
        }
      } else if (value !== defaultValue) {
        count++;
      }
    });

    setActiveFilterCount(count);
  }, [filters, getDefaultFilters]);

  // Sync filters to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${type}`, JSON.stringify(filters));
    }
  }, [filters, type]);

  // Sync filters to URL query parameters
  useEffect(() => {
    if (!syncWithUrl || typeof window === 'undefined') return;

    const timeout = setTimeout(() => {
      const query = serializeFiltersToQuery(filters);
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, ...query },
        },
        undefined,
        { shallow: true }
      );
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [filters, syncWithUrl, debounceMs, router]);

  // Load filters from URL on mount
  useEffect(() => {
    if (!syncWithUrl || !router.isReady) return;

    const urlFilters = deserializeFiltersFromQuery(router.query, type);
    if (urlFilters) {
      setFilters(prevFilters => ({ ...prevFilters, ...urlFilters }));
    }
  }, [router.isReady, syncWithUrl, type]);

  // Update specific filter
  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Update multiple filters at once
  const updateFilters = useCallback((updates: Partial<T>) => {
    setFilters(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Reset all filters to defaults
  const resetFilters = useCallback(() => {
    setFilters(getDefaultFilters());
    if (syncWithUrl) {
      router.replace({ pathname: router.pathname }, undefined, { shallow: true });
    }
  }, [getDefaultFilters, syncWithUrl, router]);

  // Reset a specific filter
  const resetFilter = useCallback(<K extends keyof T>(key: K) => {
    const defaultFilters = getDefaultFilters();
    updateFilter(key, defaultFilters[key]);
  }, [getDefaultFilters, updateFilter]);

  // Apply filters (for optimistic UI updates)
  const applyFilters = useCallback(async () => {
    setIsApplying(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    setIsApplying(false);
  }, []);

  // Save current filters as a preset
  const savePreset = useCallback((name: string): FilterPreset => {
    const preset: FilterPreset = {
      id: `preset_${Date.now()}`,
      name,
      type,
      filters,
      createdAt: new Date(),
    };

    if (typeof window !== 'undefined') {
      try {
        const presets = JSON.parse(localStorage.getItem(PRESETS_KEY) || '[]');
        presets.push(preset);
        localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
      } catch (error) {
        console.error('Failed to save preset:', error);
      }
    }

    return preset;
  }, [type, filters]);

  // Load a saved preset
  const loadPreset = useCallback((presetId: string) => {
    if (typeof window === 'undefined') return;

    try {
      const presets: FilterPreset[] = JSON.parse(
        localStorage.getItem(PRESETS_KEY) || '[]'
      );
      const preset = presets.find(p => p.id === presetId && p.type === type);

      if (preset) {
        setFilters(preset.filters as T);
      }
    } catch (error) {
      console.error('Failed to load preset:', error);
    }
  }, [type]);

  // Get all saved presets for this filter type
  const getPresets = useCallback((): FilterPreset[] => {
    if (typeof window === 'undefined') return [];

    try {
      const presets: FilterPreset[] = JSON.parse(
        localStorage.getItem(PRESETS_KEY) || '[]'
      );
      return presets.filter(p => p.type === type);
    } catch {
      return [];
    }
  }, [type]);

  // Delete a preset
  const deletePreset = useCallback((presetId: string) => {
    if (typeof window === 'undefined') return;

    try {
      const presets: FilterPreset[] = JSON.parse(
        localStorage.getItem(PRESETS_KEY) || '[]'
      );
      const filtered = presets.filter(p => p.id !== presetId);
      localStorage.setItem(PRESETS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete preset:', error);
    }
  }, []);

  // Check if filters are default (no active filters)
  const isDefaultFilters = useMemo(() => {
    return activeFilterCount === 0;
  }, [activeFilterCount]);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    resetFilter,
    applyFilters,
    isApplying,
    activeFilterCount,
    isDefaultFilters,
    // Preset management
    savePreset,
    loadPreset,
    getPresets,
    deletePreset,
  };
}

// Helper functions for URL serialization
function serializeFiltersToQuery(filters: any): Record<string, string> {
  const query: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(',');
    } else if (typeof value === 'object' && value !== null && 'min' in value) {
      query[`${key}_min`] = String(value.min);
      query[`${key}_max`] = String(value.max);
    } else if (typeof value === 'number' || typeof value === 'string') {
      query[key] = String(value);
    }
  });

  return query;
}

function deserializeFiltersFromQuery(
  query: Record<string, any>,
  type: FilterType
): Partial<any> | null {
  const filters: any = {};
  let hasFilters = false;

  Object.entries(query).forEach(([key, value]) => {
    if (key.endsWith('_min') || key.endsWith('_max')) {
      const baseKey = key.replace(/_min|_max$/, '');
      if (!filters[baseKey]) {
        filters[baseKey] = {};
      }
      filters[baseKey][key.endsWith('_min') ? 'min' : 'max'] = Number(value);
      hasFilters = true;
    } else if (typeof value === 'string' && value.includes(',')) {
      filters[key] = value.split(',');
      hasFilters = true;
    } else if (value) {
      filters[key] = isNaN(Number(value)) ? value : Number(value);
      hasFilters = true;
    }
  });

  return hasFilters ? filters : null;
}

// Hook for applying filters to data
export function useFilteredData<T>(
  data: T[],
  filters: any,
  filterFn: (item: T, filters: any) => boolean
) {
  return useMemo(() => {
    return data.filter(item => filterFn(item, filters));
  }, [data, filters, filterFn]);
}

// Debounce hook for filter changes
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
