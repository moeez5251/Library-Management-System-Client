import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Providers from './provider';
import { DataFetcherProvider } from '@/lib/datafetcher';
import { LendingFetcherProvider } from '@/lib/LendingModal';
import { ReturnProvider } from '@/lib/ReturnDetails';
import { DeleteModal } from '@/lib/DeleteModal';
import { SubmitmodalProvider } from '@/lib/Submitmodal';
import { NotificationsProvider } from '@/lib/notifications';

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],

});
export const metadata: Metadata = {
  title: {
    default: 'XLMS - Library Management System',
    template: '%s | XLMS',
  },
  description:
    'XLMS is a modern Library Management System designed to simplify book tracking, membership management, and digital library operations for schools and institutions.',
  keywords: [
    'Library Management System',
    'XLMS',
    'Book Management',
    'Digital Library',
    'Next.js LMS',
    'School Library Software',
  ],
  authors: [{ name: 'Xheikh Moeez', url: 'https://moeez5251.netlify.app' }],
  creator: 'Xheikh Moeez',
  publisher: 'XLMS',
  metadataBase: new URL('https://xlms-client.netlify.app'), // change to your live URL
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'XLMS - Smart Library Management System',
    description:
      'Manage books, members, and lending operations seamlessly with XLMS — a Next.js-powered library platform.',
    url: 'https://xlms-client.netlify.app',
    siteName: 'XLMS',
    images: [
      {
        url: 'https://xlms-client.netlify.app/Main.jpeg', 
        width: 1200,
        height: 630,
        alt: 'XLMS Library Management System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XLMS - Library Management System',
    description:
      'A complete library management system built with Next.js for efficient book and member management.',
    creator: '@xheikhmoeez',
    images: ['https://xlms-client.netlify.app/Main.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  category: 'Library Management',
  verification:{
    google:'o67PCilh0c_X6cE6fU1uklcWQGbAo6hRGuPT4minHxM'
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <DataFetcherProvider>
            <NotificationsProvider>
              <LendingFetcherProvider>
                <ReturnProvider>
                  <DeleteModal>
                    <SubmitmodalProvider>

                      {children}
                    </SubmitmodalProvider>
                  </DeleteModal>
                </ReturnProvider>
              </LendingFetcherProvider>
            </NotificationsProvider>
          </DataFetcherProvider>
        </Providers>
      </body>
    </html>
  )
}
