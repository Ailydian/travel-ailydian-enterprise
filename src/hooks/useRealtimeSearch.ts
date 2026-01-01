/**
 * Real-Time Search Hook - Production-Grade
 *
 * Features:
 * - Debounced search (300ms)
 * - API-based autocomplete
 * - Search history management (localStorage)
 * - Recent searches tracking
 * - Loading states
 * - Error handling
 * - TypeScript strict mode
 *
 * @version 2.0.0
 * @author Travel LyDian Elite Frontend Team
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'hotel' | 'tour' | 'rental' | 'transfer' | 'destination' | 'car';
  url: string;
  image?: string;
  rating?: number;
  price?: string;
  location?: string;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  category: string;
  icon: string;
}

export interface UseRealtimeSearchOptions {
  debounceMs?: number;
  maxResults?: number;
  maxHistory?: number;
  storageKey?: string;
  enableHistory?: boolean;
}

export interface UseRealtimeSearchReturn {
  // State
  query: string;
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];

  // Actions
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
  clearHistory: () => void;
  addToHistory: (query: string) => void;
  removeFromHistory: (query: string) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_OPTIONS: Required<UseRealtimeSearchOptions> = {
  debounceMs: 300,
  maxResults: 8,
  maxHistory: 5,
  storageKey: 'travel-search-history',
  enableHistory: true,
};

// ============================================================================
// HOOK
// ============================================================================

export const useRealtimeSearch = (
  options: UseRealtimeSearchOptions = {}
): UseRealtimeSearchReturn => {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // State
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // ========================================
  // LOAD HISTORY FROM LOCALSTORAGE
  // ========================================

  useEffect(() => {
    if (!config.enableHistory) return;

    try {
      const stored = localStorage.getItem(config.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setRecentSearches(parsed.slice(0, config.maxHistory));
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, [config.enableHistory, config.storageKey, config.maxHistory]);

  // ========================================
  // SAVE HISTORY TO LOCALSTORAGE
  // ========================================

  const saveHistory = useCallback(
    (history: string[]) => {
      if (!config.enableHistory) return;

      try {
        localStorage.setItem(config.storageKey, JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
    },
    [config.enableHistory, config.storageKey]
  );

  // ========================================
  // ADD TO HISTORY
  // ========================================

  const addToHistory = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim() || !config.enableHistory) return;

      setRecentSearches((prev) => {
        // Remove duplicate if exists
        const filtered = prev.filter((item) => item !== searchQuery);
        // Add to front
        const newHistory = [searchQuery, ...filtered].slice(0, config.maxHistory);
        // Save to localStorage
        saveHistory(newHistory);
        return newHistory;
      });
    },
    [config.enableHistory, config.maxHistory, saveHistory]
  );

  // ========================================
  // REMOVE FROM HISTORY
  // ========================================

  const removeFromHistory = useCallback(
    (searchQuery: string) => {
      setRecentSearches((prev) => {
        const newHistory = prev.filter((item) => item !== searchQuery);
        saveHistory(newHistory);
        return newHistory;
      });
    },
    [saveHistory]
  );

  // ========================================
  // CLEAR HISTORY
  // ========================================

  const clearHistory = useCallback(() => {
    setRecentSearches([]);
    saveHistory([]);
  }, [saveHistory]);

  // ========================================
  // SEARCH FUNCTION (API CALL)
  // ========================================

  const performSearch = useCallback(
    async (searchQuery: string) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Empty query
      if (!searchQuery.trim()) {
        setResults([]);
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      // Start loading
      setIsLoading(true);
      setError(null);

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      try {
        // API call
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}&limit=${config.maxResults}`,
          {
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data = await response.json();

        // Only update if component is still mounted
        if (isMountedRef.current) {
          setResults(data.results || []);
          setSuggestions(data.suggestions || []);
          setIsLoading(false);
        }
      } catch (err: any) {
        // Ignore abort errors
        if (err.name === 'AbortError') {
          return;
        }

        if (isMountedRef.current) {
          console.error('Search error:', err);
          setError(err.message || 'Search failed');
          setResults([]);
          setSuggestions([]);
          setIsLoading(false);
        }
      }
    },
    [config.maxResults]
  );

  // ========================================
  // DEBOUNCED SEARCH
  // ========================================

  const debouncedSearch = useRef(
    debounce((searchQuery: string) => {
      performSearch(searchQuery);
    }, config.debounceMs)
  ).current;

  // ========================================
  // SET QUERY (WITH AUTO-SEARCH)
  // ========================================

  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);
      debouncedSearch(newQuery);
    },
    [debouncedSearch]
  );

  // ========================================
  // MANUAL SEARCH
  // ========================================

  const search = useCallback(
    async (searchQuery: string) => {
      setQueryState(searchQuery);
      await performSearch(searchQuery);
    },
    [performSearch]
  );

  // ========================================
  // CLEAR RESULTS
  // ========================================

  const clearResults = useCallback(() => {
    setQueryState('');
    setResults([]);
    setSuggestions([]);
    setError(null);
  }, []);

  // ========================================
  // CLEANUP
  // ========================================

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // ========================================
  // RETURN
  // ========================================

  return {
    // State
    query,
    results,
    suggestions,
    isLoading,
    error,
    recentSearches,

    // Actions
    setQuery,
    search,
    clearResults,
    clearHistory,
    addToHistory,
    removeFromHistory,
  };
};

export default useRealtimeSearch;
