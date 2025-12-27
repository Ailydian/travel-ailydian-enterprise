/**
 * Responsive Sidebar Component - Production-Grade
 * Features: Mobile-first, touch gestures, animations, accessibility
 * 
 * Mobile: Drawer with backdrop
 * Tablet: Collapsible sidebar
 * Desktop: Persistent sidebar
 */

'use client';

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// TYPES
// ============================================================================

export interface SidebarProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: 'persistent' | 'temporary' | 'rail';
  position?: 'left' | 'right';
  width?: string;
  className?: string;
}

interface SidebarContextValue {
  isOpen: boolean;
  isMobile: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within Sidebar');
  }
  return context;
};

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  variant = 'persistent',
  position = 'left',
  width = '280px',
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  // ========================================
  // RESPONSIVE DETECTION
  // ========================================

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // Auto-close on mobile when resizing
      if (mobile && isOpen && variant === 'persistent') {
        handleClose();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isOpen, variant]);

  // ========================================
  // OPEN/CLOSE HANDLERS
  // ========================================

  const handleOpen = () => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  // ========================================
  // TOUCH GESTURES (Mobile swipe to close)
  // ========================================

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe left to close (for left sidebar)
    if (position === 'left' && diff > 50) {
      handleClose();
    }
    
    // Swipe right to close (for right sidebar)
    if (position === 'right' && diff < -50) {
      handleClose();
    }
  };

  // ========================================
  // ESCAPE KEY & CLICK OUTSIDE
  // ========================================

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile]);

  // ========================================
  // BODY SCROLL LOCK (Mobile)
  // ========================================

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen]);

  // ========================================
  // CONTEXT VALUE
  // ========================================

  const contextValue: SidebarContextValue = {
    isOpen,
    isMobile,
    toggle: handleToggle,
    open: handleOpen,
    close: handleClose,
  };

  // ========================================
  // STYLES
  // ========================================

  const sidebarClasses = `
    fixed top-0 h-full bg-white shadow-2xl
    transition-transform duration-300 ease-out
    z-40
    ${position === 'left' ? 'left-0' : 'right-0'}
    ${isMobile
      ? isOpen
        ? 'translate-x-0'
        : position === 'left'
        ? '-translate-x-full'
        : 'translate-x-full'
      : 'translate-x-0'
    }
    ${className}
  `;

  const backdropClasses = `
    fixed inset-0 bg-black/50 backdrop-blur-sm
    transition-opacity duration-300
    z-30
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `;

  // ========================================
  // RENDER
  // ========================================

  const sidebarContent = (
    <SidebarContext.Provider value={contextValue}>
      {/* Backdrop (Mobile only) */}
      {isMobile && (
        <div
          className={backdropClasses}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        style={{ width }}
        className={sidebarClasses}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Sidebar navigation"
      >
        <div className="h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  );

  // Portal for mobile (to avoid z-index issues)
  if (isMobile && typeof window !== 'undefined') {
    return createPortal(sidebarContent, document.body);
  }

  return sidebarContent;
};

// ============================================================================
// SIDEBAR TOGGLE BUTTON
// ============================================================================

export const SidebarToggle: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const { toggle, isOpen } = useSidebar();

  return (
    <button
      onClick={toggle}
      className={`
        p-2 rounded-lg
        text-gray-600 hover:text-gray-900 hover:bg-gray-100
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${className}
      `}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          <path d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
};

// ============================================================================
// SIDEBAR HEADER
// ============================================================================

export const SidebarHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// ============================================================================
// SIDEBAR NAV
// ============================================================================

export const SidebarNav: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <nav className={`px-3 py-4 space-y-1 ${className}`} role="navigation">
      {children}
    </nav>
  );
};

// ============================================================================
// SIDEBAR NAV ITEM
// ============================================================================

export interface SidebarNavItemProps {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  children,
  active = false,
  icon,
  badge,
  onClick,
  href,
  className = '',
}) => {
  const { close, isMobile } = useSidebar();

  const handleClick = () => {
    onClick?.();
    if (isMobile) {
      close();
    }
  };

  const baseClasses = `
    flex items-center gap-3 px-3 py-2.5 rounded-lg
    text-sm font-medium transition-all duration-200
    ${active
      ? 'bg-blue-50 text-blue-700'
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }
    ${className}
  `;

  const content = (
    <>
      {icon && (
        <span className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500'}`}>
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className={`
          px-2 py-0.5 text-xs font-semibold rounded-full
          ${active ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}
        `}>
          {badge}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={`${baseClasses} w-full text-left`}>
      {content}
    </button>
  );
};

// ============================================================================
// SIDEBAR FOOTER
// ============================================================================

export const SidebarFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-200 bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Sidebar;
