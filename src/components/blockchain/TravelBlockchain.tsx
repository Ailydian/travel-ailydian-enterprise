import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coins, 
  Wallet, 
  Shield, 
  Award,
  Image,
  Download,
  Share2,
  Lock,
  Unlock,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Globe,
  Star,
  Calendar,
  MapPin,
  Camera,
  Gift,
  Sparkles,
  CreditCard,
  QrCode,
  Copy,
  ExternalLink,
  X,
  Users
} from 'lucide-react';
import { ethers } from 'ethers';
import CryptoPayment from './CryptoPayment';
import DecentralizedReviews from './DecentralizedReviews';

interface TravelNFT {
  id: string;
  tokenId: number;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: {
    destination: string;
    activity: string;
    season: string;
    weather: string;
    companions: number;
  };
  owner: string;
  price?: number;
  isListed: boolean;
  metadata: string;
}

interface CryptoPayment {
  id: string;
  amount: number;
  currency: 'ETH' | 'BTC' | 'USDC' | 'USDT';
  status: 'pending' | 'confirmed' | 'failed';
  transactionHash: string;
  recipient: string;
  timestamp: Date;
}

interface DecentralizedReview {
  id: string;
  reviewer: string;
  businessId: string;
  rating: number;
  content: string;
  timestamp: Date;
  votes: number;
  isVerified: boolean;
  nftProof?: string;
}

const TravelBlockchain: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState({ eth: 0, usdc: 0 });
  const [myNFTs, setMyNFTs] = useState<TravelNFT[]>([]);
  const [activeTab, setActiveTab] = useState<'nfts' | 'payments' | 'reviews'>('nfts');
  const [selectedNFT, setSelectedNFT] = useState<TravelNFT | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<CryptoPayment[]>([]);
  const [reviews, setReviews] = useState<DecentralizedReview[]>([]);
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintingData, setMintingData] = useState({
    title: '',
    description: '',
    location: '',
    image: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({ amount: 0, description: '' });

  // Sample NFT data
  const sampleNFTs: TravelNFT[] = [
    {
      id: '1',
      tokenId: 1001,
      title: 'Kapadokya Balon Turu',
      description: 'Peri bacaları üzerinde unutulmaz gün doğumu deneyimi',
      image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=400&h=400&q=90',
      location: 'Göreme, Kapadokya',
      date: '2024-03-15',
      rarity: 'epic',
      attributes: {
        destination: 'Cappadocia',
        activity: 'Hot Air Balloon',
        season: 'Spring',
        weather: 'Clear',
        companions: 2
      },
      owner: '0x742...89aB',
      price: 0.25,
      isListed: false,
      metadata: 'ipfs://QmX4n8m2v...'
    },
    {
      id: '2',
      tokenId: 1002,
      title: 'Santorini Gün Batımı',
      description: 'Oia&apos;da romantik gün batımı anları',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=400&q=90',
      location: 'Oia, Santorini',
      date: '2024-02-28',
      rarity: 'legendary',
      attributes: {
        destination: 'Santorini',
        activity: 'Sunset Viewing',
        season: 'Winter',
        weather: 'Partly Cloudy',
        companions: 1
      },
      owner: '0x742...89aB',
      isListed: true,
      metadata: 'ipfs://QmY5n9m3w...'
    }
  ];

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const balance = await provider.getBalance(accounts[0]);
        
        setWalletAddress(accounts[0]);
        setBalance({ 
          eth: parseFloat(ethers.formatEther(balance)),
          usdc: 1250.75 // Mock USDC balance
        });
        setIsConnected(true);
        setMyNFTs(sampleNFTs);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('MetaMask yüklü değil! Lütfen MetaMask kurun.');
    }
  };

  // Mint NFT function
  const mintTravelNFT = async () => {
    if (!mintingData.title || !mintingData.location) {
      alert('Başlık ve lokasyon zorunludur!');
      return;
    }

    setIsLoading(true);
    
    // Simulate NFT minting process
    setTimeout(() => {
      const newNFT: TravelNFT = {
        id: Date.now().toString(),
        tokenId: 1000 + myNFTs.length + 1,
        title: mintingData.title,
        description: mintingData.description,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&q=90',
        location: mintingData.location,
        date: new Date().toISOString().split('T')[0],
        rarity: Math.random() > 0.7 ? 'rare' : 'common',
        attributes: {
          destination: mintingData.location,
          activity: 'Travel Experience',
          season: 'Current',
          weather: 'Various',
          companions: 1
        },
        owner: walletAddress,
        isListed: false,
        metadata: `ipfs://QmNew${Date.now()}...`
      };

      setMyNFTs(prev => [...prev, newNFT]);
      setMintingData({ title: '', description: '', location: '', image: null });
      setShowMintModal(false);
      setIsLoading(false);
      
      alert('🎉 NFT başarıyla mint edildi!');
    }, 3000);
  };

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get rarity emoji
  const getRarityEmoji = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  const NFTCard: React.FC<{ nft: TravelNFT }> = ({ nft }) => (
    <div className="bg-white/5 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setSelectedNFT(nft)}>
      <motion.div
        layoutId={nft.id}
        whileHover={{ y: -4 }}
        style={{ width: '100%' }}
      >
      <div className="relative">
        <img 
          src={nft.image} 
          alt={nft.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
            {getRarityEmoji(nft.rarity)} {nft.rarity.toUpperCase()}
          </span>
        </div>
        {nft.isListed && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
              SATILIKTA
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-white mb-2">{nft.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{nft.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{new Date(nft.date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">#{nft.tokenId}</span>
          {nft.price && (
            <span className="font-bold text-blue-600">{nft.price} ETH</span>
          )}
        </div>
      </div>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl">
              <Coins className="w-8 h-8 text-white" />
            </div>
            Travel Blockchain
          </h1>
          <p className="text-gray-600 mt-2">
            NFT seyahat anıları, kripto ödemeler ve merkezi olmayan değerlendirmeler
          </p>
        </div>

        {!isConnected ? (
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Wallet className="w-5 h-5" />
            )}
            Cüzdan Bağla
          </button>
        ) : (
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-white">Bağlandı</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
            <div className="text-sm font-medium">
              {balance.eth.toFixed(4)} ETH | {balance.usdc.toFixed(2)} USDC
            </div>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Cüzdanınızı Bağlayın</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            NFT seyahat anılarınızı mint etmek, kripto ödemeler yapmak ve merkezi olmayan değerlendirmeleri görüntülemek için cüzdanınızı bağlayın.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Image className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-white mb-2">NFT Anılar</h3>
                <p className="text-sm text-gray-600">
                  Seyahat deneyimlerinizi benzersiz NFT&apos;ler olarak kaydedin
                </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-white mb-2">Kripto Ödemeler</h3>
              <p className="text-sm text-gray-600">
                ETH, BTC ve stable coin&apos;lerle güvenli ödemeler yapın
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-white mb-2">Güvenilir Yorumlar</h3>
              <p className="text-sm text-gray-600">
                Blockchain ile doğrulanmış gerçek kullanıcı yorumları
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation */}
          <div className="flex items-center gap-1 mb-8 bg-gray-100 p-1 rounded-xl">
            {[
              { key: 'nfts', label: 'NFT Koleksiyonum', icon: Image, count: myNFTs.length },
              { key: 'payments', label: 'Kripto Ödemeler', icon: CreditCard, count: 0 },
              { key: 'reviews', label: 'Yorumlarım', icon: Star, count: 0 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors transform hover:scale-105 ${
                    activeTab === tab.key
                      ? 'bg-white/5 text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* NFT Collection */}
          {activeTab === 'nfts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">NFT Koleksiyonum</h2>
                <button
                  onClick={() => setShowMintModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  Yeni NFT Mint Et
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
                
                {myNFTs.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Image className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Henüz NFT&apos;niz yok</h3>
                    <p className="text-gray-600 mb-6">
                      İlk seyahat anınızı NFT olarak mint edin!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Crypto Payments */}
          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Kripto Ödemeler</h2>
                <button
                  onClick={() => {
                    setPaymentData({ amount: 250, description: 'Seyahat Rezervasyonu' });
                    setShowPaymentModal(true);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <CreditCard className="w-5 h-5" />
                  Demo Ödeme Yap
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Payment History Cards */}
                <div className="bg-white/5 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                      Tamamlandı
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Otel Rezervasyonu</h3>
                  <p className="text-sm text-gray-600 mb-4">Kapadokya Cave Hotel - 3 gece</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">$420.50</span>
                    <span className="text-sm text-gray-500">ETH</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                      Beklemede
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Balon Turu</h3>
                  <p className="text-sm text-gray-600 mb-4">Kapadokya Hot Air Balloon</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">$180.00</span>
                    <span className="text-sm text-gray-500">USDC</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl shadow-lg p-6 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Yeni Ödeme</h3>
                  <p className="text-sm text-gray-600 mb-4">Kripto ile güvenli ödeme yapın</p>
                  <button
                    onClick={() => {
                      setPaymentData({ amount: 150, description: 'Yeni Rezervasyon' });
                      setShowPaymentModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ödeme Yap
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Supported Cryptocurrencies */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Desteklenen Kripto Para Birimleri</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Ethereum', symbol: 'ETH', icon: '🔷', color: 'bg-blue-100 text-blue-700' },
                    { name: 'USD Coin', symbol: 'USDC', icon: '💙', color: 'bg-blue-100 text-blue-700' },
                    { name: 'Tether', symbol: 'USDT', icon: '💚', color: 'bg-green-100 text-green-700' },
                    { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'bg-orange-100 text-orange-700' }
                  ].map((crypto) => (
                    <div key={crypto.symbol} className="bg-white/5 rounded-xl p-4 text-center shadow-sm border">
                      <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center text-xl ${crypto.color}`}>
                        {crypto.icon}
                      </div>
                      <div className="font-medium text-white">{crypto.symbol}</div>
                      <div className="text-xs text-gray-600">{crypto.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <DecentralizedReviews />
          )}
        </>
      )}

      {/* Mint NFT Modal */}
      <AnimatePresence>
        {showMintModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMintModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/5 rounded-2xl p-6 w-full max-w-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Seyahat NFT&apos;si Mint Et</h3>
                <button
                  onClick={() => setShowMintModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={mintingData.title}
                    onChange={(e) => setMintingData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Örn: Kapadokya Balon Turu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={mintingData.description}
                    onChange={(e) => setMintingData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Bu deneyimi anlatan bir açıklama yazın..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lokasyon *
                  </label>
                  <input
                    type="text"
                    value={mintingData.location}
                    onChange={(e) => setMintingData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Örn: Göreme, Kapadokya"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-800 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Mint Ücreti: 0.05 ETH + Gas Fee</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMintModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={mintTravelNFT}
                  disabled={isLoading || !mintingData.title || !mintingData.location}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2">
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    {isLoading ? 'Mint Ediliyor...' : 'NFT Mint Et'}
                    </div>
                  </motion.div>
                </button>
              </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedNFT(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/5 rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layoutId={selectedNFT.id}
              >
              <div className="relative">
                <img 
                  src={selectedNFT.image} 
                  alt={selectedNFT.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedNFT.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(selectedNFT.rarity)}`}>
                      {getRarityEmoji(selectedNFT.rarity)} {selectedNFT.rarity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Token ID</div>
                    <div className="font-mono text-lg font-bold">#{selectedNFT.tokenId}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{selectedNFT.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Özellikler</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Destinasyon</span>
                        <span className="font-medium">{selectedNFT.attributes.destination}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Aktivite</span>
                        <span className="font-medium">{selectedNFT.attributes.activity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Mevsim</span>
                        <span className="font-medium">{selectedNFT.attributes.season}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Hava Durumu</span>
                        <span className="font-medium">{selectedNFT.attributes.weather}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-3">Detaylar</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{selectedNFT.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(selectedNFT.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{selectedNFT.attributes.companions} kişi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Paylaş
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    İndir
                  </button>
                  {!selectedNFT.isListed && (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Satışa Çıkar
                    </button>
                  )}
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Crypto Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPaymentModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/5 rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-bold text-white">Kripto Ödeme</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <CryptoPayment
                amount={paymentData.amount}
                currency="USD"
                description={paymentData.description}
                onSuccess={(txHash) => {
                  console.log('Payment successful:', txHash);
                  setShowPaymentModal(false);
                  // Could show a success toast here
                }}
                onError={(error) => {
                  console.error('Payment error:', error);
                  // Could show an error toast here
                }}
              />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TravelBlockchain;
