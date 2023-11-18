import { isImageLink } from '@/utils'

// only one type of action is supported currently: text2img
const ResponseContainerAction = ({
    content = '',
    onImageClick,
    submit
}: {
    content: string
    onImageClick: (src: string) => void
    submit: (chatInput: string) => void
}) => {
    const parts = content.indexOf(' ') >= 0 ? content.split(' ') : [content]

    const handleImageClick = (src: string) => {
        onImageClick(src)
    }

    return (
        <div className="flex justify-center h-[100vh] w-full">
            <div
                className={`hidden sm:flex faded self-center w-full py-[42px] mx-[33px] justify-center select-none`}
            >
                {parts.map((part, index) => {
                    // TODO: this shows first image only!!!
                    if (index == 0 && isImageLink(part)) {
                        return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={index}
                                className={
                                    'border-transparent cursor-pointer hover:border-4 mx-auto w-[333px]'
                                }
                                src={part}
                                alt={`Image Response ${index}`}
                                onClick={() => handleImageClick(part)}
                            />
                        )
                    }
                })}
            </div>
            {/* MOBILE */}
            <div
                className={`sm:hidden faded self-center w-full py-[42px] mx-[33px] justify-center pb-[133px] select-none`}
            >
                {parts.map((part, index) => {
                    if (index == 0 && isImageLink(part)) {
                        return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={index}
                                className={
                                    'self-center cursor-pointer border-transparent hover:border-4'
                                }
                                src={part}
                                alt={`Image Response ${index}`}
                                onClick={() => handleImageClick(part)}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default ResponseContainerAction

{
    /* {parts.length > 1 && (
                <div className="grid items-center w-2/3 grid-flow-col grid-rows-2 gap-2 mx-auto mb-auto">
                    <a
                        className="text-center cursor-pointer text-gold hover:underline"
                        onClick={() => {
                            submit(`/upscale ${parts[0]}`)
                        }}
                    >
                        U1
                    </a>
                    <button
                        className="text-center cursor-pointer text-gold hover:underline"
                        onClick={() => {
                            submit(`/upscale ${parts[0]}`)
                        }}
                    >
                        V1
                    </button>
                    <button
                        className="text-center cursor-pointer text-gold hover:underline"
                        onClick={() => {
                            submit(`/upscale ${parts[1]}`)
                        }}
                    >
                        U2
                    </button>
                    <button
                        onClick={() => {
                            submit(`/upscale ${parts[0]}`)
                        }}
                        className="text-center cursor-pointer text-gold hover:underline"
                    >
                        V2
                    </button>
                    <button
                        onClick={() => {
                            submit(`/upscale ${parts[2]}`)
                        }}
                        className="text-center cursor-pointer text-gold hover:underline"
                    >
                        U3
                    </button>
                    <button
                        onClick={() => {
                            submit(`/upscale ${parts[0]}`)
                        }}
                        className="text-center cursor-pointer text-gold hover:underline"
                    >
                        V3
                    </button>
                    <button
                        onClick={() => {
                            submit(`/upscale ${parts[3]}`)
                        }}
                        className="text-center cursor-pointer text-gold hover:underline"
                    >
                        U4
                    </button>
                    <button
                        onClick={() => {
                            submit(`/upscale ${parts[0]}`)
                        }}
                        className="text-center cursor-pointer text-gold hover:underline"
                    >
                        V4
                    </button>
                </div>
            )} */
}
