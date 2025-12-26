import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Wallet,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  QrCode,
  Copy,
  ExternalLink,
  Coins,
  Shield,
  Zap,
  DollarSign,
  Bitcoin,
  X
} from 'lucide-react';
import { web3Utils, formatAddress, formatBalance, getExplorerUrl } from '../../utils/web3Utils';

interface CryptoPaymentProps {
  amount: number;
  currency: string;
  description: string;
  recipient?: string;
  onSuccess?: (transactionHash: string) => void;
  onError?: (error: string) => void;
}

interface PaymentStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({
  amount,
  currency,
  description,
  recipient = "0x742d35C4e7b77d3B2E4B19e1a6B0c4b5e6C7d8E9",
  onSuccess,
  onError
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState({ eth: 0, usdc: 0, usdt: 0 });
  const [selectedCrypto, setSelectedCrypto] = useState<'ETH' | 'USDC' | 'USDT'>('ETH');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [networkFee, setNetworkFee] = useState(0.003); // Mock gas fee

  const [steps, setSteps] = useState<PaymentStep[]>([
    { id: 1, title: 'Cüzdan Bağlantısı', description: 'Kripto cüzdanınızı bağlayın', status: 'pending' },
    { id: 2, title: 'Ödeme Detayları', description: 'Ödeme tutarını ve para birimini seçin', status: 'pending' },
    { id: 3, title: 'İşlem Onayı', description: 'Blockchain işlemini onaylayın', status: 'pending' },
    { id: 4, title: 'Ödeme Tamamlandı', description: 'İşlem başarıyla tamamlandı', status: 'pending' }
  ]);

  // Crypto options
  const cryptoOptions = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">ETH</div>,
      balance: balance.eth,
      usdValue: balance.eth * 2400, // Mock ETH price
      color: 'from-blue-500 to-indigo-600'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">UC</div>,
      balance: balance.usdc,
      usdValue: balance.usdc,
      color: 'from-blue-400 to-blue-600'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">UT</div>,
      balance: balance.usdt,
      usdValue: balance.usdt,
      color: 'from-green-400 to-green-600'
    }
  ];

  useEffect(() => {
    checkWalletConnection();
  }, []);

  useEffect(() => {
    updateStepStatus();
  }, [isConnected, selectedCrypto, isProcessing, transactionHash]);

  const checkWalletConnection = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const walletInfo = await web3Utils.connectWallet();
          if (walletInfo) {
            setIsConnected(true);
            setWalletAddress(walletInfo.address);
            setBalance(walletInfo.balance);
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const walletInfo = await web3Utils.connectWallet();
      if (walletInfo) {
        setIsConnected(true);
        setWalletAddress(walletInfo.address);
        setBalance(walletInfo.balance);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      onError?.('Cüzdan bağlantısı başarısız');
    }
  };

  const updateStepStatus = () => {
    const newSteps = [...steps];
    
    // Step 1: Wallet Connection
    newSteps[0].status = isConnected ? 'completed' : (currentStep === 0 ? 'active' : 'pending');
    
    // Step 2: Payment Details
    if (isConnected) {
      newSteps[1].status = currentStep > 1 ? 'completed' : (currentStep === 1 ? 'active' : 'pending');
    }
    
    // Step 3: Transaction Confirmation
    if (currentStep >= 2) {
      newSteps[2].status = isProcessing ? 'active' : (transactionHash ? 'completed' : 'pending');
    }
    
    // Step 4: Payment Completed
    if (transactionHash) {
      newSteps[3].status = 'completed';
    }
    
    setSteps(newSteps);
  };

  const processPayment = async () => {
    if (!isConnected) {
      onError?.('Lütfen önce cüzdanınızı bağlayın');
      return;
    }

    const selectedOption = cryptoOptions.find(option => option.symbol === selectedCrypto);
    if (!selectedOption || selectedOption.balance < amount) {
      onError?.('Yetersiz bakiye');
      return;
    }

    setIsProcessing(true);
    setCurrentStep(2);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      setTransactionHash(mockTxHash);
      setCurrentStep(3);
      
      onSuccess?.(mockTxHash);
    } catch (error: any) {
      console.error('Payment error:', error);
      onError?.(error.message || 'Ödeme işlemi başarısız');
      
      // Update step status to show error
      const newSteps = [...steps];
      newSteps[2].status = 'error';
      setSteps(newSteps);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could show a toast notification here
  };

  const getStepIcon = (step: PaymentStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-white/20 rounded-full" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <CreditCard className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Kripto Ödeme</h1>
        <p className="text-gray-600">
          Güvenli blockchain ile ödemenizi tamamlayın
        </p>
      </div>

      {/* Payment Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className={`flex flex-col items-center ${step.status === 'active' ? 'text-blue-600' : step.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                  {getStepIcon(step)}
                  <span className="text-xs font-medium mt-1">{step.id}</span>
                </div>
                <div className="hidden md:block">
                  <div className={`text-sm font-medium ${step.status === 'active' ? 'text-blue-600' : step.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden md:block h-px bg-gray-200 flex-1 mx-4 ${step.status === 'completed' ? 'bg-green-300' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Content */}
      {!isConnected ? (
        /* Wallet Connection */
        <div className="bg-white/5 rounded-2xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Cüzdanınızı Bağlayın</h2>
          <p className="text-gray-600 mb-8">
            Kripto ödeme yapabilmek için MetaMask veya uyumlu bir cüzdan bağlamanız gerekiyor.
          </p>
          
          <button
            onClick={connectWallet}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
          >
            Cüzdan Bağla
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Güvenli</div>
              <div className="text-xs text-gray-600">End-to-end şifreli</div>
            </div>
            <div className="text-center p-4">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Hızlı</div>
              <div className="text-xs text-gray-600">Anında işlem</div>
            </div>
            <div className="text-center p-4">
              <Coins className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Düşük Ücret</div>
              <div className="text-xs text-gray-600">Minimum network fee</div>
            </div>
          </div>
          </motion.div>
        </div>
      ) : !transactionHash ? (
        /* Payment Form */
        <div className="bg-white/5 rounded-2xl shadow-lg overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
          {/* Connected Wallet Info */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Bağlı Cüzdan</div>
                <div className="font-medium text-white">{formatAddress(walletAddress)}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Bağlandı</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Payment Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Ödeme Detayları</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Açıklama</span>
                  <span className="font-medium">{description}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Tutar</span>
                  <span className="font-medium">${amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Network Ücreti (tahmini)</span>
                  <span className="font-medium">{networkFee.toFixed(4)} ETH</span>
                </div>
                <hr className="my-3" />
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span>Toplam</span>
                  <span>${(amount + (networkFee * 2400)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Crypto Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Ödeme Yöntemi</h3>
              <div className="space-y-3">
                {cryptoOptions.map((option) => (
                  <button
                    key={option.symbol}
                    onClick={() => setSelectedCrypto(option.symbol as any)}
                    className={`w-full p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      selectedCrypto === option.symbol
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${option.color}`}>
                          {option.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-white">{option.name}</div>
                          <div className="text-sm text-gray-600">{option.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">
                          {formatBalance(option.balance)} {option.symbol}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${formatBalance(option.usdValue, 2)}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Actions */}
            <div className="space-y-3">
              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Ödemeyi Tamamla
                  </>
                )}
              </button>

              <button
                onClick={() => setShowQRCode(true)}
                className="w-full py-3 border border-white/20 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                QR Kod ile Öde
              </button>
            </div>
          </div>
          </motion.div>
        </div>
      ) : (
        /* Payment Success */
        <div className="bg-white/5 rounded-2xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Ödeme Başarılı!</h2>
          <p className="text-gray-600 mb-8">
            İşleminiz başarıyla blockchain&apos;e kaydedildi.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">İşlem Hash</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{formatAddress(transactionHash)}</span>
                  <button
                    onClick={() => copyToClipboard(transactionHash)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tutar</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ödeme Yöntemi</span>
                <span className="font-medium">{selectedCrypto}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Durum</span>
                <span className="text-green-600 font-medium">Tamamlandı</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.open(getExplorerUrl(transactionHash, 1), '_blank')}
              className="flex-1 py-3 border border-white/20 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Explorer&apos;da Görüntüle
            </button>
            <button
              onClick={() => copyToClipboard(transactionHash)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Hash&apos;i Kopyala
            </button>
          </div>
          </motion.div>
        </div>
      )}

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowQRCode(false)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white/5 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">QR Kod ile Ödeme</h3>
                <button
                  onClick={() => setShowQRCode(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-gray-400" />
                  <div className="absolute text-xs text-gray-500">QR Kodu burada görünecek</div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Mobil cüzdanınızla QR kodu tarayarak ödeme yapabilirsiniz
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Ödeme Adresi</div>
                  <div className="font-mono text-xs break-all">{recipient}</div>
                </div>
                
                <button
                  onClick={() => copyToClipboard(recipient)}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Adresi Kopyala
                </button>
              </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CryptoPayment;