/* eslint-disable @next/next/no-img-element */
'use client'
import config from '@/config'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {
    createAssistantMessage,
    createUserMessage,
    extractYouTubeVideoId,
    toastErr,
    toastSuccess
} from '@/utils'
import { Message } from '@/types'
import { KRONOS_PROMPT } from '@/consts'
import { ChatType } from '@/types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading'
import ResponseContainerChat from '@/components/ResponseContainerChat'
import ResponseContainerAction from '@/components/ResponseContainerAction'
import ResponseContainerOther from '@/components/ResponseContainerOther'
import Spinner from '@/components/Spinner'
import Rain from '@/components/Rain'
import { PHProvider } from '@/consts/providers/PHProvider'

// initial message to calibrate the model
const KRONOS_PROMPT_MESSAGE: Message = {
    role: 'user',
    content: KRONOS_PROMPT,
    type: ChatType.CHAT
}

// TODO: cleanup as this is quite hacky but on the right track
// order matters
const ACTIONS = [
    // {
    //     identifier: '/images',
    //     type: ChatType.OTHER,
    //     url: `${config.baseUrl}/api/serp/google-images`,
    //     mapToRequestData: (messages: Message[]) => {
    //         // get content of last message from user
    //         return messages[messages.length - 1].content
    //             .replace('/images', '')
    //             .trim()
    //     }
    // },

    // TODO
    {
        identifier: '/i',
        type: ChatType.ACTION,
        url: `${config.baseUrl}/api/stable-diffusion/v1/text2img`,
        // url: `${config.baseUrl}/api/stable-diffusion/v2/text2img`,
        mapToRequestData: (messages: Message[]) => {
            // get content of last message from user
            return messages[messages.length - 1].content
                .replace(/\/\w+/g, '')
                .trim()
        }
    },
    {
        identifier: '/image',
        type: ChatType.ACTION,
        url: `${config.baseUrl}/api/stable-diffusion/v1/text2img`,
        // url: `${config.baseUrl}/api/stable-diffusion/v2/text2img`,
        mapToRequestData: (messages: Message[]) => {
            // get content of last message from user
            return messages[messages.length - 1].content
                .replace(/\/\w+/g, '')
                .trim()
        }
    },
    {
        identifier: '/upscale',
        type: ChatType.ACTION,
        url: `${config.baseUrl}/api/stable-diffusion/upscale`,
        mapToRequestData: (messages: Message[]) => {
            // console.log('=========================')
            // console.log(messages)
            // get content of last message from user
            return messages[messages.length - 1].content
                .replace('/upscale', '')
                .trim()
        }
    },
    {
        identifier: '/summarize',
        type: ChatType.CHAT,
        url: `${config.baseUrl}/api/youtext`,
        mapToRequestData: (messages: Message[]) => {
            const input = messages[messages.length - 1].content
                .replace(/\/\w+/g, '')
                .trim()

            // parse video id from input
            return extractYouTubeVideoId(input)
        }
    },
    // {
    //     identifier: '',
    //     type: ChatType.CHAT,
    //     url: `${config.baseUrl}/api/heyamari`,
    //     mapToRequestData: (messages: Message[]) => {
    //         return messages
    //             .filter((m) => m.type == ChatType.CHAT || !m.type)
    //             .map((m) => delete m.type && m)
    //     }
    // }
    {
        identifier: '',
        type: ChatType.CHAT,
        url: `${config.baseUrl}/api/chatGPT`,
        mapToRequestData: (messages: Message[]) => {
            return messages
                .filter((m) => m.type == ChatType.CHAT || !m.type)
                .map((m) => delete m.type && m)
        }
    }
]

// TODO: cleanup
// get action from input. return first action found. return default if no action found
const parseAction = (input: string) => {
    const foundActions = ACTIONS.filter((tool) =>
        input.includes(tool.identifier)
    )
    return foundActions.length > 0 ? foundActions[0] : ACTIONS[1]
}

const Page = () => {
    const [chatInput, setChatInput] = useState('')
    const [sessionStarted, setSessionStarted] = useState(false)
    const [responsePending, setResponsePending] = useState(false)
    const [chatHistory, setChatHistory] = useState<Message[]>([
        KRONOS_PROMPT_MESSAGE
    ])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const chatResponseRef = useRef<HTMLDivElement | null>(null)

    const [showImgModal, setShowImgModal] = useState(false)
    const [modalImgSrc, setModalImgSrc] = useState('')
    const [modalImgUpscaling, setModalImgUpscaling] = useState(false)

    const [mute, setMute] = useState(true)

    const handleImgClick = async (src: string) => {
        setModalImgSrc(src)
        setShowImgModal(true)
    }

    const handleUpscaleImg = async () => {
        setModalImgUpscaling(true)
        try {
            const { data } = await axios.post(
                `${config.baseUrl}/api/stable-diffusion/upscale`,
                {
                    input: modalImgSrc
                }
            )
            setModalImgSrc(data)
        } catch (error: any) {
            console.log('error:', error)
            toastErr(error)
        } finally {
            setModalImgUpscaling(false)
        }
    }

    const handleChatInputKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            handleChatInputSubmit(chatInput)
            return
        }

        if (mute) return

        // Play audio on key press
        // Regular expression for input characters
        const allowedKeys = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<,>.?~`-]$/

        if (allowedKeys.test(e.key)) {
            const audioElement = document.getElementById(
                'tactileKeySound'
            ) as HTMLAudioElement
            if (audioElement) {
                audioElement.currentTime = 0 // Reset audio to start
                audioElement.play()
            }
        }
    }

    const handleChatInputChange = async (e: any) => {
        const input = e.target.value
        setChatInput(input)
    }

    const handleChatInputSubmit = async (chatInput: string) => {
        if (chatInput.trim() === '') return

        setSessionStarted(true)
        setResponsePending(true)

        // parse action from input and map to request data
        const { url, mapToRequestData, type } = parseAction(chatInput)
        const userMessage = createUserMessage(chatInput, type)
        // const requestData = mapToRequestData([...chatHistory, userMessage])
        const requestData = mapToRequestData([...chatHistory, userMessage])

        let res: any = null
        try {
            res = await axios.post(url, {
                input: requestData
            })
        } catch (error: any) {
            console.log('error:', error)
            toastErr(error)
            setResponsePending(false)
            return
        } finally {
            setResponsePending(false)
            setChatInput('')
            if (res?.data?.error || res?.status !== 200) {
                toastErr('Something went wrong')
                return
            }
        }

        setChatHistory((prev) => [...prev, userMessage])
        setChatHistory((prev) => [
            ...prev,
            createAssistantMessage(res?.data, type)
        ])

        setResponsePending(false)
        setChatInput('')
    }

    const closeImgModal = () => {
        setShowImgModal(false)
        setModalImgUpscaling(false) // how can we cancel this request as well
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        const savedMuteState = localStorage.getItem('muteState')
        if (savedMuteState !== null) {
            setMute(JSON.parse(savedMuteState)) // Ensure you convert the string to a boolean
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('muteState', JSON.stringify(mute)) // Stringify the boolean value
    }, [mute])

    useEffect(() => {
        if (chatResponseRef.current) {
            chatResponseRef.current.scrollTop =
                chatResponseRef.current.scrollHeight
        }
    }, [chatHistory])

    useEffect(() => {
        if (chatResponseRef.current && responsePending) {
            chatResponseRef.current.scrollTop =
                chatResponseRef.current.scrollHeight
        }
    }, [responsePending])

    return (
        <PHProvider>
            {/* Import modal */}

            <ToastContainer
                position="top-right"
                toastStyle={{
                    backgroundColor: '#141413',
                    color: '#fff'
                }}
            />

            <audio
                id="tactileKeySound"
                preload="auto"
                src="https://www.logitechg.com/content/dam/gaming/en/innovation/mechanical-switches/gl-tactile.mp3"
            />
            <>
                {/* IMAGE VIEW MODAL */}
                {showImgModal && (
                    <dialog id="import_modal" className="modal" open>
                        {/* wild that daisy ui doesn't do this out of the box */}
                        <div
                            className="select-none modal-overlay"
                            onClick={closeImgModal} // Close modal when clicking outside
                        ></div>
                        <div className="relative z-10 flex flex-col select-none">
                            {modalImgUpscaling && (
                                <div className="absolute top-[133px] z-20 flex gap-1 self-center">
                                    upscaling <Spinner />
                                </div>
                            )}
                            <img
                                src={modalImgSrc}
                                alt=""
                                className={`w-max-[600px] mx-auto max-h-[600px] w-full ${
                                    modalImgUpscaling && 'brightness-50'
                                }`}
                            />
                            <div
                                className="cursor-pointer btn-ghost btn"
                                onClick={handleUpscaleImg}
                            >
                                UPSCALE
                            </div>
                        </div>
                    </dialog>
                )}
                <div
                    className={`relative flex flex-grow flex-col lg:mx-auto  ${
                        showImgModal ? 'blur' : ''
                    }`}
                >
                    {sessionStarted && (
                        <div className="fixed z-[0] h-full w-full">
                            <Rain />
                        </div>
                    )}
                    <div className="pointer-events-none fixed inset-0 z-[1] flex select-none items-center justify-center">
                        <div className="relative w-[333px]">
                            <img
                                src="/imgs/kronos-logo.svg"
                                className={`w-full opacity-30 ${
                                    sessionStarted && 'opacity-70 animate-pulse'
                                }`}
                                alt="Background"
                            />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>
                    </div>
                    <div
                        // style={
                        //     sessionStarted
                        //         ? {
                        //               backgroundImage: `url('/gifs/matrix.gif')`,
                        //               backgroundPosition: 'center',
                        //               backgroundRepeat: 'no-repeat',
                        //               backgroundSize: 'cover'
                        //           }
                        //         : {}
                        // }
                        className={`chat-history align-items-center relative z-[2] mx-auto inline-block h-[100vh] w-full overflow-y-scroll transition-all duration-500 `}
                        ref={chatResponseRef}
                    >
                        {chatHistory?.length > 0 &&
                            chatHistory
                                .filter((c: any) => c.role == 'assistant') // show assistant responses *only*
                                .map((r: any, i) => {
                                    if (r.type == ChatType.ACTION) {
                                        return (
                                            <ResponseContainerAction
                                                key={i}
                                                content={r.content}
                                                onImageClick={handleImgClick}
                                                submit={handleChatInputSubmit}
                                            />
                                        )
                                    } else if (r.type == ChatType.OTHER) {
                                        return (
                                            <div
                                                key={i}
                                                className="flex h-fit w-full pb-[233px]"
                                            >
                                                <ResponseContainerOther
                                                    onImageClick={
                                                        handleImgClick
                                                    }
                                                    content={r.content}
                                                />
                                            </div>
                                        )
                                    }
                                    return (
                                        <ResponseContainerChat
                                            key={i}
                                            content={r.content}
                                        />
                                    )
                                })}
                        {responsePending && (
                            <div className="flex w-full h-full">
                                <div className="flex flex-row m-auto text-center">
                                    <Loading />
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className={`form-control absolute z-10 mx-auto flex w-full max-w-[766px] select-none flex-row justify-between self-center p-[13px] transition-all sm:bg-transparent ${
                            sessionStarted
                                ? 'bottom-[0px] h-[10vh] bg-black sm:bg-transparent'
                                : 'bottom-0 h-[53.3vh]'
                        }`}
                    >
                        {/* <div className="flex select-none md:hidden">
                            <BtnOptions
                                exportChat={handleExportChat}
                                handleOpenImportModal={handleOpenImportModal}
                                setMute={setMute}
                                mute={mute}
                            />
                        </div> */}
                        <div className="relative h-[40px] w-full opacity-[.8]">
                            <input
                                autoFocus
                                placeholder="είσοδος"
                                spellCheck={false}
                                type="text"
                                className="input h-full w-full rounded-full bg-base-200 font-mono text-[#EDEDED] placeholder-gray-100 focus:border-transparent focus:shadow-transparent focus:outline-none"
                                value={chatInput}
                                onChange={handleChatInputChange}
                                onKeyDown={handleChatInputKeyDown}
                                // onBlur={() => handleChatInputSubmit(chatInput)}
                                onBlur={() => {
                                    if (window.innerWidth <= 768) {
                                        handleChatInputSubmit(chatInput)
                                    }
                                }}
                                ref={inputRef}
                            />
                            <div
                                tabIndex={-1}
                                className="absolute right-[19px] top-[-2px] my-auto flex h-full cursor-pointer text-white"
                                onClick={() => {
                                    handleChatInputSubmit(chatInput)
                                }}
                            >
                                <div className="m-auto h-fit">
                                    <img
                                        src="/imgs/kronos-logo.svg"
                                        className="w-full"
                                        style={{ filter: 'brightness(133%)' }}
                                        alt="Background"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            {/* FOOTER DESKTOP */}
            <div className="text-muted absolute bottom-3 right-3 hidden font-mono text-[#676767] md:flex">
                v.0.0.0 (alpha)
                {/* <BtnOptions
                    exportChat={handleExportChat}
                    handleOpenImportModal={handleCloseImportModal}
                    setMute={setMute}
                    mute={mute}
                /> */}
            </div>
        </PHProvider>
    )
}

export default Page
