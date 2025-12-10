'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoBackgroundProps {
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  changeInterval?: number; // milliseconds (default: 60000 = 1 minute)
}

// Premium travel video URLs - seyahat temalı videolar
const TRAVEL_VIDEOS = [
  {
    id: 1,
    url: 'https://cdn.pixabay.com/video/2022/11/06/137663-768452978_large.mp4', // Beach sunset travel
    title: 'Sahil ve Gün Batımı',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&q=90'
  },
  {
    id: 2,
    url: 'https://cdn.pixabay.com/video/2021/08/10/84861-587827958_large.mp4', // Mountain aerial
    title: 'Dağ Manzarası',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&q=90'
  },
  {
    id: 3,
    url: 'https://cdn.pixabay.com/video/2022/04/23/115416-702589963_large.mp4', // City travel
    title: 'Şehir Gezisi',
    poster: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&q=90'
  },
  {
    id: 4,
    url: 'https://cdn.pixabay.com/video/2019/08/05/25823-353748941_large.mp4', // Ocean waves
    title: 'Okyanus Dalgaları',
    poster: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&q=90'
  },
  {
    id: 5,
    url: 'https://cdn.pixabay.com/video/2020/01/18/30959-386469564_large.mp4', // Forest nature
    title: 'Doğa ve Orman',
    poster: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&q=90'
  },
  {
    id: 6,
    url: 'https://cdn.pixabay.com/video/2023/06/08/166684-834795754_large.mp4', // Tropical paradise
    title: 'Tropik Cennet',
    poster: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&q=90'
  }
];

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  autoPlay = true,
  muted = true,
  loop = true,
  overlay = true,
  overlayOpacity = 0.5,
  changeInterval = 60000 // 1 dakika (60 saniye)
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video değiştirme
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % TRAVEL_VIDEOS.length);
      setIsLoading(true);
    }, changeInterval);

    return () => clearInterval(interval);
  }, [changeInterval]);

  // Video yüklenme
  const handleVideoLoad = () => {
    console.log('Video yüklendi:', currentVideo.title);
    setIsLoading(false);
    setVideoError(false);
  };

  // Video hatası
  const handleVideoError = (e: any) => {
    console.error('Video yükleme hatası:', currentVideo.title, e);
    setVideoError(true);
    setIsLoading(false);
    // Hata durumunda fallback görseli göster (poster image)
  };

  const currentVideo = TRAVEL_VIDEOS[currentVideoIndex];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideo.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Poster image - always show as fallback */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={currentVideo.poster}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Element - overlays poster when loaded */}
          {!videoError && (
            <video
              ref={videoRef}
              src={currentVideo.url}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              style={{
                transform: 'scale(1.02)', // Slight zoom for cinematic effect
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradient */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Loading Indicator - removed to prevent infinite loading display */}

      {/* Video Info Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">{currentVideo.title}</span>
          </div>
        </div>
      </motion.div>

      {/* Video Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: changeInterval / 1000, ease: 'linear' }}
        style={{ transformOrigin: 'left' }}
      >
        <div className="h-full bg-gradient-to-r from-ailydian-primary to-ailydian-secondary" />
      </motion.div>

      {/* Animated Particles for Premium Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -50, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoBackground;
