/**
 * Advanced Car Rental Search Engine Component
 * Similar to TransferRouteSelector but for car rentals
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Users, Car, Search, ChevronDown,
  Clock, Shield, Zap } from 'lucide-react';

interface CarRentalSearchEngineProps {
  onSearch: (searchData: CarRentalSearchData) => void;
}

export interface CarRentalSearchData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  category: string;
  features?: string[];
}

const VEHICLE_CATEGORIES = [
{ value: 'all', label: 'Tüm Araçlar' },
{ value: 'economy-sedan', label: 'Ekonomik Sedan' },
{ value: 'premium-sedan', label: 'Premium Sedan' },
{ value: 'economy-suv', label: 'Ekonomik SUV' },
{ value: 'premium-suv', label: 'Premium SUV' },
{ value: 'luxury', label: 'Lüks Araç' },
{ value: 'sports', label: 'Spor Araç' },
{ value: 'van', label: 'Minivan' }];


const POPULAR_LOCATIONS = [
'İstanbul Havalimanı',
'Sabiha Gökçen Havalimanı',
'Antalya Havalimanı',
'Ankara Esenboğa',
'İzmir Adnan Menderes',
'Bodrum Havalimanı',
'Dalaman Havalimanı'];


const CarRentalSearchEngine: React.FC<CarRentalSearchEngineProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState<CarRentalSearchData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    dropoffDate: '',
    dropoffTime: '10:00',
    category: 'all',
    features: []
  });

  const [sameLocation, setSameLocation] = useState(true);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const handleSearch = () => {
    if (sameLocation) {
      searchData.dropoffLocation = searchData.pickupLocation;
    }
    onSearch(searchData);
  };

  const handlePickupLocationChange = (value: string) => {
    setSearchData({ ...searchData, pickupLocation: value });
    if (sameLocation) {
      setSearchData((prev) => ({ ...prev, dropoffLocation: value }));
    }
  };

  return (
    <div className="bg-lydian-glass-dark rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Pickup Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Alış Yeri
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchData.pickupLocation}
              onChange={(e) => handlePickupLocationChange(e.target.value)}
              onFocus={() => setShowPickupSuggestions(true)}
              onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
              placeholder="Havalimanı veya şehir seçin"
              className="w-full px-4 py-3 pl-12 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" />

            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />

            {showPickupSuggestions &&
            <div className="absolute z-50 w-full mt-2 bg-lydian-glass-dark border border-lydian-border-light/10 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {POPULAR_LOCATIONS.map((location) =>
              <button
                key={location}
                onClick={() => {
                  handlePickupLocationChange(location);
                  setShowPickupSuggestions(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-lydian-success-lighter transition-colors flex items-center gap-2">

                    <MapPin className="w-4 h-4 text-lydian-success" />
                    <span className="text-lydian-text-inverse">{location}</span>
                  </button>
              )}
              </div>
            }
          </div>
        </div>

        {/* Dropoff Location (only if different location) */}
        {!sameLocation &&
        <div className="relative">
            <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Teslim Yeri
            </label>
            <div className="relative">
              <input
              type="text"
              value={searchData.dropoffLocation}
              onChange={(e) => setSearchData({ ...searchData, dropoffLocation: e.target.value })}
              onFocus={() => setShowDropoffSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 200)}
              placeholder="Teslim yeri seçin"
              className="w-full px-4 py-3 pl-12 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" />

              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lydian-text-muted" />

              {showDropoffSuggestions &&
            <div className="absolute z-50 w-full mt-2 bg-lydian-glass-dark border border-lydian-border-light/10 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {POPULAR_LOCATIONS.map((location) =>
              <button
                key={location}
                onClick={() => {
                  setSearchData({ ...searchData, dropoffLocation: location });
                  setShowDropoffSuggestions(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-lydian-success-lighter transition-colors flex items-center gap-2">

                      <MapPin className="w-4 h-4 text-lydian-success" />
                      <span className="text-lydian-text-inverse">{location}</span>
                    </button>
              )}
                </div>
            }
            </div>
          </div>
        }

        {sameLocation &&
        <div className="flex items-end">
            <button
            onClick={() => setSameLocation(false)}
            className="w-full px-4 py-3 border-2 border-dashed border-lydian-border-light rounded-xl hover:border-green-500 hover:bg-lydian-success-lighter transition-all text-lydian-text-dim hover:text-lydian-success-text font-medium">

              + Farklı Teslim Yeri
            </button>
          </div>
        }
      </div>

      {/* Same Location Toggle */}
      {!sameLocation &&
      <div className="mb-4">
          <button
          onClick={() => setSameLocation(true)}
          className="text-sm text-lydian-success hover:text-lydian-success-text font-medium flex items-center gap-2">

            <Shield className="w-4 h-4" />
            Aynı Yerde Teslim Al
          </button>
        </div>
      }

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Alış Tarihi
          </label>
          <input
            type="date"
            value={searchData.pickupDate}
            onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
            className="w-full px-4 py-3 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" />

        </div>

        <div>
          <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Alış Saati
          </label>
          <select
            value={searchData.pickupTime}
            onChange={(e) => setSearchData({ ...searchData, pickupTime: e.target.value })}
            className="w-full px-4 py-3 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all appearance-none">

            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, '0');
              return (
                <React.Fragment key={hour}>
                  <option value={`${hour}:00`}>{hour}:00</option>
                  <option value={`${hour}:30`}>{hour}:30</option>
                </React.Fragment>);

            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Teslim Tarihi
          </label>
          <input
            type="date"
            value={searchData.dropoffDate}
            onChange={(e) => setSearchData({ ...searchData, dropoffDate: e.target.value })}
            className="w-full px-4 py-3 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all" />

        </div>

        <div>
          <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Teslim Saati
          </label>
          <select
            value={searchData.dropoffTime}
            onChange={(e) => setSearchData({ ...searchData, dropoffTime: e.target.value })}
            className="w-full px-4 py-3 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all appearance-none">

            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, '0');
              return (
                <React.Fragment key={hour}>
                  <option value={`${hour}:00`}>{hour}:00</option>
                  <option value={`${hour}:30`}>{hour}:30</option>
                </React.Fragment>);

            })}
          </select>
        </div>
      </div>

      {/* Vehicle Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-lydian-text-muted mb-2">
          <Car className="w-4 h-4 inline mr-1" />
          Araç Kategorisi
        </label>
        <select
          value={searchData.category}
          onChange={(e) => setSearchData({ ...searchData, category: e.target.value })}
          className="w-full px-4 py-3 border-2 border-lydian-border-light/10 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all appearance-none">

          {VEHICLE_CATEGORIES.map((cat) =>
          <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          )}
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full px-8 py-4 bg-gradient-to-r from-lydian-success to-lydian-success text-lydian-text-inverse rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3">

        <Search className="w-6 h-6" />
        Araç Ara
        <Zap className="w-5 h-5" />
      </button>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-lydian-border-light/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-lydian-success">1,200+</div>
          <div className="text-xs text-lydian-text-dim">Aktif Araç</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-lydian-success">4.9/5</div>
          <div className="text-xs text-lydian-text-dim">Memnuniyet</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-lydian-success">₺350</div>
          <div className="text-xs text-lydian-text-dim">En Düşük Fiyat</div>
        </div>
      </div>
    </div>);

};

export default CarRentalSearchEngine;