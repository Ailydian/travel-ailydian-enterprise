/**
 * Simple Navigation Header for Transfers and Car Rentals Pages
 * Only shows relevant menus with dropdown functionality and home button
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  Car as CarIcon,
  Bus,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface SimpleNavigationHeaderProps {
  currentPage: 'transfers' | 'car-rentals';
}

const SimpleNavigationHeader: React.FC<SimpleNavigationHeaderProps> = ({ currentPage }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Ana Sayfa</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-2">
            {/* Car Rentals Link */}
            <Link
              href="/car-rentals"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === 'car-rentals'
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CarIcon className="w-4 h-4" />
              <span className="font-medium">Araç Kiralama</span>
            </Link>

            {/* Transfer Link */}
            <Link
              href="/transfers"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === 'transfers'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span className="font-medium">Transfer</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SimpleNavigationHeader;
