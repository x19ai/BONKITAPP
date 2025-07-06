import { Editor, createShapeId } from 'tldraw'
import { getHtmlFromOpenAI } from './getHtmlFromOpenAI'
import { getHtmlFromGoogleAI } from './getHtmlFromGoogleAI'
import { blobToBase64 } from './blobToBase64'
import { getTextFromSelectedShapes } from './getSelectionAsText'
import { PreviewShape } from '../PreviewShape/PreviewShape'

export async function bonkIt(editor: Editor) {
	const selectedShapes = editor.getSelectedShapes()
	if (selectedShapes.length === 0) throw Error('First select something to bonk it.')

	// Get a screenshot of the selected shapes
	const maxSize = 1000
	const bounds = editor.getSelectionPageBounds()
	if (!bounds) throw Error('Could not get bounds of selection.')
	const scale = Math.min(1, maxSize / bounds.width, maxSize / bounds.height)
	const { blob } = await editor.toImage(selectedShapes, {
		scale: scale,
		background: true,
		format: 'jpeg',
	})
	const dataUrl = await blobToBase64(blob!)

	// Get any previous previews among the selected shapes
	const previousPreviews = selectedShapes.filter(
		(shape) => shape.type === 'response'
	) as PreviewShape[]

	// Create the preview shape
	const previewShapeId = createShapeId()
	editor.createShape({
		id: previewShapeId,
		type: 'response',
		x: bounds.maxX + 60,
		y: bounds.midY - (540 * 2) / 3 / 2,
		props: {
			html: '',
			w: (960 * 2) / 3,
			h: (540 * 2) / 3,
		},
	})

	try {
		// Get the API key from localStorage or environment variable
		const apiKey = localStorage.getItem('bonkit_key') || process.env.NEXT_PUBLIC_API_KEY
		if (!apiKey) {
			throw new Error('No API key found. Please add your API key.')
		}

		// Determine which API to use based on the key format
		let json: any
		if (apiKey.startsWith('sk-')) {
			json = await getHtmlFromOpenAI({
				image: dataUrl,
				apiKey,
				text: getTextFromSelectedShapes(editor),
				theme: editor.user.getUserPreferences().isDarkMode ? 'dark' : 'light',
				previousPreviews,
			})
		} else if (apiKey.startsWith('AIza')) {
			json = await getHtmlFromGoogleAI({
				image: dataUrl,
				apiKey,
				text: getTextFromSelectedShapes(editor),
				theme: editor.user.getUserPreferences().isDarkMode ? 'dark' : 'light',
				previousPreviews,
			})
		} else {
			throw new Error('Invalid API key format. Please use either OpenAI or Google API key.')
		}

		if (!json) throw Error('Could not contact the AI service.')
		if (json?.error) throw Error(`${json.error.message?.slice(0, 128)}...`)

		// Extract the HTML from the response
		let html: string
		if (apiKey.startsWith('sk-')) {
			const message = json.choices[0].message.content
			const start = message.indexOf('<!DOCTYPE html>')
			const end = message.indexOf('</html>')
			html = message.slice(start, end + '</html>'.length)
		} else {
			const message = json.candidates[0].content.parts[0].text
			const start = message.indexOf('<!DOCTYPE html>')
			const end = message.indexOf('</html>')
			html = message.slice(start, end + '</html>'.length)
		}

		// No HTML? Something went wrong
		if (html.length < 100) {
			console.warn(apiKey.startsWith('sk-') ? json.choices[0].message.content : json.candidates[0].content.parts[0].text)
			throw Error('Could not generate a design from those wireframes.')
		}

		// Update the preview shape
		editor.updateShape({
			id: previewShapeId,
			type: 'response',
			props: {
				html,
				w: (960 * 2) / 3,
				h: (540 * 2) / 3,
			},
		})
	} catch (e) {
		// If there's an error, delete the preview shape
		editor.deleteShape(previewShapeId)
		throw e
	}
}
