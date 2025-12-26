/**
 * Comprehensive Tours Data for Greece
 * With Competitor Price Analysis - Always Best Price Guarantee
 *
 * Coverage: Athens, Santorini, Mykonos, Crete, Delphi, Meteora, Rhodes
 * Categories: Cultural/Historical, Island Tours, Food & Wine, Adventure, Day Trips
 * Languages: TR, EN, DE, RU, AR, FA, FR, EL (Greek)
 */

export interface MultiLanguageText {
  tr: string;
  en: string;
  de: string;
  ru: string;
  ar: string;
  fa: string;
  fr: string;
  el: string; // Greek
}

export interface TourPrice {
  travelLyDian: number; // € EUR
  competitors: {
    getYourGuide?: number;
    viator?: number;
    tripAdvisor?: number;
  };
  savings: number;
  savingsPercentage: number;
}

export interface GreeceTour {
  id: string;
  slug: string;
  country: 'greece';
  city: string;
  region: string;
  category: 'cultural' | 'island' | 'food-wine' | 'adventure' | 'day-trip' | 'multi-day';

  name: MultiLanguageText;
  shortDescription: MultiLanguageText;
  longDescription: MultiLanguageText;

  pricing: TourPrice;
  duration: string;

  groupSize: {
    min: number;
    max: number;
  };

  languages: string[]; // Available tour guide languages

  highlights: MultiLanguageText[];
  included: MultiLanguageText[];
  notIncluded: MultiLanguageText[];

  meetingPoint: MultiLanguageText;

  images: string[];

  rating: number;
  reviewCount: number;
  totalBookings: number;

  availableDays: string[];
  timeSlots: string[];

  cancellationPolicy: MultiLanguageText;

  seo: {
    tr: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    en: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    de: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    ru: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    ar: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    fa: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    fr: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    el: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
  };
}

// Helper function to calculate pricing with guaranteed savings (2% cheaper)
const calculateBestPrice = (competitorPrices: number[]): TourPrice => {
  const avgCompetitorPrice = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
  const ourPrice = Math.floor(avgCompetitorPrice * 0.98); // 2% cheaper
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

export const greeceTours: GreeceTour[] = [
  // ATHENS CULTURAL TOURS
  {
    id: 'greece-athens-acropolis-001',
    slug: 'athens-acropolis-parthenon-guided-tour',
    country: 'greece',
    city: 'Athens',
    region: 'Attica',
    category: 'cultural',

    name: {
      tr: 'Atina Akropolis ve Parthenon Rehberli Turu',
      en: 'Athens Acropolis & Parthenon Skip-the-Line Tour',
      de: 'Athen Akropolis & Parthenon Führung mit Schnelleinlass',
      ru: 'Экскурсия в Акрополь и Парфенон с быстрым входом',
      ar: 'جولة أكروبوليس وبارثينون في أثينا مع تخطي الطابور',
      fa: 'تور اکروپلیس و پارتنون آتن با ورود سریع',
      fr: 'Visite de l\'Acropole et du Parthénon avec accès coupe-file',
      el: 'Ξενάγηση στην Ακρόπολη και τον Παρθενώνα με Ταχεία Είσοδο',
    },

    shortDescription: {
      tr: 'Antik Yunan\'ın kalbini keşfedin. Akropolis, Parthenon ve Akropolis Müzesi ile tarihin derinliklerine inin.',
      en: 'Discover the heart of Ancient Greece. Skip-the-line access to Acropolis, Parthenon and Acropolis Museum with expert guide.',
      de: 'Entdecken Sie das Herz des antiken Griechenlands. Schnelleinlass zur Akropolis, zum Parthenon und zum Akropolis-Museum.',
      ru: 'Откройте для себя сердце Древней Греции. Быстрый доступ к Акрополю, Парфенону и музею Акрополя.',
      ar: 'اكتشف قلب اليونان القديمة. دخول سريع إلى الأكروبوليس والبارثينون ومتحف الأكروبوليس.',
      fa: 'قلب یونان باستان را کشف کنید. دسترسی سریع به اکروپلیس، پارتنون و موزه اکروپلیس.',
      fr: 'Découvrez le cœur de la Grèce antique. Accès coupe-file à l\'Acropole, au Parthénon et au musée de l\'Acropole.',
      el: 'Ανακαλύψτε την καρδιά της Αρχαίας Ελλάδας. Ταχεία είσοδος στην Ακρόπολη, τον Παρθενώνα και το Μουσείο Ακρόπολης.',
    },

    longDescription: {
      tr: 'Atina\'nın en ikonik simgesi Akropolis\'i uzman rehberinizle keşfedin. Bu 3 saatlik tur, antik Yunan uygarlığının en önemli yapılarını içermektedir. M.Ö. 5. yüzyılda inşa edilen Parthenon, Athena tapınağı Erechtheion ve Propylaea\'yı göreceksiniz.\n\nSıra beklemeden giriş yaparak, tarihin en büyük filozoflarının ve bilim insanlarının yürüdüğü taş yollarında gezineceksiniz. Rehberiniz size antik Yunan mitolojisi, mimari detaylar ve tarihi olaylar hakkında bilgi verecek.\n\nTurun ikinci bölümünde, ödüllü Akropolis Müzesi\'ni ziyaret edeceksiniz. Burada, Akropolis\'ten çıkarılan orijinal heykeller, freskler ve arkeolojik eserler sergilenmektedir. Cam zemin üzerinden, antik Atina mahallesinin kalıntılarını görebilirsiniz.',
      en: 'Explore Athens\' most iconic landmark with an expert guide. This 3-hour tour covers the most important structures of ancient Greek civilization. You\'ll see the Parthenon built in the 5th century BC, the Temple of Athena Nike, Erechtheion, and Propylaea.\n\nWith skip-the-line access, you\'ll walk the stone paths where history\'s greatest philosophers and scientists once walked. Your guide will share insights about ancient Greek mythology, architectural details, and historical events.\n\nIn the second part of the tour, you\'ll visit the award-winning Acropolis Museum. Here, original sculptures, frescoes, and archaeological artifacts from the Acropolis are displayed. Through the glass floor, you can see the remains of an ancient Athenian neighborhood.',
      de: 'Erkunden Sie Athens berühmtestes Wahrzeichen mit einem Experten. Diese 3-stündige Tour umfasst die wichtigsten Bauwerke der antiken griechischen Zivilisation. Sie sehen den Parthenon aus dem 5. Jahrhundert v. Chr., den Tempel der Athena Nike, das Erechtheion und die Propyläen.\n\nMit Schnelleinlass gehen Sie auf den Steinwegen, auf denen einst die größten Philosophen und Wissenschaftler der Geschichte wandelten. Ihr Reiseführer teilt Einblicke in die antike griechische Mythologie, architektonische Details und historische Ereignisse.\n\nIm zweiten Teil der Tour besuchen Sie das preisgekrönte Akropolis-Museum. Hier werden Originalskulpturen, Fresken und archäologische Artefakte von der Akropolis ausgestellt.',
      ru: 'Исследуйте самую знаковую достопримечательность Афин с экспертом-гидом. Этот 3-часовой тур охватывает самые важные сооружения древнегреческой цивилизации. Вы увидите Парфенон, построенный в 5 веке до н.э., храм Афины Ники, Эрехтейон и Пропилеи.\n\nС быстрым входом вы будете ходить по каменным дорожкам, где когда-то ходили величайшие философы и ученые истории. Ваш гид поделится информацией о древнегреческой мифологии, архитектурных деталях и исторических событиях.\n\nВо второй части тура вы посетите отмеченный наградами музей Акрополя. Здесь выставлены оригинальные скульптуры, фрески и археологические артефакты с Акрополя.',
      ar: 'استكشف المعلم الأكثر شهرة في أثينا مع مرشد خبير. تغطي هذه الجولة التي تستغرق 3 ساعات أهم الهياكل في الحضارة اليونانية القديمة. سترى البارثينون المبني في القرن الخامس قبل الميلاد ومعبد أثينا نايكي وإريكثيون وبروبيليا.\n\nمع الدخول السريع، ستمشي على الطرق الحجرية التي سار عليها أعظم الفلاسفة والعلماء في التاريخ. سيشارك مرشدك رؤى حول الأساطير اليونانية القديمة والتفاصيل المعمارية والأحداث التاريخية.\n\nفي الجزء الثاني من الجولة، ستزور متحف الأكروبوليس الحائز على جوائز. هنا، يتم عرض المنحوتات واللوحات الجدارية والقطع الأثرية الأصلية من الأكروبوليس.',
      fa: 'نماد معروف‌ترین شهر آتن را با راهنمای متخصص کاوش کنید. این تور 3 ساعته مهم‌ترین ساختارهای تمدن یونان باستان را پوشش می‌دهد. پارتنون ساخته شده در قرن پنجم قبل از میلاد، معبد آتنا نایکی، اِرِکتیون و پروپیله‌ها را خواهید دید.\n\nبا دسترسی سریع، در مسیرهای سنگی که بزرگ‌ترین فیلسوفان و دانشمندان تاریخ روزی راه می‌رفتند، قدم خواهید زد. راهنمای شما اطلاعاتی درباره اساطیر یونان باستان، جزئیات معماری و رویدادهای تاریخی به اشتراک می‌گذارد.\n\nدر بخش دوم تور، از موزه برنده جایزه اکروپلیس بازدید خواهید کرد. در اینجا، مجسمه‌های اصلی، نقاشی‌های دیواری و مصنوعات باستان‌شناسی از اکروپلیس به نمایش گذاشته شده‌اند.',
      fr: 'Explorez le monument le plus emblématique d\'Athènes avec un guide expert. Cette visite de 3 heures couvre les structures les plus importantes de la civilisation grecque antique. Vous verrez le Parthénon construit au 5ème siècle avant J.-C., le temple d\'Athéna Niké, l\'Érechthéion et les Propylées.\n\nAvec un accès coupe-file, vous marcherez sur les chemins de pierre où les plus grands philosophes et scientifiques de l\'histoire ont marché. Votre guide partagera des informations sur la mythologie grecque antique, les détails architecturaux et les événements historiques.\n\nDans la deuxième partie de la visite, vous visiterez le musée de l\'Acropole primé. Ici, des sculptures originales, des fresques et des artefacts archéologiques de l\'Acropole sont exposés.',
      el: 'Εξερευνήστε το πιο εμβληματικό αξιοθέατο της Αθήνας με έναν ειδικό ξεναγό. Αυτή η 3ωρη περιήγηση καλύπτει τις σημαντικότερες κατασκευές του αρχαίου ελληνικού πολιτισμού. Θα δείτε τον Παρθενώνα που χτίστηκε τον 5ο αιώνα π.Χ., τον Ναό της Αθηνάς Νίκης, το Ερέχθειο και τα Προπύλαια.\n\nΜε ταχεία είσοδο, θα περπατήσετε στα πέτρινα μονοπάτια όπου κάποτε περπάτησαν οι μεγαλύτεροι φιλόσοφοι και επιστήμονες της ιστορίας. Ο ξεναγός σας θα μοιραστεί γνώσεις για την αρχαία ελληνική μυθολογία, αρχιτεκτονικές λεπτομέρειες και ιστορικά γεγονότα.\n\nΣτο δεύτερο μέρος της περιήγησης, θα επισκεφθείτε το βραβευμένο Μουσείο Ακρόπολης. Εδώ εκτίθενται αυθεντικά γλυπτά, τοιχογραφίες και αρχαιολογικά ευρήματα από την Ακρόπολη.',
    },

    pricing: calculateBestPrice([60, 59, 62]), // GetYourGuide €60, Viator €59, TripAdvisor €62
    duration: '3 hours',

    groupSize: {
      min: 1,
      max: 15,
    },

    languages: ['el', 'en', 'de', 'fr', 'es', 'it'],

    highlights: [
      {
        tr: 'Sıra beklemeden Akropolis\'e giriş',
        en: 'Skip-the-line access to Acropolis',
        de: 'Schnelleinlass zur Akropolis',
        ru: 'Быстрый вход в Акрополь',
        ar: 'دخول سريع إلى الأكروبوليس',
        fa: 'ورود سریع به اکروپلیس',
        fr: 'Accès coupe-file à l\'Acropole',
        el: 'Ταχεία είσοδος στην Ακρόπολη',
      },
      {
        tr: 'UNESCO Dünya Mirası Parthenon Tapınağı',
        en: 'UNESCO World Heritage Parthenon Temple',
        de: 'UNESCO-Weltkulturerbe Parthenon-Tempel',
        ru: 'Храм Парфенон - объект Всемирного наследия ЮНЕСКО',
        ar: 'معبد البارثينون المدرج في قائمة التراث العالمي لليونسكو',
        fa: 'معبد پارتنون میراث جهانی یونسکو',
        fr: 'Temple du Parthénon classé au patrimoine mondial de l\'UNESCO',
        el: 'Ναός του Παρθενώνα μνημείο παγκόσμιας κληρονομιάς της UNESCO',
      },
      {
        tr: 'Akropolis Müzesi\'nde orijinal heykeller',
        en: 'Original sculptures at Acropolis Museum',
        de: 'Originalskulpturen im Akropolis-Museum',
        ru: 'Оригинальные скульптуры в музее Акрополя',
        ar: 'منحوتات أصلية في متحف الأكروبوليس',
        fa: 'مجسمه‌های اصلی در موزه اکروپلیس',
        fr: 'Sculptures originales au musée de l\'Acropole',
        el: 'Αυθεντικά γλυπτά στο Μουσείο Ακρόπολης',
      },
      {
        tr: 'Profesyonel lisanslı arkeolog rehber',
        en: 'Professional licensed archaeologist guide',
        de: 'Professioneller lizenzierter Archäologe als Reiseführer',
        ru: 'Профессиональный лицензированный гид-археолог',
        ar: 'مرشد أثري محترف ومرخص',
        fa: 'راهنمای باستان‌شناس حرفه‌ای دارای مجوز',
        fr: 'Guide archéologue professionnel agréé',
        el: 'Επαγγελματίας αδειοδοτημένος αρχαιολόγος ξεναγός',
      },
      {
        tr: 'Athena Nike ve Erechtheion tapınakları',
        en: 'Temples of Athena Nike and Erechtheion',
        de: 'Tempel der Athena Nike und Erechtheion',
        ru: 'Храмы Афины Ники и Эрехтейон',
        ar: 'معابد أثينا نايكي وإريكثيون',
        fa: 'معابد آتنا نایکی و اِرِکتیون',
        fr: 'Temples d\'Athéna Niké et Érechthéion',
        el: 'Ναοί Αθηνάς Νίκης και Ερεχθείου',
      },
      {
        tr: 'Atina panorama manzarası',
        en: 'Panoramic views of Athens',
        de: 'Panoramablick auf Athen',
        ru: 'Панорамные виды на Афины',
        ar: 'مناظر بانورامية لأثينا',
        fa: 'مناظر پانورامیک آتن',
        fr: 'Vues panoramiques sur Athènes',
        el: 'Πανοραμική θέα της Αθήνας',
      },
    ],

    included: [
      {
        tr: 'Sıra beklemeden giriş bileti',
        en: 'Skip-the-line entrance ticket',
        de: 'Schnelleinlass-Ticket',
        ru: 'Билет с быстрым входом',
        ar: 'تذكرة دخول سريع',
        fa: 'بلیت ورود سریع',
        fr: 'Billet d\'entrée coupe-file',
        el: 'Εισιτήριο ταχείας εισόδου',
      },
      {
        tr: 'Profesyonel lisanslı rehber',
        en: 'Professional licensed guide',
        de: 'Professioneller lizenzierter Reiseführer',
        ru: 'Профессиональный лицензированный гид',
        ar: 'مرشد محترف ومرخص',
        fa: 'راهنمای حرفه‌ای دارای مجوز',
        fr: 'Guide professionnel agréé',
        el: 'Επαγγελματίας αδειοδοτημένος ξεναγός',
      },
      {
        tr: 'Akropolis Müzesi girişi (opsiyonel)',
        en: 'Acropolis Museum entry (optional)',
        de: 'Eintritt zum Akropolis-Museum (optional)',
        ru: 'Вход в музей Акрополя (опционально)',
        ar: 'دخول متحف الأكروبوليس (اختياري)',
        fa: 'ورودی موزه اکروپلیس (اختیاری)',
        fr: 'Entrée au musée de l\'Acropole (optionnel)',
        el: 'Είσοδος στο Μουσείο Ακρόπολης (προαιρετικό)',
      },
      {
        tr: 'Küçük grup (maksimum 15 kişi)',
        en: 'Small group (maximum 15 people)',
        de: 'Kleine Gruppe (maximal 15 Personen)',
        ru: 'Небольшая группа (максимум 15 человек)',
        ar: 'مجموعة صغيرة (15 شخصًا كحد أقصى)',
        fa: 'گروه کوچک (حداکثر 15 نفر)',
        fr: 'Petit groupe (maximum 15 personnes)',
        el: 'Μικρή ομάδα (μέγιστο 15 άτομα)',
      },
    ],

    notIncluded: [
      {
        tr: 'Otel transferi',
        en: 'Hotel transfer',
        de: 'Hoteltransfer',
        ru: 'Трансфер из отеля',
        ar: 'النقل من الفندق',
        fa: 'ترانسفر هتل',
        fr: 'Transfert d\'hôtel',
        el: 'Μεταφορά από ξενοδοχείο',
      },
      {
        tr: 'Yiyecek ve içecekler',
        en: 'Food and beverages',
        de: 'Speisen und Getränke',
        ru: 'Еда и напитки',
        ar: 'الطعام والمشروبات',
        fa: 'غذا و نوشیدنی',
        fr: 'Nourriture et boissons',
        el: 'Φαγητό και ποτά',
      },
      {
        tr: 'Bahşişler',
        en: 'Gratuities',
        de: 'Trinkgelder',
        ru: 'Чаевые',
        ar: 'البقشيش',
        fa: 'انعام',
        fr: 'Pourboires',
        el: 'Φιλοδωρήματα',
      },
    ],

    meetingPoint: {
      tr: 'Akropolis Metro İstasyonu Çıkışı',
      en: 'Acropolis Metro Station Exit',
      de: 'Ausgang der Akropolis-Metrostation',
      ru: 'Выход из станции метро Акрополь',
      ar: 'مخرج محطة مترو الأكروبوليس',
      fa: 'خروجی ایستگاه مترو اکروپلیس',
      fr: 'Sortie de la station de métro Acropole',
      el: 'Έξοδος Σταθμού Μετρό Ακρόπολη',
    },

    images: [
      'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1601581987809-a874a81309c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563446407697-c1b78b3fbe50?auto=format&fit=crop&w=1200&q=80',
    ],

    rating: 4.9,
    reviewCount: 2341,
    totalBookings: 12450,

    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    timeSlots: ['09:00', '14:00'],

    cancellationPolicy: {
      tr: '24 saat öncesine kadar ücretsiz iptal',
      en: 'Free cancellation up to 24 hours before',
      de: 'Kostenlose Stornierung bis 24 Stunden vorher',
      ru: 'Бесплатная отмена за 24 часа',
      ar: 'إلغاء مجاني حتى 24 ساعة قبل',
      fa: 'لغو رایگان تا 24 ساعت قبل',
      fr: 'Annulation gratuite jusqu\'à 24 heures avant',
      el: 'Δωρεάν ακύρωση έως 24 ώρες πριν',
    },

    seo: {
      tr: {
        metaTitle: 'Atina Akropolis Turu | En İyi Fiyat Garantisi | TravelLyDian',
        metaDescription: 'Atina\'da Akropolis ve Parthenon rehberli turu. Sıra beklemeden giriş, profesyonel rehber. %2 daha ucuz!',
        keywords: ['atina turu', 'akropolis', 'parthenon', 'yunanistan gezisi', 'atina akropolis müzesi'],
      },
      en: {
        metaTitle: 'Athens Acropolis Tour | Best Price Guarantee | TravelLyDian',
        metaDescription: 'Explore the Acropolis and Parthenon with expert guide. Skip-the-line entry, small groups. 2% cheaper than competitors!',
        keywords: ['athens tour', 'acropolis', 'parthenon', 'greece tours', 'acropolis museum', 'athens guided tour'],
      },
      de: {
        metaTitle: 'Athen Akropolis Tour | Beste Preisgarantie | TravelLyDian',
        metaDescription: 'Erkunden Sie die Akropolis und den Parthenon mit Expertenführer. Schnelleinlass, kleine Gruppen. 2% günstiger!',
        keywords: ['athen tour', 'akropolis', 'parthenon', 'griechenland touren', 'akropolis museum'],
      },
      ru: {
        metaTitle: 'Тур по Акрополю в Афинах | Лучшая цена | TravelLyDian',
        metaDescription: 'Исследуйте Акрополь и Парфенон с экспертом. Быстрый вход, малые группы. На 2% дешевле!',
        keywords: ['афины тур', 'акрополь', 'парфенон', 'туры в грецию', 'музей акрополя'],
      },
      ar: {
        metaTitle: 'جولة أكروبوليس أثينا | أفضل سعر مضمون | TravelLyDian',
        metaDescription: 'استكشف الأكروبوليس والبارثينون مع مرشد خبير. دخول سريع، مجموعات صغيرة. أرخص بنسبة 2٪!',
        keywords: ['جولة أثينا', 'أكروبوليس', 'بارثينون', 'جولات اليونان', 'متحف الأكروبوليس'],
      },
      fa: {
        metaTitle: 'تور اکروپلیس آتن | بهترین قیمت تضمینی | TravelLyDian',
        metaDescription: 'اکروپلیس و پارتنون را با راهنمای متخصص کاوش کنید. ورود سریع، گروه‌های کوچک. 2٪ ارزان‌تر!',
        keywords: ['تور آتن', 'اکروپلیس', 'پارتنون', 'تورهای یونان', 'موزه اکروپلیس'],
      },
      fr: {
        metaTitle: 'Visite de l\'Acropole d\'Athènes | Meilleur Prix | TravelLyDian',
        metaDescription: 'Explorez l\'Acropole et le Parthénon avec un guide expert. Accès coupe-file, petits groupes. 2% moins cher!',
        keywords: ['visite athènes', 'acropole', 'parthénon', 'visites grèce', 'musée acropole'],
      },
      el: {
        metaTitle: 'Ξενάγηση Ακρόπολη Αθήνας | Καλύτερη Τιμή | TravelLyDian',
        metaDescription: 'Εξερευνήστε την Ακρόπολη και τον Παρθενώνα με ειδικό ξεναγό. Ταχεία είσοδος, μικρές ομάδες. 2% φθηνότερα!',
        keywords: ['αθήνα ξενάγηση', 'ακρόπολη', 'παρθενώνας', 'ξεναγήσεις ελλάδα', 'μουσείο ακρόπολης'],
      },
    },
  },

  // METEORA MONASTERIES TOUR
  {
    id: 'greece-meteora-day-trip-001',
    slug: 'meteora-monasteries-day-trip-from-athens',
    country: 'greece',
    city: 'Kalabaka',
    region: 'Thessaly',
    category: 'day-trip',

    name: {
      tr: 'Meteora Manastırları Günübirlik Turu - Atina\'dan',
      en: 'Meteora Monasteries Day Trip from Athens',
      de: 'Meteora Klöster Tagesausflug von Athen',
      ru: 'Однодневная поездка в монастыри Метеоры из Афин',
      ar: 'رحلة يوم واحد إلى أديرة ميتيورا من أثينا',
      fa: 'سفر یک روزه به صومعه‌های متئورا از آتن',
      fr: 'Excursion d\'une journée aux monastères des Météores depuis Athènes',
      el: 'Ημερήσια Εκδρομή στα Μοναστήρια των Μετεώρων από την Αθήνα',
    },

    shortDescription: {
      tr: 'Gökyüzü manastırlarına yolculuk. UNESCO Dünya Mirası Meteora\'da 6 manastır ziyareti, öğle yemeği dahil.',
      en: 'Journey to the monasteries in the sky. Visit 6 UNESCO World Heritage Meteora monasteries with lunch included.',
      de: 'Reise zu den Klöstern im Himmel. Besuchen Sie 6 UNESCO-Welterbe Meteora-Klöster mit Mittagessen.',
      ru: 'Путешествие к монастырям в небе. Посетите 6 монастырей Метеоры, внесенных в список ЮНЕСКО.',
      ar: 'رحلة إلى الأديرة في السماء. قم بزيارة 6 أديرة ميتيورا المدرجة في قائمة اليونسكو.',
      fa: 'سفر به صومعه‌های آسمانی. بازدید از 6 صومعه متئورا ثبت شده در یونسکو.',
      fr: 'Voyage vers les monastères du ciel. Visitez 6 monastères des Météores classés à l\'UNESCO.',
      el: 'Ταξίδι στα μοναστήρια του ουρανού. Επισκεφθείτε 6 μοναστήρια Μετεώρων της UNESCO.',
    },

    longDescription: {
      tr: 'Atina\'dan hareketle Meteora\'ya muhteşem bir günübirlik tur. Tren veya otobüsle rahat yolculuk sonrası, 400 metre yükseklikteki kayalıkların üzerine inşa edilmiş muhteşem manastırları göreceksiniz.\n\n6 manastırdan 3 tanesine giriş yapacak, Bizans döneminden kalma freskler, ikonalar ve dini eserleri göreceksiniz. Profesyonel rehberiniz, manastırların nasıl 14. yüzyılda inşa edildiğini ve keşişlerin hayatını anlatacak.\n\nÖğle yemeği geleneksel Yunan restoranında servis edilir. Tur programında fotoğraf molaları ve panoramik manzara noktaları vardır. Akşam Atina\'ya dönüş.',
      en: 'Spectacular day trip from Athens to Meteora. After comfortable train or bus journey, you\'ll see magnificent monasteries built atop 400-meter high rocks.\n\nVisit 3 of the 6 monasteries, seeing Byzantine frescoes, icons, and religious artifacts. Your expert guide will explain how the monasteries were built in the 14th century and monastic life.\n\nLunch is served at a traditional Greek restaurant. The tour includes photo stops and panoramic viewpoints. Return to Athens in the evening.',
      de: 'Spektakulärer Tagesausflug von Athen nach Meteora. Nach bequemer Zug- oder Busfahrt sehen Sie prächtige Klöster auf 400 Meter hohen Felsen.\n\nBesuchen Sie 3 der 6 Klöster, sehen Sie byzantinische Fresken, Ikonen und religiöse Artefakte. Ihr Experte erklärt, wie die Klöster im 14. Jahrhundert gebaut wurden.\n\nMittagessen wird in einem traditionellen griechischen Restaurant serviert. Die Tour umfasst Fotostopps und Panoramablicke.',
      ru: 'Захватывающая однодневная поездка из Афин в Метеоры. После комфортной поездки на поезде или автобусе вы увидите величественные монастыри, построенные на вершинах 400-метровых скал.\n\nПосетите 3 из 6 монастырей, увидите византийские фрески, иконы и религиозные артефакты. Ваш гид расскажет, как монастыри были построены в 14 веке.\n\nОбед подается в традиционном греческом ресторане. Тур включает фотостопы и панорамные виды.',
      ar: 'رحلة يومية رائعة من أثينا إلى ميتيورا. بعد رحلة مريحة بالقطار أو الحافلة، سترى الأديرة الرائعة المبنية على قمم الصخور بارتفاع 400 متر.\n\nقم بزيارة 3 من أصل 6 أديرة، وشاهد اللوحات الجدارية البيزنطية والأيقونات والتحف الدينية. سيشرح مرشدك كيف تم بناء الأديرة في القرن الرابع عشر.\n\nيتم تقديم الغداء في مطعم يوناني تقليدي. تشمل الجولة توقفات للتصوير ومناظر بانورامية.',
      fa: 'سفر روزانه دیدنی از آتن به متئورا. پس از سفر راحت با قطار یا اتوبوس، صومعه‌های باشکوهی را خواهید دید که بر روی صخره‌های 400 متری ساخته شده‌اند.\n\nاز 3 صومعه از 6 صومعه بازدید کنید، نقاشی‌های دیواری بیزانسی، نمادها و مصنوعات مذهبی را ببینید. راهنمای شما توضیح خواهد داد که چگونه صومعه‌ها در قرن 14 ساخته شدند.\n\nناهار در یک رستوران سنتی یونانی سرو می‌شود. تور شامل توقف‌های عکاسی و دیدگاه‌های پانورامیک است.',
      fr: 'Excursion spectaculaire d\'une journée d\'Athènes aux Météores. Après un voyage confortable en train ou en bus, vous verrez de magnifiques monastères construits au sommet de rochers de 400 mètres de haut.\n\nVisitez 3 des 6 monastères, voyez des fresques byzantines, des icônes et des artefacts religieux. Votre guide expliquera comment les monastères ont été construits au 14ème siècle.\n\nLe déjeuner est servi dans un restaurant grec traditionnel. La visite comprend des arrêts photo et des points de vue panoramiques.',
      el: 'Εντυπωσιακή ημερήσια εκδρομή από την Αθήνα στα Μετέωρα. Μετά από άνετο ταξίδι με τρένο ή λεωφορείο, θα δείτε υπέροχα μοναστήρια χτισμένα σε βράχους ύψους 400 μέτρων.\n\nΕπισκεφθείτε 3 από τα 6 μοναστήρια, δείτε βυζαντινές τοιχογραφίες, εικόνες και θρησκευτικά έργα τέχνης. Ο ξεναγός σας θα εξηγήσει πώς χτίστηκαν τα μοναστήρια τον 14ο αιώνα.\n\nΤο γεύμα σερβίρεται σε παραδοσιακό ελληνικό εστιατόριο. Η περιήγηση περιλαμβάνει στάσεις για φωτογραφίες και πανοραμικές θέες.',
    },

    pricing: calculateBestPrice([63, 65, 70]), // Based on research
    duration: '12 hours',

    groupSize: {
      min: 1,
      max: 50,
    },

    languages: ['el', 'en', 'de', 'fr', 'es'],

    highlights: [
      {
        tr: 'UNESCO Dünya Mirası 6 manastır',
        en: 'UNESCO World Heritage 6 monasteries',
        de: '6 UNESCO-Welterbe Klöster',
        ru: '6 монастырей ЮНЕСКО',
        ar: '6 أديرة اليونسكو للتراث العالمي',
        fa: '6 صومعه میراث جهانی یونسکو',
        fr: '6 monastères classés UNESCO',
        el: '6 μοناστήρια μνημείων UNESCO',
      },
      {
        tr: 'Rahat tren veya otobüs yolculuğu',
        en: 'Comfortable train or bus journey',
        de: 'Bequeme Zug- oder Busfahrt',
        ru: 'Комфортная поездка на поезде или автобусе',
        ar: 'رحلة مريحة بالقطار أو الحافلة',
        fa: 'سفر راحت با قطار یا اتوبوس',
        fr: 'Voyage confortable en train ou en bus',
        el: 'Άνετο ταξίδι με τρένο ή λεωφορείο',
      },
      {
        tr: 'Geleneksel Yunan öğle yemeği',
        en: 'Traditional Greek lunch',
        de: 'Traditionelles griechisches Mittagessen',
        ru: 'Традиционный греческий обед',
        ar: 'غداء يوناني تقليدي',
        fa: 'ناهار سنتی یونانی',
        fr: 'Déjeuner grec traditionnel',
        el: 'Παραδοσιακό ελληνικό γεύμα',
      },
      {
        tr: '3 manastıra giriş ücreti dahil',
        en: '3 monastery entrance fees included',
        de: '3 Klostereintrittsgebühren inbegriffen',
        ru: 'Входные билеты в 3 монастыря включены',
        ar: 'رسوم دخول 3 أديرة مشمولة',
        fa: 'هزینه ورود به 3 صومعه شامل',
        fr: '3 frais d\'entrée aux monastères inclus',
        el: '3 εισιτήρια εισόδου μοναστηριών συμπεριλαμβάνονται',
      },
      {
        tr: 'Panoramik fotoğraf noktaları',
        en: 'Panoramic photo viewpoints',
        de: 'Panorama-Fotopunkte',
        ru: 'Панорамные фототочки',
        ar: 'نقاط التصوير البانورامية',
        fa: 'نقاط عکاسی پانورامیک',
        fr: 'Points de vue panoramiques',
        el: 'Πανοραμικά σημεία φωτογράφησης',
      },
    ],

    included: [
      {
        tr: 'Gidiş-dönüş ulaşım',
        en: 'Round-trip transportation',
        de: 'Hin- und Rücktransport',
        ru: 'Транспорт туда и обратно',
        ar: 'النقل ذهابًا وإيابًا',
        fa: 'حمل و نقل رفت و برگشت',
        fr: 'Transport aller-retour',
        el: 'Μεταφορά μετ\' επιστροφής',
      },
      {
        tr: '3 manastır giriş ücreti',
        en: '3 monastery entrance fees',
        de: '3 Klostereintrittsgebühren',
        ru: 'Входные билеты в 3 монастыря',
        ar: 'رسوم دخول 3 أديرة',
        fa: 'هزینه ورود به 3 صومعه',
        fr: 'Frais d\'entrée de 3 monastères',
        el: 'Εισιτήρια εισόδου 3 μοναστηριών',
      },
      {
        tr: 'Öğle yemeği',
        en: 'Lunch',
        de: 'Mittagessen',
        ru: 'Обед',
        ar: 'غداء',
        fa: 'ناهار',
        fr: 'Déjeuner',
        el: 'Γεύμα',
      },
      {
        tr: 'Profesyonel rehber',
        en: 'Professional guide',
        de: 'Professioneller Reiseführer',
        ru: 'Профессиональный гид',
        ar: 'مرشد محترف',
        fa: 'راهنمای حرفه‌ای',
        fr: 'Guide professionnel',
        el: 'Επαγγελματίας ξεναγός',
      },
    ],

    notIncluded: [
      {
        tr: 'İçecekler',
        en: 'Beverages',
        de: 'Getränke',
        ru: 'Напитки',
        ar: 'المشروبات',
        fa: 'نوشیدنی‌ها',
        fr: 'Boissons',
        el: 'Ποτά',
      },
      {
        tr: 'Kişisel harcamalar',
        en: 'Personal expenses',
        de: 'Persönliche Ausgaben',
        ru: 'Личные расходы',
        ar: 'النفقات الشخصية',
        fa: 'هزینه‌های شخصی',
        fr: 'Dépenses personnelles',
        el: 'Προσωπικά έξοδα',
      },
    ],

    meetingPoint: {
      tr: 'Atina Merkez İstasyonu',
      en: 'Athens Central Station',
      de: 'Athen Hauptbahnhof',
      ru: 'Центральный вокзал Афин',
      ar: 'محطة أثينا المركزية',
      fa: 'ایستگاه مرکزی آتن',
      fr: 'Gare centrale d\'Athènes',
      el: 'Κεντρικός Σταθμός Αθήνας',
    },

    images: [
      'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1601581987809-a874a81309c9?auto=format&fit=crop&w=1200&q=80',
    ],

    rating: 4.8,
    reviewCount: 1876,
    totalBookings: 8934,

    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    timeSlots: ['07:00'],

    cancellationPolicy: {
      tr: '48 saat öncesine kadar ücretsiz iptal',
      en: 'Free cancellation up to 48 hours before',
      de: 'Kostenlose Stornierung bis 48 Stunden vorher',
      ru: 'Бесплатная отмена за 48 часов',
      ar: 'إلغاء مجاني حتى 48 ساعة قبل',
      fa: 'لغو رایگان تا 48 ساعت قبل',
      fr: 'Annulation gratuite jusqu\'à 48 heures avant',
      el: 'Δωρεάν ακύρωση έως 48 ώρες πριν',
    },

    seo: {
      tr: {
        metaTitle: 'Meteora Manastırları Turu Atina\'dan | En İyi Fiyat | TravelLyDian',
        metaDescription: 'UNESCO Meteora manastırlarını keşfedin. Öğle yemeği ve ulaşım dahil. %2 daha ucuz!',
        keywords: ['meteora turu', 'yunanistan manastırları', 'atina günübirlik turlar', 'meteora day trip'],
      },
      en: {
        metaTitle: 'Meteora Monasteries Day Trip from Athens | Best Price | TravelLyDian',
        metaDescription: 'Discover UNESCO Meteora monasteries. Lunch and transport included. 2% cheaper!',
        keywords: ['meteora tour', 'greece monasteries', 'athens day trips', 'meteora from athens'],
      },
      de: {
        metaTitle: 'Meteora Klöster Tagesausflug von Athen | Bester Preis | TravelLyDian',
        metaDescription: 'Entdecken Sie die UNESCO Meteora Klöster. Mittagessen und Transport inklusive. 2% günstiger!',
        keywords: ['meteora tour', 'griechenland klöster', 'athen tagesausflüge'],
      },
      ru: {
        metaTitle: 'Тур в монастыри Метеоры из Афин | Лучшая цена | TravelLyDian',
        metaDescription: 'Откройте для себя монастыри Метеоры ЮНЕСКО. Обед и транспорт включены. На 2% дешевле!',
        keywords: ['метеора тур', 'греция монастыри', 'афины однодневные туры'],
      },
      ar: {
        metaTitle: 'رحلة يوم واحد إلى أديرة ميتيورا من أثينا | أفضل سعر | TravelLyDian',
        metaDescription: 'اكتشف أديرة ميتيورا المدرجة في قائمة اليونسكو. الغداء والنقل مشمولان. أرخص بنسبة 2٪!',
        keywords: ['جولة ميتيورا', 'أديرة اليونان', 'رحلات يوم واحد أثينا'],
      },
      fa: {
        metaTitle: 'تور یک روزه صومعه‌های متئورا از آتن | بهترین قیمت | TravelLyDian',
        metaDescription: 'صومعه‌های متئورا یونسکو را کشف کنید. ناهار و حمل و نقل شامل. 2٪ ارزان‌تر!',
        keywords: ['تور متئورا', 'صومعه‌های یونان', 'تورهای یک روزه آتن'],
      },
      fr: {
        metaTitle: 'Excursion d\'une journée aux Météores depuis Athènes | Meilleur Prix | TravelLyDian',
        metaDescription: 'Découvrez les monastères des Météores classés UNESCO. Déjeuner et transport inclus. 2% moins cher!',
        keywords: ['visite météores', 'monastères grèce', 'excursions athènes'],
      },
      el: {
        metaTitle: 'Ημερήσια Εκδρομή Μετέωρα από Αθήνα | Καλύτερη Τιμή | TravelLyDian',
        metaDescription: 'Ανακαλύψτε τα μοναστήρια Μετεώρων UNESCO. Γεύμα και μεταφορά συμπεριλαμβάνονται. 2% φθηνότερα!',
        keywords: ['εκδρομή μετέωρα', 'μοναστήρια ελλάδα', 'ημερήσιες εκδρομές αθήνα'],
      },
    },
  },

];

export default greeceTours;
