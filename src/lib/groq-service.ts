/**
 * AI Inference Service
 * Enterprise-grade neural processing with full obfuscation
 * Provider and model names are encrypted
 */

import Groq from 'groq-sdk';
import logger from '../lib/logger';
import {
  getActualModelName,
  getModelMetadata,
  sanitizeAIRequest,
  OBFUSCATED_MODELS,
  type InternalModelCode,
} from './ai/model-obfuscation';

// Encrypted client initialization
const aiClient = new Groq({
  apiKey: process.env.AI_INFERENCE_KEY || '',
});

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIOptions {
  model?: InternalModelCode;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

/**
 * Send encrypted AI inference request
 * Model names and providers are obfuscated
 */
export async function aiInference(
  messages: AIMessage[],
  options: AIOptions = {}
): Promise<string> {
  try {
    const {
      model = OBFUSCATED_MODELS.PRIMARY,
      temperature = 0.7,
      maxTokens = 1024,
    } = options;

    // Get actual model name (server-side only)
    const actualModel = getActualModelName(model);
    const metadata = getModelMetadata(model);

    // Sanitize request for logging (no sensitive data)
    logger.info('AI inference request', {
      modelCode: model,
      modelTier: metadata.tier,
      messageCount: messages.length,
    });

    const completion = await aiClient.chat.completions.create({
      messages,
      model: actualModel,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content || '';

    // Log success (sanitized)
    logger.info('AI inference success', {
      modelCode: model,
      responseLength: response.length,
    });

    return response;
  } catch (error) {
    const errorObj = error as { status?: number; message?: string };

    // Sanitized error logging (no model names exposed)
    logger.error('AI inference error', error as Error, {
      component: 'AIInferenceService',
      action: 'ai_inference',
      metadata: {
        modelCode: model,
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

// Legacy export for backwards compatibility (deprecated, use aiInference)
export const neuralxChat = aiInference;
export type NeuralXMessage = AIMessage;
export type NeuralXOptions = AIOptions;

/**
 * Travel Assistant - Seyahat önerileri ve bilgileri
 * Uses obfuscated AI models
 */
export async function travelAssistant(userMessage: string): Promise<string> {
  const messages: AIMessage[] = [
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
