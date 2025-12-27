/**
 * WebSocket client for real-time collaborative features
 */

import { io, Socket } from 'socket.io-client';
import logger from '../../lib/logger';

interface WebSocketMessage {
  type: 'join' | 'leave' | 'update' | 'comment' | 'vote' | 'chat' | 'presence';
  data: any;
  userId: string;
  userName: string;
  timestamp: Date;
}

interface PresenceData {
  userId: string;
  userName: string;
  status: 'active' | 'idle' | 'offline';
  lastSeen: Date;
}

export class TripCollaborationClient {
  private socket: Socket | null = null;
  private tripId: string;
  private userId: string;
  private userName: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private presenceInterval: NodeJS.Timeout | null = null;

  constructor(tripId: string, userId: string, userName: string) {
    this.tripId = tripId;
    this.userId = userId;
    this.userName = userName;
  }

  /**
   * Connect to WebSocket server
   */
  connect(url: string = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3100'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(url, {
          auth: {
            tripId: this.tripId,
            userId: this.userId,
            userName: this.userName
          },
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: this.maxReconnectAttempts
        });

        this.socket.on('connect', () => {
          logger.debug('WebSocket connected');
          this.reconnectAttempts = 0;
          this.startPresenceHeartbeat();
          this.joinTrip();
          resolve();
        });

        this.socket.on('disconnect', (reason) => {
          logger.debug('WebSocket disconnected:', reason);
          this.stopPresenceHeartbeat();
        });

        this.socket.on('error', (error) => {
          logger.error('WebSocket error:', error);
          reject(error);
        });

        this.socket.on('reconnect', (attemptNumber) => {
          logger.debug('Reconnected after', attemptNumber, 'attempts');
          this.joinTrip();
        });

        this.socket.on('reconnect_failed', () => {
          logger.error('Failed to reconnect after maximum attempts');
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.leaveTrip();
      this.stopPresenceHeartbeat();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Join trip room
   */
  private joinTrip(): void {
    this.emit('join', {
      tripId: this.tripId,
      userId: this.userId,
      userName: this.userName,
      timestamp: new Date()
    });
  }

  /**
   * Leave trip room
   */
  private leaveTrip(): void {
    this.emit('leave', {
      tripId: this.tripId,
      userId: this.userId,
      timestamp: new Date()
    });
  }

  /**
   * Send update message
   */
  sendUpdate(data: any): void {
    this.emit('update', {
      tripId: this.tripId,
      ...data,
      timestamp: new Date()
    });
  }

  /**
   * Send comment
   */
  sendComment(comment: {
    content: string;
    activityId?: string;
    parentId?: string;
  }): void {
    this.emit('comment', {
      tripId: this.tripId,
      userId: this.userId,
      userName: this.userName,
      ...comment,
      timestamp: new Date()
    });
  }

  /**
   * Send vote
   */
  sendVote(vote: {
    activityId: string;
    voteType: 'upvote' | 'downvote' | 'interested' | 'not_interested';
  }): void {
    this.emit('vote', {
      tripId: this.tripId,
      userId: this.userId,
      userName: this.userName,
      ...vote,
      timestamp: new Date()
    });
  }

  /**
   * Send chat message
   */
  sendChatMessage(message: string): void {
    this.emit('chat', {
      tripId: this.tripId,
      userId: this.userId,
      userName: this.userName,
      message,
      timestamp: new Date()
    });
  }

  /**
   * Update presence status
   */
  updatePresence(status: 'active' | 'idle' | 'offline'): void {
    this.emit('presence', {
      tripId: this.tripId,
      userId: this.userId,
      userName: this.userName,
      status,
      timestamp: new Date()
    });
  }

  /**
   * Listen for incoming messages
   */
  onMessage(
    type: 'update' | 'comment' | 'vote' | 'chat' | 'presence' | 'join' | 'leave',
    callback: (data: any) => void
  ): void {
    if (!this.socket) return;
    this.socket.on(type, callback);
  }

  /**
   * Listen for presence updates
   */
  onPresenceUpdate(callback: (users: PresenceData[]) => void): void {
    if (!this.socket) return;
    this.socket.on('presence_update', callback);
  }

  /**
   * Listen for typing indicators
   */
  onTyping(callback: (data: { userId: string; userName: string; isTyping: boolean }) => void): void {
    if (!this.socket) return;
    this.socket.on('typing', callback);
  }

  /**
   * Send typing indicator
   */
  sendTyping(isTyping: boolean): void {
    this.emit('typing', {
      tripId: this.tripId,
      userId: this.userId,
      userName: this.userName,
      isTyping
    });
  }

  /**
   * Request trip sync
   */
  requestSync(): void {
    this.emit('sync_request', {
      tripId: this.tripId,
      userId: this.userId
    });
  }

  /**
   * Listen for sync response
   */
  onSyncResponse(callback: (data: any) => void): void {
    if (!this.socket) return;
    this.socket.on('sync_response', callback);
  }

  /**
   * Emit message to server
   */
  private emit(event: string, data: any): void {
    if (!this.socket) {
      logger.warn('WebSocket not connected, cannot emit:', event);
      return;
    }

    this.socket.emit(event, data);
  }

  /**
   * Start presence heartbeat
   */
  private startPresenceHeartbeat(): void {
    this.presenceInterval = setInterval(() => {
      this.updatePresence('active');
    }, 30000); // Every 30 seconds
  }

  /**
   * Stop presence heartbeat
   */
  private stopPresenceHeartbeat(): void {
    if (this.presenceInterval) {
      clearInterval(this.presenceInterval);
      this.presenceInterval = null;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Get socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

/**
 * Hook for using WebSocket in React components
 */
export function useTripCollaboration(
  tripId: string,
  userId: string,
  userName: string
) {
  const [client, setClient] = React.useState<TripCollaborationClient | null>(null);
  const [connected, setConnected] = React.useState(false);
  const [users, setUsers] = React.useState<PresenceData[]>([]);

  React.useEffect(() => {
    const collaborationClient = new TripCollaborationClient(tripId, userId, userName);

    collaborationClient.connect()
      .then(() => {
        setConnected(true);
        setClient(collaborationClient);

        // Listen for presence updates
        collaborationClient.onPresenceUpdate((updatedUsers) => {
          setUsers(updatedUsers);
        });
      })
      .catch((error) => {
        logger.error('Failed to connect to collaboration server:', error);
      });

    return () => {
      collaborationClient.disconnect();
      setConnected(false);
      setClient(null);
    };
  }, [tripId, userId, userName]);

  return {
    client,
    connected,
    users
  };
}

// React import for the hook (will be available in React components)
import * as React from 'react';
