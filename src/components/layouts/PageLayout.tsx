/**
 * UNIFIED PAGE LAYOUT COMPONENT
 * Wraps all pages with consistent header, footer, and structure
 * Ensures uniform design across the entire application
 */

import React, { ReactNode } from 'react';
import { FuturisticHeader } from '../layout/FuturisticHeader';
import { BookingFooter } from '../layout/BookingFooter';
import { SEOHead } from '../seo/SEOHead';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
  containerized?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  showHeader = true,
  showFooter = true,
  className = '',
  containerized = false,
}) => {
  return (
    <>
      {/* SEO Head */}
      {title && (
        <SEOHead
          title={title}
          description={description}
          keywords={keywords}
          canonical={canonical}
          type={type}
        />
      )}

      {/* Header */}
      {showHeader && <FuturisticHeader />}

      {/* Main Content */}
      <main className={`min-h-screen ${className}`}>
        {containerized ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        ) : (
          children
        )}
      </main>

      {/* Footer */}
      {showFooter && <BookingFooter />}
    </>
  );
};

export default PageLayout;
