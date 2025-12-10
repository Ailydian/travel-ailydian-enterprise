import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ==================== ANIMATED PLANE ====================
export interface AnimatedPlaneProps {
  size?: number;
  color?: string;
  className?: string;
  speed?: number;
}

export const AnimatedPlane: React.FC<AnimatedPlaneProps> = ({
  size = 100,
  color = '#FF214D',
  className = '',
  speed = 3
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          x: [0, 10, 0],
          y: [0, -5, 0],
          rotate: [0, 2, 0]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Plane body */}
        <motion.path
          d="M50 20 L85 50 L50 45 L50 20Z"
          fill={color}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <motion.path
          d="M50 20 L15 50 L50 45 L50 20Z"
          fill={color}
          opacity={0.7}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        {/* Tail */}
        <motion.path
          d="M50 45 L50 70 L40 75 L50 70 L60 75 L50 70Z"
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        {/* Trail effect */}
        <motion.path
          d="M 15 50 Q 10 50, 5 50"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.svg>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-xl"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent 70%)`
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
};

// ==================== ANIMATED GLOBE ====================
export interface AnimatedGlobeProps {
  size?: number;
  className?: string;
  speed?: number;
}

export const AnimatedGlobe: React.FC<AnimatedGlobeProps> = ({
  size = 100,
  className = '',
  speed = 20
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#globeGradient)"
          stroke="#00D4FF"
          strokeWidth="2"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF214D" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B347FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Latitude lines */}
        {[20, 35, 50, 65, 80].map((y, i) => (
          <motion.ellipse
            key={`lat-${i}`}
            cx="50"
            cy={y}
            rx={40 - Math.abs(50 - y) * 0.5}
            ry="3"
            stroke="#00D4FF"
            strokeWidth="0.5"
            fill="none"
            opacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}

        {/* Longitude lines - animated rotation */}
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.g
              key={`long-${i}`}
              animate={{ rotate: 360 }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5
              }}
              style={{ originX: '50px', originY: '50px' }}
            >
              <ellipse
                cx="50"
                cy="50"
                rx="3"
                ry="45"
                stroke="#00D4FF"
                strokeWidth="0.5"
                fill="none"
                opacity={0.3}
                transform={`rotate(${i * 30} 50 50)`}
              />
            </motion.g>
          ))}
        </g>

        {/* Location pins */}
        {[
          { x: 30, y: 35 },
          { x: 65, y: 45 },
          { x: 45, y: 60 },
          { x: 70, y: 30 }
        ].map((pos, i) => (
          <motion.g
            key={`pin-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
          >
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r="2"
              fill="#FF214D"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, #00D4FF20, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
};

// ==================== ANIMATED PRICE CHART ====================
export interface AnimatedPriceChartProps {
  size?: number;
  className?: string;
  data?: number[];
}

export const AnimatedPriceChart: React.FC<AnimatedPriceChartProps> = ({
  size = 100,
  className = '',
  data = [30, 50, 40, 70, 60, 85, 75]
}) => {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 80 + 10,
    y: 90 - (value / maxValue) * 70
  }));

  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} 90 L ${points[0].x} 90 Z`;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={`grid-${i}`}
            x1="10"
            y1={20 + i * 17.5}
            x2="90"
            y2={20 + i * 17.5}
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity={0.1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaD}
          fill="url(#chartGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Line */}
        <motion.path
          d={pathD}
          stroke="#FF214D"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.g key={`point-${i}`}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="2.5"
              fill="#FF214D"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="4"
              stroke="#FF214D"
              strokeWidth="1"
              fill="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          </motion.g>
        ))}

        {/* Trend arrow */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <path
            d="M 75 15 L 85 15 L 85 25"
            stroke="#39FF14"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 85 15 L 80 20 L 85 20 Z"
            fill="#39FF14"
          />
        </motion.g>

        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF214D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF214D" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// ==================== ANIMATED LOADING INDICATORS ====================
export interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = '#FF214D',
  className = ''
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80 40"
          opacity="0.8"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="60 60"
          opacity="0.4"
        />
      </svg>
    </motion.div>
  );
};

export const LoadingPlane: React.FC<LoadingSpinnerProps> = ({
  size = 60,
  color = '#FF214D',
  className = ''
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: size * 3, height: size }}>
      <motion.div
        animate={{
          x: [0, size * 2, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <AnimatedPlane size={size} color={color} speed={1} />
      </motion.div>

      {/* Trail dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: color,
            left: `${20 + i * 15}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  );
};

export const LoadingDots: React.FC<LoadingSpinnerProps> = ({
  size = 8,
  color = '#FF214D',
  className = ''
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color
          }}
          animate={{
            y: [-size, size, -size],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// ==================== SUCCESS/ERROR STATES ====================
export interface StatusIconProps {
  type: 'success' | 'error' | 'warning';
  size?: number;
  className?: string;
  showAnimation?: boolean;
}

export const StatusIcon: React.FC<StatusIconProps> = ({
  type,
  size = 80,
  className = '',
  showAnimation = true
}) => {
  const colors = {
    success: '#39FF14',
    error: '#FF214D',
    warning: '#FFFF33'
  };

  const color = colors[type];

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle background */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {type === 'success' && (
          <motion.path
            d="M 30 50 L 45 65 L 70 35"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        )}

        {type === 'error' && (
          <>
            <motion.line
              x1="35"
              y1="35"
              x2="65"
              y2="65"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
            <motion.line
              x1="65"
              y1="35"
              x2="35"
              y2="65"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
          </>
        )}

        {type === 'warning' && (
          <>
            <motion.path
              d="M 50 30 L 50 55"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
            <motion.circle
              cx="50"
              cy="67"
              r="3"
              fill={color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.6 }}
            />
          </>
        )}
      </svg>

      {/* Glow effect */}
      {showAnimation && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}40, transparent 70%)`,
            filter: 'blur(20px)'
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.9, 1.2, 0.9]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      )}

      {/* Confetti for success */}
      {type === 'success' && showAnimation && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: ['#FF214D', '#00D4FF', '#39FF14', '#FFFF33'][i % 4],
                left: '50%',
                top: '50%'
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 60,
                y: Math.sin((i * Math.PI * 2) / 8) * 60
              }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ==================== TRAVEL-THEMED DECORATIVE ELEMENTS ====================
export interface MapPinAnimatedProps {
  size?: number;
  color?: string;
  className?: string;
}

export const MapPinAnimated: React.FC<MapPinAnimatedProps> = ({
  size = 40,
  color = '#FF214D',
  className = ''
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size * 1.5 }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      <motion.svg
        width={size}
        height={size * 1.5}
        viewBox="0 0 40 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M20 0C12 0 5 7 5 15C5 25 20 45 20 45C20 45 35 25 35 15C35 7 28 0 20 0Z"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
        <circle cx="20" cy="15" r="6" fill="white" />

        {/* Pulse rings */}
        <motion.circle
          cx="20"
          cy="15"
          r="12"
          stroke={color}
          strokeWidth="2"
          fill="none"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

export const CompassAnimated: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = ''
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#00D4FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Direction markers */}
        {['N', 'E', 'S', 'W'].map((dir, i) => {
          const angle = i * 90;
          const x = 50 + 38 * Math.sin((angle * Math.PI) / 180);
          const y = 50 - 38 * Math.cos((angle * Math.PI) / 180);
          return (
            <motion.text
              key={dir}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={dir === 'N' ? '#FF214D' : '#00D4FF'}
              fontSize="12"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {dir}
            </motion.text>
          );
        })}

        {/* Compass needle */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          <path
            d="M 50 20 L 55 50 L 50 55 L 45 50 Z"
            fill="#FF214D"
          />
          <path
            d="M 50 80 L 55 50 L 50 45 L 45 50 Z"
            fill="#00D4FF"
          />
        </motion.g>

        {/* Center dot */}
        <circle cx="50" cy="50" r="3" fill="white" />
      </svg>
    </motion.div>
  );
};

export const SuitcaseAnimated: React.FC<{ size?: number; className?: string }> = ({
  size = 60,
  className = ''
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Suitcase body */}
        <motion.rect
          x="20"
          y="35"
          width="60"
          height="50"
          rx="5"
          fill="#FF214D"
          stroke="#FF6A45"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
          style={{ originY: '85px' }}
        />

        {/* Handle */}
        <motion.path
          d="M 35 35 L 35 25 Q 35 20 40 20 L 60 20 Q 65 20 65 25 L 65 35"
          stroke="#FF6A45"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Stickers/Details */}
        <motion.circle
          cx="35"
          cy="55"
          r="5"
          fill="#00D4FF"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
        />
        <motion.rect
          x="55"
          y="60"
          width="15"
          height="10"
          fill="#39FF14"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
        />

        {/* Wheels */}
        {[28, 72].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="88"
            r="4"
            fill="#1a1a1c"
            stroke="#FF6A45"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              rotate: 360
            }}
            transition={{
              scale: { delay: 0.8 + i * 0.1 },
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' }
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default {
  AnimatedPlane,
  AnimatedGlobe,
  AnimatedPriceChart,
  LoadingSpinner,
  LoadingPlane,
  LoadingDots,
  StatusIcon,
  MapPinAnimated,
  CompassAnimated,
  SuitcaseAnimated
};
