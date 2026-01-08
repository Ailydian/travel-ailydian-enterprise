/**
 * ADMIN V2 - SYSTEM SETTINGS
 * Complete system configuration management
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import logger from '../../../lib/logger';
import { useToast } from '../../../context/ToastContext';
import {
  ArrowLeft,
  Save,
  Shield,
  Globe,
  Bell,
  Mail,
  Key,
  Database,
  Server,
  CreditCard,
  Users,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Settings as SettingsIcon,
  Zap,
  Code,
  Smartphone,
  Monitor,
  Cloud,
  HardDrive
} from 'lucide-react';

type SettingsSection = 'general' | 'payment' | 'notifications' | 'security' | 'api' | 'integrations';

const SystemSettings = () => {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load settings from API
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const result = await res.json();
      if (result.success) {
        setSettings(result.data);
      }
    } catch (error) {
      logger.error('Error fetching settings:', error as Error, { component: 'Settings' });
    }
  };

  const handleSave = async (section: string, data: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data })
      });

      if (res.ok) {
        setSuccessMessage('Ayarlar başarıyla kaydedildi!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchSettings();
      }
    } catch (error) {
      logger.error('Error saving settings:', error as Error, { component: 'Settings' });
      showToast({ type: 'error', title: 'Kaydetme başarısız' });
    } finally {
      setSaving(false);
    }
  };

  const sections = [
  { id: 'general', name: 'Genel Ayarlar', icon: SettingsIcon, color: 'blue' },
  { id: 'payment', name: 'Ödeme Ayarları', icon: CreditCard, color: 'green' },
  { id: 'notifications', name: 'Bildirimler', icon: Bell, color: 'purple' },
  { id: 'security', name: 'Güvenlik', icon: Shield, color: 'red' },
  { id: 'api', name: 'API Anahtarları', icon: Code, color: 'orange' },
  { id: 'integrations', name: 'Entegrasyonlar', icon: Zap, color: 'pink' }];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl bg-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-xl rounded-lg transition-all">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
              </Link>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Sistem Ayarları
                </h1>
                <p className="text-sm text-gray-300">
                  Tüm sistem konfigürasyonları
                </p>
              </div>
            </div>

            {successMessage &&
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500-lighter text-purple-400-text rounded-lg">

                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{successMessage}</span>
              </motion.div>
            }
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-4 sticky top-24">
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as SettingsSection)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                      isActive ?
                      `bg-gradient-to-r from-${section.color}-500 to-${section.color}-600 text-white shadow-md` :
                      'text-gray-300 hover:bg-white/5'}
                      `
                      }>

                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.name}</span>
                    </button>);

                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {activeSection === 'general' && <GeneralSettings onSave={handleSave} saving={saving} />}
            {activeSection === 'payment' && <PaymentSettings onSave={handleSave} saving={saving} />}
            {activeSection === 'notifications' && <NotificationSettings onSave={handleSave} saving={saving} />}
            {activeSection === 'security' && <SecuritySettings onSave={handleSave} saving={saving} />}
            {activeSection === 'api' && <APISettings onSave={handleSave} saving={saving} />}
            {activeSection === 'integrations' && <IntegrationSettings onSave={handleSave} saving={saving} />}
          </div>
        </div>
      </div>
    </div>);

};

// General Settings
const GeneralSettings = ({ onSave, saving }: any) => {
  const [formData, setFormData] = useState({
    siteName: 'Travel LyDian',
    siteUrl: 'https://holiday.ailydian.com',
    supportEmail: 'support@lydian.com',
    defaultLanguage: 'tr',
    defaultCurrency: 'TRY',
    timezone: 'Europe/Istanbul'
  });

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Genel Ayarlar</h2>
        <button
          onClick={() => onSave('general', formData)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all disabled:opacity-50">

          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Site Adı
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Destek E-posta
          </label>
          <input
            type="email"
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
            className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />

        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Varsayılan Dil
            </label>
            <select
              value={formData.defaultLanguage}
              onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">

              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Varsayılan Para Birimi
            </label>
            <select
              value={formData.defaultCurrency}
              onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value })}
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">

              <option value="TRY">TRY (₺)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Zaman Dilimi
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">

              <option value="Europe/Istanbul">İstanbul</option>
              <option value="Europe/London">Londra</option>
              <option value="America/New_York">New York</option>
            </select>
          </div>
        </div>
      </div>
    </div>);

};

// Payment Settings
const PaymentSettings = ({ onSave, saving }: any) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-white mb-6">Ödeme Ayarları</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600-lighter border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Ödeme Entegrasyonları</h3>
              <p className="text-sm text-blue-400">
                Stripe, PayPal, Iyzico ve diğer ödeme gateway'leri burada yapılandırılabilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

// Notification Settings
const NotificationSettings = ({ onSave, saving }: any) => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    systemAlerts: true
  });

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Bildirim Ayarları</h2>
        <button
          onClick={() => onSave('notifications', notifications)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all disabled:opacity-50">

          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-3">
        {Object.entries(notifications).map(([key, value]) =>
        <label key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/5 backdrop-blur-xl transition-all cursor-pointer">
            <span className="font-medium text-white capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
            className="w-5 h-5 text-blue-400 rounded focus:ring-2 focus:ring-purple-500" />

          </label>
        )}
      </div>
    </div>);

};

// Security Settings
const SecuritySettings = ({ onSave, saving }: any) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-white mb-6">Güvenlik Ayarları</h2>
      <div className="space-y-4">
        <div className="p-4 bg-white/5 border border-purple-400 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-300 mb-1">Güvenlik Yapılandırması</h3>
              <p className="text-sm text-blue-400">
                2FA, IP kısıtlamaları, oturum yönetimi ve diğer güvenlik ayarları.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

// API Settings
const APISettings = ({ onSave, saving }: any) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-white mb-6">API Anahtarları</h2>
      <div className="space-y-4">
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">API Yönetimi</h3>
              <p className="text-sm text-orange-700">
                REST API anahtarları, webhook ayarları ve rate limit yapılandırması.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

// Integration Settings
const IntegrationSettings = ({ onSave, saving }: any) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-white mb-6">Entegrasyonlar</h2>
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Üçüncü Parti Entegrasyonlar</h3>
              <p className="text-sm text-purple-300">
                Google Analytics, Facebook Pixel, Amadeus, Booking.com API ve diğer entegrasyonlar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default SystemSettings;