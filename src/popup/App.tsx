import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/StorageService';
import { DEFAULT_CONFIG } from '../services/types';
import type { AIProviderConfig } from '../services/types';

const App: React.FC = () => {
  const [config, setConfig] = useState<AIProviderConfig>(DEFAULT_CONFIG);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    StorageService.getSettings().then(setConfig);
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    await StorageService.saveSettings(config);
    setStatus('Saved!');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleChange = (field: keyof AIProviderConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const openOptionsPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };

  return (
    <div className="w-[350px] bg-gray-50 min-h-[400px] font-sans p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5.523 4.477-10 10-10z"></path><path d="M8 14s1.5 2 4 2 2.5-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </div>
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
            AI Context Helper
          </h1>
        </div>
        <button
          onClick={openOptionsPage}
          className="text-gray-400 hover:text-indigo-500 transition-colors"
          title="Open Full Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">

        {/* Provider */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Provider</label>
          <select
            value={config.provider}
            onChange={(e) => handleChange('provider', e.target.value as any)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
          >
            <option value="openai">OpenAI Compatible</option>
          </select>
        </div>

        {/* Base URL */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Base URL</label>
          <input
            type="text"
            value={config.baseUrl}
            onChange={(e) => handleChange('baseUrl', e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 placeholder-gray-400"
          />
        </div>

        {/* API Key */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">API Key</label>
          <input
            type="password"
            value={config.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 placeholder-gray-400"
          />
        </div>

        {/* Model Name */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Model Name</label>
          <input
            type="text"
            value={config.model}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="gpt-3.5-turbo"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 placeholder-gray-400"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
        >
          Save Settings
        </button>

        {status && (
          <div className={`text-center text-xs font-medium ${status.includes('Saved') ? 'text-green-600' : 'text-indigo-600'} animate-pulse`}>
            {status}
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] text-gray-400">
          Select text on any page to use
        </p>
      </div>
    </div>
  );
};

export default App;
