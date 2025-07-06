import { TldrawUiIcon, useBreakpoint } from 'tldraw'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

interface RiskyButCoolAPIKeyInputProps {
	isVisible: boolean;
	onClose: () => void;
}

// Create a hidden input to always maintain the API key value
const createHiddenInput = () => {
	const existingInput = document.getElementById('googleai_key_risky_but_cool')
	if (existingInput) return

	const input = document.createElement('input')
	input.type = 'hidden'
	input.id = 'googleai_key_risky_but_cool'
	input.value = process.env.NEXT_PUBLIC_GOOGLEAI_API_KEY ?? localStorage.getItem('bonkit_key') ?? ''
	document.body.appendChild(input)
}

// Ensure the hidden input exists when the module loads
if (typeof window !== 'undefined') {
	createHiddenInput()
}

export function RiskyButCoolAPIKeyInput({ isVisible, onClose }: RiskyButCoolAPIKeyInputProps) {
	const breakpoint = useBreakpoint()
	const containerRef = useRef<HTMLDivElement>(null)
	const visibleInputRef = useRef<HTMLInputElement>(null)
	const [apiType, setApiType] = useState<'openai' | 'google' | null>(null)

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		localStorage.setItem('bonkit_key', value)
		// Update hidden input
		const hiddenInput = document.getElementById('googleai_key_risky_but_cool') as HTMLInputElement
		if (hiddenInput) {
			hiddenInput.value = value
		}
		// Detect API type
		if (value.startsWith('sk-')) {
			setApiType('openai')
		} else if (value.startsWith('AIza')) {
			setApiType('google')
		} else {
			setApiType(null)
		}
	}, [])

	// Sync visible input with hidden input when shown
	useEffect(() => {
		if (isVisible && visibleInputRef.current) {
			const hiddenInput = document.getElementById('googleai_key_risky_but_cool') as HTMLInputElement
			if (hiddenInput) {
				visibleInputRef.current.value = hiddenInput.value
				// Detect API type for initial value
				if (hiddenInput.value.startsWith('sk-')) {
					setApiType('openai')
				} else if (hiddenInput.value.startsWith('AIza')) {
					setApiType('google')
				}
			}
		}
	}, [isVisible])

	const handleQuestionMessage = useCallback(() => {
		window.alert(
			`If you have a Google AI Studio API key, you can put it in this input and it will be used when posting to Google AI Studio.\n\nSee https://makersuite.google.com/app/apikey to get a key.\n\nPutting API keys into boxes is generally a bad idea! If you have any concerns, create an API key and then revoke it after using this site.`
		)
	}, [])

	// Handle click outside to hide the input
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		if (isVisible) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isVisible, onClose])

	if (!isVisible) return null

	return (
		<div 
			ref={containerRef}
			className={`your-own-api-key ${breakpoint < 5 ? 'your-own-api-key__mobile' : ''}`}
		>
			<div className="your-own-api-key__inner">
				<div className="input__wrapper">
					<input
						ref={visibleInputRef}
						type="password"
						defaultValue={
							process.env.NEXT_PUBLIC_GOOGLEAI_API_KEY ?? localStorage.getItem('bonkit_key') ?? ''
						}
						onChange={handleChange}
						spellCheck={false}
						autoCapitalize="off"
						placeholder=" "
						aria-label="API Key"
					/>
				</div>
				{apiType ? (
					<div className={`api-type-indicator ${apiType}`}>
						{apiType === 'openai' ? (
							<>
								<img src="/openai.svg" alt="OpenAI logo" width={18} height={18} style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'invert(62%) sepia(94%) saturate(484%) hue-rotate(116deg) brightness(92%) contrast(91%)' }} />
								<span style={{ marginLeft: 6 }}>OpenAI</span>
							</>
						) : (
							<>
								<img src="/googleai.svg" alt="Google AI logo" width={18} height={18} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
								<span style={{ marginLeft: 6 }}>Google AI</span>
							</>
						)}
					</div>
				) : (
					<a
						className="question__button"
						href="https://bonklabs.gitbook.io/bonkit/quick-start"
						target="_blank"
						rel="noopener noreferrer"
					>
						<TldrawUiIcon icon="question" />
					</a>
				)}
			</div>
			<style jsx>{`
				.api-type-indicator {
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 4px 8px;
					border-radius: 4px;
					font-size: 12px;
					font-weight: 500;
					transition: all 0.2s ease;
					margin-left: 12px;
				}
				.api-type-indicator.openai {
					background-color: rgba(16, 163, 127, 0.1);
					color: #10A37F;
				}
				.api-type-indicator.google {
					background-color: rgba(66, 133, 244, 0.1);
					color: #4285F4;
				}
				.api-type-indicator svg {
					flex-shrink: 0;
				}
				@media (prefers-color-scheme: dark) {
					.api-type-indicator.openai {
						background-color: rgba(16, 163, 127, 0.2);
						color: #10A37F;
					}
					.api-type-indicator.google {
						background-color: rgba(66, 133, 244, 0.2);
						color: #4285F4;
					}
				}
			`}</style>
		</div>
	)
}
