import { TldrawUiIcon } from 'tldraw'
import { ContractAddressButton } from './ContractAddressButton'
import appConfig from '../../src/config/appConfig'

export function SocialButtons() {
    return (
        <div className="social-buttons">
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
                href={appConfig.socialLinks.gitbook}
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button"
                title="Visit GitBook"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.801 0C7.167 0 4.236 2.931 4.236 6.566c0 2.342 1.194 3.894 2.445 5.272 1.227 1.354 2.58 2.844 2.58 4.275 0 .666-.666 1.332-1.332 1.332-.666 0-1.332-.666-1.332-1.332 0-2.274-1.332-3.546-2.58-4.92-1.227-1.354-2.58-2.844-2.58-4.275C1.237 2.931 4.168 0 7.803 0c3.635 0 6.566 2.931 6.566 6.566 0 1.43-1.353 2.921-2.58 4.275-1.248 1.374-2.58 2.646-2.58 4.92 0 .666-.666 1.332-1.332 1.332-.666 0-1.332-.666-1.332-1.332 0-1.43 1.353-2.921 2.58-4.275 1.251-1.378 2.445-2.93 2.445-5.272C17.367 2.931 14.436 0 10.801 0z"/>
                </svg>
            </a>
            <ContractAddressButton />
        </div>
    )
} 