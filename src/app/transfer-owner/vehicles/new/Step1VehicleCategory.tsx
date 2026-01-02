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
  let colorClass = 'from-blue-500 to-blue-6';

  // Assign icons and colors based on category
  switch (vehicle.category) {
    case 'economy':
      icon = Car;
      colorClass = 'from-blue-500 to-blue-6';
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
      colorClass = 'from-purple-6 to-pink-6';
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
        <label className="block text-sm font-semibold text-slate-7 mb-4">
          Araç Tipi Seçin <span className="text-purple-500">*</span>
        </label>
        <p className="text-sm text-slate-6 mb-6">
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
                    ? 'border-cyan-500 bg-cyan-500 shadow-lg'
                    : 'border-slate-200 bg-white/5 hover:border-slate-3 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      isSelected ? vehicle.colorClass : 'from-slate-1 to-slate-200'
                    } ${isSelected ? 'shadow-md' : ''}`}
                  >
                    <Icon
                      className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-slate-6'}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-cyan-200 text-cyan-8'
                            : 'bg-slate-200 text-slate-7'
                        }`}
                      >
                        {getCategoryLabel(vehicle.category)}
                      </span>
                      {vehicle.popular && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500-light text-amber-8">
                          Popüler
                        </span>
                      )}
                    </div>

                    {/* Vehicle Name */}
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isSelected ? 'text-cyan-9' : 'text-slate-9'
                      }`}
                    >
                      {vehicle.name}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm mb-3 ${
                        isSelected ? 'text-cyan-7' : 'text-slate-6'
                      }`}
                    >
                      {vehicle.description}
                    </p>

                    {/* Capacity Info */}
                    <div className="flex flex-wrap gap-3 text-xs mb-3">
                      <div
                        className={`flex items-center gap-1 ${
                          isSelected ? 'text-cyan-7' : 'text-slate-6'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span className="font-medium">
                          {vehicle.capacity.passengers}-{vehicle.capacity.maxPassengers} Kişi
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          isSelected ? 'text-cyan-7' : 'text-slate-6'
                        }`}
                      >
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{vehicle.capacity.luggage} Bagaj</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {vehicle.features.slice(to-cyan-700, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-cyan-1 text-cyan-7'
                              : 'bg-slate-1 text-slate-6'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                      {vehicle.features.length > 3 && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-cyan-1 text-cyan-7'
                              : 'bg-slate-1 text-slate-6'
                          }`}
                        >
                          +{vehicle.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Price Multiplier */}
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-6">Fiyat Çarpanı</span>
                        <span
                          className={`text-sm font-bold ${
                            isSelected ? 'text-cyan-7' : 'text-slate-7'
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
                    initial={{ scale: to-cyan-700 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-6 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="to-cyan-700 to-cyan-700 24 24"
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
          <p className="mt-2 text-sm text-lydian-error">
            {errors.vehicleType.message?.toString()}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-5 bg-gradient-to-br from-cyan-500 to-blue-500 border border-cyan-200 rounded-xl">
        <h4 className="font-semibold text-cyan-9 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Transfer Aracı Seçerken Dikkat Edilmesi Gerekenler
        </h4>
        <ul className="text-sm text-cyan-8 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-cyan-6 mt-0.5">•</span>
            <span>
              <strong>Kapasite:</strong> Yolcu ve bagaj sayısı, seçtiğiniz araç tipine göre otomatik ayarlanır
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-6 mt-0.5">•</span>
            <span>
              <strong>Fiyatlandırma:</strong> Her araç tipi farklı fiyat çarpanına sahiptir
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-6 mt-0.5">•</span>
            <span>
              <strong>D2 Belgesi:</strong> Tüm araçlar için D2 turizm belgesi ve ticari plaka zorunludur
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-6 mt-0.5">•</span>
            <span>
              <strong>Popüler Seçimler:</strong> Ekonomik Sedan, VIP Sedan ve Minivan en çok tercih edilen araçlardır
            </span>
          </li>
        </ul>
      </div>

      {/* Selected Vehicle Summary */}
      {selectedVehicleType && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-blue-3 rounded-xl"
        >
          <h4 className="font-semibold text-blue-9 mb-2">Seçilen Araç Tipi</h4>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              {(() => {
                const selected = vehicleTypeOptions.find((v) => v.id === selectedVehicleType);
                const SelectedIcon = selected?.icon || Car;
                return <SelectedIcon className="w-6 h-6 text-white" />;
              })()}
            </div>
            <div>
              <p className="font-bold text-blue-9">
                {vehicleTypeOptions.find((v) => v.id === selectedVehicleType)?.name}
              </p>
              <p className="text-sm text-lydian-primary-hover">
                {vehicleTypeOptions.find((v) => v.id === selectedVehicleType)?.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
