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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step5Props {
  data?: any;
  allData?: any;
}

interface PhotoPreview {
  id: string;
  url: string;
  file?: File;
  room: string;
  caption?: string;
  order: number;
  isUploaded: boolean;
  uploadProgress?: number;
  error?: string;
}

const roomTypes = [
  { value: 'living-room', label: 'Oturma Odası' },
  { value: 'bedroom', label: 'Yatak Odası' },
  { value: 'bathroom', label: 'Banyo' },
  { value: 'kitchen', label: 'Mutfak' },
  { value: 'exterior', label: 'Dış Mekan' },
  { value: 'other', label: 'Diğer' },
];

export default function Step5Photos({ data }: Step5Props) {
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

      const fileArray = Array.from(files);
      const newPhotos: PhotoPreview[] = [];

      for (const file of fileArray) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} bir resim dosyası değil`);
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} 10MB boyut sınırını aşıyor`);
          continue;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const photo: PhotoPreview = {
            id: `photo-${Date.now()}-${Math.random()}`,
            url: e.target?.result as string,
            file,
            room: 'other',
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

  // Update room type
  const updateRoomType = (id: string, room: string) => {
    const updatedPhotos = photos.map((p) =>
      p.id === id ? { ...p, room } : p
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

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 transition-all ${
          isDragging
            ? 'border-lydian-primary bg-blue-50'
            : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-lydian-primary" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Mülk Fotoğraflarını Yükle
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Resimleri buraya sürükleyip bırakın veya göz atmak için tıklayın
          </p>
          <label className="inline-block px-6 py-3 bg-lydian-primary text-white rounded-lg font-medium hover:bg-lydian-primary-hover cursor-pointer transition-all">
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
            En az 5 yüksek kaliteli fotoğraf yükleyin (JPG, PNG, WebP)
            <br />
            Önerilen çözünürlük: 1920x1080 veya daha yüksek • Dosya başına maksimum 10MB
          </p>
        </div>
      </div>

      {/* Photo Requirements */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-lydian-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Fotoğraf Gereksinimleri:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Minimum 5 fotoğraf gerekli (maksimum 50 fotoğrafa kadar izin verilir)</li>
              <li>• İlk fotoğraf kapak fotoğrafınız olacak (bunu daha sonra değiştirebilirsiniz)</li>
              <li>• Tüm odaların ve önemli özelliklerin fotoğraflarını ekleyin</li>
              <li>• Doğal aydınlatma kullanın ve filtrelerden kaçının</li>
              <li>• Mekanı birden fazla açıdan gösterin</li>
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
              {photos.length} fotoğraf yüklendi
            </span>
          </div>
          {photos.length >= 5 ? (
            <div className="flex items-center gap-2 text-lydian-success">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Minimum gereksinim karşılandı</span>
            </div>
          ) : (
            <span className="text-sm text-amber-600">
              {5 - photos.length} fotoğraf daha gerekli
            </span>
          )}
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Yüklenen Fotoğraflar</h3>

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
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-lydian-warning-hover text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
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
                      alt={`Property photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Photo Details */}
                  <div className="p-4 space-y-3">
                    {/* Room Type */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Oda Tipi
                      </label>
                      <select
                        value={photo.room}
                        onChange={(e) => updateRoomType(photo.id, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none bg-lydian-bg/5"
                      >
                        {roomTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
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
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {index !== coverPhotoIndex && (
                        <button
                          type="button"
                          onClick={() => setCoverPhoto(index)}
                          className="flex-1 px-3 py-2 text-sm bg-blue-50 text-lydian-primary rounded-lg hover:bg-blue-100 transition-all font-medium"
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

      {/* Video and Virtual Tour URLs */}
      <div className="border-t-2 border-slate-200 pt-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Ek Medya (İsteğe Bağlı)</h3>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Mülk Video URL'si
          </label>
          <input
            type="url"
            {...register('videoUrl')}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <p className="mt-1 text-xs text-slate-500">
            YouTube veya Vimeo video tur linki
          </p>
          {errors.videoUrl && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.videoUrl.message?.toString()}
            </p>
          )}
        </div>

        {/* Virtual Tour URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Sanal Tur URL'si
          </label>
          <input
            type="url"
            {...register('virtualTourUrl')}
            placeholder="https://my.matterport.com/..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-lydian-primary focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <p className="mt-1 text-xs text-slate-500">
            Matterport veya benzeri 3D sanal tur linki
          </p>
          {errors.virtualTourUrl && (
            <p className="mt-1 text-sm text-lydian-error">
              {errors.virtualTourUrl.message?.toString()}
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
          <li>• Fotoğraf çekmeden önce mekanları temizleyin ve düzenleyin</li>
          <li>• Mülkünüzü özel kılan benzersiz özellikleri gösterin</li>
          <li>• Oda boyutlarını göstermek için geniş açılı çekimler ekleyin</li>
          <li>• Fotoğrafları yeniden sıralamak için sürükleyin - ilk fotoğraf kapak resminizdir</li>
        </ul>
      </div>
    </div>
  );
}
