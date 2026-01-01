/**
 * AI Recommendations API Endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTravelAssistant } from '@/lib/ai/travel-assistant-service';
import logger from '@/lib/logger';
import { z } from 'zod';

const recommendationsRequestSchema = z.object({
  budget: z
    .object({
      min: z.number(),
      max: z.number(),
      currency: z.string(),
    })
    .optional(),
  travelDates: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
  travelers: z
    .object({
      adults: z.number(),
      children: z.number().optional(),
      infants: z.number().optional(),
    })
    .optional(),
  interests: z.array(z.string()).optional(),
  destinations: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const preferences = recommendationsRequestSchema.parse(body);

    logger.info('Recommendations request', { preferences });

    const travelAssistant = getTravelAssistant();
    const recommendations = await travelAssistant.getRecommendations(preferences);

    return NextResponse.json({
      recommendations,
      count: recommendations.length,
    });
  } catch (error: any) {
    logger.error('Recommendations API error', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
