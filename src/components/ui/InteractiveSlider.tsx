import React, { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ==================== INTERACTIVE SLIDER ====================
export interface InteractiveSliderProps {
  children: ReactNode;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  slidesToShow?: number;
  gap?: number;
  infinite?: boolean;
  centerMode?: boolean;
}

export const InteractiveSlider: React.FC<InteractiveSliderProps> = ({
  children,
  className = '',
  autoPlay = true,
  autoPlayInterval = 4000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  slidesToShow = 1,
  gap = 20,
  infinite = true,
  centerMode = false
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  // Motion values for smooth dragging
  const x = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });

  // Calculate slide width
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const slideWidth = sliderWidth / slidesToShow;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (infinite) {
          return (prev + 1) % totalSlides;
        }
        return prev < totalSlides - slidesToShow ? prev + 1 : prev;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, isDragging, autoPlayInterval, totalSlides, slidesToShow, infinite]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    const maxIndex = infinite ? totalSlides - 1 : totalSlides - slidesToShow;
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
    x.set(-(newIndex * (slideWidth + gap)));
  }, [totalSlides, slidesToShow, slideWidth, gap, x, infinite]);

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    if (infinite) {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  }, [infinite, totalSlides]);

  const goToNext = useCallback(() => {
    if (infinite) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentIndex((prev) => Math.min(totalSlides - slidesToShow, prev + 1));
    }
  }, [infinite, totalSlides, slidesToShow]);

  // Update position when currentIndex changes
  useEffect(() => {
    x.set(-(currentIndex * (slideWidth + gap)));
  }, [currentIndex, slideWidth, gap, x]);

  // Drag handling
  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Determine if we should change slides
    if (Math.abs(offset) > slideWidth * 0.3 || Math.abs(velocity) > 500) {
      if (offset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      // Snap back to current slide
      x.set(-(currentIndex * (slideWidth + gap)));
    }
  };

  // Show/hide arrows based on infinite mode
  const showPrevArrow = infinite || currentIndex > 0;
  const showNextArrow = infinite || currentIndex < totalSlides - slidesToShow;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Slider container */}
      <div ref={sliderRef} className="overflow-hidden">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{
            x: xSpring,
            gap: `${gap}px`
          }}
          drag="x"
          dragConstraints={{
            left: -(totalSlides - slidesToShow) * (slideWidth + gap),
            right: 0
          }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {childrenArray.map((child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{
                width: centerMode ? `${slideWidth * 0.85}px` : `${slideWidth}px`
              }}
              animate={{
                scale: centerMode && index === currentIndex ? 1 : centerMode ? 0.85 : 1,
                opacity: centerMode && Math.abs(index - currentIndex) > 1 ? 0.5 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          {showPrevArrow && (
            <motion.button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-lydian-bg-card/80 backdrop-blur-md border border-lydian-primary/30 rounded-full p-2 text-lydian-primary hover:bg-lydian-primary/20 transition-all shadow-neon"
              onClick={goToPrevious}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}

          {showNextArrow && (
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-lydian-bg-card/80 backdrop-blur-md border border-lydian-primary/30 rounded-full p-2 text-lydian-primary hover:bg-lydian-primary/20 transition-all shadow-neon"
              onClick={goToNext}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}
        </>
      )}

      {/* Pagination Dots */}
      {showDots && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalSlides - (slidesToShow - 1) }).map((_, index) => (
            <motion.button
              key={index}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-lydian-primary shadow-neon'
                  : 'bg-lydian-text-muted/30 hover:bg-lydian-text-muted/50'
              }`}
              style={{
                width: index === currentIndex ? 32 : 8,
                height: 8
              }}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar (optional) */}
      {autoPlay && !isPaused && !isDragging && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-lydian-primary shadow-neon"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
          key={currentIndex}
        />
      )}
    </div>
  );
};

// ==================== CARD SLIDER (Specialized for Cards) ====================
export interface CardSliderProps {
  cards: Array<{
    id: string | number;
    content: ReactNode;
  }>;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  cardWidth?: number;
  gap?: number;
}

export const CardSlider: React.FC<CardSliderProps> = ({
  cards,
  className = '',
  autoPlay = true,
  autoPlayInterval = 3000,
  cardWidth = 350,
  gap = 20
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const x = useMotionValue(0);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, cards.length]);

  // Update position
  useEffect(() => {
    x.set(-(currentIndex * (cardWidth + gap)));
  }, [currentIndex, cardWidth, gap, x]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex"
        style={{ x, gap: `${gap}px` }}
        drag="x"
        dragConstraints={{
          left: -(cards.length - 1) * (cardWidth + gap),
          right: 0
        }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          const offset = info.offset.x;
          if (Math.abs(offset) > cardWidth * 0.3) {
            if (offset > 0) {
              setCurrentIndex((prev) => Math.max(0, prev - 1));
            } else {
              setCurrentIndex((prev) => Math.min(cards.length - 1, prev + 1));
            }
          }
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            style={{ width: cardWidth }}
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: index === currentIndex ? 1 : 0.9,
              filter: index === currentIndex ? 'brightness(1)' : 'brightness(0.7)'
            }}
            transition={{ duration: 0.3 }}
          >
            {card.content}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// ==================== TESTIMONIAL SLIDER ====================
export interface TestimonialSliderProps {
  testimonials: Array<{
    id: string | number;
    name: string;
    role?: string;
    avatar?: string;
    content: string;
    rating?: number;
  }>;
  className?: string;
  autoPlay?: boolean;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  className = '',
  autoPlay = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-glass-dark rounded-2xl p-8 border border-lydian-primary/20"
        >
          {/* Rating stars */}
          {current.rating && (
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-5 h-5"
                  fill={i < current.rating! ? '#FFFF33' : 'none'}
                  stroke={i < current.rating! ? '#FFFF33' : '#6B7280'}
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </motion.svg>
              ))}
            </div>
          )}

          {/* Content */}
          <p className="text-lydian-text text-lg mb-6 italic">"{current.content}"</p>

          {/* Author */}
          <div className="flex items-center gap-4">
            {current.avatar && (
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-lydian-primary to-lydian-secondary overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img src={current.avatar} alt={current.name} className="w-full h-full object-cover" />
              </motion.div>
            )}
            <div>
              <p className="text-lydian-text font-semibold">{current.name}</p>
              {current.role && <p className="text-lydian-text-muted text-sm">{current.role}</p>}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-lydian-primary w-8'
                : 'bg-lydian-text-muted/30'
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== IMAGE GALLERY SLIDER ====================
export interface ImageGallerySliderProps {
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
  aspectRatio?: string;
}

export const ImageGallerySlider: React.FC<ImageGallerySliderProps> = ({
  images,
  className = '',
  aspectRatio = '16/9'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const newIndex = prev + newDirection;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Image container */}
      <div style={{ aspectRatio }} className="relative bg-lydian-bg-card">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
            />

            {/* Caption */}
            {images[currentIndex].caption && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lydian-bg via-lydian-bg/80 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-lydian-text text-lg font-medium">
                  {images[currentIndex].caption}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-lydian-bg-card/80 backdrop-blur-md border border-lydian-primary/30 rounded-full p-3 text-lydian-primary hover:bg-lydian-primary/20 transition-all shadow-neon"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-lydian-bg-card/80 backdrop-blur-md border border-lydian-primary/30 rounded-full p-3 text-lydian-primary hover:bg-lydian-primary/20 transition-all shadow-neon"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-lydian-bg-card/80 backdrop-blur-md rounded-full px-4 py-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-lydian-primary w-8 shadow-neon'
                : 'bg-lydian-text-muted/30 hover:bg-lydian-text-muted/50'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 bg-lydian-bg-card/80 backdrop-blur-md rounded-full px-4 py-2 text-lydian-text text-sm font-medium border border-lydian-primary/20">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default {
  InteractiveSlider,
  CardSlider,
  TestimonialSlider,
  ImageGallerySlider
};
