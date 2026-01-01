/**
 * AI Chat API Endpoint
 * Handles chat requests with streaming support
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTravelAssistant } from '@/lib/ai/travel-assistant-service';
import { getRateLimiter } from '@/lib/ai/rate-limiter';
import logger from '@/lib/logger';
import { z } from 'zod';

// Request validation schema
const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string(),
  userId: z.string().optional(),
  locale: z.enum(['en', 'tr', 'de', 'ru']).optional().default('en'),
  stream: z.boolean().optional().default(false),
  userPreferences: z
    .object({
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
          flexible: z.boolean().optional(),
        })
        .optional(),
      travelers: z
        .object({
          adults: z.number(),
          children: z.number(),
          infants: z.number(),
        })
        .optional(),
      interests: z.array(z.string()).optional(),
      destinations: z.array(z.string()).optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validatedData = chatRequestSchema.parse(body);

    // Rate limiting
    const identifier = validatedData.userId || validatedData.sessionId;
    const limiter = getRateLimiter(validatedData.stream ? 'stream' : 'chat');
    const rateLimit = await limiter.checkLimit(identifier);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again in a moment.',
          resetAt: rateLimit.resetAt,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limiter.getUsage(identifier).limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
          },
        }
      );
    }

    logger.info('AI chat request', {
      sessionId: validatedData.sessionId,
      locale: validatedData.locale,
      stream: validatedData.stream,
      rateLimit: rateLimit.remaining,
    });

    const travelAssistant = getTravelAssistant();

    // Handle streaming
    if (validatedData.stream) {
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            await travelAssistant.streamChat(
              {
                message: validatedData.message,
                sessionId: validatedData.sessionId,
                userId: validatedData.userId,
                locale: validatedData.locale,
                userPreferences: validatedData.userPreferences,
                stream: true,
              },
              chunk => {
                // Send SSE format
                const data = JSON.stringify({
                  delta: chunk.delta,
                  accumulated: chunk.accumulated,
                  done: chunk.done,
                });

                controller.enqueue(encoder.encode(`data: ${data}\n\n`));

                if (chunk.done) {
                  controller.close();
                }
              }
            );
          } catch (error: any) {
            logger.error('Streaming error', error);
            const errorData = JSON.stringify({
              error: error.message,
              done: true,
            });
            controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Handle regular chat
    const response = await travelAssistant.chat({
      message: validatedData.message,
      sessionId: validatedData.sessionId,
      userId: validatedData.userId,
      locale: validatedData.locale,
      userPreferences: validatedData.userPreferences,
    });

    logger.info('AI chat response', {
      sessionId: response.sessionId,
      provider: response.metadata.provider,
      latency: response.metadata.latency,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    logger.error('AI chat API error', error);

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

// Rate limiting check
export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: 'AI Travel Assistant',
    status: 'active',
    providers: ['groq', 'openai', 'anthropic'],
    version: '1.0.0',
  });
}
