/**
 * 📝 FUTURISTIC INPUT 2025
 * Glassmorphism + Floating Labels + Aurora Glow + Animated Border
 * Apple Vision Pro Input Aesthetics
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FuturisticInputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'textarea';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  glowColor?: string;
}

export const FuturisticInput: React.FC<FuturisticInputProps> = ({
  type = 'text',
  label,
  placeholder,
  value = '',
  onChange,
  onFocus,
  onBlur,
  icon,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  glowColor = '#00BAFF',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const isActive = isFocused || hasValue;

  const inputClasses = `
    w-full
    px-4 py-3
    ${icon ? 'pl-12' : 'px-4'}
    bg-white/10 backdrop-blur-xl
    border-2 border-white/30
    rounded-2xl
    text-white
    placeholder-gray-500
    outline-none
    transition-all duration-300
    ${isFocused ? 'border-[#00BAFF] ring-4 ring-[#00BAFF]/20' : ''}
    ${error ? 'border-red-500 ring-4 ring-red-500/20' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <div className={`relative ${className}`}>
      {/* Floating Label */}
      {label && (
        <motion.label
          animate={{
            top: isActive ? '-10px' : '16px',
            fontSize: isActive ? '12px' : '16px',
            color: isFocused ? glowColor : error ? '#EF4444' : '#6B7280',
          }}
          transition={{ duration: 0.2 }}
          className={`
            absolute left-4
            ${icon ? 'left-12' : 'left-4'}
            px-2
            bg-white/5 rounded-lg
            font-semibold
            pointer-events-none
            z-10
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      {/* Icon */}
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-gray-500">
          {icon}
        </div>
      )}

      {/* Input / Textarea */}
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={label ? '' : placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={inputClasses}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={label ? '' : placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
          />
        )}

        {/* Aurora Glow on Focus */}
        <AnimatePresence>
          {isFocused && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10 rounded-2xl blur-xl"
              style={{
                background: `radial-gradient(circle at center, ${glowColor}40, transparent)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Animated Border */}
        {isFocused && !error && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                `0 0 20px ${glowColor}60`,
                `0 0 40px ${glowColor}80`,
                `0 0 20px ${glowColor}60`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Default export
export default FuturisticInput;
