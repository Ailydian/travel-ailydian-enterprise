/**
 * 💎 MINIMALIST CARD COMPONENT
 * Option5.studio inspired clean cards
 * Subtle hover effects, typography-focused
 */

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { hoverAnimations } from '@/utils/minimalistAnimations';

export interface MinimalistCardProps {
  image: string;
  title: string;
  description?: string;
  metadata?: string[];
  onClick?: () => void;
  imageRatio?: '1/1' | '3/4' | '4/3' | '16/9';
  className?: string;
}

export const MinimalistCard: React.FC<MinimalistCardProps> = ({
  image,
  title,
  description,
  metadata = [],
  onClick,
  imageRatio = '4/3',
  className = ''
}) => {
  const aspectRatios = {
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video'
  };

  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>

      {/* Image Container */}
      <div className={`relative w-full ${aspectRatios[imageRatio]} overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 mb-4`}>
        <motion.div
          className="w-full h-full"
          {...hoverAnimations.imageHover}>

          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

        </motion.div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-light text-white leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description &&
        <p className="text-base text-gray-400 leading-relaxed line-clamp-2">
            {description}
          </p>
        }

        {/* Metadata */}
        {metadata.length > 0 &&
        <div className="flex flex-wrap gap-2 pt-2">
            {metadata.map((item, index) =>
          <span
            key={index}
            className="text-sm text-gray-300">

                {item}
                {index < metadata.length - 1 && <span className="mx-2">•</span>}
              </span>
          )}
          </div>
        }
      </div>
    </motion.div>);

};