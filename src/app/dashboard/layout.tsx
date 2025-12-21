'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Calendar,
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  User,
  Menu,
  X,
  Home,
  Plus,
  Search,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  LogOut
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigation = [
    { name: 'Genel Bakış', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mülklerim', href: '/dashboard/properties', icon: Building2 },
    { name: 'Rezervasyonlar', href: '/dashboard/bookings', icon: Calendar },
    { name: 'Takvim', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Gelirler', href: '/dashboard/earnings', icon: DollarSign },
    { name: 'Mesajlar', href: '/dashboard/messages', icon: MessageSquare, badge: 5 },
    { name: 'Analitik', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Top Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB'
              }}>
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 33, 77, 0.1)',
                color: 'var(--ac-1)'
              }}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black neon-text-strong" style={{ color: 'var(--ac-1)' }}>
                    Property
                  </span>
                  <span className="text-xl font-black" style={{ color: '#000000' }}>
                    Owner
                  </span>
                </div>
                <span className="text-xs font-medium" style={{ color: '#666666' }}>
                  Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      style={{ color: '#666666' }} />
              <input
                type="text"
                placeholder="Mülk, rezervasyon veya misafir ara..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border-2 transition-all focus:outline-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB',
                  color: '#000000'
                }}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Add Property Button */}
            <Link
              href="/dashboard/properties/new"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 neon-glow"
              style={{
                background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                color: 'white',
                boxShadow: '0 0 20px rgba(255, 33, 77, 0.5)'
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Mülk Ekle</span>
            </Link>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 33, 77, 0.1)',
                      color: 'var(--ac-1)'
                    }}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                      color: 'white'
                    }}>
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255, 33, 77, 0.1)',
                  color: '#000000'
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))'
                     }}>
                  <User className="w-4 h-4" style={{ color: 'white' }} />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border-2 overflow-hidden shadow-2xl"
                     style={{
                       backgroundColor: '#FFFFFF',
                       borderColor: '#E5E7EB'
                     }}>
                  <div className="p-4 border-b"
                       style={{ borderColor: '#E5E7EB' }}>
                    <p className="font-bold" style={{ color: '#000000' }}>Ahmet Yılmaz</p>
                    <p className="text-sm" style={{ color: '#666666' }}>ahmet@example.com</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: 'var(--ac-1)' }} />
                      <span className="text-sm font-medium" style={{ color: '#000000' }}>
                        Süper Host (4.9)
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        color: '#000000',
                        backgroundColor: profileOpen ? 'rgba(255, 33, 77, 0.1)' : 'transparent'
                      }}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Ayarlar</span>
                    </Link>
                    <button
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:scale-105 w-full"
                      style={{ color: 'var(--ac-1)' }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 border-r transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        }`}
        style={{
          backgroundColor: '#F9FAFB',
          borderColor: '#E5E7EB'
        }}
      >
        <nav className="h-full overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  active ? 'neon-glow' : ''
                }`}
                style={{
                  backgroundColor: active ? 'rgba(255, 33, 77, 0.15)' : 'transparent',
                  borderLeft: active ? '3px solid var(--ac-1)' : '3px solid transparent',
                  color: active ? 'var(--ac-1)' : '#666666'
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className={`font-medium ${active ? 'neon-text-strong' : ''}`}>
                    {item.name}
                  </span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-bold rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, var(--ac-1), var(--ac-2))',
                          color: 'white'
                        }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t"
             style={{ borderColor: '#E5E7EB' }}>
          <div className="rounded-xl p-4"
               style={{
                 background: 'linear-gradient(135deg, rgba(255, 33, 77, 0.1), rgba(255, 106, 69, 0.1))',
                 border: '1px solid rgba(255, 33, 77, 0.3)'
               }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--ac-1)' }} />
              <span className="font-bold" style={{ color: '#000000' }}>Performans</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span style={{ color: '#666666' }}>Doluluk:</span>
                <span className="font-medium" style={{ color: 'var(--ac-1)' }}>87%</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#666666' }}>Ortalama Puan:</span>
                <span className="font-medium" style={{ color: 'var(--ac-1)' }}>4.9</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } pt-16`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
