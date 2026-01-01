/**
 * Conversation Memory Tests
 */

import { ConversationMemory } from '../conversation-memory';
import { AIMessage } from '../providers/types';

describe('ConversationMemory', () => {
  let memory: ConversationMemory;

  beforeEach(() => {
    memory = new ConversationMemory(100, 50, 8000);
  });

  describe('session management', () => {
    it('should create new session', () => {
      const session = memory.createSession('test-session-1', 'user-1', 'en');

      expect(session).toBeDefined();
      expect(session.sessionId).toBe('test-session-1');
      expect(session.userId).toBe('user-1');
      expect(session.context.locale).toBe('en');
    });

    it('should get or create session', () => {
      const session1 = memory.getOrCreateSession('test-session-2');
      const session2 = memory.getOrCreateSession('test-session-2');

      expect(session1.sessionId).toBe(session2.sessionId);
      expect(session1.createdAt).toEqual(session2.createdAt);
    });

    it('should clear session', () => {
      memory.createSession('test-session-3');
      memory.clearSession('test-session-3');

      const session = memory.getSession('test-session-3');
      expect(session).toBeNull();
    });
  });

  describe('message management', () => {
    it('should add messages to session', () => {
      const sessionId = 'test-session-4';
      memory.createSession(sessionId);

      const message: AIMessage = {
        role: 'user',
        content: 'Test message',
      };

      memory.addMessage(sessionId, message);

      const messages = memory.getMessages(sessionId);
      expect(messages).toHaveLength(1);
      expect(messages[0].content).toBe('Test message');
    });

    it('should maintain conversation history', () => {
      const sessionId = 'test-session-5';
      memory.createSession(sessionId);

      for (let i = 0; i < 10; i++) {
        memory.addMessage(sessionId, {
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
        });
      }

      const messages = memory.getMessages(sessionId);
      expect(messages).toHaveLength(10);
    });

    it('should limit max messages', () => {
      const sessionId = 'test-session-6';
      memory.createSession(sessionId);

      // Add 100 messages (over the limit of 50)
      for (let i = 0; i < 100; i++) {
        memory.addMessage(sessionId, {
          role: 'user',
          content: `Message ${i}`,
        });
      }

      const messages = memory.getMessages(sessionId);
      expect(messages.length).toBeLessThanOrEqual(50);
    });
  });

  describe('user preferences', () => {
    it('should update user preferences', () => {
      const sessionId = 'test-session-7';
      memory.createSession(sessionId);

      memory.updateUserPreferences(sessionId, {
        budget: { min: 100, max: 1000, currency: 'USD' },
        interests: ['history', 'culture'],
      });

      const session = memory.getSession(sessionId);
      expect(session?.context.userPreferences?.budget).toBeDefined();
      expect(session?.context.userPreferences?.interests).toContain('history');
    });

    it('should extract preferences from history', () => {
      const sessionId = 'test-session-8';
      memory.createSession(sessionId);

      memory.addMessage(sessionId, {
        role: 'user',
        content: 'I want to visit Istanbul and Cappadocia',
      });

      memory.addMessage(sessionId, {
        role: 'user',
        content: 'I love history and culture',
      });

      const preferences = memory.extractPreferencesFromHistory(sessionId);

      expect(preferences.destinations).toContain('istanbul');
      expect(preferences.interests).toContain('history');
    });
  });

  describe('conversation summary', () => {
    it('should generate summary', () => {
      const sessionId = 'test-session-9';
      memory.createSession(sessionId);

      memory.addMessage(sessionId, { role: 'user', content: 'Hello' });
      memory.addMessage(sessionId, { role: 'assistant', content: 'Hi!' });

      const summary = memory.getSummary(sessionId);

      expect(summary.messageCount).toBe(2);
      expect(summary.userEngagement).toBeGreaterThan(0);
    });
  });

  describe('export', () => {
    it('should export session data', () => {
      const sessionId = 'test-session-10';
      memory.createSession(sessionId, 'user-1');

      memory.addMessage(sessionId, { role: 'user', content: 'Test' });

      const exported = memory.exportSession(sessionId);

      expect(exported).toBeDefined();
      expect(exported.sessionId).toBe(sessionId);
      expect(exported.userId).toBe('user-1');
      expect(exported.messages).toBeInstanceOf(Array);
      expect(exported.summary).toBeDefined();
    });
  });
});
