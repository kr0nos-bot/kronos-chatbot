import axios from 'axios'
import { NextResponse } from 'next/server'
import { sleep, timeout } from '@/utils'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

async function fetchCompletedImage(id: string): Promise<any> {
    const res = await axios.post(
        'https://stablediffusionapi.com/api/v4/dreambooth/fetch',
        {
            key: process.env['STABLE_DIFFUSION_API_KEY'],
            request_id: id
        }
    )

    if (res.data.status !== 'complete') {
        await sleep(1500)
        return fetchCompletedImage(id)
    }

    return res.data
}

async function requestImage(input: string): Promise<any> {
    return NextResponse.json({})

    const res = await axios.post(
        'https://stablediffusionapi.com/api/v3/text2img',
        {
            key: process.env['STABLE_DIFFUSION_API_KEY'],
            prompt: input,
            negative_prompt: null,
            width: '720',
            height: '720',
            samples: '4', // max is 4 per stable diffusion api docs
            num_inference_steps: '20',
            safety_checker: 'no',
            enhance_prompt: 'yes',
            seed: null,
            guidance_scale: 7.5,
            multi_lingual: 'no',
            panorama: 'no',
            self_attention: 'no',
            upscale: 'no',
            embeddings_model: null,
            webhook: null,
            track_id: null
        }
    )
    const {
        status,
        eta: etaSeconds,
        error,
        id,
        output,
        messege // yes, it's spelled wrong in the API
    } = res?.data

    if (error) {
        throw new Error(error)
    }

    switch (status) {
        case 'error':
            throw new Error(messege)
        case 'processing':
            await sleep(etaSeconds * 1000)
            return await Promise.race([
                fetchCompletedImage(id),
                timeout(1000 * 60 * 2)
            ])
        case 'success':
            if (!output || output.length === 0) {
                throw new Error('Image creation failed, try again')
            }
            return output.join(' ')
        case 'failed':
            throw new Error('Image creation failed, try again')
        default:
            throw new Error('Unknown status')
    }
}

export async function POST(request: Request) {
    try {
        const { input, numBatches = 2 } = await request.json()
        const results = []

        for (let i = 0; i < numBatches; i++) {
            const data = await requestImage(input)
            console.log(data)
            results.push(data)
            await sleep(4000) // To mitigate rate-limiting
        }

        // TODO: we need to combine images into a single string due to tech debt
        const images = results.join(' ')

        return NextResponse.json(images)
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
