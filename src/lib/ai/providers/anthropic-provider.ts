/**
 * Anthropic Claude Provider
 * Secondary fallback using Claude 3 models
 */

import Anthropic from '@anthropic-ai/sdk';
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

export class AnthropicProvider extends BaseAIProvider {
  private client: Anthropic;

  constructor(config: AIProviderConfig) {
    super(config, AIProvider.ANTHROPIC);
    this.validateConfig();

    this.client = new Anthropic({
      apiKey: config.apiKey,
    });
  }

  async chat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): Promise<AIResponse> {
    try {
      const startTime = Date.now();

      // Extract system message
      const systemMessage = messages.find(m => m.role === 'system');
      const conversationMessages = messages.filter(m => m.role !== 'system');

      const completion = await this.client.messages.create({
        model: options?.model || this.config.defaultModel,
        system: systemMessage?.content || undefined,
        messages: conversationMessages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
        top_p: options?.topP ?? 1,
        stop_sequences: options?.stop,
      });

      const latency = Date.now() - startTime;

      const content =
        completion.content[0]?.type === 'text'
          ? completion.content[0].text
          : '';

      logger.info('Anthropic response', {
        model: completion.model,
        latency,
        tokens: completion.usage?.output_tokens,
      });

      return {
        content,
        provider: AIProvider.ANTHROPIC,
        model: completion.model,
        finishReason: this.mapFinishReason(completion.stop_reason),
        usage: {
          promptTokens: completion.usage?.input_tokens || 0,
          completionTokens: completion.usage?.output_tokens || 0,
          totalTokens:
            (completion.usage?.input_tokens || 0) +
            (completion.usage?.output_tokens || 0),
        },
      };
    } catch (error: any) {
      this.incrementErrorCount();
      logger.error('Anthropic provider error', error);

      throw this.createError(
        `Anthropic API error: ${error.message}`,
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
      const systemMessage = messages.find(m => m.role === 'system');
      const conversationMessages = messages.filter(m => m.role !== 'system');

      const stream = await this.client.messages.create({
        model: options?.model || this.config.defaultModel,
        system: systemMessage?.content || undefined,
        messages: conversationMessages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
        stream: true,
      });

      let accumulated = '';

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          const delta = event.delta.text;
          accumulated += delta;

          callback({
            delta,
            accumulated,
            done: false,
          });
        } else if (event.type === 'message_stop') {
          callback({
            delta: '',
            accumulated,
            done: true,
          });
        }
      }
    } catch (error: any) {
      this.incrementErrorCount();
      logger.error('Anthropic streaming error', error);

      throw this.createError(
        `Anthropic streaming error: ${error.message}`,
        error.status,
        true,
        error
      );
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.messages.create({
        model: this.config.fallbackModel || this.config.defaultModel,
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5,
      });

      this.resetErrorCount();
      return true;
    } catch (error) {
      logger.warn('Anthropic health check failed', { error });
      return false;
    }
  }

  private mapFinishReason(
    reason: string | null
  ): 'stop' | 'length' | 'content_filter' | 'error' {
    switch (reason) {
      case 'end_turn':
        return 'stop';
      case 'max_tokens':
        return 'length';
      case 'stop_sequence':
        return 'stop';
      default:
        return 'error';
    }
  }
}
