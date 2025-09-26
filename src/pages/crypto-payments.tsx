import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Coins,
  Shield,
  Zap,
  Globe,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Wallet,
  TrendingUp,
  Lock
} from 'lucide-react';
import NavigationHeader from '../components/layout/NavigationHeader';

const CryptoPayments: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kripto Ödemeler - Travel.Ailydian | Bitcoin, Ethereum, USDT ile Ödeme</title>
        <meta name="description" content="Travel.Ailydian'da Bitcoin, Ethereum, USDT ve diğer kripto paralarla güvenli ödeme yapın. Blockchain teknolojisi ile güvenli seyahat rezervasyonları." />
        <meta name="keywords" content="kripto ödeme, bitcoin ödeme, ethereum, USDT, blockchain ödeme, kripto para seyahat" />
      </Head>

      <NavigationHeader />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white">
                  Kripto Ödemeler
                </h1>
              </div>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Bitcoin, Ethereum, USDT ve 50+ kripto para ile güvenli ödeme yapın. 
                Blockchain teknolojisi ile şeffaf, hızlı ve güvenli rezervasyonlar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Shield, text: 'Blockchain Güvenlik' },
                  { icon: Zap, text: 'Anında Transfer' },
                  { icon: Globe, text: 'Küresel Erişim' },
                  { icon: TrendingUp, text: 'Düşük Komisyon' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <stat.icon className="w-5 h-5 text-yellow-200" />
                    <span className="text-white font-medium">{stat.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Supported Cryptocurrencies */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Desteklenen Kripto Paralar</h2>
              <p className="text-gray-600">En popüler kripto paralarla ödeme yapabilirsiniz</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Bitcoin', symbol: 'BTC', color: 'bg-orange-100 text-orange-600' },
                { name: 'Ethereum', symbol: 'ETH', color: 'bg-blue-100 text-blue-600' },
                { name: 'Tether', symbol: 'USDT', color: 'bg-green-100 text-green-600' },
                { name: 'Binance Coin', symbol: 'BNB', color: 'bg-yellow-100 text-yellow-600' },
                { name: 'Cardano', symbol: 'ADA', color: 'bg-indigo-100 text-indigo-600' },
                { name: 'Solana', symbol: 'SOL', color: 'bg-purple-100 text-purple-600' }
              ].map((crypto, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className={`w-16 h-16 ${crypto.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="font-bold text-lg">{crypto.symbol}</span>
                  </div>
                  <h3 className="font-bold text-sm">{crypto.name}</h3>
                  <p className="text-xs text-gray-500">{crypto.symbol}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasıl Çalışır?</h2>
              <p className="text-gray-600">3 basit adımda kripto ile ödeme yapın</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Rezervasyon Seçin',
                  description: 'İstediğiniz tur, otel veya aktiviteyi sepete ekleyin.',
                  icon: CreditCard,
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  step: '2',
                  title: 'Kripto Para Seçin',
                  description: 'Ödeme sayfasında tercih ettiğiniz kripto parayı seçin.',
                  icon: Wallet,
                  color: 'bg-green-100 text-green-600'
                },
                {
                  step: '3',
                  title: 'Güvenli Ödeme',
                  description: 'QR kod ile veya wallet adresine transfer yapın.',
                  icon: CheckCircle,
                  color: 'bg-purple-100 text-purple-600'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kripto Ödeme Avantajları</h2>
              <p className="text-gray-600">Neden kripto para ile ödeme yapmayı tercih etmelisiniz?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Maksimum Güvenlik',
                  description: 'Blockchain teknolojisi ile şifrelenmiş güvenli ödemeler.'
                },
                {
                  icon: Zap,
                  title: 'Anında İşlem',
                  description: 'Banka transferlerinin aksine anında onaylanan ödemeler.'
                },
                {
                  icon: Globe,
                  title: 'Küresel Erişim',
                  description: 'Dünyanın her yerinden komisyon ödemeden transfer.'
                },
                {
                  icon: Lock,
                  title: 'Gizlilik',
                  description: 'Kişisel finansal bilgileriniz korunur.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-yellow-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Kripto ile İlk Rezervasyonunuzu Yapın
              </h2>
              <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                Bitcoin, Ethereum veya USDT ile ödeme yapın ve %5 indirim kazanın!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                Şimdi Rezervasyon Yap
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CryptoPayments;