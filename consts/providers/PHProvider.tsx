'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
    // @ts-ignore
    posthog.init(
        process.env['NEXT_PUBLIC_POSTHOG_KEY'] ??
            'phc_v2WPjoRwvf4ZiFJiZqjYSMU6yF3I0TZ4ykl0vTUiz0T',
        {
            api_host:
                process.env.NEXT_PUBLIC_POSTHOG_HOST ??
                'phc_v2WPjoRwvf4ZiFJiZqjYSMU6yF3I0TZ4ykl0vTUiz0T',
            capture_pageview: true
        }
    )
}

export function PostHogPageview(): JSX.Element {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (pathname) {
            let url = window.origin + pathname
            if (searchParams && searchParams.toString()) {
                url = url + `?${searchParams.toString()}`
            }
            posthog.capture('$pageview', {
                $current_url: url
            })
        }
    }, [pathname, searchParams])

    return <></>
}

export function PHProvider({ children }: { children: React.ReactNode }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
