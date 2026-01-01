/**
 * AI Chat API Endpoint
 * Real-time AI travel assistant powered by Groq/OpenAI/Claude
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelAssistantService } from '../../../lib/ai/travel-assistant-service';
import logger from '../../../lib/logger';

// Rate limiting (simple in-memory, use Redis in production)
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

interface ChatRequest {
  message: string;
  sessionId?: string;
  userId?: string;
  locale?: string;
  userPreferences?: {
    budget?: { min: number; max: number; currency: string };
    travelDates?: { start: string; end: string };
    travelers?: { adults: number; children: number; infants: number };
    interests?: string[];
    language?: string;
  };
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

interface ChatResponse {
  success: boolean;
  message?: string;
  recommendations?: unknown[];
  itinerary?: unknown;
  metadata?: {
    provider: string;
    model: string;
    tokensUsed?: number;
    confidence?: number;
  };
  error?: string;
  sessionId?: string;
}

/**
 * Check rate limit
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimits.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (limit.count >= RATE_LIMIT) {
    return false;
  }

  limit.count++;
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    const {
      message,
      sessionId,
      userId,
      locale = 'en',
      userPreferences,
      conversationHistory = [],
    }: ChatRequest = req.body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string.',
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message too long. Maximum 2000 characters.',
      });
    }

    // Rate limiting
    const rateLimitKey = userId || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(rateLimitKey)) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again in a minute.',
      });
    }

    // Log request
    logger.info('AI chat request', {
      sessionId,
      userId,
      messageLength: message.length,
      locale,
    });

    // Initialize AI service
    const aiService = new TravelAssistantService();

    // Build context
    const context = {
      sessionId: sessionId || `session-${Date.now()}`,
      userId,
      conversationHistory: conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(),
      })),
      userPreferences: userPreferences
        ? {
            ...userPreferences,
            travelDates: userPreferences.travelDates
              ? {
                  start: new Date(userPreferences.travelDates.start),
                  end: new Date(userPreferences.travelDates.end),
                }
              : undefined,
            language: locale,
          }
        : { language: locale },
    };

    // Get AI response
    const aiResponse = await aiService.chat(message, context);

    // Log response
    logger.info('AI chat response', {
      sessionId: context.sessionId,
      provider: aiResponse.metadata?.provider,
      tokensUsed: aiResponse.metadata?.tokensUsed,
    });

    // Return response
    return res.status(200).json({
      success: true,
      message: aiResponse.message,
      recommendations: aiResponse.recommendations,
      itinerary: aiResponse.itinerary,
      metadata: aiResponse.metadata,
      sessionId: context.sessionId,
    });
  } catch (error) {
    logger.error('AI chat error', { error });

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return res.status(500).json({
      success: false,
      error: errorMessage,
      message:
        "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
    });
  }
}
