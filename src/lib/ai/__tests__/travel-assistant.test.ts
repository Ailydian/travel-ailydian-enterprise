/**
 * Travel Assistant Service Tests
 */

import { TravelAssistantService } from '../travel-assistant-service';
import { getConversationMemory } from '../conversation-memory';

// Mock provider manager
jest.mock('../provider-manager', () => ({
  getProviderManager: jest.fn(() => ({
    chat: jest.fn().mockResolvedValue({
      content: 'Test AI response',
      provider: 'groq',
      model: 'llama-3.3-70b-versatile',
      finishReason: 'stop',
      usage: {
        promptTokens: 100,
        completionTokens: 50,
        totalTokens: 150,
      },
    }),
    streamChat: jest.fn(),
  })),
}));

describe('TravelAssistantService', () => {
  let service: TravelAssistantService;

  beforeEach(() => {
    service = new TravelAssistantService();
  });

  describe('chat', () => {
    it('should handle basic chat request', async () => {
      const response = await service.chat({
        message: 'Tell me about Istanbul',
        sessionId: 'test-session',
        locale: 'en',
      });

      expect(response).toBeDefined();
      expect(response.message).toBe('Test AI response');
      expect(response.confidence).toBeGreaterThan(0);
      expect(response.suggestions).toBeInstanceOf(Array);
      expect(response.actions).toBeInstanceOf(Array);
    });

    it('should maintain conversation context', async () => {
      const sessionId = 'test-session-2';

      // First message
      await service.chat({
        message: 'I want to visit Turkey',
        sessionId,
        locale: 'en',
      });

      // Second message
      const response = await service.chat({
        message: 'What about Istanbul?',
        sessionId,
        locale: 'en',
      });

      const memory = getConversationMemory();
      const session = memory.getSession(sessionId);

      expect(session).toBeDefined();
      expect(session?.messages.length).toBeGreaterThan(2);
    });

    it('should handle user preferences', async () => {
      const response = await service.chat({
        message: 'Recommend hotels',
        sessionId: 'test-session-3',
        locale: 'en',
        userPreferences: {
          budget: {
            min: 100,
            max: 500,
            currency: 'USD',
          },
          destinations: ['Istanbul'],
        },
      });

      expect(response).toBeDefined();
    });
  });

  describe('getRecommendations', () => {
    it('should return recommendations based on preferences', async () => {
      const recommendations = await service.getRecommendations({
        budget: {
          min: 100,
          max: 1000,
          currency: 'USD',
        },
        interests: ['history', 'culture'],
        destinations: ['Istanbul', 'Cappadocia'],
      });

      expect(recommendations).toBeInstanceOf(Array);
    });
  });

  describe('answerQuestion', () => {
    it('should answer travel questions', async () => {
      const answer = await service.answerQuestion(
        'What is the best time to visit Turkey?',
        'test-session-4',
        'en'
      );

      expect(answer).toBeDefined();
      expect(typeof answer).toBe('string');
    });
  });

  describe('session management', () => {
    it('should clear session', () => {
      const sessionId = 'test-session-5';

      service.chat({
        message: 'Test',
        sessionId,
        locale: 'en',
      });

      service.clearSession(sessionId);

      const memory = getConversationMemory();
      const session = memory.getSession(sessionId);

      expect(session).toBeNull();
    });

    it('should export conversation', async () => {
      const sessionId = 'test-session-6';

      await service.chat({
        message: 'Test export',
        sessionId,
        locale: 'en',
      });

      const exported = service.exportConversation(sessionId);

      expect(exported).toBeDefined();
      expect(exported.sessionId).toBe(sessionId);
      expect(exported.messages).toBeInstanceOf(Array);
    });
  });
});
