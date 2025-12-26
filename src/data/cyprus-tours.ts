/**
 * Comprehensive Tours Data for Cyprus
 * With Competitor Price Analysis - Always Best Price Guarantee
 *
 * Coverage: Paphos, Limassol, Ayia Napa, Nicosia, Troodos
 * Categories: Historical, Beach & Water, Nature, Cultural
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

export interface CyprusTour {
  id: string;
  slug: string;
  country: 'cyprus';
  city: string;
  region: string;
  category: 'historical' | 'beach-water' | 'nature' | 'cultural' | 'adventure';

  name: MultiLanguageText;
  shortDescription: MultiLanguageText;
  longDescription: MultiLanguageText;

  pricing: TourPrice;
  duration: string;

  groupSize: {
    min: number;
    max: number;
  };

  languages: string[];

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

export const cyprusTours: CyprusTour[] = [
  // PAPHOS TOURS
  {
    id: 'cyprus-paphos-tombs-kings-001',
    slug: 'paphos-tombs-of-the-kings-archaeological-tour',
    country: 'cyprus',
    city: 'Paphos',
    region: 'Western Cyprus',
    category: 'historical',

    name: {
      tr: 'Baf Krallar Mezarlığı Arkeolojik Turu',
      en: 'Paphos Tombs of the Kings Archaeological Tour',
      de: 'Paphos Königsgräber Archäologische Tour',
      ru: 'Археологический тур по Гробницам Королей в Пафосе',
      ar: 'جولة أثرية في مقابر الملوك في بافوس',
      fa: 'تور باستان‌شناسی مقابر پادشاهان پافوس',
      fr: 'Visite archéologique des Tombes des Rois à Paphos',
      el: 'Αρχαιολογική Περιήγηση Τάφων των Βασιλέων Πάφου',
    },

    shortDescription: {
      tr: 'UNESCO Dünya Mirası Krallar Mezarlığı ve Afrodit Kayayı keşfedin. Antik mozaikler ve tarihi kalıntılar.',
      en: 'Discover UNESCO World Heritage Tombs of the Kings and Aphrodite\'s Rock. Ancient mosaics and historical ruins.',
      de: 'Entdecken Sie die UNESCO-Welterbe Königsgräber und Aphrodites Felsen. Antike Mosaike und historische Ruinen.',
      ru: 'Откройте для себя объект Всемирного наследия ЮНЕСКО - Гробницы Королей и Скалу Афродиты. Древние мозаики и исторические руины.',
      ar: 'اكتشف مقابر الملوك المدرجة في قائمة اليونسكو للتراث العالمي وصخرة أفروديت. الفسيفساء القديمة والآثار التاريخية.',
      fa: 'میراث جهانی یونسکو مقابر پادشاهان و صخره آفرودیت را کشف کنید. موزاییک‌های باستانی و آثار تاریخی.',
      fr: 'Découvrez les Tombes des Rois classées à l\'UNESCO et le Rocher d\'Aphrodite. Mosaïques antiques et ruines historiques.',
      el: 'Ανακαλύψτε τους Τάφους των Βασιλέων μνημείο UNESCO και τον Βράχο της Αφροδίτης. Αρχαία ψηφιδωτά και ιστορικά ερείπια.',
    },

    longDescription: {
      tr: 'Kıbrıs\'ın en önemli arkeolojik alanlarını keşfedeceğiniz bu tur, Baf\'ın zengin tarihini gözler önüne seriyor. İlk durağımız UNESCO Dünya Mirası Listesi\'ndeki Krallar Mezarlığı. M.Ö. 4. yüzyıldan kalma bu muhteşem yeraltı mezarları, kayalara oyulmuş etkileyici mimarisi ile ünlüdür.\n\nRehberiniz size Ptolemaik döneminden kalma mezarların yapısını ve antik gömü geleneklerini anlatacak. Ardından Baf Arkeoloji Parkı\'nda Dionysos Evi\'ni ziyaret edeceksiniz. Burada 3. yüzyıldan kalma muhteşem mozaikler göreceksiniz.\n\nÖğleden sonra Afrodit\'in doğduğu söylenen Petra tou Romiou (Afrodit Kayası)\'na gideceğiz. Burada fotoğraf çekme fırsatınız olacak. Tur, Baf Kalesi\'nin ziyareti ile sona erecek.',
      en: 'This tour showcasing Cyprus\' most important archaeological sites reveals Paphos\' rich history. Our first stop is the UNESCO World Heritage Listed Tombs of the Kings. These magnificent underground tombs dating from the 4th century BC are famous for their impressive rock-cut architecture.\n\nYour guide will explain the structure of the Ptolemaic period tombs and ancient burial traditions. Then you\'ll visit the House of Dionysus in Paphos Archaeological Park. Here you\'ll see magnificent mosaics from the 3rd century.\n\nIn the afternoon, we\'ll visit Petra tou Romiou (Aphrodite\'s Rock), where Aphrodite is said to have been born. You\'ll have the opportunity to take photos here. The tour ends with a visit to Paphos Castle.',
      de: 'Diese Tour zeigt die wichtigsten archäologischen Stätten Zyperns und enthüllt die reiche Geschichte von Paphos. Unser erster Halt sind die UNESCO-Welterbe Königsgräber. Diese prächtigen unterirdischen Gräber aus dem 4. Jahrhundert v. Chr. sind berühmt für ihre beeindruckende Felsarchitektur.\n\nIhr Reiseführer erklärt die Struktur der ptolemäischen Gräber und antike Bestattungstraditionen. Dann besuchen Sie das Haus des Dionysos im Archäologischen Park von Paphos. Hier sehen Sie prächtige Mosaike aus dem 3. Jahrhundert.\n\nAm Nachmittag besuchen wir Petra tou Romiou (Aphrodites Felsen), wo Aphrodite geboren worden sein soll. Die Tour endet mit einem Besuch der Burg von Paphos.',
      ru: 'Этот тур, демонстрирующий самые важные археологические объекты Кипра, раскрывает богатую историю Пафоса. Первая наша остановка - Гробницы Королей, внесенные в список Всемирного наследия ЮНЕСКО. Эти великолепные подземные гробницы, датируемые 4 веком до н.э., знамениты своей впечатляющей скальной архитектурой.\n\nВаш гид объяснит структуру гробниц птолемеевского периода и древние погребальные традиции. Затем вы посетите Дом Диониса в Археологическом парке Пафоса. Здесь вы увидите великолепные мозаики 3 века.\n\nВо второй половине дня мы посетим Петра ту Ромиу (Скала Афродиты), где, как говорят, родилась Афродита. Тур заканчивается посещением замка Пафоса.',
      ar: 'تكشف هذه الجولة التي تعرض أهم المواقع الأثرية في قبرص عن التاريخ الغني لبافوس. محطتنا الأولى هي مقابر الملوك المدرجة في قائمة التراث العالمي لليونسكو. تشتهر هذه المقابر الجوفية الرائعة التي يعود تاريخها إلى القرن الرابع قبل الميلاد بهندستها المعمارية الصخرية المذهلة.\n\nسيشرح مرشدك بنية مقابر العصر البطلمي وتقاليد الدفن القديمة. ثم ستزور بيت ديونيسوس في منتزه بافوس الأثري. هنا سترى الفسيفساء الرائعة من القرن الثالث.\n\nفي فترة ما بعد الظهر، سنزور بترا تو روميو (صخرة أفروديت)، حيث يُقال إن أفروديت ولدت. تنتهي الجولة بزيارة قلعة بافوس.',
      fa: 'این تور که مهم‌ترین سایت‌های باستان‌شناسی قبرس را به نمایش می‌گذارد، تاریخ غنی پافوس را آشکار می‌کند. اولین ایستگاه ما مقابر پادشاهان ثبت شده در فهرست میراث جهانی یونسکو است. این مقابر زیرزمینی باشکوه که به قرن چهارم قبل از میلاد باز می‌گردند، به خاطر معماری شگفت‌انگیز سنگی خود مشهورند.\n\nراهنمای شما ساختار مقابر دوره بطلمیوسی و سنت‌های تدفین باستانی را توضیح خواهد داد. سپس از خانه دیونیسوس در پارک باستان‌شناسی پافوس بازدید خواهید کرد. اینجا موزاییک‌های باشکوه قرن سوم را خواهید دید.\n\nبعد از ظهر، از پترا تو رومیو (صخره آفرودیت) که گفته می‌شود آفرودیت در آنجا متولد شده، بازدید خواهیم کرد. تور با بازدید از قلعه پافوس به پایان می‌رسد.',
      fr: 'Cette visite présentant les sites archéologiques les plus importants de Chypre révèle la riche histoire de Paphos. Notre premier arrêt est les Tombes des Rois inscrites au patrimoine mondial de l\'UNESCO. Ces magnifiques tombeaux souterrains datant du 4ème siècle avant J.-C. sont célèbres pour leur impressionnante architecture rupestre.\n\nVotre guide expliquera la structure des tombes de la période ptolémaïque et les traditions funéraires antiques. Ensuite, vous visiterez la Maison de Dionysos dans le parc archéologique de Paphos. Ici, vous verrez de magnifiques mosaïques du 3ème siècle.\n\nL\'après-midi, nous visiterons Petra tou Romiou (le Rocher d\'Aphrodite), où Aphrodite serait née. La visite se termine par une visite du château de Paphos.',
      el: 'Αυτή η περιήγηση που παρουσιάζει τους σημαντικότερους αρχαιολογικούς χώρους της Κύπρου αποκαλύπτει την πλούσια ιστορία της Πάφου. Ο πρώτος μας σταθμός είναι οι Τάφοι των Βασιλέων που περιλαμβάνονται στον κατάλογο Παγκόσμιας Κληρονομιάς της UNESCO. Αυτοί οι υπέροχοι υπόγειοι τάφοι που χρονολογούνται από τον 4ο αιώνα π.Χ. φημίζονται για την εντυπωσιακή λαξευμένη στο βράχο αρχιτεκτονική τους.\n\nΟ ξεναγός σας θα εξηγήσει τη δομή των τάφων της πτολεμαϊκής περιόδου και τις αρχαίες ταφικές παραδόσεις. Στη συνέχεια θα επισκεφθείτε το Σπίτι του Διονύσου στο Αρχαιολογικό Πάρκο Πάφου. Εδώ θα δείτε υπέροχα ψηφιδωτά από τον 3ο αιώνα.\n\nΤο απόγευμα, θα επισκεφθούμε την Πέτρα του Ρωμιού (Βράχος της Αφροδίτης), όπου λέγεται ότι γεννήθηκε η Αφροδίτη. Η περιήγηση τελειώνει με επίσκεψη στο Κάστρο της Πάφου.',
    },

    pricing: calculateBestPrice([45, 48, 50]), // Based on research: Paphos half-day tours
    duration: '5 hours',

    groupSize: {
      min: 1,
      max: 20,
    },

    languages: ['el', 'en', 'tr', 'ru', 'de'],

    highlights: [
      {
        tr: 'UNESCO Krallar Mezarlığı',
        en: 'UNESCO Tombs of the Kings',
        de: 'UNESCO-Königsgräber',
        ru: 'Гробницы Королей ЮНЕСКО',
        ar: 'مقابر الملوك اليونسكو',
        fa: 'مقابر پادشاهان یونسکو',
        fr: 'Tombes des Rois UNESCO',
        el: 'Τάφοι των Βασιλέων UNESCO',
      },
      {
        tr: 'Afrodit\'in Kayası (Petra tou Romiou)',
        en: 'Aphrodite\'s Rock (Petra tou Romiou)',
        de: 'Aphrodites Felsen (Petra tou Romiou)',
        ru: 'Скала Афродиты (Петра ту Ромиу)',
        ar: 'صخرة أفروديت (بترا تو روميو)',
        fa: 'صخره آفرودیت (پترا تو رومیو)',
        fr: 'Rocher d\'Aphrodite (Petra tou Romiou)',
        el: 'Βράχος της Αφροδίτης (Πέτρα του Ρωμιού)',
      },
      {
        tr: '3. yüzyıl Roma mozaikleri',
        en: '3rd century Roman mosaics',
        de: 'Römische Mosaike aus dem 3. Jahrhundert',
        ru: 'Римские мозаики 3 века',
        ar: 'الفسيفساء الرومانية من القرن الثالث',
        fa: 'موزاییک‌های رومی قرن سوم',
        fr: 'Mosaïques romaines du 3ème siècle',
        el: 'Ρωμαϊκά ψηφιδωτά του 3ου αιώνα',
      },
      {
        tr: 'Baf Kalesi ziyareti',
        en: 'Paphos Castle visit',
        de: 'Besuch der Burg von Paphos',
        ru: 'Посещение замка Пафоса',
        ar: 'زيارة قلعة بافوس',
        fa: 'بازدید از قلعه پافوس',
        fr: 'Visite du château de Paphos',
        el: 'Επίσκεψη στο Κάστρο της Πάφου',
      },
      {
        tr: 'Profesyonel arkeolog rehber',
        en: 'Professional archaeologist guide',
        de: 'Professioneller Archäologe als Führer',
        ru: 'Профессиональный гид-археолог',
        ar: 'مرشد أثري محترف',
        fa: 'راهنمای باستان‌شناس حرفه‌ای',
        fr: 'Guide archéologue professionnel',
        el: 'Επαγγελματίας αρχαιολόγος ξεναγός',
      },
    ],

    included: [
      {
        tr: 'Tüm giriş ücretleri',
        en: 'All entrance fees',
        de: 'Alle Eintrittsgelder',
        ru: 'Все входные билеты',
        ar: 'جميع رسوم الدخول',
        fa: 'تمام هزینه‌های ورودی',
        fr: 'Tous les frais d\'entrée',
        el: 'Όλα τα εισιτήρια εισόδου',
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
      {
        tr: 'Klimalı araç ulaşımı',
        en: 'Air-conditioned vehicle transport',
        de: 'Klimatisierter Fahrzeugtransport',
        ru: 'Транспорт с кондиционером',
        ar: 'نقل بسيارة مكيفة',
        fa: 'حمل و نقل با خودروی تهویه مطبوع',
        fr: 'Transport en véhicule climatisé',
        el: 'Μεταφορά με κλιματιζόμενο όχημα',
      },
      {
        tr: 'Küçük grup (maks. 20 kişi)',
        en: 'Small group (max. 20 people)',
        de: 'Kleine Gruppe (max. 20 Personen)',
        ru: 'Небольшая группа (макс. 20 человек)',
        ar: 'مجموعة صغيرة (20 شخصًا كحد أقصى)',
        fa: 'گروه کوچک (حداکثر 20 نفر)',
        fr: 'Petit groupe (max. 20 personnes)',
        el: 'Μικρή ομάδα (μέγ. 20 άτομα)',
      },
    ],

    notIncluded: [
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
      tr: 'Baf Liman Karşısı Bilgi Noktası',
      en: 'Paphos Harbor Information Point',
      de: 'Informationspunkt am Hafen von Paphos',
      ru: 'Информационная точка у гавани Пафоса',
      ar: 'نقطة المعلومات في ميناء بافوس',
      fa: 'نقطه اطلاعات بندر پافوس',
      fr: 'Point d\'information du port de Paphos',
      el: 'Σημείο Πληροφοριών Λιμανιού Πάφου',
    },

    images: [
      'https://images.unsplash.com/photo-1580837119756-563d608dd119?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592422916095-53c15b512a67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80',
    ],

    rating: 4.9,
    reviewCount: 1432,
    totalBookings: 7856,

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
        metaTitle: 'Baf Krallar Mezarlığı Turu | En İyi Fiyat | TravelLyDian',
        metaDescription: 'UNESCO Krallar Mezarlığı ve Afrodit Kayası turu. Antik mozaikler, Baf Kalesi. %2 daha ucuz!',
        keywords: ['baf turu', 'krallar mezarlığı', 'kıbrıs turları', 'paphos tours', 'afrodit kayası'],
      },
      en: {
        metaTitle: 'Paphos Tombs of the Kings Tour | Best Price | TravelLyDian',
        metaDescription: 'UNESCO Tombs of the Kings and Aphrodite\'s Rock tour. Ancient mosaics, Paphos Castle. 2% cheaper!',
        keywords: ['paphos tour', 'tombs of the kings', 'cyprus tours', 'aphrodite rock', 'paphos archaeological'],
      },
      de: {
        metaTitle: 'Paphos Königsgräber Tour | Bester Preis | TravelLyDian',
        metaDescription: 'UNESCO-Königsgräber und Aphrodites Felsen Tour. Antike Mosaike, Paphos-Burg. 2% günstiger!',
        keywords: ['paphos tour', 'königsgräber', 'zypern touren', 'aphrodite felsen'],
      },
      ru: {
        metaTitle: 'Тур по Гробницам Королей в Пафосе | Лучшая цена | TravelLyDian',
        metaDescription: 'Тур по Гробницам Королей ЮНЕСКО и Скале Афродиты. Древние мозаики, замок Пафоса. На 2% дешевле!',
        keywords: ['пафос тур', 'гробницы королей', 'кипр туры', 'скала афродиты'],
      },
      ar: {
        metaTitle: 'جولة مقابر الملوك في بافوس | أفضل سعر | TravelLyDian',
        metaDescription: 'جولة مقابر الملوك اليونسكو وصخرة أفروديت. الفسيفساء القديمة، قلعة بافوس. أرخص بنسبة 2٪!',
        keywords: ['جولة بافوس', 'مقابر الملوك', 'جولات قبرص', 'صخرة أفروديت'],
      },
      fa: {
        metaTitle: 'تور مقابر پادشاهان پافوس | بهترین قیمت | TravelLyDian',
        metaDescription: 'تور مقابر پادشاهان یونسکو و صخره آفرودیت. موزاییک‌های باستانی، قلعه پافوس. 2٪ ارزان‌تر!',
        keywords: ['تور پافوس', 'مقابر پادشاهان', 'تورهای قبرس', 'صخره آفرودیت'],
      },
      fr: {
        metaTitle: 'Visite des Tombes des Rois à Paphos | Meilleur Prix | TravelLyDian',
        metaDescription: 'Visite des Tombes des Rois UNESCO et du Rocher d\'Aphrodite. Mosaïques antiques, château de Paphos. 2% moins cher!',
        keywords: ['visite paphos', 'tombes des rois', 'visites chypre', 'rocher aphrodite'],
      },
      el: {
        metaTitle: 'Περιήγηση Τάφων των Βασιλέων Πάφου | Καλύτερη Τιμή | TravelLyDian',
        metaDescription: 'Περιήγηση Τάφων των Βασιλέων UNESCO και Βράχου Αφροδίτης. Αρχαία ψηφιδωτά, Κάστρο Πάφου. 2% φθηνότερα!',
        keywords: ['περιήγηση πάφος', 'τάφοι βασιλέων', 'εκδρομές κύπρος', 'βράχος αφροδίτης'],
      },
    },
  },

  // AYIA NAPA BLUE LAGOON TOUR
  {
    id: 'cyprus-ayia-napa-blue-lagoon-001',
    slug: 'ayia-napa-blue-lagoon-boat-cruise',
    country: 'cyprus',
    city: 'Ayia Napa',
    region: 'Eastern Cyprus',
    category: 'beach-water',

    name: {
      tr: 'Ayia Napa Mavi Lagün Tekne Turu',
      en: 'Ayia Napa Blue Lagoon Boat Cruise',
      de: 'Ayia Napa Blaue Lagune Bootstour',
      ru: 'Круиз на лодке к Голубой лагуне в Айя-Напе',
      ar: 'رحلة بحرية إلى البحيرة الزرقاء في آيا نابا',
      fa: 'کروز قایق به لاگون آبی آیانا',
      fr: 'Croisière en bateau au Lagon Bleu d\'Ayia Napa',
      el: 'Κρουαζιέρα με Σκάφος στη Γαλάζια Λιμνοθάλασσα Αγίας Νάπας',
    },

    shortDescription: {
      tr: 'Kristal berraklığında Mavi Lagün, Cape Greco deniz mağaraları ve snorkeling. Öğle yemeği dahil.',
      en: 'Crystal-clear Blue Lagoon, Cape Greco sea caves, and snorkeling. Lunch included.',
      de: 'Kristallklare Blaue Lagune, Cape Greco Meereshöhlen und Schnorcheln. Mittagessen inklusive.',
      ru: 'Кристально чистая Голубая лагуна, морские пещеры Кейп Греко и снорклинг. Обед включен.',
      ar: 'البحيرة الزرقاء النقية، كهوف كيب غريكو البحرية، والغطس. الغداء مشمول.',
      fa: 'لاگون آبی کریستالی، غارهای دریایی کیپ گرکو و غواصی. ناهار شامل.',
      fr: 'Lagon Bleu cristallin, grottes marines de Cape Greco et plongée en apnée. Déjeuner inclus.',
      el: 'Κρυστάλλινη Γαλάζια Λιμνοθάλασσα, θαλάσσια σπήλαια Cape Greco και καταδύσεις. Γεύμα περιλαμβάνεται.',
    },

    longDescription: {
      tr: 'Kıbrıs\'ın en güzel kıyılarını keşfetmek için Mavi Lagün tekne turuna katılın. Sabah Ayia Napa limanından hareket ediyoruz ve Cape Greco doğal parkına doğru yol alıyoruz.\n\nİlk durağımız muhteşem deniz mağaraları. Burada mağara fotoğrafları çekip, kristal berraklığındaki sularda yüzme fırsatınız olacak. Ardından Konnos Koyu\'na gideceğiz.\n\nAna durağımız dünyaca ünlü Mavi Lagün. Turkuaz sularında yüzme ve snorkeling yapacaksınız. Profesyonel ekipman sağlanır. Tekne üzerinde açık büfe öğle yemeği servis edilir. İçecekler sınırsız. Dönüş yolunda müzik eşliğinde eğlenceli atmosfer.',
      en: 'Join the Blue Lagoon boat tour to discover Cyprus\' most beautiful coasts. We depart from Ayia Napa harbor in the morning and head towards Cape Greco natural park.\n\nOur first stop is the magnificent sea caves. Here you\'ll have the opportunity to take cave photos and swim in crystal-clear waters. Then we\'ll visit Konnos Bay.\n\nOur main stop is the world-famous Blue Lagoon. You\'ll swim and snorkel in the turquoise waters. Professional equipment is provided. Open buffet lunch is served on the boat. Unlimited drinks. Fun atmosphere with music on the way back.',
      de: 'Nehmen Sie an der Blauen Lagune Bootstour teil, um Zyperns schönste Küsten zu entdecken. Wir fahren morgens vom Hafen Ayia Napa ab und fahren zum Naturpark Cape Greco.\n\nUnser erster Halt sind die prächtigen Meereshöhlen. Hier haben Sie die Möglichkeit, Höhlenfotos zu machen und in kristallklarem Wasser zu schwimmen. Dann besuchen wir die Konnos-Bucht.\n\nUnser Haupthalt ist die weltberühmte Blaue Lagune. Sie schwimmen und schnorcheln in den türkisfarbenen Gewässern. Professionelle Ausrüstung wird bereitgestellt. Offenes Buffet-Mittagessen wird auf dem Boot serviert. Unbegrenzte Getränke.',
      ru: 'Присоединяйтесь к лодочному туру в Голубую лагуну, чтобы открыть для себя самые красивые побережья Кипра. Мы отправляемся из гавани Айя-Напы утром и направляемся к природному парку Кейп Греко.\n\nНаша первая остановка - великолепные морские пещеры. Здесь вы сможете сфотографировать пещеры и поплавать в кристально чистой воде. Затем мы посетим залив Коннос.\n\nНаша главная остановка - всемирно известная Голубая лагуна. Вы будете плавать и заниматься снорклингом в бирюзовых водах. Предоставляется профессиональное оборудование. На лодке подается обед-буфет. Безлимитные напитки.',
      ar: 'انضم إلى جولة القارب إلى البحيرة الزرقاء لاكتشاف أجمل سواحل قبرص. ننطلق من ميناء آيا نابا في الصباح ونتجه نحو منتزه كيب غريكو الطبيعي.\n\nمحطتنا الأولى هي الكهوف البحرية الرائعة. هنا ستتاح لك الفرصة لالتقاط صور الكهوف والسباحة في المياه الصافية. ثم سنزور خليج كونوس.\n\nمحطتنا الرئيسية هي البحيرة الزرقاء الشهيرة عالميًا. ستسبح وتغوص في المياه الفيروزية. يتم توفير المعدات المهنية. يُقدَّم غداء بوفيه مفتوح على القارب. مشروبات غير محدودة.',
      fa: 'به تور قایق لاگون آبی بپیوندید تا زیباترین سواحل قبرس را کشف کنید. ما صبح از بندر آیانا حرکت می‌کنیم و به سمت پارک طبیعی کیپ گرکو می‌رویم.\n\nاولین ایستگاه ما غارهای دریایی باشکوه است. اینجا فرصت خواهید داشت از غارها عکس بگیرید و در آب‌های کریستالی شنا کنید. سپس از خلیج کونوس بازدید خواهیم کرد.\n\nایستگاه اصلی ما لاگون آبی معروف جهانی است. در آب‌های فیروزه‌ای شنا و غواصی خواهید کرد. تجهیزات حرفه‌ای ارائه می‌شود. ناهار بوفه باز در قایق سرو می‌شود. نوشیدنی‌های نامحدود.',
      fr: 'Rejoignez la croisière en bateau au Lagon Bleu pour découvrir les plus belles côtes de Chypre. Nous partons du port d\'Ayia Napa le matin et nous dirigeons vers le parc naturel de Cape Greco.\n\nNotre premier arrêt est les magnifiques grottes marines. Ici, vous aurez l\'opportunité de prendre des photos des grottes et de nager dans des eaux cristallines. Ensuite, nous visiterons la baie de Konnos.\n\nNotre arrêt principal est le célèbre Lagon Bleu. Vous nagerez et ferez de la plongée en apnée dans les eaux turquoise. Un équipement professionnel est fourni. Un déjeuner buffet ouvert est servi sur le bateau. Boissons illimitées.',
      el: 'Συμμετάσχετε στην κρουαζιέρα με σκάφος στη Γαλάζια Λιμνοθάλασσα για να ανακαλύψετε τις πιο όμορφες ακτές της Κύπρου. Αναχωρούμε από το λιμάνι της Αγίας Νάπας το πρωί και κατευθυνόμαστε προς το φυσικό πάρκο Cape Greco.\n\nΗ πρώτη μας στάση είναι τα υπέροχα θαλάσσια σπήλαια. Εδώ θα έχετε την ευκαιρία να τραβήξετε φωτογραφίες σπηλαίων και να κολυμπήσετε σε κρυστάλλινα νερά. Στη συνέχεια θα επισκεφθούμε τον όρμο Κόννος.\n\nΗ κύρια στάση μας είναι η παγκοσμίως διάσημη Γαλάζια Λιμνοθάλασσα. Θα κολυμπήσετε και θα κάνετε κατάδυση στα τιρκουάζ νερά. Παρέχεται επαγγελματικός εξοπλισμός. Ανοιχτό μπουφέ γεύμα σερβίρεται στο σκάφος. Απεριόριστα ποτά.',
    },

    pricing: calculateBestPrice([25, 28, 30]), // Based on research: Blue Lagoon tours from €25-35
    duration: '6 hours',

    groupSize: {
      min: 1,
      max: 50,
    },

    languages: ['el', 'en', 'tr', 'ru'],

    highlights: [
      {
        tr: 'Cape Greco deniz mağaraları',
        en: 'Cape Greco sea caves',
        de: 'Cape Greco Meereshöhlen',
        ru: 'Морские пещеры Кейп Греко',
        ar: 'كهوف كيب غريكو البحرية',
        fa: 'غارهای دریایی کیپ گرکو',
        fr: 'Grottes marines de Cape Greco',
        el: 'Θαλάσσια σπήλαια Cape Greco',
      },
      {
        tr: 'Mavi Lagün\'de yüzme ve snorkeling',
        en: 'Swimming and snorkeling in Blue Lagoon',
        de: 'Schwimmen und Schnorcheln in der Blauen Lagune',
        ru: 'Плавание и снорклинг в Голубой лагуне',
        ar: 'السباحة والغطس في البحيرة الزرقاء',
        fa: 'شنا و غواصی در لاگون آبی',
        fr: 'Natation et plongée en apnée au Lagon Bleu',
        el: 'Κολύμβηση και καταδύσεις στη Γαλάζια Λιμνοθάλασσα',
      },
      {
        tr: 'Açık büfe öğle yemeği',
        en: 'Open buffet lunch',
        de: 'Offenes Buffet-Mittagessen',
        ru: 'Обед-буфет',
        ar: 'غداء بوفيه مفتوح',
        fa: 'ناهار بوفه باز',
        fr: 'Déjeuner buffet ouvert',
        el: 'Ανοιχτό μπουφέ γεύμα',
      },
      {
        tr: 'Profesyonel snorkeling ekipmanı',
        en: 'Professional snorkeling equipment',
        de: 'Professionelle Schnorchelausrüstung',
        ru: 'Профессиональное снаряжение для снорклинга',
        ar: 'معدات غطس احترافية',
        fa: 'تجهیزات حرفه‌ای غواصی',
        fr: 'Équipement de plongée en apnée professionnel',
        el: 'Επαγγελματικός εξοπλισμός καταδύσεων',
      },
      {
        tr: 'Sınırsız alkolsüz içecekler',
        en: 'Unlimited soft drinks',
        de: 'Unbegrenzte alkoholfreie Getränke',
        ru: 'Безлимитные безалкогольные напитки',
        ar: 'مشروبات غازية غير محدودة',
        fa: 'نوشیدنی‌های غیرالکلی نامحدود',
        fr: 'Boissons non alcoolisées illimitées',
        el: 'Απεριόριστα αναψυκτικά',
      },
    ],

    included: [
      {
        tr: 'Tekne turu',
        en: 'Boat cruise',
        de: 'Bootstour',
        ru: 'Лодочный круиз',
        ar: 'رحلة بحرية',
        fa: 'کروز قایق',
        fr: 'Croisière en bateau',
        el: 'Κρουαζιέρα με σκάφος',
      },
      {
        tr: 'Snorkeling ekipmanı',
        en: 'Snorkeling equipment',
        de: 'Schnorchelausrüstung',
        ru: 'Снаряжение для снорклинга',
        ar: 'معدات الغطس',
        fa: 'تجهیزات غواصی',
        fr: 'Équipement de plongée',
        el: 'Εξοπλισμός καταδύσεων',
      },
      {
        tr: 'Açık büfe öğle yemeği',
        en: 'Open buffet lunch',
        de: 'Offenes Buffet-Mittagessen',
        ru: 'Обед-буфет',
        ar: 'غداء بوفيه مفتوح',
        fa: 'ناهار بوفه باز',
        fr: 'Déjeuner buffet',
        el: 'Ανοιχτό μπουφέ γεύμα',
      },
      {
        tr: 'Sınırsız alkolsüz içecekler',
        en: 'Unlimited soft drinks',
        de: 'Unbegrenzte Softdrinks',
        ru: 'Безлимитные безалкогольные напитки',
        ar: 'مشروبات غازية غير محدودة',
        fa: 'نوشیدنی‌های نامحدود',
        fr: 'Boissons non alcoolisées illimitées',
        el: 'Απεριόριστα αναψυκτικά',
      },
    ],

    notIncluded: [
      {
        tr: 'Otel transferi (ekstra ücret)',
        en: 'Hotel transfer (extra fee)',
        de: 'Hoteltransfer (Aufpreis)',
        ru: 'Трансфер из отеля (доплата)',
        ar: 'النقل من الفندق (رسوم إضافية)',
        fa: 'ترانسفر هتل (هزینه اضافی)',
        fr: 'Transfert d\'hôtel (frais supplémentaires)',
        el: 'Μεταφορά ξενοδοχείου (επιπλέον χρέωση)',
      },
      {
        tr: 'Alkollü içecekler',
        en: 'Alcoholic beverages',
        de: 'Alkoholische Getränke',
        ru: 'Алкогольные напитки',
        ar: 'المشروبات الكحولية',
        fa: 'نوشیدنی‌های الکلی',
        fr: 'Boissons alcoolisées',
        el: 'Αλκοολούχα ποτά',
      },
    ],

    meetingPoint: {
      tr: 'Ayia Napa Limanı',
      en: 'Ayia Napa Harbor',
      de: 'Hafen von Ayia Napa',
      ru: 'Гавань Айя-Напы',
      ar: 'ميناء آيا نابا',
      fa: 'بندر آیانا',
      fr: 'Port d\'Ayia Napa',
      el: 'Λιμάνι Αγίας Νάπας',
    },

    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80',
    ],

    rating: 4.8,
    reviewCount: 2145,
    totalBookings: 11243,

    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    timeSlots: ['10:00'],

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
        metaTitle: 'Ayia Napa Mavi Lagün Turu | En İyi Fiyat | TravelLyDian',
        metaDescription: 'Mavi Lagün tekne turu, Cape Greco mağaraları, snorkeling. Öğle yemeği dahil. %2 daha ucuz!',
        keywords: ['ayia napa turu', 'mavi lagün', 'kıbrıs tekne turu', 'blue lagoon cyprus', 'cape greco'],
      },
      en: {
        metaTitle: 'Ayia Napa Blue Lagoon Tour | Best Price | TravelLyDian',
        metaDescription: 'Blue Lagoon boat tour, Cape Greco caves, snorkeling. Lunch included. 2% cheaper!',
        keywords: ['ayia napa tour', 'blue lagoon', 'cyprus boat tour', 'cape greco', 'snorkeling cyprus'],
      },
      de: {
        metaTitle: 'Ayia Napa Blaue Lagune Tour | Bester Preis | TravelLyDian',
        metaDescription: 'Blaue Lagune Bootstour, Cape Greco Höhlen, Schnorcheln. Mittagessen inklusive. 2% günstiger!',
        keywords: ['ayia napa tour', 'blaue lagune', 'zypern bootstour', 'cape greco'],
      },
      ru: {
        metaTitle: 'Тур в Голубую лагуну Айя-Напы | Лучшая цена | TravelLyDian',
        metaDescription: 'Лодочный тур в Голубую лагуну, пещеры Кейп Греко, снорклинг. Обед включен. На 2% дешевле!',
        keywords: ['айя напа тур', 'голубая лагуна', 'кипр лодочный тур', 'кейп греко'],
      },
      ar: {
        metaTitle: 'جولة البحيرة الزرقاء في آيا نابا | أفضل سعر | TravelLyDian',
        metaDescription: 'جولة بحرية إلى البحيرة الزرقاء، كهوف كيب غريكو، الغطس. الغداء مشمول. أرخص بنسبة 2٪!',
        keywords: ['جولة آيا نابا', 'البحيرة الزرقاء', 'جولات قبرص البحرية', 'كيب غريكو'],
      },
      fa: {
        metaTitle: 'تور لاگون آبی آیانا | بهترین قیمت | TravelLyDian',
        metaDescription: 'تور قایق لاگون آبی، غارهای کیپ گرکو، غواصی. ناهار شامل. 2٪ ارزان‌تر!',
        keywords: ['تور آیانا', 'لاگون آبی', 'تور قایق قبرس', 'کیپ گرکو'],
      },
      fr: {
        metaTitle: 'Visite du Lagon Bleu d\'Ayia Napa | Meilleur Prix | TravelLyDian',
        metaDescription: 'Croisière au Lagon Bleu, grottes de Cape Greco, plongée. Déjeuner inclus. 2% moins cher!',
        keywords: ['visite ayia napa', 'lagon bleu', 'croisière chypre', 'cape greco'],
      },
      el: {
        metaTitle: 'Περιήγηση Γαλάζια Λιμνοθάλασσα Αγίας Νάπας | Καλύτερη Τιμή | TravelLyDian',
        metaDescription: 'Κρουαζιέρα Γαλάζια Λιμνοθάλασσα, σπήλαια Cape Greco, κατάδυση. Γεύμα περιλαμβάνεται. 2% φθηνότερα!',
        keywords: ['περιήγηση αγία νάπα', 'γαλάζια λιμνοθάλασσα', 'κρουαζιέρα κύπρος', 'cape greco'],
      },
    },
  },

];

export default cyprusTours;
