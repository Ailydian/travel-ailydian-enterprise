/**
 * Real-time Dashboard WebSocket Service
 * Handles live booking notifications and metric updates
 */

export interface BookingNotification {
  id: string;
  type: 'property' | 'car' | 'transfer' | 'tour';
  title: string;
  customerName: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'new' | 'confirmed' | 'cancelled';
}

export interface MetricUpdate {
  totalRevenue: number;
  todayRevenue: number;
  activeBookings: number;
  totalCustomers: number;
  revenueChange: number;
  bookingsChange: number;
  customersChange: number;
  timestamp: Date;
}

export interface DashboardStats {
  properties: { total: number; active: number; bookings: number };
  cars: { total: number; active: number; rentals: number };
  transfers: { total: number; active: number; bookings: number };
  tours: { total: number; active: number; bookings: number };
}

type WebSocketEventCallback = (data: any) => void;

export class DashboardWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: Map<string, Set<WebSocketEventCallback>> = new Map();
  private isConnecting = false;
  private url: string;

  constructor(url?: string) {
    // Use environment variable or default to localhost
    this.url = url || process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/admin/dashboard';
  }

  /**
   * Connect to WebSocket server
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        reject(new Error('Connection already in progress'));
        return;
      }

      this.isConnecting = true;

      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('✅ Dashboard WebSocket connected');
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.emit('connected', { timestamp: new Date() });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
          this.emit('error', error);
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.isConnecting = false;
          this.emit('disconnected', { timestamp: new Date() });
          this.handleReconnect();
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnection
  }

  /**
   * Handle incoming messages
   */
  private handleMessage(data: any): void {
    const { type, payload } = data;

    switch (type) {
      case 'booking:new':
        this.emit('booking:new', this.parseBookingNotification(payload));
        break;
      case 'booking:confirmed':
        this.emit('booking:confirmed', this.parseBookingNotification(payload));
        break;
      case 'booking:cancelled':
        this.emit('booking:cancelled', this.parseBookingNotification(payload));
        break;
      case 'metrics:update':
        this.emit('metrics:update', this.parseMetricUpdate(payload));
        break;
      case 'stats:update':
        this.emit('stats:update', payload as DashboardStats);
        break;
      default:
        console.warn('Unknown message type:', type);
    }
  }

  /**
   * Parse booking notification
   */
  private parseBookingNotification(payload: any): BookingNotification {
    return {
      id: payload.id,
      type: payload.type,
      title: payload.title,
      customerName: payload.customerName,
      amount: payload.amount,
      currency: payload.currency || 'TRY',
      timestamp: new Date(payload.timestamp),
      status: payload.status,
    };
  }

  /**
   * Parse metric update
   */
  private parseMetricUpdate(payload: any): MetricUpdate {
    return {
      totalRevenue: payload.totalRevenue,
      todayRevenue: payload.todayRevenue,
      activeBookings: payload.activeBookings,
      totalCustomers: payload.totalCustomers,
      revenueChange: payload.revenueChange || 0,
      bookingsChange: payload.bookingsChange || 0,
      customersChange: payload.customersChange || 0,
      timestamp: new Date(payload.timestamp),
    };
  }

  /**
   * Handle reconnection
   */
  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      this.emit('reconnect:failed', { attempts: this.reconnectAttempts });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * this.reconnectAttempts;

    console.log(`Reconnecting in ${delay}ms... (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch((error) => {
        console.error('Reconnection failed:', error);
      });
    }, delay);
  }

  /**
   * Subscribe to event
   */
  on(event: string, callback: WebSocketEventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit event to listeners
   */
  private emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  /**
   * Send message to server
   */
  send(type: string, payload: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket not connected. Message not sent:', type);
    }
  }

  /**
   * Get connection status
   */
  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Get connection state
   */
  get state(): string {
    if (!this.ws) return 'DISCONNECTED';

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'CONNECTED';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'DISCONNECTED';
      default:
        return 'UNKNOWN';
    }
  }
}

// Singleton instance
let dashboardWSInstance: DashboardWebSocket | null = null;

/**
 * Get Dashboard WebSocket instance
 */
export function getDashboardWebSocket(): DashboardWebSocket {
  if (!dashboardWSInstance) {
    dashboardWSInstance = new DashboardWebSocket();
  }
  return dashboardWSInstance;
}

/**
 * React Hook for Dashboard WebSocket
 */
export function useDashboardWebSocket() {
  if (typeof window === 'undefined') {
    // SSR: return dummy instance
    return {
      connect: async () => {},
      disconnect: () => {},
      on: () => () => {},
      isConnected: false,
      state: 'DISCONNECTED',
    };
  }

  return getDashboardWebSocket();
}
