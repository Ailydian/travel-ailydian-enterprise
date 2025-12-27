import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  FileText, Image, Video, AlertTriangle, CheckCircle, XCircle,
  Eye, Edit, Trash2, Flag, Search, Filter, RefreshCw
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

export default function AdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState<any>(null);
  const [contentItems, setContentItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setAdminData(adminService.getStoredAdminData());
    loadContent();
  }, [router]);

  const loadContent = async () => {
    setIsLoading(true);
    // Mock data for demo
    setContentItems([
      { id: 1, type: 'article', title: 'İstanbul Gezi Rehberi', status: 'published', flags: 0, views: 1234 },
      { id: 2, type: 'image', title: 'Kapadokya Manzara', status: 'flagged', flags: 3, views: 890 },
      { id: 3, type: 'video', title: 'Antalya Tanıtım Videosu', status: 'pending', flags: 0, views: 456 },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>İçerik Yönetimi | LyDian Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">LyDian Admin</h2>
              <p className="text-sm text-gray-200">{adminData?.email}</p>
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
              <Link href="/admin/reviews" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded-lg px-3 py-2">
                İncelemeler
              </Link>
              <Link href="/admin/content" className="flex items-center space-x-3 text-white rounded-lg px-3 py-2" style={{background: `linear-gradient(45deg, ${AILYDIAN_COLORS.primary}40, ${AILYDIAN_COLORS.secondary}40)`, border: `1px solid ${AILYDIAN_COLORS.primary}60`}}>
                İçerik Yönetimi
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">İçerik Yönetimi</h1>
                <button onClick={loadContent} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4" />
                  Yenile
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-4 mb-6">
                {['all', 'published', 'pending', 'flagged'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {f === 'all' ? 'Tümü' : f === 'published' ? 'Yayında' : f === 'pending' ? 'Beklemede' : 'İşaretli'}
                  </button>
                ))}
              </div>

              {/* Content List */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-300">Başlık</th>
                      <th className="px-6 py-4 text-left text-gray-300">Tür</th>
                      <th className="px-6 py-4 text-left text-gray-300">Durum</th>
                      <th className="px-6 py-4 text-left text-gray-300">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {contentItems.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 text-white">{item.title}</td>
                        <td className="px-6 py-4 text-gray-300">{item.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            item.status === 'published' ? 'bg-green-900 text-green-300' :
                            item.status === 'flagged' ? 'bg-red-900 text-red-300' :
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
