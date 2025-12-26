/**
 * Curated Collections for Explore Page
 * Hand-picked experiences and recommendations
 */

export interface Collection {
  id: string;
  slug: string;
  icon: string;
  image: string;
  color: string;
  itemIds: string[]; // IDs from tours, rentals, etc.
  itemType: 'tour' | 'rental' | 'mixed';
  translations: {
    tr: { title: string; description: string; tagline: string };
    en: { title: string; description: string; tagline: string };
    de: { title: string; description: string; tagline: string };
    ru: { title: string; description: string; tagline: string };
    ar: { title: string; description: string; tagline: string };
    fa: { title: string; description: string; tagline: string };
    fr: { title: string; description: string; tagline: string };
    el: { title: string; description: string; tagline: string };
  };
}

export const collections: Collection[] = [
  {
    id: 'best-for-families',
    slug: 'best-for-families',
    icon: 'Users',
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    itemType: 'mixed',
    itemIds: ['antalya-boat-tour-002', 'antalya-adventure-005', 'antalya-special-001'],
    translations: {
      tr: {
        title: 'Aileler İçin En İyiler',
        tagline: 'Çocuklarla unutulmaz anılar yaratın',
        description: 'Çocuklar için özel olarak seçilmiş aktiviteler, turlar ve konaklama seçenekleri'
      },
      en: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      de: {
        title: 'Beste für Familien',
        tagline: 'Schaffen Sie unvergessliche Erinnerungen mit Kindern',
        description: 'Speziell ausgewählte Aktivitäten, Touren und Unterkunftsmöglichkeiten für Kinder'
      },
      ru: {
        title: 'Лучшее для семей',
        tagline: 'Создайте незабываемые воспоминания с детьми',
        description: 'Специально отобранные мероприятия, туры и варианты размещения для детей'
      },
      ar: {
        title: 'الأفضل للعائلات',
        tagline: 'اخلق ذكريات لا تُنسى مع الأطفال',
        description: 'أنشطة وجولات وخيارات إقامة مختارة خصيصًا للأطفال'
      },
      fa: {
        title: 'بهترین برای خانواده‌ها',
        tagline: 'خاطرات فراموش‌نشدنی با کودکان بسازید',
        description: 'فعالیت‌ها، تورها و گزینه‌های اقامت منتخب برای کودکان'
      },
      fr: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      el: {
        title: 'Meilleur pour les familles',
        tagline: 'Créez des souvenirs inoubliables avec les enfants',
        description: 'Activités, circuits et options d\'hébergement spécialement sélectionnés pour les enfants'
      }
    }
  },
  {
    id: 'romantic-getaways',
    slug: 'romantic-getaways',
    icon: 'Heart',
    color: 'from-pink-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    itemType: 'mixed',
    itemIds: ['antalya-boat-tour-001', 'antalya-special-002'],
    translations: {
      tr: {
        title: 'Romantik Kaçamaklar',
        tagline: 'Sevgilinizle özel anlar',
        description: 'Çiftler için mükemmel romantik deneyimler ve konaklama'
      },
      en: {
        title: 'Romantic Getaways',
        tagline: 'Special moments with your loved one',
        description: 'Perfect romantic experiences and accommodation for couples'
      },
      de: {
        title: 'Romantische Kurzurlaube',
        tagline: 'Besondere Momente mit Ihrem Liebsten',
        description: 'Perfekte romantische Erlebnisse und Unterkunft für Paare'
      },
      ru: {
        title: 'Романтические поездки',
        tagline: 'Особые моменты с любимым человеком',
        description: 'Идеальные романтические впечатления и размещение для пар'
      },
      ar: {
        title: 'رحلات رومانسية',
        tagline: 'لحظات خاصة مع من تحب',
        description: 'تجارب رومانسية مثالية وإقامة للأزواج'
      },
      fa: {
        title: 'سفرهای رمانتیک',
        tagline: 'لحظات خاص با عزیزتان',
        description: 'تجربیات رمانتیک کامل و اقامت برای زوج‌ها'
      },
      fr: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      el: {
        title: 'Escapades romantiques',
        tagline: 'Moments spéciaux avec votre bien-aimé',
        description: 'Expériences romantiques parfaites et hébergement pour couples'
      }
    }
  },
  {
    id: 'adventure-seekers',
    slug: 'adventure-seekers',
    icon: 'Zap',
    color: 'from-orange-500 to-red-600',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    itemType: 'tour',
    itemIds: ['antalya-adventure-001', 'antalya-adventure-002', 'antalya-adventure-003', 'antalya-adventure-004'],
    translations: {
      tr: {
        title: 'Macera Arayanlar',
        tagline: 'Adrenalin dolu deneyimler',
        description: 'Rafting, paragliding, ATV ve daha fazlası'
      },
      en: {
        title: 'Adventure Seekers',
        tagline: 'Adrenaline-filled experiences',
        description: 'Rafting, paragliding, ATV and more'
      },
      de: {
        title: 'Abenteurer',
        tagline: 'Adrenalingeladene Erlebnisse',
        description: 'Rafting, Paragliding, ATV und mehr'
      },
      ru: {
        title: 'Искатели приключений',
        tagline: 'Впечатления полные адреналина',
        description: 'Рафтинг, параглайдинг, квадроциклы и многое другое'
      },
      ar: {
        title: 'الباحثون عن المغامرة',
        tagline: 'تجارب مليئة بالأدرينالين',
        description: 'التجديف والطيران الشراعي والدراجات الرباعية والمزيد'
      },
      fa: {
        title: 'ماجراجویان',
        tagline: 'تجربیات پر از آدرنالین',
        description: 'رفتینگ، پاراگلایدینگ، موتور چهارچرخ و بیشتر'
      },
      fr: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      el: {
        title: 'Aventuriers',
        tagline: 'Expériences pleines d\'adrénaline',
        description: 'Rafting, parapente, quad et plus'
      }
    }
  },
  {
    id: 'cultural-enthusiasts',
    slug: 'cultural-enthusiasts',
    icon: 'Landmark',
    color: 'from-purple-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1541969187011-88a2137a7c5e?auto=format&fit=crop&w=800&q=80',
    itemType: 'tour',
    itemIds: ['antalya-cultural-001', 'antalya-cultural-002', 'antalya-cultural-003', 'antalya-cultural-004'],
    translations: {
      tr: {
        title: 'Kültür Tutkunları',
        tagline: 'Tarihi keşfedin',
        description: 'Antik kentler, müzeler ve arkeolojik siteler'
      },
      en: {
        title: 'Cultural Enthusiasts',
        tagline: 'Discover history',
        description: 'Ancient cities, museums and archaeological sites'
      },
      de: {
        title: 'Kulturbegeisterte',
        tagline: 'Geschichte entdecken',
        description: 'Antike Städte, Museen und archäologische Stätten'
      },
      ru: {
        title: 'Любители культуры',
        tagline: 'Откройте для себя историю',
        description: 'Древние города, музеи и археологические памятники'
      },
      ar: {
        title: 'عشاق الثقافة',
        tagline: 'اكتشف التاريخ',
        description: 'المدن القديمة والمتاحف والمواقع الأثرية'
      },
      fa: {
        title: 'علاقه‌مندان فرهنگی',
        tagline: 'تاریخ را کشف کنید',
        description: 'شهرهای باستانی، موزه‌ها و مکان‌های باستان‌شناسی'
      },
      fr: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      el: {
        title: 'Passionnés de culture',
        tagline: 'Découvrir l\'histoire',
        description: 'Villes anciennes, musées et sites archéologiques'
      }
    }
  },
  {
    id: 'luxury-experiences',
    slug: 'luxury-experiences',
    icon: 'Crown',
    color: 'from-yellow-500 to-amber-600',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    itemType: 'mixed',
    itemIds: ['antalya-special-002', 'antalya-adventure-003'],
    translations: {
      tr: {
        title: 'Lüks Deneyimler',
        tagline: 'Kendinizi şımartın',
        description: 'Premium turlar, lüks konaklama ve VIP hizmetler'
      },
      en: {
        title: 'Luxury Experiences',
        tagline: 'Pamper yourself',
        description: 'Premium tours, luxury accommodation and VIP services'
      },
      de: {
        title: 'Luxus-Erlebnisse',
        tagline: 'Verwöhnen Sie sich',
        description: 'Premium-Touren, Luxusunterkunft und VIP-Services'
      },
      ru: {
        title: 'Роскошные впечатления',
        tagline: 'Побалуйте себя',
        description: 'Премиум-туры, роскошное размещение и VIP-услуги'
      },
      ar: {
        title: 'تجارب فاخرة',
        tagline: 'دلل نفسك',
        description: 'جولات متميزة وإقامة فاخرة وخدمات كبار الشخصيات'
      },
      fa: {
        title: 'تجربیات لوکس',
        tagline: 'خودتان را لوس کنید',
        description: 'تورهای ممتاز، اقامت لوکس و خدمات VIP'
      },
      fr: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      el: {
        title: 'Expériences de luxe',
        tagline: 'Chouchoutez-vous',
        description: 'Circuits premium, hébergement de luxe et services VIP'
      }
    }
  },
  {
    id: 'budget-friendly',
    slug: 'budget-friendly',
    icon: 'DollarSign',
    color: 'from-green-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    itemType: 'mixed',
    itemIds: ['antalya-nature-001', 'antalya-cultural-004'],
    translations: {
      tr: {
        title: 'Bütçe Dostu',
        tagline: 'Cüzdanınızı koruyun',
        description: 'Uygun fiyatlı turlar ve ekonomik konaklama seçenekleri'
      },
      en: {
        title: 'Budget Friendly',
        tagline: 'Protect your wallet',
        description: 'Affordable tours and economical accommodation options'
      },
      de: {
        title: 'Budgetfreundlich',
        tagline: 'Schonen Sie Ihr Portemonnaie',
        description: 'Erschwingliche Touren und wirtschaftliche Unterkunftsmöglichkeiten'
      },
      ru: {
        title: 'Экономный',
        tagline: 'Защитите свой кошелек',
        description: 'Доступные туры и экономичные варианты размещения'
      },
      ar: {
        title: 'صديق للميزانية',
        tagline: 'احمِ محفظتك',
        description: 'جولات بأسعار معقولة وخيارات إقامة اقتصادية'
      },
      fa: {
        title: 'مقرون به صرفه',
        tagline: 'از کیف پول خود محافظت کنید',
        description: 'تورهای مقرون به صرفه و گزینه‌های اقامت اقتصادی'
      },
      fr: {
        title: 'Best for Families',
        tagline: 'Create unforgettable memories with kids',
        description: 'Specially selected activities, tours and accommodation options for children'
      },
      el: {
        title: 'Économique',
        tagline: 'Protégez votre portefeuille',
        description: 'Circuits abordables et options d\'hébergement économiques'
      }
    }
  }
];
