'use client';

import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  Image as ImageIcon,
  Star,
  Camera,
  Sparkles,
  Car,
  AlertCircle,
} from 'lucide-react';

interface PhotoCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  maxPhotos: number;
}

const photoCategories: PhotoCategory[] = [
  {
    id: 'exterior',
    label: 'Dış Görünüm',
    description: 'Aracın dış kısmından çekilen fotoğraflar',
    icon: Car,
    maxPhotos: 6,
  },
  {
    id: 'interior',
    label: 'İç Görünüm',
    description: 'Aracın iç kısmı, koltuklar, kokpit',
    icon: Camera,
    maxPhotos: 6,
  },
  {
    id: 'vip-features',
    label: 'VIP Özellikler',
    description: 'WiFi, TV, minibar gibi özel özellikler',
    icon: Sparkles,
    maxPhotos: 3,
  },
];

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  category: string;
  isPrimary: boolean;
}

interface Step3Props {
  data?: any;
  allData?: any;
}

export default function Step3Photos({ data }: Step3Props) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('exterior');

  const MAX_TOTAL_PHOTOS = 15;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [photos, selectedCategory]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const categoryPhotos = photos.filter((p) => p.category === selectedCategory);
    const categoryLimit = photoCategories.find((c) => c.id === selectedCategory)?.maxPhotos || 6;

    if (photos.length >= MAX_TOTAL_PHOTOS) {
      alert(`Maksimum ${MAX_TOTAL_PHOTOS} fotoğraf yükleyebilirsiniz.`);
      return;
    }

    if (categoryPhotos.length >= categoryLimit) {
      alert(`Bu kategori için maksimum ${categoryLimit} fotoğraf yükleyebilirsiniz.`);
      return;
    }

    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} geçerli bir resim dosyası değil.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} çok büyük. Maksimum 5MB olmalıdır.`);
        return false;
      }
      return true;
    });

    const remainingSlots = Math.min(
      MAX_TOTAL_PHOTOS - photos.length,
      categoryLimit - categoryPhotos.length
    );

    const filesToAdd = validFiles.slice(0, remainingSlots);

    const newPhotos: UploadedPhoto[] = filesToAdd.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      category: selectedCategory,
      isPrimary: photos.length === 0,
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });
  };

  const removePhoto = (id: string) => {
    const photoToRemove = photos.find((p) => p.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.preview);
    }

    const updatedPhotos = photos.filter((p) => p.id !== id);

    // If removed photo was primary, set first photo as primary
    if (photoToRemove?.isPrimary && updatedPhotos.length > 0) {
      updatedPhotos[0].isPrimary = true;
    }

    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });
  };

  const setPrimaryPhoto = (id: string) => {
    const updatedPhotos = photos.map((p) => ({
      ...p,
      isPrimary: p.id === id,
    }));
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });
  };

  const getCategoryPhotos = (categoryId: string) => {
    return photos.filter((p) => p.category === categoryId);
  };

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Fotoğraf Kategorisi Seçin</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photoCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            const categoryPhotoCount = getCategoryPhotos(category.id).length;

            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
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
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold mb-1 ${
                        isSelected ? 'text-cyan-900' : 'text-slate-900'
                      }`}
                    >
                      {category.label}
                    </h4>
                    <p
                      className={`text-xs mb-2 ${
                        isSelected ? 'text-cyan-700' : 'text-slate-600'
                      }`}
                    >
                      {category.description}
                    </p>
                    <div
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-cyan-700' : 'text-slate-500'
                      }`}
                    >
                      {categoryPhotoCount} / {category.maxPhotos} fotoğraf
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Upload Area */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {photoCategories.find((c) => c.id === selectedCategory)?.label} Fotoğrafları
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Toplam {photos.length} / {MAX_TOTAL_PHOTOS} fotoğraf yüklendi
        </p>

        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-slate-300 bg-slate-50 hover:border-cyan-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={photos.length >= MAX_TOTAL_PHOTOS}
          />

          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full">
                <Upload className="w-8 h-8 text-cyan-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">
                  Fotoğraf Yükle
                </h4>
                <p className="text-sm text-slate-600">
                  Sürükle-bırak veya dosya seçmek için tıklayın
                </p>
              </div>
              <div className="text-xs text-slate-500">
                PNG, JPG, WEBP - Maksimum 5MB - En fazla {MAX_TOTAL_PHOTOS} fotoğraf
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Yüklenen Fotoğraflar ({photos.length})
          </h3>

          {/* Group by category */}
          {photoCategories.map((category) => {
            const categoryPhotos = getCategoryPhotos(category.id);
            if (categoryPhotos.length === 0) return null;

            return (
              <div key={category.id} className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  {React.createElement(category.icon, { className: 'w-4 h-4' })}
                  {category.label} ({categoryPhotos.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {categoryPhotos.map((photo) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative group"
                      >
                        <div
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                            photo.isPrimary
                              ? 'border-amber-500 shadow-lg'
                              : 'border-slate-200'
                          }`}
                        >
                          <img
                            src={photo.preview}
                            alt="Vehicle photo"
                            className="w-full h-full object-cover"
                          />

                          {/* Primary Badge */}
                          {photo.isPrimary && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-lg">
                              <Star className="w-3 h-3 fill-white" />
                              Ana Fotoğraf
                            </div>
                          )}

                          {/* Actions */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {!photo.isPrimary && (
                              <button
                                type="button"
                                onClick={() => setPrimaryPhoto(photo.id)}
                                className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                                title="Ana fotoğraf yap"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.id)}
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                              title="Sil"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Validation Error */}
      {errors.photos && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900 mb-1">Fotoğraf Gerekli</h4>
            <p className="text-sm text-red-700">{errors.photos.message?.toString()}</p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Fotoğraf İpuçları
        </h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              <strong>Dış Görünüm:</strong> Aracın önden, arkadan ve yanlardan net fotoğrafları
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              <strong>İç Görünüm:</strong> Koltuklar, kokpit, bagaj alanı detayları
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>
              <strong>VIP Özellikler:</strong> WiFi, TV, minibar gibi özel donanımların fotoğrafları
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Yüksek çözünürlüklü, iyi aydınlatılmış fotoğraflar kullanın</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Ana fotoğraf, araç listeleme sayfalarında gösterilecektir</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
