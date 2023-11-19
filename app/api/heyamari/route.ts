import config from '@/config'
import axios from 'axios'
import { NextResponse } from 'next/server'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    return NextResponse.json({})

    const { input: messages } = await request.json()

    const res = await axios.post(
        'https://api.heyamari.com/chat/completions',
        {
            model: config.openaiModel,
            messages: messages,
            temperature: 0,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6
        },
        {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env['HEYAMARI_API_KEY']}`,
                'X-OpenAI-API-Key': process.env['OPENAI_API_KEY']
            }
        }
    )

    const r = res.data.choices[0].message.content

    return NextResponse.json(r)
}
