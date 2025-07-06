import { useState, useEffect } from 'react';

interface APIKeyInputProps {
    onKeyChange: (key: string, type: 'openai' | 'google') => void;
    initialKey?: string;
}

export function APIKeyInput({ onKeyChange, initialKey = '' }: APIKeyInputProps) {
    const [apiKey, setApiKey] = useState(initialKey);
    const [apiType, setApiType] = useState<'openai' | 'google' | null>(null);

    useEffect(() => {
        if (apiKey) {
            // Detect API key type
            if (apiKey.startsWith('sk-')) {
                setApiType('openai');
                onKeyChange(apiKey, 'openai');
            } else if (apiKey.startsWith('AIza')) {
                setApiType('google');
                onKeyChange(apiKey, 'google');
            } else {
                setApiType(null);
            }
        } else {
            setApiType(null);
        }
    }, [apiKey, onKeyChange]);

    return (
        <div className="api-key-input">
            <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key (OpenAI or Google)"
                className="api-key-field"
            />
            {apiType && (
                <div className="api-type-indicator">
                    {apiType === 'openai' ? 'OpenAI' : 'Google AI'}
                </div>
            )}
        </div>
    );
} 