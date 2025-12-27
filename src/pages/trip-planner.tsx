import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Map as MapIcon,
  List,
  Share2,
  Save,
  Download,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { format } from 'date-fns';
import EnhancedTripPlanner from '@/components/ai/EnhancedTripPlanner';
import CollaborativePlanning from '@/components/ai/CollaborativePlanning';
import logger from '../lib/logger';

// Dynamically import map component (client-side only)
const InteractiveMap = dynamic(
  () => import('@/components/maps/InteractiveMap'),
  { ssr: false }
);

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelers: number;
  status: string;
}

const TripPlannerPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'planner' | 'itinerary' | 'map' | 'collaborate'>('planner');
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [showWizard, setShowWizard] = useState(true);
  const [mapLocations, setMapLocations] = useState<any[]>([]);

  // Mock current user (in production, get from auth)
  const currentUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined
  };

  useEffect(() => {
    loadSavedTrips();
  }, []);

  const loadSavedTrips = async () => {
    // Load trips from API
    // const response = await fetch('/api/trips/list');
    // const data = await response.json();
    // setSavedTrips(data.trips);
  };

  const handleTripCreated = (trip: any) => {
    setCurrentTrip(trip);
    setShowWizard(false);
    setActiveView('itinerary');
  };

  const handleSaveTrip = async () => {
    if (!currentTrip) return;

    try {
      const response = await fetch('/api/trips/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTrip)
      });

      if (response.ok) {
        const data = await response.json();
        logger.debug('Trip saved:', {component:'TripPlanner', metadata:{data}});
        // Show success notification
      }
    } catch (error) {
      logger.error('Failed to save trip:', error as Error, {component:'TripPlanner'});
    }
  };

  const getViewIcon = (view: string) => {
    switch (view) {
      case 'planner': return Sparkles;
      case 'itinerary': return List;
      case 'map': return MapIcon;
      case 'collaborate': return Users;
      default: return Sparkles;
    }
  };

  return (
    <>
      <Head>
        <title>AI Trip Planner - Collaborative Travel Planning | LyDian</title>
        <meta
          name="description"
          content="Plan your perfect trip with AI-powered itinerary generation. Collaborate with friends, vote on activities, and book everything in one place."
        />
        <meta name="keywords" content="trip planner, AI travel, collaborative planning, itinerary generator, travel booking" />
        <meta property="og:title" content="AI Trip Planner - Collaborative Travel Planning" />
        <meta property="og:description" content="Plan your perfect trip with AI-powered itinerary generation" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Header */}
        <header className="bg-transparent shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">AI Trip Planner</h1>
                  <p className="text-sm text-gray-100">Powered by OpenAI GPT-4</p>
                </div>
              </div>

              {currentTrip && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveTrip}
                    className="px-4 py-2 bg-white/10 hover:bg-gray-200 text-gray-200 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setActiveView('collaborate')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              )}
            </div>

            {/* View Tabs */}
            {!showWizard && (
              <div className="flex gap-2 mt-4 border-t border-gray-200 pt-4">
                {[
                  { key: 'planner', label: 'Plan', icon: Sparkles },
                  { key: 'itinerary', label: 'Itinerary', icon: List },
                  { key: 'map', label: 'Map View', icon: MapIcon },
                  { key: 'collaborate', label: 'Collaborate', icon: Users }
                ].map((view) => {
                  const Icon = view.icon;
                  return (
                    <button
                      key={view.key}
                      onClick={() => setActiveView(view.key as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === view.key
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-white/10 text-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {view.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          <AnimatePresence mode="wait">
            {activeView === 'planner' && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EnhancedTripPlanner />
              </motion.div>
            )}

            {activeView === 'itinerary' && currentTrip && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4"
              >
                <div className="bg-transparent rounded-2xl shadow-xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {currentTrip.title}
                      </h2>
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {currentTrip.destination}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(currentTrip.startDate, 'MMM dd')} - {format(currentTrip.endDate, 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {currentTrip.travelers} travelers
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${currentTrip.budget}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white/10 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Timeline view of itinerary would go here */}
                  <div className="text-center py-12 text-gray-400">
                    <List className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Detailed itinerary view</p>
                    <p className="text-sm">Timeline with activities, meals, and accommodations</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4"
              >
                <div className="bg-transparent rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-[600px] relative">
                    {/* Map component would be rendered here */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white/10">
                      <div className="text-center">
                        <MapIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-300">Interactive map showing all locations</p>
                        <p className="text-sm text-gray-200 mt-2">
                          Markers for hotels, attractions, restaurants, and activities
                        </p>
                      </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 bg-transparent rounded-lg shadow-lg p-2 space-y-2">
                      <button className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 rounded transition-colors">
                        Show All
                      </button>
                      <button className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 rounded transition-colors">
                        Hotels Only
                      </button>
                      <button className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 rounded transition-colors">
                        Attractions
                      </button>
                      <button className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 rounded transition-colors">
                        Restaurants
                      </button>
                    </div>

                    {/* Location List */}
                    <div className="absolute bottom-4 left-4 right-4 bg-transparent rounded-lg shadow-lg p-4 max-h-48 overflow-y-auto">
                      <h4 className="font-semibold text-white mb-2">Trip Locations</h4>
                      <div className="space-y-2">
                        {/* Mock locations */}
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded cursor-pointer">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-white">Location {i}</span>
                            </div>
                            <button className="text-xs text-purple-600 hover:text-purple-700">
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'collaborate' && currentTrip && (
              <motion.div
                key="collaborate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CollaborativePlanning
                  tripId={currentTrip.id}
                  currentUser={currentUser}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Budget Tracker Sidebar */}
        {currentTrip && (
          <div className="fixed right-4 bottom-4 bg-transparent rounded-2xl shadow-2xl p-4 w-64 z-30">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Budget Tracker
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Total Budget</span>
                <span className="font-semibold text-white">${currentTrip.budget}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Spent</span>
                <span className="font-semibold text-green-600">$0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Remaining</span>
                <span className="font-semibold text-purple-600">${currentTrip.budget}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600" style={{ width: '0%' }} />
              </div>
            </div>
            <button className="w-full mt-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
              Book All
            </button>
          </div>
        )}

        {/* Floating Action Button */}
        {!showWizard && (
          <button
            onClick={() => setShowWizard(true)}
            className="fixed left-4 bottom-4 w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-shadow flex items-center justify-center z-30"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default TripPlannerPage;
