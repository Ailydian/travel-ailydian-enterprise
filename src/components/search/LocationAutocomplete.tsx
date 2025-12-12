import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2, Navigation } from 'lucide-react';

interface LocationSuggestion {
  id: string;
  name: string;
  city: string;
  region?: string;
  country: string;
  type: 'city' | 'airport' | 'hotel' | 'region';
  code?: string; // Airport code like IST, AYT
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string, suggestion?: LocationSuggestion) => void;
  placeholder?: string;
  type?: 'city' | 'airport' | 'hotel' | 'all';
  icon?: React.ReactNode;
  className?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'Nereye gitmek istersiniz?',
  type = 'all',
  icon,
  className = ''
}) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Turkish cities and airports database
  const turkishLocations: LocationSuggestion[] = [
    { id: 'ist-city', name: 'İstanbul', city: 'İstanbul', country: 'Türkiye', type: 'city' },
    { id: 'ist-airport', name: 'İstanbul Havalimanı', city: 'İstanbul', country: 'Türkiye', type: 'airport', code: 'IST' },
    { id: 'saw-airport', name: 'Sabiha Gökçen Havalimanı', city: 'İstanbul', country: 'Türkiye', type: 'airport', code: 'SAW' },
    { id: 'ayt-city', name: 'Antalya', city: 'Antalya', country: 'Türkiye', type: 'city' },
    { id: 'ayt-airport', name: 'Antalya Havalimanı', city: 'Antalya', country: 'Türkiye', type: 'airport', code: 'AYT' },
    { id: 'izm-city', name: 'İzmir', city: 'İzmir', country: 'Türkiye', type: 'city' },
    { id: 'adb-airport', name: 'Adnan Menderes Havalimanı', city: 'İzmir', country: 'Türkiye', type: 'airport', code: 'ADB' },
    { id: 'ank-city', name: 'Ankara', city: 'Ankara', country: 'Türkiye', type: 'city' },
    { id: 'esb-airport', name: 'Esenboğa Havalimanı', city: 'Ankara', country: 'Türkiye', type: 'airport', code: 'ESB' },
    { id: 'bod-city', name: 'Bodrum', city: 'Bodrum', country: 'Türkiye', type: 'city' },
    { id: 'bjv-airport', name: 'Bodrum Havalimanı', city: 'Bodrum', country: 'Türkiye', type: 'airport', code: 'BJV' },
    { id: 'dlm-airport', name: 'Dalaman Havalimanı', city: 'Dalaman', country: 'Türkiye', type: 'airport', code: 'DLM' },
    { id: 'ala-city', name: 'Alanya', city: 'Alanya', region: 'Antalya', country: 'Türkiye', type: 'city' },
    { id: 'gzp-airport', name: 'Gazipaşa-Alanya Havalimanı', city: 'Alanya', country: 'Türkiye', type: 'airport', code: 'GZP' },
    { id: 'belek', name: 'Belek', city: 'Belek', region: 'Antalya', country: 'Türkiye', type: 'region' },
    { id: 'lara', name: 'Lara', city: 'Lara', region: 'Antalya', country: 'Türkiye', type: 'region' },
    { id: 'side', name: 'Side', city: 'Side', region: 'Antalya', country: 'Türkiye', type: 'region' },
    { id: 'kemer', name: 'Kemer', city: 'Kemer', region: 'Antalya', country: 'Türkiye', type: 'region' },
    { id: 'kas', name: 'Kaş', city: 'Kaş', region: 'Antalya', country: 'Türkiye', type: 'city' },
    { id: 'fethiye', name: 'Fethiye', city: 'Fethiye', region: 'Muğla', country: 'Türkiye', type: 'city' },
    { id: 'marmaris', name: 'Marmaris', city: 'Marmaris', region: 'Muğla', country: 'Türkiye', type: 'city' },
    { id: 'cesme', name: 'Çeşme', city: 'Çeşme', region: 'İzmir', country: 'Türkiye', type: 'city' },
    { id: 'canakkale', name: 'Çanakkale', city: 'Çanakkale', country: 'Türkiye', type: 'city' },
    { id: 'trabzon', name: 'Trabzon', city: 'Trabzon', country: 'Türkiye', type: 'city' },
    { id: 'tzx-airport', name: 'Trabzon Havalimanı', city: 'Trabzon', country: 'Türkiye', type: 'airport', code: 'TZX' },
  ];

  // Search suggestions
  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    // Filter local suggestions
    const filtered = turkishLocations.filter(location => {
      const searchTerm = value.toLowerCase().trim();
      const matchesType = type === 'all' || location.type === type;
      const matchesName = location.name.toLowerCase().includes(searchTerm) ||
                         location.city.toLowerCase().includes(searchTerm) ||
                         location.code?.toLowerCase().includes(searchTerm) ||
                         location.region?.toLowerCase().includes(searchTerm);

      return matchesType && matchesName;
    });

    setSuggestions(filtered.slice(0, 8));
    setShowSuggestions(true);
    setIsLoading(false);
  }, [value, type]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    onChange(suggestion.name, suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'airport':
        return '✈️';
      case 'hotel':
        return '🏨';
      case 'region':
        return '🏖️';
      case 'city':
      default:
        return '📍';
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        {icon || <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ailydian-primary/30 border border-gray-200"
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                index === selectedIndex ? 'bg-ailydian-primary/10' : ''
              }`}
            >
              <span className="text-2xl mt-0.5">{getLocationIcon(suggestion.type)}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                <div className="text-sm text-gray-500">
                  {suggestion.city}
                  {suggestion.region && `, ${suggestion.region}`}
                  {' • '}
                  {suggestion.country}
                  {suggestion.code && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-mono">
                      {suggestion.code}
                    </span>
                  )}
                </div>
              </div>
              {suggestion.type === 'airport' && (
                <Navigation className="w-4 h-4 text-blue-500 mt-1" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && !isLoading && value.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 text-center text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <div className="font-medium">Sonuç bulunamadı</div>
          <div className="text-sm mt-1">Farklı bir arama terimi deneyin</div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
