/**
 * BookingWidget - Universal Sticky Booking Sidebar
 * Supports: Tours, Transfers, Hotels, Car Rentals, Rentals
 * Features: Date picker, guest selector, price calculator, CTA
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Shield,
  Zap,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Clock,
  MapPin
} from 'lucide-react';

export interface BookingWidgetProps {
  // Pricing
  basePrice: number;
  currency?: string;
  priceLabel?: string; // "per day", "per person", etc.
  savings?: number;
  savingsPercentage?: number;

  // Product type
  productType: 'tour' | 'transfer' | 'hotel' | 'car-rental' | 'rental';

  // Booking details (optional - depends on product type)
  requiresDate?: boolean;
  requiresGuests?: boolean;
  requiresRooms?: boolean;
  requiresTime?: boolean;
  requiresVehicle?: boolean;

  // Vehicle options (for transfers/car rentals)
  vehicleOptions?: {
    id: string;
    name: string;
    price: number;
    icon?: React.ReactNode;
  }[];

  // Addons/extras
  addons?: {
    id: string;
    name: string;
    price: number;
    perDay?: boolean;
  }[];

  // Trust badges
  badges?: {
    icon: React.ReactNode;
    text: string;
  }[];

  // Cancellation policy
  cancellationPolicy?: string;

  // Contact info
  phone?: string;
  email?: string;

  // Callbacks
  onBook: (bookingData: BookingData) => void;
}

export interface BookingData {
  date?: string;
  returnDate?: string;
  guests?: number;
  rooms?: number;
  time?: string;
  vehicleId?: string;
  addonIds?: string[];
  totalPrice: number;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  basePrice,
  currency = 'TRY',
  priceLabel = 'per person',
  savings,
  savingsPercentage,
  productType,
  requiresDate = true,
  requiresGuests = true,
  requiresRooms = false,
  requiresTime = false,
  requiresVehicle = false,
  vehicleOptions = [],
  addons = [],
  badges = [],
  cancellationPolicy,
  phone,
  email,
  onBook
}) => {
  // State
  const [selectedDate, setSelectedDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [time, setTime] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>(vehicleOptions[0]?.id || '');
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  // Calculate days
  const calculateDays = () => {
    if (!selectedDate || !returnDate) return 0;
    const start = new Date(selectedDate);
    const end = new Date(returnDate);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotal = (): number => {
    let total = basePrice;

    // For multi-day bookings
    const days = calculateDays();
    if (days > 0 && (productType === 'hotel' || productType === 'car-rental' || productType === 'rental')) {
      total = basePrice * days;
    }

    // For guest-based pricing
    if (requiresGuests && (productType === 'tour' || productType === 'transfer')) {
      total = basePrice * guests;
    }

    // Vehicle pricing override
    if (selectedVehicle && vehicleOptions.length > 0) {
      const vehicle = vehicleOptions.find(v => v.id === selectedVehicle);
      if (vehicle) {
        total = vehicle.price;
        if (days > 0) total *= days;
      }
    }

    // Add addons
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        const addonPrice = addon.perDay && days > 0 ? addon.price * days : addon.price;
        total += addonPrice;
      }
    });

    return total;
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(addonId)) {
        newSet.delete(addonId);
      } else {
        newSet.add(addonId);
      }
      return newSet;
    });
  };

  const handleBook = () => {
    const bookingData: BookingData = {
      totalPrice: calculateTotal()
    };

    if (requiresDate) bookingData.date = selectedDate;
    if (returnDate) bookingData.returnDate = returnDate;
    if (requiresGuests) bookingData.guests = guests;
    if (requiresRooms) bookingData.rooms = rooms;
    if (requiresTime) bookingData.time = time;
    if (selectedVehicle) bookingData.vehicleId = selectedVehicle;
    if (selectedAddons.size > 0) bookingData.addonIds = Array.from(selectedAddons);

    onBook(bookingData);
  };

  const isBookingValid = () => {
    if (requiresDate && !selectedDate) return false;
    if (productType === 'hotel' && !returnDate) return false;
    return true;
  };

  const days = calculateDays();
  const total = calculateTotal();

  return (
    <div className="sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-lydian-glass-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20/20"
      >
        {/* Savings Badge */}
        {savingsPercentage && savingsPercentage > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl mb-6 flex items-center justify-center gap-2 shadow-lg">
            <TrendingDown className="w-5 h-5" />
            <span className="font-bold text-sm">%{savingsPercentage} Daha Ucuz</span>
          </div>
        )}

        {/* Price Display */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-white">
              {currency === 'TRY' ? '₺' : currency}{basePrice.toLocaleString()}
            </span>
            {savings && savings > 0 && (
              <span className="text-lg text-gray-300 line-through">
                {currency === 'TRY' ? '₺' : currency}{(basePrice + savings).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">{priceLabel}</span>
            {savingsPercentage && savingsPercentage > 0 && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-bold">
                %{savingsPercentage} İndirim
              </span>
            )}
          </div>
        </div>

        {/* Vehicle Selection (for transfers/car rentals) */}
        {requiresVehicle && vehicleOptions.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">
              Araç Seçimi
            </label>
            <div className="space-y-2">
              {vehicleOptions.map(vehicle => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                    selectedVehicle === vehicle.id
                      ? 'border-blue-600 bg-blue-50/10 shadow-lg'
                      : 'border-white/20/20 hover:border-blue-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold text-sm ${
                      selectedVehicle === vehicle.id ? 'text-blue-400' : 'text-gray-300'
                    }`}>
                      {vehicle.name}
                    </span>
                    {selectedVehicle === vehicle.id && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="text-xl font-bold text-white">
                    ₺{vehicle.price.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date Selection */}
        {requiresDate && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">
              {productType === 'hotel' || productType === 'car-rental' || productType === 'rental' ? 'Başlangıç Tarihi' : 'Tarih Seçin'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
              />
            </div>
          </div>
        )}

        {/* Return Date (for hotels/rentals) */}
        {(productType === 'hotel' || productType === 'car-rental' || productType === 'rental') && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">
              Bitiş Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={selectedDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
              />
            </div>
          </div>
        )}

        {/* Guest Selection */}
        {requiresGuests && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Misafir Sayısı
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests <= 1}
                className="p-2 border border-white/20/20 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-white">{guests}</span>
                <span className="text-sm text-gray-300 ml-1">kişi</span>
              </div>
              <button
                onClick={() => setGuests(guests + 1)}
                className="p-2 border border-white/20/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Addons/Extras */}
        {addons.length > 0 && (
          <div className="border-t border-white/20/10 pt-4 mb-6">
            <h3 className="font-semibold text-white mb-3">Ekstra Hizmetler</h3>
            <div className="space-y-2">
              {addons.map(addon => (
                <label key={addon.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddons.has(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300 flex-1">
                    {addon.name} (+₺{addon.price}{addon.perDay ? '/gün' : ''})
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Total Price Breakdown */}
        {days > 0 && (
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">{days} gün</span>
              <span className="text-sm text-white">
                ₺{(basePrice * (requiresGuests ? guests : 1) * days).toLocaleString()}
              </span>
            </div>
            {selectedAddons.size > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Ekstralar</span>
                <span className="text-sm text-white">
                  ₺{(total - basePrice * (requiresGuests ? guests : 1) * days).toLocaleString()}
                </span>
              </div>
            )}
            <div className="border-t border-white/20/20 pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Toplam</span>
                <span className="text-2xl font-bold text-blue-400">₺{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={handleBook}
          disabled={!isBookingValid()}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
        >
          Rezervasyon Yap
        </button>

        {cancellationPolicy && (
          <p className="text-xs text-center text-gray-300 mt-3">
            {cancellationPolicy}
          </p>
        )}

        {/* Trust Badges */}
        {badges.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/20/10 space-y-3">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                {badge.icon}
                {badge.text}
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        {(phone || email) && (
          <div className="mt-6 pt-6 border-t border-white/20/10">
            <p className="text-sm text-gray-300 mb-3 font-medium">
              Sorularınız mı var?
            </p>
            <div className="space-y-2">
              {phone && (
                <button className="w-full px-4 py-2 border border-white/20/10 rounded-lg font-semibold text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Bizi Arayın
                </button>
              )}
              <button className="w-full px-4 py-2 border border-white/20/10 rounded-lg font-semibold text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Canlı Destek
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Trust Badges Below Widget */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-lydian-glass-dark/80 backdrop-blur-xl rounded-lg p-3 text-center shadow-sm border border-white/20/10">
          <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <p className="text-xs font-semibold text-gray-300">Güvenli Ödeme</p>
        </div>
        <div className="bg-lydian-glass-dark/80 backdrop-blur-xl rounded-lg p-3 text-center shadow-sm border border-white/20/10">
          <Zap className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <p className="text-xs font-semibold text-gray-300">Anında Onay</p>
        </div>
        <div className="bg-lydian-glass-dark/80 backdrop-blur-xl rounded-lg p-3 text-center shadow-sm border border-white/20/10">
          <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-xs font-semibold text-gray-300">En İyi Fiyat</p>
        </div>
      </div>
    </div>
  );
};
