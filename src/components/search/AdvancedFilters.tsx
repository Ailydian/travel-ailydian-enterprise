import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Wifi,
  Waves,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Heart,
  MapPin,
  Plane,
  Clock,
  Users,
  Search,
  Save,
  RotateCcw,
  Filter,
  Building2,
  Home,
  Castle,
  Hotel as HotelIcon,
  Mountain,
} from 'lucide-react';
import {
  FilterType,
  HotelFilters,
  FlightFilters,
  ActivityFilters,
  STAR_RATINGS,
  PROPERTY_TYPES,
  MEAL_PLANS,
  HOTEL_AMENITIES,
  TIME_SLOTS,
  DIFFICULTY_LEVELS,
  ACTIVITY_CATEGORIES,
} from '../../types/filters';

interface AdvancedFiltersProps {
  type: FilterType;
  filters: HotelFilters | FlightFilters | ActivityFilters;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  onClose?: () => void;
  isOpen: boolean;
  activeFilterCount: number;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  type,
  filters,
  onFilterChange,
  onReset,
  onClose,
  isOpen,
  activeFilterCount,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['price', 'rating'])
  );
  const [amenitySearch, setAmenitySearch] = useState('');
  const [airlineSearch, setAirlineSearch] = useState('');

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const isSectionExpanded = (section: string) => expandedSections.has(section);

  // Render Hotel Filters
  const renderHotelFilters = () => {
    const hotelFilters = filters as HotelFilters;

    return (
      <div className="space-y-4">
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          icon={<MapPin className="w-4 h-4" />}
          isExpanded={isSectionExpanded('price')}
          onToggle={() => toggleSection('price')}
          count={
            hotelFilters.priceRange.min > 0 || hotelFilters.priceRange.max < 10000
              ? 1
              : 0
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₺{hotelFilters.priceRange.min}</span>
              <span>₺{hotelFilters.priceRange.max}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={hotelFilters.priceRange.min}
              onChange={e =>
                onFilterChange({
                  ...hotelFilters,
                  priceRange: { ...hotelFilters.priceRange, min: Number(e.target.value) },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={hotelFilters.priceRange.max}
              onChange={e =>
                onFilterChange({
                  ...hotelFilters,
                  priceRange: { ...hotelFilters.priceRange, max: Number(e.target.value) },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Star Rating */}
        <FilterSection
          title="Star Rating"
          icon={<Star className="w-4 h-4" />}
          isExpanded={isSectionExpanded('stars')}
          onToggle={() => toggleSection('stars')}
          count={hotelFilters.starRating.length}
        >
          <div className="flex flex-wrap gap-2">
            {STAR_RATINGS.map(rating => (
              <button
                key={rating}
                onClick={() => {
                  const newRatings = hotelFilters.starRating.includes(rating)
                    ? hotelFilters.starRating.filter(r => r !== rating)
                    : [...hotelFilters.starRating, rating];
                  onFilterChange({ ...hotelFilters, starRating: newRatings });
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all ${
                  hotelFilters.starRating.includes(rating)
                    ? 'bg-ailydian-primary text-white border-ailydian-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-ailydian-primary'
                }`}
              >
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Guest Rating */}
        <FilterSection
          title="Guest Rating"
          icon={<Heart className="w-4 h-4" />}
          isExpanded={isSectionExpanded('rating')}
          onToggle={() => toggleSection('rating')}
          count={hotelFilters.guestRating.min > 0 ? 1 : 0}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{hotelFilters.guestRating.min.toFixed(1)}</span>
              <span>{hotelFilters.guestRating.max.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={hotelFilters.guestRating.min}
              onChange={e =>
                onFilterChange({
                  ...hotelFilters,
                  guestRating: { ...hotelFilters.guestRating, min: Number(e.target.value) },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection
          title="Property Type"
          icon={<Building2 className="w-4 h-4" />}
          isExpanded={isSectionExpanded('property')}
          onToggle={() => toggleSection('property')}
          count={hotelFilters.propertyTypes.length}
        >
          <div className="grid grid-cols-2 gap-2">
            {PROPERTY_TYPES.map(type => (
              <button
                key={type.value}
                onClick={() => {
                  const newTypes = hotelFilters.propertyTypes.includes(type.value)
                    ? hotelFilters.propertyTypes.filter(t => t !== type.value)
                    : [...hotelFilters.propertyTypes, type.value];
                  onFilterChange({ ...hotelFilters, propertyTypes: newTypes });
                }}
                className={`px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                  hotelFilters.propertyTypes.includes(type.value)
                    ? 'bg-ailydian-primary text-white border-ailydian-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-ailydian-primary'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection
          title="Amenities"
          icon={<Wifi className="w-4 h-4" />}
          isExpanded={isSectionExpanded('amenities')}
          onToggle={() => toggleSection('amenities')}
          count={hotelFilters.amenities.length}
        >
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search amenities..."
                value={amenitySearch}
                onChange={e => setAmenitySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ailydian-primary focus:border-transparent"
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {HOTEL_AMENITIES.filter(amenity =>
                amenity.label.toLowerCase().includes(amenitySearch.toLowerCase())
              ).map(amenity => (
                <label
                  key={amenity.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={hotelFilters.amenities.includes(amenity.id)}
                    onChange={e => {
                      const newAmenities = e.target.checked
                        ? [...hotelFilters.amenities, amenity.id]
                        : hotelFilters.amenities.filter(a => a !== amenity.id);
                      onFilterChange({ ...hotelFilters, amenities: newAmenities });
                    }}
                    className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary"
                  />
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                  <span className="ml-auto text-xs text-gray-400 capitalize">
                    {amenity.category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Meal Plans */}
        <FilterSection
          title="Meal Plans"
          icon={<UtensilsCrossed className="w-4 h-4" />}
          isExpanded={isSectionExpanded('meals')}
          onToggle={() => toggleSection('meals')}
          count={hotelFilters.mealPlans.length}
        >
          <div className="space-y-2">
            {MEAL_PLANS.map(plan => (
              <label
                key={plan.value}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={hotelFilters.mealPlans.includes(plan.value)}
                  onChange={e => {
                    const newPlans = e.target.checked
                      ? [...hotelFilters.mealPlans, plan.value]
                      : hotelFilters.mealPlans.filter(p => p !== plan.value);
                    onFilterChange({ ...hotelFilters, mealPlans: newPlans });
                  }}
                  className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary"
                />
                <span className="text-sm text-gray-700">{plan.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Distance from Center */}
        <FilterSection
          title="Distance from Center"
          icon={<MapPin className="w-4 h-4" />}
          isExpanded={isSectionExpanded('distance')}
          onToggle={() => toggleSection('distance')}
          count={hotelFilters.distanceFromCenter < 10 ? 1 : 0}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>0 km</span>
              <span className="font-medium text-ailydian-primary">
                {hotelFilters.distanceFromCenter} km
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={hotelFilters.distanceFromCenter}
              onChange={e =>
                onFilterChange({
                  ...hotelFilters,
                  distanceFromCenter: Number(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Cancellation Policy */}
        <FilterSection
          title="Cancellation Policy"
          icon={<RotateCcw className="w-4 h-4" />}
          isExpanded={isSectionExpanded('cancellation')}
          onToggle={() => toggleSection('cancellation')}
          count={hotelFilters.cancellationPolicy.length}
        >
          <div className="space-y-2">
            {[
              { value: 'free-cancellation', label: 'Free Cancellation' },
              { value: 'pay-at-property', label: 'Pay at Property' },
              { value: 'non-refundable', label: 'Non-Refundable' },
            ].map(policy => (
              <label
                key={policy.value}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={hotelFilters.cancellationPolicy.includes(policy.value as any)}
                  onChange={e => {
                    const newPolicies = e.target.checked
                      ? [...hotelFilters.cancellationPolicy, policy.value as any]
                      : hotelFilters.cancellationPolicy.filter(p => p !== policy.value);
                    onFilterChange({ ...hotelFilters, cancellationPolicy: newPolicies });
                  }}
                  className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary"
                />
                <span className="text-sm text-gray-700">{policy.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    );
  };

  // Render Flight Filters
  const renderFlightFilters = () => {
    const flightFilters = filters as FlightFilters;

    return (
      <div className="space-y-4">
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          icon={<MapPin className="w-4 h-4" />}
          isExpanded={isSectionExpanded('price')}
          onToggle={() => toggleSection('price')}
          count={
            flightFilters.priceRange.min > 0 || flightFilters.priceRange.max < 10000
              ? 1
              : 0
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₺{flightFilters.priceRange.min}</span>
              <span>₺{flightFilters.priceRange.max}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="50"
              value={flightFilters.priceRange.min}
              onChange={e =>
                onFilterChange({
                  ...flightFilters,
                  priceRange: { ...flightFilters.priceRange, min: Number(e.target.value) },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
            <input
              type="range"
              min="0"
              max="10000"
              step="50"
              value={flightFilters.priceRange.max}
              onChange={e =>
                onFilterChange({
                  ...flightFilters,
                  priceRange: { ...flightFilters.priceRange, max: Number(e.target.value) },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Number of Stops */}
        <FilterSection
          title="Stops"
          icon={<Plane className="w-4 h-4" />}
          isExpanded={isSectionExpanded('stops')}
          onToggle={() => toggleSection('stops')}
          count={flightFilters.stops.length}
        >
          <div className="space-y-2">
            {[
              { value: 'direct', label: 'Direct Flights' },
              { value: '1-stop', label: '1 Stop' },
              { value: '2-plus-stops', label: '2+ Stops' },
            ].map(stop => (
              <label
                key={stop.value}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={flightFilters.stops.includes(stop.value as any)}
                  onChange={e => {
                    const newStops = e.target.checked
                      ? [...flightFilters.stops, stop.value as any]
                      : flightFilters.stops.filter(s => s !== stop.value);
                    onFilterChange({ ...flightFilters, stops: newStops });
                  }}
                  className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary"
                />
                <span className="text-sm text-gray-700">{stop.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Departure Time */}
        <FilterSection
          title="Departure Time"
          icon={<Clock className="w-4 h-4" />}
          isExpanded={isSectionExpanded('departure')}
          onToggle={() => toggleSection('departure')}
          count={flightFilters.departureTime.length}
        >
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.value}
                onClick={() => {
                  const newTimes = flightFilters.departureTime.includes(slot.value)
                    ? flightFilters.departureTime.filter(t => t !== slot.value)
                    : [...flightFilters.departureTime, slot.value];
                  onFilterChange({ ...flightFilters, departureTime: newTimes });
                }}
                className={`px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                  flightFilters.departureTime.includes(slot.value)
                    ? 'bg-ailydian-primary text-white border-ailydian-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-ailydian-primary'
                }`}
              >
                <div className="font-medium">{slot.label}</div>
                <div className="text-xs opacity-75">{slot.hours}</div>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Arrival Time */}
        <FilterSection
          title="Arrival Time"
          icon={<Clock className="w-4 h-4" />}
          isExpanded={isSectionExpanded('arrival')}
          onToggle={() => toggleSection('arrival')}
          count={flightFilters.arrivalTime.length}
        >
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.value}
                onClick={() => {
                  const newTimes = flightFilters.arrivalTime.includes(slot.value)
                    ? flightFilters.arrivalTime.filter(t => t !== slot.value)
                    : [...flightFilters.arrivalTime, slot.value];
                  onFilterChange({ ...flightFilters, arrivalTime: newTimes });
                }}
                className={`px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                  flightFilters.arrivalTime.includes(slot.value)
                    ? 'bg-ailydian-primary text-white border-ailydian-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-ailydian-primary'
                }`}
              >
                <div className="font-medium">{slot.label}</div>
                <div className="text-xs opacity-75">{slot.hours}</div>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Max Duration */}
        <FilterSection
          title="Flight Duration"
          icon={<Clock className="w-4 h-4" />}
          isExpanded={isSectionExpanded('duration')}
          onToggle={() => toggleSection('duration')}
          count={flightFilters.maxDuration < 24 ? 1 : 0}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Any</span>
              <span className="font-medium text-ailydian-primary">
                Max {flightFilters.maxDuration}h
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={flightFilters.maxDuration}
              onChange={e =>
                onFilterChange({
                  ...flightFilters,
                  maxDuration: Number(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Cabin Class */}
        <FilterSection
          title="Cabin Class"
          icon={<Users className="w-4 h-4" />}
          isExpanded={isSectionExpanded('cabin')}
          onToggle={() => toggleSection('cabin')}
          count={flightFilters.cabinClass.length}
        >
          <div className="space-y-2">
            {[
              { value: 'economy', label: 'Economy' },
              { value: 'premium-economy', label: 'Premium Economy' },
              { value: 'business', label: 'Business' },
              { value: 'first', label: 'First Class' },
            ].map(cabin => (
              <label
                key={cabin.value}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={flightFilters.cabinClass.includes(cabin.value as any)}
                  onChange={e => {
                    const newClasses = e.target.checked
                      ? [...flightFilters.cabinClass, cabin.value as any]
                      : flightFilters.cabinClass.filter(c => c !== cabin.value);
                    onFilterChange({ ...flightFilters, cabinClass: newClasses });
                  }}
                  className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary"
                />
                <span className="text-sm text-gray-700">{cabin.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    );
  };

  // Render Activity Filters
  const renderActivityFilters = () => {
    const activityFilters = filters as ActivityFilters;

    return (
      <div className="space-y-4">
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          icon={<MapPin className="w-4 h-4" />}
          isExpanded={isSectionExpanded('price')}
          onToggle={() => toggleSection('price')}
          count={
            activityFilters.priceRange.min > 0 || activityFilters.priceRange.max < 5000
              ? 1
              : 0
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₺{activityFilters.priceRange.min}</span>
              <span>₺{activityFilters.priceRange.max}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={activityFilters.priceRange.min}
              onChange={e =>
                onFilterChange({
                  ...activityFilters,
                  priceRange: {
                    ...activityFilters.priceRange,
                    min: Number(e.target.value),
                  },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={activityFilters.priceRange.max}
              onChange={e =>
                onFilterChange({
                  ...activityFilters,
                  priceRange: {
                    ...activityFilters.priceRange,
                    max: Number(e.target.value),
                  },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection
          title="Categories"
          icon={<Mountain className="w-4 h-4" />}
          isExpanded={isSectionExpanded('categories')}
          onToggle={() => toggleSection('categories')}
          count={activityFilters.categories.length}
        >
          <div className="grid grid-cols-2 gap-2">
            {ACTIVITY_CATEGORIES.map(category => (
              <button
                key={category.value}
                onClick={() => {
                  const newCategories = activityFilters.categories.includes(category.value)
                    ? activityFilters.categories.filter(c => c !== category.value)
                    : [...activityFilters.categories, category.value];
                  onFilterChange({ ...activityFilters, categories: newCategories });
                }}
                className={`px-3 py-2 rounded-lg border-2 text-sm transition-all flex items-center gap-2 ${
                  activityFilters.categories.includes(category.value)
                    ? 'bg-ailydian-primary text-white border-ailydian-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-ailydian-primary'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Difficulty Level */}
        <FilterSection
          title="Difficulty Level"
          icon={<Mountain className="w-4 h-4" />}
          isExpanded={isSectionExpanded('difficulty')}
          onToggle={() => toggleSection('difficulty')}
          count={activityFilters.difficultyLevel.length}
        >
          <div className="space-y-2">
            {DIFFICULTY_LEVELS.map(level => (
              <label
                key={level.value}
                className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activityFilters.difficultyLevel.includes(level.value)}
                  onChange={e => {
                    const newLevels = e.target.checked
                      ? [...activityFilters.difficultyLevel, level.value]
                      : activityFilters.difficultyLevel.filter(l => l !== level.value);
                    onFilterChange({ ...activityFilters, difficultyLevel: newLevels });
                  }}
                  className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary mt-0.5"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">{level.label}</div>
                  <div className="text-xs text-gray-500">{level.description}</div>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Duration */}
        <FilterSection
          title="Duration"
          icon={<Clock className="w-4 h-4" />}
          isExpanded={isSectionExpanded('duration')}
          onToggle={() => toggleSection('duration')}
          count={activityFilters.duration.min > 0 || activityFilters.duration.max < 24 ? 1 : 0}
        >
          <div className="space-y-4">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() =>
                  onFilterChange({
                    ...activityFilters,
                    duration: { ...activityFilters.duration, unit: 'hours' },
                  })
                }
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  activityFilters.duration.unit === 'hours'
                    ? 'bg-ailydian-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Hours
              </button>
              <button
                onClick={() =>
                  onFilterChange({
                    ...activityFilters,
                    duration: { ...activityFilters.duration, unit: 'days' },
                  })
                }
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  activityFilters.duration.unit === 'days'
                    ? 'bg-ailydian-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Days
              </button>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {activityFilters.duration.min} {activityFilters.duration.unit}
              </span>
              <span>
                {activityFilters.duration.max} {activityFilters.duration.unit}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={activityFilters.duration.unit === 'hours' ? 24 : 14}
              step="1"
              value={activityFilters.duration.max}
              onChange={e =>
                onFilterChange({
                  ...activityFilters,
                  duration: { ...activityFilters.duration, max: Number(e.target.value) },
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ailydian-primary"
            />
          </div>
        </FilterSection>

        {/* Group Size */}
        <FilterSection
          title="Group Size"
          icon={<Users className="w-4 h-4" />}
          isExpanded={isSectionExpanded('group')}
          onToggle={() => toggleSection('group')}
          count={activityFilters.groupSize.length}
        >
          <div className="space-y-2">
            {[
              { value: 'private', label: 'Private (1-2 people)' },
              { value: 'small-group', label: 'Small Group (3-10)' },
              { value: 'medium-group', label: 'Medium Group (11-20)' },
              { value: 'large-group', label: 'Large Group (20+)' },
            ].map(size => (
              <label
                key={size.value}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activityFilters.groupSize.includes(size.value as any)}
                  onChange={e => {
                    const newSizes = e.target.checked
                      ? [...activityFilters.groupSize, size.value as any]
                      : activityFilters.groupSize.filter(s => s !== size.value);
                    onFilterChange({ ...activityFilters, groupSize: newSizes });
                  }}
                  className="w-4 h-4 text-ailydian-primary rounded focus:ring-ailydian-primary"
                />
                <span className="text-sm text-gray-700">{size.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Filter Panel */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:static lg:shadow-none overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-ailydian-primary to-ailydian-secondary text-white">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <h2 className="font-bold text-lg">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-white text-ailydian-primary rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {type === 'hotel' && renderHotelFilters()}
              {type === 'flight' && renderFlightFilters()}
              {type === 'activity' && renderActivityFilters()}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
              <button
                onClick={onReset}
                className="w-full py-2.5 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All Filters
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-ailydian-primary text-white rounded-lg font-medium hover:bg-ailydian-dark transition-colors lg:hidden"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Filter Section Component
interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  count = 0,
  children,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="text-ailydian-primary">{icon}</div>
          <span className="font-medium text-gray-900">{title}</span>
          {count > 0 && (
            <span className="px-2 py-0.5 bg-ailydian-primary text-white rounded-full text-xs font-bold">
              {count}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 border-t border-gray-100 bg-gray-50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFilters;
