/**
 * Feature Flags and Status Management
 * Defines which features are production-ready, in beta, demo, or coming soon
 */

export enum FeatureStatus {
  PRODUCTION = 'production',
  BETA = 'beta',
  DEMO = 'demo',
  COMING_SOON = 'coming-soon',
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
  category: 'blockchain' | 'ai' | 'vr' | 'payments' | 'search' | 'core';
  enabledInEnv: {
    development: boolean;
    staging: boolean;
    production: boolean;
  };
  notes?: string;
}

/**
 * Complete feature status registry
 * Update this as features move from demo to production
 */
export const FEATURE_REGISTRY: Record<string, Feature> = {
  // BLOCKCHAIN FEATURES
  travel_nft_minting: {
    id: 'travel_nft_minting',
    name: 'Travel NFT Minting',
    description: 'Mint NFTs from travel memories',
    status: FeatureStatus.DEMO,
    category: 'blockchain',
    enabledInEnv: {
      development: true,
      staging: true,
      production: false,
    },
    notes: 'Fully simulated. Uses mock blockchain responses. Testnet integration needed.',
  },
  decentralized_reviews: {
    id: 'decentralized_reviews',
    name: 'Decentralized Reviews',
    description: 'Blockchain-verified travel reviews',
    status: FeatureStatus.DEMO,
    category: 'blockchain',
    enabledInEnv: {
      development: true,
      staging: true,
      production: false,
    },
    notes: 'Mock data only. Real blockchain integration pending.',
  },
  crypto_payments: {
    id: 'crypto_payments',
    name: 'Crypto Payments',
    description: 'Pay with Bitcoin, Ethereum, USDT, etc.',
    status: FeatureStatus.DEMO,
    category: 'payments',
    enabledInEnv: {
      development: true,
      staging: true,
      production: false,
    },
    notes: 'UI only. No real blockchain transactions. Educational demo.',
  },

  // AI FEATURES
  ai_travel_assistant: {
    id: 'ai_travel_assistant',
    name: 'AI Travel Assistant',
    description: 'AI-powered travel planning assistant',
    status: FeatureStatus.DEMO,
    category: 'ai',
    enabledInEnv: {
      development: true,
      staging: true,
      production: false,
    },
    notes: 'Uses simulated responses. Real AI integration (GPT/Advanced LLMs) coming soon.',
  },
  ai_recommendations: {
    id: 'ai_recommendations',
    name: 'AI Recommendations',
    description: 'Personalized travel recommendations',
    status: FeatureStatus.DEMO,
    category: 'ai',
    enabledInEnv: {
      development: true,
      staging: true,
      production: false,
    },
    notes: 'Mock data. Real ML model integration in progress.',
  },
  quantum_search: {
    id: 'quantum_search',
    name: 'Quantum Search',
    description: 'Advanced search with quantum optimization',
    status: FeatureStatus.DEMO,
    category: 'search',
    enabledInEnv: {
      development: true,
      staging: false,
      production: false,
    },
    notes: 'Simulated quantum optimization. No real quantum computing.',
  },

  // VR/3D FEATURES
  virtual_tours_360: {
    id: 'virtual_tours_360',
    name: '360 Virtual Tours',
    description: '360-degree immersive virtual tours',
    status: FeatureStatus.BETA,
    category: 'vr',
    enabledInEnv: {
      development: true,
      staging: true,
      production: true,
    },
    notes: 'Basic 360 panorama support. Full VR headset support coming soon.',
  },
  vr_headset_support: {
    id: 'vr_headset_support',
    name: 'VR Headset Support',
    description: 'Native VR headset integration (Oculus, Meta, etc.)',
    status: FeatureStatus.COMING_SOON,
    category: 'vr',
    enabledInEnv: {
      development: false,
      staging: false,
      production: false,
    },
    notes: 'In development. WebXR API integration planned.',
  },
  ar_property_preview: {
    id: 'ar_property_preview',
    name: 'AR Property Preview',
    description: 'Augmented reality property visualization',
    status: FeatureStatus.COMING_SOON,
    category: 'vr',
    enabledInEnv: {
      development: false,
      staging: false,
      production: false,
    },
    notes: 'AR.js integration planned for next quarter.',
  },

  // SEARCH FEATURES
  visual_search: {
    id: 'visual_search',
    name: 'Visual Search',
    description: 'AI-powered image-based destination search',
    status: FeatureStatus.BETA,
    category: 'search',
    enabledInEnv: {
      development: true,
      staging: true,
      production: true,
    },
    notes: 'Basic image similarity. Real vision model integration underway.',
  },
  multi_modal_search: {
    id: 'multi_modal_search',
    name: 'Multi-Modal Search',
    description: 'Search combining text, images, and voice',
    status: FeatureStatus.DEMO,
    category: 'search',
    enabledInEnv: {
      development: true,
      staging: false,
      production: false,
    },
    notes: 'Simulated. Real integration with speech-to-text API needed.',
  },

  // CORE FEATURES (PRODUCTION)
  booking_system: {
    id: 'booking_system',
    name: 'Booking System',
    description: 'Core travel booking functionality',
    status: FeatureStatus.PRODUCTION,
    category: 'core',
    enabledInEnv: {
      development: true,
      staging: true,
      production: true,
    },
  },
  user_authentication: {
    id: 'user_authentication',
    name: 'User Authentication',
    description: 'User login and registration',
    status: FeatureStatus.PRODUCTION,
    category: 'core',
    enabledInEnv: {
      development: true,
      staging: true,
      production: true,
    },
  },
  payment_processing: {
    id: 'payment_processing',
    name: 'Payment Processing',
    description: 'Stripe and standard payment methods',
    status: FeatureStatus.PRODUCTION,
    category: 'core',
    enabledInEnv: {
      development: true,
      staging: true,
      production: true,
    },
  },
};

/**
 * Get feature status
 */
export function getFeatureStatus(featureId: string): Feature | undefined {
  return FEATURE_REGISTRY[featureId];
}

/**
 * Check if a feature is enabled in current environment
 */
export function isFeatureEnabled(
  featureId: string,
  env: 'development' | 'staging' | 'production' = process.env.NODE_ENV as any
): boolean {
  const feature = FEATURE_REGISTRY[featureId];
  if (!feature) return false;
  return feature.enabledInEnv[env];
}

/**
 * Check if a feature is in production status
 */
export function isFeatureProduction(featureId: string): boolean {
  const feature = FEATURE_REGISTRY[featureId];
  return feature?.status === FeatureStatus.PRODUCTION;
}

/**
 * Check if a feature is in demo/beta status
 */
export function isFeatureDemoOrBeta(featureId: string): boolean {
  const feature = FEATURE_REGISTRY[featureId];
  return (
    feature?.status === FeatureStatus.DEMO ||
    feature?.status === FeatureStatus.BETA
  );
}

/**
 * Get all features by status
 */
export function getFeaturesByStatus(status: FeatureStatus): Feature[] {
  return Object.values(FEATURE_REGISTRY).filter((f) => f.status === status);
}

/**
 * Get all features by category
 */
export function getFeaturesByCategory(category: Feature['category']): Feature[] {
  return Object.values(FEATURE_REGISTRY).filter((f) => f.category === category);
}

/**
 * Get feature summary statistics
 */
export function getFeatureSummary() {
  const features = Object.values(FEATURE_REGISTRY);
  return {
    total: features.length,
    production: features.filter((f) => f.status === FeatureStatus.PRODUCTION).length,
    beta: features.filter((f) => f.status === FeatureStatus.BETA).length,
    demo: features.filter((f) => f.status === FeatureStatus.DEMO).length,
    comingSoon: features.filter((f) => f.status === FeatureStatus.COMING_SOON).length,
    byCategory: {
      blockchain: features.filter((f) => f.category === 'blockchain').length,
      ai: features.filter((f) => f.category === 'ai').length,
      vr: features.filter((f) => f.category === 'vr').length,
      search: features.filter((f) => f.category === 'search').length,
      payments: features.filter((f) => f.category === 'payments').length,
      core: features.filter((f) => f.category === 'core').length,
    },
  };
}
