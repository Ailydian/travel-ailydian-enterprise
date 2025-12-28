/**
 * Next.js Instrumentation
 * Initializes server-side monitoring and telemetry
 * Required for Sentry server-side error tracking
 */

export async function register() {
  // Server-side instrumentation
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initSentry } = await import('./src/lib/monitoring/sentry');
    initSentry();
  }

  // Edge runtime instrumentation
  if (process.env.NEXT_RUNTIME === 'edge') {
    const { initSentry } = await import('./src/lib/monitoring/sentry');
    initSentry();
  }
}

// Optional: onRequestError for fine-grained error handling
export async function onRequestError(
  err: Error,
  request: {
    path: string;
    method: string;
    headers: Headers;
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
  }
) {
  if (process.env.NODE_ENV === 'production') {
    const Sentry = await import('@sentry/nextjs');

    Sentry.captureException(err, {
      contexts: {
        request: {
          path: request.path,
          method: request.method,
        },
        route: {
          kind: context.routerKind,
          path: context.routePath,
          type: context.routeType,
        },
      },
    });
  }
}
