/**
 * Crypto Payment Service
 * Coinbase Commerce integration for cryptocurrency payments
 * Supports: BTC, ETH, USDC, USDT, DAI, LTC, BCH, DOGE
 *
 * @module CryptoPaymentService
 * @security PCI-DSS compliant, no private key handling
 */

import logger from '../logger';

// ============================================
// TYPES & INTERFACES
// ============================================

export type CryptoCurrency =
  | 'BTC'
  | 'ETH'
  | 'USDC'
  | 'USDT'
  | 'DAI'
  | 'LTC'
  | 'BCH'
  | 'DOGE';

export type ChargeStatus =
  | 'NEW'
  | 'PENDING'
  | 'COMPLETED'
  | 'EXPIRED'
  | 'UNRESOLVED'
  | 'RESOLVED'
  | 'CANCELED';

export interface CryptoChargeRequest {
  readonly name: string;
  readonly description: string;
  readonly pricingType: 'fixed_price' | 'no_price';
  readonly localPrice: {
    readonly amount: string;
    readonly currency: string; // USD, EUR, etc.
  };
  readonly metadata?: {
    readonly bookingId?: string;
    readonly userId?: string;
    readonly [key: string]: string | undefined;
  };
  readonly redirectUrl?: string;
  readonly cancelUrl?: string;
}

export interface CryptoCharge {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly hosted_url: string;
  readonly created_at: string;
  readonly expires_at: string;
  readonly confirmed_at?: string;
  readonly pricing_type: 'fixed_price' | 'no_price';
  readonly pricing: {
    readonly local: {
      readonly amount: string;
      readonly currency: string;
    };
    readonly [currency: string]: {
      readonly amount: string;
      readonly currency: string;
    };
  };
  readonly addresses: {
    readonly [currency: string]: string;
  };
  readonly payments: readonly CryptoPayment[];
  readonly metadata: Record<string, string>;
  readonly support_email?: string;
  readonly timeline: readonly TimelineEvent[];
}

export interface CryptoPayment {
  readonly network: string;
  readonly transaction_id: string;
  readonly status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  readonly value: {
    readonly local: {
      readonly amount: string;
      readonly currency: string;
    };
    readonly crypto: {
      readonly amount: string;
      readonly currency: string;
    };
  };
  readonly block?: {
    readonly height: number;
    readonly hash: string;
    readonly confirmations_accumulated: number;
    readonly confirmations_required: number;
  };
}

export interface TimelineEvent {
  readonly time: string;
  readonly status: string;
  readonly context?: string;
}

export interface WebhookEvent {
  readonly id: string;
  readonly scheduled_for: string;
  readonly event: {
    readonly id: string;
    readonly resource: string;
    readonly type: string;
    readonly api_version: string;
    readonly created_at: string;
    readonly data: {
      readonly code: string;
      readonly id: string;
      readonly [key: string]: any;
    };
  };
}

// ============================================
// CRYPTO PAYMENT SERVICE
// ============================================

export class CryptoPaymentService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.commerce.coinbase.com';
  private readonly webhookSecret?: string;

  constructor() {
    const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
    if (!apiKey) {
      throw new Error('COINBASE_COMMERCE_API_KEY not configured');
    }

    this.apiKey = apiKey;
    this.webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;
  }

  /**
   * Create a new crypto charge
   */
  async createCharge(request: CryptoChargeRequest): Promise<CryptoCharge> {
    try {
      logger.info('Creating crypto charge', {
        name: request.name,
        amount: request.localPrice.amount,
        currency: request.localPrice.currency
      });

      const response = await fetch(`${this.baseUrl}/charges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': this.apiKey,
          'X-CC-Version': '2018-03-22'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Charge creation failed: ${JSON.stringify(error)}`);
      }

      const result = await response.json();
      const charge: CryptoCharge = result.data;

      logger.info('Crypto charge created', {
        chargeId: charge.id,
        code: charge.code,
        hostedUrl: charge.hosted_url
      });

      return charge;
    } catch (error) {
      logger.error('Failed to create crypto charge', { error });
      throw error;
    }
  }

  /**
   * Retrieve charge by ID
   */
  async getCharge(chargeId: string): Promise<CryptoCharge> {
    try {
      const response = await fetch(`${this.baseUrl}/charges/${chargeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': this.apiKey,
          'X-CC-Version': '2018-03-22'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to retrieve charge: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      logger.error('Failed to retrieve charge', { error, chargeId });
      throw error;
    }
  }

  /**
   * List all charges
   */
  async listCharges(limit: number = 25): Promise<readonly CryptoCharge[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/charges?limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': this.apiKey,
            'X-CC-Version': '2018-03-22'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to list charges: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      logger.error('Failed to list charges', { error });
      throw error;
    }
  }

  /**
   * Cancel a charge
   */
  async cancelCharge(chargeId: string): Promise<CryptoCharge> {
    try {
      logger.info('Canceling charge', { chargeId });

      const response = await fetch(
        `${this.baseUrl}/charges/${chargeId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': this.apiKey,
            'X-CC-Version': '2018-03-22'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to cancel charge: ${response.statusText}`);
      }

      const result = await response.json();
      logger.info('Charge canceled', { chargeId });

      return result.data;
    } catch (error) {
      logger.error('Failed to cancel charge', { error, chargeId });
      throw error;
    }
  }

  /**
   * Resolve a charge (mark unresolved charge as resolved)
   */
  async resolveCharge(chargeId: string): Promise<CryptoCharge> {
    try {
      const response = await fetch(
        `${this.baseUrl}/charges/${chargeId}/resolve`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': this.apiKey,
            'X-CC-Version': '2018-03-22'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to resolve charge: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      logger.error('Failed to resolve charge', { error, chargeId });
      throw error;
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    payload: string,
    signature: string
  ): boolean {
    if (!this.webhookSecret) {
      logger.warn('Webhook secret not configured');
      return false;
    }

    try {
      const crypto = require('crypto');
      const computedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(payload)
        .digest('hex');

      return computedSignature === signature;
    } catch (error) {
      logger.error('Webhook signature verification failed', { error });
      return false;
    }
  }

  /**
   * Get charge status
   */
  async getChargeStatus(chargeId: string): Promise<ChargeStatus> {
    const charge = await this.getCharge(chargeId);

    // Determine status from timeline
    const latestEvent = charge.timeline[charge.timeline.length - 1];

    if (!latestEvent) {
      return 'NEW';
    }

    const statusMapping: Record<string, ChargeStatus> = {
      'NEW': 'NEW',
      'PENDING': 'PENDING',
      'COMPLETED': 'COMPLETED',
      'EXPIRED': 'EXPIRED',
      'UNRESOLVED': 'UNRESOLVED',
      'RESOLVED': 'RESOLVED',
      'CANCELED': 'CANCELED'
    };

    return statusMapping[latestEvent.status] || 'NEW';
  }

  /**
   * Check if charge is paid
   */
  async isChargePaid(chargeId: string): Promise<boolean> {
    const status = await this.getChargeStatus(chargeId);
    return status === 'COMPLETED' || status === 'RESOLVED';
  }

  /**
   * Get payment details
   */
  async getPaymentDetails(chargeId: string): Promise<readonly CryptoPayment[]> {
    const charge = await this.getCharge(chargeId);
    return charge.payments;
  }

  /**
   * Get supported cryptocurrencies
   */
  getSupportedCryptocurrencies(): readonly CryptoCurrency[] {
    return ['BTC', 'ETH', 'USDC', 'USDT', 'DAI', 'LTC', 'BCH', 'DOGE'];
  }

  /**
   * Format crypto amount for display
   */
  formatCryptoAmount(amount: string, currency: CryptoCurrency): string {
    const decimals: Record<CryptoCurrency, number> = {
      'BTC': 8,
      'ETH': 18,
      'USDC': 6,
      'USDT': 6,
      'DAI': 18,
      'LTC': 8,
      'BCH': 8,
      'DOGE': 8
    };

    const decimalPlaces = decimals[currency] || 8;
    const numAmount = parseFloat(amount);

    return numAmount.toFixed(Math.min(decimalPlaces, 8));
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if Coinbase Commerce is configured
 */
export function isCryptoPaymentConfigured(): boolean {
  return Boolean(process.env.COINBASE_COMMERCE_API_KEY);
}

/**
 * Get crypto payment URL for charge
 */
export function getCryptoPaymentUrl(charge: CryptoCharge): string {
  return charge.hosted_url;
}

/**
 * Get QR code URL for crypto address
 */
export function getCryptoQRCodeUrl(
  currency: CryptoCurrency,
  address: string,
  amount?: string
): string {
  const baseUrl = 'https://chart.googleapis.com/chart';
  const qrContent = amount
    ? `${currency.toLowerCase()}:${address}?amount=${amount}`
    : `${currency.toLowerCase()}:${address}`;

  return `${baseUrl}?cht=qr&chs=300x300&chl=${encodeURIComponent(qrContent)}`;
}

export default CryptoPaymentService;
