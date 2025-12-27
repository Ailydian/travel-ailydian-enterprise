/**
 * 🤖 AI TRAVEL PLANNER 2025
 * Neo-Glass Design System + AI-Powered Itinerary Generator
 * Enterprise-grade UX with Futuristic Aesthetics
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  MapPin,
  Calendar,
  Users,
  Clock,
  Star,
  Sparkles,
  Brain,
  Target,
  Wand2,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Camera,
  Send,
  Plus,
  Minus,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';
import { FuturisticHeader } from '../components/layout/FuturisticHeader';
import { NeoHero, FuturisticCard, FuturisticButton, NeoSection } from '../components/neo-glass';

// Types
interface FormData {
  destination: string;
  duration: string;
  travelers: number;
  budget: string;
  interests: string[];
  travelStyle: string;
  dates: string;
}

interface TravelStyle {
  id: string;
  name: string;
  desc: string;
  icon: any;
  gradient: string;
}

const AITravelPlanner: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    duration: '',
    travelers: 1,
    budget: '',
    interests: [],
    travelStyle: '',
    dates: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Kültürel Turlar', 'Doğa ve Macera', 'Gece Hayatı', 'Gastronomi',
    'Sanat ve Müze', 'Plaj ve Deniz', 'Tarih', 'Spa & Wellness',
    'Fotoğrafçılık', 'Aile Aktiviteleri', 'Romantik', 'Alışveriş'
  ];

  const travelStyles: TravelStyle[] = [
    {
      id: 'luxury',
      name: 'Lüks',
      desc: 'En iyi oteller ve premium deneyimler',
      icon: Award,
      gradient: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'comfort',
      name: 'Konforlu',
      desc: 'Kaliteli konaklama ve güzel deneyimler',
      icon: Star,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'budget',
      name: 'Ekonomik',
      desc: 'Bütçe dostu seçenekler',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'adventure',
      name: 'Macera',
      desc: 'Adrenalin dolu deneyimler',
      icon: Zap,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here would be actual AI API call
      alert('AI Planınız oluşturuldu! (Demo mode)');
    }, 3000);
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <>
      <Head>
        <title>AI Seyahat Planlama - Travel.LyDian | Akıllı Seyahat Planı</title>
        <meta name="description" content="Yapay zeka destekli kişiselleştirilmiş seyahat planı oluşturun. AI algoritmaları ile size özel itineraryler ve öneriler." />
        <meta name="keywords" content="AI seyahat planlama, akıllı seyahat, yapay zeka turizm, otomatik itinerary, seyahat planlayıcı" />
        <meta property="og:title" content="AI Seyahat Planlama - Travel.LyDian" />
        <meta property="og:description" content="Yapay zeka ile kişiselleştirilmiş seyahat planları" />
      </Head>

      <FuturisticHeader />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0f] to-gray-900 dark:from-gray-950 dark:via-black dark:to-gray-950">

        {/* 🌟 HERO SECTION - NEO-GLASS */}
        <NeoHero
          title="AI Seyahat Planlama"
          subtitle="Yapay zeka teknolojisi ile kişiselleştirilmiş seyahat planları oluşturun. 30 saniyede otomatik itinerary, otel önerileri ve aktivite planları."
          gradient="cosmic"
          height="60vh"
          overlayOpacity={0.2}
          showFloatingElements={true}
        >
          {/* Stats Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Sparkles, text: '1M+ Başarılı Plan', color: '#FFD700' },
              { icon: Target, text: '%95 Memnuniyet', color: '#00BAFF' },
              { icon: Zap, text: '30 Saniyede Plan', color: '#FF9500' },
              { icon: Globe, text: '190+ Ülke', color: '#667EEA' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 shadow-lg"
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className="text-white font-medium text-sm">{stat.text}</span>
              </motion.div>
            ))}
          </div>
        </NeoHero>

        {/* 🎯 AI PLANNER FORM - FUTURISTIC CARD */}
        <NeoSection className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <FuturisticCard variant="glass" glowColor="purple" className="overflow-hidden">

              {/* Progress Bar - Neo-Glass Style */}
              <div className="relative p-8 border-b border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-[#667EEA]" />
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#667EEA] to-[#00BAFF] bg-clip-text text-transparent">
                      AI ile Kişisel Seyahat Planı
                    </h2>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                    {step}/4
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="relative w-full h-3 bg-white/5 dark:bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#667EEA] via-[#00BAFF] to-[#667EEA] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                </div>

                {/* Step indicators */}
                <div className="flex justify-between mt-4">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step >= stepNumber
                          ? 'bg-gradient-to-br from-[#667EEA] to-[#00BAFF] text-white shadow-lg'
                          : 'bg-white/5 text-gray-500 border border-white/10'
                      }`}>
                        {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                      </div>
                      <span className="text-xs text-gray-400 hidden md:block">
                        {stepNumber === 1 && 'Temel'}
                        {stepNumber === 2 && 'İlgiler'}
                        {stepNumber === 3 && 'Tarz'}
                        {stepNumber === 4 && 'Oluştur'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">

                  {/* ========== STEP 1: DESTINATION & BASICS ========== */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mb-4"
                        >
                          <MapPin className="w-16 h-16 text-[#00BAFF]" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-3">
                          Nereye gitmek istiyorsunuz?
                        </h3>
                        <p className="text-gray-400">
                          Temel bilgileri verin, AI size en uygun planı oluştursun.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Destination Input */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Destinasyon
                          </label>
                          <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            placeholder="Örn: İstanbul, Kapadokya, Paris..."
                            className="w-full px-5 py-4 bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#667EEA] focus:ring-2 focus:ring-[#667EEA]/20 outline-none transition-all backdrop-blur-xl"
                          />
                        </div>

                        {/* Duration Select */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            <Clock className="w-4 h-4 inline mr-2" />
                            Seyahat Süresi
                          </label>
                          <select
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-5 py-4 bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl text-white focus:border-[#667EEA] focus:ring-2 focus:ring-[#667EEA]/20 outline-none transition-all backdrop-blur-xl"
                          >
                            <option value="" className="bg-gray-900">Seçin</option>
                            <option value="1-2" className="bg-gray-900">1-2 Gün</option>
                            <option value="3-5" className="bg-gray-900">3-5 Gün</option>
                            <option value="1-week" className="bg-gray-900">1 Hafta</option>
                            <option value="2-weeks" className="bg-gray-900">2 Hafta</option>
                            <option value="1-month" className="bg-gray-900">1 Ay+</option>
                          </select>
                        </div>

                        {/* Travelers Counter */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            <Users className="w-4 h-4 inline mr-2" />
                            Kaç Kişi?
                          </label>
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                              className="p-3 bg-white/5 dark:bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-xl"
                            >
                              <Minus className="w-5 h-5 text-white" />
                            </motion.button>
                            <span className="text-3xl font-bold text-white w-16 text-center">
                              {formData.travelers}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                              className="p-3 bg-white/5 dark:bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-xl"
                            >
                              <Plus className="w-5 h-5 text-white" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Budget Select */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            <TrendingUp className="w-4 h-4 inline mr-2" />
                            Bütçe (Kişi başı)
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-5 py-4 bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl text-white focus:border-[#667EEA] focus:ring-2 focus:ring-[#667EEA]/20 outline-none transition-all backdrop-blur-xl"
                          >
                            <option value="" className="bg-gray-900">Seçin</option>
                            <option value="budget" className="bg-gray-900">Ekonomik (₺500-1500)</option>
                            <option value="mid" className="bg-gray-900">Orta (₺1500-3000)</option>
                            <option value="high" className="bg-gray-900">Yüksek (₺3000-6000)</option>
                            <option value="luxury" className="bg-gray-900">Lüks (₺6000+)</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========== STEP 2: INTERESTS ========== */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mb-4"
                        >
                          <Star className="w-16 h-16 text-[#FF9500]" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-3">
                          İlgi Alanlarınız
                        </h3>
                        <p className="text-gray-400">
                          Hangi aktiviteler sizi heyecanlandırıyor? (Birden fazla seçebilirsiniz)
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {interests.map((interest) => {
                          const isSelected = formData.interests.includes(interest);
                          return (
                            <motion.button
                              key={interest}
                              onClick={() => handleInterestToggle(interest)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative p-4 rounded-2xl border-2 transition-all text-sm font-semibold overflow-hidden ${
                                isSelected
                                  ? 'border-[#FF9500] bg-gradient-to-br from-[#FF9500]/20 to-[#FF9500]/10 text-white shadow-lg'
                                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="selectedInterest"
                                  className="absolute top-2 right-2"
                                >
                                  <CheckCircle className="w-5 h-5 text-[#FF9500]" />
                                </motion.div>
                              )}
                              <span className="block">{interest}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          {formData.interests.length} ilgi alanı seçildi
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ========== STEP 3: TRAVEL STYLE ========== */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="inline-block mb-4"
                        >
                          <Wand2 className="w-16 h-16 text-[#667EEA]" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-3">
                          Seyahat Tarzınız
                        </h3>
                        <p className="text-gray-400">
                          Nasıl bir deneyim yaşamak istiyorsunuz?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {travelStyles.map((style) => {
                          const isSelected = formData.travelStyle === style.id;
                          const Icon = style.icon;
                          return (
                            <motion.button
                              key={style.id}
                              onClick={() => setFormData({ ...formData, travelStyle: style.id })}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-8 rounded-3xl border-2 transition-all text-left overflow-hidden group ${
                                isSelected
                                  ? 'border-white/40 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl'
                                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              {/* Background gradient */}
                              {isSelected && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-10`} />
                              )}

                              <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${style.gradient}`}>
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                  <h4 className="font-bold text-xl text-white">{style.name}</h4>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="ml-auto"
                                    >
                                      <CheckCircle className="w-6 h-6 text-[#00BAFF]" />
                                    </motion.div>
                                  )}
                                </div>
                                <p className="text-gray-400 leading-relaxed">{style.desc}</p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ========== STEP 4: SUMMARY & GENERATE ========== */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mb-4"
                        >
                          <Bot className="w-16 h-16 text-[#00BAFF]" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-3">
                          AI Planınız Hazırlanıyor
                        </h3>
                        <p className="text-gray-400">
                          Son bir kontrol yapalım ve AI size mükemmel planı oluştursun!
                        </p>
                      </div>

                      {/* Summary Card */}
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                          <Shield className="w-6 h-6 text-[#00BAFF]" />
                          <h4 className="font-bold text-xl text-white">Plan Özeti</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#667EEA] mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">Destinasyon</p>
                              <p className="font-semibold text-white">{formData.destination || 'Belirtilmedi'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-[#00BAFF] mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">Süre</p>
                              <p className="font-semibold text-white">{formData.duration || 'Belirtilmedi'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-[#FF9500] mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">Kişi Sayısı</p>
                              <p className="font-semibold text-white">{formData.travelers} Kişi</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <TrendingUp className="w-5 h-5 text-[#10B981] mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">Bütçe</p>
                              <p className="font-semibold text-white">{formData.budget || 'Belirtilmedi'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:col-span-2">
                            <Star className="w-5 h-5 text-[#FFD700] mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">İlgi Alanları</p>
                              <p className="font-semibold text-white">
                                {formData.interests.length > 0 ? formData.interests.join(', ') : 'Belirtilmedi'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:col-span-2">
                            <Wand2 className="w-5 h-5 text-[#EC4899] mt-1" />
                            <div>
                              <p className="text-sm text-gray-400">Seyahat Tarzı</p>
                              <p className="font-semibold text-white">
                                {travelStyles.find(s => s.id === formData.travelStyle)?.name || 'Belirtilmedi'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <div className="text-center pt-4">
                        <FuturisticButton
                          variant="primary"
                          size="lg"
                          onClick={handleGeneratePlan}
                          disabled={isGenerating}
                          className="min-w-[300px]"
                        >
                          {isGenerating ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <Bot className="w-6 h-6" />
                              </motion.div>
                              <span>AI Oluşturuyor...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-6 h-6" />
                              <span>AI Planımı Oluştur</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </FuturisticButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
                  <FuturisticButton
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Geri
                  </FuturisticButton>

                  {step < 4 && (
                    <FuturisticButton
                      variant="secondary"
                      onClick={() => setStep(Math.min(4, step + 1))}
                    >
                      İleri
                      <ArrowRight className="w-4 h-4" />
                    </FuturisticButton>
                  )}
                </div>
              </div>
            </FuturisticCard>
          </div>
        </NeoSection>

        {/* 🎯 FEATURES SECTION - NEO-GLASS */}
        <NeoSection className="py-20 bg-gradient-to-b from-transparent via-[#667EEA]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  AI Planlama Avantajları
                </h2>
                <p className="text-xl text-gray-400">
                  Neden AI ile seyahat planlamak daha iyi?
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'Akıllı Algoritma',
                  description: 'Milyonlarca veri noktasından öğrenen AI ile size en uygun önerileri alın.',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Clock,
                  title: '30 Saniyede Plan',
                  description: 'Saatlerce araştırma yerine AI sayesinde dakikalar içinde detaylı plan.',
                  gradient: 'from-green-500 to-emerald-600'
                },
                {
                  icon: Target,
                  title: 'Kişiselleştirilmiş',
                  description: 'Bütçenize, ilgi alanlarınıza ve seyahat tarzınıza özel planlar.',
                  gradient: 'from-purple-500 to-pink-600'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FuturisticCard variant="glass" hoverEffect="lift" className="h-full">
                    <div className="text-center p-8">
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-bold text-2xl text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </FuturisticCard>
                </motion.div>
              ))}
            </div>
          </div>
        </NeoSection>
      </main>
    </>
  );
};

export default AITravelPlanner;
