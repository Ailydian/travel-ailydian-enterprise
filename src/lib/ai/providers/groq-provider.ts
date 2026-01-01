/**
 * Groq AI Provider
 * Primary provider using Llama 3.3-70B and 8B models
 */

import Groq from 'groq-sdk';
import { BaseAIProvider } from './base-provider';
import {
  AIMessage,
  AIRequestOptions,
  AIResponse,
  AIProvider,
  StreamCallback,
  AIProviderConfig,
} from './types';
import logger from '../../logger';

export class GroqProvider extends BaseAIProvider {
  private client: Groq;

  constructor(config: AIProviderConfig) {
    super(config, AIProvider.GROQ);
    this.validateConfig();

    this.client = new Groq({
      apiKey: config.apiKey,
    });
  }

  async chat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): Promise<AIResponse> {
    try {
      const startTime = Date.now();

      const completion = await this.client.chat.completions.create({
        model: options?.model || this.config.defaultModel,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
          ...(m.name && { name: m.name }),
        })),
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
        top_p: options?.topP ?? 1,
        frequency_penalty: options?.frequencyPenalty ?? 0,
        presence_penalty: options?.presencePenalty ?? 0,
        stop: options?.stop,
        stream: false,
      });

      const latency = Date.now() - startTime;

      const content = completion.choices[0]?.message?.content || '';

      logger.info('Groq AI response', {
        model: completion.model,
        latency,
        tokens: completion.usage?.total_tokens,
      });

      return {
        content,
        provider: AIProvider.GROQ,
        model: completion.model,
        finishReason: this.mapFinishReason(completion.choices[0]?.finish_reason),
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
      };
    } catch (error: any) {
      this.incrementErrorCount();
      logger.error('Groq provider error', error);

      throw this.createError(
        `Groq API error: ${error.message}`,
        error.status,
        error.status !== 401 && error.status !== 403,
        error
      );
    }
  }

  async streamChat(
    messages: AIMessage[],
    callback: StreamCallback,
    options?: AIRequestOptions
  ): Promise<void> {
    try {
      const stream = await this.client.chat.completions.create({
        model: options?.model || this.config.defaultModel,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
        stream: true,
      });

      let accumulated = '';

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        accumulated += delta;

        callback({
          delta,
          accumulated,
          done: chunk.choices[0]?.finish_reason !== null,
        });
      }
    } catch (error: any) {
      this.incrementErrorCount();
      logger.error('Groq streaming error', error);

      throw this.createError(
        `Groq streaming error: ${error.message}`,
        error.status,
        true,
        error
      );
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Simple health check with minimal token usage
      await this.client.chat.completions.create({
        model: this.config.fallbackModel || this.config.defaultModel,
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5,
      });

      this.resetErrorCount();
      return true;
    } catch (error) {
      logger.warn('Groq health check failed', { error });
      return false;
    }
  }

  private mapFinishReason(
    reason: string | undefined
  ): 'stop' | 'length' | 'content_filter' | 'error' {
    switch (reason) {
      case 'stop':
        return 'stop';
      case 'length':
        return 'length';
      case 'content_filter':
        return 'content_filter';
      default:
        return 'error';
    }
  }
}
