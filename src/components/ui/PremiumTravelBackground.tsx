'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Animated SVG Travel Background
 * Telifsiz, özel tasarlanmış hareketli arka plan
 */

interface PremiumTravelBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const PremiumTravelBackground: React.FC<PremiumTravelBackgroundProps> = ({
  className = '',
  intensity = 'medium',
}) => {
  const speeds = {
    low: { plane: 30, cloud: 40, wave: 20 },
    medium: { plane: 20, cloud: 30, wave: 15 },
    high: { plane: 15, cloud: 20, wave: 10 },
  };

  const speed = speeds[intensity];

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

      {/* Animated SVG Layers */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FECACA" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--lydian-info)" />
            <stop offset="100%" stopColor="var(--lydian-accent-purple)" />
          </linearGradient>

          <radialGradient id="sunGradient">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="var(--lydian-warning)" stopOpacity="0.6" />
          </radialGradient>

          {/* Filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated Sun */}
        <motion.circle
          cx="1600"
          cy="200"
          r="80"
          fill="url(#sunGradient)"
          filter="url(#glow)"
          animate={{
            r: [80, 90, 80],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated Clouds */}
        <g id="clouds">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.g
              key={`cloud-${i}`}
              initial={{ x: -200 }}
              animate={{
                x: [
                  -200,
                  2120,
                ],
              }}
              transition={{
                duration: speed.cloud + i * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 8,
              }}
            >
              <ellipse
                cx={200 + i * 400}
                cy={150 + i * 80}
                rx="100"
                ry="40"
                fill="white"
                opacity="0.6"
              />
              <ellipse
                cx={250 + i * 400}
                cy={140 + i * 80}
                rx="120"
                ry="50"
                fill="white"
                opacity="0.7"
              />
              <ellipse
                cx={300 + i * 400}
                cy={150 + i * 80}
                rx="90"
                ry="35"
                fill="white"
                opacity="0.6"
              />
            </motion.g>
          ))}
        </g>

        {/* Flying Planes with Trails */}
        {[0, 1].map((i) => (
          <motion.g
            key={`plane-${i}`}
            initial={{ x: -150, y: 300 + i * 200 }}
            animate={{
              x: [-150, 2070],
              y: [
                300 + i * 200,
                280 + i * 200,
                300 + i * 200,
                320 + i * 200,
                300 + i * 200,
              ],
            }}
            transition={{
              duration: speed.plane,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 10,
            }}
          >
            {/* Vapor Trail */}
            <motion.path
              d="M -100,0 Q -60,-2 -20,-1 Q 0,0 0,0"
              stroke="white"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Plane Body */}
            <path
              d="M 0,0 L 40,-3 L 45,0 L 40,3 Z"
              fill="url(#planeGradient)"
              filter="url(#glow)"
            />
            {/* Wings */}
            <path
              d="M 15,-8 L 25,-12 L 30,-3 L 20,-2 Z"
              fill="url(#planeGradient)"
              opacity="0.9"
            />
            <path
              d="M 15,8 L 25,12 L 30,3 L 20,2 Z"
              fill="url(#planeGradient)"
              opacity="0.9"
            />
            {/* Tail */}
            <path d="M 0,-5 L 5,-8 L 5,0 Z" fill="url(#planeGradient)" opacity="0.8" />

            {/* Window */}
            <circle cx="25" cy="0" r="2" fill="white" opacity="0.8" />
          </motion.g>
        ))}

        {/* Animated Mountains */}
        <motion.g
          animate={{
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M 0,800 L 400,600 L 600,700 L 800,550 L 1000,650 L 1200,500 L 1400,600 L 1600,450 L 1920,600 L 1920,1080 L 0,1080 Z"
            fill="#7C3AED"
            opacity="0.1"
          />
          <path
            d="M 0,850 L 300,700 L 500,750 L 700,650 L 900,700 L 1100,600 L 1300,680 L 1500,550 L 1700,650 L 1920,700 L 1920,1080 L 0,1080 Z"
            fill="var(--lydian-accent-purple)"
            opacity="0.15"
          />
        </motion.g>

        {/* Ocean Waves */}
        <g id="waves">
          {[0, 1, 2].map((i) => (
            <motion.path
              key={`wave-${i}`}
              d={`M -500,${900 + i * 30} Q 0,${880 + i * 30} 500,${900 + i * 30} T 1500,${900 + i * 30} T 2500,${900 + i * 30} L 2500,1080 L -500,1080 Z`}
              fill={i === 0 ? 'var(--lydian-info)' : i === 1 ? '#60A5FA' : '#93C5FD'}
              opacity={0.15 - i * 0.03}
              animate={{
                d: [
                  `M -500,${900 + i * 30} Q 0,${880 + i * 30} 500,${900 + i * 30} T 1500,${900 + i * 30} T 2500,${900 + i * 30} L 2500,1080 L -500,1080 Z`,
                  `M -500,${900 + i * 30} Q 0,${920 + i * 30} 500,${900 + i * 30} T 1500,${900 + i * 30} T 2500,${900 + i * 30} L 2500,1080 L -500,1080 Z`,
                  `M -500,${900 + i * 30} Q 0,${880 + i * 30} 500,${900 + i * 30} T 1500,${900 + i * 30} T 2500,${900 + i * 30} L 2500,1080 L -500,1080 Z`,
                ],
              }}
              transition={{
                duration: speed.wave + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </g>

        {/* Floating Travel Icons */}
        {[
          { x: 300, y: 400, icon: '✈️', delay: 0 },
          { x: 800, y: 500, icon: '🏖️', delay: 2 },
          { x: 1300, y: 350, icon: '🗺️', delay: 4 },
          { x: 500, y: 600, icon: '🧳', delay: 1 },
          { x: 1100, y: 450, icon: '🏔️', delay: 3 },
        ].map((item, i) => (
          <motion.text
            key={`icon-${i}`}
            x={item.x}
            y={item.y}
            fontSize="40"
            opacity="0.2"
            animate={{
              y: [item.y, item.y - 20, item.y],
              opacity: [0.2, 0.4, 0.2],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.text>
        ))}

        {/* Sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.circle
            key={`sparkle-${i}`}
            cx={Math.random() * 1920}
            cy={Math.random() * 800}
            r="2"
            fill="white"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40" />
    </div>
  );
};

export default PremiumTravelBackground;
