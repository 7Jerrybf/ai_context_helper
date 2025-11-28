import { DEFAULT_CONFIG } from './types';
import type { AIProviderConfig } from './types';

export class StorageService {
    private static STORAGE_KEY = 'ai_context_helper_settings';

    static async getSettings(): Promise<AIProviderConfig> {
        return new Promise((resolve) => {
            if (typeof chrome === 'undefined' || !chrome.storage) {
                // Fallback for local development/testing outside extension environment
                const localData = localStorage.getItem(this.STORAGE_KEY);
                resolve(localData ? JSON.parse(localData) : DEFAULT_CONFIG);
                return;
            }

            chrome.storage.local.get([this.STORAGE_KEY], (result) => {
                if (result[this.STORAGE_KEY]) {
                    resolve({ ...DEFAULT_CONFIG, ...(result[this.STORAGE_KEY] as AIProviderConfig) });
                } else {
                    resolve(DEFAULT_CONFIG);
                }
            });
        });
    }

    static async saveSettings(settings: AIProviderConfig): Promise<void> {
        return new Promise((resolve) => {
            if (typeof chrome === 'undefined' || !chrome.storage) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
                resolve();
                return;
            }

            chrome.storage.local.set({ [this.STORAGE_KEY]: settings }, () => {
                resolve();
            });
        });
    }
}
