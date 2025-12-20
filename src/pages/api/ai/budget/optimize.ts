/**
 * Smart Budget Optimizer API
 * Optimizes travel budget allocation and finds best value opportunities
 * Part of Phase 1: AI-Powered Super Personalization
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { neuralxChat } from '@/lib/groq-service';

interface BudgetOptimizationRequest {
  totalBudget: number;
  currency: string;
  destination: string;
  duration: number; // days
  travelers: number;
  priorities: {
    accommodation: number; // 1-5
    food: number; // 1-5
    activities: number; // 1-5
    transportation: number; // 1-5
    shopping: number; // 1-5
  };
  travelStyle: 'luxury' | 'comfort' | 'moderate' | 'budget' | 'backpacker';
  mustHaveExperiences?: string[];
  flexibleOn?: string[];
}

interface BudgetAllocation {
  category: string;
  allocated: number;
  percentage: number;
  recommended: number;
  savings: number;
  explanation: string;
  tips: string[];
}

interface HiddenCost {
  name: string;
  estimatedAmount: number;
  category: string;
  avoidable: boolean;
  howToAvoid?: string;
}

interface DealOpportunity {
  type: string;
  description: string;
  potentialSavings: number;
  validUntil?: string;
  bookingUrl?: string;
  requirements?: string[];
}

interface BudgetOptimizationResponse {
  totalBudget: number;
  currency: string;
  allocations: BudgetAllocation[];
  hiddenCosts: HiddenCost[];
  predictedTotal: number;
  contingencyReserve: number;
  dailyBudget: number;
  dealOpportunities: DealOpportunity[];
  savingsTips: string[];
  bestValueSuggestions: string[];
  costBreakdown: {
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    shopping: number;
    miscellaneous: number;
  };
  comparisonWithSimilarTrips: {
    average: number;
    yourBudget: number;
    percentageDifference: number;
    verdict: 'excellent' | 'good' | 'fair' | 'expensive';
  };
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

    // Validate request body
    const requestData: BudgetOptimizationRequest = req.body;

    if (!requestData.totalBudget || !requestData.destination || !requestData.duration) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['totalBudget', 'destination', 'duration'],
      });
    }

    // Create optimization prompt
    const optimizationPrompt = `
You are an expert travel budget optimizer. Analyze this trip and create an optimal budget allocation.

Trip Details:
- Total Budget: ${requestData.totalBudget} ${requestData.currency}
- Destination: ${requestData.destination}
- Duration: ${requestData.duration} days
- Travelers: ${requestData.travelers || 1}
- Travel Style: ${requestData.travelStyle}
- Priorities: ${JSON.stringify(requestData.priorities, null, 2)}
- Must-Have Experiences: ${requestData.mustHaveExperiences?.join(', ') || 'None specified'}

Create a comprehensive budget optimization plan including:
1. Smart allocation across categories (accommodation, food, activities, transportation, shopping, miscellaneous)
2. Hidden costs to watch out for
3. Daily budget recommendation
4. Deal opportunities and savings tips
5. Best value suggestions
6. Comparison with similar trips

Consider:
- Local cost of living in ${requestData.destination}
- Seasonal pricing variations
- Smart booking strategies
- Value-for-money experiences
- Hidden fees and taxes
- Emergency contingency (10-15% of budget)

Return ONLY valid JSON with this structure:
{
  "totalBudget": ${requestData.totalBudget},
  "currency": "${requestData.currency}",
  "allocations": [
    {
      "category": "string",
      "allocated": number,
      "percentage": number,
      "recommended": number,
      "savings": number,
      "explanation": "string",
      "tips": ["string"]
    }
  ],
  "hiddenCosts": [
    {
      "name": "string",
      "estimatedAmount": number,
      "category": "string",
      "avoidable": boolean,
      "howToAvoid": "string"
    }
  ],
  "predictedTotal": number,
  "contingencyReserve": number,
  "dailyBudget": number,
  "dealOpportunities": [
    {
      "type": "string",
      "description": "string",
      "potentialSavings": number,
      "validUntil": "string",
      "requirements": ["string"]
    }
  ],
  "savingsTips": ["string"],
  "bestValueSuggestions": ["string"],
  "costBreakdown": {
    "accommodation": number,
    "food": number,
    "activities": number,
    "transportation": number,
    "shopping": number,
    "miscellaneous": number
  },
  "comparisonWithSimilarTrips": {
    "average": number,
    "yourBudget": number,
    "percentageDifference": number,
    "verdict": "string"
  }
}`;

    // Use NeuralX AI for optimization
    const aiResponse = await neuralxChat(
      [
        {
          role: 'system',
          content: 'You are an expert financial advisor specializing in travel budgets. You help travelers maximize value and avoid overspending. Always return valid JSON.',
        },
        {
          role: 'user',
          content: optimizationPrompt,
        },
      ],
      {
        model: 'nx-primary-v3',
        temperature: 0.4, // Lower temperature for financial accuracy
        response_format: { type: 'json_object' },
      }
    );

    // Parse AI response
    const optimization: BudgetOptimizationResponse = JSON.parse(aiResponse);

    // Add metadata
    const response = {
      success: true,
      optimization,
      generatedAt: new Date().toISOString(),
      validFor: '7 days',
      disclaimer: 'Prices are estimates based on current data. Actual costs may vary.',
    };

    return res.status(200).json(response);

  } catch (error: any) {
    console.error('Budget Optimization Error:', error);

    return res.status(500).json({
      error: 'Failed to optimize budget',
      details: error.message,
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
