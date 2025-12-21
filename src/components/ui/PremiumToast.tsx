/**
 * Premium Toast Notification System
 * Inspired by: Booking.com, Expedia, Airbnb, Stripe
 * Features:
 * - Smooth animations with Framer Motion
 * - Multiple toast types (success, error, warning, info)
 * - Action buttons (View Cart, Undo)
 * - Auto-dismiss with progress bar
 * - Stack management (max 3 visible)
 * - Mobile & Desktop optimized
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  X,
  ShoppingCart,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Package,
  Heart,
  Star
} from 'lucide-react';
import { useRouter } from 'next/router';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'cart';
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center' | 'top-left' | 'bottom-left';

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: ToastAction;
  undoAction?: () => void;
  image?: string;
  badge?: string;
  showCart?: boolean;
  itemCount?: number;
  price?: string;
}

interface PremiumToastProps {
  toast: Toast;
  onClose: (id: string) => void;
  position?: ToastPosition;
}

const typeConfig = {
  success: {
    icon: CheckCircle2,
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    iconColor: 'text-white',
  },
  error: {
    icon: XCircle,
    gradient: 'from-red-500 to-rose-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    iconColor: 'text-white',
  },
  warning: {
    icon: AlertCircle,
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-900',
    iconColor: 'text-white',
  },
  info: {
    icon: Info,
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    iconColor: 'text-white',
  },
  cart: {
    icon: ShoppingCart,
    gradient: 'from-ailydian-primary to-ailydian-secondary',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    iconColor: 'text-white',
  },
};

const PremiumToast: React.FC<PremiumToastProps> = ({ toast, onClose, position = 'top-right' }) => {
  const [progress, setProgress] = useState(100);
  const router = useRouter();
  const config = typeConfig[toast.type];
  const Icon = config.icon;
  const duration = toast.duration || 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onClose(toast.id);
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [toast.id, duration, onClose]);

  const handleAction = () => {
    if (toast.action?.onClick) {
      toast.action.onClick();
      onClose(toast.id);
    }
  };

  const handleUndo = () => {
    if (toast.undoAction) {
      toast.undoAction();
      onClose(toast.id);
    }
  };

  const handleViewCart = () => {
    router.push('/cart-new');
    onClose(toast.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: position.includes('top') ? -50 : 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="relative w-full max-w-md"
    >
      <div className={`relative bg-white rounded-2xl shadow-2xl border-2 ${config.border} overflow-hidden backdrop-blur-xl`}>
        {/* Background Gradient Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5`} />

        {/* Content Container */}
        <div className="relative p-4">
          <div className="flex items-start gap-4">
            {/* Icon with Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.1, damping: 15 }}
              className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}
            >
              {toast.type === 'cart' && toast.itemCount ? (
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-white" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
                  >
                    <span className="text-xs font-bold text-blue-600">{toast.itemCount}</span>
                  </motion.div>
                </div>
              ) : (
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              )}
            </motion.div>

            {/* Toast Content */}
            <div className="flex-1 min-w-0">
              {/* Title with Badge */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-bold text-base ${config.text}`}>
                  {toast.title}
                </h3>
                {toast.badge && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                    {toast.badge}
                  </span>
                )}
              </div>

              {/* Message */}
              {toast.message && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {toast.message}
                </p>
              )}

              {/* Image Preview (for cart items) */}
              {toast.image && (
                <div className="mb-3 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={toast.image}
                    alt={toast.title}
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}

              {/* Price Display */}
              {toast.price && (
                <div className="mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {toast.price}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Primary Action (View Cart) */}
                {toast.showCart && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewCart}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Sepete Git
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                )}

                {/* Custom Action */}
                {toast.action && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAction}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      toast.action.variant === 'primary'
                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg hover:shadow-xl`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {toast.action.label}
                  </motion.button>
                )}

                {/* Undo Action */}
                {toast.undoAction && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUndo}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Geri Al
                  </motion.button>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => onClose(toast.id)}
              className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors group"
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
          <motion.div
            className={`h-full bg-gradient-to-r ${config.gradient}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        {/* Sparkle Effect for Cart */}
        {toast.type === 'cart' && (
          <>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-2 right-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-500 opacity-50" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-2 left-2"
            >
              <Sparkles className="w-3 h-3 text-blue-500 opacity-30" />
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PremiumToast;
