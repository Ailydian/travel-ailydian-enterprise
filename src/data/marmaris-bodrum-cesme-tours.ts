/**
 * Comprehensive Tours Data for Marmaris, Bodrum, Çeşme
 * With Competitor Price Analysis - Always Best Price Guarantee
 */

export interface TourPrice {
  travelLyDian: number;
  competitors: {
    getYourGuide?: number;
    viator?: number;
    tripAdvisor?: number;
  };
  savings: number;
  savingsPercentage: number;
}

export interface ComprehensiveTour {
  id: string;
  name: string;
  slug: string;
  region: 'Marmaris' | 'Bodrum' | 'Çeşme';
  category: 'boat' | 'adventure' | 'cultural' | 'daily' | 'multi-day';
  description: string;
  longDescription: string;
  pricing: TourPrice;
  duration: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  minAge: number;
  maxGroupSize: number;
  included: string[];
  excluded: string[];
  meetingPoint: string;
  cancellationPolicy: string;
  highlights: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  availability: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Helper function to calculate pricing with guaranteed savings
const calculateBestPrice = (competitorPrices: number[]): TourPrice => {
  const avgCompetitorPrice = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
  const ourPrice = Math.floor(avgCompetitorPrice * 0.88); // 12% cheaper on average
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

export const marmarisTours: ComprehensiveTour[] = [
  {
    id: 'marmaris-boat-tour-001',
    name: 'Marmaris 12 Ada Tekne Turu',
    slug: 'marmaris-12-islands-boat-tour',
    region: 'Marmaris',
    category: 'boat',
    description: 'Muhteşem koylar, berrak sular ve 12 farklı ada. Öğle yemeği dahil tam gün tekne turu.',
    longDescription: 'Marmaris\'in en popüler tekne turunda 12 farklı koy ve adayı keşfedin. Aquarium Koyu, Cennet Adası, Fosforlu Mağara ve daha fazlası. Öğle yemeği, meyve ikramları ve sınırsız içecekler dahil. Yüzme molaları, snorkeling imkanı.',
    pricing: calculateBestPrice([850, 900, 875]),
    duration: '8 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 80,
    included: ['Otel transfer', 'Öğle yemeği', 'Meyve ikramları', 'Sınırsız soft drink', 'Sigorta', 'Profesyonel rehber'],
    excluded: ['Alkollü içecekler', 'Fotoğraf hizmetleri', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '12 farklı koy ve ada',
      'Aquarium Koyu\'nda yüzme',
      'Fosforlu Mağara gezisi',
      'Lezzetli açık büfe öğle yemeği',
      'Snorkeling ekipmanı',
      'Canlı müzik ve animasyon'
    ],
    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 342,
    availability: ['Pazartesi', 'Çarşamba', 'Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Marmaris 12 Ada Tekne Turu | En Uygun Fiyat Garantisi',
      metaDescription: 'Marmaris 12 ada tekne turunda muhteşem koyları keşfedin. Öğle yemeği dahil, en uygun fiyat. Şimdi rezervasyon yapın!',
      keywords: ['marmaris tekne turu', '12 ada turu', 'marmaris boat tour', 'aquarium koyu']
    }
  },

  {
    id: 'marmaris-jeep-safari-001',
    name: 'Marmaris Jeep Safari Macerası',
    slug: 'marmaris-jeep-safari-adventure',
    region: 'Marmaris',
    category: 'adventure',
    description: 'Off-road macera! Dağ köyleri, çam ormanları ve gizli şelaleler. Adrenalin dolu bir gün.',
    longDescription: 'Toroslar\'da unutulmaz bir safari! Açık jeeplerle off-road yollarda 120 km\'lik macera. Geleneksel köy ziyareti, doğal şelalede yüzme, çam ormanlarında barbekü. Tam gün aktivite.',
    pricing: calculateBestPrice([650, 700, 675]),
    duration: '7 saat',
    difficulty: 'Orta',
    minAge: 7,
    maxGroupSize: 12,
    included: ['Otel transfer', 'Profesyonel şoför', 'Öğle yemeği (barbekü)', 'Rehber', 'Sigorta'],
    excluded: ['İçecekler', 'Fotoğraf hizmetleri'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Toros Dağları\'nda off-road',
      'Geleneksel köy ziyareti',
      'Doğal şelalede yüzme',
      'Orman içinde barbekü',
      'Muhteşem manzaralar',
      'Su savaşı eğlencesi'
    ],
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 287,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Marmaris Jeep Safari Turu | Off-Road Macera',
      metaDescription: 'Marmaris jeep safari turunda Toros Dağları\'nı keşfedin. Şelale, köy ziyareti, barbekü dahil. En uygun fiyat!',
      keywords: ['marmaris jeep safari', 'off road marmaris', 'safari turu']
    }
  },

  {
    id: 'marmaris-diving-experience-001',
    name: 'Marmaris Dalış Deneyimi - PADI Sertifikalı',
    slug: 'marmaris-scuba-diving-padi',
    region: 'Marmaris',
    category: 'adventure',
    description: 'Profesyonel dalış eğitmenleri ile muhteşem sualtı dünyası. Başlangıç ve ileri seviye.',
    longDescription: 'Marmaris\'in kristal berraklığındaki sularında PADI sertifikalı eğitmenlerle dalış deneyimi. Tüm ekipman dahil (tüp, regülatör, BCD, wetsuit). 2 farklı dalış noktası, underwater fotoğraflar.',
    pricing: calculateBestPrice([780, 820, 800]),
    duration: '5 saat',
    difficulty: 'Orta',
    minAge: 12,
    maxGroupSize: 8,
    included: ['Otel transfer', 'Tüm dalış ekipmanı', 'PADI eğitmen', '2 dalış', 'Underwater fotoğraflar', 'Kahvaltı ve öğle yemeği', 'Sigorta'],
    excluded: ['Sertifika ücreti (ekstra 150 TRY)', 'Video çekimi'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'PADI sertifikalı eğitmenler',
      '2 farklı dalış noktası',
      'Tüm ekipman dahil',
      'Underwater fotoğraflar',
      'Küçük gruplar',
      'Sertifika imkanı'
    ],
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 203,
    availability: ['Pazartesi', 'Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Marmaris Dalış Turu | PADI Sertifikalı Scuba Diving',
      metaDescription: 'Marmaris\'te PADI sertifikalı dalış deneyimi. Tüm ekipman dahil, 2 dalış noktası. En uygun fiyat garantisi.',
      keywords: ['marmaris dalış', 'scuba diving marmaris', 'padi diving']
    }
  },

  {
    id: 'marmaris-dalyan-mud-bath-001',
    name: 'Dalyan Kaplıcaları ve Çamur Banyosu Turu',
    slug: 'dalyan-mud-bath-turtle-beach',
    region: 'Marmaris',
    category: 'daily',
    description: 'Dalyan Çayı tekne gezisi, çamur banyosu, antik Kaunos harabeleri ve İztuzu Plajı.',
    longDescription: 'Dalyan\'ın eşsiz güzelliklerini keşfedin. Tekne ile Dalyan Çayı gezisi, termal çamur banyoları, antik Kaunos harabeleri ziyareti, caretta caretta kaplumbağalarının yuva yaptığı İztuzu Plajı\'nda yüzme.',
    pricing: calculateBestPrice([580, 620, 600]),
    duration: '9 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 40,
    included: ['Otel transfer', 'Tekne gezisi', 'Çamur banyosu', 'Kaunos harabeleri girişi', 'Öğle yemeği', 'Rehber', 'Sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Dalyan Çayı tekne turu',
      'Termal çamur banyosu',
      'Antik Kaunos harabeleri',
      'İztuzu Caretta Plajı',
      'Kral mezarları',
      'Doğal termal kaynaklar'
    ],
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 391,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Dalyan Çamur Banyosu Turu | Kaunos ve İztuzu Plajı',
      metaDescription: 'Dalyan turu: Çamur banyosu, antik Kaunos, İztuzu Caretta Plajı. Öğle yemeği dahil, en uygun fiyat.',
      keywords: ['dalyan turu', 'çamur banyosu', 'iztuzu plajı', 'kaunos']
    }
  },

  {
    id: 'marmaris-rafting-adventure-001',
    name: 'Marmaris Rafting Macerası - Dalaman Çayı',
    slug: 'marmaris-rafting-dalaman-river',
    region: 'Marmaris',
    category: 'adventure',
    description: 'Dalaman Çayı\'nda adrenalin dolu rafting. 14 km macera, profesyonel ekip.',
    longDescription: 'Dalaman Çayı\'nda unutulmaz rafting deneyimi! 14 km parkurda 12 heyecanlı rapid. Profesyonel raftingciler, tüm güvenlik ekipmanı. Öğle yemeği molası, su savaşı eğlencesi. Başlangıç seviyesi için uygundur.',
    pricing: calculateBestPrice([450, 490, 470]),
    duration: '6 saat',
    difficulty: 'Orta',
    minAge: 10,
    maxGroupSize: 24,
    included: ['Otel transfer', 'Tüm rafting ekipmanı', 'Profesyonel kılavuz', 'Öğle yemeği', 'Sigorta', 'Fotoğraf çekimi'],
    excluded: ['İçecekler', 'Video kaydı (ekstra 100 TRY)'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '14 km rafting parkuru',
      '12 heyecanlı rapid',
      'Profesyonel ekipman',
      'Deneyimli kılavuzlar',
      'Su savaşı eğlencesi',
      'Fotoğraf hizmeti'
    ],
    images: ['https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 276,
    availability: ['Nisan-Ekim arası her gün'],
    seo: {
      metaTitle: 'Marmaris Rafting Turu | Dalaman Çayı Rafting',
      metaDescription: 'Dalaman Çayı rafting macerası. 14 km parkur, profesyonel ekipman, öğle yemeği dahil. En uygun fiyat.',
      keywords: ['marmaris rafting', 'dalaman rafting', 'rafting turu']
    }
  },

  {
    id: 'marmaris-atv-quad-safari-001',
    name: 'Marmaris ATV Safari - Quad Bike Macerası',
    slug: 'marmaris-atv-quad-safari',
    region: 'Marmaris',
    category: 'adventure',
    description: 'ATV ile çamur yollar, orman patikalar ve muhteşem manzaralar. Adrenalin dolu 2 saat.',
    longDescription: 'Quad bike ile Marmaris dağlarında off-road macera! Çam ormanları, çamur yollar, panoramik manzara noktaları. Profesyonel eğitim, tüm güvenlik ekipmanı. Tek veya çift kişilik ATV seçenekleri.',
    pricing: calculateBestPrice([380, 420, 400]),
    duration: '2 saat',
    difficulty: 'Orta',
    minAge: 16,
    maxGroupSize: 20,
    included: ['Otel transfer', 'ATV kirası', 'Kask ve eldiven', 'Profesyonel eğitim', 'Rehber', 'Sigorta'],
    excluded: ['Fotoğraf hizmetleri', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Quad bike macerası',
      'Off-road parkurlar',
      'Çam ormanları',
      'Muhteşem manzaralar',
      'Profesyonel eğitim',
      'Tek/çift kişilik seçenekler'
    ],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1612544409025-171c8fab3a73?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 312,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Marmaris ATV Safari | Quad Bike Turu',
      metaDescription: 'Marmaris ATV safari ile off-road macera. Profesyonel eğitim, tüm ekipman dahil. En uygun fiyat.',
      keywords: ['marmaris atv', 'quad bike marmaris', 'atv safari']
    }
  },

  {
    id: 'marmaris-turkish-bath-massage-001',
    name: 'Geleneksel Türk Hamamı ve Masaj',
    slug: 'marmaris-turkish-bath-massage',
    region: 'Marmaris',
    category: 'daily',
    description: 'Otantik Türk hamamı deneyimi. Kese, köpük, aromatik yağ masajı. Tam rahatlama.',
    longDescription: 'Tarihi Marmaris Hamamı\'nda otantik deneyim. Sıcak taş üzerinde kese ve köpük masajı, aromatik yağlarla full body masaj, sauna ve buhar odası. Geleneksel Türk hamamı ritüeli.',
    pricing: calculateBestPrice([320, 360, 340]),
    duration: '2.5 saat',
    difficulty: 'Kolay',
    minAge: 14,
    maxGroupSize: 10,
    included: ['Otel transfer', 'Kese ve köpük masajı', 'Aromatik yağ masajı (45 dk)', 'Sauna', 'Buhar odası', 'Çay ve tatlı ikramı'],
    excluded: ['İçecekler', 'Ek masaj hizmetleri', 'Bahşiş'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Otantik Türk hamamı',
      'Kese ve köpük masajı',
      '45 dk yağ masajı',
      'Sauna ve buhar odası',
      'Deneyimli masözler',
      'Rahatlatıcı atmosfer'
    ],
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 428,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Marmaris Türk Hamamı | Geleneksel Hamam ve Masaj',
      metaDescription: 'Marmaris\'te otantik Türk hamamı deneyimi. Kese, köpük, masaj dahil. En uygun fiyat garantisi.',
      keywords: ['marmaris hamam', 'türk hamamı', 'hamam masaj']
    }
  },

  {
    id: 'marmaris-paragliding-001',
    name: 'Marmaris Yamaç Paraşütü - Tandem Uçuş',
    slug: 'marmaris-paragliding-tandem',
    region: 'Marmaris',
    category: 'adventure',
    description: 'Babadag\'dan muhteşem uçuş! 1800m yükseklikten denize iniş. HD video dahil.',
    longDescription: 'Fethiye Babadag\'dan (1800m) tandem yamaç paraşütü uçuşu. Deneyimli pilotlarla 30-45 dakikalık muhteşem uçuş. Otel transfer, ekipman, HD video çekimi dahil. Hiçbir deneyim gerekmez.',
    pricing: calculateBestPrice([950, 1050, 1000]),
    duration: '4 saat (uçuş 30-45 dk)',
    difficulty: 'Kolay',
    minAge: 7,
    maxGroupSize: 15,
    included: ['Otel transfer (Marmaris-Fethiye)', 'Tüm ekipman', 'Deneyimli pilot', 'HD video ve fotoğraf', 'Uçuş sertifikası', 'Sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal (hava durumu iptalleri tam iade)',
    highlights: [
      '1800m yükseklikten uçuş',
      'Deneyimli pilotlar',
      'HD video çekimi',
      'Muhteşem manzara',
      'Deneyim gerektirmez',
      'Uçuş sertifikası'
    ],
    images: ['https://images.unsplash.com/photo-1512608455489-4e7e2ee8f4b6?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewCount: 189,
    availability: ['Nisan-Ekim (hava durumuna göre)'],
    seo: {
      metaTitle: 'Marmaris Yamaç Paraşütü | Babadag Tandem Uçuş',
      metaDescription: '1800m\'den muhteşem yamaç paraşütü deneyimi. HD video dahil, deneyim gerektirmez. En uygun fiyat.',
      keywords: ['marmaris yamaç paraşütü', 'paragliding', 'babadag']
    }
  },

  {
    id: 'marmaris-fishing-tour-001',
    name: 'Marmaris Balık Tutma Turu - Sunset Edition',
    slug: 'marmaris-fishing-sunset-tour',
    region: 'Marmaris',
    category: 'daily',
    description: 'Gün batımında balık tutma deneyimi. Tüm ekipman, profesyonel kılavuz, yakalanan balıklar pişirilir.',
    longDescription: 'Marmaris Körfezi\'nde sunset balık tutma turu. Profesyonel balıkçı kılavuz, tüm olta ekipmanı, yem dahil. Yakaladığınız balıklar teknede taze pişirilir. Gün batımı eşliğinde unutulmaz deneyim.',
    pricing: calculateBestPrice([420, 460, 440]),
    duration: '4 saat',
    difficulty: 'Kolay',
    minAge: 5,
    maxGroupSize: 15,
    included: ['Otel transfer', 'Olta ekipmanı ve yem', 'Profesyonel kılavuz', 'Balık pişirme', 'Soft içecekler', 'Sunset manzarası'],
    excluded: ['Alkollü içecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Marmaris Marina',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Sunset balık tutma',
      'Profesyonel ekipman',
      'Balık pişirme hizmeti',
      'Deneyimli kılavuz',
      'Gün batımı manzarası',
      'Aileler için ideal'
    ],
    images: ['https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1545450660-7a0e946d0e83?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 167,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Marmaris Balık Tutma Turu | Sunset Fishing',
      metaDescription: 'Marmaris\'te gün batımı balık tutma turu. Tüm ekipman dahil, yakalanan balıklar pişirilir.',
      keywords: ['marmaris balık tutma', 'fishing tour', 'sunset fishing']
    }
  },

  {
    id: 'marmaris-horse-riding-001',
    name: 'Marmaris At Binme Turu - Plaj ve Orman',
    slug: 'marmaris-horse-riding-beach-forest',
    region: 'Marmaris',
    category: 'daily',
    description: 'Atlı gezinti ile sahil ve orman. Başlangıç seviyesi için uygun, deneyim gerektirmez.',
    longDescription: 'Sakin atlarla kumsal ve çam ormanlarında romantik gezinti. Profesyonel eğitmen eşliğinde, başlangıç seviyesi için ideal. Gün batımı turları mevcut. 2 saat süren unutulmaz deneyim.',
    pricing: calculateBestPrice([350, 390, 370]),
    duration: '2 saat',
    difficulty: 'Kolay',
    minAge: 8,
    maxGroupSize: 10,
    included: ['Otel transfer', 'At kirası', 'Profesyonel eğitmen', 'Kask', 'Sigorta', 'Fotoğraf çekimi'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Sahil ve orman rotası',
      'Sakin ve eğitimli atlar',
      'Deneyim gerektirmez',
      'Profesyonel eğitmen',
      'Gün batımı seçeneği',
      'Fotoğraf hizmeti'
    ],
    images: ['https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 198,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Marmaris At Binme Turu | Plaj ve Orman Gezintisi',
      metaDescription: 'Marmaris\'te at binme turu. Plaj ve orman rotası, deneyim gerektirmez. En uygun fiyat.',
      keywords: ['marmaris at binme', 'horse riding', 'atlı tur']
    }
  },

  {
    id: 'marmaris-cleopatra-island-001',
    name: 'Kleopatra Adası ve Gökovaköy Turu',
    slug: 'cleopatra-island-gokova-tour',
    region: 'Marmaris',
    category: 'boat',
    description: 'Efsanevi Kleopatra Adası, antik Cedrae harabeleri ve turkuaz sular. Premium tekne turu.',
    longDescription: 'Kleopatra Adası\'nın altın kumları ve Gökovaköy\'ün turkuaz sularında unutulmaz gün. Antik Cedrae harabeleri, eşsiz snorkeling, lezzetli açık büfe. Premium tekne ile lüks deneyim.',
    pricing: calculateBestPrice([720, 780, 750]),
    duration: '9 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 70,
    included: ['Otel transfer', 'Premium tekne', 'Açık büfe öğle yemeği', 'Kleopatra Adası giriş', 'Snorkeling ekipmanı', 'Sınırsız soft drink'],
    excluded: ['Alkollü içecekler', 'Antik kent girişi (ekstra 50 TRY)'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Kleopatra\'nın altın kumları',
      'Antik Cedrae harabeleri',
      'Turkuaz Gökovaköy suları',
      'Premium tekne',
      'Snorkeling ekipmanı',
      'Açık büfe öğle yemeği'
    ],
    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 456,
    availability: ['Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Kleopatra Adası Turu | Gökovaköy Tekne Turu',
      metaDescription: 'Kleopatra Adası ve Gökovaköy tekne turu. Altın kumlar, antik kent, öğle yemeği dahil.',
      keywords: ['kleopatra adası', 'gökovaköy', 'sedir adası']
    }
  },

  {
    id: 'marmaris-aqua-park-001',
    name: 'Marmaris Aqua Dream Su Parkı Günü',
    slug: 'marmaris-aqua-dream-water-park',
    region: 'Marmaris',
    category: 'daily',
    description: 'Türkiye\'nin en büyük su parklarından biri. 24 kaydırak, dalga havuzu, lazy river.',
    longDescription: 'Aqua Dream Water Park\'ta aile boyu eğlence! 24 farklı kaydırak, dev dalga havuzu, lazy river, çocuk havuzları. Öğle yemeği dahil tam gün eğlence paketi. Soyunma dolabı ve şezlong dahil.',
    pricing: calculateBestPrice([280, 320, 300]),
    duration: 'Tam gün (6-7 saat)',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 100,
    included: ['Otel transfer', 'Giriş bileti', 'Öğle yemeği', 'Soyunma dolabı', 'Şezlong', 'Sigorta'],
    excluded: ['İçecekler', 'Ekstra yiyecekler', 'Fotoğraf hizmetleri'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '24 farklı kaydırak',
      'Dev dalga havuzu',
      'Lazy river',
      'Çocuk aqua land',
      'Öğle yemeği dahil',
      'Aileler için ideal'
    ],
    images: ['https://images.unsplash.com/photo-1561296784-f2d6d4d9c00d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 521,
    availability: ['Her gün (Mayıs-Ekim)'],
    seo: {
      metaTitle: 'Marmaris Aqua Dream Su Parkı | Water Park Günü',
      metaDescription: 'Aqua Dream Water Park\'ta tam gün eğlence. 24 kaydırak, öğle yemeği dahil. En uygun fiyat.',
      keywords: ['marmaris su parkı', 'aqua dream', 'water park']
    }
  },

  {
    id: 'marmaris-wine-tasting-001',
    name: 'Marmaris Şarap Tadımı ve Bağ Turu',
    slug: 'marmaris-wine-tasting-vineyard-tour',
    region: 'Marmaris',
    category: 'cultural',
    description: 'Yerel bağlar, şarap üretimi ve premium tadım. Peynir eşliğinde 6 farklı şarap.',
    longDescription: 'Marmaris bölgesi bağlarında şarap deneyimi. Bağ gezisi, üretim tesisi turu, sommelier eşliğinde 6 farklı yerel şarap tadımı. Peynir ve meze tabağı dahil. Küçük gruplarla samimi deneyim.',
    pricing: calculateBestPrice([380, 420, 400]),
    duration: '3.5 saat',
    difficulty: 'Kolay',
    minAge: 18,
    maxGroupSize: 12,
    included: ['Otel transfer', 'Bağ gezisi', '6 farklı şarap tadımı', 'Peynir ve meze', 'Sommelier rehber', 'Şarap satın alma indirimi %20'],
    excluded: ['Şarap satın alımı', 'Ekstra tadımlar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Bağ ve üretim turu',
      '6 farklı şarap tadımı',
      'Sommelier eşliğinde',
      'Peynir ve meze',
      'Küçük gruplar',
      'Satın alma indirimi %20'
    ],
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 142,
    availability: ['Çarşamba', 'Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Marmaris Şarap Tadımı | Bağ Turu ve Wine Tasting',
      metaDescription: 'Marmaris bağ gezisi ve şarap tadımı. 6 farklı şarap, peynir eşliğinde. Sommelier rehber.',
      keywords: ['marmaris şarap', 'wine tasting', 'bağ turu']
    }
  },

  {
    id: 'marmaris-sea-kayaking-001',
    name: 'Marmaris Deniz Kanosu ve Snorkeling Turu',
    slug: 'marmaris-sea-kayaking-snorkeling',
    region: 'Marmaris',
    category: 'adventure',
    description: 'Kristal sularda kano ile gizli koylar. Snorkeling, mağara keşfi, doğayla baş başa.',
    longDescription: 'Deniz kanosu ile Marmaris\'in gizli koylarını keşfedin. Kristal berraklığında sularda snorkeling, mağara keşfi, izole plajlarda mola. Tüm ekipman dahil, deneyim gerektirmez. Küçük gruplarla doğa deneyimi.',
    pricing: calculateBestPrice([420, 460, 440]),
    duration: '4 saat',
    difficulty: 'Orta',
    minAge: 12,
    maxGroupSize: 12,
    included: ['Kano kirası', 'Kürek ve can yeleği', 'Snorkeling ekipmanı', 'Profesyonel rehber', 'Meyve ve su', 'Waterproof bag', 'Sigorta'],
    excluded: ['Otel transferi', 'Öğle yemeği', 'Underwater kamera'],
    meetingPoint: 'Marmaris Kumlubük Plajı',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Gizli koylar',
      'Snorkeling deneyimi',
      'Mağara keşfi',
      'Küçük gruplar',
      'Tüm ekipman dahil',
      'Deneyim gerektirmez'
    ],
    images: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 178,
    availability: ['Mayıs-Ekim arası her gün'],
    seo: {
      metaTitle: 'Marmaris Deniz Kanosu Turu | Sea Kayaking & Snorkeling',
      metaDescription: 'Marmaris deniz kanosu ile gizli koylar. Snorkeling dahil, küçük gruplar. En uygun fiyat.',
      keywords: ['marmaris kano', 'sea kayaking', 'snorkeling']
    }
  },

  {
    id: 'marmaris-sunset-cruise-001',
    name: 'Marmaris Romantik Sunset Cruise',
    slug: 'marmaris-romantic-sunset-cruise',
    region: 'Marmaris',
    category: 'boat',
    description: 'Romantik gün batımı teknesi. Canlı müzik, şampanya, meze tabağı. Çiftler için ideal.',
    longDescription: 'Marmaris Körfezi\'nde romantik gün batımı cruiseu. Lüks tekne, canlı akustik müzik, şampanya servisi, meze tabağı. Muhteşem sunset manzarası eşliğinde unutulmaz akşam. Balayı çiftleri için özel paketler.',
    pricing: calculateBestPrice([520, 580, 550]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 40,
    included: ['Otel transfer', 'Lüks tekne', 'Canlı müzik', 'Şampanya (2 kadeh/kişi)', 'Meze tabağı', 'Soft drinks', 'Sunset manzarası'],
    excluded: ['Ekstra alkollü içecekler', 'Akşam yemeği', 'Kişisel harcamalar'],
    meetingPoint: 'Marmaris Marina',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Romantik atmosfer',
      'Canlı akustik müzik',
      'Şampanya servisi',
      'Muhteşem gün batımı',
      'Lüks tekne',
      'Balayı paketleri'
    ],
    images: ['https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 234,
    availability: ['Her gün (sunset saatine göre)'],
    seo: {
      metaTitle: 'Marmaris Romantik Sunset Cruise | Gün Batımı Teknesi',
      metaDescription: 'Romantik gün batımı cruise. Canlı müzik, şampanya, meze dahil. Çiftler için ideal.',
      keywords: ['marmaris sunset', 'romantik tekne', 'gün batımı cruise']
    }
  },

  {
    id: 'marmaris-nightlife-club-tour-001',
    name: 'Marmaris Gece Hayatı Turu - Bar Street',
    slug: 'marmaris-nightlife-bar-street-tour',
    region: 'Marmaris',
    category: 'daily',
    description: 'Bar Street\'te 4 farklı mekan. VIP giriş, welcome drink, transfer dahil. Party geceleri.',
    longDescription: 'Marmaris\'in ünlü Bar Street\'inde gece hayatı turu! 4 farklı mekana VIP giriş, her mekanda welcome drink, profesyonel party rehber, güvenli transfer. En popüler klublar ve barlar.',
    pricing: calculateBestPrice([380, 420, 400]),
    duration: '5 saat',
    difficulty: 'Kolay',
    minAge: 18,
    maxGroupSize: 30,
    included: ['Otel transfer (gidiş-dönüş)', '4 mekan VIP girişi', 'Welcome drinks', 'Party rehber', 'Güvenlik escort'],
    excluded: ['Ekstra içecekler', 'Yiyecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '4 farklı mekan',
      'VIP giriş',
      'Welcome drinks',
      'Bar Street deneyimi',
      'Güvenli transfer',
      'Party rehber'
    ],
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop'],
    rating: 4.5,
    reviewCount: 298,
    availability: ['Perşembe', 'Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Marmaris Gece Hayatı Turu | Bar Street Club Tour',
      metaDescription: 'Marmaris Bar Street gece turu. 4 mekan VIP giriş, welcome drinks dahil. En uygun fiyat.',
      keywords: ['marmaris gece hayatı', 'bar street', 'nightlife tour']
    }
  }
];

export const bodrumTours: ComprehensiveTour[] = [
  {
    id: 'bodrum-blue-cruise-001',
    name: 'Bodrum Mavi Yolculuk - Özel Gulet',
    slug: 'bodrum-blue-cruise-private-gulet',
    region: 'Bodrum',
    category: 'boat',
    description: 'Özel gulet ile Bodrum koyları. Karaada, Pabuç Burnu, Kara Ada Kaplıcaları. Lüks deneyim.',
    longDescription: 'Bodrum\'un en güzel koylarını özel gulet teknesiyle keşfedin. Karaada sıcak su kaplıcaları, Pabuç Burnu, Akvaryum Koyu. Profesyonel mürettebat, açık büfe öğle yemeği, sınırsız içecek. Lüks deneyim.',
    pricing: calculateBestPrice([950, 1000, 975]),
    duration: '8 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 60,
    included: ['Otel transfer', 'Açık büfe öğle yemeği', 'Sınırsız soft drink', 'Meyve bar', 'Müzik sistemi', 'Sigorta'],
    excluded: ['Alkollü içecekler', 'Kaplıca girişi (ekstra 20 TRY)'],
    meetingPoint: 'Bodrum Marina',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Özel gulet teknesi',
      'Karaada sıcak kaplıcalar',
      'Akvaryum Koyu yüzme',
      'Lezzetli açık büfe',
      'Canlı DJ performansı',
      'Snorkeling ekipmanı'
    ],
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 412,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Bodrum Mavi Yolculuk | Özel Gulet Tekne Turu',
      metaDescription: 'Bodrum mavi yolculukta Karaada kaplıcaları ve muhteşem koylar. Öğle yemeği dahil, en uygun fiyat garantisi.',
      keywords: ['bodrum tekne turu', 'mavi yolculuk', 'gulet turu bodrum']
    }
  },

  {
    id: 'bodrum-underwater-archaeology-001',
    name: 'Bodrum Sualtı Arkeoloji Müzesi ve Kale Turu',
    slug: 'bodrum-underwater-archaeology-museum-tour',
    region: 'Bodrum',
    category: 'cultural',
    description: 'Dünyanın en büyük sualtı arkeoloji müzesi. Bodrum Kalesi, antik eserler ve tarihi keşif.',
    longDescription: 'Bodrum Kalesi içindeki dünyaca ünlü Sualtı Arkeoloji Müzesi\'ni profesyonel rehber eşliğinde gezin. Uluburun Batığı, Bizans gemisi, cam eserler koleksiyonu. Kale surlarından muhteşem Bodrum panoraması.',
    pricing: calculateBestPrice([280, 320, 300]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 6,
    maxGroupSize: 15,
    included: ['Müze girişi', 'Profesyonel rehber', 'Kulaklık sistemi', 'Kale gezisi'],
    excluded: ['Otel transferi', 'İçecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Bodrum Kalesi ana girişi',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Sualtı Arkeoloji Müzesi',
      'Uluburun Batığı',
      'Bizans gemisi kalıntıları',
      'Cam eserler koleksiyonu',
      'Bodrum Kalesi turu',
      'Panoramik manzara'
    ],
    images: ['https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1503756234508-e32369269deb?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 189,
    availability: ['Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Bodrum Sualtı Arkeoloji Müzesi Turu | Bodrum Kalesi',
      metaDescription: 'Bodrum Sualtı Arkeoloji Müzesi ve Kale turu. Uluburun Batığı, antik eserler. Profesyonel rehberle keşif.',
      keywords: ['bodrum müzesi', 'sualtı arkeoloji', 'bodrum kalesi']
    }
  },

  {
    id: 'bodrum-greek-islands-001',
    name: 'Bodrum - Kos Adası Günübirlik Gezi',
    slug: 'bodrum-kos-island-day-trip',
    region: 'Bodrum',
    category: 'boat',
    description: 'Yunan adası Kos\'a günübirlik feribot. Antik agora, plaj, alışveriş. Pasaportsuz giriş.',
    longDescription: 'Kos adasına günübirlik feribot yolculuğu. Hippokrates Ağacı, Antik Agora, Asklepion harabeleri, Kardamena plajı, alışveriş zamanı. Rehber eşliğinde serbest zaman. Sadece kimlikle giriş.',
    pricing: calculateBestPrice([680, 750, 715]),
    duration: '10 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 200,
    included: ['Feribot bileti (gidiş-dönüş)', 'Liman vergileri', 'Rehber eşliğinde ada turu', 'Serbest zaman'],
    excluded: ['Öğle yemeği', 'Antik kent girişleri', 'Alışveriş'],
    meetingPoint: 'Bodrum Feribot Terminali',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Yunan adası Kos',
      'Antik Agora ve Asklepion',
      'Hippokrates Ağacı',
      'Plaj ve alışveriş zamanı',
      'Sadece kimlikle giriş',
      'Serbest zaman 6 saat'
    ],
    images: ['https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 534,
    availability: ['Pazartesi', 'Çarşamba', 'Cuma', 'Pazar'],
    seo: {
      metaTitle: 'Bodrum Kos Adası Turu | Yunan Adaları Günübirlik',
      metaDescription: 'Kos adasına günübirlik feribot. Antik kentler, plaj, alışveriş. Sadece kimlikle. En uygun fiyat.',
      keywords: ['bodrum kos', 'yunan adaları', 'kos adası turu']
    }
  },

  {
    id: 'bodrum-diving-adventure-001',
    name: 'Bodrum Dalış Turu - Orak Adası',
    slug: 'bodrum-diving-orak-island',
    region: 'Bodrum',
    category: 'adventure',
    description: 'Orak Adası\'nda 2 dalış. PADI sertifikalı, tüm ekipman dahil. Sualtı fotoğraflar.',
    longDescription: 'Bodrum\'un en iyi dalış noktası Orak Adası\'nda PADI sertifikalı dalış. 2 farklı dalış noktası, zengin sualtı yaşamı, batık keşfi. Tüm ekipman ve underwater fotoğraflar dahil.',
    pricing: calculateBestPrice([850, 920, 885]),
    duration: '6 saat',
    difficulty: 'Orta',
    minAge: 12,
    maxGroupSize: 10,
    included: ['Tekne transfer', 'PADI eğitmen', '2 dalış', 'Tüm ekipman', 'Underwater fotoğraflar', 'Öğle yemeği', 'Sigorta'],
    excluded: ['Sertifika ücreti (ekstra 200 TRY)', 'Video çekimi'],
    meetingPoint: 'Bodrum Marina',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Orak Adası sualtı',
      '2 dalış noktası',
      'PADI sertifikalı',
      'Zengin sualtı yaşamı',
      'Batık keşfi',
      'Fotoğraf hizmeti'
    ],
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 178,
    availability: ['Mayıs-Ekim'],
    seo: {
      metaTitle: 'Bodrum Dalış Turu | Orak Adası Scuba Diving',
      metaDescription: 'Orak Adası PADI dalış turu. 2 dalış, tüm ekipman, underwater fotoğraflar dahil.',
      keywords: ['bodrum dalış', 'orak adası diving', 'scuba bodrum']
    }
  },

  {
    id: 'bodrum-turkish-night-001',
    name: 'Bodrum Türk Gecesi - Geleneksel Show',
    slug: 'bodrum-turkish-night-show',
    region: 'Bodrum',
    category: 'cultural',
    description: 'Geleneksel Türk Gecesi. Meze ve ana yemek, sınırsız içecek, folklor gösterileri, belly dance.',
    longDescription: 'Bodrum\'da unutulmaz Türk Gecesi! Geleneksel meze ve ana yemek, sınırsız alkollü/alkolsüz içecek. Folklor gösterileri, belly dance, Kafkas dansı, DJ performansı. Otel transfer dahil.',
    pricing: calculateBestPrice([520, 580, 550]),
    duration: '5 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 200,
    included: ['Otel transfer', 'Meze ve ana yemek', 'Sınırsız içecek (alkollü/alkolsüz)', 'Canlı gösteriler', 'DJ', 'Dans pisti'],
    excluded: ['Fotoğraf hizmetleri', 'Ekstra harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Geleneksel Türk yemekleri',
      'Sınırsız içecek',
      'Folklor gösterileri',
      'Belly dance show',
      'Kafkas dansı',
      'DJ ve dans pisti'
    ],
    images: ['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 687,
    availability: ['Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Bodrum Türk Gecesi | Turkish Night Show',
      metaDescription: 'Bodrum Türk Gecesi. Yemek, sınırsız içecek, folklor gösterileri dahil. En uygun fiyat.',
      keywords: ['bodrum türk gecesi', 'turkish night', 'belly dance bodrum']
    }
  },

  {
    id: 'bodrum-buggy-safari-001',
    name: 'Bodrum Buggy Safari Macerası',
    slug: 'bodrum-buggy-safari-adventure',
    region: 'Bodrum',
    category: 'adventure',
    description: 'Off-road buggy ile dağlar, köyler ve muhteşem manzaralar. Çamur yollar, adrenalin.',
    longDescription: 'Açık buggy araçlarla Bodrum dağlarında macera! Off-road parkurlar, geleneksel köyler, muhteşem körfez manzaraları. Profesyonel rehber, tüm güvenlik ekipmanı. Çift kişilik buggy seçenekleri.',
    pricing: calculateBestPrice([480, 530, 505]),
    duration: '3 saat',
    difficulty: 'Orta',
    minAge: 18,
    maxGroupSize: 16,
    included: ['Otel transfer', 'Buggy kirası', 'Kask ve gözlük', 'Profesyonel rehber', 'Sigorta'],
    excluded: ['Fotoğraf hizmetleri', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Off-road buggy macerası',
      'Dağ ve köy rotası',
      'Muhteşem manzaralar',
      'Çamur yollar',
      'Profesyonel eğitim',
      'Çift kişilik seçenek'
    ],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1612544409025-171c8fab3a73?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 245,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Bodrum Buggy Safari | Off-Road Buggy Turu',
      metaDescription: 'Bodrum buggy safari macerası. Off-road parkurlar, köy ziyareti. En uygun fiyat.',
      keywords: ['bodrum buggy', 'buggy safari', 'off road bodrum']
    }
  },

  {
    id: 'bodrum-horse-ranch-001',
    name: 'Bodrum At Çiftliği ve Binicilik Turu',
    slug: 'bodrum-horse-ranch-riding',
    region: 'Bodrum',
    category: 'daily',
    description: 'At çiftliği ziyareti ve binicilik. Profesyonel eğitim, plaj gezintisi, çocuklar için uygun.',
    longDescription: 'Bodrum at çiftliğinde aile boyu deneyim. Profesyonel binicilik eğitimi, çiftlik turu, plaj gezintisi. Başlangıç seviyesi ve çocuklar için uygun. At bakımı ve besleme aktiviteleri.',
    pricing: calculateBestPrice([380, 420, 400]),
    duration: '2.5 saat',
    difficulty: 'Kolay',
    minAge: 6,
    maxGroupSize: 12,
    included: ['Otel transfer', 'Çiftlik turu', 'At binme', 'Profesyonel eğitmen', 'Kask', 'Sigorta', 'Fotoğraf çekimi'],
    excluded: ['İçecekler', 'Ekstra at binme süresi'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'At çiftliği turu',
      'Plaj gezintisi',
      'Çocuklar için uygun',
      'Profesyonel eğitim',
      'At bakımı aktivitesi',
      'Aile dostu'
    ],
    images: ['https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 321,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Bodrum At Çiftliği Turu | Horse Riding',
      metaDescription: 'Bodrum at çiftliği ve binicilik. Plaj gezintisi, çocuklar için uygun. En uygun fiyat.',
      keywords: ['bodrum at binme', 'horse riding bodrum', 'at çiftliği']
    }
  },

  {
    id: 'bodrum-hammam-spa-001',
    name: 'Bodrum Luxury Hammam & Spa',
    slug: 'bodrum-luxury-hammam-spa',
    region: 'Bodrum',
    category: 'daily',
    description: 'Lüks hamam deneyimi. Kese, köpük, aromaterapi masajı, sauna, jacuzzi. Premium wellness.',
    longDescription: 'Bodrum\'da lüks hamam ve spa deneyimi. Geleneksel kese ve köpük, 60 dk aromaterapi masajı, sauna, buhar odası, jacuzzi. Premium ürünler, deneyimli terapistler. Tam relax paketi.',
    pricing: calculateBestPrice([450, 500, 475]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 8,
    included: ['Otel transfer', 'Kese ve köpük', '60 dk aromaterapi masajı', 'Sauna', 'Buhar odası', 'Jacuzzi', 'Çay ikramı'],
    excluded: ['Ek spa tedavileri', 'Kişisel bakım ürünleri'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Lüks hamam',
      '60 dk aromaterapi masajı',
      'Jacuzzi keyfi',
      'Premium ürünler',
      'Deneyimli terapistler',
      'Küçük gruplar'
    ],
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 412,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Bodrum Luxury Hammam | Premium Spa ve Masaj',
      metaDescription: 'Bodrum lüks hamam ve spa. 60 dk masaj, jacuzzi, sauna dahil. En uygun fiyat.',
      keywords: ['bodrum hamam', 'luxury spa bodrum', 'turkish bath']
    }
  },

  {
    id: 'bodrum-catamaran-cruise-001',
    name: 'Bodrum Katamaran Luxury Cruise',
    slug: 'bodrum-catamaran-luxury-cruise',
    region: 'Bodrum',
    category: 'boat',
    description: 'Lüks katamaran ile özel koylar. DJ, açık bar, gourmet öğle yemeği. Premium deneyim.',
    longDescription: 'Modern katamaran ile Bodrum koylarında lüks cruise. Karaada, Kara Ada, Meteor Çukuru. DJ performansı, açık bar, gourmet öğle yemeği, snorkeling ekipmanı. Sunset cruise seçeneği.',
    pricing: calculateBestPrice([1200, 1350, 1275]),
    duration: '8 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 40,
    included: ['Otel transfer', 'Lüks katamaran', 'Açık bar (premium içecekler)', 'Gourmet öğle yemeği', 'DJ', 'Snorkeling ekipmanı', 'Su sporları'],
    excluded: ['Kaplıca girişi', 'Özel alkol talepleri'],
    meetingPoint: 'Bodrum Marina',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Lüks katamaran',
      'Açık bar (premium)',
      'Gourmet yemekler',
      'DJ performansı',
      'Su sporları',
      'Sunset seçeneği'
    ],
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewCount: 167,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Bodrum Katamaran Cruise | Luxury Boat Tour',
      metaDescription: 'Lüks katamaran cruise. Açık bar, gourmet yemek, DJ dahil. Premium deneyim.',
      keywords: ['bodrum katamaran', 'luxury cruise', 'premium boat']
    }
  },

  {
    id: 'bodrum-windsurf-kiteboard-001',
    name: 'Bodrum Rüzgar Sörfü & Kitesurf Dersi',
    slug: 'bodrum-windsurf-kitesurf-lesson',
    region: 'Bodrum',
    category: 'adventure',
    description: 'Profesyonel windsurf veya kitesurf dersi. Tüm ekipman dahil, uluslararası eğitmenler.',
    longDescription: 'Bitez Plajı\'nda windsurf veya kitesurf dersi. IKO/VDWS sertifikalı eğitmenler, tüm ekipman dahil. Başlangıç ve ileri seviye programlar. Küçük gruplar, kişiselleştirilmiş eğitim.',
    pricing: calculateBestPrice([680, 750, 715]),
    duration: '3 saat',
    difficulty: 'Orta',
    minAge: 12,
    maxGroupSize: 4,
    included: ['Profesyonel eğitmen', 'Tüm ekipman', 'Wetsuit', 'Sigorta', 'Sertifika (tamamlayanlar)'],
    excluded: ['Otel transferi', 'İçecekler', 'Fotoğraf hizmetleri'],
    meetingPoint: 'Bitez Plajı Surf Center',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal (rüzgar iptali tam iade)',
    highlights: [
      'IKO/VDWS sertifikalı',
      'Windsurf veya kitesurf',
      'Küçük gruplar (max 4)',
      'Tüm ekipman dahil',
      'Başlangıç dostu',
      'Sertifika imkanı'
    ],
    images: ['https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1537519646099-335112f03225?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 134,
    availability: ['Nisan-Ekim (rüzgar koşullarına göre)'],
    seo: {
      metaTitle: 'Bodrum Windsurf & Kitesurf | Profesyonel Ders',
      metaDescription: 'Bodrum rüzgar sörfü ve kitesurf dersi. Sertifikalı eğitmen, tüm ekipman dahil.',
      keywords: ['bodrum windsurf', 'kitesurf bodrum', 'bitez surf']
    }
  },

  {
    id: 'bodrum-sunset-fishing-001',
    name: 'Bodrum Sunset Balık Tutma Cruise',
    slug: 'bodrum-sunset-fishing-cruise',
    region: 'Bodrum',
    category: 'daily',
    description: 'Gün batımı balık tutma. Profesyonel ekipman, yakalanan balıklar pişirilir, canlı müzik.',
    longDescription: 'Bodrum koylarında sunset balık tutma cruise. Profesyonel balıkçı rehber, olta ekipmanı ve yem dahil. Yakaladığınız balıklar teknede lezzetli şekilde pişirilir. Canlı müzik eşliğinde gün batımı.',
    pricing: calculateBestPrice([480, 530, 505]),
    duration: '4 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 20,
    included: ['Otel transfer', 'Olta ekipmanı ve yem', 'Balıkçı rehber', 'Balık pişirme', 'Soft drinks', 'Canlı müzik', 'Sunset manzarası'],
    excluded: ['Alkollü içecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Bodrum Marina',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Sunset balık tutma',
      'Profesyonel ekipman',
      'Balık pişirme hizmeti',
      'Canlı müzik',
      'Gün batımı manzarası',
      'Aileler için ideal'
    ],
    images: ['https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1545450660-7a0e946d0e83?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 198,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Bodrum Sunset Fishing | Balık Tutma Cruise',
      metaDescription: 'Bodrum gün batımı balık tutma. Ekipman dahil, yakalanan balıklar pişirilir.',
      keywords: ['bodrum balık tutma', 'sunset fishing', 'fishing cruise']
    }
  },

  {
    id: 'bodrum-wine-vineyard-001',
    name: 'Bodrum Şarap Bağları ve Tadım Turu',
    slug: 'bodrum-wine-vineyard-tasting',
    region: 'Bodrum',
    category: 'cultural',
    description: 'Premium bağ turu. 8 farklı şarap tadımı, peynir eşleştirmesi, bağ içinde öğle yemeği.',
    longDescription: 'Bodrum\'un prestijli bağlarında premium şarap deneyimi. Bağ gezisi, üretim süreci, sommelier eşliğinde 8 farklı şarap tadımı. Peynir eşleştirmesi, bağ içinde 3 kurs öğle yemeği.',
    pricing: calculateBestPrice([580, 650, 615]),
    duration: '5 saat',
    difficulty: 'Kolay',
    minAge: 18,
    maxGroupSize: 10,
    included: ['Otel transfer', 'Bağ gezisi', '8 şarap tadımı', 'Peynir eşleştirmesi', '3 kurs öğle yemeği', 'Sommelier rehber', '%25 satın alma indirimi'],
    excluded: ['Şarap satın alımı', 'Ekstra tadımlar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Premium bağ turu',
      '8 şarap tadımı',
      'Sommelier eşliğinde',
      'Peynir eşleştirmesi',
      '3 kurs öğle yemeği',
      'Küçük gruplar'
    ],
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 156,
    availability: ['Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Bodrum Şarap Tadımı | Premium Bağ Turu',
      metaDescription: 'Bodrum premium bağ turu. 8 şarap tadımı, öğle yemeği dahil. Sommelier eşliğinde.',
      keywords: ['bodrum şarap', 'wine tasting bodrum', 'vineyard tour']
    }
  },

  {
    id: 'bodrum-yacht-charter-001',
    name: 'Bodrum Private Yacht Charter - Full Day',
    slug: 'bodrum-private-yacht-charter',
    region: 'Bodrum',
    category: 'boat',
    description: 'Özel yat kiralama. Kaptanlı, kişiye özel rota, gourmet catering. Luxury deneyim.',
    longDescription: 'Bodrum\'da özel yat ile lüks gün. Profesyonel kaptan ve mürettebat, kişiye özel rota planlama, gourmet catering, premium bar, su sporları ekipmanları. 8 kişiye kadar.',
    pricing: calculateBestPrice([3500, 4000, 3750]),
    duration: '8 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 8,
    included: ['Özel yat', 'Kaptan ve mürettebat', 'Yakıt', 'Gourmet catering', 'Premium bar', 'Su sporları ekipmanı', 'Snorkeling', 'Havlular'],
    excluded: ['Marina ücretleri (varsa)', 'Özel alkol talepleri', 'Özel aktiviteler'],
    meetingPoint: 'Bodrum Marina',
    cancellationPolicy: '7 gün öncesine kadar %50 iade',
    highlights: [
      'Özel yat charter',
      'Kişiye özel rota',
      'Gourmet catering',
      'Premium bar',
      'Su sporları',
      'Lüks deneyim'
    ],
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewCount: 89,
    availability: ['Her gün (rezervasyon gerekli)'],
    seo: {
      metaTitle: 'Bodrum Private Yacht Charter | Özel Yat Kiralama',
      metaDescription: 'Bodrum özel yat charter. Gourmet catering, premium bar, su sporları dahil.',
      keywords: ['bodrum yat', 'private yacht', 'yacht charter']
    }
  },

  {
    id: 'bodrum-aquapark-001',
    name: 'Bodrum Dedeman Aquapark Günü',
    slug: 'bodrum-dedeman-aquapark',
    region: 'Bodrum',
    category: 'daily',
    description: 'Bodrum\'un en büyük aquapark\'ı. 20+ kaydırak, dalga havuzu, çocuk alanı. Tam gün eğlence.',
    longDescription: 'Dedeman Aquapark\'ta aile boyu eğlence! 20+ farklı kaydırak, dev dalga havuzu, lazy river, çocuk aqua park. Öğle yemeği dahil, şezlong ve dolap ücretsiz. Gün boyu sınırsız eğlence.',
    pricing: calculateBestPrice([350, 400, 375]),
    duration: 'Tam gün (7-8 saat)',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 150,
    included: ['Otel transfer', 'Giriş bileti', 'Öğle yemeği', 'Dolap kullanımı', 'Şezlong', 'Sigorta'],
    excluded: ['İçecekler', 'Snack bar', 'Fotoğraf hizmetleri'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '20+ kaydırak',
      'Dev dalga havuzu',
      'Lazy river',
      'Çocuk aqua park',
      'Öğle yemeği dahil',
      'Aileler için ideal'
    ],
    images: ['https://images.unsplash.com/photo-1561296784-f2d6d4d9c00d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?w=800&h=600&fit=crop'],
    rating: 4.5,
    reviewCount: 673,
    availability: ['Her gün (Mayıs-Ekim)'],
    seo: {
      metaTitle: 'Bodrum Dedeman Aquapark | Su Parkı Günü',
      metaDescription: 'Bodrum Dedeman Aquapark\'ta tam gün. 20+ kaydırak, öğle yemeği dahil.',
      keywords: ['bodrum su parkı', 'dedeman aquapark', 'water park']
    }
  },

  {
    id: 'bodrum-nightlife-premium-001',
    name: 'Bodrum Premium Nightlife Tour - Halikarnas',
    slug: 'bodrum-premium-nightlife-halikarnas',
    region: 'Bodrum',
    category: 'daily',
    description: 'VIP nightlife deneyimi. Halikarnas ve 2 premium club. VIP masa, welcome drinks, DJ.',
    longDescription: 'Bodrum\'un efsanevi gece hayatı! Halikarnas Disko\'ya VIP giriş, 2 premium club ziyareti. VIP masa rezervasyonu, welcome drinks, güvenli transfer. Dünya çapında tanınan DJ performansları.',
    pricing: calculateBestPrice([650, 750, 700]),
    duration: '6 saat',
    difficulty: 'Kolay',
    minAge: 18,
    maxGroupSize: 25,
    included: ['Otel transfer (VIP araç)', '3 mekan VIP girişi', 'VIP masa', 'Welcome drinks', 'Party rehber', 'Güvenlik escort'],
    excluded: ['Ekstra içecekler', 'Yiyecekler', 'Özel alkol talepleri'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Halikarnas Disko VIP',
      '2 premium club',
      'VIP masa',
      'Welcome drinks',
      'Dünya çapında DJ\'ler',
      'Güvenli VIP transfer'
    ],
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 412,
    availability: ['Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Bodrum Premium Nightlife | Halikarnas VIP Tour',
      metaDescription: 'Bodrum VIP gece hayatı. Halikarnas Disko, VIP masa, welcome drinks dahil.',
      keywords: ['bodrum gece hayatı', 'halikarnas', 'nightlife bodrum']
    }
  }
];

export const cesmeTours: ComprehensiveTour[] = [
  {
    id: 'cesme-alacati-surf-lesson-001',
    name: 'Alaçatı Rüzgar Sörfü Dersi - Başlangıç Seviyesi',
    slug: 'alacati-windsurfing-lesson-beginner',
    region: 'Çeşme',
    category: 'adventure',
    description: 'Profesyonel eğitmenlerle rüzgar sörfü dersi. Ekipman dahil, sertifika imkanı.',
    longDescription: 'Dünyanın en iyi rüzgar sörfü merkezlerinden Alaçatı\'da profesyonel eğitmenlerle öğrenin. Tüm ekipman dahil (tahta, yelken, wetsuit). 2 saatlik yoğun eğitim. Başlangıç seviyesine özel program.',
    pricing: calculateBestPrice([550, 600, 575]),
    duration: '2 saat',
    difficulty: 'Orta',
    minAge: 12,
    maxGroupSize: 6,
    included: ['Profesyonel eğitmen', 'Tüm ekipman', 'Wetsuit', 'Sigorta', 'Sertifika (tamamlayanlar)'],
    excluded: ['Otel transferi', 'Fotoğraf hizmetleri', 'İçecekler'],
    meetingPoint: 'Alaçatı Surf Beach Club',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Profesyonel eğitmenler',
      'Tüm ekipman dahil',
      'Küçük gruplar (max 6 kişi)',
      'Başlangıç dostu',
      'Sertifika imkanı',
      'Dünya çapında tanınan lokasyon'
    ],
    images: ['https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1537519646099-335112f03225?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 267,
    availability: ['Her gün (hava durumuna göre)'],
    seo: {
      metaTitle: 'Alaçatı Rüzgar Sörfü Dersi | Başlangıç Seviyesi',
      metaDescription: 'Alaçatı\'da profesyonel rüzgar sörfü dersi. Tüm ekipman dahil, küçük gruplar. En uygun fiyat garantisi.',
      keywords: ['alaçatı sörf', 'rüzgar sörfü dersi', 'çeşme windsurf']
    }
  },

  {
    id: 'cesme-thermal-spa-tour-001',
    name: 'Çeşme Ilıca Kaplıcaları ve Spa Günü',
    slug: 'cesme-ilica-thermal-spa-day',
    region: 'Çeşme',
    category: 'daily',
    description: 'Termal kaplıcalar, spa terapileri ve rahatlatıcı masaj. Tam gün wellness.',
    longDescription: 'Ilıca\'nın ünlü termal kaplıcalarında tam gün spa deneyimi. Termal havuzlar, sauna, buhar odası, tuz odası. İsteğe bağlı masaj terapileri (ekstra ücret). Öğle yemeği dahil wellness paketi.',
    pricing: calculateBestPrice([450, 500, 475]),
    duration: '6 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 20,
    included: ['Termal havuz girişi', 'Sauna', 'Buhar odası', 'Tuz odası', 'Öğle yemeği', 'Havlu ve terlik'],
    excluded: ['Otel transferi', 'Masaj terapileri', 'Özel spa tedavileri'],
    meetingPoint: 'Ilıca Termal Spa Merkezi',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Doğal termal sular',
      'Modern spa tesisleri',
      'Sauna ve buhar odası',
      'Tuz terapi odası',
      'Sağlıklı öğle yemeği',
      'Rahatlatıcı atmosfer'
    ],
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 156,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Çeşme Ilıca Kaplıcaları Spa Turu | Termal Wellness',
      metaDescription: 'Çeşme Ilıca kaplıcalarında tam gün spa deneyimi. Termal havuzlar, sauna, öğle yemeği dahil.',
      keywords: ['çeşme kaplıca', 'ılıca termal', 'spa çeşme']
    }
  },

  {
    id: 'cesme-chios-island-001',
    name: 'Çeşme - Sakız (Chios) Adası Günübirlik',
    slug: 'cesme-chios-island-day-trip',
    region: 'Çeşme',
    category: 'boat',
    description: 'Yunan adası Sakız\'a feribot. Mastic köyleri, plaj, alışveriş. Sadece kimlikle.',
    longDescription: 'Sakız (Chios) adasına günübirlik feribot. Pyrgi mastic köyü, ortaçağ kalesi, Karfas plajı, alışveriş caddesi. Rehber eşliğinde ada turu ve serbest zaman. Pasaportsuz giriş.',
    pricing: calculateBestPrice([620, 700, 660]),
    duration: '10 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 250,
    included: ['Feribot bileti (gidiş-dönüş)', 'Liman vergileri', 'Ada turu rehberi', 'Serbest zaman'],
    excluded: ['Öğle yemeği', 'Müze girişleri', 'Alışveriş'],
    meetingPoint: 'Çeşme Feribot Terminali',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Sakız adası',
      'Mastic köyleri',
      'Ortaçağ kalesi',
      'Karfas plajı',
      'Sadece kimlikle',
      'Serbest zaman'
    ],
    images: ['https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 467,
    availability: ['Pazartesi', 'Çarşamba', 'Cuma', 'Pazar'],
    seo: {
      metaTitle: 'Çeşme Sakız Adası Turu | Chios Day Trip',
      metaDescription: 'Sakız (Chios) adasına günübirlik feribot. Mastic köyleri, plaj, alışveriş. En uygun fiyat.',
      keywords: ['çeşme sakız adası', 'chios island', 'yunan adaları']
    }
  },

  {
    id: 'cesme-kitesurfing-advanced-001',
    name: 'Çeşme Kitesurf İleri Seviye Eğitimi',
    slug: 'cesme-advanced-kitesurfing',
    region: 'Çeşme',
    category: 'adventure',
    description: 'İleri seviye kitesurf. Jump, transition, freestyle teknikleri. IKO sertifikalı.',
    longDescription: 'Alaçatı\'da ileri seviye kitesurf eğitimi. Board-off, jump, transition ve freestyle teknikleri. IKO sertifikalı eğitmenler, profesyonel ekipman. Kişiye özel 1-1 eğitim seçeneği.',
    pricing: calculateBestPrice([820, 900, 860]),
    duration: '4 saat',
    difficulty: 'Zor',
    minAge: 14,
    maxGroupSize: 3,
    included: ['Profesyonel eğitmen', 'Tüm ekipman', 'Wetsuit', 'Kask', 'Sigorta', 'Video analiz'],
    excluded: ['Otel transferi', 'İçecekler', 'Sertifika ücreti'],
    meetingPoint: 'Alaçatı Surf Beach',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal (rüzgar iptali tam iade)',
    highlights: [
      'İleri seviye teknikler',
      'IKO sertifikalı',
      'Video analiz',
      'Küçük gruplar (max 3)',
      'Jump ve freestyle',
      '1-1 eğitim seçeneği'
    ],
    images: ['https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewCount: 112,
    availability: ['Mayıs-Ekim (rüzgar koşullarına göre)'],
    seo: {
      metaTitle: 'Çeşme İleri Seviye Kitesurf | Advanced Kiteboarding',
      metaDescription: 'Alaçatı ileri seviye kitesurf. Jump, freestyle, video analiz. IKO sertifikalı.',
      keywords: ['çeşme kitesurf', 'advanced kiteboarding', 'alaçatı kitesurf']
    }
  },

  {
    id: 'cesme-yacht-cruise-001',
    name: 'Çeşme Premium Yacht Cruise - Koylar Turu',
    slug: 'cesme-premium-yacht-cruise',
    region: 'Çeşme',
    category: 'boat',
    description: 'Lüks yat ile Çeşme koyları. Pırlanta Plajı, Aya Yorgi Koyu. Açık bar ve yemek.',
    longDescription: 'Premium yat ile Çeşme\'nin gizli koyları. Pırlanta Plajı, Aya Yorgi Koyu, Paşalimanı. Açık bar (premium içecekler), BBQ öğle yemeği, DJ performansı, su sporları. Snorkeling ekipmanı.',
    pricing: calculateBestPrice([890, 980, 935]),
    duration: '7 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 50,
    included: ['Otel transfer', 'Lüks yat', 'Açık bar (premium)', 'BBQ öğle yemeği', 'DJ', 'Snorkeling ekipmanı', 'Su sporları'],
    excluded: ['Özel alkol talepleri', 'Ekstra aktiviteler'],
    meetingPoint: 'Çeşme Marina',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Lüks yat cruise',
      'Pırlanta Plajı',
      'Açık bar (premium)',
      'BBQ öğle yemeği',
      'DJ performansı',
      'Su sporları'
    ],
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 234,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Çeşme Premium Yacht Cruise | Lüks Yat Turu',
      metaDescription: 'Çeşme lüks yat cruise. Açık bar, BBQ, DJ dahil. Gizli koylar turu.',
      keywords: ['çeşme yat', 'yacht cruise', 'premium boat']
    }
  },

  {
    id: 'cesme-scuba-diving-001',
    name: 'Çeşme Dalış Turu - PADI Sertifikalı',
    slug: 'cesme-padi-scuba-diving',
    region: 'Çeşme',
    category: 'adventure',
    description: 'Kristal sularda 2 dalış. Batık keşfi, zengin sualtı yaşamı. Tüm ekipman dahil.',
    longDescription: 'Çeşme\'nin berrak sularında PADI sertifikalı dalış. Antik amphora batığı, zengin flora-fauna, underwater caves. 2 farklı dalış noktası, profesyonel fotoğrafçı eşliğinde.',
    pricing: calculateBestPrice([750, 850, 800]),
    duration: '5 saat',
    difficulty: 'Orta',
    minAge: 12,
    maxGroupSize: 8,
    included: ['Tekne transfer', 'PADI eğitmen', '2 dalış', 'Tüm ekipman', 'Underwater fotoğraflar', 'Hafif öğle yemeği', 'Sigorta'],
    excluded: ['Sertifika ücreti (200 TRY)', 'Video çekimi (150 TRY)'],
    meetingPoint: 'Çeşme Marina',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'PADI sertifikalı',
      'Antik batık keşfi',
      'Underwater caves',
      '2 dalış noktası',
      'Profesyonel fotoğrafçı',
      'Küçük gruplar'
    ],
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 189,
    availability: ['Mayıs-Ekim'],
    seo: {
      metaTitle: 'Çeşme Dalış Turu | PADI Scuba Diving',
      metaDescription: 'Çeşme PADI dalış turu. 2 dalış, batık keşfi, fotoğraflar dahil. En uygun fiyat.',
      keywords: ['çeşme dalış', 'scuba diving cesme', 'padi diving']
    }
  },

  {
    id: 'cesme-horse-riding-beach-001',
    name: 'Çeşme Atlı Sahil Gezintisi - Sunset',
    slug: 'cesme-horse-riding-beach-sunset',
    region: 'Çeşme',
    category: 'daily',
    description: 'Sahilde at binme. Gün batımı turu, fotoğraf çekimi. Başlangıç seviyesi uygun.',
    longDescription: 'Altınkum sahilinde at binme ve sunset deneyimi. Sakin ve eğitimli atlarla 1.5 saatlik gezinti. Profesyonel eğitmen, gün batımı manzarası, fotoğraf çekimi. Deneyim gerektirmez.',
    pricing: calculateBestPrice([420, 480, 450]),
    duration: '1.5 saat',
    difficulty: 'Kolay',
    minAge: 7,
    maxGroupSize: 8,
    included: ['At kirası', 'Profesyonel eğitmen', 'Kask', 'Sigorta', 'Fotoğraf çekimi', 'Sunset manzarası'],
    excluded: ['Otel transferi', 'İçecekler'],
    meetingPoint: 'Altınkum At Çiftliği',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Sahilde at binme',
      'Gün batımı deneyimi',
      'Sakin atlar',
      'Deneyim gerektirmez',
      'Fotoğraf hizmeti',
      'Romantik atmosfer'
    ],
    images: ['https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 267,
    availability: ['Her gün (sunset saatine göre)'],
    seo: {
      metaTitle: 'Çeşme Atlı Sahil Gezintisi | Sunset Horse Riding',
      metaDescription: 'Çeşme sahilde at binme. Gün batımı turu, fotoğraf dahil. Başlangıç dostu.',
      keywords: ['çeşme at binme', 'horse riding beach', 'sunset riding']
    }
  },

  {
    id: 'cesme-wine-tasting-premium-001',
    name: 'Çeşme Premium Şarap Tadımı ve Bağ Turu',
    slug: 'cesme-premium-wine-tasting',
    region: 'Çeşme',
    category: 'cultural',
    description: '10 farklı şarap tadımı. Bağ gezisi, gourmet eşleştirme, şaraphane turu.',
    longDescription: 'Çeşme\'nin prestijli bağlarında premium deneyim. 10 farklı şarap tadımı, sommelier eşliğinde gourmet peynir ve charcuterie eşleştirmesi. Bağ gezisi, üretim süreci, 4 kurs öğle yemeği.',
    pricing: calculateBestPrice([680, 780, 730]),
    duration: '5.5 saat',
    difficulty: 'Kolay',
    minAge: 18,
    maxGroupSize: 8,
    included: ['Otel transfer', 'Bağ ve şaraphane turu', '10 şarap tadımı', 'Gourmet eşleştirme', '4 kurs öğle yemeği', 'Sommelier rehber', '%30 satın alma indirimi'],
    excluded: ['Şarap satın alımı', 'Ekstra tadımlar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '10 şarap tadımı',
      'Gourmet eşleştirme',
      'Sommelier eşliğinde',
      '4 kurs öğle yemeği',
      'Küçük gruplar (max 8)',
      '%30 indirim'
    ],
    images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewCount: 134,
    availability: ['Çarşamba', 'Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Çeşme Premium Şarap Tadımı | Wine Tasting Tour',
      metaDescription: 'Çeşme premium bağ turu. 10 şarap tadımı, gourmet yemek, sommelier eşliğinde.',
      keywords: ['çeşme şarap', 'wine tasting cesme', 'vineyard tour']
    }
  },

  {
    id: 'cesme-paragliding-001',
    name: 'Çeşme Yamaç Paraşütü - Tandem Uçuş',
    slug: 'cesme-tandem-paragliding',
    region: 'Çeşme',
    category: 'adventure',
    description: 'Alaçatı tepelerinden muhteşem uçuş. 20-30 dakika hava süresi, HD video.',
    longDescription: 'Alaçatı tepelerinden (400m) tandem yamaç paraşütü. Deneyimli pilotlar, muhteşem Ege manzarası, 20-30 dakika uçuş süresi. HD video ve fotoğraf çekimi dahil. Deneyim gerektirmez.',
    pricing: calculateBestPrice([680, 780, 730]),
    duration: '2.5 saat',
    difficulty: 'Kolay',
    minAge: 7,
    maxGroupSize: 12,
    included: ['Otel transfer', 'Tüm ekipman', 'Deneyimli pilot', 'HD video ve fotoğraf', 'Uçuş sertifikası', 'Sigorta'],
    excluded: ['İçecekler', 'Özel fotoğraf hizmetleri'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal (hava durumu iptali tam iade)',
    highlights: [
      '400m yükseklikten uçuş',
      'Muhteşem Ege manzarası',
      'HD video dahil',
      'Deneyimli pilotlar',
      'Deneyim gerektirmez',
      'Uçuş sertifikası'
    ],
    images: ['https://images.unsplash.com/photo-1512608455489-4e7e2ee8f4b6?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 178,
    availability: ['Nisan-Ekim (hava durumuna göre)'],
    seo: {
      metaTitle: 'Çeşme Yamaç Paraşütü | Tandem Paragliding',
      metaDescription: 'Çeşme yamaç paraşütü deneyimi. HD video dahil, deneyim gerektirmez. En uygun fiyat.',
      keywords: ['çeşme yamaç paraşütü', 'paragliding', 'tandem uçuş']
    }
  },

  {
    id: 'cesme-aquapark-001',
    name: 'Çeşme Aqua Toy City Su Parkı',
    slug: 'cesme-aqua-toy-city',
    region: 'Çeşme',
    category: 'daily',
    description: 'Tam gün su parkı eğlencesi. 15+ kaydırak, dalga havuzu, çocuk alanı.',
    longDescription: 'Aqua Toy City\'de aile boyu eğlence! 15+ farklı kaydırak, dev dalga havuzu, lazy river, çocuk aqua land. Öğle yemeği dahil, şezlong ve dolap ücretsiz.',
    pricing: calculateBestPrice([320, 380, 350]),
    duration: 'Tam gün (6-7 saat)',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 120,
    included: ['Otel transfer', 'Giriş bileti', 'Öğle yemeği', 'Dolap kullanımı', 'Şezlong', 'Sigorta'],
    excluded: ['İçecekler', 'Snack bar', 'Oyun salonu'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '15+ kaydırak',
      'Dev dalga havuzu',
      'Lazy river',
      'Çocuk aqua land',
      'Öğle yemeği dahil',
      'Aileler için ideal'
    ],
    images: ['https://images.unsplash.com/photo-1561296784-f2d6d4d9c00d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 512,
    availability: ['Her gün (Mayıs-Ekim)'],
    seo: {
      metaTitle: 'Çeşme Aqua Toy City | Su Parkı Günü',
      metaDescription: 'Aqua Toy City\'de tam gün eğlence. 15+ kaydırak, öğle yemeği dahil. En uygun fiyat.',
      keywords: ['çeşme su parkı', 'aqua toy city', 'water park']
    }
  },

  {
    id: 'cesme-hammam-massage-001',
    name: 'Çeşme Premium Hamam ve Aromaterapi',
    slug: 'cesme-premium-hammam-aromatherapy',
    region: 'Çeşme',
    category: 'daily',
    description: 'Lüks hamam deneyimi. Kese, köpük, 60 dk aromaterapi, sauna, jacuzzi.',
    longDescription: 'Çeşme lüks hamam ve spa. Geleneksel kese ve köpük masajı, 60 dakika aromaterapi full body massage, sauna, buhar odası, jacuzzi. Premium ürünler ve deneyimli terapistler.',
    pricing: calculateBestPrice([480, 550, 515]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 6,
    included: ['Otel transfer', 'Kese ve köpük', '60 dk aromaterapi', 'Sauna', 'Buhar odası', 'Jacuzzi', 'Organik çay ikramı'],
    excluded: ['Ek spa tedavileri', 'Kozmetik ürünler'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Lüks hamam',
      '60 dk aromaterapi',
      'Jacuzzi keyfi',
      'Premium ürünler',
      'Deneyimli terapistler',
      'Küçük gruplar'
    ],
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 345,
    availability: ['Her gün'],
    seo: {
      metaTitle: 'Çeşme Premium Hamam | Luxury Spa ve Masaj',
      metaDescription: 'Çeşme lüks hamam ve spa. 60 dk aromaterapi, jacuzzi dahil. En uygun fiyat.',
      keywords: ['çeşme hamam', 'luxury spa', 'aromaterapi masaj']
    }
  },

  {
    id: 'cesme-sup-paddle-001',
    name: 'Çeşme Stand-Up Paddle (SUP) Turu',
    slug: 'cesme-stand-up-paddle-tour',
    region: 'Çeşme',
    category: 'adventure',
    description: 'SUP ile koylar turu. Profesyonel eğitim, gizli koylar, snorkeling. Başlangıç dostu.',
    longDescription: 'Stand-up paddle board ile Çeşme koylarını keşfet. Profesyonel eğitim, sakin sularda gezinti, gizli koylar, snorkeling molaları. Tüm ekipman dahil, deneyim gerektirmez.',
    pricing: calculateBestPrice([380, 440, 410]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 10,
    maxGroupSize: 10,
    included: ['SUP board', 'Kürek ve can yeleği', 'Profesyonel eğitim', 'Snorkeling ekipmanı', 'Waterproof bag', 'Sigorta'],
    excluded: ['Otel transferi', 'İçecekler', 'Underwater kamera'],
    meetingPoint: 'Alaçatı Surf Beach',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'SUP eğitimi',
      'Gizli koylar',
      'Snorkeling',
      'Küçük gruplar',
      'Tüm ekipman dahil',
      'Başlangıç dostu'
    ],
    images: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 198,
    availability: ['Mayıs-Ekim'],
    seo: {
      metaTitle: 'Çeşme Stand-Up Paddle | SUP Board Turu',
      metaDescription: 'Çeşme SUP turu. Profesyonel eğitim, gizli koylar, snorkeling dahil. En uygun fiyat.',
      keywords: ['çeşme sup', 'stand up paddle', 'sup board']
    }
  },

  {
    id: 'cesme-fishing-charter-001',
    name: 'Çeşme Özel Balık Tutma Charter',
    slug: 'cesme-private-fishing-charter',
    region: 'Çeşme',
    category: 'daily',
    description: 'Özel tekne ile balık tutma. Profesyonel kaptan, ekipman, yakalanan balıklar pişirilir.',
    longDescription: 'Özel tekne charter ile Çeşme açıklarında balık tutma. Deneyimli balıkçı kaptanı, profesyonel olta ekipmanı, yemler. Yakaladığınız balıklar teknede lezzetli şekilde pişirilir. 4-6 kişilik özel grup.',
    pricing: calculateBestPrice([1200, 1400, 1300]),
    duration: '6 saat',
    difficulty: 'Kolay',
    minAge: 5,
    maxGroupSize: 6,
    included: ['Özel tekne charter', 'Kaptan ve mürettebat', 'Tüm olta ekipmanı', 'Yemler', 'Balık pişirme', 'Soft drinks', 'Meyve ikramı'],
    excluded: ['Alkollü içecekler', 'Otel transferi'],
    meetingPoint: 'Çeşme Marina',
    cancellationPolicy: '48 saat öncesine kadar %50 iade',
    highlights: [
      'Özel tekne charter',
      'Deneyimli kaptan',
      'Profesyonel ekipman',
      'Balık pişirme hizmeti',
      '4-6 kişi',
      'Özel deneyim'
    ],
    images: ['https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1545450660-7a0e946d0e83?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewCount: 123,
    availability: ['Her gün (rezervasyon gerekli)'],
    seo: {
      metaTitle: 'Çeşme Özel Balık Tutma | Private Fishing Charter',
      metaDescription: 'Çeşme özel tekne ile balık tutma. Ekipman dahil, balıklar pişirilir. 4-6 kişi.',
      keywords: ['çeşme balık tutma', 'private fishing', 'fishing charter']
    }
  },

  {
    id: 'cesme-sunset-cruise-romantic-001',
    name: 'Çeşme Romantik Sunset Cruise',
    slug: 'cesme-romantic-sunset-cruise',
    region: 'Çeşme',
    category: 'boat',
    description: 'Romantik gün batımı tekne turu. Şampanya, meze, canlı müzik. Çiftler için ideal.',
    longDescription: 'Çeşme koylarında romantik sunset cruise. Lüks tekne, canlı akustik müzik, şampanya servisi, Ege mezesi tabağı. Muhteşem gün batımı manzarası. Balayı çiftleri için özel paketler.',
    pricing: calculateBestPrice([580, 650, 615]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 16,
    maxGroupSize: 35,
    included: ['Otel transfer', 'Lüks tekne', 'Canlı akustik müzik', 'Şampanya (2 kadeh/kişi)', 'Ege mezesi', 'Soft drinks', 'Sunset manzarası'],
    excluded: ['Ekstra alkollü içecekler', 'Akşam yemeği'],
    meetingPoint: 'Çeşme Marina',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Romantik atmosfer',
      'Canlı akustik müzik',
      'Şampanya servisi',
      'Ege mezesi',
      'Muhteşem gün batımı',
      'Balayı paketleri'
    ],
    images: ['https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewCount: 289,
    availability: ['Her gün (sunset saatine göre)'],
    seo: {
      metaTitle: 'Çeşme Romantik Sunset Cruise | Gün Batımı Teknesi',
      metaDescription: 'Romantik gün batımı cruise. Şampanya, canlı müzik, meze dahil. Çiftler için ideal.',
      keywords: ['çeşme sunset', 'romantik tekne', 'gün batımı cruise']
    }
  },

  {
    id: 'cesme-historic-tour-001',
    name: 'Çeşme Tarihi ve Kültürel Tur',
    slug: 'cesme-historic-cultural-tour',
    region: 'Çeşme',
    category: 'cultural',
    description: 'Çeşme Kalesi, Alaçatı taş evleri, müze turu. Rehber eşliğinde kültür gezisi.',
    longDescription: 'Çeşme\'nin tarihi ve kültürel mirası. Çeşme Kalesi ve müzesi, Alaçatı otantik taş evleri ve rüzgar değirmenleri, Germiyan Çeşmesi, yerel pazar ziyareti. Profesyonel rehber eşliğinde.',
    pricing: calculateBestPrice([320, 380, 350]),
    duration: '4 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 20,
    included: ['Otel transfer', 'Profesyonel rehber', 'Müze girişleri', 'Kale turu', 'Kulaklık sistemi'],
    excluded: ['Öğle yemeği', 'Alışveriş', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Çeşme Kalesi ve müze',
      'Alaçatı taş evleri',
      'Rüzgar değirmenleri',
      'Yerel pazar',
      'Profesyonel rehber',
      'Kültürel deneyim'
    ],
    images: ['https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1503756234508-e32369269deb?w=800&h=600&fit=crop'],
    rating: 4.6,
    reviewCount: 234,
    availability: ['Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Çeşme Tarihi Tur | Kültürel Rehberli Gezi',
      metaDescription: 'Çeşme Kalesi, Alaçatı taş evleri, müze turu. Profesyonel rehberle kültürel keşif.',
      keywords: ['çeşme kalesi', 'alaçatı turu', 'tarihi tur']
    }
  },

  {
    id: 'cesme-nightlife-alacati-001',
    name: 'Çeşme & Alaçatı Gece Hayatı Turu',
    slug: 'cesme-alacati-nightlife-tour',
    region: 'Çeşme',
    category: 'daily',
    description: 'Alaçatı ve Çeşme gece hayatı. 3 mekan, VIP giriş, welcome drinks, güvenli transfer.',
    longDescription: 'Alaçatı ve Çeşme\'nin en popüler mekanlarında gece hayatı turu! 3 farklı mekana VIP giriş, welcome drinks, profesyonel party rehber, güvenli transfer. Beach club, rooftop bar ve club.',
    pricing: calculateBestPrice([480, 550, 515]),
    duration: '5 saat',
    difficulty: 'Kolay',
    minAge: 18,
    maxGroupSize: 25,
    included: ['Otel transfer (gidiş-dönüş)', '3 mekan VIP girişi', 'Welcome drinks', 'Party rehber', 'Güvenlik escort'],
    excluded: ['Ekstra içecekler', 'Yiyecekler', 'Kişisel harcamalar'],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '3 farklı mekan',
      'VIP giriş',
      'Welcome drinks',
      'Beach club + Rooftop + Club',
      'Güvenli transfer',
      'Party rehber'
    ],
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewCount: 312,
    availability: ['Perşembe', 'Cuma', 'Cumartesi'],
    seo: {
      metaTitle: 'Çeşme & Alaçatı Gece Hayatı | Nightlife Tour',
      metaDescription: 'Çeşme ve Alaçatı gece turu. 3 mekan VIP giriş, welcome drinks dahil.',
      keywords: ['çeşme gece hayatı', 'alaçatı nightlife', 'club tour']
    }
  }
];

// Import Antalya tours
import antalyaTours from './antalya-tours';

export const allComprehensiveTours = [
  ...marmarisTours,
  ...bodrumTours,
  ...cesmeTours,
  ...antalyaTours
];

export const getToursByRegion = (region: string) => {
  return allComprehensiveTours.filter(tour =>
    tour.region.toLowerCase() === region.toLowerCase()
  );
};

export const getLowestPriceTours = () => {
  return allComprehensiveTours
    .sort((a, b) => a.pricing.travelLyDian - b.pricing.travelLyDian)
    .slice(0, 10);
};

export const getBestValueTours = () => {
  return allComprehensiveTours
    .sort((a, b) => b.pricing.savingsPercentage - a.pricing.savingsPercentage)
    .slice(0, 10);
};
