'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCarIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AnimatedCarIcon: React.FC<AnimatedCarIconProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />

      {/* Main Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated Car SVG */}
        <motion.svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Road Animation */}
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: [0, 20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <line x1="0" y1="90" x2="200" y2="90" stroke="#E5E7EB" strokeWidth="1" opacity="0.5" />
            <line x1="0" y1="95" x2="200" y2="95" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="10 5" opacity="0.3" />
          </motion.g>

          {/* Car Body */}
          <motion.g
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Car Shadow */}
            <ellipse cx="100" cy="95" rx="45" ry="8" fill="#000" opacity="0.2" />

            {/* Main Body Gradient */}
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Car Body Path */}
            <path
              d="M 40 70 L 50 50 L 80 45 L 120 45 L 150 50 L 160 70 L 40 70 Z"
              fill="url(#carGradient)"
              stroke="#1E40AF"
              strokeWidth="1.5"
            />

            {/* Car Bottom */}
            <rect x="35" y="65" width="130" height="20" rx="3" fill="url(#carGradient)" stroke="#1E40AF" strokeWidth="1.5" />

            {/* Windows */}
            <path d="M 55 50 L 60 50 L 65 60 L 55 60 Z" fill="url(#windowGradient)" stroke="#1E40AF" strokeWidth="0.5" />
            <path d="M 70 50 L 95 48 L 95 60 L 70 60 Z" fill="url(#windowGradient)" stroke="#1E40AF" strokeWidth="0.5" />
            <path d="M 105 48 L 130 50 L 130 60 L 105 60 Z" fill="url(#windowGradient)" stroke="#1E40AF" strokeWidth="0.5" />
            <path d="M 135 50 L 140 50 L 145 60 L 135 60 Z" fill="url(#windowGradient)" stroke="#1E40AF" strokeWidth="0.5" />

            {/* Headlights */}
            <motion.circle
              cx="155"
              cy="72"
              r="4"
              fill="#FEF3C7"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              cx="155"
              cy="72"
              r="6"
              fill="#FEF3C7"
              opacity="0.3"
              animate={{ r: [6, 8, 6], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Taillights */}
            <circle cx="40" cy="72" r="3" fill="#DC2626" opacity="0.8" />

            {/* Door Handle */}
            <rect x="75" y="68" width="8" height="2" rx="1" fill="#1E40AF" opacity="0.6" />
            <rect x="115" y="68" width="8" height="2" rx="1" fill="#1E40AF" opacity="0.6" />

            {/* Side Mirror */}
            <ellipse cx="50" cy="60" rx="4" ry="3" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.5" />
            <ellipse cx="150" cy="60" rx="4" ry="3" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.5" />

            {/* Wheels with Animation */}
            <g>
              {/* Front Wheel */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ originX: '130px', originY: '85px' }}
              >
                <circle cx="130" cy="85" r="12" fill="#1F2937" stroke="#374151" strokeWidth="2" />
                <circle cx="130" cy="85" r="8" fill="#6B7280" />
                <circle cx="130" cy="85" r="4" fill="#9CA3AF" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="130"
                    y1="85"
                    x2={130 + Math.cos((angle * Math.PI) / 180) * 8}
                    y2={85 + Math.sin((angle * Math.PI) / 180) * 8}
                    stroke="#374151"
                    strokeWidth="1"
                  />
                ))}
              </motion.g>

              {/* Rear Wheel */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ originX: '70px', originY: '85px' }}
              >
                <circle cx="70" cy="85" r="12" fill="#1F2937" stroke="#374151" strokeWidth="2" />
                <circle cx="70" cy="85" r="8" fill="#6B7280" />
                <circle cx="70" cy="85" r="4" fill="#9CA3AF" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="70"
                    y1="85"
                    x2={70 + Math.cos((angle * Math.PI) / 180) * 8}
                    y2={85 + Math.sin((angle * Math.PI) / 180) * 8}
                    stroke="#374151"
                    strokeWidth="1"
                  />
                ))}
              </motion.g>
            </g>

            {/* Premium Shine Effect */}
            <motion.path
              d="M 60 55 Q 100 50 140 55"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* Animated Sparkles */}
          {[
            { cx: 30, cy: 40, delay: 0 },
            { cx: 170, cy: 35, delay: 0.5 },
            { cx: 100, cy: 25, delay: 1 },
          ].map((sparkle, index) => (
            <motion.circle
              key={index}
              cx={sparkle.cx}
              cy={sparkle.cy}
              r="2"
              fill="#FCD34D"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: sparkle.delay
              }}
            />
          ))}
        </motion.svg>

        {/* Travel Ailydian Text */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center">
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-xl">
              Travel Ailydian
            </div>
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-1"
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedCarIcon;
