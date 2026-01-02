import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Star } from 'lucide-react';
import {
  FilterType,
  HotelFilters,
  FlightFilters,
  ActivityFilters,
  PROPERTY_TYPES,
  MEAL_PLANS,
  HOTEL_AMENITIES,
  TIME_SLOTS,
  DIFFICULTY_LEVELS,
  ACTIVITY_CATEGORIES } from
'../../types/filters';

interface FilterChipsProps {
  type: FilterType;
  filters: HotelFilters | FlightFilters | ActivityFilters;
  onRemoveFilter: (filterKey: string, value?: any) => void;
  onClearAll: () => void;
  className?: string;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  type,
  filters,
  onRemoveFilter,
  onClearAll,
  className = ''
}) => {
  const chips = getActiveFilterChips(type, filters);

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <AnimatePresence mode="popLayout">
        {chips.map((chip, index) =>
        <motion.div
          key={`${chip.key}-${chip.value}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-lydian-primary/10 text-blue-500 rounded-full text-sm font-medium border border-blue-500/20 group hover:bg-lydian-primary/20 transition-colors">

            <span>{chip.label}</span>
            <button
            onClick={() => onRemoveFilter(chip.key, chip.value)}
            className="p-0.5 hover:bg-lydian-primary/20 rounded-full transition-colors"
            aria-label={`Remove ${chip.label} filter`}>

              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {chips.length > 1 &&
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onClearAll}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 rounded-full text-sm font-medium hover:bg-white/10 backdrop-blur-xl border border-white/20 transition-colors border border-white/20/10">

          <RotateCcw className="w-3 h-3" />
          Clear All
        </motion.button>
      }
    </div>);

};

// Helper function to extract active filter chips
function getActiveFilterChips(
type: FilterType,
filters: HotelFilters | FlightFilters | ActivityFilters)
: Array<{key: string;value: any;label: string;}> {
  const chips: Array<{key: string;value: any;label: string;}> = [];

  if (type === 'hotel') {
    const hotelFilters = filters as HotelFilters;

    // Price Range
    if (hotelFilters.priceRange.min > 0 || hotelFilters.priceRange.max < 10000) {
      chips.push({
        key: 'priceRange',
        value: null,
        label: `₺${hotelFilters.priceRange.min} - ₺${hotelFilters.priceRange.max}`
      });
    }

    // Star Rating
    hotelFilters.starRating.forEach((rating) => {
      chips.push({
        key: 'starRating',
        value: rating,
        label: `${rating} ${rating === 1 ? 'Star' : 'Stars'}`
      });
    });

    // Guest Rating
    if (hotelFilters.guestRating.min > 0) {
      chips.push({
        key: 'guestRating',
        value: null,
        label: `Rating ${hotelFilters.guestRating.min}+`
      });
    }

    // Property Types
    hotelFilters.propertyTypes.forEach((type) => {
      const typeLabel = PROPERTY_TYPES.find((t) => t.value === type)?.label || type;
      chips.push({
        key: 'propertyTypes',
        value: type,
        label: typeLabel
      });
    });

    // Amenities
    hotelFilters.amenities.forEach((amenityId) => {
      const amenity = HOTEL_AMENITIES.find((a) => a.id === amenityId);
      if (amenity) {
        chips.push({
          key: 'amenities',
          value: amenityId,
          label: amenity.label
        });
      }
    });

    // Meal Plans
    hotelFilters.mealPlans.forEach((plan) => {
      const planLabel = MEAL_PLANS.find((p) => p.value === plan)?.label || plan;
      chips.push({
        key: 'mealPlans',
        value: plan,
        label: planLabel
      });
    });

    // Distance from Center
    if (hotelFilters.distanceFromCenter < 10) {
      chips.push({
        key: 'distanceFromCenter',
        value: null,
        label: `Within ${hotelFilters.distanceFromCenter}km`
      });
    }

    // Cancellation Policy
    hotelFilters.cancellationPolicy.forEach((policy) => {
      const label =
      policy === 'free-cancellation' ?
      'Free Cancellation' :
      policy === 'pay-at-property' ?
      'Pay at Property' :
      'Non-Refundable';
      chips.push({
        key: 'cancellationPolicy',
        value: policy,
        label
      });
    });
  } else if (type === 'flight') {
    const flightFilters = filters as FlightFilters;

    // Price Range
    if (flightFilters.priceRange.min > 0 || flightFilters.priceRange.max < 10000) {
      chips.push({
        key: 'priceRange',
        value: null,
        label: `₺${flightFilters.priceRange.min} - ₺${flightFilters.priceRange.max}`
      });
    }

    // Stops
    flightFilters.stops.forEach((stop) => {
      const label =
      stop === 'direct' ?
      'Direct' :
      stop === '1-stop' ?
      '1 Stop' :
      '2+ Stops';
      chips.push({
        key: 'stops',
        value: stop,
        label
      });
    });

    // Airlines
    flightFilters.airlines.forEach((airline) => {
      chips.push({
        key: 'airlines',
        value: airline,
        label: airline
      });
    });

    // Departure Time
    flightFilters.departureTime.forEach((time) => {
      const slot = TIME_SLOTS.find((s) => s.value === time);
      chips.push({
        key: 'departureTime',
        value: time,
        label: `Depart: ${slot?.label || time}`
      });
    });

    // Arrival Time
    flightFilters.arrivalTime.forEach((time) => {
      const slot = TIME_SLOTS.find((s) => s.value === time);
      chips.push({
        key: 'arrivalTime',
        value: time,
        label: `Arrive: ${slot?.label || time}`
      });
    });

    // Max Duration
    if (flightFilters.maxDuration < 24) {
      chips.push({
        key: 'maxDuration',
        value: null,
        label: `Max ${flightFilters.maxDuration}h`
      });
    }

    // Aircraft Types
    flightFilters.aircraftTypes.forEach((aircraft) => {
      chips.push({
        key: 'aircraftTypes',
        value: aircraft,
        label: aircraft
      });
    });

    // Baggage Options
    flightFilters.baggageOptions.forEach((baggage) => {
      const label =
      baggage === 'carry-on-only' ?
      'Carry-on Only' :
      baggage === 'checked-bag-1' ?
      '1 Checked Bag' :
      baggage === 'checked-bag-2' ?
      '2 Checked Bags' :
      'Unlimited Baggage';
      chips.push({
        key: 'baggageOptions',
        value: baggage,
        label
      });
    });

    // Cabin Class
    flightFilters.cabinClass.forEach((cabin) => {
      const label =
      cabin === 'economy' ?
      'Economy' :
      cabin === 'premium-economy' ?
      'Premium Economy' :
      cabin === 'business' ?
      'Business' :
      'First Class';
      chips.push({
        key: 'cabinClass',
        value: cabin,
        label
      });
    });
  } else if (type === 'activity') {
    const activityFilters = filters as ActivityFilters;

    // Price Range
    if (activityFilters.priceRange.min > 0 || activityFilters.priceRange.max < 5000) {
      chips.push({
        key: 'priceRange',
        value: null,
        label: `₺${activityFilters.priceRange.min} - ₺${activityFilters.priceRange.max}`
      });
    }

    // Duration
    if (
    activityFilters.duration.min > 0 ||
    activityFilters.duration.unit === 'hours' && activityFilters.duration.max < 24 ||
    activityFilters.duration.unit === 'days' && activityFilters.duration.max < 14)
    {
      chips.push({
        key: 'duration',
        value: null,
        label: `${activityFilters.duration.min}-${activityFilters.duration.max} ${activityFilters.duration.unit}`
      });
    }

    // Categories
    activityFilters.categories.forEach((category) => {
      const cat = ACTIVITY_CATEGORIES.find((c) => c.value === category);
      chips.push({
        key: 'categories',
        value: category,
        label: `${cat?.icon || ''} ${cat?.label || category}`
      });
    });

    // Group Size
    activityFilters.groupSize.forEach((size) => {
      const label =
      size === 'private' ?
      'Private' :
      size === 'small-group' ?
      'Small Group' :
      size === 'medium-group' ?
      'Medium Group' :
      'Large Group';
      chips.push({
        key: 'groupSize',
        value: size,
        label
      });
    });

    // Difficulty Level
    activityFilters.difficultyLevel.forEach((level) => {
      const diff = DIFFICULTY_LEVELS.find((d) => d.value === level);
      chips.push({
        key: 'difficultyLevel',
        value: level,
        label: diff?.label || level
      });
    });

    // Age Restrictions
    activityFilters.ageRestrictions.forEach((age) => {
      const label =
      age === 'all-ages' ?
      'All Ages' :
      age === '3-plus' ?
      '3+ Years' :
      age === '6-plus' ?
      '6+ Years' :
      age === '12-plus' ?
      '12+ Years' :
      age === '16-plus' ?
      '16+ Years' :
      '18+ Years';
      chips.push({
        key: 'ageRestrictions',
        value: age,
        label
      });
    });

    // Languages
    activityFilters.languages.forEach((lang) => {
      chips.push({
        key: 'languages',
        value: lang,
        label: lang
      });
    });

    // Accessibility
    activityFilters.accessibility.forEach((access) => {
      const label =
      access === 'wheelchair-accessible' ?
      'Wheelchair Accessible' :
      access === 'hearing-accessible' ?
      'Hearing Accessible' :
      access === 'visual-accessible' ?
      'Visual Accessible' :
      'Mobility Assistance';
      chips.push({
        key: 'accessibility',
        value: access,
        label
      });
    });
  }

  return chips;
}

export default FilterChips;