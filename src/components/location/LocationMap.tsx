import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Coordinates } from '../../lib/types/review-system';

interface LocationMapProps {
  coordinates: Coordinates;
  locationName: string;
  address?: string;
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  coordinates, 
  locationName, 
  address,
  zoom = 15 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Initialize map when component mounts
    const initializeMap = () => {
      if (!mapRef.current) return;

      // For now, we'll show a placeholder map
      // In a real implementation, you would integrate with Google Maps, Mapbox, or OpenStreetMap
      console.log('Map would be initialized here with coordinates:', coordinates);
    };

    initializeMap();

    return () => {
      // Cleanup map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates]);

  return (
    <div className="w-full h-64 relative">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative"
      >
        {/* Placeholder Map Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-100 mb-2">{locationName}</h3>
            {address && (
              <p className="text-sm text-gray-600 mb-2">{address}</p>
            )}
            <div className="text-xs text-gray-500">
              <p>Lat: {coordinates.lat.toFixed(6)}</p>
              <p>Lng: {coordinates.lng.toFixed(6)}</p>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="bg-white/5 shadow-md rounded p-2 hover:bg-gray-50 transition-colors">
            <span className="text-lg font-bold">+</span>
          </button>
          <button className="bg-white/5 shadow-md rounded p-2 hover:bg-gray-50 transition-colors">
            <span className="text-lg font-bold">-</span>
          </button>
        </div>

        {/* Directions Button */}
        <div className="absolute bottom-4 left-4">
          <button 
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
              window.open(url, '_blank');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Get Directions
          </button>
        </div>
      </div>

      {/* Map Integration Notice */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Map integration is ready for implementation. 
          Add your preferred map service (Google Maps, Mapbox, etc.) to enable interactive maps.
        </p>
      </div>
    </div>
  );
};

export default LocationMap;