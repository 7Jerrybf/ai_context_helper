import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/StorageService';
import { DEFAULT_CONFIG } from '../services/types';
import type { AIProviderConfig } from '../services/types';

const Options: React.FC = () => {
    const [config, setConfig] = useState<AIProviderConfig>(DEFAULT_CONFIG);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        StorageService.getSettings().then(setConfig);
    }, []);

    const handleSave = async () => {
        setStatus('Saving...');
        await StorageService.saveSettings(config);
        setStatus('Settings saved successfully!');
        setTimeout(() => setStatus(''), 2000);
    };

    const handleChange = (field: keyof AIProviderConfig, value: string) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8">

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5.523 4.477-10 10-10z"></path><path d="M8 14s1.5 2 4 2 2.5-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                        AI Context Helper
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Configure your AI provider settings
                    </p>
                </div>

                {/* Settings Card */}
                <div className="bg-white py-8 px-10 shadow-2xl shadow-indigo-500/10 rounded-3xl border border-gray-100 relative overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    <div className="space-y-6">

                        {/* Provider */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Provider</label>
                            <div className="relative">
                                <select
                                    value={config.provider}
                                    onChange={(e) => handleChange('provider', e.target.value as any)}
                                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl bg-gray-50 transition-all duration-200 hover:bg-white hover:shadow-sm"
                                >
                                    <option value="openai">OpenAI Compatible</option>
                                </select>
                            </div>
                        </div>

                        {/* Base URL */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Base URL</label>
                            <input
                                type="text"
                                value={config.baseUrl}
                                onChange={(e) => handleChange('baseUrl', e.target.value)}
                                placeholder="https://api.openai.com/v1"
                                className="appearance-none block w-full px-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition-all duration-200 hover:bg-white hover:shadow-sm"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                For Gemini: <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-600">.../v1beta/openai/</code>
                            </p>
                        </div>

                        {/* API Key */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">API Key</label>
                            <input
                                type="password"
                                value={config.apiKey}
                                onChange={(e) => handleChange('apiKey', e.target.value)}
                                placeholder="sk-..."
                                className="appearance-none block w-full px-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition-all duration-200 hover:bg-white hover:shadow-sm"
                            />
                        </div>

                        {/* Model Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Model Name</label>
                            <input
                                type="text"
                                value={config.model}
                                onChange={(e) => handleChange('model', e.target.value)}
                                placeholder="gpt-3.5-turbo"
                                className="appearance-none block w-full px-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition-all duration-200 hover:bg-white hover:shadow-sm"
                            />
                        </div>

                        {/* System Prompt */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">System Prompt</label>
                            <textarea
                                value={config.systemPrompt}
                                onChange={(e) => handleChange('systemPrompt', e.target.value)}
                                rows={3}
                                className="appearance-none block w-full px-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition-all duration-200 hover:bg-white hover:shadow-sm resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleSave}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                Save Configuration
                            </button>
                        </div>

                        {status && (
                            <div className={`mt-2 text-center text-sm font-medium ${status.includes('Saved') ? 'text-green-600' : 'text-indigo-600'} animate-pulse`}>
                                {status}
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center text-xs text-gray-400">
                    <p>Designed for AI Context Helper</p>
                </div>
            </div>
        </div>
    );
};

export default Options;
