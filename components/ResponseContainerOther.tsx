import StackGrid, { transitions } from 'react-stack-grid'

const { scaleDown } = transitions

// Show Anything else
const ResponseContainerOther = ({
    content: images,
    onImageClick
}: {
    content: any[]
    onImageClick: (src: string) => void
}) => {
    const handleImageClick = (src: string) => {
        onImageClick(src)
    }

    return (
        <StackGrid
            className="w-full h-full m-auto"
            appear={scaleDown.appear}
            appeared={scaleDown.appeared}
            enter={scaleDown.enter}
            entered={scaleDown.entered}
            leaved={scaleDown.leaved}
            columnWidth={150}
            monitorImagesLoaded={true}
        >
            {images.map((c, i) => (
                <img
                    key={i}
                    src={c}
                    onClick={() => handleImageClick(c)}
                    className="p-1 border-black rounded-lg cursor-pointer hover:border-2"
                />
            ))}
        </StackGrid>
    )
}

export default ResponseContainerOther
