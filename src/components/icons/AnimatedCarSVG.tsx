import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCarSVGProps {
  className?: string;
  gradient?: boolean;
}

export const AnimatedCarSVG: React.FC<AnimatedCarSVGProps> = ({
  className = "w-full h-full",
  gradient = true
}) => {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradient && (
        <defs>
          <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--lydian-primary)" />
            <stop offset="50%" stopColor="var(--lydian-secondary)" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>

          <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>

          <radialGradient id="windowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--lydian-info)" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      )}

      {/* Car Body */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Main body */}
        <path
          d="M 50 70 L 65 50 L 95 45 L 135 45 L 150 70 Z"
          fill={gradient ? "url(#carGradient)" : "var(--lydian-primary)"}
          stroke="var(--lydian-primary-active)"
          strokeWidth="2"
        />

        {/* Bottom chassis */}
        <rect
          x="45"
          y="70"
          width="110"
          height="15"
          rx="3"
          fill={gradient ? "url(#carGradient)" : "var(--lydian-primary)"}
          stroke="var(--lydian-primary-active)"
          strokeWidth="2"
        />

        {/* Front window */}
        <motion.path
          d="M 70 52 L 80 52 L 85 65 L 70 65 Z"
          fill={gradient ? "url(#windowGradient)" : "var(--lydian-info)"}
          opacity="0.7"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Back window */}
        <motion.path
          d="M 110 52 L 130 52 L 135 65 L 115 65 Z"
          fill={gradient ? "url(#windowGradient)" : "var(--lydian-info)"}
          opacity="0.7"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Headlight */}
        <motion.circle
          cx="150"
          cy="72"
          r="4"
          fill="#fbbf24"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Door handle */}
        <rect
          x="95"
          y="62"
          width="8"
          height="2"
          rx="1"
          fill="var(--lydian-primary-active)"
        />
      </motion.g>

      {/* Wheels */}
      <g>
        {/* Front wheel */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ originX: "125px", originY: "85px" }}
        >
          <circle
            cx="125"
            cy="85"
            r="12"
            fill={gradient ? "url(#wheelGradient)" : "#1f2937"}
            stroke="#000"
            strokeWidth="2"
          />
          <circle
            cx="125"
            cy="85"
            r="6"
            fill="#4b5563"
            stroke="var(--lydian-text-tertiary)"
            strokeWidth="1"
          />
          <line x1="125" y1="79" x2="125" y2="91" stroke="var(--lydian-text-muted)" strokeWidth="2" />
          <line x1="119" y1="85" x2="131" y2="85" stroke="var(--lydian-text-muted)" strokeWidth="2" />
        </motion.g>

        {/* Back wheel */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ originX: "70px", originY: "85px" }}
        >
          <circle
            cx="70"
            cy="85"
            r="12"
            fill={gradient ? "url(#wheelGradient)" : "#1f2937"}
            stroke="#000"
            strokeWidth="2"
          />
          <circle
            cx="70"
            cy="85"
            r="6"
            fill="#4b5563"
            stroke="var(--lydian-text-tertiary)"
            strokeWidth="1"
          />
          <line x1="70" y1="79" x2="70" y2="91" stroke="var(--lydian-text-muted)" strokeWidth="2" />
          <line x1="64" y1="85" x2="76" y2="85" stroke="var(--lydian-text-muted)" strokeWidth="2" />
        </motion.g>
      </g>

      {/* Motion lines (speed effect) */}
      <motion.g
        animate={{ x: [0, 30], opacity: [0.5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
      >
        <line x1="20" y1="60" x2="35" y2="60" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="70" x2="30" y2="70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="80" x2="40" y2="80" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
};

export default AnimatedCarSVG;
