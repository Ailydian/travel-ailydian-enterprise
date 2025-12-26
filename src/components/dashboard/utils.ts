/**
 * Dashboard Utility Functions
 *
 * Helper functions and hooks for dashboard components
 */

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if a route is active
 *
 * @param href - The route to check
 * @param exact - Whether to match exactly (default: false)
 * @returns boolean indicating if route is active
 *
 * @example
 * const isActive = useIsActiveRoute('/dashboard/bookings');
 */
export const useIsActiveRoute = (href: string, exact: boolean = false): boolean => {
  const pathname = usePathname();

  if (exact) {
    return pathname === href;
  }

  if (href === '/dashboard') {
    return pathname === href;
  }

  return pathname?.startsWith(href) ?? false;
};

/**
 * Custom hook to detect mobile screen size
 *
 * @returns boolean indicating if screen is mobile size
 *
 * @example
 * const isMobile = useIsMobile();
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/**
 * Format currency value
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56) // "$1,234.56"
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format relative time (e.g., "5 minutes ago")
 *
 * @param date - The date to format
 * @returns Relative time string
 *
 * @example
 * formatRelativeTime(new Date()) // "just now"
 */
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return then.toLocaleDateString();
};

/**
 * Generate initials from name
 *
 * @param name - Full name
 * @returns Initials (max 2 characters)
 *
 * @example
 * getInitials("John Doe") // "JD"
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Truncate text to specified length
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 *
 * @example
 * truncateText("Hello World", 8) // "Hello..."
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Generate random color for avatar
 *
 * @param seed - Seed string for consistent color
 * @returns Tailwind CSS color class
 *
 * @example
 * getAvatarColor("john@example.com") // "bg-blue-600"
 */
export const getAvatarColor = (seed: string): string => {
  const colors = [
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-teal-600',
  ];

  const hash = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

/**
 * Debounce function for search and other frequent events
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * const debouncedSearch = debounce(handleSearch, 300);
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if user has specific permission
 * (Replace with actual permission logic)
 *
 * @param permission - Permission to check
 * @returns boolean indicating if user has permission
 *
 * @example
 * hasPermission('edit:property') // true/false
 */
export const hasPermission = (permission: string): boolean => {
  // TODO: Implement actual permission checking logic
  // This is a placeholder - connect to your auth system
  return true;
};

/**
 * Get status color class
 *
 * @param status - Status string
 * @returns Tailwind CSS classes for badge
 *
 * @example
 * getStatusColor('confirmed') // "bg-green-100 text-green-800"
 */
export const getStatusColor = (
  status: string
): string => {
  const statusMap: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-white/10 text-white',
  };

  return statusMap[status.toLowerCase()] || 'bg-white/10 text-white';
};

/**
 * Calculate percentage change
 *
 * @param current - Current value
 * @param previous - Previous value
 * @returns Formatted percentage change with sign
 *
 * @example
 * calculatePercentageChange(120, 100) // "+20%"
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): string => {
  if (previous === 0) return '+100%';

  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';

  return `${sign}${change.toFixed(1)}%`;
};

/**
 * Validate email address
 *
 * @param email - Email to validate
 * @returns boolean indicating if email is valid
 *
 * @example
 * isValidEmail('test@example.com') // true
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format phone number
 *
 * @param phone - Phone number to format
 * @returns Formatted phone number
 *
 * @example
 * formatPhoneNumber('1234567890') // "(123) 456-7890"
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
};

/**
 * Copy text to clipboard
 *
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 *
 * @example
 * await copyToClipboard('Hello World');
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};
