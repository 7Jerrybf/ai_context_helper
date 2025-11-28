import { StorageService } from '../services/StorageService';
import { OpenAIProvider } from '../services/OpenAIProvider';

console.log('AI Context Helper: Background service worker started');

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GENERATE_COMPLETION') {
        handleGenerateCompletion(message.prompt, sendResponse);
        return true; // Indicates we will respond asynchronously
    }
});

async function handleGenerateCompletion(prompt: string, sendResponse: (response: any) => void) {
    try {
        const config = await StorageService.getSettings();

        if (!config.apiKey) {
            sendResponse({ error: 'API Key not configured. Please go to extension options.' });
            return;
        }

        const provider = new OpenAIProvider();
        const response = await provider.generateCompletion(prompt, config);

        sendResponse(response);
    } catch (error) {
        console.error('Error generating completion:', error);
        sendResponse({ error: 'Internal error occurred.' });
    }
}

// Optional: Context Menu integration
chrome.runtime.onInstalled.addListener((details) => {
    chrome.contextMenus.create({
        id: 'ask-ai-context',
        title: 'Ask AI about "%s"',
        contexts: ['selection']
    });

    if (details.reason === 'install') {
        chrome.runtime.openOptionsPage();
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'ask-ai-context' && info.selectionText && tab?.id) {
        // We can't easily open the popup from here, but we could send a message to the content script
        // to simulate the FAB click or open the popup directly.
        // For now, let's just log it.
        console.log('Context menu clicked for:', info.selectionText);

        // Send message to content script to open popup
        chrome.tabs.sendMessage(tab.id, {
            type: 'OPEN_POPUP',
            selection: info.selectionText
        });
    }
});

