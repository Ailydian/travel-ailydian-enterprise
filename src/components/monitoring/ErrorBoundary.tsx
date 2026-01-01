/**
 * Error Boundary Component
 * Catches React errors and reports to Sentry
 *
 * @component ErrorBoundary
 * @sentry Automatic error reporting
 */

'use client';

import React, { Component, ReactNode } from 'react';
import { handleErrorBoundary } from '../../lib/monitoring/sentry-utils';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// ============================================
// ERROR BOUNDARY
// ============================================

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Report to Sentry
    handleErrorBoundary(error, errorInfo);

    // Update state
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-base p-6">
          <div className="max-w-md w-full">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-error-500/20 blur-3xl rounded-full" />
                <div className="relative bg-gradient-to-br from-error-500 to-error-600 p-6 rounded-2xl">
                  <AlertTriangle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text-primary mb-3">
                Bir Hata Oluştu
              </h1>
              <p className="text-text-secondary mb-2">
                Üzgünüz, beklenmeyen bir hata meydana geldi. Teknik ekibimiz
                bilgilendirildi ve sorunu çözmek için çalışıyor.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-error-500 hover:text-error-600 font-medium">
                    Teknik Detaylar (Geliştirici Modu)
                  </summary>
                  <div className="mt-3 p-4 bg-surface-elevated rounded-lg border border-border-subtle">
                    <div className="text-sm">
                      <div className="font-mono text-error-500 mb-2">
                        {this.state.error.name}: {this.state.error.message}
                      </div>
                      {this.state.error.stack && (
                        <pre className="text-xs text-text-muted overflow-auto max-h-48">
                          {this.state.error.stack}
                        </pre>
                      )}
                      {this.state.errorInfo?.componentStack && (
                        <div className="mt-3">
                          <div className="font-semibold text-text-secondary mb-1">
                            Component Stack:
                          </div>
                          <pre className="text-xs text-text-muted overflow-auto max-h-32">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                <RefreshCcw className="w-5 h-5" />
                Tekrar Dene
              </button>

              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-surface-elevated hover:bg-surface-card text-text-primary rounded-lg font-medium border border-border-subtle transition-colors duration-200"
              >
                <RefreshCcw className="w-5 h-5" />
                Sayfayı Yenile
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-surface-elevated hover:bg-surface-card text-text-primary rounded-lg font-medium border border-border-subtle transition-colors duration-200"
              >
                <Home className="w-5 h-5" />
                Ana Sayfaya Dön
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-text-muted">
                Sorun devam ederse lütfen{' '}
                <a
                  href="mailto:support@ailydian.com"
                  className="text-primary-500 hover:text-primary-600 underline"
                >
                  destek ekibi ile iletişime geçin
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
