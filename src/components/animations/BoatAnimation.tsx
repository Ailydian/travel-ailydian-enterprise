import React from 'react';

interface BoatAnimationProps {
  className?: string;
}

export const BoatAnimation: React.FC<BoatAnimationProps> = ({ className = '' }) => {
  return (
    <div className={`fixed top-0 right-0 w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}>
      {/* Tekne Container */}
      <div className="boat-container">
        <svg 
          viewBox="0 0 280 200" 
          className="w-40 h-32 lg:w-48 lg:h-36"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(14, 165, 233, 0.3))'
          }}
        >
          {/* Deniz Dalgaları */}
          <defs>
            <linearGradient id="boatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--lydian-text-inverse)" />
              <stop offset="50%" stopColor="#E0F7FA" />
              <stop offset="100%" stopColor="#B3E5FC" />
            </linearGradient>
            
            <linearGradient id="sailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--lydian-text-inverse)" />
              <stop offset="100%" stopColor="#F0F8FF" />
            </linearGradient>
            
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(14, 165, 233, 0.3)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.5)" />
            </linearGradient>
          </defs>
          
          {/* Deniz Base */}
          <ellipse 
            cx="140" 
            cy="170" 
            rx="120" 
            ry="20" 
            fill="url(#seaGradient)"
            className="sea-base"
          />
          
          {/* Deniz Dalgaları */}
          <g className="sea-waves">
            <path 
              d="M20 160 Q60 150 100 160 T180 160 T260 160" 
              stroke="rgba(14, 165, 233, 0.4)" 
              strokeWidth="2" 
              fill="none"
              className="wave-1"
            />
            <path 
              d="M10 170 Q50 165 90 170 T170 170 T270 170" 
              stroke="rgba(6, 182, 212, 0.3)" 
              strokeWidth="1.5" 
              fill="none"
              className="wave-2"
            />
            <path 
              d="M30 175 Q70 172 110 175 T190 175 T250 175" 
              stroke="rgba(14, 165, 233, 0.2)" 
              strokeWidth="1" 
              fill="none"
              className="wave-3"
            />
          </g>
          
          {/* Ana Tekne Gövdesi */}
          <path 
            d="M80 140 Q140 135 200 140 L190 160 Q140 165 90 160 Z" 
            fill="url(#boatGradient)"
            stroke="#2E3A59"
            strokeWidth="2"
            className="boat-hull"
          />
          
          {/* Tekne Alt Çizgisi */}
          <path 
            d="M85 160 Q140 163 185 160" 
            stroke="#1A365D"
            strokeWidth="3"
            strokeLinecap="round"
            className="boat-bottom"
          />
          
          {/* Ana Direk */}
          <line 
            x1="140" 
            y1="70" 
            x2="140" 
            y2="140" 
            stroke="#810513" 
            strokeWidth="4"
            className="main-mast"
          />
          
          {/* Ana Yelken */}
          <path 
            d="M90 75 Q140 70 140 120 L90 125 Z" 
            fill="url(#sailGradient)"
            stroke="#E2E8F0"
            strokeWidth="1"
            className="main-sail"
          />
          
          {/* Ön Yelken */}
          <path 
            d="M140 80 L180 85 L180 115 L140 110 Z" 
            fill="url(#sailGradient)"
            stroke="#E2E8F0"
            strokeWidth="1"
            className="front-sail"
            opacity="0.9"
          />
          
          {/* Yelken Çizgileri */}
          <g className="sail-lines" opacity="0.3">
            <line x1="95" y1="85" x2="135" y2="83" stroke="#94A3B8" strokeWidth="0.5" />
            <line x1="95" y1="95" x2="135" y2="93" stroke="#94A3B8" strokeWidth="0.5" />
            <line x1="95" y1="105" x2="135" y2="103" stroke="#94A3B8" strokeWidth="0.5" />
            <line x1="95" y1="115" x2="135" y2="113" stroke="#94A3B8" strokeWidth="0.5" />
            
            <line x1="145" y1="90" x2="175" y2="92" stroke="#94A3B8" strokeWidth="0.5" />
            <line x1="145" y1="100" x2="175" y2="102" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
          
          {/* Tekne Detayları */}
          <g className="boat-details">
            {/* Tekne Penceresi */}
            <ellipse cx="120" cy="145" rx="8" ry="4" fill="#87CEEB" stroke="#2E3A59" strokeWidth="1" />
            <ellipse cx="160" cy="145" rx="8" ry="4" fill="#87CEEB" stroke="#2E3A59" strokeWidth="1" />
            
            {/* Güverte */}
            <ellipse cx="140" cy="140" rx="35" ry="8" fill="#D4A574" opacity="0.7" />
            
            {/* Bayrak */}
            <path d="M140 70 L160 75 L160 85 L145 82 Z" fill="#FF6B6B" className="flag" />
          </g>
          
          {/* Su Sıçramaları */}
          <g className="water-splashes">
            <circle cx="75" cy="165" r="2" fill="rgba(14, 165, 233, 0.6)" className="splash-1" />
            <circle cx="200" cy="168" r="1.5" fill="rgba(6, 182, 212, 0.5)" className="splash-2" />
            <circle cx="60" cy="172" r="1" fill="rgba(14, 165, 233, 0.4)" className="splash-3" />
            <circle cx="220" cy="175" r="1.5" fill="rgba(6, 182, 212, 0.4)" className="splash-4" />
          </g>
          
          {/* Martılar */}
          <g className="seagulls" opacity="0.7">
            <path d="M50 60 Q55 58 60 60 Q55 62 50 60" fill="none" stroke="#64748B" strokeWidth="1" className="seagull-1" />
            <path d="M220 45 Q225 43 230 45 Q225 47 220 45" fill="none" stroke="#64748B" strokeWidth="1" className="seagull-2" />
            <path d="M190 55 Q195 53 200 55 Q195 57 190 55" fill="none" stroke="#64748B" strokeWidth="1" className="seagull-3" />
          </g>
          
        </svg>
      </div>
    </div>
  );
};

export default BoatAnimation;