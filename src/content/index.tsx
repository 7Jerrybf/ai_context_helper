import { createRoot } from 'react-dom/client';
import { ContentApp } from './ContentApp';
import '../index.css'; // Import global styles to inject into shadow DOM

const container = document.createElement('div');
container.id = 'ai-context-helper-container';
document.body.appendChild(container);

const shadowRoot = container.attachShadow({ mode: 'open' });
const rootElement = document.createElement('div');
shadowRoot.appendChild(rootElement);

// Inject styles into Shadow DOM
// Hardcoded CSS path because ?url import is unreliable in IIFE build
const cssUrl = 'ai_context_helper.css';

const link = document.createElement('link');
link.rel = 'stylesheet';
// Add timestamp to force reload CSS
link.href = chrome.runtime.getURL(cssUrl) + '?v=' + new Date().getTime();
shadowRoot.appendChild(link);

// Also inject Tailwind base styles if possible, or just rely on our own scoped styles.
// For this MVP, we'll assume the imported CSS (via link) covers it.

createRoot(rootElement).render(<ContentApp />);

console.log('AI Context Helper: Content script mounted.');

