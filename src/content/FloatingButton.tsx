import React from 'react';

interface FloatingButtonProps {
    position: { x: number; y: number };
    onClick: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ position, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                zIndex: 2147483647, // Max z-index
                transform: 'translate(-50%, -120%)',
            }}
            className="group flex items-center justify-center p-0.5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 ease-out cursor-pointer border-0 outline-none"
        >
            <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full relative overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span className="ml-2 text-sm font-bold text-white tracking-wide relative z-10" style={{ color: '#ffffff' }}>
                    Ask AI
                </span>
            </div>
        </button>
    );
};
