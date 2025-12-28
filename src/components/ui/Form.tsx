'use client';

import { logger } from '../../lib/logger/winston';
/**
 * Form Component - Production-Grade Form Management
 * Features: Validation, error handling, submission states, field-level control
 * Architecture: Controlled components with React Hook Form integration patterns
 */

import React, { createContext, useContext, useState, useCallback, FormEvent } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FormFieldConfig {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  validation?: {
    required?: string | boolean;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    validate?: (value: any) => boolean | string;
    custom?: (value: any, formData: any) => Promise<boolean | string>;
  };
}

export interface FormContextValue {
  formData: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValidating: boolean;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  validateField: (name: string) => Promise<boolean>;
  resetForm: () => void;
}

export interface FormProps {
  /** Form fields configuration */
  fields?: FormFieldConfig[];
  /** Initial form values */
  initialValues?: Record<string, any>;
  /** Submit handler */
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  /** Validation handler (called before submit) */
  onValidate?: (data: Record<string, any>) => Record<string, string> | Promise<Record<string, string>>;
  /** Form children */
  children: React.ReactNode;
  /** Submit button text */
  submitText?: string;
  /** Show submit button */
  showSubmitButton?: boolean;
  /** Validate on blur */
  validateOnBlur?: boolean;
  /** Validate on change */
  validateOnChange?: boolean;
  /** Reset on submit success */
  resetOnSuccess?: boolean;
  /** Success callback */
  onSuccess?: () => void;
  /** Error callback */
  onError?: (error: any) => void;
  /** Form className */
  className?: string;
}

// ============================================================================
// CONTEXT
// ============================================================================

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

const validateFieldValue = async (
  value: any,
  config: FormFieldConfig,
  formData: Record<string, any>
): Promise<string | null> => {
  if (!config.validation) return null;

  const { required, minLength, maxLength, pattern, validate, custom } = config.validation;

  // Required validation
  if (required && !value) {
    return typeof required === 'string' ? required : `${config.label || config.name} is required`;
  }

  // Skip other validations if value is empty and not required
  if (!value) return null;

  // Min length validation
  if (minLength && value.length < minLength.value) {
    return minLength.message;
  }

  // Max length validation
  if (maxLength && value.length > maxLength.value) {
    return maxLength.message;
  }

  // Pattern validation
  if (pattern && !pattern.value.test(value)) {
    return pattern.message;
  }

  // Custom sync validation
  if (validate) {
    const result = validate(value);
    if (typeof result === 'string') return result;
    if (result === false) return 'Invalid value';
  }

  // Custom async validation
  if (custom) {
    const result = await custom(value, formData);
    if (typeof result === 'string') return result;
    if (result === false) return 'Invalid value';
  }

  return null;
};

// ============================================================================
// FORM COMPONENT
// ============================================================================

export const Form: React.FC<FormProps> = ({
  fields = [],
  initialValues = {},
  onSubmit,
  onValidate,
  children,
  submitText = 'Submit',
  showSubmitButton = true,
  validateOnBlur = true,
  validateOnChange = false,
  resetOnSuccess = false,
  onSuccess,
  onError,
  className = '',
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // ========================================
  // FIELD MANAGEMENT
  // ========================================

  const setValue = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validateOnChange) {
      const fieldConfig = fields.find((f) => f.name === name);
      if (fieldConfig) {
        validateFieldValue(value, fieldConfig, formData).then((error) => {
          if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
          } else {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          }
        });
      }
    }
  }, [fields, formData, validateOnChange]);

  const setError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const setTouchedField = useCallback((name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  // ========================================
  // VALIDATION
  // ========================================

  const validateField = useCallback(async (name: string): Promise<boolean> => {
    const fieldConfig = fields.find((f) => f.name === name);
    if (!fieldConfig) return true;

    const error = await validateFieldValue(formData[name], fieldConfig, formData);
    
    if (error) {
      setError(name, error);
      return false;
    } else {
      clearError(name);
      return true;
    }
  }, [fields, formData, setError, clearError]);

  const validateAllFields = async (): Promise<boolean> => {
    setIsValidating(true);
    
    const validationPromises = fields.map(async (field) => {
      const error = await validateFieldValue(formData[field.name], field, formData);
      return { name: field.name, error };
    });

    const results = await Promise.all(validationPromises);
    const newErrors: Record<string, string> = {};
    
    results.forEach(({ name, error }) => {
      if (error) newErrors[name] = error;
    });

    // Custom form-level validation
    if (onValidate) {
      const customErrors = await onValidate(formData);
      Object.assign(newErrors, customErrors);
    }

    setErrors(newErrors);
    setIsValidating(false);

    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // FORM SUBMISSION
  // ========================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate all fields
    const isValid = await validateAllFields();
    if (!isValid) return;

    // Submit
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onSuccess?.();
      
      if (resetOnSuccess) {
        resetForm();
      }
    } catch (error) {
      logger.error('Form submission error:', error);
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // RESET
  // ========================================

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // ========================================
  // CONTEXT VALUE
  // ========================================

  const contextValue: FormContextValue = {
    formData,
    errors,
    touched,
    isSubmitting,
    isValidating,
    setValue,
    setError,
    clearError,
    setTouched: setTouchedField,
    validateField,
    resetForm,
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
        {children}
        
        {showSubmitButton && (
          <button
            type="submit"
            disabled={isSubmitting || isValidating}
            className={`
              w-full px-6 py-3 rounded-lg font-semibold text-white
              transition-all duration-200
              ${isSubmitting || isValidating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : isValidating ? 'Validating...' : submitText}
          </button>
        )}
      </form>
    </FormContext.Provider>
  );
};

// ============================================================================
// FORM FIELD COMPONENT
// ============================================================================

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  rows?: number; // for textarea
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required,
  disabled,
  className = '',
  inputClassName = '',
  rows = 4,
}) => {
  const { formData, errors, touched, setValue, setTouched, validateField } = useFormContext();

  const value = formData[name] || '';
  const error = touched[name] ? errors[name] : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(name, e.target.value);
  };

  const handleBlur = async () => {
    setTouched(name, true);
    await validateField(name);
  };

  const inputId = `form-field-${name}`;
  const isTextarea = type === 'textarea';

  const baseInputClasses = `
    w-full px-4 py-2 rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${inputClassName}
  `;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={baseInputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Form;
