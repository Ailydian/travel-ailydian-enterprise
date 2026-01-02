import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Camera,
  MessageSquare,
  Award,
  TrendingUp,
  MapPin,
  Users,
  Heart,
  Gift,
  Trophy,
  Target,
  ChevronRight,
  Badge,
  Zap,
  Globe } from 'lucide-react';
import reviewService from '../../lib/services/review-service';

// Mock data - in production, these would come from API calls
const featuredReviews = [
{
  id: 1,
  user: {
    name: 'Ahmet K.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    level: 'Elite Reviewer',
    totalReviews: 127
  },
  location: {
    name: 'Pandeli Restaurant',
    city: 'Istanbul',
    slug: 'pandeli-istanbul'
  },
  rating: 5,
  title: 'Osmanlı mutfağının eşsiz lezzeti',
  content: 'Mısır Çarşısı\'nın üstündeki bu tarihi mekan gerçekten muhteşem. Osmanlı mutfağının otantik tatlarını yaşayabileceğiniz nadir yerlerden.',
  photos: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200'],
  date: '2 gün önce',
  helpful: 23
},
{
  id: 2,
  user: {
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    level: 'Top Contributor',
    totalReviews: 89
  },
  location: {
    name: 'Hagia Sophia',
    city: 'Istanbul',
    slug: 'hagia-sophia-istanbul'
  },
  rating: 5,
  title: 'Breathtaking historical marvel',
  content: 'The architectural beauty and historical significance of Hagia Sophia is unmatched. A must-visit when in Istanbul.',
  photos: ['https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=300&h=200'],
  date: '1 hafta önce',
  helpful: 45
},
{
  id: 3,
  user: {
    name: 'Hans W.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    level: 'Local Guide',
    totalReviews: 156
  },
  location: {
    name: 'Four Seasons Hotel Istanbul',
    city: 'Istanbul',
    slug: 'four-seasons-istanbul-sultanahmet'
  },
  rating: 5,
  title: 'Luxurious stay in historic district',
  content: 'Perfect location with stunning views of Blue Mosque. Service was exceptional and the spa was amazing.',
  photos: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200'],
  date: '3 gün önce',
  helpful: 31
}];


const topReviewers = [
{
  id: 1,
  name: 'Elena Rodriguez',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e30a33?w=64&h=64&fit=crop&crop=face',
  level: 'Platinum Elite',
  reviews: 342,
  photos: 1234,
  badges: ['Top Contributor', 'Local Expert', 'Photo Master'],
  locations: 67
},
{
  id: 2,
  name: 'Marcus Chen',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  level: 'Gold Elite',
  reviews: 289,
  photos: 876,
  badges: ['Trusted Reviewer', 'Food Expert'],
  locations: 43
},
{
  id: 3,
  name: 'Fatma Özkan',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
  level: 'Gold Elite',
  reviews: 267,
  photos: 654,
  badges: ['Local Guide', 'Heritage Expert'],
  locations: 52
}];


const incentivePrograms = [
{
  title: 'Review Master',
  description: '10 yorum yazın ve özel rozet kazanın',
  icon: Star,
  progress: 7,
  target: 10,
  reward: 'Özel Rozet + %10 İndirim',
  color: 'blue'
},
{
  title: 'Photo Explorer',
  description: '50 fotoğraf paylaşın ve fotoğraf uzmanı olun',
  icon: Camera,
  progress: 23,
  target: 50,
  reward: 'Pro Rozet + Ücretsiz Fotoğraf Kitabı',
  color: 'purple'
},
{
  title: 'Local Guide',
  description: 'Şehrinizde 25 mekan hakkında rehberlik yapın',
  icon: MapPin,
  progress: 12,
  target: 25,
  reward: 'Local Guide Rozetı + VIP Status',
  color: 'green'
}];


export default function ReviewSystemIntegration() {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('reviews');
  const [showIncentives, setShowIncentives] = useState(false);

  return (
    <div className="space-y-16">
      {/* Featured Reviews Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
              🌟 Gerçek Deneyimler, Güvenilir Yorumlar
            </h2>
            <p className="text-lg text-gray-400 dark:text-gray-400 max-w-3xl mx-auto">
              Milyonlarca gezgin deneyimlerini paylaşıyor. Siz de seyahatlerinizi planlarken onların tavsiyelerinden faydalanın.
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
            { label: 'Toplam Yorum', value: '12.4M', icon: MessageSquare, color: 'blue' },
            { label: 'Paylaşılan Fotoğraf', value: '8.7M', icon: Camera, color: 'purple' },
            { label: 'Mutlu Gezgin', value: '2.1M', icon: Users, color: 'green' },
            { label: 'Kayıtlı Mekan', value: '450K', icon: MapPin, color: 'orange' }].
            map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-lydian-bg/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}-100 rounded-lg mb-3`}>
                    <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="text-2xl font-bold text-white dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400 dark:text-gray-400">{stat.label}</div>
                </div>);

            })}
          </div>

          {/* Featured Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review) =>
            <div key={review.id} className="bg-gradient-to-br from-slate-900 via-black to-slate-800 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <Image
                  src={review.user.avatar}
                  alt={review.user.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-blue-200" />

                  <div className="ml-3">
                    <h4 className="font-semibold text-white dark:text-white">{review.user.name}</h4>
                    <div className="flex items-center">
                      <Badge className="h-3 w-3 text-purple-600 mr-1" />
                      <span className="text-xs text-purple-600 font-medium">{review.user.level}</span>
                      <span className="text-xs text-gray-300 ml-2">({review.user.totalReviews} yorum)</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <Link href={`/location/${review.location.slug}`}>
                  <div className="flex items-center text-sm text-gray-400 dark:text-gray-400 mb-3 hover:text-blue-500 transition-colors">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{review.location.name}, {review.location.city}</span>
                  </div>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) =>
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`
                  } />

                )}
                  <span className="text-sm text-gray-400 dark:text-gray-400 ml-2">{review.date}</span>
                </div>

                {/* Review Content */}
                <h5 className="font-semibold text-white dark:text-white mb-2">{review.title}</h5>
                <p className="text-gray-400 dark:text-gray-400 text-sm mb-4 line-clamp-3">{review.content}</p>

                {/* Photo */}
                {review.photos.length > 0 &&
              <div className="mb-4">
                    <Image
                  src={review.photos[0]}
                  alt="Review photo"
                  width={250}
                  height={150}
                  className="rounded-lg w-full h-24 object-cover" />

                  </div>
              }

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-300">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{review.helpful} kişi faydalı buldu</span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Devamını oku
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">

              <MessageSquare className="h-5 w-5 mr-2" />
              Tüm Yorumları Keşfet
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* User Incentives & Gamification */}
      <section className="py-12 bg-gradient-to-br from-slate-900 via-black to-slate-800 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
              🎯 Katkılarınız Ödüllendirilir
            </h2>
            <p className="text-lg text-gray-400 dark:text-gray-400 max-w-3xl mx-auto">
              Yorum yazın, fotoğraf paylaşın, diğer gezginlere yardım edin ve özel ödüller kazanın.
            </p>
          </div>

          {/* Current Incentive Programs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {incentivePrograms.map((program, index) => {
              const IconComponent = program.icon;
              const progressPercentage = program.progress / program.target * 100;

              return (
                <div key={index} className={`bg-gradient-to-br from-${program.color}-50 to-${program.color}-100 dark:from-${program.color}-900/20 dark:to-${program.color}-800/20 rounded-2xl p-6 border border-${program.color}-200 dark:border-${program.color}-800`}>
                  <div className="flex items-center mb-4">
                    <div className={`bg-${program.color}-600 p-3 rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold text-white dark:text-white">{program.title}</h4>
                      <p className="text-sm text-gray-400 dark:text-gray-400">{program.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400 dark:text-gray-400">İlerleme</span>
                      <span className="font-semibold text-white dark:text-white">
                        {program.progress}/{program.target}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-${program.color}-600 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${progressPercentage}%` }} />

                    </div>
                  </div>

                  {/* Reward */}
                  <div className={`bg-white/50 dark:bg-lydian-glass-heavy rounded-lg p-3 border border-${program.color}-200 dark:border-${program.color}-800`}>
                    <div className="flex items-center">
                      <Gift className={`h-4 w-4 text-${program.color}-600 mr-2`} />
                      <span className="text-sm font-medium text-white dark:text-white">
                        {program.reward}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className={`w-full mt-4 bg-${program.color}-600 text-white py-2 rounded-lg hover:bg-${program.color}-700 transition-colors font-medium`}>
                    Devam Et
                  </button>
                </div>);

            })}
          </div>

          {/* Top Contributors */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white dark:text-white mb-2">
                  🏆 Bu Ayın En Aktif Katkıda Bulunanları
                </h3>
                <p className="text-gray-400 dark:text-gray-400">
                  Toplumuzun en değerli üyelerini keşfedin ve onları takip edin
                </p>
              </div>
              <Link
                href="/top-reviewers"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">

                Tümünü Gör
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topReviewers.map((reviewer, index) =>
              <div key={reviewer.id} className="bg-gradient-to-br from-slate-900 via-black to-slate-800 dark:bg-gray-800 rounded-xl p-6 shadow-lg relative">
                  {/* Rank Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                index === 0 ? 'bg-yellow-500-hover' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'}`
                }>
                    {index + 1}
                  </div>

                  <div className="flex items-center mb-4">
                    <Image
                    src={reviewer.avatar}
                    alt={reviewer.name}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-purple-200" />

                    <div className="ml-3">
                      <h4 className="font-bold text-white dark:text-white">{reviewer.name}</h4>
                      <div className="flex items-center">
                        <Trophy className="h-3 w-3 text-purple-600 mr-1" />
                        <span className="text-xs text-purple-600 font-medium">{reviewer.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white dark:text-white">{reviewer.reviews}</div>
                      <div className="text-xs text-gray-300">Yorum</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white dark:text-white">{reviewer.photos}</div>
                      <div className="text-xs text-gray-300">Fotoğraf</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white dark:text-white">{reviewer.locations}</div>
                      <div className="text-xs text-gray-300">Mekan</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {reviewer.badges.slice(0, 2).map((badge, badgeIndex) =>
                  <span
                    key={badgeIndex}
                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">

                        {badge}
                      </span>
                  )}
                    {reviewer.badges.length > 2 &&
                  <span className="px-2 py-1 bg-white/10 backdrop-blur-xl border border-white/20 text-gray-400 text-xs rounded-full">
                        +{reviewer.badges.length - 2}
                      </span>
                  }
                  </div>

                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    Takip Et
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Join Community CTA */}
          <div className="text-center mt-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white dark:text-white mb-4">
                Sen de Topluluğumuza Katıl! 🚀
              </h3>
              <p className="text-gray-400 dark:text-gray-400 mb-6">
                İlk yorumunu yaz, özel rozetini kazan ve diğer gezginlere yardım et. 
                Her katkın değerli ve ödüllendirilecek!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-lydian-success to-purple-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">

                  <Zap className="h-5 w-5 mr-2" />
                  Hemen Başla
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center px-6 py-3 border-2 border-white/20 text-gray-300 dark:text-gray-400 font-semibold rounded-lg hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 dark:hover:bg-gray-800 transition-all duration-300">

                  <Target className="h-5 w-5 mr-2" />
                  Nasıl Çalışır?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Service Review Prompts */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Yeni Seyahat Ettin mi? 🌟</h3>
              <p className="text-blue-100">
                Deneyimlerini paylaş, diğer gezginlere yardım et ve özel ödüller kazan!
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="bg-gradient-to-br from-slate-900 via-black to-slate-800 text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-blue-500/10er transition-colors">
                Yorum Yaz
              </button>
              <button className="border-2 border-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gradient-to-br from-slate-900 via-black to-slate-800 hover:text-blue-500 transition-colors">
                Fotoğraf Paylaş
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);

}