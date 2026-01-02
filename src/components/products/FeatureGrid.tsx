/**
 * FeatureGrid - Responsive Feature Display Component
 * Glassmorphism design with icons
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  included?: boolean; // true = check icon, false = x icon, undefined = custom icon
}

export interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'included' | 'excluded';
  title?: string;
}

const variantStyles = {
  default: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-500',
    text: 'text-lydian-text-inverse'
  },
  included: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: 'text-green-500',
    text: 'text-lydian-text-inverse'
  },
  excluded: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'text-red-500',
    text: 'text-lydian-text-muted'
  }
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  variant = 'default',
  title
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const styles = variantStyles[variant];

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-lydian-text-inverse mb-6">{title}</h2>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 p-4 rounded-xl ${styles.bg} border ${styles.border} backdrop-blur-sm hover:scale-105 transition-transform`}
          >
            <div className={`flex-shrink-0 mt-0.5 ${styles.icon}`}>
              {feature.icon ? (
                feature.icon
              ) : feature.included !== undefined ? (
                feature.included ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )
              ) : (
                <Check className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${styles.text}`}>
                {feature.title}
              </p>
              {feature.description && (
                <p className="text-xs text-lydian-text-muted mt-1">
                  {feature.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
