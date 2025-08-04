import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Providers from './provider';

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],

});
export const metadata: Metadata = {
  title: 'XLMS',
  description: 'A client app for Library Management System',
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

        {children}
        </Providers>
      </body>
    </html>
  )
}
