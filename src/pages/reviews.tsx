import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Search, Filter, Heart, Camera, ThumbsUp, MessageSquare, Share2, Verified, Award } from 'lucide-react';
import PremiumLogo from '@/components/ui/PremiumLogo';
import ParachuteAnimation from '@/components/animations/ParachuteAnimation';

const topDestinations = [
  {
    id: 1,
    name: 'Hagia Sophia',
    location: 'İstanbul, Türkiye',
    rating: 4.8,
    reviewCount: 45821,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop',
    category: 'Historic Sites',
    verified: true,
    awards: ['Travellers Choice 2024', 'Certificate of Excellence']
  },
  {
    id: 2,
    name: 'Cappadocia Hot Air Balloons',
    location: 'Nevşehir, Türkiye',
    rating: 4.9,
    reviewCount: 28416,
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=300&fit=crop',
    category: 'Outdoor Activities',
    verified: true,
    awards: ['Travellers Choice 2024', 'Hall of Fame']
  }
];

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative" style={{ color: 'var(--tx-1)' }}>
      <div className="premium-ocean-bg"></div>
      <div className="ocean-waves-overlay"></div>
      <ParachuteAnimation />

      <header className="relative z-20 shadow-sm border-b" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderBottomColor: 'var(--ac-1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <PremiumLogo size="medium" variant="full" />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="header-neon hover:text-blue-300 transition-colors">Ana Sayfa</Link>
              <Link href="/destinations" className="header-neon hover:text-blue-300 transition-colors">Destinasyonlar</Link>
              <Link href="/reviews" className="text-blue-400 font-semibold premium-neon-accent">İncelemeler</Link>
              <Link href="/business" className="header-neon hover:text-blue-300 transition-colors">İşletmeler</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-16 text-center" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 premium-neon-text">
            Travelers <span className="premium-neon-accent">Reviews</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8" style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            Milyonlarca gerçek gezginin deneyimlerini keşfedin
          </p>
        </div>
      </section>

      <section className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-20 rounded-2xl p-6 shadow-2xl neon-glow">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Destinasyon, otel, restoran ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="ocean-button px-6 py-3 rounded-xl">
                Ara
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center premium-neon-text">
            En Çok <span className="premium-neon-accent">İncelenen</span> Yerler
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {topDestinations.map((destination) => (
              <div key={destination.id} className="bg-white/95 backdrop-blur-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 neon-glow">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  {destination.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Verified className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
                  <div className="flex items-center text-sm text-gray-300 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.location}
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(Math.floor(destination.rating))}
                    <span className="text-sm font-medium">{destination.rating}</span>
                    <span className="text-sm text-gray-500">({destination.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}