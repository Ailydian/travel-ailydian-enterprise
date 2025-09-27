import { NextRequest, NextResponse } from 'next/server';
import { SecurityManager, SECURITY_HEADERS, ErrorMonitor } from './src/lib/security-manager';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/bookings',
  '/admin',
  '/billing',
];

// API routes that need rate limiting
const RATE_LIMITED_ROUTES = {
  '/api/search': 'search',
  '/api/auth': 'auth',
  '/api/upload': 'upload',
};

// CSP nonce generator
function generateNonce(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');
}

export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const response = NextResponse.next();
  
  try {
    // Get client information
    const clientIP = SecurityManager.getClientIP(request);
    const fingerprint = SecurityManager.generateRequestFingerprint(request);
    const pathname = request.nextUrl.pathname;
    
    // Add security headers
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    // Add CSP nonce for scripts
    const nonce = generateNonce();
    const csp = SECURITY_HEADERS['Content-Security-Policy']
      .replace("script-src", `script-src 'nonce-${nonce}'`);
    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('X-Nonce', nonce);
    
    // Rate limiting check
    const routeType = RATE_LIMITED_ROUTES[pathname as keyof typeof RATE_LIMITED_ROUTES] as 
      'api' | 'search' | 'auth' | 'upload' | undefined;
    
    if (routeType || pathname.startsWith('/api/')) {
      const rateLimitResult = SecurityManager.checkRateLimit(
        `${clientIP}:${fingerprint}`,
        routeType || 'api'
      );
      
      if (!rateLimitResult.allowed) {
        ErrorMonitor.logError(
          new Error('Rate limit exceeded'),
          { ip: clientIP, path: pathname, fingerprint },
          'medium'
        );
        
        return new NextResponse('Too Many Requests', { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime! - Date.now()) / 1000)),
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimitResult.resetTime),
            ...SECURITY_HEADERS
          }
        });
      }
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', '100');
      response.headers.set('X-RateLimit-Remaining', '99'); // Simplified
    }
    
    // Suspicious activity detection
    const suspiciousActivity = SecurityManager.detectSuspiciousActivity(request);
    if (suspiciousActivity.suspicious) {
      ErrorMonitor.logError(
        new Error('Suspicious activity detected'),
        { 
          ip: clientIP, 
          path: pathname, 
          reasons: suspiciousActivity.reasons,
          userAgent: request.headers.get('user-agent'),
        },
        'high'
      );
      
      // Block obviously malicious requests
      if (suspiciousActivity.reasons.includes('Suspicious user agent') && 
          suspiciousActivity.reasons.length > 1) {
        return new NextResponse('Forbidden', { 
          status: 403,
          headers: SECURITY_HEADERS
        });
      }
    }
    
    // Input validation for search queries
    if (pathname === '/search' || pathname.startsWith('/api/search')) {
      const searchQuery = request.nextUrl.searchParams.get('q');
      if (searchQuery) {
        if (SecurityManager.detectSQLInjection(searchQuery)) {
          ErrorMonitor.logError(
            new Error('SQL injection attempt detected'),
            { ip: clientIP, query: searchQuery, path: pathname },
            'critical'
          );
          
          return new NextResponse('Bad Request', { 
            status: 400,
            headers: SECURITY_HEADERS
          });
        }
        
        if (SecurityManager.detectXSS(searchQuery)) {
          ErrorMonitor.logError(
            new Error('XSS attempt detected'),
            { ip: clientIP, query: searchQuery, path: pathname },
            'critical'
          );
          
          return new NextResponse('Bad Request', { 
            status: 400,
            headers: SECURITY_HEADERS
          });
        }
      }
    }
    
    // Geolocation-based blocking (example: block specific countries if needed)
    const country = request.headers.get('cf-ipcountry') || 
                   request.headers.get('x-vercel-ip-country');
    
    if (country && process.env.BLOCKED_COUNTRIES?.includes(country)) {
      ErrorMonitor.logError(
        new Error('Geographic restriction'),
        { ip: clientIP, country, path: pathname },
        'low'
      );
      
      return new NextResponse('Service not available in your region', { 
        status: 451,
        headers: SECURITY_HEADERS
      });
    }
    
    // Admin route protection
    if (pathname.startsWith('/admin')) {
      const token = request.headers.get('authorization') || 
                   request.cookies.get('admin-token')?.value;
      
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      // Add additional admin security headers
      response.headers.set('X-Admin-Access', 'true');
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    
    // Blockchain/crypto route protection
    if (pathname.startsWith('/blockchain') || pathname.startsWith('/api/crypto')) {
      // Add specific headers for crypto operations
      response.headers.set('X-Crypto-Security', 'enabled');
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    
    // AI/ML endpoints protection
    if (pathname.startsWith('/api/ai') || pathname.startsWith('/ai-')) {
      // Enhanced rate limiting for AI endpoints
      const aiRateLimit = SecurityManager.checkRateLimit(`ai:${clientIP}`, 'search');
      if (!aiRateLimit.allowed) {
        return new NextResponse('AI Service Temporarily Unavailable', { 
          status: 429,
          headers: SECURITY_HEADERS
        });
      }
      
      response.headers.set('X-AI-Security', 'active');
    }
    
    // Add request timing
    const processingTime = Date.now() - startTime;
    response.headers.set('X-Response-Time', `${processingTime}ms`);
    
    // Add security audit trail
    response.headers.set('X-Request-ID', crypto.randomUUID());
    response.headers.set('X-Ailydian-Security', 'v2.0');
    
    // CORS for API routes
    if (pathname.startsWith('/api/')) {
      const origin = request.headers.get('origin');
      const allowedOrigins = [
        'https://travel.ailydian.com',
        'https://admin.ailydian.com',
        'https://api.ailydian.com',
      ];
      
      if (process.env.NODE_ENV === 'development') {
        allowedOrigins.push('http://localhost:3000', 'http://localhost:3001');
      }
      
      if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      }
    }
    
    // Preflight handling
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
    
    return response;
    
  } catch (error) {
    // Log middleware errors
    const errorId = ErrorMonitor.logError(
      error,
      { 
        path: request.nextUrl.pathname,
        method: request.method,
        ip: SecurityManager.getClientIP(request),
        userAgent: request.headers.get('user-agent'),
      },
      'critical'
    );
    
    // Return error response with security headers
    return new NextResponse('Internal Security Error', {
      status: 500,
      headers: {
        ...SECURITY_HEADERS,
        'X-Error-ID': errorId,
      }
    });
  }
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
    // Include API routes
    '/api/:path*',
  ],
};