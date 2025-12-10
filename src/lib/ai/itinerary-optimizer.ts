/**
 * AI-powered itinerary optimization utilities
 */

interface Activity {
  id: string;
  title: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  duration: number;
  cost: number;
  startTime?: string;
  priority?: number;
  openingHours?: { open: string; close: string };
  crowdLevel?: 'low' | 'medium' | 'high';
}

interface OptimizationOptions {
  optimizeFor: 'time' | 'budget' | 'quality';
  startTime?: string;
  endTime?: string;
  includeBreaks?: boolean;
  considerTraffic?: boolean;
  considerWeather?: boolean;
}

/**
 * Optimize activity order to minimize travel time
 */
export function optimizeForTime(activities: Activity[]): Activity[] {
  // Implement traveling salesman problem solution
  // Sort activities by geographical proximity
  const optimized = [...activities];

  // Simple nearest neighbor algorithm
  const result: Activity[] = [];
  let currentActivity = optimized.shift();

  if (currentActivity) {
    result.push(currentActivity);

    while (optimized.length > 0) {
      let nearestIndex = 0;
      let minDistance = Infinity;

      optimized.forEach((activity, index) => {
        const distance = calculateDistance(
          currentActivity!.coordinates,
          activity.coordinates
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = index;
        }
      });

      currentActivity = optimized.splice(nearestIndex, 1)[0];
      result.push(currentActivity);
    }
  }

  return result;
}

/**
 * Optimize for budget constraints
 */
export function optimizeForBudget(
  activities: Activity[],
  maxBudget: number
): Activity[] {
  // Sort by cost-to-value ratio
  const scored = activities.map(activity => ({
    ...activity,
    score: (activity.priority || 1) / activity.cost
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Select activities within budget
  const selected: Activity[] = [];
  let totalCost = 0;

  for (const activity of scored) {
    if (totalCost + activity.cost <= maxBudget) {
      selected.push(activity);
      totalCost += activity.cost;
    }
  }

  return selected;
}

/**
 * Optimize for quality (best experiences)
 */
export function optimizeForQuality(activities: Activity[]): Activity[] {
  // Sort by priority/rating
  return [...activities].sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
  coord1?: { lat: number; lng: number },
  coord2?: { lat: number; lng: number }
): number {
  if (!coord1 || !coord2) return Infinity;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Generate time slots for activities
 */
export function generateTimeSlots(
  activities: Activity[],
  startTime: string = '09:00',
  includeBreaks: boolean = true
): Activity[] {
  const slots: Activity[] = [];
  let currentTime = parseTime(startTime);

  activities.forEach((activity, index) => {
    // Add lunch break if it's around noon
    if (includeBreaks && currentTime >= 720 && currentTime <= 780) {
      currentTime = 780; // 13:00
    }

    slots.push({
      ...activity,
      startTime: formatTime(currentTime)
    });

    currentTime += activity.duration;

    // Add buffer time between activities (15 minutes)
    if (index < activities.length - 1) {
      currentTime += 15;
    }
  });

  return slots;
}

/**
 * Parse time string to minutes
 */
function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Format minutes to time string
 */
function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Check if activity fits within operating hours
 */
export function isActivityAvailable(
  activity: Activity,
  proposedTime: string
): boolean {
  if (!activity.openingHours) return true;

  const time = parseTime(proposedTime);
  const open = parseTime(activity.openingHours.open);
  const close = parseTime(activity.openingHours.close);

  return time >= open && time + activity.duration <= close;
}

/**
 * Calculate total travel time for itinerary
 */
export function calculateTotalTravelTime(activities: Activity[]): number {
  let totalTime = 0;

  for (let i = 0; i < activities.length - 1; i++) {
    const distance = calculateDistance(
      activities[i].coordinates,
      activities[i + 1].coordinates
    );
    // Assume average speed of 30 km/h in city
    totalTime += (distance / 30) * 60; // Convert to minutes
  }

  return Math.round(totalTime);
}

/**
 * Distribute activities across multiple days
 */
export function distributeAcrossDays(
  activities: Activity[],
  numberOfDays: number,
  maxActivitiesPerDay: number = 5
): Activity[][] {
  const days: Activity[][] = [];
  const activitiesPerDay = Math.ceil(activities.length / numberOfDays);

  for (let i = 0; i < numberOfDays; i++) {
    const start = i * activitiesPerDay;
    const end = Math.min(start + activitiesPerDay, activities.length);
    days.push(activities.slice(start, end));
  }

  return days;
}

/**
 * Balance daily costs across trip
 */
export function balanceDailyCosts(
  dailyActivities: Activity[][],
  totalBudget: number
): Activity[][] {
  const budgetPerDay = totalBudget / dailyActivities.length;

  return dailyActivities.map(dayActivities => {
    const dayCost = dayActivities.reduce((sum, act) => sum + act.cost, 0);

    if (dayCost > budgetPerDay * 1.2) {
      // Day is too expensive, remove lowest priority items
      return dayActivities
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .filter((act, index, arr) => {
          const costSoFar = arr
            .slice(0, index + 1)
            .reduce((sum, a) => sum + a.cost, 0);
          return costSoFar <= budgetPerDay * 1.2;
        });
    }

    return dayActivities;
  });
}

/**
 * Get alternative activities based on preferences
 */
export function findAlternatives(
  activity: Activity,
  allActivities: Activity[],
  count: number = 3
): Activity[] {
  // Filter activities at similar price point and location
  const alternatives = allActivities.filter(act => {
    if (act.id === activity.id) return false;

    const priceSimilar =
      Math.abs(act.cost - activity.cost) < activity.cost * 0.3;
    const locationClose =
      calculateDistance(act.coordinates, activity.coordinates) < 5; // Within 5km

    return priceSimilar && locationClose;
  });

  // Sort by distance and return top matches
  alternatives.sort((a, b) => {
    const distA = calculateDistance(a.coordinates, activity.coordinates);
    const distB = calculateDistance(b.coordinates, activity.coordinates);
    return distA - distB;
  });

  return alternatives.slice(0, count);
}

/**
 * Adjust itinerary based on weather conditions
 */
export function adjustForWeather(
  activities: Activity[],
  weatherCondition: 'sunny' | 'rainy' | 'cloudy'
): Activity[] {
  // Reorder to prioritize indoor activities during rain
  if (weatherCondition === 'rainy') {
    const indoor = activities.filter(act =>
      ['museum', 'gallery', 'restaurant', 'shopping'].some(type =>
        act.title.toLowerCase().includes(type)
      )
    );
    const outdoor = activities.filter(
      act => !indoor.includes(act)
    );

    return [...indoor, ...outdoor];
  }

  return activities;
}

/**
 * Consider crowd levels when scheduling
 */
export function optimizeForCrowds(activities: Activity[]): Activity[] {
  // Popular attractions in early morning, less popular during peak hours
  return [...activities].sort((a, b) => {
    const crowdValueA = a.crowdLevel === 'high' ? 1 : a.crowdLevel === 'medium' ? 2 : 3;
    const crowdValueB = b.crowdLevel === 'high' ? 1 : b.crowdLevel === 'medium' ? 2 : 3;
    return crowdValueA - crowdValueB;
  });
}
