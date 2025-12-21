/**
 * Toast Context - Global Toast Management
 * Provides toast notification system across the entire app
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/ui/ToastContainer';
import { Toast, ToastType, ToastPosition, ToastAction } from '../components/ui/PremiumToast';

interface ToastContextType {
  showToast: (options: Omit<Toast, 'id'>) => void;
  showSuccess: (title: string, message?: string, options?: Partial<Toast>) => void;
  showError: (title: string, message?: string, options?: Partial<Toast>) => void;
  showWarning: (title: string, message?: string, options?: Partial<Toast>) => void;
  showInfo: (title: string, message?: string, options?: Partial<Toast>) => void;
  showCartToast: (options: {
    title: string;
    message?: string;
    image?: string;
    price?: string;
    itemCount?: number;
    undoAction?: () => void;
  }) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}> = ({ children, position = 'top-right', maxToasts = 3 }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const showToast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = generateId();
    const newToast: Toast = {
      id,
      duration: 5000,
      ...options,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const showSuccess = useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({
        type: 'success',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({
        type: 'error',
        title,
        message,
        duration: 7000, // Errors stay longer
        ...options,
      });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({
        type: 'warning',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({
        type: 'info',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const showCartToast = useCallback(
    (options: {
      title: string;
      message?: string;
      image?: string;
      price?: string;
      itemCount?: number;
      undoAction?: () => void;
    }) => {
      showToast({
        type: 'cart',
        title: options.title,
        message: options.message,
        image: options.image,
        price: options.price,
        itemCount: options.itemCount,
        showCart: true,
        undoAction: options.undoAction,
        duration: 6000, // Cart toasts stay longer
        badge: 'Sepete Eklendi',
      });
    },
    [showToast]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCartToast,
    removeToast,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
        position={position}
        maxToasts={maxToasts}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
