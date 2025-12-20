/**
 * Contextual Suggestions API
 * Provides weather-aware, event-integrated, crowd-predicted recommendations
 * Part of Phase 1: AI-Powered Super Personalization
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { neuralxChat } from '@/lib/groq-service';

interface ContextualRequest {
  destination: string;
  date: string; // ISO format
  duration?: number; // days
  interests?: string[];
  avoidCrowds?: boolean;
}

interface WeatherContext {
  temperature: {
    min: number;
    max: number;
    unit: string;
  };
  conditions: string;
  precipitation: number;
  uvIndex: number;
  recommendation: string;
  bestActivities: string[];
  whatToPack: string[];
}

interface EventContext {
  name: string;
  type: string;
  date: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  crowdLevel: 'very-high' | 'high' | 'moderate' | 'low';
  pricingImpact: string;
  shouldAttend: boolean;
  ticketInfo?: string;
}

interface CrowdPrediction {
  level: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';
  score: number; // 0-100
  reasoning: string;
  bestTimeToVisit: string[];
  alternativeSpots: string[];
  peakHours: string[];
  quietHours: string[];
}

interface BestTimeCalculation {
  optimalDate: string;
  reason: string;
  weatherScore: number;
  crowdScore: number;
  priceScore: number;
  eventScore: number;
  overallScore: number;
  alternatives: Array<{
    date: string;
    score: number;
    reason: string;
  }>;
}

interface ContextualSuggestion {
  activity: string;
  category: string;
  suitability: number; // 0-100
  reason: string;
  weatherSuitable: boolean;
  crowdAware: boolean;
  timing: {
    bestTime: string;
    duration: string;
  };
  location: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  tips: string[];
  bookingRequired: boolean;
  estimatedCost: string;
}

interface ContextualResponse {
  destination: string;
  date: string;
  weather: WeatherContext;
  events: EventContext[];
  crowdPrediction: CrowdPrediction;
  bestTimeToVisit: BestTimeCalculation;
  suggestions: ContextualSuggestion[];
  alerts: Array<{
    type: 'weather' | 'crowd' | 'event' | 'price' | 'safety';
    severity: 'info' | 'warning' | 'critical';
    message: string;
    actionable: boolean;
    action?: string;
  }>;
  localInsights: string[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse query parameters
    const { destination, date, duration, interests, avoidCrowds } = req.query;

    if (!destination || !date) {
      return res.status(400).json({
        error: 'Missing required parameters',
        required: ['destination', 'date'],
      });
    }

    const requestData: ContextualRequest = {
      destination: destination as string,
      date: date as string,
      duration: duration ? parseInt(duration as string) : 7,
      interests: interests ? (interests as string).split(',') : [],
      avoidCrowds: avoidCrowds === 'true',
    };

    // Create contextual analysis prompt
    const contextPrompt = `
You are an expert travel advisor with real-time knowledge of weather patterns, local events, crowd levels, and optimal travel timing.

Analyze the following trip and provide comprehensive contextual recommendations:

Destination: ${requestData.destination}
Travel Date: ${requestData.date}
Duration: ${requestData.duration} days
Interests: ${requestData.interests.join(', ') || 'General tourism'}
Avoid Crowds: ${requestData.avoidCrowds ? 'Yes' : 'No'}

Provide detailed analysis including:
1. Weather forecast and recommendations
2. Local events happening during the visit
3. Crowd level predictions for major attractions
4. Best time to visit calculation (optimal dates)
5. Context-aware activity suggestions
6. Important alerts (weather, crowds, events, safety)
7. Local insights and tips

Consider:
- Seasonal weather patterns for ${requestData.destination}
- Major festivals, holidays, and events
- Tourist season vs off-season
- Local customs and best practices
- Time zone and daylight hours
- COVID-19 or health requirements (if applicable)

Return ONLY valid JSON with this structure:
{
  "destination": "${requestData.destination}",
  "date": "${requestData.date}",
  "weather": {
    "temperature": {
      "min": number,
      "max": number,
      "unit": "C"
    },
    "conditions": "string",
    "precipitation": number,
    "uvIndex": number,
    "recommendation": "string",
    "bestActivities": ["string"],
    "whatToPack": ["string"]
  },
  "events": [
    {
      "name": "string",
      "type": "string",
      "date": "string",
      "description": "string",
      "impact": "string",
      "crowdLevel": "string",
      "pricingImpact": "string",
      "shouldAttend": boolean,
      "ticketInfo": "string"
    }
  ],
  "crowdPrediction": {
    "level": "string",
    "score": number,
    "reasoning": "string",
    "bestTimeToVisit": ["string"],
    "alternativeSpots": ["string"],
    "peakHours": ["string"],
    "quietHours": ["string"]
  },
  "bestTimeToVisit": {
    "optimalDate": "string",
    "reason": "string",
    "weatherScore": number,
    "crowdScore": number,
    "priceScore": number,
    "eventScore": number,
    "overallScore": number,
    "alternatives": [
      {
        "date": "string",
        "score": number,
        "reason": "string"
      }
    ]
  },
  "suggestions": [
    {
      "activity": "string",
      "category": "string",
      "suitability": number,
      "reason": "string",
      "weatherSuitable": boolean,
      "crowdAware": boolean,
      "timing": {
        "bestTime": "string",
        "duration": "string"
      },
      "location": {
        "name": "string"
      },
      "tips": ["string"],
      "bookingRequired": boolean,
      "estimatedCost": "string"
    }
  ],
  "alerts": [
    {
      "type": "string",
      "severity": "string",
      "message": "string",
      "actionable": boolean,
      "action": "string"
    }
  ],
  "localInsights": ["string"]
}`;

    // Use NeuralX AI for contextual analysis
    const aiResponse = await neuralxChat(
      [
        {
          role: 'system',
          content: 'You are an expert travel advisor with comprehensive knowledge of global destinations, weather patterns, local events, and crowd dynamics. Provide accurate, context-aware recommendations. Always return valid JSON.',
        },
        {
          role: 'user',
          content: contextPrompt,
        },
      ],
      {
        model: 'nx-primary-v3',
        temperature: 0.5,
        response_format: { type: 'json_object' },
      }
    );

    // Parse AI response
    const contextualData: ContextualResponse = JSON.parse(aiResponse);

    // Return response
    return res.status(200).json({
      success: true,
      data: contextualData,
      generatedAt: new Date().toISOString(),
      validFor: '24 hours',
      disclaimer: 'Weather and event data are estimates. Please verify with official sources.',
    });

  } catch (error: any) {
    console.error('Contextual Suggestions Error:', error);

    return res.status(500).json({
      error: 'Failed to generate contextual suggestions',
      details: error.message,
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
