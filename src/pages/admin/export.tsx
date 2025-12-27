import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Download, FileText, Database, Calendar, CheckCircle,
  Users, MapPin, MessageSquare, Image } from
'lucide-react';
import adminService from '../../lib/services/admin-service';

const AILYDIAN_COLORS = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  blue: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  purple: '#a855f7',
  dark: '#0f0f1a'
};

export default function AdminExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setAdminData(adminService.getStoredAdminData());
  }, [router]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Simulate file download
      const element = document.createElement('a');
      const file = new Blob(['Export data here...'], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `lydian-export-${selectedType}-${Date.now()}.${selectedFormat}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setIsExporting(false);
    }, 1500);
  };

  const exportTypes = [
  { id: 'all', name: 'Tüm Veriler', icon: Database, count: 15234 },
  { id: 'users', name: 'Kullanıcılar', icon: Users, count: 3456 },
  { id: 'locations', name: 'Lokasyonlar', icon: MapPin, count: 1247 },
  { id: 'reviews', name: 'İncelemeler', icon: MessageSquare, count: 8934 },
  { id: 'photos', name: 'Fotoğraflar', icon: Image, count: 12567 }];


  return (
    <>
      <Head>
        <title>Veri Dışa Aktarma | LyDian Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-lydian-text-inverse mb-2">LyDian Admin</h2>
              <p className="text-sm text-lydian-text-muted">{adminData?.email}</p>
            </div>
            <nav className="space-y-2">
              <Link href="/admin/dashboard" className="flex items-center space-x-3 text-lydian-text-dim hover:text-lydian-text-inverse hover:bg-gray-700/80 rounded-lg px-3 py-2">
                Dashboard
              </Link>
              <Link href="/admin/locations" className="flex items-center space-x-3 text-lydian-text-dim hover:text-lydian-text-inverse hover:bg-gray-700/80 rounded-lg px-3 py-2">
                Lokasyonlar
              </Link>
              <Link href="/admin/users" className="flex items-center space-x-3 text-lydian-text-dim hover:text-lydian-text-inverse hover:bg-gray-700/80 rounded-lg px-3 py-2">
                Kullanıcılar
              </Link>
              <Link href="/admin/export" className="flex items-center space-x-3 text-lydian-text-inverse rounded-lg px-3 py-2" style={{ background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60` }}>
                Veri Dışa Aktarma
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold text-lydian-text-inverse mb-8">Veri Dışa Aktarma</h1>

              {/* Export Type Selection */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-lydian-text-inverse mb-4">Veri Tipi Seçin</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                        selectedType === type.id ?
                        'border-blue-500 bg-blue-900/30' :
                        'border-gray-700 bg-gray-700/30 hover:border-gray-600'}`
                        }>

                        <Icon className="w-8 h-8 text-blue-400 mb-2" />
                        <h3 className="text-lydian-text-inverse font-semibold mb-1">{type.name}</h3>
                        <p className="text-lydian-text-muted text-sm">{type.count.toLocaleString()} kayıt</p>
                      </button>);

                  })}
                </div>
              </div>

              {/* Format Selection */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-lydian-text-inverse mb-4">Format Seçin</h2>
                <div className="flex gap-4">
                  {['csv', 'json', 'xlsx', 'pdf'].map((format) =>
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`px-6 py-3 rounded-lg font-medium uppercase transition-colors ${
                    selectedFormat === format ?
                    'bg-blue-600 text-white' :
                    'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                    }>

                      {format}
                    </button>
                  )}
                </div>
              </div>

              {/* Export Button */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-lydian-text-inverse">Dışa Aktarma Özeti</h3>
                    <p className="text-lydian-text-muted text-sm">
                      {exportTypes.find((t) => t.id === selectedType)?.name} - {selectedFormat.toUpperCase()} formatında
                    </p>
                  </div>
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] text-lydian-text-inverse rounded-lg hover:shadow-lg transition-all disabled:opacity-50">

                    <Download className={`w-5 h-5 ${isExporting ? 'animate-bounce' : ''}`} />
                    {isExporting ? 'Dışa Aktarılıyor...' : 'Dışa Aktar'}
                  </button>
                </div>
              </div>

              {/* Recent Exports */}
              <div className="mt-8 bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-lydian-text-inverse mb-4">Son Dışa Aktarımlar</h2>
                <div className="space-y-3">
                  {[
                  { type: 'Tüm Veriler', format: 'CSV', date: '2 saat önce', size: '45 MB' },
                  { type: 'Kullanıcılar', format: 'JSON', date: '1 gün önce', size: '2.3 MB' },
                  { type: 'Lokasyonlar', format: 'XLSX', date: '3 gün önce', size: '8.7 MB' }].
                  map((exp, index) =>
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-lydian-text-inverse font-medium">{exp.type}</p>
                          <p className="text-lydian-text-muted text-sm">{exp.format} - {exp.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lydian-text-muted text-sm">{exp.date}</span>
                        <button className="p-2 bg-lydian-primary text-lydian-text-inverse rounded hover:bg-lydian-primary-dark">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>);

}