import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResultPopupProps {
    position: { x: number; y: number };
    selection: string;
    response: string;
    isLoading: boolean;
    error?: string;
    onClose: () => void;
}

export const ResultPopup: React.FC<ResultPopupProps> = ({ position, selection, response, isLoading, error, onClose }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                zIndex: 2147483647,
                transform: 'translate(0, 10px)',
            }}
            // Gradient Border Wrapper
            className="p-[1.5px] rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/20 animate-in fade-in zoom-in-95 duration-300"
        >
            {/* Main Content Bubble */}
            <div className="w-[380px] bg-white rounded-[22px] overflow-hidden flex flex-col font-sans relative">

                {/* Header Actions (Absolute) */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 pt-8 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">

                    {/* AI Identity / Loading State */}
                    <div className="flex items-center space-x-2.5 mb-5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5.523 4.477-10 10-10z"></path><path d="M8 14s1.5 2 4 2 2.5-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 uppercase tracking-widest">
                                AI Analysis
                            </span>
                            {isLoading && (
                                <span className="text-[10px] font-medium text-gray-400 animate-pulse">Processing...</span>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-3 pl-1">
                            <div className="h-2 bg-gray-100 rounded-full w-3/4 animate-pulse"></div>
                            <div className="h-2 bg-gray-100 rounded-full w-full animate-pulse delay-75"></div>
                            <div className="h-2 bg-gray-100 rounded-full w-5/6 animate-pulse delay-150"></div>
                            <div className="h-2 bg-gray-100 rounded-full w-4/5 animate-pulse delay-200"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-sm bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            <span>{error}</span>
                        </div>
                    ) : (
                        <div className="prose prose-sm prose-slate max-w-none text-gray-600 leading-7">
                            <ReactMarkdown>{response}</ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Context Footer (Subtle) */}
                {selection && (
                    <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                            <span className="font-bold uppercase tracking-wider text-indigo-400">Context</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="truncate italic max-w-[250px]">"{selection}"</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
