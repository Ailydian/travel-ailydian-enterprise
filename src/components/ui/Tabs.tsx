/**
 * Tabs Component - Production-Grade Tab Navigation
 * Features: Keyboard navigation, accessibility, animations, lazy loading
 */

'use client';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  /** Tab items */
  tabs: Tab[];
  /** Default active tab */
  defaultActiveId?: string;
  /** Controlled active tab */
  activeId?: string;
  /** Change handler */
  onChange?: (id: string) => void;
  /** Tabs variant */
  variant?: 'default' | 'pills' | 'underline';
  /** Tabs orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Lazy load tab content */
  lazy?: boolean;
  /** Centered tabs */
  centered?: boolean;
  /** className */
  className?: string;
}

interface TabsContextValue {
  activeId: string;
  setActiveId: (id: string) => void;
  orientation: 'horizontal' | 'vertical';
}

// ============================================================================
// CONTEXT
// ============================================================================

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within Tabs');
  }
  return context;
};

// ============================================================================
// TABS COMPONENT
// ============================================================================

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  variant = 'default',
  orientation = 'horizontal',
  fullWidth = false,
  lazy = false,
  centered = false,
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(
    defaultActiveId || tabs[0]?.id || ''
  );

  const isControlled = controlledActiveId !== undefined;
  const activeId = isControlled ? controlledActiveId : internalActiveId;

  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(
    new Set([activeId])
  );

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Handle tab change
  const handleTabChange = (id: string) => {
    const tab = tabs.find((t) => t.id === id);
    if (tab?.disabled) return;

    if (!isControlled) {
      setInternalActiveId(id);
    }

    if (lazy) {
      setLoadedTabs((prev) => new Set(prev).add(id));
    }

    onChange?.(id);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIndex = tabs.findIndex((t) => t.id === currentId);
    let nextIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex - 1;
      } else if (e.key === 'ArrowRight') {
        nextIndex = currentIndex + 1;
      }
    } else {
      if (e.key === 'ArrowUp') {
        nextIndex = currentIndex - 1;
      } else if (e.key === 'ArrowDown') {
        nextIndex = currentIndex + 1;
      }
    }

    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = tabs.length - 1;

    // Wrap around
    if (nextIndex < 0) nextIndex = tabs.length - 1;
    if (nextIndex >= tabs.length) nextIndex = 0;

    // Skip disabled tabs
    while (tabs[nextIndex]?.disabled && nextIndex !== currentIndex) {
      nextIndex = nextIndex + 1;
      if (nextIndex >= tabs.length) nextIndex = 0;
    }

    if (nextIndex !== currentIndex && !tabs[nextIndex]?.disabled) {
      const nextTab = tabs[nextIndex];
      handleTabChange(nextTab.id);
      tabRefs.current.get(nextTab.id)?.focus();
    }
  };

  // Update indicator position
  useEffect(() => {
    const activeButton = tabRefs.current.get(activeId);
    const indicator = indicatorRef.current;

    if (activeButton && indicator && variant === 'underline') {
      const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeButton;

      if (orientation === 'horizontal') {
        indicator.style.left = `${offsetLeft}px`;
        indicator.style.width = `${offsetWidth}px`;
      } else {
        indicator.style.top = `${offsetTop}px`;
        indicator.style.height = `${offsetHeight}px`;
      }
    }
  }, [activeId, variant, orientation, tabs]);

  // Load all tabs if not lazy
  useEffect(() => {
    if (!lazy) {
      setLoadedTabs(new Set(tabs.map((t) => t.id)));
    }
  }, [lazy, tabs]);

  // ========================================
  // VARIANT STYLES
  // ========================================

  const getTabButtonClasses = (tab: Tab, isActive: boolean) => {
    const baseClasses = `
      relative px-4 py-2 font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'flex-1' : ''}
    `;

    if (variant === 'pills') {
      return `
        ${baseClasses}
        rounded-lg
        ${isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100'
        }
      `;
    }

    if (variant === 'underline') {
      return `
        ${baseClasses}
        border-b-2
        ${isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900'
        }
      `;
    }

    // default variant
    return `
      ${baseClasses}
      border border-gray-300 -ml-px first:ml-0 first:rounded-l-lg last:rounded-r-lg
      ${isActive
        ? 'bg-white text-blue-600 border-blue-600 z-10'
        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
      }
    `;
  };

  const contextValue: TabsContextValue = {
    activeId,
    setActiveId: handleTabChange,
    orientation,
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`
          ${orientation === 'vertical' ? 'flex gap-4' : ''}
          ${className}
        `}
      >
        {/* Tab List */}
        <div
          role="tablist"
          aria-orientation={orientation}
          className={`
            relative
            ${orientation === 'horizontal'
              ? `flex ${centered ? 'justify-center' : ''} ${variant === 'underline' ? 'border-b border-gray-200' : ''}`
              : 'flex flex-col space-y-1'
            }
          `}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) tabRefs.current.set(tab.id, el);
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={getTabButtonClasses(tab, isActive)}
              >
                <span className="flex items-center gap-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`
                      px-2 py-0.5 text-xs font-semibold rounded-full
                      ${isActive ? 'bg-white/20' : 'bg-blue-100 text-blue-700'}
                    `}>
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}

          {/* Underline indicator */}
          {variant === 'underline' && (
            <div
              ref={indicatorRef}
              className={`
                absolute bg-blue-600 transition-all duration-300
                ${orientation === 'horizontal'
                  ? 'bottom-0 h-0.5'
                  : 'left-0 w-0.5'
                }
              `}
            />
          )}
        </div>

        {/* Tab Panels */}
        <div className={`${orientation === 'vertical' ? 'flex-1' : 'mt-4'}`}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            const shouldRender = !lazy || loadedTabs.has(tab.id);

            return (
              <div
                key={tab.id}
                id={`tabpanel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                hidden={!isActive}
                className={`
                  ${isActive ? 'block' : 'hidden'}
                  ${isActive ? 'animate-fadeIn' : ''}
                `}
              >
                {shouldRender && tab.content}
              </div>
            );
          })}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

// ============================================================================
// STANDALONE TAB COMPONENTS (Composable API)
// ============================================================================

export const TabList: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const { orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={`
        flex gap-2
        ${orientation === 'vertical' ? 'flex-col' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const TabButton: React.FC<{
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}> = ({ id, children, disabled, className = '' }) => {
  const { activeId, setActiveId } = useTabsContext();
  const isActive = activeId === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      disabled={disabled}
      onClick={() => setActiveId(id)}
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => {
  const { activeId } = useTabsContext();
  const isActive = activeId === id;

  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      hidden={!isActive}
      className={className}
    >
      {isActive && children}
    </div>
  );
};

export default Tabs;
