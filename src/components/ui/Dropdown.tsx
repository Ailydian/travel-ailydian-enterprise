/**
 * Dropdown/Select Component - Production-Grade
 * Features: Keyboard navigation, search, multi-select, accessibility
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  /** Available options */
  options: DropdownOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Change handler */
  onChange: (value: string | string[]) => void;
  /** Dropdown label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Multi-select mode */
  multi?: boolean;
  /** Searchable dropdown */
  searchable?: boolean;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
} as const;

/**
 * Dropdown Component
 *
 * @example
 * ```tsx
 * <Dropdown
 *   label="Country"
 *   options={countries}
 *   value={selectedCountry}
 *   onChange={setSelectedCountry}
 *   searchable
 * />
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  multi = false,
  searchable = false,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  size = 'md',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = searchable && searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Get selected label(s)
  const getSelectedLabel = (): string => {
    if (!value) return placeholder;

    if (multi && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      const selectedLabels = value
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean);
      return selectedLabels.join(', ');
    }

    const selected = options.find((opt) => opt.value === value);
    return selected?.label || placeholder;
  };

  // Handle option select
  const handleSelect = (optionValue: string) => {
    if (multi && Array.isArray(value)) {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value);
        } else {
          setIsOpen(true);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      default:
        break;
    }
  };

  // Check if option is selected
  const isSelected = (optionValue: string): boolean => {
    if (multi && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      ref={dropdownRef}
      className={`relative ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {label && (
        <label
          htmlFor={dropdownId}
          className="block text-sm font-medium text-lydian-text-secondary mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          id={dropdownId}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`
            w-full flex items-center justify-between rounded-lg border
            transition-all duration-200 text-left
            focus:outline-none focus:ring-2 focus:ring-lydian-primary focus:ring-opacity-50
            disabled:bg-lydian-bg-surface-raised disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-lydian-border-medium'}
            ${sizeStyles[size]}
          `}
        >
          <span className={value ? 'text-lydian-text' : 'text-lydian-text-muted'}>
            {getSelectedLabel()}
          </span>

          <svg
            className={`w-5 h-5 text-lydian-text-muted transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
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

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-lydian-bg border border-lydian-border-medium rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-lydian-border">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-sm border border-lydian-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-lydian-primary"
                />
              </div>
            )}

            <ul
              role="listbox"
              className="overflow-y-auto max-h-48"
              aria-labelledby={dropdownId}
            >
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-sm text-lydian-text-muted text-center">
                  No options found
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected(option.value)}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className={`
                      px-4 py-2.5 text-sm cursor-pointer transition-colors
                      flex items-center gap-3
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                      ${
                        index === focusedIndex
                          ? 'bg-blue-50'
                          : isSelected(option.value)
                          ? 'bg-blue-100'
                          : 'hover:bg-lydian-bg-surface-raised'
                      }
                    `}
                  >
                    {multi && (
                      <input
                        type="checkbox"
                        checked={isSelected(option.value)}
                        readOnly
                        className="w-4 h-4 text-lydian-primary border-lydian-border-medium rounded focus:ring-lydian-primary"
                      />
                    )}

                    {option.icon && <span>{option.icon}</span>}

                    <span className="flex-1">{option.label}</span>

                    {!multi && isSelected(option.value) && (
                      <svg
                        className="w-5 h-5 text-lydian-primary"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-lydian-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
