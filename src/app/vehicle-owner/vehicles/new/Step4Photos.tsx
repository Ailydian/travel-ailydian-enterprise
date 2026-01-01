'use client';

import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Upload,
  X,
  Star,
  Image as ImageIcon,
  AlertCircle,
  Check,
  Loader2,
  GripVertical,
  Camera,
  RotateCw,
  Crop,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../../../context/ToastContext';

interface Step4Props {
  data?: any;
  allData?: any;
}

interface PhotoPreview {
  id: string;
  url: string;
  file?: File;
  category: string;
  caption?: string;
  order: number;
  isUploaded: boolean;
  uploadProgress?: number;
  error?: string;
}

const photoCategories = [
  { value: 'exterior-front', label: 'Dış Görünüm - Ön' },
  { value: 'exterior-rear', label: 'Dış Görünüm - Arka' },
  { value: 'exterior-left', label: 'Dış Görünüm - Sol' },
  { value: 'exterior-right', label: 'Dış Görünüm - Sağ' },
  { value: 'interior-front', label: 'İç Mekan - Ön' },
  { value: 'interior-rear', label: 'İç Mekan - Arka' },
  { value: 'interior-dashboard', label: 'İç Mekan - Gösterge Paneli' },
  { value: 'trunk', label: 'Bagaj' },
  { value: 'engine', label: 'Motor' },
  { value: 'wheels', label: 'Jantlar' },
  { value: 'damage', label: 'Hasar (varsa)' },
  { value: 'other', label: 'Diğer' },
];

export default function Step4Photos({ data }: Step4Props) {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [photos, setPhotos] = useState<PhotoPreview[]>(watch('photos') || []);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const coverPhotoIndex = watch('coverPhotoIndex') || 0;

  // Handle file selection
  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      // Check max photos limit
      if (photos.length + files.length > 20) {
        showToast({ type: 'info', title: 'Maksimum 20 fotoğraf yükleyebilirsiniz' });
        return;
      }

      const fileArray = Array.from(files);
      const newPhotos: PhotoPreview[] = [];

      for (const file of fileArray) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          showInfo('${file.name} bir resim dosyası değil');
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          showInfo('${file.name} 10MB boyut sınırını aşıyor');
          continue;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const photo: PhotoPreview = {
            id: `photo-${Date.now()}-${Math.random()}`,
            url: e.target?.result as string,
            file,
            category: 'other',
            order: photos.length + newPhotos.length,
            isUploaded: false,
            uploadProgress: 0,
          };

          newPhotos.push(photo);

          // Update state after all files are processed
          if (newPhotos.length === fileArray.length) {
            const updatedPhotos = [...photos, ...newPhotos];
            setPhotos(updatedPhotos);
            setValue('photos', updatedPhotos, { shouldValidate: true });
          }
        };

        reader.readAsDataURL(file);
      }
    },
    [photos, setValue]
  );

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Remove photo
  const removePhoto = (id: string) => {
    const updatedPhotos = photos.filter((p) => p.id !== id);
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });

    // Update cover photo index if needed
    if (coverPhotoIndex >= updatedPhotos.length) {
      setValue('coverPhotoIndex', Math.max(0, updatedPhotos.length - 1));
    }
  };

  // Set cover photo
  const setCoverPhoto = (index: number) => {
    setValue('coverPhotoIndex', index, { shouldValidate: true });
  };

  // Update category
  const updateCategory = (id: string, category: string) => {
    const updatedPhotos = photos.map((p) =>
      p.id === id ? { ...p, category } : p
    );
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });
  };

  // Update caption
  const updateCaption = (id: string, caption: string) => {
    const updatedPhotos = photos.map((p) =>
      p.id === id ? { ...p, caption } : p
    );
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });
  };

  // Reorder photos (drag and drop)
  const handlePhotoReorder = (dragIndex: number, dropIndex: number) => {
    const reordered = [...photos];
    const [removed] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, removed);

    // Update order
    const updatedPhotos = reordered.map((p, idx) => ({ ...p, order: idx }));
    setPhotos(updatedPhotos);
    setValue('photos', updatedPhotos, { shouldValidate: true });

    // Update cover photo index if needed
    if (coverPhotoIndex === dragIndex) {
      setValue('coverPhotoIndex', dropIndex);
    }
  };

  // Check required categories
  const hasRequiredPhotos = () => {
    const categories = photos.map((p) => p.category);
    return (
      categories.includes('exterior-front') &&
      categories.includes('exterior-rear') &&
      categories.includes('exterior-left') &&
      categories.includes('exterior-right')
    );
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 transition-all ${
          isDragging
            ? 'border-green-500 bg-lydian-success-lighter'
            : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-lydian-success-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-lydian-success" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Araç Fotoğraflarını Yükle
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Resimleri buraya sürükleyip bırakın veya göz atmak için tıklayın
          </p>
          <label className="inline-block px-6 py-3 bg-lydian-success text-lydian-text-inverse rounded-lg font-medium hover:bg-lydian-success-hover cursor-pointer transition-all">
            Dosya Seç
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </label>
          <p className="text-xs text-slate-500 mt-4">
            Maksimum 20 yüksek kaliteli fotoğraf (JPG, PNG, WebP)
            <br />
            Önerilen çözünürlük: 1920x1080 veya daha yüksek • Dosya başına maksimum 10MB
          </p>
        </div>
      </div>

      {/* Photo Requirements */}
      <div className="p-4 bg-lydian-success-lighter border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-lydian-success mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Fotoğraf Gereksinimleri:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• <strong>Zorunlu:</strong> Dış görünüm (4 açı: ön, arka, sol, sağ)</li>
              <li>• <strong>Önerilen:</strong> İç mekan, gösterge paneli, bagaj, motor, jantlar</li>
              <li>• Hasar varsa mutlaka fotoğraflayın</li>
              <li>• Doğal aydınlatma kullanın ve filtrelerden kaçının</li>
              <li>• Aracı farklı açılardan gösterin</li>
              <li>• İlk fotoğraf kapak fotoğrafınız olacak</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Photos Count and Status */}
      {photos.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-slate-600" />
            <span className="font-medium text-slate-900">
              {photos.length} / 20 fotoğraf yüklendi
            </span>
          </div>
          {hasRequiredPhotos() ? (
            <div className="flex items-center gap-2 text-lydian-success">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Zorunlu fotoğraflar tamam</span>
            </div>
          ) : (
            <span className="text-sm text-amber-600">
              4 açıdan dış görünüm fotoğrafı gerekli
            </span>
          )}
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Yüklenen Fotoğraflar</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <GripVertical className="w-4 h-4" />
              Sıralamak için sürükleyin
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggedIndex !== null && draggedIndex !== index) {
                      handlePhotoReorder(draggedIndex, index);
                      setDraggedIndex(index);
                    }
                  }}
                  className="relative border-2 border-slate-200 rounded-xl overflow-hidden bg-lydian-bg/5 hover:shadow-lg transition-all cursor-move"
                >
                  {/* Cover Photo Badge */}
                  {index === coverPhotoIndex && (
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-lydian-warning-hover text-lydian-text-inverse text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Kapak Fotoğrafı
                    </div>
                  )}

                  {/* Drag Handle */}
                  <div className="absolute top-3 right-3 z-10 p-2 bg-lydian-bg/90 rounded-lg shadow">
                    <GripVertical className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Image */}
                  <div className="aspect-video bg-slate-100 relative">
                    <img
                      src={photo.url}
                      alt={`Vehicle photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Photo Details */}
                  <div className="p-4 space-y-3">
                    {/* Category */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Fotoğraf Kategorisi <span className="text-lydian-secondary">*</span>
                      </label>
                      <select
                        value={photo.category}
                        onChange={(e) => updateCategory(photo.id, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none bg-lydian-bg/5"
                      >
                        {photoCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Caption */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Açıklama (isteğe bağlı)
                      </label>
                      <input
                        type="text"
                        value={photo.caption || ''}
                        onChange={(e) => updateCaption(photo.id, e.target.value)}
                        placeholder="Bu fotoğrafı açıklayın..."
                        maxLength={200}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {index !== coverPhotoIndex && (
                        <button
                          type="button"
                          onClick={() => setCoverPhoto(index)}
                          className="flex-1 px-3 py-2 text-sm bg-lydian-success-lighter text-lydian-success rounded-lg hover:bg-lydian-success-light transition-all font-medium"
                        >
                          Kapak Yap
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="px-3 py-2 text-sm bg-red-50 text-lydian-error rounded-lg hover:bg-red-100 transition-all font-medium flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Kaldır
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Video URL */}
      <div className="border-t-2 border-slate-200 pt-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Video Tanıtım (İsteğe Bağlı)</h3>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Araç Video URL'si
          </label>
          <input
            type="url"
            {...register('videoUrl')}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
          <p className="mt-1 text-xs text-slate-500">
            YouTube veya Vimeo araç tanıtım videosu linki
          </p>
          {errors.videoUrl && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.videoUrl.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Validation Error */}
      {errors.photos && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-lydian-error">{errors.photos.message?.toString()}</p>
        </div>
      )}

      {/* Hidden inputs for form submission */}
      <input type="hidden" {...register('photos')} value={JSON.stringify(photos)} />
      <input type="hidden" {...register('coverPhotoIndex')} value={coverPhotoIndex} />

      {/* Tips */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h4 className="font-semibold text-indigo-900 mb-2">Fotoğrafçılık İpuçları:</h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• En iyi doğal aydınlatma için gün içinde fotoğraf çekin</li>
          <li>• Fotoğraf çekmeden önce aracı temizleyin</li>
          <li>• Aracın tüm özelliklerini ve detaylarını gösterin</li>
          <li>• Hasar veya kusurları gizlemeyin - şeffaf olun</li>
          <li>• Her kategoriden en az bir fotoğraf ekleyin</li>
          <li>• Fotoğrafları yeniden sıralamak için sürükleyin</li>
        </ul>
      </div>
    </div>
  );
}
