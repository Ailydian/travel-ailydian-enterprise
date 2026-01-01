import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Edit,
  Eye,
  MoreVertical,
  Power,
  Bed,
  Users } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * Status type for property
 */
export type PropertyStatus = 'active' | 'inactive' | 'pending';

/**
 * Props for the PropertyCard component
 */
export interface PropertyCardProps {
  /** Unique identifier for the property */
  id: string;
  /** Property title/name */
  title: string;
  /** Location/address */
  location: string;
  /** Property image URL */
  image: string;
  /** Price per night */
  price: number;
  /** Currency symbol */
  currency?: string;
  /** Average rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Number of bedrooms */
  bedrooms?: number;
  /** Maximum guests */
  maxGuests?: number;
  /** Property status */
  status: PropertyStatus;
  /** Handler for edit action */
  onEdit?: (id: string) => void;
  /** Handler for view action */
  onView?: (id: string) => void;
  /** Handler for deactivate/activate action */
  onToggleStatus?: (id: string) => void;
  /** Loading state */
  loading?: boolean;
}

/**
 * PropertyCard - A card component for displaying property listings
 *
 * @example
 * ```tsx
 * <PropertyCard
 *   id="prop-123"
 *   title="Luxury Beach Villa"
 *   location="Malibu, California"
 *   image="/images/property.jpg"
 *   price={450}
 *   rating={4.8}
 *   reviewCount={124}
 *   status="active"
 *   bedrooms={4}
 *   maxGuests={8}
 *   onEdit={handleEdit}
 *   onView={handleView}
 *   onToggleStatus={handleToggle}
 * />
 * ```
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  image,
  price,
  currency = '$',
  rating,
  reviewCount,
  bedrooms,
  maxGuests,
  status,
  onEdit,
  onView,
  onToggleStatus,
  loading = false
}) => {
  const [showActions, setShowActions] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return (
      <div className="bg-lydian-glass-dark rounded-lg border border-lydian-border overflow-hidden">
        <div className="h-48 bg-lydian-bg-active animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-lydian-bg-active rounded animate-pulse w-3/4" />
          <div className="h-4 bg-lydian-bg-active rounded animate-pulse w-1/2" />
          <div className="flex items-center justify-between">
            <div className="h-6 bg-lydian-bg-active rounded animate-pulse w-24" />
            <div className="h-5 bg-lydian-bg-active rounded animate-pulse w-16" />
          </div>
        </div>
      </div>);

  }

  return (
    <div className="bg-lydian-glass-dark rounded-lg border border-lydian-border overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-lydian-glass-dark-medium">
        {!imageError ?
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImageError(true)}
          loading="lazy" /> :


        <div className="w-full h-full flex items-center justify-center bg-lydian-bg-active">
            <MapPin className="h-12 w-12 text-lydian-text-muted" />
          </div>
        }

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} size="sm" />
        </div>

        {/* Actions Menu */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="bg-lydian-glass-dark rounded-full p-2 shadow-md hover:bg-lydian-glass-dark-medium transition-colors focus:outline-none focus:ring-2 focus:ring-lydian-border-focus"
              aria-label="Property actions">

              <MoreVertical className="h-4 w-4 text-lydian-text-muted" />
            </button>

            {showActions &&
            <>
                <div
                className="fixed inset-0 z-10"
                onClick={() => setShowActions(false)} />

                <div className="absolute right-0 mt-2 w-48 bg-lydian-glass-dark rounded-lg shadow-lg border border-lydian-border py-1 z-20">
                  {onView &&
                <button
                  onClick={() => {
                    onView(id);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-lydian-text-muted hover:bg-lydian-glass-dark-medium flex items-center space-x-2">

                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                }
                  {onEdit &&
                <button
                  onClick={() => {
                    onEdit(id);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-lydian-text-muted hover:bg-lydian-glass-dark-medium flex items-center space-x-2">

                      <Edit className="h-4 w-4" />
                      <span>Edit Property</span>
                    </button>
                }
                  {onToggleStatus &&
                <button
                  onClick={() => {
                    onToggleStatus(id);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-lydian-text-muted hover:bg-lydian-glass-dark-medium flex items-center space-x-2">

                      <Power className="h-4 w-4" />
                      <span>
                        {status === 'active' ? 'Deactivate' : 'Activate'}
                      </span>
                    </button>
                }
                </div>
              </>
            }
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-lydian-text-inverse mb-1 line-clamp-1">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-lydian-text-dim mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Property Details */}
        {(bedrooms || maxGuests) &&
        <div className="flex items-center space-x-4 mb-3 text-sm text-lydian-text-dim">
            {bedrooms &&
          <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
              </div>
          }
            {maxGuests &&
          <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{maxGuests} guests</span>
              </div>
          }
          </div>
        }

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-lydian-text-inverse">
              {currency}{price.toLocaleString()}
            </div>
            <span className="text-sm text-lydian-text-muted">/night</span>
          </div>

          {rating !== undefined &&
          <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-lydian-text-inverse">
                {rating.toFixed(1)}
              </span>
              {reviewCount !== undefined &&
            <span className="text-xs text-lydian-text-muted">({reviewCount})</span>
            }
            </div>
          }
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-lydian-border-light flex gap-2">
          {onView &&
          <button
            onClick={() => onView(id)}
            className="flex-1 px-4 py-2 bg-lydian-glass-dark-medium text-lydian-text-muted rounded-lg hover:bg-lydian-bg-active transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lydian-border-focus">

              View
            </button>
          }
          {onEdit &&
          <button
            onClick={() => onEdit(id)}
            className="flex-1 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lydian-border-focus">

              Edit
            </button>
          }
        </div>
      </div>
    </div>);

};

export default PropertyCard;