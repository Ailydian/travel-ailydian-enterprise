import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar,
  Clock,
  Globe,
  Camera,
  Send,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  Filter,
  Search,
  Compass,
  Navigation,
  Star,
  Award,
  Zap,
  Eye,
  ThumbsUp,
  Bookmark,
  Flag,
  Settings,
  Bell,
  Plus,
  X,
  ChevronDown
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  travelStyle: string[];
  languages: string[];
  countries: string[];
  isOnline: boolean;
  lastSeen: Date;
  compatibility: number;
  mutualInterests: string[];
}

interface TravelPost {
  id: string;
  userId: string;
  user: User;
  type: 'photo' | 'video' | 'text' | 'location' | 'itinerary';
  content: string;
  media?: {
    url: string;
    type: 'image' | 'video';
    caption?: string;
  }[];
  location?: {
    name: string;
    coordinates: [number, number];
    country: string;
  };
  timestamp: Date;
  likes: string[];
  comments: Comment[];
  shares: number;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: string[];
  replies: Comment[];
}

interface TravelPlan {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  participants: User[];
  maxParticipants: number;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[];
  isPublic: boolean;
  createdBy: string;
  status: 'planning' | 'confirmed' | 'ongoing' | 'completed';
}

const TravelSocialHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'plans' | 'chat'>('feed');
  const [posts, setPosts] = useState<TravelPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    travelStyle: [],
    destination: '',
    budget: { min: 0, max: 10000 },
    duration: { min: 1, max: 30 }
  });

  const socketRef = useRef<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data
  const sampleUsers: User[] = [
    {
      id: '1',
      name: 'Ayşe Demir',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2fc32d2?w=100&h=100&q=80',
      location: 'İstanbul, Türkiye',
      bio: 'Backpacker & Photographer | 47 ülke gezdi ✈️📸',
      travelStyle: ['Backpacking', 'Photography', 'Cultural'],
      languages: ['Turkish', 'English', 'German'],
      countries: ['Turkey', 'Germany', 'Thailand', 'Nepal'],
      isOnline: true,
      lastSeen: new Date(),
      compatibility: 92,
      mutualInterests: ['Photography', 'Cultural Tours', 'Street Food']
    },
    {
      id: '2',
      name: 'Marco Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80',
      location: 'São Paulo, Brazil',
      bio: 'Adventure seeker & Digital nomad 🌍',
      travelStyle: ['Adventure', 'Solo Travel', 'Digital Nomad'],
      languages: ['Portuguese', 'English', 'Spanish'],
      countries: ['Brazil', 'Argentina', 'Peru', 'Colombia'],
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      compatibility: 85,
      mutualInterests: ['Adventure Sports', 'Remote Work', 'Latin Culture']
    }
  ];

  const samplePosts: TravelPost[] = [
    {
      id: '1',
      userId: '1',
      user: sampleUsers[0],
      type: 'photo',
      content: 'Kapadokya\'da gün doğumunu izlemek her zaman büyülü! 🎈 Bu sabah 4:30\'da kalkmaya değdi.',
      media: [{
        url: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=600&h=400&q=90',
        type: 'image',
        caption: 'Cappadocia sunrise from hot air balloon'
      }],
      location: {
        name: 'Göreme, Kapadokya',
        coordinates: [38.6431, 34.8287],
        country: 'Turkey'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: ['2', '3', '4'],
      comments: [
        {
          id: '1',
          userId: '2',
          user: sampleUsers[1],
          content: 'Harika bir görüntü! Ben de gelecek ay Kapadokya\'ya gitmeyi planlıyorum.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: ['1'],
          replies: []
        }
      ],
      shares: 12,
      tags: ['Kapadokya', 'BalonTuru', 'GünDoğumu'],
      isLiked: false,
      isBookmarked: true
    }
  ];

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io('wss://travel-social-server.com');
    
    socketRef.current.on('new_post', (post: TravelPost) => {
      setPosts(prev => [post, ...prev]);
    });

    socketRef.current.on('user_online', (userId: string) => {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, isOnline: true } : user
      ));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Initialize data
  useEffect(() => {
    setPosts(samplePosts);
    setUsers(sampleUsers);
  }, []);

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked 
              ? post.likes.filter(id => id !== 'current-user')
              : [...post.likes, 'current-user']
          }
        : post
    ));
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleFollowUser = (userId: string) => {
    console.log(`Following user ${userId}`);
    // Implementation for following users
  };

  const createNewPost = () => {
    if (!newPostContent.trim()) return;

    const newPost: TravelPost = {
      id: Date.now().toString(),
      userId: 'current-user',
      user: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80',
        location: 'Istanbul, Turkey',
        bio: '',
        travelStyle: [],
        languages: [],
        countries: [],
        isOnline: true,
        lastSeen: new Date(),
        compatibility: 100,
        mutualInterests: []
      },
      type: 'text',
      content: newPostContent,
      timestamp: new Date(),
      likes: [],
      comments: [],
      shares: 0,
      tags: [],
      isLiked: false,
      isBookmarked: false
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setShowNewPostModal(false);

    // Emit to socket
    socketRef.current?.emit('create_post', newPost);
  };

  const PostCard: React.FC<{ post: TravelPost }> = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white/5 rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={post.user.avatar} 
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {post.user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-white">{post.user.name}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {post.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{post.location.name}</span>
                </div>
              )}
              <span>•</span>
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-white leading-relaxed">{post.content}</p>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="relative">
          <img 
            src={post.media[0].url}
            alt={post.media[0].caption || 'Travel photo'}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => handleLikePost(post.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
              >
              <Heart 
                className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span className="text-sm font-medium">{post.likes.length}</span>
              </button>
            </motion.div>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => handleBookmarkPost(post.id)}
              className="text-gray-600 hover:text-yellow-500 transition-colors"
            >
            <Bookmark 
              className={`w-5 h-5 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`}
            />
            </button>
          </motion.div>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-gray-100">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img 
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1">
                  <span className="font-medium text-sm text-white">{comment.user.name}</span>
                  <span className="text-gray-700 text-sm ml-2">{comment.content}</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Beğen
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Yanıtla
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </motion.div>
  );

  const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-white/5 rounded-2xl shadow-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{user.name}</h3>
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{user.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{user.compatibility}% uyumlu</span>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => handleFollowUser(user.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Takip Et
          </button>
        </motion.div>
      </div>

      <p className="text-gray-700 mb-4">{user.bio}</p>

      {/* Travel Interests */}
      <div className="mb-4">
        <h4 className="font-medium text-white mb-2">Seyahat Tarzı</h4>
        <div className="flex flex-wrap gap-2">
          {user.travelStyle.map((style, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {style}
            </span>
          ))}
        </div>
      </div>

      {/* Mutual Interests */}
      {user.mutualInterests.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-white mb-2">Ortak İlgi Alanları</h4>
          <div className="flex flex-wrap gap-2">
            {user.mutualInterests.map((interest, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Countries */}
      <div>
        <h4 className="font-medium text-white mb-2">Ziyaret Ettiği Ülkeler</h4>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{user.countries.length} ülke</span>
        </div>
      </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Sosyal Seyahat</h1>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setShowNewPostModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
            <Plus className="w-5 h-5" />
            Paylaş
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 mb-8 bg-gray-100 p-1 rounded-xl">
        {[
          { key: 'feed', label: 'Ana Sayfa', icon: Users },
          { key: 'discover', label: 'Keşfet', icon: Compass },
          { key: 'plans', label: 'Seyahat Planları', icon: Calendar },
          { key: 'chat', label: 'Mesajlar', icon: MessageCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.div
              key={tab.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white/5 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-white'
                }`}
              >
              <Icon className="w-5 h-5" />
              {tab.label}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'feed' && (
            <div>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {activeTab === 'discover' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Seyahat Arkadaşları Keşfet</h2>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}

          {activeTab === 'plans' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Grup Seyahat Planları</h2>
              <div className="text-center text-gray-500 py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Henüz aktif seyahat planı yok</p>
                <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
                  Yeni Plan Oluştur
                </button>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Mesajlar</h2>
              <div className="text-center text-gray-500 py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Henüz mesaj yok</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Online Users */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-white mb-4">Online Seyahat Arkadaşları</h3>
            <div className="space-y-3">
              {users.filter(user => user.isOnline).map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Destinations */}
          <div className="bg-white/5 rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-white mb-4">Trend Destinasyonlar</h3>
            <div className="space-y-3">
              {[
                { name: 'Kapadokya', count: 124, trend: '+12%' },
                { name: 'Antalya', count: 98, trend: '+8%' },
                { name: 'İstanbul', count: 87, trend: '+15%' },
                { name: 'Bodrum', count: 73, trend: '+5%' }
              ].map((destination, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{destination.name}</p>
                    <p className="text-sm text-gray-500">{destination.count} gönderi</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{destination.trend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowNewPostModal(false)}
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white/5 rounded-2xl p-6 w-full max-w-lg"
              >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Yeni Gönderi</h3>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Seyahat deneyimlerinizi paylaşın..."
                className="w-full p-4 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Camera className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={createNewPost}
                    disabled={!newPostContent.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  Paylaş
                  </button>
                </motion.div>
              </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TravelSocialHub;