/**
 * Rental Property Edit Page - Admin V2
 * Full CRUD edit interface for rental properties (hotels, villas, apartments)
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeft, Save, X, Plus, Trash2, Home, Users, Bed,
  DollarSign, Star, CheckCircle, AlertCircle, MapPin
} from 'lucide-react';

interface PropertyFormData {
  title: string;
  slug: string;
  type: string;
  city: string;
  district: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  basePrice: number;
  currency: string;
  description: string;
  amenities: string[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
}

const RentalPropertyEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    slug: '',
    type: 'villa',
    city: '',
    district: '',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    basePrice: 0,
    currency: 'TRY',
    description: '',
    amenities: [],
    images: [],
    isActive: true,
    isFeatured: false,
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    if (id) fetchPropertyData();
  }, [id]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/rental-properties/${id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setFormData({
          ...data.data,
          amenities: data.data.amenities || [],
          images: data.data.images || [],
        });
      } else {
        setError('Konaklama bulunamadı');
      }
    } catch (err) {
      setError('Veri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, newAmenity.trim()] }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== index) }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, newImage.trim()] }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/rental-properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/v2/rental-properties'), 1500);
      } else {
        setError(data.error || 'Kaydedilemedi');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Home className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/v2/rental-properties">
              <button className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Konaklama Düzenle</h1>
              <p className="text-sm text-slate-600">ID: {id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/v2/rental-properties">
              <button className="px-4 py-2 border rounded-lg hover:bg-slate-50"><X className="w-4 h-4 inline mr-2" />İptal</button>
            </Link>
            <button onClick={handleSubmit} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              <Save className="w-4 h-4 inline mr-2" />{saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </header>

      {error && <div className="max-w-7xl mx-auto px-6 py-4"><div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"><AlertCircle className="w-5 h-5 text-red-600" /><p className="text-red-800">{error}</p></div></div>}
      {success && <div className="max-w-7xl mx-auto px-6 py-4"><div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3"><CheckCircle className="w-5 h-5 text-green-600" /><p className="text-green-800">Başarıyla kaydedildi!</p></div></div>}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Home className="w-5 h-5 text-blue-600" />Temel Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Başlık *</label><input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Lüks Villa - Bodrum" /></div>
              <div><label className="block text-sm font-medium mb-2">Slug</label><input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="luks-villa-bodrum" /></div>
              <div><label className="block text-sm font-medium mb-2">Tür *</label><select name="type" value={formData.type} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg"><option value="villa">Villa</option><option value="apartment">Apart</option><option value="hotel">Otel</option><option value="house">Ev</option><option value="bungalow">Bungalov</option></select></div>
              <div><label className="block text-sm font-medium mb-2">Şehir *</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg" placeholder="Bodrum" /></div>
              <div><label className="block text-sm font-medium mb-2">İlçe</label><input type="text" name="district" value={formData.district} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Yalıkavak" /></div>
              <div><label className="block text-sm font-medium mb-2">Misafir *</label><input type="number" name="guests" value={formData.guests} onChange={handleInputChange} required min="1" className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">Yatak Odası *</label><input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} required min="0" className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">Banyo *</label><input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} required min="0" className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">Yatak *</label><input type="number" name="beds" value={formData.beds} onChange={handleInputChange} required min="0" className="w-full px-4 py-2 border rounded-lg" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium mb-2">Açıklama</label><textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border rounded-lg" placeholder="Konaklama hakkında detaylı bilgi..." /></div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-600" />Fiyatlandırma</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Gecelik Fiyat *</label><input type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} required min="0" step="0.01" className="w-full px-4 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-2">Para Birimi *</label><select name="currency" value={formData.currency} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg"><option value="TRY">₺ TRY</option><option value="USD">$ USD</option><option value="EUR">€ EUR</option></select></div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Star className="w-5 h-5 text-amber-600" />Olanaklar</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Havuz, WiFi, Klima..." />
              <button type="button" onClick={addAmenity} className="px-4 py-2 bg-blue-600 text-white rounded-lg"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {amenity}<button type="button" onClick={() => removeAmenity(i)} className="hover:text-red-600"><X className="w-4 h-4" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6">Görseller</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Görsel URL ekle" />
              <button type="button" onClick={addImage} className="px-4 py-2 bg-purple-600 text-white rounded-lg"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} alt={`Image ${i+1}`} className="w-full h-32 object-cover rounded-lg" onError={(e) => {(e.target as HTMLImageElement).src = '/placeholder.jpg';}} />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6">Durum</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5 text-blue-600 rounded" /><span>Aktif</span></label>
              <label className="flex items-center gap-3"><input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-5 h-5 text-blue-600 rounded" /><span>Öne Çıkan</span></label>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RentalPropertyEditPage;
