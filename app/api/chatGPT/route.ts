import OpenAIClient from '@/clients/openai'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const { input } = await request.json()

    const res = await OpenAIClient.createChatCompletion(input)

    // const r = res.data.choices[0].message.content
    const r = res.data.choices.map((c: any) => {
        return c.message.content
    })

    console.log(r)

    return new Response(r)
}
