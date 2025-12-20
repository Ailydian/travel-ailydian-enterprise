import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  RefreshCw, CheckCircle, XCircle, Clock, AlertTriangle,
  Database, Globe, Activity
} from 'lucide-react';
import adminService from '../../lib/services/admin-service';

const AILYDIAN_COLORS = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  blue: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  purple: '#a855f7',
  dark: '#0f0f1a',
};

export default function AdminSync() {
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState({
    google: { status: 'success', lastSync: '2 saat önce', count: 1247 },
    tripadvisor: { status: 'pending', lastSync: '1 gün önce', count: 892 },
    booking: { status: 'error', lastSync: '3 gün önce', count: 0 },
  });
  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setAdminData(adminService.getStoredAdminData());
  }, [router]);

  const handleSync = async (platform: string) => {
    setIsLoading(true);
    // Simulate sync
    setTimeout(() => {
      setSyncStatus(prev => ({
        ...prev,
        [platform]: { ...prev[platform], status: 'success', lastSync: 'şimdi' }
      }));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Senkronizasyon | Ailydian Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Ailydian Admin</h2>
              <p className="text-sm text-gray-400">{adminData?.email}</p>
            </div>
            <nav className="space-y-2">
              <Link href="/admin/dashboard" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2">
                Dashboard
              </Link>
              <Link href="/admin/locations" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2">
                Lokasyonlar
              </Link>
              <Link href="/admin/users" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2">
                Kullanıcılar
              </Link>
              <Link href="/admin/sync" className="flex items-center space-x-3 text-white rounded-lg px-3 py-2" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60`}}>
                Senkronizasyon
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-8">Platform Senkronizasyonu</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(syncStatus).map(([platform, data]: [string, any]) => (
                  <div key={platform} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white capitalize">{platform}</h3>
                      {data.status === 'success' && <CheckCircle className="w-6 h-6 text-green-500" />}
                      {data.status === 'pending' && <Clock className="w-6 h-6 text-yellow-500" />}
                      {data.status === 'error' && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Son Senkronizasyon: {data.lastSync}</p>
                    <p className="text-gray-400 text-sm mb-4">Toplam Kayıt: {data.count}</p>
                    <button
                      onClick={() => handleSync(platform)}
                      disabled={isLoading}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                      Senkronize Et
                    </button>
                  </div>
                ))}
              </div>

              {/* Sync Logs */}
              <div className="mt-8 bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Senkronizasyon Geçmişi</h2>
                <div className="space-y-3">
                  {[
                    { platform: 'Google', action: 'Başarılı senkronizasyon', time: '2 saat önce', status: 'success' },
                    { platform: 'TripAdvisor', action: 'Senkronizasyon başlatıldı', time: '1 gün önce', status: 'pending' },
                    { platform: 'Booking', action: 'Bağlantı hatası', time: '3 gün önce', status: 'error' },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        {log.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {log.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                        {log.status === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                        <div>
                          <p className="text-white font-medium">{log.platform}</p>
                          <p className="text-gray-400 text-sm">{log.action}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
