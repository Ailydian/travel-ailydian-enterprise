import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  Gift,
  Users,
  Calendar,
  AlertCircle,
  Crown,
  Star,
  Award,
  Share2,
  History,
  ChevronRight } from
'lucide-react';
import logger from '../../lib/logger';
import {
  calculateTierProgress,
  formatMiles,
  getTierColorClasses,
  TIER_BENEFITS,
  type UserMilesAccount,
  type MilesTransaction } from
'@/lib/loyaltyProgram';

interface MilesWalletProps {
  userId: string;
}

const MilesWallet: React.FC<MilesWalletProps> = ({ userId }) => {
  const [account, setAccount] = useState<UserMilesAccount | null>(null);
  const [transactions, setTransactions] = useState<MilesTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchMilesData = async () => {
      try {
        const response = await fetch(`/api/loyalty/miles/${userId}`);
        const data = await response.json();

        if (data.success) {
          setAccount(data.account);
          setTransactions(data.transactions);
        }
      } catch (error) {
        logger.error('Failed to fetch miles data:', error as Error, { component: 'Mileswallet' });
      } finally {
        setLoading(false);
      }
    };

    fetchMilesData();
  }, [userId]);

  if (loading || !account) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>);

  }

  const tierProgress = calculateTierProgress(account.lifetimeEarned);
  const tierColors = getTierColorClasses(account.tier);
  const currentTierBenefits = TIER_BENEFITS[account.tier];

  return (
    <div className="space-y-6">
      {/* Miles Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl shadow-xl p-8 ${
        account.tier === 'vip' ?
        'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800' :
        account.tier === 'gold' ?
        'bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600' :
        account.tier === 'silver' ?
        'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600' :
        'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600'}`
        }>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lydian-glass-dark rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-lydian-glass-dark rounded-full -ml-24 -mb-24"></div>
        </div>

        <div className="relative">
          {/* Tier Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentTierBenefits.icon}</span>
              <div>
                <p className="text-lydian-text-inverse/80 text-sm">Üyelik Seviyeniz</p>
                <p className="text-lydian-text-inverse text-xl font-bold">
                  {currentTierBenefits.name}
                </p>
              </div>
            </div>

            <Sparkles className="h-8 w-8 text-lydian-text-inverse/60" />
          </div>

          {/* Available Miles */}
          <div className="mb-6">
            <p className="text-lydian-text-inverse/80 text-sm mb-2">Kullanılabilir Miles</p>
            <div className="flex items-baseline gap-2">
              <p className="text-lydian-text-inverse text-5xl font-bold">
                {account.availableMiles.toLocaleString()}
              </p>
              <p className="text-lydian-text-inverse/80 text-xl">Miles</p>
            </div>
            <p className="text-lydian-text-inverse/70 text-sm mt-2">
              ≈ ₺{(account.availableMiles / 1000 * 50).toLocaleString()} değerinde
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-lydian-glass-dark-medium backdrop-blur-sm rounded-lg p-3">
              <p className="text-lydian-text-inverse/70 text-xs mb-1">Kazanılan</p>
              <p className="text-lydian-text-inverse text-lg font-bold">
                {account.lifetimeEarned.toLocaleString()}
              </p>
            </div>

            <div className="bg-lydian-glass-dark-medium backdrop-blur-sm rounded-lg p-3">
              <p className="text-lydian-text-inverse/70 text-xs mb-1">Kullanılan</p>
              <p className="text-lydian-text-inverse text-lg font-bold">
                {account.usedMiles.toLocaleString()}
              </p>
            </div>

            <div className="bg-lydian-glass-dark-medium backdrop-blur-sm rounded-lg p-3">
              <p className="text-lydian-text-inverse/70 text-xs mb-1">Sona Erecek</p>
              <p className="text-lydian-text-inverse text-lg font-bold">
                {account.expiringMiles.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tier Progress */}
      {tierProgress.nextTier &&
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-lydian-glass-dark rounded-xl shadow-md p-6">

          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-lydian-text-inverse">
                {tierProgress.nextTier.name}'e Yükseltin!
              </h3>
              <p className="text-sm text-lydian-text-dim">
                {tierProgress.milesNeeded.toLocaleString()} Miles daha kazanın
              </p>
            </div>
            <Crown className="h-8 w-8 text-yellow-500" />
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-lydian-bg-active rounded-full h-4">
              <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tierProgress.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-purple-500 to-lydian-primary-dark h-4 rounded-full">
            </motion.div>
            </div>
            <p className="text-center text-sm font-semibold text-lydian-text-muted mt-2">
              %{tierProgress.progress.toFixed(0)} tamamlandı
            </p>
          </div>

          {/* Next Tier Benefits Preview */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm font-semibold text-purple-900 mb-2">
              {tierProgress.nextTier.name} Avantajları:
            </p>
            <ul className="space-y-1">
              {tierProgress.nextTier.benefits.slice(0, 3).map((benefit, index) =>
            <li key={index} className="text-xs text-purple-800 flex items-start gap-2">
                  <Star className="h-3 w-3 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
            )}
            </ul>
          </div>
        </motion.div>
      }

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-lydian-glass-dark rounded-xl shadow-md p-6">

          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-bold text-lydian-text-inverse">Avantajlarınız</h3>
          </div>

          <ul className="space-y-3">
            {currentTierBenefits.benefits.map((benefit, index) =>
            <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-lydian-success-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-lydian-success"></div>
                </div>
                <span className="text-sm text-lydian-text-muted">{benefit}</span>
              </li>
            )}
          </ul>

          {currentTierBenefits.discountPercentage > 0 &&
          <div className="mt-4 p-3 bg-lydian-success-lighter rounded-lg">
              <p className="text-sm font-bold text-green-900">
                Özel İndiriminiz: %{currentTierBenefits.discountPercentage}
              </p>
              <p className="text-xs text-lydian-success-text mt-1">
                Tüm rezervasyonlarınızda otomatik uygulanır
              </p>
            </div>
          }
        </motion.div>

        {/* Earn & Redeem Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4">

          {/* How to Earn */}
          <div className="bg-lydian-glass-dark rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-lydian-success" />
              <h3 className="text-lg font-bold text-lydian-text-inverse">Miles Kazanın</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                <span className="text-sm text-lydian-text-muted">Rezervasyon</span>
                <span className="text-sm font-bold text-lydian-text-inverse">₺1 = 1 Mile</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                <span className="text-sm text-lydian-text-muted">İlk rezervasyon bonusu</span>
                <span className="text-sm font-bold text-lydian-success">+500 Miles</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                <span className="text-sm text-lydian-text-muted">Doğum günü bonusu</span>
                <span className="text-sm font-bold text-purple-600">
                  +{currentTierBenefits.birthdayBonus} Miles
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">
                <span className="text-sm text-lydian-text-muted">Arkadaş davet</span>
                <span className="text-sm font-bold text-lydian-primary">
                  +{currentTierBenefits.referralBonus} Miles
                </span>
              </div>
            </div>
          </div>

          {/* How to Redeem */}
          <div className="bg-lydian-glass-dark rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-bold text-lydian-text-inverse">Miles Kullanın</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-bold text-orange-900 mb-1">
                  1,000 Miles = ₺50 indirim
                </p>
                <p className="text-xs text-orange-700">
                  Minimum 100 Miles kullanabilirsiniz
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-lydian-glass-dark rounded text-center">
                  <p className="font-bold text-lydian-text-inverse">5,000 Miles</p>
                  <p className="text-lydian-text-dim">₺250</p>
                </div>
                <div className="p-2 bg-lydian-glass-dark rounded text-center">
                  <p className="font-bold text-lydian-text-inverse">10,000 Miles</p>
                  <p className="text-lydian-text-dim">₺500</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Referral Program */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-purple-200">

        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-600 rounded-full">
            <Users className="h-6 w-6 text-lydian-text-inverse" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-lydian-text-inverse mb-2">
              Arkadaşınızı Davet Edin, Miles Kazanın!
            </h3>
            <p className="text-sm text-lydian-text-dim mb-4">
              Her davetiniz için siz {currentTierBenefits.referralBonus} Miles, arkadaşınız 500 Miles kazanır.
            </p>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={`AILXYZ${userId.substring(0, 3).toUpperCase()}`}
                readOnly
                className="flex-1 px-4 py-2 bg-lydian-glass-dark border border-lydian-border-light rounded-lg text-sm font-mono" />

              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-lydian-text-inverse rounded-lg font-medium flex items-center gap-2 transition-colors">
                <Share2 className="h-4 w-4" />
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expiring Miles Alert */}
      {account.expiringMiles > 0 && account.expiryDate &&
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-lydian-warning-lighter border-l-4 border-yellow-500 rounded-lg p-4">

          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-lydian-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-900">
                {account.expiringMiles.toLocaleString()} Miles'ınız sona eriyor!
              </p>
              <p className="text-xs text-lydian-warning-text mt-1">
                Son kullanma: {new Date(account.expiryDate).toLocaleDateString('tr-TR')}
              </p>
              <button className="mt-2 text-xs font-semibold text-yellow-800 hover:text-yellow-900 underline">
                Şimdi Kullan →
              </button>
            </div>
          </div>
        </motion.div>
      }

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-lydian-glass-dark rounded-xl shadow-md">

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between p-6 hover:bg-lydian-glass-dark transition-colors">

          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-lydian-text-dim" />
            <h3 className="text-lg font-bold text-lydian-text-inverse">İşlem Geçmişi</h3>
            <span className="text-sm text-lydian-text-muted">({transactions.length})</span>
          </div>
          <ChevronRight
            className={`h-5 w-5 text-lydian-text-muted transition-transform ${
            showHistory ? 'rotate-90' : ''}`
            } />

        </button>

        {showHistory &&
        <div className="px-6 pb-6 space-y-3 max-h-96 overflow-y-auto">
            {transactions.slice(0, 10).map((transaction) =>
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-lydian-glass-dark rounded-lg">

                <div className="flex-1">
                  <p className="text-sm font-semibold text-lydian-text-inverse">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-lydian-text-muted">
                    {new Date(transaction.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                <div className="text-right">
                  <p
                className={`text-sm font-bold ${
                transaction.type === 'earn' || transaction.type === 'bonus' ?
                'text-green-600' :
                transaction.type === 'redeem' ?
                'text-blue-600' :
                'text-red-600'}`
                }>

                    {transaction.type === 'earn' || transaction.type === 'bonus' ? '+' : '-'}
                    {transaction.amount.toLocaleString()} Miles
                  </p>
                  <p className="text-xs text-lydian-text-muted">
                    Bakiye: {transaction.balanceAfter.toLocaleString()}
                  </p>
                </div>
              </div>
          )}
          </div>
        }
      </motion.div>
    </div>);

};

export default MilesWallet;