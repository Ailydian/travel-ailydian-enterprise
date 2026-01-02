/**
 * Breadcrumbs Component
 * Displays navigation breadcrumbs with Schema.org support
 *
 * @component Breadcrumbs
 * @seo Google Rich Snippets, User Navigation
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import { generateBreadcrumbSchema } from '@/lib/seo/schema-generators';

// ===================================================
// COMPONENT PROPS
// ===================================================

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
  homeIcon?: boolean;
  addSchema?: boolean;
}

// ===================================================
// BREADCRUMBS COMPONENT
// ===================================================

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  showHome = true,
  separator,
  homeIcon = true,
  addSchema = true,
}) => {
  const router = useRouter();

  // Filter out home if showHome is false
  const displayItems = showHome ? items : items.slice(1);

  // Default separator
  const defaultSeparator = <ChevronRight className="w-4 h-4 text-neutral-400" />;

  return (
    <>
      {/* Schema.org Breadcrumb */}
      {addSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(items)),
          }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.url} className="flex items-center space-x-2">
                {/* Separator (except for first item) */}
                {!isFirst && (
                  <span className="flex items-center" aria-hidden="true">
                    {separator || defaultSeparator}
                  </span>
                )}

                {/* Breadcrumb Link/Text */}
                {isLast ? (
                  // Last item (current page) - plain text
                  <span
                    className="text-neutral-900 font-medium truncate max-w-[200px]"
                    aria-current="page"
                  >
                    {isFirst && homeIcon ? (
                      <span className="flex items-center space-x-1">
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.name}</span>
                      </span>
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  // Other items - links
                  <Link
                    href={item.url}
                    className="text-neutral-600 hover:text-primary-600 transition-colors truncate max-w-[200px] flex items-center space-x-1"
                  >
                    {isFirst && homeIcon ? (
                      <>
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.name}</span>
                      </>
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

// ===================================================
// MOBILE-OPTIMIZED BREADCRUMBS
// ===================================================

export const MobileBreadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  // On mobile, only show: Home > ... > Current
  const displayItems =
    items.length > 3
      ? [items[0], { name: '...', url: '#', active: false }, items[items.length - 1]]
      : items;

  return (
    <Breadcrumbs
      items={displayItems}
      className={className}
      homeIcon={true}
      addSchema={false} // Schema added once in desktop version
    />
  );
};

// ===================================================
// COMPACT BREADCRUMBS (for headers)
// ===================================================

export const CompactBreadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  // Show only last 2 items
  const displayItems = items.slice(-2);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 text-xs ${className}`}
    >
      <ol className="flex items-center space-x-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;

          return (
            <li key={item.url} className="flex items-center space-x-1">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-neutral-400" />
              )}

              {isLast ? (
                <span className="text-neutral-900 font-medium truncate max-w-[150px]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-neutral-500 hover:text-primary-600 transition-colors truncate max-w-[150px]"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// ===================================================
// STYLED BREADCRUMBS (with background)
// ===================================================

export const StyledBreadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  return (
    <div className={`bg-neutral-50 border-b border-neutral-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Breadcrumbs items={items} />
      </div>
    </div>
  );
};

// ===================================================
// DEFAULT EXPORT
// ===================================================

export default Breadcrumbs;
