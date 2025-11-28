import React, { useEffect, useState, useRef } from 'react';
import { FloatingButton } from './FloatingButton';
import { ResultPopup } from './ResultPopup';

export const ContentApp: React.FC = () => {
    const [selection, setSelection] = useState<string>('');
    const [buttonPos, setButtonPos] = useState<{ x: number; y: number } | null>(null);
    const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleSelection = () => {
            // Small delay to ensure selection is complete and to avoid double-clicks triggering immediately
            setTimeout(() => {
                const sel = window.getSelection();
                const text = sel?.toString().trim();

                if (text && text.length > 0) {
                    if (showPopup) return; // Don't move button if popup is open

                    const range = sel!.getRangeAt(0);
                    const rect = range.getBoundingClientRect();

                    setSelection(text);
                    setButtonPos({
                        x: rect.left + rect.width / 2 + window.scrollX,
                        y: rect.top + window.scrollY
                    });
                } else {
                    // Only clear if popup is not open
                    if (!showPopup) {
                        setSelection('');
                        setButtonPos(null);
                    }
                }
            }, 10);
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('keyup', handleSelection); // Handle keyboard selection

        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('keyup', handleSelection);
        };
    }, [showPopup]);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            // If clicking inside our shadow root (handled by React) -> ignore
            // But this listener is on document, so it catches clicks outside the shadow root.
            if (showPopup) {
                setShowPopup(false);
                setSelection('');
                setButtonPos(null);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showPopup]);


    const handleAskAI = async () => {
        if (!buttonPos) return;

        setPopupPos(buttonPos);
        setButtonPos(null); // Hide button
        setShowPopup(true);
        setIsLoading(true);
        setError(undefined);
        setResponse('');

        try {
            // Send message to background script
            const res = await chrome.runtime.sendMessage({
                type: 'GENERATE_COMPLETION',
                prompt: selection
            });

            if (res.error) {
                setError(res.error);
            } else {
                setResponse(res.text);
            }
        } catch (err) {
            setError('Failed to communicate with background service.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShowPopup(false);
        setSelection('');
        setButtonPos(null);
    };

    return (
        <div ref={containerRef} className="ai-context-helper-root">
            {buttonPos && !showPopup && (
                <FloatingButton position={buttonPos} onClick={handleAskAI} />
            )}

            {showPopup && popupPos && (
                <ResultPopup
                    position={popupPos}
                    selection={selection}
                    response={response}
                    isLoading={isLoading}
                    error={error}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};
