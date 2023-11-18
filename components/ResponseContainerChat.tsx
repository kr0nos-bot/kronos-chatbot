import Typewriter from './Typewriter'

// Show Chats
const ResponseContainerChat = ({ content = '' }: { content: string }) => {
    const isMultiLine = content?.split('\n').length > 2

    return (
        <div className="flex h-full min-h-fit w-full px-[33px] md:px-[133px]">
            <div
                className={`text-[#FAF9F6] m-auto w-full break-words ${
                    isMultiLine
                        ? 'flex-col text-left'
                        : 'flex flex-row flex-wrap justify-center text-center'
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
