import { NextResponse } from 'next/server'
import { getJson } from 'serpapi'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    return NextResponse.json({})

    const { input: query } = await request.json()

    try {
        const res = await getJson({
            engine: 'google_images',
            google_domain: 'google.com',
            q: query,
            hl: 'en',
            gl: 'us',
            api_key: process.env['SERP_API_KEY'],
            tbs: 'itp:photos,isz:l',
            safe: 'off'
        })

        const images = res.images_results.map((image: any) => image.original)
        console.log(images)
        return NextResponse.json(images.slice(0, 93))
    } catch (err: any) {
        console.log(err.message)
        // console.log(err)
        return NextResponse.json({ error: 'An error occurred', details: err })
    }
}
