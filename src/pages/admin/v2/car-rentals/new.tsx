/**
 * Admin v2 - New Car Rental Form
 * Production-ready car rental creation page
 *
 * @module pages/admin/v2/car-rentals/new
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Car,
  Save,
  X,
  Upload,
  DollarSign,
  Calendar,
  Users,
  Gauge,
  Fuel,
  Settings as SettingsIcon,
  Shield,
  MapPin,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface FormData {
  // Basic Info
  brand: string;
  model: string;
  year: number;
  category: string;

  // Pricing
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  deposit: number;

  // Specifications
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  doors: number;
  luggage: number;

  // Features
  features: string[];

  // Availability
  location: string;
  status: 'available' | 'rented' | 'maintenance';

  // Images
  images: string[];

  // Insurance
  insuranceIncluded: boolean;
  insurancePrice: number;

  // Additional
  description: string;
  termsAndConditions: string;
}

const initialFormData: FormData = {
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  category: 'economy',
  pricePerDay: 0,
  pricePerWeek: 0,
  pricePerMonth: 0,
  deposit: 0,
  transmission: 'automatic',
  fuelType: 'petrol',
  seats: 5,
  doors: 4,
  luggage: 2,
  features: [],
  location: 'Antalya Airport',
  status: 'available',
  images: [],
  insuranceIncluded: true,
  insurancePrice: 0,
  description: '',
  termsAndConditions: ''
};

const carCategories = [
  { value: 'economy', label: 'Economy', icon: '🚗' },
  { value: 'compact', label: 'Compact', icon: '🚙' },
  { value: 'midsize', label: 'Midsize', icon: '🚗' },
  { value: 'fullsize', label: 'Full Size', icon: '🚙' },
  { value: 'suv', label: 'SUV', icon: '🚙' },
  { value: 'luxury', label: 'Luxury', icon: '🏎️' },
  { value: 'van', label: 'Van/Minivan', icon: '🚐' }
];

const availableFeatures = [
  'Air Conditioning',
  'GPS Navigation',
  'Bluetooth',
  'USB Charging',
  'Parking Sensors',
  'Backup Camera',
  'Cruise Control',
  'Heated Seats',
  'Sunroof',
  'Leather Seats',
  'Apple CarPlay',
  'Android Auto',
  'Keyless Entry',
  'Automatic Lights',
  'Rain Sensors'
];

const locations = [
  'Antalya Airport',
  'Antalya City Center',
  'Istanbul Airport',
  'Istanbul City Center',
  'Bodrum Airport',
  'Izmir Airport',
  'Cappadocia'
];

export default function NewCarRentalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Invalid year';
    }
    if (formData.pricePerDay <= 0) newErrors.pricePerDay = 'Price must be greater than 0';
    if (formData.deposit < 0) newErrors.deposit = 'Deposit cannot be negative';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, this would be:
      // const response = await fetch('/api/admin/car-rentals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      setShowSuccess(true);
      setTimeout(() => {
        router.push('/admin/v2/car-rentals');
      }, 2000);
    } catch (error) {
      console.error('Error creating car rental:', error);
      setErrors({ submit: 'Failed to create car rental. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>New Car Rental | Admin v2</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/v2/car-rentals"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Car Rentals</span>
                </Link>
              </div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Car className="w-6 h-6 text-cyan-400" />
                New Car Rental
              </h1>
            </div>
          </div>
        </header>

        {/* Success Toast */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-medium">Car rental created successfully!</span>
          </motion.div>
        )}

        {/* Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Main Content - Left 2 Columns */}
              <div className="lg:col-span-2 space-y-6">

                {/* Basic Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Car className="w-5 h-5 text-cyan-400" />
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Brand *
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        className={`w-full bg-white/5 border ${errors.brand ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
                        placeholder="e.g., Toyota"
                      />
                      {errors.brand && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.brand}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Model *
                      </label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        className={`w-full bg-white/5 border ${errors.model ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
                        placeholder="e.g., Corolla"
                      />
                      {errors.model && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.model}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                        className={`w-full bg-white/5 border ${errors.year ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
                        min="2000"
                        max={new Date().getFullYear() + 1}
                      />
                      {errors.year && (
                        <p className="mt-1 text-sm text-red-400">{errors.year}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        {carCategories.map(cat => (
                          <option key={cat.value} value={cat.value} className="bg-slate-800">
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Pricing
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price per Day (₺) *
                      </label>
                      <input
                        type="number"
                        value={formData.pricePerDay}
                        onChange={(e) => handleInputChange('pricePerDay', parseFloat(e.target.value))}
                        className={`w-full bg-white/5 border ${errors.pricePerDay ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
                        min="0"
                        step="0.01"
                      />
                      {errors.pricePerDay && (
                        <p className="mt-1 text-sm text-red-400">{errors.pricePerDay}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price per Week (₺)
                      </label>
                      <input
                        type="number"
                        value={formData.pricePerWeek}
                        onChange={(e) => handleInputChange('pricePerWeek', parseFloat(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price per Month (₺)
                      </label>
                      <input
                        type="number"
                        value={formData.pricePerMonth}
                        onChange={(e) => handleInputChange('pricePerMonth', parseFloat(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Deposit (₺)
                      </label>
                      <input
                        type="number"
                        value={formData.deposit}
                        onChange={(e) => handleInputChange('deposit', parseFloat(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Specifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-purple-400" />
                    Specifications
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        Transmission
                      </label>
                      <select
                        value={formData.transmission}
                        onChange={(e) => handleInputChange('transmission', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="automatic" className="bg-slate-800">Automatic</option>
                        <option value="manual" className="bg-slate-800">Manual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Fuel className="w-4 h-4" />
                        Fuel Type
                      </label>
                      <select
                        value={formData.fuelType}
                        onChange={(e) => handleInputChange('fuelType', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="petrol" className="bg-slate-800">Petrol</option>
                        <option value="diesel" className="bg-slate-800">Diesel</option>
                        <option value="electric" className="bg-slate-800">Electric</option>
                        <option value="hybrid" className="bg-slate-800">Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Seats
                      </label>
                      <input
                        type="number"
                        value={formData.seats}
                        onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        min="2"
                        max="12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Doors
                      </label>
                      <input
                        type="number"
                        value={formData.doors}
                        onChange={(e) => handleInputChange('doors', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        min="2"
                        max="5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Luggage Capacity
                      </label>
                      <input
                        type="number"
                        value={formData.luggage}
                        onChange={(e) => handleInputChange('luggage', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        min="0"
                        max="10"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Features</h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableFeatures.map(feature => (
                      <label
                        key={feature}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 rounded text-cyan-500 focus:ring-2 focus:ring-cyan-500 bg-white/10 border-white/20"
                        />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Description *</h2>

                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className={`w-full bg-white/5 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none`}
                    placeholder="Describe the car rental, its condition, special features, and any additional information..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </motion.div>
              </div>

              {/* Sidebar - Right Column */}
              <div className="lg:col-span-1 space-y-6">

                {/* Status & Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    Availability
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        {locations.map(loc => (
                          <option key={loc} value={loc} className="bg-slate-800">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="available" className="bg-slate-800">Available</option>
                        <option value="rented" className="bg-slate-800">Rented</option>
                        <option value="maintenance" className="bg-slate-800">Maintenance</option>
                      </select>
                    </div>
                  </div>
                </motion.div>

                {/* Insurance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Insurance
                  </h2>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.insuranceIncluded}
                        onChange={(e) => handleInputChange('insuranceIncluded', e.target.checked)}
                        className="w-5 h-5 rounded text-cyan-500 focus:ring-2 focus:ring-cyan-500 bg-white/10 border-white/20"
                      />
                      <span className="text-sm text-gray-300">Insurance Included</span>
                    </label>

                    {formData.insuranceIncluded && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Insurance Price (₺/day)
                        </label>
                        <input
                          type="number"
                          value={formData.insurancePrice}
                          onChange={(e) => handleInputChange('insurancePrice', parseFloat(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Create Car Rental
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/admin/v2/car-rentals')}
                    className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>

                  {errors.submit && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.submit}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
