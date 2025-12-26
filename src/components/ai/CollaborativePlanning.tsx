import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Link2,
  Check,
  X,
  Send,
  DollarSign,
  Calculator,
  Bell,
  Eye,
  Edit3,
  Heart,
  Star,
  MapPin,
  Calendar,
  Clock,
  MoreVertical,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'offline';
  lastSeen?: Date;
  permissions: string[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  activityId?: string;
  replies?: Comment[];
}

interface Vote {
  id: string;
  userId: string;
  userName: string;
  activityId: string;
  voteType: 'upvote' | 'downvote' | 'interested' | 'not_interested';
  timestamp: Date;
}

interface WishlistItem {
  id: string;
  title: string;
  description: string;
  location: string;
  cost: number;
  addedBy: string;
  addedAt: Date;
  votes: number;
  category: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'activity' | 'vote' | 'system';
}

interface CostSplit {
  userId: string;
  userName: string;
  amount: number;
  paid: boolean;
}

interface CollaborativePlanningProps {
  tripId: string;
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

const CollaborativePlanning: React.FC<CollaborativePlanningProps> = ({ tripId, currentUser }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [activeTab, setActiveTab] = useState<'collaborators' | 'chat' | 'votes' | 'wishlist' | 'costs'>('collaborators');
  const [costSplits, setCostSplits] = useState<CostSplit[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    // const ws = new WebSocket(`wss://your-server.com/trips/${tripId}`);

    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   handleRealtimeUpdate(data);
    // };

    // Load initial data
    loadCollaborators();
    loadComments();
    loadVotes();
    loadWishlist();
    loadChatMessages();
    generateShareLink();

    // return () => ws.close();
  }, [tripId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const loadCollaborators = async () => {
    // Mock data - replace with API call
    setCollaborators([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'owner',
        status: 'active',
        permissions: ['edit', 'delete', 'invite']
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'editor',
        status: 'active',
        permissions: ['edit', 'comment', 'vote']
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'viewer',
        status: 'pending',
        permissions: ['view', 'comment', 'vote']
      }
    ]);
  };

  const loadComments = async () => {
    // Mock data
    setComments([
      {
        id: '1',
        userId: '2',
        userName: 'Jane Smith',
        content: 'I love this activity! Let\'s definitely add it to our itinerary.',
        timestamp: new Date(Date.now() - 3600000),
        replies: []
      }
    ]);
  };

  const loadVotes = async () => {
    // Mock data
    setVotes([
      {
        id: '1',
        userId: '2',
        userName: 'Jane Smith',
        activityId: 'act1',
        voteType: 'interested',
        timestamp: new Date()
      }
    ]);
  };

  const loadWishlist = async () => {
    // Mock data
    setWishlist([
      {
        id: '1',
        title: 'Hot Air Balloon Ride',
        description: 'Sunrise hot air balloon experience',
        location: 'Cappadocia',
        cost: 150,
        addedBy: 'Jane Smith',
        addedAt: new Date(),
        votes: 3,
        category: 'Activity'
      }
    ]);
  };

  const loadChatMessages = async () => {
    // Mock data
    setChatMessages([
      {
        id: '1',
        userId: '2',
        userName: 'Jane Smith',
        message: 'Hey everyone! Excited about this trip!',
        timestamp: new Date(Date.now() - 7200000),
        type: 'text'
      }
    ]);
  };

  const generateShareLink = async () => {
    const link = `${window.location.origin}/trip/${tripId}/join`;
    setShareLink(link);
  };

  const inviteCollaborator = async () => {
    if (!inviteEmail) return;

    try {
      const response = await fetch('/api/trips/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId,
          email: inviteEmail,
          role: 'editor'
        })
      });

      if (response.ok) {
        setInviteEmail('');
        setShowInviteModal(false);
        loadCollaborators();
      }
    } catch (error) {
      console.error('Failed to invite collaborator:', error);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newComment,
      timestamp: new Date(),
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');

    // Send via WebSocket
    // ws.send(JSON.stringify({ type: 'comment', data: comment }));
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');

    // Send via WebSocket
    // ws.send(JSON.stringify({ type: 'chat', data: message }));
  };

  const voteOnActivity = async (activityId: string, voteType: 'upvote' | 'downvote' | 'interested' | 'not_interested') => {
    const vote: Vote = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      activityId,
      voteType,
      timestamp: new Date()
    };

    setVotes([...votes, vote]);

    try {
      await fetch('/api/trips/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId, ...vote })
      });
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const addToWishlist = async (item: Omit<WishlistItem, 'id' | 'addedBy' | 'addedAt' | 'votes'>) => {
    const wishlistItem: WishlistItem = {
      ...item,
      id: Date.now().toString(),
      addedBy: currentUser.name,
      addedAt: new Date(),
      votes: 0
    };

    setWishlist([...wishlist, wishlistItem]);
  };

  const calculateCostSplit = () => {
    const perPerson = totalCost / collaborators.filter(c => c.status === 'active').length;
    const splits: CostSplit[] = collaborators
      .filter(c => c.status === 'active')
      .map(c => ({
        userId: c.id,
        userName: c.name,
        amount: perPerson,
        paid: false
      }));

    setCostSplits(splits);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    // Show toast notification
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400';
      case 'pending': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'editor': return Edit3;
      case 'viewer': return Eye;
      default: return Users;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Collaborative Planning</h2>
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Invite
              </button>
            </div>

            {/* Share Link */}
            <div className="bg-purple-50 rounded-lg p-4 flex items-center gap-3">
              <Link2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-200"
              />
              <button
                onClick={copyShareLink}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <div className="flex gap-2 border-b border-white/10 mb-6 overflow-x-auto">
              {[
                { key: 'collaborators', label: 'Collaborators', icon: Users },
                { key: 'chat', label: 'Group Chat', icon: MessageCircle },
                { key: 'votes', label: 'Votes', icon: ThumbsUp },
                { key: 'wishlist', label: 'Wishlist', icon: Heart },
                { key: 'costs', label: 'Split Costs', icon: Calculator }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* Collaborators Tab */}
              {activeTab === 'collaborators' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {collaborators.map((collaborator) => {
                    const RoleIcon = getRoleIcon(collaborator.role);
                    return (
                      <div
                        key={collaborator.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                              {collaborator.name.charAt(0)}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(collaborator.status)} rounded-full border-2 border-white`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">{collaborator.name}</span>
                              <RoleIcon className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-sm text-gray-300">{collaborator.email}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                collaborator.status === 'active' ? 'bg-green-100 text-green-700' :
                                collaborator.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-white/10 text-gray-200'
                              }`}>
                                {collaborator.status}
                              </span>
                              <span className="text-xs text-gray-400 capitalize">{collaborator.role}</span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* Chat Tab */}
              {activeTab === 'chat' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="h-96 overflow-y-auto space-y-3 mb-4 pr-2">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.userId === currentUser.id ? 'flex-row-reverse' : ''}`}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {msg.userName.charAt(0)}
                        </div>
                        <div className={`flex-1 ${msg.userId === currentUser.id ? 'text-right' : ''}`}>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-semibold text-white">{msg.userName}</span>
                            <span className="text-xs text-gray-400">
                              {format(msg.timestamp, 'HH:mm')}
                            </span>
                          </div>
                          <div className={`inline-block px-4 py-2 rounded-lg ${
                            msg.userId === currentUser.id
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/10 text-white'
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Votes Tab */}
              {activeTab === 'votes' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {votes.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <ThumbsUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No votes yet. Be the first to vote on activities!</p>
                    </div>
                  ) : (
                    votes.map((vote) => (
                      <div key={vote.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {vote.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{vote.userName}</div>
                            <div className="text-sm text-gray-300">
                              voted {vote.voteType.replace('_', ' ')} on an activity
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {format(vote.timestamp, 'MMM dd, HH:mm')}
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {wishlist.map((item) => (
                    <div key={item.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${item.cost}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="flex items-center gap-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span className="text-sm font-semibold">{item.votes}</span>
                          </button>
                          <span className="text-xs text-gray-400">{item.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-xs text-gray-400">
                          Added by {item.addedBy}
                        </span>
                        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                          Add to Itinerary
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Split Costs Tab */}
              {activeTab === 'costs' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-200">Total Trip Cost</span>
                      <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(parseFloat(e.target.value))}
                        className="w-32 px-3 py-2 border border-white/20 rounded-lg text-right"
                        placeholder="0.00"
                      />
                    </div>
                    <button
                      onClick={calculateCostSplit}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Calculate Split
                    </button>
                  </div>

                  {costSplits.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Cost Per Person</h4>
                      {costSplits.map((split) => (
                        <div key={split.userId} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                              {split.userName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{split.userName}</div>
                              <div className="text-sm text-gray-300">${split.amount.toFixed(2)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {split.paid ? (
                              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                Paid
                              </span>
                            ) : (
                              <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors">
                                Mark Paid
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Comments Section */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Comments & Suggestions</h3>

            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {comment.userName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-white">{comment.userName}</span>
                      <span className="text-xs text-gray-400">
                        {format(comment.timestamp, 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-gray-200">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addComment()}
                placeholder="Add a comment or suggestion..."
                className="flex-1 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={addComment}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Collaborators */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Online Now
            </h3>
            <div className="space-y-3">
              {collaborators.filter(c => c.status === 'active').map((collaborator) => (
                <div key={collaborator.id} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {collaborator.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{collaborator.name}</div>
                    <div className="text-xs text-gray-400">Active now</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activity
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Jane Smith</span> added a new activity
                  <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Bob Johnson</span> voted on an activity
                  <div className="text-xs text-gray-400 mt-1">5 hours ago</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">John Doe</span> updated the itinerary
                  <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/5 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">Invite Collaborator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="friend@example.com"
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={inviteCollaborator}
                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Send Invite
                  </button>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 py-2 bg-white/10 hover:bg-gray-200 text-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollaborativePlanning;
