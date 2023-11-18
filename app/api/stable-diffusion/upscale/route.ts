import axios from 'axios'
import config from '@/config'
import { NextResponse } from 'next/server'
import { sleep } from '@/utils'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const { input } = await request.json()

    console.log('--------------------------------')
    console.log(input)
    console.log('--------------------------------')

    const payload = {
        key: process.env['STABLE_DIFFUSION_API_KEY'],
        url: input,
        scale: 3,
        webhook: null,
        face_enhance: false
    }

    try {
        const res = await axios.post(
            'https://stablediffusionapi.com/api/v3/super_resolution',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        // console.log(res)

        // silly little sleep to process the img
        await sleep(5000)

        return NextResponse.json(res.data.output)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err })
    }
}
