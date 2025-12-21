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
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'other', label: 'Other' },
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
          alert(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} exceeds 10MB size limit`);
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
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Upload Property Photos
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Drag and drop images here, or click to browse
          </p>
          <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 cursor-pointer transition-all">
            Choose Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </label>
          <p className="text-xs text-slate-500 mt-4">
            Upload at least 5 high-quality photos (JPG, PNG, WebP)
            <br />
            Recommended resolution: 1920x1080 or higher • Max 10MB per file
          </p>
        </div>
      </div>

      {/* Photo Requirements */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Photo Requirements:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Minimum 5 photos required (up to 50 photos allowed)</li>
              <li>• First photo will be your cover photo (you can change this later)</li>
              <li>• Include photos of all rooms and key features</li>
              <li>• Use natural lighting and avoid filters</li>
              <li>• Show the space from multiple angles</li>
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
              {photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded
            </span>
          </div>
          {photos.length >= 5 ? (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Minimum requirement met</span>
            </div>
          ) : (
            <span className="text-sm text-amber-600">
              {5 - photos.length} more photo{5 - photos.length !== 1 ? 's' : ''} needed
            </span>
          )}
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Uploaded Photos</h3>

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
                  className="relative border-2 border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all cursor-move"
                >
                  {/* Cover Photo Badge */}
                  {index === coverPhotoIndex && (
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Cover Photo
                    </div>
                  )}

                  {/* Drag Handle */}
                  <div className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-lg shadow">
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
                        Room Type
                      </label>
                      <select
                        value={photo.room}
                        onChange={(e) => updateRoomType(photo.id, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
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
                        Caption (optional)
                      </label>
                      <input
                        type="text"
                        value={photo.caption || ''}
                        onChange={(e) => updateCaption(photo.id, e.target.value)}
                        placeholder="Describe this photo..."
                        maxLength={200}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {index !== coverPhotoIndex && (
                        <button
                          type="button"
                          onClick={() => setCoverPhoto(index)}
                          className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium"
                        >
                          Set as Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
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
        <h3 className="text-lg font-bold text-slate-900">Additional Media (Optional)</h3>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Property Video URL
          </label>
          <input
            type="url"
            {...register('videoUrl')}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <p className="mt-1 text-xs text-slate-500">
            YouTube or Vimeo video tour link
          </p>
          {errors.videoUrl && (
            <p className="mt-1 text-sm text-red-600">
              {errors.videoUrl.message?.toString()}
            </p>
          )}
        </div>

        {/* Virtual Tour URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Virtual Tour URL
          </label>
          <input
            type="url"
            {...register('virtualTourUrl')}
            placeholder="https://my.matterport.com/..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <p className="mt-1 text-xs text-slate-500">
            Matterport or similar 3D virtual tour link
          </p>
          {errors.virtualTourUrl && (
            <p className="mt-1 text-sm text-red-600">
              {errors.virtualTourUrl.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Validation Error */}
      {errors.photos && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.photos.message?.toString()}</p>
        </div>
      )}

      {/* Hidden inputs for form submission */}
      <input type="hidden" {...register('photos')} value={JSON.stringify(photos)} />
      <input type="hidden" {...register('coverPhotoIndex')} value={coverPhotoIndex} />

      {/* Tips */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h4 className="font-semibold text-indigo-900 mb-2">Photography Tips:</h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Take photos during the day for best natural lighting</li>
          <li>• Clean and declutter spaces before photographing</li>
          <li>• Show the unique features that make your property special</li>
          <li>• Include wide-angle shots to show room sizes</li>
          <li>• Drag photos to reorder them - first photo is your cover image</li>
        </ul>
      </div>
    </div>
  );
}
