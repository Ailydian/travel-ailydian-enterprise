'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Plane,
  MapPin,
  Clock,
  TrendingUp,
  DollarSign,
  Moon,
  Calendar,
  Map,
  Route,
  Plus,
  X,
  Search,
} from 'lucide-react';

interface Airport {
  code: string;
  name: string;
  city: string;
}

const AIRPORTS: Airport[] = [
  { code: 'IST', name: 'İstanbul Havalimanı', city: 'İstanbul' },
  { code: 'SAW', name: 'Sabiha Gökçen Havalimanı', city: 'İstanbul' },
  { code: 'ESB', name: 'Esenboğa Havalimanı', city: 'Ankara' },
  { code: 'ADB', name: 'Adnan Menderes Havalimanı', city: 'İzmir' },
  { code: 'AYT', name: 'Antalya Havalimanı', city: 'Antalya' },
  { code: 'DLM', name: 'Dalaman Havalimanı', city: 'Muğla' },
  { code: 'BJV', name: 'Milas-Bodrum Havalimanı', city: 'Muğla' },
  { code: 'GZT', name: 'Gaziantep Havalimanı', city: 'Gaziantep' },
  { code: 'TZX', name: 'Trabzon Havalimanı', city: 'Trabzon' },
];

interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
  basePrice: number;
}

const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: 'ist-taksim',
    from: 'İstanbul Havalimanı',
    to: 'Taksim',
    distance: 45,
    duration: 50,
    basePrice: 450,
  },
  {
    id: 'saw-kadikoy',
    from: 'Sabiha Gökçen',
    to: 'Kadıköy',
    distance: 35,
    duration: 40,
    basePrice: 350,
  },
  {
    id: 'ayt-lara',
    from: 'Antalya Havalimanı',
    to: 'Lara Beach',
    distance: 15,
    duration: 20,
    basePrice: 200,
  },
  {
    id: 'dlm-marmaris',
    from: 'Dalaman Havalimanı',
    to: 'Marmaris',
    distance: 95,
    duration: 90,
    basePrice: 800,
  },
  {
    id: 'bjv-bodrum',
    from: 'Milas-Bodrum Havalimanı',
    to: 'Bodrum',
    distance: 35,
    duration: 40,
    basePrice: 350,
  },
];

interface Step4Props {
  data?: any;
  allData?: any;
}

export default function Step4Routes({ data }: Step4Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedAirports = watch('airports') || [];
  const selectedRoutes = watch('routes') || [];
  const basePricePerKm = watch('basePricePerKm') || 8.5;
  const minimumFare = watch('minimumFare') || 250;
  const nightSurcharge = watch('nightSurcharge') || 20;
  const weekendSurcharge = watch('weekendSurcharge') || 15;

  const [searchQuery, setSearchQuery] = useState('');

  const toggleAirport = (code: string) => {
    const current = selectedAirports || [];
    if (current.includes(code)) {
      setValue(
        'airports',
        current.filter((c: string) => c !== code),
        { shouldValidate: true }
      );
    } else {
      setValue('airports', [...current, code], { shouldValidate: true });
    }
  };

  const toggleRoute = (routeId: string) => {
    const current = selectedRoutes || [];
    if (current.includes(routeId)) {
      setValue(
        'routes',
        current.filter((r: string) => r !== routeId),
        { shouldValidate: true }
      );
    } else {
      setValue('routes', [...current, routeId], { shouldValidate: true });
    }
  };

  const filteredAirports = AIRPORTS.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Airport Selection */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Havalimanı Transferi <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Hizmet vereceğiniz havalimanlarını seçin. En az bir havalimanı seçmelisiniz.
        </p>

        {/* Search */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Havalimanı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAirports.map((airport) => {
            const isSelected = selectedAirports.includes(airport.code);

            return (
              <motion.button
                key={airport.code}
                type="button"
                onClick={() => toggleAirport(airport.code)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50 shadow-md'
                    : 'border-slate-200 bg-white/5 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                        : 'bg-slate-100'
                    }`}
                  >
                    <Plane
                      className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-600'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-cyan-200 text-cyan-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {airport.code}
                        </span>
                        <h4
                          className={`font-semibold mt-2 ${
                            isSelected ? 'text-cyan-900' : 'text-slate-900'
                          }`}
                        >
                          {airport.name}
                        </h4>
                        <p
                          className={`text-xs mt-1 ${
                            isSelected ? 'text-cyan-700' : 'text-slate-600'
                          }`}
                        >
                          {airport.city}
                        </p>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {errors.airports && (
          <p className="mt-2 text-sm text-red-600">{errors.airports.message?.toString()}</p>
        )}
      </div>

      {/* Popular Routes */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Popüler Rotalar</h3>
        <p className="text-sm text-slate-600 mb-4">
          En çok tercih edilen rotaları seçin. Özel fiyatlandırma yapabilirsiniz.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {POPULAR_ROUTES.map((route) => {
            const isSelected = selectedRoutes.includes(route.id);

            return (
              <motion.button
                key={route.id}
                type="button"
                onClick={() => toggleRoute(route.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-white/5 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                          : 'bg-slate-100'
                      }`}
                    >
                      <Route
                        className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-600'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span
                          className={`font-bold ${
                            isSelected ? 'text-blue-900' : 'text-slate-900'
                          }`}
                        >
                          {route.from}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span
                          className={`font-bold ${
                            isSelected ? 'text-blue-900' : 'text-slate-900'
                          }`}
                        >
                          {route.to}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <Map className="w-3 h-3" />
                          <span>{route.distance} km</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>~{route.duration} dk</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span className="font-semibold">₺{route.basePrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Pricing Configuration */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Fiyatlandırma Ayarları</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Price Per KM */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Kilometre Başı Ücret (₺) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                step="0.1"
                {...register('basePricePerKm', {
                  required: 'Kilometre başı ücret gerekli',
                  valueAsNumber: true,
                  min: 1,
                })}
                placeholder="8.5"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Önerilen: ₺7.5 - ₺10.0</p>
            {errors.basePricePerKm && (
              <p className="mt-1 text-sm text-red-600">
                {errors.basePricePerKm.message?.toString()}
              </p>
            )}
          </div>

          {/* Minimum Fare */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Minimum Ücret (₺) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('minimumFare', {
                  required: 'Minimum ücret gerekli',
                  valueAsNumber: true,
                  min: 100,
                })}
                placeholder="250"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Kısa mesafeler için minimum ücret</p>
            {errors.minimumFare && (
              <p className="mt-1 text-sm text-red-600">
                {errors.minimumFare.message?.toString()}
              </p>
            )}
          </div>

          {/* Night Surcharge */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gece Ek Ücreti (%) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Moon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('nightSurcharge', {
                  required: 'Gece ek ücreti gerekli',
                  valueAsNumber: true,
                  min: 0,
                  max: 100,
                })}
                placeholder="20"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">22:00 - 06:00 arası (Önerilen: %15-25)</p>
            {errors.nightSurcharge && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nightSurcharge.message?.toString()}
              </p>
            )}
          </div>

          {/* Weekend Surcharge */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Hafta Sonu Ek Ücreti (%) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                {...register('weekendSurcharge', {
                  required: 'Hafta sonu ek ücreti gerekli',
                  valueAsNumber: true,
                  min: 0,
                  max: 100,
                })}
                placeholder="15"
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Cumartesi-Pazar (Önerilen: %10-20)
            </p>
            {errors.weekendSurcharge && (
              <p className="mt-1 text-sm text-red-600">
                {errors.weekendSurcharge.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      {basePricePerKm > 0 && minimumFare > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl"
        >
          <h4 className="font-semibold text-cyan-900 mb-3">Fiyatlandırma Özeti</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-cyan-700 mb-1">Kilometre Başı</p>
              <p className="text-xl font-bold text-cyan-900">₺{basePricePerKm}</p>
            </div>
            <div>
              <p className="text-cyan-700 mb-1">Minimum Ücret</p>
              <p className="text-xl font-bold text-cyan-900">₺{minimumFare}</p>
            </div>
            <div>
              <p className="text-cyan-700 mb-1">Gece Ek Ücreti</p>
              <p className="text-xl font-bold text-cyan-900">%{nightSurcharge}</p>
            </div>
            <div>
              <p className="text-cyan-700 mb-1">Hafta Sonu</p>
              <p className="text-xl font-bold text-cyan-900">%{weekendSurcharge}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-cyan-200">
            <p className="text-xs text-cyan-700">
              <strong>Örnek:</strong> 50 km transfer = ₺{basePricePerKm * 50} (Normal) / ₺
              {Math.round(basePricePerKm * 50 * (1 + nightSurcharge / 100))} (Gece)
            </p>
          </div>
        </motion.div>
      )}

      {/* Info Box */}
      <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
        <h4 className="font-semibold text-blue-900 mb-3">Fiyatlandırma Bilgileri</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Seçtiğiniz araç tipinin fiyat çarpanı otomatik olarak uygulanacaktır</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Gece ek ücreti 22:00-06:00 saatleri arasında geçerlidir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Hafta sonu ek ücreti Cumartesi-Pazar için uygulanır</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Popüler rotalarda özel fiyatlandırma yapabilirsiniz</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
