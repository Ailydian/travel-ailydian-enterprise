import React from 'react';

interface PremiumLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export const PremiumLogo: React.FC<PremiumLogoProps> = ({ 
  size = 'medium', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-3xl'
  };

  // Premium Travel Globe Icon with Modern Design
  const PremiumIcon = () => (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer glow ring - subtle */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'conic-gradient(from 0deg, var(--ac-1), var(--ac-2), var(--ac-1))',
        filter: 'blur(4px)',
        opacity: 0.2
      }}></div>
      
      {/* Main globe container */}
      <div className="relative w-full h-full rounded-full overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--ac-1) 0%, var(--ac-2) 50%, var(--ac-1) 100%)',
        boxShadow: '0 4px 16px rgba(14, 165, 233, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
      }}>
        
        {/* Globe grid pattern */}
        <svg viewBox="0 0 40 40" className="w-full h-full absolute inset-0">
          {/* Meridian lines */}
          <path d="M20 2 Q20 20 20 38" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none"/>
          <path d="M8 20 Q20 12 32 20 Q20 28 8 20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none"/>
          <path d="M8 20 Q20 28 32 20 Q20 12 8 20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none"/>
          
          {/* Latitude lines */}
          <ellipse cx="20" cy="20" rx="18" ry="6" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
          <ellipse cx="20" cy="20" rx="16" ry="10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
          <ellipse cx="20" cy="20" rx="12" ry="14" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
          
          {/* Continents simplified */}
          <path d="M12 15 Q16 12 20 15 Q24 12 28 16 L28 24 Q24 28 20 25 Q16 28 12 24 Z" 
                fill="rgba(255,255,255,0.2)" opacity="0.6"/>
          <circle cx="26" cy="30" r="2" fill="rgba(255,255,255,0.3)"/>
          <circle cx="14" cy="10" r="1.5" fill="rgba(255,255,255,0.3)"/>
        </svg>
        
        {/* Central travel icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 text-white" fill="currentColor">
            {/* Airplane icon */}
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" 
                  opacity="0.9"/>
          </svg>
        </div>
        
        {/* Animated orbiting elements */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping" 
               style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-6 right-3 w-1 h-1 bg-white rounded-full animate-ping" 
               style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-3 left-6 w-1 h-1 bg-white rounded-full animate-ping" 
               style={{animationDelay: '2s', animationDuration: '3s'}}></div>
        </div>
      </div>
    </div>
  );

  // Premium Clean Text
  const PremiumText = () => (
    <div className={`font-bold ${textSizeClasses[size]} ${className}`} style={{ color: '#1e293b' }}>
      <span className="relative">
        Travel.
        <span style={{ color: 'var(--ac-1)', fontWeight: '700' }}>Ailydian</span>
      </span>
    </div>
  );

  if (variant === 'icon') return <PremiumIcon />;
  if (variant === 'text') return <PremiumText />;
  
  return (
    <div className={`flex items-center space-x-2 lg:space-x-3 ${className}`}>
      <PremiumIcon />
      <PremiumText />
    </div>
  );
};

export default PremiumLogo;