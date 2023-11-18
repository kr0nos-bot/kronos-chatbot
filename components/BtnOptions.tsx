import {
    FaEllipsisH,
    FaFileExport,
    FaFileImport,
    FaVolumeMute,
    FaVolumeUp
} from 'react-icons/fa'

const BtnOptions = ({
    exportChat,
    handleOpenImportModal,
    setMute,
    mute
}: {
    exportChat: () => void
    handleOpenImportModal: () => void
    setMute: (mute: any) => void
    mute: boolean
}) => {
    return (
        <div className="flex flex-row w-full">
            <div className="p-0 border-0 dropdown dropdown-top hover:p-0 h-[48px] w-[48px] flex ">
                <label
                    tabIndex={-1}
                    autoFocus={false}
                    className="m-auto cursor-pointer"
                >
                    <FaEllipsisH />
                </label>
                <ul
                    tabIndex={-1}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box "
                >
                    <li>
                        <a onClick={exportChat}>
                            export
                            <div className="ml-auto">
                                <FaFileExport />
                            </div>
                        </a>
                    </li>
                    <li>
                        <a onClick={handleOpenImportModal}>
                            import
                            <div className="ml-auto">
                                <FaFileImport />
                            </div>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setMute((prev: boolean) => !prev)}>
                            volume
                            {mute ? (
                                <>
                                    <div className="ml-auto">
                                        <FaVolumeMute />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="ml-auto">
                                        <FaVolumeUp />
                                    </div>
                                </>
                            )}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BtnOptions
