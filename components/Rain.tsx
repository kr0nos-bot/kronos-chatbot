import React, { useEffect, useRef } from 'react'

const Rain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let letters: any = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'.repeat(6)
        letters = letters.split('')

        const fontSize = 10
        const columns = canvas.width / fontSize

        const drops: number[] = []
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor((Math.random() * canvas.height) / fontSize)
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, .1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)]
                ctx.fillStyle = '#232323'
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)
                drops[i]++
                if (
                    drops[i] * fontSize > canvas.height &&
                    Math.random() > 0.95
                ) {
                    drops[i] = 0
                }
            }
        }

        const intervalId = setInterval(draw, 100)

        return () => clearInterval(intervalId)
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}

export default Rain
