import { useRouter } from 'next/router';
import { Home, ArrowLeft } from 'lucide-react';

interface SimpleBackButtonProps {
  showHomeButton?: boolean;
  showBackButton?: boolean;
  className?: string;
}

export function SimpleBackButton({
  showHomeButton = true,
  showBackButton = false,
  className = ''
}: SimpleBackButtonProps) {
  const router = useRouter();

  return (
    <div className={`fixed top-4 left-4 z-50 flex gap-2 ${className}`}>
      {showHomeButton && (
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          aria-label="Anasayfa Dön"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Anasayfa</span>
        </button>
      )}

      {showBackButton && (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
          aria-label="Önceki Sayfa"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Geri</span>
        </button>
      )}
    </div>
  );
}
