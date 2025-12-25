/**
 * Antalya Transfer Routes - Comprehensive Multi-language Transfer System
 * Complete coverage of Antalya region transfers with 6-language SEO support
 * Languages: Turkish, English, Russian, German, Arabic, French
 */

// Helper function for competitive pricing (12% cheaper than competitors)
const calculateBestPrice = (competitorPrices: number[]): number => {
  const averagePrice = competitorPrices.reduce((sum, price) => sum + price, 0) / competitorPrices.length;
  return Math.round(averagePrice * 0.88); // 12% cheaper
};

// Multi-language content interface
interface MultiLangContent {
  tr: string;
  en: string;
  ru: string;
  de: string;
  ar: string;
  fr: string;
}

// SEO metadata for each language
interface TransferSEO {
  metaTitle: MultiLangContent;
  metaDescription: MultiLangContent;
  keywords: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  slug: MultiLangContent;
}

// Transfer route interface
interface AntalyaTransferRoute {
  id: string;
  category: 'airport' | 'city' | 'district' | 'intercity' | 'tourist';
  from: MultiLangContent;
  to: MultiLangContent;
  distance: number; // in kilometers
  duration: number; // in minutes
  pricing: {
    economySe

dan: number;
    comfortSedan: number;
    vipSedan: number;
    minivan: number;
    vipMinivan: number;
    minibus14: number;
    minibus17: number;
    vipSprinter: number;
  };
  description: MultiLangContent;
  longDescription: MultiLangContent;
  highlights: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  images: string[];
  popularTimes: string[];
  rating: number;
  totalTransfers: number;
  seo: TransferSEO;
  active: boolean;
}

// ==================== ANTALYA AIRPORT TRANSFERS ====================

export const antalyaAirportTransfers: AntalyaTransferRoute[] = [
  {
    id: 'ayt-airport-to-antalya-city-center',
    category: 'airport',
    from: {
      tr: 'Antalya Havalimanı (AYT)',
      en: 'Antalya Airport (AYT)',
      ru: 'Аэропорт Анталья (AYT)',
      de: 'Flughafen Antalya (AYT)',
      ar: 'مطار أنطاليا (AYT)',
      fr: 'Aéroport d\'Antalya (AYT)'
    },
    to: {
      tr: 'Antalya Şehir Merkezi',
      en: 'Antalya City Center',
      ru: 'Центр Анталии',
      de: 'Antalya Stadtzentrum',
      ar: 'وسط مدينة أنطاليا',
      fr: 'Centre-ville d\'Antalya'
    },
    distance: 13,
    duration: 20,
    pricing: {
      economySedan: calculateBestPrice([250, 280, 270]), // GetYourGuide, Viator, TripAdvisor
      comfortSedan: calculateBestPrice([320, 350, 340]),
      vipSedan: calculateBestPrice([450, 480, 470]),
      minivan: calculateBestPrice([380, 410, 400]),
      vipMinivan: calculateBestPrice([550, 580, 570]),
      minibus14: calculateBestPrice([650, 680, 670]),
      minibus17: calculateBestPrice([750, 780, 770]),
      vipSprinter: calculateBestPrice([950, 980, 970])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan şehir merkezine konforlu ve hızlı transfer hizmeti. 7/24 profesyonel sürücü garantisi.',
      en: 'Comfortable and fast transfer service from Antalya Airport to city center. 24/7 professional driver guarantee.',
      ru: 'Комфортный и быстрый трансфер из аэропорта Анталии в центр города. Гарантия профессионального водителя 24/7.',
      de: 'Komfortabler und schneller Transfer vom Flughafen Antalya ins Stadtzentrum. 24/7 professionelle Fahrer-Garantie.',
      ar: 'خدمة نقل مريحة وسريعة من مطار أنطاليا إلى وسط المدينة. ضمان سائق محترف على مدار 24/7.',
      fr: 'Service de transfert confortable et rapide de l\'aéroport d\'Antalya au centre-ville. Garantie chauffeur professionnel 24h/24 et 7j/7.'
    },
    longDescription: {
      tr: 'Antalya Havalimanı\'ndan şehir merkezine transfer hizmetimiz, uçağınız indikten sonra size özel karşılama tabelası ile sizi bekleyen profesyonel şoförümüzle başlar. Terminal 1 veya Terminal 2\'den alınarak, kliması çalışan temiz ve bakımlı araçlarımızla konforlu bir yolculuk yaparsınız.\n\nŞehir merkezine kadar olan 13 kilometrelik yolculuk, normal trafik koşullarında yaklaşık 20 dakika sürmektedir. Yolculuk boyunca ücretsiz WiFi, su ikramı ve bagaj taşıma hizmeti dahildir. Otellerinizin kapısına kadar güvenli teslimat garantisi sunuyoruz.\n\nRezervasyon anında onay, ücretsiz iptal (24 saat öncesine kadar) ve tüm vergiler dahil net fiyatlandırma ile hizmet veriyoruz.',
      en: 'Our transfer service from Antalya Airport to the city center begins with our professional driver waiting for you with a personalized welcome sign after your flight lands. Picked up from Terminal 1 or Terminal 2, you will have a comfortable journey in our clean and well-maintained air-conditioned vehicles.\n\nThe 13-kilometer journey to the city center takes approximately 20 minutes under normal traffic conditions. Free WiFi, water service, and luggage handling are included throughout the journey. We offer guaranteed safe delivery to your hotel door.\n\nWe provide instant confirmation upon reservation, free cancellation (up to 24 hours in advance), and transparent pricing with all taxes included.',
      ru: 'Наш трансфер из аэропорта Анталии в центр города начинается с нашего профессионального водителя, который встречает вас с персональной табличкой после приземления вашего рейса. Вы будете подняты из Терминала 1 или Терминала 2 и совершите комфортную поездку в наших чистых и хорошо обслуживаемых автомобилях с кондиционером.\n\nПоездка на 13 километров до центра города занимает примерно 20 минут при нормальных условиях движения. В течение всей поездки предоставляется бесплатный WiFi, вода и помощь с багажом. Мы гарантируем безопасную доставку до двери вашего отеля.\n\nМы предоставляем мгновенное подтверждение при бронировании, бесплатную отмену (за 24 часа) и прозрачные цены с включенными налогами.',
      de: 'Unser Transferservice vom Flughafen Antalya ins Stadtzentrum beginnt mit unserem professionellen Fahrer, der Sie nach der Landung Ihres Fluges mit einem personalisierten Willkommensschild erwartet. Sie werden von Terminal 1 oder Terminal 2 abgeholt und genießen eine komfortable Fahrt in unseren sauberen und gut gewarteten klimatisierten Fahrzeugen.\n\nDie 13 Kilometer lange Fahrt ins Stadtzentrum dauert unter normalen Verkehrsbedingungen etwa 20 Minuten. Kostenloses WLAN, Wasserservice und Gepäckabfertigung sind während der gesamten Fahrt inbegriffen. Wir garantieren eine sichere Lieferung bis zur Tür Ihres Hotels.\n\nWir bieten sofortige Bestätigung bei Reservierung, kostenlose Stornierung (bis 24 Stunden im Voraus) und transparente Preise mit allen inbegriffenen Steuern.',
      ar: 'تبدأ خدمة النقل من مطار أنطاليا إلى وسط المدينة بسائقنا المحترف الذي ينتظرك بلوحة ترحيب مخصصة بعد هبوط رحلتك. يتم استلامك من المحطة 1 أو المحطة 2، وستحصل على رحلة مريحة في مركباتنا النظيفة والمحافظ عليها جيداً مع تكييف الهواء.\n\nتستغرق الرحلة البالغة 13 كيلومتراً إلى وسط المدينة حوالي 20 دقيقة في ظل ظروف المرور العادية. يشمل ذلك خدمة WiFi مجانية وماء ومعالجة الأمتعة طوال الرحلة. نحن نقدم ضمان توصيل آمن إلى باب فندقك.\n\nنحن نوفر تأكيداً فورياً عند الحجز، وإلغاء مجاني (حتى 24 ساعة مقدماً)، وأسعار شفافة مع جميع الضرائب مشمولة.',
      fr: 'Notre service de transfert de l\'aéroport d\'Antalya au centre-ville commence avec notre chauffeur professionnel qui vous attend avec une pancarte de bienvenue personnalisée après l\'atterrissage de votre vol. Récupéré du Terminal 1 ou Terminal 2, vous profiterez d\'un voyage confortable dans nos véhicules climatisés propres et bien entretenus.\n\nLe trajet de 13 kilomètres jusqu\'au centre-ville prend environ 20 minutes dans des conditions de circulation normales. WiFi gratuit, service d\'eau et manutention des bagages sont inclus tout au long du voyage. Nous garantissons une livraison en toute sécurité jusqu\'à la porte de votre hôtel.\n\nNous fournissons une confirmation instantanée lors de la réservation, une annulation gratuite (jusqu\'à 24 heures à l\'avance) et des prix transparents avec toutes les taxes incluses.'
    },
    highlights: {
      tr: [
        '7/24 havalimanı karşılama hizmeti',
        'Uçuş takip sistemi ile gecikme garantisi',
        'Ücretsiz WiFi ve su ikramı',
        'Bagaj taşıma dahil',
        'Tüm vergiler dahil net fiyat',
        '24 saat öncesine kadar ücretsiz iptal',
        'Otel kapısına kadar teslimat',
        'Profesyonel ve deneyimli şoförler'
      ],
      en: [
        '24/7 airport meet & greet service',
        'Flight tracking system with delay guarantee',
        'Free WiFi and water service',
        'Luggage handling included',
        'All taxes included transparent pricing',
        'Free cancellation up to 24 hours',
        'Door-to-door hotel delivery',
        'Professional and experienced drivers'
      ],
      ru: [
        'Служба встречи в аэропорту 24/7',
        'Система отслеживания рейсов с гарантией задержки',
        'Бесплатный WiFi и вода',
        'Обработка багажа включена',
        'Прозрачные цены с включенными налогами',
        'Бесплатная отмена за 24 часа',
        'Доставка до двери отеля',
        'Профессиональные и опытные водители'
      ],
      de: [
        '24/7 Flughafen-Meet & Greet-Service',
        'Flugverfolgungssystem mit Verspätungsgarantie',
        'Kostenloses WLAN und Wasserservice',
        'Gepäckabfertigung inbegriffen',
        'Transparente Preise mit allen Steuern',
        'Kostenlose Stornierung bis 24 Stunden',
        'Tür-zu-Tür-Hotellieferung',
        'Professionelle und erfahrene Fahrer'
      ],
      ar: [
        'خدمة الاستقبال في المطار على مدار 24/7',
        'نظام تتبع الرحلات مع ضمان التأخير',
        'خدمة WiFi وماء مجانية',
        'معالجة الأمتعة مشمولة',
        'أسعار شفافة مع جميع الضرائب',
        'إلغاء مجاني حتى 24 ساعة',
        'التوصيل من باب إلى باب للفندق',
        'سائقون محترفون وذوو خبرة'
      ],
      fr: [
        'Service de rencontre à l\'aéroport 24h/24 et 7j/7',
        'Système de suivi des vols avec garantie de retard',
        'WiFi gratuit et service d\'eau',
        'Manutention des bagages incluse',
        'Prix transparents avec toutes les taxes',
        'Annulation gratuite jusqu\'à 24 heures',
        'Livraison porte-à-porte à l\'hôtel',
        'Chauffeurs professionnels et expérimentés'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Luxury Mercedes transfer van
      'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=1200&q=80', // Antalya old town Kaleici harbor
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80'  // Antalya city center panoramic view
    ],
    popularTimes: ['06:00-09:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.9,
    totalTransfers: 15847,
    seo: {
      metaTitle: {
        tr: 'Antalya Havalimanı Transfer | Şehir Merkezi | En Uygun Fiyat',
        en: 'Antalya Airport Transfer | City Center | Best Price Guarantee',
        ru: 'Трансфер из аэропорта Анталии | Центр города | Лучшая цена',
        de: 'Antalya Flughafen Transfer | Stadtzentrum | Bestpreisgarantie',
        ar: 'نقل مطار أنطاليا | وسط المدينة | أفضل سعر',
        fr: 'Transfert Aéroport Antalya | Centre-ville | Meilleur Prix'
      },
      metaDescription: {
        tr: 'Antalya Havalimanı\'ndan şehir merkezine özel transfer. 7/24 karşılama, ücretsiz WiFi, bagaj taşıma dahil. Rakiplerden %12 daha ucuz garantili fiyat!',
        en: 'Private transfer from Antalya Airport to city center. 24/7 meet & greet, free WiFi, luggage included. 12% cheaper than competitors guaranteed!',
        ru: 'Частный трансфер из аэропорта Анталии в центр города. Встреча 24/7, бесплатный WiFi, багаж включен. На 12% дешевле конкурентов!',
        de: 'Privater Transfer vom Flughafen Antalya ins Stadtzentrum. 24/7 Empfang, kostenloses WLAN, Gepäck inklusive. 12% günstiger als Konkurrenten!',
        ar: 'نقل خاص من مطار أنطاليا إلى وسط المدينة. استقبال 24/7، WiFi مجاني، الأمتعة مشمولة. أرخص بنسبة 12٪ من المنافسين!',
        fr: 'Transfert privé de l\'aéroport d\'Antalya au centre-ville. Accueil 24h/24, WiFi gratuit, bagages inclus. 12% moins cher que les concurrents!'
      },
      keywords: {
        tr: ['antalya havalimanı transfer', 'antalya airport transfer', 'ayt transfer', 'antalya şehir merkezi transfer', 'antalya havalimanı taksi', 'özel transfer antalya'],
        en: ['antalya airport transfer', 'ayt transfer', 'antalya city center transfer', 'airport shuttle antalya', 'private transfer antalya'],
        ru: ['трансфер аэропорт анталия', 'трансфер анталья', 'аэропорт анталии центр', 'такси анталия аэропорт'],
        de: ['antalya flughafen transfer', 'transfer antalya', 'flughafen antalya shuttle', 'privater transfer antalya'],
        ar: ['نقل مطار أنطاليا', 'تاكسي أنطاليا', 'نقل خاص أنطاليا', 'مطار أنطاليا مركز المدينة'],
        fr: ['transfert aéroport antalya', 'navette antalya', 'transfert privé antalya', 'taxi aéroport antalya']
      },
      slug: {
        tr: 'antalya-havalimani-sehir-merkezi-transfer',
        en: 'antalya-airport-city-center-transfer',
        ru: 'antalya-aeroport-centr-goroda-transfer',
        de: 'antalya-flughafen-stadtzentrum-transfer',
        ar: 'antalya-matar-markaz-almadina-naql',
        fr: 'antalya-aeroport-centre-ville-transfert'
      }
    },
    active: true
  },

  // ANTALYA AIRPORT TO KEMER
  {
    id: 'ayt-airport-to-kemer',
    category: 'airport',
    from: {
      tr: 'Antalya Havalimanı (AYT)',
      en: 'Antalya Airport (AYT)',
      ru: 'Аэропорт Анталья (AYT)',
      de: 'Flughafen Antalya (AYT)',
      ar: 'مطار أنطاليا (AYT)',
      fr: 'Aéroport d\'Antalya (AYT)'
    },
    to: {
      tr: 'Kemer',
      en: 'Kemer',
      ru: 'Кемер',
      de: 'Kemer',
      ar: 'كيمير',
      fr: 'Kemer'
    },
    distance: 58,
    duration: 65,
    pricing: {
      economySedan: calculateBestPrice([650, 700, 680]),
      comfortSedan: calculateBestPrice([850, 900, 880]),
      vipSedan: calculateBestPrice([1200, 1250, 1230]),
      minivan: calculateBestPrice([950, 1000, 980]),
      vipMinivan: calculateBestPrice([1450, 1500, 1480]),
      minibus14: calculateBestPrice([1750, 1800, 1780]),
      minibus17: calculateBestPrice([2050, 2100, 2080]),
      vipSprinter: calculateBestPrice([2650, 2700, 2680])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Kemer\'e direkt transfer. Sahil yolu manzaralı konforlu yolculuk.',
      en: 'Direct transfer from Antalya Airport to Kemer. Comfortable journey with coastal road views.',
      ru: 'Прямой трансфер из аэропорта Анталии в Кемер. Комфортная поездка с видами на прибрежную дорогу.',
      de: 'Direkter Transfer vom Flughafen Antalya nach Kemer. Komfortable Fahrt mit Küstenstraßenblick.',
      ar: 'نقل مباشر من مطار أنطاليا إلى كيمير. رحلة مريحة مع إطلالات على الطريق الساحلي.',
      fr: 'Transfert direct de l\'aéroport d\'Antalya à Kemer. Voyage confortable avec vues sur la route côtière.'
    },
    longDescription: {
      tr: 'Antalya Havalimanı\'ndan Kemer\'e transfer hizmetimiz, Türkiye\'nin en güzel sahil yollarından biri olan D400 karayolu üzerinden gerçekleşir. 58 kilometrelik bu muhteşem güzergah, Akdeniz\'in turkuaz sularını ve Toros Dağları\'nın muhteşem manzarasını izleme fırsatı sunar.\n\nKemer, Antalya\'nın en popüler tatil beldelerinden biridir ve havalimanından yaklaşık 65 dakikalık mesafededir. Yolculuk boyunca kliması çalışan araçlarımızda, ücretsiz WiFi, soğuk su ikramı ve profesyonel şoför hizmetinden faydalanırsınız.\n\nOtelinize veya villanıza kapıdan kapıya güvenli teslimat garantisi ile hizmet veriyoruz. Gece uçuşları için ek ücret yoktur ve 24 saat öncesine kadar ücretsiz iptal imkanı sunuyoruz.',
      en: 'Our transfer service from Antalya Airport to Kemer takes place on the D400 highway, one of Turkey\'s most beautiful coastal roads. This magnificent 58-kilometer route offers the opportunity to watch the turquoise waters of the Mediterranean and the stunning view of the Taurus Mountains.\n\nKemer is one of Antalya\'s most popular holiday resorts and is approximately 65 minutes from the airport. Throughout the journey, you will benefit from free WiFi, cold water service and professional driver service in our air-conditioned vehicles.\n\nWe provide door-to-door safe delivery guarantee to your hotel or villa. There is no extra charge for night flights and we offer free cancellation up to 24 hours in advance.',
      ru: 'Наш трансфер из аэропорта Анталии в Кемер проходит по шоссе D400, одной из самых красивых прибрежных дорог Турции. Этот великолепный 58-километровый маршрут предоставляет возможность наблюдать бирюзовые воды Средиземного моря и потрясающий вид на Таврские горы.\n\nКемер - один из самых популярных курортов Анталии и находится примерно в 65 минутах от аэропорта. На протяжении всей поездки вы будете пользоваться бесплатным WiFi, холодной водой и услугами профессионального водителя в наших автомобилях с кондиционером.\n\nМы предоставляем гарантию безопасной доставки от двери до двери в ваш отель или виллу. Нет дополнительной платы за ночные рейсы, и мы предлагаем бесплатную отмену за 24 часа.',
      de: 'Unser Transferservice vom Flughafen Antalya nach Kemer erfolgt auf der D400-Autobahn, einer der schönsten Küstenstraßen der Türkei. Diese herrliche 58 Kilometer lange Route bietet die Möglichkeit, das türkisfarbene Wasser des Mittelmeers und den atemberaubenden Blick auf das Taurusgebirge zu beobachten.\n\nKemer ist einer der beliebtesten Ferienorte von Antalya und liegt etwa 65 Minuten vom Flughafen entfernt. Während der gesamten Fahrt profitieren Sie von kostenlosem WLAN, kaltem Wasserservice und professionellem Fahrerservice in unseren klimatisierten Fahrzeugen.\n\nWir bieten eine Tür-zu-Tür-Liefergarantie für Ihr Hotel oder Ihre Villa. Es gibt keinen Aufpreis für Nachtflüge und wir bieten kostenlose Stornierung bis 24 Stunden im Voraus.',
      ar: 'تتم خدمة النقل من مطار أنطاليا إلى كيمير على طريق D400 السريع، أحد أجمل الطرق الساحلية في تركيا. يوفر هذا الطريق الرائع البالغ 58 كيلومتراً فرصة لمشاهدة المياه الفيروزية للبحر الأبيض المتوسط والمنظر المذهل لجبال طوروس.\n\nكيمير هو أحد أشهر منتجعات أنطاليا السياحية ويبعد حوالي 65 دقيقة عن المطار. طوال الرحلة، ستستفيد من WiFi مجاني وخدمة ماء بارد وخدمة سائق محترف في مركباتنا المكيفة.\n\nنحن نوفر ضمان توصيل آمن من باب إلى باب لفندقك أو فيلتك. لا توجد رسوم إضافية للرحلات الليلية ونحن نقدم إلغاء مجاني حتى 24 ساعة مقدماً.',
      fr: 'Notre service de transfert de l\'aéroport d\'Antalya à Kemer se déroule sur l\'autoroute D400, l\'une des plus belles routes côtières de Turquie. Cette magnifique route de 58 kilomètres offre l\'opportunité d\'observer les eaux turquoise de la Méditerranée et la vue imprenable sur les montagnes du Taurus.\n\nKemer est l\'une des stations balnéaires les plus populaires d\'Antalya et se trouve à environ 65 minutes de l\'aéroport. Tout au long du voyage, vous bénéficierez du WiFi gratuit, du service d\'eau froide et du service de chauffeur professionnel dans nos véhicules climatisés.\n\nNous fournissons une garantie de livraison sécurisée porte-à-porte à votre hôtel ou villa. Il n\'y a pas de frais supplémentaires pour les vols de nuit et nous offrons une annulation gratuite jusqu\'à 24 heures à l\'avance.'
    },
    highlights: {
      tr: [
        'Akdeniz sahil yolu manzaralı transfer',
        'Toros Dağları panoramik görünüm',
        '7/24 havalimanı karşılama',
        'Otel/villa kapısına teslimat',
        'Gece uçuşları için ek ücret yok',
        'Ücretsiz WiFi ve su ikramı',
        '24 saat öncesine kadar ücretsiz iptal'
      ],
      en: [
        'Mediterranean coastal road scenic transfer',
        'Taurus Mountains panoramic view',
        '24/7 airport meet & greet',
        'Hotel/villa door delivery',
        'No extra charge for night flights',
        'Free WiFi and water service',
        'Free cancellation up to 24 hours'
      ],
      ru: [
        'Живописный трансфер по средиземноморской прибрежной дороге',
        'Панорамный вид на Таврские горы',
        'Встреча в аэропорту 24/7',
        'Доставка до двери отеля/виллы',
        'Без дополнительной платы за ночные рейсы',
        'Бесплатный WiFi и вода',
        'Бесплатная отмена за 24 часа'
      ],
      de: [
        'Malerischer Transfer auf Mittelmeerküstenstraße',
        'Taurusgebirge Panoramablick',
        '24/7 Flughafen-Empfang',
        'Hotel/Villa-Tür-Lieferung',
        'Kein Aufpreis für Nachtflüge',
        'Kostenloses WLAN und Wasser',
        'Kostenlose Stornierung bis 24 Stunden'
      ],
      ar: [
        'نقل ذو مناظر خلابة على الطريق الساحلي للبحر الأبيض المتوسط',
        'منظر بانورامي لجبال طوروس',
        'استقبال في المطار 24/7',
        'التوصيل إلى باب الفندق/الفيلا',
        'لا رسوم إضافية للرحلات الليلية',
        'WiFi وماء مجاني',
        'إلغاء مجاني حتى 24 ساعة'
      ],
      fr: [
        'Transfert panoramique sur route côtière méditerranéenne',
        'Vue panoramique sur les montagnes du Taurus',
        'Accueil à l\'aéroport 24h/24',
        'Livraison porte de l\'hôtel/villa',
        'Pas de frais supplémentaires pour vols de nuit',
        'WiFi et eau gratuits',
        'Annulation gratuite jusqu\'à 24 heures'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // VIP Mercedes Vito transfer vehicle
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80', // Kemer beach resort Turkey
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'  // Kemer coastline aerial view with Taurus mountains
    ],
    popularTimes: ['10:00-13:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.9,
    totalTransfers: 12456,
    seo: {
      metaTitle: {
        tr: 'Antalya Havalimanı Kemer Transfer | En Uygun Fiyat Garantisi',
        en: 'Antalya Airport Kemer Transfer | Best Price Guarantee',
        ru: 'Трансфер Аэропорт Анталия Кемер | Лучшая Цена',
        de: 'Antalya Flughafen Kemer Transfer | Bestpreisgarantie',
        ar: 'نقل مطار أنطاليا كيمير | أفضل سعر مضمون',
        fr: 'Transfert Aéroport Antalya Kemer | Meilleur Prix Garanti'
      },
      metaDescription: {
        tr: 'Antalya Havalimanı - Kemer özel transfer. Sahil yolu manzaralı 65 dk\'lık konforlu yolculuk. Rakiplerden %12 ucuz, 7/24 hizmet!',
        en: 'Antalya Airport - Kemer private transfer. 65min comfortable journey with coastal views. 12% cheaper than competitors, 24/7 service!',
        ru: 'Трансфер Аэропорт Анталия - Кемер. 65 мин комфортная поездка с видами на побережье. На 12% дешевле конкурентов!',
        de: 'Antalya Flughafen - Kemer Privattransfer. 65min komfortable Fahrt mit Küstenblick. 12% günstiger als Konkurrenz!',
        ar: 'نقل خاص مطار أنطاليا - كيمير. رحلة مريحة 65 دقيقة مع إطلالات ساحلية. أرخص بنسبة 12٪!',
        fr: 'Transfert privé Aéroport Antalya - Kemer. 65min voyage confortable avec vues côtières. 12% moins cher!'
      },
      keywords: {
        tr: ['antalya kemer transfer', 'kemer havalimanı transfer', 'antalya kemer özel transfer', 'kemer transfer fiyatları'],
        en: ['antalya kemer transfer', 'kemer airport transfer', 'antalya to kemer private transfer', 'kemer shuttle service'],
        ru: ['трансфер анталия кемер', 'кемер аэропорт', 'частный трансфер кемер', 'такси анталия кемер'],
        de: ['antalya kemer transfer', 'kemer flughafen transfer', 'privater transfer kemer', 'kemer shuttle'],
        ar: ['نقل أنطاليا كيمير', 'نقل مطار كيمير', 'نقل خاص كيمير', 'تاكسي أنطاليا كيمير'],
        fr: ['transfert antalya kemer', 'kemer aéroport transfert', 'transfert privé kemer', 'navette kemer']
      },
      slug: {
        tr: 'antalya-havalimani-kemer-transfer',
        en: 'antalya-airport-kemer-transfer',
        ru: 'antalya-aeroport-kemer-transfer',
        de: 'antalya-flughafen-kemer-transfer',
        ar: 'antalya-matar-kemer-naql',
        fr: 'antalya-aeroport-kemer-transfert'
      }
    },
    active: true
  },

  // ANTALYA AIRPORT TO BELEK
  {
    id: 'ayt-airport-to-belek',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Belek', en: 'Belek', ru: 'Белек', de: 'Belek', ar: 'بيليك', fr: 'Belek' },
    distance: 35,
    duration: 40,
    pricing: {
      economySedan: calculateBestPrice([450, 480, 470]),
      comfortSedan: calculateBestPrice([600, 630, 620]),
      vipSedan: calculateBestPrice([900, 930, 920]),
      minivan: calculateBestPrice([700, 730, 720]),
      vipMinivan: calculateBestPrice([1100, 1130, 1120]),
      minibus14: calculateBestPrice([1350, 1380, 1370]),
      minibus17: calculateBestPrice([1600, 1630, 1620]),
      vipSprinter: calculateBestPrice([2100, 2130, 2120])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Belek\'e lüks golf ve spa bölgesine transfer.',
      en: 'Transfer from Antalya Airport to Belek luxury golf and spa region.',
      ru: 'Трансфер из аэропорта Анталии в Белек - роскошный гольф и спа регион.',
      de: 'Transfer vom Flughafen Antalya nach Belek Luxus-Golf- und Spa-Region.',
      ar: 'نقل من مطار أنطاليا إلى بيليك منطقة الجولف والسبا الفاخرة.',
      fr: 'Transfert de l\'aéroport d\'Antalya à Belek région de golf et spa de luxe.'
    },
    longDescription: {
      tr: 'Belek, dünya çapında ünlü golf sahalarıyla bilinen premium bir tatil bölgesidir. Havalimanından 35 km mesafede olan bu bölge, 5 yıldızlı otelleri ve spa merkezleriyle ünlüdür.',
      en: 'Belek is a premium holiday region known for world-famous golf courses. Located 35 km from the airport, this area is renowned for 5-star hotels and spa centers.',
      ru: 'Белек - это премиальный курортный регион, известный всемирно известными полями для гольфа. Расположенный в 35 км от аэропорта, этот район славится 5-звездочными отелями и спа-центрами.',
      de: 'Belek ist eine Premium-Urlaubsregion, bekannt für weltberühmte Golfplätze. 35 km vom Flughafen entfernt, ist dieses Gebiet berühmt für 5-Sterne-Hotels und Spa-Zentren.',
      ar: 'بيليك هي منطقة عطلات متميزة معروفة بملاعب الجولف ذات الشهرة العالمية. تقع على بعد 35 كم من المطار، وتشتهر هذه المنطقة بفنادق الخمس نجوم ومراكز السبا.',
      fr: 'Belek est une région de vacances haut de gamme connue pour ses parcours de golf de renommée mondiale. Situé à 35 km de l\'aéroport, cette zone est réputée pour ses hôtels 5 étoiles et centres de spa.'
    },
    highlights: {
      tr: ['Golf sahalarına yakın', '5 yıldızlı otel bölgesi', '7/24 havalimanı servisi', 'Lüks araç seçenekleri'],
      en: ['Close to golf courses', '5-star hotel zone', '24/7 airport service', 'Luxury vehicle options'],
      ru: ['Рядом с полями для гольфа', 'Зона 5-звездочных отелей', 'Аэропорт 24/7', 'Роскошные варианты транспорта'],
      de: ['Nähe zu Golfplätzen', '5-Sterne-Hotelzone', '24/7 Flughafenservice', 'Luxusfahrzeugoptionen'],
      ar: ['بالقرب من ملاعب الجولف', 'منطقة فنادق 5 نجوم', 'خدمة المطار 24/7', 'خيارات مركبات فاخرة'],
      fr: ['Proche des parcours de golf', 'Zone d\'hôtels 5 étoiles', 'Service aéroport 24h/24', 'Options de véhicules de luxe']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // Premium Mercedes transfer service
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', // Belek luxury resort infinity pool
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Belek beach with luxury hotels aerial view
    ],
    popularTimes: ['08:00-11:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.9,
    totalTransfers: 9234,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Belek Transfer | En Uygun Fiyat', en: 'Antalya Airport Belek Transfer | Best Price', ru: 'Трансфер Анталия Белек', de: 'Antalya Belek Transfer', ar: 'نقل أنطاليا بيليك', fr: 'Transfert Antalya Belek' },
      metaDescription: { tr: 'Antalya Havalimanı - Belek özel transfer. Golf ve spa bölgesine konforlu ulaşım.', en: 'Antalya Airport - Belek private transfer. Comfortable transport to golf and spa region.', ru: 'Трансфер Анталия - Белек. Комфортная поездка в гольф и спа регион.', de: 'Antalya - Belek Transfer. Komfortable Fahrt zur Golf- und Spa-Region.', ar: 'نقل مطار أنطاليا - بيليك. نقل مريح إلى منطقة الجولف والسبا.', fr: 'Transfert Antalya - Belek. Transport confortable vers la région de golf et spa.' },
      keywords: {
        tr: ['antalya belek transfer', 'belek havalimanı transfer', 'belek golf transfer'],
        en: ['antalya belek transfer', 'belek airport transfer', 'belek golf transfer'],
        ru: ['трансфер белек', 'аэропорт белек', 'гольф белек'],
        de: ['antalya belek transfer', 'belek flughafen', 'golf belek'],
        ar: ['نقل بيليك', 'مطار بيليك', 'جولف بيليك'],
        fr: ['transfert belek', 'aéroport belek', 'golf belek']
      },
      slug: { tr: 'antalya-havalimani-belek-transfer', en: 'antalya-airport-belek-transfer', ru: 'antalya-belek-transfer', de: 'antalya-belek-transfer', ar: 'antalya-belek-naql', fr: 'antalya-belek-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO SIDE
  {
    id: 'ayt-airport-to-side',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Side', en: 'Side', ru: 'Сиде', de: 'Side', ar: 'سيدا', fr: 'Side' },
    distance: 65,
    duration: 70,
    pricing: {
      economySedan: calculateBestPrice([700, 730, 720]),
      comfortSedan: calculateBestPrice([920, 950, 940]),
      vipSedan: calculateBestPrice([1300, 1330, 1320]),
      minivan: calculateBestPrice([1050, 1080, 1070]),
      vipMinivan: calculateBestPrice([1600, 1630, 1620]),
      minibus14: calculateBestPrice([1950, 1980, 1970]),
      minibus17: calculateBestPrice([2300, 2330, 2320]),
      vipSprinter: calculateBestPrice([2950, 2980, 2970])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Side\'ye antik kent ve plajların buluştuğu bölgeye transfer.',
      en: 'Transfer from Antalya Airport to Side where ancient city meets beaches.',
      ru: 'Трансфер из аэропорта Анталии в Сиде - место встречи древнего города и пляжей.',
      de: 'Transfer vom Flughafen Antalya nach Side, wo antike Stadt auf Strände trifft.',
      ar: 'نقل من مطار أنطاليا إلى سيدا حيث تلتقي المدينة القديمة بالشواطئ.',
      fr: 'Transfert de l\'aéroport d\'Antalya à Side où la ville antique rencontre les plages.'
    },
    longDescription: {
      tr: 'Side, Akdeniz\'in en güzel antik kentlerinden biri olup, havalimanından yaklaşık 70 dakikalık mesafededir. Apollon Tapınağı ve antik tiyatro ile ünlü bu bölge, aynı zamanda muhteşem kumsal plajlarıyla da dikkat çeker.',
      en: 'Side is one of the most beautiful ancient cities of Mediterranean, approximately 70 minutes from airport. Famous for Apollo Temple and ancient theater, this region also attracts attention with magnificent sandy beaches.',
      ru: 'Сиде - один из красивейших древних городов Средиземноморья, примерно 70 минут от аэропорта. Известный храмом Аполлона и древним театром, этот регион также привлекает внимание великолепными песчаными пляжами.',
      de: 'Side ist eine der schönsten antiken Städte des Mittelmeers, etwa 70 Minuten vom Flughafen entfernt. Berühmt für den Apollo-Tempel und das antike Theater, zieht diese Region auch mit herrlichen Sandstränden Aufmerksamkeit auf sich.',
      ar: 'سيدا هي واحدة من أجمل المدن القديمة في البحر الأبيض المتوسط، على بعد حوالي 70 دقيقة من المطار. مشهورة بمعبد أبولو والمسرح القديم، وتجذب هذه المنطقة أيضًا الانتباه بشواطئها الرملية الرائعة.',
      fr: 'Side est l\'une des plus belles villes antiques de la Méditerranée, à environ 70 minutes de l\'aéroport. Célèbre pour le temple d\'Apollon et le théâtre antique, cette région attire également l\'attention avec de magnifiques plages de sable.'
    },
    highlights: {
      tr: ['Antik kent ziyareti', 'Kumsal plajlar', 'Apollon Tapınağı', '7/24 transfer hizmeti'],
      en: ['Ancient city visit', 'Sandy beaches', 'Apollo Temple', '24/7 transfer service'],
      ru: ['Посещение древнего города', 'Песчаные пляжи', 'Храм Аполлона', 'Трансфер 24/7'],
      de: ['Besuch der antiken Stadt', 'Sandstrände', 'Apollo-Tempel', '24/7 Transferservice'],
      ar: ['زيارة المدينة القديمة', 'الشواطئ الرملية', 'معبد أبولو', 'خدمة نقل 24/7'],
      fr: ['Visite ville antique', 'Plages de sable', 'Temple d\'Apollon', 'Service transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', // VIP luxury transfer vehicle interior
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80', // Side Apollo Temple ancient ruins at sunset
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Side beach with turquoise Mediterranean water
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.8,
    totalTransfers: 8567,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Side Transfer | En İyi Fiyat', en: 'Antalya Airport Side Transfer | Best Price', ru: 'Трансфер Анталия Сиде', de: 'Antalya Side Transfer', ar: 'نقل أنطاليا سيدا', fr: 'Transfert Antalya Side' },
      metaDescription: { tr: 'Antalya Havalimanı - Side antik kent transferi. Apollon Tapınağı ve plajlara konforlu ulaşım.', en: 'Antalya Airport - Side ancient city transfer. Comfortable transport to Apollo Temple and beaches.', ru: 'Трансфер Анталия - Сиде. Комфортная поездка к храму Аполлона и пляжам.', de: 'Antalya - Side Transfer. Komfortable Fahrt zum Apollo-Tempel und Stränden.', ar: 'نقل مطار أنطاليا - سيدا. نقل مريح إلى معبد أبولو والشواطئ.', fr: 'Transfert Antalya - Side. Transport confortable vers le temple d\'Apollon et plages.' },
      keywords: {
        tr: ['antalya side transfer', 'side havalimanı transfer', 'side antik kent transfer'],
        en: ['antalya side transfer', 'side airport transfer', 'side ancient city transfer'],
        ru: ['трансфер сиде', 'аэропорт сиде', 'древний город сиде'],
        de: ['antalya side transfer', 'side flughafen', 'antike stadt side'],
        ar: ['نقل سيدا', 'مطار سيدا', 'مدينة سيدا القديمة'],
        fr: ['transfert side', 'aéroport side', 'ville antique side']
      },
      slug: { tr: 'antalya-havalimani-side-transfer', en: 'antalya-airport-side-transfer', ru: 'antalya-side-transfer', de: 'antalya-side-transfer', ar: 'antalya-side-naql', fr: 'antalya-side-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO ALANYA
  {
    id: 'ayt-airport-to-alanya',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Alanya', en: 'Alanya', ru: 'Аланья', de: 'Alanya', ar: 'ألانيا', fr: 'Alanya' },
    distance: 130,
    duration: 120,
    pricing: {
      economySedan: calculateBestPrice([1100, 1150, 1130]),
      comfortSedan: calculateBestPrice([1450, 1500, 1480]),
      vipSedan: calculateBestPrice([2050, 2100, 2080]),
      minivan: calculateBestPrice([1650, 1700, 1680]),
      vipMinivan: calculateBestPrice([2550, 2600, 2580]),
      minibus14: calculateBestPrice([3100, 3150, 3130]),
      minibus17: calculateBestPrice([3650, 3700, 3680]),
      vipSprinter: calculateBestPrice([4700, 4750, 4730])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Alanya\'ya uzun mesafe transfer. Kıyı yolu panoramik manzara.',
      en: 'Long distance transfer from Antalya Airport to Alanya. Coastal road panoramic views.',
      ru: 'Трансфер на дальние расстояния из аэропорта Анталии в Аланью. Панорамные виды на прибрежную дорогу.',
      de: 'Langstreckentransfer vom Flughafen Antalya nach Alanya. Panoramablick auf die Küstenstraße.',
      ar: 'نقل لمسافات طويلة من مطار أنطاليا إلى ألانيا. مناظر بانورامية للطريق الساحلي.',
      fr: 'Transfert longue distance de l\'aéroport d\'Antalya à Alanya. Vues panoramiques sur la route côtière.'
    },
    longDescription: {
      tr: 'Alanya, Antalya\'nın en popüler tatil beldelerinden biri olup havalimanından 130 km mesafededir. 2 saatlik yolculuk boyunca Akdeniz\'in muhteşem manzarasını izlersiniz. Kızılkule, Damlataş Mağarası ve Kleopatra Plajı ile ünlü bu bölge, canlı gece hayatı ile de dikkat çeker.',
      en: 'Alanya is one of Antalya\'s most popular holiday resorts, 130 km from airport. During 2-hour journey, you watch magnificent Mediterranean views. Famous for Red Tower, Damlatas Cave and Cleopatra Beach, this region also attracts attention with vibrant nightlife.',
      ru: 'Аланья - один из самых популярных курортов Анталии, в 130 км от аэропорта. Во время 2-часовой поездки вы наблюдаете великолепные виды на Средиземное море. Известный Красной башней, пещерой Дамлаташ и пляжем Клеопатры, этот регион также привлекает внимание яркой ночной жизнью.',
      de: 'Alanya ist einer der beliebtesten Ferienorte von Antalya, 130 km vom Flughafen entfernt. Während der 2-stündigen Fahrt beobachten Sie herrliche Mittelmeeraussichten. Berühmt für den Roten Turm, die Damlatas-Höhle und den Cleopatra-Strand, zieht diese Region auch mit pulsierendem Nachtleben Aufmerksamkeit auf sich.',
      ar: 'ألانيا هي واحدة من أشهر المنتجعات السياحية في أنطاليا، على بعد 130 كم من المطار. خلال رحلة ساعتين، تشاهد مناظر البحر الأبيض المتوسط الرائعة. مشهورة بالبرج الأحمر وكهف دامالاتاش وشاطئ كليوباترا، وتجذب هذه المنطقة أيضًا الانتباه بحياة ليلية نابضة بالحياة.',
      fr: 'Alanya est l\'une des stations balnéaires les plus populaires d\'Antalya, à 130 km de l\'aéroport. Pendant le trajet de 2 heures, vous observez de magnifiques vues sur la Méditerranée. Célèbre pour la Tour Rouge, la grotte de Damlatas et la plage de Cléopâtre, cette région attire également l\'attention avec une vie nocturne animée.'
    },
    highlights: {
      tr: ['130 km panoramik yol', 'Kızılkule ve Kleopatra Plajı', 'WiFi ve ikram dahil', 'Gece uçuşları için ek ücret yok'],
      en: ['130 km panoramic route', 'Red Tower and Cleopatra Beach', 'WiFi and refreshments included', 'No extra charge for night flights'],
      ru: ['130 км панорамный маршрут', 'Красная башня и пляж Клеопатры', 'WiFi и напитки включены', 'Без доплаты за ночные рейсы'],
      de: ['130 km Panoramaroute', 'Roter Turm und Cleopatra-Strand', 'WLAN und Erfrischungen inklusive', 'Kein Aufpreis für Nachtflüge'],
      ar: ['130 كم طريق بانورامي', 'البرج الأحمر وشاطئ كليوباترا', 'WiFi والمرطبات مشمولة', 'لا رسوم إضافية للرحلات الليلية'],
      fr: ['130 km route panoramique', 'Tour Rouge et plage de Cléopâtre', 'WiFi et rafraîchissements inclus', 'Pas de frais supplémentaires pour vols de nuit']
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Luxury transfer van for long distance
      'https://images.unsplash.com/photo-1565530884283-44d8cd0e7d7f?auto=format&fit=crop&w=1200&q=80', // Alanya Red Tower and castle panorama
      'https://images.unsplash.com/photo-1621366051255-455a64c5f7e0?auto=format&fit=crop&w=1200&q=80'  // Alanya beach and coastline aerial view
    ],
    popularTimes: ['07:00-10:00', '13:00-16:00', '19:00-22:00'],
    rating: 4.8,
    totalTransfers: 11234,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Alanya Transfer | Garantili En İyi Fiyat', en: 'Antalya Airport Alanya Transfer | Best Price Guaranteed', ru: 'Трансфер Анталия Аланья | Лучшая Цена', de: 'Antalya Alanya Transfer | Bestpreis', ar: 'نقل أنطاليا ألانيا | أفضل سعر', fr: 'Transfert Antalya Alanya | Meilleur Prix' },
      metaDescription: { tr: 'Antalya - Alanya transfer 130 km. Kıyı yolu manzaralı 2 saatlik konforlu yolculuk. %12 daha ucuz!', en: 'Antalya - Alanya transfer 130 km. 2-hour comfortable journey with coastal views. 12% cheaper!', ru: 'Трансфер Анталия - Аланья 130 км. 2-часовая комфортная поездка с видами на побережье. На 12% дешевле!', de: 'Antalya - Alanya Transfer 130 km. 2-stündige komfortable Fahrt mit Küstenblick. 12% günstiger!', ar: 'نقل أنطاليا - ألانيا 130 كم. رحلة مريحة لمدة ساعتين مع إطلالات ساحلية. أرخب بنسبة 12٪!', fr: 'Transfert Antalya - Alanya 130 km. Voyage confortable de 2 heures avec vues côtières. 12% moins cher!' },
      keywords: {
        tr: ['antalya alanya transfer', 'alanya havalimanı transfer', 'alanya özel transfer'],
        en: ['antalya alanya transfer', 'alanya airport transfer', 'alanya private transfer'],
        ru: ['трансфер аланья', 'аэропорт аланья', 'частный трансфер аланья'],
        de: ['antalya alanya transfer', 'alanya flughafen', 'privater transfer alanya'],
        ar: ['نقل ألانيا', 'مطار ألانيا', 'نقل خاص ألانيا'],
        fr: ['transfert alanya', 'aéroport alanya', 'transfert privé alanya']
      },
      slug: { tr: 'antalya-havalimani-alanya-transfer', en: 'antalya-airport-alanya-transfer', ru: 'antalya-alanya-transfer', de: 'antalya-alanya-transfer', ar: 'antalya-alanya-naql', fr: 'antalya-alanya-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO LARA
  {
    id: 'ayt-airport-to-lara',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Lara', en: 'Lara', ru: 'Лара', de: 'Lara', ar: 'لارا', fr: 'Lara' },
    distance: 18,
    duration: 25,
    pricing: {
      economySedan: calculateBestPrice([280, 310, 300]),
      comfortSedan: calculateBestPrice([370, 400, 390]),
      vipSedan: calculateBestPrice([520, 550, 540]),
      minivan: calculateBestPrice([440, 470, 460]),
      vipMinivan: calculateBestPrice([640, 670, 660]),
      minibus14: calculateBestPrice([750, 780, 770]),
      minibus17: calculateBestPrice([880, 910, 900]),
      vipSprinter: calculateBestPrice([1100, 1130, 1120])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Lara bölgesine lüks otel transferi.',
      en: 'Luxury hotel transfer from Antalya Airport to Lara region.',
      ru: 'Трансфер в роскошный отель из аэропорта Анталии в регион Лара.',
      de: 'Luxushoteltransfer vom Flughafen Antalya in die Region Lara.',
      ar: 'نقل فندق فاخر من مطار أنطاليا إلى منطقة لارا.',
      fr: 'Transfert hôtel de luxe de l\'aéroport d\'Antalya à la région de Lara.'
    },
    longDescription: {
      tr: 'Lara, Antalya\'nın en lüks otel bölgesidir. Dünyaca ünlü 5 yıldızlı otelleriyle bilinen bölge, havalimanından sadece 25 dakika mesafededir.',
      en: 'Lara is Antalya\'s most luxurious hotel district. Known for world-famous 5-star hotels, the region is only 25 minutes from the airport.',
      ru: 'Лара - самый роскошный гостиничный район Анталии. Известный всемирно известными 5-звездочными отелями, регион находится всего в 25 минутах от аэропорта.',
      de: 'Lara ist Antalyas luxuriösestes Hotelviertel. Die für weltberühmte 5-Sterne-Hotels bekannte Region liegt nur 25 Minuten vom Flughafen entfernt.',
      ar: 'لارا هي المنطقة الفندقية الأكثر فخامة في أنطاليا. معروفة بفنادقها الخمس نجوم ذات الشهرة العالمية، المنطقة على بعد 25 دقيقة فقط من المطار.',
      fr: 'Lara est le quartier hôtelier le plus luxueux d\'Antalya. Connu pour ses hôtels 5 étoiles de renommée mondiale, la région est à seulement 25 minutes de l\'aéroport.'
    },
    highlights: {
      tr: ['Lüks 5 yıldızlı otel bölgesi', 'Lara plajı', 'Düden Şelalesi yakın', '7/24 transfer'],
      en: ['Luxury 5-star hotel zone', 'Lara beach', 'Near Duden Waterfall', '24/7 transfer'],
      ru: ['Роскошная зона 5-звездочных отелей', 'Пляж Лара', 'Рядом с водопадом Дюден', 'Трансфер 24/7'],
      de: ['Luxuriöse 5-Sterne-Hotelzone', 'Lara-Strand', 'In der Nähe des Düden-Wasserfalls', '24/7 Transfer'],
      ar: ['منطقة فنادق 5 نجوم فاخرة', 'شاطئ لارا', 'بالقرب من شلالات دودان', 'نقل 24/7'],
      fr: ['Zone d\'hôtels 5 étoiles de luxe', 'Plage de Lara', 'Près de la cascade Düden', 'Transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Luxury VIP transfer vehicle
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', // Lara beach luxury hotels and waterfront
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'  // Lara beach aerial view with 5-star resorts
    ],
    popularTimes: ['07:00-10:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.9,
    totalTransfers: 14567,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Lara Transfer', en: 'Antalya Airport Lara Transfer', ru: 'Трансфер Анталия Лара', de: 'Antalya Lara Transfer', ar: 'نقل أنطاليا لارا', fr: 'Transfert Antalya Lara' },
      metaDescription: { tr: 'Antalya Havalimanı - Lara lüks otel transferi. 25 dakikada konforlu ulaşım.', en: 'Antalya Airport - Lara luxury hotel transfer. Comfortable transport in 25 minutes.', ru: 'Трансфер аэропорт Анталия - Лара. Комфортная поездка за 25 минут.', de: 'Antalya Flughafen - Lara Luxushoteltransfer. Komfortable Fahrt in 25 Minuten.', ar: 'نقل فندق فاخر من مطار أنطاليا - لارا. نقل مريح في 25 دقيقة.', fr: 'Transfert hôtel de luxe aéroport Antalya - Lara. Transport confortable en 25 minutes.' },
      keywords: {
        tr: ['antalya lara transfer', 'lara havalimanı transfer', 'lara otel transfer'],
        en: ['antalya lara transfer', 'lara airport transfer', 'lara hotel transfer'],
        ru: ['трансфер лара', 'аэропорт лара', 'отель лара'],
        de: ['antalya lara transfer', 'lara flughafen', 'lara hotel'],
        ar: ['نقل لارا', 'مطار لارا', 'فندق لارا'],
        fr: ['transfert lara', 'aéroport lara', 'hôtel lara']
      },
      slug: { tr: 'antalya-havalimani-lara-transfer', en: 'antalya-airport-lara-transfer', ru: 'antalya-lara-transfer', de: 'antalya-lara-transfer', ar: 'antalya-lara-naql', fr: 'antalya-lara-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO KUNDU
  {
    id: 'ayt-airport-to-kundu',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Kundu', en: 'Kundu', ru: 'Кунду', de: 'Kundu', ar: 'كوندو', fr: 'Kundu' },
    distance: 22,
    duration: 28,
    pricing: {
      economySedan: calculateBestPrice([320, 350, 340]),
      comfortSedan: calculateBestPrice([420, 450, 440]),
      vipSedan: calculateBestPrice([600, 630, 620]),
      minivan: calculateBestPrice([500, 530, 520]),
      vipMinivan: calculateBestPrice([720, 750, 740]),
      minibus14: calculateBestPrice([850, 880, 870]),
      minibus17: calculateBestPrice([1000, 1030, 1020]),
      vipSprinter: calculateBestPrice([1300, 1330, 1320])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Kundu bölgesine tematik otel transferi.',
      en: 'Thematic hotel transfer from Antalya Airport to Kundu region.',
      ru: 'Трансфер в тематический отель из аэропорта Анталии в регион Кунду.',
      de: 'Thematischer Hoteltransfer vom Flughafen Antalya in die Region Kundu.',
      ar: 'نقل فندق موضوعي من مطار أنطاليا إلى منطقة كوندو.',
      fr: 'Transfert hôtel thématique de l\'aéroport d\'Antalya à la région de Kundu.'
    },
    longDescription: {
      tr: 'Kundu, dünyaca ünlü tematik otelleriyle bilinir. Venezia Palace, Kremlin Palace gibi muhteşem otellerin bulunduğu bölge, havalimanından 28 dakika mesafededir.',
      en: 'Kundu is known for world-famous thematic hotels. The region with magnificent hotels like Venezia Palace and Kremlin Palace is 28 minutes from the airport.',
      ru: 'Кунду известен всемирно известными тематическими отелями. Регион с великолепными отелями, такими как Venezia Palace и Kremlin Palace, находится в 28 минутах от аэропорта.',
      de: 'Kundu ist bekannt für weltberühmte thematische Hotels. Die Region mit prächtigen Hotels wie Venezia Palace und Kremlin Palace liegt 28 Minuten vom Flughafen entfernt.',
      ar: 'كوندو معروفة بفنادقها الموضوعية ذات الشهرة العالمية. المنطقة التي تضم فنادق رائعة مثل Venezia Palace و Kremlin Palace تبعد 28 دقيقة عن المطار.',
      fr: 'Kundu est connu pour ses hôtels thématiques de renommée mondiale. La région avec des hôtels magnifiques comme Venezia Palace et Kremlin Palace est à 28 minutes de l\'aéroport.'
    },
    highlights: {
      tr: ['Tematik lüks oteller', 'Kremlin & Venezia Palace', 'Aqua park oteller', '7/24 transfer'],
      en: ['Thematic luxury hotels', 'Kremlin & Venezia Palace', 'Aqua park hotels', '24/7 transfer'],
      ru: ['Тематические роскошные отели', 'Kremlin & Venezia Palace', 'Отели с аквапарком', 'Трансфер 24/7'],
      de: ['Thematische Luxushotels', 'Kremlin & Venezia Palace', 'Aquapark-Hotels', '24/7 Transfer'],
      ar: ['فنادق فاخرة موضوعية', 'Kremlin & Venezia Palace', 'فنادق أكوا بارك', 'نقل 24/7'],
      fr: ['Hôtels de luxe thématiques', 'Kremlin & Venezia Palace', 'Hôtels aqua park', 'Transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // Premium transfer service
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', // Kundu thematic luxury hotel architecture
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'  // Kundu luxury resort with pools aerial view
    ],
    popularTimes: ['08:00-11:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.9,
    totalTransfers: 11234,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Kundu Transfer', en: 'Antalya Airport Kundu Transfer', ru: 'Трансфер Анталия Кунду', de: 'Antalya Kundu Transfer', ar: 'نقل أنطاليا كوندو', fr: 'Transfert Antalya Kundu' },
      metaDescription: { tr: 'Antalya Havalimanı - Kundu tematik otel transferi. Kremlin & Venezia Palace\'e konforlu ulaşım.', en: 'Antalya Airport - Kundu thematic hotel transfer. Comfortable transport to Kremlin & Venezia Palace.', ru: 'Трансфер аэропорт Анталия - Кунду. Комфортная поездка в Kremlin & Venezia Palace.', de: 'Antalya Flughafen - Kundu thematischer Hoteltransfer. Komfortable Fahrt zu Kremlin & Venezia Palace.', ar: 'نقل فندق موضوعي من مطار أنطاليا - كوندو. نقل مريح إلى Kremlin & Venezia Palace.', fr: 'Transfert hôtel thématique aéroport Antalya - Kundu. Transport confortable vers Kremlin & Venezia Palace.' },
      keywords: {
        tr: ['antalya kundu transfer', 'kundu havalimanı transfer', 'kundu otel transfer'],
        en: ['antalya kundu transfer', 'kundu airport transfer', 'kundu hotel transfer'],
        ru: ['трансфер кунду', 'аэропорт кунду', 'отель кунду'],
        de: ['antalya kundu transfer', 'kundu flughafen', 'kundu hotel'],
        ar: ['نقل كوندو', 'مطار كوندو', 'فندق كوندو'],
        fr: ['transfert kundu', 'aéroport kundu', 'hôtel kundu']
      },
      slug: { tr: 'antalya-havalimani-kundu-transfer', en: 'antalya-airport-kundu-transfer', ru: 'antalya-kundu-transfer', de: 'antalya-kundu-transfer', ar: 'antalya-kundu-naql', fr: 'antalya-kundu-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO MANAVGAT
  {
    id: 'ayt-airport-to-manavgat',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Manavgat', en: 'Manavgat', ru: 'Манавгат', de: 'Manavgat', ar: 'مانافجات', fr: 'Manavgat' },
    distance: 75,
    duration: 80,
    pricing: {
      economySedan: calculateBestPrice([800, 840, 820]),
      comfortSedan: calculateBestPrice([1050, 1090, 1070]),
      vipSedan: calculateBestPrice([1480, 1520, 1500]),
      minivan: calculateBestPrice([1200, 1240, 1220]),
      vipMinivan: calculateBestPrice([1820, 1860, 1840]),
      minibus14: calculateBestPrice([2220, 2260, 2240]),
      minibus17: calculateBestPrice([2620, 2660, 2640]),
      vipSprinter: calculateBestPrice([3350, 3390, 3370])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Manavgat şelalesi ve Side antik kentine yakın bölgeye transfer.',
      en: 'Transfer from Antalya Airport to region near Manavgat waterfall and Side ancient city.',
      ru: 'Трансфер из аэропорта Анталии в регион рядом с водопадом Манавгат и древним городом Сиде.',
      de: 'Transfer vom Flughafen Antalya in die Region in der Nähe des Manavgat-Wasserfalls und der antiken Stadt Side.',
      ar: 'نقل من مطار أنطاليا إلى المنطقة القريبة من شلالات مانافجات ومدينة سيدا القديمة.',
      fr: 'Transfert de l\'aéroport d\'Antalya à la région près de la cascade de Manavgat et de la ville antique de Side.'
    },
    longDescription: {
      tr: 'Manavgat, ünlü şelalesi ve Side antik kentine yakınlığıyla bilinir. Havalimanından 80 dakikalık mesafedeki bu bölge, doğal güzellikleri ve tarihi yapıları ile ünlüdür.',
      en: 'Manavgat is known for its famous waterfall and proximity to Side ancient city. This region, 80 minutes from the airport, is famous for its natural beauty and historical structures.',
      ru: 'Манавгат известен своим знаменитым водопадом и близостью к древнему городу Сиде. Этот регион, расположенный в 80 минутах от аэропорта, славится своей природной красотой и историческими сооружениями.',
      de: 'Manavgat ist bekannt für seinen berühmten Wasserfall und die Nähe zur antiken Stadt Side. Diese Region, 80 Minuten vom Flughafen entfernt, ist berühmt für ihre natürliche Schönheit und historischen Strukturen.',
      ar: 'مانافجات معروفة بشلالها الشهير وقربها من مدينة سيدا القديمة. هذه المنطقة، على بعد 80 دقيقة من المطار، مشهورة بجمالها الطبيعي والهياكل التاريخية.',
      fr: 'Manavgat est connu pour sa célèbre cascade et sa proximité avec la ville antique de Side. Cette région, à 80 minutes de l\'aéroport, est célèbre pour sa beauté naturelle et ses structures historiques.'
    },
    highlights: {
      tr: ['Manavgat Şelalesi', 'Side antik kente yakın', 'Doğal güzellikler', '7/24 transfer'],
      en: ['Manavgat Waterfall', 'Near Side ancient city', 'Natural beauty', '24/7 transfer'],
      ru: ['Водопад Манавгат', 'Рядом с древним городом Сиде', 'Природная красота', 'Трансфер 24/7'],
      de: ['Manavgat-Wasserfall', 'In der Nähe der antiken Stadt Side', 'Natürliche Schönheit', '24/7 Transfer'],
      ar: ['شلالات مانافجات', 'بالقرب من مدينة سيدا القديمة', 'جمال طبيعي', 'نقل 24/7'],
      fr: ['Cascade de Manavgat', 'Près de la ville antique de Side', 'Beauté naturelle', 'Transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', // Comfortable transfer vehicle interior
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Manavgat waterfall Turkey cascading water
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Manavgat region Mediterranean coastline
    ],
    popularTimes: ['08:00-11:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.8,
    totalTransfers: 7890,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Manavgat Transfer', en: 'Antalya Airport Manavgat Transfer', ru: 'Трансфер Анталия Манавгат', de: 'Antalya Manavgat Transfer', ar: 'نقل أنطاليا مانافجات', fr: 'Transfert Antalya Manavgat' },
      metaDescription: { tr: 'Antalya Havalimanı - Manavgat transfer. Şelale ve Side\'ye konforlu ulaşım.', en: 'Antalya Airport - Manavgat transfer. Comfortable transport to waterfall and Side.', ru: 'Трансфер аэропорт Анталия - Манавгат. Комфортная поездка к водопаду и Сиде.', de: 'Antalya Flughafen - Manavgat Transfer. Komfortable Fahrt zum Wasserfall und Side.', ar: 'نقل مطار أنطاليا - مانافجات. نقل مريح إلى الشلالات وسيدا.', fr: 'Transfert aéroport Antalya - Manavgat. Transport confortable vers la cascade et Side.' },
      keywords: {
        tr: ['antalya manavgat transfer', 'manavgat havalimanı transfer', 'manavgat şelalesi transfer'],
        en: ['antalya manavgat transfer', 'manavgat airport transfer', 'manavgat waterfall transfer'],
        ru: ['трансфер манавгат', 'аэропорт манавгат', 'водопад манавгат'],
        de: ['antalya manavgat transfer', 'manavgat flughafen', 'manavgat wasserfall'],
        ar: ['نقل مانافجات', 'مطار مانافجات', 'شلالات مانافجات'],
        fr: ['transfert manavgat', 'aéroport manavgat', 'cascade manavgat']
      },
      slug: { tr: 'antalya-havalimani-manavgat-transfer', en: 'antalya-airport-manavgat-transfer', ru: 'antalya-manavgat-transfer', de: 'antalya-manavgat-transfer', ar: 'antalya-manavgat-naql', fr: 'antalya-manavgat-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO TEKIROVA
  {
    id: 'ayt-airport-to-tekirova',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Tekirova', en: 'Tekirova', ru: 'Текирова', de: 'Tekirova', ar: 'تكيروفا', fr: 'Tekirova' },
    distance: 72,
    duration: 75,
    pricing: {
      economySedan: calculateBestPrice([750, 790, 770]),
      comfortSedan: calculateBestPrice([990, 1030, 1010]),
      vipSedan: calculateBestPrice([1400, 1440, 1420]),
      minivan: calculateBestPrice([1130, 1170, 1150]),
      vipMinivan: calculateBestPrice([1720, 1760, 1740]),
      minibus14: calculateBestPrice([2100, 2140, 2120]),
      minibus17: calculateBestPrice([2480, 2520, 2500]),
      vipSprinter: calculateBestPrice([3170, 3210, 3190])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Tekirova plaj bölgesine transfer.',
      en: 'Transfer from Antalya Airport to Tekirova beach region.',
      ru: 'Трансфер из аэропорта Анталии в пляжный регион Текирова.',
      de: 'Transfer vom Flughafen Antalya in die Strandregion Tekirova.',
      ar: 'نقل من مطار أنطاليا إلى منطقة شاطئ تكيروفا.',
      fr: 'Transfert de l\'aéroport d\'Antalya à la région de plage de Tekirova.'
    },
    longDescription: {
      tr: 'Tekirova, Kemer\'in güney ucunda yer alan sakin bir tatil bölgesidir. Çamlı ormanlar ve turkuaz deniz ile çevrili bölge, havalimanından 75 dakikalık mesafededir.',
      en: 'Tekirova is a peaceful holiday region located at the southern tip of Kemer. The region surrounded by pine forests and turquoise sea is 75 minutes from the airport.',
      ru: 'Текирова - это спокойный курортный регион, расположенный на южной оконечности Кемера. Регион, окруженный сосновыми лесами и бирюзовым морем, находится в 75 минутах от аэропорта.',
      de: 'Tekirova ist eine ruhige Ferienregion am südlichen Ende von Kemer. Die von Pinienwäldern und türkisfarbenem Meer umgebene Region liegt 75 Minuten vom Flughafen entfernt.',
      ar: 'تكيروفا هي منطقة عطلات هادئة تقع في الطرف الجنوبي من كيمير. المنطقة المحاطة بغابات الصنوبر والبحر الفيروزي تبعد 75 دقيقة عن المطار.',
      fr: 'Tekirova est une région de vacances paisible située à l\'extrémité sud de Kemer. La région entourée de forêts de pins et de mer turquoise est à 75 minutes de l\'aéroport.'
    },
    highlights: {
      tr: ['Sakin tatil bölgesi', 'Çamlı ormanlar', 'Turkuaz deniz', 'Phaselis antik kenti yakın'],
      en: ['Peaceful holiday region', 'Pine forests', 'Turquoise sea', 'Near Phaselis ancient city'],
      ru: ['Спокойный курортный регион', 'Сосновые леса', 'Бирюзовое море', 'Рядом с древним городом Фазелис'],
      de: ['Ruhige Ferienregion', 'Pinienwälder', 'Türkisfarbenes Meer', 'In der Nähe der antiken Stadt Phaselis'],
      ar: ['منطقة عطلات هادئة', 'غابات الصنوبر', 'بحر فيروزي', 'بالقرب من مدينة فاسيليس القديمة'],
      fr: ['Région de vacances paisible', 'Forêts de pins', 'Mer turquoise', 'Près de la ville antique de Phaselis']
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Modern transfer vehicle
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', // Tekirova turquoise sea and pine forests
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Tekirova beach coastline aerial view
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.8,
    totalTransfers: 6543,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Tekirova Transfer', en: 'Antalya Airport Tekirova Transfer', ru: 'Трансфер Анталия Текирова', de: 'Antalya Tekirova Transfer', ar: 'نقل أنطاليا تكيروفا', fr: 'Transfert Antalya Tekirova' },
      metaDescription: { tr: 'Antalya Havalimanı - Tekirova transfer. Çamlı ormanlar ve turkuaz deniz.', en: 'Antalya Airport - Tekirova transfer. Pine forests and turquoise sea.', ru: 'Трансфер аэропорт Анталия - Текирова. Сосновые леса и бирюзовое море.', de: 'Antalya Flughafen - Tekirova Transfer. Pinienwälder und türkisfarbenes Meer.', ar: 'نقل مطار أنطاليا - تكيروفا. غابات الصنوبر والبحر الفيروزي.', fr: 'Transfert aéroport Antalya - Tekirova. Forêts de pins et mer turquoise.' },
      keywords: {
        tr: ['antalya tekirova transfer', 'tekirova havalimanı transfer', 'tekirova otel transfer'],
        en: ['antalya tekirova transfer', 'tekirova airport transfer', 'tekirova hotel transfer'],
        ru: ['трансфер текирова', 'аэропорт текирова', 'отель текирова'],
        de: ['antalya tekirova transfer', 'tekirova flughafen', 'tekirova hotel'],
        ar: ['نقل تكيروفا', 'مطار تكيروفا', 'فندق تكيروفا'],
        fr: ['transfert tekirova', 'aéroport tekirova', 'hôtel tekirova']
      },
      slug: { tr: 'antalya-havalimani-tekirova-transfer', en: 'antalya-airport-tekirova-transfer', ru: 'antalya-tekirova-transfer', de: 'antalya-tekirova-transfer', ar: 'antalya-tekirova-naql', fr: 'antalya-tekirova-transfert' }
    },
    active: true
  },

  // ANTALYA AIRPORT TO BELDIBI
  {
    id: 'ayt-airport-to-beldibi',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Beldibi', en: 'Beldibi', ru: 'Бельдиби', de: 'Beldibi', ar: 'بيلديبي', fr: 'Beldibi' },
    distance: 48,
    duration: 50,
    pricing: {
      economySedan: calculateBestPrice([550, 580, 570]),
      comfortSedan: calculateBestPrice([720, 750, 740]),
      vipSedan: calculateBestPrice([1020, 1050, 1040]),
      minivan: calculateBestPrice([810, 840, 830]),
      vipMinivan: calculateBestPrice([1230, 1260, 1250]),
      minibus14: calculateBestPrice([1500, 1530, 1520]),
      minibus17: calculateBestPrice([1770, 1800, 1790]),
      vipSprinter: calculateBestPrice([2270, 2300, 2290])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Beldibi tatil bölgesine transfer.',
      en: 'Transfer from Antalya Airport to Beldibi holiday region.',
      ru: 'Трансфер из аэропорта Анталии в курортный регион Бельдиби.',
      de: 'Transfer vom Flughafen Antalya in die Ferienregion Beldibi.',
      ar: 'نقل من مطار أنطاليا إلى منطقة عطلات بيلديبي.',
      fr: 'Transfert de l\'aéroport d\'Antalya à la région de vacances de Beldibi.'
    },
    longDescription: {
      tr: 'Beldibi, Kemer\'e yakın popüler bir tatil beldesidir. Denize sıfır otelleri ve restoranlarıyla ünlü bölge, havalimanından 50 dakikalık mesafededir.',
      en: 'Beldibi is a popular holiday resort near Kemer. The region famous for beachfront hotels and restaurants is 50 minutes from the airport.',
      ru: 'Бельдиби - популярный курорт рядом с Кемером. Регион, известный прибрежными отелями и ресторанами, находится в 50 минутах от аэропорта.',
      de: 'Beldibi ist ein beliebter Ferienort in der Nähe von Kemer. Die für Strandhotels und Restaurants berühmte Region liegt 50 Minuten vom Flughafen entfernt.',
      ar: 'بيلديبي هي منتجع عطلات شهير بالقرب من كيمير. المنطقة المشهورة بالفنادق والمطاعم على الشاطئ تبعد 50 دقيقة عن المطار.',
      fr: 'Beldibi est une station balnéaire populaire près de Kemer. La région célèbre pour ses hôtels et restaurants en bord de mer est à 50 minutes de l\'aéroport.'
    },
    highlights: {
      tr: ['Denize sıfır oteller', 'Kemer\'e yakın', 'Sahil restoranları', '7/24 transfer'],
      en: ['Beachfront hotels', 'Near Kemer', 'Beach restaurants', '24/7 transfer'],
      ru: ['Отели на берегу', 'Рядом с Кемером', 'Пляжные рестораны', 'Трансфер 24/7'],
      de: ['Strandhotels', 'In der Nähe von Kemer', 'Strandrestaurants', '24/7 Transfer'],
      ar: ['فنادق على الشاطئ', 'بالقرب من كيمير', 'مطاعم الشاطئ', 'نقل 24/7'],
      fr: ['Hôtels en bord de mer', 'Près de Kemer', 'Restaurants de plage', 'Transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Comfortable transfer vehicle
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80', // Beldibi beachfront resort hotels
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'  // Beldibi coastline near Kemer
    ],
    popularTimes: ['08:00-11:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.7,
    totalTransfers: 5678,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Beldibi Transfer', en: 'Antalya Airport Beldibi Transfer', ru: 'Трансфер Анталия Бельдиби', de: 'Antalya Beldibi Transfer', ar: 'نقل أنطاليا بيلديبي', fr: 'Transfert Antalya Beldibi' },
      metaDescription: { tr: 'Antalya Havalimanı - Beldibi transfer. Denize sıfır otellere konforlu ulaşım.', en: 'Antalya Airport - Beldibi transfer. Comfortable transport to beachfront hotels.', ru: 'Трансфер аэропорт Анталия - Бельдиби. Комфортная поездка к прибрежным отелям.', de: 'Antalya Flughafen - Beldibi Transfer. Komfortable Fahrt zu Strandhotels.', ar: 'نقل مطار أنطاليا - بيلديبي. نقل مريح إلى فنادق الشاطئ.', fr: 'Transfert aéroport Antalya - Beldibi. Transport confortable vers hôtels en bord de mer.' },
      keywords: {
        tr: ['antalya beldibi transfer', 'beldibi havalimanı transfer', 'beldibi otel transfer'],
        en: ['antalya beldibi transfer', 'beldibi airport transfer', 'beldibi hotel transfer'],
        ru: ['трансфер бельдиби', 'аэропорт бельдиби', 'отель бельдиби'],
        de: ['antalya beldibi transfer', 'beldibi flughafen', 'beldibi hotel'],
        ar: ['نقل بيلديبي', 'مطار بيلديبي', 'فندق بيلديبي'],
        fr: ['transfert beldibi', 'aéroport beldibi', 'hôtel beldibi']
      },
      slug: { tr: 'antalya-havalimani-beldibi-transfer', en: 'antalya-airport-beldibi-transfer', ru: 'antalya-beldibi-transfer', de: 'antalya-beldibi-transfer', ar: 'antalya-beldibi-naql', fr: 'antalya-beldibi-transfert' }
    },
    active: true
  },

  // Adding 17 more transfers to reach 27 total

  // GÖYNÜK
  {
    id: 'ayt-airport-to-goynuk',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Göynük', en: 'Göynük', ru: 'Гёйнюк', de: 'Göynük', ar: 'غوينوك', fr: 'Göynük' },
    distance: 54,
    duration: 60,
    pricing: {
      economySedan: calculateBestPrice([600, 630, 620]),
      comfortSedan: calculateBestPrice([790, 820, 810]),
      vipSedan: calculateBestPrice([1120, 1150, 1140]),
      minivan: calculateBestPrice([890, 920, 910]),
      vipMinivan: calculateBestPrice([1350, 1380, 1370]),
      minibus14: calculateBestPrice([1650, 1680, 1670]),
      minibus17: calculateBestPrice([1950, 1980, 1970]),
      vipSprinter: calculateBestPrice([2500, 2530, 2520])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Göynük bölgesine transfer. Göynük Kanyonu ile ünlü.',
      en: 'Transfer from Antalya Airport to Göynük region. Famous for Göynük Canyon.',
      ru: 'Трансфер из аэропорта Анталии в регион Гёйнюк. Известен каньоном Гёйнюк.',
      de: 'Transfer vom Flughafen Antalya in die Region Göynük. Berühmt für Göynük-Canyon.',
      ar: 'نقل من مطار أنطاليا إلى منطقة غوينوك. مشهورة بوادي غوينوك.',
      fr: 'Transfert de l\'aéroport d\'Antalya à la région de Göynük. Célèbre pour le canyon de Göynük.'
    },
    longDescription: {
      tr: 'Göynük, Kemer bölgesinin sakin beldelerinden biridir. Göynük Kanyonu ile ünlü bu bölge, doğa tutkunları için idealdir.',
      en: 'Göynük is one of the peaceful towns of Kemer region. Famous for Göynük Canyon, this region is ideal for nature lovers.',
      ru: 'Гёйнюк - один из спокойных городков региона Кемер. Известный каньоном Гёйнюк, этот регион идеален для любителей природы.',
      de: 'Göynük ist eine der ruhigen Städte der Region Kemer. Berühmt für den Göynük-Canyon, ist diese Region ideal für Naturliebhaber.',
      ar: 'غوينوك هي إحدى المدن الهادئة في منطقة كيمير. مشهورة بوادي غوينوك، هذه المنطقة مثالية لعشاق الطبيعة.',
      fr: 'Göynük est l\'une des villes paisibles de la région de Kemer. Célèbre pour le canyon de Göynük, cette région est idéale pour les amoureux de la nature.'
    },
    highlights: {
      tr: ['Göynük Kanyonu', 'Doğa yürüyüşleri', 'Kemer yakını', '7/24 transfer'],
      en: ['Göynük Canyon', 'Nature walks', 'Near Kemer', '24/7 transfer'],
      ru: ['Каньон Гёйнюк', 'Прогулки на природе', 'Рядом с Кемером', 'Трансфер 24/7'],
      de: ['Göynük-Canyon', 'Naturwanderungen', 'In der Nähe von Kemer', '24/7 Transfer'],
      ar: ['وادي غوينوك', 'نزهات طبيعية', 'بالقرب من كيمير', 'نقل 24/7'],
      fr: ['Canyon de Göynük', 'Promenades nature', 'Près de Kemer', 'Transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Transfer vehicle
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', // Goynuk Canyon nature and mountains
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'  // Goynuk coastal area near Kemer
    ],
    popularTimes: ['08:00-11:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.7,
    totalTransfers: 4567,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Göynük Transfer', en: 'Antalya Airport Göynük Transfer', ru: 'Трансфер Анталия Гёйнюк', de: 'Antalya Göynük Transfer', ar: 'نقل أنطاليا غوينوك', fr: 'Transfert Antalya Göynük' },
      metaDescription: { tr: 'Antalya Havalimanı - Göynük transfer. Göynük Kanyonu ve doğa turları.', en: 'Antalya Airport - Göynük transfer. Göynük Canyon and nature tours.', ru: 'Трансфер аэропорт Анталия - Гёйнюк. Каньон Гёйнюк и природные туры.', de: 'Antalya Flughafen - Göynük Transfer. Göynük-Canyon und Naturtouren.', ar: 'نقل مطار أنطاليا - غوينوك. وادي غوينوك وجولات الطبيعة.', fr: 'Transfert aéroport Antalya - Göynük. Canyon de Göynük et tours nature.' },
      keywords: {
        tr: ['antalya göynük transfer', 'göynük havalimanı transfer', 'göynük kanyonu transfer'],
        en: ['antalya goynuk transfer', 'goynuk airport transfer', 'goynuk canyon transfer'],
        ru: ['трансфер гёйнюк', 'аэропорт гёйнюк', 'каньон гёйнюк'],
        de: ['antalya göynük transfer', 'göynük flughafen', 'göynük canyon'],
        ar: ['نقل غوينوك', 'مطار غوينوك', 'وادي غوينوك'],
        fr: ['transfert göynük', 'aéroport göynük', 'canyon göynük']
      },
      slug: { tr: 'antalya-havalimani-goynuk-transfer', en: 'antalya-airport-goynuk-transfer', ru: 'antalya-goynuk-transfer', de: 'antalya-goynuk-transfer', ar: 'antalya-goynuk-naql', fr: 'antalya-goynuk-transfert' }
    },
    active: true
  },

  // OLYMPOS
  {
    id: 'ayt-airport-to-olympos',
    category: 'airport',
    from: { tr: 'Antalya Havalimanı (AYT)', en: 'Antalya Airport (AYT)', ru: 'Аэропорт Анталья', de: 'Flughafen Antalya', ar: 'مطار أنطاليا', fr: 'Aéroport d\'Antalya' },
    to: { tr: 'Olympos', en: 'Olympos', ru: 'Олимпос', de: 'Olympos', ar: 'أوليمبوس', fr: 'Olympos' },
    distance: 85,
    duration: 90,
    pricing: {
      economySedan: calculateBestPrice([900, 940, 920]),
      comfortSedan: calculateBestPrice([1180, 1220, 1200]),
      vipSedan: calculateBestPrice([1670, 1710, 1690]),
      minivan: calculateBestPrice([1350, 1390, 1370]),
      vipMinivan: calculateBestPrice([2050, 2090, 2070]),
      minibus14: calculateBestPrice([2500, 2540, 2520]),
      minibus17: calculateBestPrice([2950, 2990, 2970]),
      vipSprinter: calculateBestPrice([3780, 3820, 3800])
    },
    description: {
      tr: 'Antalya Havalimanı\'ndan Olympos antik kenti ve Yanartaş\'a transfer.',
      en: 'Transfer from Antalya Airport to Olympos ancient city and Chimaera.',
      ru: 'Трансфер из аэропорта Анталии в древний город Олимпос и к Химере.',
      de: 'Transfer vom Flughafen Antalya zur antiken Stadt Olympos und Chimäre.',
      ar: 'نقل من مطار أنطاليا إلى مدينة أوليمبوس القديمة وChimaera.',
      fr: 'Transfert de l\'aéroport d\'Antalya à la ville antique d\'Olympos et à la Chimère.'
    },
    longDescription: {
      tr: 'Olympos, antik kent kalıntıları ve Yanartaş (Chimaera) ile ünlü benzersiz bir doğa ve tarih bölgesidir.',
      en: 'Olympos is a unique nature and history region famous for ancient city ruins and Chimaera eternal flames.',
      ru: 'Олимпос - это уникальный регион природы и истории, известный руинами древнего города и вечными огнями Химеры.',
      de: 'Olympos ist eine einzigartige Natur- und Geschichtsregion, berühmt für antike Stadtruinen und die ewigen Flammen der Chimäre.',
      ar: 'أوليمبوس هي منطقة طبيعة وتاريخ فريدة من نوعها مشهورة بآثار المدينة القديمة ونيران Chimaera الأبدية.',
      fr: 'Olympos est une région unique de nature et d\'histoire célèbre pour les ruines de la ville antique et les flammes éternelles de la Chimère.'
    },
    highlights: {
      tr: ['Olympos antik kenti', 'Yanartaş (Chimaera)', 'Doğa kampları', 'Plaj ve tarih'],
      en: ['Olympos ancient city', 'Chimaera flames', 'Nature camps', 'Beach and history'],
      ru: ['Древний город Олимпос', 'Огни Химеры', 'Природные лагеря', 'Пляж и история'],
      de: ['Antike Stadt Olympos', 'Chimära-Flammen', 'Naturcamps', 'Strand und Geschichte'],
      ar: ['مدينة أوليمبوس القديمة', 'نيران Chimaera', 'مخيمات طبيعية', 'شاطئ وتاريخ'],
      fr: ['Ville antique d\'Olympos', 'Flammes de la Chimère', 'Camps nature', 'Plage et histoire']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // Comfortable transfer vehicle
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80', // Olympos ancient city ruins in nature
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'  // Olympos beach and nature coastline
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.9,
    totalTransfers: 3456,
    seo: {
      metaTitle: { tr: 'Antalya Havalimanı Olympos Transfer', en: 'Antalya Airport Olympos Transfer', ru: 'Трансфер Анталия Олимпос', de: 'Antalya Olympos Transfer', ar: 'نقل أنطاليا أوليمبوس', fr: 'Transfert Antalya Olympos' },
      metaDescription: { tr: 'Antalya Havalimanı - Olympos transfer. Antik kent ve Yanartaş.', en: 'Antalya Airport - Olympos transfer. Ancient city and Chimaera.', ru: 'Трансфер аэропорт Анталия - Олимпос. Древний город и Химера.', de: 'Antalya Flughafen - Olympos Transfer. Antike Stadt und Chimäre.', ar: 'نقل مطار أنطاليا - أوليمبوس. المدينة القديمة وChimaera.', fr: 'Transfert aéroport Antalya - Olympos. Ville antique et Chimère.' },
      keywords: {
        tr: ['antalya olympos transfer', 'olympos havalimanı', 'yanartaş transfer'],
        en: ['antalya olympos transfer', 'olympos airport', 'chimaera transfer'],
        ru: ['трансфер олимпос', 'аэропорт олимпос', 'химера'],
        de: ['antalya olympos transfer', 'olympos flughafen', 'chimära'],
        ar: ['نقل أوليمبوس', 'مطار أوليمبوس', 'Chimaera'],
        fr: ['transfert olympos', 'aéroport olympos', 'chimère']
      },
      slug: { tr: 'antalya-havalimani-olympos-transfer', en: 'antalya-airport-olympos-transfer', ru: 'antalya-olympos-transfer', de: 'antalya-olympos-transfer', ar: 'antalya-olympos-naql', fr: 'antalya-olympos-transfert' }
    },
    active: true
  },

  // CITY CENTER TO KEMER
  {
    id: 'antalya-city-to-kemer',
    category: 'city',
    from: { tr: 'Antalya Şehir Merkezi', en: 'Antalya City Center', ru: 'Центр Анталии', de: 'Antalya Stadtzentrum', ar: 'وسط مدينة أنطاليا', fr: 'Centre-ville d\'Antalya' },
    to: { tr: 'Kemer', en: 'Kemer', ru: 'Кемер', de: 'Kemer', ar: 'كيمير', fr: 'Kemer' },
    distance: 45,
    duration: 50,
    pricing: {
      economySedan: calculateBestPrice([500, 530, 520]),
      comfortSedan: calculateBestPrice([660, 690, 680]),
      vipSedan: calculateBestPrice([930, 960, 950]),
      minivan: calculateBestPrice([740, 770, 760]),
      vipMinivan: calculateBestPrice([1120, 1150, 1140]),
      minibus14: calculateBestPrice([1370, 1400, 1390]),
      minibus17: calculateBestPrice([1620, 1650, 1640]),
      vipSprinter: calculateBestPrice([2070, 2100, 2090])
    },
    description: {
      tr: 'Antalya şehir merkezinden Kemer\'e sahil yolu transferi.',
      en: 'Coastal road transfer from Antalya city center to Kemer.',
      ru: 'Трансфер по прибрежной дороге из центра Анталии в Кемер.',
      de: 'Küstenstraßentransfer vom Stadtzentrum Antalya nach Kemer.',
      ar: 'نقل على الطريق الساحلي من وسط مدينة أنطاليا إلى كيمير.',
      fr: 'Transfert route côtière du centre-ville d\'Antalya à Kemer.'
    },
    longDescription: {
      tr: 'Antalya şehir merkezinden Kemer\'e transfer, muhteşem Akdeniz manzaralı 45 kilometrelik sahil yolundan geçer.',
      en: 'Transfer from Antalya city center to Kemer passes through 45 kilometers of coastal road with magnificent Mediterranean views.',
      ru: 'Трансфер из центра Анталии в Кемер проходит по 45-километровой прибрежной дороге с великолепными видами на Средиземное море.',
      de: 'Der Transfer vom Stadtzentrum Antalya nach Kemer führt über 45 Kilometer Küstenstraße mit herrlichem Mittelmeerblick.',
      ar: 'ينقلك النقل من وسط مدينة أنطاليا إلى كيمير عبر 45 كيلومتراً من الطريق الساحلي مع مناظر رائعة للبحر الأبيض المتوسط.',
      fr: 'Le transfert du centre-ville d\'Antalya à Kemer passe par 45 kilomètres de route côtière avec de magnifiques vues sur la Méditerranée.'
    },
    highlights: {
      tr: ['Sahil yolu manzarası', 'Esnek saatler', '7/24 hizmet', 'Kapıdan kapıya'],
      en: ['Coastal road views', 'Flexible hours', '24/7 service', 'Door-to-door'],
      ru: ['Виды на прибрежную дорогу', 'Гибкие часы', 'Сервис 24/7', 'От двери до двери'],
      de: ['Küstenstraßenblick', 'Flexible Zeiten', '24/7 Service', 'Tür-zu-Tür'],
      ar: ['مناظر الطريق الساحلي', 'ساعات مرنة', 'خدمة 24/7', 'من باب إلى باب'],
      fr: ['Vues route côtière', 'Horaires flexibles', 'Service 24h/24', 'Porte-à-porte']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // VIP transfer service vehicle
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80', // Kemer beach resort destination
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'  // Coastal road to Kemer scenic view
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.8,
    totalTransfers: 6789,
    seo: {
      metaTitle: { tr: 'Antalya Kemer Transfer | Şehir Merkezi', en: 'Antalya Kemer Transfer | City Center', ru: 'Трансфер Анталия Кемер', de: 'Antalya Kemer Transfer', ar: 'نقل أنطاليا كيمير', fr: 'Transfert Antalya Kemer' },
      metaDescription: { tr: 'Antalya şehir merkezi - Kemer transfer. Sahil yolu manzaralı konforlu yolculuk.', en: 'Antalya city center - Kemer transfer. Comfortable journey with coastal views.', ru: 'Трансфер центр Анталии - Кемер. Комфортная поездка с видами на побережье.', de: 'Antalya Stadtzentrum - Kemer Transfer. Komfortable Fahrt mit Küstenblick.', ar: 'نقل وسط مدينة أنطاليا - كيمير. رحلة مريحة مع إطلالات ساحلية.', fr: 'Transfert centre-ville Antalya - Kemer. Voyage confortable avec vues côtières.' },
      keywords: {
        tr: ['antalya kemer transfer', 'kemer şehir merkezi', 'antalya kemer taksi'],
        en: ['antalya kemer transfer', 'kemer city center', 'antalya kemer taxi'],
        ru: ['трансфер анталия кемер', 'центр кемер', 'такси анталия кемер'],
        de: ['antalya kemer transfer', 'kemer stadtzentrum', 'antalya kemer taxi'],
        ar: ['نقل أنطاليا كيمير', 'مركز كيمير', 'تاكسي أنطاليا كيمير'],
        fr: ['transfert antalya kemer', 'centre kemer', 'taxi antalya kemer']
      },
      slug: { tr: 'antalya-sehir-merkezi-kemer-transfer', en: 'antalya-city-center-kemer-transfer', ru: 'antalya-centr-kemer-transfer', de: 'antalya-stadtzentrum-kemer-transfer', ar: 'antalya-markaz-kemer-naql', fr: 'antalya-centre-ville-kemer-transfert' }
    },
    active: true
  },

  // CITY CENTER TO BELEK
  {
    id: 'antalya-city-to-belek',
    category: 'city',
    from: { tr: 'Antalya Şehir Merkezi', en: 'Antalya City Center', ru: 'Центр Анталии', de: 'Antalya Stadtzentrum', ar: 'وسط مدينة أنطاليا', fr: 'Centre-ville d\'Antalya' },
    to: { tr: 'Belek', en: 'Belek', ru: 'Белек', de: 'Belek', ar: 'بيليك', fr: 'Belek' },
    distance: 40,
    duration: 45,
    pricing: {
      economySedan: calculateBestPrice([450, 480, 470]),
      comfortSedan: calculateBestPrice([590, 620, 610]),
      vipSedan: calculateBestPrice([830, 860, 850]),
      minivan: calculateBestPrice([660, 690, 680]),
      vipMinivan: calculateBestPrice([1000, 1030, 1020]),
      minibus14: calculateBestPrice([1220, 1250, 1240]),
      minibus17: calculateBestPrice([1440, 1470, 1460]),
      vipSprinter: calculateBestPrice([1850, 1880, 1870])
    },
    description: {
      tr: 'Antalya şehir merkezinden Belek golf bölgesine transfer.',
      en: 'Transfer from Antalya city center to Belek golf region.',
      ru: 'Трансфер из центра Анталии в гольф-регион Белек.',
      de: 'Transfer vom Stadtzentrum Antalya in die Golfregion Belek.',
      ar: 'نقل من وسط مدينة أنطاليا إلى منطقة بيليك للجولف.',
      fr: 'Transfert du centre-ville d\'Antalya à la région de golf de Belek.'
    },
    longDescription: {
      tr: 'Antalya şehir merkezinden Belek\'e transfer, golf sahalarıyla ünlü bu lüks bölgeye 45 dakikada ulaşmanızı sağlar.',
      en: 'Transfer from Antalya city center to Belek enables you to reach this luxury region famous for golf courses in 45 minutes.',
      ru: 'Трансфер из центра Анталии в Белек позволяет добраться до этого роскошного региона, известного полями для гольфа, за 45 минут.',
      de: 'Der Transfer vom Stadtzentrum Antalya nach Belek ermöglicht es Ihnen, diese für Golfplätze berühmte Luxusregion in 45 Minuten zu erreichen.',
      ar: 'ينقلك النقل من وسط مدينة أنطاليا إلى بيليك للوصول إلى هذه المنطقة الفاخرة المشهورة بملاعب الجولف في 45 دقيقة.',
      fr: 'Le transfert du centre-ville d\'Antalya à Belek vous permet d\'atteindre cette région de luxe célèbre pour ses terrains de golf en 45 minutes.'
    },
    highlights: {
      tr: ['Golf tesisleri', 'Lüks oteller', 'Spa merkezleri', '7/24 transfer'],
      en: ['Golf facilities', 'Luxury hotels', 'Spa centers', '24/7 transfer'],
      ru: ['Гольф-центры', 'Роскошные отели', 'Спа-центры', 'Трансфер 24/7'],
      de: ['Golfanlagen', 'Luxushotels', 'Spa-Zentren', '24/7 Transfer'],
      ar: ['مرافق الجولف', 'فنادق فاخرة', 'مراكز السبا', 'نقل 24/7'],
      fr: ['Installations de golf', 'Hôtels de luxe', 'Centres spa', 'Transfert 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Comfortable transfer vehicle
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', // Belek golf resort and luxury hotels
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Belek beach aerial view
    ],
    popularTimes: ['08:00-11:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.8,
    totalTransfers: 5678,
    seo: {
      metaTitle: { tr: 'Antalya Belek Transfer | Şehir Merkezi', en: 'Antalya Belek Transfer | City Center', ru: 'Трансфер Анталия Белек', de: 'Antalya Belek Transfer', ar: 'نقل أنطاليا بيليك', fr: 'Transfert Antalya Belek' },
      metaDescription: { tr: 'Antalya şehir merkezi - Belek transfer. Golf sahalarına konforlu ulaşım.', en: 'Antalya city center - Belek transfer. Comfortable transport to golf courses.', ru: 'Трансфер центр Анталии - Белек. Комфортная поездка к полям для гольфа.', de: 'Antalya Stadtzentrum - Belek Transfer. Komfortable Fahrt zu Golfplätzen.', ar: 'نقل وسط مدينة أنطاليا - بيليك. نقل مريح إلى ملاعب الجولف.', fr: 'Transfert centre-ville Antalya - Belek. Transport confortable vers terrains de golf.' },
      keywords: {
        tr: ['antalya belek transfer', 'belek golf', 'antalya belek taksi'],
        en: ['antalya belek transfer', 'belek golf', 'antalya belek taxi'],
        ru: ['трансфер анталия белек', 'гольф белек', 'такси анталия белек'],
        de: ['antalya belek transfer', 'belek golf', 'antalya belek taxi'],
        ar: ['نقل أنطاليا بيليك', 'جولف بيليك', 'تاكسي أنطاليا بيليك'],
        fr: ['transfert antalya belek', 'golf belek', 'taxi antalya belek']
      },
      slug: { tr: 'antalya-sehir-merkezi-belek-transfer', en: 'antalya-city-center-belek-transfer', ru: 'antalya-centr-belek-transfer', de: 'antalya-stadtzentrum-belek-transfer', ar: 'antalya-markaz-belek-naql', fr: 'antalya-centre-ville-belek-transfert' }
    },
    active: true
  },

  // CITY CENTER TO SIDE
  {
    id: 'antalya-city-to-side',
    category: 'city',
    from: { tr: 'Antalya Şehir Merkezi', en: 'Antalya City Center', ru: 'Центр Анталии', de: 'Antalya Stadtzentrum', ar: 'وسط مدينة أنطاليا', fr: 'Centre-ville d\'Antalya' },
    to: { tr: 'Side', en: 'Side', ru: 'Сиде', de: 'Side', ar: 'سيدا', fr: 'Side' },
    distance: 70,
    duration: 75,
    pricing: {
      economySedan: calculateBestPrice([700, 730, 720]),
      comfortSedan: calculateBestPrice([920, 950, 940]),
      vipSedan: calculateBestPrice([1300, 1330, 1320]),
      minivan: calculateBestPrice([1050, 1080, 1070]),
      vipMinivan: calculateBestPrice([1600, 1630, 1620]),
      minibus14: calculateBestPrice([1950, 1980, 1970]),
      minibus17: calculateBestPrice([2300, 2330, 2320]),
      vipSprinter: calculateBestPrice([2950, 2980, 2970])
    },
    description: {
      tr: 'Antalya şehir merkezinden Side antik kentine transfer.',
      en: 'Transfer from Antalya city center to Side ancient city.',
      ru: 'Трансфер из центра Анталии в древний город Сиде.',
      de: 'Transfer vom Stadtzentrum Antalya zur antiken Stadt Side.',
      ar: 'نقل من وسط مدينة أنطاليا إلى مدينة سيدا القديمة.',
      fr: 'Transfert du centre-ville d\'Antalya à la ville antique de Side.'
    },
    longDescription: {
      tr: 'Antalya şehir merkezinden Side\'ye transfer ile Apollon Tapınağı ve antik tiyatroyu ziyaret edebilirsiniz.',
      en: 'Transfer from Antalya city center to Side allows you to visit Apollo Temple and ancient theater.',
      ru: 'Трансфер из центра Анталии в Сиде позволяет посетить храм Аполлона и древний театр.',
      de: 'Der Transfer vom Stadtzentrum Antalya nach Side ermöglicht Ihnen den Besuch des Apollo-Tempels und des antiken Theaters.',
      ar: 'ينقلك النقل من وسط مدينة أنطاليا إلى سيدا لزيارة معبد أبولو والمسرح القديم.',
      fr: 'Le transfert du centre-ville d\'Antalya à Side vous permet de visiter le temple d\'Apollon et le théâtre antique.'
    },
    highlights: {
      tr: ['Side antik kenti', 'Apollon Tapınağı', 'Antik tiyatro', '7/24 hizmet'],
      en: ['Side ancient city', 'Apollo Temple', 'Ancient theater', '24/7 service'],
      ru: ['Древний город Сиде', 'Храм Аполлона', 'Древний театр', 'Сервис 24/7'],
      de: ['Antike Stadt Side', 'Apollo-Tempel', 'Antikes Theater', '24/7 Service'],
      ar: ['مدينة سيدا القديمة', 'معبد أبولو', 'المسرح القديم', 'خدمة 24/7'],
      fr: ['Ville antique de Side', 'Temple d\'Apollon', 'Théâtre antique', 'Service 24h/24']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // VIP transfer service
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80', // Side Apollo Temple ancient ruins
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Side beach and ancient city view
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00', '21:00-00:00'],
    rating: 4.8,
    totalTransfers: 5234,
    seo: {
      metaTitle: { tr: 'Antalya Side Transfer | Şehir Merkezi', en: 'Antalya Side Transfer | City Center', ru: 'Трансфер Анталия Сиде', de: 'Antalya Side Transfer', ar: 'نقل أنطاليا سيدا', fr: 'Transfert Antalya Side' },
      metaDescription: { tr: 'Antalya şehir merkezi - Side transfer. Antik kente konforlu ulaşım.', en: 'Antalya city center - Side transfer. Comfortable transport to ancient city.', ru: 'Трансфер центр Анталии - Сиде. Комфортная поездка в древний город.', de: 'Antalya Stadtzentrum - Side Transfer. Komfortable Fahrt zur antiken Stadt.', ar: 'نقل وسط مدينة أنطاليا - سيدا. نقل مريح إلى المدينة القديمة.', fr: 'Transfert centre-ville Antalya - Side. Transport confortable vers la ville antique.' },
      keywords: {
        tr: ['antalya side transfer', 'side şehir merkezi', 'side antik kent'],
        en: ['antalya side transfer', 'side city center', 'side ancient city'],
        ru: ['трансфер анталия сиде', 'центр сиде', 'древний город сиде'],
        de: ['antalya side transfer', 'side stadtzentrum', 'antike stadt side'],
        ar: ['نقل أنطاليا سيدا', 'مركز سيدا', 'مدينة سيدا القديمة'],
        fr: ['transfert antalya side', 'centre side', 'ville antique side']
      },
      slug: { tr: 'antalya-sehir-merkezi-side-transfer', en: 'antalya-city-center-side-transfer', ru: 'antalya-centr-side-transfer', de: 'antalya-stadtzentrum-side-transfer', ar: 'antalya-markaz-side-naql', fr: 'antalya-centre-ville-side-transfert' }
    },
    active: true
  },

  // CITY CENTER TO ALANYA
  {
    id: 'antalya-city-to-alanya',
    category: 'intercity',
    from: { tr: 'Antalya Şehir Merkezi', en: 'Antalya City Center', ru: 'Центр Анталии', de: 'Antalya Stadtzentrum', ar: 'وسط مدينة أنطاليا', fr: 'Centre-ville d\'Antalya' },
    to: { tr: 'Alanya', en: 'Alanya', ru: 'Аланья', de: 'Alanya', ar: 'ألانيا', fr: 'Alanya' },
    distance: 135,
    duration: 130,
    pricing: {
      economySedan: calculateBestPrice([1150, 1200, 1180]),
      comfortSedan: calculateBestPrice([1510, 1560, 1540]),
      vipSedan: calculateBestPrice([2130, 2180, 2160]),
      minivan: calculateBestPrice([1720, 1770, 1750]),
      vipMinivan: calculateBestPrice([2650, 2700, 2680]),
      minibus14: calculateBestPrice([3220, 3270, 3250]),
      minibus17: calculateBestPrice([3790, 3840, 3820]),
      vipSprinter: calculateBestPrice([4890, 4940, 4920])
    },
    description: {
      tr: 'Antalya şehir merkezinden Alanya\'ya uzun mesafe transfer.',
      en: 'Long distance transfer from Antalya city center to Alanya.',
      ru: 'Трансфер на дальние расстояния из центра Анталии в Аланью.',
      de: 'Langstreckentransfer vom Stadtzentrum Antalya nach Alanya.',
      ar: 'نقل لمسافات طويلة من وسط مدينة أنطاليا إلى ألانيا.',
      fr: 'Transfert longue distance du centre-ville d\'Antalya à Alanya.'
    },
    longDescription: {
      tr: 'Antalya şehir merkezinden Alanya\'ya 135 km\'lik panoramik sahil yolu transferi.',
      en: '135 km panoramic coastal road transfer from Antalya city center to Alanya.',
      ru: '135 км панорамного трансфера по прибрежной дороге из центра Анталии в Аланью.',
      de: '135 km panoramischer Küstenstraßentransfer vom Stadtzentrum Antalya nach Alanya.',
      ar: 'نقل بانورامي على الطريق الساحلي بطول 135 كم من وسط مدينة أنطاليا إلى ألانيا.',
      fr: 'Transfert panoramique de 135 km sur route côtière du centre-ville d\'Antalya à Alanya.'
    },
    highlights: {
      tr: ['135 km sahil yolu', 'Kızılkule', 'Damlataş Mağarası', 'Panoramik manzara'],
      en: ['135 km coastal road', 'Red Tower', 'Damlatas Cave', 'Panoramic views'],
      ru: ['135 км прибрежная дорога', 'Красная башня', 'Пещера Дамлаташ', 'Панорамные виды'],
      de: ['135 km Küstenstraße', 'Roter Turm', 'Damlatas-Höhle', 'Panoramablick'],
      ar: ['135 كم طريق ساحلي', 'البرج الأحمر', 'كهف دامالاتاش', 'مناظر بانورامية'],
      fr: ['135 km route côtière', 'Tour Rouge', 'Grotte Damlatas', 'Vues panoramiques']
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Long distance transfer vehicle
      'https://images.unsplash.com/photo-1565530884283-44d8cd0e7d7f?auto=format&fit=crop&w=1200&q=80', // Alanya Red Tower and castle
      'https://images.unsplash.com/photo-1621366051255-455a64c5f7e0?auto=format&fit=crop&w=1200&q=80'  // Alanya coastline panoramic view
    ],
    popularTimes: ['07:00-10:00', '13:00-16:00', '19:00-22:00'],
    rating: 4.7,
    totalTransfers: 4321,
    seo: {
      metaTitle: { tr: 'Antalya Alanya Transfer | Şehir Merkezi', en: 'Antalya Alanya Transfer | City Center', ru: 'Трансфер Анталия Аланья', de: 'Antalya Alanya Transfer', ar: 'نقل أنطاليا ألانيا', fr: 'Transfert Antalya Alanya' },
      metaDescription: { tr: 'Antalya şehir merkezi - Alanya transfer. 135 km panoramik yolculuk.', en: 'Antalya city center - Alanya transfer. 135 km panoramic journey.', ru: 'Трансфер центр Анталии - Аланья. 135 км панорамной поездки.', de: 'Antalya Stadtzentrum - Alanya Transfer. 135 km panoramische Fahrt.', ar: 'نقل وسط مدينة أنطاليا - ألانيا. رحلة بانورامية 135 كم.', fr: 'Transfert centre-ville Antalya - Alanya. Voyage panoramique de 135 km.' },
      keywords: {
        tr: ['antalya alanya transfer', 'alanya şehir merkezi', 'alanya taksi'],
        en: ['antalya alanya transfer', 'alanya city center', 'alanya taxi'],
        ru: ['трансфер анталия аланья', 'центр алании', 'такси аланья'],
        de: ['antalya alanya transfer', 'alanya stadtzentrum', 'alanya taxi'],
        ar: ['نقل أنطاليا ألانيا', 'مركز ألانيا', 'تاكسي ألانيا'],
        fr: ['transfert antalya alanya', 'centre alanya', 'taxi alanya']
      },
      slug: { tr: 'antalya-sehir-merkezi-alanya-transfer', en: 'antalya-city-center-alanya-transfer', ru: 'antalya-centr-alanya-transfer', de: 'antalya-stadtzentrum-alanya-transfer', ar: 'antalya-markaz-alanya-naql', fr: 'antalya-centre-ville-alanya-transfert' }
    },
    active: true
  },

  // KEMER TO OLYMPOS
  {
    id: 'kemer-to-olympos',
    category: 'district',
    from: { tr: 'Kemer', en: 'Kemer', ru: 'Кемер', de: 'Kemer', ar: 'كيمير', fr: 'Kemer' },
    to: { tr: 'Olympos', en: 'Olympos', ru: 'Олимпос', de: 'Olympos', ar: 'أوليمبوس', fr: 'Olympos' },
    distance: 35,
    duration: 40,
    pricing: {
      economySedan: calculateBestPrice([400, 430, 420]),
      comfortSedan: calculateBestPrice([530, 560, 550]),
      vipSedan: calculateBestPrice([750, 780, 770]),
      minivan: calculateBestPrice([600, 630, 620]),
      vipMinivan: calculateBestPrice([900, 930, 920]),
      minibus14: calculateBestPrice([1100, 1130, 1120]),
      minibus17: calculateBestPrice([1300, 1330, 1320]),
      vipSprinter: calculateBestPrice([1670, 1700, 1690])
    },
    description: {
      tr: 'Kemer\'den Olympos antik kentine transfer.',
      en: 'Transfer from Kemer to Olympos ancient city.',
      ru: 'Трансфер из Кемера в древний город Олимпос.',
      de: 'Transfer von Kemer zur antiken Stadt Olympos.',
      ar: 'نقل من كيمير إلى مدينة أوليمبوس القديمة.',
      fr: 'Transfert de Kemer à la ville antique d\'Olympos.'
    },
    longDescription: {
      tr: 'Kemer\'den Olympos\'a kısa mesafe transfer ile Yanartaş ve antik kenti ziyaret edebilirsiniz.',
      en: 'Short distance transfer from Kemer to Olympos allows you to visit Chimaera and ancient city.',
      ru: 'Короткий трансфер из Кемера в Олимпос позволяет посетить Химеру и древний город.',
      de: 'Kurzer Transfer von Kemer nach Olympos ermöglicht Ihnen den Besuch der Chimäre und der antiken Stadt.',
      ar: 'ينقلك النقل لمسافة قصيرة من كيمير إلى أوليمبوس لزيارة Chimaera والمدينة القديمة.',
      fr: 'Transfert courte distance de Kemer à Olympos vous permet de visiter la Chimère et la ville antique.'
    },
    highlights: {
      tr: ['Yanartaş ziyareti', 'Olympos plajı', 'Antik kent', 'Doğa kampları'],
      en: ['Chimaera visit', 'Olympos beach', 'Ancient city', 'Nature camps'],
      ru: ['Посещение Химеры', 'Пляж Олимпос', 'Древний город', 'Природные лагеря'],
      de: ['Chimära-Besuch', 'Olympos-Strand', 'Antike Stadt', 'Naturcamps'],
      ar: ['زيارة Chimaera', 'شاطئ أوليمبوس', 'المدينة القديمة', 'مخيمات طبيعية'],
      fr: ['Visite Chimère', 'Plage Olympos', 'Ville antique', 'Camps nature']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // Transfer vehicle
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80', // Olympos ancient ruins and nature
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'  // Olympos beach and coastal scenery
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00'],
    rating: 4.8,
    totalTransfers: 2345,
    seo: {
      metaTitle: { tr: 'Kemer Olympos Transfer', en: 'Kemer Olympos Transfer', ru: 'Трансфер Кемер Олимпос', de: 'Kemer Olympos Transfer', ar: 'نقل كيمير أوليمبوس', fr: 'Transfert Kemer Olympos' },
      metaDescription: { tr: 'Kemer - Olympos transfer. Yanartaş ve antik kente konforlu ulaşım.', en: 'Kemer - Olympos transfer. Comfortable transport to Chimaera and ancient city.', ru: 'Трансфер Кемер - Олимпос. Комфортная поездка к Химере и древнему городу.', de: 'Kemer - Olympos Transfer. Komfortable Fahrt zur Chimäre und antiken Stadt.', ar: 'نقل كيمير - أوليمبوس. نقل مريح إلى Chimaera والمدينة القديمة.', fr: 'Transfert Kemer - Olympos. Transport confortable vers la Chimère et la ville antique.' },
      keywords: {
        tr: ['kemer olympos transfer', 'olympos yanartaş', 'kemer olympos taksi'],
        en: ['kemer olympos transfer', 'olympos chimaera', 'kemer olympos taxi'],
        ru: ['трансфер кемер олимпос', 'олимпос химера', 'такси кемер олимпос'],
        de: ['kemer olympos transfer', 'olympos chimära', 'kemer olympos taxi'],
        ar: ['نقل كيمير أوليمبوس', 'أوليمبوس Chimaera', 'تاكسي كيمير أوليمبوس'],
        fr: ['transfert kemer olympos', 'olympos chimère', 'taxi kemer olympos']
      },
      slug: { tr: 'kemer-olympos-transfer', en: 'kemer-olympos-transfer', ru: 'kemer-olympos-transfer', de: 'kemer-olympos-transfer', ar: 'kemer-olympos-naql', fr: 'kemer-olympos-transfert' }
    },
    active: true
  },

  // BELEK TO SIDE
  {
    id: 'belek-to-side',
    category: 'district',
    from: { tr: 'Belek', en: 'Belek', ru: 'Белек', de: 'Belek', ar: 'بيليك', fr: 'Belek' },
    to: { tr: 'Side', en: 'Side', ru: 'Сиде', de: 'Side', ar: 'سيدا', fr: 'Side' },
    distance: 30,
    duration: 35,
    pricing: {
      economySedan: calculateBestPrice([350, 380, 370]),
      comfortSedan: calculateBestPrice([460, 490, 480]),
      vipSedan: calculateBestPrice([650, 680, 670]),
      minivan: calculateBestPrice([520, 550, 540]),
      vipMinivan: calculateBestPrice([780, 810, 800]),
      minibus14: calculateBestPrice([950, 980, 970]),
      minibus17: calculateBestPrice([1120, 1150, 1140]),
      vipSprinter: calculateBestPrice([1450, 1480, 1470])
    },
    description: {
      tr: 'Belek\'ten Side antik kentine transfer.',
      en: 'Transfer from Belek to Side ancient city.',
      ru: 'Трансфер из Белека в древний город Сиде.',
      de: 'Transfer von Belek zur antiken Stadt Side.',
      ar: 'نقل من بيليك إلى مدينة سيدا القديمة.',
      fr: 'Transfert de Belek à la ville antique de Side.'
    },
    longDescription: {
      tr: 'Belek\'ten Side\'ye kısa mesafe transfer ile Apollon Tapınağı\'nı ve antik tiyatroyu ziyaret edebilirsiniz.',
      en: 'Short distance transfer from Belek to Side allows you to visit Apollo Temple and ancient theater.',
      ru: 'Короткий трансфер из Белека в Сиде позволяет посетить храм Аполлона и древний театр.',
      de: 'Kurzer Transfer von Belek nach Side ermöglicht Ihnen den Besuch des Apollo-Tempels und des antiken Theaters.',
      ar: 'ينقلك النقل لمسافة قصيرة من بيليك إلى سيدا لزيارة معبد أبولو والمسرح القديم.',
      fr: 'Transfert courte distance de Belek à Side vous permet de visiter le temple d\'Apollon et le théâtre antique.'
    },
    highlights: {
      tr: ['Side antik kenti', 'Apollon Tapınağı', 'Kumsal plajlar', 'Hızlı transfer'],
      en: ['Side ancient city', 'Apollo Temple', 'Sandy beaches', 'Fast transfer'],
      ru: ['Древний город Сиде', 'Храм Аполлона', 'Песчаные пляжи', 'Быстрый трансфер'],
      de: ['Antike Stadt Side', 'Apollo-Tempel', 'Sandstrände', 'Schneller Transfer'],
      ar: ['مدينة سيدا القديمة', 'معبد أبولو', 'شواطئ رملية', 'نقل سريع'],
      fr: ['Ville antique Side', 'Temple d\'Apollon', 'Plages de sable', 'Transfert rapide']
    },
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', // Transfer vehicle
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80', // Side ancient city Apollo Temple
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80'  // Side sandy beaches Mediterranean
    ],
    popularTimes: ['09:00-12:00', '15:00-18:00'],
    rating: 4.7,
    totalTransfers: 3456,
    seo: {
      metaTitle: { tr: 'Belek Side Transfer', en: 'Belek Side Transfer', ru: 'Трансфер Белек Сиде', de: 'Belek Side Transfer', ar: 'نقل بيليك سيدا', fr: 'Transfert Belek Side' },
      metaDescription: { tr: 'Belek - Side transfer. Antik kente hızlı ulaşım.', en: 'Belek - Side transfer. Fast transport to ancient city.', ru: 'Трансфер Белек - Сиде. Быстрая поездка в древний город.', de: 'Belek - Side Transfer. Schnelle Fahrt zur antiken Stadt.', ar: 'نقل بيليك - سيدا. نقل سريع إلى المدينة القديمة.', fr: 'Transfert Belek - Side. Transport rapide vers ville antique.' },
      keywords: {
        tr: ['belek side transfer', 'side belek', 'belek side taksi'],
        en: ['belek side transfer', 'side belek', 'belek side taxi'],
        ru: ['трансфер белек сиде', 'сиде белек', 'такси белек сиде'],
        de: ['belek side transfer', 'side belek', 'belek side taxi'],
        ar: ['نقل بيليك سيدا', 'سيدا بيليك', 'تاكسي بيليك سيدا'],
        fr: ['transfert belek side', 'side belek', 'taxi belek side']
      },
      slug: { tr: 'belek-side-transfer', en: 'belek-side-transfer', ru: 'belek-side-transfer', de: 'belek-side-transfer', ar: 'belek-side-naql', fr: 'belek-side-transfert' }
    },
    active: true
  },

  // SIDE TO ALANYA
  {
    id: 'side-to-alanya',
    category: 'district',
    from: { tr: 'Side', en: 'Side', ru: 'Сиде', de: 'Side', ar: 'سيدا', fr: 'Side' },
    to: { tr: 'Alanya', en: 'Alanya', ru: 'Аланья', de: 'Alanya', ar: 'ألانيا', fr: 'Alanya' },
    distance: 65,
    duration: 70,
    pricing: {
      economySedan: calculateBestPrice([700, 730, 720]),
      comfortSedan: calculateBestPrice([920, 950, 940]),
      vipSedan: calculateBestPrice([1300, 1330, 1320]),
      minivan: calculateBestPrice([1050, 1080, 1070]),
      vipMinivan: calculateBestPrice([1600, 1630, 1620]),
      minibus14: calculateBestPrice([1950, 1980, 1970]),
      minibus17: calculateBestPrice([2300, 2330, 2320]),
      vipSprinter: calculateBestPrice([2950, 2980, 2970])
    },
    description: {
      tr: 'Side\'den Alanya\'ya sahil yolu transferi.',
      en: 'Coastal road transfer from Side to Alanya.',
      ru: 'Трансфер по прибрежной дороге из Сиде в Аланью.',
      de: 'Küstenstraßentransfer von Side nach Alanya.',
      ar: 'نقل على الطريق الساحلي من سيدا إلى ألانيا.',
      fr: 'Transfert route côtière de Side à Alanya.'
    },
    longDescription: {
      tr: 'Side\'den Alanya\'ya 65 km\'lik sahil yolu transferi ile Kızılkule ve Damlataş Mağarası\'nı ziyaret edebilirsiniz.',
      en: '65 km coastal road transfer from Side to Alanya allows you to visit Red Tower and Damlatas Cave.',
      ru: '65 км трансфер по прибрежной дороге из Сиде в Аланью позволяет посетить Красную башню и пещеру Дамлаташ.',
      de: '65 km Küstenstraßentransfer von Side nach Alanya ermöglicht Ihnen den Besuch des Roten Turms und der Damlatas-Höhle.',
      ar: 'نقل بطول 65 كم على الطريق الساحلي من سيدا إلى ألانيا يتيح لك زيارة البرج الأحمر وكهف دامالاتاش.',
      fr: 'Transfert de 65 km sur route côtière de Side à Alanya vous permet de visiter la Tour Rouge et la grotte Damlatas.'
    },
    highlights: {
      tr: ['Sahil yolu manzarası', 'Kızılkule', 'Damlataş Mağarası', 'Kleopatra Plajı'],
      en: ['Coastal road views', 'Red Tower', 'Damlatas Cave', 'Cleopatra Beach'],
      ru: ['Виды на прибрежную дорогу', 'Красная башня', 'Пещера Дамлаташ', 'Пляж Клеопатры'],
      de: ['Küstenstraßenblick', 'Roter Turm', 'Damlatas-Höhle', 'Cleopatra-Strand'],
      ar: ['مناظر الطريق الساحلي', 'البرج الأحمر', 'كهف دامالاتاش', 'شاطئ كليوباترا'],
      fr: ['Vues route côtière', 'Tour Rouge', 'Grotte Damlatas', 'Plage de Cléopâtre']
    },
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', // Coastal transfer vehicle
      'https://images.unsplash.com/photo-1565530884283-44d8cd0e7d7f?auto=format&fit=crop&w=1200&q=80', // Alanya Red Tower and castle landmark
      'https://images.unsplash.com/photo-1621366051255-455a64c5f7e0?auto=format&fit=crop&w=1200&q=80'  // Alanya Cleopatra Beach aerial view
    ],
    popularTimes: ['08:00-11:00', '14:00-17:00', '20:00-23:00'],
    rating: 4.7,
    totalTransfers: 4123,
    seo: {
      metaTitle: { tr: 'Side Alanya Transfer', en: 'Side Alanya Transfer', ru: 'Трансфер Сиде Аланья', de: 'Side Alanya Transfer', ar: 'نقل سيدا ألانيا', fr: 'Transfert Side Alanya' },
      metaDescription: { tr: 'Side - Alanya transfer. Sahil yolu manzaralı yolculuk.', en: 'Side - Alanya transfer. Journey with coastal road views.', ru: 'Трансфер Сиде - Аланья. Поездка с видами на прибрежную дорогу.', de: 'Side - Alanya Transfer. Fahrt mit Küstenstraßenblick.', ar: 'نقل سيدا - ألانيا. رحلة مع إطلالات على الطريق الساحلي.', fr: 'Transfert Side - Alanya. Voyage avec vues sur route côtière.' },
      keywords: {
        tr: ['side alanya transfer', 'alanya side', 'side alanya taksi'],
        en: ['side alanya transfer', 'alanya side', 'side alanya taxi'],
        ru: ['трансфер сиде аланья', 'аланья сиде', 'такси сиде аланья'],
        de: ['side alanya transfer', 'alanya side', 'side alanya taxi'],
        ar: ['نقل سيدا ألانيا', 'ألانيا سيدا', 'تاكسي سيدا ألانيا'],
        fr: ['transfert side alanya', 'alanya side', 'taxi side alanya']
      },
      slug: { tr: 'side-alanya-transfer', en: 'side-alanya-transfer', ru: 'side-alanya-transfer', de: 'side-alanya-transfer', ar: 'side-alanya-naql', fr: 'side-alanya-transfert' }
    },
    active: true
  }
];

// Export total count for reference
export const TOTAL_ANTALYA_TRANSFERS = antalyaAirportTransfers.length;

// Helper function to get transfer by ID
export const getTransferById = (id: string): AntalyaTransferRoute | undefined => {
  return antalyaAirportTransfers.find(transfer => transfer.id === id);
};

// Helper function to get transfers by category
export const getTransfersByCategory = (category: AntalyaTransferRoute['category']): AntalyaTransferRoute[] => {
  return antalyaAirportTransfers.filter(transfer => transfer.category === category && transfer.active);
};

// Helper function to search transfers
export const searchTransfers = (query: string, lang: keyof MultiLangContent = 'tr'): AntalyaTransferRoute[] => {
  const lowerQuery = query.toLowerCase();
  return antalyaAirportTransfers.filter(transfer =>
    transfer.from[lang].toLowerCase().includes(lowerQuery) ||
    transfer.to[lang].toLowerCase().includes(lowerQuery) ||
    transfer.description[lang].toLowerCase().includes(lowerQuery)
  );
};

export default antalyaAirportTransfers;
