import { useEditor, useToasts } from 'tldraw'
import { useCallback } from 'react'
import { bonkIt } from '../lib/bonkIt'

export function BonkItButton() {
	const editor = useEditor()
	const { addToast } = useToasts()

	const handleClick = useCallback(async () => {
		try {
			// Try to get API key from hidden input first
			const hiddenInput = document.getElementById('googleai_key_risky_but_cool') as HTMLInputElement
			let apiKey = hiddenInput?.value

			// If no key in hidden input, try localStorage
			if (!apiKey) {
				apiKey = localStorage.getItem('bonkit_key') || ''
			}

			// If still no key, try environment variable
			if (!apiKey) {
				apiKey = process.env.NEXT_PUBLIC_GOOGLEAI_API_KEY || ''
			}

			if (!apiKey) {
				throw new Error('Please add your API Key in the settings!')
			}
			await bonkIt(editor)
		} catch (e) {
			console.error(e)
			addToast({
				icon: 'info-circle',
				title: 'Something went wrong',
				description: (e as Error).message.slice(0, 100),
			})
		}
	}, [editor, addToast])

	return (
		<button className="bonkItButton" onClick={handleClick}>
			<img src="/favicon.svg" alt="Bonk It" width={20} height={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
			BONK IT
		</button>
	)
}
