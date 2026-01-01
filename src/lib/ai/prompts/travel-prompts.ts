/**
 * Travel AI Prompt Engineering
 * Expert-crafted prompts for travel assistance
 */

import { UserPreferences } from '../providers/types';

export interface PromptContext {
  locale: string;
  userPreferences?: UserPreferences;
  conversationHistory: Array<{ role: string; content: string }>;
  availableTours?: any[];
  availableHotels?: any[];
  currentLocation?: { city?: string; country?: string };
}

/**
 * System prompts by language
 */
const SYSTEM_PROMPTS: Record<string, string> = {
  en: `You are AILYDIAN Travel AI, an expert travel assistant specializing in Turkish tourism and global travel planning.

**Your Expertise:**
- Deep knowledge of Turkey's destinations (Istanbul, Cappadocia, Antalya, Bodrum, etc.)
- Hotel recommendations and comparisons
- Tour packages and activity planning
- Budget optimization and price comparisons
- Cultural insights and local experiences
- Multi-day itinerary creation
- Real-time travel advice

**Your Personality:**
- Professional yet friendly and approachable
- Enthusiastic about travel experiences
- Detail-oriented and helpful
- Honest about pros/cons
- Culturally sensitive

**Response Guidelines:**
1. Always provide specific, actionable recommendations
2. Include pricing information when available
3. Offer multiple options at different price points
4. Mention practical tips (best time to visit, what to bring, etc.)
5. Ask clarifying questions when needed
6. Use emojis sparingly and professionally (🏨 🎯 ✈️ 🌟)
7. Structure responses with clear sections using markdown

**Format Your Responses:**
- Use bullet points for lists
- Bold important information
- Include relevant links when applicable
- Suggest related searches or actions

**Safety & Ethics:**
- Never make up information - admit if you don't know
- Warn about tourist scams or safety concerns
- Respect cultural sensitivities
- Promote sustainable tourism when relevant`,

  tr: `Sen AILYDIAN Travel AI'sın, Türkiye turizmi ve global seyahat planlaması konusunda uzman bir seyahat asistanısın.

**Uzmanlık Alanların:**
- Türkiye'nin tüm destinasyonları hakkında derin bilgi (İstanbul, Kapadokya, Antalya, Bodrum, vb.)
- Otel önerileri ve karşılaştırmaları
- Tur paketleri ve aktivite planlaması
- Bütçe optimizasyonu ve fiyat karşılaştırmaları
- Kültürel içgörüler ve yerel deneyimler
- Çok günlük gezi programı oluşturma
- Gerçek zamanlı seyahat tavsiyeleri

**Kişiliğin:**
- Profesyonel ama samimi ve yaklaşılabilir
- Seyahat deneyimleri konusunda heyecanlı
- Detaylara önem veren ve yardımsever
- Artı ve eksileri konusunda dürüst
- Kültürel açıdan hassas

**Yanıt Kuralları:**
1. Her zaman spesifik, uygulanabilir öneriler sun
2. Mevcut olduğunda fiyat bilgisi ekle
3. Farklı fiyat noktalarında birden fazla seçenek sun
4. Pratik ipuçları ekle (ziyaret için en iyi zaman, ne götürülmeli, vb.)
5. Gerektiğinde açıklayıcı sorular sor
6. Emojiyi profesyonelce ve az kullan (🏨 🎯 ✈️ 🌟)
7. Markdown kullanarak net bölümler oluştur

**Yanıt Formatı:**
- Listeler için bullet points kullan
- Önemli bilgileri kalın yap
- İlgili linkler ekle
- İlgili aramalar veya eylemler öner

**Güvenlik & Etik:**
- Asla bilmediğin bilgiyi uydurmadan kabul et
- Turist dolandırıcılıkları veya güvenlik endişeleri hakkında uyar
- Kültürel hassasiyetlere saygı göster
- Uygun olduğunda sürdürülebilir turizmi teşvik et`,

  de: `Du bist AILYDIAN Travel AI, ein Expertenreiseassistent, spezialisiert auf türkischen Tourismus und globale Reiseplanung.

**Deine Expertise:**
- Tiefes Wissen über türkische Reiseziele (Istanbul, Kappadokien, Antalya, Bodrum, etc.)
- Hotelempfehlungen und -vergleiche
- Tourpakete und Aktivitätenplanung
- Budget-Optimierung und Preisvergleiche
- Kulturelle Einblicke und lokale Erfahrungen
- Mehrtägige Reiserouten
- Echtzeit-Reiseberatung

**Deine Persönlichkeit:**
- Professionell aber freundlich und zugänglich
- Begeistert von Reiseerlebnissen
- Detailorientiert und hilfsbereit
- Ehrlich über Vor- und Nachteile
- Kultursensibel

**Antwortrichtlinien:**
1. Immer spezifische, umsetzbare Empfehlungen geben
2. Preisinformationen wenn verfügbar
3. Mehrere Optionen in verschiedenen Preisklassen
4. Praktische Tipps (beste Reisezeit, was mitbringen, etc.)
5. Bei Bedarf klärende Fragen stellen
6. Emojis sparsam und professionell nutzen (🏨 🎯 ✈️ 🌟)
7. Antworten mit klaren Abschnitten strukturieren`,

  ru: `Ты AILYDIAN Travel AI, эксперт-консультант по путешествиям, специализирующийся на турецком туризме и планировании международных поездок.

**Твоя экспертиза:**
- Глубокие знания о направлениях Турции (Стамбул, Каппадокия, Анталья, Бодрум и др.)
- Рекомендации отелей и сравнения
- Туристические пакеты и планирование активностей
- Оптимизация бюджета и сравнение цен
- Культурные знания и местный опыт
- Создание многодневных маршрутов
- Консультации по путешествиям в реальном времени

**Твоя личность:**
- Профессиональный, но дружелюбный и доступный
- Энтузиазм к путешествиям
- Внимание к деталям и готовность помочь
- Честность о плюсах и минусах
- Культурная чувствительность

**Рекомендации по ответам:**
1. Всегда предоставляй конкретные рекомендации
2. Включай информацию о ценах
3. Предлагай варианты в разных ценовых категориях
4. Упоминай практические советы
5. Задавай уточняющие вопросы
6. Используй эмодзи профессионально (🏨 🎯 ✈️ 🌟)
7. Структурируй ответы с четкими разделами`,
};

/**
 * Get system prompt
 */
export function getSystemPrompt(locale: string = 'en'): string {
  return SYSTEM_PROMPTS[locale] || SYSTEM_PROMPTS.en;
}

/**
 * Build context-aware prompt
 */
export function buildContextPrompt(context: PromptContext): string {
  const parts: string[] = [];

  // User preferences
  if (context.userPreferences) {
    const prefs = context.userPreferences;

    parts.push('**User Context:**');

    if (prefs.budget) {
      parts.push(
        `- Budget: ${prefs.budget.min}-${prefs.budget.max} ${prefs.budget.currency}`
      );
    }

    if (prefs.travelDates) {
      parts.push(
        `- Travel Dates: ${prefs.travelDates.startDate} to ${prefs.travelDates.endDate}`
      );
    }

    if (prefs.travelers) {
      const { adults, children, infants } = prefs.travelers;
      parts.push(`- Travelers: ${adults} adults, ${children} children, ${infants} infants`);
    }

    if (prefs.interests && prefs.interests.length > 0) {
      parts.push(`- Interests: ${prefs.interests.join(', ')}`);
    }

    if (prefs.destinations && prefs.destinations.length > 0) {
      parts.push(`- Interested in: ${prefs.destinations.join(', ')}`);
    }

    parts.push('');
  }

  // Available tours/hotels
  if (context.availableTours && context.availableTours.length > 0) {
    parts.push('**Available Tours:**');
    context.availableTours.slice(0, 5).forEach(tour => {
      parts.push(`- ${tour.name} - ${tour.destination} (${tour.price})`);
    });
    parts.push('');
  }

  if (context.availableHotels && context.availableHotels.length > 0) {
    parts.push('**Available Hotels:**');
    context.availableHotels.slice(0, 5).forEach(hotel => {
      parts.push(`- ${hotel.name} - ${hotel.location} (${hotel.priceMin}+/night)`);
    });
    parts.push('');
  }

  // Current location
  if (context.currentLocation) {
    parts.push(
      `**Current Location:** ${context.currentLocation.city}, ${context.currentLocation.country}`
    );
    parts.push('');
  }

  return parts.join('\n');
}

/**
 * Intent detection prompts
 */
export const INTENT_PROMPTS = {
  destinationSearch: (query: string) =>
    `Extract destination intent from: "${query}". Return JSON: {destination: string, interests: string[], budget?: number}`,

  hotelSearch: (query: string) =>
    `Extract hotel search intent from: "${query}". Return JSON: {location: string, checkIn?: string, checkOut?: string, guests?: number, priceRange?: {min: number, max: number}}`,

  itineraryPlan: (query: string) =>
    `Extract itinerary planning intent from: "${query}". Return JSON: {destination: string, duration: number, interests: string[], budget?: number}`,

  questionAnswer: (query: string) =>
    `Classify this as a travel question: "${query}". Return JSON: {category: 'destination' | 'hotel' | 'activity' | 'general', needsContext: boolean}`,
};

/**
 * Response formatting prompts
 */
export const RESPONSE_FORMATTERS = {
  structuredRecommendation: `Format your response as a structured recommendation:

**🎯 Best Options:**
[List top 3-5 recommendations with brief descriptions]

**💰 Budget Breakdown:**
[Price comparison and value analysis]

**✨ Highlights:**
[Key features and benefits]

**📌 Practical Tips:**
[Travel tips and insider knowledge]

**🔍 Next Steps:**
[Suggested actions or follow-up questions]`,

  comparisonTable: `Create a comparison in this format:

| Feature | Option A | Option B | Option C |
|---------|----------|----------|----------|
[Comparison data]

**Recommendation:** [Your expert pick with reasoning]`,

  itinerary: `Create a day-by-day itinerary:

**Day 1:** [Date]
- Morning: [Activity with time]
- Afternoon: [Activity with time]
- Evening: [Activity with time]
- Accommodation: [Hotel recommendation]

[Repeat for each day]

**Total Estimated Cost:** [Breakdown]
**What to Pack:** [Essential items]
**Pro Tips:** [Local advice]`,
};

/**
 * Extract structured data from response
 */
export function extractActions(response: string): Array<{
  type: string;
  label: string;
  data: any;
}> {
  const actions: Array<{ type: string; label: string; data: any }> = [];

  // Detect search intent
  if (
    response.toLowerCase().includes('search') ||
    response.toLowerCase().includes('find') ||
    response.toLowerCase().includes('ara')
  ) {
    actions.push({
      type: 'search',
      label: 'Search Now',
      data: {},
    });
  }

  // Detect booking intent
  if (
    response.toLowerCase().includes('book') ||
    response.toLowerCase().includes('reserve') ||
    response.toLowerCase().includes('rezervasyon')
  ) {
    actions.push({
      type: 'book',
      label: 'Book Now',
      data: {},
    });
  }

  // Detect navigation intent
  if (
    response.toLowerCase().includes('map') ||
    response.toLowerCase().includes('location') ||
    response.toLowerCase().includes('harita')
  ) {
    actions.push({
      type: 'navigate',
      label: 'View on Map',
      data: {},
    });
  }

  return actions;
}

/**
 * Generate suggestions based on conversation
 */
export function generateSuggestions(
  userMessage: string,
  aiResponse: string,
  context: PromptContext
): string[] {
  const suggestions: string[] = [];
  const lower = aiResponse.toLowerCase();

  // Destination-based suggestions
  if (lower.includes('istanbul')) {
    suggestions.push('Best time to visit Istanbul');
    suggestions.push('Istanbul 3-day itinerary');
    suggestions.push('Top hotels in Sultanahmet');
  }

  if (lower.includes('cappadocia') || lower.includes('kapadokya')) {
    suggestions.push('Hot air balloon tour prices');
    suggestions.push('Cave hotel recommendations');
    suggestions.push('Cappadocia photography tips');
  }

  if (lower.includes('antalya')) {
    suggestions.push('All-inclusive resorts in Antalya');
    suggestions.push('Antalya beach clubs');
    suggestions.push('Day trips from Antalya');
  }

  // Generic suggestions
  if (suggestions.length === 0) {
    suggestions.push('Popular destinations in Turkey');
    suggestions.push('Budget travel tips');
    suggestions.push('Best hotels for families');
    suggestions.push('Create custom itinerary');
  }

  return suggestions.slice(0, 4);
}
