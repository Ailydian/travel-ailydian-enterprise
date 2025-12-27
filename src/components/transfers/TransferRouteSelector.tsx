/**
 * Transfer Route Selector - From/To Location Picker
 * Ultra premium component for selecting transfer routes with autocomplete
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft, MapPin, Calendar, Users, Car, Search } from 'lucide-react';
import LocationAutocompleteAdvanced from '@/components/search/LocationAutocompleteAdvanced';
import type { AdvancedLocationSuggestion } from '@/lib/location-service-advanced';

interface TransferRouteSelectorProps {
  from: string;
  to: string;
  dateTime: string;
  passengers: string;
  vehicleType: string;
  onFromChange: (value: string, location?: AdvancedLocationSuggestion) => void;
  onToChange: (value: string, location?: AdvancedLocationSuggestion) => void;
  onDateTimeChange: (value: string) => void;
  onPassengersChange: (value: string) => void;
  onVehicleTypeChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
}

const PASSENGER_OPTIONS = [
{ value: '1', label: '1 yolcu' },
{ value: '2', label: '2 yolcu' },
{ value: '3', label: '3 yolcu' },
{ value: '4-7', label: '4-7 yolcu' },
{ value: '8-14', label: '8-14 yolcu' },
{ value: '15+', label: '15+ yolcu' }];


const VEHICLE_TYPE_OPTIONS = [
{ value: 'economy-sedan', label: 'Ekonomik Sedan', icon: '🚗', passengers: '1-3' },
{ value: 'vip-sedan', label: 'VIP Sedan', icon: '🚙', passengers: '1-3' },
{ value: 'minivan', label: 'Minivan', icon: '🚐', passengers: '4-7' },
{ value: 'vip-minivan', label: 'VIP Minivan', icon: '🚙', passengers: '4-7' },
{ value: 'minibus-14', label: 'Minibüs (14)', icon: '🚌', passengers: '8-14' },
{ value: 'bus-30', label: 'Otobüs (30)', icon: '🚌', passengers: '15+' }];


export const TransferRouteSelector: React.FC<TransferRouteSelectorProps> = ({
  from,
  to,
  dateTime,
  passengers,
  vehicleType,
  onFromChange,
  onToChange,
  onDateTimeChange,
  onPassengersChange,
  onVehicleTypeChange,
  onSearch,
  className = ''
}) => {
  const [fromLocation, setFromLocation] = useState<AdvancedLocationSuggestion | null>(null);
  const [toLocation, setToLocation] = useState<AdvancedLocationSuggestion | null>(null);

  const handleSwapLocations = () => {
    const tempFrom = from;
    const tempFromLoc = fromLocation;

    onFromChange(to, toLocation || undefined);
    onToChange(tempFrom, tempFromLoc || undefined);

    setFromLocation(toLocation);
    setToLocation(tempFromLoc);
  };

  const handleFromChange = (value: string, location?: AdvancedLocationSuggestion) => {
    onFromChange(value, location);
    if (location) {
      setFromLocation(location);
    }
  };

  const handleToChange = (value: string, location?: AdvancedLocationSuggestion) => {
    onToChange(value, location);
    if (location) {
      setToLocation(location);
    }
  };

  // Get minimum date-time (now + 2 hours)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-lydian-glass-dark rounded-2xl shadow-2xl border border-lydian-border-light/10 p-6 md:p-8">

        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-lydian-text-inverse mb-2 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-lydian-primary to-lydian-primary-dark rounded-xl">
              <Car className="w-6 h-6 text-lydian-text-inverse" />
            </div>
            Transfer Rezervasyonu
          </h2>
          <p className="text-lydian-text-dim">Nereden nereye gitmek istersiniz? Konforlu yolculuğunuz için hemen rezervasyon yapın.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From Location */}
          <div className="md:col-span-5">
            <LocationAutocompleteAdvanced
              value={from}
              onChange={handleFromChange}
              placeholder="Nereden? (Havalimanı, Otel, Adres)"
              label="Nereden"
              type="all"
              showRecentSearches
              showPopular
              showNearby
              countryFilter="TR" />

          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="p-3 bg-gradient-to-r from-lydian-primary to-lydian-primary-dark hover:from-lydian-primary hover:to-lydian-primary-darker text-lydian-text-inverse rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              title="Konumları değiştir">

              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* To Location */}
          <div className="md:col-span-5">
            <LocationAutocompleteAdvanced
              value={to}
              onChange={handleToChange}
              placeholder="Nereye? (Havalimanı, Otel, Adres)"
              label="Nereye"
              type="all"
              showRecentSearches
              showPopular
              showNearby
              countryFilter="TR" />

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Date & Time */}
          <div>
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              Tarih & Saat
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lydian-text-muted pointer-events-none" />
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => onDateTimeChange(e.target.value)}
                min={getMinDateTime()}
                className="w-full pl-12 pr-4 py-4 text-base bg-lydian-glass-dark border-2 border-lydian-border-light/10 rounded-xl focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none text-lydian-text-inverse font-medium shadow-sm hover:shadow-md hover:border-lydian-border-focus transition-all duration-200" />

            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              Yolcu Sayısı
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lydian-text-muted pointer-events-none" />
              <select
                value={passengers}
                onChange={(e) => onPassengersChange(e.target.value)}
                className="w-full pl-12 pr-10 py-4 text-base bg-lydian-glass-dark border-2 border-lydian-border-light/10 rounded-xl focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none text-lydian-text-inverse font-medium shadow-sm hover:shadow-md hover:border-lydian-border-focus transition-all duration-200 appearance-none cursor-pointer">

                {PASSENGER_OPTIONS.map((option) =>
                <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-lydian-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              Araç Tipi
            </label>
            <div className="relative">
              <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lydian-text-muted pointer-events-none" />
              <select
                value={vehicleType}
                onChange={(e) => onVehicleTypeChange(e.target.value)}
                className="w-full pl-12 pr-10 py-4 text-base bg-lydian-glass-dark border-2 border-lydian-border-light/10 rounded-xl focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none text-lydian-text-inverse font-medium shadow-sm hover:shadow-md hover:border-lydian-border-focus transition-all duration-200 appearance-none cursor-pointer">

                {VEHICLE_TYPE_OPTIONS.map((option) =>
                <option key={option.value} value={option.value}>
                    {option.icon} {option.label} ({option.passengers})
                  </option>
                )}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-lydian-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Route Info if both locations selected */}
        {fromLocation && toLocation &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-lydian-primary" />
                <div>
                  <div className="text-sm font-medium text-lydian-text-muted">Rota</div>
                  <div className="text-lg font-bold text-lydian-text-inverse">
                    {fromLocation.name} <ArrowRight className="inline w-4 h-4 mx-2" /> {toLocation.name}
                  </div>
                </div>
              </div>

              {fromLocation.coordinates && toLocation.coordinates &&
            <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-lydian-text-dim">Mesafe:</span>
                    <span className="ml-2 font-semibold text-lydian-text-inverse">
                      {Math.round(
                    calculateDistance(
                      fromLocation.coordinates.lat,
                      fromLocation.coordinates.lng,
                      toLocation.coordinates.lat,
                      toLocation.coordinates.lng
                    )
                  )} km
                    </span>
                  </div>
                </div>
            }
            </div>
          </motion.div>
        }

        {/* Search Button */}
        <div className="mt-6">
          <button
            onClick={onSearch}
            disabled={!from || !to}
            className="w-full py-4 px-6 bg-gradient-to-r from-lydian-primary to-lydian-primary-darker hover:from-lydian-primary-dark hover:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 text-lydian-text-inverse font-bold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg">

            <Search className="w-6 h-6" />
            Transfer Ara
          </button>
        </div>

        {/* Popular Routes */}
        <div className="mt-6 pt-6 border-t border-lydian-border-light/10">
          <div className="text-sm font-semibold text-lydian-text-muted mb-3">Popüler Rotalar</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {POPULAR_ROUTES.map((route) =>
            <button
              key={route.id}
              onClick={() => {
                onFromChange(route.from);
                onToChange(route.to);
              }}
              className="p-3 bg-lydian-glass-dark hover:bg-lydian-primary-lighter rounded-lg border border-lydian-border-light/10 hover:border-lydian-border-focus transition-all text-left group">

                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-lydian-text-inverse group-hover:text-lydian-primary transition-colors">
                    {route.from}
                  </span>
                  <ArrowRight className="w-4 h-4 text-lydian-text-muted group-hover:text-lydian-primary" />
                </div>
                <div className="text-xs text-lydian-text-dim">{route.to}</div>
                <div className="mt-2 text-xs text-lydian-primary font-semibold">
                  ₺{route.price}+ • {route.duration}
                </div>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>);

};

// Popular routes data
const POPULAR_ROUTES = [
{ id: '1', from: 'İstanbul Havalimanı', to: 'Taksim', price: 250, duration: '40 dk' },
{ id: '2', from: 'Antalya Havalimanı', to: 'Lara', price: 180, duration: '25 dk' },
{ id: '3', from: 'Sabiha Gökçen', to: 'Kadıköy', price: 220, duration: '35 dk' },
{ id: '4', from: 'İzmir Adnan Menderes', to: 'Çeşme', price: 300, duration: '60 dk' },
{ id: '5', from: 'Antalya Havalimanı', to: 'Alanya', price: 1150, duration: '2 saat' },
{ id: '6', from: 'Bodrum Havalimanı', to: 'Bodrum Merkez', price: 200, duration: '45 dk' }];


// Haversine formula for distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(lat1 * Math.PI / 180) *
  Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon / 2) *
  Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default TransferRouteSelector;