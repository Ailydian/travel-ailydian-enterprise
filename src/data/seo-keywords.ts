/**
 * Advanced Multilingual SEO Keyword System for holiday.ailydian.com
 * Comprehensive keyword database for all 49+ languages
 * White-hat SEO practices with natural language optimization
 * Focus: Holiday, Vacation & Leisure Travel
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

// Turkish Keywords (TR) - Holiday Brand Focus
const turkishKeywords = {
  rentals: {
    primary: 'tatil villası kiralama',
    secondary: ['tatil evi kiralama', 'bayram tatili villa', 'yazlık tatil evi', 'lüks tatil villası', 'denize sıfır tatil evi'],
    longtail: [
      'alanya tatil villası havuzlu',
      'bodrum denize sıfır tatil evi',
      'marmaris özel havuzlu tatil villası',
      'çeşme kiralık tatil dairesi',
      'antalya lüks tatil villası kiralama'
    ],
    localVariations: ['tatil evi', 'tatil köyü', 'tatil apart', 'tatil pansiyonu', 'tatil bungalovu']
  },
  tours: {
    primary: 'tatil turları',
    secondary: ['bayram tatili turları', 'tekne turu', 'kültür turu', 'tatil aktiviteleri', 'safari tatil'],
    longtail: [
      'marmaris tatil tekne turu fiyatları',
      'bodrum günübirlik tatil gezisi',
      'çeşme tatil su sporları ve turlar',
      'alanya tatil mağara turu',
      'pamukkale tatil antik kentler turu'
    ],
    localVariations: ['tatil gezisi', 'tatil aktiviteleri', 'macera tatili', 'kültürel tatil', 'rehberli tatil turu']
  },
  hotels: {
    primary: 'tatil oteli rezervasyonu',
    secondary: ['bayram tatili oteli', 'butik tatil oteli', 'lüks tatil oteli', 'her şey dahil tatil', 'plaj tatil oteli'],
    longtail: [
      'antalya 5 yıldızlı tatil oteli',
      'bodrum butik tatil oteli deniz manzaralı',
      'marmaris her şey dahil tatil paketi',
      'çeşme spa tatil oteli',
      'alanya uygun fiyatlı tatil oteli'
    ],
    localVariations: ['tatil konaklaması', 'tatil pansiyonu', 'tatil resort', 'tatil köyü', 'tatil apart oteli']
  },
  flights: {
    primary: 'tatil uçak bileti',
    secondary: ['bayram tatili uçak bileti', 'ucuz tatil uçuşu', 'son dakika tatil uçak', 'charter tatil uçuşu', 'yaz tatili uçak bileti'],
    longtail: [
      'istanbul antalya tatil uçak bileti',
      'ankara bodrum bayram tatili uçak',
      'izmir marmaris tatil uçuşu',
      'en ucuz tatil uçak bileti',
      'online tatil uçak bileti rezervasyon'
    ],
    localVariations: ['tatil havayolu bileti', 'tatil uçuşu', 'tatil bilet rezervasyon', 'tatil charter', 'tatil tarifeli uçuş']
  },
  transfers: {
    primary: 'tatil havalimanı transferi',
    secondary: ['bayram tatili transfer', 'özel tatil transferi', 'vip tatil transfer', 'tatil shuttle servisi', 'tatil araç kiralama'],
    longtail: [
      'antalya havalimanı tatil oteli transferi',
      'bodrum milas tatil transfer hizmeti',
      'marmaris dalaman tatil havalimanı transfer',
      'çeşme izmir tatil havalimanı servisi',
      'alanya gazipasa tatil transferi'
    ],
    localVariations: ['tatil servis hizmeti', 'tatil ulaşım', 'tatil araç kiralama', 'tatil shuttle', 'tatil özel araç']
  },
  destinations: {
    primary: 'tatil destinasyonları',
    secondary: ['bayram tatili yerleri', 'yaz tatili rotası', 'turistik tatil yerleri', 'tatil beldesi', 'sahil tatil kasabası'],
    longtail: [
      'türkiye en güzel bayram tatili yerleri',
      'akdeniz sahil tatil kasabaları',
      'ege yaz tatili beldesi',
      'karadeniz doğa tatili turizmi',
      'antalya tatil gezilecek yerler'
    ],
    localVariations: ['tatil destinasyonu', 'tatil seyahat noktası', 'tatil keşif rotası', 'tatil gezi yeri', 'tatil rotası']
  }
};

// English Keywords (EN) - Holiday Brand Focus
const englishKeywords = {
  rentals: {
    primary: 'holiday villa rental',
    secondary: ['vacation holiday home', 'beach holiday rental', 'luxury holiday villa', 'private holiday accommodation', 'beachfront holiday property'],
    longtail: [
      'alanya holiday villa rental with pool',
      'bodrum beachfront holiday home rental',
      'marmaris private pool holiday villa',
      'cesme vacation holiday apartment rental',
      'antalya luxury holiday villa booking'
    ],
    localVariations: ['holiday home', 'vacation holiday property', 'holiday rental apartment', 'beach holiday villa', 'summer holiday house']
  },
  tours: {
    primary: 'holiday tours',
    secondary: ['vacation holiday tours', 'boat holiday tour', 'cultural holiday tour', 'adventure holiday tour', 'safari holiday excursion'],
    longtail: [
      'marmaris holiday boat tour prices',
      'bodrum daily holiday excursions',
      'cesme water sports holiday tours',
      'alanya cave holiday tour',
      'pamukkale ancient cities holiday tour'
    ],
    localVariations: ['holiday excursion', 'holiday sightseeing', 'guided holiday tour', 'holiday activity', 'adventure holiday trip']
  },
  hotels: {
    primary: 'holiday hotel booking',
    secondary: ['vacation holiday hotel', 'boutique holiday hotel', 'luxury holiday resort', 'all inclusive holiday', 'beach holiday resort'],
    longtail: [
      'antalya 5 star holiday hotel',
      'bodrum boutique sea view holiday hotel',
      'marmaris all inclusive holiday vacation',
      'cesme spa holiday resort',
      'alanya budget friendly holiday hotel'
    ],
    localVariations: ['holiday accommodation', 'holiday resort', 'holiday guest house', 'holiday hotel reservation', 'holiday lodging']
  },
  flights: {
    primary: 'holiday flight tickets',
    secondary: ['vacation holiday flights', 'cheap holiday flights', 'last minute holiday flights', 'charter holiday flight', 'holiday getaway flights'],
    longtail: [
      'istanbul antalya holiday flight tickets',
      'ankara bodrum cheap holiday flight',
      'izmir marmaris holiday flight',
      'cheapest holiday flight deals',
      'online holiday flight booking'
    ],
    localVariations: ['holiday airline tickets', 'holiday air travel', 'holiday flight reservation', 'holiday charter', 'scheduled holiday flight']
  },
  transfers: {
    primary: 'holiday airport transfer',
    secondary: ['vacation holiday transfer', 'private holiday transfer', 'vip holiday transfer', 'holiday shuttle service', 'holiday car rental'],
    longtail: [
      'antalya airport holiday hotel transfer',
      'bodrum milas holiday transfer service',
      'marmaris dalaman holiday airport transfer',
      'cesme izmir holiday airport shuttle',
      'alanya gazipasa holiday transfer'
    ],
    localVariations: ['holiday shuttle service', 'holiday transportation', 'holiday car hire', 'private holiday car', 'holiday airport shuttle']
  },
  destinations: {
    primary: 'holiday destinations',
    secondary: ['vacation holiday route', 'tourist holiday attractions', 'holiday resort destinations', 'coastal holiday town', 'nature holiday tourism'],
    longtail: [
      'best holiday vacation spots in turkey',
      'mediterranean coastal holiday towns',
      'aegean summer holiday resorts',
      'black sea nature holiday tourism',
      'antalya holiday places to visit'
    ],
    localVariations: ['holiday destination', 'holiday travel spot', 'holiday discovery route', 'tourist holiday location', 'holiday vacation route']
  }
};

// German Keywords (DE) - Urlaub (Holiday) Brand Focus
const germanKeywords = {
  rentals: {
    primary: 'urlaub ferienwohnung',
    secondary: ['urlaub ferienvilla', 'strandhaus urlaub mieten', 'luxusvilla urlaub', 'private urlaub unterkunft', 'villa am strand urlaub'],
    longtail: [
      'alanya urlaub villa mieten mit pool',
      'bodrum strandhaus urlaub ferienhaus',
      'marmaris villa urlaub privat pool',
      'cesme ferienwohnung urlaub mieten',
      'antalya luxusvilla urlaub buchen'
    ],
    localVariations: ['urlaub ferienhaus', 'urlaubsunterkunft', 'urlaub mietapartment', 'urlaub strandvilla', 'sommerurlaub haus']
  },
  tours: {
    primary: 'urlaub tagestouren',
    secondary: ['urlaub bootstour', 'kulturtour urlaub', 'abenteuertour urlaub', 'safari urlaub ausflug', 'tauchtour urlaub'],
    longtail: [
      'marmaris urlaub bootstour preise',
      'bodrum urlaub tagesausflüge',
      'cesme wassersport urlaub touren',
      'alanya höhlentour urlaub',
      'pamukkale antike städte urlaub tour'
    ],
    localVariations: ['urlaub ausflug', 'urlaub sightseeing', 'geführte urlaub tour', 'urlaub aktivität', 'urlaub erlebnisreise']
  },
  hotels: {
    primary: 'urlaub hotelbuchung',
    secondary: ['urlaub boutique hotel', 'luxusresort urlaub', 'all inclusive urlaub', 'spa hotel urlaub', 'strandhotel urlaub'],
    longtail: [
      'antalya 5 sterne urlaub hotel',
      'bodrum boutique urlaub hotel meerblick',
      'marmaris all inclusive urlaub ferien',
      'cesme spa urlaub resort',
      'alanya günstiges urlaub hotel'
    ],
    localVariations: ['urlaub unterkunft', 'urlaub resort', 'urlaub pension', 'urlaub hotelreservierung', 'urlaub logis']
  },
  flights: {
    primary: 'urlaub flugtickets',
    secondary: ['günstige urlaub flüge', 'last minute urlaub flug', 'charterflug urlaub', 'urlaub inlandsflug', 'ferien flug'],
    longtail: [
      'istanbul antalya urlaub flugtickets',
      'ankara bodrum günstiger urlaub flug',
      'izmir marmaris urlaub flug',
      'günstigste urlaub flugangebote',
      'online urlaub flugbuchung'
    ],
    localVariations: ['urlaub flugtickets', 'urlaub flugreise', 'urlaub flugreservierung', 'urlaub charter', 'urlaub linienflug']
  },
  transfers: {
    primary: 'urlaub flughafentransfer',
    secondary: ['urlaub privattransfer', 'vip urlaub transfer', 'shuttle service urlaub', 'urlaub autovermietung', 'luxusauto urlaub transfer'],
    longtail: [
      'antalya flughafen urlaub hotel transfer',
      'bodrum milas urlaub transfer service',
      'marmaris dalaman urlaub flughafen transfer',
      'cesme izmir urlaub flughafen shuttle',
      'alanya gazipasa urlaub transfer'
    ],
    localVariations: ['urlaub shuttle service', 'urlaub transport', 'urlaub mietwagen', 'urlaub privatauto', 'urlaub flughafen shuttle']
  },
  destinations: {
    primary: 'urlaub urlaubsziele',
    secondary: ['urlaub reiseroute', 'touristenattraktionen urlaub', 'urlaubsort ferien', 'küstenstadt urlaub', 'naturtourismus urlaub'],
    longtail: [
      'beste urlaub urlaubsorte türkei',
      'mittelmeer küstenstädte urlaub',
      'ägäis urlaub urlaubsorte',
      'schwarzmeer naturtourismus urlaub',
      'antalya urlaub sehenswürdigkeiten'
    ],
    localVariations: ['urlaub reiseziel', 'urlaub reiseort', 'urlaub entdeckungsroute', 'urlaub touristenort', 'urlaubsroute ferien']
  }
};

// Russian Keywords (RU) - Отпуск (Holiday) & Каникулы (Vacation) Focus
const russianKeywords = {
  rentals: {
    primary: 'аренда виллы для отпуска',
    secondary: ['аренда дома для отпуска', 'аренда пляжного дома каникулы', 'роскошная вилла отпуск', 'частное жилье для отдыха', 'вилла на берегу отпуск'],
    longtail: [
      'аренда виллы для отпуска в алании с бассейном',
      'дом на пляже для каникул в бодруме',
      'вилла для отпуска с частным бассейном мармарис',
      'аренда квартиры для отпуска чешме',
      'бронирование роскошной виллы отпуск анталия'
    ],
    localVariations: ['дом для отпуска', 'недвижимость для каникул', 'квартира в аренду отпуск', 'пляжная вилла отдых', 'летний дом каникулы']
  },
  tours: {
    primary: 'туры на отпуск',
    secondary: ['лодочная экскурсия отпуск', 'культурный тур каникулы', 'приключенческий тур отпуск', 'сафари отдых', 'дайвинг тур отпуск'],
    longtail: [
      'цены на лодочную экскурсию отпуск мармарис',
      'однодневные экскурсии отпуск бодрум',
      'туры водных видов спорта отпуск чешме',
      'экскурсия в пещеру отпуск алания',
      'тур по древним городам отпуск памуккале'
    ],
    localVariations: ['экскурсия отпуск', 'осмотр достопримечательностей каникулы', 'экскурсия с гидом отдых', 'активность отпуск', 'приключенческая поездка каникулы']
  },
  hotels: {
    primary: 'бронирование отеля для отпуска',
    secondary: ['бутик отель отпуск', 'роскошный курорт каникулы', 'все включено отпуск', 'спа отель отдых', 'пляжный курорт отпуск'],
    longtail: [
      '5-звездочный отель для отпуска анталия',
      'бутик отель с видом на море отпуск бодрум',
      'отдых все включено отпуск мармарис',
      'спа курорт отпуск чешме',
      'бюджетный отель отпуск алания'
    ],
    localVariations: ['размещение отпуск', 'курорт каникулы', 'гостевой дом отдых', 'резервирование отеля отпуск', 'проживание каникулы']
  },
  flights: {
    primary: 'авиабилеты на отпуск',
    secondary: ['дешевые авиабилеты отпуск', 'авиабилеты последней минуты каникулы', 'чартерный рейс отпуск', 'внутренний рейс отдых', 'международный рейс отпуск'],
    longtail: [
      'авиабилеты на отпуск стамбул анталия',
      'дешевый рейс отпуск анкара бодрум',
      'рейс каникулы измир мармарис',
      'самые дешевые авиабилеты отпуск',
      'онлайн бронирование авиабилетов отпуск'
    ],
    localVariations: ['билеты авиакомпании отпуск', 'авиаперелет каникулы', 'бронирование рейса отдых', 'чартер отпуск', 'регулярный рейс каникулы']
  },
  transfers: {
    primary: 'трансфер из аэропорта отпуск',
    secondary: ['частный трансфер отпуск', 'вип трансфер каникулы', 'шаттл сервис отдых', 'аренда автомобиля отпуск', 'роскошный автомобиль трансфер отпуск'],
    longtail: [
      'трансфер из аэропорта отпуск анталии в отель',
      'сервис трансфера отпуск бодрум милас',
      'трансфер из аэропорта отпуск даламан мармарис',
      'шаттл из аэропорта отпуск измир чешме',
      'трансфер отпуск алания газипаша'
    ],
    localVariations: ['шаттл сервис отпуск', 'транспорт каникулы', 'аренда автомобиля отдых', 'частный автомобиль отпуск', 'аэропортный шаттл каникулы']
  },
  destinations: {
    primary: 'места для отпуска',
    secondary: ['маршрут путешествия отпуск', 'туристические достопримечательности каникулы', 'курорт отпуск', 'прибрежный город отдых', 'природный туризм отпуск'],
    longtail: [
      'лучшие места для отпуска в турции',
      'средиземноморские прибрежные города отпуск',
      'курорты эгейского моря каникулы',
      'природный туризм отпуск черное море',
      'места для посещения отпуск анталия'
    ],
    localVariations: ['направление отпуск', 'место путешествия каникулы', 'маршрут открытия отдых', 'туристическое место отпуск', 'маршрут отпуска каникулы']
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
