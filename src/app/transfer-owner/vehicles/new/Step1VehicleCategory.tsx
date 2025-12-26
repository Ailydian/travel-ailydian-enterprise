'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  Briefcase,
  Crown,
  Bus,
  Sparkles,
} from 'lucide-react';
import { TRANSFER_VEHICLES, type VehicleType } from '@/data/transfer-vehicles';

interface VehicleTypeOption extends VehicleType {
  icon: React.ElementType;
  colorClass: string;
}

const vehicleTypeOptions: VehicleTypeOption[] = TRANSFER_VEHICLES.map((vehicle) => {
  let icon = Car;
  let colorClass = 'from-blue-500 to-blue-600';

  // Assign icons and colors based on category
  switch (vehicle.category) {
    case 'economy':
      icon = Car;
      colorClass = 'from-blue-500 to-blue-600';
      break;
    case 'comfort':
      icon = Briefcase;
      colorClass = 'from-cyan-500 to-blue-500';
      break;
    case 'premium':
      icon = Sparkles;
      colorClass = 'from-indigo-500 to-purple-500';
      break;
    case 'luxury':
      icon = Crown;
      colorClass = 'from-purple-600 to-pink-600';
      break;
    case 'group':
      icon = Users;
      colorClass = 'from-green-500 to-teal-500';
      break;
  }

  // Special case for buses
  if (vehicle.id.includes('bus') || vehicle.id.includes('minibus')) {
    icon = Bus;
  }

  return {
    ...vehicle,
    icon,
    colorClass,
  };
});

interface Step1Props {
  data?: any;
  allData?: any;
}

export default function Step1VehicleCategory({ data }: Step1Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedVehicleType = watch('vehicleType');

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'economy':
        return 'Ekonomik';
      case 'comfort':
        return 'Konforlu';
      case 'premium':
        return 'Premium';
      case 'luxury':
        return 'Lüks';
      case 'group':
        return 'Grup';
      default:
        return category;
    }
  };

  return (
    <div className="space-y-8">
      {/* Vehicle Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          Araç Tipi Seçin <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-slate-600 mb-6">
          Transfer hizmeti vereceğiniz araç tipini seçin. Seçtiğiniz araç tipi, kapasite ve fiyatlandırmayı belirleyecektir.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {vehicleTypeOptions.map((vehicle) => {
            const Icon = vehicle.icon;
            const isSelected = selectedVehicleType === vehicle.id;

            return (
              <motion.button
                key={vehicle.id}
                type="button"
                onClick={() => setValue('vehicleType', vehicle.id, { shouldValidate: true })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-5 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                    : 'border-slate-200 bg-white/5 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      isSelected ? vehicle.colorClass : 'from-slate-100 to-slate-200'
                    } ${isSelected ? 'shadow-md' : ''}`}
                  >
                    <Icon
                      className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-slate-600'}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-cyan-200 text-cyan-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {getCategoryLabel(vehicle.category)}
                      </span>
                      {vehicle.popular && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                          Popüler
                        </span>
                      )}
                    </div>

                    {/* Vehicle Name */}
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isSelected ? 'text-cyan-900' : 'text-slate-900'
                      }`}
                    >
                      {vehicle.name}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm mb-3 ${
                        isSelected ? 'text-cyan-700' : 'text-slate-600'
                      }`}
                    >
                      {vehicle.description}
                    </p>

                    {/* Capacity Info */}
                    <div className="flex flex-wrap gap-3 text-xs mb-3">
                      <div
                        className={`flex items-center gap-1 ${
                          isSelected ? 'text-cyan-700' : 'text-slate-600'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span className="font-medium">
                          {vehicle.capacity.passengers}-{vehicle.capacity.maxPassengers} Kişi
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          isSelected ? 'text-cyan-700' : 'text-slate-600'
                        }`}
                      >
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{vehicle.capacity.luggage} Bagaj</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {vehicle.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-cyan-100 text-cyan-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                      {vehicle.features.length > 3 && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-cyan-100 text-cyan-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          +{vehicle.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Price Multiplier */}
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Fiyat Çarpanı</span>
                        <span
                          className={`text-sm font-bold ${
                            isSelected ? 'text-cyan-700' : 'text-slate-700'
                          }`}
                        >
                          {vehicle.priceMultiplier}x
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
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
              </motion.button>
            );
          })}
        </div>

        <input type="hidden" {...register('vehicleType', { required: 'Araç tipi seçmelisiniz' })} />
        {errors.vehicleType && (
          <p className="mt-2 text-sm text-red-600">
            {errors.vehicleType.message?.toString()}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl">
        <h4 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Transfer Aracı Seçerken Dikkat Edilmesi Gerekenler
        </h4>
        <ul className="text-sm text-cyan-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-0.5">•</span>
            <span>
              <strong>Kapasite:</strong> Yolcu ve bagaj sayısı, seçtiğiniz araç tipine göre otomatik ayarlanır
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-0.5">•</span>
            <span>
              <strong>Fiyatlandırma:</strong> Her araç tipi farklı fiyat çarpanına sahiptir
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-0.5">•</span>
            <span>
              <strong>D2 Belgesi:</strong> Tüm araçlar için D2 turizm belgesi ve ticari plaka zorunludur
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-0.5">•</span>
            <span>
              <strong>Popüler Seçimler:</strong> Ekonomik Sedan, VIP Sedan ve Minivan en çok tercih edilen araçlardır
            </span>
          </li>
        </ul>
      </div>

      {/* Selected Vehicle Summary */}
      {selectedVehicleType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl"
        >
          <h4 className="font-semibold text-blue-900 mb-2">Seçilen Araç Tipi</h4>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              {(() => {
                const selected = vehicleTypeOptions.find((v) => v.id === selectedVehicleType);
                const SelectedIcon = selected?.icon || Car;
                return <SelectedIcon className="w-6 h-6 text-white" />;
              })()}
            </div>
            <div>
              <p className="font-bold text-blue-900">
                {vehicleTypeOptions.find((v) => v.id === selectedVehicleType)?.name}
              </p>
              <p className="text-sm text-blue-700">
                {vehicleTypeOptions.find((v) => v.id === selectedVehicleType)?.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
