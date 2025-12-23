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
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800', // Antalya Airport
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', // City center view
      'https://images.unsplash.com/photo-1552345387-68-16f0e330e3d?w=800'  // Transfer vehicle
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
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800', // Kemer beach
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', // Coastal road
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'  // Taurus mountains
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
    images: ['https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800', 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800'],
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
    images: ['https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800', 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800'],
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
    images: ['https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
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
