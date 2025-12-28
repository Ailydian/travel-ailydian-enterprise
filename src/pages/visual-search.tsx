import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import {
  SparklesIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  FunnelIcon,
  ArrowPathIcon,
  BookmarkIcon,
  ShareIcon,
  ExclamationTriangleIcon } from
'@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import DemoBadge from '../components/ui/DemoBadge';
import VisualSearch from '@/components/search/VisualSearch';
import {
  VisualSearchResult,
  ImageAnalysis,
  SearchHistoryItem } from
'@/types/visualSearch';

const VisualSearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<VisualSearchResult[]>([]);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysis | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'similarity' | 'rating' | 'price'>('similarity');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Example images for demonstration
  const exampleImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    title: 'Beach Paradise',
    description: 'Find similar beaches'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    title: 'Luxury Hotel',
    description: 'Find similar hotels'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    title: 'Historic Architecture',
    description: 'Find similar places'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    title: 'Fine Dining',
    description: 'Find similar restaurants'
  }];


  // Handle search results
  const handleSearchResults = (results: VisualSearchResult[], analysis: ImageAnalysis) => {
    setSearchResults(results);
    setImageAnalysis(analysis);
    setShowAnalysis(true);

    // Add to search history
    const historyItem: SearchHistoryItem = {
      id: `history_${Date.now()}`,
      imageUrl: results[0]?.imageUrl || '',
      thumbnailUrl: results[0]?.imageUrl || '',
      timestamp: new Date(),
      analysis,
      resultCount: results.length,
      topMatch: results[0]
    };
    setSearchHistory([historyItem, ...searchHistory.slice(0, 9)]);
  };

  // Filter and sort results
  const filteredResults = searchResults.
  filter((result) => selectedFilter === 'all' || result.type === selectedFilter).
  sort((a, b) => {
    switch (sortBy) {
      case 'similarity':
        return b.similarityScore - a.similarityScore;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price':
        return (a.price?.amount || 0) - (b.price?.amount || 0);
      default:
        return 0;
    }
  });

  return (
    <>
      <Head>
        <title>Visual Search - AI-Powered Image Search | Travel LyDian</title>
        <meta
          name="description"
          content="Search for destinations, hotels, and experiences using images. Upload a photo and discover similar travel opportunities with AI-powered visual search." />

      </Head>

      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Demo Badge */}
        <div className="absolute top-6 right-6 z-50">
          <DemoBadge
            variant="beta"
            size="lg"
            tooltip="Visual search is in beta. Basic image similarity matching. Advanced AI vision model integration coming soon."
          />
        </div>

        {/* Beta Notice Banner */}
        <div className="bg-indigo-50 border-b border-indigo-200 text-indigo-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Visual Search - Beta Feature</p>
              <p className="text-sm mt-1">
                Our visual search is currently in beta with basic image similarity matching. Advanced AI vision model integration is underway for more accurate destination and property matching.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-lydian-bg-hover border-b border-lydian-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-lydian-primary to-lydian-secondary rounded-xl">
                <SparklesIcon className="w-8 h-8 text-lydian-text-inverse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-lydian-text-inverse">Visual Search</h1>
                <p className="text-lydian-text-dim mt-1">
                  Discover travel destinations through the power of AI vision
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload & Examples */}
            <div className="lg:col-span-1 space-y-6">
              {/* Upload Section */}
              <div className="bg-lydian-bg-hover rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-lydian-text-inverse mb-4">
                  Upload Image
                </h2>
                <VisualSearch
                  onSearch={handleSearchResults}
                  maxFileSize={5}
                  autoSearch={true} />

              </div>

              {/* Example Images */}
              <div className="bg-lydian-bg-hover rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-lydian-text-inverse mb-4">
                  Try These Examples
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {exampleImages.map((example) =>
                  <motion.button
                    key={example.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative rounded-xl overflow-hidden aspect-square">

                      <img
                      src={example.url}
                      alt={example.title}
                      className="w-full h-full object-cover" />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-lydian-text-inverse font-semibold text-sm">
                            {example.title}
                          </p>
                          <p className="text-lydian-text-inverse/80 text-xs">
                            {example.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Search History */}
              {searchHistory.length > 0 &&
              <div className="bg-lydian-bg-hover rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-lydian-text-inverse mb-4 flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-lydian-text-dim" />
                    Recent Searches
                  </h3>
                  <div className="space-y-3">
                    {searchHistory.slice(0, 5).map((item) =>
                  <button
                    key={item.id}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-lydian-glass-dark transition-colors duration-200">

                        <img
                      src={item.thumbnailUrl}
                      alt="Search history"
                      className="w-12 h-12 rounded-lg object-cover" />

                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-lydian-text-inverse">
                            {item.resultCount} results
                          </p>
                          <p className="text-xs text-lydian-text-muted">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </button>
                  )}
                  </div>
                </div>
              }
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2">
              {searchResults.length === 0 ?
              // Empty State
              <div className="bg-lydian-bg-hover rounded-2xl shadow-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
                    <SparklesIcon className="w-12 h-12 text-lydian-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-lydian-text-inverse mb-3">
                    Start Your Visual Search
                  </h3>
                  <p className="text-lydian-text-dim max-w-md mx-auto mb-8">
                    Upload an image or try one of our examples to discover amazing
                    travel destinations, hotels, and experiences that match your vision.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
                    <div className="p-4 bg-lydian-primary-lighter rounded-xl">
                      <div className="w-10 h-10 bg-lydian-primary rounded-lg flex items-center justify-center mb-3">
                        <SparklesIcon className="w-6 h-6 text-lydian-text-inverse" />
                      </div>
                      <h4 className="font-semibold text-lydian-text-inverse mb-1">
                        AI-Powered Analysis
                      </h4>
                      <p className="text-sm text-lydian-text-dim">
                        Advanced computer vision detects landmarks, scenery, and more
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                        <MapPinIcon className="w-6 h-6 text-lydian-text-inverse" />
                      </div>
                      <h4 className="font-semibold text-lydian-text-inverse mb-1">
                        Smart Matching
                      </h4>
                      <p className="text-sm text-lydian-text-dim">
                        Find destinations with similar features and atmosphere
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-xl">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mb-3">
                        <StarIcon className="w-6 h-6 text-lydian-text-inverse" />
                      </div>
                      <h4 className="font-semibold text-lydian-text-inverse mb-1">
                        Ranked Results
                      </h4>
                      <p className="text-sm text-lydian-text-dim">
                        Results sorted by similarity score and confidence
                      </p>
                    </div>
                  </div>
                </div> :

              <>
                  {/* Image Analysis */}
                  <AnimatePresence>
                    {showAnalysis && imageAnalysis &&
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-lydian-bg-hover rounded-2xl shadow-lg p-6 mb-6">

                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-lydian-text-inverse">
                            Image Analysis
                          </h3>
                          <button
                        onClick={() => setShowAnalysis(false)}
                        className="text-lydian-text-muted hover:text-lydian-text-muted">

                            Hide
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imageAnalysis.sceneryType.length > 0 &&
                      <div>
                              <p className="text-sm font-semibold text-lydian-text-muted mb-2">
                                Scenery
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {imageAnalysis.sceneryType.map((type, index) =>
                          <span
                            key={index}
                            className="px-3 py-1 bg-lydian-primary-light text-lydian-primary-dark rounded-full text-xs font-medium">

                                    {type}
                                  </span>
                          )}
                              </div>
                            </div>
                      }

                          {imageAnalysis.architectureStyle.length > 0 &&
                      <div>
                              <p className="text-sm font-semibold text-lydian-text-muted mb-2">
                                Architecture
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {imageAnalysis.architectureStyle.map((style, index) =>
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">

                                    {style}
                                  </span>
                          )}
                              </div>
                            </div>
                      }

                          {imageAnalysis.atmosphere &&
                      <div>
                              <p className="text-sm font-semibold text-lydian-text-muted mb-2">
                                Atmosphere
                              </p>
                              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                                {imageAnalysis.atmosphere}
                              </span>
                            </div>
                      }

                          {imageAnalysis.landmarks.length > 0 &&
                      <div>
                              <p className="text-sm font-semibold text-lydian-text-muted mb-2">
                                Landmarks
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {imageAnalysis.landmarks.map((landmark, index) =>
                          <span
                            key={index}
                            className="px-3 py-1 bg-lydian-success-light text-lydian-success-text rounded-full text-xs font-medium">

                                    {landmark}
                                  </span>
                          )}
                              </div>
                            </div>
                      }
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>

                  {/* Filters and Sort */}
                  <div className="bg-lydian-bg-hover rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      {/* Filter Buttons */}
                      <div className="flex items-center space-x-2">
                        <FunnelIcon className="w-5 h-5 text-lydian-text-dim" />
                        <div className="flex flex-wrap gap-2">
                          {['all', 'destination', 'hotel', 'restaurant', 'activity'].map(
                          (filter) =>
                          <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                            selectedFilter === filter ?
                            'bg-blue-600 text-white' :
                            'bg-white/10 text-gray-200 hover:bg-gray-200'}`
                            }>

                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                              </button>

                        )}
                        </div>
                      </div>

                      {/* Sort Dropdown */}
                      <div className="flex items-center space-x-2">
                        <ArrowPathIcon className="w-5 h-5 text-lydian-text-dim" />
                        <select
                        value={sortBy}
                        onChange={(e) =>
                        setSortBy(e.target.value as 'similarity' | 'rating' | 'price')
                        }
                        className="px-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:border-lydian-primary focus:ring-2 focus:ring-blue-200">

                          <option value="similarity">Sort by Similarity</option>
                          <option value="rating">Sort by Rating</option>
                          <option value="price">Sort by Price</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-sm text-lydian-text-dim mt-4">
                      Found {filteredResults.length} results
                    </p>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResults.map((result, index) =>
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-lydian-bg-hover rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

                        {/* Image */}
                        <div className="relative h-48">
                          <img
                        src={result.imageUrl}
                        alt={result.name}
                        className="w-full h-full object-cover" />


                          {/* Similarity Badge */}
                          <div className="absolute top-4 right-4 px-3 py-1 bg-lydian-bg/90 backdrop-blur-sm rounded-full">
                            <div className="flex items-center space-x-1">
                              <SparklesIcon className="w-4 h-4 text-lydian-primary" />
                              <span className="text-sm font-bold text-lydian-text-inverse">
                                {Math.round(result.similarityScore * 100)}%
                              </span>
                            </div>
                          </div>

                          {/* Type Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 bg-lydian-primary rounded-full">
                            <span className="text-xs font-semibold text-lydian-text-inverse uppercase">
                              {result.type}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-lydian-text-inverse">
                              {result.name}
                            </h3>
                            <button className="text-lydian-text-muted hover:text-lydian-primary transition-colors">
                              <BookmarkIcon className="w-6 h-6" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-2 mb-3">
                            <MapPinIcon className="w-4 h-4 text-lydian-text-muted" />
                            <span className="text-sm text-lydian-text-dim">{result.location}</span>
                          </div>

                          {result.rating &&
                      <div className="flex items-center space-x-2 mb-3">
                              <div className="flex">
                                {[...Array(5)].map((_, i) =>
                          <StarIconSolid
                            key={i}
                            className={`w-4 h-4 ${
                            i < Math.floor(result.rating!) ?
                            'text-yellow-400' :
                            'text-gray-300'}`
                            } />

                          )}
                              </div>
                              <span className="text-sm font-semibold text-lydian-text-inverse">
                                {result.rating}
                              </span>
                              <span className="text-sm text-lydian-text-muted">
                                ({result.reviewCount} reviews)
                              </span>
                            </div>
                      }

                          <p className="text-lydian-text-dim mb-4 line-clamp-2">
                            {result.description}
                          </p>

                          {/* Match Reasons */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-lydian-text-muted mb-2">
                              Why this matches:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {result.matchReasons.slice(0, 3).map((reason, i) =>
                          <span
                            key={i}
                            className="px-2 py-1 bg-lydian-success-light text-lydian-success-text rounded-full text-xs">

                                  {reason}
                                </span>
                          )}
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex items-center justify-between pt-4 border-t border-lydian-border">
                            {result.price &&
                        <div>
                                <p className="text-2xl font-bold text-lydian-primary">
                                  {result.price.amount} {result.price.currency}
                                </p>
                                <p className="text-xs text-lydian-text-muted">per night</p>
                              </div>
                        }

                            <div className="flex space-x-2">
                              <button className="p-2 bg-lydian-glass-dark-medium hover:bg-lydian-bg-active rounded-lg transition-colors">
                                <ShareIcon className="w-5 h-5 text-lydian-text-muted" />
                              </button>
                              <button className="px-6 py-2 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] hover:from-lydian-primary-dark hover:to-purple-700 text-lydian-text-inverse rounded-lg font-semibold transition-all duration-200">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                  )}
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default VisualSearchPage;