import React from 'react';
import {
  Calendar,
  MapPin,
  DollarSign,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * Booking status type
 */
export type BookingStatus =
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed'
  | 'checked-in';

/**
 * Props for the BookingCard component
 */
export interface BookingCardProps {
  /** Unique booking identifier */
  id: string;
  /** Guest name */
  guestName: string;
  /** Guest avatar URL */
  guestAvatar?: string;
  /** Property name */
  propertyName: string;
  /** Property thumbnail URL */
  propertyImage?: string;
  /** Check-in date */
  checkIn: Date | string;
  /** Check-out date */
  checkOut: Date | string;
  /** Total price */
  price: number;
  /** Currency symbol */
  currency?: string;
  /** Booking status */
  status: BookingStatus;
  /** Number of guests */
  guests?: number;
  /** Number of nights */
  nights?: number;
  /** Handler for confirm action */
  onConfirm?: (id: string) => void;
  /** Handler for cancel action */
  onCancel?: (id: string) => void;
  /** Handler for view details action */
  onViewDetails?: (id: string) => void;
  /** Handler for message guest action */
  onMessage?: (id: string) => void;
  /** Loading state */
  loading?: boolean;
}

/**
 * BookingCard - A card component for displaying booking information
 *
 * @example
 * ```tsx
 * <BookingCard
 *   id="book-123"
 *   guestName="John Doe"
 *   guestAvatar="/avatars/john.jpg"
 *   propertyName="Luxury Beach Villa"
 *   propertyImage="/properties/villa.jpg"
 *   checkIn="2025-01-15"
 *   checkOut="2025-01-20"
 *   price={2250}
 *   status="confirmed"
 *   guests={4}
 *   nights={5}
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 *   onViewDetails={handleView}
 *   onMessage={handleMessage}
 * />
 * ```
 */
export const BookingCard: React.FC<BookingCardProps> = ({
  id,
  guestName,
  guestAvatar,
  propertyName,
  propertyImage,
  checkIn,
  checkOut,
  price,
  currency = '$',
  status,
  guests,
  nights,
  onConfirm,
  onCancel,
  onViewDetails,
  onMessage,
  loading = false,
}) => {
  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="bg-white/5 rounded-lg border border-gray-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
          </div>
        </div>
      </div>
    );
  }

  const checkInDate = typeof checkIn === 'string' ? new Date(checkIn) : checkIn;
  const checkOutDate =
    typeof checkOut === 'string' ? new Date(checkOut) : checkOut;
  const calculatedNights =
    nights ||
    Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

  return (
    <div className="bg-white/5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            {/* Guest Avatar */}
            <div className="relative flex-shrink-0">
              {guestAvatar ? (
                <img
                  src={guestAvatar}
                  alt={guestName}
                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                  <span className="text-blue-600 font-semibold text-sm">
                    {getInitials(guestName)}
                  </span>
                </div>
              )}
            </div>

            {/* Guest and Property Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-1">
                {guestName}
              </h3>
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{propertyName}</span>
              </div>
              {guests && (
                <div className="flex items-center text-xs text-gray-400">
                  <User className="h-3 w-3 mr-1" />
                  <span>{guests} guest{guests !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <StatusBadge status={status} size="sm" />
        </div>

        {/* Property Thumbnail (if available) */}
        {propertyImage && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={propertyImage}
              alt={propertyName}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Dates Section */}
        <div className="bg-white/5 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-xs text-gray-400 mb-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Check-in</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {formatDate(checkIn)}
              </div>
            </div>
            <div>
              <div className="flex items-center text-xs text-gray-400 mb-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Check-out</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {formatDate(checkOut)}
              </div>
            </div>
          </div>
          {calculatedNights > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-300">
                {calculatedNights} night{calculatedNights !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center text-gray-300">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">Total Price</span>
          </div>
          <div className="text-xl font-bold text-white">
            {currency}
            {price.toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(id)}
              className="px-4 py-2 bg-white/10 text-gray-200 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
            >
              View Details
            </button>
          )}

          {status === 'pending' && onConfirm && (
            <button
              onClick={() => onConfirm(id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Confirm
            </button>
          )}

          {(status === 'pending' || status === 'confirmed') && onCancel && (
            <button
              onClick={() => onCancel(id)}
              className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center ${
                status === 'pending' && onConfirm ? '' : 'col-span-2'
              }`}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </button>
          )}

          {onMessage && (
            <button
              onClick={() => onMessage(id)}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center ${
                (status === 'pending' && (onConfirm || onCancel)) ||
                (status === 'confirmed' && onCancel)
                  ? ''
                  : 'col-span-2'
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
