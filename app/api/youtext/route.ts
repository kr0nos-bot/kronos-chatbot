import OpenAIClient from '@/clients/openai'
import config from '@/config'
import axios from 'axios'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

const URL = 'https://youtext.io'

export async function POST(request: Request) {
    const { input } = await request.json()

    const url = `${URL}/${input}/interpretation`

    const res = await axios.get(url)

    const r: any = [res?.data?.content]

    return new Response(r)
}
