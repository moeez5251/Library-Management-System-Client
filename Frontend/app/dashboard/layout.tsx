import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { useRouter } from "next/router";
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'XLMS - User Dashboard',
    description: 'User Dashboard for Library Management System',
}
export default function RootLayout({
    
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body >
                <Navbar />
                <div className='flex  gap-3 mx-3 my-5 h-[85vh]'>

                    <div className='w-[20%] px-6'>
                        <Sidebar />
                    </div>
                        <section className='w-[80%] bg-[#f4f8fb] p-3 rounded-lg  overflow-y-scroll '>
    

                        {children}
                    </section>
                </div>
            </body>
        </html>
    )
}
