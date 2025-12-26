/**
 * 🎴 FUTURISTIC PRODUCT CARD 2025
 * 3D Tilt + Liquid Morphing + Shine Effect + Spatial Depth
 * Awwwards Winner Aesthetics + Apple Vision Pro Principles
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye, Sparkles, Star, MapPin, Clock, Users } from 'lucide-react';

export interface FuturisticCardProps {
  image?: string;
  title: string;
  description?: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badges?: string[];
  metadata?: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
  rating?: number;
  reviews?: number;
  onClick?: () => void;
  onFavorite?: () => void;
  onAddToCart?: () => void;
  isFavorite?: boolean;
  category?: string;
  categoryColor?: string;
  children?: React.ReactNode;
}

export const FuturisticCard: React.FC<FuturisticCardProps> = ({
  image,
  title,
  description,
  price,
  oldPrice,
  badge,
  badges = [],
  metadata = [],
  rating,
  reviews,
  onClick,
  onFavorite,
  onAddToCart,
  isFavorite = false,
  category,
  categoryColor = '#667EEA',
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  // Shine effect position
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
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
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      {/* Main Card Container - Glassmorphism */}
      <div className="relative bg-white/60 backdrop-blur-3xl rounded-3xl overflow-hidden border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">

        {/* Animated Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          }}
        />

        {/* Liquid Morphing Gradient Background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
          animate={isHovered ? {
            background: [
              `conic-gradient(from 0deg at 50% 50%, ${categoryColor}20, transparent, ${categoryColor}20)`,
              `conic-gradient(from 180deg at 50% 50%, ${categoryColor}30, transparent, ${categoryColor}30)`,
              `conic-gradient(from 360deg at 50% 50%, ${categoryColor}20, transparent, ${categoryColor}20)`,
            ],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Badge - Top Left */}
        {badge && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-4 left-4 z-30 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg"
          >
            <span className="text-white font-bold text-sm flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Category Badge - Top Right */}
        {category && (
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-xl backdrop-blur-xl border border-white/40"
            style={{ backgroundColor: `${categoryColor}30` }}
          >
            <span className="text-xs font-semibold" style={{ color: categoryColor }}>
              {category}
            </span>
          </motion.div>
        )}

        {/* Image Container with Depth */}
        {image && (
          <div className="relative h-64 overflow-hidden">
            <motion.div
              style={{
                transform: 'translateZ(40px)',
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6" style={{ transform: 'translateZ(20px)' }}>
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata Grid */}
          {metadata.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metadata.slice(0, 4).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div className="text-purple-500">{item.icon}</div>
                  <span className="truncate">{item.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
              {reviews && (
                <span className="text-sm text-gray-500">({reviews})</span>
              )}
            </div>
          )}

          {/* Additional Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badgeText, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200"
                >
                  {badgeText}
                </span>
              ))}
            </div>
          )}

          {/* Children (custom content) */}
          {children}

          {/* Price Section with Dynamic Glow */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
            <div className="relative">
              {oldPrice && (
                <span className="text-sm text-gray-400 line-through block mb-1">
                  {oldPrice}
                </span>
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block"
              >
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                  {price}
                </span>
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-orange-400/30 blur-xl -z-10"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons - Spatial Ornaments */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-30">
          {/* Favorite */}
          {onFavorite && (
            <FloatingActionButton
              icon={Heart}
              onClick={onFavorite}
              active={isFavorite}
              color="#EC4899"
              tooltip="Favorilere Ekle"
            />
          )}

          {/* Add to Cart */}
          {onAddToCart && (
            <FloatingActionButton
              icon={ShoppingCart}
              onClick={onAddToCart}
              color="#00BAFF"
              tooltip="Sepete Ekle"
            />
          )}

          {/* View Details */}
          <FloatingActionButton
            icon={Eye}
            onClick={onClick}
            color="#667EEA"
            tooltip="Detayları Gör"
          />
        </div>

        {/* 3D Depth Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${categoryColor}40, inset 0 0 40px ${categoryColor}20`,
          }}
        />
      </div>

      {/* Shadow Layer for 3D Depth */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${categoryColor}60, transparent)`,
          transform: 'translateZ(-20px) scale(0.95)',
        }}
      />
    </motion.div>
  );
};

// 🎯 Floating Action Button Component
interface FloatingActionButtonProps {
  icon: any;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  color: string;
  tooltip?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  active = false,
  color,
  tooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className={`
          w-12 h-12 rounded-2xl backdrop-blur-xl border-2 flex items-center justify-center shadow-lg
          transition-all duration-300
          ${active
            ? 'bg-gradient-to-br border-white/40'
            : 'bg-white/20 border-white/40 hover:bg-white/30'
          }
        `}
        style={{
          backgroundColor: active ? `${color}40` : undefined,
        }}
      >
        <Icon
          className={`w-5 h-5 ${active ? 'fill-current' : ''}`}
          style={{ color: active ? color : '#fff' }}
        />

        {/* Pulsing Ring Effect */}
        {active && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-2xl border-2"
            style={{ borderColor: color }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      {showTooltip && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 right-0 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-xl"
        >
          {tooltip}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </motion.div>
      )}
    </div>
  );
};

// Default export
export default FuturisticCard;
