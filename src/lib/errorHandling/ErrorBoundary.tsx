import React, { Component, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { browserLogger as logger } from '../logger/browser';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retry: () => void;
  retryCount: number;
  maxRetries: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Hata loglaması
    this.logError(error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Callback çağır
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Otomatik retry (3 saniye sonra)
    if (this.state.retryCount < (this.props.maxRetries || 3)) {
      const timeout = setTimeout(() => {
        this.handleRetry();
      }, 3000);
      
      this.retryTimeouts.push(timeout);
    }
  }

  componentWillUnmount() {
    // Timeout'ları temizle
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getCurrentUserId(),
      retryCount: this.state.retryCount
    };

    // Console'a log
    logger.error('Error Boundary caught an error:', errorData as Error, { component: 'Errorboundary' });

    // Hata tracking servisine gönder (örn. Sentry)
    this.sendToErrorTracking(errorData);

    // Local storage'a kaydet
    this.saveErrorToLocalStorage(errorData);
  };

  private getCurrentUserId = (): string | null => {
    // Session'dan kullanıcı ID'si al
    try {
      const userSession = localStorage.getItem('user-session');
      return userSession ? JSON.parse(userSession).userId : null;
    } catch {
      return null;
    }
  };

  private sendToErrorTracking = async (errorData: any) => {
    try {
      await fetch('/api/errors/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData)
      });
    } catch (error) {
      logger.warn('Error tracking service failed:', error);
    }
  };

  private saveErrorToLocalStorage = (errorData: any) => {
    try {
      const existingErrors = localStorage.getItem('app-errors');
      const errors = existingErrors ? JSON.parse(existingErrors) : [];
      
      errors.push(errorData);
      
      // Son 10 hatayı tut
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }
      
      localStorage.setItem('app-errors', JSON.stringify(errors));
    } catch (error) {
      logger.warn('Error saving to localStorage:', error);
    }
  };

  private handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          retry={this.handleRetry}
          retryCount={this.state.retryCount}
          maxRetries={this.props.maxRetries || 3}
        />
      );
    }

    return this.props.children;
  }
}

// Default hata fallback bileşeni
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  retry,
  retryCount,
  maxRetries
}) => {
  const canRetry = retryCount < maxRetries;

  return (
    <div className="min-h-screen bg-lydian-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full bg-glass-dark rounded-2xl p-8 text-center border border-lydian-primary/20">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <div className="flex justify-center mb-6">
              <ExclamationTriangleIcon className="w-16 h-16 text-lydian-primary" />
            </div>
          </motion.div>

        <h2 className="text-2xl font-display font-bold text-lydian-text mb-4">
          Bir Şeyler Ters Gitti
        </h2>
        
        <p className="text-lydian-text-muted mb-6">
          Beklenmeyen bir hata oluştu. Endişelenmeyin, sorunu çözmeye çalışıyoruz.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <details className="mb-6 text-left bg-lydian-bg-card rounded-lg p-4">
            <summary className="cursor-pointer text-lydian-secondary font-semibold mb-2">
              Hata Detayları (Geliştirme)
            </summary>
            <pre className="text-xs text-lydian-text-dim overflow-auto max-h-32">
              {error.message}
            </pre>
            </details>
          </motion.div>
        )}

        <div className="space-y-4">
          {canRetry ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={retry}
                className="w-full bg-gradient-to-r from-lydian-primary to-lydian-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300"
              >
                <ArrowPathIcon className="w-5 h-5 inline-block mr-2" />
                Tekrar Dene {retryCount > 0 && `(${retryCount}/${maxRetries})`}
              </button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-lydian-bg-hover text-lydian-text font-semibold py-3 px-6 rounded-lg border border-lydian-primary/30 hover:border-lydian-primary/60 transition-all duration-300"
              >
                Sayfayı Yenile
              </button>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.02 }}
          >
            <button
              onClick={() => window.location.href = '/'}
              className="w-full text-lydian-text-secondary hover:text-lydian-text transition-colors duration-300"
            >
              Ana Sayfaya Dön
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-lydian-text-dim mt-6">
            Sorun devam ederse, destek ekibimizle iletişime geçin.
          </p>
        </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Hook for programmatic error handling
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
    
    // Log error
    logger.error('Handled error:', error as Error, { component: 'Errorboundary' });
    
    // Send to tracking
    fetch('/api/errors/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        type: 'handled'
      })
    }).catch(console.warn);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

export default ErrorBoundary;
export type { ErrorBoundaryProps, ErrorFallbackProps };