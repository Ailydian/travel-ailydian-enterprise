/**
 * 📜 HORIZONTAL SCROLL SECTION
 * Apple Vision Pro Style - Smooth horizontal scrolling with momentum
 * Features: Snap scroll, gradient fade edges, scroll indicators
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showControls?: boolean;
  itemWidth?: 'sm' | 'md' | 'lg' | 'xl';
  gap?: number;
  className?: string;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({
  title,
  subtitle,
  children,
  showControls = true,
  itemWidth = 'lg',
  gap = 6,
  className = ''
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const widthClasses = {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[28rem]'
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleScroll = () => checkScroll();
    scrollRef.current?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Header */}
      {(title || subtitle) &&
      <div className="mb-8 px-4 sm:px-6 lg:px-8">
          {title &&
        <div className="relative inline-block mb-4">
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00BAFF] via-[#667EEA] to-[#FF9500] rounded-full opacity-70 shadow-[0_0_20px_rgba(102,126,234,0.5)]" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-lydian-text-inverse leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(102,126,234,0.3)]">
                {title}
              </h2>
            </div>
        }
          {subtitle &&
        <p className="text-lg md:text-xl text-lydian-text-dim max-w-3xl font-light">
              {subtitle}
            </p>
        }
        </div>
      }

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Fade Gradient */}
        {canScrollLeft &&
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f1e] to-transparent z-10 pointer-events-none hidden md:block" />
        }

        {/* Right Fade Gradient */}
        {canScrollRight &&
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f1e] to-transparent z-10 pointer-events-none hidden md:block" />
        }

        {/* Left Arrow */}
        {showControls && canScrollLeft &&
        <motion.button
          onClick={() => scroll('left')}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-full flex items-center justify-center shadow-lg hover:bg-lydian-glass-dark-heavy transition-all opacity-0 group-hover:opacity-100">

            <ChevronLeft className="w-6 h-6 text-lydian-text-inverse" />
          </motion.button>
        }

        {/* Right Arrow */}
        {showControls && canScrollRight &&
        <motion.button
          onClick={() => scroll('right')}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-lydian-glass-dark-medium backdrop-blur-xl border border-lydian-border-light rounded-full flex items-center justify-center shadow-lg hover:bg-lydian-glass-dark-heavy transition-all opacity-0 group-hover:opacity-100">

            <ChevronRight className="w-6 h-6 text-lydian-text-inverse" />
          </motion.button>
        }

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className={`
            flex overflow-x-auto overflow-y-hidden
            gap-${gap} px-4 sm:px-6 lg:px-8 pb-6
            scrollbar-hide snap-x snap-mandatory
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          `}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}>

          {React.Children.map(children, (child) =>
          <div className={`${widthClasses[itemWidth]} flex-shrink-0 snap-start`}>
              {child}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator Dots */}
      {showControls &&
      <div className="flex justify-center gap-2 mt-4">
          {canScrollLeft &&
        <div className="w-2 h-2 rounded-full bg-[#667EEA] opacity-70" />
        }
          <div className="w-2 h-2 rounded-full bg-[#667EEA]" />
          {canScrollRight &&
        <div className="w-2 h-2 rounded-full bg-[#667EEA] opacity-70" />
        }
        </div>
      }

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>);

};

export default HorizontalScrollSection;