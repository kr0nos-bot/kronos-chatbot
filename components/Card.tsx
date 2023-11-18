import React from 'react'

type CardProps = {
    size: 'small' | 'medium' | 'large'
    imageUrl: string
}

const sizeStyles = {
    small: 'row-span-26',
    medium: 'row-span-33',
    large: 'row-span-45'
}

const Card: React.FC<CardProps> = ({ size, imageUrl }) => {
    return (
        <div
            className={`m-3 p-0 rounded-xl ${sizeStyles[size]} relative bg-red`}
        >
            <img
                src={imageUrl}
                alt="card content"
                className="absolute top-0 left-0 object-cover w-full h-full rounded-xl"
            />
        </div>
    )
}

export default Card
