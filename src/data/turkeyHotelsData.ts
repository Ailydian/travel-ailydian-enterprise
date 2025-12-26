import { Hotel } from './turkeyTourismData';

export const turkeyHotels: Hotel[] = [
  // İSTANBUL OTELLERİ
  {
    id: 'istanbul-luxury-palace-hotel',
    destinationId: 'istanbul',
    name: 'Istanbul Luxury Palace Hotel',
    slug: 'istanbul-luxury-palace-hotel',
    category: 'luxury',
    starRating: 5,
    price: {
      min: 2500,
      max: 8000,
      currency: 'TRY',
      perNight: true
    },
    location: {
      address: {
        tr: 'Sultanahmet Fatih, İstanbul 34122',
        en: 'Sultanahmet Fatih, Istanbul 34122',
        de: 'Sultanahmet Fatih, Istanbul 34122',
        ru: 'Султанахмет Фатих, Стамбул 34122'
      },
      coordinates: { lat: 41.0053, lng: 28.9770 },
      distanceToCenter: 0.5,
      distanceToAirport: 45,
      landmarks: [
        { name: 'Ayasofya', distance: 0.3 },
        { name: 'Sultanahmet Camii', distance: 0.2 },
        { name: 'Topkapı Sarayı', distance: 0.4 },
        { name: 'Kapalıçarşı', distance: 0.6 }
      ]
    },
    amenities: {
      tr: [
        'Spa ve wellness merkezi',
        'Açık ve kapalı havuz',
        'Fitness merkezi',
        '24 saat oda servisi',
        'Concierge hizmeti',
        'Ücretsiz WiFi',
        'Restaurant ve bar',
        'İş merkezi',
        'Otopark',
        'Havaalanı transferi'
      ],
      en: [
        'Spa and wellness center',
        'Indoor and outdoor pool',
        'Fitness center',
        '24-hour room service',
        'Concierge service',
        'Free WiFi',
        'Restaurant and bar',
        'Business center',
        'Parking',
        'Airport shuttle'
      ],
      de: [
        'Spa- und Wellnesszentrum',
        'Innen- und Außenpool',
        'Fitnesscenter',
        '24-Stunden Zimmerservice',
        'Concierge-Service',
        'Kostenloses WiFi',
        'Restaurant und Bar',
        'Business-Center',
        'Parkplatz',
        'Flughafenshuttle'
      ],
      ru: [
        'Спа и оздоровительный центр',
        'Крытый и открытый бассейн',
        'Фитнес-центр',
        'Круглосуточное обслуживание номеров',
        'Консьерж-сервис',
        'Бесплатный WiFi',
        'Ресторан и бар',
        'Бизнес-центр',
        'Парковка',
        'Трансфер из аэропорта'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Deluxe Şehir Manzaralı Oda',
          en: 'Deluxe City View Room',
          de: 'Deluxe Zimmer mit Stadtblick',
          ru: 'Номер Делюкс с видом на город'
        },
        size: 35,
        capacity: 2,
        price: 2500,
        amenities: ['King size yatak', 'Şehir manzarası', 'Minibar', 'Safe'],
        images: ['/images/hotels/istanbul-luxury/deluxe-city.jpg']
      },
      {
        name: {
          tr: 'Boğaz Manzaralı Suite',
          en: 'Bosphorus View Suite',
          de: 'Bosporus Suite',
          ru: 'Люкс с видом на Босфор'
        },
        size: 65,
        capacity: 4,
        price: 5500,
        amenities: ['Ayrı oturma odası', 'Boğaz manzarası', 'Jakuzi', 'Butler servisi'],
        images: ['/images/hotels/istanbul-luxury/bosphorus-suite.jpg']
      },
      {
        name: {
          tr: 'Presidential Suite',
          en: 'Presidential Suite',
          de: 'Presidential Suite',
          ru: 'Президентский люкс'
        },
        size: 120,
        capacity: 6,
        price: 8000,
        amenities: ['Özel terras', 'Panoramik manzara', 'Özel mutfak', 'VIP hizmetler'],
        images: ['/images/hotels/istanbul-luxury/presidential.jpg']
      }
    ],
    images: [
      '/images/hotels/istanbul-luxury/exterior.jpg',
      '/images/hotels/istanbul-luxury/lobby.jpg',
      '/images/hotels/istanbul-luxury/restaurant.jpg',
      '/images/hotels/istanbul-luxury/spa.jpg'
    ],
    rating: 4.9,
    reviewCount: 3847,
    description: {
      tr: 'İstanbul\'un kalbi Sultanahmet\'te yer alan lüks otel, tarihi yarımadanın eşsiz manzarasını sunar. Modern konfor ile Osmanlı elegansını birleştiren otel, Ayasofya ve Sultanahmet Camii\'ne yürüme mesafesindedir.',
      en: 'Located in the heart of Istanbul in Sultanahmet, this luxury hotel offers unique views of the historic peninsula. Combining modern comfort with Ottoman elegance, the hotel is within walking distance of Hagia Sophia and the Blue Mosque.',
      de: 'Dieses Luxushotel im Herzen Istanbuls in Sultanahmet bietet einzigartige Ausblicke auf die historische Halbinsel. Das Hotel verbindet modernen Komfort mit osmanischer Eleganz und liegt nur wenige Gehminuten von der Hagia Sophia und der Blauen Moschee entfernt.',
      ru: 'Расположенный в сердце Стамбула в Султанахмете, этот роскошный отель предлагает уникальные виды на исторический полуостров. Сочетая современный комфорт с османской элегантностью, отель находится в пешей доступности от Айя-Софии и Голубой мечети.'
    },
    checkInTime: '15:00',
    checkOutTime: '12:00',
    policies: {
      cancellation: {
        tr: '48 saat öncesine kadar ücretsiz iptal',
        en: 'Free cancellation up to 48 hours before',
        de: 'Kostenlose Stornierung bis zu 48 Stunden vorher',
        ru: 'Бесплатная отмена за 48 часов'
      },
      children: {
        tr: '12 yaş altı çocuklar ücretsiz',
        en: 'Children under 12 stay free',
        de: 'Kinder unter 12 Jahren übernachten kostenlos',
        ru: 'Дети до 12 лет проживают бесплатно'
      },
      pets: {
        tr: 'Evcil hayvan kabul edilmez',
        en: 'Pets not allowed',
        de: 'Haustiere nicht erlaubt',
        ru: 'Размещение с домашними животными не допускается'
      }
    },
    specialOffers: [
      {
        title: {
          tr: 'Erken Rezervasyon İndirimi',
          en: 'Early Bird Discount',
          de: 'Frühbucherrabatt',
          ru: 'Скидка за раннее бронирование'
        },
        discount: 25,
        validUntil: '2024-12-31',
        conditions: {
          tr: '30 gün öncesinden rezervasyon yapanlara %25 indirim',
          en: '25% discount for bookings made 30 days in advance',
          de: '25% Rabatt bei Buchungen 30 Tage im Voraus',
          ru: '25% скидка при бронировании за 30 дней'
        }
      }
    ],
    seoData: {
      metaTitle: {
        tr: 'Istanbul Luxury Palace Hotel | 5 Yıldızlı Sultanahmet Oteli | Travel LyDian',
        en: 'Istanbul Luxury Palace Hotel | 5-Star Sultanahmet Hotel | Travel LyDian',
        de: 'Istanbul Luxury Palace Hotel | 5-Sterne Sultanahmet Hotel | Travel LyDian',
        ru: 'Istanbul Luxury Palace Hotel | 5-звездочный отель в Султанахмете | Travel LyDian'
      },
      metaDescription: {
        tr: 'Sultanahmet\'te 5 yıldızlı lüks otel! Ayasofya manzarası, spa, havuz. İstanbul\'un kalbinde unutulmaz konaklama deneyimi. Rezervasyon yapın! 🏨',
        en: '5-star luxury hotel in Sultanahmet! Hagia Sophia views, spa, pool. Unforgettable accommodation experience in the heart of Istanbul. Book now! 🏨',
        de: '5-Sterne Luxushotel in Sultanahmet! Hagia Sophia Blick, Spa, Pool. Unvergessliches Übernachtungserlebnis im Herzen Istanbuls. Jetzt buchen! 🏨',
        ru: '5-звездочный роскошный отель в Султанахмете! Вид на Айя-Софию, спа, бассейн. Незабываемое размещение в сердце Стамбула. Забронируйте сейчас! 🏨'
      },
      keywords: {
        tr: ['istanbul lüks otel', 'sultanahmet oteli', '5 yıldızlı istanbul', 'ayasofya oteli', 'boğaz manzaralı otel'],
        en: ['istanbul luxury hotel', 'sultanahmet hotel', '5 star istanbul', 'hagia sophia hotel', 'bosphorus view hotel'],
        de: ['istanbul luxushotel', 'sultanahmet hotel', '5 sterne istanbul', 'hagia sophia hotel', 'bosporus hotel'],
        ru: ['стамбул роскошный отель', 'султанахмет отель', '5 звезд стамбул', 'айя софия отель', 'босфор отель']
      },
      schema: {
        type: 'Hotel',
        properties: {
          name: 'Istanbul Luxury Palace Hotel',
          description: 'Luxury 5-star hotel in Sultanahmet',
          starRating: 5
        }
      },
      openGraph: {
        title: {
          tr: 'Istanbul Luxury Palace Hotel - Sultanahmet\'te Lüks Konaklama',
          en: 'Istanbul Luxury Palace Hotel - Luxury Accommodation in Sultanahmet',
          de: 'Istanbul Luxury Palace Hotel - Luxusunterkunft in Sultanahmet',
          ru: 'Istanbul Luxury Palace Hotel - Роскошное размещение в Султанахмете'
        },
        description: {
          tr: 'İstanbul\'un tarihi kalbinde lüks konaklama deneyimi yaşayın.',
          en: 'Experience luxury accommodation in the historic heart of Istanbul.',
          de: 'Erleben Sie luxuriöse Unterkünfte im historischen Herzen Istanbuls.',
          ru: 'Испытайте роскошное размещение в историческом сердце Стамбула.'
        },
        image: '/images/hotels/istanbul-luxury/og-image.jpg'
      }
    }
  },
  {
    id: 'istanbul-boutique-galata',
    destinationId: 'istanbul',
    name: 'Galata Boutique Hotel',
    slug: 'galata-boutique-hotel',
    category: 'boutique',
    starRating: 4,
    price: {
      min: 800,
      max: 2200,
      currency: 'TRY',
      perNight: true
    },
    location: {
      address: {
        tr: 'Galata Beyoğlu, İstanbul 34421',
        en: 'Galata Beyoğlu, Istanbul 34421',
        de: 'Galata Beyoğlu, Istanbul 34421',
        ru: 'Галата Бейоглу, Стамбул 34421'
      },
      coordinates: { lat: 41.0256, lng: 28.9741 },
      distanceToCenter: 2.1,
      distanceToAirport: 42,
      landmarks: [
        { name: 'Galata Kulesi', distance: 0.2 },
        { name: 'İstiklal Caddesi', distance: 0.8 },
        { name: 'Karaköy', distance: 0.5 },
        { name: 'Boğaz', distance: 0.3 }
      ]
    },
    amenities: {
      tr: [
        'Rooftop terrace',
        'Boutique spa',
        'Sanat galerisi',
        'Ücretsiz WiFi',
        'Café & restaurant',
        'Concierge',
        'Laundry service',
        'Otopark (ücretli)'
      ],
      en: [
        'Rooftop terrace',
        'Boutique spa',
        'Art gallery',
        'Free WiFi',
        'Café & restaurant',
        'Concierge',
        'Laundry service',
        'Parking (paid)'
      ],
      de: [
        'Dachterrasse',
        'Boutique-Spa',
        'Kunstgalerie',
        'Kostenloses WiFi',
        'Café & Restaurant',
        'Concierge',
        'Wäscheservice',
        'Parkplatz (kostenpflichtig)'
      ],
      ru: [
        'Терраса на крыше',
        'Бутик-спа',
        'Художественная галерея',
        'Бесплатный WiFi',
        'Кафе и ресторан',
        'Консьерж',
        'Прачечная',
        'Парковка (платно)'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Classic Room',
          en: 'Classic Room',
          de: 'Classic Zimmer',
          ru: 'Классический номер'
        },
        size: 25,
        capacity: 2,
        price: 800,
        amenities: ['Queen yatak', 'Şehir manzarası', 'Minibar'],
        images: ['/images/hotels/galata-boutique/classic.jpg']
      },
      {
        name: {
          tr: 'Deluxe Galata Room',
          en: 'Deluxe Galata Room',
          de: 'Deluxe Galata Zimmer',
          ru: 'Номер Делюкс Галата'
        },
        size: 32,
        capacity: 2,
        price: 1200,
        amenities: ['King yatak', 'Galata Kulesi manzarası', 'Balkon'],
        images: ['/images/hotels/galata-boutique/deluxe.jpg']
      },
      {
        name: {
          tr: 'Bosphorus Terrace Suite',
          en: 'Bosphorus Terrace Suite',
          de: 'Bosphorus Terrassen Suite',
          ru: 'Люкс с террасой и видом на Босфор'
        },
        size: 50,
        capacity: 3,
        price: 2200,
        amenities: ['Özel terras', 'Boğaz manzarası', 'Separate oturma alanı'],
        images: ['/images/hotels/galata-boutique/suite.jpg']
      }
    ],
    images: [
      '/images/hotels/galata-boutique/exterior.jpg',
      '/images/hotels/galata-boutique/rooftop.jpg',
      '/images/hotels/galata-boutique/lobby.jpg'
    ],
    rating: 4.7,
    reviewCount: 1892,
    description: {
      tr: 'Galata\'nın kalbinde yer alan butik otel, modern tasarım ile İstanbul\'un ruhu arasında mükemmel bir denge kurar. Galata Kulesi manzarası ve sanat dolu atmosferi ile unutulmaz bir konaklama deneyimi sunar.',
      en: 'Located in the heart of Galata, this boutique hotel strikes a perfect balance between modern design and the spirit of Istanbul. It offers an unforgettable accommodation experience with Galata Tower views and an art-filled atmosphere.',
      de: 'Dieses Boutique-Hotel im Herzen von Galata schafft eine perfekte Balance zwischen modernem Design und dem Geist Istanbuls. Es bietet ein unvergessliches Übernachtungserlebnis mit Blick auf den Galata-Turm und einer kunstvollen Atmosphäre.',
      ru: 'Расположенный в сердце Галаты, этот бутик-отель создает идеальный баланс между современным дизайном и духом Стамбула. Он предлагает незабываемый опыт размещения с видом на башню Галата и атмосферой, полной искусства.'
    },
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: {
      cancellation: {
        tr: '24 saat öncesine kadar ücretsiz iptal',
        en: 'Free cancellation up to 24 hours before',
        de: 'Kostenlose Stornierung bis zu 24 Stunden vorher',
        ru: 'Бесплатная отмена за 24 часа'
      },
      children: {
        tr: '6 yaş altı çocuklar ücretsiz',
        en: 'Children under 6 stay free',
        de: 'Kinder unter 6 Jahren übernachten kostenlos',
        ru: 'Дети до 6 лет проживают бесплатно'
      },
      pets: {
        tr: 'Küçük evcil hayvanlar kabul edilir (ücret karşılığı)',
        en: 'Small pets accepted (fee applies)',
        de: 'Kleine Haustiere akzeptiert (gegen Gebühr)',
        ru: 'Маленькие домашние животные принимаются (за дополнительную плату)'
      }
    },
    seoData: {
      metaTitle: {
        tr: 'Galata Boutique Hotel | Galata Kulesi Manzaralı Otel | Travel LyDian',
        en: 'Galata Boutique Hotel | Galata Tower View Hotel | Travel LyDian',
        de: 'Galata Boutique Hotel | Hotel mit Galata-Turm-Blick | Travel LyDian',
        ru: 'Galata Boutique Hotel | Отель с видом на башню Галата | Travel LyDian'
      },
      metaDescription: {
        tr: 'Galata\'da butik otel! Galata Kulesi manzarası, sanat galerisi, rooftop terrace. Modern tasarım ile İstanbul ruhunu yaşayın! 🎨',
        en: 'Boutique hotel in Galata! Galata Tower view, art gallery, rooftop terrace. Experience modern design with Istanbul soul! 🎨',
        de: 'Boutique-Hotel in Galata! Galata-Turm-Blick, Kunstgalerie, Dachterrasse. Erleben Sie modernes Design mit Istanbul-Seele! 🎨',
        ru: 'Бутик-отель в Галате! Вид на башню Галата, художественная галерея, терраса на крыше. Испытайте современный дизайн с душой Стамбула! 🎨'
      },
      keywords: {
        tr: ['galata boutique otel', 'galata kulesi oteli', 'beyoğlu otel', 'sanat oteli istanbul'],
        en: ['galata boutique hotel', 'galata tower hotel', 'beyoğlu hotel', 'art hotel istanbul'],
        de: ['galata boutique hotel', 'galata turm hotel', 'beyoğlu hotel', 'kunsthotel istanbul'],
        ru: ['галата бутик отель', 'отель галата башня', 'бейоглу отель', 'арт отель стамбул']
      },
      schema: {
        type: 'Hotel',
        properties: {
          name: 'Galata Boutique Hotel',
          description: 'Boutique hotel with Galata Tower views',
          starRating: 4
        }
      },
      openGraph: {
        title: {
          tr: 'Galata Boutique Hotel - Sanat ve Tasarım Buluşması',
          en: 'Galata Boutique Hotel - Where Art Meets Design',
          de: 'Galata Boutique Hotel - Wo Kunst auf Design trifft',
          ru: 'Galata Boutique Hotel - Где искусство встречается с дизайном'
        },
        description: {
          tr: 'Galata\'nın kalbinde sanat dolu butik konaklama deneyimi.',
          en: 'Art-filled boutique accommodation experience in the heart of Galata.',
          de: 'Kunstvolles Boutique-Übernachtungserlebnis im Herzen von Galata.',
          ru: 'Полный искусства бутик-опыт размещения в сердце Галаты.'
        },
        image: '/images/hotels/galata-boutique/og-image.jpg'
      }
    }
  },
  // KAPADOKYA OTELLERİ
  {
    id: 'cappadocia-cave-resort',
    destinationId: 'cappadocia',
    name: 'Cappadocia Cave Resort & Spa',
    slug: 'cappadocia-cave-resort-spa',
    category: 'luxury',
    starRating: 5,
    price: {
      min: 1800,
      max: 6500,
      currency: 'TRY',
      perNight: true
    },
    location: {
      address: {
        tr: 'Göreme, Nevşehir 50180',
        en: 'Goreme, Nevsehir 50180',
        de: 'Göreme, Nevşehir 50180',
        ru: 'Гёреме, Невшехир 50180'
      },
      coordinates: { lat: 38.6424, lng: 34.8294 },
      distanceToCenter: 1.2,
      distanceToAirport: 65,
      landmarks: [
        { name: 'Göreme Açık Hava Müzesi', distance: 0.8 },
        { name: 'Balon Kalkış Alanı', distance: 0.3 },
        { name: 'Uçhisar Kalesi', distance: 3.5 },
        { name: 'Avanos', distance: 8.2 }
      ]
    },
    amenities: {
      tr: [
        'Mağara spa ve wellness',
        'Sıcak hava balonu organizasyonu',
        'Açık ve kapalı havuz',
        'Fine dining restoran',
        'Wine cellar',
        'Fitness center',
        'Ücretsiz WiFi',
        'Concierge service',
        'Otopark',
        'Havaalanı transferi'
      ],
      en: [
        'Cave spa and wellness',
        'Hot air balloon organization',
        'Indoor and outdoor pool',
        'Fine dining restaurant',
        'Wine cellar',
        'Fitness center',
        'Free WiFi',
        'Concierge service',
        'Parking',
        'Airport shuttle'
      ],
      de: [
        'Höhlen-Spa und Wellness',
        'Heißluftballon-Organisation',
        'Innen- und Außenpool',
        'Fine-Dining-Restaurant',
        'Weinkeller',
        'Fitnesscenter',
        'Kostenloses WiFi',
        'Concierge-Service',
        'Parkplatz',
        'Flughafenshuttle'
      ],
      ru: [
        'Пещерный спа и велнес',
        'Организация полетов на воздушных шарах',
        'Крытый и открытый бассейн',
        'Ресторан высокой кухни',
        'Винный погреб',
        'Фитнес-центр',
        'Бесплатный WiFi',
        'Консьерж-сервис',
        'Парковка',
        'Трансфер из аэропорта'
      ]
    },
    roomTypes: [
      {
        name: {
          tr: 'Standard Cave Room',
          en: 'Standard Cave Room',
          de: 'Standard Höhlenzimmer',
          ru: 'Стандартный пещерный номер'
        },
        size: 32,
        capacity: 2,
        price: 1800,
        amenities: ['Mağara mimarisi', 'Vadi manzarası', 'Doğal taş banyo'],
        images: ['/images/hotels/cappadocia-cave/standard-cave.jpg']
      },
      {
        name: {
          tr: 'Deluxe Balloon View Cave',
          en: 'Deluxe Balloon View Cave',
          de: 'Deluxe Höhle mit Ballonblick',
          ru: 'Пещерный номер Делюкс с видом на шары'
        },
        size: 45,
        capacity: 3,
        price: 3200,
        amenities: ['Balon manzarası', 'Özel terras', 'Jakuzi'],
        images: ['/images/hotels/cappadocia-cave/deluxe-balloon.jpg']
      },
      {
        name: {
          tr: 'Royal Cave Suite',
          en: 'Royal Cave Suite',
          de: 'Royal Höhlen Suite',
          ru: 'Королевский пещерный люкс'
        },
        size: 80,
        capacity: 4,
        price: 6500,
        amenities: ['Panoramik manzara', 'Özel spa', 'Butler service', 'Şömine'],
        images: ['/images/hotels/cappadocia-cave/royal-suite.jpg']
      }
    ],
    images: [
      '/images/hotels/cappadocia-cave/exterior.jpg',
      '/images/hotels/cappadocia-cave/cave-spa.jpg',
      '/images/hotels/cappadocia-cave/pool.jpg',
      '/images/hotels/cappadocia-cave/restaurant.jpg'
    ],
    rating: 4.9,
    reviewCount: 2456,
    description: {
      tr: 'Kapadokya\'nın eşsiz mağara mimarisi ile modern lüksü birleştiren resort, peri bacaları arasında unutulmaz bir konaklama deneyimi sunar. Özel balon turları ve mağara spa ile Kapadokya\'nın büyüsüne kapılın.',
      en: 'This resort, combining Cappadocia\'s unique cave architecture with modern luxury, offers an unforgettable accommodation experience among fairy chimneys. Get enchanted by Cappadocia\'s magic with private balloon tours and cave spa.',
      de: 'Dieses Resort, das Kappadokiens einzigartige Höhlenarchitektur mit modernem Luxus verbindet, bietet ein unvergessliches Übernachtungserlebnis zwischen Feenkaminen. Lassen Sie sich von Kappadokiens Magie mit privaten Ballonfahrten und Höhlen-Spa verzaubern.',
      ru: 'Этот курорт, сочетающий уникальную пещерную архитектуру Каппадокии с современной роскошью, предлагает незабываемый опыт размещения среди сказочных дымоходов. Позвольте себе быть очарованными магией Каппадокии с частными турами на воздушных шарах и пещерным спа.'
    },
    checkInTime: '15:00',
    checkOutTime: '12:00',
    policies: {
      cancellation: {
        tr: '72 saat öncesine kadar ücretsiz iptal',
        en: 'Free cancellation up to 72 hours before',
        de: 'Kostenlose Stornierung bis zu 72 Stunden vorher',
        ru: 'Бесплатная отмена за 72 часа'
      },
      children: {
        tr: '10 yaş altı çocuklar ücretsiz',
        en: 'Children under 10 stay free',
        de: 'Kinder unter 10 Jahren übernachten kostenlos',
        ru: 'Дети до 10 лет проживают бесплатно'
      },
      pets: {
        tr: 'Evcil hayvan kabul edilmez',
        en: 'Pets not allowed',
        de: 'Haustiere nicht erlaubt',
        ru: 'Размещение с домашними животными не допускается'
      }
    },
    specialOffers: [
      {
        title: {
          tr: 'Balon Turu Paketi',
          en: 'Balloon Tour Package',
          de: 'Ballonfahrt-Paket',
          ru: 'Пакет с полетом на воздушном шаре'
        },
        discount: 30,
        validUntil: '2024-11-30',
        conditions: {
          tr: '3 gece konaklama + ücretsiz balon turu',
          en: '3 nights stay + complimentary balloon tour',
          de: '3 Nächte Aufenthalt + kostenlose Ballonfahrt',
          ru: '3 ночи проживания + бесплатный полет на воздушном шаре'
        }
      }
    ],
    seoData: {
      metaTitle: {
        tr: 'Cappadocia Cave Resort & Spa | 5 Yıldızlı Mağara Oteli | Travel LyDian',
        en: 'Cappadocia Cave Resort & Spa | 5-Star Cave Hotel | Travel LyDian',
        de: 'Cappadocia Cave Resort & Spa | 5-Sterne Höhlenhotel | Travel LyDian',
        ru: 'Cappadocia Cave Resort & Spa | 5-звездочный пещерный отель | Travel LyDian'
      },
      metaDescription: {
        tr: 'Kapadokya\'da 5 yıldızlı mağara resort! Balon manzarası, spa, lüks konaklama. Peri bacaları arasında unutulmaz deneyim. Rezervasyon! 🏨🎈',
        en: '5-star cave resort in Cappadocia! Balloon views, spa, luxury accommodation. Unforgettable experience among fairy chimneys. Book now! 🏨🎈',
        de: '5-Sterne Höhlen-Resort in Kappadokien! Ballonblick, Spa, Luxusunterkunft. Unvergessliches Erlebnis zwischen Feenkaminen. Buchen Sie jetzt! 🏨🎈',
        ru: '5-звездочный пещерный курорт в Каппадокии! Виды на шары, спа, роскошное размещение. Незабываемый опыт среди сказочных дымоходов. Забронируйте! 🏨🎈'
      },
      keywords: {
        tr: ['kapadokya mağara otel', 'cappadocia cave hotel', 'kapadokya lüks otel', 'göreme oteli', 'balon manzaralı otel'],
        en: ['cappadocia cave hotel', 'cappadocia luxury resort', 'goreme hotel', 'balloon view hotel', 'fairy chimneys hotel'],
        de: ['kappadokien höhlenhotel', 'kappadokien luxusresort', 'göreme hotel', 'ballonblick hotel', 'feenkamine hotel'],
        ru: ['каппадокия пещерный отель', 'каппадокия роскошный курорт', 'гёреме отель', 'отель вид на шары', 'отель сказочные дымоходы']
      },
      schema: {
        type: 'Resort',
        properties: {
          name: 'Cappadocia Cave Resort & Spa',
          description: 'Luxury cave resort in Cappadocia',
          starRating: 5
        }
      },
      openGraph: {
        title: {
          tr: 'Cappadocia Cave Resort & Spa - Peri Bacaları Arasında Lüks',
          en: 'Cappadocia Cave Resort & Spa - Luxury Among Fairy Chimneys',
          de: 'Cappadocia Cave Resort & Spa - Luxus zwischen Feenkaminen',
          ru: 'Cappadocia Cave Resort & Spa - Роскошь среди сказочных дымоходов'
        },
        description: {
          tr: 'Kapadokya\'nın büyülü mağara mimarisinde lüks konaklama ve spa deneyimi.',
          en: 'Luxury accommodation and spa experience in Cappadocia\'s magical cave architecture.',
          de: 'Luxuriöse Unterkunft und Spa-Erlebnis in Kappadokiens magischer Höhlenarchitektur.',
          ru: 'Роскошное размещение и спа-опыт в волшебной пещерной архитектуре Каппадокии.'
        },
        image: '/images/hotels/cappadocia-cave/og-image.jpg'
      }
    }
  }
];

export default turkeyHotels;