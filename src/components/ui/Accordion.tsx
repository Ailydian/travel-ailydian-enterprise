/**
 * Accordion Component - Production-Grade Collapsible Sections
 * Features: Single/multiple expand, animations, keyboard navigation, accessibility
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  /** Accordion items */
  items: AccordionItem[];
  /** Allow multiple items open */
  multiple?: boolean;
  /** Default expanded items */
  defaultExpanded?: string[];
  /** Controlled expanded items */
  expanded?: string[];
  /** Change handler */
  onChange?: (expandedIds: string[]) => void;
  /** Accordion variant */
  variant?: 'default' | 'bordered' | 'separated';
  /** Allow collapse all */
  collapsible?: boolean;
  /** className */
  className?: string;
}

// ============================================================================
// ACCORDION COMPONENT
// ============================================================================

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultExpanded = [],
  expanded: controlledExpanded,
  onChange,
  variant = 'default',
  collapsible = true,
  className = '',
}) => {
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  // ========================================
  // EXPANSION LOGIC
  // ========================================

  const handleToggle = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.disabled) return;

    let newExpanded: string[];

    if (multiple) {
      // Multiple items can be expanded
      if (expanded.includes(id)) {
        newExpanded = expanded.filter((i) => i !== id);
      } else {
        newExpanded = [...expanded, id];
      }
    } else {
      // Only one item can be expanded
      if (expanded.includes(id)) {
        newExpanded = collapsible ? [] : [id];
      } else {
        newExpanded = [id];
      }
    }

    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }

    onChange?.(newExpanded);
  };

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  const handleKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIndex = items.findIndex((i) => i.id === currentId);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowDown') {
      nextIndex = currentIndex + 1;
    } else if (e.key === 'ArrowUp') {
      nextIndex = currentIndex - 1;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    e.preventDefault();

    // Wrap around
    if (nextIndex < 0) nextIndex = items.length - 1;
    if (nextIndex >= items.length) nextIndex = 0;

    // Skip disabled items
    while (items[nextIndex]?.disabled && nextIndex !== currentIndex) {
      nextIndex = (nextIndex + 1) % items.length;
    }

    // Focus next button
    const nextButton = document.getElementById(`accordion-button-${items[nextIndex].id}`);
    nextButton?.focus();
  };

  // ========================================
  // VARIANT STYLES
  // ========================================

  const getContainerClasses = () => {
    const base = 'w-full';
    
    if (variant === 'bordered') {
      return `${base} border border-lydian-border rounded-lg overflow-hidden`;
    }
    
    if (variant === 'separated') {
      return `${base} space-y-3`;
    }
    
    return `${base} divide-y divide-gray-200 border border-lydian-border rounded-lg`;
  };

  const getItemClasses = (isExpanded: boolean, isFirst: boolean, isLast: boolean) => {
    if (variant === 'separated') {
      return `border border-lydian-border rounded-lg overflow-hidden ${isExpanded ? 'ring-2 ring-lydian-primary' : ''}`;
    }
    
    return '';
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {items.map((item, index) => {
        const isExpanded = expanded.includes(item.id);
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <AccordionItemComponent
            key={item.id}
            item={item}
            isExpanded={isExpanded}
            isFirst={isFirst}
            isLast={isLast}
            variant={variant}
            onToggle={() => handleToggle(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
          />
        );
      })}
    </div>
  );
};

// ============================================================================
// ACCORDION ITEM COMPONENT
// ============================================================================

interface AccordionItemComponentProps {
  item: AccordionItem;
  isExpanded: boolean;
  isFirst: boolean;
  isLast: boolean;
  variant: 'default' | 'bordered' | 'separated';
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const AccordionItemComponent: React.FC<AccordionItemComponentProps> = ({
  item,
  isExpanded,
  isFirst,
  isLast,
  variant,
  onToggle,
  onKeyDown,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.content, isExpanded]);

  const itemClasses = variant === 'separated' 
    ? `border border-lydian-border rounded-lg overflow-hidden ${isExpanded ? 'ring-2 ring-lydian-primary' : ''}`
    : '';

  return (
    <div className={itemClasses}>
      {/* Header Button */}
      <button
        id={`accordion-button-${item.id}`}
        type="button"
        disabled={item.disabled}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${item.id}`}
        className={`
          w-full flex items-center justify-between gap-4
          px-6 py-4 text-left font-medium
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-lydian-primary focus:ring-inset
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isExpanded ? 'bg-lydian-bg-surface' : 'hover:bg-lydian-bg-surface'}
        `}
      >
        <div className="flex items-center gap-3 flex-1">
          {item.icon && (
            <span className={`flex-shrink-0 ${isExpanded ? 'text-lydian-primary' : 'text-lydian-text-muted'}`}>
              {item.icon}
            </span>
          )}
          <span className={`${isExpanded ? 'text-lydian-text' : 'text-lydian-text-secondary'}`}>
            {item.title}
          </span>
        </div>

        {/* Chevron Icon */}
        <svg
          className={`
            w-5 h-5 flex-shrink-0 transition-transform duration-200
            ${isExpanded ? 'rotate-180 text-lydian-primary' : 'text-lydian-text-muted'}
          `}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content Panel */}
      <div
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-button-${item.id}`}
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={contentRef} className="px-6 py-4 text-lydian-text-secondary border-t border-lydian-border">
          {item.content}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SIMPLE ACCORDION (Alternative API)
// ============================================================================

export interface SimpleAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const SimpleAccordion: React.FC<SimpleAccordionProps> = ({
  title,
  children,
  defaultExpanded = false,
  icon,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className={`border border-lydian-border rounded-lg overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium hover:bg-lydian-bg-surface"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-lydian-text-muted">{icon}</span>}
          <span>{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 300ms ease-in-out',
        }}
      >
        <div ref={contentRef} className="px-6 py-4 border-t border-lydian-border text-lydian-text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
