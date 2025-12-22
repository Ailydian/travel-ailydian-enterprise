// Smart Bundle Pricing Engine
// Paket yapan kullanıcılara otomatik indirim hesaplaması

export interface BundleItem {
  category: 'hotel' | 'car' | 'flight' | 'tour' | 'transfer';
  name: string;
  basePrice: number;
  quantity?: number; // For multiple nights, days, etc.
}

export interface BundleDiscount {
  percentage: number;
  amount: number;
  reason: string;
  badge: string;
}

export interface BundlePricing {
  items: BundleItem[];
  subtotal: number;
  discounts: BundleDiscount[];
  totalDiscount: number;
  finalTotal: number;
  savingsPercentage: number;
  ailydi anMiles: number; // Loyalty points earned
}

/**
 * Calculate bundle discount based on number of categories
 * 2 categories = %5
 * 3 categories = %10
 * 4 categories = %15
 * 5 categories = %20 (Full package)
 */
export function calculateBundleDiscount(categories: string[]): BundleDiscount | null {
  const categoryCount = categories.length;

  const discountMap: Record<number, { percentage: number; reason: string; badge: string }> = {
    2: {
      percentage: 5,
      reason: '2 kategori birlikte rezervasyon',
      badge: '💚 İkili Paket'
    },
    3: {
      percentage: 10,
      reason: '3 kategori birlikte rezervasyon',
      badge: '💙 Üçlü Paket'
    },
    4: {
      percentage: 15,
      reason: '4 kategori birlikte rezervasyon',
      badge: '💜 Dörtlü Paket'
    },
    5: {
      percentage: 20,
      reason: 'Tam paket rezervasyon (Her şey dahil)',
      badge: '🌟 Full Paket'
    }
  };

  if (categoryCount < 2) return null;

  const config = discountMap[Math.min(categoryCount, 5)];

  return {
    percentage: config.percentage,
    amount: 0, // Will be calculated based on subtotal
    reason: config.reason,
    badge: config.badge
  };
}

/**
 * Calculate early booking discount
 * 30+ days advance = %5
 * 60+ days advance = %10
 * 90+ days advance = %15
 */
export function calculateEarlyBookingDiscount(bookingDate: Date, travelDate: Date): BundleDiscount | null {
  const daysInAdvance = Math.floor(
    (travelDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysInAdvance >= 90) {
    return {
      percentage: 15,
      amount: 0,
      reason: '90+ gün önceden rezervasyon',
      badge: '⏰ Erken Rezervasyon'
    };
  } else if (daysInAdvance >= 60) {
    return {
      percentage: 10,
      amount: 0,
      reason: '60+ gün önceden rezervasyon',
      badge: '⏰ Erken Rezervasyon'
    };
  } else if (daysInAdvance >= 30) {
    return {
      percentage: 5,
      amount: 0,
      reason: '30+ gün önceden rezervasyon',
      badge: '⏰ Erken Rezervasyon'
    };
  }

  return null;
}

/**
 * Calculate long stay discount for hotels
 * 7+ nights = %10
 * 14+ nights = %15
 * 30+ nights = %20
 */
export function calculateLongStayDiscount(nights: number): BundleDiscount | null {
  if (nights >= 30) {
    return {
      percentage: 20,
      amount: 0,
      reason: '30+ gece konaklama',
      badge: '🏠 Uzun Süreli'
    };
  } else if (nights >= 14) {
    return {
      percentage: 15,
      amount: 0,
      reason: '14+ gece konaklama',
      badge: '🏠 Uzun Süreli'
    };
  } else if (nights >= 7) {
    return {
      percentage: 10,
      amount: 0,
      reason: '7+ gece konaklama',
      badge: '🏠 Haftalık'
    };
  }

  return null;
}

/**
 * Calculate seasonal discount
 * Low season = %15
 * Mid season = %10
 * High season = 0%
 */
export function calculateSeasonalDiscount(travelDate: Date, location: string): BundleDiscount | null {
  const month = travelDate.getMonth() + 1; // 1-12

  // Define seasons for popular Turkish destinations
  const seasonalRules: Record<string, { low: number[]; mid: number[]; high: number[] }> = {
    default: {
      low: [11, 12, 1, 2, 3], // November - March
      mid: [4, 5, 10], // April, May, October
      high: [6, 7, 8, 9] // June - September
    },
    ski: {
      // Ski resorts (Uludağ, Erciyes, etc.)
      low: [5, 6, 7, 8, 9, 10], // May - October
      mid: [4, 11], // April, November
      high: [12, 1, 2, 3] // December - March
    }
  };

  const lowerLocation = location.toLowerCase();
  let rules = seasonalRules.default;

  // Check if it's a ski destination
  if (
    lowerLocation.includes('uludağ') ||
    lowerLocation.includes('erciyes') ||
    lowerLocation.includes('palandöken') ||
    lowerLocation.includes('kartepe')
  ) {
    rules = seasonalRules.ski;
  }

  if (rules.low.includes(month)) {
    return {
      percentage: 15,
      amount: 0,
      reason: 'Düşük sezon indirimi',
      badge: '❄️ Sezon Fırsatı'
    };
  } else if (rules.mid.includes(month)) {
    return {
      percentage: 10,
      amount: 0,
      reason: 'Orta sezon indirimi',
      badge: '🍂 Sezon Fırsatı'
    };
  }

  return null;
}

/**
 * Calculate loyalty discount based on Ailydian Miles
 * 1,000+ miles = %2
 * 5,000+ miles = %5
 * 10,000+ miles = %10 (VIP)
 */
export function calculateLoyaltyDiscount(ailydiانMiles: number): BundleDiscount | null {
  if (ailydiانMiles >= 10000) {
    return {
      percentage: 10,
      amount: 0,
      reason: 'VIP üye indirimi (10,000+ miles)',
      badge: '👑 VIP Üye'
    };
  } else if (ailydiانMiles >= 5000) {
    return {
      percentage: 5,
      amount: 0,
      reason: 'Gold üye indirimi (5,000+ miles)',
      badge: '🥇 Gold Üye'
    };
  } else if (ailydiانMiles >= 1000) {
    return {
      percentage: 2,
      amount: 0,
      reason: 'Silver üye indirimi (1,000+ miles)',
      badge: '🥈 Silver Üye'
    };
  }

  return null;
}

/**
 * Main function to calculate complete bundle pricing
 */
export function calculateBundlePricing(
  items: BundleItem[],
  options?: {
    bookingDate?: Date;
    travelDate?: Date;
    nights?: number;
    location?: string;
    userMiles?: number;
  }
): BundlePricing {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.basePrice * quantity;
  }, 0);

  // Collect all discounts
  const discounts: BundleDiscount[] = [];

  // 1. Bundle discount (primary)
  const categories = items.map(item => item.category);
  const uniqueCategories = [...new Set(categories)];
  const bundleDiscount = calculateBundleDiscount(uniqueCategories);

  if (bundleDiscount) {
    bundleDiscount.amount = Math.round(subtotal * (bundleDiscount.percentage / 100));
    discounts.push(bundleDiscount);
  }

  // 2. Early booking discount
  if (options?.bookingDate && options?.travelDate) {
    const earlyBookingDiscount = calculateEarlyBookingDiscount(
      options.bookingDate,
      options.travelDate
    );

    if (earlyBookingDiscount) {
      earlyBookingDiscount.amount = Math.round(subtotal * (earlyBookingDiscount.percentage / 100));
      discounts.push(earlyBookingDiscount);
    }
  }

  // 3. Long stay discount (only if hotel is in bundle)
  if (options?.nights && categories.includes('hotel')) {
    const longStayDiscount = calculateLongStayDiscount(options.nights);

    if (longStayDiscount) {
      const hotelItem = items.find(item => item.category === 'hotel');
      const hotelTotal = hotelItem ? hotelItem.basePrice * (hotelItem.quantity || 1) : 0;
      longStayDiscount.amount = Math.round(hotelTotal * (longStayDiscount.percentage / 100));
      discounts.push(longStayDiscount);
    }
  }

  // 4. Seasonal discount
  if (options?.travelDate && options?.location) {
    const seasonalDiscount = calculateSeasonalDiscount(options.travelDate, options.location);

    if (seasonalDiscount) {
      seasonalDiscount.amount = Math.round(subtotal * (seasonalDiscount.percentage / 100));
      discounts.push(seasonalDiscount);
    }
  }

  // 5. Loyalty discount
  if (options?.userMiles && options.userMiles > 0) {
    const loyaltyDiscount = calculateLoyaltyDiscount(options.userMiles);

    if (loyaltyDiscount) {
      loyaltyDiscount.amount = Math.round(subtotal * (loyaltyDiscount.percentage / 100));
      discounts.push(loyaltyDiscount);
    }
  }

  // Calculate totals
  const totalDiscount = discounts.reduce((sum, discount) => sum + discount.amount, 0);
  const finalTotal = Math.max(0, subtotal - totalDiscount);
  const savingsPercentage = subtotal > 0 ? Math.round((totalDiscount / subtotal) * 100) : 0;

  // Calculate Ailydian Miles earned (1 mile per ₺1 spent)
  const milesEarned = Math.floor(finalTotal);

  return {
    items,
    subtotal,
    discounts,
    totalDiscount,
    finalTotal,
    savingsPercentage,
    ailydiانMiles: milesEarned
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return `₺${amount.toLocaleString('tr-TR')}`;
}

/**
 * Get bundle recommendation message
 */
export function getBundleRecommendation(currentCategories: string[]): string | null {
  const categoryCount = currentCategories.length;

  if (categoryCount === 1) {
    return 'Transfer veya tur ekleyerek %5 indirim kazanın! 🎁';
  } else if (categoryCount === 2) {
    return 'Bir kategori daha ekleyerek %10 indirimi yakalayın! 🚀';
  } else if (categoryCount === 3) {
    return 'Sadece bir kategori ekleyerek %15 indirimi kaçırmayın! ⭐';
  } else if (categoryCount === 4) {
    return 'Son bir kategori ile %20 tam paket indirimini kazanın! 🌟';
  }

  return null;
}
