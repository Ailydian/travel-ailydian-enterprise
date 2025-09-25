import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Search, Users, TrendingUp, Eye, MessageSquare, CheckCircle } from 'lucide-react';
import PremiumLogo from '@/components/ui/PremiumLogo';
import ParachuteAnimation from '@/components/animations/ParachuteAnimation';

const featuredBusinesses = [
  {
    id: 1,
    name: 'Sultanahmet Restaurant',
    category: 'Turkish Restaurant',
    location: 'Fatih, İstanbul',
    rating: 4.7,
    reviewCount: 2847,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    verified: true,
    status: 'Open'
  },
  {
    id: 2,
    name: 'Cappadocia Cave Hotel',
    category: 'Hotel',
    location: 'Göreme, Nevşehir',
    rating: 4.9,
    reviewCount: 1653,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?w=400&h=300&fit=crop',
    verified: true,
    status: 'Open'
  }
];

export default function BusinessPage() {
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
              <Link href="/reviews" className="header-neon hover:text-blue-300 transition-colors">İncelemeler</Link>
              <Link href="/business" className="text-blue-400 font-semibold premium-neon-accent">İşletmeler</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-16 text-center" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 premium-neon-text">
            Business <span className="premium-neon-accent">Directory</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8" style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            İşletmenizi listeleyin ve daha fazla müşteriye ulaşın
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
                  placeholder="İşletme adı, kategori veya lokasyon ara..."
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
            Öne Çıkan <span className="premium-neon-accent">İşletmeler</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBusinesses.map((business) => (
              <div key={business.id} className="bg-white/95 backdrop-blur-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 neon-glow">
                <div className="relative">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-48 object-cover"
                  />
                  {business.verified && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{business.category}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {business.location}
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(Math.floor(business.rating))}
                    <span className="text-sm font-medium">{business.rating}</span>
                    <span className="text-xs text-gray-500">({business.reviewCount})</span>
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