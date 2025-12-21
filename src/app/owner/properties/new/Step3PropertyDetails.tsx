'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Wifi,
  Tv,
  Wind,
  Flame,
  Car,
  Utensils,
  Bed,
  Shield,
  Search,
  X,
} from 'lucide-react';

interface Step3Props {
  data?: any;
  allData?: any;
}

const amenityCategories = {
  basic: {
    title: 'Temel Olanaklar',
    icon: Wifi,
    items: [
      'WiFi',
      'Klima',
      'Isıtma',
      'Otopark',
      'TV',
      'Mutfak',
      'Çamaşır Makinesi',
      'Kurutma Makinesi',
      'Bulaşık Makinesi',
      'Buzdolabı',
      'Fırın',
    ],
  },
  bathroom: {
    title: 'Banyo',
    icon: Bed,
    items: [
      'Duş',
      'Küvet',
      'Saç Kurutma Makinesi',
      'Havlular',
      'Banyo Malzemeleri',
      'Sıcak Su',
      'Bide',
    ],
  },
  kitchen: {
    title: 'Mutfak ve Yemek',
    icon: Utensils,
    items: [
      'Ocak',
      'Fırın',
      'Mikrodalga',
      'Buzdolabı',
      'Bulaşık Makinesi',
      'Kahve Makinesi',
      'Su Isıtıcısı',
      'Ekmek Kızartma Makinesi',
      'Yemek Masası',
      'Tabak ve Çatal Bıçak Takımı',
      'Şarap Kadehleri',
    ],
  },
  entertainment: {
    title: 'Eğlence',
    icon: Tv,
    items: [
      'TV',
      'Kablo/Uydu',
      'Yayın Hizmetleri',
      'Netflix',
      'Masa Oyunları',
      'Kitaplar',
      'Müzik Sistemi',
      'Oyun Konsolu',
    ],
  },
  outdoor: {
    title: 'Açık Hava',
    icon: Wind,
    items: [
      'Balkon',
      'Teras',
      'Bahçe',
      'Mangal',
      'Havuz',
      'Jakuzi',
      'Sauna',
      'Bahçe Mobilyaları',
      'Plaj Erişimi',
      'Göl Erişimi',
    ],
  },
  safety: {
    title: 'Güvenlik',
    icon: Shield,
    items: [
      'Duman Dedektörü',
      'Karbonmonoksit Dedektörü',
      'Yangın Söndürücü',
      'İlk Yardım Çantası',
      'Güvenlik Kameraları',
      'Kapı Kilidi',
      'Kasa',
      'Acil Çıkış',
    ],
  },
};

export default function Step3PropertyDetails({ data }: Step3Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [customAmenity, setCustomAmenity] = useState('');

  const selectedAmenities = watch('amenities') || [];
  const customAmenities = watch('customAmenities') || [];

  const toggleAmenity = (amenity: string) => {
    const current = selectedAmenities;
    if (current.includes(amenity)) {
      setValue(
        'amenities',
        current.filter((a: string) => a !== amenity),
        { shouldValidate: true }
      );
    } else {
      setValue('amenities', [...current, amenity], { shouldValidate: true });
    }
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !customAmenities.includes(customAmenity.trim())) {
      setValue('customAmenities', [...customAmenities, customAmenity.trim()], {
        shouldValidate: true,
      });
      setCustomAmenity('');
    }
  };

  const removeCustomAmenity = (amenity: string) => {
    setValue(
      'customAmenities',
      customAmenities.filter((a: string) => a !== amenity),
      { shouldValidate: true }
    );
  };

  // Filter amenities based on search
  const filterAmenities = (items: string[]) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Olanakları ara..."
          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </div>

      {/* Selected Count */}
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-sm font-medium text-blue-900">
          {selectedAmenities.length + customAmenities.length} olanak seçildi
        </span>
        {selectedAmenities.length === 0 && (
          <span className="text-sm text-red-600">En az bir olanak seçin</span>
        )}
      </div>

      {/* Amenity Categories */}
      <div className="space-y-6">
        {Object.entries(amenityCategories).map(([key, category]) => {
          const CategoryIcon = category.icon;
          const filteredItems = filterAmenities(category.items);

          if (filteredItems.length === 0 && searchQuery) return null;

          return (
            <div key={key} className="border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CategoryIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredItems.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);

                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && (
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
                          )}
                        </div>
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden input for validation */}
      <input type="hidden" {...register('amenities')} value={selectedAmenities} />
      {errors.amenities && (
        <p className="text-sm text-red-600">{errors.amenities.message?.toString()}</p>
      )}

      {/* Custom Amenities */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Özel Olanaklar</h3>
        <p className="text-sm text-slate-600 mb-4">
          Yukarıda listelenmeyen benzersiz olanakları ekleyin (maksimum 10)
        </p>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
            placeholder="örn., Espresso Makinesi, Piyano, vb."
            maxLength={100}
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <button
            type="button"
            onClick={addCustomAmenity}
            disabled={!customAmenity.trim() || customAmenities.length >= 10}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Ekle
          </button>
        </div>

        {customAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customAmenities.map((amenity: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg"
              >
                <span className="text-sm font-medium text-indigo-900">{amenity}</span>
                <button
                  type="button"
                  onClick={() => removeCustomAmenity(amenity)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="hidden"
          {...register('customAmenities')}
          value={customAmenities}
        />
      </div>

      {/* Property Features Toggles */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Gelişmiş Özellikler</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <label htmlFor="hasWifi" className="font-medium text-slate-900">
                  WiFi Mevcut
                </label>
                <p className="text-sm text-slate-600">Yüksek hızlı internet</p>
              </div>
              <input
                type="checkbox"
                id="hasWifi"
                {...register('features.hasWifi')}
                className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {watch('features.hasWifi') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  WiFi Hızı (isteğe bağlı)
                </label>
                <input
                  type="text"
                  {...register('features.wifiSpeed')}
                  placeholder="örn., 100 Mbps"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <label htmlFor="hasParking" className="font-medium text-slate-900">
                  Otopark
                </label>
                <p className="text-sm text-slate-600">Yerinde otopark</p>
              </div>
              <input
                type="checkbox"
                id="hasParking"
                {...register('features.hasParking')}
                className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {watch('features.hasParking') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Otopark Tipi
                </label>
                <select
                  {...register('features.parkingType')}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                >
                  <option value="free">Ücretsiz Otopark</option>
                  <option value="paid">Ücretli Otopark</option>
                  <option value="valet">Vale Hizmeti</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="border-2 border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Güvenlik Özellikleri</h3>
        <p className="text-sm text-slate-600 mb-4">
          Bu özellikler misafirlerin kendilerini güvende hissetmesine yardımcı olur
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasSmokeDetector"
              {...register('safetyFeatures.hasSmokeDector')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="hasSmokeDetector" className="font-medium text-slate-700">
              Duman Dedektörü
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasCO2Detector"
              {...register('safetyFeatures.hasCO2Detector')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="hasCO2Detector" className="font-medium text-slate-700">
              Karbonmonoksit Dedektörü
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasFirstAidKit"
              {...register('safetyFeatures.hasFirstAidKit')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="hasFirstAidKit" className="font-medium text-slate-700">
              İlk Yardım Çantası
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="hasLock"
              {...register('safetyFeatures.hasLock')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="hasLock" className="font-medium text-slate-700">
              Kapı Kilidi
            </label>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2">Olanak İpuçları:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Daha fazla misafir çekmek için mevcut tüm olanakları listeleyin</li>
          <li>• Mülkünüzü farklı kılan benzersiz özellikleri vurgulayın</li>
          <li>• Güvenlik özelliklerinin doğru ve işlevsel olduğundan emin olun</li>
          <li>• Özel olanaklar, özel dokunuşları sergileyebilir</li>
        </ul>
      </div>
    </div>
  );
}
