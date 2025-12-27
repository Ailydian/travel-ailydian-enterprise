import logger from './logger';

// Analytics configuration
const ANALYTICS_CONFIG = {
  providers: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-AILYDIAN2024',
      enabled: true,
    },
    customAnalytics: {
      endpoint: '/api/analytics/track',
      batchSize: 10,
      flushInterval: 30000, // 30 seconds
    },
  },
  events: {
    pageView: 'page_view',
    userAction: 'user_action',
    conversion: 'conversion',
    error: 'error_occurrence',
    performance: 'performance_metric',
  },
};

// Event interfaces
interface BaseEvent {
  id: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  userAgent?: string;
  url: string;
  referrer?: string;
  device?: {
    type: 'mobile' | 'tablet' | 'desktop';
    os: string;
    browser: string;
  };
}

interface PageViewEvent extends BaseEvent {
  type: 'page_view';
  data: {
    title: string;
    path: string;
    loadTime: number;
    language: string;
  };
}

interface UserActionEvent extends BaseEvent {
  type: 'user_action';
  data: {
    action: string;
    category: string;
    label?: string;
    value?: number;
    context?: Record<string, any>;
  };
}

type AnalyticsEvent = PageViewEvent | UserActionEvent;

class AnalyticsMonitor {
  private static eventQueue: AnalyticsEvent[] = [];
  private static sessionId: string = '';
  private static userId?: string;
  private static isInitialized = false;

  // Initialize analytics system
  static async initialize(userId?: string): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.sessionId = this.generateSessionId();
      this.userId = userId;
      
      // Initialize Google Analytics if available
      if (typeof window !== 'undefined' && ANALYTICS_CONFIG.providers.googleAnalytics.enabled) {
        await this.initializeGoogleAnalytics();
      }

      this.isInitialized = true;
      logger.debug('Analytics system initialized', { component: 'AnalyticsMonitor' });
    } catch (error) {
      logger.error('Analytics initialization failed:', error as Error, { component: 'AnalyticsMonitor' });
    }
  }

  // Track page view
  static trackPageView(data: {
    title: string;
    path: string;
    loadTime?: number;
    language?: string;
  }): void {
    const event: PageViewEvent = {
      id: this.generateEventId(),
      type: 'page_view',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      device: this.getDeviceInfo(),
      data: {
        title: data.title,
        path: data.path,
        loadTime: data.loadTime || 0,
        language: data.language || 'tr',
      },
    };

    this.addEvent(event);
  }

  // Private methods
  private static addEvent(event: AnalyticsEvent): void {
    this.eventQueue.push(event);
  }

  private static generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
  }

  private static generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
  }

  private static getDeviceInfo(): BaseEvent['device'] {
    if (typeof navigator === 'undefined') return undefined;

    const userAgent = navigator.userAgent;
    
    return {
      type: this.getDeviceType(userAgent),
      os: this.getOS(userAgent),
      browser: this.getBrowser(userAgent),
    };
  }

  private static getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(userAgent)) {
      if (/iPad/i.test(userAgent)) return 'tablet';
      return 'mobile';
    }
    return 'desktop';
  }

  private static getOS(userAgent: string): string {
    if (/Windows/i.test(userAgent)) return 'Windows';
    if (/Mac/i.test(userAgent)) return 'macOS';
    if (/Linux/i.test(userAgent)) return 'Linux';
    if (/Android/i.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
    return 'Unknown';
  }

  private static getBrowser(userAgent: string): string {
    if (/Chrome/i.test(userAgent)) return 'Chrome';
    if (/Firefox/i.test(userAgent)) return 'Firefox';
    if (/Safari/i.test(userAgent)) return 'Safari';
    if (/Edge/i.test(userAgent)) return 'Edge';
    if (/Opera/i.test(userAgent)) return 'Opera';
    return 'Unknown';
  }

  private static async initializeGoogleAnalytics(): Promise<void> {
    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.providers.googleAnalytics.measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function gtag() {
        (window as any).dataLayer.push(arguments);
      };
      
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', ANALYTICS_CONFIG.providers.googleAnalytics.measurementId);
    } catch (error) {
      logger.error('Google Analytics initialization failed:', error as Error, { component: 'AnalyticsMonitor' });
    }
  }
}

export default AnalyticsMonitor;