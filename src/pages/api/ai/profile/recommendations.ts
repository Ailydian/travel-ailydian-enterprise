/**
 * AI Profile Recommendations API
 * Provides personalized travel recommendations based on user's Travel DNA profile
 * Part of Phase 1: AI-Powered Super Personalization
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { neuralxChat } from '@/lib/groq-service';
import { prisma } from '@/lib/prisma';
import logger from '../../../../lib/logger';

interface RecommendationRequest {
  mood?: 'relaxing' | 'adventurous' | 'cultural' | 'romantic';
  budget?: {
    min?: number;
    max?: number;
  };
  duration?: number; // days
  startDate?: string;
  travelWith?: 'solo' | 'couple' | 'family' | 'friends';
  mustHave?: string[]; // required features
  dealBreakers?: string[]; // things to avoid
}

interface Recommendation {
  destination: string;
  country: string;
  reason: string;
  matchScore: number; // 0-100
  estimatedBudget: {
    min: number;
    max: number;
    currency: string;
  };
  bestTimeToVisit: string[];
  highlights: string[];
  accommodationSuggestions: Array<{
    name: string;
    type: string;
    priceRange: string;
  }>;
  activities: Array<{
    name: string;
    category: string;
    duration: string;
    price: string;
  }>;
  localTips: string[];
  weatherInfo: string;
  crowdLevel: 'low' | 'moderate' | 'high';
  safetyScore: number; // 0-100
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user with travel profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        travelProfile: true,
        profileAnalyzedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.travelProfile) {
      return res.status(400).json({
        error: 'Travel profile not found',
        message: 'Please complete profile analysis first at /api/ai/profile/analyze',
      });
    }

    // Parse query parameters
    const requestParams: RecommendationRequest = {
      mood: (req.query.mood as any) || 'adventurous',
      budget: {
        min: req.query.budgetMin ? parseInt(req.query.budgetMin as string) : undefined,
        max: req.query.budgetMax ? parseInt(req.query.budgetMax as string) : undefined,
      },
      duration: req.query.duration ? parseInt(req.query.duration as string) : 7,
      startDate: req.query.startDate as string,
      travelWith: (req.query.travelWith as any) || 'solo',
      mustHave: req.query.mustHave ? (req.query.mustHave as string).split(',') : [],
      dealBreakers: req.query.dealBreakers ? (req.query.dealBreakers as string).split(',') : [],
    };

    // Create recommendation prompt
    const recommendationPrompt = `
Based on this user's Travel DNA Profile, generate 5 highly personalized destination recommendations.

User Travel DNA Profile:
${JSON.stringify(user.travelProfile, null, 2)}

Current Request:
${JSON.stringify(requestParams, null, 2)}

Current Date: ${new Date().toISOString().split('T')[0]}

Generate 5 destination recommendations that perfectly match the user's profile and current needs.
Consider:
- Their personality type and travel style
- Budget preferences
- Preferred activities and interests
- Mood-based preferences
- Weather and seasonality
- Safety and crowd levels
- Unique experiences aligned with their interests

Return ONLY valid JSON array with this structure:
[
  {
    "destination": "string",
    "country": "string",
    "reason": "string (why this matches their profile)",
    "matchScore": number (0-100),
    "estimatedBudget": {
      "min": number,
      "max": number,
      "currency": "USD"
    },
    "bestTimeToVisit": ["string"],
    "highlights": ["string"],
    "accommodationSuggestions": [
      {
        "name": "string",
        "type": "string",
        "priceRange": "string"
      }
    ],
    "activities": [
      {
        "name": "string",
        "category": "string",
        "duration": "string",
        "price": "string"
      }
    ],
    "localTips": ["string"],
    "weatherInfo": "string",
    "crowdLevel": "string",
    "safetyScore": number (0-100)
  }
]`;

    // Use NeuralX AI for recommendations
    const aiResponse = await neuralxChat(
      [
        {
          role: 'system',
          content: 'You are an expert travel advisor with deep knowledge of global destinations, local cultures, and personalized travel planning. Generate highly relevant recommendations. Always return valid JSON array.',
        },
        {
          role: 'user',
          content: recommendationPrompt,
        },
      ],
      {
        model: 'nx-primary-v3',
        temperature: 0.7, // Balanced creativity
        response_format: { type: 'json_object' },
      }
    );

    // Parse AI response
    let recommendations: Recommendation[];
    try {
      const parsed = JSON.parse(aiResponse);
      // Handle both array and object with recommendations key
      recommendations = Array.isArray(parsed) ? parsed : (parsed.recommendations || []);
    } catch (parseError) {
      logger.error('Failed to parse recommendations:', parseError as Error, { component: 'Recommendations' });
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    // Sort by match score
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    // Return recommendations
    return res.status(200).json({
      success: true,
      recommendations,
      profileUsed: user.travelProfile,
      requestParams,
      generatedAt: new Date().toISOString(),
      count: recommendations.length,
    });

  } catch (error: any) {
    logger.error('AI Recommendations Error:', error as Error, { component: 'Recommendations' });

    return res.status(500).json({
      error: 'Failed to generate recommendations',
      details: error.message,
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
