'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapSelectorProps {
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
  defaultCenter?: [number, number];
  defaultZoom?: number;
}

// Component for handling map clicks
function LocationMarker({
  position,
  onPositionChange,
}: {
  position: Location | null;
  onPositionChange: (location: Location) => void;
}) {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      // Reverse geocoding to get address
      let address = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();

        if (data.display_name) {
          address = data.display_name;
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }

      onPositionChange({ lat, lng, address });
    },
  });

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]} />
  );
}

const MapSelector: React.FC<MapSelectorProps> = ({
  onLocationSelect,
  selectedLocation,
  defaultCenter = [39.9334, 32.8597], // Ankara, Turkey default
  defaultZoom = 13,
}) => {
  const [position, setPosition] = useState<Location | null>(selectedLocation);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setPosition(selectedLocation);
  }, [selectedLocation]);

  const handlePositionChange = useCallback(
    (newPosition: Location) => {
      setPosition(newPosition);
      onLocationSelect(newPosition);
    },
    [onLocationSelect]
  );

  // Search locations using Nominatim
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=tr`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSearchResult = (result: any) => {
    const location: Location = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: result.display_name,
    };
    handlePositionChange(location);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Adres veya konum ara... (örn: Kızılay, Ankara)"
          className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white/5 border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectSearchResult(result)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <p className="text-sm text-gray-100 font-medium">
                  {result.display_name}
                </p>
              </button>
            ))}
          </div>
        )}

        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-2 border-white/10 shadow-md">
        <MapContainer
          center={position ? [position.lat, position.lng] : defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            onPositionChange={handlePositionChange}
          />
        </MapContainer>

        {/* Instructions Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md z-[1000]">
          <p className="text-sm text-gray-200">
            <strong>💡 İpucu:</strong> Haritada bir noktaya tıklayarak konumunuzu seçin veya üstteki arama kutusunu kullanın.
          </p>
        </div>
      </div>

      {/* Current Location Button */}
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const location: Location = {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                  address: 'Mevcut konumunuz',
                };
                handlePositionChange(location);
              },
              (error) => {
                console.error('Geolocation error:', error);
                alert('Konum bilgisi alınamadı. Lütfen tarayıcı izinlerini kontrol edin.');
              }
            );
          } else {
            alert('Tarayıcınız konum servislerini desteklemiyor.');
          }
        }}
        className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm flex items-center justify-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Mevcut Konumumu Kullan
      </button>
    </div>
  );
};

export default MapSelector;
