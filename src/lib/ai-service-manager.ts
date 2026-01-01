import OpenAI from 'openai';
import logger from './logger';

// AI service configuration
const AI_CONFIG = {
  openai: {
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: 1000,
    temperature: 0.7,
  },
  rateLimit: {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
  }
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI service interfaces
interface AIRecommendationRequest {
  userId?: string;
  preferences?: {
    budget?: number;
    travelStyle?: 'luxury' | 'budget' | 'mid-range';
    interests?: string[];
    duration?: number;
    destination?: string;
    language?: string;
  };
}

interface AIRecommendationResponse {
  destinations: {
    name: string;
    country: string;
    confidence: number;
    reasons: string[];
    estimatedCost: number;
    bestTimeToVisit: string;
    activities: string[];
    aiInsights: string;
  }[];
  personalizedMessage: string;
  totalConfidence: number;
}

class AIServiceManager {
  // AI-powered travel recommendations
  static async generateRecommendations(
    request: AIRecommendationRequest
  ): Promise<AIRecommendationResponse> {
    try {
      const prompt = this.buildRecommendationPrompt(request);
      
      const completion = await openai.chat.completions.create({
        model: AI_CONFIG.openai.model,
        messages: [
          {
            role: 'system',
            content: 'Sen Holiday.AILYDIAN\'ın uzman seyahat AI asistanısın. Blockchain tabanlı ödemeler, VR turlar ve sürdürülebilir turizm konularında uzmanısın.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: AI_CONFIG.openai.maxTokens,
        temperature: AI_CONFIG.openai.temperature,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content || '{}');
      return response;
    } catch (error) {
      logger.error('AI recommendation generation failed:', error as Error, { component: 'AiServiceManager' });
      throw new Error('AI recommendation generation failed');
    }
  }

  // Private helper methods
  private static buildRecommendationPrompt(request: AIRecommendationRequest): string {
    const { preferences = {} } = request;
    
    return `Generate personalized travel recommendations based on:

Preferences:
- Budget: ${preferences.budget || 'Not specified'}
- Travel Style: ${preferences.travelStyle || 'Not specified'}
- Interests: ${preferences.interests?.join(', ') || 'Not specified'}
- Duration: ${preferences.duration || 'Not specified'} days
- Language: ${preferences.language || 'Turkish'}

Provide 5 destination recommendations with detailed reasons, cost estimates, and AI insights.`;
  }

  // Health check for AI services
  static async healthCheck(): Promise<{
    openai: boolean;
    overallHealth: 'healthy' | 'degraded' | 'unhealthy';
  }> {
    const health: {
      openai: boolean;
      overallHealth: 'healthy' | 'degraded' | 'unhealthy';
    } = {
      openai: false,
      overallHealth: 'unhealthy'
    };

    try {
      // Test OpenAI connection
      await openai.chat.completions.create({
        model: process.env.OPENAI_FALLBACK_MODEL || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 5
      });
      health.openai = true;
      health.overallHealth = 'healthy';
    } catch (error) {
      logger.error('OpenAI health check failed:', error as Error, { component: 'AiServiceManager' });
    }

    return health;
  }
}

export default AIServiceManager;
export type { AIRecommendationRequest, AIRecommendationResponse };
