/**
 * Conversation Memory & Context Management
 * Maintains conversation history with intelligent context window management
 */

import { AIMessage, ConversationContext, UserPreferences } from './providers/types';
import { LRUCache } from 'lru-cache';
import logger from '../logger';

interface ConversationSession {
  sessionId: string;
  userId?: string;
  createdAt: Date;
  lastActivityAt: Date;
  messages: AIMessage[];
  context: ConversationContext;
  metadata: Record<string, any>;
}

interface SessionStore {
  get(sessionId: string): ConversationSession | undefined;
  set(sessionId: string, session: ConversationSession): void;
  delete(sessionId: string): void;
  has(sessionId: string): boolean;
}

/**
 * LRU Cache-based session store
 */
class LRUSessionStore implements SessionStore {
  private cache: LRUCache<string, ConversationSession>;

  constructor(maxSessions: number = 1000, ttl: number = 3600000) {
    // TTL: 1 hour
    this.cache = new LRUCache({
      max: maxSessions,
      ttl,
      updateAgeOnGet: true,
      updateAgeOnHas: true,
    });
  }

  get(sessionId: string): ConversationSession | undefined {
    return this.cache.get(sessionId);
  }

  set(sessionId: string, session: ConversationSession): void {
    this.cache.set(sessionId, session);
  }

  delete(sessionId: string): void {
    this.cache.delete(sessionId);
  }

  has(sessionId: string): boolean {
    return this.cache.has(sessionId);
  }

  size(): number {
    return this.cache.size;
  }

  clear(): void {
    this.cache.clear();
  }
}

export class ConversationMemory {
  private store: SessionStore;
  private maxMessagesPerSession: number;
  private maxContextTokens: number;

  constructor(
    maxSessions: number = 1000,
    maxMessagesPerSession: number = 50,
    maxContextTokens: number = 8000
  ) {
    this.store = new LRUSessionStore(maxSessions);
    this.maxMessagesPerSession = maxMessagesPerSession;
    this.maxContextTokens = maxContextTokens;
  }

  /**
   * Create new conversation session
   */
  createSession(
    sessionId: string,
    userId?: string,
    locale: string = 'en',
    userPreferences?: UserPreferences
  ): ConversationSession {
    const session: ConversationSession = {
      sessionId,
      userId,
      createdAt: new Date(),
      lastActivityAt: new Date(),
      messages: [],
      context: {
        sessionId,
        userId,
        locale,
        conversationHistory: [],
        userPreferences,
      },
      metadata: {},
    };

    this.store.set(sessionId, session);
    logger.info('Created conversation session', { sessionId, userId });

    return session;
  }

  /**
   * Get existing session or create new one
   */
  getOrCreateSession(
    sessionId: string,
    userId?: string,
    locale?: string,
    userPreferences?: UserPreferences
  ): ConversationSession {
    const existing = this.store.get(sessionId);

    if (existing) {
      existing.lastActivityAt = new Date();

      // Update user preferences if provided
      if (userPreferences) {
        existing.context.userPreferences = {
          ...existing.context.userPreferences,
          ...userPreferences,
        };
      }

      this.store.set(sessionId, existing);
      return existing;
    }

    return this.createSession(sessionId, userId, locale, userPreferences);
  }

  /**
   * Add message to session
   */
  addMessage(
    sessionId: string,
    message: AIMessage,
    updateContext: boolean = true
  ): void {
    const session = this.store.get(sessionId);
    if (!session) {
      logger.warn('Session not found, creating new', { sessionId });
      const newSession = this.createSession(sessionId);
      newSession.messages.push(message);
      newSession.context.conversationHistory.push(message);
      this.store.set(sessionId, newSession);
      return;
    }

    session.messages.push(message);
    session.lastActivityAt = new Date();

    if (updateContext) {
      session.context.conversationHistory.push(message);
    }

    // Trim if exceeds max messages
    if (session.messages.length > this.maxMessagesPerSession) {
      session.messages = session.messages.slice(-this.maxMessagesPerSession);
    }

    // Intelligent context window management
    session.context.conversationHistory = this.optimizeContextWindow(
      session.context.conversationHistory
    );

    this.store.set(sessionId, session);
  }

  /**
   * Get conversation context for AI
   */
  getContext(sessionId: string): ConversationContext | null {
    const session = this.store.get(sessionId);
    if (!session) {
      return null;
    }

    return session.context;
  }

  /**
   * Get full session
   */
  getSession(sessionId: string): ConversationSession | null {
    return this.store.get(sessionId) || null;
  }

  /**
   * Update user preferences
   */
  updateUserPreferences(
    sessionId: string,
    preferences: Partial<UserPreferences>
  ): void {
    const session = this.store.get(sessionId);
    if (!session) return;

    session.context.userPreferences = {
      ...session.context.userPreferences,
      ...preferences,
    };

    session.lastActivityAt = new Date();
    this.store.set(sessionId, session);

    logger.debug('Updated user preferences', { sessionId, preferences });
  }

  /**
   * Add metadata to session
   */
  addMetadata(sessionId: string, key: string, value: any): void {
    const session = this.store.get(sessionId);
    if (!session) return;

    session.metadata[key] = value;
    session.lastActivityAt = new Date();
    this.store.set(sessionId, session);
  }

  /**
   * Clear session
   */
  clearSession(sessionId: string): void {
    this.store.delete(sessionId);
    logger.info('Cleared session', { sessionId });
  }

  /**
   * Get all messages in session
   */
  getMessages(sessionId: string): AIMessage[] {
    const session = this.store.get(sessionId);
    return session?.messages || [];
  }

  /**
   * Optimize context window to fit within token limits
   * Uses sliding window with importance-based retention
   */
  private optimizeContextWindow(messages: AIMessage[]): AIMessage[] {
    // Simple heuristic: keep system message + recent messages
    if (messages.length === 0) return [];

    // Always keep system message
    const systemMessage = messages.find(m => m.role === 'system');
    const otherMessages = messages.filter(m => m.role !== 'system');

    // Estimate tokens (rough: 1 token ≈ 4 chars)
    const estimateTokens = (msg: AIMessage) => Math.ceil(msg.content.length / 4);

    let totalTokens = systemMessage ? estimateTokens(systemMessage) : 0;
    const result: AIMessage[] = systemMessage ? [systemMessage] : [];

    // Add messages from most recent, stop when hitting token limit
    for (let i = otherMessages.length - 1; i >= 0; i--) {
      const msg = otherMessages[i];
      const tokens = estimateTokens(msg);

      if (totalTokens + tokens > this.maxContextTokens) {
        break;
      }

      result.unshift(msg);
      totalTokens += tokens;
    }

    return result;
  }

  /**
   * Extract user preferences from conversation
   */
  extractPreferencesFromHistory(sessionId: string): Partial<UserPreferences> {
    const session = this.store.get(sessionId);
    if (!session) return {};

    const preferences: Partial<UserPreferences> = {
      interests: [],
      destinations: [],
      searchHistory: [],
    };

    // Analyze messages for implicit preferences
    session.messages.forEach(msg => {
      if (msg.role === 'user') {
        const lower = msg.content.toLowerCase();

        // Extract destinations
        const destinations = [
          'istanbul',
          'cappadocia',
          'antalya',
          'bodrum',
          'izmir',
          'fethiye',
          'pamukkale',
        ];
        destinations.forEach(dest => {
          if (lower.includes(dest) && !preferences.destinations?.includes(dest)) {
            preferences.destinations?.push(dest);
          }
        });

        // Extract interests
        const interests = [
          'beach',
          'history',
          'culture',
          'adventure',
          'luxury',
          'budget',
          'family',
          'romantic',
        ];
        interests.forEach(interest => {
          if (lower.includes(interest) && !preferences.interests?.includes(interest)) {
            preferences.interests?.push(interest);
          }
        });

        // Add to search history
        if (msg.content.length > 10) {
          preferences.searchHistory?.push(msg.content);
        }
      }
    });

    return preferences;
  }

  /**
   * Get conversation summary
   */
  getSummary(sessionId: string): {
    messageCount: number;
    duration: number;
    topics: string[];
    userEngagement: number;
  } {
    const session = this.store.get(sessionId);
    if (!session) {
      return {
        messageCount: 0,
        duration: 0,
        topics: [],
        userEngagement: 0,
      };
    }

    const duration =
      session.lastActivityAt.getTime() - session.createdAt.getTime();
    const messageCount = session.messages.length;
    const userMessages = session.messages.filter(m => m.role === 'user').length;

    return {
      messageCount,
      duration,
      topics: Array.from(
        new Set(session.context.userPreferences?.destinations || [])
      ),
      userEngagement: messageCount > 0 ? userMessages / messageCount : 0,
    };
  }

  /**
   * Export session for analysis
   */
  exportSession(sessionId: string): any {
    const session = this.store.get(sessionId);
    if (!session) return null;

    return {
      sessionId: session.sessionId,
      userId: session.userId,
      createdAt: session.createdAt.toISOString(),
      lastActivityAt: session.lastActivityAt.toISOString(),
      messageCount: session.messages.length,
      messages: session.messages,
      context: session.context,
      metadata: session.metadata,
      summary: this.getSummary(sessionId),
    };
  }
}

// Singleton instance
let conversationMemoryInstance: ConversationMemory | null = null;

export function getConversationMemory(): ConversationMemory {
  if (!conversationMemoryInstance) {
    conversationMemoryInstance = new ConversationMemory(
      1000, // max sessions
      50, // max messages per session
      8000 // max context tokens
    );
  }

  return conversationMemoryInstance;
}
