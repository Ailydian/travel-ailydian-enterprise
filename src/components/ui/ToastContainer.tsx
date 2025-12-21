/**
 * Toast Container - Global Toast Manager
 * Handles positioning, stacking, and lifecycle of toasts
 */

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import PremiumToast, { Toast, ToastPosition } from './PremiumToast';

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
  position?: ToastPosition;
  maxToasts?: number;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 sm:top-6',
  'top-left': 'top-4 left-4 sm:top-6 sm:left-6',
  'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6',
  'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = 'top-right',
  maxToasts = 3,
}) => {
  // Show only the most recent toasts
  const visibleToasts = toasts.slice(-maxToasts);

  return (
    <div
      className={`fixed z-[10000] pointer-events-none ${positionClasses[position]}`}
      style={{
        width: position.includes('center') ? 'auto' : undefined,
        maxWidth: '90vw',
      }}
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {visibleToasts.map((toast) => (
            <PremiumToast
              key={toast.id}
              toast={toast}
              onClose={onClose}
              position={position}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToastContainer;
