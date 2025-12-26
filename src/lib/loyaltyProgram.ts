// LyDian Miles Loyalty Program
// ₺1 harcama = 1 LyDian Mile
// Miles ile rezervasyon yapılabilir, indirim kazanılır

export interface UserMilesAccount {
  userId: string;
  totalMiles: number;
  availableMiles: number; // Kullanılabilir
  usedMiles: number;
  expiringMiles: number; // Yakında sona erecek
  expiryDate: Date | null;
  tier: 'standard' | 'silver' | 'gold' | 'vip';
  tierProgress: number; // Next tier için ilerleme %
  lifetimeEarned: number;
  lifetimeSpent: number;
}

export interface MilesTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem' | 'expire' | 'bonus' | 'refund';
  amount: number;
  balanceAfter: number;
  description: string;
  bookingId?: string;
  createdAt: Date;
  expiryDate?: Date;
}

export interface TierBenefit {
  tier: 'standard' | 'silver' | 'gold' | 'vip';
  name: string;
  color: string;
  icon: string;
  requiredMiles: number;
  benefits: string[];
  discountPercentage: number;
  prioritySupport: boolean;
  earlyAccess: boolean;
  birthdayBonus: number;
  referralBonus: number;
}

// Tier Configuration
export const TIER_BENEFITS: Record<string, TierBenefit> = {
  standard: {
    tier: 'standard',
    name: 'Standart Üye',
    color: 'gray',
    icon: '👤',
    requiredMiles: 0,
    benefits: [
      'Her ₺1 harcamada 1 Mile kazanın',
      'Miles ile rezervasyon yapın',
      'Email destek',
      'Özel kampanyalardan haberdar olun'
    ],
    discountPercentage: 0,
    prioritySupport: false,
    earlyAccess: false,
    birthdayBonus: 100,
    referralBonus: 200
  },
  silver: {
    tier: 'silver',
    name: 'Silver Üye',
    color: 'gray',
    icon: '🥈',
    requiredMiles: 1000,
    benefits: [
      'Tüm Standart faydalar',
      '%2 ekstra indirim',
      'Ücretsiz iptal süresi +24 saat',
      'Doğum günü bonusu: 250 Miles',
      'Arkadaş davet bonusu: 300 Miles'
    ],
    discountPercentage: 2,
    prioritySupport: false,
    earlyAccess: false,
    birthdayBonus: 250,
    referralBonus: 300
  },
  gold: {
    tier: 'gold',
    name: 'Gold Üye',
    color: 'yellow',
    icon: '🥇',
    requiredMiles: 5000,
    benefits: [
      'Tüm Silver faydalar',
      '%5 ekstra indirim',
      'Öncelikli müşteri hizmeti',
      'Erken rezervasyon hakkı (48 saat önce)',
      'Ücretsiz havaalanı transferi (yılda 2)',
      'Doğum günü bonusu: 500 Miles',
      'Arkadaş davet bonusu: 500 Miles'
    ],
    discountPercentage: 5,
    prioritySupport: true,
    earlyAccess: true,
    birthdayBonus: 500,
    referralBonus: 500
  },
  vip: {
    tier: 'vip',
    name: 'VIP Üye',
    color: 'purple',
    icon: '👑',
    requiredMiles: 10000,
    benefits: [
      'Tüm Gold faydalar',
      '%10 ekstra indirim',
      '7/24 VIP destek hattı',
      'Kişisel seyahat danışmanı',
      'Ücretsiz oda upgrade (müsait ise)',
      'Havaalanı VIP lounge erişimi',
      'Ücretsiz havaalanı transferi (sınırsız)',
      'Miles asla sona ermez',
      'Özel VIP etkinlikler',
      'Doğum günü bonusu: 1000 Miles',
      'Arkadaş davet bonusu: 1000 Miles'
    ],
    discountPercentage: 10,
    prioritySupport: true,
    earlyAccess: true,
    birthdayBonus: 1000,
    referralBonus: 1000
  }
};

/**
 * Calculate user's tier based on lifetime earned miles
 */
export function calculateTier(lifetimeEarned: number): TierBenefit {
  if (lifetimeEarned >= 10000) return TIER_BENEFITS.vip;
  if (lifetimeEarned >= 5000) return TIER_BENEFITS.gold;
  if (lifetimeEarned >= 1000) return TIER_BENEFITS.silver;
  return TIER_BENEFITS.standard;
}

/**
 * Calculate progress to next tier
 */
export function calculateTierProgress(lifetimeEarned: number): {
  currentTier: TierBenefit;
  nextTier: TierBenefit | null;
  progress: number;
  milesNeeded: number;
} {
  const currentTier = calculateTier(lifetimeEarned);

  let nextTier: TierBenefit | null = null;
  let milesNeeded = 0;
  let progress = 0;

  if (currentTier.tier === 'standard') {
    nextTier = TIER_BENEFITS.silver;
    milesNeeded = 1000 - lifetimeEarned;
    progress = (lifetimeEarned / 1000) * 100;
  } else if (currentTier.tier === 'silver') {
    nextTier = TIER_BENEFITS.gold;
    milesNeeded = 5000 - lifetimeEarned;
    progress = ((lifetimeEarned - 1000) / 4000) * 100;
  } else if (currentTier.tier === 'gold') {
    nextTier = TIER_BENEFITS.vip;
    milesNeeded = 10000 - lifetimeEarned;
    progress = ((lifetimeEarned - 5000) / 5000) * 100;
  } else {
    // VIP - max tier
    progress = 100;
  }

  return {
    currentTier,
    nextTier,
    progress: Math.min(100, Math.max(0, progress)),
    milesNeeded: Math.max(0, milesNeeded)
  };
}

/**
 * Calculate miles earned from a booking
 */
export function calculateMilesEarned(
  bookingAmount: number,
  tier: 'standard' | 'silver' | 'gold' | 'vip',
  isFirstBooking: boolean = false
): {
  baseMiles: number;
  bonusMiles: number;
  totalMiles: number;
  bonusReasons: string[];
} {
  // Base: ₺1 = 1 Mile
  const baseMiles = Math.floor(bookingAmount);

  let bonusMiles = 0;
  const bonusReasons: string[] = [];

  // First booking bonus
  if (isFirstBooking) {
    bonusMiles += 500;
    bonusReasons.push('İlk rezervasyon bonusu: +500 Miles');
  }

  // Tier bonus miles
  const tierMultipliers: Record<string, number> = {
    standard: 1.0,
    silver: 1.1,    // %10 bonus
    gold: 1.25,     // %25 bonus
    vip: 1.5        // %50 bonus
  };

  const multiplier = tierMultipliers[tier];
  if (multiplier > 1.0) {
    const tierBonus = Math.floor(baseMiles * (multiplier - 1.0));
    bonusMiles += tierBonus;
    bonusReasons.push(`${TIER_BENEFITS[tier].name} bonusu: +${tierBonus} Miles`);
  }

  return {
    baseMiles,
    bonusMiles,
    totalMiles: baseMiles + bonusMiles,
    bonusReasons
  };
}

/**
 * Calculate miles value in currency
 */
export function calculateMilesValue(miles: number): number {
  // 1000 Miles = ₺50
  // 100 Miles = ₺5
  return (miles / 1000) * 50;
}

/**
 * Calculate how many miles needed for a specific discount
 */
export function calculateMilesForDiscount(discountAmount: number): number {
  // ₺50 discount = 1000 Miles
  return (discountAmount / 50) * 1000;
}

/**
 * Validate miles redemption
 */
export function validateMilesRedemption(
  availableMiles: number,
  requestedMiles: number,
  minimumMiles: number = 100
): {
  valid: boolean;
  error?: string;
} {
  if (requestedMiles < minimumMiles) {
    return {
      valid: false,
      error: `Minimum ${minimumMiles} Miles kullanabilirsiniz`
    };
  }

  if (requestedMiles > availableMiles) {
    return {
      valid: false,
      error: `Yetersiz Miles. Kullanılabilir: ${availableMiles} Miles`
    };
  }

  // Must be multiple of 100
  if (requestedMiles % 100 !== 0) {
    return {
      valid: false,
      error: 'Miles 100\'ün katı olmalıdır'
    };
  }

  return { valid: true };
}

/**
 * Calculate miles expiry
 */
export function calculateMilesExpiry(earnedDate: Date, tier: 'standard' | 'silver' | 'gold' | 'vip'): Date | null {
  // VIP miles never expire
  if (tier === 'vip') return null;

  // Other tiers: expires after 2 years
  const expiryDate = new Date(earnedDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 2);

  return expiryDate;
}

/**
 * Get miles expiring soon (within 90 days)
 */
export function getExpiringMiles(transactions: MilesTransaction[]): {
  amount: number;
  earliestExpiry: Date | null;
} {
  const now = new Date();
  const ninetyDaysLater = new Date();
  ninetyDaysLater.setDate(now.getDate() + 90);

  const expiringTransactions = transactions.filter(t => {
    if (!t.expiryDate) return false;
    return t.expiryDate >= now && t.expiryDate <= ninetyDaysLater;
  });

  if (expiringTransactions.length === 0) {
    return { amount: 0, earliestExpiry: null };
  }

  const amount = expiringTransactions.reduce((sum, t) => sum + t.amount, 0);
  const earliestExpiry = expiringTransactions.reduce((earliest, t) => {
    if (!earliest || (t.expiryDate && t.expiryDate < earliest)) {
      return t.expiryDate!;
    }
    return earliest;
  }, null as Date | null);

  return { amount, earliestExpiry };
}

/**
 * Generate referral code
 */
export function generateReferralCode(userId: string): string {
  // Generate a unique 8-character referral code
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar chars
  let code = 'AIL'; // Prefix

  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

/**
 * Calculate referral bonus
 */
export function calculateReferralBonus(
  referrerTier: 'standard' | 'silver' | 'gold' | 'vip',
  referredBookingAmount: number
): {
  referrerBonus: number;
  referredBonus: number;
} {
  const tierBenefit = TIER_BENEFITS[referrerTier];

  // Referrer gets tier-specific bonus
  const referrerBonus = tierBenefit.referralBonus;

  // Referred user gets fixed 500 Miles welcome bonus
  const referredBonus = 500;

  // If referred booking is high value, give extra bonus
  if (referredBookingAmount >= 5000) {
    return {
      referrerBonus: referrerBonus + 200, // Extra 200 Miles
      referredBonus: referredBonus + 200
    };
  }

  return {
    referrerBonus,
    referredBonus
  };
}

/**
 * Format miles display
 */
export function formatMiles(miles: number): string {
  return `${miles.toLocaleString('tr-TR')} Miles`;
}

/**
 * Get tier color classes for UI
 */
export function getTierColorClasses(tier: 'standard' | 'silver' | 'gold' | 'vip'): {
  bg: string;
  text: string;
  border: string;
} {
  const colorMap = {
    standard: {
      bg: 'bg-white/10',
      text: 'text-white',
      border: 'border-gray-300'
    },
    silver: {
      bg: 'bg-gray-200',
      text: 'text-white',
      border: 'border-gray-400'
    },
    gold: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-900',
      border: 'border-yellow-400'
    },
    vip: {
      bg: 'bg-purple-100',
      text: 'text-purple-900',
      border: 'border-purple-400'
    }
  };

  return colorMap[tier];
}
