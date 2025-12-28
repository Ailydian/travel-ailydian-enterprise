/**
 * Sentry Test Endpoint
 * Used to verify Sentry error tracking is working correctly
 *
 * Endpoints:
 * - GET /api/test-sentry - Health check
 * - POST /api/test-sentry?type=exception - Trigger test exception
 * - POST /api/test-sentry?type=message - Send test message
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

type ResponseData = {
  status: string;
  message: string;
  sentryEnabled?: boolean;
  dsn?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Check if Sentry is configured
    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!sentryDsn) {
      return res.status(503).json({
        status: 'error',
        message: 'Sentry DSN not configured. Please set NEXT_PUBLIC_SENTRY_DSN environment variable.',
        sentryEnabled: false,
      });
    }

    // Handle GET requests
    if (req.method === 'GET') {
      return res.status(200).json({
        status: 'ok',
        message: 'Sentry test endpoint is ready',
        sentryEnabled: true,
        dsn: sentryDsn.split('@')[1], // Show domain only, hide token
      });
    }

    // Handle POST requests for test errors
    if (req.method === 'POST') {
      const { type = 'exception' } = req.query;

      if (type === 'exception') {
        // Simulate an exception and send to Sentry
        const testError = new Error('Test Exception from Sentry Integration');

        Sentry.captureException(testError, {
          tags: {
            source: 'test-endpoint',
            type: 'exception-test',
          },
          contexts: {
            test: {
              description: 'This is a test error to verify Sentry integration',
              timestamp: new Date().toISOString(),
            },
          },
          level: 'error',
        });

        return res.status(200).json({
          status: 'ok',
          message: 'Test exception sent to Sentry. Check your Sentry dashboard.',
        });
      }

      if (type === 'message') {
        // Send a test message to Sentry
        Sentry.captureMessage('Test Message from Sentry Integration', {
          tags: {
            source: 'test-endpoint',
            type: 'message-test',
          },
          level: 'info',
        });

        return res.status(200).json({
          status: 'ok',
          message: 'Test message sent to Sentry. Check your Sentry dashboard.',
        });
      }

      if (type === 'performance') {
        // Create a test transaction for performance monitoring
        const transaction = Sentry.startTransaction({
          name: 'Test Performance Transaction',
          op: 'test',
          tags: {
            source: 'test-endpoint',
            type: 'performance-test',
          },
        });

        // Simulate some work
        await new Promise(resolve => setTimeout(resolve, 500));

        // Add a child span
        const span = transaction.startChild({
          op: 'database.query',
          description: 'Simulated database query',
        });

        await new Promise(resolve => setTimeout(resolve, 200));
        span.finish();

        transaction.finish();

        return res.status(200).json({
          status: 'ok',
          message: 'Test performance transaction sent to Sentry. Check your Sentry dashboard.',
        });
      }

      return res.status(400).json({
        status: 'error',
        message: 'Invalid type parameter. Use "exception", "message", or "performance".',
      });
    }

    // Method not allowed
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed. Use GET or POST.',
    });
  } catch (error) {
    // Capture unexpected errors
    Sentry.captureException(error, {
      tags: {
        source: 'test-endpoint',
        type: 'endpoint-error',
      },
    });

    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
