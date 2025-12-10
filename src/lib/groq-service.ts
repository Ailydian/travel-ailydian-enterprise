/**
 * Groq AI Service
 * Ultra-fast AI inference using Groq's LPU (Language Processing Unit)
 * Models: llama-3.3-70b-versatile, mixtral-8x7b-32768, gemma2-9b-it
 */

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqChatOptions {
  model?: 'llama-3.3-70b-versatile' | 'llama-3.1-8b-instant' | 'mixtral-8x7b-32768' | 'gemma2-9b-it';
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

/**
 * Send chat completion request to Groq
 */
export async function groqChat(
  messages: GroqChatMessage[],
  options: GroqChatOptions = {}
): Promise<string> {
  try {
    const {
      model = 'llama-3.3-70b-versatile',
      temperature = 0.7,
      maxTokens = 1024,
    } = options;

    const completion = await groq.chat.completions.create({
      messages,
      model,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq AI Error:', error);
    throw new Error('AI servisi şu anda kullanılamıyor');
  }
}

/**
 * Travel Assistant - Seyahat önerileri ve bilgileri
 */
export async function travelAssistant(userMessage: string): Promise<string> {
  const messages: GroqChatMessage[] = [
    {
      role: 'system',
      content: `Sen Travel.Ailydian'ın AI seyahat asistanısın. Türkiye ve dünya genelinde seyahat, tur, otel, uçak bileti ve havalimanı transferi konularında uzman bir asistansın.

Görevlerin:
- Destinasyon önerileri sunmak
- Otel, tur ve aktivite önerileri vermek
- Havalimanı transfer bilgileri sağlamak
- Fiyat ve sezon bilgileri paylaşmak
- Seyahat ipuçları vermek

Özellikle Antalya ve Alanya bölgesindeki havalimanı transferleri konusunda detaylı bilgi verebilirsin.

Her zaman yardımsever, samimi ve profesyonel ol. Cevaplarını kısa ve öz tut (max 150 kelime).`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];

  return await groqChat(messages, {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    maxTokens: 512,
  });
}

/**
 * Airport Transfer Assistant - Havalimanı transfer önerileri
 */
export async function transferAssistant(query: string): Promise<{
  recommendation: string;
  suggestedVehicle: string;
  estimatedPrice: string;
}> {
  const messages: GroqChatMessage[] = [
    {
      role: 'system',
      content: `Sen havalimanı transfer uzmanısın. Antalya ve Alanya bölgesindeki transferler konusunda uzmansın.

Araç tipleri:
- SEDAN (1-3 kişi): Ekonomik, standart ve VIP seçenekler
- VAN (4-8 kişi): Aile ve grup transferleri, VIP seçeneği
- MINIBUS (9-14 kişi): Büyük gruplar için
- BUS (15+ kişi): Toplu transferler

VIP özellikleri: Lüks araç, meet & greet, su ikramı, Wi-Fi, profesyonel şoför

Kullanıcının ihtiyacına göre en uygun aracı öner ve tahmini fiyat aralığı ver (TRY).`,
    },
    {
      role: 'user',
      content: query,
    },
  ];

  const response = await groqChat(messages, {
    model: 'llama-3.1-8b-instant', // Faster model for recommendations
    temperature: 0.5,
    maxTokens: 256,
  });

  // Parse response (basit parsing, gerçek uygulamada structured output kullanın)
  return {
    recommendation: response,
    suggestedVehicle: 'VAN', // AI yanıtından parse edilebilir
    estimatedPrice: '800-1200 TRY', // AI yanıtından parse edilebilir
  };
}

/**
 * Destination Recommendation - Destinasyon önerileri
 */
export async function recommendDestination(
  preferences: {
    budget?: string;
    interests?: string[];
    travelStyle?: string;
    season?: string;
  }
): Promise<string[]> {
  const preferencesText = Object.entries(preferences)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n');

  const messages: GroqChatMessage[] = [
    {
      role: 'system',
      content: `Sen bir destinasyon öneri uzmanısın. Kullanıcının tercihlerine göre en uygun 5 destinasyon öner.

Yanıtını sadece destinasyon isimleri olarak ver, her satıra bir destinasyon. Açıklama ekleme.`,
    },
    {
      role: 'user',
      content: `Tercihlerim:\n${preferencesText}\n\nBana 5 destinasyon öner.`,
    },
  ];

  const response = await groqChat(messages, {
    model: 'llama-3.1-8b-instant',
    temperature: 0.6,
    maxTokens: 128,
  });

  return response.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
}

/**
 * Review Sentiment Analysis - Yorum duygu analizi
 */
export async function analyzeReviewSentiment(reviewText: string): Promise<{
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  summary: string;
}> {
  const messages: GroqChatMessage[] = [
    {
      role: 'system',
      content: `Sen bir duygu analizi uzmanısın. Verilen yorumun duygusunu analiz et ve şu formatta yanıt ver:

SENTIMENT: positive/neutral/negative
SCORE: 0-100 arası puan
SUMMARY: Kısa özet (max 50 kelime)`,
    },
    {
      role: 'user',
      content: `Yorumu analiz et: ${reviewText}`,
    },
  ];

  const response = await groqChat(messages, {
    model: 'gemma2-9b-it',
    temperature: 0.3,
    maxTokens: 200,
  });

  // Parse response
  const lines = response.split('\n');
  const sentiment = lines.find(l => l.startsWith('SENTIMENT:'))?.split(':')[1].trim() as any || 'neutral';
  const score = parseInt(lines.find(l => l.startsWith('SCORE:'))?.split(':')[1].trim() || '50');
  const summary = lines.find(l => l.startsWith('SUMMARY:'))?.split(':')[1].trim() || '';

  return { sentiment, score, summary };
}

/**
 * Smart Search Query Enhancement - Arama sorgusunu iyileştir
 */
export async function enhanceSearchQuery(query: string): Promise<{
  enhancedQuery: string;
  suggestions: string[];
  intent: string;
}> {
  const messages: GroqChatMessage[] = [
    {
      role: 'system',
      content: `Sen bir arama motoru optimizasyon uzmanısın. Kullanıcının arama sorgusunu analiz et ve iyileştir.

Yanıt formatı:
ENHANCED: İyileştirilmiş sorgu
SUGGESTIONS: Virgülle ayrılmış 3 öneri
INTENT: Kullanıcının amacı (hotel/flight/activity/transfer)`,
    },
    {
      role: 'user',
      content: `Aramayı analiz et: ${query}`,
    },
  ];

  const response = await groqChat(messages, {
    model: 'llama-3.1-8b-instant',
    temperature: 0.4,
    maxTokens: 256,
  });

  const lines = response.split('\n');
  const enhancedQuery = lines.find(l => l.startsWith('ENHANCED:'))?.split(':')[1].trim() || query;
  const suggestionsText = lines.find(l => l.startsWith('SUGGESTIONS:'))?.split(':')[1].trim() || '';
  const intent = lines.find(l => l.startsWith('INTENT:'))?.split(':')[1].trim() || 'general';

  return {
    enhancedQuery,
    suggestions: suggestionsText.split(',').map(s => s.trim()).filter(Boolean),
    intent,
  };
}

/**
 * Streaming chat (for real-time responses)
 */
export async function* groqChatStream(
  messages: GroqChatMessage[],
  options: GroqChatOptions = {}
): AsyncGenerator<string, void, unknown> {
  try {
    const {
      model = 'llama-3.3-70b-versatile',
      temperature = 0.7,
      maxTokens = 1024,
    } = options;

    const stream = await groq.chat.completions.create({
      messages,
      model,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('Groq Streaming Error:', error);
    throw new Error('AI streaming servisi kullanılamıyor');
  }
}

export default {
  groqChat,
  travelAssistant,
  transferAssistant,
  recommendDestination,
  analyzeReviewSentiment,
  enhanceSearchQuery,
  groqChatStream,
};
