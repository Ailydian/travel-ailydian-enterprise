/**
 * ADMIN V2 - NAVIGATION MANAGER
 * Complete dynamic navigation menu management
 * Manages Header, Footer, Sidebar, Mobile menus
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
import logger from '../../../../lib/logger';
  ArrowLeft, Plus, Edit2, Trash2, Save, X, Menu as MenuIcon,
  GripVertical, Eye, EyeOff, ChevronRight, Languages, Shield,
  ExternalLink, Smartphone, Monitor, LayoutGrid, Globe
} from 'lucide-react';

type MenuType = 'HEADER' | 'FOOTER' | 'SIDEBAR' | 'MOBILE';

interface NavigationMenu {
  id: string;
  type: MenuType;
  title: string;
  slug: string;
  href: string;
  icon?: string;
  description?: string;
  badge?: string;
  order: number;
  isActive: boolean;
  parentId?: string | null;
  translations?: any;
  requiredRole?: string;
  permissions?: string[];
  metadata?: any;
  openInNewTab: boolean;
  children?: NavigationMenu[];
  parent?: { id: string; title: string };
  createdAt: string;
  updatedAt: string;
}

const NavigationManager = () => {
  const [activeType, setActiveType] = useState<MenuType>('HEADER');
  const [menus, setMenus] = useState<NavigationMenu[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<NavigationMenu | null>(null);
  const [saving, setSaving] = useState(false);

  const menuTypes = [
    { id: 'HEADER' as MenuType, name: 'Header Menu', icon: Monitor, color: 'blue' },
    { id: 'FOOTER' as MenuType, name: 'Footer Menu', icon: LayoutGrid, color: 'purple' },
    { id: 'SIDEBAR' as MenuType, name: 'Sidebar Menu', icon: MenuIcon, color: 'green' },
    { id: 'MOBILE' as MenuType, name: 'Mobile Menu', icon: Smartphone, color: 'orange' },
  ];

  useEffect(() => {
    fetchMenus();
  }, [activeType]);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/navigation/menus?type=${activeType}`);
      const result = await res.json();
      if (result.success) {
        setMenus(result.data || []);
      }
    } catch (error) {
      logger.error('Error fetching menus:', error as Error, { component: 'Navigation' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: any) => {
    setSaving(true);
    try {
      const url = editingMenu
        ? `/api/admin/navigation/menus/${editingMenu.id}`
        : '/api/admin/navigation/menus';

      const method = editingMenu ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: activeType }),
      });

      const result = await res.json();

      if (result.success) {
        setShowModal(false);
        setEditingMenu(null);
        fetchMenus();
        alert(editingMenu ? 'Menü güncellendi!' : 'Menü oluşturuldu!');
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      logger.error('Error saving menu:', error as Error, { component: 'Navigation' });
      alert('Kaydetme başarısız');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch(`/api/admin/navigation/menus/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (result.success) {
        fetchMenus();
        alert('Menü silindi');
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      logger.error('Error deleting menu:', error as Error, { component: 'Navigation' });
      alert('Silme başarısız');
    }
  };

  const toggleActive = async (menu: NavigationMenu) => {
    try {
      const res = await fetch(`/api/admin/navigation/menus/${menu.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !menu.isActive }),
      });

      if (res.ok) {
        fetchMenus();
      }
    } catch (error) {
      logger.error('Error toggling active:', error as Error, { component: 'Navigation' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/5 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2">
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Dashboard'a Dön</span>
                </button>
              </Link>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Navigasyon Menüleri
                </h1>
                <p className="text-sm text-slate-600">
                  Tüm site menülerini yönetin
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingMenu(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Yeni Menü Ekle
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Menu Type Selector */}
          <div className="col-span-3">
            <div className="bg-white/5 rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Menü Tipi</h3>
              <div className="space-y-2">
                {menuTypes.map((type) => {
                  const Icon = type.icon;
                  const isActive = activeType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveType(type.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                          isActive
                            ? `bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 text-white shadow-md`
                            : 'text-slate-700 hover:bg-slate-50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Menu List */}
          <div className="col-span-9">
            <div className="bg-white/5 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {menuTypes.find(t => t.id === activeType)?.name}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {menus.length} menü öğesi
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-slate-300" />
                </div>
              </div>

              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Yükleniyor...</p>
                </div>
              ) : menus.length === 0 ? (
                <div className="p-12 text-center">
                  <MenuIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">Henüz menü öğesi yok</p>
                  <button
                    onClick={() => {
                      setEditingMenu(null);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    İlk Menüyü Ekle
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {menus.map((menu) => (
                    <MenuItemRow
                      key={menu.id}
                      menu={menu}
                      onEdit={(m) => {
                        setEditingMenu(m);
                        setShowModal(true);
                      }}
                      onDelete={handleDelete}
                      onToggleActive={toggleActive}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <MenuModal
            menu={editingMenu}
            onClose={() => {
              setShowModal(false);
              setEditingMenu(null);
            }}
            onSave={handleSave}
            saving={saving}
            parentMenus={menus.filter(m => !m.parentId)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Menu Item Row Component
const MenuItemRow = ({ menu, onEdit, onDelete, onToggleActive }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="p-4 hover:bg-slate-50 transition-all">
        <div className="flex items-center gap-4">
          <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-slate-900">{menu.title}</h3>
              {menu.badge && (
                <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded">
                  {menu.badge}
                </span>
              )}
              {menu.openInNewTab && (
                <ExternalLink className="w-4 h-4 text-slate-400" />
              )}
              {menu.children && menu.children.length > 0 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                  {menu.children.length} alt menü
                </button>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
              <span className="font-mono">{menu.href}</span>
              {menu.parent && (
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                  Alt menü: {menu.parent.title}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleActive(menu)}
              className={`p-2 rounded-lg transition-all ${
                menu.isActive
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
            >
              {menu.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onEdit(menu)}
              className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
            >
              <Edit2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => onDelete(menu.id)}
              className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Children */}
      {expanded && menu.children && menu.children.length > 0 && (
        <div className="ml-12 border-l-2 border-slate-200">
          {menu.children.map((child: NavigationMenu) => (
            <MenuItemRow
              key={child.id}
              menu={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleActive={onToggleActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Menu Modal Component
const MenuModal = ({ menu, onClose, onSave, saving, parentMenus }: any) => {
  const [formData, setFormData] = useState({
    title: menu?.title || '',
    slug: menu?.slug || '',
    href: menu?.href || '',
    icon: menu?.icon || '',
    description: menu?.description || '',
    badge: menu?.badge || '',
    order: menu?.order || 0,
    isActive: menu?.isActive ?? true,
    parentId: menu?.parentId || '',
    openInNewTab: menu?.openInNewTab || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      parentId: formData.parentId || null,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/5 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/5 border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-slate-900">
            {menu ? 'Menüyü Düzenle' : 'Yeni Menü Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Başlık *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL / Href *
            </label>
            <input
              type="text"
              value={formData.href}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/oteller veya https://example.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                İkon (Lucide)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hotel, Plane, MapPin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rozet
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Yeni, Popüler"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Üst Menü
              </label>
              <select
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Üst seviye menü</option>
                {parentMenus.map((parent: NavigationMenu) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sıra
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="font-medium text-slate-700">Aktif</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.openInNewTab}
                onChange={(e) => setFormData({ ...formData, openInNewTab: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="font-medium text-slate-700">Yeni sekmede aç</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NavigationManager;
