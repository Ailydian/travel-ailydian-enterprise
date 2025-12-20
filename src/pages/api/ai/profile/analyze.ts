/**
 * AI Profile Analysis API
 * Analyzes user behavior and creates personalized travel DNA profile
 * Part of Phase 1: AI-Powered Super Personalization
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { neuralxChat } from '@/lib/groq-service';
import { prisma } from '@/lib/prisma';

interface UserBehaviorData {
  pastBookings?: Array<{
    destination: string;
    type: string;
    budget: number;
    duration: number;
    activities: string[];
  }>;
  searchHistory?: Array<{
    query: string;
    destination: string;
    timestamp: Date;
  }>;
  preferences?: {
    travelStyle?: 'luxury' | 'budget' | 'mid-range' | 'backpacker';
    accommodation?: 'hotel' | 'hostel' | 'apartment' | 'resort';
    activities?: string[];
    climate?: 'tropical' | 'temperate' | 'cold' | 'any';
    pace?: 'relaxed' | 'moderate' | 'fast-paced';
  };
  interactions?: {
    likes: string[];
    saves: string[];
    shares: string[];
  };
}

interface TravelDNAProfile {
  personalityType: 'adventurer' | 'cultural-explorer' | 'relaxation-seeker' | 'luxury-traveler' | 'budget-conscious' | 'family-oriented';
  budgetRange: {
    min: number;
    max: number;
    currency: string;
  };
  preferredDestinations: string[];
  travelStyle: string;
  interests: string[];
  bestTimeToTravel: string[];
  accommodationPreference: string;
  activityLevel: 'low' | 'medium' | 'high';
  socialPreference: 'solo' | 'couple' | 'family' | 'group';
  moodBasedRecommendations: {
    relaxing: string[];
    adventurous: string[];
    cultural: string[];
    romantic: string[];
  };
  confidence: number; // 0-100
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bookings: {
          take: 50,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get behavior data from request or use defaults
    const behaviorData: UserBehaviorData = req.body.behaviorData || {};

    // Collect user data for analysis
    const userDataForAnalysis = {
      pastBookings: user.bookings.map(booking => ({
        destination: booking.destination || 'Unknown',
        type: booking.type || 'general',
        budget: booking.totalPrice || 0,
        duration: 7, // Default duration
        activities: [],
      })),
      searchHistory: behaviorData.searchHistory || [],
      preferences: behaviorData.preferences || {},
      interactions: behaviorData.interactions || { likes: [], saves: [], shares: [] },
    };

    // Create analysis prompt for AI
    const analysisPrompt = `
Analyze this travel user's behavior and create a comprehensive Travel DNA Profile.

User Data:
${JSON.stringify(userDataForAnalysis, null, 2)}

Create a detailed Travel DNA Profile including:
1. Personality Type (adventurer, cultural-explorer, relaxation-seeker, luxury-traveler, budget-conscious, or family-oriented)
2. Budget Range (min, max, currency)
3. Preferred Destinations (top 5-10)
4. Travel Style description
5. Main Interests
6. Best Time to Travel preferences
7. Accommodation Preference
8. Activity Level (low, medium, high)
9. Social Preference (solo, couple, family, group)
10. Mood-based Recommendations (4 categories: relaxing, adventurous, cultural, romantic)
11. Confidence score (0-100) based on data quality

Return ONLY valid JSON matching this structure:
{
  "personalityType": "string",
  "budgetRange": {
    "min": number,
    "max": number,
    "currency": "string"
  },
  "preferredDestinations": ["string"],
  "travelStyle": "string",
  "interests": ["string"],
  "bestTimeToTravel": ["string"],
  "accommodationPreference": "string",
  "activityLevel": "string",
  "socialPreference": "string",
  "moodBasedRecommendations": {
    "relaxing": ["string"],
    "adventurous": ["string"],
    "cultural": ["string"],
    "romantic": ["string"]
  },
  "confidence": number
}`;

    // Use NeuralX AI for analysis
    const aiResponse = await neuralxChat(
      [
        {
          role: 'system',
          content: 'You are an expert travel psychologist and data analyst. Analyze user behavior and create detailed travel personality profiles. Always return valid JSON.',
        },
        {
          role: 'user',
          content: analysisPrompt,
        },
      ],
      {
        model: 'nx-primary-v3',
        temperature: 0.3, // Lower temperature for consistent analysis
        response_format: { type: 'json_object' },
      }
    );

    // Parse AI response
    const travelDNA: TravelDNAProfile = JSON.parse(aiResponse);

    // Store profile in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        travelProfile: travelDNA as any, // Prisma JSON field
        profileAnalyzedAt: new Date(),
      },
    });

    // Return success response
    return res.status(200).json({
      success: true,
      profile: travelDNA,
      analyzedAt: new Date().toISOString(),
      message: 'Travel DNA profile successfully created',
    });

  } catch (error: any) {
    console.error('AI Profile Analysis Error:', error);

    return res.status(500).json({
      error: 'Failed to analyze travel profile',
      details: error.message,
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
