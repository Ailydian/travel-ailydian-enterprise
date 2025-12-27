'use client';

import React, { useState, useEffect, useRef } from 'react';
import logger from '../../lib/logger';
import { motion } from 'framer-motion';
import { MapPin, Search, X, CheckCircle, AlertCircle, Navigation, Loader2 } from 'lucide-react';

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
  const [locationError, setLocationError] = useState<string>('');
  const searchTimeout = useRef<NodeJS.Timeout>();
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map when client-side
  useEffect(() => {
    if (!isClient || mapInitialized.current) return;

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

        // Wait for map element to be ready
        const mapElement = document.getElementById('location-map');
        if (!mapElement) {
          logger.error('Map element not found');
          return;
        }

        // Initialize map
        const initialCenter: [number, number] = position || [39.9334, 32.8597]; // Default to Ankara, Turkey
        const map = L.map('location-map', {
          center: initialCenter,
          zoom: position ? 13 : 6,
          zoomControl: true,
          scrollWheelZoom: true,
        } as Error, { component: 'LocationPicker' });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add marker if position exists
        if (position) {
          const marker = L.marker(position, {
            draggable: false,
            title: 'Seçili Konum'
          }).addTo(map);
          markerRef.current = marker;
        }

        // Handle map clicks
        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng;
          logger.debug('Map clicked:', { component: 'LocationPicker', metadata: { data: lat, lng } });

          setPosition([lat, lng]);

          // Update or create marker
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            const marker = L.marker([lat, lng], {
              draggable: false,
              title: 'Seçili Konum'
            }).addTo(map);
            markerRef.current = marker;
          }

          // Get address from coordinates
          await getAddressFromCoords(lat, lng);
        });

        mapRef.current = map;
        mapInitialized.current = true;
        setIsMapReady(true);

        logger.debug('Log', { component: 'LocationPicker', metadata: { data: 'Map initialized successfully' } });

        // Force map to refresh size
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      } catch (error) {
        logger.error('Error initializing map:', error as Error, { component: 'LocationPicker' });
        setLocationError('Harita yüklenirken hata oluştu');
      }
    };

    // Delay initialization slightly to ensure DOM is ready
    const timer = setTimeout(initMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
        mapInitialized.current = false;
      }
    };
  }, [isClient]);

  // Reverse geocoding - get address from coordinates
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      logger.debug('Fetching address for:', { component: 'LocationPicker', metadata: { data: lat, lng } });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'tr',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Address lookup failed');
      }

      const data = await response.json();
      logger.debug('Address data:', { component: 'LocationPicker', metadata: { data: data } });

      const locationData: LocationData = {
        lat,
        lng,
        address: data.display_name || '',
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || '',
        country: data.address?.country || '',
        postalCode: data.address?.postcode
      };

      setSelectedAddress(locationData.address);
      onLocationSelect(locationData);
      setLocationError('');
    } catch (error) {
      logger.error('Error getting address:', error as Error, { component: 'LocationPicker' });
      setLocationError('Adres bilgisi alınamadı');
    }
  };

  // Search for location using Nominatim (OpenStreetMap)
  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setLocationError('');

    try {
      logger.debug('Searching for:', { component: 'LocationPicker', metadata: { data: query } });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10&countrycodes=tr`,
        {
          headers: {
            'Accept-Language': 'tr',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      logger.debug('Search results:', { component: 'LocationPicker', metadata: { data: data } });

      setSearchResults(data);

      if (data.length === 0) {
        setLocationError('Sonuç bulunamadı');
      }
    } catch (error) {
      logger.error('Error searching location:', error as Error, { component: 'LocationPicker' });
      setLocationError('Arama sırasında hata oluştu');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setLocationError('');
      return;
    }

    searchTimeout.current = setTimeout(() => {
      searchLocation(searchQuery);
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
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Tarayıcınız konum servislerini desteklemiyor');
      setIsGettingLocation(false);
      return;
    }

    logger.debug('Log', { component: 'LocationPicker', metadata: { data: 'Requesting geolocation...' } });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        logger.debug('Geolocation success:', { component: 'LocationPicker', metadata: { data: position } });

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setPosition([lat, lng]);

        // Update map and marker
        if (mapRef.current) {
          const L = (await import('leaflet')).default;
          mapRef.current.setView([lat, lng], 15);

          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            const marker = L.marker([lat, lng], {
              draggable: false,
              title: 'Mevcut Konumunuz'
            }).addTo(mapRef.current);
            markerRef.current = marker;
          }
        }

        await getAddressFromCoords(lat, lng);
        setIsGettingLocation(false);
      },
      (error) => {
        logger.error('Geolocation error:', error as Error, { component: 'LocationPicker' });

        let errorMessage = 'Konum alınamadı';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Konum izni reddedildi. Lütfen tarayıcı ayarlarından konum iznini açın.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Konum bilgisi kullanılamıyor.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Konum alma zaman aşımına uğradı.';
            break;
        }

        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Select search result
  const selectSearchResult = async (result: any) => {
    logger.debug('Selected result:', { component: 'LocationPicker', metadata: { data: result } });

    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setPosition([lat, lng]);
    setSelectedAddress(result.display_name);
    setSearchQuery('');
    setSearchResults([]);
    setLocationError('');

    // Update map view and marker
    if (mapRef.current) {
      const L = (await import('leaflet')).default;
      mapRef.current.setView([lat, lng], 15);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        const marker = L.marker([lat, lng], {
          draggable: false,
          title: 'Seçili Konum'
        }).addTo(mapRef.current);
        markerRef.current = marker;
      }
    }

    const locationData: LocationData = {
      lat,
      lng,
      address: result.display_name,
      city: result.address?.city || result.address?.town || result.address?.village || result.address?.county || '',
      country: result.address?.country || '',
      postalCode: result.address?.postcode
    };

    onLocationSelect(locationData);
  };

  if (!isClient) {
    return (
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <div className="h-96 bg-white/10 rounded-lg animate-pulse flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-lydian-primary to-lydian-secondary p-4">
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
              placeholder="Adres, şehir veya nokta arayın... (örn: İstanbul, Ankara, İzmir)"
              className="w-full pl-10 pr-10 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-lydian-primary focus:border-transparent outline-none"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
            )}
            {searchQuery && !isSearching && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setLocationError('');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/5 border border-white/10 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => selectSearchResult(result)}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 border-b border-gray-100 last:border-0 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-lydian-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm">
                        {result.display_name}
                      </p>
                      {result.address && (
                        <p className="text-xs text-gray-400 mt-1">
                          {[
                            result.address.city || result.address.town || result.address.village,
                            result.address.state,
                            result.address.country
                          ].filter(Boolean).join(', ')}
                        </p>
                      )}
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
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGettingLocation ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
          <span className="font-medium">
            {isGettingLocation ? 'Konum alınıyor...' : 'Mevcut Konumumu Kullan'}
          </span>
        </button>

        {/* Error Message */}
        {locationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{locationError}</p>
            </div>
          </motion.div>
        )}

        {/* Map */}
        <div className="relative h-96 rounded-lg overflow-hidden border border-white/10 bg-white/10">
          <div id="location-map" className="w-full h-full"></div>
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-300">Harita yükleniyor...</p>
              </div>
            </div>
          )}
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
                <li>"Mevcut Konumumu Kullan" butonuyla konumunuzu otomatik alabilirsiniz</li>
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
