/**
 * AI Model Obfuscation Layer
 * Security: Hide actual model names and providers from client-side code
 * All AI provider info encrypted and mapped to neutral codes
 */

// Internal model codes (visible in frontend)
export type InternalModelCode =
  | 'alpha-v3'    // Primary reasoning model
  | 'beta-v1'     // Fast inference model
  | 'gamma-v2'    // Hybrid model
  | 'delta-v2'    // Lightweight model
  | 'epsilon-v1'  // Embedding model
  | 'zeta-v3';    // Vision model

// Actual model mapping (server-side only, never expose to client)
const MODEL_MAPPING: Record<InternalModelCode, string> = {
  // Groq models (obfuscated)
  'alpha-v3': process.env.AI_PRIMARY_MODEL || 'llama-3.3-70b-versatile',
  'beta-v1': process.env.AI_FAST_MODEL || 'llama-3.1-8b-instant',
  'gamma-v2': process.env.AI_HYBRID_MODEL || 'mixtral-8x7b-32768',
  'delta-v2': process.env.AI_LITE_MODEL || 'gemma2-9b-it',

  // OpenAI models (obfuscated)
  'epsilon-v1': process.env.AI_EMBED_MODEL || 'text-embedding-3-small',
  'zeta-v3': process.env.AI_VISION_MODEL || 'gpt-4-vision-preview',
};

// Provider mapping (obfuscated)
const PROVIDER_MAPPING: Record<string, string> = {
  'neural-x': process.env.PRIMARY_AI_PROVIDER || 'groq',
  'cognito-ai': process.env.SECONDARY_AI_PROVIDER || 'openai',
  'tensor-net': process.env.TERTIARY_AI_PROVIDER || 'anthropic',
};

/**
 * Get actual model name from internal code
 * @param code Internal model code
 * @returns Actual model name
 */
export function getActualModelName(code: InternalModelCode): string {
  return MODEL_MAPPING[code];
}

/**
 * Get actual provider from obfuscated name
 * @param obfuscatedName Obfuscated provider name
 * @returns Actual provider
 */
export function getActualProvider(obfuscatedName: string): string {
  return PROVIDER_MAPPING[obfuscatedName] || 'groq';
}

/**
 * Get model metadata (safe for logging, excludes sensitive info)
 * @param code Internal model code
 */
export function getModelMetadata(code: InternalModelCode) {
  return {
    code,
    tier: code.includes('alpha') ? 'premium' :
          code.includes('beta') ? 'standard' :
          code.includes('gamma') ? 'hybrid' :
          'lite',
    type: code.includes('epsilon') ? 'embedding' :
          code.includes('zeta') ? 'vision' :
          'text-generation',
  };
}

/**
 * Obfuscate API keys in logs
 * @param apiKey API key to obfuscate
 */
export function obfuscateApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length < 8) return '***';

  const first3 = apiKey.substring(0, 3);
  const last3 = apiKey.substring(apiKey.length - 3);

  return `${first3}${'*'.repeat(apiKey.length - 6)}${last3}`;
}

/**
 * Sanitize AI request for logging (remove sensitive data)
 */
export function sanitizeAIRequest(request: any) {
  return {
    ...request,
    apiKey: obfuscateApiKey(request.apiKey || ''),
    messages: request.messages?.map((m: any) => ({
      role: m.role,
      contentLength: m.content?.length || 0,
    })),
  };
}

// Export obfuscated names for use in logs/analytics
export const OBFUSCATED_PROVIDERS = {
  PRIMARY: 'neural-x',
  SECONDARY: 'cognito-ai',
  TERTIARY: 'tensor-net',
} as const;

export const OBFUSCATED_MODELS = {
  PRIMARY: 'alpha-v3',
  FAST: 'beta-v1',
  HYBRID: 'gamma-v2',
  LITE: 'delta-v2',
  EMBEDDING: 'epsilon-v1',
  VISION: 'zeta-v3',
} as const;
