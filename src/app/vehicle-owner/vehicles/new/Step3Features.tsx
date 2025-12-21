'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Search, CheckCircle2, Circle } from 'lucide-react';
import { VEHICLE_FEATURES } from '@/data/vehicleCategories';

interface Step3Props {
  data?: any;
  allData?: any;
}

const featureCategories = [
  { key: 'basic', label: 'Temel Özellikler', color: 'blue' },
  { key: 'comfort', label: 'Konfor Özellikleri', color: 'purple' },
  { key: 'technology', label: 'Teknoloji', color: 'cyan' },
  { key: 'safety', label: 'Güvenlik', color: 'green' },
  { key: 'entertainment', label: 'Eğlence', color: 'pink' },
];

export default function Step3Features({ data }: Step3Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all selected features
  const getAllSelectedFeatures = () => {
    const selectedFeatures: string[] = [];
    featureCategories.forEach(({ key }) => {
      const categoryFeatures = VEHICLE_FEATURES[key as keyof typeof VEHICLE_FEATURES];
      categoryFeatures.forEach((feature) => {
        if (watch(`features.${feature.id}`)) {
          selectedFeatures.push(feature.id);
        }
      });
    });
    return selectedFeatures;
  };

  const selectedFeatures = getAllSelectedFeatures();

  // Toggle feature
  const toggleFeature = (featureId: string) => {
    const currentValue = watch(`features.${featureId}`);
    setValue(`features.${featureId}`, !currentValue, { shouldValidate: true });
  };

  // Select all features in category
  const selectAllInCategory = (categoryKey: string) => {
    const categoryFeatures = VEHICLE_FEATURES[categoryKey as keyof typeof VEHICLE_FEATURES];
    categoryFeatures.forEach((feature) => {
      setValue(`features.${feature.id}`, true, { shouldValidate: true });
    });
  };

  // Deselect all features in category
  const deselectAllInCategory = (categoryKey: string) => {
    const categoryFeatures = VEHICLE_FEATURES[categoryKey as keyof typeof VEHICLE_FEATURES];
    categoryFeatures.forEach((feature) => {
      setValue(`features.${feature.id}`, false, { shouldValidate: true });
    });
  };

  // Filter features by search
  const filterFeatures = (features: any[]) => {
    if (!searchQuery) return features;
    return features.filter(
      (feature) =>
        feature.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.labelEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-8">
      {/* Search and Stats */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Araç Özellikleri</h3>
            <p className="text-sm text-slate-600">
              Aracınızın sahip olduğu özellikleri seçin
            </p>
          </div>
          <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-sm font-semibold text-green-900">
              {selectedFeatures.length} özellik seçildi
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Özellik ara... (örn: GPS, Klima, ABS)"
            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            selectedCategory === null
              ? 'bg-green-500 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Tümü
        </button>
        {featureCategories.map(({ key, label, color }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === key
                ? `bg-${color}-500 text-white`
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Feature Categories */}
      {featureCategories
        .filter((cat) => !selectedCategory || cat.key === selectedCategory)
        .map(({ key, label, color }) => {
          const categoryFeatures = VEHICLE_FEATURES[key as keyof typeof VEHICLE_FEATURES];
          const filteredFeatures = filterFeatures(categoryFeatures);

          if (filteredFeatures.length === 0 && searchQuery) return null;

          const selectedInCategory = categoryFeatures.filter((f) =>
            watch(`features.${f.id}`)
          ).length;

          return (
            <div key={key} className="border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${color}-500`} />
                  <h3 className="text-lg font-bold text-slate-900">{label}</h3>
                  <span className="text-sm text-slate-600">
                    ({selectedInCategory}/{categoryFeatures.length})
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => selectAllInCategory(key)}
                    className="px-3 py-1 text-sm font-semibold text-green-600 hover:bg-green-50 rounded-lg transition-all"
                  >
                    Tümünü Seç
                  </button>
                  <button
                    type="button"
                    onClick={() => deselectAllInCategory(key)}
                    className="px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    Temizle
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredFeatures.map((feature) => {
                  const isSelected = watch(`features.${feature.id}`);
                  const isPopular = feature.popular;

                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => toggleFeature(feature.id)}
                      className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 mb-0.5">
                            {feature.label}
                          </div>
                          {isPopular && (
                            <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                              Popüler
                            </span>
                          )}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        {...register(`features.${feature.id}`)}
                        className="hidden"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

      {/* No Results */}
      {searchQuery &&
        featureCategories.every(
          ({ key }) =>
            filterFeatures(VEHICLE_FEATURES[key as keyof typeof VEHICLE_FEATURES]).length === 0
        ) && (
          <div className="text-center py-12">
            <p className="text-slate-600">
              "{searchQuery}" için sonuç bulunamadı
            </p>
          </div>
        )}

      {/* Selected Features Summary */}
      {selectedFeatures.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
          <h4 className="font-bold text-green-900 mb-3">Seçili Özellikler Özeti</h4>
          <div className="flex flex-wrap gap-2">
            {featureCategories.map(({ key }) => {
              const categoryFeatures = VEHICLE_FEATURES[key as keyof typeof VEHICLE_FEATURES];
              return categoryFeatures
                .filter((f) => watch(`features.${f.id}`))
                .map((feature) => (
                  <span
                    key={feature.id}
                    className="px-3 py-1 bg-white border border-green-200 rounded-full text-sm font-medium text-green-900"
                  >
                    {feature.label}
                  </span>
                ));
            })}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2">İpuçları:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Daha fazla özellik seçmek, aracınızın daha çekici görünmesini sağlar</li>
          <li>• Popüler özellikler (GPS, Klima, ABS) mutlaka eklenmelidir</li>
          <li>• Sadece gerçekten sahip olduğunuz özellikleri seçin</li>
          <li>• Güvenlik özellikleri kiracılar için önemlidir</li>
          <li>• Teknoloji özellikleri premium araçlar için fark yaratır</li>
        </ul>
      </div>
    </div>
  );
}
