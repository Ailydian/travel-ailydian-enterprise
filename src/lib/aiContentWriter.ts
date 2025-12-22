// AI Content Writer System
// Otomatik içerik oluşturma sistemi - tüm listing'ler için
// SEO-optimized, unique, Türkçe içerik

export interface ContentRequest {
  type: 'hotel' | 'car' | 'tour' | 'transfer' | 'vehicle' | 'property';
  name: string;
  location: string;
  category?: string;
  features?: string[];
  price?: number;
  rating?: number;
  additionalInfo?: Record<string, any>;
}

export interface GeneratedContent {
  title: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  faq: Array<{ question: string; answer: string }>;
  tags: string[];
  callToAction: string;
  tone: 'professional' | 'casual' | 'luxury' | 'family-friendly';
}

/**
 * AI Content Templates by Category
 */
const CONTENT_TEMPLATES = {
  hotel: {
    titleFormats: [
      '{name} - {location} | Konforlu Konaklama',
      '{name} {location} - En İyi Otel Seçenekleri',
      '{location} {name} - Unutulmaz Tatil Deneyimi'
    ],
    introTemplates: [
      '{location}\'da bulunan {name}, {features} ile misafirlerine eşsiz bir konaklama deneyimi sunar.',
      '{name}, {location}\'ın kalbinde yer alan, {features} özellikleriyle dikkat çeken bir oteldir.',
      '{location}\'da tatil planlarınız için ideal seçim olan {name}, {features} ile konforlu bir konaklama sağlar.'
    ],
    highlightPrefixes: [
      'Modern ve konforlu odalar',
      'Merkezi konum',
      'Profesyonel hizmet anlayışı',
      '7/24 resepsiyon hizmeti',
      'Güvenli park alanı',
      'Ücretsiz Wi-Fi',
      'Zengin kahvaltı seçenekleri'
    ]
  },
  car: {
    titleFormats: [
      '{name} Araç Kiralama - {location}',
      '{location}\'da {name} Kirala',
      '{name} - Ekonomik Araç Kiralama | {location}'
    ],
    introTemplates: [
      '{location}\'da {name} araç kiralama hizmeti, {features} ile yolculuğunuzu konforlu hale getirir.',
      '{name} ile {location}\'da özgürce seyahat edin. {features} özellikleriyle güvenli bir sürüş deneyimi.',
      '{location} geziniz için ideal seçim {name}. {features} ile keyifli bir yolculuk sizi bekliyor.'
    ],
    highlightPrefixes: [
      'Düzenli bakım yapılmış araçlar',
      'Kasko sigortası dahil',
      'Sınırsız kilometre',
      'Havalimanı teslimat',
      '7/24 yol yardım',
      'Temiz ve hijyenik araçlar',
      'Esnek kiralama süreleri'
    ]
  },
  tour: {
    titleFormats: [
      '{name} Turu - {location}',
      '{location} {name} - Rehberli Tur',
      '{name} | {location} Gezisi'
    ],
    introTemplates: [
      '{location}\'da unutulmaz bir deneyim sunan {name}, {features} ile size özel anlar yaşatır.',
      '{name} ile {location}\'ın en güzel yerlerini keşfedin. {features} eşliğinde muhteşem bir gezi.',
      '{location}\'ın kültürünü ve güzelliklerini {name} ile tanıyın. {features} dahildir.'
    ],
    highlightPrefixes: [
      'Profesyonel rehber eşliğinde',
      'Giriş ücretleri dahil',
      'Öğle yemeği ikramı',
      'Ulaşım sağlanır',
      'Fotoğraf çekim imkanı',
      'Küçük grup turları',
      'Yerel lezzetler tadımı'
    ]
  },
  transfer: {
    titleFormats: [
      '{location} Transfer Hizmeti - {name}',
      '{name} - Güvenli Transfer | {location}',
      '{location} Havalimanı Transferi - {name}'
    ],
    introTemplates: [
      '{location}\'da {name} transfer hizmeti ile güvenli ve konforlu ulaşım. {features} ile hizmetinizdeyiz.',
      '{name}, {location}\'da profesyonel transfer çözümleri sunar. {features} dahildir.',
      '{location}\'da zamanında ve güvenli ulaşım için {name}. {features} ile kaliteli hizmet.'
    ],
    highlightPrefixes: [
      'Havalimanı karşılama',
      'Profesyonel sürücü',
      'Lüks araç filosu',
      'Zamanında teslimat',
      'Meet & Greet hizmeti',
      'Bagaj yardımı',
      '7/24 destek hattı'
    ]
  },
  vehicle: {
    titleFormats: [
      '{name} Şoförlü Araç - {location}',
      '{location} {name} Kiralama | Şoförlü',
      '{name} - VIP Transfer Hizmeti | {location}'
    ],
    introTemplates: [
      '{location}\'da {name} şoförlü araç hizmeti, {features} ile konforlu yolculuklar sunar.',
      '{name} ile {location}\'da profesyonel sürücü eşliğinde seyahat edin. {features} dahildir.',
      '{location}\'da VIP transfer için {name}. {features} ile özel hizmet.'
    ],
    highlightPrefixes: [
      'Deneyimli profesyonel sürücü',
      'Lüks araç seçenekleri',
      'Şehir içi/dışı hizmet',
      'Günlük/saatlik kiralama',
      'Özel etkinlik transferi',
      'Kurumsal çözümler',
      'VIP protokol hizmeti'
    ]
  },
  property: {
    titleFormats: [
      '{name} - {location} | Kiralık Ev',
      '{location}\'da {name} - Tatil Evi',
      '{name} Kiralık Villa - {location}'
    ],
    introTemplates: [
      '{location}\'da yer alan {name}, {features} ile ailenizle unutulmaz tatil yapabileceğiniz bir mekandır.',
      '{name}, {location}\'da konforlu ve huzurlu bir tatil için ideal. {features} mevcuttur.',
      '{location}\'da tatil eviniz {name}, {features} ile size özel bir deneyim sunar.'
    ],
    highlightPrefixes: [
      'Geniş ve ferah odalar',
      'Tam donanımlı mutfak',
      'Özel bahçe/balkon',
      'Yüzme havuzu',
      'Güvenli site içinde',
      'Denize yakın konum',
      'Aile dostu ortam'
    ]
  }
};

/**
 * Generate SEO-optimized title
 */
function generateTitle(request: ContentRequest): string {
  const template = CONTENT_TEMPLATES[request.type];
  const format = template.titleFormats[Math.floor(Math.random() * template.titleFormats.length)];

  return format
    .replace('{name}', request.name)
    .replace('{location}', request.location)
    .replace('{category}', request.category || '');
}

/**
 * Generate short description (150-200 characters)
 */
function generateShortDescription(request: ContentRequest): string {
  const template = CONTENT_TEMPLATES[request.type];
  const intro = template.introTemplates[0];

  const features = request.features?.slice(0, 3).join(', ') || 'modern özellikler';

  const description = intro
    .replace('{name}', request.name)
    .replace('{location}', request.location)
    .replace('{features}', features);

  // Truncate to ~150-200 chars
  return description.length > 200
    ? description.substring(0, 197) + '...'
    : description;
}

/**
 * Generate long description (500-800 characters)
 */
function generateLongDescription(request: ContentRequest): string {
  const template = CONTENT_TEMPLATES[request.type];
  const intro = template.introTemplates[Math.floor(Math.random() * template.introTemplates.length)];

  const features = request.features?.join(', ') || 'modern özellikler';

  let description = intro
    .replace('{name}', request.name)
    .replace('{location}', request.location)
    .replace('{features}', features);

  // Add pricing info if available
  if (request.price) {
    description += ` Uygun fiyat seçenekleri ile ₺${request.price.toLocaleString()} başlayan fiyatlarla hizmet vermektedir.`;
  }

  // Add rating info if available
  if (request.rating) {
    description += ` Misafirlerimizden ${request.rating.toFixed(1)}/5.0 ortalama puan almıştır.`;
  }

  // Add call to action
  description += ` ${request.location}'da kaliteli ve güvenilir hizmet arayanlar için ${request.name} ideal bir seçimdir. Rezervasyonunuzu hemen yapın ve avantajlı fiyatlardan yararlanın!`;

  // Add bundle pricing info
  description += ` Travel Ailydian'ın bundle pricing sistemi ile diğer hizmetlerle birleştirerek %20'ye varan indirim kazanabilirsiniz.`;

  return description;
}

/**
 * Generate highlights list
 */
function generateHighlights(request: ContentRequest): string[] {
  const template = CONTENT_TEMPLATES[request.type];
  const highlights: string[] = [];

  // Add predefined highlights
  const prefixes = template.highlightPrefixes.slice(0, 5);
  highlights.push(...prefixes);

  // Add custom features if available
  if (request.features && request.features.length > 0) {
    highlights.push(...request.features.slice(0, 3));
  }

  // Add universal highlights
  highlights.push('Müşteri memnuniyeti garantisi');
  highlights.push('Kolay rezervasyon sistemi');
  highlights.push('7/24 destek hizmeti');

  return highlights.slice(0, 10);
}

/**
 * Generate SEO metadata
 */
function generateSEOMetadata(request: ContentRequest): {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
} {
  const seoTitle = `${request.name} ${request.location} | Travel Ailydian - En Uygun Fiyatlar`;

  const metaDescription = `${request.location}'da ${request.name} için en uygun fiyatlar ve güvenli rezervasyon. ${request.features?.slice(0, 2).join(', ')}. Hemen rezervasyon yapın!`;

  const keywords = [
    `${request.name.toLowerCase()}`,
    `${request.location.toLowerCase()} ${request.type}`,
    `${request.location.toLowerCase()} tatil`,
    `${request.name.toLowerCase()} rezervasyon`,
    `${request.location.toLowerCase()} gezilecek yerler`
  ];

  if (request.category) {
    keywords.push(`${request.location.toLowerCase()} ${request.category.toLowerCase()}`);
  }

  return { seoTitle, metaDescription, keywords };
}

/**
 * Generate FAQ
 */
function generateFAQ(request: ContentRequest): Array<{ question: string; answer: string }> {
  const faq: Array<{ question: string; answer: string }> = [];

  // Type-specific questions
  if (request.type === 'hotel') {
    faq.push({
      question: `${request.name} nerede bulunmaktadır?`,
      answer: `${request.name}, ${request.location}'da merkezi bir konumda yer almaktadır. Ana turistik bölgelere ve ulaşım noktalarına yakındır.`
    });

    faq.push({
      question: `${request.name} için rezervasyon nasıl yapılır?`,
      answer: `Travel Ailydian üzerinden online olarak güvenli rezervasyon yapabilirsiniz. Tarih ve misafir sayısını seçtikten sonra anında onay alırsınız.`
    });

    if (request.price) {
      faq.push({
        question: `${request.name} fiyatları ne kadardır?`,
        answer: `${request.name} için fiyatlar ₺${request.price.toLocaleString()} başlamaktadır. Erken rezervasyon ve paket rezervasyon ile %20'ye varan indirim kazanabilirsiniz.`
      });
    }
  }

  if (request.type === 'car') {
    faq.push({
      question: `${request.location}'da araç kiralama için gerekli belgeler nelerdir?`,
      answer: `Geçerli sürücü belgesi, kimlik belgesi ve kredi kartı gereklidir. Yabancı uyruklu misafirler için pasaport ve uluslararası sürücü belgesi.`
    });

    faq.push({
      question: 'Sigorta kapsamı nedir?',
      answer: 'Kasko sigortası ve zorunlu trafik sigortası kiralama ücretine dahildir. İsteğe bağlı tam kapsamlı sigorta seçenekleri mevcuttur.'
    });
  }

  if (request.type === 'tour') {
    faq.push({
      question: `${request.name} turu kaç saat sürmektedir?`,
      answer: 'Tur süresi genellikle 4-8 saat arasında değişmektedir. Detaylı program bilgisi rezervasyon sırasında paylaşılır.'
    });

    faq.push({
      question: 'Tur ücreti neleri kapsar?',
      answer: 'Rehberlik hizmeti, ulaşım, giriş ücretleri ve belirtilen yemekler tur ücretine dahildir. Kişisel harcamalar dahil değildir.'
    });
  }

  // Universal questions
  faq.push({
    question: 'İptal politikası nedir?',
    answer: 'Rezervasyon tarihinden 24-48 saat öncesine kadar ücretsiz iptal edebilirsiniz. Detaylı iptal koşulları rezervasyon sırasında gösterilir.'
  });

  faq.push({
    question: 'Ödeme seçenekleri nelerdir?',
    answer: 'Kredi kartı, banka kartı ile güvenli ödeme yapabilirsiniz. Tüm ödemeler 3D Secure ile korunmaktadır. Ailydian Miles ile de ödeme yapabilirsiniz.'
  });

  return faq;
}

/**
 * Generate tags for categorization
 */
function generateTags(request: ContentRequest): string[] {
  const tags: string[] = [
    request.location,
    request.type,
    'Türkiye'
  ];

  if (request.category) {
    tags.push(request.category);
  }

  // Type-specific tags
  const typeSpecificTags: Record<string, string[]> = {
    hotel: ['konaklama', 'tatil', 'otel rezervasyon'],
    car: ['araç kiralama', 'rent a car', 'ekonomik araç'],
    tour: ['tur', 'gezi', 'aktivite', 'rehberli tur'],
    transfer: ['transfer', 'havalimanı', 'ulaşım'],
    vehicle: ['şoförlü araç', 'vip transfer', 'chauffeur'],
    property: ['kiralık ev', 'villa', 'yazlık', 'apart']
  };

  tags.push(...(typeSpecificTags[request.type] || []));

  return tags;
}

/**
 * Determine content tone based on type and price
 */
function determineTone(request: ContentRequest): 'professional' | 'casual' | 'luxury' | 'family-friendly' {
  if (request.type === 'vehicle' || (request.price && request.price > 5000)) {
    return 'luxury';
  }

  if (request.type === 'property') {
    return 'family-friendly';
  }

  if (request.type === 'tour') {
    return 'casual';
  }

  return 'professional';
}

/**
 * Generate call to action
 */
function generateCallToAction(request: ContentRequest): string {
  const ctas = [
    `${request.name} için hemen rezervasyon yapın ve avantajlı fiyatlardan yararlanın!`,
    `${request.location} tatiliniz için ${request.name}'i tercih edin. Şimdi rezerve edin!`,
    `En uygun fiyatlarla ${request.name} rezervasyonu için tıklayın!`,
    `${request.name} ile unutulmaz bir deneyim için bugün rezervasyon yapın!`,
    `Travel Ailydian'ın bundle pricing sistemi ile ${request.name} + diğer hizmetleri birleştirin, %20 indirim kazanın!`
  ];

  return ctas[Math.floor(Math.random() * ctas.length)];
}

/**
 * Main function: Generate complete AI content
 */
export function generateAIContent(request: ContentRequest): GeneratedContent {
  const title = generateTitle(request);
  const shortDescription = generateShortDescription(request);
  const longDescription = generateLongDescription(request);
  const highlights = generateHighlights(request);
  const { seoTitle, metaDescription, keywords } = generateSEOMetadata(request);
  const faq = generateFAQ(request);
  const tags = generateTags(request);
  const callToAction = generateCallToAction(request);
  const tone = determineTone(request);

  return {
    title,
    shortDescription,
    longDescription,
    highlights,
    seoTitle,
    metaDescription,
    keywords,
    faq,
    tags,
    callToAction,
    tone
  };
}

/**
 * Batch content generation for multiple listings
 */
export function generateBatchContent(requests: ContentRequest[]): GeneratedContent[] {
  return requests.map(request => generateAIContent(request));
}

/**
 * Content quality score (0-100)
 */
export function calculateContentQuality(content: GeneratedContent): {
  score: number;
  feedback: string[];
} {
  let score = 100;
  const feedback: string[] = [];

  // Check title length (optimal: 50-60 chars)
  if (content.title.length < 40) {
    score -= 10;
    feedback.push('Başlık çok kısa, daha açıklayıcı olmalı');
  } else if (content.title.length > 70) {
    score -= 5;
    feedback.push('Başlık biraz uzun, kısaltılabilir');
  }

  // Check meta description length (optimal: 150-160 chars)
  if (content.metaDescription.length < 120) {
    score -= 10;
    feedback.push('Meta açıklama çok kısa');
  } else if (content.metaDescription.length > 170) {
    score -= 5;
    feedback.push('Meta açıklama çok uzun');
  }

  // Check highlights count (optimal: 8-10)
  if (content.highlights.length < 5) {
    score -= 15;
    feedback.push('Daha fazla özellik ekleyin');
  }

  // Check FAQ count (optimal: 4-6)
  if (content.faq.length < 3) {
    score -= 10;
    feedback.push('Daha fazla SSS ekleyin');
  }

  // Check keywords count (optimal: 5-10)
  if (content.keywords.length < 4) {
    score -= 10;
    feedback.push('Daha fazla anahtar kelime ekleyin');
  }

  if (score >= 90) {
    feedback.push('✅ Mükemmel içerik kalitesi!');
  } else if (score >= 70) {
    feedback.push('✅ İyi içerik kalitesi');
  } else {
    feedback.push('⚠️ İçerik iyileştirme gerekiyor');
  }

  return { score, feedback };
}

/**
 * Export content as JSON for database import
 */
export function exportContentJSON(content: GeneratedContent): string {
  return JSON.stringify(content, null, 2);
}

/**
 * Preview content as HTML
 */
export function generateHTMLPreview(content: GeneratedContent): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>${content.seoTitle}</title>
  <meta name="description" content="${content.metaDescription}">
  <meta name="keywords" content="${content.keywords.join(', ')}">
</head>
<body>
  <h1>${content.title}</h1>
  <p><strong>${content.shortDescription}</strong></p>
  <p>${content.longDescription}</p>

  <h2>Özellikler</h2>
  <ul>
    ${content.highlights.map(h => `<li>${h}</li>`).join('\n    ')}
  </ul>

  <h2>Sıkça Sorulan Sorular</h2>
  ${content.faq.map(f => `
  <div>
    <h3>${f.question}</h3>
    <p>${f.answer}</p>
  </div>
  `).join('\n  ')}

  <p><strong>${content.callToAction}</strong></p>
</body>
</html>
  `.trim();
}
