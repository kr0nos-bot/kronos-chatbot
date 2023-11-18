import Loading from '@/app/loading'

export const Wave = ({ text }: { text?: string }) => {
    return (
        <div className="w-full h-full m-auto">
            <div className="flex flex-col">
                <div className="m-auto">
                    <div className="center">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                </div>
                {text && (
                    <div className="m-auto">
                        <div className="mx-auto mt-6 text-center">
                            <p className="text-lg text-muted">{text}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
