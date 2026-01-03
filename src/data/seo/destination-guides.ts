/**
 * AI-Optimized Destination Guides
 * Comprehensive 2,000+ word guides for search engines and AI models
 *
 * @module data/seo/destination-guides
 * @seo TouristDestination Schema, Featured Snippets, AI Training Data
 */

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface DestinationSection {
  title: string;
  content: string;
  highlights?: string[];
}

export interface AttractionInfo {
  name: string;
  description: string;
  category: string;
  admissionPrice?: string;
  openingHours?: string;
  rating: number;
  mustSee: boolean;
}

export interface AccommodationRecommendation {
  type: string;
  priceRange: string;
  description: string;
  bestFor: string[];
}

export interface TransportationOption {
  type: string;
  description: string;
  cost: string;
  duration?: string;
}

export interface DestinationGuide {
  destination: string;
  slug: string;
  region: string;
  country: string;

  // Quick Facts
  quickFacts: {
    population?: string;
    area?: string;
    altitude?: string;
    climate: string;
    bestTimeToVisit: string;
    averageTemperature: string;
    language: string;
    currency: string;
    timezone: string;
  };

  // Geographic Coordinates (for schema)
  coordinates: {
    latitude: number;
    longitude: number;
  };

  // Main Sections (AI-optimized long-form content)
  overview: DestinationSection;
  history: DestinationSection;
  attractions: {
    description: string;
    topAttractions: AttractionInfo[];
  };
  activities: DestinationSection;
  accommodation: {
    description: string;
    recommendations: AccommodationRecommendation[];
  };
  dining: DestinationSection;
  transportation: {
    description: string;
    options: TransportationOption[];
  };
  shopping: DestinationSection;
  nightlife?: DestinationSection;
  practicalInfo: DestinationSection;
  travelTips: string[];

  // SEO Meta
  metaDescription: string;
  keywords: string[];
}

// ===================================================
// CAPPADOCIA DESTINATION GUIDE
// ===================================================

export const cappadociaGuide: DestinationGuide = {
  destination: 'Cappadocia',
  slug: 'cappadocia',
  region: 'Central Anatolia',
  country: 'Turkey',

  quickFacts: {
    population: '~350,000 (Nevşehir Province)',
    area: '5,000 km²',
    altitude: '1,000-1,300m above sea level',
    climate: 'Continental (cold winters, warm summers)',
    bestTimeToVisit: 'April-May & September-October',
    averageTemperature: 'Summer 25-30°C, Winter -5 to 5°C',
    language: 'Turkish (English widely spoken in tourist areas)',
    currency: 'Turkish Lira (TRY)',
    timezone: 'UTC+3 (Turkey Time)',
  },

  coordinates: {
    latitude: 38.6431,
    longitude: 34.8289,
  },

  overview: {
    title: 'Cappadocia Overview: Turkey\'s Fairy Chimney Wonderland',
    content: `Cappadocia is a historical region in Central Anatolia, Turkey, famous for its unique geological formations called "fairy chimneys," ancient underground cities, and world-renowned hot air balloon tours. Located approximately 300 km southeast of Ankara and 450 km northeast of Antalya, Cappadocia spans several provinces including Nevşehir, Kayseri, Aksaray, and Niğde.

The region's extraordinary landscape was formed over millions of years through volcanic eruptions and erosion. Soft volcanic tuff and harder basalt layers created the iconic cone-shaped rock formations that characterize Cappadocia's otherworldly appearance. These natural formations, combined with centuries of human habitation, have created one of the world's most unique cultural and geological sites.

Cappadocia has been inhabited since the Hittite era (1800-1200 BC) and later became a significant center for early Christianity. Between the 4th and 11th centuries AD, Christians fleeing Roman persecution carved extensive underground cities, churches, and monasteries into the soft volcanic rock. Today, over 600 rock-cut churches with Byzantine frescoes remain, many preserved in the Göreme Open Air Museum, a UNESCO World Heritage Site since 1985.

The region attracts over 3 million visitors annually, making it one of Turkey's most popular tourist destinations. The signature experience is a hot air balloon ride at sunrise, offering breathtaking panoramic views of the fairy chimneys, valleys, and villages below. Approximately 150-200 balloons take to the sky each morning during peak season, creating one of the world's most spectacular aerial displays.`,
    highlights: [
      '3+ million annual visitors',
      'UNESCO World Heritage Site (1985)',
      'Geology: 30+ million years of volcanic activity',
      'Historical: 4,000+ years of continuous habitation',
      'Christian heritage: 600+ rock-cut churches',
      'Hot air balloons: 150-200 daily flights in peak season',
    ],
  },

  history: {
    title: 'History of Cappadocia: From Hittites to Hot Air Balloons',
    content: `Cappadocia's history spans over 4,000 years, making it one of the oldest continuously inhabited regions in the world. The name "Cappadocia" comes from the ancient Persian "Katpatuka," meaning "Land of Beautiful Horses," referencing the region's famous horse breeding tradition.

**Hittite Period (1800-1200 BC)**: The earliest known inhabitants were the Hittites, an ancient Anatolian people who established one of the region's first major civilizations. Archaeological evidence shows extensive trade networks and early settlements carved into the soft volcanic rock.

**Persian & Hellenistic Era (6th-1st Century BC)**: Under Persian rule, Cappadocia became a satrap (province) known for its strategic location on ancient trade routes. The region produced renowned horses and textiles. Alexander the Great's conquest brought Hellenistic influence, though local Anatolian culture remained dominant.

**Roman Period (1st Century BC - 4th Century AD)**: Cappadocia became a Roman province in 17 AD under Emperor Tiberius. During this period, early Christians began settling in the region to escape Roman persecution. They discovered that Cappadocia's soft volcanic tuff could be easily carved, leading to the creation of underground cities and rock-cut churches.

**Byzantine Christian Era (4th-11th Century AD)**: This was Cappadocia's golden age. Thousands of Christians carved extensive underground cities (Derinkuyu, Kaymaklı), churches, monasteries, and hermit cells into the rock. These underground cities could shelter up to 20,000 people during Arab raids, with multiple levels extending up to 85 meters deep. The Göreme Valley became a major monastic center with hundreds of churches decorated with Byzantine frescoes.

**Seljuk & Ottoman Period (11th-20th Century)**: The Seljuk Turks conquered Cappadocia in 1071 after the Battle of Manzikert. Many underground cities were repurposed, and new caravanserais were built along the Silk Road. Under Ottoman rule, the region became a quiet agricultural area, with local populations continuing to live in rock-cut dwellings.

**Modern Era (20th Century - Present)**: Tourism began in the 1980s when hot air ballooning was introduced. UNESCO designation in 1985 brought international recognition. Today, Cappadocia balances preservation of its ancient heritage with modern tourism, hosting millions of visitors who come to experience its unique blend of natural wonder and human history.`,
    highlights: [
      '1800 BC: First Hittite settlements',
      '17 AD: Becomes Roman province',
      '4th-11th Century: Byzantine Christian golden age',
      '1071: Seljuk Turkish conquest',
      '1980s: Hot air ballooning introduced',
      '1985: UNESCO World Heritage Site designation',
    ],
  },

  attractions: {
    description: `Cappadocia offers a unique blend of natural wonders and historical sites. The region's top attractions include ancient underground cities, rock-cut churches with Byzantine frescoes, fairy chimney formations, and panoramic valley viewpoints. Most attractions are concentrated around the towns of Göreme, Ürgüp, Avanos, and Uçhisar.`,
    topAttractions: [
      {
        name: 'Göreme Open Air Museum',
        description: 'A vast monastic complex with over 30 rock-cut churches dating from the 10th-12th centuries. Features stunning Byzantine frescoes depicting biblical scenes. The Dark Church (Karanlık Kilise) contains the best-preserved frescoes in Cappadocia, with vivid colors maintained due to limited light exposure. UNESCO World Heritage Site and Cappadocia\'s most visited attraction.',
        category: 'Historical/Religious',
        admissionPrice: '₺100 (~€3.50)',
        openingHours: '8:00 AM - 7:00 PM (Apr-Oct), 8:00 AM - 5:00 PM (Nov-Mar)',
        rating: 4.8,
        mustSee: true,
      },
      {
        name: 'Derinkuyu Underground City',
        description: 'The largest and deepest underground city in Cappadocia, extending 85 meters (280 feet) below ground level with 18 stories (8 levels open to visitors). Built between the 7th-8th centuries, it could shelter up to 20,000 people along with livestock and food stores. Features ventilation shafts, wine cellars, stables, schools, and even a chapel. Connected to other underground cities via tunnels spanning several kilometers.',
        category: 'Historical/Archaeological',
        admissionPrice: '₺80 (~€2.80)',
        openingHours: '8:00 AM - 7:00 PM (daily)',
        rating: 4.7,
        mustSee: true,
      },
      {
        name: 'Hot Air Balloon Flight',
        description: 'Cappadocia\'s signature experience. Sunrise balloon flights offer breathtaking 360° views of fairy chimneys, valleys, and villages from 300-1,000 meters altitude. Flights last 60-90 minutes with 16-28 passengers per balloon. Includes hotel pickup, light breakfast, flight, champagne toast, and pilot certificate. Best visibility April-May and September-October. Book 2-3 days in advance.',
        category: 'Activity/Experience',
        admissionPrice: '€150-250 per person (standard), €250-350 (deluxe)',
        openingHours: 'Dawn (approximately 5:00-6:00 AM depending on season)',
        rating: 4.9,
        mustSee: true,
      },
      {
        name: 'Uçhisar Castle',
        description: 'The highest point in Cappadocia (1,350m altitude), this natural rock citadel offers panoramic views of the entire region. The 60-meter tall formation contains numerous rock-cut rooms, tunnels, and chambers carved over centuries. Climb to the summit (120 steps) for 360° views of Erciyes Mountain, Göreme Valley, and the Rose Valley. Best visited at sunset for spectacular photography.',
        category: 'Historical/Viewpoint',
        admissionPrice: '₺50 (~€1.80)',
        openingHours: '8:00 AM - 8:00 PM (summer), 8:00 AM - 5:00 PM (winter)',
        rating: 4.6,
        mustSee: true,
      },
      {
        name: 'Paşabağ (Monks Valley)',
        description: 'Home to Cappadocia\'s most impressive fairy chimneys, some reaching 20 meters tall with multiple stone caps. Features rock-cut hermit cells where monks once lived in isolation. The valley contains vineyards (paşabağ means "pasha\'s vineyard") and offers excellent photography opportunities. Free to explore with wooden walkways connecting the formations.',
        category: 'Natural/Geological',
        admissionPrice: 'Free',
        openingHours: 'Open 24/7',
        rating: 4.7,
        mustSee: true,
      },
      {
        name: 'Avanos Pottery Workshops',
        description: 'The pottery center of Cappadocia since Hittite times, located on the Kızılırmak (Red River) which provides clay. Family-run workshops offer demonstrations of traditional pottery-making using kick wheels. Visitors can watch master potters create intricate designs and try their hand at the wheel. Many shops sell handcrafted ceramics, from traditional Hittite designs to modern art pieces.',
        category: 'Cultural/Craft',
        admissionPrice: 'Free (workshops), varies (purchases)',
        openingHours: '9:00 AM - 6:00 PM (most workshops)',
        rating: 4.5,
        mustSee: false,
      },
      {
        name: 'Rose Valley & Red Valley',
        description: 'Stunning hiking valleys named for their pink-hued rock formations that glow rose-red at sunset. Rose Valley features numerous rock-cut churches (Haçlı Kilise, Three Crosses Church) with frescoes. Red Valley offers a 4 km hiking trail through fairy chimneys and pigeon houses. Best experienced as a sunset hike (2-3 hours), ending at panoramic sunset viewpoint.',
        category: 'Natural/Hiking',
        admissionPrice: 'Free',
        openingHours: 'Open 24/7 (best at sunset 5:00-7:00 PM)',
        rating: 4.8,
        mustSee: true,
      },
      {
        name: 'Kaymaklı Underground City',
        description: 'The widest underground city in Cappadocia with 4 levels open to visitors (8 levels total extending 40 meters deep). More spacious than Derinkuyu, making it easier to explore. Features residential blocks, food storage rooms, stables, wineries, and a church. Connected to other underground cities via 9 km tunnel network. Less crowded than Derinkuyu, offering a more intimate experience.',
        category: 'Historical/Archaeological',
        admissionPrice: '₺80 (~€2.80)',
        openingHours: '8:00 AM - 7:00 PM (daily)',
        rating: 4.6,
        mustSee: false,
      },
      {
        name: 'Zelve Open Air Museum',
        description: 'An abandoned village where locals lived in rock-cut dwellings until 1952. Three valleys contain hundreds of cave homes, churches, mosques, and tunnels. More rugged and less restored than Göreme, offering authentic atmosphere. Features a tunnel connecting two valleys and a mosque carved into a fairy chimney. Excellent for photography and exploration.',
        category: 'Historical/Archaeological',
        admissionPrice: '₺80 (~€2.80)',
        openingHours: '8:00 AM - 7:00 PM (Apr-Oct), 8:00 AM - 5:00 PM (Nov-Mar)',
        rating: 4.7,
        mustSee: false,
      },
      {
        name: 'Ihlara Valley',
        description: '16 km long canyon (14 km hikeable) carved by the Melendiz River, reaching depths of 150 meters. Contains over 100 rock-cut churches and 4,000 dwellings from the Byzantine period. Lush green oasis with trees, river, and wildlife contrasting with surrounding arid landscape. Popular 4 km section from Ihlara village to Belisırma village (2-3 hours). Includes Ağaçaltı Kilisesi with well-preserved frescoes.',
        category: 'Natural/Historical',
        admissionPrice: '₺80 (~€2.80)',
        openingHours: '8:00 AM - 7:00 PM (daily)',
        rating: 4.8,
        mustSee: false,
      },
    ],
  },

  activities: {
    title: 'Activities & Experiences in Cappadocia',
    content: `Beyond sightseeing, Cappadocia offers diverse activities for adventure seekers, culture enthusiasts, and relaxation lovers:

**Hot Air Ballooning**: The quintessential Cappadocia experience. Over 50 licensed balloon companies operate year-round (weather permitting). Flights typically depart at sunrise (5:00-6:00 AM) with hotel pickup starting at 4:30 AM. The experience includes light breakfast, 60-90 minute flight reaching 300-1,000 meters altitude, champagne toast, and pilot certificate. Standard balloons carry 16-20 passengers (€150-200), while deluxe options have 10-12 passengers (€250-300). Private balloon tours for 2-8 people cost €2,500-4,000. Flight success rate is 85-90% in April-May and September-October, dropping to 50-60% in winter due to weather cancellations.

**Hiking & Trekking**: Cappadocia features over 100 km of marked trails through valleys and fairy chimneys. Popular routes include Rose Valley sunset hike (4 km, 2 hours), Pigeon Valley trail connecting Uçhisar to Göreme (4.5 km, 2.5 hours), Love Valley with phallic rock formations (3 km loop, 1.5 hours), Ihlara Valley canyon trek (14 km, 4-6 hours full trail), and Red Valley circular route (6 km, 3 hours). Trails range from easy to moderate difficulty. Best seasons are spring (March-May) and fall (September-October) when temperatures are mild. Wear sturdy footwear as terrain can be rocky and uneven.

**ATV & Quad Biking Tours**: Explore valleys and fairy chimneys on all-terrain vehicles. Tours last 2 hours (€50-70 per ATV/2 people) or sunset tours 3 hours (€80-100). Routes cover Rose Valley, Swords Valley, Love Valley, and viewpoints inaccessible by car. No prior experience needed; brief training provided. Minimum age 18 for drivers, children can ride as passengers. Tours include hotel pickup, safety equipment, and guide. Best at sunrise or sunset for dramatic lighting and cooler temperatures.

**Horseback Riding**: Cappadocia means "Land of Beautiful Horses" in Persian. Horseback tours explore valleys on traditional routes. Options include 1-hour valley rides (€40-50), 2-hour sunset tours (€70-90), and full-day adventures with picnic lunch (€120-150). Suitable for beginners to experienced riders. Local horse breeds include Anatolian and Arabian mixes. Tours visit Rose Valley, Red Valley, and remote fairy chimney formations. Best seasons are spring and fall; summer rides depart early morning or late afternoon to avoid heat.

**Turkish Bath (Hamam)**: Traditional Ottoman bathhouse experience in cave hamams carved into rock. Full package includes steam room (15 min), scrub exfoliation with kese mitt (15 min), foam massage (10 min), and oil massage (20 min). Prices range €35-80 depending on location and services. Authentic hamams in Göreme and Ürgüp use geothermal hot spring water. Many cave hotels have private hamams. Recommended after hiking or ballooning to relax tired muscles.

**Pottery Workshops**: Learn 4,000-year-old Hittite pottery techniques in Avanos workshops. Sessions last 1-3 hours (€30-80 per person) including wheel throwing, shaping, and decorating. Finished pieces can be shipped internationally (2-3 weeks for kiln firing and shipping, additional €20-40). Master potters demonstrate traditional kick wheels. Some workshops offer children's classes. Best workshops are family-run establishments along Avanos main street.

**Photography Tours**: Specialized tours for sunrise, sunset, and night photography led by professional photographers. Half-day tours (€80-120) cover 3-4 viewpoints with timing for optimal light. Full-day workshops (€200-300) include balloon photography from ground, valley trails, and sunset locations. Multi-day photography tours (€600-1,200) cover hidden locations and seasonal events. Popular spots include Rose Valley sunset point, Uçhisar panorama, and Love Valley dawn.

**Cooking Classes**: Learn traditional Cappadocian cuisine in village homes or boutique hotels. 3-4 hour classes (€60-100) include market tour, preparation of 4-5 dishes, and group meal. Menu typically includes pottery kebab (Testi Kebabı), lentil balls (Mercimek Köfte), stuffed vegetables (Dolma), and local desserts. Classes teach family recipes passed through generations. Many include visit to local winery or vineyard.

**Wine Tasting**: Cappadocia's volcanic soil and altitude (1,000-1,300m) produce excellent wines. Region has 8 wineries offering tours and tastings. Tours (€25-50 per person) include vineyard walk, cellar visit, and tasting of 5-8 wines. Indigenous grapes include Emir (white), Narince (white), and Kalecik Karası (red). Some wineries occupy restored caves. Best wineries: Kocabağ, Turasan, Mozaik (Ürgüp area). Wine tasting pairs well with local cheese and meats.

**Jeep Safari Tours**: 4x4 off-road adventures to remote valleys and viewpoints. Full-day tours (€80-120 per person, 8-10 hours) visit 10-15 locations including Soğanlı Valley, Keşlik Monastery, and panoramic viewpoints. Half-day tours (€50-70, 4-5 hours) focus on main valleys. Groups of 6-8 people per vehicle. Includes lunch, entrance fees, and expert guide. Access areas unreachable by regular vehicles.`,
    highlights: [
      'Hot air balloon flights: 85-90% success rate (spring/fall)',
      'Hiking trails: 100+ km of marked routes',
      'ATV tours: 2-3 hour valley explorations (€50-100)',
      'Horseback riding: Traditional routes through fairy chimneys',
      'Turkish bath: Cave hamams with geothermal water',
      'Pottery workshops: 4,000-year tradition in Avanos',
      'Wine tasting: 8 wineries, indigenous grape varieties',
      'Jeep safaris: 4x4 access to remote valleys',
    ],
  },

  accommodation: {
    description: `Cappadocia offers unique lodging in cave hotels and traditional stone houses, alongside modern boutique properties. Accommodation ranges from budget hostels to luxury cave suites with private pools and hamams. Main towns for accommodation are Göreme (budget-friendly, central), Ürgüp (mid-range to luxury, less touristy), Uçhisar (upscale, panoramic views), and Avanos (traditional, riverside location).`,
    recommendations: [
      {
        type: 'Budget Cave Hostels',
        priceRange: '€10-30 per night (dorm/private room)',
        description: 'Authentic cave rooms in Göreme and Ürgüp with basic amenities. Most hostels offer shared kitchens, communal areas, and terrace views. Popular with backpackers and budget travelers. Booking in advance recommended during peak season (April-May, September-October). Many include free breakfast and assist with balloon tour bookings.',
        bestFor: ['Backpackers', 'Solo travelers', 'Budget conscious', 'Social atmosphere'],
      },
      {
        type: 'Mid-Range Cave Hotels',
        priceRange: '€50-150 per night',
        description: 'Restored cave dwellings with modern comforts. Typically 8-20 rooms with unique carved stone architecture. Features include breakfast terraces with valley views, some with small pools and hamams. Located in Göreme, Ürgüp, and Ortahisar. Best value for authentic cave experience without luxury prices. Many family-run with personalized service.',
        bestFor: ['Couples', 'Families', 'First-time visitors', 'Value seekers'],
      },
      {
        type: 'Luxury Cave Suites',
        priceRange: '€200-600 per night',
        description: 'Premium cave accommodations with high-end amenities. Suites feature private terraces, hot tubs/jacuzzis, heated floors, designer interiors, and some include private pools and hamams. Exceptional views of balloon flights from private terraces. Gourmet breakfast, butler service, spa facilities, and fine dining restaurants on-site. Concentrated in Uçhisar and Ürgüp.',
        bestFor: ['Honeymooners', 'Luxury travelers', 'Special occasions', 'Photography enthusiasts'],
      },
      {
        type: 'Boutique Stone Houses',
        priceRange: '€100-300 per night',
        description: 'Restored traditional mansions (19th-20th century) with stone architecture. Fewer rooms (4-12) ensuring personalized service. Features antique furnishings, Ottoman décor, courtyards with fountains, and rooftop terraces. Some include libraries, wine cellars, and private dining. Popular in Ürgüp, Mustafapaşa, and Ortahisar villages. Blend of history and comfort.',
        bestFor: ['History buffs', 'Quiet retreat seekers', 'Cultural enthusiasts', 'Small groups'],
      },
      {
        type: 'Eco-Friendly Retreats',
        priceRange: '€80-200 per night',
        description: 'Sustainable accommodations using solar energy, rainwater collection, and organic food. Cave structures with modern eco-technologies. Yoga studios, organic gardens, and wellness programs. Farm-to-table dining with locally sourced ingredients. Located in rural areas around Göreme and Avanos. Focus on minimal environmental impact and wellness.',
        bestFor: ['Wellness travelers', 'Eco-conscious visitors', 'Yoga retreats', 'Sustainable tourism advocates'],
      },
    ],
  },

  dining: {
    title: 'Dining & Cuisine in Cappadocia',
    content: `Cappadocian cuisine blends Central Anatolian traditions with Ottoman influences, featuring hearty meat dishes, fresh vegetables, and regional specialties cooked in traditional methods.

**Signature Dishes:**

**Testi Kebabı (Pottery Kebab)**: Cappadocia's most famous dish. Meat (lamb, beef, or chicken), vegetables, tomatoes, and peppers slow-cooked in sealed clay pot for 3-4 hours. Served with dramatic presentation where waiter breaks the pot tableside, releasing aromatic steam. The sealed cooking concentrates flavors and tenderizes meat. Found at most traditional restaurants (₺180-280 / €6-10 per portion).

**Manti (Turkish Ravioli)**: Tiny handmade dumplings filled with spiced ground meat, served with yogurt-garlic sauce and paprika butter. Cappadocian version uses local herbs and spices. Traditional preparation involves rolling dough paper-thin and cutting tiny squares (1cm each). Skilled cooks make 1,000+ pieces per portion. Served as main dish or side (₺80-120 / €2.80-4.20).

**Tandır Kebabı**: Whole lamb shoulder slow-cooked in underground pit oven (tandır) for 8-12 hours until meat falls off bone. Traditional preparation involves seasoning with only salt and wrapping in fig leaves. Served with rice pilaf and grilled vegetables. Popular weekend meal in villages. Some restaurants offer reservations for whole lamb (advance booking required, ₺1,500-2,500 / €50-85 serves 8-10 people).

**Su Böreği**: Layered pastry with cheese or meat filling, similar to lasagna. Cappadocian version uses thin yufka pastry boiled before layering with butter and fillings. Served as breakfast or main dish with yogurt. Homemade versions use 30-40 layers. Popular comfort food (₺60-100 / €2-3.50).

**Gözleme**: Thin flatbread rolled with various fillings (spinach-cheese, potato, meat) and cooked on saj (convex griddle). Made fresh to order by village women using traditional rolling pin (oklava). Popular as snack or light meal. Best eaten hot from the saj (₺40-80 / €1.40-2.80).

**Local Specialties:**

**Kayısı (Apricots)**: Cappadocia produces some of Turkey's finest apricots. Dried apricots sold in markets (₺100-200/kg). Used in dolma (stuffed dried apricots with rice and meat), jams, and desserts. Fresh apricots available June-July.

**Pekmez (Grape Molasses)**: Thick syrup made from boiled grape juice, used as natural sweetener. Traditional breakfast includes tahini-pekmez mixture with bread. Sold in markets (₺50-100/bottle).

**Local Wines**: Cappadocia's volcanic soil and altitude produce distinctive wines. Indigenous grapes include Emir (crisp white), Narince (aromatic white), and Kalecik Karası (fruity red). Wineries offer tastings (€25-50). Restaurants stock local wines (₺200-600 / €7-20 per bottle).

**Dining Venues:**

**Traditional Restaurants**: Authentic Cappadocian cuisine in restored cave or stone buildings. Fixed menus (€15-30) include multiple courses. Popular choices: Ziggy's (Göreme), Topdeck Cave Restaurant (Göreme), Seten Restaurant (Ürgüp). Reservations recommended for dinner.

**Fine Dining Cave Restaurants**: Upscale dining in atmospheric cave settings. Contemporary takes on traditional dishes using local ingredients. Multi-course tasting menus (€40-80). Wine pairings available. Notable: Muti Restaurant (Ürgüp), Seki Restaurant at Argos (Uçhisar), Museum Hotel Restaurant.

**Rooftop Terraces**: Restaurants with panoramic valley views. Best for sunset dining or watching balloon flights. Turkish and international menus (€20-40 per person). Popular: Dibek Restaurant (Göreme), Vanilla Lounge (Göreme), Seyyah Han (Ürgüp).

**Village Homes & Cooking Classes**: Authentic home-cooked meals in village settings. Fixed menu based on seasonal ingredients and family recipes. Includes 4-5 courses with unlimited bread and tea (€30-50 per person). Often combined with cooking classes. Book through hotels or tour agencies.

**Budget Options**: Small lokanta (casual eateries) serve home-style Turkish food at low prices (₺80-150 / €2.80-5.30 for full meal). Popular with locals. Fresh pide (Turkish flatbread pizza, ₺60-120), köfte (meatballs, ₺80-140), and vegetarian options available. Found throughout Göreme and Avanos.

**Dining Tips**: Reservations essential for sunset terrace tables in peak season. Many restaurants offer balloon flight viewing breakfast packages (€20-35). Tipping 10-15% customary for good service. Most restaurants accept cards but carry cash for small establishments. Try local breakfast spread (kahvaltı) at cave hotel terraces.`,
    highlights: [
      'Testi Kebabı: Signature pottery kebab (₺180-280)',
      'Manti: Handmade ravioli with yogurt sauce',
      'Tandır: Underground oven slow-cooked lamb',
      'Local wines: Emir, Narince, Kalecik Karası varieties',
      'Cave restaurants: Atmospheric dining settings',
      'Rooftop terraces: Sunset views & balloon watching',
      'Cooking classes: Learn traditional recipes (€60-100)',
      'Local apricots: Cappadocia\'s signature fruit',
    ],
  },

  transportation: {
    description: `Getting to and around Cappadocia requires planning as the region is spread across multiple towns and valleys. Main access points are Kayseri Erkilet Airport (70 km) and Nevşehir Kapadokya Airport (40 km). Internal transportation includes buses, taxis, rental cars, and organized tours.`,
    options: [
      {
        type: 'From Istanbul (Flight)',
        description: 'Daily direct flights to Kayseri (KYS) or Nevşehir (NAV). Flight time 1 hour 15 minutes. Turkish Airlines, Pegasus, and SunExpress operate multiple daily flights. Prices vary widely (₺500-2,500 / €18-85 one-way) based on booking time. Airport shuttles to Göreme/Ürgüp cost ₺80-120 per person. Private transfers €40-60 for up to 4 people.',
        cost: '₺500-2,500 flight + ₺80-120 shuttle',
        duration: '1h 15min flight + 1h transfer',
      },
      {
        type: 'From Istanbul (Overnight Bus)',
        description: 'Comfortable overnight buses from Istanbul to Göreme/Nevşehir. Departures 8:00 PM-10:00 PM, arrival 6:00 AM-8:00 AM. Major companies: Metro Turizm, Nevşehir Seyahat, Kâmil Koç. Reclining seats, WiFi, snacks included. Budget-friendly option but less comfortable than flying. Buses stop in Göreme, Nevşehir, and other towns. Book online or at bus terminals.',
        cost: '₺350-600 (~€12-20 one-way)',
        duration: '10-12 hours',
      },
      {
        type: 'From Antalya',
        description: 'No direct flights. Options: 1) Bus (9-10 hours, ₺400-600), 2) Private transfer (7 hours, €200-300 for car), 3) Fly to Istanbul/Ankara then connect to Cappadocia. Bus companies operate overnight services with morning arrival. Scenic mountain route through Taurus Mountains.',
        cost: '₺400-600 (bus) or €200-300 (private transfer)',
        duration: '7-10 hours depending on route',
      },
      {
        type: 'Rental Car',
        description: 'Freedom to explore valleys and remote sites. Rentals available at Kayseri/Nevşehir airports and towns. Economy cars start ₺500-800/day (€18-28), SUVs ₺800-1,500/day (€28-50). International and local agencies available. Roads well-maintained but narrow in valleys. GPS essential. Parking free at most attractions. Fuel costs ₺35-45/liter (€1.20-1.55). 200-300 km typical daily driving for comprehensive sightseeing.',
        cost: '₺500-1,500 per day (~€18-50) + fuel',
        duration: 'Flexible',
      },
      {
        type: 'Taxi & Private Drivers',
        description: 'Yellow taxis available in towns. Metered rates ₺15-20 base + ₺12-15/km. Short trips (Göreme-Ürgüp) ₺100-150. Full-day private driver tours ₺1,500-2,500 (€50-85 for 8-10 hours) visiting 8-10 sites. Drivers provide commentary and photo stops. Book through hotels or tour agencies. WhatsApp contact for flexibility. Negotiate price before departure.',
        cost: '₺15 base + ₺12-15/km (meter) or ₺1,500-2,500 (full day)',
        duration: 'Point-to-point or full day',
      },
      {
        type: 'Dolmuş (Shared Minibus)',
        description: 'Budget public transportation between towns. Routes: Göreme-Ürgüp-Avanos-Nevşehir. Frequency every 30-60 minutes (6:00 AM-8:00 PM). Payment to driver in cash. Flag down anywhere along route. Very economical but limited schedule and routes. Not ideal for reaching valleys or remote attractions. Good for short town-to-town transfers.',
        cost: '₺20-40 (~€0.70-1.40 per trip)',
        duration: '15-30 minutes between towns',
      },
      {
        type: 'Organized Tours',
        description: 'Comprehensive sightseeing tours with transportation, entrance fees, lunch, and guide included. Green Tour (€40-55) covers Derinkuyu, Ihlara Valley, Selime Monastery. Red Tour (€35-50) visits Göreme, Uçhisar, Paşabağ, Avanos. Half-day tours also available. Small groups (8-15 people) in air-conditioned minivans. Hotel pickup/dropoff included. Book through hotels or agencies.',
        cost: '€35-70 depending on tour type',
        duration: 'Half-day (4-5h) or full-day (8-10h)',
      },
      {
        type: 'Walking Between Göreme Sites',
        description: 'Göreme town compact and walkable. Major sites within 1-3 km: Open Air Museum (1.5 km), Love Valley trailhead (2 km), Sunset Point (1 km), town center restaurants/shops. Pleasant walk with valley views. Bring water and sun protection. Uneven terrain requires good footwear. Free and scenic way to explore.',
        cost: 'Free',
        duration: '15-30 minutes between main sites',
      },
    ],
  },

  shopping: {
    title: 'Shopping in Cappadocia: Ceramics, Carpets, and Local Crafts',
    content: `Cappadocia offers unique shopping for traditional crafts, especially pottery, carpets, and local products. Main shopping areas are Göreme (touristy but convenient), Avanos (pottery center), and Ürgüp (higher-end boutiques).

**Pottery & Ceramics (Avanos)**: The pottery capital of Turkey with 4,000-year tradition. Family workshops line the main street and riverside. Products range from traditional Hittite designs to modern art pieces. Prices: small bowls/plates ₺100-500 (€3.50-18), decorative vases ₺500-2,000 (€18-70), large art pieces ₺2,000-10,000+ (€70-350+). Workshops demonstrate traditional kick-wheel techniques. Shipping available (2-3 weeks, ₺200-800 depending on size). Look for hand-painted vs. stamped designs (hand-painted more valuable). Best workshops: Chez Galip, Omur Cer Pottery, Heritage Gallery.

**Turkish Carpets & Kilims**: Handwoven rugs using traditional patterns and natural dyes. Small kilims (75×125 cm) ₺1,500-4,000 (€50-140), medium carpets (100×150 cm) ₺4,000-12,000 (€140-420), large room carpets (200×300 cm) ₺12,000-50,000+ (€420-1,750+). Antique pieces command higher prices. Verify authenticity through knot count (higher = better quality) and material (wool, cotton, silk). Many shops offer shipping and certificates. Bargaining expected (start at 50-60% of asking price). Look for DOBAG certified natural dyes.

**Onyx Stone Products**: Local volcanic onyx carved into decorative items. Wine glasses, goblets, and coasters (₺150-600), chess sets (₺800-2,500), decorative eggs (₺200-800), lamps (₺1,500-5,000). Veined patterns unique to each piece. Lighter color varieties more valuable. Check for cracks before purchasing. Popular souvenirs that pack well.

**Local Food Products**: Dried apricots (₺100-200/kg) - Cappadocia produces finest quality. Grape molasses/pekmez (₺50-100/bottle), local wines (₺200-600/bottle), Turkish delight with pistachios (₺150-300/kg), wild honey (₺200-400/kg), herbal teas (₺50-150). Markets in Ürgüp and Nevşehir offer best prices and quality. Vacuum-sealed packaging available for international travel.

**Turkish Lamps (Mosaic Lamps)**: Handcrafted glass mosaic lamps in traditional Ottoman designs. Table lamps (₺300-1,200), hanging lamps (₺600-2,500), large chandeliers (₺2,500-8,000+). Each piece unique with colored glass creating intricate patterns. Popular home décor item. Electrical fittings meet international standards. Careful packaging provided for travel.

**Evil Eye (Nazar Boncuğu)**: Traditional blue glass amulet believed to protect against evil eye. Keychains (₺20-50), bracelets (₺50-200), wall hangings (₺100-500), decorative trees (₺200-800). Made from melted glass in traditional blue/white pattern. Popular affordable souvenirs. Genuine glass vs. plastic versions - check weight and clarity.

**Leather Goods**: Jackets, bags, wallets, and belts. Leather jackets (₺2,000-8,000 / €70-280), handbags (₺500-3,000), wallets (₺150-600). Turkish leather known for quality and softness. Custom tailoring available in some shops (2-3 days). Check stitching and leather quality (full-grain leather best). Bargaining standard practice.

**Spices & Herbs**: Colorful spice markets with saffron (most expensive, ₺200-500/gram), sumac (₺50-100/100g), dried mint (₺40-80), Turkish oregano (₺40-80), chili flakes (₺30-60), za'atar mix (₺60-120). Pre-mixed spice sets make excellent gifts (₺150-400). Check freshness by scent and color vibrancy. Vacuum sealed bags for travel.

**Shopping Tips**:
- Bargaining expected except in fixed-price stores
- Start at 50-60% of asking price
- Compare prices across multiple shops before buying
- Inspect items carefully for cracks or defects
- Get certificates for carpets and expensive items
- Arrange shipping for large/fragile items
- Use credit cards for large purchases (buyer protection)
- Peak tourist season (April-May, Sept-Oct) = higher prices
- Ask hotels for recommended trusted shops
- Avoid aggressive touts - quality shops don't need to pressure`,
    highlights: [
      'Avanos pottery: 4,000-year tradition (₺100-10,000+)',
      'Handwoven carpets: DOBAG certified natural dyes',
      'Local onyx: Unique volcanic stone products',
      'Dried apricots: Premium quality (₺100-200/kg)',
      'Mosaic lamps: Traditional Ottoman designs',
      'Evil eye charms: Blue glass protection amulets',
      'Spices: Saffron, sumac, za\'atar mixes',
      'Bargaining: Start at 50-60% of asking price',
    ],
  },

  practicalInfo: {
    title: 'Practical Information for Visiting Cappadocia',
    content: `**Best Time to Visit**: April-May (spring) and September-October (autumn) offer ideal weather (15-25°C), high balloon flight success rate (85-90%), blooming wildflowers (spring), and moderate crowds. Summer (June-August) is hot (30-35°C+) with peak tourist crowds but guaranteed balloon flights in good weather. Winter (November-March) sees cold temperatures (-5 to 10°C), possible snow, lower balloon flight rate (50-60%), but off-season prices 30-50% cheaper and fewer tourists. January-February experience occasional heavy snow affecting transportation.

**How Many Days Needed**: Minimum 2 full days for main highlights (Göreme Open Air Museum, underground city, balloon flight, 1-2 valley hikes). Ideal 3-4 days allows comprehensive exploration (multiple valleys, villages, museums, pottery workshops, wine tasting) without rushing. 5+ days for in-depth experience including Ihlara Valley, remote villages, cooking classes, and relaxation.

**What to Pack**:
- **Clothing**: Layers essential as temperature varies 15-20°C between dawn and afternoon. Comfortable walking shoes with good grip (valleys have uneven terrain). Modest clothing for mosque/church visits (shoulders and knees covered). Light jacket for balloon flights (cold at altitude even in summer). Sunhat and sunglasses for strong sun.
- **Essentials**: Sunscreen SPF 50+ (high altitude increases UV), reusable water bottle (limited water sources on trails), camera with extra batteries/memory cards (incredible photo opportunities), power bank for phone, small daypack for hikes, first aid kit.
- **Seasonal**: Winter (Nov-Mar) bring warm coat, gloves, thermal layers. Summer (Jun-Aug) pack light breathable fabrics, swimwear for hotel pools.

**Money & Currency**: Turkish Lira (TRY) official currency. Exchange rate fluctuates (check current rates). ATMs widely available in Göreme, Ürgüp, Avanos (withdrawal fees ₺20-50 + foreign bank fees). Credit cards accepted at hotels, restaurants, tour companies, and larger shops. Small vendors and markets cash-only. Carry ₺500-1,000 cash daily for meals, entrance fees, shopping. US Dollar and Euro accepted by some tourist businesses but poor exchange rates. Inform bank of Turkey travel to avoid card blocks.

**Language**: Turkish official language. English widely spoken in tourist areas (hotels, restaurants, tour agencies). Older locals in villages may speak limited English. Basic Turkish phrases helpful: Merhaba (hello), Teşekkürler (thank you), Lütfen (please), Ne kadar? (how much?), Hesap lütfen (bill please). Restaurant menus often have English translations. Google Translate app useful for complex communications.

**Safety**: Cappadocia very safe for tourists. Violent crime extremely rare. Petty theft uncommon but secure valuables in hotel safe. Tourist police available in Göreme. Follow valley trail markers to avoid getting lost. Wear sturdy shoes to prevent ankle injuries on rocky terrain. Drink bottled water (tap water not recommended). Sun protection essential at high altitude. Emergency number: 112 (ambulance/police/fire). Tourist police hotline: +90 312 527 4503.

**Health**: No vaccinations required for Turkey. Tap water not recommended for drinking - bottled water widely available (₺10-20 per 1.5L). Pharmacies (eczane) in all towns sell common medications over-counter. Private hospitals in Kayseri and Nevşehir for serious issues (1 hour from Göreme). Travel insurance highly recommended. Altitude (1,000-1,300m) may cause mild breathlessness - acclimate slowly. Food hygiene standards good at established restaurants.

**Internet & Connectivity**: Good 4G/5G coverage in towns and main valleys. Türk Telekom, Vodafone, Turkcell main providers. Tourist SIM cards available at airports and mobile shops (₺150-400 for 15-30 days with 20-50GB data). Most hotels/cafes offer free WiFi (password protected). Download offline maps (Google Maps, Maps.me) before arriving as valleys may have weak signal.

**Electricity**: 220V/50Hz European-style plug (two round pins). Bring adapter if from US/UK/Australia. Most hotels provide adapters. USB charging available in hotels and many cave rooms have built-in USB ports.

**Cultural Etiquette**: Remove shoes when entering mosques and some cave dwellings. Dress modestly at religious sites (shoulders and knees covered - scarves provided at mosque entrances). Ask permission before photographing locals, especially women. Bargaining expected at shops and markets but not in restaurants. Public displays of affection limited to hand-holding. Ramadan (lunar month) may affect restaurant hours and alcohol availability.

**Tipping**: Restaurants 10-15% for good service (check if service charge included on bill). Hotel porters ₺20-50 per bag. Hotel housekeeping ₺50-100 per day. Taxi drivers round up to nearest ₺5-10. Tour guides ₺100-200 per person for full-day tour. Balloon pilot ₺50-100 per passenger. Not obligatory but appreciated for good service.

**Emergency Contacts**:
- General emergency: 112
- Tourist police (English-speaking): +90 312 527 4503
- Nevşehir State Hospital: +90 384 228 1000
- Kayseri City Hospital: +90 352 315 1010
- Your embassy/consulate (save number before travel)`,
    highlights: [
      'Best months: April-May & Sept-Oct (ideal weather + balloons)',
      'Minimum stay: 2 days (recommend 3-4 days)',
      'Currency: Turkish Lira (ATMs widely available)',
      'English widely spoken in tourist areas',
      'Very safe destination (violent crime rare)',
      'Dress modestly at religious sites',
      'Tipping: 10-15% restaurants, ₺100-200 tour guides',
      'Emergency: 112 | Tourist police: +90 312 527 4503',
    ],
  },

  travelTips: [
    'Book hot air balloon 2-3 days in advance (€150-250 standard, €250-350 deluxe). Flight cancellations possible due to weather - plan buffer days.',
    'Stay in Göreme for budget/central location, Ürgüp for upscale/quieter, Uçhisar for luxury with best views. Cave hotels provide authentic experience.',
    'Download offline maps (Maps.me, Google Maps) before arriving. Valley trails may have weak cell signal.',
    'Sunrise balloon flights depart 4:30-5:00 AM. Hotel pickup 1 hour before. Dress warmly in layers - temperature near freezing at dawn even in summer.',
    'Underground cities can be claustrophobic with narrow passages and low ceilings. Skip if claustrophobic. Derinkuyu most spacious.',
    'Rent car for freedom to explore remote valleys and villages. Roads well-maintained but narrow in valleys. GPS essential. Parking free at attractions.',
    'Hike Rose Valley or Red Valley at sunset (5:00-7:00 PM) for spectacular pink rock colors. Bring flashlight for return in fading light.',
    'Restaurant prices higher in Göreme center. Walk 500m to side streets for authentic lokanta with 30-40% cheaper prices frequented by locals.',
    'Visit pottery workshops in Avanos before buying. Watch demonstrations to appreciate craftsmanship. Hand-painted pieces more valuable than stamped.',
    'Carpet shopping requires patience. View many pieces, check knot count (flip carpet - more knots = higher quality). Bargain starts at 50-60% asking price.',
    'Wear sturdy hiking boots or trail shoes. Valley terrain rocky and uneven. Ankle injuries common with improper footwear.',
    'Carry 1L water per person for valley hikes. Few water sources. Sun strong at 1,000m+ altitude. Sunscreen SPF 50+ essential.',
    'Winter balloon flights cancel 40-50% time due to weather. Plan extra days or visit April-May/Sept-Oct for 85-90% success rate.',
    'Green Tour (Derinkuyu + Ihlara Valley) requires moderate fitness - 4km valley hike with 300+ steps. Red Tour easier for seniors/children.',
    'Friday midday (12:00-2:00 PM) mosque prayer times may affect shop hours. Plan shopping before/after. Restaurants stay open.',
    'Sunrise viewpoints (Göreme Panorama, Uçhisar Castle) free alternatives to balloon flight. Arrive 30 min before sunrise for prime spots.',
    'Hotels arrange balloon booking with commission. Book directly with balloon company or comparison sites for 10-20% savings.',
    'Local white wine (Emir, Narince grapes) pairs excellently with testi kebabı. Try wine tasting at Turasan or Kocabağ wineries (€25-50).',
    'Turkish delight (lokum) gift boxes from local shops cheaper than touristy areas. Check freshness - should be soft, not hard/crystallized.',
    'Zelve Open Air Museum less crowded alternative to Göreme with more authentic feel. Allows exploration without tourist crowds.',
    'Photography golden hours: 6:00-7:30 AM (balloon flights) and 5:30-7:00 PM (sunset valleys). Midday harsh light not ideal.',
    'Modest dress required for Göreme Open Air Museum churches (shoulders/knees covered). Bring light scarf or rent at entrance.',
    'Dolmuş (shared minibus) budget transport between towns (₺20-40). Irregular schedule - ask locals for timing. Taxi more convenient.',
    'Download Istanbul Airport WiFi app if connecting through IST. Book domestic connection with 2+ hour buffer for immigration/transfer.',
    'Ramadan month affects alcohol availability and restaurant hours. Many still serve tourists but with limited alcohol. Check dates before booking.',
  ],

  metaDescription: 'Complete Cappadocia travel guide: hot air balloon tours (€150-250), underground cities, fairy chimneys, cave hotels, hiking trails. Best time to visit, top attractions, accommodation, dining, transportation. Plan your 3-4 day Cappadocia itinerary.',

  keywords: [
    'Cappadocia travel guide',
    'hot air balloon Cappadocia',
    'Cappadocia cave hotels',
    'Göreme Open Air Museum',
    'Derinkuyu underground city',
    'Cappadocia balloon tours price',
    'best time visit Cappadocia',
    'things to do Cappadocia',
    'Cappadocia hotels',
    'fairy chimneys Turkey',
    'Cappadocia hiking trails',
    'Rose Valley Cappadocia',
    'Avanos pottery',
    'Cappadocia tour packages',
    'UNESCO heritage site Turkey',
  ],
};

// ===================================================
// EXPORT ALL GUIDES
// ===================================================

export const allDestinationGuides: DestinationGuide[] = [
  cappadociaGuide,
  // Additional guides (Antalya, Istanbul, etc.) will be added here
];

export function getGuideBySlug(slug: string): DestinationGuide | undefined {
  return allDestinationGuides.find(guide => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return allDestinationGuides.map(guide => guide.slug);
}
