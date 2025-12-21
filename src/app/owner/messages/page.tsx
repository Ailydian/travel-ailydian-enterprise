'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useConversations, useMessages, useSendMessage, useMarkAsRead } from '@/hooks/useDashboardHooks';
import { useMessageStore } from '@/stores/dashboardStore';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Archive,
  Pin,
  Check,
  CheckCheck,
  Clock,
  Smile,
  Image as ImageIcon,
  File,
  MessageSquare
} from 'lucide-react';

// Conversation Item Component
interface ConversationItemProps {
  conversation: {
    id: string;
    guestName: string;
    guestAvatar?: string;
    propertyName: string;
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    isPinned: boolean;
  };
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
        isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {conversation.guestName.charAt(0)}
          </div>
          {conversation.unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {conversation.unreadCount}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900 truncate">{conversation.guestName}</h4>
            <div className="flex items-center gap-1">
              {conversation.isPinned && <Pin className="w-3.5 h-3.5 text-blue-600" />}
              <span className="text-xs text-gray-500">{timeAgo(conversation.lastMessageTime)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">{conversation.propertyName}</p>
          <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
        </div>
      </div>
    </button>
  );
};

// Message Bubble Component
interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    createdAt: Date;
    senderType: 'host' | 'guest';
    senderName: string;
    isRead: boolean;
  };
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {!isOwnMessage && (
          <p className="text-xs text-gray-500 mb-1 ml-1">{message.senderName}</p>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isOwnMessage
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">
            {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isOwnMessage && (
            <span>
              {message.isRead ? (
                <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
              ) : (
                <Check className="w-3.5 h-3.5 text-gray-400" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Message Composer Component
interface MessageComposerProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-2">
        <button
          type="button"
          className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Quick Replies
        </button>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Templates
        </button>
      </div>
    </form>
  );
};

// Conversation Header Component
interface ConversationHeaderProps {
  conversation: {
    guestName: string;
    propertyName: string;
  } | null;
  onArchive: () => void;
  onPin: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation, onArchive, onPin }) => {
  if (!conversation) return null;

  return (
    <div className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {conversation.guestName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{conversation.guestName}</h3>
            <p className="text-sm text-gray-500">{conversation.propertyName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Video call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            onClick={onPin}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Pin conversation"
          >
            <Pin className="w-5 h-5" />
          </button>
          <button
            onClick={onArchive}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Archive"
          >
            <Archive className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC = () => (
  <div className="flex-1 flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Conversation Selected</h3>
      <p className="text-gray-500">Select a conversation from the list to start messaging</p>
    </div>
  </div>
);

// Main Messages Component
const MessagesPage: React.FC = () => {
  const { data: conversations, isLoading } = useConversations();
  const { mutate: sendMessage } = useSendMessage();
  const { mutate: markAsRead } = useMarkAsRead();
  const { currentConversationId, setCurrentConversation } = useMessageStore();
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const mockConversations = [
    {
      id: '1',
      guestName: 'Sarah Johnson',
      propertyName: 'Beachfront Villa',
      lastMessage: 'What time is check-in tomorrow?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 2,
      isPinned: true,
      isArchived: false,
      guestId: 'guest-1',
      guestEmail: 'sarah.j@email.com',
      propertyId: 'prop-1',
    },
    {
      id: '2',
      guestName: 'Michael Chen',
      propertyName: 'Mountain Cabin',
      lastMessage: 'Thanks for the quick response!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      guestId: 'guest-2',
      guestEmail: 'michael.c@email.com',
      propertyId: 'prop-2',
    },
    {
      id: '3',
      guestName: 'Emma Wilson',
      propertyName: 'City Apartment',
      lastMessage: 'Is parking included?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 1,
      isPinned: false,
      isArchived: false,
      guestId: 'guest-3',
      guestEmail: 'emma.w@email.com',
      propertyId: 'prop-3',
    },
  ];

  const mockMessages: Record<string, any[]> = {
    '1': [
      {
        id: 'm1',
        conversationId: '1',
        senderId: 'guest-1',
        senderType: 'guest',
        senderName: 'Sarah Johnson',
        content: 'Hi! I just booked your Beachfront Villa for next week. I\'m so excited!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
        isRead: true,
      },
      {
        id: 'm2',
        conversationId: '1',
        senderId: 'host',
        senderType: 'host',
        senderName: 'You',
        content: 'Welcome Sarah! We\'re thrilled to host you. Let me know if you have any questions.',
        createdAt: new Date(Date.now() - 1000 * 60 * 50),
        isRead: true,
      },
      {
        id: 'm3',
        conversationId: '1',
        senderId: 'guest-1',
        senderType: 'guest',
        senderName: 'Sarah Johnson',
        content: 'What time is check-in tomorrow?',
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
        isRead: false,
      },
    ],
    '2': [
      {
        id: 'm4',
        conversationId: '2',
        senderId: 'guest-2',
        senderType: 'guest',
        senderName: 'Michael Chen',
        content: 'Can I check in early?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        isRead: true,
      },
      {
        id: 'm5',
        conversationId: '2',
        senderId: 'host',
        senderType: 'host',
        senderName: 'You',
        content: 'Yes, early check-in is available for a small fee of $25. Would you like me to arrange that?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
        isRead: true,
      },
      {
        id: 'm6',
        conversationId: '2',
        senderId: 'guest-2',
        senderType: 'guest',
        senderName: 'Michael Chen',
        content: 'Thanks for the quick response!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
      },
    ],
  };

  const displayConversations = conversations || mockConversations;
  const filteredConversations = displayConversations.filter((conv) =>
    conv.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversation = currentConversationId
    ? displayConversations.find((c) => c.id === currentConversationId)
    : null;

  const messages = currentConversationId ? mockMessages[currentConversationId] || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversation(conversationId);
    markAsRead(conversationId);
  };

  const handleSendMessage = (content: string) => {
    if (currentConversationId) {
      sendMessage({ conversationId: currentConversationId, content });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-black mb-6 text-black">
          Messages
        </h1>
        <div className="animate-pulse flex h-[calc(100vh-200px)]">
          <div className="w-1/3 border-r border-gray-200 bg-gray-200"></div>
          <div className="flex-1 bg-gray-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black mb-6 text-black">
        Messages
      </h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          {/* Conversations Sidebar */}
          <div className="w-full md:w-96 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === currentConversationId}
                    onClick={() => handleSelectConversation(conversation.id)}
                  />
                ))
              ) : (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col">
              <ConversationHeader
                conversation={activeConversation}
                onArchive={() => console.log('Archive')}
                onPin={() => console.log('Pin')}
              />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.length > 0 ? (
                  <>
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        isOwnMessage={message.senderType === 'host'}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No messages yet</p>
                      <p className="text-sm text-gray-400 mt-1">Start the conversation!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Composer */}
              <MessageComposer onSendMessage={handleSendMessage} />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
