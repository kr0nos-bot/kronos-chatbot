import React, { useEffect, useState } from 'react'

const Loading = () => {
    const cycleCount = 5
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split(
            ''
        )
    const [cycleCurrent, setCycleCurrent] = useState(0)
    const [letterCurrent, setLetterCurrent] = useState(0)
    const [done, setDone] = useState(false)
    const text = 'ΦΟΡΤΩΣΗ...'.split('')

    const getChar = () => chars[Math.floor(Math.random() * chars.length)]

    const loop = () => {
        if (cycleCurrent < cycleCount) {
            setCycleCurrent(cycleCurrent + 1)
        } else if (letterCurrent < text.length) {
            setCycleCurrent(0)
            setLetterCurrent(letterCurrent + 1)
        } else {
            setDone(true)
        }
    }

    useEffect(() => {
        let rafId: number
        if (!done) {
            rafId = requestAnimationFrame(loop)
        } else {
            setTimeout(() => {
                setDone(false)
                setCycleCurrent(0)
                setLetterCurrent(0)
            }, 750)
        }
        return () => cancelAnimationFrame(rafId)
    }, [cycleCurrent, letterCurrent, done])

    return (
        <div className="font-mono text-[#676767]">
            {text.map((char, index) => (
                <span
                    key={index}
                    className={`inline-block transition-transform duration-500 ${
                        index < letterCurrent
                            ? 'translate-x-0 scale-100 transform '
                            : '-translate-x-full scale-90 transform'
                    }`}
                >
                    {index < letterCurrent ? char : getChar()}
                </span>
            ))}
        </div>
    )
}

export default Loading
