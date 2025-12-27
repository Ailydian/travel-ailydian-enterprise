import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Sparkles,
  Clock,
  Sun,
  Cloud,
  CheckCircle,
  XCircle,
  Download,
  Share2,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Hotel,
  Utensils,
  Camera,
  Car,
  Plane,
  Activity,
  TrendingUp,
  ThumbsUp,
  Navigation,
  Globe
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import logger from '../../../../lib/logger';

interface TripPreferences {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  travelers: number;
  budget: number;
  interests: string[];
  travelStyle: string;
}

interface ItineraryDay {
  day: number;
  date: Date;
  title: string;
  activities: Activity[];
  meals: Meal[];
  accommodation?: Accommodation;
  weather?: Weather;
  totalCost: number;
  travelTime: number;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'attraction' | 'activity' | 'transportation' | 'free-time';
  location: string;
  coordinates?: { lat: number; lng: number };
  duration: number; // minutes
  cost: number;
  currency: string;
  bookingUrl?: string;
  availability: 'available' | 'limited' | 'unavailable';
  rating?: number;
  reviews?: number;
  aiConfidence: number;
  alternatives?: Activity[];
}

interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  restaurant: string;
  cuisine: string;
  cost: number;
  rating?: number;
  mustTry?: boolean;
}

interface Accommodation {
  name: string;
  type: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  location: string;
  bookingUrl?: string;
}

interface Weather {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  precipitation: number;
}

interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transportation: number;
  miscellaneous: number;
  total: number;
}

const EnhancedTripPlanner: React.FC = () => {
  const [step, setStep] = useState<'input' | 'generating' | 'itinerary'>('input');
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    startDate: null,
    endDate: null,
    travelers: 2,
    budget: 2000,
    interests: [],
    travelStyle: 'balanced'
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [optimizationMode, setOptimizationMode] = useState<'budget' | 'time' | 'quality'>('balanced' as any);

  const interests = [
    'History', 'Food', 'Culture', 'Adventure', 'Relaxation',
    'Shopping', 'Nightlife', 'Nature', 'Photography', 'Architecture'
  ];

  const travelStyles = [
    { value: 'budget', label: 'Budget Friendly', icon: DollarSign },
    { value: 'balanced', label: 'Balanced', icon: TrendingUp },
    { value: 'luxury', label: 'Luxury', icon: Sparkles }
  ];

  const handleGenerateItinerary = async () => {
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    setStep('generating');

    try {
      const response = await fetch('/api/ai/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });

      if (!response.ok) throw new Error('Failed to generate itinerary');

      const data = await response.json();
      setItinerary(data.itinerary);
      setBudgetBreakdown(data.budgetBreakdown);
      setStep('itinerary');
    } catch (err: any) {
      setError(err.message || 'Failed to generate itinerary');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    // Implement PDF export
    logger.debug('Exporting to PDF...', { component: 'Enhancedtripplanner' });
  };

  const exportToCalendar = async () => {
    // Implement calendar export (ICS format)
    logger.debug('Exporting to calendar...', { component: 'Enhancedtripplanner' });
  };

  const shareItinerary = async () => {
    // Implement sharing functionality
    logger.debug('Sharing itinerary...', { component: 'Enhancedtripplanner' });
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const getDayIcon = (type: string) => {
    switch (type) {
      case 'attraction': return Camera;
      case 'activity': return Activity;
      case 'transportation': return Car;
      case 'free-time': return Clock;
      default: return MapPin;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white">
                AI-Powered Trip Planner
              </h1>
              <p className="text-xl text-gray-300">
                Tell us what you want, and we&apos;ll create the perfect itinerary
              </p>
            </div>

            {/* Natural Language Input */}
            <div className="bg-white/5 rounded-2xl shadow-xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Describe Your Dream Trip
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="e.g., 5-day Istanbul trip for 2 people, budget $2000, love history and food"
                  onChange={(e) => {
                    // Simple NLP parsing (in production, use OpenAI for better parsing)
                    const text = e.target.value.toLowerCase();
                    const budgetMatch = text.match(/\$?(\d+)/);
                    const travelersMatch = text.match(/(\d+)\s*(people|person|travelers?)/);

                    if (budgetMatch) {
                      setPreferences(prev => ({ ...prev, budget: parseInt(budgetMatch[1]) }));
                    }
                    if (travelersMatch) {
                      setPreferences(prev => ({ ...prev, travelers: parseInt(travelersMatch[1]) }));
                    }
                  }}
                />
              </div>

              {/* Destination */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Destination
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Istanbul, Turkey"
                    value={preferences.destination}
                    onChange={(e) => setPreferences({ ...preferences, destination: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={preferences.travelers}
                    onChange={(e) => setPreferences({ ...preferences, travelers: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white [color-scheme:light]"
                    style={{ colorScheme: 'light' }}
                    onChange={(e) => setPreferences({ ...preferences, startDate: new Date(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white [color-scheme:light]"
                    style={{ colorScheme: 'light' }}
                    onChange={(e) => setPreferences({ ...preferences, endDate: new Date(e.target.value) })}
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Total Budget: ${preferences.budget}
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  className="w-full"
                  value={preferences.budget}
                  onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$500</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-3">
                  Travel Style
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {travelStyles.map((style) => {
                    const Icon = style.icon;
                    return (
                      <button
                        key={style.value}
                        onClick={() => setPreferences({ ...preferences, travelStyle: style.value })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          preferences.travelStyle === style.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-white/10 hover:border-purple-300'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${
                          preferences.travelStyle === style.value ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                        <div className="text-sm font-medium">{style.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-3">
                  What interests you?
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        preferences.interests.includes(interest)
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerateItinerary}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generate AI Itinerary
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'generating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Creating Your Perfect Itinerary</h2>
            <div className="space-y-2 text-center">
              <p className="text-gray-300">Analyzing {preferences.destination}...</p>
              <p className="text-gray-300">Finding best attractions and activities...</p>
              <p className="text-gray-300">Optimizing routes and timing...</p>
              <p className="text-gray-300">Checking weather and availability...</p>
            </div>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
              />
            </div>
          </motion.div>
        )}

        {step === 'itinerary' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="bg-white/5 rounded-2xl shadow-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {preferences.destination} Trip Itinerary
                  </h1>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{itinerary.length} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{preferences.travelers} travelers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${preferences.budget} budget</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={exportToPDF}
                    className="px-4 py-2 bg-white/10 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={exportToCalendar}
                    className="px-4 py-2 bg-white/10 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Calendar
                  </button>
                  <button
                    onClick={shareItinerary}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            {budgetBreakdown && (
              <div className="bg-white/5 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Budget Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(budgetBreakdown).map(([key, value]) => (
                    key !== 'total' && (
                      <div key={key} className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">${value}</div>
                        <div className="text-sm text-gray-300 capitalize">{key}</div>
                      </div>
                    )
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-purple-600">
                      ${budgetBreakdown.total}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Day Tabs */}
            <div className="bg-white/5 rounded-2xl shadow-xl p-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {itinerary.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                      selectedDay === index
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">Day {day.day}</div>
                    <div className="text-xs opacity-75">
                      {format(day.date, 'MMM dd')}
                    </div>
                  </button>
                ))}
              </div>

              {/* Day Content */}
              {itinerary[selectedDay] && (
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-6 space-y-4"
                >
                  {/* Day Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {itinerary[selectedDay].title}
                      </h3>
                      <p className="text-gray-300 mt-1">
                        {format(itinerary[selectedDay].date, 'EEEE, MMMM dd, yyyy')}
                      </p>
                    </div>
                    {itinerary[selectedDay].weather && (
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                        <Sun className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">{itinerary[selectedDay].weather.temp}°C</div>
                          <div className="text-xs text-gray-300">{itinerary[selectedDay].weather.condition}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4 mt-6">
                    {itinerary[selectedDay].activities.map((activity, idx) => {
                      const Icon = getDayIcon(activity.type);
                      return (
                        <div key={activity.id} className="relative pl-8">
                          {idx < itinerary[selectedDay].activities.length - 1 && (
                            <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200" />
                          )}
                          <div className="absolute left-0 top-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <Icon className="w-3 h-3 text-white" />
                          </div>

                          <div className="bg-white/5 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-purple-600">
                                    {activity.time}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {activity.duration} min
                                  </span>
                                </div>
                                <h4 className="text-lg font-semibold text-white mt-1">
                                  {activity.title}
                                </h4>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-white">
                                  ${activity.cost}
                                </div>
                                {activity.rating && (
                                  <div className="flex items-center gap-1 text-xs text-gray-300">
                                    <ThumbsUp className="w-3 h-3" />
                                    {activity.rating}/5
                                  </div>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-gray-300 mb-2">{activity.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />
                                {activity.location}
                              </div>

                              <div className="flex items-center gap-2">
                                {activity.availability === 'available' ? (
                                  <span className="flex items-center gap-1 text-xs text-green-600">
                                    <CheckCircle className="w-3 h-3" />
                                    Available
                                  </span>
                                ) : activity.availability === 'limited' ? (
                                  <span className="flex items-center gap-1 text-xs text-yellow-600">
                                    <AlertCircle className="w-3 h-3" />
                                    Limited
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-xs text-red-600">
                                    <XCircle className="w-3 h-3" />
                                    Unavailable
                                  </span>
                                )}

                                {activity.bookingUrl && (
                                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                                    Book Now
                                  </button>
                                )}
                              </div>
                            </div>

                            {activity.aiConfidence < 0.8 && (
                              <div className="mt-2 pt-2 border-t border-white/10">
                                <button className="text-xs text-gray-300 hover:text-white flex items-center gap-1">
                                  <RefreshCw className="w-3 h-3" />
                                  View alternatives
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Summary */}
                  <div className="bg-purple-50 rounded-lg p-4 mt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span>{itinerary[selectedDay].travelTime} min travel</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-purple-600" />
                          <span>${itinerary[selectedDay].totalCost} total</span>
                        </div>
                      </div>
                      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        Customize Day
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-white/5 rounded-2xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                  Book All Activities
                </button>
                <button className="flex-1 py-3 bg-white/5 hover:bg-white/5 text-purple-600 border-2 border-purple-600 rounded-lg font-semibold transition-colors">
                  Invite Collaborators
                </button>
                <button
                  onClick={() => setStep('input')}
                  className="flex-1 py-3 bg-white/10 hover:bg-gray-200 text-gray-200 rounded-lg font-semibold transition-colors"
                >
                  Create New Trip
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedTripPlanner;
