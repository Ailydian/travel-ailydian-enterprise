/**
 * Travel Ailydian - Admin Index
 * Redirects to new V2 Ultra Premium Admin Dashboard
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to v2 admin
    router.replace('/admin/v2');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Admin Panel V2'ye yönlendiriliyor...</p>
      </div>
    </div>
  );
}
