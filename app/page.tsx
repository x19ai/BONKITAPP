'use client'

import dynamic from 'next/dynamic'
import 'tldraw/tldraw.css'
import { RiskyButCoolAPIKeyInput } from './components/RiskyButCoolAPIKeyInput'
import { SettingsButton } from './components/SettingsButton'
import { SocialButtons } from './components/SocialButtons'
import { ContractAddressButton } from './components/ContractAddressButton'
import { PreviewShapeUtil } from './PreviewShape/PreviewShape'
import { useState, useCallback, useEffect } from 'react'
import appConfig from '../src/config/appConfig'
import { BonkItButton } from './components/BonkItButton'

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, {
	ssr: false,
})

const shapeUtils = [PreviewShapeUtil]

// Initialize hidden input for API key
const initializeApiKeyInput = () => {
	const existingInput = document.getElementById('googleai_key_risky_but_cool')
	if (existingInput) return

	const input = document.createElement('input')
	input.type = 'hidden'
	input.id = 'googleai_key_risky_but_cool'
	const savedKey = localStorage.getItem('bonkit_key') || process.env.NEXT_PUBLIC_GOOGLEAI_API_KEY || ''
	input.value = savedKey
	document.body.appendChild(input)
}

export default function App() {
	const [showApiKey, setShowApiKey] = useState(false)

	// Initialize API key input on mount
	useEffect(() => {
		initializeApiKeyInput()
	}, [])

	const handleShowSettings = useCallback(() => {
		setShowApiKey(true)
	}, [])

	const handleCloseSettings = useCallback(() => {
		setShowApiKey(false)
	}, [])

	const components = {
		SharePanel: () => (
			<div className="buttons-container">
				<div className="social-buttons">
					<ContractAddressButton />
					<a 
						href={appConfig.socialLinks.xTwitter}
						target="_blank" 
						rel="noopener noreferrer"
						className="social-button"
						title="Follow us on Twitter"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
					<a 
						href={appConfig.socialLinks.github}
						target="_blank" 
						rel="noopener noreferrer"
						className="social-button"
						title="Visit GitHub"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
						</svg>
					</a>
					<a 
						href={appConfig.socialLinks.gitbook || 'https://x19ai.gitbook.io/bonkit/'}
						target="_blank" 
						rel="noopener noreferrer"
						className="social-button"
						title="Read our GitBook"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-label="GitBook">
							<path d="M10.802 17.77a.703.703 0 1 1-.002 1.406.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862 2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174"/>
						</svg>
					</a>
				</div>
				<div className="action-buttons">
					<SettingsButton onShowSettings={handleShowSettings} />
					<BonkItButton />
				</div>
			</div>
		),
	}

	return (
		<div className="editor">
			<Tldraw persistenceKey="bonk-it" components={components} shapeUtils={shapeUtils}>
				<RiskyButCoolAPIKeyInput 
					isVisible={showApiKey} 
					onClose={handleCloseSettings}
				/>
			</Tldraw>
			<style jsx global>{`
				.gitbook-logo {
					filter: none;
					fill: #111;
					transition: filter 0.2s;
				}
				@media (prefers-color-scheme: dark) {
					.gitbook-logo {
						filter: invert(1) brightness(2);
					}
				}
			`}</style>
		</div>
	)
}
