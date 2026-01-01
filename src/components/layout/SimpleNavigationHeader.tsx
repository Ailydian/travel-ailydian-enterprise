/**
 * Simple Navigation Header for Service Pages
 * Shows navigation menu with home button and language switcher
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  Car as CarIcon,
  Bus,
  Building2 } from
'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LAYOUT_CONSTANTS } from '@/config/layout-constants';

interface SimpleNavigationHeaderProps {
  currentPage: 'transfers' | 'car-rentals' | 'rentals';
}

const SimpleNavigationHeader: React.FC<SimpleNavigationHeaderProps> = ({ currentPage }) => {
  const router = useRouter();

  return (
    <header className={`sticky top-0 ${LAYOUT_CONSTANTS.header.zIndex} bg-lydian-glass-dark border-b border-lydian-border-light/10 shadow-sm`}>
      <div className={`${LAYOUT_CONSTANTS.header.maxWidth} mx-auto ${LAYOUT_CONSTANTS.header.padding.x}`}>
        <div className={`flex items-center justify-between ${LAYOUT_CONSTANTS.header.height.mobile} ${LAYOUT_CONSTANTS.header.height.desktop}`}>
          {/* Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-lydian-text-muted hover:bg-lydian-glass-dark transition-colors duration-200">

            <Home className="w-5 h-5" />
            <span className="font-medium">Ana Sayfa</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle variant="icon" />
            {/* Rentals Link */}
            <Link
              href="/rentals"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'rentals' ?
              'bg-purple-50 text-purple-600' :
              'text-gray-200 hover:bg-lydian-bg/5'}`
              }>

              <Building2 className="w-4 h-4" />
              <span className="font-medium">Konaklama</span>
            </Link>

            {/* Car Rentals Link */}
            <Link
              href="/car-rentals"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'car-rentals' ?
              'bg-green-50 text-lydian-success' :
              'text-gray-200 hover:bg-lydian-bg/5'}`
              }>

              <CarIcon className="w-4 h-4" />
              <span className="font-medium">Araç Kiralama</span>
            </Link>

            {/* Transfer Link */}
            <Link
              href="/transfers"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === 'transfers' ?
              'bg-blue-50 text-lydian-primary' :
              'text-gray-200 hover:bg-lydian-bg/5'}`
              }>

              <Bus className="w-4 h-4" />
              <span className="font-medium">Transfer</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>);

};

export default SimpleNavigationHeader;