/**
 * NeuralX AI Service
 * Ultra-fast AI inference service
 * Enterprise-grade neural processing
 */

import Groq from 'groq-sdk';
import logger from '../lib/logger';

// Model mapping for obfuscation
const MODEL_MAP = {
  'nx-primary-v3': process.env.GROQ_PRIMARY_MODEL || 'llama-3.3-70b-versatile',
  'nx-fast-v1': process.env.GROQ_FAST_MODEL || 'llama-3.1-8b-instant',
  'nx-hybrid-v2': 'mixtral-8x7b-32768',
  'nx-lite-v2': 'gemma2-9b-it',
};

const neuralx = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export interface NeuralXMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface NeuralXOptions {
  model?: 'nx-primary-v3' | 'nx-fast-v1' | 'nx-hybrid-v2' | 'nx-lite-v2';
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

/**
 * Send chat completion request to NeuralX
 */
export async function neuralxChat(
  messages: NeuralXMessage[],
  options: NeuralXOptions = {}
): Promise<string> {
  try {
    const {
      model = 'nx-primary-v3',
      temperature = 0.7,
      maxTokens = 1024,
    } = options;

    const actualModel = MODEL_MAP[model] || MODEL_MAP['nx-primary-v3'];

    const completion = await neuralx.chat.completions.create({
      messages,
      model: actualModel,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    const errorObj = error as { status?: number; message?: string };

    logger.error('NeuralX AI Error', error as Error, {
      component: 'GroqService',
      action: 'neuralx_chat',
      metadata: {
        model: actualModel,
        status: errorObj.status,
        messageCount: messages.length
      }
    });

    // Handle rate limit errors specifically
    if (errorObj?.status === 429 || errorObj?.message?.includes('rate limit')) {
      throw new Error('AI servisi meşgul. Lütfen birkaç saniye bekleyip tekrar deneyin.');
    }

    // Handle API key errors
    if (errorObj?.status === 401) {
      throw new Error('AI servisi yapılandırma hatası');
    }

    throw new Error('AI servisi şu anda kullanılamıyor');
  }
}

/**
 * Travel Assistant - Seyahat önerileri ve bilgileri
 */
export async function travelAssistant(userMessage: string): Promise<string> {
  const messages: NeuralXMessage[] = [
    {
      role: 'system',
      content: `Sen Travel.LyDian'ın AI seyahat asistanısın. Türkiye ve dünya genelinde seyahat, tur, otel, uçak bileti ve havalimanı transferi konularında uzman bir asistansın.

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

  return await neuralxChat(messages, {
    model: 'nx-primary-v3',
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
  const messages: NeuralXMessage[] = [
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

  const response = await neuralxChat(messages, {
    model: 'nx-fast-v1',
    temperature: 0.5,
    maxTokens: 256,
  });

  return {
    recommendation: response,
    suggestedVehicle: 'VAN',
    estimatedPrice: '800-1200 TRY',
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

  const messages: NeuralXMessage[] = [
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

  const response = await neuralxChat(messages, {
    model: 'nx-fast-v1',
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
  const messages: NeuralXMessage[] = [
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

  const response = await neuralxChat(messages, {
    model: 'nx-lite-v2',
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
  const messages: NeuralXMessage[] = [
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

  const response = await neuralxChat(messages, {
    model: 'nx-fast-v1',
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
export async function* neuralxChatStream(
  messages: NeuralXMessage[],
  options: NeuralXOptions = {}
): AsyncGenerator<string, void, unknown> {
  try {
    const {
      model = 'nx-primary-v3',
      temperature = 0.7,
      maxTokens = 1024,
    } = options;

    const actualModel = MODEL_MAP[model] || MODEL_MAP['nx-primary-v3'];

    const stream = await neuralx.chat.completions.create({
      messages,
      model: actualModel,
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
    const errorObj = error as { status?: number; message?: string };

    logger.error('NeuralX Streaming Error', error as Error, {
      component: 'GroqService',
      action: 'neuralx_chat_stream',
      metadata: {
        model: options.model,
        messageCount: messages.length,
        status: errorObj.status
      }
    });

    // Handle rate limit errors specifically
    if (errorObj?.status === 429 || errorObj?.message?.includes('rate limit')) {
      throw new Error('AI servisi meşgul. Lütfen birkaç saniye bekleyip tekrar deneyin.');
    }

    throw new Error('AI streaming servisi kullanılamıyor');
  }
}

// Legacy exports for backwards compatibility
export const groqChat = neuralxChat;
export const groqChatStream = neuralxChatStream;
export type GroqChatMessage = NeuralXMessage;
export type GroqChatOptions = NeuralXOptions;

export default {
  neuralxChat,
  travelAssistant,
  transferAssistant,
  recommendDestination,
  analyzeReviewSentiment,
  enhanceSearchQuery,
  neuralxChatStream,
  // Legacy
  groqChat,
  groqChatStream,
};
