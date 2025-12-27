/**
 * 🃏 NEO-GLASS CARD
 * 3D Card with Neomorphism shadows + Glassmorphism effects
 * Tilt on hover, depth illusion
 */

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { card3D } from '@/utils/animations';

export interface NeoCardProps {
  image?: string;
  title: string;
  description?: string;
  price?: string;
  badge?: string;
  badges?: string[];
  metadata?: Array<{icon?: React.ReactNode;label: string;}>;
  onClick?: () => void;
  variant?: 'neo' | 'glass' | 'gradient' | 'minimal';
  hover3D?: boolean;
  className?: string;
  imageAspectRatio?: 'video' | 'square' | 'portrait';
  children?: React.ReactNode;
}

export const NeoCard: React.FC<NeoCardProps> = ({
  image,
  title,
  description,
  price,
  badge,
  badges = [],
  metadata = [],
  onClick,
  variant = 'glass',
  hover3D = true,
  className = '',
  imageAspectRatio = 'video',
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3D) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Variant styles
  const variants = {
    neo: `
      bg-[#F1F5F9]
      shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]
      hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.8)]
    `,
    glass: `
      bg-white/60 backdrop-blur-2xl
      border border-white/30
      shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
      hover:bg-white/70
    `,
    gradient: `
      bg-gradient-to-br from-white/80 to-white/40
      backdrop-blur-2xl
      border border-white/20
      shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]
      hover:from-white/90 hover:to-white/50
    `,
    minimal: `
      bg-white
      border border-white/10
      shadow-lg
      hover:shadow-2xl
    `
  };

  // Aspect ratios
  const aspectRatios = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]'
  };

  const allBadges = badge ? [badge, ...badges] : badges;

  return (
    <motion.div
      className={`
        group relative overflow-hidden rounded-3xl
        transition-all duration-500 cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={hover3D ? card3D : undefined}
      style={hover3D ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}>

      {/* Image */}
      {image &&
      <div className={`relative ${aspectRatios[imageAspectRatio]} overflow-hidden`}>
          <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700" />


          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          {allBadges.length > 0 &&
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {allBadges.map((badgeText, index) =>
          <motion.span
            key={index}
            className="px-3 py-1 bg-lydian-bg/90 backdrop-blur-md rounded-full text-xs font-semibold text-lydian-text-inverse shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}>

                  {badgeText}
                </motion.span>
          )}
            </div>
        }

          {/* Price badge */}
          {price &&
        <motion.div
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}>

              <div className="px-4 py-2 bg-gradient-to-br from-[#00BAFF] to-[#0088BD] rounded-2xl shadow-xl">
                <p className="text-lydian-text-inverse font-bold text-lg">{price}</p>
              </div>
            </motion.div>
        }

          {/* 3D shine effect on hover */}
          {hover3D && isHovered &&
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            transform: 'translateZ(20px)'
          }} />

        }
        </div>
      }

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <motion.h3
          className="text-xl md:text-2xl font-bold text-lydian-text-inverse leading-tight"
          style={hover3D ? { transform: 'translateZ(30px)' } : undefined}>

          {title}
        </motion.h3>

        {/* Description */}
        {description &&
        <motion.p
          className="text-lydian-text-dim leading-relaxed line-clamp-2"
          style={hover3D ? { transform: 'translateZ(20px)' } : undefined}>

            {description}
          </motion.p>
        }

        {/* Metadata */}
        {metadata.length > 0 &&
        <motion.div
          className="flex flex-wrap gap-3"
          style={hover3D ? { transform: 'translateZ(15px)' } : undefined}>

            {metadata.map((item, index) =>
          <div key={index} className="flex items-center gap-1.5 text-sm text-lydian-text-muted">
                {item.icon && <span className="text-[#00BAFF]">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
          )}
          </motion.div>
        }

        {/* Custom children */}
        {children &&
        <motion.div
          style={hover3D ? { transform: 'translateZ(10px)' } : undefined}>

            {children}
          </motion.div>
        }
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: '0 0 0 2px rgba(0, 186, 255, 0.3), 0 0 30px rgba(0, 186, 255, 0.2)'
        }} />

    </motion.div>);

};

export default NeoCard;