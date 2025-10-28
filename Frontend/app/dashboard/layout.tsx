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
        <>
            <Navbar />
            <div className='flex  gap-3 mx-3 mt-5 h-[83vh]'>

                <div className='sidebar w-full  sm:w-1/2 md:w-[40%] lg:w-[30%] top-0 xl:w-[20%] xl:px-6 fixed xl:relative xl:left-0 -left-full bg-white transition-all min-h-screen z-10 py-16 px-3 xl:py-0'>
                    <Sidebar />
                </div>
                <section className='xl:w-[80%] w-full bg-[#f4f8fb] p-2  sm:p-3 rounded-lg  overflow-y-auto '>


                    {children}
                </section>
            </div>
            <div className='flex items-center justify-between mx-2 sm:mx-5 my-3 sm:my-1'>
                <div className='font-semibold text-[#7c7c7c] relative z-10 text-xs sm:text-sm'>XLMS - LMS version 1.0</div>
                <div className='font-semibold text-[#7c7c7c] relative z-10 text-xs sm:text-sm'>&copy; 2025 XLMS, All Rights Reserved</div>
            </div>
        </>
    )
}
