/**
 * Car Brand Logos Component
 * SVG-based brand logos for car rental cards
 * Premium, clean design without external image URLs
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

// Renault Logo
export const RenaultLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Renault logo"
  >
    <defs>
      <linearGradient id="renaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FFCC00', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FFB300', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#FFF9E6" rx="20" />
    <path
      d="M100,30 L160,85 L160,115 L100,170 L40,115 L40,85 Z"
      fill="url(#renaultGradient)"
      stroke="#E6A800"
      strokeWidth="3"
    />
    <text
      x="100"
      y="110"
      textAnchor="middle"
      fill="#333"
      fontSize="24"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      R
    </text>
  </svg>
);

// Fiat Logo
export const FiatLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Fiat logo"
  >
    <defs>
      <linearGradient id="fiatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#CC0000', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#990000', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#FFE6E6" rx="20" />
    <rect x="30" y="70" width="140" height="60" fill="url(#fiatGradient)" rx="8" />
    <text
      x="100"
      y="110"
      textAnchor="middle"
      fill="white"
      fontSize="32"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      FIAT
    </text>
  </svg>
);

// Volkswagen Logo
export const VolkswagenLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Volkswagen logo"
  >
    <defs>
      <linearGradient id="vwGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#00356B', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#001E3C', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#E6F2FF" rx="20" />
    <circle cx="100" cy="100" r="70" fill="url(#vwGradient)" stroke="#002D5C" strokeWidth="3" />
    <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2" />
    <text
      x="100"
      y="90"
      textAnchor="middle"
      fill="white"
      fontSize="40"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      VW
    </text>
  </svg>
);

// Toyota Logo
export const ToyotaLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Toyota logo"
  >
    <defs>
      <linearGradient id="toyotaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#CC0000', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#990000', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#FFF" rx="20" />
    <ellipse cx="100" cy="100" rx="65" ry="45" fill="none" stroke="url(#toyotaGradient)" strokeWidth="8" />
    <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="url(#toyotaGradient)" strokeWidth="8" />
    <ellipse cx="100" cy="100" rx="25" ry="25" fill="none" stroke="url(#toyotaGradient)" strokeWidth="6" />
  </svg>
);

// Hyundai Logo
export const HyundaiLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Hyundai logo"
  >
    <defs>
      <linearGradient id="hyundaiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#00308F', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#002060', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#E6EFF9" rx="20" />
    <ellipse
      cx="100"
      cy="100"
      rx="70"
      ry="50"
      fill="none"
      stroke="url(#hyundaiGradient)"
      strokeWidth="8"
      transform="rotate(-15 100 100)"
    />
    <text
      x="100"
      y="110"
      textAnchor="middle"
      fill="#00308F"
      fontSize="48"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
      fontStyle="italic"
    >
      H
    </text>
  </svg>
);

// BMW Logo
export const BMWLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="BMW logo"
  >
    <rect width="200" height="200" fill="#F0F0F0" rx="20" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="#000" strokeWidth="4" />
    <circle cx="100" cy="100" r="65" fill="none" stroke="#000" strokeWidth="2" />

    {/* Quadrants */}
    <path d="M100,35 L100,100 L35,100 A65,65 0 0,1 100,35" fill="#0066B1" />
    <path d="M100,35 L165,100 L100,100 A65,65 0 0,1 100,35" fill="#FFF" />
    <path d="M100,165 L100,100 L165,100 A65,65 0 0,1 100,165" fill="#0066B1" />
    <path d="M100,165 L35,100 L100,100 A65,65 0 0,1 100,165" fill="#FFF" />

    <text
      x="100"
      y="25"
      textAnchor="middle"
      fill="#000"
      fontSize="16"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      BMW
    </text>
  </svg>
);

// Mercedes-Benz Logo
export const MercedesLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Mercedes-Benz logo"
  >
    <defs>
      <linearGradient id="mercedesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#C0C0C0', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#808080', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#F5F5F5" rx="20" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="url(#mercedesGradient)" strokeWidth="6" />

    {/* Three-pointed star */}
    <path
      d="M100,40 L100,100 M100,100 L140,145 M100,100 L60,145"
      stroke="url(#mercedesGradient)"
      strokeWidth="8"
      strokeLinecap="round"
    />

    <circle cx="100" cy="100" r="8" fill="url(#mercedesGradient)" />
  </svg>
);

// Audi Logo
export const AudiLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Audi logo"
  >
    <defs>
      <linearGradient id="audiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#BB0A30', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8B0000', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#FFF" rx="20" />

    {/* Four rings */}
    <circle cx="50" cy="100" r="25" fill="none" stroke="url(#audiGradient)" strokeWidth="5" />
    <circle cx="85" cy="100" r="25" fill="none" stroke="url(#audiGradient)" strokeWidth="5" />
    <circle cx="115" cy="100" r="25" fill="none" stroke="url(#audiGradient)" strokeWidth="5" />
    <circle cx="150" cy="100" r="25" fill="none" stroke="url(#audiGradient)" strokeWidth="5" />
  </svg>
);

// Ford Logo
export const FordLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Ford logo"
  >
    <defs>
      <linearGradient id="fordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#003478', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#002050', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#E6EFF9" rx="20" />
    <ellipse cx="100" cy="100" rx="75" ry="50" fill="url(#fordGradient)" />
    <text
      x="100"
      y="115"
      textAnchor="middle"
      fill="white"
      fontSize="42"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
      fontStyle="italic"
    >
      Ford
    </text>
  </svg>
);

// Nissan Logo
export const NissanLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Nissan logo"
  >
    <defs>
      <linearGradient id="nissanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#C00000', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8B0000', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#FFF" rx="20" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="url(#nissanGradient)" strokeWidth="4" />
    <rect x="45" y="90" width="110" height="20" fill="url(#nissanGradient)" />
    <text
      x="100"
      y="106"
      textAnchor="middle"
      fill="white"
      fontSize="16"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      NISSAN
    </text>
  </svg>
);

// Peugeot Logo
export const PeugeotLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Peugeot logo"
  >
    <defs>
      <linearGradient id="peugeotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#002868', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#001540', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#E6EFF9" rx="20" />

    {/* Lion shield */}
    <path
      d="M100,30 L140,60 L140,130 L100,160 L60,130 L60,60 Z"
      fill="url(#peugeotGradient)"
      stroke="#001540"
      strokeWidth="2"
    />

    {/* Lion head simplified */}
    <circle cx="100" cy="85" r="15" fill="white" opacity="0.9" />
    <path
      d="M85,100 Q100,120 115,100"
      fill="none"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Generic/Default Car Logo
export const GenericCarLogo: React.FC<BrandLogoProps> = ({ className = '', size = 80 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Car logo"
  >
    <defs>
      <linearGradient id="genericGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#357ABD', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="#F0F8FF" rx="20" />

    {/* Simplified car icon */}
    <rect x="40" y="80" width="120" height="50" rx="10" fill="url(#genericGradient)" />
    <rect x="60" y="60" width="80" height="30" rx="8" fill="url(#genericGradient)" />

    {/* Wheels */}
    <circle cx="70" cy="140" r="15" fill="#333" />
    <circle cx="130" cy="140" r="15" fill="#333" />
    <circle cx="70" cy="140" r="8" fill="#C0C0C0" />
    <circle cx="130" cy="140" r="8" fill="#C0C0C0" />
  </svg>
);

// Brand Logo Selector - Maps brand name to component
export const getBrandLogo = (brand: string): React.FC<BrandLogoProps> => {
  const brandLower = brand.toLowerCase();

  if (brandLower.includes('renault')) return RenaultLogo;
  if (brandLower.includes('fiat')) return FiatLogo;
  if (brandLower.includes('volkswagen') || brandLower.includes('vw')) return VolkswagenLogo;
  if (brandLower.includes('toyota')) return ToyotaLogo;
  if (brandLower.includes('hyundai')) return HyundaiLogo;
  if (brandLower.includes('bmw')) return BMWLogo;
  if (brandLower.includes('mercedes')) return MercedesLogo;
  if (brandLower.includes('audi')) return AudiLogo;
  if (brandLower.includes('ford')) return FordLogo;
  if (brandLower.includes('nissan')) return NissanLogo;
  if (brandLower.includes('peugeot')) return PeugeotLogo;

  return GenericCarLogo;
};

// Vehicle Type Icons for Transfers
export const VehicleTypeIcon: React.FC<{ type: string; size?: number; className?: string }> = ({
  type,
  size = 80,
  className = ''
}) => {
  const typeLower = type.toLowerCase();

  // Sedan
  if (typeLower.includes('sedan')) {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="Sedan">
        <defs>
          <linearGradient id="sedanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2C3E50', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#34495E', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#F0F0F0" rx="20" />
        <rect x="30" y="80" width="140" height="55" rx="12" fill="url(#sedanGradient)" />
        <rect x="55" y="60" width="90" height="35" rx="10" fill="url(#sedanGradient)" />
        <circle cx="60" cy="145" r="18" fill="#1a1a1a" />
        <circle cx="140" cy="145" r="18" fill="#1a1a1a" />
        <circle cx="60" cy="145" r="10" fill="#C0C0C0" />
        <circle cx="140" cy="145" r="10" fill="#C0C0C0" />
      </svg>
    );
  }

  // Minivan
  if (typeLower.includes('minivan') || typeLower.includes('van')) {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="Minivan">
        <defs>
          <linearGradient id="minivanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3498DB', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2980B9', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#EBF5FB" rx="20" />
        <rect x="25" y="65" width="150" height="70" rx="15" fill="url(#minivanGradient)" />
        <rect x="35" y="45" width="130" height="35" rx="12" fill="url(#minivanGradient)" />
        <circle cx="55" cy="145" r="18" fill="#1a1a1a" />
        <circle cx="145" cy="145" r="18" fill="#1a1a1a" />
        <circle cx="55" cy="145" r="10" fill="#C0C0C0" />
        <circle cx="145" cy="145" r="10" fill="#C0C0C0" />
      </svg>
    );
  }

  // Minibus
  if (typeLower.includes('minibus') || typeLower.includes('sprinter')) {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="Minibus">
        <defs>
          <linearGradient id="minibusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E74C3C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#C0392B', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#FADBD8" rx="20" />
        <rect x="20" y="50" width="160" height="85" rx="18" fill="url(#minibusGradient)" />
        <rect x="30" y="35" width="140" height="30" rx="10" fill="url(#minibusGradient)" />
        <circle cx="50" cy="145" r="20" fill="#1a1a1a" />
        <circle cx="150" cy="145" r="20" fill="#1a1a1a" />
        <circle cx="50" cy="145" r="11" fill="#C0C0C0" />
        <circle cx="150" cy="145" r="11" fill="#C0C0C0" />
        {/* Windows */}
        <rect x="40" y="60" width="35" height="25" rx="4" fill="rgba(255,255,255,0.3)" />
        <rect x="85" y="60" width="35" height="25" rx="4" fill="rgba(255,255,255,0.3)" />
        <rect x="130" y="60" width="35" height="25" rx="4" fill="rgba(255,255,255,0.3)" />
      </svg>
    );
  }

  // VIP/Luxury
  if (typeLower.includes('vip') || typeLower.includes('luxury')) {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-label="VIP Vehicle">
        <defs>
          <linearGradient id="vipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2C3E50', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1A252F', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#F8F9FA" rx="20" />
        <rect x="25" y="75" width="150" height="60" rx="15" fill="url(#vipGradient)" />
        <rect x="50" y="55" width="100" height="35" rx="12" fill="url(#vipGradient)" />
        <circle cx="55" cy="145" r="20" fill="#1a1a1a" />
        <circle cx="145" cy="145" r="20" fill="#1a1a1a" />
        <circle cx="55" cy="145" r="11" fill="#FFD700" />
        <circle cx="145" cy="145" r="11" fill="#FFD700" />
        {/* VIP badge */}
        <circle cx="100" cy="100" r="15" fill="#FFD700" opacity="0.3" />
        <text x="100" y="106" textAnchor="middle" fill="#1A252F" fontSize="12" fontWeight="bold">VIP</text>
      </svg>
    );
  }

  // Default car
  return <GenericCarLogo size={size} className={className} />;
};
