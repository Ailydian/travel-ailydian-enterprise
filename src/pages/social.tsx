import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import logger from '../lib/logger';
import {
  Users,
  MessageCircle,
  Share2,
  Heart,
  MapPin,
  Camera,
  Calendar,
  TrendingUp,
  Award,
  Star,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Globe,
  UserPlus,
  Settings,
  Bell } from 'lucide-react';

interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    location: string;
  };
  content: string;
  images: string[];
  location: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  bookmarked: boolean;
  tags: string[];
}

interface TravelBuddy {
  id: number;
  name: string;
  avatar: string;
  location: string;
  languages: string[];
  interests: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  online: boolean;
}

const SocialPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showNewPost, setShowNewPost] = useState(false);

  const posts: Post[] = [
  {
    id: 1,
    user: {
      name: "Ayşe Demir",
      username: "aysetravel",
      avatar: "/avatars/ayse.jpg",
      verified: true,
      location: "İstanbul, Türkiye"
    },
    content: "Kapadokya'da geçirdiğimiz muhteşem 3 gün! Sıcak hava balonu turu kesinlikle yapılması gereken bir deneyim. Gündoğumu manzarası inanılmazdı 🎈✨",
    images: ["/images/posts/cappadocia-1.jpg", "/images/posts/cappadocia-2.jpg"],
    location: "Kapadokya, Nevşehir",
    timestamp: "2 saat önce",
    likes: 245,
    comments: 18,
    shares: 12,
    liked: false,
    bookmarked: true,
    tags: ["#kapadokya", "#balonturu", "#gündoğumu"]
  },
  {
    id: 2,
    user: {
      name: "Mehmet Kaya",
      username: "mehmetek",
      avatar: "/avatars/mehmet.jpg",
      verified: false,
      location: "Antalya, Türkiye"
    },
    content: "Olympos'ta çadırda kalmak ve Yanartaş'ı görmek harika bir deneyimdi! Doğa ile iç içe olmak isteyenler için mükemmel. Özellikle geceleri ateş yanında sohbet keyifli 🔥🏕️",
    images: ["/images/posts/olympos-1.jpg"],
    location: "Olympos, Antalya",
    timestamp: "5 saat önce",
    likes: 189,
    comments: 24,
    shares: 8,
    liked: true,
    bookmarked: false,
    tags: ["#olympos", "#kamp", "#yanartaş", "#doğa"]
  },
  {
    id: 3,
    user: {
      name: "Zeynep Öz",
      username: "zeynepdunya",
      avatar: "/avatars/zeynep.jpg",
      verified: true,
      location: "İzmir, Türkiye"
    },
    content: "Pamukkale'nin beyaz travertenleri gerçekten büyüleyici! Cleopatra havuzunda yüzmek de ayrı bir keyif. Erken saatlerde gitmek daha az kalabalık oluyor 💙",
    images: ["/images/posts/pamukkale-1.jpg", "/images/posts/pamukkale-2.jpg", "/images/posts/pamukkale-3.jpg"],
    location: "Pamukkale, Denizli",
    timestamp: "1 gün önce",
    likes: 412,
    comments: 31,
    shares: 22,
    liked: true,
    bookmarked: true,
    tags: ["#pamukkale", "#travertenler", "#cleopatra", "#unesco"]
  }];


  const travelBuddies: TravelBuddy[] = [
  {
    id: 1,
    name: "Can Yılmaz",
    avatar: "/avatars/can.jpg",
    location: "İstanbul",
    languages: ["Türkçe", "İngilizce", "Almanca"],
    interests: ["Fotoğrafçılık", "Tarih", "Gastronomi"],
    rating: 4.9,
    reviews: 47,
    verified: true,
    online: true
  },
  {
    id: 2,
    name: "Elif Arslan",
    avatar: "/avatars/elif.jpg",
    location: "Antalya",
    languages: ["Türkçe", "İngilizce", "Rusça"],
    interests: ["Dalış", "Doğa", "Macera"],
    rating: 4.8,
    reviews: 32,
    verified: true,
    online: false
  },
  {
    id: 3,
    name: "Emre Şahin",
    avatar: "/avatars/emre.jpg",
    location: "Kapadokya",
    languages: ["Türkçe", "İngilizce"],
    interests: ["Balon Turu", "Yerel Kültür", "Yürüyüş"],
    rating: 4.7,
    reviews: 28,
    verified: false,
    online: true
  }];


  const trendingTopics = [
  { tag: "#kapadokya", posts: 2547 },
  { tag: "#istanbul", posts: 1823 },
  { tag: "#pamukkale", posts: 1456 },
  { tag: "#antalya", posts: 1289 },
  { tag: "#gündoğumu", posts: 987 },
  { tag: "#yerelkültür", posts: 756 }];


  const handleLike = (postId: number) => {
    // Like functionality
    logger.debug('Liked post:', { component: 'Social', metadata: { postId } });
  };

  const handleBookmark = (postId: number) => {
    // Bookmark functionality  
    logger.debug('Bookmarked post:', { component: 'Social', metadata: { postId } });
  };

  return (
    <>
      <Head>
        <title>Sosyal Ağ - Travel LyDian</title>
        <meta name="description" content="Seyahat topluluğumuza katılın, deneyimlerinizi paylaşın ve yeni seyahat arkadaşları bulun. Türkiye'nin en büyük travel topluluğu." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">Sosyal Ağ</h1>
                </div>

                {/* Navigation Tabs */}
                <nav className="flex space-x-1">
                  {[
                  { id: 'feed', name: 'Ana Sayfa', icon: Globe },
                  { id: 'buddies', name: 'Seyahat Arkadaşları', icon: Users },
                  { id: 'groups', name: 'Gruplar', icon: UserPlus },
                  { id: 'trending', name: 'Trendler', icon: TrendingUp }].
                  map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === tab.id ?
                        'bg-blue-50 text-lydian-primary' :
                        'text-gray-400 hover:bg-lydian-bg/10'}`
                        }>

                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.name}</span>
                      </button>);

                  })}
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-700 to-purple-700 transition-colors">

                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Paylaş</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending Topics */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Trend Konular
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) =>
                  <div key={index} className="flex items-center justify-between">
                      <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                        {topic.tag}
                      </span>
                      <span className="text-sm text-gray-300">{topic.posts}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-white mb-4">Topluluk İstatistikleri</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Aktif Üyeler</span>
                    <span className="font-bold text-green-500">24,567</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Bu Ay Paylaşım</span>
                    <span className="font-bold text-blue-500">8,923</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Seyahat Planı</span>
                    <span className="font-bold text-purple-600">1,456</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* New Post Form */}
              {showNewPost &&
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl p-6 shadow-sm">

                  <h3 className="font-bold text-white mb-4">Seyahat Deneyimini Paylaş</h3>
                  <textarea
                  placeholder="Hangi harika yerleri keşfettin?"
                  className="w-full p-4 border border-white/30 rounded-xl resize-none h-24 focus:ring-2 focus:ring-lydian-border-focus focus:border-white/20" />

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500">
                        <Camera className="w-5 h-5" />
                        <span>Fotoğraf</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500">
                        <MapPin className="w-5 h-5" />
                        <span>Konum</span>
                      </button>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r from-blue-700 to-purple-700 transition-colors">
                      Paylaş
                    </button>
                  </div>
                </motion.div>
              }

              {/* Posts Feed */}
              {activeTab === 'feed' &&
              <div className="space-y-6">
                  {posts.map((post, index) =>
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl shadow-sm overflow-hidden">

                      {/* Post Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-white">{post.user.name}</h4>
                                {post.user.verified &&
                            <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <Award className="w-3 h-3 text-white" />
                                  </div>
                            }
                              </div>
                              <p className="text-sm text-gray-300">@{post.user.username} • {post.timestamp}</p>
                            </div>
                          </div>
                          <button className="p-2 text-gray-300 hover:text-gray-400">
                            <Settings className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-white mb-4">{post.content}</p>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-blue-500 mb-4">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{post.location}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, idx) =>
                      <span key={idx} className="text-blue-500 text-sm hover:underline cursor-pointer">
                              {tag}
                            </span>
                      )}
                        </div>
                      </div>

                      {/* Post Images */}
                      {post.images.length > 0 &&
                  <div className={`grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
                          {post.images.map((image, idx) =>
                    <div key={idx} className="aspect-[4/3] bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    )}
                        </div>
                  }

                      {/* Post Actions */}
                      <div className="p-6 pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 transition-colors ${
                          post.liked ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`
                          }>

                              <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-300 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-300 hover:text-green-500 transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span className="text-sm">{post.shares}</span>
                            </button>
                          </div>
                          <button
                        onClick={() => handleBookmark(post.id)}
                        className={`p-2 transition-colors ${
                        post.bookmarked ? 'text-blue-500' : 'text-gray-300 hover:text-blue-500'}`
                        }>

                            <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                )}
                </div>
              }

              {/* Travel Buddies */}
              {activeTab === 'buddies' &&
              <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-white mb-4">Seyahat Arkadaşları Bul</h3>
                    <p className="text-gray-400 mb-6">Size uygun seyahat arkadaşları bulun ve unutulmaz deneyimler yaşayın.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {travelBuddies.map((buddy) =>
                    <div key={buddy.id} className="border border-white/20 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                                {buddy.online &&
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full border-2 border-white/20"></div>
                            }
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-white">{buddy.name}</h4>
                                  {buddy.verified &&
                              <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                      <Award className="w-3 h-3 text-white" />
                                    </div>
                              }
                                </div>
                                <p className="text-sm text-gray-300">{buddy.location}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{buddy.rating}</span>
                                  <span className="text-sm text-gray-300">({buddy.reviews} değerlendirme)</span>
                                </div>
                              </div>
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-700 to-purple-700 transition-colors">
                              Bağlan
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Diller</h5>
                              <div className="flex flex-wrap gap-2">
                                {buddy.languages.map((lang, idx) =>
                            <span key={idx} className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded text-xs">
                                    {lang}
                                  </span>
                            )}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">İlgi Alanları</h5>
                              <div className="flex flex-wrap gap-2">
                                {buddy.interests.map((interest, idx) =>
                            <span key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 px-2 py-1 rounded text-xs">
                                    {interest}
                                  </span>
                            )}
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              }
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Suggested People */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-white mb-4">Takip Edilecekler</h3>
                <div className="space-y-4">
                  {[
                  { name: "Travel Turkey", username: "travelturkey", followers: "45.2K" },
                  { name: "Doğa Fotoğraf", username: "dogafoto", followers: "32.1K" },
                  { name: "Yerel Lezzetler", username: "yerellezzet", followers: "28.7K" }].
                  map((suggestion, index) =>
                  <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium text-white text-sm">{suggestion.name}</h4>
                          <p className="text-xs text-gray-300">@{suggestion.username}</p>
                          <p className="text-xs text-gray-300">{suggestion.followers} takipçi</p>
                        </div>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                        Takip Et
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-white mb-4">Yaklaşan Etkinlikler</h3>
                <div className="space-y-4">
                  {[
                  {
                    title: "İstanbul Fotoğraf Gezisi",
                    date: "15 Aralık",
                    participants: 24
                  },
                  {
                    title: "Kapadokya Grup Turu",
                    date: "22 Aralık",
                    participants: 18
                  },
                  {
                    title: "Gastronomi Buluşması",
                    date: "28 Aralık",
                    participants: 32
                  }].
                  map((event, index) =>
                  <div key={index} className="border border-white/20 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm mb-1">{event.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.participants} katılımcı
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default SocialPage;