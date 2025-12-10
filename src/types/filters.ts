// Filter Types and Interfaces for Advanced Filtering System

export type FilterType = 'hotel' | 'flight' | 'activity';

// Common filter interfaces
export interface PriceRange {
  min: number;
  max: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

// Hotel Filters
export interface HotelFilters {
  priceRange: PriceRange;
  starRating: number[];
  guestRating: PriceRange;
  propertyTypes: PropertyType[];
  amenities: string[];
  mealPlans: MealPlan[];
  distanceFromCenter: number;
  cancellationPolicy: CancellationPolicy[];
}

export type PropertyType =
  | 'hotel'
  | 'apartment'
  | 'villa'
  | 'resort'
  | 'hostel'
  | 'boutique'
  | 'guesthouse';

export type MealPlan =
  | 'none'
  | 'breakfast'
  | 'half-board'
  | 'full-board'
  | 'all-inclusive';

export type CancellationPolicy =
  | 'free-cancellation'
  | 'pay-at-property'
  | 'non-refundable';

// Hotel Amenities (30+ options)
export const HOTEL_AMENITIES = [
  // Basic
  { id: 'wifi', label: 'WiFi', category: 'basic' },
  { id: 'air-conditioning', label: 'Air Conditioning', category: 'basic' },
  { id: 'heating', label: 'Heating', category: 'basic' },
  { id: 'tv', label: 'TV', category: 'basic' },

  // Facilities
  { id: 'pool', label: 'Swimming Pool', category: 'facilities' },
  { id: 'gym', label: 'Fitness Center', category: 'facilities' },
  { id: 'spa', label: 'Spa & Wellness', category: 'facilities' },
  { id: 'sauna', label: 'Sauna', category: 'facilities' },
  { id: 'hot-tub', label: 'Hot Tub', category: 'facilities' },

  // Dining
  { id: 'restaurant', label: 'Restaurant', category: 'dining' },
  { id: 'bar', label: 'Bar', category: 'dining' },
  { id: 'room-service', label: 'Room Service', category: 'dining' },
  { id: 'kitchen', label: 'Kitchen', category: 'dining' },
  { id: 'kitchenette', label: 'Kitchenette', category: 'dining' },

  // Services
  { id: 'parking', label: 'Free Parking', category: 'services' },
  { id: 'airport-shuttle', label: 'Airport Shuttle', category: 'services' },
  { id: '24-hour-reception', label: '24-Hour Reception', category: 'services' },
  { id: 'concierge', label: 'Concierge Service', category: 'services' },
  { id: 'laundry', label: 'Laundry Service', category: 'services' },
  { id: 'dry-cleaning', label: 'Dry Cleaning', category: 'services' },

  // Room Features
  { id: 'balcony', label: 'Balcony/Terrace', category: 'room' },
  { id: 'washing-machine', label: 'Washing Machine', category: 'room' },
  { id: 'safe', label: 'Safe', category: 'room' },
  { id: 'minibar', label: 'Minibar', category: 'room' },
  { id: 'coffee-maker', label: 'Coffee Maker', category: 'room' },

  // Special
  { id: 'pet-friendly', label: 'Pet Friendly', category: 'special' },
  { id: 'family-rooms', label: 'Family Rooms', category: 'special' },
  { id: 'non-smoking', label: 'Non-Smoking Rooms', category: 'special' },
  { id: 'accessible', label: 'Accessible Facilities', category: 'special' },
  { id: 'ev-charging', label: 'EV Charging Station', category: 'special' },
  { id: 'business-center', label: 'Business Center', category: 'special' },
  { id: 'meeting-rooms', label: 'Meeting Rooms', category: 'special' },
  { id: 'beach-access', label: 'Beach Access', category: 'special' },
  { id: 'ski-in-ski-out', label: 'Ski-in/Ski-out', category: 'special' },
] as const;

// Flight Filters
export interface FlightFilters {
  priceRange: PriceRange;
  stops: StopOption[];
  airlines: string[];
  departureTime: TimeSlot[];
  arrivalTime: TimeSlot[];
  maxDuration: number;
  aircraftTypes: string[];
  baggageOptions: BaggageOption[];
  cabinClass: CabinClass[];
}

export type StopOption = 'direct' | '1-stop' | '2-plus-stops';

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export type BaggageOption =
  | 'carry-on-only'
  | 'checked-bag-1'
  | 'checked-bag-2'
  | 'unlimited';

export type CabinClass =
  | 'economy'
  | 'premium-economy'
  | 'business'
  | 'first';

// Activity/Tour Filters
export interface ActivityFilters {
  priceRange: PriceRange;
  duration: DurationRange;
  categories: ActivityCategory[];
  groupSize: GroupSize[];
  difficultyLevel: DifficultyLevel[];
  ageRestrictions: AgeRestriction[];
  languages: string[];
  accessibility: AccessibilityOption[];
  includes: string[];
}

export interface DurationRange {
  min: number;
  max: number;
  unit: 'hours' | 'days';
}

export type ActivityCategory =
  | 'adventure'
  | 'cultural'
  | 'food'
  | 'nature'
  | 'water-sports'
  | 'winter-sports'
  | 'wellness'
  | 'city-tours'
  | 'cruise'
  | 'cycling'
  | 'hiking'
  | 'photography'
  | 'shopping';

export type GroupSize =
  | 'private'
  | 'small-group' // 2-10
  | 'medium-group' // 11-20
  | 'large-group'; // 20+

export type DifficultyLevel =
  | 'easy'
  | 'moderate'
  | 'challenging'
  | 'extreme';

export type AgeRestriction =
  | 'all-ages'
  | '3-plus'
  | '6-plus'
  | '12-plus'
  | '16-plus'
  | '18-plus';

export type AccessibilityOption =
  | 'wheelchair-accessible'
  | 'hearing-accessible'
  | 'visual-accessible'
  | 'mobility-assistance';

// Combined filter state
export interface AllFilters {
  hotel: HotelFilters;
  flight: FlightFilters;
  activity: ActivityFilters;
}

// Filter preset for save/load functionality
export interface FilterPreset {
  id: string;
  name: string;
  type: FilterType;
  filters: HotelFilters | FlightFilters | ActivityFilters;
  createdAt: Date;
}

// Default filter values
export const DEFAULT_HOTEL_FILTERS: HotelFilters = {
  priceRange: { min: 0, max: 10000 },
  starRating: [],
  guestRating: { min: 0, max: 10 },
  propertyTypes: [],
  amenities: [],
  mealPlans: [],
  distanceFromCenter: 10,
  cancellationPolicy: [],
};

export const DEFAULT_FLIGHT_FILTERS: FlightFilters = {
  priceRange: { min: 0, max: 10000 },
  stops: [],
  airlines: [],
  departureTime: [],
  arrivalTime: [],
  maxDuration: 24,
  aircraftTypes: [],
  baggageOptions: [],
  cabinClass: [],
};

export const DEFAULT_ACTIVITY_FILTERS: ActivityFilters = {
  priceRange: { min: 0, max: 5000 },
  duration: { min: 0, max: 24, unit: 'hours' },
  categories: [],
  groupSize: [],
  difficultyLevel: [],
  ageRestrictions: [],
  languages: [],
  accessibility: [],
  includes: [],
};

// Filter constants
export const STAR_RATINGS = [1, 2, 3, 4, 5];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'resort', label: 'Resort' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'boutique', label: 'Boutique Hotel' },
  { value: 'guesthouse', label: 'Guesthouse' },
];

export const MEAL_PLANS: { value: MealPlan; label: string }[] = [
  { value: 'none', label: 'Room Only' },
  { value: 'breakfast', label: 'Breakfast Included' },
  { value: 'half-board', label: 'Half Board' },
  { value: 'full-board', label: 'Full Board' },
  { value: 'all-inclusive', label: 'All Inclusive' },
];

export const TIME_SLOTS: { value: TimeSlot; label: string; hours: string }[] = [
  { value: 'morning', label: 'Morning', hours: '06:00 - 12:00' },
  { value: 'afternoon', label: 'Afternoon', hours: '12:00 - 18:00' },
  { value: 'evening', label: 'Evening', hours: '18:00 - 00:00' },
  { value: 'night', label: 'Night', hours: '00:00 - 06:00' },
];

export const DIFFICULTY_LEVELS: { value: DifficultyLevel; label: string; description: string }[] = [
  { value: 'easy', label: 'Easy', description: 'Suitable for everyone' },
  { value: 'moderate', label: 'Moderate', description: 'Some physical activity required' },
  { value: 'challenging', label: 'Challenging', description: 'Good fitness level needed' },
  { value: 'extreme', label: 'Extreme', description: 'Expert level required' },
];

export const ACTIVITY_CATEGORIES: { value: ActivityCategory; label: string; icon: string }[] = [
  { value: 'adventure', label: 'Adventure', icon: '🏔️' },
  { value: 'cultural', label: 'Cultural', icon: '🏛️' },
  { value: 'food', label: 'Food & Dining', icon: '🍴' },
  { value: 'nature', label: 'Nature', icon: '🌳' },
  { value: 'water-sports', label: 'Water Sports', icon: '🏄' },
  { value: 'winter-sports', label: 'Winter Sports', icon: '⛷️' },
  { value: 'wellness', label: 'Wellness', icon: '🧘' },
  { value: 'city-tours', label: 'City Tours', icon: '🏙️' },
  { value: 'cruise', label: 'Cruises', icon: '⛵' },
  { value: 'cycling', label: 'Cycling', icon: '🚴' },
  { value: 'hiking', label: 'Hiking', icon: '🥾' },
  { value: 'photography', label: 'Photography', icon: '📸' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
];
