/**
 * AI-powered budget analysis and optimization
 */

interface BudgetItem {
  category: 'accommodation' | 'food' | 'activities' | 'transportation' | 'miscellaneous';
  name: string;
  cost: number;
  currency: string;
  isOptional: boolean;
  priority?: number;
}

interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transportation: number;
  miscellaneous: number;
  total: number;
}

interface BudgetAnalysis {
  breakdown: BudgetBreakdown;
  suggestions: string[];
  warnings: string[];
  savingsOpportunities: {
    item: string;
    currentCost: number;
    estimatedSavings: number;
    suggestion: string;
  }[];
  spendingScore: number; // 0-100
}

/**
 * Analyze budget and provide insights
 */
export function analyzeBudget(
  items: BudgetItem[],
  totalBudget: number,
  destination: string
): BudgetAnalysis {
  const breakdown = calculateBreakdown(items);
  const suggestions: string[] = [];
  const warnings: string[] = [];
  const savingsOpportunities: any[] = [];

  // Check if over budget
  if (breakdown.total > totalBudget) {
    warnings.push(
      `Your planned expenses ($${breakdown.total}) exceed your budget ($${totalBudget}) by $${(breakdown.total - totalBudget).toFixed(2)}`
    );
  }

  // Check budget allocation ratios
  const accommodationPercent = (breakdown.accommodation / breakdown.total) * 100;
  const foodPercent = (breakdown.food / breakdown.total) * 100;
  const activitiesPercent = (breakdown.activities / breakdown.total) * 100;

  // Accommodation should be 25-35% of budget
  if (accommodationPercent > 40) {
    warnings.push(
      `Accommodation costs (${accommodationPercent.toFixed(1)}%) are higher than recommended. Consider more budget-friendly options.`
    );
    savingsOpportunities.push({
      item: 'Accommodation',
      currentCost: breakdown.accommodation,
      estimatedSavings: breakdown.accommodation * 0.2,
      suggestion: 'Look for 3-star hotels or Airbnb alternatives'
    });
  } else if (accommodationPercent < 20) {
    suggestions.push(
      'You have room in your budget to upgrade accommodations for better comfort.'
    );
  }

  // Food should be 20-30% of budget
  if (foodPercent > 35) {
    warnings.push(
      `Food expenses (${foodPercent.toFixed(1)}%) are higher than typical. Consider local eateries.`
    );
    savingsOpportunities.push({
      item: 'Dining',
      currentCost: breakdown.food,
      estimatedSavings: breakdown.food * 0.15,
      suggestion: 'Mix fine dining with local street food'
    });
  }

  // Activities should be 25-35% of budget
  if (activitiesPercent < 20) {
    suggestions.push(
      'You have budget available for more activities and experiences.'
    );
  }

  // Destination-specific advice
  const destinationAdvice = getDestinationBudgetAdvice(destination, breakdown);
  suggestions.push(...destinationAdvice);

  // Calculate spending score
  const spendingScore = calculateSpendingScore(breakdown, totalBudget);

  return {
    breakdown,
    suggestions,
    warnings,
    savingsOpportunities,
    spendingScore
  };
}

/**
 * Calculate budget breakdown by category
 */
function calculateBreakdown(items: BudgetItem[]): BudgetBreakdown {
  const breakdown: BudgetBreakdown = {
    accommodation: 0,
    food: 0,
    activities: 0,
    transportation: 0,
    miscellaneous: 0,
    total: 0
  };

  items.forEach(item => {
    breakdown[item.category] += item.cost;
    breakdown.total += item.cost;
  });

  return breakdown;
}

/**
 * Get destination-specific budget advice
 */
function getDestinationBudgetAdvice(
  destination: string,
  breakdown: BudgetBreakdown
): string[] {
  const advice: string[] = [];
  const dest = destination.toLowerCase();

  // Cost of living adjustments
  const expensiveCities = ['london', 'paris', 'tokyo', 'new york', 'zurich', 'oslo'];
  const affordableCities = ['bangkok', 'istanbul', 'mexico city', 'prague', 'budapest'];

  if (expensiveCities.some(city => dest.includes(city))) {
    advice.push(
      `${destination} is a high-cost destination. Consider meal vouchers and city passes for savings.`
    );
  } else if (affordableCities.some(city => dest.includes(city))) {
    advice.push(
      `${destination} offers great value. Your budget allows for premium experiences.`
    );
  }

  return advice;
}

/**
 * Calculate spending efficiency score
 */
function calculateSpendingScore(
  breakdown: BudgetBreakdown,
  totalBudget: number
): number {
  let score = 100;

  // Penalty for going over budget
  if (breakdown.total > totalBudget) {
    const overPercent = ((breakdown.total - totalBudget) / totalBudget) * 100;
    score -= Math.min(overPercent * 2, 50);
  }

  // Check if budget allocation is balanced
  const accommodationPercent = (breakdown.accommodation / breakdown.total) * 100;
  const foodPercent = (breakdown.food / breakdown.total) * 100;
  const activitiesPercent = (breakdown.activities / breakdown.total) * 100;

  // Ideal ranges
  const idealRanges = {
    accommodation: [25, 35],
    food: [20, 30],
    activities: [25, 35]
  };

  if (accommodationPercent < idealRanges.accommodation[0] || accommodationPercent > idealRanges.accommodation[1]) {
    score -= 10;
  }
  if (foodPercent < idealRanges.food[0] || foodPercent > idealRanges.food[1]) {
    score -= 10;
  }
  if (activitiesPercent < idealRanges.activities[0] || activitiesPercent > idealRanges.activities[1]) {
    score -= 10;
  }

  return Math.max(0, Math.round(score));
}

/**
 * Optimize budget distribution
 */
export function optimizeBudgetDistribution(
  totalBudget: number,
  numberOfDays: number,
  travelStyle: 'budget' | 'balanced' | 'luxury'
): BudgetBreakdown {
  let accommodationPercent: number;
  let foodPercent: number;
  let activitiesPercent: number;
  let transportationPercent: number;
  let miscellaneousPercent: number;

  switch (travelStyle) {
    case 'budget':
      accommodationPercent = 0.25;
      foodPercent = 0.25;
      activitiesPercent = 0.30;
      transportationPercent = 0.15;
      miscellaneousPercent = 0.05;
      break;

    case 'luxury':
      accommodationPercent = 0.35;
      foodPercent = 0.30;
      activitiesPercent = 0.25;
      transportationPercent = 0.05;
      miscellaneousPercent = 0.05;
      break;

    case 'balanced':
    default:
      accommodationPercent = 0.30;
      foodPercent = 0.25;
      activitiesPercent = 0.30;
      transportationPercent = 0.10;
      miscellaneousPercent = 0.05;
      break;
  }

  return {
    accommodation: totalBudget * accommodationPercent,
    food: totalBudget * foodPercent,
    activities: totalBudget * activitiesPercent,
    transportation: totalBudget * transportationPercent,
    miscellaneous: totalBudget * miscellaneousPercent,
    total: totalBudget
  };
}

/**
 * Calculate daily budget allowance
 */
export function calculateDailyAllowance(
  totalBudget: number,
  numberOfDays: number,
  fixedCosts: number = 0
): number {
  const variableBudget = totalBudget - fixedCosts;
  return variableBudget / numberOfDays;
}

/**
 * Track spending progress
 */
export function trackSpending(
  spent: number,
  budget: number,
  daysElapsed: number,
  totalDays: number
): {
  status: 'on-track' | 'over-budget' | 'under-budget';
  message: string;
  projectedTotal: number;
} {
  const expectedSpending = (budget / totalDays) * daysElapsed;
  const difference = spent - expectedSpending;
  const projectedTotal = (spent / daysElapsed) * totalDays;

  let status: 'on-track' | 'over-budget' | 'under-budget';
  let message: string;

  if (Math.abs(difference) < budget * 0.05) {
    status = 'on-track';
    message = 'Your spending is on track with your budget.';
  } else if (difference > 0) {
    status = 'over-budget';
    message = `You're spending ${((difference / expectedSpending) * 100).toFixed(1)}% more than planned. Consider adjusting your remaining expenses.`;
  } else {
    status = 'under-budget';
    message = `You're spending ${((Math.abs(difference) / expectedSpending) * 100).toFixed(1)}% less than planned. You have room for extra activities!`;
  }

  return {
    status,
    message,
    projectedTotal
  };
}

/**
 * Find cost-saving alternatives
 */
export function findCostSavingAlternatives(
  item: BudgetItem,
  savingsTarget: number
): string[] {
  const suggestions: string[] = [];

  switch (item.category) {
    case 'accommodation':
      suggestions.push(
        'Consider hostels or budget hotels',
        'Look for Airbnb deals or apartments',
        'Stay slightly outside city center',
        'Book directly with hotel for better rates'
      );
      break;

    case 'food':
      suggestions.push(
        'Try local street food and markets',
        'Cook some meals if you have kitchen access',
        'Lunch specials instead of dinner at restaurants',
        'Local cafes instead of tourist restaurants'
      );
      break;

    case 'activities':
      suggestions.push(
        'Look for free walking tours',
        'Purchase city passes for multiple attractions',
        'Visit museums on free days',
        'Book activities online for discounts'
      );
      break;

    case 'transportation':
      suggestions.push(
        'Use public transport instead of taxis',
        'Get multi-day transport passes',
        'Walk or rent bikes when possible',
        'Share rides with other travelers'
      );
      break;

    case 'miscellaneous':
      suggestions.push(
        'Buy souvenirs at local markets not tourist shops',
        'Use duty-free for expensive items',
        'Pack essentials from home',
        'Use free WiFi instead of international plans'
      );
      break;
  }

  return suggestions;
}

/**
 * Currency conversion helper
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number {
  if (fromCurrency === toCurrency) return amount;

  const rateFrom = rates[fromCurrency] || 1;
  const rateTo = rates[toCurrency] || 1;

  return (amount / rateFrom) * rateTo;
}

/**
 * Split costs among travelers
 */
export function splitCosts(
  totalCost: number,
  numberOfTravelers: number,
  splitType: 'equal' | 'custom' = 'equal',
  customSplits?: number[]
): number[] {
  if (splitType === 'equal') {
    const perPerson = totalCost / numberOfTravelers;
    return Array(numberOfTravelers).fill(perPerson);
  }

  if (splitType === 'custom' && customSplits && customSplits.length === numberOfTravelers) {
    const totalPercent = customSplits.reduce((sum, val) => sum + val, 0);
    return customSplits.map(percent => (totalCost * percent) / totalPercent);
  }

  // Fallback to equal split
  const perPerson = totalCost / numberOfTravelers;
  return Array(numberOfTravelers).fill(perPerson);
}

/**
 * Generate budget report
 */
export function generateBudgetReport(
  items: BudgetItem[],
  totalBudget: number
): {
  summary: BudgetBreakdown;
  categoryDetails: Record<string, BudgetItem[]>;
  recommendations: string[];
} {
  const summary = calculateBreakdown(items);
  const categoryDetails: Record<string, BudgetItem[]> = {
    accommodation: [],
    food: [],
    activities: [],
    transportation: [],
    miscellaneous: []
  };

  items.forEach(item => {
    categoryDetails[item.category].push(item);
  });

  const analysis = analyzeBudget(items, totalBudget, '');
  const recommendations = [...analysis.suggestions, ...analysis.warnings];

  return {
    summary,
    categoryDetails,
    recommendations
  };
}
