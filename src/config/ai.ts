export const AI_CONFIG = {
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  baseUrl: 'https://api.deepseek.com/v1',
  defaultParams: {
    temperature: 0.7,
    max_tokens: 1000,
  }
};

// Validate API key is present
if (!AI_CONFIG.apiKey) {
  console.warn('DeepSeek API key is not configured. AI features will be disabled.');
}

export const isAIEnabled = Boolean(AI_CONFIG.apiKey);