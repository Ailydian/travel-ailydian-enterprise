'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet marker ikonları için
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/icons/marker-icon-2x.png',
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png',
});

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
  type?: 'hotel' | 'tour' | 'restaurant' | 'attraction' | 'pickup' | 'custom';
}

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  locations?: MapLocation[];
  onLocationSelect?: (location: MapLocation) => void;
  allowCustomMarkers?: boolean;
  customPickupLocation?: MapLocation | null;
  onPickupLocationChange?: (location: MapLocation | null) => void;
  showPickupOption?: boolean;
  destinationBounds?: [[number, number], [number, number]];
  className?: string;
}

// Özel marker ikonları
const markerIcons = {
  hotel: new L.Icon({
    iconUrl: '/icons/hotel-marker.png',
    iconRetinaUrl: '/icons/hotel-marker-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowSize: [32, 32],
    shadowAnchor: [16, 32],
  }),
  tour: new L.Icon({
    iconUrl: '/icons/tour-marker.png',
    iconRetinaUrl: '/icons/tour-marker-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowSize: [32, 32],
    shadowAnchor: [16, 32],
  }),
  restaurant: new L.Icon({
    iconUrl: '/icons/restaurant-marker.png',
    iconRetinaUrl: '/icons/restaurant-marker-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
    shadowSize: [28, 28],
    shadowAnchor: [14, 28],
  }),
  attraction: new L.Icon({
    iconUrl: '/icons/attraction-marker.png',
    iconRetinaUrl: '/icons/attraction-marker-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    shadowSize: [30, 30],
    shadowAnchor: [15, 30],
  }),
  pickup: new L.Icon({
    iconUrl: '/icons/pickup-marker.png',
    iconRetinaUrl: '/icons/pickup-marker-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
    shadowSize: [36, 36],
    shadowAnchor: [18, 36],
  }),
  custom: new L.Icon({
    iconUrl: '/icons/custom-marker.png',
    iconRetinaUrl: '/icons/custom-marker-2x.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
    shadowSize: [28, 28],
    shadowAnchor: [14, 28],
  }),
};

// Harita üzerindeki tıklama olaylarını işleyen component
function LocationSelector({ 
  onLocationSelect, 
  allowCustomMarkers = false,
  onPickupLocationChange,
  showPickupOption = false 
}: {
  onLocationSelect?: (location: MapLocation) => void;
  allowCustomMarkers?: boolean;
  onPickupLocationChange?: (location: MapLocation | null) => void;
  showPickupOption?: boolean;
}) {
  const [isSelectingPickup, setIsSelectingPickup] = useState(false);

  const map = useMapEvents({
    click: async (e) => {
      if (allowCustomMarkers || showPickupOption) {
        const { lat, lng } = e.latlng;
        
        // Reverse geocoding ile adresi al
        const address = await reverseGeocode(lat, lng);
        
        const location: MapLocation = {
          lat,
          lng,
          address,
          type: showPickupOption && isSelectingPickup ? 'pickup' : 'custom',
          name: showPickupOption && isSelectingPickup ? 'Alınacak Nokta' : 'Özel Konum'
        };

        if (showPickupOption && isSelectingPickup) {
          onPickupLocationChange?.(location);
          setIsSelectingPickup(false);
        } else {
          onLocationSelect?.(location);
        }
      }
    },
  });

  // Pickup seçimi modunu başlat
  useEffect(() => {
    if (showPickupOption) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'p' || e.key === 'P') {
          setIsSelectingPickup(true);
          map.getContainer().style.cursor = 'crosshair';
        }
        if (e.key === 'Escape') {
          setIsSelectingPickup(false);
          map.getContainer().style.cursor = '';
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        map.getContainer().style.cursor = '';
      };
    }
  }, [map, showPickupOption]);

  return null;
}

// Reverse geocoding fonksiyonu
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    
    if (data && data.display_name) {
      return data.display_name;
    }
    
    return `Enlem: ${lat.toFixed(6)}, Boylam: ${lng.toFixed(6)}`;
  } catch (error) {
    console.error('Reverse geocoding hatası:', error);
    return `Enlem: ${lat.toFixed(6)}, Boylam: ${lng.toFixed(6)}`;
  }
}

// Address search hook
function useAddressSearch() {
  const [searchResults, setSearchResults] = useState<MapLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchAddress = useCallback(async (query: string) => {
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
      
      const results: MapLocation[] = data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        address: item.display_name,
        name: item.name || item.display_name.split(',')[0],
        type: 'custom' as const
      }));
      
      setSearchResults(results);
    } catch (error) {
      console.error('Adres arama hatası:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { searchResults, isSearching, searchAddress };
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = [41.0082, 28.9784], // İstanbul merkezi
  zoom = 13,
  height = '400px',
  locations = [],
  onLocationSelect,
  allowCustomMarkers = false,
  customPickupLocation,
  onPickupLocationChange,
  showPickupOption = false,
  destinationBounds,
  className = ''
}) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { searchResults, isSearching, searchAddress } = useAddressSearch();
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      searchAddress(searchQuery);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, searchAddress]);

  const handleSearchResultClick = (location: MapLocation) => {
    if (showPickupOption) {
      onPickupLocationChange?.(location);
    } else {
      onLocationSelect?.(location);
    }
    setShowSearchResults(false);
    setSearchQuery('');
    
    // Haritayı bu konuma odakla
    if (mapRef.current) {
      mapRef.current.setView([location.lat, location.lng], 16);
    }
  };

  const clearPickupLocation = () => {
    onPickupLocationChange?.(null);
  };

  if (!mounted) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Harita yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Arama ve kontrol paneli */}
      <div className="absolute top-4 left-4 right-4 z-[1000] bg-white/5 rounded-lg shadow-lg p-4">
        <div className="space-y-3">
          {/* Adres arama */}
          <div className="relative">
            <input
              type="text"
              placeholder="Adres, mekan adı veya mahalle ara..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSearching && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            
            {/* Arama sonuçları */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white/5 border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-sm">{result.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{result.address}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pickup location controls */}
          {showPickupOption && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-700">
                  {customPickupLocation ? 'Alınacak nokta seçildi' : 'Haritadan alınacak noktayı seçin'}
                </span>
              </div>
              {customPickupLocation && (
                <button
                  onClick={clearPickupLocation}
                  className="text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                >
                  Temizle
                </button>
              )}
            </div>
          )}

          {/* Klavye kısayolları */}
          {showPickupOption && (
            <div className="text-xs text-gray-400">
              💡 <strong>P</strong> tuşu ile alınacak nokta seçim modunu aktifleştirin
            </div>
          )}
        </div>
      </div>

      {/* Harita */}
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ height, width: '100%' }}
        className="z-0"
        bounds={destinationBounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationSelector
          onLocationSelect={onLocationSelect}
          allowCustomMarkers={allowCustomMarkers}
          onPickupLocationChange={onPickupLocationChange}
          showPickupOption={showPickupOption}
        />

        {/* Mevcut lokasyonları göster */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={location.type ? markerIcons[location.type] : markerIcons.custom}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">
                  {location.name || 'Konum'}
                </h3>
                {location.address && (
                  <p className="text-xs text-gray-300 mb-2">
                    {location.address}
                  </p>
                )}
                <div className="text-xs text-gray-400">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </div>
                {location.type && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {location.type === 'pickup' ? 'Alınacak Nokta' :
                       location.type === 'hotel' ? 'Otel' :
                       location.type === 'tour' ? 'Tur' :
                       location.type === 'restaurant' ? 'Restoran' :
                       location.type === 'attraction' ? 'Turistik Yer' : 'Özel Konum'}
                    </span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Custom pickup location marker */}
        {customPickupLocation && (
          <Marker
            position={[customPickupLocation.lat, customPickupLocation.lng]}
            icon={markerIcons.pickup}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">
                  🚐 Alınacak Nokta
                </h3>
                {customPickupLocation.address && (
                  <p className="text-xs text-gray-300 mb-2">
                    {customPickupLocation.address}
                  </p>
                )}
                <div className="text-xs text-gray-400">
                  {customPickupLocation.lat.toFixed(6)}, {customPickupLocation.lng.toFixed(6)}
                </div>
                <button
                  onClick={clearPickupLocation}
                  className="mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
                >
                  Kaldır
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Harita altındaki bilgi paneli */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>Otel</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Tur</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Restoran</span>
            </div>
            {showPickupOption && (
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span>Alınacak Nokta</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400">
            Toplam: {locations.length + (customPickupLocation ? 1 : 0)} konum
          </div>
        </div>
      </div>

      {/* Harita kapatma butonu */}
      <button
        onClick={() => setShowSearchResults(false)}
        className="absolute top-4 right-4 z-[1001] w-8 h-8 bg-white/5 rounded-full shadow-lg flex items-center justify-center hover:bg-white/5"
        style={{ display: showSearchResults ? 'flex' : 'none' }}
      >
        ✕
      </button>
    </div>
  );
};

export default InteractiveMap;