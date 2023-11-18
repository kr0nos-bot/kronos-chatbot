import Typewriter from './Typewriter'

// Show Chats
const ResponseContainerChat = ({ content = '' }: { content: string }) => {
    const isMultiLine = content?.split('\n').length > 2

    return (
        <div className="flex w-full min-h-fit h-full px-[33px] md:px-[133px]">
            <div
                className={`w-full m-auto text-white break-words ${
                    isMultiLine
                        ? 'text-left flex-col'
                        : 'text-center justify-center flex flex-row flex-wrap'
                }`}
            >
                <span className="items-center ">
                    <Typewriter text={content} speed={10} />
                </span>
            </div>
        </div>
    )
}

export default ResponseContainerChat
