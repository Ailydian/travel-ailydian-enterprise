/**
 * Error Boundary Component - CLAUDE.md Compliant
 *
 * React Error Boundary with enterprise-grade error handling
 * - Catches React component errors
 * - Logs to monitoring service
 * - Provides fallback UI
 * - Supports error recovery
 */

'use client';

import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import logger from '@/lib/logger';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: (error: Error, reset: () => void) => ReactNode;
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void;
  readonly resetKeys?: readonly unknown[];
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
}

/**
 * Error Boundary Component
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary fallback={(error, reset) => <ErrorFallback error={error} onReset={reset} />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to enterprise logging system
    logger.error('React component error caught by Error Boundary', error, {
      component: 'ErrorBoundary',
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, send to error monitoring service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with Sentry or similar
      // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset error boundary when resetKeys change
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      !this.areResetKeysEqual(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.reset();
    }
  }

  private areResetKeysEqual(a: readonly unknown[], b: readonly unknown[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((item, index) => Object.is(item, b[index]));
  }

  private reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // Default fallback UI
      return <DefaultErrorFallback error={this.state.error} onReset={this.reset} />;
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback UI
 */
interface DefaultErrorFallbackProps {
  readonly error: Error;
  readonly onReset: () => void;
}

function DefaultErrorFallback({ error, onReset }: DefaultErrorFallbackProps): JSX.Element {
  return (
    <div
      role="alert"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Error Details (Development Only)
            </h2>
            <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.stack && (
              <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-32">
                {error.stack}
              </pre>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for error boundary
 *
 * Usage:
 * ```tsx
 * const { ErrorBoundary, resetError } = useErrorBoundary();
 *
 * return (
 *   <ErrorBoundary>
 *     <Component />
 *   </ErrorBoundary>
 * );
 * ```
 */
export function useErrorBoundary() {
  const [resetKey, setResetKey] = React.useState(0);

  const resetError = React.useCallback(() => {
    setResetKey((prev) => prev + 1);
  }, []);

  const ErrorBoundaryWithKey = React.useCallback(
    ({ children, ...props }: Omit<ErrorBoundaryProps, 'resetKeys'>) => (
      <ErrorBoundary {...props} resetKeys={[resetKey]}>
        {children}
      </ErrorBoundary>
    ),
    [resetKey]
  );

  return {
    ErrorBoundary: ErrorBoundaryWithKey,
    resetError,
  };
}

export default ErrorBoundary;
