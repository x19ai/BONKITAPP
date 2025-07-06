import { PreviewShape } from '../PreviewShape/PreviewShape'
import { SYSTEM_PROMPT, USER_PROMPT_WITH_PREVIOUS_DESIGN, USER_PROMPT } from '../prompt'

export async function getHtmlFromGoogleAI({
    image,
    apiKey,
    text,
    theme = 'light',
    previousPreviews = [],
}: {
    image: string
    apiKey: string
    text: string
    theme?: string
    previousPreviews?: PreviewShape[]
}) {
    if (!apiKey) throw Error('You need to provide an API key (sorry)')

    // Prepare the content array for Google AI Studio
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: SYSTEM_PROMPT
                },
                {
                    text: previousPreviews?.length > 0 ? USER_PROMPT_WITH_PREVIOUS_DESIGN : USER_PROMPT
                },
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: image.split(',')[1] // Remove the data:image/jpeg;base64, prefix
                    }
                }
            ]
        }
    ]

    // Add text if present
    if (text) {
        contents[0].parts.push({
            text: `Here's a list of text that we found in the design:\n${text}`
        })
    }

    // Add previous previews
    for (let i = 0; i < previousPreviews.length; i++) {
        const preview = previousPreviews[i]
        contents[0].parts.push(
            {
                text: `The designs also included one of your previous result. Here's the image that you used as its source:`
            },
            {
                text: `And here's the HTML you came up with for it: ${preview.props.html}`
            }
        )
    }

    // Add theme instruction
    contents[0].parts.push({
        text: `Please make your result use the ${theme} theme.`
    })

    const body = {
        contents,
        generationConfig: {
            temperature: 0,
            maxOutputTokens: 4096,
            topP: 0.8,
            topK: 40
        }
    }

    let json = null

    try {
        const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify(body)
        })
        json = await resp.json()
    } catch (e: any) {
        throw Error(`Could not contact Google AI Studio: ${e.message}`)
    }

    return json
} 