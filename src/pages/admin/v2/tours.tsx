import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Redirect to all-products for now - TODO: Create dedicated tours management page
const ToursManagementPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/admin/v2/all-products?filter=tours');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-600">Redirecting to tours management...</p>
    </div>
  );
};

export default ToursManagementPage;
