/**
 * Geographic SEO Configuration
 * City, Region, and Country-specific SEO optimizations
 *
 * @module seo/geo-seo
 * @seo Local SEO, Regional Targeting, Multi-location
 */

import { SupportedLocale } from './page-seo';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface CityGeoSEO {
  slug: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  seo: Record<SupportedLocale, {
    title: string;
    description: string;
    keywords: string;
    h1: string;
    content: string;
    landmarks: string[];
    nearbyPlaces: string[];
  }>;
}

export interface RegionGeoSEO {
  slug: string;
  name: string;
  cities: string[];
  seo: Record<SupportedLocale, {
    title: string;
    description: string;
    keywords: string;
  }>;
}

// ===================================================
// CITY-SPECIFIC SEO (TOP DESTINATIONS)
// ===================================================

export const cityGeoSEO: Record<string, CityGeoSEO> = {
  antalya: {
    slug: 'antalya',
    name: 'Antalya',
    region: 'Mediterranean',
    country: 'Turkey',
    lat: 36.8969,
    lng: 30.7133,
    seo: {
      tr: {
        title: 'Antalya Turları ve Otelleri | En İyi Fiyatlarla - Holiday.AILYDIAN',
        description: "Antalya'da yapılacak en iyi şeyler, turlar, oteller ve aktiviteler. Perge, Aspendos, Düden Şelalesi. Anında rezervasyon, %100 müşteri memnuniyeti.",
        keywords: 'antalya turları, antalya otelleri, antalya gezilecek yerler, antalya aktiviteleri, kemer, side, belek, lara plajı',
        h1: 'Antalya Turları ve Aktiviteleri',
        content: `Antalya, Akdeniz'in incisi olarak bilinen ve her yıl milyonlarca turisti ağırlayan Türkiye'nin en popüler tatil destinasyonudur. Muhteşem plajları, antik kalıntıları ve modern turizm olanaklarıyla Antalya, her türlü tatil için mükemmel bir seçimdir.`,
        landmarks: ['Düden Şelalesi', 'Kaleiçi', 'Aspendos Antik Tiyatrosu', 'Perge Antik Kenti', 'Köprülü Kanyon'],
        nearbyPlaces: ['Kemer', 'Side', 'Alanya', 'Kaş', 'Belek'],
      },
      en: {
        title: 'Antalya Tours & Hotels | Best Prices - Holiday.AILYDIAN',
        description: 'Best things to do in Antalya, tours, hotels and activities. Perge, Aspendos, Duden Waterfalls. Instant booking, 100% customer satisfaction.',
        keywords: 'antalya tours, antalya hotels, antalya attractions, antalya activities, kemer, side, belek, lara beach',
        h1: 'Antalya Tours and Activities',
        content: `Antalya, known as the pearl of the Mediterranean, is Turkey's most popular holiday destination hosting millions of tourists every year. With its magnificent beaches, ancient ruins and modern tourism facilities, Antalya is a perfect choice for all types of vacations.`,
        landmarks: ['Duden Waterfalls', 'Kaleici', 'Aspendos Ancient Theatre', 'Perge Ancient City', 'Köprülü Canyon'],
        nearbyPlaces: ['Kemer', 'Side', 'Alanya', 'Kas', 'Belek'],
      },
      de: {
        title: 'Antalya Touren & Hotels | Beste Preise - Holiday.AILYDIAN',
        description: 'Beste Aktivitäten in Antalya, Touren, Hotels und Aktivitäten. Perge, Aspendos, Düden-Wasserfälle. Sofortbuchung.',
        keywords: 'antalya touren, antalya hotels, antalya sehenswürdigkeiten, kemer, side, belek',
        h1: 'Antalya Touren und Aktivitäten',
        content: `Antalya, bekannt als die Perle des Mittelmeers, ist Türkeis beliebtestes Urlaubsziel.`,
        landmarks: ['Düden-Wasserfälle', 'Kaleici', 'Aspendos Theater', 'Perge', 'Köprülü Canyon'],
        nearbyPlaces: ['Kemer', 'Side', 'Alanya', 'Kas', 'Belek'],
      },
      ru: {
        title: 'Туры и Отели в Анталии | Лучшие Цены - Holiday.AILYDIAN',
        description: 'Лучшие развлечения в Анталии, туры, отели и активности. Перге, Аспендос, водопады Дюден. Мгновенное бронирование.',
        keywords: 'туры анталия, отели анталия, достопримечательности анталии, кемер, сиде, белек',
        h1: 'Туры и Активности в Анталии',
        content: `Анталия, известная как жемчужина Средиземноморья, является самым популярным курортом Турции.`,
        landmarks: ['Водопады Дюден', 'Калеичи', 'Театр Аспендос', 'Перге', 'Каньон Кёпрюлю'],
        nearbyPlaces: ['Кемер', 'Сиде', 'Аланья', 'Каш', 'Белек'],
      },
      ar: {
        title: 'جولات وفنادق أنطاليا | أفضل الأسعار - Holiday.AILYDIAN',
        description: 'أفضل الأشياء للقيام بها في أنطاليا، جولات، فنادق وأنشطة. بيرج، أسبندوس، شلالات دودين.',
        keywords: 'جولات أنطاليا، فنادق أنطاليا، معالم أنطاليا، كيمر، سيدا، بيليك',
        h1: 'جولات وأنشطة أنطاليا',
        content: `أنطاليا، المعروفة بلؤلؤة البحر الأبيض المتوسط، هي الوجهة السياحية الأكثر شعبية في تركيا.`,
        landmarks: ['شلالات دودين', 'كاليتشي', 'مسرح أسبندوس', 'بيرج', 'كانيون كوبرولو'],
        nearbyPlaces: ['كيمر', 'سيدا', 'ألانيا', 'كاش', 'بيليك'],
      },
      fa: {
        title: 'تورها و هتل‌های آنتالیا | بهترین قیمت‌ها - Holiday.AILYDIAN',
        description: 'بهترین کارها در آنتالیا، تورها، هتل‌ها و فعالیت‌ها. پرگه، آسپندوس، آبشارهای دودن.',
        keywords: 'تورهای آنتالیا، هتل‌های آنتالیا، جاذبه‌های آنتالیا، کمر، سیده، بلک',
        h1: 'تورها و فعالیت‌های آنتالیا',
        content: `آنتالیا، معروف به مروارید مدیترانه، محبوب‌ترین مقصد تعطیلات ترکیه است.`,
        landmarks: ['آبشارهای دودن', 'کالئیچی', 'تئاتر آسپندوس', 'پرگه', 'دره کوپرولو'],
        nearbyPlaces: ['کمر', 'سیده', 'آلانیا', 'کاش', 'بلک'],
      },
      fr: {
        title: 'Circuits et Hôtels à Antalya | Meilleurs Prix - Holiday.AILYDIAN',
        description: 'Meilleures choses à faire à Antalya, circuits, hôtels et activités. Perge, Aspendos, Cascades de Düden.',
        keywords: 'circuits antalya, hôtels antalya, attractions antalya, kemer, side, belek',
        h1: 'Circuits et Activités à Antalya',
        content: `Antalya, connue comme la perle de la Méditerranée, est la destination touristique la plus populaire de Turquie.`,
        landmarks: ['Cascades de Düden', 'Kaleici', 'Théâtre d\'Aspendos', 'Perge', 'Canyon de Köprülü'],
        nearbyPlaces: ['Kemer', 'Side', 'Alanya', 'Kas', 'Belek'],
      },
      el: {
        title: 'Εκδρομές και Ξενοδοχεία στην Αττάλεια | Καλύτερες Τιμές - Holiday.AILYDIAN',
        description: 'Καλύτερα πράγματα να κάνετε στην Αττάλεια, εκδρομές, ξενοδοχεία και δραστηριότητες.',
        keywords: 'εκδρομές αττάλεια, ξενοδοχεία αττάλεια, αξιοθέατα αττάλεια',
        h1: 'Εκδρομές και Δραστηριότητες στην Αττάλεια',
        content: `Η Αττάλεια, γνωστή ως το μαργαριτάρι της Μεσογείου, είναι ο πιο δημοφιλής τουριστικός προορισμός της Τουρκίας.`,
        landmarks: ['Καταρράκτες Düden', 'Kaleici', 'Θέατρο Aspendos', 'Perge', 'Φαράγγι Köprülü'],
        nearbyPlaces: ['Kemer', 'Side', 'Alanya', 'Kas', 'Belek'],
      },
    },
  },

  istanbul: {
    slug: 'istanbul',
    name: 'Istanbul',
    region: 'Marmara',
    country: 'Turkey',
    lat: 41.0082,
    lng: 28.9784,
    seo: {
      tr: {
        title: 'İstanbul Turları ve Otelleri | Tarihi Yarımada - Holiday.AILYDIAN',
        description: 'İstanbul\'da gezilecek yerler, turlar ve oteller. Ayasofya, Topkapı Sarayı, Kapalıçarşı, Boğaz Turu. En iyi fiyatlarla rezervasyon yapın.',
        keywords: 'istanbul turları, istanbul otelleri, ayasofya, sultanahmet, boğaz turu, topkapı sarayı, kapalıçarşı, galata kulesi',
        h1: 'İstanbul Turları ve Gezilecek Yerler',
        content: `İstanbul, iki kıtayı birbirine bağlayan eşsiz bir şehir. Binlerce yıllık tarihiyle, muhteşem camileri, sarayları ve Boğaz manzarasıyla İstanbul, dünyanın en çok ziyaret edilen şehirlerinden biridir.`,
        landmarks: ['Ayasofya', 'Topkapı Sarayı', 'Sultanahmet Camii', 'Kapalıçarşı', 'Galata Kulesi', 'Boğaz'],
        nearbyPlaces: ['Sultanahmet', 'Beyoğlu', 'Beşiktaş', 'Kadıköy', 'Üsküdar'],
      },
      en: {
        title: 'Istanbul Tours & Hotels | Historic Peninsula - Holiday.AILYDIAN',
        description: 'Things to do in Istanbul, tours and hotels. Hagia Sophia, Topkapi Palace, Grand Bazaar, Bosphorus Tour. Book at best prices.',
        keywords: 'istanbul tours, istanbul hotels, hagia sophia, sultanahmet, bosphorus tour, topkapi palace, grand bazaar, galata tower',
        h1: 'Istanbul Tours and Attractions',
        content: `Istanbul is a unique city connecting two continents. With thousands of years of history, magnificent mosques, palaces and Bosphorus views, Istanbul is one of the world's most visited cities.`,
        landmarks: ['Hagia Sophia', 'Topkapi Palace', 'Blue Mosque', 'Grand Bazaar', 'Galata Tower', 'Bosphorus'],
        nearbyPlaces: ['Sultanahmet', 'Beyoglu', 'Besiktas', 'Kadikoy', 'Uskudar'],
      },
      de: {
        title: 'Istanbul Touren & Hotels | Historische Halbinsel - Holiday.AILYDIAN',
        description: 'Sehenswürdigkeiten in Istanbul, Touren und Hotels. Hagia Sophia, Topkapi Palast, Großer Basar, Bosporus Tour.',
        keywords: 'istanbul touren, istanbul hotels, hagia sophia, sultanahmet, bosporus tour',
        h1: 'Istanbul Touren und Sehenswürdigkeiten',
        content: `Istanbul ist eine einzigartige Stadt, die zwei Kontinente verbindet.`,
        landmarks: ['Hagia Sophia', 'Topkapi Palast', 'Blaue Moschee', 'Großer Basar', 'Galata Turm', 'Bosporus'],
        nearbyPlaces: ['Sultanahmet', 'Beyoglu', 'Besiktas', 'Kadikoy', 'Uskudar'],
      },
      ru: {
        title: 'Туры и Отели в Стамбуле | Исторический Полуостров - Holiday.AILYDIAN',
        description: 'Достопримечательности Стамбула, туры и отели. Айя-София, Дворец Топкапы, Гранд Базар, тур по Босфору.',
        keywords: 'туры стамбул, отели стамбул, айя-софия, султанахмет, босфор',
        h1: 'Туры и Достопримечательности Стамбула',
        content: `Стамбул - уникальный город, соединяющий два континента.`,
        landmarks: ['Айя-София', 'Дворец Топкапы', 'Голубая мечеть', 'Гранд Базар', 'Галатская башня', 'Босфор'],
        nearbyPlaces: ['Султанахмет', 'Бейоглу', 'Бешикташ', 'Кадыкёй', 'Ускюдар'],
      },
      ar: {
        title: 'جولات وفنادق اسطنبول | شبه الجزيرة التاريخية - Holiday.AILYDIAN',
        description: 'أماكن للزيارة في اسطنبول، جولات وفنادق. آيا صوفيا، قصر توبكابي، البازار الكبير، جولة البوسفور.',
        keywords: 'جولات اسطنبول، فنادق اسطنبول، آيا صوفيا، سلطان أحمد، البوسفور',
        h1: 'جولات ومعالم اسطنبول',
        content: `اسطنبول مدينة فريدة تربط بين قارتين.`,
        landmarks: ['آيا صوفيا', 'قصر توبكابي', 'المسجد الأزرق', 'البازار الكبير', 'برج غلطة', 'البوسفور'],
        nearbyPlaces: ['سلطان أحمد', 'بيوغلو', 'بشيكتاش', 'كاديكوي', 'أسكودار'],
      },
      fa: {
        title: 'تورها و هتل‌های استانبول | شبه‌جزیره تاریخی - Holiday.AILYDIAN',
        description: 'جاذبه‌های استانبول، تورها و هتل‌ها. آیاصوفیا، کاخ توپکاپی، بازار بزرگ، تور بسفر.',
        keywords: 'تورهای استانبول، هتل‌های استانبول، آیاصوفیا، سلطان احمد، بسفر',
        h1: 'تورها و جاذبه‌های استانبول',
        content: `استانبول شهری منحصر به فرد است که دو قاره را به هم متصل می‌کند.`,
        landmarks: ['آیاصوفیا', 'کاخ توپکاپی', 'مسجد آبی', 'بازار بزرگ', 'برج گالاتا', 'بسفر'],
        nearbyPlaces: ['سلطان احمد', 'بیوغلو', 'بشیکتاش', 'کادیکوی', 'اسکودار'],
      },
      fr: {
        title: 'Circuits et Hôtels à Istanbul | Péninsule Historique - Holiday.AILYDIAN',
        description: 'Choses à faire à Istanbul, circuits et hôtels. Sainte-Sophie, Palais de Topkapi, Grand Bazar, Tour du Bosphore.',
        keywords: 'circuits istanbul, hôtels istanbul, sainte-sophie, sultanahmet, bosphore',
        h1: 'Circuits et Attractions d\'Istanbul',
        content: `Istanbul est une ville unique reliant deux continents.`,
        landmarks: ['Sainte-Sophie', 'Palais de Topkapi', 'Mosquée Bleue', 'Grand Bazar', 'Tour de Galata', 'Bosphore'],
        nearbyPlaces: ['Sultanahmet', 'Beyoglu', 'Besiktas', 'Kadikoy', 'Uskudar'],
      },
      el: {
        title: 'Εκδρομές και Ξενοδοχεία στην Κωνσταντινούπολη - Holiday.AILYDIAN',
        description: 'Πράγματα να κάνετε στην Κωνσταντινούπολη, εκδρομές και ξενοδοχεία. Αγία Σοφία, Παλάτι Τοπκαπί.',
        keywords: 'εκδρομές κωνσταντινούπολη, ξενοδοχεία κωνσταντινούπολη, αγία σοφία',
        h1: 'Εκδρομές και Αξιοθέατα της Κωνσταντινούπολης',
        content: `Η Κωνσταντινούπολη είναι μια μοναδική πόλη που συνδέει δύο ηπείρους.`,
        landmarks: ['Αγία Σοφία', 'Παλάτι Τοπκαπί', 'Γαλάζιο Τζαμί', 'Μεγάλο Παζάρι', 'Πύργος Γαλατά', 'Βόσπορος'],
        nearbyPlaces: ['Sultanahmet', 'Beyoglu', 'Besiktas', 'Kadikoy', 'Uskudar'],
      },
    },
  },

  cappadocia: {
    slug: 'cappadocia',
    name: 'Cappadocia',
    region: 'Central Anatolia',
    country: 'Turkey',
    lat: 38.6431,
    lng: 34.8289,
    seo: {
      tr: {
        title: 'Kapadokya Turları | Balon Turu ve Oteller - Holiday.AILYDIAN',
        description: 'Kapadokya balon turları, yer altı şehirleri, peri bacaları turları. En iyi fiyatlarla sıcak hava balonu ve butik otel rezervasyonları.',
        keywords: 'kapadokya turları, kapadokya balon turu, göreme, ürgüp, derinkuyu, zelve, peri bacaları, yer altı şehri',
        h1: 'Kapadokya Turları ve Balon Turu',
        content: `Kapadokya, dünyaca ünlü peri bacaları, yer altı şehirleri ve sıcak hava balonu turlarıyla Türkiye'nin en büyüleyici destinasyonudur.`,
        landmarks: ['Göreme Açık Hava Müzesi', 'Derinkuyu Yeraltı Şehri', 'Üçhisar Kalesi', 'Paşabağ Peri Bacaları', 'Zelve Açık Hava Müzesi'],
        nearbyPlaces: ['Göreme', 'Ürgüp', 'Avanos', 'Uçhisar', 'Ortahisar'],
      },
      en: {
        title: 'Cappadocia Tours | Hot Air Balloon & Hotels - Holiday.AILYDIAN',
        description: 'Cappadocia balloon tours, underground cities, fairy chimney tours. Best prices for hot air balloon and boutique hotel bookings.',
        keywords: 'cappadocia tours, cappadocia balloon tour, goreme, urgup, derinkuyu, zelve, fairy chimneys, underground city',
        h1: 'Cappadocia Tours and Balloon Tours',
        content: `Cappadocia is Turkey's most enchanting destination with world-famous fairy chimneys, underground cities and hot air balloon tours.`,
        landmarks: ['Goreme Open Air Museum', 'Derinkuyu Underground City', 'Uchisar Castle', 'Pasabag Fairy Chimneys', 'Zelve Open Air Museum'],
        nearbyPlaces: ['Goreme', 'Urgup', 'Avanos', 'Uchisar', 'Ortahisar'],
      },
      de: {
        title: 'Kappadokien Touren | Heißluftballon & Hotels - Holiday.AILYDIAN',
        description: 'Kappadokien Ballontouren, unterirdische Städte, Feenkamin-Touren. Beste Preise für Heißluftballon und Boutique-Hotels.',
        keywords: 'kappadokien touren, kappadokien ballon, göreme, urgup, derinkuyu',
        h1: 'Kappadokien Touren und Ballonfahrten',
        content: `Kappadokien ist die bezauberndste Destination der Türkei.`,
        landmarks: ['Göreme Freilichtmuseum', 'Derinkuyu Unterirdische Stadt', 'Uchisar Burg', 'Pasabag Feenkamine'],
        nearbyPlaces: ['Göreme', 'Urgup', 'Avanos', 'Uchisar', 'Ortahisar'],
      },
      ru: {
        title: 'Туры в Каппадокию | Воздушный Шар и Отели - Holiday.AILYDIAN',
        description: 'Туры на воздушном шаре в Каппадокии, подземные города, туры по сказочным дымоходам.',
        keywords: 'туры каппадокия, каппадокия воздушный шар, гёреме, ургюп, деринкую',
        h1: 'Туры в Каппадокию и Полеты на Шаре',
        content: `Каппадокия - самое очаровательное направление Турции.`,
        landmarks: ['Музей Гёреме', 'Подземный город Деринкую', 'Замок Учисар', 'Сказочные дымоходы'],
        nearbyPlaces: ['Гёреме', 'Ургюп', 'Аванос', 'Учисар', 'Ортахисар'],
      },
      ar: {
        title: 'جولات كابادوكيا | منطاد الهواء الساخن والفنادق - Holiday.AILYDIAN',
        description: 'جولات منطاد كابادوكيا، المدن تحت الأرض، جولات المداخن الخيالية.',
        keywords: 'جولات كابادوكيا، منطاد كابادوكيا، جوريمي، أورجوب، ديرينكويو',
        h1: 'جولات كابادوكيا وجولات المنطاد',
        content: `كابادوكيا هي الوجهة الأكثر سحراً في تركيا.`,
        landmarks: ['متحف جوريمي المفتوح', 'مدينة ديرينكويو تحت الأرض', 'قلعة أوتشيسار'],
        nearbyPlaces: ['جوريمي', 'أورجوب', 'أفانوس', 'أوتشيسار', 'أورتاهيسار'],
      },
      fa: {
        title: 'تورهای کاپادوکیا | بالون هوای گرم و هتل‌ها - Holiday.AILYDIAN',
        description: 'تورهای بالون کاپادوکیا، شهرهای زیرزمینی، تورهای دودکش‌های پریان.',
        keywords: 'تورهای کاپادوکیا، بالون کاپادوکیا، گورمه، اورگوپ، دِرینکویو',
        h1: 'تورهای کاپادوکیا و پرواز با بالون',
        content: `کاپادوکیا جذاب‌ترین مقصد ترکیه است.`,
        landmarks: ['موزه گورمه', 'شهر زیرزمینی دِرینکویو', 'قلعه اوچیسار'],
        nearbyPlaces: ['گورمه', 'اورگوپ', 'آوانوس', 'اوچیسار', 'اورتاهیسار'],
      },
      fr: {
        title: 'Circuits Cappadoce | Montgolfière et Hôtels - Holiday.AILYDIAN',
        description: 'Circuits en montgolfière en Cappadoce, villes souterraines, circuits des cheminées de fées.',
        keywords: 'circuits cappadoce, montgolfière cappadoce, goreme, urgup, derinkuyu',
        h1: 'Circuits Cappadoce et Tours en Montgolfière',
        content: `La Cappadoce est la destination la plus enchanteresse de Turquie.`,
        landmarks: ['Musée de Göreme', 'Ville souterraine de Derinkuyu', 'Château d\'Uchisar'],
        nearbyPlaces: ['Göreme', 'Urgup', 'Avanos', 'Uchisar', 'Ortahisar'],
      },
      el: {
        title: 'Εκδρομές Καππαδοκία | Αερόστατο και Ξενοδοχεία - Holiday.AILYDIAN',
        description: 'Εκδρομές με αερόστατο στην Καππαδοκία, υπόγειες πόλεις, εκδρομές νεραϊδοκαμινάδων.',
        keywords: 'εκδρομές καππαδοκία, αερόστατο καππαδοκία, goreme, urgup',
        h1: 'Εκδρομές Καππαδοκία και Πτήσεις με Αερόστατο',
        content: `Η Καππαδοκία είναι ο πιο μαγευτικός προορισμός της Τουρκίας.`,
        landmarks: ['Μουσείο Göreme', 'Υπόγεια Πόλη Derinkuyu', 'Κάστρο Uchisar'],
        nearbyPlaces: ['Göreme', 'Urgup', 'Avanos', 'Uchisar', 'Ortahisar'],
      },
    },
  },
};

// ===================================================
// REGION-SPECIFIC SEO
// ===================================================

export const regionGeoSEO: Record<string, RegionGeoSEO> = {
  mediterranean: {
    slug: 'mediterranean',
    name: 'Mediterranean Region',
    cities: ['Antalya', 'Alanya', 'Side', 'Kaş', 'Kalkan', 'Fethiye', 'Marmaris'],
    seo: {
      tr: {
        title: 'Akdeniz Bölgesi Turları | Plajlar ve Antik Kentler - Holiday.AILYDIAN',
        description: 'Akdeniz sahillerinde tatil. Antalya, Alanya, Side, Kaş, Fethiye turları. Plajlar, antik kentler ve doğa.',
        keywords: 'akdeniz turları, antalya, alanya, side, kaş, fethiye, marmaris, plaj tatili',
      },
      en: {
        title: 'Mediterranean Region Tours | Beaches & Ancient Cities - Holiday.AILYDIAN',
        description: 'Holiday on the Mediterranean coast. Antalya, Alanya, Side, Kas, Fethiye tours. Beaches, ancient cities and nature.',
        keywords: 'mediterranean tours, antalya, alanya, side, kas, fethiye, marmaris, beach holiday',
      },
      de: {
        title: 'Mittelmeerregion Touren | Strände und Antike Städte - Holiday.AILYDIAN',
        description: 'Urlaub an der Mittelmeerküste. Antalya, Alanya, Side, Kas, Fethiye Touren.',
        keywords: 'mittelmeer touren, antalya, alanya, side, kas, fethiye',
      },
      ru: {
        title: 'Туры по Средиземноморью | Пляжи и Древние Города - Holiday.AILYDIAN',
        description: 'Отдых на Средиземноморском побережье. Туры Анталия, Аланья, Сиде, Каш, Фетхие.',
        keywords: 'туры средиземноморье, анталия, аланья, сиде, каш',
      },
      ar: {
        title: 'جولات منطقة البحر المتوسط | الشواطئ والمدن القديمة - Holiday.AILYDIAN',
        description: 'عطلة على ساحل البحر المتوسط. جولات أنطاليا، ألانيا، سيدا، كاش، فتحية.',
        keywords: 'جولات البحر المتوسط، أنطاليا، ألانيا، سيدا',
      },
      fa: {
        title: 'تورهای منطقه مدیترانه | سواحل و شهرهای باستانی - Holiday.AILYDIAN',
        description: 'تعطیلات در ساحل مدیترانه. تورهای آنتالیا، آلانیا، سیده، کاش، فتحیه.',
        keywords: 'تورهای مدیترانه، آنتالیا، آلانیا، سیده',
      },
      fr: {
        title: 'Circuits Région Méditerranéenne | Plages et Villes Antiques - Holiday.AILYDIAN',
        description: 'Vacances sur la côte méditerranéenne. Circuits Antalya, Alanya, Side, Kas, Fethiye.',
        keywords: 'circuits méditerranée, antalya, alanya, side',
      },
      el: {
        title: 'Εκδρομές Μεσογειακή Περιοχή | Παραλίες και Αρχαίες Πόλεις - Holiday.AILYDIAN',
        description: 'Διακοπές στη Μεσογειακή ακτή. Εκδρομές Αττάλεια, Αλάνια, Side, Kas, Fethiye.',
        keywords: 'εκδρομές μεσόγειος, αττάλεια, αλάνια',
      },
    },
  },

  aegean: {
    slug: 'aegean',
    name: 'Aegean Region',
    cities: ['İzmir', 'Bodrum', 'Kuşadası', 'Çeşme', 'Marmaris', 'Didim'],
    seo: {
      tr: {
        title: 'Ege Bölgesi Turları | Antik Kentler ve Plajlar - Holiday.AILYDIAN',
        description: 'Ege sahillerinde tatil. İzmir, Bodrum, Kuşadası, Çeşme, Marmaris turları. Efes, antik kentler.',
        keywords: 'ege turları, izmir, bodrum, kuşadası, çeşme, efes, antik kentler',
      },
      en: {
        title: 'Aegean Region Tours | Ancient Cities & Beaches - Holiday.AILYDIAN',
        description: 'Holiday on the Aegean coast. Izmir, Bodrum, Kusadasi, Cesme, Marmaris tours. Ephesus, ancient cities.',
        keywords: 'aegean tours, izmir, bodrum, kusadasi, cesme, ephesus',
      },
      de: {
        title: 'Ägäis Region Touren | Antike Städte und Strände - Holiday.AILYDIAN',
        description: 'Urlaub an der Ägäisküste. Izmir, Bodrum, Kusadasi, Cesme Touren.',
        keywords: 'ägäis touren, izmir, bodrum, kusadasi, ephesus',
      },
      ru: {
        title: 'Туры по Эгейскому региону | Древние города и пляжи - Holiday.AILYDIAN',
        description: 'Отдых на Эгейском побережье. Туры Измир, Бодрум, Кушадасы, Чешме.',
        keywords: 'туры эгейское море, измир, бодрум, кушадасы',
      },
      ar: {
        title: 'جولات منطقة بحر إيجة | المدن القديمة والشواطئ - Holiday.AILYDIAN',
        description: 'عطلة على ساحل بحر إيجة. جولات إزمير، بودروم، كوساداسي، تشيشمي.',
        keywords: 'جولات بحر إيجة، إزمير، بودروم، كوساداسي',
      },
      fa: {
        title: 'تورهای منطقه ایجه | شهرهای باستانی و سواحل - Holiday.AILYDIAN',
        description: 'تعطیلات در ساحل ایجه. تورهای ازمیر، بودروم، کوشاداسی، چشمه.',
        keywords: 'تورهای دریای ایجه، ازمیر، بودروم، کوشاداسی',
      },
      fr: {
        title: 'Circuits Région Égéenne | Villes Antiques et Plages - Holiday.AILYDIAN',
        description: 'Vacances sur la côte égéenne. Circuits Izmir, Bodrum, Kusadasi, Cesme.',
        keywords: 'circuits égée, izmir, bodrum, kusadasi',
      },
      el: {
        title: 'Εκδρομές Αιγαιακή Περιοχή | Αρχαίες Πόλεις και Παραλίες - Holiday.AILYDIAN',
        description: 'Διακοπές στην Αιγαιακή ακτή. Εκδρομές Σμύρνη, Bodrum, Kusadasi, Cesme.',
        keywords: 'εκδρομές αιγαίο, σμύρνη, bodrum, kusadasi',
      },
    },
  },
};

// ===================================================
// HELPER FUNCTIONS
// ===================================================

/**
 * Get city SEO data
 */
export const getCityGeoSEO = (citySlug: string, locale: SupportedLocale = 'tr') => {
  const city = cityGeoSEO[citySlug];
  if (!city) return null;

  return {
    ...city,
    localizedSEO: city.seo[locale] || city.seo.tr,
  };
};

/**
 * Get region SEO data
 */
export const getRegionGeoSEO = (regionSlug: string, locale: SupportedLocale = 'tr') => {
  const region = regionGeoSEO[regionSlug];
  if (!region) return null;

  return {
    ...region,
    localizedSEO: region.seo[locale] || region.seo.tr,
  };
};

/**
 * Get all cities for a region
 */
export const getCitiesByRegion = (regionSlug: string): string[] => {
  return regionGeoSEO[regionSlug]?.cities || [];
};

/**
 * Get popular cities (for sitemap)
 */
export const getPopularCities = (): string[] => {
  return Object.keys(cityGeoSEO);
};

export default {
  cityGeoSEO,
  regionGeoSEO,
  getCityGeoSEO,
  getRegionGeoSEO,
  getCitiesByRegion,
  getPopularCities,
};
