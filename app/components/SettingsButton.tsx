import { TldrawUiIcon } from 'tldraw'

interface SettingsButtonProps {
    onShowSettings: () => void;
}

export function SettingsButton({ onShowSettings }: SettingsButtonProps) {
    return (
        <button 
            className="settingsButton" 
            onClick={onShowSettings}
            title="API Key Settings"
        >
            <TldrawUiIcon icon="code" />
        </button>
    )
} 