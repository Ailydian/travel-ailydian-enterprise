/**
 * Multilingual Antalya Tours Data
 * 6 Languages: TR, EN, RU, DE, AR, FR
 * With Advanced SEO and Competitor Price Analysis
 */

import type { SupportedLanguage } from '@/utils/multilingualSEO';

// Multilingual text interface
interface MultiLangText {
  tr: string;
  en: string;
  ru: string;
  de: string;
  ar: string;
  fr: string;
}

// Tour price structure
interface TourPrice {
  travelLyDian: number;
  competitors: {
    getYourGuide: number;
    viator: number;
    tripAdvisor: number;
  };
  savings: number;
  savingsPercentage: number;
}

// Multilingual tour interface
export interface MultilingualTour {
  id: string;
  category: 'boat' | 'adventure' | 'cultural' | 'daily' | 'multi-day';
  name: MultiLangText;
  description: MultiLangText;
  longDescription: MultiLangText;
  pricing: TourPrice;
  duration: MultiLangText;
  difficulty: MultiLangText;
  minAge: number;
  maxGroupSize: number;
  included: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  excluded: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  meetingPoint: MultiLangText;
  cancellationPolicy: MultiLangText;
  highlights: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  images: string[];
  rating: number;
  reviewCount: number;
  availability: {
    tr: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
    fr: string[];
  };
  seo: {
    metaTitle: MultiLangText;
    metaDescription: MultiLangText;
    keywords: {
      tr: string[];
      en: string[];
      ru: string[];
      de: string[];
      ar: string[];
      fr: string[];
    };
    slug: MultiLangText;
  };
  active: boolean;
}

// Helper function for best price calculation
const calculateBestPrice = (competitorPrices: number[]): TourPrice => {
  const avgCompetitorPrice = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
  const ourPrice = Math.floor(avgCompetitorPrice * 0.88); // 12% cheaper
  const savings = avgCompetitorPrice - ourPrice;
  const savingsPercentage = Math.round((savings / avgCompetitorPrice) * 100);

  return {
    travelLyDian: ourPrice,
    competitors: {
      getYourGuide: competitorPrices[0],
      viator: competitorPrices[1],
      tripAdvisor: competitorPrices[2],
    },
    savings: Math.round(savings),
    savingsPercentage,
  };
};

// Multilingual Tours Data
export const antalyaToursMultilingual: MultilingualTour[] = [
  // BOAT TOUR 1: 3 Islands Boat Tour
  {
    id: 'antalya-boat-tour-001',
    category: 'boat',
    name: {
      tr: 'Antalya Tekne Turu - 3 Adalar',
      en: 'Antalya Boat Tour - 3 Islands',
      ru: 'Морская Экскурсия Анталья - 3 Острова',
      de: 'Antalya Bootstour - 3 Inseln',
      ar: 'جولة القارب أنطاليا - 3 جزر',
      fr: 'Tour en Bateau Antalya - 3 Îles'
    },
    description: {
      tr: 'Akdeniz\'in turkuaz sularında eşsiz bir gün. Kemer, Phaselis ve üç muhteşem ada ile snorkeling deneyimi.',
      en: 'An unforgettable day in the turquoise waters of the Mediterranean. Kemer, Phaselis and three magnificent islands with snorkeling experience.',
      ru: 'Незабываемый день в бирюзовых водах Средиземного моря. Кемер, Фаселис и три великолепных острова со снорклингом.',
      de: 'Ein unvergesslicher Tag im türkisfarbenen Wasser des Mittelmeers. Kemer, Phaselis und drei herrliche Inseln mit Schnorchelerlebnis.',
      ar: 'يوم لا يُنسى في المياه الفيروزية للبحر الأبيض المتوسط. كيمير وفاسيليس وثلاث جزر رائعة مع تجربة الغطس.',
      fr: 'Une journée inoubliable dans les eaux turquoise de la Méditerranée. Kemer, Phaselis et trois îles magnifiques avec expérience de snorkeling.'
    },
    longDescription: {
      tr: 'Antalya\'nın eşsiz kıyı şeridinde unutulmaz bir tekne turu deneyimi sizi bekliyor. Sabah otel transferi ile başlayan turumuzda, önce tarihi Phaselis antik kentinin kıyılarına demir atacağız. Burada hem yüzme hem de antik kalıntıları keşfetme fırsatı bulacaksınız.\n\nÖğleden sonra ise üç muhteşem adayı ziyaret edeceğiz: Kekova bölgesindeki batık şehir, berrak suları ve zengin deniz yaşamı ile ünlü snorkeling noktaları. Teknemizde profesyonel rehberimiz size bölgenin tarihi ve doğal güzellikleri hakkında bilgi verecek.\n\nÖğle yemeği olarak açık büfe servis edilecek, sınırsız alkolsüz içecekler dahildir. Yüzme molaları sırasında snorkeling ekipmanı ücretsiz olarak sağlanır. Günbatımı manzarası eşliğinde limana dönerken, Akdeniz\'in büyüleyici atmosferini son kez yaşayacaksınız.',
      en: 'An unforgettable boat tour experience awaits you on Antalya\'s unique coastline. Starting with a morning hotel transfer, we will first anchor at the shores of the historic ancient city of Phaselis. Here you will have the opportunity to both swim and explore ancient ruins.\n\nIn the afternoon, we will visit three magnificent islands: the sunken city in the Kekova region, famous snorkeling spots with crystal clear waters and rich marine life. Our professional guide on the boat will inform you about the history and natural beauties of the region.\n\nOpen buffet lunch will be served, unlimited soft drinks are included. Snorkeling equipment is provided free of charge during swimming breaks. While returning to the port with the sunset view, you will experience the fascinating atmosphere of the Mediterranean one last time.',
      ru: 'Незабываемое путешествие на лодке ждет вас на уникальном побережье Антальи. Начиная с утреннего трансфера из отеля, мы сначала бросим якорь у берегов исторического древнего города Фаселис. Здесь у вас будет возможность как поплавать, так и исследовать древние руины.\n\nВо второй половине дня мы посетим три великолепных острова: затонувший город в регионе Кекова, знаменитые места для снорклинга с кристально чистой водой и богатой морской жизнью. Наш профессиональный гид на лодке расскажет вам об истории и природных красотах региона.\n\nБудет подан обед "шведский стол", безалкогольные напитки включены без ограничений. Оборудование для снорклинга предоставляется бесплатно во время купания. Возвращаясь в порт с видом на закат, вы в последний раз испытаете очаровательную атмосферу Средиземного моря.',
      de: 'Ein unvergessliches Bootserlebnis erwartet Sie an Antalyas einzigartiger Küste. Beginnend mit einem morgendlichen Hoteltransfer werden wir zunächst an den Ufern der historischen antiken Stadt Phaselis ankern. Hier haben Sie die Möglichkeit, sowohl zu schwimmen als auch antike Ruinen zu erkunden.\n\nAm Nachmittag besuchen wir drei herrliche Inseln: die versunkene Stadt in der Kekova-Region, berühmte Schnorchelplätze mit kristallklarem Wasser und reichem Meeresleben. Unser professioneller Führer auf dem Boot wird Sie über die Geschichte und natürliche Schönheiten der Region informieren.\n\nOffenes Buffet-Mittagessen wird serviert, unbegrenzte alkoholfreie Getränke sind inbegriffen. Schnorchelausrüstung wird während der Schwimmpausen kostenlos zur Verfügung gestellt. Während der Rückfahrt zum Hafen mit Sonnenuntergang werden Sie die faszinierende Atmosphäre des Mittelmeers ein letztes Mal erleben.',
      ar: 'تنتظرك تجربة رحلة بحرية لا تُنسى على الساحل الفريد لأنطاليا. بدءًا من نقل صباحي من الفندق، سنرسو أولاً على شواطئ مدينة فاسيليس القديمة التاريخية. هنا ستتاح لك الفرصة للسباحة واستكشاف الآثار القديمة.\n\nفي فترة ما بعد الظهر، سنزور ثلاث جزر رائعة: المدينة الغارقة في منطقة كيكوفا، وأماكن الغطس الشهيرة بمياهها الصافية والحياة البحرية الغنية. سيطلعك دليلنا المحترف على متن القارب على تاريخ المنطقة وجمالها الطبيعي.\n\nسيتم تقديم غداء بوفيه مفتوح، والمشروبات غير الكحولية غير محدودة. يتم توفير معدات الغطس مجانًا أثناء فترات السباحة. أثناء العودة إلى الميناء مع منظر غروب الشمس، ستختبر الأجواء الساحرة للبحر الأبيض المتوسط للمرة الأخيرة.',
      fr: 'Une expérience de tour en bateau inoubliable vous attend sur le littoral unique d\'Antalya. En commençant par un transfert matinal depuis l\'hôtel, nous jetterons d\'abord l\'ancre sur les rives de l\'ancienne ville historique de Phaselis. Ici, vous aurez l\'opportunité de nager et d\'explorer les ruines antiques.\n\nDans l\'après-midi, nous visiterons trois îles magnifiques : la ville engloutie dans la région de Kekova, des spots de snorkeling célèbres avec des eaux cristallines et une vie marine riche. Notre guide professionnel sur le bateau vous informera sur l\'histoire et les beautés naturelles de la région.\n\nUn déjeuner buffet ouvert sera servi, les boissons non alcoolisées sont incluses sans limite. L\'équipement de snorkeling est fourni gratuitement pendant les pauses baignade. En retournant au port avec la vue du coucher de soleil, vous vivrez l\'atmosphère fascinante de la Méditerranée une dernière fois.'
    },
    pricing: calculateBestPrice([950, 1000, 980]),
    duration: {
      tr: '7 saat',
      en: '7 hours',
      ru: '7 часов',
      de: '7 Stunden',
      ar: '7 ساعات',
      fr: '7 heures'
    },
    difficulty: {
      tr: 'Kolay',
      en: 'Easy',
      ru: 'Легкий',
      de: 'Einfach',
      ar: 'سهل',
      fr: 'Facile'
    },
    minAge: 0,
    maxGroupSize: 85,
    included: {
      tr: [
        'Otel transfer (Antalya merkez, Kemer, Belek)',
        'Açık büfe öğle yemeği',
        'Sınırsız soft drink',
        'Snorkeling ekipmanı',
        'Profesyonel İngilizce/Türkçe rehber',
        'Sigorta',
        'Tekne kullanım ücreti'
      ],
      en: [
        'Hotel transfer (Antalya center, Kemer, Belek)',
        'Open buffet lunch',
        'Unlimited soft drinks',
        'Snorkeling equipment',
        'Professional English/Turkish guide',
        'Insurance',
        'Boat usage fee'
      ],
      ru: [
        'Трансфер из отеля (центр Антальи, Кемер, Белек)',
        'Обед шведский стол',
        'Безалкогольные напитки без ограничений',
        'Оборудование для снорклинга',
        'Профессиональный гид (английский/турецкий)',
        'Страхование',
        'Плата за использование лодки'
      ],
      de: [
        'Hoteltransfer (Antalya Zentrum, Kemer, Belek)',
        'Offenes Buffet-Mittagessen',
        'Unbegrenzte alkoholfreie Getränke',
        'Schnorchelausrüstung',
        'Professioneller englisch/türkischer Führer',
        'Versicherung',
        'Bootsnutzungsgebühr'
      ],
      ar: [
        'نقل من الفندق (وسط أنطاليا، كيمير، بيليك)',
        'غداء بوفيه مفتوح',
        'مشروبات غير كحولية غير محدودة',
        'معدات الغطس',
        'مرشد محترف (إنجليزي/تركي)',
        'تأمين',
        'رسوم استخدام القارب'
      ],
      fr: [
        'Transfert hôtel (centre d\'Antalya, Kemer, Belek)',
        'Déjeuner buffet ouvert',
        'Boissons non alcoolisées illimitées',
        'Équipement de snorkeling',
        'Guide professionnel anglais/turc',
        'Assurance',
        'Frais d\'utilisation du bateau'
      ]
    },
    excluded: {
      tr: [
        'Alkollü içecekler',
        'Kişisel harcamalar',
        'Fotoğraf/video hizmetleri',
        'Ek su sporları aktiviteleri'
      ],
      en: [
        'Alcoholic beverages',
        'Personal expenses',
        'Photo/video services',
        'Additional water sports activities'
      ],
      ru: [
        'Алкогольные напитки',
        'Личные расходы',
        'Фото/видео услуги',
        'Дополнительные водные виды спорта'
      ],
      de: [
        'Alkoholische Getränke',
        'Persönliche Ausgaben',
        'Foto-/Videoservices',
        'Zusätzliche Wassersportaktivitäten'
      ],
      ar: [
        'المشروبات الكحولية',
        'النفقات الشخصية',
        'خدمات التصوير الفوتوغرافي/الفيديو',
        'أنشطة رياضية مائية إضافية'
      ],
      fr: [
        'Boissons alcoolisées',
        'Dépenses personnelles',
        'Services photo/vidéo',
        'Activités nautiques supplémentaires'
      ]
    },
    meetingPoint: {
      tr: 'Antalya Marina - Otel transferi dahil',
      en: 'Antalya Marina - Hotel transfer included',
      ru: 'Марина Анталья - Включен трансфер из отеля',
      de: 'Antalya Marina - Hoteltransfer inbegriffen',
      ar: 'مرسى أنطاليا - يشمل النقل من الفندق',
      fr: 'Marina d\'Antalya - Transfert hôtel inclus'
    },
    cancellationPolicy: {
      tr: '24 saat öncesine kadar ücretsiz iptal',
      en: 'Free cancellation up to 24 hours before',
      ru: 'Бесплатная отмена за 24 часа',
      de: 'Kostenlose Stornierung bis 24 Stunden vorher',
      ar: 'إلغاء مجاني حتى 24 ساعة قبل',
      fr: 'Annulation gratuite jusqu\'à 24 heures avant'
    },
    highlights: {
      tr: [
        'Akdeniz\'in en temiz koylarında yüzme',
        'Phaselis antik kenti kıyıları',
        'Üç farklı adada mola',
        'Snorkeling ile su altı keşfi',
        'Açık büfe öğle yemeği',
        'Günbatımı manzarası',
        'Profesyonel rehber eşliğinde',
        'Küçük gruplar ile kişisel deneyim'
      ],
      en: [
        'Swimming in the clearest bays of the Mediterranean',
        'Shores of Phaselis ancient city',
        'Stops at three different islands',
        'Underwater exploration with snorkeling',
        'Open buffet lunch',
        'Sunset view',
        'With professional guide',
        'Personal experience with small groups'
      ],
      ru: [
        'Плавание в чистейших бухтах Средиземного моря',
        'Берега древнего города Фаселис',
        'Остановки на трех разных островах',
        'Подводное исследование со снорклингом',
        'Обед шведский стол',
        'Вид на закат',
        'С профессиональным гидом',
        'Личный опыт в небольших группах'
      ],
      de: [
        'Schwimmen in den klarsten Buchten des Mittelmeers',
        'Ufer der antiken Stadt Phaselis',
        'Stopps an drei verschiedenen Inseln',
        'Unterwassererkundung mit Schnorcheln',
        'Offenes Buffet-Mittagessen',
        'Sonnenuntergang Ansicht',
        'Mit professionellem Führer',
        'Persönliche Erfahrung in kleinen Gruppen'
      ],
      ar: [
        'السباحة في أنقى خلجان البحر الأبيض المتوسط',
        'شواطئ مدينة فاسيليس القديمة',
        'توقفات في ثلاث جزر مختلفة',
        'استكشاف تحت الماء مع الغطس',
        'غداء بوفيه مفتوح',
        'منظر غروب الشمس',
        'مع مرشد محترف',
        'تجربة شخصية في مجموعات صغيرة'
      ],
      fr: [
        'Baignade dans les baies les plus claires de la Méditerranée',
        'Rives de la ville antique de Phaselis',
        'Arrêts sur trois îles différentes',
        'Exploration sous-marine avec snorkeling',
        'Déjeuner buffet ouvert',
        'Vue du coucher de soleil',
        'Avec guide professionnel',
        'Expérience personnelle en petits groupes'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 487,
    availability: {
      tr: ['Pazartesi', 'Çarşamba', 'Cuma', 'Cumartesi', 'Pazar'],
      en: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
      ru: ['Понедельник', 'Среда', 'Пятница', 'Суббота', 'Воскресенье'],
      de: ['Montag', 'Mittwoch', 'Freitag', 'Samstag', 'Sonntag'],
      ar: ['الإثنين', 'الأربعاء', 'الجمعة', 'السبت', 'الأحد'],
      fr: ['Lundi', 'Mercredi', 'Vendredi', 'Samedi', 'Dimanche']
    },
    seo: {
      metaTitle: {
        tr: 'Antalya Tekne Turu 3 Adalar | En Uygun Fiyat Garantisi',
        en: 'Antalya Boat Tour 3 Islands | Best Price Guarantee',
        ru: 'Морская Экскурсия Анталья 3 Острова | Гарантия Лучшей Цены',
        de: 'Antalya Bootstour 3 Inseln | Bestpreisgarantie',
        ar: 'جولة القارب أنطاليا 3 جزر | ضمان أفضل سعر',
        fr: 'Tour en Bateau Antalya 3 Îles | Garantie Meilleur Prix'
      },
      metaDescription: {
        tr: 'Antalya 3 adalar tekne turunda Akdeniz\'in turkuaz sularını keşfedin. Snorkeling, öğle yemeği dahil. Hemen rezervasyon yapın!',
        en: 'Discover the turquoise waters of the Mediterranean on Antalya 3 islands boat tour. Snorkeling and lunch included. Book now!',
        ru: 'Откройте для себя бирюзовые воды Средиземного моря в туре на лодке по 3 островам Антальи. Снорклинг и обед включены. Забронируйте сейчас!',
        de: 'Entdecken Sie das türkisfarbene Wasser des Mittelmeers auf der Antalya 3-Inseln-Bootstour. Schnorcheln und Mittagessen inklusive. Jetzt buchen!',
        ar: 'اكتشف المياه الفيروزية للبحر الأبيض المتوسط في جولة القارب لجزر أنطاليا الثلاث. الغطس والغداء متضمنان. احجز الآن!',
        fr: 'Découvrez les eaux turquoise de la Méditerranée lors du tour en bateau des 3 îles d\'Antalya. Snorkeling et déjeuner inclus. Réservez maintenant!'
      },
      keywords: {
        tr: ['antalya tekne turu', '3 adalar turu', 'antalya boat tour', 'phaselis', 'akdeniz turu', 'snorkeling antalya'],
        en: ['antalya boat tour', '3 islands tour', 'mediterranean cruise', 'phaselis', 'snorkeling antalya', 'boat trip'],
        ru: ['морская экскурсия анталья', 'тур 3 острова', 'средиземное море', 'фаселис', 'снорклинг анталья'],
        de: ['antalya bootstour', '3 inseln tour', 'mittelmeer kreuzfahrt', 'phaselis', 'schnorcheln antalya'],
        ar: ['جولة قارب أنطاليا', 'جولة 3 جزر', 'البحر المتوسط', 'فاسيليس', 'الغطس أنطاليا'],
        fr: ['tour bateau antalya', 'tour 3 îles', 'croisière méditerranée', 'phaselis', 'snorkeling antalya']
      },
      slug: {
        tr: 'antalya-3-adalar-tekne-turu',
        en: 'antalya-3-islands-boat-tour',
        ru: 'antalya-3-ostrova-morskaya-ekskursiya',
        de: 'antalya-3-inseln-bootstour',
        ar: 'antalya-jolat-alqareb-3-jozor',
        fr: 'antalya-tour-bateau-3-iles'
      }
    },
    active: true
  }
];

// Export helper functions
export { calculateBestPrice };
export default antalyaToursMultilingual;
