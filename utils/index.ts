import { ChatType, Message } from '@/types'
import { toast } from 'react-toastify'

export const newUUID = () => {
    return Math.random().toString(36).substr(2)
}

export const toastErr = (message: string) => {
    toast(message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error'
    })
}

export const toastSuccess = (message: string, ms: number = 2000) => {
    toast(message, {
        hideProgressBar: true,
        autoClose: ms,
        type: 'success'
    })
}

export const isImageLink = (input: string): boolean => {
    // return false
    // const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/
    // if (!regex.test(input)) return false // Check if it's a valid URL
    // console.log('here')

    // List of image extensions you want to check for
    const imageExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.bmp',
        '.tiff',
        '.webp'
    ]
    for (const ext of imageExtensions) {
        if (input.toLowerCase().endsWith(ext)) {
            return true
        }
    }
    return false
}

export const createUserMessage = (
    content: string,
    type: ChatType = ChatType.CHAT
): Message => {
    return { role: 'user', content, type }
}

export const createAssistantMessage = (
    content: string,
    type: ChatType = ChatType.CHAT
): Message => {
    return { role: 'assistant', content, type }
}

export const extractYouTubeVideoId = (url: string) => {
    try {
        const parsedUrl = new URL(url)
        const searchParams = new URLSearchParams(parsedUrl.search)

        return searchParams.get('v')
    } catch (error) {
        console.error('Invalid URL provided')
        return null
    }
}

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

export const timeout = (ms: number) =>
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timed out')), ms)
    )

export const exportChat = (messages: Message[]) => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
        type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kronos_${new Date().toLocaleDateString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
