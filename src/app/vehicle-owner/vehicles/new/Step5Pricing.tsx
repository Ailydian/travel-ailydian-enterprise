'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  DollarSign,
  TrendingDown,
  Shield,
  Gauge,
  Fuel,
  Compass,
  Baby,
  Navigation,
  UserPlus,
  Calculator,
  Info,
  Percent,
} from 'lucide-react';

interface Step5Props {
  data?: any;
  allData?: any;
}

const currencies = [
  { value: 'TRY', label: 'TRY (₺)', symbol: '₺' },
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
];

const fuelPolicies = [
  { value: 'full-to-full', label: 'Dolu/Dolu', description: 'Dolu alın, dolu iade edin' },
  { value: 'same-to-same', label: 'Aynı/Aynı', description: 'Aldığınız seviyede iade edin' },
];

export default function Step5Pricing({ data }: Step5Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const currency = watch('currency') || 'TRY';
  const dailyRate = watch('dailyRate') || 0;
  const weeklyDiscount = watch('discounts.weeklyDiscount') || 0;
  const monthlyDiscount = watch('discounts.monthlyDiscount') || 0;
  const mileageType = watch('mileageLimit.type') || 'limited';

  // Calculate preview prices
  const [pricePreview, setPricePreview] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });

  useEffect(() => {
    const daily = parseFloat(dailyRate) || 0;
    const weeklyTotal = daily * 7;
    const monthlyTotal = daily * 30;

    setPricePreview({
      daily,
      weekly: weeklyTotal - (weeklyTotal * weeklyDiscount) / 100,
      monthly: monthlyTotal - (monthlyTotal * monthlyDiscount) / 100,
    });
  }, [dailyRate, weeklyDiscount, monthlyDiscount]);

  const getCurrencySymbol = () => {
    return currencies.find((c) => c.value === currency)?.symbol || '₺';
  };

  return (
    <div className="space-y-8">
      {/* Currency Selection */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-lydian-success-light rounded-lg">
            <DollarSign className="w-5 h-5 text-lydian-success" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Para Birimi</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {currencies.map((curr) => (
            <button
              key={curr.value}
              type="button"
              onClick={() => setValue('currency', curr.value, { shouldValidate: true })}
              className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                currency === curr.value
                  ? 'border-lydian-success bg-lydian-success-lighter text-green-900'
                  : 'border-slate-200 bg-lydian-bg/5 text-slate-700 hover:border-slate-300'
              }`}
            >
              {curr.label}
            </button>
          ))}
        </div>
        <input type="hidden" {...register('currency')} />
      </div>

      {/* Daily Rate */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-lydian-info-light rounded-lg">
            <DollarSign className="w-5 h-5 text-lydian-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Günlük Ücret</h3>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Günlük Kiralama Ücreti <span className="text-lydian-secondary">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
              {getCurrencySymbol()}
            </span>
            <input
              type="number"
              {...register('dailyRate')}
              placeholder="0"
              min="0"
              step="10"
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg font-semibold"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Aracınız için günlük kiralama ücreti
          </p>
          {errors.dailyRate && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.dailyRate.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Discounts */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-lydian-warning-light rounded-lg">
            <TrendingDown className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">İndirimler</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weekly Discount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Haftalık İndirim (7+ gün)
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('discounts.weeklyDiscount')}
                placeholder="0"
                min="0"
                max="50"
                step="5"
                className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                %
              </span>
            </div>
          </div>

          {/* Monthly Discount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Aylık İndirim (30+ gün)
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('discounts.monthlyDiscount')}
                placeholder="0"
                min="0"
                max="50"
                step="5"
                className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                %
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Uzun süreli kiralamalar için indirim yüzdesi
        </p>
      </div>

      {/* Security Deposit */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Güvenlik Deposu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Depozito Tutarı <span className="text-lydian-secondary">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                {...register('securityDeposit')}
                placeholder="0"
                min="0"
                step="100"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
            {errors.securityDeposit && (
              <p className="mt-1 text-sm text-lydian-error">
                {errors.securityDeposit.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              İade Süresi (gün)
            </label>
            <input
              type="number"
              {...register('depositRefundDays')}
              placeholder="7"
              min="1"
              max="30"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Mileage Limit */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-lydian-primary-lighter rounded-lg">
            <Gauge className="w-5 h-5 text-lydian-error" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Kilometre Limiti</h3>
        </div>

        <div className="space-y-4">
          {/* Mileage Type */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setValue('mileageLimit.type', 'unlimited', { shouldValidate: true })}
              className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                mileageType === 'unlimited'
                  ? 'border-lydian-success bg-lydian-success-lighter'
                  : 'border-slate-200 bg-lydian-bg/5 hover:border-slate-300'
              }`}
            >
              <h4 className="font-semibold text-slate-900 mb-1">Sınırsız</h4>
              <p className="text-xs text-slate-600">Km limiti yok</p>
            </button>
            <button
              type="button"
              onClick={() => setValue('mileageLimit.type', 'limited', { shouldValidate: true })}
              className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                mileageType === 'limited'
                  ? 'border-lydian-success bg-lydian-success-lighter'
                  : 'border-slate-200 bg-lydian-bg/5 hover:border-slate-300'
              }`}
            >
              <h4 className="font-semibold text-slate-900 mb-1">Limitli</h4>
              <p className="text-xs text-slate-600">Günlük/haftalık limit</p>
            </button>
          </div>
          <input type="hidden" {...register('mileageLimit.type')} />

          {/* Limited Options */}
          {mileageType === 'limited' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Günlük Limit (km)
                </label>
                <input
                  type="number"
                  {...register('mileageLimit.dailyLimit')}
                  placeholder="200"
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Fazla KM Ücreti ({getCurrencySymbol()}/km)
                </label>
                <input
                  type="number"
                  {...register('mileageLimit.extraMileageFee')}
                  placeholder="0.5"
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fuel Policy */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Fuel className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Yakıt Politikası</h3>
        </div>

        <div className="space-y-3">
          {fuelPolicies.map((policy) => {
            const isSelected = watch('fuelPolicy') === policy.value;

            return (
              <button
                key={policy.value}
                type="button"
                onClick={() => setValue('fuelPolicy', policy.value, { shouldValidate: true })}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-lydian-success bg-lydian-success-lighter'
                    : 'border-slate-200 bg-lydian-bg/5 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      isSelected
                        ? 'border-lydian-success bg-green-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-lydian-bg/5 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{policy.label}</h4>
                    <p className="text-sm text-slate-600">{policy.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register('fuelPolicy')} />
      </div>

      {/* Extra Services Pricing */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Compass className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ekstra Hizmet Ücretleri</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GPS */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Navigation className="w-4 h-4" />
              GPS (günlük)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                {...register('fees.gpsRentalFee')}
                placeholder="0"
                min="0"
                step="5"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Baby Seat */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Baby className="w-4 h-4" />
              Bebek Koltuğu (günlük)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                {...register('fees.childSeatFee')}
                placeholder="0"
                min="0"
                step="5"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Additional Driver */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <UserPlus className="w-4 h-4" />
              Ek Sürücü (günlük)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                {...register('fees.additionalDriverFee')}
                placeholder="0"
                min="0"
                step="5"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Young Driver Fee */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Info className="w-4 h-4" />
              Genç Sürücü Ücreti (günlük)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                {...register('fees.youngDriverFee')}
                placeholder="0"
                min="0"
                step="5"
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-success focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Ekstra hizmetler için günlük ücretler (isteğe bağlı)
        </p>
      </div>

      {/* Price Calculator Preview */}
      <div className="border-2 border-lydian-success bg-lydian-success-lighter rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-lydian-success-light rounded-lg">
            <Calculator className="w-5 h-5 text-lydian-success" />
          </div>
          <h3 className="text-lg font-bold text-green-900">Fiyat Önizlemesi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-lydian-bg/5 rounded-lg border border-green-200">
            <p className="text-xs text-slate-600 mb-1">Günlük</p>
            <p className="text-2xl font-bold text-slate-900">
              {getCurrencySymbol()}{pricePreview.daily.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-lydian-bg/5 rounded-lg border border-green-200">
            <p className="text-xs text-slate-600 mb-1">Haftalık (7 gün)</p>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {getCurrencySymbol()}{pricePreview.weekly.toFixed(2)}
              </p>
              {weeklyDiscount > 0 && (
                <p className="text-xs text-lydian-success font-medium">
                  %{weeklyDiscount} indirim uygulandı
                </p>
              )}
            </div>
          </div>

          <div className="p-4 bg-lydian-bg/5 rounded-lg border border-green-200">
            <p className="text-xs text-slate-600 mb-1">Aylık (30 gün)</p>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {getCurrencySymbol()}{pricePreview.monthly.toFixed(2)}
              </p>
              {monthlyDiscount > 0 && (
                <p className="text-xs text-lydian-success font-medium">
                  %{monthlyDiscount} indirim uygulandı
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">Fiyatlandırma İpuçları:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Benzer araçları araştırarak rekabetçi fiyat belirleyin</li>
          <li>• Uzun süreli kiralamalar için indirimler daha fazla rezervasyon getirir</li>
          <li>• Güvenlik deposu hasar riskini azaltır</li>
          <li>• Sınırsız kilometre genellikle daha fazla ilgi çeker</li>
          <li>• Ekstra hizmetler ek gelir sağlar</li>
        </ul>
      </div>
    </div>
  );
}
