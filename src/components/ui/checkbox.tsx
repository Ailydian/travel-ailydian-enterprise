import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-lydian-border-light text-lydian-primary focus:ring-2 focus:ring-lydian-border-focus ${className}`}
        {...props} />

      {label &&
      <label className="ml-2 text-sm text-lydian-text-muted">
          {label}
        </label>
      }
    </div>);

};