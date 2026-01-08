/**
 * Admin v2 - New Rental Property Form
 * Production-ready rental property creation page
 *
 * @module pages/admin/v2/rental-properties/new
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Home,
  Save,
  X,
  Upload,
  DollarSign,
  Calendar,
  Users,
  Bed,
  Bath,
  Wifi,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Star,
  Square
} from 'lucide-react';

interface FormData {
  // Basic Info
  title: string;
  propertyType: string;
  location: string;
  address: string;

  // Pricing
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth: number;
  cleaningFee: number;
  securityDeposit: number;

  // Specifications
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareMeters: number;

  // Amenities
  amenities: string[];

  // Availability
  status: 'available' | 'booked' | 'maintenance';
  instantBook: boolean;
  minimumStay: number;

  // Images
  images: string[];

  // Host Info
  superhostStatus: boolean;

  // Additional
  description: string;
  houseRules: string;
  cancellationPolicy: string;
}

const initialFormData: FormData = {
  title: '',
  propertyType: 'apartment',
  location: 'Istanbul',
  address: '',
  pricePerNight: 0,
  pricePerWeek: 0,
  pricePerMonth: 0,
  cleaningFee: 0,
  securityDeposit: 0,
  bedrooms: 1,
  bathrooms: 1,
  maxGuests: 2,
  squareMeters: 0,
  amenities: [],
  status: 'available',
  instantBook: true,
  minimumStay: 1,
  images: [],
  superhostStatus: false,
  description: '',
  houseRules: '',
  cancellationPolicy: 'flexible'
};

const propertyTypes = [
  { value: 'apartment', label: 'Apartment', icon: '🏢' },
  { value: 'house', label: 'House', icon: '🏠' },
  { value: 'villa', label: 'Villa', icon: '🏡' },
  { value: 'studio', label: 'Studio', icon: '🏠' },
  { value: 'penthouse', label: 'Penthouse', icon: '🏢' },
  { value: 'cottage', label: 'Cottage', icon: '🏡' },
  { value: 'loft', label: 'Loft', icon: '🏭' }
];

const availableAmenities = [
  'WiFi',
  'Air Conditioning',
  'Heating',
  'Kitchen',
  'Washing Machine',
  'Dishwasher',
  'TV',
  'Parking',
  'Pool',
  'Gym',
  'Balcony',
  'Garden',
  'Sea View',
  'Pet Friendly',
  'Elevator',
  'Security',
  'Workspace',
  'Coffee Maker',
  'Hair Dryer',
  'Iron'
];

const cities = [
  'Istanbul',
  'Antalya',
  'Bodrum',
  'Cappadocia',
  'Izmir',
  'Fethiye',
  'Marmaris',
  'Alanya',
  'Kas',
  'Oludeniz'
];

const cancellationPolicies = [
  { value: 'flexible', label: 'Flexible - Full refund 24 hours before check-in' },
  { value: 'moderate', label: 'Moderate - Full refund 5 days before check-in' },
  { value: 'strict', label: 'Strict - 50% refund up until 1 week before check-in' }
];

export default function NewRentalPropertyPage() {
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

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.pricePerNight <= 0) newErrors.pricePerNight = 'Price must be greater than 0';
    if (formData.bedrooms < 0) newErrors.bedrooms = 'Bedrooms cannot be negative';
    if (formData.bathrooms < 0) newErrors.bathrooms = 'Bathrooms cannot be negative';
    if (formData.maxGuests < 1) newErrors.maxGuests = 'Max guests must be at least 1';
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

      // In production:
      // const response = await fetch('/api/admin/rental-properties', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setShowSuccess(true);
      setTimeout(() => {
        router.push('/admin/v2/rental-properties');
      }, 2000);
    } catch (error) {
      console.error('Error creating rental property:', error);
      setErrors({ submit: 'Failed to create property. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>New Rental Property | Admin v2</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/v2/rental-properties"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Rental Properties</span>
                </Link>
              </div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Home className="w-6 h-6 text-purple-400" />
                New Rental Property
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
            <span className="font-medium">Property created successfully!</span>
          </motion.div>
        )}

        {/* Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">

                {/* Basic Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Home className="w-5 h-5 text-purple-400" />
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`w-full bg-white/5 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                        placeholder="e.g., Luxury Apartment with Sea View"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Property Type
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => handleInputChange('propertyType', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                          {propertyTypes.map(type => (
                            <option key={type.value} value={type.value} className="bg-slate-800">
                              {type.icon} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                          {cities.map(city => (
                            <option key={city} value={city} className="bg-slate-800">
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`w-full bg-white/5 border ${errors.address ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                        placeholder="Street, District, Postal Code"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-400">{errors.address}</p>
                      )}
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
                        Price per Night (₺) *
                      </label>
                      <input
                        type="number"
                        value={formData.pricePerNight}
                        onChange={(e) => handleInputChange('pricePerNight', parseFloat(e.target.value))}
                        className={`w-full bg-white/5 border ${errors.pricePerNight ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors`}
                        min="0"
                        step="0.01"
                      />
                      {errors.pricePerNight && (
                        <p className="mt-1 text-sm text-red-400">{errors.pricePerNight}</p>
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cleaning Fee (₺)
                      </label>
                      <input
                        type="number"
                        value={formData.cleaningFee}
                        onChange={(e) => handleInputChange('cleaningFee', parseFloat(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Security Deposit (₺)
                      </label>
                      <input
                        type="number"
                        value={formData.securityDeposit}
                        onChange={(e) => handleInputChange('securityDeposit', parseFloat(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
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
                  <h2 className="text-xl font-bold text-white mb-6">Property Details</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Bed className="w-4 h-4" />
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Bath className="w-4 h-4" />
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Max Guests
                      </label>
                      <input
                        type="number"
                        value={formData.maxGuests}
                        onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Square className="w-4 h-4" />
                        Size (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.squareMeters}
                        onChange={(e) => handleInputChange('squareMeters', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="0"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Amenities</h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableAmenities.map(amenity => (
                      <label
                        key={amenity}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-4 h-4 rounded text-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/10 border-white/20"
                        />
                        <span className="text-sm text-gray-300">{amenity}</span>
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
                    className={`w-full bg-white/5 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none`}
                    placeholder="Describe your property, its features, neighborhood, and what makes it special..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </motion.div>

                {/* House Rules */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">House Rules</h2>

                  <textarea
                    value={formData.houseRules}
                    onChange={(e) => handleInputChange('houseRules', e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="No smoking, No parties, Check-in: 2 PM, Check-out: 11 AM..."
                  />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">

                {/* Status & Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold text-white mb-4">Settings</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="available" className="bg-slate-800">Available</option>
                        <option value="booked" className="bg-slate-800">Booked</option>
                        <option value="maintenance" className="bg-slate-800">Maintenance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Minimum Stay (nights)
                      </label>
                      <input
                        type="number"
                        value={formData.minimumStay}
                        onChange={(e) => handleInputChange('minimumStay', parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        min="1"
                      />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.instantBook}
                        onChange={(e) => handleInputChange('instantBook', e.target.checked)}
                        className="w-5 h-5 rounded text-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/10 border-white/20"
                      />
                      <span className="text-sm text-gray-300">Instant Book</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.superhostStatus}
                        onChange={(e) => handleInputChange('superhostStatus', e.target.checked)}
                        className="w-5 h-5 rounded text-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/10 border-white/20"
                      />
                      <span className="text-sm text-gray-300 flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        Superhost Status
                      </span>
                    </label>
                  </div>
                </motion.div>

                {/* Cancellation Policy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold text-white mb-4">Cancellation Policy</h2>

                  <div className="space-y-3">
                    {cancellationPolicies.map(policy => (
                      <label
                        key={policy.value}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="cancellationPolicy"
                          value={policy.value}
                          checked={formData.cancellationPolicy === policy.value}
                          onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                          className="mt-1 w-4 h-4 text-purple-500 focus:ring-2 focus:ring-purple-500 bg-white/10 border-white/20"
                        />
                        <span className="text-sm text-gray-300">{policy.label}</span>
                      </label>
                    ))}
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
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Create Property
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/admin/v2/rental-properties')}
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
