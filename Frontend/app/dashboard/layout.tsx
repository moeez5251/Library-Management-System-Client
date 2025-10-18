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

                    <div className='w-[20%] px-6'>
                        <Sidebar />
                    </div>
                        <section className='w-[80%] bg-[#f4f8fb] p-3 rounded-lg  overflow-y-auto '>
    

                        {children}
                    </section>
                </div>
                <div className='flex items-center justify-between mx-5 my-1'>
                        <div className='font-semibold text-[#7c7c7c] text-sm'>XLMS - LMS version 1.0</div>
                        <div className='font-semibold text-[#7c7c7c] text-sm'>&copy; 2025 XLMS, All Rights Reserved</div>
                </div>
                </>
    )
}
