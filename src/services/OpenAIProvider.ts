import type { AIProvider, AIProviderConfig, AIResponse } from './types';

export class OpenAIProvider implements AIProvider {
    async generateCompletion(prompt: string, config: AIProviderConfig): Promise<AIResponse> {
        try {
            let baseUrl = config.baseUrl || 'https://api.openai.com/v1';
            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, -1);
            }

            // If the user provided the full URL ending in /chat/completions, use it as is.
            // Otherwise, append /chat/completions.
            const endpoint = baseUrl.endsWith('/chat/completions')
                ? baseUrl
                : `${baseUrl}/chat/completions`;

            console.log('AI Context Helper: Using Endpoint:', endpoint);
            console.log('AI Context Helper: Using Model:', config.model);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [
                        { role: 'system', content: config.systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `API Error (${response.status}): ${response.statusText}`;

                try {
                    const errorData = JSON.parse(errorText);
                    if (errorData.error?.message) {
                        errorMessage = `API Error: ${errorData.error.message}`;
                    }
                } catch (e) {
                    // Response was not JSON, use text or status
                    if (errorText) errorMessage = `API Error (${response.status}): ${errorText.substring(0, 100)}`;
                }

                console.error('AI Context Helper API Error:', { status: response.status, statusText: response.statusText, body: errorText });
                throw new Error(errorMessage);
            }

            const data = await response.json();
            return {
                text: data.choices[0]?.message?.content || 'No response generated.'
            };
        } catch (error) {
            console.error('AI Context Helper Provider Error:', error);
            return {
                text: '',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    async validateConfig(config: AIProviderConfig): Promise<boolean> {
        if (!config.apiKey) return false;
        // Simple validation call
        try {
            const result = await this.generateCompletion('test', { ...config, model: config.model || 'gpt-3.5-turbo' });
            return !result.error;
        } catch {
            return false;
        }
    }
}
