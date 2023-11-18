import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ErrorBoundary } from 'react-error-boundary'

interface TypewriterProps {
    text: string
    speed: number
}

const MarkdownErrorBoundary = ({ children }: { children: any }) => {
    return (
        <ErrorBoundary fallback={<div>Error rendering response</div>}>
            <div className="self-center">{children}</div>
        </ErrorBoundary>
    )
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState<string>('')
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index])
                setIndex((prevIndex) => prevIndex + 1)
            }, speed)

            return () => clearTimeout(timer)
        }
    }, [index, text, speed])

    useEffect(() => {
        setDisplayedText('')
        setIndex(0)
    }, [text, speed])

    return (
        <MarkdownErrorBoundary>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            className="text-green"
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    ),
                    p: ({ node, ...props }) => (
                        <p {...props} className="my-2" />
                    ),
                    li: ({ node, ...props }) => (
                        <li {...props} className="text-gray-10" />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong {...props} className="font-bold" />
                    )
                }}
            >
                {displayedText}
            </ReactMarkdown>
        </MarkdownErrorBoundary>
    )
}

export default Typewriter
