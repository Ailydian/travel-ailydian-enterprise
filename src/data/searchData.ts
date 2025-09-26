// Header arama motoru için mock data
export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'destination' | 'experience' | 'hotel' | 'flight' | 'activity';
  image?: string;
  price?: string;
  rating?: number;
  url: string;
}

export const searchMockData: SearchResult[] = [
  // Destinasyonlar
  {
    id: 'istanbul',
    title: 'İstanbul',
    subtitle: 'Tarihi Yarımada, Boğaz Turu, Kapalı Çarşı',
    category: 'destination',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=100&h=100&q=90',
    rating: 4.8,
    url: '/destinations/istanbul'
  },
  {
    id: 'kapadokya',
    title: 'Kapadokya',
    subtitle: 'Balon Turu, Peri Bacaları, Yeraltı Şehirleri',
    category: 'destination',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=100&h=100&q=90',
    rating: 4.9,
    url: '/destinations/kapadokya'
  },
  {
    id: 'antalya',
    title: 'Antalya',
    subtitle: 'Akdeniz, Antik Şehirler, Plajlar',
    category: 'destination',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&q=90',
    rating: 4.7,
    url: '/destinations/antalya'
  },
  {
    id: 'bodrum',
    title: 'Bodrum',
    subtitle: 'Marina, Gece Hayatı, Antik Tiyatro',
    category: 'destination',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=100&h=100&q=90',
    rating: 4.8,
    url: '/destinations/bodrum'
  },
  {
    id: 'pamukkale',
    title: 'Pamukkale',
    subtitle: 'Travertenler, Termal Havuzlar, Hierapolis',
    category: 'destination',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=100&h=100&q=90',
    rating: 4.6,
    url: '/destinations/pamukkale'
  },
  
  // Deneyimler
  {
    id: 'bogaz-turu',
    title: 'AI Rehberli Boğaz Turu',
    subtitle: 'İstanbul - 2 saat',
    category: 'experience',
    price: '₺120',
    rating: 4.8,
    url: '/experiences/bogaz-turu'
  },
  {
    id: 'balon-turu',
    title: 'VR Teknolojili Balon Turu',
    subtitle: 'Kapadokya - 3 saat',
    category: 'experience',
    price: '₺320',
    rating: 4.9,
    url: '/experiences/balon-turu'
  },
  {
    id: 'blockchain-tur',
    title: 'Blockchain Şehir Turu',
    subtitle: 'İstanbul - 4 saat',
    category: 'experience',
    price: '₺240',
    rating: 4.7,
    url: '/experiences/blockchain-tur'
  },
  {
    id: 'dalma-turu',
    title: 'Sualtı Dalma Deneyimi',
    subtitle: 'Antalya - 5 saat',
    category: 'experience',
    price: '₺180',
    rating: 4.6,
    url: '/experiences/dalma-turu'
  },
  {
    id: 'wellness-spa',
    title: 'Termal Spa & Wellness',
    subtitle: 'Pamukkale - 6 saat',
    category: 'experience',
    price: '₺95',
    rating: 4.5,
    url: '/experiences/wellness-spa'
  },
  
  // Oteller
  {
    id: 'istanbul-luxury-hotel',
    title: 'Four Seasons Sultanahmet',
    subtitle: 'İstanbul - Lüks Otel',
    category: 'hotel',
    price: '₺2,500/gece',
    rating: 4.9,
    url: '/hotels/istanbul-luxury'
  },
  {
    id: 'kapadokya-cave-hotel',
    title: 'Cappadocia Cave Resort',
    subtitle: 'Kapadokya - Boutique Otel',
    category: 'hotel',
    price: '₺1,800/gece',
    rating: 4.8,
    url: '/hotels/kapadokya-cave'
  },
  {
    id: 'antalya-resort',
    title: 'Antalya Beach Resort',
    subtitle: 'Antalya - Her Şey Dahil',
    category: 'hotel',
    price: '₺1,200/gece',
    rating: 4.6,
    url: '/hotels/antalya-resort'
  },
  
  // Uçak Biletleri
  {
    id: 'istanbul-ankara',
    title: 'İstanbul → Ankara',
    subtitle: 'Turkish Airlines - 1s 20d',
    category: 'flight',
    price: '₺320',
    rating: 4.5,
    url: '/flights/istanbul-ankara'
  },
  {
    id: 'istanbul-izmir',
    title: 'İstanbul → İzmir',
    subtitle: 'Pegasus - 1s 15d',
    category: 'flight',
    price: '₺280',
    rating: 4.3,
    url: '/flights/istanbul-izmir'
  },
  
  // Aktiviteler
  {
    id: 'paragliding',
    title: 'Yamaç Paraşütü',
    subtitle: 'Antalya - Adrenalin Sporları',
    category: 'activity',
    price: '₺450',
    rating: 4.8,
    url: '/activities/paragliding'
  },
  {
    id: 'rafting',
    title: 'Rafting Turu',
    subtitle: 'Antalya - Su Sporları',
    category: 'activity',
    price: '₺220',
    rating: 4.7,
    url: '/activities/rafting'
  }
];

// Kategori isimleri ve ikonları
export const categoryConfig = {
  destination: {
    name: 'Destinasyonlar',
    icon: '📍',
    color: 'text-blue-600 bg-blue-100'
  },
  experience: {
    name: 'Deneyimler',
    icon: '⭐',
    color: 'text-purple-600 bg-purple-100'
  },
  hotel: {
    name: 'Oteller',
    icon: '🏨',
    color: 'text-green-600 bg-green-100'
  },
  flight: {
    name: 'Uçak Biletleri',
    icon: '✈️',
    color: 'text-orange-600 bg-orange-100'
  },
  activity: {
    name: 'Aktiviteler',
    icon: '🎯',
    color: 'text-red-600 bg-red-100'
  }
};

// Popüler aramalar
export const popularSearches = [
  'İstanbul',
  'Kapadokya Balon Turu',
  'Antalya Otelleri',
  'Boğaz Turu',
  'Pamukkale',
  'Bodrum',
  'AI Turları',
  'VR Deneyimleri'
];

// Arama fonksiyonu
export const searchInData = (query: string, limit: number = 10): SearchResult[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return searchMockData
    .filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery)
    )
    .sort((a, b) => {
      // Title'da tam eşleşme öncelik
      const aExact = a.title.toLowerCase() === normalizedQuery;
      const bExact = b.title.toLowerCase() === normalizedQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Title'da başlama öncelik
      const aStarts = a.title.toLowerCase().startsWith(normalizedQuery);
      const bStarts = b.title.toLowerCase().startsWith(normalizedQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Rating'e göre sıralama
      return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, limit);
};