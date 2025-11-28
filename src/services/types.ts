export interface AIProviderConfig {
    provider: 'openai' | 'custom';
    apiKey: string;
    baseUrl?: string;
    model: string;
    systemPrompt?: string;
}

export interface AIResponse {
    text: string;
    error?: string;
}

export interface AIProvider {
    generateCompletion(prompt: string, config: AIProviderConfig): Promise<AIResponse>;
    validateConfig(config: AIProviderConfig): Promise<boolean>;
}

export const DEFAULT_CONFIG: AIProviderConfig = {
    provider: 'openai',
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
    systemPrompt: 'You are a helpful assistant. Explain the selected text clearly and concisely.'
};
