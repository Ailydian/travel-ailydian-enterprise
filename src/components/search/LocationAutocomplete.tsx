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
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
          {icon || <MapPin className="text-gray-400 w-5 h-5 group-hover:scale-110 group-focus-within:scale-110 group-focus-within:text-lydian-primary transition-all" />}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-lydian-primary focus:border-lydian-primary outline-none text-gray-900 placeholder-gray-500 font-medium shadow-sm hover:shadow-lg hover:border-lydian-primary/50 transition-all duration-200"
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lydian-primary w-5 h-5 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full px-5 py-4 flex items-start gap-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 text-left border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-gradient-to-r from-lydian-primary/10 to-lydian-secondary/10' : ''
              }`}
            >
              <span className="text-2xl mt-0.5 transform hover:scale-125 transition-transform">{getLocationIcon(suggestion.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{suggestion.name}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    {suggestion.city}
                    {suggestion.region && `, ${suggestion.region}`}
                    {' • '}
                    {suggestion.country}
                  </span>
                  {suggestion.code && (
                    <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-xs font-mono font-semibold shadow-sm flex-shrink-0">
                      {suggestion.code}
                    </span>
                  )}
                </div>
              </div>
              {suggestion.type === 'airport' && (
                <Navigation className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && !isLoading && value.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <div className="font-semibold text-gray-900 mb-1">Sonuç bulunamadı</div>
          <div className="text-sm text-gray-500">Farklı bir arama terimi deneyin</div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
