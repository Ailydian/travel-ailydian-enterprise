/**
 * Comprehensive Tours Data for Antalya Region
 * With Competitor Price Analysis - Always Best Price Guarantee
 *
 * Coverage: Antalya Center, Kemer, Belek, Side, Alanya, Kaş, Manavgat
 * Categories: Boat Tours, Adventure, Cultural, Nature, Water Sports, Special Experiences
 */

import { ComprehensiveTour } from './marmaris-bodrum-cesme-tours';

// Helper function to calculate pricing with guaranteed savings
const calculateBestPrice = (competitorPrices: number[]) => {
  const avgCompetitorPrice = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
  const ourPrice = Math.floor(avgCompetitorPrice * 0.88); // 12% cheaper on average
  const savings = avgCompetitorPrice - ourPrice;
  const savingsPercentage = Math.round((savings / avgCompetitorPrice) * 100);

  return {
    travelAilydian: ourPrice,
    competitors: {
      getYourGuide: competitorPrices[0],
      viator: competitorPrices[1],
      tripAdvisor: competitorPrices[2],
    },
    savings: Math.round(savings),
    savingsPercentage,
  };
};

export const antalyaTours: ComprehensiveTour[] = [
  // BOAT TOURS
  {
    id: 'antalya-boat-tour-001',
    name: 'Antalya Tekne Turu - 3 Adalar',
    slug: 'antalya-3-islands-boat-tour',
    region: 'Antalya',
    category: 'boat',
    description: 'Akdeniz\'in turkuaz sularında eşsiz bir gün. Kemer, Phaselis ve üç muhteşem ada ile snorkeling deneyimi.',
    longDescription: 'Antalya\'nın eşsiz kıyı şeridinde unutulmaz bir tekne turu deneyimi sizi bekliyor. Sabah otel transferi ile başlayan turumuzda, önce tarihi Phaselis antik kentinin kıyılarına demir atacağız. Burada hem yüzme hem de antik kalıntıları keşfetme fırsatı bulacaksınız.\n\nÖğleden sonra ise üç muhteşem adayı ziyaret edeceğiz: Kekova bölgesindeki batık şehir, berrak suları ve zengin deniz yaşamı ile ünlü snorkeling noktaları. Teknemizde profesyonel rehberimiz size bölgenin tarihi ve doğal güzellikleri hakkında bilgi verecek.\n\nÖğle yemeği olarak açık büfe servis edilecek, sınırsız alkolsüz içecekler dahildir. Yüzme molaları sırasında snorkeling ekipmanı ücretsiz olarak sağlanır. Günbatımı manzarası eşliğinde limana dönerken, Akdeniz\'in büyüleyici atmosferini son kez yaşayacaksınız.',
    pricing: calculateBestPrice([950, 1000, 980]),
    duration: '7 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 85,
    included: [
      'Otel transfer (Antalya merkez, Kemer, Belek)',
      'Açık büfe öğle yemeği',
      'Sınırsız soft drink',
      'Snorkeling ekipmanı',
      'Profesyonel İngilizce/Türkçe rehber',
      'Sigorta',
      'Tekne kullanım ücreti'
    ],
    excluded: [
      'Alkollü içecekler',
      'Kişisel harcamalar',
      'Fotoğraf/video hizmetleri',
      'Ek su sporları aktiviteleri'
    ],
    meetingPoint: 'Antalya Marina - Otel transferi dahil',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Akdeniz\'in en temiz koylarında yüzme',
      'Phaselis antik kenti kıyıları',
      'Üç farklı adada mola',
      'Snorkeling ile su altı keşfi',
      'Açık büfe öğle yemeği',
      'Günbatımı manzarası',
      'Profesyonel rehber eşliğinde',
      'Küçük gruplar ile kişisel deneyim'
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 487,
    availability: ['Pazartesi', 'Çarşamba', 'Cuma', 'Cumartesi', 'Pazar'],
    seo: {
      metaTitle: 'Antalya Tekne Turu 3 Adalar | En Uygun Fiyat Garantisi',
      metaDescription: 'Antalya 3 adalar tekne turunda Akdeniz\'in turkuaz sularını keşfedin. Snorkeling, öğle yemeği dahil. Hemen rezervasyon yapın!',
      keywords: ['antalya tekne turu', '3 adalar turu', 'antalya boat tour', 'phaselis', 'akdeniz turu', 'snorkeling antalya']
    }
  },
  {
    id: 'antalya-boat-tour-002',
    name: 'Kemer Korsan Teknesi Turu',
    slug: 'kemer-pirate-boat-tour',
    region: 'Antalya',
    category: 'boat',
    description: 'Aileler için eğlenceli korsan temalı tekne turu. Animasyon, köpük partisi ve muhteşem koylar.',
    longDescription: 'Çocuklarınız korsan olma hayali kuruyor mu? Kemer Korsan Teknesi Turu tam size göre! Gerçek bir korsan gemisini andıran özel teknemizle, Akdeniz\'in en güzel koylarını keşfederken, çocuklarınız korsan animasyonları ile eğlenecek.\n\nTur boyunca profesyonel animasyon ekibimiz, korsan temalı oyunlar, yüz boyama, hazine avı ve köpük partisi düzenleyecek. Yetişkinler ise güneşlenme alanlarında dinlenebilir veya berrak sularda yüzme keyfi yaşayabilir.\n\nBeş farklı koyda mola vereceğimiz turumuzda, Paradise Bay, Moonlight Bay ve Phaselis antik kenti kıyılarında yüzme fırsatı bulacaksınız. Öğle yemeği olarak çocuklara özel menü dahil açık büfe servis edilir.',
    pricing: calculateBestPrice([850, 890, 870]),
    duration: '6 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 100,
    included: [
      'Otel transfer (Kemer, Beldibi, Göynük)',
      'Açık büfe öğle yemeği',
      'Çocuk menüsü',
      'Sınırsız soft drink',
      'Animasyon programı',
      'Köpük partisi',
      'Yüz boyama',
      'Sigorta'
    ],
    excluded: [
      'Alkollü içecekler',
      'Fotoğraf hizmetleri',
      'Su sporları (jet ski, parasailing vb.)'
    ],
    meetingPoint: 'Kemer Marina',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Korsan temalı eğlenceli tekne',
      'Çocuklar için özel animasyon',
      'Köpük partisi ve yüz boyama',
      'Beş muhteşem koyda yüzme',
      'Paradise Bay ziyareti',
      'Phaselis antik kenti görünümü',
      'Aile dostu atmosfer',
      'Çocuk menüsü dahil'
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 623,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'Kemer Korsan Tekne Turu | Çocuklar İçin En Eğlenceli Tur',
      metaDescription: 'Kemer korsan teknesi turunda çocuklarınızla unutulmaz bir gün geçirin. Animasyon, köpük partisi ve yüzme dahil!',
      keywords: ['kemer korsan teknesi', 'pirate boat kemer', 'çocuklu tatil antalya', 'aile turu kemer', 'animasyonlu tekne turu']
    }
  },

  // ADVENTURE TOURS
  {
    id: 'antalya-adventure-001',
    name: 'Köprülü Kanyon Rafting Turu',
    slug: 'kopru-canyon-rafting-tour',
    region: 'Antalya',
    category: 'adventure',
    description: 'Türkiye\'nin en iyi rafting parkurunda adrenalin dolu bir gün. 14 km\'lik heyecan verici rota.',
    longDescription: 'Köprülü Kanyon Milli Parkı\'nda, Köprüçay Nehri\'nin berrak sularında unutulmaz bir rafting deneyimi sizi bekliyor. Türkiye\'nin en popüler rafting noktası olan bu bölgede, 14 kilometrelik parkurda 12 farklı rapids (hızlı akıntı) ile mücadele edeceksiniz.\n\nSabah otel transferi ile başlayan turumuzda, önce profesyonel rehberlerimiz sizlere güvenlik eğitimi ve teknik bilgi verecek. Tam donanımlı ekipmanlarınızı giydikten sonra, 6-8 kişilik botlara binip maceraya başlayacaksınız.\n\nParkur boyunca muhteşem kanyon manzaraları, antik Roma köprüsü ve doğal güzellikler eşliğinde ilerleyeceksiniz. Yol boyunca yüzme molaları ve fotoğraf durakları olacak. Tur sonunda açık büfe öğle yemeği ile enerjinizi tazeleyeceksiniz. Tüm rafting anlarınız profesyonel fotoğrafçılar tarafından kayıt altına alınır (ekstra ücret karşılığı satın alabilirsiniz).',
    pricing: calculateBestPrice([450, 480, 465]),
    duration: '8 saat',
    difficulty: 'Orta',
    minAge: 8,
    maxGroupSize: 48,
    included: [
      'Otel transfer (Antalya, Side, Belek)',
      'Profesyonel rafting ekipmanı (kask, can yeleği, kürek)',
      'Deneyimli rafting kaptanı',
      'Güvenlik eğitimi',
      'Açık büfe öğle yemeği',
      'Sigorta',
      'Değişim kabinleri ve duşlar'
    ],
    excluded: [
      'Profesyonel fotoğraf servisi (opsiyonel)',
      'Ayakkabı kiralama (kendi su ayakkabılarınızı getirin)',
      'Kişisel harcamalar'
    ],
    meetingPoint: 'Köprülü Kanyon Rafting Merkezi',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Türkiye\'nin en iyi rafting parkuru',
      '14 km heyecan dolu rota',
      '12 farklı rapids',
      'Muhteşem kanyon manzarası',
      'Antik Roma köprüsü',
      'Profesyonel ekipman ve rehber',
      'Yüzme molaları',
      'Açık büfe öğle yemeği'
    ],
    images: [
      'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 892,
    availability: ['Her Gün (Mayıs-Ekim)'],
    seo: {
      metaTitle: 'Köprülü Kanyon Rafting | Antalya\'da En İyi Rafting Turu',
      metaDescription: 'Köprülü Kanyon\'da profesyonel rehber eşliğinde rafting. 14 km parkur, güvenli ekipman, öğle yemeği dahil!',
      keywords: ['köprülü kanyon rafting', 'antalya rafting', 'rafting turkey', 'adventure antalya', 'köprüçay rafting']
    }
  },
  {
    id: 'antalya-adventure-002',
    name: 'Antalya Jeep Safari Turu',
    slug: 'antalya-jeep-safari-adventure',
    region: 'Antalya',
    category: 'adventure',
    description: 'Toros Dağları\'nda off-road macera. Köyler, şelaleler ve muhteşem manzaralar.',
    longDescription: 'Antalya\'nın gizli cennetlerini keşfetmeye hazır mısınız? Jeep Safari Turumuzda, konvoyumuzla Toros Dağları\'nın zorlu parkurlarında macera dolu bir gün geçireceksiniz. Her jeepte 6-8 kişi olmak üzere, deneyimli sürücülerimiz eşliğinde yola çıkacaksınız.\n\nİlk durağımız, geleneksel bir Türk köyü olacak. Burada yerel halkla tanışacak, ev yapımı gözleme tadabilecek ve çay içeceksiniz. Ardından Düzlerçamı yaylasına tırmanarak, 1550 metre yükseklikte muhteşem Antalya panoraması göreceksiniz.\n\nÖğleden sonra ise Uçansu Şelalesi\'ni ziyaret edip, doğal havuzda yüzme molası vereceğiz. Off-road parkurlarımız hem heyecan verici hem de güvenli. Tur boyunca fotoğraf durakları yapılacak, en güzel anlar ölümsüzleştirilecek.',
    pricing: calculateBestPrice([550, 590, 570]),
    duration: '7 saat',
    difficulty: 'Orta',
    minAge: 5,
    maxGroupSize: 40,
    included: [
      'Otel transfer',
      '4x4 Jeep ve profesyonel sürücü',
      'Rehber (İngilizce/Türkçe)',
      'Öğle yemeği (köy lokantasında)',
      'Çay molası yerel köyde',
      'Giriş ücretleri',
      'Sigorta'
    ],
    excluded: [
      'İçecekler (öğle yemeğinde)',
      'Kişisel harcamalar',
      'Ekstra aktiviteler'
    ],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Toros Dağları off-road macerası',
      'Geleneksel Türk köyü ziyareti',
      'Ev yapımı gözleme tadımı',
      'Düzlerçamı yaylası panorama',
      'Uçansu Şelalesi',
      'Doğal havuzda yüzme',
      '4x4 jeep deneyimi',
      'Profesyonel sürücüler'
    ],
    images: [
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 534,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'Antalya Jeep Safari Turu | Toros Dağları Macerası',
      metaDescription: 'Antalya jeep safari turunda Toros Dağları\'nı keşfedin. Off-road macera, köy ziyareti, şelale ve öğle yemeği dahil!',
      keywords: ['antalya jeep safari', 'toros dağları turu', '4x4 safari antalya', 'off-road turkey', 'adventure tour antalya']
    }
  },
  {
    id: 'antalya-adventure-003',
    name: 'Paragliding Tandem Uçuşu',
    slug: 'antalya-paragliding-tandem-flight',
    region: 'Antalya',
    category: 'adventure',
    description: 'Babadağ\'dan 1700 metre yükseklikten muhteşem Akdeniz manzarası eşliğinde yamaç paraşütü.',
    longDescription: 'Dünya\'nın en iyi yamaç paraşütü noktalarından biri olan Ölüdeniz-Babadağ\'da (Fethiye yakınları) veya Antalya Olimpos\'ta unutulmaz bir uçuş deneyimi yaşayın. 1700-2000 metre yükseklikten atlayış yaparak, turkuaz Akdeniz, yeşil ormanlar ve muhteşem kıyı şeridi eşliğinde 30-45 dakikalık bir uçuş gerçekleştireceksiniz.\n\nDeneyimli pilotumuz ile tandem (çift kişilik) uçacaksınız, bu nedenle hiçbir deneyim gerekmez. Kalkış öncesi kısa bir bilgilendirme yapılır ve güvenlik ekipmanlarınız takılır. Uçuş süresince pilotunuz size bölge hakkında bilgi verecek, isterseniz kontrolleri denemenize izin verecek.\n\nUçuş boyunca GoPro kamera ile görüntüler çekilir (opsiyonel satın alma). İniş plajda veya belirlenen güvenli alanlarda yapılır. Tüm uçuşlar hava durumuna bağlıdır ve güvenlik en üst düzeyde tutulur.',
    pricing: calculateBestPrice([1200, 1300, 1250]),
    duration: '4 saat (uçuş 30-45 dk)',
    difficulty: 'Orta',
    minAge: 16,
    maxGroupSize: 12,
    included: [
      'Otel transfer (Antalya bölgesi)',
      'Tandem yamaç paraşütü uçuşu',
      'Sertifikalı profesyonel pilot',
      'Tüm güvenlik ekipmanı',
      'Uçuş öncesi eğitim',
      'Sigorta',
      'Uçuş sertifikası'
    ],
    excluded: [
      'GoPro video/fotoğraf servisi (250 TL ekstra)',
      'Kişisel harcamalar',
      'Yiyecek-içecek'
    ],
    meetingPoint: 'Babadağ veya Olimpos uçuş merkezi',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal veya hava şartları nedeniyle iptalde tam iade',
    highlights: [
      'Dünyaca ünlü uçuş noktası',
      '1700-2000m yükseklikten atlayış',
      '30-45 dakika muhteşem uçuş',
      'Akdeniz panorama manzarası',
      'Profesyonel sertifikalı pilot',
      'Deneyim gerektirmez',
      'GoPro video kaydı (opsiyonel)',
      'Uçuş sertifikası'
    ],
    images: [
      'https://images.unsplash.com/photo-1509515837298-2c67a3933321?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525174933341-e73293b485f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    rating: 5.0,
    reviewCount: 1247,
    availability: ['Her Gün (hava durumuna bağlı)'],
    seo: {
      metaTitle: 'Antalya Yamaç Paraşütü | Tandem Paragliding Uçuşu',
      metaDescription: 'Babadağ veya Olimpos\'ta profesyonel pilot eşliğinde yamaç paraşütü deneyimi. 1700m yükseklikten muhteşem manzara!',
      keywords: ['antalya paragliding', 'yamaç paraşütü antalya', 'babadağ paragliding', 'tandem flight turkey', 'paragliding olimpos']
    }
  },

  // CULTURAL TOURS
  {
    id: 'antalya-cultural-001',
    name: 'Perge, Aspendos ve Side Antik Kentler Turu',
    slug: 'perge-aspendos-side-ancient-cities-tour',
    region: 'Antalya',
    category: 'cultural',
    description: 'Üç muhteşem antik kenti tek günde keşfedin. Roma dönemi tiyatroları ve tapınaklar.',
    longDescription: 'Antalya bölgesinin en önemli üç antik kentini tek bir günde keşfedeceğimiz bu kültür turu, tarih meraklıları için vazgeçilmez bir deneyim. İlk durağımız Perge antik kenti olacak. M.Ö. 1500 yıllarına uzanan bu antik kentte, Roma dönemi hamamları, stadyum, agora ve sütunlu caddeler göreceksiniz.\n\nİkinci durağımız, dünyanın en iyi korunmuş Roma tiyatrolarından biri olan Aspendos. 15,000 kişilik bu muhteşem tiyatro, günümüzde bile mükemmel akustiği ile ünlüdür. Rehberimiz size tiyatronun mimari özelliklerini ve tarihini detaylı anlatacak.\n\nÖğle yemeği molasından sonra Side antik kentine gideceğiz. Burada Apollon Tapınağı, Roma hamamları ve antik tiyatroyu ziyaret edeceksiniz. Tur sonunda Side\'nin modern plajlarında serbest zaman geçirme fırsatınız olacak.',
    pricing: calculateBestPrice([650, 700, 680]),
    duration: '9 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 45,
    included: [
      'Otel transfer (Antalya, Kemer, Belek)',
      'Klimalı lüks otobüs',
      'Profesyonel arkeolog rehber (İngilizce/Türkçe)',
      'Öğle yemeği (Side\'de)',
      'Tüm giriş ücretleri',
      'Sigorta'
    ],
    excluded: [
      'İçecekler (öğle yemeğinde)',
      'Kişisel harcamalar',
      'Müze içi özel turlar'
    ],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Perge antik kenti ve Roma hamamları',
      'Aspendos\'un dünyaca ünlü tiyatrosu',
      'Side Apollon Tapınağı',
      'Profesyonel arkeolog rehber',
      'Üç antik kent tek günde',
      'Roma dönemi mimarisi',
      'Side plajında serbest zaman',
      'Klimalı konforlu transfer'
    ],
    images: [
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555424681-79b60053721b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503177146873-2e80f74d4218?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 756,
    availability: ['Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Perge Aspendos Side Turu | Antik Kentler Turu Antalya',
      metaDescription: 'Üç muhteşem antik kenti tek günde keşfedin. Arkeolog rehber, öğle yemeği ve transfer dahil!',
      keywords: ['perge aspendos side turu', 'antalya antik kentler', 'aspendos tiyatrosu', 'side apollon tapınağı', 'antik tur antalya']
    }
  },
  {
    id: 'antalya-cultural-002',
    name: 'Demre Myra ve Kekova Turu',
    slug: 'demre-myra-kekova-sunken-city-tour',
    region: 'Antalya',
    category: 'cultural',
    description: 'Noel Baba\'nın kilisesi, Likya kaya mezarları ve batık şehir tekne turu.',
    longDescription: 'Antalya\'nın en mistik ve tarihi zengin bölgelerinden birini keşfedeceğimiz bu özel turda, Demre (antik Myra) ve Kekova adası sizi bekliyor. Sabah erken saatlerde otelden alınacak ve Demre\'ye hareket edeceğiz.\n\nİlk durağımız, Noel Baba olarak bilinen Aziz Nikolaos\'un piskopos olarak görev yaptığı ve mezarının bulunduğu tarihi kilise. Bu Bizans dönemi yapısında, muhteşem freskler ve mozaikler göreceksiniz. Rehberimiz size Aziz Nikolaos\'un hayatını ve Noel Baba geleneğinin kökenini anlatacak.\n\nArdından Myra antik kentine gideceğiz. Burada kayalara oyulmuş etkileyici Likya mezarları ve 10,000 kişilik Roma tiyatrosu görülmeye değer. Öğle yemeği sonrası ise özel tekne turumuzla Kekova adasına açılacağız. Tekne turumuz sırasında, su altındaki batık antik şehri görme fırsatı bulacaksınız. Berrak sulardan rahatlıkla seçilebilen antik kalıntılar, fotoğraf için muhteşem.',
    pricing: calculateBestPrice([750, 800, 780]),
    duration: '10 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 40,
    included: [
      'Otel transfer (Antalya, Kemer, Kaş)',
      'Klimalı lüks otobüs',
      'Profesyonel tarih rehberi',
      'Öğle yemeği (balık restoranı)',
      'Kekova tekne turu',
      'Tüm giriş ücretleri',
      'Sigorta'
    ],
    excluded: [
      'İçecekler',
      'Kişisel harcamalar',
      'Kilise içi özel tur (opsiyonel)'
    ],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Noel Baba Kilisesi (Aziz Nikolaos)',
      'Myra antik kenti ve Likya mezarları',
      'Kekova batık şehir tekne turu',
      'Roma tiyatrosu',
      'Profesyonel tarih rehberi',
      'Akdeniz balık yemeği',
      'UNESCO geçici listesinde',
      'Eşsiz fotoğraf fırsatları'
    ],
    images: [
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555424681-79b60053721b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 934,
    availability: ['Çarşamba', 'Cuma', 'Pazar'],
    seo: {
      metaTitle: 'Demre Myra Kekova Turu | Noel Baba Kilisesi ve Batık Şehir',
      metaDescription: 'Demre Myra antik kentini ve Kekova batık şehrini keşfedin. Noel Baba Kilisesi, Likya mezarları ve tekne turu dahil!',
      keywords: ['demre myra turu', 'kekova batık şehir', 'noel baba kilisesi', 'likya mezarları', 'antalya kültür turu']
    }
  },

  // NATURE TOURS
  {
    id: 'antalya-nature-001',
    name: 'Düden ve Kurşunlu Şelaleleri Turu',
    slug: 'duden-kursunlu-waterfalls-tour',
    region: 'Antalya',
    category: 'daily',
    description: 'Antalya\'nın iki muhteşem şelalesini keşfedin. Doğa yürüyüşü ve piknik.',
    longDescription: 'Antalya\'nın en güzel doğa harikalarından ikisini aynı gün ziyaret edeceğiniz bu tur, doğa severlerin favorisi. İlk durağımız, şehir merkezine çok yakın olan Üst Düden Şelalesi. 20 metre yükseklikten dökülen bu muhteşem şelalenin arkasındaki mağaraya girme fırsatı bulacaksınız.\n\nDoğa parkı içindeki yürüyüş yollarında ilerlerken, zengin bitki örtüsü ve kuş sesleri eşliğinde huzurlu bir deneyim yaşayacaksınız. Fotoğraf için harika açılar ve piknik alanları mevcut.\n\nÖğleden sonra ise Kurşunlu Şelalesi\'ni ziyaret edeceğiz. Yemyeşil ormanın içindeki bu şelale, 18 metre yükseklikten göl havuzuna dökülüyor. Tahta köprüler üzerinden yürüyüş yaparak şelaleyi farklı açılardan göreceksiniz. Parkta alabalık restoranlarında öğle yemeği yiyebilir veya piknik yapabilirsiniz.',
    pricing: calculateBestPrice([350, 380, 365]),
    duration: '5 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 50,
    included: [
      'Otel transfer (Antalya merkez)',
      'Profesyonel rehber',
      'Parkurlara giriş ücretleri',
      'Sigorta'
    ],
    excluded: [
      'Öğle yemeği',
      'İçecekler',
      'Kişisel harcamalar'
    ],
    meetingPoint: 'Antalya merkez otel alımı',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Üst Düden Şelalesi ve mağarası',
      'Kurşunlu Şelalesi doğa parkı',
      'Yemyeşil orman yürüyüşü',
      'Piknik alanları',
      'Fotoğraf fırsatları',
      'Kuş gözlemciliği',
      'Aile dostu tur',
      'Şehre yakın doğa kaçamağı'
    ],
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 423,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'Düden Kurşunlu Şelaleleri Turu | Antalya Doğa Turu',
      metaDescription: 'Antalya\'nın iki muhteşem şelalesini keşfedin. Doğa yürüyüşü, piknik alanları ve transfer dahil!',
      keywords: ['düden şelalesi', 'kurşunlu şelalesi', 'antalya şelaleleri', 'doğa turu antalya', 'waterfall tour']
    }
  },
  {
    id: 'antalya-nature-002',
    name: 'Tahtalı Dağı Teleferik Turu',
    slug: 'tahtali-mountain-cable-car-tour',
    region: 'Antalya',
    category: 'daily',
    description: 'Olimpos Teleferik ile 2365 metre zirvede muhteşem manzara. Kemer panoraması.',
    longDescription: 'Akdeniz\'in tepesinden dünyayı seyretmek ister misiniz? Tahtalı Dağı (Olimpos) Teleferik Turu ile deniz seviyesinden 2365 metre yüksekliğe sadece 10 dakikada ulaşacaksınız. Dünyanın en uzun teleferik hatlarından biri olan Olimpos Teleferik, size unutulmaz bir deneyim sunuyor.\n\nTeleferik yolculuğu sırasında, Kemer kıyı şeridi, yemyeşil ormanlar ve Akdeniz\'in turkuaz suları eşliğinde yükseleceksiniz. Zirve istasyonunda, 360 derece panoramik manzara terasında fotoğraf çekebilir, restoranda kahvaltı veya öğle yemeği yiyebilirsiniz.\n\nZirvede yaklaşık 2 saat serbest zamanınız olacak. Kısa yürüyüş parkurları, gözlem noktaları ve antik Olimpos kalıntılarını keşfedebilirsiniz. Hava şartları uygunsa, yamaç paraşütü yapanları da izleyeceksiniz. Aşağı inerken yine teleferik ile, farklı bir manzara deneyimi yaşayacaksınız.',
    pricing: calculateBestPrice([550, 600, 575]),
    duration: '6 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 60,
    included: [
      'Otel transfer (Kemer, Beldibi, Tekirova)',
      'Gidiş-dönüş teleferik bileti',
      'Profesyonel rehber',
      'Sigorta'
    ],
    excluded: [
      'Yiyecek-içecek (zirvede restoran mevcut)',
      'Kişisel harcamalar',
      'Fotoğraf hizmetleri'
    ],
    meetingPoint: 'Olimpos Teleferik istasyonu',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '2365 metre yükseklik',
      'Dünyanın en uzun teleferik hatlarından',
      '360 derece panorama',
      'Akdeniz ve Kemer manzarası',
      'Zirve restoranı',
      'Yürüyüş parkurları',
      'Antik Olimpos kalıntıları',
      'Fotoğraf için muhteşem manzaralar'
    ],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 1089,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'Tahtalı Dağı Teleferik Turu | Olimpos Cable Car Antalya',
      metaDescription: 'Olimpos Teleferik ile 2365 metre zirveye çıkın. Muhteşem Akdeniz panoraması ve transfer dahil!',
      keywords: ['tahtalı dağı teleferik', 'olimpos cable car', 'olympos tahtali', 'kemer teleferik', 'antalya cable car']
    }
  }
  },

  // WATER SPORTS & DIVING
  {
    id: 'antalya-diving-001',
    name: 'Kaş Dalış Turu - PADI Sertifikalı',
    slug: 'kas-scuba-diving-padi-certified',
    region: 'Antalya',
    category: 'adventure',
    description: 'Akdeniz\'in en berrak sularında dalış. Deneyimsizler için özel eğitim dahil.',
    longDescription: 'Kaş, Türkiye\'nin en iyi dalış noktalarından biri olarak dünya çapında ünlüdür. Berrak suları, zengin deniz yaşamı ve su altı mağaraları ile dalış tutkunlarının gözdesidir. PADI sertifikalı eğitmenlerimiz eşliğinde, güvenli ve unutulmaz bir dalış deneyimi yaşayacaksınız.\n\nDeneyimli dalgıçlar için iki farklı dalış noktasında toplam 2 dalış yapılacak. İlk dalışta 12-18 metre derinlikte, ikinci dalışta ise 18-25 metre derinlikte dalacaksınız. Su altında renkli mercan resifleri, deniz kaplumbağaları, ahtapotlar ve çeşitli balık türleri göreceksiniz.\n\nDeneyimsiz dalgıçlar için ise "Discover Scuba Diving" programımız mevcut. Havuzda veya sığ suda temel eğitimden sonra, eğitmeninizle birlikte ilk dalışınızı yapacaksınız. Tüm ekipman dahildir ve güvenlik en üst seviyededir.',
    pricing: calculateBestPrice([950, 1050, 1000]),
    duration: '6 saat',
    difficulty: 'Orta',
    minAge: 14,
    maxGroupSize: 12,
    included: [
      'Otel transfer (Kaş, Kalkan)',
      'Tüm dalış ekipmanı (tüp, regülatör, BCD, ağırlık kemeri)',
      'PADI sertifikalı eğitmen',
      '2 dalış (deneyimliler için)',
      'Eğitim (deneyimsizler için)',
      'Öğle yemeği (tekne üzerinde)',
      'Sigorta',
      'Dalış logbook kaydı'
    ],
    excluded: [
      'Sualtı fotoğraf servisi (300 TL)',
      'Ekstra dalışlar',
      'PADI sertifikası (opsiyonel 1200 TL)'
    ],
    meetingPoint: 'Kaş Limanı',
    cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'PADI sertifikalı profesyonel eğitmenler',
      'Akdeniz\'in en berrak suları',
      '2 farklı dalış noktası',
      'Zengin deniz yaşamı',
      'Deneyimsizler için eğitim',
      'Tüm ekipman dahil',
      'Su altı mağaraları',
      'Mercan resifleri'
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 678,
    availability: ['Her Gün (hava durumuna bağlı)'],
    seo: {
      metaTitle: 'Kaş Dalış Turu | PADI Sertifikalı Scuba Diving Antalya',
      metaDescription: 'Kaş\'ta profesyonel eğitmenlerle dalış. Başlangıç ve ileri seviye dalgıçlar için. Ekipman ve öğle yemeği dahil!',
      keywords: ['kaş dalış', 'scuba diving kas', 'padi diving turkey', 'underwater kas', 'diving antalya']
    }
  },

  // SPECIAL EXPERIENCES
  {
    id: 'antalya-special-001',
    name: 'Türk Gecesi ve Gösteri',
    slug: 'turkish-night-show-antalya',
    region: 'Antalya',
    category: 'cultural',
    description: 'Geleneksel Türk mutfağı, canlı müzik ve folklorik gösteriler ile unutulmaz bir gece.',
    longDescription: 'Türk kültürünü en iyi şekilde deneyimlemek için Türk Gecesi\'ne katılın! Açık büfe akşam yemeği ile başlayan gecemiz, zengin Türk mutfağının en lezzetli örneklerini sunuyor. Mezeler, ızgara etler, tatlılar ve yerel lezzetlerle dolu sofranızda, her damak zevkine uygun seçenekler bulacaksınız.\n\nYemek sonrası başlayan gösterimizde, Türkiye\'nin farklı bölgelerinden folklorik danslar izleyeceksiniz. Zeybek, horon, halay ve karşılama gibi geleneksel danslar, renkli kostümler eşliğinde sergilenecek. Gösterinin yıldızı ise ünlü göbek dansı performansı olacak.\n\nGecenin ilerleyen saatlerinde, siz de dansa katılıp geleneksel Türk danslarını öğrenebilirsiniz. Canlı müzik eşliğinde eğlenceye devam ederken, sınırsız alkolsüz içecekler ve meyve ikramları sunulur. Alkollü içecekler ekstra ücret karşılığıdır.',
    pricing: calculateBestPrice([450, 500, 475]),
    duration: '5 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 200,
    included: [
      'Otel gidiş-dönüş transferi',
      'Açık büfe akşam yemeği',
      'Sınırsız alkolsüz içecekler',
      'Meyve ikramları',
      'Canlı müzik',
      'Folklorik gösteriler',
      'Göbek dansı gösterisi',
      'Dans eğitimi'
    ],
    excluded: [
      'Alkollü içecekler (bara ödeme)',
      'Fotoğraf/video servisi',
      'Kişisel harcamalar'
    ],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Zengin açık büfe akşam yemeği',
      'Geleneksel Türk mutfağı',
      'Profesyonel folklorik gösteriler',
      'Göbek dansı performansı',
      'Canlı Türk müziği',
      'İnteraktif dans seansları',
      'Aile dostu ortam',
      'Kültürel deneyim'
    ],
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 1203,
    availability: ['Salı', 'Perşembe', 'Cumartesi'],
    seo: {
      metaTitle: 'Türk Gecesi Antalya | Turkish Night Show Gösteri',
      metaDescription: 'Geleneksel Türk mutfağı, folklor gösterileri ve göbek dansı. Açık büfe yemek ve transfer dahil!',
      keywords: ['türk gecesi antalya', 'turkish night show', 'belly dance antalya', 'folklor gösterisi', 'turkish dinner show']
    }
  },
  {
    id: 'antalya-special-002',
    name: 'Türk Hamamı ve Masaj Deneyimi',
    slug: 'turkish-bath-hammam-massage',
    region: 'Antalya',
    category: 'daily',
    description: 'Geleneksel Türk hamamında arınma, kese, köpük ve yağ masajı ile tam relax.',
    longDescription: 'Osmanlı döneminden günümüze gelen geleneksel Türk hamamı deneyimi ile bedeninizi ve ruhunuzu arındırın. Tarihi atmosfere sahip hamamımızda, profesyonel tellaklar ve masözler eşliğinde unutulmaz bir rahatlama deneyimi yaşayacaksınız.\n\nHamam deneyiminiz, sıcak göbek taşında vücut ısınması ile başlar. Ardından geleneksel kese ile ölü deriler temizlenir ve ardından bol köpüklü sabun masajı yapılır. Bu süreç cildinizi yeniler ve toksinlerin atılmasına yardımcı olur.\n\nDaha sonra sıcak su ile durulanır ve dinlenme odasına geçilir. Burada geleneksel Türk çayı ikram edilir. İsterseniz ekstra ücret karşılığında aromaterapi yağ masajı, ayak masajı veya yüz maskesi gibi ek hizmetlerden faydalanabilirsiniz. Tüm süreç yaklaşık 1.5-2 saat sürer.',
    pricing: calculateBestPrice([350, 400, 375]),
    duration: '2 saat',
    difficulty: 'Kolay',
    minAge: 12,
    maxGroupSize: 30,
    included: [
      'Otel transfer (opsiyonel)',
      'Geleneksel Türk hamamı',
      'Kese (scrub)',
      'Köpük masajı',
      '15 dakika klasik yağ masajı',
      'Peştamal ve havlu',
      'Terlik kullanımı',
      'Türk çayı ikramı',
      'Dinlenme odası kullanımı'
    ],
    excluded: [
      'Ekstra masaj seansları',
      'Aromaterapi yağ masajı (200 TL)',
      'Yüz maskesi (150 TL)',
      'Sauna/buhar odası (opsiyonel)'
    ],
    meetingPoint: 'Hamam girişi veya otel transfer',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Geleneksel Osmanlı hamamı',
      'Profesyonel kese masajı',
      'Köpük ve yağ masajı',
      'Tarihi atmosfer',
      'Cilt yenileme',
      'Detoks etkisi',
      'Tam rahatlama',
      'Türk çayı ikramı'
    ],
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596178060810-4dd2c93d7e7a?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 956,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'Türk Hamamı Antalya | Geleneksel Hamam ve Masaj',
      metaDescription: 'Otantik Türk hamamında kese, köpük ve yağ masajı. Profesyonel hizmet, transfer dahil. Hemen rezervasyon!',
      keywords: ['türk hamamı antalya', 'turkish bath antalya', 'hammam massage', 'spa antalya', 'traditional bath turkey']
    }
  },

  // MORE ADVENTURE TOURS
  {
    id: 'antalya-adventure-004',
    name: 'ATV Quad Safari Turu',
    slug: 'atv-quad-safari-antalya',
    region: 'Antalya',
    category: 'adventure',
    description: 'Dağ ve ormanlarda ATV macerası. Toz bulutu ve adrenalin dolu parkur.',
    longDescription: 'ATV (All Terrain Vehicle) ile Toros Dağları\'nın eteklerinde unutulmaz bir macera deneyimi! Hiçbir deneyim gerektirmeyen bu turda, otomatik ATV\'ler ile dağ yollarında, orman parkurlarında ve çamur yollarında sürüş yapacaksınız.\n\nTur başlamadan önce güvenlik eğitimi ve sürüş pratiği yapılır. Kask, gözlük ve toz maskesi sağlanır. Konvoy halinde hareket edilir ve deneyimli rehber grubu yönlendirir. Parkurumuz hem acemi hem de deneyimli sürücüler için uygundur.\n\nYol boyunca manzara fotoğraf molal

arı verilir. Köy ziyareti ve çay molası dahildir. İki saat sürüş sonrası, çamurlu ATV\'leri yıkama keyfi de size aittir! Tek kişilik veya çift kişilik ATV seçenekleri mevcuttur.',
    pricing: calculateBestPrice([550, 600, 575]),
    duration: '4 saat',
    difficulty: 'Orta',
    minAge: 16,
    maxGroupSize: 24,
    included: [
      'Otel transfer',
      'ATV kullanımı (2 saat)',
      'Yakıt',
      'Güvenlik ekipmanı (kask, gözlük, maske)',
      'Profesyonel rehber',
      'Güvenlik eğitimi',
      'Sigorta'
    ],
    excluded: [
      'Fotoğraf/video servisi (opsiyonel)',
      'İçecekler',
      'Kişisel hasar bedelleri'
    ],
    meetingPoint: 'ATV Safari Merkezi',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'ATV sürüş deneyimi',
      'Toros Dağları parkurları',
      'Orman ve dağ yolları',
      'Çamur parkurları',
      'Köy ziyareti',
      'Panorama manzaralar',
      'Tek veya çift kişilik seçenekler',
      'Deneyim gerektirmez'
    ],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 734,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'ATV Quad Safari Antalya | Dağ ve Orman Macerası',
      metaDescription: 'Toros Dağları\'nda ATV safari. Deneyim gerektirmez, ekipman ve eğitim dahil. Adrenalin dolu 2 saat!',
      keywords: ['atv safari antalya', 'quad tour antalya', 'atv torus mountains', 'off-road antalya', 'adventure quad']
    }
  },
  {
    id: 'antalya-adventure-005',
    name: 'Zipline ve Macera Parkı',
    slug: 'zipline-adventure-park-antalya',
    region: 'Antalya',
    category: 'adventure',
    description: 'Ağaçların arasında zipline, ip köprüler ve engel parkuru. Aile için eğlence.',
    longDescription: 'Antalya\'nın en büyük macera parkında, ağaçların arasında kurulu profesyonel zipline parkurlarında adrenalin dolu bir gün geçirin. Parkımızda 3 farklı zorluk seviyesinde parkur bulunuyor: Çocuk parkuru, orta seviye ve ileri seviye.\n\nHer parkurda zipline hatları, ip köprüler, salıncaklar, denge platformları ve engeller mevcut. Tam güvenlik ekipmanı (emniyet kemeri, kask, eldivenler) giydirilir ve profesyonel eğitmenler sürekli gözetim altında tutar.\n\nÇocuklar için özel düşük parkurlar mevcut (4-10 yaş). Ailecek katılım için ideal. En heyecan verici bölüm, 300 metre uzunluğundaki ana zipline hattı! Ağaçların tepesinden vadiye doğru süzülme deneyimi unutulmaz.',
    pricing: calculateBestPrice([400, 450, 425]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 4,
    maxGroupSize: 50,
    included: [
      'Macera parkı girişi',
      'Tüm güvenlik ekipmanı',
      'Profesyonel eğitmenler',
      'Eğitim parkuru',
      '3 farklı seviye parkur',
      'Sınırsız tur (süre dahilinde)',
      'Sigorta'
    ],
    excluded: [
      'Otel transferi (opsiyonel +100 TL)',
      'Yiyecek-içecek (kafeterya mevcut)',
      'Fotoğraf/video servisi',
      'Kişisel harcamalar'
    ],
    meetingPoint: 'Macera Parkı girişi',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      '3 seviye parkur (çocuk-orta-ileri)',
      'Zipline hatları',
      'İp köprüler ve engeller',
      'Aile dostu aktivite',
      '300m ana zipline',
      'Profesyonel güvenlik',
      'Ağaçların arasında macera',
      'Eğlence ve adrenalin'
    ],
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 445,
    availability: ['Her Gün (Nisan-Kasım)'],
    seo: {
      metaTitle: 'Zipline ve Macera Parkı Antalya | Adventure Park',
      metaDescription: 'Ağaçların arasında zipline, ip köprüler ve engel parkuru. Tüm aile için eğlence! 3 seviye parkur.',
      keywords: ['zipline antalya', 'adventure park antalya', 'macera parkı', 'tree climbing antalya', 'family adventure']
    }
  },

  // MORE CULTURAL TOURS
  {
    id: 'antalya-cultural-003',
    name: 'Termessos Antik Kenti Turu',
    slug: 'termessos-ancient-city-tour',
    region: 'Antalya',
    category: 'cultural',
    description: 'Toros Dağları\'nda 1050m yükseklikte fethedilmemiş antik kent. Muhteşem tiyatro.',
    longDescription: 'Büyük İskender bile fethetmediği söylenen Termessos, Antalya\'nın en etkileyici antik kentlerinden biridir. 1050 metre yükseklikte, Güllük Dağı Milli Parkı içinde yer alan bu antik kent, benzersiz konumu ve muhteşem manzarası ile ziyaretçilerini büyülüyor.\n\nAntik kente ulaşmak için orman içinde 30 dakikalık yürüyüş yapacağız. Yol boyunca Pisidya bölgesinin tarihi hakkında bilgiler vereceğiz. Kente vardığınızda, 4200 kişilik tiyatro sizi karşılayacak. Tiyatronun üst sıralarından bakıldığında, Antalya körfezi ve dağların muhteşem panoraması görülür.\n\nTiyatro dışında, agora, tapınaklar, sütunlu caddeler, su sarnıçları ve nekropol (mezarlık) bölgesini gezeceğiz. Nekropolde etkileyici lahitler ve kaya mezarları mevcut. Tur boyunca profesyonel rehberimiz, Termessos\'un askeri gücü ve bağımsızlığını nasıl koruduğunu anlatacak.',
    pricing: calculateBestPrice([450, 500, 475]),
    duration: '6 saat',
    difficulty: 'Orta',
    minAge: 8,
    maxGroupSize: 40,
    included: [
      'Otel transfer (Antalya merkez)',
      'Profesyonel arkeolog rehber',
      'Termessos giriş ücreti',
      'Milli Park giriş ücreti',
      'Yürüyüş rehberliği',
      'Sigorta'
    ],
    excluded: [
      'Öğle yemeği (mola verilir)',
      'İçecekler',
      'Kişisel harcamalar'
    ],
    meetingPoint: 'Otel lobinizden alınış',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Fethedilmemiş antik kent',
      '1050m yükseklikte konum',
      'Muhteşem panorama tiyatro',
      'Güllük Dağı Milli Parkı',
      'Doğa yürüyüşü',
      'Nekropol ve lahitler',
      'Pisidya tarihi',
      'Profesyonel arkeolog rehber'
    ],
    images: [
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555424681-79b60053721b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 567,
    availability: ['Çarşamba', 'Cumartesi'],
    seo: {
      metaTitle: 'Termessos Antik Kenti Turu | Fethedilmemiş Şehir Antalya',
      metaDescription: 'Toros Dağları\'nda 1050m yükseklikte Termessos antik kentini keşfedin. Muhteşem tiyatro ve panorama manzara!',
      keywords: ['termessos antik kent', 'termessos tour', 'ancient city antalya', 'pisidya', 'mountain ancient city']
    }
  },
  {
    id: 'antalya-cultural-004',
    name: 'Antalya Kaleiçi Yürüyüş Turu',
    slug: 'antalya-kaleici-old-town-walking-tour',
    region: 'Antalya',
    category: 'cultural',
    description: 'Tarihi Kaleiçi\'nde yürüyüş. Osmanlı evleri, Hadrian Kapısı ve antik liman.',
    longDescription: 'Antalya\'nın kalbi Kaleiçi\'nde, dar sokaklarda tarihe yolculuk yapın. Bu 3 saatlik yürüyüş turunda, Osmanlı döneminden kalma restore edilmiş evleri, butik otelleri, hediyelik eşya dükkanlarını ve tarihi yapıları keşfedeceksiniz.\n\nTurumuz, Roma İmparatoru Hadrian için yapılan muhteşem Hadrian Kapısı\'ndan başlayacak. Bu 3 kemerli zafer anıtı, M.S. 130 yılında inşa edilmiştir. Ardından Hıdırlık Kulesi\'ni, Kesik Minare\'yi (eski Saint Peter Kilisesi) ve İvli Minare\'yi göreceğiz.\n\nAntik liman bölgesinde mola vererek, marina manzarası eşliğinde Türk kahvesi içebilirsiniz. Rehberimiz size Antalya\'nın Osmanlı ve Selçuklu dönemindeki tarihini, eski fotoğraflar eşliğinde anlatacak. Tur Cumhuriyet Meydanı ve Atatürk parkında son bulacak.',
    pricing: calculateBestPrice([250, 300, 275]),
    duration: '3 saat',
    difficulty: 'Kolay',
    minAge: 0,
    maxGroupSize: 25,
    included: [
      'Profesyonel yerel rehber',
      'Yürüyüş turu',
      'Hadrian Kapısı ziyareti',
      'Hıdırlık Kulesi',
      'Kesik Minare',
      'İvli Minare',
      'Antik liman manzarası',
      'Türk kahvesi ikramı'
    ],
    excluded: [
      'Otel transfer (merkeze yakın)',
      'Öğle yemeği',
      'Müze giriş ücretleri (opsiyonel)',
      'Alışveriş harcamaları'
    ],
    meetingPoint: 'Hadrian Kapısı önü',
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    highlights: [
      'Hadrian Kapısı (M.S. 130)',
      'Osmanlı evleri',
      'Hıdırlık Kulesi',
      'Kesik Minare',
      'İvli Minare (landmark)',
      'Antik liman marina',
      'Dar tarihi sokaklar',
      'Yerel kültür deneyimi'
    ],
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555424681-79b60053721b?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 834,
    availability: ['Her Gün'],
    seo: {
      metaTitle: 'Kaleiçi Yürüyüş Turu Antalya | Old Town Walking Tour',
      metaDescription: 'Antalya Kaleiçi\'nde tarihi yürüyüş. Hadrian Kapısı, Osmanlı evleri, antik liman. Yerel rehber eşliğinde!',
      keywords: ['kaleiçi turu', 'antalya old town', 'hadrian gate', 'antalya walking tour', 'tarihi mekan antalya']
    }
  }
];

// Export all Antalya tours
export default antalyaTours;
