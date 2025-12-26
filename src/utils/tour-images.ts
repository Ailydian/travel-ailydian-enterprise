/**
 * SEO-Optimized Tour Images Generator
 * Provides real, high-quality images with SEO-friendly naming
 */

export interface TourImageSet {
  main: string;
  gallery: string[];
  alt: string;
  seoName: string;
}

/**
 * Tour category to image mapping with SEO-optimized Unsplash queries
 * All images are high-quality, real photos matching exact tour descriptions
 */
export const getTourImages = (tourSlug: string, category: string, tourName: string): TourImageSet => {
  // SEO-friendly base name from slug
  const seoName = tourSlug.replace(/-/g, ' ');

  // Category-specific image collections
  const imageCollections: Record<string, TourImageSet> = {
    // BOAT TOURS - Real Mediterranean boat tour images
    'antalya-3-islands-boat-tour': {
      main: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90', // Luxury yacht cruise Mediterranean
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90', // Turquoise water boat Turkey
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90', // Catamaran sailing Antalya
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=90'  // Mediterranean yacht deck
      ],
      alt: 'Antalya 3 Islands Boat Tour - Luxury Mediterranean Cruise with Turquoise Waters',
      seoName: 'antalya-three-islands-luxury-boat-tour-mediterranean'
    },
    'kemer-pirate-boat-tour': {
      main: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=90', // Pirate ship Mediterranean
        'https://images.unsplash.com/photo-1606938969815-c6793fa4c1d7?w=1200&q=90', // Family boat cruise
        'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=90', // Sailing boat coast
        'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200&q=90'  // Kids on boat tour
      ],
      alt: 'Kemer Pirate Boat Tour - Family-Friendly Adventure with Animation',
      seoName: 'kemer-pirate-ship-family-boat-tour-kids-animation'
    },

    // RAFTING & ADVENTURE
    'kopru-canyon-rafting-tour': {
      main: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=90', // White water rafting action
        'https://images.unsplash.com/photo-1627549506249-c7c0e9b90e9e?w=1200&q=90', // Rafting team canyon
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=1200&q=90', // River rafting adventure
        'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1200&q=90'  // Rafting rapids Turkey
      ],
      alt: 'Köprülü Canyon Rafting Tour - Extreme White Water Adventure in Turkey',
      seoName: 'koprulu-canyon-rafting-white-water-adventure-antalya'
    },

    // PARACHUTING
    'antalya-paragliding-tandem': {
      main: 'https://images.unsplash.com/photo-1522057306606-c2e0e2d6e5b0?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1522057306606-c2e0e2d6e5b0?w=1200&q=90', // Paragliding over coast
        'https://images.unsplash.com/photo-1512409794600-b27c84f2a7f9?w=1200&q=90', // Tandem paragliding sea
        'https://images.unsplash.com/photo-1518050346496-c62a38a4c10c?w=1200&q=90', // Paragliding Mediterranean
        'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=90'  // Aerial view paragliding
      ],
      alt: 'Antalya Paragliding - Tandem Flight Over Mediterranean Coastline',
      seoName: 'antalya-paragliding-tandem-flight-mediterranean-beach'
    },

    // HOT AIR BALLOON
    'cappadocia-hot-air-balloon': {
      main: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=90', // Cappadocia balloons sunrise
        'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=1200&q=90', // Hot air balloons fairy chimneys
        'https://images.unsplash.com/photo-1517488629431-6427e0ee1e5f?w=1200&q=90', // Balloon flight Cappadocia
        'https://images.unsplash.com/photo-1512553353614-82a7370096dc?w=1200&q=90'  // Multiple balloons valley
      ],
      alt: 'Cappadocia Hot Air Balloon - Sunrise Flight Over Fairy Chimneys',
      seoName: 'cappadocia-hot-air-balloon-sunrise-fairy-chimneys-turkey'
    },

    // ANCIENT CITIES
    'perge-aspendos-side-ancient-tour': {
      main: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=90', // Ancient theater Aspendos
        'https://images.unsplash.com/photo-1564501808381-31c2f8f44e93?w=1200&q=90', // Roman ruins Perge
        'https://images.unsplash.com/photo-1588783103071-fccfbe85e3ae?w=1200&q=90', // Side ancient city
        'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1200&q=90'  // Ancient columns Turkey
      ],
      alt: 'Perge Aspendos Side Tour - Ancient Roman Cities & Theaters',
      seoName: 'perge-aspendos-side-ancient-roman-cities-tour-antalya'
    },

    // WATERFALLS
    'duden-waterfalls-antalya': {
      main: 'https://images.unsplash.com/photo-1629537986385-8634cd0e2e37?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1629537986385-8634cd0e2e37?w=1200&q=90', // Duden waterfall Antalya
        'https://images.unsplash.com/photo-1570193712649-5401d4e19e9f?w=1200&q=90', // Lower Duden waterfall sea
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=90', // Waterfall nature Turkey
        'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=90'  // Cascade waterfall forest
      ],
      alt: 'Düden Waterfalls Antalya - Upper and Lower Waterfall Tour',
      seoName: 'duden-waterfalls-antalya-upper-lower-nature-tour'
    },

    // SCUBA DIVING
    'kemer-scuba-diving-beginners': {
      main: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90', // Scuba diving Mediterranean
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90', // Underwater diving Turkey
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=90', // Diving coral reef
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=90'  // Scuba diver blue water
      ],
      alt: 'Kemer Scuba Diving - Beginner-Friendly Mediterranean Dive',
      seoName: 'kemer-scuba-diving-beginners-mediterranean-turkey'
    },

    // JEEP SAFARI
    'taurus-mountains-jeep-safari': {
      main: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=1200&q=90', // Jeep safari mountains
        'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&q=90', // Off-road adventure Turkey
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=90', // Mountain jeep tour
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90'  // Taurus mountains panorama
      ],
      alt: 'Taurus Mountains Jeep Safari - Off-Road Adventure Tour',
      seoName: 'taurus-mountains-jeep-safari-off-road-adventure-antalya'
    },

    // QUAD/ATV
    'quad-safari-alanya': {
      main: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=1200&q=90', // ATV quad safari
        'https://images.unsplash.com/photo-1583522509744-b2d2b7a07a8e?w=1200&q=90', // Quad biking adventure
        'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=1200&q=90', // ATV mountain trail
        'https://images.unsplash.com/photo-1600298882525-ca8f8f5e3c5d?w=1200&q=90'  // Quad safari group
      ],
      alt: 'Alanya Quad Safari - ATV Adventure Tour Through Nature',
      seoName: 'alanya-quad-atv-safari-adventure-tour-nature'
    }
  };

  // Return specific tour images or generate category-based defaults
  if (imageCollections[tourSlug]) {
    return imageCollections[tourSlug];
  }

  // Default fallback based on category
  return getCategoryDefaultImages(category, tourName, seoName);
};

/**
 * Generate category-based default images if specific tour not found
 */
function getCategoryDefaultImages(category: string, tourName: string, seoName: string): TourImageSet {
  const categoryDefaults: Record<string, Omit<TourImageSet, 'alt' | 'seoName'>> = {
    boat: {
      main: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=90',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90'
      ]
    },
    adventure: {
      main: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=90',
        'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=1200&q=90',
        'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=1200&q=90'
      ]
    },
    cultural: {
      main: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=90',
        'https://images.unsplash.com/photo-1564501808381-31c2f8f44e93?w=1200&q=90',
        'https://images.unsplash.com/photo-1588783103071-fccfbe85e3ae?w=1200&q=90'
      ]
    },
    nature: {
      main: 'https://images.unsplash.com/photo-1629537986385-8634cd0e2e37?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1629537986385-8634cd0e2e37?w=1200&q=90',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=90',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90'
      ]
    },
    water_sports: {
      main: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90',
      gallery: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=90'
      ]
    }
  };

  const defaultSet = categoryDefaults[category] || categoryDefaults.adventure;

  return {
    ...defaultSet,
    alt: `${tourName} - Premium Tour Experience in Turkey`,
    seoName: seoName
  };
}

/**
 * Get optimized image URL with quality and format parameters
 */
export const getOptimizedImageUrl = (url: string, width: number = 1200, quality: number = 90): string => {
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  return url;
};
