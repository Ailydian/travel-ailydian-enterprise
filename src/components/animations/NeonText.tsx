import React from 'react';
import { motion } from 'framer-motion';

interface NeonTextProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'blue' | 'purple' | 'green' | 'yellow';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  animate?: boolean;
  shimmer?: boolean;
  pulse?: boolean;
  className?: string;
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  color = 'primary',
  size = 'md',
  animate = true,
  shimmer = false,
  pulse = false,
  className = ''
}) => {
  const colorClasses = {
    primary: 'text-neon',
    secondary: 'text-neon-orange', 
    blue: 'text-neon-blue',
    purple: 'text-lydian-neon-purple',
    green: 'text-lydian-neon-green',
    yellow: 'text-lydian-neon-yellow'
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg', 
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-4xl',
    '3xl': 'text-6xl',
    '4xl': 'text-8xl'
  };

  const animationClasses = [
    animate && 'animate-neon-pulse',
    shimmer && 'animate-text-shimmer bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text',
    pulse && 'animate-pulse-glow'
  ].filter(Boolean).join(' ');

  const textVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'brightness(0.3)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'brightness(1.2)',
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      filter: 'brightness(1.5)',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <span className={`font-display font-bold tracking-wide ${colorClasses[color]} ${sizeClasses[size]} ${animationClasses} ${className} select-none cursor-default`}>
      <motion.span
        variants={textVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        style={{
          textShadow: shimmer 
            ? `0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor`
            : undefined,
          backgroundSize: shimmer ? '200% 100%' : undefined,
          display: 'inline-block'
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// Yazı makinesi efekti
interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: 'primary' | 'secondary' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  delay = 0,
  color = 'primary',
  size = 'md',
  className = ''
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay]);

  return (
    <div className={`relative ${className}`}>
      <NeonText color={color} size={size} animate={false}>
        {displayedText}
        <span style={{ marginLeft: '0.25rem' }}>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ display: 'inline-block' }}
          >
            |
          </motion.span>
        </span>
      </NeonText>
    </div>
  );
};

// Gradient neon text
export const GradientNeonText: React.FC<NeonTextProps> = ({
  children,
  size = 'md',
  className = ''
}) => {
  return (
    <span className={`font-display font-bold tracking-wide bg-gradient-to-r from-lydian-primary via-lydian-secondary to-lydian-neon-blue bg-clip-text text-transparent ${sizeClasses[size]} ${className} animate-gradient-shift`}>
      <motion.span
        style={{
          backgroundSize: '200% 200%',
          filter: 'drop-shadow(0 0 10px rgba(255, 33, 77, 0.5))',
          display: 'inline-block'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-lg', 
  lg: 'text-xl',
  xl: 'text-2xl',
  '2xl': 'text-4xl',
  '3xl': 'text-6xl',
  '4xl': 'text-8xl'
};

export default NeonText;