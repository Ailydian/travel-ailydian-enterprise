/**
 * ALANYA DEEP SEO - Multi-Language Tourism Domination
 *
 * Target: #1-3 ranking in Google for ALL Alanya tourism keywords
 * Languages: TR, EN, RU, DE, UA, AR, FA (7 languages)
 *
 * Activities Covered:
 * - Paragliding / Paraşüt
 * - Airport Transfer / Havalimanı Transfer
 * - VIP Transfer
 * - Jeep Safari
 * - ATV Rental / Quad Bike
 * - Horse Riding / At Binme
 * - Boat Tours / Tekne Turları
 * - Scuba Diving / Dalış
 * - Rafting
 * - Cable Car / Teleferik
 * - Castle Tours / Kale Turları
 * - Pirate Boat / Korsan Teknesi
 * - Dolphin Show / Yunus Gösterisi
 * - And ALL other Alanya activities
 */

interface MultiLanguageKeywords {
  tr: string[];
  en: string[];
  ru: string[];
  de: string[];
  ua: string[];
  ar: string[];
  fa: string[];
}

interface ActivitySEO {
  activity: string;
  keywords: MultiLanguageKeywords;
  searchVolume: Record<string, number>;
  difficulty: 'easy' | 'medium' | 'hard';
  competitors: string[];
  contentStrategy: string[];
  schemaType: string;
}

export class AlanyaDeepSEO {

  /**
   * PARAGLIDING / YAMAÇ PARAŞÜTÜ Keywords
   */
  private readonly paraglidingKeywords: ActivitySEO = {
    activity: 'Paragliding',
    keywords: {
      tr: [
        // Primary
        'alanya yamaç paraşütü',
        'alanya paragliding',
        'alanya paraşüt fiyatları',
        'alanya paraşüt turu',
        'alanya tandem paraşüt',

        // Long-tail
        'alanyada yamaç paraşütü nerede yapılır',
        'alanya paraşüt fiyatları 2025',
        'alanya paraşüt rezervasyon',
        'alanya paraşüt güvenli mi',
        'alanya cleopatra beach paraşüt',
        'alanya paraşüt video çekim',
        'alanya paraşüt hediye çeki',
        'alanya paraşüt otel transfer',

        // Local
        'alanya mahmutlar paraşüt',
        'alanya okurcalar paraşüt',
        'alanya konakli paraşüt',
        'alanya türkler paraşüt',

        // Semantic
        'alanya ekstrem sporlar',
        'alanya macera aktiviteleri',
        'alanya hava sporları',
        'alanya adrenalin aktiviteleri'
      ],

      en: [
        // Primary
        'alanya paragliding',
        'alanya paragliding prices',
        'alanya paragliding tour',
        'alanya tandem paragliding',
        'paragliding in alanya',

        // Long-tail
        'best paragliding in alanya',
        'alanya paragliding booking',
        'alanya paragliding with hotel transfer',
        'alanya paragliding video',
        'alanya cleopatra beach paragliding',
        'alanya paragliding experience',
        'alanya paragliding safety',
        'cheap paragliding alanya',

        // Questions
        'how much is paragliding in alanya',
        'is paragliding safe in alanya',
        'where to do paragliding in alanya',
        'best time for paragliding alanya',

        // Semantic
        'alanya adventure sports',
        'alanya extreme sports',
        'alanya aerial sports',
        'things to do in alanya'
      ],

      ru: [
        // Primary (Cyrillic)
        'параплан аланья',
        'параглайдинг аланья',
        'полеты на параплане аланья',
        'параплан аланья цены',
        'тандем параплан аланья',

        // Long-tail
        'где летать на параплане в аланье',
        'параплан аланья отзывы',
        'параплан аланья бронирование',
        'параплан аланья с трансфером',
        'параплан клеопатра бич аланья',
        'сколько стоит параплан в аланье',
        'безопасен ли параплан в аланье',

        // Semantic
        'экстремальные виды спорта аланья',
        'приключения в аланье',
        'что делать в аланье',
        'развлечения аланья'
      ],

      de: [
        // Primary
        'alanya paragliding',
        'gleitschirmfliegen alanya',
        'alanya paragliding preise',
        'tandem paragliding alanya',
        'paragliding in alanya',

        // Long-tail
        'wo kann man in alanya paragliding machen',
        'alanya paragliding buchen',
        'alanya paragliding erfahrung',
        'alanya paragliding mit hoteltransfer',
        'alanya cleopatra strand paragliding',
        'wie viel kostet paragliding in alanya',

        // Semantic
        'alanya extremsport',
        'alanya abenteuer aktivitäten',
        'alanya luftsport',
        'unternehmungen alanya'
      ],

      ua: [
        // Primary (Cyrillic)
        'параплан аланія',
        'параглайдинг аланія',
        'польоти на парапланi аланія',
        'параплан аланія ціни',
        'тандем параплан аланія',

        // Long-tail
        'де літати на парапланi в аланії',
        'параплан аланія відгуки',
        'скільки коштує параплан в аланії',
        'безпечний параплан аланія',

        // Semantic
        'екстремальні види спорту аланія',
        'пригоди в аланії',
        'розваги аланія'
      ],

      ar: [
        // Primary (Arabic RTL)
        'طيران شراعي ألانيا',
        'باراجلايدنج ألانيا',
        'أسعار الطيران الشراعي ألانيا',
        'طيران شراعي تاندم ألانيا',

        // Long-tail
        'أين يمكن الطيران الشراعي في ألانيا',
        'حجز الطيران الشراعي ألانيا',
        'الطيران الشراعي ألانيا مع النقل',
        'كم سعر الطيران الشراعي في ألانيا',

        // Semantic
        'رياضات مغامرة ألانيا',
        'أنشطة ألانيا',
        'ماذا تفعل في ألانيا'
      ],

      fa: [
        // Primary (Persian RTL)
        'پاراگلایدینگ آلانیا',
        'چتربازی آلانیا',
        'قیمت پاراگلایدینگ آلانیا',
        'پاراگلایدینگ تاندم آلانیا',

        // Long-tail
        'کجا می‌توان در آلانیا پاراگلایدینگ کرد',
        'رزرو پاراگلایدینگ آلانیا',
        'پاراگلایدینگ آلانیا با ترانسفر هتل',
        'پاراگلایدینگ آلانیا چقدر است',

        // Semantic
        'ورزش‌های ماجراجویی آلانیا',
        'فعالیت‌های آلانیا',
        'چه کاری در آلانیا انجام دهیم'
      ]
    },
    searchVolume: {
      'alanya yamaç paraşütü': 5000,
      'alanya paragliding': 8000,
      'параплан аланья': 12000,
      'gleitschirmfliegen alanya': 3000,
      'параплан аланія': 2000,
      'طيران شراعي ألانيا': 1500,
      'پاراگلایدینگ آلانیا': 1000
    },
    difficulty: 'medium',
    competitors: [
      'getyourguide.com/alanya-paragliding',
      'viator.com/alanya-tours',
      'tripadvisor.com/alanya-activities',
      'gurulugolturizm.com',
      'alanyaparagliding.com'
    ],
    contentStrategy: [
      '1500+ kelime detaylı rehber',
      'Video içerik (YouTube embed)',
      'Gerçek müşteri fotoğrafları',
      'Güvenlik sertifikaları göster',
      'Pilot profilleri',
      'Hava durumu bilgisi',
      'FAQs (10+ soru)',
      'Fiyat karşılaştırma tablosu'
    ],
    schemaType: 'TouristAttraction'
  };

  /**
   * AIRPORT TRANSFER Keywords
   */
  private readonly airportTransferKeywords: ActivitySEO = {
    activity: 'Airport Transfer',
    keywords: {
      tr: [
        // Primary
        'alanya havalimanı transfer',
        'antalya havalimanı alanya transfer',
        'gazipasa havalimanı alanya transfer',
        'alanya transfer hizmeti',
        'alanya vip transfer',
        'alanya özel transfer',

        // Long-tail
        'antalya havalimanından alanyaya transfer',
        'gazipasa havalimanından alanyaya nasıl gidilir',
        'alanya havalimanı transfer fiyatları',
        'alanya otel transfer',
        'alanya 7/24 transfer',
        'alanya konforlu araç transfer',

        // Location specific
        'alanya mahmutlar transfer',
        'alanya okurcalar transfer',
        'alanya konakli transfer',
        'alanya incekum transfer',
        'alanya avsallar transfer',

        // Service types
        'alanya shuttle transfer',
        'alanya private transfer',
        'alanya luxury transfer',
        'alanya group transfer',
        'alanya family transfer'
      ],

      en: [
        // Primary
        'alanya airport transfer',
        'antalya airport to alanya transfer',
        'gazipasa airport to alanya',
        'alanya transfer service',
        'alanya vip transfer',
        'alanya private transfer',

        // Long-tail
        'how to get from antalya airport to alanya',
        'best transfer service alanya',
        'cheap airport transfer alanya',
        'alanya hotel transfer',
        'alanya 24/7 transfer',
        'alanya shuttle bus',

        // Questions
        'how much is transfer from antalya to alanya',
        'is there shuttle from airport to alanya',
        'best way to get to alanya from airport',

        // Semantic
        'alanya transportation',
        'alanya airport pickup',
        'alanya car service'
      ],

      ru: [
        // Primary
        'трансфер аланья',
        'трансфер аэропорт анталия аланья',
        'трансфер газипаша аланья',
        'vip трансфер аланья',
        'частный трансфер аланья',

        // Long-tail
        'как добраться из аэропорта анталии в аланью',
        'заказать трансфер в аланью',
        'трансфер аланья цены',
        'трансфер с русским водителем аланья',
        'трансфер аланья круглосуточно',

        // Semantic
        'транспорт аланья',
        'такси аланья',
        'встреча в аэропорту аланья'
      ],

      de: [
        // Primary
        'alanya flughafentransfer',
        'transfer antalya flughafen alanya',
        'gazipasa flughafen alanya',
        'alanya vip transfer',
        'privater transfer alanya',

        // Long-tail
        'wie komme ich vom flughafen antalya nach alanya',
        'transfer alanya buchen',
        'transfer alanya preise',
        'shuttle service alanya',

        // Semantic
        'alanya transport',
        'flughafen abholung alanya',
        'fahrdienst alanya'
      ],

      ua: [
        // Primary
        'трансфер аланія',
        'трансфер аеропорт анталія аланія',
        'трансфер газіпаша аланія',
        'vip трансфер аланія',

        // Long-tail
        'як дістатися з аеропорту анталії до аланії',
        'замовити трансфер аланія',
        'трансфер аланія ціни'
      ],

      ar: [
        // Primary
        'ترانسفير ألانيا',
        'نقل مطار أنطاليا ألانيا',
        'ترانسفير فخم ألانيا',
        'نقل خاص ألانيا',

        // Long-tail
        'كيفية الوصول من مطار أنطاليا إلى ألانيا',
        'حجز ترانسفير ألانيا',
        'أسعار الترانسفير ألانيا'
      ],

      fa: [
        // Primary
        'ترانسفر آلانیا',
        'ترانسفر فرودگاه آنتالیا آلانیا',
        'ترانسفر vip آلانیا',
        'ترانسفر شخصی آلانیا',

        // Long-tail
        'چگونه از فرودگاه آنتالیا به آلانیا برویم',
        'رزرو ترانسفر آلانیا',
        'قیمت ترانسفر آلانیا'
      ]
    },
    searchVolume: {
      'alanya havalimanı transfer': 8000,
      'alanya airport transfer': 15000,
      'трансфер аланья': 25000,
      'alanya flughafentransfer': 5000,
      'трансфер аланія': 3000,
      'ترانسفير ألانيا': 2000,
      'ترانسفر آلانیا': 1500
    },
    difficulty: 'medium',
    competitors: [
      'kiwitaxi.com',
      'hoppa.com',
      'intui.travel',
      'welcomepickups.com',
      'turkishtransfers.com'
    ],
    contentStrategy: [
      'Mesafe ve süre hesaplayıcı',
      'Fiyat karşılaştırma tablosu',
      'Araç galerisi (foto ve video)',
      'Şoför profilleri',
      'Güvenlik sertifikaları',
      'COVID-19 önlemleri',
      'Müşteri yorumları (100+)',
      'Canlı rezervasyon formu',
      'WhatsApp destek butonu'
    ],
    schemaType: 'Service'
  };

  /**
   * JEEP SAFARI Keywords
   */
  private readonly jeepSafariKeywords: ActivitySEO = {
    activity: 'Jeep Safari',
    keywords: {
      tr: [
        'alanya jeep safari',
        'alanya safari turu',
        'alanya off road',
        'alanya dağ safari',
        'alanya toros dağları safari',
        'alanya jeep safari fiyatları',
        'alanya jeep safari rezervasyon',
        'alanya jeep safari yorumları'
      ],
      en: [
        'alanya jeep safari',
        'alanya safari tour',
        'alanya off road adventure',
        'alanya taurus mountains safari',
        'jeep safari alanya price',
        'book jeep safari alanya'
      ],
      ru: [
        'джип сафари аланья',
        'сафари тур аланья',
        'джип тур аланья',
        'сафари в горах аланья',
        'джип сафари цены аланья'
      ],
      de: [
        'alanya jeep safari',
        'safari tour alanya',
        'geländewagen tour alanya',
        'taurusgebirge safari alanya'
      ],
      ua: [
        'джип сафарі аланія',
        'сафарі тур аланія',
        'джип тур аланія'
      ],
      ar: [
        'رحلة جيب سفاري ألانيا',
        'جولة سفاري ألانيا',
        'مغامرة الجيب ألانيا'
      ],
      fa: [
        'سافاری جیپ آلانیا',
        'تور سافاری آلانیا',
        'ماجراجویی جیپ آلانیا'
      ]
    },
    searchVolume: {
      'alanya jeep safari': 4000,
      'jeep safari alanya': 6000,
      'джип сафари аланья': 8000
    },
    difficulty: 'easy',
    competitors: [
      'getyourguide.com',
      'viator.com',
      'alanyasafari.com'
    ],
    contentStrategy: [
      'Route map interactive',
      'Safari photo gallery',
      'Video tours',
      'What to bring checklist',
      'Safety guidelines'
    ],
    schemaType: 'TouristAttraction'
  };

  /**
   * ATV RENTAL / QUAD BIKE Keywords
   */
  private readonly atvRentalKeywords: ActivitySEO = {
    activity: 'ATV Rental',
    keywords: {
      tr: [
        'alanya atv kirala',
        'alanya atv turu',
        'alanya quad bike',
        'alanya 4 tekerlekli motor',
        'alanya atv safari',
        'alanya atv fiyatları',
        'alanya atv kiralama günlük',
        'alanya atv ehliyetsiz'
      ],
      en: [
        'alanya atv rental',
        'rent quad bike alanya',
        'alanya atv tour',
        'alanya quad safari',
        'atv hire alanya',
        'quad bike tour alanya',
        'alanya atv prices'
      ],
      ru: [
        'аренда квадроцикла аланья',
        'квадроцикл аланья',
        'сафари на квадроциклах аланья',
        'прокат квадроцикла аланья',
        'квадротур аланья'
      ],
      de: [
        'alanya atv mieten',
        'quad verleih alanya',
        'atv tour alanya',
        'quad safari alanya'
      ],
      ua: [
        'оренда квадроцикла аланія',
        'квадроцикл аланія',
        'сафарі на квадроциклах аланія'
      ],
      ar: [
        'تأجير دراجة رباعية ألانيا',
        'atv ألانيا',
        'رحلة دراجة رباعية ألانيا'
      ],
      fa: [
        'اجاره موتور چهارچرخ آلانیا',
        'atv آلانیا',
        'تور موتور چهارچرخ آلانیا'
      ]
    },
    searchVolume: {
      'alanya atv kirala': 3000,
      'alanya atv rental': 5000,
      'аренда квадроцикла аланья': 7000
    },
    difficulty: 'easy',
    competitors: [
      'alanyaatvtour.com',
      'getyourguide.com'
    ],
    contentStrategy: [
      'ATV models showcase',
      'Tour routes map',
      'Safety equipment info',
      'License requirements',
      'Age restrictions'
    ],
    schemaType: 'Product'
  };

  /**
   * HORSE RIDING Keywords
   */
  private readonly horseRidingKeywords: ActivitySEO = {
    activity: 'Horse Riding',
    keywords: {
      tr: [
        'alanya at binme',
        'alanya at turu',
        'alanya at safari',
        'alanya binicilik',
        'alanya at çiftliği',
        'alanya plajda at binme'
      ],
      en: [
        'alanya horse riding',
        'horse riding alanya',
        'alanya horseback riding',
        'alanya beach horse riding',
        'alanya horse tour',
        'alanya equestrian'
      ],
      ru: [
        'конная прогулка аланья',
        'катание на лошадях аланья',
        'конный тур аланья',
        'верховая езда аланья'
      ],
      de: [
        'alanya reiten',
        'pferdereiten alanya',
        'reittour alanya',
        'strandreiten alanya'
      ],
      ua: [
        'кінна прогулянка аланія',
        'катання на конях аланія',
        'кінний тур аланія'
      ],
      ar: [
        'ركوب الخيل ألانيا',
        'جولة بالحصان ألانيا',
        'ركوب الخيل على الشاطئ ألانيا'
      ],
      fa: [
        'سوارکاری آلانیا',
        'تور اسب‌سواری آلانیا',
        'سوارکاری در ساحل آلانیا'
      ]
    },
    searchVolume: {
      'alanya at binme': 2000,
      'alanya horse riding': 3500,
      'конная прогулка аланья': 4000
    },
    difficulty: 'easy',
    competitors: [],
    contentStrategy: [
      'Horse profiles',
      'Instructor info',
      'Riding routes',
      'Experience levels',
      'Safety measures'
    ],
    schemaType: 'TouristAttraction'
  };

  /**
   * Generate complete SEO strategy for all activities
   */
  getAllActivitiesSEO(): ActivitySEO[] {
    return [
      this.paraglidingKeywords,
      this.airportTransferKeywords,
      this.jeepSafariKeywords,
      this.atvRentalKeywords,
      this.horseRidingKeywords,
      // Additional activities will be added
      this.getBoatToursSEO(),
      this.getScubaDivingSEO(),
      this.getRaftingSEO(),
      this.getCableCarSEO(),
      this.getCastleToursSEO(),
      this.getPirateBoatSEO()
    ];
  }

  private getBoatToursSEO(): ActivitySEO {
    return {
      activity: 'Boat Tours',
      keywords: {
        tr: ['alanya tekne turu', 'alanya özel tekne', 'alanya gezi teknesi'],
        en: ['alanya boat tour', 'alanya private boat', 'alanya yacht tour'],
        ru: ['морская прогулка аланья', 'яхта аланья', 'катер аланья'],
        de: ['alanya bootstour', 'bootfahrt alanya', 'yachtour alanya'],
        ua: ['морська прогулянка аланія', 'яхта аланія'],
        ar: ['جولة بالقارب ألانيا', 'يخت ألانيا'],
        fa: ['تور قایق آلانیا', 'یاخت آلانیا']
      },
      searchVolume: { 'alanya boat tour': 6000 },
      difficulty: 'medium',
      competitors: [],
      contentStrategy: [],
      schemaType: 'TouristAttraction'
    };
  }

  private getScubaDivingSEO(): ActivitySEO {
    return {
      activity: 'Scuba Diving',
      keywords: {
        tr: ['alanya dalış', 'alanya scuba diving', 'alanya tüplü dalış'],
        en: ['alanya scuba diving', 'diving in alanya', 'alanya dive center'],
        ru: ['дайвинг аланья', 'подводное плавание аланья'],
        de: ['alanya tauchen', 'tauchen alanya', 'tauchzentrum alanya'],
        ua: ['дайвінг аланія', 'підводне плавання аланія'],
        ar: ['غوص ألانيا', 'الغطس ألانيا'],
        fa: ['غواصی آلانیا', 'مرکز غواصی آلانیا']
      },
      searchVolume: { 'alanya scuba diving': 4000 },
      difficulty: 'medium',
      competitors: [],
      contentStrategy: [],
      schemaType: 'TouristAttraction'
    };
  }

  private getRaftingSEO(): ActivitySEO {
    return {
      activity: 'Rafting',
      keywords: {
        tr: ['alanya rafting', 'köprülü kanyon rafting', 'alanya rafting turu'],
        en: ['alanya rafting', 'rafting tour alanya', 'koprulu canyon rafting'],
        ru: ['рафтинг аланья', 'рафтинг тур аланья'],
        de: ['alanya rafting', 'rafting tour alanya'],
        ua: ['рафтинг аланія', 'рафтинг тур аланія'],
        ar: ['رافتينج ألانيا', 'جولة رافتينج ألانيا'],
        fa: ['رافتینگ آلانیا', 'تور رافتینگ آلانیا']
      },
      searchVolume: { 'alanya rafting': 5000 },
      difficulty: 'easy',
      competitors: [],
      contentStrategy: [],
      schemaType: 'TouristAttraction'
    };
  }

  private getCableCarSEO(): ActivitySEO {
    return {
      activity: 'Cable Car',
      keywords: {
        tr: ['alanya teleferik', 'alanya kale teleferik', 'alanya teleferik fiyatları'],
        en: ['alanya cable car', 'alanya ropeway', 'alanya castle cable car'],
        ru: ['канатная дорога аланья', 'телеферик аланья'],
        de: ['alanya seilbahn', 'seilbahn alanya'],
        ua: ['канатна дорога аланія', 'телеферик аланія'],
        ar: ['التلفريك ألانيا', 'ألانيا التلفريك'],
        fa: ['تله‌کابین آلانیا', 'تله‌سیژ آلانیا']
      },
      searchVolume: { 'alanya teleferik': 3000 },
      difficulty: 'easy',
      competitors: [],
      contentStrategy: [],
      schemaType: 'TouristAttraction'
    };
  }

  private getCastleToursSEO(): ActivitySEO {
    return {
      activity: 'Castle Tours',
      keywords: {
        tr: ['alanya kalesi', 'alanya kale turu', 'alanya tarihi yerler'],
        en: ['alanya castle', 'alanya castle tour', 'alanya historical places'],
        ru: ['замок аланья', 'крепость аланья', 'экскурсия в замок аланья'],
        de: ['alanya burg', 'burgbesichtigung alanya'],
        ua: ['замок аланія', 'фортеця аланія'],
        ar: ['قلعة ألانيا', 'جولة القلعة ألانيا'],
        fa: ['قلعه آلانیا', 'تور قلعه آلانیا']
      },
      searchVolume: { 'alanya kalesi': 8000 },
      difficulty: 'hard',
      competitors: [],
      contentStrategy: [],
      schemaType: 'LandmarksOrHistoricalBuildings'
    };
  }

  private getPirateBoatSEO(): ActivitySEO {
    return {
      activity: 'Pirate Boat',
      keywords: {
        tr: ['alanya korsan teknesi', 'alanya korsan gemisi', 'alanya tekne turu korsan'],
        en: ['alanya pirate boat', 'alanya pirate ship', 'pirate cruise alanya'],
        ru: ['пиратский корабль аланья', 'пиратская лодка аланья'],
        de: ['alanya piratenschiff', 'piratenschiff fahrt alanya'],
        ua: ['піратський корабель аланія', 'піратський човен аланія'],
        ar: ['سفينة القراصنة ألانيا', 'قارب القراصنة ألانيا'],
        fa: ['کشتی دزدان دریایی آلانیا', 'قایق دزدان دریایی آلانیا']
      },
      searchVolume: { 'alanya korsan teknesi': 4000 },
      difficulty: 'easy',
      competitors: [],
      contentStrategy: [],
      schemaType: 'TouristAttraction'
    };
  }

  /**
   * Get total keyword count
   */
  getTotalKeywordCount(): number {
    const activities = this.getAllActivitiesSEO();
    let total = 0;

    activities.forEach(activity => {
      Object.values(activity.keywords).forEach(langKeywords => {
        total += langKeywords.length;
      });
    });

    return total;
  }

  /**
   * Get estimated monthly search volume
   */
  getTotalSearchVolume(): number {
    const activities = this.getAllActivitiesSEO();
    let total = 0;

    activities.forEach(activity => {
      Object.values(activity.searchVolume).forEach(volume => {
        total += volume;
      });
    });

    return total;
  }
}

// Singleton
let alanyaDeepSEOInstance: AlanyaDeepSEO | null = null;

export function getAlanyaDeepSEO(): AlanyaDeepSEO {
  if (!alanyaDeepSEOInstance) {
    alanyaDeepSEOInstance = new AlanyaDeepSEO();
  }
  return alanyaDeepSEOInstance;
}
