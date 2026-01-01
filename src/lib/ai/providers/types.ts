/**
 * AI Provider Types and Interfaces
 * Type-safe abstraction for multiple AI providers
 */

export enum AIProvider {
  GROQ = 'groq',
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
}

export enum AIModel {
  // Groq Models
  GROQ_LLAMA_70B = 'llama-3.3-70b-versatile',
  GROQ_LLAMA_8B = 'llama-3.1-8b-instant',

  // OpenAI Models
  OPENAI_GPT4_TURBO = 'gpt-4-turbo-preview',
  OPENAI_GPT4 = 'gpt-4',
  OPENAI_GPT35_TURBO = 'gpt-3.5-turbo',

  // Anthropic Models
  ANTHROPIC_CLAUDE_3_OPUS = 'claude-3-opus-20240229',
  ANTHROPIC_CLAUDE_3_SONNET = 'claude-3-sonnet-20240229',
  ANTHROPIC_CLAUDE_3_HAIKU = 'claude-3-haiku-20240307',
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export interface AIRequestOptions {
  model?: AIModel;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stream?: boolean;
  stop?: string[];
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  finishReason: 'stop' | 'length' | 'content_filter' | 'error';
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata?: {
    confidence?: number;
    suggestions?: string[];
    actions?: AIAction[];
    recommendations?: AIRecommendation[];
  };
}

export interface AIAction {
  type: 'search' | 'book' | 'navigate' | 'filter' | 'compare';
  label: string;
  data: Record<string, any>;
}

export interface AIRecommendation {
  type: 'destination' | 'hotel' | 'tour' | 'activity' | 'restaurant';
  name: string;
  score: number;
  reason: string;
  data?: Record<string, any>;
}

export interface ConversationContext {
  userId?: string;
  sessionId: string;
  locale: string;
  timezone?: string;
  userPreferences?: UserPreferences;
  conversationHistory: AIMessage[];
  metadata?: Record<string, any>;
}

export interface UserPreferences {
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  travelDates?: {
    startDate: string;
    endDate: string;
    flexible?: boolean;
  };
  travelers?: {
    adults: number;
    children: number;
    infants: number;
  };
  interests?: string[];
  destinations?: string[];
  language?: string;
  previousBookings?: string[];
  searchHistory?: string[];
}

export interface AIProviderConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  defaultModel: AIModel;
  fallbackModel?: AIModel;
}

export interface AIError extends Error {
  provider: AIProvider;
  statusCode?: number;
  retryable: boolean;
  originalError?: Error;
}

export interface ProviderHealthCheck {
  provider: AIProvider;
  healthy: boolean;
  latency?: number;
  lastChecked: Date;
  errorCount: number;
}

export interface StreamChunk {
  delta: string;
  accumulated: string;
  done: boolean;
}

export type StreamCallback = (chunk: StreamChunk) => void;
