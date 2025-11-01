import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'XLMS - User Dashboard',
    template: '%s | XLMS',
  },
  description:
    'Access your personalized XLMS User Dashboard to manage borrowed books, view transaction history, and track your library activity efficiently.',
  keywords: [
    'XLMS Dashboard',
    'Library Management System',
    'User Dashboard',
    'Book Management',
    'Library Portal',
    'Digital Library',
  ],
  authors: [{ name: 'Xheikh Moeez', url: 'https://moeez5251.netlify.app' }],
  creator: 'Xheikh Moeez',
  publisher: 'XLMS',
  metadataBase: new URL('https://xlms-client.netlify.app'),
  alternates: {
    canonical: '/dashboard',
  },
  openGraph: {
    title: 'XLMS - User Dashboard',
    description:
      'Manage your books, borrowing history, and profile using the XLMS User Dashboard.',
    url: 'https://xlms-client.netlify.app/dashboard',
    siteName: 'XLMS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'XLMS - User Dashboard',
    description:
      'User dashboard of XLMS — track books, borrowing records, and manage your library account easily.',
    creator: '@xheikhmoeez',
  },
  icons: {
    icon: '/favicon.ico',
  },
  category: 'Library Dashboard',
}

export default function RootLayout({

    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navbar />
            <div className='flex  gap-3 mx-3 mt-5 h-[83vh] overflow-hidden'>

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
