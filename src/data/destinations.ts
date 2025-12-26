/**
 * Destinations Data for Explore Pages
 * Complete destination information with multi-language support
 */

export interface Destination {
  id: string;
  slug: string;
  region: string;
  coordinates: { lat: number; lng: number };
  images: {
    hero: string;
    gallery: string[];
  };
  translations: {
    tr: DestinationContent;
    en: DestinationContent;
    de: DestinationContent;
    ru: DestinationContent;
    ar: DestinationContent;
    fa: DestinationContent;
    fr: DestinationContent;
  };
  stats: {
    tours: number;
    hotels: number;
    restaurants: number;
    attractions: number;
  };
  weather: {
    avgTemp: { summer: number; winter: number };
    rainyDays: number;
    bestMonths: string[];
  };
  topAttractions: string[];
  nearbyDestinations: string[];
}

export interface DestinationContent {
  name: string;
  tagline: string;
  description: string;
  overview: string;
  bestFor: string[];
  thingsToDo: {
    title: string;
    items: { name: string; description: string }[];
  };
  whereToStay: {
    title: string;
    recommendations: string[];
  };
  howToGetAround: {
    title: string;
    options: { mode: string; description: string }[];
  };
  localTips: {
    title: string;
    tips: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const destinations: Destination[] = [
  {
    id: 'antalya',
    slug: 'antalya',
    region: 'Mediterranean',
    coordinates: { lat: 36.8969, lng: 30.7133 },
    images: {
      hero: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1588421357574-87938a86fa28?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1541969187011-88a2137a7c5e?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    stats: {
      tours: 156,
      hotels: 892,
      restaurants: 1240,
      attractions: 67
    },
    weather: {
      avgTemp: { summer: 32, winter: 15 },
      rainyDays: 78,
      bestMonths: ['April', 'May', 'June', 'September', 'October']
    },
    topAttractions: [
      'Hadrian\'s Gate',
      'Old Town Kaleiçi',
      'Düden Waterfalls',
      'Aspendos Theatre',
      'Perge Ancient City'
    ],
    nearbyDestinations: ['lara', 'belek', 'side', 'kemer'],
    translations: {
      tr: {
        name: 'Antalya',
        tagline: 'Türk Rivierası\'nın İncisi',
        description: 'Turkuaz Akdeniz\'le buluşan antik şehir, doğal güzellikler ve modern lüks',
        overview: 'Antalya, Türkiye\'nin en popüler tatil destinasyonlarından biridir. Antik kentler, muhteşem plajlar, doğal güzellikler ve modern lüks otelleriyle her yıl milyonlarca ziyaretçiyi ağırlıyor. Kaleiçi tarihi bölgesi, Düden Şelaleleri ve bölgedeki antik kentler görülmeye değer.',
        bestFor: ['Plaj Tatili', 'Aile Tatili', 'Kültür Turu', 'Su Sporları', 'Balayı'],
        thingsToDo: {
          title: 'Yapılacak Şeyler',
          items: [
            { name: 'Kaleiçi Gezisi', description: 'Tarihi Antalya\'nın dar sokaklarında yürüyüş' },
            { name: 'Düden Şelaleleri', description: 'İki muhteşem şelaleyi keşfedin' },
            { name: 'Tekne Turu', description: 'Akdeniz\'de gün batımı turu' },
            { name: 'Aspendos Tiyatrosu', description: 'Antik Roma tiyatrosunu ziyaret edin' },
            { name: 'Aquapark', description: 'Ailecek su parkı eğlencesi' }
          ]
        },
        whereToStay: {
          title: 'Nerede Kalınır',
          recommendations: [
            'Lara: Lüks all-inclusive oteller',
            'Kaleiçi: Butik oteller ve pansiyonlar',
            'Konyaaltı: Şehir manzaralı oteller',
            'Kundu: Premium resortlar'
          ]
        },
        howToGetAround: {
          title: 'Nasıl Gezilebilir',
          options: [
            { mode: 'Tramvay', description: 'Şehir içi ulaşım için ekonomik ve hızlı' },
            { mode: 'Dolmuş', description: 'Tüm bölgelere ulaşan minibüsler' },
            { mode: 'Taksi', description: 'Konforlu ancak pahalı seçenek' },
            { mode: 'Araç Kiralama', description: 'Özgürce keşfetmek için ideal' }
          ]
        },
        localTips: {
          title: 'Yerel İpuçları',
          tips: [
            'Aspendos tiyatrosunu akşam konser saatinde ziyaret edin',
            'Kaleiçi\'nde kahvaltı için sokak kafelerini deneyin',
            'Düden Şelalesi\'ne sabah erken saatlerde gidin (daha az kalabalık)',
            'Konyaaltı plajı yerel halkın favorisi',
            'Karpuzkaldıran pazarı Cumartesi günleri kurulur'
          ]
        },
        seo: {
          metaTitle: 'Antalya Rehberi 2024 | Gezilecek Yerler, Turlar ve Oteller',
          metaDescription: 'Antalya\'da yapılacak en iyi şeyler, gezilecek yerler ve konaklama önerileri. Turlar, aktiviteler ve seyahat rehberi.',
          keywords: ['antalya', 'antalya turları', 'antalya otelleri', 'antalya gezilecek yerler', 'kaleiçi', 'düden şelalesi']
        }
      },
      en: {
        name: 'Antalya',
        tagline: 'Pearl of the Turkish Riviera',
        description: 'Ancient city meets turquoise Mediterranean, natural beauty and modern luxury',
        overview: 'Antalya is one of Turkey\'s most popular holiday destinations. With ancient cities, magnificent beaches, natural beauties and modern luxury hotels, it welcomes millions of visitors every year. The historic Kaleiçi district, Düden Waterfalls and the ancient cities in the region are worth seeing.',
        bestFor: ['Beach Holiday', 'Family Vacation', 'Culture Tour', 'Water Sports', 'Honeymoon'],
        thingsToDo: {
          title: 'Things to Do',
          items: [
            { name: 'Kaleiçi Tour', description: 'Walk through the narrow streets of historic Antalya' },
            { name: 'Düden Waterfalls', description: 'Discover two magnificent waterfalls' },
            { name: 'Boat Tour', description: 'Sunset cruise on the Mediterranean' },
            { name: 'Aspendos Theatre', description: 'Visit the ancient Roman theatre' },
            { name: 'Aquapark', description: 'Family water park fun' }
          ]
        },
        whereToStay: {
          title: 'Where to Stay',
          recommendations: [
            'Lara: Luxury all-inclusive hotels',
            'Kaleiçi: Boutique hotels and guesthouses',
            'Konyaaltı: Hotels with city views',
            'Kundu: Premium resorts'
          ]
        },
        howToGetAround: {
          title: 'How to Get Around',
          options: [
            { mode: 'Tram', description: 'Economical and fast for city transport' },
            { mode: 'Dolmuş', description: 'Minibuses reaching all areas' },
            { mode: 'Taxi', description: 'Comfortable but expensive option' },
            { mode: 'Car Rental', description: 'Ideal for exploring freely' }
          ]
        },
        localTips: {
          title: 'Local Tips',
          tips: [
            'Visit Aspendos theatre during evening concert hours',
            'Try street cafes for breakfast in Kaleiçi',
            'Go to Düden Waterfall early in the morning (less crowded)',
            'Konyaaltı beach is a local favorite',
            'Karpuzkaldıran market is open on Saturdays'
          ]
        },
        seo: {
          metaTitle: 'Antalya Travel Guide 2024 | Best Things to Do, Tours & Hotels',
          metaDescription: 'Best things to do in Antalya, places to visit and accommodation recommendations. Tours, activities and travel guide.',
          keywords: ['antalya', 'antalya tours', 'antalya hotels', 'things to do antalya', 'kaleici', 'duden waterfall']
        }
      },
      de: {
        name: 'Antalya',
        tagline: 'Perle der Türkischen Riviera',
        description: 'Antike Stadt trifft auf türkisfarbenes Mittelmeer, Naturschönheiten und modernen Luxus',
        overview: 'Antalya ist eines der beliebtesten Urlaubsziele der Türkei. Mit antiken Städten, herrlichen Stränden, Naturschönheiten und modernen Luxushotels empfängt es jedes Jahr Millionen von Besuchern.',
        bestFor: ['Strandurlaub', 'Familienurlaub', 'Kulturtour', 'Wassersport', 'Flitterwochen'],
        thingsToDo: {
          title: 'Unternehmungen',
          items: [
            { name: 'Kaleiçi-Tour', description: 'Spazieren Sie durch die engen Gassen des historischen Antalya' },
            { name: 'Düden-Wasserfälle', description: 'Entdecken Sie zwei herrliche Wasserfälle' },
            { name: 'Bootstour', description: 'Sonnenuntergangskreuzfahrt auf dem Mittelmeer' },
            { name: 'Aspendos-Theater', description: 'Besuchen Sie das antike römische Theater' },
            { name: 'Aquapark', description: 'Familienspaß im Wasserpark' }
          ]
        },
        whereToStay: {
          title: 'Unterkunft',
          recommendations: [
            'Lara: Luxus-All-Inclusive-Hotels',
            'Kaleiçi: Boutique-Hotels und Pensionen',
            'Konyaaltı: Hotels mit Stadtblick',
            'Kundu: Premium-Resorts'
          ]
        },
        howToGetAround: {
          title: 'Fortbewegung',
          options: [
            { mode: 'Straßenbahn', description: 'Wirtschaftlich und schnell für den Stadtverkehr' },
            { mode: 'Dolmuş', description: 'Minibusse in alle Bereiche' },
            { mode: 'Taxi', description: 'Bequeme aber teure Option' },
            { mode: 'Mietwagen', description: 'Ideal für freies Erkunden' }
          ]
        },
        localTips: {
          title: 'Lokale Tipps',
          tips: [
            'Besuchen Sie das Aspendos-Theater während der Abendkonzerte',
            'Probieren Sie Straßencafés zum Frühstück in Kaleiçi',
            'Gehen Sie früh morgens zum Düden-Wasserfall (weniger überfüllt)',
            'Konyaaltı-Strand ist ein lokaler Favorit',
            'Karpuzkaldıran-Markt ist samstags geöffnet'
          ]
        },
        seo: {
          metaTitle: 'Antalya Reiseführer 2024 | Beste Aktivitäten, Touren & Hotels',
          metaDescription: 'Beste Aktivitäten in Antalya, Sehenswürdigkeiten und Unterkunftsempfehlungen. Touren, Aktivitäten und Reiseführer.',
          keywords: ['antalya', 'antalya touren', 'antalya hotels', 'antalya aktivitäten', 'kaleici', 'düden wasserfall']
        }
      },
      ru: {
        name: 'Анталья',
        tagline: 'Жемчужина турецкой Ривьеры',
        description: 'Древний город встречается с бирюзовым Средиземноморьем, природная красота и современная роскошь',
        overview: 'Анталья - одно из самых популярных туристических направлений Турции. С древними городами, великолепными пляжами, природными красотами и современными роскошными отелями, он принимает миллионы посетителей каждый год.',
        bestFor: ['Пляжный отдых', 'Семейный отпуск', 'Культурный тур', 'Водные виды спорта', 'Медовый месяц'],
        thingsToDo: {
          title: 'Чем заняться',
          items: [
            { name: 'Тур по Калеичи', description: 'Прогулка по узким улочкам исторической Антальи' },
            { name: 'Водопады Дюден', description: 'Откройте для себя два великолепных водопада' },
            { name: 'Морская прогулка', description: 'Круиз на закате по Средиземному морю' },
            { name: 'Театр Аспендос', description: 'Посетите древний римский театр' },
            { name: 'Аквапарк', description: 'Семейное развлечение в аквапарке' }
          ]
        },
        whereToStay: {
          title: 'Где остановиться',
          recommendations: [
            'Лара: Роскошные отели all-inclusive',
            'Калеичи: Бутик-отели и гостевые дома',
            'Коньяалты: Отели с видом на город',
            'Кунду: Премиум-курорты'
          ]
        },
        howToGetAround: {
          title: 'Как передвигаться',
          options: [
            { mode: 'Трамвай', description: 'Экономичный и быстрый городской транспорт' },
            { mode: 'Долмуш', description: 'Микроавтобусы во все районы' },
            { mode: 'Такси', description: 'Комфортный, но дорогой вариант' },
            { mode: 'Аренда авто', description: 'Идеально для свободного изучения' }
          ]
        },
        localTips: {
          title: 'Местные советы',
          tips: [
            'Посетите театр Аспендос во время вечерних концертов',
            'Попробуйте уличные кафе на завтрак в Калеичи',
            'Идите к водопаду Дюден рано утром (меньше людей)',
            'Пляж Коньяалты - любимый местными жителями',
            'Рынок Карпузкалдыран открыт по субботам'
          ]
        },
        seo: {
          metaTitle: 'Путеводитель по Анталье 2024 | Лучшие развлечения, туры и отели',
          metaDescription: 'Лучшие развлечения в Анталье, места для посещения и рекомендации по размещению. Туры, мероприятия и путеводитель.',
          keywords: ['анталья', 'туры анталья', 'отели анталья', 'что делать анталья', 'калеичи', 'водопад дюден']
        }
      },
      ar: {
        name: 'أنطاليا',
        tagline: 'لؤلؤة الريفيرا التركية',
        description: 'مدينة قديمة تلتقي بالبحر الأبيض المتوسط الفيروزي والجمال الطبيعي والرفاهية الحديثة',
        overview: 'أنطاليا هي واحدة من أكثر الوجهات السياحية شعبية في تركيا. مع المدن القديمة والشواطئ الرائعة والجمال الطبيعي والفنادق الفاخرة الحديثة، تستقبل ملايين الزوار كل عام.',
        bestFor: ['عطلة شاطئية', 'عطلة عائلية', 'جولة ثقافية', 'رياضات مائية', 'شهر العسل'],
        thingsToDo: {
          title: 'أشياء للقيام بها',
          items: [
            { name: 'جولة كاليتشي', description: 'المشي في شوارع أنطاليا التاريخية الضيقة' },
            { name: 'شلالات دودن', description: 'اكتشف شلالين رائعين' },
            { name: 'جولة بالقارب', description: 'رحلة بحرية عند غروب الشمس على البحر المتوسط' },
            { name: 'مسرح أسبندوس', description: 'قم بزيارة المسرح الروماني القديم' },
            { name: 'حديقة مائية', description: 'متعة الحديقة المائية العائلية' }
          ]
        },
        whereToStay: {
          title: 'أين تقيم',
          recommendations: [
            'لارا: فنادق فاخرة شاملة كليًا',
            'كاليتشي: فنادق بوتيك ودور ضيافة',
            'كونيالتي: فنادق بإطلالة على المدينة',
            'كوندو: منتجعات متميزة'
          ]
        },
        howToGetAround: {
          title: 'كيف تتجول',
          options: [
            { mode: 'الترام', description: 'اقتصادي وسريع للنقل في المدينة' },
            { mode: 'دولموش', description: 'حافلات صغيرة تصل إلى جميع المناطق' },
            { mode: 'تاكسي', description: 'خيار مريح لكنه مكلف' },
            { mode: 'تأجير سيارة', description: 'مثالي للاستكشاف بحرية' }
          ]
        },
        localTips: {
          title: 'نصائح محلية',
          tips: [
            'قم بزيارة مسرح أسبندوس خلال ساعات الحفل المسائية',
            'جرب المقاهي في الشوارع لتناول الإفطار في كاليتشي',
            'اذهب إلى شلال دودن في الصباح الباكر (أقل ازدحامًا)',
            'شاطئ كونيالتي المفضل لدى السكان المحليين',
            'سوق كاربوزكالديران مفتوح أيام السبت'
          ]
        },
        seo: {
          metaTitle: 'دليل السفر إلى أنطاليا 2024 | أفضل الأشياء للقيام بها والجولات والفنادق',
          metaDescription: 'أفضل الأشياء للقيام بها في أنطاليا، أماكن للزيارة وتوصيات الإقامة. الجولات والأنشطة ودليل السفر.',
          keywords: ['أنطاليا', 'جولات أنطاليا', 'فنادق أنطاليا', 'ماذا تفعل في أنطاليا', 'كاليتشي', 'شلال دودن']
        }
      },
      fa: {
        name: 'آنتالیا',
        tagline: 'مروارید ریویرای ترکیه',
        description: 'شهر باستانی که با مدیترانه فیروزه‌ای، زیبایی طبیعی و لوکس مدرن ملاقات می‌کند',
        overview: 'آنتالیا یکی از محبوب‌ترین مقاصد تعطیلات ترکیه است. با شهرهای باستانی، سواحل باشکوه، زیبایی‌های طبیعی و هتل‌های لوکس مدرن، سالانه میلیون‌ها بازدیدکننده را می‌پذیرد.',
        bestFor: ['تعطیلات ساحلی', 'تعطیلات خانوادگی', 'تور فرهنگی', 'ورزش‌های آبی', 'ماه عسل'],
        thingsToDo: {
          title: 'کارهایی برای انجام',
          items: [
            { name: 'تور کالِیچی', description: 'پیاده‌روی در خیابان‌های باریک آنتالیای تاریخی' },
            { name: 'آبشارهای دودن', description: 'دو آبشار باشکوه را کشف کنید' },
            { name: 'تور قایق', description: 'کروز غروب آفتاب در مدیترانه' },
            { name: 'تئاتر آسپندوس', description: 'از تئاتر باستانی رومی بازدید کنید' },
            { name: 'پارک آبی', description: 'سرگرمی پارک آبی خانوادگی' }
          ]
        },
        whereToStay: {
          title: 'کجا بمانیم',
          recommendations: [
            'لارا: هتل‌های لوکس همه‌چیز شامل',
            'کالِیچی: هتل‌های بوتیک و مهمانخانه‌ها',
            'کونیالتی: هتل‌ها با نمای شهر',
            'کوندو: ریزورت‌های ممتاز'
          ]
        },
        howToGetAround: {
          title: 'چگونه حرکت کنیم',
          options: [
            { mode: 'تراموا', description: 'اقتصادی و سریع برای حمل و نقل شهری' },
            { mode: 'دولموش', description: 'مینی‌بوس‌های به همه مناطق' },
            { mode: 'تاکسی', description: 'گزینه راحت اما گران' },
            { mode: 'اجاره خودرو', description: 'ایده‌آل برای کاوش آزادانه' }
          ]
        },
        localTips: {
          title: 'نکات محلی',
          tips: [
            'از تئاتر آسپندوس در ساعات کنسرت شب بازدید کنید',
            'کافه‌های خیابانی را برای صبحانه در کالِیچی امتحان کنید',
            'صبح زود به آبشار دودن بروید (شلوغ‌تر نیست)',
            'ساحل کونیالتی محبوب محلی‌ها است',
            'بازار کارپوزکالدیران شنبه‌ها باز است'
          ]
        },
        seo: {
          metaTitle: 'راهنمای سفر آنتالیا 2024 | بهترین کارها، تورها و هتل‌ها',
          metaDescription: 'بهترین کارها در آنتالیا، مکان‌های دیدنی و توصیه‌های اقامت. تورها، فعالیت‌ها و راهنمای سفر.',
          keywords: ['آنتالیا', 'تورهای آنتالیا', 'هتل‌های آنتالیا', 'کارها در آنتالیا', 'کالیچی', 'آبشار دودن']
        }
      },
      fr: {
        name: 'Antalya',
        tagline: 'Perle de la Riviera turque',
        description: 'Ville antique rencontre la Méditerranée turquoise, beauté naturelle et luxe moderne',
        overview: 'Antalya est l\'une des destinations de vacances les plus populaires de Turquie. Avec des villes anciennes, des plages magnifiques, des beautés naturelles et des hôtels de luxe modernes, elle accueille des millions de visiteurs chaque année.',
        bestFor: ['Vacances à la plage', 'Vacances en famille', 'Circuit culturel', 'Sports nautiques', 'Lune de miel'],
        thingsToDo: {
          title: 'Choses à faire',
          items: [
            { name: 'Visite de Kaleiçi', description: 'Promenade dans les ruelles étroites de l\'Antalya historique' },
            { name: 'Cascades de Düden', description: 'Découvrez deux cascades magnifiques' },
            { name: 'Excursion en bateau', description: 'Croisière au coucher du soleil sur la Méditerranée' },
            { name: 'Théâtre d\'Aspendos', description: 'Visitez l\'ancien théâtre romain' },
            { name: 'Parc aquatique', description: 'Amusement familial au parc aquatique' }
          ]
        },
        whereToStay: {
          title: 'Où séjourner',
          recommendations: [
            'Lara: Hôtels de luxe tout compris',
            'Kaleiçi: Hôtels boutique et maisons d\'hôtes',
            'Konyaaltı: Hôtels avec vue sur la ville',
            'Kundu: Stations balnéaires premium'
          ]
        },
        howToGetAround: {
          title: 'Comment se déplacer',
          options: [
            { mode: 'Tramway', description: 'Économique et rapide pour le transport en ville' },
            { mode: 'Dolmuş', description: 'Minibus desservant toutes les zones' },
            { mode: 'Taxi', description: 'Option confortable mais chère' },
            { mode: 'Location de voiture', description: 'Idéal pour explorer librement' }
          ]
        },
        localTips: {
          title: 'Conseils locaux',
          tips: [
            'Visitez le théâtre d\'Aspendos pendant les heures de concert du soir',
            'Essayez les cafés de rue pour le petit-déjeuner à Kaleiçi',
            'Allez à la cascade de Düden tôt le matin (moins de monde)',
            'La plage de Konyaaltı est une favorite locale',
            'Le marché de Karpuzkaldıran est ouvert le samedi'
          ]
        },
        seo: {
          metaTitle: 'Guide de voyage d\'Antalya 2024 | Meilleures choses à faire, circuits et hôtels',
          metaDescription: 'Meilleures choses à faire à Antalya, lieux à visiter et recommandations d\'hébergement. Circuits, activités et guide de voyage.',
          keywords: ['antalya', 'circuits antalya', 'hôtels antalya', 'que faire antalya', 'kaleici', 'cascade düden']
        }
      }
    }
  }
];
