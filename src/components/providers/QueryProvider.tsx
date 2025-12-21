// React Query Provider Wrapper
// Comprehensive setup with caching, retries, and dev tools
'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes - data is considered fresh for 5 minutes
      staleTime: 1000 * 60 * 5,

      // Cache time: 10 minutes - data stays in cache for 10 minutes after becoming stale
      gcTime: 1000 * 60 * 10,

      // Refetch on window focus for fresh data
      refetchOnWindowFocus: true,

      // Refetch on reconnect after network loss
      refetchOnReconnect: true,

      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Network mode: only fetch when online
      networkMode: 'online',
    },
    mutations: {
      // Retry mutations once
      retry: 1,

      // Network mode for mutations
      networkMode: 'online',
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * QueryProvider - React Query setup wrapper
 *
 * Provides React Query context to the entire application with:
 * - Optimized caching strategy
 * - Automatic refetching on window focus
 * - Network-aware request handling
 * - Built-in retry logic with exponential backoff
 * - Dev tools in development mode
 *
 * @example
 * ```tsx
 * import { QueryProvider } from '@/components/providers/QueryProvider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <QueryProvider>
 *       {children}
 *     </QueryProvider>
 *   );
 * }
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Dev tools - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

/**
 * Export the query client for use in server components and utilities
 */
export { queryClient };
