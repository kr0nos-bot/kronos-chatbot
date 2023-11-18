import React from 'react'
import styled, { keyframes } from 'styled-components'

const dash = keyframes`
  from {
    stroke-dashoffset: 814;
  }
  to {
    stroke-dashoffset: -814;
  }
`

const Container = styled.div`
    color: #ffffff;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* This assumes you want it centered within the entire viewport height */
`

const Loading = styled.div`
    width: 100%;
    // max-width: 700px; /* You can adjust this as necessary */
    padding: 0;
    position: relative;

    svg {
        width: 100%;
        height: 100%;
    }

    #pulsar {
        stroke-dasharray: 281;
        animation: ${dash} 2.5s infinite linear forwards;
    }
`
const LoadingComponent: React.FC = () => {
    return (
        <Container className="flex flex-col">
            <Loading className="flex flex-col m-auto text-center">
                <svg
                    version="1.2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 550 200"
                >
                    <path
                        id="pulsar"
                        stroke="#ffffff"
                        fill="none"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"
                    />
                </svg>
            </Loading>
        </Container>
    )
}

export default LoadingComponent
