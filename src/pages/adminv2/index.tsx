/**
 * AdminV2 Dashboard - Apple Vision Pro Inspired Analytics
 * Premium glassmorphic admin dashboard with real-time stats
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  MapPin,
  Star,
  Zap,
  Activity,
  Globe,
  Sparkles,
} from 'lucide-react';
import AdminV2Layout from '@/components/adminv2/AdminV2Layout';

interface StatCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

export default function AdminV2Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Mock stats data
  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '₺2,456,890',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Active Bookings',
      value: '1,247',
      change: 8.2,
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Total Users',
      value: '45,678',
      change: 5.4,
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Page Views',
      value: '892,345',
      change: -2.1,
      trend: 'down',
      icon: Eye,
      color: 'from-orange-500 to-red-600',
    },
  ];

  const recentActivity = [
    { type: 'booking', user: 'Ahmet Y.', action: 'New booking for Istanbul Tour', time: '2 min ago', icon: Package },
    { type: 'user', user: 'Zeynep K.', action: 'New user registration', time: '15 min ago', icon: Users },
    { type: 'review', user: 'Mehmet S.', action: 'Left 5-star review', time: '1 hour ago', icon: Star },
    { type: 'tour', user: 'Admin', action: 'Updated Cappadocia Tour', time: '3 hours ago', icon: Activity },
  ];

  const topDestinations = [
    { name: 'Istanbul', bookings: 456, revenue: '₺890,234', growth: 15.2 },
    { name: 'Cappadocia', bookings: 342, revenue: '₺654,123', growth: 22.8 },
    { name: 'Antalya', bookings: 289, revenue: '₺523,456', growth: 8.5 },
    { name: 'Pamukkale', bookings: 167, revenue: '₺312,890', growth: -3.2 },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (!session || session.user?.role !== 'admin') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - AdminV2 | AILYDIAN Holiday</title>
      </Head>

      <AdminV2Layout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-lydian-text-inverse bg-clip-text text-transparent bg-gradient-to-r from-lydian-primary via-lydian-accent to-lydian-primary"
              >
                Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lydian-text-muted mt-2 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <button className="px-6 py-3 bg-gradient-to-r from-lydian-primary to-lydian-accent text-lydian-text-inverse rounded-xl font-semibold hover:shadow-lg hover:shadow-lydian-primary/30 transition-all flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Insights
              </button>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;

              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Glass Card */}
                  <div className="relative bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl p-6 border border-lydian-border-light/20 hover:border-lydian-primary/30 transition-all overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                    {/* Icon */}
                    <div className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-br ${stat.color} opacity-10`}>
                      <Icon className="w-6 h-6 text-lydian-text-inverse" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <p className="text-sm text-lydian-text-muted mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-lydian-text-inverse mb-3">{stat.value}</p>

                      {/* Change Indicator */}
                      <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        <TrendIcon className="w-4 h-4" />
                        <span>{Math.abs(stat.change)}%</span>
                        <span className="text-lydian-text-dim font-normal">vs last month</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts & Activity Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-2 bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl p-6 border border-lydian-border-light/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-lydian-text-inverse flex items-center gap-2">
                  <Activity className="w-5 h-5 text-lydian-primary" />
                  Recent Activity
                </h2>
                <button className="text-sm text-lydian-primary hover:text-lydian-primary-hover flex items-center gap-1">
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-lydian-glass-dark/30 hover:bg-lydian-glass-dark/50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lydian-primary/20 to-lydian-accent/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-lydian-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-lydian-text-inverse">{activity.user}</p>
                        <p className="text-xs text-lydian-text-muted">{activity.action}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-lydian-text-dim">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Top Destinations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl p-6 border border-lydian-border-light/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-lydian-text-inverse flex items-center gap-2">
                  <Globe className="w-5 h-5 text-lydian-accent" />
                  Top Destinations
                </h2>
              </div>

              <div className="space-y-4">
                {topDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-lydian-accent" />
                        <span className="font-semibold text-lydian-text-inverse">{dest.name}</span>
                      </div>
                      <span className={`text-xs font-semibold ${dest.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {dest.growth >= 0 ? '+' : ''}{dest.growth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-lydian-text-muted">{dest.bookings} bookings</span>
                      <span className="text-lydian-text-inverse font-semibold">{dest.revenue}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-2 h-1.5 bg-lydian-glass-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(dest.bookings / 456) * 100}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-lydian-primary to-lydian-accent rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-lydian-glass-light/40 backdrop-blur-xl rounded-2xl p-6 border border-lydian-border-light/20"
          >
            <h2 className="text-xl font-bold text-lydian-text-inverse mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-lydian-warning" />
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Add Tour', icon: Package, href: '/adminv2/tours/new' },
                { label: 'Upload Media', icon: Activity, href: '/adminv2/media' },
                { label: 'View Analytics', icon: TrendingUp, href: '/adminv2/monitoring' },
                { label: 'Manage Users', icon: Users, href: '/adminv2/users' },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(action.href)}
                    className="p-6 bg-lydian-glass-dark/30 hover:bg-lydian-glass-dark/50 rounded-xl border border-lydian-border-light/10 hover:border-lydian-primary/30 transition-all flex flex-col items-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lydian-primary/20 to-lydian-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-lydian-primary" />
                    </div>
                    <span className="text-sm font-semibold text-lydian-text-inverse">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </AdminV2Layout>
    </>
  );
}
