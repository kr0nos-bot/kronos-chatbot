import Image from 'next/image'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Κρόνος',
    description: ''
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme="black">
            <body className="flex flex-col">
                <div className="text-[#EDEDED] relative flex h-[100vh] flex-col bg-black">
                    <div className="relative w-full">
                        {/* <Image
                            src={`/header-bg.png`}
                            alt={'header'}
                            layout={'fill'}
                            objectFit={'cover'}
                            objectPosition={'center'}
                            className="animate-pulse"
                            // style={{ filter: 'brightness(150%)' }}
                        /> */}
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
