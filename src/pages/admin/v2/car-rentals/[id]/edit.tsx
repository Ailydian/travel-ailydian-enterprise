/**
 * Car Rental Edit Page - Admin V2
 * Full CRUD edit interface for car rentals
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Save, X, Upload, Plus, Trash2, Car, Users,
  Fuel, Settings, DollarSign, Star, CheckCircle, AlertCircle,
  Image as ImageIcon, Calendar, MapPin, Shield } from
'lucide-react';

interface CarRentalFormData {
  name: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: 'manual' | 'automatic';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  pricePerDay: number;
  currency: string;
  description: string;
  features: string[];
  mainImage: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  location: string;
  availableCount: number;
}

const CarRentalEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<CarRentalFormData>({
    name: '',
    slug: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'sedan',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    pricePerDay: 0,
    currency: 'TRY',
    description: '',
    features: [],
    mainImage: '',
    images: [],
    isActive: true,
    isFeatured: false,
    location: '',
    availableCount: 1
  });

  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');

  // Fetch car data
  useEffect(() => {
    if (id) {
      fetchCarData();
    }
  }, [id]);

  const fetchCarData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/car-rentals/${id}`);
      const data = await response.json();

      if (data.success && data.data) {
        setFormData({
          ...data.data,
          features: data.data.features || [],
          images: data.data.images || []
        });
      } else {
        setError('Araç bulunamadı');
      }
    } catch (err) {
      setError('Veri yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/car-rentals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/v2/car-rentals');
        }, 1500);
      } else {
        setError(data.error || 'Kaydedilemedi');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Car className="w-12 h-12 text-lydian-primary animate-spin mx-auto mb-4" />
          <p className="text-lydian-text-secondary">Yükleniyor...</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-lydian-glass-dark border-b border-lydian-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/v2/car-rentals">
                <button className="p-2 hover:bg-lydian-bg-surface-raised rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-lydian-text-secondary" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-lydian-text">Araç Düzenle</h1>
                <p className="text-sm text-lydian-text-secondary">ID: {id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/v2/car-rentals">
                <button className="flex items-center gap-2 px-4 py-2 border border-lydian-border-medium rounded-lg hover:bg-lydian-bg-surface transition-colors">
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">İptal</span>
                </button>
              </Link>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">

                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {error &&
      <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-lydian-error-lighter border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-lydian-primary" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      }

      {success &&
      <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-lydian-success-lighter border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-lydian-success" />
            <p className="text-green-800">Başarıyla kaydedildi! Yönlendiriliyorsunuz...</p>
          </div>
        </div>
      }

      {/* Form */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-lydian-glass-dark rounded-xl border border-lydian-border p-6">
            <h2 className="text-lg font-bold text-lydian-text mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-lydian-primary" />
              Temel Bilgiler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Araç Adı *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="Örn: BMW 5 Serisi" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="bmw-5-serisi" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Marka *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="BMW" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="5 Serisi" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Yıl *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Kategori *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none">

                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="coupe">Coupe</option>
                  <option value="minivan">Minivan</option>
                  <option value="luxury">Lüks</option>
                  <option value="sports">Spor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Vites *</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none">

                  <option value="manual">Manuel</option>
                  <option value="automatic">Otomatik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Yakıt Tipi *</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none">

                  <option value="gasoline">Benzin</option>
                  <option value="diesel">Dizel</option>
                  <option value="electric">Elektrik</option>
                  <option value="hybrid">Hibrit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Koltuk Sayısı *</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  required
                  min="2"
                  max="50"
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Konum</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="İstanbul, Türkiye" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Stok Adedi *</label>
                <input
                  type="number"
                  name="availableCount"
                  value={formData.availableCount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none" />

              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Açıklama</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="Araç hakkında detaylı bilgi..." />

              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-lydian-glass-dark rounded-xl border border-lydian-border p-6">
            <h2 className="text-lg font-bold text-lydian-text mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-lydian-success" />
              Fiyatlandırma
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Günlük Fiyat *</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none" />

              </div>

              <div>
                <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Para Birimi *</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none">

                  <option value="TRY">₺ TRY</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-lydian-glass-dark rounded-xl border border-lydian-border p-6">
            <h2 className="text-lg font-bold text-lydian-text mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-600" />
              Özellikler
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                placeholder="Yeni özellik ekle (örn: Klima, GPS)" />

              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-lydian-primary text-lydian-text-inverse rounded-lg hover:bg-lydian-primary-dark transition-colors">

                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) =>
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-lydian-primary-lighter text-lydian-primary-dark rounded-full text-sm">

                  {feature}
                  <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="hover:text-lydian-primary transition-colors">

                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="bg-lydian-glass-dark rounded-xl border border-lydian-border p-6">
            <h2 className="text-lg font-bold text-lydian-text mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              Görseller
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Ana Görsel URL</label>
              <input
                type="text"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                placeholder="https://example.com/image.jpg" />

            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-lydian-text-secondary mb-2">Ek Görseller</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  className="flex-1 px-4 py-2 border border-lydian-border rounded-lg focus:ring-2 focus:ring-lydian-border-focus focus:border-lydian-primary outline-none"
                  placeholder="Görsel URL ekle" />

                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 bg-purple-600 text-lydian-text-inverse rounded-lg hover:bg-purple-700 transition-colors">

                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) =>
              <div key={index} className="relative group">
                  <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-lydian-border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-car.jpg';
                  }} />

                  <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-lydian-error text-lydian-text-inverse rounded-full opacity-0 group-hover:opacity-100 transition-opacity">

                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="bg-lydian-glass-dark rounded-xl border border-lydian-border p-6">
            <h2 className="text-lg font-bold text-lydian-text mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-lydian-text-secondary" />
              Durum Ayarları
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-lydian-primary border-lydian-border-medium rounded focus:ring-2 focus:ring-lydian-border-focus" />

                <span className="text-sm font-medium text-lydian-text-secondary">Aktif (Sitede göster)</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-lydian-primary border-lydian-border-medium rounded focus:ring-2 focus:ring-lydian-border-focus" />

                <span className="text-sm font-medium text-lydian-text-secondary">Öne Çıkan</span>
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>);

};

export default CarRentalEditPage;