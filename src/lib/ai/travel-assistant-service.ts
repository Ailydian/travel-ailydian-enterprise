/**
 * Travel Assistant Service
 * Main service layer for AI-powered travel assistance
 */

import { getProviderManager } from './provider-manager';
import { getConversationMemory } from './conversation-memory';
import {
  getSystemPrompt,
  buildContextPrompt,
  extractActions,
  generateSuggestions,
} from './prompts/travel-prompts';
import {
  AIMessage,
  AIResponse,
  AIRequestOptions,
  ConversationContext,
  UserPreferences,
  AIRecommendation,
  StreamCallback,
} from './providers/types';
import { RecommendationsEngine } from './recommendations-engine';
import logger from '../logger';

export interface ChatRequest {
  message: string;
  sessionId: string;
  userId?: string;
  locale?: string;
  userPreferences?: UserPreferences;
  stream?: boolean;
}

export interface ChatResponse {
  message: string;
  confidence: number;
  suggestions: string[];
  actions: Array<{
    type: string;
    label: string;
    data: any;
  }>;
  recommendations?: AIRecommendation[];
  sessionId: string;
  metadata: {
    provider: string;
    model: string;
    tokens: number;
    latency: number;
  };
}

export interface ItineraryParams {
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number;
  interests?: string[];
  travelers?: {
    adults: number;
    children: number;
  };
  locale?: string;
}

export interface Itinerary {
  destination: string;
  days: Array<{
    day: number;
    date: string;
    activities: Array<{
      time: string;
      title: string;
      description: string;
      location?: string;
      estimatedCost?: number;
      duration?: string;
    }>;
    accommodation?: {
      name: string;
      type: string;
      price: number;
    };
    meals?: Array<{
      type: 'breakfast' | 'lunch' | 'dinner';
      suggestion: string;
      estimatedCost: number;
    }>;
    totalDayCost: number;
  }>;
  totalCost: number;
  tips: string[];
  whatToPack: string[];
}

export class TravelAssistantService {
  private providerManager = getProviderManager();
  private conversationMemory = getConversationMemory();

  /**
   * Chat with AI assistant
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const startTime = Date.now();

    try {
      // Get or create conversation session
      const session = this.conversationMemory.getOrCreateSession(
        request.sessionId,
        request.userId,
        request.locale || 'en',
        request.userPreferences
      );

      // Build messages with context
      const messages = this.buildMessages(
        request.message,
        session.context,
        request.locale || 'en'
      );

      // Get AI response
      const aiResponse = await this.providerManager.chat(messages, {
        temperature: 0.7,
        maxTokens: 2048,
      });

      // Save user message and AI response to memory
      this.conversationMemory.addMessage(request.sessionId, {
        role: 'user',
        content: request.message,
      });

      this.conversationMemory.addMessage(request.sessionId, {
        role: 'assistant',
        content: aiResponse.content,
      });

      // Extract structured data from response
      const actions = extractActions(aiResponse.content);
      const suggestions = generateSuggestions(
        request.message,
        aiResponse.content,
        session.context
      );

      // Get recommendations if relevant
      const recommendations = await this.getRelevantRecommendations(
        request.message,
        session.context
      );

      const latency = Date.now() - startTime;

      logger.info('Chat request completed', {
        sessionId: request.sessionId,
        latency,
        provider: aiResponse.provider,
        tokens: aiResponse.usage.totalTokens,
      });

      return {
        message: aiResponse.content,
        confidence: this.calculateConfidence(aiResponse),
        suggestions,
        actions,
        recommendations,
        sessionId: request.sessionId,
        metadata: {
          provider: aiResponse.provider,
          model: aiResponse.model,
          tokens: aiResponse.usage.totalTokens,
          latency,
        },
      };
    } catch (error: any) {
      logger.error('Chat request failed', error);

      throw new Error(`AI chat failed: ${error.message}`);
    }
  }

  /**
   * Stream chat response
   */
  async streamChat(
    request: ChatRequest,
    onChunk: StreamCallback
  ): Promise<void> {
    try {
      const session = this.conversationMemory.getOrCreateSession(
        request.sessionId,
        request.userId,
        request.locale || 'en',
        request.userPreferences
      );

      const messages = this.buildMessages(
        request.message,
        session.context,
        request.locale || 'en'
      );

      // Save user message
      this.conversationMemory.addMessage(request.sessionId, {
        role: 'user',
        content: request.message,
      });

      let fullResponse = '';

      await this.providerManager.streamChat(
        messages,
        chunk => {
          fullResponse = chunk.accumulated;
          onChunk(chunk);

          // Save final response when done
          if (chunk.done) {
            this.conversationMemory.addMessage(request.sessionId, {
              role: 'assistant',
              content: fullResponse,
            });
          }
        },
        {
          temperature: 0.7,
          maxTokens: 2048,
        }
      );

      logger.info('Stream chat completed', { sessionId: request.sessionId });
    } catch (error: any) {
      logger.error('Stream chat failed', error);
      throw new Error(`AI streaming failed: ${error.message}`);
    }
  }

  /**
   * Get destination recommendations
   */
  async getRecommendations(preferences: UserPreferences): Promise<AIRecommendation[]> {
    try {
      // Use recommendations engine
      const result = await RecommendationsEngine.getRecommendations(
        'tour',
        { userPreferences: preferences },
        10
      );

      // Convert to AI recommendations format
      return result.items.map((item: any, index: number) => ({
        type: 'destination',
        name: item.name || item.destination,
        score: result.scores[index],
        reason: this.generateRecommendationReason(item, preferences),
        data: item,
      }));
    } catch (error) {
      logger.error('Get recommendations failed', error as Error);
      return [];
    }
  }

  /**
   * Plan itinerary with AI
   */
  async planItinerary(params: ItineraryParams): Promise<Itinerary> {
    try {
      const prompt = this.buildItineraryPrompt(params);

      const messages: AIMessage[] = [
        {
          role: 'system',
          content: getSystemPrompt(params.locale || 'en'),
        },
        {
          role: 'user',
          content: prompt,
        },
      ];

      const response = await this.providerManager.chat(messages, {
        temperature: 0.8,
        maxTokens: 3000,
      });

      // Parse AI response into structured itinerary
      return this.parseItinerary(response.content, params);
    } catch (error) {
      logger.error('Plan itinerary failed', error as Error);
      throw new Error('Failed to generate itinerary');
    }
  }

  /**
   * Answer travel question
   */
  async answerQuestion(
    question: string,
    sessionId: string,
    locale: string = 'en'
  ): Promise<string> {
    try {
      const session = this.conversationMemory.getOrCreateSession(
        sessionId,
        undefined,
        locale
      );

      const messages: AIMessage[] = [
        {
          role: 'system',
          content: getSystemPrompt(locale),
        },
        ...session.context.conversationHistory.slice(-5), // Last 5 messages
        {
          role: 'user',
          content: question,
        },
      ];

      const response = await this.providerManager.chat(messages);

      return response.content;
    } catch (error) {
      logger.error('Answer question failed', error as Error);
      throw new Error('Failed to answer question');
    }
  }

  /**
   * Build messages with context
   */
  private buildMessages(
    userMessage: string,
    context: ConversationContext,
    locale: string
  ): AIMessage[] {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: getSystemPrompt(locale),
      },
    ];

    // Add context if available
    const contextPrompt = buildContextPrompt({
      locale,
      userPreferences: context.userPreferences,
      conversationHistory: context.conversationHistory,
    });

    if (contextPrompt) {
      messages.push({
        role: 'system',
        content: contextPrompt,
      });
    }

    // Add conversation history (last 5 exchanges)
    const recentHistory = context.conversationHistory.slice(-10);
    messages.push(...recentHistory);

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    return messages;
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(response: AIResponse): number {
    // Factors: finish reason, response length, provider reliability
    let confidence = 0.8;

    if (response.finishReason === 'stop') {
      confidence += 0.1;
    }

    if (response.content.length > 100) {
      confidence += 0.05;
    }

    if (response.provider === 'groq') {
      confidence += 0.05; // Primary provider bonus
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * Get relevant recommendations
   */
  private async getRelevantRecommendations(
    message: string,
    context: ConversationContext
  ): Promise<AIRecommendation[] | undefined> {
    const lower = message.toLowerCase();

    // Check if message is asking for recommendations
    if (
      lower.includes('recommend') ||
      lower.includes('suggest') ||
      lower.includes('öner') ||
      lower.includes('best')
    ) {
      if (context.userPreferences) {
        return this.getRecommendations(context.userPreferences);
      }
    }

    return undefined;
  }

  /**
   * Generate recommendation reason
   */
  private generateRecommendationReason(item: any, preferences: UserPreferences): string {
    const reasons: string[] = [];

    if (item.rating >= 4.5) {
      reasons.push('Highly rated');
    }

    if (preferences.budget && item.price) {
      const price = parseFloat(item.price);
      if (price <= preferences.budget.max) {
        reasons.push('Within budget');
      }
    }

    if (preferences.interests) {
      reasons.push('Matches your interests');
    }

    return reasons.join(', ') || 'Popular choice';
  }

  /**
   * Build itinerary planning prompt
   */
  private buildItineraryPrompt(params: ItineraryParams): string {
    const { destination, startDate, endDate, budget, interests, travelers } = params;

    return `Create a detailed travel itinerary for:

**Destination:** ${destination}
**Dates:** ${startDate} to ${endDate}
**Budget:** ${budget ? `${budget} USD` : 'Flexible'}
**Travelers:** ${travelers?.adults || 1} adults, ${travelers?.children || 0} children
**Interests:** ${interests?.join(', ') || 'General sightseeing'}

Please provide:
1. Day-by-day schedule with morning, afternoon, and evening activities
2. Recommended accommodation for each night
3. Meal suggestions with estimated costs
4. Transportation tips
5. Total estimated cost breakdown
6. Packing list
7. Local tips and insider knowledge

Format the response as a structured itinerary.`;
  }

  /**
   * Parse AI itinerary response
   */
  private parseItinerary(aiResponse: string, params: ItineraryParams): Itinerary {
    // This is a simplified parser - in production, use more robust parsing
    // or request structured JSON output from AI

    const days: Itinerary['days'] = [];
    let totalCost = 0;

    // For now, create a basic structure
    // In production, parse the AI response properly

    return {
      destination: params.destination,
      days,
      totalCost,
      tips: [
        'Book attractions in advance',
        'Learn basic local phrases',
        'Check visa requirements',
      ],
      whatToPack: [
        'Comfortable walking shoes',
        'Weather-appropriate clothing',
        'Travel adapter',
        'Essential medications',
      ],
    };
  }

  /**
   * Clear conversation session
   */
  clearSession(sessionId: string): void {
    this.conversationMemory.clearSession(sessionId);
  }

  /**
   * Export conversation
   */
  exportConversation(sessionId: string): any {
    return this.conversationMemory.exportSession(sessionId);
  }
}

// Singleton instance
let travelAssistantInstance: TravelAssistantService | null = null;

export function getTravelAssistant(): TravelAssistantService {
  if (!travelAssistantInstance) {
    travelAssistantInstance = new TravelAssistantService();
  }

  return travelAssistantInstance;
}
