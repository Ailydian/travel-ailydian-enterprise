/**
 * ADMIN V2 - FRONTEND CONTENT MANAGEMENT
 * Manage all frontend content: Hero, Sections, Menus, Footer
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import logger from '../../../lib/logger';
import {
  ArrowLeft, Save, RefreshCw, Eye, Edit, Trash2, Plus,
  Image as ImageIcon, Type, Layout, Menu, Link2, Tag,
  Globe, Settings, ChevronDown, ChevronUp, AlertCircle,
  CheckCircle, Upload, Copy, ExternalLink, Code } from
'lucide-react';

type ContentSection = 'hero' | 'menus' | 'sections' | 'footer' | 'seo';

const ContentManagement = () => {
  const [activeSection, setActiveSection] = useState<ContentSection>('hero');
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch content
  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content');
      const result = await res.json();
      if (result.success) {
        setContent(result.data);
      }
    } catch (error) {
      logger.error('Error fetching content:', error as Error, { component: 'Content' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Save content
  const handleSave = async (type: string, data: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data })
      });

      if (res.ok) {
        setSuccessMessage('İçerik başarıyla kaydedildi!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchContent();
      }
    } catch (error) {
      logger.error('Error saving content:', error as Error, { component: 'Content' });
      alert('Kaydetme başarısız');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
  { id: 'hero', name: 'Hero Section', icon: ImageIcon, color: 'blue' },
  { id: 'menus', name: 'Menüler', icon: Menu, color: 'green' },
  { id: 'sections', name: 'Sayfa Bölümleri', icon: Layout, color: 'purple' },
  { id: 'footer', name: 'Footer', icon: Link2, color: 'orange' },
  { id: 'seo', name: 'SEO Ayarları', icon: Globe, color: 'pink' }];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-lydian-glass-dark border-b border-lydian-border sticky top-0 z-40 backdrop-blur-xl bg-lydian-bg/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="flex items-center gap-2 px-4 py-2 text-lydian-text-secondary hover:text-lydian-text hover:bg-lydian-bg-surface-raised rounded-lg transition-all">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
              </Link>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <h1 className="text-2xl font-bold text-lydian-text">
                  Frontend İçerik Yönetimi
                </h1>
                <p className="text-sm text-lydian-text-secondary">
                  Tüm frontend içeriklerini buradan yönetin
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {successMessage &&
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-4 py-2 bg-lydian-success-lighter text-lydian-success-text rounded-lg">

                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{successMessage}</span>
                </motion.div>
              }
              <button
                onClick={fetchContent}
                className="p-2 text-lydian-text-secondary hover:text-lydian-primary hover:bg-lydian-primary-lighter rounded-lg transition-all">

                <RefreshCw className="w-5 h-5" />
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lydian-secondary to-lydian-primary text-lydian-text-inverse rounded-lg hover:shadow-lg transition-all">

                <Eye className="w-5 h-5" />
                Önizleme
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-lydian-glass-dark rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="font-bold text-lydian-text mb-4 px-2">İçerik Bölümleri</h3>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as ContentSection)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                      isActive ?
                      `bg-gradient-to-r from-${section.color}-500 to-${section.color}-600 text-white shadow-md` :
                      'text-slate-700 hover:bg-slate-50'}
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
            {loading ?
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lydian-primary" />
              </div> :

            <>
                {/* Hero Section */}
                {activeSection === 'hero' &&
              <HeroEditor
                data={content.hero}
                onSave={(data) => handleSave('hero', data)}
                saving={saving} />

              }

                {/* Menus */}
                {activeSection === 'menus' &&
              <MenuEditor
                data={content.menus}
                onSave={(data) => handleSave('menus', data)}
                saving={saving} />

              }

                {/* Sections */}
                {activeSection === 'sections' &&
              <SectionsEditor
                data={content.sections}
                onSave={(data) => handleSave('sections', data)}
                saving={saving} />

              }

                {/* Footer */}
                {activeSection === 'footer' &&
              <FooterEditor
                data={content.footer}
                onSave={(data) => handleSave('footer', data)}
                saving={saving} />

              }

                {/* SEO */}
                {activeSection === 'seo' &&
              <SEOEditor
                data={content.seo}
                onSave={(data) => handleSave('seo', data)}
                saving={saving} />

              }
              </>
            }
          </div>
        </div>
      </div>
    </div>);

};

// Hero Editor Component
const HeroEditor = ({ data, onSave, saving }: any) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  return (
    <div className="bg-lydian-glass-dark rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-lydian-text">Hero Section</h2>
        <button
          onClick={() => onSave(formData)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-all disabled:opacity-50">

          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lydian-text-secondary mb-2">
            Ana Başlık
          </label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus" />

        </div>

        <div>
          <label className="block text-sm font-medium text-lydian-text-secondary mb-2">
            Alt Başlık
          </label>
          <textarea
            rows={3}
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus" />

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-lydian-text-secondary mb-2">
              CTA Buton Metni
            </label>
            <input
              type="text"
              value={formData.ctaText || ''}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              className="w-full px-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus" />

          </div>

          <div>
            <label className="block text-sm font-medium text-lydian-text-secondary mb-2">
              CTA Link
            </label>
            <input
              type="text"
              value={formData.ctaLink || ''}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
              className="w-full px-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus" />

          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-lydian-text-secondary mb-2">
            Arka Plan Görseli URL
          </label>
          <input
            type="text"
            value={formData.backgroundImage || ''}
            onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
            className="w-full px-4 py-2 border border-lydian-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-lydian-border-focus" />

        </div>
      </div>
    </div>);

};

// Menu Editor Component
const MenuEditor = ({ data, onSave, saving }: any) => {
  return (
    <div className="bg-lydian-glass-dark rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-lydian-text">Menü Yönetimi</h2>
        <button
          onClick={() => onSave(data)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-all disabled:opacity-50">

          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lydian-text mb-3">Header Menüsü</h3>
          <div className="bg-lydian-bg-surface rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(data?.header || [], null, 2)}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lydian-text mb-3">Footer Menüsü</h3>
          <div className="bg-lydian-bg-surface rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(data?.footer || [], null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>);

};

// Sections Editor
const SectionsEditor = ({ data, onSave, saving }: any) => {
  return (
    <div className="bg-lydian-glass-dark rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-lydian-text">Sayfa Bölümleri</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-lydian-success text-lydian-text-inverse rounded-lg hover:bg-lydian-success-hover transition-all">
          <Plus className="w-4 h-4" />
          Yeni Bölüm Ekle
        </button>
      </div>

      <div className="space-y-4">
        {data && data.map((section: any, index: number) =>
        <div key={index} className="border border-lydian-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lydian-text">{section.title}</h3>
              <div className="flex gap-2">
                <button className="p-2 text-lydian-primary hover:bg-lydian-primary-lighter rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-lydian-primary hover:bg-lydian-error-lighter rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-lydian-text-secondary">Tip: {section.type}</p>
          </div>
        )}
      </div>
    </div>);

};

// Footer Editor
const FooterEditor = ({ data, onSave, saving }: any) => {
  return (
    <div className="bg-lydian-glass-dark rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-lydian-text">Footer İçeriği</h2>
        <button
          onClick={() => onSave(data)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-all disabled:opacity-50">

          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="text-center py-12 text-lydian-text-tertiary">
        Footer içeriği yönetimi yakında eklenecek
      </div>
    </div>);

};

// SEO Editor
const SEOEditor = ({ data, onSave, saving }: any) => {
  return (
    <div className="bg-lydian-glass-dark rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-lydian-text">SEO Ayarları</h2>
        <button
          onClick={() => onSave(data)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-all disabled:opacity-50">

          <Save className="w-4 h-4" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="text-center py-12 text-lydian-text-tertiary">
        SEO ayarları yakında eklenecek
      </div>
    </div>);

};

export default ContentManagement;