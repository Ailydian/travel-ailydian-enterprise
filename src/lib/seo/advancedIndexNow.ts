/**
 * Advanced IndexNow Implementation
 * Son teknoloji, güvenli ve etik SEO uyumlu IndexNow sistemi
 *
 * Özellikler:
 * - Tüm arama motorları için optimize edilmiş
 * - Retry mekanizması ile hata yönetimi
 * - Rate limiting ile etik kullanım
 * - Detaylı logging ve monitoring
 * - Security best practices
 */

import crypto from 'crypto';

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

interface IndexNowResult {
  success: boolean;
  statusCode?: number;
  message?: string;
  engine: string;
  urlsSubmitted: number;
  timestamp: string;
  responseTime?: number;
}

interface AdvancedIndexNowConfig {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  batchSize?: number;
  rateLimit?: number; // requests per minute
}

export class AdvancedIndexNow {
  private config: Required<AdvancedIndexNowConfig>;
  private lastRequestTime: Map<string, number> = new Map();

  // IndexNow destekleyen arama motorları
  private readonly engines = {
    bing: 'https://api.indexnow.org/indexnow',
    yandex: 'https://yandex.com/indexnow',
    indexnow: 'https://api.indexnow.org/indexnow', // Genel endpoint
    seznam: 'https://search.seznam.cz/indexnow',
    naver: 'https://searchadvisor.naver.com/indexnow'
  };

  constructor(config: AdvancedIndexNowConfig = {}) {
    this.config = {
      maxRetries: config.maxRetries ?? 3,
      retryDelay: config.retryDelay ?? 2000,
      timeout: config.timeout ?? 10000,
      batchSize: config.batchSize ?? 100,
      rateLimit: config.rateLimit ?? 10
    };
  }

  /**
   * IndexNow key oluştur ve doğrula
   */
  generateSecureKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * URL'leri tüm arama motorlarına gönder
   */
  async submitToAllEngines(
    urls: string[],
    baseUrl: string,
    key: string
  ): Promise<IndexNowResult[]> {
    const results: IndexNowResult[] = [];

    // URL'leri batch'lere böl
    const batches = this.createBatches(urls, this.config.batchSize);

    for (const [engineName, endpoint] of Object.entries(this.engines)) {
      // Rate limiting kontrol
      await this.checkRateLimit(engineName);

      // Her batch için submission
      for (const batch of batches) {
        const result = await this.submitBatch(
          batch,
          baseUrl,
          key,
          endpoint,
          engineName
        );
        results.push(result);

        // Batch'ler arasında kısa bekleme
        if (batches.length > 1) {
          await this.delay(500);
        }
      }
    }

    return results;
  }

  /**
   * Tek bir engine'e batch submission
   */
  private async submitBatch(
    urls: string[],
    baseUrl: string,
    key: string,
    endpoint: string,
    engineName: string
  ): Promise<IndexNowResult> {
    const startTime = Date.now();

    try {
      // Payload hazırla
      const payload = this.preparePayload(urls, baseUrl, key);

      // Retry mekanizması ile gönder
      const response = await this.sendWithRetry(endpoint, payload);

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        console.log(`✅ ${engineName}: ${urls.length} URLs submitted successfully (${responseTime}ms)`);
        return {
          success: true,
          statusCode: response.status,
          message: 'Submitted successfully',
          engine: engineName,
          urlsSubmitted: urls.length,
          timestamp: new Date().toISOString(),
          responseTime
        };
      } else {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.warn(`⚠️ ${engineName}: Failed with status ${response.status} - ${errorText}`);
        return {
          success: false,
          statusCode: response.status,
          message: `Failed: ${response.statusText} - ${errorText}`,
          engine: engineName,
          urlsSubmitted: 0,
          timestamp: new Date().toISOString(),
          responseTime
        };
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      console.error(`❌ ${engineName}: Submission error -`, error.message);
      return {
        success: false,
        message: `Error: ${error.message}`,
        engine: engineName,
        urlsSubmitted: 0,
        timestamp: new Date().toISOString(),
        responseTime
      };
    }
  }

  /**
   * Payload hazırla (tüm header'lar ve format kontrolü ile)
   */
  private preparePayload(urls: string[], baseUrl: string, key: string): IndexNowPayload {
    // URL'den protocol çıkar
    const host = baseUrl.replace(/^https?:\/\//, '');

    // Key location'ı tam URL olarak ver
    const keyLocation = `${baseUrl}/indexnow-key.txt`;

    return {
      host,
      key,
      keyLocation,
      urlList: urls
    };
  }

  /**
   * Retry mekanizması ile HTTP request
   */
  private async sendWithRetry(
    endpoint: string,
    payload: IndexNowPayload,
    retryCount: number = 0
  ): Promise<Response> {
    try {
      const body = JSON.stringify(payload);

      // AbortController ile timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body, 'utf8').toString(),
          'User-Agent': 'Travel-Ailydian-SEO-Bot/2.0 (+https://travel.ailydian.com/bot)',
          'Accept': 'application/json, */*',
          'Accept-Encoding': 'gzip, deflate, br'
        },
        body,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // 429 (Too Many Requests) durumunda daha uzun bekle
      if (response.status === 429 && retryCount < this.config.maxRetries) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
        await this.delay(retryAfter * 1000);
        return this.sendWithRetry(endpoint, payload, retryCount + 1);
      }

      // Geçici hatalar için retry
      if (
        (response.status >= 500 || response.status === 408) &&
        retryCount < this.config.maxRetries
      ) {
        await this.delay(this.config.retryDelay * (retryCount + 1));
        return this.sendWithRetry(endpoint, payload, retryCount + 1);
      }

      return response;

    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }

      // Network hatası - retry
      if (retryCount < this.config.maxRetries) {
        await this.delay(this.config.retryDelay * (retryCount + 1));
        return this.sendWithRetry(endpoint, payload, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * Rate limiting kontrolü
   */
  private async checkRateLimit(engineName: string): Promise<void> {
    const now = Date.now();
    const lastRequest = this.lastRequestTime.get(engineName) || 0;
    const minInterval = (60 / this.config.rateLimit) * 1000; // ms

    const timeSinceLastRequest = now - lastRequest;

    if (timeSinceLastRequest < minInterval) {
      const waitTime = minInterval - timeSinceLastRequest;
      console.log(`⏳ Rate limiting: Waiting ${waitTime}ms for ${engineName}`);
      await this.delay(waitTime);
    }

    this.lastRequestTime.set(engineName, Date.now());
  }

  /**
   * URL'leri batch'lere böl
   */
  private createBatches(urls: string[], batchSize: number): string[][] {
    const batches: string[][] = [];
    for (let i = 0; i < urls.length; i += batchSize) {
      batches.push(urls.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Promise delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Performans raporu oluştur
   */
  generateReport(results: IndexNowResult[]): {
    totalSubmissions: number;
    successfulSubmissions: number;
    failedSubmissions: number;
    totalUrls: number;
    averageResponseTime: number;
    successRate: number;
    engineResults: Record<string, { success: number; failed: number; urls: number }>;
  } {
    const engineResults: Record<string, { success: number; failed: number; urls: number }> = {};

    let totalUrls = 0;
    let totalResponseTime = 0;
    let responseCount = 0;

    results.forEach(result => {
      if (!engineResults[result.engine]) {
        engineResults[result.engine] = { success: 0, failed: 0, urls: 0 };
      }

      if (result.success) {
        engineResults[result.engine].success++;
        engineResults[result.engine].urls += result.urlsSubmitted;
        totalUrls += result.urlsSubmitted;
      } else {
        engineResults[result.engine].failed++;
      }

      if (result.responseTime) {
        totalResponseTime += result.responseTime;
        responseCount++;
      }
    });

    const successfulSubmissions = results.filter(r => r.success).length;

    return {
      totalSubmissions: results.length,
      successfulSubmissions,
      failedSubmissions: results.length - successfulSubmissions,
      totalUrls,
      averageResponseTime: responseCount > 0 ? Math.round(totalResponseTime / responseCount) : 0,
      successRate: results.length > 0 ? (successfulSubmissions / results.length) * 100 : 0,
      engineResults
    };
  }
}

/**
 * Singleton instance
 */
let advancedIndexNowInstance: AdvancedIndexNow | null = null;

export function getAdvancedIndexNow(config?: AdvancedIndexNowConfig): AdvancedIndexNow {
  if (!advancedIndexNowInstance) {
    advancedIndexNowInstance = new AdvancedIndexNow(config);
  }
  return advancedIndexNowInstance;
}
