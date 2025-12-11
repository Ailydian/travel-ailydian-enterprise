'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, X, CheckCircle, AlertCircle, Navigation } from 'lucide-react';

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: LocationData;
  required?: boolean;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation,
  required = true
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(
    initialLocation ? [initialLocation.lat, initialLocation.lng] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>(initialLocation?.address || '');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map when client-side
  useEffect(() => {
    if (!isClient || isMapReady) return;

    const initMap = async () => {
      try {
        // Import Leaflet only on client side
        const L = (await import('leaflet')).default;

        // Fix default icon issue
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        // Initialize map
        const mapElement = document.getElementById('location-map');
        if (!mapElement || mapRef.current) return;

        const map = L.map('location-map').setView(
          position || [39.9334, 32.8597], // Default to Ankara, Turkey
          position ? 13 : 6
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add marker if position exists
        if (position) {
          markerRef.current = L.marker(position).addTo(map);
        }

        // Handle map clicks
        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          setPosition([lat, lng]);

          // Update or create marker
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng]).addTo(map);
          }

          getAddressFromCoords(lat, lng);
        });

        mapRef.current = map;
        setIsMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isClient, position]);

  // Reverse geocoding - get address from coordinates
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();

      const locationData: LocationData = {
        lat,
        lng,
        address: data.display_name || '',
        city: data.address?.city || data.address?.town || data.address?.village || '',
        country: data.address?.country || '',
        postalCode: data.address?.postcode
      };

      setSelectedAddress(locationData.address);
      onLocationSelect(locationData);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  // Search for location using Nominatim (OpenStreetMap)
  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if (searchQuery) {
        searchLocation(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setPosition([lat, lng]);

          if (mapRef.current && markerRef.current) {
            const L = require('leaflet');
            mapRef.current.setView([lat, lng], 13);
            markerRef.current.setLatLng([lat, lng]);
          }

          getAddressFromCoords(lat, lng);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Konum alınamadı. Lütfen tarayıcı izinlerini kontrol edin.');
          setIsGettingLocation(false);
        }
      );
    } else {
      alert('Tarayıcınız konum servislerini desteklemiyor.');
      setIsGettingLocation(false);
    }
  };

  // Select search result
  const selectSearchResult = async (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setPosition([lat, lng]);
    setSelectedAddress(result.display_name);
    setSearchQuery('');
    setSearchResults([]);

    // Update map view and marker
    if (mapRef.current) {
      const L = (await import('leaflet')).default;
      mapRef.current.setView([lat, lng], 13);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }
    }

    const locationData: LocationData = {
      lat,
      lng,
      address: result.display_name,
      city: result.address?.city || result.address?.town || '',
      country: result.address?.country || '',
      postalCode: result.address?.postcode
    };

    onLocationSelect(locationData);
  };

  if (!isClient) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-ailydian-primary to-ailydian-secondary p-4">
        <div className="flex items-center gap-3 text-white">
          <MapPin className="w-6 h-6" />
          <div>
            <h3 className="font-bold text-lg">Teslim Alma Noktası {required && '*'}</h3>
            <p className="text-sm text-white/90">Hizmet alacağınız konumu seçin</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Adres, şehir veya nokta arayın..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => selectSearchResult(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-ailydian-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {result.display_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {result.address?.city || result.address?.town || ''}, {result.address?.country || ''}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Location Button */}
        <button
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${isGettingLocation ? 'animate-spin' : ''}`} />
          <span className="font-medium">
            {isGettingLocation ? 'Konum alınıyor...' : 'Mevcut Konumumu Kullan'}
          </span>
        </button>

        {/* Map */}
        <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
          <div id="location-map" className="w-full h-full"></div>
        </div>

        {/* Selected Address Display */}
        {selectedAddress && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-green-900 text-sm mb-1">Seçili Konum:</p>
                <p className="text-sm text-green-700">{selectedAddress}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Nasıl kullanılır?</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Haritada istediğiniz noktaya tıklayın</li>
                <li>Veya yukarıdaki arama kutusunu kullanın</li>
                <li>Seçilen konum acente ile paylaşılacaktır</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
