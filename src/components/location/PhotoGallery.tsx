import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../../lib/types/review-system';

interface PhotoGalleryProps {
  photos: Photo[];
  locationName: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, locationName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No photos available</p>
      </div>
    );
  }

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.slice(0, 6).map((photo, index) => (
          <div
            key={photo.id}
            className="relative h-48 bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(index)}
          >
            <Image
              src={photo.url}
              alt={photo.alt_text?.en || `${locationName} photo ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {index === 5 && photos.length > 6 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  +{photos.length - 6} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-5xl max-h-5xl w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            {photos.length > 1 && (
              <button
                onClick={prevPhoto}
                className="absolute left-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Current Photo */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={photos[currentIndex].url}
                alt={photos[currentIndex].alt_text?.en || `${locationName} photo ${currentIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Next Button */}
            {photos.length > 1 && (
              <button
                onClick={nextPhoto}
                className="absolute right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;