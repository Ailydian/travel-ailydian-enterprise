/**
 * Map View Component for Rentals
 * Interactive map showing rental properties with clustering and popups
 */

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RentalProperty } from '../../data/rental-properties';
import { StarIcon, MapPinIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface MapViewProps {
  properties: RentalProperty[];
}

// Custom marker icon
const createCustomIcon = (price: number, featured: boolean) => {
  const priceLabel = `${Math.round(price / 1000)}k ₺`;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="${
          featured
            ? 'bg-gradient-to-r from-red-600 to-orange-500'
            : 'bg-white'
        } px-3 py-2 rounded-full shadow-lg border-2 ${
          featured ? 'border-white' : 'border-red-600'
        } font-bold text-sm ${featured ? 'text-white' : 'text-gray-900'} hover:scale-110 transition-transform cursor-pointer">
          ${priceLabel}
        </div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 40],
  });
};

// Component to fit map bounds to markers
const MapBounds: React.FC<{ properties: RentalProperty[] }> = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map((p) => [p.location.coordinates.lat, p.location.coordinates.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [properties, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<RentalProperty | null>(null);

  // Default center (Turkey)
  const defaultCenter: [number, number] = [37.0, 35.0];

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full rounded-2xl"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBounds properties={properties} />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.coordinates.lat, property.location.coordinates.lng]}
            icon={createCustomIcon(property.pricing.basePrice, property.featured)}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup
              className="custom-popup"
              maxWidth={300}
              closeButton={true}
            >
              <div className="p-2">
                {/* Image */}
                <div className="relative h-40 mb-3 rounded-lg overflow-hidden">
                  <img
                    src={property.images[0] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.featured && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                      Öne Çıkan
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>
                    {property.location.district}, {property.location.city}
                  </span>
                </div>

                {/* Info */}
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{property.capacity.guests}</span>
                  </div>
                  <span>•</span>
                  <span>{property.capacity.bedrooms} yatak odası</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-orange-500 text-white px-2 py-1 rounded-lg">
                    <StarIcon className="w-3 h-3" />
                    <span className="font-bold text-xs">{property.rating.overall.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-gray-600">
                    ({property.rating.reviewCount} değerlendirme)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {property.pricing.basePrice.toLocaleString('tr-TR')} ₺
                    </p>
                    <p className="text-xs text-gray-600">/ gece</p>
                  </div>
                </div>

                {/* View Button */}
                <Link
                  href={`/rentals/${property.slug}`}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Detayları Gör
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 z-[1000]">
        <h4 className="font-bold text-gray-900 mb-3">Harita Gösterimi</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
            <span className="text-gray-700">Öne Çıkan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border-2 border-red-600 rounded-full"></div>
            <span className="text-gray-700">Standart</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Toplam {properties.length} özellik gösteriliyor
        </p>
      </div>
    </div>
  );
};

export default MapView;
