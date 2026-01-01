/**
 * AI Itinerary Planning API Endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTravelAssistant } from '@/lib/ai/travel-assistant-service';
import logger from '@/lib/logger';
import { z } from 'zod';

const itineraryRequestSchema = z.object({
  destination: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().optional(),
  interests: z.array(z.string()).optional(),
  travelers: z
    .object({
      adults: z.number(),
      children: z.number().optional(),
    })
    .optional(),
  locale: z.enum(['en', 'tr', 'de', 'ru']).optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = itineraryRequestSchema.parse(body);

    logger.info('Itinerary request', { destination: params.destination });

    const travelAssistant = getTravelAssistant();
    const itinerary = await travelAssistant.planItinerary(params);

    return NextResponse.json(itinerary);
  } catch (error: any) {
    logger.error('Itinerary API error', error);

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
