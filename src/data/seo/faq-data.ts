/**
 * FAQ Data for SEO Optimization
 * AI-Optimized Q&A for Search Engines + AI Models
 * Multi-language support
 */

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface DestinationFAQ {
  destination: string;
  slug: string;
  faqs: FAQItem[];
}

// Cappadocia FAQs (AI-Optimized for maximum visibility)
export const cappadociaFAQs: DestinationFAQ = {
  destination: 'Cappadocia',
  slug: 'cappadocia',
  faqs: [
    {
      question: 'What is the best time to visit Cappadocia?',
      answer: 'The best time to visit Cappadocia is April-May (spring) and September-October (autumn). During these months, weather is mild (15-25°C), ideal for hot air balloon tours with 95% flight success rate. Spring features blooming wildflowers, while autumn offers grape harvest festivals. Avoid July-August (too hot, 35°C+) and December-February (cold, balloon cancellations).',
      category: 'Planning'
    },
    {
      question: 'How much does a hot air balloon tour cost in Cappadocia?',
      answer: 'Hot air balloon tours in Cappadocia cost 150-250 EUR per person for standard tours (60-90 minutes, 16-20 passengers). Deluxe tours with champagne breakfast cost 250-350 EUR (10-12 passengers). Private balloon tours cost 2,500-4,000 EUR for 2-8 people. Book 2-3 days in advance for best prices. Price includes hotel pickup, flight, pilot certificate, and champagne toast.',
      category: 'Pricing'
    },
    {
      question: 'Is Cappadocia safe for tourists?',
      answer: 'Yes, Cappadocia is very safe for tourists. Crime rate is extremely low. Hot air balloon tours have strict safety regulations enforced by Turkish Civil Aviation Authority. All pilots are licensed, balloons are inspected daily. Tourist areas (Göreme, Ürgüp, Avanos) are well-policed. Follow standard travel precautions: avoid unlicensed taxis, book tours through reputable companies, keep valuables secure.',
      category: 'Safety'
    },
    {
      question: 'How many days do I need in Cappadocia?',
      answer: 'Ideal stay: 2-3 days in Cappadocia. Day 1: Hot air balloon tour (sunrise), Göreme Open Air Museum, Pasabag Valley (fairy chimneys). Day 2: Underground city (Derinkuyu or Kaymaklı), pottery workshop in Avanos, Uchisar Castle sunset. Day 3 (optional): Hiking in Rose Valley, Selime Monastery, Ihlara Valley. 2 days covers main attractions, 3 days allows relaxed pace and hidden gems.',
      category: 'Planning'
    },
    {
      question: 'Where should I stay in Cappadocia?',
      answer: 'Best areas to stay in Cappadocia: 1) Göreme (most popular, cave hotels, central location, 5-min to balloon launch sites, budget-luxury options). 2) Ürgüp (less touristy, authentic, good restaurants, 10-min to Göreme). 3) Uchisar (quietest, best views from castle, luxury cave hotels). Avoid Nevşehir city (no atmosphere). Book cave hotel for authentic experience (rooms carved into rock, unique architecture, natural insulation).',
      category: 'Accommodation'
    },
    {
      question: 'What is a cave hotel in Cappadocia?',
      answer: 'Cave hotels in Cappadocia are accommodations carved into volcanic rock formations. Features: rooms inside natural caves or man-made excavations, stone walls and arched ceilings, natural temperature regulation (cool in summer, warm in winter), unique architecture with modern amenities (WiFi, heating, bathrooms). Prices: budget cave rooms $40-80/night, mid-range $80-150/night, luxury $150-500/night. Top hotels: Sultan Cave Suites, Museum Hotel, Argos in Cappadocia.',
      category: 'Accommodation'
    },
    {
      question: 'Can hot air balloons fly every day in Cappadocia?',
      answer: 'No, hot air balloons in Cappadocia fly 300-320 days per year (85% success rate). Flights cancelled due to: strong winds (>15 km/h at ground level), rain, fog, storms. Cancellations most common in winter (Dec-Feb) and during transitional months (March, November). Summer (Jun-Aug) has highest success rate (95%+). All cancellations decided by Turkish Civil Aviation Authority at 4:30 AM daily. Tours refunded or rescheduled if cancelled.',
      category: 'Balloon Tours'
    },
    {
      question: 'How to get to Cappadocia from Istanbul?',
      answer: 'From Istanbul to Cappadocia: 1) Flight: 1 hour 15 min to Kayseri (ASR) or Nevşehir (NAV) airports, 4-6 flights daily, costs $50-150 one-way. Airport transfer to Göreme: 1 hour, $20-30. 2) Bus: Overnight bus 10-12 hours, costs $20-30, departs 8-10 PM from Istanbul Otogar, arrives Göreme 6-8 AM. Companies: Metro, Süha, Nevşehir Seyahat. 3) Car rental: 8-9 hours drive (730 km), costs $40-60/day, allows flexibility for stops.',
      category: 'Transportation'
    },
    {
      question: 'What to wear for a hot air balloon ride in Cappadocia?',
      answer: 'Wear for Cappadocia balloon ride: Layers (mornings are cold 5-15°C, warms up after sunrise), long pants (not skirts/shorts - you climb into basket), closed-toe shoes (sneakers or boots - no sandals/heels), light jacket or fleece, hat and sunglasses, sunscreen. Avoid: loose scarves (can fly away), heavy jackets (gets warm), valuable jewelry. Bring: camera/phone (strap recommended), fully charged battery (cold drains batteries).',
      category: 'Balloon Tours'
    },
    {
      question: 'Are there vegetarian food options in Cappadocia?',
      answer: 'Yes, Cappadocia has excellent vegetarian options. Traditional Turkish vegetarian dishes: meze (appetizers - hummus, ezme, dolma), gözleme (savory crepes), börek (pastry), manti (dumplings), testi kebab (clay pot vegetables), fresh salads, pide (Turkish pizza). Restaurants with vegetarian menus: Seten Restaurant (Göreme), Ziggy Cafe (Göreme), Seyyah Han (Ürgüp). Most restaurants offer vegetarian alternatives. Vegan options available but limited - inform restaurant in advance.',
      category: 'Food'
    },
    {
      question: 'Is Cappadocia suitable for families with children?',
      answer: 'Yes, Cappadocia is very family-friendly. Kid-friendly activities: Hot air balloon rides (ages 6+, height restrictions apply), exploring fairy chimneys and valleys (easy hikes), visiting underground cities (adventure for kids), pottery workshops in Avanos, horseback riding, Göreme Open Air Museum. Best for ages 6-12. Cave hotels fun for kids. Safety notes: Supervise children near cliff edges, some valleys have steep paths. Strollers difficult on cobblestone streets - use baby carriers.',
      category: 'Family Travel'
    },
    {
      question: 'What is the fairy chimney in Cappadocia?',
      answer: 'Fairy chimneys (peri bacaları in Turkish) are unique rock formations in Cappadocia. Formation: Volcanic eruptions covered area with soft tuff (volcanic ash), erosion over millions of years created cone-shaped pillars capped with harder basalt. Height: 10-40 meters tall. Best viewing spots: Pasabag Valley (Monk\'s Valley), Love Valley, Devrent Valley. Historical use: Early Christians carved homes and churches inside chimneys (still visible). Name origin: Locals believed fairies lived inside.',
      category: 'Attractions'
    },
    {
      question: 'Do I need a tour guide in Cappadocia?',
      answer: 'Not mandatory, but recommended. Self-guided: Possible for main sites (Göreme Open Air Museum has signs, valleys have marked trails, Google Maps works). Hiring guide: Recommended for underground cities (easy to get lost), historical context (rock churches, frescoes), hidden spots (local guides know secret viewpoints). Tour options: Private guide $100-150/day, group tours $30-50/person, audio guides $5-10. Red/Green/Blue tour packages $25-40 include guide, transport, lunch, entrance fees.',
      category: 'Tours'
    },
    {
      question: 'What is an underground city in Cappadocia?',
      answer: 'Underground cities in Cappadocia are multi-level subterranean settlements carved into soft volcanic rock. Built: Early Christians (7th-8th century) for protection from Arab raids. Features: 8-10 levels deep (up to 85 meters underground), rooms for living, kitchens, churches, wineries, storage, ventilation shafts, rolling stone doors for defense. Major cities: Derinkuyu (largest, 18 levels, held 20,000 people), Kaymaklı (8 levels, well-preserved). Visit duration: 1-1.5 hours. Claustrophobia warning: narrow passages, low ceilings.',
      category: 'Attractions'
    },
    {
      question: 'Can I see Cappadocia in one day?',
      answer: 'Possible but rushed. One-day itinerary: Start 5 AM hot air balloon tour (2 hours), 8 AM breakfast at hotel, 9:30 AM Göreme Open Air Museum (1.5 hours), 11:30 AM Pasabag fairy chimneys (1 hour), 1 PM lunch in Göreme, 2 PM underground city (1.5 hours), 4 PM Uchisar Castle for sunset (1 hour). Miss: Valley hikes, pottery workshop, second underground city, Avanos town, cave hotel experience. Better: Stay 2 nights (full 2 days sightseeing) for relaxed experience.',
      category: 'Planning'
    },
    {
      question: 'What language is spoken in Cappadocia?',
      answer: 'Turkish is the official language in Cappadocia. English: Widely spoken in tourist areas (Göreme, Ürgüp, hotels, restaurants, tour operators). Hotel staff and tour guides fluent in English. Outside tourist zones: Limited English. Useful Turkish phrases: Merhaba (hello), Teşekkür ederim (thank you), Ne kadar? (how much?), Lütfen (please), Evet/Hayır (yes/no). Tourist menus available in English. Translation apps (Google Translate) helpful. Turkish hospitality: locals patient with language barriers.',
      category: 'Practical Info'
    },
    {
      question: 'Is there WiFi in Cappadocia hotels?',
      answer: 'Yes, almost all hotels in Cappadocia offer free WiFi. Cave hotels: WiFi available but signal may be weak deep inside rock rooms (thick stone walls). Speed: 10-50 Mbps in most hotels, sufficient for browsing and social media. Video calls may lag. Cafes and restaurants in Göreme/Ürgüp have free WiFi. SIM cards: Buy Turkish SIM at airport ($10-20 for 10-20GB data, 4G/5G coverage good in Cappadocia). Providers: Turkcell (best coverage), Vodafone, Türk Telekom.',
      category: 'Practical Info'
    },
    {
      question: 'What is the Göreme Open Air Museum?',
      answer: 'Göreme Open Air Museum is a UNESCO World Heritage Site with Byzantine-era rock-cut churches and monasteries. History: 10th-13th century monastic complex carved into rock. Features: 30+ churches with preserved frescoes (biblical scenes, saints), refectory, living quarters. Must-see: Dark Church (best preserved frescoes, separate ticket $5), Apple Church, Buckle Church. Visiting: 2-3 hours needed, opens 8 AM (go early to avoid crowds), entrance $15, audio guide $5. Location: 1.5 km from Göreme town center (15-min walk or shuttle).',
      category: 'Attractions'
    },
    {
      question: 'Can I hike in Cappadocia?',
      answer: 'Yes, Cappadocia has excellent hiking with marked trails through valleys. Popular hikes: 1) Rose Valley (3-4 km, 2 hours, easy, pink rock formations, sunset viewpoint). 2) Love Valley (5 km, 2-3 hours, moderate, phallic fairy chimneys). 3) Pigeon Valley (4 km, 1.5 hours, easy, Göreme to Uchisar). 4) Ihlara Valley (14 km, 4-5 hours, easy, riverside walk, churches in cliffs). Best time: Spring/autumn (mild weather), early morning/late afternoon (avoid midday heat). Bring: water, sun protection, sturdy shoes, trail map.',
      category: 'Activities'
    },
    {
      question: 'What is Turkish pottery in Cappadocia?',
      answer: 'Avanos town in Cappadocia famous for traditional pottery made from red clay from Kızılırmak River (longest river in Turkey). History: 4,000+ year tradition dating to Hittites. Process: Clay extracted from riverbed, shaped on pottery wheel, hand-painted with traditional motifs, fired in kiln. Workshops: Watch artisans demonstrate, try pottery wheel yourself ($10-20 for 1-hour class). Buy: Hand-painted plates, bowls, vases ($20-200). Authentic vs tourist: Look for "Made in Avanos" stamp, avoid mass-produced items.',
      category: 'Culture'
    }
  ]
};

// Antalya FAQs
export const antalyaFAQs: DestinationFAQ = {
  destination: 'Antalya',
  slug: 'antalya',
  faqs: [
    {
      question: 'What is the best time to visit Antalya?',
      answer: 'The best time to visit Antalya is April-May (spring) and September-October (autumn). Spring features mild weather (20-25°C), blooming nature, fewer crowds, 30% lower hotel prices. Autumn offers warm sea (24-26°C), perfect beach weather, harvest season. Summer (Jun-Aug) very hot (35-40°C) but peak beach season. Winter (Nov-Mar) mild (15-20°C), ideal for sightseeing and ancient cities, 50% hotel discounts.',
      category: 'Planning'
    },
    {
      question: 'How many days do I need in Antalya?',
      answer: 'Ideal stay: 5-7 days in Antalya. Day 1-2: Kaleiçi old town, Antalya Museum, Hadrian\'s Gate, Düden Waterfalls. Day 3-4: Ancient cities (Perge, Aspendos, Side), beach time in Lara or Konyaaltı. Day 5: Day trip to Pamukkale or Cappadocia. Day 6-7: Relaxation, water parks, boat tours. 5 days covers main attractions, 7 days allows day trips and beach relaxation. Beach-only vacation: 7-10 days in one resort.',
      category: 'Planning'
    },
    {
      question: 'Is Antalya safe for tourists?',
      answer: 'Yes, Antalya is very safe for tourists. Tourism is major industry, well-policed. Crime rate low. Safety tips: Use official taxis (yellow, metered), avoid unlicensed tour operators, beware of carpet/jewelry shop scams, keep valuables secure at beaches, drink responsibly in nightlife areas. Tourist police available 24/7 (speak English). Emergency number: 112. Beaches have lifeguards in summer. Women can travel solo safely (dress modestly away from beach).',
      category: 'Safety'
    },
    {
      question: 'What are the best beaches in Antalya?',
      answer: 'Top Antalya beaches: 1) Lara Beach (12 km, golden sand, calm water, luxury resorts, Blue Flag). 2) Konyaaltı Beach (7 km, pebble, clear water, city beach, free access, beach clubs). 3) Kaputaş Beach (Kaş, 200m, turquoise water, cliffs, Instagram famous). 4) Phaselis Beach (ancient ruins + beach, 3 bays, nature). 5) Olympos Beach (bohemian, tree houses, backpackers). Best for families: Lara. Best for budget: Konyaaltı (free). Best for nature: Phaselis.',
      category: 'Beaches'
    },
    {
      question: 'How to get from Antalya airport to city center?',
      answer: 'From Antalya Airport (AYT) to city center (15 km): 1) Tram: AntRay tram from airport to city center, 35 minutes, $0.50, runs 6 AM-midnight every 20 min. 2) Bus: Havaş airport shuttle to city center, 30 min, $3-5, synchronized with flights. 3) Taxi: 20-25 min, $15-20 (fixed rate to Kaleiçi), use official yellow taxis. 4) Hotel transfer: Most hotels offer pickup $10-30. 5) Car rental: All major companies at airport, $25-50/day. Cheapest: Tram. Fastest: Taxi.',
      category: 'Transportation'
    },
    {
      question: 'What is Kaleiçi in Antalya?',
      answer: 'Kaleiçi is Antalya\'s historic old town (Ottoman quarter) inside ancient walls. Features: Narrow cobblestone streets, Ottoman houses (now hotels, restaurants, shops), Roman harbor (marina with boats), Hadrian\'s Gate (130 AD), Kesik Minare (Broken Minaret), Hıdırlık Tower (panoramic views), bazaar with souvenirs. Activities: Explore on foot (2-3 hours), dine at rooftop restaurants, stay in boutique hotels ($50-150/night), boat tour from harbor ($10-20). Best preserved old town in Turkish Riviera. Car-free zone.',
      category: 'Attractions'
    },
    {
      question: 'What ancient cities near Antalya should I visit?',
      answer: 'Must-visit ancient cities near Antalya: 1) Perge (18 km, 30 min, Roman city, theatre, stadium, colonnaded street, $5 entry). 2) Aspendos (47 km, 1 hour, best-preserved Roman theatre in world, holds 15,000, still used for opera/ballet, $7 entry). 3) Side (75 km, 1.5 hours, seaside ruins, Apollo Temple, theatre, beach town). 4) Termessos (34 km, mountain city, stunning location, theatre with views, $3 entry). 5) Phaselis (60 km, coastal ruins, 3 beaches, aqueduct). Do Red Tour (Perge + Aspendos + Side) for $40-50 including guide.',
      category: 'Attractions'
    },
    {
      question: 'What is the best area to stay in Antalya?',
      answer: 'Best areas in Antalya: 1) Kaleiçi (old town, historic atmosphere, boutique hotels, central, walkable, $50-200/night, no beach access). 2) Lara Beach (luxury resorts, sandy beach, all-inclusive, quieter, $100-500/night, 15 km from center). 3) Konyaaltı Beach (city beach, mid-range hotels, close to center, pebble beach, $60-150/night). 4) Belek (golf resorts, family-friendly, pristine beaches, 30 km from city, $150-800/night). Budget: Konyaaltı. Luxury: Lara/Belek. Culture: Kaleiçi.',
      category: 'Accommodation'
    },
    {
      question: 'Are there day trips from Antalya?',
      answer: 'Yes, excellent day trips from Antalya: 1) Pamukkale (white travertine terraces, ancient Hierapolis, 4 hours drive, $60-80 tour). 2) Kaş + Kekova (sunken city, boat tour, Blue Cave, 3 hours drive, $70-90). 3) Cappadocia (2-day trip recommended, but 1-day tours available $150-200 with flight). 4) Ancient Cities Tour (Perge, Aspendos, Side in one day, $40-60). 5) Köprülü Canyon (rafting, hiking, nature, 1.5 hours, $50-70). 6) Saklıkent Gorge + Tlos (canyon walk, ancient ruins, 2 hours, $50-60).',
      category: 'Day Trips'
    },
    {
      question: 'What water parks are in Antalya?',
      answer: 'Top water parks in Antalya: 1) The Land of Legends (best in Turkey, wave pool, dolphin shows, shopping, $40-50 entry, Belek). 2) Aqualand (slides, lazy river, dolphin show, $30-35, Konyaaltı). 3) DoluSu Park (largest in Turkey, 44 slides, Black Hole, $25-30, Göynük). 4) Dedeman Aquapark (family-friendly, affordable, $20-25, Konyaaltı). All-inclusive hotel parks: Usually free for guests. Best for kids: Land of Legends. Budget: Dedeman. Peak season (Jul-Aug): Buy tickets online for discounts.',
      category: 'Activities'
    },
    {
      question: 'What is Turkish cuisine in Antalya must-try?',
      answer: 'Must-try Turkish dishes in Antalya: 1) Piyaz (white beans, tahini, special to Antalya). 2) Şiş Kebab (grilled meat skewers). 3) Pide (Turkish pizza, various toppings). 4) Gözleme (savory crepe, spinach/cheese). 5) Baklava (sweet pastry, pistachio). 6) Meze platter (appetizers, hummus, ezme, dolma). 7) Fresh fish (sea bass, sea bream, grilled). 8) Tantuni (spicy meat wrap, street food). 9) Turkish breakfast (kahvaltı, cheese, olives, honey, unlimited tea). Best restaurants: 7 Mehmet (piyaz), Vanilla (fine dining), Hasanağa (traditional).',
      category: 'Food'
    },
    {
      question: 'Can I drink tap water in Antalya?',
      answer: 'Technically yes (treated and safe), but NOT recommended. Turkish locals drink bottled water. Tap water safe for brushing teeth, showering. Drinking: Buy bottled water (0.5L = $0.30, 5L = $1). Restaurants serve bottled water (charged). Hotels provide complimentary bottles. Ice in drinks usually from bottled water in tourist places. Sensitive stomach? Stick to bottled water completely. Water fountains at attractions: Usually drinkable (look for "içilir" = drinkable sign). Prevent issues: Drink only bottled water first few days.',
      category: 'Practical Info'
    },
    {
      question: 'What is the Düden Waterfalls?',
      answer: 'Düden Waterfalls are two waterfalls in Antalya: 1) Upper Düden (İçme Şelalesi): 14 km from center, water falls into caves, walking paths, picnic area, free entry, restaurant with view, 1-hour visit. 2) Lower Düden: On coast, water falls 40m into Mediterranean Sea, view from boat tours or Lara Beach park, spectacular, free, sunset best time. Visit both: 2-3 hours total. Boat tours from old harbor ($10-20) give best view of Lower Düden from sea. Bring camera (very photogenic).',
      category: 'Attractions'
    },
    {
      question: 'Is Antalya good for nightlife?',
      answer: 'Yes, Antalya has vibrant nightlife especially in summer. Areas: 1) Kaleiçi (old town bars, rooftop lounges, cocktail bars, live music, classy). 2) Lara Beach (beach clubs, foam parties, DJs, young crowd). 3) Kemer (resort town, clubs, bars, 40 km from Antalya, party destination). Clubs: Soho Club (beach club), Club Arma (harbor, 3 floors, amazing views). Bars: Castle Cafe (chill, old town), Sky Bar (rooftop). Season: May-October peak, winter quieter. Dress code: Smart casual in clubs. Prices: Cocktails $5-10, club entry $10-20.',
      category: 'Nightlife'
    },
    {
      question: 'What is the weather like in Antalya in winter?',
      answer: 'Antalya winter (Nov-Mar) is mild: Daytime 15-18°C, nights 8-10°C, rainy (Dec-Jan wettest), 6 hours sun daily. Perfect for sightseeing (ancient cities comfortable in mild weather), hiking (Lycian Way trail), golfing, cultural activities. NOT good for swimming (sea 16-18°C), beach activities. Accommodation 50-70% cheaper. Fewer tourists. What to pack: Light jacket, layers, raincoat, closed shoes. Winter activities: Ski nearby mountains (Saklıkent), visit museums, explore cities, spa hotels.',
      category: 'Weather'
    },
    {
      question: 'How to use public transportation in Antalya?',
      answer: 'Antalya public transport: 1) Tram (AntRay): Main line from airport through city to Expo. Runs 6 AM-midnight, every 10-15 min, $0.50 per ride. 2) Buses: Extensive network, $0.50, use AntalyaKart (rechargeable card, buy at kiosks $2 card + load credit). 3) Dolmuş (shared minibus): Fixed routes, $0.50-1, pay driver, runs 6 AM-10 PM. 4) Nostalgic Tram: Historic tram in Kaleiçi-Museum route, $0.50, tourist attraction. Get AntalyaKart: Saves 30% vs single tickets, works on all transport.',
      category: 'Transportation'
    },
    {
      question: 'Are credit cards accepted in Antalya?',
      answer: 'Yes, credit cards widely accepted in Antalya tourist areas: Hotels (all accept Visa, Mastercard, some Amex), restaurants (most accept, minimum $10-15 sometimes), shops, car rentals, tour operators. Cash needed for: Street food, markets, dolmuş (minibus), small shops, taxis (some), tips. ATMs everywhere (withdraw Turkish Lira). Best exchange rate: Use ATM (better than exchange offices). Notify bank before travel (prevent card blocks). Carry some cash ($100-200) for emergencies. Turkish Lira preferred over Euro/USD in small places.',
      category: 'Practical Info'
    },
    {
      question: 'What is Aspendos Theatre?',
      answer: 'Aspendos Theatre is the best-preserved Roman theatre in the world, built 155-180 AD by architect Zenon. Capacity: 15,000 spectators, still hosts opera and ballet festivals. Features: Perfect acoustics (no microphone needed), 96m wide, 2-story stage building, intact seating, original decorations. Location: 47 km east of Antalya (1-hour drive). Visiting: $7 entry, 1-hour tour, go morning (cooler), includes nearby aqueduct. Events: Aspendos Opera and Ballet Festival (Jun-Jul, tickets $30-100). Photography allowed. Wear comfortable shoes (steep steps).',
      category: 'Attractions'
    },
    {
      question: 'Can I rent a car in Antalya?',
      answer: 'Yes, car rental easy in Antalya. Rental companies: International (Hertz, Avis, Budget) at airport and city, local companies (cheaper, $25-40/day). Requirements: Valid driver\'s license (1+ year), passport, credit card (deposit $300-500), age 21+ (some 25+). Prices: Economy $25-35/day, SUV $50-80/day, luxury $100+/day. Insurance: CDW included, full coverage recommended (+$10-15/day). Driving: Right-hand side, roads good, traffic busy in city, parking difficult in old town. Worth it for day trips (ancient cities, nature).',
      category: 'Transportation'
    },
    {
      question: 'What shopping areas are in Antalya?',
      answer: 'Best shopping in Antalya: 1) MarkAntalya (modern mall, 200+ shops, cinema, food court, brands, air-conditioned). 2) Migros 5M (mall, affordable, Migros supermarket). 3) Old Bazaar (Kaleiçi, souvenirs, spices, leather, carpets, haggle expected). 4) Lara Beach area (boutiques, local shops). What to buy: Turkish delight ($10-20/kg), spices (saffron), evil eye (nazar), ceramics (Avanos pottery), leather jackets ($100-300), Turkish tea sets, olive oil. Tax refund: Available for purchases $50+ (show Tax Free form at airport).',
      category: 'Shopping'
    }
  ]
};

// General Turkey FAQs
export const turkeyGeneralFAQs: DestinationFAQ = {
  destination: 'Turkey',
  slug: 'turkey',
  faqs: [
    {
      question: 'Do I need a visa to visit Turkey?',
      answer: 'Visa requirements depend on nationality. E-visa (online): Available for 100+ countries including USA, UK, Australia, Canada ($50-60, valid 180 days, 90-day stay). Apply at evisa.gov.tr 48 hours before travel. EU citizens: No visa needed for stays up to 90 days. Some countries: Visa on arrival or embassy visa required. Requirements: Passport valid 6+ months, return ticket, hotel booking. Check official website for your nationality. E-visa process takes 10 minutes online.',
      category: 'Visa & Entry'
    },
    {
      question: 'Is Turkey safe for tourists in 2026?',
      answer: 'Yes, Turkey is generally safe for tourists in 2026. Tourism is major industry (50+ million visitors annually). Tourist areas (Istanbul, Antalya, Cappadocia, Bodrum) are well-secured. Crime rate low in tourist zones. Safety tips: Avoid protest areas, use official taxis, beware of scams, secure valuables, check travel advisories. Political situation stable. Turkish hospitality famous. Women can travel solo (dress modestly away from beaches). Emergency number: 112 (police, ambulance). Tourist police speak English in major cities.',
      category: 'Safety'
    },
    {
      question: 'What is the currency in Turkey?',
      answer: 'Turkish Lira (TRY, symbol: ₺) is the official currency. Exchange rate (2026): ~1 USD = 30-32 TRY (fluctuates). Where to exchange: ATMs (best rate), banks, exchange offices (döviz), hotels (worst rate). ATMs: Everywhere, withdraw TRY, foreign cards accepted, fee $3-5 per transaction. Credit cards: Widely accepted in tourist areas. Cash needed: Markets, street food, taxis, small shops. Bring: USD/EUR (easily exchangeable). Don\'t: Exchange at airport (high fees).',
      category: 'Money'
    },
    {
      question: 'What language is spoken in Turkey?',
      answer: 'Turkish is the official language (80 million speakers). English: Spoken in tourist areas (hotels, restaurants, tour guides in Istanbul, Antalya, Cappadocia). Limited English outside tourist zones. Useful phrases: Merhaba (hello), Teşekkürler (thank you), Lütfen (please), Ne kadar? (how much?), Evet/Hayır (yes/no), Afiyet olsun (enjoy your meal). Translation apps helpful (Google Translate offline mode). Turkish uses Latin alphabet (easy to read signs). Turkish hospitality helps overcome language barriers.',
      category: 'Language'
    },
    {
      question: 'What is the best time to visit Turkey?',
      answer: 'Best time depends on region: 1) Istanbul: April-May, Sept-Oct (mild weather, fewer crowds, 15-25°C). 2) Mediterranean coast (Antalya): April-June, Sept-Oct (warm, beach-ready, 25-30°C). 3) Cappadocia: April-May, Sept-Oct (balloon weather, 15-25°C). 4) Pamukkale: Spring/autumn (not too hot). Summer (Jun-Aug): Peak beach season (hot, crowded, expensive). Winter (Dec-Feb): Budget travel, skiing, Istanbul cold but charming. Overall best: April-May, September-October.',
      category: 'Planning'
    },
    {
      question: 'How much does a trip to Turkey cost?',
      answer: 'Turkey trip costs (per day per person): Budget: $40-60 (hostels $10-20, street food $10-15, public transport $5, free attractions). Mid-range: $80-150 (3-star hotel $40-80, restaurants $20-40, guided tours $30-50). Luxury: $200-500+ (5-star hotels $150-400, fine dining $50-100, private tours $100-200). 10-day trip estimate: Budget $400-600, mid-range $800-1,500, luxury $2,000-5,000. Includes: Accommodation, food, transport, activities. Excludes: Flights, alcohol, shopping. Best value: Shoulder season (April-May, Sept-Oct).',
      category: 'Budget'
    },
    {
      question: 'What food must I try in Turkey?',
      answer: 'Must-try Turkish foods: 1) Kebab (döner, şiş, Adana - grilled meats). 2) Meze (appetizers - hummus, ezme, dolma, haydari). 3) Pide (Turkish pizza, various toppings). 4) Baklava (sweet pastry, pistachio/walnut). 5) Lahmacun (thin meat pizza). 6) Gözleme (savory crepe). 7) Köfte (meatballs). 8) Manti (Turkish ravioli). 9) Turkish breakfast (cheese, olives, eggs, simit). 10) Turkish tea & coffee. 11) Börek (pastry). 12) Iskender (döner with yogurt/sauce). Regional specialties: Antalya piyaz, Antep baklava.',
      category: 'Food'
    },
    {
      question: 'Is Turkey expensive for tourists?',
      answer: 'No, Turkey is affordable for tourists (especially Western visitors). Prices: Meal at restaurant $5-15, street food $2-5, hotel $30-150/night, taxi $5-15 for city trips, museum entry $3-10, Turkish coffee $1-2. Compared to Europe: 50-70% cheaper. Luxury available: 5-star hotels, fine dining at reasonable prices vs Western standards. Budget tips: Eat street food, use public transport, visit free attractions, shop at markets, travel shoulder season. Istanbul more expensive than other cities. Credit cards widely accepted.',
      category: 'Budget'
    },
    {
      question: 'What should I wear in Turkey?',
      answer: 'Dress code varies by location: Beach resorts (Antalya, Bodrum): Casual, swimwear OK on beach, cover up in town. Cities (Istanbul): Smart casual, locals dress well, modest when visiting mosques (women: headscarf, long sleeves/pants; men: long pants, no shorts). Religious sites: Cover shoulders, knees, head (women). Cappadocia: Layers (mornings cold, afternoons warm), comfortable shoes for hiking. Summer: Light clothing, sun protection. Winter: Jacket, layers. Turkish people appreciate modest dress outside beach areas. Women: Bring scarf for mosque visits.',
      category: 'Culture'
    },
    {
      question: 'What power adapter do I need for Turkey?',
      answer: 'Turkey uses Type C and F electrical outlets (European style, round pins). Voltage: 220V, 50Hz. US/UK travelers: Need plug adapter (round pins). Canada/USA: Also need voltage converter for 110V devices (or use dual-voltage devices). Where to buy: Airport shops, electronics stores, hotels (sometimes lend adapters). Universal travel adapter recommended (works in Turkey and worldwide). Most modern electronics (phones, laptops, cameras) are dual-voltage (110-240V) - only adapter needed, not converter. Check device label.',
      category: 'Practical Info'
    }
  ]
};

// Export all FAQs
export const allDestinationFAQs: DestinationFAQ[] = [
  cappadociaFAQs,
  antalyaFAQs,
  turkeyGeneralFAQs
];

// Helper function to get FAQs by destination slug
export function getFAQsByDestination(slug: string): DestinationFAQ | undefined {
  return allDestinationFAQs.find(dest => dest.slug === slug);
}

// Helper function to get all FAQs for a category
export function getFAQsByCategory(destinationSlug: string, category: string): FAQItem[] {
  const destination = getFAQsByDestination(destinationSlug);
  if (!destination) return [];
  return destination.faqs.filter(faq => faq.category === category);
}

// Get all unique categories for a destination
export function getCategories(destinationSlug: string): string[] {
  const destination = getFAQsByDestination(destinationSlug);
  if (!destination) return [];
  const categories = new Set(destination.faqs.map(faq => faq.category));
  return Array.from(categories);
}
