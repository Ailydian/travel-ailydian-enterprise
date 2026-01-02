import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedOrbitProps {
  size?: number;
  duration?: number;
  children?: React.ReactNode;
  className?: string;
  reverse?: boolean;
}

export const AnimatedOrbit: React.FC<AnimatedOrbitProps> = ({
  size = 200,
  duration = 20,
  children,
  className = '',
  reverse = false
}) => {
  const orbitVariants = {
    animate: {
      rotate: reverse ? -360 : 360,
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const counterRotateVariants = {
    animate: {
      rotate: reverse ? 360 : -360,
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        style={{ width: '100%', height: '100%' }}
        variants={orbitVariants}
        animate="animate"
      >
      {/* Orbit Path */}
      <div 
        className="absolute inset-0 rounded-full border border-blue-500/20 shadow-neon"
        style={{ 
          boxShadow: '0 0 20px rgba(255, 33, 77, 0.2), inset 0 0 20px rgba(255, 33, 77, 0.1)' 
        }}
      />
      
        {/* Orbiting Elements */}
        <motion.div
          style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          variants={counterRotateVariants}
          animate="animate"
        >
          <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full shadow-neon-lg animate-pulse-glow" />
        </motion.div>
        
        <motion.div
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%) translateY(50%)' }}
          variants={counterRotateVariants}
          animate="animate"
        >
          <div className="w-3 h-3 bg-lydian-neon-blue rounded-full shadow-neon-blue animate-pulse-glow" />
        </motion.div>
        
        <motion.div
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          variants={counterRotateVariants}
          animate="animate"
        >
          <div className="w-2 h-2 bg-lydian-neon-purple rounded-full shadow-neon-purple animate-pulse-glow" />
        </motion.div>
        
        <motion.div
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateX(50%) translateY(-50%)' }}
          variants={counterRotateVariants}
          animate="animate"
        >
          <div className="w-3 h-3 bg-purple-600 rounded-full shadow-neon-orange animate-pulse-glow" />
        </motion.div>

        {/* Center Content */}
        {children && (
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            variants={counterRotateVariants}
            animate="animate"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedOrbit;