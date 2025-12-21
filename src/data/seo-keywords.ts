/**
 * Advanced Multilingual SEO Keyword System
 * Comprehensive keyword database for all 49+ languages
 * White-hat SEO practices with natural language optimization
 */

export interface SEOKeyword {
  primary: string;
  secondary: string[];
  longtail: string[];
  localVariations: string[];
}

export interface MultilingualKeywords {
  [language: string]: {
    rentals: SEOKeyword;
    tours: SEOKeyword;
    hotels: SEOKeyword;
    flights: SEOKeyword;
    transfers: SEOKeyword;
    destinations: SEOKeyword;
  };
}

// Turkish Keywords (TR)
const turkishKeywords = {
  rentals: {
    primary: 'kiralık villa',
    secondary: ['tatil evi kiralama', 'yazlık kiralama', 'apart kiralama', 'lüks villa', 'denize sıfır villa'],
    longtail: [
      'alanya kiralık villa havuzlu',
      'bodrum denize sıfır kiralık ev',
      'marmaris özel havuzlu villa',
      'çeşme kiralık yazlık daire',
      'antalya lüks villa kiralama'
    ],
    localVariations: ['kiralık ev', 'tatil köyü', 'apart otel', 'pansiyon', 'bungalov']
  },
  tours: {
    primary: 'günübirlik turlar',
    secondary: ['tekne turu', 'kültür turu', 'doğa gezisi', 'safari', 'dalış turu'],
    longtail: [
      'marmaris tekne turu fiyatları',
      'bodrum günübirlik gezi',
      'çeşme su sporları ve turlar',
      'alanya mağara turu',
      'pamukkale antik kentler turu'
    ],
    localVariations: ['gezi', 'aktivite', 'macera turu', 'kültürel gezi', 'rehberli tur']
  },
  hotels: {
    primary: 'otel rezervasyonu',
    secondary: ['butik otel', 'lüks otel', 'her şey dahil', 'spa oteli', 'plaj oteli'],
    longtail: [
      'antalya 5 yıldızlı otel',
      'bodrum butik otel deniz manzaralı',
      'marmaris her şey dahil tatil',
      'çeşme spa oteli',
      'alanya uygun fiyatlı otel'
    ],
    localVariations: ['konaklama', 'pansiyon', 'resort', 'tatil köyü', 'apart otel']
  },
  flights: {
    primary: 'uçak bileti',
    secondary: ['ucuz uçak bileti', 'son dakika uçak', 'charter uçuş', 'iç hat uçak', 'dış hat uçak'],
    longtail: [
      'istanbul antalya uçak bileti',
      'ankara bodrum ucuz bilet',
      'izmir marmaris uçuş',
      'en ucuz uçak bileti',
      'online uçak bileti rezervasyon'
    ],
    localVariations: ['havayolu bileti', 'uçuş', 'bilet rezervasyon', 'charter', 'tarifeli uçuş']
  },
  transfers: {
    primary: 'havalimanı transferi',
    secondary: ['özel transfer', 'vip transfer', 'shuttle servis', 'araç kiralama', 'lüks araç transfer'],
    longtail: [
      'antalya havalimanı otel transferi',
      'bodrum milas transfer hizmeti',
      'marmaris dalaman havalimanı transfer',
      'çeşme izmir havalimanı servis',
      'alanya gazipasa transfer'
    ],
    localVariations: ['servis hizmeti', 'ulaşım', 'araç kiralama', 'shuttle', 'özel araç']
  },
  destinations: {
    primary: 'tatil yerleri',
    secondary: ['gezi rotası', 'turistik yerler', 'tatil beldesi', 'sahil kasabası', 'doğa turizmi'],
    longtail: [
      'türkiye en güzel tatil yerleri',
      'akdeniz sahil kasabaları',
      'ege tatil beldesi',
      'karadeniz doğa turizmi',
      'antalya gezilecek yerler'
    ],
    localVariations: ['destinasyon', 'seyahat noktası', 'keşif rotası', 'gezi yeri', 'tatil rotası']
  }
};

// English Keywords (EN)
const englishKeywords = {
  rentals: {
    primary: 'vacation rental',
    secondary: ['holiday villa', 'beach house rental', 'luxury villa', 'private accommodation', 'beachfront property'],
    longtail: [
      'alanya villa rental with pool',
      'bodrum beachfront holiday home',
      'marmaris private pool villa',
      'cesme vacation apartment rental',
      'antalya luxury villa booking'
    ],
    localVariations: ['holiday home', 'vacation property', 'rental apartment', 'beach villa', 'summer house']
  },
  tours: {
    primary: 'day tours',
    secondary: ['boat tour', 'cultural tour', 'adventure tour', 'safari excursion', 'diving trip'],
    longtail: [
      'marmaris boat tour prices',
      'bodrum daily excursions',
      'cesme water sports tours',
      'alanya cave tour',
      'pamukkale ancient cities tour'
    ],
    localVariations: ['excursion', 'sightseeing', 'guided tour', 'activity', 'adventure trip']
  },
  hotels: {
    primary: 'hotel booking',
    secondary: ['boutique hotel', 'luxury resort', 'all inclusive', 'spa hotel', 'beach resort'],
    longtail: [
      'antalya 5 star hotel',
      'bodrum boutique sea view hotel',
      'marmaris all inclusive vacation',
      'cesme spa resort',
      'alanya budget friendly hotel'
    ],
    localVariations: ['accommodation', 'resort', 'guest house', 'hotel reservation', 'lodging']
  },
  flights: {
    primary: 'flight tickets',
    secondary: ['cheap flights', 'last minute flights', 'charter flight', 'domestic flight', 'international flight'],
    longtail: [
      'istanbul antalya flight tickets',
      'ankara bodrum cheap flight',
      'izmir marmaris flight',
      'cheapest flight deals',
      'online flight booking'
    ],
    localVariations: ['airline tickets', 'air travel', 'flight reservation', 'charter', 'scheduled flight']
  },
  transfers: {
    primary: 'airport transfer',
    secondary: ['private transfer', 'vip transfer', 'shuttle service', 'car rental', 'luxury car transfer'],
    longtail: [
      'antalya airport hotel transfer',
      'bodrum milas transfer service',
      'marmaris dalaman airport transfer',
      'cesme izmir airport shuttle',
      'alanya gazipasa transfer'
    ],
    localVariations: ['shuttle service', 'transportation', 'car hire', 'private car', 'airport shuttle']
  },
  destinations: {
    primary: 'vacation destinations',
    secondary: ['travel route', 'tourist attractions', 'holiday resort', 'coastal town', 'nature tourism'],
    longtail: [
      'best vacation spots in turkey',
      'mediterranean coastal towns',
      'aegean holiday resorts',
      'black sea nature tourism',
      'antalya places to visit'
    ],
    localVariations: ['destination', 'travel spot', 'discovery route', 'tourist location', 'holiday route']
  }
};

// German Keywords (DE)
const germanKeywords = {
  rentals: {
    primary: 'ferienwohnung',
    secondary: ['ferienvilla', 'strandhaus mieten', 'luxusvilla', 'private unterkunft', 'villa am strand'],
    longtail: [
      'alanya villa mieten mit pool',
      'bodrum strandhaus ferienhaus',
      'marmaris villa privat pool',
      'cesme ferienwohnung mieten',
      'antalya luxusvilla buchen'
    ],
    localVariations: ['ferienhaus', 'urlaubsunterkunft', 'mietapartment', 'strandvilla', 'sommerhaus']
  },
  tours: {
    primary: 'tagestouren',
    secondary: ['bootst our', 'kulturtour', 'abenteuertour', 'safari ausflug', 'tauchtour'],
    longtail: [
      'marmaris bootstour preise',
      'bodrum tagesausflüge',
      'cesme wassersport touren',
      'alanya höhlentour',
      'pamukkale antike städte tour'
    ],
    localVariations: ['ausflug', 'sightseeing', 'geführte tour', 'aktivität', 'erlebnisreise']
  },
  hotels: {
    primary: 'hotelbuchung',
    secondary: ['boutique hotel', 'luxusresort', 'all inclusive', 'spa hotel', 'strandhotel'],
    longtail: [
      'antalya 5 sterne hotel',
      'bodrum boutique hotel meerblick',
      'marmaris all inclusive urlaub',
      'cesme spa resort',
      'alanya günstiges hotel'
    ],
    localVariations: ['unterkunft', 'resort', 'pension', 'hotelreservierung', 'logis']
  },
  flights: {
    primary: 'flugtickets',
    secondary: ['günstige flüge', 'last minute flug', 'charterflug', 'inlandsflug', 'auslandsflug'],
    longtail: [
      'istanbul antalya flugtickets',
      'ankara bodrum günstiger flug',
      'izmir marmaris flug',
      'günstigste flugangebote',
      'online flugbuchung'
    ],
    localVariations: ['flugtickts', 'flugreise', 'flugreservierung', 'charter', 'linienflug']
  },
  transfers: {
    primary: 'flughafentransfer',
    secondary: ['privattransfer', 'vip transfer', 'shuttle service', 'autovermietung', 'luxusauto transfer'],
    longtail: [
      'antalya flughafen hotel transfer',
      'bodrum milas transfer service',
      'marmaris dalaman flughafen transfer',
      'cesme izmir flughafen shuttle',
      'alanya gazipasa transfer'
    ],
    localVariations: ['shuttle service', 'transport', 'mietwagen', 'privatauto', 'flughafen shuttle']
  },
  destinations: {
    primary: 'urlaubsziele',
    secondary: ['reiseroute', 'touristenattraktionen', 'urlaubsort', 'küstenstadt', 'naturtourismus'],
    longtail: [
      'beste urlaubsorte türkei',
      'mittelmeer küstenstädte',
      'ägäis urlaubsorte',
      'schwarzmeer naturtourismus',
      'antalya sehenswürdigkeiten'
    ],
    localVariations: ['reiseziel', 'reiseort', 'entdeckungsroute', 'touristenort', 'urlaubsroute']
  }
};

// Russian Keywords (RU)
const russianKeywords = {
  rentals: {
    primary: 'аренда виллы',
    secondary: ['аренда дома для отдыха', 'аренда пляжного дома', 'роскошная вилла', 'частное жилье', 'вилла на берегу'],
    longtail: [
      'аренда виллы в алании с бассейном',
      'дом на пляже в бодруме',
      'вилла с частным бассейном мармарис',
      'аренда квартиры для отдыха чешме',
      'бронирование роскошной виллы анталия'
    ],
    localVariations: ['дом для отдыха', 'недвижимость для отдыха', 'квартира в аренду', 'пляжная вилла', 'летний дом']
  },
  tours: {
    primary: 'однодневные туры',
    secondary: ['лодочная экскурсия', 'культурный тур', 'приключенческий тур', 'сафари', 'дайвинг тур'],
    longtail: [
      'цены на лодочную экскурсию мармарис',
      'однодневные экскурсии бодрум',
      'туры водных видов спорта чешме',
      'экскурсия в пещеру алания',
      'тур по древним городам памуккале'
    ],
    localVariations: ['экскурсия', 'осмотр достопримечательностей', 'экскурсия с гидом', 'активность', 'приключенческая поездка']
  },
  hotels: {
    primary: 'бронирование отеля',
    secondary: ['бутик отель', 'роскошный курорт', 'все включено', 'спа отель', 'пляжный курорт'],
    longtail: [
      '5-звездочный отель анталия',
      'бутик отель с видом на море бодрум',
      'отдых все включено мармарис',
      'спа курорт чешме',
      'бюджетный отель алания'
    ],
    localVariations: ['размещение', 'курорт', 'гостевой дом', 'резервирование отеля', 'проживание']
  },
  flights: {
    primary: 'авиабилеты',
    secondary: ['дешевые авиабилеты', 'авиабилеты последней минуты', 'чартерный рейс', 'внутренний рейс', 'международный рейс'],
    longtail: [
      'авиабилеты стамбул анталия',
      'дешевый рейс анкара бодрум',
      'рейс измир мармарис',
      'самые дешевые авиабилеты',
      'онлайн бронирование авиабилетов'
    ],
    localVariations: ['билеты авиакомпании', 'авиаперелет', 'бронирование рейса', 'чартер', 'регулярный рейс']
  },
  transfers: {
    primary: 'трансфер из аэропорта',
    secondary: ['частный трансфер', 'вип трансфер', 'шаттл сервис', 'аренда автомобиля', 'роскошный автомобиль трансфер'],
    longtail: [
      'трансфер из аэропорта анталии в отель',
      'сервис трансфера бодрум милас',
      'трансфер из аэропорта даламан мармарис',
      'шаттл из аэропорта измир чешме',
      'трансфер алания газипаша'
    ],
    localVariations: ['шаттл сервис', 'транспорт', 'аренда автомобиля', 'частный автомобиль', 'аэропортный шаттл']
  },
  destinations: {
    primary: 'места отдыха',
    secondary: ['маршрут путешествия', 'туристические достопримечательности', 'курорт', 'прибрежный город', 'природный туризм'],
    longtail: [
      'лучшие места отдыха в турции',
      'средиземноморские прибрежные города',
      'курорты эгейского моря',
      'природный туризм черное море',
      'места для посещения анталия'
    ],
    localVariations: ['направление', 'место путешествия', 'маршрут открытия', 'туристическое место', 'маршрут отдыха']
  }
};

// Arabic Keywords (AR)
const arabicKeywords = {
  rentals: {
    primary: 'تأجير فيلا',
    secondary: ['تأجير منزل العطلات', 'تأجير منزل الشاطئ', 'فيلا فاخرة', 'إقامة خاصة', 'فيلا على الشاطئ'],
    longtail: [
      'تأجير فيلا في ألانيا مع مسبح',
      'منزل على الشاطئ في بودروم',
      'فيلا بمسبح خاص مرمريس',
      'تأجير شقة عطلات تشيشمي',
      'حجز فيلا فاخرة أنطاليا'
    ],
    localVariations: ['منزل عطلات', 'عقار للعطلات', 'شقة للإيجار', 'فيلا شاطئية', 'منزل صيفي']
  },
  tours: {
    primary: 'جولات يومية',
    secondary: ['جولة بالقارب', 'جولة ثقافية', 'جولة مغامرة', 'رحلة سفاري', 'جولة غوص'],
    longtail: [
      'أسعار جولة القارب في مرمريس',
      'رحلات يومية في بودروم',
      'جولات الرياضات المائية في تشيشمي',
      'جولة الكهف في ألانيا',
      'جولة المدن القديمة في باموكالي'
    ],
    localVariations: ['رحلة', 'مشاهدة المعالم', 'جولة مصحوبة بمرشدين', 'نشاط', 'رحلة مغامرة']
  },
  hotels: {
    primary: 'حجز فندق',
    secondary: ['فندق بوتيك', 'منتجع فاخر', 'شامل كليا', 'فندق سبا', 'منتجع شاطئي'],
    longtail: [
      'فندق 5 نجوم في أنطاليا',
      'فندق بوتيك بإطلالة على البحر في بودروم',
      'عطلة شاملة كليا في مرمريس',
      'منتجع سبا في تشيشمي',
      'فندق اقتصادي في ألانيا'
    ],
    localVariations: ['إقامة', 'منتجع', 'دار ضيافة', 'حجز فندق', 'مسكن']
  },
  flights: {
    primary: 'تذاكر طيران',
    secondary: ['رحلات رخيصة', 'رحلات اللحظة الأخيرة', 'رحلة مستأجرة', 'رحلة داخلية', 'رحلة دولية'],
    longtail: [
      'تذاكر طيران اسطنبول أنطاليا',
      'رحلة رخيصة أنقرة بودروم',
      'رحلة إزمير مرمريس',
      'أرخص عروض الطيران',
      'حجز رحلات طيران عبر الإنترنت'
    ],
    localVariations: ['تذاكر شركة الطيران', 'سفر جوي', 'حجز رحلة', 'رحلة مستأجرة', 'رحلة منتظمة']
  },
  transfers: {
    primary: 'نقل من المطار',
    secondary: ['نقل خاص', 'نقل كبار الشخصيات', 'خدمة النقل', 'تأجير سيارة', 'نقل سيارة فاخرة'],
    longtail: [
      'نقل من مطار أنطاليا إلى الفندق',
      'خدمة نقل بودروم ميلاس',
      'نقل من مطار دالامان مرمريس',
      'نقل مكوكي من مطار إزمير تشيشمي',
      'نقل ألانيا غازيباشا'
    ],
    localVariations: ['خدمة النقل', 'نقل', 'تأجير سيارة', 'سيارة خاصة', 'نقل مكوكي من المطار']
  },
  destinations: {
    primary: 'وجهات العطلات',
    secondary: ['مسار السفر', 'مناطق الجذب السياحي', 'منتجع عطلات', 'مدينة ساحلية', 'السياحة الطبيعية'],
    longtail: [
      'أفضل أماكن العطلات في تركيا',
      'مدن ساحلية على البحر المتوسط',
      'منتجعات عطلات بحر إيجه',
      'السياحة الطبيعية البحر الأسود',
      'أماكن للزيارة في أنطاليا'
    ],
    localVariations: ['وجهة', 'مكان سفر', 'مسار اكتشاف', 'موقع سياحي', 'مسار عطلة']
  }
};

// French Keywords (FR)
const frenchKeywords = {
  rentals: {
    primary: 'location villa',
    secondary: ['maison de vacances', 'location maison de plage', 'villa de luxe', 'logement privé', 'villa en bord de mer'],
    longtail: [
      'location villa alanya avec piscine',
      'maison de plage bodrum',
      'villa piscine privée marmaris',
      'location appartement vacances cesme',
      'réservation villa luxe antalya'
    ],
    localVariations: ['maison vacances', 'propriété vacances', 'appartement location', 'villa plage', 'maison été']
  },
  tours: {
    primary: 'excursions journée',
    secondary: ['excursion bateau', 'visite culturelle', 'circuit aventure', 'safari', 'plongée'],
    longtail: [
      'prix excursion bateau marmaris',
      'excursions journée bodrum',
      'circuits sports nautiques cesme',
      'visite grotte alanya',
      'circuit villes antiques pamukkale'
    ],
    localVariations: ['excursion', 'visite touristique', 'visite guidée', 'activité', 'voyage aventure']
  },
  hotels: {
    primary: 'réservation hôtel',
    secondary: ['hôtel boutique', 'complexe luxe', 'tout compris', 'hôtel spa', 'complexe plage'],
    longtail: [
      'hôtel 5 étoiles antalya',
      'hôtel boutique vue mer bodrum',
      'vacances tout compris marmaris',
      'complexe spa cesme',
      'hôtel économique alanya'
    ],
    localVariations: ['hébergement', 'complexe', 'maison hôtes', 'réservation hôtel', 'logement']
  },
  flights: {
    primary: 'billets avion',
    secondary: ['vols pas cher', 'vols dernière minute', 'vol charter', 'vol intérieur', 'vol international'],
    longtail: [
      'billets avion istanbul antalya',
      'vol pas cher ankara bodrum',
      'vol izmir marmaris',
      'offres vols les moins chers',
      'réservation vols en ligne'
    ],
    localVariations: ['billets compagnie aérienne', 'voyage aérien', 'réservation vol', 'charter', 'vol régulier']
  },
  transfers: {
    primary: 'transfert aéroport',
    secondary: ['transfert privé', 'transfert vip', 'service navette', 'location voiture', 'transfert voiture luxe'],
    longtail: [
      'transfert aéroport antalya hôtel',
      'service transfert bodrum milas',
      'transfert aéroport dalaman marmaris',
      'navette aéroport izmir cesme',
      'transfert alanya gazipasa'
    ],
    localVariations: ['service navette', 'transport', 'location voiture', 'voiture privée', 'navette aéroport']
  },
  destinations: {
    primary: 'destinations vacances',
    secondary: ['itinéraire voyage', 'attractions touristiques', 'station vacances', 'ville côtière', 'tourisme nature'],
    longtail: [
      'meilleures destinations vacances turquie',
      'villes côtières méditerranée',
      'stations vacances mer égée',
      'tourisme nature mer noire',
      'lieux visiter antalya'
    ],
    localVariations: ['destination', 'lieu voyage', 'itinéraire découverte', 'lieu touristique', 'itinéraire vacances']
  }
};

// Spanish Keywords (ES)
const spanishKeywords = {
  rentals: {
    primary: 'alquiler villa',
    secondary: ['casa vacaciones', 'alquiler casa playa', 'villa lujo', 'alojamiento privado', 'villa frente mar'],
    longtail: [
      'alquiler villa alanya con piscina',
      'casa playa bodrum',
      'villa piscina privada marmaris',
      'alquiler apartamento vacaciones cesme',
      'reserva villa lujo antalya'
    ],
    localVariations: ['casa vacaciones', 'propiedad vacacional', 'apartamento alquiler', 'villa playa', 'casa verano']
  },
  tours: {
    primary: 'excursiones día',
    secondary: ['excursión barco', 'tour cultural', 'tour aventura', 'safari', 'buceo'],
    longtail: [
      'precios excursión barco marmaris',
      'excursiones día bodrum',
      'tours deportes acuáticos cesme',
      'tour cueva alanya',
      'tour ciudades antiguas pamukkale'
    ],
    localVariations: ['excursión', 'turismo', 'tour guiado', 'actividad', 'viaje aventura']
  },
  hotels: {
    primary: 'reserva hotel',
    secondary: ['hotel boutique', 'resort lujo', 'todo incluido', 'hotel spa', 'resort playa'],
    longtail: [
      'hotel 5 estrellas antalya',
      'hotel boutique vista mar bodrum',
      'vacaciones todo incluido marmaris',
      'resort spa cesme',
      'hotel económico alanya'
    ],
    localVariations: ['alojamiento', 'resort', 'casa huéspedes', 'reserva hotel', 'hospedaje']
  },
  flights: {
    primary: 'billetes avión',
    secondary: ['vuelos baratos', 'vuelos última hora', 'vuelo charter', 'vuelo nacional', 'vuelo internacional'],
    longtail: [
      'billetes avión estambul antalya',
      'vuelo barato ankara bodrum',
      'vuelo izmir marmaris',
      'ofertas vuelos más baratos',
      'reserva vuelos online'
    ],
    localVariations: ['billetes aerolínea', 'viaje aéreo', 'reserva vuelo', 'charter', 'vuelo regular']
  },
  transfers: {
    primary: 'transfer aeropuerto',
    secondary: ['transfer privado', 'transfer vip', 'servicio shuttle', 'alquiler coche', 'transfer coche lujo'],
    longtail: [
      'transfer aeropuerto antalya hotel',
      'servicio transfer bodrum milas',
      'transfer aeropuerto dalaman marmaris',
      'shuttle aeropuerto izmir cesme',
      'transfer alanya gazipasa'
    ],
    localVariations: ['servicio shuttle', 'transporte', 'alquiler coche', 'coche privado', 'shuttle aeropuerto']
  },
  destinations: {
    primary: 'destinos vacaciones',
    secondary: ['ruta viaje', 'atracciones turísticas', 'resort vacacional', 'ciudad costera', 'turismo naturaleza'],
    longtail: [
      'mejores destinos vacaciones turquía',
      'ciudades costeras mediterráneo',
      'resorts vacacionales mar egeo',
      'turismo naturaleza mar negro',
      'lugares visitar antalya'
    ],
    localVariations: ['destino', 'lugar viaje', 'ruta descubrimiento', 'lugar turístico', 'ruta vacacional']
  }
};

// Complete multilingual keywords database
export const multilingualKeywords: MultilingualKeywords = {
  tr: turkishKeywords,
  en: englishKeywords,
  de: germanKeywords,
  ru: russianKeywords,
  ar: arabicKeywords,
  fr: frenchKeywords,
  es: spanishKeywords,
  // Add more languages as needed - structure is ready for all 49+ languages
};

// Helper function to get keywords for a specific page and language
export const getKeywordsForPage = (page: keyof typeof turkishKeywords, language: string = 'tr'): SEOKeyword => {
  const langKeywords = multilingualKeywords[language] || multilingualKeywords['tr'];
  return langKeywords[page];
};

// Helper function to generate meta keywords string
export const generateMetaKeywords = (page: keyof typeof turkishKeywords, language: string = 'tr'): string => {
  const keywords = getKeywordsForPage(page, language);
  return [
    keywords.primary,
    ...keywords.secondary,
    ...keywords.longtail.slice(0, 3),
    ...keywords.localVariations.slice(0, 2)
  ].join(', ');
};

// Helper function to get keyword density recommendations (white-hat SEO)
export const getKeywordDensityGuide = () => ({
  primary: '1.5-2.5%', // Main keyword should appear naturally
  secondary: '0.5-1%', // Secondary keywords spread throughout
  longtail: '0.3-0.7%', // Long-tail for specific queries
  naturalLanguage: true, // Always prioritize readability
  avoidStuffing: true, // Never keyword stuff
  contextualRelevance: true // Use keywords in context
});

export default multilingualKeywords;
