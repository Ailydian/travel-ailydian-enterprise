/**
 * Live Notifications Component
 * Displays real-time booking notifications with toast animations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, XCircle, AlertCircle, Home, Car, Bus, Compass, X } from 'lucide-react';
import { BookingNotification } from '@/lib/websocket/dashboard';

interface LiveNotificationsProps {
  notifications: BookingNotification[];
  onDismiss?: (id: string) => void;
}

const getNotificationIcon = (type: BookingNotification['type']) => {
  switch (type) {
    case 'property':
      return Home;
    case 'car':
      return Car;
    case 'transfer':
      return Bus;
    case 'tour':
      return Compass;
    default:
      return Bell;
  }
};

const getNotificationColor = (status: BookingNotification['status']) => {
  switch (status) {
    case 'new':
      return 'from-blue-500 to-blue-600';
    case 'confirmed':
      return 'from-green-500 to-green-600';
    case 'cancelled':
      return 'from-red-500 to-red-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const getStatusIcon = (status: BookingNotification['status']) => {
  switch (status) {
    case 'new':
      return AlertCircle;
    case 'confirmed':
      return CheckCircle;
    case 'cancelled':
      return XCircle;
    default:
      return Bell;
  }
};

const getStatusText = (status: BookingNotification['status']) => {
  switch (status) {
    case 'new':
      return 'Yeni Rezervasyon';
    case 'confirmed':
      return 'Onaylandı';
    case 'cancelled':
      return 'İptal Edildi';
    default:
      return 'Bildirim';
  }
};

const NotificationItem: React.FC<{
  notification: BookingNotification;
  onDismiss: (id: string) => void;
}> = ({ notification, onDismiss }) => {
  const Icon = getNotificationIcon(notification.type);
  const StatusIcon = getStatusIcon(notification.status);
  const colorClass = getNotificationColor(notification.status);

  useEffect(() => {
    // Auto dismiss after 10 seconds
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 10000);

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative w-96 max-w-full">

      <div className={`bg-gradient-to-r ${colorClass} p-0.5 rounded-xl shadow-2xl`}>
        <div className="bg-lydian-glass-dark dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-lydian-text-inverse" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <StatusIcon className="w-4 h-4 text-lydian-text-muted" />
                <span className="text-xs font-semibold text-lydian-text-muted uppercase tracking-wide">
                  {getStatusText(notification.status)}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-lydian-text-inverse dark:text-lydian-text-inverse mb-1 truncate">
                {notification.title}
              </h4>

              {/* Customer */}
              <p className="text-xs text-lydian-text-dim dark:text-lydian-text-muted mb-2">
                <span className="font-medium">{notification.customerName}</span>
              </p>

              {/* Amount & Time */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-lydian-text-inverse dark:text-lydian-text-inverse">
                  {notification.amount.toLocaleString('tr-TR')} {notification.currency}
                </span>
                <span className="text-xs text-lydian-text-muted">
                  {new Date(notification.timestamp).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => onDismiss(notification.id)}
              className="flex-shrink-0 w-6 h-6 rounded-lg hover:bg-lydian-glass-dark-medium dark:hover:bg-gray-800 flex items-center justify-center transition-colors">

              <X className="w-4 h-4 text-lydian-text-muted" />
            </button>
          </div>
        </div>
      </div>

      {/* Pulse animation for new bookings */}
      {notification.status === 'new' &&
      <motion.div
        className="absolute inset-0 rounded-xl bg-lydian-primary/20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }} />

      }
    </motion.div>);

};

export const LiveNotifications: React.FC<LiveNotificationsProps> = ({
  notifications,
  onDismiss
}) => {
  const handleDismiss = (id: string) => {
    if (onDismiss) {
      onDismiss(id);
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) =>
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={handleDismiss} />

        )}
      </AnimatePresence>
    </div>);

};

/**
 * Notification Sound Hook
 */
export function useNotificationSound() {
  const playSound = (type: 'success' | 'info' | 'error' = 'info') => {
    if (typeof window === 'undefined') return;

    // Use Web Audio API for notification sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different types
      const frequencies = {
        success: [523.25, 659.25], // C5, E5
        info: [440, 554.37], // A4, C#5
        error: [329.63, 293.66] // E4, D4
      };

      const [freq1, freq2] = frequencies[type];

      oscillator.frequency.setValueAtTime(freq1, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(freq2, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Failed to play notification sound:', error);
    }
  };

  return { playSound };
}