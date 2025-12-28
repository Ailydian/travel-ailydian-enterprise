'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, Beaker, Clock } from 'lucide-react';

export type DemoBadgeVariant = 'blockchain' | 'ai' | 'beta' | 'coming-soon' | 'demo' | 'simulated';

interface DemoBadgeProps {
  variant?: DemoBadgeVariant;
  tooltip?: string;
  className?: string;
  position?: 'inline' | 'absolute';
  size?: 'sm' | 'md' | 'lg';
}

const getDemoBadgeConfig = (variant: DemoBadgeVariant) => {
  const configs = {
    blockchain: {
      label: 'TESTNET DEMO',
      icon: Zap,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-300',
      dotColor: 'bg-orange-500',
      tooltip: 'This is a simulated blockchain feature. No real transactions occur.',
    },
    ai: {
      label: 'AI DEMO',
      icon: Beaker,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-300',
      dotColor: 'bg-purple-500',
      tooltip: 'This AI feature uses simulated responses. Real integration coming soon.',
    },
    beta: {
      label: 'BETA',
      icon: AlertCircle,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-300',
      dotColor: 'bg-blue-500',
      tooltip: 'This feature is in beta testing.',
    },
    'coming-soon': {
      label: 'COMING SOON',
      icon: Clock,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      dotColor: 'bg-gray-500',
      tooltip: 'This feature is coming soon.',
    },
    demo: {
      label: 'DEMO',
      icon: Beaker,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-300',
      dotColor: 'bg-yellow-500',
      tooltip: 'This is a demonstration feature.',
    },
    simulated: {
      label: 'SIMULATED',
      icon: AlertCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-300',
      dotColor: 'bg-red-500',
      tooltip: 'This feature is simulated with mock data.',
    },
  };

  return configs[variant];
};

const sizeConfig = {
  sm: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    iconSize: 'w-3 h-3',
  },
  md: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    iconSize: 'w-4 h-4',
  },
  lg: {
    padding: 'px-4 py-2',
    text: 'text-base',
    iconSize: 'w-5 h-5',
  },
};

const DemoBadge: React.FC<DemoBadgeProps> = ({
  variant = 'demo',
  tooltip,
  className = '',
  position = 'inline',
  size = 'md',
}) => {
  const config = getDemoBadgeConfig(variant);
  const Icon = config.icon;
  const sizeData = sizeConfig[size];
  const tooltipText = tooltip || config.tooltip;

  const badgeContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        group relative inline-flex items-center gap-2
        ${sizeData.padding} ${sizeData.text}
        ${config.bgColor} ${config.textColor}
        border ${config.borderColor}
        rounded-full font-semibold
        transition-all duration-200
        ${position === 'absolute' ? 'absolute top-4 left-4 z-10' : ''}
        ${className}
      `}
    >
      <div className={`relative flex items-center`}>
        <div className={`${config.dotColor} rounded-full animate-pulse`}>
          <Icon className={`${sizeData.iconSize}`} />
        </div>
      </div>
      <span className="font-bold">{config.label}</span>

      {/* Tooltip */}
      <div
        className={`
          absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
          bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 z-50 pointer-events-none
          shadow-lg before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
          before:border-4 before:border-transparent before:border-t-gray-900
        `}
      >
        {tooltipText}
      </div>
    </motion.div>
  );

  return badgeContent;
};

export default DemoBadge;
