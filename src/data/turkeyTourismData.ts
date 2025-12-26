export interface TourismDestination {
  id: string;
  name: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  slug: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  shortDescription: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  highlights: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  bestTimeToVisit: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  averageTemperature: {
    summer: number;
    winter: number;
  };
  currency: string;
  timeZone: string;
  languages: string[];
  images: string[];
  video?: string;
  rating: number;
  reviewCount: number;
  popularityScore: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  tags: string[];
  attractions: TourismAttraction[];
  tours: Tour[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  activities: Activity[];
  transportation: Transportation[];
  weather: WeatherInfo;
  culture: CulturalInfo;
  safety: SafetyInfo;
  budget: BudgetInfo;
  seoData: SEOData;
}

export interface Tour {
  id: string;
  destinationId: string;
  name: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  slug: string;
  type: 'cultural' | 'adventure' | 'relaxation' | 'culinary' | 'historical' | 'nature';
  duration: {
    days: number;
    hours?: number;
  };
  groupSize: {
    min: number;
    max: number;
  };
  difficulty: 'easy' | 'moderate' | 'challenging';
  price: {
    adult: number;
    child: number;
    currency: string;
    includes: {
      tr: string[];
      en: string[];
      de: string[];
      ru: string[];
    };
    excludes: {
      tr: string[];
      en: string[];
      de: string[];
      ru: string[];
    };
  };
  description: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  itinerary: {
    day: number;
    title: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    activities: {
      tr: string[];
      en: string[];
      de: string[];
      ru: string[];
    };
    meals: string[];
    accommodation?: string;
  }[];
  images: string[];
  rating: number;
  reviewCount: number;
  availability: {
    startDate: string;
    endDate: string;
    availableDays: string[];
  };
  guide: {
    languages: string[];
    experience: number;
    specialties: string[];
  };
  transportation: string;
  meetingPoint: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  cancellationPolicy: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  specialOffers?: {
    discount: number;
    validUntil: string;
    conditions: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
  };
  seoData: SEOData;
}

export interface Hotel {
  id: string;
  destinationId: string;
  name: string;
  slug: string;
  category: 'budget' | 'mid-range' | 'luxury' | 'boutique' | 'resort';
  starRating: number;
  price: {
    min: number;
    max: number;
    currency: string;
    perNight: boolean;
  };
  location: {
    address: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
    distanceToCenter: number;
    distanceToAirport: number;
    landmarks: {
      name: string;
      distance: number;
    }[];
  };
  amenities: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  roomTypes: {
    name: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    size: number;
    capacity: number;
    price: number;
    amenities: string[];
    images: string[];
  }[];
  images: string[];
  rating: number;
  reviewCount: number;
  description: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  checkInTime: string;
  checkOutTime: string;
  policies: {
    cancellation: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    children: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    pets: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
  };
  specialOffers?: {
    title: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    discount: number;
    validUntil: string;
    conditions: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
  }[];
  seoData: SEOData;
}

export interface TourismAttraction {
  id: string;
  name: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  type: 'historical' | 'natural' | 'cultural' | 'religious' | 'architectural' | 'museum';
  entryFee: {
    adult: number;
    child: number;
    student: number;
    currency: string;
  };
  openingHours: {
    summer: { open: string; close: string; };
    winter: { open: string; close: string; };
  };
  description: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  images: string[];
  rating: number;
  visitDuration: number; // minutes
  accessibility: {
    wheelchair: boolean;
    stroller: boolean;
    elderly: boolean;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  specialties: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    address: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
  };
  images: string[];
}

export interface Activity {
  id: string;
  name: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  type: 'adventure' | 'cultural' | 'relaxation' | 'shopping' | 'nightlife' | 'sports';
  duration: number; // hours
  price: {
    min: number;
    max: number;
    currency: string;
  };
  seasonality: 'year-round' | 'summer' | 'winter' | 'spring' | 'autumn';
  description: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
}

export interface Transportation {
  type: 'flight' | 'bus' | 'train' | 'ferry' | 'car' | 'taxi';
  provider: string;
  duration: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  frequency: string;
}

export interface WeatherInfo {
  spring: { temp: { min: number; max: number; }; rainfall: number; };
  summer: { temp: { min: number; max: number; }; rainfall: number; };
  autumn: { temp: { min: number; max: number; }; rainfall: number; };
  winter: { temp: { min: number; max: number; }; rainfall: number; };
}

export interface CulturalInfo {
  traditions: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  festivals: {
    name: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    date: string;
    description: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
  }[];
  localTips: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
}

export interface SafetyInfo {
  level: 'very-safe' | 'safe' | 'moderate' | 'caution';
  tips: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  emergencyNumbers: {
    police: string;
    ambulance: string;
    fire: string;
    tourist: string;
  };
}

export interface BudgetInfo {
  daily: {
    budget: { min: number; max: number; };
    midRange: { min: number; max: number; };
    luxury: { min: number; max: number; };
  };
  currency: string;
  tipping: {
    restaurants: number;
    taxis: number;
    hotels: number;
  };
}

export interface SEOData {
  metaTitle: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  metaDescription: {
    tr: string;
    en: string;
    de: string;
    ru: string;
  };
  keywords: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  schema: {
    type: string;
    properties: Record<string, any>;
  };
  openGraph: {
    title: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    description: {
      tr: string;
      en: string;
      de: string;
      ru: string;
    };
    image: string;
  };
}

// TÜRKIYE'NİN EN POPÜLER DESTİNASYONLARI
export const turkeyDestinations: TourismDestination[] = [
  {
    id: 'istanbul',
    name: {
      tr: 'İstanbul',
      en: 'Istanbul',
      de: 'Istanbul',
      ru: 'Стамбул'
    },
    slug: 'istanbul',
    region: 'Marmara',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    description: {
      tr: 'İki kıtanın arasında yer alan büyüleyici şehir İstanbul, tarihi zenginlikleri ve modern yaşamı bir araya getiren benzersiz bir destinasyondur. Boğaz manzarası, tarihi yapıları ve zengin kültürü ile ziyaretçilerini büyüler.',
      en: 'Istanbul, the enchanting city between two continents, is a unique destination that brings together historical riches and modern life. It captivates visitors with its Bosphorus views, historical structures, and rich culture.',
      de: 'Istanbul, die bezaubernde Stadt zwischen zwei Kontinenten, ist ein einzigartiges Reiseziel, das historische Reichtümer und modernes Leben vereint. Es fasziniert Besucher mit seinem Bosporus-Blick, historischen Bauwerken und reicher Kultur.',
      ru: 'Стамбул, очаровательный город между двумя континентами, является уникальным направлением, объединяющим историческое богатство и современную жизнь. Он пленяет посетителей видами на Босфор, историческими сооружениями и богатой культурой.'
    },
    shortDescription: {
      tr: 'Tarih ve modernliğin buluştuğu büyülü şehir',
      en: 'The magical city where history meets modernity',
      de: 'Die magische Stadt, wo Geschichte auf Moderne trifft',
      ru: 'Волшебный город, где встречается история и современность'
    },
    highlights: {
      tr: ['Ayasofya', 'Sultanahmet Camii', 'Boğaz Turu', 'Kapalıçarşı', 'Galata Kulesi'],
      en: ['Hagia Sophia', 'Blue Mosque', 'Bosphorus Cruise', 'Grand Bazaar', 'Galata Tower'],
      de: ['Hagia Sophia', 'Blaue Moschee', 'Bosporus-Kreuzfahrt', 'Großer Basar', 'Galata-Turm'],
      ru: ['Айя-София', 'Голубая мечеть', 'Круиз по Босфору', 'Гранд-базар', 'Башня Галата']
    },
    bestTimeToVisit: {
      tr: 'Nisan - Haziran, Eylül - Kasım',
      en: 'April - June, September - November',
      de: 'April - Juni, September - November',
      ru: 'Апрель - Июнь, Сентябрь - Ноябрь'
    },
    averageTemperature: { summer: 26, winter: 9 },
    currency: 'TRY',
    timeZone: 'GMT+3',
    languages: ['Turkish', 'English'],
    images: [
      '/images/destinations/istanbul/hagia-sophia.jpg',
      '/images/destinations/istanbul/bosphorus.jpg',
      '/images/destinations/istanbul/blue-mosque.jpg'
    ],
    rating: 4.8,
    reviewCount: 15420,
    popularityScore: 95,
    difficulty: 'easy',
    tags: ['historical', 'cultural', 'urban', 'bosphorus', 'UNESCO'],
    attractions: [],
    tours: [],
    hotels: [],
    restaurants: [],
    activities: [],
    transportation: [],
    weather: {
      spring: { temp: { min: 10, max: 20 }, rainfall: 45 },
      summer: { temp: { min: 20, max: 30 }, rainfall: 25 },
      autumn: { temp: { min: 12, max: 22 }, rainfall: 60 },
      winter: { temp: { min: 5, max: 12 }, rainfall: 80 }
    },
    culture: {
      traditions: {
        tr: ['Çay kültürü', 'Hamam geleneği', 'Sokak lezzetleri'],
        en: ['Tea culture', 'Turkish bath tradition', 'Street food'],
        de: ['Teekultur', 'Türkisches Bad Tradition', 'Straßenessen'],
        ru: ['Чайная культура', 'Традиции турецкой бани', 'Уличная еда']
      },
      festivals: [
        {
          name: {
            tr: 'İstanbul Müzik Festivali',
            en: 'Istanbul Music Festival',
            de: 'Istanbul Musik Festival',
            ru: 'Стамбульский музыкальный фестиваль'
          },
          date: 'June',
          description: {
            tr: 'Klasik müzik severlerin buluşma noktası',
            en: 'Meeting point for classical music lovers',
            de: 'Treffpunkt für Liebhaber klassischer Musik',
            ru: 'Место встречи любителей классической музыки'
          }
        }
      ],
      localTips: {
        tr: ['Metro kartı alın', 'Pazarlık yapmayı öğrenin', 'Yerel kafelerde çay içmeyi deneyin'],
        en: ['Get a metro card', 'Learn to bargain', 'Try tea in local cafes'],
        de: ['Holen Sie sich eine Metro-Karte', 'Lernen Sie zu handeln', 'Probieren Sie Tee in lokalen Cafés'],
        ru: ['Получите метро-карту', 'Научитесь торговаться', 'Попробуйте чай в местных кафе']
      }
    },
    safety: {
      level: 'safe',
      tips: {
        tr: ['Değerli eşyalarınızı güvende tutun', 'Lisanslı rehberler tercih edin'],
        en: ['Keep your valuables safe', 'Prefer licensed guides'],
        de: ['Bewahren Sie Ihre Wertsachen sicher auf', 'Bevorzugen Sie lizenzierte Führer'],
        ru: ['Храните ваши ценности в безопасности', 'Предпочитайте лицензированных гидов']
      },
      emergencyNumbers: {
        police: '155',
        ambulance: '112',
        fire: '110',
        tourist: '174'
      }
    },
    budget: {
      daily: {
        budget: { min: 300, max: 500 },
        midRange: { min: 500, max: 1000 },
        luxury: { min: 1000, max: 2500 }
      },
      currency: 'TRY',
      tipping: { restaurants: 10, taxis: 5, hotels: 20 }
    },
    seoData: {
      metaTitle: {
        tr: 'İstanbul Turları | En İyi İstanbul Rehberi 2024 | Travel LyDian',
        en: 'Istanbul Tours | Best Istanbul Guide 2024 | Travel LyDian',
        de: 'Istanbul Touren | Bester Istanbul Reiseführer 2024 | Travel LyDian',
        ru: 'Туры в Стамбул | Лучший гид по Стамбулу 2024 | Travel LyDian'
      },
      metaDescription: {
        tr: 'İstanbul turları için en kapsamlı rehber! ✈️ Ayasofya, Sultanahmet, Boğaz turları. Uygun fiyatlar, uzman rehberler. Hemen keşfedin! 🎯',
        en: 'The most comprehensive guide for Istanbul tours! ✈️ Hagia Sophia, Sultanahmet, Bosphorus tours. Affordable prices, expert guides. Discover now! 🎯',
        de: 'Der umfassendste Führer für Istanbul-Touren! ✈️ Hagia Sophia, Sultanahmet, Bosporus-Touren. Günstige Preise, Expertenführer. Jetzt entdecken! 🎯',
        ru: 'Самый полный гид по турам в Стамбул! ✈️ Айя-София, Султанахмет, туры по Босфору. Доступные цены, опытные гиды. Откройте сейчас! 🎯'
      },
      keywords: {
        tr: ['istanbul turu', 'ayasofya', 'sultanahmet camii', 'boğaz turu', 'kapalıçarşı', 'istanbul rehberi'],
        en: ['istanbul tours', 'hagia sophia', 'blue mosque', 'bosphorus cruise', 'grand bazaar', 'istanbul guide'],
        de: ['istanbul touren', 'hagia sophia', 'blaue moschee', 'bosporus kreuzfahrt', 'großer basar', 'istanbul führer'],
        ru: ['стамбул туры', 'айя софия', 'голубая мечеть', 'босфор круиз', 'гранд базар', 'стамбул гид']
      },
      schema: {
        type: 'TouristDestination',
        properties: {
          name: 'Istanbul',
          description: 'Historic city spanning Europe and Asia',
          geo: { latitude: 41.0082, longitude: 28.9784 }
        }
      },
      openGraph: {
        title: {
          tr: 'İstanbul - İki Kıtanın Büyülü Şehri',
          en: 'Istanbul - The Magical City of Two Continents',
          de: 'Istanbul - Die magische Stadt zweier Kontinente',
          ru: 'Стамбул - Волшебный город двух континентов'
        },
        description: {
          tr: 'Tarihi ve modern yaşamın buluştuğu benzersiz şehir İstanbul\'u keşfedin.',
          en: 'Discover Istanbul, the unique city where history and modern life meet.',
          de: 'Entdecken Sie Istanbul, die einzigartige Stadt, in der Geschichte und modernes Leben aufeinandertreffen.',
          ru: 'Откройте для себя Стамбул, уникальный город, где встречается история и современная жизнь.'
        },
        image: '/images/destinations/istanbul/og-image.jpg'
      }
    }
  },
  // Kapadokya
  {
    id: 'cappadocia',
    name: {
      tr: 'Kapadokya',
      en: 'Cappadocia',
      de: 'Kappadokien',
      ru: 'Каппадокия'
    },
    slug: 'kapadokya',
    region: 'İç Anadolu',
    coordinates: { lat: 38.6431, lng: 34.8281 },
    description: {
      tr: 'Peri bacaları, yeraltı şehirleri ve büyüleyici balon turlarıyla ünlü Kapadokya, doğa ve tarihin eşsiz uyumunu sunan magik bir destinasyondur. UNESCO Dünya Mirası listesinde yer alan bu benzersiz coğrafya, her yıl milyonlarca ziyaretçiyi ağırlar.',
      en: 'Famous for its fairy chimneys, underground cities, and enchanting balloon tours, Cappadocia is a magical destination offering a unique harmony of nature and history. This unique geography, listed as a UNESCO World Heritage site, welcomes millions of visitors each year.',
      de: 'Kappadokien, berühmt für seine Feenkamine, unterirdischen Städte und bezaubernden Ballonfahrten, ist ein magisches Reiseziel, das eine einzigartige Harmonie von Natur und Geschichte bietet. Diese einzigartige Geographie, die als UNESCO-Weltkulturerbe gelistet ist, empfängt jedes Jahr Millionen von Besuchern.',
      ru: 'Каппадокия, знаменитая своими сказочными дымоходами, подземными городами и очаровательными полетами на воздушных шарах, является волшебным направлением, предлагающим уникальную гармонию природы и истории. Эта уникальная география, внесенная в список Всемирного наследия ЮНЕСКО, принимает миллионы посетителей каждый год.'
    },
    shortDescription: {
      tr: 'Peri bacaları ve balon turlarının eşsiz diyarı',
      en: 'Unique land of fairy chimneys and balloon tours',
      de: 'Einzigartiges Land der Feenkamine und Ballonfahrten',
      ru: 'Уникальная земля сказочных дымоходов и полетов на шарах'
    },
    highlights: {
      tr: ['Sıcak Hava Balonu Turu', 'Göreme Açık Hava Müzesi', 'Yeraltı Şehri', 'Peri Bacaları', 'Sunset Point'],
      en: ['Hot Air Balloon Tour', 'Goreme Open Air Museum', 'Underground City', 'Fairy Chimneys', 'Sunset Point'],
      de: ['Heißluftballonfahrt', 'Göreme Freilichtmuseum', 'Unterirdische Stadt', 'Feenkamine', 'Sunset Point'],
      ru: ['Полет на воздушном шаре', 'Музей Гёреме под открытым небом', 'Подземный город', 'Сказочные дымоходы', 'Точка заката']
    },
    bestTimeToVisit: {
      tr: 'Nisan - Haziran, Eylül - Kasım',
      en: 'April - June, September - November',
      de: 'April - Juni, September - November',
      ru: 'Апрель - Июнь, Сентябрь - Ноябрь'
    },
    averageTemperature: { summer: 24, winter: 2 },
    currency: 'TRY',
    timeZone: 'GMT+3',
    languages: ['Turkish', 'English'],
    images: [
      '/images/destinations/cappadocia/hot-air-balloons.jpg',
      '/images/destinations/cappadocia/fairy-chimneys.jpg',
      '/images/destinations/cappadocia/goreme.jpg'
    ],
    rating: 4.9,
    reviewCount: 22150,
    popularityScore: 98,
    difficulty: 'moderate',
    tags: ['nature', 'adventure', 'UNESCO', 'unique-landscape', 'balloon'],
    attractions: [],
    tours: [],
    hotels: [],
    restaurants: [],
    activities: [],
    transportation: [],
    weather: {
      spring: { temp: { min: 5, max: 18 }, rainfall: 35 },
      summer: { temp: { min: 15, max: 30 }, rainfall: 15 },
      autumn: { temp: { min: 8, max: 20 }, rainfall: 25 },
      winter: { temp: { min: -5, max: 8 }, rainfall: 40 }
    },
    culture: {
      traditions: {
        tr: ['Çömlek yapımı', 'Kilim dokuma', 'Mağara otelleri'],
        en: ['Pottery making', 'Kilim weaving', 'Cave hotels'],
        de: ['Töpferei', 'Kilim-Weberei', 'Höhlenhotels'],
        ru: ['Гончарное дело', 'Ткачество килимов', 'Пещерные отели']
      },
      festivals: [
        {
          name: {
            tr: 'Kapadokya Balon Festivali',
            en: 'Cappadocia Balloon Festival',
            de: 'Kappadokien Ballon Festival',
            ru: 'Фестиваль воздушных шаров Каппадокии'
          },
          date: 'July',
          description: {
            tr: 'Yüzlerce balonun gökyüzünde dans ettiği muhteşem festival',
            en: 'Magnificent festival where hundreds of balloons dance in the sky',
            de: 'Herrliches Festival, bei dem Hunderte von Ballons am Himmel tanzen',
            ru: 'Великолепный фестиваль, где сотни шаров танцуют в небе'
          }
        }
      ],
      localTips: {
        tr: ['Erken kalkın balon turları için', 'Rahat ayakkabı giyin', 'Sıcak kıyafet alın'],
        en: ['Wake up early for balloon tours', 'Wear comfortable shoes', 'Bring warm clothes'],
        de: ['Wachen Sie früh für Ballonfahrten auf', 'Tragen Sie bequeme Schuhe', 'Bringen Sie warme Kleidung mit'],
        ru: ['Просыпайтесь рано для полетов на шарах', 'Носите удобную обувь', 'Возьмите теплую одежду']
      }
    },
    safety: {
      level: 'very-safe',
      tips: {
        tr: ['Balon turları için güvenlik briefingini takip edin', 'Hava koşullarına dikkat edin'],
        en: ['Follow safety briefing for balloon tours', 'Pay attention to weather conditions'],
        de: ['Befolgen Sie die Sicherheitseinweisung für Ballonfahrten', 'Achten Sie auf die Wetterbedingungen'],
        ru: ['Следуйте инструктажу по безопасности для полетов на шарах', 'Обращайте внимание на погодные условия']
      },
      emergencyNumbers: {
        police: '155',
        ambulance: '112',
        fire: '110',
        tourist: '174'
      }
    },
    budget: {
      daily: {
        budget: { min: 250, max: 400 },
        midRange: { min: 400, max: 800 },
        luxury: { min: 800, max: 2000 }
      },
      currency: 'TRY',
      tipping: { restaurants: 10, taxis: 5, hotels: 20 }
    },
    seoData: {
      metaTitle: {
        tr: 'Kapadokya Balon Turları | En İyi Kapadokya Rehberi 2024 | Travel LyDian',
        en: 'Cappadocia Balloon Tours | Best Cappadocia Guide 2024 | Travel LyDian',
        de: 'Kappadokien Ballonfahrten | Bester Kappadokien Reiseführer 2024 | Travel LyDian',
        ru: 'Туры на воздушных шарах в Каппадокии | Лучший гид по Каппадокии 2024 | Travel LyDian'
      },
      metaDescription: {
        tr: 'Kapadokya balon turları için en kapsamlı rehber! ✈️ Peri bacaları, yeraltı şehirleri, Göreme. Unutulmaz deneyimler! 🎈',
        en: 'The most comprehensive guide for Cappadocia balloon tours! ✈️ Fairy chimneys, underground cities, Goreme. Unforgettable experiences! 🎈',
        de: 'Der umfassendste Führer für Kappadokien Ballonfahrten! ✈️ Feenkamine, unterirdische Städte, Göreme. Unvergessliche Erlebnisse! 🎈',
        ru: 'Самый полный гид по турам на воздушных шарах в Каппадокии! ✈️ Сказочные дымоходы, подземные города, Гёреме. Незабываемые впечатления! 🎈'
      },
      keywords: {
        tr: ['kapadokya balon turu', 'peri bacaları', 'göreme', 'yeraltı şehri', 'kapadokya otelleri'],
        en: ['cappadocia balloon tour', 'fairy chimneys', 'goreme', 'underground city', 'cappadocia hotels'],
        de: ['kappadokien ballonfahrt', 'feenkamine', 'göreme', 'unterirdische stadt', 'kappadokien hotels'],
        ru: ['каппадокия воздушный шар', 'сказочные дымоходы', 'гёреме', 'подземный город', 'отели каппадокии']
      },
      schema: {
        type: 'TouristDestination',
        properties: {
          name: 'Cappadocia',
          description: 'UNESCO World Heritage site famous for hot air balloon rides',
          geo: { latitude: 38.6431, longitude: 34.8281 }
        }
      },
      openGraph: {
        title: {
          tr: 'Kapadokya - Peri Bacalarının Büyülü Diyarı',
          en: 'Cappadocia - The Magical Land of Fairy Chimneys',
          de: 'Kappadokien - Das magische Land der Feenkamine',
          ru: 'Каппадокия - Волшебная земля сказочных дымоходов'
        },
        description: {
          tr: 'Sıcak hava balonlarıyla gökyüzünden Kapadokya\'nın eşsiz güzelliğini keşfedin.',
          en: 'Discover the unique beauty of Cappadocia from the sky with hot air balloons.',
          de: 'Entdecken Sie die einzigartige Schönheit Kappadokiens vom Himmel aus mit Heißluftballons.',
          ru: 'Откройте для себя уникальную красоту Каппадокии с неба на воздушных шарах.'
        },
        image: '/images/destinations/cappadocia/og-image.jpg'
      }
    }
  }
];

// TUR VERİLERİ
export const turkeyTours: Tour[] = [
  {
    id: 'istanbul-classic-city-tour',
    destinationId: 'istanbul',
    name: {
      tr: 'İstanbul Klasik Şehir Turu',
      en: 'Istanbul Classic City Tour',
      de: 'Istanbul Klassische Stadttour',
      ru: 'Классический городской тур по Стамбулу'
    },
    slug: 'istanbul-klasik-sehir-turu',
    type: 'cultural',
    duration: { days: 1, hours: 8 },
    groupSize: { min: 2, max: 15 },
    difficulty: 'easy',
    price: {
      adult: 450,
      child: 300,
      currency: 'TRY',
      includes: {
        tr: ['Profesyonel rehber', 'Müze giriş ücretleri', 'Öğle yemeği', 'Ulaşım'],
        en: ['Professional guide', 'Museum entrance fees', 'Lunch', 'Transportation'],
        de: ['Professioneller Führer', 'Museumseintrittsgebühren', 'Mittagessen', 'Transport'],
        ru: ['Профессиональный гид', 'Входные билеты в музеи', 'Обед', 'Транспорт']
      },
      excludes: {
        tr: ['Kişisel harcamalar', 'Bahşişler', 'İçecekler'],
        en: ['Personal expenses', 'Tips', 'Beverages'],
        de: ['Persönliche Ausgaben', 'Trinkgelder', 'Getränke'],
        ru: ['Личные расходы', 'Чаевые', 'Напитки']
      }
    },
    description: {
      tr: 'İstanbul\'un en önemli tarihi ve kültürel yerlerini içeren kapsamlı günübirlik tur. Ayasofya, Sultanahmet Camii, Kapalıçarşı ve Boğaz manzarası eşliğinde unutulmaz bir İstanbul deneyimi yaşayın.',
      en: 'Comprehensive full-day tour covering Istanbul\'s most important historical and cultural sites. Experience an unforgettable Istanbul adventure with Hagia Sophia, Blue Mosque, Grand Bazaar, and Bosphorus views.',
      de: 'Umfassende Ganztagestour, die Istanbuls wichtigste historische und kulturelle Stätten abdeckt. Erleben Sie ein unvergessliches Istanbul-Abenteuer mit Hagia Sophia, Blauer Moschee, Großem Basar und Bosporus-Blick.',
      ru: 'Комплексный дневной тур, охватывающий самые важные исторические и культурные места Стамбула. Испытайте незабываемое стамбульское приключение с Айя-Софией, Голубой мечетью, Гранд-базаром и видами на Босфор.'
    },
    itinerary: [
      {
        day: 1,
        title: {
          tr: 'İstanbul Tarihi Yarımada Turu',
          en: 'Istanbul Historic Peninsula Tour',
          de: 'Istanbul Historische Halbinsel Tour',
          ru: 'Тур по исторической части Стамбула'
        },
        activities: {
          tr: [
            'Ayasofya Müzesi ziyareti ve rehberli tur',
            'Sultanahmet Camii (Mavi Camii) gezisi',
            'Topkapı Sarayı ve hazineler odası',
            'Kapalıçarşı\'da serbest zaman ve alışveriş',
            'Boğaz manzaralı öğle yemeği',
            'Galata Kulesi ve panoramik İstanbul manzarası'
          ],
          en: [
            'Hagia Sophia Museum visit and guided tour',
            'Blue Mosque (Sultanahmet Mosque) exploration',
            'Topkapi Palace and treasury chamber',
            'Free time and shopping at Grand Bazaar',
            'Lunch with Bosphorus view',
            'Galata Tower and panoramic Istanbul view'
          ],
          de: [
            'Hagia Sophia Museum Besuch und Führung',
            'Blaue Moschee (Sultanahmet Moschee) Erkundung',
            'Topkapi Palast und Schatzkammer',
            'Freizeit und Einkaufen im Großen Basar',
            'Mittagessen mit Bosporus-Blick',
            'Galata Turm und panoramischer Istanbul-Blick'
          ],
          ru: [
            'Посещение музея Айя-София с гидом',
            'Исследование Голубой мечети (мечеть Султанахмет)',
            'Дворец Топкапы и сокровищница',
            'Свободное время и шопинг на Гранд-базаре',
            'Обед с видом на Босфор',
            'Башня Галата и панорамный вид на Стамбул'
          ]
        },
        meals: ['Lunch'],
        accommodation: undefined
      }
    ],
    images: [
      '/images/tours/istanbul-classic/hagia-sophia-tour.jpg',
      '/images/tours/istanbul-classic/blue-mosque-visit.jpg',
      '/images/tours/istanbul-classic/grand-bazaar-shopping.jpg'
    ],
    rating: 4.8,
    reviewCount: 2847,
    availability: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    guide: {
      languages: ['Turkish', 'English', 'German', 'Russian'],
      experience: 8,
      specialties: ['Byzantine History', 'Ottoman Architecture', 'Local Culture']
    },
    transportation: 'Premium minibus with air conditioning',
    meetingPoint: {
      tr: 'Sultanahmet Meydanı, Ayasofya karşısı',
      en: 'Sultanahmet Square, opposite Hagia Sophia',
      de: 'Sultanahmet Platz, gegenüber der Hagia Sophia',
      ru: 'Площадь Султанахмет, напротив Айя-Софии'
    },
    cancellationPolicy: {
      tr: '24 saat öncesine kadar ücretsiz iptal',
      en: 'Free cancellation up to 24 hours before',
      de: 'Kostenlose Stornierung bis zu 24 Stunden vorher',
      ru: 'Бесплатная отмена за 24 часа'
    },
    specialOffers: {
      discount: 15,
      validUntil: '2024-12-31',
      conditions: {
        tr: '3 kişi ve üzeri rezervasyonlarda %15 indirim',
        en: '15% discount for bookings of 3 people or more',
        de: '15% Rabatt bei Buchungen für 3 Personen oder mehr',
        ru: '15% скидка при бронировании для 3 человек и более'
      }
    },
    seoData: {
      metaTitle: {
        tr: 'İstanbul Klasik Şehir Turu | Ayasofya & Sultanahmet Gezisi | Travel LyDian',
        en: 'Istanbul Classic City Tour | Hagia Sophia & Sultanahmet Visit | Travel LyDian',
        de: 'Istanbul Klassische Stadttour | Hagia Sophia & Sultanahmet Besuch | Travel LyDian',
        ru: 'Классический городской тур по Стамбулу | Посещение Айя-Софии и Султанахмет | Travel LyDian'
      },
      metaDescription: {
        tr: 'İstanbul\'un kalbi Sultanahmet\'te tarihi keşif! Ayasofya, Mavi Camii, Topkapı Sarayı gezisi. Uzman rehber eşliğinde 1 günde İstanbul. 🏛️',
        en: 'Historical discovery in the heart of Istanbul, Sultanahmet! Tour of Hagia Sophia, Blue Mosque, Topkapi Palace. Istanbul in 1 day with expert guide. 🏛️',
        de: 'Historische Entdeckung im Herzen Istanbuls, Sultanahmet! Tour durch Hagia Sophia, Blaue Moschee, Topkapi Palast. Istanbul in 1 Tag mit Expertenführer. 🏛️',
        ru: 'Историческое открытие в сердце Стамбула, Султанахмет! Тур по Айя-Софии, Голубой мечети, дворцу Топкапы. Стамбул за 1 день с экспертом-гидом. 🏛️'
      },
      keywords: {
        tr: ['istanbul şehir turu', 'ayasofya gezisi', 'sultanahmet camii', 'topkapı sarayı', 'kapalıçarşı turu'],
        en: ['istanbul city tour', 'hagia sophia visit', 'blue mosque', 'topkapi palace', 'grand bazaar tour'],
        de: ['istanbul stadttour', 'hagia sophia besuch', 'blaue moschee', 'topkapi palast', 'großer basar tour'],
        ru: ['стамбул городской тур', 'айя софия посещение', 'голубая мечеть', 'топкапы дворец', 'гранд базар тур']
      },
      schema: {
        type: 'TouristTrip',
        properties: {
          name: 'Istanbul Classic City Tour',
          description: 'Full day tour of Istanbul historical sites',
          duration: 'P1D'
        }
      },
      openGraph: {
        title: {
          tr: 'İstanbul Klasik Şehir Turu - Ayasofya ve Sultanahmet',
          en: 'Istanbul Classic City Tour - Hagia Sophia and Sultanahmet',
          de: 'Istanbul Klassische Stadttour - Hagia Sophia und Sultanahmet',
          ru: 'Классический городской тур по Стамбулу - Айя-София и Султанахмет'
        },
        description: {
          tr: 'İstanbul\'un en önemli tarihi yerlerini 1 günde keşfedin. Uzman rehber eşliğinde unutulmaz deneyim.',
          en: 'Discover Istanbul\'s most important historical sites in 1 day. Unforgettable experience with expert guide.',
          de: 'Entdecken Sie Istanbuls wichtigste historische Stätten in 1 Tag. Unvergessliches Erlebnis mit Expertenführer.',
          ru: 'Откройте для себя самые важные исторические места Стамбула за 1 день. Незабываемый опыт с экспертом-гидом.'
        },
        image: '/images/tours/istanbul-classic/og-image.jpg'
      }
    }
  },
  {
    id: 'cappadocia-balloon-tour',
    destinationId: 'cappadocia',
    name: {
      tr: 'Kapadokya Sıcak Hava Balonu Turu',
      en: 'Cappadocia Hot Air Balloon Tour',
      de: 'Kappadokien Heißluftballon Tour',
      ru: 'Тур на воздушном шаре в Каппадокии'
    },
    slug: 'kapadokya-sicak-hava-balonu-turu',
    type: 'adventure',
    duration: { days: 1, hours: 4 },
    groupSize: { min: 1, max: 20 },
    difficulty: 'easy',
    price: {
      adult: 1200,
      child: 800,
      currency: 'TRY',
      includes: {
        tr: ['Sıcak hava balonu uçuşu', 'Şampanya servisi', 'Uçuş sertifikası', 'Hotel transfer', 'Sigorta'],
        en: ['Hot air balloon flight', 'Champagne service', 'Flight certificate', 'Hotel transfer', 'Insurance'],
        de: ['Heißluftballonflug', 'Champagner-Service', 'Flugzertifikat', 'Hoteltransfer', 'Versicherung'],
        ru: ['Полет на воздушном шаре', 'Шампанское', 'Сертификат полета', 'Трансфер из отеля', 'Страховка']
      },
      excludes: {
        tr: ['Kahvaltı', 'Kişisel harcamalar', 'Bahşişler'],
        en: ['Breakfast', 'Personal expenses', 'Tips'],
        de: ['Frühstück', 'Persönliche Ausgaben', 'Trinkgelder'],
        ru: ['Завтрак', 'Личные расходы', 'Чаевые']
      }
    },
    description: {
      tr: 'Kapadokya\'nın eşsiz manzarasını gökyüzünden deneyimleyin! Sıcak hava balonu ile peri bacaları, vadiler ve tarihi yapıları yukarıdan izleyerek unutulmaz anılar biriktirin. Profesyonel pilot ve güvenlik ekibi eşliğinde güvenli ve konforlu bir uçuş deneyimi.',
      en: 'Experience Cappadocia\'s unique landscape from the sky! Create unforgettable memories by viewing fairy chimneys, valleys, and historical structures from above in a hot air balloon. Safe and comfortable flight experience with professional pilot and safety team.',
      de: 'Erleben Sie Kappadokiens einzigartige Landschaft vom Himmel aus! Schaffen Sie unvergessliche Erinnerungen, indem Sie Feenkamine, Täler und historische Strukturen von oben in einem Heißluftballon betrachten. Sicheres und komfortables Flugerlebnis mit professionellem Piloten und Sicherheitsteam.',
      ru: 'Испытайте уникальный пейзаж Каппадокии с неба! Создайте незабываемые воспоминания, наблюдая за сказочными дымоходами, долинами и историческими сооружениями сверху на воздушном шаре. Безопасный и комфортный полет с профессиональным пилотом и командой безопасности.'
    },
    itinerary: [
      {
        day: 1,
        title: {
          tr: 'Sıcak Hava Balonu Macerası',
          en: 'Hot Air Balloon Adventure',
          de: 'Heißluftballon Abenteuer',
          ru: 'Приключение на воздушном шаре'
        },
        activities: {
          tr: [
            'Erken sabah otel transferi (05:00-05:30)',
            'Pilot ve ekip tanıtımı, güvenlik brifingi',
            'Balonun hazırlanması ve şişirilme süreci',
            '60-75 dakika süren muhteşem balon uçuşu',
            'Gökyüzünde şampanya servisi ve kutlama',
            'İniş sonrası uçuş sertifikası takdimi',
            'Hotel\'e geri dönüş transferi'
          ],
          en: [
            'Early morning hotel pickup (05:00-05:30)',
            'Pilot and crew introduction, safety briefing',
            'Balloon preparation and inflation process',
            '60-75 minutes of magnificent balloon flight',
            'Champagne service and celebration in the sky',
            'Flight certificate presentation after landing',
            'Return transfer to hotel'
          ],
          de: [
            'Frühmorgendlicher Hotelabholung (05:00-05:30)',
            'Pilot- und Crew-Vorstellung, Sicherheitseinweisung',
            'Ballonvorbereitung und Aufblasvorgang',
            '60-75 Minuten herrlicher Ballonflug',
            'Champagner-Service und Feier am Himmel',
            'Flugzertifikat-Präsentation nach der Landung',
            'Rücktransfer zum Hotel'
          ],
          ru: [
            'Ранний утренний трансфер из отеля (05:00-05:30)',
            'Знакомство с пилотом и экипажем, инструктаж по безопасности',
            'Подготовка и надувание воздушного шара',
            '60-75 минут великолепного полета на шаре',
            'Шампанское и празднование в небе',
            'Вручение сертификата полета после приземления',
            'Обратный трансфер в отель'
          ]
        },
        meals: [],
        accommodation: undefined
      }
    ],
    images: [
      '/images/tours/cappadocia-balloon/balloons-sunrise.jpg',
      '/images/tours/cappadocia-balloon/fairy-chimneys-aerial.jpg',
      '/images/tours/cappadocia-balloon/champagne-celebration.jpg'
    ],
    rating: 4.9,
    reviewCount: 3542,
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-11-30',
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    guide: {
      languages: ['Turkish', 'English', 'German', 'Russian', 'Spanish'],
      experience: 12,
      specialties: ['Hot Air Ballooning', 'Aviation Safety', 'Cappadocia Geography']
    },
    transportation: 'Luxury minibus with heating',
    meetingPoint: {
      tr: 'Otellere özel transfer servisi mevcuttur',
      en: 'Private transfer service available to hotels',
      de: 'Private Transferservice zu Hotels verfügbar',
      ru: 'Доступен частный трансфер до отелей'
    },
    cancellationPolicy: {
      tr: 'Hava koşulları nedeniyle iptal durumunda tam iade',
      en: 'Full refund in case of cancellation due to weather conditions',
      de: 'Volle Rückerstattung bei Stornierung aufgrund von Wetterbedingungen',
      ru: 'Полный возврат в случае отмены из-за погодных условий'
    },
    specialOffers: {
      discount: 20,
      validUntil: '2024-06-30',
      conditions: {
        tr: 'Erken rezervasyon indirimi - 30 gün öncesine kadar %20',
        en: 'Early booking discount - 20% off for bookings 30 days in advance',
        de: 'Frühbucherrabatt - 20% Rabatt bei Buchung 30 Tage im Voraus',
        ru: 'Скидка за раннее бронирование - 20% при бронировании за 30 дней'
      }
    },
    seoData: {
      metaTitle: {
        tr: 'Kapadokya Balon Turu | Sıcak Hava Balonu Uçuşu 2024 | Travel LyDian',
        en: 'Cappadocia Balloon Tour | Hot Air Balloon Flight 2024 | Travel LyDian',
        de: 'Kappadokien Ballontour | Heißluftballonflug 2024 | Travel LyDian',
        ru: 'Тур на воздушном шаре в Каппадокии | Полет на воздушном шаре 2024 | Travel LyDian'
      },
      metaDescription: {
        tr: 'Kapadokya\'da sıcak hava balonu turu! Peri bacalarını gökyüzünden izleyin. Güvenli uçuş, şampanya servisi, sertifika dahil. Hemen rezervasyon yapın! 🎈',
        en: 'Hot air balloon tour in Cappadocia! Watch fairy chimneys from the sky. Safe flight, champagne service, certificate included. Book now! 🎈',
        de: 'Heißluftballon-Tour in Kappadokien! Betrachten Sie Feenkamine vom Himmel aus. Sicherer Flug, Champagner-Service, Zertifikat inklusive. Jetzt buchen! 🎈',
        ru: 'Тур на воздушном шаре в Каппадокии! Наблюдайте за сказочными дымоходами с неба. Безопасный полет, шампанское, сертификат включены. Забронируйте сейчас! 🎈'
      },
      keywords: {
        tr: ['kapadokya balon turu', 'sıcak hava balonu', 'balon uçuşu kapadokya', 'peri bacaları balon', 'kapadokya balloon'],
        en: ['cappadocia balloon tour', 'hot air balloon', 'balloon flight cappadocia', 'fairy chimneys balloon', 'cappadocia balloon'],
        de: ['kappadokien ballontour', 'heißluftballon', 'ballonflug kappadokien', 'feenkamine ballon', 'kappadokien ballon'],
        ru: ['каппадокия воздушный шар', 'тур на шаре', 'полет на шаре каппадокия', 'сказочные дымоходы шар', 'каппадокия шар']
      },
      schema: {
        type: 'TouristTrip',
        properties: {
          name: 'Cappadocia Hot Air Balloon Tour',
          description: 'Hot air balloon flight over Cappadocia fairy chimneys',
          duration: 'PT4H'
        }
      },
      openGraph: {
        title: {
          tr: 'Kapadokya Sıcak Hava Balonu Turu - Peri Bacaları Üzerinde Uçuş',
          en: 'Cappadocia Hot Air Balloon Tour - Flight Over Fairy Chimneys',
          de: 'Kappadokien Heißluftballon Tour - Flug über Feenkamine',
          ru: 'Тур на воздушном шаре в Каппадокии - Полет над сказочными дымоходами'
        },
        description: {
          tr: 'Kapadokya\'nın büyüleyici manzarasını gökyüzünden keşfedin. Güvenli ve unutulmaz balon deneyimi.',
          en: 'Discover Cappadocia\'s enchanting landscape from the sky. Safe and unforgettable balloon experience.',
          de: 'Entdecken Sie Kappadokiens bezaubernde Landschaft vom Himmel aus. Sicheres und unvergessliches Ballon-Erlebnis.',
          ru: 'Откройте для себя очаровательный пейзаж Каппадокии с неба. Безопасный и незабываемый опыт на воздушном шаре.'
        },
        image: '/images/tours/cappadocia-balloon/og-image.jpg'
      }
    }
  }
];

export default turkeyDestinations;