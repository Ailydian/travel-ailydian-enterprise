/**
 * Multi-Provider AI Manager
 * Orchestrates multiple AI providers with intelligent fallback
 */

import {
  BaseAIProvider,
  GroqProvider,
  OpenAIProvider,
  AnthropicProvider,
  AIProvider,
  AIModel,
  AIMessage,
  AIRequestOptions,
  AIResponse,
  StreamCallback,
  AIProviderConfig,
  ProviderHealthCheck,
} from './providers';
import logger from '../logger';

interface ProviderManagerConfig {
  primaryProvider: AIProvider;
  fallbackProviders: AIProvider[];
  healthCheckInterval?: number; // ms
  maxRetries?: number;
}

export class AIProviderManager {
  private providers: Map<AIProvider, BaseAIProvider> = new Map();
  private healthStatus: Map<AIProvider, ProviderHealthCheck> = new Map();
  private config: ProviderManagerConfig;
  private healthCheckInterval?: NodeJS.Timeout;

  constructor(config: ProviderManagerConfig) {
    this.config = {
      healthCheckInterval: 60000, // 1 minute
      maxRetries: 3,
      ...config,
    };

    this.initializeProviders();
    this.startHealthChecks();
  }

  /**
   * Initialize all configured providers
   */
  private initializeProviders(): void {
    const providers: Partial<Record<AIProvider, AIProviderConfig>> = {
      [AIProvider.GROQ]: {
        apiKey: process.env.GROQ_API_KEY || '',
        defaultModel: AIModel.GROQ_LLAMA_70B,
        fallbackModel: AIModel.GROQ_LLAMA_8B,
        maxRetries: 2,
      },
      [AIProvider.OPENAI]: {
        apiKey: process.env.OPENAI_API_KEY || '',
        defaultModel: AIModel.OPENAI_GPT4_TURBO,
        fallbackModel: AIModel.OPENAI_GPT35_TURBO,
        maxRetries: 2,
      },
      [AIProvider.ANTHROPIC]: {
        apiKey: process.env.ANTHROPIC_API_KEY || '',
        defaultModel: AIModel.ANTHROPIC_CLAUDE_3_SONNET,
        fallbackModel: AIModel.ANTHROPIC_CLAUDE_3_HAIKU,
        maxRetries: 2,
      },
    };

    // Initialize primary provider
    this.initializeProvider(this.config.primaryProvider, providers);

    // Initialize fallback providers
    this.config.fallbackProviders.forEach(provider => {
      this.initializeProvider(provider, providers);
    });

    logger.info('AI Provider Manager initialized', {
      primary: this.config.primaryProvider,
      fallbacks: this.config.fallbackProviders,
      providersCount: this.providers.size,
    });
  }

  /**
   * Initialize single provider
   */
  private initializeProvider(
    provider: AIProvider,
    configs: Partial<Record<AIProvider, AIProviderConfig>>
  ): void {
    const config = configs[provider];
    if (!config || !config.apiKey) {
      logger.warn(`Skipping ${provider} - API key not configured`);
      return;
    }

    try {
      let providerInstance: BaseAIProvider;

      switch (provider) {
        case AIProvider.GROQ:
          providerInstance = new GroqProvider(config);
          break;
        case AIProvider.OPENAI:
          providerInstance = new OpenAIProvider(config);
          break;
        case AIProvider.ANTHROPIC:
          providerInstance = new AnthropicProvider(config);
          break;
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }

      this.providers.set(provider, providerInstance);
      this.healthStatus.set(provider, {
        provider,
        healthy: true,
        lastChecked: new Date(),
        errorCount: 0,
      });

      logger.info(`Initialized ${provider} provider`);
    } catch (error) {
      logger.error(`Failed to initialize ${provider}`, error as Error);
    }
  }

  /**
   * Send chat request with automatic fallback
   */
  async chat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): Promise<AIResponse> {
    const providers = this.getProviderPriorityList();

    for (const provider of providers) {
      try {
        const providerInstance = this.providers.get(provider);
        if (!providerInstance || !providerInstance.isHealthy()) {
          continue;
        }

        logger.debug(`Attempting chat with ${provider}`);
        const response = await providerInstance.chat(messages, options);

        // Update health status
        this.updateHealthStatus(provider, true);

        return response;
      } catch (error: any) {
        logger.warn(`${provider} failed, trying next provider`, {
          error: error.message,
        });

        // Update health status
        this.updateHealthStatus(provider, false);

        // Continue to next provider
        continue;
      }
    }

    // All providers failed
    throw new Error('All AI providers failed. Please try again later.');
  }

  /**
   * Stream chat with automatic fallback
   */
  async streamChat(
    messages: AIMessage[],
    callback: StreamCallback,
    options?: AIRequestOptions
  ): Promise<void> {
    const providers = this.getProviderPriorityList();

    for (const provider of providers) {
      try {
        const providerInstance = this.providers.get(provider);
        if (!providerInstance || !providerInstance.isHealthy()) {
          continue;
        }

        logger.debug(`Attempting stream chat with ${provider}`);
        await providerInstance.streamChat(messages, callback, options);

        // Update health status
        this.updateHealthStatus(provider, true);

        return;
      } catch (error: any) {
        logger.warn(`${provider} streaming failed, trying next provider`, {
          error: error.message,
        });

        // Update health status
        this.updateHealthStatus(provider, false);

        // Continue to next provider
        continue;
      }
    }

    // All providers failed
    throw new Error('All AI providers failed for streaming. Please try again later.');
  }

  /**
   * Get provider priority list (primary first, then fallbacks)
   */
  private getProviderPriorityList(): AIProvider[] {
    return [this.config.primaryProvider, ...this.config.fallbackProviders];
  }

  /**
   * Update provider health status
   */
  private updateHealthStatus(provider: AIProvider, success: boolean): void {
    const status = this.healthStatus.get(provider);
    if (!status) return;

    status.lastChecked = new Date();

    if (success) {
      status.healthy = true;
      status.errorCount = 0;
    } else {
      status.errorCount++;
      // Mark unhealthy after 3 consecutive errors
      if (status.errorCount >= 3) {
        status.healthy = false;
      }
    }

    this.healthStatus.set(provider, status);
  }

  /**
   * Start background health checks
   */
  private startHealthChecks(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthChecks();
    }, this.config.healthCheckInterval);
  }

  /**
   * Perform health checks on all providers
   */
  private async performHealthChecks(): Promise<void> {
    const checks = Array.from(this.providers.entries()).map(
      async ([provider, instance]) => {
        const startTime = Date.now();
        try {
          const healthy = await instance.healthCheck();
          const latency = Date.now() - startTime;

          this.healthStatus.set(provider, {
            provider,
            healthy,
            latency,
            lastChecked: new Date(),
            errorCount: healthy ? 0 : (this.healthStatus.get(provider)?.errorCount || 0) + 1,
          });

          logger.debug(`Health check ${provider}:`, { healthy, latency });
        } catch (error) {
          logger.warn(`Health check failed for ${provider}`, error as Error);

          const status = this.healthStatus.get(provider);
          if (status) {
            status.healthy = false;
            status.errorCount++;
            status.lastChecked = new Date();
            this.healthStatus.set(provider, status);
          }
        }
      }
    );

    await Promise.allSettled(checks);
  }

  /**
   * Get current health status of all providers
   */
  getHealthStatus(): ProviderHealthCheck[] {
    return Array.from(this.healthStatus.values());
  }

  /**
   * Get specific provider instance
   */
  getProvider(provider: AIProvider): BaseAIProvider | undefined {
    return this.providers.get(provider);
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }
}

// Singleton instance
let providerManagerInstance: AIProviderManager | null = null;

export function getProviderManager(): AIProviderManager {
  if (!providerManagerInstance) {
    providerManagerInstance = new AIProviderManager({
      primaryProvider: AIProvider.GROQ,
      fallbackProviders: [AIProvider.OPENAI, AIProvider.ANTHROPIC],
      healthCheckInterval: 60000,
      maxRetries: 3,
    });
  }

  return providerManagerInstance;
}
