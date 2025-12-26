/**
 * AI-Powered Recommendations Widget - Claude Innovation
 * Personalized tour suggestions based on viewing behavior and preferences
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  Heart,
  MapPin,
  Star,
  ChevronRight,
  X,
  RefreshCw,
  Zap,
  Target,
  Brain
} from 'lucide-react';

interface Tour {
  id: string | number;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  matchScore?: number;
}

interface AIRecommendationsProps {
  currentTour?: Tour;
  userPreferences?: {
    categories?: string[];
    priceRange?: [number, number];
    locations?: string[];
  };
  className?: string;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  currentTour,
  userPreferences,
  className = ''
}) => {
  const [recommendations, setRecommendations] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Simulated AI recommendations (in production, this would call an AI API)
  useEffect(() => {
    setIsLoading(true);

    // Simulate AI processing delay
    const timer = setTimeout(() => {
      const mockRecommendations: Tour[] = [
        {
          id: 1,
          title: 'Kapadokya Balon Turu - Gündoğumu',
          location: 'Kapadokya, Türkiye',
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&q=90',
          price: 899,
          rating: 4.9,
          category: 'Macera',
          matchScore: 95
        },
        {
          id: 2,
          title: 'Pamukkale ve Hierapolis Antik Kenti',
          location: 'Denizli, Türkiye',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&q=90',
          price: 349,
          rating: 4.8,
          category: 'Kültür',
          matchScore: 88
        },
        {
          id: 3,
          title: 'Efes Antik Kenti Premium Turu',
          location: 'İzmir, Türkiye',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&q=90',
          price: 449,
          rating: 4.7,
          category: 'Tarihi',
          matchScore: 82
        }
      ];

      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentTour, userPreferences]);

  const refreshRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Shuffle recommendations
      setRecommendations(prev => [...prev].sort(() => Math.random() - 0.5));
      setIsLoading(false);
    }, 1000);
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`fixed top-20 right-4 z-40 hidden lg:block ${className}`}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {recommendations.length}
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              AI Önerilerim
            </div>
          </div>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`fixed top-20 right-4 w-96 max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-purple-100 z-40 overflow-hidden hidden lg:block ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Brain className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                <Sparkles className="w-3 h-3 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Önerilerim</h3>
              <p className="text-xs text-purple-100">Senin için seçtim</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshRecommendations}
              disabled={isLoading}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Yenile"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Küçült"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Explanation Toggle */}
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs text-purple-100 hover:text-white flex items-center gap-1 transition-colors"
        >
          <Target className="w-3 h-3" />
          <span>{showExplanation ? 'Açıklamayı Gizle' : 'Nasıl seçtim?'}</span>
        </button>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 text-xs text-purple-100 bg-white/10 rounded-lg p-2"
            >
              <p>🧠 Tercihlerini, son ziyaretlerini ve popüler trendleri analiz ederek bu turları seçtim.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recommendations List */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          // Loading Skeletons
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </>
        ) : (
          recommendations.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/tours/${typeof tour.title === 'string' ? tour.title.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-') : '#'}`}>
                <div className="group flex gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-purple-200">
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Match Score Badge */}
                    <div className="absolute top-1 right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      %{tour.matchScore}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {tour.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{tour.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium">{tour.rating}</span>
                      </div>
                      <div className="text-sm font-bold text-purple-600">
                        ₺{tour.price}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0 self-center" />
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-purple-700">
            <Zap className="w-3 h-3" />
            <span className="font-medium">Anlık AI Önerileri</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <TrendingUp className="w-3 h-3" />
            <span>{recommendations.length} öneri</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
