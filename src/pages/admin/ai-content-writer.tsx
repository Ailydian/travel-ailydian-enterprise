import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Download,
  Eye,
  Check,
  AlertCircle,
  Zap,
  BarChart3,
  Copy,
  RefreshCw
} from 'lucide-react';
import type { ContentRequest, GeneratedContent } from '@/lib/aiContentWriter';

const AIContentWriterPage: React.FC = () => {
  const [formData, setFormData] = useState<ContentRequest>({
    type: 'hotel',
    name: '',
    location: '',
    category: '',
    features: [],
    price: undefined,
    rating: undefined
  });

  const [featureInput, setFeatureInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [quality, setQuality] = useState<{ score: number; feedback: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'json'>('form');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent(data.content);
        setQuality(data.quality);
        setActiveTab('preview');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert('İçerik oluşturma başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleDownloadJSON = () => {
    if (!generatedContent) return;

    const dataStr = JSON.stringify(generatedContent, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${formData.name}-content.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <>
      <Head>
        <title>AI Content Writer | Travel LyDian Admin</title>
        <meta name="description" content="AI-powered content generation for listings" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4">
              <Sparkles className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">AI Content Writer</h1>
                <p className="text-purple-100 mt-1">
                  Otomatik SEO-optimized içerik oluşturma sistemi
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Desteklenen Tipler</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ortalama Kalite Skoru</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {quality ? quality.score : '95'}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Üretim Süresi</p>
                  <p className="text-2xl font-bold text-gray-900">&lt;1s</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">SEO Optimized</p>
                  <p className="text-2xl font-bold text-green-600">✓</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                İçerik Parametreleri
              </h2>

              <div className="space-y-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tip *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="hotel">🏨 Otel</option>
                    <option value="car">🚗 Araç Kiralama</option>
                    <option value="tour">🎭 Tur</option>
                    <option value="transfer">🚕 Transfer</option>
                    <option value="vehicle">🚙 Şoförlü Araç</option>
                    <option value="property">🏡 Kiralık Ev/Villa</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="örn: Grand Hilton Istanbul"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konum *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="örn: İstanbul Taksim"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori (opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="örn: Butik Otel, Lüks Sedan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özellikler
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                      placeholder="Özellik ekle (Enter)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <button
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Ekle
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features?.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                      >
                        {feature}
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="hover:text-purple-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiyat (₺) (opsiyonel)
                  </label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || undefined })}
                    placeholder="örn: 1500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puan (0-5) (opsiyonel)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) || undefined })}
                    placeholder="örn: 4.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !formData.name || !formData.location}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      AI İçerik Oluştur
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Önizleme
                </h2>

                {generatedContent && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(JSON.stringify(generatedContent, null, 2))}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      title="JSON Kopyala"
                    >
                      <Copy className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleDownloadJSON}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      title="JSON İndir"
                    >
                      <Download className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                )}
              </div>

              {/* Copy Success Message */}
              {showCopySuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                  <Check className="h-5 w-5" />
                  <span className="text-sm font-medium">Kopyalandı!</span>
                </div>
              )}

              {generatedContent ? (
                <>
                  {/* Quality Score */}
                  {quality && (
                    <div className={`mb-6 p-4 rounded-lg ${
                      quality.score >= 90 ? 'bg-green-50 border border-green-200' :
                      quality.score >= 70 ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Kalite Skoru
                        </span>
                        <span className={`text-2xl font-bold ${
                          quality.score >= 90 ? 'text-green-600' :
                          quality.score >= 70 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {quality.score}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        {quality.feedback.map((item, idx) => (
                          <p key={idx} className="text-xs text-gray-600">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tabs */}
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                        activeTab === 'preview'
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Eye className="h-4 w-4 inline mr-2" />
                      Önizleme
                    </button>
                    <button
                      onClick={() => setActiveTab('json')}
                      className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                        activeTab === 'json'
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FileText className="h-4 w-4 inline mr-2" />
                      JSON
                    </button>
                  </div>

                  {/* Content */}
                  <div className="overflow-y-auto max-h-[600px] pr-2">
                    {activeTab === 'preview' && (
                      <div className="space-y-6">
                        {/* Title */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">BAŞLIK</h3>
                          <p className="text-xl font-bold text-gray-900">{generatedContent.title}</p>
                        </div>

                        {/* SEO */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">SEO BAŞLIK</h3>
                          <p className="text-sm text-gray-700">{generatedContent.seoTitle}</p>
                        </div>

                        {/* Meta Description */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">META AÇIKLAMA</h3>
                          <p className="text-sm text-gray-700">{generatedContent.metaDescription}</p>
                        </div>

                        {/* Short Description */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">KISA AÇIKLAMA</h3>
                          <p className="text-sm text-gray-700">{generatedContent.shortDescription}</p>
                        </div>

                        {/* Long Description */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">DETAYLI AÇIKLAMA</h3>
                          <p className="text-sm text-gray-700 whitespace-pre-line">{generatedContent.longDescription}</p>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">ÖZELLİKLER</h3>
                          <ul className="space-y-1">
                            {generatedContent.highlights.map((highlight, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-purple-600">•</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Keywords */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">ANAHTAR KELİMELER</h3>
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.keywords.map((keyword, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* FAQ */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">SSS</h3>
                          <div className="space-y-3">
                            {generatedContent.faq.map((item, idx) => (
                              <div key={idx} className="border-l-4 border-purple-600 pl-4">
                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                  {item.question}
                                </p>
                                <p className="text-sm text-gray-700">
                                  {item.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">CALL TO ACTION</h3>
                          <p className="text-sm font-semibold text-purple-600">{generatedContent.callToAction}</p>
                        </div>

                        {/* Tags */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">ETİKETLER</h3>
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'json' && (
                      <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        {JSON.stringify(generatedContent, null, 2)}
                      </pre>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <AlertCircle className="h-16 w-16 mb-4" />
                  <p className="text-lg font-medium">Henüz içerik oluşturulmadı</p>
                  <p className="text-sm mt-2">Formu doldurun ve "AI İçerik Oluştur" butonuna tıklayın</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Features Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              AI Content Writer Özellikleri
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <h3 className="font-bold text-gray-900">SEO-Optimized</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Otomatik anahtar kelime, meta açıklama ve başlık optimizasyonu
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Check className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">Kalite Kontrolü</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Otomatik kalite skoru ve iyileştirme önerileri
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-bold text-gray-900">Hızlı Üretim</h3>
                </div>
                <p className="text-sm text-gray-700">
                  1 saniyeden kısa sürede tam içerik üretimi
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AIContentWriterPage;
