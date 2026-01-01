/**
 * Base AI Provider Abstract Class
 * Defines interface all providers must implement
 */

import {
  AIMessage,
  AIRequestOptions,
  AIResponse,
  AIProvider,
  StreamCallback,
  AIProviderConfig,
  AIError,
} from './types';

export abstract class BaseAIProvider {
  protected config: AIProviderConfig;
  protected providerName: AIProvider;
  protected errorCount: number = 0;
  protected lastError: Date | null = null;

  constructor(config: AIProviderConfig, providerName: AIProvider) {
    this.config = config;
    this.providerName = providerName;
  }

  /**
   * Send chat completion request
   */
  abstract chat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): Promise<AIResponse>;

  /**
   * Stream chat completion
   */
  abstract streamChat(
    messages: AIMessage[],
    callback: StreamCallback,
    options?: AIRequestOptions
  ): Promise<void>;

  /**
   * Health check
   */
  abstract healthCheck(): Promise<boolean>;

  /**
   * Get provider name
   */
  getProvider(): AIProvider {
    return this.providerName;
  }

  /**
   * Get error count
   */
  getErrorCount(): number {
    return this.errorCount;
  }

  /**
   * Reset error count
   */
  resetErrorCount(): void {
    this.errorCount = 0;
    this.lastError = null;
  }

  /**
   * Increment error count
   */
  protected incrementErrorCount(): void {
    this.errorCount++;
    this.lastError = new Date();
  }

  /**
   * Check if provider is healthy (error rate threshold)
   */
  isHealthy(): boolean {
    // Consider unhealthy if more than 5 errors in last minute
    if (this.errorCount > 5 && this.lastError) {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      return this.lastError < oneMinuteAgo;
    }
    return true;
  }

  /**
   * Create AI error
   */
  protected createError(
    message: string,
    statusCode?: number,
    retryable: boolean = true,
    originalError?: Error
  ): AIError {
    const error = new Error(message) as AIError;
    error.provider = this.providerName;
    error.statusCode = statusCode;
    error.retryable = retryable;
    error.originalError = originalError;
    return error;
  }

  /**
   * Validate API key
   */
  protected validateConfig(): void {
    if (!this.config.apiKey) {
      throw this.createError(
        `API key not configured for ${this.providerName}`,
        undefined,
        false
      );
    }
  }
}
