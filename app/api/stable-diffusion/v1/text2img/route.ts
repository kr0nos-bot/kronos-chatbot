import axios from 'axios'
import config from '@/config'
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
        await sleep(1000)
        return fetchCompletedImage(id)
    }

    return res.data
}

export async function POST(request: Request) {
    try {
        const { input } = await request.json()
        const res = await axios.post(
            'https://stablediffusionapi.com/api/v3/text2img',
            {
                key: process.env['STABLE_DIFFUSION_API_KEY'],
                prompt: input,
                negative_prompt: null,
                width: '720',
                height: '720',
                samples: '2', // max is 4 per stable diffusion api docs
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
            return NextResponse.json(error, { status: 500 })
        }

        let data: any
        switch (status) {
            case 'error':
                return NextResponse.json(messege, { status: 500 })
            case 'processing':
                await sleep(etaSeconds * 1000)
                data = await Promise.race([
                    fetchCompletedImage(id),
                    timeout(1000 * 60 * 2)
                ])
                break
            case 'success':
                if (!output || output.length === 0) {
                    return NextResponse.json(
                        {
                            error: 'Image creation failed, try again'
                        },
                        { status: 500 }
                    )
                }
                data = output.join(' ')
                break
            case 'failed':
                return NextResponse.json(
                    {
                        error: 'Image creation failed, try again'
                    },
                    { status: 500 }
                )
            default:
                break
        }

        return NextResponse.json(data)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err }, { status: 500 })
    }
}
