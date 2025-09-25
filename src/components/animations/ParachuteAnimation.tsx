import React from 'react';

interface ParachuteAnimationProps {
  className?: string;
}

export const ParachuteAnimation: React.FC<ParachuteAnimationProps> = ({ className = '' }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}>
      {/* Paraşüt Container */}
      <div className="parachute-container">
        <svg 
          viewBox="0 0 200 250" 
          className="w-32 h-40 lg:w-40 lg:h-50"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(14, 165, 233, 0.3))'
          }}
        >
          {/* Paraşüt Kubbesi */}
          <defs>
            <radialGradient id="parachuteGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="25%" stopColor="#4ECDC4" />
              <stop offset="50%" stopColor="#45B7D1" />
              <stop offset="75%" stopColor="#96CEB4" />
              <stop offset="100%" stopColor="#FFEAA7" />
            </radialGradient>
            
            <radialGradient id="parachuteHighlight" cx="50%" cy="20%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          
          {/* Ana Paraşüt Kubbesi */}
          <path 
            d="M100 20 Q40 20 20 80 Q30 100 50 110 Q75 120 100 115 Q125 120 150 110 Q170 100 180 80 Q160 20 100 20 Z" 
            fill="url(#parachuteGradient)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            className="parachute-canopy"
          />
          
          {/* Highlight effect */}
          <ellipse 
            cx="100" 
            cy="50" 
            rx="40" 
            ry="20" 
            fill="url(#parachuteHighlight)"
            className="parachute-highlight"
          />
          
          {/* Paraşüt Çizgileri */}
          <g className="parachute-lines">
            <line x1="30" y1="95" x2="90" y2="170" stroke="#4A90E2" strokeWidth="1.5" opacity="0.8" />
            <line x1="50" y1="110" x2="90" y2="170" stroke="#4A90E2" strokeWidth="1.5" opacity="0.8" />
            <line x1="75" y1="118" x2="90" y2="170" stroke="#4A90E2" strokeWidth="1.5" opacity="0.8" />
            <line x1="100" y1="115" x2="100" y2="170" stroke="#4A90E2" strokeWidth="2" />
            <line x1="125" y1="118" x2="110" y2="170" stroke="#4A90E2" strokeWidth="1.5" opacity="0.8" />
            <line x1="150" y1="110" x2="110" y2="170" stroke="#4A90E2" strokeWidth="1.5" opacity="0.8" />
            <line x1="170" y1="95" x2="110" y2="170" stroke="#4A90E2" strokeWidth="1.5" opacity="0.8" />
          </g>
          
          {/* Paraşütçü */}
          <g className="parachutist">
            {/* Vücut */}
            <ellipse cx="100" cy="185" rx="8" ry="15" fill="#2E3A59" />
            {/* Kafa */}
            <circle cx="100" cy="175" r="6" fill="#F4A261" />
            {/* Kask */}
            <path d="M94 169 Q100 166 106 169 Q106 175 100 175 Q94 175 94 169" fill="#E76F51" />
            {/* Kollar */}
            <line x1="92" y1="180" x2="88" y2="190" stroke="#2E3A59" strokeWidth="3" strokeLinecap="round" />
            <line x1="108" y1="180" x2="112" y2="190" stroke="#2E3A59" strokeWidth="3" strokeLinecap="round" />
            {/* Bacaklar */}
            <line x1="95" y1="195" x2="92" y2="210" stroke="#2E3A59" strokeWidth="3" strokeLinecap="round" />
            <line x1="105" y1="195" x2="108" y2="210" stroke="#2E3A59" strokeWidth="3" strokeLinecap="round" />
            
            {/* Harness */}
            <ellipse cx="100" cy="180" rx="10" ry="8" fill="none" stroke="#8B4513" strokeWidth="2" />
          </g>
          
          {/* Dekoratif Bulutlar */}
          <g className="clouds" opacity="0.6">
            <ellipse cx="60" cy="60" rx="15" ry="8" fill="rgba(255,255,255,0.4)" />
            <ellipse cx="75" cy="55" rx="12" ry="6" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="140" cy="65" rx="18" ry="10" fill="rgba(255,255,255,0.4)" />
            <ellipse cx="155" cy="60" rx="10" ry="5" fill="rgba(255,255,255,0.3)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ParachuteAnimation;